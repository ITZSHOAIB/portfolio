import { error } from "@sveltejs/kit";
import { site } from "$content/site";
import { blogPosts } from "$lib/content/blog";
import { formatDate } from "$lib/utils/date";
import type { EntryGenerator, RequestHandler } from "./$types";

export const prerender = true;

export const entries: EntryGenerator = () =>
  blogPosts.map((post) => ({ slug: post.slug }));

export const GET: RequestHandler = async ({ params }) => {
  const post = blogPosts.find((entry) => entry.slug === params.slug);
  if (!post) error(404, "Post not found");

  const { renderOgPng } = await import("$lib/og/render");
  const png = await renderOgPng({
    title: post.title,
    eyebrow: post.tags.slice(0, 3).join(" · ") || "Blog",
    footer: `${site.name} · ${formatDate(post.published)}`,
    cover: post.cover,
  });

  return new Response(new Uint8Array(png), {
    headers: {
      "content-type": "image/png",
      "cache-control": "public, max-age=31536000, immutable",
    },
  });
};
