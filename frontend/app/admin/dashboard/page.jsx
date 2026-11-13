'use client';

import React, { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import {
  AlertTriangle,
  ArrowRight,
  RefreshCcw,
  Clock,
  ShieldCheck,
  Building,
  MessageCircle,
  ExternalLink,
  ChevronRight,
  X,
  Users,
  Briefcase,
  Banknote,
  CheckCircle2,
  TrendingUp,
  Download,
  AlertCircle,
  Radio,
  FileText,
  Sliders,
  Sparkles,
  Zap,
} from 'lucide-react';
import { AdminShell } from '@/components';
import {
  Card,
  Btn,
  BtnIcon,
  StatChip,
  DetailDrawer,
  toast,
} from '@/components/admin-ui';
import {
  kpiSummary,
  nextUpTask,
  roleQueues,
  priorityAlerts,
  roleDistribution,
  systemServicesHealth,
  recentActivityFeed,
} from './dashboard-data';

export default function AdminDashboardPage() {
  const [alerts, setAlerts] = useState(priorityAlerts);
  const [alertFilter, setAlertFilter] = useState('all'); // 'all' | 'critical' | 'medium'
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState('--:--:--');
  const [skippedNextUp, setSkippedNextUp] = useState(false);

  useEffect(() => {
    setLastUpdated(
      new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour12: false })
    );
  }, []);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      setLastUpdated(
        new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour12: false })
      );
      toast('Admin dashboard metrics synchronized with production cluster');
    }, 600);
  }, []);

  const handleAcknowledgeAlert = (id) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
    toast(`Alert ${id} acknowledged and archived`);
  };

  const handleOpenAlertDrawer = (alertItem) => {
    setSelectedAlert(alertItem);
    setDrawerOpen(true);
  };

  const filteredAlerts = alerts.filter((a) => {
    if (alertFilter === 'critical') return a.severity === 'critical';
    if (alertFilter === 'medium') return a.severity === 'medium';
    return true;
  });

  return (
    <AdminShell active="Dashboard" onRefresh={handleRefresh}>
      {/* ------------------------------------------------------------------ */}
      {/* Header & Live Operational Status                                   */}
      {/* ------------------------------------------------------------------ */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 border-b border-[#E5E1D8] pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E7F3EC] border border-[#2E7D5B]/30 px-2.5 py-0.5 text-xs font-semibold text-[#286749]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#2E7D5B] animate-pulse" />
              Live Cluster Ingress Active
            </span>
            <span className="text-xs text-[#4A5568]">· Region: ap-south-1 (Mumbai)</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#0F1B2D]">
            Administrator Operations Center
          </h1>
          <p className="text-xs text-[#4A5568] mt-1">
            Real-time control pane across Startups, Mentors, Investors, Job Seekers, and Employers.
          </p>
        </div>

        <div className="flex items-center gap-2.5 text-xs">
          <div className="hidden sm:flex flex-col text-right">
            <span className="text-[11px] text-[#4A5568]">Live Telemetry</span>
            <span className="font-mono font-semibold text-[#0F1B2D]">{lastUpdated} IST</span>
          </div>
          <Btn
            small
            secondary
            icon={RefreshCcw}
            onClick={handleRefresh}
            disabled={refreshing}
            title="Synchronize platform state"
          >
            {refreshing ? 'Syncing...' : 'Sync Now'}
          </Btn>
          <Btn
            small
            secondary
            icon={Download}
            onClick={() => toast('Exporting platform operations snapshot CSV...')}
            title="Export CSV Snapshot"
          >
            Export
          </Btn>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Executive KPI Ribbon                                               */}
      {/* ------------------------------------------------------------------ */}
      <section className="mb-6">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {kpiSummary.map((kpi) => {
            const Icon = kpi.icon;
            return (
              <div
                key={kpi.key}
                className="rounded-xl border border-[#E5E1D8] bg-white p-4 shadow-xs hover:border-[#B8955A] transition"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-[#4A5568]">{kpi.label}</span>
                  <div className="p-2 rounded-lg bg-[#FAF8F4] text-[#0F1B2D]">
                    <Icon size={16} />
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-serif font-bold text-[#0F1B2D] tracking-tight">
                    {kpi.value}
                  </span>
                  <span
                    className={`text-xs font-semibold px-1.5 py-0.5 rounded ${
                      kpi.trend === 'warning'
                        ? 'bg-[#FDF3E0] text-[#9A6210]'
                        : 'bg-[#E7F3EC] text-[#286749]'
                    }`}
                  >
                    {kpi.change}
                  </span>
                </div>
                <p className="text-[11px] text-[#4A5568] mt-2">{kpi.sub}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* "Next Up For You" Spotlight Queue Item                              */}
      {/* ------------------------------------------------------------------ */}
      {!skippedNextUp && (
        <section className="mb-6">
          <div className="rounded-xl border border-[#B8955A]/50 bg-[#FAF8F4] p-4 sm:p-5 shadow-xs relative overflow-hidden">
            <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 w-28 h-28 bg-[#F3EBDD] rounded-full opacity-50 pointer-events-none" />

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
              <div className="space-y-1.5 max-w-2xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#0F1B2D] px-2.5 py-0.5 text-[11px] font-semibold text-white">
                    <Sparkles size={11} className="text-[#B8955A]" />
                    Next Task Up For You
                  </span>
                  <span className="rounded-full bg-[#FBE9E7] border border-[#B42318]/30 px-2 py-0.5 text-[11px] font-medium text-[#B42318]">
                    {nextUpTask.timeLeft}
                  </span>
                  <span className="text-xs font-mono text-[#4A5568]">#{nextUpTask.id}</span>
                </div>

                <h2 className="text-base font-semibold text-[#0F1B2D]">{nextUpTask.title}</h2>
                <p className="text-xs text-[#4A5568] leading-relaxed">
                  <span className="font-medium text-[#0F1B2D]">{nextUpTask.applicant}</span> · {nextUpTask.category}
                </p>
                <div className="flex items-center gap-3 text-[11px] text-[#4A5568] pt-0.5">
                  <span>In Queue: <b className="text-[#0F1B2D]">{nextUpTask.waitingTime}</b></span>
                  <span>·</span>
                  <span>Target SLA: <b className="text-[#0F1B2D]">{nextUpTask.targetHours}h</b></span>
                  <span>·</span>
                  <span>Queue: <b className="text-[#0F1B2D]">{nextUpTask.queue}</b></span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                <Link
                  href={nextUpTask.link}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0F1B2D] px-4 py-2 text-xs font-semibold text-white hover:bg-[#1C2B42] transition shadow-xs"
                >
                  <span>Start Review</span>
                  <ArrowRight size={14} />
                </Link>
                <Btn
                  small
                  secondary
                  onClick={() => {
                    setSkippedNextUp(true);
                    toast('Task skipped for next available queue item');
                  }}
                  title="Skip to next queue item"
                >
                  Skip for Now
                </Btn>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* Operations Queues Across All 5 Roles                               */}
      {/* ------------------------------------------------------------------ */}
      <section className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#0F1B2D]">
              Operational Action Queues
            </h2>
            <p className="text-[11px] text-[#4A5568]">
              Active queues organized by entity role and compliance thresholds
            </p>
          </div>
          <Link
            href="/admin/verifications"
            className="text-xs text-[#B8955A] hover:underline font-medium inline-flex items-center gap-1"
          >
            <span>View All Queues</span>
            <ChevronRight size={13} />
          </Link>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {roleQueues.map((q) => {
            const Icon = q.icon;
            const isAtRisk = q.status === 'atRisk';
            return (
              <Link
                key={q.key}
                href={q.link}
                className="flex flex-col justify-between rounded-xl border border-[#E5E1D8] bg-white p-4 shadow-xs hover:border-[#B8955A] hover:shadow-sm transition group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2 rounded-lg bg-[#FAF8F4] text-[#0F1B2D] group-hover:bg-[#F3EBDD] transition">
                      <Icon size={17} />
                    </div>
                    <StatChip status={isAtRisk ? 'critical' : 'live'} />
                  </div>

                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-serif font-bold text-[#0F1B2D] tabular-nums">
                      {q.count}
                    </span>
                    {q.assignedToMe > 0 && (
                      <span className="text-[11px] font-medium text-[#B8955A] bg-[#F3EBDD] px-2 py-0.5 rounded-full">
                        {q.assignedToMe} yours
                      </span>
                    )}
                  </div>

                  <div className="text-xs font-semibold text-[#0F1B2D] mt-1">{q.label}</div>
                  <p className="text-[11px] text-[#4A5568] mt-0.5">{q.sub}</p>

                  {/* Progress SLA Bar */}
                  <div className="mt-3 w-full bg-[#FAF8F4] border border-[#E5E1D8] h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${isAtRisk ? 'bg-[#B42318]' : 'bg-[#2E7D5B]'}`}
                      style={{ width: `${q.progressPct}%` }}
                    />
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-[#E5E1D8] flex items-center justify-between text-xs text-[#B8955A] font-medium">
                  <span>Open Queue</span>
                  <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Priority Attention Strip with Filters                              */}
      {/* ------------------------------------------------------------------ */}
      <section className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#0F1B2D] flex items-center gap-2">
              <span>Requires Priority Attention</span>
              <span className="rounded-full bg-[#FBE9E7] text-[#B42318] px-2 py-0.2 text-[11px]">
                {alerts.length}
              </span>
            </h2>
            <p className="text-[11px] text-[#4A5568]">
              Automated alarms, SLA near-breaches, and flagged platform incidents
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-[#FAF8F4] border border-[#E5E1D8] p-1 rounded-lg">
            <button
              type="button"
              onClick={() => setAlertFilter('all')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition ${
                alertFilter === 'all'
                  ? 'bg-white text-[#0F1B2D] shadow-xs'
                  : 'text-[#4A5568] hover:text-[#0F1B2D]'
              }`}
            >
              All Alerts
            </button>
            <button
              type="button"
              onClick={() => setAlertFilter('critical')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition ${
                alertFilter === 'critical'
                  ? 'bg-white text-[#B42318] shadow-xs font-semibold'
                  : 'text-[#4A5568] hover:text-[#0F1B2D]'
              }`}
            >
              Sev 1 Critical
            </button>
            <button
              type="button"
              onClick={() => setAlertFilter('medium')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition ${
                alertFilter === 'medium'
                  ? 'bg-white text-[#9A6210] shadow-xs font-semibold'
                  : 'text-[#4A5568] hover:text-[#0F1B2D]'
              }`}
            >
              Sev 2 Medium
            </button>
          </div>
        </div>

        {filteredAlerts.length === 0 ? (
          <div className="rounded-xl border border-[#E5E1D8] bg-white p-6 text-center">
            <CheckCircle2 size={24} className="text-[#2E7D5B] mx-auto mb-2" />
            <h3 className="text-xs font-semibold text-[#0F1B2D]">All clear in this alert tier</h3>
            <p className="text-[11px] text-[#4A5568]">No active incidents requiring immediate intervention.</p>
          </div>
        ) : (
          <div className="grid gap-2.5 sm:grid-cols-2">
            {filteredAlerts.map((item) => {
              const isSev1 = item.severity === 'critical';
              return (
                <div
                  key={item.id}
                  className={`flex items-start justify-between gap-3 rounded-xl border p-3.5 shadow-xs transition ${
                    isSev1
                      ? 'border-[#B42318]/40 bg-white hover:border-[#B42318]'
                      : 'border-[#E5E1D8] bg-white hover:border-[#B8955A]'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`p-2 rounded-lg shrink-0 mt-0.5 ${
                        isSev1 ? 'bg-[#FBE9E7] text-[#B42318]' : 'bg-[#FDF3E0] text-[#9A6210]'
                      }`}
                    >
                      <AlertTriangle size={15} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded ${
                            isSev1 ? 'bg-[#FBE9E7] text-[#B42318]' : 'bg-[#FDF3E0] text-[#9A6210]'
                          }`}
                        >
                          {item.severityLabel}
                        </span>
                        <span className="text-[11px] text-[#A0A7B4]">{item.source} · {item.time}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleOpenAlertDrawer(item)}
                        className="font-semibold text-xs text-[#0F1B2D] hover:text-[#B8955A] text-left leading-snug block"
                      >
                        {item.title}
                      </button>
                      <p className="text-xs text-[#4A5568] mt-1 leading-relaxed line-clamp-2">
                        {item.desc}
                      </p>
                      <div className="mt-2.5 flex items-center gap-2">
                        <Link
                          href={item.link}
                          className="text-xs font-medium text-[#B8955A] hover:underline inline-flex items-center gap-1"
                        >
                          <span>Investigate in console</span>
                          <ArrowRight size={12} />
                        </Link>
                        <span className="text-[#A0A7B4]">·</span>
                        <button
                          type="button"
                          onClick={() => handleOpenAlertDrawer(item)}
                          className="text-xs text-[#4A5568] hover:text-[#0F1B2D]"
                        >
                          Inspect details
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleAcknowledgeAlert(item.id)}
                    className="rounded-lg p-1 text-[#A0A7B4] hover:bg-[#FAF8F4] hover:text-[#0F1B2D] shrink-0"
                    aria-label="Acknowledge alert"
                    title="Acknowledge & dismiss"
                  >
                    <X size={14} />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 2-Column Grid: Role Demographics & Platform Health                 */}
      {/* ------------------------------------------------------------------ */}
      <div className="grid gap-6 lg:grid-cols-2 mb-6">
        {/* Platform Demographic Breakdown */}
        <Card title="Multi-Role Platform Demographics" titleIcon={Users}>
          <div className="space-y-4">
            <p className="text-xs text-[#4A5568] leading-relaxed">
              Distribution of 14,820 verified and active accounts across the 5 primary platform roles:
            </p>

            <div className="space-y-3">
              {roleDistribution.map((rd) => (
                <div key={rd.role} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-[#0F1B2D]">{rd.role}</span>
                    <span className="text-[#4A5568]">
                      <b>{rd.count.toLocaleString()}</b> ({rd.pct}%)
                    </span>
                  </div>
                  <div className="w-full bg-[#FAF8F4] border border-[#E5E1D8] h-2 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${rd.pct}%`, backgroundColor: rd.color }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-[#E5E1D8] flex items-center justify-between text-xs">
              <Link
                href="/admin/users"
                className="text-[#B8955A] font-medium hover:underline inline-flex items-center gap-1"
              >
                <span>Directory & Account Management</span>
                <ChevronRight size={13} />
              </Link>
              <Link
                href="/admin/analytics"
                className="text-[#4A5568] hover:text-[#0F1B2D] inline-flex items-center gap-1"
              >
                <span>Cohort Analytics</span>
                <ExternalLink size={12} />
              </Link>
            </div>
          </div>
        </Card>

        {/* Infrastructure & Cloud Services Health */}
        <Card title="Infrastructure & Cluster Telemetry" titleIcon={ShieldCheck}>
          <div className="space-y-2.5">
            {systemServicesHealth.map((svc) => (
              <div
                key={svc.service}
                className="flex items-center justify-between rounded-lg border border-[#E5E1D8] bg-[#FAF8F4] p-3 text-xs"
              >
                <div>
                  <div className="font-semibold text-[#0F1B2D]">{svc.service}</div>
                  <div className="text-[11px] text-[#4A5568] mt-0.5">
                    {svc.metric} · Ping: {svc.latency}
                  </div>
                </div>
                <StatChip status={svc.status} />
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-[#E5E1D8] flex items-center justify-between text-xs">
            <span className="text-[#4A5568]">Zero active P0 outage alarms</span>
            <Link
              href="/admin/system"
              className="font-medium text-[#B8955A] hover:underline inline-flex items-center gap-1"
            >
              <span>Full System Metrics</span>
              <ExternalLink size={12} />
            </Link>
          </div>
        </Card>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Real-time Administrative Audit Stream                              */}
      {/* ------------------------------------------------------------------ */}
      <section className="mb-6">
        <Card title="Real-Time Platform Audit Stream" titleIcon={Clock}>
          <div className="divide-y divide-[#E5E1D8]">
            {recentActivityFeed.map((act) => (
              <div
                key={act.id}
                className="py-3 first:pt-0 last:pb-0 flex items-start justify-between gap-3 text-xs hover:bg-[#FAF8F4]/50 px-1 rounded transition"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] text-[#A0A7B4]">#{act.id}</span>
                    <span className="font-semibold text-[#0F1B2D]">{act.actor}</span>
                    <span className="text-[10px] font-medium bg-[#FAF8F4] border border-[#E5E1D8] px-2 py-0.5 rounded text-[#4A5568]">
                      {act.role}
                    </span>
                  </div>
                  <p className="text-[#0F1B2D]">
                    {act.action} — <b className="text-[#0F1B2D]">{act.subject}</b>
                  </p>
                  <span className="text-[11px] text-[#A0A7B4] block">{act.time}</span>
                </div>

                <Link
                  href={act.link}
                  className="shrink-0 p-1.5 rounded-lg text-[#A0A7B4] hover:text-[#0F1B2D] hover:bg-[#FAF8F4] transition"
                  title="View audit record"
                >
                  <ExternalLink size={14} />
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-[#E5E1D8] text-right">
            <Link
              href="/admin/audit"
              className="text-xs font-medium text-[#B8955A] hover:underline inline-flex items-center gap-1"
            >
              <span>Browse Immutable Security Audit Log</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </Card>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Alert Detail Inspection Drawer                                     */}
      {/* ------------------------------------------------------------------ */}
      <DetailDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={selectedAlert ? `${selectedAlert.severityLabel} Inspection` : 'Alert Details'}
      >
        {selectedAlert && (
          <div className="space-y-4">
            <div className="rounded-xl border border-[#E5E1D8] bg-[#FAF8F4] p-4 space-y-2">
              <span className="font-mono text-xs text-[#A0A7B4]">Alert ID: {selectedAlert.id}</span>
              <h3 className="text-sm font-semibold text-[#0F1B2D]">{selectedAlert.title}</h3>
              <p className="text-xs text-[#4A5568] leading-relaxed">{selectedAlert.desc}</p>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-2 border-b border-[#E5E1D8]">
                <span className="text-[#4A5568]">Originating Service</span>
                <span className="font-medium text-[#0F1B2D]">{selectedAlert.source}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#E5E1D8]">
                <span className="text-[#4A5568]">Logged Timestamp</span>
                <span className="font-medium text-[#0F1B2D]">{selectedAlert.time}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#E5E1D8]">
                <span className="text-[#4A5568]">Target Resolution Action</span>
                <Link href={selectedAlert.link} className="text-[#B8955A] font-medium hover:underline">
                  Open Target Module →
                </Link>
              </div>
            </div>

            <div className="pt-4 flex gap-2">
              <Btn
                className="flex-1 justify-center"
                onClick={() => {
                  handleAcknowledgeAlert(selectedAlert.id);
                  setDrawerOpen(false);
                }}
              >
                Acknowledge & Clear Alert
              </Btn>
              <Btn
                secondary
                onClick={() => setDrawerOpen(false)}
              >
                Close
              </Btn>
            </div>
          </div>
        )}
      </DetailDrawer>
    </AdminShell>
  );
}

export { AdminDashboardPage };
