import { error } from "@sveltejs/kit";
import { marked } from "marked";
import { site } from "$content/site";
import { projectPages } from "$lib/content/projects";
import type { EntryGenerator, PageLoad } from "./$types";

export const prerender = true;

export const entries: EntryGenerator = () =>
  projectPages.map((page) => ({ slug: page.slug }));

export const load: PageLoad = ({ params }) => {
  const entry = projectPages.find((page) => page.slug === params.slug);
  if (!entry) error(404, "Project not found");

  const { body, ...project } = entry;
  return { project, html: marked.parse(body, { async: false }), site };
};
