"use client";
import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  Clock,
  AlertCircle,
  CheckCircle2,
  AlertTriangle,
  Info,
  X,
  ArrowRight,
  ChevronDown,
  Copy,
  Download,
  Link as LinkIcon,
  Edit,
  Lock,
  Settings,
  HelpCircle,
  Mail,
  MessageCircle,
  Shield,
  ShieldAlert as ShieldAlertIcon,
  Banknote,
  Ticket,
  Target,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Gauge,
  Scale,
  LayoutGrid,
  LayoutList,
  Inbox,
  Paperclip,
  Image as ImageIcon,
  Video,
  Phone,
  Headphones,
  Globe,
  GitBranch,
  Code,
  Folder,
  Archive,
  Zap,
  Award,
  Share2,
  RotateCcw,
  Link2,
  User2,
  Layout,
  PanelLeft,
  ClipboardList,
  AreaChart,
  CandlestickChart,
  Thermometer,
  Heart,
  Speaker,
  Mic,
  Camera,
  Key,
  LayoutDashboard,
  Bolt,
  Cpu,
  Database,
  UserCheck,
  UserX,
  UserPlus,
  UserMinus,
  UserCircle,
  UserCircle2,
  Wrench,
  Building as BuildingIcon,
  Briefcase as BriefcaseIcon,
  Monitor as MonitorIcon,
  Activity as ActivityIcon,
  File as FileIcon,
  User as UserIcon,
  Calendar as CalendarIcon,
  RefreshCcw,
  List,
  BarChart3,
  PieChart,
  UserRound,
  ShieldCheck,
  Bell,
  ChevronLeft,
  ChevronUp,
  Menu,
  MoreHorizontal,
  Tag,
  HardHat,
  Stethoscope,
  Briefcase as Briefcase2Icon,
  Eye,
  EyeOff,
  Save,
  Send,
  Trash2,
  Minus,
  Plus,
  Unlock,
  HardHat as HardHatIcon,
  AtSign,
  ShieldUser,
  ShieldOff,
  Share,
  Clock as ClockIcon,
  FileText,
  FileCode,
  FileCheck,
  FileDiff,
  CreditCard,
  Build,
  Globe as GlobeIcon,
  Users,
  GraduationCap,
  Briefcase as Briefcase3Icon,
  DollarSign,
  PieChart as PieChartIcon,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Design tokens (matching admin-dashboard-design.md Part 2)         */
/* ------------------------------------------------------------------ */
const INK = "#0F1B2D";
const INK_SOFT = "#1C2B42";
const IVORY = "#FAF8F4";
const WHITE = "#FFFFFF";
const GOLD = "#B8955A";
const GOLD_DARK = "#9A7A45";
const GOLD_TINT = "#F3EBDD";
const STONE_700 = "#4A5568";
const STONE_400 = "#A0A7B4";
const STONE_200 = "#E5E1D8";
const SUCCESS = "#2E7D5B";
const SUCCESS_TINT = "#E7F3EC";
const SUCCESS_DARK = "#286749";
const WARNING = "#B7791F";
const WARNING_TINT = "#FDF3E0";
const WARNING_DARK = "#9A6210";
const ERROR = "#B42318";
const ERROR_TINT = "#FBE9E7";
const ERROR_DARK = "#8E1A12";
const INFO = "#2F5D8A";
const INFO_TINT = "#E8F0F8";

const RADIUS_CARD = "rounded-[12px]";
const RADIUS_CONTROL = "rounded-[10px]";

/* ------------------------------------------------------------------ */
/*  Mock user / roles (server enforces in production)                 */
/* ------------------------------------------------------------------ */
const user = {
  name: "Alex Kumar",
  internalRole: "Analyst",
  internalRoles: ["Analyst"],
  sessionExpiresAt: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(),
  idleTimeoutAt: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
};

const environment = "production";

