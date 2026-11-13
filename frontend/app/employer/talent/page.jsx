'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  EmployerShell,
  EmployerBtn,
  EmployerCard,
  StageChip,
  EmployerSafetyStrip as SafetyStrip,
} from '@/components';
import {
  talentResults as initialTalent,
  shortlists as initialShortlists,
  jobs,
} from '@/app/employer/employer-data';
import {
  Bookmark,
  CheckCircle2,
  Filter,
  Mail,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  UserCheck,
  UserPlus,
  Users,
  X,
  EyeOff,
} from 'lucide-react';

export default function EmployerTalentPage() {
  const [activeTab, setActiveTab] = useState('Search');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExperience, setSelectedExperience] = useState('All');
  const [selectedSkill, setSelectedSkill] = useState('All');
  const [interviewReadyOnly, setInterviewReadyOnly] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Dynamic candidate list
  const [candidates, setCandidates] = useState(initialTalent);
  const [shortlists, setShortlists] = useState(initialShortlists);
  const [hiddenIds, setHiddenIds] = useState(new Set());

  // Invite modal state
  const [inviteModalCandidate, setInviteModalCandidate] = useState(null);
  const [selectedJobForInvite, setSelectedJobForInvite] = useState(jobs[0]?.id || 'job-1');
  const [inviteMessage, setInviteMessage] = useState('');

  // Create shortlist modal state
  const [showNewShortlistModal, setShowNewShortlistModal] = useState(false);
  const [newShortlistTitle, setNewShortlistTitle] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleHideCandidate = (id) => {
    setHiddenIds((prev) => new Set([...prev, id]));
    showToast('Candidate hidden from results');
  };

  const handleSaveToShortlist = (cand) => {
    setShortlists((prev) =>
      prev.map((s, idx) => (idx === 0 ? { ...s, count: s.count + 1 } : s))
    );
    showToast(`Saved ${cand.name} to Primary Shortlist`);
  };

  const handleSendInvite = (e) => {
    e.preventDefault();
    if (!inviteModalCandidate) return;
    const targetJob = jobs.find((j) => j.id === selectedJobForInvite) || jobs[0];
    showToast(`Application invitation sent to ${inviteModalCandidate.name} for ${targetJob.title}`);
    setInviteModalCandidate(null);
    setInviteMessage('');
  };

  const handleCreateShortlist = (e) => {
    e.preventDefault();
    if (!newShortlistTitle.trim()) return;
    const newEntry = {
      id: `list-${Date.now()}`,
      name: newShortlistTitle.trim(),
      count: 0,
      updated: 'Just now',
    };
    setShortlists([newEntry, ...shortlists]);
    setNewShortlistTitle('');
    setShowNewShortlistModal(false);
    showToast(`Created shortlist "${newEntry.name}"`);
  };

  const filteredCandidates = useMemo(() => {
    return candidates.filter((c) => {
      if (hiddenIds.has(c.id)) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = c.name?.toLowerCase().includes(q);
        const matchesHeadline = c.headline?.toLowerCase().includes(q);
        const matchesSkills = c.skills?.some((s) => s.toLowerCase().includes(q));
        if (!matchesName && !matchesHeadline && !matchesSkills) return false;
      }
      if (selectedExperience !== 'All' && !c.experience?.toLowerCase().includes(selectedExperience.toLowerCase())) {
        return false;
      }
      if (selectedSkill !== 'All' && !c.skills?.includes(selectedSkill)) {
        return false;
      }
      return true;
    });
  }, [candidates, hiddenIds, searchQuery, selectedExperience, selectedSkill]);

  const allSkills = ['All', 'React', 'Figma', 'Node.js', 'User research', 'TypeScript', 'Design Systems'];

  return (
    <EmployerShell active="/employer/talent">
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

      {/* Invite Candidate Modal */}
      {inviteModalCandidate && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="invite-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        >
          <div className="w-full max-w-lg rounded-2xl border border-[#E5E1D8] bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E1D8]">
              <div>
                <h3 id="invite-modal-title" className="text-base font-semibold text-[#0F1B2D]">
                  Invite Candidate to Apply
                </h3>
                <p className="text-xs text-[#4A5568]">
                  Direct outreach to {inviteModalCandidate.name}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setInviteModalCandidate(null)}
                className="text-[#4A5568] hover:text-[#0F1B2D]"
                aria-label="Close dialog"
              >
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSendInvite} className="mt-4 space-y-4">
              <div>
                <label htmlFor="invite-job" className="block text-xs font-medium text-[#0F1B2D] mb-1">
                  Select Open Position
                </label>
                <select
                  id="invite-job"
                  value={selectedJobForInvite}
                  onChange={(e) => setSelectedJobForInvite(e.target.value)}
                  className="w-full rounded-lg border border-[#E5E1D8] bg-white px-3 py-2 text-xs text-[#0F1B2D] focus:border-[#B8955A] focus:outline-none"
                >
                  {jobs.map((j) => (
                    <option key={j.id} value={j.id}>
                      {j.title} · {j.location}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="invite-msg" className="block text-xs font-medium text-[#0F1B2D] mb-1">
                  Personal Invitation Note
                </label>
                <textarea
                  id="invite-msg"
                  rows={4}
                  value={inviteMessage}
                  onChange={(e) => setInviteMessage(e.target.value)}
                  placeholder="Hi! We noticed your excellent track record and think you'd be a fantastic fit for Northstar..."
                  className="w-full rounded-lg border border-[#E5E1D8] p-2.5 text-xs text-[#0F1B2D] focus:border-[#B8955A] focus:outline-none"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <EmployerBtn variant="secondary" size="sm" onClick={() => setInviteModalCandidate(null)}>
                  Cancel
                </EmployerBtn>
                <EmployerBtn type="submit" variant="primary" size="sm">
                  <Send size={14} className="mr-1.5" /> Send Invitation
                </EmployerBtn>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* New Shortlist Modal */}
      {showNewShortlistModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="shortlist-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        >
          <div className="w-full max-w-md rounded-2xl border border-[#E5E1D8] bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E1D8]">
              <h3 id="shortlist-modal-title" className="text-base font-semibold text-[#0F1B2D]">
                Create New Shortlist
              </h3>
              <button
                type="button"
                onClick={() => setShowNewShortlistModal(false)}
                className="text-[#4A5568] hover:text-[#0F1B2D]"
                aria-label="Close dialog"
              >
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleCreateShortlist} className="mt-4 space-y-4">
              <div>
                <label htmlFor="shortlist-title" className="block text-xs font-medium text-[#0F1B2D] mb-1">
                  Shortlist Name
                </label>
                <input
                  id="shortlist-title"
                  type="text"
                  required
                  value={newShortlistTitle}
                  onChange={(e) => setNewShortlistTitle(e.target.value)}
                  placeholder="e.g. Q4 Senior Design Leads"
                  className="w-full rounded-lg border border-[#E5E1D8] px-3 py-2 text-xs text-[#0F1B2D] focus:border-[#B8955A] focus:outline-none"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <EmployerBtn variant="secondary" size="sm" onClick={() => setShowNewShortlistModal(false)}>
                  Cancel
                </EmployerBtn>
                <EmployerBtn type="submit" variant="primary" size="sm">
                  Create Shortlist
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
              Talent Sourcing & Direct Outreach
            </h1>
            <p className="text-xs sm:text-sm text-[#4A5568]">
              Discover opted-in, pre-vetted professionals open to exciting early-stage startup opportunities.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <EmployerBtn
              variant="secondary"
              size="sm"
              onClick={() => setShowNewShortlistModal(true)}
            >
              <UserPlus size={14} className="mr-1.5" /> New Shortlist
            </EmployerBtn>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex gap-2 border-b border-[#E5E1D8] pb-2">
          {['Search', 'Shortlists', 'Invitations'].map((tab) => {
            const active = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`rounded-lg px-4 py-2 text-xs sm:text-sm font-medium transition ${
                  active
                    ? 'bg-[#0F1B2D] text-white shadow-sm'
                    : 'text-[#4A5568] hover:bg-[#FAF8F4] hover:text-[#0F1B2D]'
                }`}
              >
                {tab === 'Search' && 'Search Candidates'}
                {tab === 'Shortlists' && `Saved Shortlists (${shortlists.length})`}
                {tab === 'Invitations' && 'Outreach & Invitations'}
              </button>
            );
          })}
        </div>

        {/* Main Content Area */}
        {activeTab === 'Search' && (
          <div className="grid gap-6 lg:grid-cols-12 min-w-0">
            {/* Filter Sidebar */}
            <div className="lg:col-span-4 space-y-6 min-w-0">
              <EmployerCard title="Search Filters">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="talent-search" className="block text-xs font-medium text-[#0F1B2D] mb-1">
                      Role, Title or Keyword
                    </label>
                    <div className="relative">
                      <Search size={14} className="absolute left-3 top-2.5 text-[#4A5568]" />
                      <input
                        id="talent-search"
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="e.g. Design, React, Lead..."
                        className="w-full rounded-lg border border-[#E5E1D8] pl-8 pr-3 py-1.5 text-xs text-[#0F1B2D] focus:border-[#B8955A] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="experience-filter" className="block text-xs font-medium text-[#0F1B2D] mb-1">
                      Experience Level
                    </label>
                    <select
                      id="experience-filter"
                      value={selectedExperience}
                      onChange={(e) => setSelectedExperience(e.target.value)}
                      className="w-full rounded-lg border border-[#E5E1D8] bg-white px-3 py-1.5 text-xs text-[#0F1B2D] focus:border-[#B8955A] focus:outline-none"
                    >
                      <option value="All">All Experience Tiers</option>
                      <option value="Mid">Mid-Level (2–4 yrs)</option>
                      <option value="Senior">Senior (5–8 yrs)</option>
                      <option value="Lead">Lead / Architect (8+ yrs)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#0F1B2D] mb-1.5">
                      Core Skill Competency
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {allSkills.map((sk) => (
                        <button
                          key={sk}
                          type="button"
                          onClick={() => setSelectedSkill(sk)}
                          className={`rounded-full px-2.5 py-1 text-xs transition ${
                            selectedSkill === sk
                              ? 'bg-[#B8955A] text-white font-medium'
                              : 'border border-[#E5E1D8] bg-white text-[#4A5568] hover:bg-[#FAF8F4]'
                          }`}
                        >
                          {sk}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-[#E5E1D8] pt-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={interviewReadyOnly}
                        onChange={(e) => setInterviewReadyOnly(e.target.checked)}
                        className="rounded border-[#E5E1D8] text-[#806236] focus:ring-[#B8955A]"
                      />
                      <span className="text-xs text-[#0F1B2D]">
                        Interview-Ready only (Shared Practice Rubric)
                      </span>
                    </label>
                  </div>

                  <div className="rounded-xl border border-[#F3EBDD] bg-[#FAF8F4] p-3 text-xs text-[#806236] leading-relaxed">
                    <p className="font-semibold mb-1">Ethical Sourcing Guarantee</p>
                    <p>
                      Candidate profiles exclude age, gender, religion, marital status, or photos. Recommendations rely strictly on verified technical competencies and work samples.
                    </p>
                  </div>
                </div>
              </EmployerCard>
            </div>

            {/* Candidates Results List */}
            <div className="lg:col-span-8 space-y-4 min-w-0">
              <div className="flex items-center justify-between text-xs text-[#4A5568]">
                <span>Showing {filteredCandidates.length} opted-in candidates</span>
                {hiddenIds.size > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      setHiddenIds(new Set());
                      showToast('Hidden candidate filters cleared');
                    }}
                    className="text-[#806236] hover:underline"
                  >
                    Reset {hiddenIds.size} hidden profiles
                  </button>
                )}
              </div>

              {filteredCandidates.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-[#E5E1D8] bg-white p-12 text-center">
                  <Users size={32} className="mx-auto text-[#4A5568]/50 mb-3" />
                  <h3 className="font-serif text-lg font-bold text-[#0F1B2D]">No matching candidates</h3>
                  <p className="text-xs text-[#4A5568] mt-1 max-w-sm mx-auto">
                    Try loosening your search filters or clear selected competencies to see broader candidate profiles.
                  </p>
                  <EmployerBtn
                    variant="secondary"
                    size="sm"
                    className="mt-4"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedExperience('All');
                      setSelectedSkill('All');
                    }}
                  >
                    Clear Filters
                  </EmployerBtn>
                </div>
              ) : (
                filteredCandidates.map((cand) => (
                  <div
                    key={cand.id}
                    className="rounded-2xl border border-[#E5E1D8] bg-white p-5 shadow-sm transition hover:border-[#B8955A] hover:shadow-md space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                      <div className="flex items-start gap-3.5">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0F1B2D] text-sm font-bold text-white">
                          {cand.name.charAt(0)}
                        </div>
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-serif text-base font-bold text-[#0F1B2D]">
                              {cand.name}
                            </h3>
                            {cand.match && (
                              <span className="inline-flex items-center gap-1 rounded-full bg-[#F3EBDD] px-2.5 py-0.5 text-xs font-semibold text-[#806236] border border-[#B8955A]/30">
                                <Sparkles size={11} className="text-[#806236]" /> {cand.match}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-[#4A5568] leading-relaxed">
                            {cand.headline}
                          </p>
                          <div className="flex flex-wrap items-center gap-2 text-xs text-[#4A5568]">
                            <span>{cand.experience}</span>
                            <span>·</span>
                            <span>{cand.location}</span>
                            <span>·</span>
                            <span className="text-emerald-700 font-medium">{cand.availability}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Skill Badges */}
                    <div className="flex flex-wrap gap-1.5 border-t border-[#E5E1D8] pt-3">
                      {cand.skills?.map((sk) => (
                        <span
                          key={sk}
                          className="rounded-md border border-[#E5E1D8] bg-[#FAF8F4] px-2.5 py-0.5 text-xs text-[#0F1B2D]"
                        >
                          {sk}
                        </span>
                      ))}
                    </div>

                    {/* Card Action Buttons - flex-wrap prevents 440px blowout */}
                    <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#E5E1D8] pt-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <EmployerBtn
                          variant="primary"
                          size="sm"
                          onClick={() => setInviteModalCandidate(cand)}
                        >
                          <Mail size={14} className="mr-1.5" /> Invite to apply
                        </EmployerBtn>
                        <EmployerBtn
                          variant="secondary"
                          size="sm"
                          onClick={() => handleSaveToShortlist(cand)}
                        >
                          <Bookmark size={14} className="mr-1.5" /> Save to shortlist
                        </EmployerBtn>
                      </div>
                      <EmployerBtn
                        variant="ghost"
                        size="sm"
                        onClick={() => handleHideCandidate(cand.id)}
                        className="text-[#4A5568] hover:text-[#B42318]"
                      >
                        <EyeOff size={14} className="mr-1" /> Hide profile
                      </EmployerBtn>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Shortlists Tab */}
        {activeTab === 'Shortlists' && (
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {shortlists.map((sl) => (
                <div
                  key={sl.id}
                  className="rounded-2xl border border-[#E5E1D8] bg-white p-5 shadow-sm space-y-4"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-serif text-base font-bold text-[#0F1B2D]">
                        {sl.name}
                      </h3>
                      <p className="text-xs text-[#4A5568] mt-0.5">
                        {sl.count} candidates saved · Updated {sl.updated}
                      </p>
                    </div>
                    <span className="rounded-full bg-[#FAF8F4] px-2.5 py-0.5 text-xs font-medium text-[#806236] border border-[#E5E1D8]">
                      Active
                    </span>
                  </div>

                  <div className="border-t border-[#E5E1D8] pt-3 flex gap-2">
                    <EmployerBtn
                      variant="primary"
                      size="sm"
                      className="w-full"
                      onClick={() => showToast(`Dispatched bulk invitations to all ${sl.count} candidates in ${sl.name}`)}
                    >
                      <Mail size={14} className="mr-1.5" /> Invite all to apply
                    </EmployerBtn>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Invitations Tab */}
        {activeTab === 'Invitations' && (
          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-[#E5E1D8] bg-white p-5 shadow-sm">
                <span className="text-xs font-semibold text-[#4A5568]">Invitations Sent</span>
                <p className="font-serif text-2xl font-bold text-[#0F1B2D] mt-1">12</p>
                <p className="text-xs text-[#4A5568] mt-1">This billing cycle</p>
              </div>
              <div className="rounded-2xl border border-[#E5E1D8] bg-white p-5 shadow-sm">
                <span className="text-xs font-semibold text-[#4A5568]">Applications Triggered</span>
                <p className="font-serif text-2xl font-bold text-emerald-700 mt-1">5</p>
                <p className="text-xs text-[#4A5568] mt-1">42% response conversion</p>
              </div>
              <div className="rounded-2xl border border-[#E5E1D8] bg-white p-5 shadow-sm">
                <span className="text-xs font-semibold text-[#4A5568]">Daily Outreach Remaining</span>
                <p className="font-serif text-2xl font-bold text-[#806236] mt-1">8</p>
                <p className="text-xs text-[#4A5568] mt-1">Resets at midnight UTC</p>
              </div>
            </div>

            <EmployerCard title="Recent Sourcing Outreach">
              <div className="divide-y divide-[#E5E1D8]">
                {[
                  { name: 'Kavita Raman', role: 'Staff Frontend Engineer', date: 'Yesterday', status: 'Applied', job: 'Senior Frontend Engineer' },
                  { name: 'Rohit Roy', role: 'Full Stack Developer', date: '2 days ago', status: 'Pending Review', job: 'Backend Engineer' },
                  { name: 'Tanvi Shah', role: 'Product Design Lead', date: '4 days ago', status: 'Accepted', job: 'Lead Product Designer' },
                ].map((item, idx) => (
                  <div key={idx} className="py-3.5 first:pt-0 last:pb-0 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-semibold text-[#0F1B2D]">{item.name}</p>
                      <p className="text-[#4A5568]">{item.role} · Invited for {item.job}</p>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex rounded-full bg-[#FAF8F4] px-2.5 py-0.5 font-medium text-[#806236] border border-[#E5E1D8]">
                        {item.status}
                      </span>
                      <p className="text-[#4A5568] text-[11px] mt-0.5">{item.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </EmployerCard>
          </div>
        )}
      </div>
    </EmployerShell>
  );
}
