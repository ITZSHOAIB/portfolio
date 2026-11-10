# Deployment

The site deploys to Cloudflare Pages. You need a Cloudflare account and the repo on GitHub.

## Connect GitHub (recommended)

In the Cloudflare dashboard: Workers & Pages, Create, Pages, Connect to Git. Pick the repo, then use:

- Framework preset: `SvelteKit`
- Production branch: `main`
- Build command: `pnpm verify`
- Build output directory: `.svelte-kit/cloudflare`
- Root directory: `/`

Environment variables (build):

- `NODE_VERSION=24`
- `PNPM_VERSION=11.9.0`

Under Settings, Runtime, Compatibility flags, add `nodejs_als`.

`pnpm verify` runs the checks and the build, so a broken site never publishes. A fresh clone still passes with the starter content; `pnpm check-content` (without flags) is what tells you when you have replaced everything.

## Direct upload

No Git integration needed:

```sh
pnpm install
pnpm verify
pnpm dlx wrangler login
pnpm dlx wrangler pages deploy .svelte-kit/cloudflare --project-name <your-project>
```

Set the `nodejs_als` compatibility flag in the project settings the first time.

## Custom domain

In the Pages project: Custom domains, Set up a domain. Use the same address as `site.url` in `content/site.ts`, because canonical links, feeds and the sitemap are built from it.

## Analytics (optional)

Create a Web Analytics site in Cloudflare and paste its beacon token into `analyticsToken` in `content/site.ts`. It is cookie-free. Leave it empty to turn analytics off.

## No functions host?

`features.mcp` needs a host that runs functions, which Cloudflare Pages does. On a static host set it to `false`.
