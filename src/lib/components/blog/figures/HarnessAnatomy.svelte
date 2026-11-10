<script lang="ts">
  let { paused = false }: { paused?: boolean } = $props();
  import { Activity, FileText, Server, Webhook, Workflow, Wrench } from "@lucide/svelte";
  import { onMount } from "svelte";
  import { autoplay } from "./autoplay";

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

{#snippet partBox(index: number, row: "top" | "bottom")}
  {@const p = parts[index]}
  <div class={`anatomy-part anatomy-part-${row}`} class:active={!still && active === index}>
    <p.icon class="size-4" aria-hidden="true" />
    <span>{p.label}</span>
  </div>
{/snippet}

<div class="anatomy" bind:this={root} style={`--step: ${STEP_MS}ms`}>
  <div class="anatomy-frame">
    <span class="anatomy-frame-label">Harness</span>
    <div class="anatomy-row">
      {#each [0, 1, 2] as i}{@render partBox(i, "top")}{/each}
    </div>
    <div class="anatomy-core">
      <span class="anatomy-core-glow" aria-hidden="true"></span>
      <span class="relative">Model</span>
    </div>
    <div class="anatomy-row">
      {#each [3, 4, 5] as i}{@render partBox(i, "bottom")}{/each}
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
    gap: 1.25rem;
    border: 1px dashed #3f3f46;
    border-radius: 0.875rem;
    padding: 1.75rem 0.75rem 1rem;
    background: radial-gradient(18rem 9rem at 50% 50%, rgba(125, 211, 252, 0.06), transparent 70%);
  }
  .anatomy-frame-label {
    position: absolute;
    top: 0.5rem;
    left: 0.75rem;
    font-size: 0.7rem;
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
    position: relative;
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
    transition: border-color 300ms, background-color 300ms, color 300ms, transform 300ms;
  }
  .anatomy-part.active {
    border-color: #7dd3fc;
    background: rgba(125, 211, 252, 0.08);
    color: #fafafa;
    transform: translateY(-2px);
  }
  /* Short connectors from each part toward the model. */
  .anatomy-part::after {
    content: "";
    position: absolute;
    left: 50%;
    width: 1px;
    height: 1.25rem;
    background: linear-gradient(#3f3f46, transparent);
    transition: background 300ms;
  }
  .anatomy-part-top::after { top: 100%; }
  .anatomy-part-bottom::after { bottom: 100%; transform: rotate(180deg); }
  .anatomy-part.active::after { background: linear-gradient(#7dd3fc, transparent); }
  /* A pulse runs from the active part into the model. */
  .anatomy-part::before {
    content: "";
    position: absolute;
    left: calc(50% - 2px);
    width: 5px;
    height: 5px;
    border-radius: 999px;
    background: #7dd3fc;
    box-shadow: 0 0 8px #7dd3fc;
    opacity: 0;
  }
  .anatomy-part-top::before { top: 100%; }
  .anatomy-part-bottom::before { bottom: 100%; }
  .anatomy-part-top.active::before { animation: pulse-down 1.4s ease-in infinite; }
  .anatomy-part-bottom.active::before { animation: pulse-up 1.4s ease-in infinite; }
  @keyframes pulse-down {
    0% { opacity: 0; transform: translateY(0); }
    20% { opacity: 1; }
    100% { opacity: 0; transform: translateY(1.2rem); }
  }
  @keyframes pulse-up {
    0% { opacity: 0; transform: translateY(0); }
    20% { opacity: 1; }
    100% { opacity: 0; transform: translateY(-1.2rem); }
  }
  .anatomy-core {
    position: relative;
    justify-self: center;
    display: grid;
    place-items: center;
    width: min(12rem, 60%);
    border: 1px solid #52525b;
    border-radius: 999px;
    background: #111111;
    padding: 0.7rem 1rem;
    font-weight: 700;
    color: #fafafa;
  }
  .anatomy-core-glow {
    position: absolute;
    inset: -1px;
    border-radius: inherit;
    animation: core-pulse 1.4s ease-out infinite;
  }
  @keyframes core-pulse {
    0%, 60% { box-shadow: 0 0 0 0 rgba(125, 211, 252, 0); }
    75% { box-shadow: 0 0 0 0 rgba(125, 211, 252, 0.35); }
    100% { box-shadow: 0 0 0 12px rgba(125, 211, 252, 0); }
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
  @media (prefers-reduced-motion: reduce) {
    .anatomy-core-glow,
    .anatomy-part::before { animation: none !important; }
    .anatomy-part { transition: none; }
  }
</style>
