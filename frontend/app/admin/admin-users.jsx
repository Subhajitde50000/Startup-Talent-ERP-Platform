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
  Build,
  Globe as GlobeIcon,
  CreditCard,
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
  internalRole: "Support agent",
  internalRoles: ["Support agent"],
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
    active: `border-[#E7F3EC] bg-[#E7F3EC] text-[#286749]`,
    "pending-verification": `border-[#FDF3E0] bg-[#FDF3E0] text-[#9A6210]`,
    "paused-by-user": `border-[#E5E1D8] text-[#4A5568]`,
    limited: `border-[#FDF3E0] text-[#9A6210]`,
    suspended: `border-[#FBE9E7] text-[#B42318]`,
    banned: `border-[#FBE9E7] bg-[#FBE9E7] text-[#B42318]`,
    closing: `border-[#E8F0F8] text-[#2F5D8A]`,
    closed: `border-[#E5E1D8] text-[#4A5568]`,
    startup: `border-[#E5E1D8] text-[#4A5568]`,
    mentor: `border-[#E5E1D8] text-[#4A5568]`,
    investor: `border-[#E5E1D8] text-[#4A5568]`,
    "job-seeker": `border-[#E5E1D8] text-[#4A5568]`,
    employer: `border-[#E5E1D8] text-[#4A5568]`,
    verified: `border-[#E7F3EC] bg-[#E7F3EC] text-[#286749]`,
    basic: `border-[#E8F0F8] text-[#2F5D8A]`,
    full: `border-[#E8F0F8] text-[#2F5D8A]`,
    "founder-verified": `border-[#E7F3EC] bg-[#E7F3EC] text-[#286749]`,
    "under-review": `border-[#FDF3E0] text-[#9A6210]`,
    expiring: `border-[#FDF3E0] text-[#9A6210]`,
    lapsed: `border-[#FBE9E7] text-[#B42318]`,
    "not-required": `border-[#E5E1D8] text-[#4A5568]`,
    "2fa-on": `border-[#E7F3EC] text-[#286749]`,
    "2fa-off": `border-[#E5E1D8] text-[#4A5568]`,
    "suspicious-activity": `border-[#FBE9E7] text-[#B42318]`,
    "recovery-in-progress": `border-[#FDF3E0] text-[#9A6210]`,
    new: `border-[#E5E1D8] text-[#4A5568]`,
    open: `border-[#E8F0F8] bg-[#E8F0F8] text-[#2F5D8A]`,
    "waiting-for-requester": `border-[#FDF3E0] bg-[#FDF3E0] text-[#9A6210]`,
    "waiting-for-team": `border-[#F3EBDD] bg-[#F3EBDD] text-[#806236]`,
    "on-hold": `border-[#E5E1D8] text-[#4A5568]`,
    resolved: `border-[#E7F3EC] bg-[#E7F3EC] text-[#286749]`,
    closed: `border-[#E5E1D8] text-[#4A5568]`,
    urgent: `border-[#FBE9E7] bg-[#FBE9E7] text-[#B42318]`,
    high: `border-[#FDF3E0] bg-[#FDF3E0] text-[#9A6210]`,
    normal: `border-[#E5E1D8] text-[#4A5568]`,
    low: `border-[#E5E1D8] text-[#4A5568]`,
    "priority-plan": `border-[#F3EBDD] bg-[#F3EBDD] text-[#806236]`,
    onTrack: `border-[#E7F3EC] bg-[#E7F3EC] text-[#286749]`,
    atRisk: `border-[#FDF3E0] bg-[#FDF3E0] text-[#9A6210]`,
    breached: `border-[#FBE9E7] bg-[#FBE9E7] text-[#B42318]`,
    paused: `border-[#E5E1D8] text-[#4A5568]`,
    in_app: `border-[#E8F0F8] text-[#2F5D8A]`,
    email: `border-[#F3EBDD] text-[#806236]`,
    "public-form": `border-[#E5E1D8] text-[#4A5568]`,
    chat: `border-[#E8F0F8] text-[#2F5D8A]`,
    callback: `border-[#F3EBDD] text-[#806236]`,
    "staff-created": `border-[#E8F0F8] text-[#2F5D8A]`,
  };
  const label =
    status === "active" ? "Active" :
    status === "pending-verification" ? "Pending verification" :
    status === "paused-by-user" ? "Paused by user" :
    status === "limited" ? "Limited" :
    status === "suspended" ? "Suspended" :
    status === "banned" ? "Banned" :
    status === "closing" ? "Closing" :
    status === "closed" ? "Closed" :
    status === "new" ? "New" :
    status === "open" ? "Open" :
    status === "waiting-for-requester" ? "Waiting for requester" :
    status === "waiting-for-team" ? "Waiting for team" :
    status === "on-hold" ? "On hold" :
    status === "resolved" ? "Resolved" :
    status === "closed" ? "Closed" :
    status === "urgent" ? "Urgent" :
    status === "high" ? "High" :
    status === "normal" ? "Normal" :
    status === "low" ? "Low" :
    status === "priority-plan" ? "Priority plan" :
    status === "onTrack" ? "On track" :
    status === "atRisk" ? "At risk" :
    status === "breached" ? "Breached" :
    status === "paused" ? "Paused" :
    status === "verified" ? "Verified" :
    status === "basic" ? "Basic" :
    status === "full" ? "Full" :
    status === "founder-verified" ? "Founder verified" :
    status === "under-review" ? "Under review" :
    status === "expiring" ? "Expiring" :
    status === "lapsed" ? "Lapsed" :
    status === "not-required" ? "Not required" :
    status === "2fa-on" ? "2FA on" :
    status === "2fa-off" ? "2FA off" :
    status === "suspicious-activity" ? "Suspicious activity" :
    status === "recovery-in-progress" ? "Recovery in progress" :
    status.replace("-", " ");
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium ${maps[status] || maps.new}`}
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

function relativeTime(iso) {
  const d = new Date(iso);
  const now = new Date();
  const seconds = Math.floor((now - d) / 1000);
  if (seconds < 60) return "Just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

/* ------------------------------------------------------------------ */
/*  Mock users data (Part A.6 data contract shape)                    */
/* ------------------------------------------------------------------ */

const userScopeOptions = [
  { key: "users", label: "Users" },
  { key: "organizations", label: "Organizations" },
  { key: "staff", label: "Staff" },
];

const roleFilters = [
  { key: "all", label: "All roles" },
  { key: "startup", label: "Startup" },
  { key: "mentor", label: "Mentor" },
  { key: "investor", label: "Investor" },
  { key: "job-seeker", label: "Job seeker" },
  { key: "employer", label: "Employer" },
];

const statusFilters = [
  { key: "all", label: "All statuses" },
  { key: "active", label: "Active" },
  { key: "pending-verification", label: "Pending verification" },
  { key: "paused-by-user", label: "Paused by user" },
  { key: "limited", label: "Limited" },
  { key: "suspended", label: "Suspended" },
  { key: "banned", label: "Banned" },
  { key: "closing", label: "Closing" },
  { key: "closed", label: "Closed" },
];

const verificationFilters = [
  { key: "all", label: "All verification states" },
  { key: "verified", label: "Verified" },
  { key: "basic", label: "Basic" },
  { key: "full", label: "Full" },
  { key: "under-review", label: "Under review" },
  { key: "expiring", label: "Expiring" },
  { key: "lapsed", label: "Lapsed" },
];

const securityFilters = [
  { key: "all", label: "All security" },
  { key: "2fa-on", label: "2FA on" },
  { key: "2fa-off", label: "2FA off" },
  { key: "suspicious-activity", label: "Suspicious activity" },
  { key: "recovery-in-progress", label: "Recovery in progress" },
];

const users = [
  {
    id: "usr_8f21c",
    displayName: "P••• K••••",
    roles: ["jobseeker", "founder"],
    status: "active",
    verification: [{ role: "founder", state: "founder_verified" }],
    orgCount: 1,
    mainOrgId: "org_77",
    plans: [{ role: "jobseeker", plan: "free" }],
    security: { twoFactor: true, flag: null },
    region: "KA",
    createdAt: "2026-08-14",
    lastActiveDate: "2026-11-06",
    openCases: 1,
  },
  {
    id: "usr_3a91d",
    displayName: "A••• R••••",
    roles: ["mentor"],
    status: "active",
    verification: [{ role: "mentor", state: "verified" }],
    orgCount: 0,
    mainOrgId: null,
    plans: [{ role: "mentor", plan: "free" }],
    security: { twoFactor: true, flag: null },
    region: "DL",
    createdAt: "2026-07-22",
    lastActiveDate: "2026-11-05",
    openCases: 0,
  },
  {
    id: "usr_7b42e",
    displayName: "S••• M••••",
    roles: ["employer"],
    status: "limited",
    verification: [{ role: "employer", state: "verified" }],
    orgCount: 1,
    mainOrgId: "org_88",
    plans: [{ role: "employer", plan: "growth" }],
    security: { twoFactor: false, flag: "suspicious-activity" },
    region: "MH",
    createdAt: "2026-06-10",
    lastActiveDate: "2026-10-28",
    openCases: 2,
  },
  {
    id: "usr_1c55f",
    displayName: "J••• P•••",
    roles: ["investor"],
    status: "active",
    verification: [{ role: "investor", state: "full" }],
    orgCount: 2,
    mainOrgId: "org_55",
    plans: [{ role: "investor", plan: "enterprise" }],
    security: { twoFactor: true, flag: null },
    region: "KA",
    createdAt: "2026-05-03",
    lastActiveDate: "2026-11-06",
    openCases: 0,
  },
  {
    id: "usr_9e03g",
    displayName: "R••• S•••",
    roles: ["job-seeker"],
    status: "suspended",
    verification: [{ role: "job-seeker", state: "not-required" }],
    orgCount: 0,
    mainOrgId: null,
    plans: [{ role: "job-seeker", plan: "free" }],
    security: { twoFactor: false, flag: null },
    region: "TN",
    createdAt: "2026-09-01",
    lastActiveDate: "2026-09-15",
    openCases: 3,
  },
  {
    id: "usr_4d77h",
    displayName: "V••• A•••",
    roles: ["startup", "founder"],
    status: "active",
    verification: [{ role: "founder", state: "under-review" }],
    orgCount: 1,
    mainOrgId: "org_33",
    plans: [{ role: "startup", plan: "free" }],
    security: { twoFactor: true, flag: null },
    region: "KA",
    createdAt: "2026-10-15",
    lastActiveDate: "2026-11-04",
    openCases: 1,
  },
  {
    id: "usr_2k81j",
    displayName: "N••• D•••",
    roles: ["mentor"],
    status: "active",
    verification: [{ role: "mentor", state: "expiring" }],
    orgCount: 0,
    mainOrgId: null,
    plans: [{ role: "mentor", plan: "free" }],
    security: { twoFactor: true, flag: null },
    region: "DL",
    createdAt: "2026-08-20",
    lastActiveDate: "2026-11-03",
    openCases: 0,
  },
  {
    id: "usr_6m34l",
    displayName: "T••• B••••",
    roles: ["employer"],
    status: "pending-verification",
    verification: [{ role: "employer", state: "under-review" }],
    orgCount: 1,
    mainOrgId: "org_90",
    plans: [{ role: "employer", plan: "starter" }],
    security: { twoFactor: false, flag: null },
    region: "MH",
    createdAt: "2026-10-28",
    lastActiveDate: "2026-10-29",
    openCases: 1,
  },
  {
    id: "usr_9p22n",
    displayName: "C••• G•••",
    roles: ["investor", "job-seeker"],
    status: "active",
    verification: [{ role: "investor", state: "basic" }, { role: "job-seeker", state: "not-required" }],
    orgCount: 1,
    mainOrgId: "org_44",
    plans: [{ role: "investor", plan: "enterprise" }],
    security: { twoFactor: false, flag: "suspicious-activity" },
    region: "WB",
    createdAt: "2026-04-12",
    lastActiveDate: "2026-11-02",
    openCases: 0,
  },
  {
    id: "usr_1w55q",
    displayName: "M••• H••••",
    roles: ["job-seeker"],
    status: "closing",
    verification: [{ role: "job-seeker", state: "not-required" }],
    orgCount: 0,
    mainOrgId: null,
    plans: [{ role: "job-seeker", plan: "free" }],
    security: { twoFactor: true, flag: null },
    region: "DL",
    createdAt: "2026-03-05",
    lastActiveDate: "2026-10-20",
    openCases: 0,
  },
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

function UsersStatCard({ label, value, sub, color = INK }) {
  return (
    <Card title padded className="border-[#E5E1D8]">
      <div className="px-5 pt-3 pb-4">
        <div className="flex items-baseline gap-1 mb-1">
          <b className={`text-[32px] font-serif font-semibold text-[${color}] tabular-nums`}>{value}</b>
        </div>
        <p className="text-[12px] text-[#4A5568]">{label}</p>
        <p className="text-[11px] text-[#4A5568]">{sub}</p>
      </div>
    </Card>
  );
}

function ScopeChips({ active, onChange }) {
  return (
    <div className="flex gap-2 overflow-x-auto mb-3 pb-1 border-b border-solid border-[#E5E1D8]">
      {userScopeOptions.map((s) => (
        <button
          key={s.key}
          type="button"
          onClick={() => onChange(s.key)}
          className={`px-3 py-1.5 rounded-[10px] border text-[10px] font-medium transition whitespace-nowrap ${active === s.key ? "border-[#B8955A] bg-[#F3EBDD] text-[#806236]" : "border-[#E5E1D8] text-[#4A5568] hover:text-[#0F1B2D]"}`}
        >
          {s.label}
        </button>
      ))}
    </div>
  );
}

function RoleFilter({ active, onChange }) {
  return (
    <div className="flex gap-2 overflow-x-auto mb-3 pb-1 border-b border-solid border-[#E5E1D8]">
      {roleFilters.map((r) => (
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

function StatusChipFilter({ active, onChange }) {
  return (
    <div className="flex gap-2 overflow-x-auto mb-3 pb-1 border-b border-solid border-[#E5E1D8]">
      {statusFilters.map((s) => (
        <button
          key={s.key}
          type="button"
          onClick={() => onChange(s.key)}
          className={`px-3 py-1.5 rounded-[10px] border text-[10px] font-medium transition whitespace-nowrap ${active === s.key ? "border-[#B8955A] bg-[#F3EBDD] text-[#806236]" : "border-[#E5E1D8] text-[#4A5568] hover:text-[#0F1B2D]"}`}
        >
          {s.label}
        </button>
      ))}
    </div>
  );
}

function UserRow({ u, onOpen, onPreview }) {
  const roleKey = u.roles[0] || "job-seeker";
  const statusKey = u.status || "active";
  const verificationKey =
    u.verification && u.verification.length > 0
      ? u.verification[0].state
      : "not-required";
  const securityKey = u.security.twoFactor ? "2fa-on" : "2fa-off";
  const hasFlag = u.security.flag != null;
  return (
    <tr
      key={u.id}
      className="hover:bg-[#F3EBDD]/50 transition border-b border-solid border-[#E5E1D8]/50 last:border-0 group cursor-pointer"
      onClick={() => onPreview(u.id)}
    >
      <td className="py-4">
        <div className="flex items-center gap-3">
          <div className="grid h-8 w-8 place-items-center rounded-[10px] bg-[#F3EBDD] text-[#806236] text-xs font-bold">
            {u.id.charAt(4).toUpperCase()}
          </div>
          <div>
            <b className="text-[12px] text-[#0F1B2D] font-medium tabular-nums">{u.id}</b>
            <p className="text-[11px] text-[#4A5568]">{u.displayName}</p>
          </div>
        </div>
      </td>
      <td className="py-4 text-[12px] text-[#4A5568]">
        {u.roles.map((r, i) => (
          <span key={i} className="inline-block mb-1">
            <StatChip status={r} />
          </span>
        ))}
      </td>
      <td className="py-4">
        <StatChip status={statusKey} />
      </td>
      <td className="py-4">
        <StatChip status={verificationKey} />
      </td>
      <td className="py-4 text-[12px] text-[#4A5568]">
        <b className="text-[#0F1B2D]">{u.orgCount}</b>
        <p className="text-[11px] text-[#4A5568]">{u.orgCount === 1 ? "org" : "orgs"}</p>
        {u.mainOrgId && <span className="text-[10px] text-[#4A5568] block mt-0.5">{u.mainOrgId}</span>}
      </td>
      <td className="py-4 text-[12px] text-[#4A5568]">
        {u.plans.map((p, i) => (
          <span key={i} className="block text-[11px]">{p.role === "jobseeker" ? "Job seeker" : p.role.charAt(0).toUpperCase() + p.role.slice(1)}: {p.plan}</span>
        ))}
      </td>
      <td className="py-4 text-[12px] text-[#4A5568]">
        <StatChip status={securityKey} />
        {hasFlag && <span className="text-[10px] text-[#B42318] block mt-0.5">{u.security.flag.replace("-", " ")}</span>}
      </td>
      <td className="py-4 text-right text-[10px] text-[#4A5568]">
        {u.region}
      </td>
      <td className="py-4 text-right text-[10px] text-[#4A5568]">
        {u.createdAt}
      </td>
      <td className="py-4 text-right text-[10px] text-[#4A5568]">
        {relativeTime(u.lastActiveDate + "T00:00:00+05:30")}
      </td>
      <td className="py-4 text-right">
        {u.openCases > 0 ? (
          <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium ${u.openCases > 2 ? `border-[#FBE9E7] bg-[#FBE9E7] text-[#B42318]` : `border-[#FDF3E0] bg-[#FDF3E0] text-[#9A6210]`}`}>
            {u.openCases}
          </span>
        ) : (
          <span className="text-[10px] text-[#A0A7B4]">—</span>
        )}
      </td>
      <td className="py-4 text-right">
        <Btn size="small" secondary onClick={(e) => { e.stopPropagation(); onOpen(u.id); }} className="px-2.5 py-1.5 min-w-[64px]">
          Open
        </Btn>
      </td>
    </tr>
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

