'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  BarChart3,
  Building,
  ShieldAlert,
  MessageCircle,
  UserRound,
  Banknote,
  ShieldCheck,
  Activity,
  FileText,
  Monitor,
  Share2,
  Wrench,
  Bell,
  Settings,
  HelpCircle,
  LogOut,
  ChevronRight,
  ChevronDown,
  X,
  Check,
  CreditCard,
  Scale,
  Brain,
  Award,
  Sliders,
  Calendar,
  BookOpen,
  MessageSquare,
} from 'lucide-react';

export const ADMIN_NAV_SECTIONS = [
  {
    category: 'Overview',
    items: [
      { name: 'Dashboard', icon: LayoutDashboard, href: '/admin/dashboard' },
      { name: 'Analytics', icon: BarChart3, href: '/admin/analytics' },
    ],
  },
  {
    category: 'Operations & Safety',
    items: [
      { name: 'Verifications', icon: Building, href: '/admin/verifications', badge: '4' },
      { name: 'Moderation', icon: ShieldAlert, href: '/admin/moderation', badge: '9' },
      { name: 'Policies & Rules', icon: Scale, href: '/admin/policies' },
      { name: 'AI Quality & Audits', icon: Brain, href: '/admin/ai-quality' },
      { name: 'Support Tickets', icon: MessageCircle, href: '/admin/support', badge: '12' },
      { name: 'Users & Accounts', icon: UserRound, href: '/admin/users' },
    ],
  },
  {
    category: 'Finance & Compliance',
    items: [
      { name: 'Revenue & Billing', icon: Banknote, href: '/admin/billing' },
      { name: 'Plans & Entitlements', icon: CreditCard, href: '/admin/plans' },
      { name: 'Payouts & Refunds', icon: Banknote, href: '/admin/payouts' },
      { name: 'Compliance & DPDP', icon: ShieldCheck, href: '/admin/compliance' },
      { name: 'Data Requests', icon: FileText, href: '/admin/data-requests', badge: '4' },
      { name: 'Audit Trail', icon: Activity, href: '/admin/audit' },
    ],
  },
  {
    category: 'Programs & Search',
    items: [
      { name: 'Community Forum', icon: MessageSquare, href: '/admin/community' },
      { name: 'Grants & Incubators', icon: Award, href: '/admin/opportunities' },
      { name: 'Matching & Search', icon: Sliders, href: '/admin/matching' },
      { name: 'Events Management', icon: Calendar, href: '/admin/events' },
    ],
  },
  {
    category: 'Platform & System',
    items: [
      { name: 'Content & Articles', icon: FileText, href: '/admin/content' },
      { name: 'Templates & Rubrics', icon: FileText, href: '/admin/templates' },
      { name: 'System Health', icon: Monitor, href: '/admin/system' },
      { name: 'Integrations', icon: Share2, href: '/admin/integrations' },
      { name: 'Configuration', icon: Wrench, href: '/admin/config' },
      { name: 'Notifications', icon: Bell, href: '/notifications?role=admin' },
    ],
  },
  {
    category: 'Preferences',
    items: [
      { name: 'Admin User Manual', icon: BookOpen, href: '/admin/manual', badge: 'v4.2' },
      { name: 'Settings & Security', icon: Settings, href: '/admin/settings' },
      { name: 'Help & Runbooks', icon: HelpCircle, href: '/admin/help' },
    ],
  },
];

// Flat list for easy lookup
export const ADMIN_NAV_ITEMS = ADMIN_NAV_SECTIONS.flatMap((s) => s.items.map((i) => [i.name, i.icon, i.href]));

const ROLES = [
  { name: 'Administrator', path: '/admin/dashboard', desc: 'Current active role', current: true },
  { name: 'Startup Founder', path: '/startup/dashboard', desc: 'Forma Founder workspace' },
  { name: 'Investor', path: '/investor/dashboard', desc: 'Dealflow & Portfolio' },
  { name: 'Mentor', path: '/mentor/dashboard', desc: 'Advisory & Impact' },
  { name: 'Job Seeker', path: '/jobseeker/dashboard', desc: 'Opportunities & Profiles' },
  { name: 'Employer', path: '/employer/dashboard', desc: 'Hiring & Team Management' },
];

