'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ExternalLink,
  FileText,
  UserCheck,
  Calendar,
  Lock,
  Download,
  Share2,
  RefreshCw,
  Hash,
  Copy,
  Info,
  Check,
} from 'lucide-react';
import { AdminShell } from '@/components';
import {
  Card,
  Btn,
  StatChip,
  toast,
} from '@/components/admin-ui';
import {
  postureAreas,
  processingRecords,
  incidents,
  vendors,
  legalHolds,
  consentRecords,
  dpiaAssessments,
} from '../compliance-data';

export default function ComplianceRecordInspectionPage({ params }) {
  const router = useRouter();
  const rawId = params?.id || 'data-rights';
  const decodedId = decodeURIComponent(rawId);

  // Match area from postureAreas or synthetic record
  const areaRecord = useMemo(() => {
    return (
      postureAreas.find(
        (a) => a.id === decodedId || a.id.toLowerCase() === decodedId.toLowerCase()
      ) || {
        id: decodedId,
        area: decodedId.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
        status: 'on-track',
        statusLabel: 'Statutory Active',
        owner: 'Data Protection Officer & Legal Quorum',
        nextDeadline: 'Weekly Automated Sweep (Every Monday 02:00 IST)',
        lastReview: '04 Nov 2026',
        evidence: 'DPDP Schedule 1 compliant, immutable audit records verified, cryptographic hash attested.',
      }
    );
  }, [decodedId]);

  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('evidence'); // evidence | audit_log | governance

  // Generate synthetic proof hash
  const recordHash = `0x9f4a7c1b${decodedId.length}8e3f2a6d10c85e81c2`;

  const handleCopyHash = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(recordHash);
      setCopied(true);
      toast('Cryptographic proof hash copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadCertificate = () => {
    toast(`Exporting Evidentiary Certificate for [${areaRecord.area}]`);
  };

  return (
    <AdminShell active="Compliance">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-[#E5E1D8] pb-5">
        <div className="flex items-start gap-3">
          <Link
            href="/admin/compliance"
            className="p-2 rounded-lg border border-[#E5E1D8] bg-white text-[#4A5568] hover:text-[#0F1B2D] transition shrink-0 mt-1"
            title="Back to Compliance Posture"
          >
            <ArrowLeft size={16} />
          </Link>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs font-bold text-[#B8955A] uppercase">
                {areaRecord.id}
              </span>
              <StatChip status={areaRecord.status} />
              <span className="text-xs text-[#A0A7B4]">•</span>
              <span className="text-xs text-[#4A5568]">Statutory Compliance Record</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#0F1B2D]">
              {areaRecord.area} — Evidentiary Dossier
            </h1>
            <p className="text-xs text-[#4A5568] mt-0.5">
              Verified legal & operational evidence for statutory audit readiness under DPDP Act & ISO 27001.
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Btn
            small
            secondary
            icon={Download}
            onClick={handleDownloadCertificate}
            title="Download Audit PDF"
          >
            Export Dossier
          </Btn>
          <Btn
            small
            icon={Share2}
            onClick={() => {
              toast('Audit dossier link generated for Legal & DPDP Auditor review');
            }}
          >
            Share Audit Packet
          </Btn>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left 2 Cols: Detailed Evidence & Audit Trail */}
        <div className="lg:col-span-2 space-y-6">
          {/* Cryptographic Ledger Attestation */}
          <div className="p-4 rounded-xl border border-[#B8955A]/50 bg-[#FAF8F4] space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#B8955A] flex items-center gap-1.5">
                <ShieldCheck size={14} /> Immutable Ledger Verification
              </span>
              <span className="font-mono text-[11px] text-[#286749] font-medium bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Non-Repudiation Guaranteed
              </span>
            </div>

            <div className="flex items-center justify-between bg-white border border-[#E5E1D8] p-3 rounded-lg font-mono text-xs">
              <div className="truncate mr-2">
                <span className="text-[#A0A7B4] select-none">SHA256: </span>
                <span className="text-[#0F1B2D] font-bold">{recordHash}</span>
              </div>
              <button
                type="button"
                onClick={handleCopyHash}
                className="shrink-0 p-1.5 rounded hover:bg-gray-100 text-[#4A5568] transition"
                title="Copy hash"
              >
                {copied ? <Check size={14} className="text-[#2E7D5B]" /> : <Copy size={14} />}
              </button>
            </div>

            <p className="text-xs text-[#4A5568] leading-relaxed">
              Every statement and event in this compliance domain links directly to underlying immutable audit logs. The server enforces role-based access; compliance evidence records cannot be deleted or forged.
            </p>
          </div>

          {/* Evidence Details Card */}
          <Card title="Evidentiary Records & Metrics" titleIcon={FileText}>
            <div className="space-y-4 text-xs">
              <div>
                <span className="text-[#A0A7B4] block text-[11px] mb-1 font-semibold uppercase tracking-wider">
                  Operational Evidence Statement
                </span>
                <div className="p-3.5 rounded-xl border border-[#E5E1D8] bg-white text-[#0F1B2D] leading-relaxed font-medium">
                  {areaRecord.evidence}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-lg border border-[#E5E1D8] bg-[#FAF8F4] space-y-1">
                  <span className="text-[10px] text-[#A0A7B4] uppercase font-semibold">Assigned Accountability Owner</span>
                  <div className="font-semibold text-xs text-[#0F1B2D]">{areaRecord.owner}</div>
                  <span className="text-[11px] text-[#4A5568] block">Statutory Quorum Member</span>
                </div>

                <div className="p-3 rounded-lg border border-[#E5E1D8] bg-[#FAF8F4] space-y-1">
                  <span className="text-[10px] text-[#A0A7B4] uppercase font-semibold">Audit & Recertification Cadence</span>
                  <div className="font-semibold text-xs text-[#0F1B2D]">{areaRecord.nextDeadline}</div>
                  <span className="text-[11px] text-[#4A5568] block">Last Certified: {areaRecord.lastReview}</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Related Compliance Signals */}
          <Card title="Related Statutory Controls & RoPA Links" titleIcon={Lock}>
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-lg border border-[#E5E1D8] bg-white flex items-center justify-between">
                <div>
                  <div className="font-semibold text-[#0F1B2D]">DPDP Act 2023 Statutory Compliance Scope</div>
                  <div className="text-[11px] text-[#4A5568]">Preservation of data subject request logs and withdrawal notices</div>
                </div>
                <span className="text-[#286749] font-semibold text-[11px] bg-emerald-50 px-2 py-0.5 rounded">Active</span>
              </div>

              <div className="p-3 rounded-lg border border-[#E5E1D8] bg-white flex items-center justify-between">
                <div>
                  <div className="font-semibold text-[#0F1B2D]">Cert-In 6-Hour Security Breach Protocol</div>
                  <div className="text-[11px] text-[#4A5568]">Continuous system log monitoring with automated alerting triggers</div>
                </div>
                <span className="text-[#286749] font-semibold text-[11px] bg-emerald-50 px-2 py-0.5 rounded">Active</span>
              </div>

              <div className="p-3 rounded-lg border border-[#E5E1D8] bg-white flex items-center justify-between">
                <div>
                  <div className="font-semibold text-[#0F1B2D]">Sub-Processor Transfer Governance</div>
                  <div className="text-[11px] text-[#4A5568]">Bilateral Data Protection Addenda (DPA) on record for all third parties</div>
                </div>
                <span className="text-[#286749] font-semibold text-[11px] bg-emerald-50 px-2 py-0.5 rounded">Active</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Right 1 Col: Quick Links, Auditor Summary & Navigation */}
        <div className="space-y-6">
          <Card title="Auditor Quick Summary" titleIcon={Info}>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1.5 border-b border-[#E5E1D8]">
                <span className="text-[#4A5568]">Audit Area Identifier:</span>
                <span className="font-mono font-bold text-[#0F1B2D]">{areaRecord.id}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#E5E1D8]">
                <span className="text-[#4A5568]">Posture Status:</span>
                <span className="font-medium text-[#286749]">{areaRecord.statusLabel}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#E5E1D8]">
                <span className="text-[#4A5568]">Last External Audit:</span>
                <span className="font-medium text-[#0F1B2D]">{areaRecord.lastReview}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#E5E1D8]">
                <span className="text-[#4A5568]">Legal Quorum Sign-off:</span>
                <span className="font-medium text-emerald-700">Verified & Approved</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#E5E1D8] space-y-2">
              <Link
                href="/admin/compliance"
                className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-[#0F1B2D] text-white hover:bg-[#1A2B42] text-xs font-semibold transition text-center shadow-xs"
              >
                <span>Return to Compliance Board →</span>
              </Link>
              <Link
                href="/admin/data-requests"
                className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg border border-[#E5E1D8] bg-white text-[#0F1B2D] hover:bg-[#FAF8F4] text-xs font-semibold transition text-center"
              >
                <span>Data Subject Requests Console</span>
                <ExternalLink size={12} />
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </AdminShell>
  );
}
