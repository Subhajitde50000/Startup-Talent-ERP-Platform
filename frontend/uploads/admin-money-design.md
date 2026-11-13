# Admin Money Design (production spec)

**App:** Platform admin console on its own subdomain (for example `admin.yourdomain.com`). Routes below are relative to that subdomain.
**Users:** finance analysts and finance managers (approvers), compliance officers, support and fraud (limited), and super admins.

These three pages run the platform's money: what it earns, what it sells and what each plan allows, and how money moves out to people (mentor payouts, refunds, credit notes). They are the other end of every billing page in the public product: startup, investor, employer and job seeker **Billing and Plan**, the mentor **Earnings and Payouts** and **Agreements**, the **Disputes** and refund paths in Support and Trust, and the entitlements that cap features in every role. Your proposal's revenue model drives them: startup subscriptions, mentor session commissions, investor memberships, an optional success fee on rounds (subject to legal review), employer job postings (per-post or subscription, featured listings), candidate premium (AI interview packs, premium resume features) and partnerships (banks, incubators, colleges).

| # | Page | Route | Purpose |
|---|---|---|---|
| 1 | Revenue and Billing Overview | `/billing` | Revenue, payments health, failures and dunning, reconciliation, tax and invoices, month-end close |
| 2 | Plans, Pricing and Entitlements | `/plans` | Catalog of plans, packs and add-ons per role, price books, promotions, limits enforced by the product |
| 3 | Payouts, Refunds and Credit Notes | `/payouts` | Mentor payouts, payee checks, refunds, credit notes, chargebacks, holds, tax documents, ledger |

> **Subdomain note.** The admin console is a separate app, so there is no per-route role-based file. Section 3 gives a short **who sees what** table (internal roles) because it decides what each page shows. Section 12 lists the controls the subdomain still needs (single sign-on, mandatory two-factor, server-side permission checks, maker-checker approvals, audit), because a separate address doesn't protect anything on its own.

> **Legal, tax and financial-controls reminder.** Money features have the strictest legal and fraud exposure on the platform. Get legal and tax advice before launch on: GST invoicing and credit notes, TDS and TCS on payouts, whether holding and disbursing mentor payments requires a licensed payment partner, escrow or nodal-account arrangements (for example under Indian payment aggregator rules), whether a success fee changes the platform's regulatory position (broker or adviser), recurring-payment and consumer-protection rules, refund rules, record retention, and sanctions and anti-money-laundering duties for payees. The platform doesn't hold or move investment funds between investors and startups; those flow outside the platform.

---

## 1. Design principles

- **Every rupee is traceable:** a double-entry ledger sits under everything. Any number on these pages can be traced to ledger entries and from there to a payment, invoice, session or refund.
- **Maker-checker everywhere money leaves:** one person prepares, a different person approves. No one can approve their own work, and large amounts need two approvers.
- **Fail safe:** when data is missing, a provider is down or numbers don't reconcile, the system holds and alerts. It never guesses or pays out on uncertain data.
- **Idempotent and reversible where possible:** every money action carries an idempotency key; payouts and refunds are batched with previews; mistakes are fixed by new, visible entries (credit notes, adjustments), never by editing history.
- **Protect users from surprises:** price changes carry notice, existing paid periods are honored, and the free basics promised in the product (core job search and apply, starter AI practice, one resume, candidates never charged to apply) can't be removed by configuration.
- **Fairness in pricing:** prices, discounts, limits and eligibility never depend on personal characteristics. Rules are explainable and applied consistently.
- **Minimum data:** staff see amounts and masked payment identifiers, not card numbers or full bank details. Card data never touches this console.
- **Everything is auditable:** every view of sensitive financial data, approval, change and export writes to the append-only audit log.

---

## 2. Design tokens and shared look

Same tokens as the Admin Dashboard (ink, ivory, one gold accent, light and dark themes; `Fraunces` and `Inter`; IST timestamps with a visible time zone; 8px grid; 12px cards; 10px controls). Amounts use tabular figures, ₹ with Indian grouping by default (for example ₹12,34,567), and always show currency and tax treatment. Negative values show a minus sign and the word in screen readers ("minus").

### Shared chips

| Group | Chips |
|---|---|
| **Payment status** | `Succeeded` (success tint), `Pending` (warning tint), `Failed` (error tint), `Refunded` (stone), `Partially refunded` (stone outline), `Disputed` (error outline), `Reversed` (stone) |
| **Payout status** | `Scheduled` (stone), `Pending approval` (warning tint), `Approved` (gold-tint), `Processing` (ink outline), `Paid` (success tint), `Failed` (error tint), `On hold` (warning outline), `Cancelled` (stone outline) |
| **Refund status** | `Requested`, `In review` (ink outline), `Approved`, `Processing`, `Completed` (success tint), `Declined` (error tint) |
| **Reconciliation** | `Matched` (success tint), `Unmatched` (warning tint), `Mismatch` (error tint), `Pending settlement` (stone) |
| **Plan status** | `Draft`, `In review`, `Scheduled`, `Live`, `Grandfathered`, `Sunset`, `Retired` |
| **Approval** | `Awaiting you`, `Awaiting {name}`, `Approved`, `Rejected`, `Expired` |
| **Risk** | `Low`, `Medium`, `High` (payee or transaction risk) |
| **Source role** | `Startup`, `Mentor`, `Investor`, `Job seeker`, `Employer`, `Partner` |

### Shared components
- **Money card:** label, big serif amount, change chip versus the previous period (arrow plus text), sparkline, and a source chip (`Ledger`, `Provider`, `Estimated`). Estimates are always labeled.
- **Ledger link:** any amount can open a **ledger drawer** showing the entries behind it (account, debit, credit, reference IDs, time), read-only.
- **Approval bar:** shows the request, the maker, required approvers, thresholds, current status, and **Approve** or **Reject** (with reason) for permitted people who aren't the maker. Hardware-key confirmation is required for approving payouts, refunds above the threshold and price changes.
- **Preview and impact panel:** before any action, a plain summary ("This batch pays 112 mentors a total of ₹8,42,300 on 10 Nov. 3 are held. TDS to deduct: ₹84,230.").
- **Reconciliation strip:** shows whether the last provider settlement matches the ledger.
- **Timeline:** every event on a record with actor and time.

