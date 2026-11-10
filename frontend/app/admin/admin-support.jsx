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
    new: `border-[#E5E1D8] text-[#4A5568]`,
    open: `border-[#E8F0F8] bg-[#E8F0F8] text-[#2F5D8A]`,
    "waiting-for-requester": `border-[#FDF3E0] bg-[#FDF3E0] text-[#9A6210]`,
    "waiting-for-team": `border-[#F3EBDD] bg-[#F3EBDD] text-[#806236]`,
    "on-hold": `border-[#E5E1D8] text-[#4A5568]`,
    resolved: `border-[#E7F3EC] bg-[#E7F3EC] text-[#286749]`,
    closed: `border-[#E5E1D8] text-[#4A5568]`,
    spam: `border-[#E5E1D8] text-[#4A5568]`,
    urgent: `border-[#FBE9E7] bg-[#FBE9E7] text-[#B42318]`,
    high: `border-[#FDF3E0] bg-[#FDF3E0] text-[#9A6210]`,
    normal: `border-[#E5E1D8] text-[#4A5568]`,
    low: `border-[#E5E1D8] text-[#4A5568]`,
    "priority-plan": `border-[#F3EBDD] bg-[#F3EBDD] text-[#806236]`,
    onTrack: `border-[#E7F3EC] bg-[#E7F3EC] text-[#286749]`,
    atRisk: `border-[#FDF3E0] bg-[#FDF3E0] text-[#9A6210]`,
    breached: `border-[#FBE9E7] bg-[#FBE9E7] text-[#B42318]`,
    paused: `border-[#E5E1D8] text-[#4A5568]`,
    startup: `border-[#E5E1D8] text-[#4A5568]`,
    mentor: `border-[#E5E1D8] text-[#4A5568]`,
    investor: `border-[#E5E1D8] text-[#4A5568]`,
    "job-seeker": `border-[#E5E1D8] text-[#4A5568]`,
    employer: `border-[#E5E1D8] text-[#4A5568]`,
    visitor: `border-[#E5E1D8] text-[#4A5568]`,
    verified: `border-[#E7F3EC] bg-[#E7F3EC] text-[#286749]`,
    "needs-verification": `border-[#FDF3E0] bg-[#FDF3E0] text-[#9A6210]`,
    in_app: `border-[#E8F0F8] text-[#2F5D8A]`,
    email: `border-[#F3EBDD] text-[#806236]`,
    "public-form": `border-[#E5E1D8] text-[#4A5568]`,
    chat: `border-[#E8F0F8] text-[#2F5D8A]`,
    callback: `border-[#F3EBDD] text-[#806236]`,
    "staff-created": `border-[#E8F0F8] text-[#2F5D8A]`,
    category_startup_account: `border-[#E8F0F8] text-[#2F5D8A]`,
    category_security: `border-[#FBE9E7] text-[#B42318]`,
    category_verification: `border-[#F3EBDD] text-[#806236]`,
    category_payments_billing: `border-[#FDF3E0] text-[#9A6210]`,
    category_product_help: `border-[#E5E1D8] text-[#4A5568]`,
    category_hiring_applications: `border-[#E5E1D8] text-[#4A5568]`,
    category_mentor_sessions: `border-[#E5E1D8] text-[#4A5568]`,
    category_investor_data_rooms: `border-[#E5E1D8] text-[#4A5568]`,
    category_interview_trainer_ai: `border-[#F3EBDD] text-[#806236]`,
    category_safety_scams: `border-[#FBE9E7] text-[#B42318]`,
    category_privacy_data_rights: `border-[#E8F0F8] text-[#2F5D8A]`,
    category_billing_disputes: `border-[#FDF3E0] text-[#9A6210]`,
    category_feedback_feature_requests: `border-[#E5E1D8] text-[#4A5568]`,
    category_other: `border-[#E5E1D8] text-[#4A5568]`,
  };
  const label =
    status === "new" ? "New" :
    status === "open" ? "Open" :
    status === "waiting-for-requester" ? "Waiting for requester" :
    status === "waiting-for-team" ? "Waiting for team" :
    status === "on-hold" ? "On hold" :
    status === "resolved" ? "Resolved" :
    status === "closed" ? "Closed" :
    status === "spam" ? "Spam" :
    status === "urgent" ? "Urgent" :
    status === "high" ? "High" :
    status === "normal" ? "Normal" :
    status === "low" ? "Low" :
    status === "priority-plan" ? "Priority plan" :
    status === "onTrack" ? "On track" :
    status === "atRisk" ? "At risk" :
    status === "breached" ? "Breached" :
    status === "paused" ? "Paused" :
    status === "verified" ? "Verified requester" :
    status === "needs-verification" ? "Needs verification" :
    status === "in_app" ? "In-app" :
    status === "email" ? "Email" :
    status === "public-form" ? "Public form" :
    status === "chat" ? "Chat" :
    status === "callback" ? "Callback" :
    status === "staff-created" ? "Staff-created" :
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
/*  Mock support tickets data (Part A.9 data contract shape)          */
/* ------------------------------------------------------------------ */

