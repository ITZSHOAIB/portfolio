import { site } from "$content/site";
import { blogPosts } from "$lib/content/blog";
import { allTags } from "$lib/content/blog-queries";
import type { PageServerLoad } from "./$types";

export const prerender = true;

export const load: PageServerLoad = () => ({
  posts: blogPosts,
  tags: allTags(),
  site,
});
