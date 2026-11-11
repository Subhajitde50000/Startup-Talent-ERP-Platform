# Senior Frontend Engineering Audit: Mentor Role
**Platform:** Startup Talent ERP Platform (`Forma — Workspace`)  
**Role Audited:** Mentor  
**Audit Scope:** Route Prefix `/mentor` and all 19 nested routes  
**Date of Audit:** November 7, 2026  
**Auditor:** Senior Frontend Architect, UI/UX Reviewer & QA Lead  
**Audit Status:** Completed  

---

## 1. Audit Scope & Executive Summary

### 1.1 Scope
This audit is dedicated strictly to the **Mentor** role within the Startup Talent ERP Platform. The audit encompasses the `/mentor` route tree, application layouts, shared components, page shells, navigation flows, interactive controls, form elements, responsive viewports (1440px, 1024px, 768px, 390px), accessibility compliance (WCAG 2.1 AA), performance metrics, and design token adherence. In accordance with strict audit constraints, no application source code was modified during this evaluation.

### 1.2 Executive Summary
The Mentor role is implemented through four large monolithic client-side components located under `frontend/app/mentor/`:
1. `mentor-core.jsx` (48.1 KB) — Powers Dashboard, Discover Startups, Inbound Requests, My Startups, Mentorship Workspace, and Public Startup Profile.
2. `mentor-money.jsx` (45.3 KB) — Powers Agreements, Agreement Detail, Earnings & Payouts, Investor Events, Event Registration, and Impact & Verified Reviews.
3. `mentor-sessions.jsx` (40.7 KB) — Powers Deliverables Tracker, Scheduled Sessions, Session Detail & Sign-off, and Readiness Evaluation.
4. `mentor-shared.jsx` (36.6 KB) — Powers Secure Messages & Thread Drawer, and Mentor Availability & Settings.

While the visual design successfully presents a refined editorial identity using the platform palette (Ink `#0F1B2D`, Warm Background `#FAF8F4`, Accent Gold `#B8955A`), the engineering audit uncovered **severe architectural, navigation, responsive, and accessibility flaws**:

1. **Complete Mobile & Tablet Navigation Lockout (P1):** On screens below `1024px` (smartphones and tablets), the sidebar is hidden (`hidden lg:flex`) across all 19 mentor routes with **no replacement hamburger menu, no mobile drawer, no bottom navigation, and no back button**. Mobile users are 100% trapped on whatever page they enter.
2. **Cross-Page Sidebar Route Fragmentation & Dead Links (P1):** Each of the 4 monolithic files defines its own independent sidebar navigation array. In `mentor-sessions.jsx`, "Earnings", "Impact & reviews", and "Messages" are hardcoded to `href="#"`, while "Agreements" and "Investor events" are completely omitted. In `mentor-money.jsx`, "Messages" is hardcoded to `href="#"`.
3. **Broken Settings & Help Links (P1):** In `mentor-money.jsx` and `mentor-sessions.jsx`, clicking "Settings" in the sidebar footer triggers a toast saying `"Settings will be available soon."`, even though a dedicated `/mentor/settings` route and page exists.
4. **Severe Mobile Layout Overflow in Impact (P2):** On 390px mobile viewports, `/mentor/impact` expands to **718px scrollWidth** (a **328px horizontal overflow** — nearly double screen width) because an inner `min-w-[660px]` table forces an unconstrained CSS grid column to blow out.
5. **100% Buttons Missing `type="button"` (P2):** All 254 buttons across the 19 mentor routes lack explicit `type` attributes, defaulting to `type="submit"` and triggering keyboard and accessibility defects.
6. **Zero Semantic Forms & 100% Unlabelled Inputs (P2):** There is not a single `<form>` element across all 4 mentor files. All 53 form inputs lack programmatic label associations (`id` + `<label htmlFor="...">` or `aria-label`).
7. **Widespread Micro-Typography (P2):** 199 instances of sub-12px micro-typography (`text-[9px]`, `text-[10px]`, `text-[11px]`) violate WCAG AA minimum font-size standards.
8. **27 Hardcoded Hex Colors & Quadruple Component Duplication (P2):** Color tokens are hardcoded as raw hex strings across all files, and core UI primitives (`Btn`, `Card`, `StatusChip`, header, sidebar, toast) are independently duplicated in every component file.

