<script lang="ts">
  import { ArrowLeft } from "@lucide/svelte";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();

  const url = $derived(`${data.site.url}/writing/${data.post.slug}`);
  const jsonLd = $derived({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: data.post.title,
    description: data.post.description,
    datePublished: data.post.published,
    dateModified: data.post.updated ?? data.post.published,
    url,
    mainEntityOfPage: url,
    image: `${data.site.url}${data.site.image.path}`,
    keywords: data.post.tags,
    author: { "@type": "Person", name: data.site.name, url: data.site.url },
  });
  const jsonLdScript = $derived(
    `<script type="application/ld+json">${JSON.stringify(jsonLd).replaceAll("<", "\u003c")}</` +
      "script>",
  );
</script>

<svelte:head>
  <title>{data.post.title} | {data.site.name}</title>
  <meta name="description" content={data.post.description} />
  <link rel="canonical" href={url} />
  <link
    rel="alternate"
    type="application/rss+xml"
    title={`${data.site.name} writing`}
    href="/rss.xml"
  />
  <meta property="og:type" content="article" />
  <meta property="og:title" content={data.post.title} />
  <meta property="og:description" content={data.post.description} />
  <meta property="og:url" content={url} />
  <meta property="og:image" content={`${data.site.url}${data.site.image.path}`} />
  <meta property="article:published_time" content={data.post.published} />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={data.post.title} />
  <meta name="twitter:description" content={data.post.description} />
  {@html jsonLdScript}
</svelte:head>

<div class="min-h-screen bg-[#000000] text-[#fafafa]">
  <header class="border-b border-[#27272a]">
    <div class="mx-auto flex min-h-16 max-w-3xl items-center px-4">
      <a
        class="inline-flex items-center gap-2 text-sm font-medium text-[#a1a1aa] transition hover:text-[#fafafa]"
        href="/"
      >
        <ArrowLeft class="size-4" />
        {data.site.name}
      </a>
    </div>
  </header>

  <main class="mx-auto max-w-3xl px-4 py-12 sm:py-16">
    <article>
      <p class="text-sm text-[#a1a1aa]">
        <time datetime={data.post.published}>{data.post.published}</time>
        · {data.post.readingMinutes} min read
      </p>
      <h1 class="mt-3 text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
        {data.post.title}
      </h1>
      <p class="mt-4 text-lg leading-8 text-[#a1a1aa]">{data.post.description}</p>

      <div class="prose-post mt-10">
        {@html data.html}
      </div>
    </article>
  </main>
</div>
