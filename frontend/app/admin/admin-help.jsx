"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  HelpCircle,
  BookOpen as BookIcon,
  AlertTriangle,
  ShieldAlert as ShieldAlertIcon,
  ShieldCheck,
  Activity as ActivityIcon,
  Monitor as MonitorIcon,
  File as FileIcon,
  Clock as ClockIcon,
  Calendar as CalendarIcon,
  Users as UsersIcon,
  Banknote,
  Link as LinkIcon,
  ArrowRight,
  Copy,
  X,
  RefreshCcw,
  Mail,
  Phone as PhoneIcon,
  Lock as LockIcon,
  Gauge,
  UserRound,
  MoreHorizontal as ReportIcon,
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

const topics = [
  { key: "getting-started", label: "Getting started", icon: BookIcon, count: 8, desc: "First week checklist, console tour, signing in with hardware keys, masking and purposes" },
  { key: "how-to", label: "Console how-to guides", icon: MonitorIcon, count: 24, desc: "Task guides for every admin page" },
  { key: "runbooks", label: "Runbooks", icon: AlertTriangle, count: 12, desc: "Incident response, provider outage playbooks, failover and rollback steps" },
  { key: "policies", label: "Policies", icon: ShieldCheck, count: 10, desc: "Acceptable use, security, data handling, retention, access control" },
  { key: "moderation", label: "Moderation and trust guidance", icon: ShieldAlertIcon, count: 14, desc: "Policy explainers, decision trees, severity definitions, action ladder" },
  { key: "verification", label: "Verification guidance", icon: ShieldCheck, count: 9, desc: "Checklists, evidence types, provider guides, second-review rules" },
  { key: "support", label: "Support guidance", icon: ActivityIcon, count: 11, desc: "Tone guide, macro library, requester verification, escalation rules" },
  { key: "money", label: "Money procedures", icon: Banknote, count: 7, desc: "Maker-checker, payout checks, refund policy, reconciliation" },
  { key: "compliance", label: "Compliance guidance", icon: ShieldCheck, count: 8, desc: "Data-rights procedure, legal holds, breach clocks, authority requests" },
  { key: "ai-quality", label: "AI quality guidance", icon: ActivityIcon, count: 6, desc: "Rubric reading, blinded review, calibration, release gates" },
  { key: "escalation", label: "Escalation matrix", icon: UsersIcon, count: 1, desc: "Who to contact by situation and severity" },
  { key: "training", label: "Training and certification", icon: ClockIcon, count: 5, desc: "Required courses, assessments, due dates" },
  { key: "wellbeing", label: "Wellbeing", icon: ActivityIcon, count: 4, desc: "Exposure guidance, break policy, counseling resources" },
  { key: "release-notes", label: "Release notes", icon: FileIcon, count: 3, desc: "Admin console changes by date and area" },
  { key: "reporting", label: "Reporting and feedback", icon: Mail, count: 4, desc: "Report problems, security concerns, misconduct, suggestions" },
];

const quickLinks = [
  { label: "Current incident runbook", href: "/admin/system", icon: AlertTriangle, badge: "INC-2026-021" },
  { label: "Escalation matrix", href: "#", icon: ShieldCheck, badge: "All teams" },
  { label: "On-call contacts", href: "#", icon: PhoneIcon, badge: "Live" },
  { label: "Report a concern", href: "#", icon: AlertTriangle, badge: "Confidential" },
];

const recentlyUpdated = [
  { title: "Incident response runbook", updated: "2 hours ago", author: "SRE lead", status: "Current" },
  { title: "Verification checklist v3", updated: "5 hours ago", author: "Trust team", status: "Current" },
  { title: "Data-rights procedure", updated: "1 day ago", author: "Compliance", status: "Review due" },
  { title: "Payout batch checklist", updated: "2 days ago", author: "Finance", status: "Current" },
];

const recommendedForRole = [
  { title: "Moderation decision trees", topic: "Moderation and trust guidance", type: "Guide" },
  { title: "Verification evidence types", topic: "Verification guidance", type: "Reference" },
  { title: "Break policy and hand-off", topic: "Wellbeing", type: "Policy" },
];

const reportingOptions = [
  { label: "Ask for help", icon: HelpCircle, desc: "Ask a subject-matter owner with category and urgency" },
  { label: "Report a console problem", icon: AlertTriangle, desc: "Bugs and usability issues with masked screenshot" },
  { label: "Report a security concern", icon: ShieldAlertIcon, desc: "Suspected compromise, phishing, lost devices — urgent path" },
  { label: "Report misconduct (confidential)", icon: LockIcon, desc: "Confidential channel to compliance or ethics line" },
  { label: "Suggest an improvement", icon: Gauge, desc: "Ideas for guides, macros, policies and tools" },
];

