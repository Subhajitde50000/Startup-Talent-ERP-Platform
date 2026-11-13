'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Banknote,
  Send,
  RotateCcw,
  ShieldAlert,
  FileCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  Plus,
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
  initialBatches,
  initialRefunds,
  initialHolds,
} from './payouts-data';

export default function AdminPayoutsPage() {
  const [activeTab, setActiveTab] = useState('batches');
  const [batches, setBatches] = useState(initialBatches);
  const [refunds, setRefunds] = useState(initialRefunds);
  const [holds, setHolds] = useState(initialHolds);

  const tabs = [
    { key: 'batches', label: 'Payout Batches', count: batches.length },
    { key: 'refunds', label: 'Refund Requests', count: refunds.length },
    { key: 'holds', label: 'Active Payee Holds', count: holds.length },
    { key: 'tax', label: 'TDS & Tax Paperwork' },
  ];

  return (
    <AdminShell active="Payouts & Refunds">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-[#E5E1D8] pb-5">
        <div>
          <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#0F1B2D]">
            Disbursements, Payouts & Refunds
          </h1>
          <p className="text-xs text-[#4A5568] mt-1">
            Maker-checker disbursements to verified mentors, statutory TDS deductions, and customer refund processing.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Btn icon={Plus} onClick={() => toast('Compiling proposed payout batch')}>
            Prepare Next Payout Batch
          </Btn>
        </div>
      </div>

      {/* Summary KPI Strip */}
      <div className="grid gap-3 sm:grid-cols-4 mb-6">
        <div className="p-4 rounded-xl border border-[#E5E1D8] bg-white shadow-xs">
          <span className="text-[11px] text-[#4A5568] block">Next Payout Run</span>
          <span className="text-lg font-serif font-bold text-[#0F1B2D]">10 Nov · ₹8.40L</span>
          <p className="text-[11px] text-[#A0A7B4] mt-0.5">112 eligible verified payees</p>
        </div>
        <div className="p-4 rounded-xl border border-[#F3EBDD] bg-[#FAF8F4] shadow-xs">
          <span className="text-[11px] text-[#9A7A45] font-semibold block">Awaiting Dual-Approval</span>
          <span className="text-lg font-serif font-bold text-[#9A7A45]">1 Batch (BAT-2026-11-10)</span>
          <p className="text-[11px] text-[#4A5568] mt-0.5">Maker submitted · Checker required</p>
        </div>
        <div className="p-4 rounded-xl border border-[#E5E1D8] bg-white shadow-xs">
          <span className="text-[11px] text-[#4A5568] block">Active Payee Holds</span>
          <span className="text-lg font-serif font-bold text-[#0F1B2D]">{holds.length} Payees (₹21,500)</span>
          <p className="text-[11px] text-[#A0A7B4] mt-0.5">Cooling periods & open disputes</p>
        </div>
        <div className="p-4 rounded-xl border border-[#E5E1D8] bg-white shadow-xs">
          <span className="text-[11px] text-[#4A5568] block">Refund Queue</span>
          <span className="text-lg font-serif font-bold text-[#0F1B2D]">{refunds.length} Requests</span>
          <p className="text-[11px] text-[#A0A7B4] mt-0.5">All within 48h turnaround SLA</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <TabBar tabs={tabs} active={activeTab} onChange={setActiveTab} />
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Tab 1: Payout Batches                                              */}
      {/* ------------------------------------------------------------------ */}
      {activeTab === 'batches' && (
        <Card title="Scheduled & Historic Disbursement Batches" titleIcon={Banknote}>
          <ResponsiveTable>
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF8F4] text-[#4A5568] border-b border-[#E5E1D8]">
                <tr>
                  <th className="py-3 px-4 font-medium">Batch ID & Date</th>
                  <th className="py-3 px-4 font-medium">Status</th>
                  <th className="py-3 px-4 font-medium">Payees</th>
                  <th className="py-3 px-4 font-medium">Gross Amount</th>
                  <th className="py-3 px-4 font-medium">Platform Fee</th>
                  <th className="py-3 px-4 font-medium">TDS (10%)</th>
                  <th className="py-3 px-4 font-medium">Net Disbursed</th>
                  <th className="py-3 px-4 font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E1D8]">
                {batches.map((b) => (
                  <tr key={b.id} className="hover:bg-[#FAF8F4]/50">
                    <td className="py-3 px-4 font-medium text-[#0F1B2D]">
                      <div>{b.id}</div>
                      <span className="text-[11px] text-[#A0A7B4] font-normal">{b.runDate}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded font-semibold ${
                        b.status === 'Ready for Approval'
                          ? 'bg-[#FDF3E0] text-[#9A6210]'
                          : 'bg-[#E7F3EC] text-[#286749]'
                      }`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-[#0F1B2D]">{b.payeesCount} mentors</td>
                    <td className="py-3 px-4 text-[#0F1B2D] font-mono">{b.grossAmount}</td>
                    <td className="py-3 px-4 text-[#4A5568] font-mono">{b.commission}</td>
                    <td className="py-3 px-4 text-[#4A5568] font-mono">{b.tdsDeducted}</td>
                    <td className="py-3 px-4 text-[#0F1B2D] font-mono font-bold">{b.netAmount}</td>
                    <td className="py-3 px-4">
                      <Link
                        href={`/admin/payouts/batches/${b.id}`}
                        className="text-[#B8955A] hover:underline font-medium inline-flex items-center gap-1"
                      >
                        <span>View Batch</span>
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
      {/* Tab 2: Refunds                                                     */}
      {/* ------------------------------------------------------------------ */}
      {activeTab === 'refunds' && (
        <Card title="Pending & Processed Customer Refunds" titleIcon={RotateCcw}>
          <ResponsiveTable>
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF8F4] text-[#4A5568] border-b border-[#E5E1D8]">
                <tr>
                  <th className="py-3 px-4 font-medium">Refund ID</th>
                  <th className="py-3 px-4 font-medium">Beneficiary</th>
                  <th className="py-3 px-4 font-medium">Amount</th>
                  <th className="py-3 px-4 font-medium">Reason</th>
                  <th className="py-3 px-4 font-medium">Type</th>
                  <th className="py-3 px-4 font-medium">Status</th>
                  <th className="py-3 px-4 font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E1D8]">
                {refunds.map((rf) => (
                  <tr key={rf.id} className="hover:bg-[#FAF8F4]/50">
                    <td className="py-3 px-4 font-mono font-bold text-[#0F1B2D]">{rf.id}</td>
                    <td className="py-3 px-4 text-[#0F1B2D]">{rf.user}</td>
                    <td className="py-3 px-4 font-mono font-bold text-[#0F1B2D]">{rf.amount}</td>
                    <td className="py-3 px-4 text-[#4A5568] max-w-xs">{rf.reason}</td>
                    <td className="py-3 px-4 text-[#4A5568]">{rf.type}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded font-medium ${
                        rf.status === 'Approved' || rf.status === 'Completed'
                          ? 'bg-[#E7F3EC] text-[#286749]'
                          : 'bg-[#FDF3E0] text-[#9A6210]'
                      }`}>
                        {rf.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button
                        type="button"
                        onClick={() => toast(`Processing action on ${rf.id}`)}
                        className="text-[#B8955A] hover:underline font-medium"
                      >
                        Review
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </ResponsiveTable>
        </Card>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* Tab 3: Active Payee Holds                                          */}
      {/* ------------------------------------------------------------------ */}
      {activeTab === 'holds' && (
        <Card title="Active Payout Holds & Safety Freezes" titleIcon={ShieldAlert}>
          <div className="space-y-3">
            {holds.map((h) => (
              <div key={h.id} className="p-4 rounded-xl border border-[#E5E1D8] bg-[#FAF8F4] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono font-bold text-[#0F1B2D]">{h.id}</span>
                    <span className="font-semibold text-[#0F1B2D]">{h.payee}</span>
                    <span className="px-2 py-0.2 rounded bg-[#FDF3E0] text-[#9A6210] font-semibold text-[10px]">
                      {h.status}
                    </span>
                  </div>
                  <p className="text-xs text-[#4A5568]">{h.reason}</p>
                  <span className="text-[11px] text-[#A0A7B4] mt-1 block">Holding: {h.expiresIn}</span>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-base font-serif font-bold text-[#0F1B2D]">{h.amount}</span>
                  <Btn small secondary onClick={() => toast(`Release hold ${h.id} requires senior supervisor approval`)}>
                    Review Hold
                  </Btn>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* Tab 4: Tax Paperwork                                               */}
      {/* ------------------------------------------------------------------ */}
      {activeTab === 'tax' && (
        <Card title="Statutory TDS Deduction Ledger & Form 16A" titleIcon={FileCheck}>
          <div className="space-y-4 text-xs">
            <p className="text-[#4A5568] leading-relaxed">
              In accordance with Section 194J of the Indian Income Tax Act, 10% TDS is deducted on professional mentorship advisory services rendered.
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="p-4 rounded-xl border border-[#E5E1D8] bg-[#FAF8F4]">
                <span className="text-[11px] text-[#4A5568] block">Current FY TDS Collected</span>
                <span className="text-xl font-serif font-bold text-[#0F1B2D]">₹14,82,400</span>
                <p className="text-[11px] text-[#A0A7B4] mt-1">Across 380 active mentors</p>
              </div>
              <div className="p-4 rounded-xl border border-[#E5E1D8] bg-[#FAF8F4]">
                <span className="text-[11px] text-[#4A5568] block">Next Quarterly Challan 281 Due</span>
                <span className="text-xl font-serif font-bold text-[#0F1B2D]">07 Jan 2027</span>
                <p className="text-[11px] text-[#286749] mt-1">Reconciliation on track</p>
              </div>
              <div className="p-4 rounded-xl border border-[#E5E1D8] bg-[#FAF8F4]">
                <span className="text-[11px] text-[#4A5568] block">Form 16A Certificates Issued</span>
                <span className="text-xl font-serif font-bold text-[#0F1B2D]">100% Dispatched</span>
                <p className="text-[11px] text-[#A0A7B4] mt-1">Q2 certificates generated</p>
              </div>
            </div>
          </div>
        </Card>
      )}
    </AdminShell>
  );
}
