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
const systemTabs = [
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
const rangeFilters = [
  { key: "24-hours", label: "Last 24 hours" },
  { key: "7-days", label: "Last 7 days" },
  { key: "30-days", label: "Last 30 days" },
  { key: "90-days", label: "Last 90 days" },
  { key: "custom", label: "Custom range" },
];
const summaryStrip = [
  { label: "Overall status", value: "Operational", status: "operational", sub: "All Tier 1 services healthy" },
  { label: "Open incidents", value: "0", status: "operational", sub: "SEV1 and SEV2 highlighted" },
  { label: "Firing alerts", value: "3", status: "firing", sub: "1 unacknowledged" },
  { label: "Uptime (30 days)", value: "99.96%", status: "operational", sub: "Public-facing definition" },
  { label: "Error budget remaining", value: "62%", status: "degraded", sub: "Tightest service" },
  { label: "Next maintenance", value: "12 Nov · 02:00 IST", status: "maintenance", sub: "30 min window" },
];
const services = [
  { key: "payments", name: "Payments and billing", tier: 1, status: "degraded", sloTarget: 0.999, sloAttainment: 0.9981, budgetRemaining: 0.38, p95Ms: 840, errorRate: 0.021, ownerTeam: "payments", activeAlerts: 2, lastChange: "2026-11-08T00:55:00+05:30", degradedModeActive: false, runbookUrl: "/system/runbooks/payments" },
  { key: "auth", name: "Authentication and sessions", tier: 1, status: "operational", sloTarget: 0.9995, sloAttainment: 0.9997, budgetRemaining: 0.85, p95Ms: 120, errorRate: 0.001, ownerTeam: "identity", activeAlerts: 0, lastChange: "2026-11-07T18:30:00+05:30", degradedModeActive: false, runbookUrl: "/system/runbooks/auth" },
  { key: "identity", name: "Identity and roles", tier: 1, status: "operational", sloTarget: 0.9995, sloAttainment: 0.9996, budgetRemaining: 0.88, p95Ms: 95, errorRate: 0.0005, ownerTeam: "identity", activeAlerts: 0, lastChange: "2026-11-07T20:10:00+05:30", degradedModeActive: false, runbookUrl: "/system/runbooks/identity" },
  { key: "notifications", name: "Notifications", tier: 1, status: "operational", sloTarget: 0.995, sloAttainment: 0.996, budgetRemaining: 0.72, p95Ms: 450, errorRate: 0.004, ownerTeam: "platform", activeAlerts: 0, lastChange: "2026-11-07T15:00:00+05:30", degradedModeActive: false, runbookUrl: "/system/runbooks/notifications" },
  { key: "jobs", name: "Jobs and applications", tier: 1, status: "operational", sloTarget: 0.999, sloAttainment: 0.9993, budgetRemaining: 0.91, p95Ms: 320, errorRate: 0.002, ownerTeam: "hiring", activeAlerts: 0, lastChange: "2026-11-07T22:00:00+05:30", degradedModeActive: false, runbookUrl: "/system/runbooks/jobs" },
  { key: "interviews", name: "Interviews and scheduling", tier: 1, status: "operational", sloTarget: 0.995, sloAttainment: 0.997, budgetRemaining: 0.79, p95Ms: 280, errorRate: 0.003, ownerTeam: "product", activeAlerts: 0, lastChange: "2026-11-07T19:45:00+05:30", degradedModeActive: false, runbookUrl: "/system/runbooks/interviews" },
  { key: "offers", name: "Offers and hires", tier: 1, status: "operational", sloTarget: 0.999, sloAttainment: 0.9994, budgetRemaining: 0.94, p95Ms: 410, errorRate: 0.001, ownerTeam: "hiring", activeAlerts: 0, lastChange: "2026-11-07T21:00:00+05:30", degradedModeActive: false, runbookUrl: "/system/runbooks/offers" },
  { key: "data-rooms", name: "Data rooms and documents", tier: 1, status: "operational", sloTarget: 0.995, sloAttainment: 0.997, budgetRemaining: 0.83, p95Ms: 520, errorRate: 0.002, ownerTeam: "product", activeAlerts: 0, lastChange: "2026-11-07T16:20:00+05:30", degradedModeActive: false, runbookUrl: "/system/runbooks/data-rooms" },
  { key: "verification", name: "Verification", tier: 1, status: "operational", sloTarget: 0.995, sloAttainment: 0.996, budgetRemaining: 0.81, p95Ms: 680, errorRate: 0.005, ownerTeam: "trust", activeAlerts: 0, lastChange: "2026-11-07T17:00:00+05:30", degradedModeActive: false, runbookUrl: "/system/runbooks/verification" },
  { key: "audit", name: "Audit service", tier: 1, status: "operational", sloTarget: 0.999, sloAttainment: 0.9992, budgetRemaining: 0.87, p95Ms: 150, errorRate: 0.001, ownerTeam: "platform", activeAlerts: 0, lastChange: "2026-11-07T14:00:00+05:30", degradedModeActive: false, runbookUrl: "/system/runbooks/audit" },
  { key: "practice-trainer", name: "Practice trainer", tier: 2, status: "operational", sloTarget: 0.99, sloAttainment: 0.994, budgetRemaining: 0.65, p95Ms: 950, errorRate: 0.008, ownerTeam: "ai-quality", activeAlerts: 0, lastChange: "2026-11-07T13:00:00+05:30", degradedModeActive: false, runbookUrl: "/system/runbooks/practice-trainer" },
  { key: "resume-maker", name: "Resume maker AI", tier: 2, status: "operational", sloTarget: 0.99, sloAttainment: 0.993, budgetRemaining: 0.68, p95Ms: 1100, errorRate: 0.006, ownerTeam: "ai-quality", activeAlerts: 0, lastChange: "2026-11-07T12:30:00+05:30", degradedModeActive: false, runbookUrl: "/system/runbooks/resume-maker" },
  { key: "analytics-pipeline", name: "Analytics pipeline", tier: 2, status: "degraded", sloTarget: 0.99, sloAttainment: 0.988, budgetRemaining: 0.44, p95Ms: 2500, errorRate: 0.012, ownerTeam: "data", activeAlerts: 1, lastChange: "2026-11-08T01:00:00+05:30", degradedModeActive: false, runbookUrl: "/system/runbooks/analytics-pipeline" },
];
const alerts = [
  { id: "ALT-001", service: "Payments and billing", rule: "Payment retry latency > 5s", severity: "SEV2", started: "2026-11-08T00:48:00+05:30", duration: "12m", owner: "payments", runbook: "/system/runbooks/payments", incident: "INC-2026-021", state: "firing" },
  { id: "ALT-002", service: "Analytics pipeline", rule: "Event ingestion lag > 10 min", severity: "SEV3", started: "2026-11-08T01:00:00+05:30", duration: "2m", owner: "data", runbook: "/system/runbooks/analytics-pipeline", incident: null, state: "firing" },
  { id: "ALT-003", service: "Practice trainer", rule: "Speech-to-text error rate spike", severity: "SEV3", started: "2026-11-07T23:15:00+05:30", duration: "1h 45m", owner: "ai-quality", runbook: "/system/runbooks/practice-trainer", incident: null, state: "acknowledged" },
];
const incidents = [
  { id: "INC-2026-021", title: "Payment retries delayed", severity: "SEV2", state: "Mitigating", started: "2026-11-08T00:48:00+05:30", duration: "24m", services: "Payments, Payouts", commander: "stf_33", affectedUsers: "~2,400", impact: "Some payments are delayed. Money is safe.", statusPage: "Published", postmortem: "Not required" },
  { id: "INC-2026-020", title: "Search index lag", severity: "SEV3", state: "Resolved", started: "2026-11-07T20:00:00+05:30", duration: "46m", services: "Search and recommendations", commander: "stf_05", affectedUsers: "~890", impact: "Slow search results", statusPage: "Not published", postmortem: "Optional" },
];

function AdminSystemPage() {
  const [refreshing, setRefreshing] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerItem, setDrawerItem] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata", hour12: false }));
  const [activeTab, setActiveTab] = useState("overview");
  const [activeRange, setActiveRange] = useState("24-hours");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSavedViews, setShowSavedViews] = useState(false);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    const t = setTimeout(() => {
      setRefreshing(false);
      setLastUpdated(new Date().toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata", hour12: false }));
      toast("System refreshed");
    }, 800);
    return () => clearTimeout(t);
  }, []);

  const handleDeclareIncident = useCallback(() => {
    toast("Declare incident form opening");
  }, []);

  const handleExport = useCallback(() => {
    toast("Exporting system data (re-authentication required)");
  }, []);

  const handleSearch = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  const filteredServices = useMemo(() => {
    if (!searchQuery) return services;
    const q = searchQuery.toLowerCase();
    return services.filter((s) => s.name.toLowerCase().includes(q) || s.ownerTeam.toLowerCase().includes(q));
  }, [searchQuery]);

  const filteredAlerts = useMemo(() => {
    if (!searchQuery) return alerts;
    const q = searchQuery.toLowerCase();
    return alerts.filter((a) => a.id.toLowerCase().includes(q) || a.rule.toLowerCase().includes(q) || a.service.toLowerCase().includes(q));
  }, [searchQuery]);

  const filteredIncidents = useMemo(() => {
    if (!searchQuery) return incidents;
    const q = searchQuery.toLowerCase();
    return incidents.filter((i) => i.id.toLowerCase().includes(q) || i.title.toLowerCase().includes(q));
  }, [searchQuery]);

  const statusChip = (status) => {
    const map = {
      operational: "operational",
      degraded: "degraded",
      "SEV1": "SEV1",
      "SEV2": "SEV2",
      "SEV3": "SEV3",
      "SEV4": "SEV4",
      investigating: "investigating",
      identified: "identified",
      mitigating: "mitigating",
      monitoring: "monitoring",
      resolved: "resolved",
      "postmortem-due": "postmortem-due",
      closed: "closed",
      firing: "firing",
      acknowledged: "acknowledged",
      muted: "muted",
    };
    return <StatChip status={map[status] || status} />;
  };

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#0F1B2D]">
      <a href="#system-main" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 bg-[#0F1B2D] text-white px-4 py-2">
        Skip to content
      </a>

      <EnvironmentStrip />
      <TopBar onRefresh={handleRefresh} />

      <div className="flex flex-col lg:flex-row" id="system-main">
        <AdminSidebar active="System" />

        <main className="flex-1 min-w-0 pt-6 lg:pt-8 lg:pl-[232px] lg:px-8 pb-24">
          <div className="flex items-center justify-between mb-6 border-b border-solid border-[#E5E1D8] pb-4">
            <div className="flex items-center gap-3">
              <h1 className="text-[28px] font-serif font-semibold">System</h1>
              <StatChip status="operational" />
            </div>
            <div className="flex items-center gap-2">
              <Btn size="small" secondary icon={Menu} onClick={() => setShowSavedViews(!showSavedViews)} title="Saved views" />
              {showSavedViews && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-solid border-[#E5E1D8] rounded-[10px] shadow-lg p-3 z-30">
                  <p className="text-[10px] font-semibold text-[#4A5568] mb-2 uppercase tracking-wide">Saved views</p>
                  <Btn size="small" secondary className="w-full text-left text-[11px]" onClick={() => { setShowSavedViews(false); toast("Loading 'Tier 1 services'"); }}>
                    Tier 1 services
                  </Btn>
                  <Btn size="small" secondary className="w-full text-left text-[11px]" onClick={() => { setShowSavedViews(false); toast("Loading 'Open incidents'"); }}>
                    Open incidents
                  </Btn>
                  <Btn size="small" secondary className="w-full text-left text-[11px]" onClick={() => setShowSavedViews(false)}>
                    My saved views
                  </Btn>
                </div>
              )}
              <Btn size="small" secondary icon={RefreshCcw} onClick={handleRefresh} title="Refresh" />
              <Btn secondary icon={AlertTriangle} onClick={handleDeclareIncident} title="Declare incident">
                Declare incident
              </Btn>
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
                placeholder="Search services, alerts, incidents…"
                className="h-10 rounded-[10px] border border-solid border-[#E5E1D8] bg-white pl-4 pr-10 text-[12px] w-72"
              />
            </div>
            <div className="flex items-end gap-2 text-right">
              <p className="text-[11px] text-[#4A5568]">Updated</p>
              <p className="text-[12px] font-mono text-[#0F1B2D]">{lastUpdated}</p>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-6 mb-6">
            {summaryStrip.map((s, i) => (
              <MetricCard key={i} label={s.label} value={s.value} sub={s.sub} status={s.status} />
            ))}
          </div>

          <TabBar active={activeTab} onChange={setActiveTab} />

          <div className="mt-6">
            {activeTab === "overview" && (
              <>
                <h2 className="text-[15px] font-semibold mb-4">Service grid</h2>
                <p className="text-[12px] text-[#4A5568] mb-4">Every service with status, SLO attainment, error budget and key metric. Tier 1 services are sign-in, payments, job publishing, applications, interviews, offers, data rooms, data rights.</p>
                <div className="grid gap-4 lg:grid-cols-3">
                  {filteredServices.map((s) => (
                    <Card key={s.key} title={s.name} padded className="border-[#E5E1D8]">
                      <div className="px-5 pt-3 pb-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className={`text-[10px] font-medium ${s.status === "operational" ? "text-[#286749]" : s.status === "degraded" ? "text-[#9A6210]" : "text-[#B42318]"}`}>
                              {s.status.charAt(0).toUpperCase() + s.status.slice(1)}
                            </span>
                            <span className="text-[10px] font-medium text-[#4A5568]">Tier {s.tier}</span>
                          </div>
                          {statusChip(s.status)}
                        </div>
                        <div className="grid gap-3 lg:grid-cols-2 text-[11px] text-[#4A5568]">
                          <div>
                            <p className="block mb-1">SLO attainment (30d)</p>
                            <p className="text-[12px] font-medium text-[#0F1B2D]">{(s.sloAttainment * 100).toFixed(2)}%</p>
                          </div>
                          <div>
                            <p className="block mb-1">Error budget remaining</p>
                            <p className={`text-[12px] font-medium ${s.budgetRemaining < 0.5 ? "text-[#B42318]" : "text-[#0F1B2D]"}`}>{(s.budgetRemaining * 100).toFixed(0)}%</p>
                          </div>
                          <div>
                            <p className="block mb-1">p95 latency</p>
                            <p className="text-[12px] font-medium text-[#0F1B2D]">{s.p95Ms} ms</p>
                          </div>
                          <div>
                            <p className="block mb-1">Error rate</p>
                            <p className="text-[12px] font-medium text-[#0F1B2D]">{ (s.errorRate * 100).toFixed(2) }%</p>
                          </div>
                          <div>
                            <p className="block mb-1">Owner</p>
                            <p className="text-[12px] font-medium text-[#0F1B2D]">{s.ownerTeam}</p>
                          </div>
                          <div>
                            <p className="block mb-1">Active alerts</p>
                            <p className="text-[12px] font-medium text-[#0F1B2D]">{s.activeAlerts}</p>
                          </div>
                        </div>
                        <div className="pt-3 border-t border-solid border-[#E5E1D8]/50 flex gap-2">
                          <Btn size="small" secondary onClick={() => setDrawerOpen(true)} title={`View runbook for ${s.name}`}>
                            Runbook
                          </Btn>
                          <Btn size="small" secondary onClick={() => toast(`Opening ${s.name} details`)}>
                            Details
                          </Btn>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                <div className="mt-8">
                  <h2 className="text-[15px] font-semibold mb-3">Change and incident timeline (last 24 hours)</h2>
                  <Card title="Timeline" padded className="border-[#E5E1D8]">
                    <div className="px-5 pt-3 pb-4 space-y-3">
                      <div className="flex items-start gap-3 border-l border-solid border-[#B8955A] pl-4 py-2">
                        <div className="text-[11px] text-[#4A5568]">2026-11-08 00:55 IST</div>
                        <div className="flex-1">
                          <p className="text-[12px] font-medium text-[#0F1B2D]">Deploy: payments service v2.14.0</p>
                          <p className="text-[11px] text-[#4A5568]">Owner: payments · Risk: Standard</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 border-l border-solid border-[#FDF3E0] pl-4 py-2">
                        <div className="text-[11px] text-[#4A5568]">2026-11-08 00:48 IST</div>
                        <div className="flex-1">
                          <p className="text-[12px] font-medium text-[#0F1B2D]">Alert firing: Payment retry latency &gt; 5s</p>
                          <p className="text-[11px] text-[#4A5568]">Severity: SEV2 · Linked to INC-2026-021</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 border-l border-solid border-[#FBE9E7] pl-4 py-2">
                        <div className="text-[11px] text-[#4A5568]">2026-11-08 00:48 IST</div>
                        <div className="flex-1">
                          <p className="text-[12px] font-medium text-[#0F1B2D]">Incident declared: Payment retries delayed</p>
                          <p className="text-[11px] text-[#4A5568]">Commander: stf_33 · Status page: Published</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>

                <div className="mt-8">
                  <h2 className="text-[15px] font-semibold mb-3">User-facing signals (aggregate)</h2>
                  <div className="grid gap-4 lg:grid-cols-3">
                    <Card title="Support ticket spike" titleIcon={MessageCircle} padded className="border-[#E5E1D8]">
                      <div className="px-5 pt-3 pb-4">
                        <div className="flex items-baseline gap-1">
                          <b className="text-[32px] font-serif font-semibold text-[#0F1B2D]">+8%</b>
                          <span className="text-[11px] text-[#286749] font-medium">vs yesterday</span>
                        </div>
                        <p className="text-[12px] text-[#4A5568] mt-2">Aggregate ticket volume across all queues</p>
                      </div>
                    </Card>
                    <Card title="Failed payment rate" titleIcon={AlertCircle} padded className="border-[#E5E1D8]">
                      <div className="px-5 pt-3 pb-4">
                        <div className="flex items-baseline gap-1">
                          <b className="text-[32px] font-serif font-semibold text-[#0F1B2D]">0.4%</b>
                          <span className="text-[11px] text-[#9A6210] font-medium">elevated</span>
                        </div>
                        <p className="text-[12px] text-[#4A5568] mt-2">Payments failing, retrying or delayed</p>
                      </div>
                    </Card>
                    <Card title="Practice session failures" titleIcon={AlertTriangle} padded className="border-[#E5E1D8]">
                      <div className="px-5 pt-3 pb-4">
                        <div className="flex items-baseline gap-1">
                          <b className="text-[32px] font-serif font-semibold text-[#0F1B2D]">12</b>
                          <span className="text-[11px] text-[#4A5568] font-medium">in last hour</span>
                        </div>
                        <p className="text-[12px] text-[#4A5568] mt-2">AI practice sessions that errored out</p>
                      </div>
                    </Card>
                  </div>
                </div>
              </>
            )}

            {activeTab === "services-and-slos" && (
              <>
                <h2 className="text-[15px] font-semibold mb-4">Services and SLOs</h2>
                <p className="text-[12px] text-[#4A5568] mb-4">Service catalog with status, SLO attainment, error budget and key metrics. Filter by tier, status or owner.</p>
                <Card title="Service catalog" titleIcon={Server}>
                  <div className="px-5 pt-3 pb-4 overflow-x-auto">
                    <table className="w-full text-left text-[11px] border-collapse">
                      <thead>
                        <tr className="border-b border-solid border-[#E5E1D8]">
                          {["Service", "Tier", "Status", "SLO attainment", "Error budget", "p95 latency", "Error rate", "Owner", "Alerts", "Last change"].map((h) => (
                            <th key={h} className="pb-3 text-[10px] font-medium text-[#4A5568] uppercase tracking-wide">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {filteredServices.map((s) => (
                          <tr key={s.key} className="border-b border-solid border-[#E5E1D8]/50 last:border-0 hover:bg-[#F3EBDD]/30 transition cursor-pointer" onClick={() => { setDrawerItem(s); setDrawerOpen(true); }}>
                            <td className="py-3 text-[11px] font-medium text-[#0F1B2D]">{s.name}</td>
                            <td className="py-3 text-[11px] text-[#4A5568]">Tier {s.tier}</td>
                            <td className="py-3">{statusChip(s.status)}</td>
                            <td className="py-3 text-[11px] text-[#0F1B2D]">{ (s.sloAttainment * 100).toFixed(2) }%</td>
                            <td className="py-3 text:[11px]">{ (s.budgetRemaining * 100).toFixed(0) }%</td>
                            <td className="py-3 text-[11px] text-[#0F1B2D]">{s.p95Ms} ms</td>
                            <td className="py-3 text-[11px] text-[#0F1B2D]">{ (s.errorRate * 100).toFixed(2) }%</td>
                            <td className="py-3 text-[11px] text-[#4A5568]">{s.ownerTeam}</td>
                            <td className="py-3 text-[11px] text-[#0F1B2D]">{s.activeAlerts}</td>
                            <td className="py-3 text-[11px] text-[#4A5568]">{relativeDate(s.lastChange)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              </>
            )}

            {activeTab === "alerts" && (
              <>
                <h2 className="text-[15px] font-semibold mb-4">Alerts</h2>
                <p className="text-[12px] text-[#4A5568] mb-4">Firing, acknowledged and recent alerts. Acknowledge, mute, escalate or create an incident from any alert.</p>
                <Card title="Alert list" titleIcon={Bell}>
                  <div className="px-5 pt-3 pb-4 overflow-x-auto">
                    <table className="w-full text-left text-[11px] border-collapse">
                      <thead>
                        <tr className="border-b border-solid border-[#E5E1D8]">
                          {["ID", "Service", "Rule", "Severity", "Started", "Duration", "Owner", "State", "Incident"].map((h) => (
                            <th key={h} className="pb-3 text-[10px] font-medium text-[#4A5568] uppercase tracking-wide">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {filteredAlerts.map((a) => (
                          <tr key={a.id} className="border-b border-solid border-[#E5E1D8]/50 last:border-0">
                            <td className="py-3 text-[11px] font-medium text-[#0F1B2D]">{a.id}</td>
                            <td className="py-3 text-[11px] text-[#4A5568]">{a.service}</td>
                            <td className="py-3 text-[11px] text-[#0F1B2D]">{a.rule}</td>
                            <td className="py-3">{statusChip(a.severity)}</td>
                            <td className="py-3 text-[11px] text-[#4A5568]">{new Date(a.started).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", hour12: false })}</td>
                            <td className="py-3 text-[11px] text-[#4A5568]">{a.duration}</td>
                            <td className="py-3 text-[11px] text-[#4A5568]">{a.owner}</td>
                            <td className="py-3">{statusChip(a.state)}</td>
                            <td className="py-3 text-[11px] text-[#4A5568]">{a.incident || "—"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="pt-4 border-t border-solid border-[#E5E1D8]/50 flex gap-2">
                    <Btn size="small" secondary onClick={() => { setDrawerOpen(true); setDrawerItem({ id: "ALT-001", body: "Alert ALT-001 — Payment retry latency &gt; 5s. Severity: SEV2. Started: 00:48 IST. Duration: 12m. Owner: payments. Linked incident: INC-2026-021. Runbook: /system/runbooks/payments." }); }} title="Acknowledge alert">
                      Acknowledge
                    </Btn>
                    <Btn size="small" secondary onClick={() => toast("Muting alert for 4 hours")} title="Mute alert">
                      Mute
                    </Btn>
                    <Btn size="small" secondary onClick={() => toast("Creating incident from alert")} title="Create incident">
                      Create incident
                    </Btn>
                  </div>
                </Card>
              </>
            )}

            {activeTab === "incidents" && (
              <>
                <h2 className="text-[15px] font-semibold mb-4">Incidents</h2>
                <p className="text-[12px] text-[#4A5568] mb-4">Incident list with severity, state, affected services and impact. Declare a new incident from the header.</p>
                <Card title="Incident list" titleIcon={AlertCircle}>
                  <div className="px-5 pt-3 pb-4 overflow-x-auto">
                    <table className="w-full text-left text-[11px] border-collapse">
                      <thead>
                        <tr className="border-b border-solid border-[#E5E1D8]">
                          {["ID", "Title", "Severity", "State", "Started", "Duration", "Services", "Commander", "Affected users", "Status page"].map((h) => (
                            <th key={h} className="pb-3 text-[10px] font-medium text-[#4A5568] uppercase tracking-wide">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {filteredIncidents.map((i) => (
                          <tr key={i.id} className="border-b border-solid border-[#E5E1D8]/50 last:border-0 hover:bg-[#F3EBDD]/30 transition cursor-pointer" onClick={() => { setDrawerItem(i); setDrawerOpen(true); }}>
                            <td className="py-3 text-[11px] font-medium text-[#0F1B2D]">{i.id}</td>
                            <td className="py-3 text-[11px] text-[#0F1B2D]">{i.title}</td>
                            <td className="py-3">{statusChip(i.severity)}</td>
                            <td className="py-3">{statusChip(i.state)}</td>
                            <td className="py-3 text-[11px] text-[#4A5568]">{new Date(i.started).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", hour12: false })}</td>
                            <td className="py-3 text-[11px] text-[#4A5568]">{i.duration}</td>
                            <td className="py-3 text-[11px] text-[#4A5568]">{i.services}</td>
                            <td className="py-3 text-[11px] text-[#4A5568]">{i.commander}</td>
                            <td className="py-3 text-[11px] text-[#4A5568]">{i.affectedUsers}</td>
                            <td className="py-3 text-[11px] text-[#4A5568]">{i.statusPage}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="pt-4 border-t border-solid border-[#E5E1D8]/50">
                    <Btn secondary icon={AlertTriangle} onClick={handleDeclareIncident} title="Declare incident">
                      Declare incident
                    </Btn>
                  </div>
                </Card>
              </>
            )}

            {activeTab === "status-page" && (
              <>
                <h2 className="text-[15px] font-semibold mb-4">Status page</h2>
                <p className="text-[12px] text-[#4A5568] mb-4">Public status page management. Components mapped to user-facing features, active incidents, scheduled maintenance and update history.</p>
                <Card title="Status page components" titleIcon={Globe}>
                  <div className="px-5 pt-3 pb-4 space-y-3">
                    <div className="flex items-center justify-between border-b border-solid border-[#E5E1D8]/50 pb-2">
                      <span className="text-[11px] text-[#4A5568]">Sign in</span>
                      <span className="text-[11px] font-medium text-[#286749]">Operational</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-solid border-[#E5E1D8]/50 pb-2">
                      <span className="text-[11px] text-[#4A5568]">Jobs and applications</span>
                      <span className="text-[11px] font-medium text-[#286749]">Operational</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-solid border-[#E5E1D8]/50 pb-2">
                      <span className="text-[11px] text-[#4A5568]">Interviews and video</span>
                      <span className="text-[11px] font-medium text-[#286749]">Operational</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-solid border-[#E5E1D8]/50 pb-2">
                      <span className="text-[11px] text-[#4A5568]">Mentoring</span>
                      <span className="text-[11px] font-medium text-[#286749]">Operational</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-solid border-[#E5E1D8]/50 pb-2">
                      <span className="text-[11px] text-[#4A5568]">Payments</span>
                      <span className="text-[11px] font-medium text-[#9A6210]">Degraded</span>
                    </div>
                    <div className="flex items-center justify-between pb-2">
                      <span className="text-[11px] text-[#4A5568]">AI practice and resumes</span>
                      <span className="text-[11px] font-medium text-[#286749]">Operational</span>
                    </div>
                  </div>
                </Card>
              </>
            )}

            {activeTab === "on-call-and-runbooks" && (
              <>
                <h2 className="text-[15px] font-semibold mb-4">On-call and runbooks</h2>
                <p className="text-[12px] text-[#4A5568] mb-4">On-call schedule, escalation policies and runbook library by service, alert and scenario.</p>
                <div className="grid gap-4 lg:grid-cols-3">
                  <Card title="On-call schedule" titleIcon={UserRound}>
                    <div className="px-5 pt-3 pb-4 space-y-3">
                      <div className="flex items-center justify-between border-b border-solid border-[#E5E1D8]/50 pb-2">
                        <span className="text-[11px] text-[#4A5568]">Primary — Payments</span>
                        <span className="text-[11px] font-medium text-[#0F1B2D]">stf_33 · Until 08:00 IST</span>
                      </div>
                      <div className="flex items-center justify-between border-b border-solid border-[#E5E1D8]/50 pb-2">
                        <span className="text-[11px] text-[#4A5568]">Secondary — Payments</span>
                        <span className="text-[11px] font-medium text-[#0F1B2D]">stf_44 · Until 08:00 IST</span>
                      </div>
                      <div className="flex items-center justify-between pb-2">
                        <span className="text-[11px] text-[#4A5568]">Escalation</span>
                        <span className="text-[11px] font-medium text-[#0F1B2D]">SRE lead · 15 min timeout</span>
                      </div>
                    </div>
                  </Card>
                  <Card title="Runbooks" titleIcon={ClipboardList}>
                    <div className="px-5 pt-3 pb-4 space-y-3">
                      <div className="flex items-center justify-between border-b border-solid border-[#E5E1D8]/50 pb-2">
                        <span className="text-[11px] text-[#4A5568]">Payments outage</span>
                        <span className="text-[11px] font-medium text-[#0F1B2D]">Last tested: 5 days ago</span>
                      </div>
                      <div className="flex items-center justify-between border-b border-solid border-[#E5E1D8]/50 pb-2">
                        <span className="text-[11px] text-[#4A5568]">Database failover</span>
                        <span className="text-[11px] font-medium text-[#0F1B2D]">Last tested: 12 days ago</span>
                      </div>
                      <div className="flex items-center justify-between pb-2">
                        <span className="text-[11px] text-[#4A5568]">Certificate expiry</span>
                        <span className="text-[11px] font-medium text-[#0F1B2D]">Last tested: 30 days ago</span>
                      </div>
                    </div>
                  </Card>
                  <Card title="Game days" titleIcon={Play}>
                    <div className="px-5 pt-3 pb-4 space-y-3">
                      <div className="flex items-center justify-between border-b border-solid border-[#E5E1D8]/50 pb-2">
                        <span className="text-[11px] text-[#4A5568]">Payments failover exercise</span>
                        <span className="text-[11px] font-medium text-[#0F1B2D]">2 weeks ago · Passed</span>
                      </div>
                      <div className="flex items-center justify-between pb-2">
                        <span className="text-[11px] text-[#4A5568]">Database failover exercise</span>
                        <span className="text-[11px] font-medium text-[#0F1B2D]">3 weeks ago · Passed</span>
                      </div>
                    </div>
                  </Card>
                </div>
              </>
            )}

            {activeTab === "maintenance-and-changes" && (
              <>
                <h2 className="text-[15px] font-semibold mb-4">Maintenance and changes</h2>
                <p className="text-[12px] text-[#4A5568] mb-4">Change calendar, scheduled maintenance, deploy log and change risk review.</p>
                <Card title="Upcoming maintenance" titleIcon={CalendarIcon}>
                  <div className="px-5 pt-3 pb-4 space-y-3">
                    <div className="flex items-center justify-between border-b border-solid border-[#E5E1D8]/50 pb-2">
                      <span className="text-[11px] text-[#4A5568]">Payments migration</span>
                      <span className="text-[11px] font-medium text-[#0F1B2D]">12 Nov · 02:00 IST · 30 min</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-solid border-[#E5E1D8]/50 pb-2">
                      <span className="text-[11px] text-[#4A5568]">Certificate renewal — API gateway</span>
                      <span className="text-[11px] font-medium text-[#0F1B2D]">15 Nov · 03:00 IST · 15 min</span>
                    </div>
                    <div className="flex items-center justify-between pb-2">
                      <span className="text-[11px] text-[#4A5568]">Search index reindex</span>
                      <span className="text-[11px] font-medium text-[#0F1B2D]">20 Nov · 02:00 IST · 60 min</span>
                    </div>
                  </div>
                </Card>
              </>
            )}

            {activeTab === "journeys" && (
              <>
                <h2 className="text-[15px] font-semibold mb-4">Journeys (synthetic monitoring)</h2>
                <p className="text-[12px] text-[#4A5568] mb-4">Scripted end-to-end checks from outside the network, run every few minutes from multiple regions.</p>
                <Card title="Journey checks" titleIcon={Layers}>
                  <div className="px-5 pt-3 pb-4 space-y-3">
                    <div className="flex items-center justify-between border-b border-solid border-[#E5E1D8]/50 pb-2">
                      <span className="text-[11px] text-[#4A5568]">Sign in</span>
                      <span className="text-[11px] font-medium text-[#0F1B2D]">99.9% · 240 ms</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-solid border-[#E5E1D8]/50 pb-2">
                      <span className="text-[11px] text-[#4A5568]">Job search and apply</span>
                      <span className="text-[11px] font-medium text-[#0F1B2D]">99.7% · 1.8 s</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-solid border-[#E5E1D8]/50 pb-2">
                      <span className="text-[11px] text-[#4A5568]">Employer publish job</span>
                      <span className="text-[11px] font-medium text-[#0F1B2D]">99.9% · 950 ms</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-solid border-[#E5E1D8]/50 pb-2">
                      <span className="text-[11px] text-[#4A5568]">Interview join (video)</span>
                      <span className="text-[11px] font-medium text-[#0F1B2D]">99.8% · 1.2 s</span>
                    </div>
                    <div className="flex items-center justify-between pb-2">
                      <span className="text-[11px] text-[#4A5568]">Checkout (sandbox)</span>
                      <span className="text-[11px] font-medium text-[#9A6210]">98.4% · 2.4 s</span>
                    </div>
                  </div>
                </Card>
              </>
            )}

            {activeTab === "capacity-and-cost" && (
              <>
                <h2 className="text-[15px] font-semibold mb-4">Capacity and cost</h2>
                <p className="text-[12px] text-[#4A5568] mb-4">Saturation trends, headroom forecasts and aggregate infrastructure spend.</p>
                <Card title="Capacity" titleIcon={Cpu}>
                  <div className="px-5 pt-3 pb-4 space-y-3">
                    <div className="flex items-center justify-between border-b border-solid border-[#E5E1D8]/50 pb-2">
                      <span className="text-[11px] text-[#4A5568]">CPU saturation</span>
                      <span className="text-[11px] font-medium text-[#0F1B2D]">42% · Headroom: 14 days</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-solid border-[#E5E1D8]/50 pb-2">
                      <span className="text-[11px] text-[#4A5568]">Database connections</span>
                      <span className="text-[11px] font-medium text-[#0F1B2D]">68% · Headroom: 9 days</span>
                    </div>
                    <div className="flex items-center justify-between pb-2">
                      <span className="text-[11px] text-[#4A5568]">Queue depth</span>
                      <span className="text-[11px] font-medium text-[#0F1B2D]">1,240 · Normal</span>
                    </div>
                  </div>
                </Card>
                <Card title="Cost (aggregate)" titleIcon={DollarSign}>
                  <div className="px-5 pt-3 pb-4 space-y-3">
                    <div className="flex items-center justify-between border-b border-solid border-[#E5E1D8]/50 pb-2">
                      <span className="text-[11px] text-[#4A5568]">Infrastructure spend (30d)</span>
                      <span className="text-[11px] font-medium text-[#0F1B2D]">₹4.8L</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-solid border-[#E5E1D8]/50 pb-2">
                      <span className="text-[11px] text-[#4A5568]">Provider spend (30d)</span>
                      <span className="text-[11px] font-medium text-[#0F1B2D]">₹2.1L</span>
                    </div>
                    <div className="flex items-center justify-between pb-2">
                      <span className="text-[11px] text-[#4A5568]">AI cost per practice session</span>
                      <span className="text-[11px] font-medium text-[#0F1B2D]">₹4.20</span>
                    </div>
                  </div>
                </Card>
              </>
            )}

            {activeTab === "resilience" && (
              <>
                <h2 className="text-[15px] font-semibold mb-4">Resilience</h2>
                <p className="text-[12px] text-[#4A5568] mb-4">Backups, recovery, disaster recovery and single points of failure.</p>
                <Card title="Backup and recovery" titleIcon={Archive}>
                  <div className="px-5 pt-3 pb-4 space-y-3">
                    <div className="flex items-center justify-between border-b border-solid border-[#E5E1D8]/50 pb-2">
                      <span className="text-[11px] text-[#4A5568]">Last successful backup</span>
                      <span className="text-[11px] font-medium text-[#0F1B2D]">Today, 02:00 IST</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-solid border-[#E5E1D8]/50 pb-2">
                      <span className="text-[11px] text-[#4A5568]">Last restore test</span>
                      <span className="text-[11px] font-medium text-[#0F1B2D]">7 days ago · Passed</span>
                    </div>
                    <div className="flex items-center justify-between pb-2">
                      <span className="text-[11px] text-[#4A5568]">Cross-region replication</span>
                      <span className="text-[11px] font-medium text-[#286749]">Healthy</span>
                    </div>
                  </div>
                </Card>
              </>
            )}
          </div>

          <div className="mt-8 px-5 lg:px-0 text-center lg:text-left">
            <p className="text-[11px] text-[#4A5568]">
              Everything is traceable — every acknowledgment, mute, incident action, runbook step and status update writes to the append-only audit log. Sensitive actions fail closed if logging fails.
            </p>
          </div>
        </main>
      </div>

      {drawerOpen && drawerItem && (
        <DetailDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title={`Detail: ${drawerItem.name || drawerItem.title || drawerItem.id}`}>
          <div className="space-y-5">
            {drawerItem.body ? (
              <p className="text-[12px] text-[#4A5568]">{drawerItem.body}</p>
            ) : (
              <div className="grid gap-4 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <h4 className="text-[11px] font-semibold text-[#4A5568] uppercase tracking-wide mb-2">Service</h4>
                  <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">Key:</b> {drawerItem.key}</p>
                  <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">Tier:</b> {drawerItem.tier}</p>
                  <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">Status:</b> {statusChip(drawerItem.status)}</p>
                  <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">Owner:</b> {drawerItem.ownerTeam}</p>
                  <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">Runbook:</b> {drawerItem.runbookUrl}</p>
                </div>
                <div>
                  <h4 className="text-[11px] font-semibold text-[#4A5568] uppercase tracking-wide mb-2">SLO & metrics</h4>
                  <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">SLO target:</b> {(drawerItem.sloTarget * 100).toFixed(3)}%</p>
                  <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">Attainment (30d):</b> {(drawerItem.sloAttainment * 100).toFixed(2)}%</p>
                  <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">Error budget:</b> {(drawerItem.budgetRemaining * 100).toFixed(0)}%</p>
                  <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">p95 latency:</b> {drawerItem.p95Ms} ms</p>
                  <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">Error rate:</b> {(drawerItem.errorRate * 100).toFixed(2)}%</p>
                  <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">Active alerts:</b> {drawerItem.activeAlerts}</p>
                </div>
              </div>
            )}
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

export { AdminSystemPage };
