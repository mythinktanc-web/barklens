# Phase 1 Decision Sheet

**Status:** Complete  
**Closed:** September 16, 2026

## Design sources

- Desktop starts first.
- The 19 desktop HTML exports supplied September 16, 2026 are the latest
  desktop design and copy references.
- The later desktop waitlist export with the Share panel supersedes the
  earlier waitlist export.
- The later mobile `index.html` and `waitlist-2.html` are the authoritative
  mobile homepage and waitlist references.
- Production will use one responsive codebase, not separate public websites.

## Copy and claim rules

- Remove Gmail, inbox-access, and email-record-import promises until that
  integration is approved and live.
- Describe owner-selected uploads and photos instead.
- Use `your dog` and `their` in general copy.
- Use the dog’s actual name in named demonstrations.
- Approved hero microcopy: `Built for the owner in the room.`
- Approved boundary: `BarkLens doesn't diagnose. Your vet does.`
- Approved AI label:
  `AI-generated. Review medical decisions with your veterinarian.`
- Approved footer:
  `BarkLens organizes your dog's health records and answers questions from
  that history and published veterinary sources. It does not diagnose.
  Clinical decisions are made by your veterinarian.`
- Remove `does not replace`, `not a substitute for`, `general information
  only`, and repeated warning constructions.
- Remove the testimonial claiming BarkLens caught kidney movement before
  damage occurred.

## Veterinarian review claim

Chase confirmed:

> Every source reviewed by a licensed veterinarian.

- The reviewed object must always be the source.
- Never state or imply that every generated answer is reviewed.
- Do not place an answers-focused label directly above the source-review
  claim.

## Condition pages

- Keep the approved visual structure and shared template.
- Improve unclear or repetitive language while preserving meaning.
- Put the approved boundary once near the opening.
- End each page with the action best suited to that condition.
- Add factual image descriptions.
- BarkLens keeps, shows, organizes, compares, and flags data patterns. Do not
  describe the product with surveillance-oriented language.
- Add direct emergency guidance only where medically appropriate, especially
  diabetes and heart content.
- Keep the two rejected Cushing’s claims removed.
- Use visible links for key claims and a complete source list.
- Keep one practical instrument or plan on every condition page.
- Record home-cooked meals without quantitative nutrient estimates until an
  approved database and calculation method exist.
- Use a condition-specific call to action, with report upload preferred once
  functional.

## Approval order

1. Computer assembles and corrects the page.
2. Ben reviews design, positioning, and owner usefulness.
3. Chase reviews medical claims and veterinary sources.
4. Counsel reviews advertising boundaries, Privacy, and Terms.
5. Ben gives final publication approval.

Dr. Pressler remains the blog-content reviewer unless Ben assigns a broader
role.

## Mailgun and waitlist

- Region: US.
- Active custom sending domain: `barklens.com`.
- SPF: valid.
- DKIM: valid.
- Tracking CNAME: valid.
- Existing Mailgun Mailing Lists: none.
- Phase 4 target list: `waitlist@barklens.com`.
- Sender: `BarkLens <hello@barklens.com>`.
- Reply-to: `hello@barklens.com`.
- Signup model: immediate enrollment after explicit form submission.
- Store email, first name, dog name, breed, age band, multiple-dog status,
  referral code, signup source, campaign parameters, and consent timestamp.
- Update duplicate members rather than creating duplicate entries.
- Welcome email includes unsubscribe.
- Referral allowance: three friends per founding member.
- Mailgun credential is stored securely and never enters frontend code.
- Until Phase 4 closes, the waitlist remains a design-review demo.

## Plans and payment

- Public route: `/plans/`.
- Homepage links to Plans but does not contain a Buy button.
- Before payment is live, Plans displays the packages without an enrollment or
  payment action.
- After payment is live, only the Plans page routes to the approved checkout.
- Payment platform details are verified in Phase 5 before activation.

## Blog

Initial categories:

- Labs and Reports
- Medications and Labels
- Food and Nutrition
- Conditions
- Veterinary Visit Preparation

Tags remain flexible. Pages CMS and Markdown or MDX are implemented in
Phase 7.

## Domain and approvals

- Canonical production domain: `https://barklens.com`.
- `https://www.barklens.com` redirects to the canonical domain.
- The current public site remains unchanged until Phases 9 and 10 pass.
- GitHub remains the source of truth.
- Vercel becomes the production host after staging approval.
- Ben approves design and publication.
- Chase approves medical claims and source use.
- Counsel approves Privacy, Terms, and final advertising boundaries.

## Explicitly deferred

- Gmail integration and Gmail marketing language.
- Production Mailgun signup.
- Live payment activation.
- Mobile implementation.
- Blog CMS implementation.
- Final legal drafting.
- DNS and production cutover.
