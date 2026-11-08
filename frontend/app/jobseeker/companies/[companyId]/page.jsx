'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ChevronLeft,
  CheckCircle2,
  Share2,
  Building,
  MapPin,
  Users,
  Calendar,
  Globe,
  Award,
  ExternalLink,
  Briefcase,
  Check,
} from 'lucide-react';
import { JobSeekerShell } from '@/components';
import {
  JobBtn,
  JobCard,
  defaultUser,
} from '@/components/jobseeker-ui';
import { companies, jobs } from '../../jobseeker-data';

export default function CompanyProfilePage() {
  const params = useParams();
  const rawId = params?.companyId;
  const company = companies.find((c) => c.id === rawId) || companies[0];

  const [tab, setTab] = useState('Overview');
  const [following, setFollowing] = useState(false);
  const [copied, setCopied] = useState(false);

  const openJobs = jobs.filter(
    (j) => j.company?.id === company.id || j.company === company.name
  );

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <JobSeekerShell active="Jobs">
      <div className="space-y-6 max-w-5xl">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[#6B7280]">
          <Link
            href="/jobseeker/jobs"
            className="flex items-center gap-1 hover:text-[#0F1B2D]"
          >
            <ChevronLeft size={14} /> Back to Jobs
          </Link>
          <span>/</span>
          <span className="text-[#0F1B2D] font-medium">{company.name}</span>
        </nav>

        {/* Hero banner & Company Info Card */}
        <header className="rounded-2xl border border-[#E5E1D8] bg-white overflow-hidden shadow-sm">
          {/* Header background band */}
          <div className="h-32 bg-gradient-to-r from-[#0F1B2D] via-[#1C2B42] to-[#0F1B2D] relative p-6">
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#B8955A_1px,transparent_1px)] [background-size:16px_16px]" />
          </div>

          <div className="p-6 relative pt-0">
            {/* Avatar overlapping banner */}
            <div className="-mt-12 flex flex-wrap items-end justify-between gap-4 mb-4">
              <span className="grid h-20 w-20 place-items-center rounded-2xl border-4 border-white bg-[#F3EBDD] font-bold text-2xl text-[#806236] shadow-md">
                {company.logo || company.name[0]}
              </span>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleShare}
                  className="inline-flex items-center justify-center gap-1.5 min-h-10 rounded-lg border border-[#E5E1D8] bg-white px-3 text-xs font-medium text-[#0F1B2D] hover:bg-[#F4F1EA]"
                >
                  <Share2 size={14} />
                  <span>{copied ? 'Copied' : 'Share'}</span>
                </button>

                <JobBtn
                  primary={!following}
                  secondary={following}
                  onClick={() => setFollowing(!following)}
                  className="min-w-[100px]"
                >
                  {following ? 'Following' : 'Follow'}
                </JobBtn>
              </div>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <h1 className="text-xl md:text-2xl font-serif font-bold text-[#0F1B2D]">
                  {company.name}
                </h1>
                {company.verified && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#E7F3EC] px-2.5 py-0.5 text-xs font-medium text-[#286749]">
                    <CheckCircle2 size={12} /> Verified Employer
                  </span>
                )}
                {company.stage && (
                  <span className="rounded-full bg-[#F3F4F6] px-2.5 py-0.5 text-xs text-[#4A5568]">
                    {company.stage}
                  </span>
                )}
              </div>

              <p className="text-xs md:text-sm text-[#4A5568] max-w-2xl leading-relaxed">
                {company.tagline || company.bio || 'Building the future of next-generation digital platforms.'}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-y-1.5 gap-x-4 text-xs text-[#6B7280] pt-3 border-t border-[#F0EBE0]">
                <span className="flex items-center gap-1.5">
                  <Building size={14} className="text-[#A0A7B4]" /> {company.industry}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin size={14} className="text-[#A0A7B4]" /> {company.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Users size={14} className="text-[#A0A7B4]" /> {company.size || '25–50 employees'}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar size={14} className="text-[#A0A7B4]" /> Founded {company.founded || '2021'}
                </span>
                {company.website && (
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[#9A7A45] hover:underline font-medium"
                  >
                    <Globe size={13} /> Website <ExternalLink size={10} />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 border-t border-[#E5E1D8] px-6 bg-[#FAF8F4]/50 overflow-x-auto">
            {['Overview', 'Open Jobs', 'Culture & Benefits', 'Hiring Process'].map((t) => {
              const active = tab === t;
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTab(t)}
                  className={`py-3.5 px-3 text-xs font-semibold whitespace-nowrap border-b-2 transition-colors ${
                    active
                      ? 'border-[#B8955A] text-[#0F1B2D]'
                      : 'border-transparent text-[#6B7280] hover:text-[#0F1B2D]'
                  }`}
                >
                  {t} {t === 'Open Jobs' && `(${openJobs.length})`}
                </button>
              );
            })}
          </div>
        </header>

        {/* Tab 1: Overview */}
        {tab === 'Overview' && (
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-8 space-y-6">
              <section className="rounded-xl border border-[#E5E1D8] bg-white p-6 shadow-sm space-y-3">
                <h2 className="text-base font-serif font-bold text-[#0F1B2D]">About {company.name}</h2>
                <p className="text-xs md:text-sm text-[#4A5568] leading-relaxed">
                  {company.summary ||
                    'A fast-growing tech venture solving key workflow challenges through modern AI architectures and collaborative workspaces.'}
                </p>
              </section>

              <section className="rounded-xl border border-[#E5E1D8] bg-white p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-serif font-bold text-[#0F1B2D]">Open Roles</h2>
                  <button
                    type="button"
                    onClick={() => setTab('Open Jobs')}
                    className="text-xs text-[#9A7A45] font-semibold hover:underline"
                  >
                    View all ({openJobs.length})
                  </button>
                </div>
                <div className="space-y-3">
                  {openJobs.slice(0, 3).map((job) => (
                    <JobCard key={job.id} job={job} user={defaultUser} />
                  ))}
                </div>
              </section>
            </div>

            <aside className="lg:col-span-4 space-y-5">
              <div className="rounded-xl border border-[#E5E1D8] bg-white p-5 shadow-sm space-y-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#6B7280]">
                  Company Highlights
                </span>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1.5 border-b border-[#F0EBE0]">
                    <span className="text-[#6B7280]">Funding Stage</span>
                    <strong className="text-[#0F1B2D]">{company.stage || 'Series A'}</strong>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-[#F0EBE0]">
                    <span className="text-[#6B7280]">Verified Mentorship</span>
                    <span className="text-[#286749] font-medium flex items-center gap-1">
                      <Award size={13} /> Active
                    </span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-[#6B7280]">Headquarters</span>
                    <span className="text-[#0F1B2D] font-medium">{company.location}</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        )}

        {/* Tab 2: Open Jobs */}
        {tab === 'Open Jobs' && (
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-serif font-bold text-[#0F1B2D]">
                All Open Positions ({openJobs.length})
              </h2>
              <Link href="/jobseeker/jobs" className="text-xs text-[#9A7A45] hover:underline">
                Explore All Platform Jobs →
              </Link>
            </div>

            {openJobs.length === 0 ? (
              <div className="rounded-xl border border-[#E5E1D8] bg-white p-8 text-center text-xs text-[#6B7280]">
                No current openings listed for this company. Follow to receive notifications when new roles open.
              </div>
            ) : (
              <div className="space-y-3">
                {openJobs.map((job) => (
                  <JobCard key={job.id} job={job} user={defaultUser} />
                ))}
              </div>
            )}
          </section>
        )}

        {/* Tab 3: Culture & Benefits */}
        {tab === 'Culture & Benefits' && (
          <section className="rounded-xl border border-[#E5E1D8] bg-white p-6 shadow-sm space-y-4">
            <h2 className="text-base font-serif font-bold text-[#0F1B2D]">Perks & Benefits</h2>
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
              {(company.benefits || [
                'Remote-first flexibility',
                'Comprehensive health insurance',
                'Annual learning & conference stipend',
                'Equity / ESOP grants for full-time staff',
                'Home office setup allowance',
                'Wellness Fridays & flexible PTO',
              ]).map((benefit, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-[#E5E1D8] bg-[#FAF8F4] p-3 text-xs text-[#0F1B2D] flex items-center gap-2"
                >
                  <Check size={14} className="text-[#286749] shrink-0" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Tab 4: Hiring Process */}
        {tab === 'Hiring Process' && (
          <section className="rounded-xl border border-[#E5E1D8] bg-white p-6 shadow-sm space-y-4">
            <h2 className="text-base font-serif font-bold text-[#0F1B2D]">How We Hire</h2>
            <div className="space-y-3 text-xs text-[#4A5568]">
              <div className="flex items-start gap-3 p-3 rounded-lg border border-[#E5E1D8] bg-[#FAF8F4]">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#0F1B2D] text-white font-bold text-xs">
                  1
                </span>
                <div>
                  <strong className="text-[#0F1B2D] block">Resume & Profile Review</strong>
                  <span>Direct founder & hiring manager evaluation within 48 business hours.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg border border-[#E5E1D8] bg-[#FAF8F4]">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#0F1B2D] text-white font-bold text-xs">
                  2
                </span>
                <div>
                  <strong className="text-[#0F1B2D] block">Initial 30-min Video Screening</strong>
                  <span>Discussing your background, motivations, and mutual expectations.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg border border-[#E5E1D8] bg-[#FAF8F4]">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#0F1B2D] text-white font-bold text-xs">
                  3
                </span>
                <div>
                  <strong className="text-[#0F1B2D] block">Practical Skill Drill or Case Discussion</strong>
                  <span>A practical real-world scenario (paid or time-boxed to under 2 hours).</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg border border-[#E5E1D8] bg-[#FAF8F4]">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#0F1B2D] text-white font-bold text-xs">
                  4
                </span>
                <div>
                  <strong className="text-[#0F1B2D] block">Offer & Equity Discussion</strong>
                  <span>Transparent compensation breakdown and joining date confirmation.</span>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </JobSeekerShell>
  );
}
