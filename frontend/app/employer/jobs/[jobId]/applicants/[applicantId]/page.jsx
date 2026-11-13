'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  EmployerShell,
  EmployerBtn,
  EmployerCard,
  StageChip,
  EmployerSafetyStrip as SafetyStrip,
} from '@/components';
import {
  applications,
  jobs,
} from '@/app/employer/employer-data';
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  FileText,
  Mail,
  MessageSquare,
  MoreHorizontal,
  Send,
  Share2,
  Sparkles,
  Star,
  UserCheck,
  UserX,
  X,
} from 'lucide-react';

export default function CandidateProfilePage() {
  const params = useParams();
  const jobId = params?.jobId || 'job-1';
  const applicantId = params?.applicantId || 'app-1';

  const job = jobs.find((j) => j.id === jobId) || jobs[0];
  const initialApp = applications.find((a) => a.id === applicantId) || applications[0];

  const [candidate, setCandidate] = useState(initialApp);
  const [activeTab, setActiveTab] = useState('Overview');
  const [toastMessage, setToastMessage] = useState(null);

  // Notes state
  const [isPrivateNote, setIsPrivateNote] = useState(true);
  const [noteText, setNoteText] = useState('');
  const [notesList, setNotesList] = useState([
    {
      id: 1,
      author: 'Priya Mehta',
      role: 'Recruiter',
      time: 'Yesterday at 3:15 PM',
      isPrivate: true,
      text: 'Strong design portfolio, specifically in design systems and multi-platform consistency. Recommended for technical panel.',
    },
  ]);

  // Messages state
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      from: 'candidate',
      text: 'Hi Priya, thanks for reaching out! Excited to interview with Northstar.',
      time: 'Oct 29, 2:30 PM',
    },
    {
      id: 2,
      from: 'recruiter',
      text: 'Great to connect, Aanya! We are scheduling the portfolio deep-dive this Friday.',
      time: 'Oct 29, 4:10 PM',
    },
  ]);
  const [newMessage, setNewMessage] = useState('');

  // Quick scorecard state
  const [scoreComm, setScoreComm] = useState('4');
  const [scoreTech, setScoreTech] = useState('4');
  const [scoreComments, setScoreComments] = useState('');

  // Reject modal state
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('Role mismatch');
  const [rejectNote, setRejectNote] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleStageChange = (newStage) => {
    setCandidate((prev) => ({ ...prev, stage: newStage }));
    showToast(`Candidate moved to ${newStage}`);
  };

  const handleSaveNote = (e) => {
    e.preventDefault();
    if (!noteText.trim()) return;
    const newEntry = {
      id: Date.now(),
      author: 'Priya Mehta',
      role: 'Recruiter',
      time: 'Just now',
      isPrivate: isPrivateNote,
      text: noteText.trim(),
    };
    setNotesList([newEntry, ...notesList]);
    setNoteText('');
    showToast('Note recorded successfully');
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    const msg = {
      id: Date.now(),
      from: 'recruiter',
      text: newMessage.trim(),
      time: 'Just now',
    };
    setChatMessages([...chatMessages, msg]);
    setNewMessage('');
    showToast('Message sent to candidate');
  };

  const handleSubmitScorecard = (e) => {
    e.preventDefault();
    showToast('Scorecard submitted. Thank you for your feedback!');
    setScoreComments('');
  };

  const handleRejectCandidate = () => {
    setShowRejectModal(false);
    handleStageChange('Rejected');
    showToast('Candidate kindly notified and archived.');
  };

  const tabs = [
    'Overview',
    'Resume',
    'Interview practice',
    'Interviews and feedback',
    'Notes',
    'Messages',
    'Activity',
  ];

  return (
    <EmployerShell active="/employer/hiring">
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 rounded-xl bg-[#0F1B2D] px-4 py-3 text-sm text-white shadow-xl flex items-center gap-2 border border-[#B8955A]/30"
        >
          <CheckCircle2 size={16} className="text-[#D4AF37]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Reject Modal */}
      {showRejectModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="reject-dialog-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        >
          <div className="w-full max-w-md rounded-2xl border border-[#E5E1D8] bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E1D8]">
              <h3 id="reject-dialog-title" className="text-base font-semibold text-[#0F1B2D]">
                Reject Candidate Kindly
              </h3>
              <button
                type="button"
                onClick={() => setShowRejectModal(false)}
                className="text-[#4A5568] hover:text-[#0F1B2D]"
                aria-label="Close dialog"
              >
                <X size={18} />
              </button>
            </div>
            <div className="mt-4 space-y-4">
              <p className="text-xs text-[#4A5568]">
                We believe in empathetic hiring. An automated, constructive decline note will be sent according to your Northstar Trust policy.
              </p>
              <div>
                <label htmlFor="reject-reason" className="block text-xs font-medium text-[#0F1B2D] mb-1">
                  Primary reason
                </label>
                <select
                  id="reject-reason"
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  className="w-full rounded-lg border border-[#E5E1D8] bg-white px-3 py-2 text-xs text-[#0F1B2D] focus:border-[#B8955A] focus:outline-none"
                >
                  <option value="Role mismatch">Role / Experience mismatch</option>
                  <option value="Position filled">Position filled by earlier applicant</option>
                  <option value="Skill requirements">Specific requirement not met</option>
                  <option value="Budget limitations">Compensation / budget divergence</option>
                </select>
              </div>
              <div>
                <label htmlFor="reject-notes" className="block text-xs font-medium text-[#0F1B2D] mb-1">
                  Internal feedback notes (optional)
                </label>
                <textarea
                  id="reject-notes"
                  rows={3}
                  value={rejectNote}
                  onChange={(e) => setRejectNote(e.target.value)}
                  placeholder="Notes for the hiring team..."
                  className="w-full rounded-lg border border-[#E5E1D8] p-2.5 text-xs text-[#0F1B2D] focus:border-[#B8955A] focus:outline-none"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <EmployerBtn variant="secondary" size="sm" onClick={() => setShowRejectModal(false)}>
                Cancel
              </EmployerBtn>
              <EmployerBtn
                variant="primary"
                size="sm"
                onClick={handleRejectCandidate}
                className="bg-[#B42318] hover:bg-[#911d13] text-white"
              >
                Confirm Decline
              </EmployerBtn>
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-[1280px] space-y-6">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#4A5568]">
          <Link
            href={`/employer/jobs/${jobId}`}
            className="inline-flex items-center gap-1 font-medium text-[#806236] hover:underline"
          >
            <ArrowLeft size={14} /> Back to {job.title}
          </Link>
          <span>/</span>
          <span className="text-[#0F1B2D] font-medium">{candidate.blind ? `Candidate #${candidate.id}` : candidate.name}</span>
        </div>

        {/* Profile Header Card */}
        <div className="rounded-2xl border border-[#E5E1D8] bg-white p-5 sm:p-6 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#F3EBDD] font-serif text-xl font-bold text-[#806236] border border-[#B8955A]/30">
                {candidate.name.charAt(0)}
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="font-serif text-xl sm:text-2xl font-bold text-[#0F1B2D]">
                    {candidate.blind ? `Candidate #${candidate.id}` : candidate.name}
                  </h1>
                  <StageChip stage={candidate.stage} />
                  {candidate.rating && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#FAF8F4] px-2.5 py-0.5 text-xs font-semibold text-[#806236] border border-[#E5E1D8]">
                      <Star size={12} className="fill-[#D4AF37] text-[#D4AF37]" /> {candidate.rating} / 5
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-[#4A5568]">
                  {candidate.headline || `${candidate.role || job.title} candidate`} · Applied {candidate.appliedAt || '3 days ago'}
                </p>
                <p className="text-xs text-[#4A5568]">
                  Targeting: <span className="font-medium text-[#0F1B2D]">{job.title}</span> ({job.location})
                </p>
              </div>
            </div>

            {/* Action Buttons Toolbar - flex-wrap prevents 479px blowout */}
            <div className="flex flex-wrap items-center gap-2 pt-2 lg:pt-0">
              <EmployerBtn
                variant="primary"
                size="sm"
                onClick={() => handleStageChange('Shortlisted')}
              >
                <UserCheck size={14} className="mr-1.5" /> Shortlist
              </EmployerBtn>
              <Link href={`/employer/interviews?candidate=${encodeURIComponent(candidate.name)}`}>
                <EmployerBtn variant="secondary" size="sm">
                  <Calendar size={14} className="mr-1.5" /> Schedule interview
                </EmployerBtn>
              </Link>
              <EmployerBtn
                variant="secondary"
                size="sm"
                onClick={() => setActiveTab('Messages')}
              >
                <MessageSquare size={14} className="mr-1.5" /> Message
              </EmployerBtn>
              <EmployerBtn
                variant="secondary"
                size="sm"
                onClick={() => setShowRejectModal(true)}
                className="text-[#B42318] hover:bg-red-50 hover:border-red-200"
              >
                <UserX size={14} className="mr-1.5" /> Decline
              </EmployerBtn>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mt-6 flex gap-1.5 overflow-x-auto border-t border-[#E5E1D8] pt-4 pb-1">
            {tabs.map((tab) => {
              const active = activeTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`whitespace-nowrap rounded-lg px-3.5 py-1.5 text-xs font-medium transition ${
                    active
                      ? 'bg-[#0F1B2D] text-white shadow-sm'
                      : 'border border-[#E5E1D8] text-[#4A5568] hover:bg-[#FAF8F4] hover:text-[#0F1B2D]'
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid gap-6 lg:grid-cols-12 min-w-0">
          {/* Main Tab Content */}
          <div className="lg:col-span-8 space-y-6 min-w-0">
            {activeTab === 'Overview' && (
              <div className="space-y-6">
                <EmployerCard title="Professional Summary">
                  <div className="space-y-4">
                    <p className="text-xs sm:text-sm text-[#4A5568] leading-relaxed">
                      Senior designer with 5+ years of experience leading multi-disciplinary product design initiatives, building design systems from 0 to 1, and facilitating user research studies across B2B SaaS workflows.
                    </p>
                    <div>
                      <h4 className="text-xs font-semibold text-[#0F1B2D] uppercase tracking-wider mb-2">
                        Relevant Core Skills
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {['React', 'Figma', 'User Research', 'Design Systems', 'Prototyping', 'Accessibility (WCAG 2.1)'].map((s) => (
                          <span
                            key={s}
                            className="inline-flex items-center rounded-md border border-[#F3EBDD] bg-[#F3EBDD] px-2.5 py-1 text-xs font-medium text-[#806236]"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </EmployerCard>

                <EmployerCard title="Match Explanation & AI Analysis">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center rounded-full bg-[#F3EBDD] px-2.5 py-0.5 text-xs font-semibold text-[#806236] border border-[#B8955A]/30">
                        <Sparkles size={12} className="mr-1 text-[#806236]" /> 86% Match Score
                      </span>
                      <span className="text-xs text-[#4A5568]">Based on required competencies</span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#4A5568] leading-relaxed">
                      Matched 5 of 6 essential criteria: Advanced Figma systems, cross-functional collaboration, design sprint leadership, modern web frontend familiarity, and user-centric discovery. Strong alignment with Northstar core values.
                    </p>
                  </div>
                </EmployerCard>

                <EmployerCard title="Candidate Screening Responses">
                  <div className="space-y-4">
                    <div className="rounded-xl border border-[#E5E1D8] bg-[#FAF8F4] p-4">
                      <p className="text-xs font-semibold text-[#0F1B2D]">
                        Why are you excited about Northstar Labs?
                      </p>
                      <p className="mt-1 text-xs text-[#4A5568] leading-relaxed">
                        "I deeply admire Northstar's dedication to craftsmanship and clean user experiences. I want to build tools that empower early-stage founders and creators."
                      </p>
                    </div>
                    <div className="rounded-xl border border-[#E5E1D8] bg-[#FAF8F4] p-4">
                      <p className="text-xs font-semibold text-[#0F1B2D]">
                        How many years of design systems experience do you have?
                      </p>
                      <p className="mt-1 text-xs text-[#4A5568]">
                        "5 years creating scalable Figma libraries and token architectures linked with React codebases."
                      </p>
                    </div>
                  </div>
                </EmployerCard>
              </div>
            )}

            {activeTab === 'Resume' && (
              <EmployerCard title="Immutable Resume Snapshot">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E5E1D8] pb-3">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center rounded-full bg-[#F3EBDD] px-2.5 py-1 text-xs font-medium text-[#806236]">
                        <Sparkles size={12} className="mr-1 text-[#806236]" /> Platform Verified Resume
                      </span>
                      <span className="text-xs text-[#4A5568]">Submitted snapshot cannot be modified</span>
                    </div>
                    <EmployerBtn
                      variant="secondary"
                      size="sm"
                      onClick={() => showToast('Resume PDF downloaded')}
                    >
                      <Download size={14} className="mr-1.5" /> Download PDF
                    </EmployerBtn>
                  </div>
                  <div className="rounded-xl border border-[#E5E1D8] bg-[#FAF8F4] p-6 text-xs text-[#0F1B2D] space-y-4 font-mono leading-relaxed overflow-x-auto">
                    <div className="border-b border-[#E5E1D8] pb-3">
                      <h3 className="font-sans text-base font-bold text-[#0F1B2D]">{candidate.name}</h3>
                      <p className="font-sans text-xs text-[#4A5568]">Product Design Lead · Bengaluru, India · aanya@example.com</p>
                    </div>
                    <div>
                      <h4 className="font-sans text-xs font-bold uppercase text-[#806236]">Experience</h4>
                      <p className="font-sans font-semibold mt-1">Lead Product Designer — PixelForge (2022 – Present)</p>
                      <p className="font-sans text-[#4A5568]">Led the core platform team of 6 designers across web and mobile. Increased activation rate by 34%.</p>
                      <p className="font-sans font-semibold mt-3">Senior UX Designer — CloudScale (2019 – 2022)</p>
                      <p className="font-sans text-[#4A5568]">Maintained the design system and partnered with engineering on React component implementations.</p>
                    </div>
                    <div>
                      <h4 className="font-sans text-xs font-bold uppercase text-[#806236]">Education</h4>
                      <p className="font-sans">B.Des in Interaction Design — National Institute of Design (2015 – 2019)</p>
                    </div>
                  </div>
                </div>
              </EmployerCard>
            )}

            {activeTab === 'Interview practice' && (
              <EmployerCard title="AI Practice Results (Candidate Consented)">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center rounded-full bg-[#F3EBDD] px-2.5 py-0.5 text-xs font-medium text-[#806236]">
                      <Sparkles size={12} className="mr-1 text-[#806236]" /> Practice Snapshot
                    </span>
                    <span className="text-xs text-[#4A5568]">Shared voluntarily by the candidate</span>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl border border-[#E5E1D8] bg-white p-4">
                      <span className="text-xs font-semibold text-[#4A5568]">Job-Readiness Score</span>
                      <div className="mt-1 flex items-baseline gap-1">
                        <span className="font-serif text-3xl font-bold text-[#0F1B2D]">78</span>
                        <span className="text-xs text-[#4A5568]">/ 100</span>
                      </div>
                      <p className="mt-2 text-xs text-[#4A5568]">Strong clarity and structured problem-solving demonstration.</p>
                    </div>
                    <div className="rounded-xl border border-[#E5E1D8] bg-white p-4">
                      <span className="text-xs font-semibold text-[#4A5568]">Assessed Dimensions</span>
                      <div className="mt-2 space-y-1.5 text-xs text-[#0F1B2D]">
                        <div className="flex justify-between">
                          <span>Communication & Clarity:</span>
                          <span className="font-medium text-[#806236]">84%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Problem Breakdown:</span>
                          <span className="font-medium text-[#806236]">80%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Domain Competency:</span>
                          <span className="font-medium text-[#806236]">76%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-[#4A5568] border-t border-[#E5E1D8] pt-3">
                    <Link href="/jobseeker/practice/rubric" className="font-medium text-[#806236] underline">
                      View Platform Rubric
                    </Link>{' '}
                    · Practice results are developmental benchmarks. Absence of practice results is never penalized.
                  </p>
                </div>
              </EmployerCard>
            )}

            {activeTab === 'Interviews and feedback' && (
              <EmployerCard title="Interview Rounds & Scorecards">
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs text-[#4A5568]">
                    <span>Standardized Northstar Scorecards</span>
                    <span>2 rounds configured</span>
                  </div>
                  <div className="space-y-3">
                    <div className="rounded-xl border border-[#E5E1D8] bg-[#FAF8F4] p-4">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <h4 className="text-xs font-semibold text-[#0F1B2D]">Round 1: Screening & Culture</h4>
                          <p className="text-xs text-[#4A5568]">Interviewer: Priya Mehta · Oct 28</p>
                        </div>
                        <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700 border border-emerald-200">
                          Recommended (Yes)
                        </span>
                      </div>
                      <p className="mt-2 text-xs text-[#4A5568]">
                        "Articulate communicator with deep empathy for user friction points. High motivation."
                      </p>
                    </div>

                    <div className="rounded-xl border border-[#E5E1D8] bg-white p-4">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <h4 className="text-xs font-semibold text-[#0F1B2D]">Round 2: Technical & Portfolio Review</h4>
                          <p className="text-xs text-[#4A5568]">Interviewer: Rahul Verma · Scheduled</p>
                        </div>
                        <span className="inline-flex items-center rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-700 border border-amber-200">
                          Pending Submission
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </EmployerCard>
            )}

            {activeTab === 'Notes' && (
              <EmployerCard title="Private Team Notes">
                <div className="space-y-4">
                  <form onSubmit={handleSaveNote} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label htmlFor="team-note-input" className="text-xs font-medium text-[#0F1B2D]">
                        Add internal candidate evaluation note
                      </label>
                      <label className="flex items-center gap-2 text-xs text-[#4A5568] cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isPrivateNote}
                          onChange={(e) => setIsPrivateNote(e.target.checked)}
                          className="rounded border-[#E5E1D8] text-[#806236] focus:ring-[#B8955A]"
                        />
                        <span>Private to hiring panel</span>
                      </label>
                    </div>
                    <textarea
                      id="team-note-input"
                      rows={3}
                      value={noteText}
                      onChange={(e) => setNoteText(e.target.value)}
                      placeholder="Share candidate observations with your hiring panel..."
                      className="w-full rounded-xl border border-[#E5E1D8] p-3 text-xs sm:text-sm text-[#0F1B2D] focus:border-[#B8955A] focus:outline-none"
                    />
                    <div className="flex justify-end gap-2">
                      <EmployerBtn type="submit" variant="primary" size="sm">
                        Save Note
                      </EmployerBtn>
                    </div>
                  </form>

                  <div className="divide-y divide-[#E5E1D8] border-t border-[#E5E1D8] pt-3">
                    {notesList.map((n) => (
                      <div key={n.id} className="py-3 first:pt-0 last:pb-0 space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-[#0F1B2D]">
                            {n.author} <span className="font-normal text-[#4A5568]">({n.role})</span>
                          </span>
                          <span className="text-[#4A5568]">{n.time}</span>
                        </div>
                        <p className="text-xs text-[#4A5568] leading-relaxed">{n.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </EmployerCard>
            )}

            {activeTab === 'Messages' && (
              <EmployerCard title="Direct Candidate Messaging">
                <div className="space-y-4">
                  <p className="text-xs text-[#4A5568]">
                    Platform-secured conversation thread. All messaging history is retained for auditing compliance.
                  </p>
                  <div className="rounded-xl border border-[#E5E1D8] bg-[#FAF8F4] p-4 min-h-[260px] max-h-[360px] overflow-y-auto space-y-3">
                    {chatMessages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex flex-col ${msg.from === 'recruiter' ? 'items-end' : 'items-start'}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-2xl p-3 text-xs leading-relaxed ${
                            msg.from === 'recruiter'
                              ? 'bg-[#0F1B2D] text-white'
                              : 'bg-white border border-[#E5E1D8] text-[#0F1B2D]'
                          }`}
                        >
                          {msg.text}
                        </div>
                        <span className="text-[10px] text-[#4A5568] mt-1 px-1">{msg.time}</span>
                      </div>
                    ))}
                  </div>
                  <form onSubmit={handleSendMessage} className="flex gap-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Write a message to candidate..."
                      className="flex-1 rounded-xl border border-[#E5E1D8] px-3.5 py-2 text-xs sm:text-sm text-[#0F1B2D] focus:border-[#B8955A] focus:outline-none"
                    />
                    <EmployerBtn type="submit" variant="primary" size="sm">
                      <Send size={14} className="mr-1" /> Send
                    </EmployerBtn>
                  </form>
                </div>
              </EmployerCard>
            )}

            {activeTab === 'Activity' && (
              <EmployerCard title="Audit Trail & Hiring Log">
                <div className="space-y-3">
                  {[
                    { icon: UserCheck, title: 'Moved to Shortlist', user: 'Priya Mehta', time: 'Oct 30, 11:20 AM' },
                    { icon: Mail, title: 'Interview invite email dispatched', user: 'System', time: 'Oct 29, 4:10 PM' },
                    { icon: Download, title: 'Resume PDF downloaded', user: 'Rahul Verma', time: 'Oct 28, 5:45 PM' },
                    { icon: Clock, title: 'Application received via Direct Apply', user: 'System', time: 'Oct 27, 2:10 PM' },
                  ].map((act, idx) => {
                    const Icon = act.icon;
                    return (
                      <div key={idx} className="flex items-start gap-3 rounded-xl border border-[#E5E1D8] p-3 text-xs">
                        <div className="rounded-lg bg-[#FAF8F4] p-2 text-[#806236] border border-[#E5E1D8]">
                          <Icon size={14} />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-[#0F1B2D]">{act.title}</p>
                          <p className="text-[#4A5568]">By {act.user} · {act.time}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </EmployerCard>
            )}
          </div>

          {/* Right Sidebar Details & Scorecard */}
          <div className="lg:col-span-4 space-y-6 min-w-0">
            {/* Quick Decision Box */}
            <EmployerCard title="Decision Box">
              <div className="space-y-4">
                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-[#4A5568]">Move Pipeline Stage:</span>
                    <select
                      value={candidate.stage}
                      onChange={(e) => handleStageChange(e.target.value)}
                      className="rounded-lg border border-[#E5E1D8] bg-[#FAF8F4] px-2.5 py-1 text-xs font-semibold text-[#0F1B2D] focus:border-[#B8955A] focus:outline-none"
                    >
                      <option value="Applied">Applied</option>
                      <option value="Screening">Screening</option>
                      <option value="Shortlisted">Shortlisted</option>
                      <option value="Interview">Interview</option>
                      <option value="Offer">Offer</option>
                      <option value="Hired">Hired</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>
                  <div className="flex justify-between py-1 border-t border-[#E5E1D8]">
                    <span className="text-[#4A5568]">Panel Consensus:</span>
                    <span className="font-semibold text-emerald-700">1 of 2 Recommended</span>
                  </div>
                  <div className="flex justify-between py-1 border-t border-[#E5E1D8]">
                    <span className="text-[#4A5568]">Next Action:</span>
                    <span className="font-semibold text-[#806236]">Portfolio Review</span>
                  </div>
                </div>

                <div className="border-t border-[#E5E1D8] pt-4">
                  <h4 className="text-xs font-semibold text-[#0F1B2D] mb-3">Quick Evaluation Score</h4>
                  <form onSubmit={handleSubmitScorecard} className="space-y-3">
                    <div>
                      <label htmlFor="score-comm" className="block text-xs text-[#4A5568] mb-1">
                        Communication (1-5)
                      </label>
                      <select
                        id="score-comm"
                        value={scoreComm}
                        onChange={(e) => setScoreComm(e.target.value)}
                        className="w-full rounded-lg border border-[#E5E1D8] bg-white px-2.5 py-1.5 text-xs text-[#0F1B2D] focus:border-[#B8955A] focus:outline-none"
                      >
                        <option value="5">5 - Exceptional</option>
                        <option value="4">4 - Strong</option>
                        <option value="3">3 - Adequate</option>
                        <option value="2">2 - Needs improvement</option>
                        <option value="1">1 - Unsatisfactory</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="score-tech" className="block text-xs text-[#4A5568] mb-1">
                        Technical Execution (1-5)
                      </label>
                      <select
                        id="score-tech"
                        value={scoreTech}
                        onChange={(e) => setScoreTech(e.target.value)}
                        className="w-full rounded-lg border border-[#E5E1D8] bg-white px-2.5 py-1.5 text-xs text-[#0F1B2D] focus:border-[#B8955A] focus:outline-none"
                      >
                        <option value="5">5 - Exceptional</option>
                        <option value="4">4 - Strong</option>
                        <option value="3">3 - Adequate</option>
                        <option value="2">2 - Needs improvement</option>
                        <option value="1">1 - Unsatisfactory</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="score-comments" className="block text-xs text-[#4A5568] mb-1">
                        Summary Comments
                      </label>
                      <textarea
                        id="score-comments"
                        rows={2}
                        value={scoreComments}
                        onChange={(e) => setScoreComments(e.target.value)}
                        placeholder="Key takeaway from interview..."
                        className="w-full rounded-lg border border-[#E5E1D8] p-2 text-xs text-[#0F1B2D] focus:border-[#B8955A] focus:outline-none"
                      />
                    </div>

                    <EmployerBtn type="submit" variant="primary" size="sm" className="w-full">
                      Submit Feedback
                    </EmployerBtn>
                  </form>
                </div>
              </div>
            </EmployerCard>

            {/* Compare Card */}
            <EmployerCard title="Candidate Comparison">
              <p className="text-xs text-[#4A5568] mb-3">
                Review this profile side-by-side with other candidates in the pipeline.
              </p>
              <Link href={`/employer/jobs/${jobId}/compare`}>
                <EmployerBtn variant="secondary" size="sm" className="w-full">
                  <Share2 size={14} className="mr-1.5" /> Compare in Matrix
                </EmployerBtn>
              </Link>
            </EmployerCard>

            {/* Verification & Candidate Details */}
            <EmployerCard title="Candidate Logistics">
              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#4A5568]">Notice Period:</span>
                  <span className="font-medium text-[#0F1B2D]">2 weeks (Immediate)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#4A5568]">Expected Pay:</span>
                  <span className="font-medium text-[#0F1B2D]">₹20L – ₹24L</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#4A5568]">Work Authorization:</span>
                  <span className="font-medium text-[#0F1B2D]">Authorized (India)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#4A5568]">Preferred Work Mode:</span>
                  <span className="font-medium text-[#0F1B2D]">Hybrid / Bangalore</span>
                </div>
              </div>
            </EmployerCard>

            <SafetyStrip />
          </div>
        </div>
      </div>
    </EmployerShell>
  );
}
