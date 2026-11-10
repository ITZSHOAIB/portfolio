# Setup

Two ways: let a coding agent do it, or do it by hand.

## With a coding agent

Open this folder in Claude Code, Codex, Cursor or similar and say:

> Set this up as my portfolio. Follow AGENTS.md.

It will ask for your details, edit `content/`, and tell you what is left for you (GitHub, Cloudflare, DNS). Have these ready: name, site address, bio, links, work history, a square photo and a resume PDF.

## By hand

Requires Node 24 and pnpm.

```sh
pnpm install
pnpm check-content   # lists everything still a starter value
pnpm dev             # http://localhost:5173
```

1. Edit the files in `content/`. Every field has a comment above it.
2. Run `pnpm check-content` until it prints `check-content: ok`.
3. Replace `content/public/images/profile.png`, `og-image.png` and `resume.pdf`. No files yet? Run `pnpm check-content --allow-placeholders` until you have them.
4. Delete or replace `content/posts/hello-world.md` and `content/projects/sample-project.md`.
5. Run `pnpm verify`, then follow `DEPLOYMENT.md`.

New post: `pnpm new:post "Title" --description "..." --tags a,b --publish`.
