'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  X,
} from 'lucide-react';
import MentorPageShell from '../../mentor-page-shell';
import { initialEvents, Btn, Card } from '../../mentor-data';

export default function MentorEventDetailPage() {
  const params = useParams();
  const eventId = params?.eventId || 'demo-day-2026';

  const [toast, setToast] = useState('');
  const [modal, setModal] = useState('');

  const notify = (x) => {
    setToast(x);
    setTimeout(() => setToast(''), 2700);
  };

  const event =
    initialEvents.find((e) => e.id === eventId) || initialEvents[0];

  return (
    <MentorPageShell
      active="Investor events"
      backHref="/mentor/events"
      backLabel="← Investor events"
      toast={toast}
      notify={notify}
    >
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm text-[#4A5568]">
            Mentor workspace <span className="mx-2 text-[#B8955A]">·</span> Investor events
          </p>
          <h1 className="serif mt-1 text-[30px] font-semibold text-[#0F1B2D]">
            {event.name}
          </h1>
          <p className="mt-1 text-sm text-[#4A5568]">
            {event.date} · {event.format} · {event.host}
          </p>
        </div>
        <Link
          href="/mentor/events"
          className="inline-flex min-h-10 items-center rounded-lg border border-[#E5E1D8] bg-white px-3 text-xs font-semibold text-[#0F1B2D] hover:bg-[#FAF8F4]"
        >
          ← Events
        </Link>
      </div>

      <div className="grid items-start gap-5 xl:grid-cols-3">
        <div className="space-y-5 xl:col-span-2">
          <Card title="About this event">
            <div className="h-32 rounded-lg bg-[#0F1B2D]">
              <div className="h-[2px] bg-[#B8955A]" />
            </div>
            <p className="mt-4 text-sm leading-6 text-[#0F1B2D]">{event.description}</p>
            <p className="mt-3 text-xs text-[#4A5568]">
              Focus: {event.focus} · Format: {event.format}
            </p>
          </Card>

          <Card title="Agenda">
            <div className="space-y-3">
              {[
                ['10:00 AM', 'Welcome and opening'],
                ['10:30 AM', 'Startup demos and Q&A'],
                ['12:00 PM', 'Investor networking'],
                ['1:00 PM', 'Mentor office hours'],
              ].map(([t, x]) => (
                <p
                  key={t}
                  className="flex gap-3 border-b border-[#E5E1D8] pb-3 text-xs text-[#0F1B2D]"
                >
                  <b className="w-20 shrink-0">{t}</b>
                  <span className="text-[#4A5568]">{x}</span>
                </p>
              ))}
            </div>
          </Card>

          <Card title="Who's attending">
            <div className="grid grid-cols-3 gap-3">
              {[
                ['Startups', '12'],
                ['Investors', '18'],
                ['Mentors', '8'],
              ].map(([x, v]) => (
                <div key={x} className="rounded-lg bg-[#FAF8F4] p-3 text-center">
                  <b className="serif text-xl text-[#0F1B2D]">{v}</b>
                  <small className="block text-xs text-[#4A5568]">{x}</small>
                </div>
              ))}
            </div>
            <h3 className="mt-4 text-xs font-semibold text-[#0F1B2D]">
              Your startups at this event
            </h3>
            <p className="mt-2 text-xs text-[#4A5568]">
              Acme Studio · Invited · Prototype · 4 of 6 readiness items signed
            </p>
          </Card>

          <Card title="How mentors can take part">
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                ['Attend and network', 'Join the full event'],
                ['Mentor lounge', 'Offer founders a short advice slot'],
                ['Pitch coaching', 'Offer a 20-minute prep session'],
              ].map(([x, y]) => (
                <button
                  type="button"
                  key={x}
                  onClick={() => notify(`${x} selected.`)}
                  className="rounded-lg border border-[#E5E1D8] p-3 text-left transition hover:border-[#0F1B2D]"
                >
                  <b className="text-xs text-[#0F1B2D]">{x}</b>
                  <small className="mt-1 block text-xs text-[#4A5568]">{y}</small>
                </button>
              ))}
            </div>
          </Card>

          <Card title="Logistics">
            <p className="text-xs leading-5 text-[#4A5568]">
              Venue: Mumbai Innovation Hub, Bandra Kurla Complex · Online access available after
              registration. Accessible venue; captions provided for streamed sessions. Code of conduct
              applies.
            </p>
          </Card>
        </div>

        <aside className="space-y-5 xl:sticky xl:top-24">
          <Card title="Registration">
            <span className="rounded-full bg-[#E7F3EC] px-2 py-1 text-xs font-semibold text-[#286749]">
              Open
            </span>
            <p className="mt-3 text-xs text-[#0F1B2D]">Mentor seats: {event.slots} left</p>
            <p className="mt-2 text-xs text-[#4A5568]">Registration deadline Nov 29 · 11:59 PM IST</p>
            <div className="mt-4">
              <Btn onClick={() => setModal('register')}>Register now</Btn>
            </div>
            <button
              type="button"
              onClick={() => notify('Calendar invite downloaded.')}
              className="mt-3 w-full rounded-lg border border-[#E5E1D8] py-2 text-xs font-semibold text-[#0F1B2D] hover:bg-[#FAF8F4]"
            >
              Add to calendar
            </button>
            <button
              type="button"
              onClick={() => notify('Event link copied for your startup.')}
              className="mt-2 w-full text-xs font-semibold text-[#9A7A45]"
            >
              Share with a startup
            </button>
          </Card>

          <Card title="Recommend a startup">
            <p className="text-xs leading-5 text-[#4A5568]">
              Recommend an active mentee. The startup decides whether to apply.
            </p>
            <button
              type="button"
              onClick={() => setModal('recommend')}
              className="mt-3 w-full rounded-lg border border-[#E5E1D8] py-2 text-xs font-semibold text-[#0F1B2D] hover:bg-[#FAF8F4]"
            >
              Recommend a startup
            </button>
          </Card>

          <Card title="Contact & conduct">
            <button
              type="button"
              onClick={() => notify('Organizer contact opened.')}
              className="text-xs font-semibold text-[#9A7A45]"
            >
              Contact organizer
            </button>
            <p className="mt-2 text-xs text-[#4A5568]">Report a concern</p>
          </Card>
        </aside>
      </div>

      {/* Modals */}
      {modal && (
        <div className="fixed inset-0 z-40 grid place-items-center bg-[#0F1B2D]/45 p-4">
          <section
            role="dialog"
            aria-modal="true"
            className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"
          >
            <div className="mb-5 flex items-center justify-between">
              <h2 className="serif text-2xl font-semibold text-[#0F1B2D]">
                {modal === 'register' ? 'Register for event' : 'Recommend a startup'}
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

            {modal === 'register' ? (
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
            ) : (
              <div className="space-y-3">
                <label className="block text-sm font-medium text-[#0F1B2D]">
                  Active mentee
                  <select className="mt-2 h-10 w-full rounded-lg border border-[#E5E1D8] bg-white px-3 focus:outline-none">
                    <option>Acme Studio · Prototype</option>
                    <option>GreenLedger · Idea</option>
                  </select>
                </label>
                <label className="block text-sm font-medium text-[#0F1B2D]">
                  Short endorsement (up to 280 characters)
                  <textarea
                    maxLength={280}
                    rows={4}
                    placeholder="Describe their progress and verified strengths…"
                    className="mt-2 w-full rounded-lg border border-[#E5E1D8] p-3 text-sm focus:outline-none"
                  />
                </label>
                <label className="flex items-center gap-2 text-xs text-[#4A5568]">
                  <input aria-label="Toggle option" type="checkbox" className="accent-[#0F1B2D]" />
                  I have no financial interest beyond the recorded agreement
                </label>
                <p className="text-xs text-[#4A5568]">
                  We send your recommendation to the startup first. They decide whether to apply.
                </p>
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
                  if (modal === 'register') {
                    notify('Registration confirmed. Event added to My registrations.');
                  } else {
                    notify('Recommendation sent to startup.');
                  }
                  setModal('');
                }}
                className="min-h-10 rounded-lg bg-[#0F1B2D] px-4 text-sm font-semibold text-white hover:bg-[#1C2B42]"
              >
                {modal === 'register' ? 'Confirm registration' : 'Send recommendation'}
              </button>
            </div>
          </section>
        </div>
      )}
    </MentorPageShell>
  );
}
