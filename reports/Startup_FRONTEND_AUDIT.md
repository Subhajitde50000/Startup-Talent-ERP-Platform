# Senior Frontend Engineering Audit: Startup Role
**Platform:** Startup Talent ERP Platform (`Forma — Workspace`)  
**Role Audited:** Startup  
**Audit Scope:** Route Prefix `/startup` and all 39 nested routes  
**Date of Audit:** November 7, 2026  
**Auditor:** Senior Frontend Architect, UI/UX Reviewer & QA Lead  
**Audit Status:** Completed  

---

## 1. Audit Scope & Executive Summary

### 1.1 Scope
This audit covers the **Startup** role within the Startup Talent ERP Platform. The audit strictly evaluates the `/startup` route hierarchy, layouts, monolithic page bundles, navigation primitives, interactive elements, forms, responsive viewports, accessibility compliance, performance metrics, and design system alignment. In accordance with audit protocols, no application source code was modified during this review.

### 1.2 Executive Summary
The Startup role currently provides a comprehensive conceptual prototype consisting of **40 discovered routes** across 9 monolithic page components:
- `startup-dashboard.jsx` (Core Dashboard)
- `stage-page.jsx` (Stage Toolkit: Idea, Prototype, Early Revenue, Mature)
- `tasks-page.jsx` (Tasks & Milestones Board, List, Calendar)
- `team-directory.jsx` (Team Directory & Member Invites)
- `startup-profile.jsx` (Public & Verified Startup Profile)
- `analytics-page.jsx` (Metrics, Growth & Traction Analytics)
- `hiring-app.jsx` (Talent Search, Job Posts, Applicants, Interviews, Offers, Employer Page)
- `investor-app.jsx` (Fundraising Hub, Investor Discover, Pipeline, Data Room, Access Requests, Rounds, Meetings, Messages)
- `mentor-app.jsx` (Mentorship Hub, Find Mentor, Requests, Mentorship Workspace, Billing, Sessions, Readiness)

While the visual aesthetic effectively reflects the platform's editorial luxury identity (Ink `#0F1B2D`, Warm White `#FAF8F4`, Gold `#B8955A`), the audit revealed **critical architectural, navigation, responsive, and functional defects**:
1. **Critical Navigation Trapping on Mobile (P1):** In 8 of the 9 page modules, the sidebar is completely hidden (`hidden lg:flex`) with **no mobile hamburger menu, no mobile drawer, and no mobile bottom navigation**. Mobile users visiting any subpage are trapped with only a `← Dashboard` text link.
2. **Fake Mobile Navigation on Dashboard (P1):** While the dashboard provides a mobile drawer and bottom navigation bar, **every single navigation button is non-functional**, triggering placeholder toasts (`"[Module] module is ready to connect."`) instead of routing to available pages.
3. **Missing Root Route (P1):** Accessing `/startup` returns a **404 Not Found** because `app/startup/page.js` is missing and no redirect to `/startup/dashboard` is configured.
4. **Cross-Page Sidebar Fragmentation & Dead Links (P1):** Each of the 9 page files defines its own independent sidebar array with conflicting, hardcoded dead links (`href="#"`). For instance, "Stage toolkit" links to `#` from Team and Profile; "Mentor" links to `#` from Stage, Tasks, Analytics, and Hiring; "Investors" links to `#` from Mentors.
5. **Severe Mobile Horizontal Overflows (P2):** Four pages exhibit horizontal scrollbar blowouts on 390px mobile viewports. Notably, `/startup/data-room` expands to **708px scrollWidth** (318px overflow) and `/startup/mentors/[mentorshipId]/billing` expands to **558px scrollWidth** (168px overflow).
6. **Hard Browser Reloads via `location.href` (P2):** Multiple subpages employ raw `location.href = ...` assignments, discarding client-side React state, triggering unnecessary network roundtrips, and breaking SPA conventions.
7. **Isolated Legacy Dark Mode on Dashboard (P2):** The dashboard alone retains a dark-mode toggle and imports `dark-dashboard.css`, directly violating the platform standard (established during the Admin and Employer remediations) which enforces a unified Light Theme.
8. **Micro-Typography & Unstandardized Tokens (P2):** The codebase contains **548 instances of micro-typography (<12px)** and **29 hardcoded hex colors**, lacking centralized design token constants.
9. **560 Buttons Missing `type="button"` (P2):** Out of 589 buttons examined, 560 omit the `type` attribute, creating form submission vulnerabilities and accessibility failures.

