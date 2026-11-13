# Senior Frontend Engineering Audit: Job Seeker Role
**Platform:** Startup Talent ERP Platform (`Forma — Workspace`)  
**Role Audited:** Job Seeker  
**Audit Scope:** Route Prefix `/jobseeker` and all 30 nested/dynamic routes  
**Date of Audit:** November 8, 2026  
**Auditor:** Senior Frontend Architect, UI/UX Reviewer & QA Lead  
**Audit Status:** Completed  

---

## 1. Audit Scope & Executive Summary

### 1.1 Scope
This audit is dedicated strictly to the **Job Seeker** role within the Startup Talent ERP Platform. The audit encompasses the `/jobseeker` route tree, application layouts, shared components, page shells, navigation flows, interactive controls, form elements, responsive viewports (1440px, 1024px, 768px, 390px), accessibility compliance (WCAG 2.1 AA), performance metrics, and design token adherence. In strict compliance with audit restrictions, no application source code was modified during this audit.

### 1.2 Executive Summary
The Job Seeker role is implemented through six large client-side monolithic components located under `frontend/app/jobseeker/`:
1. `dashboard.jsx` (21.4 KB) — Powers Dashboard overview, application metrics, profile readiness card, recommended jobs, and interview reminders.
2. `jobseeker-find-apply.jsx` (99.5 KB) — Powers Job Search, Job Detail, Application Form, Company Profiles, Startups Directory, Saved Jobs, and Search Alerts.
3. `jobseeker-applications-offers.jsx` (81.6 KB) — Powers Application Tracker (Kanban/Table), Application Detail, Interviews Schedule, Offers List, Offer Detail, and Offer Comparison.
4. `jobseeker-resume-maker.jsx` (60.5 KB) — Powers My Resumes, Resume Builder, Inline Resume Editor, ATS Score Check, and Job Description Tailoring.
5. `jobseeker-interview-trainer.jsx` (115.1 KB) — Powers AI Interview Trainer Home, Practice Setup, Live Session, Feedback Report, History, Quick Drills, Rubric, and Job Readiness Score.
6. `jobseeker-shared-pages.jsx` (70.2 KB) — Powers Candidate Messages & Recruiter Threads, and Job Seeker Account & Career Settings.

**Total Codebase Footprint:** 448.3 KB across 6 monolithic client files.

While the visual design conveys a refined, high-end editorial tone using the platform palette (Ink `#0F1B2D`, Warm Background `#FAF8F4`, Accent Gold `#B8955A`), the engineering audit uncovered **severe architectural, navigation, responsive layout, and accessibility defects**:

1. **Root Route 404 Failure (P1):** Visiting `/jobseeker` returns an HTTP 404 Not Found error because `frontend/app/jobseeker/page.js` is completely missing from the codebase.
2. **Complete Mobile & Tablet Navigation Blackout (P1):** Across all 29 accessible routes, the desktop sidebar is hidden below 1024px (`hidden lg:flex`) with **zero replacement navigation**: no hamburger trigger, no slide-out drawer, no mobile bottom bar, and no back button. Mobile and tablet candidates are completely trapped on whichever page they load.
3. **Severe Multi-Viewport Layout Blowouts (P2):**
   - `/jobseeker/messages` expands to **1338px scrollWidth** on **1024px Laptop viewports** (**+314px horizontal blowout**), causing an inescapable horizontal scrollbar on standard laptops due to a rigid 3-column grid container.
   - 9 additional routes blow out on **390px Mobile viewports**, including `/jobseeker/resumes` (**661px scrollWidth**, +271px overflow), `/jobseeker/resumes/[resumeId]` (**662px scrollWidth**, +272px overflow), `/jobseeker/applications/[applicationId]` (**575px scrollWidth**, +185px overflow), and `/jobseeker/dashboard` (**520px scrollWidth**, +130px overflow).
