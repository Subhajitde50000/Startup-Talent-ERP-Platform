'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ShieldCheck,
  Scale,
  Brain,
  AlertCircle,
  Clock,
  ArrowRight,
  CheckCircle2,
  ListFilter,
} from 'lucide-react';
import { AdminShell } from '@/components';
import {
  Card,
  Btn,
  TabBar,
  ResponsiveTable,
  toast,
} from '@/components/admin-ui';
import {
  initialAiReviews,
  initialAiMetrics,
  initialAiModels,
} from './ai-quality-data';

export default function AdminAiQualityPage() {
  const [activeTab, setActiveTab] = useState('queue');
  const [reviews, setReviews] = useState(initialAiReviews);
  const [models, setModels] = useState(initialAiModels);

  const tabs = [
    { key: 'queue', label: 'Human Review Queue', count: reviews.length },
    { key: 'monitoring', label: 'Bias & Drift Monitoring' },
    { key: 'models', label: 'Model & Prompt Registry', count: models.length },
  ];

  return (
    <AdminShell active="AI Quality & Review">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-[#E5E1D8] pb-5">
        <div>
          <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#0F1B2D]">
            AI Quality, Bias Audits & Human Oversight
          </h1>
          <p className="text-xs text-[#4A5568] mt-1">
            Blinded human review of contested AI interview scores, rubric validation, and anti-hallucination audits.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Btn icon={ShieldCheck} onClick={() => toast('Triggering platform-wide bias & drift test suite')}>
            Run Bias Test Suite
          </Btn>
        </div>
      </div>

      {/* Summary KPI Strip */}
      <div className="grid gap-3 sm:grid-cols-4 mb-6">
        <div className="p-4 rounded-xl border border-[#E5E1D8] bg-white shadow-xs">
          <span className="text-[11px] text-[#4A5568] block">Reviews Waiting</span>
          <span className="text-xl font-serif font-bold text-[#0F1B2D]">{initialAiMetrics.reviewsWaiting} cases</span>
          <p className="text-[11px] text-[#A0A7B4] mt-0.5">Disputed candidate & founder scores</p>
        </div>
        <div className="p-4 rounded-xl border border-[#E5E1D8] bg-white shadow-xs">
          <span className="text-[11px] text-[#4A5568] block">Median Turnaround Time</span>
          <span className="text-xl font-serif font-bold text-[#0F1B2D]">{initialAiMetrics.medianTimeToReview}</span>
          <p className="text-[11px] text-[#286749] mt-0.5">SLA target: 5 business days</p>
        </div>
        <div className="p-4 rounded-xl border border-[#E5E1D8] bg-white shadow-xs">
          <span className="text-[11px] text-[#4A5568] block">30d Overturn Rate</span>
          <span className="text-xl font-serif font-bold text-[#0F1B2D]">{initialAiMetrics.overturnRate30d}</span>
          <p className="text-[11px] text-[#A0A7B4] mt-0.5">Healthy calibration range: 10-20%</p>
        </div>
        <div className="p-4 rounded-xl border border-[#E5E1D8] bg-white shadow-xs">
          <span className="text-[11px] text-[#4A5568] block">Open Safety Incidents</span>
          <span className="text-xl font-serif font-bold text-[#286749]">{initialAiMetrics.openIncidents}</span>
          <p className="text-[11px] text-[#286749] mt-0.5">Zero active model outages</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <TabBar tabs={tabs} active={activeTab} onChange={setActiveTab} />
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Tab 1: Review Queue                                                */}
      {/* ------------------------------------------------------------------ */}
      {activeTab === 'queue' && (
        <Card title="Appeals & Disputed Score Review Queue (Blinded)" titleIcon={Brain}>
          <ResponsiveTable>
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF8F4] text-[#4A5568] border-b border-[#E5E1D8]">
                <tr>
                  <th className="py-3 px-4 font-medium">Review ID & Feature</th>
                  <th className="py-3 px-4 font-medium">Category / Evaluation</th>
                  <th className="py-3 px-4 font-medium">Source</th>
                  <th className="py-3 px-4 font-medium">Disputed Dimension</th>
                  <th className="py-3 px-4 font-medium">AI Score</th>
                  <th className="py-3 px-4 font-medium">SLA Deadline</th>
                  <th className="py-3 px-4 font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E1D8]">
                {reviews.map((rev) => (
                  <tr key={rev.id} className="hover:bg-[#FAF8F4]/50">
                    <td className="py-3 px-4 font-medium text-[#0F1B2D]">
                      <div>{rev.feature}</div>
                      <span className="font-mono text-[11px] text-[#A0A7B4]">{rev.id}</span>
                    </td>
                    <td className="py-3 px-4 text-[#0F1B2D]">{rev.category}</td>
                    <td className="py-3 px-4 text-[#4A5568]">{rev.source}</td>
                    <td className="py-3 px-4 text-[#4A5568] max-w-xs">{rev.disputedDimension}</td>
                    <td className="py-3 px-4">
                      <span className="font-mono font-bold text-[#0F1B2D] px-2 py-0.5 rounded bg-[#FAF8F4] border border-[#E5E1D8]">
                        {rev.aiScore}/100
                      </span>
                    </td>
                    <td className="py-3 px-4 text-[#B8955A] font-medium">{rev.slaDeadline}</td>
                    <td className="py-3 px-4">
                      <Link
                        href={`/admin/ai-quality/reviews/${rev.id}`}
                        className="text-[#B8955A] hover:underline font-medium inline-flex items-center gap-1"
                      >
                        <span>Start Blind Review</span>
                        <ArrowRight size={12} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </ResponsiveTable>
        </Card>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* Tab 2: Monitoring                                                  */}
      {/* ------------------------------------------------------------------ */}
      {activeTab === 'monitoring' && (
        <Card title="Demographic Parity & Bias Test Matrix" titleIcon={Scale}>
          <div className="space-y-4 text-xs">
            <p className="text-[#4A5568] leading-relaxed">
              Automated adversarial testing across counterfactual candidate profiles (permuting names, colleges, and regional origins while keeping technical answers identical):
            </p>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="p-4 rounded-xl border border-[#E5E1D8] bg-[#FAF8F4]">
                <span className="text-[11px] text-[#4A5568] block mb-1">Gender Parity Score Delta</span>
                <span className="text-xl font-serif font-bold text-[#286749]">0.4%</span>
                <p className="text-[11px] text-[#A0A7B4] mt-1">Within permissible ±2.0% band</p>
              </div>
              <div className="p-4 rounded-xl border border-[#E5E1D8] bg-[#FAF8F4]">
                <span className="text-[11px] text-[#4A5568] block mb-1">Tier-1 vs Tier-3 College Parity</span>
                <span className="text-xl font-serif font-bold text-[#286749]">1.1%</span>
                <p className="text-[11px] text-[#A0A7B4] mt-1">Answers evaluated blind to pedigree</p>
              </div>
              <div className="p-4 rounded-xl border border-[#E5E1D8] bg-[#FAF8F4]">
                <span className="text-[11px] text-[#4A5568] block mb-1">Non-Native Accent Transcription</span>
                <span className="text-xl font-serif font-bold text-[#286749]">98.7% Accuracy</span>
                <p className="text-[11px] text-[#A0A7B4] mt-1">Indian regional accents verified</p>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* Tab 3: Model Registry                                              */}
      {/* ------------------------------------------------------------------ */}
      {activeTab === 'models' && (
        <Card title="Production AI Model Deployment Registry" titleIcon={Brain}>
          <ResponsiveTable>
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF8F4] text-[#4A5568] border-b border-[#E5E1D8]">
                <tr>
                  <th className="py-3 px-4 font-medium">Model Identifier</th>
                  <th className="py-3 px-4 font-medium">Feature Surface</th>
                  <th className="py-3 px-4 font-medium">Hosting & Provider</th>
                  <th className="py-3 px-4 font-medium">Last Audited</th>
                  <th className="py-3 px-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E1D8]">
                {models.map((m) => (
                  <tr key={m.model} className="hover:bg-[#FAF8F4]/50">
                    <td className="py-3 px-4 font-mono font-bold text-[#0F1B2D]">{m.model}</td>
                    <td className="py-3 px-4 text-[#0F1B2D]">{m.surface}</td>
                    <td className="py-3 px-4 text-[#4A5568]">{m.provider}</td>
                    <td className="py-3 px-4 text-[#4A5568]">{m.lastAudited}</td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1 text-[#286749] font-medium">
                        <CheckCircle2 size={13} />
                        {m.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </ResponsiveTable>
        </Card>
      )}
    </AdminShell>
  );
}
