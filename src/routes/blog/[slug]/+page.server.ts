import { error } from "@sveltejs/kit";
import { site } from "$lib/config/site";
import { postMarkdownUrl, postUrl } from "$lib/content/agent-markdown";
import { blogEntries } from "$lib/content/blog";
import { adjacentPosts, relatedPosts } from "$lib/content/blog-queries";
import { splitFigures } from "$lib/content/figures";
import { renderMarkdown } from "$lib/content/markdown";
import { githubProjects } from "$lib/data/portfolio";
import type { EntryGenerator, PageServerLoad } from "./$types";

export const prerender = true;

export const entries: EntryGenerator = () =>
  blogEntries.map((post) => ({ slug: post.slug }));

export const load: PageServerLoad = async ({ params }) => {
  const entry = blogEntries.find((post) => post.slug === params.slug);
  if (!entry) error(404, "Post not found");

  const { body, ...post } = entry;
  const { html, toc } = await renderMarkdown(body);

  const projects = post.projects.map((name) => {
    const project = githubProjects.find(
      (candidate) => candidate.name.toLowerCase() === name.toLowerCase(),
    );
    if (!project) {
      throw new Error(`Post "${post.slug}" lists unknown project "${name}".`);
    }
    return project;
  });

  return {
    post,
    segments: splitFigures(html),
    toc,
    url: postUrl(post.slug),
    markdownUrl: postMarkdownUrl(post.slug),
    projects,
    related: relatedPosts(post),
    ...adjacentPosts(post.slug),
    site,
  };
};
