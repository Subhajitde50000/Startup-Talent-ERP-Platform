"use client";
import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Info,
  ArrowRight,
  ChevronDown,
  Copy,
  Download,
  Link as LinkIcon,
  Edit,
  Lock,
  Mail,
  Shield,
  Ticket,
  Target,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Gauge,
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
  Terminal,
  Play,
  Pause,
  StopCircle,
  RotateCcw as Reload,
  Wifi,
  WifiOff,
  Server,
  Layers,
  GitMerge,
  GitCompare,
  Github,
  Gitlab,
  X,
  HelpCircle,
  ShieldAlert as ShieldAlertIcon,
  AlertCircle,
  Scale,
  MessageCircle,
  Banknote,
  Settings,
  SlidersHorizontal,
} from "lucide-react";

import {
  INK, INK_SOFT, IVORY, WHITE, GOLD, GOLD_DARK, GOLD_TINT,
  STONE_700, STONE_400, STONE_200,
  SUCCESS, SUCCESS_TINT, SUCCESS_DARK,
  WARNING, WARNING_TINT, WARNING_DARK,
  ERROR, ERROR_TINT, ERROR_DARK,
  INFO, INFO_TINT,
  RADIUS_CARD, RADIUS_CONTROL,
  user, environment,
  onToast, toast,
  Card, Btn, BtnIcon, StatChip, SectionHead, EmptyState, SkeletonCard,
  ToggleSwitch, DetailDrawer, formatAge, relativeDate,
  sidebarItems, AdminSidebar, MetricCard, TabBar, RangeFilter,
  EnvironmentStrip, TopBar,
} from "./admin-ui-shared";
const rangeFilters = [
  { key: "24-hours", label: "Last 24 hours" },
  { key: "7-days", label: "Last 7 days" },
  { key: "30-days", label: "Last 30 days" },
  { key: "90-days", label: "Last 90 days" },
  { key: "custom", label: "Custom range" },
];
const summaryStrip = [
  { label: "Live flags", value: "23", status: "live", sub: "Across all environments" },
  { label: "Flags older than 90 days", value: "4", status: "needs-attention", sub: "In cleanup list" },
  { label: "Pending changes", value: "3", status: "draft", sub: "Awaiting approval" },
  { label: "Config drift items", value: "1", status: "overdue", sub: "Staging vs production" },
  { label: "Upcoming scheduled", value: "2", status: "scheduled", sub: "Next 7 days" },
];

const featureFlags = [
  { key: "new-dashboard", name: "New Dashboard", owner: "product", status: "staged", rollout: "25%", protected: false },
  { key: "ai-practice-sessions", name: "AI Practice Sessions", owner: "ai-quality", status: "live", rollout: "100%", protected: false },
  { key: "video-interviews", name: "Video Interviews", owner: "product", status: "live", rollout: "100%", protected: true },
  { key: "data-rooms-v2", name: "Data Rooms v2", owner: "product", status: "staged", rollout: "10%", protected: false },
  { key: "advanced-analytics", name: "Advanced Analytics", owner: "data", status: "staged", rollout: "5%", protected: true },
  { key: "sso-enforcement", name: "SSO Enforcement", owner: "security", status: "staged", rollout: "0%", protected: true },
];

const limits = [
  { key: "daily-job-posts", name: "Daily job posts per employer", owner: "product", value: "50", unit: "posts", protected: false },
  { key: "max-candidates-per-job", name: "Max candidates per job", owner: "product", value: "200", unit: "candidates", protected: false },
  { key: "api-rate-limit", name: "API rate limit (requests/min)", owner: "platform", value: "1000", unit: "rpm", protected: true },
  { key: "storage-per-org", name: "Storage per organization", owner: "platform", value: "10", unit: "GB", protected: false },
  { key: "concurrent-interviews", name: "Concurrent interviews", owner: "product", value: "10", unit: "sessions", protected: true },
];


