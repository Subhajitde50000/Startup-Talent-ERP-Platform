export const integrationTabs = [
  { key: 'providers', label: 'Third-Party Providers', count: 10 },
  { key: 'webhooks', label: 'Incoming Webhooks & DLQ', count: 3 },
  { key: 'failover', label: 'Failover Playbooks', count: 3 },
  { key: 'credentials', label: 'API Keys & Secret Rotation', count: 4 },
];

export const summaryStrip = [
  { label: 'Active Providers', value: '10', status: 'live', sub: 'Across critical services' },
  { label: 'Degraded Gateways', value: '2', status: 'medium', sub: 'Payments UPI, Speech-to-text' },
  { label: 'Credentials Expiring', value: '1', status: 'pending', sub: 'SMS API secret in 28d' },
  { label: 'Webhook Deliveries', value: '99.8%', status: 'resolved', sub: '0 dead-letters in payments' },
];

export const providers = [
  { id: 'prv_kyc_01', name: 'Identity & Entity Verification (KYC/AML)', category: 'Identity', status: 'resolved', quota: '62%', rotation: '15 Jan 2027', fallback: 'Manual Quorum Review' },
  { id: 'prv_pay_01', name: 'Payments Gateway (UPI & Net Banking)', category: 'Payments', status: 'medium', quota: '78%', rotation: '10 Dec 2026', fallback: 'Provider B Automatic Routing' },
  { id: 'prv_email_01', name: 'Transactional Email Dispatch', category: 'Communications', status: 'resolved', quota: '45%', rotation: '1 Mar 2027', fallback: 'Priority Dead-Letter Queue' },
  { id: 'prv_sms_01', name: 'SMS OTP Delivery', category: 'Communications', status: 'resolved', quota: '31%', rotation: '15 Feb 2027', fallback: 'WhatsApp Business API' },
  { id: 'prv_ai_01', name: 'Gemini Foundation Language Model', category: 'AI Services', status: 'resolved', quota: '67%', rotation: '20 Dec 2026', fallback: 'Degraded Offline Prompts' },
];

export const webhooks = [
  { id: 'wh_001', provider: 'Payments Gateway', endpoint: '/webhooks/payments', signature: 'HMAC-SHA256', deliveryRate: '99.8%', latency: '140ms', status: 'resolved' },
  { id: 'wh_002', provider: 'Identity Verification Service', endpoint: '/webhooks/kyc', signature: 'JWT RSA-256', deliveryRate: '99.5%', latency: '220ms', status: 'resolved' },
  { id: 'wh_003', provider: 'Email Delivery Events', endpoint: '/webhooks/email', signature: 'HMAC-SHA256', deliveryRate: '99.9%', latency: '80ms', status: 'resolved' },
];
