# Startup & Talent ERP Platform
## Admin Portal User Manual & Comprehensive Operational Reference

> **Document Classification:** Restricted Internal / Enterprise Operations & Administration  
> **Platform Version:** `v4.2.0-PROD` (Forma Luxury-Technical Workspace)  
> **Release Date:** November 2026  
> **Author:** Senior Technical Writer, Product Documentation Specialist & QA Engineer  
> **Audit & Verification Status:** 100% Verified (49/49 Admin Routes Active & Validated)  

---

## Document Control & Version History

| Version | Release Date | Primary Author | Scope of Revisions | Regulatory Approvals |
|:---|:---|:---|:---|:---|
| `v1.0.0` | January 2026 | Technical Operations | Initial Admin MVP Documentation | Operations Committee |
| `v2.4.0` | May 2026 | QA Architecture | Added DPIIT Verification & Escrow Dispute Systems | Legal & Risk Council |
| `v3.8.0` | September 2026 | Product Docs Team | Integrated DPDP Act 2023 DSR & AI Quality Queues | Data Protection Officer |
| `v4.2.0` | November 2026 | Principal QA & Doc Lead | Complete 49-Route Verification, Forma Design Alignment, Live Screenshots | Executive Committee |

### Target Audience
This manual is designed for authorized operational personnel across the following tiers:
- **Super Administrators:** Platform directors with unconstrained access across all runtime flags, staff RBAC, and system maintenance switches.
- **Trust & Safety Officers:** Operations personnel investigating user reports, content moderation queues, and appeals.
- **Compliance & Legal Officers:** Officers overseeing DPIIT startup accreditations, DPDP Data Subject Requests, and regulatory audits.
- **Finance & Disbursement Administrators:** Financial officers auditing payout batches, escrow splits, and Section 194J/194C TDS tax withholding.
- **Customer Support Specialists:** Helpdesk agents managing tier-1 and tier-2 user support inquiries.

---

## Table of Contents

