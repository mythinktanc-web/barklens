# Phase 7 Blog and Editor QA

**Completed locally:** September 16, 2026  
**Scope:** Pages CMS configuration, Markdown article system, Blog library,
article template, and publication checks

## Gate result

The Phase 7 implementation is complete locally. GitHub branch activation is
the remaining external step required for Pages CMS to display the editor.

## Editor configuration

- `.pages.yml` is at the repository root.
- Pages CMS collection path:
  `marketing-site/src/content/blog`
- Blog image path:
  `marketing-site/public/images/blog`
- Markdown with YAML frontmatter is used.
- The editor exposes title, description, dates, author, category, tags, cover
  image, scene description, draft status, source-check status, optional
  veterinary reviewer, source list, and rich-text body.
- Five locked categories are configured.
- Source entries require a label, HTTPS URL, and support note.

Pages CMS configuration reference:
https://pagescms.org/docs/configuration/

## Astro content gate

- Astro 7 Content Layer uses a glob loader for Markdown articles.
- The schema requires article metadata, a scene-based cover description, and
  at least one complete source.
- Published articles require `sourcesVerified: true`.
- Drafts are excluded from both the Blog index and article routes.
- A temporary published article with unchecked sources was intentionally
  tested. The build failed with:
  `Published articles must have checked source links.`
- The temporary invalid article was deleted after the test.

Astro content collection reference:
https://docs.astro.build/en/guides/content-collections/

## Website behavior

- `/blog/` is a real article library.
- Category buttons filter published articles.
- Empty categories show an intentional empty state.
- Selecting All restores every published article.
- Each published article receives `/blog/<filename>/`.
- Article pages show title, description, author, date, body, and outbound
  sources.
- Outbound source links use `rel="noopener"` and are not nofollow.
- Desktop and mobile Blog and article layouts have no horizontal overflow.
- Blog and article pages each generate one semantic H1.

## Starter article

Title: `A calmer way to prepare your dog’s records for a veterinary visit`

The article uses practical visit-preparation guidance from the American
Veterinary Medical Association:
https://www.avma.org/resources/pet-owners/yourvet/10-things-you-can-do-make-veterinary-visits-better-everyone

The article makes no diagnosis or treatment claim. It keeps the AVMA source
visible in the body and article source card.

## Validation results

- Astro check: 0 errors, 0 warnings, 0 hints
- Static build: 22 pages generated
- Pages CMS YAML parsed successfully
- Blog filters passed initial, empty, and return-to-All states
- Article source link and metadata passed
- Desktop Blog and article visual review passed
- Mobile Blog and article visual review passed
- Browser errors: 0
- Retired visible language matches: 0

## External activation boundary

Pages CMS reads configuration per repository and branch. The
`desktop-homepage-preview` branch must exist on GitHub before the hosted editor
can load this implementation. Pushing that branch does not merge it into
`main` or change the live site.
