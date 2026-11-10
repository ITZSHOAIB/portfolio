<script lang="ts">
  import { ArrowUpRight } from "@lucide/svelte";
  import { tagSlug } from "$lib/content/blog-queries";
  import type { BlogPost } from "$lib/types/portfolio";
  import { formatDate } from "$lib/utils/date";

  let { post }: { post: BlogPost } = $props();
</script>

<article
  class="post-card group relative flex flex-col gap-4 rounded-lg border border-[#27272a] bg-[#0a0a0a] p-5 transition hover:border-[#52525b] hover:bg-[#111111] sm:flex-row sm:items-start sm:gap-6 sm:p-6"
>
  {#if post.cover}
    <img
      class="post-card-cover sm:order-2"
      src={post.cover}
      alt=""
      width="420"
      height="270"
      loading="lazy"
    />
  {/if}
  <div class="min-w-0 flex-1">
    <p class="text-sm text-[#a1a1aa]">
      <time datetime={post.published}>{formatDate(post.published)}</time>
      · {post.readingMinutes} min read
    </p>
    <div class="mt-3 flex items-start justify-between gap-4">
      <h2 class="text-xl font-semibold leading-snug tracking-tight sm:text-2xl">
        <a class="after:absolute after:inset-0" href={`/blog/${post.slug}`}>
          {post.title}
        </a>
      </h2>
      <ArrowUpRight
        class="size-5 shrink-0 text-[#a1a1aa] transition group-hover:text-[#fafafa]"
      />
    </div>
    <p class="mt-3 max-w-2xl text-sm leading-7 text-[#a1a1aa]">{post.description}</p>
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
