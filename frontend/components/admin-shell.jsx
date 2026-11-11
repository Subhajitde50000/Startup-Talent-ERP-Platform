'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Building,
  ShieldAlert,
  UserRound,
  Menu,
} from 'lucide-react';
import AdminSidebar from './admin-sidebar';
import AdminHeader from './admin-header';

export default function AdminShell({
  children,
  active,
  activeNav,
  className = '',
  contentClassName = '',
  mainId = 'admin-main',
  onRefresh,
}) {
  const [compact, setCompact] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const currentActive = active || activeNav;

  const mobileNavItems = [
    { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Verify', href: '/admin/verifications', icon: Building },
    { label: 'Moderate', href: '/admin/moderation', icon: ShieldAlert },
    { label: 'Users', href: '/admin/users', icon: UserRound },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#0F1B2D] overflow-x-hidden relative">
      {/* Skip to Main Content Link (WCAG 2.1 AA) */}
      <a
        href={`#${mainId}`}
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-xl focus:bg-[#0F1B2D] focus:px-4 focus:py-2 focus:text-xs focus:font-semibold focus:text-white"
      >
        Skip to main content
      </a>

      {/* Production Environment Console Strip */}
      <div className={`h-7 flex items-center justify-between border-b border-[#E5E1D8] bg-[#0F1B2D] text-white px-4 text-[10px] font-mono transition-[margin] duration-200 ${
        compact ? 'lg:ml-[76px]' : 'lg:ml-[240px]'
      }`}>
        <div className="flex items-center gap-2">
          <span className="rounded bg-emerald-500/20 px-1.5 py-0.2 text-emerald-400 font-bold">
            PRODUCTION
          </span>
          <span className="text-white/60 hidden sm:inline">
            Internal Operations Console · All actions cryptographically logged
          </span>
        </div>
        <div className="text-white/40 hidden md:block">
          Cluster: prod-ap-south-1 · Pods: 18/18
        </div>
      </div>

      {/* Persistent Reusable Admin Sidebar */}
      <AdminSidebar
        active={currentActive}
        activeNav={currentActive}
        compact={compact}
        setCompact={setCompact}
        collapsed={compact}
        onToggleCollapse={() => setCompact(!compact)}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      {/* Reusable Admin Header */}
      <AdminHeader
        compact={compact}
        setMobileOpen={setMobileOpen}
        onRefresh={onRefresh}
      />

      {/* Main Content Area */}
      <main
        id={mainId}
        tabIndex={-1}
        className={`min-h-[calc(100vh-84px)] pb-20 lg:pb-10 transition-[margin] duration-200 ${
          compact ? 'lg:ml-[76px]' : 'lg:ml-[240px]'
        } min-w-0 max-w-full overflow-x-hidden ${className}`}
      >
        <div className={`mx-auto max-w-[1440px] px-3 sm:px-6 lg:px-8 py-6 min-w-0 ${contentClassName}`}>
          {children}
        </div>
      </main>

      {/* Mobile Bottom Quick Navigation Bar (< 1024px) */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-30 flex h-14 items-center justify-around border-t border-[#E5E1D8] bg-[#FAF8F4]/98 backdrop-blur px-2 lg:hidden shadow-lg"
        aria-label="Mobile Bottom Navigation"
      >
        {mobileNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-0.5 rounded-lg px-2 py-1 text-[10px] font-medium transition-all ${
                isActive ? 'text-[#B8955A] font-semibold' : 'text-[#4A5568] hover:text-[#0F1B2D]'
              }`}
            >
              <Icon size={18} className={isActive ? 'text-[#B8955A]' : 'text-[#4A5568]'} />
              <span>{item.label}</span>
            </Link>
          );
        })}
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="flex flex-col items-center justify-center gap-0.5 rounded-lg px-2 py-1 text-[10px] font-medium text-[#4A5568] hover:text-[#0F1B2D]"
          aria-label="Open full admin menu"
        >
          <Menu size={18} />
          <span>More</span>
        </button>
      </nav>
    </div>
  );
}
