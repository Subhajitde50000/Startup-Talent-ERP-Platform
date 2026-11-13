# Admin Operations Design (production spec)

**App:** Platform admin console on its own subdomain (for example `admin.yourdomain.com`). Routes below are relative to that subdomain.
**Users:** platform engineers and site reliability staff, the on-call rotation, the security administrator, support leads (read-only status), finance and compliance for provider and configuration changes that touch their areas, and super admins.

These three pages keep the platform running and changeable without breaking things: whether every service is healthy and what to do when it isn't, which outside providers the platform depends on and how they are wired, and the configuration (flags, limits, calendars, security and delivery settings) that changes behavior without a code deploy. They are the other end of what the rest of the console shows: the Dashboard's health table and incident banner, the Support spike alerts, the Money page's payment provider switch, the KYC, screening, video, speech-to-text and AI providers used by Verification and AI Quality, the Compliance vendor register, and the thresholds and service targets referenced in every queue.

| # | Page | Route | Purpose |
|---|---|---|---|
| 1 | System Health and Incidents | `/system` | Service health and SLOs, alerts, incidents, status page, on-call, runbooks, postmortems, maintenance, change calendar |
| 2 | Integrations and Providers | `/integrations` | Registry and health of every external provider, credentials and webhooks, failover, API clients |
| 3 | Platform Configuration | `/config` | Feature flags, limits, calendars, delivery and security settings, with versioning, approvals and rollback |

> **Subdomain note.** The admin console is a separate app, so there is no per-route role-based file. Section 3 gives a short **who sees what** table (internal roles) because it decides what each page shows. Section 12 lists the controls the subdomain still needs (single sign-on, mandatory two-factor, server-side permission checks, approvals, audit), because a separate address doesn't protect anything on its own.

> **Operational and legal reminder.** These pages can switch off features, reroute payments, rotate credentials and change limits for every user. Treat every change as production-impacting: preview, approve, stage, and be able to roll back in one click. Get legal and security advice before launch on uptime commitments and service credits in your terms, incident and breach notification duties (links to Compliance), vendor contracts and data-processing terms for each provider, data-residency promises, and what you may say publicly during incidents.

---

## 1. Design principles

- **Know first, then act:** the page that shows a problem is also the one that shows its blast radius, owner, runbook and last change, so responders don't hunt for context.
- **Calm under pressure:** clear severity, one incident commander, one source of truth, and no flashing alarms. Information density is high but ordered by what needs a decision now.
- **Everything has an owner and a runbook:** every service, provider, alert and flag names a responsible team and a documented response.
- **Degrade, don't fail:** services have defined degraded modes (read-only, queued, reduced features) so a provider outage becomes a limited experience instead of an error page. Protected user rights and safety features degrade last.
- **Change is the main risk:** configuration and provider changes follow preview, approval, staged rollout and rollback. Emergency changes are possible but visible and reviewed afterwards.
- **Secrets never appear:** credentials live in a vault. This console shows names, scopes, ages and rotation status, never values.
- **Tell users the truth, quickly:** the public status page and in-product banners are driven from the same incident record, with plain language and honest timelines.
- **Blameless learning:** postmortems focus on systems and decisions, and every serious incident ends with tracked improvements.
- **Everything is traceable:** every change, acknowledgment, runbook step, failover and flag flip writes to the append-only audit log.

---

## 2. Design tokens and shared look

Same tokens as the Admin Dashboard (ink, ivory, one gold accent, light and dark themes; `Fraunces` and `Inter`; mono for IDs, hashes and config keys; IST timestamps with a visible time zone and UTC on hover; 8px grid; 12px cards; 10px controls). Charts: ink for the main series, gold for the highlight, stone-400 for comparison; direct labels; **View as table** and a text summary on every chart.

### Shared chips

| Group | Chips |
|---|---|
| **Service status** | `Operational` (success tint), `Degraded` (warning tint), `Partial outage` (error tint), `Major outage` (error fill), `Maintenance` (info tint), `Unknown` (stone, no data) |
| **Incident severity** | `SEV1` (error fill, user-wide or data risk), `SEV2` (error tint, major feature down), `SEV3` (warning tint, limited impact), `SEV4` (stone, minor) |
| **Incident state** | `Investigating`, `Identified`, `Mitigating`, `Monitoring`, `Resolved`, `Postmortem due`, `Closed` |
| **Alert** | `Firing` (error tint), `Acknowledged` (ink outline), `Muted` (stone outline, with expiry), `Resolved` (success tint) |
| **Provider** | `Healthy`, `Degraded`, `Down`, `Failed over` (gold-tint), `Sandbox only`, `Expiring credentials` (warning tint) |
| **Config** | `Draft`, `In review`, `Scheduled`, `Staged (n%)`, `Live`, `Rolled back`, `Overridden in {env}` |
| **Risk class** | `Standard`, `Sensitive` (safety, money, privacy, security, scoring), `Protected` (not changeable here) |
| **Environment** | `Production`, `Staging` (gold strip across the console) |

### Shared components
- **Service card:** name, status chip, owner team, SLO attainment (30 days), error budget remaining, key metric (p95 latency, error rate or queue lag) with sparkline, last deploy or change, on-call link, runbook link.
- **Change card:** what changed, who, when, approvers, risk class, rollout stage, **Compare**, **Roll back**.
- **Impact panel:** plain-language blast radius ("Affects: employer job publishing, 3 live interviews, payouts batch on 10 Nov").
- **Approval bar:** maker, required approvers, thresholds, status; hardware-key confirmation for sensitive changes.
- **Timeline:** events with actor and time, with annotations from deploys, flag flips and provider incidents overlaid on charts.
- **Runbook drawer:** the step-by-step response with checkboxes recorded in the incident timeline.

### Keyboard shortcuts
`g` then `s`, `i`, `c` go to System, Integrations, Config · `/` search · `j` / `k` move in lists · `a` acknowledge · `r` open runbook · `i` declare incident (opens form) · `?` shortcuts. Disabled while typing.

---

## 3. Internal roles and what they see (content scoping)

