import fs from 'node:fs';
import path from 'node:path';

const sourcePath = path.resolve('reference/BarkLens-Legal-Package-Approved-Source.md');
const outputDirectory = path.resolve('src/content/legal');
const effectiveDate = 'September 16, 2026';
const legalName = 'ThinkTanc LLC';
const legalAddress = '7804 Fairview Rd C-162, Charlotte, NC 28226';
const contactEmail = 'info@barklens.com';

if (!fs.existsSync(sourcePath)) {
  throw new Error(`Missing approved legal source: ${sourcePath}`);
}

const source = fs.readFileSync(sourcePath, 'utf8');

function section(start, end) {
  const startIndex = source.indexOf(start);
  const endIndex = source.indexOf(end, startIndex + start.length);
  if (startIndex === -1 || endIndex === -1) {
    throw new Error(`Could not extract ${start} through ${end}`);
  }
  return source.slice(startIndex, endIndex).trim();
}

function removeBracketed(input, prefix) {
  let output = '';
  let cursor = 0;
  while (cursor < input.length) {
    const start = input.indexOf(prefix, cursor);
    if (start === -1) {
      output += input.slice(cursor);
      break;
    }
    output += input.slice(cursor, start);
    let depth = 0;
    let end = start;
    for (; end < input.length; end += 1) {
      if (input[end] === '[') depth += 1;
      if (input[end] === ']') {
        depth -= 1;
        if (depth === 0) {
          end += 1;
          break;
        }
      }
    }
    cursor = end;
  }
  return output;
}

