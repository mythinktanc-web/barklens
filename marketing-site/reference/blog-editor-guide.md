# BarkLens Blog Editor Guide

## What this gives you

Pages CMS turns the BarkLens article files into a simple browser form. The
website still owns the design. The editor changes the article fields and body,
then saves the Markdown file to GitHub.

## Open the editor

1. Go to https://app.pagescms.org.
2. Sign in with the GitHub account that has access to
   `mythinktanc-web/barklens`.
3. Open the `barklens` repository.
4. Select the `desktop-homepage-preview` branch while the new site is being
   prepared.
5. Open **Blog articles**.

Pages CMS reads `.pages.yml` from the selected branch. Its official setup
guide is at https://pagescms.org/docs/quick-start/.

## Create an article

1. Choose **New Blog article**.
2. Enter the article title. The filename becomes the future URL, so use clear
   lowercase words separated by hyphens.
3. Complete the short description, author, publish date, category, tags, cover
   image, and scene-based image description.
4. Keep **Keep as draft** turned on while writing.
5. Add at least one source. Every source needs:
   - Source name
   - Full `https://` URL
   - A note stating exactly what the source supports
6. Write the article in the rich-text editor.
7. Save the draft.

## Publish an article

Before turning off **Keep as draft**:

1. Open every source link.
2. Confirm the linked page supports the nearby sentence.
3. Confirm no source is being used to support a broader claim than it states.
4. Turn on **Source links checked**.
5. Add a veterinary reviewer only if that veterinarian reviewed this specific
   article.
6. Turn off **Keep as draft** and save.

The Astro build blocks a published article when **Source links checked** is
off. Draft articles do not appear on the public Blog page.

## Locked categories

- Labs and Reports
- Medications and Labels
- Food and Nutrition
- Conditions
- Veterinary Visit Preparation

Tags remain flexible.

## Writing rules

- Use `your dog` and `their` in general copy.
- Describe what the records show. Do not diagnose.
- Do not use AI-powered, tracker, monitoring, or Smart Lens language.
- Do not claim that every answer is reviewed by a veterinarian.
- Do not name a veterinary reviewer unless they reviewed that article.
- Image descriptions explain the scene, not an unverified condition.
- Keep source links visible and direct.

## What happens after saving

During the current prelaunch phases, saving updates the selected GitHub branch.
The private preview is rebuilt during development. Automatic staging and
production rebuilds are added in the later hosting phases.
