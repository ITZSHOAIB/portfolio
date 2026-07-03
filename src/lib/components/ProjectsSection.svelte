<script lang="ts">
  import { ArrowUpRight } from "@lucide/svelte";
  import SectionHeading from "$lib/components/SectionHeading.svelte";
  import type { GithubProject } from "$lib/types/portfolio";

  let { projects }: { projects: GithubProject[] } = $props();
</script>

<section
  id="projects"
  class="scroll-mt-24 border-b border-[#27272a] py-16 lg:py-18"
>
  <SectionHeading
    eyebrow="Projects"
    title="Selected public builds and products."
    description="A focused set of shipped tools, libraries, and app projects."
  />

  <div class="grid gap-4">
    {#each projects.slice(0, 3) as project}
      <a
        class="group grid gap-5 rounded-lg border border-[#27272a] bg-[#0a0a0a] p-5 transition hover:border-[#52525b] hover:bg-[#111111] sm:p-6 lg:grid-cols-[minmax(0,1fr)_10rem]"
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div>
          <div class="flex flex-wrap items-center gap-3">
            <h3 class="text-xl font-semibold tracking-tight text-[#fafafa]">
              {project.name}
            </h3>
            <span
              class="rounded-md border border-[#27272a] bg-[#111111] px-2 py-1 text-xs font-semibold text-[#d4d4d8]"
            >
              {project.language}
            </span>
          </div>
          <p class="mt-3 max-w-2xl text-sm leading-7 text-[#a1a1aa]">
            {project.description}
          </p>
          <div class="mt-4 flex flex-wrap gap-2">
            {#each project.topics as topic}
              <span
                class="rounded-md border border-[#27272a] px-2.5 py-1 text-xs font-semibold text-[#a1a1aa]"
              >
                {topic}
              </span>
            {/each}
          </div>
        </div>
        <div class="flex items-start justify-between gap-4 lg:block lg:text-right">
          <div>
            <p class="text-xs font-bold uppercase tracking-[0.12em] text-[#71717a]">
              Updated
            </p>
            <p class="mt-1 text-sm font-semibold text-[#e4e4e7]">
              {project.updated}
            </p>
          </div>
          <div class="mt-0 lg:mt-5">
            <p class="text-xs font-bold uppercase tracking-[0.12em] text-[#71717a]">
              Stars
            </p>
            <p class="mt-1 text-sm font-semibold text-[#e4e4e7]">
              {project.stars}
            </p>
          </div>
          <ArrowUpRight
            class="mt-0 size-5 text-[#a1a1aa] transition group-hover:text-[#fafafa] lg:mt-5 lg:ml-auto"
          />
        </div>
      </a>
    {/each}

    <div class="grid gap-4 md:grid-cols-2">
      {#each projects.slice(3, 5) as project}
        <a
          class="group rounded-lg border border-[#27272a] bg-[#0a0a0a] p-5 transition hover:border-[#52525b] hover:bg-[#111111]"
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div>
            <div class="flex items-start justify-between gap-4">
              <h3 class="text-lg font-semibold tracking-tight text-[#fafafa]">
                {project.name}
              </h3>
              <ArrowUpRight
                class="size-5 shrink-0 text-[#a1a1aa] transition group-hover:text-[#fafafa]"
              />
            </div>
            <p class="mt-3 line-clamp-3 text-sm leading-7 text-[#a1a1aa]">
              {project.description}
            </p>
          </div>
          <div
            class="mt-5 flex items-center justify-between gap-3 border-t border-[#27272a] pt-4 text-sm"
          >
            <span
              class="rounded-md border border-[#27272a] bg-[#111111] px-2 py-1 text-xs font-semibold text-[#d4d4d8]"
            >
              {project.language}
            </span>
            <span class="text-xs font-semibold text-[#a1a1aa]">
              {project.updated}
            </span>
          </div>
        </a>
      {/each}
    </div>
  </div>
</section>
