'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  CalendarDays,
  MessageCircle,
  ArrowRight,
  LockKeyhole,
  FileText,
  Send,
  X,
} from 'lucide-react';
import MentorPageShell from '../../mentor-page-shell';
import { initialStartups, Btn, Card } from '../../mentor-data';

export default function MentorshipWorkspacePage() {
  const params = useParams();
  const mentorshipId = params?.mentorshipId || 'mentorship-01';

  const [toast, setToast] = useState('');
  const [workspaceTab, setWorkspaceTab] = useState('Overview');
  const [modal, setModal] = useState('');
  const [notes, setNotes] = useState('');
  const [declineReason, setDeclineReason] = useState('');
  const [signoffs, setSignoffs] = useState([
    'Signed off',
    'Signed off',
    'Submitted for sign-off',
    'In progress',
    'Not started',
    'Not started',
  ]);

  const notify = (x) => {
    setToast(x);
    setTimeout(() => setToast(''), 2600);
  };

  const startup =
    initialStartups.find((s) => s.id === mentorshipId) || initialStartups[0];

  return (
    <MentorPageShell
      active="My startups"
      backHref="/mentor/startups"
      backLabel="← My startups"
      toast={toast}
      notify={notify}
    >
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm text-[#4A5568]">
            Mentor workspace <span className="mx-2 text-[#B8955A]">·</span> {startup.name}
          </p>
          <h1 className="serif mt-1 text-[30px] font-semibold text-[#0F1B2D]">
            {startup.name} mentorship
          </h1>
          <p className="mt-1 text-sm text-[#4A5568]">
            {startup.stage} · {startup.status} · Started Oct 21, 2026 · Fortnightly
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href={`/mentor/startups/${startup.id}/startup`}
            className="inline-flex min-h-10 items-center rounded-lg border border-[#E5E1D8] bg-white px-3 text-xs font-semibold text-[#0F1B2D] hover:bg-[#FAF8F4]"
          >
            View startup
          </Link>
          <Btn secondary onClick={() => notify('Session booking opened.')}>
            <CalendarDays size={14} /> Book session
          </Btn>
          <Btn onClick={() => notify('Message sent.')}>
            <MessageCircle size={14} /> Message
          </Btn>
        </div>
      </div>

      {startup.status === 'Paused' && (
        <div className="mb-4 rounded-lg bg-[#F3F4F6] p-3 text-sm text-[#4A5568]">
          This mentorship is paused. Tools remain visible; startup-facing actions are limited.
        </div>
      )}

      {/* Tabs */}
      <div className="mb-5 flex gap-1 overflow-x-auto rounded-xl border border-[#E5E1D8] bg-white p-1">
        {['Overview', 'Plan', 'Sessions', 'Deliverables', 'Readiness', 'Notes', 'Files', 'Messages'].map(
          (x) => (
            <button
              type="button"
              onClick={() => setWorkspaceTab(x)}
              key={x}
              className={`min-h-10 shrink-0 rounded-lg px-3 text-xs font-medium transition-colors ${
                workspaceTab === x ? 'bg-[#0F1B2D] text-white' : 'text-[#4A5568] hover:text-[#0F1B2D]'
              }`}
            >
              {x}
            </button>
          )
        )}
      </div>

      {/* Main workspace layout */}
      <div className="grid items-start gap-5 xl:grid-cols-3">
        <div className="space-y-5 xl:col-span-2">
          <Card title={workspaceTab}>
            {workspaceTab === 'Overview' ? (
              <>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-lg bg-[#F3EBDD] p-4">
                    <p className="text-xs font-medium text-[#806236]">Readiness sign-off</p>
                    <b className="serif mt-1 block text-2xl text-[#806236]">
                      {startup.signed} of 6 items
                    </b>
                    <Link
                      href={`/mentor/startups/${startup.id}/startup`}
                      className="mt-2 inline-block text-xs font-semibold text-[#9A7A45]"
                    >
                      Review shared startup overview <ArrowRight className="inline" size={12} />
                    </Link>
                  </div>
                  <div className="rounded-lg bg-[#FAF8F4] p-4">
                    <p className="text-xs text-[#4A5568]">Next session</p>
                    <b className="mt-1 block text-sm text-[#0F1B2D]">{startup.next}</b>
                    <small className="text-xs text-[#4A5568]">Go-to-market and pricing</small>
                  </div>
                </div>
                <h3 className="mt-5 text-sm font-semibold text-[#0F1B2D]">Plan progress</h3>
                {[
                  ['Validate pricing assumptions', 65, 'Nov 30'],
                  ['Review customer interviews', 80, 'Nov 12'],
                ].map(([x, v, d]) => (
                  <div key={x} className="mt-3">
                    <div className="flex justify-between text-xs">
                      <b className="text-[#0F1B2D]">{x}</b>
                      <span className="text-[#4A5568]">{d}</span>
                    </div>
                    <div className="mt-2 h-1.5 rounded-full bg-[#E5E1D8]">
                      <div
                        className="h-full rounded-full bg-[#B8955A]"
                        style={{ width: `${v}%` }}
                      />
                    </div>
                  </div>
                ))}
                <h3 className="mb-2 mt-5 text-sm font-semibold text-[#0F1B2D]">Recent activity</h3>
                <p className="text-xs text-[#4A5568]">
                  You reviewed customer interview themes · yesterday
                </p>
              </>
            ) : workspaceTab === 'Plan' ? (
              <>
                <p className="text-xs text-[#4A5568]">
                  Cadence: Fortnightly · 45 minutes · Proposed changes need startup acceptance.
                </p>
                {[
                  ['Validate unit economics', 'Nov 30', 'Aarav Kapoor', 'In progress'],
                  ['Prepare investor narrative', 'Dec 15', 'Rhea Mukherjee', 'Not started'],
                ].map(([x, d, o, s]) => (
                  <div key={x} className="mt-3 rounded-lg border border-[#E5E1D8] p-4">
                    <div className="flex justify-between text-sm">
                      <b className="text-[#0F1B2D]">{x}</b>
                      <span className="text-xs text-[#4A5568]">{d}</span>
                    </div>
                    <p className="mt-1 text-xs text-[#4A5568]">
                      Success measure: documented and reviewed · Owner {o}
                    </p>
                    <span className="mt-2 inline-block rounded-full bg-[#F3F4F6] px-2 py-1 text-xs text-[#4A5568]">
                      {s}
                    </span>
                  </div>
                ))}
                <div className="mt-4 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setModal('goal')}
                    className="text-xs font-semibold text-[#9A7A45]"
                  >
                    + Add goal
                  </button>
                  <button
                    type="button"
                    onClick={() => notify('Plan change proposed to startup.')}
                    className="text-xs text-[#4A5568] hover:text-[#0F1B2D]"
                  >
                    Propose change
                  </button>
                </div>
              </>
            ) : workspaceTab === 'Sessions' ? (
              <>
                <p className="mb-3 text-xs text-[#4A5568]">
                  Upcoming and past sessions. Manual entries are labeled.
                </p>
                {[
                  ['Nov 12 · Go-to-market and pricing', 'Scheduled'],
                  ['Oct 28 · Customer interviews', 'Completed'],
                  ['Oct 14 · Prototype feedback', 'Completed'],
                ].map(([x, s]) => (
                  <div
                    key={x}
                    className="flex items-center gap-3 border-b border-[#E5E1D8] py-3 text-xs"
                  >
                    <CalendarDays size={15} className="text-[#9A7A45]" />
                    <span className="flex-1 text-[#0F1B2D]">{x}</span>
                    <span className="text-[#4A5568]">{s}</span>
                    <button
                      type="button"
                      onClick={() => notify('Session details opened.')}
                      className="font-semibold text-[#9A7A45]"
                    >
                      Open
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setModal('log-session')}
                  className="mt-3 text-xs font-semibold text-[#9A7A45]"
                >
                  + Log a past session
                </button>
              </>
            ) : workspaceTab === 'Deliverables' ? (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[580px] text-left text-xs">
                    <thead className="border-b border-[#E5E1D8] text-[#4A5568]">
                      <tr>
                        {['Deliverable', 'Due', 'Owner', 'Status', 'Action'].map((x) => (
                          <th key={x} className="py-3 font-medium">
                            {x}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Interview themes summary', 'Nov 08', 'Aarav Kapoor', 'Submitted'],
                        ['Unit economics review', 'Nov 12', 'Aarav Kapoor', 'In progress'],
                        ['Pitch story outline', 'Nov 15', 'Rhea Mukherjee', 'To do'],
                      ].map((r, i) => (
                        <tr key={r[0]} className="border-b border-[#E5E1D8]">
                          <td className="py-3 font-medium text-[#0F1B2D]">
                            {r[0]}
                            <small className="ml-1 rounded bg-[#F3EBDD] px-1.5 py-0.5 text-[#806236]">
                              Mentor
                            </small>
                          </td>
                          {r.slice(1).map((v, j) => (
                            <td key={j} className="text-[#4A5568]">
                              {v}
                            </td>
                          ))}
                          <td>
                            {i === 0 ? (
                              <span className="flex gap-2">
                                <button
                                  type="button"
                                  onClick={() => notify('Deliverable accepted.')}
                                  className="font-semibold text-[#286749]"
                                >
                                  Accept
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setModal('changes')}
                                  className="text-[#B42318]"
                                >
                                  Request changes
                                </button>
                              </span>
                            ) : (
                              <button
                                type="button"
                                onClick={() => notify('Deliverable opened.')}
                                className="font-semibold text-[#9A7A45]"
                              >
                                Open
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <button
                  type="button"
                  onClick={() => setModal('deliverable')}
                  className="mt-4 text-xs font-semibold text-[#9A7A45]"
                >
                  + Add deliverable
                </button>
              </>
            ) : workspaceTab === 'Readiness' ? (
              <div className="space-y-3">
                {[
                  'Pitch deck reviewed',
                  'Business model validated',
                  'Financial projections defined',
                  'Cap table and legal basics',
                  'Traction metrics documented',
                  'Data room complete',
                ].map((x, i) => (
                  <div
                    key={x}
                    className="flex flex-wrap items-center gap-2 rounded-lg border border-[#E5E1D8] p-3"
                  >
                    <span className="flex-1 text-xs font-medium text-[#0F1B2D]">{x}</span>
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-semibold ${
                        signoffs[i] === 'Signed off'
                          ? 'bg-[#E7F3EC] text-[#286749]'
                          : 'bg-[#FFF3D6] text-[#8A5700]'
                      }`}
                    >
                      {signoffs[i]}
                    </span>
                    {signoffs[i] === 'Submitted for sign-off' && (
                      <>
                        <button
                          type="button"
                          onClick={() =>
                            setSignoffs(signoffs.map((s, n) => (n === i ? 'Signed off' : s)))
                          }
                          className="text-xs font-semibold text-[#286749]"
                        >
                          Sign off
                        </button>
                        <button
                          type="button"
                          onClick={() => setModal('changes')}
                          className="text-xs text-[#B42318]"
                        >
                          Request changes
                        </button>
                      </>
                    )}
                  </div>
                ))}
              </div>
            ) : workspaceTab === 'Notes' ? (
              <>
                <div className="mb-3 rounded-lg bg-[#FFF8E8] p-3 text-xs text-[#806236]">
                  <LockKeyhole className="mr-1 inline" size={13} />
                  Private notes are visible only to you; shared notes are visible to the startup.
                </div>
                <label className="flex items-center gap-2 text-xs text-[#4A5568]">
                  <input aria-label="Toggle option" type="checkbox" className="accent-[#0F1B2D]" />
                  Private notes
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={8}
                  placeholder="Session summary, advice, risks or next steps…"
                  className="mt-3 w-full rounded-lg border border-[#E5E1D8] bg-white p-3 text-sm focus:border-[#0F1B2D] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => notify('Notes saved · just now.')}
                  className="mt-3 text-xs font-semibold text-[#9A7A45]"
                >
                  Save notes
                </button>
              </>
            ) : workspaceTab === 'Files' ? (
              <>
                <p className="text-xs text-[#4A5568]">
                  Only files shared by {startup.name} are visible. Access events are logged.
                </p>
                <div className="mt-3 flex items-center gap-3 rounded-lg border border-[#E5E1D8] p-3">
                  <FileText size={17} className="text-[#9A7A45]" />
                  <span className="flex-1 text-xs text-[#0F1B2D]">
                    Pitch deck v3.pdf{' '}
                    <small className="block text-[#4A5568]">View only · shared Oct 25</small>
                  </span>
                  <button
                    type="button"
                    onClick={() => setModal('preview-doc')}
                    className="text-xs font-semibold text-[#9A7A45]"
                  >
                    View
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => notify('Document request sent to startup.')}
                  className="mt-3 text-xs font-semibold text-[#9A7A45]"
                >
                  Request a document
                </button>
              </>
            ) : (
              <>
                <div className="max-h-60 space-y-3 overflow-y-auto rounded-lg bg-[#FAF8F4] p-4 text-xs">
                  <p>
                    <b className="text-[#0F1B2D]">You</b> · Please share the latest customer
                    interview themes before our session.
                  </p>
                  <p className="text-right">
                    <b className="text-[#0F1B2D]">Aarav</b> · I’ll upload them this afternoon.
                  </p>
                </div>
                <div className="mt-3 flex gap-2">
                  <input
                    aria-label="Write a secure message…"
                    placeholder="Write a secure message…"
                    className="h-10 flex-1 rounded-lg border border-[#E5E1D8] px-3 text-xs focus:border-[#0F1B2D] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => notify('Message sent.')}
                    className="grid h-10 w-10 place-items-center rounded-lg bg-[#0F1B2D] text-white hover:bg-[#1C2B42]"
                  >
                    <Send size={14} />
                  </button>
                </div>
              </>
            )}
          </Card>
        </div>

        {/* Aside Column */}
        <aside className="space-y-5">
          <Card title="Startup snapshot">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-[#F3EBDD] font-semibold text-[#806236]">
                {startup.logo}
              </span>
              <div>
                <b className="text-sm text-[#0F1B2D]">{startup.name}</b>
                <p className="text-xs text-[#4A5568]">Shared by {startup.name}</p>
              </div>
            </div>
            <p className="mt-3 text-xs text-[#4A5568]">
              {startup.stage} · {startup.sector} · Team {startup.team}
            </p>
            <p className="mt-2 text-xs text-[#0F1B2D]">Readiness {startup.score}/100</p>
            <p className="mt-2 rounded-lg bg-[#FAF8F4] p-2 text-xs text-[#4A5568]">
              Traction: {startup.traction}
            </p>
          </Card>

          <Card title="Next steps">
            <p className="text-xs text-[#0F1B2D]">Next session · {startup.next}</p>
            <p className="mt-3 text-xs text-[#4A5568]">2 open deliverables</p>
            <p className="mt-3 text-xs text-[#4A5568]">1 readiness item awaiting your review</p>
          </Card>

          <Card title="Mentorship terms">
            <p className="text-xs text-[#0F1B2D]">Fortnightly · 45 minutes</p>
            <p className="mt-1 text-xs text-[#4A5568]">₹3,000 per session · No equity requested</p>
            <Link
              href="/mentor/agreements"
              className="mt-3 inline-block text-xs font-semibold text-[#9A7A45]"
            >
              View agreement
            </Link>
          </Card>
        </aside>
      </div>

      {/* Workspace Modals */}
      {modal && (
        <div className="fixed inset-0 z-40 grid place-items-center bg-[#0F1B2D]/45 p-4">
          <section
            role="dialog"
            aria-modal="true"
            className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"
          >
            <div className="mb-5 flex items-center justify-between">
              <h2 className="serif text-2xl font-semibold text-[#0F1B2D]">
                {modal === 'preview-doc'
                  ? 'Document preview: Financial Model & Projections'
                  : modal === 'goal'
                  ? 'Add a mentorship goal'
                  : modal === 'deliverable'
                  ? 'Add deliverable'
                  : modal === 'changes'
                  ? 'Request changes'
                  : modal === 'log-session'
                  ? 'Log a session'
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

            {modal === 'preview-doc' ? (
              <div className="space-y-4">
                <div className="rounded-lg border border-[#E5E1D8] bg-[#FAF8F4] p-4 text-xs font-mono">
                  <div className="flex justify-between border-b border-[#E5E1D8] pb-2 text-[#4A5568]">
                    <span>Document: Acme-Financials-v3.pdf</span>
                    <span className="text-[#286749]">Confidential · Watermarked</span>
                  </div>
                  <div className="space-y-2 pt-3 text-[#0F1B2D]">
                    <p>• 2026-2027 Projections: ₹4.8L MRR growing at 18% MoM</p>
                    <p>• Gross Margins: 78% · Customer Acquisition Cost: ₹1,200</p>
                    <p>• Advisory Share Model: 0.25% equity with 2-year vesting</p>
                    <p>• Cash Runway: 14 months at current burn rate</p>
                  </div>
                </div>
                <p className="text-xs text-[#4A5568]">
                  Watermark: Rhea Mukherjee · Access timestamp logged to audit ledger.
                </p>
              </div>
            ) : modal === 'changes' ? (
              <>
                <label className="block text-sm font-medium text-[#0F1B2D]">
                  What needs to change?
                  <select
                    value={declineReason}
                    onChange={(e) => setDeclineReason(e.target.value)}
                    className="mt-2 h-11 w-full rounded-lg border border-[#E5E1D8] bg-white px-3 focus:outline-none"
                  >
                    <option value="">Choose a reason</option>
                    {[
                      'Insufficient evidence',
                      'Methodology needs refinement',
                      'Scope unclear',
                      'Other',
                    ].map((x) => (
                      <option key={x}>{x}</option>
                    ))}
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
            ) : (
              <div className="space-y-3">
                <label className="block text-sm font-medium text-[#0F1B2D]">
                  Title
                  <input
                    aria-label="Title"
                    placeholder="Title"
                    className="mt-2 h-10 w-full rounded-lg border border-[#E5E1D8] px-3 focus:outline-none"
                  />
                </label>
                <label className="block text-sm font-medium text-[#0F1B2D]">
                  Description
                  <textarea
                    rows={3}
                    placeholder="Describe the goal or expected output"
                    className="mt-2 w-full rounded-lg border border-[#E5E1D8] p-3 text-sm focus:outline-none"
                  />
                </label>
                <label className="block text-sm font-medium text-[#0F1B2D]">
                  Due date
                  <input
                    aria-label="Select date"
                    type="date"
                    className="mt-2 h-10 w-full rounded-lg border border-[#E5E1D8] px-3 focus:outline-none"
                  />
                </label>
                {modal === 'log-session' && (
                  <label className="block text-sm font-medium text-[#0F1B2D]">
                    Session notes
                    <textarea
                      rows={3}
                      placeholder="Summary and actions"
                      className="mt-2 w-full rounded-lg border border-[#E5E1D8] p-3 text-sm focus:outline-none"
                    />
                  </label>
                )}
              </div>
            )}

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
                  if (modal === 'changes' && !declineReason) {
                    notify('Choose a reason before continuing.');
                    return;
                  }
                  if (modal === 'changes') {
                    notify('Change request sent with your note.');
                  } else {
                    notify('Saved.');
                  }
                  setModal('');
                  setDeclineReason('');
                }}
                className="min-h-10 rounded-lg bg-[#0F1B2D] px-4 text-sm font-semibold text-white hover:bg-[#1C2B42]"
              >
                {modal === 'changes' ? 'Send request' : 'Save'}
              </button>
            </div>
          </section>
        </div>
      )}
    </MentorPageShell>
  );
}
