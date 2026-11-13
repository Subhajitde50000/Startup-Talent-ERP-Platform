# Admin Shared Pages Design (production spec)

**App:** Platform admin console on its own subdomain (for example `admin.yourdomain.com`). Routes below are relative to that subdomain.
**Users:** every internal staff member: verification reviewers, moderators, support agents, finance, content and program managers, AI quality reviewers, compliance officers, security administrators, engineers and on-call, analysts, and super admins.

These three pages are the admin console's versions of the pages every role in the public product has: **Notifications**, **Settings** and **Help**. The layouts and components come from the shared designs you already have. This file defines only what is different for staff: what they are notified about and how, which settings are personal and which are controlled by the company, and the internal help, runbooks and guidance they rely on. It uses the same visual language as the rest of the admin console (ink, ivory, one gold accent, light and dark themes), and it lines up with the admin pages already designed: Dashboard, Verifications, Trust and safety, Support and data rights, Users and organizations, Content and programs, Money, Insights and compliance, and Operations.

| # | Page | Route | Admin content |
|---|---|---|---|
| 1 | Notifications | `/notifications` | Queue and SLA alerts, assignments, approvals, mentions, escalations, security and access events, incident and compliance notices |
| 2 | Settings (personal and security) | `/settings` | Sign-in and hardware keys, sessions and devices, notification and display preferences, my access, delegation, wellbeing settings |
| 3 | Internal Help and Runbooks | `/help` | How-to guides, runbooks, policies, moderation and verification guidance, escalation matrix, training, wellbeing, internal reporting |

> **Subdomain note.** The admin console is a separate app, so there is no per-route role-based file. Section 3 gives a short **who sees what** table (internal roles) because it decides what each page shows. Section 11 lists the controls the subdomain still needs (single sign-on, mandatory two-factor, server-side permission checks, minimal notification content, audit), because a separate address doesn't protect anything on its own.

> **Privacy and wellbeing reminder.** Notifications can leak sensitive information, and moderation and support work can be distressing. Notification text carries IDs and categories only. Settings and help give staff real control over exposure, breaks and delegation. Get legal and HR advice before launch on monitoring staff, wellbeing duties, whistleblowing channels, and what staff may be asked to attest.

---

## 1. Design principles

- **Right signal, right person, right moment:** staff are notified about what they can act on, once, with enough context to decide, and never about things they can't see.
- **No personal data in transit:** notifications, emails, chat messages and pushes carry IDs, categories, counts and deadlines. Names, message text, documents, amounts and identity details stay inside the console behind masking and purpose rules.
- **Urgent means urgent:** paging for true emergencies uses the paging system, not the notification feed. Everything else respects quiet hours and focus.
- **Control belongs to the person where safe:** theme, density, digests and shortcuts are personal. Security baselines, access and logging are company-controlled and can't be weakened from here.
- **Transparency about my own access:** staff can see exactly what they can do, what was granted, why and until when, and what the log records about them.
- **Wellbeing is built in:** blur defaults, exposure limits, break reminders and easy hand-off exist as settings and as help content, with no penalty for using them.
- **Help that stays current:** internal guidance has owners, versions and review dates, is searchable, and links directly from the pages where staff need it.
- **Everything is traceable:** changes to settings, delegations, device registrations and security options write to the append-only audit log.

---

## 2. Design tokens and shared look

Same tokens as the Admin Dashboard (ink, ivory, one gold accent, light and dark themes; `Fraunces` and `Inter`; mono for IDs; IST timestamps with a visible time zone; 8px grid; 12px cards; 10px controls). Staff can switch theme and density in Settings; the **environment strip** (`PRODUCTION` or `STAGING`) is always visible on every page.

### Shared chips

| Group | Chips |
|---|---|
| **Notification severity** | `Critical` (error fill), `Urgent` (error tint), `Action needed` (warning tint), `Info` (stone), `Digest` (stone outline) |
| **Notification state** | `New`, `Acknowledged` (ink outline), `Snoozed` (stone outline), `Resolved` (success tint), `Expired` (stone) |
| **Access type** | `Standing`, `Elevated (expires {date})`, `Break-glass` (error tint) |
| **Training** | `Current`, `Due {date}`, `Overdue` |
| **Doc status** | `Current`, `Review due`, `Draft`, `Retired` |
| **Audience** | `All staff`, or role chips (`Support`, `Moderation`, `Verification`, `Finance`, `Compliance`, `Security`, `Engineering`, `Content`, `AI quality`) |

---

## 3. Internal roles and what they see (content scoping)

