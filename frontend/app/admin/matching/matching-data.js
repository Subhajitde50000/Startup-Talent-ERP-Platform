export const initialMatchingRules = [
  {
    id: 'MAT-001',
    name: 'Investor Discover Priority: Mentor-Verified Boost',
    surface: 'Investor Dealflow Discover',
    weight: '35%',
    status: 'Live',
    description: 'Elevates startups with completed and signed mentor readiness milestones to the top of the investor discover pipeline.',
    fairnessCheck: 'Passed (No pedigree bias)',
  },
  {
    id: 'MAT-002',
    name: 'Job Candidate Fit: Verified Skills & Experience Vector',
    surface: 'Candidate Job Recommendations',
    weight: '40%',
    status: 'Live',
    description: 'Matches candidate demonstrated skills from AI drills & ATS profile to employer job requirements without indexing on age/location proxies.',
    fairnessCheck: 'Passed (Blind to demographic attributes)',
  },
  {
    id: 'MAT-003',
    name: 'Mentor-Startup Advisory Matching Algorithm',
    surface: 'Startup Mentor Requests',
    weight: '50%',
    status: 'Live',
    description: 'Pairs founders with mentors based on industry domain expertise, fundraising stage, and business model compatibility.',
    fairnessCheck: 'Passed',
  },
  {
    id: 'MAT-004',
    name: 'Sponsored Job Placement Exposure Cap',
    surface: 'Public Job Search',
    weight: 'Fixed 20% Max',
    status: 'Live',
    description: 'Limits featured employer jobs to at most 1 in every 5 listings in search feeds to maintain organic relevance.',
    fairnessCheck: 'Strict Cap Enforced',
  },
];

export const initialFairnessMetrics = [
  { metric: 'Prohibited Proxy Scan (Zipcodes, Graduation Years)', status: 'Clean (Zero Proxies in Model Vectors)' },
  { metric: 'Tier-2/3 Regional Startup Exposure Rate', status: '42.8% of Total Impressions' },
  { metric: 'First-Time Founder Dealflow Visibility', status: '38.4% of Investor Discover Slates' },
];
