'use client';
import { useState } from 'react';
import Link from 'next/link';
import {
  Bookmark,
  Plus,
  LockKeyhole,
  FileText,
  X,
  Send,
  Building2,
  CheckCircle2,
} from 'lucide-react';
import { InvestorShell, Card, Button } from '@/components';
import {
  startups,
  InvestorBadge,
  InvestorDisclaimer,
} from '../../investor-data';

export default function InvestorStartupProfilePage({ params }) {
  const startupId = params?.startupId || 'acme';
  const startup = startups.find((s) => s.id === startupId) || startups[0];

  const [saved, setSaved] = useState(['greenledger']);
  const [tab, setTab] = useState('Overview');
  const [modal, setModal] = useState('');
  const [notes, setNotes] = useState({});
  const [message, setMessage] = useState('');

  return (
    <InvestorShell
      active="Discover startups"
      module="Deal flow"
      title={startup.name}
      description={startup.tag}
      backHref="/investor/discover"
      backLabel="← Back to Discover"
      actions={
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/investor/discover"
            className="inline-flex min-h-10 items-center rounded-lg border border-[#E5E1D8] bg-white px-3.5 text-xs font-semibold text-ink hover:bg-[#FAF8F4]"
          >
            ← Discover
          </Link>
          <Button
            secondary
            onClick={() => {
              setSaved((prev) =>
                prev.includes(startup.id)
                  ? prev.filter((x) => x !== startup.id)
                  : [...prev, startup.id]
              );
            }}
          >
            <Bookmark size={14} />
            {saved.includes(startup.id) ? 'Saved' : 'Save to shortlist'}
          </Button>
          <Button onClick={() => setModal('intro')}>Request intro</Button>
        </div>
      }
    >
      {({ notify }) => (
        <>
          {/* Header Banner */}
          <div className="mb-6 h-28 rounded-2xl bg-ink p-6 text-white relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#B8955A]" />
            <div className="flex items-center gap-4">
              <span className="grid h-16 w-16 place-items-center rounded-2xl bg-[#F3EBDD] text-2xl font-bold text-ink">
                {startup.logo}
              </span>
              <div>
                <h1 className="serif text-2xl font-bold">{startup.name}</h1>
                <p className="text-xs text-white/70">{startup.sector} · {startup.loc}</p>
              </div>
            </div>
          </div>

          {/* Badges & Meta strip */}
          <div className="mb-5 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-[#F3F4F6] px-3 py-1 text-xs font-semibold text-ink">
              {startup.stage}
            </span>
            <span className="text-xs font-medium text-[#4A5568]">{startup.sector}</span>
            {startup.verified && <InvestorBadge>Verified startup</InvestorBadge>}
            {startup.badge && <InvestorBadge gold>Investment Ready</InvestorBadge>}
            <span className="text-xs text-[#4A5568]">· Founded 2022 · Team of {startup.team}</span>
          </div>

          <div className="mb-6 rounded-lg bg-[#FAF8F4] p-3 text-xs text-[#4A5568] border border-[#E5E1D8]">
            Showing data {startup.name} elected to share with verified investors. Last updated {startup.updated}.
          </div>

          {/* Tab Strip (Responsive Scroll) */}
          <div className="mb-6 flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {[
              'Overview',
              'Traction',
              'Team',
              'Round',
              'Mentors and readiness',
              'Documents',
              'Updates',
            ].map((x) => (
              <button
                key={x}
                type="button"
                onClick={() => setTab(x)}
                className={`min-h-10 shrink-0 rounded-lg px-4 text-xs font-semibold transition ${
                  tab === x
                    ? 'bg-ink text-white'
                    : 'border border-[#E5E1D8] bg-white text-[#4A5568] hover:bg-[#FAF8F4] hover:text-ink'
                }`}
              >
                {x}
              </button>
            ))}
          </div>

          {/* Main 2-column layout */}
          <div className="grid items-start gap-6 xl:grid-cols-3">
            <div className="space-y-6 xl:col-span-2">
              {tab === 'Overview' && (
                <>
                  <Card title="Pitch summary">
                    <p className="text-sm leading-relaxed text-ink">{startup.summary}</p>
                  </Card>
                  <div className="grid gap-4 md:grid-cols-3">
                    {[
                      ['Problem', startup.problem],
                      ['Solution', startup.solution],
                      ['Market (TAM)', startup.tam],
                    ].map(([label, text]) => (
                      <Card key={label} title={label}>
                        <p className="text-xs leading-relaxed text-ink">{text}</p>
                      </Card>
                    ))}
                  </div>
                  <Card title="Traction highlights">
                    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                      {startup.items.map(([metric, value, source]) => (
                        <div key={metric} className="rounded-lg bg-[#FAF8F4] p-3 border border-[#E5E1D8]">
                          <span className="block text-xs text-[#4A5568]">{metric}</span>
                          <b className="serif mt-1 block text-xl font-bold text-ink">{value}</b>
                          <span className="text-xs text-[#9A7A45]">{source}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                  <Card title="Business model">
                    <p className="text-xs text-ink">{startup.model}</p>
                  </Card>
                </>
              )}

              {tab === 'Traction' && (
                <Card title="Shared traction metrics">
                  <div className="grid grid-cols-2 gap-4">
                    {startup.items.map(([metric, val, src]) => (
                      <div key={metric} className="rounded-lg border border-[#E5E1D8] p-4">
                        <span className="text-xs text-[#4A5568]">{metric}</span>
                        <b className="serif block text-2xl font-bold text-ink mt-1">{val}</b>
                        <span className="text-xs text-[#9A7A45]">{src}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {tab === 'Team' && (
                <Card title="Team & founders">
                  <p className="text-sm leading-relaxed text-ink">{startup.teamText}</p>
                  <div className="mt-4 rounded-lg bg-[#FAF8F4] p-3 text-xs text-[#4A5568] border border-[#E5E1D8]">
                    Founder contact details and cap table identities are revealed after an accepted introduction.
                  </div>
                </Card>
              )}

              {tab === 'Round' && (
                <Card title="Fundraising round terms">
                  <p className="text-xs text-ink font-medium">
                    {startup.roundType} · Target {startup.raise} · {startup.committed} committed
                  </p>
                  <div className="mt-3 h-2.5 rounded-full bg-[#E5E1D8] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[#B8955A]"
                      style={{ width: startup.committed }}
                    />
                  </div>
                </Card>
              )}

              {tab === 'Mentors and readiness' && (
                <Card title="Investment Ready · Mentor-verified">
                  <b className="serif text-4xl font-bold text-ink">{startup.ready} / 100</b>
                  <p className="mt-2 text-xs text-[#4A5568]">
                    Verified by mentor: <b>{startup.mentor}</b>. Based on checklist audit, financial transparency and platform governance.
                  </p>
                </Card>
              )}

              {tab === 'Documents' && (
                <div className="space-y-4">
                  <Card title="Public summary deck">
                    <div className="flex items-center gap-3 text-xs">
                      <FileText size={20} className="text-[#806236]" />
                      <span className="font-semibold text-ink">One-page summary.pdf</span>
                      <button
                        type="button"
                        onClick={() => notify('Previewing one-page executive summary.')}
                        className="ml-auto text-xs font-semibold text-[#9A7A45] hover:underline"
                      >
                        Preview document
                      </button>
                    </div>
                  </Card>

                  <Card title="Confidential data room">
                    <div className="flex items-start gap-3">
                      <LockKeyhole size={20} className="text-[#B7791F] shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-ink">
                          Requires signed NDA and explicit founder permission before documents can be opened.
                        </p>
                        <Button
                          className="mt-3"
                          onClick={() => setModal('data-room')}
                        >
                          Request data room access
                        </Button>
                      </div>
                    </div>
                  </Card>
                </div>
              )}

              {tab === 'Updates' && (
                <Card title="Recent startup updates">
                  <div className="space-y-3 text-xs">
                    {[
                      ['Nov 03', 'Profile updated with Q3 traction data'],
                      ['Oct 24', 'Investment Ready badge awarded'],
                      ['Oct 11', 'Seed round opened on platform'],
                    ].map(([d, x]) => (
                      <div key={x} className="border-l-2 border-[#B8955A] pl-3">
                        <b className="text-ink">{d}</b> · {x}
                      </div>
                    ))}
                  </div>
                </Card>
              )}
            </div>

            {/* Right Sticky Sidebar */}
            <aside className="space-y-6">
              <Card title="Thesis fit summary">
                <p className="text-xs text-[#4A5568]">{startup.fit}</p>
                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                  <span className="rounded bg-[#E7F3EC] px-2 py-0.5 text-[#286749] font-medium">✓ Stage</span>
                  <span className="rounded bg-[#E7F3EC] px-2 py-0.5 text-[#286749] font-medium">✓ Sector</span>
                  <span className="rounded bg-[#E7F3EC] px-2 py-0.5 text-[#286749] font-medium">✓ Ticket</span>
                </div>
              </Card>

              <Card title="Quick facts">
                <dl className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <dt className="text-[#4A5568]">Stage</dt>
                    <dd className="font-semibold text-ink">{startup.stage}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-[#4A5568]">Sector</dt>
                    <dd className="font-semibold text-ink">{startup.sector}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-[#4A5568]">Location</dt>
                    <dd className="font-semibold text-ink">{startup.loc}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-[#4A5568]">Team</dt>
                    <dd className="font-semibold text-ink">{startup.team} members</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-[#4A5568]">Readiness</dt>
                    <dd className="font-semibold text-ink">{startup.ready}/100</dd>
                  </div>
                </dl>
              </Card>

              <Card title="Private team notes">
                <label htmlFor="startup-notes" className="sr-only">
                  Private team notes
                </label>
                <textarea
                  id="startup-notes"
                  value={notes[startup.id] || ''}
                  onChange={(e) => setNotes({ ...notes, [startup.id]: e.target.value })}
                  rows={4}
                  placeholder="Private notes for your investment team..."
                  className="w-full rounded-lg border border-[#E5E1D8] p-2.5 text-xs focus:border-ink focus:outline-none"
                />
                <Button
                  secondary
                  className="mt-2 w-full"
                  onClick={() => notify('Private notes saved.')}
                >
                  Save note
                </Button>
              </Card>

              <Button className="w-full" onClick={() => setModal('data-room')}>
                Request data room access
              </Button>
            </aside>
          </div>

          <InvestorDisclaimer onLearnMore={() => notify('Platform disclaimer opened.')} />

          {/* Modals */}
          {modal === 'intro' && (
            <div className="fixed inset-0 z-50 grid place-items-center bg-ink/50 p-4 backdrop-blur-sm">
              <section
                role="dialog"
                aria-modal="true"
                className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl"
              >
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="serif text-xl font-bold text-ink">Request introduction</h2>
                  <button type="button" onClick={() => setModal('')}>
                    <X size={18} />
                  </button>
                </div>
                <p className="text-xs text-[#4A5568]">To: <b>{startup.name}</b></p>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  placeholder="Introduce yourself and outline your interest..."
                  className="mt-3 w-full rounded-lg border border-[#E5E1D8] p-3 text-xs focus:border-ink focus:outline-none"
                />
                <div className="mt-4 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setModal('')}
                    className="rounded-lg border px-3 py-2 text-xs font-medium text-[#4A5568]"
                  >
                    Cancel
                  </button>
                  <Button
                    onClick={() => {
                      notify('Intro request sent!');
                      setModal('');
                      setMessage('');
                    }}
                  >
                    Send request
                  </Button>
                </div>
              </section>
            </div>
          )}

          {modal === 'data-room' && (
            <div className="fixed inset-0 z-50 grid place-items-center bg-ink/50 p-4 backdrop-blur-sm">
              <section
                role="dialog"
                aria-modal="true"
                className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl"
              >
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="serif text-xl font-bold text-ink">Request data room access</h2>
                  <button type="button" onClick={() => setModal('')}>
                    <X size={18} />
                  </button>
                </div>
                <p className="text-xs text-[#4A5568]">
                  Target company: <b>{startup.name}</b>
                </p>
                <div className="mt-4 space-y-3">
                  <div>
                    <label htmlFor="folder-select" className="block text-xs font-medium text-ink">
                      Requested scope
                    </label>
                    <select
                      id="folder-select"
                      className="mt-1 h-10 w-full rounded-lg border border-[#E5E1D8] bg-white px-3 text-xs focus:border-ink focus:outline-none"
                    >
                      <option>Financials, Traction & Cap table</option>
                      <option>All folders (Full diligence)</option>
                    </select>
                  </div>
                  <label className="flex items-center gap-2 text-xs">
                    <input type="checkbox" defaultChecked className="accent-ink" />
                    I agree to sign the Mutual NDA before accessing materials
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
                      notify('Access request sent. The founder will review and approve.');
                      setModal('');
                    }}
                  >
                    Submit request
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
