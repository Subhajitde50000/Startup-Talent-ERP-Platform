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
  internalRole: "Finance analyst",
  internalRoles: ["Finance analyst"],
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
/*  Currency formatting (₹ with Indian grouping, paise -> rupees)     */
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
    succeeded: `border-[#E7F3EC] bg-[#E7F3EC] text-[#286749]`,
    pending: `border-[#FDF3E0] bg-[#FDF3E0] text-[#9A6210]`,
    failed: `border-[#FBE9E7] bg-[#FBE9E7] text-[#B42318]`,
    refunded: `border-[#E5E1D8] text-[#4A5568]`,
    "partially-refunded": `border-[#E5E1D8] text-[#4A5568]`,
    disputed: `border-[#FBE9E7] text-[#B42318]`,
    reversed: `border-[#E5E1D8] text-[#4A5568]`,
    scheduled: `border-[#E5E1D8] text-[#4A5568]`,
    "pending-approval": `border-[#FDF3E0] bg-[#FDF3E0] text-[#9A6210]`,
    approved: `border-[#F3EBDD] bg-[#F3EBDD] text-[#806236]`,
    processing: `border-[#E8F0F8] text-[#2F5D8A]`,
    paid: `border-[#E7F3EC] bg-[#E7F3EC] text-[#286749]`,
    "on-hold": `border-[#FDF3E0] text-[#9A6210]`,
    cancelled: `border-[#E5E1D8] text-[#4A5568]`,
    matched: `border-[#E7F3EC] bg-[#E7F3EC] text-[#286749]`,
    unmatched: `border-[#FDF3E0] bg-[#FDF3E0] text-[#9A6210]`,
    mismatch: `border-[#FBE9E7] bg-[#FBE9E7] text-[#B42318]`,
    "pending-settlement": `border-[#E5E1D8] text-[#4A5568]`,
    draft: `border-[#E5E1D8] text-[#4A5568]`,
    "in-review": `border-[#E8F0F8] text-[#2F5D8A]`,
    scheduled: `border-[#E8F0F8] text-[#2F5D8A]`,
    live: `border-[#E7F3EC] text-[#286749]`,
    grandfathered: `border-[#FDF3E0] text-[#9A6210]`,
    sunset: `border-[#E5E1D8] text-[#4A5568]`,
    retired: `border-[#E5E1D8] text-[#4A5568]`,
    awaiting: `border-[#FDF3E0] text-[#9A6210]`,
    rejected: `border-[#FBE9E7] text-[#B42318]`,
    expired: `border-[#E5E1D8] text-[#4A5568]`,
    low: `border-[#E7F3EC] text-[#286749]`,
    medium: `border-[#FDF3E0] text-[#9A6210]`,
    high: `border-[#FBE9E7] text-[#B42318]`,
    startup: `border-[#E5E1D8] text-[#4A5568]`,
    mentor: `border-[#E5E1D8] text-[#4A5568]`,
    investor: `border-[#E5E1D8] text-[#4A5568]`,
    "job-seeker": `border-[#E5E1D8] text-[#4A5568]`,
    employer: `border-[#E5E1D8] text-[#4A5568]`,
    partner: `border-[#E5E1D8] text-[#4A5568]`,
    all: `border-[#E5E1D8] text-[#4A5568]`,
    today: `border-[#E5E1D8] text-[#4A5568]`,
    "7-days": `border-[#E5E1D8] text-[#4A5568]`,
    "this-month": `border-[#E5E1D8] text-[#4A5568]`,
    "this-quarter": `border-[#E5E1D8] text-[#4A5568]`,
    "this-year": `border-[#E5E1D8] text-[#4A5568]`,
    custom: `border-[#E5E1D8] text-[#4A5568]`,
    previous: `border-[#E5E1D8] text-[#4A5568]`,
    "same-period-last-year": `border-[#E5E1D8] text-[#4A5568]`,
    inr: `border-[#E5E1D8] text-[#4A5568]`,
  };
  const label =
    status === "succeeded" ? "Succeeded" :
    status === "pending" ? "Pending" :
    status === "failed" ? "Failed" :
    status === "refunded" ? "Refunded" :
    status === "partially-refunded" ? "Partially refunded" :
    status === "disputed" ? "Disputed" :
    status === "reversed" ? "Reversed" :
    status === "scheduled" ? "Scheduled" :
    status === "pending-approval" ? "Pending approval" :
    status === "approved" ? "Approved" :
    status === "processing" ? "Processing" :
    status === "paid" ? "Paid" :
    status === "on-hold" ? "On hold" :
    status === "cancelled" ? "Cancelled" :
    status === "matched" ? "Matched" :
    status === "unmatched" ? "Unmatched" :
    status === "mismatch" ? "Mismatch" :
    status === "pending-settlement" ? "Pending settlement" :
    status === "draft" ? "Draft" :
    status === "in-review" ? "In review" :
    status === "live" ? "Live" :
    status === "grandfathered" ? "Grandfathered" :
    status === "sunset" ? "Sunset" :
    status === "retired" ? "Retired" :
    status === "awaiting" ? "Awaiting" :
    status === "rejected" ? "Rejected" :
    status === "expired" ? "Expired" :
    status === "low" ? "Low" :
    status === "medium" ? "Medium" :
    status === "high" ? "High" :
    status === "startup" ? "Startup" :
    status === "mentor" ? "Mentor" :
    status === "investor" ? "Investor" :
    status === "job-seeker" ? "Job seeker" :
    status === "employer" ? "Employer" :
    status === "partner" ? "Partner" :
    status === "all" ? "All" :
    status === "today" ? "Today" :
    status === "7-days" ? "Last 7 days" :
    status === "this-month" ? "This month" :
    status === "this-quarter" ? "This quarter" :
    status === "this-year" ? "This financial year" :
    status === "custom" ? "Custom range" :
    status === "previous" ? "Previous period" :
    status === "same-period-last-year" ? "Same period last year" :
    status === "inr" ? "INR" :
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
/*  Mock billing overview data (Part A.10 data contract shape)        */
/* ------------------------------------------------------------------ */

