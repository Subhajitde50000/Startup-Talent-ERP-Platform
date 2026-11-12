// community-data.js - Unified Data Store, Compliance Engine & Storage Manager
// Built for Startup, Mentor, Investor, Employer, Job Seeker and Admin roles.

export const COMMUNITY_PERSONAS = [
  {
    id: 'user_founder',
    name: 'Aarav Kapoor',
    handle: 'aarav_finflow',
    role: 'Startup Founder',
    roleKey: 'startup',
    organization: 'FinFlow Technologies Pvt Ltd',
    verified: true,
    badges: ['Verified Founder', 'DPIIT Accredited', 'Investment Ready'],
    avatar: 'AK',
    bio: 'Founder @ FinFlow. Building automated corporate treasury workflows for Indian high-growth startups.',
    trustLevel: 'Trusted',
    helpfulAnswersCount: 14,
    acceptedAnswersCount: 6,
  },
  {
    id: 'user_mentor',
    name: 'Dr. Sneha Roy',
    handle: 'drsneha_tech',
    role: 'Verified Mentor',
    roleKey: 'mentor',
    organization: 'Ex-Google Staff Eng • Adjunct Prof BITS Pilani',
    verified: true,
    badges: ['Verified Mentor', 'Expert: Architecture', 'Top Contributor'],
    avatar: 'SR',
    bio: '15+ years architecting distributed systems. Mentoring 12 DPIIT seed-stage tech startups on scalable infra.',
    trustLevel: 'Moderator',
    helpfulAnswersCount: 89,
    acceptedAnswersCount: 42,
    expertAreas: ['Product Architecture', 'Distributed Systems', 'Engineering Leadership'],
  },
  {
    id: 'user_investor',
    name: 'Vikram Singhania',
    handle: 'vikram_zenith',
    role: 'Angel Investor',
    roleKey: 'investor',
    organization: 'Zenith Capital Ventures',
    verified: true,
    badges: ['Verified Investor', 'Full Tier', 'Angel Syndicate'],
    avatar: 'VS',
    bio: 'Seed & Pre-Series A lead investor across Fintech & Enterprise SaaS in India. 24 portfolio investments.',
    trustLevel: 'Trusted',
    helpfulAnswersCount: 31,
    acceptedAnswersCount: 11,
  },
  {
    id: 'user_jobseeker',
    name: 'Priya Nair',
    handle: 'priya_dev',
    role: 'Job Seeker',
    roleKey: 'jobseeker',
    organization: 'Senior Frontend Engineer (React/Next.js)',
    verified: true,
    badges: ['Verified Talent', 'Top 5% Code Score'],
    avatar: 'PN',
    bio: 'Passionate about web performance, design systems, and building high-fidelity ERP workspaces.',
    trustLevel: 'Member',
    helpfulAnswersCount: 8,
    acceptedAnswersCount: 3,
  },
  {
    id: 'user_employer',
    name: 'Kunal Verma',
    handle: 'kunal_razorscale',
    role: 'Verified Employer',
    roleKey: 'employer',
    organization: 'RazorScale HR & Tech Recruiting',
    verified: true,
    badges: ['Verified Employer', 'Fast Responder'],
    avatar: 'KV',
    bio: 'Head of People at RazorScale. Helping 40+ Series A/B Indian startups hire founding engineering squads.',
    trustLevel: 'Member',
    helpfulAnswersCount: 19,
    acceptedAnswersCount: 7,
  },
  {
    id: 'user_admin',
    name: 'Devraj Sen',
    handle: 'devraj_admin',
    role: 'Platform Admin',
    roleKey: 'admin',
    organization: 'Startup Talent ERP Platform Moderation',
    verified: true,
    badges: ['Platform Admin', 'Trust & Safety Lead', 'Super Moderator'],
    avatar: 'DS',
    bio: 'Overseeing community trust, compliance guardrails, verified role lounges, and safe networking.',
    trustLevel: 'Admin',
    helpfulAnswersCount: 154,
    acceptedAnswersCount: 88,
  },
];

