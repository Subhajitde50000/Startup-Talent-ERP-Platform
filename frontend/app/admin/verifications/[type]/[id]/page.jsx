'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Building,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  FileText,
  Clock,
  Eye,
  Lock,
  Send,
  User,
  Briefcase,
  Award,
} from 'lucide-react';
import { AdminShell } from '@/components';
import {
  Card,
  Btn,
  toast,
} from '@/components/admin-ui';

export default function VerificationReviewPage({ params }) {
  const router = useRouter();
  const rawType = params?.type || 'startups';
  const caseId = params?.id || 'VER-STU-8821';

  // Normalize role type
  const isStartup = rawType.includes('startup');
  const isMentor = rawType.includes('mentor');
  const isEmployer = rawType.includes('employer');
  const isInvestor = rawType.includes('investor');

  const title = isStartup
    ? 'Vertex AI Labs Pvt Ltd — Startup Entity KYC'
    : isMentor
    ? 'Dr. Rajesh Nair — Senior Advisory Credential Review'
    : isEmployer
    ? 'QuantumHire Technologies — Employer Business Verification'
    : 'Apex Ventures Angel Fund — Investor Accreditation Review';

  const [checklist, setChecklist] = useState([
    { id: 'c1', label: 'Government Registry Active (MCA / CIN match)', checked: true, status: 'pass' },
    { id: 'c2', label: 'PAN & GSTIN Active Tax Status', checked: true, status: 'pass' },
    { id: 'c3', label: 'Beneficial Ownership & Director KYC Cleared', checked: false, status: 'pending' },
    { id: 'c4', label: 'Global Sanctions & AML Watchlist Clean', checked: true, status: 'pass' },
    { id: 'c5', label: 'Official Domain & Business Email Verified', checked: true, status: 'pass' },
  ]);

  const [decision, setDecision] = useState('approve'); // 'approve' | 'changes' | 'reject'
  const [internalNote, setInternalNote] = useState('');
  const [applicantMessage, setApplicantMessage] = useState('');

  const toggleCheck = (id) => {
    setChecklist((prev) =>
      prev.map((c) => (c.id === id ? { ...c, checked: !c.checked } : c))
    );
  };

  const handleDecision = (e) => {
    e.preventDefault();
    if (decision === 'approve') {
      toast(`Verification approved for ${caseId}. Verified badge active.`);
    } else if (decision === 'changes') {
      toast(`Change request dispatched to applicant for ${caseId}.`);
    } else {
      toast(`Application rejected for ${caseId} with cited reason.`);
    }
    setTimeout(() => {
      router.push('/admin/verifications');
    }, 700);
  };

  return (
    <AdminShell active="Verifications">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-[#E5E1D8] pb-5">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/verifications"
            className="p-2 rounded-lg border border-[#E5E1D8] bg-white text-[#4A5568] hover:text-[#0F1B2D] transition"
            title="Back to Verification Queue"
          >
            <ArrowLeft size={16} />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-[#B8955A]">{caseId}</span>
              <span className="px-2 py-0.2 rounded text-[10px] bg-[#FDF3E0] text-[#9A6210] font-semibold">
                SLA: 5h 42m remaining
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#0F1B2D]">
              {title}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Btn icon={ShieldCheck} onClick={handleDecision}>
            Submit Verification Decision
          </Btn>
        </div>
      </div>

      {/* 3-Column Review Workspace */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left Column: Checklist & Info (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <Card title="Verification Checklist" titleIcon={CheckCircle2}>
            <div className="space-y-3 text-xs">
              <p className="text-[#4A5568] leading-relaxed">
                Confirm each statutory criterion before approving. Failures require either requesting changes or citing rejection grounds.
              </p>
              <div className="space-y-2 pt-1">
                {checklist.map((item) => (
                  <label
                    key={item.id}
                    className="flex items-start gap-2.5 p-2.5 rounded-lg border border-[#E5E1D8] bg-[#FAF8F4] cursor-pointer hover:border-[#B8955A] transition"
                  >
                    <input
                      type="checkbox"
                      checked={item.checked}
                      onChange={() => toggleCheck(item.id)}
                      className="mt-0.5 rounded border-[#E5E1D8] text-[#B8955A] focus:ring-[#B8955A]"
                    />
                    <span className={`leading-snug ${item.checked ? 'text-[#0F1B2D] font-medium' : 'text-[#4A5568]'}`}>
                      {item.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </Card>

          <Card title="Applicant Entity Context">
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1.5 border-b border-[#E5E1D8]">
                <span className="text-[#4A5568]">Entity CIN / Registration</span>
                <span className="font-mono text-[#0F1B2D]">U72900KA2024PTC184910</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#E5E1D8]">
                <span className="text-[#4A5568]">Representative</span>
                <span className="font-medium text-[#0F1B2D]">Kavita Sundaram (Founder & CEO)</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#E5E1D8]">
                <span className="text-[#4A5568]">Incorporation Date</span>
                <span className="font-mono text-[#0F1B2D]">14 Jan 2024 (Bengaluru)</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#E5E1D8]">
                <span className="text-[#4A5568]">Risk Score</span>
                <span className="text-[#286749] font-bold">Low Risk (94/100)</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Center Column: Evidence & Document Viewer (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <Card title="Statutory Evidence Document" titleIcon={FileText}>
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between text-[#4A5568] border-b border-[#E5E1D8] pb-2">
                <span>File: <b>mca_certificate_incorporation.pdf</b></span>
                <span className="text-[11px] font-mono">1.8 MB · Uploaded 42h ago</span>
              </div>

              {/* Secure Document Viewer Preview */}
              <div className="relative border border-[#E5E1D8] rounded-xl bg-neutral-900 text-white min-h-[460px] p-6 flex flex-col justify-between overflow-hidden shadow-inner">
                {/* Security Watermark */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none rotate-[-25deg] select-none opacity-10 text-xl font-bold font-mono tracking-widest uppercase">
                  CONFIDENTIAL ADMIN REVIEW · {caseId}
                </div>

                <div className="space-y-3 relative z-10">
                  <div className="flex items-center justify-between border-b border-white/20 pb-3">
                    <span className="font-serif text-sm font-bold tracking-wider text-[#B8955A]">
                      GOVERNMENT OF INDIA · MINISTRY OF CORPORATE AFFAIRS
                    </span>
                    <span className="font-mono text-[10px] text-white/60">FORM INC-11</span>
                  </div>
                  <div className="space-y-2 text-white/90 text-[11px] font-mono pt-2">
                    <p className="font-bold text-white text-xs">Certificate of Incorporation</p>
                    <p>Corporate Identity Number: U72900KA2024PTC184910</p>
                    <p>I hereby certify that VERTEX AI LABS PRIVATE LIMITED is incorporated on this 14th day of January Two Thousand Twenty-Four under the Companies Act, 2013.</p>
                    <p>ROC Bangalore · Registrar of Companies, Karnataka</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/20 flex items-center justify-between text-[11px] text-white/70 relative z-10">
                  <span>Digitally Signed by Registrar</span>
                  <span className="text-[#2E7D5B] font-bold">✓ Signature Valid</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column: Decision Panel (3 cols) */}
        <div className="lg:col-span-3 space-y-4">
          <Card title="Determination Panel" titleIcon={ShieldCheck}>
            <form onSubmit={handleDecision} className="space-y-4 text-xs">
              <div>
                <label className="block font-medium text-[#0F1B2D] mb-2">
                  Action
                </label>
                <div className="space-y-1.5">
                  <label className="flex items-center gap-2 p-2 rounded-lg border border-[#E5E1D8] bg-white cursor-pointer">
                    <input
                      type="radio"
                      name="decision"
                      value="approve"
                      checked={decision === 'approve'}
                      onChange={() => setDecision('approve')}
                      className="text-[#B8955A] focus:ring-[#B8955A]"
                    />
                    <span className="font-medium text-[#286749]">Approve & Grant Badge</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 rounded-lg border border-[#E5E1D8] bg-white cursor-pointer">
                    <input
                      type="radio"
                      name="decision"
                      value="changes"
                      checked={decision === 'changes'}
                      onChange={() => setDecision('changes')}
                      className="text-[#B8955A] focus:ring-[#B8955A]"
                    />
                    <span className="font-medium text-[#9A6210]">Request Changes</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 rounded-lg border border-[#E5E1D8] bg-white cursor-pointer">
                    <input
                      type="radio"
                      name="decision"
                      value="reject"
                      checked={decision === 'reject'}
                      onChange={() => setDecision('reject')}
                      className="text-[#B8955A] focus:ring-[#B8955A]"
                    />
                    <span className="font-medium text-[#B42318]">Reject with Reason</span>
                  </label>
                </div>
              </div>

              {decision !== 'approve' && (
                <div>
                  <label htmlFor="applicant-msg" className="block font-medium text-[#0F1B2D] mb-1.5">
                    Notice to Applicant
                  </label>
                  <textarea
                    id="applicant-msg"
                    rows={3}
                    value={applicantMessage}
                    onChange={(e) => setApplicantMessage(e.target.value)}
                    placeholder="Message will be sent to the applicant's notification inbox..."
                    className="w-full p-2.5 rounded-lg border border-[#E5E1D8] bg-white text-xs focus:outline-none focus:border-[#B8955A]"
                  />
                </div>
              )}

              <div>
                <label htmlFor="internal-note" className="block font-medium text-[#0F1B2D] mb-1.5">
                  Internal Reviewer Note (Audit Trail)
                </label>
                <textarea
                  id="internal-note"
                  rows={2}
                  value={internalNote}
                  onChange={(e) => setInternalNote(e.target.value)}
                  placeholder="Private audit log entry..."
                  className="w-full p-2.5 rounded-lg border border-[#E5E1D8] bg-white text-xs focus:outline-none focus:border-[#B8955A]"
                />
              </div>

              <Btn
                type="submit"
                className="w-full justify-center py-2.5"
              >
                Confirm Decision
              </Btn>
            </form>
          </Card>
        </div>
      </div>
    </AdminShell>
  );
}