---

## 2. Pages Discovered vs. Pages Tested

### 2.1 Inventory Table

| # | Route | File Path | HTTP Status | Direct URL Access | Viewports Tested | Render Status |
|---|---|---|---|---|---|---|
| 1 | `/startup` | *(Missing `app/startup/page.js`)* | **404** | ❌ Fails (404) | 1440, 1024, 768, 390 | Not rendered |
| 2 | `/startup/dashboard` | `app/startup/dashboard/page.js` | 200 | ✅ Pass | 1440, 1024, 768, 390 | Rendered |
| 3 | `/startup/stage` | `app/startup/stage/page.js` | 200 | ✅ Pass | 1440, 1024, 768, 390 | Rendered |
| 4 | `/startup/stage/idea` | `app/startup/stage/idea/page.js` | 200 | ✅ Pass | 1440, 1024, 768, 390 | Rendered |
| 5 | `/startup/stage/prototype` | `app/startup/stage/prototype/page.js` | 200 | ✅ Pass | 1440, 1024, 768, 390 | Rendered |
| 6 | `/startup/stage/early-revenue` | `app/startup/stage/early-revenue/page.js` | 200 | ✅ Pass | 1440, 1024, 768, 390 | Rendered |
| 7 | `/startup/stage/mature` | `app/startup/stage/mature/page.js` | 200 | ✅ Pass | 1440, 1024, 768, 390 | Rendered |
| 8 | `/startup/tasks` | `app/startup/tasks/page.js` | 200 | ✅ Pass | 1440, 1024, 768, 390 | Rendered |
| 9 | `/startup/team` | `app/startup/team/page.js` | 200 | ✅ Pass | 1440, 1024, 768, 390 | Rendered |
| 10 | `/startup/profile` | `app/startup/profile/page.js` | 200 | ✅ Pass | 1440, 1024, 768, 390 | Rendered |
| 11 | `/startup/analytics` | `app/startup/analytics/page.js` | 200 | ✅ Pass | 1440, 1024, 768, 390 | Rendered |
| 12 | `/startup/hiring` | `app/startup/hiring/page.js` | 200 | ✅ Pass | 1440, 1024, 768, 390 | Rendered |
| 13 | `/startup/hiring/talent` | `app/startup/hiring/talent/page.js` | 200 | ✅ Pass | 1440, 1024, 768, 390 | Rendered |
| 14 | `/startup/hiring/jobs/new` | `app/startup/hiring/jobs/new/page.js` | 200 | ✅ Pass | 1440, 1024, 768, 390 | Rendered |
| 15 | `/startup/hiring/[jobId]` | `app/startup/hiring/[jobId]/page.js` | 200 | ✅ Pass (`job-1`) | 1440, 1024, 768, 390 | Rendered |
| 16 | `/startup/hiring/[jobId]/applicants/[applicantId]` | `app/startup/hiring/[jobId]/applicants/[applicantId]/page.js` | 200 | ✅ Pass (`job-1`/`app-1`) | 1440, 1024, 768, 390 | Rendered |
| 17 | `/startup/hiring/interviews` | `app/startup/hiring/interviews/page.js` | 200 | ✅ Pass | 1440, 1024, 768, 390 | Rendered |
| 18 | `/startup/hiring/offers` | `app/startup/hiring/offers/page.js` | 200 | ✅ Pass | 1440, 1024, 768, 390 | Rendered |
| 19 | `/startup/hiring/requests/new` | `app/startup/hiring/requests/new/page.js` | 200 | ✅ Pass | 1440, 1024, 768, 390 | Rendered |
| 20 | `/startup/hiring/employer-page` | `app/startup/hiring/employer-page/page.js` | 200 | ✅ Pass | 1440, 1024, 768, 390 | Rendered |
| 21 | `/startup/investors` | `app/startup/investors/page.js` | 200 | ✅ Pass | 1440, 1024, 768, 390 | Rendered |
| 22 | `/startup/investors/discover` | `app/startup/investors/discover/page.js` | 200 | ✅ Pass | 1440, 1024, 768, 390 | Rendered |
| 23 | `/startup/investors/pipeline` | `app/startup/investors/pipeline/page.js` | 200 | ✅ Pass | 1440, 1024, 768, 390 | Rendered |
| 24 | `/startup/investors/[investorId]` | `app/startup/investors/[investorId]/page.js` | 200 | ✅ Pass (`inv-1`) | 1440, 1024, 768, 390 | Rendered |
| 25 | `/startup/investors/settings` | `app/startup/investors/settings/page.js` | 200 | ✅ Pass | 1440, 1024, 768, 390 | Rendered |
| 26 | `/startup/data-room` | `app/startup/data-room/page.js` | 200 | ✅ Pass | 1440, 1024, 768, 390 | Rendered |
| 27 | `/startup/data-room/requests` | `app/startup/data-room/requests/page.js` | 200 | ✅ Pass | 1440, 1024, 768, 390 | Rendered |
| 28 | `/startup/rounds` | `app/startup/rounds/page.js` | 200 | ✅ Pass | 1440, 1024, 768, 390 | Rendered |
| 29 | `/startup/rounds/[roundId]` | `app/startup/rounds/[roundId]/page.js` | 200 | ✅ Pass (`rnd-1`) | 1440, 1024, 768, 390 | Rendered |
| 30 | `/startup/meetings` | `app/startup/meetings/page.js` | 200 | ✅ Pass | 1440, 1024, 768, 390 | Rendered |
| 31 | `/startup/messages` | `app/startup/messages/page.js` | 200 | ✅ Pass | 1440, 1024, 768, 390 | Rendered |
| 32 | `/startup/mentors` | `app/startup/mentors/page.js` | 200 | ✅ Pass | 1440, 1024, 768, 390 | Rendered |
| 33 | `/startup/mentors/find` | `app/startup/mentors/find/page.js` | 200 | ✅ Pass | 1440, 1024, 768, 390 | Rendered |
| 34 | `/startup/mentors/find/[mentorId]` | `app/startup/mentors/find/[mentorId]/page.js` | 200 | ✅ Pass (`m-1`) | 1440, 1024, 768, 390 | Rendered |
| 35 | `/startup/mentors/requests` | `app/startup/mentors/requests/page.js` | 200 | ✅ Pass | 1440, 1024, 768, 390 | Rendered |
| 36 | `/startup/mentors/[mentorshipId]` | `app/startup/mentors/[mentorshipId]/page.js` | 200 | ✅ Pass (`ms-1`) | 1440, 1024, 768, 390 | Rendered |
| 37 | `/startup/mentors/[mentorshipId]/billing` | `app/startup/mentors/[mentorshipId]/billing/page.js` | 200 | ✅ Pass (`ms-1`) | 1440, 1024, 768, 390 | Rendered |
| 38 | `/startup/sessions` | `app/startup/sessions/page.js` | 200 | ✅ Pass | 1440, 1024, 768, 390 | Rendered |
| 39 | `/startup/sessions/[sessionId]` | `app/startup/sessions/[sessionId]/page.js` | 200 | ✅ Pass (`sess-1`) | 1440, 1024, 768, 390 | Rendered |
| 40 | `/startup/readiness` | `app/startup/readiness/page.js` | 200 | ✅ Pass | 1440, 1024, 768, 390 | Rendered |

