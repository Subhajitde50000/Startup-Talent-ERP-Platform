'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Handshake, FileText, Check } from 'lucide-react';
import { InvestorShell, Card, Button } from '@/components';
import { InvestorDisclaimer } from '../../investor-data';

export default function InvestorNewOfferPage() {
  const [startup, setStartup] = useState('Acme Studio');
  const [amount, setAmount] = useState('₹25,00,000');
  const [instrument, setInstrument] = useState('SAFE');
  const [valuation, setValuation] = useState('₹10 Cr cap');

  return (
    <InvestorShell
      active="Offers"
      module="Deal flow"
      title="Create term sheet offer"
      description="Draft and propose investment terms for an active company in your pipeline."
      backHref="/investor/offers"
      backLabel="← Back to Offers"
      actions={
        <Link
          href="/investor/offers"
          className="inline-flex min-h-10 items-center rounded-lg border border-[#E5E1D8] bg-white px-3.5 text-xs font-semibold text-ink hover:bg-[#FAF8F4]"
        >
          ← Offers
        </Link>
      }
    >
      {({ notify }) => (
        <>
          <div className="grid items-start gap-6 xl:grid-cols-[1fr_340px]">
            {/* Form Fields Column */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                notify(`Offer for ${amount} (${instrument}) submitted to ${startup}. Version v1 recorded.`);
              }}
              className="space-y-6"
            >
              <Card title="1 · Startup and fundraising round">
                <div>
                  <label htmlFor="target-startup" className="block text-xs font-medium text-ink">
                    Select startup from pipeline
                  </label>
                  <select
                    id="target-startup"
                    value={startup}
                    onChange={(e) => setStartup(e.target.value)}
                    className="mt-1 h-10 w-full rounded-lg border border-[#E5E1D8] bg-white px-3 text-xs focus:border-ink focus:outline-none"
                  >
                    <option>Acme Studio · Seed round</option>
                    <option>OrbitPay · Seed round</option>
                    <option>GreenLedger · Pre-seed</option>
                  </select>
                </div>
              </Card>

              <Card title="2 · Investment amount & instrument">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="offer-amount" className="block text-xs font-medium text-ink">
                      Proposed commitment amount
                    </label>
                    <input
                      id="offer-amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="e.g. ₹25,00,000"
                      className="mt-1 h-10 w-full rounded-lg border border-[#E5E1D8] px-3 text-xs focus:border-ink focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="offer-inst" className="block text-xs font-medium text-ink">
                      Investment instrument
                    </label>
                    <select
                      id="offer-inst"
                      value={instrument}
                      onChange={(e) => setInstrument(e.target.value)}
                      className="mt-1 h-10 w-full rounded-lg border border-[#E5E1D8] bg-white px-3 text-xs focus:border-ink focus:outline-none"
                    >
                      <option>SAFE (Simple Agreement for Future Equity)</option>
                      <option>Equity (Priced Round)</option>
                      <option>Convertible Note</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="offer-val" className="block text-xs font-medium text-ink">
                      Valuation cap / Pre-money valuation
                    </label>
                    <input
                      id="offer-val"
                      value={valuation}
                      onChange={(e) => setValuation(e.target.value)}
                      placeholder="e.g. ₹10 Cr cap"
                      className="mt-1 h-10 w-full rounded-lg border border-[#E5E1D8] px-3 text-xs focus:border-ink focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="offer-role" className="block text-xs font-medium text-ink">
                      Investor role in round
                    </label>
                    <select
                      id="offer-role"
                      className="mt-1 h-10 w-full rounded-lg border border-[#E5E1D8] bg-white px-3 text-xs focus:border-ink focus:outline-none"
                    >
                      <option>Participating investor</option>
                      <option>Lead investor</option>
                      <option>Co-lead</option>
                    </select>
                  </div>
                </div>
              </Card>

              <Card title="3 · Key rights & covenants">
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    ['Discount rate', '15%'],
                    ['Maturity / expiry period', '18 months'],
                    ['Board observer seat', 'Observer seat requested'],
                    ['Liquidation preference', '1x Non-participating'],
                    ['Information rights', 'Quarterly KPIs & annual audited accounts'],
                    ['Pro-rata rights', 'Major investor pro-rata in next round'],
                  ].map(([label, placeholder]) => (
                    <div key={label}>
                      <label className="block text-xs font-medium text-ink">{label}</label>
                      <input
                        placeholder={placeholder}
                        className="mt-1 h-10 w-full rounded-lg border border-[#E5E1D8] px-3 text-xs focus:border-ink focus:outline-none"
                      />
                    </div>
                  ))}
                </div>
              </Card>

              <Card title="4 · Message & cover note to founders">
                <label htmlFor="cover-msg" className="block text-xs font-medium text-ink">
                  Note to founder
                </label>
                <textarea
                  id="cover-msg"
                  rows={4}
                  placeholder="Outline context, rationale and strategic partnership value..."
                  className="mt-1 w-full rounded-lg border border-[#E5E1D8] p-3 text-xs focus:border-ink focus:outline-none"
                />
              </Card>

              <div className="flex flex-wrap items-center gap-3">
                <Button type="submit">Submit offer to founder</Button>
                <Button
                  secondary
                  onClick={() => notify('Term sheet draft saved.')}
                >
                  Save as draft
                </Button>
                <button
                  type="button"
                  onClick={() => notify('Sample SAFE template downloaded.')}
                  className="rounded-lg border border-[#E5E1D8] bg-white px-3.5 py-2 text-xs font-medium text-ink hover:bg-[#FAF8F4]"
                >
                  Generate sample SAFE
                </button>
              </div>
            </form>

            {/* Live Summary Column */}
            <aside className="space-y-6">
              <Card title="Term sheet summary">
                <dl className="space-y-2 text-xs">
                  <div className="flex justify-between border-b border-[#E5E1D8] pb-2">
                    <dt className="text-[#4A5568]">Target</dt>
                    <dd className="font-semibold text-ink">{startup}</dd>
                  </div>
                  <div className="flex justify-between border-b border-[#E5E1D8] pb-2">
                    <dt className="text-[#4A5568]">Amount</dt>
                    <dd className="font-semibold text-ink">{amount}</dd>
                  </div>
                  <div className="flex justify-between border-b border-[#E5E1D8] pb-2">
                    <dt className="text-[#4A5568]">Instrument</dt>
                    <dd className="font-semibold text-ink">{instrument}</dd>
                  </div>
                  <div className="flex justify-between border-b border-[#E5E1D8] pb-2">
                    <dt className="text-[#4A5568]">Valuation</dt>
                    <dd className="font-semibold text-ink">{valuation}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-[#4A5568]">Est. Dilution</dt>
                    <dd className="font-semibold text-[#806236]">2.5% est.</dd>
                  </div>
                </dl>
              </Card>

              <Card title="Legal note">
                <p className="text-xs leading-relaxed text-[#4A5568]">
                  Term sheet records created here are non-binding unless a mutually executed agreement expressly states otherwise. Always obtain independent legal and financial advice before executing binding venture commitments.
                </p>
              </Card>
            </aside>
          </div>

          <InvestorDisclaimer onLearnMore={() => notify('Platform disclaimer opened.')} />
        </>
      )}
    </InvestorShell>
  );
}
