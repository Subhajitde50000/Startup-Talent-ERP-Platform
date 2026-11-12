// community-data.js - Comprehensive Data Store & Policy Engine for Community
// Production-grade dataset covering Open Topic Spaces, Role Lounges, AMAs, and Typed Posts.

export const COMMUNITY_PERSONAS = [
  {
    id: 'user_founder',
    name: 'Aarav Kapoor',
    handle: 'aarav_finflow',
    role: 'Startup Founder',
    roleKey: 'startup',
    organization: 'FinFlow Technologies Pvt Ltd',
    verified: true,
    badges: ['Verified Startup', 'DPIIT Accredited', 'Investment Ready'],
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
  // Open Topic Spaces
  {
    id: 'ask-community',
    slug: 'ask-community',
    name: 'Ask the Community',
    category: 'Open Spaces',
    categoryKey: 'open',
    description: 'Q&A on startup execution, technical hurdles, product decisions, and operational roadblocks.',
    rules: [
      'Be specific about your question and what you have already tried.',
      'Mark the most helpful reply as Accepted Answer once resolved.',
      'No fundraising solicitations or cold sales pitches.',
    ],
    audience: 'All verified members (Read-only for unverified)',
    allowedRoles: ['all'],
    allowedPostTypes: ['Question', 'Discussion'],
    anonymousAllowed: false,
    memberCount: 3420,
    isJoined: true,
    icon: 'HelpCircle',
    answeredRate: '94%',
    pinnedPosts: ['post_gst_billing'],
  },
  {
    id: 'product-tech',
    slug: 'product-tech',
    name: 'Product & Engineering',
    category: 'Open Spaces',
    categoryKey: 'open',
    description: 'Deep-dives into tech stacks, system architecture, database scalability, UX, and dev tooling.',
    rules: [
      'Include architecture diagrams, benchmark logs, or code snippets where applicable.',
      'Constructive technical debate only; respect differing architectural paradigms.',
    ],
    audience: 'All verified members',
    allowedRoles: ['all'],
    allowedPostTypes: ['Question', 'Discussion', 'Resource', 'Feedback request'],
    anonymousAllowed: false,
    memberCount: 2840,
    isJoined: true,
    icon: 'Layers',
    answeredRate: '91%',
    pinnedPosts: ['post_nextjs_erp'],
  },
  {
    id: 'gtm-growth',
    slug: 'gtm-growth',
    name: 'Go-to-Market & Sales',
    category: 'Open Spaces',
    categoryKey: 'open',
    description: 'B2B enterprise sales pipelines, outbound funnels, founder-led sales, CAC/LTV calibration.',
    rules: [
      'Share real lessons and conversion figures where comfortable.',
      'Disclose affiliate links or commercial tools if recommending paid software.',
    ],
    audience: 'All verified members',
    allowedRoles: ['all'],
    allowedPostTypes: ['Question', 'Discussion', 'Resource', 'Milestone', 'Poll'],
    anonymousAllowed: false,
    memberCount: 2190,
    isJoined: true,
    icon: 'TrendingUp',
    answeredRate: '88%',
    pinnedPosts: [],
  },
  {
    id: 'fundraising-basics',
    slug: 'fundraising-basics',
    name: 'Fundraising Basics (Educational)',
    category: 'Open Spaces',
    categoryKey: 'open',
    description: 'Educational mechanics: cap tables, i-SAFE agreements, DPIIT seed grants, dilution math, and data rooms.',
    rules: [
      'CRITICAL: Absolutely NO public fundraising solicitations or investment offers (e.g. "Invest in us / DM me for SAFE").',
      'Educational & diligence mechanics only. Connect with investors securely via Discover and verified intro requests.',
      'Platform disclaimer: Community discussions do not constitute financial or legal securities brokerages.',
    ],
    audience: 'All verified members',
    allowedRoles: ['all'],
    allowedPostTypes: ['Question', 'Discussion', 'Resource'],
    anonymousAllowed: false,
    memberCount: 4120,
    isJoined: true,
    icon: 'ShieldCheck',
    answeredRate: '96%',
    pinnedPosts: ['post_safe_math'],
  },
  {
    id: 'hiring-culture',
    slug: 'hiring-culture',
    name: 'Hiring, Careers & Culture',
    category: 'Open Spaces',
    categoryKey: 'open',
    description: 'Compensation benchmarks in India, ESOP grant mechanics, hiring pipelines, and workplace questions.',
    rules: [
      'Job postings belong in Jobs; community links to jobs must reference verified platform listings.',
      'No employer defamation or public salary leaks of identifiable persons.',
      'Anonymous posting enabled for sensitive workplace & compensation questions.',
    ],
    audience: 'All verified members',
    allowedRoles: ['all'],
    allowedPostTypes: ['Question', 'Discussion', 'Resource', 'Poll'],
    anonymousAllowed: true,
    memberCount: 3100,
    isJoined: false,
    icon: 'Users',
    answeredRate: '89%',
    pinnedPosts: [],
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
    pinnedPosts: ['post_milestone_pilots'],
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
    icon: 'Wrench',
    answeredRate: '92%',
    pinnedPosts: [],
  },

  // Role Lounges (Exclusive to Verified Roles)
  {
    id: 'founders-lounge',
    slug: 'founders-lounge',
    name: 'Founders Lounge',
    category: 'Role Lounges',
    categoryKey: 'lounge',
    description: 'Private peer sanctuary for verified startup founders to discuss mental resilience, co-founder dynamics, and runway management.',
    rules: [
      'Strict confidentiality: Chatham House Rule applies to all discussions.',
      'Only verified Startup Founders can view or post.',
    ],
    audience: 'Verified Startup Founders only',
    allowedRoles: ['startup'],
    allowedPostTypes: ['Question', 'Discussion', 'Poll', 'Looking for'],
    anonymousAllowed: true,
    memberCount: 840,
    isJoined: true,
    icon: 'Compass',
    answeredRate: '95%',
    pinnedPosts: [],
  },
  {
    id: 'mentors-circle',
    slug: 'mentors-circle',
    name: 'Mentors Circle',
    category: 'Role Lounges',
    categoryKey: 'lounge',
    description: 'Peer forum for verified mentors: advising methodologies, founder diagnostics, and session best practices.',
    rules: [
      'Share advisory techniques and case reflections without disclosing private founder data.',
    ],
    audience: 'Verified Mentors only',
    allowedRoles: ['mentor'],
    allowedPostTypes: ['Discussion', 'Resource', 'Question'],
    anonymousAllowed: false,
    memberCount: 260,
    isJoined: false,
    icon: 'Lightbulb',
    answeredRate: '98%',
    pinnedPosts: [],
  },
  {
    id: 'investors-forum',
    slug: 'investors-forum',
    name: 'Investors Forum',
    category: 'Role Lounges',
    categoryKey: 'lounge',
    description: 'Peer exchange for verified accredited investors and syndicate leads on macro trends and diligence practices.',
    rules: [
      'Accredited investors only. No public solicitation of investment funds or retail pooling.',
    ],
    audience: 'Verified Accredited Investors only',
    allowedRoles: ['investor'],
    allowedPostTypes: ['Discussion', 'Resource', 'Poll'],
    anonymousAllowed: false,
    memberCount: 190,
    isJoined: false,
    icon: 'Briefcase',
    answeredRate: '90%',
    pinnedPosts: [],
  },
  {
    id: 'talent-lounge',
    slug: 'talent-lounge',
    name: 'Job Seekers & Talent Lounge',
    category: 'Role Lounges',
    categoryKey: 'lounge',
    description: 'Safe haven for developers, product managers, and designers preparing for interviews and negotiating offers.',
    rules: [
      'No recruiters allowed in this lounge. Confidential offer reviews & resume critiques only.',
      'Anonymous posting available to protect current employment.',
    ],
    audience: 'Jobseekers and Talent only',
    allowedRoles: ['jobseeker'],
    allowedPostTypes: ['Question', 'Discussion', 'Feedback request'],
    anonymousAllowed: true,
    memberCount: 1650,
    isJoined: false,
    icon: 'UserCheck',
    answeredRate: '93%',
    pinnedPosts: [],
  },
  {
    id: 'employers-guild',
    slug: 'employers-guild',
    name: 'Employers & People Guild',
    category: 'Role Lounges',
    categoryKey: 'lounge',
    description: 'Private exchange for verified founders, hiring managers, and HR heads on compensation benchmarking, ESOP vesting, and hiring best practices.',
    rules: [
      'Confidential salary benchmarking discussions are permitted in aggregate.',
      'Respect candidate privacy; no blacklisting or sharing candidate PII without consent.',
    ],
    audience: 'Verified Employers & People Leaders only',
    allowedRoles: ['employer', 'admin'],
    allowedPostTypes: ['Discussion', 'Resource', 'Poll', 'Question'],
    anonymousAllowed: false,
    memberCount: 420,
    isJoined: false,
    icon: 'Briefcase',
    answeredRate: '88%',
    pinnedPosts: [],
  },

  // Events & Official Spaces
  {
    id: 'live-amas',
    slug: 'live-amas',
    name: 'Live AMAs & Office Hours',
    category: 'Official & Events',
    categoryKey: 'official',
    description: 'Scheduled interactive Ask-Me-Anything sessions with unicorn operators, veteran angel investors, and domain experts.',
    rules: [
      'Submit questions in advance or during the live window.',
      'Vote on the most insightful questions for the host to prioritize.',
    ],
    audience: 'All verified members',
    allowedRoles: ['all'],
    allowedPostTypes: ['AMA', 'Discussion'],
    anonymousAllowed: false,
    memberCount: 4890,
    isJoined: true,
    icon: 'Calendar',
    answeredRate: '100%',
    pinnedPosts: ['post_ama_sneha'],
  },
  {
    id: 'announcements',
    slug: 'announcements',
    name: 'Platform Announcements',
    category: 'Official & Events',
    categoryKey: 'official',
    description: 'Product updates, new grant programs, regulatory advisories, and system improvements from the core team.',
    rules: [
      'Official staff announcements only. Comments open for feedback and questions.',
    ],
    audience: 'All members',
    allowedRoles: ['admin'],
    allowedPostTypes: ['Discussion'],
    anonymousAllowed: false,
    memberCount: 5200,
    isJoined: true,
    icon: 'Bell',
    answeredRate: '100%',
    pinnedPosts: [],
  },
];

export const INITIAL_POSTS = [
  {
    id: 'post_gst_billing',
    spaceSlug: 'ask-community',
    spaceName: 'Ask the Community',
    type: 'Question',
    title: 'How should a B2B SaaS startup in India structure GST & export invoices for Stripe payments from overseas US/EU customers?',
    body: `We are a DPIIT-recognized SaaS startup based in Pune. We recently launched on ProductHunt and got our first 18 paying customers from the US and Germany via Stripe.

We currently have a regular GSTIN. My chartered accountant says we need a **Letter of Undertaking (LUT)** to export services without paying 18% IGST upfront, and that we must file Form GSTR-1 as zero-rated export.

What have we tried:
1. Filed LUT on the GST portal under Form GST RFD-11 for FY 2026-27.
2. Configured Stripe Billing with FIRC (Foreign Inward Remittance Certificate) auto-generation.

Our questions:
- Do we need separate invoicing series for export invoices vs domestic Indian GSTIN invoices?
- How do you handle FIRC/e-BRC matching with your authorized dealer (AD Code) bank in India?`,
    tags: ['GST', 'SaaS', 'ExportOfServices', 'Taxes', 'Finance'],
    stage: 'Early Revenue',
    author: {
      id: 'user_founder',
      name: 'Aarav Kapoor',
      handle: 'aarav_finflow',
      role: 'Startup Founder',
      roleKey: 'startup',
      organization: 'FinFlow Technologies',
      verified: true,
      badge: 'Verified Founder',
    },
    createdAt: '3 hours ago',
    helpfulCount: 28,
    isHelpfulByMe: false,
    isSavedByMe: false,
    acceptedAnswerId: 'comment_gst_1',
    hasAcceptedAnswer: true,
    commentsCount: 5,
    answers: [
      {
        id: 'comment_gst_1',
        author: {
          id: 'user_mentor',
          name: 'Dr. Sneha Roy',
          handle: 'drsneha_tech',
          role: 'Verified Mentor',
          roleKey: 'mentor',
          organization: 'Ex-Google Staff Eng • BITS',
          verified: true,
          expertLabel: 'Expert Answer • Fintech & Compliance',
        },
        body: `Here is the clean, battle-tested playbook we use across our portfolio startups:

1. **Invoicing Series:** YES. Mandatory under Rule 46 of CGST Rules. Create a distinct invoice series like \`EXP/26-27/001\` separate from domestic \`DOM/26-27/001\`. The export invoice must carry the statutory endorsement: *"SUPPLY MEANT FOR EXPORT UNDER BOND OR LETTER OF UNDERTAKING WITHOUT PAYMENT OF INTEGRATED TAX"*.
2. **LUT Status:** Since your RFD-11 is filed, you can bill without 18% IGST. Keep the ARN handy for your quarterly GSTR-1.
3. **FIRC & e-BRC (Crucial):** If using Stripe India, Stripe deposits net INR into your HDFC/ICICI nodal account. Stripe automatically issues monthly FIRC certificates through Standard Chartered / Citibank. Provide your bank's AD Code to Stripe so your bank can log the e-BRC in the DGFT portal within 9 months.
4. **Currency Display:** Show both USD and equivalent INR (RBI reference rate on invoice date) to stay completely compliant with MCA & GST auditors.`,
        createdAt: '2 hours ago',
        helpfulCount: 42,
        isAccepted: true,
        replies: [
          {
            id: 'reply_gst_1',
            author: {
              id: 'user_founder',
              name: 'Aarav Kapoor',
              handle: 'aarav_finflow',
              role: 'Startup Founder',
              roleKey: 'startup',
            },
            body: 'Thank you Dr. Sneha! This is 10x clearer than what our local accountant explained. Added the mandatory export clause to our Stripe invoice template now.',
            createdAt: '1 hour ago',
            helpfulCount: 6,
          },
        ],
      },
      {
        id: 'comment_gst_2',
        author: {
          id: 'user_investor',
          name: 'Vikram Singhania',
          handle: 'vikram_zenith',
          role: 'Angel Investor',
          roleKey: 'investor',
          organization: 'Zenith Capital',
          verified: true,
        },
        body: `Double-down on what Dr. Sneha noted regarding e-BRC. During Series A institutional diligence, foreign VC lawyers will specifically inspect your inward remittance proofs to ensure you don't face unexpected FEMA tax clawbacks. Store all Stripe FIRCs in your platform Data Room.`,
        createdAt: '1 hour ago',
        helpfulCount: 16,
        isAccepted: false,
        replies: [],
      },
    ],
  },
  {
    id: 'post_nextjs_erp',
    spaceSlug: 'product-tech',
    spaceName: 'Product & Engineering',
    type: 'Discussion',
    title: 'Server Components vs Client WebSockets for Real-Time B2B Workspaces: 60-Day Benchmarks',
    body: `Over the past two months, we migrated our ERP table views from pure client-side React Query polling to Next.js 14 Server Actions combined with a lightweight Redis pub/sub WebSocket bridge.

**The Results:**
- **Initial Page Load:** Dropped from 3.4s to 820ms on Tier-2 mobile networks (Jio 4G).
- **DOM Node Count:** Reduced by 48% by streaming SSR rows instead of hydrating heavy client bundles.
- **WebSocket Footprint:** We only open socket connections when an admin enters a live inspection drawer (e.g. Escrow Dispute or Verification inspection).

Would love to hear how other teams handle optimistic UI updates when multiple admins are triaging the same queue simultaneously.`,
    tags: ['NextJS', 'Architecture', 'WebSockets', 'React', 'Performance'],
    stage: 'Prototype',
    author: {
      id: 'user_jobseeker',
      name: 'Priya Nair',
      handle: 'priya_dev',
      role: 'Job Seeker',
      roleKey: 'jobseeker',
      organization: 'Frontend Engineer',
      verified: true,
      badge: 'Verified Talent',
    },
    createdAt: '5 hours ago',
    helpfulCount: 34,
    isHelpfulByMe: false,
    isSavedByMe: false,
    hasAcceptedAnswer: false,
    commentsCount: 4,
    answers: [
      {
        id: 'comment_next_1',
        author: {
          id: 'user_mentor',
          name: 'Dr. Sneha Roy',
          handle: 'drsneha_tech',
          role: 'Verified Mentor',
          roleKey: 'mentor',
          organization: 'Ex-Google Staff Eng',
          verified: true,
          expertLabel: 'Expert Answer • Distributed Systems',
        },
        body: `Tremendous benchmark Priya. The pattern of keeping WebSockets idle until the user focuses an active drawer is textbook resource conservation. For concurrency conflicts (two admins approving the same ticket), consider adding an optimistic lock with a 30-second lease key in Redis (\`SET ticket:id:lock admin_uid NX EX 30\`).`,
        createdAt: '4 hours ago',
        helpfulCount: 22,
        isAccepted: false,
        replies: [],
      },
    ],
  },
  {
    id: 'post_milestone_pilots',
    spaceSlug: 'wins-milestones',
    spaceName: 'Wins & Milestones',
    type: 'Milestone',
    title: 'Milestone: Signed our first 20 enterprise manufacturing pilots across Gujarat & Maharashtra!',
    body: `Six months ago, our team was writing code in a small co-working space in Thane. Today, we crossed 20 active B2B enterprise pilots for our IoT energy monitoring sensors across Surat and Pune industrial belts.

**Key Traction Metrics:**
- **Monthly Sensor Events:** 1.8M telemetry pings per day
- **Average Pilot Contract:** ₹4.5L per facility
- **DPIIT Seed Grant Support:** Received ₹25L non-dilutive grant last month

**Biggest Lesson Learned:**
Industrial procurement officers don't care about AI buzzwords. They care about two things: downtime reduction and whether our system integrates with their existing Tally ERP. Once we built a 1-click Tally XML exporter, our close rate doubled.`,
    tags: ['Milestone', 'B2B', 'Manufacturing', 'IoT', 'DPIIT'],
    stage: 'Early Revenue',
    author: {
      id: 'user_founder',
      name: 'Aarav Kapoor',
      handle: 'aarav_finflow',
      role: 'Startup Founder',
      roleKey: 'startup',
      organization: 'FinFlow Technologies',
      verified: true,
      badge: 'Verified Founder',
    },
    createdAt: '1 day ago',
    helpfulCount: 67,
    isHelpfulByMe: false,
    isSavedByMe: false,
    hasAcceptedAnswer: false,
    commentsCount: 8,
    answers: [],
  },
  {
    id: 'post_ama_sneha',
    spaceSlug: 'live-amas',
    spaceName: 'Live AMAs & Office Hours',
    type: 'AMA',
    title: 'Live AMA: Architecting for High Scale from Day 1 Without Premature Optimization',
    body: `Welcome to our weekly Community AMA! Today our host is **Dr. Sneha Roy**, Ex-Google Staff Systems Engineer and advisor to 12 DPIIT tech startups.

**Host Bio:**
15+ years building distributed high-throughput infrastructure. Spearheaded cloud architecture at Google and teaches cloud systems at BITS Pilani.

**AMA Guidelines:**
- Ask anything about database indexing, microservices vs monolith, Redis caching layers, and hiring founding engineers.
- Upvote the best questions below. Dr. Sneha will be answering live in this thread.
- *Reminder: No fundraising solicitations or commercial course promotions.*`,
    tags: ['AMA', 'Engineering', 'Architecture', 'Mentorship', 'Leadership'],
    stage: 'All Stages',
    author: {
      id: 'user_mentor',
      name: 'Dr. Sneha Roy',
      handle: 'drsneha_tech',
      role: 'Verified Mentor',
      roleKey: 'mentor',
      organization: 'Ex-Google Staff Eng',
      verified: true,
      badge: 'Verified Mentor',
    },
    createdAt: 'Live Now (Ends in 2h)',
    helpfulCount: 95,
    isHelpfulByMe: false,
    isSavedByMe: true,
    hasAcceptedAnswer: false,
    commentsCount: 14,
    answers: [],
  },
  {
    id: 'post_safe_math',
    spaceSlug: 'fundraising-basics',
    spaceName: 'Fundraising Basics (Educational)',
    type: 'Resource',
    title: 'Understanding Post-Money i-SAFE Dilution Math: Free Interactive Spreadsheet Template',
    body: `Many first-time founders in India get confused by how India-SAFE (i-SAFE) notes with valuation caps and discount rates dilute their cap table in subsequent priced equity rounds.

**Key Takeaways:**
1. **Pre-Money vs Post-Money:** Post-money SAFE fixes the investor's ownership percentage upfront, shifting unmodeled dilution to the existing founders if multiple SAFEs are stacked.
2. **Option Pool Shuffle:** Does the 10% ESOP expansion happen before or after the SAFE conversion? In standard Indian term sheets, investors insist on an unallocated 10-15% pool post-conversion.
3. **Download Template:** Attached our open-source Google Sheet modeling multiple SAFE tranches converting into a Series A priced round.

*Affiliation Disclosure: Developed as part of our free non-commercial founder curriculum. No commercial relationship exists.*`,
    tags: ['iSAFE', 'CapTable', 'Dilution', 'Valuation', 'Founders'],
    stage: 'Idea',
    disclosure: 'Non-commercial educational resource developed for Indian founders',
    author: {
      id: 'user_investor',
      name: 'Vikram Singhania',
      handle: 'vikram_zenith',
      role: 'Angel Investor',
      roleKey: 'investor',
      organization: 'Zenith Capital',
      verified: true,
      badge: 'Verified Investor',
    },
    createdAt: '2 days ago',
    helpfulCount: 88,
    isHelpfulByMe: false,
    isSavedByMe: true,
    hasAcceptedAnswer: false,
    commentsCount: 9,
    answers: [],
  },
  {
    id: 'post_poll_gateway',
    spaceSlug: 'tools-stack',
    spaceName: 'Tools, SaaS & Stack',
    type: 'Poll',
    title: 'Poll: Which Indian payment gateway provides the most reliable webhook uptime & recurring UPI autopay in 2026?',
    body: `We are choosing our primary payment aggregator for recurring subscription billing and milestone escrow in India. Uptime, instantaneous webhook deliveries, and low false-positive fraud declines are our main criteria.

Vote below and leave your operational experience in the comments!`,
    tags: ['Fintech', 'PaymentGateways', 'Razorpay', 'Cashfree', 'Stripe'],
    stage: 'Early Revenue',
    pollData: {
      totalVotes: 142,
      options: [
        { id: 'opt_1', text: 'Razorpay (Standard Route + Subscriptions)', votes: 76, percent: 54 },
        { id: 'opt_2', text: 'Cashfree (Payouts & AutoCollect Webhooks)', votes: 38, percent: 27 },
        { id: 'opt_3', text: 'Stripe India (Global Cards + INR)', votes: 21, percent: 15 },
        { id: 'opt_4', text: 'Juspay / HyperSDK (Direct Bank Routing)', votes: 7, percent: 4 },
      ],
      userVotedOptionId: 'opt_1',
    },
    author: {
      id: 'user_founder',
      name: 'Aarav Kapoor',
      handle: 'aarav_finflow',
      role: 'Startup Founder',
      roleKey: 'startup',
      organization: 'FinFlow Technologies',
      verified: true,
    },
    createdAt: '3 days ago',
    helpfulCount: 23,
    isHelpfulByMe: false,
    isSavedByMe: false,
    hasAcceptedAnswer: false,
    commentsCount: 11,
    answers: [],
  },
  {
    id: 'post_looking_cofounder',
    spaceSlug: 'founders-lounge',
    spaceName: 'Founders Lounge',
    type: 'Looking for',
    title: 'Looking for Technical Co-Founder (Deep Learning / Edge AI) for Agri-Sensory Hardware',
    body: `We have built our initial optical hardware prototype and have 8 active tea-estate pilots in Assam and Nilgiris.

**What we are seeking:**
- **Role:** Technical Co-Founder / CTO
- **Core Domain:** Edge Computer Vision (TensorRT, OpenCV, embedded Linux on Jetson)
- **Stage:** Seed Funded (DPIIT Seed Fund recipient)
- **Location:** Bengaluru or Hybrid (willing to travel for harvest field trials)
- **Commitment:** Full-time

If this aligns with your background, send a peer Connect Request on the platform with your GitHub/portfolio!`,
    tags: ['CoFounder', 'DeepTech', 'EdgeAI', 'Hardware', 'Agriculture'],
    stage: 'Prototype',
    author: {
      id: 'user_founder',
      name: 'Aarav Kapoor',
      handle: 'aarav_finflow',
      role: 'Startup Founder',
      roleKey: 'startup',
      organization: 'FinFlow Technologies',
      verified: true,
      badge: 'Verified Founder',
    },
    createdAt: '3 days ago',
    helpfulCount: 19,
    isHelpfulByMe: false,
    isSavedByMe: false,
    hasAcceptedAnswer: false,
    commentsCount: 3,
    answers: [],
  },
  {
    id: 'post_feedback_hero',
    spaceSlug: 'product-tech',
    spaceName: 'Product & Engineering',
    type: 'Feedback request',
    title: 'Roast our B2B landing page hero headline: "Autonomous Treasury Orchestration for High-Growth Startups"',
    body: `We are re-writing our website value proposition. Our software reconciles multi-bank vendor payouts, calculates Section 194J TDS automatically, and generates GST-compliant invoices.

Option A: *"Autonomous Treasury Orchestration for High-Growth Indian Startups"*
Option B: *"Stop Spending 10 Hours a Week on Vendor Payouts & TDS Paperwork"*
Option C: *"The Financial Operating System for DPIIT-Recognized Startups"*

Which headline resonates more with founders and finance leads? Be brutally honest!`,
    tags: ['Copywriting', 'LandingPage', 'GTM', 'B2B', 'Feedback'],
    stage: 'Early Revenue',
    author: {
      id: 'user_founder',
      name: 'Aarav Kapoor',
      handle: 'aarav_finflow',
      role: 'Startup Founder',
      roleKey: 'startup',
      organization: 'FinFlow Technologies',
      verified: true,
    },
    createdAt: '4 days ago',
    helpfulCount: 41,
    isHelpfulByMe: false,
    isSavedByMe: false,
    hasAcceptedAnswer: false,
    commentsCount: 16,
    answers: [],
  },
];

export const UPCOMING_AMAS = [
  {
    id: 'ama_1',
    title: 'Scaling Engineering from Seed to Series B',
    host: 'Dr. Sneha Roy',
    hostRole: 'Verified Mentor • Ex-Google Staff',
    date: 'Today, 4:00 PM IST',
    status: 'Live Now',
    topics: ['System Architecture', 'Microservices', 'Tech Debt'],
    spaceSlug: 'live-amas',
  },
  {
    id: 'ama_2',
    title: 'What Seed Investors Look for in a First Term Sheet',
    host: 'Vikram Singhania',
    hostRole: 'Angel Syndicate Lead • Zenith Capital',
    date: 'Tomorrow, 5:30 PM IST',
    status: 'Upcoming',
    topics: ['Valuation', 'Governance', 'Diligence Red Flags'],
    spaceSlug: 'live-amas',
  },
  {
    id: 'ama_3',
    title: 'Navigating Tech Hiring & ESOP Vesting in 2026',
    host: 'Kunal Verma',
    hostRole: 'Head of People • RazorScale',
    date: 'Friday, 3:00 PM IST',
    status: 'Upcoming',
    topics: ['Compensation Bands', 'Notice Periods', 'Retention'],
    spaceSlug: 'live-amas',
  },
];

// Live Policy Check Engine: analyzes draft text in real time to catch solicitation, PII, fee scams
export function analyzePostCompliance(text, postType, targetSpaceSlug) {
  const issues = [];
  const lower = (text || '').toLowerCase();

  // 1. Proactive Securities & Fundraising Solicitation Check
  const solicitationPhrases = [
    'invest in my startup',
    'invest in our startup',
    'looking for investors to invest',
    'raising ₹',
    'raising 1 cr',
    'raising 2 cr',
    'raising 50 lakh',
    'dm me to invest',
    'dm for safe agreement',
    'seeking 50l check',
    'offering 10% equity to investors',
    'giving 5% equity for investment',
    'guaranteed returns',
  ];

  for (const phrase of solicitationPhrases) {
    if (lower.includes(phrase)) {
      issues.push({
        type: 'critical',
        code: 'POLICY_P_C1_SOLICITATION',
        title: 'Public Fundraising Solicitation Detected',
        message: `Public solicitation of securities or investment offers in community feeds violates Indian regulatory compliance.`,
        guidance: `Please discuss fundraising mechanics educationally. To connect with accredited investors, use the platform's verified 'Discover' and 'Intro Requests' channels.`,
      });
      break;
    }
  }

  // 2. Personal PII / Contact Data Detection
  const phoneRegex = /(?:\+91[\-\s]?)?[6789]\d{9}/;
  const panRegex = /[a-z]{5}[0-9]{4}[a-z]{1}/i;
  const aadhaarRegex = /\b\d{4}\s\d{4}\s\d{4}\b/;
  const upiRegex = /[a-zA-Z0-9.\-_]{2,49}@[a-zA-Z]{2,}/;

  if (phoneRegex.test(text)) {
    issues.push({
      type: 'warning',
      code: 'PII_PHONE',
      title: 'Phone Number Detected',
      message: 'Posting personal mobile numbers publicly poses privacy and spam risks.',
      guidance: 'Consider using safe platform Connect Requests or in-app Messages instead.',
    });
  }

  if (panRegex.test(text) || aadhaarRegex.test(text)) {
    issues.push({
      type: 'critical',
      code: 'PII_STATUTORY_ID',
      title: 'Statutory Identity Number (PAN / Aadhaar) Detected',
      message: 'Never disclose personal PAN or Aadhaar identification numbers in public discussions.',
      guidance: 'Please remove all statutory identity numbers before publishing.',
    });
  }

  if (upiRegex.test(text) && !lower.includes('example@upi')) {
    issues.push({
      type: 'warning',
      code: 'PAYMENT_UPI',
      title: 'Direct UPI ID Detected',
      message: 'Sharing direct UPI payment addresses in discussions is restricted to prevent payment fraud.',
      guidance: 'All contract escrow and milestone payments must flow through verified platform escrow.',
    });
  }

  // 3. Confidential Document Nudge
  const confidentialWords = ['term sheet attached', 'confidential cap table', 'signed nda attached', 'confidential audit report'];
  for (const word of confidentialWords) {
    if (lower.includes(word)) {
      issues.push({
        type: 'info',
        code: 'CONFIDENTIALITY_NUDGE',
        title: 'Confidential Document Reminder',
        message: 'Ensure no trade secrets, non-public cap table details, or signed NDA agreements are shared in public forums.',
        guidance: 'Use the private startup Data Room with cryptographic NDA access controls for sensitive files.',
      });
      break;
    }
  }

  // 4. Upfront Fee / Scam phrases
  const feeScams = ['pay registration fee to get job', 'upfront interview fee', 'send ₹1000 for verification'];
  for (const phrase of feeScams) {
    if (lower.includes(phrase)) {
      issues.push({
        type: 'critical',
        code: 'FEE_SCAM_VIOLATION',
        title: 'Advance Fee Solicitation Blocked',
        message: 'Requesting upfront fees for jobs or interviews violates zero-tolerance platform policy P-C2.',
        guidance: 'Posting job opportunities with fee requirements is grounds for immediate account suspension.',
      });
      break;
    }
  }

  return issues;
}

export const ROLE_COMMUNITY_CONFIG = {
  startup: {
    roleKey: 'startup',
    label: 'Startup Founder',
    personaId: 'user_founder',
    portalUrl: '/startup/dashboard',
    communityUrl: '/startup/community',
    unlockedLoungeSlugs: ['founders-lounge'],
    banner: {
      tag: 'Founder Workspace',
      title: 'Founder Community Hub',
      description: 'Peer founder advice on growth, fundraising playbooks, hiring, and DPIIT compliance. All founders in Founders Lounge are verified.',
    },
    suggestedSpaces: ['founders-lounge', 'ask-community', 'fundraising-basics', 'gtm-growth', 'product-tech'],
  },
  mentor: {
    roleKey: 'mentor',
    label: 'Verified Mentor',
    personaId: 'user_mentor',
    portalUrl: '/mentor/dashboard',
    communityUrl: '/mentor/community',
    unlockedLoungeSlugs: ['mentors-circle'],
    banner: {
      tag: 'Mentor Advisory',
      title: 'Mentor Knowledge & Advisory Hub',
      description: 'Review unanswered questions from DPIIT startups, share architectural and growth playbooks, and host scheduled AMAs.',
    },
    suggestedSpaces: ['mentors-circle', 'ask-community', 'product-tech', 'amas-events'],
  },
  investor: {
    roleKey: 'investor',
    label: 'Angel Investor',
    personaId: 'user_investor',
    portalUrl: '/investor/dashboard',
    communityUrl: '/investor/community',
    unlockedLoungeSlugs: ['investors-forum'],
    banner: {
      tag: 'Investor Syndicate',
      title: 'Investor Syndicate & Ecosystem Forum',
      description: 'Connect with fellow angels and syndicates, share due-diligence frameworks, answer founder questions, and review verified startup milestones.',
    },
    suggestedSpaces: ['investors-forum', 'fundraising-basics', 'wins-milestones', 'amas-events'],
  },
  employer: {
    roleKey: 'employer',
    label: 'Verified Employer',
    personaId: 'user_employer',
    portalUrl: '/employer/dashboard',
    communityUrl: '/employer/community',
    unlockedLoungeSlugs: ['employers-guild'],
    banner: {
      tag: 'People & Hiring',
      title: 'Employer & Talent Acquisition Guild',
      description: 'Benchmark ESOP pools, tech compensation bands, hiring workflows, and discuss talent market dynamics.',
    },
    suggestedSpaces: ['employers-guild', 'hiring-culture', 'product-tech', 'tools-stack'],
  },
  jobseeker: {
    roleKey: 'jobseeker',
    label: 'Talent & Candidate',
    personaId: 'user_jobseeker',
    portalUrl: '/jobseeker/dashboard',
    communityUrl: '/jobseeker/community',
    unlockedLoungeSlugs: ['talent-lounge'],
    banner: {
      tag: 'Talent Lounge',
      title: 'Talent & Career Community',
      description: 'Anonymous offer reviews, interview preparation, portfolio critiques, and engineering discussions without recruiter intrusion.',
    },
    suggestedSpaces: ['talent-lounge', 'hiring-culture', 'product-tech', 'ask-community'],
  },
  admin: {
    roleKey: 'admin',
    label: 'Platform Admin',
    personaId: 'user_admin',
    portalUrl: '/admin/dashboard',
    communityUrl: '/admin/community',
    unlockedLoungeSlugs: ['founders-lounge', 'mentors-circle', 'investors-forum', 'talent-lounge', 'employers-guild'],
    banner: {
      tag: 'Platform Oversight',
      title: 'Trust & Safety Community Moderation',
      description: 'Full supervisory access across all open spaces and verified role lounges. Review reported posts, enforce anti-solicitation rules, and broadcast announcements.',
    },
    suggestedSpaces: ['announcements', 'amas-events', 'ask-community', 'founders-lounge'],
  },
};

export function getPersonaForRole(roleKey) {
  const cfg = ROLE_COMMUNITY_CONFIG[roleKey];
  if (!cfg) return COMMUNITY_PERSONAS[0];
  return COMMUNITY_PERSONAS.find((p) => p.id === cfg.personaId) || COMMUNITY_PERSONAS[0];
}