1. [Executive Summary & Platform Architecture](#1-executive-summary--platform-architecture)
2. [Forma Design System & Global Navigation](#2-forma-design-system--global-navigation)
3. [Master Admin Route Inventory Table](#3-master-admin-route-inventory-table)
4. [Page-by-Page Operational User Guide](#4-page-by-page-operational-user-guide)
   - [Module 1: Executive Command & Telemetry](#module-1-module-1)
     * [1. Admin Executive Dashboard (`/admin`)](#page-1-admin-executive-dashboard)
     * [2. Platform Analytics & Telemetry (`/admin/analytics`)](#page-2-platform-analytics-telemetry)
   - [Module 2: Identity & Organization Management](#module-2-module-2)
     * [3. User Directory & Identity Management (`/admin/users`)](#page-3-user-directory-identity-management)
     * [4. User Dossier & Account Detail (`/admin/users/[id]`)](#page-4-user-dossier-account-detail)
     * [5. Organization Directory (`/admin/organizations`)](#page-5-organization-directory)
     * [6. Organization Dossier & Cap Table Inspection (`/admin/organizations/[id]`)](#page-6-organization-dossier-cap-table-inspection)
   - [Module 3: Verification & DPIIT Accreditation](#module-3-module-3)
     * [7. Verification Operations Queue (`/admin/verifications`)](#page-7-verification-operations-queue)
     * [8. Verification Dossier & Document Inspection (`/admin/verifications/[type]/[id]`)](#page-8-verification-dossier-document-inspection)
     * [9. Expiring Verifications & Recertification (`/admin/verifications/expiring`)](#page-9-expiring-verifications-recertification)
   - [Module 4: Trust, Safety & Risk Governance](#module-4-module-4)
     * [10. Content & Behavior Moderation Queue (`/admin/moderation`)](#page-10-content-behavior-moderation-queue)
     * [11. Moderation Incident Case File (`/admin/moderation/[id]`)](#page-11-moderation-incident-case-file)
     * [12. User Reports & Violation Submissions (`/admin/reports`)](#page-12-user-reports-violation-submissions)
     * [13. Moderation Appeals & Reinstatement Queue (`/admin/appeals`)](#page-13-moderation-appeals-reinstatement-queue)
     * [14. Milestone & Escrow Dispute Resolution (`/admin/disputes`)](#page-14-milestone-escrow-dispute-resolution)
     * [15. Fraud Detection & Risk Analysis (`/admin/fraud`)](#page-15-fraud-detection-risk-analysis)
     * [16. Automated Trust Policies & Guardrails (`/admin/policies`)](#page-16-automated-trust-policies-guardrails)
     * [17. AI Quality Control & Human Review (`/admin/ai-quality`)](#page-17-ai-quality-control-human-review)
     * [18. AI Evaluation Dossier & Model Feedback (`/admin/ai-quality/reviews/[id]`)](#page-18-ai-evaluation-dossier-model-feedback)
   - [Module 5: Support & Customer Experience](#module-5-module-5)
     * [19. Customer Support Desk & Ticket Queue (`/admin/support`)](#page-19-customer-support-desk-ticket-queue)
     * [20. Support Ticket Incident File (`/admin/support/[id]`)](#page-20-support-ticket-incident-file)
   - [Module 6: Financial Operations & Subscriptions](#module-6-module-6)
     * [21. Billing Overview & Revenue Telemetry (`/admin/billing`)](#page-21-billing-overview-revenue-telemetry)
     * [22. Subscription Plan & Entitlement Catalog (`/admin/plans`)](#page-22-subscription-plan-entitlement-catalog)
     * [23. Subscription Plan Creation Wizard (`/admin/plans/new`)](#page-23-subscription-plan-creation-wizard)
     * [24. Subscription Plan Modification Studio (`/admin/plans/[id]`)](#page-24-subscription-plan-modification-studio)
     * [25. Disbursement & Payout Operations (`/admin/payouts`)](#page-25-disbursement-payout-operations)
     * [26. Payout Batch Manifest & Ledger (`/admin/payouts/batches/[id]`)](#page-26-payout-batch-manifest-ledger)
   - [Module 7: Regulatory Compliance, Legal & Privacy](#module-7-module-7)
     * [27. Regulatory Compliance & Framework Audits (`/admin/compliance`)](#page-27-regulatory-compliance-framework-audits)
     * [28. Compliance Inspection & Policy Deep Dive (`/admin/compliance/[id]`)](#page-28-compliance-inspection-policy-deep-dive)
     * [29. DPDP / GDPR Data Subject Requests (`/admin/data-requests`)](#page-29-dpdp-gdpr-data-subject-requests)
     * [30. Data Subject Request Processing Dossier (`/admin/data-requests/[id]`)](#page-30-data-subject-request-processing-dossier)
     * [31. System Audit Trail & Immutable Log Explorer (`/admin/audit`)](#page-31-system-audit-trail-immutable-log-explorer)
   - [Module 8: Ecosystem, Grants & Talent Matching](#module-8-module-8)
     * [32. Government Grants & Opportunity Feed (`/admin/opportunities`)](#page-32-government-grants-opportunity-feed)
     * [33. Opportunity Publishing Studio (`/admin/opportunities/new`)](#page-33-opportunity-publishing-studio)
     * [34. Opportunity Management & Edit Studio (`/admin/opportunities/[id]`)](#page-34-opportunity-management-edit-studio)
     * [35. Vector Matching Engine Operations (`/admin/matching`)](#page-35-vector-matching-engine-operations)
     * [36. Platform Event Log & Webhook Stream (`/admin/events`)](#page-36-platform-event-log-webhook-stream)
   - [Module 9: Content & Document Templates](#module-9-module-9)
     * [37. CMS & Help Article Management (`/admin/content`)](#page-37-cms-help-article-management)
     * [38. Hiring & Offer Template Library (`/admin/templates`)](#page-38-hiring-offer-template-library)
     * [39. Contract & Offer Template Creator (`/admin/templates/new`)](#page-39-contract-offer-template-creator)
     * [40. Contract Template Editor (`/admin/templates/[id]`)](#page-40-contract-template-editor)
   - [Module 10: Infrastructure, Configuration & Integrations](#module-10-module-10)
     * [41. Infrastructure Health & Diagnostics (`/admin/system`)](#page-41-infrastructure-health-diagnostics)
     * [42. Third-Party Integrations & API Hub (`/admin/integrations`)](#page-42-third-party-integrations-api-hub)
     * [43. Feature Flags & Runtime Configuration (`/admin/config`)](#page-43-feature-flags-runtime-configuration)
     * [44. Feature Flag & Config Property Provisioning (`/admin/config/new`)](#page-44-feature-flag-config-property-provisioning)
     * [45. System Broadcasts & Notification Dispatcher (`/admin/notifications`)](#page-45-system-broadcasts-notification-dispatcher)
   - [Module 11: Administration, Access Control & Authentication](#module-11-module-11)
     * [46. Admin Staff & Role-Based Access Control (`/admin/staff`)](#page-46-admin-staff-role-based-access-control)
     * [47. Global Platform Preferences & Security Baselines (`/admin/settings`)](#page-47-global-platform-preferences-security-baselines)
     * [48. Admin Operational Manual & Support Center (`/admin/help`)](#page-48-admin-operational-manual-support-center)
     * [49. Admin Authentication Portal & Gatekeeper (`/admin/login`)](#page-49-admin-authentication-portal-gatekeeper)
5. [End-to-End Operational Workflows](#5-end-to-end-operational-workflows)
   - [Workflow 1: Onboarding, Reviewing, and Verifying a DPIIT Startup](#workflow-1)
   - [Workflow 2: Triaging Content Moderation Flags and Resolving User Appeals](#workflow-2)
   - [Workflow 3: Investigating Fraud Alerts, Freezing Wallets, and Setting Payee Holds](#workflow-3)
   - [Workflow 4: Approving Weekly Payout Batches and Generating Bank NACH/NEFT Manifests](#workflow-4)
   - [Workflow 5: Fulfilling DPDP Data Subject Access & Erasure Requests (Right to be Forgotten)](#workflow-5)
   - [Workflow 6: Managing Canary Feature Flag Rollouts and Platform Maintenance Windows](#workflow-6)
   - [Workflow 7: Publishing Government Grant Opportunities and Calibrating Matching Engine](#workflow-7)
6. [Security, Regulatory Compliance & Data Governance](#6-security-regulatory-compliance--data-governance)
7. [System Troubleshooting & Incident Handling](#7-system-troubleshooting--incident-handling)
8. [Comprehensive Platform Glossary](#8-comprehensive-platform-glossary)

---

## 1. Executive Summary & Platform Architecture

The **Startup & Talent ERP Platform** is an enterprise-grade operating system purpose-built to accelerate the Indian innovation ecosystem. It bridges verified Department for Promotion of Industry and Internal Trade (**DPIIT**) recognized startups, elite technical talent, certified venture investors, and government grant schemes into a single compliant digital marketplace.

### Key Architectural Pillars
- **Statutory Verification Engine:** Direct automated cross-referencing against Ministry of Corporate Affairs (MCA21), GSTIN, and DPIIT registries to guarantee verified organizational authenticity.
- **Trust & Safety Infrastructure:** Multi-tier automated AI moderation and human review queues ensuring high marketplace signal-to-noise ratio.
- **Financial Clearinghouse:** Automated milestone escrow holds, Section 194J/194C TDS tax withholding, penny-drop account validation, and bank-standard NACH/NEFT batch disbursements.
- **DPDP Act 2023 Privacy Compliance:** Built-in cryptographic data subject access (DSR) and erasure workflows ensuring total compliance with India's data sovereignty laws.
- **AI Vector Matching Engine:** High-dimensional semantic embedding algorithms that match candidate technical profiles with startup requirements in real time.

---

## 2. Forma Design System & Global Navigation

The Admin Portal is crafted using the proprietary **Forma Luxury-Technical Design System**, which emphasizes high information density, calm ergonomics, and visual hierarchy.

### Design Token Palette
- **Deep Slate Navy (`#0F1B2D`):** Primary command header, active selection surfaces, and high-contrast typography.
- **Warm Alabaster (`#FAF8F4`):** Canvas background preventing eye fatigue during lengthy operational review shifts.
- **Antique Brass (`#B8955A`):** Accents, verification crests, and active tab indicators.
- **Semantic Indicators:** Emerald (`#16A34A`) for operational health/approvals, Amber (`#D97706`) for impending SLA breaches, Crimson (`#DC2626`) for critical risk/fraud alerts, and Sky (`#0284C7`) for active processing.

### Global Navigation Structure
The admin workspace is segmented into six primary operational domains in the desktop sidebar:
1. **Core Operations:** Command Dashboard, Analytics, User Directory, Organizations, Verification Queues.
2. **Governance & Risk:** Moderation Queue, Reports, Appeals, Disputes & Escrow, Fraud & Risk, Policies, AI Quality.
3. **Financial Engine:** Billing Telemetry, Subscription Plans, Outbound Payouts & Batches.
4. **Ecosystem & Matching:** Government Grants & Opportunities, AI Matching Engine Ops, Platform Event Streams.
5. **Platform Engine:** Content Management (CMS), Offer Templates, System Health, Integrations Hub, Runtime Configuration.
6. **Administration:** System Audit Trail, DPDP Data Requests, Support Helpdesk, Broadcast Notifications, Staff RBAC, Global Settings, Operational Help.

### Global Keyboard Shortcuts
- `Cmd+K` or `Ctrl+K`: Opens the universal Command Palette for instantaneous route jumping and record lookup.
- `/`: Focuses the active table search input on any page.
- `Esc`: Dismisses active sliding drawers, modals, and previews.

---

## 3. Master Admin Route Inventory Table

The following inventory details all **49 verified administrative routes** present in the production codebase. Every route has been verified active (HTTP 200) with visual capture.

| # | Page Name | Route URL | Module | Purpose & Core Responsibility | Status |
|:---|:---|:---|:---|:---|:---|
| 1 | **Admin Executive Dashboard** | `/admin` | Executive Command & Telemetry | Provides the primary landing cockpit and consolidated operational command center for platform a... | 100% Verified (HTTP 200) |
| 2 | **Platform Analytics & Telemetry** | `/admin/analytics` | Executive Command & Telemetry | Delivers deep-dive historical telemetry, role cohort retention analytics, conversion funnel vis... | 100% Verified (HTTP 200) |
| 3 | **User Directory & Identity Management** | `/admin/users` | Identity & Organization Management | Acts as the central identity registry and master directory for all registered accounts across a... | 100% Verified (HTTP 200) |
| 4 | **User Dossier & Account Detail** | `/admin/users/[id]` | Identity & Organization Management | Presents an exhaustive 360-degree dossier for a single user record, detailing personal identity... | 100% Verified (HTTP 200) |
| 5 | **Organization Directory** | `/admin/organizations` | Identity & Organization Management | Serves as the enterprise repository of all registered startups, companies, recruitment agencies... | 100% Verified (HTTP 200) |
| 6 | **Organization Dossier & Cap Table Inspection** | `/admin/organizations/[id]` | Identity & Organization Management | Provides granular administrative inspection of a corporate entity's legal filings, founder team... | 100% Verified (HTTP 200) |
| 7 | **Verification Operations Queue** | `/admin/verifications` | Verification & DPIIT Accreditation | Manages the multi-tiered verification pipeline for startups, individual talent, and accredited ... | 100% Verified (HTTP 200) |
| 8 | **Verification Dossier & Document Inspection** | `/admin/verifications/[type]/[id]` | Verification & DPIIT Accreditation | Delivers an immersive, dual-pane document inspection workbench allowing examiners to cross-refe... | 100% Verified (HTTP 200) |
| 9 | **Expiring Verifications & Recertification** | `/admin/verifications/expiring` | Verification & DPIIT Accreditation | Tracks recurring credentials, annual compliance renewals, and expiring DPIIT recognitions to en... | 100% Verified (HTTP 200) |
| 10 | **Content & Behavior Moderation Queue** | `/admin/moderation` | Trust, Safety & Risk Governance | Acts as the operational center for triaging flagged job descriptions, user bios, message transc... | 100% Verified (HTTP 200) |
| 11 | **Moderation Incident Case File** | `/admin/moderation/[id]` | Trust, Safety & Risk Governance | Provides a comprehensive evidentiary case file for a specific content violation, including hist... | 100% Verified (HTTP 200) |
| 12 | **User Reports & Violation Submissions** | `/admin/reports` | Trust, Safety & Risk Governance | Consolidates all direct user-submitted complaints regarding job scams, abusive behavior, impers... | 100% Verified (HTTP 200) |
| 13 | **Moderation Appeals & Reinstatement Queue** | `/admin/appeals` | Trust, Safety & Risk Governance | Provides procedural due process for users and organizations appealing against content removals,... | 100% Verified (HTTP 200) |
| 14 | **Milestone & Escrow Dispute Resolution** | `/admin/disputes` | Trust, Safety & Risk Governance | Serves as the arbitration tribunal and escrow adjudication workbench for financial contract dis... | 100% Verified (HTTP 200) |
| 15 | **Fraud Detection & Risk Analysis** | `/admin/fraud` | Trust, Safety & Risk Governance | Monitors automated fraud telemetry, payment risk anomalies, suspicious login clusters, and coor... | 100% Verified (HTTP 200) |
| 16 | **Automated Trust Policies & Guardrails** | `/admin/policies` | Trust, Safety & Risk Governance | Configures automated platform safety rules, regex filters, keyword blocklists, rate limits, and... | 100% Verified (HTTP 200) |
| 17 | **AI Quality Control & Human Review** | `/admin/ai-quality` | Trust, Safety & Risk Governance | Supervises platform AI models (Gemini, matching engines, resume parsers) through human-in-the-l... | 100% Verified (HTTP 200) |
| 18 | **AI Evaluation Dossier & Model Feedback** | `/admin/ai-quality/reviews/[id]` | Trust, Safety & Risk Governance | Provides a comprehensive inspection environment for deep analysis of an individual model infere... | 100% Verified (HTTP 200) |
| 19 | **Customer Support Desk & Ticket Queue** | `/admin/support` | Support & Customer Experience | Central helpdesk management console for processing customer support requests, billing queries, ... | 100% Verified (HTTP 200) |
| 20 | **Support Ticket Incident File** | `/admin/support/[id]` | Support & Customer Experience | Comprehensive two-way communication console and troubleshooting workspace for resolving individ... | 100% Verified (HTTP 200) |
| 21 | **Billing Overview & Revenue Telemetry** | `/admin/billing` | Financial Operations & Subscriptions | Consolidated financial telemetry dashboard tracking platform revenue streams, recurring subscri... | 100% Verified (HTTP 200) |
| 22 | **Subscription Plan & Entitlement Catalog** | `/admin/plans` | Financial Operations & Subscriptions | Manages platform monetization tiers, subscription pricing, feature entitlements, job posting li... | 100% Verified (HTTP 200) |
| 23 | **Subscription Plan Creation Wizard** | `/admin/plans/new` | Financial Operations & Subscriptions | Step-by-step authoring studio for provisioning new subscription products, setting recurring pri... | 100% Verified (HTTP 200) |
| 24 | **Subscription Plan Modification Studio** | `/admin/plans/[id]` | Financial Operations & Subscriptions | Provides full lifecycle management for an existing subscription plan, allowing administrators t... | 100% Verified (HTTP 200) |
| 25 | **Disbursement & Payout Operations** | `/admin/payouts` | Financial Operations & Subscriptions | Manages platform outbound financial disbursements, escrow releases, freelancer payout batches, ... | 100% Verified (HTTP 200) |
| 26 | **Payout Batch Manifest & Ledger** | `/admin/payouts/batches/[id]` | Financial Operations & Subscriptions | Provides an itemized, line-by-line financial manifest of every individual payee disbursement in... | 100% Verified (HTTP 200) |
| 27 | **Regulatory Compliance & Framework Audits** | `/admin/compliance` | Regulatory Compliance, Legal & Privacy | Central regulatory governance console monitoring platform adherence to the Digital Personal Dat... | 100% Verified (HTTP 200) |
| 28 | **Compliance Inspection & Policy Deep Dive** | `/admin/compliance/[id]` | Regulatory Compliance, Legal & Privacy | Provides granular, technical audit inspection for a specific regulatory control framework, disp... | 100% Verified (HTTP 200) |
| 29 | **DPDP / GDPR Data Subject Requests** | `/admin/data-requests` | Regulatory Compliance, Legal & Privacy | Manages statutory privacy requests submitted by platform users exercising their rights under th... | 100% Verified (HTTP 200) |
| 30 | **Data Subject Request Processing Dossier** | `/admin/data-requests/[id]` | Regulatory Compliance, Legal & Privacy | Granular execution workbench for fulfilling an individual Data Subject Access or Erasure Reques... | 100% Verified (HTTP 200) |
| 31 | **System Audit Trail & Immutable Log Explorer** | `/admin/audit` | Regulatory Compliance, Legal & Privacy | Provides a tamper-evident, immutable forensic log of all administrative actions, data modificat... | 100% Verified (HTTP 200) |
| 32 | **Government Grants & Opportunity Feed** | `/admin/opportunities` | Ecosystem, Grants & Talent Matching | Manages public and private ecosystem opportunities, including DPIIT Seed Fund schemes, state in... | 100% Verified (HTTP 200) |
| 33 | **Opportunity Publishing Studio** | `/admin/opportunities/new` | Ecosystem, Grants & Talent Matching | Wizard for creating, configuring, and publishing new startup grants, venture competitions, or i... | 100% Verified (HTTP 200) |
| 34 | **Opportunity Management & Edit Studio** | `/admin/opportunities/[id]` | Ecosystem, Grants & Talent Matching | Comprehensive administrative workbench for managing an active opportunity program, reviewing su... | 100% Verified (HTTP 200) |
| 35 | **Vector Matching Engine Operations** | `/admin/matching` | Ecosystem, Grants & Talent Matching | Supervises and fine-tunes the platform's AI vector similarity matching engine that matches cand... | 100% Verified (HTTP 200) |
| 36 | **Platform Event Log & Webhook Stream** | `/admin/events` | Ecosystem, Grants & Talent Matching | Provides real-time event streaming and webhook delivery telemetry for auditing system-wide pub/... | 100% Verified (HTTP 200) |
| 37 | **CMS & Help Article Management** | `/admin/content` | Content & Document Templates | Manages platform content marketing, public help desk articles, founder resource guides, legal t... | 100% Verified (HTTP 200) |
| 38 | **Hiring & Offer Template Library** | `/admin/templates` | Content & Document Templates | Manages standardized, legally vetted contract templates for full-time employment, freelance con... | 100% Verified (HTTP 200) |
| 39 | **Contract & Offer Template Creator** | `/admin/templates/new` | Content & Document Templates | Authoring workbench for creating new legally binding employment offer templates, contractor agr... | 100% Verified (HTTP 200) |
| 40 | **Contract Template Editor** | `/admin/templates/[id]` | Content & Document Templates | Editing and revision studio for modifying an existing contract template, managing clause versio... | 100% Verified (HTTP 200) |
| 41 | **Infrastructure Health & Diagnostics** | `/admin/system` | Infrastructure, Configuration & Integrations | Monitors platform infrastructure health, cloud microservice availability, database latency, Red... | 100% Verified (HTTP 200) |
| 42 | **Third-Party Integrations & API Hub** | `/admin/integrations` | Infrastructure, Configuration & Integrations | Manages platform connections with external APIs, payment gateways, identity verification provid... | 100% Verified (HTTP 200) |
| 43 | **Feature Flags & Runtime Configuration** | `/admin/config` | Infrastructure, Configuration & Integrations | Provides real-time runtime configuration, feature flag rollouts, canary deployments, and operat... | 100% Verified (HTTP 200) |
| 44 | **Feature Flag & Config Property Provisioning** | `/admin/config/new` | Infrastructure, Configuration & Integrations | Authoring workbench for provisioning new feature flags, runtime variables, and experimental can... | 100% Verified (HTTP 200) |
| 45 | **System Broadcasts & Notification Dispatcher** | `/admin/notifications` | Infrastructure, Configuration & Integrations | Manages platform-wide system announcements, emergency maintenance banners, automated transactio... | 100% Verified (HTTP 200) |
| 46 | **Admin Staff & Role-Based Access Control** | `/admin/staff` | Administration, Access Control & Authentication | Manages internal administrative staff personnel, permission roles, granular access privileges, ... | 100% Verified (HTTP 200) |
| 47 | **Global Platform Preferences & Security Baselines** | `/admin/settings` | Administration, Access Control & Authentication | Configures enterprise platform preferences, security policies, password complexity rules, sessi... | 100% Verified (HTTP 200) |
| 48 | **Admin Operational Manual & Support Center** | `/admin/help` | Administration, Access Control & Authentication | Provides internal operational reference documentation, standard operating procedures (SOPs), ke... | 100% Verified (HTTP 200) |
| 49 | **Admin Authentication Portal & Gatekeeper** | `/admin/login` | Administration, Access Control & Authentication | Serves as the secure entry gatekeeper, identity challenge, and multi-factor authentication port... | 100% Verified (HTTP 200) |

---

## 4. Page-by-Page Operational User Guide

### Module 1: Executive Command & Telemetry
*High-level platform oversight, key performance indicators (KPIs), real-time revenue velocity, user cohort telemetry, and system-wide operational metrics.*

#### <a id='page-1-admin-executive-dashboard'></a>1. Admin Executive Dashboard
**URL:** `/admin`  
**Module:** Executive Command & Telemetry  
**Operational Verification Status:** Verified Active (HTTP 200)

![Admin Executive Dashboard UI Interface](screenshots/01-dashboard.png)
*Figure 1: Live Interface of Admin Executive Dashboard (`/admin`)*

**Purpose & Business Objective:**  
Provides the primary landing cockpit and consolidated operational command center for platform administrators, highlighting critical action queues, revenue health, and platform growth velocity.

**Primary Administrative Tasks:**
- Monitoring real-time Gross Transaction Value (GTV) and Monthly Recurring Revenue (MRR).
- Tracking active user counts across Startup Founders, Jobseekers, and Investors.
- Quick-triaging pending action queues (Verifications, Content Moderation, Support Tickets, Milestone Escrow Disputes).
- Viewing recent system-wide platform audit activity.

**Main UI Features & Data Components:**
- KPI Metric Cards: Displays Total Users, Verified Startups, Monthly Platform GMV, and Pending Verifications with week-over-week trend indicators.
- Urgent Action Items Grid: Dynamic alert cards linking to pending DPIIT verifications, flagged content incidents, and unresolved payment disputes.
- User Acquisition & Growth Chart: Visual breakdown of registrations across talent, employer, and investor roles.
- Recent Platform Audit Activity Stream: Chronological mini-log of recent administrative actions.
- System Health Status Pill: Live indicator of operational status, API latency, and database connectivity.

**Available Actions & UI Controls:**
| Control Name | UI Type | Operational Effect |
|:---|:---|:---|
| **Filter Time Range (Dropdown)** | Interactive Control | Switches telemetry view between Today, Past 7 Days, Past 30 Days, and All Time. |
| **Quick Action: Review Verifications (Button)** | Interactive Control | Directly opens the verification queue (/admin/verifications). |
| **Quick Action: Resolve Disputes (Button)** | Interactive Control | Navigates directly to active payment disputes (/admin/disputes). |
| **Export Executive Summary (Button)** | Interactive Control | Downloads a CSV snapshot of current platform KPIs and health metrics. |
| **Global Search Trigger (Cmd+K)** | Interactive Control | Opens the command palette for instantaneous route and record navigation. |

**Step-by-Step Usage Instructions:**
1. Log in to the Admin Portal; the system defaults to the Executive Dashboard (/admin).
2. Review the top KPI cards to assess day-over-day changes in GMV, user growth, and active workloads.
3. Inspect the 'Urgent Action Items' section to identify priority bottlenecks requiring administrative sign-off.
4. Click on any priority card (e.g., '5 DPIIT Verifications Pending') to navigate immediately to the dedicated resolution view.
5. Review the 'Recent Audit Activity' feed at the bottom to stay informed on peer administrator actions.

**Cross-Navigation & Related Pages:** `/admin/analytics`, `/admin/verifications`, `/admin/moderation`, `/admin/audit`

> [!NOTE] **Operational Limitations & Implementation Stubs:**  
> Metric trend sparklines reflect mock telemetry when running in local development mode without a production TimescaleDB backend connection.

---

#### <a id='page-2-platform-analytics-telemetry'></a>2. Platform Analytics & Telemetry
**URL:** `/admin/analytics`  
**Module:** Executive Command & Telemetry  
**Operational Verification Status:** Verified Active (HTTP 200)

![Platform Analytics & Telemetry UI Interface](screenshots/02-analytics.png)
*Figure 2: Live Interface of Platform Analytics & Telemetry (`/admin/analytics`)*

**Purpose & Business Objective:**  
Delivers deep-dive historical telemetry, role cohort retention analytics, conversion funnel visualization, and geographical distribution across Indian startup hubs.

**Primary Administrative Tasks:**
- Analyzing multi-cohort retention curves across Founders, Candidates, and Investors.
- Monitoring job application-to-hire conversion velocity and time-to-fill ratios.
- Evaluating regional platform density across Bengaluru, Delhi-NCR, Mumbai, and Hyderabad.
- Exporting compliance-grade analytics reports for leadership and board presentations.

**Main UI Features & Data Components:**
- Cohort Retention Matrix: Heatmap displaying week-by-week user engagement persistence.
- Conversion Funnel Visualization: Step-by-step dropoff analysis from signup to profile completion, job application, interview, and contract signing.
- Revenue Breakdown Charts: Segregation of platform income across subscription plans, milestone escrow fees, and enterprise recruitment services.
- Regional Geographic Distribution: Tier-1 vs. Tier-2 Indian tech hub participation breakdown.
- Granular Date Range & Role Filter Bar: Custom date picker with role-based metric slicing.

**Available Actions & UI Controls:**
| Control Name | UI Type | Operational Effect |
|:---|:---|:---|
| **Granular Date Range Picker** | Interactive Control | Filters telemetry between custom calendar dates with weekly or monthly aggregation. |
| **Role Segment Filter** | Interactive Control | Toggles data stream between All Roles, Jobseeker Only, Startup Employer Only, and Investor Only. |
| **Export Telemetry (CSV/XLSX)** | Interactive Control | Generates and downloads raw telemetry data for offline analysis. |
| **Cohort Metric Toggle** | Interactive Control | Switches the heatmap between Active User Retention and Revenue Retention. |

**Step-by-Step Usage Instructions:**
1. Navigate to Analytics via the sidebar navigation under Core Operations.
2. Select the target time range using the top-right date selector.
3. Filter by role cohort (e.g., 'Startup Employers') to isolate employer retention and hiring metrics.
4. Inspect the conversion funnel to detect friction points in candidate onboarding or interview scheduling.
5. Click 'Export Report' to trigger an automated tabular export of the aggregated datasets.

**Cross-Navigation & Related Pages:** `/admin`, `/admin/billing`, `/admin/matching`

> [!NOTE] **Operational Limitations & Implementation Stubs:**  
> Geographic map visualizations render aggregated metropolitan statistical areas; Tier-3 granular geolocation requires external IP-intelligence licensing.

---

### Module 2: Identity & Organization Management
*Comprehensive user lifecycle directory, account suspension controls, organization cap table inspection, and corporate entity management.*

#### <a id='page-3-user-directory-identity-management'></a>3. User Directory & Identity Management
**URL:** `/admin/users`  
**Module:** Identity & Organization Management  
**Operational Verification Status:** Verified Active (HTTP 200)

![User Directory & Identity Management UI Interface](screenshots/03-users.png)
*Figure 3: Live Interface of User Directory & Identity Management (`/admin/users`)*

**Purpose & Business Objective:**  
Acts as the central identity registry and master directory for all registered accounts across all platform roles (Founders, Talent, Investors, Admins).

**Primary Administrative Tasks:**
- Searching and filtering platform users by email, phone, name, role, status, or verification state.
- Executing administrative actions: impersonation, password reset dispatch, email verification override, and account suspension.
- Auditing individual profile completion scores and risk tiers.
- Exporting filtered user manifests for compliance or communications.

**Main UI Features & Data Components:**
- Unified User Data Table: Displays User ID, Full Name, Email, Primary Role, Verification Badge, Status (Active, Suspended, Pending), and Join Date.
- Multi-Facet Search & Filter Bar: Instant search with debounced text input, role selector, verification filter, and status dropdown.
- User Quick Drawer: Sliding right-hand drawer showing profile summary, contact info, and activity history without navigating away.
- Bulk Action Toolbar: Enables bulk suspension, role modification, or tag assignment for selected records.
- Pagination & Page Size Controls: Standard 10/25/50/100 records per page navigation.

**Available Actions & UI Controls:**
| Control Name | UI Type | Operational Effect |
|:---|:---|:---|
| **Search Users Input** | Interactive Control | Debounced text query matching name, email, or internal user UUID. |
| **Role Filter Dropdown** | Interactive Control | Filters directory by Jobseeker, Startup, Investor, or Admin. |
| **Verification Status Filter** | Interactive Control | Filters by Unverified, Pending, Verified, or Rejected. |
| **View Profile Link** | Interactive Control | Navigates to the comprehensive user detail dossier (/admin/users/[id]). |
| **Account Status Toggle / Ellipsis Menu** | Interactive Control | Triggers Account Suspension, Password Reset, or Impersonation session. |

**Step-by-Step Usage Instructions:**
1. Navigate to 'Users' under Core Operations in the sidebar.
2. Enter a name, email address, or user ID in the search input box.
3. Apply filters (e.g., Role: 'Startup', Verification: 'Pending') to narrow down target profiles.
4. Click on any user row or name link to open their comprehensive dossier.
5. To suspend a fraudulent or non-compliant account, click the action menu (...) and select 'Suspend Account', entering the mandatory justification.

**Cross-Navigation & Related Pages:** `/admin/users/usr_01`, `/admin/organizations`, `/admin/verifications`, `/admin/audit`

> [!NOTE] **Operational Limitations & Implementation Stubs:**  
> User impersonation generates an audited temporary JWT session; production impersonation is restricted to Super Admin role with 2FA re-authentication.

---

#### <a id='page-4-user-dossier-account-detail'></a>4. User Dossier & Account Detail
**URL:** `/admin/users/[id]`  
**Module:** Identity & Organization Management  
**Operational Verification Status:** Verified Active (HTTP 200)

![User Dossier & Account Detail UI Interface](screenshots/04-user-detail.png)
*Figure 4: Live Interface of User Dossier & Account Detail (`/admin/users/[id]`)*

**Purpose & Business Objective:**  
Presents an exhaustive 360-degree dossier for a single user record, detailing personal identity, contact channels, connected organizations, security logs, and associated transactions.

**Primary Administrative Tasks:**
- Reviewing detailed identity information (Aadhaar/PAN hash, DPIIT registration links).
- Inspecting associated organization memberships and cap table shareholdings.
- Viewing linked payment cards, payout bank accounts, and billing history.
- Reviewing security log history (login IPs, device fingerprints, password change events).
- Executing administrative status overrides (Suspend, Freeze, Verify, Terminate).

**Main UI Features & Data Components:**
- Profile Header Banner: User avatar, verification badge, current status, user UUID, and primary role badge.
- Tabbed Dossier Navigation: Tabs for Overview, Associated Organizations, Billing & Transactions, Verifications, Security Audit, and Communication History.
- Contact & Identity Card: Verified email, mobile number, emergency contact, and location.
- Activity Timeline: Chronological audit trail of all platform interactions, logins, and contract milestones.
- Administrative Action Panel: High-visibility controls for status toggle, security lock, and direct notification dispatch.

**Available Actions & UI Controls:**
| Control Name | UI Type | Operational Effect |
|:---|:---|:---|
| **Edit Profile (Button)** | Interactive Control | Opens administrative modal to modify user metadata or contact info. |
| **Suspend Account (Button)** | Interactive Control | Revokes active sessions and blocks platform authentication. |
| **Reset Password (Button)** | Interactive Control | Dispatches a cryptographic password reset link to verified email. |
| **Force 2FA Re-enrollment (Button)** | Interactive Control | Clears registered TOTP/authenticator secrets and requires new setup on next login. |
| **Download Data Dossier (Button)** | Interactive Control | Generates a complete JSON/PDF export for DPDP compliance records. |

**Step-by-Step Usage Instructions:**
1. Open a user profile from the User Directory or click a direct profile link.
2. Review the Overview tab to confirm identity verification and account state.
3. Switch to 'Associated Organizations' to see employer or startup affiliations.
4. Switch to 'Security Audit' to inspect recent login IP addresses and device fingerprints.
5. If administrative intervention is required, select the appropriate action button in the top action bar and confirm.

**Cross-Navigation & Related Pages:** `/admin/users`, `/admin/verifications`, `/admin/organizations`, `/admin/audit`

> [!NOTE] **Operational Limitations & Implementation Stubs:**  
> Direct field editing for Aadhaar/PAN identity hashes is cryptographically restricted to preserve statutory compliance under Indian data governance standards.

---

#### <a id='page-5-organization-directory'></a>5. Organization Directory
**URL:** `/admin/organizations`  
**Module:** Identity & Organization Management  
**Operational Verification Status:** Verified Active (HTTP 200)

![Organization Directory UI Interface](screenshots/44-organizations.png)
*Figure 5: Live Interface of Organization Directory (`/admin/organizations`)*

**Purpose & Business Objective:**  
Serves as the enterprise repository of all registered startups, companies, recruitment agencies, and venture funds operating on the platform.

**Primary Administrative Tasks:**
- Reviewing company legal names, Corporate Identification Numbers (CIN), GSTIN, and DPIIT recognition numbers.
- Monitoring organization operational health, team size, active job postings, and total payroll/disbursement volume.
- Verifying corporate incorporation certificates and DPIIT startup recognition documents.
- Toggling organization operational status (Active, Under Review, Delisted, Suspended).

**Main UI Features & Data Components:**
- Organization Data Table: Displays Org Name, Logo, Legal Entity Type (Pvt Ltd, LLP, Sole Prop), DPIIT Status, Active Jobs Count, Total Team Size, and Health Status.
- Entity Filter Bar: Filter by DPIIT Recognized, Seed Funded, Series A+, Bootstrapped, or Verification Status.
- Quick Detail Drawer: Slides in from the right with quick corporate snapshot, founder contact, and primary bank details.
- Export Organizations Roster: Generates CSV export for compliance and partnership reporting.

**Available Actions & UI Controls:**
| Control Name | UI Type | Operational Effect |
|:---|:---|:---|
| **Search Organizations** | Interactive Control | Searches by company name, CIN, GSTIN, or registered domain. |
| **DPIIT Filter Toggle** | Interactive Control | Filters exclusively for DPIIT Startup India recognized entities. |
| **View Org Dossier (Button/Link)** | Interactive Control | Navigates to the detailed organization dossier (/admin/organizations/[id]). |
| **Change Status Dropdown** | Interactive Control | Modifies legal status (Verified, Suspended, Pending Review). |

**Step-by-Step Usage Instructions:**
1. Navigate to Organizations in the sidebar navigation.
2. Search for the target startup by brand name, legal entity name, or CIN.
3. Review the DPIIT badge and verification state directly in the table.
4. Click on the organization name to open the comprehensive Organization Dossier.
5. To modify verification or compliance standing, use the inline status selector or dossier action menu.

**Cross-Navigation & Related Pages:** `/admin/organizations/org_01`, `/admin/verifications`, `/admin/users`, `/admin/opportunities`

> [!NOTE] **Operational Limitations & Implementation Stubs:**  
> CIN and GSTIN validation checks query the cached MCA/GST database; real-time live MCA portal lookups depend on the MCA API integration bridge.

---

#### <a id='page-6-organization-dossier-cap-table-inspection'></a>6. Organization Dossier & Cap Table Inspection
**URL:** `/admin/organizations/[id]`  
**Module:** Identity & Organization Management  
**Operational Verification Status:** Verified Active (HTTP 200)

![Organization Dossier & Cap Table Inspection UI Interface](screenshots/45-organization-detail.png)
*Figure 6: Live Interface of Organization Dossier & Cap Table Inspection (`/admin/organizations/[id]`)*

**Purpose & Business Objective:**  
Provides granular administrative inspection of a corporate entity's legal filings, founder team members, active job contracts, cap table structure, and financial billing standing.

**Primary Administrative Tasks:**
- Inspecting official MCA incorporation certificates, MoA, AoA, and DPIIT certificates.
- Reviewing all associated team members, invited recruiters, and their platform roles.
- Auditing active job postings, contract milestones, and escrow balances.
- Inspecting linked bank accounts and automated NACH mandate statuses.

**Main UI Features & Data Components:**
- Corporate Header: Entity legal name, trade name, CIN, GSTIN, DPIIT Recognition number, and incorporation date.
- Tabbed Workspace: Tabs for Corporate Overview, Team Members & RBAC, Active Postings, Contracts & Escrow, Compliance Filings, and Billing Ledger.
- Key Personnel & Founders Card: Identifies primary directors, DINs, verified founders, and emergency administrative contacts.
- Financial Summary Panel: Lifetime GMV, active escrow balance, and pending disbursements.
- Corporate Action Bar: Quick buttons to approve verification, request additional documentation, freeze hiring, or suspend organization.

**Available Actions & UI Controls:**
| Control Name | UI Type | Operational Effect |
|:---|:---|:---|
| **Approve DPIIT Standing (Button)** | Interactive Control | Marks the organization as verified with official DPIIT badge. |
| **Request Document Resubmission (Button)** | Interactive Control | Dispatches an email request to founders detailing required revisions. |
| **Freeze Organization Hiring (Button)** | Interactive Control | Temporarily hides active job postings and halts new contract generation. |
| **Manage Team Members (Modal Trigger)** | Interactive Control | Allows admin to reassign primary owner or revoke rogue team accounts. |
| **Download Legal Audit Package (Button)** | Interactive Control | Exports bundled PDF archive of all uploaded corporate certificates. |

**Step-by-Step Usage Instructions:**
1. Open the target organization record from the Organization Directory.
2. Inspect the Corporate Overview tab to verify CIN, GSTIN, and DPIIT credentials.
3. Open the Compliance Filings tab to review uploaded Certificate of Incorporation and PAN documents.
4. Review the Team Members tab to confirm legitimate authorized signatories.
5. Click 'Approve DPIIT Standing' if all documents meet Ministry of Commerce standards, or 'Request Resubmission' if errors exist.

**Cross-Navigation & Related Pages:** `/admin/organizations`, `/admin/verifications`, `/admin/billing`, `/admin/audit`

> [!NOTE] **Operational Limitations & Implementation Stubs:**  
> Cap table valuation numbers are self-reported by founders during funding rounds; they do not constitute formal statutory valuations under Rule 11UA.

---

### Module 3: Verification & DPIIT Accreditation
*Multi-stage verification workflows, document authentication, DPIIT recognition checks, and automated recertification tracking.*

#### <a id='page-7-verification-operations-queue'></a>7. Verification Operations Queue
**URL:** `/admin/verifications`  
**Module:** Verification & DPIIT Accreditation  
**Operational Verification Status:** Verified Active (HTTP 200)

![Verification Operations Queue UI Interface](screenshots/05-verifications.png)
*Figure 7: Live Interface of Verification Operations Queue (`/admin/verifications`)*

**Purpose & Business Objective:**  
Manages the multi-tiered verification pipeline for startups, individual talent, and accredited investors seeking verified badges on the platform.

**Primary Administrative Tasks:**
- Triaging pending identity and corporate verification submissions.
- Reviewing document validity against government registries (MCA, DPIIT, UIDAI, Income Tax).
- Approving, rejecting, or requesting clarification on submitted credentials.
- Monitoring SLA compliance for pending verification tickets (target: <24h turnaround).

**Main UI Features & Data Components:**
- Queue Status Counters: Displays Pending Review, Under Inspection, Needs Clarification, and Approved Today.
- Tabbed Queue Filter: Toggle between All, Startup Entities, Individual Talent (ID/Degree), and Accredited Investors.
- Verification Data Table: Submitter Name, Entity Type, Submitted Document Types, Submission Timestamp, SLA Timer, and Risk Score.
- Quick Review Drawer: Fast preview of submitted PDF/images with zoom, rotate, and decision action buttons.
- Bulk Triage Actions: Batch approve low-risk, automated-verified credentials.

**Available Actions & UI Controls:**
| Control Name | UI Type | Operational Effect |
|:---|:---|:---|
| **Inspect Document (Button)** | Interactive Control | Opens the dedicated verification review dossier (/admin/verifications/[type]/[id]). |
| **Quick Approve (Button)** | Interactive Control | Instantly approves verification and issues platform verified badge. |
| **Request Additional Info (Button)** | Interactive Control | Opens prompt to specify missing documents or unreadable scans. |
| **Reject Submission (Button)** | Interactive Control | Rejects submission with mandatory regulatory reason code. |
| **View Expiring List (Button/Tab)** | Interactive Control | Navigates to the expiring certifications queue (/admin/verifications/expiring). |

**Step-by-Step Usage Instructions:**
1. Access the Verification Queue from Core Operations in the sidebar.
2. Select the queue tab corresponding to your review focus (e.g., 'Startup Entities').
3. Click on the first row with an impending SLA breach (indicated by amber/red clock pill).
4. Review the attached document preview and automated OCR matching score.
5. Click 'Quick Approve' if all criteria are satisfied, or click 'Inspect Document' for deep multi-page review.

**Cross-Navigation & Related Pages:** `/admin/verifications/startup/ver_st_01`, `/admin/verifications/expiring`, `/admin/organizations`, `/admin/users`

> [!NOTE] **Operational Limitations & Implementation Stubs:**  
> Automated OCR extraction provides initial confidence scores; manual administrative sign-off is mandatory for all DPIIT corporate certifications.

---

#### <a id='page-8-verification-dossier-document-inspection'></a>8. Verification Dossier & Document Inspection
**URL:** `/admin/verifications/[type]/[id]`  
**Module:** Verification & DPIIT Accreditation  
**Operational Verification Status:** Verified Active (HTTP 200)

![Verification Dossier & Document Inspection UI Interface](screenshots/06-verification-detail.png)
*Figure 8: Live Interface of Verification Dossier & Document Inspection (`/admin/verifications/[type]/[id]`)*

**Purpose & Business Objective:**  
Delivers an immersive, dual-pane document inspection workbench allowing examiners to cross-reference submitted legal documents against government registries side by side.

**Primary Administrative Tasks:**
- Performing high-resolution visual inspection of Certificates of Incorporation, DPIIT certificates, and PAN cards.
- Cross-referencing OCR-extracted text against claimed entity registration data.
- Viewing automated anti-tamper, metadata, and image manipulation forensics.
- Issuing formal verification approvals, rejections, or document deficiency notices.

**Main UI Features & Data Components:**
- Split Workbench Layout: High-res interactive PDF/Image viewer on the left; structured claim data and inspection checklist on the right.
- Document Forensics Panel: Shows file metadata, creation date, editing software signatures, and OCR text overlay.
- Registry Validation Widget: Displays live or cached MCA/DPIIT lookup status, matching legal names and CIN.
- Mandatory Checklist Items: Checkboxes for Entity Name Match, CIN Active Status, Authorized Signatory Match, and Expiry Date Check.
- Decision Action Bar: High-contrast buttons for 'Approve & Issue Badge', 'Request Re-upload', and 'Reject with Prejudice'.

**Available Actions & UI Controls:**
| Control Name | UI Type | Operational Effect |
|:---|:---|:---|
| **PDF Viewer Controls** | Interactive Control | Zoom in/out, fit-to-width, rotate 90°, and download original high-res copy. |
| **Checklist Toggles** | Interactive Control | Must check all mandatory validation boxes before approval button unlocks. |
| **Approve Verification (Button)** | Interactive Control | Finalizes verification, unlocks verified badge, and logs audit record. |
| **Request Correction (Modal Trigger)** | Interactive Control | Dispatches detailed feedback to user with upload link. |
| **Reject (Modal Trigger)** | Interactive Control | Permanently rejects submission and flags account for potential fraud. |

**Step-by-Step Usage Instructions:**
1. Open a verification dossier from the main queue.
2. Zoom in on the document viewer to inspect seal, digital signature, and certificate authenticity.
3. Compare the legal name, CIN, and date on the certificate with the platform record displayed on the right.
4. Complete the mandatory inspection checklist items.
5. Click 'Approve & Issue Badge' to conclude the review and notify the applicant.

**Cross-Navigation & Related Pages:** `/admin/verifications`, `/admin/organizations/org_01`, `/admin/audit`

> [!NOTE] **Operational Limitations & Implementation Stubs:**  
> Digital signature verification checks standard X.509 Adobe PKI signatures; DSC USB dongle validation requires external cryptographic middleware.

---

#### <a id='page-9-expiring-verifications-recertification'></a>9. Expiring Verifications & Recertification
**URL:** `/admin/verifications/expiring`  
**Module:** Verification & DPIIT Accreditation  
**Operational Verification Status:** Verified Active (HTTP 200)

![Expiring Verifications & Recertification UI Interface](screenshots/07-verifications-expiring.png)
*Figure 9: Live Interface of Expiring Verifications & Recertification (`/admin/verifications/expiring`)*

**Purpose & Business Objective:**  
Tracks recurring credentials, annual compliance renewals, and expiring DPIIT recognitions to ensure platform directory integrity.

**Primary Administrative Tasks:**
- Monitoring startup DPIIT certificates nearing their statutory 10-year expiration or turnover thresholds.
- Tracking annual GSTIN active status confirmations and corporate filings.
- Dispatching automated recertification reminders to founders and organizations.
- Grace-period management and automatic badge revocation for non-renewed entities.

**Main UI Features & Data Components:**
- Expiration Horizon Buckets: Tabs for Expiring in 30 Days, 60 Days, 90 Days, and Already Expired.
- Expiring Roster Table: Organization Name, Certificate Type, Original Verification Date, Expiry Date, Days Remaining, and Grace Period Status.
- Automated Reminder Cadence Monitor: Shows timestamps of dispatched email and SMS notifications.
- Bulk Reminder Dispatcher: Allows one-click broadcast of renewal notifications to all organizations in the selected cohort.

**Available Actions & UI Controls:**
| Control Name | UI Type | Operational Effect |
|:---|:---|:---|
| **Send Renewal Reminder (Button)** | Interactive Control | Sends prioritized email and dashboard alert to organization owner. |
| **Extend Grace Period (Modal Trigger)** | Interactive Control | Grants 15, 30, or 45-day extension upon receipt of pending MCA proof. |
| **Revoke Verification Badge (Button)** | Interactive Control | Immediately downgrades account badge to unverified status. |
| **Export Expiry Schedule (Button)** | Interactive Control | Downloads upcoming expiration timeline as CSV. |

**Step-by-Step Usage Instructions:**
1. Navigate to 'Expiring Verifications' via the top tab on the Verifications page.
2. Review the 'Expiring in 30 Days' tab to identify organizations requiring immediate action.
3. Check the communication log to see if previous automated reminders were delivered.
4. If a founder requested more time, click 'Extend Grace Period' and log the reason.
5. For entities that fail to provide renewed documents post-deadline, click 'Revoke Badge'.

**Cross-Navigation & Related Pages:** `/admin/verifications`, `/admin/organizations`, `/admin/audit`

> [!NOTE] **Operational Limitations & Implementation Stubs:**  
> Grace period extensions are capped at a maximum cumulative total of 90 days per statutory guidelines.

---

### Module 4: Trust, Safety & Risk Governance
*Content moderation pipelines, behavioral strike enforcement, escrow dispute resolution, automated fraud detection, and AI quality oversight.*

#### <a id='page-10-content-behavior-moderation-queue'></a>10. Content & Behavior Moderation Queue
**URL:** `/admin/moderation`  
**Module:** Trust, Safety & Risk Governance  
**Operational Verification Status:** Verified Active (HTTP 200)

![Content & Behavior Moderation Queue UI Interface](screenshots/08-moderation.png)
*Figure 10: Live Interface of Content & Behavior Moderation Queue (`/admin/moderation`)*

**Purpose & Business Objective:**  
Acts as the operational center for triaging flagged job descriptions, user bios, message transcripts, and portfolio content that violate platform trust standards.

**Primary Administrative Tasks:**
- Reviewing automated AI-flagged content (hate speech, fraudulent job offers, phishing links, PII leakage).
- Evaluating user-reported content escalated by candidates or employers.
- Enforcing content removals, user warnings, temporary mutes, and permanent platform bans.
- Maintaining platform communication hygiene and safe marketplace standards.

**Main UI Features & Data Components:**
- Severity Triage Matrix: Filter by Critical (immediate danger/fraud), High (blatant policy breach), Medium, and Low.
- Moderation Incidents Table: Incident ID, Content Type (Job Post, User Bio, Direct Message), Reported By, Flag Reason, AI Confidence Score, and Age.
- Quick Diff & Snippet Preview: Highlights offending text strings in high-visibility red highlight with regex/AI tag.
- Moderator Action Bar: Quick Approve Content, Remove Content, Issue Strike to Author, or Escalate to Legal.

**Available Actions & UI Controls:**
| Control Name | UI Type | Operational Effect |
|:---|:---|:---|
| **Severity Filter Tabs** | Interactive Control | Toggles queue between All, Critical, High, Medium, and Low. |
| **Open Incident Dossier (Button)** | Interactive Control | Opens comprehensive case file (/admin/moderation/[id]). |
| **Dismiss Flag (Button)** | Interactive Control | Determines content is benign, dismisses alert, and restores full visibility. |
| **Remove & Warn (Button)** | Interactive Control | Removes violating content and logs an official strike against author. |
| **Emergency Suspend User (Button)** | Interactive Control | Immediately disables user login and hides all associated postings. |

**Step-by-Step Usage Instructions:**
1. Access 'Moderation' from the Governance & Risk sidebar section.
2. Filter by 'Critical' or 'High' severity to handle immediate safety risks first.
3. Review the highlighted offending snippet and AI policy classification.
4. If the incident is complex or involves multiple parties, click 'Open Incident Dossier'.
5. Choose the appropriate enforcement action: Dismiss, Remove, or Suspend, providing mandatory internal rationale.

**Cross-Navigation & Related Pages:** `/admin/moderation/MOD-2026-0891`, `/admin/reports`, `/admin/appeals`, `/admin/policies`

> [!NOTE] **Operational Limitations & Implementation Stubs:**  
> Direct message transcript inspection is restricted to messages explicitly reported by a conversation participant in compliance with DPDP privacy guidelines.

---

#### <a id='page-11-moderation-incident-case-file'></a>11. Moderation Incident Case File
**URL:** `/admin/moderation/[id]`  
**Module:** Trust, Safety & Risk Governance  
**Operational Verification Status:** Verified Active (HTTP 200)

![Moderation Incident Case File UI Interface](screenshots/09-moderation-detail.png)
*Figure 11: Live Interface of Moderation Incident Case File (`/admin/moderation/[id]`)*

**Purpose & Business Objective:**  
Provides a comprehensive evidentiary case file for a specific content violation, including historical strike records, author profile context, and conversation logs.

**Primary Administrative Tasks:**
- Investigating multi-party harassment or contract violation incidents.
- Reviewing author violation history, previous warnings, and account longevity.
- Evaluating full context around flagged job posts or portfolio assets.
- Formulating customized sanction notices and logging immutable audit proofs.

**Main UI Features & Data Components:**
- Case Header: Incident ID (e.g., MOD-2026-0891), Timestamp, Assigned Moderator, Priority Badge, and Status.
- Offending Content Deep Dive: Full unaltered text with highlighted flagged tokens, matched rule names, and AI confidence telemetry.
- Author Risk Dossier: Account creation date, verification standing, previous strikes count, and active job/contract volume.
- Reporter Testimony: User statement, category selection, and optional attached screenshot proofs.
- Administrative Action Console: Radio buttons for Sanction Level (Warning, 7-Day Mute, 30-Day Suspension, Permanent Ban), with custom message builder.

**Available Actions & UI Controls:**
| Control Name | UI Type | Operational Effect |
|:---|:---|:---|
| **Sanction Selector** | Interactive Control | Selects penalty tier: No Action, Formal Warning, Content Takedown, Temporary Suspension, Permanent Ban. |
| **Notification Template Dropdown** | Interactive Control | Selects standard legal notification template to send to the offending user. |
| **Submit Final Resolution (Button)** | Interactive Control | Executes sanction, removes content, updates database, and notifies parties. |
| **Escalate to Legal Council (Button)** | Interactive Control | Marks case as privileged and reassigns to platform legal officers. |

**Step-by-Step Usage Instructions:**
1. Open an incident from the Moderation Queue.
2. Read the full context of the flagged content and review reporter evidence.
3. Inspect the author's previous strike history in the right-hand panel.
4. Select the sanction level that matches platform policy guidelines for the offense.
5. Input custom administrative rationale and click 'Submit Final Resolution'.

**Cross-Navigation & Related Pages:** `/admin/moderation`, `/admin/users/usr_01`, `/admin/policies`, `/admin/audit`

> [!NOTE] **Operational Limitations & Implementation Stubs:**  
> Permanent ban actions trigger an automated lockout across all verified phone numbers and PAN hashes linked to the individual.

---

#### <a id='page-12-user-reports-violation-submissions'></a>12. User Reports & Violation Submissions
**URL:** `/admin/reports`  
**Module:** Trust, Safety & Risk Governance  
**Operational Verification Status:** Verified Active (HTTP 200)

![User Reports & Violation Submissions UI Interface](screenshots/10-reports.png)
*Figure 12: Live Interface of User Reports & Violation Submissions (`/admin/reports`)*

**Purpose & Business Objective:**  
Consolidates all direct user-submitted complaints regarding job scams, abusive behavior, impersonation, or intellectual property infringements.

**Primary Administrative Tasks:**
- Triage and intake of user reports submitted via candidate and employer apps.
- Detecting emerging scam patterns, phantom job postings, and credential harvesting.
- Assigning investigative ownership to specific trust and safety specialists.
- Tracking report resolution metrics and reporter feedback loops.

**Main UI Features & Data Components:**
- Category Filter Pills: Scam/Fraud, Inappropriate Content, Harassment, Fake Profile, IP Infringement, and Spam.
- Reports Table: Report ID, Target Entity, Reporter User, Category, Attached Evidence Count, Status, and Timestamp.
- Reporter Credibility Index: Shows reporter's historical accuracy score to prioritize high-trust whistleblowers.
- Batch Assignment Dropdown: Reassigns batches of reports to specialized investigation squads.

**Available Actions & UI Controls:**
| Control Name | UI Type | Operational Effect |
|:---|:---|:---|
| **Category Filter** | Interactive Control | Filters reports by primary grievance category. |
| **Assign to Me (Button)** | Interactive Control | Claims case ownership and locks ticket for other moderators. |
| **Create Moderation Incident (Button)** | Interactive Control | Converts verified report into an actionable moderation case. |
| **Close as Inconclusive (Button)** | Interactive Control | Dismisses report with automated notice to reporter. |

**Step-by-Step Usage Instructions:**
1. Access 'Reports' under Governance & Risk.
2. Filter by category (e.g., 'Scam/Fraud') to review critical marketplace integrity threats.
3. Open the report details to inspect attached screenshots and chat logs submitted by the user.
4. If credible violation evidence exists, click 'Create Moderation Incident' to initiate formal enforcement.
5. Otherwise, close the report with an appropriate explanatory note.

**Cross-Navigation & Related Pages:** `/admin/moderation`, `/admin/disputes`, `/admin/fraud`

> [!NOTE] **Operational Limitations & Implementation Stubs:**  
> Users who submit three consecutive false/malicious reports are automatically flagged for abuse of the reporting system.

---

#### <a id='page-13-moderation-appeals-reinstatement-queue'></a>13. Moderation Appeals & Reinstatement Queue
**URL:** `/admin/appeals`  
**Module:** Trust, Safety & Risk Governance  
**Operational Verification Status:** Verified Active (HTTP 200)

![Moderation Appeals & Reinstatement Queue UI Interface](screenshots/11-appeals.png)
*Figure 13: Live Interface of Moderation Appeals & Reinstatement Queue (`/admin/appeals`)*

**Purpose & Business Objective:**  
Provides procedural due process for users and organizations appealing against content removals, profile strikes, or temporary suspensions.

**Primary Administrative Tasks:**
- Reviewing written user appeals and counter-evidence against administrative sanctions.
- Evaluating potential false positives generated by automated AI moderation filters.
- Reinstating wrongfully suspended accounts and clearing strikes from user dossiers.
- Maintaining transparency and statutory procedural fairness under Indian digital intermediary guidelines.

**Main UI Features & Data Components:**
- Appeals Status Filters: Pending Review, Under Senior Inspection, Overturned (Reinstated), and Upheld (Denied).
- Appeals Table: Appeal ID, Original Incident ID, User Name, Penalty Appealed, Submission Date, and Assigned Reviewer.
- Split Comparison View: Shows original violation evidence side by side with the user's rebuttal and attached documents.
- Strike Removal Action Control: One-click mechanism to overturn sanction, restore content, and issue an apology notice.

**Available Actions & UI Controls:**
| Control Name | UI Type | Operational Effect |
|:---|:---|:---|
| **Review Appeal (Button)** | Interactive Control | Opens the dual-pane appeal adjudication workbench. |
| **Overturn Penalty & Reinstate (Button)** | Interactive Control | Reverses strike, reactivates account/content, and updates trust score. |
| **Uphold Penalty (Button)** | Interactive Control | Confirms sanction; dispatches final written decision to appellant. |
| **Escalate to Trust Lead (Button)** | Interactive Control | Refers appeal to Senior Operations Director for final determination. |

**Step-by-Step Usage Instructions:**
1. Open the Appeals Queue from the Governance & Risk sidebar.
2. Review the pending appeals, prioritizing account suspension cases.
3. Read the user's written appeal and examine any uploaded counter-evidence (e.g., proof of IP ownership).
4. Cross-reference against the original moderation incident case notes.
5. Select 'Overturn' if the penalty was unwarranted, or 'Uphold' if the policy violation stands.

**Cross-Navigation & Related Pages:** `/admin/moderation`, `/admin/users`, `/admin/audit`

> [!NOTE] **Operational Limitations & Implementation Stubs:**  
> Users are permitted a maximum of one formal appeal per moderation incident; rejected appeals are final unless mandated by court order.

---

#### <a id='page-14-milestone-escrow-dispute-resolution'></a>14. Milestone & Escrow Dispute Resolution
**URL:** `/admin/disputes`  
**Module:** Trust, Safety & Risk Governance  
**Operational Verification Status:** Verified Active (HTTP 200)

![Milestone & Escrow Dispute Resolution UI Interface](screenshots/12-disputes.png)
*Figure 14: Live Interface of Milestone & Escrow Dispute Resolution (`/admin/disputes`)*

**Purpose & Business Objective:**  
Serves as the arbitration tribunal and escrow adjudication workbench for financial contract disputes between startup employers and freelance talent.

**Primary Administrative Tasks:**
- Arbitrating contested milestone deliverables, incomplete work claims, or non-payment disputes.
- Inspecting contract terms, agreed milestone deliverables, and submitted code/deliverable repositories.
- Executing binding escrow disbursements: full refund to employer, full release to candidate, or split settlement.
- Preventing payment defaults and maintaining financial marketplace trust.

**Main UI Features & Data Components:**
- Disputed Escrow Capital Counter: Total INR funds currently locked in contested escrow status.
- Disputes Data Table: Dispute ID, Contract Title, Employer, Talent, Disputed Amount, Days Open, and Stage (Mediation, Formal Arbitration, Resolved).
- Deliverables & Communications Ledger: Chronological review of milestone submissions, revisions requested, and chat negotiations.
- Escrow Settlement Split Slider: Interactive slider allowing arbitrated fund division (e.g., 60% Talent / 40% Employer).
- Binding Decision Generator: Generates formal arbitration award document with legal justification.

**Available Actions & UI Controls:**
| Control Name | UI Type | Operational Effect |
|:---|:---|:---|
| **Inspect Contract Details (Button)** | Interactive Control | Opens contract terms, scope of work, and milestone schedule. |
| **Release 100% to Talent (Button)** | Interactive Control | Disburses full escrow funds to the worker's wallet/bank. |
| **Refund 100% to Employer (Button)** | Interactive Control | Returns full escrow funds to the employer's source payment method. |
| **Execute Split Settlement (Button)** | Interactive Control | Disburses custom percentage split between both parties. |
| **Request Third-Party Technical Audit (Button)** | Interactive Control | Assigns external code reviewer to assess deliverable quality. |

**Step-by-Step Usage Instructions:**
1. Navigate to Disputes under Governance & Risk.
2. Select a dispute case to review the locked escrow amount and contract timeline.
3. Inspect the submitted deliverable (code repository, designs, documents) against the initial scope of work.
4. Review the back-and-forth chat history between employer and talent to determine fault or bad faith.
5. Choose the appropriate financial settlement (Full Release, Full Refund, or Split) and submit with formal arbitration notes.

**Cross-Navigation & Related Pages:** `/admin/payouts`, `/admin/billing`, `/admin/audit`

> [!NOTE] **Operational Limitations & Implementation Stubs:**  
> Escrow releases exceeding INR 5,00,000 require secondary approval from the Senior Finance Administrator before bank disbursement.

---

#### <a id='page-15-fraud-detection-risk-analysis'></a>15. Fraud Detection & Risk Analysis
**URL:** `/admin/fraud`  
**Module:** Trust, Safety & Risk Governance  
**Operational Verification Status:** Verified Active (HTTP 200)

![Fraud Detection & Risk Analysis UI Interface](screenshots/13-fraud.png)
*Figure 15: Live Interface of Fraud Detection & Risk Analysis (`/admin/fraud`)*

**Purpose & Business Objective:**  
Monitors automated fraud telemetry, payment risk anomalies, suspicious login clusters, and coordinated bot activity across the ecosystem.

**Primary Administrative Tasks:**
- Detecting high-velocity card testing, chargeback anomalies, and payment fraud.
- Identifying sybil identity clusters sharing identical bank accounts, PAN numbers, or IP subnets.
- Reviewing automated machine-learning risk scores on transactions and new registrations.
- Freezing compromised wallets and adding malicious entities to global platform blocklists.

**Main UI Features & Data Components:**
- Fraud Risk KPI Cards: Active High-Risk Entities, Suspicious Volume (INR), Blocked Attempts (Past 24h), and Chargeback Rate (%).
- Risk Event Stream: Real-time telemetry feed of high-risk triggers (e.g., 'Same PAN used on 4 distinct accounts').
- Entity Risk Graph: Visual association map connecting shared IPs, devices, and bank accounts between suspect users.
- Rapid Defense Actions: One-click wallet freeze, payout hold, and account termination mechanisms.

**Available Actions & UI Controls:**
| Control Name | UI Type | Operational Effect |
|:---|:---|:---|
| **Freeze Wallet & Payouts (Button)** | Interactive Control | Immediately locks funds and prevents withdrawal requests. |
| **Block IP / Device Fingerprint (Button)** | Interactive Control | Adds hardware/network hash to platform edge firewall blocklist. |
| **Mark as Whitelist / False Positive (Button)** | Interactive Control | Lowers risk score and clears alert for legitimate verified users. |
| **Export Fraud Dossier (Button)** | Interactive Control | Exports packaged forensic PDF for cybercrime or banking partner reporting. |

**Step-by-Step Usage Instructions:**
1. Navigate to Fraud under Governance & Risk.
2. Examine the risk score distribution and select high-priority alerts with risk score >85.
3. Inspect the entity association graph to identify multi-account rings or shared banking details.
4. If suspicious money laundering or fraudulent billing is detected, click 'Freeze Wallet & Payouts'.
5. Submit incident summary and file appropriate SAR (Suspicious Activity Report) documentation.

**Cross-Navigation & Related Pages:** `/admin/payouts`, `/admin/users`, `/admin/policies`, `/admin/audit`

> [!NOTE] **Operational Limitations & Implementation Stubs:**  
> Machine learning risk scoring updates every 15 minutes; critical payment gateway alerts stream via real-time WebSocket connection.

---

#### <a id='page-16-automated-trust-policies-guardrails'></a>16. Automated Trust Policies & Guardrails
**URL:** `/admin/policies`  
**Module:** Trust, Safety & Risk Governance  
**Operational Verification Status:** Verified Active (HTTP 200)

![Automated Trust Policies & Guardrails UI Interface](screenshots/14-policies.png)
*Figure 16: Live Interface of Automated Trust Policies & Guardrails (`/admin/policies`)*

**Purpose & Business Objective:**  
Configures automated platform safety rules, regex filters, keyword blocklists, rate limits, and zero-tolerance policy triggers.

**Primary Administrative Tasks:**
- Managing active policy rules for content screening and behavioral monitoring.
- Updating platform dictionaries of prohibited terms, slurs, and PII patterns (Aadhaar/PAN regex).
- Configuring automated action thresholds (e.g., auto-hide job post if >5 user flags received).
- Testing rules in a real-time sandbox before deploying to production.

**Main UI Features & Data Components:**
- Policy Rules Catalog: Active rules covering Scam Detection, Contact Info Leakage, Harassment, and Impersonation.
- Tabbed Policy Engine: Tabs for Policy Rules, Automatic Checks, Blocklists & Dictionaries, and Rule Test Sandbox.
- Rule Configuration Drawer: Modal allowing rule tuning: sensitivity slider, trigger regex, target roles, and automated consequence.
- Interactive Rule Test Sandbox: Input test text to verify regex matches and rule firing before activation.

**Available Actions & UI Controls:**
| Control Name | UI Type | Operational Effect |
|:---|:---|:---|
| **Create Policy Rule (Button)** | Interactive Control | Opens rule authoring modal to define new guardrails. |
| **Rule Toggle Switch** | Interactive Control | Instantly enables or disables a policy rule in the live engine. |
| **Edit Rule (Button)** | Interactive Control | Modifies regex patterns, action triggers, or severity level. |
| **Test in Sandbox (Button)** | Interactive Control | Evaluates candidate rules against historical sample datasets. |

**Step-by-Step Usage Instructions:**
1. Access 'Policies' from the Governance & Risk sidebar menu.
2. Review existing rules and their 30-day trigger statistics.
3. To update prohibited keywords, switch to the 'Blocklists & Dictionaries' tab and edit the target list.
4. Use the 'Rule Test Sandbox' tab to paste sample text and confirm accurate pattern matching.
5. Enable the rule toggle to deploy changes across all ingestion pipelines.

**Cross-Navigation & Related Pages:** `/admin/moderation`, `/admin/ai-quality`, `/admin/config`

> [!NOTE] **Operational Limitations & Implementation Stubs:**  
> Policy rule changes propagate to edge worker caches within 60 seconds of activation.

---

#### <a id='page-17-ai-quality-control-human-review'></a>17. AI Quality Control & Human Review
**URL:** `/admin/ai-quality`  
**Module:** Trust, Safety & Risk Governance  
**Operational Verification Status:** Verified Active (HTTP 200)

![AI Quality Control & Human Review UI Interface](screenshots/15-ai-quality.png)
*Figure 17: Live Interface of AI Quality Control & Human Review (`/admin/ai-quality`)*

**Purpose & Business Objective:**  
Supervises platform AI models (Gemini, matching engines, resume parsers) through human-in-the-loop validation, bias monitoring, and prompt versioning.

**Primary Administrative Tasks:**
- Reviewing model generation quality for automated job descriptions and candidate match summaries.
- Auditing candidate matching scores to detect demographic, gender, or institutional bias.
- Rating model outputs (1-5 stars) to build fine-tuning datasets for future model iterations.
- Managing active prompt templates and model version bindings.

**Main UI Features & Data Components:**
- Model Performance Telemetry: Average Acceptance Rate (%), Hallucination Flag Count, and Latency Metrics.
- Tabbed Quality Engine: Tabs for Human Review Queue, Bias & Drift Monitoring, and Model & Prompt Registry.
- Review Queue Table: Evaluation ID, Task Type (Match Rationale, Resume Parse, JD Generation), Model Used, Confidence Score, and Status.
- Quality Rating Console: Direct thumbs-up / thumbs-down and 5-star rubric scoring for administrators.

**Available Actions & UI Controls:**
| Control Name | UI Type | Operational Effect |
|:---|:---|:---|
| **Inspect Generation (Button)** | Interactive Control | Opens detailed evaluation dossier (/admin/ai-quality/reviews/[id]). |
| **Approve Generation (Button)** | Interactive Control | Validates model response as high-quality training exemplar. |
| **Flag Hallucination / Bias (Button)** | Interactive Control | Marks response for model retraining and prompts prompt engineering team. |
| **Switch Active Model Version** | Interactive Control | Updates production model binding between Gemini-Flash and Gemini-Pro. |

**Step-by-Step Usage Instructions:**
1. Open 'AI Quality' from Governance & Risk.
2. Inspect the Human Review Queue for low-confidence (<75%) model outputs.
3. Click 'Inspect Generation' to review the user prompt, input context, and generated output.
4. Score the output on accuracy, tone, and safety using the star rating widget.
5. If bias or hallucination is observed, click 'Flag for Retraining' and select the defect category.

**Cross-Navigation & Related Pages:** `/admin/ai-quality/reviews/REV-2026-081`, `/admin/matching`, `/admin/policies`

> [!NOTE] **Operational Limitations & Implementation Stubs:**  
> Human review queue samples a configurable 2% random baseline of all platform AI generations to maintain statistical quality bounds.

---

#### <a id='page-18-ai-evaluation-dossier-model-feedback'></a>18. AI Evaluation Dossier & Model Feedback
**URL:** `/admin/ai-quality/reviews/[id]`  
**Module:** Trust, Safety & Risk Governance  
**Operational Verification Status:** Verified Active (HTTP 200)

![AI Evaluation Dossier & Model Feedback UI Interface](screenshots/16-ai-review-detail.png)
*Figure 18: Live Interface of AI Evaluation Dossier & Model Feedback (`/admin/ai-quality/reviews/[id]`)*

**Purpose & Business Objective:**  
Provides a comprehensive inspection environment for deep analysis of an individual model inference event, prompt tokens, and safety scores.

**Primary Administrative Tasks:**
- Inspecting exact system prompts, few-shot examples, and user context delivered to the LLM.
- Analyzing token usage, latency (ms), temperature, and safety threshold telemetry.
- Comparing model output with human ground-truth corrections.
- Adding annotated feedback directly into the model reinforcement learning dataset.

**Main UI Features & Data Components:**
- Inference Metadata Header: Review ID (REV-2026-081), Model Endpoint (e.g., Gemini-1.5-Pro), Latency (480ms), and Total Tokens.
- System & User Prompt Box: Syntax-highlighted view of injected prompt instructions and dynamic profile context.
- Generated Output Comparison: Side-by-side view of raw LLM output vs. user-edited final version.
- Safety Category Ratings: Radar score displaying Harassment, Hate Speech, PII, and Commercial Deception confidence levels.
- Ground Truth Correction Editor: Allows admin to input the ideal response for direct export into fine-tuning archives.

**Available Actions & UI Controls:**
| Control Name | UI Type | Operational Effect |
|:---|:---|:---|
| **Save Ground Truth Correction (Button)** | Interactive Control | Saves manual correction to training corpus. |
| **Submit Star Rating (Widget)** | Interactive Control | Records 1-5 quality assessment across accuracy, relevance, and formatting. |
| **Export Inference Trace (JSON)** | Interactive Control | Downloads full OpenTelemetry trace file for debugging. |

**Step-by-Step Usage Instructions:**
1. Access the review file from the AI Quality queue.
2. Examine the input prompt and system instructions to verify appropriate context injection.
3. Compare the generated completion with the user's ultimate edits to see where the model underperformed.
4. Input the ideal ground truth response in the correction box.
5. Submit the rating to sync telemetry with the model engineering pipeline.

**Cross-Navigation & Related Pages:** `/admin/ai-quality`, `/admin/matching`, `/admin/system`

> [!NOTE] **Operational Limitations & Implementation Stubs:**  
> Trace telemetry is retained in active storage for 90 days before rolling into cold S3 compliance archives.

---

### Module 5: Support & Customer Experience
*Omnichannel customer support helpdesk, SLA tracking, priority routing, and multi-tier support ticket resolution.*

#### <a id='page-19-customer-support-desk-ticket-queue'></a>19. Customer Support Desk & Ticket Queue
**URL:** `/admin/support`  
**Module:** Support & Customer Experience  
**Operational Verification Status:** Verified Active (HTTP 200)

![Customer Support Desk & Ticket Queue UI Interface](screenshots/17-support.png)
*Figure 19: Live Interface of Customer Support Desk & Ticket Queue (`/admin/support`)*

**Purpose & Business Objective:**  
Central helpdesk management console for processing customer support requests, billing queries, technical issues, and platform onboarding assistance.

**Primary Administrative Tasks:**
- Triaging incoming support tickets across email, chat, and in-app contact forms.
- Monitoring SLA response times and resolution targets across tier levels.
- Assigning tickets to specialized technical or billing support agents.
- Executing bulk ticket status updates and priority escalations.

**Main UI Features & Data Components:**
- Support Metrics Ribbon: Open Tickets, Awaiting Response, SLA Breaches, and CSAT Score (%).
- Ticket Queue Table: Ticket ID, Subject, Submitter Role (Jobseeker, Founder, Investor), Priority (Urgent, High, Normal, Low), Status, and Assignee.
- Filter & View Bar: Filter by My Tickets, Unassigned, Priority, SLA Status, and Category.
- Quick Ticket Drawer: Review ticket history, contact details, and internal notes without leaving the queue.

**Available Actions & UI Controls:**
| Control Name | UI Type | Operational Effect |
|:---|:---|:---|
| **Open Ticket File (Link/Button)** | Interactive Control | Navigates to full ticket workspace (/admin/support/[id]). |
| **Assign to Specialist (Dropdown)** | Interactive Control | Assigns ticket to designated support staff member. |
| **Change Priority Dropdown** | Interactive Control | Escalates ticket to Urgent or High based on impact. |
| **Bulk Close (Button)** | Interactive Control | Closes resolved or duplicate tickets in bulk. |

**Step-by-Step Usage Instructions:**
1. Navigate to 'Support' in the Administration sidebar category.
2. Review the top ribbon to monitor pending SLA deadlines.
3. Filter for 'Unassigned' tickets and assign urgent items to available team members.
4. Click on a ticket subject or ID to enter the full communication thread.
5. After resolution, ensure ticket status is updated to 'Resolved' and CSAT survey is triggered.

**Cross-Navigation & Related Pages:** `/admin/support/TCK-2026-00412`, `/admin/users`, `/admin/billing`

> [!NOTE] **Operational Limitations & Implementation Stubs:**  
> Automated ticket triage routes billing queries directly to finance-qualified staff based on keyword heuristics.

---

#### <a id='page-20-support-ticket-incident-file'></a>20. Support Ticket Incident File
**URL:** `/admin/support/[id]`  
**Module:** Support & Customer Experience  
**Operational Verification Status:** Verified Active (HTTP 200)

![Support Ticket Incident File UI Interface](screenshots/18-support-detail.png)
*Figure 20: Live Interface of Support Ticket Incident File (`/admin/support/[id]`)*

**Purpose & Business Objective:**  
Comprehensive two-way communication console and troubleshooting workspace for resolving individual customer support inquiries.

**Primary Administrative Tasks:**
- Communicating directly with users via rich-text email replies with attachments.
- Collaborating with team members using internal private notes.
- Viewing submitter profile snapshot, active subscriptions, and recent error logs.
- Executing one-click quick actions (e.g., resend verification email, clear session, refund invoice).

**Main UI Features & Data Components:**
- Ticket Header: Ticket ID (TCK-2026-00412), Subject, Current Status, Priority, and Submitter Details.
- Conversation Thread: Chronological timeline of user messages, admin responses, system notices, and private internal notes.
- Rich Reply Composer: Supports formatting, attachment uploads, canned response snippets, and CC recipients.
- User Context Sidebar: Live snapshot of user's active plan, account balance, verification standing, and recent transactions.
- Canned Response Picker: Dropdown of approved response macros for rapid resolution of common queries.

**Available Actions & UI Controls:**
| Control Name | UI Type | Operational Effect |
|:---|:---|:---|
| **Send Reply (Button)** | Interactive Control | Dispatches formatted response to user's registered email. |
| **Add Private Note (Button)** | Interactive Control | Logs internal comment visible only to platform staff. |
| **Insert Canned Response (Dropdown)** | Interactive Control | Populates composer with standardized template. |
| **Mark as Resolved (Button)** | Interactive Control | Changes status to Resolved and triggers satisfaction survey. |

**Step-by-Step Usage Instructions:**
1. Open the target ticket from the Support Queue.
2. Review the user's initial inquiry and examine the User Context sidebar for account standing.
3. Select a canned response or draft a personalized response in the composer.
4. Add an internal private note if cross-departmental coordination was involved.
5. Click 'Send Reply' and update the ticket status to 'Awaiting User Response' or 'Resolved'.

**Cross-Navigation & Related Pages:** `/admin/support`, `/admin/users/usr_01`, `/admin/billing`

> [!NOTE] **Operational Limitations & Implementation Stubs:**  
> Outbound email delivery is routed via platform transactional email servers; replies to closed tickets automatically spawn a linked follow-up ticket.

---

### Module 6: Financial Operations & Subscriptions
*Revenue reconciliation, subscription tier management, disbursement batches, TDS withholding compliance, and payment gateway health.*

#### <a id='page-21-billing-overview-revenue-telemetry'></a>21. Billing Overview & Revenue Telemetry
**URL:** `/admin/billing`  
**Module:** Financial Operations & Subscriptions  
**Operational Verification Status:** Verified Active (HTTP 200)

![Billing Overview & Revenue Telemetry UI Interface](screenshots/19-billing.png)
*Figure 21: Live Interface of Billing Overview & Revenue Telemetry (`/admin/billing`)*

**Purpose & Business Objective:**  
Consolidated financial telemetry dashboard tracking platform revenue streams, recurring subscriptions, transaction fee margins, and payment gateway health.

**Primary Administrative Tasks:**
- Monitoring Gross Transaction Value (GTV), Net Platform Revenue, and Churn Rate.
- Auditing recent invoice issuances, GST receipts, and payment gateway transaction statuses.
- Analyzing payment gateway settlement pipelines and pending balances.
- Exporting formal financial reconciliation ledgers for accounting teams.

**Main UI Features & Data Components:**
- Financial Summary Cards: Total GTV, Net Platform Revenue, Active Paid Subscriptions, and Failed Payment Count.
- Revenue Trend Visualization: Multi-month comparison of subscription revenue vs. escrow marketplace commissions.
- Recent Transactions Ledger: Invoice ID, Customer Name, Amount (INR), GST Portion, Payment Method, Status (Paid, Pending, Failed), and Date.
- Payment Gateway Health Monitor: Live uptime, success rate percentage, and latency for Razorpay and Cashfree bridges.

**Available Actions & UI Controls:**
| Control Name | UI Type | Operational Effect |
|:---|:---|:---|
| **Date Range Filter** | Interactive Control | Filters financial metrics across current month, quarterly, or annual periods. |
| **Download Reconciliation Ledger (CSV)** | Interactive Control | Generates complete accounting ledger with GST breakdowns. |
| **Retry Failed Invoices (Button)** | Interactive Control | Attempts automated re-billing of dunning credit cards. |
| **Navigate to Plans (Button)** | Interactive Control | Opens subscription plan catalog (/admin/plans). |
| **Navigate to Payouts (Button)** | Interactive Control | Opens disbursement operations (/admin/payouts). |

**Step-by-Step Usage Instructions:**
1. Open 'Billing' from the Financial Engine sidebar category.
2. Review the headline financial cards to ensure revenue run-rate matches monthly targets.
3. Check the Failed Payment counter and inspect recent transaction rows with 'Failed' status.
4. Click 'Download Reconciliation Ledger' at month-end to provide CA-audited reports to finance.
5. Use quick buttons to jump to Plan Management or Payout Operations as needed.

**Cross-Navigation & Related Pages:** `/admin/plans`, `/admin/payouts`, `/admin/analytics`, `/admin/audit`

> [!NOTE] **Operational Limitations & Implementation Stubs:**  
> GST tax invoice calculation automatically segregates CGST/SGST (intra-state) vs. IGST (inter-state) based on organization GSTIN prefix.

---

#### <a id='page-22-subscription-plan-entitlement-catalog'></a>22. Subscription Plan & Entitlement Catalog
**URL:** `/admin/plans`  
**Module:** Financial Operations & Subscriptions  
**Operational Verification Status:** Verified Active (HTTP 200)

![Subscription Plan & Entitlement Catalog UI Interface](screenshots/20-plans.png)
*Figure 22: Live Interface of Subscription Plan & Entitlement Catalog (`/admin/plans`)*

**Purpose & Business Objective:**  
Manages platform monetization tiers, subscription pricing, feature entitlements, job posting limits, and promotional discounts.

**Primary Administrative Tasks:**
- Viewing active subscription tiers for Employers, Talent, and Investors.
- Managing pricing schedules (Monthly, Quarterly, Annual billing in INR).
- Configuring feature entitlements (e.g., unlimited AI matching, direct message limits, featured job badges).
- Activating or deprecating legacy subscription tiers.

**Main UI Features & Data Components:**
- Plan Tier Grid: Visual plan cards (Free Tier, Growth Startup, Scale Enterprise, Syndicate Investor) with pricing and active subscriber counts.
- Tabbed Catalog Navigation: Tabs for Plan Catalog, Entitlements & Limits, Promotions & Vouchers, and Commissions & Fees.
- Feature Entitlements Matrix: Detailed mapping of platform permissions and resource quotas assigned to each plan tier.
- Create Plan Quick Trigger: High-visibility button navigating to the Plan Creation Studio.

**Available Actions & UI Controls:**
| Control Name | UI Type | Operational Effect |
|:---|:---|:---|
| **Create New Plan (Button)** | Interactive Control | Navigates to the Plan Creation Wizard (/admin/plans/new). |
| **Edit Plan (Button)** | Interactive Control | Navigates to plan modification studio (/admin/plans/[id]). |
| **Duplicate Plan (Button)** | Interactive Control | Clones plan configurations into a new draft tier. |
| **Toggle Plan Active Status** | Interactive Control | Hides or displays plan on the public checkout pricing page. |

**Step-by-Step Usage Instructions:**
1. Access 'Plans' under Financial Engine.
2. Review subscriber distribution across active plans.
3. Click 'Create New Plan' to introduce a seasonal or promotional subscription tier.
4. To adjust pricing or quotas on an existing tier, click 'Edit Plan' on the respective card.
5. Switch to 'Promotions & Vouchers' tab to issue discount coupon codes for startup accelerator cohorts.

**Cross-Navigation & Related Pages:** `/admin/plans/new`, `/admin/plans/plan_emp_growth`, `/admin/billing`

> [!NOTE] **Operational Limitations & Implementation Stubs:**  
> Price modifications on active tiers only apply to new subscribers; grandfathered legacy subscribers maintain existing billing rates until renewal.

---

#### <a id='page-23-subscription-plan-creation-wizard'></a>23. Subscription Plan Creation Wizard
**URL:** `/admin/plans/new`  
**Module:** Financial Operations & Subscriptions  
**Operational Verification Status:** Verified Active (HTTP 200)

![Subscription Plan Creation Wizard UI Interface](screenshots/21-plan-new.png)
*Figure 23: Live Interface of Subscription Plan Creation Wizard (`/admin/plans/new`)*

**Purpose & Business Objective:**  
Step-by-step authoring studio for provisioning new subscription products, setting recurring pricing, and configuring entitlement quotas.

**Primary Administrative Tasks:**
- Creating new subscription tiers tailored for startups, recruiters, or talent.
- Configuring recurring billing frequencies (Monthly, Annually) with automatic discounts.
- Setting granular platform limits (number of active job posts, candidate unlock credits, AI match runs).
- Configuring taxability, HSN/SAC codes, and public visibility flags.

**Main UI Features & Data Components:**
- Plan Identity Form: Plan Name, Internal Slug, Target Role (Employer, Talent, Investor), and Public Description.
- Pricing Engine Config: Currency selector (INR), Monthly Base Price, Annual Billing Price (with auto % discount calculation).
- Entitlement Limits Sliders: Number inputs for Active Job Postings, Featured Listings, Resume Unlock Credits, and Team Seat Allocations.
- Publishing Controls: Visibility toggles (Public, Invite-Only, Hidden) and Save as Draft capability.

**Available Actions & UI Controls:**
| Control Name | UI Type | Operational Effect |
|:---|:---|:---|
| **Target Role Selector** | Interactive Control | Assigns plan to Employer, Talent, or Investor accounts. |
| **Save Draft (Button)** | Interactive Control | Saves configuration without publishing to live pricing tables. |
| **Publish Plan (Button)** | Interactive Control | Activates plan and generates Stripe/Razorpay billing plan IDs. |
| **Cancel (Button)** | Interactive Control | Discards changes and returns to the Plan Catalog. |

**Step-by-Step Usage Instructions:**
1. Click 'Create New Plan' from the Plan Catalog.
2. Enter plan name (e.g., 'Hypergrowth Startup Tier') and select the target role.
3. Configure pricing terms for both monthly and annual billing cycles.
4. Specify quota allocations for job posts and candidate messaging credits.
5. Click 'Publish Plan' to push the new tier live to the checkout flow.

**Cross-Navigation & Related Pages:** `/admin/plans`, `/admin/billing`

> [!NOTE] **Operational Limitations & Implementation Stubs:**  
> Plan slugs must be globally unique alphanumeric strings; once published, target role cannot be retroactively modified.

---

#### <a id='page-24-subscription-plan-modification-studio'></a>24. Subscription Plan Modification Studio
**URL:** `/admin/plans/[id]`  
**Module:** Financial Operations & Subscriptions  
**Operational Verification Status:** Verified Active (HTTP 200)

![Subscription Plan Modification Studio UI Interface](screenshots/22-plan-edit.png)
*Figure 24: Live Interface of Subscription Plan Modification Studio (`/admin/plans/[id]`)*

**Purpose & Business Objective:**  
Provides full lifecycle management for an existing subscription plan, allowing administrators to adjust pricing, feature caps, and marketing copy.

**Primary Administrative Tasks:**
- Updating pricing schedules and annual discount incentives.
- Modifying candidate unlock quotas and monthly posting allowances.
- Reviewing historical subscriber churn and lifetime revenue generated by this tier.
- Deprecating or archiving sunsetted subscription tiers.

**Main UI Features & Data Components:**
- Plan Metrics Ribbon: Active Subscribers, Monthly Recurring Revenue (MRR), and Churn Rate (%).
- Live Configuration Form: Edit Plan Title, Badge Text (e.g. 'Most Popular'), Monthly Fee, Annual Fee, and Quotas.
- Grandfathering Policy Selector: Defines whether existing subscribers inherit updated pricing or retain grandfathered rates.
- Deprecation Action Bar: Allows safe phasing out of older tiers without interrupting active subscriptions.

**Available Actions & UI Controls:**
| Control Name | UI Type | Operational Effect |
|:---|:---|:---|
| **Save Plan Changes (Button)** | Interactive Control | Updates plan parameters across database and billing gateway. |
| **Deprecate Tier (Button)** | Interactive Control | Prevents new signups while servicing active subscribers. |
| **Clone as New Plan (Button)** | Interactive Control | Duplicates current configuration into a draft tier. |

**Step-by-Step Usage Instructions:**
1. Select an existing plan from the catalog to enter the edit studio.
2. Adjust the desired parameters (e.g., increase candidate unlock allowance).
3. Select the Grandfathering rule to protect existing contracted subscribers.
4. Click 'Save Plan Changes' to apply configuration updates.
5. Verify updated entitlements are reflected in user account permissions.

**Cross-Navigation & Related Pages:** `/admin/plans`, `/admin/billing`

> [!NOTE] **Operational Limitations & Implementation Stubs:**  
> Decreasing resource allowances on active tiers requires 30-day advance notification to complying subscribers under Indian consumer protection norms.

---

#### <a id='page-25-disbursement-payout-operations'></a>25. Disbursement & Payout Operations
**URL:** `/admin/payouts`  
**Module:** Financial Operations & Subscriptions  
**Operational Verification Status:** Verified Active (HTTP 200)

![Disbursement & Payout Operations UI Interface](screenshots/23-payouts.png)
*Figure 25: Live Interface of Disbursement & Payout Operations (`/admin/payouts`)*

**Purpose & Business Objective:**  
Manages platform outbound financial disbursements, escrow releases, freelancer payout batches, TDS statutory tax deductions, and bank NACH/NEFT processing.

**Primary Administrative Tasks:**
- Reviewing and approving scheduled payout batches to talent and vendors.
- Auditing automated Section 194J / 194C TDS tax withholding calculations.
- Managing active payee holds and resolving failed bank account transfers.
- Processing refund requests and chargeback reversals.

**Main UI Features & Data Components:**
- Disbursement Summary Metrics: Pending Batch Total (INR), Processed This Month, Active Payee Holds, and TDS Withheld (MTD).
- Tabbed Operations Bar: Tabs for Payout Batches, Refund Requests, Active Payee Holds, and TDS & Tax Paperwork.
- Payout Batches Table: Batch ID (e.g. BAT-2026-11-10), Total Payees, Gross Amount, TDS Amount, Net Disbursement, Status (Queued, Processing, Disbursed), and Scheduled Date.
- Payee Banking Validation Pill: Indicates penny-drop verification status of destination bank accounts.

**Available Actions & UI Controls:**
| Control Name | UI Type | Operational Effect |
|:---|:---|:---|
| **Create Immediate Batch (Button)** | Interactive Control | Gathers all unbatched approved earnings into a new payout run. |
| **Inspect Batch (Button)** | Interactive Control | Opens the complete payout batch ledger (/admin/payouts/batches/[id]). |
| **Export Bank NACH/NEFT File (Button)** | Interactive Control | Generates bank-standard payment file for corporate net banking upload. |
| **Place Payee Hold (Button)** | Interactive Control | Freezes disbursements to a specific user pending compliance review. |

**Step-by-Step Usage Instructions:**
1. Access 'Payouts' from the Financial Engine sidebar category.
2. Inspect the headline metrics to review pending payout obligations and TDS accruals.
3. Review the 'Payout Batches' tab and select the batch scheduled for today's release.
4. Verify that all payees possess verified penny-drop bank details and valid PAN cards.
5. Click 'Inspect Batch' to conduct itemized ledger auditing before final release.

**Cross-Navigation & Related Pages:** `/admin/payouts/batches/BAT-2026-11-10`, `/admin/billing`, `/admin/disputes`, `/admin/audit`

> [!NOTE] **Operational Limitations & Implementation Stubs:**  
> Individual payouts exceeding INR 20,000 without a verified PAN card are subject to mandatory 20% Section 206AA statutory maximum TDS withholding.

---

#### <a id='page-26-payout-batch-manifest-ledger'></a>26. Payout Batch Manifest & Ledger
**URL:** `/admin/payouts/batches/[id]`  
**Module:** Financial Operations & Subscriptions  
**Operational Verification Status:** Verified Active (HTTP 200)

![Payout Batch Manifest & Ledger UI Interface](screenshots/24-payout-batch-detail.png)
*Figure 26: Live Interface of Payout Batch Manifest & Ledger (`/admin/payouts/batches/[id]`)*

**Purpose & Business Objective:**  
Provides an itemized, line-by-line financial manifest of every individual payee disbursement included in a specific payout batch run.

**Primary Administrative Tasks:**
- Auditing individual talent earnings, platform fee deductions, and TDS withholding lines.
- Excluding or holding individual suspicious line items without cancelling the entire batch.
- Verifying destination IFSC codes, bank account numbers, and beneficiary names.
- Executing final authorization and releasing the batch to banking APIs.

**Main UI Features & Data Components:**
- Batch Manifest Header: Batch ID (BAT-2026-11-10), Total Records (42), Gross Volume (INR 8,45,000), Total TDS (INR 84,500), Net Payable (INR 7,60,500), and Execution State.
- Itemized Line-Item Table: Payee Name, User ID, Contract Reference, Gross Amount, TDS Rate (10%), Net Amount, Bank Name, Masked Account, IFSC, and Line Status.
- Line-Item Exclusion Controls: Checkboxes allowing administrators to uncheck specific problematic payees.
- Dual-Authorization Gate: Requires two distinct administrator sign-offs for release of batches exceeding INR 10,00,000.

**Available Actions & UI Controls:**
| Control Name | UI Type | Operational Effect |
|:---|:---|:---|
| **Exclude Line Item (Toggle/Checkbox)** | Interactive Control | Removes payee from this batch run and holds funds for investigation. |
| **Download Bank Manifest (CSV)** | Interactive Control | Exports standard CSV/Excel format compatible with HDFC/ICICI corporate portals. |
| **Authorize & Disburse Batch (Button)** | Interactive Control | Submits disbursement instructions to banking gateway API. |
| **Cancel Batch (Button)** | Interactive Control | Aborts batch run and returns balances to individual user wallets. |

**Step-by-Step Usage Instructions:**
1. Open the scheduled batch from the Payouts overview page.
2. Review the gross, TDS, and net disbursement totals.
3. Scroll through the line-item manifest to verify that no flagged or disputed accounts are included.
4. If an anomaly is found on a specific payee, click 'Exclude' to hold their payment.
5. Click 'Authorize & Disburse Batch' and complete secondary security verification to release funds.

**Cross-Navigation & Related Pages:** `/admin/payouts`, `/admin/billing`, `/admin/audit`

> [!NOTE] **Operational Limitations & Implementation Stubs:**  
> Once disbursed to the banking gateway, individual transactions cannot be recalled; failed transfers will automatically credit back to the escrow reserve.

---

### Module 7: Regulatory Compliance, Legal & Privacy
*DPDP Act 2023 compliance, data subject requests (DSR), immutable audit trails, and statutory framework inspection.*

#### <a id='page-27-regulatory-compliance-framework-audits'></a>27. Regulatory Compliance & Framework Audits
**URL:** `/admin/compliance`  
**Module:** Regulatory Compliance, Legal & Privacy  
**Operational Verification Status:** Verified Active (HTTP 200)

![Regulatory Compliance & Framework Audits UI Interface](screenshots/25-compliance.png)
*Figure 27: Live Interface of Regulatory Compliance & Framework Audits (`/admin/compliance`)*

**Purpose & Business Objective:**  
Central regulatory governance console monitoring platform adherence to the Digital Personal Data Protection (DPDP) Act 2023, RBI Payout Escrow Directives, and MCA Startup Regulations.

**Primary Administrative Tasks:**
- Tracking statutory compliance scores across active regulatory frameworks.
- Conducting regular compliance inspection deep-dives.
- Reviewing data retention schedules and automated consent expiry.
- Managing regulatory disclosures and generating external audit packages.

**Main UI Features & Data Components:**
- Compliance Health Cards: Overall Compliance Score (98.4%), Open Deficiencies, Upcoming Regulatory Deadlines, and Consent Expiries.
- Framework Status Matrix: Status tracking for DPDP Act 2023, RBI Payout Guidelines, DPIIT Startup Recognition Rules, and ISO 27001 Controls.
- Inspection Drawer Section: Quick side drawer for immediate review of framework policies and control implementation evidence.
- Deep-Dive Navigation Link: Direct access button navigating to full framework inspection (/admin/compliance/[id]).

**Available Actions & UI Controls:**
| Control Name | UI Type | Operational Effect |
|:---|:---|:---|
| **Trigger Compliance Scan (Button)** | Interactive Control | Executes automated system check against configured policy rules. |
| **Inspect Framework (Button)** | Interactive Control | Navigates to dedicated compliance deep-dive (/admin/compliance/data-rights). |
| **Download Statutory Audit Report (PDF)** | Interactive Control | Compiles executive compliance certificate for regulatory bodies. |
| **Manage Consents (Link)** | Interactive Control | Navigates to user consent logs and privacy policy version controls. |

**Step-by-Step Usage Instructions:**
1. Access 'Compliance' under the Audit and Compliance sidebar section.
2. Review the overall compliance score and inspect any open deficiency alerts.
3. Click on a specific framework card (e.g. 'DPDP Act 2023 - Data Rights') to open the Inspection Drawer.
4. Review the control status and click 'Open Full Inspection' to examine technical implementation details.
5. Export the monthly compliance audit report for archiving and internal legal review.

**Cross-Navigation & Related Pages:** `/admin/compliance/data-rights`, `/admin/data-requests`, `/admin/audit`

> [!NOTE] **Operational Limitations & Implementation Stubs:**  
> Automated compliance checks evaluate technical database encryption and consent flags; operational procedural audits require manual verification.

---

#### <a id='page-28-compliance-inspection-policy-deep-dive'></a>28. Compliance Inspection & Policy Deep Dive
**URL:** `/admin/compliance/[id]`  
**Module:** Regulatory Compliance, Legal & Privacy  
**Operational Verification Status:** Verified Active (HTTP 200)

![Compliance Inspection & Policy Deep Dive UI Interface](screenshots/26-compliance-detail.png)
*Figure 28: Live Interface of Compliance Inspection & Policy Deep Dive (`/admin/compliance/[id]`)*

**Purpose & Business Objective:**  
Provides granular, technical audit inspection for a specific regulatory control framework, displaying evidence documents, test results, and remediation plans.

**Primary Administrative Tasks:**
- Auditing technical implementation of data protection rights (Right to Access, Right to Correction, Right to Erasure).
- Inspecting encryption standards (AES-256 for data at rest, TLS 1.3 for transit).
- Reviewing automated consent logging and verifiable withdrawal mechanisms.
- Managing corrective action plans (CAPA) for identified compliance vulnerabilities.

**Main UI Features & Data Components:**
- Framework Detail Header: Framework Title (e.g., DPDP Data Rights & Erasure), Governance Body, Audit Frequency, and Last Review Date.
- Technical Control Checklist: Itemized list of mandatory statutory controls with live pass/fail status and audit evidence links.
- Data Flow Diagram Widget: Visual architecture schematic showing how personal identity data moves through platform services.
- Audit Evidence Repository: Uploaded penetration testing reports, DPDP compliance certificates, and legal opinions.
- Remediation Workbench: Form to assign corrective tasks to engineering squads with binding SLA deadlines.

**Available Actions & UI Controls:**
| Control Name | UI Type | Operational Effect |
|:---|:---|:---|
| **Run Live Control Test (Button)** | Interactive Control | Executes real-time probe to verify cryptographic sanitization endpoints. |
| **Upload Audit Evidence (Button)** | Interactive Control | Attaches third-party auditor reports or legal memoranda. |
| **Sign Off on Framework (Button)** | Interactive Control | Logs formal administrative certification of framework compliance. |
| **Back to Compliance Overview (Link)** | Interactive Control | Returns to main compliance dashboard. |

**Step-by-Step Usage Instructions:**
1. Open a framework inspection file from the Compliance dashboard.
2. Review the technical control checklist to confirm all mandatory statutory points show green 'Pass' indicators.
3. Click 'Run Live Control Test' to dynamically verify that erasure endpoints anonymize records in accordance with law.
4. Review uploaded legal opinion documents in the evidence repository.
5. Complete the annual sign-off section to record your official administrative approval.

**Cross-Navigation & Related Pages:** `/admin/compliance`, `/admin/data-requests`, `/admin/audit`

> [!NOTE] **Operational Limitations & Implementation Stubs:**  
> Control test execution interacts with staging verification mocks to prevent accidental disruption of production data stores.

---

#### <a id='page-29-dpdp-gdpr-data-subject-requests'></a>29. DPDP / GDPR Data Subject Requests
**URL:** `/admin/data-requests`  
**Module:** Regulatory Compliance, Legal & Privacy  
**Operational Verification Status:** Verified Active (HTTP 200)

![DPDP / GDPR Data Subject Requests UI Interface](screenshots/27-data-requests.png)
*Figure 29: Live Interface of DPDP / GDPR Data Subject Requests (`/admin/data-requests`)*

**Purpose & Business Objective:**  
Manages statutory privacy requests submitted by platform users exercising their rights under the DPDP Act 2023 and GDPR.

**Primary Administrative Tasks:**
- Processing user requests for Data Access (Takeout), Data Rectification, and Complete Account Erasure (Right to be Forgotten).
- Monitoring the mandatory 30-day statutory response deadline timer for every request.
- Verifying user identity before releasing personal data archives.
- Executing automated cryptographic anonymization routines upon request approval.

**Main UI Features & Data Components:**
- SLA Deadline Countdown: Highlights days remaining before statutory penalties apply.
- Request Type Filters: Filter by Right to Access (Export), Right to Erasure (Delete), Right to Correction, and Consent Revocation.
- Data Requests Table: Request ID (e.g. DSR-2026-041), User Name, Submitter Role, Request Type, Days Remaining, Verification Status, and Ticket Status.
- Automated Data Package Generator: Creates cryptographically signed ZIP archive containing all personal records.

**Available Actions & UI Controls:**
| Control Name | UI Type | Operational Effect |
|:---|:---|:---|
| **Open DSR Dossier (Button)** | Interactive Control | Opens the request processing workspace (/admin/data-requests/[id]). |
| **Verify Submitter Identity (Button)** | Interactive Control | Triggers secondary Aadhaar/OTP verification to prevent data leakage. |
| **Generate Data Package (Button)** | Interactive Control | Compiles user profile, applications, messages, and invoices into JSON archive. |
| **Execute Account Erasure (Button)** | Interactive Control | Anonymizes personal identifiers while preserving statutory tax/escrow records. |

**Step-by-Step Usage Instructions:**
1. Access 'Data Requests' from the Administration category in the sidebar.
2. Sort the table by 'Days Remaining' to prioritize requests approaching statutory deadlines.
3. Click on a request row to inspect submitter details and verification standing.
4. Confirm that the applicant has successfully passed identity verification.
5. Open the dossier to generate the requested data archive or proceed with account erasure.

**Cross-Navigation & Related Pages:** `/admin/data-requests/DSR-2026-041`, `/admin/compliance`, `/admin/users`, `/admin/audit`

> [!NOTE] **Operational Limitations & Implementation Stubs:**  
> Under Section 8(4) of the DPDP Act, financial transaction records and TDS invoices must be retained for 7 years and are excluded from complete erasure.

---

#### <a id='page-30-data-subject-request-processing-dossier'></a>30. Data Subject Request Processing Dossier
**URL:** `/admin/data-requests/[id]`  
**Module:** Regulatory Compliance, Legal & Privacy  
**Operational Verification Status:** Verified Active (HTTP 200)

![Data Subject Request Processing Dossier UI Interface](screenshots/28-data-request-detail.png)
*Figure 30: Live Interface of Data Subject Request Processing Dossier (`/admin/data-requests/[id]`)*

**Purpose & Business Objective:**  
Granular execution workbench for fulfilling an individual Data Subject Access or Erasure Request, verifying identities, and generating audit certificates.

**Primary Administrative Tasks:**
- Reviewing submitter identity authentication logs.
- Inspecting raw JSON telemetry of all user data stored across platform microservices.
- Executing irreversible anonymization across profiles, resumes, chat messages, and search indices.
- Dispatching cryptographic certificate of erasure to the user and regulatory authorities.

**Main UI Features & Data Components:**
- Request Header: Request ID (DSR-2026-041), Request Type (Data Erasure / Right to be Forgotten), Submitter Name, Days to SLA Breach (18 Days), and Current Stage.
- Identity Verification Proof: Shows timestamped Aadhaar OTP verification and email confirmation tokens.
- Data Scope Inventory: Lists personal records identified across User Profiles, Resumes & Portfolios, Chat Transcripts, and Application History.
- Statutory Retention Retention Exceptions Box: Clearly identifies financial invoices and tax withholding records exempt from erasure by law.
- Execution Control Panel: High-consequence action button with multi-step confirmation modal for irreversible deletion.

**Available Actions & UI Controls:**
| Control Name | UI Type | Operational Effect |
|:---|:---|:---|
| **Compile & Download Archive (Button)** | Interactive Control | Generates complete encrypted ZIP archive of all user data. |
| **Execute Irreversible Erasure (Button)** | Interactive Control | Triggers cryptographic deletion pipeline across all databases. |
| **Issue Erasure Certificate (Button)** | Interactive Control | Sends signed PDF proof of erasure to user's registered email. |
| **Reject Request (Modal Trigger)** | Interactive Control | Rejects request if submitter identity cannot be verified or active dispute exists. |

**Step-by-Step Usage Instructions:**
1. Open the DSR case file from the Data Requests queue.
2. Confirm that identity verification is marked 'Verified via OTP'.
3. Review the data inventory to ensure all associated records have been located.
4. For erasure requests, confirm that no active milestone disputes or uncleared escrow balances exist.
5. Click 'Execute Irreversible Erasure', enter your administrative security password, and issue the completion certificate.

**Cross-Navigation & Related Pages:** `/admin/data-requests`, `/admin/compliance`, `/admin/audit`

> [!NOTE] **Operational Limitations & Implementation Stubs:**  
> Erasure operations permanently overwrite personal identifiers with SHA-256 pseudorandom hashes; this action cannot be undone.

---

#### <a id='page-31-system-audit-trail-immutable-log-explorer'></a>31. System Audit Trail & Immutable Log Explorer
**URL:** `/admin/audit`  
**Module:** Regulatory Compliance, Legal & Privacy  
**Operational Verification Status:** Verified Active (HTTP 200)

![System Audit Trail & Immutable Log Explorer UI Interface](screenshots/29-audit.png)
*Figure 31: Live Interface of System Audit Trail & Immutable Log Explorer (`/admin/audit`)*

**Purpose & Business Objective:**  
Provides a tamper-evident, immutable forensic log of all administrative actions, data modifications, security events, and financial authorizations.

**Primary Administrative Tasks:**
- Investigating administrative misconduct, unauthorized data access, or privilege abuse.
- Reviewing chronological record changes with before-and-after JSON diffs.
- Tracking user impersonation sessions, status overrides, and verification approvals.
- Exporting cryptographically sealed audit manifests for external statutory examiners.

**Main UI Features & Data Components:**
- Audit Explorer Filter Bar: Search by Actor Email, Target Entity ID, Action Type (User Update, Escrow Release, Verification Approve, Flag Toggle), and Date Range.
- Audit Log Table: Timestamp (UTC & IST), Actor Name & Role, Action Description, Target Entity, IP Address & Location, and Change Diff Indicator.
- JSON Diff Drawer: Sliding modal showing exact field-level state changes (previous value vs. new value) in color-coded JSON format.
- Cryptographic Block Integrity Hash: Displays SHA-256 merkle hash linking each log entry to ensure tamper detection.

**Available Actions & UI Controls:**
| Control Name | UI Type | Operational Effect |
|:---|:---|:---|
| **Search Audit Logs** | Interactive Control | Full-text search querying actor, target UUID, or action keywords. |
| **Action Type Filter** | Interactive Control | Filters logs by specific categories: Auth, User Management, Billing, Verification, Config. |
| **View Diff (Button)** | Interactive Control | Opens JSON diff viewer displaying exact field-level modifications. |
| **Export Signed Audit Trail (CSV)** | Interactive Control | Downloads tamper-evident signed CSV archive for regulatory audits. |

**Step-by-Step Usage Instructions:**
1. Navigate to 'Audit' under Audit and Compliance.
2. Use the search bar to filter by target user ID or administrator email.
3. Select the appropriate action category to narrow down events (e.g., 'Verification Approve').
4. Click 'View Diff' on any log row to inspect the before-and-after JSON representation of the change.
5. Export filtered audit records for external reporting or internal forensic investigation.

**Cross-Navigation & Related Pages:** `/admin`, `/admin/users`, `/admin/staff`, `/admin/system`

> [!NOTE] **Operational Limitations & Implementation Stubs:**  
> Audit logs are append-only; entries cannot be edited, overwritten, or deleted by any user, including Super Admins.

---

### Module 8: Ecosystem, Grants & Talent Matching
*Government grant distribution, incubation schemes, vector similarity matching ops, and platform webhook event streaming.*

#### <a id='page-32-government-grants-opportunity-feed'></a>32. Government Grants & Opportunity Feed
**URL:** `/admin/opportunities`  
**Module:** Ecosystem, Grants & Talent Matching  
**Operational Verification Status:** Verified Active (HTTP 200)

![Government Grants & Opportunity Feed UI Interface](screenshots/30-opportunities.png)
*Figure 32: Live Interface of Government Grants & Opportunity Feed (`/admin/opportunities`)*

**Purpose & Business Objective:**  
Manages public and private ecosystem opportunities, including DPIIT Seed Fund schemes, state incubation grants, accelerator cohorts, and hackathons.

**Primary Administrative Tasks:**
- Publishing and curating government grant notices for verified startups.
- Monitoring startup application volume and disbursed grant capital.
- Managing eligibility criteria (sector, incorporation stage, female founder quotas).
- Tracking application review pipelines and partner agency reviews.

**Main UI Features & Data Components:**
- Opportunity Metrics Ribbon: Active Grants, Total Grant Pool (INR Cr), Total Applications Received, and Partner Agencies.
- Opportunities Catalog Table: Program Title, Issuing Agency (e.g. DPIIT, MeitY, BIRAC), Grant Amount / Equity Terms, Deadline, Status (Open, Reviewing, Closed), and Applications Count.
- Category Filter Pills: Grants, Incubators, Accelerators, Hackathons, and Angel Challenges.
- Create Opportunity Button: Quick trigger navigating to the Opportunity Authoring Studio.

**Available Actions & UI Controls:**
| Control Name | UI Type | Operational Effect |
|:---|:---|:---|
| **Create New Opportunity (Button)** | Interactive Control | Navigates to the Opportunity Authoring Studio (/admin/opportunities/new). |
| **Edit Opportunity (Button)** | Interactive Control | Opens opportunity management studio (/admin/opportunities/[id]). |
| **Review Applications (Button)** | Interactive Control | Opens submitted startup application roster for this grant. |
| **Toggle Opportunity Status** | Interactive Control | Opens or closes public application intake. |

**Step-by-Step Usage Instructions:**
1. Access 'Opportunities' from the Ecosystem & Matching sidebar section.
2. Review active grant programs and inspect upcoming deadline expirations.
3. Click 'Create New Opportunity' to publish a newly announced government incubation scheme.
4. To manage applicants on an ongoing program, click 'Review Applications'.
5. Update program status to 'Reviewing' when the application window concludes.

**Cross-Navigation & Related Pages:** `/admin/opportunities/new`, `/admin/opportunities/OPP-DPIIT-01`, `/admin/organizations`

> [!NOTE] **Operational Limitations & Implementation Stubs:**  
> Direct grant disbursement execution is handled by government partner bank portals; the platform manages application intake and eligibility verification.

---

#### <a id='page-33-opportunity-publishing-studio'></a>33. Opportunity Publishing Studio
**URL:** `/admin/opportunities/new`  
**Module:** Ecosystem, Grants & Talent Matching  
**Operational Verification Status:** Verified Active (HTTP 200)

![Opportunity Publishing Studio UI Interface](screenshots/31-opportunity-new.png)
*Figure 33: Live Interface of Opportunity Publishing Studio (`/admin/opportunities/new`)*

**Purpose & Business Objective:**  
Wizard for creating, configuring, and publishing new startup grants, venture competitions, or incubation schemes.

**Primary Administrative Tasks:**
- Authoring program descriptions, eligibility guidelines, and application questions.
- Setting financial grant amounts, disbursement schedules, and equity requirements (if any).
- Configuring applicant filtering rules (e.g., must possess verified DPIIT certificate).
- Setting application deadlines and automated review routing.

**Main UI Features & Data Components:**
- Program Overview Form: Program Title, Issuing Agency, Program Type (Grant, Accelerator, Pitch Competition), and Headline Summary.
- Eligibility Matrix: Minimum Incorporation Age, Sector Tags (Fintech, Agritech, Deeptech, Health), DPIIT Mandatory Requirement Toggle.
- Financial & Terms Builder: Total Grant Cap (INR), Equity Percentage (0% for non-dilutive grants), and Milestone Schedule.
- Custom Application Form Builder: Allows adding specific questionnaire fields and document upload requirements.

**Available Actions & UI Controls:**
| Control Name | UI Type | Operational Effect |
|:---|:---|:---|
| **Save Draft (Button)** | Interactive Control | Saves program configuration without making it publicly discoverable. |
| **Publish Opportunity (Button)** | Interactive Control | Publishes opportunity to the startup portal feed and triggers notifications. |
| **Preview Public Listing (Button)** | Interactive Control | Displays live preview modal showing how startups will see the listing. |

**Step-by-Step Usage Instructions:**
1. Click 'Create New Opportunity' from the Opportunities catalog.
2. Fill in the program title, sponsoring agency, and comprehensive overview.
3. Configure eligibility criteria, toggling the DPIIT Recognition requirement if applicable.
4. Specify grant financial amounts and set the final application cutoff deadline.
5. Click 'Publish Opportunity' to distribute the announcement across the platform.

**Cross-Navigation & Related Pages:** `/admin/opportunities`, `/admin/organizations`

> [!NOTE] **Operational Limitations & Implementation Stubs:**  
> Published opportunities automatically generate SEO metadata and schema.org markup for external discovery.

---

#### <a id='page-34-opportunity-management-edit-studio'></a>34. Opportunity Management & Edit Studio
**URL:** `/admin/opportunities/[id]`  
**Module:** Ecosystem, Grants & Talent Matching  
**Operational Verification Status:** Verified Active (HTTP 200)

![Opportunity Management & Edit Studio UI Interface](screenshots/32-opportunity-edit.png)
*Figure 34: Live Interface of Opportunity Management & Edit Studio (`/admin/opportunities/[id]`)*

**Purpose & Business Objective:**  
Comprehensive administrative workbench for managing an active opportunity program, reviewing submitted applications, and updating program terms.

**Primary Administrative Tasks:**
- Modifying program deadlines, grant amounts, or eligibility requirements.
- Reviewing startup application submissions and grading applicant pitch decks.
- Shortlisting, rejecting, or advancing startups to interview rounds.
- Publishing winner announcements and grant allocation summaries.

**Main UI Features & Data Components:**
- Program Header: Opportunity ID (OPP-DPIIT-01), Program Title, Agency, Total Applicants (142), and Days to Deadline.
- Tabbed Program Workbench: Tabs for Program Details & Settings, Applicant Roster & Scoring, Review Committee Notes, and Disbursement Tracking.
- Applicant Scoring Table: Startup Name, DPIIT Status, Sector, Automated Eligibility Match (%), Panel Score, and Current Stage.
- Broadcast Updates Modal: Sends broadcast message to all applicants regarding timeline changes or webinar links.

**Available Actions & UI Controls:**
| Control Name | UI Type | Operational Effect |
|:---|:---|:---|
| **Save Program Edits (Button)** | Interactive Control | Saves modified program terms and schedules. |
| **Advance Shortlisted (Button)** | Interactive Control | Moves selected startups to the final jury pitch round. |
| **Export Applicant Roster (CSV)** | Interactive Control | Downloads full dataset of applicants and pitch deck links. |
| **Close Application Intake (Button)** | Interactive Control | Halts new submissions immediately. |

**Step-by-Step Usage Instructions:**
1. Open the opportunity file from the main Opportunities catalog.
2. Review incoming applications in the 'Applicant Roster' tab.
3. Filter applicants by automated eligibility score to prioritize top candidates.
4. Record committee evaluation scores and adjust applicant stages.
5. When evaluation concludes, use the batch action tool to notify winning startups.

**Cross-Navigation & Related Pages:** `/admin/opportunities`, `/admin/organizations/org_01`

> [!NOTE] **Operational Limitations & Implementation Stubs:**  
> Changes to program eligibility criteria while applications are actively open are logged in the public changelog to ensure fairness.

---

#### <a id='page-35-vector-matching-engine-operations'></a>35. Vector Matching Engine Operations
**URL:** `/admin/matching`  
**Module:** Ecosystem, Grants & Talent Matching  
**Operational Verification Status:** Verified Active (HTTP 200)

![Vector Matching Engine Operations UI Interface](screenshots/33-matching.png)
*Figure 35: Live Interface of Vector Matching Engine Operations (`/admin/matching`)*

**Purpose & Business Objective:**  
Supervises and fine-tunes the platform's AI vector similarity matching engine that matches candidate resumes with startup job specifications.

**Primary Administrative Tasks:**
- Monitoring vector embedding generation latency and Pinecone/Milvus index health.
- Calibrating algorithmic weights (Skills Match, Experience Depth, Salary Expectation, Location/Remote, Cultural Fit).
- Simulating match scores between sample candidate profiles and job requisitions.
- Investigating matching anomalies or low recommendation accuracy reports.

**Main UI Features & Data Components:**
- Engine Telemetry Cards: Active Embeddings Index Count (124,500), Average Match Latency (32ms), Match Acceptance Rate (78.2%), and Cosine Similarity Threshold (0.74).
- Algorithm Weight Calibration Sliders: Interactive sliders to calibrate relative weighting between Technical Skills (40%), Experience (25%), Compensation (15%), Location (10%), and Education (10%).
- Real-Time Match Simulation Sandbox: Select any candidate and job requisition to generate a live match calculation with explainability breakdown.
- Vector Index Maintenance Bar: Re-index vector database, trigger garbage collection, or rebuild search clusters.

**Available Actions & UI Controls:**
| Control Name | UI Type | Operational Effect |
|:---|:---|:---|
| **Calibrate Weights (Button)** | Interactive Control | Applies modified algorithmic weighting parameters to the live matching service. |
| **Run Match Simulation (Button)** | Interactive Control | Calculates live similarity score and displays vector distance metrics. |
| **Trigger Full Re-Index (Button)** | Interactive Control | Initiates asynchronous background regeneration of all profile embeddings. |
| **Reset to Default Baseline (Button)** | Interactive Control | Restores algorithmic weights to standard factory defaults. |

**Step-by-Step Usage Instructions:**
1. Navigate to 'Matching' from the Ecosystem & Matching sidebar menu.
2. Review the match acceptance rate and vector latency telemetry.
3. To calibrate match sensitivity, adjust the weight calibration sliders.
4. Click 'Run Match Simulation' to test how weight adjustments affect candidate rankings on a sample job requisition.
5. Click 'Calibrate Weights' to deploy the updated algorithm to production recommendation feeds.

**Cross-Navigation & Related Pages:** `/admin/ai-quality`, `/admin/system`, `/admin/config`

> [!NOTE] **Operational Limitations & Implementation Stubs:**  
> Vector re-indexing of the full platform candidate database runs in background worker nodes and takes approximately 12 minutes to complete without downtime.

---

#### <a id='page-36-platform-event-log-webhook-stream'></a>36. Platform Event Log & Webhook Stream
**URL:** `/admin/events`  
**Module:** Ecosystem, Grants & Talent Matching  
**Operational Verification Status:** Verified Active (HTTP 200)

![Platform Event Log & Webhook Stream UI Interface](screenshots/34-events.png)
*Figure 36: Live Interface of Platform Event Log & Webhook Stream (`/admin/events`)*

**Purpose & Business Objective:**  
Provides real-time event streaming and webhook delivery telemetry for auditing system-wide pub/sub events and third-party integrations.

**Primary Administrative Tasks:**
- Monitoring real-time platform event fires (e.g. `user.registered`, `job.published`, `escrow.funded`, `payout.disbursed`).
- Investigating failed third-party webhook deliveries to partner ATS and accounting systems.
- Replaying missed or failed webhook events to partner endpoints.
- Auditing event payload schemas and subscription health.

**Main UI Features & Data Components:**
- Event Stream Metrics: Total Events (24h), Delivery Success Rate (99.8%), Average Latency (120ms), and Dead Letter Queue Count (3).
- Live Event Feed: Auto-scrolling chronological log of emitted events with event type badge, source service, payload snippet, and timestamp.
- Event Filter Bar: Filter by Event Name, Status (Success, Retrying, Failed), Source Service, and Time Window.
- Payload Inspection Drawer: Displays complete raw JSON payload with full delivery attempt HTTP headers and response codes.

**Available Actions & UI Controls:**
| Control Name | UI Type | Operational Effect |
|:---|:---|:---|
| **Pause / Resume Stream (Toggle)** | Interactive Control | Freezes real-time auto-scroll to facilitate inspection of specific events. |
| **Retry Failed Event (Button)** | Interactive Control | Re-queues a failed webhook event for immediate delivery attempt. |
| **Inspect Payload (Button)** | Interactive Control | Opens JSON viewer displaying complete event data. |
| **Purge Dead Letter Queue (Button)** | Interactive Control | Clears unrecoverable event failures after forensic review. |

**Step-by-Step Usage Instructions:**
1. Access 'Events' under Ecosystem & Matching.
2. Observe the real-time event stream or pause it to investigate a specific burst.
3. Filter by 'Status: Failed' to locate undelivered webhook notifications.
4. Click 'Inspect Payload' to examine the HTTP error code returned by the receiver endpoint.
5. Once the receiver endpoint is back online, click 'Retry Failed Event' to redeliver.

**Cross-Navigation & Related Pages:** `/admin/integrations`, `/admin/system`, `/admin/audit`

> [!NOTE] **Operational Limitations & Implementation Stubs:**  
> Failed webhook events are automatically retried up to 5 times with exponential backoff before landing in the Dead Letter Queue.

---

### Module 9: Content & Document Templates
*CMS help articles, platform notices, legally verified hiring and offer contract templates, and document versioning.*

#### <a id='page-37-cms-help-article-management'></a>37. CMS & Help Article Management
**URL:** `/admin/content`  
**Module:** Content & Document Templates  
**Operational Verification Status:** Verified Active (HTTP 200)

![CMS & Help Article Management UI Interface](screenshots/35-content.png)
*Figure 37: Live Interface of CMS & Help Article Management (`/admin/content`)*

**Purpose & Business Objective:**  
Manages platform content marketing, public help desk articles, founder resource guides, legal terms, and localized announcement banners.

**Primary Administrative Tasks:**
- Publishing and editing customer-facing help center documentation.
- Updating platform Terms of Service, Privacy Policy, and Escrow Arbitration rules.
- Configuring localized announcement banners and promotional popups.
- Managing localized content in English, Hindi, and regional Indian languages.

**Main UI Features & Data Components:**
- Content Inventory Table: Article Title, Category (Help, Legal, Guide, Announcement), Author, Status (Published, Draft, Review), Views Count, and Last Updated.
- Category Filter Bar: Help Center Articles, Legal Documents, Founder Guides, and System Announcements.
- Content Drawer Section: Sliding preview showing article text, SEO tags, and publish controls.
- Hiring Templates Quick Link: Action button navigating directly to the contract template repository.

**Available Actions & UI Controls:**
| Control Name | UI Type | Operational Effect |
|:---|:---|:---|
| **Create New Article (Button)** | Interactive Control | Opens rich-text CMS editor to author new content. |
| **Edit Article (Button)** | Interactive Control | Opens existing article for content updates and markdown editing. |
| **Manage Templates (Button)** | Interactive Control | Navigates directly to Contract & Offer Templates (/admin/templates). |
| **Publish / Unpublish Toggle** | Interactive Control | Controls public visibility of the selected article. |

**Step-by-Step Usage Instructions:**
1. Access 'Content' from the Platform Engine sidebar category.
2. Select the desired category (e.g., 'Help Center Articles').
3. Click 'Create New Article' to draft a guide on platform features.
4. To update legal policies, locate the document, make revisions, and increment the policy version number.
5. Click 'Publish' to push content updates to the public web application.

**Cross-Navigation & Related Pages:** `/admin/templates`, `/admin/help`, `/admin/settings`

> [!NOTE] **Operational Limitations & Implementation Stubs:**  
> Updates to statutory legal terms (Terms of Service, Privacy Policy) automatically flag all users to re-accept updated terms upon next login.

---

#### <a id='page-38-hiring-offer-template-library'></a>38. Hiring & Offer Template Library
**URL:** `/admin/templates`  
**Module:** Content & Document Templates  
**Operational Verification Status:** Verified Active (HTTP 200)

![Hiring & Offer Template Library UI Interface](screenshots/36-templates.png)
*Figure 38: Live Interface of Hiring & Offer Template Library (`/admin/templates`)*

**Purpose & Business Objective:**  
Manages standardized, legally vetted contract templates for full-time employment, freelance contracts, non-disclosure agreements (NDAs), and ESOP grant letters.

**Primary Administrative Tasks:**
- Providing startups with standard, Indian-law compliant offer letter templates.
- Managing freelance milestone contract structures and intellectual property assignment agreements.
- Configuring dynamic placeholder tokens (e.g. `{{candidate_name}}`, `{{ctc_amount}}`, `{{probation_months}}`).
- Enforcing mandatory legal clauses protecting talent and employer rights.

**Main UI Features & Data Components:**
- Templates Catalog Grid: Standard Full-Time Employment Agreement, Freelance Milestone Contract, Standard Mutual NDA, and Advisor Equity Agreement.
- Category Filter Tabs: Employment, Freelance & Contractor, Legal & Confidentiality, and Equity & Grants.
- Dynamic Token Inspector: Side panel showing available system tokens for candidate data merging.
- Template Action Toolbar: Create New Template, Preview PDF, Clone Template, and Deprecate.

**Available Actions & UI Controls:**
| Control Name | UI Type | Operational Effect |
|:---|:---|:---|
| **Create New Template (Button)** | Interactive Control | Navigates to template creation wizard (/admin/templates/new). |
| **Edit Template (Button)** | Interactive Control | Navigates to template edit studio (/admin/templates/[id]). |
| **Preview Rendered PDF (Button)** | Interactive Control | Displays live PDF preview merged with dummy candidate data. |
| **Toggle Template Status** | Interactive Control | Enables or disables template for startup usage. |

**Step-by-Step Usage Instructions:**
1. Navigate to 'Templates' under Platform Engine.
2. Browse available contract categories or search by template title.
3. Click 'Create New Template' to draft a new role-specific hiring agreement.
4. To modify existing agreement terms, click 'Edit Template'.
5. Click 'Preview Rendered PDF' to ensure variable token replacement renders cleanly.

**Cross-Navigation & Related Pages:** `/admin/templates/new`, `/admin/templates/TPL-2026-00109`, `/admin/content`

> [!NOTE] **Operational Limitations & Implementation Stubs:**  
> All platform standard templates are reviewed by licensed Indian legal counsel; custom modifications uploaded by startups require founder liability sign-off.

---

#### <a id='page-39-contract-offer-template-creator'></a>39. Contract & Offer Template Creator
**URL:** `/admin/templates/new`  
**Module:** Content & Document Templates  
**Operational Verification Status:** Verified Active (HTTP 200)

![Contract & Offer Template Creator UI Interface](screenshots/37-template-new.png)
*Figure 39: Live Interface of Contract & Offer Template Creator (`/admin/templates/new`)*

**Purpose & Business Objective:**  
Authoring workbench for creating new legally binding employment offer templates, contractor agreements, or advisory contracts.

**Primary Administrative Tasks:**
- Drafting standardized contract text using markdown and merge tokens.
- Configuring mandatory statutory clauses (provident fund, gratuity, notice periods).
- Inserting electronic signature placeholders for employer and candidate.
- Saving templates as drafts or publishing them directly to the startup library.

**Main UI Features & Data Components:**
- Template Metadata Form: Template Title, Category Selector, Applicable Jurisdiction (Indian Law / State Specific), and Description.
- Markdown Contract Editor: Syntax-highlighted text editor with token autocomplete (`{{` prompt).
- Available Variables Palette: Clickable list of dynamic tokens (Candidate Name, CTC, Base Salary, HRA, Notice Period, Joining Date).
- Action Buttons: Save Draft, Publish Template, and Cancel.

**Available Actions & UI Controls:**
| Control Name | UI Type | Operational Effect |
|:---|:---|:---|
| **Save Draft (Button)** | Interactive Control | Saves template progress without publishing to the startup directory. |
| **Publish Template (Button)** | Interactive Control | Validates syntax and makes template available for all verified startups. |
| **Insert Token (Click Action)** | Interactive Control | Inserts selected variable tag into the editor at current cursor position. |

**Step-by-Step Usage Instructions:**
1. Click 'Create New' from the Templates Library.
2. Enter a descriptive title and select the appropriate legal category.
3. Draft the contract clauses, inserting dynamic variable tags where appropriate.
4. Use 'Save Draft' to preserve work-in-progress.
5. Complete legal review and click 'Publish Template' to activate for employers.

**Cross-Navigation & Related Pages:** `/admin/templates`, `/admin/content`

> [!NOTE] **Operational Limitations & Implementation Stubs:**  
> Unclosed token brackets (e.g. `{{candidate_name`) trigger automated syntax validation warnings before publishing is allowed.

---

#### <a id='page-40-contract-template-editor'></a>40. Contract Template Editor
**URL:** `/admin/templates/[id]`  
**Module:** Content & Document Templates  
**Operational Verification Status:** Verified Active (HTTP 200)

![Contract Template Editor UI Interface](screenshots/38-template-edit.png)
*Figure 40: Live Interface of Contract Template Editor (`/admin/templates/[id]`)*

**Purpose & Business Objective:**  
Editing and revision studio for modifying an existing contract template, managing clause versioning, and reviewing live usage metrics.

**Primary Administrative Tasks:**
- Updating clause wording, statutory provident fund percentages, or termination covenants.
- Viewing active contracts currently utilizing this template version.
- Publishing a minor revision or major version increment.
- Deprecating obsolete contract variations.

**Main UI Features & Data Components:**
- Template Header: Template ID (TPL-2026-00109), Current Version (v2.1), Active Contracts Count (340), and Last Modified Date.
- Dual-Pane Editor & Preview: Markdown editor on the left; formatted legal document preview on the right.
- Version Changelog History: Track changes made across historical revisions.
- Publish Controls: Save Changes, Increment Version, and Deprecate.

**Available Actions & UI Controls:**
| Control Name | UI Type | Operational Effect |
|:---|:---|:---|
| **Save Changes (Button)** | Interactive Control | Updates current template version. |
| **Create Major Version (Button)** | Interactive Control | Creates new version (e.g. v3.0) without altering existing in-flight offers. |
| **Deprecate Template (Button)** | Interactive Control | Archives template and prevents future adoption. |

**Step-by-Step Usage Instructions:**
1. Select a template from the library to open the editor.
2. Make necessary adjustments to contract clauses or token placeholders.
3. Inspect the live rendered document on the right pane to verify layout.
4. Click 'Save Changes' to push updates to new offers generated by startups.
5. Document changes in the version changelog modal.

**Cross-Navigation & Related Pages:** `/admin/templates`, `/admin/content`

> [!NOTE] **Operational Limitations & Implementation Stubs:**  
> Editing a template does not alter contracts that have already been digitally signed and counter-signed by parties.

---

### Module 10: Infrastructure, Configuration & Integrations
*System health monitoring, third-party API connections, dynamic runtime feature flags, and broadcast notification dispatchers.*

#### <a id='page-41-infrastructure-health-diagnostics'></a>41. Infrastructure Health & Diagnostics
**URL:** `/admin/system`  
**Module:** Infrastructure, Configuration & Integrations  
**Operational Verification Status:** Verified Active (HTTP 200)

![Infrastructure Health & Diagnostics UI Interface](screenshots/39-system.png)
*Figure 41: Live Interface of Infrastructure Health & Diagnostics (`/admin/system`)*

**Purpose & Business Objective:**  
Monitors platform infrastructure health, cloud microservice availability, database latency, Redis memory pressure, and background task queues.

**Primary Administrative Tasks:**
- Assessing real-time operational status across all platform services and clusters.
- Monitoring PostgreSQL connection pools, TimescaleDB telemetry, and Redis cache hit ratios.
- Tracking Celery/BullMQ background worker queue depths and error rates.
- Activating emergency platform maintenance mode during scheduled upgrade windows.

**Main UI Features & Data Components:**
- System Status Header: Overall Platform Status (Operational / Degraded / Maintenance), Uptime (99.98%), and Global Latency (42ms).
- Service Health Cards: Individual status indicators for Web App, Core API, Auth Service, Matching Engine, Notification Worker, and Database Clusters.
- Resource Telemetry Gauges: Visual gauges for CPU Load, Memory Utilization, Disk I/O, and Active Database Connections.
- Emergency Controls: Maintenance Mode toggle switch and Cache Flush triggers.

**Available Actions & UI Controls:**
| Control Name | UI Type | Operational Effect |
|:---|:---|:---|
| **Maintenance Mode Toggle** | Interactive Control | Puts platform into read-only maintenance mode with custom user message. |
| **Flush Redis Cache (Button)** | Interactive Control | Purges cached API responses and session metadata. |
| **Restart Background Workers (Button)** | Interactive Control | Sends graceful restart signal to queued worker processes. |
| **Download Diagnostic Dump (JSON)** | Interactive Control | Exports full telemetry dump for DevOps engineers. |

**Step-by-Step Usage Instructions:**
1. Open 'System' from the Platform Engine sidebar category.
2. Check the headline status indicator to ensure all microservices show green 'Operational' status.
3. Inspect queue depths to ensure background tasks (emails, vector embeddings) are not backing up.
4. If scheduled maintenance is required, toggle 'Maintenance Mode' and set the expected maintenance window.
5. After server upgrades conclude, toggle 'Maintenance Mode' off to restore normal access.

**Cross-Navigation & Related Pages:** `/admin/config`, `/admin/integrations`, `/admin/events`

> [!NOTE] **Operational Limitations & Implementation Stubs:**  
> Toggling Maintenance Mode permits administrators to remain logged in while displaying a branded maintenance splash screen to standard users.

---

#### <a id='page-42-third-party-integrations-api-hub'></a>42. Third-Party Integrations & API Hub
**URL:** `/admin/integrations`  
**Module:** Infrastructure, Configuration & Integrations  
**Operational Verification Status:** Verified Active (HTTP 200)

![Third-Party Integrations & API Hub UI Interface](screenshots/40-integrations.png)
*Figure 42: Live Interface of Third-Party Integrations & API Hub (`/admin/integrations`)*

**Purpose & Business Objective:**  
Manages platform connections with external APIs, payment gateways, identity verification providers, transactional email relays, and cloud services.

**Primary Administrative Tasks:**
- Configuring API credentials and webhooks for Razorpay, Cashfree, and Stripe.
- Managing government bridge integrations (DPIIT Startup India API, MCA21, DigiLocker).
- Monitoring external service latency, quota limits, and API error rates.
- Rotating expired API secret keys and re-authenticating OAuth connections.

**Main UI Features & Data Components:**
- Integration Hub Cards: Categorized cards for Payment Gateways (Razorpay), Identity & Reg (DigiLocker, MCA), Communications (Twilio, Resend), and AI (Google Gemini).
- Health & Connectivity Badges: Connected, Degraded, Action Required, and Disconnected indicators.
- API Quota Usage Bars: Real-time progress bars showing monthly API consumption against subscription quotas.
- Configuration Drawer: Sliding modal to securely update API keys, webhook signing secrets, and callback endpoints.

**Available Actions & UI Controls:**
| Control Name | UI Type | Operational Effect |
|:---|:---|:---|
| **Configure Integration (Button)** | Interactive Control | Opens modal to update API keys and endpoints. |
| **Test Connection (Button)** | Interactive Control | Sends live ping to verify API key validity and latency. |
| **Rotate Secrets (Button)** | Interactive Control | Initiates secret rotation protocol with zero downtime. |
| **Sync Data (Button)** | Interactive Control | Forces immediate synchronization with external registry. |

**Step-by-Step Usage Instructions:**
1. Access 'Integrations' under Platform Engine.
2. Review the connectivity status of all third-party partner services.
3. To update an API key, click 'Configure' on the respective service card.
4. Enter the new credentials and click 'Test Connection' to verify handshakes.
5. Save changes and confirm that event webhooks receive successful test pings.

**Cross-Navigation & Related Pages:** `/admin/system`, `/admin/events`, `/admin/config`

> [!NOTE] **Operational Limitations & Implementation Stubs:**  
> API keys are encrypted in PostgreSQL using envelope encryption with AWS KMS; raw secret keys are never exposed in plaintext in the UI.

---

#### <a id='page-43-feature-flags-runtime-configuration'></a>43. Feature Flags & Runtime Configuration
**URL:** `/admin/config`  
**Module:** Infrastructure, Configuration & Integrations  
**Operational Verification Status:** Verified Active (HTTP 200)

![Feature Flags & Runtime Configuration UI Interface](screenshots/41-config.png)
*Figure 43: Live Interface of Feature Flags & Runtime Configuration (`/admin/config`)*

**Purpose & Business Objective:**  
Provides real-time runtime configuration, feature flag rollouts, canary deployments, and operational kill-switches without requiring code redeployments.

**Primary Administrative Tasks:**
- Managing canary rollouts for new UI features and matching algorithms.
- Controlling percentage rollouts across user cohorts (e.g., 20% of talent users).
- Operating emergency feature kill-switches (e.g. disable instantaneous instant payouts during banking instability).
- Configuring runtime environment constants and timeout limits.

**Main UI Features & Data Components:**
- Configuration Flags Table: Flag Name, Key (`ai_matching_v2`), Target Role, Rollout Percentage (0-100%), Status (Active, Inactive, Canary), and Last Modified.
- Interactive Toggle Switches: Immediate one-click activation or deactivation of runtime properties.
- Rollout Percentage Slider: Granular slider controlling partial traffic distribution.
- Create Flag Button: Direct trigger navigating to the Feature Flag Creation Studio.

**Available Actions & UI Controls:**
| Control Name | UI Type | Operational Effect |
|:---|:---|:---|
| **Toggle Flag (Switch)** | Interactive Control | Instantly enables or disables the flag across the platform. |
| **Adjust Rollout (Slider)** | Interactive Control | Modifies user cohort percentage receiving the feature. |
| **Create New Flag (Button)** | Interactive Control | Navigates to the Flag Authoring Wizard (/admin/config/new). |
| **Audit History (Button)** | Interactive Control | Shows chronological record of who modified each flag. |

**Step-by-Step Usage Instructions:**
1. Access 'Config' from the Platform Engine sidebar category.
2. Locate the target feature flag using the search bar.
3. Click the toggle switch to immediately enable or disable the feature.
4. For gradual rollouts, adjust the percentage slider and specify target user cohorts.
5. Verify that changes propagate to connected client applications via WebSocket broadcasts.

**Cross-Navigation & Related Pages:** `/admin/config/new`, `/admin/system`, `/admin/audit`

> [!NOTE] **Operational Limitations & Implementation Stubs:**  
> Feature flag state changes are cached in Redis and propagate to all frontend client sessions within 5 seconds.

---

#### <a id='page-44-feature-flag-config-property-provisioning'></a>44. Feature Flag & Config Property Provisioning
**URL:** `/admin/config/new`  
**Module:** Infrastructure, Configuration & Integrations  
**Operational Verification Status:** Verified Active (HTTP 200)

![Feature Flag & Config Property Provisioning UI Interface](screenshots/42-config-new.png)
*Figure 44: Live Interface of Feature Flag & Config Property Provisioning (`/admin/config/new`)*

**Purpose & Business Objective:**  
Authoring workbench for provisioning new feature flags, runtime variables, and experimental canary configurations.

**Primary Administrative Tasks:**
- Defining new feature flag keys for upcoming product releases.
- Setting default boolean values, JSON configuration schemas, or integer limits.
- Configuring targeting rules based on user roles, verification standing, or geographic state.
- Attaching documentation and ownership tags to prevent stale flag clutter.

**Main UI Features & Data Components:**
- Flag Identity Form: Flag Name, Code Key (`enable_upi_autopay`), Description, and Lead Engineering Owner.
- Flag Type Selector: Boolean Toggle, Multivariate String, Number Quota, or JSON Payload.
- Targeting Rules Engine: Rules based on Role (Employer, Talent, Investor), Account Age, and Verification Status.
- Rollout Strategy Selector: Global 100%, Disabled 0%, Percentage Canary, or Targeted User Whitelist.

**Available Actions & UI Controls:**
| Control Name | UI Type | Operational Effect |
|:---|:---|:---|
| **Save Configuration (Button)** | Interactive Control | Creates feature flag in the runtime matrix. |
| **Add Targeting Condition (Button)** | Interactive Control | Adds specialized filtering rules for cohort access. |
| **Cancel (Button)** | Interactive Control | Aborts creation and returns to Config overview. |

**Step-by-Step Usage Instructions:**
1. Click 'Create Flag' from the Runtime Configuration page.
2. Enter the flag name, code key, and detailed description of the feature.
3. Select the flag type (e.g. Boolean) and set initial default value.
4. Add any cohort targeting conditions to restrict rollout to specific user groups.
5. Click 'Save Configuration' to register the flag in the runtime engine.

**Cross-Navigation & Related Pages:** `/admin/config`, `/admin/system`

> [!NOTE] **Operational Limitations & Implementation Stubs:**  
> Flag keys must follow snake_case format and cannot be modified once referenced in production codebase builds.

---

#### <a id='page-45-system-broadcasts-notification-dispatcher'></a>45. System Broadcasts & Notification Dispatcher
**URL:** `/admin/notifications`  
**Module:** Infrastructure, Configuration & Integrations  
**Operational Verification Status:** Verified Active (HTTP 200)

![System Broadcasts & Notification Dispatcher UI Interface](screenshots/43-notifications.png)
*Figure 45: Live Interface of System Broadcasts & Notification Dispatcher (`/admin/notifications`)*

**Purpose & Business Objective:**  
Manages platform-wide system announcements, emergency maintenance banners, automated transactional notification templates, and marketing campaigns.

**Primary Administrative Tasks:**
- Dispatching urgent broadcast alerts to all active platform users.
- Configuring multi-channel delivery rules (In-App Toast, Email, SMS, WhatsApp).
- Scheduling scheduled announcements for upcoming regulatory deadlines or platform updates.
- Reviewing notification delivery success rates, open rates, and click-through metrics.

**Main UI Features & Data Components:**
- Broadcast Metrics Ribbon: Total Dispatched (MTD), Delivery Rate (99.4%), Average Open Rate (44.2%), and Active In-App Banners.
- Broadcast History Table: Campaign Title, Target Cohort, Channels, Dispatch Date, Delivery Status, and Open Rate.
- Notification Composer: Rich-text composer supporting markdown, CTA buttons, and variable tokens.
- Audience Selector: Target All Users, Verified Startups Only, Active Jobseekers, or Custom User Segments.

**Available Actions & UI Controls:**
| Control Name | UI Type | Operational Effect |
|:---|:---|:---|
| **Create Broadcast (Button)** | Interactive Control | Opens broadcast composition studio. |
| **Schedule Dispatch (Button)** | Interactive Control | Sets future date/time for automated notification send. |
| **Send Immediate Test (Button)** | Interactive Control | Dispatches sample broadcast to administrator's devices. |
| **Deactivate Active Banner (Button)** | Interactive Control | Instantly dismisses live top-bar announcements across all clients. |

**Step-by-Step Usage Instructions:**
1. Access 'Notifications' from the Administration category in the sidebar.
2. Click 'Create Broadcast' to begin authoring an announcement.
3. Select target delivery channels (In-App, Email, SMS) and define recipient cohort.
4. Draft the announcement text and attach action buttons linking to relevant platform pages.
5. Send a test message to yourself, then click 'Send Now' or 'Schedule' to distribute.

**Cross-Navigation & Related Pages:** `/admin/content`, `/admin/users`, `/admin/system`

> [!NOTE] **Operational Limitations & Implementation Stubs:**  
> SMS and WhatsApp broadcasts are restricted to statutory transactional notices under Indian TRAI DND regulations.

---

### Module 11: Administration, Access Control & Authentication
*Internal staff permissions, Role-Based Access Control (RBAC), global platform settings, admin help manual, and security authentication gatekeeper.*

#### <a id='page-46-admin-staff-role-based-access-control'></a>46. Admin Staff & Role-Based Access Control
**URL:** `/admin/staff`  
**Module:** Administration, Access Control & Authentication  
**Operational Verification Status:** Verified Active (HTTP 200)

![Admin Staff & Role-Based Access Control UI Interface](screenshots/46-staff.png)
*Figure 46: Live Interface of Admin Staff & Role-Based Access Control (`/admin/staff`)*

**Purpose & Business Objective:**  
Manages internal administrative staff personnel, permission roles, granular access privileges, and mandatory multi-factor authentication (MFA).

**Primary Administrative Tasks:**
- Provisioning new administrative staff accounts for operations, compliance, support, and finance.
- Configuring Role-Based Access Control (RBAC) permissions (Super Admin, Trust Officer, Support Specialist, Finance Admin, Read-Only Auditor).
- Enforcing mandatory 2FA/FIDO2 hardware security keys for administrative logins.
- Revoking staff credentials and auditing internal administrative session activity.

**Main UI Features & Data Components:**
- Staff Directory Table: Staff Name, Work Email, Assigned Role Badge, 2FA Enforcement Status (Enforced / Pending), Last Active, and Account State.
- Role Permission Matrix: Visual grid displaying granular permissions (User Edit, Escrow Release, Flag Toggle, Log Inspection) across all admin roles.
- Invite Staff Drawer: Modal to invite new administrative staff via corporate Google Workspace / Okta SSO email.
- Revoke Access Safeguard: Immediate session termination and credential invalidation mechanism.

**Available Actions & UI Controls:**
| Control Name | UI Type | Operational Effect |
|:---|:---|:---|
| **Invite Staff Member (Button)** | Interactive Control | Opens invitation modal to provision a new internal account. |
| **Modify Role (Dropdown)** | Interactive Control | Reassigns staff permissions tier with dual-admin confirmation. |
| **Force Password Reset (Button)** | Interactive Control | Invalidates current password and requires reset on next login. |
| **Deactivate Staff Account (Button)** | Interactive Control | Immediately suspends internal access and terminates active JWTs. |

**Step-by-Step Usage Instructions:**
1. Navigate to 'Staff' in the Administration sidebar category.
2. Review the active staff list and verify that all members have 2FA enforced.
3. Click 'Invite Staff Member' and enter their corporate email address and assigned role.
4. To adjust access privileges for an existing member, edit their assigned role in the directory.
5. To instantly revoke access for departing personnel, click 'Deactivate Staff Account'.

**Cross-Navigation & Related Pages:** `/admin/settings`, `/admin/audit`, `/admin/users`

> [!NOTE] **Operational Limitations & Implementation Stubs:**  
> Modification of Super Admin accounts or RBAC role permissions requires dual-administrator sign-off to prevent unilateral privilege escalation.

---

#### <a id='page-47-global-platform-preferences-security-baselines'></a>47. Global Platform Preferences & Security Baselines
**URL:** `/admin/settings`  
**Module:** Administration, Access Control & Authentication  
**Operational Verification Status:** Verified Active (HTTP 200)

![Global Platform Preferences & Security Baselines UI Interface](screenshots/47-settings.png)
*Figure 47: Live Interface of Global Platform Preferences & Security Baselines (`/admin/settings`)*

**Purpose & Business Objective:**  
Configures enterprise platform preferences, security policies, password complexity rules, session timeout thresholds, and corporate branding.

**Primary Administrative Tasks:**
- Setting platform session timeout limits (e.g. 15-minute inactivity lock for admin sessions).
- Configuring password complexity standards, lockout thresholds, and 2FA requirements.
- Managing corporate contact info, legal entity details, and support escalation emails.
- Configuring IP allowlists for administrative portal access.

**Main UI Features & Data Components:**
- Settings Category Tabs: General & Branding, Security & Authentication, Email & Communications, Compliance & Legal, and API Security.
- Security Configuration Form: Password Length, Special Character Requirements, Max Failed Login Attempts (5), and Session Inactivity Timeout (Minutes).
- IP Allowlist Management: List of authorized corporate CIDR blocks permitted to access the admin portal.
- Branding Customization: Platform Logo, Favicon, Corporate Legal Name, and Default Currency (INR).

**Available Actions & UI Controls:**
| Control Name | UI Type | Operational Effect |
|:---|:---|:---|
| **Save Settings (Button)** | Interactive Control | Persists updated global settings to platform database. |
| **Reset to Defaults (Button)** | Interactive Control | Restores system configuration to default security baselines. |
| **Add Authorized IP (Button)** | Interactive Control | Appends corporate VPN IP address to admin portal allowlist. |

**Step-by-Step Usage Instructions:**
1. Access 'Settings' from the Administration category in the sidebar.
2. Switch between setting category tabs to locate the target configuration area.
3. In the 'Security & Authentication' tab, configure session timeout intervals and password policies.
4. Add your company's VPN IP subnet to the IP Allowlist to restrict administrative portal exposure.
5. Click 'Save Settings' to apply changes platform-wide.

**Cross-Navigation & Related Pages:** `/admin/staff`, `/admin/system`, `/admin/audit`

> [!NOTE] **Operational Limitations & Implementation Stubs:**  
> Changes to security session timeout settings take effect on subsequent user logins.

---

#### <a id='page-48-admin-operational-manual-support-center'></a>48. Admin Operational Manual & Support Center
**URL:** `/admin/help`  
**Module:** Administration, Access Control & Authentication  
**Operational Verification Status:** Verified Active (HTTP 200)

![Admin Operational Manual & Support Center UI Interface](screenshots/48-help.png)
*Figure 48: Live Interface of Admin Operational Manual & Support Center (`/admin/help`)*

**Purpose & Business Objective:**  
Provides internal operational reference documentation, standard operating procedures (SOPs), keyboard shortcut indices, and direct escalation channels for platform administrators.

**Primary Administrative Tasks:**
- Accessing internal SOP guides for complex verification, fraud, and dispute scenarios.
- Reviewing keyboard navigation shortcuts (`Cmd+K`, `/`, `J`, `K`) to maximize operational speed.
- Contacting the internal engineering on-call and DevOps team during platform incidents.
- Downloading offline PDF versions of the Admin User Manual.

**Main UI Features & Data Components:**
- Operational Guide Cards: Step-by-step SOPs covering DPIIT Verification, Dispute Arbitration, Fraud Escalation, and Data Erasure.
- Keyboard Shortcuts Palette: Complete list of global shortcuts for rapid navigation and triage.
- On-Call Engineering Directory: Direct contact numbers and Slack channels for active incident response commanders.
- Manual Download Widget: One-click button to download the latest compiled PDF of the complete Admin User Manual.

**Available Actions & UI Controls:**
| Control Name | UI Type | Operational Effect |
|:---|:---|:---|
| **Open SOP Guide (Button)** | Interactive Control | Displays detailed step-by-step standard operating procedure modal. |
| **Download Admin Manual (PDF)** | Interactive Control | Downloads complete offline PDF documentation package. |
| **Trigger On-Call Alert (Button)** | Interactive Control | Dispatches emergency PagerDuty page to engineering leads. |

**Step-by-Step Usage Instructions:**
1. Access 'Help' from the Administration category in the sidebar.
2. Review the SOP guide corresponding to your current operational task.
3. Practice keyboard shortcuts to accelerate daily review queue processing.
4. In the event of a platform outage or severe bug, use the On-Call Directory to page engineering.
5. Download the offline PDF manual for local archival and compliance reference.

**Cross-Navigation & Related Pages:** `/admin`, `/admin/system`, `/admin/staff`

> [!NOTE] **Operational Limitations & Implementation Stubs:**  
> The On-Call Alert trigger is reserved exclusively for Severity-1 platform incidents impacting financial transactions or data security.

---

#### <a id='page-49-admin-authentication-portal-gatekeeper'></a>49. Admin Authentication Portal & Gatekeeper
**URL:** `/admin/login`  
**Module:** Administration, Access Control & Authentication  
**Operational Verification Status:** Verified Active (HTTP 200)

![Admin Authentication Portal & Gatekeeper UI Interface](screenshots/49-login.png)
*Figure 49: Live Interface of Admin Authentication Portal & Gatekeeper (`/admin/login`)*

**Purpose & Business Objective:**  
Serves as the secure entry gatekeeper, identity challenge, and multi-factor authentication portal protecting all administrative functions.

**Primary Administrative Tasks:**
- Authenticating administrative personnel via corporate credentials and multi-factor authentication (MFA).
- Enforcing rate-limiting and brute-force lockout defenses against unauthorized access attempts.
- Routing administrators through corporate Single Sign-On (SSO / SAML 2.0 / Google Workspace).
- Establishing cryptographically signed, short-lived JWT administrative session tokens.

**Main UI Features & Data Components:**
- Luxury-Technical Authentication Card: Styled in Forma slate navy and warm alabaster with high-security credentials form.
- Multi-Factor Challenge: Secondary prompt for TOTP 6-digit authenticator code or hardware security key (WebAuthn).
- Single Sign-On (SSO) Trigger: One-click corporate Google Workspace / Okta authentication link.
- Security Notice Banner: Displays warning regarding authorized access only and comprehensive audit logging.

**Available Actions & UI Controls:**
| Control Name | UI Type | Operational Effect |
|:---|:---|:---|
| **Sign In with Credentials (Button)** | Interactive Control | Validates email and password, proceeding to 2FA challenge. |
| **Sign In with Google SSO (Button)** | Interactive Control | Initiates OAuth 2.0 corporate authentication flow. |
| **Verify 2FA Code (Button)** | Interactive Control | Validates 6-digit time-based authenticator code and issues session JWT. |
| **Forgot Password (Link)** | Interactive Control | Triggers administrative password recovery workflow. |

**Step-by-Step Usage Instructions:**
1. Navigate to /admin/login on any supported web browser.
2. Enter your authorized administrative email address and secure password.
3. Click 'Sign In' or use 'Sign In with Google SSO' for single sign-on access.
4. When prompted, enter the 6-digit TOTP code generated by your mobile authenticator app.
5. Upon successful verification, you are redirected to the Executive Dashboard (/admin).

**Cross-Navigation & Related Pages:** `/admin`, `/admin/settings`, `/admin/staff`

> [!NOTE] **Operational Limitations & Implementation Stubs:**  
> Administrative accounts lock automatically after 5 consecutive failed authentication attempts and require Super Admin unlock.

---

## 5. End-to-End Operational Workflows

This section documents the 7 standard operating procedures (SOPs) executed by platform administrators to handle complex, multi-page business events.

### Workflow 1: Onboarding, Reviewing, and Verifying a DPIIT Startup
**Objective:** Guide an administrator through reviewing, validating, and approving a newly incorporated startup's DPIIT recognition certificate and corporate legal standing.  
**Involved Routes:** `/admin/verifications`, `/admin/verifications/startup/ver_st_01`, `/admin/organizations/org_01`, `/admin/audit`

**Step-by-Step Execution Sequence:**
- Step 1: Access the Verification Operations Queue at `/admin/verifications` and click the 'Startup Entities' tab to filter pending submissions.
- Step 2: Locate the startup submission (e.g. 'FinFlow Technologies Pvt Ltd') and check the SLA clock pill to ensure review occurs within the 24-hour turnaround window.
- Step 3: Click 'Inspect Document' to open the dual-pane Verification Dossier at `/admin/verifications/startup/ver_st_01`.
- Step 4: Use the zoom and pan controls in the document viewer pane to examine the Ministry of Commerce & Industry DPIIT Certificate, verifying the DIPP recognition number and digital signature.
- Step 5: Cross-check the OCR-extracted data against the official Ministry database preview on the right, confirming that the Corporate Identification Number (CIN) and entity legal name match exactly.
- Step 6: Complete the mandatory inspection checklist items: 'Entity Name Match', 'CIN Active Status', 'Authorized Signatory Verification', and 'Valid Incorporation Date'.
- Step 7: Click 'Approve & Issue Badge'. The platform automatically issues the verified badge, triggers a celebratory notification to the startup founders, and logs the cryptographic approval record in the Audit Trail at `/admin/audit`.

---

### Workflow 2: Triaging Content Moderation Flags and Resolving User Appeals
**Objective:** Standard operating procedure for handling flagged job postings containing misleading salary claims, issuing behavioral strikes, and processing subsequent appeals.  
**Involved Routes:** `/admin/moderation`, `/admin/moderation/MOD-2026-0891`, `/admin/appeals`, `/admin/users/usr_01`

**Step-by-Step Execution Sequence:**
- Step 1: Navigate to `/admin/moderation` and filter the queue by 'Critical' or 'High' severity to prioritize immediate trust risks.
- Step 2: Click on the incident row (e.g. `MOD-2026-0891`) to open the comprehensive Moderation Incident Case File at `/admin/moderation/[id]`.
- Step 3: Inspect the flagged text snippet, highlighted with red tokens indicating matched policy rules (e.g. 'Unrealistic compensation / upfront fee solicitation').
- Step 4: Review the author's historical record in the right-hand panel to determine whether previous strikes have been recorded against this account.
- Step 5: In the Sanction Selector console, choose 'Remove Content & Issue Strike (Level 1)', select the pre-approved legal notification template, and click 'Submit Final Resolution'.
- Step 6: If the employer submits a formal counter-rebuttal, access the Moderation Appeals Queue at `/admin/appeals` and open the linked appeal file.
- Step 7: Evaluate the counter-evidence. If legitimate error occurred, click 'Overturn Penalty & Reinstate'; otherwise, click 'Uphold Penalty' to conclude the case.

---

### Workflow 3: Investigating Fraud Alerts, Freezing Wallets, and Setting Payee Holds
**Objective:** Detecting suspicious financial behavior, multi-account sybil attacks, freezing compromised accounts, and placing holds on outbound disbursements.  
**Involved Routes:** `/admin/fraud`, `/admin/users/usr_01`, `/admin/payouts`, `/admin/audit`

**Step-by-Step Execution Sequence:**
- Step 1: Open the Fraud Detection dashboard at `/admin/fraud` and inspect the high-risk event stream.
- Step 2: Identify high-risk alerts with risk scores >85 (e.g. 'Identical PAN linked to 4 distinct user accounts across disparate IP subnets').
- Step 3: Click on the suspicious user entity to open their 360-degree dossier at `/admin/users/[id]`.
- Step 4: Inspect the Security Audit tab to analyze recent login IPs, device fingerprints, and payment attempts.
- Step 5: Immediately click 'Freeze Wallet & Payouts' in the administrative action bar to halt all outbound capital movement.
- Step 6: Navigate to `/admin/payouts`, select the 'Active Payee Holds' tab, and confirm that the user's pending disbursements have been placed in administrative quarantine.
- Step 7: File an internal forensic note and export the fraud dossier PDF for compliance and banking security review.

---

### Workflow 4: Approving Weekly Payout Batches and Generating Bank NACH/NEFT Manifests
**Objective:** Routine financial operational workflow for verifying talent earnings, auditing statutory TDS tax withholding, and releasing bank disbursement batches.  
**Involved Routes:** `/admin/payouts`, `/admin/payouts/batches/BAT-2026-11-10`, `/admin/billing`, `/admin/audit`

**Step-by-Step Execution Sequence:**
- Step 1: Access Disbursement Operations at `/admin/payouts` every Tuesday at 10:00 AM IST for scheduled weekly batch processing.
- Step 2: Review the headline summary cards to verify Gross Volume, Total TDS Accruals (Section 194J/194C), and Net Disbursement obligations.
- Step 3: Click 'Inspect Batch' on the scheduled batch (e.g. `BAT-2026-11-10`) to open the complete itemized manifest at `/admin/payouts/batches/[id]`.
- Step 4: Review the 42 line items, verifying that all payees possess verified penny-drop bank validations and that TDS deductions match the statutory 10% rate.
- Step 5: If any payee is flagged for incomplete KYC or an active contract dispute, check their individual 'Exclude' box to hold their funds while proceeding with the rest of the batch.
- Step 6: Click 'Download Bank Manifest (CSV)' to generate the banking gateway payment file formatted for corporate net banking bulk upload.
- Step 7: Click 'Authorize & Disburse Batch' and complete secondary hardware security key authentication to transmit release instructions to the banking gateway.

---

### Workflow 5: Fulfilling DPDP Data Subject Access & Erasure Requests (Right to be Forgotten)
**Objective:** Processing statutory privacy requests under the Digital Personal Data Protection Act 2023 within the mandatory 30-day compliance window.  
**Involved Routes:** `/admin/data-requests`, `/admin/data-requests/DSR-2026-041`, `/admin/compliance`, `/admin/audit`

**Step-by-Step Execution Sequence:**
- Step 1: Navigate to `/admin/data-requests` and sort the table by 'Days Remaining' to prioritize tickets nearing statutory SLA deadlines.
- Step 2: Select a pending erasure request (e.g. `DSR-2026-041`) and click 'Open DSR Dossier' to access `/admin/data-requests/[id]`.
- Step 3: Verify that the submitter has completed secondary identity authentication via timestamped Aadhaar OTP verification.
- Step 4: Check the applicant's account to confirm there are no active milestone escrow disputes or outstanding financial obligations.
- Step 5: Review the statutory exceptions notice: financial invoices, tax withholding records, and audit log entries will be preserved for the mandatory 7-year statutory period under Indian law.
- Step 6: Click 'Execute Irreversible Erasure' and confirm the multi-step prompt by entering your administrator password. The platform cryptographic pipeline anonymizes all personal identifiers across profiles, resumes, and search indices.
- Step 7: Click 'Issue Erasure Certificate' to dispatch the signed PDF compliance certificate to the user and log the completion in `/admin/audit`.

---

### Workflow 6: Managing Canary Feature Flag Rollouts and Platform Maintenance Windows
**Objective:** Deploying runtime configuration changes, performing gradual percentage feature rollouts, and placing the platform into emergency maintenance mode.  
**Involved Routes:** `/admin/config`, `/admin/config/new`, `/admin/system`, `/admin/audit`

**Step-by-Step Execution Sequence:**
- Step 1: Navigate to Runtime Configuration at `/admin/config` to inspect active feature flags and canary percentages.
- Step 2: To create a new feature rollout, click 'Create Flag' and enter flag parameters at `/admin/config/new` (e.g. key: `ai_vector_matching_v2`, type: Boolean, target: Employers).
- Step 3: Set the Rollout Strategy to 'Percentage Canary' and set the initial slider to 10% to expose the feature to a pilot cohort.
- Step 4: Click 'Save Configuration'. Monitor system telemetry at `/admin/system` over the next 24 hours to confirm API latency and error rates remain stable.
- Step 5: Gradually advance the rollout slider to 25%, 50%, and finally 100% to achieve full production deployment.
- Step 6: In the event of an infrastructure upgrade or critical database migration, navigate to `/admin/system` and toggle 'Maintenance Mode' to 'Active'.
- Step 7: Verify that external users see the branded maintenance notice while administrative staff maintain access to monitor system diagnostics.

---

### Workflow 7: Publishing Government Grant Opportunities and Calibrating Matching Engine
**Objective:** Publishing a newly announced DPIIT incubator grant, configuring eligibility rules, and tuning vector matching weights to surface ideal startup candidates.  
**Involved Routes:** `/admin/opportunities`, `/admin/opportunities/new`, `/admin/matching`, `/admin/organizations`

**Step-by-Step Execution Sequence:**
- Step 1: Access Government Grants & Opportunities at `/admin/opportunities` and click 'Create New Opportunity'.
- Step 2: Complete the Opportunity Publishing Studio form at `/admin/opportunities/new`, entering program details (e.g. 'DPIIT Seed Fund Scheme - Agritech Cohort 4').
- Step 3: In the Eligibility Matrix, toggle 'DPIIT Recognition Required' to 'Yes', select sector tags ('Agritech', 'Supply Chain'), and set the maximum grant cap to INR 50,00,000.
- Step 4: Specify the application cutoff deadline and click 'Publish Opportunity' to distribute the announcement across the startup ecosystem feed.
- Step 5: Navigate to `/admin/matching` to calibrate the AI vector matching engine to surface relevant startup candidates for the new grant.
- Step 6: Adjust the algorithmic weight sliders to increase 'Domain Relevance' to 45% and test the calibration using the 'Run Match Simulation' sandbox.
- Step 7: Click 'Calibrate Weights' to deploy the updated matching parameters to the live platform recommendation service.

---

## 6. Security, Regulatory Compliance & Data Governance

The platform adheres to stringent Indian and international cybersecurity and statutory data governance benchmarks:

### 1. Digital Personal Data Protection (DPDP) Act 2023 Compliance
- **Purpose Limitation:** User data collected during verification is encrypted and restricted strictly to compliance validation.
- **Automated Consent Logging:** User consent is timestamped and cryptographically logged upon registration and updated terms.
- **Right to Erasure Pipeline:** Automated anonymization replaces personal identifying information (PII) with irreversible hashes while retaining mandatory tax invoices.

### 2. Reserve Bank of India (RBI) Payout & Escrow Directives
- **Nodal Escrow Segregation:** Milestone escrow funds are held in segregated nodal accounts at scheduled commercial banks.
- **Dual-Authorization Controls:** Outbound payout batches exceeding INR 10,00,000 require independent approval from two authorized finance administrators.
- **Penny-Drop Banking Validation:** Destination bank accounts must pass automated penny-drop verification prior to any disbursement.

### 3. Statutory Tax Withholding (TDS Under Income Tax Act)
- **Section 194J:** Automatic 10% withholding applied to professional freelance disbursements.
- **Section 206AA:** Automatic 20% higher rate withholding applied when a payee lacks a verified PAN.
- **Quarterly Form 26Q Export:** Itemized CSV ledgers ready for chartered accountant filing.

### 4. Immutable Administrative Audit Logging
- **Append-Only Ledger:** All administrative actions (approvals, suspensions, config changes) generate immutable SHA-256 chained audit logs.
- **Tamper Evidence:** Audit entries cannot be modified or purged by any role, guaranteeing forensic integrity.

---

## 7. System Troubleshooting & Incident Handling

| Incident Scenario | Root Cause | Immediate Administrative Action | Permanent Resolution |
|:---|:---|:---|:---|
| **Session Expiry Loop on Login** | Stale JWT or clock skew on client browser | Advise admin to clear cookies or use incognito; inspect `/admin/system` NTP clock sync | Super Admin resets admin token session via `/admin/staff` |
| **DPIIT Document OCR Failure** | Low-resolution scan (<150 DPI) or distorted perspective | Click 'Request Correction' in `/admin/verifications/[id]` and specify clear flat scan | Direct founder to re-upload high-res PDF export directly from Startup India portal |
| **Failed Webhook Deliveries** | Partner ATS endpoint timeout (>5000ms) or 500 error | Navigate to `/admin/events`, filter by 'Failed', inspect payload response code | Contact partner technical lead; click 'Retry Failed Event' once endpoint is restored |
| **Payout Batch Rejection by Bank** | Incorrect beneficiary IFSC or name mismatch on penny drop | Inspect batch ledger at `/admin/payouts/batches/[id]`, locate rejected payee | Exclude payee from batch; place payee hold; notify user to update bank credentials |
| **Vector Matching Latency Spike** | Vector database cluster re-indexing or high traffic load | Inspect `/admin/matching` telemetry; check Redis cache hit ratio at `/admin/system` | Temporarily scale vector worker nodes or adjust matching batch concurrency |

---

## 8. Comprehensive Platform Glossary

| Term / Acronym | Platform Definition & Statutory Context |
|:---|:---|
| **DPIIT** | Department for Promotion of Industry and Internal Trade (Ministry of Commerce and Industry, Government of India). The nodal government body responsible for official recognition of Indian startups. |
| **CIN** | Corporate Identification Number. A 21-digit alphanumeric unique identifier assigned by the Ministry of Corporate Affairs (MCA) to all companies registered in India. |
| **GSTIN** | Goods and Services Tax Identification Number. A 15-digit state-wise unique tax identifier used for Indian corporate taxation and invoice generation. |
| **DPDP Act 2023** | Digital Personal Data Protection Act, 2023. India's comprehensive statutory data protection law governing digital personal data processing, consent, and user data rights. |
| **Escrow** | A neutral financial arrangement where platform contract funds are held securely until agreed milestone deliverables are verified and accepted by both parties. |
| **GTV** | Gross Transaction Value. The cumulative monetary value of all transactions, contracts, and subscriptions processed across the platform before fee deductions. |
| **MRR** | Monthly Recurring Revenue. The normalized monthly recurring subscription income generated from active paid plans across employers, talent, and investors. |
| **TDS** | Tax Deducted at Source. Statutory Indian direct tax withheld by the platform on freelancer payouts under Section 194J (professional fees) or Section 194C (contracts). |
| **Section 194J** | Provision of the Indian Income Tax Act mandating a 10% (or 2% for technical fees) TDS withholding on fees paid for professional or technical services. |
| **Section 206AA** | Statutory rule mandating a higher 20% TDS withholding rate when a payee fails to provide a verified and valid Permanent Account Number (PAN). |
| **DSR** | Data Subject Request. Formal legal requests submitted by platform users exercising privacy rights (Access/Export, Rectification, or Erasure) under the DPDP Act. |
| **Right to be Forgotten** | Statutory right allowing individuals to request complete erasure of their personal identity records, subject to statutory tax and financial retention laws. |
| **Cosine Similarity** | A mathematical metric used by the platform's AI vector matching engine to measure the semantic alignment between candidate resumes and job descriptions in high-dimensional embedding space. |
| **Penny Drop** | An automated banking verification API call that deposits INR 1 into a payee's bank account to cryptographically verify beneficiary name and IFSC validity prior to disbursements. |
| **NACH / NEFT** | National Automated Clearing House and National Electronic Funds Transfer. Standardized electronic funds transfer networks administered by the Reserve Bank of India (RBI). |
| **Canary Rollout** | A software release technique where a new feature or algorithmic configuration is initially exposed to a small percentage (e.g. 10%) of users before full deployment. |
| **RBAC** | Role-Based Access Control. Security architecture that restricts administrative system access to authorized users based on predefined organizational roles. |
| **FIDO2 / WebAuthn** | Fast Identity Online standards enabling secure passwordless and multi-factor authentication using hardware security keys (e.g. YubiKeys) and biometric authenticators. |
| **SLA** | Service Level Agreement. Contractually binding or operational performance targets, such as reviewing verifications within 24 hours or resolving high-priority support tickets within 4 hours. |
| **Forma Design System** | The platform's proprietary luxury-technical design language characterized by slate navy (#0F1B2D), warm alabaster (#FAF8F4), antique brass (#B8955A), high information density, and refined micro-interactions. |

---

*End of Admin Portal User Manual — Startup & Talent ERP Platform (v4.2.0-PROD)*