- **Total Pages Discovered:** 40
- **Total Pages Successfully Tested in Browser:** 39 (1 route, `/startup`, returned 404)

---

## 3. Page-by-Page Audit Findings

### 3.1 Core Dashboard (`/startup/dashboard`)
- **Visual Design:** High visual appeal using `#FAF8F4` background, card borders in `#E5E1D8`, and gold accents (`#B8955A`). Font family combines serif accents with sans-serif body.
- **Defects:**
  - `Sun`/`Moon` toggle button activates dark mode using `.darkdash`, which affects only this page and breaks overall design uniformity.
  - Sidebar navigation items are wrapped in raw `<a>` tags with inline click interception, rather than Next.js `<Link>`.
  - Mobile bottom navigation bar contains 5 buttons (`Home`, `Tasks`, `Mentor`, `Investors`, `More`). All except `Home` simply trigger toasts (`"[Name] module is ready to connect."`) and fail to route.
  - Mobile drawer hamburger menu buttons trigger toasts instead of navigating.
  - "Startup profile" link is completely omitted from the sidebar `nav` array.

### 3.2 Stage Toolkit (`/startup/stage`, `/idea`, `/prototype`, `/early-revenue`, `/mature`)
- **Visual Design:** Clean milestone progression tracker with stage criteria checklists and stage status chips.
- **Defects:**
  - Sidebar links "Mentor" and "Documents" point to `href="#"`.
  - Mobile layout lacks any hamburger menu or drawer. Below `1024px`, the sidebar disappears, offering only `← Dashboard`.
  - Direct stage switching triggers full component re-renders without URL sync unless accessed via nested routes.