export const COMMUNITY_SPACES = [
  // Open Topic Spaces (for all verified members)
  {
    id: 'ask-community',
    slug: 'ask-community',
    name: 'Ask the Community',
    category: 'Open Spaces',
    categoryKey: 'open',
    description: 'Practical questions about running, financing, scaling, and compliance for Indian startups.',
    rules: [
      'Include what you have already tried and your business context.',
      'Mark the most accurate response as the Accepted Answer.',
      'No confidential terms, data room credentials, or personal contact info.',
    ],
    audience: 'All verified members',
    allowedRoles: ['all'],
    allowedPostTypes: ['Question', 'Discussion', 'Poll'],
    anonymousAllowed: false,
    memberCount: 4280,
    isJoined: true,
    icon: 'HelpCircle',
    answeredRate: '94%',
  },
  {
    id: 'product-tech',
    slug: 'product-tech',
    name: 'Product & Engineering',
    category: 'Open Spaces',
    categoryKey: 'open',
    description: 'System architecture, Next.js, cloud infra optimization, databases, and tech benchmarks.',
    rules: [
      'Include benchmarks, tech stack details, and code snippets where relevant.',
      'Constructive peer architectural reviews only.',
    ],
    audience: 'All verified members',
    allowedRoles: ['all'],
    allowedPostTypes: ['Question', 'Discussion', 'Resource', 'Poll'],
    anonymousAllowed: false,
    memberCount: 3840,
    isJoined: true,
    icon: 'Layers',
    answeredRate: '96%',
  },
  {
    id: 'fundraising-basics',
    slug: 'fundraising-basics',
    name: 'Fundraising & Finance',
    category: 'Open Spaces',
    categoryKey: 'open',
    description: 'Educational discussions on i-SAFEs, CCDs, cap tables, diligence readiness, and DPIIT tax exemptions.',
    rules: [
      'Strictly educational: zero public solicitations or "invest in my startup" pitches.',
      'No sharing of confidential cap tables or unannounced term sheets.',
    ],
    audience: 'All verified members',
    allowedRoles: ['all'],
    allowedPostTypes: ['Question', 'Discussion', 'Resource', 'Poll'],
    anonymousAllowed: false,
    memberCount: 2950,
    isJoined: false,
    icon: 'TrendingUp',
    answeredRate: '91%',
  },
  {
    id: 'hiring-careers',
    slug: 'hiring-careers',
    name: 'Hiring & Culture',
    category: 'Open Spaces',
    categoryKey: 'open',
    description: 'Compensation benchmarks in India, ESOP grant mechanics, hiring pipelines, and workplace questions.',
    rules: [
      'Hiring posts must reference verified platform listings.',
      'No employer defamation or public salary leaks of identifiable persons.',
    ],
    audience: 'All verified members',
    allowedRoles: ['all'],
    allowedPostTypes: ['Question', 'Discussion', 'Resource', 'Looking for', 'Poll'],
    anonymousAllowed: true,
    memberCount: 3100,
    isJoined: false,
    icon: 'Users',
    answeredRate: '89%',
  },
  {
    id: 'wins-milestones',
    slug: 'wins-milestones',
    name: 'Wins & Milestones',
    category: 'Open Spaces',
    categoryKey: 'open',
    description: 'Celebrate startup launches, first 100 customers, revenue milestones, and breakthrough hires.',
    rules: [
      'Celebrate traction and genuine wins with lessons learned for other founders.',
      'No stealth fundraising pitches dressed up as milestones.',
    ],
    audience: 'All verified members',
    allowedRoles: ['all'],
    allowedPostTypes: ['Milestone', 'Discussion'],
    anonymousAllowed: false,
    memberCount: 1950,
    isJoined: true,
    icon: 'Sparkles',
    answeredRate: 'N/A',
  },
  {
    id: 'tools-stack',
    slug: 'tools-stack',
    name: 'Tools, SaaS & Stack',
    category: 'Open Spaces',
    categoryKey: 'open',
    description: 'Tool recommendations, cloud infrastructure discounts, Indian banking/GST software reviews.',
    rules: [
      'Mandatory relationship disclosure if you are affiliated with the tool provider.',
    ],
    audience: 'All verified members',
    allowedRoles: ['all'],
    allowedPostTypes: ['Question', 'Discussion', 'Resource', 'Poll'],
    anonymousAllowed: false,
    memberCount: 1820,
    isJoined: false,
    icon: 'Compass',
    answeredRate: '92%',
  },

  // Role Lounges (Exclusive to Verified Roles)
  {
    id: 'founders-lounge',
    slug: 'founders-lounge',
    name: 'Founders Lounge',
    category: 'Role Lounges',
    categoryKey: 'lounge',
    description: 'Private room for verified startup founders. Candid peer discussions on cash runway, co-founder dynamics, and market conditions.',
    rules: [
      'Strictly confidential to verified founders. What is discussed in the lounge stays in the lounge.',
      'No pitching to fellow founders.',
    ],
    audience: 'Verified Startup Founders only',
    allowedRoles: ['startup', 'admin'],
    allowedPostTypes: ['Question', 'Discussion', 'Poll'],
    anonymousAllowed: false,
    memberCount: 890,
    isJoined: true,
    icon: 'Briefcase',
    answeredRate: '95%',
  },
  {
    id: 'mentors-circle',
    slug: 'mentors-circle',
    name: 'Mentors Circle',
    category: 'Role Lounges',
    categoryKey: 'lounge',
    description: 'Private room for verified platform mentors. Exchange advisory best practices, discuss mentee progress frameworks, and coordinate office hours.',
    rules: [
      'Peer mentor discussions only.',
      'Maintain confidentiality of mentored startups.',
    ],
    audience: 'Verified Mentors only',
    allowedRoles: ['mentor', 'admin'],
    allowedPostTypes: ['Question', 'Discussion', 'Resource'],
    anonymousAllowed: false,
    memberCount: 310,
    isJoined: false,
    icon: 'UserCheck',
    answeredRate: '98%',
  },
  {
    id: 'investors-forum',
    slug: 'investors-forum',
    name: 'Investors Forum',
    category: 'Role Lounges',
    categoryKey: 'lounge',
    description: 'Private forum for accredited angels, syndicate leads, and venture partners. Market trends, syndication mechanics, and macro diligence.',
    rules: [
      'Accredited investors only.',
      'No sharing of non-public portfolio company data.',
    ],
    audience: 'Verified Investors only',
    allowedRoles: ['investor', 'admin'],
    allowedPostTypes: ['Discussion', 'Resource', 'Poll'],
    anonymousAllowed: false,
    memberCount: 420,
    isJoined: false,
    icon: 'TrendingUp',
    answeredRate: '88%',
  },
  {
    id: 'talent-lounge',
    slug: 'talent-lounge',
    name: 'Talent & Candidates',
    category: 'Role Lounges',
    categoryKey: 'lounge',
    description: 'Safe space for job seekers and developers. Anonymous compensation checks, interview prep tips, and portfolio critiques.',
    rules: [
      'No recruiter poaching in this lounge.',
      'Supportive peer advice only.',
    ],
    audience: 'Job Seekers only',
    allowedRoles: ['jobseeker', 'admin'],
    allowedPostTypes: ['Question', 'Discussion', 'Poll'],
    anonymousAllowed: true,
    memberCount: 1650,
    isJoined: false,
    icon: 'Users',
    answeredRate: '93%',
  },
  {
    id: 'employers-guild',
    slug: 'employers-guild',
    name: 'Employers Guild',
    category: 'Role Lounges',
    categoryKey: 'lounge',
    description: 'Hiring managers, founders, and talent leaders benchmarking tech talent salaries and offer acceptance rates.',
    rules: [
      'Verified employers only.',
      'No candidate blacklisting or defamation.',
    ],
    audience: 'Verified Employers only',
    allowedRoles: ['employer', 'admin'],
    allowedPostTypes: ['Discussion', 'Poll', 'Resource'],
    anonymousAllowed: false,
    memberCount: 540,
    isJoined: false,
    icon: 'Briefcase',
    answeredRate: '90%',
  },
];

