"use client";
import { useState, useCallback } from "react";
import Link from "next/link";
import {
  X,
  Settings,
  HelpCircle,
  Search,
  Bell,
  RefreshCcw,
  ChevronDown,
  LayoutDashboard,
  Building as BuildingIcon,
  ShieldAlert as ShieldAlertIcon,
  AlertCircle,
  Scale,
  Award,
  ShieldCheck,
  MessageCircle,
  UserRound,
  Building2,
  File as FileIcon,
  List,
  Calendar as CalendarIcon,
  Banknote,
  BarChart3,
  Activity as ActivityIcon,
  Monitor as MonitorIcon,
  Share2,
  Wrench,
} from "lucide-react";

// ------------------------------------------------------------
// Design tokens (shared across all admin operations pages)
// ------------------------------------------------------------
export const INK = "#0F1B2D";
export const INK_SOFT = "#1C2B42";
export const IVORY = "#FAF8F4";
export const WHITE = "#FFFFFF";
export const GOLD = "#B8955A";
export const GOLD_DARK = "#9A7A45";
export const GOLD_TINT = "#F3EBDD";
export const STONE_700 = "#4A5568";
export const STONE_400 = "#A0A7B4";
export const STONE_200 = "#E5E1D8";
export const SUCCESS = "#2E7D5B";
export const SUCCESS_TINT = "#E7F3EC";
export const SUCCESS_DARK = "#286749";
export const WARNING = "#B7791F";
export const WARNING_TINT = "#FDF3E0";
export const WARNING_DARK = "#9A6210";
export const ERROR = "#B42318";
export const ERROR_TINT = "#FBE9E7";
export const ERROR_DARK = "#8E1A12";
export const INFO = "#2F5D8A";
export const INFO_TINT = "#E8F0F8";

export const RADIUS_CARD = "rounded-[12px]";
export const RADIUS_CONTROL = "rounded-[10px]";

export const user = {
  name: "Alex Kumar",
  internalRole: "On-call engineer",
  internalRoles: ["On-call engineer", "SRE"],
  sessionExpiresAt: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(),
  idleTimeoutAt: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
};

export const environment = "production";

// ------------------------------------------------------------
// Toast (shared)
// ------------------------------------------------------------
let toastListeners = [];
export function onToast(listener) {
  toastListeners.push(listener);
  return () => {
    toastListeners = toastListeners.filter((l) => l !== listener);
  };
}
export function toast(msg) {
  toastListeners.forEach((l) => l(msg));
}

// ------------------------------------------------------------
// Shared UI primitives
// ------------------------------------------------------------
export function Card({ title, titleIcon: TitleIcon, padded = true, className = "", children }) {
  const padding = padded ? "p-5" : "p-0";
  return (
    <section className={`border border-solid ${RADIUS_CARD} bg-white ${className} ${padding}`}>
      {title && (
        <div className="flex items-center justify-between mb-4 border-b border-solid border-[#E5E1D8] pb-3">
          <div className="flex items-center gap-2">
            {TitleIcon && <TitleIcon size={15} className="text-[#4A5568]" />}
            <h3 className="text-[15px] font-semibold">{title}</h3>
          </div>
        </div>
      )}
      <div>{children}</div>
    </section>
  );
}