### Keyboard shortcuts
`g` then `b`, `p`, `r` go to Billing, Plans, Payouts · `/` search by ID · `j` / `k` move in lists · `a` approve (opens confirmation) · `x` reject · `?` shortcuts. Disabled while typing.

---

## 3. Internal roles and what they see (content scoping)

| Internal role | Money access |
|---|---|
| Finance analyst | Prepares: runs reports, prepares payout batches, drafts refunds and plan changes, reconciles; sees amounts and masked payment identifiers; can't approve own work |
| Finance manager (approver) | Approves payouts, refunds above the analyst threshold, plan and price changes, manual adjustments; sees everything in this area; can't approve what they prepared |
| Second approver (finance director or super admin) | Needed above the second threshold and for sensitive changes (bank details, commission changes, large write-offs) |
| Compliance officer | Read-only plus holds and tax and regulatory exports; can place payee holds (sanctions or AML) |
| Fraud analyst | Can propose holds on payments, payouts and instruments linked to fraud cases (finance confirms); read-only otherwise |
| Support agent | Sees refund and payout *status* for a ticket (no amounts beyond what the user sees, no payment identifiers); can request a refund review |
| Analyst | Aggregated revenue and usage only (no per-user rows, groups under 10 merged) |
| Super admin | Everything, with dual control on sensitive changes; configuration of thresholds |
| Others | No access |

