'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  ChevronLeft,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  FileText,
  Check,
  X,
  Edit2,
} from 'lucide-react';
import { JobSeekerShell } from '@/components';
import {
  JobBtn,
  defaultUser,
} from '@/components/jobseeker-ui';
import { resumes, jobs } from '../../../jobseeker-data';

export default function JobTailoringPage() {
  const params = useParams();
  const router = useRouter();
  const rawId = params?.resumeId;
  const resume = resumes.find((r) => r.id === rawId) || resumes[0];

  const [selectedJobId, setSelectedJobId] = useState(jobs[0]?.id || 'senior-product-designer');
  const [step, setStep] = useState(1);
  const [suggestions, setSuggestions] = useState([
    {
      id: 's1',
      section: 'Summary',
      original: 'Senior Product Designer specializing in design systems and B2B SaaS workflows.',
      tailored:
        'Senior Product Designer with 6+ years experience architecting multi-squad design systems, Figma token workflows, and accessible WCAG 2.1 UI libraries.',
      accepted: true,
    },
    {
      id: 's2',
      section: 'Experience',
      original: 'Led design system components across web apps.',
      tailored:
        'Standardized 120+ atomic design components and synced Tokens Studio with GitHub CI/CD, reducing front-end handoff discrepancies by 40%.',
      accepted: false,
    },
  ]);
  const [isApplying, setIsApplying] = useState(false);

  const selectedJob = jobs.find((j) => j.id === selectedJobId) || jobs[0];

  const toggleAccept = (id) => {
    setSuggestions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, accepted: !s.accepted } : s))
    );
  };

  const handleFinishTailoring = () => {
    setIsApplying(true);
    setTimeout(() => {
      setIsApplying(false);
      router.push(`/jobseeker/resumes/${resume.id}`);
    }, 900);
  };

  return (
    <JobSeekerShell active="Resumes">
      <div className="space-y-6 max-w-5xl pb-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[#6B7280]">
          <Link
            href={`/jobseeker/resumes/${resume.id}`}
            className="flex items-center gap-1 hover:text-[#0F1B2D]"
          >
            <ChevronLeft size={14} /> Back to Editor
          </Link>
          <span>/</span>
          <span className="text-[#0F1B2D] font-medium">Tailor Resume</span>
        </nav>

        {/* Header */}
        <header className="rounded-2xl border border-[#E5E1D8] bg-white p-6 shadow-sm flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-[#806236] uppercase tracking-wider block mb-1">
              AI Resume Tailoring
            </span>
            <h1 className="text-xl md:text-2xl font-serif font-bold text-[#0F1B2D]">
              Tailoring: {resume.name}
            </h1>
            <p className="text-xs md:text-sm text-[#6B7280] mt-1">
              Optimizing impact statements for <strong className="text-[#0F1B2D]">{selectedJob.title}</strong> at {selectedJob.company?.name || selectedJob.company}.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-[#6B7280]">Step {step} of 2</span>
          </div>
        </header>

        {step === 1 && (
          <section className="rounded-2xl border border-[#E5E1D8] bg-white p-6 shadow-sm space-y-4">
            <h2 className="text-base font-serif font-bold text-[#0F1B2D]">
              1. Select Job Posting to Target
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {jobs.map((job) => {
                const isSelected = selectedJobId === job.id;
                return (
                  <div
                    key={job.id}
                    onClick={() => setSelectedJobId(job.id)}
                    className={`cursor-pointer rounded-xl border p-4 transition-all ${
                      isSelected
                        ? 'border-[#B8955A] bg-[#FFF8E8] shadow-sm'
                        : 'border-[#E5E1D8] bg-[#FAF8F4]/40 hover:bg-[#FAF8F4]'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-sm font-semibold text-[#0F1B2D]">{job.title}</h3>
                        <p className="text-xs text-[#6B7280]">{job.company?.name || job.company} · {job.loc}</p>
                      </div>
                      {isSelected && (
                        <span className="grid h-5 w-5 place-items-center rounded-full bg-[#0F1B2D] text-white">
                          <Check size={12} />
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-3 flex justify-end">
              <JobBtn primary small onClick={() => setStep(2)} className="flex items-center gap-1.5">
                Generate Suggestions <ArrowRight size={14} />
              </JobBtn>
            </div>
          </section>
        )}

        {step === 2 && (
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-serif font-bold text-[#0F1B2D]">
                  2. Review Tailored Suggestions
                </h2>
                <p className="text-xs text-[#6B7280]">
                  Accept suggestions to update your resume draft with targeted phrases.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-xs text-[#9A7A45] hover:underline"
              >
                Change Target Job
              </button>
            </div>

            <div className="space-y-4">
              {suggestions.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-[#E5E1D8] bg-white p-5 shadow-sm space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#806236]">
                      Section: {item.section}
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleAccept(item.id)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold border flex items-center gap-1.5 transition-colors ${
                        item.accepted
                          ? 'bg-[#E7F3EC] text-[#286749] border-[#CDE5D7]'
                          : 'bg-[#FAF8F4] text-[#6B7280] border-[#E5E1D8]'
                      }`}
                    >
                      {item.accepted ? (
                        <>
                          <Check size={13} /> Accepted
                        </>
                      ) : (
                        'Accept Suggestion'
                      )}
                    </button>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2 text-xs">
                    <div className="p-3 rounded-lg border border-[#E5E1D8] bg-[#FAF8F4]/50">
                      <span className="text-[#A0A7B4] block text-[11px] font-semibold mb-1">
                        Current Wording
                      </span>
                      <p className="text-[#4A5568]">{item.original}</p>
                    </div>

                    <div className="p-3 rounded-lg border border-[#CDE5D7] bg-[#E7F3EC]/20">
                      <span className="text-[#286749] block text-[11px] font-semibold mb-1 flex items-center gap-1">
                        <Sparkles size={11} /> AI Tailored Wording
                      </span>
                      <p className="text-[#0F1B2D] font-medium leading-relaxed">{item.tailored}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3 flex justify-end">
              <JobBtn
                primary
                onClick={handleFinishTailoring}
                disabled={isApplying}
                className="px-6 min-h-[42px]"
              >
                {isApplying ? 'Applying Changes...' : 'Save & Update Resume'}
              </JobBtn>
            </div>
          </section>
        )}
      </div>
    </JobSeekerShell>
  );
}
