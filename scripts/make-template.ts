import { resolve } from "node:path";
import { parseArgs } from "node:util";
import { makeTemplate } from "./lib/template/make-template.ts";

// pnpm make-template --out <dir> [--force]
// Writes the agent-ready-portfolio template for review. Review it, then push it yourself.
const { values } = parseArgs({
  options: { out: { type: "string" }, force: { type: "boolean" } },
});

if (!values.out) {
  console.error("make-template: --out <dir> is required, for example: pnpm make-template --out ../agent-ready-portfolio");
  process.exit(1);
}

try {
  const result = await makeTemplate({ root: process.cwd(), out: resolve(values.out), force: values.force });
  console.log(`make-template: wrote the template to ${result.out} (${result.files} files from this repo plus the starter content).`);
} catch (error) {
  console.error(`make-template: ${(error as Error).message}`);
  process.exit(1);
}
