# Admin Users and Organizations Design (production spec)

**App:** Platform admin console on its own subdomain (for example `admin.yourdomain.com`). Routes below are relative to that subdomain.
**Users:** support agents and supervisors, trust and safety, verification reviewers, finance, compliance officers, security administrators, and super admins.

These four pages are the directory of everyone and everything on the platform: **people** (accounts across all five public roles), **organizations** (startups, investor funds and groups, employer companies, partner institutions), and the **internal staff** who run the console. They are where the other admin pages meet: Support, Verification, Moderation, Disputes and Data Rights all link here. The public-product designs point here as well (multi-role accounts, team roles inside organizations, "Admin view" banners, ownership transfer, account closing and pause). Your proposal lists identity and access, multi-role accounts, team roles and permissions, verification, an admin console with approvals and audit logs, and partnerships (banks, incubators, colleges).

| # | Page | Route | Purpose |
|---|---|---|---|
| 1 | Users and Accounts | `/users` | Find and filter accounts across all roles; see status at a glance; no personal data in lists |
| 2 | User Detail | `/users/:userId` | One person's roles, status, security posture, linked cases and safe actions |
| 3 | Organizations | `/organizations` | Startups, investor organizations, employer companies and partner institutions; detail and ownership handling |
| 4 | Staff and Admin Roles | `/staff` | Internal team, role definitions, access requests and reviews, elevated access, offboarding |

> **Subdomain note.** The admin console is a separate app, so there is no per-route role-based file. Section 3 gives a short **who sees what** table (internal roles) because it decides what each page shows. Section 12 lists the controls the subdomain still needs (single sign-on, mandatory two-factor, server-side permission checks, masking, audit), because a separate address doesn't protect anything on its own.

> **Legal and privacy reminder.** These pages sit on top of all personal data. Opening a person's record is itself a privacy event. Get legal advice before launch on staff access to personal data, purpose limitation, retention of directory data, handling of account takeover and ownership disputes, background checks for staff, and processor and sub-processor obligations. Staff must never use this directory to browse people out of curiosity: purpose is recorded and access is audited.

---

## 1. Design principles

- **Find fast, expose little:** search is powerful but results show IDs, roles, statuses and masked names only. Personal data appears only on detail pages, only when needed, and only after a recorded purpose.
- **Purpose-bound access:** opening a user or organization needs a reason (auto-filled when you arrive from a case or ticket). Every open, reveal and action is logged.
- **No impersonation, ever:** staff can't sign in as a user. They get read-only **Admin view** renders and a short list of approved, logged actions.
- **Roles are earned, not assigned:** staff can't grant a user the mentor, investor or employer role. Those come only from verification. Staff can pause or restrict, through moderation and verification workflows that carry reasons and appeals.
- **Account changes follow the case:** suspensions, bans, limits, closures and ownership transfers are executed from their own workflows (moderation, data rights, verification, support) and merely *shown* here, so there is one place for reasons, approvals and appeals.
- **Protect against takeover through support:** changing an email, phone, two-factor or ownership is the most abused path in any platform. These need verification, cool-down periods, notifications to existing contact points and a second approver.
- **Least privilege for staff, provably:** every internal permission is explicit, reviewed regularly, and time-limited when elevated.
- **Everything is traceable:** every view, reveal, search of sensitive fields, action, approval and export writes to the append-only audit log.

---

## 2. Design tokens and shared look

Same tokens as the Admin Dashboard (ink, ivory, one gold accent, light and dark themes; `Fraunces` and `Inter`; IST timestamps with a visible time zone; 8px grid; 12px cards; 10px controls).

### Shared chips

| Group | Chips |
|---|---|
| **Account status** | `Active` (success tint), `Pending verification` (warning tint), `Paused by user` (stone outline), `Limited` (warning outline), `Suspended` (error tint), `Banned` (error fill), `Closing` (info tint, deletion in progress), `Closed` (stone) |
| **Role** | `Startup`, `Mentor`, `Investor`, `Job seeker`, `Employer` (a person can hold several) |
| **Verification** | `Verified`, `Basic` (investors), `Full` (investors), `Founder verified`, `Under review`, `Expiring`, `Lapsed`, `Not required` |
| **Security posture** | `2FA on`, `2FA off`, `Recovery in progress`, `Suspicious activity` |
| **Organization type** | `Startup`, `Fund or angel group`, `Employer company`, `Partner institution` |
| **Org status** | Same as account status plus `Orphaned` (no active owner) and `Merged` |
| **Staff status** | `Active`, `On leave`, `Suspended`, `Offboarded`, `Pending onboarding` |
| **Access type** | `Standing`, `Elevated (expires {date})`, `Break-glass` |

### Shared components
- **Search box with scopes:** type an ID (`usr_…`, `org_…`, `TCK-…`, `VER-…`), an exact email or phone (matched by hash, results show only masked values), or a name (results show masked names plus ID). Scope chips: Users, Organizations, Staff.
- **Purpose dialog:** when opening a detail page without a case context, the reviewer chooses a purpose (Support request, Verification, Moderation case, Fraud case, Dispute, Data rights request, Compliance review, Security incident, Other with a note) and optionally a case ID. The purpose is stored on the audit entry and shown in the page header.
- **Context header (detail pages):** ID, name (masked), status chips, role chips, purpose chip, **Admin view** menu, **Add note**, **Link to case**.
- **Masked field and reveal:** `••••• 4417`, `p•••@gmail.com`; **Reveal** asks for a reason, shows for 60 seconds, logs it.
- **Linked cases panel:** IDs and statuses of tickets, reports, verification cases, disputes, data requests, fraud entities and appeals tied to the person or organization.
- **Action drawer:** only appears for actions allowed to the viewer's role; shows effects ("Signs the user out of all sessions and requires a password reset"), approvals needed, and the reason prompt.
- **Timeline:** account events (created, role added, verification changes, status changes, security events, plan changes, cases opened) with actor and time; content is never shown.

