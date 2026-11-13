'use client';

import { useState } from 'react';
import {
  Download,
  Banknote,
  AlertCircle,
  Clock,
  FileText,
  Receipt,
  ArrowRight,
  Info,
  X,
} from 'lucide-react';
import MentorPageShell from '../mentor-page-shell';
import { initialPayments, Btn, Card } from '../mentor-data';

export default function MentorEarningsPage() {
  const [toast, setToast] = useState('');
  const [tab, setTab] = useState('Overview');
  const [range, setRange] = useState('This month');
  const [paymentTab, setPaymentTab] = useState('Gross');
  const [modal, setModal] = useState('');
  const [selected, setSelected] = useState(null);
  const [payments] = useState(initialPayments);

  const notify = (x) => {
    setToast(x);
    setTimeout(() => setToast(''), 2700);
  };

  const triggerDownload = (filename, content = 'Forma Mentor Document Export', mime = 'text/plain') => {
    try {
      const blob = new Blob([content], { type: mime });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error('Download failed', e);
    }
  };

  const disclaimer = (
    <p className="mt-5 flex items-start gap-2 text-xs leading-4 text-[#4A5568]">
      <Info size={13} className="mt-0.5 shrink-0" />
      The platform records agreement terms and payment activity; it does not provide tax, legal or
      accounting advice. Confirm obligations with a qualified professional.
    </p>
  );

  return (
    <MentorPageShell active="Earnings" toast={toast} notify={notify}>
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm text-[#4A5568]">
            Mentor workspace <span className="mx-2 text-[#B8955A]">·</span> Money & agreements
          </p>
          <h1 className="serif mt-1 text-[30px] font-semibold text-[#0F1B2D]">
            Earnings and payouts
          </h1>
          <p className="mt-1 text-sm text-[#4A5568]">
            See what you earned, what is pending and when payouts arrive.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={range}
            onChange={(e) => setRange(e.target.value)}
            className="h-10 rounded-lg border border-[#E5E1D8] bg-white px-3 text-xs focus:outline-none"
          >
            <option>This month</option>
            <option>Last 3 months</option>
            <option>This financial year</option>
            <option>Custom</option>
          </select>
          <Btn
            secondary
            onClick={() => {
              triggerDownload(
                'mentor-earnings-2026.csv',
                'Date,Startup,Item,Gross,Commission,Tax,Net,Status\nNov 04,Acme Studio,Go-to-market and pricing,3000,300,0,2700,Paid',
                'text/csv'
              );
              notify('Your own earnings statement exported.');
            }}
          >
            <Download size={14} /> Export
          </Btn>
        </div>
      </div>

      <div className="mb-5 rounded-lg border border-[#E7D4B0] bg-[#FFF8E8] p-3 text-xs text-[#806236]">
        <Banknote className="mr-2 inline" size={14} />
        Add a payout method to receive payments.
        <button
          type="button"
          onClick={() => setTab('Payout settings')}
          className="ml-2 font-semibold underline"
        >
          Add payout method
        </button>
      </div>

      <div className="mb-5 flex gap-2 overflow-x-auto pb-1">
        {['Overview', 'Payments', 'Payouts', 'Invoices and tax', 'Payout settings'].map((x) => (
          <button
            type="button"
            onClick={() => setTab(x)}
            key={x}
            className={`min-h-10 shrink-0 rounded-lg px-3 text-xs font-medium transition-colors ${
              tab === x
                ? 'bg-[#0F1B2D] text-white'
                : 'border border-[#E5E1D8] bg-white text-[#4A5568] hover:bg-[#FAF8F4]'
            }`}
          >
            {x}
          </button>
        ))}
      </div>

      {tab === 'Overview' ? (
        <>
          <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {[
              ['Earned this month', '₹36,000', '▲ 12%'],
              ['Pending', '₹9,000', '3 sessions'],
              ['Paid out · FY', '₹2.4L', 'Updated today'],
              ['Next payout', '₹27,000', 'Nov 10 · pending setup'],
            ].map(([x, v, ch]) => (
              <div key={x} className="rounded-xl border border-[#E5E1D8] bg-white p-4">
                <p className="text-xs text-[#4A5568]">{x}</p>
                <b className="serif mt-1 block text-2xl tabular-nums text-[#0F1B2D]">{v}</b>
                <small className="text-xs text-[#2E7D5B]">{ch}</small>
              </div>
            ))}
          </div>

          <div className="grid items-start gap-5 xl:grid-cols-3">
            <div className="min-w-0 space-y-5 xl:col-span-2">
              <Card
                title="Earnings over time"
                action={
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => setPaymentTab('Gross')}
                      className={`rounded px-2 py-1 text-xs font-medium ${
                        paymentTab === 'Gross'
                          ? 'bg-[#0F1B2D] text-white'
                          : 'text-[#4A5568] hover:text-[#0F1B2D]'
                      }`}
                    >
                      Gross
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentTab('Net')}
                      className={`rounded px-2 py-1 text-xs font-medium ${
                        paymentTab !== 'Gross'
                          ? 'bg-[#0F1B2D] text-white'
                          : 'text-[#4A5568] hover:text-[#0F1B2D]'
                      }`}
                    >
                      Net
                    </button>
                  </div>
                }
              >
                <p className="mb-3 text-xs text-[#4A5568]">
                  Mentor session earnings by month · {paymentTab === 'Gross' ? 'gross' : 'net'}{' '}
                  amounts.
                </p>
                <div className="flex h-44 items-end gap-4 border-b border-[#E5E1D8] px-3">
                  {[35, 47, 42, 60, 72, 54, 84, 70, 95, 79, 88, 100].map((v, i) => (
                    <div
                      key={i}
                      className={`flex-1 rounded-t ${i === 11 ? 'bg-[#B8955A]' : 'bg-[#0F1B2D]'}`}
                      style={{ height: `${v}%` }}
                      title={`Month ${i + 1}`}
                    />
                  ))}
                </div>
                <div className="mt-2 flex justify-between text-xs text-[#4A5568]">
                  <span>Dec</span>
                  <span>Nov</span>
                </div>
                <p className="mt-3 text-xs text-[#4A5568]">
                  Sample dashboard data · Calculated from session payments · Updated 2 hours ago
                </p>
              </Card>

              <div className="grid gap-5 md:grid-cols-2">
                <Card title="Earnings by startup">
                  <p className="mb-3 text-xs text-[#4A5568]">
                    Share of paid session fees in selected period.
                  </p>
                  {[
                    ['Acme Studio', '₹18,000', 50],
                    ['GreenLedger', '₹10,000', 28],
                    ['Cohortly', '₹8,000', 22],
                  ].map(([n, v, p]) => (
                    <div key={n} className="mb-4">
                      <div className="mb-1 flex justify-between text-xs">
                        <span className="text-[#0F1B2D]">{n}</span>
                        <b className="text-[#0F1B2D]">
                          {v} · {p}%
                        </b>
                      </div>
                      <div className="h-2 rounded-full bg-[#E5E1D8]">
                        <div
                          className="h-full rounded-full bg-[#0F1B2D]"
                          style={{ width: `${p * 2}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </Card>

                <Card title="Sessions vs earnings">
                  <p className="text-xs text-[#4A5568]">
                    12 sessions this month · average net ₹3,000 per paid session.
                  </p>
                  <div className="mt-5 flex h-28 items-end gap-3">
                    {[35, 45, 56, 49, 72, 84].map((v, i) => (
                      <div key={i} className="flex flex-1 items-end gap-1">
                        <span
                          className="w-1/2 rounded-t bg-[#0F1B2D]"
                          style={{ height: `${v}%` }}
                        />
                        <span
                          className="w-1/2 rounded-t bg-[#B8955A]"
                          style={{ height: `${Math.max(18, v - 15)}%` }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 flex justify-between text-xs text-[#4A5568]">
                    <span>Sessions · ink</span>
                    <span>Net earnings · gold</span>
                  </div>
                </Card>
              </div>
            </div>

            <aside className="space-y-5">
              <Card title="Next payout">
                <b className="serif text-2xl text-[#0F1B2D]">₹27,000</b>
                <p className="mt-1 text-xs text-[#4A5568]">Scheduled Nov 10 · Processing</p>
                <p className="mt-3 text-xs text-[#0F1B2D]">Destination: Bank account · •••• 4417</p>
                <button
                  type="button"
                  onClick={() => setTab('Payouts')}
                  className="mt-3 text-xs font-semibold text-[#9A7A45]"
                >
                  View payout details <ArrowRight className="inline" size={12} />
                </button>
              </Card>

              <Card title="Needs your attention">
                <div className="space-y-3 text-xs">
                  <p className="flex items-center text-[#0F1B2D]">
                    <AlertCircle className="mr-2 inline text-[#B7791F]" size={14} />
                    Payout details not fully verified
                  </p>
                  <p className="flex items-center text-[#0F1B2D]">
                    <Clock className="mr-2 inline text-[#B7791F]" size={14} />
                    One agreement awaiting your response
                  </p>
                  <p className="flex items-center text-[#0F1B2D]">
                    <FileText className="mr-2 inline text-[#B7791F]" size={14} />
                    Tax details needed before first payout
                  </p>
                </div>
              </Card>

              <Card title="How payouts work">
                <details>
                  <summary className="cursor-pointer text-xs font-semibold text-[#0F1B2D]">
                    Release timing and fees
                  </summary>
                  <p className="mt-3 text-xs leading-5 text-[#4A5568]">
                    Session fees are released 7 days after a completed session and paid out on the
                    10th and 25th, subject to verification and payment provider processing.
                  </p>
                </details>
              </Card>
            </aside>
          </div>
        </>
      ) : tab === 'Payments' ? (
        <Card title="Payments">
          <div className="mb-3 flex flex-wrap gap-2">
            <select className="h-9 rounded border border-[#E5E1D8] bg-white px-2 text-xs focus:outline-none">
              <option>All startups</option>
              <option>Acme Studio</option>
            </select>
            <select className="h-9 rounded border border-[#E5E1D8] bg-white px-2 text-xs focus:outline-none">
              <option>All statuses</option>
              <option>Paid</option>
              <option>Pending</option>
              <option>Processing</option>
            </select>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[880px] text-left text-xs">
              <thead className="border-b border-[#E5E1D8] text-[#4A5568]">
                <tr>
                  {[
                    'Date',
                    'Startup',
                    'Item',
                    'Gross',
                    'Commission',
                    'Tax',
                    'Net to you',
                    'Status',
                    'Receipt',
                  ].map((x) => (
                    <th key={x} className="py-3 font-medium">
                      {x}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {payments.map((r) => (
                  <tr
                    key={r[0] + r[1]}
                    onClick={() => {
                      setSelected(r);
                      setModal('payment');
                    }}
                    className="cursor-pointer border-b border-[#E5E1D8] hover:bg-[#F4F1EA]"
                  >
                    <td className="py-3 text-[#0F1B2D]">{r[0]}</td>
                    <td className="text-[#0F1B2D] font-medium">{r[1]}</td>
                    <td className="text-[#4A5568]">{r[2]}</td>
                    {r.slice(3, 7).map((x, j) => (
                      <td key={j} className="text-right tabular-nums text-[#0F1B2D]">
                        {x}
                      </td>
                    ))}
                    <td>
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-medium ${
                          r[7] === 'Paid'
                            ? 'bg-[#E7F3EC] text-[#286749]'
                            : r[7] === 'Pending'
                            ? 'bg-[#FFF3D6] text-[#8A5700]'
                            : 'bg-[#F3F4F6] text-[#4A5568]'
                        }`}
                      >
                        {r[7]}
                      </span>
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          notify('Receipt downloaded.');
                        }}
                        className="font-medium text-[#9A7A45]"
                      >
                        PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="font-semibold text-[#0F1B2D]">
                  <td colSpan="3" className="py-3">
                    Totals · selected period
                  </td>
                  <td className="text-right">₹12,500</td>
                  <td className="text-right">₹1,250</td>
                  <td className="text-right">₹0</td>
                  <td className="text-right">₹11,250</td>
                  <td colSpan="2" />
                </tr>
              </tfoot>
            </table>
          </div>
        </Card>
      ) : tab === 'Payouts' ? (
        <Card
          title="Payouts"
          action={
            <Btn secondary onClick={() => setModal('payout')}>
              Request payout
            </Btn>
          }
        >
          <div className="mb-4 rounded-lg bg-[#FAF8F4] p-3 text-xs text-[#4A5568]">
            Schedule: funds released 7 days after session; payout on the 10th and 25th · Method ••••
            4417
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px] text-left text-xs">
              <thead className="border-b border-[#E5E1D8] text-[#4A5568]">
                <tr>
                  {[
                    'Payout ID',
                    'Date',
                    'Amount',
                    'Method',
                    'Status',
                    'Included payments',
                    'Reference',
                    'Statement',
                  ].map((x) => (
                    <th key={x} className="py-3 font-medium">
                      {x}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['PO-2208', 'Oct 25', '₹24,000', 'Bank •••• 4417', 'Paid', '8', 'NEFT-0811'],
                  ['PO-2191', 'Oct 10', '₹18,500', 'Bank •••• 4417', 'Paid', '6', 'NEFT-0612'],
                  ['PO-2251', 'Nov 10', '₹27,000', 'Bank •••• 4417', 'Processing', '9', '—'],
                ].map((r) => (
                  <tr key={r[0]} className="border-b border-[#E5E1D8]">
                    <td className="py-3 font-medium text-[#0F1B2D]">{r[0]}</td>
                    {r.slice(1).map((x, i) => (
                      <td key={i} className="text-[#4A5568]">
                        {x}
                      </td>
                    ))}
                    <td>
                      <button
                        type="button"
                        onClick={() =>
                          triggerDownload(
                            'payout-statement.txt',
                            'Forma Mentor Payout Statement\nPayout ID: PO-2208\nNet Released: ₹2,700\nDate: Oct 25, 2026'
                          )
                        }
                        className="font-medium text-[#9A7A45]"
                      >
                        Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-[#4A5568]">
            Available balance: ₹9,000 · Minimum payout ₹1,000
          </p>
        </Card>
      ) : tab === 'Invoices and tax' ? (
        <div className="space-y-5">
          <Card title="Invoices">
            <div className="space-y-2">
              {[
                ['INV-2026-1104', 'Nov 04', 'Acme Studio', '₹3,000'],
                ['INV-2026-1102', 'Nov 02', 'GreenLedger', '₹2,500'],
                ['INV-2026-1028', 'Oct 28', 'Acme Studio', '₹3,000'],
              ].map((r) => (
                <div
                  key={r[0]}
                  className="flex items-center gap-3 border-b border-[#E5E1D8] py-3 text-xs"
                >
                  <Receipt size={16} className="text-[#9A7A45]" />
                  <b className="text-[#0F1B2D]">{r[0]}</b>
                  <span className="text-[#4A5568]">
                    {r[1]} · {r[2]}
                  </span>
                  <span className="ml-auto font-medium text-[#0F1B2D]">{r[3]}</span>
                  <button
                    type="button"
                    onClick={() => notify('Invoice downloaded.')}
                    className="font-medium text-[#9A7A45]"
                  >
                    PDF
                  </button>
                </div>
              ))}
            </div>
          </Card>
          <Card title="Tax documents">
            <p className="text-xs text-[#4A5568]">
              Financial year 2026–27 · Earnings statement and applicable tax certificates.
            </p>
            <button
              type="button"
              onClick={() =>
                triggerDownload(
                  'tax-statement-2026.txt',
                  'Forma Workspace — Annual Mentor Tax Statement\nMentor: Rhea Mukherjee\nTotal Gross Earnings: ₹12,500\nWithholding Tax (TDS): ₹0\nPlatform Status: Verified'
                )
              }
              className="mt-3 rounded-lg border border-[#E5E1D8] px-3 py-2 text-xs font-semibold text-[#0F1B2D] hover:bg-[#FAF8F4]"
            >
              Download annual earnings statement
            </button>
            <p className="mt-4 rounded-lg bg-[#FFF8E8] p-3 text-xs text-[#806236]">
              The platform provides records, not tax advice. Confirm your obligations with an
              accountant.
            </p>
          </Card>
        </div>
      ) : (
        <div className="grid items-start gap-5 lg:grid-cols-3">
          <div className="space-y-5 lg:col-span-2">
            <Card title="Payout method">
              <div className="rounded-lg bg-[#FAF8F4] p-4">
                <p className="text-xs text-[#4A5568]">Bank account · masked for security</p>
                <b className="mt-1 block text-sm text-[#0F1B2D]">Account ending •••• 4417</b>
                <p className="mt-1 text-xs text-[#4A5568]">Verification: Pending</p>
              </div>
              <button
                type="button"
                onClick={() => setModal('reauth')}
                className="mt-4 rounded-lg border border-[#E5E1D8] px-3 py-2 text-xs font-semibold text-[#0F1B2D] hover:bg-[#FAF8F4]"
              >
                Change payout method
              </button>
            </Card>
            <Card title="Payout preferences">
              <label className="block text-xs font-medium text-[#0F1B2D]">
                Schedule
                <select className="mt-2 h-10 w-full max-w-xs rounded-lg border border-[#E5E1D8] bg-white px-3 focus:outline-none">
                  <option>10th and 25th of each month</option>
                  <option>Monthly</option>
                </select>
              </label>
              <label className="mt-4 block text-xs font-medium text-[#0F1B2D]">
                Minimum payout threshold
                <input
                  aria-label="Input field"
                  defaultValue="₹1,000"
                  className="mt-2 h-10 w-full max-w-xs rounded-lg border border-[#E5E1D8] px-3 focus:outline-none"
                />
              </label>
              <button
                type="button"
                onClick={() => notify('Payout preferences saved.')}
                className="mt-4 rounded-lg bg-[#0F1B2D] px-4 py-2 text-xs font-semibold text-white hover:bg-[#1C2B42]"
              >
                Save preferences
              </button>
            </Card>
          </div>
          <aside>
            <Card title="Tax details">
              <p className="text-xs leading-5 text-[#4A5568]">
                Tax ID required before first payout. Stored encrypted and masked after saving.
              </p>
              <label className="mt-3 block text-xs font-medium text-[#0F1B2D]">
                Legal name
                <input
                  aria-label="As on tax records"
                  placeholder="As on tax records"
                  className="mt-2 h-10 w-full rounded-lg border border-[#E5E1D8] px-3 focus:outline-none"
                />
              </label>
              <label className="mt-3 block text-xs font-medium text-[#0F1B2D]">
                PAN / tax ID
                <input
                  aria-label="••••••••••"
                  placeholder="••••••••••"
                  className="mt-2 h-10 w-full rounded-lg border border-[#E5E1D8] px-3 focus:outline-none"
                />
              </label>
              <label className="mt-3 block text-xs font-medium text-[#0F1B2D]">
                GST registration (if applicable)
                <input
                  aria-label="Optional"
                  placeholder="Optional"
                  className="mt-2 h-10 w-full rounded-lg border border-[#E5E1D8] px-3 focus:outline-none"
                />
              </label>
              <button
                type="button"
                onClick={() => setModal('reauth')}
                className="mt-4 w-full rounded-lg bg-[#0F1B2D] py-2 text-xs font-semibold text-white hover:bg-[#1C2B42]"
              >
                Save securely
              </button>
            </Card>
          </aside>
        </div>
      )}

      {disclaimer}

      {/* Modals */}
      {modal && (
        <div className="fixed inset-0 z-40 grid place-items-center bg-[#0F1B2D]/45 p-4">
          <section
            role="dialog"
            aria-modal="true"
            className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"
          >
            <div className="mb-5 flex items-center justify-between">
              <h2 className="serif text-2xl font-semibold text-[#0F1B2D]">
                {modal === 'payout'
                  ? 'Request payout'
                  : modal === 'payment'
                  ? 'Payment breakdown'
                  : 'Security verification'}
              </h2>
              <button
                type="button"
                onClick={() => setModal('')}
                aria-label="Close"
                className="text-[#4A5568] hover:text-[#0F1B2D]"
              >
                <X size={18} />
              </button>
            </div>

            {modal === 'payout' ? (
              <div className="space-y-3">
                <p className="text-sm text-[#0F1B2D]">
                  Available balance: ₹9,000 · Minimum payout ₹1,000
                </p>
                <p className="text-xs text-[#4A5568]">
                  Destination: •••• 4417 · Estimate arrival: next payout date
                </p>
                <label className="flex items-center gap-2 text-xs text-[#4A5568]">
                  <input aria-label="Toggle option" type="checkbox" className="accent-[#0F1B2D]" />
                  Confirm payout request; re-authentication required
                </label>
              </div>
            ) : modal === 'payment' ? (
              <div className="divide-y divide-[#E5E1D8] text-xs">
                {[
                  ['Session fee', '₹3,000'],
                  ['Platform commission · 10%', '−₹300'],
                  ['Tax', '₹0'],
                  ['Net to you', '₹2,700'],
                ].map(([x, y]) => (
                  <p key={x} className="flex justify-between py-3">
                    <span className="text-[#4A5568]">{x}</span>
                    <b className="text-[#0F1B2D]">{y}</b>
                  </p>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-sm text-[#0F1B2D]">
                  You are updating your secure payout details.
                </p>
                <label className="block text-sm font-medium text-[#0F1B2D]">
                  Confirm password
                  <input
                    aria-label="Password"
                    type="password"
                    className="mt-2 h-10 w-full rounded-lg border border-[#E5E1D8] px-3 focus:outline-none"
                  />
                </label>
                <p className="text-xs text-[#4A5568]">
                  An email security alert will be sent after the change.
                </p>
              </div>
            )}

            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setModal('')}
                className="min-h-10 px-4 text-sm font-medium text-[#4A5568] hover:text-[#0F1B2D]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  if (modal === 'payment') {
                    notify('Issue report sent to billing support.');
                  } else {
                    notify('Saved and recorded.');
                  }
                  setModal('');
                }}
                className="min-h-10 rounded-lg bg-[#0F1B2D] px-4 text-sm font-semibold text-white hover:bg-[#1C2B42]"
              >
                {modal === 'payout'
                  ? 'Request payout'
                  : modal === 'payment'
                  ? 'Report an issue'
                  : 'Confirm'}
              </button>
            </div>
          </section>
        </div>
      )}
    </MentorPageShell>
  );
}
