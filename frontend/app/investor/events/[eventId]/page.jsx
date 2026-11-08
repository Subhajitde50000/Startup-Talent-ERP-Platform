'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Ticket, Calendar, X, Check } from 'lucide-react';
import { InvestorShell, Card, Button } from '@/components';
import { events, InvestorDisclaimer } from '../../investor-data';

export default function InvestorEventDetailPage({ params }) {
  const eventId = params?.eventId || 'fintech-demo-day';
  const event = events.find((e) => e.id === eventId) || events[0];

  const [registered, setRegistered] = useState(false);

  return (
    <InvestorShell
      active="Events"
      module="Deal flow"
      title={event.name}
      description={`${event.date} · ${event.format}`}
      backHref="/investor/events"
      backLabel="← Back to Events"
      actions={
        <div className="flex items-center gap-2">
          <Link
            href="/investor/events"
            className="inline-flex min-h-10 items-center rounded-lg border border-[#E5E1D8] bg-white px-3.5 text-xs font-semibold text-ink hover:bg-[#FAF8F4]"
          >
            ← Events
          </Link>
          <Button
            onClick={() => {
              setRegistered(true);
            }}
          >
            {registered ? 'Registered ✓' : 'Register for event'}
          </Button>
        </div>
      }
    >
      {({ notify }) => (
        <>
          {/* Header Banner */}
          <div className="mb-6 h-28 rounded-2xl bg-ink p-6 text-white relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#B8955A]" />
            <span className="self-start rounded-full bg-[#F3EBDD] px-2.5 py-0.5 text-xs font-semibold text-[#806236]">
              {event.access}
            </span>
            <p className="text-xs text-white/80">{event.host} · {event.focus}</p>
          </div>

          <div className="grid items-start gap-6 xl:grid-cols-3">
            <div className="space-y-6 xl:col-span-2">
              <Card title="About the event">
                <p className="text-sm leading-relaxed text-ink">{event.summary}</p>
              </Card>

              <Card title="Event agenda">
                <div className="space-y-3 text-xs">
                  {[
                    ['10:00 AM', 'Opening keynote & macro venture trends overview'],
                    ['10:30 AM', 'Cohort presentations & live founder pitch Q&A'],
                    ['12:00 PM', 'Curated breakout roundtables with founders'],
                    ['01:00 PM', 'Private 1-on-1 investor office hours'],
                  ].map(([time, desc]) => (
                    <div key={time} className="flex items-start gap-4 border-b border-[#E5E1D8] pb-3 last:border-0 last:pb-0">
                      <b className="w-20 shrink-0 font-semibold text-ink">{time}</b>
                      <span className="text-[#4A5568]">{desc}</span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card title="Presenting startups">
                <div className="space-y-3 text-xs">
                  <div className="rounded-lg border border-[#E5E1D8] p-3 flex items-center justify-between">
                    <div>
                      <b className="text-ink">Acme Studio · Prototype · Fintech</b>
                      <span className="block text-[#4A5568]">Seed round target ₹2 Cr · Investment Ready</span>
                    </div>
                    <Link
                      href="/investor/startups/acme"
                      className="font-semibold text-[#9A7A45] hover:underline"
                    >
                      View profile →
                    </Link>
                  </div>

                  <div className="rounded-lg border border-[#E5E1D8] p-3 flex items-center justify-between">
                    <div>
                      <b className="text-ink">OrbitPay · Early Revenue · Fintech</b>
                      <span className="block text-[#4A5568]">Seed round target ₹4 Cr · Cross-border payments</span>
                    </div>
                    <Link
                      href="/investor/startups/orbitpay"
                      className="font-semibold text-[#9A7A45] hover:underline"
                    >
                      View profile →
                    </Link>
                  </div>
                </div>
              </Card>
            </div>

            {/* Sidebar registration */}
            <aside className="space-y-6">
              <Card title="Registration status">
                <dl className="space-y-2 text-xs">
                  <div className="flex justify-between border-b border-[#E5E1D8] pb-2">
                    <dt className="text-[#4A5568]">Access tier</dt>
                    <dd className="font-semibold text-ink">{event.access}</dd>
                  </div>
                  <div className="flex justify-between border-b border-[#E5E1D8] pb-2">
                    <dt className="text-[#4A5568]">Seats left</dt>
                    <dd className="font-semibold text-ink">12 investor seats</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-[#4A5568]">RSVP Deadline</dt>
                    <dd className="font-semibold text-ink">Nov 29, 2026</dd>
                  </div>
                </dl>

                <Button
                  className="mt-4 w-full"
                  onClick={() => {
                    setRegistered(true);
                    notify('RSVP confirmed! Ticket and instructions sent.');
                  }}
                >
                  {registered ? 'Seat confirmed ✓' : 'Confirm RSVP'}
                </Button>
              </Card>

              <Card title="Host & logistics">
                <p className="text-xs text-[#4A5568] leading-relaxed">
                  Venue: Mumbai Innovation Center & Virtual Stage.<br />
                  Chatham House Rule applies during private founder office hours.
                </p>
              </Card>
            </aside>
          </div>

          <InvestorDisclaimer onLearnMore={() => notify('Platform disclaimer opened.')} />
        </>
      )}
    </InvestorShell>
  );
}
