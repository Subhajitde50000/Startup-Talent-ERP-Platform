'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  Download,
  Check,
  Clock,
  Target,
  FileText,
  X,
} from 'lucide-react';
import MentorPageShell from '../../../mentor-page-shell';
import { initialReadiness, initialStartups, Btn, Card } from '../../../mentor-data';

export default function StartupReadinessPage() {
  const params = useParams();
  const mentorshipId = params?.mentorshipId || 'mentorship-01';

  const [toast, setToast] = useState('');
  const [selected, setSelected] = useState(null);
  const [drawer, setDrawer] = useState(false);
  const [criteriaDone, setCriteriaDone] = useState([false, false, false]);
  const [decisionNote, setDecisionNote] = useState('');
  const [conflict, setConflict] = useState(true);
  const [statuses, setStatuses] = useState([
    'Signed off',
    'Signed off',
    'Submitted',
    'In progress',
    'Not started',
    'Not started',
  ]);

  const notify = (s) => {
    setToast(s);
    setTimeout(() => setToast(''), 2700);
  };

  const startup =
    initialStartups.find((s) => s.id === mentorshipId) || initialStartups[0];

  const signedCount = statuses.filter((s) => s === 'Signed off').length;

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
            Mentor workspace <span className="mx-2 text-[#B8955A]">·</span> Sessions & sign-off
          </p>
          <h1 className="serif mt-1 text-[30px] font-semibold text-[#0F1B2D]">
            Readiness sign-off
          </h1>
          <p className="mt-1 text-sm text-[#4A5568]">
            Review evidence and record your decisions for {startup.name}.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href={`/mentor/startups/${startup.id}`}
            className="inline-flex min-h-10 items-center rounded-lg border border-[#E5E1D8] bg-white px-3 text-xs font-semibold text-[#0F1B2D] hover:bg-[#FAF8F4]"
          >
            Workspace
          </Link>
          <Btn secondary onClick={() => notify('Readiness summary downloaded.')}>
            <Download size={14} /> Download summary
          </Btn>
        </div>
      </div>

      <div className="mb-5 grid gap-5 lg:grid-cols-3">
        <Card title="Readiness score">
          <div className="flex items-center gap-4">
            <div
              className="grid h-24 w-24 place-items-center rounded-full"
              style={{
                background:
                  'conic-gradient(#B8955A 0deg 259deg,#E5E1D8 259deg 360deg)',
              }}
            >
              <div className="grid h-[72px] w-[72px] place-items-center rounded-full bg-white">
                <b className="serif text-3xl text-[#0F1B2D]">{startup.score}</b>
              </div>
            </div>
            <div>
              <p className="text-xs text-[#4A5568]">out of 100</p>
              <p className="mt-2 text-xs font-semibold text-[#0F1B2D]">
                {signedCount} of 6 signed off
              </p>
              <span className="mt-2 inline-block rounded-full bg-[#FFF3D6] px-2 py-1 text-xs font-medium text-[#8A5700]">
                Badge not yet earned
              </span>
            </div>
          </div>
        </Card>

        <div className="lg:col-span-2">
          <Card title="Sign-off progress">
            <div className="mb-2 flex justify-between text-xs font-medium">
              <span className="text-[#0F1B2D]">{signedCount} of 6 items signed off</span>
              <b className="text-[#0F1B2D]">{Math.round((signedCount / 6) * 100)}%</b>
            </div>
            <div className="h-2 rounded-full bg-[#E5E1D8]">
              <div
                className="h-full rounded-full bg-[#B8955A]"
                style={{ width: `${(signedCount / 6) * 100}%` }}
              />
            </div>
            <p className="mt-4 text-xs text-[#4A5568]">
              Sign off only the evidence you have reviewed. Decisions are recorded with your name and
              date and may be seen by investors.
            </p>
          </Card>
        </div>
      </div>

      <div className="grid items-start gap-5 xl:grid-cols-3">
        <div className="space-y-3 xl:col-span-2">
          {initialReadiness.map((item, i) => (
            <article key={item} className="rounded-xl border border-[#E5E1D8] bg-white p-4 sm:p-5">
              <div className="flex flex-wrap items-start gap-3">
                <span
                  className={`grid h-8 w-8 place-items-center rounded-full ${
                    statuses[i] === 'Signed off'
                      ? 'bg-[#E7F3EC] text-[#286749]'
                      : statuses[i] === 'Submitted'
                      ? 'bg-[#FFF3D6] text-[#8A5700]'
                      : 'bg-[#F3F4F6] text-[#4A5568]'
                  }`}
                >
                  {statuses[i] === 'Signed off' ? (
                    <Check size={16} />
                  ) : statuses[i] === 'Submitted' ? (
                    <Clock size={15} />
                  ) : (
                    <Target size={15} />
                  )}
                </span>
                <div className="min-w-[180px] flex-1">
                  <h2 className="text-sm font-semibold text-[#0F1B2D]">{item}</h2>
                  <p className="mt-1 text-xs leading-5 text-[#4A5568]">
                    Done means the evidence is complete, current, relevant and consistent with the
                    startup's stage.
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-[#4A5568]">
                    <span
                      className={`rounded-full px-2 py-1 font-medium ${
                        statuses[i] === 'Signed off'
                          ? 'bg-[#E7F3EC] text-[#286749]'
                          : statuses[i] === 'Submitted'
                          ? 'bg-[#FFF3D6] text-[#8A5700]'
                          : 'bg-[#F3F4F6]'
                      }`}
                    >
                      {statuses[i]}
                    </span>
                    <span>Assigned to you</span>
                    <span>Updated Nov {String(5 - i).padStart(2, '0')}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSelected({ item, index: i });
                    setCriteriaDone([false, false, false]);
                    setDecisionNote('');
                    setDrawer(true);
                  }}
                  className="min-h-9 rounded-lg border border-[#E5E1D8] px-3 text-xs font-semibold text-[#0F1B2D] hover:bg-[#FAF8F4]"
                >
                  Review
                </button>
              </div>
              <div className="mt-3 rounded-lg bg-[#FAF8F4] p-3 text-xs text-[#0F1B2D]">
                <FileText className="mr-1 inline text-[#9A7A45]" size={13} />
                Evidence shared by {startup.name}:{' '}
                {i < 3 ? 'Pitch deck v3.pdf · updated Nov 01' : 'No evidence attached'}
                <button
                  type="button"
                  onClick={() => notify('Evidence preview opened. Access logged.')}
                  className="ml-2 font-semibold text-[#9A7A45]"
                >
                  Open evidence
                </button>
              </div>
            </article>
          ))}
        </div>

        <aside className="space-y-5">
          <Card title="Score breakdown">
            {[
              ['Checklist completion', 80],
              ['Traction data', 65],
              ['Mentor feedback', 70],
            ].map(([n, v]) => (
              <div key={n} className="mb-4">
                <div className="mb-1 flex justify-between text-xs">
                  <span className="text-[#0F1B2D]">{n}</span>
                  <b className="text-[#0F1B2D]">{v}%</b>
                </div>
                <div className="h-2 rounded-full bg-[#E5E1D8]">
                  <div
                    className="h-full rounded-full bg-[#0F1B2D]"
                    style={{ width: `${v}%` }}
                  />
                </div>
              </div>
            ))}
          </Card>

          <Card title="Other mentors">
            <p className="text-xs font-semibold text-[#0F1B2D]">Rhea Mukherjee · You</p>
            <p className="mt-1 text-xs text-[#4A5568]">Assigned items: 4 · Signed off: 2</p>
            <p className="mt-3 text-xs font-semibold text-[#0F1B2D]">Arjun Mehta · Co-mentor</p>
            <p className="mt-1 text-xs text-[#4A5568]">Assigned items: 2 · Signed off: 1</p>
          </Card>

          <Card title="Recent history">
            <div className="space-y-3 text-xs">
              {[
                ['Item 1 signed off', 'Nov 01'],
                ['Item 2 signed off', 'Oct 29'],
                ['Item 3 submitted', 'Nov 04'],
              ].map(([a, b]) => (
                <p key={a} className="flex justify-between">
                  <span className="text-[#0F1B2D]">{a}</span>
                  <span className="text-[#4A5568]">{b}</span>
                </p>
              ))}
            </div>
          </Card>

          <Card title="Sign-off guidance">
            <p className="text-xs leading-5 text-[#4A5568]">
              Use the same published criteria for each startup. Link your decision to evidence and
              explain any gaps clearly.
            </p>
            <button
              type="button"
              onClick={() => notify('Concern sent to admin review.')}
              className="mt-3 text-xs font-semibold text-[#9A7A45]"
            >
              Report a concern
            </button>
          </Card>
        </aside>
      </div>

      {statuses.every((s) => s === 'Signed off') && (
        <div className="mt-5 rounded-xl bg-[#F3EBDD] p-5">
          <h2 className="serif text-xl font-semibold text-[#806236]">All six items signed off</h2>
          <p className="mt-1 text-sm text-[#0F1B2D]">{startup.name} is ready for badge review.</p>
          <p className="mt-3 text-xs text-[#4A5568]">
            Optional endorsement (public only with startup consent)
          </p>
          <input
            aria-label="Write a short endorsement"
            maxLength={280}
            placeholder="Write a short endorsement"
            className="mt-2 h-10 w-full max-w-xl rounded-lg border border-[#E5E1D8] bg-white px-3 text-sm focus:outline-none"
          />
          <button
            type="button"
            onClick={() => notify('Endorsement saved pending startup consent.')}
            className="mt-3 block rounded-lg bg-[#0F1B2D] px-4 py-2 text-xs font-semibold text-white hover:bg-[#1C2B42]"
          >
            Submit for badge review
          </button>
        </div>
      )}

      {/* Review Drawer */}
      {drawer && selected && (
        <div
          className="fixed inset-0 z-40 bg-[#0F1B2D]/35 backdrop-blur-[2px]"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setDrawer(false);
          }}
        >
          <aside
            role="dialog"
            aria-modal="true"
            aria-label="Review submission"
            className="absolute inset-y-0 right-0 w-full max-w-[640px] overflow-y-auto bg-[#FAF8F4] p-5 shadow-xl sm:p-7"
          >
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="serif text-2xl font-semibold text-[#0F1B2D]">{selected.item}</h2>
                <p className="mt-1 text-xs text-[#4A5568]">{startup.name} · Readiness criterion</p>
              </div>
              <button
                type="button"
                onClick={() => setDrawer(false)}
                aria-label="Close review"
                className="grid h-10 w-10 place-items-center rounded-lg bg-white border border-[#E5E1D8] text-[#4A5568] hover:text-[#0F1B2D]"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-5">
              <Card title="What done means">
                <div className="space-y-3">
                  {[
                    'Evidence is complete and current',
                    'Evidence supports the stated claim',
                    'Assumptions and sources are clearly documented',
                  ].map((x, i) => (
                    <label
                      key={x}
                      className="flex items-center gap-3 text-xs font-medium text-[#0F1B2D]"
                    >
                      <input
                        aria-label="Toggle option"
                        type="checkbox"
                        checked={criteriaDone[i]}
                        onChange={() =>
                          setCriteriaDone(criteriaDone.map((v, n) => (n === i ? !v : v)))
                        }
                        className="h-4 w-4 accent-[#0F1B2D]"
                      />
                      {x}
                    </label>
                  ))}
                </div>
              </Card>

              <Card title="Evidence viewer">
                <p className="text-xs text-[#4A5568]">Shared by {startup.name} · view-only</p>
                <button
                  type="button"
                  onClick={() => notify('Evidence opened. Access logged.')}
                  className="mt-3 flex w-full items-center gap-2 rounded-lg border border-[#E5E1D8] bg-white p-3 text-left text-xs font-medium text-[#0F1B2D]"
                >
                  <FileText size={16} className="text-[#9A7A45]" />
                  Pitch deck v3.pdf · updated Nov 01
                </button>
                <p className="mt-3 text-xs text-[#4A5568]">
                  Startup notes: “Updated based on our first 10 customer conversations.”
                </p>
              </Card>

              <Card title="Your decision">
                <label className="block text-xs font-medium text-[#0F1B2D]">
                  Review note (20–500 characters)
                  <textarea
                    minLength={20}
                    maxLength={500}
                    value={decisionNote}
                    onChange={(e) => setDecisionNote(e.target.value)}
                    rows={4}
                    placeholder="What you reviewed and why it passes, or what is missing…"
                    className="mt-2 w-full rounded-lg border border-[#E5E1D8] bg-white p-3 text-sm focus:border-[#0F1B2D] focus:outline-none"
                  />
                </label>
                <label className="mt-3 flex items-center gap-2 text-xs text-[#4A5568]">
                  <input
                    aria-label="Toggle option"
                    type="checkbox"
                    checked={conflict}
                    onChange={() => setConflict(!conflict)}
                    className="accent-[#0F1B2D]"
                  />
                  I have no conflict of interest on this item
                </label>
                {!conflict && (
                  <textarea
                    placeholder="Describe the conflict for admin review (required)"
                    rows={2}
                    className="mt-2 w-full rounded-lg border border-[#E5E1D8] p-3 text-xs focus:outline-none"
                  />
                )}
                <p className="mt-3 rounded-lg bg-[#FFF8E8] p-3 text-xs leading-4 text-[#806236]">
                  Sign-offs are recorded with your name and date and may be seen by investors. Confirm
                  you reviewed the evidence.
                </p>
                <div className="mt-4 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (decisionNote.length < 20) {
                        notify('Add a review note of at least 20 characters.');
                        return;
                      }
                      setStatuses(
                        statuses.map((s, i) => (i === selected.index ? 'Changes requested' : s))
                      );
                      setDrawer(false);
                      notify('Changes requested with your review note.');
                    }}
                    className="rounded-lg border border-[#F1C6C1] px-3 py-2 text-xs font-semibold text-[#B42318] hover:bg-[#FEE4E2]"
                  >
                    Request changes
                  </button>
                  <button
                    type="button"
                    disabled={!criteriaDone.every(Boolean) || decisionNote.length < 20 || !conflict}
                    onClick={() => {
                      setStatuses(
                        statuses.map((s, i) => (i === selected.index ? 'Signed off' : s))
                      );
                      setDrawer(false);
                      notify('Sign-off recorded with your name and date.');
                    }}
                    className="rounded-lg bg-[#0F1B2D] px-3 py-2 text-xs font-semibold text-white disabled:opacity-45 hover:bg-[#1C2B42]"
                  >
                    Confirm sign-off
                  </button>
                </div>
              </Card>

              <Card title="History">
                <p className="text-xs text-[#4A5568]">
                  Submitted Nov 04 · Previously reviewed Oct 29 · No prior decision on this version.
                </p>
              </Card>
            </div>
          </aside>
        </div>
      )}
    </MentorPageShell>
  );
}
