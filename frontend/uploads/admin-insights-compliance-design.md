# Admin Insights and Compliance Design (production spec)

**App:** Platform admin console on its own subdomain (for example `admin.yourdomain.com`). Routes below are relative to that subdomain.
**Users:** analysts and the leadership team (analytics), compliance officers and the data protection officer (compliance), security administrators (audit), and super admins.

These three pages answer three questions for the people running the platform: **Is it working?** (analytics), **Are we doing what the law and our promises require?** (compliance), and **Can we prove what happened?** (audit). They sit at the end of every other admin page and every public design: every page writes to the audit log, every data-rights, moderation, verification and money workflow feeds compliance reporting, and the aggregated, anonymized insights shown to users (startup peer benchmarks, investor market insights, employer hiring analytics benchmarks) are managed from here. Your proposal's ERP core lists analytics (stage progress, funnel from registration to funding or hire, revenue, usage), consent-based sharing, compliance with applicable data-protection law (for example India's DPDP Act, and GDPR if serving EU users), securities-rule review for the investor module, and a full audit trail; its success metrics define most of the analytics below.

| # | Page | Route | Purpose |
|---|---|---|---|
| 1 | Platform Analytics | `/analytics` | Funnel from registration to funding or hire, usage, marketplace health, retention, revenue (aggregate), and the anonymized insights published to users |
| 2 | Compliance and Reporting | `/compliance` | Data-protection posture, processing records, retention, legal holds, incidents, regulator and law-enforcement requests, vendors, regulator-ready reports |
| 3 | Platform Audit Log | `/audit` | The append-only record of every sensitive action and access, with integrity checks, alerts and controlled export |

> **Subdomain note.** The admin console is a separate app, so there is no per-route role-based file. Section 3 gives a short **who sees what** table (internal roles) because it decides what each page shows. Section 12 lists the controls the subdomain still needs (single sign-on, mandatory two-factor, server-side permission checks, approvals, audit), because a separate address doesn't protect anything on its own.

> **Legal reminder.** These pages produce and hold the evidence regulators and courts ask for. Get legal advice before launch on data-protection obligations (DPDP Act, and GDPR if you serve EU users), breach notification rules and deadlines, record-keeping and retention, law-enforcement and regulator request handling, cross-border transfers, securities-rule review for investor features, anonymization standards for published insights, and audit log retention. Analytics must not become a back door to personal data: individual-level views don't exist on these pages.

---

## 1. Design principles

- **Aggregate by design:** analytics show groups, rates and trends. There is no individual-level browsing, and small groups are suppressed so no one can be re-identified.
- **Defined once, used everywhere:** every metric has one definition, owner and version in a registry. Two dashboards never disagree about what "active startup" means.
- **Honest numbers:** each metric shows its period, sample size, freshness and known limits. Partial or delayed data is labeled, never smoothed over.
- **Describe, don't judge people:** metrics measure the platform, products and processes. They don't rank staff, users or organizations as people.
- **Compliance as a living record:** processing records, retention, vendors, consents, incidents and requests are kept current by the systems that create them, not by annual spreadsheets.
- **Evidence, not assertions:** every compliance statement links to the records behind it, and regulator-ready reports are generated from the same data staff see.
- **The audit log is sacred:** append-only, tamper-evident, complete, and hard to switch off. Looking at it is itself logged.
- **Least access, time-boxed:** sensitive views need a purpose, a role and, for exports, an approval and a re-authentication.

---

## 2. Design tokens and shared look

Same tokens as the Admin Dashboard (ink, ivory, one gold accent, light and dark themes; `Fraunces` and `Inter`; IST timestamps with a visible time zone; 8px grid; 12px cards; 10px controls). Charts: ink for the main series, gold for the current period or highlight, stone-400 for comparison; never more than three colors per chart; direct labels; every chart has **View as table** and a text summary.

### Shared chips

| Group | Chips |
|---|---|
| **Metric status** | `Certified` (success tint, reviewed definition), `Provisional` (warning tint), `Deprecated` (stone), `Suppressed` (stone outline, small group) |
| **Freshness** | `Live`, `Updated {time}`, `Delayed` (warning tint), `Incomplete` (warning outline) |
| **Compliance status** | `On track` (success tint), `Needs attention` (warning tint), `Overdue` (error tint), `Under review` (ink outline), `Not applicable` (stone) |
| **Incident severity** | `Notifiable` (error fill), `High` (error tint), `Medium` (warning tint), `Low` (stone) |
| **Audit category** | `Admin action`, `Sensitive access`, `Security`, `Configuration`, `Money`, `Moderation`, `Verification`, `Data rights`, `System` |
| **Integrity** | `Verified` (success tint), `Gap detected` (error tint), `Verifying` (stone) |

### Shared components
- **Metric card:** name, value, change chip (arrow plus text), sparkline, sample-size chip (`n = 2,410`), status chip, and a "How is this calculated?" link to the metric registry entry.
- **Chart card:** headline sentence ("Registration to verified conversion rose from 41% to 46% in October"), chart, source and freshness chip, **View as table**, **Export** (aggregates only, approvals as in 4.7).
- **Definition drawer:** name, plain-language definition, formula, data sources, owner, version, change history, known limits, and the surfaces that use it.
- **Evidence link:** compliance rows link to the underlying records (for example the data-rights requests behind an on-time rate) in their own pages.
- **Purpose dialog:** viewing sensitive audit data or exporting requires a purpose and, where applicable, a case or request ID.
- **Timeline:** events with actor and time.

### Keyboard shortcuts
`g` then `a`, `c`, `l` go to Analytics, Compliance, Audit log · `/` search · `j` / `k` move in lists · `e` export (opens the approval flow) · `?` shortcuts. Disabled while typing.

---

## 3. Internal roles and what they see (content scoping)