The server enforces this on every request, including maker-checker, thresholds and conflicts (a staff member with a conflict, for example a payee who is a relative, can't touch that record).

---

# Part A. Revenue and Billing Overview: `/billing`

## A.1 Purpose
One finance view of how the business is performing and whether money is flowing correctly: revenue by stream, payment health, failures and dunning, reconciliation with payment providers, taxes and invoices, and a month-end close checklist.

## A.2 Layout
```
┌──────────────────────────────────────────────────────────────┐
│ Title "Revenue and billing"   [Range] [Compare] [Export]     │
├──────────────────────────────────────────────────────────────┤
│ Alerts strip (failed settlements, anomalies, provider issues)│
├──────────────────────────────────────────────────────────────┤
│ Tabs: Overview · Subscriptions and packs · Payments and      │
│ failures · Dunning · Reconciliation · Taxes and invoices ·   │
│ Close and exports                                            │
├──────────────────────────────────────────────────────────────┤
│ KPI row                                                      │
├───────────────────────────────┬──────────────────────────────┤
│ Charts                        │ Side: Needs attention         │
└───────────────────────────────┴──────────────────────────────┘
```
Global controls: date range (Today, 7 days, This month, This quarter, This financial year starting April, Custom), compare (previous period, same period last year), currency display, **Export** (CSV with re-authentication; PDF reports), and **Last updated** with **Refresh**.

## A.3 Overview tab

### KPI row (finance roles; analysts see aggregated, rounded values)
| Card | Example |
|---|---|
| Revenue (period) | ₹42.8L, ▲ 9% |
| Recurring revenue (MRR) | ₹18.4L |
| Payment success rate | 97.6% |
| Failed payments (open) | 112 (₹6.1L) |
| Refunds (period) | ₹1.3L (0.8% of revenue) |
| Credits outstanding | ₹9.7L (unused packs and credits, a liability) |

### Charts (ink for main series, gold for current period, stone-400 for comparison; direct labels; **View as table**)
- **Revenue by stream:** stacked bars: startup subscriptions, investor memberships, employer plans and packs, featured listings and invitation packs, candidate premium (packs and plans), mentor commissions, partnerships, other. Sums reconcile to the ledger.
- **Recurring revenue movement:** new, expansion, contraction, churned (waterfall).
- **Payment outcomes:** success, failed, pending, by method (card, UPI, net banking, invoice billing) and by provider.
- **Refunds and chargebacks:** amount and rate over time with reasons (aggregate).
- **Credits outstanding and expiry:** by role and expiry month.
- **Geography and tax:** revenue by state with GST collected.
Each chart has a headline sentence ("Payment success dipped to 94% on 3 Nov, mostly UPI timeouts") and a **Why?** drill into the underlying ledger and provider data.

### Needs attention (side)
Prioritized items with owners: settlement mismatches, provider outages, unusual refund volume, a spike in failed payments for one provider or method, duplicate charge detections, invoices failing to generate, dunning stuck, unreconciled payouts, upcoming tax filing dates, month-end close tasks overdue.

## A.4 Subscriptions and packs tab
- **Subscribers by plan and role:** counts and revenue; trials, trial conversion rate, upgrades and downgrades, cancellation reasons (aggregate), pause usage.
- **Packs and add-ons:** sales volume, redemption rate (credits used), expiry loss, refunds per pack type. Job post packs consumed only on publish, so the table shows purchased vs consumed vs expired.
- **Cohorts:** retention by signup month and role; payback for paid acquisition (if marketing data is connected).
- **Concentration:** top customers share of revenue (organization IDs, finance only), contract and renewal dates for enterprise and partner deals.
- **Entitlement exceptions:** accounts with manual overrides, with owner, reason and expiry (see Part B).

## A.5 Payments and failures tab
- **Payments list:** time, payment ID (mono), role, organization or user ID (masked), item (plan, pack, add-on, session fee), amount, tax, provider, method, status, failure code, linked invoice. Filters by provider, method, status, failure reason, amount range, date; saved views.
- **Failure analysis:** failure codes by provider and method with plain-language meaning ("UPI collect request expired"), trend, and affected amount. Provider health indicator and latest incident.
- **Duplicate charge detector:** same payer, amount and item within a short window; flagged for review with **Refund duplicate** (starts a refund request).
- **Provider switch controls (super admin and finance manager):** route traffic between providers or disable a method during an outage (with approvals and audit). Always shows the effect on users ("UPI disabled; users see other methods").
- **Payment detail drawer:** summary, ledger entries, provider references (masked), timeline, linked invoice and customer ticket, and **Request refund** (opens Part C workflow).

## A.6 Dunning tab (failed recurring payments)
- **Policy summary:** retry schedule (for example day 1, 3, 5, 7), grace period (default 7 days, aligned with the product's notices), and what pauses after the grace period (new job posts, saved-search limits and so on; data is never deleted).
- **Queue:** accounts in dunning with amount, stage, last attempt, failure reason, and next action. **Send reminder** (templated; limited), **Pause dunning** (with reason), **Extend grace** (finance manager, within limits).
- **Outcomes:** recovered revenue, involuntary churn rate, recovery by method.
- **Customer communications:** templates are managed in Content; the page shows the sequence and sends logged.
- **Fairness rule:** dunning never differs by personal characteristics, only by plan, amount and payment status.

## A.7 Reconciliation tab
- **Provider settlements:** each provider's settlement files or API reports, matched to ledger entries. Status per settlement (`Matched`, `Unmatched items`, `Mismatch`), amounts, fees, taxes on fees, expected vs received dates.
- **Exceptions list:** unmatched payments, missing settlements, amount differences, timing differences, refunds not in settlement, chargebacks, with suggested matches and **Resolve** actions (create adjustment entry with reason, mark as timing difference, contact provider). Resolutions need maker-checker above a threshold.
- **Daily close status:** a banner shows whether yesterday's settlement matches, and blocks month-end close until exceptions are cleared or explained.
- **Provider fees:** tracked as expenses with tax on fees.

## A.8 Taxes and invoices tab
- **Tax summary:** GST collected by rate and state, tax on provider fees, TDS deducted on payouts, TDS certificates issued, TCS if applicable; export for filing (GSTR-ready tables and TDS return support, confirming formats with your tax adviser).
- **Invoices:** list by number, date, customer ID (masked), amount, tax, status, PDF link; **Failed to generate** queue; **Regenerate** (creates a new version, never edits); invoice numbering sequences with gap detection (gaps must be explained).
- **Credit notes:** issued against invoices (see Part C), with reason and tax treatment.
- **Customer tax details:** counts of customers with valid GSTIN, validation failures, and a queue for correction requests (changes create new invoices or credit notes, never edits).
- **Compliance calendar:** filing and payment dates with owners and status.

## A.9 Close and exports tab
- **Month-end close checklist:** reconciliation complete, failed payments reviewed, unapplied cash cleared, refunds and credit notes posted, deferred revenue and credits recalculated, payouts accrued, tax liabilities computed, sign-off by the finance manager, lock period. Each item shows owner, status, evidence link. **Lock period** prevents back-dated entries (corrections go through reversing entries in the next period).
- **Exports to accounting tools:** journal and sales registers in standard formats (CSV and integration where supported), with a checksum and a record of who exported what. Exports need re-authentication and are logged; they contain IDs and masked identifiers, not personal contact data.
- **Revenue recognition notes:** the page documents how each stream is recognized (for example monthly subscriptions over the period, packs on consumption or expiry, commissions on session completion) as configured with your accountants; changes need approval and are versioned.

## A.10 Data contract
`GET /api/billing/overview?from=&to=&compare=` returns aggregates, never personal data:
```json
{
  "generatedAt": "2026-11-07T20:10:00+05:30",
  "currency": "INR",
  "revenue": { "total": 4280000, "byStream": [{ "key": "employer_plans", "amount": 1520000 }] },
  "mrr": 1840000,
  "payments": { "successRate": 0.976, "failedOpen": { "count": 112, "amount": 610000 } },
  "refunds": { "amount": 130000, "rate": 0.008 },
  "creditsOutstanding": 970000,
  "reconciliation": { "lastSettlement": "matched", "exceptions": 3 },
  "alerts": [{ "id": "al_41", "type": "settlement_mismatch", "severity": 2, "link": "/billing#reconciliation" }]
}
```
Amounts are integers in minor units (paise); rounding rules are documented. Analysts get rounded, aggregated values only. All figures are derived from ledger entries and provider data, and each carries its source.

## A.11 States
- **Provider outage:** banner with affected methods and the actions taken (traffic switch, method disabled); payments pending are listed.
- **Reconciliation mismatch:** banner blocks close; link to exceptions.
- **Stale data:** chip "Updated {time}" when sources lag; amounts labeled `Estimated` if provider data is missing.
- **Locked period:** edits disabled with the lock date and the reversing-entry path.
- **No data:** early-stage empty states ("No revenue yet in this range"), no placeholder numbers.
- **Loading error:** inline **Retry**.

---

# Part B. Plans, Pricing and Entitlements: `/plans`

## B.1 Purpose
The single catalog that defines what is sold, at what price, with which limits. The product reads entitlements from here for every role, so a change must be safe, previewed, approved, announced and reversible. Your proposal says prices are set after market research, so everything here is configuration, not code.

## B.2 What lives here
| Object | Meaning |
|---|---|
| **Plan** | A recurring subscription for a role (startup tiers, investor memberships, employer Growth and Scale, job seeker Plus and Pro) |
| **Pack** | A one-time purchase with credits and expiry (single job post, 3-post pack, interview sprint, resume polish) |
| **Add-on** | Optional extras (featured listing, invitation packs, extra seats, priority support) |
| **Entitlement** | A named limit or feature flag (for example `employer.activeJobs`, `jobseeker.practiceSessionsPerMonth`, `investor.dataRooms`, `startup.mentorRequests`) with a value per plan |
| **Price book** | Prices per plan, pack and add-on by currency, region and period (monthly, annual, one-time), with tax treatment |
| **Promotion** | Promo code, referral credit, trial, discount for eligible groups (students, early-stage startups, nonprofits) |
| **Commission schedule** | Mentor session commission and other platform fees (success fee only if legally approved) |
| **Contract** | Custom or enterprise terms and partner sponsorships |

## B.3 Layout
Tabs: **Catalog** · **Entitlements** · **Price books** · **Promotions** · **Commissions and fees** · **Contracts and partners** · **Changes and approvals** · **Experiments** · **Change log**. Summary strip: live plans, subscribers on grandfathered plans, pending changes, active promotions.

## B.4 Catalog tab
Cards or table by role: plan name, status chip, price (monthly and annual), included entitlements (short), subscribers, revenue share, last changed. **Compare** shows plans side by side exactly as users see them (this feeds the plan comparison tables in each role's Billing page). Plans in `Grandfathered` or `Sunset` state show how many subscribers remain and the migration plan.

### Plan editor: `/plans/:id`
- **Basics:** name, role, description, public or private (private for custom plans), visible features list (marketing text lives in Content), trial settings (length, payment method required or not, what happens at the end).
- **Entitlements:** table of limits with values, units, reset period, and behavior at the limit (`Block`, `Soft limit with prompt`, `Pause new actions`). Every entitlement has a plain-language description that the product shows.
- **Prices:** per period and currency, GST treatment (inclusive or added), minimum commitments, proration rules, upgrade and downgrade rules, cancellation rules, grace period.
- **Eligibility:** public, or by verified rule (for example student, early-stage startup, nonprofit) with the verification method. Eligibility never depends on personal characteristics beyond verifiable program membership (for example enrolled student status), and rules are shown to users.
- **Dependencies:** which other products use this plan (for example a plan that includes seats links to the Team directory limit).
- **Preview:** how the plan appears in the role's Billing page and comparison, in light and dark themes, in English and other languages.

## B.5 Entitlements tab
- **Registry:** every entitlement key, description, owner team, unit, default value, which product surfaces read it, and whether it is **protected**.
- **Protected invariants (not editable here):** a locked list that encodes promises in the product: job seekers always get free job search, applying, application tracking, one resume and a starter amount of AI practice; candidates are never charged to apply, interview or be hired; accessibility features (text mode, captions, extended time) are never paywalled; security features such as two-factor are never paywalled; data export and deletion rights are never paywalled; verification and moderation rules aren't affected by plan. Changes to protected invariants need legal and compliance approval through a separate, rare process.
- **Entitlement diff:** when a plan changes, the page shows which entitlements change, for whom, and the effect (for example "Employer Growth: active jobs 5 → 4 affects 63 subscribers, 12 currently above 4").
- **Overrides:** per-account entitlement exceptions (for support or sales), with a reason, owner, expiry (maximum 90 days unless a contract) and approval; shown to finance and in the account's billing summary.
- **Enforcement notes:** the entitlements service is the single source of truth, and products must read from it. A **conformance check** lists surfaces that still use hard-coded limits (found by tests) so they can be fixed.

## B.6 Price books tab
- **Price tables** by plan, pack and add-on, currency and region, with effective dates, tax treatment and rounding rules. Currency conversion isn't automatic: each price is set explicitly.
- **Price change workflow:** draft → impact preview → review → approval → schedule → notice → effective. Required **notice period** for recurring plans (default 30 days, or longer per law and your terms); existing subscribers keep their price until the notice period ends and the new period starts; **grandfathering** options (keep old price for N months, or forever for specific plans) with a plain explanation for users.
- **Impact preview:** number of affected subscribers, revenue effect (min and max scenarios), expected churn range (labeled as estimate with the assumptions), customer communication volume, and any accounts affected by minimum commitments or contracts.
- **Rules that block a change:** raising a price during a user's paid period; removing protected features; price differences by personal characteristics; hidden fees; changes that conflict with published terms without the required notice.
- **Approvals:** finance manager plus a second approver (finance director or super admin); legal review when terms, tax treatment or consumer notices change.
- **Notices:** the system generates the notice drafts (email, in-app, billing page banner) for the Content team to approve, schedules them, and tracks delivery.

## B.7 Promotions tab
- **Types:** promo codes, referral credits, trials, bundles, partner sponsorships (for example a college sponsoring practice packs).
- **Settings:** eligible plans and packs, discount value, duration, stacking rules, per-account and global limits, start and end, countries, eligibility checks, expiry of credits.
- **Anti-abuse:** per-device and per-payment-instrument limits, velocity checks, duplicate account detection (with the Fraud page), and automatic pause on abnormal redemption.
- **Fairness:** promotion eligibility is based on verifiable programs or transparent rules, never on inferred personal traits; displayed discounts are real (no inflated "was" prices).
- **Results (aggregate):** redemptions, revenue effect, cannibalization, refunds and abuse flags.

## B.8 Commissions and fees tab
- **Mentor session commission:** percent or fixed schedule by session type or mentor tier (if tiers exist, based on transparent rules such as verified sessions delivered, not personal characteristics), minimum payout, hold period, payout days, and the amount breakdown text shown to mentors and startups ("Session fee, platform commission, taxes, net to you").
- **Other fees:** featured listing prices, invitation packs, any pass-through fees. **Success fee on rounds (optional):** shown here as `Disabled pending legal review` by default; enabling it requires legal and compliance approval, a visible policy, and finance and super admin approvals; the page records the approval and effective date.
- **Changes** follow the same notice and approval rules as price books, and mentors get advance notice of commission changes (default 30 days).

## B.9 Contracts and partners tab
Custom and enterprise contracts: customer (organization ID), products, price and terms, limits, start and end, renewal and notice dates, owner, approval record, and links to signed documents. Partner sponsorships (colleges, incubators, banks): sponsored plans or packs, credit pools, usage reports (aggregate only), and billing terms. Contracts create **entitlement overrides** with expiry so they appear in billing summaries and expire automatically.

## B.10 Experiments tab
Pricing and packaging experiments (for example, pack sizes or trial length) with guardrails: random assignment among new, comparable visitors; never targeted by personal characteristics; no experiments that raise prices for existing subscribers; no experiments on protected invariants; clear disclosure in terms where required; automatic halt on complaint spikes or fairness findings; results in aggregate. Needs finance, compliance and product approval.

## B.11 Changes and approvals tab
A list of drafts and scheduled changes with maker, approvers, impact summary, notice dates and status; calendar view of upcoming effective dates; **Cancel** and **Rollback** (for changes not yet effective) and a **Rollback plan** for those already live (stop selling, honor prices already charged, and restore entitlements, never charging users retroactively).

## B.12 Change log
Immutable record of every catalog, entitlement, price, promotion and commission change with who, when, why, approvers, notice details and affected counts. Exportable for audit.

## B.13 Delivery to the product
- The **entitlements service** serves current limits by account with a short cache and instant purge on change. Products check entitlements on the server, not only in the UI.
- Plan and price changes take effect at the **next billing period** for existing subscribers (never mid-period unless the user chooses an upgrade).
- If the entitlements service fails, products use the **last known good** values for up to a set time and then fall back to **free tier minimums** (never lock paid users out, and never remove protected free features).

## B.14 Data contract
```json
{
  "entitlements": {
    "accountId": "org_77",
    "role": "employer",
    "plan": "growth",
    "limits": { "employer.activeJobs": 5, "employer.invitationsPerMonth": 50, "employer.seats": 8 },
    "overrides": [{ "key": "employer.activeJobs", "value": 7, "expiresAt": "2027-01-31", "approvalId": "apr_912" }],
    "periodEnd": "2026-12-01"
  }
}
```
Endpoints: `GET /api/entitlements/{accountId}`, `POST /api/plans/{id}/drafts`, `/submit`, `/approve`, `/schedule`, `/rollback`; `POST /api/price-books/{id}/changes`; `POST /api/promotions`; every write requires maker-checker, reasons and, for price changes, the notice record.

## B.15 States
- **Draft conflicts with an existing change:** warning with a merge view.
- **Notice period too short:** change can't be scheduled; the earliest allowed date is shown.
- **Entitlement removed that a product still reads:** blocked by the conformance check.
- **Protected invariant violated:** the draft is rejected with the rule explained.
- **Promotion abuse detected:** automatic pause and a Fraud task.
- **Loading error:** inline **Retry**.

---

# Part C. Payouts, Refunds and Credit Notes: `/payouts`

## C.1 Purpose
Move money out correctly: pay mentors for completed sessions, return money to users when policy says so, issue credit notes, handle chargebacks, apply holds, and keep the tax paperwork. This is the highest-risk page on the platform, so it is built around maker-checker, previews, holds and reconciliation.

## C.2 Layout
Tabs: **Payout batches** · **Payees** · **Refunds** · **Credit notes and adjustments** · **Chargebacks** · **Holds** · **Tax documents** · **Ledger**. Summary strip: next payout run, amount scheduled, pending approvals, holds, refunds waiting, chargebacks due.

### Summary strip
| Card | Example |
|---|---|
| Next payout run | 10 Nov · ₹8.4L · 112 payees |
| Awaiting approval | 3 items (warning tint) |
| Active holds | 14 (₹2.1L) |
| Refunds waiting | 9 |
| Chargeback deadlines (7 days) | 2 (error tint when near) |

## C.3 Payout batches tab

### How payouts work (defaults, configurable)
Mentor session fees are collected from startups, the platform commission is retained, and the net amount is released to the mentor after the **hold period** (default 7 days after a completed session, shortened or extended by rules), in scheduled **batches** (for example the 10th and 25th) above a minimum amount. Disputes, fraud flags, unverified payees, missing tax details or failed checks keep items out of a batch.

### Batch list
Batch ID, run date, status chip, number of payees, gross, commission, tax deducted, net, held items, created by (maker), approvers, provider reference, reconciliation state.

### Batch page: `/payouts/batches/:id`
1. **Preparation (maker):** the system builds a **proposed batch** from eligible items: completed sessions past the hold period, no open dispute, payee verified and payout method valid, tax details present. The maker can **exclude items** (with reason) but can't add items outside the rules. A **preview** shows totals, per-payee lines (masked), TDS and other deductions, held items with reasons, and risk flags.
2. **Checks (automatic):** payee verification and sanctions status, bank detail change cool-down (a recent change delays the first payout), mismatch between session records and payments, duplicates, negative balances, unusually large payouts versus history, new payee velocity. Failures move items to **Held** automatically with a reason; the batch can't proceed if a blocking check fails.
3. **Approval (checker):** a different finance person reviews the preview and checks, then approves with hardware-key confirmation. Batches above the threshold need a second approver.
4. **Execution:** a job sends instructions to the payment provider with idempotency keys, per payee, and records provider references. Execution runs only during allowed windows and can be **paused** or **cancelled** before submission. After submission, cancellation depends on the provider.
5. **Settlement tracking:** statuses update from provider webhooks (`Processing`, `Paid`, `Failed`); failures show a reason and the next action (fix bank details, retry, hold).
6. **Receipts and statements:** payees receive a statement (what was paid, commission, tax); the system generates tax documents (Part C.9).

### Batch controls
- **Run now (off-cycle):** emergency payouts for specific payees; same maker-checker with an extra reason and senior approval.
- **Retry failed items:** creates a new batch with the failed items after fixes; never re-sends a paid item (idempotency and ledger checks).
- **Reversal:** if funds were sent in error, the page starts a **recovery** workflow (request return, negative balance on the payee, clawback against future payouts) with approvals.

## C.4 Payees tab
- **List:** payee ID (mentor user ID), masked name, status (`Verified`, `Pending`, `Held`, `Blocked`), payout method type (masked, for example "Bank •••• 4417"), tax details status (PAN present and valid, tax residency), last payout, lifetime paid, balance pending, risk tier, open holds, open disputes.
- **Payee detail:** earnings summary (not session content), payout history, deductions history, documents (tax forms status only), method history (changes with dates and who, with cool-down and notifications), compliance status (sanctions, AML screening result summary), and notes.
- **Payout method changes:** payees change details in the product (with re-authentication); this page shows the change, the **cool-down** (default 72 hours before it can receive payouts), the notices sent to old and new contact points, and **Hold payouts** if a change looks suspicious.
- **Verification:** the payee's identity comes from the mentor verification case; payout setup requires matching names and verified bank account (provider penny-drop or equivalent). Mismatches stay held until a reviewer resolves them without exposing full numbers.
- **Actions:** **Hold payouts** (with reason, finance or compliance), **Release hold** (approver), **Request documents** (template), **Block payee** (compliance, with appeal path via the mentor).

## C.5 Refunds tab

### Sources
Refund requests arrive from: user requests in Billing (within policy windows), support tickets, disputes, duplicate-charge detection, failed service (for example a mentor session that didn't run), policy violations resulting in removal (non-refundable unless platform error), and chargebacks.

### Policy engine (configured with legal review)
Rules by product: packs refundable within 7 days if fewer than 2 credits used; plan charges refundable within a stated period if unused; credits restored automatically for platform errors; featured listings and job posts removed for policy violations aren't refunded; mentor session fees follow the session cancellation rules and the agreement. The engine proposes an **eligible amount and method** with the rule cited; staff can override with a reason and approval.

### Refund list and page: `/payouts/refunds/:id`
- **Request:** requester (masked), product and order, amount paid, amount used, rule applied, proposed refund amount, method (original payment method by default), tax and fee treatment.
- **Evidence:** ledger entries, usage records, session logs, disputes and tickets (IDs and read-only links).
- **Decision (maker):** approve as proposed, adjust with reason, decline with reason (with the user message template from Support), or escalate. **Checker approval** is required above a threshold, and always for overrides of the policy engine.
- **Execution:** refund to the original method via the provider; partial refunds and refund-to-credit options; a **credit note** is created for tax invoices (Part C.6); the user is notified.
- **Timelines:** target decision time (default 2 business days) and provider processing time shown to the user.

### Safeguards
- **Refund abuse detection:** repeated refunds by the same payer, payment instrument or device are flagged (to Fraud, neutrally).
- **Refund limits:** per-staff limits (for example analysts up to ₹2,000 for policy-matching duplicates; higher needs approval).
- **No cash-out loops:** refunds never go to a different instrument than the original payment without a documented exception and approval.
- **Credit liabilities:** refunding a pack with unused credits cancels the credits.

## C.6 Credit notes and adjustments tab
- **Credit notes:** issued against tax invoices when an amount is refunded or an invoice is corrected (for example wrong name or GSTIN, price error, cancelled service). Each shows the original invoice, reason, amounts, tax effect, new invoice if applicable, and the PDF. Numbering follows a separate sequence with gap detection. Credit notes can't be deleted; mistakes are fixed with a new document.
- **Adjustments (manual ledger entries):** for reconciliation differences, goodwill credits, write-offs, and corrections. Each requires a reason code, supporting evidence, maker-checker, and a second approver above a threshold. Write-offs above a limit need the finance director. Adjustments appear in the ledger and the customer's billing history with plain descriptions.
- **Goodwill credits:** limited amounts for support to apply via a request (finance approves above the limit), with abuse monitoring.

## C.7 Chargebacks tab
- **Queue:** disputes raised through card networks or UPI-style mechanisms, with provider case ID, amount, reason code, deadline for response, status.
- **Response workflow:** the system assembles an **evidence bundle** from platform records (order, usage, session logs, terms acceptance, communications that the user already received) with no personal data beyond what the provider needs; finance reviews and submits. Deadlines are prominent with reminders at 5, 3 and 1 days.
- **Outcomes:** won (funds restored), lost (ledger entry and fees), accepted early (refund). Lost chargebacks create review tasks (fraud or product issues).
- **Impact:** a chargeback places a hold on the related payout (if any) and flags the account for review.
- **Metrics (aggregate):** chargeback rate by method and product to monitor provider thresholds.

## C.8 Holds tab
- **Hold types:** dispute, fraud case, compliance or sanctions, unverified payee, bank detail change cool-down, negative balance, legal hold, provider issue.
- **List:** hold ID, type, scope (payee, payment, payout item), amount, reason, owner, created, review date, linked case.
- **Rules:** holds apply to the **specific amount or item** whenever possible, not the whole account; holds older than 14 days need supervisor review; holds are released only by an approver other than the one who placed them (except automatic cool-downs that expire).
- **Visibility to users:** payees see a plain status ("Payment on hold while we review an issue") and a support route; details of fraud or compliance reasons aren't disclosed.

## C.9 Tax documents tab
- **TDS and TCS:** deduction rules by payee type and thresholds (configured with tax advisers), deducted per payout, tracked per payee per financial year; the page shows rates applied, thresholds crossed, and any missing tax details that would raise the rate.
- **Certificates and statements:** generation and delivery of TDS certificates and annual earnings statements to payees (visible in the mentor's Earnings → Invoices and tax tab), with status per payee, regeneration with versioning and a log.
- **Returns support:** exports to prepare TDS and GST returns (formats confirmed with advisers), due dates and status.
- **Tax details register:** counts of payees with valid PAN, tax residency, GSTIN where relevant; correction queue; changes need payee evidence and are logged.
- **Invoices for commission and fees:** where the platform issues invoices for its commission or as an agent, the page shows the invoice mode (principal or agent) configured with advisers and the document types generated.

## C.10 Ledger tab
- **Chart of accounts view:** cash and provider balances, customer receivables, credits liability, deferred revenue, payable to mentors, commission revenue, tax payable (GST, TDS), refunds, chargebacks, provider fees, write-offs, suspense (unmatched).
- **Ledger explorer:** search by reference ID, filter by account, date, role, type; each entry shows debit, credit, currency, source (payment, payout, refund, adjustment), idempotency key, and who or what created it. Read-only; **no edit or delete** exists.
- **Trial balance and integrity checks:** debits equal credits; provider balances match; payable to mentors equals the sum of pending payout items; credits liability equals unused credits in the entitlements service; unusual entries flagged.
- **Period lock:** closed periods are locked; corrections use reversing entries in an open period with references.

## C.11 Approvals and thresholds (defaults, configurable by super admin with dual control)
| Action | Maker | Checker |
|---|---|---|
| Standard payout batch | Finance analyst | Finance manager |
| Batch above ₹10,00,000 or including a new payee over ₹50,000 | Finance analyst | Finance manager plus finance director |
| Off-cycle payout | Finance manager | Finance director |
| Refund within policy up to ₹10,000 | Finance analyst | Auto-approved if the policy engine matches, logged and sampled |
| Refund above ₹10,000 or any policy override | Finance analyst | Finance manager |
| Manual adjustment or write-off above ₹25,000 | Finance manager | Finance director |
| Bank details change for a payee (staff-initiated, rare) | Not allowed; payees change their own details | n/a |
| Price, commission or plan change | Finance manager | Second approver, plus legal where terms change |
| Threshold changes | Super admin | Second super admin |
Approvals use hardware-key confirmation; the maker and checker must be different people; both are recorded.

## C.12 Data contract (examples)
```json
{
  "payoutBatch": {
    "id": "PB-2026-11-10",
    "status": "pending_approval",
    "runDate": "2026-11-10",
    "totals": { "gross": 1020000, "commission": 153000, "tds": 84230, "net": 782770, "currency": "INR" },
    "payeeCount": 112,
    "held": [{ "payeeId": "usr_44", "reason": "bank_change_cooldown", "amount": 12000 }],
    "maker": "stf_8",
    "approvals": [{ "role": "finance_manager", "status": "awaiting" }],
    "checks": [{ "key": "sanctions", "result": "passed" }, { "key": "duplicates", "result": "passed" }]
  }
}
```
Endpoints: `POST /api/payouts/batches` (propose), `/batches/{id}/exclude`, `/approve`, `/execute`, `/pause`, `/cancel`; `POST /api/refunds`, `/refunds/{id}/decision`; `POST /api/credit-notes`; `POST /api/adjustments`; `POST /api/holds`, `/holds/{id}/release`; provider webhooks (signed, idempotent). Every write needs a reason, the maker-checker record, and idempotency keys; amounts are integers in minor units.

## C.13 States
- **Provider outage during execution:** batch pauses automatically; the page shows which items were submitted; recovery follows the provider's status (no blind retries).
- **Mismatch between ledger and provider:** execution is blocked until reconciled.
- **Payee data changed after approval:** affected items are pulled from the batch and need re-approval.
- **Duplicate payout detected:** blocked by idempotency and a ledger check; alert to finance.
- **Negative balance (after chargeback or reversal):** recovery plan against future payouts with the payee notified.
- **Locked period:** adjustments post in the open period with a reference.
- **Approval timeout:** requests expire after 3 days and need to be re-submitted.
- **Loading error:** inline **Retry**.

---

# Part D. Cross-cutting design

## D.1 IDs and linking
Stable IDs (`PAY-…`, `PB-…`, `REF-…`, `CN-…`, `ADJ-…`, `CB-…`, `HLD-…`, `PLN-…`). Payments link to invoices, refunds, disputes and tickets; payouts link to sessions, agreements and payees. **Related** panels show IDs, types and statuses only.

## D.2 Communications
Customer and payee messages (refund updates, payout statements, price notices, dunning reminders) use templates owned by Content, reviewed for tone and legal accuracy, translatable, and free of unnecessary personal data. Subjects never contain amounts or card details.

## D.3 Reporting (aggregate)
Monthly finance pack: revenue by stream, recurring revenue movement, payment success and failure causes, refunds and chargebacks, payouts (gross, commission, tax), credits liability, reconciliation status, plan changes and promotions, incident impact. Not used to rank individuals.

## D.4 Fairness and customer protection
- Prices, limits, discounts, dunning and refund decisions depend on product, plan, payment status and published rules only.
- Protected free features and accessibility features can't be changed here.
- Refund and payout decisions follow the policy engine with consistent outcomes; overrides need reasons and are sampled in QA.
- Users get clear notice, plain explanations and an appeal or review route through Support for any money decision.

---

# Part E. Accessibility, performance and operations

- **Accessibility:** WCAG 2.1 AA in light and dark themes; keyboard-only completion of approvals and reviews; amounts read with currency and sign; tables are real tables with row and column headers; status by text and icon as well as color.
- **Performance:** lists under 1.5 seconds (p75); the ledger explorer paginates and uses indexed filters; batch previews with thousands of lines render in under 3 seconds with virtualization; reports run as background jobs with progress.
- **Reliability:** money writes are transactional and idempotent; provider calls retried with backoff and idempotency keys; queues survive restarts; reconciliation runs daily; backups and disaster recovery exercised; feature flags per page and per provider.
- **Observability:** alerts for failed webhooks, stuck batches, reconciliation exceptions, unusual refund or payout volumes, provider error spikes, ledger integrity failures; no personal data in logs.
- **Environments:** staging uses provider sandboxes and synthetic data only, with a clear STAGING strip; production credentials live in a secrets vault and are never shown.
- **Telemetry (internal, aggregate):** approval turnaround, exception rates, dunning recovery. Not used to rank people.

---

# Part F. Security, privacy and audit

- **Admin app controls (subdomain):** single sign-on, mandatory two-factor (hardware key for approvals), 15-minute idle lock, 8-hour absolute session, host-scoped `Secure`, `HttpOnly`, `SameSite=Strict` cookies, strict CSP, no indexing, VPN or IP allowlist for finance roles, server-side permission checks on every request, separate deployment and secrets from the public app.
- **Payment security:** card data never enters this system; the platform uses the provider's hosted fields and tokens, keeping its PCI scope minimal. Bank details for payees are held by the provider or in encrypted storage with masked display; reveals need a reason and are logged.
- **Maker-checker and separation of duties:** enforced by the server: makers can't approve their own work; approvers can't change the thresholds that govern them; configuration changes need two super admins.
- **Fraud and AML controls:** payee screening, velocity limits, new-payee limits, cool-downs after detail changes, anomaly alerts on payouts and refunds, holds on suspicious activity, and escalation to compliance. Suspicious activity reporting duties are handled by compliance, and staff never tip off the subject.
- **Audit:** every view of financial detail, export, approval, execution, hold, release, adjustment, price and plan change writes an append-only entry with staff ID, time, record ID and reason. The ledger and audit log are write-once.
- **Retention:** financial records are kept for the legally required period; personal data in them is minimized and handled per data-rights decisions (financial records are typically retained).
- **Regulatory:** confirm with counsel and advisers GST and TDS rules, payment aggregator and escrow requirements for holding mentor funds, consumer notice and refund rules, success fee implications, AML and sanctions duties, cross-border payments if any, and accounting treatment (principal or agent) for each stream.

---

# Part G. Acceptance criteria and QA checklist

**Billing overview**
- [ ] Every figure is derived from ledger entries and provider data, and each links to its ledger drawer; estimates are labeled.
- [ ] Revenue by stream sums to the ledger within rounding rules; reconciliation exceptions block month-end close.
- [ ] Provider outage handling (method disable, traffic switch) needs approvals and is logged; users see an accurate fallback.
- [ ] Dunning follows the configured schedule and grace period; nothing is deleted at pause; no dunning differences by personal characteristics.
- [ ] Invoice numbering has no unexplained gaps; credit notes use their own sequence; invoices are never edited, only superseded.
- [ ] Closed periods are locked; corrections post as reversing entries.

**Plans and entitlements**
- [ ] Price and plan changes can't be scheduled without notice periods, impact preview and two approvers; existing subscribers keep their price until the notice ends and the period renews.
- [ ] Protected invariants (free job seeker basics, no charges to candidates, accessibility and security features, data rights) can't be modified through this page.
- [ ] The entitlements service is the single source of truth; products enforce limits on the server; the conformance check finds hard-coded limits.
- [ ] Failure mode serves last known good values, then free-tier minimums, never removing protected features.
- [ ] Overrides carry reasons, owners, approvals and expiry; contracts create expiring overrides.
- [ ] Promotions have anti-abuse limits and automatic pause; eligibility never uses personal characteristics.
- [ ] Success fee stays disabled until legal and compliance approval is recorded.

**Payouts, refunds and credit notes**
- [ ] A payout batch can't execute without a different approver, passing checks and hardware-key confirmation; thresholds trigger second approvers.
- [ ] Items with open disputes, fraud flags, unverified payees, missing tax details, or recent bank detail changes (cool-down) are excluded automatically with reasons.
- [ ] Execution is idempotent per payee; a paid item can't be paid twice; failures retry only through new batches after fixes.
- [ ] Refund decisions cite the policy engine; overrides need reasons and a checker; refunds go to the original method; credit notes are created for invoiced amounts.
- [ ] Chargeback deadlines are tracked with reminders; evidence bundles contain only needed data.
- [ ] Holds apply to specific amounts, need a different releaser, and old holds trigger supervisor review.
- [ ] TDS is computed and tracked per payee; certificates and statements are generated and delivered; tax detail changes are logged.
- [ ] The ledger has no edit or delete; integrity checks (debits equal credits, payable equals pending items, credits liability equals unused credits) pass daily.

**Security and privacy**
- [ ] SSO and two-factor are mandatory; hardware keys are required for approvals; idle lock and session limits work; permissions are enforced on the server for every request.
- [ ] Card data never reaches the platform; bank details are masked and reveals are logged.
- [ ] Maker-checker, separation of duties and threshold governance are enforced by the server.
- [ ] No personal data appears in logs, error reports, notifications or analytics payloads; email subjects contain no amounts or card details.

**Accessibility and performance**
- [ ] Keyboard-only approvals work; amounts are announced with currency and sign; AA contrast in both themes.
- [ ] Performance targets in Part E are met with large batches and ledgers; reports run in the background with progress.

---

# Part H. Build order (suggested)

1. **Admin foundation:** subdomain, SSO, two-factor with hardware keys for approvals, internal roles with server-side checks, append-only audit log, secrets vault, maker-checker engine and threshold configuration.
2. **Ledger and payment provider integration:** double-entry ledger, idempotent payment recording, webhooks, reconciliation jobs. Everything else sits on this.
3. **Plans, Pricing and Entitlements:** catalog, entitlements service and registry, protected invariants, price books with notice rules and impact preview. The public product's Billing pages and limits need this from launch.
4. **Revenue and Billing Overview:** payments and failures, dunning, invoices and taxes (GST), reconciliation, then close and exports.
5. **Refunds** with the policy engine, credit notes and adjustments, and **chargebacks**.
6. **Payouts:** payees and verification, hold rules, batch preparation with checks, approvals, execution and settlement tracking (your proposal says to launch with startups and mentors first, so mentor payouts are an early need).
7. **Tax documents** (TDS certificates, statements), returns support, ledger explorer and integrity checks.
8. Promotions, contracts and partners, pricing experiments, fairness and anti-abuse tooling.
9. Accessibility, performance, security and financial-controls review (including a trial run of month-end close in staging), then a staged rollout (small payout cohorts first).

**Suggested first release:** the foundation, ledger and provider integration, Plans and Entitlements (with Pay as you go and one-time packs), the Billing overview basics (payments, failures, invoices), refunds within policy, and mentor payouts in small batches with full maker-checker. Add subscriptions, advanced dunning, promotions, contracts and pricing experiments after the first employers, startups and mentors are paying. Your proposal says prices are set after market research, so keep every price, limit and commission configurable.

**Reminder for the build:** the subdomain is an isolation layer, not an access control. Keep mandatory two-factor with hardware-key approvals, server-side maker-checker, idempotent ledger-backed money movement, holds and cool-downs, reconciliation before close, protected free-feature invariants, no card data on the platform, and the append-only audit log from day one. Get legal and tax advice on GST and TDS, payment aggregator and escrow rules, refund and notice requirements, success fee implications, AML and sanctions duties, and accounting treatment before launch.
