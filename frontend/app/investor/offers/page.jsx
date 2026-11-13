'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Handshake, Plus } from 'lucide-react';
import { InvestorShell, Card, Button } from '@/components';
import { offers, InvestorDisclaimer } from '../investor-data';

export default function InvestorOffersPage() {
  const [tab, setTab] = useState('All');
  const [view, setView] = useState('Cards');

  const filteredOffers = offers.filter(
    (o) => tab === 'All' || o.status === tab
  );

  return (
    <InvestorShell
      active="Offers"
      module="Deal flow"
      title="Offers and term sheets"
      description="Track offers and term sheet versions across your active deals."
      actions={
        <Link
          href="/investor/offers/new"
          className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-ink px-4 text-xs font-semibold text-white hover:bg-[#1C2B42]"
        >
          <Plus size={14} /> New offer
        </Link>
      }
    >
      {({ notify }) => (
        <>
          {/* Stat Strip */}
          <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-5">
            {[
              ['Open offers', '3'],
              ['Awaiting response', '2'],
              ['Total offered (open)', '₹1.5 Cr'],
              ['Expiring in 7 days', '1'],
              ['Accepted · documents', '1'],
            ].map(([label, val]) => (
              <div key={label} className="rounded-xl border border-[#E5E1D8] bg-white p-4">
                <span className="text-xs font-medium text-[#4A5568]">{label}</span>
                <span className="serif mt-1 block text-2xl font-semibold text-ink">{val}</span>
              </div>
            ))}
          </div>

          {/* Sub Navigation Tabs */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
              {[
                'All',
                'Drafts',
                'Awaiting approval',
                'Sent',
                'Countered',
                'Accepted',
                'Closed and declined',
              ].map((x) => (
                <button
                  key={x}
                  type="button"
                  onClick={() => setTab(x)}
                  className={`min-h-10 shrink-0 rounded-lg px-4 text-xs font-semibold transition ${
                    tab === x
                      ? 'bg-ink text-white'
                      : 'border border-[#E5E1D8] bg-white text-[#4A5568] hover:bg-[#FAF8F4] hover:text-ink'
                  }`}
                >
                  {x}
                </button>
              ))}
            </div>

            <div className="flex items-center rounded-lg border border-[#E5E1D8] bg-white p-1">
              <button
                type="button"
                onClick={() => setView('Cards')}
                className={`rounded-md px-3 py-1 text-xs font-semibold transition ${
                  view === 'Cards' ? 'bg-ink text-white' : 'text-[#4A5568] hover:text-ink'
                }`}
              >
                Cards
              </button>
              <button
                type="button"
                onClick={() => setView('Table')}
                className={`rounded-md px-3 py-1 text-xs font-semibold transition ${
                  view === 'Table' ? 'bg-ink text-white' : 'text-[#4A5568] hover:text-ink'
                }`}
              >
                Table
              </button>
            </div>
          </div>

          {/* Offers List */}
          {view === 'Cards' ? (
            <div className="space-y-4">
              {filteredOffers.map((o) => (
                <Card
                  key={o.id}
                  title={
                    <div className="flex items-center gap-2">
                      <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#F3EBDD] font-bold text-ink text-xs">
                        {o.logo}
                      </span>
                      <div>
                        <span className="font-bold text-ink">{o.startup}</span>
                        <span className="ml-2 text-xs font-normal text-[#4A5568]">{o.round}</span>
                      </div>
                    </div>
                  }
                  action={
                    <span className="rounded-full bg-[#F3EBDD] px-2.5 py-0.5 text-xs font-semibold text-[#806236]">
                      {o.status}
                    </span>
                  }
                >
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 text-xs border-y border-[#E5E1D8] py-3.5 my-2">
                    <div>
                      <span className="text-[#4A5568]">Offered amount</span>
                      <b className="mt-1 block font-semibold text-ink">
                        {o.amount} · {o.instrument}
                      </b>
                    </div>
                    <div>
                      <span className="text-[#4A5568]">Valuation / Cap</span>
                      <b className="mt-1 block font-semibold text-ink">{o.valuation}</b>
                    </div>
                    <div>
                      <span className="text-[#4A5568]">Active version</span>
                      <b className="mt-1 block font-semibold text-ink">{o.version} · Nov 04</b>
                    </div>
                    <div>
                      <span className="text-[#4A5568]">Expiration</span>
                      <b className="mt-1 block font-semibold text-ink">{o.expiry}</b>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                    <span className="text-xs text-[#4A5568]">
                      {o.activity} · Deal Lead: {o.owner}
                    </span>
                    <Link
                      href={`/investor/offers/${o.id}`}
                      className="inline-flex min-h-9 items-center rounded-lg bg-ink px-4 text-xs font-semibold text-white hover:bg-[#1C2B42]"
                    >
                      Open offer workspace →
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-[#E5E1D8] bg-white">
              <table className="w-full min-w-[900px] text-left text-xs">
                <thead>
                  <tr className="border-b border-[#E5E1D8] bg-[#FAF8F4] text-[#4A5568]">
                    {['Startup', 'Round', 'Offer & Instrument', 'Cap / Valuation', 'Version', 'Status', 'Expires', 'Owner', 'Actions'].map((x) => (
                      <th key={x} className="p-3 font-semibold">
                        {x}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E1D8]">
                  {filteredOffers.map((o) => (
                    <tr key={o.id} className="hover:bg-[#FAF8F4]/50">
                      <td className="p-3 font-semibold text-ink">{o.startup}</td>
                      <td className="p-3">{o.round}</td>
                      <td className="p-3 font-semibold text-ink">
                        {o.amount} · {o.instrument}
                      </td>
                      <td className="p-3">{o.valuation}</td>
                      <td className="p-3">{o.version}</td>
                      <td className="p-3 font-medium text-[#806236]">{o.status}</td>
                      <td className="p-3">{o.expiry}</td>
                      <td className="p-3">{o.owner}</td>
                      <td className="p-3">
                        <Link
                          href={`/investor/offers/${o.id}`}
                          className="font-semibold text-[#9A7A45] hover:underline"
                        >
                          Open →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <InvestorDisclaimer onLearnMore={() => notify('Platform disclaimer opened.')} />
        </>
      )}
    </InvestorShell>
  );
}
