export const systemTabs = [
  { key: 'overview', label: 'Overview' },
  { key: 'services-and-slos', label: 'Services and SLOs' },
  { key: 'alerts', label: 'Alerts' },
  { key: 'incidents', label: 'Incidents' },
  { key: 'status-page', label: 'Status Page' },
  { key: 'maintenance', label: 'Maintenance & Changes' },
];

export const summaryStrip = [
  { label: 'Overall Status', value: 'Operational', status: 'operational', sub: 'All Tier 1 services healthy' },
  { label: 'Open Incidents', value: '1', status: 'medium', sub: '1 SEV2 mitigating' },
  { label: 'Firing Alerts', value: '3', status: 'firing', sub: '1 unacknowledged' },
  { label: 'Uptime (30d)', value: '99.96%', status: 'operational', sub: 'Public availability SLA' },
];

export const services = [
  { key: 'payments', name: 'Payments & Billing Gateway', tier: 1, status: 'degraded', sloAttainment: '99.81%', p95Ms: '840ms', errorRate: '2.1%', owner: 'payments' },
  { key: 'auth', name: 'Authentication & Session Store', tier: 1, status: 'operational', sloAttainment: '99.97%', p95Ms: '120ms', errorRate: '0.1%', owner: 'identity' },
  { key: 'notifications', name: 'Notification Dispatch Engine', tier: 1, status: 'operational', sloAttainment: '99.96%', p95Ms: '450ms', errorRate: '0.4%', owner: 'platform' },
  { key: 'jobs', name: 'Job Board & Pipeline DB', tier: 1, status: 'operational', sloAttainment: '99.93%', p95Ms: '320ms', errorRate: '0.2%', owner: 'hiring' },
  { key: 'verification', name: 'Identity & Entity Verification', tier: 1, status: 'operational', sloAttainment: '99.96%', p95Ms: '680ms', errorRate: '0.5%', owner: 'trust' },
  { key: 'audit', name: 'Cryptographic Audit Log Engine', tier: 1, status: 'operational', sloAttainment: '99.92%', p95Ms: '150ms', errorRate: '0.1%', owner: 'platform' },
  { key: 'analytics-pipeline', name: 'Analytics Streaming Pipeline', tier: 2, status: 'degraded', sloAttainment: '98.80%', p95Ms: '2,500ms', errorRate: '1.2%', owner: 'data' },
];

export const alerts = [
  { id: 'ALT-001', service: 'Payments and billing', rule: 'Payment retry latency > 5s', severity: 'SEV2', started: 'Today, 00:48 IST', duration: '24m', state: 'firing', incident: 'INC-2026-021' },
  { id: 'ALT-002', service: 'Analytics pipeline', rule: 'Event ingestion lag > 10 min', severity: 'SEV3', started: 'Today, 01:00 IST', duration: '12m', state: 'firing', incident: null },
  { id: 'ALT-003', service: 'Practice trainer', rule: 'Speech-to-text error rate spike', severity: 'SEV3', started: 'Yesterday, 23:15 IST', duration: '1h 45m', state: 'acknowledged', incident: null },
];

export const incidents = [
  { id: 'INC-2026-021', title: 'Payment retries delayed', severity: 'SEV2', state: 'Mitigating', started: 'Today, 00:48 IST', affected: '~2,400 users', impact: 'Delayed webhook acknowledgments' },
  { id: 'INC-2026-020', title: 'Search index sync lag', severity: 'SEV3', state: 'Resolved', started: 'Yesterday, 20:00 IST', affected: '~890 users', impact: 'Sub-second search degradation' },
];
