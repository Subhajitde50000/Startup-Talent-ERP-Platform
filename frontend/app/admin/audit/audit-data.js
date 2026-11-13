export const auditTabs = [
  { key: 'explorer', label: 'Explorer' },
  { key: 'sensitive-access', label: 'Sensitive access' },
  { key: 'admin-actions', label: 'Admin actions' },
  { key: 'configuration-and-releases', label: 'Configuration & releases' },
  { key: 'security', label: 'Security' },
  { key: 'alerts', label: 'Alerts' },
  { key: 'integrity-and-coverage', label: 'Integrity & coverage' },
  { key: 'export-requests', label: 'Export requests' },
];

export const rangeFilters = [
  { key: '24-hours', label: 'Last 24 hours' },
  { key: '7-days', label: 'Last 7 days' },
  { key: '30-days', label: 'Last 30 days' },
  { key: '90-days', label: 'Last 90 days' },
  { key: 'custom', label: 'Custom range' },
];

export const auditEntries = [
  { id: 'aud_01JD7M4Z9V', at: '2026-11-07T14:12:09Z', actor: { id: 'stf_14', role: 'support_agent', permission: 'reveal_masked' }, category: 'sensitive_access', action: 'reveal', target: { type: 'user', id: 'usr_8f21c', field: 'email' }, caseId: 'TCK-2026-048213', reason: 'verify_requester', outcome: 'success', source: { app: 'admin', route: '/users/:userId' } },
  { id: 'aud_01JD7M4Z9W', at: '2026-11-07T13:45:22Z', actor: { id: 'stf_22', role: 'compliance_officer', permission: 'read_audit' }, category: 'admin_action', action: 'decision', target: { type: 'verification', id: 'VER-2026-004812' }, caseId: 'VER-2026-004812', reason: 'approve_verification', outcome: 'success', source: { app: 'admin', route: '/admin/verifications' } },
  { id: 'aud_01JD7M4Z9X', at: '2026-11-07T13:30:10Z', actor: { id: 'stf_05', role: 'admin', permission: 'edit_config' }, category: 'configuration', action: 'policy_change', target: { type: 'policy', id: 'POL-001' }, reason: 'update_retention', outcome: 'success', source: { app: 'admin', route: '/admin/compliance' } },
  { id: 'aud_01JD7M4Z9Y', at: '2026-11-07T12:15:00Z', actor: { id: 'stf_33', role: 'security_admin', permission: 'break_glass' }, category: 'security', action: 'break_glass_use', target: { type: 'system', id: 'audit_store' }, reason: 'incident_response', outcome: 'success', source: { app: 'admin', route: '/admin/audit' } },
  { id: 'aud_01JD7M4Z9Z', at: '2026-11-07T11:00:00Z', actor: { id: 'stf_14', role: 'support_agent', permission: 'reveal_masked' }, category: 'sensitive_access', action: 'reveal', target: { type: 'user', id: 'usr_9a12b', field: 'phone' }, caseId: 'TCK-2026-048211', reason: 'verify_requester', outcome: 'blocked', source: { app: 'admin', route: '/users/:userId' } },
  { id: 'aud_01JD7M4ZA0', at: '2026-11-07T10:45:00Z', actor: { id: 'sys_01', role: 'system', permission: 'scheduled_job' }, category: 'system', action: 'retention_run', target: { type: 'job', id: 'RET-2026-11-07' }, reason: 'scheduled_retention', outcome: 'success', source: { app: 'system', route: '/jobs/retention' } },
  { id: 'aud_01JD7M4ZA1', at: '2026-11-07T09:30:00Z', actor: { id: 'stf_44', role: 'finance', permission: 'execute_refund' }, category: 'money', action: 'refund', target: { type: 'payment', id: 'PAY-2026-1001' }, reason: 'customer_request', outcome: 'success', source: { app: 'admin', route: '/admin/billing' } },
  { id: 'aud_01JD7M4ZA2', at: '2026-11-07T08:15:00Z', actor: { id: 'stf_05', role: 'admin', permission: 'edit_config' }, category: 'configuration', action: 'feature_flag', target: { type: 'flag', id: 'ff_new_analytics' }, reason: 'launch', outcome: 'success', source: { app: 'admin', route: '/admin/config' } },
];

export const categories = ['all', 'admin_action', 'sensitive_access', 'security', 'configuration', 'money', 'moderation', 'verification', 'system'];
export const outcomes = ['all', 'success', 'blocked', 'failed'];
export const actors = ['all', 'stf_14', 'stf_22', 'stf_05', 'stf_33', 'sys_01', 'stf_44'];

export const alerts = [
  { id: 'ALT-001', rule: 'Many reveals by one person in short time', severity: 'high', entities: 'stf_14', time: '2026-11-07T13:50:00Z', status: 'Reviewing' },
  { id: 'ALT-002', rule: 'Record opens without case links above threshold', severity: 'medium', entities: 'stf_44', time: '2026-11-07T12:20:00Z', status: 'New' },
  { id: 'ALT-003', rule: 'Privilege escalation or break-glass use', severity: 'high', entities: 'stf_33', time: '2026-11-07T11:00:00Z', status: 'Benign' },
  { id: 'ALT-004', rule: 'Bulk export or large result pull', severity: 'medium', entities: 'stf_22', time: '2026-11-07T09:00:00Z', status: 'Closed' },
];

export const exportRequests = [
  { id: 'EXP-001', scope: 'Last 30 days, sensitive access', purpose: 'Regulator request REQ-2026-041', requester: 'Compliance officer', format: 'PDF', status: 'Approved', created: '2026-11-02', expires: '2026-11-09' },
  { id: 'EXP-002', scope: 'Last 90 days, admin actions', purpose: 'Internal audit', requester: 'Security administrator', format: 'CSV', status: 'Pending', created: '2026-11-04', expires: '—' },
];

export const integrity = { verifiedThrough: '2026-11-07T14:00:00Z', status: 'verified', gaps: 0 };
export const coverage = [
  { source: 'Admin pages', expected: 1240, received: 1240, latency: '200ms', status: 'verified' },
  { source: 'Verification service', expected: 890, received: 890, latency: '180ms', status: 'verified' },
  { source: 'Payments service', expected: 450, received: 448, latency: '310ms', status: 'verified' },
  { source: 'Support system', expected: 310, received: 310, latency: '220ms', status: 'verified' },
  { source: 'Identity service', expected: 670, received: 670, latency: '190ms', status: 'verified' },
];