| Internal role | Notifications | Settings | Help and runbooks |
|---|---|---|---|
| Support agent and supervisor | Support queue and SLA, tickets assigned or mentioned, approvals they requested or must give, security alerts about their own account | Personal sections, my access, delegation, wellbeing | Support guides, macros and tone guide, escalation matrix, data-rights triage guide |
| Verification reviewer | Verification queue and SLA, second-review requests, applicant replies, re-verification waves | Same as above | Verification checklists guidance, KYC provider guides |
| Trust and safety moderator | Moderation, reports, appeals, fraud alerts; wellbeing prompts; severity-1 routing notices | Same plus stronger wellbeing options | Policy explainers, case examples, decision trees, safety protocols |
| Finance | Payout and refund approvals, reconciliation exceptions, chargeback deadlines, close tasks | Same | Money procedures, tax and payout guides |
| Content and program manager | Review requests, scheduled publishes, event tasks, link and translation issues | Same | Content standards, event runbooks |
| AI quality reviewer | Review queue, release gate results, drift alerts | Same | Rubric guides, review procedures |
| Compliance officer and DPO | Data-rights deadlines, breach clocks, holds, authority requests, access review results | Same | Compliance procedures, incident and breach playbooks |
| Security administrator | Security alerts, credential rotations, access reviews, break-glass events | Same plus device and key administration views | Security runbooks and policies |
| Engineer and on-call | Alerts routed through paging; incident updates; change approvals; deploy and config notices | Same plus on-call preferences | Runbooks, architecture guides, incident process |
| Analyst | Metric and data quality notices | Same (minimal) | Analytics guides, metric registry help |
| Super admin | Org-level alerts, approvals, staff and role changes | Same | All guidance (including admin-only configuration guides) |

Visibility of items is enforced on the server. Items that a person can't act on are never created for them, and help pages that describe sensitive detection methods are visible only to the roles that need them.

---

# Part A. Notifications: `/notifications`

Uses the shared notifications design (list, filters, mark read, preferences link). Staff content below.

## A.1 Layout
Header with title, **Mark all as read**, **Snooze all non-urgent for…** (1, 4 hours, until tomorrow), and **Preferences** (links to Settings → Notifications). Tabs: **All** · **Needs action** · **Approvals** · **Mentions** · **Queues and SLAs** · **Security and access** · **Compliance and incidents** · **System** · **Digest**. Items are grouped by day, with **Critical** and **Urgent** pinned at the top while unresolved.

### Summary strip
| Card | Example |
|---|---|
| Needs action | 6 |
| Approvals waiting on you | 2 (warning tint when above zero) |
| Mentions | 3 |
| Critical or urgent open | 0 |

## A.2 Notification item
Severity chip, icon by category, one-line title, short detail, time, state chip, and a primary action (**Open**, **Approve**, **Review**, **Acknowledge**). Clicking opens the related page and marks it read. Overflow: **Snooze** (1 hour, 4 hours, tomorrow; not available for Critical), **Mute this type** (not allowed for protected types), **Unsubscribe from this case or queue**, **Copy ID**.

## A.3 Notification types

| Category | Notification | Severity | Action target |
|---|---|---|---|
| **Queues and SLAs** | Queue item at risk or breached (aggregate per queue) | Action needed or Urgent | Queue page |
| | Item assigned to you or returned to you | Action needed | Case page |
| | Applicant or requester replied | Action needed | Case or ticket |
| | Lock expired on a case you held | Info | Case page |
| | Severity-1 moderation or fraud item routed to you | Critical | Case page (specialized view) |
| **Approvals** | Approval requested (payout, refund, price change, config, access, elevation) | Action needed | Approval bar on the record |
| | Your request was approved, rejected or expired | Info | The record |
| | Approval waiting more than 24 hours (reminder to approver) | Action needed | The record |
| **Mentions and collaboration** | @mention in an internal note or incident | Action needed | The note |
| | Case escalated to you | Action needed | Case page |
| | Handoff received (on-call or queue) | Info | Handoff note |
| **Security and access** | New sign-in from a new device or location | Urgent | Settings → Sessions |
| | Hardware key or two-factor change | Urgent | Settings → Security |
| | Elevated access granted, expiring in 30 minutes, expired | Info or Action needed | Settings → My access |
| | Break-glass use (to the security administrator and compliance) | Critical | Break-glass review |
| | Access review assigned or overdue | Action needed | Staff page |
| | Training due or overdue | Action needed | Settings → My access |
| | Conflict declared on a record (to the new assignee) | Info | Case page |
| **Compliance and incidents** | Data-rights request due in 7, 3 and 1 days | Action needed to Urgent | Request page |
| | Breach clock running (to compliance, security, legal) | Critical | Incident record |
| | Legal hold review due | Action needed | Hold register |
| | Authority request received (compliance only) | Urgent | Requests tab |
| | Incident declared or updated (non-paging view) | Urgent | Incident page |
| **System and releases** | Maintenance window scheduled | Info | System page |
| | Config or flag change that affects your work | Info | Change record |
| | Policy rule, rubric or template update affecting your queue | Info | Content or Policy page |
| | Admin console release notes | Info | Help → Release notes |
| | Monitoring or provider degraded affecting your tools | Action needed | System page |
| **Wellbeing** | Break reminder after time on sensitive categories | Info | Settings → Wellbeing |
| | Check-in from your lead (optional, scheduled) | Info | Message |

