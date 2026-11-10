<script lang="ts">
  import { ArrowLeft, Rss } from "@lucide/svelte";
  import type { Snippet } from "svelte";
  import { site } from "$content/site";
  import "$lib/styles/blog.css";

  let {
    children,
    width = "max-w-3xl",
    page,
  }: { children: Snippet; width?: string; page?: "blog" } = $props();
</script>

<div class="blog-page min-h-screen bg-[#000000] text-[#fafafa]">
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="border-b border-[#27272a]">
    <div class="mx-auto flex min-h-16 max-w-5xl items-center justify-between px-4">
      <a
        class="inline-flex items-center gap-2 text-sm font-medium text-[#a1a1aa] transition hover:text-[#fafafa]"
        href="/"
      >
        <ArrowLeft class="size-4" aria-hidden="true" />
        {site.name}
      </a>
      <nav class="flex items-center gap-5 text-sm font-medium text-[#a1a1aa]" aria-label="Blog">
        <a class="transition hover:text-[#fafafa]" href="/blog" aria-current={page === "blog" ? "page" : undefined}>Blog</a>
        <a
          class="inline-flex items-center gap-1.5 transition hover:text-[#fafafa]"
          href="/rss.xml"
          aria-label="RSS feed"
        >
          <Rss class="size-4" aria-hidden="true" />
        </a>
      </nav>
    </div>
  </header>

  <main id="main" tabindex="-1" class={`mx-auto px-4 py-12 outline-none sm:py-16 ${width}`}>
    {@render children()}
  </main>

  <footer class="border-t border-[#27272a]">
    <div
      class="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-6 text-sm text-[#8a8a93]"
    >
      <span>© {new Date().getFullYear()} {site.name}</span>
      <span class="flex gap-4">
        <a class="transition hover:text-[#fafafa]" href="/rss.xml">RSS</a>
        <a class="transition hover:text-[#fafafa]" href="/feed.json">JSON Feed</a>
      </span>
    </div>
  </footer>
</div>
