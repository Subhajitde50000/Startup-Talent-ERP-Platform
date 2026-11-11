export const OPPORTUNITY_CATEGORIES = [
  'Government Grant',
  'Biotech & Healthtech Grant',
  'Global Accelerator',
  'Regional Incubator',
  'State Seed Fund',
  'Non-Dilutive Award',
];

export const OPPORTUNITY_VERIFICATIONS = [
  'Government Verified',
  'Partner Verified',
  'State Government Verified',
  'DPIIT Accredited',
];

export const OPPORTUNITY_STATUSES = [
  'Active',
  'Under Review',
  'Paused / Closed',
  'Draft (Unpublished)',
];

export const OPPORTUNITY_STAGES = [
  'Early Stage / Prototype',
  'Idea to Prototype',
  'MVP / Beta Launch',
  'Seed to Early Revenue',
  'Growth / Scale-up',
];

export const initialOpportunities = [
  {
    id: 'OPP-DPIIT-01',
    name: 'Startup India Seed Fund Scheme (SISFS)',
    category: 'Government Grant',
    provider: 'DPIIT, Ministry of Commerce & Industry',
    grantAmount: 'Up to ₹50 Lakhs',
    stage: 'Early Stage / Prototype',
    deadline: '2026-12-31',
    verificationState: 'Government Verified',
    url: 'https://seedfund.startupindia.gov.in',
    applicationsReferred: 142,
    status: 'Active',
    description: 'Financial assistance to startups for proof of concept, prototype development, product trials, market entry and commercialization.',
  },
  {
    id: 'OPP-BIRAC-02',
    name: 'BIG (Biotechnology Ignition Grant)',
    category: 'Biotech & Healthtech Grant',
    provider: 'BIRAC / Department of Biotechnology',
    grantAmount: 'Up to ₹50 Lakhs (Equity-Free)',
    stage: 'Prototype / Idea',
    deadline: '2026-11-30',
    verificationState: 'Government Verified',
    url: 'https://birac.nic.in/big.php',
    applicationsReferred: 56,
    status: 'Active',
    description: 'Fosters generation of ideas with commercialisation potential for medtech, biotech, and bio-informatics startups.',
  },
  {
    id: 'OPP-YC-W27',
    name: 'Y Combinator Winter 2027 Batch',
    category: 'Global Accelerator',
    provider: 'Y Combinator',
    grantAmount: '$500,000 for 7% + uncapped SAFE',
    stage: 'Idea to Early Revenue',
    deadline: '2026-11-20',
    verificationState: 'Partner Verified',
    url: 'https://ycombinator.com/apply',
    applicationsReferred: 310,
    status: 'Active',
    description: '12-week intensive accelerator program ending in global Demo Day with top venture capital investors.',
  },
  {
    id: 'OPP-T-HUB-04',
    name: 'T-Hub Lab32 Incubation Cohort 15',
    category: 'Regional Incubator',
    provider: 'T-Hub Hyderabad',
    grantAmount: 'Mentorship + Lab Infrastructure + ₹15L Seed Support',
    stage: 'MVP / Prototype',
    deadline: '2026-12-15',
    verificationState: 'State Government Verified',
    url: 'https://t-hub.co/lab32',
    applicationsReferred: 88,
    status: 'Active',
    description: 'Market readiness program for seed-stage startups in SaaS, AI, and Hardware.',
  },
];