export const UPCOMING_AMAS = [
  {
    id: 'ama_sneha_march',
    title: 'Architecting for High Throughput on Indian 4G/5G Networks',
    hostName: 'Dr. Sneha Roy',
    hostRole: 'Ex-Google Staff Eng • BITS Pilani',
    topic: 'Next.js SSR streaming, WebSocket backpressure, and low-latency database queries.',
    date: 'Thursday, 5:00 PM IST',
    attendeesCount: 142,
  },
  {
    id: 'ama_vikram_march',
    title: 'Demystifying i-SAFE Notes & Valuation Caps for Seed Founders',
    hostName: 'Vikram Singhania',
    hostRole: 'Lead Angel • Zenith Capital',
    topic: 'Pre-money vs Post-money i-SAFE dilution math, pro-rata rights, and clean cap table hygiene.',
    date: 'Next Tuesday, 6:30 PM IST',
    attendeesCount: 98,
  },
];

export const ROLE_COMMUNITY_CONFIG = {
  global: {
    roleKey: 'global',
    label: 'Global Community',
    personaId: 'user_founder',
    portalUrl: '/',
    communityUrl: '/community',
    banner: {
      tag: 'Global Ecosystem',
      title: 'Startup Talent ERP Global Community Hub',
      description: 'The unified cross-role exchange uniting Founders, Mentors, Investors, Employers, and Tech Talent across the Indian startup ecosystem.',
    },
  },
  startup: {
    roleKey: 'startup',
    label: 'Startup Founder',
    personaId: 'user_founder',
    portalUrl: '/startup/dashboard',
    communityUrl: '/startup/community',
    banner: {
      tag: 'Founder Ecosystem',
      title: 'Founder Peer Exchange & Knowledge Hub',
      description: 'Collaborate with verified founders, get verified solutions from accredited mentors, and share traction milestones without unsolicited sales pitches.',
    },
  },
  mentor: {
    roleKey: 'mentor',
    label: 'Verified Mentor',
    personaId: 'user_mentor',
    portalUrl: '/mentor/dashboard',
    communityUrl: '/mentor/community',
    banner: {
      tag: 'Advisory Circle',
      title: 'Mentor Advisory & Architectural Forum',
      description: 'Answer technical and venture roadblocks for high-growth startups, highlight your domain expertise, and host interactive live AMAs.',
    },
  },
  investor: {
    roleKey: 'investor',
    label: 'Angel Investor',
    personaId: 'user_investor',
    portalUrl: '/investor/dashboard',
    communityUrl: '/investor/community',
    banner: {
      tag: 'Investor Syndicate',
      title: 'Investor Syndicate & Ecosystem Forum',
      description: 'Connect with fellow angels and syndicates, share due-diligence frameworks, answer founder governance questions, and review verified startup milestones.',
    },
  },
  employer: {
    roleKey: 'employer',
    label: 'Verified Employer',
    personaId: 'user_employer',
    portalUrl: '/employer/dashboard',
    communityUrl: '/employer/community',
    banner: {
      tag: 'People & Hiring',
      title: 'Employer & Talent Acquisition Guild',
      description: 'Benchmark ESOP pools, tech compensation bands, hiring workflows, and discuss talent market dynamics.',
    },
  },
  jobseeker: {
    roleKey: 'jobseeker',
    label: 'Talent & Candidate',
    personaId: 'user_jobseeker',
    portalUrl: '/jobseeker/dashboard',
    communityUrl: '/jobseeker/community',
    banner: {
      tag: 'Talent Lounge',
      title: 'Talent & Career Community',
      description: 'Anonymous offer reviews, interview preparation, portfolio critiques, and engineering discussions without recruiter intrusion.',
    },
  },
  admin: {
    roleKey: 'admin',
    label: 'Platform Admin',
    personaId: 'user_admin',
    portalUrl: '/admin/dashboard',
    communityUrl: '/admin/community',
    banner: {
      tag: 'Platform Oversight',
      title: 'Trust & Safety Community Moderation',
      description: 'Full supervisory access across all open spaces and verified role lounges. Review reported posts, enforce anti-solicitation rules, and triage the Flagged Queue.',
    },
  },
};

