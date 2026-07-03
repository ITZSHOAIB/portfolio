<script lang="ts">
    import { ArrowDownToLine, Eye } from "@lucide/svelte";
    import IconMark from "$lib/components/IconMark.svelte";
    import { socialIcons } from "$lib/icons/portfolioIcons";
    import type { Profile } from "$lib/types/portfolio";

    let {
        profile,
        experienceText,
    }: {
        profile: Profile;
        experienceText: string;
    } = $props();
</script>

<aside
    class="border-b border-[#27272a] bg-[#050505] lg:sticky lg:top-0 lg:h-dvh lg:overflow-y-auto lg:border-b-0 lg:border-r"
>
    <div class="flex h-full flex-col justify-between">
        <div>
            <div
                class="hidden min-h-16 items-center justify-between border-b border-[#27272a] px-8 lg:flex xl:px-12"
            >
                <a class="font-semibold tracking-tight" href="#top"
                    >{profile.domain}</a
                >
            </div>

            <section
                class="px-4 py-12 sm:px-6 lg:px-8 lg:py-14 xl:px-12 xl:py-16"
                aria-labelledby="intro-title"
            >
                <h1
                    id="intro-title"
                    class="text-5xl font-semibold leading-[0.92] tracking-tight sm:text-6xl xl:text-7xl 2xl:text-8xl"
                >
                    {profile.name}
                </h1>
                <div
                    class="mt-7 flex items-center gap-4 border-t border-[#27272a] pt-7"
                >
                    <img
                        class="size-26 rounded-2xl object-cover"
                        src="/images/sohab-profile.jpg"
                        alt={`Portrait of ${profile.name}`}
                    />
                    <div class="min-w-0">
                        <p
                            class="flex flex-wrap items-center gap-x-2 gap-y-1 text-base font-semibold tracking-tight text-[#fafafa]"
                        >
                            <span>{profile.role}</span>
                            <span
                                class="rounded-md border border-[#27272a] px-1.5 py-0.5 text-xs text-[#d4d4d8]"
                            >
                                {experienceText} Years
                            </span>
                        </p>
                        <p class="mt-1 text-sm leading-6 text-[#a1a1aa]">
                            {profile.company}
                        </p>
                        <p class="mt-1 text-sm leading-6 text-[#a1a1aa]">
                            {profile.location}
                        </p>
                    </div>
                </div>

                <div class="mt-8 space-y-7 border-t border-[#27272a] pt-8">
                    <div>
                        <p
                            class="text-xs font-bold uppercase tracking-[0.14em] text-[#d4d4d8]"
                        >
                            Focus
                        </p>
                        <p
                            class="mt-3 text-lg font-semibold leading-7 tracking-tight text-[#fafafa] sm:text-xl"
                        >
                            {profile.focus}
                        </p>
                    </div>
                    <div class="border-t border-[#27272a] pt-6">
                        <p
                            class="text-xs font-bold uppercase tracking-[0.14em] text-[#a1a1aa]"
                        >
                            Background
                        </p>
                        <div
                            class="mt-3 space-y-3 text-sm leading-7 text-[#a1a1aa]"
                        >
                            <p>{profile.current}</p>
                            <p>{profile.previous}</p>
                        </div>
                    </div>
                </div>

                <div
                    class="mt-9 flex flex-wrap gap-2 sm:mt-10 sm:gap-2.5 xl:gap-3"
                >
                    <a
                        class="inline-flex items-center gap-2 rounded-md bg-[#fafafa] px-3 py-2.5 text-sm! font-bold text-[#000000] transition hover:bg-[#e4e4e7]"
                        href="/resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Eye class="size-4" />
                        View resume
                    </a>
                    <a
                        class="inline-flex items-center gap-2 rounded-md border border-[#27272a] px-3 py-2.5 text-sm! font-bold text-[#e4e4e7] transition hover:border-[#52525b] hover:bg-[#0a0a0a]"
                        href="/resume.pdf"
                        download
                    >
                        <ArrowDownToLine class="size-4" />
                        Download
                    </a>
                </div>

                <div
                    class="mt-6 flex flex-wrap gap-1.5 border-t border-[#27272a] pt-6 sm:gap-2"
                >
                    {#each profile.links as link}
                        <a
                            class="inline-flex px-2.5 py-1.5 max-w-full min-w-0 items-center gap-1.5 rounded-md border border-[#27272a] bg-[#0a0a0a] text-sm! font-medium text-[#e4e4e7] transition hover:border-[#52525b] hover:bg-[#111111]"
                            href={link.href}
                            target={link.href.startsWith("http")
                                ? "_blank"
                                : undefined}
                            rel={link.href.startsWith("http")
                                ? "me noopener noreferrer"
                                : undefined}
                            aria-label={link.label}
                        >
                            <IconMark
                                icon={socialIcons[link.label]}
                                label={link.label}
                                fallback={link.label === "LinkedIn"
                                    ? "in"
                                    : undefined}
                                fallbackColor={link.label === "LinkedIn"
                                    ? "#0A66C2"
                                    : undefined}
                                brandColor={link.label !== "LinkedIn"}
                                class="size-3.5"
                            />
                            <span class="truncate">{link.username}</span>
                        </a>
                    {/each}
                </div>
            </section>
        </div>
    </div>
</aside>
