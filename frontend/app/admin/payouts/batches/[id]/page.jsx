'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Banknote,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Send,
  Lock,
  Download,
} from 'lucide-react';
import { AdminShell } from '@/components';
import {
  Card,
  Btn,
  ResponsiveTable,
  toast,
} from '@/components/admin-ui';
import { initialBatches } from '../../payouts-data';

export default function PayoutBatchDetailPage({ params }) {
  const router = useRouter();
  const batchId = params?.id || 'BAT-2026-11-10';
  const batch = initialBatches.find((b) => b.id === batchId) || initialBatches[0];
  const [approved, setApproved] = useState(batch.status === 'Settled');

  const sampleLines = [
    { id: 'PAY-1', payee: 'Dr. Ramesh Sundaram', pan: 'ABCPS****K', bank: 'HDFC Bank (****4912)', sessions: 4, gross: '₹24,000', fee: '₹3,600', tds: '₹2,400', net: '₹18,000', status: 'Passed Checks' },
    { id: 'PAY-2', payee: 'Meera Nambiar', pan: 'ABEPN****R', bank: 'ICICI Bank (****8102)', sessions: 2, gross: '₹12,000', fee: '₹1,800', tds: '₹1,200', net: '₹9,000', status: 'Passed Checks' },
    { id: 'PAY-3', payee: 'Alok Tandon', pan: 'AHJPT****M', bank: 'Axis Bank (****3391)', sessions: 5, gross: '₹30,000', fee: '₹4,500', tds: '₹3,000', net: '₹22,500', status: 'Passed Checks' },
    { id: 'PAY-4', payee: 'Pooja Bhatt', pan: 'AAEPB****Q', bank: 'SBI (****9014)', sessions: 1, gross: '₹6,000', fee: '₹900', tds: '₹600', net: '₹4,500', status: 'Passed Checks' },
  ];

  const handleApproveBatch = () => {
    setApproved(true);
    toast('Dual-control checker approval registered. Provider settlement batch queued.');
  };

  return (
    <AdminShell active="Payouts & Refunds">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-[#E5E1D8] pb-5">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/payouts"
            className="p-2 rounded-lg border border-[#E5E1D8] bg-white text-[#4A5568] hover:text-[#0F1B2D] transition"
            title="Back to Payouts"
          >
            <ArrowLeft size={16} />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-[#B8955A]">{batch.id}</span>
              <span className={`px-2 py-0.2 rounded text-[10px] font-semibold ${
                approved ? 'bg-[#E7F3EC] text-[#286749]' : 'bg-[#FDF3E0] text-[#9A6210]'
              }`}>
                {approved ? 'Settled & Approved' : 'Ready for Checker Approval'}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#0F1B2D]">
              Disbursement Batch Workspace
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {!approved ? (
            <Btn icon={ShieldCheck} onClick={handleApproveBatch}>
              Dual-Approval (Checker Sign-off)
            </Btn>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-xs text-[#286749] font-medium bg-[#E7F3EC] px-3 py-1.5 rounded-lg border border-[#2E7D5B]/30">
              <CheckCircle2 size={14} />
              Disbursement Executed
            </span>
          )}
          <Btn small secondary icon={Download} onClick={() => toast('Exporting bank settlement file CSV')}>
            Bank File
          </Btn>
        </div>
      </div>

      {/* Batch Metrics Ribbon */}
      <div className="grid gap-3 sm:grid-cols-4 mb-6">
        <div className="p-4 rounded-xl border border-[#E5E1D8] bg-white">
          <span className="text-[11px] text-[#4A5568] block">Gross Mentorship Volume</span>
          <span className="text-xl font-serif font-bold text-[#0F1B2D]">{batch.grossAmount}</span>
          <p className="text-[11px] text-[#A0A7B4] mt-0.5">{batch.payeesCount} eligible payees</p>
        </div>
        <div className="p-4 rounded-xl border border-[#E5E1D8] bg-white">
          <span className="text-[11px] text-[#4A5568] block">Platform Fee Retained</span>
          <span className="text-xl font-serif font-bold text-[#0F1B2D]">{batch.commission}</span>
          <p className="text-[11px] text-[#A0A7B4] mt-0.5">15% standard take-rate</p>
        </div>
        <div className="p-4 rounded-xl border border-[#E5E1D8] bg-white">
          <span className="text-[11px] text-[#4A5568] block">Statutory TDS (Sec 194J)</span>
          <span className="text-xl font-serif font-bold text-[#0F1B2D]">{batch.tdsDeducted}</span>
          <p className="text-[11px] text-[#A0A7B4] mt-0.5">10% professional tax</p>
        </div>
        <div className="p-4 rounded-xl border border-[#E5E1D8] bg-white">
          <span className="text-[11px] text-[#4A5568] block">Net Payable to Payees</span>
          <span className="text-xl font-serif font-bold text-[#286749]">{batch.netAmount}</span>
          <p className="text-[11px] text-[#A0A7B4] mt-0.5">Automated UPI / IMPS</p>
        </div>
      </div>

      {/* Payee Breakdown Table */}
      <Card title="Batch Payee Disbursement Lines" titleIcon={Banknote}>
        <ResponsiveTable>
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF8F4] text-[#4A5568] border-b border-[#E5E1D8]">
              <tr>
                <th className="py-3 px-4 font-medium">Payee Name</th>
                <th className="py-3 px-4 font-medium">Masked PAN</th>
                <th className="py-3 px-4 font-medium">Bank Account</th>
                <th className="py-3 px-4 font-medium">Sessions</th>
                <th className="py-3 px-4 font-medium">Gross</th>
                <th className="py-3 px-4 font-medium">Platform Fee</th>
                <th className="py-3 px-4 font-medium">TDS</th>
                <th className="py-3 px-4 font-medium">Net Disbursed</th>
                <th className="py-3 px-4 font-medium">Checks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E1D8]">
              {sampleLines.map((line) => (
                <tr key={line.id} className="hover:bg-[#FAF8F4]/50">
                  <td className="py-3 px-4 font-medium text-[#0F1B2D]">{line.payee}</td>
                  <td className="py-3 px-4 font-mono text-[#4A5568]">{line.pan}</td>
                  <td className="py-3 px-4 text-[#4A5568]">{line.bank}</td>
                  <td className="py-3 px-4 text-[#0F1B2D] font-medium">{line.sessions}</td>
                  <td className="py-3 px-4 font-mono text-[#0F1B2D]">{line.gross}</td>
                  <td className="py-3 px-4 font-mono text-[#4A5568]">{line.fee}</td>
                  <td className="py-3 px-4 font-mono text-[#4A5568]">{line.tds}</td>
                  <td className="py-3 px-4 font-mono font-bold text-[#286749]">{line.net}</td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center gap-1 text-[#286749]">
                      <CheckCircle2 size={13} />
                      {line.status}
                    </span>
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
