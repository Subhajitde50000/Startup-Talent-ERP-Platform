'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  EmployerShell,
  EmployerBtn,
  EmployerCard,
  EmployerSafetyStrip as SafetyStrip,
} from '@/components';
import {
  ArrowLeft,
  CheckCircle2,
  DollarSign,
  Plus,
  Send,
  Sparkles,
  Users,
  X,
} from 'lucide-react';

export default function EmployerNewHiringRequestPage() {
  const router = useRouter();
  const [roleTitle, setRoleTitle] = useState('');
  const [department, setDepartment] = useState('Product & Engineering');
  const [headcount, setHeadcount] = useState(1);
  const [urgency, setUrgency] = useState('Medium');
  const [whyNow, setWhyNow] = useState('Growth');
  const [budgetRange, setBudgetRange] = useState('₹18,00,000 – ₹24,00,000');
  const [targetDate, setTargetDate] = useState('2027-01-15');
  const [employmentType, setEmploymentType] = useState('Full-time');
  const [workMode, setWorkMode] = useState('Hybrid');
  const [hiringManager, setHiringManager] = useState('Priya Mehta');
  const [approvers, setApprovers] = useState('Meera Shah (Finance), Aditya (Founder)');
  const [justification, setJustification] = useState('');
  
  const [skills, setSkills] = useState(['React', 'TypeScript', 'System Architecture']);
  const [newSkill, setNewSkill] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    showToast('Hiring request submitted for internal executive and budget approval!');
    setTimeout(() => {
      router.push('/employer/hiring');
    }, 1500);
  };

  const handleSaveDraft = () => {
    showToast('Draft hiring request saved locally.');
  };

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

      <div className="mx-auto max-w-[1080px] space-y-6">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#4A5568]">
          <Link
            href="/employer/hiring"
            className="inline-flex items-center gap-1 font-medium text-[#806236] hover:underline"
          >
            <ArrowLeft size={14} /> Back to Hiring
          </Link>
          <span>/</span>
          <span className="text-[#0F1B2D] font-medium">New Hiring Request</span>
        </div>

        {/* Page Title */}
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F1B2D]">
            Create Internal Hiring Request
          </h1>
          <p className="text-xs sm:text-sm text-[#4A5568]">
            Propose a new headcount need and route it through team budget sign-off before publishing a live job post.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-12 min-w-0">
          {/* Main Form Fields */}
          <div className="lg:col-span-8 space-y-6 min-w-0">
            <EmployerCard title="Role Overview & Justification">
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="req-title" className="block text-xs font-medium text-[#0F1B2D] mb-1">
                      Proposed Role Title
                    </label>
                    <input
                      id="req-title"
                      type="text"
                      required
                      value={roleTitle}
                      onChange={(e) => setRoleTitle(e.target.value)}
                      placeholder="e.g. Lead Frontend Architect"
                      className="w-full rounded-lg border border-[#E5E1D8] px-3 py-2 text-xs text-[#0F1B2D] focus:border-[#B8955A] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="req-dept" className="block text-xs font-medium text-[#0F1B2D] mb-1">
                      Department / Function
                    </label>
                    <input
                      id="req-dept"
                      type="text"
                      required
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      placeholder="e.g. Engineering · Platform"
                      className="w-full rounded-lg border border-[#E5E1D8] px-3 py-2 text-xs text-[#0F1B2D] focus:border-[#B8955A] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <label htmlFor="req-headcount" className="block text-xs font-medium text-[#0F1B2D] mb-1">
                      Target Headcount
                    </label>
                    <input
                      id="req-headcount"
                      type="number"
                      min={1}
                      max={10}
                      value={headcount}
                      onChange={(e) => setHeadcount(Number(e.target.value))}
                      className="w-full rounded-lg border border-[#E5E1D8] px-3 py-2 text-xs text-[#0F1B2D] focus:border-[#B8955A] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="req-urgency" className="block text-xs font-medium text-[#0F1B2D] mb-1">
                      Urgency Level
                    </label>
                    <select
                      id="req-urgency"
                      value={urgency}
                      onChange={(e) => setUrgency(e.target.value)}
                      className="w-full rounded-lg border border-[#E5E1D8] bg-white px-3 py-2 text-xs text-[#0F1B2D] focus:border-[#B8955A] focus:outline-none"
                    >
                      <option value="Low">Low (Backlog / Pipeline)</option>
                      <option value="Medium">Medium (Q1 Expansion)</option>
                      <option value="High">High (Immediate Backfill)</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="req-why" className="block text-xs font-medium text-[#0F1B2D] mb-1">
                      Business Driver ("Why Now")
                    </label>
                    <select
                      id="req-why"
                      value={whyNow}
                      onChange={(e) => setWhyNow(e.target.value)}
                      className="w-full rounded-lg border border-[#E5E1D8] bg-white px-3 py-2 text-xs text-[#0F1B2D] focus:border-[#B8955A] focus:outline-none"
                    >
                      <option value="Growth">Growth & Scaling</option>
                      <option value="Replacement">Replacement / Backfill</option>
                      <option value="New project">New Product Milestone</option>
                      <option value="Skill gap">Specialized Skill Gap</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="req-justification" className="block text-xs font-medium text-[#0F1B2D] mb-1">
                    Business Justification & Impact
                  </label>
                  <textarea
                    id="req-justification"
                    rows={3}
                    value={justification}
                    onChange={(e) => setJustification(e.target.value)}
                    placeholder="Describe why this hire is critical to your team's quarterly OKRs..."
                    className="w-full rounded-lg border border-[#E5E1D8] p-2.5 text-xs text-[#0F1B2D] focus:border-[#B8955A] focus:outline-none"
                  />
                </div>
              </div>
            </EmployerCard>

            <EmployerCard title="Budget & Employment Terms">
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="req-budget" className="block text-xs font-medium text-[#0F1B2D] mb-1">
                      Estimated Annual CTC Range
                    </label>
                    <input
                      id="req-budget"
                      type="text"
                      required
                      value={budgetRange}
                      onChange={(e) => setBudgetRange(e.target.value)}
                      className="w-full rounded-lg border border-[#E5E1D8] px-3 py-2 text-xs text-[#0F1B2D] focus:border-[#B8955A] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="req-target-date" className="block text-xs font-medium text-[#0F1B2D] mb-1">
                      Target Joining Date
                    </label>
                    <input
                      id="req-target-date"
                      type="date"
                      required
                      value={targetDate}
                      onChange={(e) => setTargetDate(e.target.value)}
                      className="w-full rounded-lg border border-[#E5E1D8] px-3 py-2 text-xs text-[#0F1B2D] focus:border-[#B8955A] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="req-emp-type" className="block text-xs font-medium text-[#0F1B2D] mb-1">
                      Employment Agreement
                    </label>
                    <select
                      id="req-emp-type"
                      value={employmentType}
                      onChange={(e) => setEmploymentType(e.target.value)}
                      className="w-full rounded-lg border border-[#E5E1D8] bg-white px-3 py-2 text-xs text-[#0F1B2D] focus:border-[#B8955A] focus:outline-none"
                    >
                      <option value="Full-time">Full-time Permanent</option>
                      <option value="Contract">Fixed-term Contract</option>
                      <option value="Internship">Paid Internship</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="req-work-mode" className="block text-xs font-medium text-[#0F1B2D] mb-1">
                      Work Location & Mode
                    </label>
                    <select
                      id="req-work-mode"
                      value={workMode}
                      onChange={(e) => setWorkMode(e.target.value)}
                      className="w-full rounded-lg border border-[#E5E1D8] bg-white px-3 py-2 text-xs text-[#0F1B2D] focus:border-[#B8955A] focus:outline-none"
                    >
                      <option value="Hybrid">Hybrid (Bangalore)</option>
                      <option value="Remote">100% Remote (India)</option>
                      <option value="Onsite">On-site Campus</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#0F1B2D] mb-1">
                    Key Competencies & Must-Haves
                  </label>
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {skills.map((s) => (
                      <span
                        key={s}
                        className="inline-flex items-center gap-1 rounded-md border border-[#F3EBDD] bg-[#F3EBDD] px-2.5 py-1 text-xs font-medium text-[#806236]"
                      >
                        {s}
                        <button
                          type="button"
                          onClick={() => handleRemoveSkill(s)}
                          className="hover:text-red-700"
                          aria-label={`Remove skill ${s}`}
                        >
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      placeholder="Add another required competency..."
                      className="flex-1 rounded-lg border border-[#E5E1D8] px-3 py-1.5 text-xs text-[#0F1B2D] focus:border-[#B8955A] focus:outline-none"
                    />
                    <EmployerBtn variant="secondary" size="sm" onClick={handleAddSkill}>
                      <Plus size={14} className="mr-1" /> Add
                    </EmployerBtn>
                  </div>
                </div>
              </div>
            </EmployerCard>

            <EmployerCard title="Stakeholders & Approvers">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="req-manager" className="block text-xs font-medium text-[#0F1B2D] mb-1">
                    Hiring Manager
                  </label>
                  <input
                    id="req-manager"
                    type="text"
                    required
                    value={hiringManager}
                    onChange={(e) => setHiringManager(e.target.value)}
                    className="w-full rounded-lg border border-[#E5E1D8] px-3 py-2 text-xs text-[#0F1B2D] focus:border-[#B8955A] focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="req-approvers" className="block text-xs font-medium text-[#0F1B2D] mb-1">
                    Approval Routing Chain
                  </label>
                  <input
                    id="req-approvers"
                    type="text"
                    required
                    value={approvers}
                    onChange={(e) => setApprovers(e.target.value)}
                    className="w-full rounded-lg border border-[#E5E1D8] px-3 py-2 text-xs text-[#0F1B2D] focus:border-[#B8955A] focus:outline-none"
                  />
                </div>
              </div>
            </EmployerCard>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <EmployerBtn type="submit" variant="primary" size="md">
                <Send size={14} className="mr-1.5" /> Submit for Approval
              </EmployerBtn>
              <EmployerBtn variant="secondary" size="md" onClick={handleSaveDraft}>
                Save Draft
              </EmployerBtn>
              <Link href="/employer/hiring">
                <EmployerBtn variant="ghost" size="md">
                  Cancel
                </EmployerBtn>
              </Link>
            </div>
          </div>

          {/* Right Summary Panel */}
          <div className="lg:col-span-4 space-y-6 min-w-0">
            <EmployerCard title="Plan & Budget Impact">
              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-[#4A5568]">Projected Annual CTC:</span>
                  <span className="font-bold text-[#0F1B2D]">{budgetRange.split('–')[0].trim()} × {headcount}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-t border-[#E5E1D8]">
                  <span className="text-[#4A5568]">Open Jobs Quota:</span>
                  <span className="font-bold text-[#806236]">4 of 5 active</span>
                </div>
                <div className="flex justify-between items-center py-1 border-t border-[#E5E1D8]">
                  <span className="text-[#4A5568]">Available Job Slots:</span>
                  <span className="font-bold text-emerald-700">1 remaining on Growth plan</span>
                </div>
                <p className="text-[#4A5568] pt-2 border-t border-[#E5E1D8]">
                  Approval will notify Meera Shah (Finance) and reserve budget without immediately opening the public listing.
                </p>
              </div>
            </EmployerCard>

            <SafetyStrip />
          </div>
        </form>
      </div>
    </EmployerShell>
  );
}