### 3.3 Tasks & Milestones (`/startup/tasks`)
- **Visual Design:** Kanban columns (`To do`, `In progress`, `In review`, `Done`), list view, and milestone timelines.
- **Defects:**
  - Primary header action `Create task` / `Create milestone` lacks an `onClick` handler.
  - Quick-add input row inside the list table enforces a fixed inline style `min-w-[760px]`, which risks container overflow if responsive wrappers fail.
  - Sidebar links "Mentor" and "Documents" point to `href="#"`.
  - No mobile menu is provided.

### 3.4 Team Directory (`/startup/team`)
- **Visual Design:** Member cards, role badges, permission chips, and invite modal.
- **Defects:**
  - Sidebar links "Stage toolkit", "Mentor", and "Documents" are hardcoded to `href="#"`.
  - 34 of 35 buttons lack `type="button"`.
  - Mobile header features only `← Dashboard` with no navigation drawer.
  - Raw `<a>` tags are used for internal navigation (`<a href="/startup/dashboard">`).

### 3.5 Startup Profile (`/startup/profile`)
- **Visual Design:** Verification status strip, executive summary, deck attachment placeholders, founder details.
- **Defects:**
  - Sidebar links "Stage toolkit", "Mentor", and "Documents" point to `href="#"`.
  - Raw `<a>` tags used for navigation (`<a href="/startup/dashboard">`).
  - Form editing state is held strictly in local memory and does not sync with API.

### 3.6 Analytics & Growth (`/startup/analytics`)
- **Visual Design:** Stat cards with trend chips, MRR run-rate, conversion funnels, and customer retention metrics.
- **Defects:**
  - Horizontal overflow detected at 390px mobile viewport (`scrollWidth: 398px`, +8px overflow) due to unconstrained tab row.
  - Sidebar links "Mentor" and "Documents" point to `href="#"`.
  - Export CSV and Refresh buttons trigger mock toasts without triggering actual downloads or revalidations.

### 3.7 Hiring Suite (`/startup/hiring`, `/talent`, `/jobs/new`, `/[jobId]`, `/interviews`, `/offers`, `/requests/new`, `/employer-page`)
- **Visual Design:** Candidate pipeline boards, job post composer, offer approval tracker, and talent filters.
- **Defects:**
  - Multiple form handlers execute `setTimeout(() => location.href = '/startup/hiring', 700)`, forcing hard browser reloads that erase draft state.
  - In `hiring-app.jsx`, sidebar links "Mentor" and "Documents" point to `href="#"`.
  - Mobile layout completely strips the sidebar without providing a replacement drawer or bottom navigation bar.

