# Admin Content and Programs Design (production spec)

**App:** Platform admin console on its own subdomain (for example `admin.yourdomain.com`). Routes below are relative to that subdomain.
**Users:** content and program managers, subject experts and editors, trust and safety (safety content), compliance and legal reviewers (policy and privacy content), AI quality reviewers (rubrics), support (help articles), and super admins.

These six pages manage everything the platform *publishes* or *decides by configuration* that isn't user-generated: help and announcements, the default templates and question banks every role starts from, the published scoring rubrics, curated grants and incubators for early-stage startups, investor events, and the matching and search rules behind "Fit" chips and recommendations. They are the other end of many public-product designs: help articles and release notes in every role's Help page, the starter set in Templates and Scorecards, the public Scoring Rubric and Privacy page, the stage toolkit's grant and incubator listings, the investor and mentor Events pages, and the Discover, Recommended and Auto-match features. Your proposal lists "content and template management" among the admin responsibilities, a "grant and incubator listings" tool in the Prototype stage, priority access to investor events for mentors, matching for mentors, investors and jobs, and published rubrics with bias testing.

| # | Page | Route | Purpose |
|---|---|---|---|
| 1 | Help and Announcements | `/content` | Help articles, announcements, release notes, policy and legal pages, notification and email copy |
| 2 | Templates and Question Banks | `/templates` | Platform default job templates, pipelines, scorecards, screening banks, interview question sets, drills, stage toolkit templates |
| 3 | Rubrics and Scoring Config | `/rubrics` | Published interview and readiness rubrics, ATS rules, versions, anchors, notice periods |
| 4 | Grants and Incubators | `/opportunities` | Curated listings for the Prototype stage, with verification and expiry |
| 5 | Events Management | `/events` | Investor events and demo days, registration rules, priority access, selection, event day tools |
| 6 | Matching and Search Settings | `/matching` | Mentor matching, job recommendations, "Fit" rules, search ranking, experiments and fairness checks |

> **Subdomain note.** The admin console is a separate app, so there is no per-route role-based file. Section 3 gives a short **who sees what** table (internal roles) because it decides what each page shows. Section 12 lists the controls the subdomain still needs (single sign-on, mandatory two-factor, server-side permission checks, approvals, audit), because a separate address doesn't protect anything on its own.

> **Legal, fairness and trust reminder.** Content and configuration on these pages shape what thousands of people see, how they are scored and who gets matched. Get legal advice before launch on policy and terms pages, privacy notices, securities and fundraising rules for investor events, handling of third-party grant information, advertising and "featured" labeling rules, accessibility obligations, and bias testing of scoring and matching. Nothing on these pages may use personal characteristics (age, gender, religion, caste, nationality, marital status, health, photos) to score, rank, match or filter.

---

## 1. Design principles

- **One source of truth:** content, templates, rubrics and rules live here once and are read by the product, so a fix is made in one place and appears everywhere.
- **Draft, review, publish, review again:** nothing goes live without a second person. Everything has an owner, an effective date and a next review date, so stale content is found before users find it.
- **Fairness is a requirement, not a feature:** scoring and matching rules are explainable, versioned, tested on labeled data and checked for bias before release. Paid placement is always labeled and never changes safety, verification or fairness rules.
- **Plain language, accessible by default:** readable text, translations, accessible markup and alternatives are checked before publishing.
- **Safe rollout:** preview in real product context, shadow mode, staged rollout, scheduled changes, and one-click rollback.
- **Tell users what changed:** significant policy, rubric and rule changes carry a version, an effective date and a notice period; users and employers see change summaries.
- **Everything is traceable:** every edit, approval, publish, rollback and export is written to the append-only audit log, with the version history visible.

---

## 2. Design tokens and shared look

Same tokens as the Admin Dashboard (ink, ivory, one gold accent, light and dark themes; `Fraunces` and `Inter`; IST timestamps with a visible time zone; 8px grid; 12px cards; 10px controls). Editors use a clean writing surface (max line length 72 characters) with a live preview.

### Shared chips

| Group | Chips |
|---|---|
| **Content status** | `Draft` (stone outline), `In review` (ink outline), `Changes requested` (warning tint), `Approved` (gold-tint), `Scheduled` (info tint), `Published` (success tint), `Needs review` (warning tint, past its review date), `Archived` (stone) |
| **Audience** | `All roles`, `Startup`, `Mentor`, `Investor`, `Job seeker`, `Employer`, `Admin (internal)` |
| **Risk class** | `Standard`, `Sensitive` (legal, safety, privacy, fairness, scoring; needs extra reviewers) |
| **Rollout** | `Shadow` (no effect, measuring), `Staged (n%)`, `Live`, `Rolled back` |
| **Language** | `EN`, `HI`, `BN`, … with `Translated`, `Needs translation`, `Machine-translated (unreviewed)` |
| **Freshness** | `Fresh`, `Review due in {days}`, `Overdue` |

### Shared components
- **Item header:** title, type, audience chips, status chip, version, owner, next review date, **Preview**, **History**, **Duplicate**, overflow (Archive).
- **Editor frame:** left editor, right live preview (in-product render for the chosen audience, role and device width), bottom **Checks panel**.
- **Checks panel (runs live):** readability (target reading level shown), accessibility (headings, link text, alt text, contrast tokens), broken links, banned or biased terms (from Policy Rules), personal data patterns, outdated product references (UI names that no longer exist), translation gaps, and for sensitive content a required reviewer list. Errors block submit; warnings are explained and can be acknowledged.
- **Review workflow bar:** `Draft → In review → Approved → Scheduled or Published`, with reviewers, comments (inline), **Approve**, **Request changes**, and **Publish now** or **Schedule** (time zone shown).
- **Version history:** every version with author, time and a plain-language change summary, **Compare** (side-by-side diff) and **Restore** (restoring creates a new version).
- **Impact preview:** "Appears on: Employer Job Editor, Help article 'Posting rules'. Used by 142 live jobs. Changing it affects new jobs only." (the server computes where an item is referenced).
- **Localization panel:** per-language status, translator or tool used, review status, side-by-side source and target, and a rule that sensitive items need human-reviewed translation before publishing in that language.

### Keyboard shortcuts
`⌘S` save draft · `⌘Enter` submit for review · `]` / `[` next or previous item in a list · `p` toggle preview · `h` history · `?` shortcuts. Disabled while typing.

---

## 3. Internal roles and what they see (content scoping)

| Internal role | Access in this area |
|---|---|
| Content and program manager | Create and edit most content; manage templates, opportunities and events; request reviews; publish `Standard` items after approval |
| Subject expert or editor | Edit and review within assigned areas (for example hiring practice, mentoring, fundraising) |
| Support agent or supervisor | Edit and propose Help articles and macros (support macros live in Support); publish only with an editor's approval |
| Trust and safety | Review and approve safety, scam, posting-rule and conduct content; manage policy-linked templates |
| Compliance and legal reviewer | Review and approve `Sensitive` items (terms, privacy notice, consent text, data rights letters, securities-related event copy); must approve before publication |
| AI quality reviewer | Review rubric drafts, anchors, golden sets and matching fairness checks; can block release on failed gates |
| Program manager (events) | Manage events, registrations, selection and communications; cannot approve securities-related copy alone |
| Analyst | Read-only usage statistics |
| Super admin | Everything, including emergency unpublish and rollback |
| Others | No access |