4. **100% Buttons Missing `type="button"` (P2):** All 557 `<button>` elements rendered across the role lack an explicit `type` attribute, defaulting to `type="submit"` and violating HTML/a11y standards.
5. **92.3% Unlabelled Form Controls (P2):** 84 out of 91 inputs, textareas, and filter selects lack programmatic labels (`id` + `<label htmlFor="...">` or `aria-label`).
6. **Dead Links & Fake Actions (P1/P3):** Dead `href="#"` links on Company Profiles (`"View all 1 jobs →"`), Readiness (`"How scoring works"`, `"Request a review"`), and Interview Reports (`"Rubric →"`). The user avatar profile card at the bottom of the sidebar has a dummy `onClick={() => {}}` in 5 files and no handler in `dashboard.jsx`, rendering the "switch role" action completely dead.
7. **Extreme Micro-Typography (P2):** Discovered **530 instances** of sub-12px micro-text (`text-[9px]`, `text-[10px]`, `text-[11px]`), violating WCAG 2.1 AA legibility minimums.
8. **27 Hardcoded Hex Colors & Six-Fold Code Duplication (P2):** UI primitives (`Btn`, `Card`, `JobSeekerShell`, header, search, user pill) are duplicated across all 6 files with 27 hardcoded hex values instead of centralized Tailwind tokens.

---

## 2. Pages Discovered vs. Pages Tested

### 2.1 Route Inventory Table

All 30 discovered routes were systematically evaluated via direct HTTP probing and headless browser automation (Microsoft Edge via Playwright):