| Internal role | Access in this area |
|---|---|
| On-call engineer and SRE | System Health and Incidents (full), acknowledge and mute alerts (time-limited), declare and run incidents, follow runbooks, flip pre-approved kill switches and degraded-mode flags, see Integrations health and fail over providers within pre-approved playbooks |
| Platform engineer | Integrations and Configuration: propose and prepare changes, staged rollouts after approval; no direct production secret access |
| Incident commander (named per incident) | Temporary authority to approve emergency changes under the emergency procedure, logged and reviewed afterwards |
| Security administrator | Integrations credentials posture (rotation, scopes), security configuration, access to security alerts, approves sensitive config |
| Finance | Read-only on payment provider health; approves payment provider switches and payout-related configuration with engineering |
| Compliance officer | Read-only on all three pages; approves changes touching data residency, retention, consent, logging and vendor terms |
| Support leads | Read-only service status, incident summaries and the status page draft preview, so replies stay accurate |
| Content and program manager | Status page and in-product banner copy (through Content workflow) during incidents |
| Super admin | Everything, with dual control on sensitive changes; can't alter logs |
| Analyst | Aggregate uptime and incident statistics only |
| Others | No access |

The server enforces this on every request. Break-glass access (Staff page) can raise permissions temporarily with post-use review.

---

# Part A. System Health and Incidents: `/system`

## A.1 Purpose
One place to see whether the platform is healthy, respond to problems, tell users what is happening and learn from each incident. It feeds the Dashboard's health table and incident banner and the public status page.

## A.2 Layout
```
┌──────────────────────────────────────────────────────────────┐
│ Title "System"  ·  overall status chip  ·  [Declare incident]│
├──────────────────────────────────────────────────────────────┤
│ Active incident banner (if any)                              │
├──────────────────────────────────────────────────────────────┤
│ Tabs: Overview · Services and SLOs · Alerts · Incidents ·    │
│ Status page · On-call and runbooks · Maintenance and changes │
│ · Journeys · Capacity and cost · Resilience                  │
├──────────────────────────────────────────────────────────────┤
│ KPI row                                                      │
├───────────────────────────────┬──────────────────────────────┤
│ Service grid / charts         │ Side: active alerts, on-call │
└───────────────────────────────┴──────────────────────────────┘
```

## A.3 Overview tab
KPI row:
| Card | Example |
|---|---|
| Overall status | Operational (or Degraded: Payments) |
| Open incidents | 0 (SEV1 and SEV2 highlighted) |
| Firing alerts | 3 (1 unacknowledged) |
| Uptime (30 days) | 99.96% (public-facing definition) |
| Error budget remaining | 62% (tightest service) |
| Next maintenance | 12 Nov · 02:00 IST · 30 min |

Below: the **service grid** (cards per service, Part A.4), a **change and incident timeline** (last 24 hours: deploys, flag flips, config changes, provider events, incidents, alerts) so correlations are visible, and **user-facing signals** (support ticket spike, error reports from the app, failed payment rate, practice session failures), shown as aggregate counts.

## A.4 Services and SLOs tab

### Service catalog
Each service entry: name, description, owner team, tier (Tier 1: sign-in, payments, job publishing, applications, interviews, offers, data rooms, data rights; Tier 2: practice trainer, resume maker, analytics, search; Tier 3: internal tools), dependencies (other services and providers), environments, repos and dashboards (links), runbooks, on-call rotation, SLOs, degraded-mode behavior, data classification, recovery targets (RTO and RPO).

### Service list
Cards or table: service, status chip, SLO attainment, error budget, availability, p95 latency, error rate, queue lag (for async systems), saturation, last deploy, active alerts, owner. Filters by tier, status, owner. Sorting by error budget or status.

### Services to include (minimum)
Web and API gateway · Authentication and sessions · Identity and roles · Notifications (in-app, email, push) · Messaging and chat · Search and recommendations · Jobs and applications · Interviews and scheduling · Offers and hires · Mentor sessions and video · Data rooms and documents (file storage, virus scanning) · Payments and billing · Payouts · Verification (provider integrations) · Practice trainer (speech-to-text, AI interviewer, feedback scoring) · Resume maker AI · Analytics pipeline · Audit service · Data rights jobs · Admin console itself.

### SLO page: `/system/services/:id`
- **SLIs and SLOs:** availability and latency targets per user journey, window (28 or 30 days), current attainment, burn rate (fast and slow), error budget policy (what happens when the budget is exhausted: freeze risky deploys, prioritize reliability work).
- **Charts:** availability, latency percentiles, error rates by route and by client type, saturation, queue lag, dependency health, deploy markers.
- **Dependencies:** upstream and downstream services and providers with live status; a **dependency graph** view showing the blast radius of a failure.
- **Degraded modes:** documented behaviors and the **kill switches** that enable them (for example "Practice trainer: text-only mode when speech-to-text is down", "Search: show recent jobs list when recommendations are down", "Messaging: queue outgoing messages", "Payments: disable UPI and show other methods"). Each mode has an owner, a preview of what users see, approvals required (pre-approved for on-call within limits), and automatic expiry reminders.
- **Recent changes and incidents** for the service, with links.

## A.5 Alerts tab
- **Alert list:** firing, acknowledged and recent alerts with service, rule, severity, started, duration, owner, linked runbook and incident. Grouped by incident or service to reduce noise.
- **Acknowledge** (records who and when), **Mute** (time-limited with reason and mandatory expiry up to 24 hours; longer needs an approver), **Escalate** (page the next level), **Create incident**.
- **Alert rules:** managed in code with a registry view here (rule, threshold, severity, routing, runbook, last fired, precision) so ownership and noise are visible. Rule changes go through review; this page links to the change request and shows the effect on paging volume.
- **Quality:** noise metrics per rule (fired vs actionable), alerts without runbooks, alerts that fire often without incidents; tasks created to fix or remove them.
- **Routing:** severity-based paging policies, quiet hours for non-urgent alerts, escalation timeouts (for example 5 minutes to acknowledge SEV1, then escalate).

## A.6 Incidents tab

### Severity definitions (shown on the page)
| Level | Meaning | Examples | Target |
|---|---|---|---|
| **SEV1** | Platform-wide or critical function down, data exposure or loss risk, safety or legal impact | Sign-in outage, payments double-charging, suspected data breach, audit service down | Respond in 5 minutes, executive notification, public comms within 30 minutes |
| **SEV2** | Major feature unavailable for many users | Job publishing failing, interview video down, offers not sending | Respond in 15 minutes, status page update within 30 minutes |
| **SEV3** | Limited or partial impact | Slow search, single provider degraded with failover working | Respond in 1 hour, update if user-facing |
| **SEV4** | Minor or internal | Cosmetic issues, internal tool glitch | Next business day |
A suspected personal data breach is always treated as at least SEV2 and linked to the Compliance incident register with its notification clock.

