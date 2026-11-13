'use client';

import React, { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import {
  FileText,
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
  Shield,
  Download,
  Lock,
  Clock,
  ArrowRight,
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
import { requestsData } from './requests-data';

export default function AdminDataRequestsPage() {
  const [requestsList, setRequestsList] = useState(requestsData);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      toast('Data requests registry synchronized');
    }, 600);
  }, []);

  const filteredRequests = useMemo(() => {
    return requestsList.filter((r) => {
      if (statusFilter !== 'all' && r.status.toLowerCase() !== statusFilter.toLowerCase()) return false;
      if (
        searchQuery &&
        !r.id.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !r.authority.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !r.type.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !r.dataSubject.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }
      return true;
    });
  }, [requestsList, statusFilter, searchQuery]);

  return (
    <AdminShell active="Compliance" onRefresh={handleRefresh}>
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs text-[#718096] mb-4">
        <Link href="/admin/compliance" className="hover:text-[#0F1B2D] transition flex items-center gap-1">
          <ArrowLeft size={13} />
          <span>Back to Compliance Posture</span>
        </Link>
        <span>/</span>
        <span className="text-[#0F1B2D] font-medium">Data Rights & Statutory Requests</span>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 border-b border-[#E5E1D8] pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#0F1B2D] flex items-center gap-2">
            <FileText size={22} className="text-[#B8955A]" />
            <span>Data Rights & Statutory Requests</span>
          </h1>
          <p className="text-xs text-[#4A5568] mt-1 max-w-2xl">
            Statutory registry for DPDP user rights (access, erasure, portability) and formal law enforcement disclosures.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Btn small secondary icon={RefreshCcw} onClick={handleRefresh} title="Sync requests">
            Sync
          </Btn>
          <Link
            href="/admin/compliance"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E5E1D8] bg-white text-xs font-medium text-[#0F1B2D] hover:bg-[#FAF8F4] transition"
          >
            <span>Compliance Posture</span>
          </Link>
        </div>
      </div>

      {/* KPI Overview */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <MetricCard label="Total Requests" value={requestsList.length.toString()} sub="All-time statutory registry" status="live" />
        <MetricCard
          label="In Progress (Under Review)"
          value={requestsList.filter((r) => r.status === 'In progress' || r.status === 'Open').length.toString()}
          sub="Statutory clock ticking"
          status="critical"
        />
        <MetricCard
          label="Validating Notice"
          value={requestsList.filter((r) => r.status === 'Validating').length.toString()}
          sub="Legal counsel review"
          status="medium"
        />
        <MetricCard
          label="Dispatched / Completed"
          value={requestsList.filter((r) => r.status === 'Completed').length.toString()}
          sub="Evidence archive delivered"
          status="resolved"
        />
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[#E5E1D8] pb-3 mb-6">
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search size={14} className="absolute left-2.5 top-2.5 text-[#718096]" />
            <label htmlFor="data-requests-search" className="sr-only">Search requests</label>
            <input
              id="data-requests-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search request ID, authority, data subject…"
              className="h-9 rounded-lg border border-[#E5E1D8] bg-white pl-8 pr-3 text-xs w-64 sm:w-80 outline-none"
            />
          </div>

          <label htmlFor="data-requests-status-filter" className="sr-only">Filter by status</label>
          <select
            id="data-requests-status-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-9 rounded-lg border border-[#E5E1D8] bg-white px-2.5 text-xs text-[#0F1B2D] outline-none"
          >
            <option value="all">Status: All Requests</option>
            <option value="open">Open</option>
            <option value="in progress">In Progress</option>
            <option value="validating">Validating</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <span className="text-xs text-[#718096]">
          Showing {filteredRequests.length} of {requestsList.length} statutory requests
        </span>
      </div>

      {/* Main Table */}
      <Card title="Statutory Requests Registry" titleIcon={FileText} padded={false}>
        <ResponsiveTable>
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#E5E1D8] bg-[#FAF8F4]/80">
                {['Request ID', 'Authority / Data Principal', 'Statutory Scope', 'Right / Notice Type', 'Received', 'Statutory Due', 'Status', 'Action'].map((h) => (
                  <th key={h} className="p-3 text-xs font-semibold text-[#4A5568] whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((r) => (
                <tr
                  key={r.id}
                  onClick={() => {
                    setSelectedRequest(r);
                    setDrawerOpen(true);
                  }}
                  className="border-b border-[#E5E1D8]/60 last:border-0 hover:bg-[#FAF8F4] cursor-pointer transition"
                >
                  <td className="p-3 font-mono font-medium text-[#0F1B2D] whitespace-nowrap">{r.id}</td>
                  <td className="p-3 font-semibold text-[#0F1B2D] max-w-xs truncate" title={r.authority}>
                    {r.authority}
                  </td>
                  <td className="p-3 text-[#4A5568] max-w-xs truncate" title={r.scope}>
                    {r.scope}
                  </td>
                  <td className="p-3 whitespace-nowrap">
                    <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-700">
                      {r.type}
                    </span>
                  </td>
                  <td className="p-3 text-[#718096] whitespace-nowrap">{r.received}</td>
                  <td className="p-3 whitespace-nowrap">
                    <span className={`font-medium ${r.status !== 'Completed' ? 'text-amber-800' : 'text-[#718096]'}`}>
                      {r.due}
                    </span>
                  </td>
                  <td className="p-3 whitespace-nowrap">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                      r.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' :
                      r.status === 'Validating' ? 'bg-purple-100 text-purple-800' :
                      'bg-amber-100 text-amber-800'
                    }`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="p-3 whitespace-nowrap">
                    <span className="text-xs font-medium text-[#B8955A] hover:underline flex items-center gap-1">
                      Inspect <ChevronRight size={13} />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </ResponsiveTable>
      </Card>

      {/* Drawer */}
      {drawerOpen && selectedRequest && (
        <DetailDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          title={`Request: ${selectedRequest.id}`}
        >
          <div className="space-y-4 text-xs">
            {/* Direct Link to Request Detail Workspace */}
            <div className="rounded-xl border border-[#E5E1D8] bg-gradient-to-r from-[#FAF8F4] via-amber-50/40 to-[#FAF8F4] p-3.5 flex items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-lg bg-[#0F1B2D] text-[#B8955A] flex items-center justify-center shrink-0 shadow-xs">
                  <ExternalLink size={16} />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-xs text-[#0F1B2D]">Open Full Request Workspace</span>
                    <span className="px-1.5 py-0.5 rounded font-mono text-[10px] font-semibold bg-[#B8955A]/15 text-[#8C6D37]">
                      /{selectedRequest.id}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#718096] truncate mt-0.5">
                    Evidence extraction, PII sanitation, statutory audit log & data export
                  </p>
                </div>
              </div>
              <Link
                href={`/admin/data-requests/${selectedRequest.id}`}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#0F1B2D] text-white hover:bg-[#1C2B42] text-xs font-semibold shrink-0 transition shadow-xs group"
                title={`Open /admin/data-requests/${selectedRequest.id}`}
              >
                <span>Open Workspace</span>
                <ArrowRight size={13} className="text-[#B8955A] group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            <div className="rounded-xl border border-[#E5E1D8] bg-[#FAF8F4] p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm text-[#0F1B2D]">{selectedRequest.type}</span>
                <StatChip status={selectedRequest.status === 'Completed' ? 'resolved' : 'pending'} />
              </div>
              <div className="text-[11px] text-[#4A5568]">
                Authority: <strong>{selectedRequest.authority}</strong> • Due: <strong>{selectedRequest.due}</strong>
              </div>
            </div>

            <div>
              <span className="text-[#A0A7B4] block text-[11px] mb-1">Target Data Subject</span>
              <div className="p-3 rounded-xl border border-[#E5E1D8] bg-white font-medium text-[#0F1B2D]">
                {selectedRequest.dataSubject}
              </div>
            </div>

            <div>
              <span className="text-[#A0A7B4] block text-[11px] mb-1">Statutory Request Scope</span>
              <p className="p-3 rounded-xl border border-[#E5E1D8] bg-white text-[#4A5568] leading-relaxed">
                {selectedRequest.scope}
              </p>
            </div>

            <div className="p-3 rounded-xl border border-[#E5E1D8] bg-[#FAF8F4] flex items-center justify-between">
              <div>
                <span className="text-[11px] text-[#718096] block">Records Identified</span>
                <span className="font-mono font-bold text-sm text-[#0F1B2D]">{selectedRequest.recordsIdentified} records</span>
              </div>
              <div>
                <span className="text-[11px] text-[#718096] block">Compliance Clock</span>
                <span className="font-semibold text-xs text-rose-700">{selectedRequest.complianceClock}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-[#E5E1D8] space-y-2">
              {/* <Link
                href={`/admin/data-requests/${selectedRequest.id}`}
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[#0F1B2D] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#1C2B42] transition shadow-xs group"
              >
                <span>Navigate to Dedicated Request Page (/{selectedRequest.id})</span>
                <ArrowRight size={14} className="text-[#B8955A] group-hover:translate-x-0.5 transition-transform" />
              </Link> */}
              <Btn onClick={() => setDrawerOpen(false)} secondary className="w-full">
                Close Drawer
              </Btn>
            </div>
          </div>
        </DetailDrawer>
      )}
    </AdminShell>
  );
}
