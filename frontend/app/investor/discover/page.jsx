'use client';
import { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  Plus,
  SlidersHorizontal,
  Bookmark,
  MoreHorizontal,
  X,
  Building2,
  CheckCircle2,
} from 'lucide-react';
import { InvestorShell, Card, Button } from '@/components';
import {
  startups,
  InvestorBadge,
  InvestorDisclaimer,
} from '../investor-data';

export default function InvestorDiscoverPage() {
  const [filterStage, setFilterStage] = useState('All stages');
  const [sector, setSector] = useState('All sectors');
  const [readyOnly, setReadyOnly] = useState(false);
  const [query, setQuery] = useState('');
  const [view, setView] = useState('Cards');
  const [saved, setSaved] = useState(['greenledger']);
  const [passed, setPassed] = useState([]);
  const [drawer, setDrawer] = useState(null);
  const [modal, setModal] = useState('');
  const [message, setMessage] = useState('');
  const [searchName, setSearchName] = useState('Fintech · India');

  const available = startups.filter(
    (s) =>
      !passed.includes(s.id) &&
      (!query || `${s.name} ${s.sector} ${s.loc}`.toLowerCase().includes(query.toLowerCase())) &&
      (filterStage === 'All stages' || s.stage === filterStage) &&
      (sector === 'All sectors' || s.sector.includes(sector)) &&
      (!readyOnly || s.badge)
  );

  return (
    <InvestorShell
      active="Discover startups"
      module="Deal flow"
      title="Discover startups"
      description="Browse founders who chose to share their profiles with verified investors."
      actions={
        <div className="flex flex-wrap items-center gap-2">
          <Button secondary onClick={() => setModal('save-search')}>
            <Plus size={14} /> Save this search
          </Button>
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
      }
    >
      {({ notify }) => {
        const toggleSave = (id) => {
          setSaved((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
          );
          notify(saved.includes(id) ? 'Removed from shortlist.' : 'Saved to shortlist.');
        };

        const startupCard = (s) => (
          <article
            key={s.id}
            className="rounded-xl border border-[#E5E1D8] bg-white p-5 transition hover:shadow-sm"
          >
            <div className="flex items-start gap-3">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#F3EBDD] text-lg font-semibold text-ink">
                {s.logo}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <Link
                    href={`/investor/startups/${s.id}`}
                    className="text-sm font-semibold text-ink hover:underline"
                  >
                    {s.name}
                  </Link>
                  {s.verified && <InvestorBadge>Verified startup</InvestorBadge>}
                  {s.badge && <InvestorBadge gold>Investment Ready</InvestorBadge>}
                </div>
                <p className="mt-1 text-xs text-[#4A5568]">{s.tag}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="rounded-full bg-[#F3F4F6] px-2.5 py-1 text-xs text-[#4A5568]">
                    {s.stage}
                  </span>
                  <span className="rounded-full bg-[#F3F4F6] px-2.5 py-1 text-xs text-[#4A5568]">
                    {s.sector}
                  </span>
                </div>
              </div>
              <button
                type="button"
                aria-label={`Actions for ${s.name}`}
                onClick={() => setDrawer(s)}
                className="text-[#4A5568] hover:text-ink"
              >
                <MoreHorizontal size={18} />
              </button>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 text-xs sm:grid-cols-4">
              <div>
                <span className="block text-xs text-[#4A5568]">Location · Team</span>
                <b className="font-semibold">{s.loc} · {s.team}</b>
              </div>
              <div>
                <span className="block text-xs text-[#4A5568]">Readiness</span>
                <b className="font-semibold text-ink">
                  {s.ready}/100 {s.badge && <span className="text-[#9A7A45]">✓</span>}
                </b>
              </div>
              <div>
                <span className="block text-xs text-[#4A5568]">MRR · Growth</span>
                <b className="font-semibold">{s.mrr} · {s.growth}</b>
              </div>
              <div>
                <span className="block text-xs text-[#4A5568]">Round</span>
                <b className="font-semibold">{s.raise} · {s.committed}</b>
              </div>
            </div>

            <div className="mt-3 rounded-lg bg-[#FAF8F4] p-2.5 text-xs">
              <b className="text-[#806236]">Why this fit</b> · {s.fit}
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#E5E1D8] pt-3">
              <span className="text-xs text-[#4A5568]">
                {s.badge ? 'Mentor-verified readiness' : 'Profile updated'} · {s.updated}
              </span>
              <div className="flex items-center gap-2">
                <Link
                  href={`/investor/startups/${s.id}`}
                  className="rounded-lg border border-[#E5E1D8] bg-white px-3 py-1.5 text-xs font-semibold text-ink hover:bg-[#FAF8F4]"
                >
                  View profile
                </Link>
                <button
                  type="button"
                  onClick={() => toggleSave(s.id)}
                  className="rounded-lg border border-[#E5E1D8] bg-white px-3 py-1.5 text-xs font-medium text-ink hover:bg-[#FAF8F4]"
                >
                  {saved.includes(s.id) ? 'Saved' : 'Save'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setDrawer(s);
                    setModal('intro');
                  }}
                  className="rounded-lg bg-ink px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#1C2B42]"
                >
                  Request intro
                </button>
              </div>
            </div>
          </article>
        );

        return (
          <>
            <div className="grid items-start gap-6 xl:grid-cols-[260px_minmax(0,1fr)]">
              {/* Filters Sidebar */}
              <aside className="space-y-4">
                <Card title="Search & Filters">
                  <form
                    onSubmit={(e) => e.preventDefault()}
                    className="space-y-4"
                  >
                    <div>
                      <label htmlFor="filter-search" className="block text-xs font-medium text-ink">
                        Keywords
                      </label>
                      <input
                        id="filter-search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search name, sector, location"
                        className="mt-1 h-10 w-full rounded-lg border border-[#E5E1D8] bg-white px-3 text-xs focus:border-ink focus:outline-none"
                      />
                    </div>

                    <div>
                      <label htmlFor="filter-stage" className="block text-xs font-medium text-ink">
                        Stage
                      </label>
                      <select
                        id="filter-stage"
                        value={filterStage}
                        onChange={(e) => setFilterStage(e.target.value)}
                        className="mt-1 h-10 w-full rounded-lg border border-[#E5E1D8] bg-white px-3 text-xs focus:border-ink focus:outline-none"
                      >
                        <option>All stages</option>
                        {['Idea', 'Prototype', 'Early revenue', 'Mature'].map((x) => (
                          <option key={x}>{x}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="filter-sector" className="block text-xs font-medium text-ink">
                        Sector
                      </label>
                      <select
                        id="filter-sector"
                        value={sector}
                        onChange={(e) => setSector(e.target.value)}
                        className="mt-1 h-10 w-full rounded-lg border border-[#E5E1D8] bg-white px-3 text-xs focus:border-ink focus:outline-none"
                      >
                        <option>All sectors</option>
                        <option>Fintech</option>
                        <option>Climate</option>
                        <option>EdTech</option>
                        <option>B2B SaaS</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="filter-loc" className="block text-xs font-medium text-ink">
                        Location
                      </label>
                      <input
                        id="filter-loc"
                        placeholder="Country, state or city"
                        className="mt-1 h-10 w-full rounded-lg border border-[#E5E1D8] bg-white px-3 text-xs focus:border-ink focus:outline-none"
                      />
                    </div>

                    <div>
                      <label htmlFor="filter-raise" className="block text-xs font-medium text-ink">
                        Raise target
                      </label>
                      <input
                        id="filter-raise"
                        placeholder="e.g. ₹25L – ₹2 Cr"
                        className="mt-1 h-10 w-full rounded-lg border border-[#E5E1D8] bg-white px-3 text-xs focus:border-ink focus:outline-none"
                      />
                    </div>

                    <div className="pt-2">
                      <label className="flex items-center gap-2 text-xs font-medium text-ink cursor-pointer">
                        <input
                          type="checkbox"
                          checked={readyOnly}
                          onChange={(e) => setReadyOnly(e.target.checked)}
                          className="h-4 w-4 rounded accent-ink"
                        />
                        <span>Investment Ready only</span>
                      </label>
                    </div>

                    <div className="pt-2 border-t border-[#E5E1D8] flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => {
                          setFilterStage('All stages');
                          setSector('All sectors');
                          setReadyOnly(false);
                          setQuery('');
                          notify('Filters reset.');
                        }}
                        className="text-xs font-medium text-[#4A5568] hover:text-ink"
                      >
                        Reset filters
                      </button>
                    </div>
                  </form>
                </Card>

                <Card title="Saved Searches">
                  <p className="text-xs text-[#4A5568]">
                    Save your active criteria to receive automated daily notifications when matching startups opt in.
                  </p>
                  <Link
                    href="/investor/searches"
                    className="mt-3 inline-block text-xs font-semibold text-[#9A7A45] hover:underline"
                  >
                    Manage saved searches →
                  </Link>
                </Card>
              </aside>

              {/* Main Results Column */}
              <div>
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <span className="text-sm font-semibold text-ink">
                    {available.length} opted-in startup{available.length === 1 ? '' : 's'}
                  </span>
                  <div className="flex items-center gap-2">
                    <label htmlFor="sort-startups" className="sr-only">
                      Sort startups
                    </label>
                    <select
                      id="sort-startups"
                      className="h-9 rounded-lg border border-[#E5E1D8] bg-white px-3 text-xs focus:border-ink focus:outline-none"
                    >
                      <option>Best fit · Investment Ready first</option>
                      <option>Recently updated</option>
                      <option>Highest readiness score</option>
                      <option>Raise size</option>
                    </select>
                  </div>
                </div>

                {view === 'Cards' ? (
                  <div className="space-y-4">
                    {available.filter((s) => s.badge).length > 0 && (
                      <div>
                        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#806236]">
                          Investment Ready ({available.filter((s) => s.badge).length})
                        </p>
                        <div className="space-y-4">
                          {available
                            .filter((s) => s.badge)
                            .map((s) => startupCard(s))}
                        </div>
                      </div>
                    )}

                    {available.filter((s) => !s.badge).length > 0 && (
                      <div className="pt-4">
                        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#4A5568]">
                          Other opted-in startups ({available.filter((s) => !s.badge).length})
                        </p>
                        <div className="space-y-4">
                          {available
                            .filter((s) => !s.badge)
                            .map((s) => startupCard(s))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="overflow-x-auto rounded-xl border border-[#E5E1D8] bg-white">
                    <table className="w-full min-w-[800px] text-left text-xs">
                      <thead>
                        <tr className="border-b border-[#E5E1D8] bg-[#FAF8F4] text-[#4A5568]">
                          {[
                            'Startup',
                            'Stage',
                            'Sector',
                            'Readiness',
                            'MRR',
                            'Growth',
                            'Raise',
                            'Committed',
                            'Location',
                            'Actions',
                          ].map((x) => (
                            <th key={x} className="p-3 font-semibold">
                              {x}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E5E1D8]">
                        {available.map((s) => (
                          <tr key={s.id} className="hover:bg-[#FAF8F4]/50">
                            <td className="p-3 font-semibold">
                              <Link
                                href={`/investor/startups/${s.id}`}
                                className="text-ink hover:underline"
                              >
                                {s.name}
                              </Link>
                            </td>
                            <td className="p-3">{s.stage}</td>
                            <td className="p-3">{s.sector}</td>
                            <td className="p-3 font-medium text-ink">{s.ready}/100</td>
                            <td className="p-3">{s.mrr}</td>
                            <td className="p-3">{s.growth}</td>
                            <td className="p-3">{s.raise}</td>
                            <td className="p-3">{s.committed}</td>
                            <td className="p-3">{s.loc}</td>
                            <td className="p-3">
                              <div className="flex items-center gap-2">
                                <Link
                                  href={`/investor/startups/${s.id}`}
                                  className="text-xs font-semibold text-[#9A7A45] hover:underline"
                                >
                                  View
                                </Link>
                                <button
                                  type="button"
                                  onClick={() => toggleSave(s.id)}
                                  className="text-xs text-[#4A5568] hover:text-ink"
                                >
                                  {saved.includes(s.id) ? 'Saved' : 'Save'}
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {available.length === 0 && (
                  <Card title="No startups match those criteria">
                    <p className="text-xs text-[#4A5568]">
                      Try broadening your filters or resetting sector criteria to browse more opted-in companies.
                    </p>
                    <Button
                      secondary
                      className="mt-4"
                      onClick={() => {
                        setFilterStage('All stages');
                        setSector('All sectors');
                        setReadyOnly(false);
                        setQuery('');
                      }}
                    >
                      Reset all filters
                    </Button>
                  </Card>
                )}
              </div>
            </div>

            <InvestorDisclaimer onLearnMore={() => notify('Platform disclaimer opened.')} />

            {/* Quick Drawer */}
            {drawer && (
              <div
                className="fixed inset-0 z-40 bg-ink/40 backdrop-blur-sm"
                onClick={() => setDrawer(null)}
              >
                <aside
                  className="absolute right-0 top-0 h-full w-full max-w-lg overflow-y-auto bg-[#FAF8F4] p-6 shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#806236]">
                      Quick preview
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
                  <p className="mt-1 text-sm text-[#4A5568]">{drawer.tag}</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {drawer.badge && <InvestorBadge gold>Investment Ready</InvestorBadge>}
                    <span className="rounded-full bg-[#F3F4F6] px-2.5 py-0.5 text-xs text-[#4A5568]">
                      {drawer.stage}
                    </span>
                    <span className="rounded-full bg-[#F3F4F6] px-2.5 py-0.5 text-xs text-[#4A5568]">
                      {drawer.sector}
                    </span>
                  </div>

                  <p className="mt-5 text-xs leading-relaxed text-ink">{drawer.summary}</p>

                  <div className="mt-4 grid grid-cols-2 gap-2">
                    {drawer.items.map(([x, y, src]) => (
                      <div key={x} className="rounded-lg border border-[#E5E1D8] bg-white p-3">
                        <span className="block text-xs text-[#4A5568]">{x}</span>
                        <b className="block text-sm font-semibold text-ink">{y}</b>
                        <span className="text-xs text-[#9A7A45]">{src}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 rounded-lg bg-white p-3 text-xs border border-[#E5E1D8]">
                    <b className="text-[#806236]">Why this fit:</b> {drawer.fit}
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      href={`/investor/startups/${drawer.id}`}
                      className="rounded-lg border border-[#E5E1D8] bg-white px-4 py-2 text-xs font-semibold text-ink hover:bg-[#FAF8F4]"
                    >
                      View full profile →
                    </Link>
                    <button
                      type="button"
                      onClick={() => toggleSave(drawer.id)}
                      className="rounded-lg border border-[#E5E1D8] bg-white px-4 py-2 text-xs font-semibold text-ink hover:bg-[#FAF8F4]"
                    >
                      {saved.includes(drawer.id) ? 'Saved' : 'Save'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setModal('intro')}
                      className="rounded-lg bg-ink px-4 py-2 text-xs font-semibold text-white hover:bg-[#1C2B42]"
                    >
                      Request intro
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setPassed((p) => [...p, drawer.id]);
                        setDrawer(null);
                        notify('Passed on this startup. Undo available for 8 seconds.');
                      }}
                      className="rounded-lg border border-[#E5E1D8] px-3 py-2 text-xs text-[#4A5568] hover:text-ink"
                    >
                      Pass
                    </button>
                  </div>
                </aside>
              </div>
            )}

            {/* Save Search Modal */}
            {modal === 'save-search' && (
              <div className="fixed inset-0 z-50 grid place-items-center bg-ink/50 p-4 backdrop-blur-sm">
                <section
                  role="dialog"
                  aria-modal="true"
                  className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="serif text-xl font-bold text-ink">Save this search & alerts</h2>
                    <button type="button" onClick={() => setModal('')}>
                      <X size={18} />
                    </button>
                  </div>
                  <label htmlFor="search-name" className="block text-xs font-medium text-ink">
                    Search name
                  </label>
                  <input
                    id="search-name"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    className="mt-1 h-10 w-full rounded-lg border border-[#E5E1D8] px-3 text-xs focus:border-ink focus:outline-none"
                  />
                  <p className="mt-3 text-xs text-[#4A5568]">
                    Active criteria: <b>{filterStage}</b> · <b>{sector}</b> · Investment Ready{' '}
                    <b>{readyOnly ? 'only' : 'included'}</b>
                  </p>
                  <div className="mt-4 flex gap-4 text-xs">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked className="accent-ink" />
                      In-app alerts
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked className="accent-ink" />
                      Daily email digest
                    </label>
                  </div>
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
                        notify(`Saved search "${searchName}" created.`);
                        setModal('');
                      }}
                    >
                      Save search
                    </Button>
                  </div>
                </section>
              </div>
            )}

            {/* Intro Modal */}
            {modal === 'intro' && (
              <div className="fixed inset-0 z-50 grid place-items-center bg-ink/50 p-4 backdrop-blur-sm">
                <section
                  role="dialog"
                  aria-modal="true"
                  className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="serif text-xl font-bold text-ink">Request an introduction</h2>
                    <button type="button" onClick={() => setModal('')}>
                      <X size={18} />
                    </button>
                  </div>
                  <p className="text-xs text-[#4A5568]">
                    To: <b>{drawer?.name || 'Selected startup'}</b> · Investor: Arjun Mehta (Forma)
                  </p>
                  <label htmlFor="intro-msg" className="mt-4 block text-xs font-medium text-ink">
                    Message (50–500 characters)
                  </label>
                  <textarea
                    id="intro-msg"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    placeholder="Describe who you are, what you invest in, why this startup and what you’d like next..."
                    className="mt-1 w-full rounded-lg border border-[#E5E1D8] p-3 text-xs focus:border-ink focus:outline-none"
                  />
                  <div className="mt-4 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setModal('')}
                      className="rounded-lg border px-3 py-2 text-xs font-medium text-[#4A5568]"
                    >
                      Cancel
                    </button>
                    <Button
                      onClick={() => {
                        if (message.length < 20) {
                          notify('Please write a slightly longer note for the founder.');
                          return;
                        }
                        notify('Intro request sent! The startup will review and respond.');
                        setModal('');
                        setMessage('');
                      }}
                    >
                      Send intro request
                    </Button>
                  </div>
                </section>
              </div>
            )}
          </>
        );
      }}
    </InvestorShell>
  );
}
