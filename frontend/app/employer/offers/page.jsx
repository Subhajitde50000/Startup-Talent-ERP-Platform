'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  EmployerShell,
  EmployerBtn,
  EmployerCard,
  StageChip,
  EmployerSafetyStrip as SafetyStrip,
} from '@/components';
import {
  offers as initialOffers,
  jobs,
  applications,
} from '@/app/employer/employer-data';
import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  Clock,
  DollarSign,
  FileCheck,
  FileText,
  Plus,
  Send,
  UserCheck,
  X,
  ArrowRight,
} from 'lucide-react';

export default function EmployerOffersPage() {
  const [activeTab, setActiveTab] = useState('All');
  const [offersList, setOffersList] = useState(initialOffers);
  const [toastMessage, setToastMessage] = useState(null);

  // New Offer Modal
  const [showNewOfferModal, setShowNewOfferModal] = useState(false);
  const [candName, setCandName] = useState('Aanya Sen');
  const [jobTitle, setJobTitle] = useState(jobs[0]?.title || 'Senior Product Designer');
  const [basePay, setBasePay] = useState('₹24,00,000');
  const [equity, setEquity] = useState('0.15% ESOP');
  const [startDate, setStartDate] = useState('2027-01-05');
  const [expiryDays, setExpiryDays] = useState('7');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleCreateOffer = (e) => {
    e.preventDefault();
    const newOffer = {
      id: `off-${Date.now()}`,
      candidate: candName,
      job: jobTitle,
      title: jobTitle,
      compensation: basePay,
      startDate: startDate,
      status: 'Awaiting approval',
      expiry: `in ${expiryDays} days`,
      owner: 'Priya Mehta',
    };
    setOffersList([newOffer, ...offersList]);
    setShowNewOfferModal(false);
    showToast(`Draft offer created for ${candName} and submitted for internal finance approval.`);
  };

  const filteredOffers = useMemo(() => {
    if (activeTab === 'All') return offersList;
    if (activeTab === 'Draft') return offersList.filter((o) => o.status === 'Draft');
    if (activeTab === 'Awaiting approval') return offersList.filter((o) => o.status === 'Awaiting approval');
    if (activeTab === 'Sent') return offersList.filter((o) => o.status === 'Sent');
    if (activeTab === 'Accepted') return offersList.filter((o) => o.status === 'Accepted');
    return offersList;
  }, [activeTab, offersList]);

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

      {/* New Offer Modal */}
      {showNewOfferModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="new-offer-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        >
          <div className="w-full max-w-lg rounded-2xl border border-[#E5E1D8] bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E1D8]">
              <h3 id="new-offer-title" className="text-base font-semibold text-[#0F1B2D]">
                Prepare Employment Offer
              </h3>
              <button
                type="button"
                onClick={() => setShowNewOfferModal(false)}
                className="text-[#4A5568] hover:text-[#0F1B2D]"
                aria-label="Close dialog"
              >
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleCreateOffer} className="mt-4 space-y-4">
              <div>
                <label htmlFor="offer-cand" className="block text-xs font-medium text-[#0F1B2D] mb-1">
                  Candidate Name
                </label>
                <input
                  id="offer-cand"
                  type="text"
                  required
                  value={candName}
                  onChange={(e) => setCandName(e.target.value)}
                  className="w-full rounded-lg border border-[#E5E1D8] px-3 py-2 text-xs text-[#0F1B2D] focus:border-[#B8955A] focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="offer-job" className="block text-xs font-medium text-[#0F1B2D] mb-1">
                  Designated Position
                </label>
                <select
                  id="offer-job"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="w-full rounded-lg border border-[#E5E1D8] bg-white px-3 py-2 text-xs text-[#0F1B2D] focus:border-[#B8955A] focus:outline-none"
                >
                  {jobs.map((j) => (
                    <option key={j.id} value={j.title}>
                      {j.title} · {j.location}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label htmlFor="offer-base" className="block text-xs font-medium text-[#0F1B2D] mb-1">
                    Annual Fixed CTC (INR)
                  </label>
                  <input
                    id="offer-base"
                    type="text"
                    required
                    value={basePay}
                    onChange={(e) => setBasePay(e.target.value)}
                    className="w-full rounded-lg border border-[#E5E1D8] px-3 py-2 text-xs text-[#0F1B2D] focus:border-[#B8955A] focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="offer-equity" className="block text-xs font-medium text-[#0F1B2D] mb-1">
                    Equity Grants / ESOPs
                  </label>
                  <input
                    id="offer-equity"
                    type="text"
                    value={equity}
                    onChange={(e) => setEquity(e.target.value)}
                    className="w-full rounded-lg border border-[#E5E1D8] px-3 py-2 text-xs text-[#0F1B2D] focus:border-[#B8955A] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label htmlFor="offer-date" className="block text-xs font-medium text-[#0F1B2D] mb-1">
                    Target Joining Date
                  </label>
                  <input
                    id="offer-date"
                    type="date"
                    required
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full rounded-lg border border-[#E5E1D8] px-3 py-2 text-xs text-[#0F1B2D] focus:border-[#B8955A] focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="offer-expiry" className="block text-xs font-medium text-[#0F1B2D] mb-1">
                    Validity Window (Days)
                  </label>
                  <select
                    id="offer-expiry"
                    value={expiryDays}
                    onChange={(e) => setExpiryDays(e.target.value)}
                    className="w-full rounded-lg border border-[#E5E1D8] bg-white px-3 py-2 text-xs text-[#0F1B2D] focus:border-[#B8955A] focus:outline-none"
                  >
                    <option value="3">3 Days (Fast-track)</option>
                    <option value="7">7 Days (Standard)</option>
                    <option value="14">14 Days (Extended)</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <EmployerBtn variant="secondary" size="sm" onClick={() => setShowNewOfferModal(false)}>
                  Cancel
                </EmployerBtn>
                <EmployerBtn type="submit" variant="primary" size="sm">
                  Generate & Submit for Approval
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
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F1B2D]">
              Offers & Compensation Pipeline
            </h1>
            <p className="text-xs sm:text-sm text-[#4A5568]">
              Manage candidate packages, compensation approvals, negotiation cycles, and digital signatures.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <EmployerBtn
              variant="primary"
              size="sm"
              onClick={() => setShowNewOfferModal(true)}
            >
              <Plus size={14} className="mr-1.5" /> New offer
            </EmployerBtn>
          </div>
        </div>

        {/* Metrics Row */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-[#E5E1D8] bg-white p-5 shadow-sm">
            <span className="text-xs font-semibold text-[#4A5568]">Active Offers</span>
            <p className="font-serif text-2xl font-bold text-[#0F1B2D] mt-1">{offersList.length}</p>
            <p className="text-xs text-[#806236] mt-1">1 expiring in 48 hours</p>
          </div>
          <div className="rounded-2xl border border-[#E5E1D8] bg-white p-5 shadow-sm">
            <span className="text-xs font-semibold text-[#4A5568]">Awaiting Approval</span>
            <p className="font-serif text-2xl font-bold text-amber-600 mt-1">
              {offersList.filter((o) => o.status === 'Awaiting approval').length}
            </p>
            <p className="text-xs text-[#4A5568] mt-1">Finance & Founder review</p>
          </div>
          <div className="rounded-2xl border border-[#E5E1D8] bg-white p-5 shadow-sm">
            <span className="text-xs font-semibold text-[#4A5568]">Acceptance Rate</span>
            <p className="font-serif text-2xl font-bold text-emerald-700 mt-1">87.5%</p>
            <p className="text-xs text-[#4A5568] mt-1">▲ 4% vs previous quarter</p>
          </div>
          <div className="rounded-2xl border border-[#E5E1D8] bg-white p-5 shadow-sm">
            <span className="text-xs font-semibold text-[#4A5568]">Avg Time to Accept</span>
            <p className="font-serif text-2xl font-bold text-[#0F1B2D] mt-1">3.4 Days</p>
            <p className="text-xs text-[#4A5568] mt-1">Well within 7-day window</p>
          </div>
        </div>

        {/* Tabs Filter */}
        <div className="flex gap-2 border-b border-[#E5E1D8] pb-2 overflow-x-auto">
          {['All', 'Draft', 'Awaiting approval', 'Sent', 'Accepted'].map((tab) => {
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

        {/* Offers List */}
        <div className="space-y-4">
          {filteredOffers.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#E5E1D8] bg-white p-12 text-center text-xs text-[#4A5568]">
              <FileText size={32} className="mx-auto text-[#4A5568]/40 mb-3" />
              <p className="font-semibold text-base text-[#0F1B2D]">No offers found in "{activeTab}"</p>
              <p className="mt-1">Create an offer from shortlisted candidates to populate this pipeline.</p>
            </div>
          ) : (
            filteredOffers.map((off) => (
              <div
                key={off.id}
                className="rounded-2xl border border-[#E5E1D8] bg-white p-5 shadow-sm transition hover:border-[#B8955A] space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-serif text-lg font-bold text-[#0F1B2D]">
                        {off.candidate}
                      </h3>
                      <StageChip stage={off.status} />
                    </div>
                    <p className="text-xs text-[#4A5568]">
                      Role: <span className="font-medium text-[#0F1B2D]">{off.job || off.title}</span> · Managed by {off.owner}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link href={`/employer/offers/${off.id}`}>
                      <EmployerBtn variant="primary" size="sm">
                        View Details <ArrowRight size={14} className="ml-1" />
                      </EmployerBtn>
                    </Link>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-3 border-t border-[#E5E1D8] pt-3 text-xs">
                  <div>
                    <span className="text-[#4A5568] block">Total Compensation:</span>
                    <span className="font-semibold text-base text-[#0F1B2D]">{off.compensation}</span>
                  </div>
                  <div>
                    <span className="text-[#4A5568] block">Target Start Date:</span>
                    <span className="font-medium text-[#0F1B2D]">{off.startDate}</span>
                  </div>
                  <div>
                    <span className="text-[#4A5568] block">Validity Window:</span>
                    <span className="font-medium text-amber-700">Expires {off.expiry}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </EmployerShell>
  );
}
