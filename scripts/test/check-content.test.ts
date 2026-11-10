import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { test } from "node:test";
import { makeRoot, run, validContent } from "./fixture.ts";

const check = (root: string, ...flags: string[]) =>
  run("check-content.ts", ["--root", root, ...flags]);

test("valid content passes", () => {
  const { code, out } = check(makeRoot());
  assert.equal(code, 0, out);
  assert.match(out, /ok/i);
});

test("a missing cover image names the post and the file", () => {
  const { code, out } = check(
    makeRoot({
      "content/posts/first.md":
        "---\ntitle: First\ndescription: d\npublished: 2026-01-02\ncover: /images/none.jpg\n---\nx\n",
    }),
  );
  assert.equal(code, 1);
  assert.match(out, /content\/posts\/first\.md: cover \/images\/none\.jpg does not exist/);
  assert.match(out, /content\/public\/images\/none\.jpg/);
});

test("a post without a description says how to fix it", () => {
  const { code, out } = check(
    makeRoot({ "content/posts/first.md": "---\ntitle: First\npublished: 2026-01-02\n---\nx\n" }),
  );
  assert.equal(code, 1);
  assert.match(out, /first\.md: description is missing/);
});

test("a draft post may be unfinished", () => {
  const { code } = check(
    makeRoot({ "content/posts/first.md": "---\ntitle: First\ndraft: true\n---\nx\n" }),
  );
  assert.equal(code, 0);
});

test("a post may only reference projects that exist", () => {
  const { code, out } = check(
    makeRoot({
      "content/posts/first.md":
        "---\ntitle: F\ndescription: d\npublished: 2026-01-02\nprojects: [Nope]\n---\nx\n",
    }),
  );
  assert.equal(code, 1);
  assert.match(out, /project "Nope" is not in content\/github-projects\.ts/);
});

test("a project card pointing at a missing page fails", () => {
  const { code, out } = check(makeRoot({ "content/projects/tool.md": null }));
  assert.equal(code, 1);
  assert.match(out, /github-projects\.ts: Tool.*content\/projects\/tool\.md/);
});

test("relative profile links and a bad site url fail", () => {
  const { code, out } = check(
    makeRoot({
      "content/site.ts": validSite("alex.example/"),
      "content/profile.ts":
        'export const profile = { name: "A", role: "r", email: "nope", links: [{ label: "X", username: "x", href: "x.com/a" }] };',
    }),
  );
  assert.equal(code, 1);
  assert.match(out, /site\.ts: url/);
  assert.match(out, /profile\.ts: email/);
  assert.match(out, /profile\.ts: links\[0\]\.href/);
});

test("a missing resume fails", () => {
  const { code, out } = check(makeRoot({ "content/public/resume.pdf": null }));
  assert.equal(code, 1);
  assert.match(out, /content\/public\/resume\.pdf/);
});

test("untouched starter values are reported until they are changed", () => {
  const manifest = JSON.stringify({
    values: [{ module: "profile", export: "profile", path: "name", value: "Alex Rivera" }],
    files: [],
  });
  const { code, out } = check(makeRoot({ "content/.starter.json": manifest }));
  assert.equal(code, 1);
  assert.match(out, /profile\.ts: profile\.name is still the starter value "Alex Rivera"/);

  const changed = check(
    makeRoot({
      "content/.starter.json": manifest,
      "content/profile.ts": validContent["content/profile.ts"].replace(
        'name: "Alex Rivera"',
        'name: "Sam Lee"',
      ),
    }),
  );
  assert.equal(changed.code, 0, changed.out);
});

test("an untouched starter file must be edited or deleted", () => {
  const text = "---\ntitle: S\ndescription: d\npublished: 2026-01-02\n---\nx\n";
  const sha256 = createHash("sha256").update(text).digest("hex");
  const manifest = JSON.stringify({
    values: [],
    files: [{ path: "content/posts/starter.md", sha256 }],
  });
  const { code, out } = check(
    makeRoot({ "content/.starter.json": manifest, "content/posts/starter.md": text }),
  );
  assert.equal(code, 1);
  assert.match(out, /content\/posts\/starter\.md: is still the example page/);
});

test("--allow-placeholders accepts an untouched asset but not an untouched data file", () => {
  const png = "placeholder-bytes";
  const sha256 = createHash("sha256").update(png).digest("hex");
  const manifest = JSON.stringify({ values: [], files: [{ path: "content/public/images/me.jpg", sha256 }] });
  const root = makeRoot({ "content/.starter.json": manifest, "content/public/images/me.jpg": png });
  const strict = check(root);
  assert.equal(strict.code, 1);
  assert.match(strict.out, /me\.jpg: is still the placeholder file.*--allow-placeholders/);
  const allowed = check(root, "--allow-placeholders");
  assert.equal(allowed.code, 0, allowed.out);
});

test("a project page does not need an updated date", () => {
  const page = "---
title: Tool
description: A tool.
repo: https://github.com/alex/tool
---
Body.
";
  const { code, out } = check(makeRoot({ "content/projects/tool.md": page }));
  assert.equal(code, 0, out);
});

test("--json prints problems as data", () => {
  const { code, out } = check(makeRoot({ "content/public/resume.pdf": null }), "--json");
  assert.equal(code, 1);
  const problems = JSON.parse(out);
  assert.equal(problems[0].file, "content/public/resume.pdf");
  assert.ok(problems[0].message);
});

function validSite(url: string) {
  return `export const site = { url: "${url}", name: "A", title: "T", description: "d", image: { path: "/images/og.png" }, profileImage: { path: "/images/me.jpg" } };`;
}
