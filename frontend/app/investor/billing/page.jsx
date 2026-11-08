'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Receipt, Check, CreditCard, X } from 'lucide-react';
import { InvestorShell, Card, Button } from '@/components';
import { InvestorDisclaimer } from '../investor-data';

export default function InvestorBillingPage() {
  const [tab, setTab] = useState('Plan');
  const [plan, setPlan] = useState('Pro');
  const [period, setPeriod] = useState('Annual');
  const [modal, setModal] = useState('');

  return (
    <InvestorShell
      active="Billing"
      module="Deal flow"
      title="Membership & billing"
      description="Manage your investor subscription plan, team seat allocation, invoices and payment methods."
      actions={
        <span className="rounded-full bg-[#E7F3EC] px-3 py-1.5 text-xs font-semibold text-[#286749]">
          {plan} · Active
        </span>
      }
    >
      {({ notify }) => (
        <>
          {/* Stat Strip */}
          <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {[
              ['Current plan', `${plan} · ${period}`],
              ['Next renewal charge', '₹49,000 · Mar 01, 2027'],
              ['Team seats allocated', '3 of 5 seats'],
              ['Intro requests today', '2 of 10 used'],
            ].map(([x, y]) => (
              <div key={x} className="rounded-xl border border-[#E5E1D8] bg-white p-5">
                <span className="text-xs font-medium text-[#4A5568]">{x}</span>
                <span className="serif mt-1 block text-2xl font-semibold text-ink">{y}</span>
              </div>
            ))}
          </div>

          {/* Sub Navigation Tabs */}
          <div className="mb-6 flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {['Plan', 'Usage', 'Invoices', 'Payment methods', 'Billing details', 'Fees'].map((x) => (
              <button
                key={x}
                type="button"
                onClick={() => setTab(x)}
                className={`min-h-10 shrink-0 rounded-lg px-4 text-xs font-semibold transition ${
                  tab === x
                    ? 'bg-ink text-white'
                    : 'border border-[#E5E1D8] bg-white text-[#4A5568] hover:bg-[#FAF8F4] hover:text-ink'
                }`}
              >
                {x}
              </button>
            ))}
          </div>

          {/* Tab Views */}
          {tab === 'Plan' && (
            <div className="grid items-start gap-6 xl:grid-cols-3">
              <div className="space-y-6 xl:col-span-2">
                <Card
                  title="Your active tier"
                  action={
                    <span className="rounded-full bg-[#E7F3EC] px-2.5 py-0.5 text-xs font-semibold text-[#286749]">
                      Active
                    </span>
                  }
                >
                  <div className="flex flex-wrap items-end justify-between gap-4">
                    <div>
                      <h3 className="serif text-3xl font-bold text-ink">Pro Membership</h3>
                      <p className="mt-1 text-xs text-[#4A5568]">
                        ₹49,000 / year (billed annually) · Auto-renews Mar 01, 2027
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button secondary onClick={() => setModal('change-plan')}>
                        Change plan
                      </Button>
                      <button
                        type="button"
                        onClick={() => setModal('cancel')}
                        className="rounded-lg border border-red-200 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50"
                      >
                        Cancel plan
                      </button>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2 text-xs border-t border-[#E5E1D8] pt-4">
                    {[
                      'Full startup discovery directory',
                      '20 saved searches with daily alerts',
                      '10 intro requests per day',
                      'Unlimited shortlist & side-by-side compare',
                      '10 active data rooms under mutual NDA',
                      '5 team seats with delegated voting',
                      'Full market benchmarks & macro trends',
                      'Priority demo day VIP access',
                    ].map((feature) => (
                      <div key={feature} className="flex items-center gap-2">
                        <Check size={15} className="text-[#286749] shrink-0" />
                        <span className="text-ink">{feature}</span>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Plan Tier Selector */}
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-ink">Available tiers</h3>
                    <select
                      value={period}
                      onChange={(e) => setPeriod(e.target.value)}
                      className="h-9 rounded-lg border border-[#E5E1D8] bg-white px-3 text-xs focus:border-ink focus:outline-none"
                    >
                      <option>Annual</option>
                      <option>Monthly</option>
                    </select>
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    {[
                      ['Basic', period === 'Annual' ? '₹0' : '₹0', 'Core discovery · 3 saved searches · 3 intros/day'],
                      ['Pro', period === 'Annual' ? '₹49,000/yr' : '₹4,900/mo', 'Full insights · 20 searches · 10 intros/day · priority events'],
                      ['Team', period === 'Annual' ? '₹1,20,000/yr' : '₹12,000/mo', '5 seats · approvals · shared lists · priority support'],
                    ].map(([n, price, desc]) => (
                      <div
                        key={n}
                        className={`rounded-xl border bg-white p-5 flex flex-col justify-between ${
                          plan === n
                            ? 'border-[#B8955A] ring-2 ring-[#B8955A]/20'
                            : 'border-[#E5E1D8]'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between">
                            <b className="text-sm font-bold text-ink">{n}</b>
                            {plan === n && (
                              <span className="rounded-full bg-[#F3EBDD] px-2 py-0.5 text-[10px] font-semibold text-[#806236]">
                                Current
                              </span>
                            )}
                          </div>
                          <span className="serif mt-3 block text-2xl font-bold text-ink">{price}</span>
                          <p className="mt-2 text-xs text-[#4A5568] min-h-[48px]">{desc}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setPlan(n);
                            notify(`Selected ${n} tier.`);
                          }}
                          className={`mt-4 w-full rounded-lg py-2 text-xs font-semibold transition ${
                            plan === n
                              ? 'bg-ink text-white'
                              : 'border border-[#E5E1D8] bg-white text-ink hover:bg-[#FAF8F4]'
                          }`}
                        >
                          {plan === n ? 'Current active tier' : `Switch to ${n}`}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <aside className="space-y-6">
                <Card title="Billing contact">
                  <p className="text-xs text-[#4A5568]">
                    Invoices dispatched to: <b className="text-ink">accounts@formaventures.example</b>
                  </p>
                  <p className="mt-2 text-xs text-[#4A5568]">
                    Entity: Forma Ventures LLP · GSTIN registered
                  </p>
                </Card>

                <Card title="Need custom enterprise terms?">
                  <p className="text-xs text-[#4A5568] leading-relaxed">
                    Institutional funds and family offices requiring bespoke compliance integrations or multi-fund partitions can request custom terms.
                  </p>
                  <button
                    type="button"
                    onClick={() => notify('Enterprise sales team contacted.')}
                    className="mt-3 text-xs font-semibold text-[#9A7A45] hover:underline"
                  >
                    Contact institutional team →
                  </button>
                </Card>
              </aside>
            </div>
          )}

          {tab === 'Usage' && (
            <Card title="Membership usage limits">
              <div className="space-y-4">
                {[
                  ['Saved searches', 12, 20, '8 remaining searches allowed'],
                  ['Intro requests today', 2, 10, 'Resets nightly at 00:00 IST'],
                  ['Active data rooms', 4, 10, '6 additional rooms available'],
                  ['Shortlist capacity', 32, 100, 'Organize startups into custom lists'],
                  ['Team member seats', 3, 5, '2 additional colleagues can be invited'],
                ].map(([label, used, max, hint]) => (
                  <div key={label}>
                    <div className="flex justify-between text-xs">
                      <b className="font-semibold text-ink">{label}</b>
                      <span className="text-[#4A5568]">
                        {used} / {max}
                      </span>
                    </div>
                    <div className="mt-1.5 h-2 rounded-full bg-[#E5E1D8] overflow-hidden">
                      <div
                        className="h-full rounded-full bg-ink"
                        style={{ width: `${(used / max) * 100}%` }}
                      />
                    </div>
                    <span className="mt-1 block text-[11px] text-[#4A5568]">{hint}</span>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {tab === 'Invoices' && (
            <Card title="Invoice billing records">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[700px] text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#E5E1D8] text-[#4A5568]">
                      {['Invoice number', 'Date', 'Billing period', 'Description', 'Total (inc. GST)', 'Status', 'PDF'].map((x) => (
                        <th key={x} className="py-3 font-semibold">
                          {x}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E1D8]">
                    {[
                      ['INV-2026-031', 'Mar 01, 2026', 'Mar 2026 – Feb 2027', 'Pro membership (Annual)', '₹49,000', 'Paid'],
                      ['INV-2025-029', 'Mar 01, 2025', 'Mar 2025 – Feb 2026', 'Pro membership (Annual)', '₹49,000', 'Paid'],
                    ].map((row) => (
                      <tr key={row[0]} className="hover:bg-[#FAF8F4]/50">
                        <td className="py-3 font-semibold text-ink">{row[0]}</td>
                        <td className="py-3">{row[1]}</td>
                        <td className="py-3">{row[2]}</td>
                        <td className="py-3 text-[#4A5568]">{row[3]}</td>
                        <td className="py-3 font-bold text-ink">{row[4]}</td>
                        <td className="py-3">
                          <span className="rounded-full bg-[#E7F3EC] px-2.5 py-0.5 text-xs font-semibold text-[#286749]">
                            {row[5]}
                          </span>
                        </td>
                        <td className="py-3">
                          <button
                            type="button"
                            onClick={() => notify(`Downloaded invoice ${row[0]} PDF.`)}
                            className="font-semibold text-[#9A7A45] hover:underline"
                          >
                            Download
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}

          {tab === 'Payment methods' && (
            <Card title="Payment methods on file">
              <div className="flex items-center justify-between rounded-xl border border-[#E5E1D8] p-4">
                <div className="flex items-center gap-3">
                  <CreditCard size={20} className="text-[#806236]" />
                  <div>
                    <b className="text-xs font-semibold text-ink">Visa ending in •••• 4417</b>
                    <span className="block text-xs text-[#4A5568]">Expires 08/2028 · Default primary card</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => notify('Card update modal opened.')}
                  className="text-xs font-semibold text-[#9A7A45] hover:underline"
                >
                  Edit card
                </button>
              </div>

              <Button
                secondary
                className="mt-4"
                onClick={() => notify('Add payment method flow initiated.')}
              >
                Add new payment method
              </Button>
            </Card>
          )}

          {tab === 'Billing details' && (
            <Card title="GST & corporate legal entity">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  notify('Billing details updated successfully.');
                }}
                className="grid gap-4 sm:grid-cols-2"
              >
                <div>
                  <label htmlFor="b-entity" className="block text-xs font-medium text-ink">
                    Legal entity name
                  </label>
                  <input
                    id="b-entity"
                    defaultValue="Forma Ventures LLP"
                    className="mt-1 h-10 w-full rounded-lg border border-[#E5E1D8] px-3 text-xs focus:border-ink focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="b-gst" className="block text-xs font-medium text-ink">
                    GSTIN
                  </label>
                  <input
                    id="b-gst"
                    defaultValue="19AAACF1234F1Z5"
                    className="mt-1 h-10 w-full rounded-lg border border-[#E5E1D8] px-3 text-xs focus:border-ink focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="b-pan" className="block text-xs font-medium text-ink">
                    PAN
                  </label>
                  <input
                    id="b-pan"
                    defaultValue="AAACF1234F"
                    className="mt-1 h-10 w-full rounded-lg border border-[#E5E1D8] px-3 text-xs focus:border-ink focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="b-email" className="block text-xs font-medium text-ink">
                    Accounts payable email
                  </label>
                  <input
                    id="b-email"
                    type="email"
                    defaultValue="accounts@formaventures.example"
                    className="mt-1 h-10 w-full rounded-lg border border-[#E5E1D8] px-3 text-xs focus:border-ink focus:outline-none"
                  />
                </div>
                <div className="sm:col-span-2 pt-2">
                  <Button type="submit">Save billing preferences</Button>
                </div>
              </form>
            </Card>
          )}

          {tab === 'Fees' && (
            <Card title="Platform fee transparency">
              <p className="text-xs text-[#4A5568] leading-relaxed">
                The platform operates on a transparent SaaS subscription model. We charge zero carry, zero success fees, and zero commissions on venture capital transactions.
              </p>
            </Card>
          )}

          <InvestorDisclaimer onLearnMore={() => notify('Platform disclaimer opened.')} />

          {/* Cancel Plan Modal */}
          {modal === 'cancel' && (
            <div className="fixed inset-0 z-50 grid place-items-center bg-ink/50 p-4 backdrop-blur-sm">
              <section
                role="dialog"
                aria-modal="true"
                className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
              >
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="serif text-xl font-bold text-ink">Cancel subscription</h2>
                  <button type="button" onClick={() => setModal('')}>
                    <X size={18} />
                  </button>
                </div>
                <p className="text-xs text-[#4A5568] leading-relaxed">
                  Your Pro access remains active through Feb 28, 2027. Your historical dealflow, saved diligence notes and portfolio holdings will never be deleted.
                </p>
                <div className="mt-6 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setModal('')}
                    className="rounded-lg border px-3 py-2 text-xs font-medium text-[#4A5568]"
                  >
                    Keep my plan
                  </button>
                  <Button
                    onClick={() => {
                      notify('Cancellation recorded. Auto-renew has been disabled.');
                      setModal('');
                    }}
                  >
                    Confirm cancellation
                  </Button>
                </div>
              </section>
            </div>
          )}
        </>
      )}
    </InvestorShell>
  );
}
