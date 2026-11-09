<script lang="ts">
  import { figureComponents } from "$lib/components/blog/figures";
  import { figures } from "$lib/content/figures";

  let { id }: { id: string } = $props();

  const Figure = $derived(figureComponents[id]);
  const meta = $derived(figures[id]);
</script>

{#if Figure && meta}
  <figure id={`figure-${id}`} class="blog-figure">
    <Figure />
    <figcaption>{meta.caption}</figcaption>
  </figure>
{/if}
