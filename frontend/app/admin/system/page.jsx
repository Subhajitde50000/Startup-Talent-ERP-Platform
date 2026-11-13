'use client';

import React, { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import {
  Monitor,
  Activity,
  AlertTriangle,
  Server,
  RefreshCcw,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import { AdminShell } from '@/components';
import {
  Card,
  Btn,
  StatChip,
  TabBar,
  ResponsiveTable,
  DetailDrawer,
  MetricCard,
  toast,
} from '@/components/admin-ui';
import {
  systemTabs,
  summaryStrip,
  services,
  alerts,
  incidents,
} from './system-data';

export default function AdminSystemPage({ initialTab = 'overview' }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [selectedService, setSelectedService] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      toast('Infrastructure telemetry refreshed');
    }, 600);
  }, []);

  return (
    <AdminShell active="System Health" onRefresh={handleRefresh}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 border-b border-[#E5E1D8] pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#0F1B2D]">System Health & Telemetry</h1>
          <p className="text-xs text-[#4A5568] mt-1 max-w-2xl">
            Real-time SLO attainment, API latencies, worker threads, and cluster infrastructure status.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Btn small secondary icon={RefreshCcw} onClick={handleRefresh} title="Sync telemetry">
            Sync
          </Btn>
          <Link
            href="/admin/help"
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#E5E1D8] bg-white px-3 py-1.5 text-xs font-medium text-[#0F1B2D] hover:bg-[#FAF8F4]"
          >
            Incident Runbooks <ExternalLink size={12} />
          </Link>
        </div>
      </div>

      {/* KPI Overview */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        {summaryStrip.map((s, i) => (
          <MetricCard key={i} label={s.label} value={s.value} sub={s.sub} status={s.status} />
        ))}
      </div>

      {/* Tabs */}
      <TabBar active={activeTab} onChange={setActiveTab} tabs={systemTabs} />

      {/* Overview & Services */}
      {(activeTab === 'overview' || activeTab === 'services-and-slos') && (
        <div className="space-y-6">
          {/* Active Incidents Banner */}
          {incidents.filter((inc) => inc.state === 'Mitigating').length > 0 && (
            <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-amber-900 flex items-center gap-1.5">
                  <AlertTriangle size={15} /> Active Mitigation: INC-2026-021
                </span>
                <StatChip status="pending" />
              </div>
              <p className="text-amber-800">
                Payment webhook acknowledgments delayed due to upstream gateway latency. Automatic retry queue active.
              </p>
            </div>
          )}

          {/* Core Services Table */}
          <Card title="Tier 1 & Tier 2 Microservices Status" titleIcon={Server} padded={false}>
            <ResponsiveTable>
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#E5E1D8] bg-[#FAF8F4]/80">
                    {['Service', 'Tier', 'SLO Target', 'p95 Latency', 'Error Rate', 'Owner', 'Status', ''].map((h) => (
                      <th key={h} className="p-3 text-xs font-semibold text-[#4A5568] whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {services.map((s) => (
                    <tr
                      key={s.key}
                      onClick={() => {
                        setSelectedService(s);
                        setDrawerOpen(true);
                      }}
                      className="border-b border-[#E5E1D8]/60 last:border-0 hover:bg-[#FAF8F4] cursor-pointer transition"
                    >
                      <td className="p-3 font-semibold text-[#0F1B2D] whitespace-nowrap">{s.name}</td>
                      <td className="p-3 whitespace-nowrap font-mono text-[#4A5568]">Tier {s.tier}</td>
                      <td className="p-3 font-medium text-[#0F1B2D] whitespace-nowrap">{s.sloAttainment}</td>
                      <td className="p-3 font-mono text-[#0F1B2D] whitespace-nowrap">{s.p95Ms}</td>
                      <td className="p-3 font-mono text-[#4A5568] whitespace-nowrap">{s.errorRate}</td>
                      <td className="p-3 capitalize text-[#4A5568] whitespace-nowrap">{s.owner}</td>
                      <td className="p-3 whitespace-nowrap">
                        <StatChip status={s.status} />
                      </td>
                      <td className="p-3 text-right">
                        <ChevronRight size={14} className="text-[#A0A7B4]" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </ResponsiveTable>
          </Card>
        </div>
      )}

      {/* Alerts Tab */}
      {activeTab === 'alerts' && (
        <Card title="Firing Telemetry Alerts" titleIcon={AlertTriangle}>
          <ResponsiveTable>
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#E5E1D8] bg-[#FAF8F4]/80">
                  {['Alert ID', 'Service', 'Trigger Rule', 'Severity', 'Triggered', 'State'].map((h) => (
                    <th key={h} className="p-3 text-xs font-semibold text-[#4A5568] whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {alerts.map((a) => (
                  <tr key={a.id} className="border-b border-[#E5E1D8]/60 last:border-0 hover:bg-[#FAF8F4]">
                    <td className="p-3 font-mono font-medium text-[#0F1B2D]">{a.id}</td>
                    <td className="p-3 font-medium text-[#0F1B2D]">{a.service}</td>
                    <td className="p-3 text-[#4A5568]">{a.rule}</td>
                    <td className="p-3"><StatChip status={a.severity === 'SEV2' ? 'critical' : 'medium'} /></td>
                    <td className="p-3 text-[#4A5568]">{a.started}</td>
                    <td className="p-3"><StatChip status={a.state === 'firing' ? 'critical' : 'resolved'} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </ResponsiveTable>
        </Card>
      )}

      {/* Incidents Tab */}
      {activeTab === 'incidents' && (
        <Card title="Recent Incident Timeline" titleIcon={Activity}>
          <ResponsiveTable>
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#E5E1D8] bg-[#FAF8F4]/80">
                  {['Incident ID', 'Title', 'Severity', 'State', 'Started', 'Impact Scope'].map((h) => (
                    <th key={h} className="p-3 text-xs font-semibold text-[#4A5568] whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {incidents.map((inc) => (
                  <tr key={inc.id} className="border-b border-[#E5E1D8]/60 last:border-0 hover:bg-[#FAF8F4]">
                    <td className="p-3 font-mono font-medium text-[#0F1B2D]">{inc.id}</td>
                    <td className="p-3 font-medium text-[#0F1B2D]">{inc.title}</td>
                    <td className="p-3"><StatChip status={inc.severity === 'SEV2' ? 'critical' : 'medium'} /></td>
                    <td className="p-3 font-medium text-[#0F1B2D]">{inc.state}</td>
                    <td className="p-3 text-[#4A5568]">{inc.started}</td>
                    <td className="p-3 text-[#4A5568]">{inc.impact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </ResponsiveTable>
        </Card>
      )}

      {/* Fallback for other tabs */}
      {!['overview', 'services-and-slos', 'alerts', 'incidents'].includes(activeTab) && (
        <Card title={`${activeTab.replace(/-/g, ' ').toUpperCase()} Telemetry View`} padded>
          <div className="text-xs text-[#4A5568] space-y-2">
            <p>Platform status and capacity logs for {activeTab.replace(/-/g, ' ')}.</p>
            <div className="rounded-lg bg-[#FAF8F4] border border-[#E5E1D8] p-4 text-xs font-mono">
              Status: Operational · Pods: 18/18 · Memory utilization: 42%
            </div>
          </div>
        </Card>
      )}

      {/* Service Drawer */}
      {drawerOpen && selectedService && (
        <DetailDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          title={`Service: ${selectedService.name}`}
        >
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3 rounded-xl bg-[#FAF8F4] border border-[#E5E1D8] p-3">
              <div>
                <span className="text-[#A0A7B4] block text-[11px]">SLO Attainment</span>
                <span className="text-sm font-bold text-[#0F1B2D]">{selectedService.sloAttainment}</span>
              </div>
              <div>
                <span className="text-[#A0A7B4] block text-[11px]">p95 Latency</span>
                <span className="text-sm font-semibold text-[#0F1B2D] font-mono">{selectedService.p95Ms}</span>
              </div>
              <div>
                <span className="text-[#A0A7B4] block text-[11px]">Error Rate</span>
                <span className="font-mono text-[#0F1B2D]">{selectedService.errorRate}</span>
              </div>
              <div>
                <span className="text-[#A0A7B4] block text-[11px]">Owner Team</span>
                <span className="capitalize text-[#0F1B2D]">{selectedService.owner}</span>
              </div>
            </div>
            <div className="flex gap-2 pt-2">
              <Btn
                secondary
                onClick={() => toast(`Opening Grafana dashboard for ${selectedService.key}`)}
                className="flex-1"
              >
                Grafana Dashboard
              </Btn>
              <Btn onClick={() => setDrawerOpen(false)} className="flex-1">
                Close
              </Btn>
            </div>
          </div>
        </DetailDrawer>
      )}
    </AdminShell>
  );
}

export { AdminSystemPage };
