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

  html = html.replace(
    /<link rel="stylesheet" href="\/_astro\/[^"]+">/g,
    `<style>${css}</style>`,
  );

  html = html.replace(/\b(href|src)="\/([^"]*)"/g, (_match, attribute, target) => {
    const [pathname, suffix = ''] = target.split(/(?=[?#])/);
    const absoluteTarget = path.join(destination, pathname);
    let relative = path.relative(currentDirectory, absoluteTarget).replaceAll(path.sep, '/');
    if (!relative || relative === '.') relative = './';
    if (!relative.startsWith('.')) relative = `./${relative}`;
    if (pathname.endsWith('/') && !relative.endsWith('/')) relative += '/';
    return `${attribute}="${relative}${suffix}"`;
  });

  fs.writeFileSync(file, html);
}

fs.rmSync(cssDirectory, { recursive: true, force: true });
console.log(`Prepared preview bundle at ${destination}`);
