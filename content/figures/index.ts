import type { Component } from "svelte";
import type { FigureMeta } from "$lib/content/figures";
import HarnessAnatomy from "./HarnessAnatomy.svelte";
import LayoutChange from "./LayoutChange.svelte";
import RatchetLoop from "./RatchetLoop.svelte";

// Figures a post can place with `::figure <id>` on a line of its own.
// An unknown id fails the build. Each figure needs a component and a caption
// plus a text description (used where components cannot run: feeds, .md, MCP).

export const figureComponents: Record<string, Component> = {
  "harness-anatomy": HarnessAnatomy,
  "ratchet-loop": RatchetLoop,
  "layout-change": LayoutChange,
};

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
  "layout-change": {
    caption: "The same change in both layouts: five files either way, in five folders or in one.",
    description:
      "A request to add discount codes to checkout touches five files: a controller, a service, a repository, a schema and a test. In a layered tree they sit in five folders (controllers, services, repositories, schemas, tests), each mixed in with other features' files. In a feature tree they sit together in one checkout folder, next to the cart and billing folders.",
  },
};