const ticketTabs = [
  { key: "queue", label: "Queue" },
  { key: "mine", label: "Mine" },
  { key: "waiting-for-requester", label: "Waiting for requester" },
  { key: "escalated", label: "Escalated" },
  { key: "resolved", label: "Resolved" },
  { key: "spam", label: "Spam" },
];

const ticketStatuses = [
  { key: "all", label: "All statuses" },
  { key: "new", label: "New" },
  { key: "open", label: "Open" },
  { key: "waiting-for-requester", label: "Waiting for requester" },
  { key: "waiting-for-team", label: "Waiting for team" },
  { key: "on-hold", label: "On hold" },
  { key: "resolved", label: "Resolved" },
  { key: "closed", label: "Closed" },
];

const ticketPriorities = [
  { key: "all", label: "All priorities" },
  { key: "urgent", label: "Urgent" },
  { key: "high", label: "High" },
  { key: "normal", label: "Normal" },
  { key: "low", label: "Low" },
  { key: "priority-plan", label: "Priority plan" },
];

const ticketChannels = [
  { key: "all", label: "All channels" },
  { key: "in_app", label: "In-app" },
  { key: "email", label: "Email" },
  { key: "public-form", label: "Public form" },
  { key: "chat", label: "Chat" },
  { key: "callback", label: "Callback" },
];

const ticketCategories = [
  { key: "all", label: "All categories" },
  { key: "category_startup_account", label: "Startup & account" },
  { key: "category_security", label: "Security" },
  { key: "category_verification", label: "Verification" },
  { key: "category_payments_billing", label: "Payments & billing" },
  { key: "category_product_help", label: "Product help" },
  { key: "category_hiring_applications", label: "Hiring & applications" },
  { key: "category_mentor_sessions", label: "Mentor sessions" },
  { key: "category_investor_data_rooms", label: "Investor data rooms" },
  { key: "category_interview_trainer_ai", label: "Interview trainer & AI" },
  { key: "category_safety_scams", label: "Safety & scams" },
  { key: "category_privacy_data_rights", label: "Privacy & data rights" },
  { key: "category_billing_disputes", label: "Billing disputes" },
  { key: "category_feedback_feature_requests", label: "Feedback & feature requests" },
  { key: "category_other", label: "Other" },
];

const channelIcons = {
  in_app: MessageCircle,
  email: Mail,
  "public-form": Globe,
  chat: Headphones,
  callback: Phone,
  "staff-created": User2,
};

