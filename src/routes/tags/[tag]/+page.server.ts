import { error } from "@sveltejs/kit";
import { site } from "$lib/config/site";
import { allTags, postsWithTag } from "$lib/content/writing-queries";
import type { EntryGenerator, PageServerLoad } from "./$types";

export const prerender = true;

export const entries: EntryGenerator = () =>
  allTags().map(({ slug }) => ({ tag: slug }));

export const load: PageServerLoad = ({ params }) => {
  const summary = allTags().find(({ slug }) => slug === params.tag);
  if (!summary) error(404, "Tag not found");

  return { tag: summary.tag, slug: summary.slug, posts: postsWithTag(params.tag), site };
};
