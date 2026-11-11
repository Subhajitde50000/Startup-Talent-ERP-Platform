'use client';

import React, { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import {
  Flag,
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
  Trash2,
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
import { userReportsList } from '../moderation/moderation-data';

export default function AdminReportsPage() {
  const [reports, setReports] = useState(userReportsList);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [selectedReport, setSelectedReport] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      toast('User reports registry refreshed');
    }, 600);
  }, []);

  const categories = useMemo(() => {
    return ['all', ...Array.from(new Set(reports.map((r) => r.category)))];
  }, [reports]);

  const filteredReports = useMemo(() => {
    return reports.filter((r) => {
      if (categoryFilter !== 'all' && r.category !== categoryFilter) return false;
      if (severityFilter !== 'all' && r.severity !== severityFilter) return false;
      if (
        searchQuery &&
        !r.id.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !r.subject.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !r.reporter.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !r.category.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }
      return true;
    });
  }, [reports, categoryFilter, severityFilter, searchQuery]);

  const handleActionReport = (report, action) => {
    setReports((prev) =>
      prev.map((r) => (r.id === report.id ? { ...r, status: action } : r))
    );
    toast(`Report ${report.id} marked as ${action}`);
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
        <span className="text-[#0F1B2D] font-medium">User Reports</span>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 border-b border-[#E5E1D8] pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#0F1B2D] flex items-center gap-2">
            <Flag size={22} className="text-[#B8955A]" />
            <span>Community & Incident Reports Console</span>
          </h1>
          <p className="text-xs text-[#4A5568] mt-1 max-w-2xl">
            Complete incident report database submitted by users, jobseekers, founders, and automated crawlers across all platform features.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Btn small secondary icon={RefreshCcw} onClick={handleRefresh} title="Sync reports">
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
        <MetricCard label="Total Incident Reports" value={reports.length.toString()} sub="All time registry" status="live" />
        <MetricCard
          label="Pending Triage"
          value={reports.filter((r) => r.status === 'pending' || r.status === 'under_review').length.toString()}
          sub="Requires staff decision"
          status="critical"
        />
        <MetricCard
          label="Actioned Violations"
          value={reports.filter((r) => r.status === 'actioned').length.toString()}
          sub="Takedowns or warnings"
          status="resolved"
        />
        <MetricCard
          label="Dismissed as Benign"
          value={reports.filter((r) => r.status === 'dismissed').length.toString()}
          sub="No violation found"
          status="medium"
        />
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 border-b border-[#E5E1D8] pb-3 mb-6">
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search size={14} className="absolute left-2.5 top-2.5 text-[#718096]" />
            <label htmlFor="reports-search" className="sr-only">Search reports</label>
            <input
              id="reports-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search report ID, subject, email…"
              className="h-9 rounded-lg border border-[#E5E1D8] bg-white pl-8 pr-3 text-xs w-64 sm:w-72 outline-none"
            />
          </div>

          <label htmlFor="reports-category-filter" className="sr-only">Filter by category</label>
          <select
            id="reports-category-filter"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="h-9 rounded-lg border border-[#E5E1D8] bg-white px-2.5 text-xs text-[#0F1B2D] outline-none"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                Category: {c === 'all' ? 'All Categories' : c}
              </option>
            ))}
          </select>

          <label htmlFor="reports-severity-filter" className="sr-only">Filter by severity</label>
          <select
            id="reports-severity-filter"
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="h-9 rounded-lg border border-[#E5E1D8] bg-white px-2.5 text-xs text-[#0F1B2D] outline-none"
          >
            <option value="all">Severity: All</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        <span className="text-xs text-[#718096]">
          Showing {filteredReports.length} of {reports.length} reports
        </span>
      </div>

      {/* Main Table */}
      <Card title="Incident Reports Master Registry" titleIcon={Flag} padded={false}>
        <ResponsiveTable>
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#E5E1D8] bg-[#FAF8F4]/80">
                {['Report ID', 'Flagged Content Subject', 'Target Type', 'Violation Category', 'Reporter', 'Severity', 'Status', 'Date', 'Action'].map((h) => (
                  <th key={h} className="p-3 text-xs font-semibold text-[#4A5568] whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredReports.map((r) => (
                <tr
                  key={r.id}
                  onClick={() => {
                    setSelectedReport(r);
                    setDrawerOpen(true);
                  }}
                  className="border-b border-[#E5E1D8]/60 last:border-0 hover:bg-[#FAF8F4] cursor-pointer transition"
                >
                  <td className="p-3 font-mono font-medium text-[#0F1B2D] whitespace-nowrap">{r.id}</td>
                  <td className="p-3 font-semibold text-[#0F1B2D] max-w-xs truncate" title={r.subject}>
                    {r.subject}
                  </td>
                  <td className="p-3 whitespace-nowrap">
                    <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-100 text-slate-700">
                      {r.targetType}
                    </span>
                  </td>
                  <td className="p-3 text-[#4A5568] whitespace-nowrap font-medium">{r.category}</td>
                  <td className="p-3 font-mono text-[11px] text-[#718096] whitespace-nowrap">{r.reporter}</td>
                  <td className="p-3 whitespace-nowrap">
                    <StatChip status={r.severity} />
                  </td>
                  <td className="p-3 whitespace-nowrap">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-semibold capitalize ${
                      r.status === 'actioned' ? 'bg-emerald-100 text-emerald-800' :
                      r.status === 'under_review' ? 'bg-amber-100 text-amber-800' :
                      r.status === 'dismissed' ? 'bg-slate-100 text-slate-600' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {r.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="p-3 text-[#718096] whitespace-nowrap">{r.created}</td>
                  <td className="p-3 whitespace-nowrap">
                    <span className="text-xs font-medium text-[#B8955A] hover:underline flex items-center gap-1">
                      Details <ChevronRight size={13} />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </ResponsiveTable>
      </Card>

      {/* Drawer */}
      {drawerOpen && selectedReport && (
        <DetailDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          title={`Report: ${selectedReport.id}`}
        >
          <div className="space-y-4 text-xs">
            <div className="rounded-xl border border-[#E5E1D8] bg-[#FAF8F4] p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm text-[#0F1B2D]">{selectedReport.category}</span>
                <StatChip status={selectedReport.severity} />
              </div>
              <div className="text-[11px] text-[#4A5568]">
                Target: <strong className="font-mono">{selectedReport.targetType}</strong> • Filed by: <strong className="font-mono">{selectedReport.reporter}</strong>
              </div>
            </div>

            <div>
              <span className="text-[#A0A7B4] block text-[11px] mb-1">Subject Entity</span>
              <div className="p-3 rounded-xl border border-[#E5E1D8] bg-white font-medium text-[#0F1B2D]">
                {selectedReport.subject}
              </div>
            </div>

            <div>
              <span className="text-[#A0A7B4] block text-[11px] mb-1">Incident Report Statement</span>
              <p className="p-3 rounded-xl border border-[#E5E1D8] bg-white text-[#4A5568] leading-relaxed">
                {selectedReport.description}
              </p>
            </div>

            <div className="p-3 rounded-xl border border-amber-200 bg-amber-50/60 text-amber-900 space-y-1">
              <span className="font-bold block">Triage Options</span>
              <p className="text-xs">
                Escalating this report will create a formal moderation queue case with SLA tracking.
              </p>
            </div>

            <div className="flex flex-col gap-2 pt-2 border-t border-[#E5E1D8]">
              <div className="flex gap-2">
                <Btn
                  destructive
                  onClick={() => handleActionReport(selectedReport, 'actioned')}
                  className="flex-1"
                  icon={Trash2}
                >
                  Take Down Item
                </Btn>
                <Btn
                  secondary
                  onClick={() => handleActionReport(selectedReport, 'dismissed')}
                  className="flex-1"
                  icon={CheckCircle2}
                >
                  Dismiss Report
                </Btn>
              </div>
              <Link
                href="/admin/moderation"
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg border border-[#E5E1D8] bg-white px-3 py-2 text-xs font-medium text-[#0F1B2D] hover:bg-[#FAF8F4] transition"
              >
                <span>View Full Moderation Queue</span>
                <ChevronRight size={13} />
              </Link>
            </div>
          </div>
        </DetailDrawer>
      )}
    </AdminShell>
  );
}
