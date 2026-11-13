'use client';
import { useState } from 'react';
import Link from 'next/link';
import {
  Bookmark,
  Plus,
  MoreHorizontal,
  X,
} from 'lucide-react';
import { InvestorShell, Card, Button } from '@/components';
import {
  startups,
  InvestorBadge,
  InvestorDisclaimer,
} from '../investor-data';

export default function InvestorShortlistPage() {
  const [saved, setSaved] = useState(['acme', 'greenledger']);
  const [list, setList] = useState('All shortlisted');
  const [status, setStatus] = useState({ acme: 'New', greenledger: 'Reviewing' });
  const [notes, setNotes] = useState({});
  const [modal, setModal] = useState('');
  const [newListName, setNewListName] = useState('');

  const shortlistedStartups = startups.filter((s) => saved.includes(s.id));

  return (
    <InvestorShell
      active="Shortlist"
      module="Deal flow"
      title="Shortlist"
      description="Keep promising startups organized before moving them into your pipeline."
      actions={
        <Button secondary onClick={() => setModal('new-list')}>
          <Plus size={14} /> New list
        </Button>
      }
    >
      {({ notify }) => {
        const toggleSave = (id) => {
          setSaved((prev) => prev.filter((x) => x !== id));
          notify('Removed from shortlist.');
        };

        return (
          <>
            {/* Stat Strip */}
            <div className="mb-6 grid grid-cols-3 gap-3">
              {[
                ['Shortlisted startups', saved.length],
                ['Follow-ups this week', '2'],
                ['Updates since saved', '3'],
              ].map(([label, val]) => (
                <div key={label} className="rounded-xl border border-[#E5E1D8] bg-white p-5">
                  <span className="text-xs font-medium text-[#4A5568]">{label}</span>
                  <span className="serif mt-1 block text-3xl font-semibold text-ink">{val}</span>
                </div>
              ))}
            </div>

            <div className="grid items-start gap-6 lg:grid-cols-[200px_minmax(0,1fr)]">
              {/* List filter sidebar */}
              <aside className="rounded-xl border border-[#E5E1D8] bg-white p-3 space-y-1">
                {['All shortlisted', 'Seed 2026', 'Fintech', 'Follow up'].map((x) => (
                  <button
                    key={x}
                    type="button"
                    onClick={() => setList(x)}
                    className={`block min-h-10 w-full rounded-lg px-3 text-left text-xs transition ${
                      list === x
                        ? 'bg-[#F3EBDD] font-semibold text-ink'
                        : 'text-[#4A5568] hover:bg-[#FAF8F4] hover:text-ink'
                    }`}
                  >
                    {x}
                  </button>
                ))}
              </aside>

              {/* Startup Cards */}
              <div className="space-y-4">
                {shortlistedStartups.map((s) => (
                  <Card
                    key={s.id}
                    title={
                      <div className="flex items-center gap-2">
                        <span>{s.name}</span>
                        <span className="rounded-full bg-[#F3EBDD] px-2.5 py-0.5 text-xs font-semibold text-[#806236]">
                          {status[s.id] || 'New'}
                        </span>
                      </div>
                    }
                    action={
                      <Link
                        href={`/investor/startups/${s.id}`}
                        className="text-xs font-semibold text-[#9A7A45] hover:underline"
                      >
                        View profile →
                      </Link>
                    }
                  >
                    <p className="text-xs text-[#4A5568]">
                      {s.stage} · {s.sector} · {s.ready}/100 readiness
                    </p>
                    <p className="mt-2 text-xs font-medium text-ink">
                      {s.mrr} MRR · {s.raise}
                    </p>
                    <p className="mt-1 text-xs text-[#9A7A45]">
                      3 updates since saved · Last active {s.updated}
                    </p>

                    <div className="mt-4">
                      <label htmlFor={`notes-${s.id}`} className="block text-xs font-medium text-ink">
                        Private notes (autosaved)
                      </label>
                      <textarea
                        id={`notes-${s.id}`}
                        value={notes[s.id] || ''}
                        onChange={(e) => {
                          setNotes({ ...notes, [s.id]: e.target.value });
                        }}
                        placeholder="Private notes for your internal team..."
                        rows={2}
                        className="mt-1 w-full rounded-lg border border-[#E5E1D8] p-2.5 text-xs focus:border-ink focus:outline-none"
                      />
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-[#E5E1D8] pt-3">
                      <Link
                        href={`/investor/startups/${s.id}`}
                        className="rounded-lg border border-[#E5E1D8] bg-white px-3 py-1.5 text-xs font-semibold text-ink hover:bg-[#FAF8F4]"
                      >
                        View profile
                      </Link>

                      <div className="flex items-center gap-1.5">
                        <label htmlFor={`status-sel-${s.id}`} className="sr-only">
                          Status
                        </label>
                        <select
                          id={`status-sel-${s.id}`}
                          value={status[s.id] || 'New'}
                          onChange={(e) => {
                            setStatus({ ...status, [s.id]: e.target.value });
                            notify(`Status set to ${e.target.value}`);
                          }}
                          className="h-9 rounded-lg border border-[#E5E1D8] bg-white px-2.5 text-xs focus:border-ink focus:outline-none"
                        >
                          {['New', 'Reviewing', 'Follow up', 'Waiting for startup'].map((x) => (
                            <option key={x}>{x}</option>
                          ))}
                        </select>
                      </div>

                      <button
                        type="button"
                        onClick={() => notify(`Moved ${s.name} into Pipeline (Interested stage).`)}
                        className="rounded-lg border border-[#E5E1D8] bg-white px-3 py-1.5 text-xs font-medium text-ink hover:bg-[#FAF8F4]"
                      >
                        Move to pipeline
                      </button>

                      <button
                        type="button"
                        onClick={() => toggleSave(s.id)}
                        className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
                      >
                        Remove
                      </button>

                      <Link
                        href={`/investor/startups/${s.id}`}
                        className="ml-auto rounded-lg bg-ink px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#1C2B42]"
                      >
                        Request intro
                      </Link>
                    </div>
                  </Card>
                ))}

                {shortlistedStartups.length === 0 && (
                  <Card title="Your shortlist is empty">
                    <p className="text-xs text-[#4A5568]">
                      Bookmark promising startups from Discover to evaluate and organize them here.
                    </p>
                    <Link
                      href="/investor/discover"
                      className="mt-4 inline-block text-xs font-semibold text-[#9A7A45] hover:underline"
                    >
                      Discover startups →
                    </Link>
                  </Card>
                )}
              </div>
            </div>

            <InvestorDisclaimer onLearnMore={() => notify('Platform disclaimer opened.')} />

            {/* Modal */}
            {modal === 'new-list' && (
              <div className="fixed inset-0 z-50 grid place-items-center bg-ink/50 p-4 backdrop-blur-sm">
                <section
                  role="dialog"
                  aria-modal="true"
                  className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="serif text-xl font-bold text-ink">Create new shortlist</h2>
                    <button type="button" onClick={() => setModal('')}>
                      <X size={18} />
                    </button>
                  </div>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (!newListName) return;
                      notify(`Created new list "${newListName}"`);
                      setModal('');
                      setNewListName('');
                    }}
                    className="space-y-4"
                  >
                    <div>
                      <label htmlFor="modal-list-name" className="block text-xs font-medium text-ink">
                        List name
                      </label>
                      <input
                        id="modal-list-name"
                        required
                        value={newListName}
                        onChange={(e) => setNewListName(e.target.value)}
                        placeholder="e.g. Q1 2027 Pipeline"
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
                      <Button type="submit">Create list</Button>
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