export function AdminHelpPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTopic, setActiveTopic] = useState(null);
  const [showDrawer, setShowDrawer] = useState(false);
  const [drawerItem, setDrawerItem] = useState(null);

  const filteredTopics = useMemo(() => {
    if (!searchQuery) return topics;
    const q = searchQuery.toLowerCase();
    return topics.filter((t) => t.label.toLowerCase().includes(q) || t.desc.toLowerCase().includes(q));
  }, [searchQuery]);

  const handleReport = (option) => {
    setDrawerItem(option);
    setShowDrawer(true);
    toast("Opening: " + option.label);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#0F1B2D]">
      <a href="#help-main" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 bg-[#0F1B2D] text-white px-4 py-2">
        Skip to content
      </a>

      <EnvironmentStrip />
      <TopBar onRefresh={() => toast("Help content refreshed")} />

      <div className="flex flex-col lg:flex-row" id="help-main">
        <AdminSidebar active="Help" />

        <main className="flex-1 min-w-0 pt-6 lg:pt-8 lg:pl-[232px] lg:px-8 pb-24">
          <SectionHead
            title="Internal Help and Runbooks"
            subtitle={"Staff roles: " + user.internalRoles.join(", ")}
            className="mb-6"
          >
            <Btn secondary icon={ReportIcon} onClick={() => { setDrawerItem(reportingOptions[2]); setShowDrawer(true); }} title="Report a concern">
              Report a concern
            </Btn>
          </SectionHead>

          <Card title padded={false} className="border-[#E5E1D8]">
            <div className="px-5 pt-4 pb-4">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4A5568]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search guides, runbooks and policies"
                  className="w-full h-10 pl-10 pr-4 rounded-[10px] border border-solid border-[#E5E1D8] bg-white text-[12px] focus:outline-none focus:border-[#B8955A] transition"
                />
                {searchQuery && (
                  <Btn size="small" secondary icon={X} className="absolute right-3 top-1/2 -translate-y-1/2" onClick={() => setSearchQuery("")} title="Clear" />
                )}
              </div>
            </div>
          </Card>

          <Card title="Quick links" padded className="border-[#E5E1D8]">
            <div className="px-5 pt-3 pb-4">
              <div className="grid gap-2 lg:grid-cols-4">
                {quickLinks.map(function (link, i) {
                  const LinkIcon = link.icon;
                  return (
                    <Link key={i} href={link.href} className="flex items-center gap-3 p-3 rounded-[10px] border border-solid border-[#E5E1D8] bg-white text-left hover:bg-[#F3EBDD] transition">
                      <LinkIcon size={14} className="flex-shrink-0 text-[#4A5568]" />
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-medium text-[#0F1B2D]">{link.label}</p>
                        <span className="text-[10px] text-[#4A5568]">{link.badge}</span>
                      </div>
                      <ArrowRight size={12} className="flex-shrink-0 text-[#4A5568]" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </Card>

          <div className="grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-8 space-y-3">
              <h3 className="text-[11px] font-semibold text-[#4A5568] uppercase tracking-wide mb-3">Topics</h3>
              {filteredTopics.map(function (topic) {
                const TopicIcon = topic.icon;
                return (
                  <Link key={topic.key} href="#" onClick={(e) => { e.preventDefault(); setActiveTopic(topic.key); toast("Opening " + topic.label); }} className="flex items-center justify-between p-3 rounded-[10px] border border-solid border-[#E5E1D8] bg-white hover:border-[#B8955A] transition">
                    <div className="flex items-center gap-3">
                      <TopicIcon size={14} className="flex-shrink-0 text-[#4A5568]" />
                      <div>
                        <p className="text-[11px] font-medium text-[#0F1B2D]">{topic.label}</p>
                        <p className="text-[10px] text-[#4A5568]">{topic.desc}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-medium text-[#0F1B2D]">{topic.count}</span>
                      <span className="text-[10px] text-[#4A5568]">pages</span>
                    </div>
                  </Link>
                );
              })}
            </div>

            <div className="lg:col-span-4 space-y-6">
              <Card title="Recently updated" padded className="border-[#E5E1D8]">
                <div className="px-5 pt-3 pb-4 space-y-3">
                  {recentlyUpdated.map(function (item, i) {
                    return (
                      <div key={i} className="p-3 rounded-[10px] border border-solid border-[#E5E1D8] bg-white">
                        <p className="text-[11px] font-medium text-[#0F1B2D]">{item.title}</p>
                        <p className="text-[10px] text-[#4A5568] flex items-center gap-1">
                          <ClockIcon size={10} className="flex-shrink-0" />
                          {item.updated} by {item.author}
                        </p>
                        <StatChip status={item.status === "Review due" ? "action_needed" : "live"} />
                      </div>
                    );
                  })}
                </div>
              </Card>

              <Card title={"Recommended for " + user.internalRole} padded className="border-[#E5E1D8]">
                <div className="px-5 pt-3 pb-4 space-y-3">
                  {recommendedForRole.map(function (item, i) {
                    return (
                      <div key={i} className="p-3 rounded-[10px] border border-solid border-[#E5E1D8] bg-white">
                        <p className="text-[11px] font-medium text-[#0F1B2D]">{item.title}</p>
                        <p className="text-[10px] text-[#4A5568]">{item.topic} · {item.type}</p>
                      </div>
                    );
                  })}
                </div>
              </Card>

              <Card title="Contact and reporting" padded className="border-[#E5E1D8]">
                <div className="px-5 pt-3 pb-4 space-y-3">
                  {reportingOptions.map(function (opt, i) {
                    const OptIcon = opt.icon;
                    return (
                      <Btn key={i} size="small" secondary className="w-full text-left text-[11px] flex items-center gap-2" onClick={() => handleReport(opt)} title={opt.label}>
                        <OptIcon size={12} className="flex-shrink-0" />
                        {opt.label}
                      </Btn>
                    );
                  })}
                </div>
              </Card>
            </div>
          </div>

          <div className="mt-8 px-5 lg:px-0 text-center lg:text-left">
            <p className="text-[11px] text-[#4A5568]">
              Guidance is authored and reviewed through the Content workflow. Every page shows owner, version and review date. Restricted guidance follows role access and is watermarked where required.
            </p>
          </div>
        </main>
      </div>

      {showDrawer && drawerItem && (
        <DetailDrawer open={showDrawer} onClose={() => setShowDrawer(false)} title={drawerItem.label}>
          <div className="space-y-5">
            <p className="text-[12px] text-[#4A5568]">{drawerItem.desc}</p>
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
