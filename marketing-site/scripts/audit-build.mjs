import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('dist');
const failures = [];
const descriptions = new Map();
const productionIndexing = (
  process.env.VERCEL_ENV === 'production' ||
  process.env.PUBLIC_SITE_NOINDEX === 'false'
);
const prohibited = [
  'ai-powered',
  'health companion',
  'smart lens',
  'unlimited ai chat',
  'ongoing health monitoring',
  'ai dog health tracker',
  'gmail',
  'start your dog’s chart',
  "start your dog's chart",
  'your dog’s kidney history, read as one story'
];
const legalDraftArtifacts = [
  'counsel confirm',
  'model disagreement',
  'ai-generated first draft',
  'not for publication',
  '[effective:'
];
const homepageSearchTitle = "BarkLens — Your Dog's Health Records, Explained";
const homepageSocialTitle = 'The internet knows dogs. BarkLens knows yours.';
const connectTheirDotsCopy =
  'Your dog’s records may hold details you wouldn’t know to ask about. BarkLens brings those details to your attention and gives you a place to ask what they mean.';
const connectTheirDotsMobileCopy =
  'Your dog’s records may hold details you wouldn’t know to ask about. BarkLens surfaces them and gives you a place to ask what they mean.';
const snapPictureCopyTail = 'using your dog’s full history and veterinary research.';
const desktopHeroLede =
  'Every dog is different. Ask anything about yours. BarkLens answers from their health history, your observations, and top-tier veterinary sources.';
const mobileHeroLede =
  'Every dog is different. Ask anything about yours. BarkLens answers from their health history, your observations, and top-tier veterinary sources.';
const whyDetailPages = new Set([
  'care-team/index.html',
  'where-the-answers-come-from/index.html',
  'your-records-are-yours/index.html'
]);

function decodeHtmlEntities(value = '') {
  return value
    .replaceAll('&#39;', "'")
    .replaceAll('&quot;', '"')
    .replaceAll('&amp;', '&');
}

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

