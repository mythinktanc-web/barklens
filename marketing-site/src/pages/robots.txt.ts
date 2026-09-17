import type { APIRoute } from 'astro';

const noindex = !(
  import.meta.env.PUBLIC_SITE_NOINDEX === 'false' ||
  process.env.VERCEL_ENV === 'production'
);

export const GET: APIRoute = () => {
  const body = noindex
    ? `User-agent: *\nDisallow: /\n`
    : `User-agent: *\nAllow: /\n\nSitemap: https://barklens.com/sitemap-index.xml\n`;
  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=300'
    }
  });
};
