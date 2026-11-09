<script lang="ts">
  import { ArrowLeft, ArrowUpRight } from "@lucide/svelte";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();

  const url = $derived(`${data.site.url}/projects/${data.project.slug}`);
  const jsonLd = $derived({
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: data.project.title,
    description: data.project.description,
    codeRepository: data.project.repo,
    dateModified: data.project.updated,
    url,
    image: `${data.site.url}${data.site.image.path}`,
    author: { "@type": "Person", name: data.site.name, url: data.site.url },
  });
  const jsonLdScript = $derived(
    `<script type="application/ld+json">${JSON.stringify(jsonLd).replaceAll("<", "<")}</` +
      "script>",
  );
</script>

<svelte:head>
  <title>{data.project.title} | {data.site.name}</title>
  <meta name="description" content={data.project.description} />
  <link rel="canonical" href={url} />
  <meta property="og:type" content="website" />
  <meta property="og:title" content={data.project.title} />
  <meta property="og:description" content={data.project.description} />
  <meta property="og:url" content={url} />
  <meta property="og:image" content={`${data.site.url}${data.site.image.path}`} />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={data.project.title} />
  <meta name="twitter:description" content={data.project.description} />
  {@html jsonLdScript}
</svelte:head>

<div class="min-h-screen bg-[#000000] text-[#fafafa]">
  <header class="border-b border-[#27272a]">
    <div class="mx-auto flex min-h-16 max-w-3xl items-center justify-between px-4">
      <a
        class="inline-flex items-center gap-2 text-sm font-medium text-[#a1a1aa] transition hover:text-[#fafafa]"
        href="/#projects"
      >
        <ArrowLeft class="size-4" />
        {data.site.name}
      </a>
      <a
        class="inline-flex items-center gap-1.5 text-sm font-medium text-[#a1a1aa] transition hover:text-[#fafafa]"
        href={data.project.repo}
        target="_blank"
        rel="noopener noreferrer"
      >
        GitHub
        <ArrowUpRight class="size-4" />
      </a>
    </div>
  </header>

  <main class="mx-auto max-w-3xl px-4 py-12 sm:py-16">
    <article>
      <h1 class="text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
        {data.project.title}
      </h1>
      <p class="mt-4 text-lg leading-8 text-[#a1a1aa]">{data.project.description}</p>

      <div class="prose-post mt-10">
        {@html data.html}
      </div>
    </article>
  </main>
</div>
