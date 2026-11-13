'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ChevronLeft,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Award,
  BookOpen,
  ArrowRight,
  Share2,
  FileText,
} from 'lucide-react';
import { JobSeekerShell } from '@/components';
import {
  JobBtn,
  defaultUser,
} from '@/components/jobseeker-ui';
import { practiceSessions } from '../../../jobseeker-data';

export default function FeedbackReportPage() {
  const params = useParams();
  const rawId = params?.sessionId;
  const session = practiceSessions.find((s) => s.id === rawId) || practiceSessions[0];

  const [activeTab, setActiveTab] = useState('Answers');
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [reviewRequested, setReviewRequested] = useState(false);

  const rubricScores = [
    { label: 'STAR Structure & Clarity', score: 82, note: 'Excellent situation setup; result section could use more percentage metrics.' },
    { label: 'Technical & Domain Depth', score: 85, note: 'Strong explanation of token architecture and design-to-code synchronization.' },
    { label: 'Startup Pace & Ownership', score: 76, note: 'Clearly outlined team collaboration; emphasize independent decision speed.' },
    { label: 'Pacing & Conciseness', score: 72, note: 'Answer duration 2m 14s. Slightly longer intro; reduce background preamble.' },
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
            <ChevronLeft size={14} /> Back to Practice
          </Link>
          <span>/</span>
          <span className="text-[#0F1B2D] font-medium">Session Feedback Report</span>
        </nav>

        {/* Header Hero */}
        <header className="rounded-2xl border border-[#E5E1D8] bg-white p-6 shadow-sm space-y-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <span className="text-xs font-semibold text-[#806236] uppercase tracking-wider block mb-1">
                AI Evaluation Report
              </span>
              <h1 className="text-xl md:text-2xl font-serif font-bold text-[#0F1B2D]">
                {session.role} · {session.type}
              </h1>
              <p className="text-xs text-[#6B7280] mt-1">
                Completed on {session.date} · Duration: {session.duration} · 3 Questions Evaluated
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Link href={`/jobseeker/practice/${session.id}`}>
                <JobBtn primary small className="flex items-center gap-1.5">
                  <RotateCcw size={13} /> Practice Again
                </JobBtn>
              </Link>
              <Link href="/jobseeker/practice/rubric">
                <JobBtn secondary small className="flex items-center gap-1.5">
                  <BookOpen size={13} /> View Full Rubric
                </JobBtn>
              </Link>
            </div>
          </div>

          {/* Overall Score Banner */}
          <div className="pt-4 border-t border-[#F0EBE0] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="grid h-16 w-16 place-items-center rounded-2xl bg-[#E7F3EC] text-xl font-serif font-bold text-[#286749]">
                {session.score}%
              </div>
              <div>
                <span className="text-sm font-bold text-[#0F1B2D] block">
                  Overall Readiness Score: Solid
                </span>
                <p className="text-xs text-[#6B7280]">
                  Scored higher than 84% of candidates practicing for this role profile.
                </p>
              </div>
            </div>

            {/* Fixed Audit Issue: Actionable Review Request instead of dead href="#" */}
            <div>
              {reviewRequested ? (
                <span className="inline-flex items-center gap-1 text-xs text-[#286749] font-medium bg-[#E7F3EC] px-3 py-1.5 rounded-lg">
                  <CheckCircle2 size={13} /> Mentor review requested
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => setReviewModalOpen(true)}
                  className="text-xs text-[#9A7A45] hover:underline font-semibold flex items-center gap-1"
                >
                  Request Human Mentor Review →
                </button>
              )}
            </div>
          </div>
        </header>

        {/* Detailed Rubric Breakdown */}
        <section className="rounded-2xl border border-[#E5E1D8] bg-white p-6 shadow-sm space-y-5">
          <h2 className="text-base font-serif font-bold text-[#0F1B2D]">
            Performance by Competency Area
          </h2>

          <div className="space-y-4">
            {rubricScores.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-[#0F1B2D]">{item.label}</span>
                  <span className="font-bold text-[#286749]">{item.score}%</span>
                </div>
                <div className="h-2 rounded-full bg-[#FAF8F4] border border-[#E5E1D8] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#B8955A]"
                    style={{ width: `${item.score}%` }}
                  />
                </div>
                <p className="text-[11px] text-[#6B7280]">{item.note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Question & Feedback Transcript */}
        <section className="rounded-2xl border border-[#E5E1D8] bg-white p-6 shadow-sm space-y-4">
          <h2 className="text-base font-serif font-bold text-[#0F1B2D]">
            Question-by-Question Transcript & AI Feedback
          </h2>

          <div className="p-4 rounded-xl border border-[#E5E1D8] bg-[#FAF8F4] space-y-3 text-xs">
            <span className="font-bold text-[#0F1B2D] block text-sm">
              Q1: "Tell me about a complex design system you architected and how you managed tokens across teams."
            </span>

            <div className="space-y-1">
              <span className="text-[#6B7280] font-semibold block">Your Spoken Answer:</span>
              <p className="text-[#4A5568] leading-relaxed italic bg-white p-3 rounded-lg border border-[#E5E1D8]">
                "At Klimb Tech, our product grew to 4 apps with disparate styling. I introduced a multi-tier token schema separating global primitives from semantic alias tokens. We used Tokens Studio in Figma and automated a GitHub Action to convert tokens into CSS variables and React theme files..."
              </p>
            </div>

            <div className="p-3 rounded-lg border border-[#CDE5D7] bg-[#E7F3EC]/30 text-[#286749] space-y-1">
              <span className="font-bold block flex items-center gap-1.5">
                <Sparkles size={13} /> AI Feedback Highlight
              </span>
              <p className="leading-relaxed">
                Great clarity on the distinction between primitive and semantic tokens. To improve further, quantify the exact time saved by engineers during sprint handoffs.
              </p>
            </div>
          </div>
        </section>

        {/* Human Mentor Review Request Modal */}
        {reviewModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl space-y-4">
              <h3 className="text-base font-serif font-bold text-[#0F1B2D]">
                Request Mentor Feedback
              </h3>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                Submit this session recording to verified platform mentors (experienced design leads and founders) for personalized feedback notes.
              </p>
              <div className="flex justify-end gap-2 pt-2">
                <JobBtn secondary small onClick={() => setReviewModalOpen(false)}>
                  Cancel
                </JobBtn>
                <JobBtn
                  primary
                  small
                  onClick={() => {
                    setReviewRequested(true);
                    setReviewModalOpen(false);
                  }}
                >
                  Confirm Request
                </JobBtn>
              </div>
            </div>
          </div>
        )}
      </div>
    </JobSeekerShell>
  );
}
