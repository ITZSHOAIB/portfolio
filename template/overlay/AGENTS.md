# Setting up this portfolio (runbook for coding agents)

This repo is a SvelteKit portfolio that deploys to Cloudflare Pages. Everything about the owner lives in `content/`. Requires Node 24 and pnpm (run `corepack enable` if pnpm is missing). Node 22.18+ works but prints an engine warning; mention it to the human. Your job: turn the placeholder person (Alex Rivera) into the real owner, then hand the human the few steps only they can do.

You are done when `pnpm check-content` prints `check-content: ok` (or `pnpm check-content --allow-placeholders` does, when the human has no photo, social image or resume yet; see below) and `pnpm verify` ends with a successful build. `pnpm verify` skips the starter check so a fresh template can build, so it does not prove setup is finished: always run `check-content` yourself. Do not stop earlier, and do not edit code under `src/` to get there.

If the human has no photo, social image or resume yet, run `pnpm check-content --allow-placeholders` instead. It accepts those three placeholder files and still checks everything else. Say clearly in your report that the placeholders are still there and the human must replace them. Never fake the check by editing the placeholder files.

## 1. Ask the human first

Collect these before editing. Do not invent any of them.

- Full name, and a short lowercase handle (letters and digits only).
- The site address, for example `https://jane.dev` (the domain they own or will buy).
- One-line job title and a two-sentence "about me".
- Public email, plus links: GitHub, LinkedIn, X/Twitter, anything else they want shown.
- Current company and focus line.
- Work history (role, company, dates, two or three bullets each) and skills.
- Up to three pieces of selected work and any open-source projects to list.
- A square photo (at least 512x512) and a resume PDF. If they have none yet, keep the placeholders and say so.
- Where they are based (or leave it out), and which features to keep: `blog`, `askAi`, `mcp`, `openToWork` (see `content/site.ts`).

If the human does not answer a question, use these defaults and list them in your report: `blog` off unless they have posts, `openToWork` off, `askAi` and `mcp` on, `analyticsToken` empty, no location. Optional fields (`location`, a project card's `stars` and `updated`) are deleted rather than filled with made-up values. For required text the human did not give you, write the shortest honest value from facts you have, and list it in your report so they can improve it:

| Field | If you have nothing |
| --- | --- |
| `profile.focus` | A fragment from their role and skills, e.g. "accessible user interfaces" (it is spliced into a sentence) |
| `profile.current`, `profile.previous` | One sentence from the role and work history they gave you |
| `profile.writing` | Something short and true, e.g. "I have not published any posts yet." (hidden with the blog) |
| `site.twitterHandle` | `""` |
| `site.openToWorkText` | `""` when `openToWork` is off |
| Experience `highlights`, selected-work `metrics`, `stack` | `[]` |
| `careerStartDate` | The first day of the year they gave you |

Dates are written in the files with CRLF line endings on Windows; make multi-line edits with a tool that preserves them.

The "about me" lives in `content/profile.ts` (`current`, `previous`, `writing`) and the short description in `content/site.ts`.

## 2. What you can do

Each file starts with comments saying what every field does. Edit values, keep the structure.

| To change | Edit |
| --- | --- |
| Name, URL, title, descriptions, feature flags | `content/site.ts` |
| Bio, links, email, company, focus | `content/profile.ts` |
| Section titles and intro text | `content/copy.ts` |
| Work history | `content/experience.ts` |
| Skills | `content/skills.ts` |
| Selected work cards | `content/selected-work.ts` |
| Open-source project cards | `content/github-projects.ts`, with an optional page in `content/projects/*.md` |
| Blog posts | `content/posts/*.md` (create with `pnpm new:post`) |
| Photo, social image, resume, icons | `content/public/` (keep the file names, or update the paths in `content/site.ts`) |
| Animated blog figures | `content/figures/` |

Commands:

```sh
pnpm install                   # once
git init                       # if the folder is not a git repo yet; deployment needs one
pnpm check-content             # what is still a starter value or broken; run until it says ok
pnpm check-content --json      # same, machine-readable
pnpm check-content --allow-placeholders  # accept placeholder photo, social image and resume
pnpm new:post "Title" --description "..." --tags a,b --publish
pnpm new:project "Name" --repo <url> --description "..."
pnpm dev                       # preview at http://localhost:5173
pnpm verify                    # type checks, tests, content check, production build
```

Loop: edit, run `pnpm check-content`, read each problem (it names the file and the field), fix, repeat. Then run `pnpm verify`.

Rules:

- Replace the placeholder `hello-world` post and `sample-project` page. Delete them, or turn them into real content. Do not leave them in.
- Replace `content/public/images/profile.png`, `og-image.png` and `resume.pdf` with the human's files. If they have none, use `--allow-placeholders` (above) and tell them.
- If the human has no blog, set `features.blog` to `false` instead of keeping the placeholder post.
- Write only facts the human gave you. Never invent employers, dates, links or metrics.
- Do not add dependencies, and do not touch `src/` or `scripts/`.

## 3. What only the human can do

Hand these over as a short numbered list when the content is done. Do not try to run them.

1. Push the repo to their GitHub account.
2. Log in to Cloudflare and create a Pages project from that repo (`DEPLOYMENT.md`). Approve the first deploy.
3. Point their domain at it: DNS records and the custom domain in Cloudflare.
4. Optional: create a Cloudflare Web Analytics site and paste its token into `analyticsToken` in `content/site.ts`.
5. Review the site in the browser and approve the copy. You cannot judge how it reads.

## 4. Writing posts

`content/posts/hello-world.md` documents frontmatter, callouts, figures and code blocks. Read it before writing the human's first post, then replace it.