| Internal role | Access in this area |
|---|---|
| Analyst | Platform Analytics (aggregate dashboards, metric registry read, saved views); no raw events, no individual records; can propose new metrics |
| Product and leadership viewers | Platform Analytics dashboards (certified metrics) |
| Data steward | Owns the metric registry and event taxonomy; reviews and certifies definitions; manages published insights |
| Finance | Revenue tab in Analytics with amounts (aggregate); links to Billing |
| Trust and safety, support leads | Aggregate operational metrics for their areas |
| Compliance officer and data protection officer | Full Compliance and Reporting; read access to the audit log (with purpose); approvals for exports and published insights; legal holds |
| Security administrator | Audit log (full read), integrity and alerting configuration, incident records; no finance |
| Super admin | Read-only on audit; configuration changes with dual control; cannot delete or alter any log |
| Auditors (external, time-boxed) | Read-only access to specific evidence sets through a controlled, expiring workspace |
| Others | No access |

The server enforces this on every request. Nobody, including super admins, can edit or delete audit entries or compliance evidence records.

---

# Part A. Platform Analytics: `/analytics`

## A.1 Purpose
Show how the platform is performing against its goals: how people move from registration to funding or hiring, how the marketplace sides balance, which features are used, and how healthy retention and revenue are. It also manages the anonymized insights that users themselves see.

## A.2 Layout
```
┌──────────────────────────────────────────────────────────────┐
│ Title "Analytics"    [Range] [Compare] [Segment] [Export]    │
├──────────────────────────────────────────────────────────────┤
│ Data quality strip (freshness, completeness, open issues)    │
├──────────────────────────────────────────────────────────────┤
│ Tabs: Overview · Startups · Mentors · Investors · Jobs ·     │
│ AI features · Marketplace health · Retention · Revenue ·     │
│ Published insights · Metric registry · Data quality          │
├──────────────────────────────────────────────────────────────┤
│ Insight strip (2–3 auto insights)                            │
├──────────────────────────────────────────────────────────────┤
│ KPI row                                                      │
├───────────────────────────────┬──────────────────────────────┤
│ Charts (8 col)                │ Side: definitions and notes  │
└───────────────────────────────┴──────────────────────────────┘
```
Global controls: **date range** (7 days, 30 days, 90 days, This quarter, This financial year from April, Custom up to 24 months), **compare** (previous period, same period last year), **segment** (role, country or state, plan, acquisition channel, cohort month; segments are never personal characteristics and groups below 10 are suppressed), **Export** (aggregates only, Part A.7).

## A.3 Rules for every number
- **Minimum group size:** any breakdown with fewer than 10 entities is hidden or merged into "Other" and labeled `Suppressed`. Complementary suppression prevents back-calculating a hidden cell from totals.
- **Rounding:** counts under 100 are shown exactly only when safe; otherwise rounded; rates show the counts behind them.
- **No individual rows:** tables list segments, cohorts, features and time buckets, never people or organizations. Top-N lists of organizations aren't shown.
- **Freshness and completeness:** each card shows the last update, expected lag and any missing source ("Practice events delayed 2 hours"). Incomplete periods are dashed.
- **Definitions:** every metric links to the registry; metrics without a certified definition show `Provisional` and can't appear in leadership summaries.

