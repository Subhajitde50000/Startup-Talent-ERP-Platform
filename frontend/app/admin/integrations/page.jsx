'use client';

import React, { useState, useMemo, useCallback } from 'react';
import {
  Share2,
  Key,
  RefreshCcw,
  ShieldCheck,
  AlertTriangle,
  Server,
  Zap,
  ExternalLink,
  ChevronRight,
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
  integrationTabs,
  summaryStrip,
  providers,
  webhooks,
} from './integrations-data';

export default function AdminIntegrationsPage({ initialTab = 'providers' }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      toast('Integrations health and quotas refreshed');
    }, 600);
  }, []);

  return (
    <AdminShell active="Integrations" onRefresh={handleRefresh}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 border-b border-[#E5E1D8] pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#0F1B2D]">Third-Party Integrations & APIs</h1>
          <p className="text-xs text-[#4A5568] mt-1 max-w-2xl">
            External service connections, webhook event delivery, automated failover triggers, and API credential management.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Btn small secondary icon={RefreshCcw} onClick={handleRefresh} title="Sync integrations">
            Sync
          </Btn>
          <Btn
            small
            onClick={() => toast('Triggering credential rotation test')}
            title="Test webhook endpoints"
          >
            Test Webhooks
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
      <TabBar active={activeTab} onChange={setActiveTab} tabs={integrationTabs} />

      {/* Providers Tab */}
      {activeTab === 'providers' && (
        <Card title="Connected External Cloud Providers" titleIcon={Server} padded={false}>
          <ResponsiveTable>
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#E5E1D8] bg-[#FAF8F4]/80">
                  {['Provider Name', 'Service Category', 'Monthly Quota', 'Secret Rotation Due', 'Fallback Strategy', 'Status'].map((h) => (
                    <th key={h} className="p-3 text-xs font-semibold text-[#4A5568] whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {providers.map((p) => (
                  <tr
                    key={p.id}
                    onClick={() => {
                      setSelectedProvider(p);
                      setDrawerOpen(true);
                    }}
                    className="border-b border-[#E5E1D8]/60 last:border-0 hover:bg-[#FAF8F4] cursor-pointer transition"
                  >
                    <td className="p-3 font-semibold text-[#0F1B2D] whitespace-nowrap">{p.name}</td>
                    <td className="p-3 text-[#4A5568] whitespace-nowrap">{p.category}</td>
                    <td className="p-3 font-mono text-[#0F1B2D] whitespace-nowrap">{p.quota}</td>
                    <td className="p-3 text-[#4A5568] whitespace-nowrap">{p.rotation}</td>
                    <td className="p-3 font-medium text-[#B8955A] whitespace-nowrap">{p.fallback}</td>
                    <td className="p-3 whitespace-nowrap">
                      <StatChip status={p.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </ResponsiveTable>
        </Card>
      )}

      {/* Webhooks Tab */}
      {activeTab === 'webhooks' && (
        <Card title="Ingress Webhooks Telemetry" titleIcon={Zap} padded={false}>
          <ResponsiveTable>
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#E5E1D8] bg-[#FAF8F4]/80">
                  {['Webhook ID', 'Source Provider', 'Endpoint Route', 'Signature Cryptography', 'Success Rate', 'p95 Latency', 'Health'].map((h) => (
                    <th key={h} className="p-3 text-xs font-semibold text-[#4A5568] whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {webhooks.map((w) => (
                  <tr key={w.id} className="border-b border-[#E5E1D8]/60 last:border-0 hover:bg-[#FAF8F4]">
                    <td className="p-3 font-mono font-medium text-[#0F1B2D]">{w.id}</td>
                    <td className="p-3 font-medium text-[#0F1B2D]">{w.provider}</td>
                    <td className="p-3 font-mono text-[#4A5568]">{w.endpoint}</td>
                    <td className="p-3 font-mono text-emerald-800">{w.signature}</td>
                    <td className="p-3 font-mono font-bold text-[#0F1B2D]">{w.deliveryRate}</td>
                    <td className="p-3 font-mono text-[#4A5568]">{w.latency}</td>
                    <td className="p-3"><StatChip status={w.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </ResponsiveTable>
        </Card>
      )}

      {/* Fallback for other tabs */}
      {!['providers', 'webhooks'].includes(activeTab) && (
        <Card title={`${activeTab.replace(/-/g, ' ').toUpperCase()} Panel`} padded>
          <div className="text-xs text-[#4A5568] space-y-2">
            <p>Active configurations for {activeTab.replace(/-/g, ' ')}.</p>
            <div className="rounded-lg bg-[#FAF8F4] border border-[#E5E1D8] p-4 text-xs font-mono">
              Status: Validated · All API secrets encrypted with AES-256-GCM hardware security modules.
            </div>
          </div>
        </Card>
      )}

      {/* Provider Details Drawer */}
      {drawerOpen && selectedProvider && (
        <DetailDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          title={`Integration: ${selectedProvider.name}`}
        >
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3 rounded-xl bg-[#FAF8F4] border border-[#E5E1D8] p-3">
              <div>
                <span className="text-[#A0A7B4] block text-[11px]">Provider ID</span>
                <span className="font-mono font-semibold text-xs text-[#0F1B2D]">{selectedProvider.id}</span>
              </div>
              <div>
                <span className="text-[#A0A7B4] block text-[11px]">Health</span>
                <StatChip status={selectedProvider.status} />
              </div>
              <div>
                <span className="text-[#A0A7B4] block text-[11px]">Monthly Quota</span>
                <span className="font-mono text-[#0F1B2D]">{selectedProvider.quota}</span>
              </div>
              <div>
                <span className="text-[#A0A7B4] block text-[11px]">Rotation Due</span>
                <span className="text-[#0F1B2D]">{selectedProvider.rotation}</span>
              </div>
            </div>
            <div>
              <span className="text-[#A0A7B4] block text-[11px] mb-1">Fallback Strategy</span>
              <div className="p-3 rounded-xl border border-[#E5E1D8] bg-white font-medium text-[#0F1B2D]">
                {selectedProvider.fallback}
              </div>
            </div>
            <div className="flex gap-2 pt-2">
              <Btn
                secondary
                onClick={() => toast(`Triggering sandbox diagnostic for ${selectedProvider.id}`)}
                className="flex-1"
              >
                Diagnostic Test
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

export { AdminIntegrationsPage };
