import asyncio
import sys
from datetime import UTC, datetime
from pathlib import Path

# Add backend directory to sys.path
backend_dir = Path(__file__).resolve().parent.parent
if str(backend_dir) not in sys.path:
    sys.path.insert(0, str(backend_dir))

from sqlalchemy import select
from sqlalchemy.orm import selectinload

from app.core.config import get_settings
from app.core.security import hash_password
from app.db.engine import get_session_factory
from app.models.user import AccountStatus, ReviewState, User, UserRole, UserRoleEnum
from app.services.auth import get_avatar_initials

DEV_USERS = [
    {
        "email": "startup@forma.dev",
        "name": "Dev Startup Founder",
        "handle": "dev_startup",
        "role": UserRoleEnum.startup,
    },
    {
        "email": "mentor@forma.dev",
        "name": "Dev Mentor",
        "handle": "dev_mentor",
        "role": UserRoleEnum.mentor,
    },
    {
        "email": "investor@forma.dev",
        "name": "Dev Investor",
        "handle": "dev_investor",
        "role": UserRoleEnum.investor,
    },
    {
        "email": "jobseeker@forma.dev",
        "name": "Dev Job Seeker",
        "handle": "dev_jobseeker",
        "role": UserRoleEnum.jobseeker,
    },
    {
        "email": "employer@forma.dev",
        "name": "Dev Employer",
        "handle": "dev_employer",
        "role": UserRoleEnum.employer,
    },
]

DEV_PASSWORD = "DevPassword123!"


async def seed() -> None:
    settings = get_settings()

    # Rule 8: seed_dev.py runs only when ENVIRONMENT == "development"
    if settings.ENVIRONMENT != "development":
        print(
            f"ERROR: seed_dev.py cannot run in '{settings.ENVIRONMENT}' environment. Only allowed in 'development'."
        )
        sys.exit(1)

    print("Seeding development users into database...")
    session_factory = get_session_factory()
    password_hash = hash_password(DEV_PASSWORD)
    now = datetime.now(UTC)

    async with session_factory() as session:
        for u_data in DEV_USERS:
            email = u_data["email"].lower()
            existing_user = await session.scalar(
                select(User)
                .options(selectinload(User.roles))
                .where(User.primary_email == email, User.deleted_at.is_(None))
            )

            if existing_user:
                print(f"  User {email} already exists. Updating status and password.")
                existing_user.password_hash = password_hash
                existing_user.status = AccountStatus.active
                existing_user.verification = ReviewState.verified
                existing_user.email_verified_at = now
                existing_user.display_name = u_data["name"]

                # Ensure primary role exists
                has_role = any(r.role == u_data["role"] for r in existing_user.roles)
                if not has_role:
                    new_role = UserRole(
                        user_id=existing_user.id,
                        role=u_data["role"],
                        is_primary=True,
                    )
                    session.add(new_role)
            else:
                print(f"  Creating user {email} ({u_data['role'].value})...")
                initials = get_avatar_initials(u_data["name"])
                new_user = User(
                    primary_email=email,
                    password_hash=password_hash,
                    display_name=u_data["name"],
                    handle=u_data["handle"],
                    avatar_initials=initials,
                    status=AccountStatus.active,
                    verification=ReviewState.verified,
                    email_verified_at=now,
                )
                session.add(new_user)
                await session.flush()

                new_role = UserRole(
                    user_id=new_user.id,
                    role=u_data["role"],
                    is_primary=True,
                )
                session.add(new_role)

        await session.commit()

    print("\nDevelopment seed complete!")
    print(f"Known password for all dev users: {DEV_PASSWORD}")
    for u in DEV_USERS:
        print(f"  - {u['email']} | Role: {u['role'].value}")


if __name__ == "__main__":
    asyncio.run(seed())
