'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  ChevronLeft,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  FileText,
  Upload,
  Check,
  Building,
} from 'lucide-react';
import { JobSeekerShell } from '@/components';
import {
  JobBtn,
  SafetyStrip,
  defaultUser,
} from '@/components/jobseeker-ui';
import { jobs, resumes } from '../../../jobseeker-data';

export default function JobApplyPage() {
  const params = useParams();
  const router = useRouter();
  const rawId = params?.jobId;
  const job = jobs.find((j) => j.id === rawId) || jobs[0];

  const [step, setStep] = useState(1);
  const [selectedResumeId, setSelectedResumeId] = useState(resumes[0]?.id || 'r1');
  const [formData, setFormData] = useState({
    fullName: defaultUser.name,
    email: 'aanya.sen@example.com',
    phone: '+91 98765 43210',
    portfolio: 'https://aanya.design',
    experienceYears: '6',
    salaryExpectation: '₹28,00,000 / yr',
    noticePeriod: '30 days',
    coverNote: 'Excited about building high-growth systems with founder-level speed.',
    remoteComfort: 'yes',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedResume = resumes.find((r) => r.id === selectedResumeId) || resumes[0];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <JobSeekerShell active="Jobs">
      <div className="space-y-6 max-w-4xl pb-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[#6B7280]">
          <Link
            href={`/jobseeker/jobs/${job.id}`}
            className="flex items-center gap-1 hover:text-[#0F1B2D]"
          >
            <ChevronLeft size={14} /> Back to Job Details
          </Link>
          <span>/</span>
          <span className="text-[#0F1B2D] font-medium">Apply</span>
        </nav>

        {/* Application Header */}
        <header className="rounded-2xl border border-[#E5E1D8] bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase font-semibold text-[#806236] tracking-wider block mb-1">
                Job Application
              </span>
              <h1 className="text-xl md:text-2xl font-serif font-bold text-[#0F1B2D]">
                Applying to {job.title}
              </h1>
              <p className="text-xs md:text-sm text-[#4A5568] mt-1">
                at <span className="font-semibold text-[#0F1B2D]">{job.company?.name || job.company}</span> · {job.loc} · {job.salary}
              </p>
            </div>
            <div className="rounded-xl border border-[#E5E1D8] bg-[#FAF8F4] px-4 py-2 text-right">
              <span className="text-xs text-[#6B7280] block">Step</span>
              <span className="text-base font-bold text-[#0F1B2D]">{step} of 4</span>
            </div>
          </div>

          {/* Stepper progress */}
          <div className="mt-6 flex items-center justify-between gap-2 border-t border-[#F0EBE0] pt-4">
            {[
              { num: 1, label: 'Resume' },
              { num: 2, label: 'Details' },
              { num: 3, label: 'Preferences' },
              { num: 4, label: 'Review' },
            ].map((s) => (
              <div key={s.num} className="flex-1 flex flex-col items-center sm:items-start">
                <div className="flex items-center gap-2 w-full">
                  <span
                    className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-bold ${
                      step > s.num
                        ? 'bg-[#286749] text-white'
                        : step === s.num
                        ? 'bg-[#0F1B2D] text-white'
                        : 'bg-[#F0EBE0] text-[#6B7280]'
                    }`}
                  >
                    {step > s.num ? <Check size={14} /> : s.num}
                  </span>
                  <div
                    className={`hidden sm:block h-1 flex-1 rounded-full ${
                      step > s.num ? 'bg-[#286749]' : 'bg-[#E5E1D8]'
                    }`}
                  />
                </div>
                <span
                  className={`mt-1.5 text-xs font-medium hidden sm:block ${
                    step === s.num ? 'text-[#0F1B2D] font-bold' : 'text-[#6B7280]'
                  }`}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </header>

        {submitted ? (
          <div className="rounded-2xl border border-[#CDE5D7] bg-[#E7F3EC]/30 p-8 text-center space-y-4">
            <span className="grid h-16 w-16 mx-auto place-items-center rounded-full bg-[#E7F3EC] text-[#286749]">
              <CheckCircle2 size={36} />
            </span>
            <h2 className="text-2xl font-serif font-bold text-[#0F1B2D]">
              Application Submitted Successfully!
            </h2>
            <p className="text-sm text-[#4A5568] max-w-lg mx-auto leading-relaxed">
              Your profile, tailored resume, and screening answers have been delivered directly to the hiring founders at {job.company?.name || job.company}.
            </p>
            <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
              <Link href="/jobseeker/applications">
                <JobBtn primary className="px-5">
                  Track in Applications <ArrowRight size={14} />
                </JobBtn>
              </Link>
              <Link href="/jobseeker/jobs">
                <JobBtn secondary small>
                  Search More Jobs
                </JobBtn>
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step 1: Resume Selection */}
            {step === 1 && (
              <section className="rounded-2xl border border-[#E5E1D8] bg-white p-6 shadow-sm space-y-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-base font-serif font-bold text-[#0F1B2D]">
                      1. Select Your Application Resume
                    </h2>
                    <p className="text-xs text-[#6B7280] mt-0.5">
                      Choose which resume to submit with this application.
                    </p>
                  </div>
                  <Link
                    href={`/jobseeker/resumes/r1/tailor?job=${job.id}`}
                    className="text-xs text-[#9A7A45] hover:underline flex items-center gap-1 font-semibold"
                  >
                    <Sparkles size={13} /> Tailor for this role
                  </Link>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {resumes.map((r) => {
                    const isSelected = selectedResumeId === r.id;
                    return (
                      <div
                        key={r.id}
                        onClick={() => setSelectedResumeId(r.id)}
                        className={`cursor-pointer rounded-xl border p-4 transition-all ${
                          isSelected
                            ? 'border-[#B8955A] bg-[#FFF8E8] shadow-sm'
                            : 'border-[#E5E1D8] bg-[#FAF8F4]/50 hover:bg-[#FAF8F4]'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2.5">
                            <FileText
                              size={18}
                              className={isSelected ? 'text-[#806236]' : 'text-[#6B7280]'}
                            />
                            <div>
                              <h3 className="text-sm font-semibold text-[#0F1B2D]">{r.name}</h3>
                              <p className="text-xs text-[#6B7280]">{r.targetRole || 'Product Designer'}</p>
                            </div>
                          </div>
                          {isSelected && (
                            <span className="grid h-5 w-5 place-items-center rounded-full bg-[#0F1B2D] text-white">
                              <Check size={12} />
                            </span>
                          )}
                        </div>
                        <div className="mt-3 pt-2.5 border-t border-[#F0EBE0] flex items-center justify-between text-xs text-[#6B7280]">
                          <span>ATS Score: <strong className="text-[#0F1B2D]">{r.score || 85}/100</strong></span>
                          <span>{r.updatedAt || 'Recent'}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-2 flex items-center justify-between text-xs">
                  <span className="text-[#6B7280]">Selected: <strong>{selectedResume.name}</strong></span>
                  <Link href="/jobseeker/resumes/new" className="text-[#9A7A45] hover:underline">
                    + Upload New Resume
                  </Link>
                </div>
              </section>
            )}

            {/* Step 2: Contact & Screening Details */}
            {step === 2 && (
              <section className="rounded-2xl border border-[#E5E1D8] bg-white p-6 shadow-sm space-y-5">
                <div>
                  <h2 className="text-base font-serif font-bold text-[#0F1B2D]">
                    2. Contact Information & Screening Questions
                  </h2>
                  <p className="text-xs text-[#6B7280] mt-0.5">
                    Information shared directly with the hiring team upon submission.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="fullName" className="block text-xs font-semibold text-[#4A5568] mb-1">
                      Full Legal Name
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full h-10 px-3 rounded-lg border border-[#E5E1D8] text-xs text-[#0F1B2D] focus:border-[#B8955A] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold text-[#4A5568] mb-1">
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full h-10 px-3 rounded-lg border border-[#E5E1D8] text-xs text-[#0F1B2D] focus:border-[#B8955A] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-xs font-semibold text-[#4A5568] mb-1">
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full h-10 px-3 rounded-lg border border-[#E5E1D8] text-xs text-[#0F1B2D] focus:border-[#B8955A] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="portfolio" className="block text-xs font-semibold text-[#4A5568] mb-1">
                      Portfolio / GitHub URL
                    </label>
                    <input
                      id="portfolio"
                      name="portfolio"
                      type="url"
                      value={formData.portfolio}
                      onChange={handleInputChange}
                      className="w-full h-10 px-3 rounded-lg border border-[#E5E1D8] text-xs text-[#0F1B2D] focus:border-[#B8955A] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-3 pt-3 border-t border-[#F0EBE0]">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">
                    Screening Questions
                  </h3>
                  <div>
                    <label htmlFor="coverNote" className="block text-xs font-semibold text-[#4A5568] mb-1">
                      Why do you want to join {job.company?.name || job.company}?
                    </label>
                    <textarea
                      id="coverNote"
                      name="coverNote"
                      rows={3}
                      value={formData.coverNote}
                      onChange={handleInputChange}
                      className="w-full p-3 rounded-lg border border-[#E5E1D8] text-xs text-[#0F1B2D] focus:border-[#B8955A] focus:outline-none"
                    />
                  </div>
                </div>
              </section>
            )}

            {/* Step 3: Preferences & Disclosures */}
            {step === 3 && (
              <section className="rounded-2xl border border-[#E5E1D8] bg-white p-6 shadow-sm space-y-5">
                <div>
                  <h2 className="text-base font-serif font-bold text-[#0F1B2D]">
                    3. Compensation & Availability
                  </h2>
                  <p className="text-xs text-[#6B7280] mt-0.5">
                    Align expectations early to streamline the founder review process.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="salaryExpectation" className="block text-xs font-semibold text-[#4A5568] mb-1">
                      Annual Salary Expectation (CTC)
                    </label>
                    <input
                      id="salaryExpectation"
                      name="salaryExpectation"
                      type="text"
                      value={formData.salaryExpectation}
                      onChange={handleInputChange}
                      className="w-full h-10 px-3 rounded-lg border border-[#E5E1D8] text-xs text-[#0F1B2D] focus:border-[#B8955A] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="noticePeriod" className="block text-xs font-semibold text-[#4A5568] mb-1">
                      Notice Period
                    </label>
                    <select
                      id="noticePeriod"
                      name="noticePeriod"
                      value={formData.noticePeriod}
                      onChange={handleInputChange}
                      className="w-full h-10 px-3 rounded-lg border border-[#E5E1D8] text-xs text-[#0F1B2D] bg-white focus:border-[#B8955A] focus:outline-none"
                    >
                      <option value="Immediate">Immediate (0–15 days)</option>
                      <option value="30 days">30 days</option>
                      <option value="60 days">60 days</option>
                      <option value="90 days">90 days</option>
                    </select>
                  </div>
                </div>

                <SafetyStrip />
              </section>
            )}

            {/* Step 4: Final Review */}
            {step === 4 && (
              <section className="rounded-2xl border border-[#E5E1D8] bg-white p-6 shadow-sm space-y-5">
                <div>
                  <h2 className="text-base font-serif font-bold text-[#0F1B2D]">
                    4. Review Your Application
                  </h2>
                  <p className="text-xs text-[#6B7280] mt-0.5">
                    Verify all information before final submission.
                  </p>
                </div>

                <div className="rounded-xl border border-[#E5E1D8] bg-[#FAF8F4] p-4 text-xs space-y-3">
                  <div className="flex justify-between border-b border-[#E5E1D8] pb-2">
                    <span className="text-[#6B7280]">Role & Company:</span>
                    <strong className="text-[#0F1B2D]">{job.title} at {job.company?.name || job.company}</strong>
                  </div>
                  <div className="flex justify-between border-b border-[#E5E1D8] pb-2">
                    <span className="text-[#6B7280]">Selected Resume:</span>
                    <strong className="text-[#0F1B2D]">{selectedResume.name}</strong>
                  </div>
                  <div className="flex justify-between border-b border-[#E5E1D8] pb-2">
                    <span className="text-[#6B7280]">Applicant:</span>
                    <span className="text-[#0F1B2D]">{formData.fullName} ({formData.email})</span>
                  </div>
                  <div className="flex justify-between border-b border-[#E5E1D8] pb-2">
                    <span className="text-[#6B7280]">Expected CTC:</span>
                    <span className="text-[#0F1B2D]">{formData.salaryExpectation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B7280]">Availability:</span>
                    <span className="text-[#0F1B2D]">{formData.noticePeriod}</span>
                  </div>
                </div>

                <p className="text-xs text-[#6B7280] leading-relaxed">
                  By clicking "Submit Application", you confirm that the information provided is accurate and grant the employer permission to review your platform profile and resume.
                </p>
              </section>
            )}

            {/* Stepper Controls */}
            <div className="flex items-center justify-between pt-2">
              {step > 1 ? (
                <JobBtn secondary onClick={handleBack} small className="flex items-center gap-1.5">
                  <ArrowLeft size={14} /> Back
                </JobBtn>
              ) : (
                <div />
              )}

              {step < 4 ? (
                <JobBtn primary onClick={handleNext} small className="flex items-center gap-1.5">
                  Continue <ArrowRight size={14} />
                </JobBtn>
              ) : (
                <JobBtn
                  type="submit"
                  primary
                  disabled={isSubmitting}
                  className="px-6 min-h-[42px]"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </JobBtn>
              )}
            </div>
          </form>
        )}
      </div>
    </JobSeekerShell>
  );
}