export const INITIAL_POSTS = [
  {
    id: 'post_gst_billing',
    spaceSlug: 'ask-community',
    spaceId: 'ask-community',
    spaceName: 'Ask the Community',
    type: 'Question',
    title: 'How should a B2B SaaS startup in India structure GST & export invoices for Stripe payments from overseas US/EU customers?',
    content: `We are a DPIIT-recognized SaaS startup based in Pune. We recently launched on ProductHunt and got our first 18 paying customers from the US and Germany via Stripe.

We currently have a regular GSTIN. My chartered accountant says we need a Letter of Undertaking (LUT) to export services without paying 18% IGST upfront, and that we must file Form GSTR-1 as zero-rated export.

What have we tried:
1. Filed LUT on the GST portal under Form GST RFD-11 for FY 2026-27.
2. Configured Stripe Billing with FIRC (Foreign Inward Remittance Certificate) auto-generation.

Our questions:
- Do we need separate invoicing series for export invoices vs domestic Indian GSTIN invoices?
- How do you handle FIRC/e-BRC matching with your authorized dealer (AD Code) bank in India?`,
    tags: ['GST', 'SaaS', 'ExportOfServices', 'Taxes', 'Finance'],
    stageBadge: 'Early Revenue',
    author: {
      id: 'user_founder',
      name: 'Aarav Kapoor',
      handle: 'aarav_finflow',
      role: 'Startup Founder',
      roleKey: 'startup',
      organization: 'FinFlow Technologies',
      avatar: 'AK',
      verified: true,
    },
    timestamp: '3 hours ago',
    helpfulVotes: 28,
    userUpvoted: false,
    userBookmarked: false,
    acceptedAnswerId: 'comm_gst_1',
    hasAcceptedAnswer: true,
    commentsCount: 2,
    comments: [
      {
        id: 'comm_gst_1',
        author: {
          id: 'user_mentor',
          name: 'Dr. Sneha Roy',
          handle: 'drsneha_tech',
          role: 'Verified Mentor',
          roleKey: 'mentor',
          organization: 'Ex-Google Staff Eng • BITS',
          avatar: 'SR',
          verified: true,
          expertLabel: 'Expert Answer • Fintech & Compliance',
        },
        content: `Here is the clean, battle-tested playbook we use across our portfolio startups:

1. Invoicing Series: YES. Mandatory under Rule 46 of CGST Rules. Create a distinct invoice series like EXP/26-27/001 separate from domestic DOM/26-27/001. The export invoice must carry the statutory endorsement: "SUPPLY MEANT FOR EXPORT UNDER BOND OR LETTER OF UNDERTAKING WITHOUT PAYMENT OF INTEGRATED TAX".
2. LUT Status: Since your RFD-11 is filed, you can bill without 18% IGST. Keep the ARN handy for your quarterly GSTR-1.
3. FIRC & e-BRC: If using Stripe India, Stripe automatically issues monthly FIRC certificates through Standard Chartered / Citibank. Provide your bank's AD Code to Stripe so your bank can log the e-BRC in the DGFT portal within 9 months.
4. Currency Display: Show both USD and equivalent INR (RBI reference rate on invoice date) to stay completely compliant with MCA & GST auditors.`,
        timestamp: '2 hours ago',
        helpfulVotes: 42,
        userUpvoted: false,
        isAccepted: true,
        isExpertAnswer: true,
        expertBadge: 'Verified Mentor',
        replies: [],
      },
      {
        id: 'comm_gst_2',
        author: {
          id: 'user_investor',
          name: 'Vikram Singhania',
          handle: 'vikram_zenith',
          role: 'Angel Investor',
          roleKey: 'investor',
          organization: 'Zenith Capital Ventures',
          avatar: 'VS',
          verified: true,
        },
        content: `Double-down on what Dr. Sneha noted regarding e-BRC. During Series A institutional diligence, foreign VC lawyers will specifically inspect your inward remittance proofs to ensure you don't face unexpected FEMA tax clawbacks. Store all Stripe FIRCs in your platform Data Room.`,
        timestamp: '1 hour ago',
        helpfulVotes: 16,
        userUpvoted: false,
        isAccepted: false,
        isExpertAnswer: false,
        replies: [],
      },
    ],
  },
  {
    id: 'post_nextjs_erp',
    spaceSlug: 'product-tech',
    spaceId: 'product-tech',
    spaceName: 'Product & Engineering',
    type: 'Discussion',
    title: 'Server Components vs Client WebSockets for Real-Time B2B Workspaces: 60-Day Benchmarks',
    content: `Over the past two months, we migrated our ERP table views from pure client-side React Query polling to Next.js 14 Server Actions combined with a lightweight Redis pub/sub WebSocket bridge.

The Results:
- Initial Page Load: Dropped from 3.4s to 820ms on Tier-2 mobile networks (Jio 4G).
- DOM Node Count: Reduced by 48% by streaming SSR rows instead of hydrating heavy client bundles.
- WebSocket Footprint: We only open socket connections when an admin enters a live inspection drawer.

Would love to hear how other teams handle optimistic UI updates when multiple admins are triaging the same queue simultaneously.`,
    tags: ['NextJS', 'Architecture', 'WebSockets', 'React', 'Performance'],
    stageBadge: 'Prototype',
    author: {
      id: 'user_jobseeker',
      name: 'Priya Nair',
      handle: 'priya_dev',
      role: 'Job Seeker',
      roleKey: 'jobseeker',
      organization: 'Frontend Engineer',
      avatar: 'PN',
      verified: true,
    },
    timestamp: '5 hours ago',
    helpfulVotes: 34,
    userUpvoted: false,
    userBookmarked: false,
    acceptedAnswerId: null,
    hasAcceptedAnswer: false,
    commentsCount: 1,
    comments: [
      {
        id: 'comm_next_1',
        author: {
          id: 'user_mentor',
          name: 'Dr. Sneha Roy',
          handle: 'drsneha_tech',
          role: 'Verified Mentor',
          roleKey: 'mentor',
          organization: 'Ex-Google Staff Eng',
          avatar: 'SR',
          verified: true,
          expertLabel: 'Expert Answer • Distributed Systems',
        },
        content: `Tremendous benchmark Priya. The pattern of keeping WebSockets idle until the user focuses an active drawer is textbook resource conservation. For concurrency conflicts, consider adding an optimistic lock with a 30-second lease key in Redis (SET ticket:id:lock admin_uid NX EX 30).`,
        timestamp: '4 hours ago',
        helpfulVotes: 22,
        userUpvoted: false,
        isAccepted: false,
        isExpertAnswer: true,
        expertBadge: 'Verified Mentor',
        replies: [],
      },
    ],
  },
  {
    id: 'post_milestone_pilots',
    spaceSlug: 'wins-milestones',
    spaceId: 'wins-milestones',
    spaceName: 'Wins & Milestones',
    type: 'Milestone',
    title: 'Milestone: Signed our first 20 enterprise manufacturing pilots across Gujarat & Pune!',
    content: `Six months ago, our team was writing code in a small co-working space in Thane. Today, we crossed 20 active B2B enterprise pilots for our IoT energy monitoring sensors across Surat and Pune industrial belts.

Key Traction Metrics:
- Monthly Sensor Events: 1.8M telemetry pings per day
- Average Pilot Contract: ₹4.5L per facility
- DPIIT Seed Grant Support: Received ₹25L non-dilutive grant last month

Biggest Lesson Learned:
Industrial procurement officers care about two things: downtime reduction and whether our system integrates with their existing Tally ERP. Once we built a 1-click Tally XML exporter, our close rate doubled.`,
    tags: ['Milestone', 'B2B', 'Manufacturing', 'IoT', 'DPIIT'],
    stageBadge: 'Early Revenue',
    author: {
      id: 'user_founder',
      name: 'Aarav Kapoor',
      handle: 'aarav_finflow',
      role: 'Startup Founder',
      roleKey: 'startup',
      organization: 'FinFlow Technologies',
      avatar: 'AK',
      verified: true,
    },
    timestamp: '1 day ago',
    helpfulVotes: 67,
    userUpvoted: false,
    userBookmarked: false,
    acceptedAnswerId: null,
    hasAcceptedAnswer: false,
    commentsCount: 0,
    comments: [],
  },
  {
    id: 'post_poll_gateway',
    spaceSlug: 'tools-stack',
    spaceId: 'tools-stack',
    spaceName: 'Tools, SaaS & Stack',
    type: 'Poll',
    title: 'Poll: Which Indian payment gateway provides the most reliable webhook uptime & recurring UPI autopay in 2026?',
    content: `We are choosing our primary payment aggregator for recurring subscription billing and milestone escrow in India. Uptime, instantaneous webhook deliveries, and low false-positive fraud declines are our main criteria.

Vote below and share your operational experience in the comments!`,
    tags: ['Fintech', 'PaymentGateways', 'Razorpay', 'Cashfree', 'Stripe'],
    stageBadge: 'Early Revenue',
    pollData: {
      question: 'Primary payment aggregator choice for Indian SaaS recurring billing:',
      totalVotes: 142,
      userVotedOptionId: 'opt_1',
      options: [
        { id: 'opt_1', text: 'Razorpay (Standard Route + Subscriptions)', votes: 76 },
        { id: 'opt_2', text: 'Cashfree (Payouts & AutoCollect Webhooks)', votes: 38 },
        { id: 'opt_3', text: 'Stripe India (Global Cards + INR)', votes: 21 },
        { id: 'opt_4', text: 'Juspay / HyperSDK (Direct Bank Routing)', votes: 7 },
      ],
    },
    author: {
      id: 'user_founder',
      name: 'Aarav Kapoor',
      handle: 'aarav_finflow',
      role: 'Startup Founder',
      roleKey: 'startup',
      organization: 'FinFlow Technologies',
      avatar: 'AK',
      verified: true,
    },
    timestamp: '2 days ago',
    helpfulVotes: 23,
    userUpvoted: false,
    userBookmarked: false,
    acceptedAnswerId: null,
    hasAcceptedAnswer: false,
    commentsCount: 0,
    comments: [],
  },
  {
    id: 'post_looking_engineer',
    spaceSlug: 'hiring-careers',
    spaceId: 'hiring-careers',
    spaceName: 'Hiring & Culture',
    type: 'Looking for',
    title: 'Looking for: Founding Full-Stack / Next.js Engineer in Pune (Equity + ₹18-24L)',
    content: `We are FinFlow (DPIIT registered, pre-seed backed). We are expanding our founding team to build automated corporate treasury connectors.

Stack: Next.js 14 (App router), Tailwind CSS, Node.js, PostgreSQL, Redis.
Commitment: Full-time on-site in Baner, Pune.
Compensation: Competitive INR salary + 0.5% - 1.5% ESOP grant.

If you love building high-performance fintech dashboards, reply or send a Connect request!`,
    tags: ['Hiring', 'FoundingEngineer', 'NextJS', 'Pune', 'ESOP'],
    stageBadge: 'Early Revenue',
    author: {
      id: 'user_founder',
      name: 'Aarav Kapoor',
      handle: 'aarav_finflow',
      role: 'Startup Founder',
      roleKey: 'startup',
      organization: 'FinFlow Technologies',
      avatar: 'AK',
      verified: true,
    },
    timestamp: '2 days ago',
    helpfulVotes: 19,
    userUpvoted: false,
    userBookmarked: false,
    acceptedAnswerId: null,
    hasAcceptedAnswer: false,
    commentsCount: 0,
    comments: [],
  },
];

