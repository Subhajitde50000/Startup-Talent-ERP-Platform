'use client';

import React, { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Wrench,
  SlidersHorizontal,
  RefreshCcw,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Lock,
  Plus,
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
  ToggleSwitch,
  toast,
} from '@/components/admin-ui';
import {
  configTabs,
  summaryStrip,
  featureFlags,
  limits,
} from './config-data';

export default function AdminConfigPage({ initialTab = 'feature-flags' }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(initialTab);
  const [flags, setFlags] = useState(featureFlags);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      toast('Configuration flags synced with etcd cluster');
    }, 600);
  }, []);

  const handleToggleFlag = (key) => {
    setFlags((prev) =>
      prev.map((f) => {
        if (f.key === key) {
          const nextState = !f.enabled;
          toast(`Toggled feature flag '${f.name}' to ${nextState ? 'ENABLED' : 'DISABLED'}`);
          return { ...f, enabled: nextState };
        }
        return f;
      })
    );
  };

  return (
    <AdminShell active="Configuration" onRefresh={handleRefresh}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 border-b border-[#E5E1D8] pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#0F1B2D]">Platform Configuration & Flags</h1>
          <p className="text-xs text-[#4A5568] mt-1 max-w-2xl">
            Live feature flag toggles, canary percentages, system throttling limits, and scheduled code freeze windows.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Btn small secondary icon={RefreshCcw} onClick={handleRefresh} title="Sync config">
            Sync
          </Btn>
          <Btn
            small
            icon={Plus}
            onClick={() => router.push('/admin/config/new')}
            title="Create new feature flag"
          >
            Create Flag
          </Btn>
        </div>
      </div>

      {/* KPI Overview */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        {summaryStrip.map((s, i) => (
          <MetricCard key={i} label={s.label} value={s.value} sub={s.sub} status={s.status} />
        ))}
      </div>

      {/* Tabs */}
      <TabBar active={activeTab} onChange={setActiveTab} tabs={configTabs} />

      {/* Feature Flags Tab */}
      {activeTab === 'feature-flags' && (
        <Card title="Live Feature Flags & Rollouts" titleIcon={SlidersHorizontal} padded={false}>
          <ResponsiveTable>
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#E5E1D8] bg-[#FAF8F4]/80">
                  {['Flag Name & Identifier', 'Owner Team', 'Rollout Percentage', 'Environment Status', 'Live Switch'].map((h) => (
                    <th key={h} className="p-3 text-xs font-semibold text-[#4A5568] whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {flags.map((f, i) => (
                  <tr key={f.key} className="border-b border-[#E5E1D8]/60 last:border-0 hover:bg-[#FAF8F4]">
                    <td className="p-3 whitespace-nowrap">
                      <div className="font-semibold text-[#0F1B2D]">{f.name}</div>
                      <div className="font-mono text-[11px] text-[#A0A7B4]">{f.key}</div>
                    </td>
                    <td className="p-3 capitalize text-[#4A5568] whitespace-nowrap">{f.owner}</td>
                    <td className="p-3 font-mono font-medium text-[#0F1B2D] whitespace-nowrap">{f.rollout}</td>
                    <td className="p-3 whitespace-nowrap">
                      <StatChip status={f.status} />
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      <ToggleSwitch
                        checked={f.enabled}
                        onChange={() => handleToggleFlag(f.key)}
                        label={`Toggle ${f.name}`}
                        id={`flag-toggle-${f.key}`}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </ResponsiveTable>
        </Card>
      )}

      {/* Rate Limits Tab */}
      {activeTab === 'rate-limits' && (
        <Card title="Operational Throttle & Rate Limits" titleIcon={Wrench} padded={false}>
          <ResponsiveTable>
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#E5E1D8] bg-[#FAF8F4]/80">
                  {['Limit Scope', 'Threshold Limit', 'Unit', 'Owner Team', 'Action'].map((h) => (
                    <th key={h} className="p-3 text-xs font-semibold text-[#4A5568] whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {limits.map((l) => (
                  <tr key={l.key} className="border-b border-[#E5E1D8]/60 last:border-0 hover:bg-[#FAF8F4]">
                    <td className="p-3 font-semibold text-[#0F1B2D] whitespace-nowrap">{l.name}</td>
                    <td className="p-3 font-mono font-bold text-[#0F1B2D] whitespace-nowrap">{l.value}</td>
                    <td className="p-3 text-[#4A5568] whitespace-nowrap">{l.unit}</td>
                    <td className="p-3 capitalize text-[#4A5568] whitespace-nowrap">{l.owner}</td>
                    <td className="p-3 whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => toast(`Editing limit threshold for ${l.name}`)}
                        className="text-xs font-medium text-[#B8955A] hover:underline"
                      >
                        Adjust Limit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </ResponsiveTable>
        </Card>
      )}

      {/* Maintenance & Freeze Tab */}
      {activeTab === 'maintenance' && (
        <Card title="Scheduled Maintenance & Freezes" titleIcon={Calendar} padded>
          <div className="space-y-3 text-xs">
            <div className="rounded-xl border border-[#E5E1D8] bg-[#FAF8F4] p-3 flex justify-between items-center">
              <div>
                <span className="font-bold text-[#0F1B2D] block">Year-End Code Freeze</span>
                <span className="text-[#4A5568]">15 Dec 2026 – 10 Jan 2027 • Critical hotfixes only</span>
              </div>
              <StatChip status="scheduled" />
            </div>
            <div className="rounded-xl border border-[#E5E1D8] bg-[#FAF8F4] p-3 flex justify-between items-center">
              <div>
                <span className="font-bold text-[#0F1B2D] block">Database Index Optimization Window</span>
                <span className="text-[#4A5568]">12 Nov 2026 • 02:00 – 02:30 IST</span>
              </div>
              <StatChip status="scheduled" />
            </div>
          </div>
        </Card>
      )}
    </AdminShell>
  );
}

export { AdminConfigPage };
