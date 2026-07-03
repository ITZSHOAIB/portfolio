<script lang="ts">
    import ExperienceSection from "$lib/components/ExperienceSection.svelte";
    import HeroSidebar from "$lib/components/HeroSidebar.svelte";
    import ProjectsSection from "$lib/components/ProjectsSection.svelte";
    import SkillsSection from "$lib/components/SkillsSection.svelte";
    import WritingSection from "$lib/components/WritingSection.svelte";
    import type { PageData } from "./$types";

    let { data }: { data: PageData } = $props();

    const canonicalUrl = $derived(`${data.site.url}/`);
    const socialImageUrl = $derived(`${data.site.url}${data.site.image.path}`);
    const profileImageUrl = $derived(
        `${data.site.url}${data.site.profileImage.path}`,
    );
    const projectSchemaItems = $derived(
        data.projects.map((project, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
                "@type": project.href.includes("github.com")
                    ? "SoftwareSourceCode"
                    : "SoftwareApplication",
                name: project.name,
                description: project.description,
                url: project.href,
                programmingLanguage: project.language,
                keywords: project.topics,
                author: {
                    "@id": `${canonicalUrl}#person`,
                },
            },
        })),
    );
    const jsonLd = $derived({
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Person",
                "@id": `${canonicalUrl}#person`,
                name: data.profile.name,
                url: canonicalUrl,
                image: profileImageUrl,
                jobTitle: data.profile.role,
                email: data.profile.email,
                description: data.site.shortDescription,
                knowsAbout: [
                    ...data.skillSummary.primary,
                    "Software architecture",
                    "Agentic AI systems",
                    "Multi-agent workflows",
                ],
                sameAs: data.profile.links
                    .filter((link) => link.href.startsWith("http"))
                    .map((link) => link.href),
                worksFor: {
                    "@type": "Organization",
                    name: data.profile.company,
                },
            },
            {
                "@type": "WebSite",
                "@id": `${canonicalUrl}#website`,
                name: data.site.name,
                url: canonicalUrl,
                inLanguage: data.site.language,
                description: data.site.description,
                publisher: {
                    "@id": `${canonicalUrl}#person`,
                },
            },
            {
                "@type": "ProfilePage",
                "@id": `${canonicalUrl}#profile-page`,
                name: data.site.title,
                url: canonicalUrl,
                inLanguage: data.site.language,
                description: data.site.description,
                isPartOf: {
                    "@id": `${canonicalUrl}#website`,
                },
                primaryImageOfPage: {
                    "@type": "ImageObject",
                    url: socialImageUrl,
                    width: data.site.image.width,
                    height: data.site.image.height,
                    caption: data.site.image.alt,
                },
                mainEntity: {
                    "@id": `${canonicalUrl}#person`,
                },
            },
            {
                "@type": "ItemList",
                "@id": `${canonicalUrl}#selected-projects`,
                name: "Selected projects by Sohab Sk",
                itemListElement: projectSchemaItems,
            },
        ],
    });
    const jsonLdScript = $derived(
        `<script type="application/ld+json">${JSON.stringify(jsonLd).replaceAll(
            "<",
            "\\u003c",
        )}</` + "script>",
    );
</script>

<svelte:head>
    <title>{data.site.title}</title>
    <meta name="description" content={data.site.description} />
    <meta name="author" content={data.profile.name} />
    <meta name="keywords" content={data.site.keywords.join(", ")} />
    <meta name="robots" content="index, follow, max-image-preview:large" />
    <link rel="canonical" href={canonicalUrl} />
    <link rel="me" href={`mailto:${data.profile.email}`} />
    {#each data.profile.links.filter( (link) => link.href.startsWith("http") ) as link}
        <link rel="me" href={link.href} />
    {/each}
    <meta property="og:title" content={data.site.title} />
    <meta property="og:description" content={data.site.description} />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={canonicalUrl} />
    <meta property="og:site_name" content={data.site.name} />
    <meta property="og:locale" content={data.site.locale} />
    <meta property="og:image" content={socialImageUrl} />
    <meta property="og:image:secure_url" content={socialImageUrl} />
    <meta property="og:image:type" content={data.site.image.type} />
    <meta property="og:image:width" content={String(data.site.image.width)} />
    <meta property="og:image:height" content={String(data.site.image.height)} />
    <meta property="og:image:alt" content={data.site.image.alt} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={data.site.title} />
    <meta name="twitter:description" content={data.site.description} />
    <meta name="twitter:image" content={socialImageUrl} />
    <meta name="twitter:image:alt" content={data.site.image.alt} />
    <meta name="theme-color" content="#000000" />
    <meta name="color-scheme" content="dark" />
    {@html jsonLdScript}
</svelte:head>

<div class="min-h-screen bg-[#000000] text-[#fafafa]">
    <header
        class="sticky top-0 z-40 border-b border-[#27272a] bg-[#000000]/88 backdrop-blur-xl lg:hidden"
    >
        <div
            class="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-3 px-4"
        >
            <a class="font-semibold tracking-tight" href="#top"
                >{data.profile.name}</a
            >
            <a
                class="inline-flex px-3 py-2 items-center rounded-md bg-[#fafafa] px-2.5 text-sm! font-bold text-black transition hover:bg-[#e4e4e7]"
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
            >
                Resume
            </a>
        </div>
    </header>

    <main
        id="top"
        class="grid min-h-screen lg:grid-cols-[minmax(20rem,34vw)_minmax(0,1fr)]"
    >
        <HeroSidebar
            profile={data.profile}
            experienceText={data.experienceText}
        />

        <section class="min-w-0">
            <div
                class="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 lg:px-10 lg:py-10 xl:px-14"
            >
                <ProjectsSection projects={data.projects} />
                <ExperienceSection experience={data.experience} />
                <SkillsSection skills={data.skillSummary} />

                {#if data.writing.enabled}
                    <WritingSection posts={data.writing.posts} />
                {/if}
            </div>
        </section>
    </main>
</div>
