// Usage: node content/covers/kit/render.mjs content/covers/<slug>
// Renders <slug>/card.json and its illustration.svg to content/public/images/blog/<slug>.jpg (1200x630).
// Needs Microsoft Edge (or set EDGE to another Chromium) and ffmpeg on the PATH.
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { basename, dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
if (!process.argv[2]) throw new Error("Usage: node content/covers/kit/render.mjs content/covers/<slug>");
const dir = resolve(process.argv[2]);
const slug = basename(dir);
const card = JSON.parse(readFileSync(join(dir, "card.json"), "utf8"));
// An illustration.mjs (built with draw.mjs) wins over a hand-made illustration.svg.
const script = join(dir, "illustration.mjs");
card.svg = existsSync(script)
  ? (await import(pathToFileURL(script).href)).default
  : readFileSync(join(dir, "illustration.svg"), "utf8");

const work = join(tmpdir(), `blog-cover-${slug}`);
rmSync(work, { recursive: true, force: true });
mkdirSync(work, { recursive: true });
const page = join(work, "cover.html");
writeFileSync(
  page,
  readFileSync(join(here, "template.html"), "utf8").replace("/*DATA*/{}", () =>
    JSON.stringify(card).replaceAll("<", "\\u003c"),
  ),
);

// Render at 2x, then downscale, so thin lines and small type stay crisp.
const png = join(work, "cover@2x.png");
const edge = process.env.EDGE ?? "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
execFileSync(
  edge,
  [
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    "--no-first-run",
    `--user-data-dir=${join(work, ".edge-profile")}`,
    "--force-device-scale-factor=2",
    "--window-size=1200,630",
    "--virtual-time-budget=8000",
    `--screenshot=${png}`,
    pathToFileURL(page).href,
  ],
  { stdio: "ignore" },
);
for (let i = 0; i < 100 && !existsSync(png); i++) await new Promise((r) => setTimeout(r, 100));
if (!existsSync(png)) throw new Error(`no screenshot written: ${png}`);

const out = resolve(here, "../../public/images/blog", `${slug}.jpg`);
execFileSync("ffmpeg", ["-loglevel", "error", "-y", "-i", png, "-vf", "scale=1200:630:flags=lanczos", "-q:v", "4", out]);
console.log(out);