### Keyboard shortcuts
`/` focus search · `j` / `k` move in lists · `Enter` open · `g` then `u` or `o` or `s` go to Users, Organizations, Staff · `n` add note · `?` shortcuts. Disabled while typing.

---

## 3. Internal roles and what they see (content scoping)

| Internal role | Users and organizations access |
|---|---|
| Support agent | Search and open user and organization records **with purpose**; masked context; linked records in read-only Admin view; approved low-risk actions (force sign-out, send password reset email, resend verification); requests for sensitive changes go to approval |
| Senior support or supervisor | Same plus approval of medium-risk changes (email or phone change, two-factor recovery) as the second approver; can't approve their own requests |
| Trust and safety, fraud analysts | Security and activity tabs, entity links, restriction status; limits and suspensions only via moderation workflows |
| Verification staff | Verification tab and organization verification details; no billing or security detail |
| Finance | Billing summary and plan data, with amounts; no security or content details |
| Compliance officer | Read-only on all tabs; legal holds; data rights and consent views; exports of audit data |
| Security administrator | Security tab details (sessions, devices, recovery), staff access reviews, break-glass review; no finance |
| Super admin | Everything on these pages, including staff and role definitions with dual control |
| Analyst | Aggregate counts only; no individual records |
| Others | No access |

The server enforces this on every request. Staff with a conflict (relative, former employer, financial interest) declare it with a button; the record is blocked for them and reassigned.

---

# Part A. Users and Accounts: `/users`

## A.1 Purpose
Find any account quickly, see whether it is healthy, and jump to the right workflow, without turning the list into a way to browse personal data.

## A.2 Layout
```
┌──────────────────────────────────────────────────────────────┐
│ Title "Users"                             [Saved views ▾]    │
├──────────────────────────────────────────────────────────────┤
│ Search: [ID, exact email/phone, or name…]   scope: Users     │
├──────────────────────────────────────────────────────────────┤
│ Summary strip (4 cards)                                      │
├──────────────────────────────────────────────────────────────┤
│ Filters row · sort · density · [Export IDs]                  │
├──────────────────────────────────────────────────────────────┤
│ User table                                   │ Quick view    │
│                                              │ drawer        │
└──────────────────────────────────────────────────────────────┘
```

### Summary strip (aggregate)
| Card | Example |
|---|---|
| Accounts | 48,210 |
| New (7 days) | 1,904 |
| Needing attention | 63 (suspended, limited, recovery in progress, expiring verification) |
| Multi-role accounts | 4,112 |

## A.3 Table

| Column | Content |
|---|---|
| User | ID (mono) and masked display name (for example `P••• K••••`) |
| Roles | Role chips |
| Status | Account status chip |
| Verification | Chips per role that needs one (for example Mentor `Verified`, Investor `Basic`) |
| Organizations | Count and the main organization ID |
| Plan | Plan names by role (or `Free`) |
| Security | `2FA on` or `2FA off`; `Suspicious activity` flag |
| Region | Country or state (not city) |
| Created | Date |
| Last active | Relative time (day precision) |
| Open cases | Count with icon |
| Actions | **Open** |

- **Default sort:** newest first. Alternative sorts: Last active, Open cases, Created.
- **Quick view drawer:** ID, roles, status, verification, organizations (IDs and names masked), open cases (IDs and types), and **Open record** (with purpose prompt). No emails, phones or addresses.
- **Search behavior:**
  - ID: exact match.
  - Email or phone: exact match only, matched against a hash; no wildcard or partial email search, no "contains" over personal fields, to prevent harvesting.
  - Name: prefix search with a limit of 20 results, masked; requires at least 3 characters; broad name searches are rate-limited per staff member and logged.
  - Every search that touches personal fields is logged with a hashed query.

## A.4 Filters and saved views
Role (any of, all of), status, verification state, organization type or ID, plan, security posture, country or state, created date range, last active range, has open case type, has legal hold, multi-role only, 2FA off, expiring verification, linked to fraud case. **Saved views** ("Suspended this week", "Investors, Full, expiring in 30 days") can be shared with the team. Filters never use personal characteristics.

## A.5 Bulk actions (deliberately limited)
Allowed: **Export IDs and statuses** (supervisors and compliance; no personal fields; re-authentication), **Add to a saved view**, **Link to case**. **Not allowed:** bulk suspend, bulk email, bulk role changes, bulk reveal. Mass notifications go through the Content and Configuration pages with their own approvals.

## A.6 Data contract
`GET /api/users?q=&role=&status=&verification=&org=&plan=&security=&country=&createdFrom=&cursor=`
```json
{
  "items": [
    {
      "id": "usr_8f21c",
      "displayName": "P••• K••••",
      "roles": ["jobseeker", "founder"],
      "status": "active",
      "verification": [{ "role": "founder", "state": "founder_verified" }],
      "orgCount": 1,
      "mainOrgId": "org_77",
      "plans": [{ "role": "jobseeker", "plan": "free" }],
      "security": { "twoFactor": true, "flag": null },
      "region": "KA",
      "createdAt": "2026-08-14",
      "lastActiveDate": "2026-11-06",
      "openCases": 1
    }
  ],
  "nextCursor": "..."
}
```
No emails, phone numbers, addresses, document names or message content in list responses.