The server enforces this on every request. Reviewers can't approve their own work; sensitive items need the named second reviewers.

---

# Part A. Help and Announcements: `/content`

## A.1 Purpose
Keep every explanation, instruction, announcement and policy page the platform shows to users accurate, current and consistent, across all five public roles and languages.

## A.2 What lives here
| Type | Examples | Surfaces |
|---|---|---|
| **Help articles** | The role-specific topics in each role's Help page (getting started, posting jobs, offers, privacy, billing, safety) | `/help` in every role |
| **Safety and compliance center pages** | Scam and safety centers, fair hiring basics, fraud tips | Help, Messages, Offers, Trust pages |
| **Announcements** | Product updates, maintenance notices, new features, policy changes | In-app banner, notification, email digest |
| **Release notes** | Dated, per-role changes | Help → Release notes |
| **Policy and legal pages** | Terms, privacy policy, code of conduct, posting rules, community guidelines, disclaimers | Footer, onboarding, Settings, Help |
| **Platform copy** | Notification text, system emails, empty-state copy, error messages, consent text | Across the product |
| **Public rubric explanation page** | Plain-language scoring explanation (content only; the rubric definition lives in Rubrics) | Scoring Rubric and Privacy page |

## A.3 Layout
Tabs: **Articles** · **Announcements** · **Release notes** · **Policy and legal** · **Platform copy** · **Translations** · **Review queue** · **Analytics**. Toolbar: search, filters (type, audience, status, language, owner, freshness), sort (Needs review, Recently updated, Most viewed). Summary strip: published items, needs review, in review, untranslated sensitive items.

### Table
Title, type, audience chips, status, version, language coverage (chips), owner, last updated, next review date with freshness chip, views (30 days, aggregate), helpful rate (aggregate), open feedback count, actions (**Open**, **Preview**).

## A.4 Article editor: `/content/articles/:id`
- **Fields:** title, slug, audience(s), role-specific variants (one article can have role-specific steps), category and topic (mapped to the Help topics), summary (the "short answer first"), body (structured blocks: steps, notes, warnings, screenshots with required alt text, related links), tags, search keywords, related articles, owner, review cadence (3, 6 or 12 months), risk class.
- **Template:** the standard article structure (short answer, steps, what to expect, related articles, **Was this helpful?**). Articles on hiring, offers, data or money include the standard disclaimer ("The platform doesn't give legal, tax, immigration or financial advice.") added automatically and locked.
- **Product references:** UI names are written as tokens (for example `{{ui.employer.jobEditor}}`) that resolve to current labels, so renaming a feature doesn't leave stale text. The checks panel flags raw hard-coded UI names.
- **Screenshots:** uploaded through an asset library with alt text, a "needs update" flag when the product UI changes, and masking tools for any personal data (not allowed in published screenshots; a scan checks for emails and names).
- **Feedback loop:** reader votes and comments (aggregated), support tag counts and search misses show on the item page ("23 people searched 'refund pack' and found nothing").

## A.5 Announcements editor: `/content/announcements/:id`
- **Fields:** title, message (short), long text (optional), audience (roles, plan, country, or a saved segment defined by non-sensitive attributes only), channels (in-app banner, notification, email digest, status page), severity (`Info`, `Important`, `Critical`), start and end time, link target, dismissible (yes by default), and a preview per channel.
- **Rules:**
  - **Critical** announcements (security, outages, legal changes) can't be dismissed until acknowledged, and need two approvers.
  - Marketing-type announcements follow the user's notification preferences and are limited in frequency (for example at most 1 per week per user).
  - Segments never use personal characteristics; sizes under 100 show a warning to avoid targeting individuals.
  - Time zones are explicit (IST default) and scheduled sends respect quiet hours.
- **Preview and test:** send a test to named staff accounts; view as role.
- **Results (aggregate):** delivered, viewed, dismissed, clicked; no per-person tracking beyond what the user's settings allow.

## A.6 Release notes
Per release, per role: new, improved, fixed, and known issues, each with plain-language text. A **Generate draft from the change log** tool summarizes the engineering change list for an editor to rewrite (labeled `AI suggestion` and always human-edited). Publishing creates the Help → Release notes entry and an optional in-app announcement.

## A.7 Policy and legal pages
- **Sensitive by default:** terms, privacy notice, code of conduct, posting rules and consent text need compliance and legal approval, and trust and safety approval for conduct and posting rules.
- **Versions and effective dates:** each version has an effective date and a **notice period** (default 14 days, shorter only for urgent safety changes). Users and employers get a change summary. Where required, users must accept a new version (an acceptance record is stored per user per version).
- **Policy link integrity:** each policy page links to its internal policy ID (from Policy Rules) so the public text and internal rules stay in sync; a mismatch creates a task.
- **Archive:** old versions remain viewable at a stable URL.

## A.8 Platform copy and templates for system messages
- **Notification text, system emails, error messages, consent text and empty states** are managed as keyed strings with variables and plural rules. Each key shows where it is used (surface and role), its risk class and its translation status.
- **Rules:** no sensitive data in email subjects or push text (the checks panel blocks personal data patterns, salary figures, candidate names, scores); consent text is `Sensitive`; security and billing alerts use locked templates that only compliance or security can change.
- **Rollout:** copy changes are versioned and can be scheduled, A/B tested only for non-sensitive text, and rolled back instantly.

## A.9 Translations tab
- **Coverage matrix:** items by language, with status chips and counts. Sensitive items need human-reviewed translation before publication in that language; machine-translated drafts are labeled internally and never shown to users unreviewed for sensitive items.
- **Translator workflow:** assign to translators or agencies, glossary and style guide (platform terms such as "readiness score" and "Investment Ready" have fixed translations), review and approve.
- **Fallback rule:** if a translation is missing, the product shows English with a small notice, never an unreviewed machine translation of a sensitive item.

## A.10 Review queue and freshness
A queue of items needing action: in review, changes requested, `Needs review` (past due), broken links, "UI changed" flags, high-complaint items, and low helpful rates. Owners get reminders; items overdue by 30 days escalate to the content manager and, for sensitive items, to compliance.

## A.11 Analytics (aggregate)
Most viewed, search terms with no results, articles with low helpful rates, ticket topics with no matching article, announcement reach. Used to improve content; never to track individuals.

## A.12 States
- **Publishing conflict:** two people edit the same item: a banner and a merge view.
- **Link check failed:** warning list with the broken URLs and **Fix** shortcuts.
- **Translation blocked:** sensitive item lacks a reviewed translation; publish for English only or wait.
- **Emergency unpublish (super admin and compliance):** one-click removal of a published item with a reason, replaced by the previous version or a notice.
- **Loading error:** inline **Retry**.

---

# Part B. Templates and Question Banks: `/templates`

