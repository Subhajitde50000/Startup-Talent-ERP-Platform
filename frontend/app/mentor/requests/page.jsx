'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  ShieldCheck,
  X,
} from 'lucide-react';
import MentorPageShell from '../mentor-page-shell';
import { initialRequests, initialStartups, Card } from '../mentor-data';

export default function MentorRequestsPage() {
  const [toast, setToast] = useState('');
  const [statusFilter, setStatusFilter] = useState('Incoming');
  const [selected, setSelected] = useState(null);
  const [modal, setModal] = useState('');
  const [search, setSearch] = useState('');
  const [stageFilter, setStageFilter] = useState('All stages');
  const [sort, setSort] = useState('Best fit');
  const [declineReason, setDeclineReason] = useState('');
  const [requestItems, setRequestItems] = useState(initialRequests);
  const [mentorships, setMentorships] = useState(initialStartups);

  const notify = (x) => {
    setToast(x);
    setTimeout(() => setToast(''), 2600);
  };

  return (
    <MentorPageShell active="Requests" toast={toast} notify={notify}>
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm text-[#4A5568]">
            Mentor workspace <span className="mx-2 text-[#B8955A]">·</span> Forma
          </p>
          <h1 className="serif mt-1 text-[30px] font-semibold text-[#0F1B2D]">
            Startup requests
          </h1>
          <p className="mt-1 text-sm text-[#4A5568]">
            Review incoming mentorship requests and invitations.
          </p>
        </div>
        <Link
          href="/mentor/discover"
          className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-[#0F1B2D] px-4 text-sm font-semibold text-white hover:bg-[#1C2B42]"
        >
          <Search size={15} /> Discover startups
        </Link>
      </div>

      {/* Tabs */}
      <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
        {['Incoming', 'Invitations sent', 'Auto-match suggestions', 'Past'].map((x) => (
          <button
            type="button"
            key={x}
            onClick={() => setStatusFilter(x)}
            className={`min-h-10 shrink-0 rounded-lg px-4 text-xs font-medium transition-colors ${
              statusFilter === x
                ? 'bg-[#0F1B2D] text-white'
                : 'border border-[#E5E1D8] bg-white text-[#4A5568] hover:bg-[#FAF8F4]'
            }`}
          >
            {x}
          </button>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="mb-4 flex flex-wrap gap-2">
        <div className="relative min-w-[180px] flex-1">
          <Search size={15} className="absolute left-3 top-3 text-[#A0A7B4]" />
          <input
            aria-label="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search startups, stage or need"
            className="h-10 w-full rounded-lg border border-[#E5E1D8] bg-white pl-9 text-xs focus:border-[#0F1B2D] focus:outline-none"
          />
        </div>
        <select
          value={stageFilter}
          onChange={(e) => setStageFilter(e.target.value)}
          className="h-10 rounded-lg border border-[#E5E1D8] bg-white px-3 text-xs focus:border-[#0F1B2D] focus:outline-none"
        >
          <option>All stages</option>
          {['Idea', 'Prototype', 'Early revenue', 'Mature'].map((x) => (
            <option key={x}>{x}</option>
          ))}
        </select>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="h-10 rounded-lg border border-[#E5E1D8] bg-white px-3 text-xs focus:border-[#0F1B2D] focus:outline-none"
        >
          <option>Best fit</option>
          <option>Newest</option>
          <option>Waiting longest</option>
        </select>
      </div>

      {/* Content based on status filter */}
      {statusFilter === 'Incoming' ? (
        <div className="grid gap-4 lg:grid-cols-2">
          {requestItems
            .filter(
              (x) =>
                (!search || x.name.toLowerCase().includes(search.toLowerCase())) &&
                (stageFilter === 'All stages' || x.stage === stageFilter)
            )
            .map((r) => (
              <article key={r.id} className="rounded-xl border border-[#E5E1D8] bg-white p-5">
                <div className="flex items-start gap-3">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-[#F3EBDD] font-serif text-lg font-semibold text-[#806236]">
                    {r.logo}
                  </span>
                  <div className="flex-1">
                    <h2 className="font-semibold text-[#0F1B2D]">
                      {r.name}
                      <span className="ml-2 rounded-full bg-[#F3EBDD] px-2 py-1 text-xs text-[#806236]">
                        <ShieldCheck className="mr-1 inline" size={11} />
                        Verified startup
                      </span>
                    </h2>
                    <p className="mt-1 text-xs text-[#4A5568]">
                      {r.stage} · {r.sector} · Readiness {r.score}/100
                    </p>
                  </div>
                  <span className="rounded-full bg-[#FFF3D6] px-2 py-1 text-xs font-medium text-[#8A5700]">
                    {r.date}
                  </span>
                </div>
                <div className="mt-3 rounded-lg bg-[#FAF8F4] p-3">
                  <p className="text-xs leading-5 text-[#0F1B2D]">“{r.goal}”</p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {r.needs.map((n) => (
                      <span key={n} className="rounded-full bg-white px-2 py-1 text-xs text-[#4A5568]">
                        {n}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap justify-between gap-2 text-xs text-[#4A5568]">
                  <span>
                    {r.cadence} · {r.terms}
                  </span>
                  <span className="font-semibold text-[#9A7A45]">{r.fit}</span>
                </div>
                <div className="mt-4 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSelected(r);
                      notify(`Showing details for ${r.name}`);
                    }}
                    className="rounded-lg border border-[#E5E1D8] px-3 py-2 text-xs font-semibold text-[#0F1B2D] hover:bg-[#FAF8F4]"
                  >
                    View details
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSelected(r);
                      setModal('decline');
                    }}
                    className="rounded-lg border border-[#E5E1D8] px-3 py-2 text-xs font-semibold text-[#B42318] hover:bg-[#FEE4E2]"
                  >
                    Decline
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSelected(r);
                      setModal('accept');
                    }}
                    className="rounded-lg bg-[#0F1B2D] px-3 py-2 text-xs font-semibold text-white hover:bg-[#1C2B42]"
                  >
                    Accept
                  </button>
                </div>
              </article>
            ))}
        </div>
      ) : statusFilter === 'Auto-match suggestions' ? (
        <div className="grid gap-4 lg:grid-cols-2">
          {mentorships.map((s) => (
            <article key={s.id} className="rounded-xl border border-[#E5E1D8] bg-white p-5">
              <span className="rounded-full bg-[#F3EBDD] px-2 py-1 text-xs font-semibold text-[#806236]">
                Suggested match
              </span>
              <h2 className="mt-3 font-semibold text-[#0F1B2D]">
                {s.name} · {s.stage}
              </h2>
              <p className="mt-2 text-xs text-[#4A5568]">{s.fit}</p>
              <div className="mt-4 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => notify('Match hidden from suggestions.')}
                  className="text-xs text-[#4A5568] hover:text-[#0F1B2D]"
                >
                  Not interested
                </button>
                <Link
                  href={`/mentor/startups/${s.id}/startup`}
                  className="rounded-lg border border-[#E5E1D8] px-3 py-2 text-xs font-semibold text-[#0F1B2D] hover:bg-[#FAF8F4]"
                >
                  View
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setSelected({ name: s.name });
                    setModal('invite');
                  }}
                  className="rounded-lg bg-[#0F1B2D] px-3 py-2 text-xs font-semibold text-white hover:bg-[#1C2B42]"
                >
                  Invite
                </button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <Card title={statusFilter}>
          {statusFilter === 'Invitations sent' ? (
            <p className="text-sm text-[#4A5568]">
              No invitations sent yet. Discover opted-in startups to invite.
            </p>
          ) : (
            <p className="text-sm text-[#4A5568]">
              Past requests will be kept here as a minimal record.
            </p>
          )}
        </Card>
      )}

      {/* Modal Dialog */}
      {modal && (
        <div className="fixed inset-0 z-40 grid place-items-center bg-[#0F1B2D]/45 p-4">
          <section
            role="dialog"
            aria-modal="true"
            className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"
          >
            <div className="mb-5 flex items-center justify-between">
              <h2 className="serif text-2xl font-semibold text-[#0F1B2D]">
                {modal === 'accept'
                  ? 'Accept mentorship request'
                  : modal === 'decline'
                  ? 'Decline request'
                  : modal === 'invite'
                  ? 'Invite to mentorship'
                  : 'Action'}
              </h2>
              <button
                type="button"
                onClick={() => setModal('')}
                aria-label="Close"
                className="text-[#4A5568] hover:text-[#0F1B2D]"
              >
                <X size={18} />
              </button>
            </div>

            {modal === 'decline' ? (
              <>
                <label className="block text-sm font-medium text-[#0F1B2D]">
                  Reason (required)
                  <select
                    value={declineReason}
                    onChange={(e) => setDeclineReason(e.target.value)}
                    className="mt-2 h-11 w-full rounded-lg border border-[#E5E1D8] bg-white px-3 focus:outline-none"
                  >
                    <option value="">Choose a reason</option>
                    {['Not my expertise', 'At capacity', 'Stage mismatch', 'Terms', 'Other'].map(
                      (x) => (
                        <option key={x}>{x}</option>
                      )
                    )}
                  </select>
                </label>
                <label className="mt-4 block text-sm font-medium text-[#0F1B2D]">
                  Note
                  <textarea
                    rows={3}
                    placeholder="Add a helpful, respectful note"
                    className="mt-2 w-full rounded-lg border border-[#E5E1D8] p-3 text-sm focus:outline-none"
                  />
                </label>
              </>
            ) : modal === 'accept' ? (
              <>
                <p className="text-sm text-[#4A5568]">
                  Accept {selected?.name || 'this startup'}’s request to create a mentorship
                  workspace?
                </p>
                <label className="mt-4 block text-sm font-medium text-[#0F1B2D]">
                  First session date (optional)
                  <input
                    aria-label="Select date"
                    type="date"
                    className="mt-2 h-11 w-full rounded-lg border border-[#E5E1D8] px-3 focus:outline-none"
                  />
                </label>
                <label className="mt-4 block text-sm font-medium text-[#0F1B2D]">
                  Welcome message
                  <textarea
                    rows={3}
                    placeholder="Share a short welcome and next step"
                    className="mt-2 w-full rounded-lg border border-[#E5E1D8] p-3 text-sm focus:outline-none"
                  />
                </label>
                <p className="mt-3 rounded-lg bg-[#FFF8E8] p-3 text-xs text-[#806236]">
                  Review any equity or advisory terms with a lawyer. The platform does not provide legal
                  advice.
                </p>
              </>
            ) : modal === 'invite' ? (
              <>
                <p className="text-sm text-[#4A5568]">
                  Invite {selected?.name} to a mentorship. They decide whether to accept.
                </p>
                <label className="mt-4 block text-sm font-medium text-[#0F1B2D]">
                  Message (50–500 characters)
                  <textarea
                    minLength={50}
                    maxLength={500}
                    rows={4}
                    placeholder="Explain how your experience could help this startup…"
                    className="mt-2 w-full rounded-lg border border-[#E5E1D8] p-3 text-sm focus:outline-none"
                  />
                </label>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <label className="text-sm font-medium text-[#0F1B2D]">
                    Cadence
                    <select className="mt-2 h-10 w-full rounded-lg border border-[#E5E1D8] bg-white px-2 focus:outline-none">
                      <option>Fortnightly</option>
                      <option>Weekly</option>
                      <option>Monthly</option>
                    </select>
                  </label>
                  <label className="text-sm font-medium text-[#0F1B2D]">
                    Terms
                    <input
                      aria-label="Input field"
                      defaultValue="₹3,000 / session"
                      className="mt-2 h-10 w-full rounded-lg border border-[#E5E1D8] px-2 focus:outline-none"
                    />
                  </label>
                </div>
                <p className="mt-3 text-xs text-[#4A5568]">
                  3 invitations left today · Optional free intro call available.
                </p>
              </>
            ) : null}

            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setModal('')}
                className="min-h-10 px-4 text-sm font-medium text-[#4A5568] hover:text-[#0F1B2D]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  if (modal === 'decline' && !declineReason) {
                    notify('Choose a reason before continuing.');
                    return;
                  }
                  if (modal === 'accept') {
                    setRequestItems(requestItems.filter((r) => r.id !== selected?.id));
                    setMentorships([
                      {
                        ...initialStartups[0],
                        id: `mentorship-${Date.now()}`,
                        name: selected?.name || 'New startup',
                        status: 'Active',
                      },
                      ...mentorships,
                    ]);
                    notify('Request accepted. Mentorship workspace created.');
                  } else if (modal === 'decline') {
                    setRequestItems(requestItems.filter((r) => r.id !== selected?.id));
                    notify('Request declined with a respectful message.');
                  } else if (modal === 'invite') {
                    notify('Invitation sent.');
                  }
                  setModal('');
                  setDeclineReason('');
                }}
                className="min-h-10 rounded-lg bg-[#0F1B2D] px-4 text-sm font-semibold text-white hover:bg-[#1C2B42]"
              >
                {modal === 'accept'
                  ? 'Accept request'
                  : modal === 'decline'
                  ? 'Decline request'
                  : modal === 'invite'
                  ? 'Send invitation'
                  : 'Save'}
              </button>
            </div>
          </section>
        </div>
      )}
    </MentorPageShell>
  );
}
