# Admin Support and Data Rights Design (production spec)

**App:** Platform admin console on its own subdomain (for example `admin.yourdomain.com`). Routes below are relative to that subdomain.
**Users:** support agents, senior support, compliance officers (and the data protection officer, if appointed), finance and trust and safety for escalations, and super admins.

These three pages are where users get help and where their legal rights over their data are honored. They are the other end of the **Help and Support** pages in every role's shared-pages design (contact support, tickets, urgent categories, "Report a concern"), the candidate data requests that employers see in Settings, the data deletion and export options in every role's Settings, and the "Request deletion" paths in the verification and job seeker designs. Your proposal lists support and compliance with applicable data-protection law (for example India's DPDP Act, and GDPR if serving EU users) among the admin and ERP responsibilities.

| # | Page | Route | Purpose |
|---|---|---|---|
| 1 | Support Tickets | `/support` | Every ticket from every role, with categories, SLAs and priority (safety, fraud and payment first) |
| 2 | Ticket Detail | `/support/:ticketId` | The conversation, safe context about the requester, linked records, internal notes and approved actions |
| 3 | Data Rights Requests | `/data-requests` | Access, correction, deletion, portability and consent-withdrawal requests, with legal due dates |

> **Subdomain note.** The admin console is a separate app, so there is no per-route role-based file. Section 3 gives a short **who sees what** table (internal roles) because it decides what each page shows. Section 12 lists the controls the subdomain still needs (single sign-on, mandatory two-factor, server-side permission checks, masking, audit), because a separate address doesn't protect anything on its own.

> **Legal reminder.** Data rights have legal deadlines, required content and limits (retention duties, legal holds, other people's data, exemptions). Get legal advice before launch on the rules that apply to you (for example the DPDP Act and, if you serve EU users, GDPR), response times, identity verification, what you may refuse, how to handle processors and employers, grievance officer details and regulator contact. Support must never give legal, tax, immigration or financial advice to users.

---

## 1. Design principles

- **Resolve, don't deflect:** the aim is a fast, correct answer on the first reply, with clear next steps. Canned replies are starting points, not walls.
- **Safety first:** scams, safety, security, payment and legal-deadline tickets jump the queue.
- **Know who you're talking to:** account details are discussed only after the requester is verified. Staff never ask for passwords, one-time codes or full ID numbers.
- **Minimum data, maximum care:** staff see only what is needed to answer the ticket. Sensitive fields are masked, revealing needs a reason, and every reveal is logged.
- **No impersonation:** support never signs in as a user. It uses read-only **Admin view** pages and a short list of approved, logged actions.
- **Humans decide, tools assist:** suggested replies, article matches and routing are labeled suggestions. A person sends every message.
- **Rights are a process, not a favor:** data rights requests follow a fixed, auditable workflow with a clock that starts at receipt, evidence at every step, and a clear response to the requester.
- **Other people's data is protected too:** exports and deletions never expose or destroy third parties' data without a lawful basis.
- **Everything is traceable:** every view, reveal, reply, action, escalation and export is written to the audit log.

---

## 2. Design tokens and shared look

Same tokens as the Admin Dashboard (ink, ivory, one gold accent, light and dark themes; `Fraunces` and `Inter`; IST timestamps with a visible time zone; 8px grid; 12px cards; 10px controls).

### Shared chips

| Group | Chips |
|---|---|
| **Ticket status** | `New` (stone), `Open` (ink outline), `Waiting for requester` (info tint), `Waiting for team` (gold-tint, escalated), `On hold` (stone outline), `Resolved` (success tint), `Closed` (stone) |
| **Priority** | `Urgent` (error tint), `High` (warning tint), `Normal` (stone), `Low` (stone outline), plus `Priority plan` (gold-tint) for customers on priority support |
| **Requester role** | `Startup`, `Mentor`, `Investor`, `Job seeker`, `Employer`, `Visitor` (not signed in) |
| **Verified** | `Verified requester` (success, signed-in ticket), `Needs verification` (warning) |
| **SLA** | `On track`, `At risk`, `Breached`, `Paused` (waiting for requester) |
| **Data request type** | `Access`, `Correction`, `Deletion`, `Portability`, `Consent withdrawn`, `Objection or restriction`, `Account closure`, `Grievance` |
| **Data request status** | `Received`, `Verifying identity`, `In review`, `Awaiting requester`, `Executing`, `Ready to respond`, `Completed`, `Refused (with reasons)`, `Extended`, `Withdrawn`, `Overdue` |

### Shared components
- **Case header:** ID, type, requester role, priority, status, SLA and target, claim lock ("Being handled by {name}"), **Claim**, **Release**, **Escalate**.
- **Context card (safe context):** account ID, role or roles, plan, verification status, organization (where relevant), account status (active, paused, suspended), created date, last sign-in time zone and country (not IP), open cases count. Names and emails are shown masked (`P••• K••••`, `p•••@gmail.com`) until revealed with a reason.
- **Masked field:** shows masked values; **Reveal** asks for a reason (from a short list plus a note), shows the value for 60 seconds, and logs it.
- **Linked records:** IDs and statuses of the records the ticket refers to (job, application, offer, invoice, session, report, verification case), each opening a read-only **Admin view** if the staff role allows.
- **Reply composer:** rich text, macro picker, variables, attachment upload (virus scanned), language selector, spell check, **AI suggestion** button (staff-only draft, see 4.5), and a **Check before sending** panel (see 4.6).
- **Timeline:** every event on the case with actor, time and visibility (visible to requester or internal).
- **Internal note:** private to staff, with `@mention` and a "Needs response" toggle.

### Keyboard shortcuts (all three pages)
`c` claim · `r` release · `n` internal note · `e` escalate · `m` macro picker · `j` / `k` next or previous in list · `]` / `[` next or previous case · `⌘Enter` send · `?` shortcuts. Disabled while typing.

---

## 3. Internal roles and what they see (content scoping)

| Internal role | Support and data rights access |
|---|---|
| Support agent | Tickets in assigned categories; context card (masked); linked records in read-only Admin view; approved low-risk actions (4.7); data requests: **triage only** (receive, verify requester, collect missing information) |
| Senior support or supervisor | All tickets; priority and category changes; assignment and rebalancing; macros management; approved medium-risk actions with approval; abuse handling |
| Trust and safety, fraud, finance, verification staff | Receive escalated tickets in their own queues and reply as the specialist; finance handles money actions with dual control |
| Compliance officer (and data protection officer, if appointed) | Full Data Rights Requests workflow, legal holds, exemptions, response approval; read-only on tickets |
| Engineering on-call (named people) | Execute data deletion and export jobs through runbooks and tooling; no access to ticket text beyond the job parameters |
| Super admin | Everything, including macro libraries, SLA settings and request-type configuration (versioned) |
| Others | No access |

The server enforces this on every request. Staff with a conflict (a personal relationship or interest in the requester) declare it with a button; the case is reassigned and logged.

---

# Part A. Support Tickets: `/support`

## A.1 Purpose
One queue for every ticket from every role, ordered by urgency and deadline, so people in trouble are helped first and nothing sits unseen.

## A.2 Where tickets come from
- The **Contact support** form in the product (signed-in users), which attaches the role, account ID, and the selected record (job, application, offer, invoice, session and so on).
- **Report a concern** flows (these create reports in Trust and Safety and link a ticket for the reporter).
- **Email** to the support address (matched to an account if the sender's email is verified on the platform; otherwise marked `Needs verification`).
- **Public help form** for signed-out visitors (account locked out, can't sign in, general questions).
- **Chat** (if offered), **callback requests** and **priority support** channels for customers on those plans.
- **Staff-created** tickets (for example from a call or an escalation from another team).

## A.3 Layout
```
┌──────────────────────────────────────────────────────────────┐
│ Title "Support"                           [Saved views ▾]    │
├──────────────────────────────────────────────────────────────┤
│ Tabs: Queue · Mine · Waiting for requester · Escalated ·     │
│       Resolved · Spam                                        │
├──────────────────────────────────────────────────────────────┤
│ Summary strip (4 cards)                                      │
├──────────────────────────────────────────────────────────────┤
│ Toolbar: search · filters · sort · density     [Next ticket] │
├──────────────────────────────────────────────────────────────┤
│ Ticket table                                 │ Preview drawer│
└──────────────────────────────────────────────────────────────┘
```

### Summary strip
| Card | Example |
|---|---|
| Waiting | 74 |
| Urgent open | 3 (error tint when above zero) |
| At risk or breached | 6 |
| Median first response (7 days) | 2 h 40 min (aggregate) |

## A.4 Table

| Column | Content |
|---|---|
| Ticket | ID (mono), channel icon |
| Subject | Subject line (customer-written; shown as written but sensitive patterns such as card numbers or ID numbers are auto-masked) |
| Requester | Role chip and masked name; verified chip |
| Category | From the product's help topics (see A.5) |
| Priority | Chip, with `Priority plan` if applicable |
| Related | Icons for linked records (job, offer, invoice, session, report) |
| Status | Status chip |
| SLA | Chip with time remaining (paused while waiting for the requester) |
| Assigned | Agent or lock icon |
| Updated | Relative time and who replied last (requester or staff) |
| Actions | **Open**, **Claim** |

- **Default order:** priority and urgency first, then time to target, then age. Nothing else is used (no ordering by requester role, plan size or personal traits, except the **Priority plan** commitment shown in the SLA).
- **Next ticket** claims the top eligible ticket for the agent's categories and opens it.
- **Preview drawer:** subject, first message (sensitive patterns masked), category, linked records, history of previous tickets (count and categories), suggested macro (`AI suggestion` label), and **Open**.

## A.5 Categories (mapped from each role's help topics)

| Category group | Examples | Typical owner |
|---|---|---|
| **Getting started and account** | Sign-in problems, email or phone verification, two-factor reset, role switching, closing an account | Support |
| **Security** | Suspected account compromise, suspicious logins, lost two-factor device | Support (urgent) with security on-call |
| **Verification** | Status questions, document problems, appeal of rejection | Verification team (support answers status) |
| **Payments and billing** | Failed payment, invoice questions, refunds, GST or TDS documents, payouts (mentors) | Finance |
| **Product help** | How-tos for stage tools, pipelines, resumes, practice interviews, templates | Support |
| **Hiring and applications** | Pipeline issues, offers, interviews, candidate or employer questions | Support |
| **Mentor sessions and sign-offs** | Session problems, sign-off questions, agreements | Support with program team |
| **Investor data rooms and deals** | Access and NDA problems, offers and commitments records | Support with compliance for deal-record questions |
| **Interview trainer and AI** | Score review requests, wrong feedback, AI behavior (routes to AI Quality) | Support then AI Quality |
| **Safety and scams** | Fake jobs, fee requests, harassment, impersonation (also creates a Report) | Trust and safety (urgent) |
| **Privacy and data rights** | Access, correction, deletion, consent withdrawal (auto-creates a Data Rights Request) | Compliance |
| **Billing disputes** | Charge disputes (creates a Dispute) | Finance |
| **Feedback and feature requests** | Suggestions | Product (auto-reply, tagged) |
| **Other** | Anything else | Support |

The product tags tickets with a category, and agents can change it. Changing a category re-routes and keeps history.

## A.6 Priority and service targets (defaults, configurable)

| Priority | Examples | First response | Notes |
|---|---|---|---|
| **Urgent** | Scam or fraud in progress, safety concern, account takeover, payment taken wrongly, data-rights deadline within 7 days, outage affecting a live interview or offer deadline | 2 hours (clock time, 24 hours a day for security and safety) | Routes to on-call specialists; urgent safety content follows the trust and safety protocol |
| **High** | Verification blocking hiring or funding, payout missing, locked-out account with a deadline, billing error | 4 business hours | |
| **Normal** | General questions and how-tos | 1 business day | |
| **Low** | Feedback and feature requests | 3 business days (auto-acknowledged) | |
| **Priority plan** | Customers on priority support | Half the normal target for their priority level | Shown in the SLA; no change in queue fairness otherwise |

The SLA clock **pauses** while the ticket is `Waiting for requester` and resumes on reply. Business calendars use IST working hours and public holidays. Targets are configurable and versioned.

## A.7 Filters, saved views and bulk actions
- **Filters:** status, priority, category, requester role, channel, language, assigned to (me, unassigned, a person), SLA state, has linked record type, plan (including priority plan), verified or needs verification, tags, created and updated date.
- **Saved views:** "Urgent unassigned", "Payments waiting over 1 day", "Employers: verification" and team-shared views.
- **Bulk actions (limited):** assign, release, change category or priority, add tag, merge duplicates (with a preview), close as spam (supervisors, with a sample check). **Not allowed:** bulk replies without a macro review, bulk resolve of anything non-spam, bulk reveal.

## A.8 Duplicates, spam and abuse
- **Duplicate detection:** same requester and category within 24 hours, or the same text. Offers a merge that keeps one thread and notes the source tickets.
- **Spam:** classifier plus rules (links to unrelated sites, mass identical text). Moved to the Spam tab with a daily review sample; false positives are restored with an apology macro where needed.
- **Abusive requesters:** a policy for staff-directed abuse: a warning macro, then limits on the ticket thread (replies continue by form only), then escalation to trust and safety. Staff can mark a message as abusive; it stays in the record but is hidden from the default thread view. Never to be applied to people who are simply upset or stressed.
- **Threats of harm or self-harm statements:** route to the safety protocol (urgent), with a supportive reply template and resources, and never closed as spam.

## A.9 Data contract
`GET /api/support/tickets?status=&priority=&category=&assigned=&sla=&cursor=`
```json
{
  "items": [
    {
      "id": "TCK-2026-048213",
      "subject": "Payment failed twice but amount debited",
      "channel": "in_app",
      "requester": { "role": "employer", "displayName": "P••• K••••", "verified": true },
      "category": "payments_billing",
      "priority": "high",
      "priorityPlan": true,
      "status": "open",
      "sla": { "state": "at_risk", "targetAt": "2026-11-06T15:30:00+05:30", "paused": false },
      "assignedTo": null,
      "lock": null,
      "linked": [{ "kind": "invoice", "id": "inv_5531" }],
      "updatedAt": "2026-11-06T13:52:00+05:30"
    }
  ],
  "nextCursor": "..."
}
```
List responses carry IDs, masked names, categories, timestamps and SLA, never message bodies, emails, phone numbers or document names beyond the subject line (which is auto-masked for sensitive patterns).

## A.10 States
- **Empty:** "No tickets waiting."
- **Spike detected:** banner "Tickets about {topic} are rising. Check incidents." linking to System status.
- **Channel outage (email or chat):** banner with the affected channel and a fallback.
- **Backlog over target:** a supervisor banner with counts by category and **Rebalance**.
- **Stale or live updates paused:** same labels as the Dashboard.
- **Loading error:** inline **Retry**.

---

# Part B. Ticket Detail: `/support/:ticketId`

## B.1 Purpose
Answer the requester correctly and quickly, with the right context, using only safe actions, and escalate when the case belongs to someone else.

## B.2 Layout
Three columns on desktop:
- **Left (320px):** case header, context card, linked records, previous tickets, requester verification status.
- **Center (flexible):** the conversation thread, reply composer and internal notes (tabs **Conversation** · **Internal notes** · **Timeline**).
- **Right (360px):** suggested articles and macros (`AI suggestion` labeled), approved actions, escalation, and tags.
On tablet the left and right columns become drawers. Staff don't use this page on phones.

## B.3 Left column

### Requester verification
- **Signed-in ticket:** `Verified requester` (the ticket came from an authenticated session). Account details may be discussed.
- **Email or public form ticket:** `Needs verification`. The agent uses the **Verify requester** tool: it sends a one-time confirmation link or code to the verified email on the account and asks the requester to reply from the account; account details aren't discussed until verified. For account recovery, verification follows the account recovery policy (for example a verified second factor or documents), never identity guesses.
- **Never** ask for passwords, one-time codes, full ID or bank numbers, or card numbers in the thread; the composer warns if the agent types a request for them.

### Context card
Safe context as described in section 2. For multi-role accounts, tabs show each role's summary. Shows open data rights requests, open disputes and open reports linked to the account, as IDs and statuses, with a note if the account is `Suspended` or has an open fraud case ("Check with trust and safety before changing anything").

### Linked records
The records the requester selected or that the system matched (job, application, offer, invoice, practice session, mentor session, verification case, report). Each opens a **read-only Admin view** of that record if the agent's role allows, with sensitive fields masked. No editing and no impersonation.

### Previous tickets
A short list (up to 5) of earlier tickets with category and outcome, to avoid asking twice.

## B.4 Center column

### Conversation
- Messages from the requester and replies from staff, with attachments (virus scanned, view-only previews; sensitive documents are opened in a masked viewer).
- Auto-masking of sensitive patterns (card numbers, government ID numbers, passwords) in the thread display with a note "Sensitive data detected and masked." Storage follows the retention rules.
- **Translation:** on-demand translation of the requester's text (labeled `AI`); the original text stays visible, and replies can be written in English and translated with a preview, with a reminder to check important details.
- **Collision detection:** if another agent is typing or has replied since the page loaded, a banner appears and the send is held until confirmed.

### Reply composer
- **Macros:** searchable canned replies, grouped by category, with variables ({Name}, {TicketID}, {AgentFirstName}, {InvoiceNumber}, {Date}). Macros are versioned, reviewed for tone and accuracy, and carry a review date. Using a macro shows its version.
- **Tone and clarity:** plain language, short paragraphs, specific next steps and honest timelines. No jargon, no blame.
- **Attachments:** PDFs, images (up to 10 MB each); the platform adds a footer line for security ("Support never asks for your password or codes").
- **Send options:** **Send and set to waiting for requester**, **Send and resolve**, **Send and keep open**, **Save draft**. Replies on tickets with an urgent priority show a confirmation of the response time achieved.

### Internal notes
Private to staff, with `@mentions` and a "Needs response" toggle that creates a task for the mentioned person. Notes are never shown to the requester and aren't copied into exports to the requester.

### Timeline
Every event: created, claimed, replies, notes, status changes, macro used, actions taken, escalations, reveals of masked fields, SLA pauses and resumes. Each with actor and time, and whether it was visible to the requester.

## B.5 Right column

### Suggested articles and macros (`AI suggestion`)
Help articles and macros matched to the ticket by topic, with the reason ("Mentions 'payment failed' and 'debited'") and a confidence note. A suggestion can be inserted into the composer as a link or text and edited. Suggestions never send on their own.

### Approved actions (logged, role-limited)
Actions support can take without approval (low risk, reversible):
- **Resend verification email or code** (to the verified address already on the account)
- **Send a password reset email** (to the account's email; never changes the email)
- **Re-send an invoice or receipt** to the account's billing contact
- **Extend a trial by up to N days** within a set limit
- **Clear a stale notification or retry a failed notification**
- **Re-run a failed export** that the user requested (data export from Settings)
- **Mark a ticket's linked report as received** (no decision)
Actions that need approval:
- **Change an email or phone number** on an account (requires verified recovery process and a second approver)
- **Unlock a locked or suspended account** (moderation or fraud team must approve)
- **Refund, credit or payout change** (finance, with dual control above a threshold)
- **Reset two-factor** (recovery policy: verified evidence, cool-down period and notification to the existing email)
- **Role or plan changes** (only by the account owner in the product; support can guide, not change)
- **Reopen a closed verification or appeal** (verification or appeals team)
Each action opens a confirmation with the reason, shows the effect, and writes an audit entry; approvals show who approved. **Support can't** read private messages, resumes, practice recordings, data room documents, offer amounts, or candidate data, and can't impersonate.

### Escalation
**Escalate** opens a form: target team (Trust and safety, Fraud, Finance, Verification, Appeals, AI Quality, Compliance and data rights, Engineering, Product), reason, what has been done, and what is needed; the requester sees a neutral status ("We've asked a specialist team to look at this"). Escalation creates a linked internal case ID in the target's queue; the support ticket status becomes `Waiting for team` and the SLA continues. The target replies in the same thread (as a specialist) or hands back with a note.

### Tags
Free tags for trends (for example `confusing-copy`, `bug`, `scam-pattern`), feeding product feedback reports in aggregate.

## B.6 Check before sending
A panel that runs on **Send** and warns (never silently blocks) about:
- A request for passwords, codes, full ID or card numbers (blocked)
- Legal, tax, immigration or financial advice (warning: "Support doesn't give advice")
- A promise outside policy (for example a refund or a verification decision), unless the agent has the right permission
- Another person's personal data in the reply
- Discriminatory or inappropriate language
- Missing greeting or sign-off from the template (suggestion)
- Mention of internal tools or detection methods (warning)
Blocks and warnings are explained and recorded.

## B.7 Resolution, reopen and satisfaction
- **Resolve:** requires a resolution category (Answered, Fixed, Not a bug, Needs requester action, Duplicate, Out of scope, Escalated and handled) and a final message. The ticket auto-closes after 7 days if the requester doesn't reply.
- **Reopen:** the requester can reply within 14 days to reopen; after that, a reply creates a new ticket linked to the old one.
- **Satisfaction survey (optional):** a one-click rating and optional comment sent after resolution. Results are used in aggregate to improve macros, articles and processes, never to rank individual agents; agents see their own feedback for coaching only.
- **Knowledge feedback:** agents can flag an article or macro as wrong, outdated or missing, creating a task for the content team.

## B.8 Special handling
- **Urgent safety, scam or fraud:** the ticket links to a Report and opens a Moderation or Fraud case; the reply uses the safety template with immediate steps (stop contact, don't pay, keep records), and the details go to trust and safety, not into a long support thread.
- **Account compromise:** verification via the recovery process, forced sign-out of all sessions, password reset, two-factor review, and a security notice; the case links to a Fraud case if payments or data were affected.
- **Payment taken and service failed:** ticket links to the invoice and, if unresolved, to a Dispute; finance handles refunds.
- **Verification and appeals questions:** support shares status and next steps only; decisions come from the verification or appeals team.
- **Interview trainer score disputes:** direct the candidate to **Request a review** and create the linked AI Quality review; support doesn't change scores.
- **Candidate data questions:** route to the Data Rights Request flow if the person asks to access, correct, delete or withdraw consent; handle general privacy questions with approved macros.
- **Legal threats or regulator mentions:** immediately escalate to compliance; don't reply with a substantive answer until compliance guides the response (acknowledgment only).
- **Law-enforcement or court requests received by support:** never answered here. Forward to compliance (section 12.4) and send a neutral acknowledgment.
- **Distress and self-harm statements:** supportive reply template, safety resources, and urgent escalation per the protocol.
- **Press, investor or partner inquiries:** route to the right internal contact.

## B.9 States
- **Claimed by someone else:** read-only view with the holder's name and **Request release** (supervisors).
- **Lock expired:** banner with **Reclaim**; unsent draft kept locally.
- **Requester unverified:** composer limits replies to general information until verification is completed.
- **Requester reply while the agent types:** collision banner (B.4).
- **Attachment failed or blocked by scanning:** message with the reason and **Retry**; the requester is told how to resend.
- **Linked record unavailable (deleted or restricted):** neutral message and a note.
- **Offline:** drafts autosave locally; actions disabled with "You're offline."
- **Loading error:** inline **Retry**.

---

# Part C. Data Rights Requests: `/data-requests`

## C.1 Purpose
Handle every request from a person about their personal data, on time and correctly, with an auditable record: **access**, **correction**, **deletion (erasure)**, **portability**, **withdrawal of consent**, **objection or restriction**, **account closure**, and **grievances** about data handling. It also tracks candidate data requests that employers must act on. It supports the privacy commitments in every role's design (data download and deletion in Settings, consent history, retention rules, and employer duties to honor withdrawals and deletion requests).

## C.2 Request sources
- **In-product forms:** Settings → Data and privacy (all roles): **Download my data**, **Delete my data**, **Close account**, **Withdraw consent** (for example, practice score sharing), **Ask an employer to delete my data** (job seekers).
- **Support tickets** categorized as privacy and data rights (agents create a request from the ticket with one click).
- **Email or postal** requests to the privacy address (logged by compliance).
- **Authorized representatives** (for example, a legal representative for a person who can't act for themselves), with proof of authority.
- **Third-party requests** (such as a regulator forwarding a complaint) arrive through compliance and are linked.

## C.3 Layout
Header with title, a status strip, and tabs: **Active** · **Awaiting requester** · **Ready to respond** · **Overdue and at risk** · **Completed** · **Refused** · **Employer-routed**. Toolbar: search by request ID or account ID, filters (type, role, status, due date, assigned), sort (Due date, Age, Type). Right drawer for preview.

### Status strip
| Card | Example |
|---|---|
| Open requests | 27 |
| Due in 7 days | 6 (warning tint) |
| Overdue | 0 (error tint if any) |
| On-time completion (90 days) | 99.2% (aggregate) |

## C.4 Table

| Column | Content |
|---|---|
| Request | ID (mono), type chip |
| Requester | Role chip and masked name; verified status |
| Received | Date |
| **Legal due date** | Calendar date and days left (`Due in 3 days`, `Overdue by 1 day`); the clock starts at receipt (or at identity verification, if your counsel advises); extensions show both dates |
| Internal target | Half of the legal time by default |
| Status | Data request status chip |
| Scope | What the request covers (for example "All data", "Practice data", "Employer-held data") |
| Blockers | Legal hold, open payout, open offer, open dispute, employer confirmation pending |
| Assigned | Compliance owner and engineering executor |
| Actions | **Open**, **Claim** |

- **Default order:** legal due date, then severity (for example deletion for a person who reports harassment or safety concerns), then age.

## C.5 Request page: `/data-requests/:id`

### Layout
Left (320px): summary, requester, timeline of the clock, checklist. Center: tabs **Request** · **Scope and data map** · **Review** · **Execution** · **Response** · **Messages**. Right (360px): decision panel and notes.

### Stage 1: Receive and verify identity
- **Request tab:** what was asked, when and how it arrived, the requester's words, any attachments.
- **Verify identity:** requests from a signed-in session are verified automatically. Others use the **Verify requester** flow (one-time link or code to the account's verified email; extra proof only if risk requires, collecting the minimum, for example a recent sign-in confirmation rather than a government ID). Representatives provide proof of authority, which compliance reviews.
- **Clock:** a clear banner shows when the clock started, the legal due date and any extension. Pauses (for example waiting for identity verification) are allowed only where law permits and are recorded.
- **Acknowledgment** goes to the requester immediately with the reference number and the expected date.

### Stage 2: Scope and data map
- **Data map view:** a checklist of the systems that may hold the person's data, by role: account and identity, profile, resumes and versions, applications (what was shared with employers), messages, interview practice (scores, transcripts, recordings), mentor sessions and notes (the person's own), investor records (profile, pipeline, notes), offers and commitments, billing and payments, support tickets, audit logs, backups, analytics (identifiable), and sub-processor systems (email, KYC, payments, AI providers, video).
- **Automated discovery:** a job scans the registered systems by account ID and returns counts and categories per system (no content). Systems that failed to respond show `Not scanned` and block completion until resolved.
- **Role-aware scope:** the page shows the person's roles and which records belong to which role; multi-role accounts need care so the request covers the intended roles.
- **Third-party data:** items that include other people's personal data (messages, notes, shared documents, session records) are flagged for redaction rules (Stage 3).

### Stage 3: Review (compliance)
Compliance reviews each category against **rights, limits and holds**:
- **Legal holds and investigations:** records under a legal hold or active investigation can't be deleted; access may be limited. The page shows holds, owners and review dates.
- **Retention duties:** financial and tax records, signed agreements and NDAs, audit and security logs, verification decisions, moderation and fraud records, and records needed for legal claims may be kept for the required period. Each retained category shows the basis and period.
- **Other people's rights:** messages, interview notes, scorecards, mentor notes, and shared documents may contain others' data. Redaction or withholding rules apply (for example, an employer's internal scorecards about a candidate are the employer's records and are not part of the candidate's export unless law requires; the candidate's own submitted data is).
- **Employer-held data:** applicant data held by employers is the employer's responsibility as a data controller or processor, depending on your legal structure (confirm with counsel). The platform forwards candidate requests to employers (see Part D) and reports status, and handles its own copies.
- **Manifestly unfounded or excessive requests:** only compliance may decide, with a documented reason and, where applicable, notice to the requester of their right to complain to the regulator.
- **Decision per category:** `Provide`, `Provide with redactions`, `Delete`, `Anonymize`, `Retain (basis recorded)`, `Refuse (reason recorded)`. A **summary preview** shows what the requester will be told.

### Stage 4: Execution
- **Access and portability:** an automated job assembles a package: a **human-readable summary** (PDF) and **machine-readable files** (JSON or CSV) per category, with a manifest listing files and counts. Third-party data is redacted according to Stage 3. The job creates a checksum; staff **do not read the contents**, and only verify the manifest, counts and checksums and may open a masked sample if needed with a reason (logged).
- **Correction:** the requester's corrected values are applied by the owning system after review (for example fixing a name spelled wrongly); records that are historical facts (like signed documents) aren't altered, and a note is added instead. Corrections propagate to sub-processors where relevant.
- **Deletion and anonymization:** runs through a **deletion runbook** by category: delete or anonymize per the Stage 3 decisions; scheduled deletion from backups on the backup rotation, with a statement of when backup copies are overwritten; notify sub-processors and employers where they hold copies; record each step with a timestamp and operator. The page shows a **deletion status board** (per system: Pending, Done, Failed, Retained with basis).
- **Consequences preview:** before executing account closure or deletion, the system shows blockers and effects: open offers or commitments, unpaid payouts or invoices, active mentorships, live jobs, pipelines with candidates, open disputes and legal holds. The requester is told what must be resolved first, and the clock handling follows counsel's advice.
- **Consent withdrawal:** applies immediately to future processing (for example stops sharing practice scores, removes the person from a talent pool), updates consent records, and notifies affected parties where required.
- **Objection or restriction:** sets processing flags (for example, exclude from analytics and recommendations) and is applied across systems.
- **Verification of completion:** each executor attaches evidence (job ID, counts, logs). Compliance signs off before the response is sent.

### Stage 5: Response
- **Response composer:** a templated letter per request type, plain language, with what was done, what was retained and why, the dates, and the requester's further rights (including how to complain to the platform's grievance officer and to the regulator, with contact details as required by law).
- **Delivery of exports:** an encrypted package via an expiring link (for example 7 days) in the requester's signed-in account, with an email notification; if the requester isn't signed in, the link goes to the verified email and a second factor or a code sent to the account's phone is required. The decryption password or code is delivered by a **separate channel**. Download events are logged.
- **Refusals:** include the legal basis in plain terms, what the requester can do next and the complaint routes.
- **Partial completion:** allowed with a clear explanation and a date for the remainder, within the legal limits.
- **Close:** completion records the date, a summary, retained categories and the response ID.

### Messages
A private thread with the requester for clarifications (one clear question at a time), attachments, and automatic pauses and resumes of the clock only where permitted. Messages are templated and kept in the case file.

## C.6 Extensions
If the law allows extensions for complex or numerous requests, compliance can extend with a documented reason, a new due date within the allowed maximum and a notice to the requester **before** the original due date. The page shows both dates and prevents extensions after the deadline.

## C.7 Grievances
Complaints about how data is handled (not a normal request) are handled as **Grievance** requests: acknowledged, assigned to the grievance officer or the data protection officer, resolved within the legally required time (confirm with counsel), and the outcome communicated, with the option to complain to the regulator. The page shows the officer's details as configured.

---

# Part D. Employer-routed requests (tab on Data Rights Requests)

## D.1 Purpose
Job seekers can ask an employer to delete or return the data the employer holds about them (their application, notes, messages). The platform tracks those requests and the employer's response, because employers are responsible for their own copies.

## D.2 Process
1. The candidate files the request in Settings (or through support).
2. The platform delivers it to the employer's **candidate data request queue** (employer Settings → Data and privacy) with the due date, and notifies the Owner and Admins.
3. The employer reviews and acts (delete, anonymize, retain with a stated legal basis, or refuse with reasons), then confirms in the product with a short statement and the date.
4. The platform records the employer's response, informs the candidate, and keeps the evidence trail.

## D.3 Tracking and enforcement
- **Table:** request ID, candidate (masked), employer, received date, employer's due date (platform default shorter than the legal due date so the platform can still act), status (`Sent`, `Viewed`, `Acknowledged`, `Completed`, `Retained with reasons`, `Overdue`), reminders sent.
- **Reminders:** day 3, day 7 and day 10 (configurable); the Owner and Admins are notified.
- **Overdue handling:** overdue employer responses are escalated to compliance. Options: contact the employer, restrict the employer's access to the candidate's record on the platform (for example hide the application from non-essential views), and, for repeated failures, route to Trust and Safety (policy P-data-misuse) and the Employer's standing.
- **Platform copies:** regardless of the employer's response, the platform handles its own copies under Stage 3 and 4.
- **Candidate visibility:** the candidate sees status updates ("Sent to the employer", "Completed", "Retained for a legal reason") with details the employer chose to give.

---

# Part E. Cross-cutting design

## E.1 Numbering and linking
Stable IDs (`TCK-…`, `DRQ-…`). Tickets link to data requests, reports, disputes, verification cases and escalations. The **Related** panel shows IDs, types and statuses only.

## E.2 Templates and macros
Versioned, reviewed for tone and legal accuracy, translatable, with an owner and review date. Data rights letters are reviewed by counsel. Macros that give procedural instructions are tested whenever the product changes.

## E.3 Languages and accessibility for requesters
English first; tickets and data requests accepted in other languages with translation tools (labeled); plain-language replies; accessible formats on request for exports and letters; screen-reader-friendly emails; no requirement to use a phone or a particular channel.

## E.4 Quality and learning (aggregate only)
Monthly reports: first response time, resolution time, reopen rate, satisfaction, top topics, macro usage, article gaps, data-request on-time rate, extension and refusal rates. Used to improve products, articles, macros and training. **Never used to rank individual agents**; supervisors use sampled reviews for coaching and quality calibration.

## E.5 Product feedback loop
Tags and top topics feed the product team each month with counts and examples (with personal data removed).

---

# Part F. Data model and APIs (summary)

### Ticket object (simplified)
```json
{
  "id": "TCK-2026-048213",
  "channel": "in_app",
  "requester": { "accountId": "usr_123", "role": "employer", "verified": true },
  "category": "payments_billing",
  "priority": "high",
  "status": "open",
  "sla": { "targetAt": "2026-11-06T15:30:00+05:30", "state": "at_risk", "paused": false },
  "linked": [{ "kind": "invoice", "id": "inv_5531" }],
  "assignedTo": "stf_14",
  "lock": null,
  "messages": [],
  "timeline": []
}
```

### Data rights request object (simplified)
```json
{
  "id": "DRQ-2026-001208",
  "type": "deletion",
  "requester": { "accountId": "usr_901", "roles": ["jobseeker", "founder"], "verified": true },
  "receivedAt": "2026-10-28T10:15:00+05:30",
  "clock": { "startedAt": "2026-10-28T10:15:00+05:30", "legalDueAt": "2026-11-27T10:15:00+05:30", "extended": false, "pausedSeconds": 0 },
  "status": "executing",
  "scope": ["jobseeker.profile", "jobseeker.resumes", "jobseeker.practice", "founder.startup_profile"],
  "dataMap": [
    { "system": "practice", "found": true, "categories": ["transcripts", "scores"], "decision": "delete", "status": "done" },
    { "system": "billing", "found": true, "categories": ["invoices"], "decision": "retain", "basis": "tax_record", "retainUntil": "2033-03-31" }
  ],
  "blockers": [{ "kind": "legal_hold", "id": "hold_17" }],
  "employerRouted": [{ "employerId": "org_77", "status": "sent" }],
  "responseId": null
}
```

### Endpoints
- Tickets: `GET /api/support/tickets`, `GET /api/support/tickets/{id}`, `POST /api/support/tickets/{id}/claim`, `/release`, `/reply`, `/note`, `/status`, `/escalate`, `/action` (approved actions only), `/verify-requester`.
- Reveal: `POST /api/support/tickets/{id}/reveal` with reason code (returns a value once for 60 seconds, audited).
- Data rights: `GET /api/data-requests`, `GET /api/data-requests/{id}`, `POST /api/data-requests/{id}/verify`, `/scope`, `/decision`, `/execute`, `/response`, `/extend`, `/refuse`, `/messages`.
- Jobs: `POST /api/data-requests/{id}/export-job`, `/deletion-job` (idempotent, signed, runs through registered system connectors; connectors report per-system status and counts).
- Employer routing: `POST /api/data-requests/{id}/employer/{employerId}/send`, employer callbacks to confirm.
- Webhooks from email, chat and payment providers are signed and idempotent.

### Server rules
- Actions on tickets require a held lock and, where specified, an approval ID or dual control.
- Deletion jobs refuse to run when a legal hold or blocker exists, or when compliance sign-off is missing.
- Export packages are encrypted at rest and in transit, delivered through expiring, user-scoped links, with downloads logged.
- Legal due dates come from configuration by request type and jurisdiction, with extension rules; the server refuses to mark a request late-extended after the due date.
- Staff can't download export contents; only manifest and checksum views are available (masked samples with a reason).
- All writes append to the audit log; nothing here can be deleted by staff.

---

# Part G. States and error handling (common)

| State | Behavior |
|---|---|
| Ticket claimed by someone else | Read-only view with the holder's name; **Request release** (supervisors) |
| Lock expired | Banner with **Reclaim**; unsent draft kept locally |
| Requester unverified | Account details are hidden from replies; only general guidance and verification instructions |
| Duplicate ticket | Merge suggestion with a preview |
| Attachment blocked by scanning | Message with the reason; requester told how to resend |
| Linked record deleted or restricted | Neutral message; ticket continues |
| Escalation target backlogged | Banner with the target team's current wait and options |
| Data request: connector failed for a system | Execution blocked with the failing system; auto-retry with backoff; **Retry** and **Escalate to engineering** |
| Data request: legal hold appears mid-process | Execution pauses automatically; compliance notified; response drafted to explain limits |
| Data request: requester unreachable | Reminders at day 3 and day 7; the clock handling follows counsel's advice; closure after a documented final attempt |
| Data request: overdue or about to be | Error or warning chip; compliance and supervisors notified; the requester gets a delay notice where the law allows |
| Export too large | Prepared in parts with a manifest; the requester is told how to download |
| Deletion partially failed | The request can't complete; status shows failed systems and the plan to fix them |
| Provider (email or chat) outage | Banner; fallback channels; queued messages retry |
| Offline | Notes and drafts autosave locally; actions disabled with "You're offline." |
| Staging | Strip shows STAGING; synthetic data only |

---

# Part H. Accessibility, performance and operations

- **Accessibility:** WCAG 2.1 AA in light and dark themes; keyboard-only completion of a ticket (claim, reply, resolve) and of the data request stages; visible focus ring; status by text and icon as well as color; live regions announce collisions and new replies politely.
- **Performance:** ticket list under 1.5 seconds (p75); ticket page under 2 seconds with the thread loaded; attachments and previews on demand; virtualized lists; the data map scan runs in the background and updates the page live.
- **Reliability:** ticket and request data is highly available with backups; email and chat providers have fallbacks; queue retries are idempotent; feature flags per page and per macro group.
- **Observability:** error tracking and performance monitoring without personal data; alerts for queue age, SLA risk, provider failures, deletion job failures and requests approaching due dates.
- **Localization:** English first; macros and letters translatable; IST dates with the time zone displayed.
- **Telemetry (internal, aggregate only):** volumes, response and resolution times, reopen and satisfaction trends, data-request on-time rate. Not used to rank agents, and the policy is stated in the team handbook.

---

# Part I. Security, privacy and audit

- **Admin app controls (subdomain):** single sign-on, mandatory two-factor (hardware key or authenticator app), 15-minute idle lock, 8-hour absolute session, host-scoped `Secure`, `HttpOnly`, `SameSite=Strict` cookies, strict CSP, no indexing, optional VPN or IP allowlist, server-side permission checks on every request, separate deployment and secrets from the public app.
- **Data minimization:** lists carry IDs, masked names, categories and SLA only. Message bodies and personal data open only on detail pages, with masking and logged reveals. Support can't see content of messages, resumes, recordings, data room documents or offer amounts.
- **Social-engineering defenses:** requester verification before account details are discussed; no password or code requests; sensitive actions need approvals; recovery steps have cool-down periods and notifications to the existing contact points; suspicious tickets (for example an urgent request to change an email or bank details) are flagged to fraud.
- **Dual control and separation of duties:** finance plus a second approver for money; second approver for email or phone changes; compliance sign-off for deletion and refusal; legal holds only by compliance; staff can't handle their own conflicts.
- **Audit:** every claim, view of sensitive data, reveal, reply, note, action, escalation, export, deletion step and approval writes an append-only audit entry with staff ID, time, case ID and reason.
- **Retention:** tickets and attachments are kept for a stated period (set with counsel), then anonymized or deleted; data rights case files (decisions, evidence, response letters) are kept for the legally recommended period; legal holds pause deletion.
- **Staff privacy:** the audit log records staff actions for accountability; internal notes and staff feedback follow HR and privacy rules.
- **Law-enforcement and regulator requests:** handled only by compliance with a documented legal basis, verification, minimal disclosure and a log; support forwards and acknowledges only.
- **Regulatory:** confirm with counsel response times, extension rules, identity verification standards, handling of children's or incapacitated persons' data (if applicable), exemptions, cross-border transfers, sub-processor notification, breach handling, grievance officer details and regulator contact.

---

# Part J. Acceptance criteria and QA checklist

**Support tickets**
- [ ] Queue order follows priority and urgency, time to target, then age; no other attributes are used; priority-plan commitments are reflected in SLA only.
- [ ] Urgent safety, scam, security and payment tickets reach the right on-call team within the targets; safety content is never closed as spam.
- [ ] SLA clock pauses and resumes correctly; business calendars handle weekends and Indian public holidays.
- [ ] Lists contain no message bodies, emails or phone numbers; sensitive patterns are auto-masked in subjects and threads.
- [ ] Locks, collision detection and merging work; bulk actions are limited as specified.

**Ticket detail**
- [ ] Unverified requesters can't receive account details; the verification flow works; the composer blocks requests for passwords, codes and full IDs.
- [ ] Approved actions are limited by role, logged and reversible where possible; actions needing approval can't complete without it.
- [ ] Support has no access to private messages, resumes, recordings, data room documents or offer amounts; no impersonation exists.
- [ ] The "Check before sending" panel catches advice, policy promises, third-party data and discriminatory language.
- [ ] Escalation creates linked cases in the right queue and keeps the requester informed neutrally.

**Data rights**
- [ ] The clock starts and extends correctly per request type; extensions can't be added after the due date; overdue alerts fire.
- [ ] Identity verification collects the minimum; signed-in requests verify automatically; representatives need proof of authority.
- [ ] The data map scans all registered systems; failing systems block completion; third-party data is flagged for redaction.
- [ ] Legal holds and retention duties block deletion and are recorded with their basis; refusals include reasons and complaint routes.
- [ ] Exports are generated automatically, encrypted, delivered through expiring links with a separate channel for the password or code, and downloads are logged; staff can't read export contents.
- [ ] Deletion runs through runbooks with per-system evidence, handles backups and sub-processors, and compliance sign-off is required before the response.
- [ ] Employer-routed requests notify employers, track responses, send reminders and escalate overdue cases.
- [ ] Consent withdrawal stops processing immediately and updates consent records.

**Security, privacy and wellbeing**
- [ ] SSO and two-factor are mandatory; idle lock and session limits work; permissions are enforced on the server for every request.
- [ ] No personal data appears in logs, error reports, notifications or analytics payloads.
- [ ] Audit entries are append-only and complete for every sensitive action.
- [ ] Abusive-requester handling and distress protocols are implemented and tested; agents have a way to hand off distressing cases.

**Accessibility and performance**
- [ ] Keyboard-only use covers every action; AA contrast in both themes; live regions don't steal focus.
- [ ] Performance targets in Part H are met; provider outages don't lose messages.

---

# Part K. Build order (suggested)

1. **Admin foundation:** subdomain, SSO, two-factor, internal roles with server-side checks, append-only audit log, masking and reveal service.
2. **Ticketing core:** intake from the in-product form, email and the public form; categories mapped from the Help topics; queue, claiming, SLA clock and business calendar.
3. **Ticket Detail:** conversation, requester verification, context card, linked records (read-only Admin view), macros, internal notes, check-before-sending, escalation, and the short list of approved actions.
4. **Data Rights Requests foundation** before launch (the product's Settings already promise download and deletion): intake, identity verification, the clock and due dates, acknowledgment letters, and the compliance workflow with legal-hold awareness.
5. **System connectors and the data map** for the first systems (accounts, profiles, resumes, applications, practice data, billing), with automated export and deletion jobs, then more systems and sub-processors.
6. **Employer-routed requests** and enforcement tooling.
7. Satisfaction surveys, aggregate quality reports, article and macro feedback loops, spam and duplicate handling.
8. Chat and callback channels, priority plan handling, translation tools.
9. Accessibility, performance and security review against the checklist, then a staged rollout (one support team first, with compliance supervising the first requests).

**Suggested first release:** the foundation, ticketing core, Ticket Detail with the basic action set, and Data Rights Requests (intake, verification, clock, access and deletion with the first connectors). Data rights obligations apply from the day you hold personal data, so build and test the deletion and export jobs before real users sign up. Add chat, priority plan handling and richer analytics later.

**Reminder for the build:** the subdomain is an isolation layer, not an access control. Keep mandatory two-factor, server-side permission checks, masking with logged reveals, requester verification before account discussions, dual control for money and account changes, compliance sign-off for deletions and refusals, and the append-only audit log from day one. Staff must never impersonate users, read private content, or expose other people's data in an export. Get legal advice on data-protection response times, identity verification, retention and legal holds, employer and processor responsibilities, grievance and regulator requirements, and law-enforcement request handling before launch.
