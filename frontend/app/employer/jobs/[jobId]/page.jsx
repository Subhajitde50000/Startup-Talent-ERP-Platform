'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ChevronLeft,
  Briefcase,
  Users,
  Sparkles,
  Columns,
  Edit3,
  Calendar,
  Clock,
  CheckCircle2,
  ChevronRight,
  MoreHorizontal,
  X,
} from 'lucide-react';
import { EmployerShell, EmployerBtn, EmployerCard, StageChip } from '@/components';
import { jobs as allJobs, candidates as allCandidates } from '../../employer-data';

const PIPELINE_STAGES = ['Review', 'Shortlisted', 'Interview', 'Offered', 'Hired'];

export default function JobDetailPage() {
  const params = useParams();
  const rawId = params?.jobId;
  const job = allJobs.find((j) => j.id === rawId) || allJobs[0];

  const [candidates, setCandidates] = useState(allCandidates);
  const [activeTab, setActiveTab] = useState('Pipeline'); // 'Pipeline' | 'Job Details'

  const moveCandidate = (candId, nextStage) => {
    setCandidates((prev) =>
      prev.map((c) => (c.id === candId ? { ...c, stage: nextStage } : c))
    );
  };

  return (
    <EmployerShell activeNav="Hiring">
      <div className="mx-auto max-w-[1280px] space-y-6 min-w-0 pb-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[#6B7280]">
          <Link
            href="/employer/hiring"
            className="flex items-center gap-1 hover:text-[#0F1B2D]"
          >
            <ChevronLeft size={14} /> Back to Job Openings
          </Link>
          <span>/</span>
          <span className="text-[#0F1B2D] font-medium truncate">{job.title}</span>
        </nav>

        {/* Job Header Hero */}
        <header className="rounded-2xl border border-[#E5E1D8] bg-white p-6 shadow-xs space-y-4">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-1 min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl md:text-2xl font-serif font-bold text-[#0F1B2D]">
                  {job.title}
                </h1>
                <StageChip stage={job.status || 'Active'} />
              </div>
              <p className="text-xs text-[#6B7280]">
                {job.dept} · {job.loc} ({job.mode || 'Hybrid'}) · {job.salary || '₹22L – ₹28L'}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Link href={`/employer/jobs/${job.id}/compare`}>
                <EmployerBtn secondary small className="flex items-center gap-1.5">
                  <Columns size={13} /> Compare Candidates
                </EmployerBtn>
              </Link>
              <Link href={`/employer/jobs/${job.id}/edit`}>
                <EmployerBtn secondary small className="flex items-center gap-1.5">
                  <Edit3 size={13} /> Edit Job
                </EmployerBtn>
              </Link>
              <Link href="/employer/talent">
                <EmployerBtn primary small>
                  Source Talent
                </EmployerBtn>
              </Link>
            </div>
          </div>

          {/* Sub Navigation */}
          <div className="pt-3 border-t border-[#F0EBE0] flex items-center gap-2 text-xs">
            {['Pipeline', 'Job Details'].map((t) => {
              const active = activeTab === t;
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => setActiveTab(t)}
                  className={`px-3.5 py-1.5 rounded-xl font-semibold transition-colors ${
                    active
                      ? 'bg-[#0F1B2D] text-white'
                      : 'text-[#4A5568] hover:bg-[#FAF8F4]'
                  }`}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </header>

        {/* Tab 1: Pipeline Kanban View */}
        {activeTab === 'Pipeline' && (
          <div className="overflow-x-auto min-w-0 pb-4">
            <div className="flex gap-4 min-w-[960px]">
              {PIPELINE_STAGES.map((stage) => {
                const stageCandidates = candidates.filter(
                  (c) => (c.stage || 'Review') === stage
                );
                return (
                  <div
                    key={stage}
                    className="flex-1 flex flex-col rounded-2xl border border-[#E5E1D8] bg-[#FAF8F4]/70 p-3.5 min-w-[220px]"
                  >
                    <div className="flex items-center justify-between mb-3 px-1">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#0F1B2D]">
                        {stage}
                      </span>
                      <span className="rounded-full bg-white border border-[#E5E1D8] px-2 py-0.5 text-xs font-bold text-[#6B7280]">
                        {stageCandidates.length}
                      </span>
                    </div>

                    <div className="space-y-3 flex-1 overflow-y-auto">
                      {stageCandidates.length === 0 ? (
                        <div className="rounded-xl border border-dashed border-[#E5E1D8] p-5 text-center text-xs text-[#A0A7B4]">
                          No candidates in {stage}
                        </div>
                      ) : (
                        stageCandidates.map((cand) => (
                          <div
                            key={cand.id}
                            className="rounded-xl border border-[#E5E1D8] bg-white p-4 shadow-xs space-y-3 hover:shadow-md transition-shadow"
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex items-center gap-2.5 min-w-0">
                                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#F3EBDD] font-bold text-xs text-[#806236]">
                                  {cand.avatar || cand.name[0]}
                                </span>
                                <div className="min-w-0">
                                  <Link
                                    href={`/employer/jobs/${job.id}/applicants/${cand.id}`}
                                    className="text-xs font-bold text-[#0F1B2D] hover:underline block truncate"
                                  >
                                    {cand.name}
                                  </Link>
                                  <span className="text-[11px] text-[#6B7280] block truncate">
                                    {cand.experience || '5 yrs exp'}
                                  </span>
                                </div>
                              </div>

                              <span className="rounded-full bg-[#E7F3EC] px-2 py-0.5 text-[10px] font-bold text-[#286749] shrink-0">
                                {cand.matchScore}% Match
                              </span>
                            </div>

                            <div className="flex items-center justify-between pt-2 border-t border-[#F0EBE0] text-xs">
                              <Link
                                href={`/employer/jobs/${job.id}/applicants/${cand.id}`}
                                className="text-[#9A7A45] hover:underline font-semibold"
                              >
                                View Profile
                              </Link>

                              {stage !== 'Hired' && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    const nextIdx = PIPELINE_STAGES.indexOf(stage) + 1;
                                    if (nextIdx < PIPELINE_STAGES.length) {
                                      moveCandidate(cand.id, PIPELINE_STAGES[nextIdx]);
                                    }
                                  }}
                                  className="text-xs text-[#0F1B2D] font-semibold hover:text-[#B8955A] flex items-center gap-0.5"
                                >
                                  Advance <ChevronRight size={12} />
                                </button>
                              )}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 2: Job Details */}
        {activeTab === 'Job Details' && (
          <section className="rounded-2xl border border-[#E5E1D8] bg-white p-6 shadow-xs space-y-4">
            <h2 className="text-base font-serif font-bold text-[#0F1B2D]">
              Job Posting Overview
            </h2>
            <div className="text-xs text-[#4A5568] space-y-2 leading-relaxed">
              <p>
                We are seeking an experienced {job.title} to lead core design systems, collaborate closely with frontend engineers, and deliver user-friendly product experiences.
              </p>
              <div className="pt-2 border-t border-[#F0EBE0] grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <span className="text-[#6B7280] block">Department</span>
                  <strong className="text-[#0F1B2D]">{job.dept}</strong>
                </div>
                <div>
                  <span className="text-[#6B7280] block">Location</span>
                  <strong className="text-[#0F1B2D]">{job.loc} ({job.mode || 'Hybrid'})</strong>
                </div>
                <div>
                  <span className="text-[#6B7280] block">Compensation</span>
                  <strong className="text-[#0F1B2D]">{job.salary}</strong>
                </div>
                <div>
                  <span className="text-[#6B7280] block">Total Applicants</span>
                  <strong className="text-[#286749]">{candidates.length} candidates</strong>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </EmployerShell>
  );
}
