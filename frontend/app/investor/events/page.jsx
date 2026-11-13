'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Ticket, Calendar, Search, X } from 'lucide-react';
import { InvestorShell, Card, Button } from '@/components';
import { events, InvestorDisclaimer } from '../investor-data';

export default function InvestorEventsPage() {
  const [eventTab, setEventTab] = useState('Upcoming');
  const [query, setQuery] = useState('');
  const [format, setFormat] = useState('All formats');
  const [sector, setSector] = useState('All sectors');
  const [registered, setRegistered] = useState([]);
  const [modal, setModal] = useState('');
  const [activeEvent, setActiveEvent] = useState(null);

  const filteredEvents = events.filter(
    (e) =>
      (!query || e.name.toLowerCase().includes(query.toLowerCase())) &&
      (format === 'All formats' || e.format.includes(format)) &&
      (sector === 'All sectors' || e.focus.includes(sector))
  );

  return (
    <InvestorShell
      active="Events"
      module="Deal flow"
      title="Investor events & demo days"
      description="Connect directly with curated founder cohorts and co-investors at exclusive showcases."
      actions={
        <Button secondary onClick={() => {}}>
          Notify me about events
        </Button>
      }
    >
      {({ notify }) => (
        <>
          {/* Sub Navigation Tabs */}
          <div className="mb-6 flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {['Upcoming', 'My registrations', 'Invitations', 'Past'].map((x) => (
              <button
                key={x}
                type="button"
                onClick={() => setEventTab(x)}
                className={`min-h-10 shrink-0 rounded-lg px-4 text-xs font-semibold transition ${
                  eventTab === x
                    ? 'bg-ink text-white'
                    : 'border border-[#E5E1D8] bg-white text-[#4A5568] hover:bg-[#FAF8F4] hover:text-ink'
                }`}
              >
                {x}
                {x === 'My registrations' && registered.length > 0 && (
                  <span className="ml-2 rounded-full bg-[#B8955A] px-2 py-0.5 text-xs font-bold text-ink">
                    {registered.length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Filter Bar */}
          <div className="mb-6 flex flex-wrap gap-3">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search event topics, hosts..."
              className="h-10 w-64 rounded-lg border border-[#E5E1D8] bg-white px-3 text-xs focus:border-ink focus:outline-none"
            />
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className="h-10 rounded-lg border border-[#E5E1D8] bg-white px-3 text-xs focus:border-ink focus:outline-none"
            >
              <option>All formats</option>
              <option>Hybrid</option>
              <option>Online</option>
              <option>In person</option>
            </select>
            <select
              value={sector}
              onChange={(e) => setSector(e.target.value)}
              className="h-10 rounded-lg border border-[#E5E1D8] bg-white px-3 text-xs focus:border-ink focus:outline-none"
            >
              <option>All sectors</option>
              <option>Fintech</option>
              <option>Climate</option>
              <option>B2B SaaS</option>
            </select>
          </div>

          {eventTab === 'Upcoming' && (
            <div className="space-y-6">
              {/* Featured Showcase Card */}
              <Card title="Featured event · Priority Access">
                <div className="mb-4 h-24 rounded-xl bg-ink p-4 text-white relative overflow-hidden flex flex-col justify-between">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-[#B8955A]" />
                  <span className="self-start rounded-full bg-[#F3EBDD] px-2.5 py-0.5 text-xs font-semibold text-[#806236]">
                    Priority registration open
                  </span>
                  <p className="text-xs text-white/80">Matches your thesis: Fintech, Pre-seed, Seed</p>
                </div>
                <h3 className="serif text-xl font-bold text-ink">Fintech Founder Demo Day</h3>
                <p className="mt-1 text-xs text-[#4A5568]">
                  Dec 03, 2026 · 10:00 AM IST · Hybrid (Mumbai & Online stream)
                </p>
                <p className="mt-2 text-xs font-medium text-ink">
                  Forma + Fintech Founders Network · 12 startups presenting · 42 verified investors attending
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-[#E5E1D8] pt-3">
                  <Link
                    href="/investor/events/fintech-demo-day"
                    className="rounded-lg border border-[#E5E1D8] bg-white px-4 py-2 text-xs font-semibold text-ink hover:bg-[#FAF8F4]"
                  >
                    View agenda & founders
                  </Link>
                  <Button
                    onClick={() => {
                      setActiveEvent(events[0]);
                      setModal('register');
                    }}
                  >
                    {registered.includes('Fintech Founder Demo Day') ? 'Registered ✓' : 'Register for event'}
                  </Button>
                </div>
              </Card>

              {/* Grid of Other Showcases */}
              <div className="grid gap-6 md:grid-cols-2">
                {filteredEvents.slice(1).map((e) => (
                  <Card key={e.id} title={e.name}>
                    <p className="text-xs text-[#4A5568]">{e.date} · {e.format}</p>
                    <p className="mt-1.5 text-xs font-medium text-ink">{e.host} · {e.focus}</p>
                    <div className="mt-3 flex items-center justify-between border-t border-[#E5E1D8] pt-3">
                      <span className="rounded-full bg-[#F3EBDD] px-2.5 py-0.5 text-xs font-semibold text-[#806236]">
                        {e.access}
                      </span>
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/investor/events/${e.id}`}
                          className="text-xs font-semibold text-[#9A7A45] hover:underline"
                        >
                          View →
                        </Link>
                        <button
                          type="button"
                          onClick={() => {
                            setActiveEvent(e);
                            setModal('register');
                          }}
                          className="rounded-lg bg-ink px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#1C2B42]"
                        >
                          Register
                        </button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {eventTab === 'My registrations' && (
            <Card title="Your confirmed event seats">
              {registered.length > 0 ? (
                <div className="space-y-3 text-xs">
                  {registered.map((item) => (
                    <div key={item} className="flex items-center justify-between border-b border-[#E5E1D8] pb-3">
                      <b className="text-ink">{item}</b>
                      <button
                        type="button"
                        onClick={() => {
                          setRegistered(registered.filter((x) => x !== item));
                          notify(`Cancelled registration for ${item}.`);
                        }}
                        className="text-xs font-medium text-red-600 hover:underline"
                      >
                        Cancel registration
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-[#4A5568]">No upcoming registrations. Browse Upcoming events to reserve your seat.</p>
              )}
            </Card>
          )}

          {eventTab === 'Invitations' && (
            <Card title="Private VIP invitations">
              <p className="text-xs text-[#4A5568]">No pending private invitations at this time.</p>
            </Card>
          )}

          {eventTab === 'Past' && (
            <Card title="Past event archives">
              <p className="text-xs text-[#4A5568]">Past demo days and session recordings will be accessible here.</p>
            </Card>
          )}

          <InvestorDisclaimer onLearnMore={() => notify('Platform disclaimer opened.')} />

          {/* Registration Modal */}
          {modal === 'register' && activeEvent && (
            <div className="fixed inset-0 z-50 grid place-items-center bg-ink/50 p-4 backdrop-blur-sm">
              <section
                role="dialog"
                aria-modal="true"
                className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
              >
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="serif text-xl font-bold text-ink">Confirm registration</h2>
                  <button type="button" onClick={() => setModal('')}>
                    <X size={18} />
                  </button>
                </div>
                <p className="text-xs text-[#4A5568]">
                  Event: <b className="text-ink">{activeEvent.name}</b>
                </p>
                <p className="text-xs text-[#4A5568] mt-1">{activeEvent.date}</p>
                <div className="mt-4 space-y-3 text-xs">
                  <div>
                    <label htmlFor="reg-type" className="block font-medium text-ink">
                      Attendance mode
                    </label>
                    <select
                      id="reg-type"
                      className="mt-1 h-10 w-full rounded-lg border border-[#E5E1D8] bg-white px-3 text-xs focus:border-ink focus:outline-none"
                    >
                      <option>General attendee & networking</option>
                      <option>Pitch feedback panelist</option>
                      <option>Private founder roundtable</option>
                    </select>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="accent-ink" />
                    <span>Display my name & fund on attendee directory</span>
                  </label>
                </div>
                <div className="mt-6 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setModal('')}
                    className="rounded-lg border px-3 py-2 text-xs font-medium text-[#4A5568]"
                  >
                    Cancel
                  </button>
                  <Button
                    onClick={() => {
                      if (!registered.includes(activeEvent.name)) {
                        setRegistered([...registered, activeEvent.name]);
                      }
                      notify(`Seat confirmed for ${activeEvent.name}! Check your email for calendar invite.`);
                      setModal('');
                    }}
                  >
                    Confirm seat
                  </Button>
                </div>
              </section>
            </div>
          )}
        </>
      )}
    </InvestorShell>
  );
}
