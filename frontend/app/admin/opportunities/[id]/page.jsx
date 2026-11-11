'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Award,
  Save,
  CheckCircle2,
  ExternalLink,
  Building,
  Calendar,
  Globe,
  Trash2,
} from 'lucide-react';
import { AdminShell } from '@/components';
import {
  Card,
  Btn,
  toast,
} from '@/components/admin-ui';
import { initialOpportunities } from '../opportunities-data';

export default function OpportunityEditorPage({ params }) {
  const router = useRouter();
  const oppId = params?.id || 'OPP-DPIIT-01';
  
  const existing = useMemo(() => {
    return (
      initialOpportunities.find((o) => o.id === oppId) || {
        id: oppId,
        name: 'New Grant Scheme',
        category: 'Government Grant',
        provider: 'Ministry / Incubator',
        grantAmount: 'Up to ₹50 Lakhs',
        stage: 'Early Stage / Prototype',
        deadline: '2026-12-31',
        verificationState: 'Government Verified',
        url: 'https://startupindia.gov.in',
        applicationsReferred: 0,
        status: 'Active',
        description: 'Non-dilutive funding assistance for verified founders.',
      }
    );
  }, [oppId]);

  // Exact matching fields
  const [name, setName] = useState(existing.name);
  const [category, setCategory] = useState(existing.category);
  const [provider, setProvider] = useState(existing.provider);
  const [grantAmount, setGrantAmount] = useState(existing.grantAmount);
  const [stage, setStage] = useState(existing.stage || 'Early Stage / Prototype');
  const [deadline, setDeadline] = useState(existing.deadline);
  const [verificationState, setVerificationState] = useState(existing.verificationState || 'Government Verified');
  const [status, setStatus] = useState(existing.status || 'Active');
  const [url, setUrl] = useState(existing.url || 'https://');
  const [description, setDescription] = useState(existing.description);

  const handleSave = (e) => {
    e.preventDefault();
    if (!name.trim() || !provider.trim() || !grantAmount.trim()) {
      toast('Please fill in all required fields (Name, Agency, Grant Amount)');
      return;
    }

    toast(`Opportunity ${existing.id} updated and published to Founder Stage toolkit`);
    setTimeout(() => {
      router.push('/admin/opportunities');
    }, 600);
  };

  return (
    <AdminShell active="Grants & Incubators">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-[#E5E1D8] pb-5">
        <div className="flex items-start gap-3">
          <Link
            href="/admin/opportunities"
            className="p-2 rounded-lg border border-[#E5E1D8] bg-white text-[#4A5568] hover:text-[#0F1B2D] transition shrink-0 mt-1"
            title="Back to Opportunities"
          >
            <ArrowLeft size={16} />
          </Link>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs font-bold text-[#B8955A]">{existing.id}</span>
              <span className="px-2 py-0.5 rounded text-[10px] bg-[#E7F3EC] text-[#286749] font-medium">
                {verificationState}
              </span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
              }`}>
                {status}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#0F1B2D]">
              Edit Grant / Program: {name}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#E5E1D8] bg-white text-xs font-medium text-[#0F1B2D] hover:bg-[#FAF8F4] transition"
          >
            <span>Visit Portal</span>
            <ExternalLink size={13} className="text-[#B8955A]" />
          </a>
          <Btn icon={Save} onClick={handleSave}>
            Publish Changes
          </Btn>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Opportunity Form (2 cols) */}
        <div className="lg:col-span-2">
          <Card title="Grant & Program Configuration" titleIcon={Award}>
            <form onSubmit={handleSave} className="space-y-4 text-xs">
              {/* Program Name */}
              <div>
                <label htmlFor="opp-name" className="block font-semibold text-[#0F1B2D] mb-1">
                  Program / Scheme Name <span className="text-rose-600">*</span>
                </label>
                <input
                  id="opp-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Startup India Seed Fund Scheme"
                  className="w-full h-9 px-3 rounded-lg border border-[#E5E1D8] bg-white text-xs text-[#0F1B2D] focus:outline-none focus:border-[#B8955A]"
                />
              </div>

              {/* Agency & Category */}
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label htmlFor="opp-prov" className="block font-semibold text-[#0F1B2D] mb-1">
                    Agency / Grantor Provider <span className="text-rose-600">*</span>
                  </label>
                  <input
                    id="opp-prov"
                    type="text"
                    required
                    value={provider}
                    onChange={(e) => setProvider(e.target.value)}
                    placeholder="e.g. DPIIT, Ministry of Commerce"
                    className="w-full h-9 px-3 rounded-lg border border-[#E5E1D8] bg-white text-xs text-[#0F1B2D] focus:outline-none focus:border-[#B8955A]"
                  />
                </div>

                <div>
                  <label htmlFor="opp-cat" className="block font-semibold text-[#0F1B2D] mb-1">
                    Category
                  </label>
                  <select
                    id="opp-cat"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full h-9 px-2.5 rounded-lg border border-[#E5E1D8] bg-white text-xs text-[#0F1B2D] focus:outline-none focus:border-[#B8955A]"
                  >
                    <option value="Government Grant">Government Grant</option>
                    <option value="Biotech & Healthtech Grant">Biotech & Healthtech Grant</option>
                    <option value="Global Accelerator">Global Accelerator</option>
                    <option value="Regional Incubator">Regional Incubator</option>
                    <option value="State Seed Fund">State Seed Fund</option>
                    <option value="Non-Dilutive Award">Non-Dilutive Award</option>
                  </select>
                </div>
              </div>

              {/* Grant Value & Eligible Stage */}
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label htmlFor="opp-amt" className="block font-semibold text-[#0F1B2D] mb-1">
                    Grant Value / Support <span className="text-rose-600">*</span>
                  </label>
                  <input
                    id="opp-amt"
                    type="text"
                    required
                    value={grantAmount}
                    onChange={(e) => setGrantAmount(e.target.value)}
                    placeholder="e.g. Up to ₹50 Lakhs"
                    className="w-full h-9 px-3 rounded-lg border border-[#E5E1D8] bg-white text-xs text-[#0F1B2D] focus:outline-none focus:border-[#B8955A]"
                  />
                </div>

                <div>
                  <label htmlFor="opp-stage" className="block font-semibold text-[#0F1B2D] mb-1">
                    Eligible Startup Stage
                  </label>
                  <input
                    id="opp-stage"
                    type="text"
                    value={stage}
                    onChange={(e) => setStage(e.target.value)}
                    placeholder="e.g. Early Stage / Prototype"
                    className="w-full h-9 px-3 rounded-lg border border-[#E5E1D8] bg-white text-xs text-[#0F1B2D] focus:outline-none focus:border-[#B8955A]"
                  />
                </div>
              </div>

              {/* Deadline & Verification Badge */}
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label htmlFor="opp-dl" className="block font-semibold text-[#0F1B2D] mb-1">
                    Application Deadline
                  </label>
                  <input
                    id="opp-dl"
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full h-9 px-3 rounded-lg border border-[#E5E1D8] bg-white text-xs text-[#0F1B2D] focus:outline-none focus:border-[#B8955A]"
                  />
                </div>

                <div>
                  <label htmlFor="opp-badge" className="block font-semibold text-[#0F1B2D] mb-1">
                    Verification Badge
                  </label>
                  <select
                    id="opp-badge"
                    value={verificationState}
                    onChange={(e) => setVerificationState(e.target.value)}
                    className="w-full h-9 px-2.5 rounded-lg border border-[#E5E1D8] bg-white text-xs text-[#0F1B2D] focus:outline-none focus:border-[#B8955A]"
                  >
                    <option value="Government Verified">Government Verified</option>
                    <option value="Partner Verified">Partner Verified</option>
                    <option value="State Government Verified">State Government Verified</option>
                    <option value="DPIIT Accredited">DPIIT Accredited</option>
                  </select>
                </div>
              </div>

              {/* Status & Portal URL */}
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label htmlFor="opp-status" className="block font-semibold text-[#0F1B2D] mb-1">
                    Program Status
                  </label>
                  <select
                    id="opp-status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full h-9 px-2.5 rounded-lg border border-[#E5E1D8] bg-white text-xs text-[#0F1B2D] focus:outline-none focus:border-[#B8955A]"
                  >
                    <option value="Active">Active (Accepting Applications)</option>
                    <option value="Under Review">Under Review</option>
                    <option value="Paused / Closed">Paused / Closed</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="opp-url" className="block font-semibold text-[#0F1B2D] mb-1">
                    Official Application Portal URL
                  </label>
                  <input
                    id="opp-url"
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://agency.gov.in/apply"
                    className="w-full h-9 px-3 rounded-lg border border-[#E5E1D8] bg-white text-xs text-[#0F1B2D] focus:outline-none focus:border-[#B8955A]"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label htmlFor="opp-desc" className="block font-semibold text-[#0F1B2D] mb-1">
                  Description & Eligibility Criteria
                </label>
                <textarea
                  id="opp-desc"
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Summary of grant terms, eligible entity structures, and milestones..."
                  className="w-full p-3 rounded-lg border border-[#E5E1D8] bg-white text-xs text-[#0F1B2D] focus:outline-none focus:border-[#B8955A]"
                />
              </div>

              <div className="flex gap-2 pt-2 border-t border-[#E5E1D8]">
                <Btn type="submit" className="flex-1" icon={Save}>
                  Save & Publish Changes
                </Btn>
                <Btn
                  type="button"
                  secondary
                  onClick={() => router.push('/admin/opportunities')}
                  className="flex-1"
                >
                  Cancel
                </Btn>
              </div>
            </form>
          </Card>
        </div>

        {/* Sidebar Context */}
        <div className="space-y-4 text-xs">
          <Card title="Traffic & Referrals">
            <div className="space-y-3">
              <div className="flex justify-between py-1.5 border-b border-[#E5E1D8]">
                <span className="text-[#4A5568]">Total Referrals</span>
                <span className="font-bold text-[#0F1B2D]">{existing.applicationsReferred} Founders</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#E5E1D8]">
                <span className="text-[#4A5568]">Link Health</span>
                <span className="text-[#286749] font-medium">Verified Active (HTTP 200)</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#E5E1D8]">
                <span className="text-[#4A5568]">Scam Verification</span>
                <span className="text-[#286749] font-medium">Passed Official Audit</span>
              </div>
            </div>
          </Card>

          <Card title="Founder Stage Targeting">
            <p className="text-[#4A5568] leading-relaxed mb-2">
              This grant opportunity is dynamically recommended to founders when their readiness scorecard reaches:
            </p>
            <div className="p-2.5 rounded-lg bg-[#FAF8F4] border border-[#E5E1D8] font-medium text-[#0F1B2D]">
              {stage}
            </div>
          </Card>
        </div>
      </div>
    </AdminShell>
  );
}