const moneyTabs = [
  { key: "overview", label: "Overview" },
  { key: "subscriptions", label: "Subscriptions and packs" },
  { key: "payments", label: "Payments and failures" },
  { key: "dunning", label: "Dunning" },
  { key: "reconciliation", label: "Reconciliation" },
  { key: "taxes", label: "Taxes and invoices" },
  { key: "close", label: "Close and exports" },
];

const rangeFilters = [
  { key: "today", label: "Today" },
  { key: "7-days", label: "Last 7 days" },
  { key: "this-month", label: "This month" },
  { key: "this-quarter", label: "This quarter" },
  { key: "this-year", label: "This financial year" },
  { key: "custom", label: "Custom range" },
];

const compareFilters = [
  { key: "previous", label: "Previous period" },
  { key: "same-period-last-year", label: "Same period last year" },
];

const currencyFilters = [
  { key: "inr", label: "INR" },
];

const paymentStatusFilters = [
  { key: "all", label: "All statuses" },
  { key: "succeeded", label: "Succeeded" },
  { key: "pending", label: "Pending" },
  { key: "failed", label: "Failed" },
  { key: "refunded", label: "Refunded" },
  { key: "disputed", label: "Disputed" },
];

const providerFilters = [
  { key: "all", label: "All providers" },
  { key: "upi", label: "UPI" },
  { key: "card", label: "Card" },
  { key: "net-banking", label: "Net banking" },
  { key: "invoice-billing", label: "Invoice billing" },
];

// KPI data (per A.3)
const kpis = [
  { label: "Revenue (period)", value: formatMoney(428000000), change: "▲ 9%", changeColor: SUCCESS, sub: "All streams, this period" },
  { label: "Recurring revenue (MRR)", value: formatMoney(184000000), change: "—", changeColor: STONE_700, sub: "Monthly recurring" },
  { label: "Payment success rate", value: "97.6%", change: "▼ 0.3%", changeColor: WARNING, sub: "All payment methods" },
  { label: "Failed payments (open)", value: "112", sub: formatMoney(6100000) + " outstanding", changeColor: ERROR },
  { label: "Refunds (period)", value: formatMoney(130000), sub: "0.8% of revenue", changeColor: STONE_700 },
  { label: "Credits outstanding", value: formatMoney(970000), sub: "Unused packs and credits (liability)", changeColor: GOLD_DARK },
];

const alerts = [
  { id: "al_41", type: "settlement_mismatch", severity: 2, link: "/billing#reconciliation", text: "Provider settlement ₹4,12,000 doesn't match ledger by ₹8,500" },
  { id: "al_42", type: "provider_outage", severity: 3, link: "/billing#payments", text: "UPI timeouts elevated — 4% of UPI payments failing since 10:00" },
  { id: "al_43", type: "refund_spike", severity: 1, link: "/billing#payments", text: "Refund volume 2x normal — review the spike" },
];