---

## 2. Pages Discovered vs. Pages Tested

### 2.1 Route Inventory Table

All 19 discovered routes were systematically tested via HTTP probing and live headless browser automation (using Microsoft Edge via Playwright):

| # | Route | Component File | Page Prop | HTTP Status | Direct URL Access | Viewports Tested | Render Status |
|---|---|---|---|---|---|---|---|
| 1 | `/mentor` | `mentor-core.jsx` | `dashboard` | 200 | ✅ Pass | 1440, 1024, 768, 390 | Rendered |
| 2 | `/mentor/dashboard` | `mentor-core.jsx` | `dashboard` | 200 | ✅ Pass | 1440, 1024, 768, 390 | Rendered |
| 3 | `/mentor/discover` | `mentor-core.jsx` | `discover` | 200 | ✅ Pass | 1440, 1024, 768, 390 | Rendered |
| 4 | `/mentor/requests` | `mentor-core.jsx` | `requests` | 200 | ✅ Pass | 1440, 1024, 768, 390 | Rendered |
| 5 | `/mentor/startups` | `mentor-core.jsx` | `startups` | 200 | ✅ Pass | 1440, 1024, 768, 390 | Rendered |
| 6 | `/mentor/startups/[mentorshipId]` | `mentor-core.jsx` | `workspace` (`mentorship-01`) | 200 | ✅ Pass | 1440, 1024, 768, 390 | Rendered |
| 7 | `/mentor/startups/[mentorshipId]/startup` | `mentor-core.jsx` | `startup` (`mentorship-01`) | 200 | ✅ Pass | 1440, 1024, 768, 390 | Rendered |
| 8 | `/mentor/startups/[mentorshipId]/readiness` | `mentor-sessions.jsx` | `readiness` (`mentorship-01`) | 200 | ✅ Pass | 1440, 1024, 768, 390 | Rendered |
| 9 | `/mentor/sessions` | `mentor-sessions.jsx` | `sessions` | 200 | ✅ Pass | 1440, 1024, 768, 390 | Rendered |
| 10 | `/mentor/sessions/[sessionId]` | `mentor-sessions.jsx` | `detail` (`sess-001`) | 200 | ✅ Pass | 1440, 1024, 768, 390 | Rendered |
| 11 | `/mentor/deliverables` | `mentor-sessions.jsx` | `deliverables` | 200 | ✅ Pass | 1440, 1024, 768, 390 | Rendered |
| 12 | `/mentor/agreements` | `mentor-money.jsx` | `agreements` | 200 | ✅ Pass | 1440, 1024, 768, 390 | Rendered |
| 13 | `/mentor/agreements/[agreementId]` | `mentor-money.jsx` | `agreement` (`agr-001`) | 200 | ✅ Pass | 1440, 1024, 768, 390 | Rendered |
| 14 | `/mentor/earnings` | `mentor-money.jsx` | `earnings` | 200 | ✅ Pass | 1440, 1024, 768, 390 | Rendered |
| 15 | `/mentor/events` | `mentor-money.jsx` | `events` | 200 | ✅ Pass | 1440, 1024, 768, 390 | Rendered |
| 16 | `/mentor/events/[eventId]` | `mentor-money.jsx` | `event` (`demo-day-2026`) | 200 | ✅ Pass | 1440, 1024, 768, 390 | Rendered |
| 17 | `/mentor/impact` | `mentor-money.jsx` | `impact` | 200 | ✅ Pass | 1440, 1024, 768, 390 | Rendered |
| 18 | `/mentor/messages` | `mentor-shared.jsx` | `messages` | 200 | ✅ Pass | 1440, 1024, 768, 390 | Rendered |
| 19 | `/mentor/settings` | `mentor-shared.jsx` | `settings` | 200 | ✅ Pass | 1440, 1024, 768, 390 | Rendered |

