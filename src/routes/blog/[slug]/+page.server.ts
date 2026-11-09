import { error } from "@sveltejs/kit";
import { site } from "$lib/config/site";
import { renderMarkdown } from "$lib/content/markdown";
import { blogEntries } from "$lib/content/blog";
import { adjacentPosts, relatedPosts } from "$lib/content/blog-queries";
import type { EntryGenerator, PageServerLoad } from "./$types";

export const prerender = true;

export const entries: EntryGenerator = () =>
  blogEntries.map((post) => ({ slug: post.slug }));

export const load: PageServerLoad = async ({ params }) => {
  const entry = blogEntries.find((post) => post.slug === params.slug);
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
