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
  HardDrive,
  Scissors,
  Gavel,
  MapPin,
  Building2,
  Lock as LockIcon,
  Users as UsersIcon,
  Briefcase as Briefcase4Icon,
  Terminal,
  Terminal as TerminalIcon,
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
  internalRole: "Security administrator",
  internalRoles: ["Security administrator"],
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
          : `bg-[#0F1B2D] text-white hover:bg-[#1C2B42`} ${small
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
    closed: `border-[#E5E1D8] text-[#4A5568]`,
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
    status === "success" ? "Success" :
    status === "blocked" ? "Blocked" :
    status === "failed" ? "Failed" :
    status === "admin" ? "Admin action" :
    status === "sensitive-access" ? "Sensitive access" :
    status === "security" ? "Security" :
    status === "configuration" ? "Configuration" :
    status === "money" ? "Money" :
    status === "moderation" ? "Moderation" :
    status === "verification" ? "Verification" :
    status === "data-rights" ? "Data rights" :
    status === "system" ? "System" :
    status === "new" ? "New" :
    status === "reviewing" ? "Reviewing" :
    status === "benign" ? "Benign" :
    status === "escalated" ? "Escalated" :
    status === "closed" ? "Closed" :
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
  return <div className={`h-48 rounded-[12px] bg-[#E5E1D8] animate-pulse ${className}`} />;
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
      <span className={`block h-4 w-4 rounded-full bg-white shadow-md transition-transform ${checked ? "translate-x-5" : "translate-x-0.5"}`} />
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
/*  Mock audit data (Part C)                                          */
/* ------------------------------------------------------------------ */

const auditTabs = [
  { key: "explorer", label: "Explorer" },
  { key: "sensitive-access", label: "Sensitive access" },
  { key: "admin-actions", label: "Admin actions" },
  { key: "configuration-and-releases", label: "Configuration and releases" },
  { key: "security", label: "Security" },
  { key: "alerts", label: "Alerts" },
  { key: "integrity-and-coverage", label: "Integrity and coverage" },
  { key: "export-requests", label: "Export requests" },
  { key: "audit-of-the-audit", label: "Audit of the audit" },
];

const rangeFilters = [
  { key: "24-hours", label: "Last 24 hours" },
  { key: "7-days", label: "Last 7 days" },
  { key: "30-days", label: "Last 30 days" },
  { key: "90-days", label: "Last 90 days" },
  { key: "custom", label: "Custom range" },
];

const auditEntries = [
  { id: "aud_01JD7M4Z9V", at: "2026-11-07T14:12:09Z", actor: { id: "stf_14", role: "support_agent", permission: "reveal_masked" }, category: "sensitive_access", action: "reveal", target: { type: "user", id: "usr_8f21c", field: "email" }, caseId: "TCK-2026-048213", reason: "verify_requester", outcome: "success", source: { app: "admin", route: "/users/:userId" } },
  { id: "aud_01JD7M4Z9W", at: "2026-11-07T13:45:22Z", actor: { id: "stf_22", role: "compliance_officer", permission: "read_audit" }, category: "admin_action", action: "decision", target: { type: "verification", id: "VER-2026-004812" }, caseId: "VER-2026-004812", reason: "approve_verification", outcome: "success", source: { app: "admin", route: "/admin/verifications" } },
  { id: "aud_01JD7M4Z9X", at: "2026-11-07T13:30:10Z", actor: { id: "stf_05", role: "admin", permission: "edit_config" }, category: "configuration", action: "policy_change", target: { type: "policy", id: "POL-001" }, reason: "update_retention", outcome: "success", source: { app: "admin", route: "/admin/compliance" } },
  { id: "aud_01JD7M4Z9Y", at: "2026-11-07T12:15:00Z", actor: { id: "stf_33", role: "security_admin", permission: "break_glass" }, category: "security", action: "break_glass_use", target: { type: "system", id: "audit_store" }, reason: "incident_response", outcome: "success", source: { app: "admin", route: "/admin/audit" } },
  { id: "aud_01JD7M4Z9Z", at: "2026-11-07T11:00:00Z", actor: { id: "stf_14", role: "support_agent", permission: "reveal_masked" }, category: "sensitive_access", action: "reveal", target: { type: "user", id: "usr_9a12b", field: "phone" }, caseId: "TCK-2026-048211", reason: "verify_requester", outcome: "blocked", source: { app: "admin", route: "/users/:userId" } },
  { id: "aud_01JD7M4ZA0", at: "2026-11-07T10:45:00Z", actor: { id: "sys_01", role: "system", permission: "scheduled_job" }, category: "system", action: "retention_run", target: { type: "job", id: "RET-2026-11-07" }, reason: "scheduled_retention", outcome: "success", source: { app: "system", route: "/jobs/retention" } },
  { id: "aud_01JD7M4ZA1", at: "2026-11-07T09:30:00Z", actor: { id: "stf_44", role: "finance", permission: "execute_refund" }, category: "money", action: "refund", target: { type: "payment", id: "PAY-2026-1001" }, reason: "customer_request", outcome: "success", source: { app: "admin", route: "/admin/billing" } },
  { id: "aud_01JD7M4ZA2", at: "2026-11-07T08:15:00Z", actor: { id: "stf_05", role: "admin", permission: "edit_config" }, category: "configuration", action: "feature_flag", target: { type: "flag", id: "ff_new_analytics" }, reason: "launch", outcome: "success", source: { app: "admin", route: "/admin/configuration" } },
];

const categories = ["all", "admin_action", "sensitive_access", "security", "configuration", "money", "moderation", "verification", "data-rights", "system"];
const outcomes = ["all", "success", "blocked", "failed"];
const actors = ["all", "stf_14", "stf_22", "stf_05", "stf_33", "sys_01", "stf_44"];

// Alerts per Part C.9
const alerts = [
  { id: "ALT-001", rule: "Many reveals by one person in a short time", severity: "high", entities: "stf_14", time: "2026-11-07T13:50:00Z", status: "Reviewing" },
  { id: "ALT-002", rule: "Record opens without case links above threshold", severity: "medium", entities: "stf_44", time: "2026-11-07T12:20:00Z", status: "New" },
  { id: "ALT-003", rule: "Privilege escalation or break-glass use", severity: "high", entities: "stf_33", time: "2026-11-07T11:00:00Z", status: "Benign" },
  { id: "ALT-004", rule: "Bulk export or large result pull", severity: "medium", entities: "stf_22", time: "2026-11-07T09:00:00Z", status: "Closed" },
];

// Export requests per Part C.11
const exportRequests = [
  { id: "EXP-001", scope: "Last 30 days, sensitive access", purpose: "Regulator request REQ-2026-041", requester: "Compliance officer", format: "PDF", status: "Approved", created: "2026-11-02", expires: "2026-11-09" },
  { id: "EXP-002", scope: "Last 90 days, admin actions", purpose: "Internal audit", requester: "Security administrator", format: "CSV", status: "Pending", created: "2026-11-04", expires: "—" },
];

// Integrity and coverage
const integrity = { verifiedThrough: "2026-11-07T14:00:00Z", status: "verified", gaps: 0 };
const coverage = [
  { source: "Admin pages", expected: 1240, received: 1240, latency: "200ms", status: "verified" },
  { source: "Verification service", expected: 890, received: 890, latency: "180ms", status: "verified" },
  { source: "Payments service", expected: 450, received: 448, latency: "310ms", status: "verified" },
  { source: "Support system", expected: 310, received: 310, latency: "220ms", status: "verified" },
  { source: "Identity service", expected: 670, received: 670, latency: "190ms", status: "verified" },
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
      {auditTabs.map((t) => (
        <button key={t.key} type="button" onClick={() => onChange(t.key)} className={`border-b-2 px-4 py-3 text-xs font-medium transition whitespace-nowrap ${active === t.key ? "border-[#B8955A] text-[#0F1B2D]" : "border-transparent text-[#4A5568] hover:text-[#0F1B2D]"}`}>
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
        <button key={r.key} type="button" onClick={() => onChange(r.key)} className={`px-3 py-1.5 rounded-[10px] border text-[10px] font-medium transition whitespace-nowrap ${active === r.key ? "border-[#B8955A] bg-[#F3EBDD] text-[#806236]" : "border-[#E5E1D8] text-[#4A5568] hover:text-[#0F1B2D]"}`}>
          {r.label}
        </button>
      ))}
    </div>
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

/* ------------------------------------------------------------------ */
/*  Page: Platform Audit Log (/audit)                                 */
/* ------------------------------------------------------------------ */
function AdminAuditPage() {
  const [refreshing, setRefreshing] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerItem, setDrawerItem] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata", hour12: false }));
  const [activeTab, setActiveTab] = useState("explorer");
  const [activeRange, setActiveRange] = useState("24-hours");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeOutcome, setActiveOutcome] = useState("all");
  const [showSavedViews, setShowSavedViews] = useState(false);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    const t = setTimeout(() => {
      setRefreshing(false);
      setLastUpdated(new Date().toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata", hour12: false }));
      toast("Audit log refreshed");
    }, 800);
    return () => clearTimeout(t);
  }, []);

  const handleExport = useCallback(() => {
    toast("Exporting audit entries (two approvers + hardware key required)");
  }, []);

  const handleSearch = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  const filteredEntries = useMemo(() => {
    return auditEntries.filter((e) => {
      if (searchQuery && !e.id.toLowerCase().includes(searchQuery.toLowerCase()) && !e.action.toLowerCase().includes(searchQuery.toLowerCase()) && !e.actor.id.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      if (activeCategory !== "all" && e.category !== activeCategory) return false;
      if (activeOutcome !== "all" && e.outcome !== activeOutcome) return false;
      return true;
    });
  }, [searchQuery, activeCategory, activeOutcome]);

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#0F1B2D]">
      <a href="#audit-main" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 bg-[#0F1B2D] text-white px-4 py-2">
        Skip to content
      </a>

      <EnvironmentStrip />
      <TopBar onRefresh={handleRefresh} />

      <div className="flex flex-col lg:flex-row" id="audit-main">
        <AdminSidebar active="Audit" />

        <main className="flex-1 min-w-0 pt-6 lg:pt-8 lg:pl-[232px] lg:px-8 pb-24">
          {/* Title bar */}
          <div className="flex items-center justify-between mb-6 border-b border-solid border-[#E5E1D8] pb-4">
            <div>
              <h1 className="text-[28px] font-serif font-semibold">Platform Audit Log</h1>
              <p className="text-[12px] text-[#4A5568] mt-1">
                Append-only record of every sensitive action and access. Entries can't be edited or deleted.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Btn size="small" secondary icon={Menu} onClick={() => setShowSavedViews(!showSavedViews)} title="Saved views" />
              {showSavedViews && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-solid border-[#E5E1D8] rounded-[10px] shadow-lg p-3 z-30">
                  <p className="text-[10px] font-semibold text-[#4A5568] mb-2 uppercase tracking-wide">Saved views</p>
                  <Btn size="small" secondary className="w-full text-left text-[11px]" onClick={() => { setShowSavedViews(false); toast("Loading 'Reveals by non-support staff'"); }}>
                    Reveals by non-support staff
                  </Btn>
                  <Btn size="small" secondary className="w-full text-left text-[11px]" onClick={() => { setShowSavedViews(false); toast("Loading 'Break-glass use'"); }}>
                    Break-glass use
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

          {/* Header note + integrity chip + export */}
          <div className="flex items-center justify-between gap-4 mb-6 border-b border-solid border-[#E5E1D8] pb-3">
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-semibold text-[#B42318]">Entries can't be edited or deleted</span>
              <span className="flex items-center gap-2 rounded-full border border-solid border-[#E7F3EC] bg-[#E7F3EC] px-2.5 py-0.5">
                <span className="h-2 w-2 rounded-full bg-[#2E7D5B]" />
                <span className="text-[10px] font-medium text-[#286749]">Integrity — Verified as of {new Date(integrity.verifiedThrough).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", hour12: false })}</span>
              </span>
            </div>
            <Btn size="small" secondary icon={Download} onClick={handleExport} title="Export">
              Export
            </Btn>
          </div>

          {/* Global controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 border-b border-solid border-[#E5E1D8] pb-3">
            <div className="flex items-center gap-3">
              <RangeFilter active={activeRange} onChange={setActiveRange} />
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-medium text-[#4A5568 uppercase tracking-wide">Category</span>
                <select value={activeCategory} onChange={(e) => setActiveCategory(e.target.value)} className="h-9 rounded-[10px] border border-solid border-[#E5E1D8] bg-white pl-3 pr-10 text-[11px] appearance-none">
                  {categories.map((c) => (
                    <option key={c} value={c}>{c === "all" ? "All" : c.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-medium text-[#4A5568 uppercase tracking-wide">Outcome</span>
                <select value={activeOutcome} onChange={(e) => setActiveOutcome(e.target.value)} className="h-9 rounded-[10px] border border-solid border-[#E5E1D8] bg-white pl-3 pr-10 text-[11px] appearance-none">
                  {outcomes.map((o) => (
                    <option key={o} value={o}>{o === "all" ? "All" : o.charAt(0).toUpperCase() + o.slice(1)}</option>
                  ))}
                </select>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Search entry ID, action, actor, target…"
                className="h-9 rounded-[10px] border border-solid border-[#E5E1D8] bg-white pl-4 pr-10 text-[11px] w-64"
              />
            </div>
            <div className="flex items-end gap-2 text-right">
              <p className="text-[11px] text-[#4A5568]">Updated</p>
              <p className="text-[12px] font-mono text-[#0F1B2D]">{lastUpdated}</p>
            </div>
          </div>

          {/* Tabs */}
          <TabBar active={activeTab} onChange={setActiveTab} />

          {/* Tab content */}
          <div className="mt-6">
            {activeTab === "explorer" && (
              <>
                <h2 className="text-[15px] font-semibold mb-4">Audit entries</h2>
                <p className="text-[12px] text-[#4A5568 mb-4">Indexed searches, paging with a hard cap per query. Row click opens the detail drawer with before/after diff and linked entries.</p>
                <Card title="Entries" titleIcon={FileText}>
                  <div className="px-5 pt-3 pb-4 overflow-x-auto">
                    <table className="w-full text-left text-[11px] border-collapse">
                      <thead>
                        <tr className="border-b border-solid border-[#E5E1D8]">
                          {["Time", "Actor", "Category", "Action", "Target", "Purpose / case", "Outcome", "Source"].map((h) => (
                            <th key={h} className="pb-3 text-[10px] font-medium text-[#4A5568 uppercase tracking-wide">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {filteredEntries.map((e) => (
                          <tr key={e.id} className="border-b border-solid border-[#E5E1D8]/50 last:border-0 hover:bg-[#F3EBDD]/30 transition cursor-pointer" onClick={() => { setDrawerItem(e); setDrawerOpen(true); }}>
                            <td className="py-3 text-[11px] font-mono text-[#0F1B2D]">{new Date(e.at).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", hour12: false })}</td>
                            <td className="py-3 text-[11px] text-[#4A5568]">{e.actor.id} ({e.actor.role})</td>
                            <td className="py-3"><StatChip status={e.category} /></td>
                            <td className="py-3 text-[11px] font-medium text-[#0F1B2D]">{e.action}</td>
                            <td className="py-3 text-[11px] text-[#4A5568]">{e.target.type}:{e.target.id}</td>
                            <td className="py-3 text-[11px] text-[#4A5568]">{e.reason} · {e.caseId || "—"}</td>
                            <td className="py-3"><StatChip status={e.outcome} /></td>
                            <td className="py-3 text-[11px] text-[#4A5568]">{e.source.route}</td>
                          </tr>
                        ))}
                        {filteredEntries.length === 0 && (
                          <tr>
                            <td colSpan={8} className="py-8 text-center text:[11px] text-[#4A5568]">No matching entries</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                  <p className="mt-3 text-[11px] text-[#4A5568]">Showing {filteredEntries.length} of {auditEntries.length} entries. Pivots: "Everything this staff member did in this session" · "Everything done on this record" · "Everything under this case ID."</p>
                </Card>
              </>
            )}

            {activeTab === "sensitive-access" && (
              <>
                <h2 className="text-[15px] font-semibold mb-4">Sensitive access</h2>
                <p className="text-[12px] text-[#4A5568 mb-4">Record opens by purpose, masked-field reveals, document views, exports. Review aids for security and compliance — patterns are prompts to look, not conclusions.</p>
                <Card title="Sensitive access events" titleIcon={Eye}>
                  <div className="px-5 pt-3 pb-4 space-y-3">
                    {auditEntries.filter((e) => e.category === "sensitive_access").map((e) => (
                      <div key={e.id} className="flex items-center justify-between border-b border-solid border-[#E5E1D8]/50 pb-3 last:border-0 last:pb-0">
                        <div className="flex items-center gap-3">
                          <span className="text-[11px] font-mono text-[#0F1B2D]">{new Date(e.at).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", hour12: false })}</span>
                          <span className="text-[11px] text-[#4A5568]">{e.actor.id}</span>
                          <span className="text-[11px] text-[#4A5568]">{e.action} {e.target.field}</span>
                          <span className="text-[11px] text-[#4A5568]">{e.caseId}</span>
                        </div>
                        <StatChip status={e.outcome} />
                      </div>
                    ))}
                    <p className="pt-3 text-[11px] text-[#4A5568 italic">Volumes by actor and role over time are shown as counts, with outlier highlighting.</p>
                  </div>
                </Card>
              </>
            )}

            {activeTab === "admin-actions" && (
              <>
                <h2 className="text-[15px] font-semibold mb-4">Admin actions</h2>
                <p className="text-[12px] text-[#4A5568 mb-4">Decisions across verification, moderation, appeals, disputes, support actions and money.</p>
                <Card title="Admin actions" titleIcon={ShieldCheck}>
                  <div className="px-5 pt-3 pb-4 space-y-3">
                    {auditEntries.filter((e) => e.category === "admin_action").map((e) => (
                      <div key={e.id} className="flex items-center justify-between border-b border-solid border-[#E5E1D8]/50 pb-3 last:border-0 last:pb-0">
                        <div className="flex items-center gap-3">
                          <span className="text-[11px] font-mono text-[#0F1B2D]">{new Date(e.at).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", hour12: false })}</span>
                          <span className="text-[11px] text-[#4A5568]">{e.actor.id}</span>
                          <span className="text-[11px] text-[#4A5568]">{e.action}</span>
                          <span className="text-[11px] text-[#4A5568]">{e.target.type}:{e.target.id}</span>
                        </div>
                        <StatChip status={e.outcome} />
                      </div>
                    ))}
                  </div>
                </Card>
              </>
            )}

            {activeTab === "configuration-and-releases" && (
              <>
                <h2 className="text-[15px] font-semibold mb-4">Configuration and releases</h2>
                <p className="text-[12px] text-[#4A5568 mb-4">Policy, rubric, template, matching, plan and price changes with versions, approvers and rollout stages.</p>
                <Card title="Configuration changes" titleIcon={Settings}>
                  <div className="px-5 pt-3 pb-4 space-y-3">
                    {auditEntries.filter((e) => e.category === "configuration").map((e) => (
                      <div key={e.id} className="flex items-center justify-between border-b border-solid border-[#E5E1D8]/50 pb-3 last:border-0 last:pb-0">
                        <div className="flex items-center gap-3">
                          <span className="text-[11px] font-mono text-[#0F1B2D]">{new Date(e.at).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", hour12: false })}</span>
                          <span className="text-[11px] text-[#4A5568]">{e.actor.id}</span>
                          <span className="text-[11px] text-[#4A5568]">{e.action}</span>
                          <span className="text-[11px] text-[#4A5568]">{e.reason}</span>
                        </div>
                        <StatChip status={e.outcome} />
                      </div>
                    ))}
                  </div>
                </Card>
              </>
            )}

            {activeTab === "security" && (
              <>
                <h2 className="text-[15px] font-semibold mb-4">Security</h2>
                <p className="text-[12px] text-[#4A5568 mb-4">Staff authentication events, failed sign-ins, role changes, elevated and break-glass use, session revocations.</p>
                <Card title="Security events" titleIcon={Shield}>
                  <div className="px-5 pt-3 pb-4 space-y-3">
                    {auditEntries.filter((e) => e.category === "security").map((e) => (
                      <div key={e.id} className="flex items-center justify-between border-b border-solid border-[#E5E1D8]/50 pb-3 last:border-0 last:pb-0">
                        <div className="flex items-center gap-3">
                          <span className="text-[11px] font-mono text-[#0F1B2D]">{new Date(e.at).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", hour12: false })}</span>
                          <span className="text-[11px] text-[#4A5568]">{e.actor.id}</span>
                          <span className="text-[11px] text-[#4A5568]">{e.action}</span>
                          <span className="text-[11px] text-[#4A5568]">{e.reason}</span>
                        </div>
                        <StatChip status={e.outcome} />
                      </div>
                    ))}
                  </div>
                </Card>
              </>
            )}

            {activeTab === "alerts" && (
              <>
                <h2 className="text-[15px] font-semibold mb-4">Alerts</h2>
                <p className="text-[12px] text-[#4A5568 mb-4">Detection rules reviewed by the security administrator. Alerts describe actions, not accusations, and aren't used for performance ranking.</p>
                <Card title="Alert list" titleIcon={AlertTriangle}>
                  <div className="px-5 pt-3 pb-4 overflow-x-auto">
                    <table className="w-full text-left text-[11px] border-collapse">
                      <thead>
                        <tr className="border-b border-solid border-[#E5E1D8]">
                          {["ID", "Rule", "Severity", "Entities", "Time", "Status"].map((h) => (
                            <th key={h} className="pb-3 text-[10px] font-medium text-[#4A5568 uppercase tracking-wide">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {alerts.map((a) => (
                          <tr key={a.id} className="border-b border-solid border-[#E5E1D8]/50 last:border-0">
                            <td className="py-3 text-[11px] font-medium text-[#0F1B2D]">{a.id}</td>
                            <td className="py-3 text-[11px] text-[#4A5568]">{a.rule}</td>
                            <td className="py-3"><StatChip status={a.severity} /></td>
                            <td className="py-3 text-[11px] text-[#4A5568]">{a.entities}</td>
                            <td className="py-3 text-[11px] text-[#4A5568]">{new Date(a.time).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", hour12: false })}</td>
                            <td className="py-3"><StatChip status={a.status.toLowerCase()} /></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="mt-3 text-[11px] text-[#4A5568]">High-severity alerts page the on-call security administrator; text includes IDs and rule names only.</p>
                </Card>
              </>
            )}

            {activeTab === "integrity-and-coverage" && (
              <>
                <h2 className="text-[15px] font-semibold mb-4">Integrity and coverage</h2>
                <p className="text-[12px] text-[#4A5568 mb-4">Hash-chain verification, coverage monitor and tamper evidence.</p>
                <div className="grid gap-4 lg:grid-cols-3">
                  <Card title="Hash-chain integrity" titleIcon={LinkIcon}>
                    <div className="px-5 pt-3 pb-4 space-y-3">
                      <div className="flex items-center justify-between border-b border-solid border-[#E5E1D8]/50 pb-2">
                        <span className="text-[11px] text-[#4A5568]">Status</span>
                        <span className="text-[11px] font-medium">{integrity.status === "verified" ? <span className="text-[#286749]">Verified</span> : <span className="text-[#B42318]">Gap detected</span>}</span>
                      </div>
                      <div className="flex items-center justify-between border-b border-solid border-[#E5E1D8]/50 pb-2">
                        <span className="text-[11px] text-[#4A5568]">Verified through</span>
                        <span className="text-[11px] font-medium text-[#0F1B2D]">{new Date(integrity.verifiedThrough).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", hour12: false })}</span>
                      </div>
                      <div className="flex items-center justify-between pb-2">
                        <span className="text-[11px] text-[#4A5568]">Gaps detected</span>
                        <span className="text-[11px] font-medium text-[#0F1B2D]">{integrity.gaps}</span>
                      </div>
                    </div>
                  </Card>
                  <Card title="Coverage monitor" titleIcon={MonitorIcon}>
                    <div className="px-5 pt-3 pb-4 overflow-x-auto">
                      <table className="w-full text-left text-[11px] border-collapse">
                        <thead>
                          <tr className="border-b border-solid border-[#E5E1D8]">
                            {["Source", "Expected", "Received", "Latency", "Status"].map((h) => (
                              <th key={h} className="pb-3 text-[10px] font-medium text-[#4A5568 uppercase tracking-wide">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {coverage.map((c) => (
                            <tr key={c.source} className="border-b border-solid border-[#E5E1D8]/50 last:border-0">
                              <td className="py-3 text-[11px] text-[#4A5568]">{c.source}</td>
                              <td className="py-3 text-[11px] text-[#0F1B2D]">{c.expected.toLocaleString()}</td>
                              <td className="py-3 text-[11px] text-[#0F1B2D]">{c.received.toLocaleString()}</td>
                              <td className="py-3 text-[11px] text-[#4A5568]">{c.latency}</td>
                              <td className="py-3"><StatChip status={c.status} /></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </Card>
                  <Card title="Storage and retention" titleIcon={Archive}>
                    <div className="px-5 pt-3 pb-4 space-y-3">
                      <div className="flex items-center justify-between border-b border-solid border-[#E5E1D8]/50 pb-2">
                        <span className="text-[11px] text-[#4A5568]">Online retention</span>
                        <span className="text-[11px] font-medium text-[#0F1B2D]">13 months</span>
                      </div>
                      <div className="flex items-center justify-between border-b border-solid border-[#E5E1D8]/50 pb-2">
                        <span className="text-[11px] text-[#4A5568]">Storage type</span>
                        <span className="text-[11px] font-medium text-[#0F1B2D]">Write-once, separate store</span>
                      </div>
                      <div className="flex items-center justify-between pb-2">
                        <span className="text-[11px] text-[#4A5568]">Append only</span>
                        <span className="text-[11px] font-medium text-[#286749]">Yes — no update/delete endpoint</span>
                      </div>
                    </div>
                  </Card>
                </div>
              </>
            )}

            {activeTab === "export-requests" && (
              <>
                <h2 className="text-[15px] font-semibold mb-4">Export requests</h2>
                <p className="text-[12px] text-[#4A5568 mb-4">Exports need two approvers for sensitive scopes, hardware-key confirmation, watermarks, expiry and logging.</p>
                <Card title="Export request register" titleIcon={Download}>
                  <div className="px-5 pt-3 pb-4 overflow-x-auto">
                    <table className="w-full text-left text-[11px] border-collapse">
                      <thead>
                        <tr className="border-b border-solid border-[#E5E1D8]">
                          {["ID", "Scope", "Purpose", "Requester", "Format", "Status", "Created", "Expires"].map((h) => (
                            <th key={h} className="pb-3 text-[10px] font-medium text-[#4A5568 uppercase tracking-wide">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {exportRequests.map((r) => (
                          <tr key={r.id} className="border-b border-solid border-[#E5E1D8]/50 last:border-0">
                            <td className="py-3 text-[11px] font-medium text-[#0F1B2D]">{r.id}</td>
                            <td className="py-3 text-[11px] text-[#4A5568]">{r.scope}</td>
                            <td className="py-3 text-[11px] text-[#4A5568]">{r.purpose}</td>
                            <td className="py-3 text-[11px] text-[#4A5568]">{r.requester}</td>
                            <td className="py-3 text-[11px] text-[#4A5568]">{r.format}</td>
                            <td className="py-3"><StatChip status={r.status.toLowerCase()} /></td>
                            <td className="py-3 text-[11px] text-[#4A5568]">{r.created}</td>
                            <td className="py-3 text-[11px] text-[#4A5568]">{r.expires}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              </>
            )}

            {activeTab === "audit-of-the-audit" && (
              <>
                <h2 className="text-[15px] font-semibold mb-4">Audit of the audit</h2>
                <p className="text-[12px] text-[#4A5568 mb-4">Every access to the audit log is itself an audit entry in a separate, restricted log. Readable only by compliance and the head of security.</p>
                <Card title="Audit-of-the-audit summary" titleIcon={Shield}>
                  <div className="px-5 pt-3 pb-4 space-y-3">
                    <div className="flex items-center justify-between border-b border-solid border-[#E5E1D8]/50 pb-2">
                      <span className="text-[11px] text-[#4A5568]">Log views (this period)</span>
                      <span className="text-[11px] font-medium text-[#0F1B2D]">24</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-solid border-[#E5E1D8]/50 pb-2">
                      <span className="text-[11px] text-[#4A5568]">Searches</span>
                      <span className="text-[11px] font-medium text-[#0F1B2D]">18</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-solid border-[#E5E1D8]/50 pb-2">
                      <span className="text-[11px] text-[#4A5568]">Exports</span>
                      <span className="text-[11px] font-medium text-[#0F1B2D]">2</span>
                    </div>
                    <div className="flex items-center justify-between pb-2">
                      <span className="text-[11px] text-[#4A5568]">Rule changes</span>
                      <span className="text-[11px] font-medium text-[#0F1B2D]">0</span>
                    </div>
                    <p className="pt-3 text-[11px] text-[#4A5568]">Reviewed quarterly by someone outside the security administrator team. No ability for those being reviewed to see their own review.</p>
                  </div>
                </Card>
              </>
            )}
          </div>

          <div className="mt-8 px-5 lg:px-0 text-center lg:text-left">
            <p className="text-[11px] text-[#4A5568]">
              The audit log is sacred: append-only, tamper-evident, complete and hard to switch off. Sensitive actions fail closed if their audit entry can't be written. Looking at the audit log is itself logged.
            </p>
          </div>
        </main>
      </div>

      {/* Detail drawer */}
      {drawerOpen && drawerItem && (
        <DetailDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title={`Entry: ${drawerItem.id}`}>
          <div className="space-y-5">
            <div className="grid gap-4 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <h4 className="text-[11px] font-semibold text-[#4A5568 uppercase tracking-wide mb-2">Entry</h4>
                <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">ID:</b> {drawerItem.id}</p>
                <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">Time:</b> {new Date(drawerItem.at).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", hour12: false })}</p>
                <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">Category:</b> {drawerItem.category.replace(/_/g, " ")}</p>
                <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">Action:</b> {drawerItem.action}</p>
                <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">Outcome:</b> <StatChip status={drawerItem.outcome} /></p>
                <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">Source:</b> {drawerItem.source.app} · {drawerItem.source.route}</p>
              </div>
              <div>
                <h4 className="text-[11px] font-semibold text-[#4A5568 uppercase tracking-wide mb-2">Actor</h4>
                <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">ID:</b> {drawerItem.actor.id}</p>
                <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">Role:</b> {drawerItem.actor.role}</p>
                <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">Permission:</b> {drawerItem.actor.permission}</p>
                <h4 className="text-[11px] font-semibold text-[#4A5568 uppercase tracking-wide mb-2 mt-4">Target</h4>
                <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">Type:</b> {drawerItem.target.type}</p>
                <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">ID:</b> {drawerItem.target.id}</p>
                {drawerItem.target.field && <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">Field:</b> {drawerItem.target.field}</p>}
              </div>
            </div>
            <Card title="Reason and case" titleIcon={FileText}>
              <div className="px-5 pt-3 pb-4">
                <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">Reason:</b> {drawerItem.reason}</p>
                <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">Case:</b> {drawerItem.caseId || "—"}</p>
              </div>
            </Card>
            <Card title="Integrity" titleIcon={LinkIcon}>
              <div className="px-5 pt-3 pb-4">
                <p className="text-[12px] text-[#4A5568] mb-1">Entry links to the previous entry by hash chain; tamper-evident and immutable.</p>
                <p className="text-[11px] text-[#4A5568 mt-2">Personal data inside entries is minimized: IDs and masked values only, never message contents, documents, credentials or secrets.</p>
              </div>
            </Card>
            <div className="flex gap-2 pt-4">
              <Btn onClick={() => { setDrawerOpen(false); toast("Copied entry ID"); }} className="flex-1">
                Copy entry ID
              </Btn>
              <Btn secondary onClick={() => setDrawerOpen(false)} className="flex-1">
                Close drawer
              </Btn>
            </div>
          </div>
        </DetailDrawer>
      )}
    </div>
  );
}

export { AdminAuditPage };
