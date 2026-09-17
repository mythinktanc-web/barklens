# BarkLens Claude Design Instructions

## Purpose

Use these instructions whenever working on the BarkLens marketing website in
Claude Design. The GitHub repository is the canonical source of truth. Do not
rebuild the website from an older Claude artifact or a standalone HTML export.

The live website is:

- Production URL: `https://barklens.com`
- GitHub repository: `mythinktanc-web/barklens`
- Production branch: `main`
- Website root: `marketing-site`
- Framework: Astro

The `main` branch must always represent the current live desktop, tablet, and
mobile website.

## Nonnegotiable GitHub Workflow

Never commit, push, merge, or open a deployment from `main`.

For every new batch of design work:

1. Connect Claude Design to `mythinktanc-web/barklens`.
2. Clone or import the complete repository from GitHub into the Claude Design
   workspace. Do not begin from an existing Claude artifact, standalone HTML
   export, copied page, or remembered version of the site.
3. If the repository is already present, fetch the remote instead of creating a
   duplicate local copy.
4. Check out `main` and pull the latest remote changes using the Claude Design
   GitHub interface or the command-line equivalent:

   ```bash
   git fetch origin
   git switch main
   git pull --ff-only origin main
   ```

5. Confirm that the Git remote is `mythinktanc-web/barklens`, the working tree
   is clean, and record the exact baseline commit before editing:

   ```bash
   git remote -v
   git status --short --branch
   git rev-parse HEAD
   ```

6. If `main` cannot be updated cleanly, stop and tell Ben. Do not discard,
   overwrite, merge around, or silently ignore local changes.
7. Work only inside `marketing-site` unless Ben explicitly approves another
   location.
8. Create a new branch from that verified `main` commit using:
   `claude-design/YYYY-MM-DD-short-description`.
9. Confirm that the new branch's starting commit is the baseline commit recorded
   above.
10. Make only the changes Ben requested.
11. Commit the changed files to that branch.
12. Do not merge the branch and do not deploy it.
13. Return the exact baseline commit, branch name, new commit hash, changed-file
   list, and handoff
   block defined below.

If Claude Design cannot create or push a separate branch, stop and tell Ben.
Never fall back to editing `main`.

## One Responsive Website

BarkLens is one responsive website, not separate desktop and mobile sites.

- Desktop: 1024 pixels and wider
- Tablet: between desktop and phone layouts
- Mobile design reference: 390 pixels wide

Desktop and mobile may use different crops, spacing, arrangements, or assets,
but they must remain implementations of the same page and content structure.

Every change must explicitly state whether it applies to:

- Desktop only
- Mobile only
- Tablet only
- All screen sizes

Do not change another breakpoint merely to simplify implementation.

## Production Baseline

Always begin with the current files from GitHub `main`. The live site and the
current source code override older Claude designs, old standalone HTML files,
screenshots, and prior mockups.

Do not replace Astro pages or shared components with a new standalone HTML
site. Preserve the existing:

- Astro component structure
- Shared header and footer
- Responsive breakpoint system
- Design tokens and typography
- Production routes
- SEO metadata
- Legal boundaries
- Waitlist integration
- Vercel configuration

The approved typography contract is machine-enforced. Do not modify
`scripts/design-contract.json`, the three files under `public/fonts/`,
`src/styles/tokens.css`, or the heading-family rules in `src/styles/global.css`
unless Ben explicitly approves a typography-system change. DM Serif Display
weight 400 is the only headline face. Never apply 500, 600, 700, 800, `bold`,
or a synthetic weight to an `h1`, `h2`, or `h3`. Inter carries body copy,
eyebrows, labels, navigation, buttons, and interface text.

## Design Work Claude May Perform

Unless Ben gives broader permission, Claude Design may change:

- Layout and spacing
- Typography sizing and placement
- Colors within the existing visual system
- Images, illustrations, and image crops
- Buttons and visual controls
- Responsive presentation
- Section order when specifically requested
- Visual animations and transitions
- Visible copy specifically approved by Ben

Prefer the smallest coherent change. Do not reformat or rewrite unrelated
components.

## Protected Areas

Do not modify these files or systems during ordinary design work:

- `api/`
- `server/`
- `vercel.json`
- `.env*`
- DNS, domains, or deployment settings
- Mailgun behavior or mailing-list data
- Waitlist submission logic
- Unsubscribe logic
- Analytics or tracking
- Payment or billing integrations
- Legal source documents
- `src/content/legal/`
- Terms or Privacy copy
- SEO titles, descriptions, canonicals, robots rules, or structured data
- GitHub `main`

If a requested design appears to require one of these changes, describe the
dependency in the handoff and leave the protected area unchanged.

## Current Product and Copy Guardrails

Preserve the approved BarkLens positioning unless Ben explicitly supplies
replacement wording.

Do not introduce or restore:

- `AI-powered`
- `tracker`
- `monitoring` when BarkLens is the subject
- `Smart Lens`
- `health companion`
- `unlimited AI chat`
- Gmail or inbox-import claims
- Vet Imports
- Payment, purchase, enrollment, or checkout buttons
- Claims that BarkLens diagnoses, detects disease, monitors disease, warns the
  owner, verifies safety, or replaces veterinary care
- `general information only`
- `not a substitute for`
- `does not replace`
- `BarkLens is not a veterinarian`

