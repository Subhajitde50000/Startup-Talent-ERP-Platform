'use client';

import React, { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import {
  ShieldAlert,
  Search,
  Filter,
  RefreshCcw,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Eye,
  Trash2,
  Lock,
  ChevronRight,
  ShieldCheck,
  ArrowRight,
  ExternalLink,
  Flag,
  RotateCcw,
  Scale,
  Zap,
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
  moderationTabs,
  moderationCases,
  userReportsList,
  appealsList,
  disputesList,
  fraudDetectionsList,
} from './moderation-data';

export default function AdminTrustSafetyPage({ initialTab = 'queue' }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [drawerType, setDrawerType] = useState('case'); // 'case' | 'report' | 'appeal' | 'dispute' | 'fraud'
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [casesList, setCasesList] = useState(moderationCases);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      toast('Moderation queue refreshed');
    }, 600);
  }, []);

  // Filtered queue
  const filteredCases = useMemo(() => {
    return casesList.filter((c) => {
      if (
        searchQuery &&
        !c.id.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !c.policy.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !c.subject.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }
      return true;
    });
  }, [casesList, searchQuery]);

  // Last 5 items for the sub-sections
  const recentReports = useMemo(() => userReportsList.slice(0, 5), []);
  const recentAppeals = useMemo(() => appealsList.slice(0, 5), []);
  const recentDisputes = useMemo(() => disputesList.slice(0, 5), []);
  const recentFraud = useMemo(() => fraudDetectionsList.slice(0, 5), []);

  const handleTakeDown = (caseItem) => {
    setCasesList(casesList.filter((c) => c.id !== caseItem.id));
    toast(`Content in ${caseItem.id} taken down and user account limited`);
    setDrawerOpen(false);
  };

  const handleDismissCase = (caseItem) => {
    setCasesList(casesList.filter((c) => c.id !== caseItem.id));
    toast(`Case ${caseItem.id} resolved as benign`);
    setDrawerOpen(false);
  };

  return (
    <AdminShell active="Moderation" onRefresh={handleRefresh}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 border-b border-[#E5E1D8] pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#0F1B2D]">Trust, Safety & Moderation</h1>
          <p className="text-xs text-[#4A5568] mt-1 max-w-2xl">
            Content violation queue, user fraud reports, scam prevention, appeals, and platform policy enforcement.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Btn small secondary icon={RefreshCcw} onClick={handleRefresh} title="Sync queue">
            Sync
          </Btn>
          <Btn
            small
            onClick={() => {
              if (casesList.length > 0) {
                setSelectedItem(casesList[0]);
                setDrawerType('case');
                setDrawerOpen(true);
              }
            }}
            title="Review next high severity item"
          >
            Review Next
          </Btn>
        </div>
      </div>

      {/* KPI Overview */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <MetricCard label="Open Moderation Cases" value={casesList.length.toString()} sub="3 critical severity" status="critical" />
        <MetricCard label="Active Content Reports" value={userReportsList.length.toString()} sub="Across jobs & profiles" status="medium" />
        <MetricCard label="Appeals Pending" value={appealsList.length.toString()} sub="Second-chance reviews" status="live" />
        <MetricCard label="Auto-Mitigation Rate" value="94.2%" sub="Immediate hold on scam alerts" status="resolved" />
      </div>

      {/* Tabs */}
      <TabBar active={activeTab} onChange={setActiveTab} tabs={moderationTabs} />

      {/* =========================================================================
          TAB 1: Active Moderation Queue
         ========================================================================= */}
      {activeTab === 'queue' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[#E5E1D8] pb-3 mb-2">
            <div>
              <label htmlFor="moderation-search-input" className="sr-only">Search moderation queue</label>
              <input
                id="moderation-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search case ID, policy, subject…"
                className="h-9 rounded-lg border border-[#E5E1D8] bg-white px-3 text-xs w-64 sm:w-80 outline-none"
              />
            </div>
            <span className="text-xs text-[#718096]">Showing {filteredCases.length} active queue items</span>
          </div>

          <Card title="Violation Queue" titleIcon={ShieldAlert} padded={false}>
            <ResponsiveTable>
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#E5E1D8] bg-[#FAF8F4]/80">
                    {['Case ID', 'Flagged Content Subject', 'Policy Violated', 'Source', 'Severity', 'SLA Clock', 'Created', 'Action'].map((h) => (
                      <th key={h} className="p-3 text-xs font-semibold text-[#4A5568] whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredCases.map((c) => (
                    <tr
                      key={c.id}
                      onClick={() => {
                        setSelectedItem(c);
                        setDrawerType('case');
                        setDrawerOpen(true);
                      }}
                      className="border-b border-[#E5E1D8]/60 last:border-0 hover:bg-[#FAF8F4] cursor-pointer transition"
                    >
                      <td className="p-3 font-mono font-medium text-[#0F1B2D] whitespace-nowrap">{c.id}</td>
                      <td className="p-3 font-semibold text-[#0F1B2D] max-w-xs truncate" title={c.subject}>
                        {c.subject}
                      </td>
                      <td className="p-3 text-[#4A5568] whitespace-nowrap">{c.policy}</td>
                      <td className="p-3 font-mono text-[11px] text-[#A0A7B4] whitespace-nowrap">{c.source}</td>
                      <td className="p-3 whitespace-nowrap">
                        <StatChip status={c.severity} />
                      </td>
                      <td className="p-3 whitespace-nowrap">
                        <span className={`font-medium ${c.sla.includes('Breached') ? 'text-rose-700' : 'text-[#4A5568]'}`}>
                          {c.sla}
                        </span>
                      </td>
                      <td className="p-3 text-[#4A5568] whitespace-nowrap">{c.created}</td>
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
        </div>
      )}

      {/* =========================================================================
          TAB 2: User Reports (Showing only last 5 + Open Page button)
         ========================================================================= */}
      {activeTab === 'reports' && (
        <div className="space-y-4">
          {/* Header Action Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 bg-gradient-to-r from-[#FAF8F4] to-amber-50/50 rounded-xl border border-[#E5E1D8]">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#B8955A]/15 text-[#B8955A] flex items-center justify-center shrink-0 mt-0.5">
                <Flag size={18} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-semibold text-[#0F1B2D]">Community & User Incident Reports</h2>
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#B8955A]/15 text-[#8C6D37]">
                    Last 5 Recent
                  </span>
                </div>
                <p className="text-xs text-[#4A5568] mt-0.5">
                  Showing 5 of {userReportsList.length} total user-reported violations. Full triage tools, search, and resolution history available on the dedicated console.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Link
                href="/admin/reports"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#0F1B2D] text-white hover:bg-[#1C2B42] text-xs font-semibold transition shadow-xs group"
                title="Open dedicated Reports page"
              >
                <span>Open Reports Page</span>
                <ExternalLink size={13} className="text-[#B8955A] group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          <Card title="Latest 5 User Reports" titleIcon={Flag} padded={false}>
            <ResponsiveTable>
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#E5E1D8] bg-[#FAF8F4]/80">
                    {['Report ID', 'Flagged Content / Entity', 'Category', 'Reporter', 'Severity', 'Status', 'Submitted', 'Action'].map((h) => (
                      <th key={h} className="p-3 text-xs font-semibold text-[#4A5568] whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {recentReports.map((r) => (
                    <tr
                      key={r.id}
                      onClick={() => {
                        setSelectedItem(r);
                        setDrawerType('report');
                        setDrawerOpen(true);
                      }}
                      className="border-b border-[#E5E1D8]/60 last:border-0 hover:bg-[#FAF8F4] cursor-pointer transition"
                    >
                      <td className="p-3 font-mono font-medium text-[#0F1B2D] whitespace-nowrap">{r.id}</td>
                      <td className="p-3 font-semibold text-[#0F1B2D] max-w-xs truncate" title={r.subject}>
                        {r.subject}
                      </td>
                      <td className="p-3 text-[#4A5568] whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded bg-[#FAF8F4] border border-[#E5E1D8] text-[11px] font-medium text-[#0F1B2D]">
                          {r.category}
                        </span>
                      </td>
                      <td className="p-3 font-mono text-[11px] text-[#4A5568] whitespace-nowrap">{r.reporter}</td>
                      <td className="p-3 whitespace-nowrap">
                        <StatChip status={r.severity} />
                      </td>
                      <td className="p-3 whitespace-nowrap">
                        <span className="capitalize font-medium text-[#4A5568]">{r.status.replace('_', ' ')}</span>
                      </td>
                      <td className="p-3 text-[#718096] whitespace-nowrap">{r.created}</td>
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
            <div className="p-3 bg-[#FAF8F4]/60 border-t border-[#E5E1D8] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs">
              <span className="text-[#718096]">
                Showing 5 most recent incident reports. Total registry contains {userReportsList.length} items.
              </span>
              <Link
                href="/admin/reports"
                className="inline-flex items-center gap-1.5 font-semibold text-[#B8955A] hover:text-[#9A7B44] transition"
              >
                <span>View All {userReportsList.length} Reports on Reports Console</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </Card>
        </div>
      )}

      {/* =========================================================================
          TAB 3: Appeals & Re-reviews (Showing only last 5 + Open Page button)
         ========================================================================= */}
      {activeTab === 'appeals' && (
        <div className="space-y-4">
          {/* Header Action Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 bg-gradient-to-r from-[#FAF8F4] to-blue-50/40 rounded-xl border border-[#E5E1D8]">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                <RotateCcw size={18} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-semibold text-[#0F1B2D]">Account & Credential Appeals</h2>
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-blue-100 text-blue-800">
                    Last 5 Recent
                  </span>
                </div>
                <p className="text-xs text-[#4A5568] mt-0.5">
                  Showing 5 of {appealsList.length} total appeals submitted by restricted founders, mentors, and employers.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Link
                href="/admin/appeals"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#0F1B2D] text-white hover:bg-[#1C2B42] text-xs font-semibold transition shadow-xs group"
                title="Open dedicated Appeals page"
              >
                <span>Open Appeals Page</span>
                <ExternalLink size={13} className="text-[#B8955A] group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          <Card title="Latest 5 Account Appeals" titleIcon={RotateCcw} padded={false}>
            <ResponsiveTable>
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#E5E1D8] bg-[#FAF8F4]/80">
                    {['Appeal ID', 'User / Organization', 'Original Decision', 'Priority', 'Status', 'Assigned To', 'Submitted', 'Action'].map((h) => (
                      <th key={h} className="p-3 text-xs font-semibold text-[#4A5568] whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {recentAppeals.map((a) => (
                    <tr
                      key={a.id}
                      onClick={() => {
                        setSelectedItem(a);
                        setDrawerType('appeal');
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
                        <StatChip status={a.status === 'in_review' ? 'active' : a.status === 'approved' ? 'resolved' : 'pending'} />
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
            <div className="p-3 bg-[#FAF8F4]/60 border-t border-[#E5E1D8] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs">
              <span className="text-[#718096]">
                Showing 5 most recent appeals. Total registry contains {appealsList.length} items.
              </span>
              <Link
                href="/admin/appeals"
                className="inline-flex items-center gap-1.5 font-semibold text-[#B8955A] hover:text-[#9A7B44] transition"
              >
                <span>View All {appealsList.length} Appeals on Appeals Console</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </Card>
        </div>
      )}

      {/* =========================================================================
          TAB 4: Escrow & Platform Disputes (Showing only last 5 + Open Page button)
         ========================================================================= */}
      {activeTab === 'disputes' && (
        <div className="space-y-4">
          {/* Header Action Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 bg-gradient-to-r from-[#FAF8F4] to-emerald-50/40 rounded-xl border border-[#E5E1D8]">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                <Scale size={18} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-semibold text-[#0F1B2D]">Escrow & Milestone Contract Disputes</h2>
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800">
                    Last 5 Recent
                  </span>
                </div>
                <p className="text-xs text-[#4A5568] mt-0.5">
                  Showing 5 of {disputesList.length} contested deliverables, payment holds, and client mediation cases.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Link
                href="/admin/disputes"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#0F1B2D] text-white hover:bg-[#1C2B42] text-xs font-semibold transition shadow-xs group"
                title="Open dedicated Disputes page"
              >
                <span>Open Disputes Page</span>
                <ExternalLink size={13} className="text-[#B8955A] group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          <Card title="Latest 5 Escrow Disputes" titleIcon={Scale} padded={false}>
            <ResponsiveTable>
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#E5E1D8] bg-[#FAF8F4]/80">
                    {['Dispute ID', 'Subject / Deliverable', 'Contesting Parties', 'Disputed Sum', 'Status', 'Resolution Deadline', 'Action'].map((h) => (
                      <th key={h} className="p-3 text-xs font-semibold text-[#4A5568] whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {recentDisputes.map((d) => (
                    <tr
                      key={d.id}
                      onClick={() => {
                        setSelectedItem(d);
                        setDrawerType('dispute');
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
                      <td className="p-3 font-mono font-semibold text-[#0F1B2D] whitespace-nowrap">{d.amount}</td>
                      <td className="p-3 whitespace-nowrap">
                        <StatChip status={d.status === 'open' ? 'critical' : d.status === 'mediation' ? 'medium' : 'resolved'} />
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
            <div className="p-3 bg-[#FAF8F4]/60 border-t border-[#E5E1D8] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs">
              <span className="text-[#718096]">
                Showing 5 most recent escrow disputes. Total registry contains {disputesList.length} items.
              </span>
              <Link
                href="/admin/disputes"
                className="inline-flex items-center gap-1.5 font-semibold text-[#B8955A] hover:text-[#9A7B44] transition"
              >
                <span>View All {disputesList.length} Disputes on Disputes Console</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </Card>
        </div>
      )}

      {/* =========================================================================
          TAB 5: Automated Fraud Detections (Showing only last 5 + Open Page button)
         ========================================================================= */}
      {activeTab === 'fraud' && (
        <div className="space-y-4">
          {/* Header Action Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 bg-gradient-to-r from-[#FAF8F4] to-purple-50/40 rounded-xl border border-[#E5E1D8]">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 mt-0.5">
                <Zap size={18} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-semibold text-[#0F1B2D]">Automated Fraud & Threat Telemetry</h2>
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-purple-100 text-purple-800">
                    Last 5 Recent
                  </span>
                </div>
                <p className="text-xs text-[#4A5568] mt-0.5">
                  Showing 5 of {fraudDetectionsList.length} real-time automated heuristics catching synthetic identities and payment velocity anomalies.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Link
                href="/admin/fraud"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#0F1B2D] text-white hover:bg-[#1C2B42] text-xs font-semibold transition shadow-xs group"
                title="Open dedicated Fraud page"
              >
                <span>Open Fraud Page</span>
                <ExternalLink size={13} className="text-[#B8955A] group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          <Card title="Latest 5 Fraud Telemetry Triggers" titleIcon={Zap} padded={false}>
            <ResponsiveTable>
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#E5E1D8] bg-[#FAF8F4]/80">
                    {['Threat ID', 'Threat Pattern', 'Target Entity', 'Risk Score', 'Automated Defense Action', 'Status', 'Detected', 'Action'].map((h) => (
                      <th key={h} className="p-3 text-xs font-semibold text-[#4A5568] whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {recentFraud.map((f) => (
                    <tr
                      key={f.id}
                      onClick={() => {
                        setSelectedItem(f);
                        setDrawerType('fraud');
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
                      <td className="p-3 text-[#4A5568] whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded bg-[#FAF8F4] border border-[#E5E1D8] text-[11px] font-medium text-[#0F1B2D]">
                          {f.automatedAction}
                        </span>
                      </td>
                      <td className="p-3 whitespace-nowrap">
                        <StatChip status={f.status === 'active' ? 'critical' : 'resolved'} />
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
            <div className="p-3 bg-[#FAF8F4]/60 border-t border-[#E5E1D8] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs">
              <span className="text-[#718096]">
                Showing 5 most recent automated threat triggers. Total registry contains {fraudDetectionsList.length} items.
              </span>
              <Link
                href="/admin/fraud"
                className="inline-flex items-center gap-1.5 font-semibold text-[#B8955A] hover:text-[#9A7B44] transition"
              >
                <span>View All {fraudDetectionsList.length} Fraud Cases on Fraud Console</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </Card>
        </div>
      )}

      {/* =========================================================================
          Universal Detail Drawer
         ========================================================================= */}
      {drawerOpen && selectedItem && (
        <DetailDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          title={`${drawerType.toUpperCase()}: ${selectedItem.id}`}
        >
          <div className="space-y-4 text-xs">
            {/* Case Type */}
            {drawerType === 'case' && (
              <>
                <div className="rounded-xl border border-[#E5E1D8] bg-[#FAF8F4] p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm text-[#0F1B2D]">{selectedItem.policy}</span>
                    <StatChip status={selectedItem.severity} />
                  </div>
                  <div className="text-[11px] text-[#4A5568]">
                    Detection Source: <strong>{selectedItem.source}</strong> • Reports: <strong>{selectedItem.reports}</strong>
                  </div>
                </div>

                <div>
                  <span className="text-[#A0A7B4] block text-[11px] mb-1">Target Content Item</span>
                  <div className="p-3 rounded-xl border border-[#E5E1D8] bg-white font-medium text-[#0F1B2D]">
                    {selectedItem.subject}
                  </div>
                </div>

                {selectedItem.details && (
                  <div>
                    <span className="text-[#A0A7B4] block text-[11px] mb-1">Investigation Evidence</span>
                    <p className="p-3 rounded-xl border border-[#E5E1D8] bg-[#FAF8F4] text-[#4A5568] leading-relaxed">
                      {selectedItem.details}
                    </p>
                  </div>
                )}

                <div className="p-3 rounded-xl border border-rose-200 bg-rose-50/60 text-rose-900 space-y-1">
                  <span className="font-bold block">Enforcement Action Required</span>
                  <p className="text-xs">
                    Taking down this item will immediately unpublish it from all public search indices and notify the account owner.
                  </p>
                </div>

                <div className="pt-2">
                  <Link
                    href={`/admin/moderation/${selectedItem.id}`}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[#0F1B2D] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#1C2B42] transition shadow-xs"
                  >
                    <span>Open Full Case Workspace</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>

                <div className="flex gap-2 pt-2 border-t border-[#E5E1D8]">
                  <Btn
                    destructive
                    onClick={() => handleTakeDown(selectedItem)}
                    className="flex-1"
                    icon={Trash2}
                  >
                    Take Down Content
                  </Btn>
                  <Btn
                    secondary
                    onClick={() => handleDismissCase(selectedItem)}
                    className="flex-1"
                    icon={CheckCircle2}
                  >
                    Mark Benign
                  </Btn>
                </div>
              </>
            )}

            {/* Report Type */}
            {drawerType === 'report' && (
              <>
                <div className="rounded-xl border border-[#E5E1D8] bg-[#FAF8F4] p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm text-[#0F1B2D]">{selectedItem.category}</span>
                    <StatChip status={selectedItem.severity} />
                  </div>
                  <div className="text-[11px] text-[#4A5568]">
                    Filed By: <strong className="font-mono">{selectedItem.reporter}</strong> • Submitted: <strong>{selectedItem.created}</strong>
                  </div>
                </div>

                <div>
                  <span className="text-[#A0A7B4] block text-[11px] mb-1">Subject Entity</span>
                  <div className="p-3 rounded-xl border border-[#E5E1D8] bg-white font-medium text-[#0F1B2D]">
                    {selectedItem.subject}
                  </div>
                </div>

                <div>
                  <span className="text-[#A0A7B4] block text-[11px] mb-1">Reporter Statement</span>
                  <p className="p-3 rounded-xl border border-[#E5E1D8] bg-[#FAF8F4] text-[#4A5568] leading-relaxed">
                    {selectedItem.description}
                  </p>
                </div>

                <div className="pt-2">
                  <Link
                    href="/admin/reports"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[#0F1B2D] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#1C2B42] transition shadow-xs"
                  >
                    <span>Open in Full Reports Console</span>
                    <ExternalLink size={14} />
                  </Link>
                </div>
              </>
            )}

            {/* Appeal Type */}
            {drawerType === 'appeal' && (
              <>
                <div className="rounded-xl border border-[#E5E1D8] bg-[#FAF8F4] p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm text-[#0F1B2D]">{selectedItem.user}</span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-100 text-blue-800">
                      {selectedItem.priority}
                    </span>
                  </div>
                  <div className="text-[11px] text-[#4A5568]">
                    Decision Contested: <strong>{selectedItem.originalDecision}</strong>
                  </div>
                </div>

                <div>
                  <span className="text-[#A0A7B4] block text-[11px] mb-1">Appellant Explanation</span>
                  <p className="p-3 rounded-xl border border-[#E5E1D8] bg-white text-[#4A5568] leading-relaxed">
                    {selectedItem.reason}
                  </p>
                </div>

                <div className="pt-2">
                  <Link
                    href="/admin/appeals"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[#0F1B2D] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#1C2B42] transition shadow-xs"
                  >
                    <span>Open in Full Appeals Console</span>
                    <ExternalLink size={14} />
                  </Link>
                </div>
              </>
            )}

            {/* Dispute Type */}
            {drawerType === 'dispute' && (
              <>
                <div className="rounded-xl border border-[#E5E1D8] bg-[#FAF8F4] p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm text-[#0F1B2D]">{selectedItem.title}</span>
                    <span className="font-mono font-bold text-emerald-800">{selectedItem.amount}</span>
                  </div>
                  <div className="text-[11px] text-[#4A5568]">
                    Parties: <strong>{selectedItem.parties}</strong>
                  </div>
                </div>

                <div>
                  <span className="text-[#A0A7B4] block text-[11px] mb-1">Dispute Basis</span>
                  <p className="p-3 rounded-xl border border-[#E5E1D8] bg-white text-[#4A5568] leading-relaxed">
                    {selectedItem.reason}
                  </p>
                </div>

                <div className="pt-2">
                  <Link
                    href="/admin/disputes"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[#0F1B2D] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#1C2B42] transition shadow-xs"
                  >
                    <span>Open in Full Disputes Console</span>
                    <ExternalLink size={14} />
                  </Link>
                </div>
              </>
            )}

            {/* Fraud Type */}
            {drawerType === 'fraud' && (
              <>
                <div className="rounded-xl border border-[#E5E1D8] bg-[#FAF8F4] p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm text-[#0F1B2D]">{selectedItem.threatType}</span>
                    <span className="px-2 py-0.5 rounded font-mono font-bold text-xs bg-rose-100 text-rose-800">
                      Score: {selectedItem.riskScore}
                    </span>
                  </div>
                  <div className="text-[11px] text-[#4A5568]">
                    Target: <strong className="font-mono">{selectedItem.targetEntity}</strong>
                  </div>
                </div>

                <div>
                  <span className="text-[#A0A7B4] block text-[11px] mb-1">Heuristic Signals Detected</span>
                  <ul className="list-disc list-inside p-3 rounded-xl border border-[#E5E1D8] bg-white text-[#4A5568] space-y-1">
                    {selectedItem.signals?.map((s, idx) => (
                      <li key={idx} className="text-xs">{s}</li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2">
                  <Link
                    href="/admin/fraud"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[#0F1B2D] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#1C2B42] transition shadow-xs"
                  >
                    <span>Open in Full Fraud Console</span>
                    <ExternalLink size={14} />
                  </Link>
                </div>
              </>
            )}
          </div>
        </DetailDrawer>
      )}
    </AdminShell>
  );
}

export { AdminTrustSafetyPage };
