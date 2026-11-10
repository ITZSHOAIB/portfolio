import type { GithubProject } from "$lib/types/portfolio";

// Project cards. `page` links a card to content/projects/<page>.md; without it the card
// links to `href`. `image` is optional (a file under content/public/).
export const githubProjects: GithubProject[] = [
  {
    name: "Sample Project",
    description:
      "A small command-line tool that turns a folder of notes into a searchable index. Replace this card with your own project.",
    href: "https://github.com/alexrivera/sample-project",
    page: "sample-project",
    language: "TypeScript",
    // Both optional: a date or a label like "Active", and a star count. Delete a line to hide it.
    updated: "2026-11-10",
    stars: 12,
    topics: ["cli", "search", "notes"],
  },
];