## A.7 States
- **Empty search:** "No accounts match." with tips (use an ID or an exact email).
- **Too many results:** "Showing the first 100. Add filters." (no deep paging into the full user base).
- **Search rate limit reached:** message with the reset time and a note "Searches are limited and logged."
- **Provider or search index lag:** banner "Search results may be a few minutes behind."
- **Loading error:** inline **Retry**. Stale labels as on the Dashboard.

---

# Part B. User Detail: `/users/:userId`

## B.1 Purpose
A person's account at a glance: who they are on the platform (roles), what state they are in, how secure the account is, and what is open about them, so staff can help without seeing more than they need.

## B.2 Opening a record
- Arriving from a **case or ticket** auto-fills the purpose and case ID.
- Arriving from the Users list or global search shows the **purpose dialog**. A purpose is required, and an optional case ID can be added.
- The purpose and the viewer appear in the page header ("Opened by {name} for Support request · TCK-48213") and in the audit log. Repeated openings of the same record without a case link by the same person within 24 hours show a gentle supervisor-review flag, not a block.

## B.3 Layout
Three columns on desktop:
- **Left (320px):** identity summary (masked), status and role chips, quick actions, linked cases.
- **Center (flexible):** tabs **Overview** · **Roles and memberships** · **Security** · **Activity** · **Cases** · **Billing summary** · **Consents and privacy** · **Notes**.
- **Right (360px):** approvals pending on this record, risk notes, and the timeline.
On tablet the side columns become drawers. Staff don't use this page on phones.

## B.4 Tabs

### Overview
- **Identity (masked):** display name, masked email and phone (with `Verified` indicators for contact points), country, time zone, language, account created, last sign-in (date and country only).
- **Account status:** current status chip and its source (user action, moderation case ID, fraud case ID, verification lapse, data rights closure), start date and, for limits and suspensions, the end date and policy ID.
- **Roles at a glance:** one card per role with its state (see Roles and memberships).
- **Flags:** `Legal hold`, `Under investigation`, `Recovery in progress`, `Priority support`, `High-risk` (internal; reason hidden from non-authorized roles).

### Roles and memberships
Cards per role the account holds:
- **Job seeker:** profile completeness bucket (Low, Medium, High), discoverability setting, open applications count, resumes count, practice sessions count (counts only), readiness score sharing on or off (not the score).
- **Mentor:** verification state and date, status (accepting, paused), active mentorships count, restrictions (for example conflict restrictions).
- **Investor:** level (Basic or Full), verification validity, organization membership and role, active data rooms count, open offers count (counts only).
- **Employer:** organization and team role, verification state, jobs open count.
- **Startup (founder or team member):** organization(s), team role (Owner, Admin, Member, Viewer), stage, verification state.
Each card links to the relevant admin record (verification case, organization, report). **No role can be granted or removed from here.** Roles come from verification and organization flows; the page explains this.

### Security
- **Posture:** two-factor on or off and method type (authenticator or key; not the secret), recovery methods count, last password change date, active sessions count (with device types and countries, no IP addresses), recent security events (new device, password reset, 2FA change, failed sign-in bursts) with date, and any `Suspicious activity` reason code.
- **Recovery in progress:** shows the recovery case (see B.6) with stage and cool-down end.
- **Approved actions** (role-limited, logged):
  - **Sign out everywhere** (revokes all sessions)
  - **Require password reset at next sign-in** (and send the reset email to the verified address)
  - **Revoke API keys or tokens** created by the user
  - **Lock sign-in temporarily** (fraud or security on-call; auto-expires after 24 hours unless confirmed by moderation or fraud workflow)
- **Needs approval:** **change email or phone**, **reset two-factor**, **unlock after a security lock**, **merge accounts** (see B.6).
- **Staff can't:** view or set a password, view two-factor secrets or backup codes, send the user a password directly, sign in as the user.

### Activity
A readable list of **account-level events only**: sign-ins by day and country (not minute detail unless a security case is open), role events (role added after verification, verification expiring), status changes, plan changes, data exports requested, consent changes, support tickets opened, reports filed by or against the user (as IDs and categories), moderation actions (action and policy ID, not content). **No messages, resumes, answers, recordings, documents, offer amounts or private notes are ever shown here.** For employers and investors, high-level counts (jobs posted, data rooms opened) can appear as aggregates.

### Cases
IDs, types, status and age of linked items: tickets, reports (as reporter or reported, with reporter identity protections), moderation cases, verification cases, appeals, disputes, data rights requests, fraud entities. Each opens in its own admin page with its own access rules.

### Billing summary (finance and compliance only)
Plan per role, status (active, trial, past due, cancelled), billing country, tax registration present (yes or no), last payment status (success or failed), open disputes, payout status for mentors (setup complete or not), and flags such as `Chargeback history`. **No card numbers, bank details, invoice amounts per line or tax IDs** here; finance reaches those on the Billing pages.

### Consents and privacy
Consent records with date and scope (for example practice score sharing, talent pool, discoverability, background-check consents), open data rights requests with due dates, legal holds, retention flags and the account's **data region** if relevant. Compliance can place or lift a legal hold from here (with reason and dual control for lifting).

### Notes
Private staff notes with `@mentions`, tags (for example `repeat-caller`, `security-sensitive`) and visibility by team. Notes must be factual and work-related; the page shows a reminder and an automatic scan for sensitive patterns and personal opinions about characteristics. Notes are discoverable in data rights access requests where the law requires, and the page says so.

