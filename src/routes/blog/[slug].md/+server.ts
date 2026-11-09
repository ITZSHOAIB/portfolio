import { error } from "@sveltejs/kit";
import { postMarkdown } from "$lib/content/agent-markdown";
import { blogEntries } from "$lib/content/blog";
import type { EntryGenerator, RequestHandler } from "./$types";

export const prerender = true;

export const entries: EntryGenerator = () =>
  blogEntries.map((post) => ({ slug: post.slug }));

// The post as plain markdown, for agents and "Copy as Markdown".
export const GET: RequestHandler = ({ params }) => {
  const entry = blogEntries.find((post) => post.slug === params.slug);
  if (!entry) error(404, "Post not found");
  return new Response(postMarkdown(entry), {
    headers: { "content-type": "text/markdown; charset=utf-8" },
  });
};
