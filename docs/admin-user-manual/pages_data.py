# -*- coding: utf-8 -*-
"""
pages_data.py - Structured Data Definition for all 49 Admin Routes
Contains exhaustive operational metadata, UI controls, step-by-step instructions, and audit status.
"""

MODULES = [
    {
        "id": "module-1",
        "number": 1,
        "name": "Executive Command & Telemetry",
        "description": "High-level platform oversight, key performance indicators (KPIs), real-time revenue velocity, user cohort telemetry, and system-wide operational metrics.",
        "pages": [
            {
                "num": 1,
                "name": "Admin Executive Dashboard",
                "url": "/admin",
                "screenshot": "01-dashboard.png",
                "purpose": "Provides the primary landing cockpit and consolidated operational command center for platform administrators, highlighting critical action queues, revenue health, and platform growth velocity.",
                "used_for": [
                    "Monitoring real-time Gross Transaction Value (GTV) and Monthly Recurring Revenue (MRR).",
                    "Tracking active user counts across Startup Founders, Jobseekers, and Investors.",
                    "Quick-triaging pending action queues (Verifications, Content Moderation, Support Tickets, Milestone Escrow Disputes).",
                    "Viewing recent system-wide platform audit activity."
                ],
                "main_features": [
                    "KPI Metric Cards: Displays Total Users, Verified Startups, Monthly Platform GMV, and Pending Verifications with week-over-week trend indicators.",
                    "Urgent Action Items Grid: Dynamic alert cards linking to pending DPIIT verifications, flagged content incidents, and unresolved payment disputes.",
                    "User Acquisition & Growth Chart: Visual breakdown of registrations across talent, employer, and investor roles.",
                    "Recent Platform Audit Activity Stream: Chronological mini-log of recent administrative actions.",
                    "System Health Status Pill: Live indicator of operational status, API latency, and database connectivity."
                ],
                "actions": [
                    {"control": "Filter Time Range (Dropdown)", "description": "Switches telemetry view between Today, Past 7 Days, Past 30 Days, and All Time."},
                    {"control": "Quick Action: Review Verifications (Button)", "description": "Directly opens the verification queue (/admin/verifications)."},
                    {"control": "Quick Action: Resolve Disputes (Button)", "description": "Navigates directly to active payment disputes (/admin/disputes)."},
                    {"control": "Export Executive Summary (Button)", "description": "Downloads a CSV snapshot of current platform KPIs and health metrics."},
                    {"control": "Global Search Trigger (Cmd+K)", "description": "Opens the command palette for instantaneous route and record navigation."}
                ],
                "steps": [
                    "1. Log in to the Admin Portal; the system defaults to the Executive Dashboard (/admin).",
                    "2. Review the top KPI cards to assess day-over-day changes in GMV, user growth, and active workloads.",
                    "3. Inspect the 'Urgent Action Items' section to identify priority bottlenecks requiring administrative sign-off.",
                    "4. Click on any priority card (e.g., '5 DPIIT Verifications Pending') to navigate immediately to the dedicated resolution view.",
                    "5. Review the 'Recent Audit Activity' feed at the bottom to stay informed on peer administrator actions."
                ],
                "related_pages": ["/admin/analytics", "/admin/verifications", "/admin/moderation", "/admin/audit"],
                "limitations": "Metric trend sparklines reflect mock telemetry when running in local development mode without a production TimescaleDB backend connection."
            },
            {
                "num": 2,
                "name": "Platform Analytics & Telemetry",
                "url": "/admin/analytics",
                "screenshot": "02-analytics.png",
                "purpose": "Delivers deep-dive historical telemetry, role cohort retention analytics, conversion funnel visualization, and geographical distribution across Indian startup hubs.",
                "used_for": [
                    "Analyzing multi-cohort retention curves across Founders, Candidates, and Investors.",
                    "Monitoring job application-to-hire conversion velocity and time-to-fill ratios.",
                    "Evaluating regional platform density across Bengaluru, Delhi-NCR, Mumbai, and Hyderabad.",
                    "Exporting compliance-grade analytics reports for leadership and board presentations."
                ],
                "main_features": [
                    "Cohort Retention Matrix: Heatmap displaying week-by-week user engagement persistence.",
                    "Conversion Funnel Visualization: Step-by-step dropoff analysis from signup to profile completion, job application, interview, and contract signing.",
                    "Revenue Breakdown Charts: Segregation of platform income across subscription plans, milestone escrow fees, and enterprise recruitment services.",
                    "Regional Geographic Distribution: Tier-1 vs. Tier-2 Indian tech hub participation breakdown.",
                    "Granular Date Range & Role Filter Bar: Custom date picker with role-based metric slicing."
                ],
                "actions": [
                    {"control": "Granular Date Range Picker", "description": "Filters telemetry between custom calendar dates with weekly or monthly aggregation."},
                    {"control": "Role Segment Filter", "description": "Toggles data stream between All Roles, Jobseeker Only, Startup Employer Only, and Investor Only."},
                    {"control": "Export Telemetry (CSV/XLSX)", "description": "Generates and downloads raw telemetry data for offline analysis."},
                    {"control": "Cohort Metric Toggle", "description": "Switches the heatmap between Active User Retention and Revenue Retention."}
                ],
                "steps": [
                    "1. Navigate to Analytics via the sidebar navigation under Core Operations.",
                    "2. Select the target time range using the top-right date selector.",
                    "3. Filter by role cohort (e.g., 'Startup Employers') to isolate employer retention and hiring metrics.",
                    "4. Inspect the conversion funnel to detect friction points in candidate onboarding or interview scheduling.",
                    "5. Click 'Export Report' to trigger an automated tabular export of the aggregated datasets."
                ],
                "related_pages": ["/admin", "/admin/billing", "/admin/matching"],
                "limitations": "Geographic map visualizations render aggregated metropolitan statistical areas; Tier-3 granular geolocation requires external IP-intelligence licensing."
            }
        ]
    },
    {
        "id": "module-2",
        "number": 2,
        "name": "Identity & Organization Management",
        "description": "Comprehensive user lifecycle directory, account suspension controls, organization cap table inspection, and corporate entity management.",
        "pages": [
            {
                "num": 3,
                "name": "User Directory & Identity Management",
                "url": "/admin/users",
                "screenshot": "03-users.png",
                "purpose": "Acts as the central identity registry and master directory for all registered accounts across all platform roles (Founders, Talent, Investors, Admins).",
                "used_for": [
                    "Searching and filtering platform users by email, phone, name, role, status, or verification state.",
                    "Executing administrative actions: impersonation, password reset dispatch, email verification override, and account suspension.",
                    "Auditing individual profile completion scores and risk tiers.",
                    "Exporting filtered user manifests for compliance or communications."
                ],
                "main_features": [
                    "Unified User Data Table: Displays User ID, Full Name, Email, Primary Role, Verification Badge, Status (Active, Suspended, Pending), and Join Date.",
                    "Multi-Facet Search & Filter Bar: Instant search with debounced text input, role selector, verification filter, and status dropdown.",
                    "User Quick Drawer: Sliding right-hand drawer showing profile summary, contact info, and activity history without navigating away.",
                    "Bulk Action Toolbar: Enables bulk suspension, role modification, or tag assignment for selected records.",
                    "Pagination & Page Size Controls: Standard 10/25/50/100 records per page navigation."
                ],
                "actions": [
                    {"control": "Search Users Input", "description": "Debounced text query matching name, email, or internal user UUID."},
                    {"control": "Role Filter Dropdown", "description": "Filters directory by Jobseeker, Startup, Investor, or Admin."},
                    {"control": "Verification Status Filter", "description": "Filters by Unverified, Pending, Verified, or Rejected."},
                    {"control": "View Profile Link", "description": "Navigates to the comprehensive user detail dossier (/admin/users/[id])."},
                    {"control": "Account Status Toggle / Ellipsis Menu", "description": "Triggers Account Suspension, Password Reset, or Impersonation session."}
                ],
                "steps": [
                    "1. Navigate to 'Users' under Core Operations in the sidebar.",
                    "2. Enter a name, email address, or user ID in the search input box.",
                    "3. Apply filters (e.g., Role: 'Startup', Verification: 'Pending') to narrow down target profiles.",
                    "4. Click on any user row or name link to open their comprehensive dossier.",
                    "5. To suspend a fraudulent or non-compliant account, click the action menu (...) and select 'Suspend Account', entering the mandatory justification."
                ],
                "related_pages": ["/admin/users/usr_01", "/admin/organizations", "/admin/verifications", "/admin/audit"],
                "limitations": "User impersonation generates an audited temporary JWT session; production impersonation is restricted to Super Admin role with 2FA re-authentication."
            },
            {
                "num": 4,
                "name": "User Dossier & Account Detail",
                "url": "/admin/users/[id]",
                "screenshot": "04-user-detail.png",
                "purpose": "Presents an exhaustive 360-degree dossier for a single user record, detailing personal identity, contact channels, connected organizations, security logs, and associated transactions.",
                "used_for": [
                    "Reviewing detailed identity information (Aadhaar/PAN hash, DPIIT registration links).",
                    "Inspecting associated organization memberships and cap table shareholdings.",
                    "Viewing linked payment cards, payout bank accounts, and billing history.",
                    "Reviewing security log history (login IPs, device fingerprints, password change events).",
                    "Executing administrative status overrides (Suspend, Freeze, Verify, Terminate)."
                ],
                "main_features": [
                    "Profile Header Banner: User avatar, verification badge, current status, user UUID, and primary role badge.",
                    "Tabbed Dossier Navigation: Tabs for Overview, Associated Organizations, Billing & Transactions, Verifications, Security Audit, and Communication History.",
                    "Contact & Identity Card: Verified email, mobile number, emergency contact, and location.",
                    "Activity Timeline: Chronological audit trail of all platform interactions, logins, and contract milestones.",
                    "Administrative Action Panel: High-visibility controls for status toggle, security lock, and direct notification dispatch."
                ],
                "actions": [
                    {"control": "Edit Profile (Button)", "description": "Opens administrative modal to modify user metadata or contact info."},
                    {"control": "Suspend Account (Button)", "description": "Revokes active sessions and blocks platform authentication."},
                    {"control": "Reset Password (Button)", "description": "Dispatches a cryptographic password reset link to verified email."},
                    {"control": "Force 2FA Re-enrollment (Button)", "description": "Clears registered TOTP/authenticator secrets and requires new setup on next login."},
                    {"control": "Download Data Dossier (Button)", "description": "Generates a complete JSON/PDF export for DPDP compliance records."}
                ],
                "steps": [
                    "1. Open a user profile from the User Directory or click a direct profile link.",
                    "2. Review the Overview tab to confirm identity verification and account state.",
                    "3. Switch to 'Associated Organizations' to see employer or startup affiliations.",
                    "4. Switch to 'Security Audit' to inspect recent login IP addresses and device fingerprints.",
                    "5. If administrative intervention is required, select the appropriate action button in the top action bar and confirm."
                ],
                "related_pages": ["/admin/users", "/admin/verifications", "/admin/organizations", "/admin/audit"],
                "limitations": "Direct field editing for Aadhaar/PAN identity hashes is cryptographically restricted to preserve statutory compliance under Indian data governance standards."
            },
            {
                "num": 5,
                "name": "Organization Directory",
                "url": "/admin/organizations",
                "screenshot": "44-organizations.png",
                "purpose": "Serves as the enterprise repository of all registered startups, companies, recruitment agencies, and venture funds operating on the platform.",
                "used_for": [
                    "Reviewing company legal names, Corporate Identification Numbers (CIN), GSTIN, and DPIIT recognition numbers.",
                    "Monitoring organization operational health, team size, active job postings, and total payroll/disbursement volume.",
                    "Verifying corporate incorporation certificates and DPIIT startup recognition documents.",
                    "Toggling organization operational status (Active, Under Review, Delisted, Suspended)."
                ],
                "main_features": [
                    "Organization Data Table: Displays Org Name, Logo, Legal Entity Type (Pvt Ltd, LLP, Sole Prop), DPIIT Status, Active Jobs Count, Total Team Size, and Health Status.",
                    "Entity Filter Bar: Filter by DPIIT Recognized, Seed Funded, Series A+, Bootstrapped, or Verification Status.",
                    "Quick Detail Drawer: Slides in from the right with quick corporate snapshot, founder contact, and primary bank details.",
                    "Export Organizations Roster: Generates CSV export for compliance and partnership reporting."
                ],
                "actions": [
                    {"control": "Search Organizations", "description": "Searches by company name, CIN, GSTIN, or registered domain."},
                    {"control": "DPIIT Filter Toggle", "description": "Filters exclusively for DPIIT Startup India recognized entities."},
                    {"control": "View Org Dossier (Button/Link)", "description": "Navigates to the detailed organization dossier (/admin/organizations/[id])."},
                    {"control": "Change Status Dropdown", "description": "Modifies legal status (Verified, Suspended, Pending Review)."}
                ],
                "steps": [
                    "1. Navigate to Organizations in the sidebar navigation.",
                    "2. Search for the target startup by brand name, legal entity name, or CIN.",
                    "3. Review the DPIIT badge and verification state directly in the table.",
                    "4. Click on the organization name to open the comprehensive Organization Dossier.",
                    "5. To modify verification or compliance standing, use the inline status selector or dossier action menu."
                ],
                "related_pages": ["/admin/organizations/org_01", "/admin/verifications", "/admin/users", "/admin/opportunities"],
                "limitations": "CIN and GSTIN validation checks query the cached MCA/GST database; real-time live MCA portal lookups depend on the MCA API integration bridge."
            },
            {
                "num": 6,
                "name": "Organization Dossier & Cap Table Inspection",
                "url": "/admin/organizations/[id]",
                "screenshot": "45-organization-detail.png",
                "purpose": "Provides granular administrative inspection of a corporate entity's legal filings, founder team members, active job contracts, cap table structure, and financial billing standing.",
                "used_for": [
                    "Inspecting official MCA incorporation certificates, MoA, AoA, and DPIIT certificates.",
                    "Reviewing all associated team members, invited recruiters, and their platform roles.",
                    "Auditing active job postings, contract milestones, and escrow balances.",
                    "Inspecting linked bank accounts and automated NACH mandate statuses."
                ],
                "main_features": [
                    "Corporate Header: Entity legal name, trade name, CIN, GSTIN, DPIIT Recognition number, and incorporation date.",
                    "Tabbed Workspace: Tabs for Corporate Overview, Team Members & RBAC, Active Postings, Contracts & Escrow, Compliance Filings, and Billing Ledger.",
                    "Key Personnel & Founders Card: Identifies primary directors, DINs, verified founders, and emergency administrative contacts.",
                    "Financial Summary Panel: Lifetime GMV, active escrow balance, and pending disbursements.",
                    "Corporate Action Bar: Quick buttons to approve verification, request additional documentation, freeze hiring, or suspend organization."
                ],
                "actions": [
                    {"control": "Approve DPIIT Standing (Button)", "description": "Marks the organization as verified with official DPIIT badge."},
                    {"control": "Request Document Resubmission (Button)", "description": "Dispatches an email request to founders detailing required revisions."},
                    {"control": "Freeze Organization Hiring (Button)", "description": "Temporarily hides active job postings and halts new contract generation."},
                    {"control": "Manage Team Members (Modal Trigger)", "description": "Allows admin to reassign primary owner or revoke rogue team accounts."},
                    {"control": "Download Legal Audit Package (Button)", "description": "Exports bundled PDF archive of all uploaded corporate certificates."}
                ],
                "steps": [
                    "1. Open the target organization record from the Organization Directory.",
                    "2. Inspect the Corporate Overview tab to verify CIN, GSTIN, and DPIIT credentials.",
                    "3. Open the Compliance Filings tab to review uploaded Certificate of Incorporation and PAN documents.",
                    "4. Review the Team Members tab to confirm legitimate authorized signatories.",
                    "5. Click 'Approve DPIIT Standing' if all documents meet Ministry of Commerce standards, or 'Request Resubmission' if errors exist."
                ],
                "related_pages": ["/admin/organizations", "/admin/verifications", "/admin/billing", "/admin/audit"],
                "limitations": "Cap table valuation numbers are self-reported by founders during funding rounds; they do not constitute formal statutory valuations under Rule 11UA."
            }
        ]
    },
    {
        "id": "module-3",
        "number": 3,
        "name": "Verification & DPIIT Accreditation",
        "description": "Multi-stage verification workflows, document authentication, DPIIT recognition checks, and automated recertification tracking.",
        "pages": [
            {
                "num": 7,
                "name": "Verification Operations Queue",
                "url": "/admin/verifications",
                "screenshot": "05-verifications.png",
                "purpose": "Manages the multi-tiered verification pipeline for startups, individual talent, and accredited investors seeking verified badges on the platform.",
                "used_for": [
                    "Triaging pending identity and corporate verification submissions.",
                    "Reviewing document validity against government registries (MCA, DPIIT, UIDAI, Income Tax).",
                    "Approving, rejecting, or requesting clarification on submitted credentials.",
                    "Monitoring SLA compliance for pending verification tickets (target: <24h turnaround)."
                ],
                "main_features": [
                    "Queue Status Counters: Displays Pending Review, Under Inspection, Needs Clarification, and Approved Today.",
                    "Tabbed Queue Filter: Toggle between All, Startup Entities, Individual Talent (ID/Degree), and Accredited Investors.",
                    "Verification Data Table: Submitter Name, Entity Type, Submitted Document Types, Submission Timestamp, SLA Timer, and Risk Score.",
                    "Quick Review Drawer: Fast preview of submitted PDF/images with zoom, rotate, and decision action buttons.",
                    "Bulk Triage Actions: Batch approve low-risk, automated-verified credentials."
                ],
                "actions": [
                    {"control": "Inspect Document (Button)", "description": "Opens the dedicated verification review dossier (/admin/verifications/[type]/[id])."},
                    {"control": "Quick Approve (Button)", "description": "Instantly approves verification and issues platform verified badge."},
                    {"control": "Request Additional Info (Button)", "description": "Opens prompt to specify missing documents or unreadable scans."},
                    {"control": "Reject Submission (Button)", "description": "Rejects submission with mandatory regulatory reason code."},
                    {"control": "View Expiring List (Button/Tab)", "description": "Navigates to the expiring certifications queue (/admin/verifications/expiring)."}
                ],
                "steps": [
                    "1. Access the Verification Queue from Core Operations in the sidebar.",
                    "2. Select the queue tab corresponding to your review focus (e.g., 'Startup Entities').",
                    "3. Click on the first row with an impending SLA breach (indicated by amber/red clock pill).",
                    "4. Review the attached document preview and automated OCR matching score.",
                    "5. Click 'Quick Approve' if all criteria are satisfied, or click 'Inspect Document' for deep multi-page review."
                ],
                "related_pages": ["/admin/verifications/startup/ver_st_01", "/admin/verifications/expiring", "/admin/organizations", "/admin/users"],
                "limitations": "Automated OCR extraction provides initial confidence scores; manual administrative sign-off is mandatory for all DPIIT corporate certifications."
            },
            {
                "num": 8,
                "name": "Verification Dossier & Document Inspection",
                "url": "/admin/verifications/[type]/[id]",
                "screenshot": "06-verification-detail.png",
                "purpose": "Delivers an immersive, dual-pane document inspection workbench allowing examiners to cross-reference submitted legal documents against government registries side by side.",
                "used_for": [
                    "Performing high-resolution visual inspection of Certificates of Incorporation, DPIIT certificates, and PAN cards.",
                    "Cross-referencing OCR-extracted text against claimed entity registration data.",
                    "Viewing automated anti-tamper, metadata, and image manipulation forensics.",
                    "Issuing formal verification approvals, rejections, or document deficiency notices."
                ],
                "main_features": [
                    "Split Workbench Layout: High-res interactive PDF/Image viewer on the left; structured claim data and inspection checklist on the right.",
                    "Document Forensics Panel: Shows file metadata, creation date, editing software signatures, and OCR text overlay.",
                    "Registry Validation Widget: Displays live or cached MCA/DPIIT lookup status, matching legal names and CIN.",
                    "Mandatory Checklist Items: Checkboxes for Entity Name Match, CIN Active Status, Authorized Signatory Match, and Expiry Date Check.",
                    "Decision Action Bar: High-contrast buttons for 'Approve & Issue Badge', 'Request Re-upload', and 'Reject with Prejudice'."
                ],
                "actions": [
                    {"control": "PDF Viewer Controls", "description": "Zoom in/out, fit-to-width, rotate 90°, and download original high-res copy."},
                    {"control": "Checklist Toggles", "description": "Must check all mandatory validation boxes before approval button unlocks."},
                    {"control": "Approve Verification (Button)", "description": "Finalizes verification, unlocks verified badge, and logs audit record."},
                    {"control": "Request Correction (Modal Trigger)", "description": "Dispatches detailed feedback to user with upload link."},
                    {"control": "Reject (Modal Trigger)", "description": "Permanently rejects submission and flags account for potential fraud."}
                ],
                "steps": [
                    "1. Open a verification dossier from the main queue.",
                    "2. Zoom in on the document viewer to inspect seal, digital signature, and certificate authenticity.",
                    "3. Compare the legal name, CIN, and date on the certificate with the platform record displayed on the right.",
                    "4. Complete the mandatory inspection checklist items.",
                    "5. Click 'Approve & Issue Badge' to conclude the review and notify the applicant."
                ],
                "related_pages": ["/admin/verifications", "/admin/organizations/org_01", "/admin/audit"],
                "limitations": "Digital signature verification checks standard X.509 Adobe PKI signatures; DSC USB dongle validation requires external cryptographic middleware."
            },
            {
                "num": 9,
                "name": "Expiring Verifications & Recertification",
                "url": "/admin/verifications/expiring",
                "screenshot": "07-verifications-expiring.png",
                "purpose": "Tracks recurring credentials, annual compliance renewals, and expiring DPIIT recognitions to ensure platform directory integrity.",
                "used_for": [
                    "Monitoring startup DPIIT certificates nearing their statutory 10-year expiration or turnover thresholds.",
                    "Tracking annual GSTIN active status confirmations and corporate filings.",
                    "Dispatching automated recertification reminders to founders and organizations.",
                    "Grace-period management and automatic badge revocation for non-renewed entities."
                ],
                "main_features": [
                    "Expiration Horizon Buckets: Tabs for Expiring in 30 Days, 60 Days, 90 Days, and Already Expired.",
                    "Expiring Roster Table: Organization Name, Certificate Type, Original Verification Date, Expiry Date, Days Remaining, and Grace Period Status.",
                    "Automated Reminder Cadence Monitor: Shows timestamps of dispatched email and SMS notifications.",
                    "Bulk Reminder Dispatcher: Allows one-click broadcast of renewal notifications to all organizations in the selected cohort."
                ],
                "actions": [
                    {"control": "Send Renewal Reminder (Button)", "description": "Sends prioritized email and dashboard alert to organization owner."},
                    {"control": "Extend Grace Period (Modal Trigger)", "description": "Grants 15, 30, or 45-day extension upon receipt of pending MCA proof."},
                    {"control": "Revoke Verification Badge (Button)", "description": "Immediately downgrades account badge to unverified status."},
                    {"control": "Export Expiry Schedule (Button)", "description": "Downloads upcoming expiration timeline as CSV."}
                ],
                "steps": [
                    "1. Navigate to 'Expiring Verifications' via the top tab on the Verifications page.",
                    "2. Review the 'Expiring in 30 Days' tab to identify organizations requiring immediate action.",
                    "3. Check the communication log to see if previous automated reminders were delivered.",
                    "4. If a founder requested more time, click 'Extend Grace Period' and log the reason.",
                    "5. For entities that fail to provide renewed documents post-deadline, click 'Revoke Badge'."
                ],
                "related_pages": ["/admin/verifications", "/admin/organizations", "/admin/audit"],
                "limitations": "Grace period extensions are capped at a maximum cumulative total of 90 days per statutory guidelines."
            }
        ]
    },
    {
        "id": "module-4",
        "number": 4,
        "name": "Trust, Safety & Risk Governance",
        "description": "Content moderation pipelines, behavioral strike enforcement, escrow dispute resolution, automated fraud detection, and AI quality oversight.",
        "pages": [
            {
                "num": 10,
                "name": "Content & Behavior Moderation Queue",
                "url": "/admin/moderation",
                "screenshot": "08-moderation.png",
                "purpose": "Acts as the operational center for triaging flagged job descriptions, user bios, message transcripts, and portfolio content that violate platform trust standards.",
                "used_for": [
                    "Reviewing automated AI-flagged content (hate speech, fraudulent job offers, phishing links, PII leakage).",
                    "Evaluating user-reported content escalated by candidates or employers.",
                    "Enforcing content removals, user warnings, temporary mutes, and permanent platform bans.",
                    "Maintaining platform communication hygiene and safe marketplace standards."
                ],
                "main_features": [
                    "Severity Triage Matrix: Filter by Critical (immediate danger/fraud), High (blatant policy breach), Medium, and Low.",
                    "Moderation Incidents Table: Incident ID, Content Type (Job Post, User Bio, Direct Message), Reported By, Flag Reason, AI Confidence Score, and Age.",
                    "Quick Diff & Snippet Preview: Highlights offending text strings in high-visibility red highlight with regex/AI tag.",
                    "Moderator Action Bar: Quick Approve Content, Remove Content, Issue Strike to Author, or Escalate to Legal."
                ],
                "actions": [
                    {"control": "Severity Filter Tabs", "description": "Toggles queue between All, Critical, High, Medium, and Low."},
                    {"control": "Open Incident Dossier (Button)", "description": "Opens comprehensive case file (/admin/moderation/[id])."},
                    {"control": "Dismiss Flag (Button)", "description": "Determines content is benign, dismisses alert, and restores full visibility."},
                    {"control": "Remove & Warn (Button)", "description": "Removes violating content and logs an official strike against author."},
                    {"control": "Emergency Suspend User (Button)", "description": "Immediately disables user login and hides all associated postings."}
                ],
                "steps": [
                    "1. Access 'Moderation' from the Governance & Risk sidebar section.",
                    "2. Filter by 'Critical' or 'High' severity to handle immediate safety risks first.",
                    "3. Review the highlighted offending snippet and AI policy classification.",
                    "4. If the incident is complex or involves multiple parties, click 'Open Incident Dossier'.",
                    "5. Choose the appropriate enforcement action: Dismiss, Remove, or Suspend, providing mandatory internal rationale."
                ],
                "related_pages": ["/admin/moderation/MOD-2026-0891", "/admin/reports", "/admin/appeals", "/admin/policies"],
                "limitations": "Direct message transcript inspection is restricted to messages explicitly reported by a conversation participant in compliance with DPDP privacy guidelines."
            },
            {
                "num": 11,
                "name": "Moderation Incident Case File",
                "url": "/admin/moderation/[id]",
                "screenshot": "09-moderation-detail.png",
                "purpose": "Provides a comprehensive evidentiary case file for a specific content violation, including historical strike records, author profile context, and conversation logs.",
                "used_for": [
                    "Investigating multi-party harassment or contract violation incidents.",
                    "Reviewing author violation history, previous warnings, and account longevity.",
                    "Evaluating full context around flagged job posts or portfolio assets.",
                    "Formulating customized sanction notices and logging immutable audit proofs."
                ],
                "main_features": [
                    "Case Header: Incident ID (e.g., MOD-2026-0891), Timestamp, Assigned Moderator, Priority Badge, and Status.",
                    "Offending Content Deep Dive: Full unaltered text with highlighted flagged tokens, matched rule names, and AI confidence telemetry.",
                    "Author Risk Dossier: Account creation date, verification standing, previous strikes count, and active job/contract volume.",
                    "Reporter Testimony: User statement, category selection, and optional attached screenshot proofs.",
                    "Administrative Action Console: Radio buttons for Sanction Level (Warning, 7-Day Mute, 30-Day Suspension, Permanent Ban), with custom message builder."
                ],
                "actions": [
                    {"control": "Sanction Selector", "description": "Selects penalty tier: No Action, Formal Warning, Content Takedown, Temporary Suspension, Permanent Ban."},
                    {"control": "Notification Template Dropdown", "description": "Selects standard legal notification template to send to the offending user."},
                    {"control": "Submit Final Resolution (Button)", "description": "Executes sanction, removes content, updates database, and notifies parties."},
                    {"control": "Escalate to Legal Council (Button)", "description": "Marks case as privileged and reassigns to platform legal officers."}
                ],
                "steps": [
                    "1. Open an incident from the Moderation Queue.",
                    "2. Read the full context of the flagged content and review reporter evidence.",
                    "3. Inspect the author's previous strike history in the right-hand panel.",
                    "4. Select the sanction level that matches platform policy guidelines for the offense.",
                    "5. Input custom administrative rationale and click 'Submit Final Resolution'."
                ],
                "related_pages": ["/admin/moderation", "/admin/users/usr_01", "/admin/policies", "/admin/audit"],
                "limitations": "Permanent ban actions trigger an automated lockout across all verified phone numbers and PAN hashes linked to the individual."
            },
            {
                "num": 12,
                "name": "User Reports & Violation Submissions",
                "url": "/admin/reports",
                "screenshot": "10-reports.png",
                "purpose": "Consolidates all direct user-submitted complaints regarding job scams, abusive behavior, impersonation, or intellectual property infringements.",
                "used_for": [
                    "Triage and intake of user reports submitted via candidate and employer apps.",
                    "Detecting emerging scam patterns, phantom job postings, and credential harvesting.",
                    "Assigning investigative ownership to specific trust and safety specialists.",
                    "Tracking report resolution metrics and reporter feedback loops."
                ],
                "main_features": [
                    "Category Filter Pills: Scam/Fraud, Inappropriate Content, Harassment, Fake Profile, IP Infringement, and Spam.",
                    "Reports Table: Report ID, Target Entity, Reporter User, Category, Attached Evidence Count, Status, and Timestamp.",
                    "Reporter Credibility Index: Shows reporter's historical accuracy score to prioritize high-trust whistleblowers.",
                    "Batch Assignment Dropdown: Reassigns batches of reports to specialized investigation squads."
                ],
                "actions": [
                    {"control": "Category Filter", "description": "Filters reports by primary grievance category."},
                    {"control": "Assign to Me (Button)", "description": "Claims case ownership and locks ticket for other moderators."},
                    {"control": "Create Moderation Incident (Button)", "description": "Converts verified report into an actionable moderation case."},
                    {"control": "Close as Inconclusive (Button)", "description": "Dismisses report with automated notice to reporter."}
                ],
                "steps": [
                    "1. Access 'Reports' under Governance & Risk.",
                    "2. Filter by category (e.g., 'Scam/Fraud') to review critical marketplace integrity threats.",
                    "3. Open the report details to inspect attached screenshots and chat logs submitted by the user.",
                    "4. If credible violation evidence exists, click 'Create Moderation Incident' to initiate formal enforcement.",
                    "5. Otherwise, close the report with an appropriate explanatory note."
                ],
                "related_pages": ["/admin/moderation", "/admin/disputes", "/admin/fraud"],
                "limitations": "Users who submit three consecutive false/malicious reports are automatically flagged for abuse of the reporting system."
            },
            {
                "num": 13,
                "name": "Moderation Appeals & Reinstatement Queue",
                "url": "/admin/appeals",
                "screenshot": "11-appeals.png",
                "purpose": "Provides procedural due process for users and organizations appealing against content removals, profile strikes, or temporary suspensions.",
                "used_for": [
                    "Reviewing written user appeals and counter-evidence against administrative sanctions.",
                    "Evaluating potential false positives generated by automated AI moderation filters.",
                    "Reinstating wrongfully suspended accounts and clearing strikes from user dossiers.",
                    "Maintaining transparency and statutory procedural fairness under Indian digital intermediary guidelines."
                ],
                "main_features": [
                    "Appeals Status Filters: Pending Review, Under Senior Inspection, Overturned (Reinstated), and Upheld (Denied).",
                    "Appeals Table: Appeal ID, Original Incident ID, User Name, Penalty Appealed, Submission Date, and Assigned Reviewer.",
                    "Split Comparison View: Shows original violation evidence side by side with the user's rebuttal and attached documents.",
                    "Strike Removal Action Control: One-click mechanism to overturn sanction, restore content, and issue an apology notice."
                ],
                "actions": [
                    {"control": "Review Appeal (Button)", "description": "Opens the dual-pane appeal adjudication workbench."},
                    {"control": "Overturn Penalty & Reinstate (Button)", "description": "Reverses strike, reactivates account/content, and updates trust score."},
                    {"control": "Uphold Penalty (Button)", "description": "Confirms sanction; dispatches final written decision to appellant."},
                    {"control": "Escalate to Trust Lead (Button)", "description": "Refers appeal to Senior Operations Director for final determination."}
                ],
                "steps": [
                    "1. Open the Appeals Queue from the Governance & Risk sidebar.",
                    "2. Review the pending appeals, prioritizing account suspension cases.",
                    "3. Read the user's written appeal and examine any uploaded counter-evidence (e.g., proof of IP ownership).",
                    "4. Cross-reference against the original moderation incident case notes.",
                    "5. Select 'Overturn' if the penalty was unwarranted, or 'Uphold' if the policy violation stands."
                ],
                "related_pages": ["/admin/moderation", "/admin/users", "/admin/audit"],
                "limitations": "Users are permitted a maximum of one formal appeal per moderation incident; rejected appeals are final unless mandated by court order."
            },
            {
                "num": 14,
                "name": "Milestone & Escrow Dispute Resolution",
                "url": "/admin/disputes",
                "screenshot": "12-disputes.png",
                "purpose": "Serves as the arbitration tribunal and escrow adjudication workbench for financial contract disputes between startup employers and freelance talent.",
                "used_for": [
                    "Arbitrating contested milestone deliverables, incomplete work claims, or non-payment disputes.",
                    "Inspecting contract terms, agreed milestone deliverables, and submitted code/deliverable repositories.",
                    "Executing binding escrow disbursements: full refund to employer, full release to candidate, or split settlement.",
                    "Preventing payment defaults and maintaining financial marketplace trust."
                ],
                "main_features": [
                    "Disputed Escrow Capital Counter: Total INR funds currently locked in contested escrow status.",
                    "Disputes Data Table: Dispute ID, Contract Title, Employer, Talent, Disputed Amount, Days Open, and Stage (Mediation, Formal Arbitration, Resolved).",
                    "Deliverables & Communications Ledger: Chronological review of milestone submissions, revisions requested, and chat negotiations.",
                    "Escrow Settlement Split Slider: Interactive slider allowing arbitrated fund division (e.g., 60% Talent / 40% Employer).",
                    "Binding Decision Generator: Generates formal arbitration award document with legal justification."
                ],
                "actions": [
                    {"control": "Inspect Contract Details (Button)", "description": "Opens contract terms, scope of work, and milestone schedule."},
                    {"control": "Release 100% to Talent (Button)", "description": "Disburses full escrow funds to the worker's wallet/bank."},
                    {"control": "Refund 100% to Employer (Button)", "description": "Returns full escrow funds to the employer's source payment method."},
                    {"control": "Execute Split Settlement (Button)", "description": "Disburses custom percentage split between both parties."},
                    {"control": "Request Third-Party Technical Audit (Button)", "description": "Assigns external code reviewer to assess deliverable quality."}
                ],
                "steps": [
                    "1. Navigate to Disputes under Governance & Risk.",
                    "2. Select a dispute case to review the locked escrow amount and contract timeline.",
                    "3. Inspect the submitted deliverable (code repository, designs, documents) against the initial scope of work.",
                    "4. Review the back-and-forth chat history between employer and talent to determine fault or bad faith.",
                    "5. Choose the appropriate financial settlement (Full Release, Full Refund, or Split) and submit with formal arbitration notes."
                ],
                "related_pages": ["/admin/payouts", "/admin/billing", "/admin/audit"],
                "limitations": "Escrow releases exceeding INR 5,00,000 require secondary approval from the Senior Finance Administrator before bank disbursement."
            },
            {
                "num": 15,
                "name": "Fraud Detection & Risk Analysis",
                "url": "/admin/fraud",
                "screenshot": "13-fraud.png",
                "purpose": "Monitors automated fraud telemetry, payment risk anomalies, suspicious login clusters, and coordinated bot activity across the ecosystem.",
                "used_for": [
                    "Detecting high-velocity card testing, chargeback anomalies, and payment fraud.",
                    "Identifying sybil identity clusters sharing identical bank accounts, PAN numbers, or IP subnets.",
                    "Reviewing automated machine-learning risk scores on transactions and new registrations.",
                    "Freezing compromised wallets and adding malicious entities to global platform blocklists."
                ],
                "main_features": [
                    "Fraud Risk KPI Cards: Active High-Risk Entities, Suspicious Volume (INR), Blocked Attempts (Past 24h), and Chargeback Rate (%).",
                    "Risk Event Stream: Real-time telemetry feed of high-risk triggers (e.g., 'Same PAN used on 4 distinct accounts').",
                    "Entity Risk Graph: Visual association map connecting shared IPs, devices, and bank accounts between suspect users.",
                    "Rapid Defense Actions: One-click wallet freeze, payout hold, and account termination mechanisms."
                ],
                "actions": [
                    {"control": "Freeze Wallet & Payouts (Button)", "description": "Immediately locks funds and prevents withdrawal requests."},
                    {"control": "Block IP / Device Fingerprint (Button)", "description": "Adds hardware/network hash to platform edge firewall blocklist."},
                    {"control": "Mark as Whitelist / False Positive (Button)", "description": "Lowers risk score and clears alert for legitimate verified users."},
                    {"control": "Export Fraud Dossier (Button)", "description": "Exports packaged forensic PDF for cybercrime or banking partner reporting."}
                ],
                "steps": [
                    "1. Navigate to Fraud under Governance & Risk.",
                    "2. Examine the risk score distribution and select high-priority alerts with risk score >85.",
                    "3. Inspect the entity association graph to identify multi-account rings or shared banking details.",
                    "4. If suspicious money laundering or fraudulent billing is detected, click 'Freeze Wallet & Payouts'.",
                    "5. Submit incident summary and file appropriate SAR (Suspicious Activity Report) documentation."
                ],
                "related_pages": ["/admin/payouts", "/admin/users", "/admin/policies", "/admin/audit"],
                "limitations": "Machine learning risk scoring updates every 15 minutes; critical payment gateway alerts stream via real-time WebSocket connection."
            },
            {
                "num": 16,
                "name": "Automated Trust Policies & Guardrails",
                "url": "/admin/policies",
                "screenshot": "14-policies.png",
                "purpose": "Configures automated platform safety rules, regex filters, keyword blocklists, rate limits, and zero-tolerance policy triggers.",
                "used_for": [
                    "Managing active policy rules for content screening and behavioral monitoring.",
                    "Updating platform dictionaries of prohibited terms, slurs, and PII patterns (Aadhaar/PAN regex).",
                    "Configuring automated action thresholds (e.g., auto-hide job post if >5 user flags received).",
                    "Testing rules in a real-time sandbox before deploying to production."
                ],
                "main_features": [
                    "Policy Rules Catalog: Active rules covering Scam Detection, Contact Info Leakage, Harassment, and Impersonation.",
                    "Tabbed Policy Engine: Tabs for Policy Rules, Automatic Checks, Blocklists & Dictionaries, and Rule Test Sandbox.",
                    "Rule Configuration Drawer: Modal allowing rule tuning: sensitivity slider, trigger regex, target roles, and automated consequence.",
                    "Interactive Rule Test Sandbox: Input test text to verify regex matches and rule firing before activation."
                ],
                "actions": [
                    {"control": "Create Policy Rule (Button)", "description": "Opens rule authoring modal to define new guardrails."},
                    {"control": "Rule Toggle Switch", "description": "Instantly enables or disables a policy rule in the live engine."},
                    {"control": "Edit Rule (Button)", "description": "Modifies regex patterns, action triggers, or severity level."},
                    {"control": "Test in Sandbox (Button)", "description": "Evaluates candidate rules against historical sample datasets."}
                ],
                "steps": [
                    "1. Access 'Policies' from the Governance & Risk sidebar menu.",
                    "2. Review existing rules and their 30-day trigger statistics.",
                    "3. To update prohibited keywords, switch to the 'Blocklists & Dictionaries' tab and edit the target list.",
                    "4. Use the 'Rule Test Sandbox' tab to paste sample text and confirm accurate pattern matching.",
                    "5. Enable the rule toggle to deploy changes across all ingestion pipelines."
                ],
                "related_pages": ["/admin/moderation", "/admin/ai-quality", "/admin/config"],
                "limitations": "Policy rule changes propagate to edge worker caches within 60 seconds of activation."
            },
            {
                "num": 17,
                "name": "AI Quality Control & Human Review",
                "url": "/admin/ai-quality",
                "screenshot": "15-ai-quality.png",
                "purpose": "Supervises platform AI models (Gemini, matching engines, resume parsers) through human-in-the-loop validation, bias monitoring, and prompt versioning.",
                "used_for": [
                    "Reviewing model generation quality for automated job descriptions and candidate match summaries.",
                    "Auditing candidate matching scores to detect demographic, gender, or institutional bias.",
                    "Rating model outputs (1-5 stars) to build fine-tuning datasets for future model iterations.",
                    "Managing active prompt templates and model version bindings."
                ],
                "main_features": [
                    "Model Performance Telemetry: Average Acceptance Rate (%), Hallucination Flag Count, and Latency Metrics.",
                    "Tabbed Quality Engine: Tabs for Human Review Queue, Bias & Drift Monitoring, and Model & Prompt Registry.",
                    "Review Queue Table: Evaluation ID, Task Type (Match Rationale, Resume Parse, JD Generation), Model Used, Confidence Score, and Status.",
                    "Quality Rating Console: Direct thumbs-up / thumbs-down and 5-star rubric scoring for administrators."
                ],
                "actions": [
                    {"control": "Inspect Generation (Button)", "description": "Opens detailed evaluation dossier (/admin/ai-quality/reviews/[id])."},
                    {"control": "Approve Generation (Button)", "description": "Validates model response as high-quality training exemplar."},
                    {"control": "Flag Hallucination / Bias (Button)", "description": "Marks response for model retraining and prompts prompt engineering team."},
                    {"control": "Switch Active Model Version", "description": "Updates production model binding between Gemini-Flash and Gemini-Pro."}
                ],
                "steps": [
                    "1. Open 'AI Quality' from Governance & Risk.",
                    "2. Inspect the Human Review Queue for low-confidence (<75%) model outputs.",
                    "3. Click 'Inspect Generation' to review the user prompt, input context, and generated output.",
                    "4. Score the output on accuracy, tone, and safety using the star rating widget.",
                    "5. If bias or hallucination is observed, click 'Flag for Retraining' and select the defect category."
                ],
                "related_pages": ["/admin/ai-quality/reviews/REV-2026-081", "/admin/matching", "/admin/policies"],
                "limitations": "Human review queue samples a configurable 2% random baseline of all platform AI generations to maintain statistical quality bounds."
            },
            {
                "num": 18,
                "name": "AI Evaluation Dossier & Model Feedback",
                "url": "/admin/ai-quality/reviews/[id]",
                "screenshot": "16-ai-review-detail.png",
                "purpose": "Provides a comprehensive inspection environment for deep analysis of an individual model inference event, prompt tokens, and safety scores.",
                "used_for": [
                    "Inspecting exact system prompts, few-shot examples, and user context delivered to the LLM.",
                    "Analyzing token usage, latency (ms), temperature, and safety threshold telemetry.",
                    "Comparing model output with human ground-truth corrections.",
                    "Adding annotated feedback directly into the model reinforcement learning dataset."
                ],
                "main_features": [
                    "Inference Metadata Header: Review ID (REV-2026-081), Model Endpoint (e.g., Gemini-1.5-Pro), Latency (480ms), and Total Tokens.",
                    "System & User Prompt Box: Syntax-highlighted view of injected prompt instructions and dynamic profile context.",
                    "Generated Output Comparison: Side-by-side view of raw LLM output vs. user-edited final version.",
                    "Safety Category Ratings: Radar score displaying Harassment, Hate Speech, PII, and Commercial Deception confidence levels.",
                    "Ground Truth Correction Editor: Allows admin to input the ideal response for direct export into fine-tuning archives."
                ],
                "actions": [
                    {"control": "Save Ground Truth Correction (Button)", "description": "Saves manual correction to training corpus."},
                    {"control": "Submit Star Rating (Widget)", "description": "Records 1-5 quality assessment across accuracy, relevance, and formatting."},
                    {"control": "Export Inference Trace (JSON)", "description": "Downloads full OpenTelemetry trace file for debugging."}
                ],
                "steps": [
                    "1. Access the review file from the AI Quality queue.",
                    "2. Examine the input prompt and system instructions to verify appropriate context injection.",
                    "3. Compare the generated completion with the user's ultimate edits to see where the model underperformed.",
                    "4. Input the ideal ground truth response in the correction box.",
                    "5. Submit the rating to sync telemetry with the model engineering pipeline."
                ],
                "related_pages": ["/admin/ai-quality", "/admin/matching", "/admin/system"],
                "limitations": "Trace telemetry is retained in active storage for 90 days before rolling into cold S3 compliance archives."
            }
        ]
    },
    {
        "id": "module-5",
        "number": 5,
        "name": "Support & Customer Experience",
        "description": "Omnichannel customer support helpdesk, SLA tracking, priority routing, and multi-tier support ticket resolution.",
        "pages": [
            {
                "num": 19,
                "name": "Customer Support Desk & Ticket Queue",
                "url": "/admin/support",
                "screenshot": "17-support.png",
                "purpose": "Central helpdesk management console for processing customer support requests, billing queries, technical issues, and platform onboarding assistance.",
                "used_for": [
                    "Triaging incoming support tickets across email, chat, and in-app contact forms.",
                    "Monitoring SLA response times and resolution targets across tier levels.",
                    "Assigning tickets to specialized technical or billing support agents.",
                    "Executing bulk ticket status updates and priority escalations."
                ],
                "main_features": [
                    "Support Metrics Ribbon: Open Tickets, Awaiting Response, SLA Breaches, and CSAT Score (%).",
                    "Ticket Queue Table: Ticket ID, Subject, Submitter Role (Jobseeker, Founder, Investor), Priority (Urgent, High, Normal, Low), Status, and Assignee.",
                    "Filter & View Bar: Filter by My Tickets, Unassigned, Priority, SLA Status, and Category.",
                    "Quick Ticket Drawer: Review ticket history, contact details, and internal notes without leaving the queue."
                ],
                "actions": [
                    {"control": "Open Ticket File (Link/Button)", "description": "Navigates to full ticket workspace (/admin/support/[id])."},
                    {"control": "Assign to Specialist (Dropdown)", "description": "Assigns ticket to designated support staff member."},
                    {"control": "Change Priority Dropdown", "description": "Escalates ticket to Urgent or High based on impact."},
                    {"control": "Bulk Close (Button)", "description": "Closes resolved or duplicate tickets in bulk."}
                ],
                "steps": [
                    "1. Navigate to 'Support' in the Administration sidebar category.",
                    "2. Review the top ribbon to monitor pending SLA deadlines.",
                    "3. Filter for 'Unassigned' tickets and assign urgent items to available team members.",
                    "4. Click on a ticket subject or ID to enter the full communication thread.",
                    "5. After resolution, ensure ticket status is updated to 'Resolved' and CSAT survey is triggered."
                ],
                "related_pages": ["/admin/support/TCK-2026-00412", "/admin/users", "/admin/billing"],
                "limitations": "Automated ticket triage routes billing queries directly to finance-qualified staff based on keyword heuristics."
            },
            {
                "num": 20,
                "name": "Support Ticket Incident File",
                "url": "/admin/support/[id]",
                "screenshot": "18-support-detail.png",
                "purpose": "Comprehensive two-way communication console and troubleshooting workspace for resolving individual customer support inquiries.",
                "used_for": [
                    "Communicating directly with users via rich-text email replies with attachments.",
                    "Collaborating with team members using internal private notes.",
                    "Viewing submitter profile snapshot, active subscriptions, and recent error logs.",
                    "Executing one-click quick actions (e.g., resend verification email, clear session, refund invoice)."
                ],
                "main_features": [
                    "Ticket Header: Ticket ID (TCK-2026-00412), Subject, Current Status, Priority, and Submitter Details.",
                    "Conversation Thread: Chronological timeline of user messages, admin responses, system notices, and private internal notes.",
                    "Rich Reply Composer: Supports formatting, attachment uploads, canned response snippets, and CC recipients.",
                    "User Context Sidebar: Live snapshot of user's active plan, account balance, verification standing, and recent transactions.",
                    "Canned Response Picker: Dropdown of approved response macros for rapid resolution of common queries."
                ],
                "actions": [
                    {"control": "Send Reply (Button)", "description": "Dispatches formatted response to user's registered email."},
                    {"control": "Add Private Note (Button)", "description": "Logs internal comment visible only to platform staff."},
                    {"control": "Insert Canned Response (Dropdown)", "description": "Populates composer with standardized template."},
                    {"control": "Mark as Resolved (Button)", "description": "Changes status to Resolved and triggers satisfaction survey."}
                ],
                "steps": [
                    "1. Open the target ticket from the Support Queue.",
                    "2. Review the user's initial inquiry and examine the User Context sidebar for account standing.",
                    "3. Select a canned response or draft a personalized response in the composer.",
                    "4. Add an internal private note if cross-departmental coordination was involved.",
                    "5. Click 'Send Reply' and update the ticket status to 'Awaiting User Response' or 'Resolved'."
                ],
                "related_pages": ["/admin/support", "/admin/users/usr_01", "/admin/billing"],
                "limitations": "Outbound email delivery is routed via platform transactional email servers; replies to closed tickets automatically spawn a linked follow-up ticket."
            }
        ]
    },
    {
        "id": "module-6",
        "number": 6,
        "name": "Financial Operations & Subscriptions",
        "description": "Revenue reconciliation, subscription tier management, disbursement batches, TDS withholding compliance, and payment gateway health.",
        "pages": [
            {
                "num": 21,
                "name": "Billing Overview & Revenue Telemetry",
                "url": "/admin/billing",
                "screenshot": "19-billing.png",
                "purpose": "Consolidated financial telemetry dashboard tracking platform revenue streams, recurring subscriptions, transaction fee margins, and payment gateway health.",
                "used_for": [
                    "Monitoring Gross Transaction Value (GTV), Net Platform Revenue, and Churn Rate.",
                    "Auditing recent invoice issuances, GST receipts, and payment gateway transaction statuses.",
                    "Analyzing payment gateway settlement pipelines and pending balances.",
                    "Exporting formal financial reconciliation ledgers for accounting teams."
                ],
                "main_features": [
                    "Financial Summary Cards: Total GTV, Net Platform Revenue, Active Paid Subscriptions, and Failed Payment Count.",
                    "Revenue Trend Visualization: Multi-month comparison of subscription revenue vs. escrow marketplace commissions.",
                    "Recent Transactions Ledger: Invoice ID, Customer Name, Amount (INR), GST Portion, Payment Method, Status (Paid, Pending, Failed), and Date.",
                    "Payment Gateway Health Monitor: Live uptime, success rate percentage, and latency for Razorpay and Cashfree bridges."
                ],
                "actions": [
                    {"control": "Date Range Filter", "description": "Filters financial metrics across current month, quarterly, or annual periods."},
                    {"control": "Download Reconciliation Ledger (CSV)", "description": "Generates complete accounting ledger with GST breakdowns."},
                    {"control": "Retry Failed Invoices (Button)", "description": "Attempts automated re-billing of dunning credit cards."},
                    {"control": "Navigate to Plans (Button)", "description": "Opens subscription plan catalog (/admin/plans)."},
                    {"control": "Navigate to Payouts (Button)", "description": "Opens disbursement operations (/admin/payouts)."}
                ],
                "steps": [
                    "1. Open 'Billing' from the Financial Engine sidebar category.",
                    "2. Review the headline financial cards to ensure revenue run-rate matches monthly targets.",
                    "3. Check the Failed Payment counter and inspect recent transaction rows with 'Failed' status.",
                    "4. Click 'Download Reconciliation Ledger' at month-end to provide CA-audited reports to finance.",
                    "5. Use quick buttons to jump to Plan Management or Payout Operations as needed."
                ],
                "related_pages": ["/admin/plans", "/admin/payouts", "/admin/analytics", "/admin/audit"],
                "limitations": "GST tax invoice calculation automatically segregates CGST/SGST (intra-state) vs. IGST (inter-state) based on organization GSTIN prefix."
            },
            {
                "num": 22,
                "name": "Subscription Plan & Entitlement Catalog",
                "url": "/admin/plans",
                "screenshot": "20-plans.png",
                "purpose": "Manages platform monetization tiers, subscription pricing, feature entitlements, job posting limits, and promotional discounts.",
                "used_for": [
                    "Viewing active subscription tiers for Employers, Talent, and Investors.",
                    "Managing pricing schedules (Monthly, Quarterly, Annual billing in INR).",
                    "Configuring feature entitlements (e.g., unlimited AI matching, direct message limits, featured job badges).",
                    "Activating or deprecating legacy subscription tiers."
                ],
                "main_features": [
                    "Plan Tier Grid: Visual plan cards (Free Tier, Growth Startup, Scale Enterprise, Syndicate Investor) with pricing and active subscriber counts.",
                    "Tabbed Catalog Navigation: Tabs for Plan Catalog, Entitlements & Limits, Promotions & Vouchers, and Commissions & Fees.",
                    "Feature Entitlements Matrix: Detailed mapping of platform permissions and resource quotas assigned to each plan tier.",
                    "Create Plan Quick Trigger: High-visibility button navigating to the Plan Creation Studio."
                ],
                "actions": [
                    {"control": "Create New Plan (Button)", "description": "Navigates to the Plan Creation Wizard (/admin/plans/new)."},
                    {"control": "Edit Plan (Button)", "description": "Navigates to plan modification studio (/admin/plans/[id])."},
                    {"control": "Duplicate Plan (Button)", "description": "Clones plan configurations into a new draft tier."},
                    {"control": "Toggle Plan Active Status", "description": "Hides or displays plan on the public checkout pricing page."}
                ],
                "steps": [
                    "1. Access 'Plans' under Financial Engine.",
                    "2. Review subscriber distribution across active plans.",
                    "3. Click 'Create New Plan' to introduce a seasonal or promotional subscription tier.",
                    "4. To adjust pricing or quotas on an existing tier, click 'Edit Plan' on the respective card.",
                    "5. Switch to 'Promotions & Vouchers' tab to issue discount coupon codes for startup accelerator cohorts."
                ],
                "related_pages": ["/admin/plans/new", "/admin/plans/plan_emp_growth", "/admin/billing"],
                "limitations": "Price modifications on active tiers only apply to new subscribers; grandfathered legacy subscribers maintain existing billing rates until renewal."
            },
            {
                "num": 23,
                "name": "Subscription Plan Creation Wizard",
                "url": "/admin/plans/new",
                "screenshot": "21-plan-new.png",
                "purpose": "Step-by-step authoring studio for provisioning new subscription products, setting recurring pricing, and configuring entitlement quotas.",
                "used_for": [
                    "Creating new subscription tiers tailored for startups, recruiters, or talent.",
                    "Configuring recurring billing frequencies (Monthly, Annually) with automatic discounts.",
                    "Setting granular platform limits (number of active job posts, candidate unlock credits, AI match runs).",
                    "Configuring taxability, HSN/SAC codes, and public visibility flags."
                ],
                "main_features": [
                    "Plan Identity Form: Plan Name, Internal Slug, Target Role (Employer, Talent, Investor), and Public Description.",
                    "Pricing Engine Config: Currency selector (INR), Monthly Base Price, Annual Billing Price (with auto % discount calculation).",
                    "Entitlement Limits Sliders: Number inputs for Active Job Postings, Featured Listings, Resume Unlock Credits, and Team Seat Allocations.",
                    "Publishing Controls: Visibility toggles (Public, Invite-Only, Hidden) and Save as Draft capability."
                ],
                "actions": [
                    {"control": "Target Role Selector", "description": "Assigns plan to Employer, Talent, or Investor accounts."},
                    {"control": "Save Draft (Button)", "description": "Saves configuration without publishing to live pricing tables."},
                    {"control": "Publish Plan (Button)", "description": "Activates plan and generates Stripe/Razorpay billing plan IDs."},
                    {"control": "Cancel (Button)", "description": "Discards changes and returns to the Plan Catalog."}
                ],
                "steps": [
                    "1. Click 'Create New Plan' from the Plan Catalog.",
                    "2. Enter plan name (e.g., 'Hypergrowth Startup Tier') and select the target role.",
                    "3. Configure pricing terms for both monthly and annual billing cycles.",
                    "4. Specify quota allocations for job posts and candidate messaging credits.",
                    "5. Click 'Publish Plan' to push the new tier live to the checkout flow."
                ],
                "related_pages": ["/admin/plans", "/admin/billing"],
                "limitations": "Plan slugs must be globally unique alphanumeric strings; once published, target role cannot be retroactively modified."
            },
            {
                "num": 24,
                "name": "Subscription Plan Modification Studio",
                "url": "/admin/plans/[id]",
                "screenshot": "22-plan-edit.png",
                "purpose": "Provides full lifecycle management for an existing subscription plan, allowing administrators to adjust pricing, feature caps, and marketing copy.",
                "used_for": [
                    "Updating pricing schedules and annual discount incentives.",
                    "Modifying candidate unlock quotas and monthly posting allowances.",
                    "Reviewing historical subscriber churn and lifetime revenue generated by this tier.",
                    "Deprecating or archiving sunsetted subscription tiers."
                ],
                "main_features": [
                    "Plan Metrics Ribbon: Active Subscribers, Monthly Recurring Revenue (MRR), and Churn Rate (%).",
                    "Live Configuration Form: Edit Plan Title, Badge Text (e.g. 'Most Popular'), Monthly Fee, Annual Fee, and Quotas.",
                    "Grandfathering Policy Selector: Defines whether existing subscribers inherit updated pricing or retain grandfathered rates.",
                    "Deprecation Action Bar: Allows safe phasing out of older tiers without interrupting active subscriptions."
                ],
                "actions": [
                    {"control": "Save Plan Changes (Button)", "description": "Updates plan parameters across database and billing gateway."},
                    {"control": "Deprecate Tier (Button)", "description": "Prevents new signups while servicing active subscribers."},
                    {"control": "Clone as New Plan (Button)", "description": "Duplicates current configuration into a draft tier."}
                ],
                "steps": [
                    "1. Select an existing plan from the catalog to enter the edit studio.",
                    "2. Adjust the desired parameters (e.g., increase candidate unlock allowance).",
                    "3. Select the Grandfathering rule to protect existing contracted subscribers.",
                    "4. Click 'Save Plan Changes' to apply configuration updates.",
                    "5. Verify updated entitlements are reflected in user account permissions."
                ],
                "related_pages": ["/admin/plans", "/admin/billing"],
                "limitations": "Decreasing resource allowances on active tiers requires 30-day advance notification to complying subscribers under Indian consumer protection norms."
            },
            {
                "num": 25,
                "name": "Disbursement & Payout Operations",
                "url": "/admin/payouts",
                "screenshot": "23-payouts.png",
                "purpose": "Manages platform outbound financial disbursements, escrow releases, freelancer payout batches, TDS statutory tax deductions, and bank NACH/NEFT processing.",
                "used_for": [
                    "Reviewing and approving scheduled payout batches to talent and vendors.",
                    "Auditing automated Section 194J / 194C TDS tax withholding calculations.",
                    "Managing active payee holds and resolving failed bank account transfers.",
                    "Processing refund requests and chargeback reversals."
                ],
                "main_features": [
                    "Disbursement Summary Metrics: Pending Batch Total (INR), Processed This Month, Active Payee Holds, and TDS Withheld (MTD).",
                    "Tabbed Operations Bar: Tabs for Payout Batches, Refund Requests, Active Payee Holds, and TDS & Tax Paperwork.",
                    "Payout Batches Table: Batch ID (e.g. BAT-2026-11-10), Total Payees, Gross Amount, TDS Amount, Net Disbursement, Status (Queued, Processing, Disbursed), and Scheduled Date.",
                    "Payee Banking Validation Pill: Indicates penny-drop verification status of destination bank accounts."
                ],
                "actions": [
                    {"control": "Create Immediate Batch (Button)", "description": "Gathers all unbatched approved earnings into a new payout run."},
                    {"control": "Inspect Batch (Button)", "description": "Opens the complete payout batch ledger (/admin/payouts/batches/[id])."},
                    {"control": "Export Bank NACH/NEFT File (Button)", "description": "Generates bank-standard payment file for corporate net banking upload."},
                    {"control": "Place Payee Hold (Button)", "description": "Freezes disbursements to a specific user pending compliance review."}
                ],
                "steps": [
                    "1. Access 'Payouts' from the Financial Engine sidebar category.",
                    "2. Inspect the headline metrics to review pending payout obligations and TDS accruals.",
                    "3. Review the 'Payout Batches' tab and select the batch scheduled for today's release.",
                    "4. Verify that all payees possess verified penny-drop bank details and valid PAN cards.",
                    "5. Click 'Inspect Batch' to conduct itemized ledger auditing before final release."
                ],
                "related_pages": ["/admin/payouts/batches/BAT-2026-11-10", "/admin/billing", "/admin/disputes", "/admin/audit"],
                "limitations": "Individual payouts exceeding INR 20,000 without a verified PAN card are subject to mandatory 20% Section 206AA statutory maximum TDS withholding."
            },
            {
                "num": 26,
                "name": "Payout Batch Manifest & Ledger",
                "url": "/admin/payouts/batches/[id]",
                "screenshot": "24-payout-batch-detail.png",
                "purpose": "Provides an itemized, line-by-line financial manifest of every individual payee disbursement included in a specific payout batch run.",
                "used_for": [
                    "Auditing individual talent earnings, platform fee deductions, and TDS withholding lines.",
                    "Excluding or holding individual suspicious line items without cancelling the entire batch.",
                    "Verifying destination IFSC codes, bank account numbers, and beneficiary names.",
                    "Executing final authorization and releasing the batch to banking APIs."
                ],
                "main_features": [
                    "Batch Manifest Header: Batch ID (BAT-2026-11-10), Total Records (42), Gross Volume (INR 8,45,000), Total TDS (INR 84,500), Net Payable (INR 7,60,500), and Execution State.",
                    "Itemized Line-Item Table: Payee Name, User ID, Contract Reference, Gross Amount, TDS Rate (10%), Net Amount, Bank Name, Masked Account, IFSC, and Line Status.",
                    "Line-Item Exclusion Controls: Checkboxes allowing administrators to uncheck specific problematic payees.",
                    "Dual-Authorization Gate: Requires two distinct administrator sign-offs for release of batches exceeding INR 10,00,000."
                ],
                "actions": [
                    {"control": "Exclude Line Item (Toggle/Checkbox)", "description": "Removes payee from this batch run and holds funds for investigation."},
                    {"control": "Download Bank Manifest (CSV)", "description": "Exports standard CSV/Excel format compatible with HDFC/ICICI corporate portals."},
                    {"control": "Authorize & Disburse Batch (Button)", "description": "Submits disbursement instructions to banking gateway API."},
                    {"control": "Cancel Batch (Button)", "description": "Aborts batch run and returns balances to individual user wallets."}
                ],
                "steps": [
                    "1. Open the scheduled batch from the Payouts overview page.",
                    "2. Review the gross, TDS, and net disbursement totals.",
                    "3. Scroll through the line-item manifest to verify that no flagged or disputed accounts are included.",
                    "4. If an anomaly is found on a specific payee, click 'Exclude' to hold their payment.",
                    "5. Click 'Authorize & Disburse Batch' and complete secondary security verification to release funds."
                ],
                "related_pages": ["/admin/payouts", "/admin/billing", "/admin/audit"],
                "limitations": "Once disbursed to the banking gateway, individual transactions cannot be recalled; failed transfers will automatically credit back to the escrow reserve."
            }
        ]
    },
    {
        "id": "module-7",
        "number": 7,
        "name": "Regulatory Compliance, Legal & Privacy",
        "description": "DPDP Act 2023 compliance, data subject requests (DSR), immutable audit trails, and statutory framework inspection.",
        "pages": [
            {
                "num": 27,
                "name": "Regulatory Compliance & Framework Audits",
                "url": "/admin/compliance",
                "screenshot": "25-compliance.png",
                "purpose": "Central regulatory governance console monitoring platform adherence to the Digital Personal Data Protection (DPDP) Act 2023, RBI Payout Escrow Directives, and MCA Startup Regulations.",
                "used_for": [
                    "Tracking statutory compliance scores across active regulatory frameworks.",
                    "Conducting regular compliance inspection deep-dives.",
                    "Reviewing data retention schedules and automated consent expiry.",
                    "Managing regulatory disclosures and generating external audit packages."
                ],
                "main_features": [
                    "Compliance Health Cards: Overall Compliance Score (98.4%), Open Deficiencies, Upcoming Regulatory Deadlines, and Consent Expiries.",
                    "Framework Status Matrix: Status tracking for DPDP Act 2023, RBI Payout Guidelines, DPIIT Startup Recognition Rules, and ISO 27001 Controls.",
                    "Inspection Drawer Section: Quick side drawer for immediate review of framework policies and control implementation evidence.",
                    "Deep-Dive Navigation Link: Direct access button navigating to full framework inspection (/admin/compliance/[id])."
                ],
                "actions": [
                    {"control": "Trigger Compliance Scan (Button)", "description": "Executes automated system check against configured policy rules."},
                    {"control": "Inspect Framework (Button)", "description": "Navigates to dedicated compliance deep-dive (/admin/compliance/data-rights)."},
                    {"control": "Download Statutory Audit Report (PDF)", "description": "Compiles executive compliance certificate for regulatory bodies."},
                    {"control": "Manage Consents (Link)", "description": "Navigates to user consent logs and privacy policy version controls."}
                ],
                "steps": [
                    "1. Access 'Compliance' under the Audit and Compliance sidebar section.",
                    "2. Review the overall compliance score and inspect any open deficiency alerts.",
                    "3. Click on a specific framework card (e.g. 'DPDP Act 2023 - Data Rights') to open the Inspection Drawer.",
                    "4. Review the control status and click 'Open Full Inspection' to examine technical implementation details.",
                    "5. Export the monthly compliance audit report for archiving and internal legal review."
                ],
                "related_pages": ["/admin/compliance/data-rights", "/admin/data-requests", "/admin/audit"],
                "limitations": "Automated compliance checks evaluate technical database encryption and consent flags; operational procedural audits require manual verification."
            },
            {
                "num": 28,
                "name": "Compliance Inspection & Policy Deep Dive",
                "url": "/admin/compliance/[id]",
                "screenshot": "26-compliance-detail.png",
                "purpose": "Provides granular, technical audit inspection for a specific regulatory control framework, displaying evidence documents, test results, and remediation plans.",
                "used_for": [
                    "Auditing technical implementation of data protection rights (Right to Access, Right to Correction, Right to Erasure).",
                    "Inspecting encryption standards (AES-256 for data at rest, TLS 1.3 for transit).",
                    "Reviewing automated consent logging and verifiable withdrawal mechanisms.",
                    "Managing corrective action plans (CAPA) for identified compliance vulnerabilities."
                ],
                "main_features": [
                    "Framework Detail Header: Framework Title (e.g., DPDP Data Rights & Erasure), Governance Body, Audit Frequency, and Last Review Date.",
                    "Technical Control Checklist: Itemized list of mandatory statutory controls with live pass/fail status and audit evidence links.",
                    "Data Flow Diagram Widget: Visual architecture schematic showing how personal identity data moves through platform services.",
                    "Audit Evidence Repository: Uploaded penetration testing reports, DPDP compliance certificates, and legal opinions.",
                    "Remediation Workbench: Form to assign corrective tasks to engineering squads with binding SLA deadlines."
                ],
                "actions": [
                    {"control": "Run Live Control Test (Button)", "description": "Executes real-time probe to verify cryptographic sanitization endpoints."},
                    {"control": "Upload Audit Evidence (Button)", "description": "Attaches third-party auditor reports or legal memoranda."},
                    {"control": "Sign Off on Framework (Button)", "description": "Logs formal administrative certification of framework compliance."},
                    {"control": "Back to Compliance Overview (Link)", "description": "Returns to main compliance dashboard."}
                ],
                "steps": [
                    "1. Open a framework inspection file from the Compliance dashboard.",
                    "2. Review the technical control checklist to confirm all mandatory statutory points show green 'Pass' indicators.",
                    "3. Click 'Run Live Control Test' to dynamically verify that erasure endpoints anonymize records in accordance with law.",
                    "4. Review uploaded legal opinion documents in the evidence repository.",
                    "5. Complete the annual sign-off section to record your official administrative approval."
                ],
                "related_pages": ["/admin/compliance", "/admin/data-requests", "/admin/audit"],
                "limitations": "Control test execution interacts with staging verification mocks to prevent accidental disruption of production data stores."
            },
            {
                "num": 29,
                "name": "DPDP / GDPR Data Subject Requests",
                "url": "/admin/data-requests",
                "screenshot": "27-data-requests.png",
                "purpose": "Manages statutory privacy requests submitted by platform users exercising their rights under the DPDP Act 2023 and GDPR.",
                "used_for": [
                    "Processing user requests for Data Access (Takeout), Data Rectification, and Complete Account Erasure (Right to be Forgotten).",
                    "Monitoring the mandatory 30-day statutory response deadline timer for every request.",
                    "Verifying user identity before releasing personal data archives.",
                    "Executing automated cryptographic anonymization routines upon request approval."
                ],
                "main_features": [
                    "SLA Deadline Countdown: Highlights days remaining before statutory penalties apply.",
                    "Request Type Filters: Filter by Right to Access (Export), Right to Erasure (Delete), Right to Correction, and Consent Revocation.",
                    "Data Requests Table: Request ID (e.g. DSR-2026-041), User Name, Submitter Role, Request Type, Days Remaining, Verification Status, and Ticket Status.",
                    "Automated Data Package Generator: Creates cryptographically signed ZIP archive containing all personal records."
                ],
                "actions": [
                    {"control": "Open DSR Dossier (Button)", "description": "Opens the request processing workspace (/admin/data-requests/[id])."},
                    {"control": "Verify Submitter Identity (Button)", "description": "Triggers secondary Aadhaar/OTP verification to prevent data leakage."},
                    {"control": "Generate Data Package (Button)", "description": "Compiles user profile, applications, messages, and invoices into JSON archive."},
                    {"control": "Execute Account Erasure (Button)", "description": "Anonymizes personal identifiers while preserving statutory tax/escrow records."}
                ],
                "steps": [
                    "1. Access 'Data Requests' from the Administration category in the sidebar.",
                    "2. Sort the table by 'Days Remaining' to prioritize requests approaching statutory deadlines.",
                    "3. Click on a request row to inspect submitter details and verification standing.",
                    "4. Confirm that the applicant has successfully passed identity verification.",
                    "5. Open the dossier to generate the requested data archive or proceed with account erasure."
                ],
                "related_pages": ["/admin/data-requests/DSR-2026-041", "/admin/compliance", "/admin/users", "/admin/audit"],
                "limitations": "Under Section 8(4) of the DPDP Act, financial transaction records and TDS invoices must be retained for 7 years and are excluded from complete erasure."
            },
            {
                "num": 30,
                "name": "Data Subject Request Processing Dossier",
                "url": "/admin/data-requests/[id]",
                "screenshot": "28-data-request-detail.png",
                "purpose": "Granular execution workbench for fulfilling an individual Data Subject Access or Erasure Request, verifying identities, and generating audit certificates.",
                "used_for": [
                    "Reviewing submitter identity authentication logs.",
                    "Inspecting raw JSON telemetry of all user data stored across platform microservices.",
                    "Executing irreversible anonymization across profiles, resumes, chat messages, and search indices.",
                    "Dispatching cryptographic certificate of erasure to the user and regulatory authorities."
                ],
                "main_features": [
                    "Request Header: Request ID (DSR-2026-041), Request Type (Data Erasure / Right to be Forgotten), Submitter Name, Days to SLA Breach (18 Days), and Current Stage.",
                    "Identity Verification Proof: Shows timestamped Aadhaar OTP verification and email confirmation tokens.",
                    "Data Scope Inventory: Lists personal records identified across User Profiles, Resumes & Portfolios, Chat Transcripts, and Application History.",
                    "Statutory Retention Retention Exceptions Box: Clearly identifies financial invoices and tax withholding records exempt from erasure by law.",
                    "Execution Control Panel: High-consequence action button with multi-step confirmation modal for irreversible deletion."
                ],
                "actions": [
                    {"control": "Compile & Download Archive (Button)", "description": "Generates complete encrypted ZIP archive of all user data."},
                    {"control": "Execute Irreversible Erasure (Button)", "description": "Triggers cryptographic deletion pipeline across all databases."},
                    {"control": "Issue Erasure Certificate (Button)", "description": "Sends signed PDF proof of erasure to user's registered email."},
                    {"control": "Reject Request (Modal Trigger)", "description": "Rejects request if submitter identity cannot be verified or active dispute exists."}
                ],
                "steps": [
                    "1. Open the DSR case file from the Data Requests queue.",
                    "2. Confirm that identity verification is marked 'Verified via OTP'.",
                    "3. Review the data inventory to ensure all associated records have been located.",
                    "4. For erasure requests, confirm that no active milestone disputes or uncleared escrow balances exist.",
                    "5. Click 'Execute Irreversible Erasure', enter your administrative security password, and issue the completion certificate."
                ],
                "related_pages": ["/admin/data-requests", "/admin/compliance", "/admin/audit"],
                "limitations": "Erasure operations permanently overwrite personal identifiers with SHA-256 pseudorandom hashes; this action cannot be undone."
            },
            {
                "num": 31,
                "name": "System Audit Trail & Immutable Log Explorer",
                "url": "/admin/audit",
                "screenshot": "29-audit.png",
                "purpose": "Provides a tamper-evident, immutable forensic log of all administrative actions, data modifications, security events, and financial authorizations.",
                "used_for": [
                    "Investigating administrative misconduct, unauthorized data access, or privilege abuse.",
                    "Reviewing chronological record changes with before-and-after JSON diffs.",
                    "Tracking user impersonation sessions, status overrides, and verification approvals.",
                    "Exporting cryptographically sealed audit manifests for external statutory examiners."
                ],
                "main_features": [
                    "Audit Explorer Filter Bar: Search by Actor Email, Target Entity ID, Action Type (User Update, Escrow Release, Verification Approve, Flag Toggle), and Date Range.",
                    "Audit Log Table: Timestamp (UTC & IST), Actor Name & Role, Action Description, Target Entity, IP Address & Location, and Change Diff Indicator.",
                    "JSON Diff Drawer: Sliding modal showing exact field-level state changes (previous value vs. new value) in color-coded JSON format.",
                    "Cryptographic Block Integrity Hash: Displays SHA-256 merkle hash linking each log entry to ensure tamper detection."
                ],
                "actions": [
                    {"control": "Search Audit Logs", "description": "Full-text search querying actor, target UUID, or action keywords."},
                    {"control": "Action Type Filter", "description": "Filters logs by specific categories: Auth, User Management, Billing, Verification, Config."},
                    {"control": "View Diff (Button)", "description": "Opens JSON diff viewer displaying exact field-level modifications."},
                    {"control": "Export Signed Audit Trail (CSV)", "description": "Downloads tamper-evident signed CSV archive for regulatory audits."}
                ],
                "steps": [
                    "1. Navigate to 'Audit' under Audit and Compliance.",
                    "2. Use the search bar to filter by target user ID or administrator email.",
                    "3. Select the appropriate action category to narrow down events (e.g., 'Verification Approve').",
                    "4. Click 'View Diff' on any log row to inspect the before-and-after JSON representation of the change.",
                    "5. Export filtered audit records for external reporting or internal forensic investigation."
                ],
                "related_pages": ["/admin", "/admin/users", "/admin/staff", "/admin/system"],
                "limitations": "Audit logs are append-only; entries cannot be edited, overwritten, or deleted by any user, including Super Admins."
            }
        ]
    },
    {
        "id": "module-8",
        "number": 8,
        "name": "Ecosystem, Grants & Talent Matching",
        "description": "Government grant distribution, incubation schemes, vector similarity matching ops, and platform webhook event streaming.",
        "pages": [
            {
                "num": 32,
                "name": "Government Grants & Opportunity Feed",
                "url": "/admin/opportunities",
                "screenshot": "30-opportunities.png",
                "purpose": "Manages public and private ecosystem opportunities, including DPIIT Seed Fund schemes, state incubation grants, accelerator cohorts, and hackathons.",
                "used_for": [
                    "Publishing and curating government grant notices for verified startups.",
                    "Monitoring startup application volume and disbursed grant capital.",
                    "Managing eligibility criteria (sector, incorporation stage, female founder quotas).",
                    "Tracking application review pipelines and partner agency reviews."
                ],
                "main_features": [
                    "Opportunity Metrics Ribbon: Active Grants, Total Grant Pool (INR Cr), Total Applications Received, and Partner Agencies.",
                    "Opportunities Catalog Table: Program Title, Issuing Agency (e.g. DPIIT, MeitY, BIRAC), Grant Amount / Equity Terms, Deadline, Status (Open, Reviewing, Closed), and Applications Count.",
                    "Category Filter Pills: Grants, Incubators, Accelerators, Hackathons, and Angel Challenges.",
                    "Create Opportunity Button: Quick trigger navigating to the Opportunity Authoring Studio."
                ],
                "actions": [
                    {"control": "Create New Opportunity (Button)", "description": "Navigates to the Opportunity Authoring Studio (/admin/opportunities/new)."},
                    {"control": "Edit Opportunity (Button)", "description": "Opens opportunity management studio (/admin/opportunities/[id])."},
                    {"control": "Review Applications (Button)", "description": "Opens submitted startup application roster for this grant."},
                    {"control": "Toggle Opportunity Status", "description": "Opens or closes public application intake."}
                ],
                "steps": [
                    "1. Access 'Opportunities' from the Ecosystem & Matching sidebar section.",
                    "2. Review active grant programs and inspect upcoming deadline expirations.",
                    "3. Click 'Create New Opportunity' to publish a newly announced government incubation scheme.",
                    "4. To manage applicants on an ongoing program, click 'Review Applications'.",
                    "5. Update program status to 'Reviewing' when the application window concludes."
                ],
                "related_pages": ["/admin/opportunities/new", "/admin/opportunities/OPP-DPIIT-01", "/admin/organizations"],
                "limitations": "Direct grant disbursement execution is handled by government partner bank portals; the platform manages application intake and eligibility verification."
            },
            {
                "num": 33,
                "name": "Opportunity Publishing Studio",
                "url": "/admin/opportunities/new",
                "screenshot": "31-opportunity-new.png",
                "purpose": "Wizard for creating, configuring, and publishing new startup grants, venture competitions, or incubation schemes.",
                "used_for": [
                    "Authoring program descriptions, eligibility guidelines, and application questions.",
                    "Setting financial grant amounts, disbursement schedules, and equity requirements (if any).",
                    "Configuring applicant filtering rules (e.g., must possess verified DPIIT certificate).",
                    "Setting application deadlines and automated review routing."
                ],
                "main_features": [
                    "Program Overview Form: Program Title, Issuing Agency, Program Type (Grant, Accelerator, Pitch Competition), and Headline Summary.",
                    "Eligibility Matrix: Minimum Incorporation Age, Sector Tags (Fintech, Agritech, Deeptech, Health), DPIIT Mandatory Requirement Toggle.",
                    "Financial & Terms Builder: Total Grant Cap (INR), Equity Percentage (0% for non-dilutive grants), and Milestone Schedule.",
                    "Custom Application Form Builder: Allows adding specific questionnaire fields and document upload requirements."
                ],
                "actions": [
                    {"control": "Save Draft (Button)", "description": "Saves program configuration without making it publicly discoverable."},
                    {"control": "Publish Opportunity (Button)", "description": "Publishes opportunity to the startup portal feed and triggers notifications."},
                    {"control": "Preview Public Listing (Button)", "description": "Displays live preview modal showing how startups will see the listing."}
                ],
                "steps": [
                    "1. Click 'Create New Opportunity' from the Opportunities catalog.",
                    "2. Fill in the program title, sponsoring agency, and comprehensive overview.",
                    "3. Configure eligibility criteria, toggling the DPIIT Recognition requirement if applicable.",
                    "4. Specify grant financial amounts and set the final application cutoff deadline.",
                    "5. Click 'Publish Opportunity' to distribute the announcement across the platform."
                ],
                "related_pages": ["/admin/opportunities", "/admin/organizations"],
                "limitations": "Published opportunities automatically generate SEO metadata and schema.org markup for external discovery."
            },
            {
                "num": 34,
                "name": "Opportunity Management & Edit Studio",
                "url": "/admin/opportunities/[id]",
                "screenshot": "32-opportunity-edit.png",
                "purpose": "Comprehensive administrative workbench for managing an active opportunity program, reviewing submitted applications, and updating program terms.",
                "used_for": [
                    "Modifying program deadlines, grant amounts, or eligibility requirements.",
                    "Reviewing startup application submissions and grading applicant pitch decks.",
                    "Shortlisting, rejecting, or advancing startups to interview rounds.",
                    "Publishing winner announcements and grant allocation summaries."
                ],
                "main_features": [
                    "Program Header: Opportunity ID (OPP-DPIIT-01), Program Title, Agency, Total Applicants (142), and Days to Deadline.",
                    "Tabbed Program Workbench: Tabs for Program Details & Settings, Applicant Roster & Scoring, Review Committee Notes, and Disbursement Tracking.",
                    "Applicant Scoring Table: Startup Name, DPIIT Status, Sector, Automated Eligibility Match (%), Panel Score, and Current Stage.",
                    "Broadcast Updates Modal: Sends broadcast message to all applicants regarding timeline changes or webinar links."
                ],
                "actions": [
                    {"control": "Save Program Edits (Button)", "description": "Saves modified program terms and schedules."},
                    {"control": "Advance Shortlisted (Button)", "description": "Moves selected startups to the final jury pitch round."},
                    {"control": "Export Applicant Roster (CSV)", "description": "Downloads full dataset of applicants and pitch deck links."},
                    {"control": "Close Application Intake (Button)", "description": "Halts new submissions immediately."}
                ],
                "steps": [
                    "1. Open the opportunity file from the main Opportunities catalog.",
                    "2. Review incoming applications in the 'Applicant Roster' tab.",
                    "3. Filter applicants by automated eligibility score to prioritize top candidates.",
                    "4. Record committee evaluation scores and adjust applicant stages.",
                    "5. When evaluation concludes, use the batch action tool to notify winning startups."
                ],
                "related_pages": ["/admin/opportunities", "/admin/organizations/org_01"],
                "limitations": "Changes to program eligibility criteria while applications are actively open are logged in the public changelog to ensure fairness."
            },
            {
                "num": 35,
                "name": "Vector Matching Engine Operations",
                "url": "/admin/matching",
                "screenshot": "33-matching.png",
                "purpose": "Supervises and fine-tunes the platform's AI vector similarity matching engine that matches candidate resumes with startup job specifications.",
                "used_for": [
                    "Monitoring vector embedding generation latency and Pinecone/Milvus index health.",
                    "Calibrating algorithmic weights (Skills Match, Experience Depth, Salary Expectation, Location/Remote, Cultural Fit).",
                    "Simulating match scores between sample candidate profiles and job requisitions.",
                    "Investigating matching anomalies or low recommendation accuracy reports."
                ],
                "main_features": [
                    "Engine Telemetry Cards: Active Embeddings Index Count (124,500), Average Match Latency (32ms), Match Acceptance Rate (78.2%), and Cosine Similarity Threshold (0.74).",
                    "Algorithm Weight Calibration Sliders: Interactive sliders to calibrate relative weighting between Technical Skills (40%), Experience (25%), Compensation (15%), Location (10%), and Education (10%).",
                    "Real-Time Match Simulation Sandbox: Select any candidate and job requisition to generate a live match calculation with explainability breakdown.",
                    "Vector Index Maintenance Bar: Re-index vector database, trigger garbage collection, or rebuild search clusters."
                ],
                "actions": [
                    {"control": "Calibrate Weights (Button)", "description": "Applies modified algorithmic weighting parameters to the live matching service."},
                    {"control": "Run Match Simulation (Button)", "description": "Calculates live similarity score and displays vector distance metrics."},
                    {"control": "Trigger Full Re-Index (Button)", "description": "Initiates asynchronous background regeneration of all profile embeddings."},
                    {"control": "Reset to Default Baseline (Button)", "description": "Restores algorithmic weights to standard factory defaults."}
                ],
                "steps": [
                    "1. Navigate to 'Matching' from the Ecosystem & Matching sidebar menu.",
                    "2. Review the match acceptance rate and vector latency telemetry.",
                    "3. To calibrate match sensitivity, adjust the weight calibration sliders.",
                    "4. Click 'Run Match Simulation' to test how weight adjustments affect candidate rankings on a sample job requisition.",
                    "5. Click 'Calibrate Weights' to deploy the updated algorithm to production recommendation feeds."
                ],
                "related_pages": ["/admin/ai-quality", "/admin/system", "/admin/config"],
                "limitations": "Vector re-indexing of the full platform candidate database runs in background worker nodes and takes approximately 12 minutes to complete without downtime."
            },
            {
                "num": 36,
                "name": "Platform Event Log & Webhook Stream",
                "url": "/admin/events",
                "screenshot": "34-events.png",
                "purpose": "Provides real-time event streaming and webhook delivery telemetry for auditing system-wide pub/sub events and third-party integrations.",
                "used_for": [
                    "Monitoring real-time platform event fires (e.g. `user.registered`, `job.published`, `escrow.funded`, `payout.disbursed`).",
                    "Investigating failed third-party webhook deliveries to partner ATS and accounting systems.",
                    "Replaying missed or failed webhook events to partner endpoints.",
                    "Auditing event payload schemas and subscription health."
                ],
                "main_features": [
                    "Event Stream Metrics: Total Events (24h), Delivery Success Rate (99.8%), Average Latency (120ms), and Dead Letter Queue Count (3).",
                    "Live Event Feed: Auto-scrolling chronological log of emitted events with event type badge, source service, payload snippet, and timestamp.",
                    "Event Filter Bar: Filter by Event Name, Status (Success, Retrying, Failed), Source Service, and Time Window.",
                    "Payload Inspection Drawer: Displays complete raw JSON payload with full delivery attempt HTTP headers and response codes."
                ],
                "actions": [
                    {"control": "Pause / Resume Stream (Toggle)", "description": "Freezes real-time auto-scroll to facilitate inspection of specific events."},
                    {"control": "Retry Failed Event (Button)", "description": "Re-queues a failed webhook event for immediate delivery attempt."},
                    {"control": "Inspect Payload (Button)", "description": "Opens JSON viewer displaying complete event data."},
                    {"control": "Purge Dead Letter Queue (Button)", "description": "Clears unrecoverable event failures after forensic review."}
                ],
                "steps": [
                    "1. Access 'Events' under Ecosystem & Matching.",
                    "2. Observe the real-time event stream or pause it to investigate a specific burst.",
                    "3. Filter by 'Status: Failed' to locate undelivered webhook notifications.",
                    "4. Click 'Inspect Payload' to examine the HTTP error code returned by the receiver endpoint.",
                    "5. Once the receiver endpoint is back online, click 'Retry Failed Event' to redeliver."
                ],
                "related_pages": ["/admin/integrations", "/admin/system", "/admin/audit"],
                "limitations": "Failed webhook events are automatically retried up to 5 times with exponential backoff before landing in the Dead Letter Queue."
            }
        ]
    },
    {
        "id": "module-9",
        "number": 9,
        "name": "Content & Document Templates",
        "description": "CMS help articles, platform notices, legally verified hiring and offer contract templates, and document versioning.",
        "pages": [
            {
                "num": 37,
                "name": "CMS & Help Article Management",
                "url": "/admin/content",
                "screenshot": "35-content.png",
                "purpose": "Manages platform content marketing, public help desk articles, founder resource guides, legal terms, and localized announcement banners.",
                "used_for": [
                    "Publishing and editing customer-facing help center documentation.",
                    "Updating platform Terms of Service, Privacy Policy, and Escrow Arbitration rules.",
                    "Configuring localized announcement banners and promotional popups.",
                    "Managing localized content in English, Hindi, and regional Indian languages."
                ],
                "main_features": [
                    "Content Inventory Table: Article Title, Category (Help, Legal, Guide, Announcement), Author, Status (Published, Draft, Review), Views Count, and Last Updated.",
                    "Category Filter Bar: Help Center Articles, Legal Documents, Founder Guides, and System Announcements.",
                    "Content Drawer Section: Sliding preview showing article text, SEO tags, and publish controls.",
                    "Hiring Templates Quick Link: Action button navigating directly to the contract template repository."
                ],
                "actions": [
                    {"control": "Create New Article (Button)", "description": "Opens rich-text CMS editor to author new content."},
                    {"control": "Edit Article (Button)", "description": "Opens existing article for content updates and markdown editing."},
                    {"control": "Manage Templates (Button)", "description": "Navigates directly to Contract & Offer Templates (/admin/templates)."},
                    {"control": "Publish / Unpublish Toggle", "description": "Controls public visibility of the selected article."}
                ],
                "steps": [
                    "1. Access 'Content' from the Platform Engine sidebar category.",
                    "2. Select the desired category (e.g., 'Help Center Articles').",
                    "3. Click 'Create New Article' to draft a guide on platform features.",
                    "4. To update legal policies, locate the document, make revisions, and increment the policy version number.",
                    "5. Click 'Publish' to push content updates to the public web application."
                ],
                "related_pages": ["/admin/templates", "/admin/help", "/admin/settings"],
                "limitations": "Updates to statutory legal terms (Terms of Service, Privacy Policy) automatically flag all users to re-accept updated terms upon next login."
            },
            {
                "num": 38,
                "name": "Hiring & Offer Template Library",
                "url": "/admin/templates",
                "screenshot": "36-templates.png",
                "purpose": "Manages standardized, legally vetted contract templates for full-time employment, freelance contracts, non-disclosure agreements (NDAs), and ESOP grant letters.",
                "used_for": [
                    "Providing startups with standard, Indian-law compliant offer letter templates.",
                    "Managing freelance milestone contract structures and intellectual property assignment agreements.",
                    "Configuring dynamic placeholder tokens (e.g. `{{candidate_name}}`, `{{ctc_amount}}`, `{{probation_months}}`).",
                    "Enforcing mandatory legal clauses protecting talent and employer rights."
                ],
                "main_features": [
                    "Templates Catalog Grid: Standard Full-Time Employment Agreement, Freelance Milestone Contract, Standard Mutual NDA, and Advisor Equity Agreement.",
                    "Category Filter Tabs: Employment, Freelance & Contractor, Legal & Confidentiality, and Equity & Grants.",
                    "Dynamic Token Inspector: Side panel showing available system tokens for candidate data merging.",
                    "Template Action Toolbar: Create New Template, Preview PDF, Clone Template, and Deprecate."
                ],
                "actions": [
                    {"control": "Create New Template (Button)", "description": "Navigates to template creation wizard (/admin/templates/new)."},
                    {"control": "Edit Template (Button)", "description": "Navigates to template edit studio (/admin/templates/[id])."},
                    {"control": "Preview Rendered PDF (Button)", "description": "Displays live PDF preview merged with dummy candidate data."},
                    {"control": "Toggle Template Status", "description": "Enables or disables template for startup usage."}
                ],
                "steps": [
                    "1. Navigate to 'Templates' under Platform Engine.",
                    "2. Browse available contract categories or search by template title.",
                    "3. Click 'Create New Template' to draft a new role-specific hiring agreement.",
                    "4. To modify existing agreement terms, click 'Edit Template'.",
                    "5. Click 'Preview Rendered PDF' to ensure variable token replacement renders cleanly."
                ],
                "related_pages": ["/admin/templates/new", "/admin/templates/TPL-2026-00109", "/admin/content"],
                "limitations": "All platform standard templates are reviewed by licensed Indian legal counsel; custom modifications uploaded by startups require founder liability sign-off."
            },
            {
                "num": 39,
                "name": "Contract & Offer Template Creator",
                "url": "/admin/templates/new",
                "screenshot": "37-template-new.png",
                "purpose": "Authoring workbench for creating new legally binding employment offer templates, contractor agreements, or advisory contracts.",
                "used_for": [
                    "Drafting standardized contract text using markdown and merge tokens.",
                    "Configuring mandatory statutory clauses (provident fund, gratuity, notice periods).",
                    "Inserting electronic signature placeholders for employer and candidate.",
                    "Saving templates as drafts or publishing them directly to the startup library."
                ],
                "main_features": [
                    "Template Metadata Form: Template Title, Category Selector, Applicable Jurisdiction (Indian Law / State Specific), and Description.",
                    "Markdown Contract Editor: Syntax-highlighted text editor with token autocomplete (`{{` prompt).",
                    "Available Variables Palette: Clickable list of dynamic tokens (Candidate Name, CTC, Base Salary, HRA, Notice Period, Joining Date).",
                    "Action Buttons: Save Draft, Publish Template, and Cancel."
                ],
                "actions": [
                    {"control": "Save Draft (Button)", "description": "Saves template progress without publishing to the startup directory."},
                    {"control": "Publish Template (Button)", "description": "Validates syntax and makes template available for all verified startups."},
                    {"control": "Insert Token (Click Action)", "description": "Inserts selected variable tag into the editor at current cursor position."}
                ],
                "steps": [
                    "1. Click 'Create New' from the Templates Library.",
                    "2. Enter a descriptive title and select the appropriate legal category.",
                    "3. Draft the contract clauses, inserting dynamic variable tags where appropriate.",
                    "4. Use 'Save Draft' to preserve work-in-progress.",
                    "5. Complete legal review and click 'Publish Template' to activate for employers."
                ],
                "related_pages": ["/admin/templates", "/admin/content"],
                "limitations": "Unclosed token brackets (e.g. `{{candidate_name`) trigger automated syntax validation warnings before publishing is allowed."
            },
            {
                "num": 40,
                "name": "Contract Template Editor",
                "url": "/admin/templates/[id]",
                "screenshot": "38-template-edit.png",
                "purpose": "Editing and revision studio for modifying an existing contract template, managing clause versioning, and reviewing live usage metrics.",
                "used_for": [
                    "Updating clause wording, statutory provident fund percentages, or termination covenants.",
                    "Viewing active contracts currently utilizing this template version.",
                    "Publishing a minor revision or major version increment.",
                    "Deprecating obsolete contract variations."
                ],
                "main_features": [
                    "Template Header: Template ID (TPL-2026-00109), Current Version (v2.1), Active Contracts Count (340), and Last Modified Date.",
                    "Dual-Pane Editor & Preview: Markdown editor on the left; formatted legal document preview on the right.",
                    "Version Changelog History: Track changes made across historical revisions.",
                    "Publish Controls: Save Changes, Increment Version, and Deprecate."
                ],
                "actions": [
                    {"control": "Save Changes (Button)", "description": "Updates current template version."},
                    {"control": "Create Major Version (Button)", "description": "Creates new version (e.g. v3.0) without altering existing in-flight offers."},
                    {"control": "Deprecate Template (Button)", "description": "Archives template and prevents future adoption."}
                ],
                "steps": [
                    "1. Select a template from the library to open the editor.",
                    "2. Make necessary adjustments to contract clauses or token placeholders.",
                    "3. Inspect the live rendered document on the right pane to verify layout.",
                    "4. Click 'Save Changes' to push updates to new offers generated by startups.",
                    "5. Document changes in the version changelog modal."
                ],
                "related_pages": ["/admin/templates", "/admin/content"],
                "limitations": "Editing a template does not alter contracts that have already been digitally signed and counter-signed by parties."
            }
        ]
    },
    {
        "id": "module-10",
        "number": 10,
        "name": "Infrastructure, Configuration & Integrations",
        "description": "System health monitoring, third-party API connections, dynamic runtime feature flags, and broadcast notification dispatchers.",
        "pages": [
            {
                "num": 41,
                "name": "Infrastructure Health & Diagnostics",
                "url": "/admin/system",
                "screenshot": "39-system.png",
                "purpose": "Monitors platform infrastructure health, cloud microservice availability, database latency, Redis memory pressure, and background task queues.",
                "used_for": [
                    "Assessing real-time operational status across all platform services and clusters.",
                    "Monitoring PostgreSQL connection pools, TimescaleDB telemetry, and Redis cache hit ratios.",
                    "Tracking Celery/BullMQ background worker queue depths and error rates.",
                    "Activating emergency platform maintenance mode during scheduled upgrade windows."
                ],
                "main_features": [
                    "System Status Header: Overall Platform Status (Operational / Degraded / Maintenance), Uptime (99.98%), and Global Latency (42ms).",
                    "Service Health Cards: Individual status indicators for Web App, Core API, Auth Service, Matching Engine, Notification Worker, and Database Clusters.",
                    "Resource Telemetry Gauges: Visual gauges for CPU Load, Memory Utilization, Disk I/O, and Active Database Connections.",
                    "Emergency Controls: Maintenance Mode toggle switch and Cache Flush triggers."
                ],
                "actions": [
                    {"control": "Maintenance Mode Toggle", "description": "Puts platform into read-only maintenance mode with custom user message."},
                    {"control": "Flush Redis Cache (Button)", "description": "Purges cached API responses and session metadata."},
                    {"control": "Restart Background Workers (Button)", "description": "Sends graceful restart signal to queued worker processes."},
                    {"control": "Download Diagnostic Dump (JSON)", "description": "Exports full telemetry dump for DevOps engineers."}
                ],
                "steps": [
                    "1. Open 'System' from the Platform Engine sidebar category.",
                    "2. Check the headline status indicator to ensure all microservices show green 'Operational' status.",
                    "3. Inspect queue depths to ensure background tasks (emails, vector embeddings) are not backing up.",
                    "4. If scheduled maintenance is required, toggle 'Maintenance Mode' and set the expected maintenance window.",
                    "5. After server upgrades conclude, toggle 'Maintenance Mode' off to restore normal access."
                ],
                "related_pages": ["/admin/config", "/admin/integrations", "/admin/events"],
                "limitations": "Toggling Maintenance Mode permits administrators to remain logged in while displaying a branded maintenance splash screen to standard users."
            },
            {
                "num": 42,
                "name": "Third-Party Integrations & API Hub",
                "url": "/admin/integrations",
                "screenshot": "40-integrations.png",
                "purpose": "Manages platform connections with external APIs, payment gateways, identity verification providers, transactional email relays, and cloud services.",
                "used_for": [
                    "Configuring API credentials and webhooks for Razorpay, Cashfree, and Stripe.",
                    "Managing government bridge integrations (DPIIT Startup India API, MCA21, DigiLocker).",
                    "Monitoring external service latency, quota limits, and API error rates.",
                    "Rotating expired API secret keys and re-authenticating OAuth connections."
                ],
                "main_features": [
                    "Integration Hub Cards: Categorized cards for Payment Gateways (Razorpay), Identity & Reg (DigiLocker, MCA), Communications (Twilio, Resend), and AI (Google Gemini).",
                    "Health & Connectivity Badges: Connected, Degraded, Action Required, and Disconnected indicators.",
                    "API Quota Usage Bars: Real-time progress bars showing monthly API consumption against subscription quotas.",
                    "Configuration Drawer: Sliding modal to securely update API keys, webhook signing secrets, and callback endpoints."
                ],
                "actions": [
                    {"control": "Configure Integration (Button)", "description": "Opens modal to update API keys and endpoints."},
                    {"control": "Test Connection (Button)", "description": "Sends live ping to verify API key validity and latency."},
                    {"control": "Rotate Secrets (Button)", "description": "Initiates secret rotation protocol with zero downtime."},
                    {"control": "Sync Data (Button)", "description": "Forces immediate synchronization with external registry."}
                ],
                "steps": [
                    "1. Access 'Integrations' under Platform Engine.",
                    "2. Review the connectivity status of all third-party partner services.",
                    "3. To update an API key, click 'Configure' on the respective service card.",
                    "4. Enter the new credentials and click 'Test Connection' to verify handshakes.",
                    "5. Save changes and confirm that event webhooks receive successful test pings."
                ],
                "related_pages": ["/admin/system", "/admin/events", "/admin/config"],
                "limitations": "API keys are encrypted in PostgreSQL using envelope encryption with AWS KMS; raw secret keys are never exposed in plaintext in the UI."
            },
            {
                "num": 43,
                "name": "Feature Flags & Runtime Configuration",
                "url": "/admin/config",
                "screenshot": "41-config.png",
                "purpose": "Provides real-time runtime configuration, feature flag rollouts, canary deployments, and operational kill-switches without requiring code redeployments.",
                "used_for": [
                    "Managing canary rollouts for new UI features and matching algorithms.",
                    "Controlling percentage rollouts across user cohorts (e.g., 20% of talent users).",
                    "Operating emergency feature kill-switches (e.g. disable instantaneous instant payouts during banking instability).",
                    "Configuring runtime environment constants and timeout limits."
                ],
                "main_features": [
                    "Configuration Flags Table: Flag Name, Key (`ai_matching_v2`), Target Role, Rollout Percentage (0-100%), Status (Active, Inactive, Canary), and Last Modified.",
                    "Interactive Toggle Switches: Immediate one-click activation or deactivation of runtime properties.",
                    "Rollout Percentage Slider: Granular slider controlling partial traffic distribution.",
                    "Create Flag Button: Direct trigger navigating to the Feature Flag Creation Studio."
                ],
                "actions": [
                    {"control": "Toggle Flag (Switch)", "description": "Instantly enables or disables the flag across the platform."},
                    {"control": "Adjust Rollout (Slider)", "description": "Modifies user cohort percentage receiving the feature."},
                    {"control": "Create New Flag (Button)", "description": "Navigates to the Flag Authoring Wizard (/admin/config/new)."},
                    {"control": "Audit History (Button)", "description": "Shows chronological record of who modified each flag."}
                ],
                "steps": [
                    "1. Access 'Config' from the Platform Engine sidebar category.",
                    "2. Locate the target feature flag using the search bar.",
                    "3. Click the toggle switch to immediately enable or disable the feature.",
                    "4. For gradual rollouts, adjust the percentage slider and specify target user cohorts.",
                    "5. Verify that changes propagate to connected client applications via WebSocket broadcasts."
                ],
                "related_pages": ["/admin/config/new", "/admin/system", "/admin/audit"],
                "limitations": "Feature flag state changes are cached in Redis and propagate to all frontend client sessions within 5 seconds."
            },
            {
                "num": 44,
                "name": "Feature Flag & Config Property Provisioning",
                "url": "/admin/config/new",
                "screenshot": "42-config-new.png",
                "purpose": "Authoring workbench for provisioning new feature flags, runtime variables, and experimental canary configurations.",
                "used_for": [
                    "Defining new feature flag keys for upcoming product releases.",
                    "Setting default boolean values, JSON configuration schemas, or integer limits.",
                    "Configuring targeting rules based on user roles, verification standing, or geographic state.",
                    "Attaching documentation and ownership tags to prevent stale flag clutter."
                ],
                "main_features": [
                    "Flag Identity Form: Flag Name, Code Key (`enable_upi_autopay`), Description, and Lead Engineering Owner.",
                    "Flag Type Selector: Boolean Toggle, Multivariate String, Number Quota, or JSON Payload.",
                    "Targeting Rules Engine: Rules based on Role (Employer, Talent, Investor), Account Age, and Verification Status.",
                    "Rollout Strategy Selector: Global 100%, Disabled 0%, Percentage Canary, or Targeted User Whitelist."
                ],
                "actions": [
                    {"control": "Save Configuration (Button)", "description": "Creates feature flag in the runtime matrix."},
                    {"control": "Add Targeting Condition (Button)", "description": "Adds specialized filtering rules for cohort access."},
                    {"control": "Cancel (Button)", "description": "Aborts creation and returns to Config overview."}
                ],
                "steps": [
                    "1. Click 'Create Flag' from the Runtime Configuration page.",
                    "2. Enter the flag name, code key, and detailed description of the feature.",
                    "3. Select the flag type (e.g. Boolean) and set initial default value.",
                    "4. Add any cohort targeting conditions to restrict rollout to specific user groups.",
                    "5. Click 'Save Configuration' to register the flag in the runtime engine."
                ],
                "related_pages": ["/admin/config", "/admin/system"],
                "limitations": "Flag keys must follow snake_case format and cannot be modified once referenced in production codebase builds."
            },
            {
                "num": 45,
                "name": "System Broadcasts & Notification Dispatcher",
                "url": "/admin/notifications",
                "screenshot": "43-notifications.png",
                "purpose": "Manages platform-wide system announcements, emergency maintenance banners, automated transactional notification templates, and marketing campaigns.",
                "used_for": [
                    "Dispatching urgent broadcast alerts to all active platform users.",
                    "Configuring multi-channel delivery rules (In-App Toast, Email, SMS, WhatsApp).",
                    "Scheduling scheduled announcements for upcoming regulatory deadlines or platform updates.",
                    "Reviewing notification delivery success rates, open rates, and click-through metrics."
                ],
                "main_features": [
                    "Broadcast Metrics Ribbon: Total Dispatched (MTD), Delivery Rate (99.4%), Average Open Rate (44.2%), and Active In-App Banners.",
                    "Broadcast History Table: Campaign Title, Target Cohort, Channels, Dispatch Date, Delivery Status, and Open Rate.",
                    "Notification Composer: Rich-text composer supporting markdown, CTA buttons, and variable tokens.",
                    "Audience Selector: Target All Users, Verified Startups Only, Active Jobseekers, or Custom User Segments."
                ],
                "actions": [
                    {"control": "Create Broadcast (Button)", "description": "Opens broadcast composition studio."},
                    {"control": "Schedule Dispatch (Button)", "description": "Sets future date/time for automated notification send."},
                    {"control": "Send Immediate Test (Button)", "description": "Dispatches sample broadcast to administrator's devices."},
                    {"control": "Deactivate Active Banner (Button)", "description": "Instantly dismisses live top-bar announcements across all clients."}
                ],
                "steps": [
                    "1. Access 'Notifications' from the Administration category in the sidebar.",
                    "2. Click 'Create Broadcast' to begin authoring an announcement.",
                    "3. Select target delivery channels (In-App, Email, SMS) and define recipient cohort.",
                    "4. Draft the announcement text and attach action buttons linking to relevant platform pages.",
                    "5. Send a test message to yourself, then click 'Send Now' or 'Schedule' to distribute."
                ],
                "related_pages": ["/admin/content", "/admin/users", "/admin/system"],
                "limitations": "SMS and WhatsApp broadcasts are restricted to statutory transactional notices under Indian TRAI DND regulations."
            }
        ]
    },
    {
        "id": "module-11",
        "number": 11,
        "name": "Administration, Access Control & Authentication",
        "description": "Internal staff permissions, Role-Based Access Control (RBAC), global platform settings, admin help manual, and security authentication gatekeeper.",
        "pages": [
            {
                "num": 46,
                "name": "Admin Staff & Role-Based Access Control",
                "url": "/admin/staff",
                "screenshot": "46-staff.png",
                "purpose": "Manages internal administrative staff personnel, permission roles, granular access privileges, and mandatory multi-factor authentication (MFA).",
                "used_for": [
                    "Provisioning new administrative staff accounts for operations, compliance, support, and finance.",
                    "Configuring Role-Based Access Control (RBAC) permissions (Super Admin, Trust Officer, Support Specialist, Finance Admin, Read-Only Auditor).",
                    "Enforcing mandatory 2FA/FIDO2 hardware security keys for administrative logins.",
                    "Revoking staff credentials and auditing internal administrative session activity."
                ],
                "main_features": [
                    "Staff Directory Table: Staff Name, Work Email, Assigned Role Badge, 2FA Enforcement Status (Enforced / Pending), Last Active, and Account State.",
                    "Role Permission Matrix: Visual grid displaying granular permissions (User Edit, Escrow Release, Flag Toggle, Log Inspection) across all admin roles.",
                    "Invite Staff Drawer: Modal to invite new administrative staff via corporate Google Workspace / Okta SSO email.",
                    "Revoke Access Safeguard: Immediate session termination and credential invalidation mechanism."
                ],
                "actions": [
                    {"control": "Invite Staff Member (Button)", "description": "Opens invitation modal to provision a new internal account."},
                    {"control": "Modify Role (Dropdown)", "description": "Reassigns staff permissions tier with dual-admin confirmation."},
                    {"control": "Force Password Reset (Button)", "description": "Invalidates current password and requires reset on next login."},
                    {"control": "Deactivate Staff Account (Button)", "description": "Immediately suspends internal access and terminates active JWTs."}
                ],
                "steps": [
                    "1. Navigate to 'Staff' in the Administration sidebar category.",
                    "2. Review the active staff list and verify that all members have 2FA enforced.",
                    "3. Click 'Invite Staff Member' and enter their corporate email address and assigned role.",
                    "4. To adjust access privileges for an existing member, edit their assigned role in the directory.",
                    "5. To instantly revoke access for departing personnel, click 'Deactivate Staff Account'."
                ],
                "related_pages": ["/admin/settings", "/admin/audit", "/admin/users"],
                "limitations": "Modification of Super Admin accounts or RBAC role permissions requires dual-administrator sign-off to prevent unilateral privilege escalation."
            },
            {
                "num": 47,
                "name": "Global Platform Preferences & Security Baselines",
                "url": "/admin/settings",
                "screenshot": "47-settings.png",
                "purpose": "Configures enterprise platform preferences, security policies, password complexity rules, session timeout thresholds, and corporate branding.",
                "used_for": [
                    "Setting platform session timeout limits (e.g. 15-minute inactivity lock for admin sessions).",
                    "Configuring password complexity standards, lockout thresholds, and 2FA requirements.",
                    "Managing corporate contact info, legal entity details, and support escalation emails.",
                    "Configuring IP allowlists for administrative portal access."
                ],
                "main_features": [
                    "Settings Category Tabs: General & Branding, Security & Authentication, Email & Communications, Compliance & Legal, and API Security.",
                    "Security Configuration Form: Password Length, Special Character Requirements, Max Failed Login Attempts (5), and Session Inactivity Timeout (Minutes).",
                    "IP Allowlist Management: List of authorized corporate CIDR blocks permitted to access the admin portal.",
                    "Branding Customization: Platform Logo, Favicon, Corporate Legal Name, and Default Currency (INR)."
                ],
                "actions": [
                    {"control": "Save Settings (Button)", "description": "Persists updated global settings to platform database."},
                    {"control": "Reset to Defaults (Button)", "description": "Restores system configuration to default security baselines."},
                    {"control": "Add Authorized IP (Button)", "description": "Appends corporate VPN IP address to admin portal allowlist."}
                ],
                "steps": [
                    "1. Access 'Settings' from the Administration category in the sidebar.",
                    "2. Switch between setting category tabs to locate the target configuration area.",
                    "3. In the 'Security & Authentication' tab, configure session timeout intervals and password policies.",
                    "4. Add your company's VPN IP subnet to the IP Allowlist to restrict administrative portal exposure.",
                    "5. Click 'Save Settings' to apply changes platform-wide."
                ],
                "related_pages": ["/admin/staff", "/admin/system", "/admin/audit"],
                "limitations": "Changes to security session timeout settings take effect on subsequent user logins."
            },
            {
                "num": 48,
                "name": "Admin Operational Manual & Support Center",
                "url": "/admin/help",
                "screenshot": "48-help.png",
                "purpose": "Provides internal operational reference documentation, standard operating procedures (SOPs), keyboard shortcut indices, and direct escalation channels for platform administrators.",
                "used_for": [
                    "Accessing internal SOP guides for complex verification, fraud, and dispute scenarios.",
                    "Reviewing keyboard navigation shortcuts (`Cmd+K`, `/`, `J`, `K`) to maximize operational speed.",
                    "Contacting the internal engineering on-call and DevOps team during platform incidents.",
                    "Downloading offline PDF versions of the Admin User Manual."
                ],
                "main_features": [
                    "Operational Guide Cards: Step-by-step SOPs covering DPIIT Verification, Dispute Arbitration, Fraud Escalation, and Data Erasure.",
                    "Keyboard Shortcuts Palette: Complete list of global shortcuts for rapid navigation and triage.",
                    "On-Call Engineering Directory: Direct contact numbers and Slack channels for active incident response commanders.",
                    "Manual Download Widget: One-click button to download the latest compiled PDF of the complete Admin User Manual."
                ],
                "actions": [
                    {"control": "Open SOP Guide (Button)", "description": "Displays detailed step-by-step standard operating procedure modal."},
                    {"control": "Download Admin Manual (PDF)", "description": "Downloads complete offline PDF documentation package."},
                    {"control": "Trigger On-Call Alert (Button)", "description": "Dispatches emergency PagerDuty page to engineering leads."}
                ],
                "steps": [
                    "1. Access 'Help' from the Administration category in the sidebar.",
                    "2. Review the SOP guide corresponding to your current operational task.",
                    "3. Practice keyboard shortcuts to accelerate daily review queue processing.",
                    "4. In the event of a platform outage or severe bug, use the On-Call Directory to page engineering.",
                    "5. Download the offline PDF manual for local archival and compliance reference."
                ],
                "related_pages": ["/admin", "/admin/system", "/admin/staff"],
                "limitations": "The On-Call Alert trigger is reserved exclusively for Severity-1 platform incidents impacting financial transactions or data security."
            },
            {
                "num": 49,
                "name": "Admin Authentication Portal & Gatekeeper",
                "url": "/admin/login",
                "screenshot": "49-login.png",
                "purpose": "Serves as the secure entry gatekeeper, identity challenge, and multi-factor authentication portal protecting all administrative functions.",
                "used_for": [
                    "Authenticating administrative personnel via corporate credentials and multi-factor authentication (MFA).",
                    "Enforcing rate-limiting and brute-force lockout defenses against unauthorized access attempts.",
                    "Routing administrators through corporate Single Sign-On (SSO / SAML 2.0 / Google Workspace).",
                    "Establishing cryptographically signed, short-lived JWT administrative session tokens."
                ],
                "main_features": [
                    "Luxury-Technical Authentication Card: Styled in Forma slate navy and warm alabaster with high-security credentials form.",
                    "Multi-Factor Challenge: Secondary prompt for TOTP 6-digit authenticator code or hardware security key (WebAuthn).",
                    "Single Sign-On (SSO) Trigger: One-click corporate Google Workspace / Okta authentication link.",
                    "Security Notice Banner: Displays warning regarding authorized access only and comprehensive audit logging."
                ],
                "actions": [
                    {"control": "Sign In with Credentials (Button)", "description": "Validates email and password, proceeding to 2FA challenge."},
                    {"control": "Sign In with Google SSO (Button)", "description": "Initiates OAuth 2.0 corporate authentication flow."},
                    {"control": "Verify 2FA Code (Button)", "description": "Validates 6-digit time-based authenticator code and issues session JWT."},
                    {"control": "Forgot Password (Link)", "description": "Triggers administrative password recovery workflow."}
                ],
                "steps": [
                    "1. Navigate to /admin/login on any supported web browser.",
                    "2. Enter your authorized administrative email address and secure password.",
                    "3. Click 'Sign In' or use 'Sign In with Google SSO' for single sign-on access.",
                    "4. When prompted, enter the 6-digit TOTP code generated by your mobile authenticator app.",
                    "5. Upon successful verification, you are redirected to the Executive Dashboard (/admin)."
                ],
                "related_pages": ["/admin", "/admin/settings", "/admin/staff"],
                "limitations": "Administrative accounts lock automatically after 5 consecutive failed authentication attempts and require Super Admin unlock."
            }
        ]
    }
]

