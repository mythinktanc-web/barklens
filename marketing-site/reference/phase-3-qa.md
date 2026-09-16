# Phase 3 Desktop QA

**Completed:** September 16, 2026  
**Scope:** BarkLens desktop marketing site only  
**Widths tested:** 1280 × 900 and 1600 × 900

## Gate result

Phase 3 passed. All 20 approved desktop routes are implemented as real Astro
pages, linked, visually reviewed, and tested at both required desktop widths.

## Automated checks

- Astro check: 0 errors, 0 warnings, 0 hints
- Static build: 20 pages built successfully
- Dependency audit: 0 known vulnerabilities
- Route sweep: 40 page-width combinations passed
- Internal links: 20 unique internal destinations checked, 0 broken
- Browser console and page errors: 0
- Horizontal overflow: 0 pages
- Failed images: 0
- Metadata: title, description, canonical, and preview noindex present on every page
- Heading structure: one H1 per page

## Interaction checks

- Homepage record-type tabs: initial, changed, and returned states passed
- Homepage FAQ: mouse and keyboard open/close cycle passed
- Plans billing switch: monthly, annual, and return-to-monthly cycle passed
- Care Team task: count changed from 3 of 6 to 4 of 6 and returned to 3 of 6
- Sources accordions: mouse and keyboard open/close cycle passed
- Waitlist validation: required fields block incomplete submission
- Waitlist demo submission: entered name and dog name appear in success state
- Waitlist Share: modal opens centered, QR renders, referral URL populates,
  Copy feedback appears, and mouse/Escape close paths work

## Copy and claim checks

- Gmail and Google-import references removed
- Retired disclaimer constructions removed
- “Every source reviewed by a licensed veterinarian” remains attached to sources
- No claim that each generated answer is veterinarian-reviewed
- Condition pages use the single boundary line and shared footer legal line
- Cushing’s claims previously found unsupported were not reinstated
- Trend visual uses value-labeled bars and retains “Ask about this trend”

## Explicit Phase 3 exclusions

- Mailgun storage, email delivery, duplicate handling, unsubscribe handling,
  and real referral attribution are Phase 4
- Payment destination and live billing terms are Phase 5
- Approved mobile layouts are Phase 6
- Counsel-approved final Terms and Privacy Policy are Phase 8
- Production deployment and domain cutover are Phases 9 through 11
