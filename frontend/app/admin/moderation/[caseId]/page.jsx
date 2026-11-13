'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  Ban,
  Eye,
  EyeOff,
  User,
  Scale,
} from 'lucide-react';
import { AdminShell } from '@/components';
import {
  Card,
  Btn,
  toast,
} from '@/components/admin-ui';

export default function ModerationCaseDetailPage({ params }) {
  const router = useRouter();
  const caseId = params?.caseId || 'MOD-4029';

  const [blurred, setBlurred] = useState(true);
  const [actionChoice, setActionChoice] = useState('remove'); // 'warn' | 'remove' | 'suspend' | 'dismiss'
  const [actionReason, setActionReason] = useState('POL-001 Zero Fee Solicitation Rule');

  const handleExecuteAction = (e) => {
    e.preventDefault();
    if (actionChoice === 'dismiss') {
      toast(`Report dismissed for case ${caseId}. Listing restored.`);
    } else {
      toast(`Action ${actionChoice.toUpperCase()} applied to case ${caseId}. Audit record generated.`);
    }
    setTimeout(() => {
      router.push('/admin/moderation');
    }, 700);
  };

  return (
    <AdminShell active="Moderation">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-[#E5E1D8] pb-5">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/moderation"
            className="p-2 rounded-lg border border-[#E5E1D8] bg-white text-[#4A5568] hover:text-[#0F1B2D] transition"
            title="Back to Moderation"
          >
            <ArrowLeft size={16} />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-[#B8955A]">{caseId}</span>
              <span className="px-2 py-0.2 rounded text-[10px] bg-[#FBE9E7] text-[#B42318] font-semibold">
                Sev 1 Content Flag · Auto-Quarantined
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#0F1B2D]">
              Job Posting #JOB-4029: Upfront Fee Violation
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Btn icon={ShieldAlert} onClick={handleExecuteAction}>
            Enforce Policy Action
          </Btn>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left 2 Cols: Content Snapshot & Evidence */}
        <div className="lg:col-span-2 space-y-6">
          <Card title="Quarantined Content Snapshot" titleIcon={ShieldAlert}>
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between text-[#4A5568] border-b border-[#E5E1D8] pb-2">
                <span>Subject: <b>Listing "Associate Data Scientist"</b></span>
                <button
                  type="button"
                  onClick={() => setBlurred(!blurred)}
                  className="inline-flex items-center gap-1 text-[#B8955A] hover:underline"
                >
                  {blurred ? <Eye size={13} /> : <EyeOff size={13} />}
                  <span>{blurred ? 'Reveal Blurred Content' : 'Blur Content'}</span>
                </button>
              </div>

              <div className={`p-4 rounded-xl border border-[#E5E1D8] bg-[#FAF8F4] leading-relaxed transition-all ${
                blurred ? 'filter blur-sm select-none' : ''
              }`}>
                <h4 className="font-bold text-[#0F1B2D] mb-2 text-sm">Associate Data Scientist (Remote)</h4>
                <p className="text-[#0F1B2D] mb-3">
                  We are seeking an entry-level Data Scientist to build computer vision models. Candidates selected must undergo a mandatory 2-week cloud tool training program.
                </p>
                <div className="p-3 rounded-lg bg-[#FBE9E7] border border-[#B42318]/30 text-[#B42318] font-mono text-[11px]">
                  [VIOLATION DETECTED] "A refundable security deposit and certification fee of ₹4,500 is payable prior to laptop and VPN dispatch."
                </div>
              </div>

              <div className="rounded-lg border border-[#F3EBDD] bg-[#FAF8F4] p-3 text-xs text-[#9A7A45]">
                <span className="font-semibold">Corroborating Evidence:</span> 2 candidate reports submitted with screenshots of WhatsApp messages requesting UPI transfers to upi@fasttrack-hire.in.
              </div>
            </div>
          </Card>
        </div>

        {/* Right Col: Action Ladder */}
        <div className="space-y-4 text-xs">
          <Card title="Policy Action Ladder" titleIcon={Scale}>
            <form onSubmit={handleExecuteAction} className="space-y-4">
              <div>
                <label className="block font-medium text-[#0F1B2D] mb-2">
                  Select Enforcement Action
                </label>
                <div className="space-y-1.5">
                  <label className="flex items-center gap-2 p-2 rounded-lg border border-[#E5E1D8] bg-white cursor-pointer">
                    <input
                      type="radio"
                      name="action"
                      value="remove"
                      checked={actionChoice === 'remove'}
                      onChange={() => setActionChoice('remove')}
                      className="text-[#B8955A] focus:ring-[#B8955A]"
                    />
                    <span className="font-medium text-[#B42318]">Remove Listing & Issue Warning</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 rounded-lg border border-[#E5E1D8] bg-white cursor-pointer">
                    <input
                      type="radio"
                      name="action"
                      value="suspend"
                      checked={actionChoice === 'suspend'}
                      onChange={() => setActionChoice('suspend')}
                      className="text-[#B8955A] focus:ring-[#B8955A]"
                    />
                    <span className="font-medium text-[#B42318]">Suspend Employer Account (7 Days)</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 rounded-lg border border-[#E5E1D8] bg-white cursor-pointer">
                    <input
                      type="radio"
                      name="action"
                      value="dismiss"
                      checked={actionChoice === 'dismiss'}
                      onChange={() => setActionChoice('dismiss')}
                      className="text-[#B8955A] focus:ring-[#B8955A]"
                    />
                    <span className="font-medium text-[#4A5568]">Dismiss Report (False Positive)</span>
                  </label>
                </div>
              </div>

              <Btn
                type="submit"
                className="w-full justify-center py-2.5"
              >
                Confirm Enforcement Action
              </Btn>
            </form>
          </Card>
        </div>
      </div>
    </AdminShell>
  );
}