// Helper: Get persona by role
export function getPersonaForRole(roleKey) {
  const cfg = ROLE_COMMUNITY_CONFIG[roleKey];
  if (!cfg) return COMMUNITY_PERSONAS[0];
  return COMMUNITY_PERSONAS.find((p) => p.id === cfg.personaId) || COMMUNITY_PERSONAS[0];
}

// -------------------------------------------------------------
// LIVE POLICY & COMPLIANCE SCANNER
// -------------------------------------------------------------
export function analyzePostCompliance(title = '', content = '') {
  const text = `${title} ${content}`.toLowerCase();
  const issues = [];

  // Check 1: Unsolicited Securities / Public Fundraising solicitation
  const solicitationPhrases = [
    'invest in my startup',
    'invest in our company',
    'raising 1 cr',
    'raising 2 cr',
    'dm for pitch deck',
    'dm for investment',
    'selling equity',
    'guaranteed returns',
    'guaranteed dividend',
  ];
  if (solicitationPhrases.some((phrase) => text.includes(phrase))) {
    issues.push({
      type: 'critical',
      title: 'Prohibited: Public Investment Solicitation',
      message: 'Platform policies prohibit public offers to sell securities or soliciting investment in open feeds.',
      guidance: 'Use Discover, official Intro Requests, or the confidential Data Room instead.',
    });
  }

  // Check 2: Upfront Job / Interview Fee Scam
  const feePhrases = [
    'registration fee for interview',
    'pay for job',
    'upfront interview fee',
    'security deposit for offer',
  ];
  if (feePhrases.some((phrase) => text.includes(phrase))) {
    issues.push({
      type: 'critical',
      title: 'Prohibited: Upfront Recruitment Fee',
      message: 'Demanding fees for interviews, training, or job offers is strictly prohibited under Trust & Safety rules.',
      guidance: 'All hiring on the platform must be free of application charges for candidates.',
    });
  }

  // Check 3: Personal PII leakage (phone / PAN / Aadhaar / UPI)
  const phonePattern = /(?:\+91[\-\s]?)?[6789]\d{9}\b/;
  const upiPattern = /[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}/;
  if (phonePattern.test(text) || (upiPattern.test(text) && !text.includes('google') && !text.includes('example'))) {
    issues.push({
      type: 'warning',
      title: 'Personal Contact or Payment Info Detected',
      message: 'Sharing phone numbers or UPI handles in public discussions exposes you to phishing and spam.',
      guidance: 'Keep conversations on-platform or use the secure Connect Request feature.',
    });
  }

  return issues;
}

