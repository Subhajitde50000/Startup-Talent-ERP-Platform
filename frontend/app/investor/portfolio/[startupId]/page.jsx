'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Briefcase, FileText, Send, Calendar, X } from 'lucide-react';
import { InvestorShell, Card, Button } from '@/components';
import { holdings, InvestorDisclaimer } from '../../investor-data';

export default function InvestorPortfolioCompanyPage({ params }) {
  const startupId = params?.startupId || 'acme';
  const holding = holdings.find((h) => h.id === startupId) || holdings[0];

  const [portfolioTab, setPortfolioTab] = useState('Overview');
  const [notes, setNotes] = useState('');

  return (
    <InvestorShell
      active="Portfolio"
      module="Deal flow"
      title={`${holding.name} · Portfolio view`}
      description="Updates, reports and performance data shared by the founding team."
      backHref="/investor/portfolio"
      backLabel="← Back to Portfolio"
      actions={
        <div className="flex items-center gap-2">
          <Link
            href="/investor/portfolio"
            className="inline-flex min-h-10 items-center rounded-lg border border-[#E5E1D8] bg-white px-3.5 text-xs font-semibold text-ink hover:bg-[#FAF8F4]"
          >
            ← Portfolio
          </Link>
          <Button secondary onClick={() => {}}>
            Request update
          </Button>
          <Link
            href="/investor/messages"
            className="inline-flex min-h-10 items-center rounded-lg bg-ink px-4 text-xs font-semibold text-white hover:bg-[#1C2B42]"
          >
            Message founder
          </Link>
        </div>
      }
    >
      {({ notify }) => (
        <>
          <div className="mb-6 rounded-lg bg-[#FAF8F4] p-3 text-xs text-[#4A5568] border border-[#E5E1D8]">
            Showing data {holding.name} shares with active investors · Last updated {holding.update}.
          </div>

          {/* Sub Navigation Tabs */}
          <div className="mb-6 flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {[
              'Overview',
              'Updates and reports',
              'Metrics',
              'Round and cap table',
              'Documents',
              'Meetings and notes',
            ].map((x) => (
              <button
                key={x}
                type="button"
                onClick={() => setPortfolioTab(x)}
                className={`min-h-10 shrink-0 rounded-lg px-4 text-xs font-semibold transition ${
                  portfolioTab === x
                    ? 'bg-ink text-white'
                    : 'border border-[#E5E1D8] bg-white text-[#4A5568] hover:bg-[#FAF8F4] hover:text-ink'
                }`}
              >
                {x}
              </button>
            ))}
          </div>

          <div className="grid items-start gap-6 xl:grid-cols-3">
            <div className="space-y-6 xl:col-span-2">
              {portfolioTab === 'Overview' && (
                <>
                  <Card title="Latest founder update">
                    <p className="text-sm leading-relaxed text-ink">{holding.highlight}</p>
                    <div className="mt-4 grid grid-cols-3 gap-3 text-xs border-t border-[#E5E1D8] pt-3">
                      <div>
                        <span className="text-[#4A5568]">Highlights</span>
                        <b className="mt-0.5 block text-ink">2 milestones reached</b>
                      </div>
                      <div>
                        <span className="text-[#4A5568]">Key challenges</span>
                        <b className="mt-0.5 block text-ink">Senior hire search</b>
                      </div>
                      <div>
                        <span className="text-[#4A5568]">Founder asks</span>
                        <b className="mt-0.5 block text-ink">Intro to enterprise leads</b>
                      </div>
                    </div>
                  </Card>

                  <Card title="Key performance metrics">
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                      {[
                        ['MRR', holding.mrr],
                        ['Paying Customers', '126'],
                        ['Runway', holding.runway],
                        ['Team Count', '8'],
                      ].map(([label, val]) => (
                        <div key={label} className="rounded-lg bg-[#FAF8F4] p-3 border border-[#E5E1D8]">
                          <span className="text-xs text-[#4A5568]">{label}</span>
                          <b className="serif mt-1 block text-xl font-bold text-ink">{val}</b>
                          <span className="text-[10px] text-[#9A7A45]">Verified</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                </>
              )}

              {portfolioTab === 'Updates and reports' && (
                <Card title="Quarterly reports archive">
                  <div className="space-y-3 text-xs">
                    <div className="flex items-center justify-between border-b border-[#E5E1D8] pb-3">
                      <div>
                        <b className="text-ink">Q3 2026 Board Update Pack.pdf</b>
                        <span className="block text-[#4A5568]">Published Oct 28, 2026 · Confidential</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => notify('Previewing investor report.')}
                        className="font-semibold text-[#9A7A45] hover:underline"
                      >
                        Preview PDF
                      </button>
                    </div>
                  </div>
                </Card>
              )}

              {portfolioTab === 'Metrics' && (
                <Card title="Monthly Recurring Revenue trend">
                  <div className="flex h-36 items-end gap-3 pt-6">
                    {[28, 36, 48, 54, 68, 77, 85, 100].map((v, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-t bg-ink"
                        style={{ height: `${v}%` }}
                        title={`Month ${i + 1}: ${v}%`}
                      />
                    ))}
                  </div>
                  <p className="mt-4 text-xs text-[#4A5568]">
                    Startup-reported traction figures across trailing 8 months.
                  </p>
                </Card>
              )}

              {portfolioTab === 'Round and cap table' && (
                <Card title="Capitalization summary">
                  <p className="text-xs text-ink font-medium">
                    Your holding: {holding.invested} in {holding.instrument} · {holding.ownership} estimated ownership
                  </p>
                  <div className="mt-4 flex h-7 overflow-hidden rounded-lg">
                    <div className="w-1/2 bg-ink" title="Founders 50%" />
                    <div className="w-1/4 bg-[#B8955A]" title="ESOP 25%" />
                    <div className="w-1/4 bg-[#A0A7B4]" title="Investors 25%" />
                  </div>
                </Card>
              )}

              {portfolioTab === 'Documents' && (
                <Card title="Executed investment documents">
                  <div className="flex items-center justify-between border-b border-[#E5E1D8] pb-3 text-xs">
                    <div>
                      <b className="text-ink">Executed_SAFE_Agreement.pdf</b>
                      <span className="block text-[#4A5568]">Countersigned by founders · Stored securely</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => notify('Document downloaded.')}
                      className="font-semibold text-[#9A7A45] hover:underline"
                    >
                      Download
                    </button>
                  </div>
                </Card>
              )}

              {portfolioTab === 'Meetings and notes' && (
                <Card title="Private notes & check-ins">
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={6}
                    placeholder="Private partner notes, advisory feedback, check-in memos..."
                    className="w-full rounded-lg border border-[#E5E1D8] p-3 text-xs focus:border-ink focus:outline-none"
                  />
                  <Button className="mt-3" onClick={() => notify('Notes saved.')}>
                    Save note
                  </Button>
                </Card>
              )}
            </div>

            {/* Sidebar quick facts */}
            <aside className="space-y-6">
              <Card title="Investment snapshot">
                <dl className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <dt className="text-[#4A5568]">Status</dt>
                    <dd className="font-semibold text-[#286749]">{holding.status}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-[#4A5568]">Invested</dt>
                    <dd className="font-semibold text-ink">{holding.invested}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-[#4A5568]">Ownership</dt>
                    <dd className="font-semibold text-ink">{holding.ownership}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-[#4A5568]">Instrument</dt>
                    <dd className="font-semibold text-ink">{holding.instrument}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-[#4A5568]">Date</dt>
                    <dd className="font-semibold text-ink">{holding.date}</dd>
                  </div>
                </dl>
              </Card>

              <Card title="Upcoming events">
                <p className="text-xs text-ink font-medium">Next formal update expected: Nov 30, 2026</p>
                <p className="mt-1 text-xs text-[#4A5568]">Pro-rata rights window opens: Dec 15, 2026</p>
              </Card>
            </aside>
          </div>

          <InvestorDisclaimer onLearnMore={() => notify('Platform disclaimer opened.')} />
        </>
      )}
    </InvestorShell>
  );
}
