'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Award,
  Sparkles,
  TrendingUp,
  Shield,
  Play,
  Layers,
  CheckCircle2,
  Share2,
} from 'lucide-react';
import { JobSeekerShell } from '@/components';
import {
  JobBtn,
  defaultUser,
} from '@/components/jobseeker-ui';

export default function ReadinessPage() {
  const [shareEnabled, setShareEnabled] = useState(false);

  return (
    <JobSeekerShell active="Interview practice">
      <div className="space-y-6 max-w-5xl pb-10">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-serif font-bold text-[#0F1B2D]">
              Job Readiness & Verification
            </h1>
            <p className="text-xs md:text-sm text-[#6B7280] mt-1">
              A composite benchmark of your practical interview readiness across 5 verified core competencies.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/jobseeker/practice/new">
              <JobBtn primary small className="flex items-center gap-1.5">
                <Play size={13} /> Practice to Boost Score
              </JobBtn>
            </Link>
          </div>
        </div>

        {/* Hero Score Banner */}
        <header className="rounded-2xl border border-[#E5E1D8] bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="grid h-20 w-20 place-items-center rounded-2xl bg-[#E7F3EC] text-2xl font-serif font-bold text-[#286749]">
                78%
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-xl font-serif font-bold text-[#0F1B2D]">
                    Readiness Level: Solid
                  </h2>
                  <span className="rounded-full bg-[#E7F3EC] px-2.5 py-0.5 text-xs font-semibold text-[#286749]">
                    ▲ 5% this month
                  </span>
                </div>
                <p className="text-xs text-[#6B7280]">
                  Based on 6 practice sessions and verified background skills.
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-[#E5E1D8] bg-[#FAF8F4] p-4 text-xs space-y-2 max-w-xs">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#0F1B2D]">Profile Readiness Badge</span>
                <input
                  type="checkbox"
                  checked={shareEnabled}
                  onChange={(e) => setShareEnabled(e.target.checked)}
                  className="h-4 w-4 rounded border-[#E5E1D8] text-[#B8955A] focus:ring-[#B8955A]"
                />
              </div>
              <p className="text-[#6B7280] leading-relaxed">
                When enabled, verified startups see your "Interview Ready" badge on direct applications.
              </p>
            </div>
          </div>
        </header>

        {/* Competencies Breakdown */}
        <section className="rounded-2xl border border-[#E5E1D8] bg-white p-6 shadow-sm space-y-5">
          <h2 className="text-base font-serif font-bold text-[#0F1B2D]">
            Competency Breakdown
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { skill: 'Design Systems & Tokens', score: 88, status: 'Advanced' },
              { skill: 'Behavioral STAR Communication', score: 82, status: 'Solid' },
              { skill: 'UX Research & Discovery', score: 78, status: 'Solid' },
              { skill: 'Frontend & Handoff Collaboration', score: 75, status: 'Competent' },
              { skill: 'Founder Alignment & Commercial Sense', score: 70, status: 'Developing' },
            ].map((comp, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-[#E5E1D8] bg-[#FAF8F4]/50 space-y-2 text-xs"
              >
                <div className="flex justify-between items-center">
                  <strong className="text-[#0F1B2D] text-sm">{comp.skill}</strong>
                  <span className="font-bold text-[#286749]">{comp.score}%</span>
                </div>
                <div className="h-2 rounded-full bg-white border border-[#E5E1D8] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#B8955A]"
                    style={{ width: `${comp.score}%` }}
                  />
                </div>
                <div className="flex justify-between items-center text-[#6B7280]">
                  <span>Rating: {comp.status}</span>
                  <Link
                    href={`/jobseeker/practice/drills`}
                    className="text-[#9A7A45] hover:underline font-medium"
                  >
                    Drill skill →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Disclaimer */}
        <div className="rounded-xl border border-[#D4C3A3] bg-[#F3EBDD]/40 p-4 text-xs text-[#806236] flex items-start gap-2.5">
          <Shield size={16} className="shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            The platform Readiness Index is an objective preparation diagnostic. It helps candidates identify blind spots before live interviews; each employer evaluates candidates independently against their unique requirements.
          </p>
        </div>
      </div>
    </JobSeekerShell>
  );
}
