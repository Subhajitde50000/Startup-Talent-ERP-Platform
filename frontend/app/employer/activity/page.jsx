'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  EmployerShell,
  EmployerBtn,
  EmployerCard,
  StageChip,
  EmployerSafetyStrip as SafetyStrip,
} from '@/components';
import { auditLog as initialAuditLog } from '@/app/employer/employer-data';
import {
  Activity,
  CheckCircle2,
  Clock,
  Download,
  Filter,
  Lock,
  Search,
  Shield,
  User,
  X,
  Eye,
} from 'lucide-react';

export default function EmployerActivityPage() {
  const [activeTab, setActiveTab] = useState('All activity');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState('30 days');
  const [toastMessage, setToastMessage] = useState(null);
  const [selectedEntry, setSelectedEntry] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const filteredLogs = useMemo(() => {
    return initialAuditLog.filter((item) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesAction = item.action?.toLowerCase().includes(q);
        const matchesActor = item.actor?.toLowerCase().includes(q);
        const matchesTarget = item.target?.toLowerCase().includes(q);
        if (!matchesAction && !matchesActor && !matchesTarget) return false;
      }
      if (activeTab === 'Candidate data access' && !item.action.toLowerCase().includes('view') && !item.action.toLowerCase().includes('download')) {
        return false;
      }
      if (activeTab === 'Offers and hires' && !item.action.toLowerCase().includes('offer') && !item.action.toLowerCase().includes('hire')) {
        return false;
      }
      return true;
    });
  }, [searchQuery, activeTab]);

  const tabs = [
    'All activity',
    'Candidate data access',
    'Hiring actions',
    'Offers and hires',
    'Security',
  ];

  return (
    <EmployerShell active="/employer/activity">
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

      {/* Detail Drawer / Modal */}
      {selectedEntry && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="audit-detail-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        >
          <div className="w-full max-w-lg rounded-2xl border border-[#E5E1D8] bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E1D8]">
              <div>
                <h3 id="audit-detail-title" className="text-base font-semibold text-[#0F1B2D]">
                  Audit Event Details
                </h3>
                <p className="text-xs text-[#4A5568]">ID: {selectedEntry.id || 'EVT-9042'}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedEntry(null)}
                className="text-[#4A5568] hover:text-[#0F1B2D]"
                aria-label="Close dialog"
              >
                <X size={18} />
              </button>
            </div>
            <div className="mt-4 space-y-3 text-xs">
              <div className="flex justify-between py-1.5 border-b border-[#E5E1D8]">
                <span className="text-[#4A5568]">Action Performed:</span>
                <span className="font-semibold text-[#0F1B2D]">{selectedEntry.action}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#E5E1D8]">
                <span className="text-[#4A5568]">Authorized Actor:</span>
                <span className="font-semibold text-[#0F1B2D]">{selectedEntry.actor}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#E5E1D8]">
                <span className="text-[#4A5568]">Target Object:</span>
                <span className="font-semibold text-[#806236]">{selectedEntry.target}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#E5E1D8]">
                <span className="text-[#4A5568]">Timestamp:</span>
                <span className="text-[#0F1B2D]">{selectedEntry.time}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-[#4A5568]">Security Context:</span>
                <span className="font-mono text-emerald-700">Authenticated via TLS 1.3 / MFA</span>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <EmployerBtn variant="primary" size="sm" onClick={() => setSelectedEntry(null)}>
                Dismiss
              </EmployerBtn>
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-[1280px] space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F1B2D]">
              Activity & Compliance Audit Log
            </h1>
            <p className="text-xs sm:text-sm text-[#4A5568]">
              Immutable audit trail recording all recruiter actions, candidate data views, and hiring decisions.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <EmployerBtn
              variant="secondary"
              size="sm"
              onClick={() => showToast('Full audit log CSV exported.')}
            >
              <Download size={14} className="mr-1.5" /> Export Audit Log
            </EmployerBtn>
          </div>
        </div>

        {/* Filter bar */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-[#E5E1D8] pb-3">
          <div className="flex gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {tabs.map((tab) => {
              const active = activeTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium transition ${
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

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search size={14} className="absolute left-2.5 top-2 text-[#4A5568]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search audit trail..."
                className="w-40 sm:w-48 rounded-lg border border-[#E5E1D8] pl-8 pr-2.5 py-1 text-xs text-[#0F1B2D] focus:border-[#B8955A] focus:outline-none"
              />
            </div>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="rounded-lg border border-[#E5E1D8] bg-white px-2.5 py-1 text-xs text-[#0F1B2D] focus:border-[#B8955A] focus:outline-none"
            >
              <option value="7 days">Last 7 days</option>
              <option value="30 days">Last 30 days</option>
              <option value="90 days">Last 90 days</option>
            </select>
          </div>
        </div>

        {/* Audit Log Table */}
        <div className="overflow-x-auto rounded-2xl border border-[#E5E1D8] bg-white shadow-sm">
          <table className="w-full text-left text-xs min-w-[540px]">
            <thead className="bg-[#FAF8F4] text-[#4A5568] border-b border-[#E5E1D8]">
              <tr>
                <th className="px-4 py-3 font-semibold">Action</th>
                <th className="px-4 py-3 font-semibold">Actor</th>
                <th className="px-4 py-3 font-semibold">Target Object</th>
                <th className="px-4 py-3 font-semibold">Timestamp</th>
                <th className="px-4 py-3 font-semibold text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E1D8]">
              {filteredLogs.map((entry, idx) => (
                <tr key={idx} className="hover:bg-[#FAF8F4]/50">
                  <td className="px-4 py-3">
                    <span className="font-semibold text-[#0F1B2D]">{entry.action}</span>
                  </td>
                  <td className="px-4 py-3 text-[#4A5568]">
                    <span className="inline-flex items-center gap-1 font-medium text-[#0F1B2D]">
                      <User size={12} className="text-[#806236]" /> {entry.actor}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[#4A5568]">{entry.target}</td>
                  <td className="px-4 py-3 text-[#4A5568]">{entry.time}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => setSelectedEntry(entry)}
                      className="inline-flex items-center gap-1 text-[#806236] hover:underline"
                    >
                      <Eye size={12} /> Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </EmployerShell>
  );
}