## B.1 Purpose
Maintain the **platform default** templates and banks that every role starts from, and publish them safely. Companies, startups, mentors and candidates then copy and adapt these in their own areas (employer Templates and Scorecards, startup stage toolkits, practice sessions, mentor plans).

## B.2 What lives here
| Group | Items |
|---|---|
| **Hiring** | Job post templates by role category, pipeline templates, scorecards and criteria libraries, screening question banks, interview guides, candidate message templates (acknowledgement, update, kind rejection by reason, offer cover note, welcome), offer letter samples, onboarding checklists |
| **Startup stage toolkits** | Idea canvas, customer interview tracker fields and question prompts, market sizing template, prototype roadmap and sprint board templates, user-testing and feedback forms, sales pipeline stages, KPI sets, board and investor update templates, data room folder structure and checklist, stage **exit criteria** definitions |
| **Readiness checklist** | The six investment-readiness items with "what done means" criteria and evidence types |
| **Mentoring** | Plan templates, session agenda and summary templates, deliverable templates |
| **Investor** | Diligence checklists, question bundles, scorecard weights, call-note templates, memo sections, NDA template library (reviewed by counsel), term sheet field definitions and plain-language tooltips |
| **Job seeker** | Resume templates (ATS-safe layouts), resume section guides, cover note prompts |
| **Interview trainer** | Question sets by role, level, industry and interview type (HR, behavioral STAR, technical, case, founder-fit), follow-up prompts, "good answer" notes, drill library and drill steps |

## B.3 Layout
Tabs: **Hiring** · **Startup stages** · **Readiness** · **Mentoring** · **Investors** · **Resumes** · **Interview questions** · **Drills** · **Review queue** · **Usage**. Toolbar: search, filters (group, audience, role category, level, language, status, risk class), sort (Needs review, Most used). Summary strip: published, in review, needs review, items used in the last 30 days.

### Table
Name, group, audience, status, version, risk class chip, role category, languages, used by (count of copies or sessions, aggregate), complaints or flags count, owner, next review date, actions (**Open**, **Preview**, **Duplicate**).

## B.4 Template editor: `/templates/:id`
Type-specific editors in the shared frame (Part 2), plus:
- **Structured fields** per type (for example, a scorecard has criteria, anchors, weights and required comments; a screening question bank has question text, type, required default, role categories and the reason a question is job-related).
- **Fairness checks (live):** the banned screening topics and biased terms from Policy Rules run against all text; prohibited questions can't be saved; scorecard criteria that aren't job-related (for example "culture fit", "energy") are warned with suggested behavioral alternatives; interview guides show a "topics to avoid" box that can't be removed.
- **Evidence and reasoning:** each question or criterion has a short "why this is job-related" note (visible to employers as guidance), reviewed by the subject expert.
- **Calibration material:** example answers per level for scorecards and practice rubrics, with diverse examples in language, style and background, reviewed for bias.
- **Compatibility:** variables and fields used by the product (for example `{CandidateName}`, `{JobTitle}`) are validated, and changes to field names show which products and templates they affect.
- **Offer and legal templates:** labeled "Sample. Not legal advice." and require compliance and legal approval; company-specific legal text is out of scope here.
- **Interview question sets:** each question has type, level, role categories, estimated time, difficulty, expected structure, a source note (author and review date), languages, and a **known issues** field (for example "ambiguous wording reported 3 times"). Technical questions have a correctness review by a domain expert.
- **Drills:** goal, steps, prompts, micro-feedback rules (linked to rubric dimensions), duration, and accessibility notes (text and voice modes).
- **Stage exit criteria:** names, descriptions, evidence types and mentor review rules per stage; changing them shows how many startups are currently in progress and how they would be affected (the default is "applies to new startups; current ones keep their criteria unless an admin migrates them").

## B.5 Lifecycle and rollout
1. **Draft** by an editor or expert.
2. **Review:** a second subject expert, plus trust and safety for hiring and conduct items, compliance and legal for sensitive items, AI quality for question sets and drills that feed scoring.
3. **Test:** run the **regression set** (banned content examples), a readability check, a diversity-of-examples check for question banks, and, for interview questions, a pilot with the golden set (Rubrics page).
4. **Publish:** `Shadow` (visible to staff and a pilot group), `Staged`, then `Live`. New versions apply to **new copies**; existing copies in use stay unchanged unless the owner chooses to update (the product shows "A newer version is available" with a change summary).
5. **Monitor:** usage, complaints, skip rates, and fairness indicators (aggregate) for question sets; automatic flags for questions that many users report as unclear or inappropriate.
6. **Retire:** archive with a reason; the product keeps copies but stops offering the item.

## B.6 Usage tab (aggregate)
How often each template or question is used, completion rates, drop-off points, average time, average rubric scores per question (aggregate, to find ambiguous or unfair questions), complaints and review requests per item. Never shows individual users. Questions with large score gaps across language or speaking-style groups (measured under the AI Quality fairness setup) are flagged for review.

## B.7 States
- **Item in use by many copies:** deletion disabled; **Archive** only.
- **Banned content found:** can't publish; the exact text is flagged with suggested alternatives.
- **Conflicting versions of a field:** merge view.
- **Question retired mid-session:** active sessions finish with the version they started with.
- **Translation gaps:** items appear in the supported languages only; the product falls back to English with a notice.
- **Loading error:** inline **Retry**.

---

# Part C. Rubrics and Scoring Config: `/rubrics`

## C.1 Purpose
Hold the published, versioned definitions of how things are scored: the interview trainer's rubrics and readiness score formula, resume ATS rules, and the match and fit rules used for hints. It implements your proposal's requirement that scoring rubrics are published so candidates know how they are judged, with human review and bias testing. Changes here are high-stakes: they change what thousands of candidates see and what employers may see (with consent).

