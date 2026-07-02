# Deployment

This site deploys through Cloudflare Pages Git integration.

## Cloudflare Pages

Use these build settings:

- Framework preset: `SvelteKit`
- Production branch: `main`
- Build command: `pnpm verify`
- Build output directory: `.svelte-kit/cloudflare`
- Root directory: `/`

Set these build environment variables:

- `NODE_VERSION=24`
- `PNPM_VERSION=11.9.0`

In the Cloudflare Pages project runtime settings, add the compatibility flag:

- `nodejs_als`

## GitHub

Protect `main` with a ruleset or branch protection rule:

- Require pull requests before merge.
- Require status checks to pass.
- Require the `CI / Check and build` workflow.
- Restrict bypasses and direct pushes.

Cloudflare does not wait for external GitHub Actions before starting its Git-integrated build, so `pnpm verify` also runs inside Cloudflare. A failed check or build exits nonzero and prevents the Pages deployment from being published.

Wrangler is not required for this deployment path. Add it later only if you want local Cloudflare Pages emulation with `wrangler pages dev` or direct-upload deployments.
