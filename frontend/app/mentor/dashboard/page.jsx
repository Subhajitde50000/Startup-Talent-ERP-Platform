'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ChevronDown,
  ArrowRight,
  AlertCircle,
  CalendarDays,
} from 'lucide-react';
import MentorPageShell from '../mentor-page-shell';
import { initialStartups, Card } from '../mentor-data';

export default function MentorDashboardPage() {
  const [toast, setToast] = useState('');
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

  return (
    <MentorPageShell active="Dashboard" toast={toast} notify={notify}>
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm text-[#4A5568]">
            Mentor workspace <span className="mx-2 text-[#B8955A]">·</span> Forma
          </p>
          <h1 className="serif mt-1 text-[30px] font-semibold text-[#0F1B2D]">
            Good evening, Rhea
          </h1>
          <p className="mt-1 text-sm text-[#4A5568]">
            Your mentorship priorities, sessions and impact for today.
          </p>
        </div>
        <button
          type="button"
          onClick={() => notify('Availability updated.')}
          className="inline-flex min-h-10 items-center gap-2 rounded-full bg-[#E7F3EC] px-3 text-xs font-semibold text-[#286749]"
        >
          <span className="h-2 w-2 rounded-full bg-[#2E7D5B]" />
          Accepting new startups <ChevronDown size={13} />
        </button>
      </div>

      {/* Metrics Row */}
      <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          ['Active startups', '4 / 5', '+1 this quarter'],
          ['Sessions this month', '12', '2 upcoming'],
          ['Sign-offs pending', '3', 'Oldest · 2 days'],
          ['Earnings this month', '₹36,000', '₹8,000 pending'],
        ].map(([a, b, c]) => (
          <div key={a} className="rounded-xl border border-[#E5E1D8] bg-white p-4 sm:p-5">
            <p className="text-xs text-[#4A5568]">{a}</p>
            <b className="serif mt-1 block text-2xl text-[#0F1B2D]">{b}</b>
            <small className="text-xs text-[#2E7D5B]">{c}</small>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid items-start gap-5 xl:grid-cols-3">
        <div className="space-y-5 xl:col-span-2">
          {/* Needs attention */}
          <Card
            title="Needs your attention"
            action={
              <Link href="/mentor/requests" className="text-xs font-semibold text-[#9A7A45]">
                View all
              </Link>
            }
          >
            <div className="space-y-2">
              {[
                ['2 new startup requests', 'Oldest waiting 5 days', '/mentor/requests'],
                ['3 readiness items submitted', 'Acme Studio · review evidence', '/mentor/startups/mentorship-01'],
                ['1 deliverable due soon', 'GreenLedger · due Nov 08', '/mentor/startups/mentorship-02'],
                ['Session notes needed', 'Cohortly · last session Sep 30', '/mentor/startups/mentorship-03'],
              ].map(([a, b, u]) => (
                <Link
                  href={u}
                  key={a}
                  className="flex items-center gap-3 rounded-lg border border-[#E5E1D8] p-3 transition hover:bg-[#FAF8F4]"
                >
                  <AlertCircle size={17} className="text-[#B7791F]" />
                  <span className="flex-1">
                    <b className="block text-xs text-[#0F1B2D]">{a}</b>
                    <small className="text-xs text-[#4A5568]">{b}</small>
                  </span>
                  <span className="text-xs font-semibold text-[#9A7A45]">
                    Open <ArrowRight className="inline" size={12} />
                  </span>
                </Link>
              ))}
            </div>
          </Card>

          {/* Today's sessions */}
          <Card title="Today's sessions">
            <div className="rounded-lg bg-[#FAF8F4] p-4">
              <p className="text-xs text-[#4A5568]">No sessions today.</p>
              <Link
                href="/mentor/startups"
                className="mt-2 inline-block text-xs font-semibold text-[#9A7A45]"
              >
                Review your schedule <ArrowRight className="inline" size={12} />
              </Link>
            </div>
            <h3 className="mb-2 mt-4 text-xs font-semibold text-[#0F1B2D]">Next up</h3>
            <div className="flex items-center gap-3 rounded-lg border border-[#E5E1D8] p-3">
              <CalendarDays size={17} className="text-[#9A7A45]" />
              <span className="flex-1">
                <b className="block text-xs text-[#0F1B2D]">
                  Acme Studio · Go-to-market and pricing
                </b>
                <small className="text-xs text-[#4A5568]">
                  Thu, Nov 12 · 4:00 PM · Asia/Kolkata
                </small>
              </span>
              <button
                type="button"
                onClick={() => notify('Session prep opened.')}
                className="text-xs font-semibold text-[#9A7A45]"
              >
                Prepare
              </button>
            </div>
          </Card>

          {/* My startups at a glance */}
          <Card
            title="My startups at a glance"
            action={
              <Link href="/mentor/startups" className="text-xs font-semibold text-[#9A7A45]">
                View all <ArrowRight className="inline" size={12} />
              </Link>
            }
          >
            <div className="grid gap-3 md:grid-cols-2">
              {mentorships
                .filter((s) => s.status === 'Active')
                .map((s) => (
                  <div key={s.id} className="rounded-lg border border-[#E5E1D8] p-3">
                    <div className="flex items-center gap-2">
                      <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#F3EBDD] font-semibold text-[#806236]">
                        {s.logo}
                      </span>
                      <b className="text-xs text-[#0F1B2D]">{s.name}</b>
                      <span className="ml-auto rounded-full bg-[#F3EBDD] px-2 py-1 text-xs text-[#806236]">
                        {s.stage}
                      </span>
                    </div>
                    <div className="mt-3">{progress(s)}</div>
                    <p className="mt-2 text-xs text-[#4A5568]">
                      Health: {s.health} · Last active {s.last}
                    </p>
                    <Link
                      href={`/mentor/startups/${s.id}`}
                      className="mt-2 inline-block text-xs font-semibold text-[#9A7A45]"
                    >
                      Open workspace <ArrowRight className="inline" size={12} />
                    </Link>
                  </div>
                ))}
            </div>
          </Card>

          {/* Impact trend */}
          <Card title="Impact trend">
            <p className="mb-3 text-xs font-medium text-[#4A5568]">
              Average readiness is up 8 points in 90 days.
            </p>
            <div className="flex h-32 items-end gap-3 border-b border-[#E5E1D8]">
              {[30, 36, 34, 50, 48, 62, 58, 74, 80, 77, 90, 100].map((v, i) => (
                <div
                  key={i}
                  className={`flex-1 rounded-t ${i === 11 ? 'bg-[#B8955A]' : 'bg-[#0F1B2D]'}`}
                  style={{ height: `${v}%` }}
                />
              ))}
            </div>
            <div className="mt-2 flex justify-between text-xs text-[#4A5568]">
              <span>Aug</span>
              <span>Nov</span>
            </div>
            <p className="mt-3 text-xs text-[#4A5568]">
              Correlation, not proof of cause. Aggregated across active startups.
            </p>
          </Card>
        </div>

        {/* Aside Column */}
        <aside className="space-y-5">
          <Card title="Next session">
            <b className="text-sm text-[#0F1B2D]">Acme Studio</b>
            <p className="mt-1 text-xs text-[#4A5568]">Thu, Nov 12 · 4:00 PM</p>
            <p className="mt-2 text-xs text-[#0F1B2D]">Go-to-market and pricing · 45 minutes</p>
            <button
              type="button"
              onClick={() => notify('Join opens 10 minutes before the session.')}
              className="mt-4 w-full rounded-lg bg-[#0F1B2D] py-2.5 text-xs font-semibold text-white hover:bg-[#1C2B42]"
            >
              Join session
            </button>
          </Card>

          <Card title="Capacity">
            <div className="flex justify-between text-xs">
              <span className="text-[#0F1B2D]">4 of 5 slots used</span>
              <button
                type="button"
                onClick={() => notify('Capacity setting opened.')}
                className="font-semibold text-[#9A7A45]"
              >
                Edit
              </button>
            </div>
            <div className="mt-2 h-2 rounded-full bg-[#E5E1D8]">
              <div className="h-full w-4/5 rounded-full bg-[#B8955A]" />
            </div>
            <p className="mt-2 text-xs text-[#4A5568]">One spot available for a new mentorship.</p>
          </Card>

          <Card title="Earnings snapshot">
            <p className="text-xs text-[#4A5568]">This month</p>
            <b className="serif text-2xl text-[#0F1B2D]">₹36,000</b>
            <p className="mt-2 text-xs text-[#4A5568]">
              Pending payout <b className="text-[#0F1B2D]">₹8,000</b>
            </p>
            <Link
              href="/mentor/earnings"
              className="mt-3 inline-block text-xs font-semibold text-[#9A7A45]"
            >
              View earnings <ArrowRight className="inline" size={12} />
            </Link>
          </Card>

          <Card title="A mentoring tip">
            <p className="text-xs leading-5 text-[#4A5568]">
              Specific sign-off notes help founders understand what evidence is missing and how to
              strengthen it.
            </p>
          </Card>
        </aside>
      </div>
    </MentorPageShell>
  );
}
