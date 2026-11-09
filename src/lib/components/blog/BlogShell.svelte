<script lang="ts">
  import { ArrowLeft, Rss } from "@lucide/svelte";
  import type { Snippet } from "svelte";
  import { site } from "$lib/config/site";
  import "$lib/styles/blog.css";

  let {
    children,
    width = "max-w-3xl",
  }: { children: Snippet; width?: string } = $props();
</script>

<div class="blog-page min-h-screen bg-[#000000] text-[#fafafa]">
  <header class="border-b border-[#27272a]">
    <div class="mx-auto flex min-h-16 max-w-5xl items-center justify-between px-4">
      <a
        class="inline-flex items-center gap-2 text-sm font-medium text-[#a1a1aa] transition hover:text-[#fafafa]"
        href="/"
      >
        <ArrowLeft class="size-4" />
        {site.name}
      </a>
      <nav class="flex items-center gap-5 text-sm font-medium text-[#a1a1aa]">
        <a class="transition hover:text-[#fafafa]" href="/writing">Writing</a>
        <a
          class="inline-flex items-center gap-1.5 transition hover:text-[#fafafa]"
          href="/rss.xml"
          aria-label="RSS feed"
        >
          <Rss class="size-4" />
        </a>
      </nav>
    </div>
  </header>

  <main class={`mx-auto px-4 py-12 sm:py-16 ${width}`}>
    {@render children()}
  </main>

  <footer class="border-t border-[#27272a]">
    <div
      class="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-6 text-sm text-[#71717a]"
    >
      <span>© {new Date().getFullYear()} {site.name}</span>
      <span class="flex gap-4">
        <a class="transition hover:text-[#fafafa]" href="/rss.xml">RSS</a>
        <a class="transition hover:text-[#fafafa]" href="/feed.json">JSON Feed</a>
      </span>
    </div>
  </footer>
</div>
