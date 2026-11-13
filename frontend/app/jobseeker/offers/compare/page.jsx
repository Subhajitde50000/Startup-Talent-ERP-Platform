'use client';

import React from 'react';
import Link from 'next/link';
import {
  ChevronLeft,
  Columns,
  Check,
  CheckCircle2,
  DollarSign,
  ArrowRight,
} from 'lucide-react';
import { JobSeekerShell } from '@/components';
import {
  JobBtn,
  defaultUser,
} from '@/components/jobseeker-ui';
import { offers } from '../../jobseeker-data';

export default function CompareOffersPage() {
  const compareList = offers.slice(0, 3);

  return (
    <JobSeekerShell active="Offers">
      <div className="space-y-6 max-w-6xl">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[#6B7280]">
          <Link
            href="/jobseeker/offers"
            className="flex items-center gap-1 hover:text-[#0F1B2D]"
          >
            <ChevronLeft size={14} /> Back to Offers
          </Link>
          <span>/</span>
          <span className="text-[#0F1B2D] font-medium">Compare Offers</span>
        </nav>

        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-serif font-bold text-[#0F1B2D]">
              Offer Comparison Matrix
            </h1>
            <p className="text-xs md:text-sm text-[#6B7280] mt-1">
              Compare base salaries, bonus pools, equity grants, and working conditions side-by-side.
            </p>
          </div>
        </div>

        {/* Comparison Table with overflow-x-auto */}
        <div className="rounded-2xl border border-[#E5E1D8] bg-white overflow-hidden shadow-sm">
          <div className="overflow-x-auto min-w-0">
            <table className="w-full text-left text-xs min-w-[640px]">
              <thead className="bg-[#FAF8F4] border-b border-[#E5E1D8]">
                <tr>
                  <th className="p-4 pl-6 text-[#6B7280] uppercase tracking-wider font-semibold w-1/4">
                    Comparison Criteria
                  </th>
                  {compareList.map((offer) => (
                    <th key={offer.id} className="p-4 font-bold text-[#0F1B2D] w-1/4">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="grid h-7 w-7 place-items-center rounded bg-[#F3EBDD] font-bold text-xs text-[#806236]">
                          {offer.logo || offer.company?.[0] || 'O'}
                        </span>
                        <span className="text-sm">{offer.company}</span>
                      </div>
                      <span className="font-normal text-[#6B7280] block truncate">{offer.title}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0EBE0] text-[#0F1B2D]">
                <tr>
                  <td className="p-4 pl-6 font-semibold text-[#6B7280] bg-[#FAF8F4]/30">Annual Base CTC</td>
                  {compareList.map((offer) => (
                    <td key={offer.id} className="p-4 font-bold text-sm text-[#0F1B2D]">
                      {offer.basePay}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 pl-6 font-semibold text-[#6B7280] bg-[#FAF8F4]/30">Variable Bonus</td>
                  {compareList.map((offer) => (
                    <td key={offer.id} className="p-4">
                      {offer.bonus || '10% Target'}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 pl-6 font-semibold text-[#6B7280] bg-[#FAF8F4]/30">Equity (ESOP)</td>
                  {compareList.map((offer) => (
                    <td key={offer.id} className="p-4 font-medium text-[#806236]">
                      {offer.equity || '0.15% (4-yr vest)'}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 pl-6 font-semibold text-[#6B7280] bg-[#FAF8F4]/30">Work Model</td>
                  {compareList.map((offer) => (
                    <td key={offer.id} className="p-4">
                      {offer.mode || 'Hybrid / Remote'}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 pl-6 font-semibold text-[#6B7280] bg-[#FAF8F4]/30">Annual PTO</td>
                  {compareList.map((offer) => (
                    <td key={offer.id} className="p-4">
                      24 Days + Public Holidays
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 pl-6 font-semibold text-[#6B7280] bg-[#FAF8F4]/30">Health Insurance</td>
                  {compareList.map((offer) => (
                    <td key={offer.id} className="p-4">
                      ₹5,00,000 Family Floater
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 pl-6 font-semibold text-[#6B7280] bg-[#FAF8F4]/30">Actions</td>
                  {compareList.map((offer) => (
                    <td key={offer.id} className="p-4">
                      <Link href={`/jobseeker/offers/${offer.id}`}>
                        <JobBtn primary small className="w-full">
                          View Details
                        </JobBtn>
                      </Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </JobSeekerShell>
  );
}
