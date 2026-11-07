'use client';
import Link from 'next/link';
import { Search, Bell, ChevronDown, Menu } from 'lucide-react';

export default function MentorHeader({
  compact = false,
  onToggleMobile,
  onAction,
  backHref = '/mentor/dashboard',
  backLabel = '← Dashboard',
}) {
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
        <form
          role="search"
          onSubmit={(e) => {
            e.preventDefault();
            notify('Search filter applied.');
          }}
          className="relative hidden sm:block"
        >
          <Search className="absolute left-3 top-2.5 text-[#A0A7B4]" size={17} />
          <input
            id="mentor-workspace-search"
            name="search"
            type="search"
            aria-label="Search mentor workspace"
            placeholder="Search mentor workspace"
            className="h-10 w-64 rounded-lg border border-[#E5E1D8] bg-white pl-9 text-sm focus:border-ink focus:outline-none"
          />
        </form>
        {backHref && (
          <Link href={backHref} className="text-sm font-semibold sm:hidden">
            {backLabel}
          </Link>
        )}
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => notify('No new notifications.')}
          aria-label="Notifications"
          className="relative grid h-10 w-10 place-items-center rounded-lg hover:bg-black/5"
        >
          <Bell size={19} />
          <i className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#B8955A]" />
        </button>
        <button
          type="button"
          onClick={() => notify('Signed in as Rhea Mukherjee (Mentor).')}
          className="flex items-center gap-2 rounded-lg p-1 text-xs hover:bg-black/5"
          aria-label="User account details"
        >
          <span className="grid h-8 w-8 place-items-center rounded-full bg-ink font-semibold text-white">
            RM
          </span>
          <span className="hidden sm:block font-medium">Rhea Mukherjee</span>
          <ChevronDown size={14} className="text-[#4A5568]" />
        </button>
      </div>
    </header>
  );
}
