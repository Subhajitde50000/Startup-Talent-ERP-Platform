// frontend/lib/notifications-data.js
// Central Notification Engine for Startup, Mentor, Investor, Employer, Job Seeker, and Admin.

export const NOTIFICATION_ROLES = [
  { id: 'all', label: 'All Notifications', count: null },
  { id: 'startup', label: 'Startup Founder', color: 'bg-blue-50 text-blue-800' },
  { id: 'mentor', label: 'Mentor', color: 'bg-emerald-50 text-emerald-800' },
  { id: 'investor', label: 'Investor', color: 'bg-purple-50 text-purple-800' },
  { id: 'employer', label: 'Employer', color: 'bg-amber-50 text-amber-800' },
  { id: 'jobseeker', label: 'Job Seeker', color: 'bg-teal-50 text-teal-800' },
  { id: 'admin', label: 'Admin & Trust', color: 'bg-rose-50 text-rose-800' },
];

export const INITIAL_NOTIFICATIONS = [
  // Startup Notifications
  {
    id: 'notif-s1',
    role: 'startup',
    category: 'funding',
    title: 'Term sheet received from Zenith Capital',
    detail: 'Angel syndicate lead Vikram Singhania sent a ₹1.5 Cr seed round term sheet draft for FinFlow.',
    time: '12m ago',
    timestamp: Date.now() - 12 * 60 * 1000,
    unread: true,
    urgent: true,
    actionUrl: '/startup/funding',
    actionLabel: 'Review Term Sheet',
    icon: 'DollarSign',
  },
  {
    id: 'notif-s2',
    role: 'startup',
    category: 'advisory',
    title: 'Mentor session confirmed: Dr. Sneha Roy',
    detail: 'Architecture roadmap & microservices review scheduled for tomorrow at 4:30 PM IST on Google Meet.',
    time: '45m ago',
    timestamp: Date.now() - 45 * 60 * 1000,
    unread: true,
    urgent: false,
    actionUrl: '/mentor/sessions',
    actionLabel: 'Session Details',
    icon: 'Calendar',
  },
  {
    id: 'notif-s3',
    role: 'startup',
    category: 'compliance',
    title: 'DPIIT Form 2 Exemption Approved',
    detail: 'Startup India council verified your angel tax exemption documentation under Section 56(2)(viib).',
    time: '2h ago',
    timestamp: Date.now() - 2 * 3600 * 1000,
    unread: false,
    urgent: false,
    actionUrl: '/startup/compliance',
    actionLabel: 'Download Certificate',
    icon: 'CheckCircle2',
  },
  {
    id: 'notif-s4',
    role: 'startup',
    category: 'community',
    title: 'Aarav, your question has 3 new expert answers',
    detail: 'Sneha Roy marked an accepted architectural solution for Stripe GST overseas export invoicing.',
    time: '4h ago',
    timestamp: Date.now() - 4 * 3600 * 1000,
    unread: false,
    urgent: false,
    actionUrl: '/community/posts/post_gst_billing',
    actionLabel: 'View Solution',
    icon: 'MessageSquare',
  },

  // Mentor Notifications
  {
    id: 'notif-m1',
    role: 'mentor',
    category: 'advisory',
    title: 'New venture advisory request: FinFlow Technologies',
    detail: 'Founder Aarav Kapoor requested a 45-minute deep-dive on B2B cloud infrastructure scaling.',
    time: '25m ago',
    timestamp: Date.now() - 25 * 60 * 1000,
    unread: true,
    urgent: true,
    actionUrl: '/mentor/sessions',
    actionLabel: 'Accept Request',
    icon: 'Calendar',
  },
  {
    id: 'notif-m2',
    role: 'mentor',
    category: 'community',
    title: 'Upcoming Live AMA: Scaling Next.js to 1M Daily Users',
    detail: '48 founders and tech leads have RSVP’d for your live workshop starting Friday 5:00 PM IST.',
    time: '3h ago',
    timestamp: Date.now() - 3 * 3600 * 1000,
    unread: true,
    urgent: false,
    actionUrl: '/community',
    actionLabel: 'View RSVP List',
    icon: 'Sparkles',
  },
  {
    id: 'notif-m3',
    role: 'mentor',
    category: 'community',
    title: 'Badge Awarded: Top Architecture Contributor',
    detail: 'Your technical answer on distributed telemetry was marked as Accepted Solution by 5 founders.',
    time: '1d ago',
    timestamp: Date.now() - 24 * 3600 * 1000,
    unread: false,
    urgent: false,
    actionUrl: '/community',
    actionLabel: 'View Badge',
    icon: 'Award',
  },

  // Investor Notifications
  {
    id: 'notif-i1',
    role: 'investor',
    category: 'milestones',
    title: 'Portfolio Milestone: FinFlow reached ₹2.8 Cr ARR',
    detail: 'Quarterly telemetry metrics and audited pipeline report uploaded to Investor Data Room.',
    time: '18m ago',
    timestamp: Date.now() - 18 * 60 * 1000,
    unread: true,
    urgent: false,
    actionUrl: '/investor/portfolio',
    actionLabel: 'View Telemetry',
    icon: 'TrendingUp',
  },
  {
    id: 'notif-i2',
    role: 'investor',
    category: 'syndicate',
    title: 'Angel Syndicate Allocation: 85% Subscribed',
    detail: '14 accredited angels confirmed soft commitments for the B2B Fintech syndicate round.',
    time: '1h ago',
    timestamp: Date.now() - 60 * 60 * 1000,
    unread: true,
    urgent: true,
    actionUrl: '/investor/syndicates',
    actionLabel: 'Review Syndicate',
    icon: 'Users',
  },
  {
    id: 'notif-i3',
    role: 'investor',
    category: 'compliance',
    title: 'Due Diligence Checklist Ready: QuickDraft AI',
    detail: 'Corporate legal counsel completed IP ownership scan and Cap Table validation.',
    time: '2d ago',
    timestamp: Date.now() - 48 * 3600 * 1000,
    unread: false,
    urgent: false,
    actionUrl: '/investor/deals',
    actionLabel: 'Inspect Dossier',
    icon: 'FileText',
  },

  // Employer Notifications
  {
    id: 'notif-e1',
    role: 'employer',
    category: 'interviews',
    title: 'Candidate Priya Nair accepted offer letter',
    detail: 'Senior Frontend Engineer position accepted. Tentative start date: Dec 1, 2026.',
    time: '35m ago',
    timestamp: Date.now() - 35 * 60 * 1000,
    unread: true,
    urgent: true,
    actionUrl: '/employer/candidates',
    actionLabel: 'View Offer Letter',
    icon: 'UserCheck',
  },
  {
    id: 'notif-e2',
    role: 'employer',
    category: 'applications',
    title: '5 new AI-matched applicants for DevOps Lead',
    detail: 'Pre-screened profiles with verified AWS/Kubernetes experience scored >90% match.',
    time: '2h ago',
    timestamp: Date.now() - 2 * 3600 * 1000,
    unread: true,
    urgent: false,
    actionUrl: '/employer/jobs',
    actionLabel: 'Review Candidates',
    icon: 'Briefcase',
  },
  {
    id: 'notif-e3',
    role: 'employer',
    category: 'compliance',
    title: 'ESOP Allocation Pool Approved',
    detail: 'Board approved 10% unallocated employee stock ownership scheme for 2026/27 hiring.',
    time: '1d ago',
    timestamp: Date.now() - 24 * 3600 * 1000,
    unread: false,
    urgent: false,
    actionUrl: '/employer/settings',
    actionLabel: 'View ESOP Ledger',
    icon: 'CheckCircle2',
  },

  // Job Seeker Notifications
  {
    id: 'notif-j1',
    role: 'jobseeker',
    category: 'interviews',
    title: 'Interview confirmed: FinFlow Technologies',
    detail: 'Round 2 Technical Architecture discussion scheduled with CTO on Thursday 11:00 AM IST.',
    time: '10m ago',
    timestamp: Date.now() - 10 * 60 * 1000,
    unread: true,
    urgent: true,
    actionUrl: '/jobseeker/interviews',
    actionLabel: 'Prepare & Join',
    icon: 'Calendar',
  },
  {
    id: 'notif-j2',
    role: 'jobseeker',
    category: 'offers',
    title: 'Offer received: Senior Frontend Engineer',
    detail: 'Annual CTC ₹24,00,000 + 0.15% ESOP pool grant from Northstar Labs.',
    time: '1h ago',
    timestamp: Date.now() - 60 * 60 * 1000,
    unread: true,
    urgent: true,
    actionUrl: '/jobseeker/applications',
    actionLabel: 'Review Offer',
    icon: 'DollarSign',
  },
  {
    id: 'notif-j3',
    role: 'jobseeker',
    category: 'applications',
    title: 'Resume ATS score updated: 96% Match',
    detail: 'Your verified Next.js and distributed systems skills increased recruiter profile views by 4x.',
    time: '1d ago',
    timestamp: Date.now() - 24 * 3600 * 1000,
    unread: false,
    urgent: false,
    actionUrl: '/jobseeker/profile',
    actionLabel: 'View Profile Score',
    icon: 'Sparkles',
  },

  // Admin & Trust & Safety Notifications
  {
    id: 'notif-a1',
    role: 'admin',
    category: 'security',
    title: 'Trust & Safety: Flagged post in Ask the Community',
    detail: 'Reported for potential unsolicited promotion. Triage required in Moderation Queue.',
    time: '5m ago',
    timestamp: Date.now() - 5 * 60 * 1000,
    unread: true,
    urgent: true,
    actionUrl: '/admin/community',
    actionLabel: 'Triage Queue',
    icon: 'ShieldAlert',
  },
  {
    id: 'notif-a2',
    role: 'admin',
    category: 'system',
    title: 'Dual-Authorization Request: Treasury Transfer',
    detail: 'Finance lead initiated withdrawal batch #884. Requires second admin digital signature.',
    time: '40m ago',
    timestamp: Date.now() - 40 * 60 * 1000,
    unread: true,
    urgent: true,
    actionUrl: '/admin/dashboard',
    actionLabel: 'Authorize',
    icon: 'AlertTriangle',
  },
  {
    id: 'notif-a3',
    role: 'admin',
    category: 'compliance',
    title: 'New DPIIT Startup Accreditation Submitted',
    detail: 'FinFlow Technologies submitted audited certificate #DPIIT-449102 for Tier 1 verified badge.',
    time: '3h ago',
    timestamp: Date.now() - 3 * 3600 * 1000,
    unread: false,
    urgent: false,
    actionUrl: '/admin/verifications',
    actionLabel: 'Verify Document',
    icon: 'CheckCircle2',
  },
];

