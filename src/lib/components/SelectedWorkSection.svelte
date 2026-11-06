<script lang="ts">
  import { ArrowUpRight } from "@lucide/svelte";
  import SectionHeading from "$lib/components/SectionHeading.svelte";
  import type { SelectedWork } from "$lib/types/portfolio";

  let { work }: { work: SelectedWork[] } = $props();

  const featured = $derived(work[0]);
  const rest = $derived(work.slice(1));
</script>

{#snippet tags(stack: string[])}
  <div class="flex flex-wrap gap-2">
    {#each stack as tag}
      <span
        class="inline-flex min-h-7 items-center rounded-md border border-[#27272a] bg-[#111111] px-2.5 text-xs font-medium text-[#d4d4d8]"
      >
        {tag}
      </span>
    {/each}
  </div>
{/snippet}

{#snippet link(item: SelectedWork)}
  {#if item.href}
    <a
      class="inline-flex items-center gap-1 text-sm font-medium text-[#e4e4e7] underline decoration-[#3f3f46] underline-offset-4 transition hover:decoration-[#a1a1aa]"
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {item.hrefLabel ?? "Learn more"}
      <ArrowUpRight class="size-3.5 text-[#71717a]" />
    </a>
  {/if}
{/snippet}

<section
  id="work"
  class="scroll-mt-24 border-b border-[#27272a] py-16 lg:py-18"
>
  <SectionHeading
    eyebrow="Selected work"
    title="AI products shipped to production."
    description="The agentic systems behind my day job: what they do and the scale they run at."
  />

  <div class="grid gap-4">
    {#if featured}
      <article
        class="grid overflow-hidden rounded-lg border border-[#27272a] bg-[#0a0a0a] lg:grid-cols-[minmax(0,1fr)_15rem]"
      >
        <div class="flex flex-col gap-5 p-5 sm:p-7">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.14em] text-[#a1a1aa]">
              {featured.context}
            </p>
            <h3 class="mt-2 text-2xl font-semibold tracking-tight text-[#fafafa]">
              {featured.name}
            </h3>
          </div>
          <p class="max-w-2xl text-sm leading-7 text-[#a1a1aa]">{featured.description}</p>
          <div class="mt-auto flex flex-wrap items-center justify-between gap-4">
            {@render tags(featured.stack)}
            {@render link(featured)}
          </div>
        </div>

        <dl
          class="grid grid-cols-2 gap-px border-t border-[#27272a] bg-[#27272a] lg:grid-cols-1 lg:border-t-0 lg:border-l"
        >
          {#each featured.metrics as metric}
            <div class="flex flex-col-reverse justify-center bg-[#0d0d0d] p-5 sm:p-6">
              <dt class="mt-1 text-xs leading-5 text-[#a1a1aa]">{metric.label}</dt>
              <dd class="text-2xl font-semibold tracking-tight text-[#fafafa] sm:text-3xl">
                {metric.value}
              </dd>
            </div>
          {/each}
        </dl>
      </article>
    {/if}

    <div class="grid gap-4 xl:grid-cols-3">
      {#each rest as item}
        <article
          class="flex flex-col gap-4 rounded-lg border border-[#27272a] bg-[#0a0a0a] p-5 sm:p-6"
        >
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.14em] text-[#a1a1aa]">
              {item.context}
            </p>
            <h3 class="mt-2 text-lg font-semibold tracking-tight text-[#fafafa]">
              {item.name}
            </h3>
          </div>

          <dl class="flex flex-wrap gap-x-6 gap-y-3">
            {#each item.metrics as metric}
              <div class="flex flex-col-reverse">
                <dt class="text-xs leading-5 text-[#a1a1aa]">{metric.label}</dt>
                <dd class="text-2xl font-semibold tracking-tight text-[#fafafa]">
                  {metric.value}
                </dd>
              </div>
            {/each}
          </dl>

          <p class="text-sm leading-6 text-[#a1a1aa]">{item.description}</p>

          <div class="mt-auto flex flex-col gap-4 pt-1">
            {@render tags(item.stack)}
            {@render link(item)}
          </div>
        </article>
      {/each}
    </div>
  </div>
</section>
