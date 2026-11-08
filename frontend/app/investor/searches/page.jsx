'use client';
import { useState } from 'react';
import Link from 'next/link';
import { FileSearch, Plus, X } from 'lucide-react';
import { InvestorShell, Card, Button } from '@/components';
import { InvestorDisclaimer } from '../investor-data';

export default function InvestorSearchesPage() {
  const [searchTab, setSearchTab] = useState('Saved searches');
  const [modal, setModal] = useState('');
  const [newSearchName, setNewSearchName] = useState('');
  const [searches, setSearches] = useState([
    {
      name: 'Pre-seed fintech · India',
      criteria: 'Idea, Prototype · Fintech · India · Investment Ready',
      new: 4,
      total: 18,
      paused: false,
    },
    {
      name: 'Climate · Seed',
      criteria: 'Idea, Prototype · Climate · India',
      new: 2,
      total: 11,
      paused: false,
    },
  ]);

  return (
    <InvestorShell
      active="Saved searches"
      module="Deal flow"
      title="Saved searches and alerts"
      description="Get a quiet signal when new opted-in startups match your investment criteria."
      actions={
        <Button onClick={() => setModal('save-search')}>
          <Plus size={14} /> New saved search
        </Button>
      }
    >
      {({ notify }) => (
        <>
          {/* Stat Strip */}
          <div className="mb-6 grid grid-cols-3 gap-3">
            {[
              ['Saved searches', searches.length],
              ['Alerts active', searches.filter((s) => !s.paused).length],
              ['New matches this week', '6'],
            ].map(([label, val]) => (
              <div key={label} className="rounded-xl border border-[#E5E1D8] bg-white p-5">
                <span className="text-xs font-medium text-[#4A5568]">{label}</span>
                <span className="serif mt-1 block text-3xl font-semibold text-ink">{val}</span>
              </div>
            ))}
          </div>

          {/* Sub Navigation Tabs */}
          <div className="mb-6 flex gap-2">
            {['Saved searches', 'Alerts', 'Recommendation settings'].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setSearchTab(t)}
                className={`min-h-10 rounded-lg px-4 text-xs font-semibold transition ${
                  searchTab === t
                    ? 'bg-ink text-white'
                    : 'border border-[#E5E1D8] bg-white text-[#4A5568] hover:bg-[#FAF8F4] hover:text-ink'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {searchTab === 'Saved searches' && (
            <div className="space-y-4">
              {searches.map((s, i) => (
                <Card
                  key={s.name}
                  title={s.name}
                  action={
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        s.paused
                          ? 'bg-[#F3F4F6] text-[#4A5568]'
                          : 'bg-[#E7F3EC] text-[#286749]'
                      }`}
                    >
                      {s.paused ? 'Alerts paused' : 'Alerts on'}
                    </span>
                  }
                >
                  <p className="text-xs text-[#4A5568]">{s.criteria}</p>
                  <div className="mt-4 flex flex-wrap items-center gap-3 text-xs border-t border-[#E5E1D8] pt-3">
                    <b className="text-[#9A7A45]">{s.new} new matches</b>
                    <span className="text-[#4A5568]">·</span>
                    <span className="text-ink">{s.total} total startups</span>
                    <span className="text-[#4A5568]">·</span>
                    <span className="text-[#4A5568]">Daily email & In-app</span>
                    <span className="ml-auto text-[#4A5568]">Last run 2 hours ago</span>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <Link
                      href="/investor/discover"
                      className="inline-flex min-h-9 items-center rounded-lg bg-ink px-3 text-xs font-semibold text-white hover:bg-[#1C2B42]"
                    >
                      View results
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setSearches(
                          searches.map((a, j) =>
                            j === i ? { ...a, paused: !a.paused } : a
                          )
                        );
                        notify(s.paused ? 'Alerts resumed.' : 'Alerts paused.');
                      }}
                      className="rounded-lg border border-[#E5E1D8] bg-white px-3 py-1.5 text-xs font-medium text-ink hover:bg-[#FAF8F4]"
                    >
                      {s.paused ? 'Resume alerts' : 'Pause alerts'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSearches([
                          ...searches,
                          { ...s, name: `${s.name} (Copy)` },
                        ]);
                        notify('Search duplicated.');
                      }}
                      className="rounded-lg border border-[#E5E1D8] bg-white px-3 py-1.5 text-xs font-medium text-ink hover:bg-[#FAF8F4]"
                    >
                      Duplicate
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSearches(searches.filter((_, j) => j !== i));
                        notify('Search deleted.');
                      }}
                      className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </Card>
              ))}

              {searches.length === 0 && (
                <Card title="No saved searches yet">
                  <p className="text-xs text-[#4A5568]">
                    Create a saved search to get notified automatically when new startups match your thesis.
                  </p>
                  <Button className="mt-4" onClick={() => setModal('save-search')}>
                    Create saved search
                  </Button>
                </Card>
              )}
            </div>
          )}

          {searchTab === 'Alerts' && (
            <Card title="Recent notification alerts">
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-[#E5E1D8] pb-3">
                  <div>
                    <b className="block text-xs font-semibold text-ink">
                      Acme Studio matches “Pre-seed fintech · India”
                    </b>
                    <span className="text-xs text-[#4A5568]">2 hours ago · In-app & Email</span>
                  </div>
                  <Link
                    href="/investor/startups/acme"
                    className="text-xs font-semibold text-[#9A7A45] hover:underline"
                  >
                    View startup →
                  </Link>
                </div>
              </div>
            </Card>
          )}

          {searchTab === 'Recommendation settings' && (
            <Card title="Thesis & criteria feed">
              <p className="text-xs text-[#4A5568] leading-relaxed">
                Your stage, sector, ticket size and location preferences feed into our smart match scoring algorithms.
                Matches are suggestions to review, never advice or guaranteed returns.
              </p>
              <Link
                href="/investor/settings"
                className="mt-4 inline-block text-xs font-semibold text-[#9A7A45] hover:underline"
              >
                Edit investment preferences →
              </Link>
            </Card>
          )}

          <InvestorDisclaimer onLearnMore={() => notify('Platform disclaimer opened.')} />

          {/* Modal */}
          {modal === 'save-search' && (
            <div className="fixed inset-0 z-50 grid place-items-center bg-ink/50 p-4 backdrop-blur-sm">
              <section
                role="dialog"
                aria-modal="true"
                className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl"
              >
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="serif text-xl font-bold text-ink">New saved search</h2>
                  <button type="button" onClick={() => setModal('')}>
                    <X size={18} />
                  </button>
                </div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!newSearchName) return;
                    setSearches([
                      ...searches,
                      {
                        name: newSearchName,
                        criteria: 'All stages · All sectors · Investment Ready',
                        new: 0,
                        total: 12,
                        paused: false,
                      },
                    ]);
                    notify(`Saved search "${newSearchName}" created.`);
                    setModal('');
                    setNewSearchName('');
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label htmlFor="modal-search-name" className="block text-xs font-medium text-ink">
                      Search name
                    </label>
                    <input
                      id="modal-search-name"
                      required
                      value={newSearchName}
                      onChange={(e) => setNewSearchName(e.target.value)}
                      placeholder="e.g. B2B SaaS Seed"
                      className="mt-1 h-10 w-full rounded-lg border border-[#E5E1D8] px-3 text-xs focus:border-ink focus:outline-none"
                    />
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setModal('')}
                      className="rounded-lg border px-3 py-2 text-xs font-medium text-[#4A5568]"
                    >
                      Cancel
                    </button>
                    <Button type="submit">Create search</Button>
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
