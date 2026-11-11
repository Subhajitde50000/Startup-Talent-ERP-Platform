# Admin Console: Page List, URIs and Priority

**App:** Platform admin console on its own subdomain (for example `admin.yourdomain.com`). All URIs below are relative to that subdomain, so `/dashboard` means `admin.yourdomain.com/dashboard`.

**Scope:** 39 pages, designed in 10 files (listed at the end).

**How the ranking works:** pages are ranked by how early the platform needs them. The order follows your proposal's launch plan (startups and mentors first, then employers, then investors and paid features).

| Tier | Meaning |
|---|---|
| **P0** | Needed before the first real users |
| **P1** | Needed in the first weeks, or when employers and paid features open |
| **P2** | Needed when money, investors and AI scoring go live |
| **P3** | Growth and polish; can start manual or simple |

---

## 1. All admin pages, ranked by importance

| Rank | Tier | Page | URI | Why it ranks here |
|---|---|---|---|---|
| 1 | P0 | Staff and Admin Roles | `/staff` | Controls who can do anything in the console |
| 2 | P0 | Platform Audit Log | `/audit` | Every other page writes to it |
| 3 | P0 | Verification Queue | `/verifications` | Verification gates every other role |
| 4 | P0 | Startup Verification Review | `/verifications/startups/:id` | Startups launch first |
| 5 | P0 | Mentor Credential Review | `/verifications/mentors/:id` | Mentors launch first |
| 6 | P0 | Support Tickets | `/support` | Users need help from day one |
| 7 | P0 | Ticket Detail | `/support/:ticketId` | Where tickets are actually answered |
| 8 | P0 | Data Rights Requests | `/data-requests` | Legal deadlines start when you hold personal data |
| 9 | P0 | Policy Rules and Blocklists | `/policies` | The product's banned-content and fee checks read from it |
| 10 | P0 | Moderation Queue | `/moderation` | Safety |
| 11 | P0 | Reports | `/reports` | Feeds moderation from user reports |
| 12 | P0 | Appeals | `/appeals` | Every adverse decision needs an appeal path |
| 13 | P0 | Admin Dashboard | `/dashboard` | Home screen and work queues for staff |
| 14 | P0 | Users and Accounts | `/users` | Needed to help and investigate |
| 15 | P0 | User Detail | `/users/:userId` | Same |
| 16 | P1 | Platform Configuration | `/config` | Feature flags, limits and calendars |
| 17 | P1 | System Health and Incidents | `/system` | Incident handling and the status page |
| 18 | P1 | Plans, Pricing and Entitlements | `/plans` | The product reads its limits from here |
| 19 | P1 | Employer Verification Review | `/verifications/employers/:id` | Employers can't publish until verified |
| 20 | P1 | Integrations and Providers | `/integrations` | Credentials, webhooks and failover |
| 21 | P1 | Compliance and Reporting | `/compliance` | Records of processing, retention, incidents |
| 22 | P1 | Help and Announcements | `/content` | Articles, policy pages, announcements |
| 23 | P1 | Templates and Question Banks | `/templates` | Platform defaults every role starts from |
| 24 | P1 | Organizations | `/organizations` | Startups, funds and employer companies |
| 25 | P1 | Notifications (shared) | `/notifications` | Staff alerts and approvals |
| 26 | P1 | Settings (shared) | `/settings` | Staff security keys and preferences |
| 27 | P1 | Internal Help and Runbooks (shared) | `/help` | Guides and incident runbooks |
| 28 | P2 | Revenue and Billing Overview | `/billing` | Once payments start |
| 29 | P2 | Payouts, Refunds and Credit Notes | `/payouts` | Mentor payouts and refunds |
| 30 | P2 | Disputes | `/disputes` | Once money and sign-offs can be contested |
| 31 | P2 | Investor KYC Review | `/verifications/investors/:id` | When the investor module opens |
| 32 | P2 | Re-verification and Expiry | `/verifications/expiring` | After the first verifications age |
| 33 | P2 | Rubrics and Scoring Config | `/rubrics` | Before any readiness score is shared |
| 34 | P2 | AI Quality and Human Review | `/ai-quality` | Required before scores reach employers |
| 35 | P2 | Fraud and Abuse Monitoring | `/fraud` | When volumes justify it |
| 36 | P3 | Matching and Search Settings | `/matching` | Mentor matching can start manual |
| 37 | P3 | Platform Analytics | `/analytics` | Start with the Overview tab earlier |
| 38 | P3 | Grants and Incubators | `/opportunities` | A small verified list can be seeded by hand |
| 39 | P3 | Events Management | `/events` | Once anchor investors are on board |

---

## 2. Detail routes that belong to those pages

| Parent | Detail URIs |
|---|---|
| `/moderation` | `/moderation/:caseId` |
| `/reports` | `/reports/:id` |
| `/appeals` | `/appeals/:id` |
| `/disputes` | `/disputes/:id` |
| `/fraud` | `/fraud/cases/:id` |
| `/ai-quality` | `/ai-quality/reviews/:id` |
| `/data-requests` | `/data-requests/:id` |
| `/organizations` | `/organizations/:orgId` |
| `/content` | `/content/articles/:id`, `/content/announcements/:id` |
| `/templates`, `/rubrics`, `/opportunities` | `/templates/:id`, `/rubrics/:id`, `/opportunities/:id` |
| `/events` | `/events/:id`, `/events/:id/live` |
| `/plans` | `/plans/:id` |
| `/payouts` | `/payouts/batches/:id`, `/payouts/refunds/:id` |
| `/system` | `/system/services/:id`, `/system/incidents/:id` |
| `/integrations` | `/integrations/providers/:id` |

