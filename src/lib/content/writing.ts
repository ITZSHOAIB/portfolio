import type { WritingPost } from "$lib/types/portfolio";

// Posts live in src/content/writing/<slug>.md with simple frontmatter:
//
//   ---
//   title: Post title
//   description: One-sentence summary used for cards, SEO, and RSS.
//   published: 2026-11-06
//   updated: 2026-11-08      (optional)
//   tags: [langgraph, agents]
//   draft: true              (optional, hides the post everywhere)
//   ---
const files = import.meta.glob("/src/content/writing/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

export type WritingEntry = WritingPost & { body: string };

const WORDS_PER_MINUTE = 220;

function parseFrontmatter(raw: string) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { data: {} as Record<string, string>, body: raw };

  const data: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const separator = line.indexOf(":");
    if (separator === -1) continue;
    data[line.slice(0, separator).trim()] = line
      .slice(separator + 1)
      .trim()
      .replace(/^["']|["']$/g, "");
  }
  return { data, body: match[2] };
}

function parseTags(value = "") {
  return value
    .replace(/^\[|\]$/g, "")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

const entries: WritingEntry[] = Object.entries(files).flatMap(([path, raw]) => {
  const { data, body } = parseFrontmatter(raw);
  const slug = path.split("/").pop()!.replace(/\.md$/, "");

  if (data.draft === "true") return [];
  if (!data.title || !data.description || !data.published) {
    throw new Error(
      `Writing post "${slug}" needs title, description, and published in its frontmatter.`,
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
      readingMinutes: Math.max(
        1,
        Math.round(body.split(/\s+/).filter(Boolean).length / WORDS_PER_MINUTE),
      ),
      body,
    },
  ];
});

export const writingEntries = entries.sort((a, b) =>
  b.published.localeCompare(a.published),
);

export const writingPosts: WritingPost[] = writingEntries.map(
  ({ body: _body, ...post }) => post,
);
