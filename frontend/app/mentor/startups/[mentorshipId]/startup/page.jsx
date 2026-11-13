'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  LockKeyhole,
  ShieldCheck,
  Check,
  CheckCircle2,
  Clock,
  FileText,
  ArrowRight,
} from 'lucide-react';
import MentorPageShell from '../../../mentor-page-shell';
import { initialStartups, Card } from '../../../mentor-data';

export default function MenteeStartupProfilePage() {
  const params = useParams();
  const mentorshipId = params?.mentorshipId || 'mentorship-01';

  const [toast, setToast] = useState('');

  const notify = (x) => {
    setToast(x);
    setTimeout(() => setToast(''), 2600);
  };

  const startup =
    initialStartups.find((s) => s.id === mentorshipId) || initialStartups[0];

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
    <MentorPageShell
      active="My startups"
      backHref={`/mentor/startups/${startup.id}`}
      backLabel={`← ${startup.name} Workspace`}
      toast={toast}
      notify={notify}
    >
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm text-[#4A5568]">
            Mentor workspace <span className="mx-2 text-[#B8955A]">·</span> {startup.name}
          </p>
          <h1 className="serif mt-1 text-[30px] font-semibold text-[#0F1B2D]">
            {startup.name} · Overview
          </h1>
          <p className="mt-1 text-sm text-[#4A5568]">
            Read-only view of information the startup has chosen to share.
          </p>
        </div>
        <Link
          href={`/mentor/startups/${startup.id}`}
          className="inline-flex min-h-10 items-center rounded-lg bg-[#0F1B2D] px-3 text-xs font-semibold text-white hover:bg-[#1C2B42]"
        >
          Open workspace
        </Link>
      </div>

      <div className="mb-5 flex items-center gap-2 rounded-lg border border-[#E5E1D8] bg-white p-3 text-xs text-[#4A5568]">
        <LockKeyhole size={15} className="text-[#9A7A45]" />
        Read-only view. Showing what {startup.name} has chosen to share with you.
      </div>

      {startup.traction === 'Not shared' && (
        <div className="mb-5 rounded-lg bg-[#F3F4F6] p-3 text-xs text-[#4A5568]">
          Some details are not shared. Ask {startup.name} to share more if it would help your
          guidance.
        </div>
      )}

      <div className="grid items-start gap-5 xl:grid-cols-3">
        <div className="space-y-5 xl:col-span-2">
          {/* Startup profile card */}
          <Card title="Startup profile">
            <div className="flex items-start gap-4">
              <span className="grid h-16 w-16 place-items-center rounded-2xl bg-[#F3EBDD] font-serif text-2xl font-semibold text-[#806236]">
                {startup.logo}
              </span>
              <div>
                <h2 className="serif text-2xl font-semibold text-[#0F1B2D]">{startup.name}</h2>
                <p className="mt-1 text-sm text-[#4A5568]">{startup.one}</p>
                <span className="mt-2 inline-block rounded-full bg-[#F3EBDD] px-2.5 py-1 text-xs font-semibold text-[#806236]">
                  Stage: {startup.stage}
                </span>
                <span className="ml-2 inline-flex items-center rounded-full bg-[#E7F3EC] px-2.5 py-1 text-xs font-semibold text-[#286749]">
                  <ShieldCheck className="mr-1" size={11} />
                  Verified startup
                </span>
              </div>
            </div>
            <p className="mt-4 text-xs text-[#4A5568]">
              {startup.sector} · {startup.location} · Founded 2023 · {startup.team} team members
            </p>
          </Card>

          {/* About & Pitch summary */}
          <Card title="About and pitch summary">
            <p className="text-sm leading-6 text-[#0F1B2D]">{startup.one}</p>
            <p className="mt-3 text-xs leading-5 text-[#4A5568]">
              Acme helps growing businesses see cash flow clearly and plan with confidence. Shared by{' '}
              {startup.name}.
            </p>
          </Card>

          {/* Problem, solution & market */}
          <Card title="Problem, solution & market">
            <div className="grid gap-3 md:grid-cols-3">
              {[
                ['Problem', 'Small teams make critical decisions with fragmented financial data.'],
                ['Solution', 'A live workspace connecting finance workflows and forecasts.'],
                ['Market', 'Fintech · India · ₹1,200 Cr TAM'],
              ].map(([a, b]) => (
                <div key={a} className="rounded-lg bg-[#FAF8F4] p-3">
                  <b className="text-xs text-[#0F1B2D]">{a}</b>
                  <p className="mt-2 text-xs leading-5 text-[#4A5568]">{b}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Stage & exit criteria */}
          <Card title="Stage & exit criteria">
            <div className="mb-4 flex items-center">
              {['Idea', 'Prototype', 'Early revenue', 'Mature'].map((x, i) => (
                <div key={x} className="flex flex-1 items-center">
                  <span
                    className={`grid h-7 w-7 place-items-center rounded-full text-xs font-semibold ${
                      i === 0
                        ? 'bg-[#0F1B2D] text-white'
                        : i === 1
                        ? 'border-2 border-[#B8955A] bg-[#F3EBDD] text-[#806236]'
                        : 'bg-[#F3F4F6] text-[#A0A7B4]'
                    }`}
                  >
                    {i === 0 ? <Check size={13} /> : i + 1}
                  </span>
                  <span className="ml-2 hidden text-xs font-medium text-[#0F1B2D] sm:block">
                    {x}
                  </span>
                  {i < 3 && <span className="mx-2 h-px flex-1 bg-[#E5E1D8]" />}
                </div>
              ))}
            </div>
            {[
              'MVP scope defined',
              'Working prototype released',
              'Test user feedback reviewed',
              'Mentor confirms MVP',
            ].map((x, i) => (
              <div
                key={x}
                className="flex items-center gap-2 border-t border-[#E5E1D8] py-2 text-xs"
              >
                <span className={i < 2 ? 'text-[#2E7D5B]' : 'text-[#B7791F]'}>
                  {i < 2 ? <CheckCircle2 size={14} /> : <Clock size={14} />}
                </span>
                <span className="text-[#0F1B2D]">{x}</span>
                <span className="ml-auto text-[#4A5568]">{i < 2 ? 'Approved' : 'In progress'}</span>
                <button
                  type="button"
                  onClick={() => notify('Comment added to shared criterion.')}
                  className="font-medium text-[#9A7A45]"
                >
                  Comment
                </button>
              </div>
            ))}
          </Card>

          {/* Traction Highlights */}
          <Card title="Traction highlights">
            <p className="text-sm font-medium text-[#0F1B2D]">
              {startup.traction === 'Not shared' ? 'Not shared' : startup.traction}
            </p>
            <small className="mt-1 block text-xs text-[#4A5568]">
              Shared by {startup.name} · Updated Nov 01 · Source: team-entered
            </small>
            <p className="mt-3 text-xs text-[#A0A7B4]">Funding details: Not shared</p>
          </Card>

          {/* Team */}
          <Card title="Team">
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ['AK', 'Aarav Kapoor', 'Founder & CEO'],
                ['PM', 'Priya Menon', 'Co-founder · Product'],
                ['SR', 'Sanjay Rao', 'Engineering lead'],
              ].map(([a, b, c]) => (
                <div key={b} className="flex items-center gap-3 rounded-lg border border-[#E5E1D8] p-3">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-[#F3EBDD] text-xs font-semibold text-[#806236]">
                    {a}
                  </span>
                  <span>
                    <b className="text-xs text-[#0F1B2D]">{b}</b>
                    <small className="block text-xs text-[#4A5568]">{c}</small>
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-[#A0A7B4]">Contact information: Not shared</p>
          </Card>

          {/* Documents shared */}
          <Card title="Documents shared with you">
            <div className="flex items-center gap-3 rounded-lg border border-[#E5E1D8] p-3">
              <FileText size={17} className="text-[#9A7A45]" />
              <span className="flex-1 text-xs text-[#0F1B2D]">
                Pitch deck v3.pdf{' '}
                <small className="block text-[#4A5568]">Updated Oct 25 · View only</small>
              </span>
              <button
                type="button"
                onClick={() => notify('Document opened. Access logged.')}
                className="text-xs font-semibold text-[#9A7A45]"
              >
                View
              </button>
            </div>
            <button
              type="button"
              onClick={() => notify('Document request sent.')}
              className="mt-3 text-xs font-semibold text-[#9A7A45]"
            >
              Request a document
            </button>
          </Card>
        </div>

        {/* Aside */}
        <aside className="space-y-5 xl:sticky xl:top-24">
          <Card title="Readiness score">
            <div className="flex items-center gap-4">
              <div
                className="grid h-20 w-20 place-items-center rounded-full"
                style={{
                  background:
                    'conic-gradient(#B8955A 0deg 259deg,#E5E1D8 259deg 360deg)',
                }}
              >
                <div className="grid h-16 w-16 place-items-center rounded-full bg-white">
                  <b className="serif text-2xl text-[#0F1B2D]">{startup.score}</b>
                </div>
              </div>
              <div>
                <p className="text-xs text-[#4A5568]">out of 100</p>
                {progress(startup)}
              </div>
            </div>
            <p className="mt-4 text-xs text-[#4A5568]">
              Checklist 80% · Traction 65% · Mentor feedback 70%
            </p>
          </Card>

          <Card title="Your mentorship">
            <p className="text-xs text-[#0F1B2D]">
              {startup.status} · {startup.sessions} sessions held
            </p>
            <p className="mt-2 text-xs text-[#0F1B2D]">Next session: {startup.next}</p>
            <Link
              href={`/mentor/startups/${startup.id}`}
              className="mt-3 inline-block text-xs font-semibold text-[#9A7A45]"
            >
              Open workspace <ArrowRight className="inline" size={12} />
            </Link>
          </Card>

          <Card title="What’s shared">
            <div className="space-y-3">
              {[
                ['Profile', true],
                ['Traction', startup.traction !== 'Not shared'],
                ['Team', true],
                ['Documents', true],
                ['Funding', false],
              ].map(([x, on]) => (
                <div key={x} className="flex items-center justify-between text-xs">
                  <span className="text-[#0F1B2D]">{x}</span>
                  {on ? (
                    <span className="font-medium text-[#286749]">Shared</span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => notify(`Access request for ${x} sent.`)}
                      className="font-medium text-[#9A7A45]"
                    >
                      Ask for access
                    </button>
                  )}
                </div>
              ))}
            </div>
          </Card>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => notify('Message composer opened.')}
              className="flex-1 rounded-lg border border-[#E5E1D8] bg-white py-2 text-xs font-semibold text-[#0F1B2D] hover:bg-[#FAF8F4]"
            >
              Message
            </button>
            <button
              type="button"
              onClick={() => notify('Session booking opened.')}
              className="flex-1 rounded-lg bg-[#0F1B2D] py-2 text-xs font-semibold text-white hover:bg-[#1C2B42]"
            >
              Book session
            </button>
          </div>
        </aside>
      </div>
    </MentorPageShell>
  );
}