## B.5 Left column actions
- **Admin view:** opens read-only renders of the user's product pages (profile, applications, offers, billing) that the viewer's role may see, with the "Admin view" banner, personal data masked and sensitive content hidden (for example practice answers). Each open is logged with the purpose.
- **Open in moderation or verification:** deep links to the workflows where status changes happen.
- **Start a data request on their behalf** (only from a verified ticket): creates a request in Data Rights.
- **Add note**, **Link to case**, **Declare conflict**.
- **Not available:** impersonate, edit profile, change role, delete account (deletion happens through Data Rights), merge without approval.

## B.6 Sensitive account changes (workflows)

### Change email or phone
1. Support receives a ticket from a verified session (or starts a recovery case).
2. The requester proves control of the **new** contact point (code) and of **existing** access (signed-in session or second factor). If neither is possible, use the **recovery path**.
3. A second approver (senior support or security) reviews the evidence.
4. **Cool-down** (default 72 hours) before the change takes effect for sensitive roles (investor, employer, mentor, startup Owner), with notices sent to the **old and new** contact points and an option to cancel the change.
5. After the change, sessions are revoked and the user must sign in again.
Staff see only masked values throughout.

### Account recovery (lost access and two-factor)
- **Recovery case** with stages: Requested → Evidence collected → Reviewed → Cool-down → Restored (or Denied).
- Evidence rules (set with counsel and security): proof of control of the registered email, recent payment details (last four digits and date), a recent known device or location, and, for verified investors or employers, re-verification through the provider. Nothing relies on information that is easy to guess.
- **High-value accounts** (investor Full, employer with open offers, mentor with held payouts, startup Owner with a live round) always need a second reviewer, a longer cool-down (default 7 days) and notifications to all known contact points.
- **Fraud signals** (new country, many failed attempts, matches to known scam patterns) route the case to the Fraud team and extend the cool-down.
- The requester gets plain updates at each stage, and denial includes how to appeal.

### Merge duplicate accounts
Rare. Requires both accounts' owners to consent (or documentary proof), a senior approver, dual control, and a plan for each record type (profiles, applications, sessions, billing). Not allowed for accounts with open fraud, moderation or dispute cases. The merge is logged and reversible only within a short window.

### Close or delete
Always through **Data Rights Requests** (Part C of the Support and Data Rights spec). The page shows `Closing` status and links there.

## B.7 Right column
- **Pending approvals:** actions awaiting approval on this record (who requested, what, since when, approver) with **Approve** or **Reject** (only for permitted, different people).
- **Risk notes:** internal, short, factual (for example "Linked to fraud case FRD-512"), visible only to trust and safety, fraud, compliance and supervisors.
- **Timeline:** account events with actors and times.

## B.8 Data contract
`GET /api/users/{id}?purpose=&caseId=` returns the tab data allowed to the caller, with masked fields and counts only; the server rejects requests without a purpose unless a valid case context is supplied. `POST /api/users/{id}/reveal` returns a masked value for 60 seconds and writes the audit entry. `POST /api/users/{id}/actions/{action}` runs only approved actions, with `approvalId` where required; the server checks the role, case and cool-down rules. Every response contains a `generatedAt` and a list of omitted fields (names only) so the UI can show "Hidden for your role."

## B.9 States
- **Record under legal hold:** banner; destructive actions disabled.
- **Closing or closed account:** read-only; shows deletion progress; limited fields.
- **Conflict declared:** record blocked; shows who it was reassigned to.
- **Purpose missing:** dialog blocks content until a purpose is chosen.
- **Approval conflict:** the same person can't be requester and approver; message explains.
- **Recovery cool-down active:** actions that would affect the change are disabled until it ends; banner shows the end time.
- **Provider or service error:** the affected tab shows "Data unavailable" with a retry; other tabs work.
- **Loading error:** inline **Retry**.

---

# Part C. Organizations: `/organizations`

## C.1 Purpose
One directory for every organization on the platform: **startups**, **investor organizations** (funds and angel groups), **employer companies**, and **partner institutions** (incubators, accelerators, colleges, banks). It supports verification, trust, billing, support and partnerships.

## C.2 Layout
Tabs: **All** · **Startups** · **Investor organizations** · **Employer companies** · **Partners** · **Needs attention**. Search (ID, exact registration number, exact domain, name prefix), filters, summary strip, table and a quick-view drawer (same pattern as Users).

### Summary strip
| Card | Example |
|---|---|
| Organizations | 6,420 |
| Verified | 4,981 |
| Needs attention | 74 (suspended, limited, orphaned, lapsed verification) |
| Orphaned (no active owner) | 9 |

## C.3 Table

