'use client';
import { useState } from 'react';
import Link from 'next/link';
import {
  Plus,
  SlidersHorizontal,
  LockKeyhole,
  X,
  Building2,
  Calendar,
} from 'lucide-react';
import { InvestorShell, Card, Button } from '@/components';
import {
  deals,
  stages,
  InvestorDisclaimer,
} from '../investor-data';

export default function InvestorPipelinePage() {
  const [view, setView] = useState('Board');
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [stageOverrides, setStageOverrides] = useState({});
  const [drawer, setDrawer] = useState(null);
  const [modal, setModal] = useState('');

  return (
    <InvestorShell
      active="Pipeline"
      module="Deal flow"
      title="Deal pipeline"
      description="Track every investment opportunity, diligence stage, next step and decision."
      actions={
        <div className="flex flex-wrap items-center gap-2">
          <Button secondary onClick={() => setModal('manual')}>
            <Plus size={14} /> Add startup
          </Button>
          <div className="flex items-center rounded-lg border border-[#E5E1D8] bg-white p-1">
            {['Board', 'Table', 'Funnel'].map((x) => (
              <button
                key={x}
                type="button"
                onClick={() => setView(x)}
                className={`rounded-md px-3 py-1 text-xs font-semibold transition ${
                  view === x
                    ? 'bg-ink text-white'
                    : 'text-[#4A5568] hover:text-ink'
                }`}
              >
                {x}
              </button>
            ))}
          </div>
        </div>
      }
    >
      {({ notify }) => {
        const miniCard = (d) => (
          <button
            key={d.id}
            type="button"
            onClick={() => setDrawer(d)}
            className="w-full rounded-xl border border-[#E5E1D8] bg-white p-3.5 text-left transition hover:border-ink hover:shadow-sm"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#F3EBDD] font-semibold text-ink text-xs">
                  {d.logo}
                </span>
                <b className="text-xs font-semibold text-ink">{d.name}</b>
              </div>
              {d.ready > 75 && (
                <span className="rounded-full bg-[#F3EBDD] px-2 py-0.5 text-[10px] font-semibold text-[#806236]">
                  Ready
                </span>
              )}
            </div>
            <p className="mt-2.5 text-xs text-[#4A5568]">
              {d.sector} · {d.raise}
            </p>
            <div className="mt-2 flex items-center justify-between text-xs font-medium text-ink">
              <span>{d.ticket}</span>
              <span className="text-[#806236]">{d.next}</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-[11px] text-[#4A5568] border-t border-[#E5E1D8] pt-2">
              <span>Due {d.date}</span>
              <span>{d.status}</span>
            </div>
          </button>
        );

        return (
          <>
            {/* Top Stat Strip */}
            <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-5">
              {[
                ['In pipeline', '14'],
                ['Meetings this week', '3'],
                ['Data rooms open', '4'],
                ['Expected commitments', '₹1.2 Cr'],
                ['Needs follow-up', '5'],
              ].map(([x, y]) => (
                <div key={x} className="rounded-xl border border-[#E5E1D8] bg-white p-4">
                  <span className="text-xs font-medium text-[#4A5568]">{x}</span>
                  <span className="serif mt-1 block text-2xl font-semibold text-ink">{y}</span>
                </div>
              ))}
            </div>

            {/* Filter Bar */}
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search deals in pipeline..."
                className="h-10 w-64 rounded-lg border border-[#E5E1D8] bg-white px-3 text-xs focus:border-ink focus:outline-none"
              />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="h-10 rounded-lg border border-[#E5E1D8] bg-white px-3 text-xs focus:border-ink focus:outline-none"
              >
                <option>All stages</option>
                {stages.map((x) => (
                  <option key={x}>{x}</option>
                ))}
              </select>
              <Link
                href="/investor/compare"
                className="inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-[#E5E1D8] bg-white px-3 text-xs font-medium text-ink hover:bg-[#FAF8F4]"
              >
                Compare deals →
              </Link>
            </div>

            {/* Board View */}
            {view === 'Board' && (
              <div className="flex gap-4 overflow-x-auto no-scrollbar pb-6">
                {stages.map((stage) => {
                  const stageDeals = deals.filter(
                    (d) =>
                      (stageOverrides[d.id] || d.stage) === stage &&
                      (!search || d.name.toLowerCase().includes(search.toLowerCase())) &&
                      (filter === 'All stages' || filter === stage)
                  );

                  return (
                    <section
                      key={stage}
                      className="w-[280px] shrink-0 rounded-2xl bg-[#F2EFE8] p-3.5 flex flex-col"
                    >
                      <div className="mb-3 flex items-center justify-between px-1">
                        <b className="text-xs font-bold uppercase tracking-wider text-[#0F1B2D]">
                          {stage}
                        </b>
                        <span className="rounded-full bg-white px-2 py-0.5 text-xs font-semibold text-ink shadow-sm">
                          {stageDeals.length}
                        </span>
                      </div>
                      <div className="space-y-3 flex-1 overflow-y-auto">
                        {stageDeals.map(miniCard)}
                        {stageDeals.length === 0 && (
                          <div className="rounded-xl border border-dashed border-[#D2CCC0] p-4 text-center text-xs text-[#828894]">
                            No deals in this stage
                          </div>
                        )}
                      </div>
                    </section>
                  );
                })}
              </div>
            )}

            {/* Table View */}
            {view === 'Table' && (
              <div className="overflow-x-auto rounded-xl border border-[#E5E1D8] bg-white">
                <table className="w-full min-w-[1000px] text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#E5E1D8] bg-[#FAF8F4] text-[#4A5568]">
                      {[
                        'Startup',
                        'Stage',
                        'Sector',
                        'Readiness',
                        'Round',
                        'Ticket',
                        'Probability',
                        'Owner',
                        'Next step',
                        'Diligence',
                        'Actions',
                      ].map((x) => (
                        <th key={x} className="p-3 font-semibold">
                          {x}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E1D8]">
                    {deals.map((d) => (
                      <tr key={d.id} className="hover:bg-[#FAF8F4]/50">
                        <td className="p-3 font-semibold text-ink">{d.name}</td>
                        <td className="p-3">
                          <select
                            value={stageOverrides[d.id] || d.stage}
                            onChange={(e) => {
                              setStageOverrides({
                                ...stageOverrides,
                                [d.id]: e.target.value,
                              });
                              notify(`Updated ${d.name} stage to ${e.target.value}`);
                            }}
                            className="rounded border border-[#E5E1D8] bg-white p-1.5 text-xs focus:border-ink focus:outline-none"
                          >
                            {stages.map((x) => (
                              <option key={x}>{x}</option>
                            ))}
                          </select>
                        </td>
                        <td className="p-3">{d.sector}</td>
                        <td className="p-3 font-medium text-ink">{d.ready}/100</td>
                        <td className="p-3">{d.raise}</td>
                        <td className="p-3 font-semibold text-ink">{d.ticket}</td>
                        <td className="p-3">{d.prob}%</td>
                        <td className="p-3">{d.owner}</td>
                        <td className="p-3 text-[#806236] font-medium">{d.next}</td>
                        <td className="p-3">{d.status}</td>
                        <td className="p-3">
                          <button
                            type="button"
                            onClick={() => setDrawer(d)}
                            className="text-xs font-semibold text-[#9A7A45] hover:underline"
                          >
                            Details →
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Funnel View */}
            {view === 'Funnel' && (
              <div className="grid gap-6 lg:grid-cols-2">
                <Card title="Pipeline conversion funnel">
                  <div className="space-y-3.5">
                    {stages.map((s, i) => {
                      const counts = [14, 10, 7, 5, 4, 2, 1];
                      return (
                        <div key={s} className="flex items-center gap-3 text-xs">
                          <span className="w-32 font-medium text-ink">{s}</span>
                          <div
                            className="h-6 rounded-md bg-ink flex items-center justify-end pr-2 text-white font-bold"
                            style={{ width: `${Math.max(16, 100 - i * 13)}%` }}
                          >
                            {counts[i]}
                          </div>
                          <span className="text-xs text-[#4A5568]">
                            {i === 0 ? 'Base' : `-${i * 12}% drop`}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  <p className="mt-4 text-xs text-[#4A5568]">
                    Counts and conversion steps reflect sample deal records, not investment guarantees.
                  </p>
                </Card>

                <Card title="Stalled deals · 14+ days no activity">
                  <div className="space-y-3">
                    {deals
                      .filter((d) => d.last.includes('18'))
                      .map((d) => (
                        <div
                          key={d.id}
                          className="rounded-lg border border-[#E5E1D8] p-3 flex items-center justify-between"
                        >
                          <div>
                            <b className="block text-xs font-semibold text-ink">{d.name}</b>
                            <span className="text-xs text-[#8A5700]">
                              No activity for {d.last} · Stage: {d.stage}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => notify(`Follow-up task scheduled for ${d.name}.`)}
                            className="rounded-lg border border-[#E5E1D8] bg-white px-3 py-1.5 text-xs font-semibold text-ink hover:bg-[#FAF8F4]"
                          >
                            Schedule follow-up
                          </button>
                        </div>
                      ))}
                  </div>
                </Card>
              </div>
            )}

            <div className="mt-6 rounded-lg bg-[#F3EBDD] p-3 text-xs text-[#806236]">
              <LockKeyhole className="mr-2 inline" size={14} />
              Pipeline stage, ticket size, deal probability and notes are private to your investment team.
            </div>

            <InvestorDisclaimer onLearnMore={() => notify('Platform disclaimer opened.')} />

            {/* Quick Drawer */}
            {drawer && (
              <div
                className="fixed inset-0 z-40 bg-ink/40 backdrop-blur-sm"
                onClick={() => setDrawer(null)}
              >
                <aside
                  className="absolute right-0 top-0 h-full w-full max-w-md overflow-y-auto bg-[#FAF8F4] p-6 shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#806236]">
                      Deal management
                    </span>
                    <button
                      type="button"
                      onClick={() => setDrawer(null)}
                      className="rounded p-1 hover:bg-black/5"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <h2 className="serif mt-4 text-2xl font-bold text-ink">{drawer.name}</h2>
                  <p className="mt-1 text-xs text-[#4A5568]">{drawer.summary}</p>

                  <div className="mt-5 space-y-4">
                    <div>
                      <label htmlFor="drawer-stage" className="block text-xs font-medium text-ink">
                        Pipeline stage
                      </label>
                      <select
                        id="drawer-stage"
                        value={stageOverrides[drawer.id] || drawer.stage}
                        onChange={(e) => {
                          setStageOverrides({
                            ...stageOverrides,
                            [drawer.id]: e.target.value,
                          });
                          notify(`Stage updated to ${e.target.value}`);
                        }}
                        className="mt-1 h-10 w-full rounded-lg border border-[#E5E1D8] bg-white px-3 text-xs focus:border-ink focus:outline-none"
                      >
                        {stages.map((x) => (
                          <option key={x}>{x}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="drawer-ticket" className="block text-xs font-medium text-ink">
                        Expected ticket size
                      </label>
                      <input
                        id="drawer-ticket"
                        defaultValue={drawer.ticket}
                        className="mt-1 h-10 w-full rounded-lg border border-[#E5E1D8] px-3 text-xs focus:border-ink focus:outline-none"
                      />
                    </div>

                    <div>
                      <label htmlFor="drawer-prob" className="block text-xs font-medium text-ink">
                        Probability (%)
                      </label>
                      <input
                        id="drawer-prob"
                        type="number"
                        defaultValue={drawer.prob}
                        className="mt-1 h-10 w-full rounded-lg border border-[#E5E1D8] px-3 text-xs focus:border-ink focus:outline-none"
                      />
                    </div>

                    <div>
                      <label htmlFor="drawer-next" className="block text-xs font-medium text-ink">
                        Next action step
                      </label>
                      <input
                        id="drawer-next"
                        defaultValue={drawer.next}
                        className="mt-1 h-10 w-full rounded-lg border border-[#E5E1D8] px-3 text-xs focus:border-ink focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-2 text-xs">
                    <Link
                      href={`/investor/startups/${drawer.id}`}
                      className="rounded-lg border border-[#E5E1D8] bg-white p-3 font-semibold text-ink hover:bg-[#FAF8F4]"
                    >
                      Profile →
                    </Link>
                    <Link
                      href={`/investor/startups/${drawer.id}/diligence`}
                      className="rounded-lg border border-[#E5E1D8] bg-white p-3 font-semibold text-ink hover:bg-[#FAF8F4]"
                    >
                      Diligence memo →
                    </Link>
                    <Link
                      href={`/investor/data-rooms/${drawer.id}`}
                      className="rounded-lg border border-[#E5E1D8] bg-white p-3 font-semibold text-ink hover:bg-[#FAF8F4]"
                    >
                      Data room →
                    </Link>
                    <Link
                      href="/investor/compare"
                      className="rounded-lg border border-[#E5E1D8] bg-white p-3 font-semibold text-ink hover:bg-[#FAF8F4]"
                    >
                      Compare →
                    </Link>
                  </div>
                </aside>
              </div>
            )}

            {/* Manual Add Startup Modal */}
            {modal === 'manual' && (
              <div className="fixed inset-0 z-50 grid place-items-center bg-ink/50 p-4 backdrop-blur-sm">
                <section
                  role="dialog"
                  aria-modal="true"
                  className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="serif text-xl font-bold text-ink">Add offline / external startup</h2>
                    <button type="button" onClick={() => setModal('')}>
                      <X size={18} />
                    </button>
                  </div>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      notify('Added external opportunity to private pipeline.');
                      setModal('');
                    }}
                    className="space-y-3"
                  >
                    <div>
                      <label htmlFor="m-name" className="block text-xs font-medium text-ink">
                        Startup name
                      </label>
                      <input
                        id="m-name"
                        required
                        placeholder="Company name"
                        className="mt-1 h-10 w-full rounded-lg border border-[#E5E1D8] px-3 text-xs focus:border-ink focus:outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="m-sector" className="block text-xs font-medium text-ink">
                        Sector & stage
                      </label>
                      <input
                        id="m-sector"
                        placeholder="e.g. Fintech · Seed"
                        className="mt-1 h-10 w-full rounded-lg border border-[#E5E1D8] px-3 text-xs focus:border-ink focus:outline-none"
                      />
                    </div>
                    <p className="text-[11px] text-[#4A5568]">
                      Manual entries are private to you and do not include platform-verified records.
                    </p>
                    <div className="flex justify-end gap-2 pt-3">
                      <button
                        type="button"
                        onClick={() => setModal('')}
                        className="rounded-lg border px-3 py-2 text-xs font-medium text-[#4A5568]"
                      >
                        Cancel
                      </button>
                      <Button type="submit">Add to pipeline</Button>
                    </div>
                  </form>
                </section>
              </div>
            )}
          </>
        );
      }}
    </InvestorShell>
  );
}
