'use client';
import { useState } from 'react';
import Link from 'next/link';
import { CalendarDays, Plus, X, Calendar } from 'lucide-react';
import { InvestorShell, Card, Button } from '@/components';
import { InvestorDisclaimer } from '../investor-data';

export default function InvestorMeetingsPage() {
  const [meetingTab, setMeetingTab] = useState('Upcoming');
  const [modal, setModal] = useState('');

  return (
    <InvestorShell
      active="Meetings"
      module="Deal flow"
      title="Pitch meetings & calls"
      description="Schedule, prepare and record decisions for founder pitch discussions."
      actions={
        <Button onClick={() => setModal('schedule')}>
          <Plus size={14} /> Schedule meeting
        </Button>
      }
    >
      {({ notify }) => (
        <>
          {/* Stat Strip */}
          <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {[
              ['Meetings this week', '3'],
              ['Requests waiting', '2'],
              ['Meetings without notes', '1'],
              ['Avg. days to decision', '18'],
            ].map(([x, y]) => (
              <div key={x} className="rounded-xl border border-[#E5E1D8] bg-white p-5">
                <span className="text-xs font-medium text-[#4A5568]">{x}</span>
                <span className="serif mt-1 block text-3xl font-semibold text-ink">{y}</span>
              </div>
            ))}
          </div>

          {/* Sub Navigation Tabs */}
          <div className="mb-6 flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {['Upcoming', 'Requests', 'Needs notes', 'Past', 'Calendar'].map((x) => (
              <button
                key={x}
                type="button"
                onClick={() => setMeetingTab(x)}
                className={`min-h-10 shrink-0 rounded-lg px-4 text-xs font-semibold transition ${
                  meetingTab === x
                    ? 'bg-ink text-white'
                    : 'border border-[#E5E1D8] bg-white text-[#4A5568] hover:bg-[#FAF8F4] hover:text-ink'
                }`}
              >
                {x}
              </button>
            ))}
          </div>

          {meetingTab === 'Upcoming' && (
            <div className="space-y-4">
              {[
                ['Thu, Nov 12 · 4:00 PM IST', 'Acme Studio', 'Intro call · 45 min · Confirmed', 'acme'],
                ['Mon, Nov 16 · 11:00 AM IST', 'OrbitPay', 'Seed pitch & traction · 30 min · Scheduled', 'orbitpay'],
              ].map(([date, name, details, id]) => (
                <Card
                  key={name}
                  title={name}
                  action={
                    <span className="rounded-full bg-[#E7F3EC] px-2.5 py-0.5 text-xs font-semibold text-[#286749]">
                      Confirmed
                    </span>
                  }
                >
                  <p className="text-xs font-semibold text-ink">{date}</p>
                  <p className="mt-1 text-xs text-[#4A5568]">{details}</p>
                  <p className="mt-2 text-xs text-ink">
                    Agenda: Founder pitch · Q3 Traction Review · Cap table questions
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-[#E5E1D8] pt-3">
                    <Link
                      href={`/investor/startups/${id}`}
                      className="rounded-lg border border-[#E5E1D8] bg-white px-3 py-1.5 text-xs font-semibold text-ink hover:bg-[#FAF8F4]"
                    >
                      Prepare profile & deck
                    </Link>
                    <button
                      type="button"
                      onClick={() => notify('Calendar invite (.ics) downloaded.')}
                      className="rounded-lg border border-[#E5E1D8] bg-white px-3 py-1.5 text-xs font-medium text-ink hover:bg-[#FAF8F4]"
                    >
                      Add to calendar
                    </button>
                    <button
                      type="button"
                      onClick={() => notify('Meeting join room opens 10 minutes prior to session.')}
                      className="rounded-lg bg-ink px-4 py-1.5 text-xs font-semibold text-white hover:bg-[#1C2B42]"
                    >
                      Join video room
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {meetingTab === 'Requests' && (
            <Card title="Incoming meeting invitations">
              <div className="flex items-center justify-between border-b border-[#E5E1D8] pb-3">
                <div>
                  <b className="block text-xs font-semibold text-ink">GreenLedger · Intro Call</b>
                  <span className="text-xs text-[#4A5568]">Proposed for Nov 15 at 2:00 PM IST (30 min)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button onClick={() => notify('Meeting confirmed with GreenLedger founder.')}>
                    Accept
                  </Button>
                  <Button secondary onClick={() => setModal('schedule')}>
                    Propose another time
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {meetingTab === 'Needs notes' && (
            <Card title="Completed meetings awaiting debrief notes">
              <div className="flex items-center justify-between border-b border-[#E5E1D8] pb-3">
                <div>
                  <b className="block text-xs font-semibold text-ink">OrbitPay · Pitch call</b>
                  <span className="text-xs text-[#4A5568]">Held yesterday · Action item: add scorecard notes</span>
                </div>
                <Link
                  href="/investor/startups/orbitpay/diligence"
                  className="text-xs font-semibold text-[#9A7A45] hover:underline"
                >
                  Add diligence notes →
                </Link>
              </div>
            </Card>
          )}

          {meetingTab === 'Past' && (
            <Card title="Past meetings archive">
              <p className="text-xs text-ink">Nov 02 · Acme Studio · Partner intro call · Positive outcome</p>
            </Card>
          )}

          {meetingTab === 'Calendar' && (
            <Card title="Monthly meeting calendar · November 2026">
              <div className="grid grid-cols-7 gap-1 text-center text-xs">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                  <span key={d} className="font-semibold text-[#4A5568] p-2">
                    {d}
                  </span>
                ))}
                {Array.from({ length: 30 }, (_, i) => String(i + 1)).map((day) => (
                  <div
                    key={day}
                    className={`rounded-lg p-3 border border-[#E5E1D8] ${
                      day === '12' || day === '16'
                        ? 'bg-[#F3EBDD] font-bold text-ink border-[#B8955A]'
                        : 'bg-white text-[#4A5568]'
                    }`}
                  >
                    {day}
                    {(day === '12' || day === '16') && (
                      <span className="block mt-1 text-[10px] text-[#806236]">Pitch</span>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          )}

          <InvestorDisclaimer onLearnMore={() => notify('Platform disclaimer opened.')} />

          {/* Schedule Meeting Modal */}
          {modal === 'schedule' && (
            <div className="fixed inset-0 z-50 grid place-items-center bg-ink/50 p-4 backdrop-blur-sm">
              <section
                role="dialog"
                aria-modal="true"
                className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
              >
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="serif text-xl font-bold text-ink">Schedule pitch meeting</h2>
                  <button type="button" onClick={() => setModal('')}>
                    <X size={18} />
                  </button>
                </div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    notify('Meeting invitation sent to founder.');
                    setModal('');
                  }}
                  className="space-y-3"
                >
                  <div>
                    <label htmlFor="sched-startup" className="block text-xs font-medium text-ink">
                      Startup
                    </label>
                    <select
                      id="sched-startup"
                      className="mt-1 h-10 w-full rounded-lg border border-[#E5E1D8] bg-white px-3 text-xs focus:border-ink focus:outline-none"
                    >
                      <option>Acme Studio</option>
                      <option>GreenLedger</option>
                      <option>OrbitPay</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="sched-type" className="block text-xs font-medium text-ink">
                      Meeting type
                    </label>
                    <select
                      id="sched-type"
                      className="mt-1 h-10 w-full rounded-lg border border-[#E5E1D8] bg-white px-3 text-xs focus:border-ink focus:outline-none"
                    >
                      <option>Introductory screening (30 min)</option>
                      <option>Full partner pitch (45 min)</option>
                      <option>Technical / diligence deep dive (60 min)</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="sched-time" className="block text-xs font-medium text-ink">
                      Proposed time (IST)
                    </label>
                    <input
                      id="sched-time"
                      type="datetime-local"
                      required
                      className="mt-1 h-10 w-full rounded-lg border border-[#E5E1D8] px-3 text-xs focus:border-ink focus:outline-none"
                    />
                  </div>
                  <div className="flex justify-end gap-2 pt-3">
                    <button
                      type="button"
                      onClick={() => setModal('')}
                      className="rounded-lg border px-3 py-2 text-xs font-medium text-[#4A5568]"
                    >
                      Cancel
                    </button>
                    <Button type="submit">Send invitation</Button>
                  </div>
                </form>
              </section>
            </div>
          )}
        </>
      )}
    </InvestorShell>
  );
}
