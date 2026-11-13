'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ChevronLeft,
  Sparkles,
  Download,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  FileText,
  Save,
} from 'lucide-react';
import { JobSeekerShell } from '@/components';
import {
  JobBtn,
  defaultUser,
} from '@/components/jobseeker-ui';
import { resumes } from '../../jobseeker-data';

const SECTIONS = ['Summary', 'Experience', 'Education', 'Skills', 'Projects'];

export default function ResumeEditorPage() {
  const params = useParams();
  const rawId = params?.resumeId;
  const resume = resumes.find((r) => r.id === rawId) || resumes[0];

  const [activeSection, setActiveSection] = useState('Summary');
  const [summaryText, setSummaryText] = useState(
    'Senior Product Designer with 6+ years specializing in design systems, UX architecture, and conversion-optimized B2B SaaS workflows. Built design tokens supporting 12 cross-functional squads.'
  );
  const [skillsList, setSkillsList] = useState([
    'Design Systems',
    'Figma & Tokens Studio',
    'User Research & Usability Testing',
    'React & Tailwind UI',
    'Information Architecture',
  ]);
  const [newSkill, setNewSkill] = useState('');
  const [savedToast, setSavedToast] = useState(false);

  const handleSave = () => {
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2500);
  };

  const addSkill = () => {
    if (newSkill.trim() && !skillsList.includes(newSkill.trim())) {
      setSkillsList([...skillsList, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skill) => {
    setSkillsList(skillsList.filter((s) => s !== skill));
  };

  return (
    <JobSeekerShell active="Resumes">
      <div className="space-y-6 max-w-6xl pb-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[#6B7280]">
          <Link
            href="/jobseeker/resumes"
            className="flex items-center gap-1 hover:text-[#0F1B2D]"
          >
            <ChevronLeft size={14} /> Back to Resumes
          </Link>
          <span>/</span>
          <span className="text-[#0F1B2D] font-medium truncate">{resume.name}</span>
        </nav>

        {/* Header */}
        <header className="rounded-2xl border border-[#E5E1D8] bg-white p-6 shadow-sm flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-xl md:text-2xl font-serif font-bold text-[#0F1B2D]">
                {resume.name}
              </h1>
              <span className="rounded-full bg-[#E7F3EC] px-2.5 py-0.5 text-xs font-semibold text-[#286749]">
                ATS Score: {resume.score || 85}%
              </span>
            </div>
            <p className="text-xs text-[#6B7280]">
              Target: <strong className="text-[#0F1B2D]">{resume.targetRole || 'Product Designer'}</strong> · Saved automatically
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link href={`/jobseeker/resumes/${resume.id}/tailor`}>
              <JobBtn secondary small className="flex items-center gap-1.5">
                <Sparkles size={13} className="text-[#806236]" /> Tailor to Job
              </JobBtn>
            </Link>
            <Link href={`/jobseeker/resumes/${resume.id}/ats`}>
              <JobBtn secondary small>
                ATS Scan Breakdown
              </JobBtn>
            </Link>
            <JobBtn primary small onClick={handleSave} className="flex items-center gap-1.5">
              <Save size={14} /> Save Changes
            </JobBtn>
          </div>
        </header>

        {savedToast && (
          <div className="rounded-xl border border-[#CDE5D7] bg-[#E7F3EC] p-3 text-xs text-[#286749] flex items-center justify-between">
            <span className="flex items-center gap-2">
              <CheckCircle2 size={16} /> All changes saved and synced to your platform applications.
            </span>
          </div>
        )}

        {/* 2-Column Editor Layout */}
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Section Selector */}
          <aside className="lg:col-span-3 space-y-2">
            <div className="rounded-xl border border-[#E5E1D8] bg-white p-3 space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B7280] px-3 py-1 block">
                Resume Sections
              </span>
              {SECTIONS.map((sec) => {
                const isCurrent = activeSection === sec;
                return (
                  <button
                    key={sec}
                    type="button"
                    onClick={() => setActiveSection(sec)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center justify-between ${
                      isCurrent
                        ? 'bg-[#0F1B2D] text-white'
                        : 'text-[#4A5568] hover:bg-[#FAF8F4]'
                    }`}
                  >
                    <span>{sec}</span>
                    <CheckCircle2
                      size={13}
                      className={isCurrent ? 'text-[#B8955A]' : 'text-[#CDE5D7]'}
                    />
                  </button>
                );
              })}
            </div>

            {/* ATS Tip Box */}
            <div className="rounded-xl border border-[#D4C3A3] bg-[#F3EBDD]/50 p-4 text-xs text-[#806236] space-y-1.5">
              <span className="font-bold block flex items-center gap-1">
                <Sparkles size={13} /> Pro ATS Tip
              </span>
              <p className="leading-relaxed">
                Include measurable outcomes in your experience bullets (e.g. "reduced drop-off by 22%").
              </p>
            </div>
          </aside>

          {/* Section Form Editor */}
          <div className="lg:col-span-9 space-y-6">
            {activeSection === 'Summary' && (
              <section className="rounded-2xl border border-[#E5E1D8] bg-white p-6 shadow-sm space-y-4">
                <h2 className="text-base font-serif font-bold text-[#0F1B2D]">
                  Professional Summary
                </h2>
                <p className="text-xs text-[#6B7280]">
                  A 3–4 sentence hook highlighting your core focus, domain tenure, and biggest strength.
                </p>
                <textarea
                  rows={5}
                  value={summaryText}
                  onChange={(e) => setSummaryText(e.target.value)}
                  className="w-full p-3.5 rounded-xl border border-[#E5E1D8] text-xs leading-relaxed text-[#0F1B2D] focus:border-[#B8955A] focus:outline-none"
                />
              </section>
            )}

            {activeSection === 'Experience' && (
              <section className="rounded-2xl border border-[#E5E1D8] bg-white p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-serif font-bold text-[#0F1B2D]">
                    Work Experience
                  </h2>
                  <JobBtn secondary small>
                    + Add Role
                  </JobBtn>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="p-4 rounded-xl border border-[#E5E1D8] bg-[#FAF8F4]/50 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <strong className="text-sm font-semibold text-[#0F1B2D] block">
                          Lead Product Designer
                        </strong>
                        <span className="text-[#6B7280]">Klimb Tech · 2023 – Present</span>
                      </div>
                      <span className="text-[#6B7280]">Remote · Bengaluru</span>
                    </div>
                    <p className="text-[#4A5568] leading-relaxed pt-1">
                      Architected multi-brand design system across 4 web apps. Led discovery research and end-to-end prototyping for enterprise onboarding flows.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-[#E5E1D8] bg-[#FAF8F4]/50 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <strong className="text-sm font-semibold text-[#0F1B2D] block">
                          Product Designer
                        </strong>
                        <span className="text-[#6B7280]">DesignForge Studio · 2020 – 2023</span>
                      </div>
                      <span className="text-[#6B7280]">Kolkata, India</span>
                    </div>
                    <p className="text-[#4A5568] leading-relaxed pt-1">
                      Shipped mobile apps and dashboard portals for early-stage fintech ventures. Ran 45+ usability interviews and synthesized qualitative user journeys.
                    </p>
                  </div>
                </div>
              </section>
            )}

            {activeSection === 'Skills' && (
              <section className="rounded-2xl border border-[#E5E1D8] bg-white p-6 shadow-sm space-y-4">
                <h2 className="text-base font-serif font-bold text-[#0F1B2D]">
                  Skills & Core Competencies
                </h2>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addSkill()}
                    placeholder="Add a new skill (e.g. Design Systems, React, GraphQL)..."
                    className="flex-1 h-9 px-3 rounded-lg border border-[#E5E1D8] text-xs text-[#0F1B2D] focus:border-[#B8955A] focus:outline-none"
                  />
                  <JobBtn primary small onClick={addSkill}>
                    Add Skill
                  </JobBtn>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {skillsList.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#FAF8F4] border border-[#E5E1D8] px-3 py-1 text-xs text-[#0F1B2D]"
                    >
                      <span>{skill}</span>
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="text-[#A0A7B4] hover:text-[#B42318]"
                        aria-label={`Remove ${skill}`}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </section>
            )}

            {activeSection === 'Education' && (
              <section className="rounded-2xl border border-[#E5E1D8] bg-white p-6 shadow-sm space-y-4">
                <h2 className="text-base font-serif font-bold text-[#0F1B2D]">Education</h2>
                <div className="p-4 rounded-xl border border-[#E5E1D8] bg-[#FAF8F4]/50 text-xs space-y-1">
                  <strong className="text-sm font-semibold text-[#0F1B2D] block">
                    B.Des in Interaction & Visual Design
                  </strong>
                  <span className="text-[#6B7280]">National Institute of Design · 2016 – 2020</span>
                </div>
              </section>
            )}

            {activeSection === 'Projects' && (
              <section className="rounded-2xl border border-[#E5E1D8] bg-white p-6 shadow-sm space-y-4">
                <h2 className="text-base font-serif font-bold text-[#0F1B2D]">Key Case Studies</h2>
                <div className="p-4 rounded-xl border border-[#E5E1D8] bg-[#FAF8F4]/50 text-xs space-y-1.5">
                  <strong className="text-sm font-semibold text-[#0F1B2D] block">
                    OpenSource UI Token Engine
                  </strong>
                  <p className="text-[#4A5568]">
                    Built an accessible cross-platform token management plugin for Figma that syncs token variables directly to GitHub repositories.
                  </p>
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </JobSeekerShell>
  );
}
