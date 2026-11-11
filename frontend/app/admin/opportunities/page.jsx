'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Award,
  ExternalLink,
  Plus,
  Search,
  CheckCircle2,
  Calendar,
  Building,
  Edit,
  Trash2,
  Sparkles,
  ArrowRight,
  Eye,
} from 'lucide-react';
import { AdminShell } from '@/components';
import {
  Card,
  Btn,
  ResponsiveTable,
  DetailDrawer,
  toast,
} from '@/components/admin-ui';
import {
  OPPORTUNITY_CATEGORIES,
  OPPORTUNITY_VERIFICATIONS,
  OPPORTUNITY_STATUSES,
  initialOpportunities,
} from './opportunities-data';

export default function AdminOpportunitiesPage() {
  const [opps, setOpps] = useState(initialOpportunities);
  const [searchQuery, setSearchQuery] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingOppId, setEditingOppId] = useState(null); // null = Create Mode, string = Edit Mode

  const defaultFormState = {
    name: '',
    category: 'Government Grant',
    provider: '',
    grantAmount: '',
    stage: 'Early Stage / Prototype',
    deadline: '2026-12-31',
    verificationState: 'Government Verified',
    status: 'Active',
    url: 'https://',
    description: '',
  };

  const [form, setForm] = useState(defaultFormState);

  const filteredOpps = opps.filter((o) =>
    o.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.provider.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenAdd = () => {
    setEditingOppId(null);
    setForm(defaultFormState);
    setDrawerOpen(true);
  };

  const handleOpenEdit = (opp) => {
    setEditingOppId(opp.id);
    setForm({
      name: opp.name,
      category: opp.category,
      provider: opp.provider,
      grantAmount: opp.grantAmount,
      stage: opp.stage || 'Early Stage / Prototype',
      deadline: opp.deadline || '2026-12-31',
      verificationState: opp.verificationState || 'Government Verified',
      status: opp.status || 'Active',
      url: opp.url || 'https://',
      description: opp.description || '',
    });
    setDrawerOpen(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.provider.trim() || !form.grantAmount.trim()) {
      toast('Please fill in all required fields (Name, Agency, Grant Amount)');
      return;
    }

    if (editingOppId) {
      // Update existing opportunity
      setOpps(
        opps.map((o) =>
          o.id === editingOppId
            ? {
                ...o,
                name: form.name.trim(),
                category: form.category,
                provider: form.provider.trim(),
                grantAmount: form.grantAmount.trim(),
                stage: form.stage.trim(),
                deadline: form.deadline,
                verificationState: form.verificationState,
                status: form.status,
                url: form.url.trim() || 'https://startupindia.gov.in',
                description: form.description.trim(),
              }
            : o
        )
      );
      toast(`Opportunity "${form.name}" updated successfully!`);
    } else {
      // Create new opportunity
      const newId = `OPP-${Date.now().toString().slice(-6)}`;
      const newOpp = {
        id: newId,
        name: form.name.trim(),
        category: form.category,
        provider: form.provider.trim(),
        grantAmount: form.grantAmount.trim(),
        stage: form.stage.trim(),
        deadline: form.deadline,
        verificationState: form.verificationState,
        status: form.status,
        url: form.url.trim() || 'https://startupindia.gov.in',
        applicationsReferred: 0,
        description: form.description.trim() || 'Curated platform non-dilutive grant opportunity for verified founders.',
      };

      setOpps([newOpp, ...opps]);
      toast(`Opportunity "${newOpp.name}" published to directory!`);
    }

    setForm(defaultFormState);
    setEditingOppId(null);
    setDrawerOpen(false);
  };

  const handleDeleteOpportunity = (id, name) => {
    setOpps(opps.filter((o) => o.id !== id));
    toast(`Opportunity "${name}" removed`);
  };

  return (
    <AdminShell active="Grants & Incubators">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-[#E5E1D8] pb-5">
        <div>
          <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#0F1B2D]">
            Curated Grants, Incubators & Government Programs
          </h1>
          <p className="text-xs text-[#4A5568] mt-1 max-w-2xl">
            Verified funding directory for early-stage and prototype founders. Non-dilutive grants, state seed schemes, and top accelerators.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/admin/opportunities/new"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-[#E5E1D8] bg-white text-xs font-semibold text-[#0F1B2D] hover:bg-[#FAF8F4] hover:border-[#B8955A] transition shadow-xs"
            title="Open full page system with drafts"
          >
            <Sparkles size={14} className="text-[#B8955A]" />
            <span>Full Page Creator</span>
          </Link>
          <Btn icon={Plus} onClick={handleOpenAdd}>
            Add New Grant Opportunity
          </Btn>
        </div>
      </div>

      {/* Search & Counter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div className="relative w-full max-w-sm">
          <label htmlFor="opp-search" className="sr-only">Search grants and programs</label>
          <Search className="absolute left-3 top-2.5 text-[#A0A7B4]" size={15} />
          <input
            id="opp-search"
            type="text"
            placeholder="Search by program name, agency, or sector..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-9 pl-9 pr-3 rounded-lg border border-[#E5E1D8] bg-white text-xs focus:outline-none focus:border-[#B8955A]"
          />
        </div>
        <span className="text-xs text-[#4A5568]">{filteredOpps.length} verified opportunities</span>
      </div>

      {/* Directory Grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        {filteredOpps.map((op) => (
          <div
            key={op.id}
            className="rounded-xl border border-[#E5E1D8] bg-white p-5 shadow-xs hover:border-[#B8955A] transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold text-[#B8955A] bg-[#F3EBDD] px-2 py-0.5 rounded">
                  {op.category}
                </span>
                <div className="flex items-center gap-2">
                  <span className={`px-1.5 py-0.2 rounded text-[10px] font-semibold ${
                    op.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {op.status || 'Active'}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] text-[#286749]">
                    <CheckCircle2 size={13} />
                    {op.verificationState}
                  </span>
                </div>
              </div>

              <h3 className="text-base font-serif font-bold text-[#0F1B2D] mb-1">{op.name}</h3>
              <p className="text-xs text-[#4A5568] mb-3">{op.provider}</p>
              <p className="text-xs text-[#0F1B2D] leading-relaxed mb-4">{op.description}</p>

              <div className="space-y-1.5 text-xs bg-[#FAF8F4] border border-[#E5E1D8] p-3 rounded-lg">
                <div className="flex justify-between">
                  <span className="text-[#4A5568]">Grant Value:</span>
                  <span className="font-bold text-[#0F1B2D]">{op.grantAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#4A5568]">Eligible Stage:</span>
                  <span className="font-medium text-[#0F1B2D]">{op.stage}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#4A5568]">Application Deadline:</span>
                  <span className="font-mono font-medium text-[#B42318]">{op.deadline}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#E5E1D8] flex items-center justify-between text-xs">
              <span className="text-[#4A5568]">
                Referred Founders: <b className="text-[#0F1B2D]">{op.applicationsReferred}</b>
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleOpenEdit(op)}
                  className="text-[#4A5568] hover:text-[#0F1B2D] inline-flex items-center gap-1 transition"
                  title="Edit in quick drawer"
                >
                  <Edit size={12} />
                  <span>Quick Edit</span>
                </button>
                <Link
                  href={`/admin/opportunities/${op.id}`}
                  className="text-[#B8955A] hover:underline inline-flex items-center gap-0.5 font-medium ml-1"
                  title="Open dedicated editor page"
                >
                  <span>Full Edit</span>
                  <ArrowRight size={11} />
                </Link>
                <button
                  type="button"
                  onClick={() => handleDeleteOpportunity(op.id, op.name)}
                  className="text-gray-400 hover:text-rose-600 transition inline-flex items-center gap-1 ml-1"
                  title="Delete opportunity"
                >
                  <Trash2 size={12} />
                </button>
                <a
                  href={op.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#B8955A] font-medium hover:underline inline-flex items-center gap-1 ml-1"
                >
                  <span>Portal</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Matching Create / Edit Opportunity Drawer */}
      {drawerOpen && (
        <DetailDrawer
          open={drawerOpen}
          onClose={() => {
            setDrawerOpen(false);
            setEditingOppId(null);
          }}
          title={editingOppId ? `Edit Grant: ${form.name}` : 'Curate New Grant or Accelerator Opportunity'}
        >
          <div className="space-y-4 text-xs">
            {/* Direct Link to Dedicated Full Page */}
            {editingOppId ? (
              <div className="rounded-xl border border-[#E5E1D8] bg-gradient-to-r from-[#FAF8F4] via-amber-50/40 to-[#FAF8F4] p-3.5 flex items-center justify-between gap-3 shadow-xs">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-[#0F1B2D] text-[#B8955A] flex items-center justify-center shrink-0 shadow-xs">
                    <ExternalLink size={16} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-xs text-[#0F1B2D]">Open Full Opportunity Page</span>
                      <span className="px-1.5 py-0.5 rounded font-mono text-[10px] font-semibold bg-[#B8955A]/15 text-[#8C6D37]">
                        /{editingOppId}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#718096] truncate mt-0.5">
                      Referral tracking, link health checks & founder readiness targeting
                    </p>
                  </div>
                </div>
                <Link
                  href={`/admin/opportunities/${editingOppId}`}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#0F1B2D] text-white hover:bg-[#1C2B42] text-xs font-semibold shrink-0 transition shadow-xs group"
                  title={`Navigate to /admin/opportunities/${editingOppId}`}
                >
                  <span>Open Page</span>
                  <ArrowRight size={13} className="text-[#B8955A] group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            ) : (
              <div className="rounded-xl border border-[#E5E1D8] bg-gradient-to-r from-[#FAF8F4] via-amber-50/40 to-[#FAF8F4] p-3.5 flex items-center justify-between gap-3 shadow-xs">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-[#0F1B2D] text-[#B8955A] flex items-center justify-center shrink-0 shadow-xs">
                    <Sparkles size={16} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-xs text-[#0F1B2D]">Open Full Opportunity Creator</span>
                      <span className="px-1.5 py-0.5 rounded font-mono text-[10px] font-semibold bg-[#B8955A]/15 text-[#8C6D37]">
                        /new
                      </span>
                    </div>
                    <p className="text-[11px] text-[#718096] truncate mt-0.5">
                      Full page workspace with auto-saving drafts, live card preview & readiness checklist
                    </p>
                  </div>
                </div>
                <Link
                  href="/admin/opportunities/new"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#0F1B2D] text-white hover:bg-[#1C2B42] text-xs font-semibold shrink-0 transition shadow-xs group"
                  title="Navigate to /admin/opportunities/new"
                >
                  <span>Open Creator</span>
                  <ArrowRight size={13} className="text-[#B8955A] group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label htmlFor="grant-name" className="block font-semibold text-[#0F1B2D] mb-1">
                  Program / Scheme Name <span className="text-rose-600">*</span>
                </label>
                <input
                  id="grant-name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. MeitY TIDE 2.0 Entrepreneurship Grant"
                  className="w-full h-9 px-3 rounded-lg border border-[#E5E1D8] bg-white text-xs text-[#0F1B2D] focus:outline-none focus:border-[#B8955A]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="grant-provider" className="block font-semibold text-[#0F1B2D] mb-1">
                    Agency / Grantor Provider <span className="text-rose-600">*</span>
                  </label>
                  <input
                    id="grant-provider"
                    type="text"
                    required
                    value={form.provider}
                    onChange={(e) => setForm({ ...form, provider: e.target.value })}
                    placeholder="e.g. Ministry of Electronics & IT"
                    className="w-full h-9 px-3 rounded-lg border border-[#E5E1D8] bg-white text-xs text-[#0F1B2D] focus:outline-none focus:border-[#B8955A]"
                  />
                </div>

                <div>
                  <label htmlFor="grant-category" className="block font-semibold text-[#0F1B2D] mb-1">
                    Category
                  </label>
                  <select
                    id="grant-category"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full h-9 px-2.5 rounded-lg border border-[#E5E1D8] bg-white text-xs text-[#0F1B2D] focus:outline-none focus:border-[#B8955A]"
                  >
                    {OPPORTUNITY_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="grant-amount" className="block font-semibold text-[#0F1B2D] mb-1">
                    Grant Value / Support <span className="text-rose-600">*</span>
                  </label>
                  <input
                    id="grant-amount"
                    type="text"
                    required
                    value={form.grantAmount}
                    onChange={(e) => setForm({ ...form, grantAmount: e.target.value })}
                    placeholder="e.g. Up to ₹30 Lakhs (Equity-Free)"
                    className="w-full h-9 px-3 rounded-lg border border-[#E5E1D8] bg-white text-xs text-[#0F1B2D] focus:outline-none focus:border-[#B8955A]"
                  />
                </div>

                <div>
                  <label htmlFor="grant-stage" className="block font-semibold text-[#0F1B2D] mb-1">
                    Eligible Startup Stage
                  </label>
                  <input
                    id="grant-stage"
                    type="text"
                    value={form.stage}
                    onChange={(e) => setForm({ ...form, stage: e.target.value })}
                    placeholder="e.g. Prototype / MVP Stage"
                    className="w-full h-9 px-3 rounded-lg border border-[#E5E1D8] bg-white text-xs text-[#0F1B2D] focus:outline-none focus:border-[#B8955A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="grant-deadline" className="block font-semibold text-[#0F1B2D] mb-1">
                    Application Deadline
                  </label>
                  <input
                    id="grant-deadline"
                    type="date"
                    value={form.deadline}
                    onChange={(e) => setForm({ ...form, deadline: e.target.value })}
                    className="w-full h-9 px-3 rounded-lg border border-[#E5E1D8] bg-white text-xs text-[#0F1B2D] focus:outline-none focus:border-[#B8955A]"
                  />
                </div>

                <div>
                  <label htmlFor="grant-verification" className="block font-semibold text-[#0F1B2D] mb-1">
                    Verification Badge
                  </label>
                  <select
                    id="grant-verification"
                    value={form.verificationState}
                    onChange={(e) => setForm({ ...form, verificationState: e.target.value })}
                    className="w-full h-9 px-2.5 rounded-lg border border-[#E5E1D8] bg-white text-xs text-[#0F1B2D] focus:outline-none focus:border-[#B8955A]"
                  >
                    {OPPORTUNITY_VERIFICATIONS.map((badge) => (
                      <option key={badge} value={badge}>
                        {badge}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="grant-status" className="block font-semibold text-[#0F1B2D] mb-1">
                    Program Status
                  </label>
                  <select
                    id="grant-status"
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    className="w-full h-9 px-2.5 rounded-lg border border-[#E5E1D8] bg-white text-xs text-[#0F1B2D] focus:outline-none focus:border-[#B8955A]"
                  >
                    {OPPORTUNITY_STATUSES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="grant-url" className="block font-semibold text-[#0F1B2D] mb-1">
                    Official Application Portal URL
                  </label>
                  <input
                    id="grant-url"
                    type="url"
                    value={form.url}
                    onChange={(e) => setForm({ ...form, url: e.target.value })}
                    placeholder="https://agency.gov.in/apply"
                    className="w-full h-9 px-3 rounded-lg border border-[#E5E1D8] bg-white text-xs text-[#0F1B2D] focus:outline-none focus:border-[#B8955A]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="grant-description" className="block font-semibold text-[#0F1B2D] mb-1">
                  Description & Eligibility Criteria
                </label>
                <textarea
                  id="grant-description"
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Brief summary of grant terms, eligible entity structures, and key milestones required..."
                  className="w-full p-3 rounded-lg border border-[#E5E1D8] bg-white text-xs text-[#0F1B2D] focus:outline-none focus:border-[#B8955A]"
                />
              </div>

              <div className="pt-2 border-t border-[#E5E1D8] space-y-2">
                <div className="flex gap-2">
                  <Btn type="submit" className="flex-1" icon={editingOppId ? CheckCircle2 : Plus}>
                    {editingOppId ? 'Save & Update Opportunity' : 'Publish Opportunity'}
                  </Btn>
                  <Btn
                    type="button"
                    secondary
                    onClick={() => {
                      setDrawerOpen(false);
                      setEditingOppId(null);
                    }}
                    className="flex-1"
                  >
                    Cancel
                  </Btn>
                </div>

                <Link
                  href={editingOppId ? `/admin/opportunities/${editingOppId}` : '/admin/opportunities/new'}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-lg border border-[#E5E1D8] bg-white px-3.5 py-2.5 text-xs font-semibold text-[#0F1B2D] hover:bg-[#FAF8F4] hover:border-[#B8955A] transition shadow-xs group"
                >
                  <span>
                    {editingOppId
                      ? `Navigate to Dedicated Opportunity Page (/${editingOppId})`
                      : 'Navigate to Full Page System with Drafts (/new)'}
                  </span>
                  <ArrowRight size={14} className="text-[#B8955A] group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </form>
          </div>
        </DetailDrawer>
      )}
    </AdminShell>
  );
}
