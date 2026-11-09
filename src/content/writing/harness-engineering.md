---
title: Harness engineering: the part of an agent that isn't the model
description: What people mean by an agent harness, what it is made of, and how to turn every repeated agent mistake into a permanent fix.
published: 2026-11-10
tags: [ai-agents, harness-engineering]
draft: true
---

When a coding agent does something dumb, the reflex is to blame the model. Often the model is fine. The agent ran the wrong command because nothing told it the right one, or it declared victory because nothing checked its work. Those are problems with everything around the model, and that surrounding layer now has a name: the harness.

This post covers what the word means, what a harness is made of, and a small habit that does most of the work.

## Two meanings of one word

"Harness engineering" is about nine months old and is used in two ways that are easy to mix up.

**As a layer.** Vivek Trivedy at LangChain gives the shortest definition: "Agent = Model + Harness." A harness, in his words, is "every piece of code, configuration, and execution logic that isn't the model itself." If you're not the model, you're the harness.

**As a practice.** Mitchell Hashimoto describes a habit he calls harness engineering: "anytime you find an agent makes a mistake, you take the time to engineer a solution such that the agent never makes that mistake again." He also says he doesn't know if there's a broad industry-accepted term yet, and would switch if another one exists.

The layer is what you have. The practice is how you improve it. The rest of this post covers both, in that order.

## What a harness is made of

LangChain's list, which Addy Osmani repeats and extends, has six parts:

