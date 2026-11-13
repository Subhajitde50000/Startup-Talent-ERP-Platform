'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  FileText,
  Save,
  CheckCircle2,
  ExternalLink,
  Plus,
  Trash2,
  Clock,
  Sparkles,
  RotateCcw,
  AlertCircle,
  Eye,
  Code,
  Tag,
  Info,
} from 'lucide-react';
import { AdminShell } from '@/components';
import {
  Card,
  Btn,
  StatChip,
  toast,
} from '@/components/admin-ui';
import {
  initialTemplates,
  TEMPLATE_CATEGORIES,
  TEMPLATE_STATUSES,
  TEMPLATE_AUDIENCES,
} from '../templates-data';

const DRAFT_STORAGE_KEY = 'admin_template_draft_v1';

export default function NewTemplatePage() {
  const router = useRouter();

  const emptyForm = {
    title: '',
    category: 'Offer Letters',
    audience: 'Startups & Employers',
    version: 'v1.0',
    status: 'draft',
    owner: 'Talent Acquisition Team',
    description: '',
    contentBody: `### CONTRACT AGREEMENT

**EFFECTIVE DATE**: {{EFFECTIVE_DATE}}
**PARTIES**: {{COMPANY_NAME}} & {{CANDIDATE_NAME}}

1. **APPOINTMENT**
   Position: {{ROLE_TITLE}}

2. **COMPENSATION & TERMS**
   - Annual CTC: ₹{{ANNUAL_CTC}}
   - Equity Allocation: {{EQUITY_PERCENTAGE}}%

3. **GOVERNING LAW**
   This agreement is subject to the jurisdiction of the High Court of Karnataka/Delhi.`,
    tagsInput: 'Executive, ESOP, Offer Letter',
  };

  const [form, setForm] = useState(emptyForm);
  const [lastAutoSaved, setLastAutoSaved] = useState(null);
  const [hasDraftNotice, setHasDraftNotice] = useState(false);
  const [draftSavedAt, setDraftSavedAt] = useState('');
  const [activeTab, setActiveTab] = useState('editor'); // editor | preview
  const [isPublishing, setIsPublishing] = useState(false);

  // Available token tags for quick insertion
  const tokens = [
    '{{COMPANY_NAME}}',
    '{{CANDIDATE_NAME}}',
    '{{ROLE_TITLE}}',
    '{{EFFECTIVE_DATE}}',
    '{{ANNUAL_CTC}}',
    '{{EQUITY_PERCENTAGE}}',
    '{{DURATION_MONTHS}}',
  ];

  // Load draft on mount if available
  useEffect(() => {
    try {
      const saved = localStorage.getItem(DRAFT_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.data && (parsed.data.title || parsed.data.contentBody)) {
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
      toast(`Template draft saved locally at ${timestamp}`);
    } catch (e) {
      toast('Failed to save draft to local storage');
    }
  }, [form]);

  // Auto-save every 15 seconds if content exists
  useEffect(() => {
    if (!form.title && !form.description) return;
    const interval = setInterval(() => {
      try {
        const timestamp = new Date().toLocaleTimeString('en-IN', { hour12: false });
        localStorage.setItem(
          DRAFT_STORAGE_KEY,
          JSON.stringify({ data: form, savedAt: timestamp })
        );
        setLastAutoSaved(timestamp);
      } catch (e) {
        // silent fail on auto-save
      }
    }, 15000);

    return () => clearInterval(interval);
  }, [form]);

  const handleClearDraft = () => {
    try {
      localStorage.removeItem(DRAFT_STORAGE_KEY);
      setForm(emptyForm);
      setHasDraftNotice(false);
      setLastAutoSaved(null);
      toast('Draft cleared. Form reset to default template.');
    } catch (e) {
      // silent
    }
  };

  const handleInsertToken = (token) => {
    setForm((prev) => ({
      ...prev,
      contentBody: prev.contentBody + ` ${token} `,
    }));
    toast(`Inserted token ${token}`);
  };

  // Live completion meter
  const completionPercentage = useMemo(() => {
    let score = 0;
    if (form.title.trim()) score += 25;
    if (form.category) score += 15;
    if (form.audience) score += 10;
    if (form.description.trim()) score += 15;
    if (form.contentBody.trim()) score += 25;
    if (form.tagsInput.trim()) score += 10;
    return score;
  }, [form]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.contentBody.trim()) {
      toast('Please enter a Template Title and Contract Body');
      return;
    }

    setIsPublishing(true);
    setTimeout(() => {
      try {
        localStorage.removeItem(DRAFT_STORAGE_KEY);
      } catch (err) {}
      setIsPublishing(false);
      toast(`New Template "${form.title}" published successfully to Templates Library`);
      setTimeout(() => {
        router.push('/admin/templates');
      }, 500);
    }, 500);
  };

  return (
    <AdminShell active="Templates & Rubrics">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-[#E5E1D8] pb-5">
        <div className="flex items-start gap-3">
          <Link
            href="/admin/templates"
            className="p-2 rounded-lg border border-[#E5E1D8] bg-white text-[#4A5568] hover:text-[#0F1B2D] transition shrink-0 mt-1"
            title="Back to Templates"
          >
            <ArrowLeft size={16} />
          </Link>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs font-bold text-[#B8955A]">NEW TEMPLATE</span>
              <span className="px-2 py-0.5 rounded text-[10px] bg-amber-100 text-amber-800 font-medium">
                Draft (Unpublished)
              </span>
              {lastAutoSaved && (
                <span className="text-[10px] text-[#A0A7B4] flex items-center gap-1 font-mono">
                  <Clock size={11} /> Auto-saved at {lastAutoSaved}
                </span>
              )}
            </div>
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#0F1B2D]">
              Create New Contract & Offer Template
            </h1>
            <p className="text-xs text-[#4A5568] mt-0.5">
              Draft a standardized legal or HR document with dynamic tokens, auto-save protection, and live preview.
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Btn
            small
            secondary
            icon={Save}
            onClick={handleSaveDraft}
            title="Save draft to browser storage"
          >
            Save Draft
          </Btn>
          <Btn
            small
            icon={CheckCircle2}
            onClick={handleSubmit}
            disabled={isPublishing}
          >
            {isPublishing ? 'Publishing...' : 'Publish Template'}
          </Btn>
        </div>
      </div>

      {/* Draft Notification Banner */}
      {hasDraftNotice && (
        <div className="mb-6 p-3 rounded-xl border border-[#B8955A]/50 bg-[#FAF8F4] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5 text-[#0F1B2D]">
            <Sparkles size={16} className="text-[#B8955A] shrink-0" />
            <span>
              <strong>Draft restored</strong> from {draftSavedAt}. Your unsaved modifications have been recovered.
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setHasDraftNotice(false)}
              className="text-[#4A5568] hover:text-[#0F1B2D] px-2 py-1 text-xs underline"
            >
              Dismiss
            </button>
            <button
              type="button"
              onClick={handleClearDraft}
              className="inline-flex items-center gap-1 text-red-600 hover:text-red-700 px-2 py-1 text-xs font-semibold"
            >
              <Trash2 size={12} />
              <span>Discard Draft</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Grid: Form / Body + Inspector */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left 2 Cols: Form fields + Document editor */}
        <div className="lg:col-span-2 space-y-6">
          <Card title="Contract Template Information" titleIcon={FileText}>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#0F1B2D] mb-1">
                  Template Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Standard Executive Founder Offer Letter with Vesting Schedule"
                  className="w-full h-9 rounded-lg border border-[#E5E1D8] bg-white px-3 text-xs outline-none focus:border-[#B8955A] font-medium text-[#0F1B2D]"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#0F1B2D] mb-1">
                    Template Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full h-9 rounded-lg border border-[#E5E1D8] bg-white px-3 text-xs outline-none focus:border-[#B8955A]"
                  >
                    {TEMPLATE_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0F1B2D] mb-1">
                    Target Audience <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={form.audience}
                    onChange={(e) => setForm({ ...form, audience: e.target.value })}
                    className="w-full h-9 rounded-lg border border-[#E5E1D8] bg-white px-3 text-xs outline-none focus:border-[#B8955A]"
                  >
                    {TEMPLATE_AUDIENCES.map((aud) => (
                      <option key={aud} value={aud}>{aud}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#0F1B2D] mb-1">
                    Version Code
                  </label>
                  <input
                    type="text"
                    value={form.version}
                    onChange={(e) => setForm({ ...form, version: e.target.value })}
                    placeholder="e.g. v1.0"
                    className="w-full h-9 rounded-lg border border-[#E5E1D8] bg-white px-3 text-xs outline-none focus:border-[#B8955A] font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0F1B2D] mb-1">
                    Status
                  </label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    className="w-full h-9 rounded-lg border border-[#E5E1D8] bg-white px-3 text-xs outline-none focus:border-[#B8955A]"
                  >
                    {TEMPLATE_STATUSES.map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0F1B2D] mb-1">
                    Author / Authority
                  </label>
                  <input
                    type="text"
                    value={form.owner}
                    onChange={(e) => setForm({ ...form, owner: e.target.value })}
                    placeholder="e.g. Talent Acquisition Team"
                    className="w-full h-9 rounded-lg border border-[#E5E1D8] bg-white px-3 text-xs outline-none focus:border-[#B8955A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0F1B2D] mb-1">
                  Summary Description
                </label>
                <textarea
                  rows={2}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Short description highlighting the legal context and intended use-case..."
                  className="w-full rounded-lg border border-[#E5E1D8] bg-white p-3 text-xs outline-none focus:border-[#B8955A]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0F1B2D] mb-1">
                  Tags & Search Keywords (comma-separated)
                </label>
                <input
                  type="text"
                  value={form.tagsInput}
                  onChange={(e) => setForm({ ...form, tagsInput: e.target.value })}
                  placeholder="e.g. Executive, ESOP, Founder Stage, Offer Letter"
                  className="w-full h-9 rounded-lg border border-[#E5E1D8] bg-white px-3 text-xs outline-none focus:border-[#B8955A]"
                />
              </div>

              {/* Form Action Controls inside Primary Form Card */}
              <div className="flex flex-col sm:flex-row gap-2 pt-3 border-t border-[#E5E1D8]">
                <Btn type="submit" className="flex-1" icon={CheckCircle2} disabled={isPublishing}>
                  {isPublishing ? 'Publishing...' : 'Publish Template'}
                </Btn>
                <Btn type="button" secondary onClick={handleSaveDraft} className="flex-1" icon={Save}>
                  Save Draft
                </Btn>
                <Btn
                  type="button"
                  secondary
                  onClick={() => router.push('/admin/templates')}
                  className="px-4"
                >
                  Cancel
                </Btn>
              </div>
            </form>
          </Card>

          {/* Document Content Body & Live Editor */}
          <Card title="Contract Document Content" titleIcon={Code}>
            <div className="space-y-3">
              {/* Token quick inserter bar */}
              <div className="flex flex-wrap items-center gap-1.5 p-2 rounded-lg bg-[#FAF8F4] border border-[#E5E1D8]">
                <span className="text-[10px] font-semibold text-[#8C6B32] uppercase tracking-wider flex items-center gap-1 mr-1">
                  <Sparkles size={11} /> Quick Tokens:
                </span>
                {tokens.map((tok) => (
                  <button
                    key={tok}
                    type="button"
                    onClick={() => handleInsertToken(tok)}
                    className="px-2 py-0.5 rounded border border-[#E5E1D8] bg-white hover:bg-[#F3EBDD] hover:border-[#B8955A] font-mono text-[10px] text-[#0F1B2D] transition shadow-2xs"
                  >
                    {tok}
                  </button>
                ))}
              </div>

              {/* Editor / Preview switcher */}
              <div className="flex items-center justify-between border-b border-[#E5E1D8] pb-2">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('editor')}
                    className={`px-3 py-1 text-xs font-semibold rounded-md transition ${
                      activeTab === 'editor'
                        ? 'bg-[#0F1B2D] text-white'
                        : 'text-[#4A5568] hover:bg-gray-100'
                    }`}
                  >
                    Markdown Editor
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('preview')}
                    className={`px-3 py-1 text-xs font-semibold rounded-md transition ${
                      activeTab === 'preview'
                        ? 'bg-[#0F1B2D] text-white'
                        : 'text-[#4A5568] hover:bg-gray-100'
                    }`}
                  >
                    Document Preview
                  </button>
                </div>
                <span className="text-[11px] text-[#A0A7B4] font-mono">
                  {form.contentBody.length} characters
                </span>
              </div>

              {activeTab === 'editor' ? (
                <div>
                  <textarea
                    rows={16}
                    value={form.contentBody}
                    onChange={(e) => setForm({ ...form, contentBody: e.target.value })}
                    placeholder="Write contract template in Markdown or legal text formatting..."
                    className="w-full rounded-lg border border-[#E5E1D8] bg-white p-3 font-mono text-xs outline-none focus:border-[#B8955A] leading-relaxed"
                  />
                  <p className="text-[11px] text-[#A0A7B4] mt-1">
                    Supports Markdown headers (###), bold, bullet lists, and double curly bracket tokens.
                  </p>
                </div>
              ) : (
                <div className="rounded-lg border border-[#E5E1D8] bg-white p-5 min-h-[300px] font-mono text-xs whitespace-pre-wrap leading-relaxed text-[#0F1B2D]">
                  {form.contentBody || <span className="text-gray-400 italic">No document text entered yet.</span>}
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Right 1 Col: Live Inspector & Completion Progress */}
        <div className="space-y-6">
          <Card title="Form Progress & Live Inspector" titleIcon={Eye}>
            {/* Completion Meter */}
            <div className="mb-4 space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold text-[#0F1B2D]">
                <span>Document Completeness</span>
                <span className="font-mono text-[#B8955A]">{completionPercentage}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
                <div
                  className="h-full bg-[#B8955A] transition-all duration-300"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
            </div>

            <div className="rounded-xl border border-[#E5E1D8] bg-[#FAF8F4] p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-[#B8955A]">TPL-NEW-DRAFT</span>
                <span className="text-[10px] px-2 py-0.5 rounded font-semibold bg-amber-100 text-amber-800">
                  {form.status}
                </span>
              </div>
              <h3 className="font-serif font-bold text-sm text-[#0F1B2D] leading-snug">
                {form.title || 'Untitled Contract Template'}
              </h3>
              <p className="text-xs text-[#4A5568] line-clamp-3">
                {form.description || 'No description provided yet.'}
              </p>
              <div className="pt-2 border-t border-[#E5E1D8] space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#A0A7B4]">Category:</span>
                  <span className="font-medium text-[#0F1B2D]">{form.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#A0A7B4]">Audience:</span>
                  <span className="font-medium text-[#0F1B2D]">{form.audience}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#A0A7B4]">Version:</span>
                  <span className="font-mono font-medium text-[#0F1B2D]">{form.version}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#A0A7B4]">Authority:</span>
                  <span className="font-medium text-[#0F1B2D]">{form.owner}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 rounded-lg border border-[#E5E1D8] bg-white space-y-2 text-xs">
              <div className="font-semibold text-[#0F1B2D] flex items-center gap-1.5">
                <Info size={13} className="text-[#B8955A]" />
                <span>Governance & Verification</span>
              </div>
              <p className="text-[11px] text-[#4A5568] leading-relaxed">
                When published, this template is indexed immediately across all Employer offer generation flows.
              </p>
            </div>

            <div className="mt-4 pt-2 space-y-2">
              <Btn
                fullWidth
                icon={CheckCircle2}
                onClick={handleSubmit}
                disabled={isPublishing}
              >
                {isPublishing ? 'Publishing...' : 'Publish Template'}
              </Btn>
              <Btn
                fullWidth
                secondary
                icon={Save}
                onClick={handleSaveDraft}
              >
                Save as Draft
              </Btn>
            </div>
          </Card>
        </div>
      </div>
    </AdminShell>
  );
}
