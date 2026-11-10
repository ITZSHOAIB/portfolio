import { blogPosts } from "$lib/content/blog";
import type { RequestHandler } from "./$types";

export const prerender = true;

// Cloudflare Pages reads this file as `_redirects`: "<from> <to> <status>" per line.
// Posts list their old slugs under `aliases`, so renaming a post file keeps the old URL alive.
export const GET: RequestHandler = () => {
  const lines = blogPosts.flatMap((post) =>
    post.aliases.flatMap((alias) => [
      `/blog/${alias} /blog/${post.slug} 301`,
      `/blog/${alias}.md /blog/${post.slug}.md 301`,
    ]),
  );
  return new Response(`${lines.join("\n")}\n`, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
};
