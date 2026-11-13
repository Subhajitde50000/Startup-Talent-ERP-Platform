'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  CreditCard,
  Layers,
  Save,
  CheckCircle2,
  AlertCircle,
  Eye,
  Plus,
  Trash2,
  Clock,
  Sparkles,
  Info,
} from 'lucide-react';
import { AdminShell } from '@/components';
import {
  Card,
  Btn,
  toast,
} from '@/components/admin-ui';
import { initialPlans, initialEntitlements } from '../plans-data';

const DRAFT_STORAGE_KEY = 'admin_plan_draft_v1';

export default function NewPlanPage() {
  const router = useRouter();

  const emptyForm = {
    id: `plan_${Date.now()}`,
    name: '',
    role: 'Startup Founder',
    type: 'Subscription',
    monthlyPrice: '₹4,999',
    annualPrice: '₹49,999',
    status: 'Draft',
    entitlements: [
      'Priority Support',
      'AI Candidate Scorecards',
      'Verified Badge',
    ],
    newQuotaInput: '',
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
        if (parsed?.data && (parsed.data.name || parsed.data.monthlyPrice)) {
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
      toast(`Plan draft saved locally at ${timestamp}`);
    } catch (e) {
      toast('Failed to save draft to local storage');
    }
  }, [form]);

  // Auto-save every 15 seconds
  useEffect(() => {
    if (!form.name && !form.monthlyPrice) return;
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
      toast('Draft discarded. Form reset.');
    } catch (e) {}
  };

  const handleAddQuota = () => {
    if (!form.newQuotaInput.trim()) return;
    setForm((prev) => ({
      ...prev,
      entitlements: [...prev.entitlements, prev.newQuotaInput.trim()],
      newQuotaInput: '',
    }));
  };

  const handleRemoveQuota = (index) => {
    setForm((prev) => ({
      ...prev,
      entitlements: prev.entitlements.filter((_, i) => i !== index),
    }));
  };

  // Live completion meter
  const completionPercent = useMemo(() => {
    let score = 0;
    if (form.name.trim()) score += 35;
    if (form.monthlyPrice.trim()) score += 25;
    if (form.annualPrice.trim()) score += 20;
    if (form.entitlements.length > 0) score += 20;
    return score;
  }, [form]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      toast('Please enter a Plan Display Title');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      try {
        localStorage.removeItem(DRAFT_STORAGE_KEY);
      } catch (err) {}
      setIsSubmitting(false);
      toast(`Plan "${form.name}" submitted to Maker-Checker approval queue`);
      setTimeout(() => {
        router.push('/admin/plans');
      }, 600);
    }, 500);
  };

  return (
    <AdminShell active="Plans & Entitlements">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-[#E5E1D8] pb-5">
        <div className="flex items-start gap-3">
          <Link
            href="/admin/plans"
            className="p-2 rounded-lg border border-[#E5E1D8] bg-white text-[#4A5568] hover:text-[#0F1B2D] transition shrink-0 mt-1"
            title="Back to Plans"
          >
            <ArrowLeft size={16} />
          </Link>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs font-bold text-[#B8955A]">NEW PLAN TIER</span>
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
              Create New Plan / Subscription Tier
            </h1>
            <p className="text-xs text-[#4A5568] mt-0.5">
              Define customer pricing, quota packages, platform roles, and billing rules.
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
            title="Save draft to local storage"
          >
            Save Draft
          </Btn>
          <Btn
            small
            icon={CheckCircle2}
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Staging...' : 'Submit Plan (Maker-Checker)'}
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

      {/* Main Grid: Form / Quotas + Live Preview */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left 2 Cols: Plan parameters & Quotas */}
        <div className="lg:col-span-2 space-y-6">
          <Card title="Plan Parameters & Pricing" titleIcon={CreditCard}>
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label htmlFor="new-plan-name" className="block font-medium text-[#0F1B2D] mb-1.5">
                  Plan Display Title <span className="text-red-500">*</span>
                </label>
                <input
                  id="new-plan-name"
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Startup Seed Acceleration Tier"
                  className="w-full h-9 px-3 rounded-lg border border-[#E5E1D8] bg-white text-xs focus:outline-none focus:border-[#B8955A] font-medium text-[#0F1B2D]"
                  required
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label htmlFor="new-plan-monthly" className="block font-medium text-[#0F1B2D] mb-1.5">
                    Monthly Billing Price (INR) <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="new-plan-monthly"
                    type="text"
                    value={form.monthlyPrice}
                    onChange={(e) => setForm({ ...form, monthlyPrice: e.target.value })}
                    placeholder="₹4,999"
                    className="w-full h-9 px-3 rounded-lg border border-[#E5E1D8] bg-white text-xs focus:outline-none focus:border-[#B8955A]"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="new-plan-annual" className="block font-medium text-[#0F1B2D] mb-1.5">
                    Annual Billing Price (INR) <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="new-plan-annual"
                    type="text"
                    value={form.annualPrice}
                    onChange={(e) => setForm({ ...form, annualPrice: e.target.value })}
                    placeholder="₹49,999"
                    className="w-full h-9 px-3 rounded-lg border border-[#E5E1D8] bg-white text-xs focus:outline-none focus:border-[#B8955A]"
                    required
                  />
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label htmlFor="new-plan-role" className="block font-medium text-[#0F1B2D] mb-1.5">
                    Target Platform Role
                  </label>
                  <select
                    id="new-plan-role"
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    className="w-full h-9 px-3 rounded-lg border border-[#E5E1D8] bg-white text-xs focus:outline-none focus:border-[#B8955A]"
                  >
                    <option value="Startup Founder">Startup Founder</option>
                    <option value="Employer">Employer</option>
                    <option value="Job Seeker">Job Seeker</option>
                    <option value="Investor">Investor</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="new-plan-type" className="block font-medium text-[#0F1B2D] mb-1.5">
                    Plan Type / Cadence
                  </label>
                  <select
                    id="new-plan-type"
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    className="w-full h-9 px-3 rounded-lg border border-[#E5E1D8] bg-white text-xs focus:outline-none focus:border-[#B8955A]"
                  >
                    <option value="Subscription">Recurring Subscription</option>
                    <option value="One-Time Pass">One-Time Pass</option>
                    <option value="Add-On Quota Pack">Add-On Quota Pack</option>
                  </select>
                </div>
              </div>

              {/* Form Action Controls */}
              <div className="flex flex-col sm:flex-row gap-2 pt-3 border-t border-[#E5E1D8]">
                <Btn type="submit" className="flex-1" icon={CheckCircle2} disabled={isSubmitting}>
                  {isSubmitting ? 'Staging...' : 'Submit Plan (Maker-Checker)'}
                </Btn>
                <Btn type="button" secondary onClick={handleSaveDraft} className="flex-1" icon={Save}>
                  Save Draft
                </Btn>
                <Btn
                  type="button"
                  secondary
                  onClick={() => router.push('/admin/plans')}
                  className="px-4"
                >
                  Cancel
                </Btn>
              </div>
            </form>
          </Card>

          {/* Included Quotas & Entitlements */}
          <Card title="Included Quotas & Entitlements" titleIcon={Layers}>
            <div className="space-y-3 text-xs">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={form.newQuotaInput}
                  onChange={(e) => setForm({ ...form, newQuotaInput: e.target.value })}
                  placeholder="e.g. 15 Active Job Posts, Unlimited Mock Interviews..."
                  className="flex-1 h-9 px-3 rounded-lg border border-[#E5E1D8] bg-white text-xs outline-none focus:border-[#B8955A]"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddQuota();
                    }
                  }}
                />
                <Btn small secondary icon={Plus} onClick={handleAddQuota}>
                  Add Quota
                </Btn>
              </div>

              <div className="space-y-2 pt-1">
                {form.entitlements.map((ent, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-lg bg-[#FAF8F4] border border-[#E5E1D8]"
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={13} className="text-[#2E7D5B] shrink-0" />
                      <span className="font-medium text-[#0F1B2D]">{ent}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveQuota(idx)}
                      className="text-red-500 hover:text-red-700 transition p-1"
                      title="Remove Quota"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Right 1 Col: Live Catalog Card Preview & Checklist */}
        <div className="space-y-6">
          <Card title="Catalog Card Live Preview" titleIcon={Eye}>
            <div className="rounded-xl border border-[#E5E1D8] bg-white p-5 shadow-xs flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#B8955A] bg-[#F3EBDD] px-2 py-0.5 rounded">
                    {form.role}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] text-amber-700 font-semibold bg-amber-50 px-2 py-0.5 rounded">
                    {form.status}
                  </span>
                </div>

                <h3 className="text-base font-serif font-bold text-[#0F1B2D] mb-1">
                  {form.name || 'Untitled Plan Tier'}
                </h3>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-xl font-bold text-[#0F1B2D]">{form.monthlyPrice || '₹0'}</span>
                  <span className="text-xs text-[#4A5568]">/ month</span>
                  <span className="text-xs text-[#A0A7B4]">({form.annualPrice || '₹0'}/yr)</span>
                </div>

                <div className="space-y-1.5 border-t border-[#FAF8F4] pt-3 mb-2">
                  <span className="text-[11px] font-medium text-[#A0A7B4] block uppercase">Included Quotas:</span>
                  {form.entitlements.map((ent, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-xs text-[#4A5568]">
                      <CheckCircle2 size={13} className="text-[#2E7D5B] shrink-0 mt-0.5" />
                      <span>{ent}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Completion Readiness */}
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

          {/* Maker-Checker Safeguard Note */}
          <div className="rounded-xl border border-[#F3EBDD] bg-[#FAF8F4] p-4 text-xs text-[#9A7A45] space-y-2">
            <div className="flex items-center gap-2 font-semibold">
              <AlertCircle size={15} />
              <span>Maker-Checker Safeguard</span>
            </div>
            <p className="leading-relaxed text-[11px]">
              Submitting this plan places it in the pending audit queue. A secondary Finance Controller must approve before public subscriber checkout activates.
            </p>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
