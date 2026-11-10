// Interactive figures used in posts. A post places one with a line of its own:
//
//   ::figure harness-anatomy
//
// The page renders the matching component from $lib/components/blog/figures.
// Feeds, the raw .md copy, llms-full.txt and the MCP server cannot run
// components, so they use the caption and description below instead.
export type FigureMeta = { caption: string; description: string };

export const figures: Record<string, FigureMeta> = {
  "harness-anatomy": {
    caption: "The six parts of a harness, after LangChain and Addy Osmani.",
    description:
      "A model sits in the middle of a harness made of six parts: instructions (system prompts, AGENTS.md, CLAUDE.md, skill files), tools (tools, skills, MCP servers and their descriptions), bundled infrastructure (filesystem, sandbox, browser), orchestration (subagent spawning, handoffs, model routing), hooks and middleware (compaction, continuation, lint checks) and observability (logs, traces, cost and latency metering). The first five come from LangChain; observability is Addy Osmani's addition.",
  },
  "ratchet-loop": {
    caption: "The ratchet: every repeated mistake ends as a file, and the file runs every time.",
    description:
      "A loop with four steps. 1. Spot a mistake the agent repeats. 2. Decide whether it needs a guide (the agent didn't know) or a sensor (nothing told it that it was wrong). 3. Fix it in a file: an AGENTS.md line, a script, a test or a lint rule. 4. The check runs on every future change, so the mistake does not come back. Then the loop starts again with the next mistake.",
  },
};

export const FIGURE_LINE = /^::figure\s+([a-z0-9-]+)\s*$/;

// The rendered page swaps this placeholder for the figure component.
const PLACEHOLDER = /<div data-figure="([a-z0-9-]+)"><\/div>/;

export type PostSegment =
  | { type: "html"; html: string }
  | { type: "figure"; id: string };

export function splitFigures(html: string): PostSegment[] {
  const parts = html.split(new RegExp(PLACEHOLDER, "g"));
  return parts.flatMap((part, index): PostSegment[] => {
    if (index % 2 === 1) return [{ type: "figure", id: part }];
    return part.trim() ? [{ type: "html", html: part }] : [];
  });
}
