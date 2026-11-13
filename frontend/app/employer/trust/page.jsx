'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  EmployerShell,
  EmployerBtn,
  EmployerCard,
  StageChip,
  EmployerSafetyStrip as SafetyStrip,
} from '@/components';
import {
  company,
  recentTrustEvents,
  trustSummary,
} from '@/app/employer/employer-data';
import {
  AlertTriangle,
  BadgeCheck,
  CheckCircle2,
  FileCheck,
  FileText,
  Lock,
  Scale,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Upload,
  X,
  FileQuestion,
} from 'lucide-react';

function TrustContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams?.get('tab') || 'Overview';

  const [activeTab, setActiveTab] = useState(
    initialTab === 'verification' ? 'Verification & Compliance' : initialTab === 'reports' ? 'Reports and flags' : 'Overview'
  );
  const [toastMessage, setToastMessage] = useState(null);

  // Appeal modal state
  const [showAppealModal, setShowAppealModal] = useState(false);
  const [appealReason, setAppealReason] = useState('');

  // Report problem modal state
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportIssue, setReportIssue] = useState('Misleading profile');
  const [reportDetails, setReportDetails] = useState('');

  useEffect(() => {
    const tabParam = searchParams?.get('tab');
    if (tabParam === 'verification') {
      setActiveTab('Verification & Compliance');
    } else if (tabParam === 'reports') {
      setActiveTab('Reports and flags');
    }
  }, [searchParams]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSendAppeal = (e) => {
    e.preventDefault();
    setShowAppealModal(false);
    showToast('Appeal submitted to Platform Trust & Safety board for 24h review.');
    setAppealReason('');
  };

  const handleReportProblem = (e) => {
    e.preventDefault();
    setShowReportModal(false);
    showToast('Dispute report logged. An ethics officer has been assigned.');
    setReportDetails('');
  };

  const tabs = [
    'Overview',
    'Verification & Compliance',
    'Reports and flags',
    'Posting rules',
    'Blocked candidates',
  ];

  return (
    <EmployerShell active="/employer/trust">
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 rounded-xl bg-[#0F1B2D] px-4 py-3 text-sm text-white shadow-xl flex items-center gap-2 border border-[#B8955A]/30"
        >
          <CheckCircle2 size={16} className="text-[#D4AF37]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Appeal Modal */}
      {showAppealModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="appeal-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        >
          <div className="w-full max-w-lg rounded-2xl border border-[#E5E1D8] bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E1D8]">
              <h3 id="appeal-modal-title" className="text-base font-semibold text-[#0F1B2D]">
                Submit Compliance Appeal
              </h3>
              <button
                type="button"
                onClick={() => setShowAppealModal(false)}
                className="text-[#4A5568] hover:text-[#0F1B2D]"
                aria-label="Close dialog"
              >
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSendAppeal} className="mt-4 space-y-4">
              <p className="text-xs text-[#4A5568]">
                If a job listing was flagged in error, submit clarifying documentation for manual re-assessment.
              </p>
              <div>
                <label htmlFor="appeal-text" className="block text-xs font-medium text-[#0F1B2D] mb-1">
                  Appeal Explanation & Context
                </label>
                <textarea
                  id="appeal-text"
                  rows={4}
                  required
                  value={appealReason}
                  onChange={(e) => setAppealReason(e.target.value)}
                  placeholder="Explain why the compensation breakdown meets Northstar transparent pay standards..."
                  className="w-full rounded-lg border border-[#E5E1D8] p-2.5 text-xs text-[#0F1B2D] focus:border-[#B8955A] focus:outline-none"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <EmployerBtn variant="secondary" size="sm" onClick={() => setShowAppealModal(false)}>
                  Cancel
                </EmployerBtn>
                <EmployerBtn type="submit" variant="primary" size="sm">
                  Submit Appeal
                </EmployerBtn>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Report Problem Modal */}
      {showReportModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="report-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        >
          <div className="w-full max-w-lg rounded-2xl border border-[#E5E1D8] bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E1D8]">
              <h3 id="report-modal-title" className="text-base font-semibold text-[#0F1B2D]">
                Report Candidate Misconduct or Risk
              </h3>
              <button
                type="button"
                onClick={() => setShowReportModal(false)}
                className="text-[#4A5568] hover:text-[#0F1B2D]"
                aria-label="Close dialog"
              >
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleReportProblem} className="mt-4 space-y-4">
              <div>
                <label htmlFor="report-issue" className="block text-xs font-medium text-[#0F1B2D] mb-1">
                  Violation Category
                </label>
                <select
                  id="report-issue"
                  value={reportIssue}
                  onChange={(e) => setReportIssue(e.target.value)}
                  className="w-full rounded-lg border border-[#E5E1D8] bg-white px-3 py-2 text-xs text-[#0F1B2D] focus:border-[#B8955A] focus:outline-none"
                >
                  <option value="Misleading profile">Misleading Credentials / Fraudulent Experience</option>
                  <option value="No-show">Interview No-Show without Notice</option>
                  <option value="Harassment">Unprofessional / Abusive Behavior</option>
                  <option value="NDA Breach">Proprietary Information Breach</option>
                </select>
              </div>
              <div>
                <label htmlFor="report-details" className="block text-xs font-medium text-[#0F1B2D] mb-1">
                  Incident Details & Evidence
                </label>
                <textarea
                  id="report-details"
                  rows={4}
                  required
                  value={reportDetails}
                  onChange={(e) => setReportDetails(e.target.value)}
                  placeholder="Provide timestamps and specific context..."
                  className="w-full rounded-lg border border-[#E5E1D8] p-2.5 text-xs text-[#0F1B2D] focus:border-[#B8955A] focus:outline-none"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <EmployerBtn variant="secondary" size="sm" onClick={() => setShowReportModal(false)}>
                  Cancel
                </EmployerBtn>
                <EmployerBtn type="submit" variant="primary" size="sm">
                  Log Incident
                </EmployerBtn>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-[1280px] space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 border border-emerald-200">
                <BadgeCheck size={14} /> Good Standing
              </span>
              <span className="text-xs text-[#4A5568]">Verified Organization</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F1B2D]">
              Trust, Safety & Fair Hiring Center
            </h1>
            <p className="text-xs sm:text-sm text-[#4A5568]">
              Ensure compliance with wage transparency laws, anti-discrimination guidelines, and verification badges.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <EmployerBtn
              variant="secondary"
              size="sm"
              onClick={() => setShowReportModal(true)}
            >
              Report an Issue
            </EmployerBtn>
          </div>
        </div>

        {/* Tabs Filter */}
        <div className="flex gap-2 border-b border-[#E5E1D8] pb-2 overflow-x-auto">
          {tabs.map((tab) => {
            const active = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap rounded-lg px-4 py-2 text-xs sm:text-sm font-medium transition ${
                  active
                    ? 'bg-[#0F1B2D] text-white shadow-sm'
                    : 'text-[#4A5568] hover:bg-[#FAF8F4] hover:text-[#0F1B2D]'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="grid gap-6 lg:grid-cols-12 min-w-0">
          <div className="lg:col-span-8 space-y-6 min-w-0">
            {activeTab === 'Overview' && (
              <div className="space-y-6">
                <EmployerCard title="Company Verification & Platform Trust">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                      <ShieldCheck size={20} className="text-emerald-700 shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <p className="font-semibold text-xs text-emerald-900">
                          Northstar Labs is a 100% Platform Verified Startup
                        </p>
                        <p className="text-xs text-emerald-800 leading-relaxed">
                          Certificate of Incorporation, corporate domain ownership, and GSTIN documentation are in active compliance. All job listings carry the trusted green checkmark badge.
                        </p>
                      </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-3 text-xs">
                      <div className="rounded-xl border border-[#E5E1D8] bg-[#FAF8F4] p-3 text-center">
                        <span className="text-[#4A5568] block">Safety Rating</span>
                        <span className="font-bold text-base text-[#0F1B2D]">100 / 100</span>
                      </div>
                      <div className="rounded-xl border border-[#E5E1D8] bg-[#FAF8F4] p-3 text-center">
                        <span className="text-[#4A5568] block">Active Disputes</span>
                        <span className="font-bold text-base text-emerald-700">0</span>
                      </div>
                      <div className="rounded-xl border border-[#E5E1D8] bg-[#FAF8F4] p-3 text-center">
                        <span className="text-[#4A5568] block">Next Audit</span>
                        <span className="font-bold text-base text-[#0F1B2D]">Oct 2027</span>
                      </div>
                    </div>
                  </div>
                </EmployerCard>

                <EmployerCard title="Recent Trust & Audit Events">
                  <div className="divide-y divide-[#E5E1D8] text-xs">
                    {recentTrustEvents.map((ev, idx) => (
                      <div key={idx} className="py-3 first:pt-0 last:pb-0 flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-[#0F1B2D]">{ev.event}</p>
                          <p className="text-[#4A5568]">{ev.date}</p>
                        </div>
                        <span className="inline-flex rounded-full bg-[#FAF8F4] px-2.5 py-0.5 font-medium text-[#806236] border border-[#E5E1D8]">
                          Resolved
                        </span>
                      </div>
                    ))}
                  </div>
                </EmployerCard>
              </div>
            )}

            {activeTab === 'Verification & Compliance' && (
              <EmployerCard title="Organization Verification Status">
                <div className="space-y-4 text-xs">
                  <p className="text-[#4A5568]">
                    Verified employers attract 3.4x more qualified senior candidates. All documents are encrypted and audited annually.
                  </p>
                  <div className="space-y-3">
                    {[
                      { item: 'Corporate Entity Certificate (MCA / RoC)', status: 'Approved', date: 'Verified Oct 12, 2026' },
                      { item: 'Company Work Domain & DNS TXT Record', status: 'Approved', date: 'northstarlabs.com' },
                      { item: 'Tax ID / GSTIN Identification', status: 'Approved', date: '29ABCDE1234F1Z5' },
                      { item: 'Fair Compensation Pledge (2026)', status: 'Signed', date: 'Signed by Founder' },
                    ].map((v, i) => (
                      <div key={i} className="flex items-center justify-between rounded-xl border border-[#E5E1D8] bg-white p-3">
                        <div className="flex items-center gap-2.5">
                          <CheckCircle2 size={16} className="text-emerald-600" />
                          <div>
                            <p className="font-semibold text-[#0F1B2D]">{v.item}</p>
                            <p className="text-[#4A5568]">{v.date}</p>
                          </div>
                        </div>
                        <span className="font-semibold text-emerald-700">{v.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </EmployerCard>
            )}

            {activeTab === 'Reports and flags' && (
              <EmployerCard title="Job Postings Flag History">
                <div className="space-y-4 text-xs">
                  <p className="text-[#4A5568]">
                    Any candidate reports regarding compensation ambiguity or role descriptions appear here.
                  </p>
                  <div className="rounded-xl border border-[#E5E1D8] bg-[#FAF8F4] p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ShieldAlert size={16} className="text-amber-600" />
                        <span className="font-semibold text-[#0F1B2D]">Job Flag: Clarified Variable Pay Component</span>
                      </div>
                      <span className="text-emerald-700 font-medium">Resolved Oct 5</span>
                    </div>
                    <p className="text-[#4A5568]">
                      Candidate queried fixed vs performance split for Senior Designer role. Job description was updated with explicit variable milestones and approved by Platform Safety.
                    </p>
                    <EmployerBtn
                      variant="secondary"
                      size="sm"
                      onClick={() => setShowAppealModal(true)}
                    >
                      File Clarification / Appeal
                    </EmployerBtn>
                  </div>
                </div>
              </EmployerCard>
            )}

            {activeTab === 'Posting rules' && (
              <EmployerCard title="Northstar Hiring Standards & Ethical Rules">
                <div className="space-y-4 text-xs leading-relaxed text-[#4A5568]">
                  <div className="rounded-xl border border-[#E5E1D8] bg-white p-4 space-y-2">
                    <h4 className="font-semibold text-sm text-[#0F1B2D]">1. Mandatory Compensation Transparency</h4>
                    <p>
                      Every published job must list a realistic fixed CTC range. "Competitive salary" or variable-only postings without fixed baselines are prohibited.
                    </p>
                  </div>

                  <div className="rounded-xl border border-[#E5E1D8] bg-white p-4 space-y-2">
                    <h4 className="font-semibold text-sm text-[#0F1B2D]">2. Equal Opportunity & Blind Evaluation</h4>
                    <p>
                      Screening decisions must be documented against objective role rubrics. We do not support filtering by age, gender, religion, caste, marital status, or photograph.
                    </p>
                  </div>

                  <div className="rounded-xl border border-[#E5E1D8] bg-white p-4 space-y-2">
                    <h4 className="font-semibold text-sm text-[#0F1B2D]">3. Unpaid Assessment Safeguards</h4>
                    <p>
                      Work sample trials longer than 3 hours must either be compensated or drawn from standardized mock projects rather than real production IP.
                    </p>
                  </div>
                </div>
              </EmployerCard>
            )}

            {activeTab === 'Blocked candidates' && (
              <EmployerCard title="Blocked Candidate Profiles">
                <div className="space-y-4 text-xs text-[#4A5568]">
                  <p>
                    Candidates blocked from applying to your company listings due to severe conduct breaches or mutual disengagement.
                  </p>
                  <div className="rounded-xl border border-dashed border-[#E5E1D8] p-8 text-center">
                    <Shield size={28} className="mx-auto text-[#4A5568]/40 mb-2" />
                    <p className="font-medium text-[#0F1B2D]">No candidate profiles currently blocked</p>
                    <p className="mt-0.5">Your organization maintains a clean, open talent relationship.</p>
                  </div>
                </div>
              </EmployerCard>
            )}
          </div>

          {/* Right Summary */}
          <div className="lg:col-span-4 space-y-6 min-w-0">
            <EmployerCard title="Trust Index">
              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-[#4A5568]">Trust Tier:</span>
                  <span className="font-bold text-emerald-700">Tier 1 Verified</span>
                </div>
                <div className="flex justify-between items-center py-1 border-t border-[#E5E1D8]">
                  <span className="text-[#4A5568]">Audit Score:</span>
                  <span className="font-bold text-[#0F1B2D]">100%</span>
                </div>
                <div className="flex justify-between items-center py-1 border-t border-[#E5E1D8]">
                  <span className="text-[#4A5568]">Dispute Resolution SLA:</span>
                  <span className="font-bold text-[#806236]">&lt; 24 Hours</span>
                </div>
              </div>
            </EmployerCard>

            <SafetyStrip />
          </div>
        </div>
      </div>
    </EmployerShell>
  );
}

export default function EmployerTrustPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-sm text-[#4A5568]">Loading trust center...</div>}>
      <TrustContent />
    </Suspense>
  );
}