### Incident list
ID, title, severity, state, started, duration, services affected, commander, affected users (estimate, aggregate), customer impact summary, status page link, postmortem status. Filters by severity, state, service, date.

### Incident page: `/system/incidents/:id`
Three columns:
- **Left:** summary, severity, state, timeline of key events, roles (commander, operations lead, communications lead, scribe, security lead if needed), affected services and dependencies, linked alerts and changes.
- **Center (the working area):** **Timeline** (automatic events plus notes), **Actions** (hypotheses, actions taken with owner and status), **Chat bridge** link (the incident chat channel), **Runbook steps** with checkboxes recorded in the timeline, and **Diagnostics** (embedded charts, logs search by trace or request ID without personal data, recent deploys and flag changes).
- **Right:** **Communications** (draft and publish status page updates, in-product banner, internal updates, support macro suggestions), **Impact** (users and features, support volume), **Decisions log** (who decided what and why), and **Links** (Compliance incident if data is involved, vendor tickets).

### Declare incident (form)
Title, severity (with definitions), affected services, symptoms, discoverer, suspected cause (optional), commander (defaults to on-call), and whether to **notify** (on-call, security, compliance, leadership by severity), **open a chat channel**, and **post to the status page** (draft). The system creates the incident record, starts the timeline, pages the right roles, and opens the **Dashboard banner** when the severity requires it.

### Roles and rules
- One **incident commander** at a time; handovers are recorded. The commander can authorize **emergency changes** (Part C.9), which are logged and reviewed afterwards.
- A **communications lead** owns public wording; updates follow a cadence (for example every 30 minutes for SEV1 and SEV2, or when something changes), even if only "still investigating."
- **Security and compliance** join automatically for suspected data exposure, account takeover waves, fraud campaigns and audit or logging failures.
- Support receives a plain-language summary and macro suggestions; they don't speculate beyond the approved text.

### Resolution and postmortem
- **Resolve** requires a mitigation summary, remaining risks and a monitoring period; `Monitoring` precedes `Resolved`.
- **Postmortem** is required for SEV1 and SEV2 (and optional for others), due within 5 business days: summary, impact (users, duration, money, data), timeline, root causes and contributing factors, what went well and what didn't, decisions, and **action items** with owners and due dates. Blameless format enforced by the template. Reviewed in a meeting and published internally; a short public summary is published for major incidents (reviewed by communications and legal).
- **Follow-up tracking:** action items appear in a list with status and overdue alerts; repeated causes are flagged.
- **Learning:** incident statistics (aggregate) by cause, service and detection method (alert, user report, customer ticket), mean time to detect, acknowledge, mitigate and resolve.

## A.7 Status page tab
- **Public status page management:** components (mapped to user-facing features: Sign in, Jobs and applications, Interviews and video, Mentoring, Investor tools and data rooms, Payments, AI practice and resumes, Notifications), current status, active incidents with updates, scheduled maintenance, and history (90 days).
- **Updates:** composed from templates (Content-owned wording), preview as the public sees it, schedule or publish immediately, and notify subscribers (email, in-app). Updates must be factual, avoid speculation and include next update time.
- **Subscriptions:** counts only; unsubscribe handling; subscribers' emails live in the notification system, not shown here.
- **Automation rules:** component status changes can be linked to alerts with a human confirmation step for public publication (no fully automatic public statements for SEV1 and SEV2).
- **In-product banners:** triggered from incidents and maintenance (the Dashboard and the public product share the same banner service); language and role targeting use non-sensitive segments only.

## A.8 On-call and runbooks tab
- **On-call schedule:** primary and secondary per service group, shifts, handover notes, escalation policy (acknowledge timeouts, next level, managers), holidays, and **load balance** statistics (hours on call, pages per shift) to keep the rotation sustainable, shown in aggregate for planning rather than individual ranking.
- **Directory:** contacts reachable through the paging system (not personal numbers on this page).
- **Runbooks:** library by service, alert and scenario (provider outage, database failover, queue backlog, certificate expiry, suspected breach, payment duplicate charges, audit service failure, search index lag, AI provider outage). Each has owner, last tested, last updated, prerequisites, steps with decision points, rollback and verification, and links. **Game days:** scheduled exercises with results, gaps and fixes.
- **Search and link:** alerts and incidents suggest relevant runbooks.

## A.9 Maintenance and changes tab
- **Change calendar:** deploys, migrations, config and provider changes, certificate renewals, scheduled maintenance, with risk class, owner, approvers, and conflicts shown on one calendar. **Change freeze windows** (for example around payout runs, major hiring events, month-end close and key investor events) block risky changes unless an exception is approved.
- **Scheduled maintenance:** plan with window, impact, steps, communication schedule and rollback; creates the status page notice and in-product banner automatically after approval; reminders 7 days, 1 day and 1 hour before.
- **Deploy log:** versions, who, when, what changed (release notes link), canary and rollout status, automatic rollback events, and links to related alerts.
- **Change risk review:** high-risk changes (database migrations, auth, payments, audit pipeline, data deletion jobs) need a review by a second engineer and, where relevant, security or compliance.

## A.10 Journeys tab (synthetic monitoring)
Scripted end-to-end checks from outside the network that mimic real user journeys, run every few minutes from multiple regions: sign in, sign up and verification email, startup profile update, mentor request, job search and apply, employer publish job, interview join (video connect test), offer view, data room open with NDA (test accounts), practice session start and feedback, resume build and export, checkout (sandbox where possible), notification delivery, help and support form, admin console login. Each shows success rate, latency, last failure with a recording or trace link, and the owning team. Test accounts are labeled, isolated and excluded from analytics, and their credentials live in the vault.

## A.11 Capacity and cost tab
- **Capacity:** saturation trends (CPU, memory, database connections, queue depth, storage growth, AI request concurrency), headroom forecasts, planned load events, scaling policies and recent scaling actions.
- **Cost (aggregate):** infrastructure and provider spend by service, cost per active user, unit costs for AI features (cost per practice session, per resume), anomaly alerts for unusual spend, and budgets with owners.
- **Limits:** provider quotas and rate limits close to exhaustion (links to Integrations).

## A.12 Resilience tab
- **Backups and recovery:** last successful backup per datastore, restore test results (date, duration, outcome), RPO and RTO attainment, cross-region replication status, and the recovery runbooks. Restore tests are scheduled and failures raise tasks.
- **Disaster recovery:** failover tests, scenario exercises, and gaps.
- **Dependencies on single points of failure:** register with mitigation plans.
- **Security hygiene summary:** certificate expiries, dependency vulnerability counts by severity, patch status, secrets rotation status (links to Integrations and Security).
- **Data durability:** audit and ledger stores have their own integrity checks (links to Audit and Money).

