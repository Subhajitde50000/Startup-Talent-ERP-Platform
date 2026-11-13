'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ChevronLeft,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Search,
  ArrowRight,
} from 'lucide-react';
import { JobSeekerShell } from '@/components';
import {
  JobBtn,
  defaultUser,
} from '@/components/jobseeker-ui';
import { resumes, jobs } from '../../../jobseeker-data';

export default function AtsCheckPage() {
  const params = useParams();
  const rawId = params?.resumeId;
  const resume = resumes.find((r) => r.id === rawId) || resumes[0];
  const [selectedJobId, setSelectedJobId] = useState(jobs[0]?.id || 'senior-product-designer');

  const selectedJob = jobs.find((j) => j.id === selectedJobId) || jobs[0];
  const atsScore = resume.score || 85;

  return (
    <JobSeekerShell active="Resumes">
      <div className="space-y-6 max-w-5xl pb-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[#6B7280]">
          <Link
            href={`/jobseeker/resumes/${resume.id}`}
            className="flex items-center gap-1 hover:text-[#0F1B2D]"
          >
            <ChevronLeft size={14} /> Back to Editor
          </Link>
          <span>/</span>
          <span className="text-[#0F1B2D] font-medium">ATS Check</span>
        </nav>

        {/* Header */}
        <header className="rounded-2xl border border-[#E5E1D8] bg-white p-6 shadow-sm flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-xl md:text-2xl font-serif font-bold text-[#0F1B2D]">
                ATS Compatibility Report
              </h1>
            </div>
            <p className="text-xs md:text-sm text-[#6B7280]">
              Analysis for <strong className="text-[#0F1B2D]">{resume.name}</strong> against startup hiring filters.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link href={`/jobseeker/resumes/${resume.id}/tailor?job=${selectedJob.id}`}>
              <JobBtn primary small className="flex items-center gap-1.5">
                <Sparkles size={13} /> Auto-Tailor Keywords
              </JobBtn>
            </Link>
          </div>
        </header>

        {/* Target Job Selector */}
        <div className="rounded-xl border border-[#E5E1D8] bg-[#FAF8F4] p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-[#6B7280]">Scan against specific job:</span>
            <select
              aria-label="Select job to check against"
              value={selectedJobId}
              onChange={(e) => setSelectedJobId(e.target.value)}
              className="h-8 rounded-lg border border-[#E5E1D8] bg-white px-2.5 text-xs text-[#0F1B2D] focus:border-[#B8955A] focus:outline-none"
            >
              {jobs.map((j) => (
                <option key={j.id} value={j.id}>
                  {j.title} · {j.company?.name || j.company}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Score and Findings */}
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Big Score Card */}
          <div className="lg:col-span-4 rounded-2xl border border-[#E5E1D8] bg-white p-6 shadow-sm text-center space-y-4">
            <span className="text-xs uppercase font-bold tracking-wider text-[#6B7280] block">
              Overall ATS Score
            </span>
            <div className="grid h-28 w-28 mx-auto place-items-center rounded-full border-8 border-[#286749] text-2xl font-serif font-bold text-[#0F1B2D]">
              {atsScore}%
            </div>
            <p className="text-xs text-[#286749] font-semibold">
              High ATS Readability — Likely to pass 92% of candidate tracking screeners.
            </p>
            <div className="pt-2 text-xs text-[#6B7280] space-y-1.5 border-t border-[#F0EBE0] text-left">
              <div className="flex justify-between">
                <span>Keyword Match:</span>
                <strong className="text-[#0F1B2D]">88%</strong>
              </div>
              <div className="flex justify-between">
                <span>Layout & Formatting:</span>
                <strong className="text-[#286749]">100% (Clean Text)</strong>
              </div>
              <div className="flex justify-between">
                <span>Section Headers:</span>
                <strong className="text-[#286749]">Standardized</strong>
              </div>
            </div>
          </div>

          {/* Breakdown & Recommendations */}
          <div className="lg:col-span-8 space-y-4">
            <section className="rounded-2xl border border-[#E5E1D8] bg-white p-6 shadow-sm space-y-4">
              <h2 className="text-base font-serif font-bold text-[#0F1B2D]">
                Keyword Match Analysis
              </h2>
              <div className="space-y-3 text-xs">
                <div>
                  <span className="font-semibold text-[#286749] block mb-1">
                    ✓ Matched Keywords Found in Resume
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      'Design Systems',
                      'Figma',
                      'User Research',
                      'Prototyping',
                      'B2B SaaS',
                      'Cross-functional leadership',
                    ].map((kw) => (
                      <span
                        key={kw}
                        className="rounded-full bg-[#E7F3EC] border border-[#CDE5D7] px-2.5 py-0.5 text-xs text-[#286749]"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <span className="font-semibold text-[#B7791F] block mb-1">
                    ⚠ Missing Keywords Found in Job Description
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {['Design Tokens Studio', 'Accessibility (WCAG 2.1)', 'Framer'].map((kw) => (
                      <span
                        key={kw}
                        className="rounded-full bg-[#FFF8E8] border border-[#D4C3A3] px-2.5 py-0.5 text-xs text-[#806236]"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-[#E5E1D8] bg-white p-6 shadow-sm space-y-3">
              <h2 className="text-base font-serif font-bold text-[#0F1B2D]">
                Recommended Adjustments
              </h2>
              <div className="space-y-2 text-xs text-[#4A5568]">
                <div className="p-3 rounded-lg border border-[#E5E1D8] bg-[#FAF8F4] flex items-start gap-2">
                  <Sparkles size={15} className="text-[#806236] shrink-0 mt-0.5" />
                  <span>
                    Add <strong>"WCAG 2.1 Accessibility"</strong> to your Skills section to match the job requirement.
                  </span>
                </div>
                <div className="p-3 rounded-lg border border-[#E5E1D8] bg-[#FAF8F4] flex items-start gap-2">
                  <Sparkles size={15} className="text-[#806236] shrink-0 mt-0.5" />
                  <span>
                    Mention token synchronization tools (e.g. <strong>Tokens Studio</strong>) in your Lead Product Designer bullet points.
                  </span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </JobSeekerShell>
  );
}
