<div align="center">

<img src="./static/images/og-image.png" alt="Sohab Sk portfolio preview" width="860" />

### A fast, dark, SEO-friendly personal portfolio for AI agents, scalable systems, and selected engineering work.

[![Built with SvelteKit](https://img.shields.io/badge/Built%20with-SvelteKit-ff3e00?style=for-the-badge&logo=svelte&logoColor=white)](https://svelte.dev/docs/kit)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.x-3178c6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.x-06b6d4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Cloudflare Pages](https://img.shields.io/badge/Deploy-Cloudflare%20Pages-f38020?style=for-the-badge&logo=cloudflarepages&logoColor=white)](https://pages.cloudflare.com/)

[Live Site](https://sohab.dev) · [Deployment Notes](./DEPLOYMENT.md) · [Resume](./static/resume.pdf)

</div>

---

## Overview

This repository powers [sohab.dev](https://sohab.dev), the personal portfolio of **Sohab Sk**, Senior Software Engineer at **Skillsoft / Codecademy**.

The site highlights work across agentic AI systems, multi-agent learning-authoring workflows, reusable agent frameworks, full-stack web platforms, blockchain SaaS products, and selected open-source projects.

## What It Includes

- **Modern SvelteKit app** using Svelte 5, Vite, TypeScript, and Tailwind CSS.
- **Content-driven portfolio data** for profile, projects, experience, skills, and an optional blog.
- **SEO and social sharing metadata** with Open Graph, Twitter card tags, canonical URLs, and JSON-LD structured data.
- **Cloudflare Pages deployment path** using the SvelteKit Cloudflare adapter.
- **Generated robots and sitemap routes** for crawler-friendly indexing.
- **CI verification** that runs type checks and production builds on pushes and pull requests.

## Tech Stack

| Area | Tools |
| --- | --- |
| Framework | SvelteKit, Svelte 5 |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| Build Tool | Vite |
| Icons | Lucide Svelte, Simple Icons |
| Deployment | Cloudflare Pages |
| Package Manager | pnpm 11.9.0 |
| Runtime | Node.js 24+ |

## Project Structure

```text
.
├── .github/workflows/ci.yml       # GitHub Actions check and build workflow
├── DEPLOYMENT.md                  # Cloudflare Pages deployment instructions
├── static/
│   ├── images/                    # Profile and social preview assets
│   └── resume.pdf                 # Public resume
├── src/
│   ├── lib/
│   │   ├── components/            # Portfolio sections and UI pieces
│   │   ├── config/site.ts         # Site metadata and feature flags
│   │   ├── content/               # Markdown pipeline, post queries, feeds
│   │   ├── data/portfolio.ts      # Profile, project, skill, and experience data
│   │   ├── icons/                 # Icon helpers
│   │   ├── types/                 # Shared portfolio types
│   │   └── utils/                 # Formatting utilities
│   └── routes/                    # SvelteKit pages, sitemap, and robots routes
├── package.json
├── svelte.config.js
├── tsconfig.json
└── vite.config.ts
```

## Getting Started

### Prerequisites

- Node.js `>=24`
- pnpm `11.9.0`

### Install

```bash
pnpm install
```

### Run Locally

```bash
pnpm dev
```

The dev server binds to `0.0.0.0`, which is useful for local network previews and containerized environments.

### Check And Build

```bash
pnpm verify
```

This runs:

```bash
pnpm check
pnpm build
```

### Preview Production Build

```bash
pnpm preview
```

## Available Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the local Vite development server. |
| `pnpm check` | Sync SvelteKit types and run `svelte-check`. |
| `pnpm build` | Create a production build. |
| `pnpm preview` | Preview the production build locally. |
| `pnpm verify` | Run checks and build together. |

## Customizing Content

Most portfolio content is centralized in a small set of files:

| File | Purpose |
| --- | --- |
| `src/lib/config/site.ts` | Site URL, title, description, Open Graph image metadata, keywords, and feature flags. |
| `src/lib/data/portfolio.ts` | Profile details, social links, selected projects, experience, and skills. |
| `src/content/blog/*.md` | Blog posts, one markdown file each. |
| `src/content/projects/*.md` | Project pages linked from the project cards. |
| `static/resume.pdf` | Public resume linked from the site. |
| `static/images/` | Profile photo and social preview image. |

## Blog

Posts are markdown files in `src/content/blog/` with frontmatter:

```md
---
title: Post title
description: One-sentence summary used for cards, SEO, and feeds.
published: 2026-11-10
updated: 2026-11-12   # optional
tags: [agents, sveltekit]
projects: [Plico]     # optional, "Where I use this" cards, by name from githubProjects
draft: true           # optional, hides the post everywhere
---
```

Each published post gets a page at `/blog/<slug>` with a table of contents, Shiki syntax highlighting, `rehype-code-group` tabs, related posts, an author note and a generated social image at `/blog/<slug>/og.png`. The blog also serves `/blog`, `/tags/<tag>`, `/rss.xml` (full content), `/feed.json`, sitemap entries and `llms.txt` links. With no published posts, `/blog` is `noindex` and the home section stays hidden. Set `features.blog` to `false` in `src/lib/config/site.ts` to switch it all off.

Posts are plain markdown with a few extensions. The source stays readable as markdown, so the `.md` copy, feeds and `llms-full.txt` keep working:

````md
> [!TIP] Optional title
> Callouts use GitHub alert syntax: NOTE, TIP, IMPORTANT, WARNING, CAUTION, TLDR.

::figure harness-anatomy

```prompt title="Try it with your agent"
A prompt readers can copy or open in Claude or ChatGPT.
```

![Alt text](/images/diagram.png "A titled image becomes a captioned figure")

<video src="/videos/demo.mp4" controls muted playsinline></video>
````

A `::figure <id>` line renders a motion graphic: a Svelte component that plays itself while it is on screen, so readers watch rather than click (`autoplay` in `src/lib/components/blog/figures/autoplay.ts`). With reduced motion, it shows a static version instead. Register its caption and text description in `src/lib/content/figures.ts` and its component in `src/lib/components/blog/figures/index.ts`; an unknown id fails the build. Feeds and the `.md` copy show the caption, description and a link to the figure instead.

For readers who learn with AI:

- **Select to ask.** Selecting text in a post shows a small toolbar that opens Claude or ChatGPT with the passage, the post title and its URL, or copies that prompt.
- **Post actions.** Under the title, a "Read with" row opens the post in Claude or ChatGPT, or copies it as markdown.
- **Markdown for agents.** `/blog/<slug>.md` serves each post as plain markdown. `llms.txt` links to it, `llms-full.txt` includes every post, and the `/mcp` server adds `list_blog_posts` and `read_blog_post`, with post paragraphs in `search_portfolio` results.

## Deployment

The site is configured for **Cloudflare Pages** through Git integration.

Recommended Cloudflare build settings:

| Setting | Value |
| --- | --- |
| Framework preset | `SvelteKit` |
| Build command | `pnpm verify` |
| Build output directory | `.svelte-kit/cloudflare` |
| Node version | `24` |
| pnpm version | `11.9.0` |

See [DEPLOYMENT.md](./DEPLOYMENT.md) for the full deployment checklist, including the Cloudflare `nodejs_als` compatibility flag.

## Quality Gates

- Type checking with `svelte-check`.
- Production build validation through `pnpm verify`.
- GitHub Actions workflow on `main`, pull requests, and manual dispatch.
- Cloudflare Pages build also runs `pnpm verify` so invalid builds are not published.

## License

This is a personal portfolio project. Unless a license is added later, all rights are reserved.

---

<div align="center">

Built by [Sohab Sk](https://sohab.dev) · [GitHub](https://github.com/ITZSHOAIB) · [LinkedIn](https://www.linkedin.com/in/IITZSHOAIB)

</div>
