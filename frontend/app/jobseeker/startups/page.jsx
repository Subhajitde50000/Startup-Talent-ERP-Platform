'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Rocket,
  Search,
  Filter,
  CheckCircle2,
  Award,
  Users,
  MapPin,
  Briefcase,
  ExternalLink,
  ChevronRight,
  Shield,
} from 'lucide-react';
import { JobSeekerShell } from '@/components';
import {
  JobBtn,
  CompanyMiniCard,
  JobCard,
  defaultUser,
} from '@/components/jobseeker-ui';
import { companies, jobs } from '../jobseeker-data';

export default function StartupsPage() {
  const [viewMode, setViewMode] = useState('startups'); // 'startups' | 'jobs'
  const [search, setSearch] = useState('');
  const [stageFilter, setStageFilter] = useState('');
  const [sectorFilter, setSectorFilter] = useState('');
  const [investmentReadyOnly, setInvestmentReadyOnly] = useState(false);
  const [followedCompanies, setFollowedCompanies] = useState([]);

  const toggleFollow = (id) => {
    setFollowedCompanies((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const filteredStartups = useMemo(() => {
    return companies.filter((c) => {
      if (search.trim()) {
        const hay = `${c.name} ${c.industry} ${c.location}`.toLowerCase();
        if (!hay.includes(search.toLowerCase())) return false;
      }
      if (stageFilter && c.stage !== stageFilter) return false;
      if (sectorFilter && c.industry !== sectorFilter) return false;
      if (investmentReadyOnly && !c.investmentReady) return false;
      return true;
    });
  }, [search, stageFilter, sectorFilter, investmentReadyOnly]);

  const startupJobs = useMemo(() => {
    return jobs.filter((j) => {
      if (search.trim()) {
        const hay = `${j.title} ${j.company?.name || ''}`.toLowerCase();
        if (!hay.includes(search.toLowerCase())) return false;
      }
      return true;
    });
  }, [search]);

  return (
    <JobSeekerShell active="Jobs">
      <div className="space-y-6">
        {/* Hero Banner */}
        <section className="rounded-2xl border border-[#E5E1D8] bg-[#0F1B2D] p-6 text-white shadow-sm relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#B8955A]/20 px-3 py-1 text-xs text-[#B8955A] font-semibold">
              <Shield size={13} /> Verified Startup Ecosystem
            </div>
            <h1 className="text-xl md:text-2xl font-serif font-bold text-white">
              Venture-Backed Startups Hiring Now
            </h1>
            <p className="text-xs md:text-sm text-white/70 leading-relaxed">
              Connect directly with verified early-stage founders and growth teams. No recruiter middlemen, clear equity terms, and mentorship-backed ventures.
            </p>
            <div className="pt-2 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setViewMode('startups')}
                className={`rounded-xl px-4 py-2 text-xs font-semibold transition-colors ${
                  viewMode === 'startups'
                    ? 'bg-[#B8955A] text-[#0F1B2D]'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                Startups Directory ({filteredStartups.length})
              </button>
              <button
                type="button"
                onClick={() => setViewMode('jobs')}
                className={`rounded-xl px-4 py-2 text-xs font-semibold transition-colors ${
                  viewMode === 'jobs'
                    ? 'bg-[#B8955A] text-[#0F1B2D]'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                Startup Jobs ({startupJobs.length})
              </button>
            </div>
          </div>
        </section>

        {/* Filter bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-xl border border-[#E5E1D8]">
          <div className="relative min-w-[240px] flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A0A7B4]" size={16} />
            <input
              type="text"
              aria-label="Search startups"
              placeholder="Search by company, sector, or city..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-9 pl-9 pr-3 rounded-lg border border-[#E5E1D8] bg-[#FAF8F4]/50 text-xs text-[#0F1B2D] focus:border-[#B8955A] focus:bg-white focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <select
              aria-label="Filter by stage"
              value={stageFilter}
              onChange={(e) => setStageFilter(e.target.value)}
              className="h-9 rounded-lg border border-[#E5E1D8] bg-white px-3 text-xs text-[#0F1B2D] focus:border-[#B8955A] focus:outline-none"
            >
              <option value="">All Stages</option>
              <option value="Idea">Idea</option>
              <option value="Prototype">Prototype</option>
              <option value="Early revenue">Early Revenue</option>
              <option value="Mature startup">Mature Startup</option>
            </select>

            <select
              aria-label="Filter by sector"
              value={sectorFilter}
              onChange={(e) => setSectorFilter(e.target.value)}
              className="h-9 rounded-lg border border-[#E5E1D8] bg-white px-3 text-xs text-[#0F1B2D] focus:border-[#B8955A] focus:outline-none"
            >
              <option value="">All Sectors</option>
              <option value="FinTech">FinTech</option>
              <option value="Healthcare">Healthcare</option>
              <option value="SaaS">SaaS</option>
              <option value="EdTech">EdTech</option>
            </select>

            <label className="flex items-center gap-1.5 cursor-pointer ml-1">
              <input
                type="checkbox"
                checked={investmentReadyOnly}
                onChange={(e) => setInvestmentReadyOnly(e.target.checked)}
                className="h-4 w-4 rounded border-[#E5E1D8] text-[#B8955A] focus:ring-[#B8955A]"
              />
              <span className="font-medium text-[#0F1B2D]">Investment Ready</span>
            </label>
          </div>
        </div>

        {/* Content Section */}
        {viewMode === 'startups' ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredStartups.map((company) => {
              const isFollowing = followedCompanies.includes(company.id);
              const companyOpenJobs = jobs.filter(
                (j) => j.company?.id === company.id || j.company === company.name
              );
              return (
                <div
                  key={company.id}
                  className="rounded-xl border border-[#E5E1D8] bg-white p-5 shadow-sm space-y-3.5 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#F3EBDD] font-bold text-lg text-[#806236]">
                        {company.logo || company.name[0]}
                      </span>
                      <div className="flex flex-col items-end gap-1">
                        {company.verified && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-[#E7F3EC] px-2 py-0.5 text-xs text-[#286749]">
                            <CheckCircle2 size={10} /> Verified
                          </span>
                        )}
                        {company.stage && (
                          <span className="rounded-full bg-[#F3F4F6] px-2 py-0.5 text-xs text-[#4A5568]">
                            {company.stage}
                          </span>
                        )}
                      </div>
                    </div>

                    <h2 className="text-sm font-semibold text-[#0F1B2D]">{company.name}</h2>
                    <p className="text-xs text-[#4A5568] mt-1 line-clamp-2 leading-relaxed">
                      {company.tagline || company.bio}
                    </p>

                    <div className="mt-3 pt-3 border-t border-[#F0EBE0] space-y-1 text-xs text-[#6B7280]">
                      <div className="flex justify-between">
                        <span>Industry:</span>
                        <strong className="text-[#0F1B2D] font-medium">{company.industry}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Location:</span>
                        <span>{company.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Open Positions:</span>
                        <span className="text-[#286749] font-semibold">{companyOpenJobs.length} roles</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center gap-2 border-t border-[#F0EBE0]">
                    <Link href={`/jobseeker/companies/${company.id}`} className="flex-1">
                      <JobBtn secondary small className="w-full">
                        View Profile
                      </JobBtn>
                    </Link>
                    <JobBtn
                      primary={!isFollowing}
                      secondary={isFollowing}
                      small
                      onClick={() => toggleFollow(company.id)}
                    >
                      {isFollowing ? 'Following' : 'Follow'}
                    </JobBtn>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="space-y-4">
            {startupJobs.map((job) => (
              <JobCard key={job.id} job={job} user={defaultUser} />
            ))}
          </div>
        )}
      </div>
    </JobSeekerShell>
  );
}
