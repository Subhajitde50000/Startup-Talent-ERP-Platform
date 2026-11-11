'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  CreditCard,
  Layers,
  Save,
  CheckCircle2,
  AlertCircle,
  Eye,
} from 'lucide-react';
import { AdminShell } from '@/components';
import {
  Card,
  Btn,
  toast,
} from '@/components/admin-ui';
import { initialPlans } from '../plans-data';

export default function PlanEditorPage({ params }) {
  const router = useRouter();
  const planId = params?.id || 'plan_emp_growth';
  const existing = initialPlans.find((p) => p.id === planId) || initialPlans[2];

  const [name, setName] = useState(existing.name);
  const [role, setRole] = useState(existing.role);
  const [monthlyPrice, setMonthlyPrice] = useState(existing.monthlyPrice);
  const [annualPrice, setAnnualPrice] = useState(existing.annualPrice);
  const [status, setStatus] = useState(existing.status);

  const handleSave = (e) => {
    e.preventDefault();
    toast(`Plan ${existing.id} updated successfully (Requires checker approval)`);
    setTimeout(() => {
      router.push('/admin/plans');
    }, 800);
  };

  return (
    <AdminShell active="Plans & Entitlements">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-[#E5E1D8] pb-5">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/plans"
            className="p-2 rounded-lg border border-[#E5E1D8] bg-white text-[#4A5568] hover:text-[#0F1B2D] transition"
            title="Back to Plans"
          >
            <ArrowLeft size={16} />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-[#B8955A]">{existing.id}</span>
              <span className="px-2 py-0.2 rounded text-[10px] bg-[#E7F3EC] text-[#286749] font-medium">
                {status}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#0F1B2D]">
              Edit Plan Tier: {name}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Btn icon={Save} onClick={handleSave}>
            Save Plan (Maker-Checker)
          </Btn>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Editor Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card title="Plan Parameters & Pricing" titleIcon={CreditCard}>
            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label htmlFor="plan-name" className="block font-medium text-[#0F1B2D] mb-1.5">
                  Plan Display Title
                </label>
                <input
                  id="plan-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-9 px-3 rounded-lg border border-[#E5E1D8] bg-white text-xs focus:outline-none focus:border-[#B8955A]"
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label htmlFor="plan-monthly" className="block font-medium text-[#0F1B2D] mb-1.5">
                    Monthly Billing Price (INR)
                  </label>
                  <input
                    id="plan-monthly"
                    type="text"
                    value={monthlyPrice}
                    onChange={(e) => setMonthlyPrice(e.target.value)}
                    className="w-full h-9 px-3 rounded-lg border border-[#E5E1D8] bg-white text-xs focus:outline-none focus:border-[#B8955A]"
                  />
                </div>
                <div>
                  <label htmlFor="plan-annual" className="block font-medium text-[#0F1B2D] mb-1.5">
                    Annual Billing Price (INR)
                  </label>
                  <input
                    id="plan-annual"
                    type="text"
                    value={annualPrice}
                    onChange={(e) => setAnnualPrice(e.target.value)}
                    className="w-full h-9 px-3 rounded-lg border border-[#E5E1D8] bg-white text-xs focus:outline-none focus:border-[#B8955A]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="plan-role" className="block font-medium text-[#0F1B2D] mb-1.5">
                  Target Platform Role
                </label>
                <select
                  id="plan-role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full h-9 px-3 rounded-lg border border-[#E5E1D8] bg-white text-xs focus:outline-none focus:border-[#B8955A]"
                >
                  <option value="Startup Founder">Startup Founder</option>
                  <option value="Employer">Employer</option>
                  <option value="Job Seeker">Job Seeker</option>
                  <option value="Investor">Investor</option>
                </select>
              </div>
            </form>
          </Card>

          <Card title="Entitlement Quotas" titleIcon={Layers}>
            <div className="space-y-3 text-xs">
              {existing.entitlements.map((ent, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-[#FAF8F4] border border-[#E5E1D8]">
                  <span className="font-medium text-[#0F1B2D]">{ent}</span>
                  <span className="text-[#286749] font-semibold bg-[#E7F3EC] px-2 py-0.5 rounded text-[11px]">
                    Active Entitlement
                  </span>
                </div>
              ))}
              <div className="pt-2 text-right">
                <Btn small secondary onClick={() => toast('Adding quota to plan')}>
                  + Add Quota
                </Btn>
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar Context */}
        <div className="space-y-4">
          <Card title="Plan Lifecycle & Subscriber Count">
            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1.5 border-b border-[#E5E1D8]">
                <span className="text-[#4A5568]">Active Subscribers</span>
                <span className="font-bold text-[#0F1B2D]">{existing.subscribers.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#E5E1D8]">
                <span className="text-[#4A5568]">Tax Treatment</span>
                <span className="font-medium text-[#0F1B2D]">18% GST Added at Checkout</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#E5E1D8]">
                <span className="text-[#4A5568]">Last Version Change</span>
                <span className="font-mono text-[#0F1B2D]">{existing.lastChanged}</span>
              </div>
            </div>
          </Card>

          <div className="rounded-xl border border-[#F3EBDD] bg-[#FAF8F4] p-4 text-xs text-[#9A7A45] space-y-2">
            <div className="flex items-center gap-2 font-semibold">
              <AlertCircle size={15} />
              <span>Maker-Checker Safeguard</span>
            </div>
            <p className="leading-relaxed">
              Price changes, quota adjustments, and cancellations will be staged for dual-control approval by a second authorized finance supervisor before going live to subscribers.
            </p>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