### 3.8 Investor & Fundraising Hub (`/startup/investors`, `/discover`, `/pipeline`, `/[investorId]`, `/settings`, `/rounds`, `/meetings`, `/messages`, `/data-room`)
- **Visual Design:** Pitch deck access controls, investor pipeline CRM, round term sheet trackers, and data room folder trees.
- **Defects:**
  - **Severe Mobile Overflow in `/startup/data-room`:** On 390px mobile viewports, the data room expands to **708px scrollWidth** (318px overflow) due to fixed-width aside panes and grid elements failing to wrap.
  - In `investor-app.jsx`, multiple buttons execute `location.href` to jump between meetings and access requests.
  - Search inputs lack accessible `<label>` or `aria-label` tags.

### 3.9 Mentor Hub & Sessions (`/startup/mentors`, `/find`, `/[mentorId]`, `/requests`, `/[mentorshipId]`, `/billing`, `/sessions`, `/readiness`)
- **Visual Design:** Mentor marketplace, request status banners, session scheduling calendar, and advisory billing agreements.
- **Defects:**
  - **Severe Mobile Overflow in `/startup/mentors/ms-1/billing`:** On 390px mobile viewports, the billing page expands to **558px scrollWidth** (168px overflow).
  - **Mobile Overflow in `/startup/sessions/sess-1`:** On 390px mobile viewports, button rows expand to **417px scrollWidth** (27px overflow).
  - Sidebar link "Investors" points to `href="#"`.
  - Session booking button relies on hard `location.href = '/startup/sessions'`.

---

## 4. UI & Design Consistency Problems

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       DESIGN SYSTEM DEFICIENCY AUDIT                        │
├──────────────────────────┬──────────────────────────────────────────────────┤
│ Micro-Typography         │ 548 instances of text < 12px (text-[9px], 10px)  │
├──────────────────────────┼──────────────────────────────────────────────────┤
│ Arbitrary Colors         │ 29 hardcoded hex values across 9 page files      │
├──────────────────────────┼──────────────────────────────────────────────────┤
│ Dark Mode Inconsistency  │ Dashboard has darkmode; remaining 8 modules light│
├──────────────────────────┼──────────────────────────────────────────────────┤
│ Shell Duplication        │ 9 distinct duplicate sidebar & header components │
└──────────────────────────┴──────────────────────────────────────────────────┘
```

1. **Micro-Typography Violations (<12px):**  
   548 instances of sub-12px text were discovered across the startup pages, using classes like `text-[9px]`, `text-[10px]`, `text-[11px]`, and `text-[13px]`. Examples include table metadata, timestamps, badge labels, and sidebar section headers. Sub-12px text fails WCAG AA legibility standards and contradicts ERP accessibility guidelines.
2. **Hardcoded Color Tokens:**  
   29 distinct raw hex codes are hardcoded across JSX templates (`#0F1B2D`, `#FAF8F4`, `#B8955A`, `#E5E1D8`, `#4A5568`, `#1C2B42`, `#F3EBDD`, `#A0A7B4`, etc.) rather than importing centralized design token constants.
3. **Inconsistent Shell Spacing:**  
   Header heights and padding vary across files: `h-[76px]` vs `h-[68px]`, `px-4 sm:px-7` vs `px-6`. Sidebar width toggling (`compact` mode) exists solely on `startup-dashboard.jsx`, causing layout jumping when navigating to other modules.
4. **Isolated Dark Mode Regressions:**  
   `startup-dashboard.jsx` toggles `.darkdash` and loads `dark-dashboard.css`. All other pages remain permanently in light mode, jarring users upon page transitions.

---

## 5. Navigation & Functional Defects

1. **Dead Links in Sidebar (`href="#"`):**  
   58 navigation links across the startup pages point to `#` or empty anchors. Users attempting to visit Mentor, Stage toolkit, or Documents from various subpages are met with no action or dead clicks.
