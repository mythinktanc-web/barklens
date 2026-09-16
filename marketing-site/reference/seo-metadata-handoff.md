# BarkLens SEO Titles and Meta Descriptions

**Decision date:** September 16, 2026  
**Implementation phase:** Phase 8, Legal, SEO, and Accessibility  
**Status:** Locked requirements; not yet implemented unless noted below

These fields are positioning. Search engines and answer engines may repeat them
when describing BarkLens.

## Rules

- Titles stay under 60 characters.
- Descriptions target 110–120 characters and must be unique.
- The description sentence, or a close variant, must appear in visible body
  copy near the top of its page.
- Do not use “tracker,” “monitoring,” “AI-powered,” “health companion,” or
  “scans” in titles, descriptions, or visible positioning.
- Open Graph and Twitter titles and descriptions mirror the approved fields.
- Condition canonicals use `/conditions/<slug>/`.
- Use one H1 per page and semantic H2s in document order.
- Condition pages use Article structured data with `about` naming the
  condition. Do not use MedicalWebPage.
- Source citations are outbound links with `rel="noopener"`, never
  `nofollow`.
- Image alt text describes the scene, never an unverified condition.

## Homepage

**Title:** BarkLens — Your Dog's Health Records, Explained

**Description:** Every dog is different. Ask anything about yours — BarkLens
answers from their history and top-tier veterinary sources.

The same sentence, or a close variant, must appear in the first visible body
paragraph.

## Core pages

| Page | Title | Description |
|---|---|---|
| Waitlist | Join the BarkLens Waitlist | Join the first wave of invites. Your dog's records in one timeline, with answers from top-tier veterinary sources. |
| Plans | BarkLens Membership & Plans | Plus covers one dog. Family covers your household, up to four. Export everything anytime — including after you cancel. |
| How it works | How BarkLens Works | Photograph a lab report, a label, or a meal. BarkLens reads it, dates it, and puts it beside everything else. |
| Blog | Dog Health Blog — BarkLens | Plain-English explanations of canine lab values, medications, and conditions — each traced to a published source. |
| Care Team | Care Team — Share Your Dog's Chart | Add your partner, sitter, or dog walker at no cost. They see today's medications and your emergency contacts. |
| Records | Your Records Are Yours — BarkLens | Export everything anytime, including after you cancel. No chart expires. Nothing you add sits behind a paywall. |
| Privacy | Privacy — BarkLens | We keep only the records you approve, never sell your data, and let you export or delete everything at any time. |
| Our Story | Why BarkLens Exists — Charlie's Story | BarkLens was built in honor of Charlie — sixteen and a half years, and the tool his dad wishes he'd had. |

## Conditions index

**Title:** Dog Health Conditions, in Plain English — BarkLens

**Description:** Kidney, liver, thyroid, heart, diabetes, Cushing's,
pancreatitis, arthritis — what the numbers mean, and what to ask.

## Condition pages

Title pattern: `[Condition] in Dogs — What the Numbers Mean`

| Condition | Description |
|---|---|
| Kidney | A high creatinine isn't a diagnosis — staging needs two draws. What to track at home, and what to ask your vet. |
| Heart | A murmur is a sound, not a sentence. How to count your dog's sleeping breathing rate, the number cardiologists use. |
| Diabetes | Water, weight, appetite, and every dose — the log your vet reads first. What to record, and what to ask. |
| Liver | A high ALT or ALP is a starting point, not a finding. Why the recheck matters, and what to bring to it. |
| Thyroid | A post-pill T4 only means something if you know the dose time. What to log before the recheck, and what to ask. |
| Pancreatitis | There's no agreed definition of a high-fat diet. What to photograph, what to record, and what to ask your vet. |
| Arthritis | Stiff mornings are data. The mobility score vets use, plus the bloodwork nobody remembers to schedule. |
| Cushing's | A high ALP alone isn't Cushing's — and steroid drops can invalidate the test. What to track, and when to test. |

## Sitewide replacements

- Remove duplicate page descriptions.
- Remove “AI dog health tracker.”
- Remove “ongoing health monitoring.”
- Replace “Smart Lens scans” with “Photo capture” or “Snap and file.”
- Replace “Unlimited AI chat” with “Answers drawn from your dog's own records
  and veterinary literature.”
- Remove “AI-powered” from titles and descriptions.
- Keep “Every source reviewed by a licensed veterinarian.” as plain,
  crawlable body text.

## Already satisfied before Phase 8

The exact veterinarian-source-review sentence is visible, crawlable homepage
body text in the “Reviewed sources” section. It is also rendered as ordinary
text on the Sources and condition-page templates.
