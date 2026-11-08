'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ChevronLeft,
  RotateCcw,
  Sparkles,
  Search,
  Calendar,
  Clock,
  ArrowRight,
  Trash2,
} from 'lucide-react';
import { JobSeekerShell } from '@/components';
import {
  JobBtn,
  defaultUser,
} from '@/components/jobseeker-ui';
import { practiceSessions } from '../../jobseeker-data';

export default function PracticeHistoryPage() {
  const [sessions, setSessions] = useState(practiceSessions);
  const [search, setSearch] = useState('');

  const filtered = sessions.filter((s) => {
    if (search.trim()) {
      const hay = `${s.role} ${s.type}`.toLowerCase();
      if (!hay.includes(search.toLowerCase())) return false;
    }
    return true;
  });

  const handleDelete = (id) => {
    setSessions(sessions.filter((s) => s.id !== id));
  };

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
          <span className="text-[#0F1B2D] font-medium">Session History</span>
        </nav>

        {/* Header */}
        <header className="rounded-2xl border border-[#E5E1D8] bg-white p-6 shadow-sm flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-serif font-bold text-[#0F1B2D]">
              Past Practice Recordings
            </h1>
            <p className="text-xs md:text-sm text-[#6B7280] mt-1">
              Review your historical transcripts, AI rubrics, and track delivery improvements over time.
            </p>
          </div>

          <Link href="/jobseeker/practice/new">
            <JobBtn primary small>
              + New Practice Session
            </JobBtn>
          </Link>
        </header>

        {/* Search */}
        <div className="rounded-xl border border-[#E5E1D8] bg-white p-4">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A0A7B4]" size={15} />
            <input
              type="text"
              aria-label="Search past sessions"
              placeholder="Search by role or question topic..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-8 pl-8 pr-3 rounded-lg border border-[#E5E1D8] bg-[#FAF8F4]/50 text-xs text-[#0F1B2D] focus:border-[#B8955A] focus:outline-none"
            />
          </div>
        </div>

        {/* Sessions List */}
        <div className="space-y-3">
          {filtered.map((s) => (
            <div
              key={s.id}
              className="rounded-xl border border-[#E5E1D8] bg-white p-5 shadow-sm flex flex-wrap items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-[#0F1B2D]">{s.role}</h3>
                  <span className="rounded-full bg-[#E7F3EC] px-2 py-0.5 text-xs text-[#286749] font-medium">
                    Score: {s.score}%
                  </span>
                  <span className="rounded-full bg-[#F3F4F6] px-2 py-0.5 text-xs text-[#6B7280]">
                    {s.type}
                  </span>
                </div>
                <p className="text-xs text-[#6B7280]">
                  {s.date} · Duration: {s.duration} · {s.questionsAnswered || 3} questions answered
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Link href={`/jobseeker/practice/${s.id}/report`}>
                  <JobBtn primary small className="flex items-center gap-1.5">
                    View Report <ArrowRight size={13} />
                  </JobBtn>
                </Link>
                <button
                  type="button"
                  onClick={() => handleDelete(s.id)}
                  className="p-2 text-[#A0A7B4] hover:text-[#B42318] hover:bg-[#FCE8E6] rounded-lg transition-colors"
                  aria-label="Delete recording"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </JobSeekerShell>
  );
}
