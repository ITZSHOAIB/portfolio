<script lang="ts">
    import { ArrowUpRight, Download, Star } from "@lucide/svelte";
    import SectionHeading from "$lib/components/SectionHeading.svelte";
    import type { GithubProject } from "$lib/types/portfolio";

    let { projects }: { projects: GithubProject[] } = $props();

    const featuredProject = $derived(projects[0]);
    const primaryProjects = $derived(projects.slice(1, 3));
    const secondaryProjects = $derived(projects.slice(3, 5));

    const getProjectHost = (href: string) => {
        try {
            return new URL(href).hostname.replace(/^www\./, "");
        } catch {
            return href.replace(/^https?:\/\//, "").replace(/\/$/, "");
        }
    };
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
        {#if featuredProject}
            <a
                class="group grid overflow-hidden rounded-lg border border-[#27272a] bg-[#0a0a0a] transition hover:border-[#52525b] hover:bg-[#111111] lg:grid-cols-[16rem_minmax(0,1fr)]"
                href={featuredProject.href}
                target="_blank"
                rel="noopener noreferrer"
            >
                {#if featuredProject.image}
                    <div
                        class="flex items-center border-b border-[#27272a] bg-[#050505] p-2.5 sm:p-3 lg:border-r lg:border-b-0"
                    >
                        <div
                            class="overflow-hidden rounded-md border border-[#27272a] bg-[#000000]"
                            style={`aspect-ratio: ${featuredProject.image.width} / ${featuredProject.image.height};`}
                        >
                            <img
                                class="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.015]"
                                src={featuredProject.image.src}
                                alt={featuredProject.image.alt}
                                width={featuredProject.image.width}
                                height={featuredProject.image.height}
                                loading="eager"
                                decoding="async"
                            />
                        </div>
                    </div>
                {/if}

                <div class="flex min-w-0 flex-col p-5 sm:p-6">
                    <div class="flex items-start justify-between gap-4">
                        <div class="min-w-0">
                            <div class="flex flex-wrap items-center gap-3">
                                <h3
                                    class="text-xl font-semibold tracking-tight text-[#fafafa]"
                                >
                                    {featuredProject.name}
                                </h3>
                                <span
                                    class="rounded-md border border-[#27272a] bg-[#111111] px-2 py-1 text-xs font-semibold text-[#d4d4d8]"
                                >
                                    {featuredProject.language}
                                </span>
                                <span
                                    class="rounded-md border border-[#3f3f46] bg-[#151515] px-2 py-1 text-xs font-semibold text-green-500"
                                >
                                    Active
                                </span>
                            </div>

                            <p
                                class="mt-3 max-w-2xl text-sm leading-7 text-[#a1a1aa]"
                            >
                                {featuredProject.description}
                            </p>

                        </div>

                        <ArrowUpRight
                            class="size-5 shrink-0 text-[#a1a1aa] transition group-hover:text-[#fafafa]"
                        />
                    </div>

                    <div
                        class="mt-auto flex flex-wrap items-end justify-between gap-4 pt-4"
                    >
                        <div class="flex flex-wrap gap-2">
                            {#each featuredProject.topics as topic}
                                <span
                                    class="rounded-md border border-[#27272a] px-2.5 py-1 text-xs font-semibold text-[#a1a1aa]"
                                >
                                    {topic}
                                </span>
                            {/each}
                        </div>

                        {#if featuredProject.metrics}
                            <div
                                class="ml-auto flex flex-wrap justify-end gap-x-4 gap-y-2 text-xs text-[#71717a]"
                            >
                                {#each featuredProject.metrics as metric}
                                    <span class="flex items-center gap-1.5">
                                        {#if metric.icon === "downloads"}
                                            <Download class="size-3.5" />
                                        {:else}
                                            <Star class="size-3.5" />
                                        {/if}
                                        <strong class="font-semibold text-[#e4e4e7]">
                                            {metric.value}
                                        </strong>
                                        <span>{metric.label}</span>
                                    </span>
                                {/each}
                            </div>
                        {/if}
                    </div>
                </div>
            </a>
        {/if}

        {#each primaryProjects as project}
            {#if project.image}
                <a
                    class="group grid overflow-hidden rounded-lg border border-[#27272a] bg-[#0a0a0a] transition hover:border-[#52525b] hover:bg-[#111111] lg:grid-cols-[16rem_minmax(0,1fr)]"
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <div
                        class="flex items-center border-b border-[#27272a] bg-[#050505] p-2.5 sm:p-3 lg:border-r lg:border-b-0"
                    >
                        <div
                            class="overflow-hidden rounded-md border border-[#27272a] bg-[#000000]"
                            style={`aspect-ratio: ${project.image.width} / ${project.image.height};`}
                        >
                            <img
                                class="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.015]"
                                src={project.image.src}
                                alt={project.image.alt}
                                width={project.image.width}
                                height={project.image.height}
                                loading="lazy"
                                decoding="async"
                            />
                        </div>
                    </div>

                    <div class="flex min-w-0 flex-col p-5 sm:p-6">
                        <div class="flex items-start justify-between gap-4">
                            <div class="min-w-0">
                                <div class="flex flex-wrap items-center gap-3">
                                    <h3
                                        class="text-xl font-semibold tracking-tight text-[#fafafa]"
                                    >
                                        {project.name}
                                    </h3>
                                    <span
                                        class="rounded-md border border-[#27272a] bg-[#111111] px-2 py-1 text-xs font-semibold text-[#d4d4d8]"
                                    >
                                        {project.language}
                                    </span>
                                    <span
                                        class="rounded-md border border-[#3f3f46] bg-[#151515] px-2 py-1 text-xs font-semibold text-[#d4d4d8]"
                                    >
                                        {project.updated}
                                    </span>
                                </div>

                                <p
                                    class="mt-3 max-w-2xl text-sm leading-7 text-[#a1a1aa]"
                                >
                                    {project.description}
                                </p>

                            </div>

                            <ArrowUpRight
                                class="size-5 shrink-0 text-[#a1a1aa] transition group-hover:text-[#fafafa]"
                            />
                        </div>

                        <div
                            class="mt-auto flex flex-wrap items-end justify-between gap-4 pt-4"
                        >
                            <div class="flex flex-wrap gap-2">
                                {#each project.topics as topic}
                                    <span
                                        class="rounded-md border border-[#27272a] px-2.5 py-1 text-xs font-semibold text-[#a1a1aa]"
                                    >
                                        {topic}
                                    </span>
                                {/each}
                            </div>

                            {#if project.metrics}
                                <div
                                    class="ml-auto flex flex-wrap justify-end gap-x-4 gap-y-2 text-xs text-[#71717a]"
                                >
                                    {#each project.metrics as metric}
                                        <span class="flex items-center gap-1.5">
                                            {#if metric.icon === "downloads"}
                                                <Download class="size-3.5" />
                                            {:else}
                                                <Star class="size-3.5" />
                                            {/if}
                                            <strong
                                                class="font-semibold text-[#e4e4e7]"
                                            >
                                                {metric.value}
                                            </strong>
                                            <span>{metric.label}</span>
                                        </span>
                                    {/each}
                                </div>
                            {/if}
                        </div>
                    </div>
                </a>
            {:else}
                <a
                    class="group grid gap-5 rounded-lg border border-[#27272a] bg-[#0a0a0a] p-5 transition hover:border-[#52525b] hover:bg-[#111111] sm:p-6 lg:grid-cols-[minmax(0,1fr)_10rem]"
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <div>
                        <div class="flex flex-wrap items-center gap-3">
                            <h3
                                class="text-xl font-semibold tracking-tight text-[#fafafa]"
                            >
                                {project.name}
                            </h3>
                            <span
                                class="rounded-md border border-[#27272a] bg-[#111111] px-2 py-1 text-xs font-semibold text-[#d4d4d8]"
                            >
                                {project.language}
                            </span>
                        </div>
                        <p
                            class="mt-3 max-w-2xl text-sm leading-7 text-[#a1a1aa]"
                        >
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
                    <div
                        class="flex items-start justify-between gap-4 lg:block lg:text-right"
                    >
                        <div>
                            <p
                                class="text-xs font-bold uppercase tracking-[0.12em] text-[#71717a]"
                            >
                                Updated
                            </p>
                            <p
                                class="mt-1 text-sm font-semibold text-[#e4e4e7]"
                            >
                                {project.updated}
                            </p>
                        </div>
                        <div class="mt-0 lg:mt-5">
                            <p
                                class="text-xs font-bold uppercase tracking-[0.12em] text-[#71717a]"
                            >
                                Stars
                            </p>
                            <p
                                class="mt-1 text-sm font-semibold text-[#e4e4e7]"
                            >
                                {project.stars}
                            </p>
                        </div>
                        <ArrowUpRight
                            class="mt-0 size-5 text-[#a1a1aa] transition group-hover:text-[#fafafa] lg:mt-5 lg:ml-auto"
                        />
                    </div>
                </a>
            {/if}
        {/each}

        <div class="grid gap-4 md:grid-cols-2">
            {#each secondaryProjects as project}
                <a
                    class="group rounded-lg border border-[#27272a] bg-[#0a0a0a] p-5 transition hover:border-[#52525b] hover:bg-[#111111]"
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <div>
                        <div class="flex items-start justify-between gap-4">
                            <h3
                                class="text-lg font-semibold tracking-tight text-[#fafafa]"
                            >
                                {project.name}
                            </h3>
                            <ArrowUpRight
                                class="size-5 shrink-0 text-[#a1a1aa] transition group-hover:text-[#fafafa]"
                            />
                        </div>
                        <p
                            class="mt-3 line-clamp-3 text-sm leading-7 text-[#a1a1aa]"
                        >
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
