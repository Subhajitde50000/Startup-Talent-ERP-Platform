'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Download,
  ExternalLink,
  Search,
  FileText,
  CheckCircle2,
  ShieldCheck,
  Scale,
  Banknote,
  Brain,
  Monitor,
  ChevronRight,
  Filter,
  ArrowUpRight,
  Layers,
  HelpCircle,
  Activity,
  Sparkles,
  RefreshCcw,
  Eye,
  Sliders,
  Copy,
  Check,
} from 'lucide-react';
import { AdminShell } from '@/components';
import {
  Card,
  Btn,
  DetailDrawer,
  toast,
} from '@/components/admin-ui';
import {
  MANUAL_METADATA,
  MANUAL_MODULES,
  MANUAL_WORKFLOWS,
  MANUAL_GLOSSARY,
} from './manual-data';

export default function AdminManualPage() {
  const [activeTab, setActiveTab] = useState('catalog');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedModule, setSelectedModule] = useState('all');
  const [selectedPage, setSelectedPage] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Flatten all pages for quick search and count
  const allPages = useMemo(() => {
    return MANUAL_MODULES.flatMap((m) =>
      m.pages.map((p) => ({
        ...p,
        moduleId: m.id,
        moduleNumber: m.number,
        moduleName: m.name,
      }))
    );
  }, []);

  // Filtered pages based on search and module
  const filteredPages = useMemo(() => {
    return allPages.filter((p) => {
      const matchesModule =
        selectedModule === 'all' || p.moduleId === selectedModule;
      if (!matchesModule) return false;
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchUrl = p.url.toLowerCase().includes(q);
      const matchPurpose = p.purpose.toLowerCase().includes(q);
      const matchModule = p.moduleName.toLowerCase().includes(q);
      const matchTasks = p.used_for.some((t) => t.toLowerCase().includes(q));
      const matchActions = p.actions.some(
        (a) =>
          a.control.toLowerCase().includes(q) ||
          a.description.toLowerCase().includes(q)
      );

      return matchName || matchUrl || matchPurpose || matchModule || matchTasks || matchActions;
    });
  }, [allPages, selectedModule, searchQuery]);

  // Handle open page detail drawer
  const handleOpenPageDossier = (page) => {
    setSelectedPage(page);
    setDrawerOpen(true);
  };

  // Copy link
  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard?.writeText(window.location.href);
      setCopied(true);
      toast('Manual link copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <AdminShell active="Admin User Manual">
      {/* Hero Banner with Forma Luxury Styling */}
      <div className="relative overflow-hidden rounded-2xl bg-[#0F1B2D] text-[#FAF8F4] p-6 sm:p-8 mb-6 border border-[#B8955A]/40 shadow-xl">
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[#B8955A]/10 blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#B8955A]/20 px-3 py-1 text-xs font-semibold text-[#D4AF37] border border-[#B8955A]/40">
                <Sparkles size={13} className="text-[#B8955A]" />
                {MANUAL_METADATA.version} Enterprise Release
              </span>
              <span className="hidden sm:inline-block rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-mono text-[#CBD5E1]">
                {MANUAL_METADATA.classification}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopyLink}
                className="flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-xs font-medium text-white hover:bg-white/10 transition"
              >
                {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                <span className="hidden md:inline">Share</span>
              </button>

              <a
                href={MANUAL_METADATA.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-xl border border-[#B8955A]/50 bg-[#B8955A]/20 px-3.5 py-2 text-xs font-semibold text-[#D4AF37] hover:bg-[#B8955A]/30 transition"
              >
                <Eye size={14} />
                <span>View PDF</span>
              </a>

              <a
                href={MANUAL_METADATA.pdfUrl}
                download="ADMIN_USER_MANUAL.pdf"
                className="flex items-center gap-1.5 rounded-xl bg-[#B8955A] px-4 py-2 text-xs font-bold text-[#0F1B2D] shadow-md hover:bg-[#D4AF37] transition"
              >
                <Download size={14} />
                <span>Download PDF ({MANUAL_METADATA.pdfSize})</span>
              </a>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
            {MANUAL_METADATA.title}
          </h1>
          <p className="text-xs sm:text-sm text-[#CBD5E1] mt-2 max-w-3xl leading-relaxed">
            The definitive technical manual and operational guide for the Startup & Talent ERP Platform. Documents every accessible route, user interface control, compliance policy, and standard operating procedure across all 11 enterprise functional modules.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-white/10">
            <div>
              <span className="text-[10px] text-[#94A3B8] uppercase tracking-wider block font-semibold">Total Verified Routes</span>
              <span className="text-xl sm:text-2xl font-bold font-serif text-white">49 Routes</span>
              <span className="text-[10px] text-emerald-400 block mt-0.5 font-medium">100% Active (HTTP 200)</span>
            </div>
            <div>
              <span className="text-[10px] text-[#94A3B8] uppercase tracking-wider block font-semibold">Functional Modules</span>
              <span className="text-xl sm:text-2xl font-bold font-serif text-white">11 Modules</span>
              <span className="text-[10px] text-[#D4AF37] block mt-0.5 font-medium">Forma Design Tokens</span>
            </div>
            <div>
              <span className="text-[10px] text-[#94A3B8] uppercase tracking-wider block font-semibold">SOP Workflows</span>
              <span className="text-xl sm:text-2xl font-bold font-serif text-white">7 SOPs</span>
              <span className="text-[10px] text-sky-400 block mt-0.5 font-medium">End-to-End Execution</span>
            </div>
            <div>
              <span className="text-[10px] text-[#94A3B8] uppercase tracking-wider block font-semibold">Compliance Baseline</span>
              <span className="text-xl sm:text-2xl font-bold font-serif text-white">DPDP Act</span>
              <span className="text-[10px] text-amber-300 block mt-0.5 font-medium">RBI Escrow & TDS Sec 194J</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Tab Navigation */}
      <div className="flex border-b border-[#E5E1D8] mb-6 overflow-x-auto gap-2 no-scrollbar">
        {[
          { key: 'catalog', label: 'Browse Pages & Screenshots', icon: Layers, count: allPages.length },
          { key: 'inventory', label: 'Master Route Inventory', icon: FileText, count: 49 },
          { key: 'workflows', label: 'Standard SOP Workflows', icon: Activity, count: 7 },
          { key: 'compliance', label: 'Compliance & Legal Frameworks', icon: ShieldCheck },
          { key: 'glossary', label: 'Platform Glossary & Terms', icon: HelpCircle, count: MANUAL_GLOSSARY.length },
          { key: 'pdf-reader', label: 'Embedded PDF Reader', icon: BookOpen },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-3 text-xs font-semibold whitespace-nowrap border-b-2 transition ${
                isActive
                  ? 'border-[#B8955A] text-[#0F1B2D] bg-[#FAF8F4]/80'
                  : 'border-transparent text-[#64748B] hover:text-[#0F1B2D] hover:border-gray-300'
              }`}
            >
              <Icon size={15} className={isActive ? 'text-[#B8955A]' : 'text-[#94A3B8]'} />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span
                  className={`px-1.5 py-0.5 text-[10px] rounded-full font-mono ${
                    isActive ? 'bg-[#0F1B2D] text-[#FAF8F4]' : 'bg-[#E2E8F0] text-[#64748B]'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB 1: BROWSE PAGES & SCREENSHOTS */}
      {activeTab === 'catalog' && (
        <div className="space-y-6">
          {/* Search & Module Filters */}
          <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between bg-white p-3.5 rounded-xl border border-[#E5E1D8] shadow-xs">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 text-[#94A3B8]" size={16} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search across 49 pages, URLs, buttons, or tasks (e.g. 'verification', 'payout', 'escrow')..."
                className="w-full h-9 pl-9 pr-8 rounded-lg border border-[#E5E1D8] bg-[#FAF8F4]/50 text-xs text-[#0F1B2D] placeholder-[#94A3B8] outline-none focus:border-[#B8955A] focus:bg-white transition"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-2 text-[#94A3B8] hover:text-[#0F1B2D] text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              <span className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider flex items-center gap-1">
                <Filter size={12} /> Filter:
              </span>
              <select
                value={selectedModule}
                onChange={(e) => setSelectedModule(e.target.value)}
                aria-label="Filter pages by functional module"
                className="h-9 px-3 rounded-lg border border-[#E5E1D8] bg-white text-xs text-[#0F1B2D] font-medium outline-none focus:border-[#B8955A]"
              >
                <option value="all">All Modules (11 Modules / 49 Pages)</option>
                {MANUAL_MODULES.map((m) => (
                  <option key={m.id} value={m.id}>
                    Module {m.number}: {m.name} ({m.pages.length})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Result Count and Reset */}
          <div className="flex items-center justify-between text-xs text-[#64748B]">
            <span>
              Showing <strong>{filteredPages.length}</strong> of <strong>{allPages.length}</strong> administrative pages
              {selectedModule !== 'all' && ` in Module ${MANUAL_MODULES.find((m) => m.id === selectedModule)?.number}`}
            </span>
            {(searchQuery || selectedModule !== 'all') && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedModule('all');
                }}
                className="text-[#B8955A] font-medium hover:underline flex items-center gap-1"
              >
                <RefreshCcw size={12} /> Reset Filters
              </button>
            )}
          </div>

          {/* Cards Grid */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPages.map((page) => (
              <div
                key={page.num}
                className="group flex flex-col justify-between rounded-xl border border-[#E5E1D8] bg-white shadow-xs hover:border-[#B8955A] hover:shadow-md transition overflow-hidden"
              >
                {/* Screenshot Header */}
                <div
                  onClick={() => handleOpenPageDossier(page)}
                  className="relative aspect-video bg-[#0F1B2D]/5 cursor-pointer overflow-hidden border-b border-[#E5E1D8]"
                >
                  <img
                    src={`/docs/screenshots/${page.screenshot}`}
                    alt={page.name}
                    className="h-full w-full object-cover object-top transition duration-300 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition rounded-lg bg-[#0F1B2D]/90 text-white px-3 py-1.5 text-xs font-semibold flex items-center gap-1.5 shadow-lg">
                      <Eye size={13} /> View Dossier
                    </span>
                  </div>
                  <span className="absolute top-2 left-2 rounded bg-[#0F1B2D]/85 backdrop-blur text-[10px] font-mono text-[#FAF8F4] px-2 py-0.5 border border-white/10">
                    #{page.num}
                  </span>
                  <span className="absolute top-2 right-2 rounded-full bg-emerald-500/90 text-white px-2 py-0.5 text-[9px] font-semibold flex items-center gap-1">
                    <CheckCircle2 size={10} /> HTTP 200
                  </span>
                </div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-[10px] font-medium text-[#B8955A] mb-1">
                      <span>Module {page.moduleNumber}:</span>
                      <span className="truncate">{page.moduleName}</span>
                    </div>

                    <h3
                      onClick={() => handleOpenPageDossier(page)}
                      className="text-sm font-semibold text-[#0F1B2D] group-hover:text-[#B8955A] transition cursor-pointer line-clamp-1"
                      title={page.name}
                    >
                      {page.name}
                    </h3>

                    <div className="mt-1 font-mono text-[11px] text-[#0284C7] truncate" title={page.url}>
                      {page.url}
                    </div>

                    <p className="text-xs text-[#64748B] mt-2 line-clamp-2 leading-relaxed">
                      {page.purpose}
                    </p>
                  </div>

                  {/* Footer Buttons */}
                  <div className="pt-3 mt-4 border-t border-[#E5E1D8] flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => handleOpenPageDossier(page)}
                      className="text-xs font-semibold text-[#0F1B2D] hover:text-[#B8955A] transition flex items-center gap-1"
                    >
                      <span>Read Guide</span>
                      <ChevronRight size={13} />
                    </button>

                    <Link
                      href={page.url.replace(/\[.*?\]/g, 'usr_01')}
                      className="flex items-center gap-1 text-[11px] font-medium text-[#64748B] hover:text-[#0284C7] transition bg-[#FAF8F4] border border-[#E5E1D8] rounded-md px-2 py-1"
                    >
                      <span>Go to Page</span>
                      <ArrowUpRight size={12} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredPages.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl border border-dashed border-[#E5E1D8] p-8">
              <Search size={32} className="mx-auto text-[#94A3B8] mb-3" />
              <h4 className="text-sm font-semibold text-[#0F1B2D]">No matching pages found</h4>
              <p className="text-xs text-[#64748B] mt-1">
                Try adjusting your search terms or selecting 'All Modules' from the filter dropdown.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedModule('all');
                }}
                className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-[#B8955A] px-3 py-1.5 text-xs font-semibold text-[#0F1B2D]"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: MASTER ROUTE INVENTORY TABLE */}
      {activeTab === 'inventory' && (
        <Card title="Complete Admin Route & Page Inventory (49 Routes)" titleIcon={FileText}>
          <p className="text-xs text-[#64748B] mb-4">
            Master census of all verified routes in the production build. Every route has been audited, returning HTTP 200 with live screen validation. Click any row or action to open the detailed page dossier or navigate directly.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#0F1B2D] bg-[#0F1B2D] text-[#FAF8F4]">
                  <th className="py-2.5 px-3 font-semibold w-10">#</th>
                  <th className="py-2.5 px-3 font-semibold">Page Name</th>
                  <th className="py-2.5 px-3 font-semibold">Relative URL</th>
                  <th className="py-2.5 px-3 font-semibold">Module</th>
                  <th className="py-2.5 px-3 font-semibold">Verification Status</th>
                  <th className="py-2.5 px-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E1D8]">
                {allPages.map((page) => (
                  <tr key={page.num} className="hover:bg-[#FAF8F4]/80 transition">
                    <td className="py-2 px-3 font-mono text-[11px] font-semibold text-[#64748B]">{page.num}</td>
                    <td className="py-2 px-3 font-semibold text-[#0F1B2D]">
                      <button
                        type="button"
                        onClick={() => handleOpenPageDossier(page)}
                        className="text-left hover:text-[#B8955A] transition"
                      >
                        {page.name}
                      </button>
                    </td>
                    <td className="py-2 px-3 font-mono text-[11px] text-[#0284C7]">{page.url}</td>
                    <td className="py-2 px-3">
                      <span className="rounded bg-[#FAF8F4] border border-[#E5E1D8] px-2 py-0.5 text-[10px] text-[#4A5568]">
                        Module {page.moduleNumber}: {page.moduleName}
                      </span>
                    </td>
                    <td className="py-2 px-3">
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10px] font-medium text-emerald-700">
                        <CheckCircle2 size={11} /> 100% Verified
                      </span>
                    </td>
                    <td className="py-2 px-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleOpenPageDossier(page)}
                          className="px-2 py-1 rounded border border-[#E5E1D8] text-[11px] font-semibold text-[#0F1B2D] hover:border-[#B8955A] hover:text-[#B8955A] transition"
                        >
                          Dossier
                        </button>
                        <Link
                          href={page.url.replace(/\[.*?\]/g, 'usr_01')}
                          className="px-2 py-1 rounded bg-[#0F1B2D] text-[11px] font-semibold text-white hover:bg-[#B8955A] hover:text-[#0F1B2D] transition inline-flex items-center gap-1"
                        >
                          <span>Open</span>
                          <ArrowUpRight size={10} />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* TAB 3: STANDARD SOP WORKFLOWS */}
      {activeTab === 'workflows' && (
        <div className="space-y-6">
          <div className="border-b border-[#E5E1D8] pb-4">
            <h2 className="text-lg font-serif font-bold text-[#0F1B2D]">End-to-End Standard Operating Procedures (SOPs)</h2>
            <p className="text-xs text-[#64748B] mt-1">
              Multi-page operational execution procedures for platform administrators handling real-world incidents, compliance reviews, and financial authorizations.
            </p>
          </div>

          <div className="grid gap-6">
            {MANUAL_WORKFLOWS.map((wf) => (
              <Card key={wf.id} padded className="hover:border-[#B8955A]/60 transition">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 border-b border-[#E5E1D8] pb-3 mb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="rounded bg-[#0F1B2D] text-white px-2 py-0.5 text-[10px] font-mono font-bold">
                        SOP #{wf.num}
                      </span>
                      <h3 className="font-serif font-bold text-base text-[#0F1B2D]">{wf.title}</h3>
                    </div>
                    <p className="text-xs text-[#64748B] mt-1.5">{wf.objective}</p>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5">
                    {wf.involved_pages.map((path) => (
                      <Link
                        key={path}
                        href={path.replace(/\[.*?\]/g, 'usr_01')}
                        className="rounded bg-[#FAF8F4] border border-[#E5E1D8] px-2 py-0.5 text-[10px] font-mono text-[#0284C7] hover:border-[#B8955A] hover:text-[#B8955A] transition flex items-center gap-1"
                      >
                        <span>{path}</span>
                        <ArrowUpRight size={10} />
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="space-y-2.5">
                  {wf.steps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-[#1E293B]">
                      <div className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#FAF8F4] border border-[#B8955A] text-[10px] font-bold text-[#0F1B2D] mt-0.5">
                        {idx + 1}
                      </div>
                      <p className="leading-relaxed">{step.replace(/^Step \d+:\s*/, '')}</p>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: COMPLIANCE & LEGAL FRAMEWORKS */}
      {activeTab === 'compliance' && (
        <div className="space-y-6">
          <div className="border-b border-[#E5E1D8] pb-4">
            <h2 className="text-lg font-serif font-bold text-[#0F1B2D]">Statutory Compliance & Legal Governance Architecture</h2>
            <p className="text-xs text-[#64748B] mt-1">
              Detailed breakdown of how the Startup & Talent ERP Platform satisfies Indian regulatory mandates across data privacy, financial disbursements, and corporate startup accreditation.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <Card title="1. DPDP Act 2023 (Digital Personal Data Protection)" titleIcon={ShieldCheck} padded>
              <ul className="space-y-2 text-xs text-[#475569]">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Mandatory 30-Day SLA:</strong> Dedicated countdown timers and alert badges on <code>/admin/data-requests</code> to guarantee responses within the statutory window.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Cryptographic Erasure:</strong> Automated SHA-256 anonymization of candidate profiles, resumes, and communications while isolating exempt tax ledgers.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Consent Logging:</strong> Timestamped records of user opt-ins, terms acceptances, and verifiable withdrawal receipts.</span>
                </li>
              </ul>
            </Card>

            <Card title="2. RBI Payout & Escrow Guidelines" titleIcon={Banknote} padded>
              <ul className="space-y-2 text-xs text-[#475569]">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Nodal Escrow Segregation:</strong> Milestone contract funds are securely sequestered in commercial bank escrow accounts prior to work delivery.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Penny-Drop Banking Validation:</strong> Pre-disbursement automated verification checks destination IFSC and beneficiary names.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Dual-Authorization Threshold:</strong> Payout batches exceeding INR 10,00,000 mandate dual-administrator sign-off.</span>
                </li>
              </ul>
            </Card>

            <Card title="3. Statutory TDS Withholding (Sections 194J & 206AA)" titleIcon={Scale} padded>
              <ul className="space-y-2 text-xs text-[#475569]">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Section 194J Withholding:</strong> Automated 10% statutory tax deduction computed on every talent invoice payout.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Section 206AA Higher Rate:</strong> Accounts lacking a verified PAN card are automatically withheld at the maximum 20% rate.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>CA Filing Ready:</strong> Itemized bank manifests and Form 26Q export archives ready for chartered accountant submission.</span>
                </li>
              </ul>
            </Card>

            <Card title="4. Tamper-Evident Administrative Audit Logging" titleIcon={Activity} padded>
              <ul className="space-y-2 text-xs text-[#475569]">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Append-Only SHA-256 Ledger:</strong> All administrative verifications, user suspensions, and flag adjustments are immutable.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Before-and-After JSON Diffs:</strong> Granular field-level state delta tracking viewable on <code>/admin/audit</code>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Role Segregation:</strong> Even Super Administrators cannot delete or retroactively alter audit records.</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      )}

      {/* TAB 5: GLOSSARY & TROUBLESHOOTING */}
      {activeTab === 'glossary' && (
        <div className="space-y-6">
          <Card title="Operational Troubleshooting Matrix" titleIcon={HelpCircle} padded>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#E5E1D8] bg-[#FAF8F4] text-[#0F1B2D]">
                    <th className="py-2 px-3 font-semibold w-1/4">Incident Scenario</th>
                    <th className="py-2 px-3 font-semibold w-1/4">Probable Root Cause</th>
                    <th className="py-2 px-3 font-semibold w-1/4">Immediate Action</th>
                    <th className="py-2 px-3 font-semibold w-1/4">Permanent Resolution</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E1D8]">
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-[#0F1B2D]">Session Invalidation Loop</td>
                    <td className="py-2.5 px-3 text-[#64748B]">Expired admin JWT token or client clock skew</td>
                    <td className="py-2.5 px-3">Clear browser storage; check NTP clock at <code>/admin/system</code></td>
                    <td className="py-2.5 px-3 text-emerald-700">Super Admin resets user session in <code>/admin/staff</code></td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-[#0F1B2D]">DPIIT Document OCR Failure</td>
                    <td className="py-2.5 px-3 text-[#64748B]">Low scan resolution (&lt;150 DPI) or distorted angles</td>
                    <td className="py-2.5 px-3">Click 'Request Correction' in <code>/admin/verifications/[id]</code></td>
                    <td className="py-2.5 px-3 text-emerald-700">Founder uploads native uncompressed PDF from Startup India</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-[#0F1B2D]">Failed Third-Party Webhook</td>
                    <td className="py-2.5 px-3 text-[#64748B]">Partner ATS endpoint timeout (&gt;5000ms) or HTTP 500</td>
                    <td className="py-2.5 px-3">Inspect payload response code at <code>/admin/events</code></td>
                    <td className="py-2.5 px-3 text-emerald-700">Click 'Retry Failed Event' once partner server recovers</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-[#0F1B2D]">Rejected Bank Payout Line</td>
                    <td className="py-2.5 px-3 text-[#64748B]">IFSC code changed or invalid beneficiary name</td>
                    <td className="py-2.5 px-3">Exclude item from batch at <code>/admin/payouts/batches/[id]</code></td>
                    <td className="py-2.5 px-3 text-emerald-700">Place payee hold; notify user to update bank credentials</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>

          <Card title="Platform Domain Glossary (20 Terms Defined)" titleIcon={BookOpen} padded>
            <div className="grid gap-3 sm:grid-cols-2">
              {MANUAL_GLOSSARY.map((g) => (
                <div key={g.term} className="rounded-lg border border-[#E5E1D8] bg-[#FAF8F4]/50 p-3">
                  <h4 className="font-bold text-xs text-[#0F1B2D] flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#B8955A]" />
                    {g.term}
                  </h4>
                  <p className="text-[11px] text-[#475569] mt-1 leading-relaxed">{g.definition}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* TAB 6: EMBEDDED PDF READER */}
      {activeTab === 'pdf-reader' && (
        <Card title="Official Admin User Manual (PDF Reader & Download)" titleIcon={BookOpen} padded>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 bg-[#FAF8F4] p-3 rounded-xl border border-[#E5E1D8]">
            <div className="flex items-center gap-2">
              <span className="font-bold text-xs text-[#0F1B2D]">ADMIN_USER_MANUAL.pdf</span>
              <span className="rounded bg-white border border-[#E5E1D8] px-2 py-0.5 text-[10px] text-[#64748B] font-mono">
                {MANUAL_METADATA.pdfSize}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={MANUAL_METADATA.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs font-semibold text-[#0F1B2D] hover:text-[#B8955A] bg-white border border-[#E5E1D8] rounded-lg px-3 py-1.5 shadow-xs"
              >
                <ExternalLink size={13} /> Open in New Window
              </a>
              <a
                href={MANUAL_METADATA.pdfUrl}
                download="ADMIN_USER_MANUAL.pdf"
                className="flex items-center gap-1 text-xs font-bold text-[#0F1B2D] bg-[#B8955A] hover:bg-[#D4AF37] rounded-lg px-3.5 py-1.5 shadow-xs transition"
              >
                <Download size={13} /> Download PDF
              </a>
            </div>
          </div>

          <div className="rounded-xl border border-[#E5E1D8] overflow-hidden bg-slate-100 min-h-[700px] flex flex-col items-center justify-center">
            <iframe
              src={`${MANUAL_METADATA.pdfUrl}#toolbar=1`}
              title="Admin User Manual PDF"
              className="w-full h-[750px] border-0"
            />
          </div>
        </Card>
      )}

      {/* Detail Drawer for Inspecting Individual Page Dossier */}
      <DetailDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={selectedPage ? `${selectedPage.num}. ${selectedPage.name}` : 'Page Dossier'}
      >
        {selectedPage && (
          <div className="space-y-5 text-xs text-[#1E293B]">
            {/* Header / Route Info */}
            <div className="rounded-xl bg-[#FAF8F4] border border-[#E5E1D8] p-3.5">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-[10px] uppercase tracking-wider font-semibold text-[#B8955A]">
                  Module {selectedPage.moduleNumber}: {selectedPage.moduleName}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 text-emerald-800 px-2 py-0.5 text-[10px] font-bold">
                  <CheckCircle2 size={10} /> Active (HTTP 200)
                </span>
              </div>
              <div className="font-mono text-xs font-bold text-[#0284C7]">{selectedPage.url}</div>
              <div className="mt-3">
                <Link
                  href={selectedPage.url.replace(/\[.*?\]/g, 'usr_01')}
                  className="w-full flex items-center justify-center gap-1.5 rounded-lg bg-[#0F1B2D] text-white font-semibold py-2 text-xs hover:bg-[#B8955A] hover:text-[#0F1B2D] transition shadow-xs"
                >
                  <span>Open Route in Admin Portal</span>
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>

            {/* Live Screenshot Preview */}
            <div>
              <span className="text-[11px] font-bold text-[#0F1B2D] uppercase tracking-wider block mb-2">
                Live Screenshot Capture
              </span>
              <div className="rounded-lg border border-[#E5E1D8] overflow-hidden shadow-xs">
                <img
                  src={`/docs/screenshots/${selectedPage.screenshot}`}
                  alt={selectedPage.name}
                  className="w-full object-cover object-top max-h-56"
                />
              </div>
            </div>

            {/* Purpose */}
            <div>
              <span className="text-[11px] font-bold text-[#0F1B2D] uppercase tracking-wider block mb-1">
                Purpose & Objective
              </span>
              <p className="text-xs text-[#475569] leading-relaxed bg-white p-2.5 rounded-lg border border-[#E5E1D8]">
                {selectedPage.purpose}
              </p>
            </div>

            {/* Primary Tasks */}
            <div>
              <span className="text-[11px] font-bold text-[#0F1B2D] uppercase tracking-wider block mb-2">
                Primary Administrative Tasks
              </span>
              <ul className="space-y-1.5 pl-2">
                {selectedPage.used_for.map((task, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-[#475569]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#B8955A] mt-1.5 shrink-0" />
                    <span>{task}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Key UI Features */}
            <div>
              <span className="text-[11px] font-bold text-[#0F1B2D] uppercase tracking-wider block mb-2">
                Key Components & Data Points
              </span>
              <ul className="space-y-1.5 pl-2">
                {selectedPage.main_features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-[#475569]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#0F1B2D] mt-1.5 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Available Actions Table */}
            <div>
              <span className="text-[11px] font-bold text-[#0F1B2D] uppercase tracking-wider block mb-2">
                Available Actions & UI Controls
              </span>
              <div className="rounded-lg border border-[#E5E1D8] overflow-hidden">
                <table className="w-full text-left text-[11px]">
                  <thead className="bg-[#FAF8F4] border-b border-[#E5E1D8]">
                    <tr>
                      <th className="py-1.5 px-2.5 font-semibold text-[#0F1B2D]">Control</th>
                      <th className="py-1.5 px-2.5 font-semibold text-[#0F1B2D]">Action Effect</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E1D8]">
                    {selectedPage.actions.map((act, i) => (
                      <tr key={i} className="hover:bg-slate-50">
                        <td className="py-1.5 px-2.5 font-semibold text-[#0F1B2D]">{act.control}</td>
                        <td className="py-1.5 px-2.5 text-[#64748B]">{act.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Standard Steps */}
            <div>
              <span className="text-[11px] font-bold text-[#0F1B2D] uppercase tracking-wider block mb-2">
                Standard Operational Steps
              </span>
              <div className="space-y-1.5 bg-[#FAF8F4] p-3 rounded-lg border-l-2 border-[#B8955A]">
                {selectedPage.steps.map((step, i) => (
                  <div key={i} className="text-xs text-[#1E293B]">
                    {step}
                  </div>
                ))}
              </div>
            </div>

            {/* Implementation Notes / Limitations */}
            <div className="rounded-lg bg-amber-50 border border-amber-200 p-3 text-[11px] text-amber-900">
              <span className="font-bold block mb-1">Technical Implementation Note:</span>
              {selectedPage.limitations}
            </div>

            {/* Cross Navigation */}
            <div>
              <span className="text-[11px] font-bold text-[#0F1B2D] uppercase tracking-wider block mb-1.5">
                Related Pages
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedPage.related_pages.map((path) => (
                  <Link
                    key={path}
                    href={path.replace(/\[.*?\]/g, 'usr_01')}
                    className="rounded bg-[#FAF8F4] border border-[#E5E1D8] px-2 py-0.5 text-[10px] font-mono text-[#0284C7] hover:border-[#B8955A] hover:text-[#B8955A] transition"
                  >
                    {path}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </DetailDrawer>
    </AdminShell>
  );
}
