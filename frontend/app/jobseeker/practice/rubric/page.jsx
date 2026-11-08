'use client';

import React from 'react';
import Link from 'next/link';
import {
  ChevronLeft,
  Award,
  CheckCircle2,
  Sparkles,
  BookOpen,
  ArrowRight,
} from 'lucide-react';
import { JobSeekerShell } from '@/components';
import {
  JobBtn,
  defaultUser,
} from '@/components/jobseeker-ui';

export default function RubricPage() {
  const criteria = [
    {
      title: 'Structural Clarity & STAR Framework',
      weight: '30%',
      desc: 'How cleanly your answer communicates the Situation, Task, Action taken, and measurable Result without meandering.',
      levels: [
        { label: 'Exceptional (90–100%)', text: 'Crisp 30-sec context setting, unambiguous personal actions, quantifiable outcomes.' },
        { label: 'Competent (70–89%)', text: 'Clear story arc; minor ambiguity on individual vs team contribution.' },
        { label: 'Developing (<70%)', text: 'Vague timelines, missing metrics, or abrupt endings.' },
      ],
    },
    {
      title: 'Domain & Technical Depth',
      weight: '35%',
      desc: 'Specificity in describing architectural trade-offs, design system tokens, tech stacks, or user research methodologies.',
      levels: [
        { label: 'Exceptional (90–100%)', text: 'Names specific token tooling, edge cases considered, and engineering collaboration models.' },
        { label: 'Competent (70–89%)', text: 'Accurate terminology with good general problem-solving rationale.' },
        { label: 'Developing (<70%)', text: 'High-level buzzwords without practical implementation depth.' },
      ],
    },
    {
      title: 'Startup Pace & Ownership Mindset',
      weight: '20%',
      desc: 'Demonstrating proactive problem solving, bias for action, and ability to operate under ambiguity.',
      levels: [
        { label: 'Exceptional (90–100%)', text: 'Shares examples of taking full ownership from discovery through post-launch iteration.' },
        { label: 'Competent (70–89%)', text: 'Collaborative team player who asks good clarifying questions.' },
        { label: 'Developing (<70%)', text: 'Passively waits for instructions or blames external blockers.' },
      ],
    },
    {
      title: 'Pacing & Conciseness',
      weight: '15%',
      desc: 'Speaking rhythm, appropriate response length (under 2.5 minutes), and low filler word frequency.',
      levels: [
        { label: 'Exceptional (90–100%)', text: '120–150 words/min, minimal verbal crutches, confident tone.' },
        { label: 'Competent (70–89%)', text: 'Conversational pace with occasional filler pauses.' },
        { label: 'Developing (<70%)', text: 'Speaks over 3 minutes or rushes rapidly without natural pauses.' },
      ],
    },
  ];

  return (
    <JobSeekerShell active="Interview practice">
      <div className="space-y-6 max-w-5xl pb-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[#6B7280]">
          <Link
            href="/jobseeker/practice"
            className="flex items-center gap-1 hover:text-[#0F1B2D]"
          >
            <ChevronLeft size={14} /> Back to Practice Hub
          </Link>
          <span>/</span>
          <span className="text-[#0F1B2D] font-medium">Scoring Rubric</span>
        </nav>

        {/* Header */}
        <header className="rounded-2xl border border-[#E5E1D8] bg-white p-6 shadow-sm flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-serif font-bold text-[#0F1B2D]">
              Interview Scoring Rubric
            </h1>
            <p className="text-xs md:text-sm text-[#6B7280] mt-1">
              Transparent evaluation standards used by the AI trainer and platform mentors to grade responses.
            </p>
          </div>

          <Link href="/jobseeker/practice/new">
            <JobBtn primary small className="flex items-center gap-1.5">
              Practice With This Rubric <ArrowRight size={13} />
            </JobBtn>
          </Link>
        </header>

        {/* Rubric Criteria Cards */}
        <div className="space-y-4">
          {criteria.map((crit, idx) => (
            <section
              key={idx}
              className="rounded-2xl border border-[#E5E1D8] bg-white p-6 shadow-sm space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#F0EBE0] pb-3">
                <h2 className="text-base font-serif font-bold text-[#0F1B2D]">
                  {idx + 1}. {crit.title}
                </h2>
                <span className="rounded-full bg-[#F3EBDD] px-2.5 py-0.5 text-xs font-semibold text-[#806236]">
                  Weight: {crit.weight}
                </span>
              </div>

              <p className="text-xs text-[#4A5568] leading-relaxed">{crit.desc}</p>

              <div className="grid gap-3 sm:grid-cols-3 pt-2">
                {crit.levels.map((lvl, lIdx) => (
                  <div
                    key={lIdx}
                    className="p-3.5 rounded-xl border border-[#E5E1D8] bg-[#FAF8F4]/50 text-xs space-y-1.5"
                  >
                    <strong
                      className={`block font-semibold ${
                        lIdx === 0
                          ? 'text-[#286749]'
                          : lIdx === 1
                          ? 'text-[#806236]'
                          : 'text-[#6B7280]'
                      }`}
                    >
                      {lvl.label}
                    </strong>
                    <p className="text-[#4A5568] leading-relaxed">{lvl.text}</p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </JobSeekerShell>
  );
}
