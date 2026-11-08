'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  EmployerShell,
  EmployerBtn,
  EmployerCard,
  StageChip,
  EmployerSafetyStrip as SafetyStrip,
} from '@/components';
import {
  analyticsKpis,
  funnelStages,
  jobsFunnel,
  speedByJob,
  sources,
} from '@/app/employer/employer-data';
import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  Filter,
  Sparkles,
  TrendingUp,
  Users,
} from 'lucide-react';

export default function EmployerAnalyticsPage() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [dateRange, setDateRange] = useState('Last 30 days');
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const tabs = ['Overview', 'Funnel', 'Speed', 'Sources', 'Offers'];

  return (
    <EmployerShell active="/employer/analytics">
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

      <div className="mx-auto max-w-[1280px] space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F1B2D]">
              Hiring Analytics & Insights
            </h1>
            <p className="text-xs sm:text-sm text-[#4A5568]">
              Data-backed visibility into funnel conversion, sourcing efficiency, and time-to-hire velocity.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={dateRange}
              onChange={(e) => {
                setDateRange(e.target.value);
                showToast(`Filter updated to: ${e.target.value}`);
              }}
              className="rounded-lg border border-[#E5E1D8] bg-white px-3 py-1.5 text-xs text-[#0F1B2D] focus:border-[#B8955A] focus:outline-none"
            >
              <option value="Last 30 days">Last 30 days</option>
              <option value="Last 90 days">Last 90 days</option>
              <option value="Year to date">Year to date</option>
              <option value="All time">All time</option>
            </select>
            <EmployerBtn
              variant="secondary"
              size="sm"
              onClick={() => showToast('Analytics CSV report downloaded.')}
            >
              <Download size={14} className="mr-1.5" /> Export Data
            </EmployerBtn>
          </div>
        </div>

        {/* KPIs - 1 col on mobile prevents 578px blowout */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {analyticsKpis.map((k, idx) => (
            <div key={idx} className="rounded-2xl border border-[#E5E1D8] bg-white p-5 shadow-sm">
              <span className="text-xs font-semibold text-[#4A5568]">{k.label}</span>
              <p className="font-serif text-2xl font-bold text-[#0F1B2D] mt-1">{k.value}</p>
              <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-700">
                <ArrowUpRight size={14} />
                <span>{k.change || '▲ 8% vs prior cycle'}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Tab Controls */}
        <div className="flex gap-2 border-b border-[#E5E1D8] pb-2 overflow-x-auto">
          {tabs.map((tab) => {
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
                {tab}
              </button>
            );
          })}
        </div>

        {/* Main Content Area */}
        <div className="min-w-0">
          {activeTab === 'Overview' && (
            <div className="grid gap-6 lg:grid-cols-12 min-w-0">
              <div className="lg:col-span-8 space-y-6 min-w-0">
                <EmployerCard title="Recruiting Pipeline Health">
                  <div className="space-y-4">
                    <p className="text-xs text-[#4A5568]">
                      Stage progression across all 4 active job openings over the past 30 days.
                    </p>
                    <div className="space-y-3">
                      {funnelStages.map((st, idx) => (
                        <div key={idx} className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="font-semibold text-[#0F1B2D]">{st.stage}</span>
                            <span className="text-[#4A5568]">{st.count} candidates ({st.pct}%)</span>
                          </div>
                          <div className="h-2.5 w-full rounded-full bg-[#E5E1D8] overflow-hidden">
                            <div
                              className="h-full rounded-full bg-[#0F1B2D]"
                              style={{ width: `${st.pct}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </EmployerCard>

                <EmployerCard title="Velocity by Position">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs min-w-[460px]">
                      <thead className="bg-[#FAF8F4] text-[#4A5568] border-b border-[#E5E1D8]">
                        <tr>
                          <th className="px-3 py-2.5 font-semibold">Role</th>
                          <th className="px-3 py-2.5 font-semibold">Total Applicants</th>
                          <th className="px-3 py-2.5 font-semibold">Avg Days to Hire</th>
                          <th className="px-3 py-2.5 font-semibold">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E5E1D8]">
                        {speedByJob.map((item, idx) => (
                          <tr key={idx} className="hover:bg-[#FAF8F4]/50">
                            <td className="px-3 py-2.5 font-semibold text-[#0F1B2D]">{item.job}</td>
                            <td className="px-3 py-2.5 text-[#4A5568]">{item.applicants}</td>
                            <td className="px-3 py-2.5 text-[#4A5568]">{item.days} days</td>
                            <td className="px-3 py-2.5">
                              <span className="inline-flex rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700">
                                On track
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </EmployerCard>
              </div>

              {/* Sidebar Insights */}
              <div className="lg:col-span-4 space-y-6 min-w-0">
                <EmployerCard title="AI Velocity Insights">
                  <div className="space-y-3 text-xs leading-relaxed">
                    <div className="rounded-xl border border-[#F3EBDD] bg-[#FAF8F4] p-3.5 text-[#806236]">
                      <div className="flex items-center gap-1.5 font-bold mb-1">
                        <Sparkles size={14} /> Fast-track Lead Designer
                      </div>
                      <p>
                        Screening-to-interview conversion is 32% above platform benchmark for design roles. Recommend locking final panel dates early.
                      </p>
                    </div>
                    <div className="rounded-xl border border-[#E5E1D8] bg-white p-3.5 text-[#4A5568]">
                      <p className="font-bold text-[#0F1B2D] mb-1">Candidate Drop-off Notice</p>
                      <p>
                        8 candidates withdrew before Round 2 due to scheduling conflicts. Enabling Google Meet sync reduced drop-off by 15%.
                      </p>
                    </div>
                  </div>
                </EmployerCard>

                <SafetyStrip />
              </div>
            </div>
          )}

          {activeTab === 'Funnel' && (
            <EmployerCard title="Stage-by-Stage Funnel Conversion">
              <div className="space-y-4">
                <p className="text-xs text-[#4A5568]">
                  Detailed breakdown of where applicants convert or drop off between application and accepted offer.
                </p>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {funnelStages.map((f, i) => (
                    <div key={i} className="rounded-xl border border-[#E5E1D8] bg-[#FAF8F4] p-4 text-center">
                      <span className="text-xs text-[#4A5568] block">{f.stage}</span>
                      <span className="font-serif text-2xl font-bold text-[#0F1B2D] block mt-1">{f.count}</span>
                      <span className="text-xs text-[#806236] font-medium mt-1 inline-block">
                        {f.pct}% Conversion
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </EmployerCard>
          )}

          {activeTab === 'Speed' && (
            <EmployerCard title="Hiring Speed & Response Latency">
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-3 text-center">
                  <div className="rounded-xl border border-[#E5E1D8] p-4">
                    <span className="text-xs text-[#4A5568]">Time to First Contact</span>
                    <p className="font-serif text-2xl font-bold text-[#0F1B2D] mt-1">1.2 Days</p>
                    <p className="text-xs text-emerald-700 mt-1">Top 10% of employers</p>
                  </div>
                  <div className="rounded-xl border border-[#E5E1D8] p-4">
                    <span className="text-xs text-[#4A5568]">Interview to Decision</span>
                    <p className="font-serif text-2xl font-bold text-[#0F1B2D] mt-1">4.5 Days</p>
                    <p className="text-xs text-[#4A5568] mt-1">Within target SLA</p>
                  </div>
                  <div className="rounded-xl border border-[#E5E1D8] p-4">
                    <span className="text-xs text-[#4A5568]">Offer to Acceptance</span>
                    <p className="font-serif text-2xl font-bold text-[#806236] mt-1">3.4 Days</p>
                    <p className="text-xs text-emerald-700 mt-1">Fast candidate commitment</p>
                  </div>
                </div>
              </div>
            </EmployerCard>
          )}

          {activeTab === 'Sources' && (
            <EmployerCard title="Applicant Acquisition Channels">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs min-w-[420px]">
                  <thead className="bg-[#FAF8F4] text-[#4A5568] border-b border-[#E5E1D8]">
                    <tr>
                      <th className="px-3 py-2.5 font-semibold">Channel</th>
                      <th className="px-3 py-2.5 font-semibold">Total Applicants</th>
                      <th className="px-3 py-2.5 font-semibold">Interview Rate</th>
                      <th className="px-3 py-2.5 font-semibold">Total Hires</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E1D8]">
                    {sources.map((s, idx) => (
                      <tr key={idx} className="hover:bg-[#FAF8F4]/50">
                        <td className="px-3 py-2.5 font-semibold text-[#0F1B2D]">{s.source}</td>
                        <td className="px-3 py-2.5 text-[#4A5568]">{s.applicants}</td>
                        <td className="px-3 py-2.5 text-[#4A5568]">{s.toInterview}</td>
                        <td className="px-3 py-2.5 font-semibold text-emerald-700">{s.toHire}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </EmployerCard>
          )}

          {activeTab === 'Offers' && (
            <EmployerCard title="Offer Outcomes & Acceptance Ratios">
              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center py-2 border-b border-[#E5E1D8]">
                  <span className="text-[#4A5568]">Total Offers Extended:</span>
                  <span className="font-bold text-[#0F1B2D]">8</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-[#E5E1D8]">
                  <span className="text-[#4A5568]">Accepted:</span>
                  <span className="font-bold text-emerald-700">7 (87.5%)</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-[#E5E1D8]">
                  <span className="text-[#4A5568]">Declined due to competing offers:</span>
                  <span className="font-bold text-amber-700">1 (12.5%)</span>
                </div>
              </div>
            </EmployerCard>
          )}
        </div>
      </div>
    </EmployerShell>
  );
}
