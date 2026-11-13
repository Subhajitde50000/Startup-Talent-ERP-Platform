# Community Discussion Design: `/community` (production spec)

A place where startup members, mentors, investors, job seekers and employers can talk to each other, ask questions, share what they've learned and find the right people, without turning the platform into a noisy feed, a spam channel or a legal risk. This file polishes the original idea, then specifies the pages, rules, safety model and the changes needed elsewhere in the platform.

It uses the same visual language as the rest of the product: ink, ivory, one gold accent.

---

## 0. The idea, polished

**Original idea:** one discussion page where all roles can communicate.

**Polished idea:** a **verified, topic-based community** called **Community**, built from **spaces** (topic and role rooms), **Q&A that rewards helpful answers**, **scheduled AMAs and office hours**, and **safe ways to connect**, with **clear rules for fundraising, hiring and advice** and **moderation built in from day one**. It connects to what the platform already does (mentors, jobs, events, stages) instead of competing with it.

### What changed from the raw idea, and why

| Raw idea | Polished version | Why |
|---|---|---|
| One page where everyone talks | **Spaces**: open topic spaces for everyone, plus role lounges and invite-only cohort groups | One big feed gets noisy and mixes audiences with different needs; spaces keep conversations useful |
| Anyone can post anything | **Verified-only posting**, with trust levels that rise with good behavior | Your platform's value is trust; unverified posting invites scams and spam |
| Open conversation about raising money | **No public fundraising solicitation.** Educational fundraising discussion is welcome; "invest in my startup" posts are not. Investor connection stays in Discover, intros and data rooms | Public offers to sell securities can create legal exposure and attract scams. Needs counsel's review |
| Free-form chat | **Typed posts**: Question, Discussion, Resource, Poll, Milestone, "Looking for", Feedback request, AMA | Structure makes answers findable and lets good answers rise |
| Direct messages between everyone | **Connect requests with limits and role rules**; no cold DMs to investors from founders; existing Messages stays the place for real relationships | Cold DMs are the biggest source of spam and harassment on professional networks |
| Open identities only | **Optional anonymous posting** in a few sensitive spaces (careers, interview prep, workplace questions), with identity visible to moderators | Candidates and employees ask better questions when they're safe; moderators can still act on abuse |
| Likes and points | **Helpful votes and accepted answers**, an "Expert answer" label for verified mentors in their verified areas, and no public leaderboards | Leaderboards reward volume over quality |
| Launch everything | **Phased rollout**: start with Q&A, Introductions and role lounges for startups and mentors, then add AMAs, anonymous posting and investor and employer spaces | Matches your proposal's plan (startups and mentors first) and keeps moderation workload manageable |

### Why a community helps your platform
- **Your proposal's main risk is the chicken-and-egg problem.** A community gives startups and mentors a reason to return before investors and employers arrive, and gives new members a first impression of the platform's quality.
- **It reduces mentor and support load** by letting common questions be answered once and found later.
- **It creates matches and warm introductions** that flow into your existing mentor, hiring and investor features.
- **It also adds risk and work:** moderation, legal review of investor and fundraising conversations, spam, and privacy duties. The design below treats these as part of the product, not afterthoughts.

---

## 1. Principles

- **Quality over volume:** structure, search and "accepted answer" matter more than activity counts.
- **Trust is the product:** verified identity, clear role labels, disclosed relationships and visible rules.
- **Right audience, right room:** investors, founders, mentors, candidates and employers have different needs and risks, so some rooms are mixed and some are role-only.
- **No back doors:** the community never replaces regulated or sensitive flows (fundraising, data rooms, offers, payments, verification, hiring decisions).
- **Safe by default:** strict defaults for new members, easy reporting, fast moderation, and proportionate responses.
- **Privacy first:** members control what the community sees about them; confidential information doesn't belong in posts; deletion and data rights work.
- **Calm and accessible:** readable, keyboard-friendly, no manipulation, no dark patterns, no infinite-scroll traps for sensitive spaces.
- **Fair:** no ranking, matching or visibility based on personal characteristics (age, gender, religion, caste, nationality, marital status, health).

---

## 2. Who can do what

All members must be signed in with a verified email. The table shows what each role can do by default; spaces can be stricter.

| Role (and status) | Read open spaces | Post and comment | Own role lounge | Host AMA | Connect requests |
|---|---|---|---|---|---|
| **Startup member** (any) | Yes | Yes after the starter limits (Part 6.2) | Founders lounge | No (mentors, investors, employers only) | Yes, with limits; cannot send to investors (see 7.3) |
| **Mentor** (verified) | Yes | Yes | Mentors circle | Yes | Yes |
| **Mentor** (pending) | Yes | Comment only | No | No | No |
| **Investor** (Basic or Full) | Yes | Yes (no solicitation rules apply to everyone) | Investors forum (Full level, or as configured) | Yes (Full) | Yes, with limits; accepts or ignores freely |
| **Job seeker** | Yes | Yes | Job seekers lounge | No | Yes, with limits |
| **Employer** (verified) | Yes | Yes | Employers and recruiters room | Yes | Yes, with limits |
| **Employer / mentor / investor unverified** | Read-only in open spaces | No | No | No | No |
| **Platform staff** | Yes | Official posts (labeled) | Moderation access | Yes | No |

Multi-role accounts choose which role they are posting as; the role chip on each post reflects it, and some spaces require a specific role.

---

## 3. Information architecture

### 3.1 Routes (relative to the main product domain)

