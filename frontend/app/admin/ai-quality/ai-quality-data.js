export const initialAiReviews = [
  {
    id: 'AI-REV-901',
    feature: 'Interview Feedback',
    category: 'System Design Mock Evaluation',
    source: 'Candidate Score Appeal',
    requestedBy: 'Candidate (Blinded ID #C-4819)',
    submittedDate: '2026-11-09',
    slaDeadline: '3 days remaining',
    status: 'Ready for Review',
    rubricVersion: 'Rubric-SysDesign-v4.1',
    aiScore: 68,
    disputedDimension: 'Concurrency & Distributed Caching Explanation',
  },
  {
    id: 'AI-REV-902',
    feature: 'Readiness Score',
    category: 'Startup Technical Audit Readiness',
    source: 'Founder Escalation',
    requestedBy: 'Founder (Blinded ID #F-1092)',
    submittedDate: '2026-11-08',
    slaDeadline: '2 days remaining',
    status: 'In Review',
    rubricVersion: 'Rubric-TechStack-v2.0',
    aiScore: 74,
    disputedDimension: 'Cloud Architecture & Multi-Tenant Isolation',
  },
  {
    id: 'AI-REV-903',
    feature: 'Resume Drafting AI',
    category: 'Fact Consistency Flag',
    source: 'Automated Fact-Checker Bot',
    requestedBy: 'System QA Bot',
    submittedDate: '2026-11-07',
    slaDeadline: '1 day remaining',
    status: 'Ready for Review',
    rubricVersion: 'Rubric-ResumeFact-v1.8',
    aiScore: 82,
    disputedDimension: 'Unsubstantiated Revenue Growth Metric',
  },
];

export const initialAiMetrics = {
  reviewsWaiting: 8,
  medianTimeToReview: '1.4 business days',
  overturnRate30d: '14.2%',
  openIncidents: 0,
};

export const initialAiModels = [
  { model: 'eval-interviews-pro-v3', surface: 'Mock Interview Scoring', provider: 'Platform Private In-House Model', lastAudited: '2026-10-25', status: 'Healthy' },
  { model: 'resume-bullet-parser-v2', surface: 'Resume Builder & Tailoring', provider: 'Platform Private In-House Model', lastAudited: '2026-11-01', status: 'Healthy' },
  { model: 'match-recommender-v4', surface: 'Job & Mentor Fit Scoring', provider: 'Platform Private In-House Model', lastAudited: '2026-10-30', status: 'Healthy' },
];
