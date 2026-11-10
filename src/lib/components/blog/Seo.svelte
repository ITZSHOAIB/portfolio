<script lang="ts">
  import { site } from "$content/site";

  let {
    title,
    description,
    path,
    image = `${site.url}${site.image.path}`,
    imageAlt = site.image.alt,
    type = "website",
    published,
    updated,
    tags = [],
    noindex = false,
    jsonLd,
  }: {
    /** Page title without the site name; it is appended when it fits. */
    title: string;
    description: string;
    path: string;
    image?: string;
    imageAlt?: string;
    type?: "website" | "article";
    published?: string;
    updated?: string;
    tags?: string[];
    noindex?: boolean;
    jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  } = $props();

  // Search results cut titles at about 60 characters, so the site name only
  // goes on when it still fits.
  const MAX_TITLE = 60;
  const fullTitle = $derived(
    `${title} | ${site.name}`.length <= MAX_TITLE ? `${title} | ${site.name}` : title,
  );

  const url = $derived(`${site.url}${path}`);
  const robots = $derived(
    noindex ? "noindex, follow" : "index, follow, max-image-preview:large, max-snippet:-1",
  );
  // `<` is escaped so the JSON cannot close its own script tag.
  const jsonLdScripts = $derived(
    (Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [])
      .map(
        (block) =>
          `<script type="application/ld+json">${JSON.stringify(block).replaceAll("<", "\\u003c")}</` +
          "script>",
      )
      .join(""),
  );
</script>

<svelte:head>
  <title>{fullTitle}</title>
  <meta name="description" content={description} />
  <meta name="robots" content={robots} />
  <meta name="theme-color" content={site.themeColor} />
  <link rel="canonical" href={url} />
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
  <meta property="og:locale" content={site.locale} />
  <meta property="og:type" content={type} />
  <meta property="og:title" content={fullTitle} />
  <meta property="og:description" content={description} />
  <meta property="og:url" content={url} />
  <meta property="og:image" content={image} />
  <meta property="og:image:alt" content={imageAlt} />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  {#if published}<meta property="article:published_time" content={published} />{/if}
  {#if updated}<meta property="article:modified_time" content={updated} />{/if}
  {#if type === "article"}
    <meta property="article:author" content={site.url} />
    {#each tags as tag}<meta property="article:tag" content={tag} />{/each}
  {/if}
  <meta name="twitter:card" content="summary_large_image" />
  {#if site.twitterHandle}
    <meta name="twitter:site" content={site.twitterHandle} />
    <meta name="twitter:creator" content={site.twitterHandle} />
  {/if}
  <meta name="twitter:title" content={fullTitle} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={image} />
  <meta name="twitter:image:alt" content={imageAlt} />
  {@html jsonLdScripts}
</svelte:head>
