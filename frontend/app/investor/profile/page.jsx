'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  User,
  CheckCircle2,
  Briefcase,
  TrendingUp,
  PieChart,
  ShieldCheck,
  Building2,
  DollarSign,
  Share2,
  Edit3,
  ExternalLink,
  Linkedin,
  Twitter,
  Globe,
  MapPin,
  Clock,
  Layers,
  Award,
  ChevronRight,
  X,
  FileText,
  BadgeCheck,
  Lock,
} from 'lucide-react';
import { InvestorShell } from '@/components';

export default function InvestorProfilePage() {
  const [toast, setToast] = useState('');
  const [activeTab, setActiveTab] = useState('thesis'); // 'thesis' | 'portfolio' | 'criteria' | 'legal'
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const notify = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const [profile, setProfile] = useState({
    name: 'Arjun Mehta',
    handle: 'arjun_forma_vc',
    title: 'Angel Syndicate Lead & Early-Stage Tech Investor',
    firm: 'Zenith Capital / Forma Angel Syndicate',
    location: 'Mumbai & Bengaluru, India',
    email: 'arjun@zenithcap.in',
    avatar: 'AM',
    verified: true,
    accreditedAngel: true,
    sebiRegistered: true,
    verificationId: 'INV-SEBI-2026-4419',
    memberSince: 'January 2024',
    ticketSizeRange: '₹25 Lakhs – ₹2.5 Crores',
    stageFocus: 'Pre-Seed, Seed & Pre-Series A',
    totalInvestments: 24,
    activePortfolio: 20,
    exitsCount: 4,
    capitalDeployed: '₹48 Crores',
    averageMoic: '3.4x',
    sectors: ['B2B SaaS', 'Fintech Infrastructure', 'Developer Tools & Cloud', 'DeepTech & Enterprise AI'],
    thesis: `We back repeat technical founders and domain specialists solving friction in high-value Indian and cross-border B2B supply chains. We write high-conviction first checks at Seed and support through lead follow-ons, executive customer introductions, and clean US-India flip structuring.`,
    evaluationRubric: [
      { criterion: 'Founder-Market Fit', weight: '35%', desc: 'Deep technical mastery or 7+ years inside the industry being disrupted.' },
      { criterion: 'Early Velocity & PMF', weight: '30%', desc: 'Organic customer pull, high retention, and low churn in early cohorts.' },
      { criterion: 'Gross Margin & Unit Economics', weight: '20%', desc: '>75% gross software margin with scalable sales velocity.' },
      { criterion: 'Clean Cap Table & Governance', weight: '15%', desc: 'Founder equity >70% at seed; transparent DPIIT compliance.' },
    ],
    portfolio: [
      {
        name: 'FinFlow Technologies',
        sector: 'Fintech / Treasury SaaS',
        stage: 'Seed Stage',
        checkSize: '₹1.2 Crores',
        year: '2025',
        status: 'High Growth',
        coInvestors: 'Peak XV Surge, AngelList Syndicate',
        metrics: '₹3.4 Cr ARR • 22% MoM growth',
      },
      {
        name: 'RazorScale HR',
        sector: 'Enterprise HR Tech',
        stage: 'Pre-Series A',
        checkSize: '₹1.8 Crores',
        year: '2024',
        status: 'Active Portfolio',
        coInvestors: 'Blume Founders Fund',
        metrics: '₹6.1 Cr ARR • Enterprise Breakeven',
      },
      {
        name: 'CloudArmor Security',
        sector: 'Cybersecurity & SOC2',
        stage: 'Seed Stage',
        checkSize: '₹75 Lakhs',
        year: '2025',
        status: 'Active Portfolio',
        coInvestors: 'Titan Capital',
        metrics: '18 US Enterprise pilots',
      },
      {
        name: 'AgriSense IoT',
        sector: 'AgriTech Hardware & Edge',
        stage: 'Seed Stage',
        checkSize: '₹50 Lakhs',
        year: '2024',
        status: 'Active Portfolio',
        coInvestors: 'Omnivore Angel Pool',
        metrics: '1,400 farm deployments',
      },
    ],
    legalDetails: [
      { label: 'SEBI Registration', value: 'Cat-I AIF Angel Sub-Fund (IN/AIF1/24-25/0981)' },
      { label: 'PAN & Entity KYC', value: 'Verified • Aadhaar/e-Sign Authenticated' },
      { label: 'DPIIT Section 56(2)(viib)', value: 'Exempt Angel Investor Certification on file' },
      { label: 'Custody & Escrow Bank', value: 'HDFC Bank Special Escrow Trust Account' },
    ],
    social: {
      linkedin: 'https://linkedin.com/in/arjunmehtavc',
      twitter: 'https://x.com/arjun_vc',
      website: 'https://zenithcap.in',
    },
  });

  const [formData, setFormData] = useState({ ...profile });

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setProfile({ ...formData });
    setIsEditModalOpen(false);
    notify('Investor profile updated successfully.');
  };

  return (
    <InvestorShell active="Profile" notify={notify} toast={toast}>
      <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6">
        {/* Top Header */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-[#E5E1D8] pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#5A6E85]">
              <Link href="/investor/dashboard" className="hover:text-[#0F1B2D]">Workspace</Link>
              <span>/</span>
              <span className="font-semibold text-[#0F1B2D]">Investor Profile</span>
            </div>
            <h1 className="mt-1 font-serif text-2xl font-bold text-[#0F1B2D]">
              Investor Profile & Syndicate Thesis
            </h1>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => {
                if (navigator.clipboard) {
                  navigator.clipboard.writeText(window.location.href);
                  notify('Investor profile link copied to clipboard.');
                }
              }}
              className="flex items-center gap-1.5 rounded-lg border border-[#E5E1D8] bg-white px-3 py-1.5 text-xs font-semibold text-[#0F1B2D] hover:bg-[#FAF8F4] transition shadow-xs"
            >
              <Share2 size={13} className="text-[#5A6E85]" />
              Share Profile
            </button>
            <Link href="/investor/profile/edit">
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
                    <CheckCircle2 size={13} /> Verified Investor
                  </span>
                  <span className="flex items-center gap-1 rounded-full bg-[#B8955A]/15 px-2.5 py-0.5 text-xs font-semibold text-[#8C6D37] border border-[#B8955A]/30">
                    <ShieldCheck size={13} /> SEBI AIF Verified
                  </span>
                </div>

                <p className="text-sm font-medium text-[#4A5568]">
                  {profile.title} • {profile.firm}
                </p>

                <div className="flex flex-wrap items-center gap-3 text-xs text-[#5A6E85]">
                  <span className="flex items-center gap-1">
                    <MapPin size={13} className="text-[#7B8CA3]" />
                    {profile.location}
                  </span>
                  <span>•</span>
                  <span className="font-mono text-[#7B8CA3]">ID: {profile.verificationId}</span>
                </div>
              </div>
            </div>

            {/* Quick Check Size Range */}
            <div className="flex flex-wrap items-center gap-4 border-t border-[#F2EFE9] pt-4 lg:border-t-0 lg:pt-0">
              <div className="rounded-xl border border-[#E5E1D8] bg-[#FAF8F4] p-3 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-[#0F1B2D]">
                  <DollarSign size={14} className="text-[#B8955A]" />
                  <span>Check Size Range</span>
                </div>
                <p className="mt-1 font-serif text-lg font-bold text-[#0F1B2D]">
                  {profile.ticketSizeRange}
                </p>
                <p className="text-[10px] text-[#5A6E85]">Focus: {profile.stageFocus}</p>
              </div>

              <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-3 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                  <CheckCircle2 size={14} className="text-emerald-700" />
                  <span>Due Diligence SLA</span>
                </div>
                <p className="mt-1 font-medium text-emerald-800">
                  14-Day Term Sheet Turnaround
                </p>
                <Link
                  href="/investor/dashboard"
                  className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-bold text-emerald-900 hover:underline"
                >
                  Review dealflow pipeline →
                </Link>
              </div>
            </div>
          </div>

          {/* Key Portfolio Metrics */}
          <div className="mt-6 grid grid-cols-2 gap-3 border-t border-[#F2EFE9] pt-5 sm:grid-cols-4">
            <div className="rounded-xl bg-[#FAF8F4] p-3 text-center">
              <p className="font-serif text-xl font-bold text-[#0F1B2D]">{profile.totalInvestments}</p>
              <p className="text-[11px] text-[#5A6E85]">Total Investments</p>
            </div>
            <div className="rounded-xl bg-[#FAF8F4] p-3 text-center">
              <p className="font-serif text-xl font-bold text-[#0F1B2D]">{profile.capitalDeployed}</p>
              <p className="text-[11px] text-[#5A6E85]">Capital Deployed</p>
            </div>
            <div className="rounded-xl bg-[#FAF8F4] p-3 text-center">
              <p className="font-serif text-xl font-bold text-emerald-800">{profile.exitsCount}</p>
              <p className="text-[11px] text-[#5A6E85]">Successful Follow-on Exits</p>
            </div>
            <div className="rounded-xl bg-[#FAF8F4] p-3 text-center">
              <p className="font-serif text-xl font-bold text-[#B8955A]">{profile.averageMoic}</p>
              <p className="text-[11px] text-[#5A6E85]">Portfolio MOIC</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-6 flex border-b border-[#E5E1D8] text-xs font-semibold">
          {[
            { id: 'thesis', label: 'Investment Thesis & Sectors' },
            { id: 'portfolio', label: 'Verified Portfolio Showcase' },
            { id: 'criteria', label: 'Dealflow Evaluation Rubric' },
            { id: 'legal', label: 'SEBI & Compliance Verification' },
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

        {/* Tab 1: Thesis */}
        {activeTab === 'thesis' && (
          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              <div className="rounded-2xl border border-[#E5E1D8] bg-white p-6 shadow-sm">
                <h3 className="font-serif text-base font-bold text-[#0F1B2D] mb-3 flex items-center gap-2">
                  <TrendingUp size={16} className="text-[#B8955A]" />
                  Syndicate Mandate & Thesis
                </h3>
                <p className="text-xs leading-relaxed text-[#4A5568] whitespace-pre-line">
                  {profile.thesis}
                </p>
              </div>

              <div className="rounded-2xl border border-[#E5E1D8] bg-white p-6 shadow-sm">
                <h3 className="font-serif text-base font-bold text-[#0F1B2D] mb-4 flex items-center gap-2">
                  <Layers size={16} className="text-[#B8955A]" />
                  Target Industry Sectors
                </h3>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {profile.sectors.map((sec, i) => (
                    <div key={i} className="flex items-center gap-2 rounded-xl border border-[#E5E1D8] bg-[#FAF8F4] p-3 text-xs font-bold text-[#0F1B2D]">
                      <CheckCircle2 size={15} className="text-[#B8955A]" />
                      <span>{sec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-2xl border border-[#E5E1D8] bg-white p-5 shadow-sm space-y-3 text-xs">
                <h4 className="font-serif font-bold text-[#0F1B2D]">Contact & Deal Submissions</h4>
                <p className="text-[#5A6E85]">
                  Founders should submit complete pitch materials through the platform's encrypted Deals pipeline.
                </p>
                <div className="pt-2 space-y-2">
                  <a
                    href={profile.social.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between rounded-lg border border-[#E5E1D8] p-2 hover:border-[#0F1B2D] transition"
                  >
                    <span className="flex items-center gap-2 text-[#0F1B2D]">
                      <Linkedin size={15} className="text-[#0077b5]" /> LinkedIn
                    </span>
                    <ExternalLink size={12} className="text-[#7B8CA3]" />
                  </a>
                  <a
                    href={profile.social.website}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between rounded-lg border border-[#E5E1D8] p-2 hover:border-[#0F1B2D] transition"
                  >
                    <span className="flex items-center gap-2 text-[#0F1B2D]">
                      <Globe size={15} className="text-[#B8955A]" /> Syndicate Site
                    </span>
                    <ExternalLink size={12} className="text-[#7B8CA3]" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Portfolio */}
        {activeTab === 'portfolio' && (
          <div className="mt-6 space-y-4">
            {profile.portfolio.map((item, idx) => (
              <div key={idx} className="rounded-2xl border border-[#E5E1D8] bg-white p-6 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-serif text-base font-bold text-[#0F1B2D]">{item.name}</h4>
                      <span className="rounded bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-800 border border-emerald-200">
                        {item.status}
                      </span>
                    </div>
                    <p className="text-xs text-[#5A6E85]">{item.sector} • {item.stage}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-serif font-bold text-sm text-[#0F1B2D]">{item.checkSize}</p>
                    <p className="text-[10px] text-[#7B8CA3]">Invested: {item.year}</p>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-[#F2EFE9] pt-3 text-xs">
                  <span className="text-[#5A6E85]">
                    <strong>Co-investors: </strong>{item.coInvestors}
                  </span>
                  <span className="rounded bg-[#FAF8F4] px-2.5 py-1 text-[11px] font-semibold text-[#0F1B2D] border border-[#E5E1D8]">
                    {item.metrics}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Evaluation Rubric */}
        {activeTab === 'criteria' && (
          <div className="mt-6 rounded-2xl border border-[#E5E1D8] bg-white p-6 shadow-sm">
            <h3 className="font-serif text-base font-bold text-[#0F1B2D] mb-4 flex items-center gap-2">
              <Award size={16} className="text-[#B8955A]" />
              Due Diligence Scoring Rubric
            </h3>
            <div className="space-y-3">
              {profile.evaluationRubric.map((r, i) => (
                <div key={i} className="rounded-xl border border-[#E5E1D8] bg-[#FAF8F4] p-4 text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-[#0F1B2D] text-sm">{r.criterion}</span>
                    <span className="rounded bg-[#B8955A]/20 px-2 py-0.5 text-[10px] font-bold text-[#8C6D37]">
                      Weight: {r.weight}
                    </span>
                  </div>
                  <p className="text-[#5A6E85]">{r.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Legal & Compliance */}
        {activeTab === 'legal' && (
          <div className="mt-6 rounded-2xl border border-[#E5E1D8] bg-white p-6 shadow-sm">
            <h3 className="font-serif text-base font-bold text-[#0F1B2D] mb-4 flex items-center gap-2">
              <ShieldCheck size={16} className="text-[#B8955A]" />
              SEBI & Regulatory Compliance Filings
            </h3>
            <div className="divide-y divide-[#F2EFE9]">
              {profile.legalDetails.map((item, i) => (
                <div key={i} className="py-3.5 first:pt-0 last:pb-0 flex items-start justify-between text-xs">
                  <span className="font-bold text-[#0F1B2D]">{item.label}</span>
                  <span className="text-[#5A6E85] font-medium">{item.value}</span>
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
                Edit Investor Profile & Thesis
              </h3>
              <button onClick={() => setIsEditModalOpen(false)} className="text-[#7B8CA3] hover:text-[#0F1B2D]">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7B8CA3] mb-1">
                  Investor Name
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
                  Syndicate Firm / Fund Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.firm}
                  onChange={(e) => setFormData({ ...formData, firm: e.target.value })}
                  className="w-full rounded-lg border border-[#E5E1D8] p-2 text-xs text-[#0F1B2D] focus:border-[#0F1B2D] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7B8CA3] mb-1">
                    Check Size Range
                  </label>
                  <input
                    type="text"
                    value={formData.ticketSizeRange}
                    onChange={(e) => setFormData({ ...formData, ticketSizeRange: e.target.value })}
                    className="w-full rounded-lg border border-[#E5E1D8] p-2 text-xs text-[#0F1B2D] focus:border-[#0F1B2D] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7B8CA3] mb-1">
                    Stage Focus
                  </label>
                  <input
                    type="text"
                    value={formData.stageFocus}
                    onChange={(e) => setFormData({ ...formData, stageFocus: e.target.value })}
                    className="w-full rounded-lg border border-[#E5E1D8] p-2 text-xs text-[#0F1B2D] focus:border-[#0F1B2D] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7B8CA3] mb-1">
                  Investment Thesis Summary
                </label>
                <textarea
                  rows={4}
                  value={formData.thesis}
                  onChange={(e) => setFormData({ ...formData, thesis: e.target.value })}
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
    </InvestorShell>
  );
}