| # | Route | Component File | Page Prop | HTTP Status | Direct Access | Viewports Tested | Render Status |
|---|---|---|---|---|---|---|---|
| 1 | `/jobseeker` | *Missing* (`page.js` missing) | — | **404** | ❌ Fail | 1440, 1024, 768, 390 | **404 Not Found** |
| 2 | `/jobseeker/dashboard` | `dashboard.jsx` | — | 200 | ✅ Pass | 1440, 1024, 768, 390 | Rendered (Overflow at 390) |
| 3 | `/jobseeker/jobs` | `jobseeker-find-apply.jsx` | `jobs` | 200 | ✅ Pass | 1440, 1024, 768, 390 | Rendered (Overflow at 390) |
| 4 | `/jobseeker/jobs/[jobId]` | `jobseeker-find-apply.jsx` | `job-detail` (`job-1`) | 200 | ✅ Pass | 1440, 1024, 768, 390 | Rendered |
| 5 | `/jobseeker/jobs/[jobId]/apply` | `jobseeker-find-apply.jsx` | `apply` (`job-1`) | 200 | ✅ Pass | 1440, 1024, 768, 390 | Rendered |
| 6 | `/jobseeker/companies/[companyId]` | `jobseeker-find-apply.jsx` | `company` (`comp-1`) | 200 | ✅ Pass | 1440, 1024, 768, 390 | Rendered (Dead `#` links) |
| 7 | `/jobseeker/startups` | `jobseeker-find-apply.jsx` | `startups` | 200 | ✅ Pass | 1440, 1024, 768, 390 | Rendered |
| 8 | `/jobseeker/saved` | `jobseeker-find-apply.jsx` | `saved` | 200 | ✅ Pass | 1440, 1024, 768, 390 | Rendered |
| 9 | `/jobseeker/alerts` | `jobseeker-find-apply.jsx` | `alerts` | 200 | ✅ Pass | 1440, 1024, 768, 390 | Rendered (Overflow at 390) |
| 10 | `/jobseeker/applications` | `jobseeker-applications-offers.jsx` | `applications` | 200 | ✅ Pass | 1440, 1024, 768, 390 | Rendered (Overflow at 390) |
| 11 | `/jobseeker/applications/[applicationId]` | `jobseeker-applications-offers.jsx` | `application-detail` (`app-1`) | 200 | ✅ Pass | 1440, 1024, 768, 390 | Rendered (Overflow at 390) |
| 12 | `/jobseeker/interviews` | `jobseeker-applications-offers.jsx` | `interviews` | 200 | ✅ Pass | 1440, 1024, 768, 390 | Rendered |
| 13 | `/jobseeker/offers` | `jobseeker-applications-offers.jsx` | `offers` | 200 | ✅ Pass | 1440, 1024, 768, 390 | Rendered |
| 14 | `/jobseeker/offers/[offerId]` | `jobseeker-applications-offers.jsx` | `offer-detail` (`off-1`) | 200 | ✅ Pass | 1440, 1024, 768, 390 | Rendered (Overflow at 390) |
| 15 | `/jobseeker/offers/compare` | `jobseeker-applications-offers.jsx` | `compare` | 200 | ✅ Pass | 1440, 1024, 768, 390 | Rendered |
| 16 | `/jobseeker/resumes` | `jobseeker-resume-maker.jsx` | `resumes` | 200 | ✅ Pass | 1440, 1024, 768, 390 | Rendered (Overflow at 390) |
| 17 | `/jobseeker/resumes/new` | `jobseeker-resume-maker.jsx` | `new` | 200 | ✅ Pass | 1440, 1024, 768, 390 | Rendered |
| 18 | `/jobseeker/resumes/[resumeId]` | `jobseeker-resume-maker.jsx` | `editor` (`res-1`) | 200 | ✅ Pass | 1440, 1024, 768, 390 | Rendered (Overflow at 390) |
| 19 | `/jobseeker/resumes/[resumeId]/ats` | `jobseeker-resume-maker.jsx` | `ats` (`res-1`) | 200 | ✅ Pass | 1440, 1024, 768, 390 | Rendered |
| 20 | `/jobseeker/resumes/[resumeId]/tailor` | `jobseeker-resume-maker.jsx` | `tailor` (`res-1`) | 200 | ✅ Pass | 1440, 1024, 768, 390 | Rendered |
| 21 | `/jobseeker/practice` | `jobseeker-interview-trainer.jsx` | `practice` | 200 | ✅ Pass | 1440, 1024, 768, 390 | Rendered |
| 22 | `/jobseeker/practice/new` | `jobseeker-interview-trainer.jsx` | `new` | 200 | ✅ Pass | 1440, 1024, 768, 390 | Rendered |
| 23 | `/jobseeker/practice/drills` | `jobseeker-interview-trainer.jsx` | `drills` | 200 | ✅ Pass | 1440, 1024, 768, 390 | Rendered |
| 24 | `/jobseeker/practice/history` | `jobseeker-interview-trainer.jsx` | `history` | 200 | ✅ Pass | 1440, 1024, 768, 390 | Rendered |
| 25 | `/jobseeker/practice/rubric` | `jobseeker-interview-trainer.jsx` | `rubric` | 200 | ✅ Pass | 1440, 1024, 768, 390 | Rendered |
| 26 | `/jobseeker/practice/[sessionId]` | `jobseeker-interview-trainer.jsx` | `session` (`sess-1`) | 200 | ✅ Pass | 1440, 1024, 768, 390 | Rendered |
| 27 | `/jobseeker/practice/[sessionId]/report` | `jobseeker-interview-trainer.jsx` | `report` (`sess-1`) | 200 | ✅ Pass | 1440, 1024, 768, 390 | Rendered (Overflow at 390, Dead `#`) |
| 28 | `/jobseeker/readiness` | `jobseeker-interview-trainer.jsx` | `readiness` | 200 | ✅ Pass | 1440, 1024, 768, 390 | Rendered (Dead `#` links) |
| 29 | `/jobseeker/messages` | `jobseeker-shared-pages.jsx` | `messages` | 200 | ✅ Pass | 1440, 1024, 768, 390 | Rendered (Blowout at 1024 & 390) |
| 30 | `/jobseeker/settings` | `jobseeker-shared-pages.jsx` | `settings` | 200 | ✅ Pass | 1440, 1024, 768, 390 | Rendered |

- **Total Routes Discovered:** 30
- **Total Pages Tested in Headless Browser:** 30
- **Pages Loading Successfully (200 OK):** 29
- **Pages Failing to Load (404 Not Found):** 1 (`/jobseeker`)

---

## 3. Page-by-Page Audit Findings

