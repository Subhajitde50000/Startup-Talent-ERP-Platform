'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  CalendarDays,
  X,
} from 'lucide-react';
import MentorPageShell from '../mentor-page-shell';
import { initialEvents, Card } from '../mentor-data';

export default function MentorEventsPage() {
  const [toast, setToast] = useState('');
  const [eventTab, setEventTab] = useState('Upcoming');
  const [modal, setModal] = useState('');
  const [registration, setRegistration] = useState({});

  const notify = (x) => {
    setToast(x);
    setTimeout(() => setToast(''), 2700);
  };

  const featured = initialEvents[0];

  return (
    <MentorPageShell active="Investor events" toast={toast} notify={notify}>
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm text-[#4A5568]">
            Mentor workspace <span className="mx-2 text-[#B8955A]">·</span> Investor events
          </p>
          <h1 className="serif mt-1 text-[30px] font-semibold text-[#0F1B2D]">
            Investor events
          </h1>
          <p className="mt-1 text-sm text-[#4A5568]">
            Priority access to events where founders meet investors.
          </p>
        </div>
        <button
          type="button"
          onClick={() => notify('You’ll be notified when new events open.')}
          className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-[#E5E1D8] bg-white px-3 text-xs font-semibold text-[#0F1B2D] hover:bg-[#FAF8F4]"
        >
          Notify me about events
        </button>
      </div>

      <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
        {['Upcoming', 'My registrations', 'Invitations', 'Past'].map((x) => (
          <button
            type="button"
            key={x}
            onClick={() => setEventTab(x)}
            className={`min-h-10 shrink-0 rounded-lg px-3 text-xs font-medium transition-colors ${
              eventTab === x
                ? 'bg-[#0F1B2D] text-white'
                : 'border border-[#E5E1D8] bg-white text-[#4A5568] hover:bg-[#FAF8F4]'
            }`}
          >
            {x}
          </button>
        ))}
      </div>

      {eventTab === 'Upcoming' && (
        <Card title="Featured event">
          <div className="relative mb-4 h-28 rounded-lg bg-[#0F1B2D]">
            <div className="absolute bottom-0 h-[2px] w-full bg-[#B8955A]" />
            <span className="absolute left-4 top-4 rounded-full bg-[#F3EBDD] px-2 py-1 text-xs font-semibold text-[#806236]">
              Priority access
            </span>
          </div>
          <h2 className="serif text-xl font-semibold text-[#0F1B2D]">{featured.name}</h2>
          <p className="mt-2 text-xs text-[#4A5568]">{featured.date} · {featured.format}</p>
          <p className="mt-2 text-xs text-[#4A5568]">{featured.host} · {featured.focus}</p>
          <p className="mt-3 text-sm leading-6 text-[#0F1B2D]">{featured.description}</p>
          <p className="mt-3 text-xs font-medium text-[#806236]">
            Mentors register 3 days before general opening · 18 mentor seats left
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href="/mentor/events/demo-day-2026"
              className="inline-flex min-h-10 items-center rounded-lg border border-[#E5E1D8] px-3 text-xs font-semibold text-[#0F1B2D] hover:bg-[#FAF8F4]"
            >
              View event <ArrowRight className="ml-2" size={13} />
            </Link>
            <button
              type="button"
              onClick={() => setModal('register')}
              className="min-h-10 rounded-lg bg-[#0F1B2D] px-4 text-xs font-semibold text-white hover:bg-[#1C2B42]"
            >
              Register
            </button>
          </div>
        </Card>
      )}

      {eventTab === 'Upcoming' ? (
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {initialEvents.slice(1).map((e) => (
            <article key={e.id} className="rounded-xl border border-[#E5E1D8] bg-white p-5">
              <div className="mb-4 h-20 rounded-lg bg-[#0F1B2D]">
                <div className="h-[2px] bg-[#B8955A]" />
              </div>
              <h2 className="font-semibold text-[#0F1B2D]">{e.name}</h2>
              <p className="mt-1 text-xs text-[#4A5568]">
                {e.date} · {e.format}
              </p>
              <p className="mt-2 text-xs text-[#4A5568]">
                {e.host} · {e.focus}
              </p>
              <span className="mt-3 inline-block rounded-full bg-[#F3EBDD] px-2 py-1 text-xs font-semibold text-[#806236]">
                {e.access}
              </span>
              <div className="mt-3 flex justify-end gap-2">
                <Link
                  href={`/mentor/events/${e.id}`}
                  className="rounded-lg border border-[#E5E1D8] px-3 py-2 text-xs font-semibold text-[#0F1B2D] hover:bg-[#FAF8F4]"
                >
                  View
                </Link>
                <button
                  type="button"
                  onClick={() => setModal('register')}
                  className="rounded-lg bg-[#0F1B2D] px-3 py-2 text-xs font-semibold text-white hover:bg-[#1C2B42]"
                >
                  {e.registered === 'Invited' ? 'Accept invitation' : 'Register'}
                </button>
              </div>
            </article>
          ))}
        </div>
      ) : eventTab === 'My registrations' ? (
        <Card title="Your registrations">
          <div className="space-y-3">
            {initialEvents
              .filter((e) => registration[e.id])
              .map((e) => (
                <p
                  key={e.id}
                  className="flex items-center gap-3 rounded-lg border border-[#E5E1D8] p-3 text-xs"
                >
                  <CalendarDays size={16} className="text-[#9A7A45]" />
                  <span className="font-medium text-[#0F1B2D]">{e.name}</span>
                  <span className="ml-auto text-[#4A5568]">{e.date}</span>
                  <span className="rounded-full bg-[#0F1B2D] px-2 py-1 text-white">Registered</span>
                </p>
              ))}
            {!Object.values(registration).some(Boolean) && (
              <p className="text-sm text-[#4A5568]">No registrations yet. Browse upcoming events.</p>
            )}
          </div>
        </Card>
      ) : (
        <Card title={eventTab}>
          {eventTab === 'Invitations' ? (
            <p className="text-sm text-[#4A5568]">
              You have an invitation to Investor Office Hours: Early Stage. Recommended because 3 of
              your startups are working toward readiness.
            </p>
          ) : (
            <p className="text-sm text-[#4A5568]">
              Past events and participation records will appear here.
            </p>
          )}
        </Card>
      )}

      {/* Registration Modal */}
      {modal === 'register' && (
        <div className="fixed inset-0 z-40 grid place-items-center bg-[#0F1B2D]/45 p-4">
          <section
            role="dialog"
            aria-modal="true"
            className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"
          >
            <div className="mb-5 flex items-center justify-between">
              <h2 className="serif text-2xl font-semibold text-[#0F1B2D]">Register for event</h2>
              <button
                type="button"
                onClick={() => setModal('')}
                aria-label="Close"
                className="text-[#4A5568] hover:text-[#0F1B2D]"
              >
                <X size={18} />
              </button>
            </div>
            <div className="space-y-3">
              <label className="block text-sm font-medium text-[#0F1B2D]">
                Participation type
                <select className="mt-2 h-10 w-full rounded-lg border border-[#E5E1D8] bg-white px-3 focus:outline-none">
                  <option>Attend</option>
                  <option>Office hours</option>
                  <option>Pitch coaching</option>
                </select>
              </label>
              <label className="block text-sm font-medium text-[#0F1B2D]">
                Accessibility or dietary needs (optional)
                <input
                  aria-label="Input field"
                  className="mt-2 h-10 w-full rounded-lg border border-[#E5E1D8] px-3 focus:outline-none"
                />
              </label>
              <label className="flex items-center gap-2 text-xs text-[#4A5568]">
                <input aria-label="Toggle option" type="checkbox" className="accent-[#0F1B2D]" />
                Share my name and expertise with attendees
              </label>
              <label className="flex items-center gap-2 text-xs text-[#4A5568]">
                <input aria-label="Toggle option" type="checkbox" className="accent-[#0F1B2D]" />
                I agree to the event code of conduct
              </label>
              <p className="text-xs text-[#4A5568]">
                Repeated no-shows may affect priority access.
              </p>
            </div>

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
                  setRegistration({ ...registration, 'demo-day-2026': true });
                  notify('Registration confirmed. Event added to My registrations.');
                  setModal('');
                }}
                className="min-h-10 rounded-lg bg-[#0F1B2D] px-4 text-sm font-semibold text-white hover:bg-[#1C2B42]"
              >
                Confirm registration
              </button>
            </div>
          </section>
        </div>
      )}
    </MentorPageShell>
  );
}
