'use client';

import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  ArrowLeft,
  AlertTriangle,
  Scale,
  Users,
  Lock,
  Flag,
  CheckCircle2,
  HelpCircle,
  FileText,
  Building,
} from 'lucide-react';
import CommunityHeader from '../community-header';
import { COMMUNITY_PERSONAS } from '../community-data';

export default function CommunityGuidelinesPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#0F1B2D]">
      <CommunityHeader activePersona={COMMUNITY_PERSONAS[0]} />

      <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#64748B]">
          <Link href="/community" className="hover:text-[#0F1B2D]">Community</Link>
          <span>/</span>
          <span className="font-semibold text-[#0F1B2D]">Community Rules & Safety Guidelines</span>
        </div>

        {/* Hero Header */}
        <div className="rounded-2xl border border-[#B8955A]/40 bg-[#0F1B2D] text-[#FAF8F4] p-6 sm:p-8 shadow-xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="rounded-full bg-[#B8955A]/20 px-3 py-1 text-xs font-semibold text-[#D4AF37] border border-[#B8955A]/40 flex items-center gap-1.5">
              <ShieldCheck size={13} className="text-[#B8955A]" />
              Forma Trust & Safety Framework
            </span>
          </div>

          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Community Guidelines & Trust Architecture
          </h1>
          <p className="text-xs sm:text-sm text-[#CBD5E1] mt-2 leading-relaxed">
            A high-signal sanctuary for Indian founders, mentors, investors, talent, and employers to collaborate without noise, spam, or statutory legal exposure.
          </p>
        </div>

        {/* Guidelines Sections */}
        <div className="space-y-5">
          {/* Rule 1: No Public Fundraising Solicitation */}
          <section className="rounded-xl border border-[#E5E1D8] bg-white p-6 shadow-2xs space-y-3">
            <div className="flex items-center gap-2 text-rose-700 font-bold text-sm">
              <Scale size={18} />
              <h2>1. Strict Prohibition on Public Securities & Investment Solicitation</h2>
            </div>
            <p className="text-xs text-[#475569] leading-relaxed">
              Public offers or solicitations to sell equity, SAFE notes, or debentures in open feeds create statutory exposure under Indian securities regulations and attract predatory scams.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
              <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-3 text-emerald-950">
                <strong className="block font-bold text-emerald-800 mb-1">Allowed (Educational & Traction):</strong>
                <ul className="space-y-1 text-[11px]">
                  <li>• Asking questions on i-SAFE conversion mechanics.</li>
                  <li>• Sharing closed round milestones (facts only, no pitch).</li>
                  <li>• Discussing term sheet governance clauses.</li>
                </ul>
              </div>
              <div className="rounded-lg bg-rose-50 border border-rose-200 p-3 text-rose-950">
                <strong className="block font-bold text-rose-800 mb-1">Strictly Prohibited:</strong>
                <ul className="space-y-1 text-[11px]">
                  <li>• &quot;Invest in my startup / seeking ₹2 Cr check&quot;.</li>
                  <li>• &quot;DM me to see our pitch deck & valuation&quot;.</li>
                  <li>• Publicly sharing confidential deal rooms or cap tables.</li>
                </ul>
              </div>
            </div>
            <div className="rounded-lg bg-[#FAF8F4] p-3 text-xs text-[#64748B] flex items-center justify-between">
              <span>Looking to connect with investors? Use official channels:</span>
              <Link href="/startup/investors" className="font-bold text-[#0F1B2D] hover:text-[#B8955A] flex items-center gap-1">
                <span>Go to Discover & Intros</span>
                <ArrowLeft size={12} className="rotate-180" />
              </Link>
            </div>
          </section>

          {/* Rule 2: Connecting & Messaging Rules */}
          <section className="rounded-xl border border-[#E5E1D8] bg-white p-6 shadow-2xs space-y-3">
            <div className="flex items-center gap-2 text-[#0F1B2D] font-bold text-sm">
              <Users size={18} className="text-[#B8955A]" />
              <h2>2. Safe Peer Networking & Cold Outreach Boundaries</h2>
            </div>
            <p className="text-xs text-[#475569] leading-relaxed">
              To prevent executive inboxes from becoming inundated with spam, peer connections are governed by role-specific guardrails:
            </p>
            <ul className="space-y-2 text-xs text-[#475569]">
              <li className="flex items-start gap-2">
                <CheckCircle2 size={14} className="text-[#B8955A] mt-0.5 shrink-0" />
                <span><strong>No Cold DMs to Investors:</strong> Founders cannot send unprompted private messages to investors through Community. Founders must use verified Intro Requests in Discover.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={14} className="text-[#B8955A] mt-0.5 shrink-0" />
                <span><strong>Connect Requests:</strong> Peer connections require a concise 300-character note explaining the collaboration rationale. Recipients can freely accept or ignore.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={14} className="text-[#B8955A] mt-0.5 shrink-0" />
                <span><strong>Hiring Outreach in Community:</strong> Employers may not cold message candidates inside the Talent Lounge. Official recruiting belongs in Jobs and verified candidate search.</span>
              </li>
            </ul>
          </section>

          {/* Rule 3: Advice & Disclosure */}
          <section className="rounded-xl border border-[#E5E1D8] bg-white p-6 shadow-2xs space-y-3">
            <div className="flex items-center gap-2 text-[#0F1B2D] font-bold text-sm">
              <FileText size={18} className="text-[#B8955A]" />
              <h2>3. Operational Advice & Mandatory Relationship Disclosure</h2>
            </div>
            <p className="text-xs text-[#475569] leading-relaxed">
              Community discussions are peer reflections, not certified legal, tax, or financial advisory.
            </p>
            <ul className="space-y-2 text-xs text-[#475569]">
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#B8955A] mt-1.5 shrink-0" />
                <span><strong>Expert Answer Label:</strong> Reserved exclusively for verified mentors answering within their accredited domain (e.g. Distributed Systems, Corporate Tax).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#B8955A] mt-1.5 shrink-0" />
                <span><strong>Mandatory Disclosures:</strong> Mentors and investors recommending products or services from which they benefit (e.g. their portfolio startup or agency) must declare an explicit affiliation disclosure tag.</span>
              </li>
            </ul>
          </section>

          {/* Rule 4: Action Ladder */}
          <section className="rounded-xl border border-[#E5E1D8] bg-white p-6 shadow-2xs space-y-3">
            <div className="flex items-center gap-2 text-[#0F1B2D] font-bold text-sm">
              <Flag size={18} className="text-rose-600" />
              <h2>4. Trust & Safety Action Ladder</h2>
            </div>
            <p className="text-xs text-[#475569] leading-relaxed">
              When content violates community standards, our moderation engine applies proportionate enforcement:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-center text-xs pt-1">
              <div className="rounded-lg bg-[#FAF8F4] border border-[#E5E1D8] p-3">
                <span className="font-bold block text-[#0F1B2D]">Level 1: Guidance</span>
                <span className="text-[10px] text-[#64748B] mt-1 block">Notice & post edit</span>
              </div>
              <div className="rounded-lg bg-amber-50 border border-amber-200 p-3">
                <span className="font-bold block text-amber-900">Level 2: Warning</span>
                <span className="text-[10px] text-amber-700 mt-1 block">Formal strike logged</span>
              </div>
              <div className="rounded-lg bg-orange-50 border border-orange-200 p-3">
                <span className="font-bold block text-orange-900">Level 3: Mute</span>
                <span className="text-[10px] text-orange-700 mt-1 block">7-day posting freeze</span>
              </div>
              <div className="rounded-lg bg-rose-50 border border-rose-200 p-3">
                <span className="font-bold block text-rose-900">Level 4: Removal</span>
                <span className="text-[10px] text-rose-700 mt-1 block">Space suspension</span>
              </div>
            </div>
          </section>
        </div>

        {/* Back CTA */}
        <div className="pt-4 flex justify-center">
          <Link
            href="/community"
            className="inline-flex items-center gap-2 rounded-xl bg-[#0F1B2D] px-6 py-2.5 text-xs font-bold text-white hover:bg-[#1C2B42] shadow-sm"
          >
            <ArrowLeft size={14} />
            <span>Return to Community Feed</span>
          </Link>
        </div>
      </main>
    </div>
  );
}
