"use client";
import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import {
  User as UserIcon,
  Shield,
  ShieldCheck,
  Bell,
  Monitor as MonitorIcon,
  Layout,
  Clock as ClockIcon,
  Users as UsersIcon,
  File as FileIcon,
  AlertTriangle,
  Activity as ActivityIcon,
  Banknote,
  RefreshCw,
  Download,
  X,
  Edit as EditIcon,
  Copy,
  HelpCircle,
  Plus,
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

const settingsSections = [
  { key: "profile", label: "Profile", icon: UserIcon, desc: "Read-only from identity provider" },
  { key: "access", label: "My access", icon: ShieldCheck, desc: "Roles, permissions, elevation" },
  { key: "security", label: "Security", icon: Shield, desc: "Keys, sessions, devices" },
  { key: "notifications", label: "Notifications", icon: Bell, desc: "Preferences and channels" },
  { key: "display", label: "Display and accessibility", icon: Layout, desc: "Theme, density, font size" },
  { key: "work", label: "Work preferences", icon: ActivityIcon, desc: "Default views, macros" },
  { key: "delegation", label: "Delegation and out of office", icon: UsersIcon, desc: "Delegate approvals, OOO" },
  { key: "wellbeing", label: "Wellbeing", icon: ActivityIcon, desc: "Blur, breaks, exposure" },
  { key: "on-call", label: "On-call", icon: ClockIcon, desc: "Contact methods, shifts" },
  { key: "data", label: "My data and activity", icon: FileIcon, desc: "Audit entries, download" },
  { key: "policies", label: "Help and policies", icon: HelpCircle, desc: "Acceptable use, conduct" },
];

const profileData = {
  name: "Alex Kumar",
  email: "alex.kumar@platform.in",
  team: "Platform Engineering",
  manager: "Priya Sharma",
  roles: ["On-call engineer", "SRE"],
  startDate: "2025-03-15",
  location: "Kolkata, India",
};

const accessData = {
  canDo: [
    "Review verification cases for startups and mentors",
    "Reveal masked fields with a business reason",
    "Approve low-risk refunds up to ₹50,000",
    "View compliance audit logs",
  ],
  elevations: [
    { role: "Senior verification reviewer", reason: "Second review coverage", caseId: "VER-2026-004812", approver: "Compliance lead", start: "2026-10-01", end: "2026-12-31", status: "Active" },
    { role: "Break-glass access", reason: "Incident INC-2026-021", caseId: "INC-2026-021", approver: "Security administrator", start: "2026-11-08T00:48:00+05:30", end: "2026-11-08T02:48:00+05:30", status: "Expired" },
  ],
  training: [
    { name: "Privacy and data handling", due: "2026-12-15", status: "Current" },
    { name: "Security awareness", due: "2026-11-30", status: "Due soon" },
    { name: "Maker-checker procedures", due: "2026-10-01", status: "Overdue" },
  ],
  conflicts: [
    { person: "Rohan Gupta", org: "Acme Startups", declared: "2026-09-20", outcome: "Records routed away" },
  ],
};

const securityData = {
  keys: [
    { label: "YubiKey 5 NFC", type: "Hardware key", added: "2026-03-15", lastUsed: "2026-11-07T20:10:00+05:30" },
    { label: "iPhone Touch ID", type: "Authenticator", added: "2026-03-16", lastUsed: "2026-11-08T01:00:00+05:30" },
  ],
  sessions: [
    { device: "MacBook Pro", browser: "Chrome", country: "India", lastActive: "2026-11-08T09:30:00+05:30", managed: true },
    { device: "iPhone", browser: "Safari", country: "India", lastActive: "2026-11-08T08:45:00+05:30", managed: true },
    { device: "Windows Laptop", browser: "Edge", country: "Germany", lastActive: "2026-11-05T14:20:00+05:30", managed: false },
  ],
  recentActivity: [
    { action: "Sign-in", detail: "New device - Kolkata", time: "2026-11-08T08:45:00+05:30", type: "info" },
    { action: "Hardware key added", detail: "iPhone Touch ID", time: "2026-11-07T20:10:00+05:30", type: "success" },
    { action: "Elevated access", detail: "Break-glass for INC-2026-021", time: "2026-11-08T00:48:00+05:30", type: "warning" },
  ],
};

const notificationPrefs = [
  { category: "Approvals", channels: { in_app: true, email: true, chat: false, push: false }, protected: false },
  { category: "Security alerts", channels: { in_app: true, email: true, chat: true, push: true }, protected: true },
  { category: "Queue SLAs", channels: { in_app: true, email: false, chat: false, push: false }, protected: false },
  { category: "Mentions", channels: { in_app: true, email: true, chat: false, push: false }, protected: false },
  { category: "System maintenance", channels: { in_app: true, email: false, chat: false, push: false }, protected: false },
  { category: "Wellbeing prompts", channels: { in_app: true, email: false, chat: false, push: false }, protected: false },
];

const auditEntries = [
  { action: "Record opened", target: "VER-2026-004812", purpose: "Verification review", time: "2026-11-08T09:15:00+05:30" },
  { action: "Masked field revealed", target: "User record", purpose: "Identity verification", time: "2026-11-08T08:40:00+05:30" },
  { action: "Approval granted", target: "Refund RF-2026-110", purpose: "Low-risk refund", time: "2026-11-07T22:00:00+05:30" },
  { action: "Configuration change", target: "Feature flag new-dashboard", purpose: "Staged rollout", time: "2026-11-07T16:30:00+05:30" },
];

export function AdminSettingsPage() {
  const [activeSection, setActiveSection] = useState("security");
  const [saving, setSaving] = useState(false);
  const [unsaved, setUnsaved] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [drawerType, setDrawerType] = useState(null);

  const section = settingsSections.find((s) => s.key === activeSection);

  const handleSave = useCallback(() => {
    setSaving(true);
    setUnsaved(false);
    toast("Settings saved");
    setTimeout(() => setSaving(false), 800);
  }, []);

  const handleChange = useCallback(() => {
    setUnsaved(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#0F1B2D]">
      <a href="#settings-main" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 bg-[#0F1B2D] text-white px-4 py-2">
        Skip to content
      </a>

      <EnvironmentStrip />
      <TopBar onRefresh={() => toast("Settings refreshed")} />

      <div className="flex flex-col lg:flex-row" id="settings-main">
        <AdminSidebar active="Settings" />

        <main className="flex-1 min-w-0 pt-6 lg:pt-8 lg:pl-[232px] lg:px-8 pb-24">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left section menu */}
            <aside className="lg:w-[260px] flex-shrink-0">
              <SectionHead title="Settings" subtitle="Personal and security settings" />
              <nav className="mt-4 space-y-0.5">
                {settingsSections.map((s) => {
                  const SectionIcon = s.icon;
                  const isActive = activeSection === s.key;
                  const isLocked = s.key === "profile";
                  return (
                    <button
                      key={s.key}
                      type="button"
                      onClick={() => setActiveSection(s.key)}
                      className={`flex w-full items-center gap-3 rounded-[10px] px-3 py-2 text-left text-[12px] transition ${isActive
                        ? "bg-[#1C2B42] text-white"
                        : "text-[#4A5568] hover:bg-[#F3EBDD] hover:text-[#0F1B2D]"}`}
                    >
                      <SectionIcon size={14} className={`flex-shrink-0 ${isActive ? "text-white" : "text-[#4A5568]"}`} />
                      <div className="flex flex-col min-w-0">
                        <span className={`block font-medium ${isActive ? "text-white" : "text-[#0F1B2D]"}`}>{s.label}</span>
                        <span className="block text-[10px] text-[#4A5568]">{s.desc}</span>
                      </div>
                      {isLocked && <span className="ml-auto text-[10px] text-[#B8955A]">Locked</span>}
                    </button>
                  );
                })}
              </nav>
              {unsaved && (
                <div className="mt-4 p-3 rounded-[10px] bg-[#FDF3E0] border border-solid border-[#FDE6CA]">
                  <p className="text-[11px] text-[#9A6210] font-medium">Unsaved changes</p>
                  <p className="text-[11px] text-[#9A6210] mt-1">Save before leaving this section.</p>
                </div>
              )}
            </aside>

            {/* Right content */}
            <div className="flex-1 min-w-0">
              <SectionHead
                title={section?.label || "Settings"}
                subtitle={section?.desc || ""}
                className="mb-6"
              />

              {activeSection === "profile" && (
                <div className="space-y-4">
                  <Card title="Profile" padded className="border-[#E5E1D8]">
                    <div className="px-5 pt-3 pb-4 space-y-4">
                      <div className="grid gap-4 lg:grid-cols-2">
                        <div>
                          <p className="text-[10px] font-semibold text-[#4A5568] uppercase tracking-wide mb-1">Name</p>
                          <p className="text-[12px] text-[#0F1B2D] font-medium">{profileData.name}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-semibold text-[#4A5568] uppercase tracking-wide mb-1">Work email</p>
                          <p className="text-[12px] text-[#0F1B2D] font-medium">{profileData.email}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-semibold text-[#4A5568] uppercase tracking-wide mb-1">Team</p>
                          <p className="text-[12px] text-[#0F1B2D] font-medium">{profileData.team}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-semibold text-[#4A5568] uppercase tracking-wide mb-1">Manager</p>
                          <p className="text-[12px] text-[#0F1B2D] font-medium">{profileData.manager}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-semibold text-[#4A5568] uppercase tracking-wide mb-1">Internal roles</p>
                          <p className="text-[12px] text-[#0F1B2D] font-medium">{profileData.roles.join(", ")}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-semibold text-[#4A5568] uppercase tracking-wide mb-1">Start date</p>
                          <p className="text-[12px] text-[#0F1B2D] font-medium">{profileData.startDate}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-semibold text-[#4A5568] uppercase tracking-wide mb-1">Work location</p>
                          <p className="text-[12px] text-[#0F1B2D] font-medium">{profileData.location}</p>
                        </div>
                      </div>
                      <p className="text-[11px] text-[#4A5568] mt-2">
                        Profile is read-only — managed by the identity provider.{" "}
                        <Link href="#" className="text-[#B8955A] font-medium hover:underline" onClick={(e) => { e.preventDefault(); toast("Opening HR portal"); }}>
                          Report a mistake
                        </Link>
                      </p>
                    </div>
                  </Card>
                </div>
              )}

              {activeSection === "access" && (
                <div className="space-y-4">
                  <Card title="What you can do" padded className="border-[#E5E1D8]">
                    <div className="px-5 pt-3 pb-4">
                      <ul className="space-y-2">
                        {accessData.canDo.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-[12px] text-[#4A5568]">
                            <span className="flex-shrink-0 text-[#286749]">✓</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Card>

                  <Card title="Elevated access and break-glass" padded className="border-[#E5E1D8]">
                    <div className="px-5 pt-3 pb-4">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-[12px] font-semibold text-[#0F1B2D]">Current and past elevations</h4>
                        <Btn size="small" secondary icon={RefreshCw} onClick={handleChange} title="Request elevated access">
                          Request elevated access
                        </Btn>
                      </div>
                      <div className="space-y-3">
                        {accessData.elevations.map((e, i) => (
                          <div key={i} className="p-3 rounded-[10px] border border-solid border-[#E5E1D8] bg-white">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-[11px] font-medium text-[#0F1B2D]">{e.role}</span>
                              <span className={`text-[10px] font-medium ${e.status === "Active" ? "text-[#286749]" : "text-[#4A5568]"}`}>{e.status}</span>
                            </div>
                            <p className="text-[11px] text-[#4A5568] mb-1">{e.reason} · Case {e.caseId}</p>
                            <p className="text-[10px] text-[#4A5568]">{e.approver} · {new Date(e.start).toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" })} to {new Date(e.end).toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" })}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>

                  <Card title="Training and attestations" padded className="border-[#E5E1D8]">
                    <div className="px-5 pt-3 pb-4">
                      <div className="space-y-3">
                        {accessData.training.map((t, i) => (
                          <div key={i} className="flex items-center justify-between p-3 rounded-[10px] border border-solid border-[#E5E1D8] bg-white">
                            <div>
                              <p className="text-[11px] font-medium text-[#0F1B2D]">{t.name}</p>
                              <p className="text-[10px] text-[#4A5568]">Due {t.due}</p>
                            </div>
                            <StatChip status={t.status === "Overdue" ? "overdue" : t.status === "Due soon" ? "action_needed" : "live"} />
                          </div>
                        ))}
                      </div>
                      <p className="text-[11px] text-[#B42318] mt-3">
                        Overdue training suspends specific permissions. Complete "Maker-checker procedures" to restore access.
                      </p>
                    </div>
                  </Card>

                  <Card title="Conflicts declared" padded className="border-[#E5E1D8]">
                    <div className="px-5 pt-3 pb-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-[12px] font-semibold text-[#0F1B2D]">Declared conflicts</h4>
                        <Btn size="small" secondary icon={Plus} onClick={handleChange} title="Declare a conflict">
                          Declare a conflict
                        </Btn>
                      </div>
                      <div className="space-y-3">
                        {accessData.conflicts.map((c, i) => (
                          <div key={i} className="p-3 rounded-[10px] border border-solid border-[#E5E1D8] bg-white">
                            <p className="text-[11px] font-medium text-[#0F1B2D]">{c.person} · {c.org}</p>
                            <p className="text-[10px] text-[#4A5568]">Declared {c.declared} · {c.outcome}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                </div>
              )}

              {activeSection === "security" && (
                <div className="space-y-4">
                  <Card title="Sign-in and keys" padded className="border-[#E5E1D8]">
                    <div className="px-5 pt-3 pb-4 space-y-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-[12px] font-semibold text-[#0F1B2D]">Hardware keys and authenticators</h4>
                        <Btn size="small" secondary onClick={handleChange} title="Add a backup key">
                          Add a backup key
                        </Btn>
                      </div>
                      <div className="space-y-3">
                        {securityData.keys.map((k, i) => (
                          <div key={i} className="flex items-center justify-between p-3 rounded-[10px] border border-solid border-[#E5E1D8] bg-white">
                            <div className="flex items-center gap-3">
                              <span className="text-[11px] font-medium text-[#0F1B2D]">{k.label}</span>
                              <span className="text-[10px] text-[#4A5568]">{k.type}</span>
                            </div>
                            <div className="flex items-center gap-3 text-[10px] text-[#4A5568]">
                              <span>Added {k.added}</span>
                              <span>Last used {new Date(k.lastUsed).toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" })}</span>
                              <div className="flex gap-1">
                                <BtnIcon size="small" secondary icon={EditIcon} title="Rename" onClick={handleChange} />
                                <BtnIcon size="small" secondary icon={Copy} title="Copy" onClick={handleChange} />
                                <BtnIcon size="small" secondary icon={X} title="Remove" onClick={handleChange} destructive />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <p className="text-[11px] text-[#B42318] mt-2">
                        Warning: Only one security method remains. Add a backup key within 7 days (company-controlled).
                      </p>
                      <div className="mt-4 pt-4 border-t border-solid border-[#E5E1D8]">
                        <Btn secondary icon={AlertTriangle} onClick={() => { setDrawerType("lost-key"); setShowDrawer(true); }} title="Report a lost key">
                          Report a lost key
                        </Btn>
                      </div>
                    </div>
                  </Card>

                  <Card title="Sessions and devices" padded className="border-[#E5E1D8]">
                    <div className="px-5 pt-3 pb-4">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-[11px] border-collapse">
                          <thead>
                            <tr className="border-b border-solid border-[#E5E1D8]">
                              <th className="pb-3 text-[10px] font-medium text-[#4A5568] uppercase tracking-wide">Device</th>
                              <th className="pb-3 text-[10px] font-medium text-[#4A5568] uppercase tracking-wide">Browser</th>
                              <th className="pb-3 text-[10px] font-medium text-[#4A5568] uppercase tracking-wide">Country</th>
                              <th className="pb-3 text-[10px] font-medium text-[#4A5568] uppercase tracking-wide">Last active</th>
                              <th className="pb-3 text-[10px] font-medium text-[#4A5568] uppercase tracking-wide">Managed</th>
                              <th className="pb-3 text-[10px] font-medium text-[#4A5568] uppercase tracking-wide">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {securityData.sessions.map((s, i) => (
                              <tr key={i} className="border-b border-solid border-[#E5E1D8]/50 last:border-0 hover:bg-[#F3EBDD]/30 transition">
                                <td className="py-3 text-[11px] text-[#0F1B2D]">{s.device}</td>
                                <td className="py-3 text-[11px] text-[#4A5568]">{s.browser}</td>
                                <td className="py-3 text-[11px] text-[#4A5568]">{s.country}</td>
                                <td className="py-3 text-[11px] text-[#4A5568]">{new Date(s.lastActive).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", hour12: false })}</td>
                                <td className="py-3">{s.managed ? <span className="text-[10px] font-medium text-[#286749]">Compliant</span> : <span className="text-[10px] font-medium text-[#B42318]">Unmanaged</span>}</td>
                                <td className="py-3">
                                  <Btn size="small" secondary onClick={() => toast(`Signed out from ${s.device}`)} title="Sign out">
                                    Sign out
                                  </Btn>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="mt-3 flex gap-2">
                        <Btn size="small" secondary onClick={() => toast("Signed out everywhere")} title="Sign out everywhere">
                          Sign out everywhere
                        </Btn>
                      </div>
                    </div>
                  </Card>

                  <Card title="Recent security activity" padded className="border-[#E5E1D8]">
                    <div className="px-5 pt-3 pb-4 space-y-3">
                      {securityData.recentActivity.map((a, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 rounded-[10px] border border-solid border-[#E5E1D8] bg-white">
                          <span className="flex-shrink-0 w-2 h-2 rounded-full bg-[#B42318]"></span>
                          <div className="flex-1 min-w-0">
                            <p className="text-[11px] font-medium text-[#0F1B2D]">{a.action}</p>
                            <p className="text-[10px] text-[#4A5568]">{a.detail}</p>
                            <p className="text-[10px] text-[#4A5568]">{new Date(a.time).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", hour12: false })}</p>
                          </div>
                          <Btn size="small" secondary icon={AlertTriangle} onClick={() => { setDrawerType("security-review"); setShowDrawer(true); }} title="This wasn't me" />
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              )}

              {activeSection === "notifications" && (
                <div className="space-y-4">
                  <Card title="Notification preferences" padded className="border-[#E5E1D8]">
                    <div className="px-5 pt-3 pb-4">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-[11px] border-collapse">
                          <thead>
                            <tr className="border-b border-solid border-[#E5E1D8]">
                              <th className="pb-3 text-[10px] font-medium text-[#4A5568] uppercase tracking-wide">Category</th>
                              <th className="pb-3 text-[10px] font-medium text-[#4A5568] uppercase tracking-wide">In-app</th>
                              <th className="pb-3 text-[10px] font-medium text-[#4A5568] uppercase tracking-wide">Email</th>
                              <th className="pb-3 text-[10px] font-medium text-[#4A5568] uppercase tracking-wide">Chat</th>
                              <th className="pb-3 text-[10px] font-medium text-[#4A5568] uppercase tracking-wide">Push</th>
                              <th className="pb-3 text-[10px] font-medium text-[#4A5568] uppercase tracking-wide">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {notificationPrefs.map((p, i) => (
                              <tr key={i} className="border-b border-solid border-[#E5E1D8]/50 last:border-0">
                                <td className="py-3 text-[11px] font-medium text-[#0F1B2D]">{p.category}</td>
                                <td className="py-3"><ToggleSwitch checked={p.channels.in_app} onChange={handleChange} /></td>
                                <td className="py-3"><ToggleSwitch checked={p.channels.email} onChange={handleChange} /></td>
                                <td className="py-3"><ToggleSwitch checked={p.channels.chat} onChange={handleChange} /></td>
                                <td className="py-3"><ToggleSwitch checked={p.channels.push} onChange={handleChange} /></td>
                                <td className="py-3">
                                  {p.protected ? <span className="text-[10px] font-medium text-[#B42318]">Locked (protected)</span> : <span className="text-[10px] text-[#4A5568]">Editable</span>}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <p className="text-[11px] text-[#4A5568] mt-3">
                        Protected types (security alerts, access changes, breach clocks, data-rights deadlines, critical incidents, approval requests to you, wellbeing safety prompts) cannot be muted.
                      </p>
                    </div>
                  </Card>

                  <Card title="Digest and quiet hours" padded className="border-[#E5E1D8]">
                    <div className="px-5 pt-3 pb-4 space-y-4">
                      <div>
                        <p className="text-[10px] font-semibold text-[#4A5568] uppercase tracking-wide mb-2">Digest frequency</p>
                        <div className="flex gap-2">
                          <Btn size="small" secondary onClick={handleChange} title="Instant">Instant</Btn>
                          <Btn size="small" secondary onClick={handleChange} title="Hourly">Hourly</Btn>
                          <Btn size="small" secondary onClick={handleChange} title="Daily">Daily</Btn>
                        </div>
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold text-[#4A5568] uppercase tracking-wide mb-2">Quiet hours</p>
                        <div className="flex items-center gap-2">
                          <input type="time" defaultValue="20:00" className="h-9 rounded-[10px] border border-solid border-[#E5E1D8] bg-white px-2 text-[11px]" onChange={handleChange} />
                          <span className="text-[11px] text-[#4A5568]">to</span>
                          <input type="time" defaultValue="08:00" className="h-9 rounded-[10px] border border-solid border-[#E5E1D8] bg-white px-2 text-[11px]" onChange={handleChange} />
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <ToggleSwitch checked={false} onChange={handleChange} />
                        <span className="text-[11px] font-medium text-[#0F1B2D]">Focus mode</span>
                      </div>
                    </div>
                  </Card>
                </div>
              )}

              {activeSection === "display" && (
                <div className="space-y-4">
                  <Card title="Theme and density" padded className="border-[#E5E1D8]">
                    <div className="px-5 pt-3 pb-4 space-y-4">
                      <div>
                        <p className="text-[10px] font-semibold text-[#4A5568] uppercase tracking-wide mb-2">Theme</p>
                        <div className="flex gap-2">
                          <Btn size="small" secondary onClick={handleChange} title="System theme">System</Btn>
                          <Btn size="small" secondary onClick={handleChange} title="Light theme">Light</Btn>
                          <Btn size="small" secondary onClick={handleChange} title="Dark theme">Dark</Btn>
                        </div>
                        <p className="text-[11px] text-[#4A5568] mt-2">Light theme only in production console.</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold text-[#4A5568] uppercase tracking-wide mb-2">Density</p>
                        <div className="flex gap-2">
                          <Btn size="small" secondary onClick={handleChange} title="Comfortable density">Comfortable</Btn>
                          <Btn size="small" secondary onClick={handleChange} title="Compact density">Compact</Btn>
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card title="Time zone and format" padded className="border-[#E5E1D8]">
                    <div className="px-5 pt-3 pb-4 space-y-4">
                      <div>
                        <p className="text-[10px] font-semibold text-[#4A5568] uppercase tracking-wide mb-2">Time zone</p>
                        <select defaultValue="Asia/Kolkata" className="h-9 rounded-[10px] border border-solid border-[#E5E1D8] bg-white px-3 text-[11px]" onChange={handleChange}>
                          <option>Asia/Kolkata (IST)</option>
                          <option>UTC</option>
                          <option>America/New_York</option>
                          <option>Europe/London</option>
                        </select>
                        <p className="text-[11px] text-[#4A5568] mt-2">Time zone is always shown on timestamps.</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold text-[#4A5568] uppercase tracking-wide mb-2">Time format</p>
                        <div className="flex gap-2">
                          <Btn size="small" secondary onClick={handleChange} title="12-hour">12-hour</Btn>
                          <Btn size="small" secondary onClick={handleChange} title="24-hour">24-hour</Btn>
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card title="Accessibility" padded className="border-[#E5E1D8]">
                    <div className="px-5 pt-3 pb-4 space-y-4">
                      <div className="flex items-center gap-3">
                        <ToggleSwitch checked={true} onChange={handleChange} />
                        <span className="text-[11px] font-medium text-[#0F1B2D]">Reduced motion</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <ToggleSwitch checked={false} onChange={handleChange} />
                        <span className="text-[11px] font-medium text-[#0F1B2D]">High contrast</span>
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold text-[#4A5568] uppercase tracking-wide mb-2">Font size</p>
                        <div className="flex gap-2">
                          <Btn size="small" secondary onClick={handleChange} title="100%">100%</Btn>
                          <Btn size="small" secondary onClick={handleChange} title="125%">125%</Btn>
                          <Btn size="small" secondary onClick={handleChange} title="150%">150%</Btn>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              )}

              {activeSection === "work" && (
                <div className="space-y-4">
                  <Card title="Default views" padded className="border-[#E5E1D8]">
                    <div className="px-5 pt-3 pb-4 space-y-4">
                      <div>
                        <p className="text-[10px] font-semibold text-[#4A5568] uppercase tracking-wide mb-2">Starting page</p>
                        <select defaultValue="/admin/verifications" className="h-9 rounded-[10px] border border-solid border-[#E5E1D8] bg-white px-3 text-[11px]" onChange={handleChange}>
                          <option>/admin/verifications</option>
                          <option>/admin/dashboard</option>
                          <option>/admin/system</option>
                          <option>/admin/support</option>
                        </select>
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold text-[#4A5568] uppercase tracking-wide mb-2">Saved views</p>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between p-3 rounded-[10px] border border-solid border-[#E5E1D8] bg-white">
                            <span className="text-[11px] font-medium text-[#0F1B2D]">Tier 1 services</span>
                            <div className="flex gap-1">
                              <BtnIcon size="small" secondary icon={EditIcon} title="Rename" onClick={handleChange} />
                              <BtnIcon size="small" secondary icon={Copy} title="Share" onClick={handleChange} />
                              <BtnIcon size="small" secondary icon={X} title="Delete" onClick={handleChange} destructive />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card title="Claiming" padded className="border-[#E5E1D8]">
                    <div className="px-5 pt-3 pb-4 space-y-4">
                      <div className="flex items-center gap-3">
                        <ToggleSwitch checked={false} onChange={handleChange} />
                        <span className="text-[11px] font-medium text-[#0F1B2D]">Auto-claim next item</span>
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold text-[#4A5568] uppercase tracking-wide mb-2">Max items held at once</p>
                        <input type="number" defaultValue="5" className="h-9 w-20 rounded-[10px] border border-solid border-[#E5E1D8] bg-white px-2 text-[11px]" onChange={handleChange} />
                        <p className="text-[11px] text-[#4A5568] mt-1">Within company limit of 10 items.</p>
                      </div>
                    </div>
                  </Card>
                </div>
              )}

              {activeSection === "delegation" && (
                <div className="space-y-4">
                  <Card title="Out of office" padded className="border-[#E5E1D8]">
                    <div className="px-5 pt-3 pb-4 space-y-4">
                      <div>
                        <p className="text-[10px] font-semibold text-[#4A5568] uppercase tracking-wide mb-2">OOO dates</p>
                        <div className="flex gap-2">
                          <input type="date" className="h-9 rounded-[10px] border border-solid border-[#E5E1D8] bg-white px-2 text-[11px]" onChange={handleChange} />
                          <span className="text-[11px] text-[#4A5568]">to</span>
                          <input type="date" className="h-9 rounded-[10px] border border-solid border-[#E5E1D8] bg-white px-2 text-[11px]" onChange={handleChange} />
                        </div>
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold text-[#4A5568] uppercase tracking-wide mb-2">Message</p>
                        <textarea defaultValue="I am out of office. Approvals and assignments are delegated to my backup." className="w-full rounded-[10px] border border-solid border-[#E5E1D8] bg-white px-3 py-2 text-[11px] h-24" onChange={handleChange}></textarea>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-medium text-[#0F1B2D]">Delegate</span>
                        <Btn size="small" secondary onClick={handleChange} title="Choose delegate">
                          Choose colleague
                        </Btn>
                      </div>
                      <p className="text-[11px] text-[#4A5568] mt-2">
                        Delegation is limited (standard approvals up to threshold) and time-bound. Hardware-key-confirmed approvals cannot be delegated.
                      </p>
                    </div>
                  </Card>
                </div>
              )}

              {activeSection === "wellbeing" && (
                <div className="space-y-4">
                  <Card title="Exposure and breaks" padded className="border-[#E5E1D8]">
                    <div className="px-5 pt-3 pb-4 space-y-4">
                      <div className="flex items-center gap-3">
                        <ToggleSwitch checked={true} onChange={handleChange} />
                        <span className="text-[11px] font-medium text-[#0F1B2D]">Blur images by default</span>
                        <span className="text-[10px] text-[#B42318]">Company-controlled</span>
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold text-[#4A5568] uppercase tracking-wide mb-2">Break reminder</p>
                        <input type="number" defaultValue="60" className="h-9 w-20 rounded-[10px] border border-solid border-[#E5E1D8] bg-white px-2 text-[11px]" onChange={handleChange} />
                        <span className="ml-2 text-[11px] text-[#4A5568]">minutes on sensitive categories</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Btn secondary onClick={() => toast("Break started")} title="Pause assignments">
                          Pause assignments
                        </Btn>
                        <Btn size="small" secondary onClick={() => toast("Handing off case")} title="Hand off">
                          Hand off case
                        </Btn>
                      </div>
                    </div>
                  </Card>

                  <Card title="Support resources" padded className="border-[#E5E1D8]">
                    <div className="px-5 pt-3 pb-4 space-y-3">
                      <div className="flex items-start gap-3 p-3 rounded-[10px] border border-solid border-[#E5E1D8] bg-[#F3EBDD]">
                        <HelpCircle size={18} className="text-[#806236] flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-[11px] font-medium text-[#0F1B2D]">Confidential counseling</p>
                          <p className="text-[10px] text-[#4A5568]">Employee assistance available 24/7. Contact your lead for details.</p>
                        </div>
                      </div>
                      <Btn size="small" secondary onClick={() => toast("Opening lead check-in")} title="Request lead check-in">
                        Request lead check-in
                      </Btn>
                    </div>
                  </Card>
                </div>
              )}

              {activeSection === "on-call" && (
                <div className="space-y-4">
                  <Card title="On-call preferences" padded className="border-[#E5E1D8]">
                    <div className="px-5 pt-3 pb-4 space-y-4">
                      <div>
                        <p className="text-[10px] font-semibold text-[#4A5568] uppercase tracking-wide mb-2">Contact methods</p>
                        <p className="text-[11px] text-[#4A5568] mb-2">Managed in the paging system.</p>
                        <Btn size="small" secondary onClick={() => toast("Sending test page")} title="Send a test page">
                          Send a test page
                        </Btn>
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold text-[#4A5568] uppercase tracking-wide mb-2">Upcoming shifts</p>
                        <div className="space-y-2">
                          <div className="p-3 rounded-[10px] border border-solid border-[#E5E1D8] bg-white">
                            <p className="text-[11px] font-medium text-[#0F1B2D]">Primary on-call · Nov 10-17</p>
                            <p className="text-[10px] text-[#4A5568]">Swap request pending · Approval required</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              )}

              {activeSection === "data" && (
                <div className="space-y-4">
                  <Card title="My activity log" padded className="border-[#E5E1D8]">
                    <div className="px-5 pt-3 pb-4">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-[12px] font-semibold text-[#0F1B2D]">Your audit entries</h4>
                        <Btn size="small" secondary icon={Download} onClick={() => toast("Downloading your entries")} title="Download">
                          Download
                        </Btn>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-[11px] border-collapse">
                          <thead>
                            <tr className="border-b border-solid border-[#E5E1D8]">
                              <th className="pb-3 text-[10px] font-medium text-[#4A5568] uppercase tracking-wide">Action</th>
                              <th className="pb-3 text-[10px] font-medium text-[#4A5568] uppercase tracking-wide">Target</th>
                              <th className="pb-3 text-[10px] font-medium text-[#4A5568] uppercase tracking-wide">Purpose</th>
                              <th className="pb-3 text-[10px] font-medium text-[#4A5568] uppercase tracking-wide">Time</th>
                            </tr>
                          </thead>
                          <tbody>
                            {auditEntries.map((e, i) => (
                              <tr key={i} className="border-b border-solid border-[#E5E1D8]/50 last:border-0">
                                <td className="py-3 text-[11px] font-medium text-[#0F1B2D]">{e.action}</td>
                                <td className="py-3 text-[11px] text-[#4A5568]">{e.target}</td>
                                <td className="py-3 text-[11px] text-[#4A5568]">{e.purpose}</td>
                                <td className="py-3 text-[11px] text-[#4A5568]">{new Date(e.time).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", hour12: false })}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <p className="text-[11px] text-[#4A5568] mt-3">
                        Entries cannot be edited. Report an incorrect entry to create a review ticket.
                      </p>
                    </div>
                  </Card>
                </div>
              )}

              {activeSection === "policies" && (
                <div className="space-y-4">
                  <Card title="Help and policies" padded className="border-[#E5E1D8]">
                    <div className="px-5 pt-3 pb-4 space-y-3">
                      <div className="flex items-start gap-3 p-3 rounded-[10px] border border-solid border-[#E5E1D8] bg-white">
                        <FileIcon size={18} className="text-[#4A5568] flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-[11px] font-medium text-[#0F1B2D]">Acceptable use policy</p>
                          <p className="text-[10px] text-[#4A5568]">Staff acceptable use of the admin console.</p>
                        </div>
                        <Link href="/help" className="text-[11px] text-[#B8955A] font-medium hover:underline">View</Link>
                      </div>
                      <div className="flex items-start gap-3 p-3 rounded-[10px] border border-solid border-[#E5E1D8] bg-white">
                        <FileIcon size={18} className="text-[#4A5568] flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-[11px] font-medium text-[#0F1B2D]">Security policy</p>
                          <p className="text-[10px] text-[#4A5568]">Security baselines and requirements for staff.</p>
                        </div>
                        <Link href="/help" className="text-[11px] text-[#B8955A] font-medium hover:underline">View</Link>
                      </div>
                      <div className="flex items-start gap-3 p-3 rounded-[10px] border border-solid border-[#E5E1D8] bg-white">
                        <FileIcon size={18} className="text-[#4A5568] flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-[11px] font-medium text-[#0F1B2D]">Data handling policy</p>
                          <p className="text-[10px] text-[#4A5568]">How staff data is recorded, accessed and retained.</p>
                        </div>
                        <Link href="/help" className="text-[11px] text-[#B8955A] font-medium hover:underline">View</Link>
                      </div>
                      <div className="flex items-start gap-3 p-3 rounded-[10px] border border-solid border-[#E5E1D8] bg-white">
                        <FileIcon size={18} className="text-[#4A5568] flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-[11px] font-medium text-[#0F1B2D]">Code of conduct</p>
                          <p className="text-[10px] text-[#4A5568]">Staff code of conduct and whistleblowing protections.</p>
                        </div>
                        <Link href="/help" className="text-[11px] text-[#B8955A] font-medium hover:underline">View</Link>
                      </div>
                    </div>
                  </Card>
                </div>
              )}

              <div className="mt-8 px-5 lg:px-0 text-center lg:text-left">
                <p className="text-[11px] text-[#4A5568]">
                  Every change to security, notification preferences, delegation and wellbeing writes an append-only audit entry.{" "}
                  <Link href="/admin/audit" className="text-[#B8955A] font-medium hover:underline">
                    View audit log
                  </Link>
                </p>
              </div>

            </div>
          </div>

        </main>
      </div>

      {showDrawer && (
        <DetailDrawer open={showDrawer} onClose={() => setShowDrawer(false)} title={drawerType === "lost-key" ? "Report a lost key" : "Security review"}>
          <div className="space-y-5">
            {drawerType === "lost-key" && (
              <>
                <p className="text-[12px] text-[#4A5568]">
                  Reporting a lost key immediately revokes it, signs you out everywhere, and opens a supervised recovery with the security administrator.
                </p>
                <div className="p-4 rounded-[10px] bg-[#FBE9E7] border border-solid border-[#FDE5E5]">
                  <p className="text-[11px] font-medium text-[#B42318]">Cool-down period applies. Reduced permissions during recovery.</p>
                </div>
                <div className="flex gap-2">
                  <Btn onClick={() => { setShowDrawer(false); toast("Lost key reported — security administrator notified"); }} className="flex-1">
                    Report lost key
                  </Btn>
                  <Btn size="small" secondary onClick={() => setShowDrawer(false)}>Cancel</Btn>
                </div>
              </>
            )}
            {drawerType === "security-review" && (
              <>
                <p className="text-[12px] text-[#4A5568]">
                  This will start a security review, sign you out of all sessions, and notify the security administrator.
                </p>
                <div className="flex gap-2">
                  <Btn destructive onClick={() => { setShowDrawer(false); toast("Security review started"); }} className="flex-1">
                    Start review
                  </Btn>
                  <Btn size="small" secondary onClick={() => setShowDrawer(false)}>Cancel</Btn>
                </div>
              </>
            )}
          </div>
        </DetailDrawer>
      )}
    </div>
  );
}


