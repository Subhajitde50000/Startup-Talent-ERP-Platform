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
  FileText as FileTextIcon,
  LayoutList as LayoutListIcon,
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
  internalRole: "Content and program manager",
  internalRoles: ["Content and program manager"],
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
    draft: `border-[#E5E1D8] text-[#4A5568]`,
    "in-review": `border-[#E8F0F8] text-[#2F5D8A]`,
    "changes-requested": `border-[#FDF3E0] bg-[#FDF3E0] text-[#9A6210]`,
    approved: `border-[#F3EBDD] bg-[#F3EBDD] text-[#806236]`,
    scheduled: `border-[#E8F0F8] text-[#2F5D8A]`,
    published: `border-[#E7F3EC] bg-[#E7F3EC] text-[#286749]`,
    "needs-review": `border-[#FDF3E0] bg-[#FDF3E0] text-[#9A6210]`,
    archived: `border-[#E5E1D8] text-[#4A5568]`,
    all: `border-[#E5E1D8] text-[#4A5568]`,
    "all-roles": `border-[#E5E1D8] text-[#4A5568]`,
    startup: `border-[#E5E1D8] text-[#4A5568]`,
    mentor: `border-[#E5E1D8] text-[#4A5568]`,
    investor: `border-[#E5E1D8] text-[#4A5568]`,
    "job-seeker": `border-[#E5E1D8] text-[#4A5568]`,
    employer: `border-[#E5E1D8] text-[#4A5568]`,
    "admin-internal": `border-[#E8F0F8] text-[#2F5D8A]`,
    standard: `border-[#E5E1D8] text-[#4A5568]`,
    sensitive: `border-[#FBE9E7] text-[#B42318]`,
    shadow: `border-[#E5E1D8] text-[#4A5568]`,
    "staged-n": `border-[#FDF3E0] text-[#9A6210]`,
    live: `border-[#E7F3EC] text-[#286749]`,
    "rolled-back": `border-[#E5E1D8] text-[#4A5568]`,
    en: `border-[#E8F0F8] text-[#2F5D8A]`,
    translated: `border-[#E7F3EC] text-[#286749]`,
    "needs-translation": `border-[#FDF3E0] text-[#9A6210]`,
    "machine-translated-unreviewed": `border-[#FBE9E7] text-[#B42318]`,
    fresh: `border-[#E7F3EC] text-[#286749]`,
    overdue: `border-[#FBE9E7] text-[#B42318]`,
  };
  const label =
    status === "draft" ? "Draft" :
    status === "in-review" ? "In review" :
    status === "changes-requested" ? "Changes requested" :
    status === "approved" ? "Approved" :
    status === "scheduled" ? "Scheduled" :
    status === "published" ? "Published" :
    status === "needs-review" ? "Needs review" :
    status === "archived" ? "Archived" :
    status === "all" ? "All" :
    status === "all-roles" ? "All roles" :
    status === "standard" ? "Standard" :
    status === "sensitive" ? "Sensitive" :
    status === "shadow" ? "Shadow" :
    status === "live" ? "Live" :
    status === "rolled-back" ? "Rolled back" :
    status === "en" ? "EN" :
    status === "translated" ? "Translated" :
    status === "needs-translation" ? "Needs translation" :
    status === "machine-translated-unreviewed" ? "Machine (unreviewed)" :
    status === "fresh" ? "Fresh" :
    status === "overdue" ? "Overdue" :
    status.replace("-", " ");
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium ${maps[status] || maps.draft}`}
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
/*  Mock content items data (Part A.3 table shape)                    */
/* ------------------------------------------------------------------ */

const contentTabs = [
  { key: "articles", label: "Articles" },
  { key: "announcements", label: "Announcements" },
  { key: "release-notes", label: "Release notes" },
  { key: "policy-legal", label: "Policy and legal" },
  { key: "platform-copy", label: "Platform copy" },
  { key: "translations", label: "Translations" },
  { key: "review-queue", label: "Review queue" },
  { key: "analytics", label: "Analytics" },
];

const typeFilters = [
  { key: "all", label: "All types" },
  { key: "help_article", label: "Help article" },
  { key: "announcement", label: "Announcement" },
  { key: "release_note", label: "Release note" },
  { key: "policy", label: "Policy" },
  { key: "copy", label: "Platform copy" },
];

const audienceFilters = [
  { key: "all", label: "All audiences" },
  { key: "all-roles", label: "All roles" },
  { key: "startup", label: "Startup" },
  { key: "mentor", label: "Mentor" },
  { key: "investor", label: "Investor" },
  { key: "job-seeker", label: "Job seeker" },
  { key: "employer", label: "Employer" },
];

const statusFilters = [
  { key: "all", label: "All statuses" },
  { key: "draft", label: "Draft" },
  { key: "in-review", label: "In review" },
  { key: "changes-requested", label: "Changes requested" },
  { key: "approved", label: "Approved" },
  { key: "scheduled", label: "Scheduled" },
  { key: "published", label: "Published" },
  { key: "needs-review", label: "Needs review" },
  { key: "archived", label: "Archived" },
];

const languageFilters = [
  { key: "all", label: "All languages" },
  { key: "en", label: "English" },
  { key: "hi", label: "Hindi" },
  { key: "bn", label: "Bengali" },
];

const contentItems = [
  {
    id: "ART-2026-00412",
    type: "help_article",
    typeLabel: "Help article",
    title: "Posting a job — step by step",
    audience: ["employer"],
    audienceLabel: "Employer",
    status: "published",
    version: 7,
    language: { en: "published", hi: "needs_review", bn: "translated" },
    languageChips: [{ key: "en", label: "EN", status: "published" }, { key: "hi", label: "HI", status: "needs-translation" }, { key: "bn", label: "BN", status: "translated" }],
    owner: "stf_21",
    ownerName: "Priya Rao",
    lastUpdated: "2026-11-04T10:30:00+05:30",
    nextReviewAt: "2027-05-04",
    freshness: "fresh",
    views30d: 1420,
    helpfulRate: 89,
    openFeedback: 3,
    riskClass: "standard",
  },
  {
    id: "POL-2026-00331",
    type: "policy",
    typeLabel: "Policy",
    title: "Terms of service",
    audience: ["all-roles"],
    audienceLabel: "All roles",
    status: "approved",
    version: 12,
    language: { en: "published" },
    languageChips: [{ key: "en", label: "EN", status: "published" }],
    owner: "stf_44",
    ownerName: "Compliance team",
    lastUpdated: "2026-10-20T14:15:00+05:30",
    nextReviewAt: "2027-04-20",
    freshness: "fresh",
    views30d: 890,
    helpfulRate: 76,
    openFeedback: 12,
    riskClass: "sensitive",
  },
  {
    id: "ANN-2026-00512",
    type: "announcement",
    typeLabel: "Announcement",
    title: "Maintenance window — Nov 9",
    audience: ["all-roles"],
    audienceLabel: "All roles",
    status: "published",
    version: 1,
    language: { en: "published" },
    languageChips: [{ key: "en", label: "EN", status: "published" }],
    owner: "stf_21",
    ownerName: "Priya Rao",
    lastUpdated: "2026-11-02T09:00:00+05:30",
    nextReviewAt: "2026-11-10",
    freshness: "fresh",
    views30d: 2100,
    helpfulRate: 94,
    openFeedback: 1,
    riskClass: "standard",
  },
  {
    id: "ART-2026-00415",
    type: "help_article",
    typeLabel: "Help article",
    title: "How the readiness score works",
    audience: ["job-seeker"],
    audienceLabel: "Job seeker",
    status: "in-review",
    version: 3,
    language: { en: "published", hi: "needs_translation" },
    languageChips: [{ key: "en", label: "EN", status: "published" }, { key: "hi", label: "HI", status: "needs-translation" }],
    owner: "stf_33",
    ownerName: "Amit Singh",
    lastUpdated: "2026-11-01T16:45:00+05:30",
    nextReviewAt: "2027-02-01",
    freshness: "review-due-in-30",
    views30d: 560,
    helpfulRate: 0,
    openFeedback: 0,
    riskClass: "sensitive",
  },
  {
    id: "COP-2026-00201",
    type: "copy",
    typeLabel: "Platform copy",
    title: "Empty state — no applications yet",
    audience: ["employer"],
    audienceLabel: "Employer",
    status: "draft",
    version: 1,
    language: { en: "draft" },
    languageChips: [{ key: "en", label: "EN", status: "draft" }],
    owner: "stf_21",
    ownerName: "Priya Rao",
    lastUpdated: "2026-10-28T11:20:00+05:30",
    nextReviewAt: null,
    freshness: "fresh",
    views30d: 0,
    helpfulRate: 0,
    openFeedback: 0,
    riskClass: "standard",
  },
  {
    id: "POL-2026-00334",
    type: "policy",
    typeLabel: "Policy",
    title: "Privacy notice",
    audience: ["all-roles"],
    audienceLabel: "All roles",
    status: "needs-review",
    version: 8,
    language: { en: "published", hi: "translated", bn: "needs_translation" },
    languageChips: [{ key: "en", label: "EN", status: "published" }, { key: "hi", label: "HI", status: "translated" }, { key: "bn", label: "BN", status: "needs-translation" }],
    owner: "stf_44",
    ownerName: "Compliance team",
    lastUpdated: "2026-09-15T10:00:00+05:30",
    nextReviewAt: "2026-09-15",
    freshness: "overdue",
    views30d: 340,
    helpfulRate: 71,
    openFeedback: 8,
    riskClass: "sensitive",
  },
  {
    id: "RN-2026-00112",
    type: "release_note",
    typeLabel: "Release note",
    title: "November release — employer hiring updates",
    audience: ["employer"],
    audienceLabel: "Employer",
    status: "scheduled",
    version: 1,
    language: { en: "published" },
    languageChips: [{ key: "en", label: "EN", status: "published" }],
    owner: "stf_21",
    ownerName: "Priya Rao",
    lastUpdated: "2026-10-30T12:00:00+05:30",
    nextReviewAt: null,
    freshness: "fresh",
    views30d: 0,
    helpfulRate: 0,
    openFeedback: 0,
    riskClass: "standard",
  },
  {
    id: "ART-2026-00418",
    type: "help_article",
    typeLabel: "Help article",
    title: "Reporting a safety concern",
    audience: ["all-roles"],
    audienceLabel: "All roles",
    status: "published",
    version: 5,
    language: { en: "published", hi: "published", bn: "needs_translation" },
    languageChips: [{ key: "en", label: "EN", status: "published" }, { key: "hi", label: "HI", status: "published" }, { key: "bn", label: "BN", status: "needs-translation" }],
    owner: "stf_55",
    ownerName: "Trust and safety team",
    lastUpdated: "2026-10-10T08:00:00+05:30",
    nextReviewAt: "2027-04-10",
    freshness: "fresh",
    views30d: 720,
    helpfulRate: 88,
    openFeedback: 5,
    riskClass: "sensitive",
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

function ContentStatCard({ label, value, sub, color = INK }) {
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

function TabBar({ active, onChange }) {
  return (
    <div className="flex gap-1 overflow-x-auto mb-3 pb-1 border-b border-solid border-[#E5E1D8]">
      {contentTabs.map((t) => (
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

function TypeFilter({ active, onChange }) {
  return (
    <div className="flex gap-2 overflow-x-auto mb-3 pb-1 border-b border-solid border-[#E5E1D8]">
      {typeFilters.map((t) => (
        <button
          key={t.key}
          type="button"
          onClick={() => onChange(t.key)}
          className={`px-3 py-1.5 rounded-[10px] border text-[10px] font-medium transition whitespace-nowrap ${active === t.key ? "border-[#B8955A] bg-[#F3EBDD] text-[#806236]" : "border-[#E5E1D8] text-[#4A5568] hover:text-[#0F1B2D]"}`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

function AudienceFilter({ active, onChange }) {
  return (
    <div className="flex gap-2 overflow-x-auto mb-3 pb-1 border-b border-solid border-[#E5E1D8]">
      {audienceFilters.map((a) => (
        <button
          key={a.key}
          type="button"
          onClick={() => onChange(a.key)}
          className={`px-3 py-1.5 rounded-[10px] border text-[10px] font-medium transition whitespace-nowrap ${active === a.key ? "border-[#B8955A] bg-[#F3EBDD] text-[#806236]" : "border-[#E5E1D8] text-[#4A5568] hover:text-[#0F1B2D]"}`}
        >
          {a.label}
        </button>
      ))}
    </div>
  );
}

function StatusFilter({ active, onChange }) {
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

function ContentRow({ c, onOpen, onPreview }) {
  const freshTint = c.freshness === "overdue" ? `border-[#FBE9E7] text-[#B42318]` : c.freshness === "review-due-in-30" ? `border-[#FDF3E0] text-[#9A6210]` : `border-[#E7F3EC] text-[#286749]`;
  const riskTint = c.riskClass === "sensitive" ? `border-[#FBE9E7] text-[#B42318]` : `border-[#E5E1D8] text-[#4A5568]`;
  return (
    <tr
      key={c.id}
      className="hover:bg-[#F3EBDD]/50 transition border-b border-solid border-[#E5E1D8]/50 last:border-0 group cursor-pointer"
      onClick={() => onPreview(c.id)}
    >
      <td className="py-4">
        <div className="flex items-center gap-3">
          <div className="grid h-8 w-8 place-items-center rounded-[10px] bg-[#F3EBDD] text-[#806236] text-xs font-bold">
            {c.id.charAt(4).toUpperCase()}
          </div>
          <div>
            <b className="text-[12px] text-[#0F1B2D] font-medium tabular-nums">{c.id}</b>
            <p className="text-[11px] text-[#4A5568]">{c.title}</p>
          </div>
        </div>
      </td>
      <td className="py-4 text-[12px] text-[#4A5568]">
        <StatChip status={c.type} />
      </td>
      <td className="py-4 text-[12px] text-[#4A5568]">
        <StatChip status={c.audience[0]} />
      </td>
      <td className="py-4">
        <StatChip status={c.status} />
      </td>
      <td className="py-4 text-right text-[10px] text-[#4A5568]">
        v{c.version}
      </td>
      <td className="py-4 text-right text-[10px] text-[#4A5568]">
        {c.languageChips.map((lc) => (
          <span key={lc.key} className="inline-flex items-center rounded-full border px-1.5 py-0.5 text-[8px] font-medium ml-0.5">
            {lc.label}
          </span>
        ))}
      </td>
      <td className="py-4 text-right text-[10px] text-[#4A5568]">
        {c.ownerName}
      </td>
      <td className="py-4 text-right text-[10px] text-[#4A5568]">
        {relativeDate(c.lastUpdated)}
      </td>
      <td className="py-4 text-right text-[10px] text-[#4A5568]">
        <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[9px] font-medium ${freshTint}`}>
          {c.freshness === "fresh" ? "Fresh" : c.freshness === "review-due-in-30" ? "Review due in 30 days" : "Overdue"}
        </span>
        <p className="text-[9px] text-[#4A5568] mt-0.5">{c.nextReviewAt || "—"}</p>
      </td>
      <td className="py-4 text-right text-[10px] text-[#4A5568]">
        {c.views30d.toLocaleString()}
      </td>
      <td className="py-4 text-right text-[10px] text-[#4A5568]">
        {c.helpfulRate}%
      </td>
      <td className="py-4 text-right text-[10px] text-[#4A5568]">
        {c.openFeedback > 0 ? <span className="text-[#B42318]">{c.openFeedback}</span> : <span className="text-[#A0A7B4]">—</span>}
      </td>
      <td className="py-4 text-right">
        <Btn size="small" secondary onClick={(e) => { e.stopPropagation(); onOpen(c.id); }} className="px-2.5 py-1.5 min-w-[64px]">
          Open
        </Btn>
        <Btn size="small" secondary onClick={(e) => { e.stopPropagation(); onPreview(c.id); }} className="px-2.5 py-1.5 min-w-[64px] mt-1">
          Preview
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
/*  Page: Help and Announcements (/content)                           */
/* ------------------------------------------------------------------ */
function AdminContentPage() {
  const [refreshing, setRefreshing] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerItem, setDrawerItem] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata", hour12: false }));
  const [activeTab, setActiveTab] = useState("articles");
  const [activeType, setActiveType] = useState("all");
  const [activeAudience, setActiveAudience] = useState("all");
  const [activeStatus, setActiveStatus] = useState("all");
  const [activeLanguage, setActiveLanguage] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("needs-review");
  const [density, setDensity] = useState("comfortable");
  const [showSavedViews, setShowSavedViews] = useState(false);

  const filtered = useMemo(() => {
    return contentItems.filter((c) => {
      if (activeTab === "articles" && c.type !== "help_article") return false;
      if (activeTab === "announcements" && c.type !== "announcement") return false;
      if (activeTab === "release-notes" && c.type !== "release_note") return false;
      if (activeTab === "policy-legal" && c.type !== "policy") return false;
      if (activeTab === "platform-copy" && c.type !== "copy") return false;
      if (activeType !== "all" && c.type !== activeType) return false;
      if (activeAudience !== "all" && !c.audience.includes(activeAudience)) return false;
      if (activeStatus !== "all" && c.status !== activeStatus) return false;
      if (activeLanguage !== "all") {
        if (activeLanguage === "en" && c.language.en !== "published") return false;
        if (activeLanguage === "hi" && c.language.hi !== "published") return false;
        if (activeLanguage === "bn" && c.language.bn !== "published") return false;
      }
      if (searchQuery && !c.id.toLowerCase().includes(searchQuery.toLowerCase()) && !c.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });
  }, [activeTab, activeType, activeAudience, activeStatus, activeLanguage, searchQuery]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      if (sortBy === "needs-review") {
        const freshOrder = { overdue: 3, "review-due-in-30": 2, fresh: 1 };
        const fa = freshOrder[a.freshness] || 0;
        const fb = freshOrder[b.freshness] || 0;
        if (fa !== fb) return fb - fa;
        return new Date(b.lastUpdated) - new Date(a.lastUpdated);
      }
      if (sortBy === "recently-updated") return new Date(b.lastUpdated) - new Date(a.lastUpdated);
      if (sortBy === "most-viewed") return b.views30d - a.views30d;
      return 0;
    });
  }, [filtered, sortBy]);

  const stats = useMemo(() => {
    const published = contentItems.filter((c) => c.status === "published").length;
    const needsReview = contentItems.filter((c) => c.status === "needs-review" || c.freshness === "overdue").length;
    const inReview = contentItems.filter((c) => c.status === "in-review").length;
    const untranslatedSensitive = contentItems.filter((c) => c.riskClass === "sensitive" && (c.language.hi === "needs_translation" || c.language.bn === "needs_translation")).length;
    return { published, needsReview, inReview, untranslatedSensitive };
  }, [contentItems]);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    const t = setTimeout(() => {
      setRefreshing(false);
      setLastUpdated(new Date().toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata", hour12: false }));
      toast("Content directory refreshed");
    }, 800);
    return () => clearTimeout(t);
  }, []);

  const handleOpen = useCallback((id) => {
    toast(`Opening ${id} content item`);
  }, []);

  const handlePreview = useCallback((id) => {
    const c = contentItems.find((x) => x.id === id);
    if (c) {
      setDrawerItem(c);
      setDrawerOpen(true);
    }
  }, []);

  const handleSearch = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#0F1B2D]">
      <a href="#content-main" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 bg-[#0F1B2D] text-white px-4 py-2">
        Skip to content
      </a>

      <EnvironmentStrip />
      {IncidentBanner()}
      <TopBar onRefresh={handleRefresh} />

      <div className="flex flex-col lg:flex-row" id="content-main">
        <AdminSidebar active="Content" />

        <main className="flex-1 min-w-0 pt-6 lg:pt-8 lg:pl-[232px] lg:px-8 pb-24">
          {/* Title bar */}
          <div className="flex items-center justify-between mb-6 border-b border-solid border-[#E5E1D8] pb-4">
            <div>
              <h1 className="text-[28px] font-serif font-semibold">Content</h1>
              <p className="text-[12px] text-[#4A5568] mt-1">
                Help articles, announcements, release notes, policy and legal pages
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Btn size="small" secondary icon={Menu} onClick={() => setShowSavedViews(!showSavedViews)} title="Saved views" />
              {showSavedViews && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-solid border-[#E5E1D8] rounded-[10px] shadow-lg p-3 z-30">
                  <p className="text-[10px] font-semibold text-[#4A5568] mb-2 uppercase tracking-wide">Saved views</p>
                  <Btn size="small" secondary className="w-full text-left text-[11px]" onClick={() => { setShowSavedViews(false); toast("Loading 'Needs review'"); }}>
                    Needs review
                  </Btn>
                  <Btn size="small" secondary className="w-full text-left text-[11px]" onClick={() => { setShowSavedViews(false); toast("Loading 'Untranslated sensitive'"); }}>
                    Untranslated sensitive items
                  </Btn>
                  <Btn size="small" secondary className="w-full text-left text-[11px]" onClick={() => setShowSavedViews(false)}>
                    My saved views
                  </Btn>
                </div>
              )}
              <Btn size="small" secondary icon={RefreshCcw} onClick={handleRefresh} title="Refresh" />
            </div>
          </div>

          {/* Tabs */}
          <TabBar active={activeTab} onChange={setActiveTab} />

          {/* Type filter */}
          <TypeFilter active={activeType} onChange={setActiveType} />

          {/* Audience filter */}
          <AudienceFilter active={activeAudience} onChange={setActiveAudience} />

          {/* Status filter */}
          <StatusFilter active={activeStatus} onChange={setActiveStatus} />

          {/* Summary strip */}
          <div className="grid gap-4 lg:grid-cols-4 mb-6">
            <ContentStatCard label="Published items" value={stats.published} sub="Live across the product" color={SUCCESS} />
            <ContentStatCard label="Needs review" value={stats.needsReview} sub="Past review date or needs-review" color={WARNING} />
            <ContentStatCard label="In review" value={stats.inReview} sub="Awaiting approver decision" color={INFO} />
            <ContentStatCard label="Untranslated sensitive" value={stats.untranslatedSensitive} sub="Sensitive items without reviewed translation" color={ERROR} />
          </div>

          {/* Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 border-b border-solid border-[#E5E1D8] pb-3">
            <div className="flex items-center gap-3">
              <div className="relative w-64">
                <Search className="absolute left-3 top-2.5 text-[#4A5568]" size={16} />
                <input
                  type="search"
                  placeholder="Search by ID or title"
                  value={searchQuery}
                  onChange={handleSearch}
                  className="h-10 w-full rounded-[10px] border border-solid border-[#E5E1D8] bg-white pl-9 pr-4 text-[12px] focus:border-[#B8955A] focus:outline-none"
                />
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="h-10 rounded-[10px] border border-solid border-[#E5E1D8] bg-white pl-3 pr-10 text-[12px] appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2224%22 height=%2224%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%234A5568%22 stroke-width=%222%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22><path d=%22M6 9l6 6 6-6%22></path></svg>')] bg-no-repeat bg-right-2.5 bg-center-[10px]"
              >
                <option value="needs-review">Sort: Needs review → recently updated</option>
                <option value="recently-updated">Sort: Recently updated</option>
                <option value="most-viewed">Sort: Most viewed (30 days)</option>
              </select>
              <Btn size="small" secondary icon={LayoutGrid} onClick={() => setDensity(density === "comfortable" ? "compact" : "comfortable")} title="Toggle density" />
            </div>
          </div>

          {/* Content table */}
          <Card title="Content directory" titleIcon={FileText}>
            <div className="px-5 pt-3 pb-4 overflow-x-auto">
              <table className="w-full text-left text-[12px] border-collapse min-w-full">
                <thead>
                  <tr className="border-b border-solid border-[#E5E1D8]">
                    {["Item", "Type", "Audience", "Status", "Version", "Languages", "Owner", "Last updated", "Freshness", "Views (30d)", "Helpful", "Feedback", "Actions"].map((h) => (
                      <th key={h} className="pb-3 text-[11px] text-[#4A5568] font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-solid divide-[#E5E1D8]/50">
                  {sorted.length === 0 ? (
                    <tr>
                      <td colSpan={13} className="py-12 text-center text-[12px] text-[#4A5568]">
                        <FileText size={24} className="mx-auto mb-3 text-[#4A5568]" />
                        <p className="text-[12px] font-medium text-[#0F1B2D]">No content matches your filters.</p>
                        <Btn size="small" secondary onClick={() => { setActiveType("all"); setActiveAudience("all"); setActiveStatus("all"); setActiveLanguage("all"); setSearchQuery(""); }} className="mt-3">
                          Clear filters
                        </Btn>
                      </td>
                    </tr>
                  ) : (
                    sorted.map((c) => (
                      <ContentRow key={c.id} c={c} onOpen={handleOpen} onPreview={handlePreview} />
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <div className="px-5 pt-3 pb-4 flex items-center justify-between">
              <p className="text-[11px] text-[#4A5568]">
                Showing {sorted.length} of {contentItems.length} items
              </p>
              <div className="flex items-center gap-2">
                <Btn size="small" secondary className="px-2 py-1.5" icon={LayoutGrid} title="Grid view" />
                <Btn size="small" secondary className="px-2 py-1.5" icon={LayoutList} title="List view" />
              </div>
            </div>
          </Card>

          <div className="mt-8 px-5 lg:px-0 text-center lg:text-left">
            <p className="text-[11px] text-[#4A5568]">
              Titles, types, audiences, versions and owners only. No personal data appears in lists.
              Publishing follows the review matrix; every publish, schedule and rollback is logged.
            </p>
          </div>
        </main>
      </div>

      {/* Content preview drawer */}
      {drawerOpen && drawerItem && (
        <DetailDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title={`Item: ${drawerItem.id}`}>
          <div className="space-y-5">
            <div className="grid gap-4 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <h4 className="text-[11px] font-semibold text-[#4A5568] uppercase tracking-wide mb-2">Item details</h4>
                <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">Item ID:</b> {drawerItem.id}</p>
                <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">Title:</b> {drawerItem.title}</p>
                <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">Type:</b> {drawerItem.typeLabel}</p>
                <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">Audience:</b> {drawerItem.audienceLabel}</p>
                <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">Status:</b> <StatChip status={drawerItem.status} /></p>
                <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">Version:</b> {drawerItem.version}</p>
                <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">Risk class:</b> <StatChip status={drawerItem.riskClass} /></p>
                <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">Owner:</b> {drawerItem.ownerName}</p>
                <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">Last updated:</b> {drawerItem.lastUpdated}</p>
                <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">Next review:</b> {drawerItem.nextReviewAt || "Not set"}</p>
              </div>
              <div>
                <h4 className="text-[11px] font-semibold text-[#4A5568] uppercase tracking-wide mb-2">Languages & analytics</h4>
                {drawerItem.languageChips.map((lc) => (
                  <p key={lc.key} className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">{lc.label}:</b> <StatChip status={lc.key === "en" ? drawerItem.language.en : lc.key === "hi" ? drawerItem.language.hi : drawerItem.language.bn} /></p>
                ))}
                <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">Views (30 days):</b> {drawerItem.views30d.toLocaleString()}</p>
                <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">Helpful rate:</b> {drawerItem.helpfulRate}%</p>
                <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">Open feedback:</b> {drawerItem.openFeedback}</p>
              </div>
            </div>

            <Card title="Action panel" titleIcon={Scale}>
              <div className="px-5 pt-3 pb-4 space-y-4">
                <p className="text-[12px] text-[#4A5568]">
                  Open the item to edit, submit for review, approve, schedule or publish.
                  Every change is versioned and written to the audit log.
                </p>
                <div className="flex gap-2">
                  <Btn onClick={() => {
                    setDrawerOpen(false);
                    toast(`Opening ${drawerItem.id} editor`);
                  }} className="flex-1">
                    Open editor
                  </Btn>
                  <Btn secondary onClick={() => {
                    setDrawerOpen(false);
                    toast(`${drawerItem.id}: closed`);
                  }} className="flex-1">
                    Close drawer
                  </Btn>
                </div>
                <div className="bg-[#F3EBDD] border border-solid border-[#F3EBDD] rounded-[10px] p-3">
                  <p className="text-[11px] text-[#806236] mb-2"><b className="text-[#806236]">Review matrix:</b> Sensitive items need compliance or legal approval. Self-approval is not permitted.</p>
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
export { AdminContentPage };
