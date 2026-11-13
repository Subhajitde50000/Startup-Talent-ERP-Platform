'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Clock,
  ArrowLeft,
  AlertTriangle,
  RefreshCcw,
  CheckCircle2,
  Mail,
  Building,
  UserCheck,
  Briefcase,
  Award,
} from 'lucide-react';
import { AdminShell } from '@/components';
import {
  Card,
  Btn,
  ResponsiveTable,
  toast,
} from '@/components/admin-ui';

export default function AdminExpiringVerificationsPage() {
  const [expiringList, setExpiringList] = useState([
    {
      id: 'EXP-01',
      entity: 'NexaSolar Energy Pvt Ltd',
      role: 'Startup',
      verifiedDate: '2025-11-20',
      expiresIn: '10 days',
      reason: 'Annual 12-month incorporation deed re-attestation',
      contact: 'founder@nexasolar.in',
      status: 'Reminder 2 Sent',
    },
    {
      id: 'EXP-02',
      entity: 'Dr. Meenakshi Sundaram',
      role: 'Mentor',
      verifiedDate: '2025-11-25',
      expiresIn: '15 days',
      reason: 'SEBI RIA / Academic accreditation annual audit',
      contact: 'meenakshi@iitb.ac.in',
      status: 'Reminder 1 Sent',
    },
    {
      id: 'EXP-03',
      entity: 'Apex Talent Search Partners',
      role: 'Employer',
      verifiedDate: '2025-12-01',
      expiresIn: '21 days',
      reason: 'MCA active status re-verification',
      contact: 'hr@apextalent.in',
      status: 'Pending Dispatch',
    },
    {
      id: 'EXP-04',
      entity: 'BlueOcean Angel Syndicate',
      role: 'Investor',
      verifiedDate: '2025-12-05',
      expiresIn: '25 days',
      reason: 'Accredited investor Net-worth certificate annual renewal',
      contact: 'lead@blueocean.vc',
      status: 'Pending Dispatch',
    },
  ]);

  const handleSendReminder = (id) => {
    toast(`Re-verification reminder email dispatched to ${id}`);
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
              <span className="font-mono text-xs text-[#B8955A]">Lifecycle Governance</span>
              <span className="px-2 py-0.2 rounded text-[10px] bg-[#FDF3E0] text-[#9A6210] font-semibold">
                {expiringList.length} Accounts Due
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#0F1B2D]">
              Re-Verification & Expiry Management
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Btn icon={Mail} onClick={() => toast('Bulk automated re-verification reminders triggered')}>
            Dispatch All Reminders
          </Btn>
        </div>
      </div>

      <Card title="Accounts Approaching 12-Month Credential Expiry" titleIcon={Clock}>
        <ResponsiveTable>
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF8F4] text-[#4A5568] border-b border-[#E5E1D8]">
              <tr>
                <th className="py-3 px-4 font-medium">Entity / User</th>
                <th className="py-3 px-4 font-medium">Platform Role</th>
                <th className="py-3 px-4 font-medium">Initial Verified Date</th>
                <th className="py-3 px-4 font-medium">Expires In</th>
                <th className="py-3 px-4 font-medium">Trigger Reason</th>
                <th className="py-3 px-4 font-medium">Workflow Status</th>
                <th className="py-3 px-4 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E1D8]">
              {expiringList.map((item) => (
                <tr key={item.id} className="hover:bg-[#FAF8F4]/50">
                  <td className="py-3 px-4 font-medium text-[#0F1B2D]">
                    <div>{item.entity}</div>
                    <span className="text-[11px] text-[#A0A7B4]">{item.contact}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded bg-[#FAF8F4] border border-[#E5E1D8] text-[#0F1B2D] font-medium">
                      {item.role}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-[#4A5568] font-mono">{item.verifiedDate}</td>
                  <td className="py-3 px-4 font-bold text-[#B42318]">{item.expiresIn}</td>
                  <td className="py-3 px-4 text-[#4A5568] max-w-xs">{item.reason}</td>
                  <td className="py-3 px-4 text-[#B8955A] font-medium">{item.status}</td>
                  <td className="py-3 px-4">
                    <button
                      type="button"
                      onClick={() => handleSendReminder(item.id)}
                      className="text-[#B8955A] hover:underline font-medium inline-flex items-center gap-1"
                    >
                      <Mail size={12} />
                      <span>Send Notice</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </ResponsiveTable>
      </Card>
    </AdminShell>
  );
}
