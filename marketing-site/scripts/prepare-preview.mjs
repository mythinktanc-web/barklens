import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const source = path.join(root, 'dist');
const destination = path.join(root, 'preview-dist');

fs.rmSync(destination, { recursive: true, force: true });
fs.cpSync(source, destination, { recursive: true });

const cssDirectory = path.join(destination, '_astro');
const css = fs
  .readdirSync(cssDirectory)
  .filter((file) => file.endsWith('.css'))
  .map((file) => fs.readFileSync(path.join(cssDirectory, file), 'utf8'))
  .join('\n');

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(fullPath) : [fullPath];
  });
}

for (const file of walk(destination).filter((file) => file.endsWith('.html'))) {
  const currentDirectory = path.dirname(file);
  let html = fs.readFileSync(file, 'utf8');

  const makeRelative = (target) => {
    if (!target.startsWith('/')) return target;
    const [pathname, suffix = ''] = target.slice(1).split(/(?=[?#])/);
    const filePathname = !pathname || pathname.endsWith('/')
      ? `${pathname}index.html`
      : pathname;
    const absoluteTarget = path.join(destination, filePathname);
    let relative = path.relative(currentDirectory, absoluteTarget).replaceAll(path.sep, '/');
    if (!relative || relative === '.') relative = './';
    if (!relative.startsWith('.')) relative = `./${relative}`;
    return `${relative}${suffix}`;
  };

  html = html.replace(
    /<link rel="stylesheet" href="\/_astro\/[^"]+">/g,
    `<style>${css}</style>`,
  );

  html = html.replace(/\b(href|src)="\/([^"]*)"/g, (_match, attribute, target) => {
    return `${attribute}="${makeRelative(`/${target}`)}"`;
  });

  html = html.replace(/\bsrcset="([^"]+)"/g, (_match, value) => {
    const candidates = value.split(',').map((candidate) => {
      const trimmed = candidate.trim();
      const separator = trimmed.search(/\s/);
      const url = separator === -1 ? trimmed : trimmed.slice(0, separator);
      const descriptor = separator === -1 ? '' : trimmed.slice(separator);
      return `${makeRelative(url)}${descriptor}`;
    });
    return `srcset="${candidates.join(', ')}"`;
  });

  fs.writeFileSync(file, html);
}

fs.rmSync(cssDirectory, { recursive: true, force: true });
console.log(`Prepared preview bundle at ${destination}`);
