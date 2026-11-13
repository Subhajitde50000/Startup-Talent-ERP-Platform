export const analyticsTabs = [
  { key: 'overview', label: 'Platform Overview' },
  { key: 'startups', label: 'Startups & Rounds' },
  { key: 'mentors', label: 'Mentors & Sessions' },
  { key: 'investors', label: 'Investors & Data Rooms' },
  { key: 'jobs', label: 'Job Applications & Hires' },
  { key: 'marketplace-health', label: 'Marketplace Health' },
];

export const rangeFilters = [
  { key: '7-days', label: 'Last 7 days' },
  { key: '30-days', label: 'Last 30 days' },
  { key: '90-days', label: 'Last 90 days' },
  { key: 'this-quarter', label: 'This quarter' },
  { key: 'this-year', label: 'This financial year' },
];

export const kpis = [
  { label: 'Registered Accounts', value: '48,210', sub: 'Across 5 roles', status: 'live' },
  { label: 'Verified Ratio', value: 'Startups 71% · Mentors 84%', sub: 'KYC verified', status: 'live' },
  { label: 'Active Monthly Accounts', value: '21,900', sub: 'Logged in last 28d', status: 'live' },
  { label: 'Activation Conversion', value: '54%', sub: 'First key action within 7d', status: 'standard' },
  { label: 'Gross Platform Volume', value: '₹4,28,00,000', sub: 'Quarter to date', status: 'live' },
  { label: 'Cohort Retention (M3)', value: '38%', sub: 'Active at day 90', status: 'standard' },
];

export const funnelStages = [
  { stage: '1. Account Registered', startups: 1240, mentors: 890, investors: 310, employers: 560, jobseekers: 4200 },
  { stage: '2. Profile Completed', startups: 980, mentors: 720, investors: 240, employers: 420, jobseekers: 3100 },
  { stage: '3. Identity Verified', startups: 710, mentors: 748, investors: 192, employers: 370, jobseekers: 2640 },
  { stage: '4. First Key Action', startups: 540, mentors: 620, investors: 150, employers: 290, jobseekers: 2260 },
];

export const insights = [
  { text: 'Registration to verified conversion rose from 41% to 46% in October, driven by automated KYC deed checks.', type: 'positive' },
  { text: 'Mentor session completion reached 89% this month, up 4 points from September.', type: 'positive' },
  { text: 'Employer job posts with zero applicants after 14 days rose to 12% — review talent matching density.', type: 'warning' },
];
