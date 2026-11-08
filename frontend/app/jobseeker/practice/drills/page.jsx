'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ChevronLeft,
  Sparkles,
  Play,
  Clock,
  Layers,
  CheckCircle2,
  Filter,
} from 'lucide-react';
import { JobSeekerShell } from '@/components';
import {
  JobBtn,
  defaultUser,
} from '@/components/jobseeker-ui';
import { drills } from '../../jobseeker-data';

export default function DrillsPage() {
  const [categoryFilter, setCategoryFilter] = useState('All');

  const categories = ['All', 'Behavioral', 'Design Systems', 'Leadership', 'Negotiation'];

  const filtered = drills.filter((d) => {
    if (categoryFilter !== 'All' && d.category !== categoryFilter) return false;
    return true;
  });

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
          <span className="text-[#0F1B2D] font-medium">Quick Drills</span>
        </nav>

        {/* Header */}
        <header className="rounded-2xl border border-[#E5E1D8] bg-white p-6 shadow-sm flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-serif font-bold text-[#0F1B2D]">
              Targeted Skill Drills
            </h1>
            <p className="text-xs md:text-sm text-[#6B7280] mt-1">
              Short, high-intensity 3-to-5 minute exercises designed to master specific interview questions.
            </p>
          </div>

          <Link href="/jobseeker/practice/new">
            <JobBtn primary small className="flex items-center gap-1.5">
              <Play size={13} /> Full Interview Simulation
            </JobBtn>
          </Link>
        </header>

        {/* Category Filters */}
        <div className="flex items-center gap-2 border-b border-[#E5E1D8] pb-2 text-xs overflow-x-auto min-w-0">
          {categories.map((cat) => {
            const active = categoryFilter === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setCategoryFilter(cat)}
                className={`px-3.5 py-1.5 rounded-lg font-medium transition-colors ${
                  active
                    ? 'bg-[#0F1B2D] text-white'
                    : 'text-[#4A5568] hover:bg-[#FAF8F4]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Drills Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((drill) => (
            <div
              key={drill.id}
              className="rounded-xl border border-[#E5E1D8] bg-white p-5 shadow-sm space-y-3 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="rounded-full bg-[#FAF8F4] border border-[#E5E1D8] px-2.5 py-0.5 text-xs text-[#6B7280]">
                    {drill.category}
                  </span>
                  <span className="text-xs text-[#6B7280] flex items-center gap-1">
                    <Clock size={12} /> {drill.duration}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-[#0F1B2D]">{drill.title}</h3>
                <p className="text-xs text-[#6B7280] mt-1 leading-relaxed">
                  {drill.prompt || 'Practice concise structure using Situation, Task, Action, and Result.'}
                </p>
              </div>

              <div className="pt-3 border-t border-[#F0EBE0] flex items-center justify-between">
                <span className="text-[11px] text-[#286749] font-medium flex items-center gap-1">
                  <CheckCircle2 size={11} /> AI Feedback Enabled
                </span>
                <Link href={`/jobseeker/practice/new?drill=${drill.id}`}>
                  <JobBtn primary small className="px-3">
                    Start Drill
                  </JobBtn>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </JobSeekerShell>
  );
}
