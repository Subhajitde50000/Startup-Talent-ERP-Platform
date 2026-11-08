'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  User,
  Shield,
  Bell,
  Eye,
  Sliders,
  CheckCircle2,
  Lock,
  Mail,
  Check,
} from 'lucide-react';
import { JobSeekerShell } from '@/components';
import {
  JobBtn,
  defaultUser,
} from '@/components/jobseeker-ui';

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('Profile');
  const [formData, setFormData] = useState({
    fullName: defaultUser.name,
    headline: defaultUser.headline,
    email: 'aanya.sen@example.com',
    phone: '+91 98765 43210',
    portfolioUrl: 'https://aanya.design',
    minCtc: '₹24,00,000 / yr',
    workMode: 'Remote & Hybrid',
    publicVisibility: true,
    hideCurrentEmployer: true,
    emailAlerts: true,
  });
  const [savedToast, setSavedToast] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2500);
  };

  return (
    <JobSeekerShell active="Dashboard">
      <div className="space-y-6 max-w-5xl pb-10">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-serif font-bold text-[#0F1B2D]">
              Job Seeker Settings
            </h1>
            <p className="text-xs md:text-sm text-[#6B7280] mt-1">
              Manage your candidate identity, visibility to startup founders, and career preferences.
            </p>
          </div>
        </div>

        {savedToast && (
          <div className="rounded-xl border border-[#CDE5D7] bg-[#E7F3EC] p-3 text-xs text-[#286749] flex items-center justify-between">
            <span className="flex items-center gap-2">
              <CheckCircle2 size={16} /> Preferences successfully updated.
            </span>
          </div>
        )}

        {/* 2-Column Settings Layout */}
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Navigation Sidebar */}
          <aside className="lg:col-span-3 space-y-1">
            {[
              { id: 'Profile', label: 'Candidate Profile', icon: User },
              { id: 'Preferences', label: 'Job Preferences', icon: Sliders },
              { id: 'Privacy', label: 'Privacy & Visibility', icon: Eye },
              { id: 'Notifications', label: 'Notifications', icon: Bell },
            ].map((item) => {
              const Comp = item.icon;
              const isSelected = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-left transition-colors ${
                    isSelected
                      ? 'bg-[#0F1B2D] text-white'
                      : 'text-[#4A5568] hover:bg-[#FAF8F4]'
                  }`}
                >
                  <Comp size={15} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </aside>

          {/* Form Content */}
          <main className="lg:col-span-9">
            <form onSubmit={handleSave} className="space-y-6">
              {activeSection === 'Profile' && (
                <section className="rounded-2xl border border-[#E5E1D8] bg-white p-6 shadow-sm space-y-4">
                  <h2 className="text-base font-serif font-bold text-[#0F1B2D]">
                    Public Candidate Identity
                  </h2>

                  <div className="space-y-3.5">
                    <div>
                      <label htmlFor="fullName" className="block text-xs font-semibold text-[#4A5568] mb-1">
                        Full Name
                      </label>
                      <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full h-10 px-3 rounded-lg border border-[#E5E1D8] text-xs text-[#0F1B2D] focus:border-[#B8955A] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label htmlFor="headline" className="block text-xs font-semibold text-[#4A5568] mb-1">
                        Professional Headline
                      </label>
                      <input
                        id="headline"
                        name="headline"
                        type="text"
                        value={formData.headline}
                        onChange={handleInputChange}
                        className="w-full h-10 px-3 rounded-lg border border-[#E5E1D8] text-xs text-[#0F1B2D] focus:border-[#B8955A] focus:outline-none"
                      />
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <label htmlFor="email" className="block text-xs font-semibold text-[#4A5568] mb-1">
                          Email Address
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full h-10 px-3 rounded-lg border border-[#E5E1D8] text-xs text-[#0F1B2D] focus:border-[#B8955A] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-xs font-semibold text-[#4A5568] mb-1">
                          Phone Number
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full h-10 px-3 rounded-lg border border-[#E5E1D8] text-xs text-[#0F1B2D] focus:border-[#B8955A] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="portfolioUrl" className="block text-xs font-semibold text-[#4A5568] mb-1">
                        Portfolio / Website URL
                      </label>
                      <input
                        id="portfolioUrl"
                        name="portfolioUrl"
                        type="url"
                        value={formData.portfolioUrl}
                        onChange={handleInputChange}
                        className="w-full h-10 px-3 rounded-lg border border-[#E5E1D8] text-xs text-[#0F1B2D] focus:border-[#B8955A] focus:outline-none"
                      />
                    </div>
                  </div>
                </section>
              )}

              {activeSection === 'Preferences' && (
                <section className="rounded-2xl border border-[#E5E1D8] bg-white p-6 shadow-sm space-y-4">
                  <h2 className="text-base font-serif font-bold text-[#0F1B2D]">
                    Target Compensation & Work Style
                  </h2>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="minCtc" className="block text-xs font-semibold text-[#4A5568] mb-1">
                        Desired Minimum Base CTC
                      </label>
                      <input
                        id="minCtc"
                        name="minCtc"
                        type="text"
                        value={formData.minCtc}
                        onChange={handleInputChange}
                        className="w-full h-10 px-3 rounded-lg border border-[#E5E1D8] text-xs text-[#0F1B2D] focus:border-[#B8955A] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label htmlFor="workMode" className="block text-xs font-semibold text-[#4A5568] mb-1">
                        Work Mode Preference
                      </label>
                      <select
                        id="workMode"
                        name="workMode"
                        value={formData.workMode}
                        onChange={handleInputChange}
                        className="w-full h-10 px-3 rounded-lg border border-[#E5E1D8] bg-white text-xs text-[#0F1B2D] focus:border-[#B8955A] focus:outline-none"
                      >
                        <option value="Remote & Hybrid">Remote & Hybrid (Preferred)</option>
                        <option value="Strictly Remote">Strictly Remote Only</option>
                        <option value="On-site / Office">On-site / Office</option>
                      </select>
                    </div>
                  </div>
                </section>
              )}

              {activeSection === 'Privacy' && (
                <section className="rounded-2xl border border-[#E5E1D8] bg-white p-6 shadow-sm space-y-4">
                  <h2 className="text-base font-serif font-bold text-[#0F1B2D]">
                    Founder Visibility Controls
                  </h2>

                  <div className="space-y-4 text-xs">
                    <div className="flex items-center justify-between pb-3 border-b border-[#F0EBE0]">
                      <div>
                        <strong className="block text-[#0F1B2D]">
                          Discoverable to Verified Startups
                        </strong>
                        <span className="text-[#6B7280]">
                          Allows vetted founders to reach out directly with private role invitations.
                        </span>
                      </div>
                      <input
                        type="checkbox"
                        name="publicVisibility"
                        checked={formData.publicVisibility}
                        onChange={handleInputChange}
                        className="h-4 w-4 rounded border-[#E5E1D8] text-[#B8955A] focus:ring-[#B8955A]"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <strong className="block text-[#0F1B2D]">
                          Hide Profile from Current Employer
                        </strong>
                        <span className="text-[#6B7280]">
                          Automatically blocks anyone associated with your current company domain.
                        </span>
                      </div>
                      <input
                        type="checkbox"
                        name="hideCurrentEmployer"
                        checked={formData.hideCurrentEmployer}
                        onChange={handleInputChange}
                        className="h-4 w-4 rounded border-[#E5E1D8] text-[#B8955A] focus:ring-[#B8955A]"
                      />
                    </div>
                  </div>
                </section>
              )}

              {activeSection === 'Notifications' && (
                <section className="rounded-2xl border border-[#E5E1D8] bg-white p-6 shadow-sm space-y-4">
                  <h2 className="text-base font-serif font-bold text-[#0F1B2D]">
                    Notification Channels
                  </h2>

                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <strong className="block text-[#0F1B2D]">Email Alerts</strong>
                      <span className="text-[#6B7280]">
                        Receive instant notifications for direct founder messages and interview invites.
                      </span>
                    </div>
                    <input
                      type="checkbox"
                      name="emailAlerts"
                      checked={formData.emailAlerts}
                      onChange={handleInputChange}
                      className="h-4 w-4 rounded border-[#E5E1D8] text-[#B8955A] focus:ring-[#B8955A]"
                    />
                  </div>
                </section>
              )}

              <div className="pt-2 flex justify-end">
                <JobBtn type="submit" primary className="px-6 min-h-[42px]">
                  Save Settings
                </JobBtn>
              </div>
            </form>
          </main>
        </div>
      </div>
    </JobSeekerShell>
  );
}
