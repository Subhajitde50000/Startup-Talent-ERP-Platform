'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Mic,
  Sparkles,
  Play,
  RotateCcw,
  Clock,
  Award,
  ChevronRight,
  TrendingUp,
  FileCheck,
  CheckCircle2,
} from 'lucide-react';
import { JobSeekerShell } from '@/components';
import {
  JobBtn,
  defaultUser,
} from '@/components/jobseeker-ui';
import { practiceSessions, drills } from '../jobseeker-data';

export default function TrainerHomePage() {
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <JobSeekerShell active="Interview practice">
      <div className="space-y-6 max-w-5xl pb-10">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-serif font-bold text-[#0F1B2D]">
              AI Interview Trainer
            </h1>
            <p className="text-xs md:text-sm text-[#6B7280] mt-1">
              Simulate high-stakes founder interviews, practice voice responses, and get instant rubric scoring.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/jobseeker/practice/new">
              <JobBtn primary small className="flex items-center gap-1.5">
                <Play size={14} /> Start New Session
              </JobBtn>
            </Link>
            <Link href="/jobseeker/practice/drills">
              <JobBtn secondary small>
                Quick Drills
              </JobBtn>
            </Link>
          </div>
        </div>

        {/* Metric Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="rounded-xl border border-[#E5E1D8] bg-white p-4">
            <span className="text-xs text-[#6B7280]">Sessions Completed</span>
            <div className="mt-1 text-2xl font-serif font-bold text-[#0F1B2D]">
              {practiceSessions.length}
            </div>
            <span className="text-xs text-[#286749]">▲ 2 this week</span>
          </div>
          <div className="rounded-xl border border-[#E5E1D8] bg-white p-4">
            <span className="text-xs text-[#6B7280]">Average Rubric Score</span>
            <div className="mt-1 text-2xl font-serif font-bold text-[#806236]">78%</div>
            <span className="text-xs text-[#286749]">Top 15th percentile</span>
          </div>
          <div className="rounded-xl border border-[#E5E1D8] bg-white p-4">
            <span className="text-xs text-[#6B7280]">Practice Time</span>
            <div className="mt-1 text-2xl font-serif font-bold text-[#0F1B2D]">3.5 hrs</div>
            <span className="text-xs text-[#6B7280]">Across 18 questions</span>
          </div>
          <div className="rounded-xl border border-[#E5E1D8] bg-white p-4">
            <span className="text-xs text-[#6B7280]">Readiness Level</span>
            <div className="mt-1 text-2xl font-serif font-bold text-[#286749]">Solid</div>
            <Link href="/jobseeker/readiness" className="text-xs text-[#9A7A45] hover:underline font-medium">
              View breakdown →
            </Link>
          </div>
        </div>

        {/* Quick Nav sub-tabs */}
        <div className="flex items-center gap-2 border-b border-[#E5E1D8] pb-2 text-xs">
          <Link
            href="/jobseeker/practice"
            className="px-3.5 py-1.5 rounded-lg bg-[#0F1B2D] text-white font-medium"
          >
            Practice Hub
          </Link>
          <Link
            href="/jobseeker/practice/drills"
            className="px-3.5 py-1.5 rounded-lg text-[#4A5568] hover:bg-[#FAF8F4] font-medium"
          >
            Skill Drills
          </Link>
          <Link
            href="/jobseeker/practice/history"
            className="px-3.5 py-1.5 rounded-lg text-[#4A5568] hover:bg-[#FAF8F4] font-medium"
          >
            Past Sessions
          </Link>
          <Link
            href="/jobseeker/practice/rubric"
            className="px-3.5 py-1.5 rounded-lg text-[#4A5568] hover:bg-[#FAF8F4] font-medium"
          >
            Scoring Rubric
          </Link>
          <Link
            href="/jobseeker/readiness"
            className="px-3.5 py-1.5 rounded-lg text-[#4A5568] hover:bg-[#FAF8F4] font-medium"
          >
            Readiness Index
          </Link>
        </div>

        {/* Main 2-column Hub Content */}
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Recent Practice Sessions */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-serif font-bold text-[#0F1B2D]">
                Recent Practice Recordings
              </h2>
              <Link href="/jobseeker/practice/history" className="text-xs text-[#9A7A45] hover:underline font-semibold">
                View all ({practiceSessions.length})
              </Link>
            </div>

            <div className="space-y-3">
              {practiceSessions.map((session) => (
                <div
                  key={session.id}
                  className="rounded-xl border border-[#E5E1D8] bg-white p-5 shadow-sm space-y-3"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-semibold text-[#0F1B2D]">{session.role}</h3>
                        <span className="rounded-full bg-[#E7F3EC] px-2 py-0.5 text-xs text-[#286749] font-medium">
                          Score: {session.score}%
                        </span>
                      </div>
                      <p className="text-xs text-[#6B7280]">
                        {session.type} · {session.duration} · {session.date}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link href={`/jobseeker/practice/${session.id}/report`}>
                        <JobBtn secondary small>
                          Feedback Report
                        </JobBtn>
                      </Link>
                      <Link href={`/jobseeker/practice/${session.id}`}>
                        <JobBtn primary small className="flex items-center gap-1">
                          <RotateCcw size={12} /> Retry
                        </JobBtn>
                      </Link>
                    </div>
                  </div>

                  <p className="text-xs text-[#4A5568] pt-2 border-t border-[#F0EBE0] leading-relaxed">
                    Key Strength: <strong>{session.feedbackSummary || 'Strong clarity on token synchronization.'}</strong>
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Skill Drills Column */}
          <aside className="lg:col-span-4 space-y-5">
            <div className="rounded-xl border border-[#E5E1D8] bg-white p-5 shadow-sm space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#6B7280]">
                Quick 5-Minute Drills
              </span>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                Sharpen specific behavioral answers and technical pitch responses before your calls.
              </p>

              <div className="space-y-2.5 pt-1">
                {drills.slice(0, 3).map((drill) => (
                  <Link
                    key={drill.id}
                    href={`/jobseeker/practice/new?drill=${drill.id}`}
                    className="block p-3 rounded-lg border border-[#E5E1D8] bg-[#FAF8F4] hover:bg-[#F3EBDD]/50 transition-colors"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-semibold text-[#0F1B2D]">{drill.title}</span>
                      <ChevronRight size={14} className="text-[#A0A7B4]" />
                    </div>
                    <span className="text-[11px] text-[#6B7280] block">{drill.category} · {drill.duration}</span>
                  </Link>
                ))}
              </div>

              <Link href="/jobseeker/practice/drills" className="block pt-2">
                <JobBtn secondary small className="w-full">
                  Browse All Drills
                </JobBtn>
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </JobSeekerShell>
  );
}