### 3.1 Root & Dashboard (`/jobseeker` & `/jobseeker/dashboard`)
- **Route Access:** `/jobseeker` fails with HTTP 404 (`app/jobseeker/page.js` missing). `/jobseeker/dashboard` renders HTTP 200.
- **Defects:**
  - On 390px mobile, page blows out to **520px scrollWidth** (+130px overflow) because the `<div className="space-y-5 xl:col-span-2">` grid column lacks `min-w-0`.
  - All 34 buttons lack `type="button"`.
  - Search input in header has no `<label>` or `aria-label`.
  - User card button at bottom of sidebar has no `onClick` handler. Clicking does nothing.

### 3.2 Job Search & Discovery (`/jobseeker/jobs`, `/jobs/[jobId]`, `/jobs/[jobId]/apply`)
- **Route Access:** All 3 render HTTP 200.
- **Defects:**
  - `/jobseeker/jobs` blows out to **452px scrollWidth** (+62px overflow) on 390px mobile.
  - Search input, salary dropdown, and experience filters lack accessible `aria-label` tags (4 unlabelled inputs).
  - All 39 buttons lack `type="button"`.
  - In Job Detail (`/jobseeker/jobs/[jobId]`), clicking "Share" triggers a static toast `"Link copied to clipboard."` without writing to the clipboard API.

### 3.3 Company Profiles & Startups Directory (`/jobseeker/companies/[companyId]`, `/jobseeker/startups`)
- **Route Access:** Both render HTTP 200.
- **Defects:**
  - In `/jobseeker/companies/comp-1`, link `"View all 1 jobs →"` is hardcoded to `href="#"` (dead anchor).
  - "Follow startup" button updates in-memory local state only; resets on page refresh.

### 3.4 Saved Jobs & Alerts (`/jobseeker/saved`, `/jobseeker/alerts`)
- **Route Access:** Both render HTTP 200.
- **Defects:**
  - `/jobseeker/alerts` blows out to **476px scrollWidth** (+86px overflow) on 390px mobile viewports.
  - Frequency radio buttons and threshold inputs in `/jobseeker/alerts` lack `<label htmlFor="...">` associations.

### 3.5 Applications & Tracker (`/jobseeker/applications`, `/applications/[applicationId]`, `/interviews`)
- **Route Access:** All 3 render HTTP 200.
- **Defects:**
  - `/jobseeker/applications` expands to **420px scrollWidth** (+30px overflow) on 390px mobile.
  - `/jobseeker/applications/app-1` expands to **575px scrollWidth** (+185px overflow) on 390px mobile.
  - Withdraw application modal does not persist state across page reloads.

### 3.6 Offers & Comparison (`/jobseeker/offers`, `/offers/[offerId]`, `/offers/compare`)
- **Route Access:** All 3 render HTTP 200.
- **Defects:**
  - `/jobseeker/offers/off-1` expands to **538px scrollWidth** (+148px overflow) on 390px mobile viewports due to unconstrained salary/equity breakdown cards.
  - "Download offer letter" triggers an ephemeral notification toast without generating a file.

### 3.7 Resumes & Resume Maker (`/jobseeker/resumes`, `/resumes/new`, `/resumes/[resumeId]`, `/ats`, `/tailor`)
- **Route Access:** All 5 render HTTP 200.
- **Defects:**
  - **Severe Mobile Overflow in Resumes:** `/jobseeker/resumes` expands to **661px scrollWidth** (+271px overflow) and `/jobseeker/resumes/res-1` expands to **662px scrollWidth** (+272px overflow) because the resume preview table lacks an `overflow-x-auto` wrapper and `min-w-0` on its parent grid.
  - ATS score generator produces static mocked scores without client-side text extraction.

### 3.8 AI Interview Practice & Trainer (`/jobseeker/practice`, `/practice/new`, `/drills`, `/history`, `/rubric`, `/[sessionId]`, `/[sessionId]/report`, `/readiness`)
- **Route Access:** All 8 render HTTP 200.
- **Defects:**
  - `/jobseeker/practice/sess-1/report` expands to **460px scrollWidth** (+70px overflow) on 390px mobile.
  - Dead links in `/jobseeker/practice/sess-1/report`: 4 instances of `"Rubric →"` and 1 `"Request a review →"` point to `href="#"`.
  - Dead links in `/jobseeker/readiness`: `"How scoring works"`, `"Request a review"`, and `"Contact support"` point to `href="#"`.

