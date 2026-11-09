---
title: Hello, world: how this blog works
description: A short tour of the writing setup on this site, from markdown files to OG images and feeds.
published: 2026-11-10
tags: [meta, sveltekit]
draft: true
---

This is a placeholder post for checking the blog end to end. It is a draft, so it stays hidden until you remove `draft: true` from its frontmatter. Delete or replace it with a real post.

## How posts are written

Each post is one markdown file in `src/content/writing/`. The frontmatter holds the title, description, publish date and tags. Everything else is plain markdown with GitHub-flavoured extras like tables.

```ts
// Syntax highlighting is done at build time with Shiki.
const posts = await loadPosts();
console.log(`${posts.length} posts`);
```

::: code-group labels=[pnpm, npm]

```bash
pnpm add rehype-code-group
```

```bash
npm install rehype-code-group
```

:::

## What you get for free

| Feature | Where |
|---|---|
| Per-post social image | `/writing/<slug>/og.png` |
| Full-content feeds | `/rss.xml` and `/feed.json` |
| Tag pages | `/tags/<tag>` |

### Related posts and navigation

Posts that share tags are linked at the bottom of each post, along with the newer and older posts.
