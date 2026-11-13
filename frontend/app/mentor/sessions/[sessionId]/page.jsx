'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  Video,
  FileText,
  LockKeyhole,
  CheckCircle2,
  ArrowRight,
  X,
} from 'lucide-react';
import MentorPageShell from '../../mentor-page-shell';
import { initialSessions, Btn, Card } from '../../mentor-data';

export default function MentorSessionDetailPage() {
  const params = useParams();
  const sessionId = params?.sessionId || 'sess-001';

  const [toast, setToast] = useState('');
  const [meetingTab, setMeetingTab] = useState('Agenda');
  const [isPrivate, setIsPrivate] = useState(false);
  const [sharedNotes, setSharedNotes] = useState('');
  const [privateNotes, setPrivateNotes] = useState('');
  const [summary, setSummary] = useState('');
  const [saved, setSaved] = useState(false);
  const [schedule, setSchedule] = useState(false);

  const notify = (s) => {
    setToast(s);
    setTimeout(() => setToast(''), 2700);
  };

  const current =
    initialSessions.find((s) => s.id === sessionId) || initialSessions[0];

  const handleJoin = (sess) => {
    if (sess.status === 'Completed') {
      notify('Session completed on ' + sess.date + '. Review the session summary below.');
    } else if (sess.status === 'Needs summary') {
      notify('Session concluded. Please add the session summary and sign off deliverables.');
    } else {
      notify('Meeting room for ' + sess.startup + ' opens 10 minutes prior to scheduled start.');
    }
  };

  return (
    <MentorPageShell
      active="Sessions"
      backHref="/mentor/sessions"
      backLabel="← Sessions"
      toast={toast}
      notify={notify}
    >
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm text-[#4A5568]">
            Mentor workspace <span className="mx-2 text-[#B8955A]">·</span> Sessions & sign-off
          </p>
          <h1 className="serif mt-1 text-[30px] font-semibold text-[#0F1B2D]">
            {current.topic}
          </h1>
          <p className="mt-1 text-sm text-[#4A5568]">
            {current.startup} · {current.date} · {current.time} · {current.duration} · {current.type}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/mentor/sessions"
            className="inline-flex min-h-10 items-center rounded-lg border border-[#E5E1D8] bg-white px-3 text-xs font-semibold text-[#0F1B2D] hover:bg-[#FAF8F4]"
          >
            ← Sessions
          </Link>
          <Btn secondary onClick={() => handleJoin(current)}>
            <Video size={15} /> Join session
          </Btn>
          <Btn onClick={() => setMeetingTab('Summary and feedback')}>
            <FileText size={15} /> Add summary
          </Btn>
        </div>
      </div>

      <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
        {['Agenda', 'Notes', 'Files', 'Recording', 'Summary and feedback'].map((x) => (
          <button
            type="button"
            key={x}
            onClick={() => setMeetingTab(x)}
            className={`min-h-10 shrink-0 rounded-lg px-3 text-xs font-medium transition-colors ${
              meetingTab === x
                ? 'bg-[#0F1B2D] text-white'
                : 'border border-[#E5E1D8] bg-white text-[#4A5568] hover:bg-[#FAF8F4]'
            }`}
          >
            {x}
          </button>
        ))}
      </div>

      <div className="grid items-start gap-5 xl:grid-cols-3">
        <div className="min-w-0 space-y-5 xl:col-span-2">
          <Card title={meetingTab}>
            {meetingTab === 'Agenda' ? (
              <>
                <p className="text-xs text-[#4A5568]">Shared agenda · recording is off.</p>
                {['Review customer interview insights', 'Discuss pricing experiments', 'Agree next steps and owners'].map(
                  (x, i) => (
                    <label
                      key={x}
                      className="mt-3 flex items-center gap-3 rounded-lg bg-[#FAF8F4] p-3 text-sm text-[#0F1B2D]"
                    >
                      <input aria-label="Toggle option" type="checkbox" className="accent-[#0F1B2D]" />
                      {x}
                      <span className="ml-auto text-xs text-[#4A5568]">{i + 1}</span>
                    </label>
                  )
                )}
                <button
                  type="button"
                  onClick={() => notify('Agenda item added.')}
                  className="mt-3 text-xs font-semibold text-[#9A7A45]"
                >
                  + Add agenda item
                </button>
                <div className="mt-5 rounded-lg border border-[#E5E1D8] p-4">
                  <h3 className="text-xs font-semibold text-[#0F1B2D]">Prep for you · mentor-only</h3>
                  <p className="mt-2 text-xs text-[#4A5568]">
                    Last summary: customer interviews show strongest demand in small service businesses.
                  </p>
                  <p className="mt-2 text-xs text-[#4A5568]">
                    Open deliverables: interview summary · Pending sign-offs: 2
                  </p>
                  <p className="mt-2 text-xs text-[#4A5568]">Shared files: Pitch deck v3.pdf</p>
                </div>
              </>
            ) : meetingTab === 'Notes' ? (
              <>
                <div className="mb-3 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsPrivate(false)}
                    className={`rounded-lg px-3 py-2 text-xs font-medium ${
                      !isPrivate
                        ? 'bg-[#0F1B2D] text-white'
                        : 'border border-[#E5E1D8] text-[#4A5568] hover:bg-[#FAF8F4]'
                    }`}
                  >
                    Shared notes
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsPrivate(true)}
                    className={`rounded-lg px-3 py-2 text-xs font-medium ${
                      isPrivate
                        ? 'bg-[#0F1B2D] text-white'
                        : 'border border-[#E5E1D8] text-[#4A5568] hover:bg-[#FAF8F4]'
                    }`}
                  >
                    <LockKeyhole className="mr-1 inline" size={12} />
                    Private notes
                  </button>
                </div>
                <textarea
                  value={isPrivate ? privateNotes : sharedNotes}
                  onChange={(e) =>
                    isPrivate ? setPrivateNotes(e.target.value) : setSharedNotes(e.target.value)
                  }
                  rows={8}
                  placeholder={
                    isPrivate
                      ? 'Private notes · visible only to you'
                      : 'Collaborative notes visible to the startup'
                  }
                  className="w-full rounded-lg border border-[#E5E1D8] bg-white p-3 text-sm focus:border-[#0F1B2D] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => {
                    setSaved(true);
                    notify(isPrivate ? 'Private note saved.' : 'Shared notes saved · just now.');
                  }}
                  className="mt-3 text-xs font-semibold text-[#9A7A45]"
                >
                  {saved ? 'Saved · just now' : 'Save notes'}
                </button>
                <div className="mt-5 rounded-lg border border-[#E5E1D8] p-4">
                  <h3 className="text-sm font-semibold text-[#0F1B2D]">Action items</h3>
                  {[
                    ['Aarav', 'Upload revised pricing assumptions', 'Nov 15'],
                    ['Rhea', 'Send competitor pricing examples', 'Nov 14'],
                  ].map(([o, n, d]) => (
                    <div key={n} className="mt-3 flex items-center gap-2 text-xs">
                      <CheckCircle2 size={14} className="text-[#9A7A45]" />
                      <span className="flex-1 text-[#0F1B2D]">{n}</span>
                      <small className="text-[#4A5568]">
                        {o} · {d}
                      </small>
                      <button
                        type="button"
                        onClick={() => notify('Task created with a Mentor label.')}
                        className="font-semibold text-[#9A7A45]"
                      >
                        Create task
                      </button>
                    </div>
                  ))}
                </div>
              </>
            ) : meetingTab === 'Files' ? (
              <div className="rounded-lg border border-[#E5E1D8] p-4">
                <p className="text-xs text-[#4A5568]">Shared by Acme Studio · view-only</p>
                <p className="mt-3 text-sm text-[#0F1B2D]">
                  <FileText className="mr-2 inline text-[#9A7A45]" size={16} />
                  Pitch deck v3.pdf
                </p>
                <button
                  type="button"
                  onClick={() => notify('Document request sent to startup.')}
                  className="mt-3 text-xs font-semibold text-[#9A7A45]"
                >
                  Request a document
                </button>
              </div>
            ) : meetingTab === 'Recording' ? (
              <div className="rounded-lg bg-[#FAF8F4] p-5 text-sm text-[#4A5568]">
                Recording was off. No recording is stored. Recording requires consent from both
                sides before a session begins.
              </div>
            ) : (
              <>
                <div className="mb-4 rounded-lg bg-[#FFF8E8] p-3 text-xs text-[#806236]">
                  Complete a short summary within 24 hours. The startup sees the decisions and action
                  items you share.
                </div>
                <label className="block text-sm font-medium text-[#0F1B2D]">
                  What we covered (required, 20–1,000 characters)
                  <textarea
                    minLength={20}
                    maxLength={1000}
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    rows={5}
                    placeholder="Summarize the key topics and discussion…"
                    className="mt-2 w-full rounded-lg border border-[#E5E1D8] p-3 text-sm focus:outline-none"
                  />
                </label>
                <label className="mt-4 block text-sm font-medium text-[#0F1B2D]">
                  Key decisions or advice
                  <textarea
                    rows={3}
                    placeholder="Optional"
                    className="mt-2 w-full rounded-lg border border-[#E5E1D8] p-3 text-sm focus:outline-none"
                  />
                </label>
                <fieldset className="mt-4">
                  <legend className="text-sm font-medium text-[#0F1B2D]">
                    Progress since last session
                  </legend>
                  <div className="mt-2 flex gap-2">
                    {['Behind', 'On track', 'Ahead'].map((x) => (
                      <label
                        key={x}
                        className="rounded-lg border border-[#E5E1D8] px-3 py-2 text-xs font-medium text-[#0F1B2D]"
                      >
                        <input
                          aria-label="Select option"
                          type="radio"
                          name="progress"
                          className="mr-2 accent-[#0F1B2D]"
                        />
                        {x}
                      </label>
                    ))}
                  </div>
                </fieldset>
                <label className="mt-4 flex items-center gap-2 text-xs text-[#4A5568]">
                  <input
                    aria-label="Toggle option"
                    type="checkbox"
                    defaultChecked
                    className="accent-[#0F1B2D]"
                  />
                  Share summary with startup
                </label>
                <div className="mt-5 flex justify-end gap-2">
                  <Btn
                    secondary
                    onClick={() => {
                      setSaved(true);
                      notify('Summary draft saved.');
                    }}
                  >
                    Save draft
                  </Btn>
                  <button
                    type="button"
                    disabled={summary.trim().length < 20}
                    onClick={() => {
                      notify('Summary submitted. Session marked completed; startup notified.');
                      setSaved(true);
                    }}
                    className="min-h-10 rounded-lg bg-[#0F1B2D] px-4 text-sm font-semibold text-white disabled:opacity-45 hover:bg-[#1C2B42]"
                  >
                    Submit summary
                  </button>
                </div>
              </>
            )}
          </Card>
        </div>

        <aside className="space-y-5">
          <Card title="Session information">
            <p className="text-xs text-[#0F1B2D]">
              {current.date} · {current.time}
            </p>
            <p className="mt-2 text-xs text-[#4A5568]">
              {current.duration} · {current.type}
            </p>
            <p className="mt-2 text-xs text-[#0F1B2D]">
              Fee: {current.fee} · Payment confirmed
            </p>
            <p className="mt-3 text-xs text-[#4A5568]">Attendees: {current.attendees}</p>
          </Card>

          <Card title="Startup snapshot">
            <p className="text-sm font-semibold text-[#0F1B2D]">Acme Studio</p>
            <p className="mt-1 text-xs text-[#4A5568]">Prototype · readiness 72/100</p>
            <p className="mt-2 text-xs text-[#0F1B2D]">4 of 6 items signed off</p>
            <Link
              href="/mentor/startups/mentorship-01/startup"
              className="mt-3 inline-block text-xs font-semibold text-[#9A7A45]"
            >
              View shared overview <ArrowRight className="inline" size={12} />
            </Link>
          </Card>

          <Card title="Readiness items discussed">
            <div className="space-y-2">
              {['Business model and unit economics', 'Traction metrics documented'].map((x) => (
                <label key={x} className="flex items-center gap-2 text-xs text-[#0F1B2D]">
                  <input aria-label="Toggle option" type="checkbox" className="accent-[#0F1B2D]" />
                  {x}
                </label>
              ))}
            </div>
            <Link
              href="/mentor/startups/mentorship-01/readiness"
              className="mt-3 inline-block text-xs font-semibold text-[#9A7A45]"
            >
              Review sign-offs <ArrowRight className="inline" size={12} />
            </Link>
          </Card>

          <Card title="Next session">
            <p className="text-xs text-[#4A5568]">Suggest a follow-up after this session.</p>
            <button
              type="button"
              onClick={() => setSchedule(true)}
              className="mt-3 text-xs font-semibold text-[#9A7A45]"
            >
              Book follow-up
            </button>
          </Card>
        </aside>
      </div>

      {/* Book Follow-up Modal */}
      {schedule && (
        <div className="fixed inset-0 z-40 grid place-items-center bg-[#0F1B2D]/45 p-4">
          <section
            role="dialog"
            aria-modal="true"
            className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"
          >
            <div className="mb-5 flex items-center justify-between">
              <h2 className="serif text-2xl font-semibold text-[#0F1B2D]">
                Book follow-up session
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
              <p className="text-xs text-[#4A5568]">Startup: {current.startup}</p>
              <label className="block text-sm font-medium text-[#0F1B2D]">
                Session topic
                <input
                  aria-label="Session topic"
                  placeholder="Session topic"
                  defaultValue={`Follow-up on ${current.topic}`}
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
                  Duration
                  <select className="mt-2 h-10 w-full rounded-lg border border-[#E5E1D8] bg-white px-3 focus:outline-none">
                    <option>45 minutes</option>
                    <option>30 minutes</option>
                    <option>60 minutes</option>
                  </select>
                </label>
              </div>
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
                  notify('Follow-up session proposed to startup.');
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
