<script lang="ts">
  import { site } from "$lib/config/site";

  let {
    title,
    description,
    path,
    image = `${site.url}${site.image.path}`,
    type = "website",
    published,
    updated,
    noindex = false,
    jsonLd,
  }: {
    title: string;
    description: string;
    path: string;
    image?: string;
    type?: "website" | "article";
    published?: string;
    updated?: string;
    noindex?: boolean;
    jsonLd?: Record<string, unknown>;
  } = $props();

  const url = $derived(`${site.url}${path}`);
  const jsonLdScript = $derived(
    jsonLd
      ? `<script type="application/ld+json">${JSON.stringify(jsonLd).replaceAll("<", "<")}</` +
          "script>"
      : "",
  );
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={url} />
  {#if noindex}<meta name="robots" content="noindex" />{/if}
  <link
    rel="alternate"
    type="application/rss+xml"
    title={`${site.name} blog`}
    href="/rss.xml"
  />
  <link
    rel="alternate"
    type="application/feed+json"
    title={`${site.name} blog`}
    href="/feed.json"
  />
  <meta property="og:site_name" content={site.name} />
  <meta property="og:type" content={type} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:url" content={url} />
  <meta property="og:image" content={image} />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  {#if published}<meta property="article:published_time" content={published} />{/if}
  {#if updated}<meta property="article:modified_time" content={updated} />{/if}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={image} />
  {@html jsonLdScript}
</svelte:head>
