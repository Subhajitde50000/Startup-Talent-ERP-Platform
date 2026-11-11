'use client';

import React, { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import {
  RotateCcw,
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
  UserCheck,
  Clock,
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
import { appealsList } from '../moderation/moderation-data';

export default function AdminAppealsPage() {
  const [appeals, setAppeals] = useState(appealsList);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedAppeal, setSelectedAppeal] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      toast('Appeals registry refreshed');
    }, 600);
  }, []);

  const filteredAppeals = useMemo(() => {
    return appeals.filter((a) => {
      if (statusFilter !== 'all' && a.status !== statusFilter) return false;
      if (
        searchQuery &&
        !a.id.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !a.user.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !a.originalDecision.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }
      return true;
    });
  }, [appeals, statusFilter, searchQuery]);

  const handleDecideAppeal = (appeal, decision) => {
    setAppeals((prev) =>
      prev.map((a) => (a.id === appeal.id ? { ...a, status: decision } : a))
    );
    toast(`Appeal ${appeal.id} was ${decision}`);
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
        <span className="text-[#0F1B2D] font-medium">Appeals & Re-reviews</span>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 border-b border-[#E5E1D8] pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#0F1B2D] flex items-center gap-2">
            <RotateCcw size={22} className="text-[#B8955A]" />
            <span>Appeals & Re-reviews Console</span>
          </h1>
          <p className="text-xs text-[#4A5568] mt-1 max-w-2xl">
            Second-chance formal appeal petitions submitted by suspended accounts, rejected founder KYC applicants, and delisted employers.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Btn small secondary icon={RefreshCcw} onClick={handleRefresh} title="Sync appeals">
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
        <MetricCard label="Total Appeals" value={appeals.length.toString()} sub="All time registry" status="live" />
        <MetricCard
          label="Pending Review"
          value={appeals.filter((a) => a.status === 'in_review' || a.status === 'submitted').length.toString()}
          sub="Second-chance reviews"
          status="critical"
        />
        <MetricCard
          label="Reinstated (Approved)"
          value={appeals.filter((a) => a.status === 'approved').length.toString()}
          sub="Restrictions lifted"
          status="resolved"
        />
        <MetricCard
          label="Rejected (Upheld)"
          value={appeals.filter((a) => a.status === 'rejected').length.toString()}
          sub="Penalty maintained"
          status="medium"
        />
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[#E5E1D8] pb-3 mb-6">
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search size={14} className="absolute left-2.5 top-2.5 text-[#718096]" />
            <label htmlFor="appeals-search" className="sr-only">Search appeals</label>
            <input
              id="appeals-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search appeal ID, appellant name…"
              className="h-9 rounded-lg border border-[#E5E1D8] bg-white pl-8 pr-3 text-xs w-64 sm:w-72 outline-none"
            />
          </div>

          <label htmlFor="appeals-status-filter" className="sr-only">Filter by status</label>
          <select
            id="appeals-status-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-9 rounded-lg border border-[#E5E1D8] bg-white px-2.5 text-xs text-[#0F1B2D] outline-none"
          >
            <option value="all">Status: All Appeals</option>
            <option value="submitted">Submitted</option>
            <option value="in_review">In Review</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <span className="text-xs text-[#718096]">
          Showing {filteredAppeals.length} of {appeals.length} appeals
        </span>
      </div>

      {/* Main Table */}
      <Card title="Appeals Master Queue" titleIcon={RotateCcw} padded={false}>
        <ResponsiveTable>
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#E5E1D8] bg-[#FAF8F4]/80">
                {['Appeal ID', 'Appellant Account / Entity', 'Original Penalty / Decision', 'Priority', 'Status', 'Assigned Specialist', 'Submitted', 'Action'].map((h) => (
                  <th key={h} className="p-3 text-xs font-semibold text-[#4A5568] whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredAppeals.map((a) => (
                <tr
                  key={a.id}
                  onClick={() => {
                    setSelectedAppeal(a);
                    setDrawerOpen(true);
                  }}
                  className="border-b border-[#E5E1D8]/60 last:border-0 hover:bg-[#FAF8F4] cursor-pointer transition"
                >
                  <td className="p-3 font-mono font-medium text-[#0F1B2D] whitespace-nowrap">{a.id}</td>
                  <td className="p-3 font-semibold text-[#0F1B2D] max-w-xs truncate" title={a.user}>
                    {a.user}
                  </td>
                  <td className="p-3 text-[#4A5568] max-w-xs truncate" title={a.originalDecision}>
                    {a.originalDecision}
                  </td>
                  <td className="p-3 whitespace-nowrap">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                      a.priority === 'urgent' ? 'bg-rose-100 text-rose-800' :
                      a.priority === 'high' ? 'bg-amber-100 text-amber-800' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {a.priority}
                    </span>
                  </td>
                  <td className="p-3 whitespace-nowrap">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-semibold capitalize ${
                      a.status === 'approved' ? 'bg-emerald-100 text-emerald-800' :
                      a.status === 'rejected' ? 'bg-rose-100 text-rose-800' :
                      a.status === 'in_review' ? 'bg-blue-100 text-blue-800' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {a.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="p-3 text-[#718096] whitespace-nowrap">{a.assignedTo}</td>
                  <td className="p-3 text-[#718096] whitespace-nowrap">{a.submittedAt}</td>
                  <td className="p-3 whitespace-nowrap">
                    <span className="text-xs font-medium text-[#B8955A] hover:underline flex items-center gap-1">
                      Review <ChevronRight size={13} />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </ResponsiveTable>
      </Card>

      {/* Drawer */}
      {drawerOpen && selectedAppeal && (
        <DetailDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          title={`Appeal: ${selectedAppeal.id}`}
        >
          <div className="space-y-4 text-xs">
            <div className="rounded-xl border border-[#E5E1D8] bg-[#FAF8F4] p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm text-[#0F1B2D]">{selectedAppeal.user}</span>
                <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-100 text-blue-800">
                  {selectedAppeal.priority}
                </span>
              </div>
              <div className="text-[11px] text-[#4A5568]">
                Assigned Specialist: <strong>{selectedAppeal.assignedTo}</strong> • Submitted: <strong>{selectedAppeal.submittedAt}</strong>
              </div>
            </div>

            <div>
              <span className="text-[#A0A7B4] block text-[11px] mb-1">Original Sanction Decision</span>
              <div className="p-3 rounded-xl border border-rose-200 bg-rose-50/50 font-medium text-rose-900">
                {selectedAppeal.originalDecision}
              </div>
            </div>

            <div>
              <span className="text-[#A0A7B4] block text-[11px] mb-1">Appellant Rebuttal Statement</span>
              <p className="p-3 rounded-xl border border-[#E5E1D8] bg-white text-[#4A5568] leading-relaxed">
                {selectedAppeal.reason}
              </p>
            </div>

            <div className="flex gap-2 pt-2 border-t border-[#E5E1D8]">
              <Btn
                onClick={() => handleDecideAppeal(selectedAppeal, 'approved')}
                className="flex-1"
                icon={CheckCircle2}
              >
                Approve & Reinstate
              </Btn>
              <Btn
                destructive
                onClick={() => handleDecideAppeal(selectedAppeal, 'rejected')}
                className="flex-1"
                icon={XCircle}
              >
                Reject Appeal
              </Btn>
            </div>
          </div>
        </DetailDrawer>
      )}
    </AdminShell>
  );
}