// -------------------------------------------------------------
// LOCALSTORAGE PERSISTENCE ENGINE
// -------------------------------------------------------------
export const COMMUNITY_POSTS_STORAGE_KEY = 'erp_community_posts_v3';
export const COMMUNITY_SPACES_STORAGE_KEY = 'erp_community_spaces_v3';
export const COMMUNITY_RSVPS_STORAGE_KEY = 'erp_community_amas_rsvps_v3';

export function normalizeComment(c) {
  if (!c) return null;
  const content = c.content || c.body || '';
  const helpfulVotes = c.helpfulVotes ?? c.helpfulCount ?? 0;
  return {
    id: c.id || `comm_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
    author: {
      id: c.author?.id || 'user_unknown',
      name: c.author?.name || 'Community Member',
      handle: c.author?.handle || 'member',
      role: c.author?.role || 'Member',
      avatar: c.author?.avatar || (c.author?.name ? c.author.name.slice(0, 2).toUpperCase() : 'CM'),
      verified: Boolean(c.author?.verified),
      organization: c.author?.organization || '',
      roleKey: c.author?.roleKey || '',
      expertLabel: c.author?.expertLabel || (c.isExpertAnswer ? 'Verified Mentor' : null),
    },
    content,
    body: content,
    timestamp: c.timestamp || c.createdAt || 'Recent',
    createdAt: c.timestamp || c.createdAt || 'Recent',
    helpfulVotes,
    helpfulCount: helpfulVotes,
    userUpvoted: Boolean(c.userUpvoted || c.isUpvotedByMe),
    isUpvotedByMe: Boolean(c.userUpvoted || c.isUpvotedByMe),
    isAccepted: Boolean(c.isAccepted),
    isExpertAnswer: Boolean(c.isExpertAnswer || c.author?.expertLabel),
    expertBadge: c.expertBadge || c.author?.expertLabel || (c.author?.roleKey === 'mentor' ? 'Verified Mentor' : null),
    replies: Array.isArray(c.replies) ? c.replies.map(normalizeComment) : [],
  };
}

export function normalizePost(p) {
  if (!p) return null;
  const content = p.content || p.body || '';
  const rawComments = p.comments || p.answers || [];
  const comments = Array.isArray(rawComments) ? rawComments.map(normalizeComment) : [];
  const helpfulVotes = p.helpfulVotes ?? p.helpfulCount ?? 0;
  const userUpvoted = Boolean(p.userUpvoted || p.isHelpfulByMe);
  const userBookmarked = Boolean(p.userBookmarked || p.isSavedByMe);
  const spaceSlug = p.spaceSlug || p.spaceId || 'ask-community';
  const spaceId = p.spaceId || p.spaceSlug || 'ask-community';

  let acceptedAnswer = p.acceptedAnswer || null;
  if (p.acceptedAnswerId && !acceptedAnswer) {
    const found = comments.find((c) => c.id === p.acceptedAnswerId);
    if (found) {
      acceptedAnswer = {
        authorName: found.author.name,
        authorRole: found.author.role,
        preview: found.content,
        isExpert: found.isExpertAnswer,
        expertBadge: found.expertBadge || 'Verified Solution',
        upvotes: found.helpfulVotes || 12,
      };
    }
  }

  return {
    ...p,
    id: p.id,
    spaceSlug,
    spaceId,
    spaceName: p.spaceName || 'Ask the Community',
    type: p.type || 'Question',
    title: p.title || '',
    content,
    body: content,
    tags: Array.isArray(p.tags) ? p.tags : [],
    stageBadge: p.stageBadge || p.stage || null,
    author: {
      id: p.author?.id || 'user_unknown',
      name: p.author?.name || 'Community Member',
      handle: p.author?.handle || 'member',
      role: p.author?.role || 'Member',
      organization: p.author?.organization || '',
      avatar: p.author?.avatar || (p.author?.name ? p.author.name.slice(0, 2).toUpperCase() : 'CM'),
      verified: Boolean(p.author?.verified),
      roleKey: p.author?.roleKey || '',
    },
    timestamp: p.timestamp || p.createdAt || 'Recent',
    createdAt: p.timestamp || p.createdAt || 'Recent',
    helpfulVotes,
    helpfulCount: helpfulVotes,
    userUpvoted,
    isHelpfulByMe: userUpvoted,
    userBookmarked,
    isSavedByMe: userBookmarked,
    commentsCount: comments.length,
    isUnanswered: p.type === 'Question' && comments.length === 0,
    comments,
    answers: comments,
    pollData: p.pollData || null,
    acceptedAnswerId: p.acceptedAnswerId || null,
    hasAcceptedAnswer: Boolean(p.acceptedAnswerId),
    acceptedAnswer,
    // Trust & Moderation
    isFlagged: Boolean(p.isFlagged),
    reportReason: p.reportReason || null,
    reportNotes: p.reportNotes || null,
    reportedBy: p.reportedBy || null,
    reportedAt: p.reportedAt || null,
    isRemoved: Boolean(p.isRemoved),
    removedReason: p.removedReason || null,
  };
}

export function loadCommunityPosts() {
  if (typeof window === 'undefined') {
    return INITIAL_POSTS.map(normalizePost);
  }
  try {
    const raw = localStorage.getItem(COMMUNITY_POSTS_STORAGE_KEY);
    if (!raw) {
      const normalized = INITIAL_POSTS.map(normalizePost);
      localStorage.setItem(COMMUNITY_POSTS_STORAGE_KEY, JSON.stringify(normalized));
      return normalized;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed.map(normalizePost);
    }
  } catch (err) {
    console.error('Failed to load community posts:', err);
  }
  return INITIAL_POSTS.map(normalizePost);
}

export function saveCommunityPosts(posts) {
  if (typeof window === 'undefined') return;
  try {
    const normalized = posts.map(normalizePost);
    localStorage.setItem(COMMUNITY_POSTS_STORAGE_KEY, JSON.stringify(normalized));
  } catch (err) {
    console.error('Failed to persist community posts:', err);
  }
}

export function loadCommunitySpaces() {
  if (typeof window === 'undefined') {
    return COMMUNITY_SPACES;
  }
  try {
    const raw = localStorage.getItem(COMMUNITY_SPACES_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(COMMUNITY_SPACES_STORAGE_KEY, JSON.stringify(COMMUNITY_SPACES));
      return COMMUNITY_SPACES;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch (err) {
    console.error('Failed to load community spaces:', err);
  }
  return COMMUNITY_SPACES;
}

export function saveCommunitySpaces(spaces) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(COMMUNITY_SPACES_STORAGE_KEY, JSON.stringify(spaces));
  } catch (err) {
    console.error('Failed to persist community spaces:', err);
  }
}

export function loadCommunityRsvps() {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(COMMUNITY_RSVPS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveCommunityRsvps(rsvps) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(COMMUNITY_RSVPS_STORAGE_KEY, JSON.stringify(rsvps));
  } catch (err) {
    console.error('Failed to persist community rsvps:', err);
  }
}

export function generateGoogleCalendarUrl(ama) {
  const title = encodeURIComponent(`[Live AMA] ${ama.title}`);
  const details = encodeURIComponent(
    `Host: ${ama.hostName} (${ama.hostRole})\nTopic: ${ama.topic}\nPlatform: Startup Talent ERP Community Forum`
  );
  const location = encodeURIComponent('Startup Talent ERP Platform - Community Lounge');
  const startDate = new Date();
  startDate.setDate(startDate.getDate() + 3);
  startDate.setHours(17, 0, 0, 0);
  const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);
  const toIso = (d) => d.toISOString().replace(/-|:|\.\d\d\d/g, '');
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${toIso(startDate)}/${toIso(endDate)}`;
}
