import { parseArgs } from "node:util";
import { checkContent } from "./lib/check-content.ts";
import { formatProblem } from "./lib/problems.ts";

// pnpm check-content [--json] [--ignore-starter] [--root <dir>]
// --ignore-starter skips the "still a starter value" checks; the build uses it so a fresh
// template still builds. Run without it to find out whether setup is finished.
// Exits 0 when the content is complete and valid, 1 with one line per problem otherwise.
const { values } = parseArgs({
  options: { json: { type: "boolean" }, "ignore-starter": { type: "boolean" }, root: { type: "string", default: process.cwd() } },
});

const problems = await checkContent(values.root!, { ignoreStarter: values["ignore-starter"] });

if (values.json) {
  console.log(JSON.stringify(problems, null, 2));
} else if (problems.length === 0) {
  console.log("check-content: ok");
} else {
  console.log(`check-content: ${problems.length} problem${problems.length === 1 ? "" : "s"}\n`);
  for (const problem of problems) console.log(`- ${formatProblem(problem)}`);
}
process.exit(problems.length ? 1 : 0);
