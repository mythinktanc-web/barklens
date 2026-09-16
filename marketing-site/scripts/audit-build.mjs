import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('dist');
const failures = [];
const descriptions = new Map();
const prohibited = [
  'ai-powered',
  'health companion',
  'smart lens',
  'unlimited ai chat',
  'ongoing health monitoring',
  'ai dog health tracker',
  'gmail'
];

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

  const lower = html.toLowerCase();
  for (const phrase of prohibited) {
    if (lower.includes(phrase)) failures.push(`${relative}: prohibited phrase "${phrase}"`);
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
if (!robots.includes('Disallow: /')) {
  failures.push('robots.txt: prelaunch build must disallow crawling');
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
  prelaunchNoindex: true
}, null, 2));
