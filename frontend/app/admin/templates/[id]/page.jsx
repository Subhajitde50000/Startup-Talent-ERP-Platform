'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  FileText,
  Save,
  CheckCircle2,
  ExternalLink,
  Code,
  Tag,
  Copy,
  Eye,
  SlidersHorizontal,
  RotateCcw,
  Sparkles,
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

export default function TemplateEditorPage({ params }) {
  const router = useRouter();
  const templateId = params?.id || 'TPL-2026-00109';

  // Find existing template or fallback default
  const existing = useMemo(() => {
    return (
      initialTemplates.find((t) => t.id === templateId) || {
        id: templateId,
        type: 'templates',
        category: 'Offer Letters',
        title: 'New Standard Contract Template',
        audience: 'Startups & Employers',
        status: 'published',
        version: 'v1.0',
        owner: 'Talent Acquisition Team',
        lastUpdated: 'Today',
        views: '0',
        feedbackScore: '100%',
        description: 'Standard contractual framework for startup talent engagements.',
        contentBody: `### CONTRACT AGREEMENT

**DATE**: {{EFFECTIVE_DATE}}
**PARTIES**: {{COMPANY_NAME}} & {{CANDIDATE_NAME}}

1. **APPOINTMENT**
   Position: {{ROLE_TITLE}}

2. **COMPENSATION**
   Annual CTC: ₹{{ANNUAL_CTC}}`,
        tags: ['Draft', 'Contract'],
      }
    );
  }, [templateId]);

  // Form states matching fields exactly
  const [title, setTitle] = useState(existing.title);
  const [category, setCategory] = useState(existing.category);
  const [audience, setAudience] = useState(existing.audience);
  const [version, setVersion] = useState(existing.version);
  const [status, setStatus] = useState(existing.status);
  const [owner, setOwner] = useState(existing.owner);
  const [description, setDescription] = useState(existing.description);
  const [contentBody, setContentBody] = useState(existing.contentBody);
  const [tagsInput, setTagsInput] = useState((existing.tags || []).join(', '));
  const [activeTab, setActiveTab] = useState('editor'); // editor | preview
  const [isSaving, setIsSaving] = useState(false);

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

  const handleInsertToken = (token) => {
    setContentBody((prev) => prev + ` ${token} `);
    toast(`Inserted token ${token}`);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!title.trim() || !contentBody.trim()) {
      toast('Please provide a Title and Template Document Content');
      return;
    }
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast(`Template ${existing.id} updated and published successfully`);
      setTimeout(() => {
        router.push('/admin/templates');
      }, 500);
    }, 400);
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
              <span className="font-mono text-xs font-bold text-[#B8955A]">{existing.id}</span>
              <span className="px-2 py-0.5 rounded text-[10px] bg-[#FAF8F4] border border-[#E5E1D8] text-[#4A5568] font-medium">
                {category}
              </span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                status === 'published' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
              }`}>
                {status}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#0F1B2D]">
              Edit Template: {title}
            </h1>
            <p className="text-xs text-[#4A5568] mt-0.5">
              Direct markdown document editor with dynamic variable tokens and live preview.
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Link
            href="/admin/templates"
            className="px-3 py-1.5 rounded-lg border border-[#E5E1D8] bg-white text-xs font-medium text-[#4A5568] hover:text-[#0F1B2D] transition"
          >
            Cancel
          </Link>
          <Btn
            small
            icon={Save}
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Btn>
        </div>
      </div>

      {/* Main Grid: Form / Editor + Sidebar Preview */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left 2 Cols: Template Details & Markdown Body */}
        <div className="lg:col-span-2 space-y-6">
          <Card title="Contract Template Configuration" titleIcon={FileText}>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#0F1B2D] mb-1">
                  Template Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Executive Founder Offer Letter with Vesting Schedule"
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
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
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
                    value={audience}
                    onChange={(e) => setAudience(e.target.value)}
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
                    value={version}
                    onChange={(e) => setVersion(e.target.value)}
                    placeholder="e.g. v3.2"
                    className="w-full h-9 rounded-lg border border-[#E5E1D8] bg-white px-3 text-xs outline-none focus:border-[#B8955A] font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0F1B2D] mb-1">
                    Publication Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full h-9 rounded-lg border border-[#E5E1D8] bg-white px-3 text-xs outline-none focus:border-[#B8955A]"
                  >
                    {TEMPLATE_STATUSES.map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0F1B2D] mb-1">
                    Author / Quorum Authority
                  </label>
                  <input
                    type="text"
                    value={owner}
                    onChange={(e) => setOwner(e.target.value)}
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
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
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
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="e.g. Executive, ESOP, Founder Stage, Offer Letter"
                  className="w-full h-9 rounded-lg border border-[#E5E1D8] bg-white px-3 text-xs outline-none focus:border-[#B8955A]"
                />
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
                  {contentBody.length} characters
                </span>
              </div>

              {activeTab === 'editor' ? (
                <div>
                  <textarea
                    rows={16}
                    value={contentBody}
                    onChange={(e) => setContentBody(e.target.value)}
                    placeholder="Write contract template in Markdown or legal text formatting..."
                    className="w-full rounded-lg border border-[#E5E1D8] bg-white p-3 font-mono text-xs outline-none focus:border-[#B8955A] leading-relaxed"
                  />
                  <p className="text-[11px] text-[#A0A7B4] mt-1">
                    Supports Markdown headers (###), bold, bullet lists, and double curly bracket tokens.
                  </p>
                </div>
              ) : (
                <div className="rounded-lg border border-[#E5E1D8] bg-white p-5 min-h-[300px] font-mono text-xs whitespace-pre-wrap leading-relaxed text-[#0F1B2D]">
                  {contentBody || <span className="text-gray-400 italic">No document text entered yet.</span>}
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Right 1 Col: Metadata & Live Inspector Card */}
        <div className="space-y-6">
          <Card title="Live Template Inspector" titleIcon={Eye}>
            <div className="rounded-xl border border-[#E5E1D8] bg-[#FAF8F4] p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-[#B8955A]">{existing.id}</span>
                <span className="text-[10px] px-2 py-0.5 rounded font-semibold bg-emerald-100 text-emerald-800">
                  {status}
                </span>
              </div>
              <h3 className="font-serif font-bold text-sm text-[#0F1B2D] leading-snug">
                {title || 'Untitled Contract Template'}
              </h3>
              <p className="text-xs text-[#4A5568] line-clamp-3">
                {description || 'No description provided.'}
              </p>
              <div className="pt-2 border-t border-[#E5E1D8] space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#A0A7B4]">Category:</span>
                  <span className="font-medium text-[#0F1B2D]">{category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#A0A7B4]">Audience:</span>
                  <span className="font-medium text-[#0F1B2D]">{audience}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#A0A7B4]">Version:</span>
                  <span className="font-mono font-medium text-[#0F1B2D]">{version}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#A0A7B4]">Authority:</span>
                  <span className="font-medium text-[#0F1B2D]">{owner}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 rounded-lg border border-[#E5E1D8] bg-white space-y-2 text-xs">
              <div className="font-semibold text-[#0F1B2D] flex items-center gap-1.5">
                <Info size={13} className="text-[#B8955A]" />
                <span>Governance & Verification</span>
              </div>
              <p className="text-[11px] text-[#4A5568] leading-relaxed">
                Changes to this template are immediately synchronized with the Talent Acquisition contracts generator and Employer job offer creation workflows.
              </p>
            </div>

            <div className="mt-4 pt-2">
              <Btn
                fullWidth
                icon={Save}
                onClick={handleSave}
                disabled={isSaving}
              >
                {isSaving ? 'Updating...' : 'Publish Update'}
              </Btn>
            </div>
          </Card>
        </div>
      </div>
    </AdminShell>
  );
}
