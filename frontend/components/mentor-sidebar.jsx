'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Inbox,
  Search,
  Users,
  CalendarDays,
  ClipboardCheck,
  Wallet,
  FileText,
  ChartNoAxesColumn,
  MessageCircle,
  Settings,
  CircleHelp,
  ChevronDown,
  ChevronRight,
  ArrowRight,
  X,
  Briefcase,
  Building2,
  Check,
} from 'lucide-react';

export const MENTOR_NAV_ITEMS = [
  ['Dashboard', LayoutDashboard, '/mentor/dashboard'],
  ['Requests', Inbox, '/mentor/requests'],
  ['Discover startups', Search, '/mentor/discover'],
  ['My startups', Users, '/mentor/startups'],
  ['Sessions', CalendarDays, '/mentor/sessions'],
  ['Deliverables', ClipboardCheck, '/mentor/deliverables'],
  ['Earnings', Wallet, '/mentor/earnings'],
  ['Agreements', FileText, '/mentor/agreements'],
  ['Impact & reviews', ChartNoAxesColumn, '/mentor/impact'],
  ['Investor events', CalendarDays, '/mentor/events'],
  ['Messages', MessageCircle, '/mentor/messages'],
];

const ROLES = [
  { name: 'Mentor', path: '/mentor/dashboard', desc: 'Current active role', current: true },
  { name: 'Startup Founder', path: '/startup/dashboard', desc: 'Forma Founder workspace' },
  { name: 'Investor', path: '/investor/dashboard', desc: 'Dealflow & Portfolio' },
  { name: 'Employer', path: '/employer/dashboard', desc: 'Talent & Hiring' },
];