2. **Missing Next.js `<Link>` Primitives:**  
   `startup-dashboard.jsx`, `team-directory.jsx`, and `startup-profile.jsx` use raw `<a>` tags for internal routes, causing full page reloads and state loss.
3. **Disruptive `location.href` Usage:**  
   11 separate action triggers in `hiring-app.jsx`, `investor-app.jsx`, and `mentor-app.jsx` navigate via `location.href = ...` rather than `useRouter().push()`.
4. **Missing Primary Action Handler in Tasks:**  
   The primary creation button in `tasks-page.jsx` (`Create task` / `Create milestone`) has no `onClick` attached, preventing users from creating items from the header.
5. **Simulated Actions & Fake Toasts:**  
   Settings, Help & Support, Role Switcher, and Export actions across all sidebars trigger static toasts rather than real application workflows.

---

## 6. Responsive Design Issues

Automated browser testing was conducted across all 4 target breakpoints:
- **1440px Desktop:** Clean layout with desktop sidebar fixed at `w-[240px]` (`lg:ml-[240px]`).
- **1024px Laptop/Tablet:** Sidebar remains visible; no horizontal scroll detected.
- **768px Tablet:** Desktop sidebar hides (`hidden lg:flex`). Layout collapses into single-column or dual-column cards; no horizontal overflow.
- **390px Mobile:** **4 routes exhibit critical horizontal overflow and broken layouts**:

```
390px Mobile Viewport Overflow Analysis:
═══════════════════════════════════════════════════════════════════════════
Route                              ScrollWidth   Overflow   Root Cause
───────────────────────────────────────────────────────────────────────────
/startup/data-room                  708px        +318px     Unwrapped aside & multi-column grid
/startup/mentors/ms-1/billing       558px        +168px     Unconstrained agreement grid & table
/startup/sessions/sess-1            417px        +27px      Unwrapped action button row
/startup/analytics                  398px        +8px       Unconstrained horizontal tab strip
═══════════════════════════════════════════════════════════════════════════
```

Furthermore, below 1024px, 8 out of 9 modules hide the navigation sidebar without providing any mobile drawer, trapping the user.

---

## 7. User Experience & Accessibility (UX/a11y)

1. **Mobile User Trapping:** The inability to switch between modules on mobile devices without returning to the dashboard represents a critical UX barrier.
2. **Form Accessibility & Input Association:** Out of 89 inputs across the role, 85 inputs lack `<label for="...">` or `aria-label` bindings, impeding screen readers.
3. **Focus Visibility:** Interactive table rows and tab pills lack prominent `:focus-visible` styling.
4. **Empty and Loading States:** Dynamic sub-routes (e.g. `[jobId]`, `[investorId]`, `[mentorId]`) provide hardcoded fallback data without skeletons or loading indicators during parameter parsing.

---

## 8. Performance & Code Quality

1. **Oversized Client Bundles:** Every file begins with `'use client'`, preventing server rendering optimizations. First Load JS across startup pages ranges from **97.3 kB to 112 kB**.
2. **Extreme Component Duplication:** Each page independently implements `Card`, `Btn`, `Badge`, `Toast`, `Header`, and `Sidebar` primitives, totaling over 3,000 lines of redundant code.
3. **State Volatility:** Large `useState` stores (up to 17 per file) hold all mock records in local memory without local storage sync or React Query caching. Any page change or hard reload wipes user modifications.

---

## 9. Comprehensive Issue Log

