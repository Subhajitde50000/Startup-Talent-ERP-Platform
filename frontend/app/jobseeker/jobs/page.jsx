'use client';

import React, { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import {
  Search,
  MapPin,
  Sparkles,
  SlidersHorizontal,
  ChevronLeft,
  X,
  Briefcase,
  CheckCircle2,
  Bookmark,
  ArrowRight,
  Filter,
} from 'lucide-react';
import { JobSeekerShell } from '@/components';
import {
  JobBtn,
  JobCard,
  SaveToggle,
  defaultUser,
} from '@/components/jobseeker-ui';
import { jobs } from '../jobseeker-data';

const RECENT_SEARCHES = ['Product Designer', 'Design Systems', 'Remote Figma', 'Bengaluru Startups'];

export default function JobSearchPage() {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [filters, setFilters] = useState({
    jobType: [],
    workMode: [],
    experience: [],
    companyStage: [],
    verifiedOnly: false,
  });
  const [sort, setSort] = useState('best');
  const [drawerJob, setDrawerJob] = useState(null);
  const [savedJobIds, setSavedJobIds] = useState(defaultUser.savedIds);
  const [appliedJobIds, setAppliedJobIds] = useState(defaultUser.appliedIds);
  const [savedSearchToast, setSavedSearchToast] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const toggleFilter = (category, value) => {
    setFilters((prev) => {
      const current = prev[category] || [];
      const updated = current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value];
      return { ...prev, [category]: updated };
    });
  };

  const resetFilters = () => {
    setFilters({
      jobType: [],
      workMode: [],
      experience: [],
      companyStage: [],
      verifiedOnly: false,
    });
    setQuery('');
    setLocation('');
  };

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.jobType.length) count += filters.jobType.length;
    if (filters.workMode.length) count += filters.workMode.length;
    if (filters.companyStage.length) count += filters.companyStage.length;
    if (filters.verifiedOnly) count += 1;
    return count;
  }, [filters]);

  const filtered = useMemo(() => {
    let res = jobs.filter((j) => {
      if (query.trim()) {
        const hay = `${j.title} ${j.company?.name || ''} ${j.industry || ''}`.toLowerCase();
        if (!hay.includes(query.toLowerCase())) return false;
      }
      if (location.trim()) {
        const locHay = `${j.loc || ''} ${j.mode || ''}`.toLowerCase();
        if (!locHay.includes(location.toLowerCase())) return false;
      }
      if (filters.jobType.length && !filters.jobType.includes(j.type)) return false;
      if (filters.workMode.length && !filters.workMode.includes(j.mode)) return false;
      if (filters.companyStage.length && !filters.companyStage.includes(j.stage)) return false;
      if (filters.verifiedOnly && !j.verified) return false;
      return true;
    });

    if (sort === 'newest') {
      res = [...res].reverse();
    } else if (sort === 'salary') {
      res = [...res].sort((a, b) => b.salary.localeCompare(a.salary));
    }
    return res;
  }, [query, location, filters, sort]);

  const handleSave = useCallback((id) => {
    setSavedJobIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  }, []);

  const handleApply = useCallback((id) => {
    setAppliedJobIds((prev) => [...new Set([...prev, id])]);
  }, []);

  const handleSaveSearch = () => {
    setSavedSearchToast(true);
    setTimeout(() => setSavedSearchToast(false), 3000);
  };

  const userState = useMemo(
    () => ({
      ...defaultUser,
      savedIds: savedJobIds,
      appliedIds: appliedJobIds,
    }),
    [savedJobIds, appliedJobIds]
  );

  return (
    <JobSeekerShell active="Jobs">
      <div className="space-y-6">
        {/* Search header card */}
        <section className="rounded-2xl border border-[#E5E1D8] bg-white p-5 md:p-6 shadow-sm">
          <h1 className="text-xl md:text-2xl font-serif font-bold text-[#0F1B2D] mb-1">
            Discover Verified Startup Roles
          </h1>
          <p className="text-xs md:text-sm text-[#4A5568] mb-5">
            Transparent compensation, direct founder access, and AI match scoring.
          </p>

          <div className="grid gap-3 md:grid-cols-12">
            <div className="relative md:col-span-6">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A0A7B4]" size={18} />
              <input
                type="text"
                aria-label="Job title, skill or company"
                placeholder="Job title, skill, or keyword..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full h-11 pl-10 pr-4 rounded-xl border border-[#E5E1D8] bg-[#FAF8F4]/50 text-sm text-[#0F1B2D] placeholder-[#A0A7B4] focus:border-[#B8955A] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#B8955A]"
              />
            </div>
            <div className="relative md:col-span-4">
              <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A0A7B4]" size={18} />
              <input
                type="text"
                aria-label="Location or remote"
                placeholder="City, region, or 'Remote'..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full h-11 pl-10 pr-4 rounded-xl border border-[#E5E1D8] bg-[#FAF8F4]/50 text-sm text-[#0F1B2D] placeholder-[#A0A7B4] focus:border-[#B8955A] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#B8955A]"
              />
            </div>
            <div className="flex gap-2 md:col-span-2">
              <JobBtn
                primary
                onClick={() => {}}
                className="w-full h-11 text-xs"
              >
                Search
              </JobBtn>
              <button
                type="button"
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="lg:hidden grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-[#E5E1D8] bg-[#FAF8F4] text-[#0F1B2D]"
                aria-label="Toggle filters"
              >
                <SlidersHorizontal size={18} />
              </button>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2 pt-3 border-t border-[#F0EBE0] text-xs">
            <span className="text-[#6B7280]">Popular:</span>
            {RECENT_SEARCHES.map((term) => (
              <button
                key={term}
                type="button"
                onClick={() => setQuery(term)}
                className="rounded-full bg-[#FAF8F4] border border-[#E5E1D8] px-2.5 py-1 text-xs text-[#0F1B2D] hover:bg-[#F3EBDD] transition-colors"
              >
                {term}
              </button>
            ))}
          </div>
        </section>

        {/* Saved search notification */}
        {savedSearchToast && (
          <div className="rounded-xl border border-[#CDE5D7] bg-[#E7F3EC] p-3 text-xs text-[#286749] flex items-center justify-between">
            <span className="flex items-center gap-2">
              <CheckCircle2 size={16} /> Saved search alert created! We will email you new matching jobs daily.
            </span>
            <button
              type="button"
              onClick={() => setSavedSearchToast(false)}
              className="text-[#286749] hover:underline"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Results Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-semibold text-[#0F1B2D]">
              {filtered.length} {filtered.length === 1 ? 'job' : 'jobs'} available
            </h2>
            {activeFiltersCount > 0 && (
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center gap-1 rounded-full bg-[#F3EBDD] px-2.5 py-0.5 text-xs text-[#806236] hover:bg-[#EBDDC8]"
              >
                <span>{activeFiltersCount} active</span>
                <X size={12} />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 text-xs">
            <label htmlFor="sort-select" className="text-[#6B7280]">
              Sort by:
            </label>
            <select
              id="sort-select"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-lg border border-[#E5E1D8] bg-white px-3 py-1.5 text-xs text-[#0F1B2D] focus:border-[#B8955A] focus:outline-none"
            >
              <option value="best">Best Match (AI Score)</option>
              <option value="newest">Recently Posted</option>
              <option value="salary">Compensation (High to Low)</option>
            </select>
            <JobBtn secondary small onClick={handleSaveSearch}>
              Save search
            </JobBtn>
          </div>
        </div>

        {/* Main 2-column layout */}
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Filters column (desktop + mobile collapsible) */}
          <aside
            className={`space-y-5 lg:col-span-4 ${
              showMobileFilters ? 'block' : 'hidden lg:block'
            }`}
          >
            <div className="rounded-xl border border-[#E5E1D8] bg-white p-5 shadow-sm space-y-5">
              <div className="flex items-center justify-between border-b border-[#F0EBE0] pb-3">
                <span className="text-sm font-semibold text-[#0F1B2D] flex items-center gap-2">
                  <Filter size={15} className="text-[#B8955A]" /> Filters
                </span>
                {activeFiltersCount > 0 && (
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="text-xs text-[#9A7A45] hover:underline"
                  >
                    Clear all
                  </button>
                )}
              </div>

              {/* Work Mode */}
              <div>
                <span className="block text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-2">
                  Work Mode
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {['Remote', 'Hybrid', 'On-site'].map((mode) => {
                    const active = filters.workMode.includes(mode);
                    return (
                      <button
                        key={mode}
                        type="button"
                        onClick={() => toggleFilter('workMode', mode)}
                        className={`rounded-lg px-3 py-1.5 text-xs font-medium border transition-colors ${
                          active
                            ? 'bg-[#0F1B2D] text-white border-[#0F1B2D]'
                            : 'bg-[#FAF8F4] text-[#4A5568] border-[#E5E1D8] hover:bg-[#F3EBDD]'
                        }`}
                      >
                        {mode}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Job Type */}
              <div>
                <span className="block text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-2">
                  Job Type
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {['Full-time', 'Part-time', 'Contract', 'Internship'].map((type) => {
                    const active = filters.jobType.includes(type);
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => toggleFilter('jobType', type)}
                        className={`rounded-lg px-3 py-1.5 text-xs font-medium border transition-colors ${
                          active
                            ? 'bg-[#0F1B2D] text-white border-[#0F1B2D]'
                            : 'bg-[#FAF8F4] text-[#4A5568] border-[#E5E1D8] hover:bg-[#F3EBDD]'
                        }`}
                      >
                        {type}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Company Stage */}
              <div>
                <span className="block text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-2">
                  Company Stage
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {['Seed', 'Early revenue', 'Series A', 'Growth'].map((stage) => {
                    const active = filters.companyStage.includes(stage);
                    return (
                      <button
                        key={stage}
                        type="button"
                        onClick={() => toggleFilter('companyStage', stage)}
                        className={`rounded-lg px-3 py-1.5 text-xs font-medium border transition-colors ${
                          active
                            ? 'bg-[#0F1B2D] text-white border-[#0F1B2D]'
                            : 'bg-[#FAF8F4] text-[#4A5568] border-[#E5E1D8] hover:bg-[#F3EBDD]'
                        }`}
                      >
                        {stage}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Verified Only */}
              <div className="pt-3 border-t border-[#F0EBE0]">
                <label className="flex items-center gap-2.5 text-xs text-[#0F1B2D] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.verifiedOnly}
                    onChange={(e) =>
                      setFilters((prev) => ({ ...prev, verifiedOnly: e.target.checked }))
                    }
                    className="h-4 w-4 rounded border-[#E5E1D8] text-[#B8955A] focus:ring-[#B8955A]"
                  />
                  <span>Verified Employers Only</span>
                </label>
              </div>
            </div>

            {/* Quick links banner */}
            <div className="rounded-xl border border-[#E5E1D8] bg-[#FAF8F4] p-4 text-xs space-y-2">
              <span className="font-semibold text-[#0F1B2D] flex items-center gap-1.5">
                <Briefcase size={14} className="text-[#B8955A]" /> Looking for Startups?
              </span>
              <p className="text-[#6B7280] leading-relaxed">
                Browse venture-backed companies actively building new engineering and design teams.
              </p>
              <Link
                href="/jobseeker/startups"
                className="inline-flex items-center gap-1 text-[#9A7A45] font-semibold hover:underline"
              >
                Explore Startups <ArrowRight size={13} />
              </Link>
            </div>
          </aside>

          {/* Job listings column */}
          <div className="lg:col-span-8 space-y-4">
            {filtered.length === 0 ? (
              <div className="rounded-xl border border-[#E5E1D8] bg-white p-8 text-center space-y-3">
                <p className="text-sm font-semibold text-[#0F1B2D]">No matching jobs found</p>
                <p className="text-xs text-[#6B7280] max-w-md mx-auto">
                  Try adjusting your keywords, broadening work mode filters, or clear all filters to see all available openings.
                </p>
                <JobBtn secondary small onClick={resetFilters}>
                  Clear all filters
                </JobBtn>
              </div>
            ) : (
              filtered.map((j) => (
                <JobCard
                  key={j.id}
                  job={j}
                  user={userState}
                  onSave={handleSave}
                  onApply={handleApply}
                  onNotInterested={() => setDrawerJob(j)}
                  onReport={() => setDrawerJob(j)}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </JobSeekerShell>
  );
}
