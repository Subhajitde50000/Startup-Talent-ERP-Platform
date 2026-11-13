'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  User,
  ShieldCheck,
  KeyRound,
  Lock,
  Terminal,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Clock,
  MapPin,
  Share2,
  Edit3,
  ExternalLink,
  ShieldAlert,
  Sliders,
  Database,
  FileText,
  X,
  RefreshCw,
  LogOut,
  Fingerprint,
} from 'lucide-react';
import { AdminShell } from '@/components';

export default function AdminProfilePage() {
  const [toast, setToast] = useState('');
  const [activeTab, setActiveTab] = useState('security'); // 'security' | 'permissions' | 'audit' | 'escalation'
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const notify = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const [profile, setProfile] = useState({
    name: 'Alex Kumar',
    handle: 'alex_superadmin',
    title: 'Lead Platform Administrator & System Auditor',
    department: 'Trust, Safety & Infrastructure Operations',
    organization: 'Startup Talent ERP Platform',
    adminId: 'ADM-ROOT-2026-001',
    email: 'alex.kumar@platform.internal',
    avatar: 'AK',
    securityClearance: 'Level 3 (Root Superuser)',
    twoFactorStatus: 'Hardware FIDO2 / YubiKey 5C Enforced',
    ipWhitelisted: '103.21.244.18 (Bengaluru Operations Hub)',
    lastLogin: 'Today at 08:32 AM IST',
    passwordAge: 'Rotated 14 days ago (Policy: 60 days)',
    dpdpCertified: true,
    recentAuditActions: [
      { id: 'act_101', action: 'Approved Startup KYC Verification', target: 'FinFlow Technologies Pvt Ltd', time: '12m ago', status: 'Success' },
      { id: 'act_102', action: 'Calibrated AI Matching Weightings', target: 'Engineering Cohort v4.2', time: '2h ago', status: 'Success' },
      { id: 'act_103', action: 'Enforced Zero-Fee Policy Block', target: 'Flagged Job Posting #9921', time: '4h ago', status: 'Policy Enforced' },
      { id: 'act_104', action: 'DPDP Data Portability Export Executed', target: 'User #USR-8412 Data Subject Request', time: '1d ago', status: 'Success' },
      { id: 'act_105', action: 'Rotated Gateway Webhook Secrets', target: 'Stripe / Cashfree Ingress Node', time: '2d ago', status: 'Security Routine' },
    ],
    rbacScopes: [
      { module: 'User & Organization Governance', level: 'Full Admin', write: true, delete: true },
      { module: 'Financial Payouts & Escrow Release', level: 'Full Dual-Control Approval', write: true, delete: false },
      { module: 'Trust, Moderation & Blocklists', level: 'Super Moderator Override', write: true, delete: true },
      { module: 'DPDP & Compliance Audit Logs', level: 'Compliance Officer (Immutable Read/Export)', write: true, delete: false },
      { module: 'AI Quality & Model Calibration', level: 'MLOps Lead Calibration', write: true, delete: false },
    ],
  });

  const [formData, setFormData] = useState({ ...profile });

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setProfile({ ...formData });
    setIsEditModalOpen(false);
    notify('Administrator security preferences updated.');
  };

  return (
    <AdminShell active="Profile" activeNav="Administrator Profile">
      <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6">
        {toast && (
          <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-lg bg-[#0F1B2D] px-4 py-3 text-xs font-semibold text-white shadow-xl">
            <CheckCircle2 size={16} className="text-[#B8955A]" />
            <span>{toast}</span>
          </div>
        )}

        {/* Top Header */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-[#E5E1D8] pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#5A6E85]">
              <Link href="/admin/dashboard" className="hover:text-[#0F1B2D]">Admin Console</Link>
              <span>/</span>
              <span className="font-semibold text-[#0F1B2D]">Administrator Profile</span>
            </div>
            <h1 className="mt-1 font-serif text-2xl font-bold text-[#0F1B2D]">
              Administrator Profile & Security Credentials
            </h1>
          </div>

          <div className="flex items-center gap-2.5">
            <Link href="/admin/manual">
              <button className="flex items-center gap-1.5 rounded-lg border border-[#E5E1D8] bg-white px-3 py-1.5 text-xs font-semibold text-[#0F1B2D] hover:bg-[#FAF8F4] transition shadow-xs">
                <FileText size={13} className="text-[#B8955A]" />
                User Manual (PDF)
              </button>
            </Link>
            <Link href="/admin/profile/edit">
              <button
                type="button"
                className="flex items-center gap-1.5 rounded-lg bg-[#0F1B2D] px-4 py-1.5 text-xs font-semibold text-white hover:bg-[#1C2B42] transition shadow-xs"
              >
                <Edit3 size={13} className="text-[#B8955A]" />
                Security Settings
              </button>
            </Link>
          </div>
        </div>

        {/* Hero Card */}
        <div className="rounded-2xl border border-[#E5E1D8] bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-[#0F1B2D] font-serif text-2xl font-bold text-white shadow-md">
                {profile.avatar}
              </div>

              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-serif text-xl font-bold text-[#0F1B2D] sm:text-2xl">
                    {profile.name}
                  </h2>
                  <span className="flex items-center gap-1 rounded-full bg-[#0F1B2D] px-2.5 py-0.5 text-xs font-bold text-white border border-[#B8955A]">
                    <ShieldCheck size={13} className="text-[#B8955A]" /> Super Admin
                  </span>
                  <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-800 border border-emerald-200">
                    <Fingerprint size={13} /> {profile.securityClearance}
                  </span>
                </div>

                <p className="text-sm font-medium text-[#4A5568]">
                  {profile.title}
                </p>

                <div className="flex flex-wrap items-center gap-3 text-xs text-[#5A6E85]">
                  <span>{profile.department}</span>
                  <span>•</span>
                  <span className="font-mono text-[#7B8CA3]">ID: {profile.adminId}</span>
                  <span>•</span>
                  <span>{profile.email}</span>
                </div>
              </div>
            </div>

            {/* Quick Security Status Badge */}
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-4 text-xs space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                <KeyRound size={15} className="text-emerald-700" />
                <span>Authentication Posture</span>
              </div>
              <p className="font-medium text-emerald-800">{profile.twoFactorStatus}</p>
              <p className="text-[10px] text-emerald-700 font-mono">Whitelisted: {profile.ipWhitelisted}</p>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="mt-6 grid grid-cols-2 gap-3 border-t border-[#F2EFE9] pt-5 sm:grid-cols-4">
            <div className="rounded-xl bg-[#FAF8F4] p-3 text-center">
              <p className="font-serif text-xl font-bold text-[#0F1B2D]">1,280</p>
              <p className="text-[11px] text-[#5A6E85]">Immutable Audit Logs</p>
            </div>
            <div className="rounded-xl bg-[#FAF8F4] p-3 text-center">
              <p className="font-serif text-xl font-bold text-emerald-800">99.98%</p>
              <p className="text-[11px] text-[#5A6E85]">Platform Service Uptime</p>
            </div>
            <div className="rounded-xl bg-[#FAF8F4] p-3 text-center">
              <p className="font-serif text-xl font-bold text-[#0F1B2D]">34</p>
              <p className="text-[11px] text-[#5A6E85]">Verifications Approved</p>
            </div>
            <div className="rounded-xl bg-[#FAF8F4] p-3 text-center">
              <p className="font-serif text-xl font-bold text-emerald-800">0</p>
              <p className="text-[11px] text-[#5A6E85]">Active Security Alerts</p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mt-6 flex border-b border-[#E5E1D8] text-xs font-semibold">
          {[
            { id: 'security', label: 'Security & Session Posture' },
            { id: 'permissions', label: 'RBAC Authorization Scope' },
            { id: 'audit', label: 'Recent Operator Audit Trail' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`border-b-2 px-4 py-3 transition ${
                activeTab === tab.id
                  ? 'border-[#B8955A] text-[#0F1B2D] font-bold'
                  : 'border-transparent text-[#7B8CA3] hover:text-[#0F1B2D]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Security Posture */}
        {activeTab === 'security' && (
          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              <div className="rounded-2xl border border-[#E5E1D8] bg-white p-6 shadow-sm space-y-4">
                <h3 className="font-serif text-base font-bold text-[#0F1B2D] flex items-center gap-2">
                  <Lock size={16} className="text-[#B8955A]" />
                  Active Session & Key Management
                </h3>
                <div className="divide-y divide-[#F2EFE9] text-xs">
                  <div className="py-3 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-[#0F1B2D]">Multi-Factor Authentication (MFA)</p>
                      <p className="text-[#5A6E85]">Hardware security key registered</p>
                    </div>
                    <span className="rounded bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-800">Enforced</span>
                  </div>

                  <div className="py-3 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-[#0F1B2D]">Password Rotation Policy</p>
                      <p className="text-[#5A6E85]">{profile.passwordAge}</p>
                    </div>
                    <span className="rounded bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-800">Compliant</span>
                  </div>

                  <div className="py-3 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-[#0F1B2D]">Current Ingress IP Address</p>
                      <p className="text-[#5A6E85]">{profile.ipWhitelisted}</p>
                    </div>
                    <span className="rounded bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-800">Whitelisted</span>
                  </div>

                  <div className="py-3 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-[#0F1B2D]">Session Expiry Timeout</p>
                      <p className="text-[#5A6E85]">Automatic re-authentication required every 8 hours</p>
                    </div>
                    <button
                      onClick={() => notify('Current administrator session extended.')}
                      className="rounded border border-[#E5E1D8] px-2.5 py-1 text-[11px] font-semibold text-[#0F1B2D] hover:bg-[#FAF8F4]"
                    >
                      Extend Session
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-2xl border border-[#E5E1D8] bg-white p-5 shadow-sm space-y-3 text-xs">
                <h4 className="font-serif font-bold text-[#0F1B2D]">Quick Administration Links</h4>
                <div className="space-y-2">
                  <Link
                    href="/admin/settings"
                    className="flex items-center justify-between rounded-lg border border-[#E5E1D8] p-2 hover:border-[#0F1B2D] transition"
                  >
                    <span className="flex items-center gap-2 text-[#0F1B2D]">
                      <Sliders size={14} className="text-[#B8955A]" /> System Settings
                    </span>
                    <ExternalLink size={12} className="text-[#7B8CA3]" />
                  </Link>

                  <Link
                    href="/admin/audit"
                    className="flex items-center justify-between rounded-lg border border-[#E5E1D8] p-2 hover:border-[#0F1B2D] transition"
                  >
                    <span className="flex items-center gap-2 text-[#0F1B2D]">
                      <FileText size={14} className="text-[#B8955A]" /> Global Audit Trail
                    </span>
                    <ExternalLink size={12} className="text-[#7B8CA3]" />
                  </Link>

                  <Link
                    href="/admin/compliance"
                    className="flex items-center justify-between rounded-lg border border-[#E5E1D8] p-2 hover:border-[#0F1B2D] transition"
                  >
                    <span className="flex items-center gap-2 text-[#0F1B2D]">
                      <ShieldCheck size={14} className="text-emerald-700" /> DPDP Compliance Center
                    </span>
                    <ExternalLink size={12} className="text-[#7B8CA3]" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Permissions */}
        {activeTab === 'permissions' && (
          <div className="mt-6 rounded-2xl border border-[#E5E1D8] bg-white p-6 shadow-sm">
            <h3 className="font-serif text-base font-bold text-[#0F1B2D] mb-4 flex items-center gap-2">
              <KeyRound size={16} className="text-[#B8955A]" />
              Role-Based Access Control (RBAC) Matrix
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#E5E1D8] text-[11px] font-bold uppercase text-[#7B8CA3]">
                    <th className="pb-3">Module / Capability</th>
                    <th className="pb-3">Clearance Scope</th>
                    <th className="pb-3">Write / Execute</th>
                    <th className="pb-3">Hard Delete</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F2EFE9]">
                  {profile.rbacScopes.map((scope, i) => (
                    <tr key={i} className="hover:bg-[#FAF8F4]">
                      <td className="py-3 font-bold text-[#0F1B2D]">{scope.module}</td>
                      <td className="py-3 text-[#5A6E85]">{scope.level}</td>
                      <td className="py-3">
                        <span className="rounded bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                          {scope.write ? 'Granted' : 'Read-only'}
                        </span>
                      </td>
                      <td className="py-3">
                        <span className={`rounded px-2 py-0.5 text-[10px] font-bold ${scope.delete ? 'bg-amber-50 text-amber-800' : 'bg-zinc-100 text-zinc-600'}`}>
                          {scope.delete ? 'Superuser Allowed' : 'Restricted'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Recent Audit */}
        {activeTab === 'audit' && (
          <div className="mt-6 rounded-2xl border border-[#E5E1D8] bg-white p-6 shadow-sm">
            <h3 className="font-serif text-base font-bold text-[#0F1B2D] mb-4 flex items-center gap-2">
              <Activity size={16} className="text-[#B8955A]" />
              Recent Actions Executed by Operator
            </h3>
            <div className="divide-y divide-[#F2EFE9] text-xs">
              {profile.recentAuditActions.map((act) => (
                <div key={act.id} className="py-3.5 first:pt-0 last:pb-0 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-[#0F1B2D]">{act.action}</p>
                    <p className="text-[11px] text-[#5A6E85]">Target: {act.target}</p>
                  </div>
                  <div className="text-right">
                    <span className="rounded bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                      {act.status}
                    </span>
                    <p className="mt-0.5 text-[10px] text-[#7B8CA3]">{act.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* EDIT MODAL */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F1B2D]/60 p-4 backdrop-blur-sm animate-in fade-in">
          <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-[#E5E1D8] bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#F2EFE9] pb-3">
              <h3 className="font-serif text-lg font-bold text-[#0F1B2D]">
                Administrator Security Settings
              </h3>
              <button onClick={() => setIsEditModalOpen(false)} className="text-[#7B8CA3] hover:text-[#0F1B2D]">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7B8CA3] mb-1">
                  Operator Display Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-lg border border-[#E5E1D8] p-2 text-xs text-[#0F1B2D] focus:border-[#0F1B2D] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7B8CA3] mb-1">
                  Department / Security Role
                </label>
                <input
                  type="text"
                  required
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full rounded-lg border border-[#E5E1D8] p-2 text-xs text-[#0F1B2D] focus:border-[#0F1B2D] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7B8CA3] mb-1">
                  Whitelisted IP Address Restriction
                </label>
                <input
                  type="text"
                  value={formData.ipWhitelisted}
                  onChange={(e) => setFormData({ ...formData, ipWhitelisted: e.target.value })}
                  className="w-full rounded-lg border border-[#E5E1D8] p-2 text-xs text-[#0F1B2D] focus:border-[#0F1B2D] focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 border-t border-[#F2EFE9] pt-4">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="rounded-lg border border-[#E5E1D8] px-4 py-2 text-xs font-semibold text-[#5A6E85] hover:bg-[#FAF8F4]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-[#0F1B2D] px-5 py-2 text-xs font-bold text-white hover:bg-[#1C2B42]"
                >
                  Save Security Preferences
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminShell>
  );
}
