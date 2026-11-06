import { error } from "@sveltejs/kit";
import { marked } from "marked";
import { site } from "$lib/config/site";
import { writingEntries } from "$lib/content/writing";
import type { EntryGenerator, PageLoad } from "./$types";

export const prerender = true;

export const entries: EntryGenerator = () =>
  writingEntries.map((post) => ({ slug: post.slug }));

export const load: PageLoad = ({ params }) => {
  const entry = writingEntries.find((post) => post.slug === params.slug);
  if (!entry) error(404, "Post not found");

  const { body, ...post } = entry;
  return { post, html: marked.parse(body, { async: false }), site };
};
