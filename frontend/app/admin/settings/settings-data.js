import {
  User as UserIcon,
  Shield,
  ShieldCheck,
  Bell,
  Layout,
  Activity as ActivityIcon,
  Users as UsersIcon,
  Clock as ClockIcon,
  File as FileIcon,
  HelpCircle,
} from 'lucide-react';

export const settingsSections = [
  { key: 'profile', label: 'Profile', icon: UserIcon, desc: 'Read-only from identity provider' },
  { key: 'access', label: 'My access', icon: ShieldCheck, desc: 'Roles, permissions, elevation' },
  { key: 'security', label: 'Security & Auth', icon: Shield, desc: 'Keys, sessions, devices' },
  { key: 'notifications', label: 'Notifications', icon: Bell, desc: 'Preferences and channels' },
  { key: 'display', label: 'Display & Accessibility', icon: Layout, desc: 'Theme, density, font size' },
  { key: 'work', label: 'Work preferences', icon: ActivityIcon, desc: 'Default views, macros' },
  { key: 'delegation', label: 'Delegation and OOO', icon: UsersIcon, desc: 'Delegate approvals, OOO' },
  { key: 'wellbeing', label: 'Wellbeing & Safeguards', icon: ActivityIcon, desc: 'Blur, breaks, exposure' },
  { key: 'on-call', label: 'On-call schedule', icon: ClockIcon, desc: 'Contact methods, shifts' },
  { key: 'data', label: 'My audit trail', icon: FileIcon, desc: 'Audit entries, download' },
  { key: 'policies', label: 'Help and policies', icon: HelpCircle, desc: 'Acceptable use, conduct' },
];

export const profileData = {
  name: 'Alex Kumar',
  email: 'alex.kumar@forma.internal',
  team: 'Platform Reliability & Security',
  manager: 'Priya Sharma (VP Ops)',
  roles: ['On-call engineer', 'SRE Lead'],
  startDate: '2025-03-15',
  location: 'Kolkata, India',
};

export const accessData = {
  canDo: [
    'Review verification cases for startups and mentors',
    'Reveal masked fields with an audited business reason',
    'Approve low-risk refunds and adjustments up to ₹50,000',
    'Inspect compliance audit logs and cryptographic proofs',
  ],
  elevations: [
    { role: 'Senior verification reviewer', reason: 'Second review coverage', caseId: 'VER-2026-004812', approver: 'Compliance lead', start: '2026-10-01', end: '2026-12-31', status: 'Active' },
    { role: 'Break-glass access', reason: 'Incident INC-2026-021', caseId: 'INC-2026-021', approver: 'Security administrator', start: '2026-11-08 00:48', end: '2026-11-08 02:48', status: 'Expired' },
  ],
  training: [
    { name: 'India DPDP & Data Handling', due: '2026-12-15', status: 'Current' },
    { name: 'Security & Phishing Awareness', due: '2026-11-30', status: 'Due soon' },
    { name: 'Maker-Checker Approval Workflows', due: '2026-10-01', status: 'Current' },
  ],
};

export const securityData = {
  keys: [
    { label: 'YubiKey 5 NFC (Primary)', type: 'FIDO2 Hardware Key', added: '2026-03-15', lastUsed: 'Today, 09:10 IST' },
    { label: 'Platform Authenticator (Touch ID)', type: 'Passkey', added: '2026-03-16', lastUsed: 'Today, 08:30 IST' },
  ],
  sessions: [
    { device: 'MacBook Pro 16"', browser: 'Chrome 122', country: 'India', lastActive: 'Active now', managed: true },
    { device: 'iPhone 15 Pro', browser: 'Safari 17', country: 'India', lastActive: '45m ago', managed: true },
    { device: 'ThinkPad T14', browser: 'Edge 121', country: 'Germany (VPN)', lastActive: '3 days ago', managed: false },
  ],
  recentActivity: [
    { action: 'Session Re-authentication', detail: 'Hardware key check passed', time: 'Today, 09:10 IST', type: 'resolved' },
    { action: 'Passkey Authenticated', detail: 'Touch ID verified', time: 'Today, 08:30 IST', type: 'resolved' },
    { action: 'Emergency Break-Glass', detail: 'INC-2026-021 elevated pod access', time: 'Yesterday, 00:48 IST', type: 'pending' },
  ],
};

export const notificationPrefs = [
  { category: 'Security & MFA alerts', in_app: true, email: true, push: true, locked: true },
  { category: 'Escalations & SEV1 Incidents', in_app: true, email: true, push: true, locked: true },
  { category: 'Queue SLA Breaches', in_app: true, email: true, push: false, locked: false },
  { category: 'Approval Requests', in_app: true, email: false, push: false, locked: false },
  { category: 'System Maintenance Notices', in_app: true, email: false, push: false, locked: false },
];