On-call paging for incidents and critical alerts goes through the **paging system** (phone and device apps), not through this feed; the feed mirrors the event with an **Acknowledge** state for the record.

## A.4 Priority, grouping and noise control
- **Critical and Urgent** stay pinned until acknowledged or resolved. Critical items notify immediately in every enabled channel, ignore quiet hours and focus mode, and escalate if unacknowledged (for example 5 minutes to the next person).
- **Grouping:** several similar items become one ("4 verification cases are at risk") with a drill-down list. Mentions and approvals are never grouped away.
- **Deduplication:** the same event isn't sent twice across channels without a reason; one source of truth per event ID.
- **Subscriptions:** staff can watch specific cases, queues, runbooks or incidents; the page lists watched items with **Unwatch** controls. Participation in a case or incident auto-subscribes, and leaving removes it.
- **Throttling:** per-person caps on non-critical notifications per hour (configurable) with batching into digests, so alert fatigue doesn't hide critical items.

## A.5 Channels and content rules
- **In-app:** the full feed, with all actions.
- **Email:** for non-urgent items, digests and approvals; subjects contain IDs and categories only (for example "Approval needed: PB-2026-11-10").
- **Chat integration (optional, company-managed):** a restricted bot posts non-sensitive summaries to team channels (for example "Support queue at risk: 4 items"), never case content; links open the console and require sign-in.
- **Push to managed devices:** only Critical and Urgent, title only.
- **Paging:** incidents and critical alerts for on-call, separate and managed in Operations.
- **Content rules (enforced by the notification service):** no names, emails, phone numbers, message text, document names, amounts, scores or identity details; IDs, categories, counts and deadlines only. Messages that contain patterns for personal data are blocked and reported to the owner of the sending rule.
- **Links:** deep links go to the page, require sign-in and the right role, and carry no data in the URL besides IDs.

## A.6 Actions from notifications
- **Approve or reject** directly from the item only when the approval needs no further review (for example a low-risk request). Anything with a preview opens the record first. Hardware-key confirmation applies as usual.
- **Acknowledge** records who and when; Critical acknowledgments ask for a short note.
- **Snooze** returns the item at the chosen time and is logged.

## A.7 States

| State | Behavior |
|---|---|
| Empty | "You're all caught up." with a short line about what will appear here |
| Loading | Skeleton rows |
| Muted category | Greyed row note: "You muted info notices about releases. Change in Preferences." |
| Failed to load | Inline **Retry** |
| Old items (30+ days) | Under "Earlier" with **Load more**; items tied to resolved cases are archived |
| Live updates paused | Banner "Live updates paused. Reconnecting…"; the list is labeled stale |
| Out of office with delegation | A banner shows who receives your approvals and assignments and until when |
| Offline | Cached read-only feed with a banner |
| Staging | Strip shows STAGING; notifications use synthetic data and are never sent to real channels |

## A.8 Rules specific to staff notifications
- **Protected types** can't be muted: security alerts, access and elevation changes, breach clocks, data-rights deadlines, critical incidents, approval requests addressed to you, and wellbeing safety prompts.
- **No performance tracking:** read and acknowledgment times are used only for escalation and process improvement in aggregate, never to rank people.
- **Mentions are professional records:** they follow the same standards as notes and are retained per policy.
- **Off-hours:** outside working hours and outside an on-call shift, non-critical items wait for the next working period.

---

# Part B. Settings (personal and security): `/settings`

Uses the shared settings design (left section menu, content on the right). Staff content below. Company-controlled items are visible but read-only, with an explanation and a link to who can change them.

## B.1 Sections

| Section | Content |
|---|---|
| **Profile (read-only from the identity provider)** | Name, work email, team, manager, internal roles, start date, work location; **Report a mistake** links to HR |
| **My access** | Roles, permission sets, who granted them and when, expiry, elevated access, break-glass history, training status, conflicts declared, **Request access** and **Request elevated access** |
| **Security** | Hardware keys and authenticators, sign-in methods, sessions and devices, recent security activity, recovery information |
| **Notifications** | Category and channel preferences, digests, quiet hours, watched items |
| **Display and accessibility** | Theme, density, time zone, language, keyboard shortcuts, motion, font size, contrast |
| **Work preferences** | Default queue views, saved views, favorite macros, claim preferences |
| **Delegation and out of office** | Delegate approvals and assignments, schedule, backup contact |
| **Wellbeing** | Blur defaults, exposure limits, break reminders, quiet mode for sensitive categories, support resources |
| **On-call (engineering and security)** | Contact methods in the paging system, preferences for handover notes, shift swap requests |
| **My data and activity** | View and download my own audit entries, my notes, conflicts declared; privacy notice for staff |
| **Help and policies** | Links to acceptable use, security, data handling and code of conduct acknowledgments |

There is **no** "Danger zone": staff can't close or delete their own accounts. Offboarding is performed by HR and the security administrator (Staff page).

## B.2 Security section