const payments = [
  {
    id: "PAY-2026-110601",
    time: "2026-11-06T14:30:00+05:30",
    role: "employer",
    payerId: "org_77",
    item: "Job post pack — 5 posts",
    amount: 49900,
    tax: 8982,
    provider: "upi",
    method: "UPI",
    status: "succeeded",
    failureCode: null,
    invoice: "INV-2026-1044",
  },
  {
    id: "PAY-2026-110602",
    time: "2026-11-06T14:15:00+05:30",
    role: "startup",
    payerId: "org_33",
    item: "Startup subscription — Growth",
    amount: 299900,
    tax: 53982,
    provider: "card",
    method: "Credit card",
    status: "failed",
    failureCode: "insufficient_funds",
    invoice: null,
  },
  {
    id: "PAY-2026-110603",
    time: "2026-11-06T13:45:00+05:30",
    role: "mentor",
    payerId: "usr_44",
    item: "Session commission hold release",
    amount: 12000,
    tax: 2160,
    provider: "upi",
    method: "UPI",
    status: "pending",
    failureCode: null,
    invoice: null,
  },
  {
    id: "PAY-2026-110604",
    time: "2026-11-06T13:20:00+05:30",
    role: "employer",
    payerId: "org_88",
    item: "Featured listing",
    amount: 75000,
    tax: 13500,
    provider: "card",
    method: "Credit card",
    status: "succeeded",
    failureCode: null,
    invoice: "INV-2026-1045",
  },
  {
    id: "PAY-2026-110605",
    time: "2026-11-06T12:55:00+05:30",
    role: "job-seeker",
    payerId: "usr_90",
    item: "AI interview pack — 5 sessions",
    amount: 39900,
    tax: 7182,
    provider: "upi",
    method: "UPI",
    status: "failed",
    failureCode: "upi_timeout",
    invoice: null,
  },
  {
    id: "PAY-2026-110606",
    time: "2026-11-06T12:30:00+05:30",
    role: "investor",
    payerId: "org_55",
    item: "Investor membership — Annual",
    amount: 1200000,
    tax: 216000,
    provider: "net-banking",
    method: "Net banking",
    status: "succeeded",
    failureCode: null,
    invoice: "INV-2026-1046",
  },
  {
    id: "PAY-2026-110607",
    time: "2026-11-06T11:40:00+05:30",
    role: "employer",
    payerId: "org_77",
    item: "Job post pack — 10 posts",
    amount: 89900,
    tax: 16182,
    provider: "upi",
    method: "UPI",
    status: "succeeded",
    failureCode: null,
    invoice: "INV-2026-1047",
  },
  {
    id: "PAY-2026-110608",
    time: "2026-11-06T11:10:00+05:30",
    role: "startup",
    payerId: "org_90",
    item: "Startup subscription — Starter",
    amount: 99900,
    tax: 17982,
    provider: "card",
    method: "Credit card",
    status: "disputed",
    failureCode: null,
    invoice: "INV-2026-1048",
  },
];

const dunningQueue = [
  { account: "org_11", amount: 29900, stage: "Day 3", lastAttempt: "2026-11-04T10:00:00+05:30", failureReason: "card_declined", nextAction: "Retry day 5" },
  { account: "org_22", amount: 49900, stage: "Day 5", lastAttempt: "2026-11-02T14:30:00+05:30", failureReason: "insufficient_funds", nextAction: "Grace period ends today" },
  { account: "org_33", amount: 99900, stage: "Day 7", lastAttempt: "2026-11-01T09:00:00+05:30", failureReason: "upi_timeout", nextAction: "Pause new posts" },
];

