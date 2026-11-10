<script lang="ts">
  import { ArrowUpRight } from "@lucide/svelte";
  import type { GithubProject } from "$lib/types/portfolio";

  // Projects of mine that put the post's idea into practice.
  let { projects }: { projects: GithubProject[] } = $props();

  const link = (project: GithubProject) =>
    project.page ? `/projects/${project.page}` : project.href;
</script>

<section class="mt-14" aria-labelledby="built-with">
  <h2 id="built-with" class="text-lg font-semibold">Where I use this</h2>
  <div class="mt-4 grid gap-3 sm:grid-cols-2">
    {#each projects as project}
      <a
        class="group rounded-lg border border-[#27272a] bg-[#0a0a0a] p-4 transition hover:border-[#52525b] hover:bg-[#111111]"
        href={link(project)}
        target={project.page ? undefined : "_blank"}
        rel={project.page ? undefined : "noopener noreferrer"}
      >
        <span class="flex items-center justify-between gap-3 font-semibold">
          <span>{project.name}{#if !project.page}<span class="sr-only"> (opens in a new tab)</span>{/if}</span>
          <ArrowUpRight
            class="size-4 text-[#a1a1aa] transition duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#fafafa]"
            aria-hidden="true"
          />
        </span>
        <span class="mt-1.5 block text-sm leading-6 text-[#a1a1aa]">{project.description}</span>
      </a>
    {/each}
  </div>
</section>