export function Btn({
  children,
  onClick,
  secondary,
  small,
  destructive,
  type = "button",
  className = "",
  icon: IconComp,
}) {
  const handleClick = (e) => {
    e.preventDefault();
    if (onClick) onClick(e);
  };
  return (
    <button
      type={type}
      onClick={handleClick}
      className={`inline-flex items-center justify-center gap-2 ${RADIUS_CONTROL} border border-transparent bg-white px-3 py-2 text-[12px] font-medium text-[#0F1B2D] transition ${secondary
        ? `border-[#E5E1D8] text-[#4A5568] bg-[#F4F1EA] hover:bg-[#F3EBDD]`
        : destructive
          ? `border-[#FBE9E7] text-[#B42318] hover:bg-[#FBE9E7]`
          : `bg-[#0F1B2D] text-white hover:bg-[#1C2B42]`} ${small
        ? "px-2 py-1.5 text-[11px] min-w-[72px]"
        : "px-4 py-2 text-[12px] min-w-[80px]"} ${className}`}
    >
      {IconComp && <span className="flex-shrink-0"><IconComp /></span>}
      {children}
    </button>
  );
}

export function BtnIcon({ onClick, secondary, size, className = "", icon: IconComp, title, destructive }) {
  const handleClick = (e) => {
    e.preventDefault();
    if (onClick) onClick(e);
  };
  return (
    <button
      type="button"
      onClick={handleClick}
      className={`inline-flex items-center justify-center ${RADIUS_CONTROL} border border-transparent ${secondary
        ? `border-[#E5E1D8] text-[#4A5568] bg-[#F4F1EA] hover:bg-[#F3EBDD]`
        : destructive
          ? `border-[#FBE9E7] text-[#B42318] hover:bg-[#FBE9E7]`
          : `bg-[#0F1B2D] text-white hover:bg-[#1C2B42]`} ${size === "small"
        ? "h-8 w-8 p-0"
        : "h-10 w-10 p-0"} ${className}`}
      aria-label={title}
    >
      <IconComp size={size === "small" ? 13 : 16} />
    </button>
  );
}

export function StatChip({ status, count }) {
  const maps = {
    operational: `border-[#E7F3EC] bg-[#E7F3EC] text-[#286749]`,
    degraded: `border-[#FDF3E0] bg-[#FDF3E0] text-[#9A6210]`,
    "partial-outage": `border-[#FBE9E7] bg-[#FBE9E7] text-[#B42318]`,
    "major-outage": `border-[#FBE9E7] bg-[#FBE9E7] text-[#B42318]`,
    maintenance: `border-[#E8F0F8] text-[#2F5D8A]`,
    unknown: `border-[#E5E1D8] text-[#4A5568]`,
    SEV1: `border-[#FBE9E7] bg-[#FBE9E7] text-[#B42318]`,
    SEV2: `border-[#FBE9E7] text-[#B42318]`,
    SEV3: `border-[#FDF3E0] text-[#9A6210]`,
    SEV4: `border-[#E5E1D8] text-[#4A5568]`,
    investigating: `border-[#E8F0F8] text-[#2F5D8A]`,
    identified: `border-[#E8F0F8] text-[#2F5D8A]`,
    mitigating: `border-[#FDF3E0] text-[#9A6210]`,
    monitoring: `border-[#FDF3E0] text-[#9A6210]`,
    resolved: `border-[#E7F3EC] text-[#286749]`,
    "postmortem-due": `border-[#FDF3E0] text-[#9A6210]`,
    closed: `border-[#E5E1D8] text-[#4A5568]`,
    firing: `border-[#FBE9E7] bg-[#FBE9E7] text-[#B42318]`,
    acknowledged: `border-[#E5E1D8] text-[#4A5568]`,
    muted: `border-[#E5E1D8] text-[#4A5568]`,
    certified: `border-[#E7F3EC] bg-[#E7F3EC] text-[#286749]`,
    provisional: `border-[#FDF3E0] bg-[#FDF3E0] text-[#9A6210]`,
    deprecated: `border-[#E5E1D8] text-[#4A5568]`,
    suppressed: `border-[#E5E1D8] text-[#4A5568]`,
    live: `border-[#E7F3EC] text-[#286749]`,
    delayed: `border-[#FDF3E0] text-[#9A6210]`,
    incomplete: `border-[#FDF3E0] text-[#9A6210]`,
    "on-track": `border-[#E7F3EC] bg-[#E7F3EC] text-[#286749]`,
    "needs-attention": `border-[#FDF3E0] bg-[#FDF3E0] text-[#9A6210]`,
    overdue: `border-[#FBE9E7] bg-[#FBE9E7] text-[#B42318]`,
    "under-review": `border-[#E8F0F8] text-[#2F5D8A]`,
    "not-applicable": `border-[#E5E1D8] text-[#4A5568]`,
    notifiable: `border-[#FBE9E7] bg-[#FBE9E7] text-[#B42318]`,
    high: `border-[#FBE9E7] bg-[#FBE9E7] text-[#B42318]`,
    medium: `border-[#FDF3E0] bg-[#FDF3E0] text-[#9A6210]`,
    low: `border-[#E5E1D8] text-[#4A5568]`,
    verified: `border-[#E7F3EC] bg-[#E7F3EC] text-[#286749]`,
    "gap-detected": `border-[#FBE9E7] bg-[#FBE9E7] text-[#B42318]`,
    verifying: `border-[#E5E1D8] text-[#4A5568]`,
    all: `border-[#E5E1D8] text-[#4A5568]`,
    startup: `border-[#E5E1D8] text-[#4A5568]`,
    mentor: `border-[#E5E1D8] text-[#4A5568]`,
    investor: `border-[#E5E1D8] text-[#4A5568]`,
    "job-seeker": `border-[#E5E1D8] text-[#4A5568]`,
    employer: `border-[#E5E1D8] text-[#4A5568]`,
    partner: `border-[#E5E1D8] text-[#4A5568]`,
    "7-days": `border-[#E5E1D8] text-[#4A5568]`,
    "30-days": `border-[#E5E1D8] text-[#4A5568]`,
    "90-days": `border-[#E5E1D8] text-[#4A5568]`,
    "this-quarter": `border-[#E5E1D8] text-[#4A5568]`,
    "this-year": `border-[#E5E1D8] text-[#4A5568]`,
    custom: `border-[#E5E1D8] text-[#4A5568]`,
    previous: `border-[#E5E1D8] text-[#4A5568]`,
    "same-period-last-year": `border-[#E5E1D8] text-[#4A5568]`,
    inr: `border-[#E5E1D8] text-[#4A5568]`,
    role: `border-[#E5E1D8] text-[#4A5568]`,
    country: `border-[#E5E1D8] text-[#4A5568]`,
    plan: `border-[#E5E1D8] text-[#4A5568]`,
    channel: `border-[#E5E1D8] text-[#4A5568]`,
    cohort: `border-[#E5E1D8] text-[#4A5568]`,
    "open-obligations": `border-[#E8F0F8] text-[#2F5D8A]`,
    "overdue-items": `border-[#FBE9E7] text-[#B42318]`,
    "incidents-open": `border-[#FBE9E7] text-[#B42318]`,
    "requests-in-progress": `border-[#FDF3E0] text-[#9A6210]`,
    success: `border-[#E7F3EC] bg-[#E7F3EC] text-[#286749]`,
    blocked: `border-[#FBE9E7] bg-[#FBE9E7] text-[#B42318]`,
    failed: `border-[#FBE9E7] bg-[#FBE9E7] text-[#B42318]`,
    admin: `border-[#E5E1D8] text-[#4A5568]`,
    "sensitive-access": `border-[#E5E1D8] text-[#4A5568]`,
    security: `border-[#E5E1D8] text-[#4A5568]`,
    configuration: `border-[#E5E1D8] text-[#4A5568]`,
    money: `border-[#E5E1D8] text-[#4A5568]`,
    moderation: `border-[#E5E1D8] text-[#4A5568]`,
    verification: `border-[#E5E1D8] text-[#4A5568]`,
    "data-rights": `border-[#E5E1D8] text-[#4A5568]`,
    system: `border-[#E5E1D8] text-[#4A5568]`,
    new: `border-[#E5E1D8] text-[#4A5568]`,
    reviewing: `border-[#FDF3E0] text-[#9A6210]`,
    benign: `border-[#E7F3EC] text-[#286749]`,
    escalated: `border-[#FBE9E7] text-[#B42318]`,
    healthy: `border-[#E7F3EC] text-[#286749]`,
    "failed-over": `border-[#F3EBDD] bg-[#F3EBDD] text-[#806236]`,
    "sandbox-only": `border-[#E5E1D8] text-[#4A5568]`,
    draft: `border-[#E5E1D8] text-[#4A5568]`,
    "in-review": `border-[#E8F0F8] text-[#2F5D8A]`,
    scheduled: `border-[#E8F0F8] text-[#2F5D8A]`,
    staged: `border-[#FDF3E0] text-[#9A6210]`,
    rolledback: `border-[#FBE9E7] text-[#B42318]`,
    overridden: `border-[#E5E1D8] text-[#4A5568]`,
    standard: `border-[#E5E1D8] text-[#4A5568]`,
    sensitive: `border-[#FDF3E0] text-[#9A6210]`,
    protected: `border-[#E5E1D8] text-[#4A5568]`,
    production: `border-[#E5E1D8] text-[#4A5568]`,
    down: `border-[#FBE9E7] text-[#B42318]`,
    critical: `border-[#FBE9E7] text-[#B42318]`,
    important: `border-[#FDF3E0] text-[#9A6210]`,
    optional: `border-[#E5E1D8] text-[#4A5568]`,
  };
  const label =
    status === "operational" ? "Operational" :
    status === "degraded" ? "Degraded" :
    status === "partial-outage" ? "Partial outage" :
    status === "major-outage" ? "Major outage" :
    status === "maintenance" ? "Maintenance" :
    status === "unknown" ? "Unknown" :
    status === "SEV1" ? "SEV1" :
    status === "SEV2" ? "SEV2" :
    status === "SEV3" ? "SEV3" :
    status === "SEV4" ? "SEV4" :
    status === "investigating" ? "Investigating" :
    status === "identified" ? "Identified" :
    status === "mitigating" ? "Mitigating" :
    status === "monitoring" ? "Monitoring" :
    status === "resolved" ? "Resolved" :
    status === "postmortem-due" ? "Postmortem due" :
    status === "closed" ? "Closed" :
    status === "firing" ? "Firing" :
    status === "acknowledged" ? "Acknowledged" :
    status === "muted" ? "Muted" :
    status === "healthy" ? "Healthy" :
    status === "failed-over" ? "Failed over" :
    status === "sandbox-only" ? "Sandbox only" :
    status === "draft" ? "Draft" :
    status === "in-review" ? "In review" :
    status === "scheduled" ? "Scheduled" :
    status === "staged" ? "Staged" :
    status === "rolledback" ? "Rolled back" :
    status === "overridden" ? "Overridden" :
    status === "standard" ? "Standard" :
    status === "sensitive" ? "Sensitive" :
    status === "protected" ? "Protected" :
    status === "production" ? "Production" :
    status === "down" ? "Down" :
    status === "critical" ? "Critical" :
    status === "important" ? "Important" :
    status === "optional" ? "Optional" :
    status ? status.replace("-", " ") : "Unknown";
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium ${maps[status] || maps.all}`}
    >
      {label}
    </span>
  );
}

export function SectionHead({ title, subtitle, children, className = "" }) {
  return (
    <div className={`flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 ${className}`}>
      <div>
        <h2 className="text-[28px] font-serif font-semibold">{title}</h2>
        {subtitle && <p className="text-[12px] text-[#4A5568] mt-1">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-2">{children}</div>
    </div>
  );
}

export function EmptyState({ icon: Icon, title, subtitle, action, actionLabel }) {
  return (
    <div className="flex flex-col items-center gap-3 text-center py-12">
      <div className="grid h-16 w-16 place-items-center rounded-full bg-[#F3EBDD]">
        <Icon size={24} />
      </div>
      <h3 className="text-[15px] font-semibold">{title}</h3>
      <p className="text-[12px] text-[#4A5568] max-w-[260px]">{subtitle}</p>
      {action && <Btn onClick={action}>{actionLabel}</Btn>}
    </div>
  );
}

export function SkeletonCard({ className = "" }) {
  return <div className={`h-48 rounded-[12px] bg-[#E5E1D8] animate-pulse ${className}`} />;
}

export function ToggleSwitch({ checked, onChange }) {
  return (
    <button
      type="button"
      onClick={onChange}
      role="switch"
      aria-checked={checked}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${checked ? "bg-[#B8955A]" : "bg-[#E5E1D8]"}`}
    >
      <span className={`block h-4 w-4 rounded-full bg-white shadow-md transition-transform ${checked ? "translate-x-5" : "translate-x-0.5"}`} />
    </button>
  );
}

export function DetailDrawer({ open, onClose, title, children, className = "" }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex" aria-modal="true">
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-[720px] h-full flex flex-col bg-white border-l border-solid border-[#E5E1D8] shadow-lg ml-auto">
        <div className="flex items-center justify-between border-b border-solid border-[#E5E1D8] px-6 py-4 bg-[#FAF8F4]">
          <h3 className="text-[15px] font-semibold">{title}</h3>
          <BtnIcon size="small" secondary icon={X} title="Close" onClick={onClose} />
        </div>
        <div className="flex-1 overflow-y-auto p-6">{children}</div>
      </div>
    </div>
  );
}

export function formatAge(seconds) {
  const d = Math.floor(seconds / 86400);
  const h = Math.floor((seconds % 86400) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (d > 0) return `${d}d ${h}h`;
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

export function relativeDate(iso) {
  const d = new Date(iso);
  const now = new Date();
  const days = Math.floor((now - d) / (1000 * 60 * 60 * 24));
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  return `${Math.floor(days / 30)}mo ago`;
}

// ------------------------------------------------------------
// Sidebar
// ------------------------------------------------------------
export const sidebarItems = [
  ["Dashboard", LayoutDashboard, "/admin/dashboard"],
  ["Verifications", BuildingIcon, "/admin/verifications"],
  ["Moderation", ShieldAlertIcon, "/admin/moderation"],
  ["Reports", AlertCircle, "/admin/reports"],
  ["Appeals", Scale, "/admin/appeals"],
  ["Disputes", Award, "/admin/disputes"],
  ["Fraud", ShieldAlertIcon, "/admin/fraud"],
  ["Support", MessageCircle, "/admin/support"],
  ["Users", UserRound, "/admin/users"],
  ["Organizations", BuildingIcon, "/admin/organizations"],
  ["Staff", ShieldCheck, "/admin/staff"],
  ["Content", FileIcon, "/admin/content"],
  ["Templates", FileIcon, "/admin/templates"],
  ["Rubrics", List, "/admin/rubrics"],
  ["Events", CalendarIcon, "/admin/events"],
  ["Billing", Banknote, "/admin/billing"],
  ["Analytics", BarChart3, "/admin/analytics"],
  ["Compliance", ShieldCheck, "/admin/compliance"],
  ["Audit", ActivityIcon, "/admin/audit"],
  ["System", MonitorIcon, "/admin/system"],
  ["Integrations", Share2, "/admin/integrations"],
  ["Configuration", Wrench, "/admin/config"],
  ["Notifications", Bell, "/admin/notifications"],
  ["Settings", Settings, "/admin/settings"],
  ["Help", HelpCircle, "/admin/help"],
];

export function AdminSidebar({ active }) {
  return (
    <aside className="fixed inset-y-0 left-0 z-20 hidden w-[232px] flex-col border-r border-solid border-[#E5E1D8] bg-[#0F1B2D] text-white lg:block">
      <div className="flex h-[64px] items-center justify-between border-b border-solid border-white/10 px-4">
        <div className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-full border border-white/30 font-serif">ADM</span>
          <b className="text-xs font-semibold tracking-wide uppercase">Admin</b>
        </div>
      </div>
      <nav className="mt-4 space-y-0.5 px-2">
        {sidebarItems.map(([n, I, u]) => {
          const Comp = I;
          const isActive = n === active;
          return (
            <Link key={n} href={u} className={`relative flex h-10 items-center gap-3 rounded-[10px] px-3 text-[12px] ${isActive ? "bg-[#1C2B42] text-white" : "text-white/70 hover:bg-white/10 transition"}`}>
              <Comp size={16} />
              {n}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto border-t border-solid border-white/10 px-2 pt-3 space-y-1 pb-4">
        <BtnIcon size="small" secondary icon={Settings} title="Settings" onClick={() => toast("Settings opening")} />
        <BtnIcon size="small" secondary icon={HelpCircle} title="Runbooks" onClick={() => toast("Runbooks opening")} />
        <button type="button" onClick={() => toast("Signing out")} className="flex w-full items-center gap-3 rounded-[10px] border border-white/10 px-3 py-2 text-left text-[12px] text-white/70 hover:bg-white/10 transition">
          <span className="flex-shrink-0">Sign out</span>
        </button>
      </div>
    </aside>
  );
}

// ------------------------------------------------------------
// Common layout components
// ------------------------------------------------------------
export function MetricCard({ label, value, sub, status = "live" }) {
  return (
    <Card title padded className="border-[#E5E1D8]">
      <div className="px-5 pt-3 pb-4">
        <div className="flex items-baseline gap-1 mb-2">
          <b className="text-[32px] font-serif font-semibold text-[#0F1B2D] tabular-nums">{value}</b>
          <StatChip status={status} />
        </div>
        <p className="text-[12px] text-[#4A5568]">{label}</p>
        <p className="text-[11px] text-[#4A5568]">{sub}</p>
      </div>
    </Card>
  );
}


const defaultTabs = [
  { key: "overview", label: "Overview" },
  { key: "services-and-slos", label: "Services and SLOs" },
  { key: "alerts", label: "Alerts" },
  { key: "incidents", label: "Incidents" },
  { key: "status-page", label: "Status page" },
  { key: "on-call-and-runbooks", label: "On-call and runbooks" },
  { key: "maintenance-and-changes", label: "Maintenance and changes" },
  { key: "journeys", label: "Journeys" },
  { key: "capacity-and-cost", label: "Capacity and cost" },
  { key: "resilience", label: "Resilience" },
];

const defaultFilters = [
  { key: "24-hours", label: "Last 24 hours" },
  { key: "7-days", label: "Last 7 days" },
  { key: "30-days", label: "Last 30 days" },
  { key: "90-days", label: "Last 90 days" },
  { key: "custom", label: "Custom range" },
];

export function TabBar({ active, onChange, tabs = defaultTabs }) {
  return (
    <div className="flex gap-1 overflow-x-auto mb-3 pb-1 border-b border-solid border-[#E5E1D8]">
      {tabs.map((t) => (
        <button key={t.key} type="button" onClick={() => onChange(t.key)} className={`border-b-2 px-4 py-3 text-xs font-medium transition whitespace-nowrap ${active === t.key ? `border-[#B8955A] text-[#0F1B2D]` : `border-transparent text-[#4A5568] hover:text-[#0F1B2D]`}`}>
          {t.label}
        </button>
      ))}
    </div>
  );
}

export function RangeFilter({ active, onChange, filters = defaultFilters }) {
  return (
    <div className="flex gap-2 overflow-x-auto mb-3 pb-1 border-b border-solid border-[#E5E1D8]">
      {filters.map((r) => (
        <button key={r.key} type="button" onClick={() => onChange(r.key)} className={`px-3 py-1.5 rounded-[10px] border text-[10px] font-medium transition whitespace-nowrap ${active === r.key ? `border-[#B8955A] bg-[#F3EBDD] text-[#806236]` : `border-[#E5E1D8] text-[#4A5568] hover:text-[#0F1B2D]`}`}>
          {r.label}
        </button>
      ))}
    </div>
  );
}

export function EnvironmentStrip() {
  const isProd = environment === "production";
  return (
    <div className="h-8 flex items-center justify-center border-b border-solid border-[#E5E1D8] bg-[#0F1B2D] text-white">
      <span className={`px-2.5 py-0.5 rounded text-[10px] font-medium tracking-wide ${isProd ? "bg-white text-[#0F1B2D]" : "bg-[#F3EBDD] text-[#0F1B2D]"}`}>
        {environment.toUpperCase()}
      </span>
      {isProd ? (
        <span className="ml-3 text-[10px] text-white/70">Internal team console · All actions logged</span>
      ) : (
        <span className="ml-3 text-[10px] text-[#0F1B2D] font-medium">Synthetic data only — no real user data</span>
      )}
    </div>
  );
}

export function TopBar({ onRefresh }) {
  return (
    <header className="sticky top-0 z-10 flex h-[56px] items-center justify-between border-b border-solid border-[#E5E1D8] bg-[#FAF8F4]/95 px-4 backdrop-blur">
      <div className="flex items-center gap-3">
        <button type="button" onClick={() => toast("Command palette opening")} className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-solid border-[#E5E1D8] bg-white text-[#0F1B2D] hover:bg-[#F3EBDD] transition" title="Search and commands (⌘K)">
          <Search size={16} />
          <span className="sr-only">Search and commands</span>
        </button>
        <div className="flex items-center gap-2 ml-2">
          <span className="h-2 w-2 rounded-full bg-[#2E7D5B]" />
          <span className="text-[11px] font-semibold text-[#4A5568]">All systems operational</span>
        </div>
        <BtnIcon size="small" secondary icon={Bell} title="Alerts" onClick={() => toast("Alerts opening")} />
      </div>
      <div className="flex items-center gap-3">
        <Btn size="small" secondary icon={RefreshCcw} onClick={onRefresh} title="Refresh" />
        <button type="button" className="flex items-center gap-2 rounded-[10px] border border-solid border-[#E5E1D8] bg-white px-3 py-2 text-left" onClick={() => toast("Profile menu opening")}>
          <span className="grid h-8 w-8 place-items-center rounded-full bg-[#0F1B2D] text-[11px] font-bold text-white">AK</span>
          <div className="flex flex-col">
            <span className="block text-[12px] font-medium text-[#0F1B2D]">{user.name}</span>
            <span className="block text-[10px] text-[#4A5568]">{user.internalRole}</span>
          </div>
          <ChevronDown size={12} className="ml-1" />
        </button>
      </div>
    </header>
  );
}
