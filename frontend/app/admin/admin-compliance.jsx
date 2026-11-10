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
  HardDrive,
  Scissors,
  Gavel,
  MapPin,
  Building2,
  Lock as LockIcon,
  Users as UsersIcon,
  Briefcase as Briefcase4Icon,
} from "lucide-react";

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

const user = {
  name: "Alex Kumar",
  internalRole: "Compliance officer",
  internalRoles: ["Compliance officer", "Data protection officer"],
  sessionExpiresAt: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(),
  idleTimeoutAt: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
};

const environment = "production";

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
    "open-obligations": `border-[#E8F0F8] text-[#2F5D8A]`,
    "overdue-items": `border-[#FBE9E7] text-[#B42318]`,
    "incidents-open": `border-[#FBE9E7] text-[#B42318]`,
    "requests-in-progress": `border-[#FDF3E0] text-[#9A6210]`,
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
    status === "open-obligations" ? "Open obligations" :
    status === "overdue-items" ? "Overdue items" :
    status === "incidents-open" ? "Incidents open" :
    status === "requests-in-progress" ? "Requests in progress" :
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

const complianceTabs = [
  { key: "overview", label: "Overview" },
  { key: "processing-records", label: "Processing records" },
  { key: "retention-and-deletion", label: "Retention and deletion" },
  { key: "legal-holds", label: "Legal holds" },
  { key: "incidents-and-breaches", label: "Incidents and breaches" },
  { key: "requests", label: "Requests (regulators & law enforcement)" },
  { key: "vendors-and-transfers", label: "Vendors and transfers" },
  { key: "consent-and-notices", label: "Consent and notices" },
  { key: "risk-and-dpias", label: "Risk and DPIAs" },
  { key: "policies-and-training", label: "Policies and training" },
  { key: "reports-and-exports", label: "Reports and exports" },
  { key: "calendar", label: "Calendar" },
];

const rangeFilters = [
  { key: "7-days", label: "Last 7 days" },
  { key: "30-days", label: "Last 30 days" },
  { key: "90-days", label: "Last 90 days" },
  { key: "this-quarter", label: "This quarter" },
  { key: "this-year", label: "This financial year" },
  { key: "custom", label: "Custom range" },
];

const summaryStrip = [
  { label: "Open obligations", value: "23", status: "open-obligations", sub: "Across all compliance areas" },
  { label: "Overdue items", value: "2", status: "overdue-items", sub: "Escalate within 24 hours" },
  { label: "Incidents open", value: "3", status: "incidents-open", sub: "1 notifiable — clock running" },
  { label: "Requests in progress", value: "4", status: "requests-in-progress", sub: "Regulator & law enforcement" },
];

const postureAreas = [
  {
    id: "data-rights",
    area: "Data rights",
    status: "on-track",
    statusLabel: "On track",
    owner: "Data protection officer",
    nextDeadline: "Requests due in 7 days",
    lastReview: "2 Nov 2026",
    evidence: "On-time completion rate (90 days), extensions used, refusals with reasons",
  },
  {
    id: "retention-and-deletion",
    area: "Retention and deletion",
    status: "needs-attention",
    statusLabel: "Needs attention",
    owner: "Data steward",
    nextDeadline: "Weekly retention job",
    lastReview: "30 Oct 2026",
    evidence: "Jobs run on schedule, failures, backlog, backup overwrite status",
  },
  {
    id: "consent-and-notices",
    area: "Consent and notices",
    status: "on-track",
    statusLabel: "On track",
    owner: "Compliance officer",
    nextDeadline: "Notice version review",
    lastReview: "15 Oct 2026",
    evidence: "Current versions, acceptance rates, withdrawn consents",
  },
  {
    id: "security-and-incidents",
    area: "Security and incidents",
    status: "overdue",
    statusLabel: "Overdue",
    owner: "Security administrator",
    nextDeadline: "Breach clock — 48h left",
    lastReview: "2 Nov 2026",
    evidence: "Open incidents, time to contain, notifications due",
  },
  {
    id: "vendors",
    area: "Vendors",
    status: "on-track",
    statusLabel: "On track",
    owner: "Vendor manager",
    nextDeadline: "Assessment due — 14 days",
    lastReview: "10 Oct 2026",
    evidence: "Vendors without current data-processing terms, sub-processor changes",
  },
  {
    id: "kyc-and-aml",
    area: "KYC and AML",
    status: "on-track",
    statusLabel: "On track",
    owner: "Compliance officer",
    nextDeadline: "Re-verification wave",
    lastReview: "1 Nov 2026",
    evidence: "Verification backlog and times, screening alert handling",
  },
  {
    id: "securities-related-features",
    area: "Securities-related features",
    status: "needs-attention",
    statusLabel: "Needs attention",
    owner: "Legal counsel",
    nextDeadline: "Investor module review",
    lastReview: "20 Sep 2026",
    evidence: "Legal review status, event approvals, disclaimers current",
  },
  {
    id: "trust-and-safety",
    area: "Trust and safety obligations",
    status: "on-track",
    statusLabel: "On track",
    owner: "Trust and safety lead",
    nextDeadline: "Grievance SLA review",
    lastReview: "25 Oct 2026",
    evidence: "Grievance response times, report acknowledgment times",
  },
  {
    id: "ai-governance",
    area: "AI governance",
    status: "under-review",
    statusLabel: "Under review",
    owner: "AI quality lead",
    nextDeadline: "Rubric audit",
    lastReview: "5 Oct 2026",
    evidence: "Review turnaround, bias test status, model registry reviews",
  },
  {
    id: "accessibility",
    area: "Accessibility and consumer protection",
    status: "on-track",
    statusLabel: "On track",
    owner: "Product counsel",
    nextDeadline: "Audit item closure",
    lastReview: "12 Oct 2026",
    evidence: "Open items from audits (Content and Billing)",
  },
];