export const NOTIFICATIONS_STORAGE_KEY = 'erp_platform_notifications_v1';
export const NOTIFICATIONS_UPDATED_EVENT = 'erp_notifications_updated';

/**
 * Load notifications from localStorage (client) or return seed (SSR)
 */
export function loadNotifications() {
  if (typeof window === 'undefined') {
    return INITIAL_NOTIFICATIONS;
  }
  try {
    const raw = localStorage.getItem(NOTIFICATIONS_STORAGE_KEY);
    if (!raw) {
      saveNotifications(INITIAL_NOTIFICATIONS);
      return INITIAL_NOTIFICATIONS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : INITIAL_NOTIFICATIONS;
  } catch (e) {
    console.error('Failed to parse notifications storage:', e);
    return INITIAL_NOTIFICATIONS;
  }
}

/**
 * Save notifications to localStorage & broadcast event
 */
export function saveNotifications(items) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent(NOTIFICATIONS_UPDATED_EVENT, { detail: items }));
  } catch (e) {
    console.error('Failed to save notifications:', e);
  }
}

/**
 * Mark a single notification as read
 */
export function markNotificationAsRead(id) {
  const current = loadNotifications();
  const updated = current.map((item) => (item.id === id ? { ...item, unread: false } : item));
  saveNotifications(updated);
  return updated;
}

/**
 * Mark all notifications as read (optionally for a specific role)
 */
export function markAllNotificationsAsRead(roleFilter = 'all') {
  const current = loadNotifications();
  const updated = current.map((item) => {
    if (roleFilter === 'all' || item.role === roleFilter) {
      return { ...item, unread: false };
    }
    return item;
  });
  saveNotifications(updated);
  return updated;
}

/**
 * Delete a single notification
 */
export function deleteNotification(id) {
  const current = loadNotifications();
  const updated = current.filter((item) => item.id !== id);
  saveNotifications(updated);
  return updated;
}

/**
 * Clear all notifications (optionally for a specific role)
 */
export function clearAllNotifications(roleFilter = 'all') {
  const current = loadNotifications();
  const updated = roleFilter === 'all' ? [] : current.filter((item) => item.role !== roleFilter);
  saveNotifications(updated);
  return updated;
}

/**
 * Get unread count for a role (or all)
 */
export function getUnreadNotificationsCount(items, roleFilter = 'all') {
  if (!Array.isArray(items)) return 0;
  return items.filter((n) => {
    if (!n.unread) return false;
    if (roleFilter === 'all') return true;
    return n.role === roleFilter;
  }).length;
}
