<script lang="ts">
  import { ChevronRight } from "@lucide/svelte";
  let { paused = false }: { paused?: boolean } = $props();
  import { onMount } from "svelte";
  import { autoplay } from "./autoplay";

  const steps = [
    {
      label: "Spot a repeat",
      detail: "The agent makes the same mistake twice. Note it down instead of correcting it in the chat.",
    },
    {
      label: "Guide or sensor?",
      detail: "Did the agent not know (add a guide), or did nothing tell it that it was wrong (add a sensor)? Often both.",
    },
    {
      label: "Fix it in a file",
      detail: "An AGENTS.md line, a script, a test or a lint rule. Something that lives in the repo, not in your head.",
    },
    {
      label: "It runs every time",
      detail: "The fix applies to every future change, for every agent and teammate. The ratchet clicks, and that mistake stays fixed.",
    },
  ];

  const STEP_MS = 2600;
  // Steps taken so far. It only grows, so the loop always runs forward.
  let ticks = $state(0);
  const active = $derived(ticks % steps.length);
  let still = $state(false);
  let root: HTMLDivElement;

  onMount(() => {
    const stop = autoplay(root, STEP_MS, () => (ticks += 1), () => paused);
    still = !stop;
    return stop ?? undefined;
  });
</script>

<div class="ratchet" bind:this={root} style={`--step: ${STEP_MS}ms`}>
  <ol class="ratchet-track">
    {#each steps as step, i}
      <li class="ratchet-step" class:active={!still && active === i} class:done={!still && i < active}>
        <span class="ratchet-num">{i + 1}</span>
        <span class="ratchet-label">{step.label}</span>
        {#if i < steps.length - 1}<ChevronRight class="ratchet-next" aria-hidden="true" />{/if}
      </li>
    {/each}
  </ol>

  <!-- The way back: step 4 feeds step 1, so the fix is in place the next time round. -->
  <svg class="ratchet-return" viewBox="0 0 640 36" aria-hidden="true">
    <path class="return-line" d="M560 0 V22 Q560 28 554 28 H86 Q80 28 80 22 V8" />
    <path class="return-head" d="M74 14 L80 6 L86 14" />
    {#if !still && active === steps.length - 1}
      <path class="return-pulse" pathLength="1" d="M560 0 V22 Q560 28 554 28 H86 Q80 28 80 22 V8" />
    {/if}
  </svg>

  {#if still}
    <ol class="ratchet-list">
      {#each steps as step, i}
        <li><strong>{i + 1}. {step.label}.</strong> {step.detail}</li>
      {/each}
    </ol>
  {:else}
    <div class="ratchet-detail">
      {#key active}<p class="ratchet-detail-text">{steps[active].detail}</p>{/key}
    </div>
  {/if}
</div>

<style>
  .ratchet-track {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.5rem;
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .ratchet-step {
    position: relative;
    display: flex;
    align-items: center;
    gap: 0.6rem;
    border: 1px solid #27272a;
    border-radius: 0.6rem;
    background: #0a0a0a;
    padding: 0.7rem 0.8rem;
    font-size: 0.85rem;
    font-weight: 600;
    line-height: 1.25;
    color: #a1a1aa;
    transition: border-color 300ms, background-color 300ms, color 300ms;
  }
  .ratchet-step.done { color: #d4d4d8; }
  .ratchet-step.active { border-color: #7dd3fc; background: rgba(125, 211, 252, 0.07); color: #fafafa; }
  .ratchet-num {
    flex: none;
    display: grid;
    place-items: center;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 999px;
    background: #27272a;
    font-size: 0.75rem;
    color: #d4d4d8;
    transition: background-color 300ms, color 300ms;
  }
  .ratchet-step.active .ratchet-num { background: #7dd3fc; color: #000000; }
  .ratchet-return, :global(.ratchet-next) { display: none; }
  .return-line, .return-head { fill: none; stroke: #3f3f46; stroke-width: 1.5; stroke-linecap: round; stroke-linejoin: round; }
  .return-pulse {
    fill: none;
    stroke: #7dd3fc;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-dasharray: 0.14 1;
    animation: return-travel var(--step) ease-in-out both;
  }
  @keyframes return-travel {
    from { stroke-dashoffset: 0.14; }
    to { stroke-dashoffset: -1; }
  }
  /* Wide enough: one row, chevrons between steps, and the return path underneath. */
  @media (min-width: 560px) {
    .ratchet-track { grid-template-columns: repeat(4, 1fr); gap: 0; }
    .ratchet-step { flex-direction: column; margin: 0 0.35rem; padding: 0.8rem 0.4rem; text-align: center; }
    .ratchet-return { display: block; width: 100%; margin-top: 0.15rem; }
    .ratchet-step :global(.ratchet-next) {
      display: block;
      position: absolute;
      top: 50%;
      right: -1.1rem;
      width: 1rem;
      height: 1rem;
      transform: translateY(-50%);
      color: #52525b;
    }
    .ratchet-step.done :global(.ratchet-next) { color: #7dd3fc; }
  }
  .ratchet-detail {
    min-height: 3.5rem;
    margin-top: 0.75rem;
    border-top: 1px solid #27272a;
    padding-top: 0.9rem;
    font-size: 0.925rem;
    line-height: 1.65;
    color: #d4d4d8;
  }
  .ratchet-detail-text { animation: detail-in 300ms ease-out; }
  @keyframes detail-in {
    from { opacity: 0; transform: translateY(4px); }
    to { opacity: 1; transform: none; }
  }
  .ratchet-list {
    display: grid;
    gap: 0.4rem;
    margin: 0.75rem 0 0;
    border-top: 1px solid #27272a;
    padding: 0.9rem 0 0;
    list-style: none;
    font-size: 0.9rem;
    line-height: 1.6;
    color: #a1a1aa;
  }
  .ratchet-list strong { color: #fafafa; }
  @media (prefers-reduced-motion: reduce) {
    .return-pulse, .ratchet-detail-text { animation: none; }
    .ratchet-step, .ratchet-num { transition: none; }
  }
</style>
