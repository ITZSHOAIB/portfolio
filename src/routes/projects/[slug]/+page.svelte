<script lang="ts">
  import { ArrowLeft, ArrowUpRight, Check, Copy } from "@lucide/svelte";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();

  let copied = $state(false);

  async function copyInstall() {
    if (!data.project.install) return;
    await navigator.clipboard.writeText(data.project.install);
    copied = true;
    setTimeout(() => (copied = false), 1800);
  }

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
      <section class="project-hero">
        {#if data.project.eyebrow}
          <p class="text-xs font-semibold uppercase tracking-[0.18em] text-[#a1a1aa]">
            {data.project.eyebrow}
          </p>
        {/if}
        <h1 class="mt-3 text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
          {data.project.title}
        </h1>
        <p class="mt-4 max-w-2xl text-lg leading-8 text-[#a1a1aa]">
          {data.project.description}
        </p>

        {#if data.project.badges.length}
          <ul class="mt-6 flex flex-wrap gap-2">
            {#each data.project.badges as badge}
              <li
                class="rounded-md border border-[#27272a] bg-[#111111] px-2.5 py-1 text-xs font-semibold text-[#d4d4d8]"
              >
                {badge}
              </li>
            {/each}
          </ul>
        {/if}

        {#if data.project.install}
          <div class="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div
              class="flex min-w-0 flex-1 items-center justify-between gap-3 rounded-lg border border-[#27272a] bg-[#0a0a0a] py-2 pl-4 pr-2 font-mono text-sm text-[#fafafa]"
            >
              <code class="min-w-0 overflow-x-auto whitespace-nowrap">
                <span class="select-none text-[#71717a]">$ </span>{data.project.install}
              </code>
              <button
                type="button"
                class="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-[#27272a] bg-[#111111] px-3 py-1.5 text-xs font-semibold text-[#d4d4d8] transition hover:border-[#52525b] hover:text-[#fafafa]"
                onclick={copyInstall}
                aria-live="polite"
              >
                {#if copied}
                  <Check class="size-3.5" /> Copied
                {:else}
                  <Copy class="size-3.5" /> Copy
                {/if}
              </button>
            </div>
            <a
              class="inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#fafafa] px-4 py-2.5 text-sm font-semibold text-[#000000] transition hover:bg-[#d4d4d8]"
              href={data.project.repo}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on GitHub
              <ArrowUpRight class="size-4" />
            </a>
          </div>
        {/if}
      </section>

      <div class="prose-post mt-12">
        {@html data.html}
      </div>
    </article>
  </main>
</div>
