/**
 * Shared API Client for Forma Frontend
 * Handles authentication headers, automatic single-flight token refresh,
 * in-memory token storage (NO localStorage/sessionStorage), and standardized error handling.
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// In-memory access token storage (persists only in JS memory)
let inMemoryAccessToken = null;

export function getAccessToken() {
  return inMemoryAccessToken;
}

export function setAccessToken(token) {
  inMemoryAccessToken = token;
}

export function clearAccessToken() {
  inMemoryAccessToken = null;
}

export class ApiError extends Error {
  constructor(status, code, message, details = null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

// Single-flight refresh mutex
let refreshPromise = null;
const authStateListeners = new Set();

export function onAuthStateChange(listener) {
  authStateListeners.add(listener);
  return () => authStateListeners.delete(listener);
}

function notifyAuthState(event, payload = null) {
  for (const listener of authStateListeners) {
    try {
      listener(event, payload);
    } catch (err) {
      console.error('Auth state listener error:', err);
    }
  }
}

/**
 * Base fetch wrapper with credentials, CSRF header, auth header, and auto-refresh on 401
 */
export async function apiFetch(path, options = {}) {
  const url = path.startsWith('http') ? path : `${API_BASE_URL}${path}`;
  const headers = {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    ...(options.headers || {}),
  };

  if (inMemoryAccessToken) {
    headers['Authorization'] = `Bearer ${inMemoryAccessToken}`;
  }

  const fetchOptions = {
    ...options,
    headers,
    credentials: 'include', // sends httpOnly cookies (refresh_token)
  };

  let response;
  try {
    response = await fetch(url, fetchOptions);
  } catch (networkErr) {
    throw new ApiError(0, 'network_error', 'Unable to connect to the server. Please check your network.');
  }

  // Handle 401 Unauthorized by attempting a token refresh (skip if the failed endpoint was auth refresh/login itself)
  const isAuthEndpoint = path.includes('/api/v1/auth/refresh') || path.includes('/api/v1/auth/login');
  if (response.status === 401 && !isAuthEndpoint && !options._isRetry) {
    try {
      await refreshAccessToken();
      // Retry original request once with new token
      return await apiFetch(path, { ...options, _isRetry: true });
    } catch (refreshErr) {
      clearAccessToken();
      notifyAuthState('UNAUTHENTICATED');
      throw refreshErr;
    }
  }

  // Parse response
  const contentType = response.headers.get('content-type') || '';
  let data = null;
  if (contentType.includes('application/json')) {
    data = await response.json().catch(() => null);
  } else {
    data = await response.text().catch(() => null);
  }

  if (!response.ok) {
    const errorObj = data && typeof data === 'object' && data.error ? data.error : null;
    const code = errorObj?.code || `http_${response.status}`;
    const message = errorObj?.message || (typeof data === 'string' && data ? data : response.statusText || 'Request failed');
    const details = errorObj?.details || null;
    throw new ApiError(response.status, code, message, details);
  }

  return data;
}

/**
 * Refresh access token using httpOnly cookie.
 * Ensures only ONE refresh call is in flight even if multiple requests fail with 401 concurrently.
 */
export async function refreshAccessToken() {
  if (!refreshPromise) {
    refreshPromise = (async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/v1/auth/refresh`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
          },
          credentials: 'include',
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => null);
          const message = errData?.error?.message || 'Session expired. Please sign in again.';
          throw new ApiError(res.status, errData?.error?.code || 'refresh_failed', message);
        }

        const data = await res.json();
        setAccessToken(data.access_token);
        notifyAuthState('TOKEN_REFRESHED', data.access_token);
        return data.access_token;
      } finally {
        refreshPromise = null;
      }
    })();
  }
  return refreshPromise;
}

// Auth API methods
export const api = {
  // Authentication
  async register(payload) {
    // payload: { email, password, role, display_name?, phone? }
    return apiFetch('/api/v1/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  async login(credentials) {
    // credentials: { email, password }
    const data = await apiFetch('/api/v1/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    setAccessToken(data.access_token);
    notifyAuthState('LOGGED_IN', data);
    return data;
  },

  async refresh() {
    return refreshAccessToken();
  },

  async logout() {
    try {
      await apiFetch('/api/v1/auth/logout', {
        method: 'POST',
      });
    } finally {
      clearAccessToken();
      notifyAuthState('LOGGED_OUT');
    }
  },

  async logoutAll() {
    try {
      await apiFetch('/api/v1/auth/logout-all', {
        method: 'POST',
      });
    } finally {
      clearAccessToken();
      notifyAuthState('LOGGED_OUT');
    }
  },

  async verifyEmail(token) {
    return apiFetch('/api/v1/auth/verify-email', {
      method: 'POST',
      body: JSON.stringify({ token }),
    });
  },

  async resendVerification(email) {
    return apiFetch('/api/v1/auth/resend-verification', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },

  async forgotPassword(email) {
    return apiFetch('/api/v1/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },

  async resetPassword({ token, new_password }) {
    return apiFetch('/api/v1/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ token, new_password }),
    });
  },

  // User Profile & Roles
  async getCurrentUser() {
    return apiFetch('/api/v1/users/me');
  },

  async getCurrentUserRoles() {
    return apiFetch('/api/v1/users/me/roles');
  },
};
