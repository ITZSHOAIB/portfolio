<script lang="ts">
  let { paused = false }: { paused?: boolean } = $props();
  import { Activity, FileText, Server, Webhook, Workflow, Wrench } from "@lucide/svelte";
  import { onMount } from "svelte";
  import { autoplay } from "$lib/utils/autoplay";

  // The parts list comes from LangChain's "Anatomy of an Agent Harness";
  // observability is Addy Osmani's addition. The "why" lines are my own framing.
  const parts = [
    {
      label: "Instructions",
      icon: FileText,
      examples: "System prompts, AGENTS.md, CLAUDE.md, skill files",
      why: "Tell the agent what to do and how this codebase works.",
    },
    {
      label: "Tools",
      icon: Wrench,
      examples: "Tools, skills, MCP servers, and their descriptions",
      why: "What the agent can act with. Tool descriptions steer it too.",
    },
    {
      label: "Infrastructure",
      icon: Server,
      examples: "Filesystem, sandbox, browser",
      why: "Where work happens, and where it outlives one context window.",
    },
    {
      label: "Orchestration",
      icon: Workflow,
      examples: "Subagent spawning, handoffs, model routing",
      why: "How work is split across agents and models.",
    },
    {
      label: "Hooks",
      icon: Webhook,
      examples: "Compaction, continuation, lint checks",
      why: "Steps that run whether or not the model remembers them.",
    },
    {
      label: "Observability",
      icon: Activity,
      examples: "Logs, traces, cost and latency metering",
      why: "How you find out which part of the harness failed.",
    },
  ];

  const STEP_MS = 2800;
  let active = $state(0);
  let still = $state(false);
  let root: HTMLDivElement;
  const part = $derived(parts[active]);

  onMount(() => {
    const stop = autoplay(root, STEP_MS, () => (active = (active + 1) % parts.length), () => paused);
    still = !stop;
    return stop ?? undefined;
  });
</script>

