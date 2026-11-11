'use client';

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import Link from 'next/link';
import {
  FileText,
  Clock,
  Archive,
  ShieldCheck,
  Lock as LockIcon,
  AlertCircle,
  Building2,
  Users as UsersIcon,
  AlertTriangle,
  ClipboardList,
  Calendar as CalendarIcon,
  Download,
  Menu,
  RefreshCcw,
  ChevronDown,
  ExternalLink,
  CheckCircle2,
  ShieldAlert,
  ArrowRight,
  BookOpen,
} from 'lucide-react';
import { AdminShell } from '@/components';
import {
  Card,
  Btn,
  StatChip,
  RangeFilter,
  ResponsiveTable,
  DetailDrawer,
  MetricCard,
  toast,
} from '@/components/admin-ui';
import {
  compliancePrimaryTabs,
  complianceMoreTabs,
  rangeFilters,
  summaryStrip,
  postureAreas,
  processingRecords,
  incidents,
  vendors,
  legalHolds,
  consentRecords,
  dpiaAssessments,
  policiesAndTraining,
  reportsAndExports,
  complianceCalendar,
} from './compliance-data';

export default function AdminCompliancePage({ initialTab = 'overview' }) {
  const [refreshing, setRefreshing] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerItem, setDrawerItem] = useState(null);
  const [lastUpdated, setLastUpdated] = useState('--:--:--');
  const [activeTab, setActiveTab] = useState(initialTab);
  const [moreOpen, setMoreOpen] = useState(false);
  const [activeRange, setActiveRange] = useState('30-days');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSavedViews, setShowSavedViews] = useState(false);

  useEffect(() => {
    setLastUpdated(
      new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour12: false })
    );
  }, []);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      setLastUpdated(
        new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour12: false })
      );
      toast('Compliance data refreshed');
    }, 600);
  }, []);

  const handleExport = useCallback(() => {
    toast('Exporting compliance evidence package (Audit ID #EXP-8821)');
  }, []);

  const filteredRecords = useMemo(() => {
    if (!searchQuery) return processingRecords;
    const q = searchQuery.toLowerCase();
    return processingRecords.filter(
      (r) => r.activity.toLowerCase().includes(q) || r.id.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const filteredIncidents = useMemo(() => {
    if (!searchQuery) return incidents;
    const q = searchQuery.toLowerCase();
    return incidents.filter(
      (i) => i.id.toLowerCase().includes(q) || i.type.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const filteredVendors = useMemo(() => {
    if (!searchQuery) return vendors;
    const q = searchQuery.toLowerCase();
    return vendors.filter(
      (v) =>
        v.vendor.toLowerCase().includes(q) ||
        v.service.toLowerCase().includes(q) ||
        v.status.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // Check if active tab belongs to the "More" dropdown
  const activeMoreTab = useMemo(() => {
    return complianceMoreTabs.find((m) => m.key === activeTab);
  }, [activeTab]);

  return (
    <AdminShell active="Compliance" onRefresh={handleRefresh}>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 border-b border-[#E5E1D8] pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#0F1B2D]">Compliance and Reporting</h1>
          <p className="text-xs text-[#4A5568] mt-1 max-w-3xl">
            Data-protection posture, processing records, retention schedules, legal holds, incidents, third-party vendors, and DPDP statutory governance.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Btn
              small
              secondary
              icon={Menu}
              onClick={() => setShowSavedViews(!showSavedViews)}
              title="Saved views"
            >
              Saved views
            </Btn>
            {showSavedViews && (
              <div className="absolute right-0 mt-2 w-64 bg-white border border-[#E5E1D8] rounded-xl shadow-xl p-3 z-30 animate-in fade-in zoom-in-95">
                <p className="text-xs font-semibold text-[#4A5568] mb-2 uppercase tracking-wide">Saved Views</p>
                <div className="space-y-1">
                  <button
                    type="button"
                    className="w-full text-left text-xs px-2.5 py-1.5 rounded-lg hover:bg-[#FAF8F4] text-[#0F1B2D] transition"
                    onClick={() => {
                      setShowSavedViews(false);
                      toast("Loading 'Open obligations by area'");
                    }}
                  >
                    Open obligations by area
                  </button>
                  <button
                    type="button"
                    className="w-full text-left text-xs px-2.5 py-1.5 rounded-lg hover:bg-[#FAF8F4] text-[#0F1B2D] transition"
                    onClick={() => {
                      setShowSavedViews(false);
                      toast("Loading 'Incidents register'");
                    }}
                  >
                    Incidents register
                  </button>
                </div>
              </div>
            )}
          </div>
          <Btn small secondary icon={RefreshCcw} onClick={handleRefresh} title="Refresh">
            Refresh
          </Btn>
          <Btn small secondary icon={Download} onClick={handleExport} title="Export">
            Export
          </Btn>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 border-b border-[#E5E1D8] pb-3">
        <div className="flex flex-wrap items-center gap-3">
          <RangeFilter active={activeRange} onChange={setActiveRange} filters={rangeFilters} />
          <div>
            <label htmlFor="compliance-search-input" className="sr-only">
              Search compliance activities, incidents, vendors
            </label>
            <input
              id="compliance-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search activities, incidents, vendors…"
              className="h-9 rounded-lg border border-[#E5E1D8] bg-white px-3 text-xs w-64 sm:w-72 outline-none focus:border-[#B8955A] shadow-xs"
            />
          </div>
        </div>
        <div className="text-xs text-[#4A5568] flex items-center gap-1.5 self-end sm:self-auto">
          <span>Updated:</span>
          <span className="font-mono font-medium text-[#0F1B2D]">{lastUpdated}</span>
        </div>
      </div>

      {/* KPI Metrics */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        {summaryStrip.map((s, i) => (
          <MetricCard key={i} label={s.label} value={s.value} sub={s.sub} status={s.status} />
        ))}
      </div>

      {/* Main Tab Bar with 'More' dropdown & Side 'Data Requests' Link */}
      <div className="relative flex flex-col gap-2 border-b border-[#E5E1D8] mb-6 min-w-0 pb-2 sm:flex-row sm:items-center sm:gap-3">
        <div className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto py-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" role="tablist">
          {compliancePrimaryTabs.map((t) => {
            const isActive = activeTab === t.key;
            return (
              <button
                key={t.key}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => {
                  setActiveTab(t.key);
                  setMoreOpen(false);
                }}
                className={`whitespace-nowrap px-3.5 py-2 text-xs font-medium border-b-2 transition ${
                  isActive
                    ? 'border-[#B8955A] text-[#0F1B2D] font-semibold'
                    : 'border-transparent text-[#4A5568] hover:text-[#0F1B2D] hover:border-gray-300'
                }`}
              >
                {t.label}
              </button>
            );
          })}

        </div>

        {/* More menu stays outside the scrolling region so it is never clipped. */}
        <div className="relative shrink-0 self-start sm:self-center">
          <button
            type="button"
            onClick={() => setMoreOpen(!moreOpen)}
            aria-expanded={moreOpen}
            className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg border px-3 py-2 text-xs font-semibold transition ${
              activeMoreTab
                ? 'border-[#B8955A] bg-[#F3EBDD] text-[#0F1B2D]'
                : 'border-[#E5E1D8] bg-white text-[#4A5568] hover:border-[#B8955A] hover:text-[#0F1B2D]'
            }`}
          >
            <span>{activeMoreTab ? `More: ${activeMoreTab.label}` : 'More options'}</span>
            <ChevronDown size={14} className={`transition-transform duration-150 ${moreOpen ? 'rotate-180' : ''}`} />
          </button>

          {moreOpen && (
            <div className="absolute right-0 top-full z-40 mt-2 max-h-64 w-[min(18rem,calc(100vw-2rem))] overflow-y-auto rounded-xl border border-[#E5E1D8] bg-white p-1.5 shadow-xl animate-in fade-in zoom-in-95">
              {complianceMoreTabs.map((m) => {
                const isSelected = activeTab === m.key;
                return (
                  <button
                    key={m.key}
                    type="button"
                    onClick={() => {
                      setActiveTab(m.key);
                      setMoreOpen(false);
                    }}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-xs transition ${
                      isSelected
                        ? 'bg-[#FAF8F4] font-semibold text-[#0F1B2D]'
                        : 'text-[#4A5568] hover:bg-[#FAF8F4] hover:text-[#0F1B2D]'
                    }`}
                  >
                    <span>{m.label}</span>
                    {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-[#B8955A]" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Tab Bar Side Option: Data Requests Link */}
        <div className="flex shrink-0 items-center self-start sm:self-center">
          <Link
            href="/admin/data-requests"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E5E1D8] bg-white text-xs font-semibold text-[#0F1B2D] hover:bg-[#FAF8F4] hover:border-[#B8955A] transition shadow-xs whitespace-nowrap group"
            title="Navigate to /admin/data-requests page"
          >
            <span>Data Requests</span>
            <ExternalLink size={13} className="text-[#B8955A] group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Tab Panels */}
      <div>
        {/* =========================================================================
            PRIMARY TAB 1: Overview
           ========================================================================= */}
        {activeTab === 'overview' && (
          <div>
            <div className="mb-4">
              <h2 className="text-sm font-semibold text-[#0F1B2D]">Compliance Posture Board</h2>
              <p className="text-xs text-[#4A5568]">Each area displays real-time status, designated owner, next audit deadline, and evidentiary links.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {postureAreas.map((a) => (
                <Card key={a.id} title={a.area} padded>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-[#4A5568] uppercase tracking-wide">Status</span>
                      <StatChip status={a.status} />
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs text-[#4A5568]">
                      <div>
                        <span className="block text-[11px] text-[#A0A7B4]">Owner</span>
                        <span className="font-medium text-[#0F1B2D] truncate block">{a.owner}</span>
                      </div>
                      <div>
                        <span className="block text-[11px] text-[#A0A7B4]">Next deadline</span>
                        <span className="font-medium text-[#0F1B2D] truncate block">{a.nextDeadline}</span>
                      </div>
                      <div>
                        <span className="block text-[11px] text-[#A0A7B4]">Last review</span>
                        <span className="font-medium text-[#0F1B2D] block">{a.lastReview}</span>
                      </div>
                      <div>
                        <span className="block text-[11px] text-[#A0A7B4]">Evidence</span>
                        <span className="font-medium text-[#0F1B2D] truncate block" title={a.evidence}>
                          {a.evidence}
                        </span>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-[#E5E1D8] flex items-center justify-between gap-2">
                      <Btn
                        small
                        secondary
                        onClick={() => {
                          setDrawerItem(a);
                          setDrawerOpen(true);
                        }}
                        title={`Inspect evidence drawer for ${a.area}`}
                        className="flex-1"
                      >
                        Inspect Evidence
                      </Btn>
                      <Link
                        href={`/admin/compliance/${a.id}`}
                        className="px-2.5 py-1.5 rounded-lg border border-[#E5E1D8] bg-white hover:bg-[#FAF8F4] text-[#0F1B2D] text-xs font-medium inline-flex items-center gap-1 transition"
                        title={`Open dedicated page for ${a.area}`}
                      >
                        <span>Full Page</span>
                        <ArrowRight size={11} className="text-[#B8955A]" />
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            PRIMARY TAB 2: Processing records
           ========================================================================= */}
        {activeTab === 'processing-records' && (
          <div>
            <div className="mb-4">
              <h2 className="text-sm font-semibold text-[#0F1B2D]">Records of Processing Activities (RoPA)</h2>
              <p className="text-xs text-[#4A5568]">Inventory of personal data processing activities with legal basis, retention periods, and jurisdictions.</p>
            </div>
            <Card title="Processing Activities Register" titleIcon={FileText} padded={false}>
              <ResponsiveTable>
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-[#E5E1D8] bg-[#FAF8F4]/80">
                      {['ID', 'Activity', 'Purpose', 'Legal basis', 'Data subjects', 'Recipients', 'Retention', 'Region', 'Status'].map((h) => (
                        <th key={h} className="p-3 text-xs font-semibold text-[#4A5568] whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRecords.map((r) => (
                      <tr key={r.id} className="border-b border-[#E5E1D8]/60 last:border-0 hover:bg-[#FAF8F4] transition">
                        <td className="p-3 font-mono font-medium text-[#0F1B2D] whitespace-nowrap">{r.id}</td>
                        <td className="p-3 text-[#0F1B2D] whitespace-nowrap">{r.activity}</td>
                        <td className="p-3 text-[#4A5568] whitespace-nowrap">{r.purpose}</td>
                        <td className="p-3 text-[#4A5568] whitespace-nowrap">{r.legalBasis}</td>
                        <td className="p-3 text-[#4A5568] whitespace-nowrap">{r.subjects}</td>
                        <td className="p-3 text-[#4A5568] whitespace-nowrap">{r.recipients}</td>
                        <td className="p-3 text-[#4A5568] whitespace-nowrap">{r.retention}</td>
                        <td className="p-3 text-[#4A5568] whitespace-nowrap">{r.region}</td>
                        <td className="p-3 whitespace-nowrap"><StatChip status={r.status} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </ResponsiveTable>
            </Card>
          </div>
        )}

        {/* =========================================================================
            PRIMARY TAB 3: Retention & deletion
           ========================================================================= */}
        {activeTab === 'retention-and-deletion' && (
          <div>
            <div className="mb-4">
              <h2 className="text-sm font-semibold text-[#0F1B2D]">Retention Schedules & Automated Deletions</h2>
              <p className="text-xs text-[#4A5568]">Automated purging jobs, immutable backup expiry, and deletion sampling verification.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Card title="Scheduled Jobs" titleIcon={Clock}>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between border-b border-[#E5E1D8] pb-2">
                    <span className="text-[#4A5568]">Weekly retention sweep</span>
                    <span className="font-medium text-[#0F1B2D]">Today, 02:00 IST</span>
                  </div>
                  <div className="flex justify-between border-b border-[#E5E1D8] pb-2">
                    <span className="text-[#4A5568]">Anonymization batch</span>
                    <span className="font-medium text-[#0F1B2D]">Yesterday, 02:00 IST</span>
                  </div>
                  <div className="flex justify-between pb-1">
                    <span className="text-[#4A5568]">Backup overwrite</span>
                    <span className="font-medium text-emerald-700">On schedule</span>
                  </div>
                </div>
              </Card>
              <Card title="Backups" titleIcon={Archive}>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between border-b border-[#E5E1D8] pb-2">
                    <span className="text-[#4A5568]">Overwrite status</span>
                    <span className="font-medium text-[#0F1B2D]">Current</span>
                  </div>
                  <div className="flex justify-between border-b border-[#E5E1D8] pb-2">
                    <span className="text-[#4A5568]">Retention expiry</span>
                    <span className="font-medium text-[#0F1B2D]">30 days</span>
                  </div>
                  <div className="flex justify-between pb-1">
                    <span className="text-[#4A5568]">Deletion audit statement</span>
                    <span className="font-medium text-emerald-700">Verified</span>
                  </div>
                </div>
              </Card>
              <Card title="Verification Sampling" titleIcon={ShieldCheck}>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between border-b border-[#E5E1D8] pb-2">
                    <span className="text-[#4A5568]">Identifiers searched</span>
                    <span className="font-medium text-[#0F1B2D]">0 found (Clean)</span>
                  </div>
                  <div className="flex justify-between border-b border-[#E5E1D8] pb-2">
                    <span className="text-[#4A5568]">Last sampled</span>
                    <span className="font-medium text-[#0F1B2D]">1 Nov 2026</span>
                  </div>
                  <div className="flex justify-between pb-1">
                    <span className="text-[#4A5568]">Result</span>
                    <span className="font-medium text-emerald-700">All data purged</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* =========================================================================
            PRIMARY TAB 4: Incidents & breaches
           ========================================================================= */}
        {activeTab === 'incidents-and-breaches' && (
          <div>
            <div className="mb-4">
              <h2 className="text-sm font-semibold text-[#0F1B2D]">Incidents & Breaches Log</h2>
              <p className="text-xs text-[#4A5568]">Incident management log with statutory breach notification clocks.</p>
            </div>
            <Card title="Incident Register" titleIcon={AlertCircle} padded={false}>
              <ResponsiveTable>
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-[#E5E1D8] bg-[#FAF8F4]/80">
                      {['ID', 'Type', 'Severity', 'Aware at', 'Status', 'Subjects (est.)', 'Clock'].map((h) => (
                        <th key={h} className="p-3 text-xs font-semibold text-[#4A5568] whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredIncidents.map((i) => (
                      <tr key={i.id} className="border-b border-[#E5E1D8]/60 last:border-0 hover:bg-[#FAF8F4] transition">
                        <td className="p-3 font-mono font-medium text-[#0F1B2D] whitespace-nowrap">{i.id}</td>
                        <td className="p-3 text-[#0F1B2D] whitespace-nowrap">{i.type.replace(/_/g, ' ')}</td>
                        <td className="p-3 whitespace-nowrap"><StatChip status={i.severity} /></td>
                        <td className="p-3 text-[#4A5568] whitespace-nowrap">
                          {new Date(i.awareAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
                        </td>
                        <td className="p-3 text-[#4A5568] whitespace-nowrap">{i.status}</td>
                        <td className="p-3 text-[#4A5568] whitespace-nowrap">{i.subjects}</td>
                        <td className="p-3 font-medium text-[#B42318] whitespace-nowrap">{i.clock}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </ResponsiveTable>
            </Card>
          </div>
        )}

        {/* =========================================================================
            PRIMARY TAB 5: Legal holds
           ========================================================================= */}
        {activeTab === 'legal-holds' && (
          <div>
            <div className="mb-4">
              <h2 className="text-sm font-semibold text-[#0F1B2D]">Legal Holds Registry</h2>
              <p className="text-xs text-[#4A5568]">Active legal preservation holds suspending automatic deletion and anonymization.</p>
            </div>
            <Card title="Active Legal Holds" titleIcon={LockIcon} padded={false}>
              <ResponsiveTable>
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-[#E5E1D8] bg-[#FAF8F4]/80">
                      {['Hold ID', 'Scope', 'Reason', 'Requested by', 'Placed by', 'Date', 'Status'].map((h) => (
                        <th key={h} className="p-3 text-xs font-semibold text-[#4A5568] whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {legalHolds.map((h) => (
                      <tr key={h.id} className="border-b border-[#E5E1D8]/60 last:border-0 hover:bg-[#FAF8F4] transition">
                        <td className="p-3 font-mono font-medium text-[#0F1B2D] whitespace-nowrap">{h.id}</td>
                        <td className="p-3 text-[#0F1B2D] whitespace-nowrap">{h.scope}</td>
                        <td className="p-3 text-[#4A5568] whitespace-nowrap">{h.reason}</td>
                        <td className="p-3 text-[#4A5568] whitespace-nowrap">{h.requestedBy}</td>
                        <td className="p-3 text-[#4A5568] whitespace-nowrap">{h.placedBy}</td>
                        <td className="p-3 text-[#4A5568] whitespace-nowrap">{h.date}</td>
                        <td className="p-3 whitespace-nowrap"><StatChip status="live" count={1} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </ResponsiveTable>
              <div className="p-3 bg-[#FAF8F4]/60 border-t border-[#E5E1D8]">
                <Btn secondary onClick={() => toast('Opening place-hold workflow')} title="Place legal hold">
                  Place new legal hold
                </Btn>
              </div>
            </Card>
          </div>
        )}

        {/* =========================================================================
            PRIMARY TAB 6: Vendors & transfers
           ========================================================================= */}
        {activeTab === 'vendors-and-transfers' && (
          <div>
            <div className="mb-4">
              <h2 className="text-sm font-semibold text-[#0F1B2D]">Third-Party Vendors & Data Transfers</h2>
              <p className="text-xs text-[#4A5568]">Sub-processor inventory, cross-border transfer agreements, and risk tiers.</p>
            </div>
            <Card title="Vendor Register" titleIcon={Building2} padded={false}>
              <ResponsiveTable>
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-[#E5E1D8] bg-[#FAF8F4]/80">
                      {['ID', 'Vendor', 'Service', 'Region', 'Terms', 'Risk Tier', 'Status'].map((h) => (
                        <th key={h} className="p-3 text-xs font-semibold text-[#4A5568] whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredVendors.map((v) => (
                      <tr key={v.id} className="border-b border-[#E5E1D8]/60 last:border-0 hover:bg-[#FAF8F4] transition">
                        <td className="p-3 font-mono font-medium text-[#0F1B2D] whitespace-nowrap">{v.id}</td>
                        <td className="p-3 font-medium text-[#0F1B2D] whitespace-nowrap">{v.vendor}</td>
                        <td className="p-3 text-[#4A5568] whitespace-nowrap">{v.service}</td>
                        <td className="p-3 text-[#4A5568] whitespace-nowrap">{v.region}</td>
                        <td className="p-3 text-[#4A5568] whitespace-nowrap">{v.terms}</td>
                        <td className="p-3 whitespace-nowrap"><StatChip status={v.riskTier === 'High' ? 'critical' : 'medium'} /></td>
                        <td className="p-3 whitespace-nowrap"><StatChip status={v.status} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </ResponsiveTable>
            </Card>
          </div>
        )}

        {/* =========================================================================
            MORE SUB-TAB 1: Consent & notices
           ========================================================================= */}
        {activeTab === 'consent-and-notices' && (
          <div>
            <div className="mb-4">
              <h2 className="text-sm font-semibold text-[#0F1B2D]">Consent Records & Statutory Notices</h2>
              <p className="text-xs text-[#4A5568]">Audited consent artifacts, multilingual notice acceptance telemetry, and withdrawal logs under DPDP rules.</p>
            </div>
            <Card title="Active Consent Notices" titleIcon={CheckCircle2} padded={false}>
              <ResponsiveTable>
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-[#E5E1D8] bg-[#FAF8F4]/80">
                      {['Notice ID', 'Policy / Consent Title', 'Active Version', 'Languages', 'Opt-in Rate', 'Status', 'Last Audit Date', 'Action'].map((h) => (
                        <th key={h} className="p-3 text-xs font-semibold text-[#4A5568] whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {consentRecords.map((c) => (
                      <tr key={c.id} className="border-b border-[#E5E1D8]/60 last:border-0 hover:bg-[#FAF8F4] transition">
                        <td className="p-3 font-mono font-medium text-[#0F1B2D] whitespace-nowrap">{c.id}</td>
                        <td className="p-3 font-medium text-[#0F1B2D] whitespace-nowrap">{c.title}</td>
                        <td className="p-3 font-mono text-[11px] text-[#4A5568] whitespace-nowrap">{c.version}</td>
                        <td className="p-3 text-[#4A5568] whitespace-nowrap">{c.language}</td>
                        <td className="p-3 font-mono font-bold text-emerald-800 whitespace-nowrap">{c.optInRate}</td>
                        <td className="p-3 whitespace-nowrap"><StatChip status={c.status} /></td>
                        <td className="p-3 text-[#718096] whitespace-nowrap">{c.lastAudited}</td>
                        <td className="p-3 whitespace-nowrap">
                          <button
                            type="button"
                            onClick={() => toast(`Viewing consent audit certificate for ${c.id}`)}
                            className="text-xs font-medium text-[#B8955A] hover:underline"
                          >
                            Certificate
                          </button>
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
            MORE SUB-TAB 2: Risk & DPIAs
           ========================================================================= */}
        {activeTab === 'risk-and-dpias' && (
          <div>
            <div className="mb-4">
              <h2 className="text-sm font-semibold text-[#0F1B2D]">Data Protection Impact Assessments (DPIA)</h2>
              <p className="text-xs text-[#4A5568]">Formal assessments evaluating privacy risks for high-impact platform algorithms and automated profiling.</p>
            </div>
            <Card title="DPIA Register" titleIcon={ShieldAlert} padded={false}>
              <ResponsiveTable>
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-[#E5E1D8] bg-[#FAF8F4]/80">
                      {['DPIA ID', 'System / Feature Evaluated', 'Inherent Risk', 'Residual Risk', 'Reviewing Officer', 'Status', 'Next Audit'].map((h) => (
                        <th key={h} className="p-3 text-xs font-semibold text-[#4A5568] whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {dpiaAssessments.map((d) => (
                      <tr key={d.id} className="border-b border-[#E5E1D8]/60 last:border-0 hover:bg-[#FAF8F4] transition">
                        <td className="p-3 font-mono font-medium text-[#0F1B2D] whitespace-nowrap">{d.id}</td>
                        <td className="p-3 font-medium text-[#0F1B2D] whitespace-nowrap">{d.systemName}</td>
                        <td className="p-3 whitespace-nowrap">
                          <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                            d.riskLevel === 'Critical' ? 'bg-rose-100 text-rose-800' :
                            d.riskLevel === 'High' ? 'bg-amber-100 text-amber-800' :
                            'bg-slate-100 text-slate-700'
                          }`}>
                            {d.riskLevel}
                          </span>
                        </td>
                        <td className="p-3 whitespace-nowrap">
                          <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-100 text-emerald-800">
                            {d.residualRisk}
                          </span>
                        </td>
                        <td className="p-3 text-[#4A5568] whitespace-nowrap">{d.reviewer}</td>
                        <td className="p-3 whitespace-nowrap"><StatChip status={d.status === 'Approved' ? 'resolved' : 'medium'} /></td>
                        <td className="p-3 text-[#718096] whitespace-nowrap">{d.nextReview}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </ResponsiveTable>
            </Card>
          </div>
        )}

        {/* =========================================================================
            MORE SUB-TAB 3: Policies & training
           ========================================================================= */}
        {activeTab === 'policies-and-training' && (
          <div>
            <div className="mb-4">
              <h2 className="text-sm font-semibold text-[#0F1B2D]">Corporate Compliance Policies & Employee Training</h2>
              <p className="text-xs text-[#4A5568]">Mandatory staff certifications, security runbooks, and internal operational standards.</p>
            </div>
            <Card title="Policy Certification Registry" titleIcon={BookOpen} padded={false}>
              <ResponsiveTable>
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-[#E5E1D8] bg-[#FAF8F4]/80">
                      {['Policy ID', 'Statutory Policy Title', 'Staff Scope', 'Completion Rate', 'Status', 'Renewal Cadence', 'Action'].map((h) => (
                        <th key={h} className="p-3 text-xs font-semibold text-[#4A5568] whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {policiesAndTraining.map((p) => (
                      <tr key={p.id} className="border-b border-[#E5E1D8]/60 last:border-0 hover:bg-[#FAF8F4] transition">
                        <td className="p-3 font-mono font-medium text-[#0F1B2D] whitespace-nowrap">{p.id}</td>
                        <td className="p-3 font-medium text-[#0F1B2D] whitespace-nowrap">{p.title}</td>
                        <td className="p-3 text-[#4A5568] whitespace-nowrap">{p.scope}</td>
                        <td className="p-3 whitespace-nowrap">
                          <span className="font-mono font-bold text-xs text-emerald-800">{p.completion}</span>
                        </td>
                        <td className="p-3 whitespace-nowrap"><StatChip status="resolved" /></td>
                        <td className="p-3 text-[#718096] whitespace-nowrap">{p.renewDate}</td>
                        <td className="p-3 whitespace-nowrap">
                          <button
                            type="button"
                            onClick={() => toast(`Downloading ${p.title} PDF`)}
                            className="text-xs font-medium text-[#B8955A] hover:underline"
                          >
                            Download PDF
                          </button>
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
            MORE SUB-TAB 4: Reports & exports
           ========================================================================= */}
        {activeTab === 'reports-and-exports' && (
          <div>
            <div className="mb-4">
              <h2 className="text-sm font-semibold text-[#0F1B2D]">Statutory Reports & Evidence Bundles</h2>
              <p className="text-xs text-[#4A5568]">Cryptographically signed audit packages for regulators, external auditors, and SOC 2 certifiers.</p>
            </div>
            <Card title="Evidence Export Ledger" titleIcon={Download} padded={false}>
              <ResponsiveTable>
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-[#E5E1D8] bg-[#FAF8F4]/80">
                      {['Export ID', 'Package Title', 'Audit Period', 'Generated Timestamp', 'Package Format', 'Status', 'Download'].map((h) => (
                        <th key={h} className="p-3 text-xs font-semibold text-[#4A5568] whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {reportsAndExports.map((rep) => (
                      <tr key={rep.id} className="border-b border-[#E5E1D8]/60 last:border-0 hover:bg-[#FAF8F4] transition">
                        <td className="p-3 font-mono font-medium text-[#0F1B2D] whitespace-nowrap">{rep.id}</td>
                        <td className="p-3 font-medium text-[#0F1B2D] whitespace-nowrap">{rep.title}</td>
                        <td className="p-3 text-[#4A5568] whitespace-nowrap">{rep.period}</td>
                        <td className="p-3 text-[#718096] whitespace-nowrap">{rep.generatedAt}</td>
                        <td className="p-3 font-mono text-[11px] text-[#4A5568] whitespace-nowrap">{rep.format}</td>
                        <td className="p-3 whitespace-nowrap"><StatChip status={rep.status === 'Ready' ? 'resolved' : 'medium'} /></td>
                        <td className="p-3 whitespace-nowrap">
                          <Btn
                            small
                            secondary
                            icon={Download}
                            onClick={() => toast(`Downloading package ${rep.id}`)}
                          >
                            Export
                          </Btn>
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
            MORE SUB-TAB 5: Calendar
           ========================================================================= */}
        {activeTab === 'calendar' && (
          <div>
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-sm font-semibold text-[#0F1B2D]">Compliance Milestones & Statutory Deadlines</h2>
                <p className="mt-1 text-xs text-[#4A5568]">Track upcoming filings, audits, reviews, and control milestones from one place.</p>
              </div>
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[#FDF3E0] px-2.5 py-1 text-[10px] font-semibold text-[#9A6210]">
                <Clock size={12} />
                {complianceCalendar.length} upcoming milestones
              </span>
            </div>

            <div className="mb-5 grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-[#E5E1D8] bg-white p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#6B7280]">Next deadline</span>
                  <CalendarIcon size={16} className="text-[#B8955A]" />
                </div>
                <p className="font-mono text-lg font-bold text-[#0F1B2D]">{complianceCalendar[0]?.date || '—'}</p>
                <p className="mt-1 truncate text-xs text-[#4A5568]">{complianceCalendar[0]?.title || 'No upcoming deadline'}</p>
              </div>
              <div className="rounded-xl border border-rose-200 bg-rose-50/50 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-rose-700">Priority review</span>
                  <AlertCircle size={16} className="text-rose-600" />
                </div>
                <p className="text-lg font-bold text-rose-800">1 item</p>
                <p className="mt-1 text-xs text-rose-700">Requires owner confirmation</p>
              </div>
              <div className="rounded-xl border border-[#E5E1D8] bg-[#FAF8F4] p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#6B7280]">Coverage</span>
                  <CheckCircle2 size={16} className="text-[#2E7D5B]" />
                </div>
                <p className="text-lg font-bold text-[#0F1B2D]">100%</p>
                <p className="mt-1 text-xs text-[#4A5568]">Milestones have assigned owners</p>
              </div>
            </div>

            <Card title="Upcoming schedule" titleIcon={CalendarIcon} padded={false}>
              <div className="divide-y divide-[#E5E1D8]">
                {complianceCalendar.map((item, idx) => (
                  <div key={idx} className="group flex flex-col gap-4 p-4 transition hover:bg-[#FAF8F4] sm:flex-row sm:items-center">
                    <div className="flex shrink-0 items-center gap-3 sm:w-36">
                      <div className={`grid h-11 w-11 place-items-center rounded-xl ${
                        idx === 0 ? 'bg-[#FDF3E0] text-[#9A6210]' : 'bg-[#E8F0F8] text-[#2F5D8A]'
                      }`}>
                        <CalendarIcon size={19} />
                      </div>
                      <div>
                        <p className="font-mono text-xs font-bold text-[#0F1B2D]">{item.date}</p>
                        <p className="mt-0.5 text-[10px] text-[#6B7280]">{idx === 0 ? 'Next up' : `Milestone ${idx + 1}`}</p>
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-xs font-semibold text-[#0F1B2D]">{item.title}</h3>
                        <span className="rounded-full bg-[#F3F4F6] px-2 py-0.5 text-[10px] text-[#4A5568]">{item.type}</span>
                      </div>
                      <p className="mt-1 text-xs text-[#6B7280]">Responsible owner: <span className="font-medium text-[#4A5568]">{item.owner}</span></p>
                    </div>
                    <div className="flex items-center justify-between gap-3 sm:justify-end">
                      <StatChip status={item.status === 'Upcoming' ? 'critical' : 'pending'} />
                      <button
                        type="button"
                        onClick={() => toast(`Opening schedule briefing for ${item.title}`)}
                        className="whitespace-nowrap text-xs font-semibold text-[#B8955A] transition hover:text-[#806236] hover:underline"
                      >
                        Schedule briefing
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* Evidentiary Footer Note */}
      <div className="mt-8 text-xs text-[#4A5568] text-center sm:text-left border-t border-[#E5E1D8] pt-4">
        Evidence, not assertions — every compliance statement links directly to underlying immutable audit logs. The server enforces role-based access; compliance evidence records are non-repudiable.
      </div>

      {/* Inspection Drawer */}
      {drawerOpen && drawerItem && (
        <DetailDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          title={`Evidence Inspection: ${drawerItem.area || drawerItem.title}`}
        >
          <div className="space-y-4 text-xs">
            {/* Top Workspace Link Banner */}
            <div className="flex items-center justify-between p-3 rounded-xl border border-[#B8955A]/40 bg-[#FAF8F4]">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#B8955A] block">
                  Dedicated Compliance Dossier
                </span>
                <span className="font-mono text-xs font-semibold text-[#0F1B2D]">
                  /admin/compliance/{drawerItem.id || 'record'}
                </span>
              </div>
              <Link
                href={`/admin/compliance/${drawerItem.id || encodeURIComponent(drawerItem.area || drawerItem.title)}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0F1B2D] text-white hover:bg-[#1A2B42] text-xs font-medium transition shadow-xs group"
                title={`Open dedicated compliance dossier for ${drawerItem.area || drawerItem.title}`}
              >
                <span>Open Full Page</span>
                <ExternalLink size={12} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            {/* Scope Overview Card */}
            <div className="rounded-xl border border-[#E5E1D8] bg-[#FAF8F4] p-3.5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm text-[#0F1B2D]">{drawerItem.area || drawerItem.title}</span>
                {drawerItem.status && <StatChip status={drawerItem.status} />}
              </div>
              <div className="text-[11px] text-[#4A5568]">
                Accountability: <strong>{drawerItem.owner || 'Compliance Quorum'}</strong> • Audit Deadline: <strong>{drawerItem.nextDeadline || 'Weekly'}</strong>
              </div>
            </div>

            {/* Evidence Statement */}
            <div>
              <span className="text-[#A0A7B4] block text-[11px] mb-1 font-semibold uppercase tracking-wider">
                Evidentiary Statement & Scope
              </span>
              <div className="p-3 rounded-lg border border-[#E5E1D8] bg-white text-[#4A5568] leading-relaxed">
                {drawerItem.evidence || drawerItem.body}
              </div>
            </div>

            {/* Cryptographic Proof */}
            <div className="rounded-lg bg-[#FAF8F4] border border-[#E5E1D8] p-3 font-mono text-[11px] text-[#0F1B2D] space-y-1">
              <div>Record Hash: <span className="font-bold text-[#B8955A]">0x9f4a...81c2</span></div>
              <div className="text-[#4A5568]">Attested at: {new Date().toISOString()}</div>
              <div className="text-emerald-700 font-semibold">Verification: Certified Non-Repudiable</div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <Link
                href={`/admin/compliance/${drawerItem.id || encodeURIComponent(drawerItem.area || drawerItem.title)}`}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-[#0F1B2D] text-white hover:bg-[#1A2B42] text-xs font-semibold transition text-center shadow-xs"
              >
                <span>Navigate to Full Dossier Page →</span>
              </Link>
              <Btn onClick={() => setDrawerOpen(false)} secondary className="sm:w-24">
                Close
              </Btn>
            </div>
          </div>
        </DetailDrawer>
      )}
    </AdminShell>
  );
}

export { AdminCompliancePage };
