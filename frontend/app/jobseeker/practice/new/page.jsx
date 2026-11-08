'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ChevronLeft,
  Mic,
  Sparkles,
  Play,
  Volume2,
  Video,
  Clock,
  Shield,
  Layers,
} from 'lucide-react';
import { JobSeekerShell } from '@/components';
import {
  JobBtn,
  defaultUser,
} from '@/components/jobseeker-ui';

export default function NewPracticeSetupPage() {
  const router = useRouter();
  const [role, setRole] = useState('Senior Product Designer');
  const [sessionType, setSessionType] = useState('Technical & Architecture');
  const [questionCount, setQuestionCount] = useState(3);
  const [difficulty, setDifficulty] = useState('Standard');
  const [isStarting, setIsStarting] = useState(false);

  const handleStart = () => {
    setIsStarting(true);
    setTimeout(() => {
      setIsStarting(false);
      router.push('/jobseeker/practice/s1');
    }, 800);
  };

  return (
    <JobSeekerShell active="Interview practice">
      <div className="space-y-6 max-w-4xl pb-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[#6B7280]">
          <Link
            href="/jobseeker/practice"
            className="flex items-center gap-1 hover:text-[#0F1B2D]"
          >
            <ChevronLeft size={14} /> Back to Practice Hub
          </Link>
          <span>/</span>
          <span className="text-[#0F1B2D] font-medium">New Session</span>
        </nav>

        {/* Header */}
        <header className="rounded-2xl border border-[#E5E1D8] bg-white p-6 shadow-sm">
          <h1 className="text-xl md:text-2xl font-serif font-bold text-[#0F1B2D]">
            Configure AI Practice Session
          </h1>
          <p className="text-xs md:text-sm text-[#6B7280] mt-1">
            Choose your focus area, difficulty, and response format. Completely private and unshared.
          </p>
        </header>

        {/* Setup Card */}
        <section className="rounded-2xl border border-[#E5E1D8] bg-white p-6 shadow-sm space-y-6">
          {/* Target Role */}
          <div>
            <label htmlFor="targetRole" className="block text-xs font-semibold text-[#4A5568] mb-1.5">
              Target Role & Discipline
            </label>
            <input
              id="targetRole"
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full h-10 px-3 rounded-lg border border-[#E5E1D8] text-xs text-[#0F1B2D] focus:border-[#B8955A] focus:outline-none"
            />
          </div>

          {/* Session Type */}
          <div>
            <span className="block text-xs font-semibold text-[#4A5568] mb-2">
              Interview Focus Area
            </span>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { title: 'Behavioral & Leadership', desc: 'Conflict resolution, prioritization, and ownership' },
                { title: 'Technical & Architecture', desc: 'Design systems, tokens, engineering handoff, scalability' },
                { title: 'Founder Culture Fit', desc: 'Startup pace, vision alignment, and fast-growth adaptation' },
              ].map((t) => {
                const isSelected = sessionType === t.title;
                return (
                  <div
                    key={t.title}
                    onClick={() => setSessionType(t.title)}
                    className={`cursor-pointer rounded-xl border p-4 space-y-1 transition-all ${
                      isSelected
                        ? 'border-[#0F1B2D] bg-[#FAF8F4] shadow-sm'
                        : 'border-[#E5E1D8] bg-white hover:bg-[#FAF8F4]'
                    }`}
                  >
                    <h3 className="text-xs font-bold text-[#0F1B2D]">{t.title}</h3>
                    <p className="text-[11px] text-[#6B7280] leading-relaxed">{t.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Question Count & Difficulty */}
          <div className="grid gap-4 sm:grid-cols-2 pt-2 border-t border-[#F0EBE0]">
            <div>
              <span className="block text-xs font-semibold text-[#4A5568] mb-2">
                Number of Questions
              </span>
              <div className="flex gap-2">
                {[3, 5, 8].map((count) => (
                  <button
                    key={count}
                    type="button"
                    onClick={() => setQuestionCount(count)}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold border ${
                      questionCount === count
                        ? 'bg-[#0F1B2D] text-white border-[#0F1B2D]'
                        : 'bg-white border-[#E5E1D8] text-[#4A5568]'
                    }`}
                  >
                    {count} Questions (~{count * 3} mins)
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="block text-xs font-semibold text-[#4A5568] mb-2">
                Difficulty Level
              </span>
              <div className="flex gap-2">
                {['Standard', 'Challenging', 'Founder Strict'].map((diff) => (
                  <button
                    key={diff}
                    type="button"
                    onClick={() => setDifficulty(diff)}
                    className={`px-3 py-2 rounded-lg text-xs font-semibold border ${
                      difficulty === diff
                        ? 'bg-[#0F1B2D] text-white border-[#0F1B2D]'
                        : 'bg-white border-[#E5E1D8] text-[#4A5568]'
                    }`}
                  >
                    {diff}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Privacy Note */}
          <div className="rounded-xl border border-[#D4C3A3] bg-[#F3EBDD]/40 p-4 text-xs text-[#806236] flex items-start gap-2.5">
            <Shield size={16} className="shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              Your audio and transcripts are processed privately on your session container. Nothing is shared with platform employers unless you explicitly share a score badge.
            </p>
          </div>

          {/* Start CTA */}
          <div className="pt-2 flex justify-end">
            <JobBtn
              primary
              onClick={handleStart}
              disabled={isStarting}
              className="px-6 min-h-[42px] flex items-center gap-2"
            >
              <Mic size={15} />
              {isStarting ? 'Preparing AI Interviewer...' : 'Launch Practice Session'}
            </JobBtn>
          </div>
        </section>
      </div>
    </JobSeekerShell>
  );
}
