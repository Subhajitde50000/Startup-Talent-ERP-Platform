'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  User,
  CheckCircle2,
  Building2,
  Briefcase,
  Award,
  Sparkles,
  MapPin,
  Clock,
  DollarSign,
  Share2,
  Edit3,
  ExternalLink,
  Linkedin,
  Twitter,
  Github,
  Globe,
  PieChart,
  ShieldCheck,
  FileText,
  X,
  ChevronRight,
  TrendingUp,
  Layers,
  GraduationCap,
  Scale,
  Users,
} from 'lucide-react';
import { StartupShell } from '@/components';

export default function StartupUserProfilePage() {
  const [toast, setToast] = useState('');
  const [activeTab, setActiveTab] = useState('journey'); // 'journey' | 'equity' | 'governance' | 'credentials'
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const notify = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  // Personal Founder User Profile State
  const [profile, setProfile] = useState({
    name: 'Aarav Kapoor',
    handle: 'aarav_finflow',
    title: 'Founder & Chief Executive Officer',
    company: 'FinFlow Technologies Pvt Ltd',
    companyProfileUrl: '/startup/profile',
    roleTag: 'Startup Founder',
    dinNumber: 'DIN: 08942119 (MCA Verified)',
    location: 'Pune & Bengaluru, India',
    email: 'aarav.kapoor@finflow.in',
    avatar: 'AK',
    verified: true,
    dpiitVerified: true,
    verificationId: 'FND-2026-IND-1044',
    memberSince: 'January 2024',
    education: 'B.Tech in Computer Science, IIT Bombay (2018)',
    priorRole: 'Ex-Lead Product Manager @ Razorpay (Disbursements)',
    communityStats: {
      helpfulVotes: 14,
      acceptedAnswers: 6,
      spacesJoined: 5,
    },
    equityOwnership: {
      commonStockShares: '5,840,000',
      ownershipPercentage: '58.4%',
      vestingSchedule: '4-Year Vesting with 1-Year Cliff (36 of 48 Months Vested)',
      unvestedShares: '1,460,000',
      coFounders: [
        { name: 'Rohan Verma', role: 'Co-Founder & CTO', equity: '29.6%', status: 'Active • 36/48 mo vested' },
        { name: 'ESOP Pool Reserve', role: 'Unallocated Employee Pool', equity: '12.0%', status: 'Trustee Managed' },
      ],
    },
    governance: [
      { designation: 'Managing Director & CEO', entity: 'FinFlow Technologies Pvt Ltd', appointmentDate: '14 Oct 2023', status: 'Active' },
      { designation: 'Board Member', entity: 'Forma Founder Advisory Council', appointmentDate: '01 Feb 2026', status: 'Active' },
    ],
    bio: `Founder & CEO of FinFlow Technologies. Obsessed with solving cross-border GST invoicing, treasury friction, and automated supplier reconciliation for fast-growing Indian software startups.
    
Prior to FinFlow, I spent 4 years at Razorpay leading the Corporate Disbursements and Neo-Banking product pods, scaling payment volume from ₹50 Cr/mo to over ₹1,800 Cr/mo. Computer Science graduate from IIT Bombay.`,
    founderVision: `Indian B2B SaaS startups are competing on global stages, yet our back-office banking infrastructure remains bogged down by manual reconciliation, slow export remittance clearances, and complex tax compliance. At FinFlow, we are automating this entire treasury workflow from code to bank account.`,
    credentials: [
      { title: 'Bachelor of Technology (Computer Science & Engineering)', institution: 'Indian Institute of Technology (IIT) Bombay', year: '2014 – 2018' },
      { title: 'Forbes 30 Under 30 Asia Nominee (Enterprise Technology)', institution: 'Forbes Asia', year: '2025' },
      { title: 'Lead Product Manager (Corporate Disbursements)', institution: 'Razorpay Software Pvt Ltd', year: '2019 – 2023' },
      { title: 'Software Engineering Fellow', institution: 'Flipkart Internet Pvt Ltd', year: '2018 – 2019' },
    ],
    social: {
      linkedin: 'https://linkedin.com/in/aaravkapoor-finflow',
      twitter: 'https://x.com/aarav_kapoor',
      github: 'https://github.com/aarav-finflow',
      personalSite: 'https://aaravkapoor.me',
    },
  });

  const [formData, setFormData] = useState({ ...profile });

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setProfile({ ...formData });
    setIsEditModalOpen(false);
    notify('Personal founder profile updated successfully.');
  };

  return (
    <StartupShell
      active="Founder Profile"
      title="Founder Personal Profile"
      description="Manage your personal founder credentials, cap table equity ownership, directorships, and verified bio."
      backHref="/startup/dashboard"
      backLabel="← Dashboard"
    >
      <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6">
        {toast && (
          <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-lg bg-[#0F1B2D] px-4 py-3 text-xs font-semibold text-white shadow-xl animate-in fade-in">
            <CheckCircle2 size={16} className="text-[#B8955A]" />
            <span>{toast}</span>
          </div>
        )}

        {/* Top Header Bar */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-[#E5E1D8] pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#5A6E85]">
              <Link href="/startup/dashboard" className="hover:text-[#0F1B2D]">Workspace</Link>
              <span>/</span>
              <span className="font-semibold text-[#0F1B2D]">Founder Personal Profile</span>
            </div>
            <h1 className="mt-1 font-serif text-2xl font-bold text-[#0F1B2D]">
              Founder Personal Profile
            </h1>
          </div>

          <div className="flex items-center gap-2.5">
            <Link href="/startup/profile">
              <button
                type="button"
                className="flex items-center gap-1.5 rounded-lg border border-[#E5E1D8] bg-white px-3.5 py-1.5 text-xs font-semibold text-[#0F1B2D] hover:bg-[#FAF8F4] transition shadow-xs"
              >
                <Building2 size={13} className="text-[#B8955A]" />
                View Startup Company Profile →
              </button>
            </Link>
            <button
              type="button"
              onClick={() => {
                if (navigator.clipboard) {
                  navigator.clipboard.writeText(window.location.href);
                  notify('Personal profile link copied to clipboard.');
                }
              }}
              className="flex items-center gap-1.5 rounded-lg border border-[#E5E1D8] bg-white px-3 py-1.5 text-xs font-semibold text-[#0F1B2D] hover:bg-[#FAF8F4] transition shadow-xs"
            >
              <Share2 size={13} className="text-[#5A6E85]" />
              Share
            </button>
            <Link href="/startup/user-profile/edit">
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
                    {profile.name}
                  </h2>
                  <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-800 border border-emerald-200">
                    <CheckCircle2 size={13} /> Verified Founder
                  </span>
                  <span className="flex items-center gap-1 rounded-full bg-[#B8955A]/15 px-2.5 py-0.5 text-xs font-semibold text-[#8C6D37] border border-[#B8955A]/30">
                    <ShieldCheck size={13} /> DPIIT Accredited
                  </span>
                </div>

                <p className="text-sm font-medium text-[#4A5568]">
                  {profile.title} @ <Link href="/startup/profile" className="font-semibold text-[#0F1B2D] hover:underline">{profile.company}</Link>
                </p>

                <div className="flex flex-wrap items-center gap-3 text-xs text-[#5A6E85]">
                  <span className="flex items-center gap-1">
                    <MapPin size={13} className="text-[#7B8CA3]" />
                    {profile.location}
                  </span>
                  <span>•</span>
                  <span>{profile.education}</span>
                  <span>•</span>
                  <span className="font-mono text-[#7B8CA3]">{profile.dinNumber}</span>
                </div>
              </div>
            </div>

            {/* Link to Startup Company Profile Notice */}
            <div className="rounded-xl border border-[#E5E1D8] bg-[#FAF8F4] p-4 text-xs space-y-2 lg:max-w-xs">
              <div className="flex items-center gap-1.5 font-bold text-[#0F1B2D]">
                <Building2 size={14} className="text-[#B8955A]" />
                <span>Associated Company</span>
              </div>
              <p className="text-[11px] text-[#5A6E85] leading-relaxed">
                Looking for pitch decks, financials, cap table data room, or DPIIT certificate?
              </p>
              <Link
                href="/startup/profile"
                className="inline-flex items-center gap-1 text-xs font-bold text-[#B8955A] hover:underline"
              >
                Go to Startup Company Profile <ChevronRight size={13} />
              </Link>
            </div>
          </div>

          {/* Key Founder Metrics */}
          <div className="mt-6 grid grid-cols-2 gap-3 border-t border-[#F2EFE9] pt-5 sm:grid-cols-4">
            <div className="rounded-xl bg-[#FAF8F4] p-3 text-center">
              <p className="font-serif text-xl font-bold text-[#0F1B2D]">{profile.equityOwnership.ownershipPercentage}</p>
              <p className="text-[11px] text-[#5A6E85]">Founder Equity Stake</p>
            </div>
            <div className="rounded-xl bg-[#FAF8F4] p-3 text-center">
              <p className="font-serif text-xl font-bold text-[#0F1B2D]">36 / 48 Mo</p>
              <p className="text-[11px] text-[#5A6E85]">Founder Shares Vested</p>
            </div>
            <div className="rounded-xl bg-[#FAF8F4] p-3 text-center">
              <p className="font-serif text-xl font-bold text-emerald-800">{profile.communityStats.helpfulVotes}</p>
              <p className="text-[11px] text-[#5A6E85]">Community Helpful Votes</p>
            </div>
            <div className="rounded-xl bg-[#FAF8F4] p-3 text-center">
              <p className="font-serif text-xl font-bold text-[#B8955A]">{profile.communityStats.acceptedAnswers}</p>
              <p className="text-[11px] text-[#5A6E85]">Accepted Solutions</p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mt-6 flex border-b border-[#E5E1D8] text-xs font-semibold">
          {[
            { id: 'journey', label: 'Founder Journey & Vision' },
            { id: 'equity', label: 'Founder Equity & Cap Table' },
            { id: 'governance', label: 'Directorships & MCA Compliance' },
            { id: 'credentials', label: 'Education & Career Track Record' },
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

        {/* Tab 1: Journey & Vision */}
        {activeTab === 'journey' && (
          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              <div className="rounded-2xl border border-[#E5E1D8] bg-white p-6 shadow-sm">
                <h3 className="font-serif text-base font-bold text-[#0F1B2D] mb-3 flex items-center gap-2">
                  <User size={16} className="text-[#B8955A]" />
                  Founder Biography & Story
                </h3>
                <p className="text-xs leading-relaxed text-[#4A5568] whitespace-pre-line">
                  {profile.bio}
                </p>
              </div>

              <div className="rounded-2xl border border-[#E5E1D8] bg-white p-6 shadow-sm">
                <h3 className="font-serif text-base font-bold text-[#0F1B2D] mb-3 flex items-center gap-2">
                  <Sparkles size={16} className="text-[#B8955A]" />
                  Founder Vision & Company Mission
                </h3>
                <p className="text-xs leading-relaxed text-[#4A5568] whitespace-pre-line">
                  {profile.founderVision}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-2xl border border-[#E5E1D8] bg-white p-5 shadow-sm space-y-3 text-xs">
                <h4 className="font-serif font-bold text-[#0F1B2D]">Verified Founder Channels</h4>
                <div className="space-y-2">
                  <a
                    href={profile.social.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between rounded-lg border border-[#E5E1D8] p-2.5 hover:border-[#0F1B2D] transition"
                  >
                    <span className="flex items-center gap-2 text-[#0F1B2D]">
                      <Linkedin size={15} className="text-[#0077b5]" /> LinkedIn Profile
                    </span>
                    <ExternalLink size={12} className="text-[#7B8CA3]" />
                  </a>

                  <a
                    href={profile.social.twitter}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between rounded-lg border border-[#E5E1D8] p-2.5 hover:border-[#0F1B2D] transition"
                  >
                    <span className="flex items-center gap-2 text-[#0F1B2D]">
                      <Twitter size={15} className="text-[#1da1f2]" /> Twitter / X
                    </span>
                    <ExternalLink size={12} className="text-[#7B8CA3]" />
                  </a>

                  <a
                    href={profile.social.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between rounded-lg border border-[#E5E1D8] p-2.5 hover:border-[#0F1B2D] transition"
                  >
                    <span className="flex items-center gap-2 text-[#0F1B2D]">
                      <Github size={15} /> GitHub Profile
                    </span>
                    <ExternalLink size={12} className="text-[#7B8CA3]" />
                  </a>
                </div>

                <div className="border-t border-[#F2EFE9] pt-3 text-[11px] text-[#5A6E85]">
                  <span>Member of DPIIT Startup Founder Network since {profile.memberSince}</span>
                </div>
              </div>

              {/* Founder Lounge Direct Access */}
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-5 text-xs text-emerald-950 space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                  <ShieldCheck size={16} className="text-emerald-700" />
                  <span>Founders Lounge Access</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  As an accredited DPIIT founder, your account has full access to the private Founders Lounge.
                </p>
                <Link
                  href="/startup/community"
                  className="inline-flex items-center gap-1 font-bold text-emerald-900 hover:underline pt-1"
                >
                  Enter Founders Lounge →
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Equity & Cap Table */}
        {activeTab === 'equity' && (
          <div className="mt-6 rounded-2xl border border-[#E5E1D8] bg-white p-6 shadow-sm space-y-5">
            <div>
              <h3 className="font-serif text-base font-bold text-[#0F1B2D] mb-1 flex items-center gap-2">
                <PieChart size={16} className="text-[#B8955A]" />
                Founder Shareholding & Vesting Schedule
              </h3>
              <p className="text-xs text-[#5A6E85]">
                Cryptographically registered on company electronic cap table ledger.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-[#E5E1D8] bg-[#FAF8F4] p-4 text-xs">
                <span className="text-[#5A6E85] block mb-1">Common Shares Held</span>
                <span className="font-serif text-lg font-bold text-[#0F1B2D]">{profile.equityOwnership.commonStockShares}</span>
              </div>
              <div className="rounded-xl border border-[#E5E1D8] bg-[#FAF8F4] p-4 text-xs">
                <span className="text-[#5A6E85] block mb-1">Diluted Ownership</span>
                <span className="font-serif text-lg font-bold text-[#0F1B2D]">{profile.equityOwnership.ownershipPercentage}</span>
              </div>
              <div className="rounded-xl border border-[#E5E1D8] bg-[#FAF8F4] p-4 text-xs">
                <span className="text-[#5A6E85] block mb-1">Vesting Status</span>
                <span className="font-serif text-lg font-bold text-emerald-800">36 / 48 Months</span>
              </div>
            </div>

            <div className="rounded-xl border border-[#E5E1D8] bg-[#FAF8F4] p-4 text-xs">
              <span className="font-bold text-[#0F1B2D] block mb-1">Co-Founders & Shared Reserve</span>
              <div className="divide-y divide-[#E5E1D8] mt-2">
                {profile.equityOwnership.coFounders.map((cf, i) => (
                  <div key={i} className="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-[#0F1B2D]">{cf.name}</p>
                      <p className="text-[11px] text-[#5A6E85]">{cf.role}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-[#0F1B2D]">{cf.equity}</p>
                      <p className="text-[10px] text-[#7B8CA3]">{cf.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Governance & Directorships */}
        {activeTab === 'governance' && (
          <div className="mt-6 rounded-2xl border border-[#E5E1D8] bg-white p-6 shadow-sm">
            <h3 className="font-serif text-base font-bold text-[#0F1B2D] mb-4 flex items-center gap-2">
              <Scale size={16} className="text-[#B8955A]" />
              MCA Director Identification & Board Positions
            </h3>
            <div className="divide-y divide-[#F2EFE9] text-xs">
              {profile.governance.map((gov, i) => (
                <div key={i} className="py-3.5 first:pt-0 last:pb-0 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-[#0F1B2D]">{gov.designation}</p>
                    <p className="text-[#5A6E85]">{gov.entity}</p>
                  </div>
                  <div className="text-right">
                    <span className="rounded bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                      {gov.status}
                    </span>
                    <p className="text-[10px] text-[#7B8CA3] mt-0.5">Appointed: {gov.appointmentDate}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Credentials */}
        {activeTab === 'credentials' && (
          <div className="mt-6 rounded-2xl border border-[#E5E1D8] bg-white p-6 shadow-sm">
            <h3 className="font-serif text-base font-bold text-[#0F1B2D] mb-4 flex items-center gap-2">
              <GraduationCap size={16} className="text-[#B8955A]" />
              Education, Alumni Networks & Track Record
            </h3>
            <div className="divide-y divide-[#F2EFE9] text-xs">
              {profile.credentials.map((cred, i) => (
                <div key={i} className="py-3.5 first:pt-0 last:pb-0 flex items-start justify-between">
                  <div>
                    <p className="font-bold text-[#0F1B2D]">{cred.title}</p>
                    <p className="text-[#5A6E85]">{cred.institution}</p>
                  </div>
                  <span className="rounded bg-[#FAF8F4] px-2.5 py-1 text-[11px] font-mono text-[#7B8CA3] border border-[#E5E1D8]">
                    {cred.year}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* EDIT MODAL */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F1B2D]/60 p-4 backdrop-blur-sm animate-in fade-in">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-[#E5E1D8] bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#F2EFE9] pb-3">
              <h3 className="font-serif text-lg font-bold text-[#0F1B2D]">
                Edit Founder Personal Profile
              </h3>
              <button onClick={() => setIsEditModalOpen(false)} className="text-[#7B8CA3] hover:text-[#0F1B2D]">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7B8CA3] mb-1">
                  Founder Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-lg border border-[#E5E1D8] p-2 text-xs text-[#0F1B2D] focus:border-[#0F1B2D] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7B8CA3] mb-1">
                  Executive Role / Title
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full rounded-lg border border-[#E5E1D8] p-2 text-xs text-[#0F1B2D] focus:border-[#0F1B2D] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7B8CA3] mb-1">
                    MCA DIN Number
                  </label>
                  <input
                    type="text"
                    value={formData.dinNumber}
                    onChange={(e) => setFormData({ ...formData, dinNumber: e.target.value })}
                    className="w-full rounded-lg border border-[#E5E1D8] p-2 text-xs text-[#0F1B2D] focus:border-[#0F1B2D] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7B8CA3] mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full rounded-lg border border-[#E5E1D8] p-2 text-xs text-[#0F1B2D] focus:border-[#0F1B2D] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7B8CA3] mb-1">
                  Founder Biography & Story
                </label>
                <textarea
                  rows={4}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full rounded-lg border border-[#E5E1D8] p-2.5 text-xs text-[#0F1B2D] focus:border-[#0F1B2D] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7B8CA3] mb-1">
                  Founder Vision & Company Mission
                </label>
                <textarea
                  rows={3}
                  value={formData.founderVision}
                  onChange={(e) => setFormData({ ...formData, founderVision: e.target.value })}
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
                  Save Profile Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </StartupShell>
  );
}
