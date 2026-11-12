'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Bell, ChevronDown, Menu, Settings, HelpCircle, LogOut, BookOpen, User, ShieldCheck } from 'lucide-react';

export default function AdminHeader({
  compact = false,
  setMobileOpen,
}) {
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header
      className={`sticky top-0 z-20 flex h-[68px] items-center justify-between border-b border-[#E5E1D8] bg-[#FAF8F4]/95 px-4 backdrop-blur transition-[margin] duration-200 sm:px-7 ${
        compact ? 'lg:ml-[76px]' : 'lg:ml-[240px]'
      }`}
    >
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setMobileOpen && setMobileOpen(true)}
          className="grid h-9 w-9 place-items-center rounded-lg border border-[#E5E1D8] bg-white text-ink transition hover:bg-[#FAF8F4] lg:hidden"
          aria-label="Open navigation menu"
        >
          <Menu size={18} />
        </button>

        <form
          role="search"
          onSubmit={(event) => event.preventDefault()}
          className="relative hidden sm:block"
        >
          <Search className="absolute left-3 top-2.5 text-[#A0A7B4]" size={17} />
          <input
            id="admin-workspace-search"
            name="search"
            type="search"
            aria-label="Search admin workspace"
            placeholder="Search admin workspace"
            className="h-10 w-64 rounded-lg border border-[#E5E1D8] bg-white pl-9 text-sm focus:border-ink focus:outline-none"
          />
        </form>
      </div>

      <div className="flex items-center gap-3">
        <Link
          href="/admin/manual"
          title="Admin User Manual & Route Inventory"
          className="hidden sm:flex items-center gap-1.5 rounded-lg border border-[#E5E1D8] bg-white px-2.5 py-1.5 text-xs font-semibold text-[#0F1B2D] hover:border-[#B8955A] hover:text-[#B8955A] transition shadow-xs"
        >
          <BookOpen size={14} className="text-[#B8955A]" />
          <span>Manual</span>
          <span className="rounded bg-[#FAF8F4] px-1.5 py-0.5 text-[10px] font-mono text-[#64748B]">v4.2</span>
        </Link>

        <button
          type="button"
          onClick={() => window.alert('You’re all caught up.')}
          aria-label="Notifications"
          className="relative grid h-10 w-10 place-items-center rounded-lg transition hover:bg-black/5"
        >
          <Bell size={19} />
          <i className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#B8955A]" />
        </button>

        <div className="relative">
          <button
            type="button"
            onClick={() => setProfileOpen((open) => !open)}
            className="flex items-center gap-2 rounded-lg p-1 text-xs transition hover:bg-black/5"
            aria-label="User account details"
            aria-expanded={profileOpen}
            aria-haspopup="true"
          >
            <span className="grid h-8 w-8 place-items-center rounded-full bg-ink font-semibold text-white">
              AK
            </span>
            <span className="hidden text-left sm:block">
              <b className="block text-xs">Alex Kumar</b>
              <small className="text-[#4A5568]">Administrator</small>
            </span>
            <ChevronDown size={14} className="text-[#4A5568]" />
          </button>

          {profileOpen && (
            <div className="absolute right-0 top-12 z-30 w-56 rounded-xl border border-[#E5E1D8] bg-white p-2 text-[#0F1B2D] shadow-lg animate-in fade-in">
              <div className="px-3 py-2 border-b border-[#F2EFE9] mb-1">
                <div className="flex items-center gap-1.5">
                  <b className="block text-xs text-[#0F1B2D]">Alex Kumar</b>
                  <ShieldCheck size={12} className="text-[#B8955A]" />
                </div>
                <small className="text-[#4A5568]">Lead Platform Administrator</small>
              </div>
              <Link
                href="/admin/profile"
                onClick={() => setProfileOpen(false)}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-[#0F1B2D] hover:bg-[#FAF8F4] transition"
              >
                <User size={15} className="text-[#B8955A]" /> Administrator Profile
              </Link>
              <Link
                href="/admin/settings"
                onClick={() => setProfileOpen(false)}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-[#0F1B2D] hover:bg-[#FAF8F4] transition"
              >
                <Settings size={15} className="text-[#5A6E85]" /> Security & Settings
              </Link>
              <Link
                href="/admin/help"
                onClick={() => setProfileOpen(false)}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-[#0F1B2D] hover:bg-[#FAF8F4] transition"
              >
                <HelpCircle size={15} className="text-[#5A6E85]" /> Admin Runbooks
              </Link>
              <Link
                href="/admin/manual"
                onClick={() => setProfileOpen(false)}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-[#0F1B2D] hover:bg-[#FAF8F4] transition"
              >
                <BookOpen size={15} className="text-[#B8955A]" /> User Manual (PDF)
              </Link>
              <div className="border-t border-[#F2EFE9] my-1 pt-1">
                <Link
                  href="/admin/login"
                  onClick={() => setProfileOpen(false)}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 transition"
                >
                  <LogOut size={15} /> Sign out
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