WORKFLOWS = [
    {
        "id": "wf-1",
        "num": 1,
        "title": "Onboarding, Reviewing, and Verifying a DPIIT Startup",
        "objective": "Guide an administrator through reviewing, validating, and approving a newly incorporated startup's DPIIT recognition certificate and corporate legal standing.",
        "involved_pages": ["/admin/verifications", "/admin/verifications/startup/ver_st_01", "/admin/organizations/org_01", "/admin/audit"],
        "steps": [
            "Step 1: Access the Verification Operations Queue at `/admin/verifications` and click the 'Startup Entities' tab to filter pending submissions.",
            "Step 2: Locate the startup submission (e.g. 'FinFlow Technologies Pvt Ltd') and check the SLA clock pill to ensure review occurs within the 24-hour turnaround window.",
            "Step 3: Click 'Inspect Document' to open the dual-pane Verification Dossier at `/admin/verifications/startup/ver_st_01`.",
            "Step 4: Use the zoom and pan controls in the document viewer pane to examine the Ministry of Commerce & Industry DPIIT Certificate, verifying the DIPP recognition number and digital signature.",
            "Step 5: Cross-check the OCR-extracted data against the official Ministry database preview on the right, confirming that the Corporate Identification Number (CIN) and entity legal name match exactly.",
            "Step 6: Complete the mandatory inspection checklist items: 'Entity Name Match', 'CIN Active Status', 'Authorized Signatory Verification', and 'Valid Incorporation Date'.",
            "Step 7: Click 'Approve & Issue Badge'. The platform automatically issues the verified badge, triggers a celebratory notification to the startup founders, and logs the cryptographic approval record in the Audit Trail at `/admin/audit`."
        ]
    },
    {
        "id": "wf-2",
        "num": 2,
        "title": "Triaging Content Moderation Flags and Resolving User Appeals",
        "objective": "Standard operating procedure for handling flagged job postings containing misleading salary claims, issuing behavioral strikes, and processing subsequent appeals.",
        "involved_pages": ["/admin/moderation", "/admin/moderation/MOD-2026-0891", "/admin/appeals", "/admin/users/usr_01"],
        "steps": [
            "Step 1: Navigate to `/admin/moderation` and filter the queue by 'Critical' or 'High' severity to prioritize immediate trust risks.",
            "Step 2: Click on the incident row (e.g. `MOD-2026-0891`) to open the comprehensive Moderation Incident Case File at `/admin/moderation/[id]`.",
            "Step 3: Inspect the flagged text snippet, highlighted with red tokens indicating matched policy rules (e.g. 'Unrealistic compensation / upfront fee solicitation').",
            "Step 4: Review the author's historical record in the right-hand panel to determine whether previous strikes have been recorded against this account.",
            "Step 5: In the Sanction Selector console, choose 'Remove Content & Issue Strike (Level 1)', select the pre-approved legal notification template, and click 'Submit Final Resolution'.",
            "Step 6: If the employer submits a formal counter-rebuttal, access the Moderation Appeals Queue at `/admin/appeals` and open the linked appeal file.",
            "Step 7: Evaluate the counter-evidence. If legitimate error occurred, click 'Overturn Penalty & Reinstate'; otherwise, click 'Uphold Penalty' to conclude the case."
        ]
    },
    {
        "id": "wf-3",
        "num": 3,
        "title": "Investigating Fraud Alerts, Freezing Wallets, and Setting Payee Holds",
        "objective": "Detecting suspicious financial behavior, multi-account sybil attacks, freezing compromised accounts, and placing holds on outbound disbursements.",
        "involved_pages": ["/admin/fraud", "/admin/users/usr_01", "/admin/payouts", "/admin/audit"],
        "steps": [
            "Step 1: Open the Fraud Detection dashboard at `/admin/fraud` and inspect the high-risk event stream.",
            "Step 2: Identify high-risk alerts with risk scores >85 (e.g. 'Identical PAN linked to 4 distinct user accounts across disparate IP subnets').",
            "Step 3: Click on the suspicious user entity to open their 360-degree dossier at `/admin/users/[id]`.",
            "Step 4: Inspect the Security Audit tab to analyze recent login IPs, device fingerprints, and payment attempts.",
            "Step 5: Immediately click 'Freeze Wallet & Payouts' in the administrative action bar to halt all outbound capital movement.",
            "Step 6: Navigate to `/admin/payouts`, select the 'Active Payee Holds' tab, and confirm that the user's pending disbursements have been placed in administrative quarantine.",
            "Step 7: File an internal forensic note and export the fraud dossier PDF for compliance and banking security review."
        ]
    },
    {
        "id": "wf-4",
        "num": 4,
        "title": "Approving Weekly Payout Batches and Generating Bank NACH/NEFT Manifests",
        "objective": "Routine financial operational workflow for verifying talent earnings, auditing statutory TDS tax withholding, and releasing bank disbursement batches.",
        "involved_pages": ["/admin/payouts", "/admin/payouts/batches/BAT-2026-11-10", "/admin/billing", "/admin/audit"],
        "steps": [
            "Step 1: Access Disbursement Operations at `/admin/payouts` every Tuesday at 10:00 AM IST for scheduled weekly batch processing.",
            "Step 2: Review the headline summary cards to verify Gross Volume, Total TDS Accruals (Section 194J/194C), and Net Disbursement obligations.",
            "Step 3: Click 'Inspect Batch' on the scheduled batch (e.g. `BAT-2026-11-10`) to open the complete itemized manifest at `/admin/payouts/batches/[id]`.",
            "Step 4: Review the 42 line items, verifying that all payees possess verified penny-drop bank validations and that TDS deductions match the statutory 10% rate.",
            "Step 5: If any payee is flagged for incomplete KYC or an active contract dispute, check their individual 'Exclude' box to hold their funds while proceeding with the rest of the batch.",
            "Step 6: Click 'Download Bank Manifest (CSV)' to generate the banking gateway payment file formatted for corporate net banking bulk upload.",
            "Step 7: Click 'Authorize & Disburse Batch' and complete secondary hardware security key authentication to transmit release instructions to the banking gateway."
        ]
    },
    {
        "id": "wf-5",
        "num": 5,
        "title": "Fulfilling DPDP Data Subject Access & Erasure Requests (Right to be Forgotten)",
        "objective": "Processing statutory privacy requests under the Digital Personal Data Protection Act 2023 within the mandatory 30-day compliance window.",
        "involved_pages": ["/admin/data-requests", "/admin/data-requests/DSR-2026-041", "/admin/compliance", "/admin/audit"],
        "steps": [
            "Step 1: Navigate to `/admin/data-requests` and sort the table by 'Days Remaining' to prioritize tickets nearing statutory SLA deadlines.",
            "Step 2: Select a pending erasure request (e.g. `DSR-2026-041`) and click 'Open DSR Dossier' to access `/admin/data-requests/[id]`.",
            "Step 3: Verify that the submitter has completed secondary identity authentication via timestamped Aadhaar OTP verification.",
            "Step 4: Check the applicant's account to confirm there are no active milestone escrow disputes or outstanding financial obligations.",
            "Step 5: Review the statutory exceptions notice: financial invoices, tax withholding records, and audit log entries will be preserved for the mandatory 7-year statutory period under Indian law.",
            "Step 6: Click 'Execute Irreversible Erasure' and confirm the multi-step prompt by entering your administrator password. The platform cryptographic pipeline anonymizes all personal identifiers across profiles, resumes, and search indices.",
            "Step 7: Click 'Issue Erasure Certificate' to dispatch the signed PDF compliance certificate to the user and log the completion in `/admin/audit`."
        ]
    },
    {
        "id": "wf-6",
        "num": 6,
        "title": "Managing Canary Feature Flag Rollouts and Platform Maintenance Windows",
        "objective": "Deploying runtime configuration changes, performing gradual percentage feature rollouts, and placing the platform into emergency maintenance mode.",
        "involved_pages": ["/admin/config", "/admin/config/new", "/admin/system", "/admin/audit"],
        "steps": [
            "Step 1: Navigate to Runtime Configuration at `/admin/config` to inspect active feature flags and canary percentages.",
            "Step 2: To create a new feature rollout, click 'Create Flag' and enter flag parameters at `/admin/config/new` (e.g. key: `ai_vector_matching_v2`, type: Boolean, target: Employers).",
            "Step 3: Set the Rollout Strategy to 'Percentage Canary' and set the initial slider to 10% to expose the feature to a pilot cohort.",
            "Step 4: Click 'Save Configuration'. Monitor system telemetry at `/admin/system` over the next 24 hours to confirm API latency and error rates remain stable.",
            "Step 5: Gradually advance the rollout slider to 25%, 50%, and finally 100% to achieve full production deployment.",
            "Step 6: In the event of an infrastructure upgrade or critical database migration, navigate to `/admin/system` and toggle 'Maintenance Mode' to 'Active'.",
            "Step 7: Verify that external users see the branded maintenance notice while administrative staff maintain access to monitor system diagnostics."
        ]
    },
    {
        "id": "wf-7",
        "num": 7,
        "title": "Publishing Government Grant Opportunities and Calibrating Matching Engine",
        "objective": "Publishing a newly announced DPIIT incubator grant, configuring eligibility rules, and tuning vector matching weights to surface ideal startup candidates.",
        "involved_pages": ["/admin/opportunities", "/admin/opportunities/new", "/admin/matching", "/admin/organizations"],
        "steps": [
            "Step 1: Access Government Grants & Opportunities at `/admin/opportunities` and click 'Create New Opportunity'.",
            "Step 2: Complete the Opportunity Publishing Studio form at `/admin/opportunities/new`, entering program details (e.g. 'DPIIT Seed Fund Scheme - Agritech Cohort 4').",
            "Step 3: In the Eligibility Matrix, toggle 'DPIIT Recognition Required' to 'Yes', select sector tags ('Agritech', 'Supply Chain'), and set the maximum grant cap to INR 50,00,000.",
            "Step 4: Specify the application cutoff deadline and click 'Publish Opportunity' to distribute the announcement across the startup ecosystem feed.",
            "Step 5: Navigate to `/admin/matching` to calibrate the AI vector matching engine to surface relevant startup candidates for the new grant.",
            "Step 6: Adjust the algorithmic weight sliders to increase 'Domain Relevance' to 45% and test the calibration using the 'Run Match Simulation' sandbox.",
            "Step 7: Click 'Calibrate Weights' to deploy the updated matching parameters to the live platform recommendation service."
        ]
    }
]

