# BarkLens Website North Star

**Rule:** Work one phase at a time. Do not add work that does not help close
the active phase. Every project update states the current phase, completed
gate, active task, and excluded work.

## Phase status

| Phase | Name | Status |
|---|---|---|
| 1 | Lock decisions | Complete |
| 2 | Build production foundation | Complete |
| 3 | Complete desktop website | Complete |
| 4 | Make the waitlist real | Complete |
| 5 | Connect payment path | Deferred until payment destination exists |
| 6 | Add mobile designs | Next |
| 7 | Build blog and editing system | Not started |
| 8 | Complete legal, SEO, and accessibility | Not started |
| 9 | Create Vercel staging site | Not started |
| 10 | Prepare production cutover | Not started |
| 11 | Launch | Not started |
| 12 | Post-launch operations | Not started |

## Phase gates

### Phase 1: Lock decisions

Complete when design sources, copy rules, claims, condition-page rules,
waitlist target, payment path, blog taxonomy, canonical domain, and approval
owners are recorded.

### Phase 2: Build production foundation

Complete when the Astro project, shared design system, reusable header and
footer, route map, asset pipeline, disclaimer components, and isolated preview
workflow exist without changing production.

### Phase 3: Complete desktop website

Complete when every approved desktop page is converted, linked, corrected, and
approved at 1280px and 1600px.

### Phase 4: Make the waitlist real

Complete when Mailgun stores real signups, sends the welcome email, handles
duplicates and unsubscribes, and powers real referral links.

### Phase 5: Connect payment path

Complete when Plans routes to the approved payment destination and all prices,
trials, renewals, cancellations, and refunds match the actual billing system.

### Phase 6: Add mobile designs

Complete when one responsive codebase presents the approved mobile, tablet,
and desktop layouts at the intended widths.

### Phase 7: Build blog and editing system

Complete when Pages CMS can create and publish sourced BarkLens articles
without manual code editing.

### Phase 8: Complete legal, SEO, and accessibility

Complete when counsel-approved legal pages, metadata, structured data,
sitemaps, accessibility, and performance checks pass.

### Phase 9: Create Vercel staging site

Complete when the full site is available on private staging and all pages,
forms, links, devices, analytics, and integrations pass QA.

### Phase 10: Prepare production cutover

Complete when redirects, backups, DNS steps, canonical behavior, rollback, and
cutover timing are documented and tested.

### Phase 11: Launch

Complete when the approved build is deployed to the BarkLens domain and live
forms, email, redirects, SSL, search verification, and analytics work.

### Phase 12: Post-launch operations

Complete when first-week checks are stable and the ongoing publishing, review,
maintenance, and incident process is operating.

## Scope-control format

Every update uses:

```text
CURRENT PHASE:
COMPLETED GATE:
ACTIVE TASK:
OUT OF SCOPE FOR THIS PHASE:
NEXT GATE:
```
