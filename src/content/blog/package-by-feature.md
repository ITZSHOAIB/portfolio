---
title: Package by feature, when an agent writes the code
description: Why I put features at the top of the folder tree now that agents change my code more than I do, and the rules that keep it from rotting.
published: 2026-11-10T12:00
cover: /images/blog/package-by-feature.jpg
tags: [ai-agents, architecture]
projects: [Plico, Dev Skills]
---

For years I organised code by layer: controllers here, services there, repositories somewhere else. It suited me. I wrote most of the code, so I knew where everything lived.

Now an agent touches my code more than I do, and it knows where nothing lives. It searches, then it works. That changes what a folder tree is for. It isn't only a map for me anymore. It's the first thing the agent reads.

## Same change, two layouts

Ask an agent to add discount codes to checkout.

::figure layout-change

It's the same five files either way. In a layered tree they sit in five folders, and in each one the agent has to pick checkout's file out from every other feature's. In a feature tree they sit in one folder. Less searching, and less chance of editing a neighbour's file by mistake.

Nobody has measured this, as far as I can find. There are write-ups from practitioners and papers on [how agents explore repositories](https://arxiv.org/abs/2606.11976), but no study of folder layouts. So this is reasoning plus what I see at work, where I've moved to package by feature: the agent searches for the feature name, lands in one folder, and stays there.

None of it is new. Package by feature is old Java advice, and Jimmy Bogard's [vertical slice architecture](https://jimmybogard.com/vertical-slice-architecture/) says the same from .NET. Jeremy Miller, who wrote Wolverine, argues that a codebase's structure [becomes part of the prompt](https://letsdatascience.com/news/wolverine-enables-ai-friendly-vertical-slice-development-a7759c4d). Agents just raise the price of ignoring it.

## Features on top, light layers inside

Top level by feature. Inside, I name files by role: `checkout.service.ts`, `checkout.repository.ts`, `checkout.test.ts`. A dot-suffix tells an agent what a file is without opening it, and you can match it with a glob, which matters in a moment. I keep nesting shallow and start flat. When a word in the glossary needs its own boundary, the folder becomes a domain. That's as much strategic DDD as I use.

Two small files help. A short `AGENTS.md` per feature says what it's for, what it exposes and what it must not import. A root `GLOSSARY.md` keeps the code and the agent on the same words. Claude Code [loads subdirectory instruction files on demand](https://code.claude.com/docs/en/memory), so a feature's rules show up when the agent starts working in it.

## Draw the lines, then fence them

A human draws the boundaries. They're costly to move and invisible in a single diff, so I don't leave them to the agent. My test is whether two different people would own the two sides.

Folders won't hold the line alone. An agent takes the shortest import path, and the tests still pass. So other features import only through a feature's `index.ts`, and CI checks it with [dependency-cruiser](https://github.com/sverweij/dependency-cruiser):

```js
// .dependency-cruiser.cjs
module.exports = {
  forbidden: [
    {
      name: "no-deep-feature-imports",
      comment: "Import another feature through its index.ts only.",
      severity: "error",
      from: { path: "^src/features/([^/]+)/" },
      to: {
        path: "^src/features/[^/]+/",
        pathNot: ["^src/features/$1/", "^src/features/[^/]+/index\.ts$"],
      },
    },
  ],
};
```

The `comment` is the message the agent sees when it fails, so write it as an instruction. That's the same idea as the lint message in my [harness post](/blog/harness-engineering).

The other thing that rots is `shared/`, because agents love to dedupe. My rule: duplicate until the third use, and shared code holds no business logic. If it does, a feature boundary is leaking.

## In my own repos

[Plico](https://plico.sohab.dev)'s packages are layers by design (contracts, sdk, core, runtime, server, cli), because they're published separately. Inside them it's features: each CLI command is a module in `commands/`, each server route one in `routes/`, registered instead of piled into a dispatcher. Its `AGENTS.md` says to add them "as new modules and register them", keeps files around 250 lines, and points at a root `GLOSSARY.md`.

## When layers are fine

A small repo (one source puts the line at about 10K lines), a throwaway script, a pure library: layers are fine, and agents know MVC well. This is for repos that keep growing. Cross-cutting concerns like auth and logging also belong to no feature, and I don't have a tidy answer for them yet. A small shared template is the usual advice.

## Try it tomorrow

- Pick the feature you change most and list the folders a typical change touches.
- Move its files together, keep the role suffixes, and add its `AGENTS.md`.
- Add the import rule and let CI fail on the first deep import.

```prompt title="Audit your repo's boundaries"
Map the features in this repository: for each one, list its files and where they live. Then find imports that reach into another feature's internals instead of its public entry, and anything in shared/ that contains business logic. Suggest where a boundary rule or a feature AGENTS.md would help most, but don't change any code yet.
```

## Sources

- Jimmy Bogard, [Vertical Slice Architecture](https://jimmybogard.com/vertical-slice-architecture/)
- Jeremy Miller on Wolverine and AI-friendly vertical slices, [summary](https://letsdatascience.com/news/wolverine-enables-ai-friendly-vertical-slice-development-a7759c4d)
- Very Good Ventures, [Feature-First Clean Architecture](https://verygood.ventures/blog/feature-first-clean-architecture/)
- InfoQ, [Skeleton architecture](https://www.infoq.com/articles/skeleton-architecture)
- Anthropic, [Claude Code memory](https://code.claude.com/docs/en/memory)
- [Exploration Structure in LLM Agents for Multi-File Change Localization](https://arxiv.org/abs/2606.11976) (June 2026)
