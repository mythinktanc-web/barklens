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
npm run check
npm run build
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
- WordPress, DNS, and the production domain remain unchanged until the later
  staging and cutover phases pass.
