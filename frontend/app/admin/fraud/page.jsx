'use client';

import React, { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import {
  Zap,
  Search,
  Filter,
  RefreshCcw,
  CheckCircle2,
  XCircle,
  Eye,
  AlertTriangle,
  ArrowLeft,
  ChevronRight,
  ExternalLink,
  ShieldAlert,
  Lock,
} from 'lucide-react';
import { AdminShell } from '@/components';
import {
  Card,
  Btn,
  StatChip,
  ResponsiveTable,
  DetailDrawer,
  MetricCard,
  toast,
} from '@/components/admin-ui';
import { fraudDetectionsList } from '../moderation/moderation-data';

export default function AdminFraudMonitoringPage() {
  const [fraudCases, setFraudCases] = useState(fraudDetectionsList);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedCase, setSelectedCase] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      toast('Fraud heuristics telemetry synced');
    }, 600);
  }, []);

  const filteredCases = useMemo(() => {
    return fraudCases.filter((f) => {
      if (statusFilter !== 'all' && f.status !== statusFilter) return false;
      if (
        searchQuery &&
        !f.id.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !f.threatType.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !f.targetEntity.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }
      return true;
    });
  }, [fraudCases, statusFilter, searchQuery]);

  const handleMitigate = (item, action) => {
    setFraudCases((prev) =>
      prev.map((c) => (c.id === item.id ? { ...c, status: action } : c))
    );
    toast(`Threat ${item.id} updated: ${action}`);
    setDrawerOpen(false);
  };

  return (
    <AdminShell active="Moderation" onRefresh={handleRefresh}>
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center gap-2 text-xs text-[#718096] mb-4">
        <Link href="/admin/moderation" className="hover:text-[#0F1B2D] transition flex items-center gap-1">
          <ArrowLeft size={13} />
          <span>Back to Moderation Overview</span>
        </Link>
        <span>/</span>
        <span className="text-[#0F1B2D] font-medium">Automated Fraud Telemetry</span>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 border-b border-[#E5E1D8] pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#0F1B2D] flex items-center gap-2">
            <Zap size={22} className="text-[#B8955A]" />
            <span>Automated Fraud & Threat Telemetry Console</span>
          </h1>
          <p className="text-xs text-[#4A5568] mt-1 max-w-2xl">
            Real-time machine learning heuristics, carding velocity detection, sybil attack clustering, and suspicious credential stuffing defense.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Btn small secondary icon={RefreshCcw} onClick={handleRefresh} title="Sync telemetry">
            Sync
          </Btn>
          <Link
            href="/admin/moderation"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E5E1D8] bg-white text-xs font-medium text-[#0F1B2D] hover:bg-[#FAF8F4] transition"
          >
            <span>Moderation Queue</span>
          </Link>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <MetricCard label="Active Threat Incidents" value={fraudCases.filter((f) => f.status === 'active').length.toString()} sub="Requiring staff clearance" status="critical" />
        <MetricCard label="Automated Mitigations" value="98.7%" sub="Defended before impact" status="resolved" />
        <MetricCard label="Card Testing Blocks" value="142" sub="Last 24 hours" status="medium" />
        <MetricCard label="Sybil Ring Detections" value="3 Clusters" sub="IP & Canvas fingerprint" status="live" />
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[#E5E1D8] pb-3 mb-6">
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search size={14} className="absolute left-2.5 top-2.5 text-[#718096]" />
            <label htmlFor="fraud-search" className="sr-only">Search fraud cases</label>
            <input
              id="fraud-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search threat ID, IP, user or pattern…"
              className="h-9 rounded-lg border border-[#E5E1D8] bg-white pl-8 pr-3 text-xs w-64 sm:w-80 outline-none"
            />
          </div>

          <label htmlFor="fraud-status-filter" className="sr-only">Filter by status</label>
          <select
            id="fraud-status-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-9 rounded-lg border border-[#E5E1D8] bg-white px-2.5 text-xs text-[#0F1B2D] outline-none"
          >
            <option value="all">Status: All Threats</option>
            <option value="active">Active Threats</option>
            <option value="mitigated">Mitigated</option>
          </select>
        </div>

        <span className="text-xs text-[#718096]">
          Showing {filteredCases.length} of {fraudCases.length} telemetry records
        </span>
      </div>

      {/* Main Table */}
      <Card title="Real-Time Threat Detection Log" titleIcon={Zap} padded={false}>
        <ResponsiveTable>
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#E5E1D8] bg-[#FAF8F4]/80">
                {['Threat ID', 'Threat Pattern', 'Target / Attacker Entity', 'Risk Score', 'Automated Defense Action', 'Status', 'Detected', 'Action'].map((h) => (
                  <th key={h} className="p-3 text-xs font-semibold text-[#4A5568] whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredCases.map((f) => (
                <tr
                  key={f.id}
                  onClick={() => {
                    setSelectedCase(f);
                    setDrawerOpen(true);
                  }}
                  className="border-b border-[#E5E1D8]/60 last:border-0 hover:bg-[#FAF8F4] cursor-pointer transition"
                >
                  <td className="p-3 font-mono font-medium text-[#0F1B2D] whitespace-nowrap">{f.id}</td>
                  <td className="p-3 font-semibold text-[#0F1B2D] max-w-xs truncate" title={f.threatType}>
                    {f.threatType}
                  </td>
                  <td className="p-3 font-mono text-[11px] text-[#4A5568] max-w-xs truncate" title={f.targetEntity}>
                    {f.targetEntity}
                  </td>
                  <td className="p-3 whitespace-nowrap">
                    <span className="px-2 py-0.5 rounded font-mono font-bold text-[11px] bg-rose-100 text-rose-800">
                      {f.riskScore}
                    </span>
                  </td>
                  <td className="p-3 whitespace-nowrap">
                    <span className="px-2 py-0.5 rounded bg-[#FAF8F4] border border-[#E5E1D8] text-[11px] font-medium text-[#0F1B2D]">
                      {f.automatedAction}
                    </span>
                  </td>
                  <td className="p-3 whitespace-nowrap">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-semibold capitalize ${
                      f.status === 'active' ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {f.status}
                    </span>
                  </td>
                  <td className="p-3 text-[#718096] whitespace-nowrap">{f.detectedAt}</td>
                  <td className="p-3 whitespace-nowrap">
                    <span className="text-xs font-medium text-[#B8955A] hover:underline flex items-center gap-1">
                      Investigate <ChevronRight size={13} />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </ResponsiveTable>
      </Card>

      {/* Drawer */}
      {drawerOpen && selectedCase && (
        <DetailDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          title={`Threat: ${selectedCase.id}`}
        >
          <div className="space-y-4 text-xs">
            <div className="rounded-xl border border-[#E5E1D8] bg-[#FAF8F4] p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm text-[#0F1B2D]">{selectedCase.threatType}</span>
                <span className="px-2 py-0.5 rounded font-mono font-bold text-xs bg-rose-100 text-rose-800">
                  Risk: {selectedCase.riskScore}
                </span>
              </div>
              <div className="text-[11px] text-[#4A5568]">
                Target Entity: <strong className="font-mono">{selectedCase.targetEntity}</strong> • Detected: <strong>{selectedCase.detectedAt}</strong>
              </div>
            </div>

            <div>
              <span className="text-[#A0A7B4] block text-[11px] mb-1">Defense Action Taken</span>
              <div className="p-3 rounded-xl border border-[#E5E1D8] bg-white font-medium text-[#0F1B2D]">
                {selectedCase.automatedAction}
              </div>
            </div>

            <div>
              <span className="text-[#A0A7B4] block text-[11px] mb-1">Telemetry Heuristics & Signals</span>
              <ul className="list-disc list-inside p-3 rounded-xl border border-[#E5E1D8] bg-white text-[#4A5568] space-y-1">
                {selectedCase.signals?.map((s, idx) => (
                  <li key={idx} className="text-xs">{s}</li>
                ))}
              </ul>
            </div>

            <div className="flex gap-2 pt-2 border-t border-[#E5E1D8]">
              <Btn
                destructive
                onClick={() => handleMitigate(selectedCase, 'active')}
                className="flex-1"
                icon={Lock}
              >
                Hard Block Entity
              </Btn>
              <Btn
                secondary
                onClick={() => handleMitigate(selectedCase, 'mitigated')}
                className="flex-1"
                icon={CheckCircle2}
              >
                Clear Threat
              </Btn>
            </div>
          </div>
        </DetailDrawer>
      )}
    </AdminShell>
  );
}
