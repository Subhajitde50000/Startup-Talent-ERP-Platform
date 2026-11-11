export const moneyTabs = [
  { key: 'overview', label: 'Overview' },
  { key: 'subscriptions', label: 'Subscriptions and packs' },
  { key: 'payments', label: 'Payments and failures' },
  { key: 'dunning', label: 'Dunning' },
  { key: 'reconciliation', label: 'Reconciliation' },
  { key: 'taxes', label: 'Taxes and invoices' },
  { key: 'close', label: 'Close and exports' },
];

export const rangeFilters = [
  { key: 'today', label: 'Today' },
  { key: '7-days', label: 'Last 7 days' },
  { key: 'this-month', label: 'This month' },
  { key: 'this-quarter', label: 'This quarter' },
  { key: 'this-year', label: 'This financial year' },
  { key: 'custom', label: 'Custom range' },
];

export const kpis = [
  { label: 'Revenue (period)', value: '₹4,28,00,000', change: '▲ 9%', sub: 'All streams, this period' },
  { label: 'Recurring revenue (MRR)', value: '₹1,84,00,000', change: '—', sub: 'Monthly recurring' },
  { label: 'Payment success rate', value: '97.6%', change: '▼ 0.3%', sub: 'All payment methods' },
  { label: 'Failed payments (open)', value: '112', sub: '₹61,00,000 outstanding' },
  { label: 'Refunds (period)', value: '₹1,30,000', sub: '0.8% of revenue' },
  { label: 'Credits outstanding', value: '₹9,70,000', sub: 'Unused packs and credits' },
];

export const alerts = [
  { id: 'al_41', type: 'settlement_mismatch', severity: 2, text: "Provider settlement ₹4,12,000 doesn't match ledger by ₹8,500" },
  { id: 'al_42', type: 'provider_outage', severity: 3, text: 'UPI timeouts elevated — 4% of UPI payments failing since 10:00' },
  { id: 'al_43', type: 'refund_spike', severity: 1, text: 'Refund volume 2x normal — review the spike' },
];

export const payments = [
  { id: 'PAY-2026-110601', time: '2026-11-06T14:30:00+05:30', role: 'employer', payerId: 'org_77', item: 'Job post pack — 5 posts', amount: '₹49,900', tax: '₹8,982', provider: 'UPI', status: 'succeeded', invoice: 'INV-2026-1044' },
  { id: 'PAY-2026-110602', time: '2026-11-06T14:15:00+05:30', role: 'startup', payerId: 'org_33', item: 'Startup subscription — Growth', amount: '₹2,99,900', tax: '₹53,982', provider: 'Credit card', status: 'failed', failureCode: 'insufficient_funds', invoice: null },
  { id: 'PAY-2026-110603', time: '2026-11-06T13:45:00+05:30', role: 'mentor', payerId: 'usr_44', item: 'Session commission hold release', amount: '₹12,000', tax: '₹2,160', provider: 'UPI', status: 'pending', invoice: null },
  { id: 'PAY-2026-110604', time: '2026-11-06T13:20:00+05:30', role: 'employer', payerId: 'org_88', item: 'Featured listing', amount: '₹75,000', tax: '₹13,500', provider: 'Credit card', status: 'succeeded', invoice: 'INV-2026-1045' },
  { id: 'PAY-2026-110605', time: '2026-11-06T12:55:00+05:30', role: 'job-seeker', payerId: 'usr_90', item: 'AI interview pack — 5 sessions', amount: '₹39,900', tax: '₹7,182', provider: 'UPI', status: 'failed', failureCode: 'upi_timeout', invoice: null },
  { id: 'PAY-2026-110606', time: '2026-11-06T12:30:00+05:30', role: 'investor', payerId: 'org_55', item: 'Investor membership — Annual', amount: '₹12,00,000', tax: '₹2,16,000', provider: 'Net banking', status: 'succeeded', invoice: 'INV-2026-1046' },
  { id: 'PAY-2026-110607', time: '2026-11-06T11:40:00+05:30', role: 'employer', payerId: 'org_77', item: 'Job post pack — 10 posts', amount: '₹89,900', tax: '₹16,182', provider: 'UPI', status: 'succeeded', invoice: 'INV-2026-1047' },
  { id: 'PAY-2026-110608', time: '2026-11-06T11:10:00+05:30', role: 'startup', payerId: 'org_90', item: 'Startup subscription — Starter', amount: '₹99,900', tax: '₹17,982', provider: 'Credit card', status: 'disputed', invoice: 'INV-2026-1048' },
];

export const dunningQueue = [
  { account: 'org_11', amount: '₹29,900', stage: 'Day 3', lastAttempt: '2026-11-04 10:00', failureReason: 'card_declined', nextAction: 'Retry day 5' },
  { account: 'org_22', amount: '₹49,900', stage: 'Day 5', lastAttempt: '2026-11-02 14:30', failureReason: 'insufficient_funds', nextAction: 'Grace period ends today' },
  { account: 'org_33', amount: '₹99,900', stage: 'Day 7', lastAttempt: '2026-11-01 09:00', failureReason: 'upi_timeout', nextAction: 'Pause new posts' },
];

export const reconciliation = [
  { provider: 'UPI Provider A', settlement: 'SET-2026-1105', expected: '₹12,50,000', received: '₹12,41,500', status: 'mismatch', date: '2026-11-05' },
  { provider: 'Card Provider B', settlement: 'SET-2026-1106', expected: '₹8,90,000', received: '₹8,90,000', status: 'matched', date: '2026-11-06' },
  { provider: 'Net Banking C', settlement: 'SET-2026-1104', expected: '₹4,50,000', received: 'Pending', status: 'unmatched', date: '2026-11-04' },
];
