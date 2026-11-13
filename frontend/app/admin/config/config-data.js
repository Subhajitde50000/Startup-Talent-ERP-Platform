export const configTabs = [
  { key: 'feature-flags', label: 'Feature Flags & Rollouts', count: 6 },
  { key: 'rate-limits', label: 'System Limits & Throttles', count: 5 },
  { key: 'maintenance', label: 'Freeze Windows & Maintenance', count: 4 },
];

export const summaryStrip = [
  { label: 'Active Feature Flags', value: '23', status: 'live', sub: 'Across production clusters' },
  { label: 'Staged Rollouts', value: '4', status: 'pending', sub: 'Canary testing active' },
  { label: 'Next Freeze Window', value: '15 Dec 2026', status: 'standard', sub: 'Year-end code freeze' },
  { label: 'Config Drift Gaps', value: '0', status: 'resolved', sub: 'Staging in sync with prod' },
];

export const featureFlags = [
  { key: 'ai-interview-practice', name: 'AI Voice Interview Practice v2', owner: 'ai-quality', status: 'live', rollout: '100%', enabled: true },
  { key: 'advanced-data-rooms', name: 'High-Security Investor Data Rooms', owner: 'product', status: 'staged', rollout: '25%', enabled: true },
  { key: 'instant-bank-verification', name: 'Instant UPI/Penny Drop Bank Verification', owner: 'trust', status: 'staged', rollout: '10%', enabled: true },
  { key: 'enterprise-sso-saml', name: 'Enterprise SAML/SSO Enforcement', owner: 'security', status: 'staged', rollout: '0%', enabled: false },
  { key: 'new-employer-pipeline', name: 'Interactive Kanban Pipeline', owner: 'product', status: 'live', rollout: '100%', enabled: true },
];

export const limits = [
  { key: 'daily-job-posts', name: 'Max Daily Job Postings (Employer Tier)', value: '50', unit: 'posts/day', owner: 'product' },
  { key: 'api-rate-limit', name: 'Global API Rate Limiting Threshold', value: '1,000', unit: 'req/min', owner: 'platform' },
  { key: 'storage-quota-per-org', name: 'Encrypted Document Storage Quota', value: '10', unit: 'GB/org', owner: 'platform' },
  { key: 'concurrent-interviews', name: 'Simultaneous AI Practice Sessions', value: '25', unit: 'sessions', owner: 'ai-quality' },
];
