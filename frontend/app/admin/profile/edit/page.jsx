'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Camera,
  Upload,
  User,
  ShieldCheck,
  KeyRound,
  Lock,
  MapPin,
  Mail,
  Phone,
  Terminal,
  Activity,
  CheckCircle2,
  ArrowLeft,
  Save,
  Trash2,
  Fingerprint,
} from 'lucide-react';
import { AdminShell } from '@/components';

export default function AdminProfileEditPage() {
  const router = useRouter();
  const fileInputRef = useRef(null);
  const [toast, setToast] = useState('');

  const notify = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const [formData, setFormData] = useState({
    name: 'Alex Kumar',
    handle: 'alex_superadmin',
    title: 'Lead Platform Administrator & System Auditor',
    department: 'Trust, Safety & Infrastructure Operations',
    organization: 'Startup Talent ERP Platform',
    adminId: 'ADM-ROOT-2026-001',
    email: 'alex.kumar@platform.internal',
    emergencyPhone: '+91 99011 88204 (Encrypted On-Call)',
    avatarUrl: '',
    avatarInitials: 'AK',
    avatarBg: '#0F1B2D',
    securityClearance: 'Level 3 (Root Superuser)',
    twoFactorStatus: 'Hardware FIDO2 / YubiKey 5C Enforced',
    ipWhitelisted: '103.21.244.18 (Bengaluru Operations Hub)',
    sessionTimeout: '8 hours automatic re-authentication',
    notificationThreshold: 'P0 & P1 Critical System Incident Pages',
  });

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        notify('Please select an image smaller than 5MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          avatarUrl: reader.result,
        }));
        notify('Operator security picture updated.');
      };
      reader.readAsDataURL(file);
    }
  };

  const presetColors = ['#0F1B2D', '#1E3A8A', '#065F46', '#7C2D12', '#4C1D95', '#831843'];

  const handleSave = (e) => {
    e.preventDefault();
    notify('Administrator security profile saved successfully.');
    setTimeout(() => {
      router.push('/admin/profile');
    }, 1200);
  };

  return (
    <AdminShell active="Profile" activeNav="Administrator Profile">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        {toast && (
          <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-lg bg-[#0F1B2D] px-4 py-3 text-xs font-semibold text-white shadow-xl animate-in fade-in">
            <CheckCircle2 size={16} className="text-[#B8955A]" />
            <span>{toast}</span>
          </div>
        )}

        {/* Top Header */}
        <div className="mb-6 flex items-center justify-between border-b border-[#E5E1D8] pb-4">
          <div>
            <Link
              href="/admin/profile"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5A6E85] hover:text-[#0F1B2D] transition mb-1"
            >
              <ArrowLeft size={14} /> Back to Administrator Profile
            </Link>
            <h1 className="font-serif text-2xl font-bold text-[#0F1B2D]">
              Edit Administrator Security Profile
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/admin/profile">
              <button
                type="button"
                className="rounded-lg border border-[#E5E1D8] bg-white px-4 py-2 text-xs font-semibold text-[#5A6E85] hover:bg-[#FAF8F4] transition shadow-xs"
              >
                Cancel
              </button>
            </Link>
            <button
              type="submit"
              form="admin-edit-form"
              className="flex items-center gap-1.5 rounded-lg bg-[#0F1B2D] px-5 py-2 text-xs font-bold text-white hover:bg-[#1C2B42] transition shadow-xs"
            >
              <Save size={14} className="text-[#B8955A]" />
              Save Profile
            </button>
          </div>
        </div>

        <form id="admin-edit-form" onSubmit={handleSave} className="space-y-8">
          {/* SECTION 1: PROFILE PICTURE (DP) */}
          <div className="rounded-2xl border border-[#E5E1D8] bg-white p-6 shadow-sm">
            <h2 className="font-serif text-base font-bold text-[#0F1B2D] mb-1 flex items-center gap-2">
              <Camera size={18} className="text-[#B8955A]" />
              Operator Security Avatar (DP)
            </h2>
            <p className="text-xs text-[#5A6E85] mb-5">
              Upload an authorized operator photo or configure security monogram initials. Recorded on cryptographic audit logs and user compliance actions.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="relative group">
                <div
                  className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full font-serif text-2xl font-bold text-white shadow-md border-2 border-white ring-2 ring-[#B8955A]/40"
                  style={{ backgroundColor: formData.avatarBg }}
                >
                  {formData.avatarUrl ? (
                    <img
                      src={formData.avatarUrl}
                      alt={formData.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span>{formData.avatarInitials}</span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity text-white"
                  title="Upload security picture"
                >
                  <Camera size={22} />
                </button>
              </div>

              <div className="space-y-3 text-center sm:text-left">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png, image/jpeg, image/webp"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-1.5 rounded-lg border border-[#0F1B2D] bg-[#0F1B2D] px-3.5 py-1.5 text-xs font-bold text-white hover:bg-[#1C2B42] transition shadow-xs"
                  >
                    <Upload size={13} className="text-[#B8955A]" />
                    Upload Photo
                  </button>

                  {formData.avatarUrl && (
                    <button
                      type="button"
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, avatarUrl: '' }));
                        notify('Photo removed.');
                      }}
                      className="flex items-center gap-1 rounded-lg border border-rose-200 px-3 py-1.5 text-xs font-semibold text-rose-700 hover:bg-rose-50 transition"
                    >
                      <Trash2 size={13} />
                      Remove
                    </button>
                  )}
                </div>
                <p className="text-[11px] text-[#7B8CA3]">Square format (Max 5MB).</p>

                <div className="flex items-center justify-center sm:justify-start gap-1.5 pt-1">
                  <span className="text-[11px] font-semibold text-[#5A6E85] mr-1">Security Monogram:</span>
                  {presetColors.map((col) => (
                    <button
                      key={col}
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, avatarBg: col }))}
                      className={`h-5 w-5 rounded-full border-2 transition ${
                        formData.avatarBg === col ? 'border-[#0F1B2D] scale-110' : 'border-white'
                      }`}
                      style={{ backgroundColor: col }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 2: ADMINISTRATOR IDENTITY */}
          <div className="rounded-2xl border border-[#E5E1D8] bg-white p-6 shadow-sm space-y-4">
            <h2 className="font-serif text-base font-bold text-[#0F1B2D] mb-1 flex items-center gap-2">
              <User size={18} className="text-[#B8955A]" />
              Operator Information
            </h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7B8CA3] mb-1">
                  Administrator Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-lg border border-[#E5E1D8] px-3 py-2 text-xs text-[#0F1B2D] focus:border-[#0F1B2D] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7B8CA3] mb-1">
                  Role Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full rounded-lg border border-[#E5E1D8] px-3 py-2 text-xs text-[#0F1B2D] focus:border-[#0F1B2D] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7B8CA3] mb-1">
                  Department / Pod
                </label>
                <input
                  type="text"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full rounded-lg border border-[#E5E1D8] px-3 py-2 text-xs text-[#0F1B2D] focus:border-[#0F1B2D] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7B8CA3] mb-1">
                  Operator Internal Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-lg border border-[#E5E1D8] px-3 py-2 text-xs text-[#0F1B2D] focus:border-[#0F1B2D] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* SECTION 3: SECURITY & ACCESS RESTRICTIONS */}
          <div className="rounded-2xl border border-[#E5E1D8] bg-white p-6 shadow-sm space-y-4">
            <h2 className="font-serif text-base font-bold text-[#0F1B2D] mb-1 flex items-center gap-2">
              <KeyRound size={18} className="text-[#B8955A]" />
              Access Posture & Ingress Restrictions
            </h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7B8CA3] mb-1">
                  Whitelisted IP Address Restriction
                </label>
                <input
                  type="text"
                  value={formData.ipWhitelisted}
                  onChange={(e) => setFormData({ ...formData, ipWhitelisted: e.target.value })}
                  className="w-full rounded-lg border border-[#E5E1D8] px-3 py-2 text-xs text-[#0F1B2D] focus:border-[#0F1B2D] focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7B8CA3] mb-1">
                  Session Re-authentication Policy
                </label>
                <input
                  type="text"
                  value={formData.sessionTimeout}
                  onChange={(e) => setFormData({ ...formData, sessionTimeout: e.target.value })}
                  className="w-full rounded-lg border border-[#E5E1D8] px-3 py-2 text-xs text-[#0F1B2D] focus:border-[#0F1B2D] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7B8CA3] mb-1">
                  Emergency On-Call Escalation Phone
                </label>
                <input
                  type="text"
                  value={formData.emergencyPhone}
                  onChange={(e) => setFormData({ ...formData, emergencyPhone: e.target.value })}
                  className="w-full rounded-lg border border-[#E5E1D8] px-3 py-2 text-xs text-[#0F1B2D] focus:border-[#0F1B2D] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7B8CA3] mb-1">
                  MFA Authentication Key
                </label>
                <input
                  type="text"
                  disabled
                  value={formData.twoFactorStatus}
                  className="w-full rounded-lg border border-[#E5E1D8] bg-[#FAF8F4] px-3 py-2 text-xs font-semibold text-[#0F1B2D] cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          {/* SUBMIT FOOTER */}
          <div className="flex items-center justify-between rounded-2xl border border-[#E5E1D8] bg-white p-4 shadow-sm">
            <span className="text-xs text-[#5A6E85]">
              Administrative preference updates are recorded in the immutable system audit trail.
            </span>
            <div className="flex items-center gap-2">
              <Link href="/admin/profile">
                <button
                  type="button"
                  className="rounded-lg border border-[#E5E1D8] px-4 py-2 text-xs font-semibold text-[#5A6E85] hover:bg-[#FAF8F4]"
                >
                  Cancel
                </button>
              </Link>
              <button
                type="submit"
                className="flex items-center gap-1.5 rounded-lg bg-[#0F1B2D] px-6 py-2 text-xs font-bold text-white hover:bg-[#1C2B42] transition shadow-xs"
              >
                <Save size={14} className="text-[#B8955A]" />
                Save Profile
              </button>
            </div>
          </div>
        </form>
      </div>
    </AdminShell>
  );
}