const calendars = [
  { key: "freeze-window-q4", name: "Q4 freeze window", type: "freeze", status: "scheduled", value: "15 Dec – 10 Jan" },
  { key: "maintenance-payments", name: "Payments maintenance", type: "maintenance", status: "scheduled", value: "12 Nov · 02:00 IST" },
  { key: "cert-renewal-gateway", name: "API gateway cert renewal", type: "maintenance", status: "scheduled", value: "15 Nov · 03:00 IST" },
  { key: "search-reindex", name: "Search index reindex", type: "maintenance", status: "scheduled", value: "20 Nov · 02:00 IST" },
];


function AdminConfigPage() {
  const [refreshing, setRefreshing] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerItem, setDrawerItem] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata", hour12: false }));
  const [activeTab, setActiveTab] = useState("feature-flags");
  const [activeRange, setActiveRange] = useState("24-hours");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSavedViews, setShowSavedViews] = useState(false);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    const t = setTimeout(() => {
      setRefreshing(false);
      setLastUpdated(new Date().toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata", hour12: false }));
      toast("Config refreshed");
    }, 800);
    return () => clearTimeout(t);
  }, []);

  const handleExport = useCallback(() => {
    toast("Exporting configuration (re-authentication required)");
  }, []);

  const handleSearch = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  const filteredFlags = useMemo(() => {
    if (!searchQuery) return featureFlags;
    const q = searchQuery.toLowerCase();
    return featureFlags.filter((f) => f.key.toLowerCase().includes(q) || f.name.toLowerCase().includes(q) || f.owner.toLowerCase().includes(q));
  }, [searchQuery]);

  const filteredLimits = useMemo(() => {
    if (!searchQuery) return limits;
    const q = searchQuery.toLowerCase();
    return limits.filter((l) => l.key.toLowerCase().includes(q) || l.name.toLowerCase().includes(q) || l.owner.toLowerCase().includes(q));
  }, [searchQuery]);

  const statusChip = (status) => {
    const map = {
      draft: "draft",
      "in-review": "in-review",
      scheduled: "scheduled",
      staged: "staged",
      live: "live",
      rolledback: "rolledback",
      overridden: "overridden",
      standard: "standard",
      sensitive: "sensitive",
      protected: "protected",
      certified: "certified",
      provisional: "provisional",
      deprecated: "deprecated",
    };
    return <StatChip status={map[status] || status} />;
  };

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#0F1B2D]">
      <a href="#config-main" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 bg-[#0F1B2D] text-white px-4 py-2">
        Skip to content
      </a>

      <EnvironmentStrip />
      <TopBar onRefresh={handleRefresh} />

      <div className="flex flex-col lg:flex-row" id="config-main">
        <AdminSidebar active="Configuration" />

        <main className="flex-1 min-w-0 pt-6 lg:pt-8 lg:pl-[232px] lg:px-8 pb-24">
          <div className="flex items-center justify-between mb-6 border-b border-solid border-[#E5E1D8] pb-4">
            <div>
              <h1 className="text-[28px] font-serif font-semibold">Platform Configuration</h1>
              <p className="text-[12px] text-[#4A5568] mt-1">
                Feature flags, limits, calendars, delivery and security settings, with versioning, approvals and rollback
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Btn size="small" secondary icon={Menu} onClick={() => setShowSavedViews(!showSavedViews)} title="Saved views" />
              {showSavedViews && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-solid border-[#E5E1D8] rounded-[10px] shadow-lg p-3 z-30">
                  <p className="text-[10px] font-semibold text-[#4A5568] mb-2 uppercase tracking-wide">Saved views</p>
                  <Btn size="small" secondary className="w-full text-left text-[11px]" onClick={() => { setShowSavedViews(false); toast("Loading 'Sensitive flags'"); }}>
                    Sensitive flags
                  </Btn>
                  <Btn size="small" secondary className="w-full text-left text-[11px]" onClick={() => { setShowSavedViews(false); toast("Loading 'Pending changes'"); }}>
                    Pending changes
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
                placeholder="Search flags, limits, settings…"
                className="h-10 rounded-[10px] border border-solid border-[#E5E1D8] bg-white pl-4 pr-10 text-[12px] w-72"
              />
            </div>
            <div className="flex items-end gap-2 text-right">
              <p className="text-[11px] text-[#4A5568]">Updated</p>
              <p className="text-[12px] font-mono text-[#0F1B2D]">{lastUpdated}</p>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-5 mb-6">
            {summaryStrip.map((s, i) => (
              <MetricCard key={i} label={s.label} value={s.value} sub={s.sub} status={s.status} />
            ))}
          </div>

          <TabBar active={activeTab} onChange={setActiveTab} />

          <div className="mt-6">
            {activeTab === "feature-flags" && (
              <>
                <h2 className="text-[15px] font-semibold mb-4">Feature flags</h2>
                <p className="text-[12px] text-[#4A5568] mb-4">Flags with rollout controls, targeting rules and lifecycle. Sensitive flags need the specified approvers.</p>
                <Card title="Feature flag registry" titleIcon={SlidersHorizontal}>
                  <div className="px-5 pt-3 pb-4 overflow-x-auto">
                    <table className="w-full text-left text-[11px] border-collapse">
                      <thead>
                        <tr className="border-b border-solid border-[#E5E1D8]">
                          {["Key", "Name", "Type", "State", "Rollout", "Owner", "Created", "Review", "Status"].map((h) => (
                            <th key={h} className="pb-3 text-[10px] font-medium text-[#4A5568] uppercase tracking-wide">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {filteredFlags.map((f) => (
                          <tr key={f.key} className="border-b border-solid border-[#E5E1D8]/50 last:border-0 hover:bg-[#F3EBDD]/30 transition cursor-pointer" onClick={() => { setDrawerItem(f); setDrawerOpen(true); }}>
                            <td className="py-3 text-[11px] font-mono text-[#0F1B2D]">{f.key}</td>
                            <td className="py-3 text-[11px] text-[#4A5568]">{f.name}</td>
                            <td className="py-3 text-[11px] text-[#4A5568]">{f.type}</td>
                            <td className="py-3">{statusChip(f.state)}</td>
                            <td className="py-3 text-[11px] text-[#4A5568]">{f.rollout}</td>
                            <td className="py-3 text-[11px] text-[#4A5568]">{f.owner}</td>
                            <td className="py-3 text-[11px] text-[#4A5568]">{f.created}</td>
                            <td className="py-3 text-[11px] text-[#4A5568]">{f.review}</td>
                            <td className="py-3">{statusChip(f.status)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              </>
            )}

            {activeTab === "limits-and-thresholds" && (
              <>
                <h2 className="text-[15px] font-semibold mb-4">Limits and thresholds</h2>
                <p className="text-[12px] text-[#4A5568] mb-4">Rate limits, abuse controls and operational thresholds. Sensitive limits need security administrator approval.</p>
                <Card title="Limits registry" titleIcon={Gauge}>
                  <div className="px-5 pt-3 pb-4 overflow-x-auto">
                    <table className="w-full text-left text-[11px] border-collapse">
                      <thead>
                        <tr className="border-b border-solid border-[#E5E1D8]">
                          {["Key", "Name", "Type", "Range", "Value", "Risk class", "Owner", "Environment", "Status"].map((h) => (
                            <th key={h} className="pb-3 text-[10px] font-medium text-[#4A5568] uppercase tracking-wide">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {filteredLimits.map((l) => (
                          <tr key={l.key} className="border-b border-solid border-[#E5E1D8]/50 last:border-0 hover:bg-[#F3EBDD]/30 transition cursor-pointer" onClick={() => { setDrawerItem(l); setDrawerOpen(true); }}>
                            <td className="py-3 text-[11px] font-mono text-[#0F1B2D]">{l.key}</td>
                            <td className="py-3 text-[11px] text-[#4A5568]">{l.name}</td>
                            <td className="py-3 text-[11px] text-[#4A5568]">{l.type}</td>
                            <td className="py-3 text-[11px] text-[#4A5568]">{l.range}</td>
                            <td className="py-3 text-[11px] text-[#0F1B2D]">{l.value}</td>
                            <td className="py-3">{statusChip(l.riskClass)}</td>
                            <td className="py-3 text-[11px] text-[#4A5568]">{l.owner}</td>
                            <td className="py-3 text-[11px] text-[#4A5568]">{l.environment}</td>
                            <td className="py-3">{statusChip(l.status)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              </>
            )}

            {activeTab === "calendars-and-targets" && (
              <>
                <h2 className="text-[15px] font-semibold mb-4">Calendars and targets</h2>
                <p className="text-[12px] text-[#4A5568] mb-4">Business calendar, service targets and quiet hours.</p>
                <Card title="Calendar entries" titleIcon={CalendarIcon}>
                  <div className="px-5 pt-3 pb-4 space-y-3">
                    {calendars.map((c) => (
                      <div key={c.key} className="flex items-center justify-between border-b border-solid border-[#E5E1D8]/50 pb-3 last:border-0 last:pb-0">
                        <div className="flex items-center gap-3">
                          <span className="text-[11px] font-medium text-[#0F1B2D]">{c.name}</span>
                          <span className="text-[11px] text-[#4A5568]">{c.type}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {statusChip(c.status)}
                          <span className="text-[11px] text-[#4A5568]">{c.value}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </>
            )}

            {activeTab === "delivery-and-notifications" && (
              <>
                <h2 className="text-[15px] font-semibold mb-4">Delivery and notifications</h2>
                <p className="text-[12px] text-[#4A5568] mb-4">Channels, email domains, template mapping and provider routing.</p>
                <Card title="Notification channels" titleIcon={Mail}>
                  <div className="px-5 pt-3 pb-4 space-y-3">
                    <div className="flex items-center justify-between border-b border-solid border-[#E5E1D8]/50 pb-2">
                      <span className="text-[11px] text-[#4A5568]">Email</span>
                      <span className="text-[11px] font-medium text-[#286749]">Enabled</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-solid border-[#E5E1D8]/50 pb-2">
                      <span className="text-[11px] text-[#4A5568]">In-app</span>
                      <span className="text:[11px] font-medium text-[#286749]">Enabled</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-solid border-[#E5E1D8]/50 pb-2">
                      <span className="text-[11px] text-[#4A5568]">Push</span>
                      <span className="text:[11px] font-medium text-[#286749]">Enabled</span>
                    </div>
                    <div className="flex items-center justify-between pb-2">
                      <span className="text-[11px] text-[#4A5568]">SMS</span>
                      <span className="text:[11px] font-medium text-[#9A6210]">Limited (verify first)</span>
                    </div>
                  </div>
                </Card>
              </>
            )}

            {activeTab === "security-settings" && (
              <>
                <h2 className="text-[15px] font-semibold mb-4">Security settings</h2>
                <p className="text-[12px] text-[#4A5568] mb-4">Authentication, account protection, CSP, CORS and privacy defaults.</p>
                <Card title="Security configuration" titleIcon={Shield}>
                  <div className="px-5 pt-3 pb-4 space-y-3">
                    <div className="flex items-center justify-between border-b border-solid border-[#E5E1D8]/50 pb-2">
                      <span className="text-[11px] text-[#4A5568]">Sign-in methods</span>
                      <span className="text-[11px] font-medium text-[#0F1B2D]">Email, Google, Microsoft, LinkedIn</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-solid border-[#E5E1D8]/50 pb-2">
                      <span className="text-[11px] text-[#4A5568]">Two-factor required</span>
                      <span className="text-[11px] font-medium text-[#286749]">For investors + employer admins</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-solid border-[#E5E1D8]/50 pb-2">
                      <span className="text-[11px] text-[#4A5568]">Session length</span>
                      <span className="text-[11px] font-medium text-[#0F1B2D]">30 days default</span>
                    </div>
                    <div className="flex items-center justify-between pb-2">
                      <span className="text-[11px] text-[#4A5568]">Idle timeout</span>
                      <span className="text-[11px] font-medium text-[#0F1B2D]">15 minutes</span>
                    </div>
                  </div>
                </Card>
              </>
            )}

            {activeTab === "localization" && (
              <>
                <h2 className="text-[15px] font-semibold mb-4">Localization</h2>
                <p className="text-[12px] text-[#4A5568] mb-4">Localization and formatting defaults.</p>
                <Card title="Localization settings" titleIcon={Globe}>
                  <div className="px-5 pt-3 pb-4 space-y-3">
                    <div className="flex items-center justify-between border-b border-solid border-[#E5E1D8]/50 pb-2">
                      <span className="text-[11px] text-[#4A5568]">Default language</span>
                      <span className="text-[11px] font-medium text-[#0F1B2D]">English (en)</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-solid border-[#E5E1D8]/50 pb-2">
                      <span className="text-[11px] text-[#4A5568]">Supported languages</span>
                      <span className="text-[11px] font-medium text-[#0F1B2D]">en, hi</span>
                    </div>
                    <div className="flex items-center justify-between pb-2">
                      <span className="text-[11px] text-[#4A5568]">Time zone</span>
                      <span className="text-[11px] font-medium text-[#0F1B2D]">Asia/Kolkata (IST)</span>
                    </div>
                  </div>
                </Card>
              </>
            )}

            {activeTab === "maintenance-mode" && (
              <>
                <h2 className="text-[15px] font-semibold mb-4">Maintenance mode</h2>
                <p className="text-[12px] text-[#4A5568] mb-4">Normal, read-only, feature maintenance and full maintenance modes.</p>
                <Card title="Maintenance controls" titleIcon={Wrench}>
                  <div className="px-5 pt-3 pb-4 space-y-3">
                    <div className="flex items-center justify-between border-b border-solid border-[#E5E1D8]/50 pb-2">
                      <span className="text-[11px] text-[#4A5568]">Current mode</span>
                      <span className="text-[11px] font-medium text-[#286749]">Normal</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-solid border-[#E5E1D8]/50 pb-2">
                      <span className="text-[11px] text-[#4A5568]">Protected paths</span>
                      <span className="text-[11px] font-medium text-[#0F1B2D]">Data export, deletion, support, recovery</span>
                    </div>
                    <div className="flex items-center justify-between pb-2">
                      <span className="text-[11px] text-[#4A5568]">Next scheduled</span>
                      <span className="text-[11px] font-medium text-[#0F1B2D]">12 Nov · 02:00 IST</span>
                    </div>
                  </div>
                </Card>
              </>
            )}

            {activeTab === "approvals-and-schedule" && (
              <>
                <h2 className="text-[15px] font-semibold mb-4">Approvals and schedule</h2>
                <p className="text-[12px] text-[#4A5568] mb-4">Pending changes with maker, approvers, diff and impact preview.</p>
                <Card title="Pending changes" titleIcon={ClipboardList}>
                  <div className="px-5 pt-3 pb-4 space-y-3">
                    <div className="flex items-center justify-between border-b border-solid border-[#E5E1D8]/50 pb-2">
                      <span className="text-[11px] text-[#4A5568]">ff_resume_ai → draft</span>
                      <span className="text-[11px] font-medium text-[#0F1B2D]">Awaiting: AI quality lead</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-solid border-[#E5E1D8]/50 pb-2">
                      <span className="text-[11px] text-[#4A5568]">limits.signin_attempts_per_hour → 8</span>
                      <span className="text-[11px] font-medium text-[#0F1B2D]">Awaiting: Security admin</span>
                    </div>
                    <div className="flex items-center justify-between pb-2">
                      <span className="text-[11px] text-[#4A5568]">cal_change_freeze → scheduled</span>
                      <span className="text-[11px] font-medium text-[#0F1B2D]">12 Nov · 02:00 IST</span>
                    </div>
                  </div>
                </Card>
              </>
            )}

            {activeTab === "drift-and-audit" && (
              <>
                <h2 className="text-[15px] font-semibold mb-4">Drift and audit</h2>
                <p className="text-[12px] text-[#4A5568] mb-4">Environment drift, config drift from code, stale settings and audit views.</p>
                <Card title="Drift detection" titleIcon={FileDiff}>
                  <div className="px-5 pt-3 pb-4 space-y-3">
                    <div className="flex items-center justify-between border-b border-solid border-[#E5E1D8]/50 pb-2">
                      <span className="text-[11px] text-[#4A5568]">Staging vs production</span>
                      <span className="text-[11px] font-medium text-[#9A6210]">1 difference</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-solid border-[#E5E1D8]/50 pb-2">
                      <span className="text-[11px] text-[#4A5568]">Out-of-band changes</span>
                      <span className="text-[11px] font-medium text-[#286749]">None detected</span>
                    </div>
                    <div className="flex items-center justify-between pb-2">
                      <span className="text-[11px] text-[#4A5568]">Stale settings</span>
                      <span className="text-[11px] font-medium text-[#0F1B2D]">2 flags without owner</span>
                    </div>
                  </div>
                </Card>
              </>
            )}

            {activeTab === "change-log" && (
              <>
                <h2 className="text-[15px] font-semibold mb-4">Change log</h2>
                <p className="text-[12px] text-[#4A5568] mb-4">Flag flips, config drafts, approvals, schedules and rollbacks.</p>
                <Card title="Recent configuration changes" titleIcon={GitMerge}>
                  <div className="px-5 pt-3 pb-4 space-y-3">
                    <div className="flex items-start gap-3 border-b border-solid border-[#E5E1D8]/50 pb-3">
                      <div className="text-[11px] text-[#4A5568]">2026-11-07 18:00 IST</div>
                      <div className="flex-1">
                        <p className="text-[12px] font-medium text-[#0F1B2D]">Flag flip: ff_mentor_matching → 50%</p>
                        <p className="text-[11px] text-[#4A5568]">Actor: stf_05 · Environment: production</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 border-b border-solid border-[#E5E1D8]/50 pb-3">
                      <div className="text-[11px] text-[#4A5568]">2026-11-07 14:30 IST</div>
                      <div className="flex-1">
                        <p className="text-[12px] font-medium text-[#0F1B2D]">Config draft: limits.signin_attempts_per_hour → 8</p>
                        <p className="text-[11px] text-[#4A5568]">Maker: stf_17 · Status: Awaiting approval</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 pb-3">
                      <div className="text-[11px] text-[#4A5568]">2026-11-06 10:00 IST</div>
                      <div className="flex-1">
                        <p className="text-[12px] font-medium text-[#0F1B2D]">Rollback: ff_video_recording → previous</p>
                        <p className="text-[11px] text-[#4A5568]">Actor: stf_33 · Reason: Error rate spike</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </>
            )}
          </div>

          <div className="mt-8 px-5 lg:px-0 text-center lg:text-left">
            <p className="text-[11px] text-[#4A5568]">
              Every setting has an owner, schema, risk class and blast-radius description. Drafts need approvals; no direct writes to live values. Protected promises (no charging candidates, core free features, accessibility, data rights, staff two-factor, audit append-only, maker-checker for money) cannot be changed through configuration.
            </p>
          </div>
        </main>
      </div>

      {drawerOpen && drawerItem && (
        <DetailDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title={`Setting: ${drawerItem.name || drawerItem.key}`}>
          <div className="space-y-5">
            <div className="grid gap-4 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <h4 className="text-[11px] font-semibold text-[#4A5568] uppercase tracking-wide mb-2">Setting</h4>
                <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">Key:</b> {drawerItem.key || drawerItem.id}</p>
                <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">Name:</b> {drawerItem.name}</p>
                <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">Type:</b> {drawerItem.type}</p>
                <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">Owner:</b> {drawerItem.owner}</p>
                <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">Status:</b> {statusChip(drawerItem.status)}</p>
                {drawerItem.range && <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">Range:</b> {drawerItem.range}</p>}
                {drawerItem.value !== undefined && <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">Value:</b> {drawerItem.value}</p>}
                {drawerItem.riskClass && <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">Risk class:</b> {statusChip(drawerItem.riskClass)}</p>}
                {drawerItem.rollout && <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">Rollout:</b> {drawerItem.rollout}</p>}
              </div>
              <div>
                <h4 className="text-[11px] font-semibold text-[#4A5568] uppercase tracking-wide mb-2">Lifecycle</h4>
                <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">Created:</b> {drawerItem.created}</p>
                <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">Review:</b> {drawerItem.review}</p>
                {drawerItem.lastReview && <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">Last review:</b> {drawerItem.lastReview}</p>}
              </div>
            </div>
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

export { AdminConfigPage };
