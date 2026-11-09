import { site } from "$lib/config/site";
import { writingPosts } from "$lib/content/writing";
import { allTags } from "$lib/content/writing-queries";
import type { PageServerLoad } from "./$types";

export const prerender = true;

export const load: PageServerLoad = () => ({
  posts: writingPosts,
  tags: allTags(),
  site,
});
