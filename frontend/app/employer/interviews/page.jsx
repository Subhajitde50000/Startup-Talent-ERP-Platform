'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  EmployerShell,
  EmployerBtn,
  EmployerCard,
  StageChip,
  EmployerSafetyStrip as SafetyStrip,
} from '@/components';
import {
  interviews as initialInterviews,
  jobs,
  applications,
} from '@/app/employer/employer-data';
import {
  Calendar as CalendarIcon,
  CheckCircle2,
  Clock,
  ExternalLink,
  MessageSquare,
  Plus,
  RefreshCw,
  User,
  Video,
  X,
  AlertCircle,
} from 'lucide-react';

function InterviewsContent() {
  const searchParams = useSearchParams();
  const prefillCandidate = searchParams?.get('candidate') || '';

  const [activeTab, setActiveTab] = useState('Upcoming');
  const [interviews, setInterviews] = useState(initialInterviews);
  const [toastMessage, setToastMessage] = useState(null);

  // Schedule modal state
  const [showScheduleModal, setShowScheduleModal] = useState(!!prefillCandidate);
  const [schedCandidate, setSchedCandidate] = useState(prefillCandidate || 'Aanya Sen');
  const [schedJob, setSchedJob] = useState(jobs[0]?.title || 'Senior Product Designer');
  const [schedRound, setSchedRound] = useState('Technical Panel');
  const [schedFormat, setSchedFormat] = useState('Video (Platform Room)');
  const [schedDate, setSchedDate] = useState('2026-11-12');
  const [schedTime, setSchedTime] = useState('14:30');

  // Scorecard modal state
  const [scorecardInterview, setScorecardInterview] = useState(null);
  const [scoreComm, setScoreComm] = useState('4');
  const [scoreTech, setScoreTech] = useState('4');
  const [scoreDecision, setScoreDecision] = useState('Advance');
  const [scoreComments, setScoreComments] = useState('');

  // Reschedule modal state
  const [rescheduleItem, setRescheduleItem] = useState(null);
  const [rescheduleDate, setRescheduleDate] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleCreateInterview = (e) => {
    e.preventDefault();
    const newInt = {
      id: `int-${Date.now()}`,
      time: `${schedTime} IST`,
      date: schedDate,
      candidate: schedCandidate,
      job: schedJob,
      round: schedRound,
      format: schedFormat.includes('Video') ? 'Video' : 'Phone',
      duration: '45 min',
      interviewers: 'Priya Mehta · Rahul Verma',
      status: 'Scheduled',
      join: true,
    };
    setInterviews([newInt, ...interviews]);
    setShowScheduleModal(false);
    showToast(`Interview scheduled with ${schedCandidate} for ${schedDate}`);
  };

  const handleScorecardSubmit = (e) => {
    e.preventDefault();
    showToast(`Scorecard submitted for ${scorecardInterview.candidate}. Decision: ${scoreDecision}`);
    setScorecardInterview(null);
    setScoreComments('');
  };

  const handleConfirmReschedule = (e) => {
    e.preventDefault();
    if (!rescheduleItem) return;
    setInterviews((prev) =>
      prev.map((i) =>
        i.id === rescheduleItem.id ? { ...i, date: rescheduleDate || 'Rescheduled' } : i
      )
    );
    showToast(`Interview with ${rescheduleItem.candidate} rescheduled`);
    setRescheduleItem(null);
  };

  const pendingFeedback = [
    {
      id: 'fb-1',
      candidate: 'Rohan Kapoor',
      job: 'UX Researcher',
      round: 'Technical Interview',
      finished: '2 hours ago',
      overdue: false,
    },
    {
      id: 'fb-2',
      candidate: 'Candidate #44',
      job: 'Senior Backend Engineer',
      round: 'System Architecture',
      finished: '26 hours ago',
      overdue: true,
    },
  ];

  return (
    <EmployerShell active="/employer/interviews">
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

      {/* Schedule Interview Modal */}
      {showScheduleModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="schedule-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        >
          <div className="w-full max-w-lg rounded-2xl border border-[#E5E1D8] bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E1D8]">
              <h3 id="schedule-modal-title" className="text-base font-semibold text-[#0F1B2D]">
                Schedule Candidate Interview
              </h3>
              <button
                type="button"
                onClick={() => setShowScheduleModal(false)}
                className="text-[#4A5568] hover:text-[#0F1B2D]"
                aria-label="Close dialog"
              >
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleCreateInterview} className="mt-4 space-y-4">
              <div>
                <label htmlFor="sched-cand" className="block text-xs font-medium text-[#0F1B2D] mb-1">
                  Candidate Name
                </label>
                <input
                  id="sched-cand"
                  type="text"
                  required
                  value={schedCandidate}
                  onChange={(e) => setSchedCandidate(e.target.value)}
                  className="w-full rounded-lg border border-[#E5E1D8] px-3 py-2 text-xs text-[#0F1B2D] focus:border-[#B8955A] focus:outline-none"
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label htmlFor="sched-job" className="block text-xs font-medium text-[#0F1B2D] mb-1">
                    Job Position
                  </label>
                  <select
                    id="sched-job"
                    value={schedJob}
                    onChange={(e) => setSchedJob(e.target.value)}
                    className="w-full rounded-lg border border-[#E5E1D8] bg-white px-3 py-2 text-xs text-[#0F1B2D] focus:border-[#B8955A] focus:outline-none"
                  >
                    {jobs.map((j) => (
                      <option key={j.id} value={j.title}>
                        {j.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="sched-round" className="block text-xs font-medium text-[#0F1B2D] mb-1">
                    Interview Round
                  </label>
                  <select
                    id="sched-round"
                    value={schedRound}
                    onChange={(e) => setSchedRound(e.target.value)}
                    className="w-full rounded-lg border border-[#E5E1D8] bg-white px-3 py-2 text-xs text-[#0F1B2D] focus:border-[#B8955A] focus:outline-none"
                  >
                    <option value="Initial Recruiter Screen">Recruiter Screen (30 min)</option>
                    <option value="Technical Panel">Technical Panel (60 min)</option>
                    <option value="Portfolio Walkthrough">Portfolio Walkthrough (45 min)</option>
                    <option value="Executive / Founder Fit">Executive / Founder Fit (45 min)</option>
                  </select>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label htmlFor="sched-date" className="block text-xs font-medium text-[#0F1B2D] mb-1">
                    Date
                  </label>
                  <input
                    id="sched-date"
                    type="date"
                    required
                    value={schedDate}
                    onChange={(e) => setSchedDate(e.target.value)}
                    className="w-full rounded-lg border border-[#E5E1D8] px-3 py-2 text-xs text-[#0F1B2D] focus:border-[#B8955A] focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="sched-time" className="block text-xs font-medium text-[#0F1B2D] mb-1">
                    Time (IST)
                  </label>
                  <input
                    id="sched-time"
                    type="time"
                    required
                    value={schedTime}
                    onChange={(e) => setSchedTime(e.target.value)}
                    className="w-full rounded-lg border border-[#E5E1D8] px-3 py-2 text-xs text-[#0F1B2D] focus:border-[#B8955A] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="sched-format" className="block text-xs font-medium text-[#0F1B2D] mb-1">
                  Interview Format
                </label>
                <select
                  id="sched-format"
                  value={schedFormat}
                  onChange={(e) => setSchedFormat(e.target.value)}
                  className="w-full rounded-lg border border-[#E5E1D8] bg-white px-3 py-2 text-xs text-[#0F1B2D] focus:border-[#B8955A] focus:outline-none"
                >
                  <option value="Video (Platform Room)">Northstar Secure Video Call</option>
                  <option value="Google Meet">Google Meet Integration</option>
                  <option value="Phone Call">Phone / Audio Only</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <EmployerBtn variant="secondary" size="sm" onClick={() => setShowScheduleModal(false)}>
                  Cancel
                </EmployerBtn>
                <EmployerBtn type="submit" variant="primary" size="sm">
                  Send Calendar Invite
                </EmployerBtn>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reschedule Modal */}
      {rescheduleItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="reschedule-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        >
          <div className="w-full max-w-md rounded-2xl border border-[#E5E1D8] bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E1D8]">
              <h3 id="reschedule-modal-title" className="text-base font-semibold text-[#0F1B2D]">
                Reschedule Interview
              </h3>
              <button
                type="button"
                onClick={() => setRescheduleItem(null)}
                className="text-[#4A5568] hover:text-[#0F1B2D]"
                aria-label="Close dialog"
              >
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleConfirmReschedule} className="mt-4 space-y-4">
              <p className="text-xs text-[#4A5568]">
                Rescheduling interview with <span className="font-semibold text-[#0F1B2D]">{rescheduleItem.candidate}</span> for <span className="font-semibold text-[#0F1B2D]">{rescheduleItem.round}</span>.
              </p>
              <div>
                <label htmlFor="new-date" className="block text-xs font-medium text-[#0F1B2D] mb-1">
                  New Proposed Date & Time
                </label>
                <input
                  id="new-date"
                  type="datetime-local"
                  required
                  value={rescheduleDate}
                  onChange={(e) => setRescheduleDate(e.target.value)}
                  className="w-full rounded-lg border border-[#E5E1D8] px-3 py-2 text-xs text-[#0F1B2D] focus:border-[#B8955A] focus:outline-none"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <EmployerBtn variant="secondary" size="sm" onClick={() => setRescheduleItem(null)}>
                  Cancel
                </EmployerBtn>
                <EmployerBtn type="submit" variant="primary" size="sm">
                  Confirm Reschedule
                </EmployerBtn>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Scorecard Modal */}
      {scorecardInterview && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="scorecard-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        >
          <div className="w-full max-w-lg rounded-2xl border border-[#E5E1D8] bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E1D8]">
              <div>
                <h3 id="scorecard-modal-title" className="text-base font-semibold text-[#0F1B2D]">
                  Submit Interview Scorecard
                </h3>
                <p className="text-xs text-[#4A5568]">
                  {scorecardInterview.candidate} · {scorecardInterview.round}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setScorecardInterview(null)}
                className="text-[#4A5568] hover:text-[#0F1B2D]"
                aria-label="Close dialog"
              >
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleScorecardSubmit} className="mt-4 space-y-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label htmlFor="sc-comm" className="block text-xs font-medium text-[#0F1B2D] mb-1">
                    Communication (1-5)
                  </label>
                  <select
                    id="sc-comm"
                    value={scoreComm}
                    onChange={(e) => setScoreComm(e.target.value)}
                    className="w-full rounded-lg border border-[#E5E1D8] bg-white px-3 py-2 text-xs text-[#0F1B2D] focus:border-[#B8955A] focus:outline-none"
                  >
                    <option value="5">5 - Excellent</option>
                    <option value="4">4 - Strong</option>
                    <option value="3">3 - Adequate</option>
                    <option value="2">2 - Needs Work</option>
                    <option value="1">1 - Poor</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="sc-tech" className="block text-xs font-medium text-[#0F1B2D] mb-1">
                    Technical Depth (1-5)
                  </label>
                  <select
                    id="sc-tech"
                    value={scoreTech}
                    onChange={(e) => setScoreTech(e.target.value)}
                    className="w-full rounded-lg border border-[#E5E1D8] bg-white px-3 py-2 text-xs text-[#0F1B2D] focus:border-[#B8955A] focus:outline-none"
                  >
                    <option value="5">5 - Excellent</option>
                    <option value="4">4 - Strong</option>
                    <option value="3">3 - Adequate</option>
                    <option value="2">2 - Needs Work</option>
                    <option value="1">1 - Poor</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="sc-decision" className="block text-xs font-medium text-[#0F1B2D] mb-1">
                  Overall Panel Recommendation
                </label>
                <select
                  id="sc-decision"
                  value={scoreDecision}
                  onChange={(e) => setScoreDecision(e.target.value)}
                  className="w-full rounded-lg border border-[#E5E1D8] bg-white px-3 py-2 text-xs text-[#0F1B2D] focus:border-[#B8955A] focus:outline-none"
                >
                  <option value="Advance to Next Round">Strong Yes (Advance to next round)</option>
                  <option value="Advance with Reservations">Yes, with reservations</option>
                  <option value="Decline">No (Decline candidate)</option>
                </select>
              </div>

              <div>
                <label htmlFor="sc-comments" className="block text-xs font-medium text-[#0F1B2D] mb-1">
                  Detailed Notes & Observations
                </label>
                <textarea
                  id="sc-comments"
                  rows={3}
                  required
                  value={scoreComments}
                  onChange={(e) => setScoreComments(e.target.value)}
                  placeholder="Summarize candidate answers, problem solving approach, and strengths..."
                  className="w-full rounded-lg border border-[#E5E1D8] p-2.5 text-xs text-[#0F1B2D] focus:border-[#B8955A] focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <EmployerBtn variant="secondary" size="sm" onClick={() => setScorecardInterview(null)}>
                  Cancel
                </EmployerBtn>
                <EmployerBtn type="submit" variant="primary" size="sm">
                  Submit Scorecard
                </EmployerBtn>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-[1280px] space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F1B2D]">
              Interview Management
            </h1>
            <p className="text-xs sm:text-sm text-[#4A5568]">
              Track interview schedules, submit scorecards, and keep hiring panels synchronized.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <EmployerBtn
              variant="primary"
              size="sm"
              onClick={() => setShowScheduleModal(true)}
            >
              <Plus size={14} className="mr-1.5" /> Schedule interview
            </EmployerBtn>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex gap-2 border-b border-[#E5E1D8] pb-2 overflow-x-auto">
          {['Upcoming', 'Needs feedback', 'Past', 'Calendar View'].map((tab) => {
            const active = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap rounded-lg px-4 py-2 text-xs sm:text-sm font-medium transition ${
                  active
                    ? 'bg-[#0F1B2D] text-white shadow-sm'
                    : 'text-[#4A5568] hover:bg-[#FAF8F4] hover:text-[#0F1B2D]'
                }`}
              >
                {tab === 'Needs feedback' ? `Needs Feedback (${pendingFeedback.length})` : tab}
              </button>
            );
          })}
        </div>

        {/* Main Grid */}
        <div className="grid gap-6 lg:grid-cols-12 min-w-0">
          {/* Main Interview Area */}
          <div className="lg:col-span-8 space-y-4 min-w-0">
            {activeTab === 'Upcoming' && (
              <div className="space-y-4">
                {interviews.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-2xl border border-[#E5E1D8] bg-white p-5 shadow-sm transition hover:border-[#B8955A] space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-[#E5E1D8] pb-3">
                      <div className="flex items-center gap-2.5">
                        <span className="font-serif text-sm font-bold text-[#0F1B2D]">
                          {item.date} · {item.time}
                        </span>
                        <StageChip stage={item.status} />
                      </div>
                      <div className="flex items-center gap-2">
                        {item.join ? (
                          <EmployerBtn
                            variant="primary"
                            size="sm"
                            onClick={() => showToast('Launching Northstar Secure Meeting Room...')}
                          >
                            <Video size={14} className="mr-1.5" /> Join Room
                          </EmployerBtn>
                        ) : (
                          <EmployerBtn
                            variant="secondary"
                            size="sm"
                            onClick={() => showToast('Preparation notes loaded')}
                          >
                            Prepare Notes
                          </EmployerBtn>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#4A5568]">
                      <div>
                        <h3 className="font-serif text-base font-bold text-[#0F1B2D]">
                          {item.candidate}
                        </h3>
                        <p className="mt-0.5">
                          {item.job} · <span className="font-medium text-[#806236]">{item.round}</span>
                        </p>
                      </div>
                      <div className="flex items-center gap-3 text-xs">
                        <span className="inline-flex items-center gap-1 rounded bg-[#FAF8F4] px-2 py-1 text-[#0F1B2D]">
                          {item.format} · {item.duration}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#E5E1D8] pt-3 text-xs text-[#4A5568]">
                      <span>Panelists: {item.interviewers}</span>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => showToast('Calendar .ics file downloaded')}
                          className="text-[#806236] hover:underline"
                        >
                          Add to Calendar
                        </button>
                        <span>·</span>
                        <button
                          type="button"
                          onClick={() => setRescheduleItem(item)}
                          className="text-[#806236] hover:underline"
                        >
                          Reschedule
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'Needs feedback' && (
              <div className="space-y-4">
                <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-xs text-amber-900 leading-relaxed">
                  <p className="font-semibold mb-0.5">Prompt Feedback Policy</p>
                  <p>
                    Please submit your scorecard within 24 hours of completing the interview to ensure fair and timely communication with candidates.
                  </p>
                </div>

                {pendingFeedback.map((fb) => (
                  <div
                    key={fb.id}
                    className="rounded-2xl border border-[#E5E1D8] bg-white p-5 shadow-sm space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-serif text-base font-bold text-[#0F1B2D]">
                          {fb.candidate}
                        </h3>
                        <p className="text-xs text-[#4A5568]">{fb.job} · {fb.round}</p>
                      </div>
                      {fb.overdue && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-semibold text-red-700">
                          <AlertCircle size={12} /> Overdue ({fb.finished})
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between border-t border-[#E5E1D8] pt-3">
                      <span className="text-xs text-[#4A5568]">Interview completed {fb.finished}</span>
                      <EmployerBtn
                        variant="primary"
                        size="sm"
                        onClick={() => setScorecardInterview(fb)}
                      >
                        Submit Scorecard
                      </EmployerBtn>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'Past' && (
              <div className="rounded-2xl border border-[#E5E1D8] bg-white p-6 text-center text-xs text-[#4A5568]">
                <Clock size={28} className="mx-auto text-[#4A5568]/50 mb-2" />
                <p className="font-medium text-[#0F1B2D]">14 Completed Interviews in Previous Cycles</p>
                <p className="mt-1">All scorecards recorded and safely archived in hiring history.</p>
              </div>
            )}

            {activeTab === 'Calendar View' && (
              <div className="rounded-2xl border border-[#E5E1D8] bg-white p-5 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-[#E5E1D8] pb-3 text-xs">
                  <span className="font-bold text-[#0F1B2D]">Week of Nov 08 – Nov 14, 2026</span>
                  <span className="text-[#4A5568]">IST Timezone</span>
                </div>
                <div className="grid grid-cols-5 gap-2 text-center text-xs">
                  {['Mon 08', 'Tue 09', 'Wed 10', 'Thu 11', 'Fri 12'].map((day, idx) => (
                    <div key={day} className="rounded-xl border border-[#E5E1D8] bg-[#FAF8F4] p-3 space-y-2">
                      <span className="font-bold text-[#0F1B2D] block">{day}</span>
                      {idx === 0 && (
                        <div className="rounded-lg bg-emerald-100 p-2 text-[11px] text-emerald-900 text-left">
                          <p className="font-semibold">11:00 AM</p>
                          <p className="truncate">Aanya Sen</p>
                        </div>
                      )}
                      {idx === 0 && (
                        <div className="rounded-lg bg-blue-100 p-2 text-[11px] text-blue-900 text-left">
                          <p className="font-semibold">2:30 PM</p>
                          <p className="truncate">Candidate #44</p>
                        </div>
                      )}
                      {idx === 1 && (
                        <div className="rounded-lg bg-amber-100 p-2 text-[11px] text-amber-900 text-left">
                          <p className="font-semibold">10:00 AM</p>
                          <p className="truncate">Rohan Kapoor</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Summary Sidebar */}
          <div className="lg:col-span-4 space-y-6 min-w-0">
            <EmployerCard title="Weekly Interview Metrics">
              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-[#4A5568]">Interviews This Week:</span>
                  <span className="font-bold text-[#0F1B2D]">9</span>
                </div>
                <div className="flex justify-between items-center py-1 border-t border-[#E5E1D8]">
                  <span className="text-[#4A5568]">Awaiting Candidate Confirmation:</span>
                  <span className="font-bold text-[#806236]">1</span>
                </div>
                <div className="flex justify-between items-center py-1 border-t border-[#E5E1D8]">
                  <span className="text-[#4A5568]">Scorecards Overdue:</span>
                  <span className="font-bold text-red-600">1</span>
                </div>
                <div className="flex justify-between items-center py-1 border-t border-[#E5E1D8]">
                  <span className="text-[#4A5568]">Average Days Interview → Offer:</span>
                  <span className="font-bold text-emerald-700">5.2 days</span>
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

export default function EmployerInterviewsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-sm text-[#4A5568]">Loading interviews...</div>}>
      <InterviewsContent />
    </Suspense>
  );
}