const processingRecords = [
  { id: "PA-001", activity: "Verification of investors", purpose: "KYC / AML and securities review", legalBasis: "Legal obligation", subjects: "Investors", recipients: "Compliance, security", retention: "5 years", region: "India", status: "certified" },
  { id: "PA-002", activity: "Interview practice scoring", purpose: "AI interview trainer feedback", legalBasis: "Consent", subjects: "Candidates", recipients: "AI provider, product", retention: "24 months", region: "India", status: "certified" },
  { id: "PA-003", activity: "Mentor payouts", purpose: "Mentor honorarium disbursement", legalBasis: "Contract", subjects: "Mentors", recipients: "Finance, payments provider", retention: "7 years", region: "India", status: "certified" },
  { id: "PA-004", activity: "Job application handling", purpose: "Employer hiring workflow", legalBasis: "Contract", subjects: "Candidates", recipients: "Employers", retention: "36 months", region: "India", status: "certified" },
  { id: "PA-005", activity: "Support tickets", purpose: "User support and dispute resolution", legalBasis: "Legitimate interest", subjects: "All users", recipients: "Support", retention: "24 months", region: "India", status: "certified" },
  { id: "PA-006", activity: "Analytics", purpose: "Aggregate platform metrics", legalBasis: "Legitimate interest", subjects: "All users (pseudonymous)", recipients: "Analysts", retention: "12 months", region: "India", status: "provisional" },
];

const incidents = [
  { id: "INC-2026-014", type: "personal_data_breach", severity: "notifiable", awareAt: "2026-11-02T09:40:00+05:30", status: "Open", subjects: 340, clock: "Regulator notice due in 48h" },
  { id: "INC-2026-015", type: "security_incident", severity: "medium", awareAt: "2026-10-30T14:20:00+05:30", status: "Contained", subjects: 0, clock: "Contained" },
  { id: "INC-2026-016", type: "misuse_by_staff", severity: "low", awareAt: "2026-10-28T11:00:00+05:30", status: "Closed", subjects: 2, clock: "Closed" },
];

const requests = [
  { id: "REQ-2026-041", authority: "Data protection authority", scope: "Data-rights request records", received: "2026-10-28", due: "2026-11-11", status: "In progress" },
  { id: "REQ-2026-042", authority: "Law enforcement", scope: "Account access logs", received: "2026-10-31", due: "2026-11-07", status: "Validating" },
  { id: "REQ-2026-043", authority: "Regulator", scope: "Vendor processing records", received: "2026-11-01", due: "2026-11-15", status: "Open" },
  { id: "REQ-2026-044", authority: "Court", scope: "Dispute evidence bundle", received: "2026-11-02", due: "2026-11-16", status: "Open" },
];

const vendors = [
  { id: "V-001", vendor: "Payments provider", service: "Payment processing", region: "India", terms: "Current", riskTier: "High", status: "on-track" },
  { id: "V-002", vendor: "KYC and screening", service: "Identity verification", region: "India", terms: "Current", riskTier: "High", status: "on-track" },
  { id: "V-003", vendor: "AI provider", service: "Interview trainer model", region: "EU", terms: "Expiring in 30 days", riskTier: "Medium", status: "needs-attention" },
  { id: "V-004", vendor: "Email and SMS", service: "Transactional messaging", region: "India", terms: "Current", riskTier: "Low", status: "on-track" },
];