## A.13 Data contract
```json
{
  "generatedAt": "2026-11-08T01:40:00+05:30",
  "overall": "degraded",
  "services": [
    {
      "key": "payments",
      "status": "degraded",
      "tier": 1,
      "slo": { "target": 0.999, "attainment30d": 0.9981, "budgetRemaining": 0.38 },
      "metrics": { "p95Ms": 840, "errorRate": 0.021 },
      "ownerTeam": "payments",
      "activeAlerts": 2,
      "lastChange": { "type": "deploy", "at": "2026-11-08T00:55:00+05:30" },
      "degradedMode": { "available": true, "active": false },
      "runbookUrl": "/system/runbooks/payments"
    }
  ],
  "incidents": [{ "id": "INC-2026-021", "severity": "SEV2", "state": "mitigating", "title": "Payment retries delayed", "startedAt": "2026-11-08T00:48:00+05:30", "statusPage": "published" }],
  "maintenance": []
}
```
Endpoints: `GET /api/system/overview`, `/services/{key}`, `/alerts`, `/incidents`; `POST /api/incidents`, `/incidents/{id}/updates`, `/resolve`, `/postmortem`; `POST /api/degraded-modes/{key}/enable` (pre-approved ones need only on-call; others need approval). Data comes from monitoring and tracing systems, never from user-reported counts alone. The same data feeds the Dashboard health table.

## A.14 States
- **Monitoring blind spot:** a service with no data shows `Unknown` (never green) and creates a task.
- **Monitoring system down:** banner "Monitoring is degraded" with the backup view (provider-independent health checks).
- **Active SEV1:** the console shows a persistent top banner; risky changes are frozen automatically.
- **Status page publish failed:** alert and manual publish fallback.
- **Alert storm:** grouping and a "Show root alert" suggestion; mute by incident, not by rule, so signals aren't lost.
- **On-call unacknowledged:** automatic escalation with an on-screen countdown.
- **Loading error:** inline **Retry**; the page falls back to cached last state labeled stale.

---

# Part B. Integrations and Providers: `/integrations`

## B.1 Purpose
The registry and control panel for every outside system the platform depends on or exposes: identity verification, payments, communications, AI, video and more. It shows health, ownership, contracts and data flows, manages credentials and webhooks safely, and runs failover. It ties to the Compliance vendor register (contracts and data terms) and to the Money and Verification pages that depend on specific providers.

## B.2 Layout
Tabs: **Providers** · **Health and quotas** · **Credentials and rotation** · **Webhooks and events** · **Failover and routing** · **Customer integrations (API clients and apps)** · **Costs and contracts** · **Change log**. Summary strip: providers, degraded, credentials expiring in 30 days, webhook failures (24 hours), failovers active.

## B.3 Providers tab

### Provider categories (minimum)
| Category | Examples of providers (configurable) |
|---|---|
| **Identity and verification** | KYC and liveness, business registry and tax lookups, sanctions and PEP screening, background-check providers |
| **Payments** | Card and UPI and net banking gateway(s), payout rails, penny-drop bank verification |
| **Communications** | Email delivery, SMS and push, in-app notification service |
| **Video and realtime** | Managed video (WebRTC), TURN servers, recording storage |
| **AI and speech** | Language model providers, speech-to-text, text-to-speech, translation |
| **Documents and signing** | E-signature, document conversion (PDF and DOCX), virus scanning, OCR |
| **Calendar and productivity** | Google and Microsoft calendars (OAuth), SSO identity provider for staff |
| **Infrastructure** | Cloud hosting, databases, object storage, CDN, DNS and TLS certificates, secrets vault, monitoring and tracing, error tracking, SIEM |
| **Search and analytics** | Search service, analytics warehouse, ETL |
| **Accounting and tax** | Accounting export targets, GST and TDS filing tools |
| **Support and content** | Help desk and chat tooling (if external), translation vendors |

### Provider record
Name, category, purpose, **business owner** and **technical owner**, environments (sandbox and production mappings), data categories and classification sent to the provider, regions and data residency, sub-processors, contract and data-processing terms status (linked to the Compliance vendor register), SLA and support contacts, quotas and rate limits, criticality (`Critical`, `Important`, `Optional`), fallback provider or degraded mode, dependent services, runbooks, last review date, renewal date, exit plan.

### Provider detail page: `/integrations/providers/:id`
- **Health:** status, latency, error rate by endpoint, quota usage, webhook delivery rate, incident history (provider and ours), status page link from the provider, last successful call per critical endpoint.
- **Wiring:** which services call this provider and for which user flows, request volume, timeouts, retries, **circuit breaker** settings (open and close thresholds), idempotency handling, and the data fields sent (a **data contract** view listing categories, not values).
- **Credentials:** names, scopes, created, last rotated, next rotation, last used, who can rotate (see B.5). Values are never displayed.
- **Environments:** sandbox and production endpoints, keys by environment (names only), IP allowlists, webhook URLs; a **drift check** compares expected vs actual settings.
- **Runbooks and contacts:** provider-specific incident steps and escalation contacts (role-based, not personal numbers).
- **Notes and decisions:** why the provider was chosen, alternatives, known issues.

## B.4 Health and quotas tab
Table of all providers with status, latency, error rate, quota consumption (percent), rate-limit headroom, and trend; alerts when quotas pass 70, 85 and 95 percent; forecasts for exhaustion; scheduled load events that need quota increases (for example event days or launch campaigns). Provider-wide status feeds are shown with a distinction between **provider-reported** and **measured by us** status.

## B.5 Credentials and rotation tab
- **Inventory (no values):** credential name, provider, type (API key, OAuth client, webhook secret, certificate, service account), scope, environment, owner, created, last rotated, next rotation due, last used, and status (`Healthy`, `Due soon`, `Overdue`, `Revoked`).
- **Rotation:** scheduled automatically where the provider supports it, or guided manual rotation with a runbook; the process uses the vault, dual-credential overlap, verification checks and automatic revocation of the old secret after a successful switch. Manual rotation needs two people for critical providers.
- **Access:** credentials are readable only by the services that need them via the vault; humans can't read values through this console. Emergency access follows break-glass with review.
- **Leak response:** **Revoke and rotate now** workflow (security administrator), with impact preview, linked incident, and checks for use of the old credential.
- **Certificates and domains:** TLS certificates, domain registrations, DNS records, email authentication records (SPF, DKIM, DMARC) with expiry and health.

