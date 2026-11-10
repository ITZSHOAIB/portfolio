# agent-ready-portfolio

A portfolio site you set up by editing files in `content/`, or by asking a coding agent to do it. SvelteKit, Tailwind, Cloudflare Pages.

- Blog in Markdown, with callouts, code highlighting, animated figures, RSS and JSON feeds, tags and an OG image per post.
- Projects, experience, skills and selected work from typed files with a comment above every field.
- Optional: Ask AI buttons, a read-only MCP server so agents can read your site, an open-to-work line, Cloudflare analytics. Each is a flag in `content/site.ts`.
- `llms.txt` and a `.md` version of each post, for AI readers.
- Written for agents: `AGENTS.md` is a setup runbook and `pnpm check-content` says exactly what is left to fix.

## Start

```sh
pnpm install
pnpm check-content   # what is still a placeholder
pnpm dev             # http://localhost:5173
pnpm verify          # type checks, tests, content check, build
```

See [SETUP.md](SETUP.md) to set up, [AGENTS.md](AGENTS.md) for the agent runbook and [DEPLOYMENT.md](DEPLOYMENT.md) to publish.

## Layout

| Path | What |
| --- | --- |
| `content/` | Everything about you: data, posts, images, resume |
| `src/` | The site itself; you should not need to edit it |
| `scripts/` | `check-content`, `new:post`, `new:project` |

## Licence

MIT for the code. See [LICENSE](LICENSE): posts, photos, resume and images of the original site are not licensed for reuse.
