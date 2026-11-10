<script lang="ts">
  import '../styles.css';
  import { site } from '$content/site';

  let { children } = $props();
</script>

<svelte:head>
  {#if site.accent}{@html `<style>:root{--accent:${site.accent}}</style>`}{/if}
</svelte:head>

{@render children()}
