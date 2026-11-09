---
title: Dev Skills
description: Agent skills for shipping code you can trust. A fresh agent with no backstory does the legwork, and you make the calls.
repo: https://github.com/ITZSHOAIB/dev-skills
updated: 2026-11-09
eyebrow: Open source · Agent skills
install: npx skills add ITZSHOAIB/dev-skills -g
badges: 5 skills, MIT, No dependencies
---

AI agents write code faster than anyone can check it, and docs faster than anyone can test them. These skills add the checks that speed skips. Each one hands a job to a **fresh agent with no backstory**, verifies what it reports, and then stops and asks you before changing anything.

Start a new agent session after installing, then try `/cold-review main` on a branch you are about to merge.

## The idea

Every skill uses the same two roles, borrowed from the [Elephant-Goldfish Model](https://github.com/google/elephant-goldfish-model).

![Your agent (the elephant) sends only the target to a fresh subagent (the goldfish), checks what it reports, and you decide what gets fixed.](/images/elephant-goldfish.svg)

- **The goldfish** sees the code, the docs, or the product, and nothing about why they exist. Where it gets confused, a newcomer will too.
- **The elephant** holds the context. It checks each report against the source, because a goldfish can be wrong, and drops the invented problems.
- **You** are the last step. No skill changes your code or docs until you choose what to fix.

## Which skill do I need?

<div class="skill-grid">
<div class="skill-card"><h3>Cold Review</h3><p class="skill-when">Merge a change with real design decisions</p><p>A fresh agent reads the code with no spec, then its explanation is compared with your intent.</p><code>/cold-review main</code></div>
<div class="skill-card"><h3>Guided Review</h3><p class="skill-when">Review someone else's PR and make the calls yourself</p><p>Walks the PR with claims checked and the change's shape shown. You decide each finding.</p><code>/guided-review &lt;PR URL&gt;</code></div>
<div class="skill-card"><h3>Cold Docs</h3><p class="skill-when">Change docs, or check they make sense to a newcomer</p><p>A reader with no context tries to follow your docs and reports where it gets lost.</p><code>/cold-docs &lt;docs URL or folder&gt;</code></div>
<div class="skill-card"><h3>Cold Walkthrough</h3><p class="skill-when">Ship a release, or change install, scaffolding or the CLI</p><p>Follows your docs end to end, running the commands like a first-time user.</p><code>/cold-walkthrough &lt;docs URL or package&gt;</code></div>
<div class="skill-card"><h3>PR</h3><p class="skill-when">Open a PR and want a body that reviews fast</p><p>Summary diagram, deliberate omissions, before and after evidence, and merge danger.</p><code>write the PR body</code></div>
</div>

## Read the full docs

Each skill's workflow, an FAQ and install options for a single skill, a project, updating and removal are in the [README on GitHub](https://github.com/ITZSHOAIB/dev-skills#readme).
