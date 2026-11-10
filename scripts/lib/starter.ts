import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import type { Problem } from "./problems.ts";

// content/.starter.json is written by the template generator. It lists the starter
// values and files that setup must change. This repo has none, so nothing is reported.
type Manifest = {
  values: { module: string; export: string; path: string; value: string }[];
  files: { path: string; sha256: string }[];
};

const dig = (data: unknown, path: string) =>
  path
    .split(".")
    .reduce<unknown>((node, key) => (node as Record<string, unknown> | undefined)?.[key], data);

export async function checkStarter(root: string): Promise<Problem[]> {
  const manifestPath = join(root, "content/.starter.json");
  if (!existsSync(manifestPath)) return [];
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8")) as Manifest;
  const problems: Problem[] = [];

  for (const entry of manifest.values) {
    const file = `content/${entry.module}.ts`;
    const loaded = await import(pathToFileURL(join(root, file)).href).catch(() => null);
    if (dig(loaded?.[entry.export], entry.path) === entry.value) {
      problems.push({
        file,
        message: `${entry.export}.${entry.path} is still the starter value "${entry.value}". Replace it with your own.`,
      });
    }
  }

  for (const entry of manifest.files) {
    if (!existsSync(join(root, entry.path))) continue;
    const text = readFileSync(join(root, entry.path), "utf8").replace(/\r\n/g, "\n");
    if (createHash("sha256").update(text).digest("hex") === entry.sha256) {
      problems.push({
        file: entry.path,
        message: "is still the starter file. Edit it for your own site or delete it.",
      });
    }
  }
  return problems;
}