---

## 3. Pages that can be grouped

### 3.1 Pages that can be merged into one route or one tab

| Merge | Result |
|---|---|
| Four verification reviews (startup, mentor, investor, employer) | One route, `/verifications/:type/:id`. Each type loads its own checklist from config, but the layout is the same. |
| Re-verification and Expiry | A tab of the Verification Queue (`/verifications?view=expiring`), because it is the same table with different filters. |
| Reports | A tab inside Moderation, because both share the same case engine. Keep the report detail URL. |
| Users and Organizations | One "Directory" page with a Users and Organizations toggle. They share search, masking and the purpose dialog. Keep separate detail routes. |
| Help and Announcements, Templates, Rubrics | One "Content hub" with sections, since they share the editor, review and version history. |
| Billing, Plans, Payouts | One "Money" area with tabs and a shared layout. |

If you merge pages into tabs, enforce permissions per tab on the server. For example, finance sees the Payouts tab and support does not.

### 3.2 Pages that should stay separate

| Pages | Reason |
|---|---|
| Audit Log, Compliance, Staff | Different access rules and different owners |
| AI Quality and Rubrics | AI reviewers who approve rubrics are a separate group from content editors |
| Dashboard, System, Config | Dashboard is a landing view, System is for incident response, Config is for approved changes; each has a different audience |

### 3.3 Build once, reuse everywhere

The 39 pages come down to about **7 reusable screen templates**:

| Template | Pages that use it |
|---|---|
| Queue plus case workspace | Verifications, Moderation, Reports, Appeals, Disputes, Support, Data Requests, AI Quality, Fraud cases |
| Directory plus record detail | Users, Organizations, Staff |
| Versioned editor with review and rollback | Content, Templates, Rubrics, Opportunities, Events, Matching, Policies, Plans, Config |
| Dashboard with charts | Dashboard, Analytics, Billing overview, System overview, Compliance overview |
| Registry with health | Integrations, System services |
| Log explorer | Audit Log |
| Shared pages | Notifications, Settings, Help |

After merging, you would have about 30 routes instead of 39, built from those 7 templates. The templates matter more than the route count. Build these shared pieces first, since they save the most work:
- the list view with claim locks
- the three-column case page
- the version history and approval bar
- the masked-field reveal

---

## 4. Suggested build order (by tier)

1. **P0 (ranks 1 to 15):** staff and roles, audit log, verification queue with startup and mentor reviews, support, data rights, policies, moderation, reports, appeals, dashboard, users.
2. **P1 (ranks 16 to 27):** configuration, system health, plans and entitlements, employer verification, integrations, compliance, content, templates, organizations, shared pages.
3. **P2 (ranks 28 to 35):** billing, payouts, disputes, investor KYC, re-verification, rubrics, AI quality, fraud monitoring.
4. **P3 (ranks 36 to 39):** matching settings, analytics, grants and incubators, events.

**Dependencies to respect:**
- Build the audit log before anything else that changes data, since every page writes to it.
- Build Policy Rules before the employer Job Editor and Messages go live, because they read the banned-content rules from it.
- Build AI Quality and Rubrics before any readiness score is visible to employers.
- Build Plans and Entitlements before any paid feature, because the product reads its limits from there.

---

## 5. Design files for each page

| File | Pages covered |
|---|---|
| `admin-dashboard-design.md` | Admin Dashboard |
| `admin-verifications-design.md` | Verification Queue, Startup, Mentor, Investor and Employer reviews, Re-verification and Expiry |
| `admin-trust-safety-design.md` | Moderation, Reports, Appeals, Disputes, Fraud, Policy Rules, AI Quality |
| `admin-support-data-rights-design.md` | Support Tickets, Ticket Detail, Data Rights Requests |
| `admin-users-organizations-design.md` | Users, User Detail, Organizations, Staff |
| `admin-content-programs-design.md` | Content, Templates, Rubrics, Grants and Incubators, Events, Matching |
| `admin-money-design.md` | Billing Overview, Plans and Entitlements, Payouts |
| `admin-insights-compliance-design.md` | Analytics, Compliance, Audit Log |
| `admin-operations-design.md` | System, Integrations, Configuration |
| `admin-shared-pages-design.md` | Notifications, Settings, Internal Help |

---

## 6. Notes for the build

- **Subdomain is not access control.** Every page still needs single sign-on, mandatory two-factor, server-side permission checks on every request, masking with logged reveals, and writes to the audit log.
- **Staff roles decide what each page shows.** The ten design files include a "who sees what" table for each internal role (support, verification reviewer, moderator, finance, compliance, security, engineer, analyst, super admin).
- **Money and sensitive changes use maker-checker.** One person prepares, a different person approves, with hardware-key confirmation.
- **No individual-level analytics.** Analytics and insights are aggregate only, with small groups hidden.
- **Get legal advice before launch** on KYC and eligibility, data protection and breach rules, retention, moderation obligations, payments and tax, and securities rules for investor features.
