import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter(),
    prerender: {
      // /writing/[slug] has no entries until the first post is published.
      handleUnseenRoutes: 'ignore'
    }
  }
};

export default config;
