---
title: Dev Skills
description: Agent skills for shipping code you can trust. A fresh agent with no backstory does the legwork, and you make the calls.
repo: https://github.com/ITZSHOAIB/dev-skills
updated: 2026-11-09
---

AI agents write code faster than anyone can check it, and docs faster than anyone can test them. These skills add the checks that speed skips. Each one hands a job to a **fresh agent with no backstory**, verifies what it reports, and then stops and asks you before changing anything.

```sh
npx skills add ITZSHOAIB/dev-skills -g
```

Start a new agent session afterwards, then try `/cold-review main` on a branch you are about to merge.

## The idea

Every skill uses the same two roles, borrowed from the [Elephant-Goldfish Model](https://github.com/google/elephant-goldfish-model).

![Your agent (the elephant) sends only the target to a fresh subagent (the goldfish), checks what it reports, and you decide what gets fixed.](/images/elephant-goldfish.svg)

- **The goldfish** sees the code, the docs, or the product, and nothing about why they exist. Where it gets confused, a newcomer will too.
- **The elephant** holds the context. It checks each report against the source, because a goldfish can be wrong, and drops the invented problems.
- **You** are the last step. No skill changes your code or docs until you choose what to fix.

## Which skill do I need?

| You are about to… | Use | Run it with |
|---|---|---|
| Merge a change with real design decisions | Cold Review | `/cold-review main` |
| Review someone else's PR and make the calls yourself | Guided Review | `/guided-review <PR URL>` |
| Change docs, or wonder if they make sense to a newcomer | Cold Docs | `/cold-docs <docs URL or folder>` |
| Ship a release, or change install, scaffolding, the CLI or its errors | Cold Walkthrough | `/cold-walkthrough <docs URL or package>` |
| Open a PR and want a body that reviews fast | PR | "write the PR body" |

## Read the full docs

Each skill's workflow, an FAQ and install options for a single skill, a project, updating and removal are in the [README on GitHub](https://github.com/ITZSHOAIB/dev-skills#readme).