- **Total Pages Discovered:** 19
- **Total Pages Successfully Tested in Browser:** 19 (100% direct URL accessibility confirmed)

---

## 3. Page-by-Page Audit Findings

### 3.1 Mentor Dashboard (`/mentor` & `/mentor/dashboard`)
- **Functional Purpose:** Overview of active mentees, upcoming scheduled sessions, inbound requests count, pending deliverables, and quarterly earnings stats.
- **UI & Layout:** Fixed sidebar (240px) on desktop with ivory content canvas (`#FAF8F4`). Cards styled with subtle border `#E5E1D8` and white backgrounds.
- **Defects:**
  - Duplicate routing: `/mentor` and `/mentor/dashboard` render identical JSX without canonical redirection.
  - On mobile/tablet (<1024px), sidebar vanishes with zero mobile navigation alternative.
  - Clicking "Role switcher" in the user profile card triggers a static toast (`"Role switcher: Mentor · Founder."`) without opening any switcher dropdown.
  - All 46 buttons lack `type="button"`.

### 3.2 Discover Startups (`/mentor/discover`)
- **Functional Purpose:** Filter and explore startups seeking advisory guidance across stages (Idea, Prototype, Early revenue, Mature) and domains (Fintech, SaaS, Climate, Deeptech).
- **UI & Layout:** Search bar, filter pills, multi-column startup cards with "Send intro" and "View profile" actions.
- **Defects:**
  - Search input has no `<label>` or `aria-label`.
  - Filter state is purely local in-memory; refreshing the page resets all active stage and sector filters.
  - "Send intro" action triggers a simulated toast (`"Introduction sent to [Startup]."`) without syncing with an outgoing requests queue.

### 3.3 Inbound Mentorship Requests (`/mentor/requests`)
- **Functional Purpose:** Review and manage pending connection requests from startup founders, with options to accept, decline, or propose custom terms.
- **UI & Layout:** Request cards displaying startup description, advisory focus, proposed fee cadence, and action buttons.
- **Defects:**
  - Accepting or declining requests updates local `useState` only; no confirmation modal or reason prompt for rejections.
  - Lack of accessible fieldset/legend semantics on request filter toggles.

### 3.4 My Startups & Workspace (`/mentor/startups`, `/startups/[mentorshipId]`, `/startups/[mentorshipId]/startup`)
- **Functional Purpose:** Portfolio directory of active, paused, and graduated mentees. Sub-routes provide dedicated workspaces with private mentor notes, shared files, milestones, and startup profiles.
- **UI & Layout:** Dual-pane layout on desktop: workspace navigation tabs (Overview, Notes, Deliverables, Readiness) alongside startup metadata.
- **Defects:**
  - In `startup` sub-page (`/mentor/startups/[mentorshipId]/startup`), navigating back to the workspace relies on an inline text link rather than standard breadcrumb components.
  - Document attachments open mock toasts (`"Attachment preview opened."`) without actual file rendering.

### 3.5 Mentorship Readiness Evaluation (`/mentor/startups/[mentorshipId]/readiness`)
- **Functional Purpose:** Detailed investment readiness scoring, milestone sign-offs, and risk evaluation across Team, Product, Traction, and Legal pillars.
- **UI & Layout:** Pillar cards with progress meters, milestone checklists, and sign-off confirmation drawers.
- **Defects:**
  - Rendered by `mentor-sessions.jsx`, which features a mutilated sidebar missing "Agreements" and "Investor events", and dead `#` links for "Earnings", "Impact", and "Messages".
  - Milestone sign-off triggers local toast without persistent audit trail.

### 3.6 Scheduled Sessions & Session Detail (`/mentor/sessions`, `/sessions/[sessionId]`)
- **Functional Purpose:** Calendar and agenda view of upcoming, completed, and canceled mentoring sessions, with meeting links, prep notes, and session summaries.
- **UI & Layout:** Weekly agenda strip, session cards with join buttons, prep checklists, and reschedule modals.
- **Defects:**
  - "Join" button displays a toast (`"Join opens 10 minutes before the session."`) even for sessions whose scheduled time is marked as "In progress".
  - Sidebar links to "Earnings", "Impact & reviews", and "Messages" are dead (`href="#"`).
  - Sidebar footer "Settings" button triggers a dead toast `"Settings will be available soon."`.

