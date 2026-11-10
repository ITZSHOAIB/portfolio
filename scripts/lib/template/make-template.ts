import { execFileSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { pathToFileURL } from "node:url";
import { fingerprint } from "../fingerprint.ts";
import { starterAssets } from "./assets.ts";

// Tracked files that never go into the template: personal content (replaced by the
// starter), the generator itself and the README (replaced by the overlay).
const SKIP = [
  "content/",
  "template/",
  "scripts/lib/template/",
  "scripts/make-template.ts",
  "scripts/test/make-template.test.ts",
  "README.md",
];

// Fields of the starter that setup must change.
const VALUES = [
  { module: "site", export: "site", paths: ["url", "name", "title", "twitterHandle"] },
  { module: "profile", export: "profile", paths: ["name", "email", "domain", "company", "focus", "links.0.href"] },
];

// Files that must be edited, replaced or deleted.
const FILES = [
  "content/copy.ts",
  "content/experience.ts",
  "content/skills.ts",
  "content/selected-work.ts",
  "content/github-projects.ts",
  "content/posts/hello-world.md",
  "content/projects/sample-project.md",
  "content/public/images/profile.png",
  "content/public/images/og-image.png",
  "content/public/resume.pdf",
];

const dig = (data: unknown, path: string) =>
  path.split(".").reduce<unknown>((node, key) => (node as Record<string, unknown>)[key], data);

function copyTree(from: string, to: string) {
  if (existsSync(from)) cpSync(from, to, { recursive: true });
}

function prepareOutput(out: string, force: boolean) {
  if (!existsSync(out) || readdirSync(out).length === 0) return;
  if (!force || !existsSync(join(out, "content/.starter.json"))) {
    throw new Error(
      `${out} is not empty. Choose a new folder. --force only replaces a previous generator output (it has content/.starter.json).`,
    );
  }
  for (const name of readdirSync(out)) {
    if (name !== ".git") rmSync(join(out, name), { recursive: true, force: true });
  }
}

async function writeManifest(out: string) {
  const values = [];
  for (const entry of VALUES) {
    const loaded = await import(pathToFileURL(join(out, `content/${entry.module}.ts`)).href);
    for (const path of entry.paths) {
      values.push({ module: entry.module, export: entry.export, path, value: dig(loaded[entry.export], path) });
    }
  }
  const files = FILES.map((path) => ({ path, sha256: fingerprint(path, readFileSync(join(out, path))) }));
  writeFileSync(join(out, "content/.starter.json"), `${JSON.stringify({ values, files }, null, 2)}\n`);
}

function patchPackageJson(out: string) {
  const path = join(out, "package.json");
  const pkg = JSON.parse(readFileSync(path, "utf8"));
  const { author: _a, homepage: _h, repository: _r, ...rest } = pkg;
  rest.name = "agent-ready-portfolio";
  rest.keywords = ["portfolio", "sveltekit", "typescript", "tailwindcss", "cloudflare-pages", "coding-agents"];
  rest.description = "A portfolio site you can set up with a coding agent: SvelteKit, Markdown content, deploys to Cloudflare Pages.";
  writeFileSync(path, `${JSON.stringify(rest, null, 2)}\n`);
}

/** Writes the template into `out`: the app code of `root`, with starter content instead of yours. */
export async function makeTemplate({ root, out, force = false }: { root: string; out: string; force?: boolean }) {
  prepareOutput(out, force);

  const tracked = execFileSync("git", ["ls-files", "-z", "--cached", "--others", "--exclude-standard"], { cwd: root, encoding: "utf8" })
    .split("\0")
    .filter((file) => file && existsSync(join(root, file)) && !SKIP.some((skip) => file.startsWith(skip) || file === skip));
  for (const file of tracked) {
    mkdirSync(dirname(join(out, file)), { recursive: true });
    cpSync(join(root, file), join(out, file));
  }

  copyTree(join(root, "template/starter/content"), join(out, "content"));
  for (const [path, data] of starterAssets()) {
    const target = join(out, "content/public", path);
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, data);
  }
  copyTree(join(root, "template/overlay"), out);

  patchPackageJson(out);
  await writeManifest(out);
  return { files: tracked.length, out: relative(process.cwd(), out) || "." };
}
