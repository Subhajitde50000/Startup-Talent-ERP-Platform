'use client';

import React, { useState, useMemo, useCallback } from 'react';
import {
  BarChart3,
  TrendingUp,
  Download,
  RefreshCcw,
  Users,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  ShieldCheck,
} from 'lucide-react';
import { AdminShell } from '@/components';
import {
  Card,
  Btn,
  StatChip,
  TabBar,
  RangeFilter,
  ResponsiveTable,
  MetricCard,
  toast,
} from '@/components/admin-ui';
import {
  analyticsTabs,
  rangeFilters,
  kpis,
  funnelStages,
  insights,
} from './analytics-data';

export default function AdminAnalyticsPage({ initialTab = 'overview' }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [activeRange, setActiveRange] = useState('30-days');
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      toast('Analytics cohorts refreshed');
    }, 600);
  }, []);

  return (
    <AdminShell active="Analytics" onRefresh={handleRefresh}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 border-b border-[#E5E1D8] pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#0F1B2D]">Platform Analytics & Cohorts</h1>
          <p className="text-xs text-[#4A5568] mt-1 max-w-2xl">
            Aggregate signup conversions, role-wise funnel progression, GMV trends, and marketplace retention.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Btn small secondary icon={RefreshCcw} onClick={handleRefresh} title="Sync analytics">
            Sync
          </Btn>
          <Btn
            small
            secondary
            icon={Download}
            onClick={() => toast('Exporting cohort analytics bundle')}
            title="Export metrics"
          >
            Export
          </Btn>
        </div>
      </div>

      {/* KPI Overview */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 mb-6">
        {kpis.map((kpi, i) => (
          <MetricCard key={i} label={kpi.label} value={kpi.value} sub={kpi.sub} status={kpi.status} />
        ))}
      </div>

      {/* Tabs */}
      <TabBar active={activeTab} onChange={setActiveTab} tabs={analyticsTabs} />

      {/* Date Range Filter */}
      <div className="flex items-center justify-between border-b border-[#E5E1D8] pb-3 mb-6">
        <RangeFilter active={activeRange} onChange={setActiveRange} filters={rangeFilters} />
      </div>

      {/* Automated Editorial Insights */}
      <div className="mb-6 space-y-2.5">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-[#4A5568]">
          Automated Insights ({insights.length})
        </h2>
        <div className="grid gap-2.5 sm:grid-cols-3">
          {insights.map((ins, i) => (
            <div
              key={i}
              className="flex items-start gap-2.5 rounded-xl border border-[#E5E1D8] bg-white p-3.5 text-xs shadow-xs"
            >
              {ins.type === 'positive' ? (
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle size={16} className="text-amber-600 shrink-0 mt-0.5" />
              )}
              <p className="text-[#0F1B2D] leading-relaxed">{ins.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Funnel Progress Matrix */}
      <Card title="Role-Wise Funnel Progression" titleIcon={TrendingUp} padded={false}>
        <ResponsiveTable>
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#E5E1D8] bg-[#FAF8F4]/80">
                {['Lifecycle Stage', 'Startups', 'Mentors', 'Investors', 'Employers', 'Job Seekers'].map((h) => (
                  <th key={h} className="p-3 text-xs font-semibold text-[#4A5568] whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {funnelStages.map((stg) => (
                <tr key={stg.stage} className="border-b border-[#E5E1D8]/60 last:border-0 hover:bg-[#FAF8F4]">
                  <td className="p-3 font-semibold text-[#0F1B2D] whitespace-nowrap">{stg.stage}</td>
                  <td className="p-3 font-mono text-[#0F1B2D] whitespace-nowrap">{stg.startups.toLocaleString()}</td>
                  <td className="p-3 font-mono text-[#0F1B2D] whitespace-nowrap">{stg.mentors.toLocaleString()}</td>
                  <td className="p-3 font-mono text-[#0F1B2D] whitespace-nowrap">{stg.investors.toLocaleString()}</td>
                  <td className="p-3 font-mono text-[#0F1B2D] whitespace-nowrap">{stg.employers.toLocaleString()}</td>
                  <td className="p-3 font-mono font-medium text-[#0F1B2D] whitespace-nowrap">{stg.jobseekers.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </ResponsiveTable>
      </Card>
    </AdminShell>
  );
}

export { AdminAnalyticsPage };
