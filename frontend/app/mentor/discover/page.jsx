'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  ShieldCheck,
  X,
} from 'lucide-react';
import MentorPageShell from '../mentor-page-shell';
import { initialStartups, Btn } from '../mentor-data';

export default function MentorDiscoverPage() {
  const [toast, setToast] = useState('');
  const [search, setSearch] = useState('');
  const [saved, setSaved] = useState([]);
  const [selected, setSelected] = useState(null);
  const [modal, setModal] = useState('');
  const [mentorships] = useState(initialStartups);

  const notify = (x) => {
    setToast(x);
    setTimeout(() => setToast(''), 2600);
  };

  return (
    <MentorPageShell active="Discover startups" toast={toast} notify={notify}>
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm text-[#4A5568]">
            Mentor workspace <span className="mx-2 text-[#B8955A]">·</span> Forma
          </p>
          <h1 className="serif mt-1 text-[30px] font-semibold text-[#0F1B2D]">
            Discover startups
          </h1>
          <p className="mt-1 text-sm text-[#4A5568]">
            Explore startups that chose to be discoverable by mentors.
          </p>
        </div>
        <Btn secondary onClick={() => notify('Your mentor profile preferences opened.')}>
          Edit mentor preferences
        </Btn>
      </div>

      <div className="mb-4 rounded-lg border border-[#E7D4B0] bg-[#FFF8E8] p-3 text-xs text-[#806236]">
        Only startups that opted in to mentor discovery appear here. We don’t filter on personal
        characteristics of founders.
      </div>

      <div className="grid items-start gap-5 lg:grid-cols-4">
        {/* Filters Sidebar */}
        <aside className="rounded-xl border border-[#E5E1D8] bg-white p-5">
          <h2 className="font-semibold text-[#0F1B2D]">Filters</h2>
          {[
            ['Stage', ['Idea', 'Prototype', 'Early revenue', 'Mature']],
            ['Need', ['Fundraising', 'Product', 'Go-to-market', 'Finance', 'Hiring']],
            ['Sector', ['Fintech', 'B2B SaaS', 'Climate', 'EdTech']],
          ].map(([n, opts]) => (
            <fieldset key={n} className="mt-4">
              <legend className="text-xs font-semibold text-[#0F1B2D]">{n}</legend>
              {opts.map((x) => (
                <label key={x} className="mt-2 flex items-center gap-2 text-xs text-[#4A5568]">
                  <input aria-label="Toggle option" type="checkbox" className="accent-[#0F1B2D]" />
                  {x}
                </label>
              ))}
            </fieldset>
          ))}
          <label className="mt-4 flex items-center gap-2 text-xs text-[#0F1B2D]">
            <input aria-label="Toggle option" type="checkbox" defaultChecked disabled />
            Verified startups only
          </label>
          <label className="mt-3 flex items-center gap-2 text-xs text-[#4A5568]">
            <input aria-label="Toggle option" type="checkbox" className="accent-[#0F1B2D]" />
            Needs a mentor
          </label>
        </aside>

        {/* Startups List */}
        <div className="space-y-3 lg:col-span-3">
          <div className="relative">
            <Search size={15} className="absolute left-3 top-3 text-[#A0A7B4]" />
            <input
              aria-label="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search startups"
              className="h-10 w-full rounded-lg border border-[#E5E1D8] bg-white pl-9 text-sm focus:border-[#0F1B2D] focus:outline-none"
            />
          </div>
          <p className="text-xs text-[#4A5568]">
            Recommended for you · based on fintech, stage fit and capacity
          </p>
          {mentorships
            .filter(
              (s) =>
                s.status === 'Active' &&
                (!search || s.name.toLowerCase().includes(search.toLowerCase()))
            )
            .map((s) => (
              <article key={s.id} className="rounded-xl border border-[#E5E1D8] bg-white p-5">
                <div className="flex items-start gap-3">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-[#F3EBDD] font-serif text-lg font-semibold text-[#806236]">
                    {s.logo}
                  </span>
                  <div className="flex-1">
                    <h2 className="font-semibold text-[#0F1B2D]">
                      {s.name}{' '}
                      <span className="ml-1 rounded-full bg-[#F3EBDD] px-2 py-1 text-xs text-[#806236]">
                        <ShieldCheck className="mr-1 inline" size={11} />
                        Verified
                      </span>
                    </h2>
                    <p className="mt-1 text-xs text-[#4A5568]">{s.one}</p>
                    <p className="mt-2 text-xs text-[#4A5568]">
                      {s.stage} · {s.sector} · {s.location} · {s.team} team members
                    </p>
                  </div>
                  <span className="rounded-full bg-[#F3EBDD] px-2 py-1 text-xs font-semibold text-[#806236]">
                    Fit · Strong
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                  <p className="text-xs text-[#4A5568]">{s.fit}</p>
                  <div className="flex gap-2">
                    <Link
                      href={`/mentor/startups/${s.id}/startup`}
                      className="rounded-lg border border-[#E5E1D8] px-3 py-2 text-xs font-semibold text-[#0F1B2D] hover:bg-[#FAF8F4]"
                    >
                      View
                    </Link>
                    <button
                      type="button"
                      onClick={() =>
                        setSaved(
                          saved.includes(s.id)
                            ? saved.filter((x) => x !== s.id)
                            : [...saved, s.id]
                        )
                      }
                      className="rounded-lg border border-[#E5E1D8] px-3 py-2 text-xs font-semibold text-[#0F1B2D] hover:bg-[#FAF8F4]"
                    >
                      {saved.includes(s.id) ? 'Saved' : 'Save'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSelected(s);
                        setModal('invite');
                      }}
                      className="rounded-lg bg-[#0F1B2D] px-3 py-2 text-xs font-semibold text-white hover:bg-[#1C2B42]"
                    >
                      Invite to mentorship
                    </button>
                  </div>
                </div>
              </article>
            ))}
        </div>
      </div>

      {/* Invite Modal */}
      {modal === 'invite' && (
        <div className="fixed inset-0 z-40 grid place-items-center bg-[#0F1B2D]/45 p-4">
          <section
            role="dialog"
            aria-modal="true"
            className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"
          >
            <div className="mb-5 flex items-center justify-between">
              <h2 className="serif text-2xl font-semibold text-[#0F1B2D]">
                Invite to mentorship
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
                  notify('Invitation sent.');
                  setModal('');
                }}
                className="min-h-10 rounded-lg bg-[#0F1B2D] px-4 text-sm font-semibold text-white hover:bg-[#1C2B42]"
              >
                Send invitation
              </button>
            </div>
          </section>
        </div>
      )}
    </MentorPageShell>
  );
}
