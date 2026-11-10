---
title: Harness engineering: the part of an agent that isn't the model
description: What an agent harness is, why it matters as much as the model, and the small habit that keeps improving it.
published: 2026-11-10
tags: [ai-agents, harness-engineering]
projects: [Plico, Dev Skills]
---

When a coding agent does something dumb, my first reflex is to blame the model. Usually the model is fine. It ran the wrong test command because nothing told it the right one. It said "done" because nothing checked. That isn't a model problem. It's a harness problem.

## Agent = Model + Harness

That's Vivek Trivedy's definition at LangChain, and it's the shortest one I know. The harness is "every piece of code, configuration, and execution logic that isn't the model itself." If it isn't the model, it's the harness.

Tap a part to see what's in one:

::figure harness-anatomy

Does it matter more than the model? Addy Osmani thinks so: "A decent model with a great harness beats a great model with a bad harness." LangChain says it moved its coding agent from Top 30 to Top 5 on Terminal Bench 2.0 by changing only the harness. Neither publishes scores, so read that as experience rather than measurement. It matches mine, though.

## Guides and sensors

Birgitta Böckeler has the most useful way to sort the parts. A **guide** steers the agent before it acts, like an `AGENTS.md` line or a skill. A **sensor** catches it afterwards, like a test, a linter or an AI reviewer.

You want both. With only sensors, the agent "keeps repeating the same mistakes." With only guides, it "encodes rules but never finds out whether they worked."

My favourite detail from her article: a lint message written for the agent, with the fix in it, is "a positive kind of prompt injection."

## The ratchet

Mitchell Hashimoto turned this into a habit, and that habit is where the name comes from: "anytime you find an agent makes a mistake, you take the time to engineer a solution such that the agent never makes that mistake again."

The fix is either a line in `AGENTS.md`, for simple things like wrong commands, or a real tool, like a script that runs filtered tests. Each one tightens the harness a notch, and it doesn't slip back.

::figure ratchet-loop

Osmani's rule of thumb follows from it: every line in a good `AGENTS.md` should trace back to something that went wrong. If you can't name the mistake a rule prevents, it probably doesn't belong.

## In my own repos

[Plico](https://plico.sohab.dev), the agent app kit I'm building, has an `AGENTS.md` that tells the agent to build before typechecking, because the packages resolve each other through `dist`. That's the guide. `pnpm check` runs lint, build, typecheck and tests, so the agent finds out it was wrong before I read the diff. That's the sensor.

My `pr` skill in [dev-skills](/projects/dev-skills) grew the same way. Real pull requests showed gaps, so it gained a `Closes #<issue>` line and a fallback for changes with nothing to demo. Small and boring, which is the point: a harness is mostly small files that exist because something once went wrong.

## Try it tomorrow

- Write down every mistake you see twice. Fix it in a file, not in the chat.
- Ask whether the agent didn't know (add a guide) or nothing told it it was wrong (add a sensor).
- Prefer a check you can run. A failing test beats a sentence in a prompt.
- Make failures say what to do next.

```prompt title="Audit your AGENTS.md"
Read the AGENTS.md (or CLAUDE.md) in this repository. For each rule, tell me which repeated mistake it prevents, and whether a test, lint rule or script could enforce it instead. Flag rules with no clear mistake behind them. Suggest the three most useful changes, but don't edit anything yet.
```

Some of this isn't solved yet. Böckeler points out that a harness has nothing like code coverage, and that when sensors never fire, you can't tell good code from weak detection. Someone still has to notice the mistake. For now, that's you.

## Sources

- Mitchell Hashimoto, [My AI Adoption Journey](https://mitchellh.com/writing/my-ai-adoption-journey) (February 2026)
- Vivek Trivedy, [The Anatomy of an Agent Harness](https://www.langchain.com/blog/the-anatomy-of-an-agent-harness), LangChain (March 2026)
- Birgitta Böckeler, [Harness engineering for coding agent users](https://martinfowler.com/articles/harness-engineering.html), martinfowler.com (April 2026)
- Addy Osmani, [Agent Harness Engineering](https://addyosmani.com/blog/agent-harness-engineering/) (April 2026)
