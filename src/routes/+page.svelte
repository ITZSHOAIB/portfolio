<script lang="ts">
  import ExperienceSection from "$lib/components/ExperienceSection.svelte";
  import HeroSidebar from "$lib/components/HeroSidebar.svelte";
  import ProjectsSection from "$lib/components/ProjectsSection.svelte";
  import SkillsSection from "$lib/components/SkillsSection.svelte";
  import WritingSection from "$lib/components/WritingSection.svelte";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();

  const personSchema = $derived({
    "@context": "https://schema.org",
    "@type": "Person",
    name: data.profile.name,
    url: data.siteUrl,
    jobTitle: data.profile.role,
    email: data.profile.email,
    sameAs: data.profile.links
      .filter((link) => link.href.startsWith("http"))
      .map((link) => link.href),
    worksFor: {
      "@type": "Organization",
      name: data.profile.company,
    },
  });
</script>

<svelte:head>
  <title>Sohab Sk - Senior Software Engineer</title>
  <meta
    name="description"
    content="Sohab Sk is a Senior Software Engineer architecting agentic AI systems, multi-agent learning-authoring workflows, reusable agent frameworks, and maintainable web platforms."
  />
  <link rel="canonical" href={`${data.siteUrl}/`} />
  <meta property="og:title" content="Sohab Sk - Senior Software Engineer" />
  <meta
    property="og:description"
    content="Senior Software Engineer architecting agentic AI systems, multi-agent learning-authoring workflows, reusable agent frameworks, and maintainable web platforms."
  />
  <meta property="og:type" content="website" />
  <meta property="og:url" content={`${data.siteUrl}/`} />
  <meta property="og:image" content={`${data.siteUrl}/images/og-image.png`} />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="theme-color" content="#000000" />
  <script type="application/ld+json">
    {JSON.stringify(personSchema)}
  </script>
</svelte:head>

<div class="min-h-screen bg-[#000000] text-[#fafafa]">
  <header
    class="sticky top-0 z-40 border-b border-[#27272a] bg-[#000000]/88 backdrop-blur-xl lg:hidden"
  >
    <div class="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-3 px-4">
      <a class="font-semibold tracking-tight" href="#top">{data.profile.name}</a>
      <a
        class="rounded-md bg-[#fafafa] px-3 py-2 text-sm font-bold text-[#000000] transition hover:bg-[#e4e4e7]"
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
    <HeroSidebar profile={data.profile} experienceText={data.experienceText} />

    <section class="min-w-0">
      <div class="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 lg:px-10 lg:py-10 xl:px-14">
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
