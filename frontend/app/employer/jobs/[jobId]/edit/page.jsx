'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  ChevronLeft,
  CheckCircle2,
  Briefcase,
  Save,
  AlertCircle,
} from 'lucide-react';
import { EmployerShell, EmployerBtn, EmployerCard } from '@/components';
import { jobs as allJobs } from '../../../employer-data';

export default function EditJobPage() {
  const params = useParams();
  const router = useRouter();
  const rawId = params?.jobId;
  const job = allJobs.find((j) => j.id === rawId) || allJobs[0];

  const [formData, setFormData] = useState({
    title: job.title,
    department: job.dept || 'Engineering',
    location: job.loc || 'Bengaluru',
    mode: job.mode || 'Hybrid',
    salary: job.salary || '₹22L – ₹28L',
    status: job.status || 'Active',
    description:
      'Leading architecture and team execution for multi-brand design systems, token workflows, and cross-functional engineering handoffs.',
  });
  const [toastMsg, setToastMsg] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setToastMsg('Job changes saved successfully!');
      setTimeout(() => {
        router.push(`/employer/jobs/${job.id}`);
      }, 1000);
    }, 600);
  };

  return (
    <EmployerShell activeNav="Hiring">
      <div className="mx-auto max-w-[1080px] space-y-6 pb-10 min-w-0">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[#6B7280]">
          <Link
            href={`/employer/jobs/${job.id}`}
            className="flex items-center gap-1 hover:text-[#0F1B2D]"
          >
            <ChevronLeft size={14} /> Back to Pipeline
          </Link>
          <span>/</span>
          <span className="text-[#0F1B2D] font-medium">Edit: {job.title}</span>
        </nav>

        {/* Header */}
        <header className="rounded-2xl border border-[#E5E1D8] bg-white p-6 shadow-xs">
          <h1 className="text-xl md:text-2xl font-serif font-bold text-[#0F1B2D]">
            Edit Job Opening
          </h1>
          <p className="text-xs md:text-sm text-[#6B7280] mt-1">
            Update role parameters, compensation limits, or pause new applications.
          </p>
        </header>

        {toastMsg && (
          <div className="rounded-xl border border-[#CDE5D7] bg-[#E7F3EC] p-3 text-xs text-[#286749] flex items-center justify-between">
            <span className="flex items-center gap-2">
              <CheckCircle2 size={16} /> {toastMsg}
            </span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          <section className="rounded-2xl border border-[#E5E1D8] bg-white p-6 shadow-xs space-y-4">
            <h2 className="text-base font-serif font-bold text-[#0F1B2D]">Role Settings</h2>

            <div className="space-y-4 text-xs">
              <div>
                <label htmlFor="title" className="block font-semibold text-[#4A5568] mb-1.5">
                  Job Title
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
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
                  <input
                    id="department"
                    name="department"
                    type="text"
                    value={formData.department}
                    onChange={handleChange}
                    className="w-full h-10 px-3 rounded-xl border border-[#E5E1D8] text-xs text-[#0F1B2D] focus:border-[#B8955A] focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="status" className="block font-semibold text-[#4A5568] mb-1.5">
                    Job Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full h-10 px-3 rounded-xl border border-[#E5E1D8] bg-white text-xs text-[#0F1B2D] focus:border-[#B8955A] focus:outline-none"
                  >
                    <option value="Active">Active (Accepting Applications)</option>
                    <option value="Paused">Paused (Pipeline Review Only)</option>
                    <option value="Closed">Closed (Archived)</option>
                  </select>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="location" className="block font-semibold text-[#4A5568] mb-1.5">
                    Location
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
                  <label htmlFor="salary" className="block font-semibold text-[#4A5568] mb-1.5">
                    Salary Band
                  </label>
                  <input
                    id="salary"
                    name="salary"
                    type="text"
                    value={formData.salary}
                    onChange={handleChange}
                    className="w-full h-10 px-3 rounded-xl border border-[#E5E1D8] text-xs text-[#0F1B2D] focus:border-[#B8955A] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="description" className="block font-semibold text-[#4A5568] mb-1.5">
                  Job Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full p-3 rounded-xl border border-[#E5E1D8] text-xs text-[#0F1B2D] focus:border-[#B8955A] focus:outline-none leading-relaxed"
                />
              </div>
            </div>
          </section>

          <div className="flex items-center justify-end gap-3 pt-2">
            <Link href={`/employer/jobs/${job.id}`}>
              <EmployerBtn secondary small>
                Cancel
              </EmployerBtn>
            </Link>
            <EmployerBtn
              type="submit"
              primary
              disabled={isSaving}
              className="px-6 min-h-[42px] flex items-center gap-1.5"
            >
              <Save size={14} />
              {isSaving ? 'Saving Changes...' : 'Save Job Opening'}
            </EmployerBtn>
          </div>
        </form>
      </div>
    </EmployerShell>
  );
}
