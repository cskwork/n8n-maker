// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://username.github.io',
  base: '/n8n-marketplace',
  integrations: [mdx()],
  vite: {
    plugins: [tailwindcss()],
  },
});