### 3.7 Deliverables Tracker (`/mentor/deliverables`)
- **Functional Purpose:** Centralized tracking of action items and deliverables committed during sessions, with assignee tags, due dates, and review statuses.
- **UI & Layout:** Tabbed table view (Pending review, In progress, Completed) with status chips and review action buttons.
- **Defects:**
  - Table lacks horizontal scroll container wrapper (`overflow-x-auto`) on smaller viewports.
  - Quick-filter inputs lack accessible labels.

### 3.8 Advisory Agreements & Detail (`/mentor/agreements`, `/agreements/[agreementId]`)
- **Functional Purpose:** Formal mentorship contracts, fee models (hourly, retainer, equity grant), sign-off authority, and contract PDF downloads.
- **UI & Layout:** Agreement summary cards, active terms strip, fee breakdowns, and legal advisory disclaimers.
- **Defects:**
  - "Messages" sidebar link is hardcoded to `href="#"`.
  - "Settings" in sidebar triggers `"Settings will be available soon."` toast.
  - "Download PDF" button triggers a simulated toast (`"Invoice downloaded."`) without generating a real file.

### 3.9 Earnings & Payouts (`/mentor/earnings`)
- **Functional Purpose:** Financial tracking of session fees, escrow releases, pending invoices, GST breakdown, and bank payout requests.
- **UI & Layout:** Revenue KPI cards, payout eligibility banner, transaction history table, and payout request drawer.
- **Defects:**
  - Payout request drawer uses unmanaged inputs with no bank IFSC/account validation.
  - Export CSV and Tax statement buttons display mock toasts without triggering browser file downloads.

### 3.10 Investor Events (`/mentor/events`, `/events/[eventId]`)
- **Functional Purpose:** Directory of exclusive platform pitch events, Demo Days, and founder office hours where mentors serve as evaluators.
- **UI & Layout:** Event banner cards, attendee rosters, calendar export, and seat registration buttons.
- **Defects:**
  - "Register" button toggles local state without calendar integration or confirmation email simulation.
  - Sidebar icon for "Investor events" is `Ticket` (inconsistent with `CalendarDays` in `mentor-core.jsx`).

### 3.11 Impact & Verified Reviews (`/mentor/impact`)
- **Functional Purpose:** Public and verified record of mentor outcomes: startups mentored, sessions delivered, readiness sign-offs granted, and founder reviews.
- **UI & Layout:** KPI cards, aggregate outcome tables, founder testimonial cards, and public visibility toggle.
- **Defects:**
  - **Critical Mobile Overflow:** On 390px mobile viewport, the page blows out to **718px scrollWidth** (+328px overflow) due to an unconstrained grid containing a `min-w-[660px]` table.
  - "Public impact: Visible · Manage" modal does not persist preference across sessions.

### 3.12 Secure Messages & Thread Drawer (`/mentor/messages`)
- **Functional Purpose:** End-to-end messaging with startup founders, document exchange, and session follow-up notes.
- **UI & Layout:** Split-pane interface: thread conversation list on the left, active chat message stream with attachment picker on the right.
- **Defects:**
  - Message input is an unmanaged textarea rather than a semantic `<form>`, preventing submission via standard keyboard Enter without manual keydown listener.
  - Chat window does not auto-scroll to the bottom when a new mock message is appended.

### 3.13 Mentor Availability & Settings (`/mentor/settings`)
- **Functional Purpose:** Mentor profile preferences, advisory focus domains, weekly capacity (hours/week), session booking lead time, hourly rate, and notification toggles.
- **UI & Layout:** Multi-section form settings: Profile, Availability & Capacity, Fee Structure, Notifications, and Security.
- **Defects:**
  - All setting inputs are unmanaged controls without form wrapper or reset handlers.
  - Toggle switches lack accessible `role="switch"` and `aria-checked` attributes.

