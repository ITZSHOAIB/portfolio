import { parseArgs } from "node:util";
import { checkContent } from "./lib/check-content.ts";
import { formatProblem } from "./lib/problems.ts";

// pnpm check-content [--json] [--root <dir>]
// Exits 0 when the content is complete and valid, 1 with one line per problem otherwise.
const { values } = parseArgs({
  options: { json: { type: "boolean" }, root: { type: "string", default: process.cwd() } },
});

const problems = await checkContent(values.root!);

if (values.json) {
  console.log(JSON.stringify(problems, null, 2));
} else if (problems.length === 0) {
  console.log("check-content: ok");
} else {
  console.log(`check-content: ${problems.length} problem${problems.length === 1 ? "" : "s"}\n`);
  for (const problem of problems) console.log(`- ${formatProblem(problem)}`);
}
process.exit(problems.length ? 1 : 0);