### 3.9 Messages & Settings (`/jobseeker/messages`, `/jobseeker/settings`)
- **Route Access:** Both render HTTP 200.
- **Defects:**
  - **Critical Laptop Layout Blowout:** `/jobseeker/messages` expands to **1338px scrollWidth** on **1024px Laptop viewports** (**+314px blowout**), forcing a horizontal scrollbar across the entire viewport.
  - `/jobseeker/messages` also overflows on 390px mobile (**464px scrollWidth**, +74px overflow).
  - Settings toggle switches lack `role="switch"` and `aria-checked` semantics.

---

## 4. UI & Design Consistency Problems

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    JOB SEEKER DESIGN SYSTEM DEFICIENCIES                    │
├──────────────────────────┬──────────────────────────────────────────────────┤
│ Micro-Typography         │ 530 instances of text < 12px (text-[9px], 10px)  │
├──────────────────────────┼──────────────────────────────────────────────────┤
│ Arbitrary Colors         │ 27 hardcoded hex values across 6 component files │
├──────────────────────────┼──────────────────────────────────────────────────┤
│ Omitted Navigation Items │ Offers, Alerts, Startups, Readiness omitted from │
│                          │ desktop sidebar navigation list                  │
├──────────────────────────┼──────────────────────────────────────────────────┤
│ Shell Duplication        │ 6 distinct duplicate JobSeekerShell components   │
└──────────────────────────┴──────────────────────────────────────────────────┘
```

1. **530 Instances of Micro-Typography (<12px):**  
   The classes `text-[9px]`, `text-[10px]`, and `text-[11px]` are used extensively across metadata tags, salary pills, skill badges, and timestamp notes. This severely degrades readability on high-DPI and mobile displays.
2. **27 Hardcoded Hex Colors:**  
   Raw hex strings (`#0F1B2D`, `#FAF8F4`, `#B8955A`, `#E5E1D8`, `#4A5568`, `#1C2B42`, `#F3EBDD`, `#A0A7B4`, `#806236`, `#E7F3EC`, `#286749`, `#F3F4F6`, `#9A7A45`, `#2E7D5B`, `#B7791F`, etc.) are repeated inline across all 6 files rather than referencing centralized Tailwind theme tokens.
3. **Four Core Modules Omitted from Sidebar:**  
   The sidebar `jobseekerNav` defines only 8 items: Dashboard, Jobs, Saved jobs, Applications, Interviews, Resumes, Interview practice, and Messages. Core candidate destinations—**Offers** (`/jobseeker/offers`), **Job Alerts** (`/jobseeker/alerts`), **Hiring Startups** (`/jobseeker/startups`), and **Readiness** (`/jobseeker/readiness`)—are completely absent from sidebar navigation.

---

## 5. Navigation & Functional Defects

1. **Missing `/jobseeker` Root Page (P1):**  
   `app/jobseeker/page.js` is absent, resulting in a 404 error when navigating to `/jobseeker`.
2. **Total Mobile Navigation Blackout (P1):**  
   On viewports `< 1024px`, the sidebar vanishes with no replacement hamburger drawer or mobile bottom bar.
3. **Dead `href="#"` Links (P1):**  
   - `/jobseeker/companies/comp-1`: `"View all 1 jobs →"` (`href="#"`)
   - `/jobseeker/practice/sess-1/report`: `"Request a review →"`, 4× `"Rubric →"` (`href="#"`)
   - `/jobseeker/readiness`: `"How scoring works"`, `"Request a review"`, `"Contact support"` (`href="#"`)
4. **Non-Functional Role Switcher (P2):**  
   Clicking the user card (`Aanya Sen · Job seeker · switch role`) at the bottom of the sidebar has a dummy `onClick={() => {}}` or no handler, doing nothing.
