'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  SlidersHorizontal,
  Save,
  CheckCircle2,
  Trash2,
  Clock,
  Sparkles,
  Info,
  ShieldAlert,
  Percent,
  Layers,
} from 'lucide-react';
import { AdminShell } from '@/components';
import {
  Card,
  Btn,
  StatChip,
  ToggleSwitch,
  toast,
} from '@/components/admin-ui';

const DRAFT_STORAGE_KEY = 'admin_feature_flag_draft_v1';

export default function NewFeatureFlagPage() {
  const router = useRouter();

  const emptyForm = {
    key: '',
    name: '',
    owner: 'product',
    rollout: 50,
    status: 'staged',
    enabled: true,
    description: '',
    targetRoles: ['Startups', 'Employers'],
  };

  const [form, setForm] = useState(emptyForm);
  const [lastAutoSaved, setLastAutoSaved] = useState(null);
  const [hasDraftNotice, setHasDraftNotice] = useState(false);
  const [draftSavedAt, setDraftSavedAt] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Restore draft if exists
  useEffect(() => {
    try {
      const saved = localStorage.getItem(DRAFT_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.data && (parsed.data.name || parsed.data.key)) {
          setForm(parsed.data);
          setDraftSavedAt(parsed.savedAt || 'Earlier session');
          setHasDraftNotice(true);
        }
      }
    } catch (e) {}
  }, []);

  // Save draft
  const handleSaveDraft = useCallback(() => {
    const timestamp = new Date().toLocaleTimeString('en-IN', { hour12: false });
    try {
      localStorage.setItem(
        DRAFT_STORAGE_KEY,
        JSON.stringify({ data: form, savedAt: timestamp })
      );
      setLastAutoSaved(timestamp);
      toast(`Feature flag draft saved locally at ${timestamp}`);
    } catch (e) {
      toast('Failed to save draft to local storage');
    }
  }, [form]);

  // Auto-save every 15s
  useEffect(() => {
    if (!form.name && !form.key) return;
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

  const handleClearDraft = () => {
    try {
      localStorage.removeItem(DRAFT_STORAGE_KEY);
      setForm(emptyForm);
      setHasDraftNotice(false);
      setLastAutoSaved(null);
      toast('Draft discarded. Form reset.');
    } catch (e) {}
  };

  // Live completion meter
  const completionPercent = useMemo(() => {
    let score = 0;
    if (form.name.trim()) score += 35;
    if (form.key.trim()) score += 35;
    if (form.description.trim()) score += 20;
    if (form.owner) score += 10;
    return score;
  }, [form]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.key.trim()) {
      toast('Please provide a Flag Name and Unique Key Identifier');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      try {
        localStorage.removeItem(DRAFT_STORAGE_KEY);
      } catch (err) {}
      setIsSubmitting(false);
      toast(`Feature flag "${form.name}" successfully created and staged for rollout`);
      setTimeout(() => {
        router.push('/admin/config');
      }, 600);
    }, 500);
  };

  return (
    <AdminShell active="Configuration">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-[#E5E1D8] pb-5">
        <div className="flex items-start gap-3">
          <Link
            href="/admin/config"
            className="p-2 rounded-lg border border-[#E5E1D8] bg-white text-[#4A5568] hover:text-[#0F1B2D] transition shrink-0 mt-1"
            title="Back to Configuration"
          >
            <ArrowLeft size={16} />
          </Link>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs font-bold text-[#B8955A]">FEATURE FLAG REGISTRY</span>
              <span className="px-2 py-0.5 rounded text-[10px] bg-amber-100 text-amber-800 font-medium">
                Draft (Staged)
              </span>
              {lastAutoSaved && (
                <span className="text-[10px] text-[#A0A7B4] flex items-center gap-1 font-mono">
                  <Clock size={11} /> Auto-saved at {lastAutoSaved}
                </span>
              )}
            </div>
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#0F1B2D]">
              Create New Feature Flag & Canary Rollout
            </h1>
            <p className="text-xs text-[#4A5568] mt-0.5">
              Register a dynamic configuration switch, set rollout quotas, and define targeted roles.
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
            title="Save draft"
          >
            Save Draft
          </Btn>
          <Btn
            small
            icon={CheckCircle2}
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Deploying...' : 'Deploy Flag'}
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

      {/* Main Grid: Form + Live Preview */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left 2 Cols: Flag Parameters */}
        <div className="lg:col-span-2 space-y-6">
          <Card title="Feature Flag Configuration" titleIcon={SlidersHorizontal}>
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label htmlFor="flag-name" className="block font-semibold text-[#0F1B2D] mb-1.5">
                  Feature Flag Display Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="flag-name"
                  type="text"
                  value={form.name}
                  onChange={(e) => {
                    const name = e.target.value;
                    const autoKey = name
                      .toLowerCase()
                      .replace(/[^a-z0-9]+/g, '-')
                      .replace(/^-|-$/g, '');
                    setForm((prev) => ({
                      ...prev,
                      name,
                      key: prev.key === '' || prev.key === autoKey.slice(0, -1) ? autoKey : prev.key,
                    }));
                  }}
                  placeholder="e.g. AI Voice Interview Practice v2"
                  className="w-full h-9 px-3 rounded-lg border border-[#E5E1D8] bg-white text-xs focus:outline-none focus:border-[#B8955A] font-medium text-[#0F1B2D]"
                  required
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label htmlFor="flag-key" className="block font-semibold text-[#0F1B2D] mb-1.5">
                    Unique Key Identifier <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="flag-key"
                    type="text"
                    value={form.key}
                    onChange={(e) => setForm({ ...form, key: e.target.value })}
                    placeholder="ai-interview-practice-v2"
                    className="w-full h-9 px-3 rounded-lg border border-[#E5E1D8] bg-white text-xs focus:outline-none focus:border-[#B8955A] font-mono text-[#0F1B2D]"
                    required
                  />
                  <p className="text-[11px] text-[#A0A7B4] mt-1">Used in code: `if (useFeature('{form.key || 'key'}'))`</p>
                </div>

                <div>
                  <label htmlFor="flag-owner" className="block font-semibold text-[#0F1B2D] mb-1.5">
                    Owner Engineering Squad
                  </label>
                  <select
                    id="flag-owner"
                    value={form.owner}
                    onChange={(e) => setForm({ ...form, owner: e.target.value })}
                    className="w-full h-9 px-3 rounded-lg border border-[#E5E1D8] bg-white text-xs focus:outline-none focus:border-[#B8955A]"
                  >
                    <option value="product">Product Engineering</option>
                    <option value="ai-quality">AI Quality & Models</option>
                    <option value="trust">Trust, Safety & KYC</option>
                    <option value="security">Infrastructure & Security</option>
                    <option value="platform">Platform Core SRE</option>
                  </select>
                </div>
              </div>

              {/* Rollout Slider & Initial Toggle */}
              <div className="p-4 rounded-xl border border-[#E5E1D8] bg-[#FAF8F4] space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-xs text-[#0F1B2D] block">Initial Activation State</span>
                    <span className="text-[11px] text-[#4A5568]">Enable flag evaluation upon creation</span>
                  </div>
                  <ToggleSwitch
                    checked={form.enabled}
                    onChange={() => setForm((prev) => ({ ...prev, enabled: !prev.enabled }))}
                    label="Toggle feature flag"
                    id="new-flag-toggle"
                  />
                </div>

                <div className="pt-2 border-t border-[#E5E1D8] space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-[#0F1B2D]">Canary Rollout Percentage</span>
                    <span className="font-mono font-bold text-sm text-[#B8955A]">{form.rollout}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={form.rollout}
                    onChange={(e) => setForm({ ...form, rollout: Number(e.target.value) })}
                    className="w-full accent-[#B8955A] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-[#A0A7B4]">
                    <span>0% (Internal only)</span>
                    <span>50% (Canary)</span>
                    <span>100% (General Availability)</span>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="flag-desc" className="block font-semibold text-[#0F1B2D] mb-1.5">
                  Description & Rollout Purpose
                </label>
                <textarea
                  id="flag-desc"
                  rows={2}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Detail what this flag controls and fallback behavior if disabled..."
                  className="w-full p-3 rounded-lg border border-[#E5E1D8] bg-white text-xs focus:outline-none focus:border-[#B8955A]"
                />
              </div>

              {/* Form Action Controls */}
              <div className="flex flex-col sm:flex-row gap-2 pt-3 border-t border-[#E5E1D8]">
                <Btn type="submit" className="flex-1" icon={CheckCircle2} disabled={isSubmitting}>
                  {isSubmitting ? 'Deploying...' : 'Deploy Feature Flag'}
                </Btn>
                <Btn type="button" secondary onClick={handleSaveDraft} className="flex-1" icon={Save}>
                  Save Draft
                </Btn>
                <Btn
                  type="button"
                  secondary
                  onClick={() => router.push('/admin/config')}
                  className="px-4"
                >
                  Cancel
                </Btn>
              </div>
            </form>
          </Card>
        </div>

        {/* Right 1 Col: Live Registry Card & Readiness */}
        <div className="space-y-6">
          <Card title="Live Flag Preview" titleIcon={SlidersHorizontal}>
            <div className="rounded-xl border border-[#E5E1D8] bg-[#FAF8F4] p-4 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-[#B8955A]">{form.key || 'flag-key'}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                  form.enabled ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-600'
                }`}>
                  {form.enabled ? 'ENABLED' : 'DISABLED'}
                </span>
              </div>

              <div>
                <h4 className="font-bold text-sm text-[#0F1B2D]">
                  {form.name || 'Untitled Feature Flag'}
                </h4>
                <p className="text-[11px] text-[#4A5568] mt-1">
                  Owner: <span className="capitalize font-semibold text-[#0F1B2D]">{form.owner}</span>
                </p>
              </div>

              <div className="space-y-1 bg-white border border-[#E5E1D8] p-2.5 rounded-lg text-[11px]">
                <div className="flex justify-between">
                  <span className="text-[#4A5568]">Rollout Exposure:</span>
                  <span className="font-mono font-bold text-[#0F1B2D]">{form.rollout}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#4A5568]">Environment:</span>
                  <span className="font-medium text-[#286749]">Production Clusters</span>
                </div>
              </div>

              <p className="text-[#4A5568] text-[11px] leading-relaxed">
                {form.description || 'No description entered yet.'}
              </p>
            </div>

            {/* Completeness Meter */}
            <div className="mt-4 pt-3 border-t border-[#E5E1D8] space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-[#4A5568]">Configuration Completeness</span>
                <span className="font-bold text-[#0F1B2D]">{completionPercent}%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-gray-100 overflow-hidden">
                <div
                  className="h-full bg-[#B8955A] transition-all duration-300"
                  style={{ width: `${completionPercent}%` }}
                />
              </div>
            </div>
          </Card>

          <div className="p-4 rounded-xl border border-[#E5E1D8] bg-white space-y-2 text-xs">
            <div className="flex items-center gap-2 font-semibold text-[#0F1B2D]">
              <Info size={14} className="text-[#B8955A]" />
              <span>Etcd Key-Value Sync</span>
            </div>
            <p className="text-[#4A5568] text-[11px] leading-relaxed">
              Upon deployment, this flag is propagated instantly to edge clusters and front-facing microservices within 400ms.
            </p>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
