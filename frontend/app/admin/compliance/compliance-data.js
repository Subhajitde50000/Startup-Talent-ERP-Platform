export const compliancePrimaryTabs = [
  { key: 'overview', label: 'Overview' },
  { key: 'processing-records', label: 'Processing records' },
  { key: 'retention-and-deletion', label: 'Retention & deletion' },
  { key: 'incidents-and-breaches', label: 'Incidents & breaches' },
  { key: 'legal-holds', label: 'Legal holds' },
  { key: 'vendors-and-transfers', label: 'Vendors & transfers' },
];

export const complianceMoreTabs = [
  { key: 'consent-and-notices', label: 'Consent & notices' },
  { key: 'risk-and-dpias', label: 'Risk & DPIAs' },
  { key: 'policies-and-training', label: 'Policies & training' },
  { key: 'reports-and-exports', label: 'Reports & exports' },
  { key: 'calendar', label: 'Calendar' },
];

export const complianceTabs = [
  ...compliancePrimaryTabs,
  ...complianceMoreTabs,
];

export const rangeFilters = [
  { key: '7-days', label: 'Last 7 days' },
  { key: '30-days', label: 'Last 30 days' },
  { key: '90-days', label: 'Last 90 days' },
  { key: 'this-quarter', label: 'This quarter' },
  { key: 'this-year', label: 'This financial year' },
  { key: 'custom', label: 'Custom range' },
];

export const summaryStrip = [
  { label: 'Open obligations', value: '23', status: 'open-obligations', sub: 'Across all compliance areas' },
  { label: 'Overdue items', value: '2', status: 'overdue-items', sub: 'Escalate within 24 hours' },
  { label: 'Incidents open', value: '3', status: 'incidents-open', sub: '1 notifiable — clock running' },
  { label: 'Statutory DPDP holds', value: '2', status: 'requests-in-progress', sub: 'Active legal preservation' },
];

export const postureAreas = [
  {
    id: 'data-rights',
    area: 'Data rights',
    status: 'on-track',
    statusLabel: 'On track',
    owner: 'Data protection officer',
    nextDeadline: 'Requests due in 7 days',
    lastReview: '2 Nov 2026',
    evidence: 'On-time completion rate (90 days), extensions used, refusals with reasons',
  },
  {
    id: 'retention-and-deletion',
    area: 'Retention and deletion',
    status: 'needs-attention',
    statusLabel: 'Needs attention',
    owner: 'Data steward',
    nextDeadline: 'Weekly retention job',
    lastReview: '30 Oct 2026',
    evidence: 'Jobs run on schedule, failures, backlog, backup overwrite status',
  },
  {
    id: 'consent-and-notices',
    area: 'Consent and notices',
    status: 'on-track',
    statusLabel: 'On track',
    owner: 'Compliance officer',
    nextDeadline: 'Notice version review',
    lastReview: '15 Oct 2026',
    evidence: 'Current versions, acceptance rates, withdrawn consents',
  },
  {
    id: 'security-and-incidents',
    area: 'Security and incidents',
    status: 'overdue',
    statusLabel: 'Overdue',
    owner: 'Security administrator',
    nextDeadline: 'Breach clock — 48h left',
    lastReview: '2 Nov 2026',
    evidence: 'Open incidents, time to contain, notifications due',
  },
  {
    id: 'vendors',
    area: 'Vendors',
    status: 'on-track',
    statusLabel: 'On track',
    owner: 'Vendor manager',
    nextDeadline: 'Assessment due — 14 days',
    lastReview: '10 Oct 2026',
    evidence: 'Vendors without current data-processing terms, sub-processor changes',
  },
  {
    id: 'kyc-and-aml',
    area: 'KYC and AML',
    status: 'on-track',
    statusLabel: 'On track',
    owner: 'Compliance officer',
    nextDeadline: 'Re-verification wave',
    lastReview: '1 Nov 2026',
    evidence: 'Verification backlog and times, screening alert handling',
  },
  {
    id: 'securities-related-features',
    area: 'Securities-related features',
    status: 'needs-attention',
    statusLabel: 'Needs attention',
    owner: 'Legal counsel',
    nextDeadline: 'Investor module review',
    lastReview: '20 Sep 2026',
    evidence: 'Legal review status, event approvals, disclaimers current',
  },
  {
    id: 'trust-and-safety',
    area: 'Trust and safety obligations',
    status: 'on-track',
    statusLabel: 'On track',
    owner: 'Trust and safety lead',
    nextDeadline: 'Grievance SLA review',
    lastReview: '25 Oct 2026',
    evidence: 'Grievance response times, report acknowledgment times',
  },
  {
    id: 'ai-governance',
    area: 'AI governance',
    status: 'under-review',
    statusLabel: 'Under review',
    owner: 'AI quality lead',
    nextDeadline: 'Rubric audit',
    lastReview: '5 Oct 2026',
    evidence: 'Review turnaround, bias test status, model registry reviews',
  },
  {
    id: 'accessibility',
    area: 'Accessibility and consumer protection',
    status: 'on-track',
    statusLabel: 'On track',
    owner: 'Product counsel',
    nextDeadline: 'Audit item closure',
    lastReview: '12 Oct 2026',
    evidence: 'Open items from audits (Content and Billing)',
  },
];

