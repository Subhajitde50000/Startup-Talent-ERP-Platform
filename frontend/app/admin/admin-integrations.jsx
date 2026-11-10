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
const rangeFilters = [
  { key: "24-hours", label: "Last 24 hours" },
  { key: "7-days", label: "Last 7 days" },
  { key: "30-days", label: "Last 30 days" },
  { key: "90-days", label: "Last 90 days" },
  { key: "custom", label: "Custom range" },
];
const summaryStrip = [
  { label: "Providers", value: "14", status: "all", sub: "Across all categories" },
  { label: "Degraded", value: "2", status: "degraded", sub: "Payments, Analytics pipeline" },
  { label: "Credentials expiring", value: "3", status: "expiring-credentials", sub: "In 30 days" },
  { label: "Webhook failures (24h)", value: "12", status: "firing", sub: "Dead-letter queue: 3" },
  { label: "Failovers active", value: "1", status: "failed-over", sub: "UPI → provider B" },
];
const providers = [
  { id: "prv_kyc_01", name: "Identity verification (KYC)", category: "identity_verification", criticality: "critical", status: "healthy", region: "IN", dpaStatus: "current", quotaUsed: 0.62, nextRotation: "2027-01-15", ownerTeam: "trust", fallback: "manual_review" },
  { id: "prv_pay_01", name: "Payments gateway", category: "payments", criticality: "critical", status: "degraded", region: "IN", dpaStatus: "current", quotaUsed: 0.78, nextRotation: "2026-12-10", ownerTeam: "payments", fallback: "provider_b" },
  { id: "prv_email_01", name: "Email delivery", category: "communications", criticality: "important", status: "healthy", region: "IN", dpaStatus: "current", quotaUsed: 0.45, nextRotation: "2027-03-01", ownerTeam: "platform", fallback: "queue" },
  { id: "prv_sms_01", name: "SMS delivery", category: "communications", criticality: "important", status: "healthy", region: "IN", dpaStatus: "current", quotaUsed: 0.31, nextRotation: "2027-02-15", ownerTeam: "platform", fallback: "email" },
  { id: "prv_video_01", name: "Managed video (WebRTC)", category: "video_realtime", criticality: "critical", status: "healthy", region: "IN", dpaStatus: "current", quotaUsed: 0.52, nextRotation: "2027-01-20", ownerTeam: "product", fallback: "text_only" },
  { id: "prv_ai_01", name: "Language model provider", category: "ai_speech", criticality: "critical", status: "healthy", region: "EU", dpaStatus: "current", quotaUsed: 0.67, nextRotation: "2026-12-20", ownerTeam: "ai-quality", fallback: "degraded_mode" },
  { id: "prv_stt_01", name: "Speech-to-text", category: "ai_speech", criticality: "important", status: "degraded", region: "EU", dpaStatus: "current", quotaUsed: 0.71, nextRotation: "2026-12-05", ownerTeam: "ai-quality", fallback: "text_only" },
  { id: "prv_esign_01", name: "E-signature", category: "documents_signing", criticality: "important", status: "healthy", region: "IN", dpaStatus: "current", quotaUsed: 0.28, nextRotation: "2027-04-01", ownerTeam: "legal", fallback: "manual" },
  { id: "prv_cloud_01", name: "Cloud hosting", category: "infrastructure", criticality: "critical", status: "healthy", region: "IN", dpaStatus: "current", quotaUsed: 0.55, nextRotation: "2027-06-01", ownerTeam: "platform", fallback: "multi_region" },
  { id: "prv_search_01", name: "Search service", category: "search_analytics", criticality: "important", status: "healthy", region: "IN", dpaStatus: "current", quotaUsed: 0.39, nextRotation: "2027-05-15", ownerTeam: "product", fallback: "recent_list" },
];
const webhooks = [
  { id: "wh_001", provider: "Payments gateway", endpoint: "/webhooks/payments", signature: "HMAC-SHA256", deliveryRate: 99.8, failures: 2, latency: "140ms", deadLetter: 0 },
  { id: "wh_002", provider: "Identity verification", endpoint: "/webhooks/kyc", signature: "JWT", deliveryRate: 99.5, failures: 5, latency: "220ms", deadLetter: 3 },
  { id: "wh_003", provider: "Email delivery", endpoint: "/webhooks/email", signature: "HMAC-SHA256", deliveryRate: 99.9, failures: 1, latency: "80ms", deadLetter: 0 },
];
const failoverPlaybooks = [
  { id: "fp_001", name: "Switch UPI to provider B", capability: "Payments - UPI", primary: "Payments gateway", fallback: "Provider B", status: "active", approvedBy: "Finance + Engineering", autoExpiry: "24 hours", lastTested: "2 weeks ago" },
  { id: "fp_002", name: "Disable video recording", capability: "Video - Recording", primary: "Managed video", fallback: "Text-only mode", status: "standby", approvedBy: "On-call (pre-approved)", autoExpiry: "8 hours", lastTested: "1 month ago" },
  { id: "fp_003", name: "KYC to manual review", capability: "Identity - Verification", primary: "KYC provider", fallback: "Manual review", status: "standby", approvedBy: "Trust + Compliance", autoExpiry: "48 hours", lastTested: "3 weeks ago" },
];