| Issue ID | Route | Category | Severity | Reproduction Steps | Expected Behavior | Actual Behavior | Recommended Fix |
|---|---|---|---|---|---|---|---|
| **STARTUP-ISSUE-001** | `/startup` | Navigation | **P1** | Navigate to `http://localhost:3000/startup` | Redirects to `/startup/dashboard` or renders role portal | Returns HTTP 404 Not Found | Create `app/startup/page.js` with `redirect('/startup/dashboard')` |
| **STARTUP-ISSUE-002** | `/startup/stage`, `/tasks`, `/hiring`, `/investors`, `/mentors`, etc. | Navigation / Mobile | **P1** | Open any startup subpage at 390px viewport | Mobile navigation drawer or bottom navigation bar allows navigating to other modules | Sidebar is hidden (`hidden lg:flex`) with no menu button, trapping the user | Implement shared mobile drawer and unified bottom navigation bar |
| **STARTUP-ISSUE-003** | `/startup/dashboard` | Navigation / Functionality | **P1** | On mobile viewport, open hamburger menu and click "Team" or "Investors" | Browser navigates to `/startup/team` or `/startup/investors` | Toast displays `"[Module] module is ready to connect."` without navigating | Replace toast handlers with `<Link href="...">` or `router.push()` |
| **STARTUP-ISSUE-004** | All startup pages | Navigation | **P1** | Click "Mentor" on `/startup/stage` or "Investors" on `/startup/mentors` | Navigates to corresponding module | Link points to `href="#"` and does nothing | Unify sidebar data array across all pages to point to valid routes |
| **STARTUP-ISSUE-005** | `/startup/dashboard`, `/team`, `/profile` | Architecture / Performance | **P1** | Click sidebar links on Dashboard or Team | Client-side transition via Next.js router without full reload | Raw `<a>` tags trigger hard browser page reload | Convert all `<a>` tags to `next/link` `<Link>` components |
| **STARTUP-ISSUE-006** | `/startup/data-room` | Responsive | **P2** | View `/startup/data-room` on 390px viewport | Page content fits within 390px without horizontal scroll | Page scrolls horizontally to 708px (+318px overflow) | Wrap side cards in `w-full`, stack grid with `grid-cols-1 lg:grid-cols-3` |
| **STARTUP-ISSUE-007** | `/startup/mentors/ms-1/billing` | Responsive | **P2** | View `/startup/mentors/ms-1/billing` on 390px viewport | Content fits within 390px | Content overflows horizontally to 558px (+168px overflow) | Add `overflow-x-auto` to agreement cards and table wrappers |
| **STARTUP-ISSUE-008** | `/startup/sessions/sess-1` | Responsive | **P2** | View `/startup/sessions/sess-1` on 390px viewport | Button controls wrap cleanly | Button row expands container to 417px (+27px overflow) | Add `flex-wrap` and responsive spacing to button containers |
| **STARTUP-ISSUE-009** | `/startup/analytics` | Responsive | **P2** | View `/startup/analytics` on 390px viewport | Analytics tab row scrolls or wraps cleanly | Tab row overflows container to 398px (+8px overflow) | Add `overflow-x-auto no-scrollbar` to tab navigation container |
| **STARTUP-ISSUE-010** | `/startup/hiring`, `/investors`, `/mentors` | Architecture | **P2** | Submit hiring request or click meeting button | Smooth SPA transition | Code triggers `location.href = ...`, forcing full reload | Replace `location.href` with `useRouter().push()` |
| **STARTUP-ISSUE-011** | `/startup/dashboard` | Visual Consistency | **P2** | Click dark mode toggle in header | Platform maintains consistent design language | Flips dashboard to dark theme while all subpages remain light theme | Remove dark mode toggle and `dark-dashboard.css` per platform spec |
| **STARTUP-ISSUE-012** | All startup pages | Typography / a11y | **P2** | Inspect elements with `text-[9px]`, `text-[10px]`, `text-[11px]` | All typography adheres to minimum 12px (`text-xs`) | 548 micro-typography instances violate WCAG AA minimum font size | Standardize all text to minimum `text-xs` (12px) |
| **STARTUP-ISSUE-013** | All startup pages | Architecture | **P2** | Inspect component tree across all 9 page files | Shared shell layout (`StartupShell`) used across all routes | Shell, sidebar, header, and primitives duplicated 9 times | Extract shared `StartupShell`, `Card`, `Btn`, and `StatusChip` components |
| **STARTUP-ISSUE-014** | All startup pages | HTML / a11y | **P2** | Inspect DOM `<button>` elements | Every button declares explicit `type="button"` | 560 buttons omit `type` attribute, defaulting to `type="submit"` | Add `type="button"` to all interactive buttons |
| **STARTUP-ISSUE-015** | All startup pages | Accessibility | **P2** | Inspect form input elements with screen reader | Inputs possess explicit `<label for="...">` or `aria-label` | 85 of 89 inputs lack explicit accessible labels | Add `id`/`htmlFor` or `aria-label` to all inputs |
| **STARTUP-ISSUE-016** | All startup pages | UX / Polish | **P3** | Click "Settings" or user profile in sidebar | Opens settings drawer or role switcher menu | Triggers static toast `"Settings will be available soon."` | Provide functional drawers or links to account settings |
| **STARTUP-ISSUE-017** | All startup pages | Design System | **P3** | Inspect color utility classes in JSX | Consistent CSS variables or Tailwind tokens | 29 hardcoded hex values scattered across templates | Consolidate colors into Tailwind config tokens (`ink`, `ivory`, `gold`) |

