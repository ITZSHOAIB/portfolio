<script lang="ts">
  import { ArrowUpRight } from "@lucide/svelte";
  import SectionHeading from "$lib/components/SectionHeading.svelte";
  import type { SelectedWork } from "$lib/types/portfolio";

  let { work }: { work: SelectedWork[] } = $props();
</script>

<section
  id="work"
  class="scroll-mt-24 border-b border-[#27272a] py-16 lg:py-18"
>
  <SectionHeading
    eyebrow="Selected work"
    title="AI products shipped to production."
    description="The agentic systems behind my day job: what they do and the scale they run at."
  />

  <div class="grid gap-4 md:grid-cols-2">
    {#each work as item}
      <article
        class="flex flex-col rounded-lg border border-[#27272a] bg-[#0a0a0a] p-5 sm:p-6"
      >
        <p class="text-xs font-semibold uppercase tracking-[0.14em] text-[#a1a1aa]">
          {item.context}
        </p>
        <h3 class="mt-2 text-xl font-semibold tracking-tight text-[#fafafa]">
          {item.name}
        </h3>

        <dl class="mt-4 flex flex-wrap gap-x-6 gap-y-3">
          {#each item.metrics as metric}
            <div>
              <dt class="sr-only">{metric.label}</dt>
              <dd class="text-2xl font-semibold tracking-tight text-[#fafafa]">
                {metric.value}
              </dd>
              <p class="text-xs text-[#a1a1aa]" aria-hidden="true">{metric.label}</p>
            </div>
          {/each}
        </dl>

        <p class="mt-4 text-sm leading-7 text-[#a1a1aa]">{item.description}</p>

        <div class="mt-5 flex flex-wrap gap-2">
          {#each item.stack as tag}
            <span
              class="inline-flex min-h-7 items-center rounded-md border border-[#27272a] bg-[#111111] px-2.5 text-xs font-medium text-[#d4d4d8]"
            >
              {tag}
            </span>
          {/each}
        </div>

        {#if item.href}
          <a
            class="mt-5 inline-flex items-center gap-1 text-sm font-medium text-[#e4e4e7] underline decoration-[#3f3f46] underline-offset-4 transition hover:decoration-[#a1a1aa]"
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {item.hrefLabel ?? "Learn more"}
            <ArrowUpRight class="size-3.5 text-[#71717a]" />
          </a>
        {/if}
      </article>
    {/each}
  </div>
</section>
