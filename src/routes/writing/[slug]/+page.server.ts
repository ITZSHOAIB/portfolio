import { error } from "@sveltejs/kit";
import { site } from "$lib/config/site";
import { renderMarkdown } from "$lib/content/markdown";
import { writingEntries } from "$lib/content/writing";
import { adjacentPosts, relatedPosts } from "$lib/content/writing-queries";
import type { EntryGenerator, PageServerLoad } from "./$types";

export const prerender = true;

export const entries: EntryGenerator = () =>
  writingEntries.map((post) => ({ slug: post.slug }));

export const load: PageServerLoad = async ({ params }) => {
  const entry = writingEntries.find((post) => post.slug === params.slug);
  if (!entry) error(404, "Post not found");

  const { body, ...post } = entry;
  const { html, toc } = await renderMarkdown(body);
  return {
    post,
    html,
    toc,
    related: relatedPosts(post),
    ...adjacentPosts(post.slug),
    site,
  };
};
