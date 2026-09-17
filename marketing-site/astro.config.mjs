import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://barklens.com',
  output: 'static',
  integrations: [
    sitemap({
      filter: (page) =>
        !page.endsWith('/unsubscribe/') &&
        !page.endsWith('/review/') &&
        !page.endsWith('/404/')
    })
  ],
  trailingSlash: 'always',
  build: {
    format: 'directory'
  }
});