const htmlFiles = walk(root).filter((file) => file.endsWith('.html'));
for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8');
  const relative = path.relative(root, file);
  const h1Count = (html.match(/<h1\b/g) || []).length;
  if (h1Count !== 1) failures.push(`${relative}: expected one h1, found ${h1Count}`);

  const title = html.match(/<title>([\s\S]*?)<\/title>/)?.[1]?.trim();
  if (!title) failures.push(`${relative}: missing title`);

  const description = html.match(/<meta name="description" content="([^"]+)"/)?.[1]?.trim();
  if (!description) {
    failures.push(`${relative}: missing meta description`);
  } else if (!relative.startsWith('unsubscribe/')) {
    if (descriptions.has(description)) {
      failures.push(`${relative}: duplicate meta description also used by ${descriptions.get(description)}`);
    }
    descriptions.set(description, relative);
  }

  const openGraphTitle = html.match(/<meta property="og:title" content="([^"]+)"/)?.[1]?.trim();
  const twitterTitle = html.match(/<meta name="twitter:title" content="([^"]+)"/)?.[1]?.trim();
  if (relative === 'index.html') {
    if (decodeHtmlEntities(title) !== homepageSearchTitle) {
      failures.push(`${relative}: homepage search title changed`);
    }
    if (openGraphTitle !== homepageSocialTitle) {
      failures.push(`${relative}: homepage Open Graph title changed`);
    }
    if (twitterTitle !== homepageSocialTitle) {
      failures.push(`${relative}: homepage Twitter title changed`);
    }
    const howItWorksAnchorCount = html.split('href="/#how-it-works"').length - 1;
    if (howItWorksAnchorCount < 2) {
      failures.push(`${relative}: header and footer must link to the homepage How It Works section`);
    }
    if ((html.split(connectTheirDotsCopy).length - 1) !== 1) {
      failures.push(`${relative}: desktop Connect Their Dots copy changed or leaked into mobile`);
    }
    if ((html.split(connectTheirDotsMobileCopy).length - 1) !== 1) {
      failures.push(`${relative}: mobile Connect Their Dots copy changed or duplicated`);
    }
    if ((html.split(snapPictureCopyTail).length - 1) !== 1) {
      failures.push(`${relative}: desktop Snap a Picture copy changed or leaked into mobile`);
    }
    if (
      !html.includes(desktopHeroLede) ||
      !html.includes('How we differ from general AI') ||
      !html.includes('The BarkLens Standard ›') ||
      !html.includes('href="/where-the-answers-come-from/"')
    ) {
      failures.push(`${relative}: homepage hero proof or BarkLens Standard link changed`);
    }
    if (!html.includes(mobileHeroLede)) {
      failures.push(`${relative}: mobile homepage hero body copy changed`);
    }
    if (html.includes('See the BarkLens standard') || html.includes('See the BarkLens Standard')) {
      failures.push(`${relative}: homepage Standard link must not begin with "See"`);
    }
    if (html.includes('Not just AI.') || html.includes('Real veterinary science. One answer.')) {
      failures.push(`${relative}: stale homepage hero proof copy`);
    }
    if (html.includes('Always ready for a question.') || html.includes('Every answer backed by a source.')) {
      failures.push(`${relative}: removed homepage value line returned`);
    }
  }

  if (relative === 'care-team/index.html') {
    for (const text of [
      'Care Circle',
      'You’re not the only one',
      'who takes care of them',
      'In most households, one person knows the medications.',
      'Invite the people who help',
      'Each person gets their own login.',
      'One co-parent, included.',
      'Add Guests For Free',
      'Everyone can log what they do',
      'The “did you already give it?” text, retired.',
      'You stay in control',
      'Easy to invite. Easy to undo.',
      'Add a sitter for the weekend and take them off on Monday. No awkward conversation, and nothing stays open after it’s needed.'
    ]) {
      if (!html.includes(text)) {
        failures.push(`${relative}: approved Care Circle copy is missing "${text}"`);
      }
    }
    if (
      html.includes('Add your partner, a sitter, a walker, or family at no cost.') ||
      html.includes('Every dose logs who gave it and when. Nobody has to guess.') ||
      html.includes('You decide who’s in, and you can remove anyone at any time.') ||
      html.includes('class="care-family"') ||
      html.includes('One household. A separate history for every dog.')
    ) {
      failures.push(`${relative}: stale Care Circle page copy returned`);
    }
  }

  if (whyDetailPages.has(relative)) {
    if (!html.includes('class="back-to-why"') || !html.includes('href="/#why-barklens"')) {
      failures.push(`${relative}: missing Back to Why BarkLens control`);
    }
  }

  if (relative === 'your-records-are-yours/index.html') {
    if (!html.includes('barklens.com/8731') || !html.includes('/images/records/share-qr.png')) {
      failures.push(`${relative}: records share example URL and QR must remain aligned`);
    }
  }

  if (relative === 'where-the-answers-come-from/index.html') {
    for (const text of [
      'Whose information?',
      'Your dog’s own dated records',
      'Whatever it was trained on',
      'Your dog isn’t the average dog',
      'Which sources?',
      'Veterinary textbooks, peer-reviewed journals, university references, clinical guidelines',
      'A forum post and a textbook count the same',
      'No message boards. Ever.',
      'Who checked them?',
      'Reviewed by a licensed veterinarian',
      'Not reviewed by anyone',
      'A vet decided what counts',
      'How do you know?',
      'Tap any claim, read the source',
      'Take its word for it',
      'You don’t have to trust us',
      'An AI chatbot'
    ]) {
      if (!html.includes(text)) {
        failures.push(`${relative}: approved BarkLens Standard table text is missing "${text}"`);
      }
    }
    if (html.includes('<span>General AI</span>')) {
      failures.push(`${relative}: stale General AI table heading`);
    }
  }

  if (relative === 'terms/index.html' && /[🚨⚠️✅❌]/u.test(html)) {
    failures.push(`${relative}: legal terms must not contain emoji`);
  }

  if (relative === 'plans/index.html') {
    if (!html.includes('/images/support/plans-desktop.webp') || !html.includes('/images/support/plans.webp')) {
      failures.push(`${relative}: desktop and mobile plan backgrounds must remain separate`);
    }
  }

  const primaryHeaderNav = html.match(
    /<nav class="site-header__desktop-nav"[^>]*>([\s\S]*?)<\/nav>/
  )?.[1];
  const mobileHeaderNav = html.match(
    /<div class="mobile-navigation"[\s\S]*?<nav[^>]*>([\s\S]*?)<\/nav>/
  )?.[1];
  if (
    primaryHeaderNav?.includes('href="/care-team/"') ||
    mobileHeaderNav?.includes('href="/care-team/"')
  ) {
    failures.push(`${relative}: Care Circle must not appear in top navigation`);
  }
  if (
    relative !== 'review/index.html' &&
    (!primaryHeaderNav || !mobileHeaderNav)
  ) {
    failures.push(`${relative}: standard top navigation is missing`);
  }

  if (/^conditions\/[^/]+\/index\.html$/.test(relative)) {
    const conditionCta = html.match(
      /<section class="condition-cta[^"]*"[^>]*>([\s\S]*?)<\/section>/
    )?.[1];
    if (!conditionCta || /<h2\b/.test(conditionCta)) {
      failures.push(`${relative}: condition CTA must contain only the approved Join action`);
    }
    if (
      !html.includes('class="record-flow"') ||
      !html.includes('Questions this history can carry') ||
      !html.includes('Every source reviewed by a licensed veterinarian.')
    ) {
      failures.push(`${relative}: complete condition narrative structure is missing`);
    }
    if (
      html.includes('class="feature-list"') ||
      html.includes('BarkLens reads, compares, connects, and explains the information that matters to this history.') ||
      html.includes('class="condition-sharing"') ||
      html.includes('Easy to share records') ||
      html.includes('Show the QR')
    ) {
      failures.push(`${relative}: generic condition-page feature assembly returned`);
    }
  }

  for (const match of html.matchAll(/<a\b[^>]*href="\/waitlist\/"[^>]*>([\s\S]*?)<\/a>/g)) {
    const label = decodeHtmlEntities(match[1].replace(/<[^>]+>/g, '').trim());
    if (label !== 'Join') {
      failures.push(`${relative}: waitlist CTA must be labeled "Join", found "${label}"`);
    }
  }

  const lower = html.toLowerCase();
  const visibleText = decodeHtmlEntities(
    html
      .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
  ).replace(/\s+/g, ' ');
  if (/\bcare team\b/i.test(visibleText)) {
    failures.push(`${relative}: stale visible Care Team wording`);
  }
  if (visibleText.includes('→')) {
    failures.push(`${relative}: visible right arrow must use a chevron`);
  }
  for (const phrase of prohibited) {
    if (lower.includes(phrase)) failures.push(`${relative}: prohibited phrase "${phrase}"`);
  }
  for (const phrase of legalDraftArtifacts) {
    if (lower.includes(phrase)) failures.push(`${relative}: legal drafting artifact "${phrase}"`);
  }

  for (const match of html.matchAll(/\b(?:href|src)="([^"#?]+)(?:[?#][^"]*)?"/g)) {
    const target = match[1];
    if (/^(?:https?:|mailto:|tel:|data:)/.test(target)) continue;
    if (!target.startsWith('/')) continue;
    const pathname = target.replace(/^\/+/, '');
    const candidates = pathname.endsWith('/')
      ? [path.join(root, pathname, 'index.html')]
      : [path.join(root, pathname), path.join(root, pathname, 'index.html')];
    if (!candidates.some((candidate) => fs.existsSync(candidate))) {
      failures.push(`${relative}: broken internal target ${target}`);
    }
  }
}

const robots = fs.readFileSync(path.join(root, 'robots.txt'), 'utf8');
if (productionIndexing) {
  if (robots.includes('Disallow: /') || !robots.includes('Allow: /')) {
    failures.push('robots.txt: production build must allow crawling');
  }
  if (!robots.includes('Sitemap: https://barklens.com/sitemap-index.xml')) {
    failures.push('robots.txt: production build must name the sitemap');
  }
} else if (!robots.includes('Disallow: /')) {
  failures.push('robots.txt: preview build must disallow crawling');
}
if (!fs.existsSync(path.join(root, 'sitemap-index.xml'))) {
  failures.push('missing sitemap-index.xml');
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log(JSON.stringify({
  htmlPages: htmlFiles.length,
  uniqueDescriptions: descriptions.size,
  brokenInternalTargets: 0,
  prohibitedPhrases: 0,
  indexingMode: productionIndexing ? 'production-allowed' : 'preview-blocked'
}, null, 2));
