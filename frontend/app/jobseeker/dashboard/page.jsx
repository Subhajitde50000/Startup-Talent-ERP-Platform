'use client';
import { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  CalendarDays,
  Bookmark,
  Briefcase,
  CheckCircle2,
  ArrowRight,
  Eye,
  FileText,
  Clock,
  X,
} from 'lucide-react';
import { JobSeekerShell, Card, Button } from '@/components';
import {
  jobs,
  applications,
  JobseekerBadge,
  JobseekerDisclaimer,
} from '../jobseeker-data';

export default function JobSeekerDashboardPage() {
  const [saved, setSaved] = useState(['product-designer']);
  const [modal, setModal] = useState('');
  const [selectedJob, setSelectedJob] = useState(jobs[0]);

  return (
    <JobSeekerShell
      active="Dashboard"
      module="Forma Careers"
      title="Welcome back, Ananya"
      description="You have an upcoming portfolio review this week and 3 high-match roles."
      actions={
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/jobseeker/practice"
            className="inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-[#E5E1D8] bg-white px-3.5 text-xs font-semibold text-ink hover:bg-[#FAF8F4] transition"
          >
            <Sparkles size={14} className="text-[#806236]" /> Practice interview
          </Link>
          <Link
            href="/jobseeker/jobs"
            className="inline-flex min-h-10 items-center rounded-lg bg-ink px-4 text-xs font-semibold text-white hover:bg-[#1C2B42] transition"
          >
            Explore jobs
          </Link>
        </div>
      }
    >
      {({ notify }) => {
        const toggleSave = (id) => {
          setSaved((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
          );
          notify(saved.includes(id) ? 'Removed from saved roles.' : 'Saved to your bookmarks.');
        };

        return (
          <>
            {/* Top Metrics Strip */}
            <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
              {[
                ['Active applications', '4', '1 interview scheduled'],
                ['Upcoming interviews', '1', 'Thu, Nov 12 · 11:00 AM'],
                ['Saved job roles', `${saved.length}`, '2 new postings today'],
                ['Profile views', '42', '+18% this week'],
              ].map(([label, val, hint]) => (
                <div key={label} className="rounded-xl border border-[#E5E1D8] bg-white p-5 shadow-sm">
                  <span className="text-xs font-medium text-[#4A5568]">{label}</span>
                  <span className="serif mt-1 block text-3xl font-semibold text-ink">{val}</span>
                  <span className="text-xs text-[#286749]">{hint}</span>
                </div>
              ))}
            </div>

            {/* Main 2-Column Grid */}
            <div className="grid items-start gap-6 xl:grid-cols-3">
              <div className="space-y-6 xl:col-span-2 min-w-0">
                {/* Upcoming Interview Urgent Card */}
                <Card
                  title="Upcoming interview this week"
                  action={
                    <span className="rounded-full bg-[#E7F3EC] px-2.5 py-0.5 text-xs font-semibold text-[#286749]">
                      Confirmed
                    </span>
                  }
                >
                  <div className="rounded-xl bg-[#FAF8F4] p-4 border border-[#E5E1D8]">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <b className="text-sm font-bold text-ink">
                          Northstar Labs · Senior Product Designer
                        </b>
                        <p className="mt-1 text-xs text-[#4A5568]">
                          Round 2: Technical Portfolio & System Design Review
                        </p>
                        <div className="mt-2.5 flex flex-wrap items-center gap-3 text-xs text-ink">
                          <span className="flex items-center gap-1 font-semibold text-[#806236]">
                            <Clock size={14} /> Thu, Nov 12 · 11:00 AM – 12:00 PM IST
                          </span>
                          <span className="text-[#4A5568]">·</span>
                          <span className="text-[#4A5568]">Video call (Google Meet)</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <Link
                          href="/jobseeker/practice/new"
                          className="rounded-lg bg-ink px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#1C2B42]"
                        >
                          AI Mock Practice →
                        </Link>
                        <Button
                          secondary
                          onClick={() => {
                            setSelectedJob(jobs[0]);
                            setModal('prep');
                          }}
                        >
                          Prep checklist
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Recommended Jobs */}
                <Card
                  title="Recommended roles matching your skills"
                  action={
                    <Link
                      href="/jobseeker/jobs"
                      className="text-xs font-semibold text-[#9A7A45] hover:underline"
                    >
                      Browse all roles →
                    </Link>
                  }
                >
                  <div className="space-y-4">
                    {jobs.slice(0, 3).map((j) => (
                      <article
                        key={j.id}
                        className="rounded-xl border border-[#E5E1D8] p-4 transition hover:border-ink hover:shadow-sm bg-white"
                      >
                        <div className="flex items-start gap-3">
                          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#F3EBDD] text-lg font-bold text-ink">
                            {j.logo}
                          </span>
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <div>
                                <Link
                                  href={`/jobseeker/jobs/${j.id}`}
                                  className="text-sm font-semibold text-ink hover:underline"
                                >
                                  {j.title}
                                </Link>
                                <p className="text-xs text-[#4A5568]">
                                  {j.company} · {j.loc} · {j.stage}
                                </p>
                              </div>
                              <span className="rounded-full bg-[#E7F3EC] px-2.5 py-0.5 text-xs font-semibold text-[#286749]">
                                {j.match}
                              </span>
                            </div>

                            <p className="mt-2 text-xs text-[#806236] bg-[#FAF8F4] p-2 rounded-lg inline-block">
                              {j.fit}
                            </p>

                            <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-[#E5E1D8] pt-3">
                              <span className="text-xs font-semibold text-ink">
                                {j.salary} <span className="font-normal text-[#4A5568]">· Equity {j.equity}</span>
                              </span>
                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => toggleSave(j.id)}
                                  className="rounded-lg border border-[#E5E1D8] bg-white px-3 py-1.5 text-xs font-medium text-ink hover:bg-[#FAF8F4]"
                                >
                                  {saved.includes(j.id) ? 'Saved' : 'Save'}
                                </button>
                                <Link
                                  href={`/jobseeker/jobs/${j.id}/apply`}
                                  className="rounded-lg bg-ink px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#1C2B42]"
                                >
                                  Apply now
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </Card>

                {/* Applications Pipeline Snapshot */}
                <Card
                  title="Active applications"
                  action={
                    <Link
                      href="/jobseeker/applications"
                      className="text-xs font-semibold text-[#9A7A45] hover:underline"
                    >
                      View all applications →
                    </Link>
                  }
                >
                  <div className="space-y-3">
                    {applications.slice(0, 3).map((app) => (
                      <div
                        key={app.id}
                        className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-[#E5E1D8] p-3 hover:bg-[#FAF8F4] transition"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#F3EBDD] text-xs font-bold text-ink">
                            {app.logo}
                          </span>
                          <div className="min-w-0">
                            <b className="block text-xs font-semibold text-ink truncate">{app.title}</b>
                            <span className="text-xs text-[#4A5568]">{app.company} · {app.updated}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                              app.status === 'Interview'
                                ? 'bg-[#E7F3EC] text-[#286749]'
                                : app.status === 'Shortlisted'
                                ? 'bg-[#F3EBDD] text-[#806236]'
                                : 'bg-[#F3F4F6] text-[#4A5568]'
                            }`}
                          >
                            {app.status}
                          </span>
                          <Link
                            href={`/jobseeker/applications/${app.id}`}
                            className="text-xs font-semibold text-[#9A7A45] hover:underline"
                          >
                            Details →
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Right Sidebar */}
              <aside className="space-y-6 min-w-0">
                {/* Readiness Score */}
                <Card title="Candidate readiness">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="serif text-4xl font-bold text-ink">88</span>
                      <span className="text-xs text-[#4A5568]"> / 100</span>
                      <p className="mt-1 text-xs text-[#286749] font-medium">Top 15% in Product Design</p>
                    </div>
                    <span className="rounded-full bg-[#E7F3EC] p-3 text-[#286749]">
                      <Sparkles size={24} />
                    </span>
                  </div>
                  <div className="mt-4 space-y-2 text-xs border-t border-[#E5E1D8] pt-3">
                    <div className="flex justify-between">
                      <span className="text-[#4A5568]">Resume ATS Optimization</span>
                      <b className="text-ink">88%</b>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#4A5568]">Portfolio Verification</span>
                      <b className="text-[#286749]">Verified</b>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#4A5568]">Mock Interview Score</span>
                      <b className="text-ink">86%</b>
                    </div>
                  </div>
                  <Link
                    href="/jobseeker/readiness"
                    className="mt-4 inline-block text-xs font-semibold text-[#9A7A45] hover:underline"
                  >
                    View detailed rubric report →
                  </Link>
                </Card>

                {/* Primary Resume Snapshot */}
                <Card title="Primary resume">
                  <div className="flex items-start gap-3">
                    <FileText size={20} className="text-[#806236] shrink-0 mt-0.5" />
                    <div>
                      <b className="text-xs font-semibold text-ink">
                        Senior Product Designer (Primary)
                      </b>
                      <p className="text-xs text-[#4A5568]">Updated Oct 30, 2026 · ATS Score 88</p>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Link
                      href="/jobseeker/resumes/res-1"
                      className="rounded-lg border border-[#E5E1D8] bg-white px-3 py-1.5 text-xs font-semibold text-ink hover:bg-[#FAF8F4]"
                    >
                      Edit resume
                    </Link>
                    <Link
                      href="/jobseeker/resumes/res-1/ats"
                      className="rounded-lg border border-[#E5E1D8] bg-white px-3 py-1.5 text-xs font-semibold text-ink hover:bg-[#FAF8F4]"
                    >
                      Run ATS scan
                    </Link>
                  </div>
                </Card>

                {/* Practice Shortcut */}
                <Card title="AI Interview trainer">
                  <p className="text-xs text-[#4A5568] leading-relaxed">
                    Practice realistic behavioral and system design interview prompts with real-time feedback.
                  </p>
                  <Link
                    href="/jobseeker/practice/new"
                    className="mt-3 inline-block rounded-lg bg-ink px-4 py-2 text-xs font-semibold text-white hover:bg-[#1C2B42]"
                  >
                    Start 15-min practice session
                  </Link>
                </Card>
              </aside>
            </div>

            <JobseekerDisclaimer onLearnMore={() => notify('Platform guidelines opened.')} />

            {/* Preparation Modal */}
            {modal === 'prep' && (
              <div className="fixed inset-0 z-50 grid place-items-center bg-ink/50 p-4 backdrop-blur-sm">
                <section
                  role="dialog"
                  aria-modal="true"
                  className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="serif text-xl font-bold text-ink">Interview prep checklist</h2>
                    <button type="button" onClick={() => setModal('')}>
                      <X size={18} />
                    </button>
                  </div>
                  <p className="text-xs text-[#4A5568]">
                    Target: <b>Northstar Labs</b> · Senior Product Designer
                  </p>
                  <div className="mt-4 space-y-2.5 text-xs">
                    {[
                      'Review Northstar Labs product design system philosophy',
                      'Prepare 2 deep-dive case studies explaining design tradeoffs',
                      'Prepare STAR stories for cross-functional engineering conflict',
                      'Verify webcam, audio output, and Figma presentation tab',
                    ].map((item) => (
                      <label key={item} className="flex items-start gap-2.5 cursor-pointer">
                        <input type="checkbox" defaultChecked={false} className="mt-0.5 h-4 w-4 rounded accent-ink" />
                        <span className="text-ink">{item}</span>
                      </label>
                    ))}
                  </div>
                  <div className="mt-6 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setModal('')}
                      className="rounded-lg border px-3 py-2 text-xs font-medium text-[#4A5568]"
                    >
                      Close
                    </button>
                    <Link
                      href="/jobseeker/practice/new"
                      className="rounded-lg bg-ink px-4 py-2 text-xs font-semibold text-white"
                    >
                      Practice AI Mock
                    </Link>
                  </div>
                </section>
              </div>
            )}
          </>
        );
      }}
    </JobSeekerShell>
  );
}
