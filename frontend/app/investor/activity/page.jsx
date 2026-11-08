'use client';
import { useState } from 'react';
import Link from 'next/link';
import { FileText, Download, X } from 'lucide-react';
import { InvestorShell, Card, Button } from '@/components';
import { logs, InvestorDisclaimer } from '../investor-data';

export default function InvestorActivityPage() {
  const [activityTab, setActivityTab] = useState('All activity');
  const [query, setQuery] = useState('');
  const [outcomeFilter, setOutcomeFilter] = useState('All outcomes');
  const [detail, setDetail] = useState(null);

  const filteredLogs = logs.filter(
    (r) =>
      (!query || r.join(' ').toLowerCase().includes(query.toLowerCase())) &&
      (outcomeFilter === 'All outcomes' || r[5] === outcomeFilter)
  );

  return (
    <InvestorShell
      active="Activity"
      module="Deal flow"
      title="Activity & compliance audit log"
      description="A tamper-evident, readable record of deal views, NDA signatures and document accesses."
      actions={
        <Button secondary onClick={() => {}}>
          <Download size={14} /> Export audit log
        </Button>
      }
    >
      {({ notify }) => (
        <>
          <div className="mb-6 rounded-lg bg-[#FAF8F4] p-3 text-xs text-[#4A5568] border border-[#E5E1D8]">
            This security audit log is immutable and cannot be edited or deleted. It ensures full NDA compliance and accountability.
          </div>

          {/* Stat Strip */}
          <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {[
              ['Events · 30 days', '482'],
              ['Documents viewed', '63'],
              ['NDAs executed', '4'],
              ['Active browser sessions', '2'],
            ].map(([x, y]) => (
              <div key={x} className="rounded-xl border border-[#E5E1D8] bg-white p-5">
                <span className="text-xs font-medium text-[#4A5568]">{x}</span>
                <span className="serif mt-1 block text-3xl font-semibold text-ink">{y}</span>
              </div>
            ))}
          </div>

          {/* Sub Navigation Tabs */}
          <div className="mb-6 flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {[
              'All activity',
              'Data rooms and documents',
              'Offers and commitments',
              'Security',
              'Team',
            ].map((x) => (
              <button
                key={x}
                type="button"
                onClick={() => setActivityTab(x)}
                className={`min-h-10 shrink-0 rounded-lg px-4 text-xs font-semibold transition ${
                  activityTab === x
                    ? 'bg-ink text-white'
                    : 'border border-[#E5E1D8] bg-white text-[#4A5568] hover:bg-[#FAF8F4] hover:text-ink'
                }`}
              >
                {x}
              </button>
            ))}
          </div>

          {/* Search & Filter Bar */}
          <div className="mb-4 flex flex-wrap gap-3">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search audit actions, companies, users..."
              className="h-10 w-72 rounded-lg border border-[#E5E1D8] bg-white px-3 text-xs focus:border-ink focus:outline-none"
            />
            <select
              value={outcomeFilter}
              onChange={(e) => setOutcomeFilter(e.target.value)}
              className="h-10 rounded-lg border border-[#E5E1D8] bg-white px-3 text-xs focus:border-ink focus:outline-none"
            >
              <option>All outcomes</option>
              <option>Success</option>
              <option>Blocked</option>
              <option>Failed</option>
            </select>
          </div>

          {/* Table Card */}
          <Card title="Audit events">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px] text-left text-xs">
                <thead>
                  <tr className="border-b border-[#E5E1D8] text-[#4A5568]">
                    {['Timestamp (IST)', 'Actor', 'Category', 'Action details', 'Target / Company', 'Outcome', 'Client context'].map((x) => (
                      <th key={x} className="py-3 font-semibold">
                        {x}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E1D8]">
                  {filteredLogs.map((r, i) => (
                    <tr
                      key={i}
                      onClick={() => setDetail(r)}
                      className="cursor-pointer hover:bg-[#FAF8F4] transition"
                    >
                      <td className="py-3 font-medium text-ink">{r[0]}</td>
                      <td className="py-3">{r[1]}</td>
                      <td className="py-3">
                        <span className="rounded bg-[#FAF8F4] px-2 py-0.5 text-xs font-medium text-ink">
                          {r[2]}
                        </span>
                      </td>
                      <td className="py-3 font-semibold text-ink">{r[3]}</td>
                      <td className="py-3 text-[#806236]">{r[4]}</td>
                      <td className="py-3">
                        <span
                          className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                            r[5] === 'Success'
                              ? 'bg-[#E7F3EC] text-[#286749]'
                              : 'bg-red-50 text-red-700'
                          }`}
                        >
                          {r[5]}
                        </span>
                      </td>
                      <td className="py-3 text-[#4A5568]">{r[6]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-[#E5E1D8] pt-3">
              <span className="text-xs text-[#4A5568]">Showing {filteredLogs.length} recent events</span>
              <button
                type="button"
                onClick={() => notify('Loading historical logs...')}
                className="text-xs font-semibold text-[#9A7A45] hover:underline"
              >
                Load older records →
              </button>
            </div>
          </Card>

          <InvestorDisclaimer onLearnMore={() => notify('Platform disclaimer opened.')} />

          {/* Event Detail Modal */}
          {detail && (
            <div className="fixed inset-0 z-50 grid place-items-center bg-ink/50 p-4 backdrop-blur-sm">
              <section
                role="dialog"
                aria-modal="true"
                className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
              >
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="serif text-xl font-bold text-ink">Audit record details</h2>
                  <button type="button" onClick={() => setDetail(null)}>
                    <X size={18} />
                  </button>
                </div>
                <div className="space-y-2 text-xs">
                  {detail.map((x, i) => (
                    <div key={i} className="flex justify-between border-b border-[#E5E1D8] py-2">
                      <b className="text-[#4A5568]">
                        {['Timestamp', 'Actor', 'Category', 'Action', 'Target', 'Outcome', 'Context'][i]}:
                      </b>
                      <span className="font-semibold text-ink text-right">{x}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex justify-end">
                  <Button onClick={() => setDetail(null)}>Close</Button>
                </div>
              </section>
            </div>
          )}
        </>
      )}
    </InvestorShell>
  );
}