## A.4 Overview tab
KPI row (aligned with your proposal's success metrics):
| Card | Example |
|---|---|
| Registered accounts (by role) | 48,210 |
| Verified share (by role) | Startups 71%, Mentors 84%, Investors 62%, Employers 66% |
| Active accounts (28 days) | 21,900 |
| Registration to first key action | 54% within 7 days |
| Revenue (period) | ₹42.8L (links to Billing) |
| Retention (month 3) | 38% |

Charts: **registration to outcome funnel** by role (see each role tab), accounts over time by role, active accounts and engagement, verification funnel, support and safety volume (aggregate), plus an "At a glance" panel with the top three changes since the previous period (`Auto insight`, labeled, factual).

## A.5 Role tabs

### Startups
- **Funnel:** registered → profile complete → verified → stage selected → first checklist item done → mentor requested → mentor active → Investment Ready badge → visible to investors → intro received → data room opened → offer received → round closed (the last steps use only events startups chose to record or that occurred on the platform).
- **Stage distribution and progression:** share of startups at each stage (Idea, Prototype, Early revenue, Mature), median days in stage, share reaching the next stage, exit criteria met distribution (aggregate).
- **Readiness:** distribution of readiness scores (bands), share earning the Investment Ready badge, time from registration to badge, checklist item completion rates (which items block most startups).
- **Tool usage:** which stage tools are used (canvas, interviews tracker, sprint board, pipeline, cap table, data room), completion and drop-off.
- **Hiring from startups:** share posting hiring requests, jobs published and filled.
- Group sizes below 10 are suppressed (for example a small sector in a small state).

### Mentors
- **Supply and activity:** applications, verification rate and time, accepting vs at capacity, active mentorships, sessions held per month, sign-offs granted per mentorship, deliverables completed on time.
- **Match health:** startup requests per mentor available, acceptance rate, time to first session, mentor-to-startup match rate (your proposal's metric), cancellations.
- **Outcome indicators (aggregate, not causal):** readiness change before and after mentoring, share earning the badge with and without a mentor, with a caption that correlation isn't proof of cause and with cohort controls described in the definition.
- **Quality:** review distribution (aggregate), response times, session summary timeliness. No ranking of individual mentors on this page.

### Investors
- **Funnel:** registered → applied → verified (Basic, Full) → first search → shortlist → intro request → intro accepted → data room opened → diligence started → offer made → commitment → round closed (events recorded on the platform).
- **Deal flow:** intros per verified investor and per Investment Ready startup, acceptance rate, time from intro to data room, offers per round, round closing time, percent committed distribution. **Investor introductions and rounds closed** (your proposal's metrics) are shown with sample sizes.
- **Engagement:** saved searches, alerts, events attendance, portfolio updates read.
- **Liquidity indicators:** ratio of active verified investors to Investment Ready startups visible, by sector and stage (suppressed for small cells).

### Jobs (employers and candidates)
- **Supply and demand:** employers verified and posting, jobs posted, jobs per employer, applications per job (your proposal's metric), candidates active, application rate per candidate, jobs with zero applicants after 14 days.
- **Hiring process:** time to first response (median and share within 14 days), time to hire, stage conversion funnel (aggregate across employers), offer acceptance rate, offers to start rate.
- **Candidate journey:** profile complete → resume created → applied → shortlisted → interview → offer → hired; drop-offs by stage; withdrawn rate.
- **Fair-process indicators (aggregate):** share of jobs using blind review and scorecards, rejection messages with reasons, response-time compliance. Never any breakdown by personal characteristics.

### AI features
- **Interview trainer:** sessions started and completed per active candidate (your proposal's metric), modes (text, voice, video), average session length, completion rate, drill usage, practice for specific interviews, score distributions by interview type (aggregate), review requests per 1,000 sessions and overturn rate, delivery analysis opt-in rate, readiness score sharing rate (aggregate).
- **Resume maker:** resumes generated per active candidate (your proposal's metric), import vs guided vs profile start, tailoring runs, ATS score distribution, fact-flag rate and unresolved flags at export (should be zero), AI acceptance and rejection rates of suggestions.
- **Quality and fairness (links to AI Quality):** drift and disparity alerts summary, release gate outcomes. Analytics shows high-level counts; detailed fairness dashboards live in AI Quality.
- **Cost and reliability:** AI request volume, latency and error rate, provider cost per active user (finance-safe aggregates).

### Marketplace health tab
Your proposal's main risk is the chicken-and-egg problem, so this tab shows **both sides at once**: verified startups visible, mentors available, verified investors active, employers with open jobs, candidates active; match rates, time-to-first-response and unmet demand (for example startups waiting for a mentor over 7 days, jobs with no applicants, intro requests waiting over 7 days). **Liquidity score** (a transparent ratio defined in the registry, not a black-box index) by sector and stage; geographic coverage; **anchor customer** tracking (counts, not names) for the launch plan. Used for operations and growth decisions.

## A.6 Retention and revenue tabs
- **Retention:** cohort tables (by signup month and role) for week 1, 4, 12, 26, 52; activation definitions per role; resurrection; churned vs paused; retention by plan and acquisition channel; feature adoption curves.
- **Revenue (aggregate; amounts for finance and leadership):** revenue by stream, MRR movement, ARPU by role, conversion from free to paid, trial conversion, pack redemption, refund rate, payment success, credits liability. Links to Billing for details. Analysts without finance rights see indexed or rounded values.

## A.7 Published insights tab (what users see)
The platform shows anonymized aggregate insights to users: **peer benchmarks** to startups (opt-in), **market insights** to investors (deal flow, sectors, rounds, readiness), and **hiring benchmarks** to employers (aggregate funnel and time-to-hire norms, opt-in). This tab manages them:
- **Insight catalog:** each published tile with its definition, source metric, minimum group size, suppression rules, refresh schedule, audience, opt-in requirement and last review date.
- **Release workflow:** draft → privacy review (data steward and compliance) → test with suppression and re-identification checks → approve → publish. New insight types need compliance approval.
- **Re-identification checks:** automated tests for small cells, difference attacks (comparing two overlapping publications), outlier dominance (one entity contributing most of a value), rare category combinations, and temporal tracking. Failing items are blocked or coarsened.
- **Opt-in counts:** how many startups and employers contribute to each benchmark, with the minimum needed (for example 10 per group) before it is shown; if the pool shrinks below the minimum, the tile is withdrawn automatically.
- **Source labels:** each published insight carries "Platform data", the period and the sample size, as the product designs require.
- **No predictions, no ratings:** insights describe what happened; they never forecast returns or rank startups or people.
- **Corrections:** a **Report a data issue** channel from the product feeds a queue here; corrected tiles show an "Updated" note.

## A.8 Metric registry tab
- **Registry list:** metric ID, name, definition summary, owner, status (`Certified`, `Provisional`, `Deprecated`), version, last reviewed, used in (dashboards and product surfaces).
- **Metric page:** full definition, formula (SQL or logic reference stored as code), sources, filters, time zone and calendar rules, handling of deletions and consent withdrawal (deleted accounts are removed or anonymized according to data-rights decisions), minimum group size, known limits, change log, and tests (unit tests on sample data).
- **Change control:** changes to certified metrics need the data steward and the owning team; the system shows downstream effects ("Changes the Overview 'Active accounts' card") and backfills history with a visible note.
- **Event taxonomy:** each event name, properties, owner, purpose, personal-data classification (none, pseudonymous, personal), retention, and whether it requires consent. New events need privacy review before they ship.
- **Naming and quality rules:** one name per metric; no duplicate definitions; deprecated metrics show their replacement.

## A.9 Data quality tab
- **Source status:** event pipelines, warehouse loads, provider imports (payments, email), with freshness, row counts versus expectations, schema drift alerts and last successful run.
- **Quality checks:** completeness (events per active session), duplicates, late events, impossible values, timezone issues, bot or test traffic filtered, consent filters applied.
- **Issue log:** open issues with impact on named metrics, owner and status; affected cards show `Incomplete` until fixed.
- **Reconciliations:** counts in analytics compared to operational sources (for example accounts vs the identity service, jobs vs the jobs service) with tolerance thresholds.

## A.10 Privacy and consent in analytics
- **Consent and preferences are honored:** the analytics pipeline excludes data from users who opted out of anonymous statistics where required (the product offers this in Settings), applies deletion and withdrawal decisions, and doesn't collect protected characteristics.
- **Pseudonymization:** events use pseudonymous IDs rotated on a schedule where possible; the mapping table sits behind the identity service and is unreachable from analytics tools.
- **Purpose limitation:** analytics data isn't used for decisions about individuals (no scoring, ranking or moderation decisions from analytics tables).
- **Retention:** raw events are kept for a short, stated period (set with counsel), then aggregated or deleted; aggregates are kept longer.
- **Staff access:** dashboards only; raw event access for data engineers is limited, logged, time-boxed and subject to approval.

## A.11 Export rules
- Exports contain aggregates only, with suppression applied; CSV and PDF; require re-authentication; for leadership or external use (for example investor updates about the platform, press), exports go through a **review step** by the data steward and, for public figures, compliance.
- Every export records who, what, when, filters and a checksum; shared links expire and are logged.

## A.12 Data contract
`GET /api/analytics/metrics/{metricId}?from=&to=&segment=&compare=` returns:
```json
{
  "metricId": "startup_investment_ready_rate",
  "version": 4,
  "status": "certified",
  "series": [{ "bucket": "2026-10", "value": 0.186, "n": 1240, "suppressed": false }],
  "segments": [{ "key": "sector:fintech", "value": 0.211, "n": 188, "suppressed": false }, { "key": "sector:agritech", "suppressed": true }],
  "freshness": { "asOf": "2026-11-07T18:00:00+05:30", "lagMinutes": 120, "complete": true },
  "definitionUrl": "/analytics/registry/startup_investment_ready_rate"
}
```
Endpoints serve only certified or provisional-labeled metrics; the server applies suppression and rounding rules, never the client. Segment filters are limited to an approved list. Query cost limits and caching apply.

## A.13 States
- **Metric provisional or incomplete:** labeled; excluded from leadership summaries.
- **Group suppressed:** shows "Hidden to protect privacy."
- **Pipeline delayed:** banner with affected cards and expected recovery.
- **No data (new role or period):** "Not enough data yet" with the minimum needed; no zero-filled fake charts.
- **Definition changed:** a notice on affected cards ("Definition updated 3 Nov; history recalculated").
- **Loading error:** inline **Retry**; other cards stay usable.

---

# Part B. Compliance and Reporting: `/compliance`

## B.1 Purpose
The platform's living record of how it meets legal and contractual duties for personal data, security, KYC and AML, securities-related features, and platform trust: who we process data about and why, how long we keep it, who processes it for us, what went wrong and what we told regulators and users. It turns the other admin pages' data into evidence and regulator-ready reports.

## B.2 Layout
Tabs: **Overview** · **Processing records** · **Retention and deletion** · **Legal holds** · **Incidents and breaches** · **Requests (regulators and law enforcement)** · **Vendors and transfers** · **Consent and notices** · **Risk and DPIAs** · **Policies and training** · **Reports and exports** · **Calendar**. Summary strip: open obligations, overdue items, incidents open, requests in progress.

## B.3 Overview tab
A **posture board** with `On track`, `Needs attention` or `Overdue` per area, each linking to evidence:
| Area | Examples of what the card shows |
|---|---|
| **Data rights** | On-time completion rate (90 days), requests due in 7 days, extensions used, refusals with reasons, employer-routed requests overdue (from Data Rights) |
| **Retention and deletion** | Jobs run on schedule, failures, backlog, backup overwrite status |
| **Consent and notices** | Current versions, acceptance rates, withdrawn consents and downstream effects |
| **Security and incidents** | Open incidents, time to contain, notifications due, access reviews on time (from Staff), two-factor coverage |
| **Vendors** | Vendors without current data-processing terms, assessments due, sub-processor changes pending notice |
| **KYC and AML** | Verification backlog and times, screening alert handling, suspicious-activity escalations (counts only), re-verification coverage |
| **Securities-related features** | Legal review status of investor module features, event approvals, disclaimers current |
| **Trust and safety obligations** | Grievance response times, report acknowledgment times, child-safety escalations handled (counts only), law-enforcement requests status |
| **AI governance** | Review turnaround, bias test status, rubric audits, model registry reviews (from AI Quality) |
| **Accessibility and consumer protection** | Open items from audits (from Content and Billing) |
Each card shows the owner, the next deadline, the last review date and a **View evidence** link. A weekly **compliance digest** is available by email to owners (IDs and counts only).

## B.4 Processing records tab (records of processing activities)
- **Inventory:** each processing activity (for example "Verification of investors", "Interview practice scoring", "Mentor payouts", "Job application handling", "Support tickets", "Analytics") with purpose, legal basis (consent, contract, legitimate interest or legal obligation, as counsel decides), data categories, data subjects (roles), recipients (internal teams, vendors), retention period, security measures, cross-border transfers, owner, last review, linked DPIA.
- **Data map:** systems and datastores with data categories and classification (personal, sensitive, financial, pseudonymous, non-personal), region, encryption, access roles, and the connectors used by Data Rights jobs (so every system holding personal data is registered).
- **Change control:** new processing, new fields or new vendors can't launch without a record and, where required, a DPIA. A **launch checklist** links to privacy review tasks for engineers.
- **Coverage check:** an automated comparison of schemas and event taxonomies against the map flags unregistered personal data fields.

## B.5 Retention and deletion tab
- **Retention schedule:** by data category and role: how long it is kept, why, what happens at the end (delete, anonymize, archive), and exceptions (legal holds, tax records, signed agreements, audit logs).
- **Job monitor:** scheduled retention and deletion jobs with last run, counts, failures and next run; failed jobs raise alerts and tasks. A **dry run** shows what would be removed.
- **Backups:** overwrite and expiry status of backups, and the documented statement of when deleted data disappears from backups.
- **Verification:** sampling checks that deleted data is really gone (searches of systems by test identifiers), with results logged.
- **Exceptions register:** records kept longer than the schedule, with legal basis and review date.

## B.6 Legal holds tab
- **Register:** hold ID, scope (account, organization, case, date range), reason (investigation, litigation, regulator request), requested by, placed by (compliance only), date, review date, status. Holds suspend deletion and anonymization for the scope and show on user, organization and case pages as flags.
- **Placing and lifting:** placing needs a reason and a case or request reference; lifting needs a second approver and is logged. Holds older than 90 days require a review.
- **Impact view:** counts of records and requests affected, and data-rights requests currently blocked by holds (so responses can explain limits).

## B.7 Incidents and breaches tab
- **Register:** incident ID, type (personal data breach, security incident, availability, misuse by staff, vendor incident), severity, status, detected, contained, resolved, systems and data categories affected, number of data subjects (estimate), risk assessment, owners.
- **Breach workflow:** triage → containment → assessment (does it meet the legal threshold for notification?) → decisions with counsel → notifications (to the regulator and to affected individuals if required) → remediation → post-incident review. The page shows **notification clocks** (for example 72 hours under GDPR where applicable; confirm DPDP timelines with counsel) counting from the moment the platform becomes aware, with owners and reminders.
- **Communications:** templates for regulator notices and user notices, drafted by compliance and legal, reviewed by security, with a send log. Messages state what happened, what data, what we're doing and what people can do.
- **Evidence:** links to the security incident record, timelines, logs and decisions; evidence bundles are immutable.
- **Lessons learned:** tasks and changes created from reviews, tracked to completion.
- **Staff misuse cases:** handled with HR and security, linked to the audit log, and reported to affected parties where required.

## B.8 Requests tab (regulators and law enforcement)
- **Intake:** every request from a regulator, court, police or other authority is registered by compliance (support forwards and acknowledges only). Fields: authority, legal basis, reference, scope, received date, due date, status, owner, counsel involved.
- **Validation:** verify authenticity (official channels, signatures), confirm jurisdiction and legal basis with counsel, and narrow the scope to what is lawful and necessary.
- **Fulfillment:** evidence is collected through approved exports, with **minimal disclosure**, redaction of other people's data, approvals (compliance and legal), and a record of exactly what was disclosed. Users are notified where the law allows and the request doesn't prohibit it.
- **Register and transparency:** counts by type and outcome feed the periodic transparency report.
- **Grievance officer and complaints:** a register of complaints received about data handling and platform decisions, with acknowledgment and resolution times against the required deadlines (confirm exact requirements with counsel) and outcomes.

## B.9 Vendors and transfers tab
- **Vendor register:** vendor, service, data categories and volumes, region, sub-processors, contracts (data-processing terms, security addendum), certifications, last assessment, renewal, risk tier, owner, exit plan. Vendors include payment providers, KYC and screening providers, email and SMS, video, speech-to-text, AI providers, cloud, analytics tools, e-signature, background checks.
- **AI and model providers:** retention terms, "no training on customer data" commitments, region of processing, subprocessor list, and incident history (link to AI Quality's provider oversight).
- **Cross-border transfers register:** destination, mechanism (for example standard clauses or approved adequacy where applicable), risk assessment, review date.
- **Vendor change notices:** upcoming sub-processor or term changes with notice periods, and tasks to notify affected customers where contracts require it.
- **Assessment schedule:** security and privacy reviews with findings and remediation.

## B.10 Consent and notices tab
- **Notices:** current versions of the terms, privacy notice and role-specific notices, effective dates, languages, acceptance rates (aggregate), and users pending acceptance where re-acceptance is required.
- **Consent catalog:** each consent (practice score sharing, talent pool, discoverability, recording, delivery analysis, background checks, anonymous statistics contribution, marketing preferences), its purpose, default, wording version, where captured, and how withdrawal works; counts of active consents and withdrawals (aggregate).
- **Downstream effects:** how a withdrawal propagates (stops sharing, removes from talent pool), with checks that systems honor it (sampling tests).
- **Cookie and tracking disclosures:** the admin console and public site store only what is declared; scans report undeclared trackers.

## B.11 Risk and DPIAs tab
- **Risk register:** privacy, security, AI, financial, safety and regulatory risks with owner, likelihood and impact (qualitative), controls, residual risk, review date, and linked incidents.
- **DPIAs and assessments:** data protection impact assessments for high-risk processing (AI scoring, interview recordings, investor KYC, background checks, matching), with status, findings, mitigations and sign-off; transfer impact and legitimate interest assessments.
- **Change triggers:** new features, new data types, new vendors or new automated decision-making require an assessment before launch.

## B.12 Policies and training tab
- **Policy library (internal):** security, acceptable use, data handling, incident response, retention, access control, vendor management, AI use, moderation, with owners, versions, review dates and acknowledgments by staff.
- **Training compliance:** required courses (privacy, security, child safety awareness, fraud and KYC basics, support security, wellbeing) by role, completion rates and overdue counts (aggregate; individual status is in Staff).
- **Attestations:** periodic attestations by managers and system owners (access reviews done, data maps current).

## B.13 Reports and exports tab
- **Standard reports:** regulator-ready packages generated from live data: data-rights performance, records of processing, retention schedule and job evidence, incident register extracts, vendor and transfer registers, consent and notice summaries, access review results, audit log summaries, KYC and AML activity summaries (counts), moderation and appeals transparency data (counts), and AI governance summaries.
- **Evidence workspaces for auditors:** time-boxed, read-only spaces with selected evidence sets (policies, screenshots, control tests, audit extracts), watermarking, per-auditor accounts with two-factor, access logs and automatic expiry.
- **Control mapping:** controls linked to frameworks the company pursues (for example ISO 27001 or SOC 2 mappings and data-protection requirements), with test results, owners and evidence links.
- **Export rules:** exports need compliance approval and re-authentication, are watermarked with requester and purpose, contain the minimum data needed, are logged with checksums, and expire.

## B.14 Calendar tab
Deadlines and recurring tasks with owners and status: data rights response dates, breach notification clocks, regulatory filings, KYC re-verification waves, vendor reviews, DPIA reviews, policy reviews, access reviews, retention job reviews, transparency reports, training cycles, certification audits. Items sync to owners' calendars and escalate when overdue.

## B.15 Data contract (examples)
```json
{
  "incident": {
    "id": "INC-2026-014",
    "type": "personal_data_breach",
    "severity": "notifiable",
    "awareAt": "2026-11-02T09:40:00+05:30",
    "clocks": [{ "name": "regulator_notice", "dueAt": "2026-11-05T09:40:00+05:30", "status": "met" }],
    "affected": { "estimatedSubjects": 340, "categories": ["contact_details"] },
    "decisions": [{ "by": "dpo", "decision": "notify_regulator", "at": "2026-11-02T15:10:00+05:30" }]
  }
}
```
Endpoints: `GET /api/compliance/overview`, `/processing-activities`, `/retention-jobs`, `/legal-holds`, `/incidents`, `/requests`, `/vendors`, `/consents`, `/risks`, `/calendar`; writes require compliance roles, reasons and, for holds, notifications and dual control to lift; report generation runs as background jobs returning a signed, expiring link.

## B.16 States
- **Obligation overdue:** error chip, owner and supervisor notified, escalation after 24 hours.
- **Clock running on an incident:** persistent banner with time left.
- **Unregistered personal data found:** coverage check opens a task and blocks the related launch checklist.
- **Vendor terms expired:** vendor flagged; new data flows to that vendor are blocked by policy until resolved.
- **Hold conflicts with a deletion request:** shown on the request and the hold; response guidance links.
- **Report generation failed:** inline **Retry** with the failing source named.
- **Loading error:** inline **Retry**.

---

# Part C. Platform Audit Log: `/audit`

## C.1 Purpose
The platform-wide, append-only record of who did what, to which record, when, and why: every sensitive access, admin action, configuration change, security event and system job. It lets the company investigate incidents, answer regulators, prove controls work, and detect misuse, including misuse by staff.

## C.2 What is logged (event catalog)
| Category | Examples (each with actor, time, target ID, reason, outcome) |
|---|---|
| **Admin action** | Claim, release, decision (verification, moderation, appeals, disputes), escalation, message sent, status change request |
| **Sensitive access** | Open of a user or organization record with purpose, reveal of a masked field, document view in a verification case, search touching personal fields (hashed query), export of any kind |
| **Security** | Staff sign-in, failed sign-in, two-factor change, role grant, elevated access, break-glass use, session revocation, API key creation, user account security actions |
| **Configuration** | Policy and rule changes, content publish and rollback, template and rubric releases, matching and plan changes, threshold changes, feature flags |
| **Money** | Batch preparation, approval, execution, refund decisions, adjustments, price changes, payee changes, exports |
| **Moderation and verification** | Actions on accounts and content, appeals outcomes, overrides |
| **Data rights** | Request lifecycle events, identity verification, deletion and export job steps, refusals, extensions, legal holds |
| **System** | Scheduled jobs, deployments, migrations, provider webhooks (signature failures), data pipeline runs, backups, log shipping health |
| **Product-side events (summarized)** | User-level security events (new device, password change) as events with IDs and no content; the product's own user-facing audit logs (investor, employer, mentor) are separate and are referenced here by ID |

The catalog is documented and versioned. **Every admin page must emit its events** as defined; a coverage monitor compares expected event types with received ones and alerts on gaps.

## C.3 Entry format (all entries)
Immutable record with: unique ID, timestamp (server, UTC with IST display), actor (staff ID, service account, or system), actor role and permission used, session ID (shortened), source (page and API route), action, target type and ID, case or request ID (if any), purpose or reason code, outcome (`Success`, `Blocked`, `Failed`), summary text, **before and after values for changes** (sensitive fields masked or hashed), request ID, client region and device type (not raw IP in the viewer; raw network data kept by security with restricted access), approval IDs, and a **hash chain** link to the previous entry.
Personal data inside entries is minimized: IDs and masked values only, never message contents, documents, credentials or secrets.

## C.4 Layout
Header with title, the note "Entries can't be edited or deleted," an **Integrity** chip (`Verified` as of the last check), and **Export** (approval flow). Tabs: **Explorer** · **Sensitive access** · **Admin actions** · **Configuration and releases** · **Security** · **Alerts** · **Integrity and coverage** · **Export requests** · **Audit of the audit**.

## C.5 Explorer tab
- **Search and filters:** time range (default last 24 hours; up to 13 months online, older from archive), actor, role, category, action, target ID, case ID, outcome, page, text in summary; saved views (for example "Reveals by non-support staff").
- **Table:** time, actor, category chip, action, target, purpose or case, outcome, source, integrity icon. Row click opens a **detail drawer** with the full entry, before and after diff (masked), linked entries (same session, same case, approvals), and **Copy entry ID**.
- **Performance:** indexed searches, paging with a hard cap per query; large result sets require narrowing or an export request.
- **Pivot helpers:** "Everything this staff member did in this session," "Everything done on this record," "Everything under this case ID." Each pivot is itself logged.

## C.6 Sensitive access tab
Focused views over high-risk events: record opens by purpose, masked-field reveals, searches with personal field hits, document views, exports, downloads. Shows **volumes by actor and role over time** (counts, with outlier highlighting), reveal-to-case link rate (share with a case ID), repeated opens without cases, and off-hours access. These are **review aids for security and compliance**, not performance metrics; the page says "Patterns here are prompts to look, not conclusions."

## C.7 Admin actions and configuration tabs
- **Admin actions:** decisions across verification, moderation, appeals, disputes, support actions and money, filterable by outcome and approver, with links to the case pages.
- **Configuration and releases:** policy, rubric, template, matching, plan and price changes with versions, approvers, rollout stages and rollback events. A **timeline view** overlays these on platform metrics (for example, after a rubric release) to help diagnose changes in behavior.

## C.8 Security tab
Staff authentication events, failed sign-ins and lockouts, role and permission changes, elevated and break-glass use, hardware key enrollments, session revocations, API key and service account activity, and admin console access from new locations or devices. Links to Staff and Admin Roles for each person.

## C.9 Alerts tab
- **Detection rules** (managed by the security administrator with dual control): examples:
  - Many reveals by one person in a short time
  - Record opens without case links above a threshold
  - Access to records of people the staff member declared a conflict with
  - Privilege escalation or break-glass use
  - Configuration changes outside change windows
  - Attempts to access audit data, or failed attempts to alter it
  - Bulk exports or large result pulls
  - Disabled or failing log sources
  - Off-hours activity from unusual locations
- **Alert list:** ID, rule, severity, entities (IDs), time, status (`New`, `Reviewing`, `Benign`, `Escalated`, `Closed`), owner, notes. Reviewers record a neutral outcome; escalations go to HR, compliance or security incident handling as appropriate.
- **Tuning:** alert precision and false-positive notes feed rule changes. Alerts describe actions, not accusations, and aren't used for performance ranking.
- **Notifications:** high-severity alerts page the on-call security administrator; text includes IDs and rule names only.

## C.10 Integrity and coverage tab
- **Tamper evidence:** each entry links to the previous by hash; periodic **anchors** (signed checkpoints) are stored in a separate system; a verification job re-computes the chain and reports `Verified` or `Gap detected` with the affected range. Anchors can also be sent to an external timestamping or notary service.
- **Storage:** write-once storage (immutable retention), separate from the app's database, with separate credentials; application roles can append but not update or delete.
- **Time integrity:** NTP monitoring, drift alerts, and use of server-side time only.
- **Coverage monitor:** per source (admin pages, services, jobs), expected vs received event counts, latency, schema validation failures and dropped events, with alerts. A source with a gap shows `Incomplete` and creates a task.
- **Forwarding:** entries are also forwarded to the security monitoring platform (SIEM) with acknowledgments; delivery failures are retried and alerted.
- **Retention and archive:** online for 13 months (default), archived immutably for the legally required or policy period (set with counsel); legal holds extend retention.
- **Disaster recovery:** backups of the log store tested regularly; restore tests logged.

## C.11 Export requests tab
- **Request:** a requester (compliance, security, or approved by them for HR or legal matters) specifies scope (time range, actors, targets, categories), purpose, case or matter ID, format and recipients. The system estimates size and shows which fields will be masked.
- **Approval:** compliance officer plus a second approver (security administrator or super admin) for exports that include sensitive access details or concern a named staff member; hardware-key confirmation; HR and legal involvement for staff investigations.
- **Delivery:** watermarked, encrypted file or a read-only expiring workspace; password or access code delivered separately; downloads logged; auto-expiry (default 7 days).
- **Regulator and court requests:** exports are prepared with legal counsel's review and recorded in the Compliance requests register.
- **External auditors:** only through evidence workspaces (B.13), not file exports.

## C.12 Audit of the audit tab
Every access to the audit log (views, searches, exports, rule changes, alert actions) is itself an audit entry in a **separate, restricted log**, readable only by compliance and the head of security, and reviewed quarterly by someone outside the security administrator team (for example internal audit or an external reviewer). The tab shows counts and notable events, with **no ability** for the people being reviewed to see their own review.

## C.13 Data contract
`GET /api/audit/entries?from=&to=&actor=&category=&action=&target=&case=&outcome=&cursor=`
```json
{
  "items": [
    {
      "id": "aud_01JD7M4Z9V",
      "at": "2026-11-07T14:12:09Z",
      "actor": { "id": "stf_14", "role": "support_agent", "permission": "reveal_masked" },
      "category": "sensitive_access",
      "action": "reveal",
      "target": { "type": "user", "id": "usr_8f21c", "field": "email" },
      "caseId": "TCK-2026-048213",
      "reason": "verify_requester",
      "outcome": "success",
      "source": { "app": "admin", "route": "/users/:userId" },
      "prevHash": "…",
      "hash": "…"
    }
  ],
  "nextCursor": "…",
  "integrity": { "verifiedThrough": "2026-11-07T14:00:00Z", "status": "verified" }
}
```
Writes happen only through the audit service's append API, called by other services with signed service identities. There is no update or delete endpoint. Queries are rate-limited, cost-limited and themselves logged; exports use the approval flow.

## C.14 States
- **Gap detected:** top banner for security and compliance, an incident is opened automatically, and affected ranges are marked unverified.
- **Source silent:** coverage monitor alerts and shows the last event time.
- **Search too broad:** prompts to narrow; results are capped.
- **Access denied:** shows which role is needed and offers **Request access** (time-boxed, with purpose and approval).
- **Archive retrieval:** older ranges are restored asynchronously with a progress indicator and notification.
- **Loading error:** inline **Retry**.

---

# Part D. Cross-cutting design

## D.1 Relationship between the three pages
Analytics reads aggregates built from product events and operational data; Compliance reads the data inventory, request systems and vendor records and writes holds and incident decisions; Audit receives events from every page including these two. Changes to analytics definitions, published insights, retention schedules, legal holds, exports and rule changes are all audit events.

## D.2 Privacy by design for this area
Aggregation and suppression for analytics; pseudonymous events; no raw personal data in dashboards or alerts; purpose-bound access; separate restricted stores for the audit log and the identity mapping; no use of protected characteristics; staff misuse detection based on actions, handled through HR and security processes.

## D.3 Transparency outputs
- **Public transparency report (periodic, as counsel advises):** counts of reports, actions, appeals, requests from authorities, data-rights requests and outcomes, with definitions.
- **User-facing explanations:** "How results are ordered" and "How scoring works" pages are generated from approved definitions; published insights carry their sources and sample sizes.

---

# Part E. Accessibility, performance and operations

- **Accessibility:** WCAG 2.1 AA in light and dark themes; keyboard-only operation of filters, tables and approval flows; every chart has a text summary and table view; status by text and icon as well as color; large tables are real tables with headers; focus ring visible.
- **Performance:** dashboards load under 2 seconds (p75) from pre-aggregated tables; audit search under 3 seconds for typical filters using indexed fields; exports and reports run as background jobs with progress; no query can scan unbounded ranges.
- **Reliability:** the audit service is highly available with a local buffer so admin actions don't lose entries if the store is briefly unreachable; sensitive actions fail closed if their audit entry can't be written. Analytics pipelines are idempotent and replayable.
- **Observability:** monitoring of pipelines, freshness, audit write latency and failures, hash-chain verification, alert volumes; no personal data in logs.
- **Environments:** staging uses synthetic data only, with a STAGING strip; production audit storage is separate from staging.
- **Telemetry (internal, aggregate):** dashboard usage, metric certification coverage, alert review times. Not used to rank people.

---

# Part F. Security, privacy and audit controls (for this area)

- **Admin app controls (subdomain):** single sign-on, mandatory two-factor (hardware key for exports and rule changes), 15-minute idle lock, 8-hour absolute session, host-scoped `Secure`, `HttpOnly`, `SameSite=Strict` cookies, strict CSP, no indexing, optional VPN or IP allowlist, server-side permission checks on every request, separate deployment and secrets from the public app.
- **Immutability and separation:** the audit store is write-once, separate from application databases, administered by a different team than the people whose actions it records; no single person can alter or disable logging; logging configuration changes require two approvers and are themselves logged.
- **Least privilege:** analysts can't reach raw events or the audit log; compliance and security access is purpose-bound; auditors get time-boxed workspaces; exports are approved and watermarked.
- **Data minimization:** analytics suppression and rounding; audit entries with masked values; compliance records hold references rather than copies of personal data wherever possible.
- **Retention:** analytics events short-lived, aggregates longer; audit and compliance evidence retained per legal requirements and policy; legal holds override deletion.
- **Regulatory:** confirm with counsel retention periods, breach notification clocks and content, regulator and law-enforcement request procedures, anonymization standards, transfer mechanisms, securities-rule review of investor features, and record-keeping obligations for KYC and AML.

---

# Part G. Acceptance criteria and QA checklist

**Analytics**
- [ ] Every metric on a dashboard maps to a registry entry with an owner and version; provisional metrics are labeled and excluded from leadership summaries.
- [ ] Groups under the minimum size are suppressed on the server, including complementary suppression; no individual rows or top-N organization lists exist.
- [ ] Opt-outs, deletions and consent withdrawals are reflected in analytics within the documented time; protected characteristics are never collected or inferred.
- [ ] Published insights pass re-identification tests (small cells, difference attacks, outlier dominance) before release and withdraw automatically when the opt-in pool falls below the minimum.
- [ ] Freshness and completeness labels are accurate; pipeline delays mark affected cards `Incomplete`.
- [ ] Exports contain aggregates only, need re-authentication, and leadership or external exports go through review.
- [ ] The marketplace health tab shows both sides with transparent ratios and suppressed small cells.

**Compliance**
- [ ] The posture board's numbers come from source systems (Data Rights, retention jobs, vendors, incidents) and link to evidence.
- [ ] A new data field, vendor or feature can't pass its launch checklist without a processing record, and a DPIA where required; the coverage check finds unregistered fields.
- [ ] Retention jobs run on schedule, report failures and counts, and verification sampling confirms deletion.
- [ ] Legal holds block deletion, show on affected records, need a second approver to lift, and appear in data-rights responses.
- [ ] Breach workflow shows notification clocks from awareness, requires counsel decisions and keeps immutable evidence.
- [ ] Authority requests are logged, validated, minimally disclosed and recorded; support never discloses directly.
- [ ] Vendors with expired terms block new data flows; transfers have a recorded mechanism; sub-processor change notices create tasks.
- [ ] Reports are generated from live data, watermarked, approved and logged; auditor workspaces are time-boxed and read-only.

**Audit log**
- [ ] Entries can't be updated or deleted by anyone; the append API is the only write path; sensitive actions fail closed if logging fails.
- [ ] Hash-chain verification runs regularly, anchors are stored separately, and gaps raise an incident.
- [ ] The coverage monitor detects missing events from any admin page or service.
- [ ] Every admin page emits its cataloged events with purpose or case, outcome and masked before and after values; no message content, documents or credentials appear in entries.
- [ ] Alert rules for mass reveals, no-case opens, conflict access, escalation, off-hours and failed tamper attempts work and page the on-call security administrator.
- [ ] Exports need two approvers for sensitive scopes, hardware-key confirmation, watermarks, expiry and logging; access to the audit log is itself logged in a separate restricted log.
- [ ] Retention, archive and legal-hold behavior match the configured policy; archive retrieval works.

**Security, accessibility and performance**
- [ ] SSO and two-factor are mandatory; idle lock and session limits work; permissions are enforced on the server for every request.
- [ ] Keyboard-only use covers filters, tables and approvals; AA contrast in both themes; charts have text and table views.
- [ ] Performance targets in Part E are met; unbounded queries are impossible.

---

# Part H. Build order (suggested)

1. **Admin foundation:** subdomain, SSO, two-factor with hardware keys, internal roles with server-side checks, secrets vault.
2. **Audit service first:** append-only API with signed service identities, write-once storage, hash chain and anchors, event catalog and schemas, coverage monitor, SIEM forwarding. Every other admin page integrates with it from day one.
3. **Audit Log page:** explorer, sensitive access views, alerts, integrity and coverage, export workflow, audit-of-the-audit.
4. **Event taxonomy, metric registry and the analytics warehouse** with pseudonymous events, consent and deletion handling, suppression and rounding enforced in the query layer.
5. **Platform Analytics:** Overview, Startups and Mentors (your proposal says to launch with startups and mentors first), then Jobs, Investors, AI features, Marketplace health, Retention and Revenue, then data quality.
6. **Compliance foundations before launch:** processing records and data map, retention schedule and job monitor, legal holds, consent and notices, data-rights reporting (from the Support and Data Rights spec), incident register and breach clocks, vendor register.
7. **Published insights workflow** with re-identification tests (before benchmarks or market insights go to users), then risk register, DPIAs, policy and training tabs, calendar.
8. Regulator and law-enforcement request register, reports and evidence workspaces, control mapping for certifications.
9. Accessibility, performance and security review against the checklist, then a staged rollout (compliance and security first, analysts next).

**Suggested first release:** the audit service and Audit Log page, the metric registry with the Overview, Startups and Mentors analytics, and the compliance foundations (processing records, retention jobs, legal holds, incidents, vendors, data-rights reporting). Add Jobs, Investors and AI analytics as those products go live, and release published peer benchmarks and market insights only after the re-identification checks and opt-in minimums are in place. Data-protection duties start the day you hold personal data, so the audit trail and compliance records should exist before the first real users.

**Reminder for the build:** the subdomain is an isolation layer, not an access control. Keep mandatory two-factor, server-side permission checks, append-only tamper-evident logging that fails closed, aggregate-only analytics with suppression enforced on the server, purpose-bound and approved access to sensitive audit data, legal holds that block deletion, and breach clocks that start at awareness. No page here may show individual-level analytics or personal content. Get legal advice on data-protection and breach rules, retention, authority requests, anonymization standards, KYC and AML record keeping, and securities-rule review before launch.
