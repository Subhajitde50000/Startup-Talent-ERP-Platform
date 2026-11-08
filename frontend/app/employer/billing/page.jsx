'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  EmployerShell,
  EmployerBtn,
  EmployerCard,
  StageChip,
  EmployerSafetyStrip as SafetyStrip,
} from '@/components';
import {
  company,
  plans,
  invoices,
  seats,
  billingSummary,
} from '@/app/employer/employer-data';
import {
  BadgeCheck,
  Check,
  CheckCircle2,
  CreditCard,
  Download,
  FileText,
  Lock,
  Plus,
  ShieldCheck,
  Sparkles,
  UserPlus,
  Users,
  X,
} from 'lucide-react';

export default function EmployerBillingPage() {
  const [activeTab, setActiveTab] = useState('Plan Tiers');
  const [toastMessage, setToastMessage] = useState(null);

  // Invite Seat Modal
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('Recruiter');

  // Add Card Modal
  const [showCardModal, setShowCardModal] = useState(false);
  const [cardNumber, setCardNumber] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleInviteMember = (e) => {
    e.preventDefault();
    if (!inviteEmail.trim()) return;
    setShowInviteModal(false);
    showToast(`Team invitation sent to ${inviteEmail} as ${inviteRole}.`);
    setInviteEmail('');
  };

  const handleAddCard = (e) => {
    e.preventDefault();
    setShowCardModal(false);
    showToast('New corporate credit card added and verified.');
    setCardNumber('');
  };

  const tabs = [
    'Plan Tiers',
    'Team Seats',
    'Invoices & Receipts',
    'Payment Methods',
    'Billing Details',
  ];

  return (
    <EmployerShell active="/employer/billing">
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

      {/* Invite Member Modal */}
      {showInviteModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="invite-seat-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        >
          <div className="w-full max-w-md rounded-2xl border border-[#E5E1D8] bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E1D8]">
              <h3 id="invite-seat-title" className="text-base font-semibold text-[#0F1B2D]">
                Invite Team Member (Seat 5 of 10)
              </h3>
              <button
                type="button"
                onClick={() => setShowInviteModal(false)}
                className="text-[#4A5568] hover:text-[#0F1B2D]"
                aria-label="Close dialog"
              >
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleInviteMember} className="mt-4 space-y-4">
              <div>
                <label htmlFor="member-email" className="block text-xs font-medium text-[#0F1B2D] mb-1">
                  Work Email Address
                </label>
                <input
                  id="member-email"
                  type="email"
                  required
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="colleague@northstarlabs.com"
                  className="w-full rounded-lg border border-[#E5E1D8] px-3 py-2 text-xs text-[#0F1B2D] focus:border-[#B8955A] focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="member-role" className="block text-xs font-medium text-[#0F1B2D] mb-1">
                  Access Level & Role
                </label>
                <select
                  id="member-role"
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value)}
                  className="w-full rounded-lg border border-[#E5E1D8] bg-white px-3 py-2 text-xs text-[#0F1B2D] focus:border-[#B8955A] focus:outline-none"
                >
                  <option value="Recruiter">Recruiter (Post jobs, manage candidates)</option>
                  <option value="Hiring Manager">Hiring Manager (Review scorecards)</option>
                  <option value="Admin">Administrator (Billing & permissions)</option>
                  <option value="Interviewer">Interviewer (Conduct interviews)</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <EmployerBtn variant="secondary" size="sm" onClick={() => setShowInviteModal(false)}>
                  Cancel
                </EmployerBtn>
                <EmployerBtn type="submit" variant="primary" size="sm">
                  Send Seat Invite
                </EmployerBtn>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Card Modal */}
      {showCardModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="card-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        >
          <div className="w-full max-w-md rounded-2xl border border-[#E5E1D8] bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E1D8]">
              <h3 id="card-modal-title" className="text-base font-semibold text-[#0F1B2D]">
                Add Payment Method
              </h3>
              <button
                type="button"
                onClick={() => setShowCardModal(false)}
                className="text-[#4A5568] hover:text-[#0F1B2D]"
                aria-label="Close dialog"
              >
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleAddCard} className="mt-4 space-y-4">
              <div>
                <label htmlFor="card-number" className="block text-xs font-medium text-[#0F1B2D] mb-1">
                  Card Number
                </label>
                <input
                  id="card-number"
                  type="text"
                  required
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="•••• •••• •••• 4242"
                  className="w-full rounded-lg border border-[#E5E1D8] px-3 py-2 text-xs text-[#0F1B2D] focus:border-[#B8955A] focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="card-expiry" className="block text-xs font-medium text-[#0F1B2D] mb-1">
                    Expiry (MM/YY)
                  </label>
                  <input
                    id="card-expiry"
                    type="text"
                    placeholder="12/28"
                    className="w-full rounded-lg border border-[#E5E1D8] px-3 py-2 text-xs text-[#0F1B2D] focus:border-[#B8955A] focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="card-cvc" className="block text-xs font-medium text-[#0F1B2D] mb-1">
                    CVC
                  </label>
                  <input
                    id="card-cvc"
                    type="text"
                    placeholder="•••"
                    className="w-full rounded-lg border border-[#E5E1D8] px-3 py-2 text-xs text-[#0F1B2D] focus:border-[#B8955A] focus:outline-none"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <EmployerBtn variant="secondary" size="sm" onClick={() => setShowCardModal(false)}>
                  Cancel
                </EmployerBtn>
                <EmployerBtn type="submit" variant="primary" size="sm">
                  Save Card
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
              <span className="inline-flex items-center gap-1 rounded-full bg-[#F3EBDD] px-2.5 py-0.5 text-xs font-semibold text-[#806236] border border-[#B8955A]/30">
                <Sparkles size={12} /> {company.plan} Plan (Annual Billing)
              </span>
              <span className="text-xs text-[#4A5568]">Verified Organization</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F1B2D]">
              Subscription & Hiring Plans
            </h1>
            <p className="text-xs sm:text-sm text-[#4A5568]">
              Manage job quotas, recruiter seats, add-on sourcing packs, and corporate tax invoices. Candidates are never charged.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <EmployerBtn
              variant="secondary"
              size="sm"
              onClick={() => showToast('Upcoming renewal invoice preview loaded')}
            >
              <FileText size={14} className="mr-1.5" /> Preview Invoice
            </EmployerBtn>
          </div>
        </div>

        {/* Metrics Row */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {billingSummary.map((s, idx) => (
            <div key={idx} className="rounded-2xl border border-[#E5E1D8] bg-white p-5 shadow-sm">
              <span className="text-xs font-semibold text-[#4A5568]">{s.label}</span>
              <p className="font-serif text-2xl font-bold text-[#0F1B2D] mt-1">{s.value}</p>
              <p className="text-xs text-[#806236] mt-1">Growth tier</p>
            </div>
          ))}
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

        {/* Tab Content */}
        <div className="grid gap-6 lg:grid-cols-12 min-w-0">
          <div className="lg:col-span-8 space-y-6 min-w-0">
            {activeTab === 'Plan Tiers' && (
              <div className="space-y-6">
                <div className="grid gap-6 md:grid-cols-3">
                  {plans.map((p) => {
                    const isCurrent = p.name === company.plan;
                    return (
                      <div
                        key={p.name}
                        className={`rounded-2xl border p-5 flex flex-col justify-between space-y-4 transition ${
                          isCurrent
                            ? 'border-[#B8955A] bg-[#FAF8F4] shadow-md ring-1 ring-[#B8955A]'
                            : 'border-[#E5E1D8] bg-white hover:border-[#B8955A]'
                        }`}
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <h3 className="font-serif text-lg font-bold text-[#0F1B2D]">
                              {p.name}
                            </h3>
                            {isCurrent && (
                              <span className="rounded-full bg-[#B8955A] px-2.5 py-0.5 text-[10px] font-bold text-white">
                                Current
                              </span>
                            )}
                          </div>
                          <div className="flex items-baseline gap-1">
                            <span className="font-serif text-2xl font-bold text-[#0F1B2D]">{p.price}</span>
                            <span className="text-xs text-[#4A5568]">{p.period}</span>
                          </div>
                          <p className="text-xs text-[#4A5568]">{p.tagline}</p>
                          <ul className="space-y-2 border-t border-[#E5E1D8] pt-3 text-xs text-[#0F1B2D]">
                            {p.features?.map((f, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <Check size={14} className="text-[#806236] shrink-0 mt-0.5" />
                                <span>{f}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          {isCurrent ? (
                            <EmployerBtn
                              variant="secondary"
                              size="sm"
                              className="w-full"
                              onClick={() => showToast('You are on the Growth plan. Manage add-ons below.')}
                            >
                              Current Plan
                            </EmployerBtn>
                          ) : (
                            <EmployerBtn
                              variant="primary"
                              size="sm"
                              className="w-full"
                              onClick={() => showToast(`Tier change to ${p.name} requested.`)}
                            >
                              Select {p.name}
                            </EmployerBtn>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {activeTab === 'Team Seats' && (
              <EmployerCard title="Recruiter & Hiring Panel Seats">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-[#4A5568]">
                      4 of 10 team seats assigned. Unused seats incur no extra fees on Growth.
                    </p>
                    <EmployerBtn
                      variant="primary"
                      size="sm"
                      onClick={() => setShowInviteModal(true)}
                    >
                      <UserPlus size={14} className="mr-1.5" /> Invite Member
                    </EmployerBtn>
                  </div>
                  <div className="divide-y divide-[#E5E1D8]">
                    {seats.map((st, idx) => (
                      <div key={idx} className="py-3 first:pt-0 last:pb-0 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FAF8F4] font-serif font-bold text-[#806236] border border-[#E5E1D8]">
                            {st.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-semibold text-[#0F1B2D]">{st.name}</p>
                            <p className="text-[#4A5568]">{st.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="rounded-full bg-[#FAF8F4] px-2.5 py-0.5 font-medium text-[#806236] border border-[#E5E1D8]">
                            {st.role}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </EmployerCard>
            )}

            {activeTab === 'Invoices & Receipts' && (
              <EmployerCard title="Tax Invoices & Billing History">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs min-w-[480px]">
                    <thead className="bg-[#FAF8F4] text-[#4A5568] border-b border-[#E5E1D8]">
                      <tr>
                        <th className="px-3 py-2.5 font-semibold">Invoice #</th>
                        <th className="px-3 py-2.5 font-semibold">Date</th>
                        <th className="px-3 py-2.5 font-semibold">Amount</th>
                        <th className="px-3 py-2.5 font-semibold">Status</th>
                        <th className="px-3 py-2.5 font-semibold text-right">PDF</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E5E1D8]">
                      {invoices.map((inv, idx) => (
                        <tr key={idx} className="hover:bg-[#FAF8F4]/50">
                          <td className="px-3 py-2.5 font-semibold text-[#0F1B2D]">{inv.id}</td>
                          <td className="px-3 py-2.5 text-[#4A5568]">{inv.date}</td>
                          <td className="px-3 py-2.5 font-semibold text-[#0F1B2D]">{inv.amount}</td>
                          <td className="px-3 py-2.5">
                            <span className="inline-flex rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700">
                              {inv.status}
                            </span>
                          </td>
                          <td className="px-3 py-2.5 text-right">
                            <button
                              type="button"
                              onClick={() => showToast(`Invoice ${inv.id} downloaded.`)}
                              className="text-[#806236] hover:underline inline-flex items-center gap-1"
                            >
                              <Download size={12} /> Download
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </EmployerCard>
            )}

            {activeTab === 'Payment Methods' && (
              <EmployerCard title="Stored Payment Methods">
                <div className="space-y-4 text-xs">
                  <div className="rounded-xl border border-[#E5E1D8] bg-white p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CreditCard size={24} className="text-[#806236]" />
                      <div>
                        <p className="font-semibold text-[#0F1B2D]">Corporate Visa •••• 4417</p>
                        <p className="text-[#4A5568]">Expires 09/28 · Default renewal method</p>
                      </div>
                    </div>
                    <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 font-medium text-emerald-700 border border-emerald-200">
                      Active Default
                    </span>
                  </div>
                  <EmployerBtn
                    variant="secondary"
                    size="sm"
                    onClick={() => setShowCardModal(true)}
                  >
                    <Plus size={14} className="mr-1.5" /> Add Payment Card
                  </EmployerBtn>
                </div>
              </EmployerCard>
            )}

            {activeTab === 'Billing Details' && (
              <EmployerCard title="Corporate Invoicing Details">
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between py-1.5 border-b border-[#E5E1D8]">
                    <span className="text-[#4A5568]">Legal Entity:</span>
                    <span className="font-semibold text-[#0F1B2D]">Northstar Labs Private Limited</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-[#E5E1D8]">
                    <span className="text-[#4A5568]">Registered GSTIN:</span>
                    <span className="font-semibold text-[#0F1B2D]">29ABCDE1234F1Z5</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-[#E5E1D8]">
                    <span className="text-[#4A5568]">Billing Address:</span>
                    <span className="font-semibold text-[#0F1B2D]">84 Koramangala 4th Block, Bengaluru 560034</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-[#4A5568]">Tax Exemption:</span>
                    <span className="text-[#0F1B2D]">DPIIT Startup India Certificate Verified</span>
                  </div>
                </div>
              </EmployerCard>
            )}
          </div>

          {/* Right Summary */}
          <div className="lg:col-span-4 space-y-6 min-w-0">
            <EmployerCard title="Upcoming Renewal">
              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-[#4A5568]">Next Charge:</span>
                  <span className="font-bold text-base text-[#0F1B2D]">₹59,880</span>
                </div>
                <div className="flex justify-between items-center py-1 border-t border-[#E5E1D8]">
                  <span className="text-[#4A5568]">Renewal Date:</span>
                  <span className="font-semibold text-[#0F1B2D]">01 March 2027</span>
                </div>
                <div className="flex justify-between items-center py-1 border-t border-[#E5E1D8]">
                  <span className="text-[#4A5568]">Payment Method:</span>
                  <span className="font-semibold text-[#806236]">Visa •••• 4417</span>
                </div>
                <EmployerBtn
                  variant="secondary"
                  size="sm"
                  className="w-full mt-2"
                  onClick={() => showToast('Renewal schedule confirmed')}
                >
                  Manage Auto-Renew
                </EmployerBtn>
              </div>
            </EmployerCard>

            <SafetyStrip />
          </div>
        </div>
      </div>
    </EmployerShell>
  );
}