5. **Non-Functional Clipboard Copy (P3):**  
   Clicking "Share job" displays a toast without writing to `navigator.clipboard`.

---

## 6. Responsive Design Issues

Automated Playwright testing across 4 viewport widths revealed widespread responsive defects:

```
Responsive Viewport Audit Summary:
═══════════════════════════════════════════════════════════════════════════
Viewport               Width      Status    Findings / Overflows
───────────────────────────────────────────────────────────────────────────
1440px Desktop         1440px     ✅ Pass   Desktop sidebar (238px), clean
1024px Laptop          1024px     ❌ Fail   /jobseeker/messages blows out to 1338px (+314px)
768px Tablet           768px      ⚠️ Trap   Sidebar disappears, zero nav controls
390px Mobile           390px      ❌ Fail   10 routes with severe horizontal overflows
═══════════════════════════════════════════════════════════════════════════
```

### Measured Horizontal Overflows Table:

| Route | Viewport | Measured `scrollWidth` | Client Width | Overflow Blowout | Offending DOM Root Cause |
|---|---|---|---|---|---|
| `/jobseeker/messages` | **1024px Laptop** | **1338px** | 1024px | **+314px** | 3-column grid `lg:grid-cols-[290px_minmax(360px,1fr)_270px]` exceeds available 786px content space |
| `/jobseeker/resumes/[resumeId]` | **390px Mobile** | **662px** | 390px | **+272px** | Resume preview table lacks `overflow-x-auto` wrapper and `min-w-0` on container |
| `/jobseeker/resumes` | **390px Mobile** | **661px** | 390px | **+271px** | Resume list table lacks `overflow-x-auto` wrapper and `min-w-0` on container |
| `/jobseeker/applications/[applicationId]` | **390px Mobile** | **575px** | 390px | **+185px** | Unconstrained flex header and stage progression strip |
| `/jobseeker/offers/[offerId]` | **390px Mobile** | **538px** | 390px | **+148px** | Offer compensation breakdown grid lacks `min-w-0` |
| `/jobseeker/dashboard` | **390px Mobile** | **520px** | 390px | **+130px** | Column container `<div className="space-y-5 xl:col-span-2">` lacks `min-w-0` |
| `/jobseeker/alerts` | **390px Mobile** | **476px** | 390px | **+86px** | Alert rule card flex containers lack `min-w-0` |
| `/jobseeker/messages` | **390px Mobile** | **464px** | 390px | **+74px** | Message thread flex containers lack `min-w-0` |
| `/jobseeker/practice/sess-1/report` | **390px Mobile** | **460px** | 390px | **+70px** | Feedback radar/scorecard flex container lacks `min-w-0` |
| `/jobseeker/jobs` | **390px Mobile** | **452px** | 390px | **+62px** | Job filter strip lacks `overflow-x-auto` container |
| `/jobseeker/applications` | **390px Mobile** | **420px** | 390px | **+30px** | Application kanban column lacks horizontal scrolling container |

---

## 7. User Experience & Accessibility (UX/a11y)

1. **User Trapping Barrier:** Mobile and tablet candidates cannot switch between Jobs, Applications, Resumes, or Messages without manually typing URLs into the browser address bar.
2. **Missing Input Labels:** 84 of 91 inputs lack programmatic labels. Assistive screen readers announce generic "edit text" controls without context.
3. **Missing Toggle Semantics:** Settings toggles and notification checkboxes lack `role="switch"` and `aria-checked` attributes.
4. **Missing Focus Rings:** Custom interactive cards and buttons omit visible `:focus-visible` outline rings, hampering keyboard-only navigation.

---

## 8. Performance & Code Quality

1. **Heavy Monolithic Bundles:** All 6 files are marked `"use client"` and range from 21.4 KB to 115.1 KB (total 448.3 KB), preventing Next.js Server Component streaming and static HTML prerendering.
2. **Six-Fold Code Redundancy:** The shell layout (`JobSeekerShell`), header, sidebar, user profile badge, and primitives are duplicated 6 times across the role.
3. **Volatile Local State:** Applications, saved jobs, alerts, and practice session notes are stored in ephemeral `useState` arrays that reset on every browser refresh.

