import {
  Book,
  Monitor,
  AlertTriangle,
  ShieldCheck,
  ShieldAlert,
  Activity,
  Banknote,
  Users,
  Clock,
  FileText,
  Mail,
  Lock,
  Phone,
} from 'lucide-react';

export const helpTopics = [
  { key: 'getting-started', label: 'Console Onboarding & Tour', icon: Book, count: 8, desc: 'First week checklist, console tour, hardware key setup, data masking and auditing.' },
  { key: 'runbooks', label: 'Operational Incident Runbooks', icon: AlertTriangle, count: 12, desc: 'Severity ladders, provider outage playbooks, failover triggers, and rollback checklists.' },
  { key: 'moderation', label: 'Moderation Decision Trees', icon: ShieldAlert, count: 14, desc: 'Policy enforcement guidance, scam indicators, take-down protocols, and appeal rubrics.' },
  { key: 'verification', label: 'Entity Verification Manual', icon: ShieldCheck, count: 9, desc: 'Checklists, evidence thresholds, corporate registry lookups, and dual-review rules.' },
  { key: 'money', label: 'Financial Controls & Payouts', icon: Banknote, count: 7, desc: 'Maker-checker procedures, payout batches, refund approvals, and settlement reconciliation.' },
  { key: 'compliance', label: 'Statutory Compliance & DPDP', icon: ShieldCheck, count: 8, desc: 'Data-rights request fulfillment, regulatory hold procedures, and breach notification clocks.' },
];

export const quickLinks = [
  { label: 'Admin User Manual (PDF)', href: '/admin/manual', icon: Book, badge: 'v4.2.0' },
  { label: 'Active Incident Runbook', href: '/admin/system', icon: AlertTriangle, badge: 'INC-2026-021' },
  { label: 'Escalation Directory', href: '/admin/settings', icon: ShieldCheck, badge: 'All Teams' },
  { label: 'On-Call Telemetry', href: '/admin/system', icon: Phone, badge: 'Live SRE' },
  { label: 'Audit Trail Registry', href: '/admin/audit', icon: FileText, badge: 'Immutable' },
];

export const recentlyUpdated = [
  { title: 'Admin Portal Operational User Manual v4.2.0 (49 Routes)', updated: 'Just now', author: 'Enterprise QA' },
  { title: 'Payment Webhook Latency Runbook', updated: '2 hours ago', author: 'SRE Lead' },
  { title: 'Startup Entity KYC Checklist v3.2', updated: '5 hours ago', author: 'Trust Team' },
  { title: 'Statutory DPDP Data Access Protocol', updated: '1 day ago', author: 'Compliance Officer' },
  { title: 'Escrow Payout Batch Authorization Checklist', updated: '2 days ago', author: 'Finance Lead' },
];
