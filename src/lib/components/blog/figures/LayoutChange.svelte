<script lang="ts">
  import { onMount } from "svelte";
  import { autoplay } from "./autoplay";

  let { paused = false }: { paused?: boolean } = $props();

  // The same five files, laid out two ways. Each role is one file of the change.
  const roles = [
    { layer: "controllers", file: "checkout.controller.ts" },
    { layer: "services", file: "checkout.service.ts" },
    { layer: "repositories", file: "checkout.repository.ts" },
    { layer: "schemas", file: "checkout.schema.ts" },
    { layer: "tests", file: "checkout.test.ts" },
  ];

  // Steps 1 to 5 light one more file in each tree; 6 and 7 hold the result; 0 resets.
  const STEPS = 8;
  const STEP_MS = 1000;
  let ticks = $state(0);
  let still = $state(false);
  let root: HTMLDivElement;

  const step = $derived(ticks % STEPS);
  const lit = $derived(still ? roles.length : Math.min(step, roles.length));
  const done = $derived(still || step >= roles.length);

  onMount(() => {
    const stop = autoplay(root, STEP_MS, () => (ticks += 1), () => paused);
    still = !stop;
    return stop ?? undefined;
  });
</script>

<div class="layout" bind:this={root}>
  <p class="layout-task"><span>Change</span> Add discount codes to checkout</p>

  <div class="layout-grid">
    <div class="layout-panel">
      <p class="layout-title">By layer</p>
      {#each roles as role, i}
        <div class="layout-folder">
          <p class="layout-dir">{role.layer}/</p>
          <p class="layout-file" class:lit={lit > i}>{role.file}</p>
          <p class="layout-file layout-other">cart…, billing…</p>
        </div>
      {/each}
      <p class="layout-count" class:show={done}>5 files in 5 folders</p>
    </div>

    <div class="layout-panel">
      <p class="layout-title">By feature</p>
      <div class="layout-folder">
        <p class="layout-dir">checkout/</p>
        {#each roles as role, i}
          <p class="layout-file" class:lit={lit > i}>{role.file}</p>
        {/each}
      </div>
      <div class="layout-folder"><p class="layout-dir layout-other">cart/ …</p></div>
      <div class="layout-folder"><p class="layout-dir layout-other">billing/ …</p></div>
      <p class="layout-count" class:show={done}>5 files in 1 folder</p>
    </div>
  </div>
</div>

<style>
  .layout-task {
    margin: 0 0 1rem;
    font-size: 0.9rem;
    font-weight: 600;
    color: #fafafa;
  }
  .layout-task span {
    margin-right: 0.5rem;
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #8a8a93;
  }
  .layout-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
  @media (min-width: 560px) {
    .layout-grid { grid-template-columns: 1fr 1fr; }
  }
  .layout-panel {
    border: 1px solid #1f1f23;
    border-radius: 0.75rem;
    background: #050505;
    padding: 0.9rem 0.9rem 0.75rem;
  }
  .layout-panel p { margin: 0; }
  .layout-title {
    margin-bottom: 0.6rem !important;
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #8a8a93;
  }
  .layout-folder { margin-bottom: 0.45rem; }
  .layout-dir {
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: 0.75rem;
    font-weight: 600;
    color: #d4d4d8;
  }
  .layout-file {
    margin: 0.1rem 0 0 0.9rem !important;
    border-radius: 0.3rem;
    padding: 0.05rem 0.4rem;
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: 0.72rem;
    color: #a1a1aa;
    transition: background-color 250ms, color 250ms;
  }
  .layout-file.lit { background: rgba(125, 211, 252, 0.12); color: #e0f5ff; }
  .layout-other { color: #8a8a93; }
  .layout-dir.layout-other { font-weight: 500; }
  .layout-count {
    margin-top: 0.6rem !important;
    border-top: 1px solid #1f1f23;
    padding-top: 0.6rem;
    font-size: 0.82rem;
    font-weight: 600;
    color: #8a8a93;
    opacity: 0;
    transition: opacity 300ms, color 300ms;
  }
  .layout-count.show { opacity: 1; color: #fafafa; }
  @media (prefers-reduced-motion: reduce) {
    .layout-file, .layout-count { transition: none; }
  }
</style>
