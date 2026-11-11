'use client';

import React, { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import {
  Scale,
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
  DollarSign,
  HelpCircle,
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
import { disputesList } from '../moderation/moderation-data';

export default function AdminDisputesPage() {
  const [disputes, setDisputes] = useState(disputesList);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedDispute, setSelectedDispute] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      toast('Disputes registry refreshed');
    }, 600);
  }, []);

  const filteredDisputes = useMemo(() => {
    return disputes.filter((d) => {
      if (statusFilter !== 'all' && d.status !== statusFilter) return false;
      if (
        searchQuery &&
        !d.id.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !d.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !d.parties.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }
      return true;
    });
  }, [disputes, statusFilter, searchQuery]);

  const handleMediate = (dispute, action) => {
    setDisputes((prev) =>
      prev.map((d) => (d.id === dispute.id ? { ...d, status: 'resolved', escrowStatus: action } : d))
    );
    toast(`Dispute ${dispute.id} resolved with escrow: ${action}`);
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
        <span className="text-[#0F1B2D] font-medium">Escrow & Platform Disputes</span>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 border-b border-[#E5E1D8] pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#0F1B2D] flex items-center gap-2">
            <Scale size={22} className="text-[#B8955A]" />
            <span>Escrow & Contract Disputes Mediation Console</span>
          </h1>
          <p className="text-xs text-[#4A5568] mt-1 max-w-2xl">
            Neutral arbitration and escrow settlement for contested milestone deliverables, mentor hour disputes, and talent placement agreements.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Btn small secondary icon={RefreshCcw} onClick={handleRefresh} title="Sync disputes">
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
        <MetricCard label="Total Disputes Logged" value={disputes.length.toString()} sub="All-time cases" status="live" />
        <MetricCard
          label="Active In Mediation"
          value={disputes.filter((d) => d.status === 'open' || d.status === 'mediation').length.toString()}
          sub="Funds frozen in escrow"
          status="critical"
        />
        <MetricCard label="Escrow Value Held" value="₹5,25,000" sub="Under platform custody" status="medium" />
        <MetricCard
          label="Resolved Cases"
          value={disputes.filter((d) => d.status === 'resolved').length.toString()}
          sub="Successfully arbitrated"
          status="resolved"
        />
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[#E5E1D8] pb-3 mb-6">
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search size={14} className="absolute left-2.5 top-2.5 text-[#718096]" />
            <label htmlFor="disputes-search" className="sr-only">Search disputes</label>
            <input
              id="disputes-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dispute ID, contract title, parties…"
              className="h-9 rounded-lg border border-[#E5E1D8] bg-white pl-8 pr-3 text-xs w-64 sm:w-80 outline-none"
            />
          </div>

          <label htmlFor="disputes-status-filter" className="sr-only">Filter by status</label>
          <select
            id="disputes-status-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-9 rounded-lg border border-[#E5E1D8] bg-white px-2.5 text-xs text-[#0F1B2D] outline-none"
          >
            <option value="all">Status: All Disputes</option>
            <option value="open">Open</option>
            <option value="mediation">In Mediation</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>

        <span className="text-xs text-[#718096]">
          Showing {filteredDisputes.length} of {disputes.length} disputes
        </span>
      </div>

      {/* Main Table */}
      <Card title="Disputes Arbitration Registry" titleIcon={Scale} padded={false}>
        <ResponsiveTable>
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#E5E1D8] bg-[#FAF8F4]/80">
                {['Dispute ID', 'Subject / Contract Milestone', 'Contesting Parties', 'Disputed Escrow', 'Status', 'Escrow State', 'Deadline', 'Action'].map((h) => (
                  <th key={h} className="p-3 text-xs font-semibold text-[#4A5568] whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredDisputes.map((d) => (
                <tr
                  key={d.id}
                  onClick={() => {
                    setSelectedDispute(d);
                    setDrawerOpen(true);
                  }}
                  className="border-b border-[#E5E1D8]/60 last:border-0 hover:bg-[#FAF8F4] cursor-pointer transition"
                >
                  <td className="p-3 font-mono font-medium text-[#0F1B2D] whitespace-nowrap">{d.id}</td>
                  <td className="p-3 font-semibold text-[#0F1B2D] max-w-xs truncate" title={d.title}>
                    {d.title}
                  </td>
                  <td className="p-3 text-[#4A5568] max-w-xs truncate" title={d.parties}>
                    {d.parties}
                  </td>
                  <td className="p-3 font-mono font-bold text-[#0F1B2D] whitespace-nowrap">{d.amount}</td>
                  <td className="p-3 whitespace-nowrap">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-semibold capitalize ${
                      d.status === 'open' ? 'bg-rose-100 text-rose-800' :
                      d.status === 'mediation' ? 'bg-amber-100 text-amber-800' :
                      'bg-emerald-100 text-emerald-800'
                    }`}>
                      {d.status}
                    </span>
                  </td>
                  <td className="p-3 whitespace-nowrap font-mono text-[11px] text-[#718096]">
                    {d.escrowStatus.replace(/_/g, ' ')}
                  </td>
                  <td className="p-3 text-[#718096] whitespace-nowrap">{d.deadline}</td>
                  <td className="p-3 whitespace-nowrap">
                    <span className="text-xs font-medium text-[#B8955A] hover:underline flex items-center gap-1">
                      Mediate <ChevronRight size={13} />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </ResponsiveTable>
      </Card>

      {/* Drawer */}
      {drawerOpen && selectedDispute && (
        <DetailDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          title={`Dispute: ${selectedDispute.id}`}
        >
          <div className="space-y-4 text-xs">
            <div className="rounded-xl border border-[#E5E1D8] bg-[#FAF8F4] p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm text-[#0F1B2D]">{selectedDispute.title}</span>
                <span className="font-mono font-bold text-base text-emerald-800">{selectedDispute.amount}</span>
              </div>
              <div className="text-[11px] text-[#4A5568]">
                Parties: <strong>{selectedDispute.parties}</strong> • Escrow Status: <strong>{selectedDispute.escrowStatus}</strong>
              </div>
            </div>

            <div>
              <span className="text-[#A0A7B4] block text-[11px] mb-1">Contested Deliverable Statement</span>
              <p className="p-3 rounded-xl border border-[#E5E1D8] bg-white text-[#4A5568] leading-relaxed">
                {selectedDispute.reason}
              </p>
            </div>

            <div className="p-3 rounded-xl border border-blue-200 bg-blue-50/50 text-blue-900 space-y-1">
              <span className="font-bold block">Arbitration Settlement Options</span>
              <p className="text-xs">
                As a platform administrator, you may release funds to the provider, refund 100% to client, or enforce a 50/50 settlement split.
              </p>
            </div>

            <div className="flex flex-col gap-2 pt-2 border-t border-[#E5E1D8]">
              <div className="flex gap-2">
                <Btn
                  onClick={() => handleMediate(selectedDispute, 'released_to_provider')}
                  className="flex-1"
                  icon={CheckCircle2}
                >
                  Release to Provider
                </Btn>
                <Btn
                  secondary
                  onClick={() => handleMediate(selectedDispute, 'refunded_to_client')}
                  className="flex-1"
                  icon={XCircle}
                >
                  Refund Client
                </Btn>
              </div>
            </div>
          </div>
        </DetailDrawer>
      )}
    </AdminShell>
  );
}
