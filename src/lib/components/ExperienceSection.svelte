<script lang="ts">
  import { ArrowUpRight, ChevronDown } from "@lucide/svelte";
  import IconMark from "$lib/components/IconMark.svelte";
  import SectionHeading from "$lib/components/SectionHeading.svelte";
  import { skillIcons } from "$lib/icons/portfolioIcons";
  import type { ExperienceItem } from "$lib/types/portfolio";

  let { experience }: { experience: ExperienceItem[] } = $props();
</script>

<section
  id="experience"
  class="scroll-mt-24 border-b border-[#27272a] py-16 lg:py-18"
>
  <SectionHeading
    eyebrow="Experience"
    title="Production systems, from AI workflows to web platforms."
    description="A role-by-role view of the systems shipped, platforms touched, and engineering focus behind the work."
  />

  <div class="divide-y divide-[#27272a] overflow-hidden rounded-lg border border-[#27272a] bg-[#0a0a0a]">
    {#each experience as item, index}
      <details class="group transition-colors open:bg-[#0d0d0d]" open={index === 0}>
        <summary
          class="grid cursor-pointer list-none gap-5 p-5 outline-none transition hover:bg-[#111111] focus-visible:bg-[#111111] sm:p-6 md:grid-cols-[minmax(0,1fr)_11rem] [&::-webkit-details-marker]:hidden"
        >
          <div class="min-w-0">
            <p class="text-xs font-semibold uppercase tracking-[0.14em] text-[#a1a1aa]">
              {item.role}
            </p>
            <h3 class="mt-2 text-xl font-semibold tracking-tight text-[#fafafa]">
              {item.company}
            </h3>
            <div class="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1">
              {#each item.links as link}
                <a
                  class="inline-flex items-center gap-0.5 text-[0.68rem] font-medium text-[#a1a1aa] underline decoration-[#3f3f46] decoration-1 underline-offset-3 transition hover:text-[#fafafa] hover:decoration-[#71717a]"
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {link.label}
                  <ArrowUpRight class="size-2.5 text-[#71717a]" />
                </a>
              {/each}
            </div>
          </div>
          <div class="flex items-center justify-between gap-4 md:justify-end md:text-right">
            <p class="text-sm font-medium text-[#a1a1aa]">
              {item.period}
            </p>
            <span
              class="inline-flex size-8 shrink-0 items-center justify-center rounded-md border border-[#3f3f46] text-[#a1a1aa] transition group-hover:border-[#52525b] group-hover:text-[#fafafa] group-open:rotate-180 group-open:border-[#71717a]"
            >
              <ChevronDown class="size-4" />
            </span>
          </div>
        </summary>

        <div class="border-t border-[#27272a] px-5 pb-6 pt-5 sm:px-6">
          <p class="max-w-3xl text-sm leading-7 text-[#a1a1aa]">
            {item.summary}
          </p>

          <div class="mt-5 flex flex-wrap gap-2 border-t border-[#27272a] pt-5">
            {#each item.stack as tag}
              <span
                class="inline-flex min-h-8 items-center gap-1.5 rounded-md border border-[#27272a] bg-[#111111] px-2.5 text-xs font-medium text-[#d4d4d8]"
              >
                <IconMark
                  icon={skillIcons[tag]}
                  label={tag}
                  brandColor
                  class="size-3.5"
                />
                {tag}
              </span>
            {/each}
          </div>
        </div>
      </details>
    {/each}
  </div>
</section>
