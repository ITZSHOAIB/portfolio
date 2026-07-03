<script lang="ts">
    import IconMark from "$lib/components/IconMark.svelte";
    import SectionHeading from "$lib/components/SectionHeading.svelte";
    import { skillIcons } from "$lib/icons/portfolioIcons";
    import type { SkillSummary } from "$lib/types/portfolio";

    let { skills }: { skills: SkillSummary } = $props();
</script>

<section
    id="skills"
    class="scroll-mt-24 border-b border-[#27272a] py-16 lg:py-18"
>
    <SectionHeading
        eyebrow="Skills"
        title="Focused stack, compact toolbox."
        description="AI systems, product platforms, backend services, delivery, testing, and blockchain work in one tighter view."
        compact
    />

    <div class="space-y-6">
        <div class="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
            {#each skills.primary as skill}
                <span
                    class="inline-flex px-3 py-2 min-w-0 items-center gap-2 rounded-md border border-[#27272a] bg-[#0a0a0a] text-sm font-medium whitespace-nowrap text-[#e4e4e7] transition hover:border-[#52525b] hover:bg-[#111111]"
                >
                    <IconMark
                        icon={skillIcons[skill]}
                        label={skill}
                        brandColor
                        class="size-4"
                    />
                    <span class="truncate">{skill}</span>
                </span>
            {/each}
        </div>

        <div class="border-t border-[#27272a] pt-5">
            <div
                class="mb-3 flex flex-wrap items-baseline justify-between gap-3"
            >
                <p
                    class="text-xs font-bold uppercase tracking-[0.14em] text-[#a1a1aa]"
                >
                    Additional skills
                </p>
                <span class="font-mono text-xs text-[#71717a]">
                    {skills.total} total
                </span>
            </div>
            <div class="flex flex-wrap gap-1.5">
                {#each skills.secondary as skill}
                    <span
                        class="inline-flex px-2.5 py-2 items-center gap-2 rounded-md border border-[#27272a] bg-[#050505] text-xs font-medium whitespace-nowrap text-[#d4d4d8]"
                    >
                        <IconMark
                            icon={skillIcons[skill]}
                            label={skill}
                            brandColor
                            class="size-3"
                        />
                        {skill}
                    </span>
                {/each}
            </div>
        </div>
    </div>
</section>