| Page | Route | Purpose |
|---|---|---|
| Community home | `/community` | Your spaces, feed, today's events and AMAs, unanswered questions |
| Spaces directory | `/community/spaces` | Browse, join and follow spaces |
| Space | `/community/spaces/:slug` | One space's feed, rules, members, pinned posts |
| Post | `/community/posts/:postId` | A thread: question or discussion, answers and comments |
| Compose | `/community/new` | Create a post (opens as a modal from anywhere) |
| Search | `/community/search` | Search posts, spaces and people (consented fields) |
| Saved | `/community/saved` | Bookmarked posts |
| People | `/community/people/:handle` | Community profile card: role, verified badges, helpful answers, spaces |
| AMAs and events | `/community/events` | Upcoming AMAs and office hours (links to Events) |
| Community settings | `/community/settings` | Notifications, privacy, anonymous handle, blocked and muted, data |
| Guidelines | `/community/guidelines` | Rules, examples, how moderation works, how to appeal |

The sidebar of each role gets a **Community** item (with an unread dot) between Messages and Help.

### 3.2 Spaces

| Space type | Examples | Who can read | Who can post |
|---|---|---|---|
| **Open topic spaces** | Ask the community · Product and building · Go-to-market and sales · Fundraising basics (education only) · Legal and finance basics (general information) · Hiring and careers · Interview prep · Wins and milestones · Introductions · Tools and resources | All verified members (read-only for unverified) | All verified members, with role and trust limits |
| **Role lounges** | Founders lounge · Mentors circle · Investors forum · Job seekers lounge · Employers and recruiters room | Members of that role only | Members of that role |
| **Cohort and partner groups** | Incubator cohort, college placement cell, program alumni | Invite-only (managed with partners) | Members |
| **Official spaces** | Announcements · Platform tips · Help and feedback | All | Staff only (comments open) |
| **Event spaces** | A space created for a demo day or AMA series | Event registrants | Registrants |

Each space has: name, description, **rules** (short, specific), allowed post types, who can post, moderators (staff and trained volunteers), pinned posts, topic tags, language, and an on or off setting for anonymous posting.

---

## 4. Community home: `/community`

### 4.1 Layout
```
┌──────────┬────────────────────────────────────────────────────────────┐
│ Sidebar  │ Top bar: search · notifications · profile                  │
│          ├───────────┬────────────────────────────────┬───────────────┤
│          │ Left nav  │ Feed                           │ Right panel   │
│          │ 240px     │ [Start a post…]                │ 300px         │
│          │ Spaces    │ Tabs: For you · Following ·    │ Today         │
│          │ Following │ Unanswered · Top this week     │ AMAs          │
│          │ Saved     │ Posts…                         │ Open questions│
│          │ Mentions  │                                │ Guidelines    │
└──────────┴───────────┴────────────────────────────────┴───────────────┘
```
- 12-column grid, 24px gutters, feed max width 680px, page padding 32px. Cards are white, 1px `--stone-200` border, radius 12px.
- **Tablet:** the left nav becomes a drawer; the right panel moves under the feed. **Mobile:** single column, bottom tab bar (Home, Spaces, Post, Saved, Alerts); **Start a post** becomes a sticky button.

### 4.2 Left navigation
- **Your spaces** (joined and role lounges you can access) with unread counts.
- **Following** (tags, people, threads), **Saved**, **Mentions and replies**.
- **Browse all spaces**.
- Short **Guidelines** link and the "Report a problem" shortcut.

### 4.3 Feed
- **Start a post** card with prompts based on context ("Ask a question", "Share a milestone", "Look for a co-founder").
- **Tabs:**
  - **For you:** a transparent mix of spaces you follow, tags you follow and highly helpful threads; each item can show "Why you're seeing this" (for example "You follow #pricing").
  - **Following:** only what you follow, newest first.
  - **Unanswered:** questions with no accepted answer, oldest first, encouraging people to help.
  - **Top this week:** most helpful threads, not most viral (see 8.1).
- **Filters:** space, tag, post type, role of author (non-sensitive), language, stage tag (Idea, Prototype, Early revenue, Mature), has accepted answer.
- **Post card:** author (name or handle, role chip, verified badge, organization if shared), space, time, title, short preview, tags, counts (answers, helpful votes), type label, status chips (`Answered`, `Unanswered`, `AMA`, `Pinned`, `Official`), **Save**, **Share link**, overflow (**Mute thread**, **Report**, **Block author**).
- **No auto-play, no infinite surprise:** pagination loads 20 at a time with a **Load more** button after the first scroll, and the feed shows a "You're caught up" marker.

### 4.4 Right panel
- **Today:** AMAs and office hours starting soon with **Remind me**, and platform events (links to Events).
- **Questions to help with:** 3 unanswered questions that match the member's expertise or follows (mentors, verified experts and members who opted in), with **Answer**.
- **Spaces to try:** a few spaces suggested from role and interests (labeled `Suggested`).
- **Guidelines card:** three rules and a link; for new members, a first-visit checklist ("Introduce yourself", "Read the rules", "Set your handle").

### 4.5 First visit experience
A short welcome sheet: what Community is, the three rules that matter (be helpful, no fundraising pitches or ads, protect confidential information), pick spaces to join, and choose a handle and visibility settings. Required before the first post, optional before reading.

### 4.6 States
- **Empty (no spaces joined):** space suggestions and **Introduce yourself**.
- **No posts:** space-specific prompt and a pinned starter post.
- **Unverified member:** read-only banner with **Finish verification** (explains what unlocks).
- **Loading:** skeleton cards. **Error:** inline **Retry**. **Offline:** cached read-only feed with a banner.
- **New member limits reached:** message with the reset time (see 6.2).

---

## 5. Space page: `/community/spaces/:slug`