---

## 4. UI & Design Consistency Problems

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      MENTOR DESIGN SYSTEM DEFICIENCIES                      │
├──────────────────────────┬──────────────────────────────────────────────────┤
│ Micro-Typography         │ 199 instances of text < 12px (text-[9px], 10px)  │
├──────────────────────────┼──────────────────────────────────────────────────┤
│ Arbitrary Colors         │ 27 hardcoded hex values across 4 component files │
├──────────────────────────┼──────────────────────────────────────────────────┤
│ Icon Discrepancies       │ Agreements: FileText vs FileCheck2               │
│                          │ Investor events: CalendarDays vs Ticket          │
├──────────────────────────┼──────────────────────────────────────────────────┤
│ Shell Duplication        │ 4 distinct duplicate sidebars, headers & shells  │
└──────────────────────────┴──────────────────────────────────────────────────┘
```

1. **Micro-Typography Infractions (<12px):**  
   Discovered **199 instances** of text smaller than 12px across the 19 routes. The classes `text-[9px]`, `text-[10px]`, and `text-[11px]` are used extensively on metadata badges, timestamp labels, table helper notes, and sidebar tags. This degrades legibility and violates WCAG 2.1 AA accessibility guidelines.
2. **27 Hardcoded Hex Colors:**  
   Color values are directly hardcoded throughout the JSX files (`#0F1B2D`, `#FAF8F4`, `#B8955A`, `#E5E1D8`, `#4A5568`, `#1C2B42`, `#F3EBDD`, `#A0A7B4`, `#806236`, `#E7F3EC`, `#286749`, `#F3F4F6`, `#9A7A45`, `#2E7D5B`, `#B7791F`, `#FFF3D6`, `#8A5700`, `#E7D4B0`, `#FFF8E8`, `#DCC8A4`, `#FCE8E6`, `#F0EDE7`, `#F7F4ED`, `#FCFBF9`, etc.) rather than referencing centralized Tailwind tokens (`ink`, `ivory`, `gold`, `sand`).
3. **Inconsistent Icon Assignments in Navigation:**  
   - "Agreements" is represented by `FileText` in `mentor-core.jsx` and `mentor-shared.jsx`, but uses `FileCheck2` in `mentor-money.jsx`.
   - "Investor events" is represented by `CalendarDays` in `mentor-core.jsx`, but uses `Ticket` in `mentor-money.jsx` and `mentor-shared.jsx`.
4. **Header Height & Search Sizing Variance:**  
   Search input sizes in the sticky header fluctuate between `text-sm` (in core, money, and sessions) and `text-xs` (in shared). Icon sizes in the search bar fluctuate between 16px and 17px.

---

## 5. Navigation & Functional Defects

1. **Mobile Navigation Blackout (P1):**  
   Across all 19 routes, on screen widths below 1024px, the desktop sidebar is hidden (`hidden lg:flex`) and replaced with nothing more than a static text string: `<span className="text-sm font-semibold sm:hidden">Mentor workspace</span>`. There is no hamburger icon, no drawer trigger, and no bottom navigation bar. Mobile users cannot switch modules.
2. **Dead Links in `mentor-sessions.jsx` Sidebar (P1):**  
   When navigating within Sessions, Deliverables, or Readiness:
   - "Earnings" points to `href="#"` (dead).
   - "Impact & reviews" points to `href="#"` (dead).
   - "Messages" points to `href="#"` (dead).
   - "Agreements" is completely missing from the navigation list.
   - "Investor events" is completely missing from the navigation list.
3. **Dead Links in `mentor-money.jsx` Sidebar (P1):**  
   When navigating within Agreements, Earnings, Events, or Impact:
   - "Messages" points to `href="#"` (dead).
4. **Dead Settings Link in Money & Sessions (P1):**  
   In `mentor-money.jsx` and `mentor-sessions.jsx`, the "Settings" button in the sidebar footer executes `notify('Settings will be available soon.')` instead of navigating to `/mentor/settings`.
