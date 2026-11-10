import type { GithubProject } from "$lib/types/portfolio";

export const githubProjects = [
  {
    name: "Plico",
    description:
      "TypeScript-first agent app kit: a folder of Markdown instructions, skills and TypeScript tools becomes a runnable, inspectable agent app you can embed in your own backend.",
    href: "https://plico.sohab.dev",
    language: "TypeScript",
    updated: "Active",
    stars: 2,
    topics: ["agent framework", "workflow kit", "developer tools"],
    image: {
      src: "/images/plico.webp",
      alt: "Plico homepage: Build AI agents from files",
      width: 1100,
      height: 769,
    },
  },
  {
    name: "Rehype Code Group",
    description:
      "Accessible Rehype plugin that turns neighboring code blocks or HTML content into tabbed groups without coupling to a frontend framework or syntax highlighter.",
    href: "https://rehype-code-group.sohab.dev",
    language: "TypeScript",
    updated: "2026-04-29",
    stars: 15,
    topics: ["rehype", "code tabs", "accessibility"],
    metrics: [
      { value: "11k", label: "weekly downloads", icon: "downloads" },
      { value: "15", label: "GitHub stars", icon: "stars" },
    ],
    image: {
      src: "/images/rehype-code-group.webp",
      alt: "Rehype Code Group landing page showing accessible code tabs for documentation",
      width: 1100,
      height: 845,
    },
  },
  {
    name: "Chaingent.app",
    description:
      "Agentic smart contract development platform for building, auditing, and deploying Solidity applications faster.",
    href: "https://chaingent.app/",
    language: "TypeScript",
    updated: "Live app",
    stars: "-",
    topics: ["ai", "web3", "smart contracts", "solidity"],
    image: {
      src: "/images/chaingent.webp",
      alt: "Chaingent app interface preview",
      width: 1100,
      height: 769,
    },
  },
  {
    name: "Creator Skills",
    description:
      "Installable AI agent skills for YouTube creators, covering channel research, scripting, thumbnails, analytics, and creator-approved channel memory.",
    href: "https://creator-skills.sohab.dev/",
    language: "Agent skills",
    updated: "Open source",
    stars: "-",
    topics: ["AI agents", "creator workflows", "YouTube"],
  },
  {
    name: "Dev Skills",
    description:
      "Five agent skills for shipping code you can trust: cold reviews of code, docs and whole products, guided PR reviews, and PR bodies. A fresh agent does the legwork; you make the calls.",
    href: "https://github.com/ITZSHOAIB/dev-skills",
    page: "dev-skills",
    language: "Agent skills",
    updated: "Open source",
    stars: "-",
    topics: ["AI agents", "code review", "developer tools"],
  },
  {
    name: "Cmuxup",
    description:
      "Terminal-first agentic workspace for cmux with one-command setup for lazygit, helix, delta, yazi, and AI coding agents.",
    href: "https://github.com/ITZSHOAIB/cmuxup",
    language: "Shell",
    updated: "2026-07-01",
    stars: 4,
    topics: ["cmux", "agentic workspace", "lazygit", "helix"],
  },
  {
    name: "Hashtegrity",
    description:
      "Library for generating hashes, validating data integrity, and monitoring file, directory, and off-chain data integrity.",
    href: "https://github.com/ITZSHOAIB/hashtegrity",
    language: "TypeScript",
    updated: "2026-05-18",
    stars: 3,
    topics: ["hash", "data integrity", "crypto hash"],
  },
] satisfies GithubProject[];
