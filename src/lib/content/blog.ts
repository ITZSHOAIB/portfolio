import type { BlogPost } from "$lib/types/portfolio";
import { parseFrontmatter, parseTags } from "$lib/content/frontmatter";

// Posts live in src/content/blog/<slug>.md with simple frontmatter:
//
//   ---
//   title: Post title
//   description: One-sentence summary used for cards, SEO, and RSS.
//   published: 2026-11-06
//   updated: 2026-11-08      (optional)
//   tags: [langgraph, agents]
//   projects: [Plico]        (optional, names from githubProjects shown as cards)
//   cover: /images/blog/x.svg (optional, thumbnail under static/ for the blog list card)
//   draft: true              (optional, hides the post everywhere)
//   ---
const files = import.meta.glob("/src/content/blog/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

export type BlogEntry = BlogPost & { body: string };

const WORDS_PER_MINUTE = 220;

const entries: BlogEntry[] = Object.entries(files).flatMap(([path, raw]) => {
  const { data, body } = parseFrontmatter(raw);
  const slug = path.split("/").pop()!.replace(/\.md$/, "");

  if (data.draft === "true") return [];
  if (!data.title || !data.description || !data.published) {
    throw new Error(
      `Blog post "${slug}" needs title, description, and published in its frontmatter.`,
    );
  }

  return [
    {
      title: data.title,
      description: data.description,
      slug,
      published: data.published,
      updated: data.updated,
      tags: parseTags(data.tags),
      projects: parseTags(data.projects),
      cover: data.cover || undefined,
      readingMinutes: Math.max(
        1,
        Math.round(body.split(/\s+/).filter(Boolean).length / WORDS_PER_MINUTE),
      ),
      body,
    },
  ];
});

export const blogEntries = entries.sort((a, b) =>
  b.published.localeCompare(a.published),
);

export const blogPosts: BlogPost[] = blogEntries.map(
  ({ body: _body, ...post }) => post,
);
