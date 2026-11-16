'use client';

import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { api, clearAccessToken, onAuthStateChange } from './api';

const AuthContext = createContext(null);

export const ROLE_DASHBOARDS = {
  startup: '/startup/dashboard',
  investor: '/investor/dashboard',
  mentor: '/mentor/dashboard',
  jobseeker: '/jobseeker/dashboard',
  employer: '/employer/dashboard',
};

export function getDashboardPathForRole(role) {
  if (!role) return '/login';
  const normalized = role.toLowerCase().replace(/[\s_-]+/g, '');
  if (normalized.includes('startup') || normalized.includes('founder')) return ROLE_DASHBOARDS.startup;
  if (normalized.includes('investor')) return ROLE_DASHBOARDS.investor;
  if (normalized.includes('mentor')) return ROLE_DASHBOARDS.mentor;
  if (normalized.includes('jobseeker') || normalized.includes('job') || normalized.includes('talent')) return ROLE_DASHBOARDS.jobseeker;
  if (normalized.includes('employer') || normalized.includes('company')) return ROLE_DASHBOARDS.employer;
  return ROLE_DASHBOARDS[role] || '/login';
}

export function AuthProvider({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // Pending registration data: kept strictly in memory, never in localStorage/sessionStorage/URL
  const [pendingRegistration, setPendingRegistration] = useState(null);

  // Multi-tab logout broadcast channel
  const authChannel = useMemo(() => {
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      return new BroadcastChannel('forma_auth_channel');
    }
    return null;
  }, []);

  const loadUserProfile = useCallback(async () => {
    try {
      const userData = await api.getCurrentUser();
      setUser(userData);
      return userData;
    } catch (err) {
      setUser(null);
      clearAccessToken();
      throw err;
    }
  }, []);

  // Restore session on app load
  useEffect(() => {
    let isMounted = true;

    async function restoreSession() {
      try {
        await api.refresh();
        if (isMounted) {
          await loadUserProfile();
        }
      } catch (err) {
        // Not logged in or expired cookie: clear user state
        if (isMounted) {
          setUser(null);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    restoreSession();

    // Listen to API auth events (e.g., 401 refresh failure in background)
    const unsubscribe = onAuthStateChange((event) => {
      if (!isMounted) return;
      if (event === 'UNAUTHENTICATED' || event === 'LOGGED_OUT') {
        setUser(null);
        setPendingRegistration(null);
      }
    });

    // Multi-tab sync via BroadcastChannel
    if (authChannel) {
      authChannel.onmessage = (msg) => {
        if (msg.data?.type === 'LOGOUT') {
          clearAccessToken();
          setUser(null);
          setPendingRegistration(null);
          router.push('/login');
        }
      };
    }

    return () => {
      isMounted = false;
      unsubscribe();
      if (authChannel) {
        authChannel.close();
      }
    };
  }, [loadUserProfile, authChannel, router]);

  const login = useCallback(async (credentials) => {
    await api.login(credentials);
    const userData = await loadUserProfile();
    setPendingRegistration(null);
    return userData;
  }, [loadUserProfile]);

  const logout = useCallback(async () => {
    try {
      await api.logout();
    } finally {
      setUser(null);
      setPendingRegistration(null);
      if (authChannel) {
        authChannel.postMessage({ type: 'LOGOUT' });
      }
      router.push('/login');
    }
  }, [authChannel, router]);

  const logoutAll = useCallback(async () => {
    try {
      await api.logoutAll();
    } finally {
      setUser(null);
      setPendingRegistration(null);
      if (authChannel) {
        authChannel.postMessage({ type: 'LOGOUT' });
      }
      router.push('/login');
    }
  }, [authChannel, router]);

  const roles = useMemo(() => {
    if (!user || !user.roles) return [];
    return user.roles.filter((r) => !r.revoked_at);
  }, [user]);

  const primaryRole = useMemo(() => {
    if (!roles || roles.length === 0) return null;
    const primary = roles.find((r) => r.is_primary);
    return primary ? primary.role : roles[0].role;
  }, [roles]);

  const hasRole = useCallback((roleName) => {
    if (!roles) return false;
    const target = roleName.toLowerCase().replace(/[\s_-]+/g, '');
    return roles.some((r) => {
      const existing = r.role.toLowerCase().replace(/[\s_-]+/g, '');
      return existing === target;
    });
  }, [roles]);

  const value = useMemo(
    () => ({
      user,
      roles,
      primaryRole,
      isAuthenticated: Boolean(user),
      isLoading,
      login,
      logout,
      logoutAll,
      refreshUser: loadUserProfile,
      pendingRegistration,
      setPendingRegistration,
      clearPendingRegistration: () => setPendingRegistration(null),
      hasRole,
      getDashboardPath: () => getDashboardPathForRole(primaryRole),
    }),
    [user, roles, primaryRole, isLoading, login, logout, logoutAll, loadUserProfile, pendingRegistration, hasRole]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
