<script lang="ts">
  import { ArrowLeft, ArrowRight } from "@lucide/svelte";
  import BlogShell from "$lib/components/blog/BlogShell.svelte";
  import PostCard from "$lib/components/blog/PostCard.svelte";
  import ReadingProgress from "$lib/components/blog/ReadingProgress.svelte";
  import Seo from "$lib/components/blog/Seo.svelte";
  import TableOfContents from "$lib/components/blog/TableOfContents.svelte";
  import { tagSlug } from "$lib/content/writing-queries";
  import { formatDate } from "$lib/utils/date";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();

  const path = $derived(`/writing/${data.post.slug}`);
  const image = $derived(`${data.site.url}${path}/og.png`);
  const jsonLd = $derived({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: data.post.title,
    description: data.post.description,
    datePublished: data.post.published,
    dateModified: data.post.updated ?? data.post.published,
    url: `${data.site.url}${path}`,
    mainEntityOfPage: `${data.site.url}${path}`,
    image,
    keywords: data.post.tags,
    author: { "@type": "Person", name: data.site.name, url: data.site.url },
    publisher: { "@type": "Person", name: data.site.name, url: data.site.url },
  });
</script>

<Seo
  title={`${data.post.title} | ${data.site.name}`}
  description={data.post.description}
  {path}
  {image}
  type="article"
  published={data.post.published}
  updated={data.post.updated}
  {jsonLd}
/>

<ReadingProgress />

<BlogShell width="max-w-5xl">
  <div class="xl:grid xl:grid-cols-[minmax(0,48rem)_14rem] xl:gap-14">
    <article class="blog-reveal min-w-0">
      <p class="text-sm text-[#a1a1aa]">
        <time datetime={data.post.published}>{formatDate(data.post.published)}</time>
        · {data.post.readingMinutes} min read
        {#if data.post.updated}
          · Updated <time datetime={data.post.updated}>{formatDate(data.post.updated)}</time>
        {/if}
      </p>
      <h1
        class="blog-title mt-3 text-3xl font-semibold leading-tight tracking-tight sm:text-5xl"
      >
        {data.post.title}
      </h1>
      <p class="mt-4 text-lg leading-8 text-[#a1a1aa]">{data.post.description}</p>
      {#if data.post.tags.length}
        <ul class="mt-5 flex flex-wrap gap-2">
          {#each data.post.tags as tag}
            <li>
              <a
                class="rounded-md border border-[#27272a] bg-[#111111] px-2 py-1 text-xs font-semibold text-[#d4d4d8] transition hover:border-[#52525b]"
                href={`/tags/${tagSlug(tag)}`}>{tag}</a
              >
            </li>
          {/each}
        </ul>
      {/if}

      <div class="mt-8 xl:hidden"><TableOfContents items={data.toc} variant="inline" /></div>

      <div class="prose-post mt-10">
        {@html data.html}
      </div>

      {#if data.newer || data.older}
        <nav class="mt-16 grid gap-3 sm:grid-cols-2" aria-label="More posts">
          {#if data.newer}
            <a
              class="rounded-lg border border-[#27272a] bg-[#0a0a0a] p-4 transition hover:border-[#52525b]"
              href={`/writing/${data.newer.slug}`}
            >
              <span class="flex items-center gap-1.5 text-xs text-[#a1a1aa]">
                <ArrowLeft class="size-3.5" /> Newer
              </span>
              <span class="mt-1 block font-semibold">{data.newer.title}</span>
            </a>
          {:else}<span></span>{/if}
          {#if data.older}
            <a
              class="rounded-lg border border-[#27272a] bg-[#0a0a0a] p-4 text-right transition hover:border-[#52525b] sm:col-start-2"
              href={`/writing/${data.older.slug}`}
            >
              <span class="flex items-center justify-end gap-1.5 text-xs text-[#a1a1aa]">
                Older <ArrowRight class="size-3.5" />
              </span>
              <span class="mt-1 block font-semibold">{data.older.title}</span>
            </a>
          {/if}
        </nav>
      {/if}

      {#if data.related.length}
        <section class="mt-14">
          <h2 class="mb-4 text-lg font-semibold">Related posts</h2>
          <div class="grid gap-4">
            {#each data.related as post}
              <PostCard {post} />
            {/each}
          </div>
        </section>
      {/if}
    </article>

    <aside class="hidden xl:block">
      <div class="sticky top-8">
        <TableOfContents items={data.toc} variant="sidebar" />
      </div>
    </aside>
  </div>
</BlogShell>
