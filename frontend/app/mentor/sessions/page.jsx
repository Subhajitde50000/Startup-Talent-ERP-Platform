'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Plus,
  CalendarDays,
  Search,
  Download,
  ArrowRight,
  X,
} from 'lucide-react';
import MentorPageShell from '../mentor-page-shell';
import { initialSessions, Btn, Card } from '../mentor-data';

export default function MentorSessionsPage() {
  const [toast, setToast] = useState('');
  const [tab, setTab] = useState('Upcoming');
  const [schedule, setSchedule] = useState(false);
  const [search, setSearch] = useState('');
  const [calendarMode, setCalendarMode] = useState('Week');
  const [sessions] = useState(initialSessions);

  const notify = (s) => {
    setToast(s);
    setTimeout(() => setToast(''), 2700);
  };

  const handleJoin = (sess) => {
    if (sess.status === 'Completed') {
      notify('Session completed on ' + sess.date + '. Review the session summary below.');
    } else if (sess.status === 'Needs summary') {
      notify('Session concluded. Please add the session summary and sign off deliverables.');
    } else {
      notify('Meeting room for ' + sess.startup + ' opens 10 minutes prior to scheduled start.');
    }
  };

  const sessionCard = (s) => (
    <article
      key={s.id}
      className={`flex flex-wrap items-center gap-4 rounded-xl border p-4 sm:p-5 ${
        s.id === 'sess-001' ? 'border-[#DCC8A4] bg-[#F3EBDD]' : 'border-[#E5E1D8] bg-white'
      }`}
    >
      <div className="min-w-[130px] rounded-lg bg-white/80 p-3 text-center">
        <CalendarDays size={17} className="mx-auto mb-1 text-[#9A7A45]" />
        <b className="text-xs text-[#0F1B2D]">
          {new Date(`${s.date}T00:00:00`).toLocaleDateString('en-IN', {
            weekday: 'short',
            day: 'numeric',
            month: 'short',
          })}
        </b>
        <small className="mt-1 block text-xs text-[#4A5568]">{s.time}</small>
      </div>
      <span className="grid h-10 w-10 place-items-center rounded-lg bg-[#F3EBDD] font-semibold text-[#806236]">
        {s.logo}
      </span>
      <div className="min-w-[180px] flex-1">
        <Link
          href={`/mentor/sessions/${s.id}`}
          className="text-sm font-semibold text-[#0F1B2D] hover:underline"
        >
          {s.startup}
        </Link>
        <p className="mt-1 text-xs text-[#4A5568]">
          {s.topic} · {s.duration} · {s.type}
        </p>
        <p className="mt-1 text-xs text-[#4A5568]">
          Attendees: {s.attendees} · {s.fee}
        </p>
      </div>
      <span
        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
          s.status === 'Confirmed'
            ? 'bg-[#E7F3EC] text-[#286749]'
            : s.status === 'Needs summary'
            ? 'bg-[#FFF3D6] text-[#8A5700]'
            : s.status === 'Cancelled'
            ? 'bg-[#FCE8E6] text-[#B42318]'
            : 'border border-[#E5E1D8] bg-white text-[#4A5568]'
        }`}
      >
        {s.status}
      </span>
      <div className="flex w-full justify-end gap-2 sm:w-auto">
        {s.status === 'Needs summary' ? (
          <Link
            href={`/mentor/sessions/${s.id}`}
            className="rounded-lg bg-[#0F1B2D] px-3 py-2 text-xs font-semibold text-white hover:bg-[#1C2B42]"
          >
            Add summary
          </Link>
        ) : (
          <>
            <button
              type="button"
              onClick={() => notify('Session prep opened.')}
              className="rounded-lg border border-[#E5E1D8] bg-white px-3 py-2 text-xs font-semibold text-[#0F1B2D] hover:bg-[#FAF8F4]"
            >
              Prepare
            </button>
            <button
              type="button"
              onClick={() => handleJoin(s)}
              className="rounded-lg bg-[#0F1B2D] px-3 py-2 text-xs font-semibold text-white hover:bg-[#1C2B42]"
            >
              Join
            </button>
          </>
        )}
      </div>
    </article>
  );

  return (
    <MentorPageShell active="Sessions" toast={toast} notify={notify}>
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm text-[#4A5568]">
            Mentor workspace <span className="mx-2 text-[#B8955A]">·</span> Sessions & sign-off
          </p>
          <h1 className="serif mt-1 text-[30px] font-semibold text-[#0F1B2D]">
            Sessions
          </h1>
          <p className="mt-1 text-sm text-[#4A5568]">
            See what’s coming up, what needs a summary and what has happened.
          </p>
        </div>
        <Btn onClick={() => setSchedule(true)}>
          <Plus size={15} /> Schedule session
        </Btn>
      </div>

      <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          ['Sessions this week', '4'],
          ['Hours mentored this month', '14'],
          ['Needs summary', '2'],
          ['Reschedule requests', '1'],
        ].map(([x, v], i) => (
          <div key={x} className="rounded-xl border border-[#E5E1D8] bg-white p-4">
            <p className="text-xs text-[#4A5568]">{x}</p>
            <b
              className={`serif mt-1 block text-2xl ${
                i === 2 ? 'text-[#8A5700]' : 'text-[#0F1B2D]'
              }`}
            >
              {v}
            </b>
          </div>
        ))}
      </div>

      <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
        {['Upcoming', 'Needs summary', 'Past', 'Calendar'].map((x) => (
          <button
            type="button"
            key={x}
            onClick={() => setTab(x)}
            className={`min-h-10 shrink-0 rounded-lg px-4 text-xs font-medium transition-colors ${
              tab === x
                ? 'bg-[#0F1B2D] text-white'
                : 'border border-[#E5E1D8] bg-white text-[#4A5568] hover:bg-[#FAF8F4]'
            }`}
          >
            {x}
          </button>
        ))}
      </div>

      <div className="grid items-start gap-5 xl:grid-cols-3">
        <section className="min-w-0 space-y-3 xl:col-span-2">
          {tab !== 'Calendar' && (
            <div className="flex flex-wrap gap-2">
              <div className="relative min-w-[180px] flex-1">
                <Search size={15} className="absolute left-3 top-3 text-[#A0A7B4]" />
                <input
                  aria-label="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search startup or topic"
                  className="h-10 w-full rounded-lg border border-[#E5E1D8] bg-white pl-9 text-xs focus:border-[#0F1B2D] focus:outline-none"
                />
              </div>
              <select className="h-10 rounded-lg border border-[#E5E1D8] bg-white px-3 text-xs focus:outline-none">
                <option>All startups</option>
                <option>Acme Studio</option>
                <option>GreenLedger</option>
              </select>
              <select className="h-10 rounded-lg border border-[#E5E1D8] bg-white px-3 text-xs focus:outline-none">
                <option>Soonest</option>
                <option>Latest</option>
                <option>Startup name</option>
              </select>
            </div>
          )}

          {tab === 'Calendar' ? (
            <Card
              title="November 2026"
              action={
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => setCalendarMode('Week')}
                    className={`rounded px-2 py-1 text-xs font-medium ${
                      calendarMode === 'Week'
                        ? 'bg-[#0F1B2D] text-white'
                        : 'text-[#4A5568] hover:text-[#0F1B2D]'
                    }`}
                  >
                    Week
                  </button>
                  <button
                    type="button"
                    onClick={() => setCalendarMode('Month')}
                    className={`rounded px-2 py-1 text-xs font-medium ${
                      calendarMode === 'Month'
                        ? 'bg-[#0F1B2D] text-white'
                        : 'text-[#4A5568] hover:text-[#0F1B2D]'
                    }`}
                  >
                    Month
                  </button>
                  <button
                    type="button"
                    onClick={() => notify('Calendar moved to today.')}
                    className="rounded border border-[#E5E1D8] px-2 py-1 text-xs font-medium text-[#0F1B2D] hover:bg-[#FAF8F4]"
                  >
                    Today
                  </button>
                </div>
              }
            >
              <div className="grid grid-cols-7 gap-px bg-[#E5E1D8]">
                {[
                  'Mon',
                  'Tue',
                  'Wed',
                  'Thu',
                  'Fri',
                  'Sat',
                  'Sun',
                  ...Array.from({ length: 35 }, (_, i) => String(i + 1)),
                ].map((x, i) => (
                  <div key={i} className="min-h-16 bg-white p-2 text-xs">
                    <span className="font-medium text-[#0F1B2D]">{x}</span>
                    {[12, 18].includes(i) && (
                      <Link
                        href={`/mentor/sessions/${i === 12 ? 'sess-001' : 'sess-002'}`}
                        className="mt-1 block truncate rounded bg-[#F3EBDD] p-1 text-xs font-semibold text-[#806236]"
                      >
                        Mentor session
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          ) : tab === 'Needs summary' ? (
            sessions
              .filter((s) => s.status === 'Needs summary' || (s.status === 'Completed' && !s.summary))
              .map(sessionCard)
          ) : tab === 'Past' ? (
            <Card title="Past sessions">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[700px] text-left text-xs">
                  <thead className="border-b border-[#E5E1D8] text-[#4A5568]">
                    <tr>
                      {[
                        'Date',
                        'Startup',
                        'Topic',
                        'Duration',
                        'Type',
                        'Attendance',
                        'Summary',
                        'Rating',
                        '',
                      ].map((x) => (
                        <th key={x} className="py-3 font-medium">
                          {x}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {sessions
                      .filter((s) => s.status === 'Completed')
                      .map((s) => (
                        <tr key={s.id} className="border-b border-[#E5E1D8]">
                          <td className="py-3 text-[#0F1B2D]">{s.date}</td>
                          <td className="font-medium text-[#0F1B2D]">{s.startup}</td>
                          <td className="text-[#4A5568]">{s.topic}</td>
                          <td className="text-[#4A5568]">{s.duration}</td>
                          <td className="text-[#4A5568]">{s.type}</td>
                          <td className="text-[#286749]">Attended</td>
                          <td className="text-[#4A5568]">{s.summary ? 'Added' : 'Missing'}</td>
                          <td className="text-[#4A5568]">—</td>
                          <td>
                            <Link href={`/mentor/sessions/${s.id}`} className="font-semibold text-[#9A7A45]">
                              View
                            </Link>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              <button
                type="button"
                onClick={() => {
                  const a = document.createElement('a');
                  a.href = URL.createObjectURL(
                    new Blob(
                      [
                        'Date,Startup,Topic,Status\n2026-10-28,Acme Studio,Customer interview synthesis,Completed',
                      ],
                      { type: 'text/csv' }
                    )
                  );
                  a.download = 'mentor-sessions.csv';
                  a.click();
                  notify('Your session history exported.');
                }}
                className="mt-3 text-xs font-semibold text-[#9A7A45]"
              >
                Export CSV <Download className="inline" size={13} />
              </button>
            </Card>
          ) : (
            sessions
              .filter(
                (s) =>
                  s.status !== 'Completed' &&
                  (!search ||
                    `${s.startup} ${s.topic}`.toLowerCase().includes(search.toLowerCase()))
              )
              .map(sessionCard)
          )}
        </section>

        <aside className="space-y-5">
          <Card title="Today">
            <p className="text-sm font-semibold text-[#0F1B2D]">No sessions today</p>
            <p className="mt-1 text-xs text-[#4A5568]">
              Next session: Acme Studio · Thu, Nov 12 · 4:00 PM IST
            </p>
            <Link
              href="/mentor/sessions/sess-001"
              className="mt-3 inline-block text-xs font-semibold text-[#9A7A45]"
            >
              Prepare session <ArrowRight className="inline" size={12} />
            </Link>
          </Card>

          <Card title="Availability this week">
            <p className="text-xs text-[#4A5568]">5 open slots available this week.</p>
            <div className="mt-3 flex h-2 rounded-full bg-[#E5E1D8]">
              <span className="w-2/3 rounded-full bg-[#0F1B2D]" />
            </div>
            <button
              type="button"
              onClick={() => notify('Availability settings opened.')}
              className="mt-3 text-xs font-semibold text-[#9A7A45]"
            >
              Edit availability
            </button>
          </Card>

          <Card title="Hours vs capacity">
            <div className="flex justify-between text-xs">
              <span className="text-[#0F1B2D]">14 hours this month</span>
              <b className="text-[#0F1B2D]">20 hour capacity</b>
            </div>
            <div className="mt-2 h-2 rounded-full bg-[#E5E1D8]">
              <div className="h-full w-[70%] rounded-full bg-[#B8955A]" />
            </div>
            <p className="mt-2 text-xs text-[#4A5568]">Pace your mentorship load.</p>
          </Card>
        </aside>
      </div>

      {/* Schedule Session Modal */}
      {schedule && (
        <div className="fixed inset-0 z-40 grid place-items-center bg-[#0F1B2D]/45 p-4">
          <section
            role="dialog"
            aria-modal="true"
            className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"
          >
            <div className="mb-5 flex items-center justify-between">
              <h2 className="serif text-2xl font-semibold text-[#0F1B2D]">
                Schedule session
              </h2>
              <button
                type="button"
                onClick={() => setSchedule(false)}
                aria-label="Close"
                className="text-[#4A5568] hover:text-[#0F1B2D]"
              >
                <X size={18} />
              </button>
            </div>
            <div className="space-y-3">
              <label className="block text-sm font-medium text-[#0F1B2D]">
                Startup
                <select className="mt-2 h-10 w-full rounded-lg border border-[#E5E1D8] bg-white px-3 focus:outline-none">
                  <option>Acme Studio</option>
                  <option>GreenLedger</option>
                </select>
              </label>
              <label className="block text-sm font-medium text-[#0F1B2D]">
                Session type
                <select className="mt-2 h-10 w-full rounded-lg border border-[#E5E1D8] bg-white px-3 focus:outline-none">
                  <option>Regular</option>
                  <option>Intro call</option>
                  <option>Review</option>
                  <option>Pitch practice</option>
                </select>
              </label>
              <label className="block text-sm font-medium text-[#0F1B2D]">
                Topic
                <input
                  aria-label="Session topic"
                  placeholder="Session topic"
                  className="mt-2 h-10 w-full rounded-lg border border-[#E5E1D8] px-3 focus:outline-none"
                />
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className="text-sm font-medium text-[#0F1B2D]">
                  Date
                  <input
                    aria-label="Select date"
                    type="date"
                    className="mt-2 h-10 w-full rounded-lg border border-[#E5E1D8] px-3 focus:outline-none"
                  />
                </label>
                <label className="text-sm font-medium text-[#0F1B2D]">
                  Open slot
                  <select className="mt-2 h-10 w-full rounded-lg border border-[#E5E1D8] bg-white px-3 focus:outline-none">
                    <option>Thu · 4:00 PM IST</option>
                    <option>Fri · 11:00 AM IST</option>
                  </select>
                </label>
              </div>
              <label className="block text-sm font-medium text-[#0F1B2D]">
                Duration
                <select className="mt-2 h-10 w-full rounded-lg border border-[#E5E1D8] bg-white px-3 focus:outline-none">
                  <option>45 minutes</option>
                  <option>30 minutes</option>
                  <option>60 minutes</option>
                </select>
              </label>
              <p className="text-xs text-[#4A5568]">
                Fee per mentorship agreement · No terms can be changed here. Startup confirms or
                proposes another time.
              </p>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setSchedule(false)}
                className="min-h-10 px-4 text-sm font-medium text-[#4A5568] hover:text-[#0F1B2D]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setSchedule(false);
                  notify('Session invitation sent to startup.');
                }}
                className="min-h-10 rounded-lg bg-[#0F1B2D] px-4 text-sm font-semibold text-white hover:bg-[#1C2B42]"
              >
                Send invite
              </button>
            </div>
          </section>
        </div>
      )}
    </MentorPageShell>
  );
}
