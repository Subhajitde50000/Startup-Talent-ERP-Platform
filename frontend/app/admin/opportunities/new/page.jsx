'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Award,
  Save,
  CheckCircle2,
  ExternalLink,
  Plus,
  Trash2,
  Clock,
  Sparkles,
  RotateCcw,
  AlertCircle,
  FileText,
  Eye,
} from 'lucide-react';
import { AdminShell } from '@/components';
import {
  Card,
  Btn,
  StatChip,
  toast,
} from '@/components/admin-ui';
import {
  OPPORTUNITY_CATEGORIES,
  OPPORTUNITY_VERIFICATIONS,
  OPPORTUNITY_STATUSES,
  OPPORTUNITY_STAGES,
  initialOpportunities,
} from '../opportunities-data';

const DRAFT_STORAGE_KEY = 'admin_opportunity_draft_v1';

export default function NewOpportunityPage() {
  const router = useRouter();

  const emptyForm = {
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

  const [form, setForm] = useState(emptyForm);
  const [lastAutoSaved, setLastAutoSaved] = useState(null);
  const [hasDraftNotice, setHasDraftNotice] = useState(false);
  const [draftSavedAt, setDraftSavedAt] = useState('');

  // Load draft on mount if available
  useEffect(() => {
    try {
      const saved = localStorage.getItem(DRAFT_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.data && (parsed.data.name || parsed.data.provider || parsed.data.description)) {
          setForm(parsed.data);
          setDraftSavedAt(parsed.savedAt || 'Earlier session');
          setHasDraftNotice(true);
        }
      }
    } catch (e) {
      // Storage unavailable or invalid JSON
    }
  }, []);

  // Manual save draft
  const handleSaveDraft = useCallback(() => {
    const timestamp = new Date().toLocaleTimeString('en-IN', { hour12: false });
    try {
      localStorage.setItem(
        DRAFT_STORAGE_KEY,
        JSON.stringify({ data: form, savedAt: timestamp })
      );
      setLastAutoSaved(timestamp);
      toast(`Draft saved locally at ${timestamp}`);
    } catch (e) {
      toast('Failed to save draft to local storage');
    }
  }, [form]);

  // Auto-save every 15 seconds if content exists
  useEffect(() => {
    if (!form.name && !form.provider && !form.description) return;
    const interval = setInterval(() => {
      try {
        const timestamp = new Date().toLocaleTimeString('en-IN', { hour12: false });
        localStorage.setItem(
          DRAFT_STORAGE_KEY,
          JSON.stringify({ data: form, savedAt: timestamp })
        );
        setLastAutoSaved(timestamp);
      } catch (e) {}
    }, 15000);
    return () => clearInterval(interval);
  }, [form]);

  const handleDiscardDraft = () => {
    try {
      localStorage.removeItem(DRAFT_STORAGE_KEY);
    } catch (e) {}
    setForm(emptyForm);
    setHasDraftNotice(false);
    setLastAutoSaved(null);
    toast('Draft cleared');
  };

  const handlePublish = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.provider.trim() || !form.grantAmount.trim()) {
      toast('Please fill in all mandatory fields (Name, Agency, Grant Value)');
      return;
    }

    const newId = `OPP-${Date.now().toString().slice(-6)}`;
    const newOpportunity = {
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
      description: form.description.trim() || 'Curated non-dilutive grant opportunity for verified founders.',
    };

    // Prepend to in-memory initialOpportunities
    initialOpportunities.unshift(newOpportunity);

    // Clear saved draft
    try {
      localStorage.removeItem(DRAFT_STORAGE_KEY);
    } catch (e) {}

    toast(`Opportunity "${newOpportunity.name}" published successfully!`);
    setTimeout(() => {
      router.push('/admin/opportunities');
    }, 700);
  };

  // Readiness Checklist completeness
  const isNameDone = Boolean(form.name.trim());
  const isProviderDone = Boolean(form.provider.trim());
  const isAmountDone = Boolean(form.grantAmount.trim());
  const isUrlDone = form.url.startsWith('http') && form.url.length > 8;
  const isDescriptionDone = form.description.trim().length > 15;

  const completionPercent = useMemo(() => {
    const checks = [isNameDone, isProviderDone, isAmountDone, isUrlDone, isDescriptionDone];
    const completed = checks.filter(Boolean).length;
    return Math.round((completed / checks.length) * 100);
  }, [isNameDone, isProviderDone, isAmountDone, isUrlDone, isDescriptionDone]);

  return (
    <AdminShell active="Grants & Incubators">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs text-[#718096] mb-4">
        <Link href="/admin/opportunities" className="hover:text-[#0F1B2D] transition flex items-center gap-1">
          <ArrowLeft size={13} />
          <span>Grants & Incubators Directory</span>
        </Link>
        <span>/</span>
        <span className="text-[#0F1B2D] font-medium">Curate New Funding Opportunity</span>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-[#E5E1D8] pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#B8955A]/15 text-[#8C6D37]">
              NEW OPPORTUNITY SYSTEM
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-100 text-blue-800">
              {lastAutoSaved ? `Auto-saved at ${lastAutoSaved}` : 'Draft (Unpublished)'}
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#0F1B2D]">
            Curate New Funding Opportunity
          </h1>
          <p className="text-xs text-[#4A5568] mt-1 max-w-2xl">
            Configure non-dilutive government schemes, corporate incubators, and global seed accelerators surfaced to verified founders.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Btn small secondary icon={Save} onClick={handleSaveDraft} title="Save current draft locally">
            Save Draft
          </Btn>
          <Btn small secondary icon={Trash2} onClick={handleDiscardDraft} title="Clear draft form">
            Discard
          </Btn>
          <Btn icon={CheckCircle2} onClick={handlePublish}>
            Publish Opportunity
          </Btn>
        </div>
      </div>

      {/* Draft Notification Banner */}
      {hasDraftNotice && (
        <div className="p-3 mb-6 rounded-xl border border-blue-200 bg-blue-50/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-blue-900">
          <div className="flex items-center gap-2">
            <FileText size={16} className="text-blue-700 shrink-0" />
            <span>
              Restored uncommitted draft auto-saved on <strong>{draftSavedAt}</strong>.
            </span>
          </div>
          <button
            type="button"
            onClick={() => setHasDraftNotice(false)}
            className="text-xs font-semibold text-blue-800 hover:underline shrink-0"
          >
            Dismiss Notice
          </button>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Opportunity Form (2 cols) */}
        <div className="lg:col-span-2">
          <Card title="Program Specifications" titleIcon={Award}>
            <form onSubmit={handlePublish} className="space-y-4 text-xs">
              {/* Program Name */}
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
                  placeholder="e.g. MeitY TIDE 2.0 Entrepreneurship & Incubation Grant"
                  className="w-full h-9 px-3 rounded-lg border border-[#E5E1D8] bg-white text-xs text-[#0F1B2D] focus:outline-none focus:border-[#B8955A]"
                />
              </div>

              {/* Agency & Category */}
              <div className="grid gap-3 sm:grid-cols-2">
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
                    placeholder="e.g. Ministry of Electronics & IT (MeitY)"
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

              {/* Grant Value & Stage */}
              <div className="grid gap-3 sm:grid-cols-2">
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
                    placeholder="e.g. Up to ₹30 Lakhs (Equity-Free Grant)"
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
                    placeholder="e.g. Early Stage / Prototype"
                    className="w-full h-9 px-3 rounded-lg border border-[#E5E1D8] bg-white text-xs text-[#0F1B2D] focus:outline-none focus:border-[#B8955A]"
                  />
                </div>
              </div>

              {/* Deadline & Verification Badge */}
              <div className="grid gap-3 sm:grid-cols-2">
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
                  <label htmlFor="grant-badge" className="block font-semibold text-[#0F1B2D] mb-1">
                    Verification Badge
                  </label>
                  <select
                    id="grant-badge"
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

              {/* Program Status & Application Portal URL */}
              <div className="grid gap-3 sm:grid-cols-2">
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
                    placeholder="https://tide2.meity.gov.in"
                    className="w-full h-9 px-3 rounded-lg border border-[#E5E1D8] bg-white text-xs text-[#0F1B2D] focus:outline-none focus:border-[#B8955A]"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label htmlFor="grant-description" className="block font-semibold text-[#0F1B2D] mb-1">
                  Description & Eligibility Criteria
                </label>
                <textarea
                  id="grant-description"
                  rows={4}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Summary of grant milestones, eligible incorporated startup entities, equity terms, and disbursal tranches..."
                  className="w-full p-3 rounded-lg border border-[#E5E1D8] bg-white text-xs text-[#0F1B2D] focus:outline-none focus:border-[#B8955A]"
                />
              </div>

              {/* Form Action Controls */}
              <div className="flex flex-col sm:flex-row gap-2 pt-3 border-t border-[#E5E1D8]">
                <Btn type="submit" className="flex-1" icon={Plus}>
                  Publish Opportunity
                </Btn>
                <Btn type="button" secondary onClick={handleSaveDraft} className="flex-1" icon={Save}>
                  Save Draft
                </Btn>
                <Btn
                  type="button"
                  secondary
                  onClick={() => router.push('/admin/opportunities')}
                  className="px-4"
                >
                  Cancel
                </Btn>
              </div>
            </form>
          </Card>
        </div>

        {/* Sidebar: Live Card Preview & Draft Health */}
        <div className="space-y-4 text-xs">
          {/* Live Preview Card */}
          <Card title="Founder Directory Card Preview" titleIcon={Eye}>
            <div className="rounded-xl border border-[#E5E1D8] bg-[#FAF8F4]/80 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold text-[#B8955A] bg-[#F3EBDD] px-2 py-0.5 rounded">
                  {form.category}
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] text-[#286749]">
                  <CheckCircle2 size={12} />
                  {form.verificationState}
                </span>
              </div>

              <div>
                <h4 className="text-sm font-serif font-bold text-[#0F1B2D] line-clamp-2">
                  {form.name || 'Sample Program Name (Draft)'}
                </h4>
                <p className="text-[11px] text-[#4A5568] mt-0.5">
                  {form.provider || 'Funding Agency'}
                </p>
              </div>

              <p className="text-xs text-[#4A5568] leading-relaxed line-clamp-3">
                {form.description || 'Curated platform non-dilutive grant opportunity for verified founders.'}
              </p>

              <div className="space-y-1 text-[11px] bg-white border border-[#E5E1D8] p-2.5 rounded-lg">
                <div className="flex justify-between">
                  <span className="text-[#4A5568]">Grant Value:</span>
                  <span className="font-bold text-[#0F1B2D]">{form.grantAmount || '₹0'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#4A5568]">Target Stage:</span>
                  <span className="font-medium text-[#0F1B2D]">{form.stage}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#4A5568]">Deadline:</span>
                  <span className="font-mono text-[#B42318]">{form.deadline}</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Publishing Checklist & Completeness */}
          <Card title="Publishing Readiness Checklist">
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[#4A5568]">Form Completeness</span>
                  <span className="font-bold text-[#0F1B2D]">{completionPercent}%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-[#E5E1D8] overflow-hidden">
                  <div
                    className="h-full bg-emerald-600 transition-all duration-300"
                    style={{ width: `${completionPercent}%` }}
                  />
                </div>
              </div>

              <div className="space-y-1.5 text-xs">
                <div className="flex items-center gap-2">
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                    isNameDone ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-400'
                  }`}>
                    ✓
                  </span>
                  <span className={isNameDone ? 'text-[#0F1B2D]' : 'text-[#A0A7B4]'}>
                    Program name defined
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                    isProviderDone ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-400'
                  }`}>
                    ✓
                  </span>
                  <span className={isProviderDone ? 'text-[#0F1B2D]' : 'text-[#A0A7B4]'}>
                    Agency / Provider assigned
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                    isAmountDone ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-400'
                  }`}>
                    ✓
                  </span>
                  <span className={isAmountDone ? 'text-[#0F1B2D]' : 'text-[#A0A7B4]'}>
                    Grant amount / terms set
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                    isUrlDone ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-400'
                  }`}>
                    ✓
                  </span>
                  <span className={isUrlDone ? 'text-[#0F1B2D]' : 'text-[#A0A7B4]'}>
                    Official application portal URL
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </AdminShell>
  );
}