### Sign-in and keys
- **Sign-in:** single sign-on through the company identity provider (no local passwords in the console). The page shows the identity provider, last sign-in, and the sign-in requirements that apply (managed device, hardware key).
- **Hardware keys and authenticators:** list of registered keys (label, type, added date, last used) with **Add a backup key** (requires the current key and a verification step), **Rename**, and **Remove** (not allowed if it would leave fewer than two methods for sensitive roles, and removal notifies the security administrator). **Lost key:** **Report a lost key** immediately revokes it, signs the person out everywhere and opens a supervised recovery with the security administrator, with a cool-down and reduced permissions during recovery (Staff page workflow).
- **Re-authentication:** adding or removing keys, changing notification channels for security alerts, and changing delegation require a fresh hardware-key confirmation.

### Sessions and devices
- **Active sessions:** device type, browser, country, last active, and whether the device is **managed and compliant** (attested through the identity provider). **Sign out** per session and **Sign out everywhere**.
- **Device policy:** sensitive roles must use managed devices; unmanaged devices see a limited or blocked console with an explanation.
- **Session rules shown:** idle lock after 15 minutes, absolute session length 8 hours, one active session per device class. These are company-controlled.
- **Recent security activity:** sign-ins, failed attempts, key changes, elevation, break-glass, with **This wasn't me** (starts a security review, signs out all sessions and notifies the security administrator).

### Recovery
No self-service password or key reset exists in the console. Recovery goes through the identity provider and the security administrator with identity verification, a cool-down and notifications to the manager, as the Staff page describes.

## B.3 My access section
- **Current access:** a plain-language list ("You can: review verification cases for startups and mentors; reveal masked fields with a reason; approve low-risk refunds"), mapped from permission sets, with who granted each and when.
- **Elevated access and break-glass:** current and past elevations with reason, case ID, approvers, start, end and review status; **Request elevated access** opens the form (reason, case or incident ID, duration, approvers).
- **Training and attestations:** required training with due dates and a link to complete it; overdue training suspends specific permissions (the page says which and why).
- **Conflicts declared:** list of declared conflicts with dates and the reassignment outcomes, and **Declare a conflict** (adds a person, organization or topic so matching records are routed away from you automatically).
- **Access reviews:** upcoming recertification by your manager, with a preview of what will be reviewed.
- **What I can't see:** a short note on masked data and purpose rules, linking to the help article "Why some fields are hidden."

## B.4 Notifications section
- **Preferences table:** categories as rows and channels (In-app, Email, Chat, Push) as columns, with toggles. Protected types are shown locked on.
- **Digest:** instant, hourly, daily (choose time) for non-critical items.
- **Quiet hours and focus:** daily schedule and **Focus mode** (silences non-critical items for a chosen time; Critical and Urgent still arrive).
- **Watched items:** list of cases, queues, incidents and runbooks with **Unwatch**.
- **Snoozes:** active snoozes with their return times.
- **Channel verification:** email and chat integration status (managed by the company); push enrollment on managed devices only.

## B.5 Display and accessibility
- **Theme:** system, light or dark. **Density:** comfortable or compact.
- **Time zone and format:** default Asia/Kolkata (IST), 12 or 24-hour clock, date format; the time zone is always shown on timestamps.
- **Language:** English first; others as available.
- **Keyboard shortcuts:** on or off, with a link to the full list.
- **Motion:** respect the system reduced-motion setting, or force reduced motion.
- **Font size and contrast:** scale up to 150 percent, high contrast mode, focus ring thickness.
- **Screen reader and keyboard options:** verbose announcements for live regions, skip links, and reading order preferences.
- Settings sync across devices; theme and accessibility changes apply immediately.

## B.6 Work preferences
- **Default views:** starting page, default queue filters, saved views you own (rename, share with team, delete).
- **Claiming:** auto-claim next item on or off (off by default), maximum items held at once (within the company limit), reminder after items are held 24 hours.
- **Macros and templates:** favorites and personal snippets (personal snippets can't contain personal data patterns and can't bypass the check-before-sending panel).
- **Notes:** defaults for note visibility tags and mention behavior.

