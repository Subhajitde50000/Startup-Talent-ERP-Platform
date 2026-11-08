'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Bell,
  Sparkles,
  Settings,
  Sliders,
  CheckCircle2,
  Trash2,
  Pause,
  Play,
  ArrowRight,
  ExternalLink,
  Info,
} from 'lucide-react';
import { JobSeekerShell } from '@/components';
import {
  JobBtn,
  JobCard,
  defaultUser,
} from '@/components/jobseeker-ui';
import { alerts, jobs } from '../jobseeker-data';

export default function AlertsPage() {
  const [tab, setTab] = useState('Recommended');
  const [alertList, setAlertList] = useState(alerts);
  const [recommendationsActive, setRecommendationsActive] = useState(true);

  const togglePauseAlert = (id) => {
    setAlertList((prev) =>
      prev.map((a) => (a.id === id ? { ...a, paused: !a.paused } : a))
    );
  };

  const deleteAlert = (id) => {
    setAlertList((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <JobSeekerShell active="Jobs">
      <div className="space-y-6 max-w-5xl">
        {/* Header */}
        <div className="rounded-xl border border-[#E5E1D8] bg-[#FAF8F4] p-4 text-left flex items-start gap-3">
          <Info size={18} className="text-[#806236] shrink-0 mt-0.5" />
          <p className="text-xs text-[#4A5568] leading-relaxed">
            Recommendations and alerts are generated using your target roles, skills, and saved searches. You retain full control over frequencies and notification channels.
          </p>
        </div>

        {/* Tab Navigation with horizontal scroll on mobile to prevent blowout */}
        <div className="border-b border-[#E5E1D8] overflow-x-auto min-w-0">
          <div className="flex gap-2 pb-1 min-w-max">
            {['Recommended', 'Saved Searches', 'Alerts Feed', 'Preferences'].map((t) => {
              const active = tab === t;
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTab(t)}
                  className={`px-4 py-2.5 text-xs font-semibold whitespace-nowrap border-b-2 transition-colors ${
                    active
                      ? 'border-[#B8955A] text-[#0F1B2D]'
                      : 'border-transparent text-[#6B7280] hover:text-[#0F1B2D]'
                  }`}
                >
                  {t} {t === 'Saved Searches' && `(${alertList.length})`}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab 1: Recommended */}
        {tab === 'Recommended' && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-serif font-bold text-[#0F1B2D]">
                  Roles Picked For You
                </h2>
                <p className="text-xs text-[#6B7280]">
                  Scored based on your 6+ yrs UX/Product Design profile and remote preference.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setRecommendationsActive(!recommendationsActive)}
                  className="text-xs text-[#9A7A45] hover:underline font-medium"
                >
                  {recommendationsActive ? 'Pause Recommendations' : 'Resume Recommendations'}
                </button>
              </div>
            </div>

            {recommendationsActive ? (
              <div className="space-y-4">
                {jobs.slice(0, 4).map((j) => (
                  <JobCard key={j.id} job={j} user={defaultUser} />
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-[#E5E1D8] bg-white p-8 text-center text-xs text-[#6B7280]">
                Recommendations are currently paused. You will only receive results for your explicitly saved searches.
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Saved Searches */}
        {tab === 'Saved Searches' && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-serif font-bold text-[#0F1B2D]">
                  Active Search Alerts ({alertList.length})
                </h2>
                <p className="text-xs text-[#6B7280]">
                  Receive notifications whenever new startup roles matching these criteria are posted.
                </p>
              </div>
              <Link href="/jobseeker/jobs">
                <JobBtn primary small>
                  + New Search Alert
                </JobBtn>
              </Link>
            </div>

            {alertList.length === 0 ? (
              <div className="rounded-xl border border-[#E5E1D8] bg-white p-8 text-center text-xs text-[#6B7280]">
                You have no active search alerts. Search for roles and click "Save search" to create one.
              </div>
            ) : (
              <div className="space-y-3">
                {alertList.map((a) => (
                  <div
                    key={a.id}
                    className="rounded-xl border border-[#E5E1D8] bg-white p-5 shadow-sm space-y-3"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-semibold text-[#0F1B2D]">{a.title}</h3>
                          {a.paused ? (
                            <span className="rounded-full bg-[#F3F4F6] px-2 py-0.5 text-xs text-[#6B7280]">
                              Paused
                            </span>
                          ) : (
                            <span className="rounded-full bg-[#E7F3EC] px-2 py-0.5 text-xs text-[#286749]">
                              Active
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#4A5568] mt-1">
                          Criteria:{' '}
                          {Array.isArray(a.criteria)
                            ? a.criteria.join(' · ')
                            : a.criteria || 'Product Design, Remote, ₹20L+'}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <Link href="/jobseeker/jobs">
                          <JobBtn secondary small>
                            View Results <ArrowRight size={12} />
                          </JobBtn>
                        </Link>
                        <button
                          type="button"
                          onClick={() => togglePauseAlert(a.id)}
                          className="p-2 rounded-lg border border-[#E5E1D8] text-xs text-[#4A5568] hover:bg-[#FAF8F4]"
                          title={a.paused ? 'Resume' : 'Pause'}
                          aria-label={a.paused ? 'Resume' : 'Pause'}
                        >
                          {a.paused ? <Play size={14} /> : <Pause size={14} />}
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteAlert(a.id)}
                          className="p-2 rounded-lg text-[#A0A7B4] hover:text-[#B42318] hover:bg-[#FCE8E6]"
                          title="Delete alert"
                          aria-label="Delete alert"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-[#6B7280] pt-2 border-t border-[#F0EBE0]">
                      <span>Channel: {a.channel || 'Email & In-App'}</span>
                      <span>·</span>
                      <span>Frequency: {a.frequency || 'Daily Digest'}</span>
                      <span>·</span>
                      <span>Last run: {a.lastRun || 'Today at 9:00 AM'}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Alerts Feed */}
        {tab === 'Alerts Feed' && (
          <div className="space-y-3">
            <h2 className="text-base font-serif font-bold text-[#0F1B2D]">Recent Notifications</h2>
            {[
              {
                title: '3 new jobs match "Senior Product Designer"',
                time: '2 hours ago',
                desc: 'Apex Labs, Fintech Corp, and CloudScale posted roles matching your preferences.',
              },
              {
                title: 'Application viewed by Founder at NextGen Health',
                time: 'Yesterday',
                desc: 'Your application for Lead UX Designer was opened and reviewed.',
              },
              {
                title: 'Interview confirmed: Technical Discussion',
                time: '2 days ago',
                desc: 'Scheduled with Acme Labs for Friday at 3:00 PM IST.',
              },
            ].map((feed, i) => (
              <div
                key={i}
                className="rounded-xl border border-[#E5E1D8] bg-white p-4 shadow-sm flex items-start justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#B8955A]" />
                    <h3 className="text-xs font-semibold text-[#0F1B2D]">{feed.title}</h3>
                  </div>
                  <p className="text-xs text-[#4A5568] pl-4">{feed.desc}</p>
                </div>
                <span className="text-xs text-[#A0A7B4] shrink-0">{feed.time}</span>
              </div>
            ))}
          </div>
        )}

        {/* Tab 4: Preferences */}
        {tab === 'Preferences' && (
          <div className="rounded-xl border border-[#E5E1D8] bg-white p-6 shadow-sm space-y-5">
            <h2 className="text-base font-serif font-bold text-[#0F1B2D]">
              Job Alert Delivery Preferences
            </h2>

            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-[#F0EBE0]">
                <div>
                  <strong className="block text-[#0F1B2D]">Instant notifications</strong>
                  <span className="text-[#6B7280]">Get immediate emails when high-match roles appear</span>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 rounded border-[#E5E1D8] text-[#B8955A] focus:ring-[#B8955A]"
                />
              </div>

              <div className="flex items-center justify-between pb-3 border-b border-[#F0EBE0]">
                <div>
                  <strong className="block text-[#0F1B2D]">Weekly career digest</strong>
                  <span className="text-[#6B7280]">Summary of top verified startups and hiring trends</span>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 rounded border-[#E5E1D8] text-[#B8955A] focus:ring-[#B8955A]"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <strong className="block text-[#0F1B2D]">SMS & WhatsApp reminders</strong>
                  <span className="text-[#6B7280]">Urgent updates about scheduled interview sessions only</span>
                </div>
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-[#E5E1D8] text-[#B8955A] focus:ring-[#B8955A]"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </JobSeekerShell>
  );
}
