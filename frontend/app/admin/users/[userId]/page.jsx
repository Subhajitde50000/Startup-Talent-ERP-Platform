'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  User,
  Shield,
  Key,
  Clock,
  Ban,
  CheckCircle2,
  Mail,
  AlertTriangle,
  RotateCcw,
} from 'lucide-react';
import { AdminShell } from '@/components';
import {
  Card,
  Btn,
  toast,
} from '@/components/admin-ui';
import { initialUsers } from '../users-data';

export default function UserDetailPage({ params }) {
  const router = useRouter();
  const userId = params?.userId || 'usr_101';
  const existing = initialUsers.find((u) => u.id === userId) || initialUsers[0];

  const userName = existing.displayName || existing.name || 'User Profile';
  const userEmail = existing.email || `${existing.id}@platform.in`;
  const userRole = existing.role || (existing.roles ? existing.roles.join(', ') : 'Platform User');
  const userJoined = existing.joined || existing.createdAt || '2026-08-14';

  const [status, setStatus] = useState(existing.status);

  const handleToggleSuspend = () => {
    if (status === 'active') {
      setStatus('suspended');
      toast(`User ${userName} suspended (Access revoked)`);
    } else {
      setStatus('active');
      toast(`User ${userName} reactivated`);
    }
  };

  const handleReset2FA = () => {
    toast(`Two-factor authentication reset link dispatched to ${userEmail}`);
  };

  return (
    <AdminShell active="Users & Orgs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-[#E5E1D8] pb-5">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/users"
            className="p-2 rounded-lg border border-[#E5E1D8] bg-white text-[#4A5568] hover:text-[#0F1B2D] transition"
            title="Back to Users"
          >
            <ArrowLeft size={16} />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-[#B8955A]">{existing.id}</span>
              <span className={`px-2 py-0.2 rounded text-[10px] font-semibold ${
                status === 'active' ? 'bg-[#E7F3EC] text-[#286749]' : 'bg-[#FBE9E7] text-[#B42318]'
              }`}>
                {status.toUpperCase()}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#0F1B2D]">
              {userName}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Btn
            secondary
            destructive={status === 'active'}
            icon={Ban}
            onClick={handleToggleSuspend}
          >
            {status === 'active' ? 'Suspend Account' : 'Reactivate Account'}
          </Btn>
          <Btn small secondary icon={Key} onClick={handleReset2FA}>
            Reset 2FA
          </Btn>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main User Identity & Roles (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          <Card title="User Identity & Authentication" titleIcon={User}>
            <div className="space-y-3 text-xs">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="p-3 rounded-lg bg-[#FAF8F4] border border-[#E5E1D8]">
                  <span className="text-[#4A5568] block mb-1">Primary Email</span>
                  <span className="font-semibold text-[#0F1B2D]">{userEmail}</span>
                </div>
                <div className="p-3 rounded-lg bg-[#FAF8F4] border border-[#E5E1D8]">
                  <span className="text-[#4A5568] block mb-1">Platform Role</span>
                  <span className="font-semibold text-[#0F1B2D]">{userRole}</span>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="p-3 rounded-lg bg-[#FAF8F4] border border-[#E5E1D8]">
                  <span className="text-[#4A5568] block mb-1">Organization Affiliation</span>
                  <span className="font-semibold text-[#0F1B2D]">{existing.org}</span>
                </div>
                <div className="p-3 rounded-lg bg-[#FAF8F4] border border-[#E5E1D8]">
                  <span className="text-[#4A5568] block mb-1">Account Created Date</span>
                  <span className="font-mono text-[#0F1B2D]">{userJoined}</span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[#FAF8F4] border border-[#E5E1D8]">
                <span className="text-[#4A5568] block mb-1">Last Active Timestamp & IP</span>
                <span className="font-mono text-[#0F1B2D]">{existing.lastActive} · IP: 103.21.244.18 (Bengaluru)</span>
              </div>
            </div>
          </Card>

          <Card title="Active Authenticated Sessions" titleIcon={Shield}>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-3 rounded-lg border border-[#E5E1D8] bg-white">
                <div>
                  <span className="font-semibold text-[#0F1B2D]">Chrome 124 on macOS (Current Session)</span>
                  <span className="text-[11px] text-[#A0A7B4] block">Signed in via Google SSO · Active now</span>
                </div>
                <Btn small secondary onClick={() => toast('Session terminated')}>
                  Revoke
                </Btn>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border border-[#E5E1D8] bg-white">
                <div>
                  <span className="font-semibold text-[#0F1B2D]">Mobile App on Android 14</span>
                  <span className="text-[11px] text-[#A0A7B4] block">Device token registered 3 days ago</span>
                </div>
                <Btn small secondary onClick={() => toast('Session terminated')}>
                  Revoke
                </Btn>
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar Context */}
        <div className="space-y-4 text-xs">
          <Card title="Verification & Security Standing">
            <div className="space-y-3">
              <div className="flex justify-between py-1.5 border-b border-[#E5E1D8]">
                <span className="text-[#4A5568]">KYC Attestation</span>
                <span className="text-[#286749] font-bold">Verified (MCA Deed)</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#E5E1D8]">
                <span className="text-[#4A5568]">2FA Enforcement</span>
                <span className="text-[#286749] font-medium">FIDO2 Security Key</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#E5E1D8]">
                <span className="text-[#4A5568]">Open Flagged Reports</span>
                <span className="font-bold text-[#0F1B2D]">0 Reports</span>
              </div>
            </div>
          </Card>

          <Card title="Audit Log Link">
            <p className="text-[#4A5568] leading-relaxed mb-3">
              Inspect all actions performed by or on this account in the immutable platform log.
            </p>
            <Link
              href={`/admin/audit?actor=${existing.email}`}
              className="text-[#B8955A] font-medium hover:underline inline-flex items-center gap-1"
            >
              <span>View User Audit Entries</span>
              <ArrowLeft size={12} className="rotate-180" />
            </Link>
          </Card>
        </div>
      </div>
    </AdminShell>
  );
}