const reconciliation = [
  { provider: "UPI Provider A", settlement: "SET-2026-1105", expected: 1250000, received: 1241500, status: "mismatch", date: "2026-11-05" },
  { provider: "Card Provider B", settlement: "SET-2026-1106", expected: 890000, received: 890000, status: "matched", date: "2026-11-06" },
  { provider: "Net Banking C", settlement: "SET-2026-1104", expected: 450000, received: null, status: "unmatched", date: "2026-11-04" },
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

function MoneyCard({ label, value, change, changeColor = STONE_700, sub, source }) {
  return (
    <Card title padded className="border-[#E5E1D8]">
      <div className="px-5 pt-3 pb-4">
        <div className="flex items-baseline gap-1 mb-1">
          <b className={`text-[32px] font-serif font-semibold text-[#0F1B2D] tabular-nums`}>{value}</b>
          {change && (
            <span className={`ml-2 text-xs font-medium ${changeColor === SUCCESS ? SUCCESS_DARK : changeColor === ERROR ? ERROR_DARK : changeColor === WARNING ? WARNING_DARK : STONE_700}`}>
              {change}
            </span>
          )}
        </div>
        <p className="text-[12px] text-[#4A5568]">{label}</p>
        <p className="text-[11px] text-[#4A5568]">{sub}</p>
        {source && (
          <p className="text-[10px] text-[#4A5568] mt-1"><b className="text-[#0F1B2D]">Source:</b> {source}</p>
        )}
      </div>
    </Card>
  );
}

function TabBar({ active, onChange }) {
  return (
    <div className="flex gap-1 overflow-x-auto mb-3 pb-1 border-b border-solid border-[#E5E1D8]">
      {moneyTabs.map((t) => (
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

function PaymentStatusFilter({ active, onChange }) {
  return (
    <div className="flex gap-2 overflow-x-auto mb-3 pb-1 border-b border-solid border-[#E5E1D8]">
      {paymentStatusFilters.map((s) => (
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

function PaymentRow({ p, onPreview }) {
  const statusKey = p.status;
  return (
    <tr
      key={p.id}
      className="hover:bg-[#F3EBDD]/50 transition border-b border-solid border-[#E5E1D8]/50 last:border-0 group cursor-pointer"
      onClick={() => onPreview(p.id)}
    >
      <td className="py-4 text-[12px] text-[#4A5568] font-medium">{relativeDate(p.time)}</td>
      <td className="py-4">
        <b className="text-[12px] text-[#0F1B2D] font-medium tabular-nums">{p.id}</b>
      </td>
      <td className="py-4 text-right text-[10px] text-[#4A5568]">
        <StatChip status={p.role} className="text-[10px]" />
      </td>
      <td className="py-4 text-right text-[10px] text-[#4A5568]">
        {p.payerId}
      </td>
      <td className="py-4 text-right text-[12px] text-[#4A5568]">
        {formatMoney(p.amount)}
      </td>
      <td className="py-4 text-right text-[10px] text-[#4A5568]">
        {formatMoney(p.tax)}
      </td>
      <td className="py-4 text-right text-[10px] text-[#4A5568]">
        <StatChip status={p.provider} className="text-[10px]" />
      </td>
      <td className="py-4 text-right text-[10px] text-[#4A5568]">
        {p.method}
      </td>
      <td className="py-4 text-right">
        <StatChip status={statusKey} />
      </td>
      <td className="py-4 text-right text-[10px] text-[#4A5568]">
        {p.failureCode ? p.failureCode.replace("_", " ").toLowerCase() : "—"}
      </td>
      <td className="py-4 text-right text-[10px] text-[#4A5568]">
        {p.invoice || "—"}
      </td>
      <td className="py-4 text-right">
        <Btn size="small" secondary onClick={(e) => { e.stopPropagation(); onPreview(p.id); }} className="px-2.5 py-1.5 min-w-[64px]">
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

function AlertsStrip() {
  if (alerts.length === 0) return null;
  return (
    <div className="mb-6">
      <div className="flex gap-2 overflow-x-auto pb-1 border-b border-solid border-[#FBE9E7]">
        {alerts.map((a) => (
          <div key={a.id} className="whitespace-nowrap flex items-center gap-2 px-3 py-2 rounded-[10px] border border-solid border-[#FBE9E7] bg-[#FBE9E7]">
            <AlertTriangle size={12} className="text-[#B42318]" />
            <span className="text-[10px] text-[#B42318] font-medium">{a.text}</span>
            <Btn size="small" secondary className="px-2 py-1 min-w-[48px]" onClick={() => toast(`Opening ${a.link}`)} title="View">
              View
            </Btn>
          </div>
        ))}
      </div>
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
/*  Page: Revenue and Billing Overview (/billing)                     */
/* ------------------------------------------------------------------ */
function AdminMoneyPage() {
  const [refreshing, setRefreshing] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerItem, setDrawerItem] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata", hour12: false }));
  const [activeTab, setActiveTab] = useState("overview");
  const [activeRange, setActiveRange] = useState("this-month");
  const [activeCompare, setActiveCompare] = useState("previous");
  const [activeCurrency, setActiveCurrency] = useState("inr");
  const [activePaymentStatus, setActivePaymentStatus] = useState("all");
  const [activeProvider, setActiveProvider] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSavedViews, setShowSavedViews] = useState(false);

  const filteredPayments = useMemo(() => {
    return payments.filter((p) => {
      if (activePaymentStatus !== "all" && p.status !== activePaymentStatus) return false;
      if (activeProvider !== "all" && p.provider !== activeProvider) return false;
      if (searchQuery && !p.id.toLowerCase().includes(searchQuery.toLowerCase()) && !p.item.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });
  }, [activePaymentStatus, activeProvider, searchQuery]);

  const kpiStats = useMemo(() => {
    const totalRevenue = payments.reduce((s, p) => p.status === "succeeded" ? s + p.amount : s, 0);
    const failedCount = payments.filter((p) => p.status === "failed").length;
    const failedAmount = payments.filter((p) => p.status === "failed").reduce((s, p) => s + p.amount, 0);
    const refundedAmount = payments.filter((p) => p.status === "refunded").reduce((s, p) => s + p.amount, 0);
    return { totalRevenue, failedCount, failedAmount, refundedAmount };
  }, [payments]);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    const t = setTimeout(() => {
      setRefreshing(false);
      setLastUpdated(new Date().toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata", hour12: false }));
      toast("Billing overview refreshed");
    }, 800);
    return () => clearTimeout(t);
  }, []);

  const handleExport = useCallback(() => {
    toast("Exporting CSV (re-authentication required)");
  }, []);

  const handleOpenPayment = useCallback((id) => {
    toast(`Opening payment ${id} drawer`);
  }, []);

  const handlePreviewPayment = useCallback((id) => {
    const p = payments.find((x) => x.id === id);
    if (p) {
      setDrawerItem(p);
      setDrawerOpen(true);
    }
  }, []);

  const handleSearch = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#0F1B2D]">
      <a href="#billing-main" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 bg-[#0F1B2D] text-white px-4 py-2">
        Skip to content
      </a>

      <EnvironmentStrip />
      <AlertsStrip />
      <TopBar onRefresh={handleRefresh} />

      <div className="flex flex-col lg:flex-row" id="billing-main">
        <AdminSidebar active="Billing" />

        <main className="flex-1 min-w-0 pt-6 lg:pt-8 lg:pl-[232px] lg:px-8 pb-24">
          {/* Title bar */}
          <div className="flex items-center justify-between mb-6 border-b border-solid border-[#E5E1D8] pb-4">
            <div>
              <h1 className="text-[28px] font-serif font-semibold">Revenue and billing</h1>
              <p className="text-[12px] text-[#4A5568] mt-1">
                Revenue, payments health, failures and dunning, reconciliation, tax and invoices
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Btn size="small" secondary icon={Menu} onClick={() => setShowSavedViews(!showSavedViews)} title="Saved views" />
              {showSavedViews && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-solid border-[#E5E1D8] rounded-[10px] shadow-lg p-3 z-30">
                  <p className="text-[10px] font-semibold text-[#4A5568] mb-2 uppercase tracking-wide">Saved views</p>
                  <Btn size="small" secondary className="w-full text-left text-[11px]" onClick={() => { setShowSavedViews(false); toast("Loading 'Failed payments this week'"); }}>
                    Failed payments this week
                  </Btn>
                  <Btn size="small" secondary className="w-full text-left text-[11px]" onClick={() => { setShowSavedViews(false); toast("Loading 'Unmatched settlements'"); }}>
                    Unmatched settlements
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

          {/* Tabs */}
          <TabBar active={activeTab} onChange={setActiveTab} />

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
                value={activeCurrency}
                onChange={(e) => setActiveCurrency(e.target.value)}
                className="h-10 rounded-[10px] border border-solid border-[#E5E1D8] bg-white pl-3 pr-10 text-[12px] appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2224%22 height=%2224%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%234A5568%22 stroke-width=%222%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22><path d=%22M6 9l6 6 6-6%22></path></svg>')] bg-no-repeat bg-right-2.5 bg-center-[10px]"
              >
                <option value="inr">INR</option>
              </select>
            </div>
            <div className="flex items-end gap-2 text-right">
              <p className="text-[11px] text-[#4A5568]">Updated</p>
              <p className="text-[12px] font-mono text-[#0F1B2D]">{lastUpdated}</p>
            </div>
          </div>

          {/* KPI row */}
          <div className="grid gap-4 lg:grid-cols-6 mb-6">
            {kpis.map((k, i) => (
              <MoneyCard key={i} label={k.label} value={k.value} change={k.change} changeColor={k.changeColor} sub={k.sub} source="Ledger" />
            ))}
          </div>

          <div className="flex lg:flex-row gap-6 mb-6">
            {/* Charts area */}
            <div className="flex-1 min-w-0">
              <Card title="Revenue by stream" titleIcon={BarChart3}>
                <div className="px-5 pt-3 pb-4 h-64 bg-[#F3EBDD]/30 rounded-[10px] flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 size={48} className="mx-auto mb-3 text-[#806236]" />
                    <p className="text-[12px] text-[#4A5568]">Startup subscriptions · Investor memberships · Employer plans · Featured listings · Candidate premium · Mentor commissions · Partnerships</p>
                    <p className="text-[10px] text-[#4A5568] mt-2">Sum reconciles to ledger within rounding rules</p>
                  </div>
                </div>
                <div className="px-5 pt-3 pb-4">
                  <p className="text-[10px] text-[#4A5568]"><b className="text-[#0F1B2D]">Headline:</b> Employer plans are the largest stream this period at ₹15.2L, up from ₹13.1L last month.</p>
                  <Btn size="small" secondary className="mt-3" onClick={() => toast("Opening revenue by stream table")} title="View as table">
                    View as table
                  </Btn>
                </div>
              </Card>

              <Card title="Payment outcomes" titleIcon={PieChart} className="mt-4">
                <div className="px-5 pt-3 pb-4 h-48 bg-[#F3EBDD]/30 rounded-[10px] flex items-center justify-center">
                  <div className="text-center">
                    <ActivityIcon size={48} className="mx-auto mb-3 text-[#806236]" />
                    <p className="text-[12px] text-[#4A5568]">Succeeded · Failed · Pending · By method and provider</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Needs attention side */}
            <div className="w-full lg:w-80 flex-shrink-0">
              <Card title="Needs attention" titleIcon={AlertTriangle}>
                <div className="px-5 pt-3 pb-4 space-y-3">
                  {alerts.map((a) => (
                    <div key={a.id} className="flex items-start gap-3">
                      <AlertCircle size={16} className={`text-[${a.severity >= 3 ? ERROR_DARK : a.severity === 2 ? WARNING_DARK : INFO}] flex-shrink-0 mt-0.5`} />
                      <div>
                        <p className="text-[11px] text-[#4A5568] leading-snug">{a.text}</p>
                        <Btn size="small" secondary className="mt-1 px-2 py-1 min-w-[56px]" onClick={() => toast(`Opening ${a.link}`)} title="View">
                          View
                        </Btn>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>

          {/* Subscriptions and packs */}
          {activeTab === "subscriptions" && (
            <Card title="Subscriptions and packs" titleIcon={CreditCard}>
              <div className="px-5 pt-3 pb-4 h-64 bg-[#F3EBDD]/30 rounded-[10px] flex items-center justify-center">
                <div className="text-center">
                  <CreditCard size={48} className="mx-auto mb-3 text-[#806236]" />
                  <p className="text-[12px] text-[#4A5568]">Subscribers by plan and role · Packs and add-ons · Cohorts · Concentration · Entitlement exceptions</p>
                </div>
              </div>
            </Card>
          )}

          {/* Payments and failures */}
          {activeTab === "payments" && (
            <Card title="Payments and failures" titleIcon={CreditCard}>
              <div className="px-5 pt-3 pb-4">
                <div className="flex items-center gap-3 mb-4">
                  <PaymentStatusFilter active={activePaymentStatus} onChange={setActivePaymentStatus} />
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-[12px] border-collapse min-w-full">
                    <thead>
                      <tr className="border-b border-solid border-[#E5E1D8]">
                        {["Time", "Payment ID", "Role", "Payer", "Amount", "Tax", "Provider", "Method", "Status", "Failure code", "Invoice", "Actions"].map((h) => (
                          <th key={h} className="pb-3 text-[11px] text-[#4A5568] font-medium">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-solid divide-[#E5E1D8]/50">
                      {filteredPayments.length === 0 ? (
                        <tr>
                          <td colSpan={12} className="py-12 text-center text-[12px] text-[#4A5568]">
                            <CreditCard size={24} className="mx-auto mb-3 text-[#4A5568]" />
                            <p className="text-[12px] font-medium text-[#0F1B2D]">No payments match your filters.</p>
                            <Btn size="small" secondary onClick={() => { setActivePaymentStatus("all"); setActiveProvider("all"); setSearchQuery(""); }} className="mt-3">
                              Clear filters
                            </Btn>
                          </td>
                        </tr>
                      ) : (
                        filteredPayments.map((p) => (
                          <PaymentRow key={p.id} p={p} onPreview={handlePreviewPayment} />
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="px-5 pt-3 pb-4 flex items-center justify-between">
                  <p className="text-[11px] text-[#4A5568]">Showing {filteredPayments.length} of {payments.length} payments</p>
                  <div className="flex items-center gap-2">
                    <Btn size="small" secondary className="px-2 py-1.5" icon={LayoutGrid} title="Grid view" />
                    <Btn size="small" secondary className="px-2 py-1.5" icon={LayoutList} title="List view" />
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Dunning */}
          {activeTab === "dunning" && (
            <Card title="Dunning" titleIcon={ClockIcon}>
              <div className="px-5 pt-3 pb-4">
                <p className="text-[12px] text-[#4A5568] mb-4">Retry schedule: day 1, 3, 5, 7 · Grace period: 7 days · After grace: pause new job posts, saved-search limits (data never deleted)</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-[12px] border-collapse min-w-full">
                    <thead>
                      <tr className="border-b border-solid border-[#E5E1D8]">
                        {["Account", "Amount", "Stage", "Last attempt", "Failure reason", "Next action"].map((h) => (
                          <th key={h} className="pb-3 text-[11px] text-[#4A5568] font-medium">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-solid divide-[#E5E1D8]/50">
                      {dunningQueue.map((d) => (
                        <tr key={d.account} className="border-b border-solid border-[#E5E1D8]/50 last:border-0">
                          <td className="py-4 text-[12px] text-[#4A5568] font-medium">{d.account}</td>
                          <td className="py-4 text-right text-[12px] text-[#4A5568] tabular-nums">{formatMoney(d.amount)}</td>
                          <td className="py-4 text-right text-[10px] text-[#4A5568]"><StatChip status={d.stage.toLowerCase().includes("day") ? "warning" : "pending"} /></td>
                          <td className="py-4 text-right text-[10px] text-[#4A5568]">{relativeDate(d.lastAttempt)}</td>
                          <td className="py-4 text-right text-[10px] text-[#4A5568]">{d.failureReason.replace("_", " ")}</td>
                          <td className="py-4 text-right text-[10px] text-[#4A5568]">{d.nextAction}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Card>
          )}

          {/* Reconciliation */}
          {activeTab === "reconciliation" && (
            <Card title="Reconciliation" titleIcon={Scale}>
              <div className="px-5 pt-3 pb-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-[12px] border-collapse min-w-full">
                    <thead>
                      <tr className="border-b border-solid border-[#E5E1D8]">
                        {["Provider", "Settlement", "Expected", "Received", "Status", "Date"].map((h) => (
                          <th key={h} className="pb-3 text-[11px] text-[#4A5568] font-medium">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-solid divide-[#E5E1D8]/50">
                      {reconciliation.map((r) => (
                        <tr key={r.settlement} className="border-b border-solid border-[#E5E1D8]/50 last:border-0">
                          <td className="py-4 text-[12px] text-[#4A5568]">{r.provider}</td>
                          <td className="py-4 text-right text-[10px] text-[#4A5568] font-medium">{r.settlement}</td>
                          <td className="py-4 text-right text-[12px] text-[#4A5568] tabular-nums">{formatMoney(r.expected)}</td>
                          <td className="py-4 text-right text-[12px] text-[#4A5568] tabular-nums">{r.received ? formatMoney(r.received) : "—"}</td>
                          <td className="py-4 text-right"><StatChip status={r.status} /></td>
                          <td className="py-4 text-right text-[10px] text-[#4A5568]">{r.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="px-5 pt-3 pb-4 mt-4 bg-[#FBE9E7] border border-solid border-[#FBE9E7] rounded-[10px] p-3">
                  <p className="text-[11px] text-[#B42318] mb-1"><b className="text-[#B42318]">Daily close:</b> Yesterday's settlement has exceptions — close is blocked until resolved.</p>
                  <Btn size="small" secondary className="mt-2" onClick={() => toast("Opening reconciliation exceptions")} title="Resolve">
                    Resolve exceptions
                  </Btn>
                </div>
              </div>
            </Card>
          )}

          {/* Taxes and invoices */}
          {activeTab === "taxes" && (
            <Card title="Taxes and invoices" titleIcon={FileText}>
              <div className="px-5 pt-3 pb-4 h-64 bg-[#F3EBDD]/30 rounded-[10px] flex items-center justify-center">
                <div className="text-center">
                  <FileText size={48} className="mx-auto mb-3 text-[#806236]" />
                  <p className="text-[12px] text-[#4A5568]">GST collected by rate and state · Invoices · Credit notes · Tax details register · Compliance calendar</p>
                </div>
              </div>
            </Card>
          )}

          {/* Close and exports */}
          {activeTab === "close" && (
            <Card title="Close and exports" titleIcon={Archive}>
              <div className="px-5 pt-3 pb-4 h-64 bg-[#F3EBDD]/30 rounded-[10px] flex items-center justify-center">
                <div className="text-center">
                  <Archive size={48} className="mx-auto mb-3 text-[#806236]" />
                  <p className="text-[12px] text-[#4A5568]">Month-end close checklist · Exports to accounting tools · Revenue recognition notes</p>
                </div>
              </div>
            </Card>
          )}

          <div className="mt-8 px-5 lg:px-0 text-center lg:text-left">
            <p className="text-[11px] text-[#4A5568]">
              Amounts are in minor units (paise) derived from the ledger. No card numbers or full bank details appear on this page.
              Every approve, execute and export is logged to the audit trail.
            </p>
          </div>
        </main>
      </div>

      {/* Payment detail drawer */}
      {drawerOpen && drawerItem && (
        <DetailDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title={`Payment: ${drawerItem.id}`}>
          <div className="space-y-5">
            <div className="grid gap-4 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <h4 className="text-[11px] font-semibold text-[#4A5568] uppercase tracking-wide mb-2">Payment details</h4>
                <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">Payment ID:</b> {drawerItem.id}</p>
                <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">Time:</b> {drawerItem.time}</p>
                <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">Role:</b> {drawerItem.role}</p>
                <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">Payer:</b> {drawerItem.payerId}</p>
                <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">Item:</b> {drawerItem.item}</p>
                <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">Amount:</b> {formatMoney(drawerItem.amount)}</p>
                <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">Tax:</b> {formatMoney(drawerItem.tax)}</p>
                <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">Invoice:</b> {drawerItem.invoice || "None"}</p>
              </div>
              <div>
                <h4 className="text-[11px] font-semibold text-[#4A5568] uppercase tracking-wide mb-2">Status & provider</h4>
                <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">Status:</b> <StatChip status={drawerItem.status} /></p>
                <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">Provider:</b> {drawerItem.provider}</p>
                <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">Method:</b> {drawerItem.method}</p>
                {drawerItem.failureCode && (
                  <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">Failure code:</b> <span className="text-[#B42318]">{drawerItem.failureCode.replace("_", " ")}</span></p>
                )}
                <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">Linked cases:</b> None</p>
              </div>
            </div>

            <Card title="Ledger entries" titleIcon={FileText}>
              <div className="px-5 pt-3 pb-4">
                <p className="text-[12px] text-[#4A5568]">Read-only ledger entries behind this payment. Amounts in paise.</p>
                <div className="overflow-x-auto mt-3">
                  <table className="w-full text-left text-[11px] border-collapse min-w-full">
                    <thead>
                      <tr className="border-b border-solid border-[#E5E1D8]">
                        {["Account", "Debit", "Credit", "Reference", "Created by"].map((h) => (
                          <th key={h} className="pb-2 text-[10px] text-[#4A5568] font-medium">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-solid divide-[#E5E1D8]/50">
                      <tr className="border-b border-solid border-[#E5E1D8]/50">
                        <td className="py-3 text-[11px] text-[#4A5568]">Cash (UPI Provider A)</td>
                        <td className="py-3 text-right text-[11px] text-[#4A5568] tabular-nums">{formatMoney(drawerItem.amount + drawerItem.tax)}</td>
                        <td className="py-3 text-right text-[11px] text-[#4A5568]">—</td>
                        <td className="py-3 text-right text-[10px] text-[#4A5568]">{drawerItem.id}</td>
                        <td className="py-3 text-right text-[10px] text-[#4A5568]">Provider webhook</td>
                      </tr>
                      <tr className="border-b border-solid border-[#E5E1D8]/50">
                        <td className="py-3 text-[11px] text-[#4A5568]">Receivables — {drawerItem.role}</td>
                        <td className="py-3 text-right text-[11px] text-[#4A5568]">—</td>
                        <td className="py-3 text-right text-[11px] text-[#4A5568] tabular-nums">{formatMoney(drawerItem.amount)}</td>
                        <td className="py-3 text-right text-[10px] text-[#4A5568]">{drawerItem.invoice || "—"}</td>
                        <td className="py-3 text-right text-[10px] text-[#4A5568]">Invoice service</td>
                      </tr>
                      <tr className="border-b border-solid border-[#E5E1D8]/50">
                        <td className="py-3 text-[11px] text-[#4A5568]">Tax payable — GST</td>
                        <td className="py-3 text-right text-[11px] text-[#4A5568]">—</td>
                        <td className="py-3 text-right text-[11px] text-[#4A5568] tabular-nums">{formatMoney(drawerItem.tax)}</td>
                        <td className="py-3 text-right text-[10px] text-[#4A5568]">Tax engine</td>
                        <td className="py-3 text-right text-[10px] text-[#4A5568]">Tax service</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </Card>

            <Card title="Action panel" titleIcon={Scale}>
              <div className="px-5 pt-3 pb-4 space-y-4">
                <p className="text-[12px] text-[#4A5568]">
                  Open the full payment page to view provider references, linked invoice and customer ticket,
                  and to request a refund. Each action requires a reason and is written to the audit log.
                </p>
                <div className="flex gap-2">
                  <Btn onClick={() => {
                    setDrawerOpen(false);
                    toast(`Opening ${drawerItem.id} full payment page`);
                  }} className="flex-1">
                    Open payment page
                  </Btn>
                  <Btn secondary onClick={() => {
                    setDrawerOpen(false);
                    toast(`${drawerItem.id}: closed`);
                  }} className="flex-1">
                    Close drawer
                  </Btn>
                </div>
                <div className="bg-[#F3EBDD] border border-solid border-[#F3EBDD] rounded-[10px] p-3">
                  <p className="text-[11px] text-[#806236] mb-2"><b className="text-[#806236]">Maker-checker:</b> Refunds and payouts need a different approver; large amounts need two approvers.</p>
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
export { AdminMoneyPage };