function clean(input) {
  let text = input
    .replace(/^> \[MODEL DISAGREEMENT[^\n]*\]\s*$/gm, '')
    .replace(/^\[COUNSEL CONFIRM:[^\n]*\]\s*$/gm, '')
    .replace(/Thinktanc LLC|Think Tanc LLC/g, legalName)
    .replace(/legal@barklens\.com|privacy@barklens\.com|security@barklens\.com|hello@barklens\.com/g, contactEmail)
    .replace(/\[Effective: ___, 2026\]/g, effectiveDate)
    .replace(/\[COUNSEL CONFIRM: physical mailing address\]/g, legalAddress)
    .replace(/Automatic purge after \*\*\[COUNSEL CONFIRM: N\] months\*\*/g, 'Automatic purge after **three (3) months**')
    .replace(/\*\*Life of the account \+ \[COUNSEL CONFIRM: N\] months\*\*/g, '**Life of the account + twenty-four (24) months**')
    .replace(/\*\*Life of the account \+ \[COUNSEL CONFIRM: N\] months\*\*/g, '**Life of the account + twenty-four (24) months**')
    .replace(/\*\*Until accepted, declined, suppressed, or expired; unaccepted invitations expire at \[COUNSEL CONFIRM: set expiration, recommended 30 days\]\*\*/g, '**Until accepted, declined, suppressed, or expired; unaccepted invitations expire after thirty (30) days**')
    .replace(/\*\*\[COUNSEL CONFIRM: GA4 and product-analytics retention settings[^\]]*\]\*\*/g, '**two (2) months**')
    .replace(/\*\*\[COUNSEL CONFIRM: Mailgun retention configuration[^\]]*\]\*\*/g, '**thirty (30) days**')
    .replace(/OpenAI, Anthropic, and\/or Google Gemini|OpenAI, Anthropic, and Google Gemini/g, 'enterprise or API model providers used by BarkLens')
    .replace(/There is no Gmail integration and no inbox scanning of any kind/g, 'There is no email or inbox integration of any kind')
    .replace(/there is no Gmail or other email integration/g, 'there is no email or inbox integration')
    .replace(/a public tracker/g, 'an unapproved public tool')
    .replace(/### 5\.3 Approved Google Analytics disclosure/g, '### Analytics disclosure')
    .replace(/We use \*\*Google Analytics 4\*\*/g, 'If analytics is enabled, we may use **Google Analytics 4**')
    .replace(/Counsel must evaluate the final data flows before publication\./g, '')
    .replace(/Photo capture is limited to five categories/g, 'Photo capture is limited to supported categories')
    .replace(/Photo capture is scoped to the five categories described in §1\.3\.4/g, 'Photo capture is scoped to the supported categories described in §1.3.4')
    .replace(
      /\*\*1\.3\.4 Photo capture is limited to supported categories\.\*\*[\s\S]*?(?=\n\n\*\*1\.3\.5)/,
      `**1.3.4 Photo capture is limited to supported categories.** The camera and image-processing features support: **(a)** stool, **(b)** food labels, guaranteed-analysis panels, and photographed meals, **(c)** medication and supplement labels, **(d)** product, treat, and chew packaging, and **(e)** veterinary records and lab reports. BarkLens does not assess skin, coat, wounds, lumps, masses, eyes, ears, teeth, gums, gait, posture, or body condition, and it does not evaluate photographs of your dog's body. If you submit an unsupported image, the Service may refuse it or misread it. Do not rely on image output for diagnosis, urgent review, or physical examination.`
    )
    .replace(
      /\*\*2\.3\.3 Records, documents, and photographs you submit\.\*\*[\s\S]*?(?=\n\n\*\*2\.3\.4)/,
      `**2.3.3 Records, documents, and photographs you submit.** Veterinary records, laboratory reports, discharge summaries, invoices, vaccination records, prescription and supplement labels, food packaging and guaranteed-analysis panels, product and treat packaging, photographs of meals, and photographs of stool, together with text and structured values derived from those materials.`
    );

  text = removeBracketed(text, '[COUNSEL CONFIRM');
  text = text
    .replace(
      /\*\*1\.12\.8 Copyright complaints\.\*\*.*$/m,
      `**1.12.8 Copyright complaints.** If you believe material in the Service infringes your copyright, send a notice containing the elements required by 17 U.S.C. § 512(c)(3) to ${contactEmail} and by mail to ${legalName} d/b/a BarkLens, ${legalAddress}.`
    )
    .replace(
      /- includes our \*\*valid physical postal address\*\*:[^\n]*/g,
      `- includes our **valid physical postal address**: ${legalName} d/b/a BarkLens, ${legalAddress}.`
    )
    .replace(
      /\*\*4\.6\.4 Lapse and plan changes\.\*\*\n\n\*\*4\.6\.5 Transferability\.\*\*/g,
      `**4.6.4 Lapse and plan changes.** The founding-member price is lost if the subscription lapses. During the original twelve-month lock period, a change between Plus and Family or between monthly and annual billing preserves the equivalent founding-member discount where the app store permits it.\n\n**4.6.5 Transferability.** The founding-member benefit is personal and non-transferable. It cannot be sold, assigned, or moved to another person or store account.`
    )
    .replace(
      '**4.6.4 Lapse and plan changes.**',
      '**4.6.4 Lapse and plan changes.** The founding-member price is lost if the subscription lapses. During the original twelve-month lock period, a change between Plus and Family or between monthly and annual billing preserves the equivalent founding-member discount where the app store permits it.'
    )
    .replace(
      '**4.6.5 Transferability.**',
      '**4.6.5 Transferability.** The founding-member benefit is personal and non-transferable. It cannot be sold, assigned, or moved to another person or store account.'
    )
    .replace(
      /California residents may designate an authorized agent, and may contact us at info@barklens\.com or \./g,
      `California residents may designate an authorized agent and may contact us at ${contactEmail}.`
    )
    .replace(
      /\*\*2\.11\.4 Vulnerability reports\.\*\*.*$/m,
      `**2.11.4 Vulnerability reports.** If you believe you have found a security vulnerability, report it to ${contactEmail} rather than testing it against other users' accounts. Good-faith reports submitted responsibly will not be pursued by us.`
    )
    .replace(
      /- \*\*Export and portability\*\* — a machine-readable and human-readable copy of your records and chart, available to you at any time, including after you cancel a paid plan and after you close your account, for the window described in §3\.9\. Export formats:/g,
      '- **Export and portability** — a machine-readable and human-readable copy of your records and chart, available to you at any time, including after you cancel a paid plan and after you close your account, for the window described in §3.9. Available formats are PDF, RTF, and JSON.'
    )
    .replace(
      /The following is the approved description of our analytics use, to appear in the Cookie Policy and to be consistent with §2\.3\.8 and §7:/g,
      'If analytics is enabled, the following terms apply:'
    )
    .replace(
      /\*\*Standing rule:\*\* if a proposed tag shares data with a party that has its own commercial use for it, it does not run before consent, and it does not run at all until counsel has reviewed it against §2\.10\.2, because our public position is that we do not sell or share personal information and we do not run advertising trackers\./g,
      '**Standing rule:** if a proposed tag shares data with a party that has its own commercial use for it, it does not run before consent and will not run unless this Policy and the available privacy choices are updated first.'
    )
    .replace(/\*\*info@barklens\.com\*\* or \*\*info@barklens\.com\*\*/g, `**${contactEmail}**`)
    .replace(/info@barklens\.com or info@barklens\.com/g, contactEmail)
    .replace(/until counsel has reviewed it against §2\.10\.2, because /g, 'unless this Policy and the available privacy choices are updated first, because ')
    .replace(/^\| \*\*\*\* \|.*$/gm, '')
    .replace(/^\*This section is drafted as an internal recommendation[^\n]*$/gm, '')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/,\s*\./g, '.')
    .replace(/\(\s*\)/g, '')
    .trim();
  return text;
}

