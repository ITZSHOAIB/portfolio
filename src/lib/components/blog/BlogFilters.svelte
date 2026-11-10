<script lang="ts">
  import { Search, X } from "@lucide/svelte";
  import type { PostFilter } from "$lib/content/blog-filter";
  import { isFiltering } from "$lib/content/blog-filter";
  import type { TagSummary } from "$lib/content/blog-queries";

  let {
    filter = $bindable(),
    tags,
    projects,
    shown,
    total,
  }: {
    filter: PostFilter;
    tags: TagSummary[];
    projects: string[];
    shown: number;
    total: number;
  } = $props();

  const chip =
    "rounded-md border px-2.5 py-1 text-xs font-semibold transition hover:border-[#52525b]";
  const on = "border-[#7dd3fc] bg-[#7dd3fc]/10 text-[#7dd3fc]";
  const off = "border-[#27272a] bg-[#111111] text-[#d4d4d8]";
</script>

<div class="mt-8 grid gap-4" role="search">
  <div class="relative">
    <label class="sr-only" for="blog-search">Search posts</label>
    <Search
      class="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[#8a8a93]"
      aria-hidden="true"
    />
    <input
      id="blog-search"
      type="search"
      bind:value={filter.q}
      placeholder="Search posts"
      autocomplete="off"
      class="w-full rounded-lg border border-[#27272a] bg-[#0a0a0a] py-2.5 pl-10 pr-3 text-sm text-[#fafafa] placeholder:text-[#8a8a93] transition hover:border-[#52525b]"
    />
  </div>

  <div class="flex flex-wrap items-center gap-2" aria-label="Filter by topic" role="group">
    {#each tags as { tag, slug, count }}
      <button
        type="button"
        class={`${chip} ${filter.tag === slug ? on : off}`}
        aria-pressed={filter.tag === slug}
        onclick={() => (filter.tag = filter.tag === slug ? "" : slug)}
        >{tag} <span class="opacity-70">{count}</span></button
      >
    {/each}
  </div>

  {#if projects.length}
    <div class="flex flex-wrap items-center gap-2" aria-label="Filter by project" role="group">
      <span class="text-xs font-semibold uppercase tracking-[0.12em] text-[#8a8a93]">Project</span>
      {#each projects as project}
        <button
          type="button"
          class={`${chip} ${filter.project === project ? on : off}`}
          aria-pressed={filter.project === project}
          onclick={() => (filter.project = filter.project === project ? "" : project)}
          >{project}</button
        >
      {/each}
    </div>
  {/if}

  <div class="flex min-h-6 items-center justify-between gap-3 text-sm text-[#a1a1aa]">
    <p aria-live="polite">
      {#if isFiltering(filter)}Showing {shown} of {total} {total === 1 ? "post" : "posts"}{:else}{total}
        {total === 1 ? "post" : "posts"}{/if}
    </p>
    {#if isFiltering(filter)}
      <button
        type="button"
        class="inline-flex items-center gap-1 font-medium text-[#d4d4d8] transition hover:text-[#fafafa]"
        onclick={() => (filter = { q: "", tag: "", project: "" })}
      >
        <X class="size-3.5" aria-hidden="true" /> Clear
      </button>
    {/if}
  </div>
</div>