export default function AdminSidebar({
  active,
  activeNav,
  compact = false,
  setCompact,
  collapsed,
  onToggleCollapse,
  mobileOpen = false,
  setMobileOpen,
  onMobileClose,
  onAction,
}) {
  const pathname = usePathname();
  const [localCompact, setLocalCompact] = useState(false);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);

  const isCompact = compact !== undefined ? compact : (collapsed !== undefined ? collapsed : localCompact);
  const handleToggleCompact = setCompact || onToggleCollapse || setLocalCompact;
  const handleMobileClose = () => {
    if (setMobileOpen) setMobileOpen(false);
    if (onMobileClose) onMobileClose();
  };

  const getActiveFromPath = () => {
    if (!pathname) return 'Dashboard';
    if (pathname === '/admin' || pathname === '/admin/dashboard') return 'Dashboard';
    if (pathname.startsWith('/admin/analytics')) return 'Analytics';
    if (pathname.startsWith('/admin/verifications')) return 'Verifications';
    if (pathname.startsWith('/admin/moderation') || pathname.startsWith('/admin/reports') || pathname.startsWith('/admin/appeals') || pathname.startsWith('/admin/disputes') || pathname.startsWith('/admin/fraud')) return 'Moderation';
    if (pathname.startsWith('/admin/policies')) return 'Policies & Rules';
    if (pathname.startsWith('/admin/ai-quality')) return 'AI Quality & Audits';
    if (pathname.startsWith('/admin/support')) return 'Support Tickets';
    if (pathname.startsWith('/admin/users') || pathname.startsWith('/admin/organizations')) return 'Users & Accounts';
    if (pathname.startsWith('/admin/billing')) return 'Revenue & Billing';
    if (pathname.startsWith('/admin/plans')) return 'Plans & Entitlements';
    if (pathname.startsWith('/admin/payouts')) return 'Payouts & Refunds';
    if (pathname.startsWith('/admin/compliance') || pathname.startsWith('/admin/data-requests')) return 'Compliance & DPDP';
    if (pathname.startsWith('/admin/audit')) return 'Audit Trail';
    if (pathname.startsWith('/admin/community') || pathname.startsWith('/community')) return 'Community Forum';
    if (pathname.startsWith('/admin/opportunities')) return 'Grants & Incubators';
    if (pathname.startsWith('/admin/matching')) return 'Matching & Search';
    if (pathname.startsWith('/admin/events')) return 'Events Management';
    if (pathname.startsWith('/admin/content')) return 'Content & Articles';
    if (pathname.startsWith('/admin/templates') || pathname.startsWith('/admin/rubrics')) return 'Templates & Rubrics';
    if (pathname.startsWith('/admin/system')) return 'System Health';
    if (pathname.startsWith('/admin/integrations')) return 'Integrations';
    if (pathname.startsWith('/admin/config') || pathname.startsWith('/admin/configuration')) return 'Configuration';
    if (pathname.startsWith('/admin/notifications')) return 'Notifications';
    if (pathname.startsWith('/admin/settings') || pathname.startsWith('/admin/staff')) return 'Settings & Security';
    if (pathname.startsWith('/admin/help')) return 'Help & Runbooks';
    return 'Dashboard';
  };

  const resolvedActive = active || activeNav;
  const currentActive = resolvedActive
    ? (resolvedActive.startsWith('/') ? getActiveFromPath() : resolvedActive)
    : getActiveFromPath();

  const handleAction = (msg) => {
    if (onAction) onAction(msg);
  };

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 hidden flex-col bg-[#0F1B2D] text-white transition-all duration-200 lg:flex ${
          isCompact ? 'w-[76px]' : 'w-[240px]'
        }`}
      >
        {/* Brand Header */}
        <div
          className={`flex h-[76px] items-center border-b border-white/10 ${
            isCompact ? 'justify-center' : 'gap-3 px-6'
          }`}
        >
          <Link href="/admin/dashboard" className="flex items-center gap-3 overflow-hidden">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/30 font-serif text-lg text-[#B8955A]">
              F
            </span>
            {!isCompact && (
              <div className="flex items-baseline gap-1.5 font-bold tracking-tight">
                <span>forma</span>
                <span className="text-[10px] font-normal tracking-[0.16em] text-white/50">
                  ADMIN CONSOLE
                </span>
              </div>
            )}
          </Link>
        </div>

        {!isCompact && (
          <p className="px-6 pb-2 pt-5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/40">
            Administration
          </p>
        )}

        <nav
          className={`admin-sidebar-scrollbar flex-1 overflow-y-auto space-y-1 ${
            isCompact ? 'px-2 pt-4' : 'px-3'
          }`}
          aria-label="Admin Navigation"
        >
          {ADMIN_NAV_SECTIONS.map((section) => (
            <div key={section.category} className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = currentActive === item.name || currentActive === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    title={isCompact ? item.name : undefined}
                    className={`group relative flex h-11 items-center gap-3 rounded-lg text-[13px] font-medium transition ${
                      isCompact ? 'justify-center px-0' : 'justify-between px-3'
                    } ${
                      isActive
                        ? 'bg-[#1C2B42] text-white'
                        : 'text-white/65 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <span className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-r bg-[#B8955A]" />
                    )}
                    <div className="flex items-center gap-3">
                      <Icon
                        size={18}
                        className={isActive ? 'text-[#B8955A]' : 'text-white/60 group-hover:text-white'}
                      />
                      {!isCompact && <span>{item.name}</span>}
                    </div>
                    {!isCompact && item.badge && (
                      <span className="rounded-full bg-[#B8955A]/20 px-2 py-0.5 text-[10px] font-semibold text-[#B8955A]">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Compact Toggle Button */}
        <div className="px-3 pt-3">
          <button
            type="button"
            onClick={() => handleToggleCompact(!isCompact)}
            className={`flex h-9 w-full items-center gap-3 rounded-lg text-xs text-white/50 hover:bg-white/5 hover:text-white ${
              isCompact ? 'justify-center px-0' : 'px-3'
            }`}
            title={isCompact ? 'Expand sidebar' : 'Collapse sidebar'}
            aria-label={isCompact ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <ChevronRight
              size={16}
              className={`transition-transform duration-200 ${
                isCompact ? 'rotate-0' : 'rotate-180'
              }`}
            />
            {!isCompact && <span>Collapse sidebar</span>}
          </button>
        </div>

        <div className="mt-auto space-y-1 px-3 pb-5">
          <button
            type="button"
            onClick={() => handleAction('Admin settings opened.')}
            className={`flex h-11 w-full items-center gap-3 rounded-lg text-sm text-white/60 hover:bg-white/5 hover:text-white ${
              isCompact ? 'justify-center px-0' : 'px-3'
            }`}
            title={isCompact ? 'Settings' : undefined}
          >
            <Settings size={18} className="shrink-0" />
            {!isCompact && <span>Settings</span>}
          </button>
          <Link
            href="/admin/help"
            className={`flex h-11 w-full items-center gap-3 rounded-lg text-sm text-white/60 hover:bg-white/5 hover:text-white ${
              isCompact ? 'justify-center px-0' : 'px-3'
            }`}
            title={isCompact ? 'Help & runbooks' : undefined}
          >
            <HelpCircle size={18} className="shrink-0" />
            {!isCompact && <span>Help & runbooks</span>}
          </Link>

          {/* User Account Capsule */}
          <div className="relative mt-2">
          <div className="relative">
            <button
              type="button"
              onClick={() => setRoleMenuOpen(!roleMenuOpen)}
              className={`flex w-full items-center rounded-lg border border-white/10 p-2.5 text-left hover:bg-white/10 transition-all ${
                isCompact ? 'justify-center' : 'gap-3'
              }`}
              title="Admin account & role switcher"
              aria-expanded={roleMenuOpen}
              aria-haspopup="true"
            >
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#1C2B42] text-xs font-bold text-white border border-white/10">
                AK
              </span>
              {!isCompact && (
                <div className="flex flex-1 flex-col truncate">
                  <span className="truncate text-xs font-semibold text-white">Alex Kumar</span>
                  <span className="truncate text-[10px] text-white/60 font-mono">On-call SRE</span>
                </div>
              )}
              {!isCompact && <ChevronDown size={14} className="text-white/60" />}
            </button>

            {/* Role Switcher Menu Popup */}
            {roleMenuOpen && (
              <div
                className="absolute bottom-full left-0 mb-2 w-64 rounded-xl border border-white/15 bg-[#0F1B2D] p-2 text-white shadow-2xl z-50 animate-in fade-in slide-in-from-bottom-2"
                role="menu"
              >
                <div className="border-b border-white/10 px-3 py-2">
                  <div className="text-[10px] font-semibold text-white/40 uppercase tracking-wider">Switch Workspace</div>
                  <div className="text-xs font-semibold text-white">Select User Role</div>
                </div>
                <div className="mt-1 space-y-0.5">
                  {ROLES.map((r) => (
                    <Link
                      key={r.name}
                      href={r.path}
                      onClick={() => setRoleMenuOpen(false)}
                      className={`flex items-center justify-between rounded-lg px-3 py-2 text-xs transition-all ${
                        r.current
                          ? 'bg-[#1C2B42] text-white font-medium'
                          : 'text-white/70 hover:bg-white/10 hover:text-white'
                      }`}
                      role="menuitem"
                    >
                      <div className="flex flex-col">
                        <span>{r.name}</span>
                        <span className="text-[10px] text-white/50">{r.desc}</span>
                      </div>
                      {r.current && <Check size={14} className="text-[#B8955A]" />}
                    </Link>
                  ))}
                </div>
                <div className="mt-1 border-t border-white/10 pt-1">
                  <Link
                    href="/admin/login"
                    onClick={() => {
                      setRoleMenuOpen(false);
                      handleAction('Signing out');
                    }}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs text-rose-300 hover:bg-rose-500/10 transition-all"
                    role="menuitem"
                  >
                    <LogOut size={13} />
                    <span>Sign out</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
          </div>
        </div>
      </aside>

      {/* Mobile Slide-Out Drawer (< 1024px) */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={handleMobileClose}
            aria-hidden="true"
          />

          {/* Drawer container */}
          <div className="fixed inset-y-0 left-0 w-[280px] bg-[#0F1B2D] text-white shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-200">
            {/* Header */}
            <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
              <Link href="/admin/dashboard" onClick={handleMobileClose} className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-[#1C2B42] border border-white/20 font-serif text-xs font-semibold text-[#B8955A]">
                  ADM
                </span>
                <div className="flex flex-col">
                  <span className="font-serif text-sm font-semibold tracking-tight text-white">Forma</span>
                  <span className="text-[10px] tracking-wider text-white/50 uppercase font-mono">Admin Console</span>
                </div>
              </Link>
              <button
                type="button"
                onClick={handleMobileClose}
                className="rounded-lg p-1.5 text-white/70 hover:bg-white/10 hover:text-white"
                aria-label="Close mobile navigation"
              >
                <X size={18} />
              </button>
            </div>

            {/* Scrollable Nav Items */}
            <nav className="admin-sidebar-scrollbar flex-1 space-y-1 overflow-y-auto" aria-label="Mobile Admin Navigation">
              {ADMIN_NAV_SECTIONS.map((section) => (
                <div key={section.category} className="space-y-1">
                  <div className="px-3 pb-1 pt-3 text-[10px] font-semibold tracking-wider text-white/40 uppercase">
                    {section.category}
                  </div>
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentActive === item.name || currentActive === item.href;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={handleMobileClose}
                        className={`flex h-11 items-center justify-between rounded-lg px-3 text-sm transition ${
                          isActive
                            ? 'bg-[#1C2B42] font-semibold text-white'
                            : 'text-white/70 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon size={17} className={isActive ? 'text-[#B8955A]' : 'text-white/60'} />
                          <span>{item.name}</span>
                        </div>
                        {item.badge && (
                          <span className="rounded-full bg-[#B8955A]/20 px-2 py-0.5 text-[10px] font-semibold text-[#B8955A]">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              ))}
            </nav>

            {/* Mobile Footer */}
            <div className="border-t border-white/10 p-3">
              <div className="mb-2 text-[10px] font-semibold text-white/40 uppercase tracking-wider px-2">Role Switcher</div>
              <div className="grid grid-cols-2 gap-1.5 mb-2">
                {ROLES.slice(1).map((r) => (
                  <Link
                    key={r.name}
                    href={r.path}
                    onClick={handleMobileClose}
                    className="rounded-lg bg-white/5 px-2 py-1.5 text-[11px] text-white/80 hover:bg-white/10 hover:text-white truncate"
                  >
                    {r.name}
                  </Link>
                ))}
              </div>
              <Link
                href="/admin/login"
                onClick={() => {
                  handleMobileClose();
                  handleAction('Signing out');
                }}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-xs font-medium text-rose-300 hover:bg-rose-500/20"
              >
                <LogOut size={13} />
                <span>Sign out</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