5. **Simulated File Downloads & Exports (P3):**  
   Buttons labeled "Export CSV", "Download PDF", "Receipt", "Statement", and "Tax statement" across Earnings, Agreements, and Impact do not invoke real file generators or triggers; they only produce ephemeral toast alerts.
6. **Non-Functional Role Switcher (P3):**  
   Clicking the user profile badge at the bottom of the sidebar triggers `notify('Role switcher opened.')` with no interactive menu.

---

## 6. Responsive Design Issues

Automated responsive testing was executed across four target viewports:

```
Responsive Viewport Audit Summary:
═══════════════════════════════════════════════════════════════════════════
Viewport               Width      Status    Findings / Overflows
───────────────────────────────────────────────────────────────────────────
1440px Desktop         1440px     ✅ Pass   Desktop sidebar (240px), clean grid
1024px Laptop          1024px     ✅ Pass   Sidebar visible, no overflow
768px Tablet           768px      ⚠️ Trap   Sidebar disappears, zero nav controls
390px Mobile           390px      ❌ Fail   1 route with massive overflow (+328px)
═══════════════════════════════════════════════════════════════════════════
```

### Critical Mobile Overflow: `/mentor/impact`
- **Measured scrollWidth:** `718px` on a `390px` viewport (**+328px horizontal blowout**).
- **Offending DOM Tree:**
  ```html
  <div class="grid items-start gap-5 xl:grid-cols-3">
    <!-- Offending Grid Column lacking min-w-0 -->
    <div class="space-y-5 xl:col-span-2" style="width: 702px">
      <section class="rounded-xl border border-[#E5E1D8] bg-white p-5 sm:p-6">
        <div class="overflow-x-auto">
          <!-- Unconstrained Child Table forcing parent expansion -->
          <table class="w-full min-w-[660px] text-left text-xs">...</table>
        </div>
      </section>
    </div>
  </div>
  ```
- **Root Cause:** By default in CSS Grid, grid items have `min-width: auto`. A child table with `min-w-[660px]` forces the parent grid container to expand beyond the viewport width on mobile screens unless `min-w-0` is added to the column container (`<div className="space-y-5 xl:col-span-2 min-w-0">`).

---

## 7. User Experience & Accessibility (UX/a11y)

1. **User Trapping Barrier:** The absence of a mobile navigation menu makes the application completely unusable for mentors accessing the portal on tablets or mobile devices while traveling or in transit.
2. **Missing Input Labels:** All 53 inputs across the role lack explicit programmatic label associations. Screen readers announce bare input fields without contextual instructions.
3. **Missing Toggle Semantics:** Availability toggles and notification checkboxes lack `role="switch"` and `aria-checked` attributes, communicating no toggle state to assistive technologies.
4. **Toast Ephemerality:** Crucial action outcomes (e.g., "Introduction sent", "Deliverable sign-off approved", "Term change proposed") rely solely on 2.6-second disappearing toasts without confirmation banners or persistent status history.
5. **No Visual Focus Rings:** Custom buttons and interactive table rows omit prominent `:focus-visible` outline rings, hampering keyboard-only navigation.

---

## 8. Performance & Code Quality

1. **Heavy Monolithic Bundles:** All 4 component files exceed 36 KB each (up to 48.1 KB), and all declare `'use client'`, preventing Next.js from performing server-component streaming or HTML prerendering for static content. First Load JS across mentor pages averages **109 kB – 111 kB**.
2. **Quadruple Code Redundancy:** The application shell (`aside`, `header`, user badge), UI primitives (`Card`, `Btn`, `Chip`), and toast dispatchers are copied and pasted across all 4 files with subtle deviations, drastically increasing bundle maintenance overhead.
3. **Volatile Local State:** Large, unpersisted `useState` arrays hold mock records in browser memory without caching or persistence. Navigating across route boundaries or refreshing resets all user actions.

---

## 9. Comprehensive Issue Log

