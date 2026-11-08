'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  ChevronLeft,
  CheckCircle2,
  Calendar,
  Clock,
  Building,
  FileText,
  AlertTriangle,
  ArrowRight,
  MessageCircle,
  Check,
  X,
  Info,
} from 'lucide-react';
import { JobSeekerShell } from '@/components';
import {
  JobBtn,
  SafetyStrip,
  defaultUser,
} from '@/components/jobseeker-ui';
import { StageChip } from '../page';
import { applications, interviews, resumes } from '../../jobseeker-data';

export default function ApplicationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const rawId = params?.applicationId;
  const app = applications.find((a) => a.id === rawId) || applications[0];

  const [tab, setTab] = useState('Overview');
  const [withdrawn, setWithdrawn] = useState(app.stage === 'Withdrawn');
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [personalNotes, setPersonalNotes] = useState('Focus on showing past design system token architecture in round 2.');

  const relatedInterviews = interviews.filter((i) => i.company === app.company);

  const handleWithdraw = () => {
    setWithdrawn(true);
    setShowWithdrawModal(false);
  };

  return (
    <JobSeekerShell active="Applications">
      <div className="space-y-6 max-w-5xl">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[#6B7280]">
          <Link
            href="/jobseeker/applications"
            className="flex items-center gap-1 hover:text-[#0F1B2D]"
          >
            <ChevronLeft size={14} /> Back to Applications
          </Link>
          <span>/</span>
          <span className="text-[#0F1B2D] font-medium truncate">{app.title}</span>
        </nav>

        {/* Header Card */}
        <header className="rounded-2xl border border-[#E5E1D8] bg-white p-6 shadow-sm space-y-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-start gap-4 min-w-0 flex-1">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-[#F3EBDD] font-bold text-xl text-[#806236]">
                {app.logo || app.company?.[0] || 'A'}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h1 className="text-xl md:text-2xl font-serif font-bold text-[#0F1B2D]">
                    {app.title}
                  </h1>
                  <StageChip stage={withdrawn ? 'Withdrawn' : app.stage} />
                </div>
                <div className="flex flex-wrap items-center gap-x-3 text-xs text-[#4A5568]">
                  <span className="font-semibold text-[#0F1B2D]">{app.company}</span>
                  <span>·</span>
                  <span>{app.loc}</span>
                  <span>·</span>
                  <span>{app.type}</span>
                  <span>·</span>
                  <span>{app.salary}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Link href="/jobseeker/messages">
                <JobBtn secondary small className="flex items-center gap-1.5">
                  <MessageCircle size={14} /> Message Recruiter
                </JobBtn>
              </Link>
              {!withdrawn && (
                <JobBtn
                  destructive
                  small
                  onClick={() => setShowWithdrawModal(true)}
                >
                  Withdraw
                </JobBtn>
              )}
            </div>
          </div>

          {/* Timeline strip */}
          <div className="pt-4 border-t border-[#F0EBE0] space-y-2">
            <span className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider block">
              Application Pipeline Progress
            </span>
            <div className="flex items-center justify-between gap-2 overflow-x-auto min-w-0 py-1">
              {['Applied', 'Shortlisted', 'Interview', 'Offer', 'Hired'].map((stepName, idx) => {
                const isCurrent = app.stage === stepName;
                const isPast = ['Applied', 'Shortlisted', 'Interview', 'Offer', 'Hired'].indexOf(app.stage) >= idx;
                return (
                  <div key={stepName} className="flex-1 flex flex-col items-center min-w-[70px]">
                    <div className="flex items-center w-full">
                      <span
                        className={`grid h-7 w-7 mx-auto place-items-center rounded-full text-xs font-bold ${
                          isPast
                            ? 'bg-[#286749] text-white'
                            : 'bg-[#FAF8F4] border border-[#E5E1D8] text-[#A0A7B4]'
                        }`}
                      >
                        {isPast ? <Check size={13} /> : idx + 1}
                      </span>
                    </div>
                    <span
                      className={`text-[11px] mt-1 font-medium ${
                        isCurrent ? 'text-[#0F1B2D] font-bold' : 'text-[#6B7280]'
                      }`}
                    >
                      {stepName}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 border-t border-[#E5E1D8] pt-3 overflow-x-auto min-w-0">
            {['Overview', 'Shared Materials', 'Interviews', 'Notes'].map((t) => {
              const active = tab === t;
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTab(t)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
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

        {/* Tab 1: Overview */}
        {tab === 'Overview' && (
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-8 space-y-6">
              <section className="rounded-xl border border-[#E5E1D8] bg-white p-6 shadow-sm space-y-4">
                <h2 className="text-base font-serif font-bold text-[#0F1B2D]">Current Status</h2>
                <div className="rounded-xl border border-[#CDE5D7] bg-[#E7F3EC]/30 p-4 text-xs text-[#286749] space-y-1">
                  <span className="font-bold block text-sm">
                    {app.stage === 'Interview'
                      ? 'Round 2: Technical Deep-Dive Scheduled'
                      : `Application Status: ${app.stage}`}
                  </span>
                  <p>
                    {app.nextStep || 'Founder and engineering team are reviewing your submitted materials.'}
                  </p>
                </div>

                <div className="pt-2 text-xs text-[#4A5568] space-y-2">
                  <div className="flex justify-between py-1.5 border-b border-[#F0EBE0]">
                    <span className="text-[#6B7280]">Application ID:</span>
                    <strong className="text-[#0F1B2D]">{app.id}</strong>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-[#F0EBE0]">
                    <span className="text-[#6B7280]">Submission Date:</span>
                    <span>{app.appliedDate || 'Oct 28, 2026'}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-[#F0EBE0]">
                    <span className="text-[#6B7280]">Last Activity:</span>
                    <span>{app.lastUpdate || '2 days ago'}</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-[#6B7280]">Source:</span>
                    <span>Direct Platform Application</span>
                  </div>
                </div>
              </section>

              <SafetyStrip />
            </div>

            <aside className="lg:col-span-4 space-y-5">
              <div className="rounded-xl border border-[#E5E1D8] bg-white p-5 shadow-sm space-y-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#6B7280]">
                  Hiring Contacts
                </span>
                <div className="text-xs space-y-2">
                  <p className="font-medium text-[#0F1B2D]">Devika Sharma</p>
                  <p className="text-[#6B7280]">Head of Talent & People</p>
                  <Link href="/jobseeker/messages" className="inline-block pt-1">
                    <JobBtn secondary small className="w-full">
                      Open Conversation
                    </JobBtn>
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        )}

        {/* Tab 2: Shared Materials */}
        {tab === 'Shared Materials' && (
          <section className="rounded-xl border border-[#E5E1D8] bg-white p-6 shadow-sm space-y-4">
            <h2 className="text-base font-serif font-bold text-[#0F1B2D]">Submitted Documents</h2>
            <div className="rounded-xl border border-[#E5E1D8] bg-[#FAF8F4] p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText size={22} className="text-[#806236]" />
                <div>
                  <h3 className="text-xs font-bold text-[#0F1B2D]">Aanya_Sen_Product_Designer.pdf</h3>
                  <p className="text-xs text-[#6B7280]">Submitted on Oct 28 · ATS Score 85</p>
                </div>
              </div>
              <Link href="/jobseeker/resumes">
                <JobBtn secondary small>
                  View In Resumes
                </JobBtn>
              </Link>
            </div>
          </section>
        )}

        {/* Tab 3: Interviews */}
        {tab === 'Interviews' && (
          <section className="space-y-4">
            <h2 className="text-base font-serif font-bold text-[#0F1B2D]">Scheduled Sessions</h2>
            {relatedInterviews.length === 0 ? (
              <div className="rounded-xl border border-[#E5E1D8] bg-white p-8 text-center text-xs text-[#6B7280]">
                No interviews scheduled yet. You will be notified when slots are offered.
              </div>
            ) : (
              relatedInterviews.map((int) => (
                <div
                  key={int.id}
                  className="rounded-xl border border-[#E5E1D8] bg-white p-5 shadow-sm flex flex-wrap items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <h3 className="text-sm font-semibold text-[#0F1B2D]">{int.title}</h3>
                    <p className="text-xs text-[#6B7280]">
                      {int.date || 'Thursday, Nov 6'} · {int.time || '11:00 AM IST'} · {int.duration || '45 mins'}
                    </p>
                  </div>
                  <Link href="/jobseeker/interviews">
                    <JobBtn primary small>
                      Manage Interview
                    </JobBtn>
                  </Link>
                </div>
              ))
            )}
          </section>
        )}

        {/* Tab 4: Notes */}
        {tab === 'Notes' && (
          <section className="rounded-xl border border-[#E5E1D8] bg-white p-6 shadow-sm space-y-4">
            <h2 className="text-base font-serif font-bold text-[#0F1B2D]">Private Candidate Notes</h2>
            <p className="text-xs text-[#6B7280]">
              Notes are completely private to you. They are never shared with the employer.
            </p>
            <textarea
              rows={4}
              value={personalNotes}
              onChange={(e) => setPersonalNotes(e.target.value)}
              className="w-full p-3 rounded-lg border border-[#E5E1D8] text-xs text-[#0F1B2D] focus:border-[#B8955A] focus:outline-none"
            />
            <div className="flex justify-end">
              <JobBtn primary small onClick={() => alert('Notes saved!')}>
                Save Notes
              </JobBtn>
            </div>
          </section>
        )}

        {/* Withdraw Confirmation Modal */}
        {showWithdrawModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl space-y-4">
              <div className="flex items-center gap-2 text-[#B42318]">
                <AlertTriangle size={20} />
                <h3 className="text-base font-bold">Withdraw Application?</h3>
              </div>
              <p className="text-xs text-[#4A5568] leading-relaxed">
                Are you sure you want to withdraw your application for <strong>{app.title}</strong> at {app.company}? This will cancel any upcoming interviews and archive this thread.
              </p>
              <div className="pt-2 flex items-center justify-end gap-2">
                <JobBtn secondary small onClick={() => setShowWithdrawModal(false)}>
                  Cancel
                </JobBtn>
                <JobBtn destructive small onClick={handleWithdraw}>
                  Confirm Withdrawal
                </JobBtn>
              </div>
            </div>
          </div>
        )}
      </div>
    </JobSeekerShell>
  );
}
