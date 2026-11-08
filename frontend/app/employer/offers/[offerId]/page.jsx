'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  EmployerShell,
  EmployerBtn,
  EmployerCard,
  StageChip,
  EmployerSafetyStrip as SafetyStrip,
} from '@/components';
import { offers } from '@/app/employer/employer-data';
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  FileCheck,
  FileText,
  Mail,
  MessageSquare,
  RefreshCw,
  Send,
  ShieldCheck,
  X,
  AlertTriangle,
} from 'lucide-react';

export default function EmployerOfferDetailPage() {
  const params = useParams();
  const offerId = params?.offerId || 'off-1';
  const offer = offers.find((o) => o.id === offerId) || offers[0];

  const [activeTab, setActiveTab] = useState('Terms');
  const [toastMessage, setToastMessage] = useState(null);
  const [offerStatus, setOfferStatus] = useState(offer.status || 'Sent');
  const [expiryText, setExpiryText] = useState(offer.expiry || 'in 48 hours');

  // Modals
  const [showExtendModal, setShowExtendModal] = useState(false);
  const [extendDays, setExtendDays] = useState('5');
  const [showReviseModal, setShowReviseModal] = useState(false);
  const [revisedSalary, setRevisedSalary] = useState(offer.compensation || '₹22,00,000');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleExtendExpiry = (e) => {
    e.preventDefault();
    setExpiryText(`extended by ${extendDays} days`);
    setShowExtendModal(false);
    showToast(`Offer validity extended by ${extendDays} days. Candidate notified.`);
  };

  const handleReviseOffer = (e) => {
    e.preventDefault();
    setShowReviseModal(false);
    showToast(`Revised offer created with CTC ${revisedSalary}. Re-routed for internal sign-off.`);
  };

  const handleWithdraw = () => {
    if (confirm('Are you certain you want to withdraw this active offer?')) {
      setOfferStatus('Withdrawn');
      showToast('Offer withdrawn and marked inactive.');
    }
  };

  const tabs = ['Terms', 'Approvals', 'Negotiation', 'Documents', 'History'];

  return (
    <EmployerShell active="/employer/offers">
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

      {/* Extend Expiry Modal */}
      {showExtendModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="extend-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        >
          <div className="w-full max-w-md rounded-2xl border border-[#E5E1D8] bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E1D8]">
              <h3 id="extend-modal-title" className="text-base font-semibold text-[#0F1B2D]">
                Extend Offer Validity
              </h3>
              <button
                type="button"
                onClick={() => setShowExtendModal(false)}
                className="text-[#4A5568] hover:text-[#0F1B2D]"
                aria-label="Close dialog"
              >
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleExtendExpiry} className="mt-4 space-y-4">
              <p className="text-xs text-[#4A5568]">
                Grant <span className="font-semibold text-[#0F1B2D]">{offer.candidate}</span> additional time to review the offer package.
              </p>
              <div>
                <label htmlFor="extend-days" className="block text-xs font-medium text-[#0F1B2D] mb-1">
                  Extension Duration
                </label>
                <select
                  id="extend-days"
                  value={extendDays}
                  onChange={(e) => setExtendDays(e.target.value)}
                  className="w-full rounded-lg border border-[#E5E1D8] bg-white px-3 py-2 text-xs text-[#0F1B2D] focus:border-[#B8955A] focus:outline-none"
                >
                  <option value="3">3 Days</option>
                  <option value="5">5 Days</option>
                  <option value="7">7 Days</option>
                  <option value="14">14 Days</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <EmployerBtn variant="secondary" size="sm" onClick={() => setShowExtendModal(false)}>
                  Cancel
                </EmployerBtn>
                <EmployerBtn type="submit" variant="primary" size="sm">
                  Apply Extension
                </EmployerBtn>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Revise Offer Modal */}
      {showReviseModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="revise-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        >
          <div className="w-full max-w-md rounded-2xl border border-[#E5E1D8] bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E1D8]">
              <h3 id="revise-modal-title" className="text-base font-semibold text-[#0F1B2D]">
                Revise Offer Terms
              </h3>
              <button
                type="button"
                onClick={() => setShowReviseModal(false)}
                className="text-[#4A5568] hover:text-[#0F1B2D]"
                aria-label="Close dialog"
              >
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleReviseOffer} className="mt-4 space-y-4">
              <div>
                <label htmlFor="revised-salary" className="block text-xs font-medium text-[#0F1B2D] mb-1">
                  Adjusted Base Compensation
                </label>
                <input
                  id="revised-salary"
                  type="text"
                  required
                  value={revisedSalary}
                  onChange={(e) => setRevisedSalary(e.target.value)}
                  className="w-full rounded-lg border border-[#E5E1D8] px-3 py-2 text-xs text-[#0F1B2D] focus:border-[#B8955A] focus:outline-none"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <EmployerBtn variant="secondary" size="sm" onClick={() => setShowReviseModal(false)}>
                  Cancel
                </EmployerBtn>
                <EmployerBtn type="submit" variant="primary" size="sm">
                  Issue v3 Version
                </EmployerBtn>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-[1280px] space-y-6">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#4A5568]">
          <Link
            href="/employer/offers"
            className="inline-flex items-center gap-1 font-medium text-[#806236] hover:underline"
          >
            <ArrowLeft size={14} /> Back to all offers
          </Link>
          <span>/</span>
          <span className="text-[#0F1B2D] font-medium">{offer.candidate}</span>
        </div>

        {/* Offer Header Card */}
        <div className="rounded-2xl border border-[#E5E1D8] bg-white p-5 sm:p-6 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="font-serif text-xl sm:text-2xl font-bold text-[#0F1B2D]">
                  Offer — {offer.candidate}
                </h1>
                <StageChip stage={offerStatus} />
                <span className="rounded-full bg-[#FAF8F4] px-2.5 py-0.5 text-xs font-medium text-[#806236] border border-[#E5E1D8]">
                  v2 Draft
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#4A5568]">
                {offer.job || offer.title} · Sent to candidate · Expires {expiryText}
              </p>
            </div>

            {/* Action buttons toolbar - flex-wrap prevents 452px blowout */}
            <div className="flex flex-wrap items-center gap-2 pt-2 lg:pt-0">
              <EmployerBtn
                variant="primary"
                size="sm"
                onClick={() => setShowReviseModal(true)}
              >
                Revise Offer
              </EmployerBtn>
              <EmployerBtn
                variant="secondary"
                size="sm"
                onClick={() => setShowExtendModal(true)}
              >
                Extend Expiry
              </EmployerBtn>
              <EmployerBtn
                variant="secondary"
                size="sm"
                onClick={() => setActiveTab('Negotiation')}
              >
                <MessageSquare size={14} className="mr-1.5" /> Message
              </EmployerBtn>
              <EmployerBtn
                variant="secondary"
                size="sm"
                onClick={handleWithdraw}
                className="text-[#B42318] hover:bg-red-50 hover:border-red-200"
              >
                Withdraw
              </EmployerBtn>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mt-6 flex gap-1.5 overflow-x-auto border-t border-[#E5E1D8] pt-4 pb-1">
            {tabs.map((tab) => {
              const active = activeTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`whitespace-nowrap rounded-lg px-3.5 py-1.5 text-xs font-medium transition ${
                    active
                      ? 'bg-[#0F1B2D] text-white shadow-sm'
                      : 'border border-[#E5E1D8] text-[#4A5568] hover:bg-[#FAF8F4] hover:text-[#0F1B2D]'
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content Two Columns */}
        <div className="grid gap-6 lg:grid-cols-12 min-w-0">
          <div className="lg:col-span-8 space-y-6 min-w-0">
            {activeTab === 'Terms' && (
              <EmployerCard title="Offer Financial & Contract Terms">
                <div className="space-y-4">
                  <div className="divide-y divide-[#E5E1D8] text-xs">
                    <div className="flex justify-between py-2.5">
                      <span className="text-[#4A5568]">Annual Fixed CTC:</span>
                      <span className="font-semibold text-sm text-[#0F1B2D]">{offer.compensation || '₹22,00,000'}</span>
                    </div>
                    <div className="flex justify-between py-2.5">
                      <span className="text-[#4A5568]">Annual Performance Variable:</span>
                      <span className="font-semibold text-sm text-[#0F1B2D]">₹2,00,000</span>
                    </div>
                    <div className="flex justify-between py-2.5">
                      <span className="text-[#4A5568]">Joining Bonus:</span>
                      <span className="font-semibold text-sm text-[#0F1B2D]">₹1,00,000 (12m clawback)</span>
                    </div>
                    <div className="flex justify-between py-2.5">
                      <span className="text-[#4A5568]">Equity Grant (ESOP):</span>
                      <span className="font-semibold text-sm text-[#806236]">0.20% · 4-yr vesting · 1-yr cliff</span>
                    </div>
                    <div className="flex justify-between py-2.5">
                      <span className="text-[#4A5568]">Target Start Date:</span>
                      <span className="font-semibold text-sm text-[#0F1B2D]">{offer.startDate || 'Jan 2, 2027'}</span>
                    </div>
                    <div className="flex justify-between py-2.5">
                      <span className="text-[#4A5568]">Offer Expiry:</span>
                      <span className="font-semibold text-sm text-amber-700">{expiryText}</span>
                    </div>
                  </div>
                  <p className="text-xs text-[#4A5568] border-t border-[#E5E1D8] pt-3">
                    Formal legal employment agreement will be generated automatically upon digital acceptance.
                  </p>
                </div>
              </EmployerCard>
            )}

            {activeTab === 'Approvals' && (
              <EmployerCard title="Internal Approval Sequence">
                <div className="space-y-4">
                  <div className="rounded-xl border border-[#E5E1D8] bg-[#FAF8F4] p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-xs font-semibold text-[#0F1B2D]">Meera Shah (Finance Director)</h4>
                        <p className="text-xs text-[#4A5568]">Threshold review for packages &gt; ₹20L</p>
                      </div>
                      <span className="inline-flex rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700 border border-emerald-200">
                        Approved
                      </span>
                    </div>
                    <p className="text-xs text-[#4A5568]">"Compensation aligned with Series A budget allocations."</p>
                  </div>

                  <div className="rounded-xl border border-[#E5E1D8] bg-white p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-xs font-semibold text-[#0F1B2D]">Priya Mehta (Hiring Recruiter)</h4>
                        <p className="text-xs text-[#4A5568]">Primary offer author</p>
                      </div>
                      <span className="inline-flex rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700 border border-emerald-200">
                        Submitted
                      </span>
                    </div>
                  </div>
                </div>
              </EmployerCard>
            )}

            {activeTab === 'Negotiation' && (
              <EmployerCard title="Candidate Counter & Negotiation Log">
                <div className="space-y-4">
                  <div className="rounded-xl border border-[#E5E1D8] bg-[#FAF8F4] p-4 space-y-3 text-xs">
                    <div className="rounded-lg bg-[#0F1B2D] p-3 text-white max-w-[85%]">
                      <p className="font-semibold text-[11px] text-[#D4AF37]">Northstar Offer Sent (v1)</p>
                      <p className="mt-1">Fixed CTC ₹20L + 0.15% ESOP with 4-year vesting schedule.</p>
                    </div>
                    <div className="rounded-lg bg-white border border-[#E5E1D8] p-3 text-[#0F1B2D] max-w-[85%] ml-auto">
                      <p className="font-semibold text-[11px] text-[#806236]">Aanya Sen (Candidate Counter)</p>
                      <p className="mt-1">"Thank you so much! In light of other competing offers, could we discuss ₹22L fixed CTC?"</p>
                    </div>
                    <div className="rounded-lg bg-[#0F1B2D] p-3 text-white max-w-[85%]">
                      <p className="font-semibold text-[11px] text-[#D4AF37]">Northstar Offer Revised (v2)</p>
                      <p className="mt-1">Adjusted to ₹22L base + 0.20% ESOP. Valid for 48 hours.</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <EmployerBtn variant="primary" size="sm" onClick={() => showToast('Terms locked and candidate reminded')}>
                      Lock Terms
                    </EmployerBtn>
                    <EmployerBtn variant="secondary" size="sm" onClick={() => setShowReviseModal(true)}>
                      Counter with v3
                    </EmployerBtn>
                  </div>
                </div>
              </EmployerCard>
            )}

            {activeTab === 'Documents' && (
              <EmployerCard title="Offer Documents & Legal Attachments">
                <div className="divide-y divide-[#E5E1D8] text-xs">
                  <div className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-2.5">
                      <FileText size={18} className="text-[#806236]" />
                      <div>
                        <p className="font-semibold text-[#0F1B2D]">Formal_Offer_Letter_v2.pdf</p>
                        <p className="text-[#4A5568]">184 KB · Generated by Platform</p>
                      </div>
                    </div>
                    <EmployerBtn
                      variant="secondary"
                      size="sm"
                      onClick={() => showToast('Offer letter PDF downloaded')}
                    >
                      <Download size={14} className="mr-1" /> Download
                    </EmployerBtn>
                  </div>

                  <div className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-2.5">
                      <FileCheck size={18} className="text-[#806236]" />
                      <div>
                        <p className="font-semibold text-[#0F1B2D]">Proprietary_Information_Agreement.pdf</p>
                        <p className="text-[#4A5568]">Draft ready for digital signature</p>
                      </div>
                    </div>
                    <span className="text-amber-700 font-medium">Pending Acceptance</span>
                  </div>
                </div>
              </EmployerCard>
            )}

            {activeTab === 'History' && (
              <EmployerCard title="Offer Activity History">
                <div className="space-y-3 text-xs text-[#4A5568]">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                    <span>Nov 2 — Approved by Meera Shah (Finance)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <RefreshCw size={14} className="text-[#806236] shrink-0" />
                    <span>Nov 1 — Offer updated to v2 with adjusted compensation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-[#4A5568] shrink-0" />
                    <span>Oct 31 — Candidate reviewed v1 letter</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Send size={14} className="text-[#4A5568] shrink-0" />
                    <span>Oct 30 — Initial offer dispatched by Priya Mehta</span>
                  </div>
                </div>
              </EmployerCard>
            )}
          </div>

          {/* Right Summary Sidebar */}
          <div className="lg:col-span-4 space-y-6 min-w-0">
            <EmployerCard title="Offer Overview">
              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-[#4A5568]">Pipeline Status:</span>
                  <StageChip stage={offerStatus} />
                </div>
                <div className="flex justify-between items-center py-1 border-t border-[#E5E1D8]">
                  <span className="text-[#4A5568]">Document Version:</span>
                  <span className="font-bold text-[#0F1B2D]">v2</span>
                </div>
                <div className="flex justify-between items-center py-1 border-t border-[#E5E1D8]">
                  <span className="text-[#4A5568]">Countdown:</span>
                  <span className="font-bold text-amber-700">{expiryText}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-t border-[#E5E1D8]">
                  <span className="text-[#4A5568]">Managing Recruiter:</span>
                  <span className="font-semibold text-[#0F1B2D]">Priya Mehta</span>
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
