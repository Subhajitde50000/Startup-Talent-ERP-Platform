'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Search,
  Plus,
  Briefcase,
  Users,
  ChevronRight,
  Filter,
  CheckCircle2,
  Clock,
  MoreHorizontal,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { EmployerShell, EmployerBtn, EmployerCard, StageChip } from '@/components';
import { jobs as allJobs } from '../employer-data';

export default function HiringOverviewPage() {
  const [tab, setTab] = useState('All');
  const [search, setSearch] = useState('');
  const [jobList, setJobList] = useState(allJobs);

  const filteredJobs = useMemo(() => {
    return jobList.filter((j) => {
      if (tab !== 'All' && j.status !== tab) return false;
      if (search.trim()) {
        const hay = `${j.title} ${j.dept} ${j.loc}`.toLowerCase();
        if (!hay.includes(search.toLowerCase())) return false;
      }
      return true;
    });
  }, [jobList, tab, search]);

  const stats = useMemo(() => {
    const total = jobList.length;
    const active = jobList.filter((j) => j.status === 'Active' || !j.status).length;
    const totalCandidates = jobList.reduce((acc, j) => acc + (j.applicantsCount || 10), 0);
    return { total, active, totalCandidates };
  }, [jobList]);

  return (
    <EmployerShell activeNav="Hiring">
      <div className="mx-auto max-w-[1280px] space-y-6 min-w-0">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-serif font-bold text-[#0F1B2D]">
              Hiring Overview & Job Postings
            </h1>
            <p className="text-xs md:text-sm text-[#6B7280] mt-1">
              Manage active openings, track pipeline funnels, and review inbound applicants.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link href="/employer/requests/new">
              <EmployerBtn secondary small>
                New Hiring Request
              </EmployerBtn>
            </Link>
            <Link href="/employer/jobs/new">
              <EmployerBtn primary small className="flex items-center gap-1.5">
                <Plus size={14} /> Create Job Post
              </EmployerBtn>
            </Link>
          </div>
        </div>

        {/* Quick KPI Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 min-w-0">
          <div className="rounded-2xl border border-[#E5E1D8] bg-white p-4">
            <span className="text-xs text-[#6B7280]">Active Openings</span>
            <div className="mt-1 text-2xl font-serif font-bold text-[#0F1B2D]">{stats.active}</div>
            <span className="text-xs text-[#286749]">4 of 5 plan seats used</span>
          </div>
          <div className="rounded-2xl border border-[#E5E1D8] bg-white p-4">
            <span className="text-xs text-[#6B7280]">Total Inbound Applicants</span>
            <div className="mt-1 text-2xl font-serif font-bold text-[#0F1B2D]">{stats.totalCandidates}</div>
            <span className="text-xs text-[#286749]">▲ 14 this week</span>
          </div>
          <div className="rounded-2xl border border-[#E5E1D8] bg-white p-4">
            <span className="text-xs text-[#6B7280]">Interviews Scheduled</span>
            <div className="mt-1 text-2xl font-serif font-bold text-[#0F1B2D]">8</div>
            <span className="text-xs text-[#806236]">2 scheduled today</span>
          </div>
          <div className="rounded-2xl border border-[#E5E1D8] bg-white p-4">
            <span className="text-xs text-[#6B7280]">Offers Extended</span>
            <div className="mt-1 text-2xl font-serif font-bold text-[#286749]">3</div>
            <span className="text-xs text-[#6B7280]">1 accepted yesterday</span>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="rounded-2xl border border-[#E5E1D8] bg-white p-4 flex flex-wrap items-center justify-between gap-3 min-w-0">
          <div className="relative flex-1 max-w-sm min-w-[200px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A0A7B4]" size={15} />
            <input
              type="text"
              aria-label="Search job openings"
              placeholder="Search by job title, department, or city..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-9 pl-9 pr-3 rounded-xl border border-[#E5E1D8] bg-[#FAF8F4]/50 text-xs text-[#0F1B2D] focus:border-[#B8955A] focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto min-w-0 text-xs">
            {['All', 'Active', 'Draft', 'Closed'].map((t) => {
              const active = tab === t;
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTab(t)}
                  className={`px-3 py-1.5 rounded-xl font-semibold transition-colors ${
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
        </div>

        {/* Jobs Directory with responsive overflow wrapper */}
        <div className="rounded-2xl border border-[#E5E1D8] bg-white overflow-hidden shadow-xs min-w-0">
          <div className="overflow-x-auto min-w-0">
            <table className="w-full text-left text-xs min-w-[620px]">
              <thead className="bg-[#FAF8F4] border-b border-[#E5E1D8] text-[#6B7280] uppercase tracking-wider font-semibold">
                <tr>
                  <th className="p-4 pl-6">Job Title & Dept</th>
                  <th className="p-4">Location & Mode</th>
                  <th className="p-4">Salary Range</th>
                  <th className="p-4">Candidates</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0EBE0] text-[#0F1B2D]">
                {filteredJobs.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-xs text-[#6B7280]">
                      No job listings match your current filters.
                    </td>
                  </tr>
                ) : (
                  filteredJobs.map((job) => (
                    <tr key={job.id} className="hover:bg-[#FAF8F4]/50 transition-colors">
                      <td className="p-4 pl-6">
                        <Link
                          href={`/employer/jobs/${job.id}`}
                          className="font-semibold text-sm hover:underline block text-[#0F1B2D]"
                        >
                          {job.title}
                        </Link>
                        <span className="text-[#6B7280]">{job.dept} · Posted {job.posted || '2 weeks ago'}</span>
                      </td>
                      <td className="p-4 text-[#4A5568]">{job.loc} ({job.mode || 'Hybrid'})</td>
                      <td className="p-4 font-medium">{job.salary || '₹22L – ₹28L'}</td>
                      <td className="p-4">
                        <Link
                          href={`/employer/jobs/${job.id}`}
                          className="font-bold text-[#0F1B2D] hover:underline"
                        >
                          {job.applicantsCount || 12} in pipeline
                        </Link>
                      </td>
                      <td className="p-4">
                        <StageChip stage={job.status || 'Active'} />
                      </td>
                      <td className="p-4 pr-6 text-right space-x-2">
                        <Link href={`/employer/jobs/${job.id}`}>
                          <EmployerBtn primary small>
                            Pipeline
                          </EmployerBtn>
                        </Link>
                        <Link href={`/employer/jobs/${job.id}/edit`}>
                          <EmployerBtn secondary small>
                            Edit
                          </EmployerBtn>
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </EmployerShell>
  );
}