| Issue ID | Route / Scope | Category | Severity | Reproduction Steps | Expected Behavior | Actual Behavior | Recommended Fix |
|---|---|---|---|---|---|---|---|
| **MENTOR-ISSUE-001** | All 19 `/mentor/*` routes | Navigation / Mobile | **P1** | Open any mentor route at 768px or 390px viewport | Mobile hamburger menu or bottom navigation bar allows navigating between modules | Desktop sidebar is hidden (`hidden lg:flex`) with zero navigation controls; user is trapped | Implement unified mobile header with drawer menu and bottom nav bar |
| **MENTOR-ISSUE-002** | `/mentor/sessions`, `/deliverables`, `/agreements`, `/earnings`, `/events` | Navigation | **P1** | Click "Messages" or "Earnings" from Sessions sidebar, or "Messages" from Agreements sidebar | Navigates to target route (`/mentor/messages` or `/mentor/earnings`) | Link is hardcoded to `href="#"`; does nothing | Unify sidebar navigation array across all mentor files to valid routes |
| **MENTOR-ISSUE-003** | `/mentor/agreements`, `/earnings`, `/events`, `/impact`, `/sessions`, `/deliverables` | Navigation / Functionality | **P1** | Click "Settings" in sidebar footer in `mentor-money` or `mentor-sessions` | Navigates to `/mentor/settings` | Button executes `notify('Settings will be available soon.')` | Replace button with `<Link href="/mentor/settings">` |
| **MENTOR-ISSUE-004** | `/mentor` & `/mentor/dashboard` | Routing / Architecture | **P2** | Access `http://localhost:3000/mentor` | Canonical redirect to `/mentor/dashboard` | Renders duplicate page directly without URL redirection | Add `redirect('/mentor/dashboard')` in `app/mentor/page.js` |
| **MENTOR-ISSUE-005** | `/mentor/impact` | Responsive Design | **P2** | View `/mentor/impact` at 390px mobile viewport | Content fits within 390px width without horizontal scrollbar | Page expands to 718px scrollWidth (+328px horizontal overflow) | Add `min-w-0` to parent grid column container (`xl:col-span-2 min-w-0`) |
| **MENTOR-ISSUE-006** | All 19 `/mentor/*` routes | HTML / Accessibility | **P2** | Inspect DOM `<button>` elements across any mentor page | Every button declares explicit `type="button"` | 254 of 254 buttons omit `type`, defaulting to `type="submit"` | Add `type="button"` to all interactive buttons |
| **MENTOR-ISSUE-007** | All 19 `/mentor/*` routes | Semantic HTML / Forms | **P2** | Inspect search, filter, and settings inputs in DOM | Inputs are enclosed in semantic `<form>` with submit handling | 0 `<form>` elements exist; all 53 inputs are unmanaged controls | Wrap interactive input sets in semantic `<form>` containers |
| **MENTOR-ISSUE-008** | All 19 `/mentor/*` routes | Accessibility | **P2** | Inspect form controls with a screen reader | All inputs have explicit `<label htmlFor="...">` or `aria-label` | 53 of 53 inputs lack programmatic label associations | Add explicit `id` and `htmlFor` bindings or `aria-label` attributes |
| **MENTOR-ISSUE-009** | All 19 `/mentor/*` routes | Typography / a11y | **P2** | Inspect small text badges, timestamps, and table notes | Typography adheres to minimum 12px (`text-xs`) | 199 instances of sub-12px micro-typography (`text-[9px]`, `10px`, `11px`) | Refactor all micro-typography to minimum `text-xs` (12px) |
| **MENTOR-ISSUE-010** | All 19 `/mentor/*` routes | Design System | **P2** | Inspect inline Tailwind color utility classes | Color classes use semantic Tailwind tokens (`ink`, `ivory`, `gold`) | 27 arbitrary hardcoded hex color values across templates | Consolidate colors into Tailwind config tokens |
| **MENTOR-ISSUE-011** | All 19 `/mentor/*` routes | Code Architecture | **P2** | Inspect component structure across 4 mentor files | Single shared `MentorShell` component wraps all routes | Shell, sidebar, header, and primitives duplicated 4 times | Extract shared `MentorShell`, `Card`, and `Btn` components |
| **MENTOR-ISSUE-012** | `/mentor/events`, `/mentor/agreements` | Visual Consistency | **P3** | Compare sidebar icons across `mentor-core` and `mentor-money` | Identical icons represent identical modules | Agreements uses `FileText` vs `FileCheck2`; Events uses `CalendarDays` vs `Ticket` | Standardize icon imports across navigation definitions |
| **MENTOR-ISSUE-013** | All 19 `/mentor/*` routes | UX / Polish | **P3** | Click user profile card at bottom of sidebar | Opens account dropdown or role switcher dialog | Displays static toast `"Role switcher opened."` | Implement functional role switcher menu or link to account |
| **MENTOR-ISSUE-014** | `/mentor/earnings`, `/agreements`, `/impact` | UX / Polish | **P3** | Click "Export CSV", "Download PDF", or "Tax statement" | Triggers browser download of generated document | Triggers simulated toast alert without downloading any file | Connect to real export utility or disable with clear placeholder badge |
| **MENTOR-ISSUE-015** | All 19 `/mentor/*` routes | Performance | **P2** | Check build output and component hydration | Static sections rendered as React Server Components | All 4 files are monolithic `'use client'` bundles (109-111 kB JS) | Refactor static shells to server components, isolating client interactivity |