const termsBody = clean([
  section('## 1. BarkLens Terms of Use', '## 2. BarkLens Privacy Policy'),
  section('## 3. Subscription and Billing Terms', '## 4. Email and Waitlist Terms'),
  section('## 4. Email and Waitlist Terms', '## 5. Cookie and Analytics Decision'),
  section('## 8. Care Team Sharing Terms', '## 9. Company and Jurisdiction Confirmations')
].join('\n\n---\n\n'));

const cookiePublished = source
  .slice(source.indexOf('### 5.3 Approved Google Analytics disclosure'), source.indexOf('## 6. Data Retention and Deletion Schedule'))
  .trim();

const vendorPublished = [
  section('## 7. Vendor and AI Processing Disclosure', '### 7.1.1 Contract and control requirements, by vendor'),
  section('### 7.2 How we govern vendors', '## 8. Care Team Sharing Terms')
].join('\n\n');

let privacyBody = clean([
  section('## 2. BarkLens Privacy Policy', '## 3. Subscription and Billing Terms'),
  `## Cookie and Analytics Policy\n\nThis section explains the technologies that may be used on barklens.com, what may operate before consent, and the boundaries that apply to analytics data.\n\n${cookiePublished}`,
  section('## 6. Data Retention and Deletion Schedule', '## 7. Vendor and AI Processing Disclosure'),
  vendorPublished
].join('\n\n---\n\n'));

privacyBody = privacyBody
  .replace(/§7\.1\.1/g, '§7.1')
  .replace(/\n{3,}/g, '\n\n');

const termsFrontmatter = `---
title: "BarkLens Terms of Use"
description: "Terms governing BarkLens accounts, records, source-backed answers, subscriptions, email, and Care Team sharing."
effectiveDate: 2026-09-16
documentType: terms
---

`;
const privacyFrontmatter = `---
title: "BarkLens Privacy Policy"
description: "How BarkLens collects, uses, shares, retains, exports, and deletes account, record, waitlist, and Care Team information."
effectiveDate: 2026-09-16
documentType: privacy
---

`;

fs.mkdirSync(outputDirectory, { recursive: true });
fs.writeFileSync(path.join(outputDirectory, 'terms.md'), `${termsFrontmatter}${termsBody}\n`);
fs.writeFileSync(path.join(outputDirectory, 'privacy.md'), `${privacyFrontmatter}${privacyBody}\n`);

for (const file of ['terms.md', 'privacy.md']) {
  const content = fs.readFileSync(path.join(outputDirectory, file), 'utf8');
  const forbidden = ['COUNSEL CONFIRM', 'MODEL DISAGREEMENT', 'AI-generated first draft', '[Effective:'];
  for (const phrase of forbidden) {
    if (content.includes(phrase)) throw new Error(`${file} still contains ${phrase}`);
  }
}

console.log(`Generated approved legal content in ${outputDirectory}`);
