'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Wallet, Check, AlertCircle, X } from 'lucide-react';
import { InvestorShell, Card, Button } from '@/components';
import { InvestorDisclaimer } from '../../investor-data';

export default function InvestorCommitmentDetailPage({ params }) {
  const commitmentId = params?.commitmentId || 'acme-seed';
  const [modal, setModal] = useState('');
  const [fundsAmount, setFundsAmount] = useState('₹15,00,000');
  const [tranche2Sent, setTranche2Sent] = useState(false);

  return (
    <InvestorShell
      active="Commitments"
      module="Deal flow"
      title="Commitment execution"
      description="Closing checklist, legal documentation execution and funds transfer records."
      backHref="/investor/commitments"
      backLabel="← Back to Commitments"
      actions={
        <div className="flex items-center gap-2">
          <Link
            href="/investor/commitments"
            className="inline-flex min-h-10 items-center rounded-lg border border-[#E5E1D8] bg-white px-3.5 text-xs font-semibold text-ink hover:bg-[#FAF8F4]"
          >
            ← Commitments
          </Link>
          <Button onClick={() => setModal('record-funds')}>
            Record funds sent
          </Button>
        </div>
      }
    >
      {({ notify }) => (
        <>
          <div className="grid items-start gap-6 xl:grid-cols-3">
            <div className="space-y-6 xl:col-span-2">
              <Card title="Commitment summary">
                <div className="rounded-xl bg-[#FAF8F4] p-4 border border-[#E5E1D8]">
                  <p className="text-sm font-bold text-ink">
                    Acme Studio · Seed Round · ₹25L SAFE
                  </p>
                  <p className="mt-1 text-xs text-[#4A5568]">
                    Linked offer: <span className="font-semibold text-ink">offer-104 (v2)</span> · Expected closing: Nov 30, 2026 · Target ownership: 2.4% est.
                  </p>
                </div>
              </Card>

              <Card title="Definitive closing checklist">
                <div className="space-y-3 text-xs">
                  {[
                    ['Term sheet countersigned', true],
                    ['Commercial diligence completed', true],
                    ['Definitive investment agreement signed', true],
                    ['Corporate board & shareholder consents approved', true],
                    ['Regulatory filings and notices prepared', false],
                    ['KYC and AML investor verification cleared', false],
                    ['Payment wire instructions confirmed over independent channel', false],
                    ['Tranche 1 funds wired & verified', true],
                    ['Tranche 2 funds wired', tranche2Sent],
                    ['Share certificate / SAFE instrument issued', false],
                    ['Cap table officially updated by company secretary', false],
                  ].map(([task, done]) => (
                    <label
                      key={task}
                      className="flex items-center justify-between border-b border-[#E5E1D8] pb-2.5 cursor-pointer"
                    >
                      <span className="flex items-center gap-2.5 font-medium text-ink">
                        <input
                          type="checkbox"
                          defaultChecked={done}
                          className="h-4 w-4 rounded accent-ink"
                        />
                        <span>{task}</span>
                      </span>
                      <span
                        className={`text-xs font-semibold ${
                          done ? 'text-[#286749]' : 'text-[#8A5700]'
                        }`}
                      >
                        {done ? 'Completed' : 'Pending'}
                      </span>
                    </label>
                  ))}
                </div>
              </Card>

              <Card title="Capital tranches & funds tracker">
                <div className="space-y-3 text-xs">
                  <div className="rounded-lg border border-[#E5E1D8] p-3.5 flex items-center justify-between">
                    <div>
                      <b className="text-ink">Tranche 1 · ₹10,00,000</b>
                      <span className="block text-[#4A5568]">Wired Nov 02, 2026 · Verified by company</span>
                    </div>
                    <span className="rounded-full bg-[#E7F3EC] px-2.5 py-0.5 font-semibold text-[#286749]">
                      Settled
                    </span>
                  </div>

                  <div className="rounded-lg border border-[#E5E1D8] p-3.5 flex items-center justify-between">
                    <div>
                      <b className="text-ink">Tranche 2 · ₹15,00,000</b>
                      <span className="block text-[#4A5568]">
                        Due Nov 20, 2026 · {tranche2Sent ? 'Sent · Awaiting company receipt' : 'Pending wire transfer'}
                      </span>
                    </div>
                    <span
                      className={`rounded-full px-2.5 py-0.5 font-semibold ${
                        tranche2Sent
                          ? 'bg-[#E7F3EC] text-[#286749]'
                          : 'bg-[#FFF3D6] text-[#8A5700]'
                      }`}
                    >
                      {tranche2Sent ? 'Awaiting receipt' : 'Pending'}
                    </span>
                  </div>
                </div>

                <div className="mt-4 rounded-lg bg-[#FFF8E8] p-3 text-xs text-[#806236] border border-[#E7D4B0]">
                  <AlertCircle size={14} className="mr-1.5 inline" />
                  The platform does not hold, move or escrow funds. Always verify bank accounts through an independent verbal telephone call.
                </div>
              </Card>
            </div>

            {/* Sidebar dates & actions */}
            <aside className="space-y-6">
              <Card title="Key dates">
                <dl className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <dt className="text-[#4A5568]">Tranche 2 Due</dt>
                    <dd className="font-semibold text-ink">Nov 20, 2026</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-[#4A5568]">Target Close</dt>
                    <dd className="font-semibold text-ink">Nov 30, 2026</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-[#4A5568]">Long-stop Date</dt>
                    <dd className="font-semibold text-ink">Dec 15, 2026</dd>
                  </div>
                </dl>
              </Card>

              <Card title="Associated files">
                <Link
                  href="/investor/offers/offer-104"
                  className="block text-xs font-semibold text-[#9A7A45] hover:underline"
                >
                  View signed term sheet (v2) →
                </Link>
                <Link
                  href="/investor/data-rooms/acme"
                  className="mt-2 block text-xs font-semibold text-[#9A7A45] hover:underline"
                >
                  Inspect legal data room →
                </Link>
              </Card>
            </aside>
          </div>

          <InvestorDisclaimer onLearnMore={() => notify('Platform disclaimer opened.')} />

          {/* Record Funds Modal */}
          {modal === 'record-funds' && (
            <div className="fixed inset-0 z-50 grid place-items-center bg-ink/50 p-4 backdrop-blur-sm">
              <section
                role="dialog"
                aria-modal="true"
                className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
              >
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="serif text-xl font-bold text-ink">Record funds transfer</h2>
                  <button type="button" onClick={() => setModal('')}>
                    <X size={18} />
                  </button>
                </div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setTranche2Sent(true);
                    notify('Funds transfer of ₹15,00,000 recorded. Startup notified for confirmation.');
                    setModal('');
                  }}
                  className="space-y-3"
                >
                  <div>
                    <label htmlFor="funds-amount" className="block text-xs font-medium text-ink">
                      Wired amount
                    </label>
                    <input
                      id="funds-amount"
                      value={fundsAmount}
                      onChange={(e) => setFundsAmount(e.target.value)}
                      className="mt-1 h-10 w-full rounded-lg border border-[#E5E1D8] px-3 text-xs focus:border-ink focus:outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="funds-ref" className="block text-xs font-medium text-ink">
                      Bank reference / UTR code (masked)
                    </label>
                    <input
                      id="funds-ref"
                      placeholder="e.g. HDFC••••1942"
                      required
                      className="mt-1 h-10 w-full rounded-lg border border-[#E5E1D8] px-3 text-xs focus:border-ink focus:outline-none"
                    />
                  </div>
                  <p className="text-[11px] text-[#4A5568]">
                    This records your transfer. Status updates to Settled once acknowledged by the startup.
                  </p>
                  <div className="flex justify-end gap-2 pt-3">
                    <button
                      type="button"
                      onClick={() => setModal('')}
                      className="rounded-lg border px-3 py-2 text-xs font-medium text-[#4A5568]"
                    >
                      Cancel
                    </button>
                    <Button type="submit">Confirm funds sent</Button>
                  </div>
                </form>
              </section>
            </div>
          )}
        </>
      )}
    </InvestorShell>
  );
}