export const processingRecords = [
  { id: 'PA-001', activity: 'Verification of investors', purpose: 'KYC / AML and securities review', legalBasis: 'Legal obligation', subjects: 'Investors', recipients: 'Compliance, security', retention: '5 years', region: 'India', status: 'certified' },
  { id: 'PA-002', activity: 'Interview practice scoring', purpose: 'AI interview trainer feedback', legalBasis: 'Consent', subjects: 'Candidates', recipients: 'AI provider, product', retention: '24 months', region: 'India', status: 'certified' },
  { id: 'PA-003', activity: 'Mentor payouts', purpose: 'Mentor honorarium disbursement', legalBasis: 'Contract', subjects: 'Mentors', recipients: 'Finance, payments provider', retention: '7 years', region: 'India', status: 'certified' },
  { id: 'PA-004', activity: 'Job application handling', purpose: 'Employer hiring workflow', legalBasis: 'Contract', subjects: 'Candidates', recipients: 'Employers', retention: '36 months', region: 'India', status: 'certified' },
  { id: 'PA-005', activity: 'Support tickets', purpose: 'User support and dispute resolution', legalBasis: 'Legitimate interest', subjects: 'All users', recipients: 'Support', retention: '24 months', region: 'India', status: 'certified' },
  { id: 'PA-006', activity: 'Analytics', purpose: 'Aggregate platform metrics', legalBasis: 'Legitimate interest', subjects: 'All users (pseudonymous)', recipients: 'Analysts', retention: '12 months', region: 'India', status: 'provisional' },
];

export const incidents = [
  { id: 'INC-2026-014', type: 'personal_data_breach', severity: 'notifiable', awareAt: '2026-11-02T09:40:00+05:30', status: 'Open', subjects: 340, clock: 'Regulator notice due in 48h' },
  { id: 'INC-2026-015', type: 'security_incident', severity: 'medium', awareAt: '2026-10-30T14:20:00+05:30', status: 'Contained', subjects: 0, clock: 'Contained' },
  { id: 'INC-2026-016', type: 'misuse_by_staff', severity: 'low', awareAt: '2026-10-28T11:00:00+05:30', status: 'Closed', subjects: 2, clock: 'Closed' },
];

export const vendors = [
  { id: 'V-001', vendor: 'Payments provider', service: 'Payment processing', region: 'India', terms: 'Current', riskTier: 'High', status: 'on-track' },
  { id: 'V-002', vendor: 'KYC and screening', service: 'Identity verification', region: 'India', terms: 'Current', riskTier: 'High', status: 'on-track' },
  { id: 'V-003', vendor: 'AI provider', service: 'Interview trainer model', region: 'EU', terms: 'Expiring in 30 days', riskTier: 'Medium', status: 'needs-attention' },
  { id: 'V-004', vendor: 'Email and SMS', service: 'Transactional messaging', region: 'India', terms: 'Current', riskTier: 'Low', status: 'on-track' },
];

export const legalHolds = [
  { id: 'HOLD-001', scope: 'Account usr_8f21c', reason: 'Regulator investigation', requestedBy: 'Compliance', placedBy: 'Compliance officer', date: '2026-10-25', status: 'Active' },
  { id: 'HOLD-002', scope: 'Case TCK-2026-048213', reason: 'Litigation hold', requestedBy: 'Legal', placedBy: 'Compliance officer', date: '2026-10-30', status: 'Active' },
];