function IncidentBanner() {
  return null;
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
/*  Page: Users and Accounts (/users)                                 */
/* ------------------------------------------------------------------ */
function AdminUsersPage() {
  const [refreshing, setRefreshing] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerItem, setDrawerItem] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata", hour12: false }));
  const [activeScope, setActiveScope] = useState("users");
  const [activeRole, setActiveRole] = useState("all");
  const [activeStatus, setActiveStatus] = useState("all");
  const [activeVerification, setActiveVerification] = useState("all");
  const [activeSecurity, setActiveSecurity] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [density, setDensity] = useState("comfortable");
  const [showSavedViews, setShowSavedViews] = useState(false);

  const filtered = useMemo(() => {
    return users.filter((u) => {
      if (activeRole !== "all" && !u.roles.includes(activeRole)) return false;
      if (activeStatus !== "all" && u.status !== activeStatus) return false;
      if (activeVerification !== "all" && !u.verification.some((v) => v.state === activeVerification)) return false;
      if (activeSecurity !== "all") {
        if (activeSecurity === "2fa-on" && !u.security.twoFactor) return false;
        if (activeSecurity === "2fa-off" && u.security.twoFactor) return false;
        if (activeSecurity === "suspicious-activity" && u.security.flag !== "suspicious-activity") return false;
        if (activeSecurity === "recovery-in-progress" && u.security.flag !== "recovery-in-progress") return false;
      }
      if (searchQuery && !u.id.toLowerCase().includes(searchQuery.toLowerCase()) && !u.displayName.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });
  }, [activeRole, activeStatus, activeVerification, activeSecurity, searchQuery]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      if (sortBy === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === "last-active") return new Date(b.lastActiveDate) - new Date(a.lastActiveDate);
      if (sortBy === "open-cases") return b.openCases - a.openCases;
      return 0;
    });
  }, [filtered, sortBy]);

  const stats = useMemo(() => {
    const accounts = users.length;
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const newSevenDays = users.filter((u) => new Date(u.createdAt) >= sevenDaysAgo).length;
    const needingAttention = users.filter((u) =>
      u.status === "suspended" || u.status === "limited" || u.security.flag === "suspicious-activity" ||
      u.verification.some((v) => v.state === "expiring" || v.state === "lapsed")
    ).length;
    const multiRole = users.filter((u) => u.roles.length > 1).length;
    return { accounts, newSevenDays, needingAttention, multiRole };
  }, [users]);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    const t = setTimeout(() => {
      setRefreshing(false);
      setLastUpdated(new Date().toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata", hour12: false }));
      toast("Users directory refreshed");
    }, 800);
    return () => clearTimeout(t);
  }, []);

  const handleOpen = useCallback((id) => {
    toast(`Opening ${id} user record`);
  }, []);

  const handlePreview = useCallback((id) => {
    const u = users.find((x) => x.id === id);
    if (u) {
      setDrawerItem(u);
      setDrawerOpen(true);
    }
  }, []);

  const handleExportIDs = useCallback(() => {
    toast("Exporting IDs and statuses (no personal fields)");
  }, []);

  const handleSearch = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#0F1B2D]">
      <a href="#users-main" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 bg-[#0F1B2D] text-white px-4 py-2">
        Skip to content
      </a>

      <EnvironmentStrip />
      {IncidentBanner()}
      <TopBar onRefresh={handleRefresh} />

      <div className="flex flex-col lg:flex-row" id="users-main">
        <AdminSidebar active="Users" />

        <main className="flex-1 min-w-0 pt-6 lg:pt-8 lg:pl-[232px] lg:px-8 pb-24">
          {/* Title bar */}
          <div className="flex items-center justify-between mb-6 border-b border-solid border-[#E5E1D8] pb-4">
            <div>
              <h1 className="text-[28px] font-serif font-semibold">Users</h1>
              <p className="text-[12px] text-[#4A5568] mt-1">
                Find and filter accounts across all roles; see status at a glance
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Btn size="small" secondary icon={Menu} onClick={() => setShowSavedViews(!showSavedViews)} title="Saved views" />
              {showSavedViews && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-solid border-[#E5E1D8] rounded-[10px] shadow-lg p-3 z-30">
                  <p className="text-[10px] font-semibold text-[#4A5568] mb-2 uppercase tracking-wide">Saved views</p>
                  <Btn size="small" secondary className="w-full text-left text-[11px]" onClick={() => { setShowSavedViews(false); toast("Loading 'Suspended this week'"); }}>
                    Suspended this week
                  </Btn>
                  <Btn size="small" secondary className="w-full text-left text-[11px]" onClick={() => { setShowSavedViews(false); toast("Loading 'Investors, Full, expiring in 30 days'"); }}>
                    Investors, Full, expiring in 30 days
                  </Btn>
                  <Btn size="small" secondary className="w-full text-left text-[11px]" onClick={() => setShowSavedViews(false)}>
                    My saved views
                  </Btn>
                </div>
              )}
              <Btn size="small" secondary icon={RefreshCcw} onClick={handleRefresh} title="Refresh" />
            </div>
          </div>

          {/* Scope chips */}
          <ScopeChips active={activeScope} onChange={setActiveScope} />

          {/* Search */}
          <div className="relative w-64 mb-6">
            <Search className="absolute left-3 top-2.5 text-[#4A5568]" size={16} />
            <input
              type="search"
              placeholder="ID, exact email/phone, or name…"
              value={searchQuery}
              onChange={handleSearch}
              className="h-10 w-full rounded-[10px] border border-solid border-[#E5E1D8] bg-white pl-9 pr-4 text-[12px] focus:border-[#B8955A] focus:outline-none"
            />
          </div>

          {/* Summary strip */}
          <div className="grid gap-4 lg:grid-cols-4 mb-6">
            <UsersStatCard label="Accounts" value={stats.accounts} sub="Total accounts across all roles" color={INK} />
            <UsersStatCard label="New (7 days)" value={stats.newSevenDays} sub="Created in the last 7 days" color={GOLD_DARK} />
            <UsersStatCard label="Needing attention" value={stats.needingAttention} sub="Suspended, limited, recovery, expiring verification" color={WARNING} />
            <UsersStatCard label="Multi-role accounts" value={stats.multiRole} sub="Hold more than one role" color={INFO} />
          </div>

          {/* Filters row */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 border-b border-solid border-[#E5E1D8] pb-3">
            <div className="flex items-center gap-3">
              <RoleFilter active={activeRole} onChange={setActiveRole} />
              <StatusChipFilter active={activeStatus} onChange={setActiveStatus} />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="h-10 rounded-[10px] border border-solid border-[#E5E1D8] bg-white pl-3 pr-10 text-[12px] appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2224%22 height=%2224%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%234A5568%22 stroke-width=%222%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22><path d=%22M6 9l6 6 6-6%22></path></svg>')] bg-no-repeat bg-right-2.5 bg-center-[10px]"
              >
                <option value="newest">Sort: Newest first</option>
                <option value="last-active">Sort: Last active</option>
                <option value="open-cases">Sort: Open cases</option>
              </select>
              <Btn size="small" secondary icon={LayoutGrid} onClick={() => setDensity(density === "comfortable" ? "compact" : "comfortable")} title="Toggle density" />
              <Btn size="small" secondary icon={Download} onClick={handleExportIDs} title="Export IDs" />
            </div>
          </div>

          {/* User table */}
          <Card title="User directory" titleIcon={UserRound}>
            <div className="px-5 pt-3 pb-4 overflow-x-auto">
              <table className="w-full text-left text-[12px] border-collapse min-w-full">
                <thead>
                  <tr className="border-b border-solid border-[#E5E1D8]">
                    {["User", "Roles", "Status", "Verification", "Organizations", "Plan", "Security", "Region", "Created", "Last active", "Open cases", "Actions"].map((h) => (
                      <th key={h} className="pb-3 text-[11px] text-[#4A5568] font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-solid divide-[#E5E1D8]/50">
                  {sorted.length === 0 ? (
                    <tr>
                      <td colSpan={12} className="py-12 text-center text-[12px] text-[#4A5568]">
                        <UserRound size={24} className="mx-auto mb-3 text-[#4A5568]" />
                        <p className="text-[12px] font-medium text-[#0F1B2D]">No accounts match your filters.</p>
                        <Btn size="small" secondary onClick={() => { setActiveRole("all"); setActiveStatus("all"); setActiveVerification("all"); setActiveSecurity("all"); setSearchQuery(""); }} className="mt-3">
                          Clear filters
                        </Btn>
                      </td>
                    </tr>
                  ) : (
                    sorted.map((u) => (
                      <UserRow key={u.id} u={u} onOpen={handleOpen} onPreview={handlePreview} />
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <div className="px-5 pt-3 pb-4 flex items-center justify-between">
              <p className="text-[11px] text-[#4A5568]">
                Showing {sorted.length} of {users.length} accounts
              </p>
              <div className="flex items-center gap-2">
                <Btn size="small" secondary className="px-2 py-1.5" icon={LayoutGrid} title="Grid view" />
                <Btn size="small" secondary className="px-2 py-1.5" icon={LayoutList} title="List view" />
              </div>
            </div>
          </Card>

          <div className="mt-8 px-5 lg:px-0 text-center lg:text-left">
            <p className="text-[11px] text-[#4A5568]">
              IDs, roles, statuses and masked names only. No emails, phone numbers or addresses on this page.
              Opening a record requires a purpose; all opens are logged to the audit trail.
            </p>
          </div>
        </main>
      </div>

      {/* User quick view drawer */}
      {drawerOpen && drawerItem && (
        <DetailDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title={`User: ${drawerItem.id}`}>
          <div className="space-y-5">
            <div className="grid gap-4 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <h4 className="text-[11px] font-semibold text-[#4A5568] uppercase tracking-wide mb-2">Identity</h4>
                <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">User ID:</b> {drawerItem.id}</p>
                <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">Name:</b> {drawerItem.displayName}</p>
                <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">Roles:</b> {drawerItem.roles.map((r) => <StatChip key={r} status={r} />).join(" ")}</p>
                <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">Status:</b> <StatChip status={drawerItem.status} /></p>
                <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">Region:</b> {drawerItem.region}</p>
                <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">Created:</b> {drawerItem.createdAt}</p>
                <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">Last active:</b> {drawerItem.lastActiveDate}</p>
              </div>
              <div>
                <h4 className="text-[11px] font-semibold text-[#4A5568] uppercase tracking-wide mb-2">Verification & security</h4>
                {drawerItem.verification.map((v, i) => (
                  <p key={i} className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">{v.role}:</b> <StatChip status={v.state} /></p>
                ))}
                <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">2FA:</b> {drawerItem.security.twoFactor ? "On" : "Off"}</p>
                {drawerItem.security.flag && (
                  <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">Flag:</b> <span className="text-[#B42318]">{drawerItem.security.flag.replace("-", " ")}</span></p>
                )}
                <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">Organizations:</b> {drawerItem.orgCount}</p>
                <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">Open cases:</b> {drawerItem.openCases}</p>
              </div>
            </div>

            <Card title="Action panel" titleIcon={Scale}>
              <div className="px-5 pt-3 pb-4 space-y-4">
                <p className="text-[12px] text-[#4A5568]">
                  Open the record to view roles and memberships, security, activity, cases and notes.
                  A purpose is required before the record opens; each open is logged.
                </p>
                <div className="flex gap-2">
                  <Btn onClick={() => {
                    setDrawerOpen(false);
                    toast(`Opening ${drawerItem.id} full record — purpose dialog required`);
                  }} className="flex-1">
                    Open record
                  </Btn>
                  <Btn secondary onClick={() => {
                    setDrawerOpen(false);
                    toast(`${drawerItem.id}: closed`);
                  }} className="flex-1">
                    Close drawer
                  </Btn>
                </div>
                <div className="bg-[#F3EBDD] border border-solid border-[#F3EBDD] rounded-[10px] p-3">
                  <p className="text-[11px] text-[#806236] mb-2"><b className="text-[#806236]">Privacy:</b> No emails, phones or addresses are shown in lists. Detail pages require a recorded purpose and mask sensitive fields.</p>
                </div>
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
export { AdminUsersPage };
