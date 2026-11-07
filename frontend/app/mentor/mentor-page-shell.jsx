'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MentorSidebar, MentorHeader } from '@/components';
import { LayoutDashboard, Inbox, CalendarDays, MessageCircle, Menu } from 'lucide-react';

export default function MentorPageShell({
  active = 'Dashboard',
  children,
  backHref = '/mentor/dashboard',
  backLabel = '← Dashboard',
  toast,
  notify,
}) {
  const pathname = usePathname();
  const [compact, setCompact] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#0F1B2D]">
      <a href="#mentor-main" className="sr-only focus:not-sr-only">
        Skip to content
      </a>

      {/* Sidebar */}
      <MentorSidebar
        active={active}
        compact={compact}
        setCompact={setCompact}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        onAction={notify}
      />

      {/* Header */}
      <MentorHeader
        compact={compact}
        onToggleMobile={() => setMobileOpen(!mobileOpen)}
        onAction={notify}
        backHref={backHref}
        backLabel={backLabel}
      />

      {/* Main content */}
      <main
        id="mentor-main"
        className={`mx-auto max-w-[1400px] px-4 pb-24 pt-7 sm:px-7 ${
          compact ? 'lg:ml-[76px]' : 'lg:ml-[240px]'
        } lg:px-8 transition-[margin] duration-200`}
      >
        {children}
      </main>

      {/* Mobile quick navigation bottom bar (< 1024px) */}
      <nav
        aria-label="Mobile quick navigation"
        className="fixed bottom-0 left-0 right-0 z-30 flex h-16 items-center justify-around border-t border-[#E5E1D8] bg-[#FAF8F4]/98 px-2 backdrop-blur lg:hidden"
      >
        <Link
          href="/mentor/dashboard"
          className={`flex flex-col items-center gap-1 p-1 text-xs font-medium ${
            pathname === '/mentor/dashboard' ? 'text-[#B8955A] font-semibold' : 'text-[#4A5568]'
          }`}
        >
          <LayoutDashboard size={19} />
          <span>Dashboard</span>
        </Link>
        <Link
          href="/mentor/requests"
          className={`flex flex-col items-center gap-1 p-1 text-xs font-medium ${
            pathname?.startsWith('/mentor/requests') ? 'text-[#B8955A] font-semibold' : 'text-[#4A5568]'
          }`}
        >
          <Inbox size={19} />
          <span>Requests</span>
        </Link>
        <Link
          href="/mentor/sessions"
          className={`flex flex-col items-center gap-1 p-1 text-xs font-medium ${
            pathname?.startsWith('/mentor/sessions') ? 'text-[#B8955A] font-semibold' : 'text-[#4A5568]'
          }`}
        >
          <CalendarDays size={19} />
          <span>Sessions</span>
        </Link>
        <Link
          href="/mentor/messages"
          className={`flex flex-col items-center gap-1 p-1 text-xs font-medium ${
            pathname?.startsWith('/mentor/messages') ? 'text-[#B8955A] font-semibold' : 'text-[#4A5568]'
          }`}
        >
          <MessageCircle size={19} />
          <span>Messages</span>
        </Link>
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="flex flex-col items-center gap-1 p-1 text-xs font-medium text-[#4A5568]"
          aria-label="Open full menu"
        >
          <Menu size={19} />
          <span>Menu</span>
        </button>
      </nav>

      {/* Floating toast message */}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 left-1/2 z-[60] -translate-x-1/2 rounded-lg bg-ink px-4 py-3 text-sm text-white shadow-lg"
        >
          {toast}
        </div>
      )}
    </div>
  );
}