- **Header:** space name, description, member count (rounded), **Join** or **Joined**, **Follow** (notifications level), overflow (**Mute space**, **Report**, **Space info**).
- **Tabs:** **Posts** · **Questions** · **Resources** · **Events and AMAs** · **About and rules** · **Moderators** (names and roles of moderators, a way to contact them).
- **Pinned posts:** up to 3 (rules, how to ask, starter resources).
- **About and rules:** the short list of space rules with examples of good and bad posts, allowed post types, whether anonymous posting is allowed, and how to appeal.
- **Role lounges** show a banner "Only verified {role} members can read and post here."
- **Space stats (aggregate):** active members this week (rounded), answered rate. No member lists in sensitive spaces.
- **States:** archived space (read-only), locked space (temporary), space under moderation review (banner), no access (neutral message and **Request access** for invite-only groups).

---

## 6. Compose: `/community/new`

### 6.1 Flow
1. **Choose a space and post type** (only types allowed in that space are shown).
2. **Write:** title (for questions and discussions), body with a simple rich editor (bold, links, lists, code, quotes, images), tags (up to 5, suggested from a controlled list plus free tags reviewed for spam), attachments (images and PDFs, scanned, with a size cap and a **no confidential or personal documents** warning).
3. **Check:** the composer runs checks as you write (see 6.3) and shows results before you post.
4. **Options:** notify followers of tags (off by default), **allow comments from** (everyone or verified only), and **post anonymously** where the space allows it (6.4).
5. **Preview and post.** Drafts autosave and are private to you.

### 6.2 Post types

| Type | What it is | Special fields |
|---|---|---|
| **Question** | A specific question with answers; the author can mark one **Accepted answer** | Stage tag, "What have you tried?" prompt |
| **Discussion** | An open topic | None |
| **Resource** | A useful link, template or guide | Source, summary (required), disclosure if you are affiliated |
| **Poll** | A simple poll (2 to 6 options, closing time) | Results visible after voting or closing |
| **Milestone** | A win or lesson ("We reached our first 10 paying customers") | Optional metrics the author chooses to share; no fundraising offers |
| **Looking for** | Co-founder, tester, mentor, advisor, design help, first customers | Structured fields: what, stage, commitment, location or remote; no equity or investment offers in public text (see 7.2) |
| **Feedback request** | Ask for feedback on a landing page, pitch story or product idea | Warning against sharing confidential details, option to limit who can reply (verified mentors only) |
| **AMA or office hours** | Hosted thread with scheduled Q&A | Host, time, topics; see Part 9 |
| **Official post** | Announcements from staff | Labeled, comments optional |

**Starter limits for new members** (limits are based on verification and behavior, never personal characteristics):
- First 7 days or until 3 helpful interactions: up to 3 posts per day and 10 comments per day, no links in the first 2 posts, no attachments in the first post.
- Established members get higher limits. Mentors, investors and employers who are verified get normal limits from the start.
- Repeated removals or reports reduce limits automatically and trigger human review.

### 6.3 Live checks (explained, never silent)
- **Policy checks:** the same banned patterns used across the platform (fee requests, off-platform payment links, personal contact details, discriminatory content, scam phrases) from Policy Rules. Blocked content is explained with the rule and how to fix it.
- **Fundraising and solicitation check:** posts that look like offers to sell or solicit investment ("invest in us", "raising ₹2 Cr, DM me", terms, returns) are blocked in open and mixed spaces with the explanation in 7.2 and a link to the right place (profile visibility, Discover, intro requests).
- **Personal data detection:** emails, phone numbers, ID numbers, bank details: blocked or masked with an option to remove.
- **Confidentiality nudge:** a reminder when words like "NDA", "term sheet", "cap table" or "data room" appear ("Don't share confidential documents or terms in public posts").
- **Duplicate and similar questions:** shows related posts before you post.
- **Quality hints:** clearer title, add what you tried, add the stage ("AI suggestion" labeled, optional, with a reason; never auto-edits).
- **Rate limits:** shows what remains.
- **Language:** the post language is detected and shown; spaces can require English or accept multiple languages.

### 6.4 Anonymous posting (restricted)
Available only in spaces that enable it (for example Hiring and careers, Interview prep, Workplace questions, Job seekers lounge):
- The post shows a randomly assigned **per-space pseudonym** (not linked across spaces, rotated periodically) and a role chip only if the author chooses.
- **Moderators and compliance can see the real identity** for safety, legal or abuse reasons; this is stated at posting and in the guidelines.
- Not allowed for: business claims, reviews of named employers or individuals, hiring offers, resource promotion, polls, AMAs, and any post that names a specific person or company in a negative context. Posts that break these rules are removed and may remove the anonymity privilege.
- Anonymous posts have lower rate limits and are reviewed more quickly. Replies can be anonymous or named according to the space.

