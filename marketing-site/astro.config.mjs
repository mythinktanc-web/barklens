import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://barklens.com',
  output: 'static',
  integrations: [
    sitemap({
      filter: (page) => !page.endsWith('/unsubscribe/')
    })
  ],
  trailingSlash: 'always',
  build: {
    format: 'directory'
  }
});