export default function MentorSidebar({
  active,
  compact = false,
  setCompact,
  mobileOpen = false,
  setMobileOpen,
  onAction,
}) {
  const pathname = usePathname();
  const [localCompact, setLocalCompact] = useState(false);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);

  const isCompact = compact !== undefined ? compact : localCompact;
  const handleToggleCompact = setCompact || setLocalCompact;

  const getActiveFromPath = () => {
    if (!pathname) return 'Dashboard';
    if (pathname.startsWith('/mentor/requests')) return 'Requests';
    if (pathname.startsWith('/mentor/discover')) return 'Discover startups';
    if (pathname.startsWith('/mentor/startups')) return 'My startups';
    if (pathname.startsWith('/mentor/sessions')) return 'Sessions';
    if (pathname.startsWith('/mentor/deliverables')) return 'Deliverables';
    if (pathname.startsWith('/mentor/earnings')) return 'Earnings';
    if (pathname.startsWith('/mentor/agreements')) return 'Agreements';
    if (pathname.startsWith('/mentor/impact')) return 'Impact & reviews';
    if (pathname.startsWith('/mentor/events')) return 'Investor events';
    if (pathname.startsWith('/mentor/messages')) return 'Messages';
    if (pathname.startsWith('/mentor/settings')) return 'Settings';
    return 'Dashboard';
  };

  const currentActive = active || getActiveFromPath();

  const handleAction = (msg) => {
    if (onAction) onAction(msg);
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 hidden flex-col bg-[#0F1B2D] text-white transition-all duration-200 lg:flex ${
          isCompact ? 'w-[76px]' : 'w-[240px]'
        }`}
      >
        {/* Workspace Brand Header */}
        <div
          className={`flex h-[76px] items-center border-b border-white/10 ${
            isCompact ? 'justify-center' : 'gap-3 px-6'
          }`}
        >
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/30 font-serif text-lg">
            F
          </span>
          {!isCompact && (
            <div className="flex flex-col">
              <span className="font-serif text-base font-semibold tracking-wide text-white">
                forma
              </span>
              <span className="text-xs font-medium tracking-wider text-white/50">
                MENTOR WORKSPACE
              </span>
            </div>
          )}
        </div>

        {/* Primary Navigation Links */}
        <nav
          aria-label="Mentor primary navigation"
          className="mentor-sidebar-scrollbar mt-4 flex-1 space-y-1 overflow-y-auto px-3"
        >
          {MENTOR_NAV_ITEMS.map(([label, IconComponent, href]) => {
            const isActive = currentActive === label;
            return (
              <Link
                key={label}
                href={href}
                title={isCompact ? label : undefined}
                className={`group relative flex h-10 items-center rounded-lg text-xs font-medium transition-colors ${
                  isCompact ? 'justify-center px-0' : 'gap-3 px-3'
                } ${
                  isActive
                    ? 'bg-[#1C2B42] text-white font-semibold'
                    : 'text-white/70 hover:bg-white/5 hover:text-white'
                }`}
              >
                {isActive && (
                  <span className="absolute bottom-2 left-0 top-2 w-[3px] rounded-r bg-[#B8955A]" />
                )}
                <IconComponent
                  size={18}
                  className={`shrink-0 transition-colors ${
                    isActive ? 'text-[#B8955A]' : 'text-white/60 group-hover:text-white'
                  }`}
                />
                {!isCompact && <span className="truncate">{label}</span>}
                {!isCompact && label === 'Messages' && (
                  <span className="ml-auto rounded-full bg-[#B8955A] px-1.5 py-0.5 text-xs font-bold text-ink">
                    2
                  </span>
                )}
                {!isCompact && label === 'Requests' && (
                  <span className="ml-auto rounded-full bg-white/15 px-1.5 py-0.5 text-xs font-bold text-white">
                    2
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Compact Toggle Button */}
        <div className="border-t border-white/10 px-3 py-2">
          <button
            type="button"
            onClick={() => handleToggleCompact(!isCompact)}
            className={`flex h-8 w-full items-center rounded-lg text-xs text-white/50 hover:bg-white/5 hover:text-white ${
              isCompact ? 'justify-center' : 'justify-between px-3'
            }`}
            title={isCompact ? 'Expand sidebar' : 'Collapse sidebar'}
            aria-label={isCompact ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {!isCompact && <span>Collapse sidebar</span>}
            <ChevronRight
              size={15}
              className={`transition-transform duration-200 ${isCompact ? '' : 'rotate-180'}`}
            />
          </button>
        </div>

        {/* Footer Utilities */}
        <div className="space-y-1 border-t border-white/10 px-3 pb-5 pt-3">
          <Link
            href="/mentor/settings"
            title={isCompact ? 'Settings' : undefined}
            className={`flex h-10 items-center rounded-lg text-xs font-medium transition-colors ${
              isCompact ? 'justify-center px-0' : 'gap-3 px-3'
            } ${
              currentActive === 'Settings'
                ? 'bg-[#1C2B42] text-white'
                : 'text-white/60 hover:bg-white/5 hover:text-white'
            }`}
          >
            <Settings size={17} className="shrink-0" />
            {!isCompact && <span>Settings</span>}
          </Link>

          <Link
            href="/help"
            title={isCompact ? 'Help & support' : undefined}
            className={`flex h-10 items-center rounded-lg text-xs font-medium text-white/60 transition-colors hover:bg-white/5 hover:text-white ${
              isCompact ? 'justify-center px-0' : 'gap-3 px-3'
            }`}
          >
            <CircleHelp size={17} className="shrink-0" />
            {!isCompact && <span>Help & support</span>}
          </Link>

          {/* User Card with Role Switcher Dropdown */}
          <div className="relative pt-2">
            <button
              type="button"
              onClick={() => setRoleMenuOpen(!roleMenuOpen)}
              className={`flex w-full items-center rounded-lg border border-white/10 p-2 text-left transition-colors hover:bg-white/5 ${
                isCompact ? 'justify-center' : 'gap-3'
              }`}
              aria-expanded={roleMenuOpen}
              aria-label="User role switcher menu"
            >
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#F3EBDD] text-xs font-bold text-ink">
                RM
              </span>
              {!isCompact && (
                <div className="min-w-0 flex-1">
                  <span className="block truncate text-xs font-semibold text-white">
                    Rhea Mukherjee
                  </span>
                  <span className="block truncate text-xs text-white/50">
                    Mentor · Switch role
                  </span>
                </div>
              )}
              {!isCompact && <ChevronDown size={14} className="shrink-0 text-white/50" />}
            </button>

            {roleMenuOpen && (
              <div className="absolute bottom-full left-0 z-50 mb-2 w-56 rounded-xl border border-white/15 bg-[#1C2B42] p-2 shadow-2xl">
                <div className="px-2.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/40">
                  Switch Active Role
                </div>
                {ROLES.map((role) => (
                  <Link
                    key={role.name}
                    href={role.path}
                    onClick={() => setRoleMenuOpen(false)}
                    className={`flex items-center justify-between rounded-lg px-2.5 py-2 text-xs transition-colors ${
                      role.current
                        ? 'bg-white/15 text-white font-semibold'
                        : 'text-white/80 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <div>
                      <div className="font-medium">{role.name}</div>
                      <div className="text-xs text-white/50">{role.desc}</div>
                    </div>
                    {role.current && <Check size={14} className="text-[#B8955A]" />}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile & Tablet Drawer (< 1024px) */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileOpen && setMobileOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer content */}
          <div className="relative z-10 flex w-72 max-w-[85vw] flex-col bg-[#0F1B2D] text-white shadow-2xl">
            <div className="flex h-16 items-center justify-between border-b border-white/10 px-5">
              <div className="flex items-center gap-3">
                <span className="grid h-8 w-8 place-items-center rounded-full border border-white/30 font-serif text-base">
                  F
                </span>
                <span className="font-serif text-base font-semibold">forma · MENTOR</span>
              </div>
              <button
                type="button"
                onClick={() => setMobileOpen && setMobileOpen(false)}
                className="grid h-8 w-8 place-items-center rounded-lg text-white/70 hover:bg-white/10 hover:text-white"
                aria-label="Close navigation menu"
              >
                <X size={18} />
              </button>
            </div>

            <nav
              aria-label="Mobile mentor navigation"
              className="mentor-sidebar-scrollbar flex-1 space-y-1 overflow-y-auto p-3"
            >
              {MENTOR_NAV_ITEMS.map(([label, IconComponent, href]) => {
                const isActive = currentActive === label;
                return (
                  <Link
                    key={label}
                    href={href}
                    onClick={() => setMobileOpen && setMobileOpen(false)}
                    className={`flex h-11 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-[#1C2B42] text-white font-semibold'
                        : 'text-white/75 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <IconComponent
                      size={18}
                      className={isActive ? 'text-[#B8955A]' : 'text-white/60'}
                    />
                    <span>{label}</span>
                    {label === 'Messages' && (
                      <span className="ml-auto rounded-full bg-[#B8955A] px-2 py-0.5 text-xs font-bold text-ink">
                        2
                      </span>
                    )}
                    {label === 'Requests' && (
                      <span className="ml-auto rounded-full bg-white/15 px-2 py-0.5 text-xs font-bold text-white">
                        2
                      </span>
                    )}
                  </Link>
                );
              })}

              <div className="my-3 border-t border-white/10" />

              <Link
                href="/mentor/settings"
                onClick={() => setMobileOpen && setMobileOpen(false)}
                className={`flex h-11 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors ${
                  currentActive === 'Settings'
                    ? 'bg-[#1C2B42] text-white'
                    : 'text-white/75 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Settings size={18} />
                <span>Settings</span>
              </Link>
              <Link
                href="/help"
                onClick={() => setMobileOpen && setMobileOpen(false)}
                className="flex h-11 items-center gap-3 rounded-lg px-3 text-sm font-medium text-white/75 hover:bg-white/5 hover:text-white"
              >
                <CircleHelp size={18} />
                <span>Help & support</span>
              </Link>
            </nav>

            {/* Mobile User Card & Role Switcher */}
            <div className="border-t border-white/10 p-4">
              <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/40">
                Switch Role
              </div>
              <div className="grid grid-cols-2 gap-2">
                {ROLES.map((r) => (
                  <Link
                    key={r.name}
                    href={r.path}
                    onClick={() => setMobileOpen && setMobileOpen(false)}
                    className={`flex items-center gap-1.5 rounded-lg p-2 text-xs transition-colors ${
                      r.current
                        ? 'bg-white/20 text-white font-semibold'
                        : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <span className="truncate">{r.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
