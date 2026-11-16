'use client';

import React, { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';

const PUBLIC_AUTH_PATHS = [
  '/login',
  '/register',
  '/verify-email',
  '/reset-password',
  '/forgot-password',
];

const ROLE_PATH_MAP = [
  { prefix: '/startup', role: 'startup' },
  { prefix: '/mentor', role: 'mentor' },
  { prefix: '/investor', role: 'investor' },
  { prefix: '/jobseeker', role: 'jobseeker' },
  { prefix: '/employer', role: 'employer' },
];

export default function RouteGuard({ children }) {
  const pathname = usePathname() || '/';
  const router = useRouter();
  const { isAuthenticated, isLoading, hasRole, getDashboardPath, pendingRegistration } = useAuth();

  useEffect(() => {
    if (isLoading) return;

    // Do not guard admin routes in Step 2 (Step 15a handles admin auth)
    if (pathname.startsWith('/admin')) {
      return;
    }

    // 1. Pending registration guard: /register/role requires in-memory registration draft
    if (pathname === '/register/role') {
      if (!pendingRegistration || !pendingRegistration.email || !pendingRegistration.password) {
        router.replace('/register');
        return;
      }
    }

    // 2. If logged in and visiting login or register, redirect to user's primary dashboard
    const isPublicAuthPath = PUBLIC_AUTH_PATHS.some((path) => pathname === path || pathname.startsWith(`${path}/`));
    if (isAuthenticated && (isPublicAuthPath || pathname === '/')) {
      const target = getDashboardPath();
      router.replace(target);
      return;
    }

    // 3. Protected route check
    const isProtectedRoleSection = ROLE_PATH_MAP.some((item) => pathname.startsWith(item.prefix));
    const isGenericProtectedSection =
      pathname.startsWith('/community') ||
      pathname.startsWith('/notifications') ||
      pathname.startsWith('/help') ||
      pathname.startsWith('/opportunities');

    if (!isAuthenticated && (isProtectedRoleSection || isGenericProtectedSection)) {
      router.replace('/login');
      return;
    }

    // 4. Role-based permission check: user must hold the role for the section they are visiting
    if (isAuthenticated && isProtectedRoleSection) {
      const matched = ROLE_PATH_MAP.find((item) => pathname.startsWith(item.prefix));
      if (matched && !hasRole(matched.role)) {
        // User does not hold this role: redirect to their own dashboard
        router.replace(getDashboardPath());
        return;
      }
    }
  }, [pathname, isAuthenticated, isLoading, hasRole, getDashboardPath, pendingRegistration, router]);

  // Loading splash to prevent flashing /login to logged-in users during session check
  if (isLoading) {
    const isPublic = PUBLIC_AUTH_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`));
    if (!isPublic && pathname !== '/' && !pathname.startsWith('/admin')) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#FAF8F4]">
          <div className="flex flex-col items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full border border-stone-300 font-serif text-xl text-[#0F1B2D]">
              F
            </span>
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-stone-300 border-t-[#0F1B2D]" />
          </div>
        </div>
      );
    }
  }

  return <>{children}</>;
}
