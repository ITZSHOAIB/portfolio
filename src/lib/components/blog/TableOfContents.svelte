<script lang="ts">
  import { onMount } from "svelte";
  import type { TocItem } from "$lib/content/markdown";

  let {
    items,
    variant,
  }: { items: TocItem[]; variant: "inline" | "sidebar" } = $props();

  let active = $state("");

  onMount(() => {
    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) active = visible.target.id;
      },
      { rootMargin: "-80px 0px -70% 0px" },
    );
    headings.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  });
</script>

{#snippet list()}
  <ol class="space-y-2 text-sm">
    {#each items as item}
      <li class={item.depth === 3 ? "pl-4" : ""}>
        <a
          class={`block leading-snug transition hover:text-[#fafafa] ${
            active === item.id ? "text-[#fafafa]" : "text-[#8a8a93]"
          }`}
          aria-current={active === item.id ? "location" : undefined}
          href={`#${item.id}`}>{item.text}</a
        >
      </li>
    {/each}
  </ol>
{/snippet}

{#if items.length > 1}
  {#if variant === "inline"}
    <details class="rounded-lg border border-[#27272a] bg-[#0a0a0a] p-4">
      <summary class="cursor-pointer text-sm font-semibold text-[#d4d4d8]">
        On this page
      </summary>
      <div class="mt-3">{@render list()}</div>
    </details>
  {:else}
    <nav aria-label="On this page">
      <p class="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#a1a1aa]">
        On this page
      </p>
      {@render list()}
    </nav>
  {/if}
{/if}