## B.6 Webhooks and events tab
- **Inbound webhooks (from providers):** endpoint, provider, signature verification method, replay protection window, delivery rate, failures by reason, latency, and the **dead-letter queue** (events that failed processing) with counts by type and age.
- **Replay tool:** replay a failed event after the fix, with preview of effects, idempotency guarantees and approvals (finance for payments, verification lead for KYC events). Replays are logged and can't double-apply effects.
- **Outbound webhooks (to customers):** managed in Part B.8.
- **Event schemas:** versions and compatibility notes; alerts on schema drift from providers.
- **Delivery logs:** headers and metadata only; payload bodies are redacted or hashed, because they can contain personal data.

## B.7 Failover and routing tab
- **Routing tables** per capability: primary and fallback providers, health-based routing rules, manual override, weights for gradual traffic shifts.
- **Pre-approved playbooks:** for example "Switch UPI collection to provider B", "Disable video recording, keep live video", "Use text-only practice when speech-to-text is down", "Queue emails when the email provider degrades", "Switch KYC to manual review when the verification provider is down." Each playbook states effects, who can run it, approvals, automatic expiry and how to revert.
- **Payments routing (with Finance):** moving payment traffic needs finance approval and engineering; the page shows success rates by provider and method, in-flight transactions, pending settlements and reconciliation consequences; switching never moves in-flight transactions.
- **AI provider routing:** model and provider fallbacks with fairness and quality checks (a fallback model must have passed the release gates in AI Quality for that feature; if none has, the feature runs in degraded mode instead of using an untested model).
- **Failover tests:** scheduled exercises with results, last tested date and gaps.
- **Impact preview and rollback:** every routing change shows the affected journeys and has a one-click revert.

