# BarkLens Marketing Site

This is the production Astro foundation for the BarkLens marketing website.
It is isolated from the legacy root site and `/v4/` while the migration is in
progress.

## Runtime

- Node.js 22 or newer
- Astro 7
- Static output

## Commands

```text
npm install
npm run test:launch
npm run audit:design
npm run preview:bundle
npm run dev
```

## Phase 2 foundation

- Central site and route configuration
- Shared BarkLens design tokens
- Shared base layout
- Responsive header and mobile navigation
- Shared footer with approved legal line
- Reusable button, boundary, and AI-output components
- Canonical URL and preview noindex support
- Twenty generated route placeholders for Phase 3 conversion
- Optimized approved desktop hero asset
- SVG favicon and wordmark
- Preview-safe packaging that preserves production root paths while making the
  private Perplexity preview use relative assets and routes

## Guardrails

- Gmail and inbox-import language remain excluded.
- `Every source reviewed by a licensed veterinarian.` may be used only when
  the reviewed object is clearly the source.
- The site must never imply that a veterinarian reviews each generated answer.
- General copy uses `your dog` and `their`.
- Named demonstrations use the dog’s actual name.
- Placeholder pages remain noindex until complete and approved.
- DNS and the production domain remain unchanged until the later staging and
  cutover phases pass.

## Waitlist backend

Phase 4 adds a portable Node backend under `server/`.

- `POST /api/waitlist` validates and stores a founding-member signup in the
  Mailgun list `waitlist@barklens.com`.
- New members receive the approved welcome email from
  `Ben at BarkLens <info@barklens.com>`.
- Existing members keep their original referral identity and do not receive a
  second welcome email.
- Referral codes and referrer attribution are stored in Mailgun member
  variables.
- `POST /api/unsubscribe` marks the member unsubscribed while preserving the
  signup record.
- A hidden honeypot and a basic per-process rate limit reduce automated abuse.
- `MAILGUN_MODE=fake npm run server` runs the complete flow without touching
  Mailgun.
- `npm run test:waitlist` covers Mailgun response parsing, new signups,
  duplicates, referrals, unsubscribe behavior, and invalid input.

Credential-backed environments provide the Mailgun API URL and proxy token
through the secure credential vault. The private preview proxies to the
sandbox backend. Durable staging and production hosting remain Phase 9 and
Phase 11 work.

## Production launch preparation

- `npm run test:launch` runs type checks, waitlist and serverless API tests,
  the production build, the complete metadata/link/claim audit, and the
  machine-enforced typography contract.
- The approved font files, headline family and weight, and mobile type scale
  are pinned in `scripts/design-contract.json`.
- Vercel runs the complete launch gate before deployment. GitHub runs the same
  gate on pushes and pull requests to `main` and `desktop-homepage-preview`.
- Vercel configuration lives in `vercel.json`.
- Production Mailgun calls use `MAILGUN_API_KEY` with the US-region
  `MAILGUN_API_BASE`.
- `.env.example` lists required settings without containing secrets.
- Search indexing is blocked for local and Vercel preview builds. Vercel
  production builds enable indexing automatically. For a production build
  outside Vercel, set `PUBLIC_SITE_NOINDEX=false`.
- Analytics is disabled by default. It requires both
  `PUBLIC_ANALYTICS_ENABLED=true` and a valid `PUBLIC_GA_MEASUREMENT_ID`, plus
  the approved privacy and cookie position.
- The approved legal source is in `reference/BarkLens-Legal-Package-Approved-Source.md`.
- `npm run legal:build` regenerates the public Terms and Privacy Markdown from
  the approved source while removing internal drafting artifacts.
- The production checklist is in `reference/phase-9-launch-checklist.md`.

## Responsive layouts

Phase 6 keeps one Astro site and changes presentation by screen width.

- Desktop at 1024px and wider preserves the completed desktop composition.
- Tablet bridges the desktop and phone layouts without a separate site.
- Mobile follows the approved 390px design direction: black sticky header,
  portrait hero, single-column editorial sections, touch-sized controls,
  image-backed proof sections, and bottom-sheet dialogs.
- The real Mailgun waitlist remains shared across every screen size.
- Mobile waitlist additions include an optional second breed, the
  multiple-dog information sheet, stacked confirmation cards, and the
  BarkCode share sheet.
- Shared social links use Instagram `@Gobarklens`, TikTok `@Barklens`,
  Pinterest `GoBarkLens`, Facebook, and YouTube `@gobarklens`.

## Blog editor

Phase 7 adds an Astro content collection and a Pages CMS editor.

- Articles live in `src/content/blog`.
- Blog images live in `public/images/blog`.
- `.pages.yml` at the repository root defines the nontechnical editor.
- Draft articles are excluded from routes and the Blog library.
- Published articles require at least one complete source and the
  `sourcesVerified` publication gate.
- Pages CMS reads the editor from the GitHub branch
  `desktop-homepage-preview` during prelaunch.
- The editor walkthrough is in `reference/blog-editor-guide.md`.