const legalHolds = [
  { id: "HOLD-001", scope: "Account usr_8f21c", reason: "Regulator investigation", requestedBy: "Compliance", placedBy: "Compliance officer", date: "2026-10-25", status: "Active" },
  { id: "HOLD-002", scope: "Case TCK-2026-048213", reason: "Litigation hold", requestedBy: "Legal", placedBy: "Compliance officer", date: "2026-10-30", status: "Active" },
];

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
      {complianceTabs.map((t) => (
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

function AdminCompliancePage() {
  const [refreshing, setRefreshing] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerItem, setDrawerItem] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata", hour12: false }));
  const [activeTab, setActiveTab] = useState("overview");
  const [activeRange, setActiveRange] = useState("30-days");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSavedViews, setShowSavedViews] = useState(false);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    const t = setTimeout(() => {
      setRefreshing(false);
      setLastUpdated(new Date().toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata", hour12: false }));
      toast("Compliance refreshed");
    }, 800);
    return () => clearTimeout(t);
  }, []);

  const handleExport = useCallback(() => {
    toast("Exporting compliance evidence (approval + re-authentication required)");
  }, []);

  const handleSearch = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  const filteredRecords = useMemo(() => {
    if (!searchQuery) return processingRecords;
    const q = searchQuery.toLowerCase();
    return processingRecords.filter((r) => r.activity.toLowerCase().includes(q) || r.id.toLowerCase().includes(q));
  }, [searchQuery]);

  const filteredIncidents = useMemo(() => {
    if (!searchQuery) return incidents;
    const q = searchQuery.toLowerCase();
    return incidents.filter((i) => i.id.toLowerCase().includes(q) || i.type.toLowerCase().includes(q));
  }, [searchQuery]);

  const filteredRequests = useMemo(() => {
    if (!searchQuery) return requests;
    const q = searchQuery.toLowerCase();
    return requests.filter((r) => r.id.toLowerCase().includes(q) || r.authority.toLowerCase().includes(q) || r.status.toLowerCase().includes(q));
  }, [searchQuery]);

  const filteredVendors = useMemo(() => {
    if (!searchQuery) return vendors;
    const q = searchQuery.toLowerCase();
    return vendors.filter((v) => v.vendor.toLowerCase().includes(q) || v.service.toLowerCase().includes(q) || v.status.toLowerCase().includes(q));
  }, [searchQuery]);

  const statusChip = (status) => {
    const map = {
      "on-track": "on-track",
      "needs-attention": "needs-attention",
      overdue: "overdue",
      "under-review": "under-review",
      certified: "certified",
      provisional: "provisional",
      notifiable: "notifiable",
      high: "high",
      medium: "medium",
      low: "low",
    };
    return <StatChip status={map[status] || status} />;
  };

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#0F1B2D]">
      <a href="#compliance-main" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 bg-[#0F1B2D] text-white px-4 py-2">
        Skip to content
      </a>

      <EnvironmentStrip />
      <TopBar onRefresh={handleRefresh} />

      <div className="flex flex-col lg:flex-row" id="compliance-main">
        <AdminSidebar active="Compliance" />

        <main className="flex-1 min-w-0 pt-6 lg:pt-8 lg:pl-[232px] lg:px-8 pb-24">
          <div className="flex items-center justify-between mb-6 border-b border-solid border-[#E5E1D8] pb-4">
            <div>
              <h1 className="text-[28px] font-serif font-semibold">Compliance and Reporting</h1>
              <p className="text-[12px] text-[#4A5568] mt-1">
                Data-protection posture, processing records, retention, legal holds, incidents, regulator and law-enforcement requests, vendors, consent and notices
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Btn size="small" secondary icon={Menu} onClick={() => setShowSavedViews(!showSavedViews)} title="Saved views" />
              {showSavedViews && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-solid border-[#E5E1D8] rounded-[10px] shadow-lg p-3 z-30">
                  <p className="text-[10px] font-semibold text-[#4A5568] mb-2 uppercase tracking-wide">Saved views</p>
                  <Btn size="small" secondary className="w-full text-left text-[11px]" onClick={() => { setShowSavedViews(false); toast("Loading 'Open obligations by area'"); }}>
                    Open obligations by area
                  </Btn>
                  <Btn size="small" secondary className="w-full text-left text-[11px]" onClick={() => { setShowSavedViews(false); toast("Loading 'Incidents register'"); }}>
                    Incidents register
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

          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 border-b border-solid border-[#E5E1D8] pb-3">
            <div className="flex items-center gap-3">
              <RangeFilter active={activeRange} onChange={setActiveRange} />
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Search activities, incidents, requests, vendors…"
                className="h-10 rounded-[10px] border border-solid border-[#E5E1D8] bg-white pl-4 pr-10 text-[12px] w-72"
              />
            </div>
            <div className="flex items-end gap-2 text-right">
              <p className="text-[11px] text-[#4A5568]">Updated</p>
              <p className="text-[12px] font-mono text-[#0F1B2D]">{lastUpdated}</p>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-4 mb-6">
            {summaryStrip.map((s, i) => (
              <MetricCard key={i} label={s.label} value={s.value} sub={s.sub} status={s.status} />
            ))}
          </div>

          <TabBar active={activeTab} onChange={setActiveTab} />

          <div className="mt-6">
            {activeTab === "overview" && (
              <>
                <h2 className="text-[15px] font-semibold mb-4">Compliance posture board</h2>
                <p className="text-[12px] text-[#4A5568] mb-6">Each area shows status, owner, next deadline and a link to the underlying evidence.</p>
                <div className="grid gap-4 lg:grid-cols-3">
                  {postureAreas.map((a) => (
                    <Card key={a.id} title={a.area} padded className="border-[#E5E1D8]">
                      <div className="px-5 pt-3 pb-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-semibold text-[#4A5568] uppercase tracking-wide">Status</span>
                          {statusChip(a.status)}
                        </div>
                        <div className="grid gap-3 lg:grid-cols-2 text-[11px] text-[#4A5568]">
                          <div>
                            <p className="block mb-1">Owner</p>
                            <p className="text-[12px] font-medium text-[#0F1B2D]">{a.owner}</p>
                          </div>
                          <div>
                            <p className="block mb-1">Next deadline</p>
                            <p className="text-[12px] font-medium text-[#0F1B2D]">{a.nextDeadline}</p>
                          </div>
                          <div>
                            <p className="block mb-1">Last review</p>
                            <p className="text-[12px] font-medium text-[#0F1B2D]">{a.lastReview}</p>
                          </div>
                          <div>
                            <p className="block mb-1">Evidence</p>
                            <p className="text-[12px] font-medium text-[#0F1B2D]">{a.evidence}</p>
                          </div>
                        </div>
                        <div className="pt-3 border-t border-solid border-[#E5E1D8]/50">
                          <Btn size="small" secondary onClick={() => setDrawerOpen(true)} title={`View evidence for ${a.area}`}>
                            View evidence
                          </Btn>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </>
            )}

            {activeTab === "processing-records" && (
              <>
                <h2 className="text-[15px] font-semibold mb-4">Records of processing activities</h2>
                <p className="text-[12px] text-[#4A5568] mb-4">Inventory of processing activities with purpose, legal basis, retention and region.</p>
                <Card title="Processing activities register" titleIcon={FileText}>
                  <div className="px-5 pt-3 pb-4 overflow-x-auto">
                    <table className="w-full text-left text-[11px] border-collapse">
                      <thead>
                        <tr className="border-b border-solid border-[#E5E1D8]">
                          {["ID", "Activity", "Purpose", "Legal basis", "Data subjects", "Recipients", "Retention", "Region", "Status"].map((h) => (
                            <th key={h} className="pb-3 text-[10px] font-medium text-[#4A5568] uppercase tracking-wide">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {filteredRecords.map((r) => (
                          <tr key={r.id} className="border-b border-solid border-[#E5E1D8]/50 last:border-0 hover:bg-[#F3EBDD]/30 transition">
                            <td className="py-3 text-[11px] font-medium text-[#0F1B2D]">{r.id}</td>
                            <td className="py-3 text-[11px] text-[#4A5568]">{r.activity}</td>
                            <td className="py-3 text-[11px] text-[#4A5568]">{r.purpose}</td>
                            <td className="py-3 text-[11px] text-[#4A5568]">{r.legalBasis}</td>
                            <td className="py-3 text-[11px] text-[#4A5568]">{r.subjects}</td>
                            <td className="py-3 text-[11px] text-[#4A5568]">{r.recipients}</td>
                            <td className="py-3 text-[11px] text-[#4A5568]">{r.retention}</td>
                            <td className="py-3 text-[11px] text-[#4A5568]">{r.region}</td>
                            <td className="py-3">{statusChip(r.status)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              </>
            )}

            {activeTab === "retention-and-deletion" && (
              <>
                <h2 className="text-[15px] font-semibold mb-4">Retention and deletion</h2>
                <p className="text-[12px] text-[#4A5568] mb-4">Retention schedule by data category and role, job monitor, backup expiry and deletion verification.</p>
                <div className="grid gap-4 lg:grid-cols-3">
                  <Card title="Scheduled jobs" titleIcon={Clock}>
                    <div className="px-5 pt-3 pb-4 space-y-3">
                      <div className="flex items-center justify-between border-b border-solid border-[#E5E1D8]/50 pb-2">
                        <span className="text-[11px] text-[#4A5568]">Weekly retention run</span>
                        <span className="text-[11px] font-medium text-[#0F1B2D]">Last run: Today, 02:00 IST</span>
                      </div>
                      <div className="flex items-center justify-between border-b border-solid border-[#E5E1D8]/50 pb-2">
                        <span className="text-[11px] text-[#4A5568]">Deletion sweep</span>
                        <span className="text-[11px] font-medium text-[#0F1B2D]">Last run: Yesterday, 02:00 IST</span>
                      </div>
                      <div className="flex items-center justify-between pb-2">
                        <span className="text-[11px] text-[#4A5568]">Backup overwrite</span>
                        <span className="text-[11px] font-medium text-[#0F1B2D]">Status: On schedule</span>
                      </div>
                    </div>
                  </Card>
                  <Card title="Backups" titleIcon={Archive}>
                    <div className="px-5 pt-3 pb-4 space-y-3">
                      <div className="flex items-center justify-between border-b border-solid border-[#E5E1D8]/50 pb-2">
                        <span className="text-[11px] text-[#4A5568]">Overwrite status</span>
                        <span className="text-[11px] font-medium text-[#0F1B2D]">Current</span>
                      </div>
                      <div className="flex items-center justify-between border-b border-solid border-[#E5E1D8]/50 pb-2">
                        <span className="text-[11px] text-[#4A5568]">Expiry</span>
                        <span className="text-[11px] font-medium text-[#0F1B2D]">30 days</span>
                      </div>
                      <div className="flex items-center justify-between pb-2">
                        <span className="text-[11px] text-[#4A5568]">Deleted-data statement</span>
                        <span className="text-[11px] font-medium text-[#0F1B2D]">Documented</span>
                      </div>
                    </div>
                  </Card>
                  <Card title="Verification sampling" titleIcon={ShieldCheck}>
                    <div className="px-5 pt-3 pb-4 space-y-3">
                      <div className="flex items-center justify-between border-b border-solid border-[#E5E1D8]/50 pb-2">
                        <span className="text-[11px] text-[#4A5568]">Test identifiers searched</span>
                        <span className="text-[11px] font-medium text-[#0F1B2D]">0 found</span>
                      </div>
                      <div className="flex items-center justify-between border-b border-solid border-[#E5E1D8]/50 pb-2">
                        <span className="text-[11px] text-[#4A5568]">Last sampled</span>
                        <span className="text-[11px] font-medium text-[#0F1B2D]">1 Nov 2026</span>
                      </div>
                      <div className="flex items-center justify-between pb-2">
                        <span className="text-[11px] text-[#4A5568]">Result</span>
                        <span className="text-[11px] font-medium text-[#2E7D5B]">Deleted data confirmed gone</span>
                      </div>
                    </div>
                  </Card>
                </div>
              </>
            )}

            {activeTab === "legal-holds" && (
              <>
                <h2 className="text-[15px] font-semibold mb-4">Legal holds</h2>
                <p className="text-[12px] text-[#4A5568] mb-4">Holds suspend deletion and anonymization for the scoped records.</p>
                <Card title="Legal holds register" titleIcon={LockIcon}>
                  <div className="px-5 pt-3 pb-4 overflow-x-auto">
                    <table className="w-full text-left text-[11px] border-collapse">
                      <thead>
                        <tr className="border-b border-solid border-[#E5E1D8]">
                          {["Hold ID", "Scope", "Reason", "Requested by", "Placed by", "Date", "Status"].map((h) => (
                            <th key={h} className="pb-3 text-[10px] font-medium text-[#4A5568] uppercase tracking-wide">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {legalHolds.map((h) => (
                          <tr key={h.id} className="border-b border-solid border-[#E5E1D8]/50 last:border-0">
                            <td className="py-3 text-[11px] font-medium text-[#0F1B2D]">{h.id}</td>
                            <td className="py-3 text-[11px] text-[#4A5568]">{h.scope}</td>
                            <td className="py-3 text-[11px] text-[#4A5568]">{h.reason}</td>
                            <td className="py-3 text-[11px] text-[#4A5568]">{h.requestedBy}</td>
                            <td className="py-3 text-[11px] text-[#4A5568]">{h.placedBy}</td>
                            <td className="py-3 text-[11px] text-[#4A5568]">{h.date}</td>
                            <td className="py-3">{statusChip("on-track")}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="pt-4 border-t border-solid border-[#E5E1D8]/50">
                    <Btn secondary onClick={() => toast("Opening place-hold flow")} title="Place hold">
                      Place legal hold
                    </Btn>
                  </div>
                </Card>
              </>
            )}

            {activeTab === "incidents-and-breaches" && (
              <>
                <h2 className="text-[15px] font-semibold mb-4">Incidents and breaches</h2>
                <p className="text-[12px] text-[#4A5568] mb-4">Incident register with breach workflow, notification clocks and immutable evidence.</p>
                <Card title="Incident register" titleIcon={AlertCircle}>
                  <div className="px-5 pt-3 pb-4 overflow-x-auto">
                    <table className="w-full text-left text-[11px] border-collapse">
                      <thead>
                        <tr className="border-b border-solid border-[#E5E1D8]">
                          {["ID", "Type", "Severity", "Aware at", "Status", "Subjects (est.)", "Clock"].map((h) => (
                            <th key={h} className="pb-3 text-[10px] font-medium text-[#4A5568] uppercase tracking-wide">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {filteredIncidents.map((i) => (
                          <tr key={i.id} className="border-b border-solid border-[#E5E1D8]/50 last:border-0">
                            <td className="py-3 text-[11px] font-medium text-[#0F1B2D]">{i.id}</td>
                            <td className="py-3 text-[11px] text-[#4A5568]">{i.type.replace(/_/g, " ")}</td>
                            <td className="py-3">{statusChip(i.severity)}</td>
                            <td className="py-3 text-[11px] text-[#4A5568]">{new Date(i.awareAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</td>
                            <td className="py-3 text-[11px] text-[#4A5568]">{i.status}</td>
                            <td className="py-3 text-[11px] text-[#4A5568]">{i.subjects}</td>
                            <td className="py-3 text-[11px] text-[#4A5568]">{i.clock}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              </>
            )}

            {activeTab === "requests" && (
              <>
                <h2 className="text-[15px] font-semibold mb-4">Requests (regulators and law enforcement)</h2>
                <p className="text-[12px] text-[#4A5568] mb-4">Every request is registered, validated, minimally disclosed and recorded.</p>
                <Card title="Request register" titleIcon={Mail}>
                  <div className="px-5 pt-3 pb-4 overflow-x-auto">
                    <table className="w-full text-left text-[11px] border-collapse">
                      <thead>
                        <tr className="border-b border-solid border-[#E5E1D8]">
                          {["ID", "Authority", "Scope", "Received", "Due", "Status"].map((h) => (
                            <th key={h} className="pb-3 text-[10px] font-medium text-[#4A5568] uppercase tracking-wide">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {filteredRequests.map((r) => (
                          <tr key={r.id} className="border-b border-solid border-[#E5E1D8]/50 last:border-0">
                            <td className="py-3 text-[11px] font-medium text-[#0F1B2D]">{r.id}</td>
                            <td className="py-3 text-[11px] text-[#4A5568]">{r.authority}</td>
                            <td className="py-3 text-[11px] text-[#4A5568]">{r.scope}</td>
                            <td className="py-3 text-[11px] text-[#4A5568]">{r.received}</td>
                            <td className="py-3 text-[11px] text-[#4A5568]">{r.due}</td>
                            <td className="py-3">{statusChip("needs-attention")}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              </>
            )}

            {activeTab === "vendors-and-transfers" && (
              <>
                <h2 className="text-[15px] font-semibold mb-4">Vendors and transfers</h2>
                <p className="text-[12px] text-[#4A5568] mb-4">Vendor register, cross-border transfers and sub-processor change notices.</p>
                <Card title="Vendor register" titleIcon={Building2}>
                  <div className="px-5 pt-3 pb-4 overflow-x-auto">
                    <table className="w-full text-left text-[11px] border-collapse">
                      <thead>
                        <tr className="border-b border-solid border-[#E5E1D8]">
                          {["ID", "Vendor", "Service", "Region", "Terms", "Risk tier", "Status"].map((h) => (
                            <th key={h} className="pb-3 text-[10px] font-medium text-[#4A5568] uppercase tracking-wide">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {filteredVendors.map((v) => (
                          <tr key={v.id} className="border-b border-solid border-[#E5E1D8]/50 last:border-0">
                            <td className="py-3 text-[11px] font-medium text-[#0F1B2D]">{v.id}</td>
                            <td className="py-3 text-[11px] text-[#4A5568]">{v.vendor}</td>
                            <td className="py-3 text-[11px] text-[#4A5568]">{v.service}</td>
                            <td className="py-3 text-[11px] text-[#4A5568]">{v.region}</td>
                            <td className="py-3 text-[11px] text-[#4A5568]">{v.terms}</td>
                            <td className="py-3 text-[11px] text-[#4A5568]">{v.riskTier}</td>
                            <td className="py-3">{statusChip(v.status)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              </>
            )}

            {activeTab === "consent-and-notices" && (
              <>
                <h2 className="text-[15px] font-semibold mb-4">Consent and notices</h2>
                <p className="text-[12px] text-[#4A5568] mb-4">Current notice versions, consent catalog, withdrawal propagation and cookie disclosures.</p>
                <Card title="Consent catalog" titleIcon={UsersIcon}>
                  <div className="px-5 pt-3 pb-4 space-y-3">
                    <div className="flex items-center justify-between border-b border-solid border-[#E5E1D8]/50 pb-2">
                      <span className="text-[11px] text-[#4A5568]">Practice score sharing</span>
                      <span className="text-[11px] font-medium text-[#0F1B2D]">Active: 12,400 · Withdrawn: 84</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-solid border-[#E5E1D8]/50 pb-2">
                      <span className="text-[11px] text-[#4A5568]">Talent pool discoverability</span>
                      <span className="text-[11px] font-medium text-[#0F1B2D]">Active: 8,900 · Withdrawn: 31</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-solid border-[#E5E1D8]/50 pb-2">
                      <span className="text-[11px] text-[#4A5568]">Anonymous statistics contribution</span>
                      <span className="text-[11px] font-medium text-[#0F1B2D]">Active: 41,200 · Withdrawn: 190</span>
                    </div>
                    <div className="flex items-center justify-between pb-2">
                      <span className="text-[11px] text-[#4A5568]">Marketing preferences</span>
                      <span className="text-[11px] font-medium text-[#0F1B2D]">Active: 15,600 · Withdrawn: 412</span>
                    </div>
                  </div>
                </Card>
              </>
            )}

            {activeTab === "risk-and-dpias" && (
              <>
                <h2 className="text-[15px] font-semibold mb-4">Risk and DPIAs</h2>
                <p className="text-[12px] text-[#4A5568] mb-4">Risk register and data protection impact assessments for high-risk processing.</p>
                <Card title="Risk register" titleIcon={AlertTriangle}>
                  <div className="px-5 pt-3 pb-4 space-y-3">
                    <div className="flex items-center justify-between border-b border-solid border-[#E5E1D8]/50 pb-2">
                      <span className="text-[11px] text-[#4A5568]">AI scoring bias</span>
                      <span className="text-[11px] font-medium text-[#0F1B2D]">Residual: Medium · Owner: AI quality lead</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-solid border-[#E5E1D8]/50 pb-2">
                      <span className="text-[11px] text-[#4A5568]">Investor KYC</span>
                      <span className="text-[11px] font-medium text-[#0F1B2D]">Residual: Low · Owner: Compliance officer</span>
                    </div>
                    <div className="flex items-center justify-between pb-2">
                      <span className="text-[11px] text-[#4A5568]">Background checks</span>
                      <span className="text-[11px] font-medium text-[#0F1B2D]">Residual: Medium · Owner: Security administrator</span>
                    </div>
                  </div>
                </Card>
              </>
            )}

            {activeTab === "policies-and-training" && (
              <>
                <h2 className="text-[15px] font-semibold mb-4">Policies and training</h2>
                <p className="text-[12px] text-[#4A5568] mb-4">Policy library, training compliance by role and periodic attestations.</p>
                <Card title="Policy library" titleIcon={FileText}>
                  <div className="px-5 pt-3 pb-4 space-y-3">
                    <div className="flex items-center justify-between border-b border-solid border-[#E5E1D8]/50 pb-2">
                      <span className="text-[11px] text-[#4A5568]">Data handling</span>
                      <span className="text-[11px] font-medium text-[#0F1B2D]">v2.1 · Review: Mar 2027 · Ack: 98%</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-solid border-[#E5E1D8]/50 pb-2">
                      <span className="text-[11px] text-[#4A5568]">Incident response</span>
                      <span className="text-[11px] font-medium text-[#0F1B2D]">v1.4 · Review: Jan 2027 · Ack: 94%</span>
                    </div>
                    <div className="flex items-center justify-between pb-2">
                      <span className="text-[11px] text-[#4A5568]">AI use</span>
                      <span className="text-[11px] font-medium text-[#0F1B2D]">v1.0 · Review: Jun 2027 · Ack: 91%</span>
                    </div>
                  </div>
                </Card>
              </>
            )}

            {activeTab === "reports-and-exports" && (
              <>
                <h2 className="text-[15px] font-semibold mb-4">Reports and exports</h2>
                <p className="text-[12px] text-[#4A5568] mb-4">Regulator-ready packages generated from live data.</p>
                <Card title="Standard reports" titleIcon={ClipboardList}>
                  <div className="px-5 pt-3 pb-4 space-y-3">
                    <div className="flex items-center justify-between border-b border-solid border-[#E5E1D8]/50 pb-2">
                      <span className="text-[11px] text-[#4A5568]">Data-rights performance</span>
                      <span className="text-[11px] font-medium text-[#0F1B2D]">Available</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-solid border-[#E5E1D8]/50 pb-2">
                      <span className="text-[11px] text-[#4A5568]">Records of processing</span>
                      <span className="text-[11px] font-medium text-[#0F1B2D]">Available</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-solid border-[#E5E1D8]/50 pb-2">
                      <span className="text-[11px] text-[#4A5568]">Incident register extract</span>
                      <span className="text-[11px] font-medium text-[#0F1B2D]">Available</span>
                    </div>
                    <div className="flex items-center justify-between pb-2">
                      <span className="text-[11px] text-[#4A5568]">Vendor and transfer register</span>
                      <span className="text-[11px] font-medium text-[#0F1B2D]">Available</span>
                    </div>
                  </div>
                  <div className="pt-4">
                    <Btn secondary onClick={handleExport} title="Generate report">
                      Generate report
                    </Btn>
                  </div>
                </Card>
              </>
            )}

            {activeTab === "calendar" && (
              <>
                <h2 className="text-[15px] font-semibold mb-4">Compliance calendar</h2>
                <p className="text-[12px] text-[#4A5568] mb-4">Deadlines and recurring tasks with owners and status.</p>
                <Card title="Upcoming deadlines" titleIcon={CalendarIcon}>
                  <div className="px-5 pt-3 pb-4 space-y-3">
                    <div className="flex items-center justify-between border-b border-solid border-[#E5E1D8]/50 pb-2">
                      <span className="text-[11px] text-[#4A5568]">Breach notification clock — INC-2026-014</span>
                      <span className="text-[11px] font-medium text-[#B42318]">48h left</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-solid border-[#E5E1D8]/50 pb-2">
                      <span className="text-[11px] text-[#4A5568]">Vendor assessment — AI provider</span>
                      <span className="text-[11px] font-medium text-[#0F1B2D]">14 days</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-solid border-[#E5E1D8]/50 pb-2">
                      <span className="text-[11px] text-[#4A5568]">DPIA review — Interview trainer</span>
                      <span className="text-[11px] font-medium text-[#0F1B2D]">21 days</span>
                    </div>
                    <div className="flex items-center justify-between pb-2">
                      <span className="text-[11px] text-[#4A5568]">Policy review — Data handling</span>
                      <span className="text-[11px] font-medium text-[#0F1B2D]">4 months</span>
                    </div>
                  </div>
                </Card>
              </>
            )}
          </div>

          <div className="mt-8 px-5 lg:px-0 text-center lg:text-left">
            <p className="text-[11px] text-[#4A5568]">
              Evidence, not assertions — every compliance statement links to the records behind it. The server enforces role-based access; nobody, including super admins, can edit or delete compliance evidence records.
            </p>
          </div>
        </main>
      </div>

      {drawerOpen && drawerItem && (
        <DetailDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title={`Evidence: ${drawerItem.title}`}>
          <div className="space-y-5">
            <p className="text-[12px] text-[#4A5568]">{drawerItem.body}</p>
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

export { AdminCompliancePage };
