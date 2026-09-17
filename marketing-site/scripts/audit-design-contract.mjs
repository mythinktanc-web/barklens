import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const contract = JSON.parse(
  fs.readFileSync(path.join(root, 'scripts/design-contract.json'), 'utf8')
);
const failures = [];

function fail(message) {
  failures.push(message);
}

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

for (const [relative, expectedHash] of Object.entries(contract.fontFiles)) {
  const file = path.join(root, relative);
  if (!fs.existsSync(file)) {
    fail(`${relative}: approved font file is missing`);
    continue;
  }
  const actualHash = crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
  if (actualHash !== expectedHash) {
    fail(`${relative}: approved font file changed (${actualHash})`);
  }
}

const tokensPath = path.join(root, 'src/styles/tokens.css');
const tokens = fs.readFileSync(tokensPath, 'utf8');
if (!tokens.includes(`--font-display: '${contract.displayFamily}'`)) {
  fail(`tokens.css: display family must remain ${contract.displayFamily}`);
}
if (!tokens.includes(`--font-body: ${contract.bodyFamily}`)) {
  fail(`tokens.css: body family must remain ${contract.bodyFamily}`);
}
for (const [token, value] of Object.entries(contract.mobileTokens)) {
  const pattern = new RegExp(`${token.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&')}\\s*:\\s*${value.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&')}\\s*;`);
  if (!pattern.test(tokens)) fail(`tokens.css: ${token} must remain ${value}`);
}

const globalCss = fs.readFileSync(path.join(root, 'src/styles/global.css'), 'utf8');
for (const declaration of [
  "font-family: 'Inter'",
  "url('/fonts/inter-latin.woff2')",
  "font-family: 'DM Serif Display'",
  "url('/fonts/dm-serif-display-regular.woff2')",
  "url('/fonts/dm-serif-display-italic.woff2')",
  'font-synthesis: none'
]) {
  if (!globalCss.includes(declaration)) fail(`global.css: missing approved declaration ${declaration}`);
}

const sourceFiles = walk(path.join(root, 'src')).filter(
  (file) => file.endsWith('.astro') || file.endsWith('.css')
);
for (const file of sourceFiles) {
  const relative = path.relative(root, file);
  if (relative.endsWith('components/LegalPage.astro')) continue;
  const source = fs.readFileSync(file, 'utf8');
  for (const match of source.matchAll(/([^{}]+)\{([^{}]*)\}/gs)) {
    const selector = match[1].trim();
    const body = match[2];
    if (!/(^|[,\s>+~.])h[123](?=$|[,\s>+~:#.[\]])/i.test(selector)) continue;
    const weight = body.match(/font-weight\s*:\s*([^;]+)/i)?.[1]?.trim();
    if (weight && weight !== contract.displayWeight && weight !== `${contract.displayWeight} !important`) {
      fail(`${relative}: ${selector} uses disallowed heading weight ${weight}`);
    }
    const family = body.match(/font-family\s*:\s*([^;]+)/i)?.[1]?.trim();
    if (family && !family.includes('var(--font-display)') && !family.includes(contract.displayFamily)) {
      fail(`${relative}: ${selector} uses disallowed heading family ${family}`);
    }
  }
}

const homeSections = fs.readFileSync(
  path.join(root, 'src/components/HomeSections.astro'),
  'utf8'
);
for (const declaration of [
  '.how .section-label,\n    .closer .section-label',
  'font-size: 1rem !important',
  'letter-spacing: .18em',
  'line-height: 1.2'
]) {
  if (!homeSections.includes(declaration)) {
    fail(`HomeSections.astro: How It Works and Connect Their Dots title lock is missing ${declaration}`);
  }
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log(JSON.stringify({
  contractVersion: contract.version,
  displayFamily: contract.displayFamily,
  displayWeight: contract.displayWeight,
  bodyFamily: contract.bodyFamily,
  approvedFontFiles: Object.keys(contract.fontFiles).length,
  mobileTypeTokens: Object.keys(contract.mobileTokens).length,
  typographyRegressions: 0
}, null, 2));