---

## 10. Prioritized Action Plan

### Phase 1: Critical Navigation & Root Route Fixes (P1)
1. **Create Root Route `/startup`:** Add `frontend/app/startup/page.js` with `redirect('/startup/dashboard')` to eliminate the 404 error.
2. **Implement Unified `StartupShell`:** Extract the duplicate sidebar, sticky header, and navigation logic into a shared `components/startup-shell.jsx` component.
3. **Fix Mobile Navigation Trapping:** Add a standardized mobile hamburger menu and drawer across all startup pages, enabling mobile users to seamlessly navigate between all modules.
4. **Fix Dashboard Mobile Navigation:** Wire all mobile drawer and bottom navigation buttons to real Next.js routes using `next/link`.
5. **Resolve Sidebar Dead Links:** Standardize the sidebar navigation array across all pages, replacing all `href="#"` links with functional route paths (`/startup/mentors`, `/startup/stage`, `/startup/data-room`, etc.).
6. **Replace Raw `<a>` and `location.href`:** Convert raw `<a>` tags to `<Link>` and replace all `location.href` calls with `useRouter().push()`.

### Phase 2: Responsive & Layout Remediations (P2)
1. **Remediate Data Room Mobile Overflow:** Apply responsive grid stacking (`grid-cols-1 lg:grid-cols-3`), remove rigid widths from aside cards, and wrap file tables in `overflow-x-auto`.
2. **Remediate Mentor Billing & Session Overflows:** Add `overflow-x-auto` to agreement detail tables and set `flex-wrap` on session action bars.
3. **Fix Analytics Tab Overflow:** Add horizontal scrolling with scroll snap to the analytics tab header.
4. **Enforce Button Types:** Add explicit `type="button"` to all 560 buttons currently lacking the attribute.

### Phase 3: Design Tokens, Typography & Accessibility Standards (P2/P3)
1. **Deprecate Dashboard Dark Mode:** Remove the `Sun`/`Moon` toggle button, `darkmode` state, and `dark-dashboard.css` import to align with the platform-wide Light Theme.
2. **Eliminate Micro-Typography:** Refactor all 548 sub-12px text instances to `text-xs` (12px minimum).
3. **Centralize Design Tokens:** Replace 29 raw hex strings with centralized Tailwind tokens (`bg-ink`, `text-gold`, `border-sand`).
4. **Form Accessibility:** Attach `id` and `<label htmlFor="...">` attributes or explicit `aria-label` tags to all form controls.

---

## 11. Unverified Items & Testing Limitations

1. **Backend Database Synchronization (NOT VERIFIED):** The current frontend operates entirely on in-memory mock state. True CRUD persistence and API error response handling could not be tested against a live database.
2. **Real Payment Gateway Integration (NOT VERIFIED):** Mentor billing and agreement invoicing actions were evaluated in simulated sandbox mode.
3. **Hardware Touch Interaction (NOT VERIFIED):** Mobile testing was executed via headless browser viewport emulation (390px, 768px, 1024px) rather than physical touch devices.
