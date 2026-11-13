'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Scale,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Download,
  AlertTriangle,
  Lock,
  FileText,
  User,
} from 'lucide-react';
import { AdminShell } from '@/components';
import {
  Card,
  Btn,
  StatChip,
  toast,
} from '@/components/admin-ui';
import { requestsData } from '../requests-data';

export default function DataRequestDetailPage({ params }) {
  const router = useRouter();
  const requestId = params?.id || 'REQ-2026-041';

  const reqItem = useMemo(() => {
    const found = requestsData.find((r) => r.id === requestId);
    if (found) return found;
    return {
      id: requestId,
      authority: 'DPDP Data Principal Request (Priya Sharma)',
      type: 'Right to Erasure (Art. 12)',
      scope: 'Complete account deletion & ATS applicant history',
      received: '2026-10-28',
      due: '2026-11-11',
      status: 'In progress',
      dataSubject: 'priya.sharma@talent.net',
      complianceClock: '3 days remaining',
      recordsIdentified: 18,
    };
  }, [requestId]);

  const [status, setStatus] = useState(reqItem.status === 'Completed' ? 'Completed' : 'In Progress');

  const categories = [
    { name: 'Profile & Account Credentials', records: '1 User Record', status: 'Extracted' },
    { name: 'Job Applications & ATS Submissions', records: '14 Applications, 3 Resumes', status: 'Extracted' },
    { name: 'Interview Trainer Practice & Audio Recordings', records: '6 Sessions, 18 Responses', status: 'Extracted' },
    { name: 'Direct Messages & Communications', records: '28 Messages', status: 'Extracted & PII Sanitized' },
    { name: 'Payment Transactions & Invoices', records: '2 Invoices (Retained for Tax Law)', status: 'Statutory Retention' },
  ];

  const handleApproveExport = () => {
    setStatus('Completed');
    toast(`Data export archive package signed and dispatched securely to ${reqItem.dataSubject}`);
  };

  return (
    <AdminShell active="Compliance">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs text-[#718096] mb-4">
        <Link href="/admin/data-requests" className="hover:text-[#0F1B2D] transition flex items-center gap-1">
          <ArrowLeft size={13} />
          <span>Back to Data Requests Registry</span>
        </Link>
        <span>/</span>
        <span className="font-mono text-[#0F1B2D] font-medium">{requestId}</span>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-[#E5E1D8] pb-5">
        <div className="flex items-start gap-3">
          <Link
            href="/admin/data-requests"
            className="p-2 rounded-lg border border-[#E5E1D8] bg-white text-[#4A5568] hover:text-[#0F1B2D] transition shrink-0 mt-1"
            title="Back to Data Requests"
          >
            <ArrowLeft size={16} />
          </Link>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs font-bold text-[#B8955A]">{requestId}</span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                status === 'Completed' ? 'bg-[#E7F3EC] text-[#286749]' : 'bg-[#FDF3E0] text-[#9A6210]'
              }`}>
                {status}
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-700">
                {reqItem.type}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#0F1B2D]">
              {reqItem.authority}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {status !== 'Completed' ? (
            <Btn icon={ShieldCheck} onClick={handleApproveExport}>
              Sign Off & Dispatch Export Package
            </Btn>
          ) : (
            <Btn secondary icon={Download} onClick={() => toast('Downloading signed audit receipt')}>
              Download Audit Receipt
            </Btn>
          )}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Details (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          <Card title="Data Extraction & PII Sanitation Pipeline" titleIcon={Scale}>
            <div className="space-y-3">
              {categories.map((c, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 rounded-lg border border-[#E5E1D8] bg-[#FAF8F4]/70 text-xs"
                >
                  <div>
                    <span className="font-semibold text-[#0F1B2D] block">{c.name}</span>
                    <span className="text-[11px] text-[#718096]">{c.records}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                    c.status.includes('Statutory')
                      ? 'bg-amber-100 text-amber-900 border border-amber-200'
                      : 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                  }`}>
                    {c.status}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Statutory Scope Statement" titleIcon={FileText}>
            <p className="text-xs text-[#4A5568] leading-relaxed">
              {reqItem.scope}
            </p>
          </Card>
        </div>

        {/* Sidebar Context */}
        <div className="space-y-4 text-xs">
          <Card title="Request Details" titleIcon={User}>
            <div className="space-y-2.5">
              <div className="flex justify-between py-1.5 border-b border-[#E5E1D8]">
                <span className="text-[#4A5568]">Data Principal</span>
                <span className="font-semibold text-[#0F1B2D]">{reqItem.dataSubject}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#E5E1D8]">
                <span className="text-[#4A5568]">Statutory Basis</span>
                <span className="font-medium text-[#0F1B2D]">{reqItem.type}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#E5E1D8]">
                <span className="text-[#4A5568]">Received Date</span>
                <span className="font-mono text-[#0F1B2D]">{reqItem.received}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#E5E1D8]">
                <span className="text-[#4A5568]">Statutory Deadline</span>
                <span className="font-mono font-bold text-amber-800">{reqItem.due}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-[#4A5568]">Identified Records</span>
                <span className="font-bold text-[#0F1B2D]">{reqItem.recordsIdentified} records</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </AdminShell>
  );
}
