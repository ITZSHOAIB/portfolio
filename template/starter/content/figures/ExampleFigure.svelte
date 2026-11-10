<script lang="ts">
  import { onMount } from "svelte";
  import { autoplay } from "$lib/utils/autoplay";

  // BlogFigure passes `paused` from its pause button. autoplay() advances `ticks`
  // while the figure is on screen and returns null when the reader prefers reduced motion.
  let { paused = false }: { paused?: boolean } = $props();

  const steps = ["Write", "Check", "Ship"];
  let ticks = $state(0);
  let still = $state(false);
  let root: HTMLDivElement;

  const active = $derived(still ? -1 : ticks % steps.length);

  onMount(() => {
    const stop = autoplay(root, 1200, () => (ticks += 1), () => paused);
    still = !stop;
    return stop ?? undefined;
  });
</script>

<div class="example" bind:this={root}>
  {#each steps as step, i}
    <p class="example-step" class:lit={active === i}>{step}</p>
  {/each}
</div>

<style>
  .example {
    display: flex;
    gap: 0.75rem;
    justify-content: center;
    padding: 1.5rem 1rem;
  }
  .example-step {
    border: 1px solid #27272a;
    border-radius: 0.5rem;
    color: #a1a1aa;
    font-weight: 600;
    padding: 0.6rem 1.2rem;
    transition: border-color 0.3s, color 0.3s;
  }
  .example-step.lit {
    border-color: #a1a1aa;
    color: #fafafa;
  }
</style>