| Part | Examples |
|---|---|
| Instructions | System prompts, `AGENTS.md`, `CLAUDE.md`, skill files |
| Tools | Tools, skills, MCP servers, and their descriptions |
| Bundled infrastructure | Filesystem, sandbox, browser |
| Orchestration | Subagent spawning, handoffs, model routing |
| Hooks and middleware | Compaction, continuation, lint checks |
| Observability | Logs, traces, cost and latency metering (Osmani's addition) |

Two ideas in LangChain's post are worth keeping in your head.

First, **context rot**: reasoning degrades as the context window fills. Much of a harness exists to fight it, through compaction, writing large tool outputs to files instead of keeping them in context, and skills that load only when needed.

Second, **durable state**. The filesystem and git give an agent somewhere to put work that outlives one context window. Anthropic's post on long-running agents builds on this: a first session sets up an init script, a progress log and an initial commit, and later sessions pick up from them.

## Does the harness matter more than the model?

Osmani puts it strongly: "A decent model with a great harness beats a great model with a bad harness." He calls it his own observation and gives no benchmark for it, so read it as a claim from experience.

LangChain offers some evidence. It says its coding agent went from "Top 30 to Top 5 on Terminal Bench 2.0 by only changing the harness," and that a model scores differently in different harnesses. The post gives no scores, so treat this as the vendor's report.

The same post also argues "harnesses should matter less over time", since models will absorb some of this work. Harness engineering stays useful, in the way prompt engineering did, but parts of it will go away.

## Guides and sensors

Birgitta Böckeler's article on martinfowler.com gives the most practical way to sort controls. A **guide** is feedforward: it anticipates the agent's behaviour and steers it before it acts. A **sensor** is feedback: it observes after the agent acts and helps it correct itself.

You need both. In her words, feedback alone gives an agent that "keeps repeating the same mistakes." Feedforward alone gives one that "encodes rules but never finds out whether they worked."

She adds a second axis. *Computational* controls (tests, linters, type checkers) are deterministic and fast, cheap enough to run on every change. *Inferential* controls (an LLM reviewer, an AI judge) add semantic judgement but are slower and less predictable.

| | Guide (before) | Sensor (after) |
|---|---|---|
| **Computational** | Code mods, bootstrap scripts | Linters, structural tests, type checks |
| **Inferential** | `AGENTS.md`, skills | AI code review, LLM as judge |

One detail from her article I like: a linter message written for the agent, with fix instructions in it, is what she calls "a positive kind of prompt injection."

## The practice: a ratchet

Hashimoto names two forms the fix takes:

1. **Better implicit prompting.** For simple things, like the agent repeatedly running the wrong commands or finding the wrong APIs, update `AGENTS.md`. He points to a file in Ghostty where each line is based on a bad agent behaviour, and says it "almost completely resolved them all."
2. **Actual, programmed tools.** Scripts to take screenshots, run filtered tests, and so on, usually paired with an `AGENTS.md` line so the agent knows the tool exists.

Osmani turns this into a rule of thumb: every line in a good `AGENTS.md` should be traceable to a specific thing that went wrong. Keep the file short, and remove a rule once a more capable model makes it redundant. It's a ratchet, not a style guide.

In Böckeler's terms, the first form is a guide and the second is often a sensor.

## What this looks like in my own repos

I'll use two small examples, because the idea is clearer with real files.

**Plico's `AGENTS.md`.** Plico is the agent app kit I'm building. Its `AGENTS.md` is a guide: it names the required project files, says to keep source files focused and under roughly 250 lines, and says to build before typecheck because packages resolve each other through `dist`. Its TDD rule (one failing behaviour test, then just enough code to pass) steers how the agent works. The verification section is where guide meets sensor: `pnpm check` runs lint, build, typecheck and test, and it is the CI gate, so the agent can find out it was wrong before a human reads the diff.

**The `pr` skill in dev-skills.** My `pr` skill started from Matt Pocock's. Walking through real pull requests showed gaps, so I added a `Closes #<issue>` line to the template and an Evidence fallback for changes with nothing to run. Both came from something that went wrong or was missing, which is the ratchet in miniature. The skill's `CREDITS.md` records the fork base, so the origin of each change stays traceable.

Neither of these is impressive. That is the point: the harness is mostly small files that exist because something once went wrong.

## A checklist

If you want to start tomorrow:

- Keep a list of agent mistakes you see more than once. Don't fix them in the chat; fix them in a file.
- For each, ask: is this a **guide** (the agent didn't know) or a **sensor** (nothing told it that it was wrong)? Often it needs both.
- Prefer a **computational** check when you can write one. A failing test beats a sentence in a prompt.
- Make failures talk. A tool or lint message should say what to do next, not just that something is wrong.
- Keep `AGENTS.md` short and traceable to real failures. Prune rules as models improve.
- Add observability early. If you can't see what the agent did, you can't tell which part of the harness failed.

## What nobody has solved yet

Böckeler is candid about the open questions, and they are worth repeating:

- Checking *behaviour* is still weak. A green suite of AI-written tests puts "a lot of faith into the AI-generated tests, that's not good enough yet."
- As the harness grows, guides and sensors can contradict each other.
- "If sensors never fire, is that a sign of high quality or inadequate detection mechanisms?"
- There is no equivalent of code coverage for a harness yet.

I'd add one more from LangChain: agents that read their own traces to fix harness-level failures are listed as an open problem. Today a human still has to notice the mistake and decide where the fix goes.

## Sources

- Mitchell Hashimoto, [My AI Adoption Journey](https://mitchellh.com/writing/my-ai-adoption-journey), Step 5: Engineer the Harness (5 February 2026).
- Vivek Trivedy, [The Anatomy of an Agent Harness](https://www.langchain.com/blog/the-anatomy-of-an-agent-harness), LangChain (10 March 2026).
- Birgitta Böckeler, [Harness engineering for coding agent users](https://martinfowler.com/articles/harness-engineering.html), martinfowler.com (2 April 2026).
- Addy Osmani, [Agent Harness Engineering](https://addyosmani.com/blog/agent-harness-engineering/) (19 April 2026).
- Anthropic, [Effective harnesses for long-running agents](https://anthropic.com/engineering/effective-harnesses-for-long-running-agents). I describe it from its search summary and have not quoted it.
