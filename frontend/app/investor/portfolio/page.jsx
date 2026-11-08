'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Briefcase, Plus, X } from 'lucide-react';
import { InvestorShell, Card, Button } from '@/components';
import { holdings, InvestorDisclaimer } from '../investor-data';

export default function InvestorPortfolioPage() {
  const [view, setView] = useState('Cards');
  const [modal, setModal] = useState('');

  return (
    <InvestorShell
      active="Portfolio"
      module="Deal flow"
      title="Portfolio overview"
      description="Updates, metrics and performance reports from companies you funded."
      actions={
        <div className="flex items-center gap-2">
          <Button secondary onClick={() => setView(view === 'Cards' ? 'Table' : 'Cards')}>
            {view === 'Cards' ? 'Table view' : 'Card view'}
          </Button>
          <Button secondary onClick={() => setModal('add-holding')}>
            <Plus size={14} /> Add holding
          </Button>
        </div>
      }
    >
      {({ notify }) => (
        <>
          {/* Stat Strip */}
          <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-5">
            {[
              ['Companies', '9'],
              ['Total invested', '₹3.4 Cr'],
              ['Reported value', '₹4.1 Cr'],
              ['Updates overdue', '2'],
              ['Follow-on open', '1'],
            ].map(([x, y]) => (
              <div key={x} className="rounded-xl border border-[#E5E1D8] bg-white p-4">
                <span className="text-xs font-medium text-[#4A5568]">{x}</span>
                <span className="serif mt-1 block text-2xl font-semibold text-ink">{y}</span>
              </div>
            ))}
          </div>

          <p className="mb-4 text-xs text-[#4A5568]">
            Reported values reflect startup-disclosed round valuations and metric updates, not liquid secondary market valuations.
          </p>

          {/* Holdings List */}
          {view === 'Cards' ? (
            <div className="grid gap-6 lg:grid-cols-2">
              {holdings.map((h) => (
                <Card
                  key={h.id}
                  title={
                    <div className="flex items-center gap-2">
                      <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#F3EBDD] font-bold text-ink text-xs">
                        {h.logo}
                      </span>
                      <span className="font-bold text-ink">{h.name}</span>
                    </div>
                  }
                  action={
                    <span className="rounded-full bg-[#E7F3EC] px-2.5 py-0.5 text-xs font-semibold text-[#286749]">
                      {h.status}
                    </span>
                  }
                >
                  <p className="text-xs text-[#4A5568]">{h.stage} · {h.sector}</p>
                  <div className="mt-4 grid grid-cols-2 gap-4 text-xs border-y border-[#E5E1D8] py-3.5 my-2">
                    <div>
                      <span className="text-[#4A5568]">Invested</span>
                      <b className="mt-0.5 block font-semibold text-ink">{h.invested} · {h.instrument}</b>
                    </div>
                    <div>
                      <span className="text-[#4A5568]">Est. Ownership</span>
                      <b className="mt-0.5 block font-semibold text-ink">{h.ownership}</b>
                    </div>
                    <div>
                      <span className="text-[#4A5568]">Reported MRR</span>
                      <b className="mt-0.5 block font-semibold text-ink">{h.mrr}</b>
                    </div>
                    <div>
                      <span className="text-[#4A5568]">Runway</span>
                      <b className="mt-0.5 block font-semibold text-ink">{h.runway}</b>
                    </div>
                  </div>

                  <p className="mt-3 rounded-lg bg-[#FAF8F4] p-3 text-xs text-ink leading-relaxed border border-[#E5E1D8]">
                    {h.highlight}
                  </p>
                  <p className="mt-2 text-xs text-[#4A5568]">
                    Last updated {h.update} · Direct founder report
                  </p>

                  <div className="mt-4 flex items-center justify-between border-t border-[#E5E1D8] pt-3">
                    <Link
                      href={`/investor/portfolio/${h.id}`}
                      className="text-xs font-semibold text-[#9A7A45] hover:underline"
                    >
                      Open company view →
                    </Link>
                    {h.status === 'Follow-on open' && (
                      <span className="rounded bg-[#FAF8F4] px-2 py-1 text-xs font-medium text-[#806236]">
                        Follow-on round available
                      </span>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-[#E5E1D8] bg-white">
              <table className="w-full min-w-[850px] text-left text-xs">
                <thead>
                  <tr className="border-b border-[#E5E1D8] bg-[#FAF8F4] text-[#4A5568]">
                    {['Company', 'Stage', 'Invested', 'Date', 'Ownership', 'Instrument', 'MRR', 'Runway', 'Last update', 'Status', 'Actions'].map((x) => (
                      <th key={x} className="p-3 font-semibold">
                        {x}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E1D8]">
                  {holdings.map((h) => (
                    <tr key={h.id} className="hover:bg-[#FAF8F4]/50">
                      <td className="p-3 font-semibold text-ink">{h.name}</td>
                      <td className="p-3">{h.stage}</td>
                      <td className="p-3 font-semibold text-ink">{h.invested}</td>
                      <td className="p-3">{h.date}</td>
                      <td className="p-3">{h.ownership}</td>
                      <td className="p-3">{h.instrument}</td>
                      <td className="p-3">{h.mrr}</td>
                      <td className="p-3">{h.runway}</td>
                      <td className="p-3">{h.update}</td>
                      <td className="p-3">
                        <span className="rounded-full bg-[#E7F3EC] px-2 py-0.5 text-xs text-[#286749]">
                          {h.status}
                        </span>
                      </td>
                      <td className="p-3">
                        <Link
                          href={`/investor/portfolio/${h.id}`}
                          className="font-semibold text-[#9A7A45] hover:underline"
                        >
                          View →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Performance & Overdue row */}
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <Card title="Quarterly portfolio deployment trend">
              <div className="flex h-32 items-end gap-3 pt-4">
                {[38, 55, 45, 68, 60, 85, 78, 100].map((x, i) => (
                  <div
                    key={i}
                    className={`flex-1 rounded-t transition ${
                      i === 7 ? 'bg-[#B8955A]' : 'bg-ink'
                    }`}
                    style={{ height: `${x}%` }}
                    title={`Q${(i % 4) + 1}: ${x}%`}
                  />
                ))}
              </div>
              <p className="mt-3 text-xs text-[#4A5568]">
                Aggregate deployment capital over trailing 8 quarters.
              </p>
            </Card>

            <Card title="Action required updates">
              <div className="space-y-3 text-xs">
                <div className="rounded-lg border border-[#E5E1D8] p-3 flex items-center justify-between">
                  <div>
                    <b className="text-ink">Acme Studio</b>
                    <span className="block text-[#4A5568]">Q3 update received · 12 days ago</span>
                  </div>
                  <Link
                    href="/investor/portfolio/acme"
                    className="font-semibold text-[#9A7A45] hover:underline"
                  >
                    Read update →
                  </Link>
                </div>
                <div className="rounded-lg border border-amber-200 bg-amber-50/50 p-3 flex items-center justify-between">
                  <div>
                    <b className="text-ink">GreenLedger</b>
                    <span className="block text-[#8A5700]">Update overdue by 4 months</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => notify('Formal quarterly update request dispatched to GreenLedger.')}
                    className="font-semibold text-[#8A5700] hover:underline"
                  >
                    Request update
                  </button>
                </div>
              </div>
            </Card>
          </div>

          <InvestorDisclaimer onLearnMore={() => notify('Platform disclaimer opened.')} />

          {/* Add Holding Modal */}
          {modal === 'add-holding' && (
            <div className="fixed inset-0 z-50 grid place-items-center bg-ink/50 p-4 backdrop-blur-sm">
              <section
                role="dialog"
                aria-modal="true"
                className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
              >
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="serif text-xl font-bold text-ink">Add portfolio company</h2>
                  <button type="button" onClick={() => setModal('')}>
                    <X size={18} />
                  </button>
                </div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    notify('Offline portfolio holding recorded.');
                    setModal('');
                  }}
                  className="space-y-3"
                >
                  <div>
                    <label htmlFor="h-name" className="block text-xs font-medium text-ink">
                      Company name
                    </label>
                    <input
                      id="h-name"
                      required
                      placeholder="Company name"
                      className="mt-1 h-10 w-full rounded-lg border border-[#E5E1D8] px-3 text-xs focus:border-ink focus:outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="h-amt" className="block text-xs font-medium text-ink">
                      Amount invested
                    </label>
                    <input
                      id="h-amt"
                      required
                      placeholder="e.g. ₹25,00,000"
                      className="mt-1 h-10 w-full rounded-lg border border-[#E5E1D8] px-3 text-xs focus:border-ink focus:outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="h-inst" className="block text-xs font-medium text-ink">
                      Instrument
                    </label>
                    <select
                      id="h-inst"
                      className="mt-1 h-10 w-full rounded-lg border border-[#E5E1D8] bg-white px-3 text-xs focus:border-ink focus:outline-none"
                    >
                      <option>SAFE</option>
                      <option>Equity</option>
                      <option>Convertible note</option>
                    </select>
                  </div>
                  <div className="flex justify-end gap-2 pt-3">
                    <button
                      type="button"
                      onClick={() => setModal('')}
                      className="rounded-lg border px-3 py-2 text-xs font-medium text-[#4A5568]"
                    >
                      Cancel
                    </button>
                    <Button type="submit">Record holding</Button>
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