// Rich datasets for the "More" sub-tabs
export const consentRecords = [
  { id: 'CSN-2026-01', title: 'DPDP General Privacy Notice & Terms', version: 'v2.4', language: 'EN, HI', optInRate: '99.4%', status: 'active', lastAudited: '15 Oct 2026' },
  { id: 'CSN-2026-02', title: 'AI Mock Interview Audio & Video Recording Consent', version: 'v1.8', language: 'EN', optInRate: '94.2%', status: 'active', lastAudited: '20 Oct 2026' },
  { id: 'CSN-2026-03', title: 'Startup Pitch Deck Distribution to Accredited Investors', version: 'v3.0', language: 'EN', optInRate: '98.1%', status: 'active', lastAudited: '02 Nov 2026' },
  { id: 'CSN-2026-04', title: 'Marketing Communications & Newsletter Digest', version: 'v1.2', language: 'EN', optInRate: '68.5%', status: 'active', lastAudited: '28 Oct 2026' },
];

export const dpiaAssessments = [
  { id: 'DPIA-2026-04', systemName: 'Candidate AI Readiness Scoring Model', riskLevel: 'High', residualRisk: 'Low', reviewer: 'Data Protection Officer', status: 'Approved', nextReview: '15 Dec 2026' },
  { id: 'DPIA-2026-03', systemName: 'Automated KYC Biometric Liveness Verification', riskLevel: 'Critical', residualRisk: 'Medium', reviewer: 'Lead Security Architect', status: 'Conditional', nextReview: '30 Nov 2026' },
  { id: 'DPIA-2026-02', systemName: 'Escrow Dispute Neutral Automated Arbitrator', riskLevel: 'Medium', residualRisk: 'Low', reviewer: 'Legal Counsel', status: 'Approved', nextReview: '10 Jan 2027' },
];

export const policiesAndTraining = [
  { id: 'POL-01', title: 'DPDP Personal Data Governance & Processing Standard', scope: 'All Staff', completion: '98%', status: 'Compliant', renewDate: 'Annual (Q1)' },
  { id: 'POL-02', title: 'Incident Response & Statutory Breach Notification Runbook', scope: 'Engineering & SRE', completion: '100%', status: 'Compliant', renewDate: 'Bi-annual' },
  { id: 'POL-03', title: 'Information Security & Access Control Policy (ISO 27001)', scope: 'Platform Admin', completion: '96%', status: 'Compliant', renewDate: 'Annual (Q2)' },
  { id: 'POL-04', title: 'Anti-Bribery, Anti-Money Laundering & Investor KYC Protocols', scope: 'Operations & Finance', completion: '95%', status: 'Compliant', renewDate: 'Annual (Q1)' },
];

export const reportsAndExports = [
  { id: 'EXP-8821', title: 'SOC 2 Type II Statutory Evidence Bundle', period: 'FY 2025-26 Q2', generatedAt: '01 Nov 2026', format: 'ZIP / Cryptographically Signed PDF', status: 'Ready' },
  { id: 'EXP-8820', title: 'Quarterly DPDP Data Protection Officer Compliance Audit', period: 'Q3 2026', generatedAt: '28 Oct 2026', format: 'PDF Package', status: 'Ready' },
  { id: 'EXP-8819', title: 'Sub-Processor Cross-Border Data Transfer Registry', period: 'Oct 2026', generatedAt: '15 Oct 2026', format: 'CSV / JSON Ledger', status: 'Archived' },
];

export const complianceCalendar = [
  { date: '15 Nov 2026', title: 'Annual Cert-In Cyber Security Audit Milestone', type: 'Statutory Audit', owner: 'CISO Office', status: 'Upcoming' },
  { date: '30 Nov 2026', title: 'Vendor Data Processing Addendum (DPA) Expiry Review', type: 'Contractual', owner: 'Vendor Lead', status: 'Pending' },
  { date: '15 Dec 2026', title: 'DPDP Rights Processing Quarterly Review', type: 'Regulatory Filing', owner: 'DPO', status: 'Scheduled' },
  { date: '31 Dec 2026', title: 'Annual Cryptographic Key Rotation & Deletion Sweep', type: 'Technical Review', owner: 'SecOps', status: 'Scheduled' },
];
