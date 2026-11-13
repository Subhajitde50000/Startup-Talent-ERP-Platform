'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  User,
  CheckCircle2,
  Building2,
  Briefcase,
  Users,
  MapPin,
  ShieldCheck,
  Share2,
  Edit3,
  ExternalLink,
  Linkedin,
  Globe,
  Sparkles,
  HeartHandshake,
  Clock,
  Award,
  ChevronRight,
  X,
  FileText,
  DollarSign,
} from 'lucide-react';
import { EmployerShell } from '@/components';

export default function EmployerProfilePage() {
  const [toast, setToast] = useState('');
  const [activeTab, setActiveTab] = useState('company'); // 'company' | 'recruiter' | 'openings' | 'benefits'
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const notify = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const [profile, setProfile] = useState({
    recruiterName: 'Sarah Jenkins',
    recruiterTitle: 'Head of People & Talent Acquisition',
    companyName: 'Northstar Labs Pvt Ltd',
    industry: 'Enterprise Developer Infrastructure & AI Tools',
    stage: 'Series A ($12M Raised)',
    teamSize: '85 team members across Bengaluru & Remote',
    headquarters: 'Indiranagar, Bengaluru, India',
    foundedYear: '2022',
    email: 'sarah@northstarlabs.in',
    avatar: 'SJ',
    verified: true,
    fastResponder: true,
    responseSla: '< 24 Hours candidate turnaround',
    activeJobsCount: 8,
    candidatesScreenedCount: 420,
    hiresCount: 28,
    offerAcceptanceRate: '94%',
    companyBio: `Northstar Labs builds next-generation distributed compilation tools and observability orchestration for high-velocity software engineering squads. Backed by top tier enterprise VCs, we are an engineering-driven team obsessed with developer ergonomics and developer productivity.`,
    hiringPhilosophy: `We believe in radical compensation transparency. Every job posting includes transparent salary bands and ESOP grants up front. We don't conduct whiteboard riddles; our technical assessments reflect actual day-to-day codebases with compensation for candidates' time.`,
    benefits: [
      { title: 'Generous ESOP Pool', desc: '4-year vesting with 1-year cliff and generous 10-year exercise window post-exit.' },
      { title: 'Comprehensive Health Cover', desc: '₹10 Lakhs family medical insurance + 100% covered mental health therapy sessions.' },
      { title: 'Annual Learning Stipend', desc: '₹1,50,000 yearly budget for technical conferences, courses, books, and home office gear.' },
      { title: 'Flexible / Hybrid Freedom', desc: 'Work from our Bengaluru tech hub or asynchronously from anywhere in India.' },
    ],
    activeJobs: [
      { id: 'job_1', title: 'Senior Product Designer', dept: 'Design Systems', ctc: '₹28L – ₹38L CTC + ESOPs', type: 'Full-time • Hybrid' },
      { id: 'job_2', title: 'Lead Fullstack Engineer (Next.js/Node)', dept: 'Platform Core', ctc: '₹36L – ₹50L CTC + ESOPs', type: 'Full-time • Remote' },
      { id: 'job_3', title: 'Site Reliability Engineer (Kubernetes)', dept: 'Infrastructure', ctc: '₹32L – ₹45L CTC + ESOPs', type: 'Full-time • Bengaluru' },
    ],
    social: {
      linkedin: 'https://linkedin.com/company/northstarlabs',
      website: 'https://northstarlabs.in',
    },
  });

  const [formData, setFormData] = useState({ ...profile });

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setProfile({ ...formData });
    setIsEditModalOpen(false);
    notify('Company & Recruiter profile updated successfully.');
  };

  return (
    <EmployerShell active="Profile" activeNav="Profile">
      <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6">
        {toast && (
          <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-lg bg-[#0F1B2D] px-4 py-3 text-xs font-semibold text-white shadow-xl">
            <CheckCircle2 size={16} className="text-[#B8955A]" />
            <span>{toast}</span>
          </div>
        )}

        {/* Top Bar */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-[#E5E1D8] pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#5A6E85]">
              <Link href="/employer/dashboard" className="hover:text-[#0F1B2D]">Recruiter Portal</Link>
              <span>/</span>
              <span className="font-semibold text-[#0F1B2D]">Employer Profile</span>
            </div>
            <h1 className="mt-1 font-serif text-2xl font-bold text-[#0F1B2D]">
              Company & Recruiter Profile
            </h1>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => {
                if (navigator.clipboard) {
                  navigator.clipboard.writeText(window.location.href);
                  notify('Employer profile link copied to clipboard.');
                }
              }}
              className="flex items-center gap-1.5 rounded-lg border border-[#E5E1D8] bg-white px-3 py-1.5 text-xs font-semibold text-[#0F1B2D] hover:bg-[#FAF8F4] transition shadow-xs"
            >
              <Share2 size={13} className="text-[#5A6E85]" />
              Share Profile
            </button>
            <Link href="/employer/profile/edit">
              <button
                type="button"
                className="flex items-center gap-1.5 rounded-lg bg-[#0F1B2D] px-4 py-1.5 text-xs font-semibold text-white hover:bg-[#1C2B42] transition shadow-xs"
              >
                <Edit3 size={13} className="text-[#B8955A]" />
                Edit Profile
              </button>
            </Link>
          </div>
        </div>

        {/* Hero Card */}
        <div className="rounded-2xl border border-[#E5E1D8] bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-[#0F1B2D] font-serif text-2xl font-bold text-white shadow-md">
                {profile.avatar}
              </div>

              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-serif text-xl font-bold text-[#0F1B2D] sm:text-2xl">
                    {profile.companyName}
                  </h2>
                  <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-800 border border-emerald-200">
                    <CheckCircle2 size={13} /> Verified Employer
                  </span>
                  <span className="flex items-center gap-1 rounded-full bg-[#B8955A]/15 px-2.5 py-0.5 text-xs font-semibold text-[#8C6D37] border border-[#B8955A]/30">
                    <Clock size={13} /> {profile.responseSla}
                  </span>
                </div>

                <p className="text-sm font-medium text-[#4A5568]">
                  {profile.recruiterName} • {profile.recruiterTitle}
                </p>

                <div className="flex flex-wrap items-center gap-3 text-xs text-[#5A6E85]">
                  <span className="flex items-center gap-1">
                    <MapPin size={13} className="text-[#7B8CA3]" />
                    {profile.headquarters}
                  </span>
                  <span>•</span>
                  <span>{profile.stage}</span>
                  <span>•</span>
                  <span>{profile.teamSize}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-3 border-t border-[#F2EFE9] pt-4 lg:border-t-0 lg:pt-0">
              <Link href="/employer/jobs/new">
                <button className="flex items-center gap-1.5 rounded-lg bg-[#0F1B2D] px-4 py-2 text-xs font-bold text-white hover:bg-[#1C2B42] transition">
                  <Briefcase size={14} className="text-[#B8955A]" />
                  Post a New Job
                </button>
              </Link>
            </div>
          </div>

          {/* Metrics Strip */}
          <div className="mt-6 grid grid-cols-2 gap-3 border-t border-[#F2EFE9] pt-5 sm:grid-cols-4">
            <div className="rounded-xl bg-[#FAF8F4] p-3 text-center">
              <p className="font-serif text-xl font-bold text-[#0F1B2D]">{profile.activeJobsCount}</p>
              <p className="text-[11px] text-[#5A6E85]">Live Job Openings</p>
            </div>
            <div className="rounded-xl bg-[#FAF8F4] p-3 text-center">
              <p className="font-serif text-xl font-bold text-[#0F1B2D]">{profile.candidatesScreenedCount}</p>
              <p className="text-[11px] text-[#5A6E85]">Talent Screened</p>
            </div>
            <div className="rounded-xl bg-[#FAF8F4] p-3 text-center">
              <p className="font-serif text-xl font-bold text-emerald-800">{profile.hiresCount}</p>
              <p className="text-[11px] text-[#5A6E85]">Verified Hires Made</p>
            </div>
            <div className="rounded-xl bg-[#FAF8F4] p-3 text-center">
              <p className="font-serif text-xl font-bold text-[#B8955A]">{profile.offerAcceptanceRate}</p>
              <p className="text-[11px] text-[#5A6E85]">Offer Acceptance Rate</p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mt-6 flex border-b border-[#E5E1D8] text-xs font-semibold">
          {[
            { id: 'company', label: 'Company Overview & Culture' },
            { id: 'recruiter', label: 'Hiring Philosophy & Process' },
            { id: 'openings', label: 'Active Openings (' + profile.activeJobs.length + ')' },
            { id: 'benefits', label: 'Team Benefits & ESOPs' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`border-b-2 px-4 py-3 transition ${
                activeTab === tab.id
                  ? 'border-[#B8955A] text-[#0F1B2D] font-bold'
                  : 'border-transparent text-[#7B8CA3] hover:text-[#0F1B2D]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Company */}
        {activeTab === 'company' && (
          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              <div className="rounded-2xl border border-[#E5E1D8] bg-white p-6 shadow-sm">
                <h3 className="font-serif text-base font-bold text-[#0F1B2D] mb-3 flex items-center gap-2">
                  <Building2 size={16} className="text-[#B8955A]" />
                  About {profile.companyName}
                </h3>
                <p className="text-xs leading-relaxed text-[#4A5568] whitespace-pre-line">
                  {profile.companyBio}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-2xl border border-[#E5E1D8] bg-white p-5 shadow-sm space-y-3 text-xs">
                <h4 className="font-serif font-bold text-[#0F1B2D]">Company Links</h4>
                <div className="space-y-2">
                  <a
                    href={profile.social.website}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between rounded-lg border border-[#E5E1D8] p-2 hover:border-[#0F1B2D] transition"
                  >
                    <span className="flex items-center gap-2 text-[#0F1B2D]">
                      <Globe size={15} className="text-[#B8955A]" /> Careers Website
                    </span>
                    <ExternalLink size={12} className="text-[#7B8CA3]" />
                  </a>
                  <a
                    href={profile.social.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between rounded-lg border border-[#E5E1D8] p-2 hover:border-[#0F1B2D] transition"
                  >
                    <span className="flex items-center gap-2 text-[#0F1B2D]">
                      <Linkedin size={15} className="text-[#0077b5]" /> LinkedIn Page
                    </span>
                    <ExternalLink size={12} className="text-[#7B8CA3]" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Recruiter */}
        {activeTab === 'recruiter' && (
          <div className="mt-6 rounded-2xl border border-[#E5E1D8] bg-white p-6 shadow-sm">
            <h3 className="font-serif text-base font-bold text-[#0F1B2D] mb-3 flex items-center gap-2">
              <HeartHandshake size={16} className="text-[#B8955A]" />
              Candidate Experience & SLA
            </h3>
            <p className="text-xs leading-relaxed text-[#4A5568] whitespace-pre-line">
              {profile.hiringPhilosophy}
            </p>
          </div>
        )}

        {/* Tab 3: Openings */}
        {activeTab === 'openings' && (
          <div className="mt-6 space-y-3">
            {profile.activeJobs.map((job) => (
              <div key={job.id} className="rounded-2xl border border-[#E5E1D8] bg-white p-5 shadow-sm flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h4 className="font-serif text-base font-bold text-[#0F1B2D]">{job.title}</h4>
                  <p className="text-xs text-[#5A6E85]">{job.dept} • {job.type}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="rounded bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800 border border-emerald-200">
                    {job.ctc}
                  </span>
                  <Link href="/employer/jobs">
                    <button className="rounded-lg border border-[#0F1B2D] px-3 py-1.5 text-xs font-semibold text-[#0F1B2D] hover:bg-[#0F1B2D] hover:text-white transition">
                      Manage Applicants
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 4: Benefits */}
        {activeTab === 'benefits' && (
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {profile.benefits.map((b, i) => (
              <div key={i} className="rounded-2xl border border-[#E5E1D8] bg-white p-5 shadow-sm space-y-1.5 text-xs">
                <h4 className="font-bold text-[#0F1B2D] text-sm flex items-center gap-2">
                  <Sparkles size={15} className="text-[#B8955A]" />
                  {b.title}
                </h4>
                <p className="text-[#5A6E85] leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* EDIT MODAL */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F1B2D]/60 p-4 backdrop-blur-sm animate-in fade-in">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-[#E5E1D8] bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#F2EFE9] pb-3">
              <h3 className="font-serif text-lg font-bold text-[#0F1B2D]">
                Edit Company & Recruiter Profile
              </h3>
              <button onClick={() => setIsEditModalOpen(false)} className="text-[#7B8CA3] hover:text-[#0F1B2D]">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7B8CA3] mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full rounded-lg border border-[#E5E1D8] p-2 text-xs text-[#0F1B2D] focus:border-[#0F1B2D] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7B8CA3] mb-1">
                    Recruiter Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.recruiterName}
                    onChange={(e) => setFormData({ ...formData, recruiterName: e.target.value })}
                    className="w-full rounded-lg border border-[#E5E1D8] p-2 text-xs text-[#0F1B2D] focus:border-[#0F1B2D] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7B8CA3] mb-1">
                    Recruiter Title
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.recruiterTitle}
                    onChange={(e) => setFormData({ ...formData, recruiterTitle: e.target.value })}
                    className="w-full rounded-lg border border-[#E5E1D8] p-2 text-xs text-[#0F1B2D] focus:border-[#0F1B2D] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7B8CA3] mb-1">
                  About the Company & Tech Culture
                </label>
                <textarea
                  rows={4}
                  value={formData.companyBio}
                  onChange={(e) => setFormData({ ...formData, companyBio: e.target.value })}
                  className="w-full rounded-lg border border-[#E5E1D8] p-2.5 text-xs text-[#0F1B2D] focus:border-[#0F1B2D] focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 border-t border-[#F2EFE9] pt-4">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="rounded-lg border border-[#E5E1D8] px-4 py-2 text-xs font-semibold text-[#5A6E85] hover:bg-[#FAF8F4]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-[#0F1B2D] px-5 py-2 text-xs font-bold text-white hover:bg-[#1C2B42]"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </EmployerShell>
  );
}