### 6.5 Edit, delete and history
- Authors can edit within 15 minutes freely and later with an "edited" label; the history is kept for moderators.
- Authors can delete their posts. Posts with accepted answers or many replies are replaced with "[deleted by author]" and the replies remain (without the author's content) to preserve threads; personal data is removed.
- Moderators can edit (remove personal data), lock, move, split or remove, always with a visible note.

### 6.6 States
- **Blocked by checks:** clear list of issues with fixes; the post can't be submitted until resolved.
- **Held for review:** for new members or flagged content, the post is held with a message and an estimated time; the author sees it, others don't.
- **Rate limited:** message with the reset time.
- **Upload failed or blocked by scanning:** reason and retry.
- **Offline:** drafts saved locally.

---

## 7. Rules for risky topics

### 7.1 Advice and expertise
- General information only. Spaces on legal, tax, finance, immigration and health topics carry a banner: "Community answers are opinions, not professional advice."
- **Expert answer** label: shown only to **verified mentors** answering in their **verified expertise areas** (from the credential review), with the area named. It isn't an endorsement by the platform. Other members can't buy or request the label.
- **Disclosure:** mentors, investors and employers must disclose a relationship when recommending something they benefit from (their own startup, portfolio company, paid service, employer, or a mentee). Disclosure is a required field on Resource and recommendation-style posts, shown as a label ("Disclosure: mentors this startup").
- No promotion of paid services or courses outside labeled Resource posts with disclosure; repeated promotion is spam.

### 7.2 Fundraising and investor conversations (needs counsel's review)
- **Allowed:** educational discussion ("How do SAFEs work?", "What do investors look for in a data room?"), lessons learned, general market commentary without recommendations, announcing a closed round in a Milestone post (facts only, no invitation to invest).
- **Not allowed in open or mixed spaces:** offers or solicitations to invest in a specific company, sharing terms or valuations to attract investors, promises of returns, "DM me to invest" calls, requests for investment from named investors, promotion of securities or schemes, and sharing confidential deal documents.
- **Where investor and founder conversations happen:** startup profile visibility, **Discover**, **intro requests**, **Messages** and **data rooms** with NDAs and audit trails. The checks point members there.
- **Investors forum** (investor-only): general market discussion, deal-flow practices, diligence questions without naming confidential companies, and co-investing conversations that don't solicit the public; subject to counsel's guidance. Startups can't read it.
- **Founders lounge** (founder-only): peer discussion about raising, with the same no-solicitation rule toward investors (investors aren't present), and no sharing of other parties' confidential information.
- **Platform disclaimer** appears on fundraising-related spaces: "The platform introduces members. It doesn't broker investments or give financial, legal or tax advice."

### 7.3 Connecting and messaging

| From → To | Allowed? | How |
|---|---|---|
| Any → Any (reply or mention in a public thread) | Yes | Normal replies |
| Founder or job seeker → Investor (private message) | **No cold messages.** Use **intro requests**, startup profile visibility and Discover | Keeps investor inboxes safe and matches the platform's consent model |
| Investor → Founder | Allowed as **Connect request** (the founder can accept, ignore or block) with daily limits | Investor outreach also remains available through Discover intro requests |
| Founder → Mentor | Allowed as **Connect request** or **Request mentorship** | Mentors can set "Not accepting" |
| Mentor → Founder | Connect request with limits (no solicitation of paid services in the request text) | Mentor invitations also exist in Discover Startups |
| Employer → Job seeker | **No cold messages in Community.** Employers use jobs, invitations and Talent Search (candidate-controlled discoverability) | Protects candidates and keeps hiring on the platform |
| Job seeker → Employer | Reply in public threads; applying through jobs | No private cold messages |
| Same-role peers | Connect request with limits | Peer networking |
A **Connect request** is a short message (up to 300 characters, no links, no contact details), limited per day, visible to the recipient with the sender's role, verification and reason. Accepting opens a conversation in Messages with normal safeguards (no fees, no off-platform pressure). Declined or ignored requests aren't visible to the sender beyond "No response", and repeated declines reduce the sender's limits.

### 7.4 Hiring and opportunities
- Job posts belong in **Jobs**, not in Community. A **Hiring** post must link to a verified platform job (the composer inserts a job card); posts with off-platform application links or contact details are blocked.
- "Looking for a co-founder or teammate" is allowed as a structured post without equity or salary promises in public text.
- Employer reviews and complaints about named employers or individuals are **not allowed** (defamation and privacy risk); members are directed to the formal report process, and general career discussion is welcome.
- No recruiting by employers in Job seekers lounge, and no solicitation of candidates by third-party agencies; recruiters who are verified as agencies follow the same rules as employers.

### 7.5 Confidentiality and privacy
- Don't post others' personal data, private messages, screenshots of private conversations, interview questions that breach confidentiality, or company confidential information.
- Posts that expose a private person are removed quickly and escalated (doxxing, harassment).
- Candidate-related content: no posting about specific applicants or rejected candidates.

---

## 8. Quality, discovery and reputation

### 8.1 Ranking (transparent, no personal characteristics)
- **For you** and **Top this week** use: helpful votes (weighted by voter trust, capped to prevent brigading), accepted answers, time since posting, engagement quality (replies from different members, not raw clicks), space relevance, and the member's follows. They never use personal characteristics, and they don't boost posts for being from paying or featured accounts (Community has no paid placement).
- **Why am I seeing this?** is available on every recommendation.
- **Anti-manipulation:** vote rings, reciprocal voting and sudden spikes are detected and discounted; accounts involved are reviewed.

### 8.2 Signals
- **Helpful** (on answers and posts), **Insightful**, **Thanks**, **Celebrate** (milestones). Reactions are lightweight; **Helpful** is the one that counts toward quality.
- **Accepted answer:** chosen by the asker; highlighted and pinned under the question.
- **Verified labels:** `Verified mentor`, `Verified investor`, `Verified employer`, `Verified startup`, `Investment Ready` (if the startup shares it), and `Expert answer (area)`.
- **Trust levels** (internal, simple): New → Member → Trusted → Moderator (volunteer). Levels depend on verification, account age, helpful contributions and absence of violations. They control limits and tools, never visibility of a person's characteristics, and aren't shown as scores. Members can see what unlocks the next level.
- **No public points or leaderboards.** A member's community profile shows counts of helpful answers and accepted answers as plain facts.

### 8.3 Search: `/community/search`
- **Scopes:** Posts, Spaces, People (consented fields only).
- **Filters:** space, type, tag, stage, role, date, language, answered or not.
- **Results:** title, snippet, space, author chip, answered status, helpful count. Sensitive spaces (role lounges, anonymous spaces) only appear to members with access.
- **Quality:** typo tolerance, synonyms (including common regional terms and transliterations), related searches, and a **no results** state that offers **Ask this question** (prefilled composer) with similar questions shown first.
- **Privacy:** queries aren't tied to accounts in analytics beyond short-lived personalization the member can turn off.

---

## 9. AMAs and office hours

- **Hosts:** verified mentors, Full-level investors, verified employers, and staff. Hosts apply or are invited; each AMA has a title, topic, time (IST with time zone shown), duration and rules ("No fundraising pitches", "Questions about our product only").
- **Flow:**
  1. **Announce:** pinned post and Events entry; **Remind me**.
  2. **Collect questions:** submission window with upvotes; moderators remove off-topic or promotional questions.
  3. **Live answering:** host answers in the thread during the window; the live view shows the next questions.
  4. **Summary:** the host or a moderator posts highlights and links; the thread stays searchable.
- **Safeguards:** hosts can't use AMAs to solicit investment or sell services; investor AMAs must follow the securities guidance; sponsored AMAs are labeled; hosts disclose affiliations.
- **Moderation:** a moderator is assigned to each AMA; comments can be slowed or locked.
- **Links:** AMAs appear in Events (mentor and investor Events pages) and can lead to **Book a session** (for mentors).

---

## 10. Post page: `/community/posts/:postId`

- **Header:** space link, title, author block (name or pseudonym, role chip, verified badges, disclosure label), time, edited note, tags, type chip, follow, save, share, overflow (**Report**, **Mute**, **Block author**, **Copy link**).
- **Body:** content with attachments (images preview, PDFs download with scan status).
- **Accepted answer** (for Questions): pinned at the top of the answers with a check and the date.
- **Answers and comments:**
  - Sort: **Most helpful** (default), **Newest**, **Oldest**.
  - Threaded replies up to 3 levels deep; collapse long threads; "Show more replies".
  - Each comment: author block, text, time, **Helpful**, reply, overflow (**Report**, **Block**, **Copy link**), edited note.
  - Comment composer with mention suggestions and the same live checks.
- **Moderator notes:** visible labels (for example "Edited by a moderator to remove personal data", "Locked: off-topic").
- **Related:** similar questions, related resources, "Ask a mentor" (opens the mentor Find page filtered by the tags) and "Book a session" for tag-relevant verified mentors (labeled `Suggested`).
- **Share:** copy link; signed-out visitors can't view posts (the community is for members), except official public pages if you choose.
- **States:** locked thread (no new comments), deleted post, post under review (hidden from others, visible to author), content removed by a moderator (a neutral placeholder with the rule), blocked author (collapsed), restricted space (no access message).

---

## 11. Community profile and settings

### 11.1 Community profile: `/community/people/:handle`
Shows only what the member chose to share: display name or handle, role chip, verified badges, headline, organization (optional), expertise tags (verified for mentors), spaces they moderate or host, counts of helpful and accepted answers, recent public posts and answers (not anonymous ones), **Connect** (subject to 7.3), **Follow**, **Report**, **Block**. Mentors show **Book a session**; startups can show a link to their public profile if they chose visibility; investors and employers show only what they allow. Job seekers show nothing beyond their handle and posts unless they choose more.

### 11.2 Community settings: `/community/settings`
- **Identity:** handle (unique, can change rarely), display name choice (real name or handle), photo, headline, whether your organization shows.
- **Visibility:** who can see your community profile (members, followers, nobody), whether people can **Connect** with you, who can mention you, whether your posts appear in search.
- **Anonymous posting:** on or off for the spaces that allow it; shows what moderators can see.
- **Notifications:** replies, mentions, accepted answers, followed threads, AMA reminders, space digests, weekly summary; email and in-app and push options; quiet hours; frequency caps; digests.
- **Blocked and muted:** people, spaces, tags, words (personal mute list), with **Unblock**.
- **Safety:** filter strictness for comments on your posts, limit who can reply (verified members only), and **Report a problem**.
- **Data:** download my community data, delete my posts, delete my community profile (posts are deleted or anonymized per the rule in 6.5), consent history.
- **Role-based visibility defaults:** defaults are privacy-protective (profile visible to members only, Connect requests on with limits, search off for investors and employers unless they opt in).

### 11.3 Saved: `/community/saved`
Bookmarked posts and answers with search, tags and notes (private).

### 11.4 Guidelines: `/community/guidelines`
Plain-language rules with examples, what is removed and why, the action ladder (guidance, warning, limits, removal, suspension), how reports work, how to appeal, and how to contact moderators. Linked from every compose and report flow.

---

## 12. Moderation and safety model

### 12.1 Layers
1. **Prevention:** clear rules, live compose checks, starter limits, role gating, verification, link and attachment scanning.
2. **Automatic detection:** policy rules and classifiers flag spam, scams, fee requests, solicitation, harassment, personal data and impersonation; flagged items are held, hidden or sent for review according to severity. Only safe, temporary actions are automatic; people decide removals and suspensions.
3. **Community reporting:** every post, comment and profile has **Report** with categories (spam or ad, scam or fee request, solicitation of investment, harassment, discrimination, privacy violation, impersonation, off-topic, misinformation, other).
4. **Moderators:** staff plus trained volunteer moderators (verified members with clean records, onboarded with training, limited tools, supervised by staff). Volunteer moderators can hide posts pending review, lock threads, move posts and flag for staff; they can't suspend, ban or see private identities.
5. **Staff review:** reports and escalations flow into the platform's **Moderation queue** (admin) with severity S1 to S4, policy IDs, snapshots and the action ladder; appeals go through **Appeals**.

### 12.2 Severity examples
| Severity | Examples in Community |
|---|---|
| S1 | Child safety, credible threats, self-harm risk, doxxing with imminent harm |
| S2 | Investment solicitation or securities promotion, scams and fee requests targeting candidates or founders, impersonation of the platform or staff, coordinated harassment, discriminatory content |
| S3 | Misleading claims, undisclosed promotion, off-platform contact requests, privacy violations without harm |
| S4 | Off-topic, formatting, minor rule breaks |

### 12.3 Member tools
**Report**, **Block** (hides their content and prevents Connect), **Mute** (words, spaces, tags, people), **Hide comments on my posts**, **Limit replies**, **Download my data**. Reporters get an acknowledgment and an outcome message; reporter identity is never shown to the reported member.

### 12.4 Moderator tools (in-space and in the admin console)
Hold for review, edit (remove personal data), lock, move, split thread, remove with reason code, warn, limit posting, suspend from a space, escalate; **moderator notes** on members; **transparency labels** on moderated content; space-level slow mode and approval mode; bulk cleanup for confirmed spam waves (with preview).

### 12.5 Safety for sensitive moments
- **Distress posts** (self-harm, severe stress) show supportive resources and route to staff for a careful response; the author is not penalized.
- **Anonymous posts** have shorter review times and quicker removal for abuse.
- **Harassment across roles** (for example a mentor or investor behaving inappropriately) gets higher priority; staff can restrict Connect and mentions.
- **Wellbeing for moderators:** blur by default for media, exposure limits, break reminders, skip and hand-off (as in the admin Settings spec).

### 12.6 Transparency
Periodic aggregate statistics (reports, removals, appeals, response times) as counsel advises; guidelines changes are versioned with notice; members see why content was removed and how to appeal.

---

## 13. Notifications and digests

| Event | Default channels |
|---|---|
| Reply or comment on your post | In-app, email (digest) |
| Your answer was marked accepted or helpful (aggregated) | In-app |
| Mention | In-app, push |
| New answer to a thread you follow | In-app (digest) |
| AMA reminder (1 day, 1 hour) | In-app, email |
| Connect request received or accepted | In-app, email |
| Your post was held, removed or restored (with the reason) | In-app, email |
| Space digest and weekly summary of unanswered questions you could help with | Email (opt-in) |
| Moderator notices (volunteer moderators) | In-app |

Rules: caps on frequency, quiet hours, digests by default for low-priority items, no notification text with sensitive content, protected notices (safety and policy actions on your account) can't be muted. A **Community** category is added to every role's Notifications page and Settings.

---

## 14. Data model and APIs (summary)

### Core entities
- **Space:** id, slug, name, type, audience rule (roles, verification level, invite-only), rules, allowed post types, anonymous allowed, language, status.
- **Membership:** user, space, role in space (member, moderator), notification level.
- **Post:** id, space, author (user id), role context, anonymity flag and pseudonym id, type, title, body (sanitized), tags, attachments, status (published, held, removed, locked), accepted answer id, counts, timestamps, language, disclosure.
- **Comment:** id, post, parent, author, body, status, counts.
- **Reaction and Helpful vote:** user, target, type, weight (trust-based, capped).
- **Follow and Bookmark:** user, target.
- **Connect request:** from, to, message, status, reason codes, limits counters.
- **Report:** reporter (protected), target, category, status, linked moderation case.
- **Trust level:** user, level, signals (verification, age, helpful rate, violations), history.
- **Pseudonym:** user, space, handle, rotation date (access restricted).
- **AMA:** post, host, schedule, state, linked event.

### Endpoints (pattern)
`GET /api/community/feed?tab=&space=&tag=&type=&cursor=`, `GET /api/community/spaces`, `GET /api/community/spaces/{slug}`, `POST /api/community/posts` (runs the checks server-side; returns violations), `GET /api/community/posts/{id}`, `POST /api/community/posts/{id}/comments`, `POST /api/community/posts/{id}/accept/{commentId}`, `POST /api/community/votes`, `POST /api/community/follows`, `POST /api/community/reports`, `POST /api/community/connect`, `GET /api/community/search`, `GET/PATCH /api/community/me/settings`, `POST /api/community/ama`. Every write is validated on the server for role, verification, space rules, rate limits and policy checks; the client checks are conveniences.

### Search and storage
- Full-text search with filters, indexed per space with access control applied at query time (role lounges and anonymous spaces are never leaked into results).
- Attachments stored with virus scanning and expiring links; images re-encoded to strip metadata.
- Content retained per policy; deleted content is purged or anonymized per data rights and legal holds.

### Performance targets
Feed under 1.5 seconds (p75); post page under 1.2 seconds; search results under 600 ms; posting confirmation under 800 ms; feed pages cached per user with invalidation; rate-limited APIs.

---

## 15. States and edge cases (summary)

| State | Behavior |
|---|---|
| Unverified member | Read-only in open spaces; no role lounges; banner to finish verification |
| Verification lapsed | Posting paused with a clear explanation and a link to renew; existing posts remain |
| Account suspended | Read-only or hidden per moderation action; posts stay unless removed by policy |
| Role changed | Access to role lounges updates; past posts keep the old role label |
| User deleted account | Posts anonymized or removed per the rule; helpful counts removed |
| Moderated content | Placeholder with the rule and appeal link |
| High-volume event (AMA or launch) | Slow mode and approval mode for the space; queue banners |
| Spam wave | Temporary new-member limits, link blocking and held posts; staff alerted |
| Space archived | Read-only and searchable |
| Search index lag | Banner "Results may be a few minutes behind" |
| Offline | Cached feed, drafts saved locally |

---

## 16. Accessibility, localization and design details

- **Visual:** same tokens as the product (`--ink #0F1B2D`, `--ivory #FAF8F4`, `--gold #B8955A`, `--gold-dark #9A7A45`, `--gold-tint #F3EBDD`, stone neutrals, status colors). Role chips use neutral stone with an icon; `Verified` badges use gold-tint with a check; `AI suggestion` pills use gold-tint with a sparkle. Titles in `Fraunces`, body in `Inter`.
- **Accessibility:** WCAG 2.1 AA; every action is keyboard operable (reply, helpful, save, report); heading structure on posts; live regions for new replies announce politely; images require alt text (composer prompts for it); motion respects `prefers-reduced-motion`; text scales to 200 percent; touch targets at least 44×44px.
- **Localization:** English first; spaces can be language-specific; posts show language; on-demand translation (labeled `AI`) with the original visible; Indian languages and mixed-language posts supported in search and moderation.
- **Mobile:** composer is full-screen; swipe for save; bottom sheet for filters; push for mentions only by default.

---

## 17. Changes needed elsewhere in the platform

### Public product (all roles)
- **Sidebar:** add **Community** to every role's sidebar; unread dot.
- **Notifications:** add a **Community** category (replies, mentions, accepted answers, AMA reminders, connect requests).
- **Settings:** add a **Community** section (link card to `/community/settings`).
- **Help:** add Community articles (rules, how to ask, anonymous posting, fundraising rules, reporting).
- **Mentor pages:** **Impact and Reviews** can show verified Expert answers and AMA hosting (counts); **Events** lists AMAs; mentor **Find** and **Profile** can show "Active in Community" (consented).
- **Startup pages:** stage toolkit pages can link to relevant spaces ("Ask founders about pricing"); the **Investor Hub** prepare mode can link to Fundraising basics (education only).
- **Investor pages:** a link to the Investors forum; Events lists AMAs; Discover and intros stay the path for founders.
- **Job seeker and employer pages:** links to Hiring and careers and Interview prep; employers can host AMAs; jobs appear in Community only as job cards.

### Admin console
| Admin page | Change |
|---|---|
| **Policy Rules and Blocklists** (`/policies`) | Add community policies (for example P-C1 investment solicitation, P-C2 undisclosed promotion, P-C3 employer or individual naming, P-C4 anonymous-abuse), blocklists for solicitation phrases, and rules for personal data patterns in posts |
| **Moderation Queue** (`/moderation`) | New content types `Post`, `Comment`, `Community profile`, `Connect request`; severity mapping; volunteer moderator escalations; space-level actions |
| **Reports** (`/reports`) | Community report categories and reporter protection |
| **Appeals** (`/appeals`) | Community decisions appealable |
| **Fraud and Abuse** (`/fraud`) | Spam networks, vote rings, fake accounts, Connect-request abuse |
| **Users and Organizations** (`/users`) | Community status on the user detail (trust level, restrictions, volunteer moderator flag, pseudonym access for compliance, with purpose and logging) |
| **Content** (`/content`) | Guidelines, space rules and help articles as managed content |
| **Events Management** (`/events`) | AMAs as an event type; host approval; legal checklist for investor AMAs |
| **Matching and Search** (`/matching`) | Community ranking rules, disallowed inputs, exposure fairness, anti-manipulation settings |
| **Platform Configuration** (`/config`) | Flags for `community.enabled`, per-space enablement, anonymous posting, Connect requests, rate limits and starter limits |
| **Platform Analytics** (`/analytics`) | Community health metrics (aggregate): weekly active members by role, questions answered rate and time to first answer, accepted answer rate, report and removal rates, cross-role participation, retention effect on new members (suppressed for groups under 10) |
| **Compliance** (`/compliance`) | Processing record and DPIA for Community, retention schedule for posts and reports, intermediary and grievance obligations, legal review record for investor and fundraising rules, anonymous posting access policy |
| **AI Quality** (`/ai-quality`) | Review of any classifiers or AI help used in moderation or compose hints (bias tests, golden sets) |
| **Staff** (`/staff`) | Moderator roles and training requirements (community moderator permission set; volunteer moderators are external users with a limited, audited tool set) |

---

## 18. Metrics (aggregate only; no leaderboards)

| Goal | Metric |
|---|---|
| Usefulness | Share of questions answered within 24 hours; accepted answer rate; helpful votes per answer |
| Quality | Report rate per 1,000 posts; removal rate; appeal overturn rate; repeat violation rate |
| Cross-role value | Share of threads with participants from 2 or more roles; mentor session bookings after Community interactions (aggregate, consented) |
| Health | Weekly active members by role, new member first-post rate, retention of members who got an answer in their first week |
| Safety | Time to first moderator action by severity, spam caught before reaching feeds, anonymous-post violation rate |
Guardrails: metrics never rank individuals, and groups under 10 are suppressed.

---

## 19. Phased rollout

| Phase | Scope | Why |
|---|---|---|
| **1. Foundation (launch with startups and mentors)** | Community home, open spaces (Ask the community, Introductions, Product and building, Go-to-market, Wins), Founders lounge, Mentors circle, Question and Discussion post types, accepted answers, search, saved, reporting and blocking, starter limits, live compose checks, guidelines, staff moderation with the admin queue | Smallest useful and safest version; matches your launch plan |
| **2. Depth** | Resource, Poll, Milestone, Looking for, Feedback request; mentor Expert answer labels; AMAs and office hours; volunteer moderators; weekly digests; spaces for stages | Adds value for mentors and startups once there is activity |
| **3. Broader audiences** | Job seekers lounge, Hiring and careers, Interview prep, Employers room, anonymous posting in selected spaces, Connect requests | Needs mature moderation and verified employers |
| **4. Investors and partners** | Investors forum, Fundraising basics spaces with legal-reviewed rules, cohort and partner groups, event spaces | Needs counsel's sign-off and anchor investors |
Seed each space with starter content and a few trusted hosts before opening it. Keep new member limits tight for the first months.

---

## 20. Acceptance criteria and QA checklist

**Access and roles**
- [ ] Only verified members can post; unverified members are read-only; role lounges and invite-only groups are enforced on the server, including in search and notifications.
- [ ] Employers and job seekers can't send cold private messages through Community; founders can't send Connect requests to investors; investors' and mentors' Connect requests follow limits and recipients can block.
- [ ] Multi-role users choose the posting role; labels reflect it; role changes update access immediately.

**Posting and checks**
- [ ] The composer blocks fee requests, off-platform payment links, personal contact details, discriminatory content, and investment solicitation in open and mixed spaces, with explanations and redirects.
- [ ] Personal data detection masks or blocks emails, phone numbers, ID numbers and bank details.
- [ ] Starter limits apply and lift with verification and good behavior; repeated violations reduce limits and trigger review.
- [ ] Anonymous posting works only in enabled spaces, uses per-space pseudonyms, shows lower limits, and gives moderators and compliance (with purpose and logging) the real identity.
- [ ] Disclosure fields are required for resource and recommendation posts by mentors, investors and employers.
- [ ] Hiring posts must link to a verified platform job.

**Quality and discovery**
- [ ] Ranking uses only allowed signals; no paid placement exists; "Why am I seeing this?" works; vote rings are detected and discounted.
- [ ] Accepted answers pin correctly; Expert answer labels appear only for verified mentors in verified areas.
- [ ] Search enforces access control at query time; role lounges and anonymous spaces never leak.
- [ ] No public points or leaderboards exist.

**Safety and moderation**
- [ ] Reports reach the admin Moderation queue with severity and policy IDs; reporter identity is protected; reporters and authors receive outcome messages and appeal links.
- [ ] Volunteer moderators have limited tools, can't suspend or ban, and can't see private identities.
- [ ] Automatic actions are temporary and reversible; people decide removals, suspensions and bans.
- [ ] Distress and S1 content follows the safety protocol and never shows media to general moderators.

**Privacy and data**
- [ ] Member controls (visibility, search, Connect, mentions, blocks, mutes) work as specified; defaults are privacy-protective.
- [ ] Deletion and data-rights requests remove or anonymize posts, comments and profile data per the rules, and legal holds block deletion.
- [ ] Attachments are scanned, images re-encoded to strip metadata; no sensitive documents are accepted.

**Accessibility and performance**
- [ ] Keyboard-only use covers composing, replying, voting, saving, reporting and blocking; AA contrast; alt text prompts; reduced motion respected.
- [ ] Performance targets in section 14 are met on typical mobile connections.

---

## 21. Decisions to confirm before building

1. **Investor and founder interaction:** are you comfortable with no public fundraising posts and no founder-to-investor cold connects? (Recommended, and subject to counsel's review.)
2. **Anonymous posting:** include it in Phase 3 only, or skip it? It's valuable for job seekers but adds moderation work and needs a clear identity-access policy.
3. **Volunteer moderators:** use verified, trained mentors as volunteer moderators from Phase 2, or keep moderation staff-only at first?
4. **Employers and job seekers in the same space:** keep separate lounges (recommended), or allow open mixing from the start?
5. **Public visibility:** keep the community members-only (recommended), or make selected posts visible to search engines later for growth?
6. **Languages:** English-only at launch, or add Hindi and Bengali spaces early?
7. **Paid features:** keep Community free of any paid placement (recommended), or allow labeled sponsored AMAs from partners?

---

## 22. Build order (suggested)

1. **Foundations:** spaces and membership model, role and verification gating on the server, post and comment APIs with server-side checks, rate limits and starter limits, policy-rule integration, report and moderation queue integration, search with access control.
2. **Community home, space and post pages** with the compose flow (Question and Discussion), accepted answers, helpful votes, saved, follows.
3. **Safety tooling:** live compose checks, personal data detection, blocking and muting, guidelines page, held-for-review flow, admin moderation and appeals integration, moderator roles and volunteer tooling (Phase 2).
4. **Notifications, settings and community profile**, and the sidebar entries for each role.
5. **Founders lounge and Mentors circle** with seeded content and trusted hosts; launch Phase 1.
6. **Phase 2 features:** more post types, Expert answer labels, AMAs, digests.
7. **Phase 3 and 4:** job seeker and employer spaces, anonymous posting and Connect requests, then investor spaces and partner groups after legal sign-off.
8. Accessibility, performance and security review against the checklist, then a staged rollout (invite a small group of startups and mentors first).

**Reminder for the build:** every rule above must be enforced on the server, not only in the UI: verification and role checks, space access in search and notifications, rate limits, policy checks, anonymous identity protection and the no-cold-message rules. Get legal advice before launch on investor and fundraising conversations, advice disclaimers, anonymous posting and identity access, intermediary and grievance obligations, defamation and privacy risk for user content, data retention and deletion, and moderation of minors or distressed users.
