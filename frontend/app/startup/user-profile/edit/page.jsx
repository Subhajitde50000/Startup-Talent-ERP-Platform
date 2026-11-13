'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Camera,
  Upload,
  User,
  Building2,
  MapPin,
  Mail,
  Phone,
  GraduationCap,
  Briefcase,
  FileText,
  Linkedin,
  Twitter,
  Github,
  Globe,
  CheckCircle2,
  ArrowLeft,
  Save,
  Trash2,
  Sparkles,
  ShieldCheck,
  Eye,
  Scale,
} from 'lucide-react';
import { StartupShell } from '@/components';

export default function StartupUserProfileEditPage() {
  const router = useRouter();
  const fileInputRef = useRef(null);
  const [toast, setToast] = useState('');

  const notify = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  // Form State
  const [formData, setFormData] = useState({
    name: 'Aarav Kapoor',
    title: 'Founder & Chief Executive Officer',
    company: 'FinFlow Technologies Pvt Ltd',
    dinNumber: 'DIN: 08942119',
    location: 'Pune & Bengaluru, India',
    email: 'aarav.kapoor@finflow.in',
    phone: '+91 98230 44102',
    education: 'B.Tech in Computer Science, IIT Bombay (2018)',
    priorRole: 'Ex-Lead Product Manager @ Razorpay (Disbursements)',
    bio: `Founder & CEO of FinFlow Technologies. Obsessed with solving cross-border GST invoicing, treasury friction, and automated supplier reconciliation for fast-growing Indian software startups.

Prior to FinFlow, I spent 4 years at Razorpay leading the Corporate Disbursements and Neo-Banking product pods, scaling payment volume from ₹50 Cr/mo to over ₹1,800 Cr/mo. Computer Science graduate from IIT Bombay.`,
    founderVision: `Indian B2B SaaS startups are competing on global stages, yet our back-office banking infrastructure remains bogged down by manual reconciliation, slow export remittance clearances, and complex tax compliance. At FinFlow, we are automating this entire treasury workflow from code to bank account.`,
    avatarUrl: '', // Uploaded image data URL or empty
    avatarInitials: 'AK',
    avatarBg: '#0F1B2D',
    linkedin: 'https://linkedin.com/in/aaravkapoor-finflow',
    twitter: 'https://x.com/aarav_kapoor',
    github: 'https://github.com/aarav-finflow',
    personalSite: 'https://aaravkapoor.me',
    publicInDirectory: true,
    allowInvestorOutreach: true,
  });

  // Handle DP Photo Upload
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
        notify('Profile picture updated.');
      };
      reader.readAsDataURL(file);
    }
  };

  // Preset Avatars
  const presetColors = ['#0F1B2D', '#1E3A8A', '#065F46', '#7C2D12', '#4C1D95', '#831843'];

  const handleSave = (e) => {
    e.preventDefault();
    notify('Founder profile changes saved successfully.');
    setTimeout(() => {
      router.push('/startup/user-profile');
    }, 1200);
  };

  return (
    <StartupShell
      active="Founder Profile"
      title="Edit Founder Personal Profile"
      description="Update your founder personal bio, profile picture (DP), executive credentials, and public visibility."
      backHref="/startup/user-profile"
      backLabel="← Personal Profile"
    >
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        {toast && (
          <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-lg bg-[#0F1B2D] px-4 py-3 text-xs font-semibold text-white shadow-xl animate-in fade-in">
            <CheckCircle2 size={16} className="text-[#B8955A]" />
            <span>{toast}</span>
          </div>
        )}

        {/* Back Link & Header */}
        <div className="mb-6 flex items-center justify-between border-b border-[#E5E1D8] pb-4">
          <div>
            <Link
              href="/startup/user-profile"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5A6E85] hover:text-[#0F1B2D] transition mb-1"
            >
              <ArrowLeft size={14} /> Back to Personal Profile
            </Link>
            <h1 className="font-serif text-2xl font-bold text-[#0F1B2D]">
              Edit Founder Personal Profile
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/startup/user-profile">
              <button
                type="button"
                className="rounded-lg border border-[#E5E1D8] bg-white px-4 py-2 text-xs font-semibold text-[#5A6E85] hover:bg-[#FAF8F4] transition shadow-xs"
              >
                Cancel
              </button>
            </Link>
            <button
              type="submit"
              form="founder-edit-form"
              className="flex items-center gap-1.5 rounded-lg bg-[#0F1B2D] px-5 py-2 text-xs font-bold text-white hover:bg-[#1C2B42] transition shadow-xs"
            >
              <Save size={14} className="text-[#B8955A]" />
              Save Profile
            </button>
          </div>
        </div>

        <form id="founder-edit-form" onSubmit={handleSave} className="space-y-8">
          {/* SECTION 1: PROFILE PICTURE (DP) */}
          <div className="rounded-2xl border border-[#E5E1D8] bg-white p-6 shadow-sm">
            <h2 className="font-serif text-base font-bold text-[#0F1B2D] mb-1 flex items-center gap-2">
              <Camera size={18} className="text-[#B8955A]" />
              Profile Picture (Display Picture)
            </h2>
            <p className="text-xs text-[#5A6E85] mb-5">
              Upload a high-resolution headshot or customize your monogram avatar. Appears on your founder profile, community answers, and deals.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              {/* DP Preview */}
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
                    <span>{formData.avatarInitials || 'AK'}</span>
                  )}
                </div>

                {/* Overlay trigger */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity text-white"
                  title="Upload new photo"
                >
                  <Camera size={22} />
                </button>
              </div>

              {/* Upload Controls */}
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
                    Upload New Photo
                  </button>

                  {formData.avatarUrl && (
                    <button
                      type="button"
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, avatarUrl: '' }));
                        notify('Custom photo removed. Reverted to monogram.');
                      }}
                      className="flex items-center gap-1 rounded-lg border border-rose-200 px-3 py-1.5 text-xs font-semibold text-rose-700 hover:bg-rose-50 transition"
                    >
                      <Trash2 size={13} />
                      Remove Photo
                    </button>
                  )}
                </div>
                <p className="text-[11px] text-[#7B8CA3]">
                  Recommended: Square JPG or PNG, at least 400x400px (Max 5MB).
                </p>

                {/* Avatar Color Palette (when photo is not active) */}
                <div className="flex items-center justify-center sm:justify-start gap-1.5 pt-1">
                  <span className="text-[11px] font-semibold text-[#5A6E85] mr-1">Monogram Color:</span>
                  {presetColors.map((col) => (
                    <button
                      key={col}
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, avatarBg: col }))}
                      className={`h-5 w-5 rounded-full border-2 transition ${
                        formData.avatarBg === col ? 'border-[#0F1B2D] scale-110' : 'border-white'
                      }`}
                      style={{ backgroundColor: col }}
                      title={`Select ${col}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 2: BASIC FOUNDER DETAILS */}
          <div className="rounded-2xl border border-[#E5E1D8] bg-white p-6 shadow-sm space-y-4">
            <h2 className="font-serif text-base font-bold text-[#0F1B2D] mb-1 flex items-center gap-2">
              <User size={18} className="text-[#B8955A]" />
              Founder Information
            </h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7B8CA3] mb-1">
                  Full Name *
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
                  Executive Role / Title *
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
                  Associated Company
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    disabled
                    value={formData.company}
                    className="w-full rounded-lg border border-[#E5E1D8] bg-[#FAF8F4] px-3 py-2 text-xs font-semibold text-[#0F1B2D] cursor-not-allowed"
                  />
                  <Link href="/startup/profile" className="text-xs text-[#B8955A] hover:underline whitespace-nowrap">
                    Company Profile →
                  </Link>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7B8CA3] mb-1">
                  MCA Director Identification Number (DIN)
                </label>
                <input
                  type="text"
                  value={formData.dinNumber}
                  onChange={(e) => setFormData({ ...formData, dinNumber: e.target.value })}
                  placeholder="e.g. DIN: 08942119"
                  className="w-full rounded-lg border border-[#E5E1D8] px-3 py-2 text-xs text-[#0F1B2D] focus:border-[#0F1B2D] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7B8CA3] mb-1">
                  Location (City & Base)
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full rounded-lg border border-[#E5E1D8] px-3 py-2 text-xs text-[#0F1B2D] focus:border-[#0F1B2D] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7B8CA3] mb-1">
                  Primary Email
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

          {/* SECTION 3: BIO & FOUNDER VISION */}
          <div className="rounded-2xl border border-[#E5E1D8] bg-white p-6 shadow-sm space-y-4">
            <h2 className="font-serif text-base font-bold text-[#0F1B2D] mb-1 flex items-center gap-2">
              <Sparkles size={18} className="text-[#B8955A]" />
              Founder Biography & Vision
            </h2>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7B8CA3] mb-1">
                Personal Bio & Background
              </label>
              <textarea
                rows={5}
                required
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="w-full rounded-lg border border-[#E5E1D8] px-3.5 py-2.5 text-xs text-[#0F1B2D] leading-relaxed focus:border-[#0F1B2D] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7B8CA3] mb-1">
                Why I Built This Company (Founder Vision)
              </label>
              <textarea
                rows={4}
                value={formData.founderVision}
                onChange={(e) => setFormData({ ...formData, founderVision: e.target.value })}
                className="w-full rounded-lg border border-[#E5E1D8] px-3.5 py-2.5 text-xs text-[#0F1B2D] leading-relaxed focus:border-[#0F1B2D] focus:outline-none"
              />
            </div>
          </div>

          {/* SECTION 4: EDUCATION & PRIOR EXPERIENCE */}
          <div className="rounded-2xl border border-[#E5E1D8] bg-white p-6 shadow-sm space-y-4">
            <h2 className="font-serif text-base font-bold text-[#0F1B2D] mb-1 flex items-center gap-2">
              <GraduationCap size={18} className="text-[#B8955A]" />
              Alumni Networks & Prior Track Record
            </h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7B8CA3] mb-1">
                  Highest Degree & Alma Mater
                </label>
                <input
                  type="text"
                  value={formData.education}
                  onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                  placeholder="e.g. B.Tech Computer Science, IIT Bombay (2018)"
                  className="w-full rounded-lg border border-[#E5E1D8] px-3 py-2 text-xs text-[#0F1B2D] focus:border-[#0F1B2D] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7B8CA3] mb-1">
                  Prior Key Experience / Ex-Company
                </label>
                <input
                  type="text"
                  value={formData.priorRole}
                  onChange={(e) => setFormData({ ...formData, priorRole: e.target.value })}
                  placeholder="e.g. Ex-Lead PM @ Razorpay"
                  className="w-full rounded-lg border border-[#E5E1D8] px-3 py-2 text-xs text-[#0F1B2D] focus:border-[#0F1B2D] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* SECTION 5: SOCIAL CHANNELS */}
          <div className="rounded-2xl border border-[#E5E1D8] bg-white p-6 shadow-sm space-y-4">
            <h2 className="font-serif text-base font-bold text-[#0F1B2D] mb-1 flex items-center gap-2">
              <Globe size={18} className="text-[#B8955A]" />
              Public Verification Links
            </h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7B8CA3] mb-1">
                  LinkedIn URL
                </label>
                <input
                  type="url"
                  value={formData.linkedin}
                  onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                  className="w-full rounded-lg border border-[#E5E1D8] px-3 py-2 text-xs text-[#0F1B2D] focus:border-[#0F1B2D] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7B8CA3] mb-1">
                  Twitter / X Profile
                </label>
                <input
                  type="url"
                  value={formData.twitter}
                  onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                  className="w-full rounded-lg border border-[#E5E1D8] px-3 py-2 text-xs text-[#0F1B2D] focus:border-[#0F1B2D] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7B8CA3] mb-1">
                  GitHub Profile
                </label>
                <input
                  type="url"
                  value={formData.github}
                  onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                  className="w-full rounded-lg border border-[#E5E1D8] px-3 py-2 text-xs text-[#0F1B2D] focus:border-[#0F1B2D] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7B8CA3] mb-1">
                  Personal Website / Blog
                </label>
                <input
                  type="url"
                  value={formData.personalSite}
                  onChange={(e) => setFormData({ ...formData, personalSite: e.target.value })}
                  className="w-full rounded-lg border border-[#E5E1D8] px-3 py-2 text-xs text-[#0F1B2D] focus:border-[#0F1B2D] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* SAVE BUTTON FOOTER */}
          <div className="flex items-center justify-between rounded-2xl border border-[#E5E1D8] bg-white p-4 shadow-sm">
            <span className="text-xs text-[#5A6E85]">
              Changes are saved to your personal founder record and reflected across verified role lounges.
            </span>
            <div className="flex items-center gap-2">
              <Link href="/startup/user-profile">
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
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </StartupShell>
  );
}
