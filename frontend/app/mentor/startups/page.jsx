'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  CheckCircle2,
  MapPin,
  Table2,
  Grid2X2,
  Download,
} from 'lucide-react';
import MentorPageShell from '../mentor-page-shell';
import { initialStartups, Card } from '../mentor-data';

export default function MentorStartupsPage() {
  const [toast, setToast] = useState('');
  const [statusFilter, setStatusFilter] = useState('Active');
  const [view, setView] = useState('Cards');
  const [search, setSearch] = useState('');
  const [mentorships] = useState(initialStartups);

  const notify = (x) => {
    setToast(x);
    setTimeout(() => setToast(''), 2600);
  };

  const progress = (s) => (
    <div className="flex items-center gap-2">
      <div className="h-2 w-24 rounded-full bg-[#E5E1D8]">
        <div
          className="h-full rounded-full bg-[#B8955A]"
          style={{ width: `${(s.signed / 6) * 100}%` }}
        />
      </div>
      <small className="text-xs text-[#4A5568]">{s.signed} / 6 signed off</small>
    </div>
  );

  const startupCard = (s) => (
    <article
      key={s.id}
      className="rounded-xl border border-[#E5E1D8] bg-white p-5 transition hover:border-[#A0A7B4]"
    >
      <div className="flex items-start gap-3">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#F3EBDD] font-serif text-lg font-semibold text-[#806236]">
          {s.logo}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="font-semibold text-[#0F1B2D]">{s.name}</h2>
            <span className="rounded-full bg-[#F3EBDD] px-2 py-1 text-xs font-semibold text-[#806236]">
              <CheckCircle2 className="mr-1 inline" size={11} />
              Verified startup
            </span>
          </div>
          <p className="mt-1 text-xs text-[#4A5568]">{s.one}</p>
        </div>
        <span
          className={`rounded-full px-2 py-1 text-xs font-semibold ${
            s.status === 'Active' ? 'bg-[#E7F3EC] text-[#286749]' : 'bg-[#F3F4F6] text-[#4A5568]'
          }`}
        >
          {s.status}
        </span>
      </div>
      <div className="mt-3 flex flex-wrap gap-2 text-xs text-[#4A5568]">
        <span className="rounded-full bg-[#F3EBDD] px-2.5 py-1 font-medium text-[#806236]">
          Stage: {s.stage}
        </span>
        <span>{s.sector}</span>
        <span>
          <MapPin className="mr-1 inline" size={11} />
          {s.location}
        </span>
        <span>{s.team} team members</span>
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <span className="rounded-full bg-[#F3F4F6] px-2.5 py-1 text-xs text-[#4A5568]">{s.fit}</span>
        <span className="text-xs font-semibold text-[#0F1B2D]">Readiness {s.score} / 100</span>
      </div>
      <div className="mt-3">{progress(s)}</div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-[#E5E1D8] pt-3">
        <small className="text-xs text-[#4A5568]">
          Last active {s.last} · {s.sessions} sessions
        </small>
        <div className="flex gap-2">
          <Link
            href={`/mentor/startups/${s.id}`}
            className="inline-flex min-h-9 items-center rounded-lg border border-[#E5E1D8] px-3 text-xs font-semibold text-[#0F1B2D] hover:bg-[#FAF8F4]"
          >
            Open workspace
          </Link>
          <button
            type="button"
            onClick={() => notify(`Message composer for ${s.name}.`)}
            className="text-xs font-semibold text-[#9A7A45]"
          >
            Message
          </button>
        </div>
      </div>
    </article>
  );

  return (
    <MentorPageShell active="My startups" toast={toast} notify={notify}>
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm text-[#4A5568]">
            Mentor workspace <span className="mx-2 text-[#B8955A]">·</span> Forma
          </p>
          <h1 className="serif mt-1 text-[30px] font-semibold text-[#0F1B2D]">
            My startups
          </h1>
          <p className="mt-1 text-sm text-[#4A5568]">
            Manage active mentorships and keep each startup moving.
          </p>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          ['Active', '2'],
          ['Capacity', '4 / 5'],
          ['Sessions this month', '12'],
          ['Needs attention', '2'],
        ].map(([x, v]) => (
          <div key={x} className="rounded-xl border border-[#E5E1D8] bg-white p-4">
            <p className="text-xs text-[#4A5568]">{x}</p>
            <b className="serif mt-1 block text-2xl text-[#0F1B2D]">{v}</b>
          </div>
        ))}
      </div>

      {/* Filter and View Bar */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <div className="flex gap-1 rounded-lg border border-[#E5E1D8] bg-white p-1">
          {['Active', 'Paused', 'Past'].map((x) => (
            <button
              type="button"
              onClick={() => setStatusFilter(x)}
              key={x}
              className={`rounded-md px-3 py-2 text-xs font-medium transition-colors ${
                statusFilter === x
                  ? 'bg-[#0F1B2D] text-white'
                  : 'text-[#4A5568] hover:text-[#0F1B2D]'
              }`}
            >
              {x}
            </button>
          ))}
        </div>
        <div className="relative min-w-[170px] flex-1">
          <Search size={15} className="absolute left-3 top-3 text-[#A0A7B4]" />
          <input
            aria-label="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search startups"
            className="h-10 w-full rounded-lg border border-[#E5E1D8] bg-white pl-9 text-xs focus:border-[#0F1B2D] focus:outline-none"
          />
        </div>
        <button
          type="button"
          onClick={() => setView(view === 'Cards' ? 'Table' : 'Cards')}
          className="grid h-10 w-10 place-items-center rounded-lg border border-[#E5E1D8] bg-white text-[#4A5568] hover:text-[#0F1B2D]"
          aria-label="Toggle view"
        >
          {view === 'Cards' ? <Table2 size={16} /> : <Grid2X2 size={16} />}
        </button>
        <select className="h-10 rounded-lg border border-[#E5E1D8] bg-white px-3 text-xs focus:border-[#0F1B2D] focus:outline-none">
          <option>Recent activity</option>
          <option>Name</option>
          <option>Sign-off progress</option>
        </select>
      </div>

      {/* Cards or Table view */}
      {statusFilter === 'Active' && view === 'Cards' ? (
        <div className="grid gap-4 lg:grid-cols-2">
          {mentorships
            .filter(
              (s) =>
                s.status === 'Active' &&
                (!search || s.name.toLowerCase().includes(search.toLowerCase()))
            )
            .map(startupCard)}
        </div>
      ) : statusFilter === 'Active' && view === 'Table' ? (
        <Card title="Active mentorships">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[750px] text-left text-xs">
              <thead className="border-b border-[#E5E1D8] text-[#4A5568]">
                <tr>
                  {[
                    'Startup',
                    'Stage',
                    'Status',
                    'Started',
                    'Sessions',
                    'Next session',
                    'Sign-off',
                    'Health',
                    '',
                  ].map((x) => (
                    <th key={x} className="py-3 font-medium">
                      {x}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {mentorships
                  .filter((s) => s.status === 'Active')
                  .map((s) => (
                    <tr key={s.id} className="border-b border-[#E5E1D8]">
                      <td className="py-3 font-semibold text-[#0F1B2D]">{s.name}</td>
                      <td className="text-[#4A5568]">{s.stage}</td>
                      <td>
                        <span className="rounded-full bg-[#E7F3EC] px-2 py-0.5 text-[11px] font-semibold text-[#286749]">
                          {s.status}
                        </span>
                      </td>
                      <td className="text-[#4A5568]">Oct 2026</td>
                      <td className="text-[#4A5568]">{s.sessions}</td>
                      <td className="text-[#4A5568]">{s.next}</td>
                      <td className="text-[#4A5568]">{s.signed}/6</td>
                      <td className="text-[#4A5568]">{s.health}</td>
                      <td>
                        <Link href={`/mentor/startups/${s.id}`} className="font-semibold text-[#9A7A45]">
                          Open
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </Card>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {mentorships
            .filter((s) => s.status === (statusFilter === 'Paused' ? 'Paused' : 'Completed'))
            .map(startupCard)}
          {statusFilter === 'Past' && (
            <Card title="Past mentorship record">
              <p className="text-sm text-[#4A5568]">
                Completed · 8 sessions · 5 readiness items signed off.
              </p>
              <button
                type="button"
                onClick={() => notify('Mentorship summary exported.')}
                className="mt-3 text-xs font-semibold text-[#9A7A45]"
              >
                Export summary <Download className="inline" size={13} />
              </button>
            </Card>
          )}
        </div>
      )}
    </MentorPageShell>
  );
}
