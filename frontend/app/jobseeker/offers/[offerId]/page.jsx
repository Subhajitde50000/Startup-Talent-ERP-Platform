'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  ChevronLeft,
  CheckCircle2,
  Calendar,
  Clock,
  DollarSign,
  Award,
  Shield,
  FileText,
  Download,
  AlertCircle,
  Check,
  X,
  MessageCircle,
} from 'lucide-react';
import { JobSeekerShell } from '@/components';
import {
  JobBtn,
  defaultUser,
} from '@/components/jobseeker-ui';
import { offers } from '../../jobseeker-data';

export default function OfferDetailPage() {
  const params = useParams();
  const router = useRouter();
  const rawId = params?.offerId;
  const offer = offers.find((o) => o.id === rawId) || offers[0];

  const [tab, setTab] = useState('Terms');
  const [offerStatus, setOfferStatus] = useState(offer.status || 'Received');
  const [showCounterModal, setShowCounterModal] = useState(false);
  const [counterNote, setCounterNote] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(false), 3500);
  };

  const handleAccept = () => {
    setOfferStatus('Accepted');
    showToast('Offer accepted! The hiring team has been notified.');
  };

  const handleDecline = () => {
    setOfferStatus('Declined');
    showToast('Offer declined respectfully.');
  };

  const handleSendCounter = () => {
    setShowCounterModal(false);
    setOfferStatus('Under Discussion');
    showToast('Counter-proposal sent to the founders.');
  };

  return (
    <JobSeekerShell active="Offers">
      <div className="space-y-6 max-w-5xl">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[#6B7280]">
          <Link
            href="/jobseeker/offers"
            className="flex items-center gap-1 hover:text-[#0F1B2D]"
          >
            <ChevronLeft size={14} /> Back to Offers
          </Link>
          <span>/</span>
          <span className="text-[#0F1B2D] font-medium truncate">{offer.title}</span>
        </nav>

        {/* Toast Alert */}
        {toastMessage && (
          <div className="rounded-xl border border-[#CDE5D7] bg-[#E7F3EC] p-3.5 text-xs text-[#286749] flex items-center justify-between">
            <span className="flex items-center gap-2">
              <CheckCircle2 size={16} /> {toastMessage}
            </span>
            <button
              type="button"
              onClick={() => setToastMessage('')}
              className="text-[#286749] hover:underline"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Header Hero */}
        <header className="rounded-2xl border border-[#E5E1D8] bg-white p-6 shadow-sm space-y-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-start gap-4 min-w-0 flex-1">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-[#F3EBDD] font-bold text-xl text-[#806236]">
                {offer.logo || offer.company?.[0] || 'O'}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h1 className="text-xl md:text-2xl font-serif font-bold text-[#0F1B2D]">
                    {offer.title}
                  </h1>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      offerStatus === 'Accepted'
                        ? 'bg-[#E7F3EC] text-[#286749]'
                        : offerStatus === 'Declined'
                        ? 'bg-[#F3F4F6] text-[#6B7280]'
                        : 'bg-[#FFF8E8] text-[#806236]'
                    }`}
                  >
                    {offerStatus}
                  </span>
                </div>
                <p className="text-xs md:text-sm text-[#4A5568]">
                  From <strong className="text-[#0F1B2D]">{offer.company}</strong> · Received {offer.sentDate || 'Recent'}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-2">
              {offerStatus === 'Received' && (
                <>
                  <JobBtn primary small onClick={handleAccept} className="px-4">
                    Accept Offer
                  </JobBtn>
                  <JobBtn
                    secondary
                    small
                    onClick={() => setShowCounterModal(true)}
                  >
                    Request Adjustments
                  </JobBtn>
                  <JobBtn destructive small onClick={handleDecline}>
                    Decline
                  </JobBtn>
                </>
              )}
              <Link href="/jobseeker/messages">
                <JobBtn secondary small className="flex items-center gap-1.5">
                  <MessageCircle size={14} /> Message Founder
                </JobBtn>
              </Link>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="pt-4 border-t border-[#F0EBE0] grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div>
              <span className="text-[#6B7280] block mb-0.5">Fixed Base CTC</span>
              <strong className="text-[#0F1B2D] text-sm">{offer.basePay}</strong>
            </div>
            <div>
              <span className="text-[#6B7280] block mb-0.5">Performance Bonus</span>
              <strong className="text-[#0F1B2D] text-sm">{offer.bonus || '10% Annual'}</strong>
            </div>
            <div>
              <span className="text-[#6B7280] block mb-0.5">ESOP Grant</span>
              <strong className="text-[#0F1B2D] text-sm">{offer.equity || '0.15% (4-yr vest)'}</strong>
            </div>
            <div>
              <span className="text-[#6B7280] block mb-0.5">Decision Deadline</span>
              <span className="text-[#B7791F] font-semibold">{offer.expiry || 'In 5 days'}</span>
            </div>
          </div>

          {/* Fixed Responsive Tab Strip: using overflow-x-auto, min-w-0 and whitespace-nowrap to fix audit issue */}
          <div className="border-t border-[#E5E1D8] pt-3 overflow-x-auto min-w-0">
            <div className="flex items-center gap-2 min-w-max pb-1">
              {[
                'Terms',
                'Offer Letter & Docs',
                'ESOP & Equity',
                'Benefits & Perks',
                'Discussion History',
              ].map((t) => {
                const active = tab === t;
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTab(t)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                      active
                        ? 'bg-[#0F1B2D] text-white'
                        : 'text-[#4A5568] hover:bg-[#FAF8F4]'
                    }`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>
        </header>

        {/* Tab 1: Terms */}
        {tab === 'Terms' && (
          <div className="space-y-6">
            <section className="rounded-xl border border-[#E5E1D8] bg-white p-6 shadow-sm space-y-4">
              <h2 className="text-base font-serif font-bold text-[#0F1B2D]">
                Compensation & Structure
              </h2>
              <div className="grid gap-3 sm:grid-cols-2 text-xs">
                <div className="rounded-lg border border-[#E5E1D8] bg-[#FAF8F4] p-3.5 space-y-1">
                  <span className="text-[#6B7280]">Fixed Annual Base</span>
                  <div className="text-base font-bold text-[#0F1B2D]">{offer.basePay}</div>
                  <span className="text-[#6B7280]">Paid monthly on the last working day</span>
                </div>
                <div className="rounded-lg border border-[#E5E1D8] bg-[#FAF8F4] p-3.5 space-y-1">
                  <span className="text-[#6B7280]">Target Variable Incentive</span>
                  <div className="text-base font-bold text-[#0F1B2D]">{offer.bonus || '₹2,50,000 / yr'}</div>
                  <span className="text-[#6B7280]">Evaluated semi-annually against key results</span>
                </div>
              </div>
            </section>

            <section className="rounded-xl border border-[#E5E1D8] bg-white p-6 shadow-sm space-y-3">
              <h2 className="text-base font-serif font-bold text-[#0F1B2D]">
                Joining & Terms of Service
              </h2>
              <div className="text-xs text-[#4A5568] space-y-2">
                <div className="flex justify-between py-1.5 border-b border-[#F0EBE0]">
                  <span className="text-[#6B7280]">Expected Joining Date:</span>
                  <strong className="text-[#0F1B2D]">{offer.startDate || 'December 1, 2026'}</strong>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#F0EBE0]">
                  <span className="text-[#6B7280]">Probation Period:</span>
                  <span className="text-[#0F1B2D]">3 months from commencement</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#F0EBE0]">
                  <span className="text-[#6B7280]">Notice Period Post-Probation:</span>
                  <span className="text-[#0F1B2D]">30 days written notice</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-[#6B7280]">Work Model:</span>
                  <span className="text-[#0F1B2D]">Hybrid / Flexible remote (Bengaluru Office)</span>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Tab 2: Offer Letter & Docs */}
        {tab === 'Offer Letter & Docs' && (
          <section className="rounded-xl border border-[#E5E1D8] bg-white p-6 shadow-sm space-y-4">
            <h2 className="text-base font-serif font-bold text-[#0F1B2D]">Official Offer Document</h2>
            <div className="rounded-xl border border-[#E5E1D8] bg-[#FAF8F4] p-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <FileText size={24} className="text-[#806236]" />
                <div>
                  <h3 className="text-xs font-bold text-[#0F1B2D]">Offer_Letter_{offer.company}.pdf</h3>
                  <p className="text-xs text-[#6B7280]">Official formal letter signed by Founder</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => alert('Offer PDF download simulated.')}
                className="inline-flex items-center gap-1.5 min-h-[34px] px-3.5 rounded-lg border border-[#E5E1D8] bg-white text-xs font-semibold text-[#0F1B2D] hover:bg-[#F4F1EA]"
              >
                <Download size={14} /> Download PDF
              </button>
            </div>
          </section>
        )}

        {/* Tab 3: ESOP & Equity */}
        {tab === 'ESOP & Equity' && (
          <section className="rounded-xl border border-[#E5E1D8] bg-white p-6 shadow-sm space-y-4">
            <h2 className="text-base font-serif font-bold text-[#0F1B2D]">Equity Pool & Vesting</h2>
            <p className="text-xs text-[#6B7280] leading-relaxed">
              Standard 4-year vesting schedule with a 1-year cliff. 25% vests after 12 months, followed by equal monthly vesting thereafter.
            </p>
            <div className="rounded-lg border border-[#E5E1D8] bg-[#FAF8F4] p-4 text-xs space-y-2">
              <div className="flex justify-between border-b border-[#E5E1D8] pb-1.5">
                <span className="text-[#6B7280]">Total Pool Percentage:</span>
                <strong className="text-[#0F1B2D]">{offer.equity || '0.15%'}</strong>
              </div>
              <div className="flex justify-between border-b border-[#E5E1D8] pb-1.5">
                <span className="text-[#6B7280]">Exercise Price:</span>
                <span className="text-[#0F1B2D]">Nominal ₹10 per share at grant</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B7280]">Estimated Current Value:</span>
                <span className="text-[#286749] font-bold">₹12,50,000 based on last funding round</span>
              </div>
            </div>
          </section>
        )}

        {/* Tab 4: Benefits & Perks */}
        {tab === 'Benefits & Perks' && (
          <section className="rounded-xl border border-[#E5E1D8] bg-white p-6 shadow-sm space-y-4">
            <h2 className="text-base font-serif font-bold text-[#0F1B2D]">Included Benefits</h2>
            <div className="grid gap-3 sm:grid-cols-2 text-xs">
              <div className="p-3 rounded-lg border border-[#E5E1D8] bg-[#FAF8F4]">
                <strong className="block text-[#0F1B2D] mb-1">Health & Medical Insurance</strong>
                <span className="text-[#6B7280]">₹5,00,000 comprehensive cover for employee and dependents.</span>
              </div>
              <div className="p-3 rounded-lg border border-[#E5E1D8] bg-[#FAF8F4]">
                <strong className="block text-[#0F1B2D] mb-1">Learning & Books Allowance</strong>
                <span className="text-[#6B7280]">₹40,000 annual budget for courses, books, and design tool subscriptions.</span>
              </div>
              <div className="p-3 rounded-lg border border-[#E5E1D8] bg-[#FAF8F4]">
                <strong className="block text-[#0F1B2D] mb-1">Ergonomic Remote Setup</strong>
                <span className="text-[#6B7280]">MacBook Pro M3 Max + 4K monitor provided upon onboarding.</span>
              </div>
              <div className="p-3 rounded-lg border border-[#E5E1D8] bg-[#FAF8F4]">
                <strong className="block text-[#0F1B2D] mb-1">Paid Time Off</strong>
                <span className="text-[#6B7280]">24 days annual paid leaves plus all national holidays.</span>
              </div>
            </div>
          </section>
        )}

        {/* Tab 5: Discussion History */}
        {tab === 'Discussion History' && (
          <section className="rounded-xl border border-[#E5E1D8] bg-white p-6 shadow-sm space-y-4">
            <h2 className="text-base font-serif font-bold text-[#0F1B2D]">Negotiation & Notes</h2>
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-lg border border-[#E5E1D8] bg-[#FAF8F4]">
                <span className="text-[#6B7280] block text-[11px]">Oct 29 · Founder Note</span>
                <p className="mt-1 text-[#0F1B2D]">
                  "We were thoroughly impressed with your design systems case study and are thrilled to invite you to lead design at our startup."
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Counter-proposal Modal */}
        {showCounterModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl space-y-4">
              <h3 className="text-base font-serif font-bold text-[#0F1B2D]">
                Request Offer Adjustments
              </h3>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                Send a polite proposal to the founder explaining your preferred adjustments (e.g. base pay, start date, or equity allocation).
              </p>
              <textarea
                rows={4}
                value={counterNote}
                onChange={(e) => setCounterNote(e.target.value)}
                placeholder="E.g. Thank you for this generous offer. Given my 6 years leading design systems, could we explore a base of ₹28L or a joining bonus..."
                className="w-full p-3 rounded-lg border border-[#E5E1D8] text-xs text-[#0F1B2D] focus:border-[#B8955A] focus:outline-none"
              />
              <div className="flex justify-end gap-2 pt-2">
                <JobBtn secondary small onClick={() => setShowCounterModal(false)}>
                  Cancel
                </JobBtn>
                <JobBtn primary small onClick={handleSendCounter}>
                  Submit Proposal
                </JobBtn>
              </div>
            </div>
          </div>
        )}
      </div>
    </JobSeekerShell>
  );
}