/* ------------------------------------------------------------------ */
/*  Simple toast                                                      */
/* ------------------------------------------------------------------ */
let toastListeners = [];
export function onToast(listener) {
  toastListeners.push(listener);
  return () => {
    toastListeners = toastListeners.filter((l) => l !== listener);
  };
}
function toast(msg) {
  toastListeners.forEach((l) => l(msg));
}

/* ------------------------------------------------------------------ */
/*  Currency formatting                                               */
/* ------------------------------------------------------------------ */
function formatMoney(paise) {
  const sign = paise < 0 ? "\u2212" : "";
  const rupees = Math.abs(paise) / 100;
  const parts = rupees.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return `${sign}₹${parts}`;
}

/* ------------------------------------------------------------------ */
/*  Shared UI primitives (12px+, WCAG AA, overflow-x-auto tables)     */
/* ------------------------------------------------------------------ */

function Card({ title, titleIcon: TitleIcon, padded = true, className = "", children }) {
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

function Btn({
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

function BtnIcon({ onClick, secondary, size, className = "", icon: IconComp, title, destructive }) {
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

function StatChip({ status, count }) {
  const maps = {
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
  };
  const label =
    status === "certified" ? "Certified" :
    status === "provisional" ? "Provisional" :
    status === "deprecated" ? "Deprecated" :
    status === "suppressed" ? "Suppressed" :
    status === "live" ? "Live" :
    status === "delayed" ? "Delayed" :
    status === "incomplete" ? "Incomplete" :
    status === "on-track" ? "On track" :
    status === "needs-attention" ? "Needs attention" :
    status === "overdue" ? "Overdue" :
    status === "under-review" ? "Under review" :
    status === "not-applicable" ? "Not applicable" :
    status === "notifiable" ? "Notifiable" :
    status === "high" ? "High" :
    status === "medium" ? "Medium" :
    status === "low" ? "Low" :
    status === "verified" ? "Verified" :
    status === "gap-detected" ? "Gap detected" :
    status === "verifying" ? "Verifying" :
    status === "all" ? "All" :
    status === "startup" ? "Startup" :
    status === "mentor" ? "Mentor" :
    status === "investor" ? "Investor" :
    status === "job-seeker" ? "Job seeker" :
    status === "employer" ? "Employer" :
    status === "partner" ? "Partner" :
    status === "7-days" ? "Last 7 days" :
    status === "30-days" ? "Last 30 days" :
    status === "90-days" ? "Last 90 days" :
    status === "this-quarter" ? "This quarter" :
    status === "this-year" ? "This financial year" :
    status === "custom" ? "Custom range" :
    status === "previous" ? "Previous period" :
    status === "same-period-last-year" ? "Same period last year" :
    status === "inr" ? "INR" :
    status === "role" ? "Role" :
    status === "country" ? "Country" :
    status === "plan" ? "Plan" :
    status === "channel" ? "Channel" :
    status === "cohort" ? "Cohort month" :
    status.replace("-", " ");
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium ${maps[status] || maps.all}`}
    >
      {label}
    </span>
  );
}

function SectionHead({ title, subtitle, children, className = "" }) {
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

function EmptyState({ icon: Icon, title, subtitle, action, actionLabel }) {
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

function SkeletonCard({ className = "" }) {
  return (
    <div className={`h-48 rounded-[12px] bg-[#E5E1D8] animate-pulse ${className}`} />
  );
}

function ToggleSwitch({ checked, onChange }) {
  return (
    <button
      type="button"
      onClick={onChange}
      role="switch"
      aria-checked={checked}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${checked ? "bg-[#B8955A]" : "bg-[#E5E1D8]"}`}
    >
      <span
        className={`block h-4 w-4 rounded-full bg-white shadow-md transition-transform ${checked ? "translate-x-5" : "translate-x-0.5"}`}
      />
    </button>
  );
}

function DetailDrawer({ open, onClose, title, children, className = "" }) {
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

/* ------------------------------------------------------------------ */
/*  Helpers                                                           */
/* ------------------------------------------------------------------ */
function formatAge(seconds) {
  const d = Math.floor(seconds / 86400);
  const h = Math.floor((seconds % 86400) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (d > 0) return `${d}d ${h}h`;
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

function relativeDate(iso) {
  const d = new Date(iso);
  const now = new Date();
  const days = Math.floor((now - d) / (1000 * 60 * 60 * 24));
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  return `${Math.floor(days / 30)}mo ago`;
}

/* ------------------------------------------------------------------ */
/*  Mock analytics data (Part A)                                      */
/* ------------------------------------------------------------------ */

const analyticsTabs = [
  { key: "overview", label: "Overview" },
  { key: "startups", label: "Startups" },
  { key: "mentors", label: "Mentors" },
  { key: "investors", label: "Investors" },
  { key: "jobs", label: "Jobs" },
  { key: "ai-features", label: "AI features" },
  { key: "marketplace-health", label: "Marketplace health" },
  { key: "retention", label: "Retention" },
  { key: "revenue", label: "Revenue" },
  { key: "published-insights", label: "Published insights" },
  { key: "metric-registry", label: "Metric registry" },
  { key: "data-quality", label: "Data quality" },
];

const rangeFilters = [
  { key: "7-days", label: "Last 7 days" },
  { key: "30-days", label: "Last 30 days" },
  { key: "90-days", label: "Last 90 days" },
  { key: "this-quarter", label: "This quarter" },
  { key: "this-year", label: "This financial year" },
  { key: "custom", label: "Custom range" },
];

const compareFilters = [
  { key: "previous", label: "Previous period" },
  { key: "same-period-last-year", label: "Same period last year" },
];

const segmentFilters = [
  { key: "role", label: "Role" },
  { key: "country", label: "Country / state" },
  { key: "plan", label: "Plan" },
  { key: "channel", label: "Channel" },
  { key: "cohort", label: "Cohort month" },
];

// KPI cards per Part A.4
const kpis = [
  { label: "Registered accounts (by role)", value: "48,210", sub: "All five roles", status: "live" },
  { label: "Verified share", value: "Startups 71% · Mentors 84%", sub: "Investors 62% · Employers 66%", status: "live" },
  { label: "Active accounts (28 days)", value: "21,900", sub: "Signed in at least once in 28 days", status: "live" },
  { label: "Registration to first key action", value: "54%", sub: "Within 7 days of signup", status: "provisional" },
  { label: "Revenue (period)", value: formatMoney(428000000), sub: "Links to Billing", status: "live" },
  { label: "Retention (month 3)", value: "38%", sub: "Still active at day 90", status: "provisional" },
];

const insights = [
  { text: "Registration to verified conversion rose from 41% to 46% in October, driven by faster document review.", type: "auto" },
  { text: "Mentor session completion is at 89% this month, up 4 points from September.", type: "auto" },
  { text: "Employer job posts with zero applicants after 14 days rose to 12% — review hiring pipeline health.", type: "auto" },
];

const dataQuality = [
  { source: "Registration pipeline", freshness: "Updated 12 min ago", complete: true, issues: 0 },
  { source: "Payment provider webhooks", freshness: "Delayed 2 hours", complete: false, issues: 1 },
  { source: "Session events", freshness: "Live", complete: true, issues: 0 },
];

// Funnel data per Part A.4
const funnelStages = [
  { name: "Registered", startups: 1240, mentors: 890, investors: 310, employers: 560, jobseekers: 4200 },
  { name: "Profile complete", startups: 980, mentors: 720, investors: 240, employers: 420, jobseekers: 3100 },
  { name: "Verified", startups: 710, mentors: 748, investors: 192, employers: 370, jobseekers: 2640 },
  { name: "First key action", startups: 540, mentors: 620, investors: 150, employers: 290, jobseekers: 2260 },
];

const accountsOverTime = [
  { month: "Aug", startups: 120, mentors: 95, investors: 35, employers: 65, jobseekers: 480 },
  { month: "Sep", startups: 145, mentors: 110, investors: 42, employers: 78, jobseekers: 560 },
  { month: "Oct", startups: 168, mentors: 135, investors: 52, employers: 91, jobseekers: 640 },
];

const verificationFunnel = [
  { name: "Submitted", count: 890, rate: 100 },
  { name: "Documents reviewed", count: 760, rate: 85 },
  { name: "Background check", count: 640, rate: 72 },
  { name: "Verified", count: 590, rate: 66 },
];

const safetyVolume = [
  { category: "User reports", count: 340, change: "▲ 8%" },
  { category: "Automated flags", count: 120, change: "▼ 12%" },
  { category: "Staff-initiated", count: 45, change: "▲ 2%" },
  { category: "Provider alerts", count: 18, change: "▬" },
];

/* ------------------------------------------------------------------ */
/*  Sidebar                                                           */
/* ------------------------------------------------------------------ */
const sidebarItems = [
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
  ["Configuration", Wrench, "/admin/configuration"],
];

function AdminSidebar({ active }) {
  return (
    <aside className="fixed inset-y-0 left-0 z-20 hidden w-[232px] flex-col border-r border-solid border-[#E5E1D8] bg-[#0F1B2D] text-white lg:block">
      <div className="flex h-[64px] items-center justify-between border-b border-solid border-white/10 px-4">
        <div className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-full border border-white/30 font-serif">
            ADM
          </span>
          <b className="text-xs font-semibold tracking-wide uppercase">Admin</b>
        </div>
      </div>
      <nav className="mt-4 space-y-0.5 px-2">
        {sidebarItems.map(([n, I, u]) => {
          const Comp = I;
          const isActive = n === active;
          return (
            <Link
              key={n}
              href={u}
              className={`relative flex h-10 items-center gap-3 rounded-[10px] px-3 text-[12px] ${isActive ? "bg-[#1C2B42] text-white" : "text-white/70 hover:bg-white/10 transition"}`}
            >
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

/* ------------------------------------------------------------------ */
/*  Components                                                        */
/* ------------------------------------------------------------------ */

function MetricCard({ label, value, sub, status = "live" }) {
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

function TabBar({ active, onChange }) {
  return (
    <div className="flex gap-1 overflow-x-auto mb-3 pb-1 border-b border-solid border-[#E5E1D8]">
      {analyticsTabs.map((t) => (
        <button
          key={t.key}
          type="button"
          onClick={() => onChange(t.key)}
          className={`border-b-2 px-4 py-3 text-xs font-medium transition whitespace-nowrap ${active === t.key ? "border-[#B8955A] text-[#0F1B2D]" : "border-transparent text-[#4A5568] hover:text-[#0F1B2D]"}`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

function RangeFilter({ active, onChange }) {
  return (
    <div className="flex gap-2 overflow-x-auto mb-3 pb-1 border-b border-solid border-[#E5E1D8]">
      {rangeFilters.map((r) => (
        <button
          key={r.key}
          type="button"
          onClick={() => onChange(r.key)}
          className={`px-3 py-1.5 rounded-[10px] border text-[10px] font-medium transition whitespace-nowrap ${active === r.key ? "border-[#B8955A] bg-[#F3EBDD] text-[#806236]" : "border-[#E5E1D8] text-[#4A5568] hover:text-[#0F1B2D]"}`}
        >
          {r.label}
        </button>
      ))}
    </div>
  );
}

function InsightStrip() {
  return (
    <div className="flex gap-3 overflow-x-auto mb-6 pb-1 border-b border-solid border-[#E5E1D8]">
      {insights.map((insight, i) => (
        <div key={i} className="flex-shrink-0 flex items-start gap-3 rounded-[10px] border border-solid border-[#F3EBDD] bg-[#F3EBDD] p-3 min-w-[240px]">
          <Bolt size={14} className="mt-0.5 text-[#806236]" />
          <div>
            <p className="text-[11px] text-[#806236] font-semibold uppercase tracking-wide mb-1">Auto insight</p>
            <p className="text-[12px] text-[#0F1B2D] leading-snug">{insight.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function DataQualityStrip() {
  return (
    <div className="flex gap-3 overflow-x-auto mb-6 pb-1 border-b border-solid border-[#E5E1D8]">
      {dataQuality.map((d) => (
        <div key={d.source} className="flex-shrink-0 flex items-center gap-3 rounded-[10px] border border-solid border-[#E5E1D8] bg-white p-3 min-w-[200px]">
          <div className="flex items-center gap-1">
            <CircleStatus status={d.complete ? "live" : "delayed"} />
            <span className={`text-[10px] font-medium ${d.complete ? "text-[#286749]" : "text-[#9A6210]"}`}>
              {d.complete ? "Fresh" : "Delayed"}
            </span>
          </div>
          <div className="flex flex-col">
            <p className="text-[11px] text-[#4A5568] font-medium">{d.source}</p>
            <p className="text-[10px] text-[#4A5568]">{d.freshness}</p>
          </div>
          {d.issues > 0 && (
            <Btn size="small" secondary className="px-2 py-1 min-w-[48px]" onClick={() => toast(`Opening data quality for ${d.source}`)} title="Issues">
              {d.issues} issues
            </Btn>
          )}
        </div>
      ))}
    </div>
  );
}

function CircleStatus({ status }) {
  const color = status === "live" ? "bg-[#2E7D5B]" : status === "delayed" ? "bg-[#B7791F]" : "bg-[#B42318]";
  return (
    <span className={`h-2 w-2 rounded-full ${color}`} />
  );
}

function ChartCard({ title, titleIcon: TitleIcon, chartContent, headline, source, onViewTable, onExport }) {
  return (
    <Card title={title} titleIcon={TitleIcon}>
      <div className="px-5 pt-3 pb-4">
        <p className="text-[12px] text-[#4A5568] mb-3">{headline}</p>
        <div className="h-64 bg-[#F3EBDD]/30 rounded-[10px] flex items-center justify-center mb-3">
          {chartContent}
        </div>
        <div className="flex items-center justify-between text-[10px] text-[#4A5568]">
          <div className="flex items-center gap-1">
            <ClockIcon size={10} /> <span>{source}</span>
          </div>
          <div className="flex items-center gap-2">
            <Btn size="small" secondary className="px-2 py-1 min-w-[56px]" onClick={onViewTable} title="View as table">
              View as table
            </Btn>
            <Btn size="small" secondary className="px-2 py-1 min-w-[56px]" onClick={onExport} title="Export">
              Export
            </Btn>
          </div>
        </div>
      </div>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/*  Shell components                                                  */
/* ------------------------------------------------------------------ */

function EnvironmentStrip() {
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

function TopBar({ onRefresh }) {
  return (
    <header className="sticky top-0 z-10 flex h-[56px] items-center justify-between border-b border-solid border-[#E5E1D8] bg-[#FAF8F4]/95 px-4 backdrop-blur">
      <div className="flex items-center gap-3">
        <button type="button" onClick={() => toast("Command palette opening")} className={`flex h-10 w-10 items-center justify-center rounded-[10px] border border-solid border-[#E5E1D8] bg-white text-[#0F1B2D] hover:bg-[#F3EBDD] transition`} title="Search and commands (⌘K)">
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

/* ------------------------------------------------------------------ */
/*  Page: Platform Analytics (/analytics)                             */
/* ------------------------------------------------------------------ */
function AdminAnalyticsPage() {
  const [refreshing, setRefreshing] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerItem, setDrawerItem] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata", hour12: false }));
  const [activeTab, setActiveTab] = useState("overview");
  const [activeRange, setActiveRange] = useState("30-days");
  const [activeCompare, setActiveCompare] = useState("previous");
  const [activeSegment, setActiveSegment] = useState("role");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSavedViews, setShowSavedViews] = useState(false);

  const filteredFunnel = useMemo(() => {
    return funnelStages;
  }, []);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    const t = setTimeout(() => {
      setRefreshing(false);
      setLastUpdated(new Date().toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata", hour12: false }));
      toast("Analytics refreshed");
    }, 800);
    return () => clearTimeout(t);
  }, []);

  const handleExport = useCallback(() => {
    toast("Exporting aggregates (re-authentication required)");
  }, []);

  const handleSearch = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#0F1B2D]">
      <a href="#analytics-main" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 bg-[#0F1B2D] text-white px-4 py-2">
        Skip to content
      </a>

      <EnvironmentStrip />
      <TopBar onRefresh={handleRefresh} />

      <div className="flex flex-col lg:flex-row" id="analytics-main">
        <AdminSidebar active="Analytics" />

        <main className="flex-1 min-w-0 pt-6 lg:pt-8 lg:pl-[232px] lg:px-8 pb-24">
          {/* Title bar */}
          <div className="flex items-center justify-between mb-6 border-b border-solid border-[#E5E1D8] pb-4">
            <div>
              <h1 className="text-[28px] font-serif font-semibold">Analytics</h1>
              <p className="text-[12px] text-[#4A5568] mt-1">
                Funnel, usage, marketplace health, retention, revenue (aggregate) and published insights
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Btn size="small" secondary icon={Menu} onClick={() => setShowSavedViews(!showSavedViews)} title="Saved views" />
              {showSavedViews && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-solid border-[#E5E1D8] rounded-[10px] shadow-lg p-3 z-30">
                  <p className="text-[10px] font-semibold text-[#4A5568] mb-2 uppercase tracking-wide">Saved views</p>
                  <Btn size="small" secondary className="w-full text-left text-[11px]" onClick={() => { setShowSavedViews(false); toast("Loading 'Verified share by role'"); }}>
                    Verified share by role
                  </Btn>
                  <Btn size="small" secondary className="w-full text-left text-[11px]" onClick={() => { setShowSavedViews(false); toast("Loading 'Marketplace liquidity'"); }}>
                    Marketplace liquidity
                  </Btn>
                  <Btn size="small" secondary className="w-full text-left text-[11px]" onClick={() => setShowSavedViews(false)}>
                    My saved views
                  </Btn>
                </div>
              )}
              <Btn size="small" secondary icon={RefreshCcw} onClick={handleRefresh} title="Refresh" />
              <Btn secondary icon={Download} onClick={handleExport} title="Export">
                Export
              </Btn>
            </div>
          </div>

          {/* Global controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 border-b border-solid border-[#E5E1D8] pb-3">
            <div className="flex items-center gap-3">
              <RangeFilter active={activeRange} onChange={setActiveRange} />
              <select
                value={activeCompare}
                onChange={(e) => setActiveCompare(e.target.value)}
                className="h-10 rounded-[10px] border border-solid border-[#E5E1D8] bg-white pl-3 pr-10 text-[12px] appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2224%22 height=%2224%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%234A5568%22 stroke-width=%222%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22><path d=%22M6 9l6 6 6-6%22></path></svg>')] bg-no-repeat bg-right-2.5 bg-center-[10px]"
              >
                <option value="previous">Previous period</option>
                <option value="same-period-last-year">Same period last year</option>
              </select>
              <select
                value={activeSegment}
                onChange={(e) => setActiveSegment(e.target.value)}
                className="h-10 rounded-[10px] border border-solid border-[#E5E1D8] bg-white pl-3 pr-10 text-[12px] appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2224%22 height=%2224%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%234A5568%22 stroke-width=%222%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22><path d=%22M6 9l6 6 6-6%22></path></svg>')] bg-no-repeat bg-right-2.5 bg-center-[10px]"
              >
                <option value="role">Role</option>
                <option value="country">Country / state</option>
                <option value="plan">Plan</option>
                <option value="channel">Channel</option>
                <option value="cohort">Cohort month</option>
              </select>
            </div>
            <div className="flex items-end gap-2 text-right">
              <p className="text-[11px] text-[#4A5568]">Updated</p>
              <p className="text-[12px] font-mono text-[#0F1B2D]">{lastUpdated}</p>
            </div>
          </div>

          {/* Data quality strip */}
          <DataQualityStrip />

          {/* Tabs */}
          <TabBar active={activeTab} onChange={setActiveTab} />

          {/* Insight strip */}
          <InsightStrip />

          {/* KPI row */}
          <div className="grid gap-4 lg:grid-cols-3 mb-6">
            {kpis.map((k, i) => (
              <MetricCard key={i} label={k.label} value={k.value} sub={k.sub} status={k.status} />
            ))}
          </div>

          <div className="flex lg:flex-row gap-6 mb-6">
            {/* Charts area */}
            <div className="flex-1 min-w-0">
              <ChartCard
                title="Registration to outcome funnel"
                titleIcon={Layout}
                chartContent={
                  <div className="flex items-end gap-1 h-full w-full p-4">
                    {filteredFunnel.map((s, i) => (
                      <div key={s.name} className="flex flex-col items-center gap-2">
                        <div className={`h-[120px] w-20 rounded-t-[8px] bg-[#0F1B2D]`} style={{ height: `${Math.min(100, (s.startups / 1240) * 100)}%` }} />
                        <span className="text-[10px] text-[#4A5568] text-center leading-tight">{s.name}</span>
                        <span className="text-[11px] font-medium text-[#0F1B2D]">{s.startups.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                }
                headline="Startup funnel: registration → verified → first key action. Each stage shows count and conversion from the previous step."
                source="Registration pipeline · Updated 12 min ago"
                onViewTable={() => toast("Opening funnel table")}
                onExport={() => toast("Exporting funnel aggregates")}
              />

              <ChartCard
                title="Accounts over time by role"
                titleIcon={Users}
                chartContent={
                  <div className="flex items-end gap-2 h-full w-full p-4">
                    {accountsOverTime.map((d, i) => (
                      <div key={d.month} className="flex flex-col items-center gap-2">
                        <div className={`h-[100px] w-20 rounded-t-[8px] bg-[#B8955A]`} style={{ height: `${Math.min(100, (d.startups / 168) * 100)}%` }} />
                        <span className="text-[10px] text-[#4A5568]">{d.month}</span>
                        <span className="text-[11px] font-medium text-[#0F1B2D]">{d.startups}</span>
                      </div>
                    ))}
                  </div>
                }
                headline="New accounts created each month by role, showing growth across startup, mentor, investor, employer and job seeker roles."
                source="Identity service · Updated 12 min ago"
                onViewTable={() => toast("Opening accounts table")}
                onExport={() => toast("Exporting accounts aggregates")}
              />

              <ChartCard
                title="Verification funnel"
                titleIcon={ShieldCheck}
                chartContent={
                  <div className="flex items-end gap-1 h-full w-full p-4">
                    {verificationFunnel.map((s, i) => (
                      <div key={s.name} className="flex flex-col items-center gap-2">
                        <div className={`h-[110px] w-20 rounded-t-[8px] bg-[#2E7D5B]`} style={{ height: `${Math.min(100, (s.count / 890) * 100)}%` }} />
                        <span className="text-[10px] text-[#4A5568] text-center leading-tight">{s.name}</span>
                        <span className="text-[11px] font-medium text-[#0F1B2D]">{s.count}</span>
                      </div>
                    ))}
                  </div>
                }
                headline="Verification funnel: submitted → documents reviewed → background check → verified. Conversion at each step."
                source="Verification service · Updated 12 min ago"
                onViewTable={() => toast("Opening verification table")}
                onExport={() => toast("Exporting verification aggregates")}
              />
            </div>

            {/* Side: definitions and notes */}
            <div className="w-full lg:w-80 flex-shrink-0">
              <Card title="At a glance — top changes" titleIcon={AlertCircle}>
                <div className="px-5 pt-3 pb-4 space-y-4">
                  <div className="flex items-start gap-3">
                    <TrendingUp size={16} className="mt-0.5 text-[#2E7D5B]" />
                    <div>
                      <p className="text-[11px] text-[#4A5568] mb-1">Verified conversion</p>
                      <p className="text-[12px] font-medium text-[#0F1B2D]">41% → 46% in October</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <TrendingUp size={16} className="mt-0.5 text-[#2E7D5B]" />
                    <div>
                      <p className="text-[11px] text-[#4A5568] mb-1">Session completion</p>
                      <p className="text-[12px] font-medium text-[#0F1B2D]">89%, up 4 points</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <TrendingDown size={16} className="mt-0.5 text-[#B7791F]" />
                    <div>
                      <p className="text-[11px] text-[#4A5568] mb-1">Zero-applicant jobs</p>
                      <p className="text-[12px] font-medium text-[#0F1B2D]">12% after 14 days</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card title="Support and safety volume (aggregate)" titleIcon={ShieldAlertIcon}>
                <div className="px-5 pt-3 pb-4 space-y-3">
                  {safetyVolume.map((s, i) => (
                    <div key={i} className="flex items-center justify-between border-b border-solid border-[#E5E1D8]/50 pb-3 last:border-0 last:pb-0">
                      <div>
                        <p className="text-[11px] text-[#4A5568]">{s.category}</p>
                        <p className="text-[12px] font-medium text-[#0F1B2D]">{s.count.toLocaleString()}</p>
                      </div>
                      <StatChip status="live" className="text-[9px]" />
                      <span className="text-[10px] text-[#4A5568]">{s.change}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>

          <div className="mt-8 px-5 lg:px-0 text-center lg:text-left">
            <p className="text-[11px] text-[#4A5568]">
              Aggregates only — no individual-level browsing. Groups under 10 entities are suppressed. Every metric links to the metric registry.
              Provisional metrics are labeled and excluded from leadership summaries.
            </p>
          </div>
        </main>
      </div>

      {/* Metric detail drawer */}
      {drawerOpen && drawerItem && (
        <DetailDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title={`Metric: ${drawerItem.id}`}>
          <div className="space-y-5">
            <div className="grid gap-4 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <h4 className="text-[11px] font-semibold text-[#4A5568] uppercase tracking-wide mb-2">Definition</h4>
                <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">Metric ID:</b> {drawerItem.id}</p>
                <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">Name:</b> {drawerItem.name}</p>
                <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">Status:</b> <StatChip status={drawerItem.status} /></p>
                <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">Version:</b> {drawerItem.version}</p>
                <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">Owner:</b> {drawerItem.owner}</p>
                <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">Last reviewed:</b> {drawerItem.lastReviewed}</p>
              </div>
              <div>
                <h4 className="text-[11px] font-semibold text-[#4A5568] uppercase tracking-wide mb-2">Sample & freshness</h4>
                <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">Sample size:</b> {drawerItem.sampleSize}</p>
                <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">As of:</b> {drawerItem.asOf}</p>
                <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">Lag:</b> {drawerItem.lagMinutes} min</p>
              </div>
            </div>
            <Card title="Formula" titleIcon={FileCode}>
              <div className="px-5 pt-3 pb-4">
                <pre className="text-[11px] text-[#4A5568] bg-[#F4F1EA] rounded-[10px] p-3 overflow-x-auto">{drawerItem.formula}</pre>
              </div>
            </Card>
            <div className="flex gap-2 pt-4">
              <Btn onClick={() => setDrawerOpen(false)} className="flex-1">
                Close drawer
              </Btn>
            </div>
          </div>
        </DetailDrawer>
      )}
    </div>
  );
}

/* ================================================================== */
/*  Exports                                                           */
/* ================================================================== */
export { AdminAnalyticsPage };
