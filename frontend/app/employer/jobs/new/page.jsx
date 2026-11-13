'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ChevronLeft,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Briefcase,
  DollarSign,
  Building,
  ArrowRight,
  Shield,
} from 'lucide-react';
import { EmployerShell, EmployerBtn, EmployerCard } from '@/components';

export default function NewJobPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    department: 'Design & UX',
    location: 'Bengaluru',
    mode: 'Hybrid',
    jobType: 'Full-time',
    salaryMin: '₹22,00,000',
    salaryMax: '₹30,00,000',
    experienceYears: '5+ years',
    description: '',
    requirements: '',
    fairHiringConfirmed: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Please enter a job title');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setToastMsg('Job post published successfully!');
      setTimeout(() => {
        router.push('/employer/hiring');
      }, 1000);
    }, 800);
  };

  return (
    <EmployerShell activeNav="Hiring">
      <div className="mx-auto max-w-[1080px] space-y-6 pb-10 min-w-0">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[#6B7280]">
          <Link
            href="/employer/hiring"
            className="flex items-center gap-1 hover:text-[#0F1B2D]"
          >
            <ChevronLeft size={14} /> Back to Hiring
          </Link>
          <span>/</span>
          <span className="text-[#0F1B2D] font-medium">Create New Job</span>
        </nav>

        {/* Header */}
        <header className="rounded-2xl border border-[#E5E1D8] bg-white p-6 shadow-xs">
          <h1 className="text-xl md:text-2xl font-serif font-bold text-[#0F1B2D]">
            Create a New Job Opening
          </h1>
          <p className="text-xs md:text-sm text-[#6B7280] mt-1">
            Post verified roles to discover pre-vetted startup talent with standardized transparent compensation.
          </p>
        </header>

        {toastMsg && (
          <div className="rounded-xl border border-[#CDE5D7] bg-[#E7F3EC] p-3 text-xs text-[#286749] flex items-center justify-between">
            <span className="flex items-center gap-2">
              <CheckCircle2 size={16} /> {toastMsg}
            </span>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <section className="rounded-2xl border border-[#E5E1D8] bg-white p-6 shadow-xs space-y-5">
            <h2 className="text-base font-serif font-bold text-[#0F1B2D]">
              Role Details & Categorization
            </h2>

            <div className="space-y-4 text-xs">
              <div>
                <label htmlFor="title" className="block font-semibold text-[#4A5568] mb-1.5">
                  Job Title *
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  required
                  placeholder="E.g. Senior Product Designer, Lead Frontend Architect..."
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full h-10 px-3 rounded-xl border border-[#E5E1D8] text-xs text-[#0F1B2D] focus:border-[#B8955A] focus:outline-none"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="department" className="block font-semibold text-[#4A5568] mb-1.5">
                    Department
                  </label>
                  <select
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="w-full h-10 px-3 rounded-xl border border-[#E5E1D8] bg-white text-xs text-[#0F1B2D] focus:border-[#B8955A] focus:outline-none"
                  >
                    <option value="Design & UX">Design & UX</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Product Management">Product Management</option>
                    <option value="Growth & Marketing">Growth & Marketing</option>
                    <option value="Operations">Operations</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="jobType" className="block font-semibold text-[#4A5568] mb-1.5">
                    Employment Type
                  </label>
                  <select
                    id="jobType"
                    name="jobType"
                    value={formData.jobType}
                    onChange={handleChange}
                    className="w-full h-10 px-3 rounded-xl border border-[#E5E1D8] bg-white text-xs text-[#0F1B2D] focus:border-[#B8955A] focus:outline-none"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Contract">Contract (6+ months)</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="location" className="block font-semibold text-[#4A5568] mb-1.5">
                    Office Location
                  </label>
                  <input
                    id="location"
                    name="location"
                    type="text"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full h-10 px-3 rounded-xl border border-[#E5E1D8] text-xs text-[#0F1B2D] focus:border-[#B8955A] focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="mode" className="block font-semibold text-[#4A5568] mb-1.5">
                    Work Arrangement
                  </label>
                  <select
                    id="mode"
                    name="mode"
                    value={formData.mode}
                    onChange={handleChange}
                    className="w-full h-10 px-3 rounded-xl border border-[#E5E1D8] bg-white text-xs text-[#0F1B2D] focus:border-[#B8955A] focus:outline-none"
                  >
                    <option value="Hybrid">Hybrid (2–3 days in office)</option>
                    <option value="Remote">100% Remote</option>
                    <option value="On-site">On-site / Office Only</option>
                  </select>
                </div>
              </div>
            </div>
          </section>

          {/* Compensation Section */}
          <section className="rounded-2xl border border-[#E5E1D8] bg-white p-6 shadow-xs space-y-4">
            <h2 className="text-base font-serif font-bold text-[#0F1B2D]">
              Transparent Compensation
            </h2>
            <p className="text-xs text-[#6B7280]">
              Roles with transparent compensation bands attract up to 3x higher quality candidate applications.
            </p>

            <div className="grid gap-4 sm:grid-cols-2 text-xs">
              <div>
                <label htmlFor="salaryMin" className="block font-semibold text-[#4A5568] mb-1.5">
                  Minimum Annual Base CTC
                </label>
                <input
                  id="salaryMin"
                  name="salaryMin"
                  type="text"
                  value={formData.salaryMin}
                  onChange={handleChange}
                  className="w-full h-10 px-3 rounded-xl border border-[#E5E1D8] text-xs text-[#0F1B2D] focus:border-[#B8955A] focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="salaryMax" className="block font-semibold text-[#4A5568] mb-1.5">
                  Maximum Annual Base CTC
                </label>
                <input
                  id="salaryMax"
                  name="salaryMax"
                  type="text"
                  value={formData.salaryMax}
                  onChange={handleChange}
                  className="w-full h-10 px-3 rounded-xl border border-[#E5E1D8] text-xs text-[#0F1B2D] focus:border-[#B8955A] focus:outline-none"
                />
              </div>
            </div>
          </section>

          {/* Description & Responsibilities */}
          <section className="rounded-2xl border border-[#E5E1D8] bg-white p-6 shadow-xs space-y-4">
            <h2 className="text-base font-serif font-bold text-[#0F1B2D]">
              Job Scope & Requirements
            </h2>

            <div className="space-y-4 text-xs">
              <div>
                <label htmlFor="description" className="block font-semibold text-[#4A5568] mb-1.5">
                  Role Overview & Responsibilities
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  placeholder="Outline the core responsibilities, day-to-day impact, and mission..."
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full p-3 rounded-xl border border-[#E5E1D8] text-xs text-[#0F1B2D] focus:border-[#B8955A] focus:outline-none leading-relaxed"
                />
              </div>

              <div>
                <label htmlFor="requirements" className="block font-semibold text-[#4A5568] mb-1.5">
                  Must-have Skills & Qualifications
                </label>
                <textarea
                  id="requirements"
                  name="requirements"
                  rows={3}
                  placeholder="E.g. 5+ years experience, Figma tokens, React component architectures..."
                  value={formData.requirements}
                  onChange={handleChange}
                  className="w-full p-3 rounded-xl border border-[#E5E1D8] text-xs text-[#0F1B2D] focus:border-[#B8955A] focus:outline-none leading-relaxed"
                />
              </div>
            </div>
          </section>

          {/* Compliance Check */}
          <div className="rounded-2xl border border-[#E5E1D8] bg-[#FAF8F4] p-4 text-xs flex items-start gap-2.5">
            <input
              id="fairHiringConfirmed"
              name="fairHiringConfirmed"
              type="checkbox"
              checked={formData.fairHiringConfirmed}
              onChange={handleChange}
              className="mt-0.5 h-4 w-4 rounded border-[#E5E1D8] text-[#B8955A] focus:ring-[#B8955A]"
            />
            <label htmlFor="fairHiringConfirmed" className="text-[#4A5568] leading-relaxed cursor-pointer">
              I confirm that this job opening adheres to platform fair hiring policies, does not collect application fees, and offers legitimate full-time or contract terms.
            </label>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <Link href="/employer/hiring">
              <EmployerBtn secondary small>
                Cancel
              </EmployerBtn>
            </Link>
            <EmployerBtn
              type="submit"
              primary
              disabled={isSubmitting}
              className="px-6 min-h-[42px]"
            >
              {isSubmitting ? 'Publishing Post...' : 'Publish Job Post'}
            </EmployerBtn>
          </div>
        </form>
      </div>
    </EmployerShell>
  );
}
