'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Download, Plus } from 'lucide-react';
import { InvestorShell, Card, Button } from '@/components';
import { deals, InvestorDisclaimer } from '../investor-data';

export default function InvestorComparePage() {
  const comparisonRows = [
    ['Stage', 'Prototype', 'Idea', 'Early revenue'],
    ['Sector', 'Fintech · SaaS', 'Climate · Agriculture', 'Fintech · Payments'],
    ['Readiness', '82 · Mentor-verified', '76 · Mentor-verified', '68 · Calculated'],
    ['MRR', '₹4.8L · Startup-reported', 'Not shared', '₹12L · Startup-reported'],
    ['Growth MoM', '12%', 'Not shared', '18%'],
    ['Customers', '126', 'Not shared', 'Not shared'],
    ['Raise', '₹2 Cr seed', '₹75L pre-seed', '₹4 Cr seed'],
    ['Committed', '40%', '18%', '55%'],
    ['Data room', 'Access granted', 'NDA pending', 'Requested'],
    ['Diligence progress', '62%', '18%', '0%'],
    ['Your scorecard', '3.8 / 5', 'Not scored', 'Not scored'],
    ['Your pipeline', 'Diligence', 'Data room', 'Meeting held'],
  ];

  return (
    <InvestorShell
      active="Pipeline"
      module="Deal flow"
      title="Compare startups"
      description="Review shared facts and readiness metrics side-by-side using the same objective criteria."
      actions={
        <div className="flex flex-wrap items-center gap-2">
          <Button secondary onClick={() => {}}>
            + Add startup
          </Button>
          <Button secondary onClick={() => {}}>
            <Download size={14} /> Export comparison
          </Button>
        </div>
      }
    >
      {({ notify }) => (
        <>
          <div className="mb-6 rounded-lg bg-[#FFF8E8] p-3 text-xs text-[#806236] border border-[#E7D4B0]">
            These startups are at different stages and operate in different sectors. Metric comparability is subject to data disclosed by founders.
          </div>

          <div className="overflow-x-auto rounded-xl border border-[#E5E1D8] bg-white">
            <table className="w-full min-w-[850px] text-left text-xs">
              <thead>
                <tr className="sticky top-0 bg-[#F3EBDD] text-ink">
                  <th className="p-3 font-semibold text-xs">Criteria</th>
                  {deals.slice(0, 3).map((d) => (
                    <th key={d.id} className="p-3 font-semibold text-xs">
                      <Link
                        href={`/investor/startups/${d.id}`}
                        className="text-sm font-bold text-ink hover:underline"
                      >
                        {d.logo} {d.name}
                      </Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E1D8]">
                {comparisonRows.map((r) => (
                  <tr key={r[0]} className="hover:bg-[#FAF8F4]/50">
                    <th className="p-3 font-medium text-[#4A5568]">{r[0]}</th>
                    {r.slice(1).map((val, i) => (
                      <td key={i} className="p-3 text-ink">
                        {val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-xs text-[#4A5568]">
            Data shown only where startups explicitly opted in to share it with verified investors.
          </p>

          <InvestorDisclaimer onLearnMore={() => notify('Platform disclaimer opened.')} />
        </>
      )}
    </InvestorShell>
  );
}
