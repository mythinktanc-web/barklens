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
  'Every dog is different. BarkLens is an app that holds your dog’s health history. Ask anything about yours - we answer from their health history, your observations, and top-tier veterinary sources.';
const mobileHeroLede =
  'Every dog is different. Ask anything about yours - BarkLens answers from their health history, your observations, and top-tier veterinary sources.';
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
      !html.includes('The BarkLens Standard →') ||
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
    if (!html.includes('03 · Care team')) {
      failures.push(`${relative}: Care Team must remain item 03`);
    }
    if (html.includes('04 · Care team')) {
      failures.push(`${relative}: stale Care Team item number 04`);
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

  if (relative === 'terms/index.html' && /[🚨⚠️✅❌]/u.test(html)) {
    failures.push(`${relative}: legal terms must not contain emoji`);
  }

  if (relative === 'plans/index.html') {
    if (!html.includes('/images/support/plans-desktop.webp') || !html.includes('/images/support/plans.webp')) {
      failures.push(`${relative}: desktop and mobile plan backgrounds must remain separate`);
    }
  }

  for (const match of html.matchAll(/<a\b[^>]*href="\/waitlist\/"[^>]*>([\s\S]*?)<\/a>/g)) {
    const label = decodeHtmlEntities(match[1].replace(/<[^>]+>/g, '').trim());
    if (label !== 'Join') {
      failures.push(`${relative}: waitlist CTA must be labeled "Join", found "${label}"`);
    }
  }

  const lower = html.toLowerCase();
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
