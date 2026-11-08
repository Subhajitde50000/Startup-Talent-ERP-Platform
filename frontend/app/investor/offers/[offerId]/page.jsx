'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Handshake, FileText, X, Send } from 'lucide-react';
import { InvestorShell, Card, Button } from '@/components';
import { offers, InvestorDisclaimer } from '../../investor-data';

export default function InvestorOfferDetailPage({ params }) {
  const offerId = params?.offerId || 'offer-104';
  const offer = offers.find((o) => o.id === offerId) || offers[0];

  const [termsTab, setTermsTab] = useState('Terms');
  const [modal, setModal] = useState('');
  const [counterMsg, setCounterMsg] = useState('');

  return (
    <InvestorShell
      active="Offers"
      module="Deal flow"
      title={`Offer · ${offer.startup}`}
      description={`Review terms, negotiation history and documents for offer ${offer.id}.`}
      backHref="/investor/offers"
      backLabel="← Back to Offers"
      actions={
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/investor/offers"
            className="inline-flex min-h-10 items-center rounded-lg border border-[#E5E1D8] bg-white px-3.5 text-xs font-semibold text-ink hover:bg-[#FAF8F4]"
          >
            ← Offers
          </Link>
          <Button secondary onClick={() => setModal('withdraw')}>
            Withdraw offer
          </Button>
          <Button onClick={() => setModal('accept')}>
            Review counter
          </Button>
        </div>
      }
    >
      {({ notify }) => (
        <>
          {/* Status Alert Banner */}
          <div className="mb-6 rounded-xl bg-[#F3EBDD] p-4 text-xs text-[#806236] border border-[#E7D4B0] flex flex-wrap items-center justify-between gap-3">
            <div>
              <b>{offer.startup} countered with version v2.</b> Review changed valuation cap and discount terms below.
            </div>
            <span className="font-semibold">{offer.round} · Active Version {offer.version}</span>
          </div>

          {/* CRITICAL FIX FOR INVESTOR-ISSUE-004:
              Added overflow-x-auto, no-scrollbar, and shrink-0 to prevent 519px horizontal overflow blowout on 390px mobile viewports */}
          <div className="mb-6 flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {['Terms', 'Comparison', 'Negotiation', 'Documents', 'Approvals', 'History'].map((x) => (
              <button
                key={x}
                type="button"
                onClick={() => setTermsTab(x)}
                className={`min-h-10 shrink-0 rounded-lg px-4 text-xs font-semibold transition ${
                  termsTab === x
                    ? 'bg-ink text-white'
                    : 'border border-[#E5E1D8] bg-white text-[#4A5568] hover:bg-[#FAF8F4] hover:text-ink'
                }`}
              >
                {x}
              </button>
            ))}
          </div>

          {/* Tab Views */}
          {termsTab === 'Terms' && (
            <div className="grid items-start gap-6 xl:grid-cols-3">
              <div className="space-y-6 xl:col-span-2">
                {[
                  {
                    title: 'Economics & Valuation',
                    items: [
                      ['Offer amount', offer.amount, 'Round target ₹2 Cr'],
                      ['Instrument', offer.instrument, 'SAFE post-money'],
                      ['Valuation cap', offer.valuation, 'Target ₹10 Cr'],
                      ['Discount rate', '15%', 'Standard seed'],
                    ],
                  },
                  {
                    title: 'Governance & Investor Rights',
                    items: [
                      ['Board observer', 'Granted', '1 observer seat'],
                      ['Information rights', 'Quarterly', 'Unaudited quarterly + audited annual'],
                      ['Pro-rata rights', 'Full pro-rata', 'Valid for Series A'],
                    ],
                  },
                ].map((group) => (
                  <Card key={group.title} title={group.title}>
                    <div className="divide-y divide-[#E5E1D8] text-xs">
                      {group.items.map(([term, val, target]) => (
                        <div key={term} className="grid grid-cols-3 gap-2 py-3">
                          <span className="font-medium text-[#4A5568]">{term}</span>
                          <b className="font-semibold text-ink">{val}</b>
                          <span className="text-[#806236]">{target}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                ))}

                <Card title="Ownership & estimated dilution">
                  <div className="flex h-7 overflow-hidden rounded-lg">
                    <div className="w-[52%] bg-ink" title="Founders 52%" />
                    <div className="w-[20%] bg-[#B8955A]" title="ESOP 20%" />
                    <div className="w-[18%] bg-[#A0A7B4]" title="Existing 18%" />
                    <div className="w-[10%] bg-[#4A5568]" title="This offer 10%" />
                  </div>
                  <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-[#4A5568]">
                    <span className="flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-ink" /> Founders (52%)
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#B8955A]" /> ESOP (20%)
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#A0A7B4]" /> Prior Angels (18%)
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#4A5568]" /> New round (10%)
                    </span>
                  </div>
                </Card>
              </div>

              {/* Sidebar Snapshot */}
              <aside className="space-y-6">
                <Card title="Offer status & next step">
                  <span className="rounded-full bg-[#F3EBDD] px-2.5 py-1 text-xs font-semibold text-[#806236]">
                    {offer.status}
                  </span>
                  <p className="mt-3 text-xs text-[#4A5568]">Last activity: {offer.activity}</p>
                  <p className="mt-1 text-xs text-[#4A5568]">Offer expires: {offer.expiry}</p>
                  <Link
                    href={`/investor/startups/acme/diligence`}
                    className="mt-4 block text-xs font-semibold text-[#9A7A45] hover:underline"
                  >
                    Open diligence memo →
                  </Link>
                </Card>
              </aside>
            </div>
          )}

          {termsTab === 'Negotiation' && (
            <Card title="Negotiation timeline & counter history">
              <div className="space-y-4 text-xs">
                <div className="rounded-lg border border-[#E5E1D8] p-3.5">
                  <b className="text-ink">Version v1 sent by Arjun Mehta</b>
                  <span className="text-[#4A5568] block mt-0.5">Nov 01, 2026 · Initial SAFE ₹25L at ₹10 Cr cap</span>
                </div>
                <div className="rounded-lg bg-[#F3EBDD] p-3.5 border border-[#E7D4B0]">
                  <b className="text-[#806236]">Counter v2 submitted by Acme Studio founders</b>
                  <p className="mt-1 text-ink">
                    “We appreciate the offer! We propose adjusting valuation cap to ₹12 Cr and maintaining 15% discount given recent customer revenue growth.”
                  </p>
                  <span className="text-xs text-[#806236] block mt-1">Received Nov 04, 2026</span>
                </div>
              </div>

              <div className="mt-6 border-t border-[#E5E1D8] pt-4">
                <label htmlFor="counter-response" className="block text-xs font-medium text-ink">
                  Reply to founder's counter proposal
                </label>
                <textarea
                  id="counter-response"
                  value={counterMsg}
                  onChange={(e) => setCounterMsg(e.target.value)}
                  rows={3}
                  placeholder="Explain your stance or propose adjusted terms..."
                  className="mt-1 w-full rounded-lg border border-[#E5E1D8] p-3 text-xs focus:border-ink focus:outline-none"
                />
                <Button
                  className="mt-3"
                  onClick={() => {
                    notify('Counter message dispatched to founder.');
                    setCounterMsg('');
                  }}
                >
                  <Send size={13} /> Send counter response
                </Button>
              </div>
            </Card>
          )}

          {termsTab === 'Documents' && (
            <Card title="Term sheet documents">
              <div className="flex items-center justify-between border-b border-[#E5E1D8] pb-3 text-xs">
                <div>
                  <b className="block text-ink">Acme_Studio_TermSheet_v2.pdf</b>
                  <span className="text-[#4A5568]">Draft under negotiation · Signatures not initiated</span>
                </div>
                <button
                  type="button"
                  onClick={() => notify('Term sheet draft PDF downloaded.')}
                  className="font-semibold text-[#9A7A45] hover:underline"
                >
                  Download PDF
                </button>
              </div>
            </Card>
          )}

          {termsTab === 'Approvals' && (
            <Card title="Internal investment committee approvals">
              <p className="text-xs text-[#4A5568]">
                This ticket size (₹25L) falls within partner delegated authority. No additional Investment Committee vote required.
              </p>
            </Card>
          )}

          {termsTab === 'History' && (
            <Card title="Version history">
              <div className="space-y-3 text-xs">
                <p><b>Nov 04, 2026:</b> Startup submitted counter v2</p>
                <p><b>Nov 01, 2026:</b> Offer v1 transmitted by investor</p>
                <p><b>Oct 30, 2026:</b> Initial draft prepared in workspace</p>
              </div>
            </Card>
          )}

          {termsTab === 'Comparison' && (
            <Card title="Term variance comparison">
              <p className="text-xs text-[#4A5568]">
                Comparison between your initial v1 offer and the startup's v2 counter.
              </p>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#E5E1D8] text-[#4A5568]">
                      <th className="py-2">Term</th>
                      <th className="py-2">Your Offer (v1)</th>
                      <th className="py-2">Founder Counter (v2)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E1D8]">
                    <tr>
                      <td className="py-2 font-medium">Valuation Cap</td>
                      <td className="py-2">₹10 Cr</td>
                      <td className="py-2 font-bold text-[#806236]">₹12 Cr</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-medium">Investment Amount</td>
                      <td className="py-2">₹25L</td>
                      <td className="py-2">₹25L</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-medium">Discount</td>
                      <td className="py-2">20%</td>
                      <td className="py-2 font-bold text-[#806236]">15%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>
          )}

          <InvestorDisclaimer onLearnMore={() => notify('Platform disclaimer opened.')} />

          {/* Withdraw Modal */}
          {modal === 'withdraw' && (
            <div className="fixed inset-0 z-50 grid place-items-center bg-ink/50 p-4 backdrop-blur-sm">
              <section
                role="dialog"
                aria-modal="true"
                className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
              >
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="serif text-xl font-bold text-ink">Withdraw offer</h2>
                  <button type="button" onClick={() => setModal('')}>
                    <X size={18} />
                  </button>
                </div>
                <p className="text-xs text-[#4A5568]">
                  Are you sure you want to withdraw the offer to {offer.startup}? The founders will be respectfully notified.
                </p>
                <div className="mt-6 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setModal('')}
                    className="rounded-lg border px-3 py-2 text-xs font-medium text-[#4A5568]"
                  >
                    Cancel
                  </button>
                  <Button
                    onClick={() => {
                      notify('Offer withdrawn and archived.');
                      setModal('');
                    }}
                  >
                    Confirm withdrawal
                  </Button>
                </div>
              </section>
            </div>
          )}

          {/* Accept Counter Modal */}
          {modal === 'accept' && (
            <div className="fixed inset-0 z-50 grid place-items-center bg-ink/50 p-4 backdrop-blur-sm">
              <section
                role="dialog"
                aria-modal="true"
                className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
              >
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="serif text-xl font-bold text-ink">Accept counter offer</h2>
                  <button type="button" onClick={() => setModal('')}>
                    <X size={18} />
                  </button>
                </div>
                <p className="text-xs text-ink leading-relaxed">
                  Accepting version v2 will finalize the term sheet terms (₹25L SAFE at ₹12 Cr cap) and proceed to definitive closing documents.
                </p>
                <div className="mt-6 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setModal('')}
                    className="rounded-lg border px-3 py-2 text-xs font-medium text-[#4A5568]"
                  >
                    Cancel
                  </button>
                  <Button
                    onClick={() => {
                      notify('Counter accepted! Transitioning to Commitment and Closing workflow.');
                      setModal('');
                    }}
                  >
                    Accept counter terms
                  </Button>
                </div>
              </section>
            </div>
          )}
        </>
      )}
    </InvestorShell>
  );
}