---

## 10. Prioritized Action Plan

### Phase 1: Critical Navigation & Responsive Fixes (P1)
1. **Implement Unified Mobile Navigation Shell:** Create a shared `MentorShell` component that incorporates a sticky mobile header with a functional hamburger menu, slideout drawer, and bottom navigation bar, instantly restoring navigation across all 19 routes for mobile/tablet devices.
2. **Repair Broken Sidebar Dead Links:** Unify the navigation array across all mentor files, replacing all `href="#"` instances with valid routes (`/mentor/messages`, `/mentor/earnings`, `/mentor/impact`, `/mentor/agreements`, `/mentor/events`).
3. **Fix Sidebar Footer Settings Button:** Replace placeholder toast buttons with functional `<Link href="/mentor/settings">` and `<Link href="/help">` components across `mentor-money` and `mentor-sessions`.
4. **Resolve `/mentor/impact` Mobile Overflow:** Add `min-w-0` to the grid column container wrapping the outcomes table, eliminating the 328px horizontal layout blowout on mobile screens.

### Phase 2: HTML & Accessibility Compliance (P2)
1. **Enforce Button Types:** Add explicit `type="button"` to all 254 buttons across the 4 mentor component files.
2. **Form Semantics & Input Labeling:** Wrap interactive input sets in semantic `<form>` tags and add explicit `id`/`htmlFor` or `aria-label` tags to all 53 form inputs.
3. **Eliminate Micro-Typography:** Standardize all 199 instances of sub-12px text (`text-[9px]`, `text-[10px]`, `text-[11px]`) to `text-xs` (12px minimum).

### Phase 3: Architecture & Design System Standardization (P2/P3)
1. **Extract Shared UI Primitives:** Replace redundant definitions of `Card`, `Btn`, `StatChip`, and `StatusChip` with shared, reusable primitives.
2. **Centralize Design Tokens:** Replace 27 raw hex strings with centralized Tailwind design tokens.
3. **Standardize Navigation Icons:** Ensure identical icons (`FileText`, `CalendarDays`) represent "Agreements" and "Investor events" across all sidebars.
4. **Canonical Route Redirection:** Configure `app/mentor/page.js` to redirect directly to `/mentor/dashboard`.

---

## 11. Unverified Items & Testing Limitations

1. **Backend Database Synchronization (NOT VERIFIED):** Data mutation flows (e.g., session booking, readiness evaluation sign-offs, fee updates, message sending) operate on in-memory mock state and were not verified against live database endpoints.
2. **Real Payout & Invoicing Gateway (NOT VERIFIED):** Mentor payout requests and escrow releases were tested in client-side simulation; real payment rail integrations could not be exercised.
3. **Physical Mobile Hardware Gestures (NOT VERIFIED):** Responsive and touch validations were performed using Playwright Chromium/Edge viewport emulation rather than native touch devices.
