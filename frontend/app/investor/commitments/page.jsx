'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Wallet, Plus, X } from 'lucide-react';
import { InvestorShell, Card, Button } from '@/components';
import { InvestorDisclaimer } from '../investor-data';

export default function InvestorCommitmentsPage() {
  const [tab, setTab] = useState('Active');
  const [modal, setModal] = useState('');

  const commitments = [
    {
      id: 'acme-seed',
      startup: 'Acme Studio · Seed',
      amount: '₹25L · SAFE',
      linkedOffer: 'offer-104 · v2',
      status: 'Docs in progress',
      docs: '4 of 6 signed',
      funds: '₹10L sent · ₹15L pending',
      closing: 'Nov 30, 2026',
      owner: 'Arjun Mehta',
    },
    {
      id: 'greenledger-preseed',
      startup: 'GreenLedger · Pre-seed',
      amount: '₹10L · SAFE',
      linkedOffer: 'offer-097 · v3',
      status: 'Funds pending',
      docs: '6 of 6 signed',
      funds: '₹0 sent · ₹10L pending',
      closing: 'Nov 20, 2026',
      owner: 'Arjun Mehta',
    },
    {
      id: 'orbitpay-seed',
      startup: 'OrbitPay · Seed',
      amount: '₹40L · Equity',
      linkedOffer: 'offer-102 · v1',
      status: 'Funds sent',
      docs: '5 of 6 signed',
      funds: '₹40L sent · awaiting receipt',
      closing: 'Dec 10, 2026',
      owner: 'Mira Shah',
    },
  ];

  return (
    <InvestorShell
      active="Commitments"
      module="Deal flow"
      title="Commitments & capital allocation"
      description="Track capital commitments, definitive documents and funds settlement."
      actions={
        <Button secondary onClick={() => setModal('new-commitment')}>
          <Plus size={14} /> Record commitment
        </Button>
      }
    >
      {({ notify }) => (
        <>
          {/* Stat Strip */}
          <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-5">
            {[
              ['Total committed', '₹1.2 Cr'],
              ['Funds sent', '₹70L'],
              ['Funds pending', '₹50L'],
              ['Closings in 30 days', '2'],
              ['Docs awaiting signature', '3'],
            ].map(([x, y]) => (
              <div key={x} className="rounded-xl border border-[#E5E1D8] bg-white p-4">
                <span className="text-xs font-medium text-[#4A5568]">{x}</span>
                <span className="serif mt-1 block text-2xl font-semibold text-ink">{y}</span>
              </div>
            ))}
          </div>

          {/* Sub Navigation Tabs */}
          <div className="mb-6 flex gap-2">
            {['Active', 'Awaiting funds', 'Closed', 'Cancelled'].map((x) => (
              <button
                key={x}
                type="button"
                onClick={() => setTab(x)}
                className={`min-h-10 rounded-lg px-4 text-xs font-semibold transition ${
                  tab === x
                    ? 'bg-ink text-white'
                    : 'border border-[#E5E1D8] bg-white text-[#4A5568] hover:bg-[#FAF8F4] hover:text-ink'
                }`}
              >
                {x}
              </button>
            ))}
          </div>

          <Card title="Commitment registry">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[950px] text-left text-xs">
                <thead>
                  <tr className="border-b border-[#E5E1D8] text-[#4A5568]">
                    {['Startup & Round', 'Amount & Instrument', 'Linked Offer', 'Status', 'Closing Docs', 'Funds Status', 'Target Close', 'Lead', 'Actions'].map((x) => (
                      <th key={x} className="py-3 font-semibold">
                        {x}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E1D8]">
                  {commitments.map((c) => (
                    <tr key={c.id} className="hover:bg-[#FAF8F4]/50">
                      <td className="py-3 font-semibold text-ink">{c.startup}</td>
                      <td className="py-3 font-medium text-ink">{c.amount}</td>
                      <td className="py-3">{c.linkedOffer}</td>
                      <td className="py-3">
                        <span className="rounded-full bg-[#F3EBDD] px-2.5 py-0.5 text-xs font-medium text-[#806236]">
                          {c.status}
                        </span>
                      </td>
                      <td className="py-3">{c.docs}</td>
                      <td className="py-3">{c.funds}</td>
                      <td className="py-3">{c.closing}</td>
                      <td className="py-3">{c.owner}</td>
                      <td className="py-3">
                        <Link
                          href={`/investor/commitments/${c.id}`}
                          className="font-semibold text-[#9A7A45] hover:underline"
                        >
                          View details →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <InvestorDisclaimer onLearnMore={() => notify('Platform disclaimer opened.')} />

          {/* Modal */}
          {modal === 'new-commitment' && (
            <div className="fixed inset-0 z-50 grid place-items-center bg-ink/50 p-4 backdrop-blur-sm">
              <section
                role="dialog"
                aria-modal="true"
                className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
              >
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="serif text-xl font-bold text-ink">Record commitment</h2>
                  <button type="button" onClick={() => setModal('')}>
                    <X size={18} />
                  </button>
                </div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    notify('Commitment recorded in workspace.');
                    setModal('');
                  }}
                  className="space-y-3"
                >
                  <div>
                    <label htmlFor="comm-offer" className="block text-xs font-medium text-ink">
                      Accepted term sheet offer
                    </label>
                    <select
                      id="comm-offer"
                      className="mt-1 h-10 w-full rounded-lg border border-[#E5E1D8] bg-white px-3 text-xs focus:border-ink focus:outline-none"
                    >
                      <option>Acme Studio · offer-104 (₹25L SAFE)</option>
                      <option>GreenLedger · offer-097 (₹10L SAFE)</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="comm-close" className="block text-xs font-medium text-ink">
                      Estimated closing date
                    </label>
                    <input
                      id="comm-close"
                      type="date"
                      required
                      className="mt-1 h-10 w-full rounded-lg border border-[#E5E1D8] px-3 text-xs focus:border-ink focus:outline-none"
                    />
                  </div>
                  <div className="flex justify-end gap-2 pt-3">
                    <button
                      type="button"
                      onClick={() => setModal('')}
                      className="rounded-lg border px-3 py-2 text-xs font-medium text-[#4A5568]"
                    >
                      Cancel
                    </button>
                    <Button type="submit">Record commitment</Button>
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