## B.8 Customer integrations tab (API clients and apps)
For integrations the platform exposes to customers (employers' calendar and e-signature connections, API keys and webhooks used by employers, partner integrations):
- **Registry of OAuth apps and API clients:** client ID, owner organization (ID), scopes, created, last used, rate limits, status, and security review for partner apps.
- **Scopes catalog:** each scope's meaning and the data it exposes; high-risk scopes (candidate data, offers, documents) require review and are rarely granted. Scopes never exceed the owner's role permissions.
- **Abuse controls:** per-client rate limits, anomaly detection (sudden export volume), automatic suspension with notice, and a **revoke** control for compliance and security (with reason and notification to the owner).
- **Webhooks to customers:** delivery rates, failures, retries, signing secrets rotation guidance, disabled endpoints after repeated failures.
- **Developer documentation and sandbox:** links and status; sandbox data is synthetic only.
- **Privacy:** customer integrations get data only under the customer's permissions and consent rules; the page can show which clients access candidate data and flag those without a data-processing agreement where required.

## B.9 Costs and contracts tab
Spend by provider and trend, unit costs, budgets, committed spend and overage warnings, contract end dates and notice windows, price change notices, alternatives under evaluation. Finance and engineering see amounts; others see ranges.

## B.10 Provider lifecycle
- **Onboarding checklist:** business need, security and privacy review (Compliance), data-processing terms, DPIA if needed, test in sandbox, load test, failover design, monitoring and alerts, runbooks, cost approval, launch approval.
- **Change management:** provider changes (new provider, endpoint change, version upgrade, settings change) need a change request with impact preview and approvals; sensitive providers (KYC, payments, AI, e-signature, background checks) need security and compliance approval.
- **Offboarding:** data deletion and return confirmation, credential revocation, DNS cleanup, contract end, and verification that no traffic or data still flows.

## B.11 Data contract
```json
{
  "provider": {
    "id": "prv_kyc_01",
    "category": "identity_verification",
    "criticality": "critical",
    "status": "healthy",
    "dataCategories": ["identity_document", "face_image"],
    "region": "IN",
    "dpaStatus": "current",
    "fallback": { "mode": "manual_review" },
    "quota": { "used": 0.62, "resetAt": "2026-12-01" },
    "credentials": [{ "name": "kyc_api_prod", "nextRotationAt": "2027-01-15", "status": "healthy" }]
  }
}
```
Endpoints: `GET /api/integrations/providers`, `/providers/{id}`, `/health`; `POST /api/integrations/routing/{capability}/override` (with approvals), `/credentials/{name}/rotate` (initiates vault workflow, returns status only), `/webhooks/{id}/replay`. No endpoint returns secret values.

## B.12 States
- **Provider down:** card shows `Down`; linked playbook and affected journeys listed; incident prompt.
- **Failed over:** `Failed over` chip with the active fallback, time left on automatic expiry, and a revert action.
- **Credentials expiring or overdue:** warning chips and tasks; overdue critical credentials page the security administrator.
- **Webhook signature failures spike:** alert (possible attack or misconfiguration).
- **Quota exhausted:** the product degrades per the documented behavior; request for increase tracked.
- **Provider terms expired or DPA missing:** new data flows blocked by policy (links to Compliance).
- **Loading error:** inline **Retry**.

---

# Part C. Platform Configuration: `/config`

## C.1 Purpose
Change platform behavior safely without a code deploy: feature flags and kill switches, service limits and thresholds, business calendars and service targets, notification delivery settings, security settings for the public product, localization settings and other typed configuration. Every setting has an owner, a schema, a risk class and a history.

## C.2 What is and isn't here
- **Here:** feature flags and rollout rules, kill switches and degraded modes (shared with System), global rate limits and abuse thresholds, business calendars and holidays, service target definitions used by queues, notification delivery configuration (sender domains, channels, send windows, rate limits), public-product security settings (password policy, session lengths, two-factor requirements, sign-in methods), localization and formatting defaults, maintenance mode, maker-checker thresholds for Money and other approval thresholds, and non-secret environment settings.
- **Elsewhere:** plans, prices and entitlements (Plans), content and copy (Content), rubrics and matching rules (Rubrics and Matching), policy rules and blocklists (Policy Rules), staff roles (Staff), secrets and credentials (vault and Integrations).
- **Protected (not changeable here, by design):** the promises encoded in code and policy: candidates are never charged to apply or be hired, core free job seeker features, accessibility features, data export and deletion rights, mandatory two-factor and logging for staff, the audit log's append-only behavior, and the maker-checker requirement for money. Flags can't disable these. Changing a protected item needs a code change, legal and compliance approval, and a separate release process.

## C.3 Layout
Tabs: **Feature flags** · **Limits and thresholds** · **Calendars and targets** · **Delivery and notifications** · **Security settings** · **Localization** · **Maintenance mode** · **Approvals and schedule** · **Drift and audit** · **Change log**. Summary strip: live flags, flags older than 90 days, pending changes, config drift items, upcoming scheduled changes.

## C.4 Config registry (applies to every tab)
Each setting is an entry with:
- **Key** (mono), description in plain language, owner team, type and **schema** (value type, allowed range, units), default, current value per environment, **risk class**, dependencies (what reads it), **blast radius** description, and last change.
- **Validation:** values are checked against the schema and cross-checked against related settings (for example a session length can't exceed the maximum set in security policy; thresholds must keep maker-checker intact).
- **Safe editing:** edits create a **draft** with a diff, impact preview and required approvers; no direct edits to live values.
- **Visibility:** values that are sensitive (for example allowlisted IP ranges) are masked; secrets can't be stored here.

## C.5 Feature flags tab
- **Flag list:** key, description, owner, type (`Release`, `Experiment`, `Kill switch`, `Degraded mode`, `Permission` rarely), state per environment, rollout (percent and targeting rules), created date, expiry or review date, linked ticket, and status chip.
- **Targeting rules (allowed attributes only):** environment, role (job seeker, startup, mentor, investor, employer), country or state, plan, account age bucket, internal staff, random percentage bucket, and named test accounts. **Never** personal characteristics (age, gender, religion, caste, nationality, marital status, health) or proxies; the server rejects such rules.
- **Rollout controls:** staged rollout (for example 1, 5, 25, 50, 100 percent) with automatic pause on error or complaint spikes, a **canary** option for staff and test accounts, and a one-click **kill** for kill switches.
- **Lifecycle:** flags have an owner and a planned removal date; flags older than 90 days appear in a cleanup list; flags with no readers (found by code scanning) are flagged for deletion.
- **Safety rules:**
  - Flags that touch safety, money, privacy, verification, scoring or matching are `Sensitive` and need the approvers named in the matrix (C.10).
  - Kill switches pre-approved for on-call are listed with their allowed use and automatic expiry reminders.
  - Disabling a feature that holds user data or user rights (for example data export) isn't allowed by flag; degraded modes must keep rights available through another path.
- **Experiments:** flags used for experiments link to the experiment record (Matching and Plans pages hold the guardrails) and can't target by personal characteristics.
- **Audit:** every flip records who, when, why and the environment; flips during incidents are tagged with the incident ID.

## C.6 Limits and thresholds tab
- **Rate limits and abuse controls (global):** sign-up and sign-in attempts, password reset, verification code attempts, search request rates, message and invitation velocity ceilings (plan entitlements set per-plan limits; these are global safety ceilings), upload sizes and types, API request limits, export limits.
- **Operational thresholds:** auto-limit triggers used by moderation (for example report counts that trigger temporary job hiding), fraud velocity thresholds, scoring review thresholds, queue aging levels for alerts, maker-checker amounts for payouts and refunds (changes need two super admins and finance director approval).
- **Resource limits:** max file sizes, attachment types, session lengths for practice, interview durations, concurrent video participants, retention knobs for non-regulated data (regulated retention lives in Compliance).
- **Each limit shows:** current value, change history, effect (for example "affects 4% of sign-in attempts"), and a **test mode** that evaluates the new value on recent traffic without enforcing it (shadow).

## C.7 Calendars and targets tab
- **Business calendar:** working days and hours in IST, Indian public holidays and company holidays by year, regional variations where relevant, change freeze periods, payout and month-end calendars. Used by SLA targets, queues, dunning, reminders and status page schedules. Holiday updates are versioned and reviewed annually.
- **Service targets:** definitions used across the console: first response and decision targets per queue (verification, moderation, reports, appeals, disputes, support, data rights internal targets), their units (business or clock time), and priority rules; changes show the effect on current breach counts.
- **Quiet hours and send windows:** defaults for notifications and reminders (users can set their own; defaults apply otherwise), with exceptions for security and safety alerts.

## C.8 Delivery and notifications tab
- **Channels:** email, in-app, push, SMS (if used), enablement per notification type and role (the copy lives in Content), digest schedules, rate limits per user per day and per type, priority rules (security and billing failures can't be batched or muted).
- **Email domains and authentication:** sender domains, SPF, DKIM and DMARC status, bounce and complaint handling thresholds, suppression list handling, unsubscribe behavior (links to compliance rules), warm-up status for new domains.
- **Templates mapping:** which template key is used for which event (read-only link to Content); a change of mapping needs the Content owner's approval.
- **Provider routing:** links to Integrations for channel providers.
- **Safety checks:** subjects and push text can't include personal data patterns, salary figures, candidate names or scores (enforced in Content and checked here at send time); a **canary send** to staff accounts before a template goes live at scale.

## C.9 Security settings tab (public product)
- **Authentication:** allowed sign-in methods (email and password, Google, Microsoft, LinkedIn), password policy (minimum length, breached-password check, rate limiting), session lengths (default 30 days, shorter for sensitive actions), idle timeouts for employer and investor sessions handling sensitive data, device trust and new-device notifications, two-factor options and recommendations (mandatory for investors with Full level and for employer Owners and Admins, as configured), recovery rules and cool-downs (links to Users page workflows).
- **Account protection:** lockout thresholds, bot protection settings, IP and device risk rules (neutral signals), and step-up verification triggers (new country with sensitive action).
- **Content security and headers:** CSP, CORS origins, cookie settings, allowed embed domains, file upload scanning policy.
- **Privacy defaults:** default visibility settings for new accounts (not discoverable, profile private), data region options, cookie consent configuration.
- **Staff console settings (admin app):** idle timeout, absolute session length, allowed IP ranges, hardware key requirement. Changes to staff console security need two super admins and the security administrator, take effect after a notice, and are logged.
- **Guardrails:** settings can't weaken protected baselines (for example mandatory two-factor for staff, session maximums, password minimums); the server rejects such changes.

## C.10 Approvals matrix (defaults, configurable by super admin with dual control)
| Change | Maker | Required approvers |
|---|---|---|
| Release flag (standard) | Engineer | One reviewer from the owning team |
| Kill switch or degraded mode (pre-approved playbook) | On-call | None (logged; reviewed afterwards) |
| Sensitive flag (money, safety, privacy, scoring, matching, verification) | Engineer | Owning team lead plus the relevant owner (finance, trust and safety, compliance, AI quality) |
| Global rate limit or abuse threshold | Engineer | Security administrator |
| Money thresholds | Finance manager | Finance director plus two super admins |
| Business calendar or service targets | Operations lead | Support or queue owner and a super admin |
| Delivery and email domain settings | Engineer | Content owner and security administrator |
| Public security settings | Engineer | Security administrator and compliance |
| Staff console security settings | Security administrator | Two super admins |
| Maintenance mode (user-facing) | On-call | Incident commander or a super admin; status page notice required |
| Config schema change | Engineer | Owning team lead and platform lead |
Makers can't approve their own changes. Approvals use hardware-key confirmation for sensitive classes.

## C.11 Approvals and schedule tab
- **Pending changes:** list with maker, summary, diff, impact preview, risk class, required approvers and status; **Approve**, **Request changes**, **Reject**.
- **Scheduling:** changes can be scheduled for a time (IST with time zone shown), outside freeze windows; the system validates conflicts with maintenance, payout runs and incident freezes.
- **Staged rollout:** supported for flags and eligible limits; promotion between stages needs a quick check of guardrail metrics (errors, latency, complaints) and either automatic promotion or manual approval depending on class.
- **Emergency changes:** an **Emergency** path (incident commander or two super admins) applies immediately with a mandatory reason and incident ID, then creates a retrospective review task within 24 hours.
- **Rollback:** one click restores the previous value (and for flags, the previous state and rollout); rollback itself is logged and visible.

## C.12 Drift and audit tab
- **Environment drift:** differences between staging and production (and between regions) for each setting, with reasons for approved differences and a list of unexplained ones.
- **Configuration drift from code:** settings overridden outside the console are detected and flagged.
- **Stale or orphan settings:** unused keys, expired flags, settings with no owner.
- **Audit views:** who changed what, when and why, with filters; links to the platform audit log.

## C.13 Maintenance mode tab
- **Modes:** `Normal`, `Read-only` (blocks writes for selected features; for example during migrations), `Feature maintenance` (specific feature off with a banner), `Full maintenance` (rare; static maintenance page with status link).
- **Rules:** protected user-rights paths (data export and deletion requests, support contact, account security recovery) stay reachable in every mode; payments in flight are completed or safely deferred; admin console remains available for staff; scheduled windows come from the change calendar.
- **Controls:** enter and exit with approvals, preview user experience, banner text (Content), automatic end time, and a check that dependent jobs (payout runs, retention jobs) are paused safely.

## C.14 Data contract
```json
{
  "setting": {
    "key": "limits.global.signin_attempts_per_hour",
    "type": "integer",
    "range": { "min": 3, "max": 30 },
    "riskClass": "sensitive",
    "value": { "production": 10, "staging": 10 },
    "version": 12,
    "owner": "identity",
    "readers": ["auth-service"],
    "draft": { "value": 8, "makerId": "stf_17", "approvals": [{ "role": "security_admin", "status": "awaiting" }], "effectiveAt": "2026-11-12T10:00:00+05:30" }
  }
}
```
The product reads configuration through a **config service** with versioned, signed snapshots, short caches, instant purge on rollback and a **last-known-good** fallback if the service is unreachable. Endpoints: `GET /api/config/settings`, `/settings/{key}`; `POST /api/config/settings/{key}/drafts`, `/submit`, `/approve`, `/schedule`, `/rollback`; flags: `POST /api/flags/{key}/rollout`. Writes require the approvals matrix; no direct writes to live values.

## C.15 States
- **Draft invalid against schema:** can't submit; errors explained.
- **Change conflicts with a freeze window:** can't schedule; shows the next allowed time or the emergency path.
- **Guardrail breach in staged rollout:** automatic pause and a suggestion to roll back.
- **Config service unreachable:** products use last known good values; a banner shows in the console; changes are disabled until recovery.
- **Protected setting edit attempt:** rejected with the explanation and the path for a code change.
- **Loading error:** inline **Retry**.

---

# Part D. Cross-cutting design

## D.1 How the pages work together
System Health shows problems and runs incidents; Integrations shows which provider is behind a problem and runs failover; Configuration holds the switches and thresholds the playbooks flip. During an incident the commander moves between them without losing context (linked records, shared timeline, one audit trail).

## D.2 Communication standards
- **Status and banners:** plain language ("Some payments are delayed. Your money is safe. We're working on it."), honest timelines, update cadence, no blame, no speculation about causes until confirmed; translated for supported languages for major incidents.
- **Customer protection during incidents:** deadlines affected by outages (offers expiring, application windows, session no-shows, payouts) are handled with extensions or fair treatment; the incident page has a **Customer impact** checklist (who might be harmed, what we will do), coordinated with Support, Billing and Trust.
- **Regulatory interplay:** incidents involving personal data, security or financial systems link to Compliance workflows and clocks.

## D.3 Reliability governance
SLOs and error budgets guide priorities; quarterly reviews of reliability, incident trends, provider performance and cost; a reliability roadmap with owners. Reports are aggregate and focus on systems, never on individuals.

---

# Part E. Accessibility, performance and operations of the console itself

- **Accessibility:** WCAG 2.1 AA in light and dark themes; keyboard-only incident handling (declare, acknowledge, update, resolve); status by text and icon as well as color; charts have text summaries and table views; live regions announce alerts politely without stealing focus.
- **Performance:** overview loads under 2 seconds (p75) from pre-aggregated telemetry; incident page updates live within 3 seconds; large tables virtualized; heavy queries run as background jobs.
- **Independence:** the System page and status page publishing don't depend on the services they monitor: separate infrastructure, a provider-independent health check path, and an offline-capable incident checklist for on-call.
- **Availability target:** 99.95% for the System page and incident tooling (higher than most services), with a documented fallback (chat-based incident process and a static status page) if the console itself is down.
- **Telemetry (internal, aggregate):** incident metrics, alert noise, change failure rate, mean time to detect and resolve. Not used to rank people.

---

# Part F. Security, privacy and audit

- **Admin app controls (subdomain):** single sign-on, mandatory two-factor (hardware key for approvals and emergency actions), 15-minute idle lock, 8-hour absolute session, host-scoped `Secure`, `HttpOnly`, `SameSite=Strict` cookies, strict CSP, no indexing, optional VPN or IP allowlist, server-side permission checks on every request, separate deployment and secrets from the public app.
- **Secrets handling:** all secrets in a vault with audited, role-limited access by services only; none stored in configuration, logs or this console; automatic rotation and leak response.
- **Least privilege for changes:** people prepare changes; approvers differ from makers; production changes flow through the config and deployment systems, never by logging into hosts from this console; emergency paths are rare, logged and reviewed.
- **Data minimization:** health and incident data use IDs, counts and traces without personal data; log search tools redact personal data and block free-text search on message or document content.
- **Audit:** every acknowledgment, mute, incident action, runbook step, status update, provider override, credential rotation, flag flip, config draft, approval, schedule, rollback and maintenance mode change writes an append-only entry with staff ID, time, target and reason.
- **Resilience of the control plane:** config snapshots and flag states are backed up and signed; the product keeps running with last-known-good values if the console is unavailable.
- **Regulatory:** confirm with counsel service commitments and credits in terms, public incident communication standards, breach and incident notification duties, vendor contract and data-residency promises, and record retention for incident and change records.

---

# Part G. Acceptance criteria and QA checklist

**System health and incidents**
- [ ] A service with no data shows `Unknown`, never green; monitoring outages are detected and shown with a provider-independent fallback view.
- [ ] SLOs, error budgets and burn alerts are defined for every Tier 1 and Tier 2 service; degraded modes exist, are documented and can be enabled by pre-approved playbooks with automatic expiry reminders.
- [ ] Declaring an incident pages the right roles by severity, opens the timeline and chat, and can draft the status page and Dashboard banner; SEV1 and SEV2 freeze risky changes automatically.
- [ ] Suspected data exposure creates a linked Compliance incident with notification clocks.
- [ ] Public status updates need a human confirmation for SEV1 and SEV2; updates follow the cadence and use approved templates.
- [ ] Postmortems are required for SEV1 and SEV2, blameless, with tracked action items and overdue alerts.
- [ ] Synthetic journeys cover sign-in, apply, publish job, interview join, offers, data rooms, practice, resume, checkout and notifications; failures alert with traces.
- [ ] Backup restore tests run on schedule with recorded results; failures create tasks.
- [ ] The System page and status page publishing work when the main application is down.

**Integrations and providers**
- [ ] Every provider has owners, data categories, region, contract and data-processing status, fallback and runbook; providers with missing terms block new data flows.
- [ ] No endpoint or screen ever shows credential values; rotation uses the vault with overlap and automatic revocation; overdue critical credentials page security.
- [ ] Webhooks verify signatures, enforce replay protection, redact payloads in logs, and replays are idempotent and approved.
- [ ] Failover playbooks are pre-approved, show impact, expire automatically and are revertible in one click; payment routing never moves in-flight transactions and needs finance approval.
- [ ] A fallback AI model can be used only if it passed the feature's release gates; otherwise the feature degrades.
- [ ] Customer API clients are scoped to their owner's permissions, rate limited, monitored and revocable; high-risk scopes need review.
- [ ] Provider onboarding and offboarding checklists are enforced, including deletion confirmation.

**Platform configuration**
- [ ] Every setting has an owner, schema, risk class and blast-radius description; invalid or conflicting values can't be submitted.
- [ ] Flag targeting rejects personal characteristics and proxies; flags that touch safety, money, privacy, verification, scoring or matching need the specified approvers.
- [ ] Protected promises (no charging candidates to apply, core free features, accessibility, data rights, mandatory staff two-factor, audit append-only, maker-checker for money) can't be changed through configuration.
- [ ] Staged rollouts pause automatically on guardrail breach; rollback is one click and logged; emergency changes require an incident ID and trigger a review.
- [ ] Config changes respect freeze windows; the config service serves signed, versioned snapshots with last-known-good fallback.
- [ ] Maintenance modes keep data-rights, support and account-recovery paths reachable.
- [ ] Drift detection reports differences between environments and out-of-band changes.

**Security, accessibility and performance**
- [ ] SSO and two-factor are mandatory; hardware keys are required for approvals and emergency actions; idle lock and session limits work; permissions are enforced on the server on every request.
- [ ] No secrets or personal data appear in screens, logs, notifications or analytics payloads; log search blocks content queries.
- [ ] Every operational action is written to the append-only audit log, and sensitive actions fail closed if logging fails.
- [ ] Keyboard-only incident handling works; AA contrast in both themes; charts have text and table views.
- [ ] Performance and availability targets in Part E are met.

---

# Part H. Build order (suggested)

1. **Admin foundation:** subdomain, SSO, two-factor with hardware keys, internal roles with server-side checks, append-only audit log integration, secrets vault integration.
2. **Observability base:** metrics, tracing, logging, SLOs for Tier 1 services, alert routing and paging, synthetic journeys for the launch flows. The Dashboard health table reads from this.
3. **System Health:** service catalog, overview, alerts, incident declaration and timeline, on-call and runbooks, status page publishing, the Dashboard banner link.
4. **Config service and registry:** typed settings with schemas, versioning, signed snapshots, last-known-good fallback, flag service with targeting guardrails, approvals matrix and rollback. Every other admin page and the product read from it.
5. **Platform Configuration:** feature flags and kill switches, business calendar and service targets (queues depend on these), limits and thresholds, delivery settings, security settings.
6. **Integrations and Providers:** registry, health, credentials and rotation (vault-backed), webhooks and dead-letter handling, failover playbooks for payments, KYC, email and video.
7. **Postmortems, change calendar and freeze windows, maintenance mode,** capacity and cost views, resilience tab with restore tests.
8. **Customer integrations:** API client registry, scopes, abuse controls, outbound webhook monitoring, once employers start using integrations.
9. Game days, failover exercises, cost anomaly alerts, drift detection.
10. Accessibility, performance and security review against the checklist, then a staged rollout (on-call team first, then engineering, then support leads).

**Suggested first release:** the foundation, observability base, System Health (services, alerts, incidents, status page, runbooks), the config service with feature flags and the business calendar, and the Integrations registry with credential rotation and webhook monitoring for payments, email and verification providers. Add customer API clients, drift detection, capacity and cost views and game days as the product matures. Your proposal's launch plan (startups and mentors first) means the first providers that matter are identity, email, video, payments and the AI services behind practice and resumes.

**Reminder for the build:** the subdomain is an isolation layer, not an access control. Keep mandatory two-factor with hardware-key approvals, server-side permission checks, maker-checker on sensitive changes, secrets only in the vault, pre-approved and expiring degraded modes, protected promises that configuration can't touch, the config service's last-known-good fallback, and the append-only audit log from day one. Make sure the incident tooling and status page keep working when the product doesn't. Get legal advice on uptime commitments, incident and breach notification duties, vendor terms and data residency, and public communication during incidents before launch.
