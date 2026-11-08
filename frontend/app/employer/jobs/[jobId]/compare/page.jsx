'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ChevronLeft,
  Columns,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { EmployerShell, EmployerBtn, StageChip } from '@/components';
import { jobs as allJobs, candidates as allCandidates } from '../../../employer-data';

export default function CompareCandidatesPage() {
  const params = useParams();
  const rawId = params?.jobId;
  const job = allJobs.find((j) => j.id === rawId) || allJobs[0];

  const compareCandidates = allCandidates.slice(0, 3);

  return (
    <EmployerShell activeNav="Hiring">
      <div className="mx-auto max-w-[1280px] space-y-6 min-w-0 pb-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[#6B7280]">
          <Link
            href={`/employer/jobs/${job.id}`}
            className="flex items-center gap-1 hover:text-[#0F1B2D]"
          >
            <ChevronLeft size={14} /> Back to {job.title} Pipeline
          </Link>
          <span>/</span>
          <span className="text-[#0F1B2D] font-medium">Compare Candidates</span>
        </nav>

        {/* Header - flex-wrap to prevent button group overflow */}
        <header className="rounded-2xl border border-[#E5E1D8] bg-white p-6 shadow-xs flex flex-wrap items-center justify-between gap-4 min-w-0">
          <div>
            <span className="text-xs font-semibold text-[#806236] uppercase tracking-wider block mb-1">
              Candidate Comparison Matrix
            </span>
            <h1 className="text-xl md:text-2xl font-serif font-bold text-[#0F1B2D]">
              Comparing Applicants for {job.title}
            </h1>
            <p className="text-xs md:text-sm text-[#6B7280] mt-1">
              Side-by-side evaluation of experience, technical assessment scores, notice periods, and salary expectations.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link href={`/employer/jobs/${job.id}`}>
              <EmployerBtn secondary small>
                Back to Pipeline
              </EmployerBtn>
            </Link>
          </div>
        </header>

        {/* Comparison Table with overflow-x-auto min-w-0 */}
        <div className="rounded-2xl border border-[#E5E1D8] bg-white overflow-hidden shadow-xs min-w-0">
          <div className="overflow-x-auto min-w-0">
            <table className="w-full text-left text-xs min-w-[620px]">
              <thead className="bg-[#FAF8F4] border-b border-[#E5E1D8]">
                <tr>
                  <th className="p-4 pl-6 text-[#6B7280] uppercase tracking-wider font-semibold w-1/4">
                    Evaluation Criteria
                  </th>
                  {compareCandidates.map((cand) => (
                    <th key={cand.id} className="p-4 font-bold text-[#0F1B2D] w-1/4">
                      <div className="flex items-center gap-2.5 mb-1">
                        <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#F3EBDD] font-bold text-xs text-[#806236]">
                          {cand.avatar || cand.name[0]}
                        </span>
                        <div>
                          <span className="text-sm block">{cand.name}</span>
                          <span className="font-normal text-[#6B7280] text-[11px] block">{cand.experience}</span>
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0EBE0] text-[#0F1B2D]">
                <tr>
                  <td className="p-4 pl-6 font-semibold text-[#6B7280] bg-[#FAF8F4]/30">ATS Match Score</td>
                  {compareCandidates.map((cand) => (
                    <td key={cand.id} className="p-4">
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#E7F3EC] px-2.5 py-0.5 text-xs font-bold text-[#286749]">
                        <CheckCircle2 size={12} /> {cand.matchScore}% Match
                      </span>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 pl-6 font-semibold text-[#6B7280] bg-[#FAF8F4]/30">Current Pipeline Stage</td>
                  {compareCandidates.map((cand) => (
                    <td key={cand.id} className="p-4">
                      <StageChip stage={cand.stage || 'Review'} />
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 pl-6 font-semibold text-[#6B7280] bg-[#FAF8F4]/30">Notice Period</td>
                  {compareCandidates.map((cand) => (
                    <td key={cand.id} className="p-4">
                      {cand.noticePeriod || '30 days'}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 pl-6 font-semibold text-[#6B7280] bg-[#FAF8F4]/30">Expected CTC</td>
                  {compareCandidates.map((cand) => (
                    <td key={cand.id} className="p-4 font-medium">
                      {cand.expectedSalary || '₹25,00,000 / yr'}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 pl-6 font-semibold text-[#6B7280] bg-[#FAF8F4]/30">Key Core Skills</td>
                  {compareCandidates.map((cand) => (
                    <td key={cand.id} className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {(cand.skills || ['Design Systems', 'Figma', 'React']).map((s) => (
                          <span key={s} className="rounded-md bg-[#FAF8F4] border border-[#E5E1D8] px-2 py-0.5 text-[11px]">
                            {s}
                          </span>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 pl-6 font-semibold text-[#6B7280] bg-[#FAF8F4]/30">Action</td>
                  {compareCandidates.map((cand) => (
                    <td key={cand.id} className="p-4">
                      <Link href={`/employer/jobs/${job.id}/applicants/${cand.id}`}>
                        <EmployerBtn primary small className="w-full">
                          Full Profile
                        </EmployerBtn>
                      </Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </EmployerShell>
  );
}
