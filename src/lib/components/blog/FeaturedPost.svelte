<script lang="ts">
  import { ArrowUpRight } from "@lucide/svelte";
  import { tagSlug } from "$lib/content/blog-queries";
  import type { BlogPost } from "$lib/types/portfolio";
  import { formatDate } from "$lib/utils/date";

  let { post }: { post: BlogPost } = $props();
</script>

<article
  class="group relative rounded-lg border border-[#27272a] bg-[#0a0a0a] transition hover:border-[#52525b] hover:bg-[#111111] p-5 sm:p-6 md:grid md:grid-cols-[1.3fr_1fr] md:items-center md:gap-8"
>
  {#if post.cover}
    <img
      class="featured-cover"
      src={post.cover}
      alt=""
      width="1200"
      height="630"
      fetchpriority="high"
    />
  {/if}
  <div class="mt-5 md:mt-0">
    <p class="flex flex-wrap items-center gap-x-2 text-sm text-[#a1a1aa]">
      <span class="rounded-md bg-[#7dd3fc]/10 px-2 py-0.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#7dd3fc]">Latest</span>
      <time datetime={post.published}>{formatDate(post.published)}</time>
      <span aria-hidden="true">·</span>
      <span>{post.readingMinutes} min read</span>
    </p>
    <div class="mt-3 flex items-start justify-between gap-4">
      <h2 class="blog-title text-2xl font-semibold leading-tight">
        <a class="after:absolute after:inset-0" href={`/blog/${post.slug}`}>{post.title}</a>
      </h2>
      <ArrowUpRight
        class="mt-1 size-6 shrink-0 text-[#a1a1aa] transition duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#fafafa]"
        aria-hidden="true"
      />
    </div>
    <p class="mt-3 max-w-2xl leading-7 text-[#a1a1aa]">{post.description}</p>
    {#if post.tags.length}
      <ul class="relative mt-4 flex flex-wrap gap-2">
        {#each post.tags as tag}
          <li>
            <a
              class="rounded-md border border-[#27272a] bg-[#111111] px-2 py-1 text-xs font-semibold text-[#d4d4d8] transition hover:border-[#52525b]"
              href={`/tags/${tagSlug(tag)}`}>{tag}</a
            >
          </li>
        {/each}
      </ul>
    {/if}
  </div>
</article>