---

## 9. Comprehensive Issue Log

| Issue ID | Route / Scope | Category | Severity | Reproduction Steps | Expected Behavior | Actual Behavior | Recommended Fix |
|---|---|---|---|---|---|---|---|
| **JOBSEEKER-ISSUE-001** | `/jobseeker` | Routing | **P1** | Open `http://localhost:3000/jobseeker` | Canonical redirect to `/jobseeker/dashboard` | Returns HTTP 404 Not Found (`page.js` missing) | Create `frontend/app/jobseeker/page.js` with `redirect('/jobseeker/dashboard')` |
| **JOBSEEKER-ISSUE-002** | All 29 `/jobseeker/*` routes | Navigation / Mobile | **P1** | Open any Job Seeker route at 768px or 390px viewport | Mobile hamburger menu or bottom navigation bar allows navigating between modules | Desktop sidebar is hidden (`hidden lg:flex`) with zero navigation controls; user is trapped | Implement unified mobile header with drawer menu and bottom nav bar |
| **JOBSEEKER-ISSUE-003** | `/jobseeker/messages` | Responsive Design | **P2** | View `/jobseeker/messages` on 1024px laptop viewport | Layout fits within 1024px without horizontal scrollbar | Page expands to 1338px scrollWidth (+314px horizontal blowout) | Adjust 3-column grid to collapse third column on `lg` viewports or add `min-w-0` |
| **JOBSEEKER-ISSUE-004** | 9 routes: `/resumes`, `/resumes/[id]`, `/applications/[id]`, `/offers/[id]`, `/dashboard`, etc. | Responsive Design | **P2** | View affected routes on 390px mobile viewport | Content fits within 390px width without horizontal blowout | Pages expand up to 662px scrollWidth (+272px overflow) | Add `min-w-0` to grid column containers and `overflow-x-auto` to tables |
| **JOBSEEKER-ISSUE-005** | `/jobseeker/companies/[id]`, `/practice/[id]/report`, `/readiness` | Navigation | **P1** | Click "View all jobs", "Request a review", or "Rubric" | Navigates to target destination | Links point to `href="#"`; do nothing | Update dead anchors to point to `/jobseeker/jobs`, `/jobseeker/practice/rubric`, etc. |
| **JOBSEEKER-ISSUE-006** | All 29 `/jobseeker/*` routes | HTML / Accessibility | **P2** | Inspect DOM `<button>` elements across any page | Every button declares explicit `type="button"` | 557 of 557 buttons omit `type`, defaulting to `type="submit"` | Add explicit `type="button"` to all interactive buttons |
| **JOBSEEKER-ISSUE-007** | All 29 `/jobseeker/*` routes | Accessibility | **P2** | Inspect form controls with a screen reader | All inputs have explicit `<label htmlFor="...">` or `aria-label` | 84 of 91 inputs lack programmatic label associations | Add explicit `id` and `htmlFor` bindings or `aria-label` attributes |
| **JOBSEEKER-ISSUE-008** | All 29 `/jobseeker/*` routes | Typography / a11y | **P2** | Inspect small text badges, timestamps, and table notes | Typography adheres to minimum 12px (`text-xs`) | 530 instances of sub-12px micro-typography (`text-[9px]`, `10px`, `11px`) | Refactor all micro-typography to minimum `text-xs` (12px) |
| **JOBSEEKER-ISSUE-009** | All 29 `/jobseeker/*` routes | Navigation / Architecture | **P2** | Inspect sidebar navigation items | All primary modules (including Offers, Alerts, Startups, Readiness) are reachable | 4 modules are omitted from the sidebar navigation array | Add missing modules to unified `JobSeekerSidebar` navigation array |
| **JOBSEEKER-ISSUE-010** | All 29 `/jobseeker/*` routes | UX / Functionality | **P2** | Click user profile card at bottom of sidebar | Opens account dropdown or role switcher dialog | Button has `onClick={() => {}}` or no handler; does nothing | Implement functional role switcher menu linking to other role workspaces |
| **JOBSEEKER-ISSUE-011** | All 29 `/jobseeker/*` routes | Code Architecture | **P2** | Inspect component structure across 6 files | Single shared `JobSeekerShell` component wraps all routes | Shell, sidebar, header, and primitives duplicated 6 times | Extract shared `JobSeekerShell`, `JobSeekerSidebar`, and `JobSeekerHeader` into `frontend/components/` |
| **JOBSEEKER-ISSUE-012** | All 29 `/jobseeker/*` routes | Design System | **P2** | Inspect inline Tailwind color utility classes | Color classes use semantic Tailwind tokens | 27 arbitrary hardcoded hex color values across templates | Consolidate colors into Tailwind config tokens |
| **JOBSEEKER-ISSUE-013** | `/jobseeker/jobs/[jobId]`, `/offers/[offerId]` | UX / Polish | **P3** | Click "Share job" or "Download offer letter" | Triggers clipboard copy or file download | Produces simulated toast notification without action | Connect to real clipboard API and client-side download utility |

