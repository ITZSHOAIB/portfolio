import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter(),
    // Everything personal lives in content/; public/ holds the files served from the site root.
    alias: { $content: 'content' },
    files: { assets: 'content/public' },
    prerender: {
      // /writing/[slug] has no entries until the first post is published.
      handleUnseenRoutes: 'ignore'
    }
  }
};

export default config;