| Column | Content |
|---|---|
| Organization | ID (mono), display name, type chip |
| Status | Org status chip |
| Verification | State and validity date |
| Owners | Count of active Owners (red text when zero) |
| Members | Count |
| Plan | Plan per product area (startup plan, employer plan, investor plan) |
| Region | Country and state |
| Domain | Primary email domain (shown; it's a business identifier) |
| Created | Date |
| Open cases | Count |
| Partner | Badge for partner programs |
| Actions | **Open** |

- Quick view drawer shows type, status, verification, counts, open cases, and **Open record** (purpose prompt as for users). Registration numbers and addresses are masked in lists.
- **Search:** exact ID, exact registration number or tax ID (hashed match), exact domain, name prefix (3+ characters). No browsing of the full directory.

## C.4 Organization detail: `/organizations/:orgId`
Three columns as on User Detail. Tabs: **Overview** · **Members and roles** · **Verification** · **Plan and billing summary** · **Activity** · **Cases** · **Partner and programs** · **Notes**.

### Overview
Legal name and brand (business data, visible), type, registration identifiers (masked with reveal), domain, website, country, industry, size bucket, created, stage (startups), fund type (investor organizations), status chips, key flags (`Orphaned`, `Legal hold`, `Under investigation`, `Verified recruiter` for agencies).

### Members and roles
Table of members: user ID, masked name, team role (Owner, Admin, Recruiter, Hiring manager, Interviewer, Viewer, Member, Analyst, Billing contact, as applicable), status, MFA on or off, joined date, last active. **No role changes here**; the page explains that members manage roles inside the product, and staff can intervene only through the recovery and ownership workflows below. A banner shows if the organization has **no active owner** or only one owner without two-factor.

### Verification
State, level, validity, last review, triggers pending (legal name change, domain change, new beneficial owner), linked verification cases, restrictions in force, and **Open verification**. Staff can't edit legal data here; changes go through verification.

### Plan and billing summary
Plan per area, status, seats used and limit, billing contacts count, payment health (success or failed), open disputes, credits expiring (count), enterprise contract flag, and **Open billing** (finance only). Custom or enterprise terms are set in Billing, not here.

### Activity
Organization-level events: created, verification changes, owner changes, member counts over time, plan changes, status changes, exports requested, integrations connected (names only), security alerts (for example unusual sign-ins), and cases. For employers, aggregate counts of jobs and hires; for investors, aggregate counts of data rooms and rounds (no names, amounts or documents); for startups, stage and round status only (no financials).

### Cases
Same pattern as users: tickets, reports (reported or reporter), moderation, verification, appeals, disputes, data requests, fraud entities, linked users and linked organizations (by shared signals, IDs only).

### Partner and programs
For partner institutions and programs: partnership type (incubator, accelerator, college placement cell, bank, corporate), agreement dates, contact owner (staff), programs (cohorts or sponsored access), white-label settings, sponsored credits or plans, reporting access (aggregate usage reports they may receive), and compliance notes. Partners see only their own cohort's aggregate data, defined in the partnership terms. Sponsored members remain individual users with their own privacy rights; sponsors never get access to private data.

### Notes
Same rules as user notes.

## C.5 Ownership and control workflows

### Orphaned organization (no active owner)
Detected automatically (owner left, deactivated or unreachable). Dashboard and the organization list flag it. Resolution path:
1. Existing Admins (if any) can nominate a new Owner in the product.
2. If no Admin can act, the **ownership claim** workflow starts: a claimant provides proof of authority (registry listing, board resolution, authorization letter, verified company email), and passes identity checks at the organization's verification level.
3. Reviewed by verification staff and a senior approver; **cool-down** (default 7 days) with notices to all known contact points and to the previous Owner if reachable.
4. On approval, the new Owner is set, sessions are revoked, API keys are rotated, and the verification review is triggered.
Because ownership claims are a common fraud path, every claim also gets a fraud check.

### Ownership transfer disputes
Two parties claim control: a Dispute case opens; the organization is `Limited` (read-only for key actions such as payouts, offers, data room grants and job publishing) until resolved; evidence follows the dispute process.

### Change legal name, registration or domain
Triggers re-verification. Staff can't edit these values; they are changed by the Owner through the product and reviewed by verification. A change during an open dispute or fraud case is held.

### Merge duplicate organizations
Rare and high-risk. Requires consent or proof of common ownership, a senior approver, dual control, a plan for each record type (jobs, pipelines, data rooms, billing, templates), and no open cases. Logged and reversible only within a short window.

### Suspension, limits, restoration
Executed in Moderation, Fraud or Verification workflows; the page shows the result, the reason code, the end date and links. Staff can't suspend here directly.

### Close organization
Through the owner's request in the product (Danger zone) or Data Rights; the page shows `Closing` and its checklist status.

## C.6 Data contract
`GET /api/organizations?type=&status=&verification=&owners=&plan=&country=&cursor=` returns IDs, masked identifiers, counts and statuses. `GET /api/organizations/{id}?purpose=&caseId=` returns tab data allowed to the caller. Actions: `POST /api/organizations/{id}/ownership-claims`, `/reveal`, `/notes`. All sensitive actions require a role check, case or purpose, and approvals as described.

## C.7 States
- **Orphaned:** warning banner with **Start ownership claim** (only for the right roles) and the ongoing claim's stage.
- **Zero or one owner with 2FA off:** advisory banner for support to guide the organization.
- **Verification lapsed:** banner linking to Re-verification.
- **Legal hold or investigation:** banner; destructive actions disabled.
- **Partner expired:** badge shows `Agreement ended`; sponsored plans run to their end date, then revert.
- **Merged:** shows the surviving ID and the merge date.
- **Loading error:** inline **Retry**.

---

# Part D. Staff and Admin Roles: `/staff`

## D.1 Purpose
Manage the internal team that runs the platform: who they are, what they can do, how they get and lose access, and how that is reviewed. This page protects everything else, because a compromised or over-privileged staff account is the highest-impact risk.

## D.2 Who can use it
- **Super admins** and the **security administrator** manage staff and roles.
- **Compliance** has read-only access, plus access review sign-off.
- **Supervisors** can see their own team's staff and request changes.
- Everyone else sees only their own profile and access (**My access**).

## D.3 Layout
Tabs: **Directory** · **Roles and permissions** · **Access requests** · **Elevated access** · **Access reviews** · **Onboarding and offboarding** · **Service accounts and keys** · **Activity**. A summary strip: active staff, pending requests, elevated access in force, reviews due.

### Summary strip
| Card | Example |
|---|---|
| Active staff | 42 |
| Pending access requests | 5 |
| Elevated access active | 2 |
| Reviews due (30 days) | 1 |

## D.4 Directory tab
Table: staff ID, name, team, internal roles, status chip, manager, joined date, last sign-in date, 2FA method (hardware key or authenticator), training status (Current, Due, Overdue), conflicts declared (count), and actions (**Open**). Filters by team, role, status, training state and 2FA method.

### Staff profile (drawer or page)
- Identity, team, manager, work location and device compliance status (managed device attested through the identity provider).
- **Current roles and permission sets** with who granted them, when, why and any expiry.
- **Training and certifications** required for sensitive queues (child safety awareness, privacy and data handling, fraud, KYC basics, support security, wellbeing), with dates.
- **Conflicts declared** and recusals.
- **Recent privileged activity** summary (counts of reveals, approvals, exports) with a link to the audit log; used for access reviews, not for ranking staff.
- **Actions:** request role change, request elevated access, start offboarding, suspend (security administrator only), reset hardware key enrollment (with verified process and a cool-down).

## D.5 Roles and permissions tab
- **Role definitions:** each internal role (Support agent, Senior support, Verification reviewer, Senior reviewer, Trust and safety moderator, Senior moderator, Fraud analyst, Finance, Content and program manager, AI quality reviewer, Compliance officer, Security administrator, Analyst, Super admin) with description, purpose, permission set, required training, and approvers.
- **Permission matrix:** rows are capabilities (for example "Reveal masked identity data", "Approve payouts", "Apply bans", "Change plan limits", "Publish policy rules", "Place legal holds", "View audit log"), columns are roles; each cell shows `None`, `View`, `Act`, `Approve` and notes on dual control. Capabilities are named in plain language and map to server permission keys.
- **Separation of duties rules**, enforced by the server and shown here:
  - Requester and approver must be different people.
  - A person can't approve a change to their own access.
  - Money approvals need Finance plus a second approver above a threshold.
  - Policy rule changes need an author and a senior reviewer.
  - Super admin changes need two super admins.
  - Compliance can place a legal hold but lifting needs a second approver.
  - Staff can't act on records where they declared a conflict.
- **Role changes:** editing a role's permission set creates a **draft**, shows a diff and an impact preview ("This adds Reveal permission for 14 people"), requires two-person approval (a super admin and the security administrator, or two super admins), and is versioned with an effective date. Changes appear in the change log and notify affected staff.

## D.6 Access requests tab
Requests for new roles or changes: requester (usually a manager), staff member, requested role, reason, required training status, requested duration (standing or time-limited), approvers (manager plus the role owner plus security for sensitive roles), state (`Submitted`, `Approved`, `Rejected`, `Granted`, `Expired`). The page shows what the person will gain and what training is outstanding. Granting is automatic once approvals and training checks pass, and it writes an audit entry.

## D.7 Elevated access tab (just-in-time and break-glass)
- **Just-in-time elevation:** temporary higher permissions (for example reveal rights during an incident, or approval rights during leave coverage) with a reason, a linked case or incident ID, a maximum duration (default 4 hours, up to 7 days for coverage), and approvers (supervisor plus security for sensitive permissions). Access expires automatically; reminders appear 30 minutes before expiry.
- **Break-glass access:** emergency access for a defined set of critical situations (for example a security incident with no available approver). Needs two-factor with a hardware key, a stated incident ID and a reason, notifies security and compliance immediately, lasts up to 2 hours, and **requires a post-use review** within 48 hours (what was accessed and why). Misuse is handled through HR and security processes.
- **Active elevations table:** who, what, why, linked case, approvers, expiry, and **Revoke now** (security administrator, supervisor).

## D.8 Access reviews tab
- **Recertification:** every quarter (default), managers confirm each direct report's roles are still needed, with `Keep`, `Reduce` and `Remove` options and a reason. Roles with sensitive permissions are reviewed by the role owner too. Unreviewed items escalate and can lead to automatic suspension of the specific permission after a grace period.
- **Review scope:** includes dormant accounts (no sign-in for 30 days), accounts with unusual privileged activity patterns (for example many reveals without case links, shown neutrally for a human to check), and elevated access history.
- **Output:** a signed review record with decisions, kept for compliance and shown to auditors.
- **Metrics:** completion rate and time, number of permissions removed, dormant accounts handled (aggregate).

## D.9 Onboarding and offboarding tab
- **Onboarding checklist (per role):** identity verified by HR, background check where the role requires it and the law permits, signed confidentiality and acceptable-use terms, managed device enrolled, SSO account created, hardware key issued and registered, required training completed with a test, shadowing period with limited permissions (read-only or supervised actions) for the first weeks, access granted only after the checklist is complete.
- **Offboarding checklist:** triggered by HR or a manager. **Immediate** (within minutes of the effective time): disable SSO, revoke sessions and tokens, remove from queues, reassign claimed cases, revoke service accounts and API keys they own, retrieve hardware keys and devices. **Within 24 hours:** review their recent privileged activity, remove from distribution lists, transfer ownership of saved views and macros. Everything is logged and verified by the security administrator.
- **Leave:** accounts of staff on extended leave are suspended automatically after a set period and restored with a check.
- **Role change:** moving teams triggers removal of old permissions and a request for the new ones.

## D.10 Service accounts and keys tab
Non-human identities used by integrations and jobs: name, owner (a named staff member), purpose, permissions (scoped to the minimum), created and last used, rotation date, status. Keys are shown once, rotated on a schedule (default 90 days), revoked in one click, and alert on unusual use. Staff can't use service accounts interactively. Production credentials never appear in this console after creation.

## D.11 Activity tab (security and compliance)
A filtered view of the platform audit log for staff administration: logins, failed sign-ins, role changes, approvals, elevated access, break-glass use, exports, reveals by volume, offboarding actions. Visible to the security administrator, compliance and super admins; exports require re-authentication.

## D.12 Data contract
`GET /api/staff?team=&role=&status=` returns staff records with the fields above (no personal data beyond name, team and work details). `POST /api/staff/{id}/access-requests`, `/elevation`, `/offboard`, `/suspend` require roles, approvals and reasons; the server enforces separation of duties and rejects self-approval. Role definitions are versioned objects with effective dates. Identity and groups are synchronized from the identity provider through SCIM or an equivalent, with the admin console treating the provider as the source of truth for membership and deprovisioning.

## D.13 States
- **Pending offboarding:** banner with remaining steps; access already revoked is shown as done.
- **Review overdue:** error chip; the manager and the security administrator are notified.
- **Dormant account:** suspended automatically after the grace period; restoration needs a manager and a check.
- **Training overdue:** sensitive permissions are suspended until the training is completed.
- **Hardware key lost:** supervised re-enrollment with a cool-down, notifications to the manager and security, and reduced permissions during the process.
- **Break-glass in use:** top banner across the console for security and super admins; review task created.
- **Identity provider outage:** console sign-in follows the documented emergency procedure (a small number of break-glass accounts with hardware keys, monitored); the page shows a notice.
- **Loading error:** inline **Retry**.

---

# Part E. Cross-cutting design

## E.1 IDs and linking
Stable IDs (`usr_…`, `org_…`, `stf_…`). Users link to organizations, memberships link to roles, cases link to both. The **Related** panels show IDs, types and statuses only.

## E.2 Account lifecycle (reference)
Created → Email verified → Role chosen → Verification (if required) → Active → (Paused by user | Limited | Suspended | Banned) → Closing → Closed. Staff can see the state and its source but change it only through the workflows that own it, so reasons, approvals and appeals always exist.

## E.3 Search and privacy limits
- Search limits and logging as in Part A.3.
- No export of personal data from lists; exports contain IDs and statuses only.
- A **sensitive-search alert** notifies supervisors when a staff member runs many name searches or opens many records without case links in a short time (a neutral flag for review, not an accusation).

## E.4 Multi-role accounts
A person's roles share one identity but keep separate data. The pages show each role's state separately, and actions are role-scoped (for example, a suspension from employer misconduct limits the employer role first, with the effect on other roles stated in the preview). Policy decides whether other roles are affected, and staff must record why.

## E.5 Partners and sponsored access
Partner records can sponsor access (for example a college sponsoring practice interview packs for students). Sponsors see aggregate usage only, never individuals' scores, answers, resumes or applications.

## E.6 Reporting (aggregate)
Monthly reports on account growth by role, verification states, orphaned organizations, recovery cases and outcomes, access review completion, elevated access use. Not used to rank staff.

---

# Part F. States and error handling (common)

| State | Behavior |
|---|---|
| Purpose not provided | Content stays hidden until the purpose dialog is completed |
| Record under legal hold | Banner; destructive actions disabled |
| Conflict declared | Record blocked for that staff member; reassigned and logged |
| Approval pending | Chip with requester, approver and age; **Remind** |
| Self-approval attempted | Refused with an explanation |
| Reveal requested | Reason picker; value shown for 60 seconds; logged |
| Search rate limit reached | Message with the reset time; supervisors can raise limits with a reason |
| Data unavailable for a tab | Tab shows the reason and **Retry**; other tabs stay usable |
| Stale or live updates paused | Same labels as the Dashboard |
| Offline | Notes autosave locally; actions disabled with "You're offline." |
| Staging | Strip shows STAGING; synthetic accounts only |

---

# Part G. Accessibility, performance and operations

- **Accessibility:** WCAG 2.1 AA in light and dark themes; keyboard-only completion of search, opening a record and an approved action; visible focus ring; status by text and icon as well as color; the permission matrix is a real table with row and column headers and text labels in cells.
- **Performance:** list and search under 1.5 seconds (p75) at 100,000+ accounts using indexed fields and a search service with hashed exact-match lookups; detail pages under 2 seconds with tabs loaded on demand; limits on result counts to prevent bulk extraction.
- **Reliability:** read replicas for lists; detail data from authoritative services; per-tab graceful degradation when a service is down; audit writes are synchronous for sensitive actions (an action fails if its audit entry can't be written).
- **Observability:** error tracking and performance monitoring without personal data; alerts for unusual search or reveal volumes, failed approvals, break-glass use and role changes.
- **Localization:** English first; IST dates with the time zone displayed.
- **Telemetry (internal, aggregate only):** search usage, time to resolve ownership claims and recoveries, approval turnaround, review completion. Not used to rank individuals.

---

# Part H. Security, privacy and audit

- **Admin app controls (subdomain):** single sign-on, mandatory two-factor (hardware key or authenticator app), 15-minute idle lock, 8-hour absolute session, host-scoped `Secure`, `HttpOnly`, `SameSite=Strict` cookies, strict CSP, no indexing, optional VPN or IP allowlist, server-side permission checks on every request, separate deployment and secrets from the public app, managed-device requirement for sensitive roles.
- **Data minimization and purpose limitation:** lists show IDs, roles, statuses and masked names. Detail pages need a purpose, mask sensitive fields, hide content entirely, and log reveals. No raw database access for staff through this console.
- **Anti-takeover controls:** verification, cool-downs, multi-point notifications and second approvers for email, phone, two-factor, ownership and merges; extra scrutiny for high-value accounts and organizations; fraud checks on every ownership claim.
- **No impersonation, no password handling:** the console never shows or sets passwords, secrets or backup codes, and never creates sessions as a user.
- **Dual control and separation of duties:** as listed in D.5, enforced on the server.
- **Audit:** every search touching personal fields, record open (with purpose), reveal, action, approval, role change, elevation, break-glass use, export and offboarding step writes an append-only entry with staff ID, time, target ID and reason. Audit access is itself audited.
- **Retention:** directory data follows the account lifecycle; staff records are kept per HR and legal requirements; audit entries are retained per policy; legal holds block deletion.
- **Staff screening and training:** background checks where lawful, confidentiality terms, mandatory privacy and security training before access, and periodic refreshers.
- **Law-enforcement and regulator requests:** handled only by compliance with a documented legal basis; staff never respond directly and never disclose records informally.
- **Regulatory:** confirm with counsel staff access rules, purpose limitation, data localization and cross-border access, background-check legality, ownership and recovery procedures, and retention of directory and audit data.

---

# Part I. Acceptance criteria and QA checklist

**Users and organizations lists**
- [ ] Lists contain no emails, phones, addresses, document names or message content; names are masked.
- [ ] Email and phone search is exact-match by hash only; name search is prefix-only, limited, rate-limited and logged.
- [ ] Bulk actions are limited to export of IDs and statuses, saved views and linking to cases; no bulk suspend, email, role change or reveal.
- [ ] Filters never use personal characteristics.

**Detail pages**
- [ ] Opening a record without a case context requires a purpose, which is stored and shown; case-linked opens auto-fill the purpose.
- [ ] Tabs show only what the viewer's role allows; omitted fields are listed by name as "Hidden for your role."
- [ ] No messages, resumes, answers, recordings, documents, offer amounts or card and bank details appear on any tab.
- [ ] Roles can't be granted or removed from these pages; status changes link to the owning workflows.
- [ ] Reveals need a reason, last 60 seconds and are logged.
- [ ] Admin view renders are read-only, masked, logged and carry the banner; no impersonation exists.

**Sensitive workflows**
- [ ] Email, phone and two-factor changes require verification, a second approver and a cool-down with notices to old and new contact points; high-value accounts get longer cool-downs.
- [ ] Ownership claims need proof, identity checks, a senior approver, a cool-down, a fraud check, session revocation and key rotation.
- [ ] Merges require consent or proof, dual control, no open cases, and are reversible only within the window.
- [ ] Account and organization deletion happens only through Data Rights.

**Staff and roles**
- [ ] Requester and approver can't be the same person; self-approval of access is impossible; super admin changes need two super admins.
- [ ] Role definition changes show a diff and impact preview, need two-person approval and are versioned.
- [ ] Elevated access expires automatically; break-glass requires an incident ID, notifies security and compliance, and creates a post-use review task.
- [ ] Quarterly access reviews run; unreviewed permissions are suspended after the grace period; dormant accounts are suspended automatically.
- [ ] Offboarding revokes SSO, sessions, tokens, keys and queue membership within minutes and creates a verification record.
- [ ] Training status gates sensitive permissions.

**Security and privacy**
- [ ] SSO and two-factor are mandatory; idle lock and session limits work; permissions are enforced on the server on every request.
- [ ] Audit entries are written synchronously for sensitive actions and are append-only; audit access is audited.
- [ ] No personal data appears in logs, error reports, notifications or analytics payloads.
- [ ] Sensitive-search alerts reach supervisors as neutral flags.

**Accessibility and performance**
- [ ] Keyboard-only use covers search, open, approve and reveal flows; AA contrast in both themes; the permission matrix is accessible.
- [ ] Performance targets in Part G are met at 100,000+ accounts; result caps prevent bulk extraction.

---

# Part J. Build order (suggested)

1. **Admin foundation:** subdomain, SSO and SCIM with the identity provider, mandatory two-factor with hardware keys, server-side permission engine, append-only audit log with synchronous writes, masking and reveal service.
2. **Staff and Admin Roles (core):** directory, role definitions and permission matrix, separation-of-duties rules, access requests and approvals, onboarding and offboarding. Every other admin page depends on this.
3. **Users and Accounts** list with safe search (hashed exact match), filters and saved views.
4. **User Detail:** purpose dialog, overview, roles and memberships, cases, notes; then security tab and approved actions; then billing summary and consents.
5. **Sensitive workflows:** account recovery, email and phone change with cool-downs, two-factor reset, with fraud checks.
6. **Organizations** list and detail, then ownership claims, orphaned organization handling and merges.
7. **Elevated access and break-glass**, access reviews, service accounts and keys.
8. Partner and program records, sponsored access, reports, sensitive-search alerts.
9. Accessibility, performance and security review against the checklist, then a staged rollout (one team first, with security supervising).

**Suggested first release:** the foundation, Staff and Admin Roles (directory, roles, approvals, onboarding and offboarding), Users and Accounts, User Detail (without merges), and Organizations (read-only plus ownership claims). Add elevated access reviews, service account tooling and partner programs once the first teams are operating. Your proposal says to launch with startups and mentors first, so the first organization and user records staff handle will mostly be startups, mentors and founders.

**Reminder for the build:** the subdomain is an isolation layer, not an access control. Keep mandatory two-factor, server-side permission checks, purpose-bound access, masking with logged reveals, dual control and cool-downs for account takeover paths, no impersonation, and the append-only audit log from day one. Staff should never need to see message content, documents, resumes, answers, offer amounts or card details to do their jobs here. Get legal advice on staff access to personal data, background checks, ownership and recovery procedures, and retention before launch.
