'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  CreditCard,
  Layers,
  Tag,
  Percent,
  Plus,
  Search,
  CheckCircle2,
  ExternalLink,
  Edit,
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
  initialPlans,
  initialEntitlements,
  initialPromotions,
} from './plans-data';

export default function AdminPlansPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('catalog');
  const [plans, setPlans] = useState(initialPlans);
  const [entitlements, setEntitlements] = useState(initialEntitlements);
  const [promos, setPromos] = useState(initialPromotions);
  const [roleFilter, setRoleFilter] = useState('all');

  const tabs = [
    { key: 'catalog', label: 'Plan Catalog', count: plans.length },
    { key: 'entitlements', label: 'Entitlements & Limits', count: entitlements.length },
    { key: 'promotions', label: 'Promotions & Vouchers', count: promos.length },
    { key: 'commissions', label: 'Commissions & Fees' },
  ];

  const filteredPlans = plans.filter((p) => {
    if (roleFilter === 'all') return true;
    return p.role.toLowerCase().includes(roleFilter.toLowerCase());
  });

  return (
    <AdminShell active="Plans & Entitlements">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-[#E5E1D8] pb-5">
        <div>
          <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#0F1B2D]">
            Plans, Pricing & Feature Entitlements
          </h1>
          <p className="text-xs text-[#4A5568] mt-1">
            Single catalog defining customer subscriptions, quotas, price books, and platform commission schedules.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Btn icon={Plus} onClick={() => router.push('/admin/plans/new')}>
            Create New Plan
          </Btn>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <TabBar tabs={tabs} active={activeTab} onChange={setActiveTab} />
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Tab 1: Catalog                                                     */}
      {/* ------------------------------------------------------------------ */}
      {activeTab === 'catalog' && (
        <div className="space-y-4">
          {/* Role Filter Strip */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 p-1 rounded-lg bg-[#FAF8F4] border border-[#E5E1D8]">
              {['all', 'Startup', 'Employer', 'Job Seeker', 'Investor'].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRoleFilter(r)}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition ${
                    roleFilter === r
                      ? 'bg-white text-[#0F1B2D] shadow-xs font-semibold'
                      : 'text-[#4A5568] hover:text-[#0F1B2D]'
                  }`}
                >
                  {r === 'all' ? 'All Roles' : r}
                </button>
              ))}
            </div>
            <span className="text-xs text-[#4A5568]">{filteredPlans.length} plans in catalog</span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPlans.map((plan) => (
              <div
                key={plan.id}
                className="rounded-xl border border-[#E5E1D8] bg-white p-5 shadow-xs hover:border-[#B8955A] transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#B8955A] bg-[#F3EBDD] px-2 py-0.5 rounded">
                      {plan.role}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] text-[#286749]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#2E7D5B]" />
                      {plan.status}
                    </span>
                  </div>

                  <h3 className="text-base font-serif font-bold text-[#0F1B2D] mb-1">{plan.name}</h3>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-xl font-bold text-[#0F1B2D]">{plan.monthlyPrice}</span>
                    <span className="text-xs text-[#4A5568]">/ month</span>
                    <span className="text-xs text-[#A0A7B4]">({plan.annualPrice}/yr)</span>
                  </div>

                  <div className="space-y-1.5 border-t border-[#FAF8F4] pt-3 mb-4">
                    <span className="text-[11px] font-medium text-[#A0A7B4] block uppercase">Included Quotas:</span>
                    {plan.entitlements.map((ent, i) => (
                      <div key={i} className="flex items-start gap-1.5 text-xs text-[#4A5568]">
                        <CheckCircle2 size={13} className="text-[#2E7D5B] shrink-0 mt-0.5" />
                        <span>{ent}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#E5E1D8] flex items-center justify-between text-xs">
                  <span className="text-[#4A5568]">
                    Subscribers: <b className="text-[#0F1B2D]">{plan.subscribers.toLocaleString()}</b>
                  </span>
                  <Link
                    href={`/admin/plans/${plan.id}`}
                    className="text-[#B8955A] hover:underline font-medium inline-flex items-center gap-1"
                  >
                    <span>Edit Tier</span>
                    <Edit size={12} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* Tab 2: Entitlements                                                */}
      {/* ------------------------------------------------------------------ */}
      {activeTab === 'entitlements' && (
        <Card title="Global Platform Entitlement Definitions" titleIcon={Layers}>
          <ResponsiveTable>
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF8F4] text-[#4A5568] border-b border-[#E5E1D8]">
                <tr>
                  <th className="py-3 px-4 font-medium">Entitlement Key</th>
                  <th className="py-3 px-4 font-medium">Feature Name</th>
                  <th className="py-3 px-4 font-medium">Category</th>
                  <th className="py-3 px-4 font-medium">Starter</th>
                  <th className="py-3 px-4 font-medium">Growth</th>
                  <th className="py-3 px-4 font-medium">Scale</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E1D8]">
                {entitlements.map((ent) => (
                  <tr key={ent.key} className="hover:bg-[#FAF8F4]/50">
                    <td className="py-3 px-4 font-mono text-[#0F1B2D] font-medium">{ent.key}</td>
                    <td className="py-3 px-4 text-[#0F1B2D]">{ent.name}</td>
                    <td className="py-3 px-4 text-[#4A5568]">{ent.category}</td>
                    <td className="py-3 px-4 text-[#4A5568]">{ent.defaultStarter} {ent.unit}</td>
                    <td className="py-3 px-4 text-[#B8955A] font-medium">{ent.defaultGrowth} {ent.unit}</td>
                    <td className="py-3 px-4 text-[#286749] font-medium">
                      {ent.defaultScale === 999 ? 'Unlimited' : `${ent.defaultScale} ${ent.unit}`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </ResponsiveTable>
        </Card>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* Tab 3: Promotions                                                  */}
      {/* ------------------------------------------------------------------ */}
      {activeTab === 'promotions' && (
        <Card title="Active Promotion Codes & Vouchers" titleIcon={Tag}>
          <ResponsiveTable>
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF8F4] text-[#4A5568] border-b border-[#E5E1D8]">
                <tr>
                  <th className="py-3 px-4 font-medium">Coupon Code</th>
                  <th className="py-3 px-4 font-medium">Discount Offer</th>
                  <th className="py-3 px-4 font-medium">Target Role</th>
                  <th className="py-3 px-4 font-medium">Validity</th>
                  <th className="py-3 px-4 font-medium">Redemptions</th>
                  <th className="py-3 px-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E1D8]">
                {promos.map((pr) => (
                  <tr key={pr.code} className="hover:bg-[#FAF8F4]/50">
                    <td className="py-3 px-4 font-mono font-bold text-[#0F1B2D]">{pr.code}</td>
                    <td className="py-3 px-4 font-medium text-[#286749]">{pr.discount}</td>
                    <td className="py-3 px-4 text-[#0F1B2D]">{pr.applicableRoles}</td>
                    <td className="py-3 px-4 text-[#4A5568]">{pr.validUntil}</td>
                    <td className="py-3 px-4 text-[#0F1B2D] font-medium">{pr.usageCount}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded bg-[#E7F3EC] text-[#286749] font-medium">
                        {pr.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </ResponsiveTable>
        </Card>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* Tab 4: Commissions & Fees                                          */}
      {/* ------------------------------------------------------------------ */}
      {activeTab === 'commissions' && (
        <Card title="Platform Commission & Take Rates" titleIcon={Percent}>
          <div className="space-y-4 text-xs">
            <p className="text-[#4A5568] leading-relaxed">
              Standard platform service commission automatically withheld prior to mentor escrow settlement:
            </p>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="p-4 rounded-xl border border-[#E5E1D8] bg-[#FAF8F4]">
                <span className="text-[11px] text-[#4A5568] block mb-1">Mentor Advisory Sessions</span>
                <span className="text-2xl font-serif font-bold text-[#0F1B2D]">15.0%</span>
                <p className="text-[11px] text-[#A0A7B4] mt-1">Default take-rate on completed video 1-on-1s</p>
              </div>
              <div className="p-4 rounded-xl border border-[#E5E1D8] bg-[#FAF8F4]">
                <span className="text-[11px] text-[#4A5568] block mb-1">Featured Employer Job Listing</span>
                <span className="text-2xl font-serif font-bold text-[#0F1B2D]">₹1,999</span>
                <p className="text-[11px] text-[#A0A7B4] mt-1">Add-on placement for 14-day highlight</p>
              </div>
              <div className="p-4 rounded-xl border border-[#E5E1D8] bg-[#FAF8F4]">
                <span className="text-[11px] text-[#4A5568] block mb-1">Candidate Fast-Track Rubric Review</span>
                <span className="text-2xl font-serif font-bold text-[#0F1B2D]">₹499</span>
                <p className="text-[11px] text-[#A0A7B4] mt-1">Human senior engineer audit request fee</p>
              </div>
            </div>

            <div className="pt-3 border-t border-[#E5E1D8] text-right">
              <Btn small secondary onClick={() => toast('Commission schedule modification requires dual-control')}>
                Propose Rate Change (Requires Dual-Control)
              </Btn>
            </div>
          </div>
        </Card>
      )}
    </AdminShell>
  );
}
