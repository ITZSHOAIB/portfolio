import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { before, test } from "node:test";
import { run } from "./fixture.ts";

// Generating once is enough: every test reads the same output.
let out: string;
const generate = (dir: string, ...flags: string[]) => run("make-template.ts", ["--out", dir, ...flags], process.cwd());

const walk = (dir: string): string[] =>
  readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });

before(() => {
  out = join(mkdtempSync(join(tmpdir(), "template-")), "site");
  const { code, out: log } = generate(out);
  assert.equal(code, 0, log);
});

test("the template contains none of the owner's personal strings", () => {
  const personal = /sohab|skillsoft|codecademy|itzshoaib|0xsohab|4techloverz|sksohab|harness-engineering|package-by-feature|agentic|blockchain|multi-agent|AI products/i;
  const hits = walk(out)
    .filter((path) => /\.(ts|svelte|md|json|css|html|yml|yaml|svg|webmanifest)$/.test(path) && !path.includes("pnpm-lock"))
    .filter((path) => personal.test(readFileSync(path, "utf8")));
  assert.deepEqual(hits, []);
});

test("it has the project files and a renamed package", () => {
  for (const file of ["content/site.ts", "content/posts/hello-world.md", "content/public/resume.pdf", "content/public/images/profile.png", "src/routes/+page.svelte", "README.md"]) {
    assert.ok(statSync(join(out, file)).isFile(), file);
  }
  const pkg = JSON.parse(readFileSync(join(out, "package.json"), "utf8"));
  assert.equal(pkg.name, "agent-ready-portfolio");
  assert.equal(pkg.repository, undefined);
  assert.equal(pkg.author, undefined);
});

test("every check-content problem on a fresh template is an untouched starter value", () => {
  const { code, out: json } = run("check-content.ts", ["--root", out, "--json"]);
  assert.equal(code, 1);
  const problems = JSON.parse(json) as { file: string; message: string }[];
  assert.ok(problems.length > 5);
  for (const problem of problems) assert.match(problem.message, /still the starter/, `${problem.file}: ${problem.message}`);
  assert.ok(problems.some((problem) => problem.file === "content/profile.ts" && /profile\.name/.test(problem.message)));
});

test("--ignore-starter lets a fresh template pass, for the build", () => {
  const { code, out: log } = run("check-content.ts", ["--root", out, "--ignore-starter"]);
  assert.equal(code, 0, log);
});

test("without the starter manifest the template content is valid", () => {
  const copy = join(mkdtempSync(join(tmpdir(), "template-")), "copy");
  generate(copy);
  rmSync(join(copy, "content/.starter.json"));
  const { code, out: log } = run("check-content.ts", ["--root", copy]);
  assert.equal(code, 0, log);
});

test("it will not write into a folder that already has files", () => {
  const dir = mkdtempSync(join(tmpdir(), "template-"));
  mkdirSync(join(dir, "keep"));
  writeFileSync(join(dir, "keep/file.txt"), "mine");
  const { code, out: log } = generate(dir);
  assert.equal(code, 1);
  assert.match(log, /not empty/);
  assert.equal(readFileSync(join(dir, "keep/file.txt"), "utf8"), "mine");
  assert.equal(generate(dir, "--force").code, 1);
});

test("--force replaces a previous output and keeps .git", () => {
  const dir = mkdtempSync(join(tmpdir(), "template-"));
  assert.equal(generate(dir).code, 0);
  mkdirSync(join(dir, ".git"));
  writeFileSync(join(dir, "stale.txt"), "old");
  assert.equal(generate(dir, "--force").code, 0);
  assert.throws(() => statSync(join(dir, "stale.txt")));
  assert.ok(statSync(join(dir, ".git")).isDirectory());
});

test("--out is required", () => {
  const { code, out: log } = run("make-template.ts", [], process.cwd());
  assert.equal(code, 1);
  assert.match(log, /--out/);
});
