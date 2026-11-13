'use client';

import React, { useState, useMemo, useCallback } from 'react';
import {
  Activity,
  Shield,
  FileText,
  Search,
  Filter,
  Download,
  RefreshCcw,
  AlertTriangle,
  Lock,
  CheckCircle2,
  XCircle,
  Eye,
  ChevronRight,
} from 'lucide-react';
import { AdminShell } from '@/components';
import {
  Card,
  Btn,
  StatChip,
  TabBar,
  RangeFilter,
  ResponsiveTable,
  DetailDrawer,
  MetricCard,
  toast,
} from '@/components/admin-ui';
import {
  auditTabs,
  rangeFilters,
  auditEntries,
  categories,
  outcomes,
  alerts,
  exportRequests,
  integrity,
  coverage,
} from './audit-data';

export default function AdminAuditPage({ initialTab = 'explorer' }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [activeRange, setActiveRange] = useState('24-hours');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [outcomeFilter, setOutcomeFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      toast('Audit log synchronized');
    }, 600);
  }, []);

  const filteredEntries = useMemo(() => {
    return auditEntries.filter((entry) => {
      const matchCat = categoryFilter === 'all' || entry.category === categoryFilter;
      const matchOutcome = outcomeFilter === 'all' || entry.outcome === outcomeFilter;
      const matchSearch =
        !searchQuery ||
        entry.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.actor.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (entry.reason && entry.reason.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchOutcome && matchSearch;
    });
  }, [categoryFilter, outcomeFilter, searchQuery]);

  return (
    <AdminShell active="Audit Trail" onRefresh={handleRefresh}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 border-b border-[#E5E1D8] pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#0F1B2D]">Security Audit Trail</h1>
          <p className="text-xs text-[#4A5568] mt-1 max-w-2xl">
            Cryptographically sealed immutable log of sensitive accesses, privileged decisions, and administrative modifications.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Btn small secondary icon={RefreshCcw} onClick={handleRefresh} title="Sync log">
            Sync
          </Btn>
          <Btn
            small
            secondary
            icon={Download}
            onClick={() => toast('Generating cryptographically signed audit export')}
            title="Export audit logs"
          >
            Export
          </Btn>
        </div>
      </div>

      {/* KPI Overview */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <MetricCard label="Total Logged Events (24h)" value="12,840" sub="100% hash chained" status="verified" />
        <MetricCard label="Privileged Actions" value="48" sub="Break-glass & config edits" status="live" />
        <MetricCard label="Active Anomalies" value="4" sub="Rule detections under review" status="medium" />
        <MetricCard label="Integrity Verification" value="Pass" sub="0 gaps detected across pods" status="operational" />
      </div>

      {/* Tabs */}
      <TabBar active={activeTab} onChange={setActiveTab} tabs={auditTabs} />

      {/* Explorer Tab */}
      {activeTab === 'explorer' && (
        <div className="space-y-4">
          {/* Filters Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[#E5E1D8] pb-3">
            <RangeFilter active={activeRange} onChange={setActiveRange} filters={rangeFilters} />
            <div className="flex flex-wrap items-center gap-2">
              <div>
                <label htmlFor="audit-cat-select" className="sr-only">Filter by category</label>
                <select
                  id="audit-cat-select"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="h-9 rounded-lg border border-[#E5E1D8] bg-white px-2.5 text-xs text-[#0F1B2D] outline-none"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      Category: {c.replace(/_/g, ' ')}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="audit-outcome-select" className="sr-only">Filter by outcome</label>
                <select
                  id="audit-outcome-select"
                  value={outcomeFilter}
                  onChange={(e) => setOutcomeFilter(e.target.value)}
                  className="h-9 rounded-lg border border-[#E5E1D8] bg-white px-2.5 text-xs text-[#0F1B2D] outline-none"
                >
                  {outcomes.map((o) => (
                    <option key={o} value={o}>
                      Outcome: {o}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="audit-search-input" className="sr-only">Search audit events</label>
                <input
                  id="audit-search-input"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search ID, actor, action…"
                  className="h-9 rounded-lg border border-[#E5E1D8] bg-white px-3 text-xs w-48 sm:w-56 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Table */}
          <Card title="Live Event Stream" titleIcon={Activity} padded={false}>
            <ResponsiveTable>
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#E5E1D8] bg-[#FAF8F4]/80">
                    {['Event ID', 'Timestamp (UTC)', 'Actor', 'Category', 'Action', 'Target', 'Reason / Context', 'Outcome', ''].map((h) => (
                      <th key={h} className="p-3 text-xs font-semibold text-[#4A5568] whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredEntries.map((entry) => (
                    <tr
                      key={entry.id}
                      onClick={() => {
                        setSelectedEntry(entry);
                        setDrawerOpen(true);
                      }}
                      className="border-b border-[#E5E1D8]/60 last:border-0 hover:bg-[#FAF8F4] cursor-pointer transition"
                    >
                      <td className="p-3 font-mono font-medium text-[#0F1B2D] whitespace-nowrap">{entry.id}</td>
                      <td className="p-3 text-[#4A5568] whitespace-nowrap">
                        {new Date(entry.at).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
                      </td>
                      <td className="p-3 whitespace-nowrap">
                        <span className="font-mono text-[#0F1B2D]">{entry.actor.id}</span>
                        <span className="text-[11px] text-[#A0A7B4] ml-1">({entry.actor.role})</span>
                      </td>
                      <td className="p-3 whitespace-nowrap">
                        <span className="capitalize text-[#4A5568]">{entry.category.replace(/_/g, ' ')}</span>
                      </td>
                      <td className="p-3 font-medium text-[#0F1B2D] whitespace-nowrap">{entry.action}</td>
                      <td className="p-3 text-[#4A5568] whitespace-nowrap">
                        {entry.target.type}:{entry.target.id}
                      </td>
                      <td className="p-3 text-[#4A5568] whitespace-nowrap">{entry.reason || '—'}</td>
                      <td className="p-3 whitespace-nowrap">
                        <StatChip status={entry.outcome === 'success' ? 'resolved' : entry.outcome === 'blocked' ? 'critical' : 'medium'} />
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
        <Card title="Anomaly Detection Alerts" titleIcon={AlertTriangle}>
          <ResponsiveTable>
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#E5E1D8] bg-[#FAF8F4]/80">
                  {['Alert ID', 'Detection Rule', 'Entity', 'Severity', 'Triggered Time', 'Status'].map((h) => (
                    <th key={h} className="p-3 text-xs font-semibold text-[#4A5568] whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {alerts.map((a) => (
                  <tr key={a.id} className="border-b border-[#E5E1D8]/60 last:border-0 hover:bg-[#FAF8F4]">
                    <td className="p-3 font-mono font-medium text-[#0F1B2D]">{a.id}</td>
                    <td className="p-3 font-medium text-[#0F1B2D]">{a.rule}</td>
                    <td className="p-3 font-mono text-[#4A5568]">{a.entities}</td>
                    <td className="p-3"><StatChip status={a.severity === 'high' ? 'critical' : 'medium'} /></td>
                    <td className="p-3 text-[#4A5568]">{a.time}</td>
                    <td className="p-3"><StatChip status="pending" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </ResponsiveTable>
        </Card>
      )}

      {/* Export Requests Tab */}
      {activeTab === 'export-requests' && (
        <Card title="Audit Export Approvals" titleIcon={Download}>
          <ResponsiveTable>
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#E5E1D8] bg-[#FAF8F4]/80">
                  {['Export ID', 'Scope', 'Purpose', 'Requester', 'Format', 'Status', 'Expiry'].map((h) => (
                    <th key={h} className="p-3 text-xs font-semibold text-[#4A5568] whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {exportRequests.map((req) => (
                  <tr key={req.id} className="border-b border-[#E5E1D8]/60 last:border-0 hover:bg-[#FAF8F4]">
                    <td className="p-3 font-mono font-medium text-[#0F1B2D]">{req.id}</td>
                    <td className="p-3 text-[#0F1B2D]">{req.scope}</td>
                    <td className="p-3 text-[#4A5568]">{req.purpose}</td>
                    <td className="p-3 text-[#4A5568]">{req.requester}</td>
                    <td className="p-3 font-mono text-[#4A5568]">{req.format}</td>
                    <td className="p-3"><StatChip status={req.status === 'Approved' ? 'resolved' : 'pending'} /></td>
                    <td className="p-3 text-[#4A5568]">{req.expires}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </ResponsiveTable>
        </Card>
      )}

      {/* Integrity & Coverage */}
      {activeTab === 'integrity-and-coverage' && (
        <div className="space-y-4">
          <Card title="Cryptographic Ledger Integrity" titleIcon={Lock}>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between border-b border-[#E5E1D8] pb-2">
                <span className="text-[#4A5568]">Verified Through</span>
                <span className="font-mono text-[#0F1B2D]">{integrity.verifiedThrough}</span>
              </div>
              <div className="flex justify-between border-b border-[#E5E1D8] pb-2">
                <span className="text-[#4A5568]">Hash Integrity Status</span>
                <span className="font-semibold text-emerald-700">SHA-256 Validated</span>
              </div>
              <div className="flex justify-between pb-1">
                <span className="text-[#4A5568]">Sequence Gaps</span>
                <span className="font-semibold text-emerald-700">{integrity.gaps} gaps</span>
              </div>
            </div>
          </Card>

          <Card title="Service Ingestion Coverage" titleIcon={Activity}>
            <ResponsiveTable>
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#E5E1D8] bg-[#FAF8F4]/80">
                    {['Source Service', 'Expected Events', 'Ingested Events', 'Ingestion Latency', 'Health'].map((h) => (
                      <th key={h} className="p-3 text-xs font-semibold text-[#4A5568] whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {coverage.map((c) => (
                    <tr key={c.source} className="border-b border-[#E5E1D8]/60 last:border-0 hover:bg-[#FAF8F4]">
                      <td className="p-3 font-medium text-[#0F1B2D]">{c.source}</td>
                      <td className="p-3 font-mono text-[#4A5568]">{c.expected}</td>
                      <td className="p-3 font-mono text-[#4A5568]">{c.received}</td>
                      <td className="p-3 font-mono text-[#4A5568]">{c.latency}</td>
                      <td className="p-3"><StatChip status={c.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </ResponsiveTable>
          </Card>
        </div>
      )}

      {/* Fallback for other tabs */}
      {!['explorer', 'alerts', 'export-requests', 'integrity-and-coverage'].includes(activeTab) && (
        <Card title={`${activeTab.replace(/-/g, ' ').toUpperCase()} Audit View`} padded>
          <div className="text-xs text-[#4A5568] space-y-2">
            <p>Showing targeted audit records filtered by category: <strong>{activeTab.replace(/-/g, ' ')}</strong>.</p>
            <div className="rounded-lg bg-[#FAF8F4] border border-[#E5E1D8] p-4 text-xs font-mono">
              Filtered records active · Hash verification confirmed.
            </div>
          </div>
        </Card>
      )}

      {/* Detail Drawer */}
      {drawerOpen && selectedEntry && (
        <DetailDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          title={`Audit Event: ${selectedEntry.id}`}
        >
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3 rounded-lg bg-[#FAF8F4] border border-[#E5E1D8] p-3">
              <div>
                <span className="text-[#A0A7B4] block text-[11px]">Timestamp</span>
                <span className="font-mono text-[#0F1B2D] font-medium">{selectedEntry.at}</span>
              </div>
              <div>
                <span className="text-[#A0A7B4] block text-[11px]">Outcome</span>
                <StatChip status={selectedEntry.outcome === 'success' ? 'resolved' : 'critical'} />
              </div>
              <div>
                <span className="text-[#A0A7B4] block text-[11px]">Actor ID</span>
                <span className="font-mono text-[#0F1B2D] font-medium">{selectedEntry.actor.id}</span>
              </div>
              <div>
                <span className="text-[#A0A7B4] block text-[11px]">Actor Role</span>
                <span className="text-[#0F1B2D]">{selectedEntry.actor.role}</span>
              </div>
            </div>
            <div>
              <span className="text-[#A0A7B4] block text-[11px] mb-1">Target Object</span>
              <div className="p-2.5 rounded-lg border border-[#E5E1D8] bg-white font-mono text-[11px] text-[#0F1B2D]">
                Type: {selectedEntry.target.type} | ID: {selectedEntry.target.id}
                {selectedEntry.target.field ? ` | Field: ${selectedEntry.target.field}` : ''}
              </div>
            </div>
            <div>
              <span className="text-[#A0A7B4] block text-[11px] mb-1">Source & Route</span>
              <div className="p-2.5 rounded-lg border border-[#E5E1D8] bg-white font-mono text-[11px] text-[#0F1B2D]">
                App: {selectedEntry.source.app} | Route: {selectedEntry.source.route}
              </div>
            </div>
            <div className="pt-2">
              <Btn onClick={() => setDrawerOpen(false)} className="w-full">
                Close Drawer
              </Btn>
            </div>
          </div>
        </DetailDrawer>
      )}
    </AdminShell>
  );
}

export { AdminAuditPage };