const tickets = [
  {
    id: "TCK-2026-048210",
    channel: "in_app",
    subject: "Payment failed twice but amount debited",
    requester: { role: "employer", displayName: "P••• K••••", verified: true },
    category: "category_payments_billing",
    categoryLabel: "Payments & billing",
    priority: "high",
    priorityPlan: true,
    status: "open",
    sla: { state: "at_risk", targetAt: "2026-11-06T15:30:00+05:30", paused: false },
    assignedTo: null,
    lock: null,
    linked: [{ kind: "invoice", id: "inv_5531" }],
    updatedAt: "2026-11-06T13:52:00+05:30",
    lastReplyBy: "requester",
    firstMessage: "I tried to pay for a job posting and the payment failed twice, but my bank shows the amount was debited both times. Can you help?",
    historyCount: 4,
  },
  {
    id: "TCK-2026-048211",
    channel: "email",
    subject: "Can't sign in to my account after phone change",
    requester: { role: "job-seeker", displayName: "R••• S•••", verified: false },
    category: "category_startup_account",
    categoryLabel: "Getting started & account",
    priority: "urgent",
    priorityPlan: false,
    status: "new",
    sla: { state: "breached", targetAt: "2026-11-06T12:00:00+05:30", paused: false },
    assignedTo: null,
    lock: null,
    linked: [],
    updatedAt: "2026-11-06T11:15:00+05:30",
    lastReplyBy: "requester",
    firstMessage: "I changed my phone number yesterday and now I can't sign in. The verification code goes to my old number which I no longer have.",
    historyCount: 2,
  },
  {
    id: "TCK-2026-048212",
    channel: "in_app",
    subject: "Verification status not updated after document upload",
    requester: { role: "employer", displayName: "A••• P••••", verified: true },
    category: "category_verification",
    categoryLabel: "Verification",
    priority: "normal",
    priorityPlan: false,
    status: "waiting-for-requester",
    sla: { state: "paused", targetAt: "2026-11-07T14:00:00+05:30", paused: true },
    assignedTo: "Alex Kumar",
    lock: { by: "Alex Kumar", expiresAt: "2026-11-06T14:50:00+05:30" },
    linked: [{ kind: "document", id: "doc_7742" }],
    updatedAt: "2026-11-06T10:30:00+05:30",
    lastReplyBy: "staff",
    firstMessage: "I uploaded my incorporation documents two days ago but my verification status still shows pending. Please update it.",
    historyCount: 6,
  },
  {
    id: "TCK-2026-048213",
    channel: "in_app",
    subject: "Suspicious job post asking for upfront payment",
    requester: { role: "job-seeker", displayName: "M••• D•••", verified: true },
    category: "category_safety_scams",
    categoryLabel: "Safety & scams",
    priority: "urgent",
    priorityPlan: false,
    status: "escalated",
    sla: { state: "breached", targetAt: "2026-11-06T10:00:00+05:30", paused: false },
    assignedTo: "Trust & safety on-call",
    lock: { by: "Trust & safety on-call", expiresAt: "2026-11-06T11:00:00+05:30" },
    linked: [{ kind: "job", id: "job_9912" }],
    updatedAt: "2026-11-06T09:45:00+05:30",
    lastReplyBy: "staff",
    firstMessage: "This job post asks candidates to pay a registration fee before starting work. I think it's a scam.",
    historyCount: 8,
  },
  {
    id: "TCK-2026-048214",
    channel: "public-form",
    subject: "How do I create a practice interview?",
    requester: { role: "visitor", displayName: "Visitor", verified: false },
    category: "category_product_help",
    categoryLabel: "Product help",
    priority: "low",
    priorityPlan: false,
    status: "new",
    sla: { state: "on_track", targetAt: "2026-11-09T10:00:00+05:30", paused: false },
    assignedTo: null,
    lock: null,
    linked: [],
    updatedAt: "2026-11-06T08:20:00+05:30",
    lastReplyBy: "requester",
    firstMessage: "I'm new to the platform. How do I set up a practice interview session?",
    historyCount: 1,
  },
  {
    id: "TCK-2026-048215",
    channel: "in_app",
    subject: "Invoice not received for last month",
    requester: { role: "employer", displayName: "S••• R•••", verified: true },
    category: "category_payments_billing",
    categoryLabel: "Payments & billing",
    priority: "high",
    priorityPlan: true,
    status: "open",
    sla: { state: "at_risk", targetAt: "2026-11-06T16:30:00+05:30", paused: false },
    assignedTo: null,
    lock: null,
    linked: [{ kind: "invoice", id: "inv_6621" }],
    updatedAt: "2026-11-06T14:10:00+05:30",
    lastReplyBy: "requester",
    firstMessage: "I haven't received my monthly invoice. I need it for my accounting records. Can you resend it?",
    historyCount: 3,
  },
  {
    id: "TCK-2026-048216",
    channel: "chat",
    subject: "Offer letter not showing in dashboard",
    requester: { role: "job-seeker", displayName: "K••• L•••", verified: true },
    category: "category_hiring_applications",
    categoryLabel: "Hiring & applications",
    priority: "normal",
    priorityPlan: false,
    status: "waiting-for-team",
    sla: { state: "on_track", targetAt: "2026-11-07T10:00:00+05:30", paused: false },
    assignedTo: null,
    lock: null,
    linked: [{ kind: "offer", id: "offer_4419" }],
    updatedAt: "2026-11-06T12:00:00+05:30",
    lastReplyBy: "staff",
    firstMessage: "I accepted an offer but it's not showing in my dashboard. Can someone look into this?",
    historyCount: 5,
  },
  {
    id: "TCK-2026-048217",
    channel: "in_app",
    subject: "Data access request under DPDP Act",
    requester: { role: "job-seeker", displayName: "V••• A•••", verified: true },
    category: "category_privacy_data_rights",
    categoryLabel: "Privacy & data rights",
    priority: "high",
    priorityPlan: false,
    status: "new",
    sla: { state: "at_risk", targetAt: "2026-11-13T10:00:00+05:30", paused: false },
    assignedTo: null,
    lock: null,
    linked: [],
    updatedAt: "2026-11-06T10:00:00+05:30",
    lastReplyBy: "requester",
    firstMessage: "I'd like to access all my personal data held by the platform under the DPDP Act.",
    historyCount: 2,
  },
  {
    id: "TCK-2026-048218",
    channel: "email",
    subject: "Mentor session payout missing",
    requester: { role: "mentor", displayName: "J••• P•••", verified: true },
    category: "category_payments_billing",
    categoryLabel: "Payments & billing",
    priority: "high",
    priorityPlan: false,
    status: "open",
    sla: { state: "at_risk", targetAt: "2026-11-06T17:00:00+05:30", paused: false },
    assignedTo: null,
    lock: null,
    linked: [{ kind: "invoice", id: "inv_5589" }],
    updatedAt: "2026-11-06T11:45:00+05:30",
    lastReplyBy: "requester",
    firstMessage: "I completed a mentor session last week but the payout hasn't been credited to my account.",
    historyCount: 4,
  },
  {
    id: "TCK-2026-048219",
    channel: "in_app",
    subject: "Interview score seems wrong",
    requester: { role: "job-seeker", displayName: "A••• S•••", verified: true },
    category: "category_interview_trainer_ai",
    categoryLabel: "Interview trainer & AI",
    priority: "normal",
    priorityPlan: false,
    status: "new",
    sla: { state: "on_track", targetAt: "2026-11-09T10:00:00+05:30", paused: false },
    assignedTo: null,
    lock: null,
    linked: [],
    updatedAt: "2026-11-06T09:00:00+05:30",
    lastReplyBy: "requester",
    firstMessage: "My interview practice score dropped after the last session even though I answered better. Can someone review this?",
    historyCount: 1,
  },
  {
    id: "TCK-2026-048220",
    channel: "callback",
    subject: "Account compromised - suspicious login",
    requester: { role: "employer", displayName: "T••• M•••", verified: true },
    category: "category_security",
    categoryLabel: "Security",
    priority: "urgent",
    priorityPlan: true,
    status: "escalated",
    sla: { state: "breached", targetAt: "2026-11-06T08:00:00+05:30", paused: false },
    assignedTo: "Security on-call",
    lock: { by: "Security on-call", expiresAt: "2026-11-06T09:00:00+05:30" },
    linked: [],
    updatedAt: "2026-11-06T07:30:00+05:30",
    lastReplyBy: "staff",
    firstMessage: "I received a login alert from a location I don't recognize. My account may be compromised.",
    historyCount: 10,
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
  ["Data requests", FileIcon, "/admin/data-requests"],
  ["Users", UserRound, "/admin/users"],
  ["Organizations", BuildingIcon, "/admin/organizations"],
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

function SupportStatCard({ label, value, sub, color = INK }) {
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
      {ticketTabs.map((t) => (
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

function StatusFilter({ active, onChange }) {
  return (
    <div className="flex gap-2 overflow-x-auto mb-3 pb-1 border-b border-solid border-[#E5E1D8]">
      {ticketStatuses.map((s) => (
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

function TicketRow({ t, onClaim, onOpen, onPreview }) {
  const channelIcon = channelIcons[t.channel] || MessageCircle;
  const slaTint =
    t.sla.state === "breached" ? `border-[#FBE9E7] bg-[#FBE9E7] text-[#B42318]` :
    t.sla.state === "at_risk" ? `border-[#FDF3E0] bg-[#FDF3E0] text-[#9A6210]` :
    t.sla.state === "paused" ? `border-[#E5E1D8] text-[#4A5568]` :
    `border-[#E7F3EC] bg-[#E7F3EC] text-[#286749]`;
  const claimed = t.status === "in-review" || t.status === "open" && t.assignedTo && t.lock;
  const isClaimed = t.status !== "new" && t.assignedTo && t.lock;
  const categoryChipKey = t.category || "category_other";
  const roleKey = t.requester.role;
  return (
    <tr
      key={t.id}
      className="hover:bg-[#F3EBDD]/50 transition border-b border-solid border-[#E5E1D8]/50 last:border-0 group cursor-pointer"
      onClick={() => onPreview(t.id)}
    >
      <td className="py-4">
        <div className="flex items-center gap-3">
          <div className="grid h-8 w-8 place-items-center rounded-[10px] bg-[#F3EBDD] text-[#806236] text-xs font-bold">
            <channelIcon size={14} />
          </div>
          <div>
            <b className="text-[12px] text-[#0F1B2D] font-medium tabular-nums">{t.id}</b>
          </div>
        </div>
      </td>
      <td className="py-4 text-[12px] text-[#4A5568]">
        <b className="text-[#0F1B2D]">{t.subject}</b>
      </td>
      <td className="py-4 text-[12px] text-[#4A5568]">
        <StatChip status={roleKey} />
        <span className="text-[10px] text-[#4A5568] block mt-0.5">{t.requester.displayName}</span>
        {t.requester.verified && <StatChip status="verified" className="mt-1" />}
      </td>
      <td className="py-4 text-[12px] text-[#4A5568]">
        <StatChip status={categoryChipKey} className="text-[10px]" />
      </td>
      <td className="py-4 text-right text-[12px]">
        <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium ${t.priority === "urgent" ? `border-[#FBE9E7] bg-[#FBE9E7] text-[#B42318]` : t.priority === "high" ? `border-[#FDF3E0] bg-[#FDF3E0] text-[#9A6210]` : t.priority === "priority-plan" ? `border-[#F3EBDD] bg-[#F3EBDD] text-[#806236]` : `border-[#E5E1D8] text-[#4A5568]`}`}>
          {t.priority.charAt(0).toUpperCase() + t.priority.slice(1).replace("-", " ")}
          {t.priorityPlan && <span className="ml-1 text-[8px] font-bold">Priority plan</span>}
        </span>
      </td>
      <td className="py-4 text-right text-[10px] text-[#4A5568]">
        {t.linked.length > 0 ? (
          <div className="flex items-center justify-end gap-1">
            {t.linked.map((l, i) => (
              <span key={i} className="text-[10px] text-[#0F1B2D] font-medium">{l.kind.charAt(0).toUpperCase()}</span>
            ))}
          </div>
        ) : (
          <span className="text-[#A0A7B4]">—</span>
        )}
      </td>
      <td className="py-4 text-right">
        <StatChip status={t.status} />
      </td>
      <td className="py-4 text-right">
        <div>
          <StatChip status={t.sla.state === "on_track" ? "onTrack" : t.sla.state === "at_risk" ? "atRisk" : t.sla.state === "breached" ? "breached" : "paused"} />
          <p className="text-[10px] text-[#4A5568] mt-0.5">
            {t.sla.state === "breached" ? "Past target" : t.sla.state === "at_risk" ? "Due soon" : t.sla.state === "paused" ? "Paused" : "On track"}
          </p>
        </div>
      </td>
      <td className="py-4 text-right text-[10px] text-[#4A5568]">
        {isClaimed ? (
          <span className="text-[11px] text-[#4A5568]">Being handled</span>
        ) : t.assignedTo ? (
          <span className="text-[11px] text-[#4A5568]">{t.assignedTo}</span>
        ) : (
          <span className="text-[#A0A7B4]">Unassigned</span>
        )}
      </td>
      <td className="py-4 text-right text-[10px] text-[#4A5568]">
        {relativeTime(t.updatedAt)}
        <br />
        <span className="text-[9px] text-[#4A5568]">{t.lastReplyBy === "staff" ? "staff" : "requester"} replied</span>
      </td>
      <td className="py-4 text-right">
        {t.status === "new" && !t.lock ? (
          <Btn size="small" secondary onClick={(e) => { e.stopPropagation(); onClaim(t.id); }} className="px-2.5 py-1.5 min-w-[64px]">
            Claim
          </Btn>
        ) : (
          <Btn size="small" secondary onClick={(e) => { e.stopPropagation(); onOpen(t.id); }} className="px-2.5 py-1.5 min-w-[64px]">
            Open
          </Btn>
        )}
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
/*  Page: Support Tickets (/support)                                  */
/* ------------------------------------------------------------------ */
function AdminSupportPage() {
  const [refreshing, setRefreshing] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerItem, setDrawerItem] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata", hour12: false }));
  const [activeTab, setActiveTab] = useState("queue");
  const [activeStatus, setActiveStatus] = useState("all");
  const [activePriority, setActivePriority] = useState("all");
  const [activeChannel, setActiveChannel] = useState("all");
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("priority");
  const [density, setDensity] = useState("comfortable");
  const [showSavedViews, setShowSavedViews] = useState(false);

  const filtered = useMemo(() => {
    return tickets.filter((t) => {
      if (activeTab === "mine" && t.assignedTo !== user.name && !(t.lock && t.lock.by === user.name)) return false;
      if (activeTab === "waiting-for-requester" && t.status !== "waiting-for-requester") return false;
      if (activeTab === "escalated" && t.status !== "escalated") return false;
      if (activeTab === "resolved" && t.status !== "resolved") return false;
      if (activeTab === "spam" && t.status !== "spam") return false;
      if (activeTab === "queue" && (t.status === "resolved" || t.status === "spam")) return false;
      if (activeStatus !== "all" && t.status !== activeStatus) return false;
      if (activePriority !== "all" && t.priority !== activePriority) return false;
      if (activeChannel !== "all" && t.channel !== activeChannel) return false;
      if (activeCategory !== "all" && t.category !== activeCategory) return false;
      if (searchQuery && !t.id.toLowerCase().includes(searchQuery.toLowerCase()) && !t.subject.toLowerCase().includes(searchQuery.toLowerCase()) && !t.requester.displayName.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });
  }, [activeTab, activeStatus, activePriority, activeChannel, activeCategory, searchQuery]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      if (sortBy === "priority") {
        const priOrder = { urgent: 4, high: 3, normal: 2, low: 1, "priority-plan": 3 };
        const slaOrder = { breached: 3, at_risk: 2, paused: 1, on_track: 0 };
        const pa = priOrder[a.priority] || 0;
        const pb = priOrder[b.priority] || 0;
        if (pa !== pb) return pb - pa;
        const sa = slaOrder[a.sla.state] || 0;
        const sb = slaOrder[b.sla.state] || 0;
        if (sa !== sb) return sb - sa;
        return new Date(a.updatedAt) - new Date(b.updatedAt);
      }
      if (sortBy === "oldest") return new Date(a.createdAt || a.updatedAt) - new Date(b.createdAt || b.updatedAt);
      if (sortBy === "updated") return new Date(b.updatedAt) - new Date(a.updatedAt);
      return 0;
    });
  }, [filtered, sortBy]);

  const stats = useMemo(() => {
    const waiting = tickets.filter((t) => t.status === "new" || t.status === "open").length;
    const urgentOpen = tickets.filter((t) => t.priority === "urgent" && (t.status === "new" || t.status === "open")).length;
    const atRiskOrBreached = tickets.filter((t) => t.sla.state === "at_risk" || t.sla.state === "breached").length;
    return { waiting, urgentOpen, atRiskOrBreached };
  }, [tickets]);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    const t = setTimeout(() => {
      setRefreshing(false);
      setLastUpdated(new Date().toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata", hour12: false }));
      toast("Support queue refreshed");
    }, 800);
    return () => clearTimeout(t);
  }, []);

  const handleClaim = useCallback((id) => {
    const t = tickets.find((x) => x.id === id);
    if (t && t.status === "new") {
      toast(`Claimed ${id} — lock active for 10 minutes`);
    }
  }, []);

  const handleOpen = useCallback((id) => {
    toast(`Opening ${id} ticket detail`);
  }, []);

  const handlePreview = useCallback((id) => {
    const t = tickets.find((x) => x.id === id);
    if (t) {
      setDrawerItem(t);
      setDrawerOpen(true);
    }
  }, []);

  const handleNextTicket = useCallback(() => {
    const next = sorted.find((t) => t.status === "new");
    if (next) {
      setDrawerItem(next);
      setDrawerOpen(true);
      toast(`Claimed ${next.id} — lock active for 10 minutes`);
    } else {
      toast("No eligible tickets to claim");
    }
  }, [sorted]);

  const handleRelease = useCallback(() => {
    if (!drawerItem) return;
    setDrawerOpen(false);
    toast(`Released ${drawerItem.id} — returned to queue`);
  }, [drawerItem]);

  const handleSearch = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#0F1B2D]">
      <a href="#support-main" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 bg-[#0F1B2D] text-white px-4 py-2">
        Skip to content
      </a>

      <EnvironmentStrip />
      {IncidentBanner()}
      <TopBar onRefresh={handleRefresh} />

      <div className="flex flex-col lg:flex-row" id="support-main">
        <AdminSidebar active="Support" />

        <main className="flex-1 min-w-0 pt-6 lg:pt-8 lg:pl-[232px] lg:px-8 pb-24">
          {/* Title bar */}
          <div className="flex items-center justify-between mb-6 border-b border-solid border-[#E5E1D8] pb-4">
            <div>
              <h1 className="text-[28px] font-serif font-semibold">Support</h1>
              <p className="text-[12px] text-[#4A5568] mt-1">
                Every ticket from every role, ordered by urgency and deadline
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Btn size="small" secondary icon={Menu} onClick={() => setShowSavedViews(!showSavedViews)} title="Saved views" />
              {showSavedViews && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-solid border-[#E5E1D8] rounded-[10px] shadow-lg p-3 z-30">
                  <p className="text-[10px] font-semibold text-[#4A5568] mb-2 uppercase tracking-wide">Saved views</p>
                  <Btn size="small" secondary className="w-full text-left text-[11px]" onClick={() => { setShowSavedViews(false); toast("Loading 'Urgent unassigned'"); }}>
                    Urgent unassigned
                  </Btn>
                  <Btn size="small" secondary className="w-full text-left text-[11px]" onClick={() => { setShowSavedViews(false); toast("Loading 'Payments waiting over 1 day'"); }}>
                    Payments waiting over 1 day
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

          {/* Status filter */}
          <StatusFilter active={activeStatus} onChange={setActiveStatus} />

          {/* Summary strip */}
          <div className="grid gap-4 lg:grid-cols-4 mb-6">
            <SupportStatCard label="Waiting" value={stats.waiting} sub="Tickets awaiting first response" color={INK} />
            <SupportStatCard label="Urgent open" value={stats.urgentOpen} sub={stats.urgentOpen > 0 ? "Error tint — safety first" : "None"} color={ERROR} />
            <SupportStatCard label="At risk or breached" value={stats.atRiskOrBreached} sub="Over or nearing SLA target" color={WARNING} />
            <SupportStatCard label="Median first response (7 days)" value="2 h 40 min" sub="Aggregate across all channels" color={INFO} />
          </div>

          {/* Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 border-b border-solid border-[#E5E1D8] pb-3">
            <div className="flex items-center gap-3">
              <div className="relative w-64">
                <Search className="absolute left-3 top-2.5 text-[#4A5568]" size={16} />
                <input
                  type="search"
                  placeholder="Search by ticket ID, subject or requester"
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
                <option value="priority">Sort: Priority → SLA → updated</option>
                <option value="oldest">Sort: Oldest first</option>
                <option value="updated">Sort: Recently updated</option>
              </select>
              <Btn size="small" secondary icon={LayoutGrid} onClick={() => setDensity(density === "comfortable" ? "compact" : "comfortable")} title="Toggle density" />
            </div>
            <Btn onClick={handleNextTicket} icon={ArrowRight} className="ml-auto">
              Next ticket
            </Btn>
          </div>

          {/* Ticket table */}
          <Card title="Ticket queue" titleIcon={MessageCircle}>
            <div className="px-5 pt-3 pb-4 overflow-x-auto">
              <table className="w-full text-left text-[12px] border-collapse min-w-full">
                <thead>
                  <tr className="border-b border-solid border-[#E5E1D8]">
                    {["Ticket", "Subject", "Requester", "Category", "Priority", "Related", "Status", "SLA", "Assigned", "Updated", "Actions"].map((h) => (
                      <th key={h} className="pb-3 text-[11px] text-[#4A5568] font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-solid divide-[#E5E1D8]/50">
                  {sorted.length === 0 ? (
                    <tr>
                      <td colSpan={11} className="py-12 text-center text-[12px] text-[#4A5568]">
                        <Inbox size={24} className="mx-auto mb-3 text-[#4A5568]" />
                        <p className="text-[12px] font-medium text-[#0F1B2D]">No tickets match your filters.</p>
                        <Btn size="small" secondary onClick={() => { setActiveStatus("all"); setActivePriority("all"); setActiveChannel("all"); setActiveCategory("all"); setSearchQuery(""); }} className="mt-3">
                          Clear filters
                        </Btn>
                      </td>
                    </tr>
                  ) : (
                    sorted.map((t) => (
                      <TicketRow key={t.id} t={t} onClaim={handleClaim} onOpen={handleOpen} onPreview={handlePreview} />
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <div className="px-5 pt-3 pb-4 flex items-center justify-between">
              <p className="text-[11px] text-[#4A5568]">
                Showing {sorted.length} of {tickets.length} tickets
              </p>
              <div className="flex items-center gap-2">
                <Btn size="small" secondary className="px-2 py-1.5" icon={LayoutGrid} title="Grid view" />
                <Btn size="small" secondary className="px-2 py-1.5" icon={LayoutList} title="List view" />
              </div>
            </div>
          </Card>

          <div className="mt-8 px-5 lg:px-0 text-center lg:text-left">
            <p className="text-[11px] text-[#4A5568]">
              Ticket IDs, subjects, categories and SLAs only. No message bodies, emails or phone numbers on this page.
              Sensitive patterns are auto-masked. All actions are logged to the audit trail.
            </p>
          </div>
        </main>
      </div>

      {/* Ticket preview drawer */}
      {drawerOpen && drawerItem && (
        <DetailDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title={`Ticket preview: ${drawerItem.id}`}>
          <div className="space-y-5">
            <div className="grid gap-4 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <h4 className="text-[11px] font-semibold text-[#4A5568] uppercase tracking-wide mb-2">Ticket details</h4>
                <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">Ticket ID:</b> {drawerItem.id}</p>
                <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">Subject:</b> {drawerItem.subject}</p>
                <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">Channel:</b> <StatChip status={drawerItem.channel} /></p>
                <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">Requester:</b> {drawerItem.requester.displayName} ({drawerItem.requester.role})</p>
                <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">Verified:</b> {drawerItem.requester.verified ? "Verified requester" : "Needs verification"}</p>
                <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">Category:</b> {drawerItem.categoryLabel}</p>
                <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">Updated:</b> {drawerItem.updatedAt}</p>
              </div>
              <div>
                <h4 className="text-[11px] font-semibold text-[#4A5568] uppercase tracking-wide mb-2">Priority & SLA</h4>
                <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">Priority:</b> {drawerItem.priority.charAt(0).toUpperCase() + drawerItem.priority.slice(1)}{drawerItem.priorityPlan ? " · Priority plan" : ""}</p>
                <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">SLA:</b> <StatChip status={drawerItem.sla.state === "on_track" ? "onTrack" : drawerItem.sla.state === "at_risk" ? "atRisk" : drawerItem.sla.state === "breached" ? "breached" : "paused"} /></p>
                <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">Status:</b> <StatChip status={drawerItem.status} /></p>
                <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">Assigned:</b> {drawerItem.assignedTo || "Unassigned"}</p>
                <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">Linked records:</b> {drawerItem.linked.length > 0 ? drawerItem.linked.map((l) => `${l.kind} ${l.id}`).join(", ") : "None"}</p>
                <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">History:</b> {drawerItem.historyCount} prior interaction{drawerItem.historyCount !== 1 ? "s" : ""}</p>
              </div>
            </div>

            <Card title="First message" titleIcon={MessageCircle}>
              <div className="px-5 pt-3 pb-4">
                <p className="text-[12px] text-[#4A5568]">{drawerItem.firstMessage}</p>
                {drawerItem.firstMessage.includes("payment") || drawerItem.firstMessage.includes("debited") && (
                  <div className="bg-[#FBE9E7] border border-solid border-[#FBE9E7] rounded-[10px] p-3 mt-3">
                    <p className="text-[11px] text-[#B42318] mb-1"><b className="text-[#B42318]">Sensitive data detected:</b> Payment-related content masked in queue view. Full message visible on ticket detail page.</p>
                  </div>
                )}
              </div>
            </Card>

            <Card title="Suggested macro" titleIcon={ClipboardList}>
              <div className="px-5 pt-3 pb-4 space-y-3">
                <p className="text-[12px] text-[#4A5568] mb-1">Macro: <b className="text-[#0F1B2D]">"Acknowledge and request details"</b></p>
                <p className="text-[12px] text-[#4A5568]">Hi {drawerItem.requester.displayName}, thank you for contacting support. We've received your request about {drawerItem.subject.toLowerCase()}. Our team is looking into this and will get back to you within our SLA target.</p>
                <div className="bg-[#F3EBDD] border border-solid border-[#F3EBDD] rounded-[10px] p-3">
                  <p className="text-[11px] text-[#806236] mb-2"><b className="text-[#806236]">AI suggestion:</b> This macro matches tickets mentioning payment and billing topics. Edit before sending — suggestions never send on their own.</p>
                </div>
              </div>
            </Card>

            <Card title="Action panel" titleIcon={Scale}>
              <div className="px-5 pt-3 pb-4 space-y-4">
                <p className="text-[12px] text-[#4A5568]">
                  Open the ticket to view the full conversation, requester context, linked records and internal notes.
                  Each action requires a reason and is written to the audit log.
                </p>
                <div className="flex gap-2">
                  {!drawerItem.lock || drawerItem.lock.by === user.name ? (
                    <>
                      <Btn onClick={() => {
                        setDrawerOpen(false);
                        toast(`Opening ${drawerItem.id} for review`);
                      }} className="flex-1">
                        Open ticket
                      </Btn>
                      <Btn secondary onClick={() => {
                        setDrawerOpen(false);
                        toast(`${drawerItem.id}: claim released`);
                      }} className="flex-1">
                        Release claim
                      </Btn>
                    </>
                  ) : (
                    <Btn size="small" secondary disabled className="flex-1">
                      Being handled by {drawerItem.lock?.by}
                    </Btn>
                  )}
                  <Btn secondary onClick={() => {
                    setDrawerOpen(false);
                    toast(`Escalating ${drawerItem.id} to specialist team`);
                  }} className="flex-1">
                    Escalate
                  </Btn>
                </div>
                <div className="bg-[#F3EBDD] border border-solid border-[#F3EBDD] rounded-[10px] p-3">
                  <p className="text-[11px] text-[#806236] mb-2"><b className="text-[#806236]">Note:</b> Claims expire after 10 minutes of inactivity. Urgent safety, scam and payment tickets route to on-call immediately.</p>
                </div>
              </div>
            </Card>

            <div className="flex gap-2 pt-4">
              <Btn onClick={() => setDrawerOpen(false)} className="flex-1">
                Close preview
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
export { AdminSupportPage };