GLOSSARY = [
    {"term": "DPIIT", "definition": "Department for Promotion of Industry and Internal Trade (Ministry of Commerce and Industry, Government of India). The nodal government body responsible for official recognition of Indian startups."},
    {"term": "CIN", "definition": "Corporate Identification Number. A 21-digit alphanumeric unique identifier assigned by the Ministry of Corporate Affairs (MCA) to all companies registered in India."},
    {"term": "GSTIN", "definition": "Goods and Services Tax Identification Number. A 15-digit state-wise unique tax identifier used for Indian corporate taxation and invoice generation."},
    {"term": "DPDP Act 2023", "definition": "Digital Personal Data Protection Act, 2023. India's comprehensive statutory data protection law governing digital personal data processing, consent, and user data rights."},
    {"term": "Escrow", "definition": "A neutral financial arrangement where platform contract funds are held securely until agreed milestone deliverables are verified and accepted by both parties."},
    {"term": "GTV", "definition": "Gross Transaction Value. The cumulative monetary value of all transactions, contracts, and subscriptions processed across the platform before fee deductions."},
    {"term": "MRR", "definition": "Monthly Recurring Revenue. The normalized monthly recurring subscription income generated from active paid plans across employers, talent, and investors."},
    {"term": "TDS", "definition": "Tax Deducted at Source. Statutory Indian direct tax withheld by the platform on freelancer payouts under Section 194J (professional fees) or Section 194C (contracts)."},
    {"term": "Section 194J", "definition": "Provision of the Indian Income Tax Act mandating a 10% (or 2% for technical fees) TDS withholding on fees paid for professional or technical services."},
    {"term": "Section 206AA", "definition": "Statutory rule mandating a higher 20% TDS withholding rate when a payee fails to provide a verified and valid Permanent Account Number (PAN)."},
    {"term": "DSR", "definition": "Data Subject Request. Formal legal requests submitted by platform users exercising privacy rights (Access/Export, Rectification, or Erasure) under the DPDP Act."},
    {"term": "Right to be Forgotten", "definition": "Statutory right allowing individuals to request complete erasure of their personal identity records, subject to statutory tax and financial retention laws."},
    {"term": "Cosine Similarity", "definition": "A mathematical metric used by the platform's AI vector matching engine to measure the semantic alignment between candidate resumes and job descriptions in high-dimensional embedding space."},
    {"term": "Penny Drop", "definition": "An automated banking verification API call that deposits INR 1 into a payee's bank account to cryptographically verify beneficiary name and IFSC validity prior to disbursements."},
    {"term": "NACH / NEFT", "definition": "National Automated Clearing House and National Electronic Funds Transfer. Standardized electronic funds transfer networks administered by the Reserve Bank of India (RBI)."},
    {"term": "Canary Rollout", "definition": "A software release technique where a new feature or algorithmic configuration is initially exposed to a small percentage (e.g. 10%) of users before full deployment."},
    {"term": "RBAC", "definition": "Role-Based Access Control. Security architecture that restricts administrative system access to authorized users based on predefined organizational roles."},
    {"term": "FIDO2 / WebAuthn", "definition": "Fast Identity Online standards enabling secure passwordless and multi-factor authentication using hardware security keys (e.g. YubiKeys) and biometric authenticators."},
    {"term": "SLA", "definition": "Service Level Agreement. Contractually binding or operational performance targets, such as reviewing verifications within 24 hours or resolving high-priority support tickets within 4 hours."},
    {"term": "Forma Design System", "definition": "The platform's proprietary luxury-technical design language characterized by slate navy (#0F1B2D), warm alabaster (#FAF8F4), antique brass (#B8955A), high information density, and refined micro-interactions."}
]
