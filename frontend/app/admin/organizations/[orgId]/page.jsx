'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Building,
  CheckCircle2,
  Users,
  Briefcase,
  Banknote,
  ShieldCheck,
  Edit,
} from 'lucide-react';
import { AdminShell } from '@/components';
import {
  Card,
  Btn,
  ResponsiveTable,
  toast,
} from '@/components/admin-ui';
import { initialOrganizations } from '@/app/admin/users/users-data';

export default function OrganizationDetailPage({ params }) {
  const router = useRouter();
  const orgId = params?.orgId || 'org_1';
  const org = initialOrganizations.find((o) => o.id === orgId) || initialOrganizations[0];

  const teamMembers = [
    { name: 'Kavita Sundaram', role: 'Founder & CEO', email: 'kavita@techcorp.in', verified: true },
    { name: 'Sameer Sen', role: 'Chief Technology Officer', email: 'sameer@techcorp.in', verified: true },
    { name: 'Ananya Pillai', role: 'Head of People', email: 'ananya@techcorp.in', verified: false },
  ];

  return (
    <AdminShell active="Users & Orgs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-[#E5E1D8] pb-5">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/organizations"
            className="p-2 rounded-lg border border-[#E5E1D8] bg-white text-[#4A5568] hover:text-[#0F1B2D] transition"
            title="Back to Organizations"
          >
            <ArrowLeft size={16} />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-[#B8955A]">{org.id}</span>
              <span className="px-2 py-0.2 rounded text-[10px] bg-[#E7F3EC] text-[#286749] font-medium">
                {org.status.toUpperCase()}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#0F1B2D]">
              {org.name}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Btn icon={ShieldCheck} onClick={() => toast(`Triggered re-verification audit for ${org.name}`)}>
            Verify Entity Credentials
          </Btn>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left 2 Cols: Details & Team */}
        <div className="lg:col-span-2 space-y-6">
          <Card title="Corporate Identity & Incorporation" titleIcon={Building}>
            <div className="grid gap-3 sm:grid-cols-2 text-xs">
              <div className="p-3 rounded-lg bg-[#FAF8F4] border border-[#E5E1D8]">
                <span className="text-[#4A5568] block mb-1">Corporate CIN / Reg #</span>
                <span className="font-mono font-bold text-[#0F1B2D]">U72900KA2024PTC184910</span>
              </div>
              <div className="p-3 rounded-lg bg-[#FAF8F4] border border-[#E5E1D8]">
                <span className="text-[#4A5568] block mb-1">Organization Category</span>
                <span className="font-semibold text-[#0F1B2D]">{org.type}</span>
              </div>
              <div className="p-3 rounded-lg bg-[#FAF8F4] border border-[#E5E1D8]">
                <span className="text-[#4A5568] block mb-1">Registered Location</span>
                <span className="font-medium text-[#0F1B2D]">Bengaluru, Karnataka (India)</span>
              </div>
              <div className="p-3 rounded-lg bg-[#FAF8F4] border border-[#E5E1D8]">
                <span className="text-[#4A5568] block mb-1">Onboarding Date</span>
                <span className="font-mono text-[#0F1B2D]">{org.joined}</span>
              </div>
            </div>
          </Card>

          <Card title="Registered Team Members & Operators" titleIcon={Users}>
            <ResponsiveTable>
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAF8F4] text-[#4A5568] border-b border-[#E5E1D8]">
                  <tr>
                    <th className="py-3 px-4 font-medium">Member Name</th>
                    <th className="py-3 px-4 font-medium">Title</th>
                    <th className="py-3 px-4 font-medium">Work Email</th>
                    <th className="py-3 px-4 font-medium">KYC State</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E1D8]">
                  {teamMembers.map((m, i) => (
                    <tr key={i} className="hover:bg-[#FAF8F4]/50">
                      <td className="py-3 px-4 font-medium text-[#0F1B2D]">{m.name}</td>
                      <td className="py-3 px-4 text-[#4A5568]">{m.role}</td>
                      <td className="py-3 px-4 text-[#0F1B2D] font-mono">{m.email}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded font-medium ${
                          m.verified ? 'bg-[#E7F3EC] text-[#286749]' : 'bg-[#FDF3E0] text-[#9A6210]'
                        }`}>
                          {m.verified ? 'Verified' : 'Pending Verification'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </ResponsiveTable>
          </Card>
        </div>

        {/* Sidebar Context */}
        <div className="space-y-4 text-xs">
          <Card title="Operational Footprint">
            <div className="space-y-3">
              <div className="flex justify-between py-1.5 border-b border-[#E5E1D8]">
                <span className="text-[#4A5568]">Total Team Seats</span>
                <span className="font-bold text-[#0F1B2D]">{org.members} Members</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#E5E1D8]">
                <span className="text-[#4A5568]">Active Published Jobs</span>
                <span className="font-bold text-[#0F1B2D]">4 Open Roles</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#E5E1D8]">
                <span className="text-[#4A5568]">Escrow Wallet Balance</span>
                <span className="font-mono font-bold text-[#286749]">₹42,500</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </AdminShell>
  );
}
