'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  FileText,
  Search,
  Star,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Plus,
  Sliders,
  CheckCircle2,
  Trash2,
  Download,
} from 'lucide-react';
import { JobSeekerShell } from '@/components';
import {
  JobBtn,
  defaultUser,
} from '@/components/jobseeker-ui';
import { resumes } from '../jobseeker-data';

export default function MyResumesPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [resumeList, setResumeList] = useState(resumes);

  const filtered = useMemo(() => {
    return resumeList.filter((r) => {
      if (statusFilter !== 'All' && r.status !== statusFilter) return false;
      if (search.trim()) {
        const hay = `${r.name} ${r.targetRole || ''}`.toLowerCase();
        if (!hay.includes(search.toLowerCase())) return false;
      }
      return true;
    });
  }, [resumeList, statusFilter, search]);

  const setPrimary = (id) => {
    setResumeList((prev) =>
      prev.map((r) => ({ ...r, primary: r.id === id }))
    );
  };

  return (
    <JobSeekerShell active="Resumes">
      <div className="space-y-6 max-w-5xl">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-serif font-bold text-[#0F1B2D]">
              Resume Studio & ATS Optimizer
            </h1>
            <p className="text-xs md:text-sm text-[#6B7280] mt-1">
              Build role-specific resumes, test ATS compatibility, and tailor descriptions to match job postings.
            </p>
          </div>

          <Link href="/jobseeker/resumes/new">
            <JobBtn primary small className="flex items-center gap-1.5">
              <Plus size={14} /> New Resume
            </JobBtn>
          </Link>
        </div>

        {/* Quick Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="rounded-xl border border-[#E5E1D8] bg-white p-4">
            <span className="text-xs text-[#6B7280]">Total Resumes</span>
            <div className="mt-1 text-2xl font-serif font-bold text-[#0F1B2D]">
              {resumeList.length}
            </div>
            <span className="text-xs text-[#286749]">1 Primary active</span>
          </div>
          <div className="rounded-xl border border-[#E5E1D8] bg-white p-4">
            <span className="text-xs text-[#6B7280]">Average ATS Score</span>
            <div className="mt-1 text-2xl font-serif font-bold text-[#806236]">
              {Math.round(resumeList.reduce((acc, r) => acc + (r.score || 82), 0) / resumeList.length)}%
            </div>
            <span className="text-xs text-[#6B7280]">Above benchmark</span>
          </div>
          <div className="rounded-xl border border-[#E5E1D8] bg-white p-4">
            <span className="text-xs text-[#6B7280]">Applications Sent</span>
            <div className="mt-1 text-2xl font-serif font-bold text-[#0F1B2D]">12</div>
            <span className="text-xs text-[#6B7280]">Across 4 startups</span>
          </div>
          <div className="rounded-xl border border-[#E5E1D8] bg-white p-4">
            <span className="text-xs text-[#6B7280]">AI Tailor Suggestions</span>
            <div className="mt-1 text-2xl font-serif font-bold text-[#286749]">3</div>
            <span className="text-xs text-[#286749]">Ready to apply</span>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="rounded-xl border border-[#E5E1D8] bg-white p-4 flex flex-wrap items-center justify-between gap-3">
          <div className="relative flex-1 max-w-sm min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A0A7B4]" size={15} />
            <input
              type="text"
              aria-label="Search resumes"
              placeholder="Search by resume title or role..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-8 pl-8 pr-3 rounded-lg border border-[#E5E1D8] bg-[#FAF8F4]/50 text-xs text-[#0F1B2D] focus:border-[#B8955A] focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#6B7280]">Status:</span>
            <select
              aria-label="Filter resumes by status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-8 rounded-lg border border-[#E5E1D8] bg-white px-2.5 text-xs text-[#0F1B2D] focus:border-[#B8955A] focus:outline-none"
            >
              <option value="All">All Resumes</option>
              <option value="Ready">Ready</option>
              <option value="Draft">Draft</option>
              <option value="Needs review">Needs Review</option>
            </select>
          </div>
        </div>

        {/* Resumes Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((res) => {
            const isPrimary = !!res.primary;
            const score = res.score || 85;
            return (
              <div
                key={res.id}
                className="rounded-xl border border-[#E5E1D8] bg-white p-5 shadow-sm space-y-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#F3EBDD] font-bold text-sm text-[#806236]">
                        <FileText size={18} />
                      </span>
                      <div className="min-w-0">
                        <Link
                          href={`/jobseeker/resumes/${res.id}`}
                          className="text-sm font-semibold text-[#0F1B2D] hover:underline truncate block"
                        >
                          {res.name}
                        </Link>
                        <span className="text-xs text-[#6B7280] block truncate">
                          {res.targetRole || 'Product Designer'}
                        </span>
                      </div>
                    </div>

                    {isPrimary && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#F3EBDD] px-2 py-0.5 text-xs font-semibold text-[#806236] shrink-0">
                        <Star size={11} className="fill-[#806236]" /> Primary
                      </span>
                    )}
                  </div>

                  <div className="mt-3 pt-3 border-t border-[#F0EBE0] flex items-center justify-between text-xs">
                    <span className="text-[#6B7280]">ATS Compatibility:</span>
                    <span
                      className={`font-bold ${
                        score >= 80 ? 'text-[#286749]' : score >= 65 ? 'text-[#B7791F]' : 'text-[#B42318]'
                      }`}
                    >
                      {score}/100
                    </span>
                  </div>

                  <div className="mt-1 flex items-center justify-between text-xs text-[#6B7280]">
                    <span>Last updated:</span>
                    <span>{res.updatedAt || 'Recent'}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#F0EBE0] space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <Link href={`/jobseeker/resumes/${res.id}`} className="w-full">
                      <JobBtn secondary small className="w-full">
                        Edit
                      </JobBtn>
                    </Link>
                    <Link href={`/jobseeker/resumes/${res.id}/tailor`} className="w-full">
                      <JobBtn primary small className="w-full flex items-center justify-center gap-1">
                        <Sparkles size={12} /> Tailor
                      </JobBtn>
                    </Link>
                  </div>

                  <div className="flex items-center justify-between pt-1 text-xs">
                    <Link
                      href={`/jobseeker/resumes/${res.id}/ats`}
                      className="text-[#9A7A45] hover:underline font-medium"
                    >
                      View ATS Breakdown
                    </Link>
                    {!isPrimary && (
                      <button
                        type="button"
                        onClick={() => setPrimary(res.id)}
                        className="text-[#6B7280] hover:text-[#0F1B2D]"
                      >
                        Set as Primary
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </JobSeekerShell>
  );
}