## C.2 What lives here
| Group | Items |
|---|---|
| **Interview rubrics** | Clarity, Structure, Relevance, Confidence, with band definitions (Needs work, Developing, Solid, Strong), anchor examples and per-interview-type variants (HR, Behavioral, Technical, Case, Founder-fit) |
| **Delivery analysis rubric** (opt-in) | Pace ranges, filler words, pauses, volume consistency, eye contact toward camera, with the list of what is *not* measured |
| **Readiness score** | Component weights (practice, consistency, resume strength, profile completeness), smoothing rules, minimum sessions, effect of deletions, whether delivery results may be included (candidate's setting) |
| **Resume ATS rules** | Format and structure checks, headings, dates, readability, length, keyword match rules, scoring bands |
| **Match and fit hint rules** | Skills match logic, explanation templates for "Why this fit" (rules live in Matching; the explanation text and fairness notes are linked here) |
| **Scorecard guidance** | Default anchor language for employer scorecards (content in Templates; the principles and checks here) |

## C.3 Layout
Tabs: **Rubrics** · **Readiness formula** · **ATS rules** · **Golden sets and tests** · **Releases** · **Notices and change log** · **Public pages**. Summary strip: live rubric versions, drafts in review, last audit date, open fairness findings.

## C.4 Rubric page: `/rubrics/:id`
- **Definition:** name, purpose, dimension, version, owner, status, effective date, next review date, linked public page.
- **Bands:** for each band, the numeric range, a plain-language description, indicators ("Gives a clear main point in the first sentence"), and **anchor examples** (at least three per band, per interview type, covering different speaking styles, backgrounds and answer lengths), each with the reason it fits the band.
- **What this rubric does not judge:** a locked list (accent, voice, appearance, background, age, gender, disability, religion, caste, nationality, marital status, family, health, emotions, personality, "culture fit"). Editing this list needs compliance approval and is almost always append-only.
- **Language and mode notes:** how the rubric applies to text, voice and video, to different languages and to answers from people with speech differences (no penalty for pauses or disfluency in the core dimensions; guidance for scorers).
- **Scoring method summary:** how dimension scores combine into the session score, and how scores are explained to candidates.
- **Linked prompts and models:** which model and prompt versions use this rubric (from the AI model registry), and the release gates that must pass.

## C.5 Readiness formula page
- **Components and weights** with sliders limited to approved ranges, a live **preview** of how example candidate profiles would score under the old and new formula (synthetic profiles only), and a **distribution comparison** on anonymized historical data to see the effect before release.
- **Rules:** minimum sessions (default 3), smoothing method, treatment of rest days (no penalty), what happens when sessions or resumes are deleted, whether delivery analysis counts (off by default and only if the candidate opts in).
- **Constraints:** weights must sum to 100; no component may use personal characteristics; any change above a set size needs the AI Quality and compliance reviewers.
- **Employer-facing label:** the exact text shown with a shared score ("Practice result provided by the candidate. Not an assessment to base a hiring decision on.") is locked and compliance-owned.

## C.6 ATS rules page
- **Checks:** list of rule checks with severity, plain-language explanation, suggested fix, and examples; deterministic (the same resume gets the same score). Rule changes show regression results on a test corpus of synthetic resumes covering different layouts, languages and career paths (including career gaps and non-linear careers, which must not be penalized).
- **Bands and messages:** score bands and the neutral wording for low scores.
- **Public page:** "How we check" text sync.

## C.7 Golden sets and tests tab
- **Golden sets:** expert-labeled answers and resumes per rubric with the expected bands and rationales, balanced across languages, speaking styles, backgrounds, answer lengths and interview types; metadata about how items were sourced and consented (synthetic or consented only).
- **Test runs:** every change to a rubric, prompt or model runs against the golden sets: accuracy against expert labels, agreement between runs, **fairness gaps** across tested groups (language, transcription confidence band, answer length), and transcription accuracy across accents. Results show pass or fail against release thresholds (set by AI Quality and compliance).
- **Calibration:** exercises for human reviewers on the same blinded items; agreement by dimension (aggregate), used to improve anchors.

## C.8 Releases tab
- A release bundles rubric versions, readiness formula and prompts. It moves through `Draft → Review → Test → Shadow → Staged → Live`, with gates: golden-set accuracy, fairness gaps within thresholds, reviewer agreement, readability of public text, legal and compliance approval, and notice period for users.
- **Shadow mode:** new scoring runs alongside the live version and logs differences (not shown to users). Large differences open a review.
- **Staged rollout:** a small share of new sessions first, then wider, with automatic halt on drift or complaint spikes.
- **Rollback:** one click returns to the previous release; sessions already scored keep their rubric version label.
- **Kill switch for score sharing:** a link to the AI Quality control to pause employer-visible scores during an incident.

## C.9 Notices and change log
- Each published change has a plain-language summary, effective date, reason, who approved, and test results summary.
- **Notice period:** significant rubric or formula changes show a notice to candidates (default 14 days) and a banner on the public rubric page; employers are told when shared scores follow a new formula.
- **Candidate impact:** the page estimates how many existing readiness scores would change and by how much (aggregate), and whether a recalculation will run (recalculation happens on a schedule, with a note in each candidate's history).
- **Public change history** is generated from approved changes.

## C.10 Public pages tab
Previews of the public Scoring Rubric and Privacy page sections generated from the live rubric text (bands, "what we don't score", fairness and testing summary, data table). Publishing the public page is tied to the release so the public text always matches the live rubric.

## C.11 States
- **Gate failed:** release can't advance; the failing metric and examples are shown.
- **Fairness gap above threshold:** automatic block with a task for the AI Quality reviewers.
- **Active incident:** rollouts are frozen.
- **Conflicting edits:** merge view and lock on sensitive fields.
- **Loading error:** inline **Retry**.

---

# Part D. Grants and Incubators: `/opportunities`

## D.1 Purpose
Maintain the curated list of grants, incubators, accelerators and similar programs shown in the Prototype stage toolkit (your proposal's "grant and incubator listings"). Because founders may act on this information, accuracy, freshness and protection against scams matter.

## D.2 Layout
Tabs: **Listings** · **Submissions** · **Needs review** · **Expired** · **Sources and checks** · **Analytics**. Summary strip: live listings, expiring in 14 days, submissions waiting, link checks failing.

### Table
Name, type (Grant, Incubator, Accelerator, Competition, Fellowship, Loan scheme, Other), provider, status, deadline, regions, sectors, stage fit, amount or benefit, verification level (chip), last verified date, owner, clicks (aggregate), actions.

## D.3 Listing editor: `/opportunities/:id`
Fields:
- **Basics:** name, provider (organization), type, short description, link to the official page, application link, contact (a role email, not personal), language(s).
- **Details:** amount or benefit (range, equity expectations if any, "no equity" clearly), eligibility (startup stage, sector, location, legal form, founder criteria that are job-related and lawful; no criteria based on personal characteristics beyond what the program itself lawfully requires, shown as the program's stated rule), deadlines and cycles, selection process summary, cost to apply (must be "None" or a clearly stated, reasonable fee flagged for review).
- **Source and verification:** where the information came from (official site, announcement, partner submission), who verified it and when, and evidence (archived page snapshot, email from the provider). **Verification levels:** `Verified by provider` (confirmed directly), `Verified from official source`, `Unverified` (not shown to users).
- **Scam checks:** the checks panel flags red-flag patterns: application fees, guaranteed funding, pressure deadlines, personal bank accounts, messaging-app-only contact, newly created domains, lookalike domains of known programs, mismatched names, and "pay to be listed" requests. Flagged listings can't publish without a senior review, and may be declined.
- **Display:** labels (`Sponsored` if the provider pays, with clear labeling and no change to verification rules), regions, tags, and a "Last updated" date shown to users.
- **Expiry and review dates:** automatic expiry after the deadline; recurring programs need confirmation each cycle; listings not re-verified within 6 months are hidden until reviewed.

## D.4 Submissions tab
- **Sources:** providers can submit through a form (incubators, colleges, banks, government schemes), startups and mentors can suggest listings, and partners can sync a feed.
- **Review:** each submission goes through the same checks. Submitters see status and get plain feedback. Providers who ask for payment to list are handled under partnership terms and always labeled `Sponsored`.
- **Duplicates and conflicts:** the system matches by name, domain and link and proposes a merge.

## D.5 Sources and checks tab
- **Link health:** automated checks for broken links, redirects to different domains, content changes on official pages (page change detector), and SSL problems; failures create tasks and can auto-hide a listing until fixed.
- **Domain reputation and impersonation checks:** against the Fraud page's blocklists.
- **Re-verification schedule:** per source and per listing.
- **Provider directory:** verified provider records (domain, contact, notes) to speed up verification.

## D.6 Analytics (aggregate)
Views, saves and click-outs per listing, applications started where the provider reports it, and, if providers share outcomes, aggregated results by stage and sector. Feedback buttons in the product ("Report a problem with this listing") feed a queue here and create a Report if it looks like a scam.

## D.7 Fairness and trust rules
- Listings are ranked by relevance to the startup's stage, sector and location and by freshness, never by who pays. Sponsored listings appear in a labeled position and can't displace verified relevance order beyond a small cap.
- No listing may request fees from founders to apply (exceptions need a documented reason and show the cost plainly).
- Provider information is shown as the provider's own claims, with the verification label, and the product reminds founders to check terms and get their own advice.
- Personal data of founders isn't shared with providers by this page; click-outs go to the provider's site, and any data sharing is by the founder's choice there.

## D.8 States
- **Listing deadline passed:** auto-moves to Expired and disappears from the product; **Clone for next cycle** helps recurring programs.
- **Link failing:** hidden after 3 failures over 48 hours; owner notified.
- **Provider disputes a listing:** review path with evidence; temporary hide while checked.
- **Scam report received:** listing hidden immediately pending review (reversible), a Report is opened.
- **Loading error:** inline **Retry**.

---

# Part E. Events Management: `/events`

## E.1 Purpose
Create and run platform events: investor demo days and pitch evenings, mentor and investor office hours, roundtables and workshops. It is the admin side of the investor and mentor **Events** pages (priority access for mentors and eligible investors, registration, presenting startups, follow-up). Events that involve fundraising have legal sensitivities and need extra care.

## E.2 Layout
Tabs: **Upcoming** · **Planning** · **Past** · **Registrations** · **Selections** · **Partners and hosts** · **Analytics**. Summary strip: events in the next 30 days, registrations, waitlists, startups selected, tasks overdue.

### Table
Event, type, date and time (IST), format (Online, In person, Hybrid), status (`Draft`, `In review`, `Open`, `Full`, `Live`, `Past`, `Cancelled`), capacity and registered by audience (startups, investors, mentors), waitlist count, host or partner, owner, risk class, actions.

## E.3 Event editor: `/events/:id`
- **Basics:** title, description, type, format, location or link, date and time (time zone shown; recurring events supported), duration, host (platform, partner, investor group), cover (a solid brand band, no stock photos), sector and stage focus, language, accessibility details (step-free access, captions, sign language on request), code of conduct, recording policy.
- **Audiences and capacity:** per audience (startups, investors, mentors, job seekers if relevant): capacity, who may register, eligibility rules (for example investors need a verified account at a stated level; mentors need a verified profile; startups need Investment Ready status or a mentor endorsement, if the event requires it), waitlist rules.
- **Priority access:** rules matching your proposal's mentor incentive: mentors (and, if you choose, investors on certain plans) can register a set number of days before general opening, with reserved seats. The editor shows the schedule (priority window, general opening, close), the number of reserved seats, and previews each audience's view. Priority rules are published to users on the event page and the Events page in plain words. **Priority never changes eligibility, verification or conduct rules.**
- **Programme:** agenda with times, sessions, speakers, moderators and pitch slots; for each pitch slot, the selection rules and time limits.
- **Selection of presenting startups:** criteria published in advance, an application form (what the startup submits), reviewers, a scoring sheet with job-related and event-related criteria only (readiness, traction shared, fit to the investor audience, completeness), a conflict check for reviewers, mentor endorsements (optional and labeled), and a **decision record** with reasons. No personal characteristics, and no criteria that would favor paid sponsors. Selected startups confirm their participation and consent to being listed.
- **Legal and compliance (mandatory for fundraising events):** a checklist reviewed by compliance and legal: whether the event could count as promotion of securities, required disclaimers, investor eligibility confirmation, no promises of returns, recording and disclosure rules, rules for sharing startup materials, and local approvals where applicable. Events that require approval can't open until the checklist is signed off.
- **Communications:** invitation, confirmation, reminder (1 day, 1 hour), update, cancellation, follow-up and survey templates (from Content), with preview and scheduling.
- **Tools and integrations:** managed video or venue details, calendar invites, check-in method, Q&A and chat moderation settings, recording consent flow, materials library (view-only links).
- **Finance (if ticketed or sponsored):** pricing, discounts, sponsor tiers (sponsors are labeled, don't get attendee personal data, and don't influence selection), taxes, refunds and cancellation policy; links to Billing.

## E.4 Registrations tab
- **Registrants list** (IDs, masked names, roles, status, verification level, registration time, attendance type), filters, waitlist management, **Promote from waitlist**, **Cancel** with reason, and bulk messaging by template (preview and count; limited to event-related messages).
- **Eligibility checks:** automatic checks at registration (verified status, level, plan, restrictions); manual override with reason and approval.
- **Accessibility requests:** a private list for organizers to arrange adjustments (visible only to the event owner and the accessibility coordinator).
- **No-shows and priority:** policy for repeat no-shows (reduced priority access, with a plain explanation and a way to appeal), applied consistently and logged.
- **Data handling:** attendee lists are shared with co-hosts only as the event page states and consent allows; exports contain only what the event needs.

## E.5 Selections tab
Applications from startups for pitch slots, reviewer assignments, scoring sheets (blinded to non-relevant details where practical), decision records, notifications to applicants (with feedback where possible), and a **publish lineup** step that shows consent status. Appeals about selections follow a simple review by someone not on the selection panel.

## E.6 Event day tools: `/events/:id/live`
- **Run sheet:** timeline with current and next session, owners and notes.
- **Check-in:** attendee list with check-in, late arrivals and no-shows (IDs and names visible only to organizers during the event).
- **Moderation:** chat and Q&A queue with approve, hide and block, linked to the code of conduct; reports during the event go to Trust and Safety with a high priority.
- **Presenting now:** controls to show the current startup card to attendees (consented fields only).
- **Contingencies:** pre-written messages for delays, tech problems and cancellations; one-click broadcast with preview; fallback links.
- **Recording controls:** start and stop with visible indicators and consent logs (recording is off unless the event page and attendees consented).
- **Incident button:** escalate to the platform on-call (safety, security, legal).

## E.6a After the event
- **Follow-up tasks:** send thank-you and survey (templates), publish materials (view-only links with the presenters' consent), prepare the list of "interested investors per startup" **only** from attendees' recorded opt-ins (never from passive viewing), and close the event with a summary.
- **Outcomes (aggregate and consented):** registrations, attendance, survey results, intro requests made during the event, follow-ups. No claims about funding outcomes unless confirmed by the parties and with their consent.
- **Certificates and records:** participation certificates where offered, with the organizer's name and the event details.

## E.7 Partners and hosts tab
Partner and host records (links to Organizations), agreements, brand usage rules, data-sharing terms, sponsor tiers, contacts, and past events. Partners get access only to their own events' aggregate results.

## E.8 Analytics (aggregate)
Registration funnel, attendance rate, waitlist conversion, audience mix, satisfaction, and referral sources. No ranking of individual attendees.

## E.9 Fairness and trust rules
- Eligibility, priority and selection rules are published and applied consistently; exceptions need a reason and an approver.
- Sponsors never receive attendee personal data, never select startups or investors, and are clearly labeled.
- Events don't recommend investments or promise outcomes; the disclaimer and code of conduct appear at registration and on the event page.
- Personal data of attendees and presenters is used only for the event, with their consent for any sharing; photos and recordings need consent.

## E.10 States
- **Compliance sign-off missing:** can't open registration; the checklist shows what is missing.
- **Capacity reached:** status `Full`; waitlist opens automatically if enabled.
- **Event changed or cancelled:** one-click notice to registrants with the reason, refunds or credits if applicable, and calendar updates.
- **Speaker or startup withdraws:** replacement flow with the selection panel's rules.
- **Technical failure during a live event:** contingencies and a status banner for attendees.
- **Overbooked priority seats:** the system holds reserved seats until the priority window ends, then releases unused ones.
- **Loading error:** inline **Retry**.

---

# Part F. Matching and Search Settings: `/matching`

## F.1 Purpose
Configure the rules behind recommendations and matching across the platform: **mentor matching** (startups to mentors), **investor and startup "Fit"** hints, **job recommendations** and "Why this fit" for candidates, **employer match hints** (skills match on applicants), **search ranking** for Discover and Job Search, and how **featured** and **verified** badges affect ordering. These are high-impact: they decide who gets seen. Your proposal says matching should use industry, stage and need, shows mentor-verified startups first to investors, and requires bias testing and clear AI labeling.

## F.2 Layout
Tabs: **Overview** · **Mentor matching** · **Startup and investor fit** · **Jobs and candidates** · **Search ranking** · **Featured and sponsored** · **Experiments** · **Fairness and audits** · **Change log**. Summary strip: live rule sets, experiments running, last fairness audit, complaints about matches (aggregate).

## F.3 Common design of a rule set
Each rule set page shows:
- **Purpose and surface:** where it is used (for example "Mentor Find and Auto-match", "Job Search best match", "Discover startups order").
- **Inputs allowed:** a locked list of features the rule may use (for example industry, stage, stated needs, skills, experience level, location, work mode, salary range expectations, availability, verification status, recency). **Disallowed inputs** are shown and enforced: age, gender, religion, caste, nationality, marital status, family plans, health, photos, names, and proxies for these (for example first names or schools as a stand-in for caste or religion). Adding a new input needs compliance and AI quality approval.
- **Method:** rules and weights (and, if a model is used, the model version from the registry with its evaluation results).
- **Explanation templates:** the plain-language "Why this fit" sentences for each factor ("Matches 5 of your skills", "Invests in pre-seed health tech", "Mentor has helped 3 fintech startups at your stage") and the `AI suggestion` label text.
- **Controls:** weights (within approved ranges), thresholds, diversity of exposure settings (see F.8), and state (`Draft`, `Shadow`, `Staged`, `Live`, `Paused`).
- **Impact preview:** run the draft against a replay of recent anonymized queries and compare result changes (position shifts, exposure distribution, empty-result rate) before release.

## F.4 Mentor matching
- **Inputs:** startup industry and stage, stated needs (fundraising, product, go-to-market, finance, hiring, legal basics, technology), mentor expertise (verified claims weighted above self-reported), mentor availability and capacity, price range fit, language, timezone overlap, and previous outcomes at an aggregate level (for example the mentor's verified sign-off history), never personal characteristics.
- **Rules:** minimum match thresholds, capacity limits (never recommend a full mentor), conflict exclusions (declared conflicts exclude automatically), recency of activity, and a **cold-start** rule so new verified mentors get fair exposure for their first requests.
- **Explanations:** each match shows its reasons; startups can always search and choose freely.
- **Auto-match:** the three-mentor shortlist uses the same rules with a diversity-of-expertise setting, and the final choice is always the startup's.

## F.5 Startup and investor fit
- **Investor Discover and "Fit" chip:** match between a startup's stage, sector, raise size, location and readiness and an investor's stated criteria. **Ordering rule from your proposal:** mentor-verified (Investment Ready) startups appear first, then others, each group ordered by fit and freshness. The page documents this rule and prevents changes that would hide verified startups below unverified ones without compliance approval.
- **Startup Find Investors:** the reverse view with the same inputs and the investor's visibility settings; investors who opted out never appear.
- **Safeguards:** no use of founders' personal characteristics; no "likelihood of success" scores; "Fit" explains matches to the investor's own criteria only; cold-start rule for new Investment Ready startups.

## F.6 Jobs and candidates
- **Job recommendations (candidate side):** inputs: skills, experience level, preferred roles, location and work mode, salary expectation, company stage preferences, saved and skipped jobs, applications. Option to use **practice insights** only if the candidate turned it on (off by default).
- **Employer match hints (employer side):** skills and requirements comparison between a resume and a job's must-haves and nice-to-haves, explained in plain language; hints inform reading and never rank candidates into a decision; hints are suppressed in blind review for non-skill fields.
- **Talent search relevance:** ranking among opted-in candidates by skills and availability; excludes anyone who hid or paused their profile; honors blocks.
- **Safeguards:** protected characteristics and proxies are excluded; salary expectations aren't used to filter out candidates unless the candidate set a floor and the employer's range is below it, and then it is a soft ordering signal, not a hard exclusion; employment gaps and non-linear careers are not penalized.

## F.7 Search ranking
- **Job Search and Startups Hiring:** relevance to the query (text and skills), freshness, completeness of the job post (clear salary, requirements), employer response practices (aggregate reply-time performance, to encourage not ghosting), **verified employer** status (verified only appear), and featured placement rules (F.8). Ranking never uses whether an employer pays beyond the labeled featured slots.
- **Discover startups:** the ordering rule in F.5.
- **Query handling:** spelling, synonyms for skills and roles (including transliterations and common regional terms), language support, and a **zero-results** policy (suggest broader terms, never silently drop filters).
- **Search logs:** stored without account identifiers by default; short retention; used to improve relevance and find gaps.

## F.8 Featured and sponsored placement
- **Rules:** featured listings and sponsored opportunities are labeled; capped per results page (for example at most 2 featured items per 10 results); only for compliant, verified, open items; never in the first position of a verified-first ordering where that would break the published rule; never shown for jobs or events under moderation flags.
- **Fair exposure:** a setting for **exposure fairness** that prevents any single employer, mentor or startup from taking more than a set share of top positions over a period, and gives new verified entities a small guaranteed exposure window. These settings are based on activity and verification, never personal characteristics.
- **Transparency:** public explanation text in the Help center: "How results are ordered."

## F.9 Experiments tab
- **A/B tests and holdouts:** create an experiment with hypothesis, metric (for example application starts, intro acceptance, mentor request acceptance, complaints), audience (a random share of eligible sessions, never a targeted personal group), duration and guardrail metrics (complaint rate, empty results, exposure concentration, fairness gaps).
- **Safety rules:** experiments touching scoring or protected-adjacent features need compliance and AI quality approval; users aren't experimented on in ways that could harm their access to jobs, funding or mentoring (for example no random hiding of verified startups); automatic halt if guardrails fail.
- **Results:** aggregate, with confidence intervals; decisions recorded in the change log.

## F.10 Fairness and audits tab
- **Exposure and outcome dashboards (aggregate):** distribution of impressions and clicks across startup sizes and ages, employer sizes, mentor tenure and regions, language groups, and verification statuses; checks for concentration and unintended skew; flags when a rule change moves exposure beyond thresholds.
- **Bias tests:** run on synthetic and labeled datasets with controlled variation (for example changing only a name, school or location while keeping skills equal; the system must produce equivalent results). Failing tests block release.
- **Complaint review:** matches reported as unfair or wrong (from Help and the products), sampled and reviewed; common causes become tasks.
- **Audit cadence:** quarterly audits with findings, fixes and sign-off, with a summary used for the public "How matching works" page.
- **Human review:** high-impact rule changes require review by the AI Quality team and compliance, with a documented rationale.

## F.11 Release controls
Same lifecycle as other rules: `Draft → Review → Test → Shadow → Staged → Live`, with gates (bias tests, golden queries, exposure guardrails, performance). One-click rollback; kill switch per surface (falls back to simple, transparent ordering such as recency or alphabetical); **change log** with who, why, results and rollout stage.

## F.12 States
- **Gate failed:** release blocked with the failing test and examples.
- **Exposure guardrail breach in staged rollout:** automatic halt and rollback suggestion.
- **Model or provider outage:** fallback to rules-only mode with a banner.
- **Conflicting rule sets:** warning with the conflicting items.
- **Loading error:** inline **Retry**.

---

# Part G. Cross-cutting design

## G.1 IDs and linking
Stable IDs (`ART-…`, `ANN-…`, `TPL-…`, `RUB-…`, `OPP-…`, `EVT-…`, `MAT-…`). Items link to where they are used (surface and role), to related policies (Policy Rules), to AI quality gates and to cases (reports about a listing or a question).

## G.2 Review and approval matrix
| Item | Required reviewers |
|---|---|
| Help article (standard) | One editor |
| Help article on hiring, offers, data, money or safety | Editor plus the relevant subject owner (trust and safety, compliance, finance) |
| Announcement (info or important) | One editor |
| Announcement (critical) | Two approvers (including security or compliance as relevant) |
| Policy, terms, privacy notice, consent text | Compliance and legal, plus trust and safety for conduct items |
| Template or question bank (standard) | Subject expert |
| Template touching fairness, offers or legal text | Subject expert plus trust and safety or compliance and legal |
| Rubric, readiness formula, ATS rules | AI quality reviewer, compliance, and a subject expert; release gates must pass |
| Opportunity listing | Program manager; senior review for flagged listings |
| Event (standard) | Program manager and a second manager |
| Event involving fundraising or investors | Compliance and legal sign-off in addition |
| Matching and search rule set | AI quality reviewer and compliance (and trust and safety for fairness findings) |
Reviewers can't approve their own changes.

## G.3 Localization and accessibility
English first; translation workflow with glossaries; human-reviewed translations for sensitive items; right-to-left and script support for future languages; accessible content checks; alternative text for images; captions and transcripts for videos.

## G.4 Data and privacy
This area holds mostly non-personal content. Personal data appears only in registrations and selections (events) and in aggregate analytics. Those views are masked, purpose-bound and logged; exports contain only what is needed.

---

# Part H. Data model and APIs (summary)

### Content item (shared shape)
```json
{
  "id": "ART-2026-00412",
  "type": "help_article",
  "audience": ["employer"],
  "riskClass": "sensitive",
  "status": "approved",
  "version": 7,
  "locale": { "en": "published", "hi": "needs_review" },
  "owner": "stf_21",
  "reviewers": ["stf_11", "stf_33"],
  "effectiveAt": "2026-11-10T09:00:00+05:30",
  "nextReviewAt": "2027-05-10",
  "usedBy": [{ "surface": "employer.help", "ref": "posting-rules" }],
  "checks": { "readability": "ok", "links": "ok", "bannedTerms": "ok", "accessibility": "warn" }
}
```

### Endpoints (pattern)
- `GET /api/content/...` lists by type with filters; `GET /api/content/{id}`; `POST /api/content/{id}/drafts` (create a new version); `POST /api/content/{id}/submit`, `/approve`, `/request-changes`, `/publish`, `/schedule`, `/rollback`, `/archive`.
- Rubrics and matching: `POST /api/rubrics/{id}/test-run` and `/releases/{releaseId}/advance`, `POST /api/matching/rulesets/{id}/replay` and `/rollout`, with gate results returned in the response and enforced by the server.
- Opportunities and events: CRUD plus `POST /api/events/{id}/open-registration` (blocked without compliance sign-off), `/promote-waitlist`, `/selection/decision`.
- Delivery to the product through a **content delivery API** serving only published versions, cached with versioned keys and instant purge on rollback.

### Server rules
- Publishing requires the review matrix approvals, passing checks, and (for scoring and matching) passing release gates.
- Sensitive items can't publish in a language without a human-reviewed translation.
- Every publish, schedule, rollback and gate override writes an audit entry with who, what, why and approvers.
- Scheduled publishes run from the server clock with IST and the time zone shown; failures alert the owner.
- No deletes: items are archived; versions are immutable.

---

# Part I. States and error handling (common)

| State | Behavior |
|---|---|
| Editing conflict | Banner and merge view; locks on sensitive fields |
| Checks failing | Submit disabled; failing checks are listed with fixes |
| Approval pending | Chip with reviewers and age; **Remind** |
| Self-approval attempted | Refused with an explanation |
| Scheduled publish failed | Alert to the owner and supervisor; item stays at its previous published version |
| Rollback | One click; the previous version is restored instantly in the product; an audit entry and a notice to the owners |
| Content references a removed product feature | Flag "Needs review" with the affected surfaces |
| Translation missing | Product falls back to English with a notice (sensitive items follow the stricter rule in A.9) |
| Live incident | Rollouts frozen; only emergency edits allowed with super admin approval |
| Offline | Drafts autosave locally; publishing disabled with "You're offline." |
| Staging | Strip shows STAGING; separate content environment |

---

# Part J. Accessibility, performance and operations

- **Accessibility:** WCAG 2.1 AA for the admin tools in light and dark themes; keyboard-only editing and review; accessible diff views (text-based); the checks panel verifies accessibility of the content being published (headings, link text, alt text, contrast tokens, plain language).
- **Performance:** lists under 1.5 seconds (p75); editor loads under 2 seconds; preview renders under 1 second; content delivery API p95 under 100 ms from cache with instant purge on publish or rollback.
- **Reliability:** versioned, immutable content store with backups; the product reads only published versions and keeps working if the admin app is down; feature flags per content type.
- **Observability:** publishing failures, cache hit rates, link-check results and gate outcomes are monitored without personal data in payloads.
- **Telemetry (internal, aggregate):** time from draft to publish, review turnaround, freshness (share of items past review date), search misses and ticket topics. Not used to rank individuals.

---

# Part K. Security, privacy and audit

- **Admin app controls (subdomain):** single sign-on, mandatory two-factor (hardware key or authenticator app), 15-minute idle lock, 8-hour absolute session, host-scoped `Secure`, `HttpOnly`, `SameSite=Strict` cookies, strict CSP, no indexing, optional VPN or IP allowlist, server-side permission checks on every request, separate deployment and secrets from the public app.
- **Content integrity:** signed, versioned publishes; the product verifies signatures; no direct database edits; rich text is sanitized and restricted to an allowed set of blocks (no scripts or arbitrary HTML), and links to external sites are checked and marked.
- **Dual control:** review matrix above; two approvers for critical announcements and for gate overrides; super admin emergency unpublish is logged and reviewed afterwards.
- **Audit:** every edit, submit, approval, publish, schedule, rollback, gate override, export and registration view writes an append-only entry with staff ID, time, item ID and reason.
- **Fairness and bias safeguards:** disallowed inputs and proxies enforced in code, golden-set tests, shadow mode, exposure guardrails and independent review for scoring and matching.
- **Third-party content:** opportunities and event materials are labeled with their source, checked for scams and link health, and never presented as platform endorsement.
- **Regulatory:** confirm with counsel the status of terms and privacy notices, notice and acceptance rules for policy changes, rules on sponsored content and labeling, securities and fundraising event rules, consumer-protection and accessibility duties, and transparency about automated recommendation and scoring.

---

# Part L. Acceptance criteria and QA checklist

**Help and announcements**
- [ ] Publishing follows the review matrix; sensitive items need compliance or legal approval; self-approval is impossible.
- [ ] UI names resolve from tokens; stale hard-coded names are flagged; screenshots need alt text and pass the personal-data scan.
- [ ] Critical announcements need two approvers and can't be dismissed before acknowledgment; segments never use personal characteristics and small segments warn.
- [ ] Policy versions have effective dates and notice periods; acceptance records are stored where required; old versions remain viewable.
- [ ] Sensitive items never show an unreviewed machine translation; the fallback to English works.
- [ ] Copy checks block personal data, salary figures, candidate names and scores in email subjects and push text.

**Templates and question banks**
- [ ] Banned screening topics and biased terms can't be saved or published; the regression set passes.
- [ ] New versions apply to new copies only; existing copies keep their version; users see "A newer version is available."
- [ ] Question sets include diverse anchor examples; flagged questions (unclear or inappropriate reports) surface for review.
- [ ] Exit criteria and readiness checklist changes show their impact and don't alter in-progress startups unless migrated.

**Rubrics and scoring**
- [ ] A release can't advance without passing golden-set accuracy, fairness gaps, reviewer agreement and approvals; shadow and staged rollouts work; rollback is one click.
- [ ] The "what we don't score" list can't be shortened without compliance approval; no component uses personal characteristics.
- [ ] Readiness formula previews use synthetic profiles only; weights sum to 100; changes above the size limit need extra reviewers.
- [ ] Notice periods and public pages update with each release; sessions keep their rubric version label.
- [ ] ATS rules are deterministic and don't penalize career gaps or non-linear careers.

**Opportunities and events**
- [ ] Listings show verification level and last-verified date; unverified listings are hidden; scam checks block risky listings; expired listings disappear automatically.
- [ ] Sponsored listings and events are labeled, capped and never override verification or relevance order beyond the cap.
- [ ] Fundraising events can't open registration without compliance sign-off; priority access rules are published and enforced on the server.
- [ ] Selections use published criteria, conflict checks and decision records; sponsors never see attendee personal data or influence selection.
- [ ] Event day tools work offline-tolerantly for check-in; recordings need consent and show indicators; incidents reach on-call.

**Matching and search**
- [ ] Disallowed inputs and proxies are rejected by the server; adding an input needs compliance and AI quality approval.
- [ ] Mentor-verified startups appear first in investor Discover, as documented; changes to that rule need compliance approval.
- [ ] Bias tests (controlled variation of names, schools, locations) pass before release; exposure guardrails halt rollouts on breach.
- [ ] Featured placements are labeled and capped; exposure fairness settings work; kill switches fall back to transparent ordering.
- [ ] Experiments respect guardrails and can't hide verified items from users in harmful ways.

**Security and operations**
- [ ] SSO and two-factor are mandatory; permissions are enforced on the server; audit entries are append-only and complete.
- [ ] The product serves only published versions, signed and cached with instant purge on rollback; it keeps working if the admin app is down.
- [ ] Rich text is sanitized; links are checked; scheduled publishes run on time and alert on failure.

**Accessibility and performance**
- [ ] Keyboard-only editing and review are possible; AA contrast in both themes; published content passes accessibility checks.
- [ ] Performance targets in Part J are met.

---

# Part M. Build order (suggested)

1. **Admin foundation:** subdomain, SSO, two-factor, internal roles with server-side checks, append-only audit log, content store with immutable versions, review workflow engine, signed content delivery API with cache and purge.
2. **Help and Announcements:** articles, policy and legal pages with versions and acceptance, platform copy keys, announcements, translations workflow. The public product needs these from the start.
3. **Templates and Question Banks:** hiring defaults, readiness checklist, stage templates, interview question sets and drills, with the fairness checks connected to Policy Rules.
4. **Rubrics and Scoring Config** with golden sets, test runs, shadow and staged releases and the public pages, **before** any readiness score is visible to employers.
5. **Matching and Search Settings:** mentor matching first (your proposal's launch order is startups and mentors), then Discover ordering and Fit, job recommendations and employer hints, with fairness tests and exposure guardrails.
6. **Grants and Incubators:** listings, scam checks, link health and submissions.
7. **Events Management:** editor, eligibility and priority access, registrations, selections and event day tools, once anchor investors and real startups are on the platform.
8. Experiments, fairness audit dashboards, analytics, translations at scale.
9. Accessibility, performance and security review against the checklist, then a staged rollout (one content team first).

**Suggested first release:** the foundation, Help and Announcements, Templates and Question Banks (hiring defaults, readiness checklist, stage templates), Grants and Incubators (a small verified list), and mentor matching. Add Rubrics and Scoring Config with human review before the interview trainer's readiness score is shared with employers, and Events Management and investor Fit ordering once the investor module opens. Your proposal recommends launching with startups and mentors first and recruiting a few anchor investors and employers early.

**Reminder for the build:** the subdomain is an isolation layer, not an access control. Keep mandatory two-factor, server-side permission checks, the review matrix with no self-approval, immutable versions, signed content delivery with instant rollback, fairness gates for scoring and matching, labeled and capped sponsored placement, and the append-only audit log from day one. Get legal advice on policy and consent text, securities and fundraising event rules, sponsored content labeling, consumer and accessibility duties, and transparency about automated scoring and matching before launch.
