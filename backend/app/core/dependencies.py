import uuid
from collections.abc import Callable
from typing import Any
from urllib.parse import urlparse

import redis.asyncio as aioredis
from fastapi import Depends, Request
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.core.config import Settings, get_settings
from app.core.exceptions import AuthenticationError, AuthorizationError
from app.core.rate_limit import get_redis_client
from app.core.security import decode_access_token
from app.db.engine import get_db
from app.models.user import AccountStatus, User, UserRoleEnum

http_bearer = HTTPBearer(auto_error=False)


async def get_redis() -> aioredis.Redis:
    return await get_redis_client()


async def get_current_user(
    credentials: HTTPAuthorizationCredentials | None = Depends(http_bearer),
    db: AsyncSession = Depends(get_db),
    settings: Settings = Depends(get_settings),
) -> User:
    if not credentials or not credentials.credentials:
        raise AuthenticationError("Authentication token is missing.")

    payload = decode_access_token(credentials.credentials, settings)
    sub = payload.get("sub")
    if not sub:
        raise AuthenticationError("Invalid token payload.")

    try:
        user_id = uuid.UUID(sub)
    except ValueError:
        raise AuthenticationError("Invalid user identity in token.") from None

    user = await db.scalar(
        select(User)
        .options(selectinload(User.roles))
        .where(User.id == user_id, User.deleted_at.is_(None))
    )

    if not user:
        raise AuthenticationError("User not found.")

    # Requirement 8: get_current_user checks account status on every request
    if user.status == AccountStatus.suspended:
        raise AuthorizationError("Account is suspended.")
    if user.status in (AccountStatus.deactivated, AccountStatus.deleted):
        raise AuthenticationError("Account is no longer active.")

    return user


def require_role(*allowed_roles: UserRoleEnum) -> Callable[..., Any]:
    async def role_checker(current_user: User = Depends(get_current_user)) -> User:
        user_roles = {
            r.role for r in current_user.roles if r.revoked_at is None
        }
        if not any(role in user_roles for role in allowed_roles):
            raise AuthorizationError(
                f"Operation requires one of the following roles: {[r.value for r in allowed_roles]}"
            )
        return current_user

    return role_checker


async def verify_csrf(
    request: Request,
    settings: Settings = Depends(get_settings),
) -> None:
    """CSRF validation for cookie-authenticated requests.
    Validates Origin or Referer against allowed CORS origins, or accepts X-Requested-With header.
    """
    if "refresh_token" in request.cookies:
        # Check custom header first (defense-in-depth)
        custom_header = request.headers.get("x-requested-with")
        if custom_header and custom_header.lower() == "xmlhttprequest":
            return

        allowed = set(settings.cors_origins_list)
        if settings.ENVIRONMENT == "test":
            allowed.add("http://test")
            allowed.add("http://testserver")

        origin = request.headers.get("origin")
        if origin:
            if origin not in allowed:
                raise AuthorizationError("CSRF check failed: Origin not allowed.")
            return

        referer = request.headers.get("referer")
        if referer:
            parsed = urlparse(referer)
            referer_origin = f"{parsed.scheme}://{parsed.netloc}"
            if referer_origin not in allowed:
                raise AuthorizationError("CSRF check failed: Referer not allowed.")
            return

        raise AuthorizationError("CSRF check failed: Missing Origin or CSRF header.")

