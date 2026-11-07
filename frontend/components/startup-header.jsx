'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Search, Bell, ChevronDown, Menu, Settings, Users, LogOut, Moon, Sun } from 'lucide-react';

export default function StartupHeader({
  compact = false,
  onToggleMobile,
  onAction,
  backHref = '/startup/dashboard',
  backLabel = '← Dashboard',
  searchValue,
  onSearchChange,
  searchPlaceholder = 'Search workspace',
  showThemeToggle = false,
  darkmode = false,
  onToggleTheme,
  showProfileMenu = false,
}) {
  const [profileOpen, setProfileOpen] = useState(false);

  const notify = (msg) => {
    if (onAction) onAction(msg);
  };

  return (
    <header
      className={`sticky top-0 z-20 flex h-[68px] items-center justify-between border-b border-[#E5E1D8] bg-[#FAF8F4]/95 px-4 backdrop-blur transition-[margin] duration-200 sm:px-7 ${
        compact ? 'lg:ml-[76px]' : 'lg:ml-[240px]'
      }`}
    >
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleMobile}
          className="grid h-9 w-9 place-items-center rounded-lg border border-[#E5E1D8] bg-white text-ink lg:hidden"
          aria-label="Open navigation menu"
        >
          <Menu size={18} />
        </button>
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-2.5 text-[#A0A7B4]" size={17} />
          <input
            aria-label="Search workspace"
            value={searchValue}
            onChange={onSearchChange}
            placeholder={searchPlaceholder}
            className="h-10 w-64 rounded-lg border border-[#E5E1D8] bg-white pl-9 pr-3 text-sm focus:border-ink focus:outline-none"
          />
        </div>
        {backHref && (
          <Link href={backHref} className="text-sm font-semibold sm:hidden">
            {backLabel}
          </Link>
        )}
      </div>
      <div className="flex items-center gap-3">
        {showThemeToggle && (
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={darkmode ? 'Switch to light mode' : 'Switch to dark mode'}
            title={darkmode ? 'Switch to light mode' : 'Switch to dark mode'}
            className="grid h-10 w-10 place-items-center rounded-full transition hover:bg-black/5"
          >
            {darkmode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        )}
        <button
          type="button"
          onClick={() => notify('You’re all caught up.')}
          aria-label="Notifications"
          className="relative grid h-10 w-10 place-items-center rounded-lg hover:bg-black/5"
        >
          <Bell size={19} />
          <i className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#B8955A]" />
        </button>
        <div className="relative">
          <button
            type="button"
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 rounded-lg p-1 text-xs hover:bg-black/5"
          >
            <span className="grid h-8 w-8 place-items-center rounded-full bg-ink font-semibold text-white">
              AK
            </span>
            <span className="hidden text-left sm:block">
              <b className="block text-xs">Aarav Kapoor</b>
              {showProfileMenu && <small className="text-[#4A5568]">Founder</small>}
            </span>
            <ChevronDown size={14} className="text-[#4A5568]" />
          </button>
          {showProfileMenu && profileOpen && (
            <div className="absolute right-0 top-12 z-30 w-48 rounded-xl border border-[#E5E1D8] bg-white p-2 shadow-lg">
              <button type="button" onClick={() => notify('Account settings opened.')} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-[#FAF8F4]">
                <Settings size={16} />Account settings
              </button>
              <button type="button" onClick={() => notify('Role switcher: Founder · Mentor.')} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-[#FAF8F4]">
                <Users size={16} />Switch role
              </button>
              <button type="button" onClick={() => notify('You are signed in as Aarav.')} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-[#FAF8F4]">
                <LogOut size={16} />Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
