<script lang="ts">
  import { Pause, Play } from "@lucide/svelte";
  import { onMount } from "svelte";
  import { figureComponents, figures } from "$content/figures";

  let { id }: { id: string } = $props();

  const Figure = $derived(figureComponents[id]);
  const meta = $derived(figures[id]);

  let paused = $state(false);
  let canMove = $state(false);
  onMount(() => {
    canMove = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });
</script>

{#if Figure && meta}
  <figure id={`figure-${id}`} class="blog-figure" class:is-paused={paused} aria-labelledby={`caption-${id}`}>
    <!-- Animated visuals change on a timer, so screen readers get the description instead. -->
    <div aria-hidden={canMove ? "true" : undefined}><Figure {paused} /></div>
    {#if canMove}<p class="sr-only">{meta.description}</p>{/if}
    {#if canMove}
      <button
        type="button"
        class="figure-pause"
        aria-pressed={paused}
        aria-label={paused ? "Play animation" : "Pause animation"}
        onclick={() => (paused = !paused)}
      >
        {#if paused}<Play class="size-3.5" aria-hidden="true" />{:else}<Pause class="size-3.5" aria-hidden="true" />{/if}
      </button>
    {/if}
    <figcaption id={`caption-${id}`}>{meta.caption}</figcaption>
  </figure>
{/if}