const credentials = [
  { name: "pay_gateway_prod", provider: "payments-gateway", owner: "payments", status: "active", expires: "2026-12-15", lastRotated: "2026-11-01" },
  { name: "email_api_key", provider: "email-provider", owner: "platform", status: "active", expires: "2027-03-20", lastRotated: "2026-10-05" },
  { name: "sms_api_secret", provider: "sms-provider", owner: "platform", status: "expiring", expires: "2026-12-08", lastRotated: "2026-09-08" },
  { name: "esign_client_secret", provider: "e-signature", owner: "legal", status: "active", expires: "2027-06-10", lastRotated: "2026-11-01" },
];







function AdminIntegrationsPage() {
  const [refreshing, setRefreshing] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerItem, setDrawerItem] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata", hour12: false }));
  const [activeTab, setActiveTab] = useState("providers");
  const [activeRange, setActiveRange] = useState("24-hours");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSavedViews, setShowSavedViews] = useState(false);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    const t = setTimeout(() => {
      setRefreshing(false);
      setLastUpdated(new Date().toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata", hour12: false }));
      toast("Integrations refreshed");
    }, 800);
    return () => clearTimeout(t);
  }, []);

  const handleExport = useCallback(() => {
    toast("Exporting integration data (re-authentication required)");
  }, []);

  const handleSearch = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  const filteredProviders = useMemo(() => {
    if (!searchQuery) return providers;
    const q = searchQuery.toLowerCase();
    return providers.filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.ownerTeam.toLowerCase().includes(q));
  }, [searchQuery]);

  const filteredCredentials = useMemo(() => {
    if (!searchQuery) return credentials;
    const q = searchQuery.toLowerCase();
    return credentials.filter((c) => c.name.toLowerCase().includes(q) || c.provider.toLowerCase().includes(q) || c.owner.toLowerCase().includes(q));
  }, [searchQuery]);

  const filteredWebhooks = useMemo(() => {
    if (!searchQuery) return webhooks;
    const q = searchQuery.toLowerCase();
    return webhooks.filter((w) => w.provider.toLowerCase().includes(q) || w.endpoint.toLowerCase().includes(q));
  }, [searchQuery]);

  const statusChip = (status) => {
    const map = {
      healthy: "healthy",
      degraded: "degraded",
      down: "down",
      "failed-over": "failed-over",
      "sandbox-only": "sandbox-only",
      "expiring-credentials": "expiring-credentials",
      critical: "critical",
      important: "important",
      optional: "optional",
    };
    return <StatChip status={map[status] || status} />;
  };

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#0F1B2D]">
      <a href="#integrations-main" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 bg-[#0F1B2D] text-white px-4 py-2">
        Skip to content
      </a>

      <EnvironmentStrip />
      <TopBar onRefresh={handleRefresh} />

      <div className="flex flex-col lg:flex-row" id="integrations-main">
        <AdminSidebar active="Integrations" />

        <main className="flex-1 min-w-0 pt-6 lg:pt-8 lg:pl-[232px] lg:px-8 pb-24">
          <div className="flex items-center justify-between mb-6 border-b border-solid border-[#E5E1D8] pb-4">
            <div>
              <h1 className="text-[28px] font-serif font-semibold">Integrations and Providers</h1>
              <p className="text-[12px] text-[#4A5568] mt-1">
                Registry and health of every external provider, credentials and webhooks, failover, API clients
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Btn size="small" secondary icon={Menu} onClick={() => setShowSavedViews(!showSavedViews)} title="Saved views" />
              {showSavedViews && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-solid border-[#E5E1D8] rounded-[10px] shadow-lg p-3 z-30">
                  <p className="text-[10px] font-semibold text-[#4A5568] mb-2 uppercase tracking-wide">Saved views</p>
                  <Btn size="small" secondary className="w-full text-left text-[11px]" onClick={() => { setShowSavedViews(false); toast("Loading 'Critical providers'"); }}>
                    Critical providers
                  </Btn>
                  <Btn size="small" secondary className="w-full text-left text-[11px]" onClick={() => { setShowSavedViews(false); toast("Loading 'Expiring credentials'"); }}>
                    Expiring credentials
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
                placeholder="Search providers, credentials, webhooks…"
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
            {activeTab === "providers" && (
              <>
                <h2 className="text-[15px] font-semibold mb-4">Provider registry</h2>
                <p className="text-[12px] text-[#4A5568] mb-4">Every provider with category, criticality, status, region, DPA status and fallback mode.</p>
                <Card title="Providers" titleIcon={Server}>
                  <div className="px-5 pt-3 pb-4 overflow-x-auto">
                    <table className="w-full text-left text-[11px] border-collapse">
                      <thead>
                        <tr className="border-b border-solid border-[#E5E1D8]">
                          {["ID", "Provider", "Category", "Criticality", "Status", "Region", "DPA", "Quota", "Next rotation", "Owner", "Fallback"].map((h) => (
                            <th key={h} className="pb-3 text-[10px] font-medium text-[#4A5568] uppercase tracking-wide">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {filteredProviders.map((p) => (
                          <tr key={p.id} className="border-b border-solid border-[#E5E1D8]/50 last:border-0 hover:bg-[#F3EBDD]/30 transition cursor-pointer" onClick={() => { setDrawerItem(p); setDrawerOpen(true); }}>
                            <td className="py-3 text-[11px] font-medium text-[#0F1B2D]">{p.id}</td>
                            <td className="py-3 text-[11px] text-[#4A5568]">{p.name}</td>
                            <td className="py-3 text-[11px] text-[#4A5568]">{p.category.replace(/_/g, " ")}</td>
                            <td className="py-3">{statusChip(p.criticality)}</td>
                            <td className="py-3">{statusChip(p.status)}</td>
                            <td className="py-3 text-[11px] text-[#4A5568]">{p.region}</td>
                            <td className="py-3">{statusChip(p.dpaStatus === "current" ? "certified" : "needs-attention")}</td>
                            <td className="py-3 text-[11px] text-[#4A5568]">${(p.quotaUsed * 100).toFixed(0)}%</td>
                            <td className="py-3 text-[11px] text-[#4A5568]">{p.nextRotation}</td>
                            <td className="py-3 text-[11px] text-[#4A5568]">{p.ownerTeam}</td>
                            <td className="py-3 text-[11px] text-[#4A5568]">{p.fallback.replace(/_/g, " ")}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              </>
            )}

            {activeTab === "health-and-quotas" && (
              <>
                <h2 className="text-[15px] font-semibold mb-4">Health and quotas</h2>
                <p className="text-[12px] text-[#4A5568] mb-4">Provider health, latency, error rate and quota consumption with alerts at 70/85/95%.</p>
                <Card title="Provider health table" titleIcon={Gauge}>
                  <div className="px-5 pt-3 pb-4 overflow-x-auto">
                    <table className="w-full text-left text-[11px] border-collapse">
                      <thead>
                        <tr className="border-b border-solid border-[#E5E1D8]">
                          {["Provider", "Status", "Latency", "Error rate", "Quota used", "Trend", "Last call"].map((h) => (
                            <th key={h} className="pb-3 text-[10px] font-medium text-[#4A5568] uppercase tracking-wide">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {filteredProviders.map((p) => (
                          <tr key={p.id} className="border-b border-solid border-[#E5E1D8]/50 last:border-0">
                            <td className="py-3 text-[11px] text-[#4A5568]">{p.name}</td>
                            <td className="py-3">{statusChip(p.status)}</td>
                            <td className="py-3 text-[11px] text-[#4A5568]">${Math.round(100 + Math.random() * 200)} ms</td>
                            <td className="py-3 text-[11px] text-[#4A5568]">${(Math.random() * 2).toFixed(2)}%</td>
                            <td className="py-3 text-[11px] text-[#4A5568]">${(p.quotaUsed * 100).toFixed(0)}%</td>
                            <td className="py-3 text-[11px] text-[#4A5568]">Stable</td>
                            <td className="py-3 text-[11px] text-[#4A5568]">${relativeDate(p.nextRotation)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              </>
            )}

            {activeTab === "credentials-and-rotation" && (
              <>
                <h2 className="text-[15px] font-semibold mb-4">Credentials and rotation</h2>
                <p className="text-[12px] text-[#4A5568] mb-4">Credential inventory (no values shown). Rotation uses the vault with overlap and automatic revocation.</p>
                <Card title="Credential inventory" titleIcon={KeyIcon}>
                  <div className="px-5 pt-3 pb-4 overflow-x-auto">
                    <table className="w-full text-left text-[11px] border-collapse">
                      <thead>
                        <tr className="border-b border-solid border-[#E5E1D8]">
                          {["Name", "Provider", "Type", "Scope", "Environment", "Owner", "Created", "Last rotated", "Next rotation", "Status"].map((h) => (
                            <th key={h} className="pb-3 text-[10px] font-medium text-[#4A5568] uppercase tracking-wide">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {filteredCredentials.map((c) => (
                          <tr key={c.name} className="border-b border-solid border-[#E5E1D8]/50 last:border-0">
                            <td className="py-3 text-[11px] font-medium text-[#0F1B2D]">{c.name}</td>
                            <td className="py-3 text-[11px] text-[#4A5568]">{c.provider}</td>
                            <td className="py-3 text-[11px] text-[#4A5568]">{c.type}</td>
                            <td className="py-3 text-[11px] text-[#4A5568]">{c.scope}</td>
                            <td className="py-3 text-[11px] text-[#4A5568]">{c.environment}</td>
                            <td className="py-3 text-[11px] text-[#4A5568]">{c.owner}</td>
                            <td className="py-3 text-[11px] text-[#4A5568]">{c.created}</td>
                            <td className="py-3 text-[11px] text-[#4A5568]">{c.lastRotated}</td>
                            <td className="py-3 text-[11px] text-[#4A5568]">{c.nextRotation}</td>
                            <td className="py-3">{statusChip(c.status)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="pt-4 border-t border-solid border-[#E5E1D8]/50">
                    <Btn secondary onClick={() => toast("Opening credential rotation flow")} title="Rotate credential">
                      Rotate credential
                    </Btn>
                  </div>
                </Card>
              </>
            )}

            {activeTab === "webhooks-and-events" && (
              <>
                <h2 className="text-[15px] font-semibold mb-4">Webhooks and events</h2>
                <p className="text-[12px] text-[#4A5568] mb-4">Inbound webhooks from providers with signature verification, delivery rates and dead-letter queue.</p>
                <Card title="Inbound webhooks" titleIcon={Link2Icon}>
                  <div className="px-5 pt-3 pb-4 overflow-x-auto">
                    <table className="w-full text-left text-[11px] border-collapse">
                      <thead>
                        <tr className="border-b border-solid border-[#E5E1D8]">
                          {["ID", "Provider", "Endpoint", "Signature", "Delivery rate", "Failures", "Latency", "Dead letter"].map((h) => (
                            <th key={h} className="pb-3 text-[10px] font-medium text-[#4A5568] uppercase tracking-wide">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {filteredWebhooks.map((w) => (
                          <tr key={w.id} className="border-b border-solid border-[#E5E1D8]/50 last:border-0">
                            <td className="py-3 text-[11px] font-medium text-[#0F1B2D]">{w.id}</td>
                            <td className="py-3 text-[11px] text-[#4A5568]">{w.provider}</td>
                            <td className="py-3 text-[11px] text-[#4A5568]">{w.endpoint}</td>
                            <td className="py-3 text-[11px] text-[#4A5568]">{w.signature}</td>
                            <td className="py-3 text-[11px] text-[#4A5568]">${w.deliveryRate}%</td>
                            <td className="py-3 text-[11px] text-[#4A5568]">{w.failures}</td>
                            <td className="py-3 text-[11px] text-[#4A5568]">{w.latency}</td>
                            <td className="py-3 text-[11px] text-[#4A5568]">{w.deadLetter}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              </>
            )}

            {activeTab === "failover-and-routing" && (
              <>
                <h2 className="text-[15px] font-semibold mb-4">Failover and routing</h2>
                <p className="text-[12px] text-[#4A5568] mb-4">Pre-approved playbooks for provider failover with impact preview and one-click revert.</p>
                <Card title="Failover playbooks" titleIcon={Layers}>
                  <div className="px-5 pt-3 pb-4 space-y-3">
                    {failoverPlaybooks.map((fp) => (
                      <div key={fp.id} className="flex items-center justify-between border-b border-solid border-[#E5E1D8]/50 pb-3 last:border-0 last:pb-0">
                        <div className="flex items-center gap-3">
                          <span className="text-[11px] font-medium text-[#0F1B2D]">{fp.name}</span>
                          <span className="text-[11px] text-[#4A5568]">{fp.capability}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <StatChip status={fp.status === "active" ? "failed-over" : "standby"} />
                          <Btn size="small" secondary onClick={() => toast(`Running playbook: ${fp.name}`)} title="Run playbook">
                            Run
                          </Btn>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </>
            )}

            {activeTab === "customer-integrations" && (
              <>
                <h2 className="text-[15px] font-semibold mb-4">Customer integrations</h2>
                <p className="text-[12px] text-[#4A5568] mb-4">OAuth apps, API clients and webhooks exposed to customers and partners.</p>
                <Card title="API clients" titleIcon={UsersIcon}>
                  <div className="px-5 pt-3 pb-4 space-y-3">
                    <div className="flex items-center justify-between border-b border-solid border-[#E5E1D8]/50 pb-2">
                      <span className="text-[11px] text-[#4A5568]">Employer calendar sync</span>
                      <span className="text-[11px] font-medium text-[#0F1B2D]">Active · 3 clients</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-solid border-[#E5E1D8]/50 pb-2">
                      <span className="text-[11px] text-[#4A5568]">Partner e-signature</span>
                      <span className="text-[11px] font-medium text-[#0F1B2D]">Pending review · 1 client</span>
                    </div>
                    <div className="flex items-center justify-between pb-2">
                      <span className="text-[11px] text-[#4A5568]">API key access</span>
                      <span className="text:[11px] font-medium text-[#0F1B2D]">Active · 8 clients</span>
                    </div>
                  </div>
                </Card>
              </>
            )}

            {activeTab === "costs-and-contracts" && (
              <>
                <h2 className="text-[15px] font-semibold mb-4">Costs and contracts</h2>
                <p className="text-[12px] text-[#4A5568] mb-4">Spend by provider, unit costs, budgets and contract end dates.</p>
                <Card title="Provider spend" titleIcon={DollarSign}>
                  <div className="px-5 pt-3 pb-4 space-y-3">
                    <div className="flex items-center justify-between border-b border-solid border-[#E5E1D8]/50 pb-2">
                      <span className="text-[11px] text-[#4A5568]">Payments gateway</span>
                      <span className="text-[11px] font-medium text-[#0F1B2D]">₹1.8L / mo</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-solid border-[#E5E1D8]/50 pb-2">
                      <span className="text-[11px] text-[#4A5568]">Language model</span>
                      <span className="text-[11px] font-medium text-[#0F1B2D]">₹95K / mo</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-solid border-[#E5E1D8]/50 pb-2">
                      <span className="text-[11px] text-[#4A5568]">Email delivery</span>
                      <span className="text-[11px] font-medium text-[#0F1B2D]">₹22K / mo</span>
                    </div>
                    <div className="flex items-center justify-between pb-2">
                      <span className="text-[11px] text-[#4A5568]">Identity verification</span>
                      <span className="text-[11px] font-medium text-[#0F1B2D]">₹68K / mo</span>
                    </div>
                  </div>
                </Card>
              </>
            )}

            {activeTab === "change-log" && (
              <>
                <h2 className="text-[15px] font-semibold mb-4">Change log</h2>
                <p className="text-[12px] text-[#4A5568] mb-4">Provider changes, credential rotations, routing overrides and failover events.</p>
                <Card title="Recent changes" titleIcon={GitMerge}>
                  <div className="px-5 pt-3 pb-4 space-y-3">
                    <div className="flex items-start gap-3 border-b border-solid border-[#E5E1D8]/50 pb-3">
                      <div className="text-[11px] text-[#4A5568]">2026-11-07 23:00 IST</div>
                      <div className="flex-1">
                        <p className="text-[12px] font-medium text-[#0F1B2D]">Credential rotation: pay_gateway_prod</p>
                        <p className="text-[11px] text-[#4A5568]">Owner: payments · Status: Completed</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 border-b border-solid border-[#E5E1D8]/50 pb-3">
                      <div className="text-[11px] text-[#4A5568]">2026-11-07 20:15 IST</div>
                      <div className="flex-1">
                        <p className="text-[12px] font-medium text-[#0F1B2D]">Failover: UPI → provider B</p>
                        <p className="text-[11px] text-[#4A5568]">Trigger: Payments gateway degraded · Auto-expires: 24h</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 pb-3">
                      <div className="text-[11px] text-[#4A5568]">2026-11-06 14:00 IST</div>
                      <div className="flex-1">
                        <p className="text-[12px] font-medium text-[#0F1B2D]">Webhook retry: wh_002 (KYC)</p>
                        <p className="text-[11px] text-[#4A5568]">Status: Replayed successfully · 3 events</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </>
            )}
          </div>

          <div className="mt-8 px-5 lg:px-0 text-center lg:text-left">
            <p className="text-[11px] text-[#4A5568]">
              No endpoint or screen ever shows credential values. Rotation uses the vault with overlap and automatic revocation. Overdue critical credentials page the security administrator.
            </p>
          </div>
        </main>
      </div>

      {drawerOpen && drawerItem && (
        <DetailDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title={`Provider: ${drawerItem.name || drawerItem.id}`}>
          <div className="space-y-5">
            <div className="grid gap-4 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <h4 className="text-[11px] font-semibold text-[#4A5568] uppercase tracking-wide mb-2">Provider</h4>
                <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">ID:</b> {drawerItem.id}</p>
                <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">Category:</b> {drawerItem.category.replace(/_/g, " ")}</p>
                <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">Criticality:</b> {statusChip(drawerItem.criticality)}</p>
                <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">Status:</b> {statusChip(drawerItem.status)}</p>
                <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">Region:</b> {drawerItem.region}</p>
                <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">DPA status:</b> {drawerItem.dpaStatus}</p>
                <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">Owner:</b> {drawerItem.ownerTeam}</p>
                <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">Fallback:</b> {drawerItem.fallback.replace(/_/g, " ")}</p>
              </div>
              <div>
                <h4 className="text-[11px] font-semibold text-[#4A5568] uppercase tracking-wide mb-2">Quota & credentials</h4>
                <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">Quota used:</b> {(drawerItem.quotaUsed * 100).toFixed(0)}%</p>
                <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">Next rotation:</b> {drawerItem.nextRotation}</p>
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

export { AdminIntegrationsPage };
