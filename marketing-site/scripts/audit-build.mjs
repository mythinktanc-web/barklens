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
  "start your dog's chart"
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
    if (!html.includes('href="/#how-it-works"')) {
      failures.push(`${relative}: primary navigation must link to the homepage How It Works section`);
    }
    if ((html.split(connectTheirDotsCopy).length - 1) !== 2) {
      failures.push(`${relative}: Connect Their Dots copy must match on desktop and mobile`);
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
