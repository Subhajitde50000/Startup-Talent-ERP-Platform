'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ChartNoAxesColumn, Download, Info } from 'lucide-react';
import { InvestorShell, Card, Button } from '@/components';
import { InvestorDisclaimer } from '../investor-data';

export default function InvestorInsightsPage() {
  const [range, setRange] = useState('Last 90 days');
  const [insightTab, setInsightTab] = useState('Overview');

  return (
    <InvestorShell
      active="Insights"
      module="Deal flow"
      title="Venture ecosystem insights"
      description="Aggregated, anonymized benchmark intelligence across opted-in platform startups."
      actions={
        <div className="flex items-center gap-2">
          <label htmlFor="range-select" className="sr-only">
            Time range
          </label>
          <select
            id="range-select"
            value={range}
            onChange={(e) => setRange(e.target.value)}
            className="h-10 rounded-lg border border-[#E5E1D8] bg-white px-3 text-xs focus:border-ink focus:outline-none"
          >
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>Last 12 months</option>
          </select>
          <Button secondary onClick={() => {}}>
            <Download size={14} /> Export report
          </Button>
        </div>
      }
    >
      {({ notify }) => (
        <>
          <p className="mb-6 text-xs text-[#4A5568]">
            Aggregated platform data updated Nov 05, 2026 · Sample n = 1,240 startups · Descriptive benchmarks only, never investment forecasts.
          </p>

          {/* Sub Navigation Tabs */}
          <div className="mb-6 flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {[
              'Overview',
              'Deal flow',
              'Sectors',
              'Rounds and valuations',
              'Readiness and mentoring',
              'My activity vs platform',
            ].map((x) => (
              <button
                key={x}
                type="button"
                onClick={() => setInsightTab(x)}
                className={`min-h-10 shrink-0 rounded-lg px-4 text-xs font-semibold transition ${
                  insightTab === x
                    ? 'bg-ink text-white'
                    : 'border border-[#E5E1D8] bg-white text-[#4A5568] hover:bg-[#FAF8F4] hover:text-ink'
                }`}
              >
                {x}
              </button>
            ))}
          </div>

          {insightTab === 'Overview' && (
            <>
              {/* Stat Strip */}
              <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
                {[
                  ['Opted-in startups', '1,240'],
                  ['Investment Ready badge', '186'],
                  ['New cohort additions', '94'],
                  ['Active fundraising rounds', '112'],
                ].map(([x, y]) => (
                  <div key={x} className="rounded-xl border border-[#E5E1D8] bg-white p-5">
                    <span className="text-xs font-medium text-[#4A5568]">{x}</span>
                    <span className="serif mt-1 block text-3xl font-semibold text-ink">{y}</span>
                  </div>
                ))}
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <Card title="Startups by development stage">
                  <div className="space-y-3.5">
                    {[
                      ['Idea stage', 290],
                      ['Prototype', 410],
                      ['Early revenue', 380],
                      ['Mature scaling', 160],
                    ].map(([stage, count]) => (
                      <div key={stage} className="flex items-center gap-3 text-xs">
                        <span className="w-28 font-medium text-ink">{stage}</span>
                        <div
                          className="h-6 rounded-md bg-ink flex items-center justify-end pr-2 text-white font-bold"
                          style={{ width: `${(count / 410) * 100}%` }}
                        >
                          {count}
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="mt-4 text-xs text-[#4A5568]">
                    Platform data · Minimum cohort threshold n &ge; 10
                  </p>
                </Card>

                <Card title="Monthly ecosystem trends">
                  <ul className="space-y-3 text-xs text-ink leading-relaxed">
                    <li className="flex items-start gap-2">
                      <span className="text-[#806236] font-bold">•</span>
                      <span><b>94 new profiles</b> published by founders this month across India.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#806236] font-bold">•</span>
                      <span><b>18% increase</b> in seed-stage Fintech and Climate round launches.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#806236] font-bold">•</span>
                      <span><b>Investment Ready share</b> rose by 2.2 percentage points following mentor reviews.</span>
                    </li>
                  </ul>
                </Card>
              </div>
            </>
          )}

          {insightTab === 'My activity vs platform' && (
            <Card title="Your funnel vs platform averages (Private to you)">
              <div className="space-y-4 text-xs">
                <p className="text-ink">
                  Your engagement: <b>42 profiles reviewed</b> · <b>12 shortlisted</b> · <b>5 intro requests</b> · <b>3 data rooms</b> · <b>2 offers extended</b>
                </p>
                <div className="rounded-lg bg-[#FAF8F4] p-4 border border-[#E5E1D8]">
                  <b className="text-ink">Average response time comparison:</b>
                  <p className="mt-1 text-[#4A5568]">
                    Platform verified investor average: 2.1 days · Your response turnaround: <b>1.8 days</b>
                  </p>
                </div>
              </div>
            </Card>
          )}

          {insightTab !== 'Overview' && insightTab !== 'My activity vs platform' && (
            <Card title={insightTab}>
              <div className="flex h-36 items-end gap-3 pt-6">
                {[32, 42, 50, 58, 65, 78, 84, 95].map((v, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t bg-ink"
                    style={{ height: `${v}%` }}
                  />
                ))}
              </div>
              <p className="mt-4 text-xs text-[#4A5568]">
                Benchmarking distributions for {insightTab.toLowerCase()} across {range}.
              </p>
            </Card>
          )}

          <InvestorDisclaimer onLearnMore={() => notify('Platform disclaimer opened.')} />
        </>
      )}
    </InvestorShell>
  );
}