---

## 10. Recommended Improvements

1. **Implement Unified `JobSeekerSidebar` & `JobSeekerHeader` in `frontend/components/`:**
   Consolidate the 6 duplicate shells into a single, modular component library featuring desktop collapsible sidebar, mobile drawer with hamburger trigger, bottom quick-navigation bar, and complete 12-route navigation array.
2. **Eliminate Layout Overflows:**
   Add `min-w-0` to all CSS Grid item containers (`<div className="space-y-5 xl:col-span-2 min-w-0">`) and wrap all resume and application data tables in `overflow-x-auto` containers.
3. **Fix Routing:**
   Create `frontend/app/jobseeker/page.js` with canonical redirection `redirect('/jobseeker/dashboard')`.
4. **Standardize Typography & Button Types:**
   Refactor 530 instances of micro-typography to `text-xs` and add `type="button"` to all 557 buttons.
5. **Repair Dead Links:**
   Replace all `href="#"` links with valid routes.

---

## 11. Unverified Items & Testing Limitations

1. **Live Backend Database Mutations (NOT VERIFIED):** Application submissions, resume saving, and practice session notes operate in client-side mock state and were not validated against a live PostgreSQL/backend API endpoint.
2. **Audio/Video Stream Processing (NOT VERIFIED):** In `/jobseeker/practice/[sessionId]`, microphone recording permissions and real-time audio transcription were tested via browser simulation rather than real speech recognition hardware.
3. **Native Touch Gestures (NOT VERIFIED):** Mobile touch validations were performed using Playwright Chromium/Edge viewport emulation rather than physical iOS/Android mobile devices.

---

## 12. Prioritized Action Plan

### Phase 1: Critical Navigation & Responsive Fixes (P1)
1. Create `frontend/app/jobseeker/page.js` with canonical redirect to `/jobseeker/dashboard`.
2. Implement unified `JobSeekerSidebar`, `JobSeekerHeader`, and `JobSeekerShell` in `frontend/components/` with mobile drawer and bottom quick-navigation bar.
3. Fix `/jobseeker/messages` 1024px blowout (+314px) and 390px mobile overflows across Resumes, Applications, and Dashboard.
4. Replace all `href="#"` dead links with active routes.

### Phase 2: Accessibility & Visual Compliance (P2)
1. Add explicit `type="button"` across all buttons.
2. Add explicit `id`/`<label>` or `aria-label` to all unlabelled form controls.
3. Standardize 530 instances of micro-typography to `text-xs` (12px minimum).
4. Implement interactive role switcher menu on the user profile card.

### Phase 3: Architecture & Performance Standardization (P2/P3)
1. Replace duplicate local primitives with imported `@/components` (`Card`, `Btn`, `StatusBadge`, `Modal`).
2. Consolidate 27 raw hex strings into Tailwind tokens.
3. Connect download and clipboard actions to realistic client-side handlers.
4. Retest all 30 routes with automated Playwright test suite.