{#snippet partBox(index: number)}
  {@const p = parts[index]}
  <div class="anatomy-part" class:active={!still && active === index}>
    <p.icon class="size-4" aria-hidden="true" />
    <span>{p.label}</span>
  </div>
{/snippet}

<!-- Wires run from every part into the model: each drops to a shared bus, and the bus
     meets the model. The active part lights its own wire and sends a pulse along it. -->
{#snippet wires(indices: number[], flip: boolean)}
  <svg class="anatomy-wires" class:flip viewBox="0 0 300 40" preserveAspectRatio="none" aria-hidden="true">
    <path class="wire" d="M50 0 V20 H250 M150 0 V40 M250 0 V20" />
    {#each indices as index, col}
      {@const x = 50 + col * 100}
      {@const d = x === 150 ? "M150 0 V40" : `M${x} 0 V20 H150 V40`}
      {#if !still && active === index}
        <path class="wire wire-on" {d} />
        <path class="wire-pulse" {d} pathLength="1" style="--step: {STEP_MS}ms" />
      {/if}
    {/each}
  </svg>
{/snippet}

<div class="anatomy" bind:this={root} style={`--step: ${STEP_MS}ms`}>
  <div class="anatomy-frame">
    <span class="anatomy-frame-label">Harness</span>
    <div class="anatomy-row">
      {#each [0, 1, 2] as i}{@render partBox(i)}{/each}
    </div>
    {@render wires([0, 1, 2], false)}
    <div class="anatomy-core"><span>Model</span></div>
    {@render wires([3, 4, 5], true)}
    <div class="anatomy-row">
      {#each [3, 4, 5] as i}{@render partBox(i)}{/each}
    </div>
  </div>

  {#if still}
    <ul class="anatomy-list">
      {#each parts as p}
        <li><strong>{p.label}.</strong> {p.why} <span>{p.examples}</span></li>
      {/each}
    </ul>
  {:else}
    <div class="anatomy-detail">
      {#key active}
        <div class="anatomy-detail-body">
          <p class="flex items-center gap-2 text-base font-semibold text-[#fafafa]">
            <part.icon class="size-4 text-[#7dd3fc]" aria-hidden="true" />{part.label}
          </p>
          <p class="mt-1 text-sm leading-6 text-[#a1a1aa]">{part.why}</p>
          <p class="mt-1 text-sm leading-6 text-[#8a8a93]">{part.examples}</p>
        </div>
        <span class="anatomy-progress" aria-hidden="true"></span>
      {/key}
    </div>
  {/if}
</div>

<style>
  .anatomy-frame {
    position: relative;
    display: grid;
    padding: 2.4rem 0.75rem 1rem;
    border: 1px solid #1f1f23;
    border-radius: 0.875rem;
    background: #050505;
  }
  .anatomy-frame-label {
    position: absolute;
    top: 0.6rem;
    left: 0.85rem;
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #8a8a93;
  }
  .anatomy-row {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0.5rem;
  }
  .anatomy-part {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.35rem;
    border: 1px solid #27272a;
    border-radius: 0.5rem;
    background: #0a0a0a;
    padding: 0.65rem 0.25rem;
    font-size: 0.8rem;
    font-weight: 600;
    line-height: 1.2;
    color: #a1a1aa;
    transition: border-color 300ms, background-color 300ms, color 300ms;
  }
  .anatomy-part.active {
    border-color: #7dd3fc;
    background: rgba(125, 211, 252, 0.07);
    color: #fafafa;
  }
  .anatomy-wires {
    display: block;
    width: 100%;
    height: 2.25rem;
    overflow: visible;
  }
  .anatomy-wires.flip { transform: scaleY(-1); }
  .wire {
    fill: none;
    stroke: #3f3f46;
    stroke-width: 1.5;
    vector-effect: non-scaling-stroke;
    transition: stroke 300ms;
  }
  .wire-on { stroke: #7dd3fc; }
  /* A short bright segment travels from the part to the model. */
  .wire-pulse {
    fill: none;
    stroke: #e0f5ff;
    stroke-width: 2.5;
    stroke-linecap: round;
    vector-effect: non-scaling-stroke;
    stroke-dasharray: 0.12 1;
    animation: wire-travel 1.1s ease-in-out infinite;
  }
  @keyframes wire-travel {
    from { stroke-dashoffset: 0.12; }
    to { stroke-dashoffset: -1; }
  }
  .anatomy-core {
    justify-self: center;
    display: grid;
    place-items: center;
    width: min(13rem, 62%);
    border: 1px solid #7dd3fc;
    border-radius: 999px;
    background: #0b1a22;
    padding: 0.7rem 1rem;
    font-weight: 700;
    color: #fafafa;
  }
  .anatomy-detail {
    position: relative;
    margin-top: 1rem;
    min-height: 6.5rem;
    border-top: 1px solid #27272a;
    padding-top: 1rem;
  }
  .anatomy-detail-body { animation: detail-in 300ms ease-out; }
  @keyframes detail-in {
    from { opacity: 0; transform: translateY(4px); }
    to { opacity: 1; transform: none; }
  }
  /* Fills while a part is on show, so the reader sees the next one coming. */
  .anatomy-progress {
    position: absolute;
    top: -1px;
    left: 0;
    height: 1px;
    width: 100%;
    background: #7dd3fc;
    transform-origin: left;
    animation: progress var(--step) linear both;
  }
  @keyframes progress {
    from { transform: scaleX(0); }
    to { transform: scaleX(1); }
  }
  .anatomy-list {
    display: grid;
    gap: 0.5rem;
    margin: 1rem 0 0;
    padding: 0;
    list-style: none;
    font-size: 0.9rem;
    line-height: 1.6;
    color: #a1a1aa;
  }
  .anatomy-list strong { color: #fafafa; }
  .anatomy-list span { color: #8a8a93; }
  @media (max-width: 420px) {
    .anatomy-part { font-size: 0.72rem; }
  }
  @media (prefers-reduced-motion: reduce) {
    .wire-pulse { animation: none !important; }
    .anatomy-part, .wire { transition: none; }
  }
</style>