Use `your dog` and `their` in general marketing and instructional copy. Use a
dog's actual name only in named demonstrations.

The approved source-review claim is:

> Every source reviewed by a licensed veterinarian.

Never change this to suggest that every generated answer is reviewed by a
veterinarian.

The approved boundary line is:

> BarkLens doesn't diagnose. Your vet does.

The short footer legal treatment is:

> BarkLens doesn't diagnose. Your vet does.  
> Not veterinary advice — see Terms.

Do not add repeated warnings or long disclaimers beside product demonstrations.

Plans may display packages and features, but no payment or enrollment button
may be added until Ben approves a payment path.

## Assets

Place new or replacement assets in a clearly named location under
`marketing-site/public/images/`.

For every asset change, record:

- New filename
- Page and section
- Breakpoint
- File being replaced, if any
- Intended aspect ratio
- `object-fit`
- `object-position`
- Alt text
- Whether the old asset should remain for another breakpoint

Do not use base64 or embedded data-URI images. Do not delete an existing asset
unless it is intentionally retired from every page and breakpoint.

## Design Specifications

Do not use vague instructions such as “make it bigger” in the handoff. Record
the implemented values whenever relevant:

- Width and height
- Padding and margin
- Grid columns
- Gaps
- Font family, size, weight, line height, and letter spacing
- Color values
- Border radius and border thickness
- Image ratio, crop, and focal point
- Animation trigger, duration, sequence, and loop behavior

Preserve accessible labels, keyboard controls, focus states, semantic heading
order, and touch-target sizes.

## Local Setup and Required Checks

Use Node.js 22.12 or newer from the `marketing-site` directory.

```bash
npm install
npm run test:launch
```

For any change that touches the waitlist or server code, stop and return the
request to Ben rather than changing it during a design session.

Before handing off design work, check at minimum:

- 1440-pixel desktop
- 1024-pixel desktop or tablet edge
- 768-pixel tablet
- 390-pixel mobile

Verify that:

- The requested change appears at the correct breakpoint.
- Unrequested breakpoints remain unchanged.
- Navigation and footer still work.
- Text does not overflow.
- Images are not stretched or incorrectly cropped.
- Buttons and interactive elements remain usable.
- `npm run check` passes.
- `npm run build` passes.
- `npm run audit:design` passes.
- `npm run test:launch` passes. This is the required handoff gate, not an
  optional check.

Vercel runs `npm run test:launch` before every deployment. A design change that
fails type checking, waitlist tests, route/link/metadata checks, claim-language
checks, indexing-mode checks, or the typography contract must not be handed off
as complete. Do not bypass, weaken, delete, or replace these checks to make a
change pass.

## How to Give Changes to Perplexity Computer

Do not export the entire website or a new standalone HTML file for ordinary
edits.

Commit the targeted changes to the Claude Design branch. Then give Ben the
following completed block so he can paste it into the Perplexity Computer
website-editing session.

```md
=== BARKLENS CLAUDE DESIGN HANDOFF ===

REPOSITORY:
mythinktanc-web/barklens

BASE BRANCH:
main

BASELINE COMMIT:
[full main commit hash recorded immediately after the pull]

DESIGN BRANCH:
[exact branch name]

COMMIT:
[full commit hash]

PULL REQUEST:
[URL, or "Not opened"]

REQUESTED BY BEN:
[plain-language description of what Ben asked to change]

PAGES AND SECTIONS:
- [page route] — [visible section name]

BREAKPOINTS:
- Desktop: [changed / unchanged]
- Tablet: [changed / unchanged]
- Mobile: [changed / unchanged]

IMPLEMENTED CHANGES:
- [exact change]
- [exact change]

CHANGED FILES:
- [path]
- [path]

NEW OR REPLACEMENT ASSETS:
- File: [path]
  Used on: [page and section]
  Breakpoint: [desktop / tablet / mobile / all]
  Crop: [aspect ratio, object-fit, object-position]
  Replaces: [path or "none"]

COPY CHANGES:
- Before: [exact current copy]
  After: [exact approved copy]
- Or: No copy changes.

INTERACTIONS OR ANIMATIONS:
- Trigger: [event or viewport condition]
- Behavior: [sequence]
- Timing: [duration]
- Loop/reset: [behavior]
- Or: No interaction changes.

INTENTIONALLY UNCHANGED:
- [nearby component or breakpoint]
- Legal, SEO, Mailgun, waitlist backend, payment path, and production settings.

CHECKS COMPLETED:
- npm run check: [pass/fail]
- npm run build: [pass/fail]
- 1440px desktop: [pass/fail]
- 1024px layout: [pass/fail]
- 768px tablet: [pass/fail]
- 390px mobile: [pass/fail]

KNOWN ISSUES OR OPEN QUESTIONS:
- [item]
- Or: None.

=== END HANDOFF ===
```

Ben only needs to send Perplexity Computer the branch name, pull-request URL,
or completed handoff block. Perplexity Computer will review the diff, protect
production systems, test the responsive implementation, correct issues, and
merge or deploy only when appropriate.

## When a Full Page Export Is Appropriate

A full-page design export is only appropriate when Ben has approved:

- A complete page redesign
- Major section additions, removals, or reordering
- A new navigation system
- A fundamental responsive-layout change
- A complex new interactive experience

Even then, keep the work on a separate GitHub branch and include the handoff
block. Do not replace the production site or merge the branch.
