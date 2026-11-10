"use client";
import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import {
  Bell,
  AlertTriangle,
  ShieldAlert as ShieldAlertIcon,
  ShieldCheck,
  Activity as ActivityIcon,
  Monitor as MonitorIcon,
  File as FileIcon,
  Clock as ClockIcon,
  Copy,
  X,
  Loader2 as LoaderIcon,
  CheckCircle2,
  Banknote,
  User as UserIcon,
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

const notificationTabs = [
  { key: "all", label: "All" },
  { key: "needs-action", label: "Needs action" },
  { key: "approvals", label: "Approvals" },
  { key: "mentions", label: "Mentions" },
  { key: "queues-slas", label: "Queues and SLAs" },
  { key: "security-access", label: "Security and access" },
  { key: "compliance-incidents", label: "Compliance and incidents" },
  { key: "system", label: "System" },
  { key: "digest", label: "Digest" },
];

const notificationCategories = {
  queues: { icon: ActivityIcon, label: "Queues and SLAs", color: INFO },
  approvals: { icon: Banknote, label: "Approvals", color: WARNING },
  mentions: { icon: UserIcon, label: "Mentions", color: STONE_700 },
  security: { icon: ShieldAlertIcon, label: "Security and access", color: ERROR },
  compliance: { icon: ShieldCheck, label: "Compliance and incidents", color: GOLD },
  system: { icon: MonitorIcon, label: "System", color: STONE_400 },
  wellbeing: { icon: ActivityIcon, label: "Wellbeing", color: SUCCESS },
};

const notifications = [
  {
    id: "ntf_01JD9K",
    severity: "action_needed",
    category: "approvals",
    title: "Approval needed: PB-2026-11-10",
    detail: "Payout batch awaiting second approval",
    target: { type: "payout_batch", id: "PB-2026-11-10", link: "/payouts/batches/PB-2026-11-10" },
    createdAt: "2026-11-08T09:20:00+05:30",
    state: "new",
    requiresAck: false,
    dedupeKey: "approval:PB-2026-11-10:fin_mgr",
  },
  {
    id: "ntf_01JD9L",
    severity: "urgent",
    category: "security",
    title: "New sign-in from unknown device",
    detail: "Sign-in from a new device in Kolkata",
    target: { type: "session", id: "sess_441", link: "/settings/security" },
    createdAt: "2026-11-08T08:45:00+05:30",
    state: "new",
    requiresAck: true,
    dedupeKey: "signin:new_device:stf_17",
  },
  {
    id: "ntf_01JD9M",
    severity: "action_needed",
    category: "queues",
    title: "4 verification cases at risk",
    detail: "Queue SLA approaching breach",
    target: { type: "queue", id: "verification", link: "/admin/verifications" },
    createdAt: "2026-11-08T07:15:00+05:30",
    state: "new",
    requiresAck: false,
    dedupeKey: "queue:verification:at_risk",
  },
  {
    id: "ntf_01JD9N",
    severity: "info",
    category: "mentions",
    title: "@mention in incident note",
    detail: "You were mentioned in an internal note",
    target: { type: "incident", id: "INC-2026-021", link: "/admin/system" },
    createdAt: "2026-11-07T22:30:00+05:30",
    state: "acknowledged",
    requiresAck: false,
    dedupeKey: "mention:INC-2026-021:stf_17",
  },
  {
    id: "ntf_01JD9O",
    severity: "critical",
    category: "compliance",
    title: "Breach clock running",
    detail: "Data breach notification clock active",
    target: { type: "incident", id: "BR-2026-004", link: "/admin/compliance" },
    createdAt: "2026-11-07T20:00:00+05:30",
    state: "new",
    requiresAck: true,
    dedupeKey: "breach:BR-2026-004",
  },
  {
    id: "ntf_01JD9P",
    severity: "info",
    category: "system",
    title: "Maintenance window scheduled",
    detail: "Payments migration on 12 Nov · 02:00 IST",
    target: { type: "maintenance", id: "maint_12nov", link: "/admin/system" },
    createdAt: "2026-11-07T18:00:00+05:30",
    state: "resolved",
    requiresAck: false,
    dedupeKey: "maint:12nov",
  },
  {
    id: "ntf_01JD9Q",
    severity: "action_needed",
    category: "queues",
    title: "Item returned to you",
    detail: "Verification case returned for re-review",
    target: { type: "case", id: "VER-2026-004812", link: "/admin/verifications" },
    createdAt: "2026-11-07T15:45:00+05:30",
    state: "new",
    requiresAck: false,
    dedupeKey: "case:VER-2026-004812:returned",
  },
  {
    id: "ntf_01JD9R",
    severity: "info",
    category: "system",
    title: "Config change affecting your queue",
    detail: "Policy rule update for verification queue",
    target: { type: "config", id: "cfg_verify_v3", link: "/admin/config" },
    createdAt: "2026-11-07T14:00:00+05:30",
    state: "read",
    requiresAck: false,
    dedupeKey: "config:verify_v3",
  },
];

const summaryStrip = [
  { label: "Needs action", value: "6", status: "action_needed", sub: "Items requiring your attention" },
  { label: "Approvals waiting on you", value: "2", status: "action_needed", sub: "Warning when above zero" },
  { label: "Mentions", value: "3", status: "new", sub: "You were mentioned in notes" },
  { label: "Critical or urgent open", value: "0", status: "operational", sub: "SEV1 and Critical highlighted" },
];

function SeverityChip({ severity }) {
  const map = {
    critical: `border-[#FBE9E7] bg-[#FBE9E7] text-[#B42318]`,
    urgent: `border-[#FDF3E0] bg-[#FDF3E0] text-[#9A6210]`,
    action_needed: `border-[#FDF3E0] bg-[#FDF3E0] text-[#9A6210]`,
    info: `border-[#E8F0F8] text-[#2F5D8A]`,
    digest: `border-[#E5E1D8] text-[#4A5568]`,
  };
  const label =
    severity === "critical" ? "Critical" :
    severity === "urgent" ? "Urgent" :
    severity === "action_needed" ? "Action needed" :
    severity === "info" ? "Info" :
    severity === "digest" ? "Digest" :
    severity;
  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium ${map[severity] || map.info}`}>
      {label}
    </span>
  );
}

function StateChip({ state }) {
  const map = {
    new: `border-[#E5E1D8] text-[#4A5568]`,
    acknowledged: `border-[#E5E1D8] text-[#0F1B2D]`,
    snoozed: `border-[#E5E1D8] text-[#4A5568]`,
    resolved: `border-[#E7F3EC] text-[#286749]`,
    expired: `border-[#E5E1D8] text-[#4A5568]`,
    read: `border-[#E5E1D8] text-[#4A5568]`,
  };
  const label =
    state === "new" ? "New" :
    state === "acknowledged" ? "Acknowledged" :
    state === "snoozed" ? "Snoozed" :
    state === "resolved" ? "Resolved" :
    state === "expired" ? "Expired" :
    state === "read" ? "Read" :
    state;
  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium ${map[state] || map.new}`}>
      {label}
    </span>
  );
}

function categoryIcon(category) {
  const info = notificationCategories[category] || notificationCategories.system;
  return info.icon;
}

export function AdminNotificationsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [snoozeAll, setSnoozeAll] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [drawerItem, setDrawerItem] = useState(null);
  const [markAllRead, setMarkAllRead] = useState(false);
  const [loading, setLoading] = useState(false);

  const filtered = useMemo(() => {
    if (activeTab === "all") return notifications;
    return notifications.filter((n) => {
      if (activeTab === "approvals") return n.category === "approvals";
      if (activeTab === "mentions") return n.category === "mentions";
      if (activeTab === "queues-slas") return n.category === "queues";
      if (activeTab === "security-access") return n.category === "security";
      if (activeTab === "compliance-incidents") return n.category === "compliance";
      if (activeTab === "system") return n.category === "system";
      if (activeTab === "needs-action") return n.state === "new" || n.state === "acknowledged";
      if (activeTab === "digest") return n.severity === "digest";
      return true;
    });
  }, [activeTab]);

  const handleMarkAllRead = useCallback(() => {
    setMarkAllRead(true);
    toast("All notifications marked as read");
    setTimeout(() => setMarkAllRead(false), 800);
  }, []);

  const handleSnoozeAll = useCallback((hours) => {
    setSnoozeAll(true);
    toast(`Non-urgent notifications snoozed for ${hours} hours`);
    setTimeout(() => setSnoozeAll(false), 800);
  }, []);

  const handleAck = useCallback((id) => {
    toast(`Notification ${id} acknowledged`);
  }, []);

  const handleOpen = useCallback((target) => {
    toast(`Opening ${target.type}: ${target.id}`);
  }, []);

  const handleSnooze = useCallback((id, hours) => {
    toast(`Notification snoozed for ${hours} hours`);
  }, []);

  const handleMute = useCallback((id) => {
    toast(`Notification type muted`);
  }, []);

  const handleCopyId = useCallback((id) => {
    toast(`ID ${id} copied`);
  }, []);

  const groupByDay = useCallback((items) => {
    const groups = {};
    items.forEach((item) => {
      const day = new Date(item.createdAt).toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata", weekday: "long", year: "numeric", month: "long", day: "numeric" });
      if (!groups[day]) groups[day] = [];
      groups[day].push(item);
    });
    return Object.entries(groups);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#0F1B2D]">
      <a href="#notifications-main" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 bg-[#0F1B2D] text-white px-4 py-2">
        Skip to content
      </a>

      <EnvironmentStrip />
      <TopBar onRefresh={() => { setLoading(true); setTimeout(() => setLoading(false), 600); }} />

      <div className="flex flex-col lg:flex-row" id="notifications-main">
        <AdminSidebar active="Notifications" />

        <main className="flex-1 min-w-0 pt-6 lg:pt-8 lg:pl-[232px] lg:px-8 pb-24">
          <SectionHead
            title="Notifications"
            subtitle={filtered.length === 0 ? "You're all caught up. New items will appear here." : `${filtered.length} notification${filtered.length !== 1 ? 's' : ''}`}
          >
            <div className="flex items-center gap-2">
              <Btn size="small" secondary icon={X} onClick={handleMarkAllRead} title="Mark all as read">
                Mark all as read
              </Btn>
              <Btn size="small" secondary onClick={() => handleSnoozeAll(4)} title="Snooze all non-urgent">
                Snooze non-urgent
              </Btn>
              <Btn secondary icon={Settings} onClick={() => toast("Opening Settings → Notifications")} title="Preferences">
                Preferences
              </Btn>
            </div>
          </SectionHead>

          <div className="grid gap-3 lg:grid-cols-4 mb-6">
            {summaryStrip.map((s, i) => (
              <MetricCard key={i} label={s.label} value={s.value} sub={s.sub} status={s.status} />
            ))}
          </div>

          <TabBar active={activeTab} onChange={setActiveTab} tabs={notificationTabs} />

          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => <SkeletonCard key={i} />)}
            </div>
          ) : filtered.length === 0 ? (
            <EmptyState
              icon={CheckCircle2}
              title="You're all caught up"
              subtitle="No new notifications. Items will appear here when you need to act."
              action={() => toast("Refreshing feed")}
              actionLabel="Refresh"
            />
          ) : (
            <div className="space-y-4">
              {groupByDay(filtered).map(([day, items]) => (
                <div key={day}>
                  <h3 className="text-[11px] font-semibold text-[#4A5568] uppercase tracking-wide px-5 mb-3 border-b border-solid border-[#E5E1D8] pb-2">
                    {day}
                  </h3>
                  <div className="space-y-2">
                    {items.map((n) => {
                      const CatIcon = categoryIcon(n.category);
                      const isProtected = n.severity === "critical" || n.category === "security" || n.category === "compliance";
                      return (
                        <Card key={n.id} title padded={false} className="border-[#E5E1D8] hover:border-[#B8955A]/50 transition cursor-pointer" onClick={() => { handleOpen(n.target); setDrawerItem(n); setShowDrawer(true); }}>
                          <div className="px-5 pt-4 pb-4">
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-2">
                                  <SeverityChip severity={n.severity} />
                                  <StateChip state={n.state} />
                                  {n.requiresAck && <span className="text-[10px] font-medium text-[#B42318]">Ack required</span>}
                                </div>
                                <div className="flex items-center gap-2 mb-1">
                                  <CatIcon size={13} className="text-[#4A5568] flex-shrink-0" />
                                  <h4 className="text-[12px] font-medium text-[#0F1B2D] leading-snug">{n.title}</h4>
                                </div>
                                <p className="text-[11px] text-[#4A5568] mb-3 line-clamp-2">{n.detail}</p>
                                <div className="flex items-center justify-between gap-3">
                                  <span className="text-[10px] text-[#4A5568]">
                                    {new Date(n.createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", hour12: false })}
                                  </span>
                                  <Btn size="small" secondary icon={LoaderIcon} onClick={(e) => { e.stopPropagation(); handleAck(n.id); }} title="Acknowledge">
                                    Acknowledge
                                  </Btn>
                                </div>
                              </div>
                              <div className="flex items-center gap-1 ml-2">
                                <BtnIcon
                                  size="small"
                                  secondary
                                  icon={Copy}
                                  title="More actions"
                                  onClick={(e) => { e.stopPropagation(); }}
                                />
                              </div>
                            </div>
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 px-5 lg:px-0 text-center lg:text-left">
            <p className="text-[11px] text-[#4A5568]">
              Notification content shows IDs and categories only. No names, amounts, or message text appear in this feed.{" "}
              <Link href="/settings" className="text-[#B8955A] font-medium hover:underline">
                Manage notification preferences
              </Link>
            </p>
          </div>

        </main>
      </div>

      {showDrawer && drawerItem && (
        <DetailDrawer open={showDrawer} onClose={() => setShowDrawer(false)} title={`Notification: ${drawerItem.id}`}>
          <div className="space-y-5">
            <div className="grid gap-4 lg:grid-cols-3">
              <div>
                <h4 className="text-[11px] font-semibold text-[#4A5568] uppercase tracking-wide mb-2">Details</h4>
                <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">ID:</b> {drawerItem.id}</p>
                <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">Category:</b> {notificationCategories[drawerItem.category]?.label || drawerItem.category}</p>
                <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">Severity:</b> {severityChip(drawerItem.severity)}</p>
                <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">State:</b> {stateChip(drawerItem.state)}</p>
                <p className="text-[12px] text-[#4A5568] mb-1"><b className="text-[#0F1B2D]">Created:</b> {new Date(drawerItem.createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", hour12: false })}</p>
              </div>
              <div className="lg:col-span-2">
                <h4 className="text-[11px] font-semibold text-[#4A5568] uppercase tracking-wide mb-2">Message</h4>
                <p className="text-[12px] text-[#4A5568] mb-4">{drawerItem.detail}</p>
                <h4 className="text-[11px] font-semibold text-[#4A5568] uppercase tracking-wide mb-2">Actions</h4>
                <div className="flex gap-2">
                  <Btn secondary onClick={() => { handleAck(drawerItem.id); setShowDrawer(false); }} className="flex-1">
                    Acknowledge
                  </Btn>
                  <Btn size="small" secondary onClick={() => { handleSnooze(drawerItem.id, 1); setShowDrawer(false); }} className="flex-1">
                    Snooze 1h
                  </Btn>
                  {!isProtected(drawerItem) && <Btn size="small" secondary onClick={() => { handleMute(drawerItem.id); setShowDrawer(false); }} className="flex-1">Mute type</Btn>}

                  <Btn size="small" secondary onClick={() => { handleCopyId(drawerItem.id); }} className="flex-1">
                    Copy ID
                  </Btn>
                </div>
              </div>
            </div>
            <div className="flex gap-2 pt-4">
              <Btn onClick={() => setShowDrawer(false)} className="flex-1">
                Close
              </Btn>
            </div>
          </div>
        </DetailDrawer>
      )}
    </div>
  );
}

function isProtected(n) {
  return n.severity === "critical" || n.category === "security" || n.category === "compliance";
}


