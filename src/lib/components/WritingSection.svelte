<script lang="ts">
  import { ArrowUpRight, FileText } from "@lucide/svelte";
  import type { WritingPost } from "$lib/types/portfolio";

  let { posts }: { posts: WritingPost[] } = $props();
</script>

<section
  id="writing"
  class="scroll-mt-24 border-b border-[#27272a] py-16 lg:py-18"
>
  <div class="grid gap-5 lg:grid-cols-[14rem_1fr]">
    <p class="text-sm font-bold uppercase tracking-[0.14em] text-[#a1a1aa]">
      Writing
    </p>
    <div class="grid gap-4">
      {#each posts as post}
        <a
          class="group rounded-lg border border-[#27272a] bg-[#0a0a0a] p-5 transition hover:border-[#52525b] hover:bg-[#111111]"
          href={post.slug ? `/writing/${post.slug}` : "#writing"}
          aria-disabled={!post.slug}
        >
          <div
            class="mb-5 inline-flex items-center gap-2 rounded-md border border-[#27272a] bg-[#111111] px-3 py-2 text-sm font-semibold text-[#e4e4e7]"
          >
            <FileText class="size-4 text-[#a1a1aa]" />
            Canonical on sohab.dev
          </div>
          <div class="flex items-start justify-between gap-4">
            <h2 class="text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
              {post.title}
            </h2>
            {#if post.slug}
              <ArrowUpRight
                class="size-5 shrink-0 text-[#a1a1aa] transition group-hover:text-[#fafafa]"
              />
            {/if}
          </div>
          <p class="mt-4 max-w-2xl text-sm leading-7 text-[#a1a1aa]">
            {post.description}
          </p>
        </a>
      {/each}
    </div>
  </div>
</section>
