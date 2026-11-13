'use client';

import React, { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import {
  Building,
  Clock,
  Search,
  Filter,
  RefreshCcw,
  CheckCircle2,
  XCircle,
  Eye,
  ShieldCheck,
  ChevronRight,
  Download,
  ArrowRight,
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
  verificationTabs,
  verificationCases,
} from './verification-data';

export default function AdminVerificationPage({ initialTab = 'all' }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCase, setSelectedCase] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [casesList, setCasesList] = useState(verificationCases);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      toast('Verification queue synchronized');
    }, 600);
  }, []);

  const filteredCases = useMemo(() => {
    return casesList.filter((c) => {
      if (activeTab !== 'all' && c.type !== activeTab) return false;
      if (
        searchQuery &&
        !c.id.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !c.applicant.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }
      return true;
    });
  }, [activeTab, searchQuery, casesList]);

  const handleApprove = (caseItem) => {
    setCasesList(casesList.filter((c) => c.id !== caseItem.id));
    toast(`Verification approved for ${caseItem.applicant} (${caseItem.id})`);
    setDrawerOpen(false);
  };

  const handleReject = (caseItem) => {
    setCasesList(casesList.filter((c) => c.id !== caseItem.id));
    toast(`Verification rejected for ${caseItem.applicant}. Deficiency notice dispatched.`);
    setDrawerOpen(false);
  };

  return (
    <AdminShell active="Verifications" onRefresh={handleRefresh}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 border-b border-[#E5E1D8] pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#0F1B2D]">Entity & Identity Verification Queue</h1>
          <p className="text-xs text-[#4A5568] mt-1 max-w-2xl">
            KYC/AML validation, incorporation deed reviews, accredited investor certifications, and mentor credentials.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/admin/verifications/expiring"
            className="inline-flex items-center gap-2 rounded-lg border border-[#E5E1D8] bg-[#FAF8F4] px-2.5 py-1.5 text-xs font-medium text-[#4A5568] transition hover:bg-[#F3EBDD] hover:text-[#0F1B2D]"
          >
            <Clock size={13} />
            Expiring
          </Link>
          <Btn small secondary icon={RefreshCcw} onClick={handleRefresh} title="Sync verifications">
            Sync
          </Btn>
          <Btn
            small
            onClick={() => {
              if (casesList.length > 0) {
                setSelectedCase(casesList[0]);
                setDrawerOpen(true);
              }
            }}
            title="Review next verification"
          >
            Review Next
          </Btn>
        </div>
      </div>

      {/* KPI Overview */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <MetricCard label="Pending Verifications" value={casesList.length.toString()} sub="1 breached SLA" status="critical" />
        <MetricCard label="Verified This Week" value="48" sub="Startups & Mentors" status="resolved" />
        <MetricCard label="Avg Turnaround Time" value="14h" sub="Target: < 24h" status="live" />
        <MetricCard label="Auto-Screening Pass Rate" value="86%" sub="OCR & MCA checks" status="standard" />
      </div>

      {/* Tabs */}
      <TabBar active={activeTab} onChange={setActiveTab} tabs={verificationTabs} />

      {/* Search Bar */}
      <div className="flex items-center justify-between border-b border-[#E5E1D8] pb-3 mb-6">
        <div>
          <label htmlFor="verification-search-input" className="sr-only">Search verifications</label>
          <input
            id="verification-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search applicant name, case ID…"
            className="h-9 rounded-lg border border-[#E5E1D8] bg-white px-3 text-xs w-64 sm:w-80 outline-none"
          />
        </div>
      </div>

      {/* Table */}
      <Card title="Pending Applications" titleIcon={Building} padded={false}>
        <ResponsiveTable>
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#E5E1D8] bg-[#FAF8F4]/80">
                {['Case ID', 'Applicant Entity', 'Role Type', 'Region', 'Automated Check Status', 'Risk Tier', 'SLA Clock', 'Submitted'].map((h) => (
                  <th key={h} className="p-3 text-xs font-semibold text-[#4A5568] whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredCases.map((c) => (
                <tr
                  key={c.id}
                  onClick={() => {
                    setSelectedCase(c);
                    setDrawerOpen(true);
                  }}
                  className="border-b border-[#E5E1D8]/60 last:border-0 hover:bg-[#FAF8F4] cursor-pointer transition"
                >
                  <td className="p-3 font-mono font-medium text-[#0F1B2D] whitespace-nowrap">{c.id}</td>
                  <td className="p-3 font-semibold text-[#0F1B2D] whitespace-nowrap">{c.applicant}</td>
                  <td className="p-3 capitalize text-[#4A5568] whitespace-nowrap">{c.type}</td>
                  <td className="p-3 text-[#4A5568] whitespace-nowrap">{c.region}</td>
                  <td className="p-3 text-[#4A5568] whitespace-nowrap">{c.checks}</td>
                  <td className="p-3 whitespace-nowrap">
                    <StatChip status={c.risk} />
                  </td>
                  <td className="p-3 whitespace-nowrap">
                    <span className={`font-medium ${c.sla.includes('Breached') ? 'text-rose-700' : 'text-[#4A5568]'}`}>
                      {c.sla}
                    </span>
                  </td>
                  <td className="p-3 text-[#4A5568] whitespace-nowrap">{c.submitted}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </ResponsiveTable>
      </Card>

      {/* Inspection Drawer */}
      {drawerOpen && selectedCase && (
        <DetailDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          title={`Verification Case: ${selectedCase.id}`}
        >
          <div className="space-y-4 text-xs">
            <div className="rounded-xl border border-[#E5E1D8] bg-[#FAF8F4] p-3 space-y-1">
              <div className="font-semibold text-sm text-[#0F1B2D]">{selectedCase.applicant}</div>
              <div className="text-[11px] text-[#4A5568]">
                Role: <strong className="capitalize">{selectedCase.type}</strong> • Location: <strong>{selectedCase.region}</strong>
              </div>
            </div>

            <div>
              <span className="text-[#A0A7B4] block text-[11px] mb-1">Automated Identity & Registry Checks</span>
              <div className="p-3 rounded-xl border border-[#E5E1D8] bg-white space-y-2">
                <div className="flex items-center justify-between">
                  <span>MCA Corporate Registry Verification</span>
                  <StatChip status="resolved" />
                </div>
                <div className="flex items-center justify-between">
                  <span>GSTIN Status & Tax Compliance</span>
                  <StatChip status={selectedCase.risk === 'critical' ? 'critical' : 'resolved'} />
                </div>
                <div className="flex items-center justify-between">
                  <span>Signatory Identification OCR</span>
                  <StatChip status="resolved" />
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href={`/admin/verifications/${selectedCase.type}/${selectedCase.id}`}
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[#0F1B2D] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#1C2B42] transition shadow-xs"
              >
                <span>Open Full Review Workspace</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="flex gap-2 pt-2 border-t border-[#E5E1D8]">
              <Btn onClick={() => handleApprove(selectedCase)} className="flex-1" icon={CheckCircle2}>
                Quick Approve
              </Btn>
              <Btn
                destructive
                onClick={() => handleReject(selectedCase)}
                className="flex-1"
                icon={XCircle}
              >
                Reject / Request Info
              </Btn>
            </div>
          </div>
        </DetailDrawer>
      )}
    </AdminShell>
  );
}

export { AdminVerificationPage };
