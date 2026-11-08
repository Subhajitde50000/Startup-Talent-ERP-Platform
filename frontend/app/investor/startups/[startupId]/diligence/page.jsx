'use client';
import { useState } from 'react';
import Link from 'next/link';
import {
  Download,
  Plus,
  Send,
  LockKeyhole,
  CheckCircle2,
} from 'lucide-react';
import { InvestorShell, Card, Button } from '@/components';
import { deals, InvestorDisclaimer } from '../../../investor-data';

export default function InvestorDiligencePage({ params }) {
  const startupId = params?.startupId || 'acme';
  const deal = deals.find((d) => d.id === startupId) || deals[0];

  const [tab, setTab] = useState('Overview');
  const [checks, setChecks] = useState({
    'Business model understood': true,
    'Market size assumptions checked': true,
    'Financial statements reviewed': true,
  });
  const [question, setQuestion] = useState('');
  const [score, setScore] = useState({});
  const [notes, setNotes] = useState('');

  return (
    <InvestorShell
      active="Pipeline"
      module="Deal flow"
      title={`${deal.name} · Diligence`}
      description="A structured, private workspace for deep audit and thesis validation."
      backHref="/investor/pipeline"
      backLabel="← Back to Pipeline"
      actions={
        <div className="flex items-center gap-2">
          <Link
            href="/investor/pipeline"
            className="inline-flex min-h-10 items-center rounded-lg border border-[#E5E1D8] bg-white px-3.5 text-xs font-semibold text-ink hover:bg-[#FAF8F4]"
          >
            ← Pipeline
          </Link>
          <Button secondary onClick={() => {}}>
            <Download size={14} /> Export memo
          </Button>
        </div>
      }
    >
      {({ notify }) => (
        <>
          {/* Progress Header Card */}
          <div className="mb-6 rounded-2xl border border-[#E5E1D8] bg-white p-5 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#F3EBDD] font-bold text-ink">
                  {deal.logo}
                </span>
                <div>
                  <h2 className="serif text-lg font-bold text-ink">{deal.name}</h2>
                  <p className="text-xs text-[#4A5568]">{deal.sector} · {deal.stage}</p>
                </div>
              </div>
              <span className="rounded-full bg-[#F3EBDD] px-3 py-1 text-xs font-semibold text-[#806236]">
                Private to your investment team
              </span>
            </div>

            <div className="mt-4 flex items-center gap-3 text-xs">
              <span className="font-medium text-ink">5 of 8 areas cleared</span>
              <div className="h-2 flex-1 rounded-full bg-[#E5E1D8] overflow-hidden">
                <div className="h-full rounded-full bg-[#B8955A] w-[62%]" />
              </div>
              <span className="font-bold text-[#806236]">62% Complete</span>
            </div>
          </div>

          {/* Sub Tabs */}
          <div className="mb-6 flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {[
              'Overview',
              'Checklist',
              'Questions',
              'Findings and risks',
              'Scorecard',
              'Notes',
              'Documents',
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

          {/* Tab Content */}
          {tab === 'Overview' && (
            <div className="grid gap-6 md:grid-cols-2">
              <Card title="Status by diligence area">
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    ['Business Model', true],
                    ['Market Size', true],
                    ['Product Demo', true],
                    ['Team Reference', true],
                    ['Financial Audit', true],
                    ['Legal & IP', false],
                    ['Customer Calls', false],
                    ['Round Terms', false],
                  ].map(([area, cleared]) => (
                    <div
                      key={area}
                      className="rounded-lg bg-[#FAF8F4] p-3 text-xs border border-[#E5E1D8]"
                    >
                      <span className="font-medium text-ink">{area}</span>
                      <span
                        className={`mt-1.5 block font-semibold ${
                          cleared ? 'text-[#286749]' : 'text-[#8A5700]'
                        }`}
                      >
                        {cleared ? '✓ Cleared' : 'Needs info'}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card title="Immediate action items">
                <div className="space-y-3 text-xs">
                  <div className="rounded-lg border border-[#E5E1D8] p-3">
                    <b className="block text-ink">Review cap table reconciliation</b>
                    <span className="text-[#4A5568]">Assigned to: Arjun Mehta · Due Nov 12</span>
                  </div>
                  <div className="rounded-lg border border-[#E5E1D8] p-3">
                    <b className="block text-ink">CTO deep-dive architecture call</b>
                    <span className="text-[#4A5568]">Assigned to: Dev Patel · Due Nov 15</span>
                  </div>
                  <div className="rounded-lg border border-[#E5E1D8] p-3">
                    <b className="block text-ink">Customer retention cohort checks</b>
                    <span className="text-[#4A5568]">Assigned to: Mira Shah · Due Nov 17</span>
                  </div>
                </div>
                <Link
                  href={`/investor/data-rooms/${deal.id}`}
                  className="mt-4 inline-block text-xs font-semibold text-[#9A7A45] hover:underline"
                >
                  Open shared data room →
                </Link>
              </Card>
            </div>
          )}

          {tab === 'Checklist' && (
            <Card
              title="Diligence checklist"
              action={
                <Button secondary onClick={() => notify('Custom checklist item created.')}>
                  <Plus size={13} /> Add item
                </Button>
              }
            >
              <div className="space-y-2.5">
                {[
                  'Business model understood',
                  'Pricing and customer references',
                  'Market size assumptions checked',
                  'Demo seen and roadmap reviewed',
                  'Founder references completed',
                  'Financial statements reviewed',
                  'Burn, runway and use of funds',
                  'Company registration and cap table',
                  'IP ownership reviewed',
                  'Retention and customer concentration',
                  'Valuation and instrument reviewed',
                ].map((item, idx) => (
                  <div
                    key={item}
                    className="flex flex-wrap items-center gap-3 rounded-lg border border-[#E5E1D8] p-3 text-xs hover:bg-[#FAF8F4]"
                  >
                    <input
                      type="checkbox"
                      checked={!!checks[item]}
                      onChange={(e) =>
                        setChecks({ ...checks, [item]: e.target.checked })
                      }
                      className="h-4 w-4 rounded accent-ink"
                    />
                    <span className="flex-1 font-medium text-ink">{item}</span>
                    <span className="text-xs text-[#4A5568]">
                      {idx % 3 === 0 ? 'Owner: Arjun · Due Nov 12' : 'Owner: Arjun'}
                    </span>
                    <select className="h-8 rounded border border-[#E5E1D8] bg-white px-2 text-xs focus:border-ink focus:outline-none">
                      <option>{checks[item] ? 'Cleared' : 'In progress'}</option>
                      <option>Needs info</option>
                      <option>Concern flagged</option>
                      <option>N/A</option>
                    </select>
                  </div>
                ))}
              </div>
              <Button className="mt-4" onClick={() => notify('Checklist saved.')}>
                Save checklist
              </Button>
            </Card>
          )}

          {tab === 'Questions' && (
            <Card title="Questions to founder">
              <div className="space-y-3 mb-6">
                {[
                  [
                    'Financials',
                    'Can you share monthly revenue reconciliation for Q3 2026?',
                    'Answered · Model updated in Data Room',
                  ],
                  [
                    'Team',
                    'Please clarify the CTO hiring timeline and equity allocation.',
                    'Sent to founder · Awaiting response',
                  ],
                ].map(([tag, q, status]) => (
                  <div key={q} className="rounded-lg border border-[#E5E1D8] p-3 text-xs">
                    <span className="rounded bg-[#F3F4F6] px-2 py-0.5 text-xs font-semibold text-ink">
                      {tag}
                    </span>
                    <p className="mt-2 text-sm font-medium text-ink">{q}</p>
                    <span className="mt-1 block text-xs text-[#4A5568]">{status}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t border-[#E5E1D8] pt-4">
                <label htmlFor="q-input" className="block text-xs font-medium text-ink">
                  Submit new diligence question (Founder will be notified)
                </label>
                <textarea
                  id="q-input"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  rows={3}
                  placeholder="Ask a concise, specific question..."
                  className="w-full rounded-lg border border-[#E5E1D8] p-3 text-xs focus:border-ink focus:outline-none"
                />
                <Button
                  onClick={() => {
                    if (question.length < 10) {
                      notify('Please write a specific question.');
                      return;
                    }
                    notify('Question dispatched to founder.');
                    setQuestion('');
                  }}
                >
                  <Send size={13} /> Send question
                </Button>
              </div>
            </Card>
          )}

          {tab === 'Findings and risks' && (
            <Card title="Key findings & risk register">
              <div className="mb-6 grid grid-cols-3 gap-3 text-center">
                {[
                  ['High', 1, 'text-red-700 bg-red-50 border-red-200'],
                  ['Medium', 2, 'text-amber-700 bg-amber-50 border-amber-200'],
                  ['Low', 3, 'text-green-700 bg-green-50 border-green-200'],
                ].map(([level, count, cls]) => (
                  <div key={level} className={`rounded-xl border p-4 ${cls}`}>
                    <span className="text-xs font-semibold uppercase">{level} risk</span>
                    <span className="serif mt-1 block text-2xl font-bold">{count}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 text-xs">
                {[
                  ['Customer concentration', 'Medium', 'Top 3 clients account for 44% of revenue'],
                  ['IP assignment documentation', 'High', 'Founder IP assignment agreement pending founder countersign'],
                  ['Strong cohort retention', 'Strength', '94% net revenue retention across beta users'],
                ].map(([title, tag, desc]) => (
                  <div key={title} className="rounded-lg border border-[#E5E1D8] p-3.5">
                    <div className="flex items-center justify-between">
                      <b className="text-xs font-semibold text-ink">{title}</b>
                      <span className="rounded bg-[#FAF8F4] px-2 py-0.5 text-xs font-medium text-ink">
                        {tag}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-[#4A5568]">{desc}</p>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {tab === 'Scorecard' && (
            <Card title="Team diligence scorecard">
              <p className="mb-4 text-xs text-[#4A5568]">
                Scores weighted across 5 critical dimensions. Reflects internal judgment, not platform algorithmic rating.
              </p>
              <div className="space-y-3">
                {[
                  ['Team', 25],
                  ['Market TAM', 20],
                  ['Product & IP', 20],
                  ['Traction & Moat', 20],
                  ['Round Terms & Cap Table', 15],
                ].map(([dim, weight]) => (
                  <div
                    key={dim}
                    className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E5E1D8] pb-3"
                  >
                    <div className="w-48">
                      <b className="block text-xs font-semibold text-ink">{dim}</b>
                      <span className="text-xs text-[#4A5568]">{weight}% weight</span>
                    </div>
                    <select
                      value={score[dim] || 4}
                      onChange={(e) => setScore({ ...score, [dim]: Number(e.target.value) })}
                      className="h-9 rounded-lg border border-[#E5E1D8] bg-white px-3 text-xs focus:border-ink focus:outline-none"
                    >
                      {[1, 2, 3, 4, 5].map((n) => (
                        <option key={n} value={n}>
                          {n} / 5
                        </option>
                      ))}
                    </select>
                    <input
                      placeholder="Rationale notes (20+ chars)..."
                      className="h-9 flex-1 min-w-[200px] rounded-lg border border-[#E5E1D8] px-3 text-xs focus:border-ink focus:outline-none"
                    />
                  </div>
                ))}
              </div>
              <div className="mt-6 flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#4A5568]">Weighted Composite Score:</span>
                  <span className="serif ml-2 text-xl font-bold text-ink">3.8 / 5.0</span>
                </div>
                <Button onClick={() => notify('Scorecard saved.')}>Save scorecard</Button>
              </div>
            </Card>
          )}

          {tab === 'Notes' && (
            <Card title="Private team diligence notes">
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={8}
                placeholder="Private evaluation remarks, partner questions, diligence summaries..."
                className="w-full rounded-lg border border-[#E5E1D8] p-3 text-xs focus:border-ink focus:outline-none"
              />
              <Button className="mt-3" onClick={() => notify('Notes saved.')}>
                Save notes
              </Button>
            </Card>
          )}

          {tab === 'Documents' && (
            <Card title="Associated data room files">
              <p className="text-xs text-[#4A5568]">
                Open the watermarked document viewer to inspect financials and cap table source files.
              </p>
              <Link
                href={`/investor/data-rooms/${deal.id}`}
                className="mt-4 inline-block text-xs font-semibold text-[#9A7A45] hover:underline"
              >
                Go to {deal.name} Data Room →
              </Link>
            </Card>
          )}

          <InvestorDisclaimer onLearnMore={() => notify('Platform disclaimer opened.')} />
        </>
      )}
    </InvestorShell>
  );
}