## B.7 Delegation and out of office
- **Out-of-office:** dates and message; during this time, approvals and assignments follow your delegate.
- **Delegate:** choose a colleague with the same role or higher (the server checks they hold the needed permissions and aren't the requester on any pending approvals); delegation is **limited** (for example approvals up to a threshold, not elevated permissions) and **time-bound**. The person must accept.
- **What can and can't be delegated:** queue assignments and standard approvals can; hardware-key-confirmed approvals above thresholds, break-glass and legal holds can't be delegated and wait or go to the next authorized approver.
- **Visibility:** delegations are shown on the Staff page, in the audit log and on affected approval bars.

## B.8 Wellbeing section
Aimed at moderation, support and verification staff handling distressing or sensitive material, and available to everyone:
- **Blur defaults:** images and attachments blurred by default (on by default and can't be turned off for severity categories configured as sensitive), auto-re-blur after inactivity.
- **Exposure limits:** daily and weekly time on sensitive categories with warnings as you approach the limit (company maximums apply and can't be exceeded without a supervisor), and **rotation preferences** (for example, alternate with non-sensitive queues).
- **Break reminders:** schedule (default every 60 minutes on sensitive categories), short micro-breaks and longer breaks, with a one-click **Pause** that stops new assignments and returns held items to the queue without penalty.
- **Skip and hand off:** **Skip this item** and **Ask a colleague to take this** are always available; no reason is required for sensitive items, and skipping isn't tracked as performance.
- **Support resources:** confidential counseling contact, employee assistance information, a lead check-in schedule, and a private note to your lead ("I'd like to talk about my workload").
- **Privacy:** wellbeing settings are visible only to you and, for exposure limits that protect health, to your lead and HR in aggregate form; they are not used in performance reviews.

## B.9 On-call (engineering and security)
- **Contact methods:** managed in the paging system; this page shows status (reachable, test notification last sent) and **Send a test page**.
- **Schedule:** upcoming shifts, swaps and overrides with requests that need approval, handover notes templates.
- **Preferences:** escalation timing awareness, quiet period after a long incident (recovery time), and compensation or time-off reminders as per HR policy.

## B.10 My data and activity
- **My activity log:** my own audit entries (searches that touched personal fields, record opens with purposes, reveals, approvals, exports, configuration changes) with filters and a **Download** (my entries only; approvals logged). The page explains why the log exists and how long entries are kept.
- **Staff privacy notice:** what the company records about staff in the console and why, who can see it (security and compliance, with purpose), retention, and how to ask questions or complain (HR and the DPO).
- **Corrections:** **Report an incorrect entry** opens a ticket for security and compliance review (entries can't be edited; a note is attached).

## B.11 Behavior
- Changes save per section with a toast and **Undo** where safe; security changes need hardware-key confirmation.
- Company-controlled settings show a lock icon and the owner ("Controlled by Security. Ask the security administrator.").
- Unsaved changes prompt before leaving.
- Every change to security, notification protections, delegation and wellbeing writes an audit entry.

## B.12 States

| State | Behavior |
|---|---|
| Unmanaged device | Banner: "This device isn't enrolled. Some features are limited." with **How to enroll** |
| Only one security method registered | Warning: "Add a backup key" with a deadline (company-controlled) |
| Training overdue | Banner listing suspended permissions and **Start training** |
| Elevated access expiring | Gold-tint banner with the time left and **Request extension** |
| Delegation conflict | Message: "Your delegate has a conflict on this approval" with the fallback |
| Break-glass in use (your own) | Banner reminding you of the 2-hour limit and the review requirement |
| Idle lock | Re-authentication required (same as the whole console) |
| Offline | Cached settings; changes disabled until reconnected |
| Staging | Strip shows STAGING; separate settings and test keys |
| Save error | Inline message with **Retry** |

---

# Part C. Internal Help and Runbooks: `/help`

Uses the shared help design (search, topics, contact). Staff content below. Content is authored and reviewed in the Content area (type `Internal`, audience `Admin`) and delivered here read-only, so ownership, versions and review dates are consistent with the rest of the platform.

## C.1 Layout
Top: search bar ("Search guides, runbooks and policies"). Below: **Quick links** (current incident runbook if one is open, escalation matrix, on-call contacts), topic cards, **Recently updated** and **Recommended for your role**, and a contact and reporting panel. A role chip near the title shows the staff member's roles, with the ability to view other areas' public guidance. A prominent **Report a concern** button sits near the top.

## C.2 Topics

| Topic | Contents |
|---|---|
| **Getting started** | First week checklist, console tour, signing in with hardware keys, devices, masking and purposes, how approvals work, glossary |
| **Console how-to guides** | Task guides for every admin page: Dashboard, Verifications, Moderation, Reports, Appeals, Disputes, Fraud, Support, Data requests, Users, Organizations, Staff, Content, Templates, Rubrics, Opportunities, Events, Matching, Billing, Plans, Payouts, Analytics, Compliance, Audit, System, Integrations, Config |
| **Runbooks** | Incident response, provider outage playbooks, database and queue procedures, suspected breach, payment duplicates, audit service failure, certificate expiry, AI provider outage, status page publishing, failover and rollback steps (the same library as the System page) |
| **Policies** | Acceptable use, security, data handling, privacy for staff, retention, access control, vendor management, AI use, moderation and appeals, code of conduct |
| **Moderation and trust guidance** | Policy explainers with examples, decision trees by category, severity definitions, the action ladder, special handling (child safety, threats, self-harm, harassment, scams), evidence preservation, writing user messages, appeals independence |
| **Verification guidance** | Checklists explained, evidence types, alternative evidence paths, name variation handling, provider guides, second-review rules, applicant messaging |
| **Support guidance** | Tone and clarity guide, macro library, requester verification steps, approved actions, escalation rules, handling distress and abuse, data-rights triage |
| **Money procedures** | Maker-checker, payout batch checks, refund policy engine, credit notes, chargeback evidence, reconciliation, close checklist |
| **Compliance guidance** | Data-rights procedure, legal holds, breach clocks and notification steps, authority requests, retention, vendor review, DPIAs |
| **AI quality guidance** | Rubric reading guide, blinded review procedure, calibration, release gates, incident handling |
| **Escalation matrix** | Who to contact by situation and severity (roles and teams, reachable through the paging system or approved channels) |
| **Training and certification** | Required courses, assessments, due dates (links to Settings), optional learning paths |
| **Wellbeing** | Exposure guidance, break policy, how to hand off a case, counseling and support resources, peer support, what leads can offer |
| **Release notes** | Admin console changes by date and area, with "what changed for you" |
| **Reporting and feedback** | How to report problems, security concerns, misconduct, and how to suggest improvements |

Each page follows one template: short answer first, steps, screenshots with sensitive data masked, decision points, "when not to do this", related articles, owner, version, last reviewed date, and **Was this helpful?**.

## C.3 Runbook pages
- **Standard runbook structure:** purpose, when to use, prerequisites and permissions, step-by-step with decision points, expected results, rollback, verification, who to notify, links to dashboards and records, and **Last tested** date.
- **Interactive checklist:** steps can be ticked; when opened from an incident, ticks are written to the incident timeline automatically.
- **Safety banners:** destructive steps are highlighted with required confirmations and approval reminders.
- **Version and ownership:** owner team, reviewers, review cadence, and links to postmortems that changed the runbook.
- **Search and suggestions:** alerts and incidents suggest relevant runbooks (links from System).

## C.4 Moderation and verification guidance
- **Case examples library:** anonymized, synthetic or consented examples with the correct decision, the policy ID, reasoning, common mistakes and edge cases, kept short to avoid exposing staff to unnecessary harmful content (examples are described in text and blurred where media is needed).
- **Decision trees:** step-by-step guides for common categories (fee requests, impersonation, discrimination in job posts, harassment, misleading claims, fake traction, suspected fraud), with links to the policy and the action ladder.
- **Calibration material:** shared exercises used in calibration sessions (aggregate results appear in AI Quality and Moderation; this page hosts the materials).
- **Sensitive guidance restrictions:** guides describing detection methods or thresholds are visible only to the roles that need them, watermarked with the viewer's name and time, and not downloadable.

## C.5 Escalation matrix and directory
- **Matrix:** a table of situations (account takeover, suspected fraud ring, child safety, threat to safety, data breach, payments error, provider outage, legal request, press inquiry, staff misconduct, regulator contact) with the right team, severity, how to reach them and expected response.
- **Directory:** roles and teams with on-call status, escalation paths and working hours, using the paging system for urgent contact; personal phone numbers aren't published.
- **Who is on call now:** live view from the System page.

## C.6 Contact, reporting and feedback
- **Ask for help:** a form to ask a subject-matter owner (verification lead, finance manager, security administrator, and so on) with category, related record ID (optional) and urgency; creates an internal ticket.
- **Report a problem with the console:** bugs and usability issues, with page, steps and a masked screenshot helper.
- **Report a security concern:** suspected account compromise, suspicious requests (for example someone asking a staff member to change an email or bypass a check), phishing, lost devices. Urgent path shows immediate steps first (sign out everywhere, contact security, don't click links) and the security on-call.
- **Report misconduct or policy violations (confidential):** a channel to the compliance officer or an independent ethics and whistleblowing line, with anonymous options where the law allows, non-retaliation commitments, and a description of what happens next.
- **Suggest an improvement:** ideas for guides, macros, policies and tools; routed to owners; visible status ("Under review", "Planned", "Done").

## C.7 Learning and certification
- **My training:** required and optional courses with due dates, progress and certificates; links to complete in the learning system.
- **Role onboarding path:** a checklist for new staff by role, aligned with the Staff page onboarding steps (shadowing period, supervised actions, final sign-off).
- **Knowledge checks:** short quizzes on privacy, masking and purposes, maker-checker, severity and escalation; results feed the training status that gates sensitive permissions (aggregate for managers; individual results visible to the person and their manager).

## C.8 Release notes and announcements
Internal announcements (policy changes, new tools, maintenance, process updates) with severity, effective date and acknowledgment when required ("I have read and understood the updated policy"). Acknowledgments are logged and feed the compliance attestation records.

## C.9 Content governance (for staff authors)
- Guidance is authored with the Content workflow (draft, review, approve, publish), with extra reviewers for security, compliance and safety content.
- Every page has an owner and a review date; overdue pages appear in the owner's notifications and on a **Needs review** report.
- Screenshots and examples go through personal-data scans.
- Retired pages show a notice and link to the replacement.

## C.10 States

| State | Behavior |
|---|---|
| No search results | "No pages found." with suggested topics and **Ask for help** |
| Page past review date | Notice at the top: "This page was last reviewed {date} and may be out of date." with **Report an issue** |
| Restricted page | "You don't have access to this guidance." with **Request access** (role owner approves) |
| Active incident | A pinned banner with the incident runbook and role-specific steps |
| Offline | Cached recent pages for incident use where allowed; a banner explains the limits |
| Loading error | Inline **Retry** |
| Staging | Strip shows STAGING; guidance shown matches production |

---

# Part D. Data contracts (summary)

### Notification payload (service to console)
```json
{
  "id": "ntf_01JD9K",
  "severity": "action_needed",
  "category": "approvals",
  "title": "Approval needed: PB-2026-11-10",
  "detail": "Payout batch awaiting second approval",
  "target": { "type": "payout_batch", "id": "PB-2026-11-10", "link": "/payouts/batches/PB-2026-11-10" },
  "createdAt": "2026-11-08T09:20:00+05:30",
  "state": "new",
  "requiresAck": false,
  "dedupeKey": "approval:PB-2026-11-10:fin_mgr"
}
```
No names, emails, amounts, message text or document names in `title` or `detail`; the notification service validates this before sending and rejects violations.

### Settings object (personal)
```json
{
  "userId": "stf_17",
  "display": { "theme": "system", "density": "compact", "timezone": "Asia/Kolkata", "reducedMotion": "system" },
  "notifications": { "digest": "daily@09:30", "quiet": "20:00-08:00", "focusUntil": null, "channels": { "approvals": ["in_app", "email"] } },
  "work": { "autoClaim": false, "maxHeld": 5 },
  "wellbeing": { "blurDefault": true, "breakEveryMinutes": 60 },
  "delegation": { "to": "stf_22", "from": "2026-11-12", "to": "2026-11-16", "scope": "standard_approvals" }
}
```
Company-controlled values are returned with `locked: true` and an owner. The server rejects attempts to change locked values, to disable protected notification types, or to weaken security baselines.

### Endpoints
`GET /api/notifications`, `POST /api/notifications/{id}/ack`, `/snooze`; `GET /api/settings/me`, `PATCH /api/settings/me` (validated and audited); `POST /api/security/keys` (re-auth required), `DELETE /api/security/keys/{id}`, `POST /api/security/sessions/{id}/revoke`, `POST /api/security/report-lost-key`; `GET /api/access/me`; `POST /api/delegations`; `GET /api/help/pages?q=`; `GET /api/help/runbooks/{id}`. Help content is served by the content delivery API filtered by the caller's roles.

---

# Part E. Accessibility, performance and operations

- **Accessibility:** WCAG 2.1 AA in light and dark themes; keyboard-only use of every control, including notification actions and settings; visible focus ring; status by text and icon as well as color; live regions announce new Critical notifications and lock changes politely without stealing focus; settings offer font scaling, high contrast and reduced motion.
- **Performance:** notification feed loads under 1.5 seconds (p75); live updates arrive within 3 seconds; settings and help pages load under 2 seconds; help search returns results under 500 ms; runbooks cache for incident use.
- **Reliability:** the notification service queues and retries; Critical notifications use redundant channels (feed, push and paging); if the feed is down, the paging system and email still deliver Critical items; help pages for incident runbooks are available even if other parts of the console are degraded.
- **Observability:** delivery rates, latency, bounce and failure rates, suppressed duplicates, and blocked messages (personal data patterns) are monitored without personal data.
- **Telemetry (internal, aggregate):** notification volume per category, acknowledgment time by severity, help search misses, page helpfulness. Not used to rank people.

---

# Part F. Security, privacy and audit (for these pages)

- **Admin app controls (subdomain):** single sign-on, mandatory two-factor (hardware key), 15-minute idle lock, 8-hour absolute session, host-scoped `Secure`, `HttpOnly`, `SameSite=Strict` cookies, strict CSP, no indexing, optional VPN or IP allowlist, managed-device requirement for sensitive roles, server-side permission checks on every request, separate deployment and secrets from the public app.
- **Notification minimization:** content rules enforced by the notification service (IDs, categories, counts, deadlines only); chat and email integrations are allowlisted and company-managed; push goes only to managed devices; links require sign-in.
- **Security settings integrity:** hardware key changes need re-authentication with an existing key, notify the security administrator, and respect the minimum-two-methods rule; sessions and devices can be revoked by the person or by security; there is no self-service recovery that bypasses security.
- **Delegation safeguards:** limited, time-bound, logged, and prohibited for the highest-risk approvals; delegates can't approve requests they made.
- **Staff privacy:** the page tells staff what is recorded about them and why, limits access to that data to security and compliance with a purpose, and provides a way to view their own entries and raise concerns.
- **Audit:** every acknowledgment of Critical items, snooze of non-protected items, settings change, key change, session revocation, delegation, access request, help article restricted-view access and internal report submission writes an append-only entry with staff ID, time, target and reason.
- **Whistleblowing and reporting:** a confidential channel with non-retaliation protections and independent handling; reports are access-restricted and logged without exposing the reporter.
- **Regulatory and HR:** confirm with counsel and HR staff monitoring limits, wellbeing duties, retention of staff activity data, whistleblower protections and what attestations may be required.

---

# Part G. Acceptance criteria and QA checklist

**Notifications**
- [ ] Staff receive only notifications for items they can act on; items outside their role are never created for them.
- [ ] No notification title, detail, email subject, chat message or push contains names, emails, phone numbers, message text, document names, amounts, scores or identity details; the service blocks and reports violations.
- [ ] Critical items ignore quiet hours and focus, escalate when unacknowledged, and are delivered through redundant channels; on-call paging stays in the paging system with a mirrored acknowledgment record.
- [ ] Protected types (security, access and elevation, breach clocks, data-rights deadlines, critical incidents, approval requests to you, wellbeing safety prompts) can't be muted.
- [ ] Grouping, deduplication and throttling work; mentions and approvals are never grouped away.
- [ ] Approve and reject from a notification work only for low-risk requests and still require hardware-key confirmation where applicable.
- [ ] Delegation and out-of-office reroute approvals and assignments correctly and appear on the affected records.

**Settings**
- [ ] Company-controlled settings are visible but locked and name their owner; the server rejects changes to locked values and to security baselines.
- [ ] Hardware key changes require re-authentication with an existing key, enforce the minimum-two-methods rule and notify security; lost-key reporting revokes the key and signs the person out everywhere.
- [ ] Sessions and devices list accurately, **Sign out everywhere** works, and unmanaged devices see limited access with an explanation.
- [ ] My access shows roles, grants, elevation, training and conflicts accurately; overdue training suspends the specified permissions with a clear explanation.
- [ ] Delegation is limited, time-bound and logged; it can't be used for non-delegable approvals.
- [ ] Wellbeing settings (blur, limits, breaks, skip and hand-off) work without any performance penalty and aren't used in reviews.
- [ ] My activity log shows only the person's own entries; corrections create notes, never edits.
- [ ] No password reset or deletion of staff accounts exists in the console.

**Help and runbooks**
- [ ] Every page shows owner, version and review date; overdue pages are flagged to owners; restricted pages follow role access and are watermarked where required.
- [ ] Runbook checklists write step completion into the open incident's timeline.
- [ ] Search respects role visibility and returns relevant results quickly; sensitive detection guidance never appears in search for other roles.
- [ ] Escalation matrix and directory are current, use the paging system for urgent contact, and show who is on call now.
- [ ] The confidential reporting channel works, is access-restricted and doesn't expose reporters; the security-concern urgent path is available offline-tolerantly.
- [ ] Training, attestations and acknowledgments are logged and feed Staff and Compliance records.

**Security, accessibility and performance**
- [ ] SSO and two-factor are mandatory; idle lock and session limits work; permissions are enforced on the server on every request.
- [ ] Keyboard-only use covers every control; AA contrast in both themes; live regions announce Critical items without stealing focus.
- [ ] Performance and delivery targets in Part E are met; Critical notifications still arrive if the feed is down.

---

# Part H. Build order (suggested)

1. **Admin foundation:** subdomain, SSO, two-factor with hardware keys, internal roles with server-side checks, audit integration, managed-device checks.
2. **Notification service:** event model, content validation (IDs and categories only), severity and routing, deduplication and throttling, in-app feed, email, and paging integration for Critical events. Other admin pages emit notifications through it.
3. **Notifications page:** feed, filters, actions, acknowledgment and snooze, preferences with protected types.
4. **Settings:** profile read-only from the identity provider, security (hardware keys, sessions, recent activity, lost-key report), display and accessibility, notification preferences, My access.
5. **Delegation and out-of-office**, work preferences, wellbeing settings, on-call preferences, My data and activity.
6. **Internal Help and Runbooks:** delivery of Admin-audience content, search, runbook pages with incident-linked checklists, escalation matrix and directory, release notes.
7. Moderation and verification guidance libraries, training and attestation integration, confidential reporting channel and security-concern path, suggestions workflow.
8. Chat integration (restricted bot), push to managed devices, digests and focus mode refinements.
9. Accessibility, performance and security review against the checklist, then a staged rollout (one team first, with security and HR reviewing the staff privacy and wellbeing content).

**Suggested first release:** the notification service with the in-app feed and email for approvals, queue SLAs and security alerts, Settings (security, display, My access, notification preferences, delegation), and Internal Help with the console guides, runbooks, escalation matrix and the confidential reporting channel. Add chat integration, wellbeing tooling refinements and the case-example libraries as teams grow. The Dashboard, Verifications and Support pages need notifications and runbooks from the first day, so build the notification service early.

**Reminder for the build:** the subdomain is an isolation layer, not an access control. Keep mandatory two-factor with hardware keys, server-side permission checks, minimal notification content, protected notification types, locked company-controlled settings, hardware-key re-authentication for security changes, delegation limits, wellbeing protections without penalty, and the append-only audit log from day one. Get legal and HR advice on staff monitoring limits, wellbeing duties, whistleblower protections, retention of staff activity data and required attestations before launch.
