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
    const sameAsLinks = $derived(
        data.profile.links
            .filter((link) => link.href.startsWith("http"))
            .map((link) => link.href),
    );
    const allSkills = $derived([
        ...data.skillSummary.primary,
        ...data.skillSummary.secondary,
    ]);
    const latestProjectDate = $derived(
        data.projects
            .map((project) => project.updated)
            .filter((updated) => /^\d{4}-\d{2}-\d{2}$/.test(updated))
            .sort()
            .at(-1) ?? data.site.modifiedDate,
    );
    const dateModified = $derived(
        latestProjectDate > data.site.modifiedDate
            ? latestProjectDate
            : data.site.modifiedDate,
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
                ...(project.href.includes("github.com")
                    ? { codeRepository: project.href }
                    : { applicationCategory: "DeveloperApplication" }),
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
                givenName: "Sohab",
                familyName: "Sk",
                url: canonicalUrl,
                image: {
                    "@type": "ImageObject",
                    "@id": `${canonicalUrl}#profile-image`,
                    url: profileImageUrl,
                    width: data.site.profileImage.width,
                    height: data.site.profileImage.height,
                    caption: data.site.profileImage.alt,
                },
                jobTitle: data.profile.role,
                email: data.profile.email,
                description: data.site.shortDescription,
                knowsAbout: allSkills,
                sameAs: sameAsLinks,
                knowsLanguage: ["en"],
                hasOccupation: {
                    "@type": "Occupation",
                    name: data.profile.role,
                    skills: allSkills.join(", "),
                    occupationLocation: {
                        "@type": "Country",
                        name: "India",
                    },
                },
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
                image: socialImageUrl,
                publisher: {
                    "@id": `${canonicalUrl}#person`,
                },
            },
            {
                "@type": ["WebPage", "ProfilePage"],
                "@id": `${canonicalUrl}#profile-page`,
                name: data.site.title,
                url: canonicalUrl,
                inLanguage: data.site.language,
                description: data.site.description,
                datePublished: data.site.publishedDate,
                dateModified,
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
                breadcrumb: {
                    "@id": `${canonicalUrl}#breadcrumb`,
                },
            },
            {
                "@type": "BreadcrumbList",
                "@id": `${canonicalUrl}#breadcrumb`,
                itemListElement: [
                    {
                        "@type": "ListItem",
                        position: 1,
                        name: data.profile.name,
                        item: canonicalUrl,
                    },
                ],
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
    <meta name="googlebot" content="index, follow, max-image-preview:large" />
    <meta name="referrer" content="strict-origin-when-cross-origin" />
    <meta name="application-name" content={data.site.name} />
    <meta name="apple-mobile-web-app-title" content={data.site.name} />
    <meta name="format-detection" content="telephone=no" />
    <link rel="canonical" href={canonicalUrl} />
    <link
        rel="icon"
        type={data.site.profileImage.type}
        href={data.site.profileImage.path}
    />
    <link rel="apple-touch-icon" href={data.site.profileImage.path} />
    <link rel="manifest" href="/site.webmanifest" />
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
    <meta property="og:updated_time" content={dateModified} />
    <meta property="og:image" content={socialImageUrl} />
    <meta property="og:image:secure_url" content={socialImageUrl} />
    <meta property="og:image:type" content={data.site.image.type} />
    <meta property="og:image:width" content={String(data.site.image.width)} />
    <meta property="og:image:height" content={String(data.site.image.height)} />
    <meta property="og:image:alt" content={data.site.image.alt} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content={data.site.twitterHandle} />
    <meta name="twitter:creator" content={data.site.twitterHandle} />
    <meta name="twitter:title" content={data.site.title} />
    <meta name="twitter:description" content={data.site.description} />
    <meta name="twitter:image" content={socialImageUrl} />
    <meta name="twitter:image:alt" content={data.site.image.alt} />
    <meta name="twitter:image:width" content={String(data.site.image.width)} />
    <meta name="twitter:image:height" content={String(data.site.image.height)} />
    <meta name="theme-color" content={data.site.themeColor} />
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
                rel="noopener noreferrer"
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
