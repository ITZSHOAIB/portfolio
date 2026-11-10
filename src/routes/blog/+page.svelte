<script lang="ts">
  import { onMount } from "svelte";
  import BlogFilters from "$lib/components/blog/BlogFilters.svelte";
  import BlogShell from "$lib/components/blog/BlogShell.svelte";
  import FeedLinks from "$lib/components/blog/FeedLinks.svelte";
  import FeaturedPost from "$lib/components/blog/FeaturedPost.svelte";
  import PostCard from "$lib/components/blog/PostCard.svelte";
  import Seo from "$lib/components/blog/Seo.svelte";
  import {
    allProjects,
    emptyFilter,
    filterPosts,
    groupByYear,
    isFiltering,
    type PostFilter,
  } from "$lib/content/blog-filter";
  import { copy } from "$content/copy";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();

  const description = $derived(`${copy.blogDescription} by ${data.site.name}.`);
  const jsonLd = $derived({
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${data.site.name}: blog`,
    description,
    url: `${data.site.url}/blog`,
    author: { "@type": "Person", name: data.site.name, url: data.site.url },
    blogPost: data.posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: `${data.site.url}/blog/${post.slug}`,
      datePublished: post.published,
    })),
  });

  // The page is prerendered with every post and plain topic links. Once hydrated, the
  // links become filter chips and the filter state mirrors into ?q=&tag=&project=.
  let ready = $state(false);
  let filter = $state<PostFilter>({ ...emptyFilter });

  const projects = $derived(allProjects(data.posts));
  const filtering = $derived(isFiltering(filter));
  const matches = $derived(filterPosts(data.posts, filter));
  const featured = $derived(!filtering && data.posts.length > 1 ? data.posts[0] : undefined);
  const groups = $derived(groupByYear(featured ? data.posts.slice(1) : matches));

  onMount(() => {
    const params = new URLSearchParams(location.search);
    filter = {
      q: params.get("q") ?? "",
      tag: data.tags.some((t) => t.slug === params.get("tag")) ? params.get("tag")! : "",
      project: projects.includes(params.get("project") ?? "") ? params.get("project")! : "",
    };
    ready = true;
  });

  $effect(() => {
    if (!ready) return;
    const params = new URLSearchParams();
    if (filter.q.trim()) params.set("q", filter.q.trim());
    if (filter.tag) params.set("tag", filter.tag);
    if (filter.project) params.set("project", filter.project);
    const query = params.toString();
    history.replaceState(history.state, "", query ? `?${query}` : location.pathname);
  });
</script>

<Seo
  title="Blog"
  {description}
  path="/blog"
  noindex={data.posts.length === 0}
  {jsonLd}
/>

<BlogShell page="blog" width="max-w-4xl">
  <section class="blog-reveal">
    <h1 class="blog-title text-3xl font-semibold tracking-tight sm:text-5xl">Blog</h1>
    <p class="mt-4 max-w-3xl text-lg leading-8 text-[#a1a1aa]">{description}</p>
    <FeedLinks origin={data.site.url} />

    {#if ready && data.posts.length > 1}
      <BlogFilters bind:filter tags={data.tags} {projects} shown={matches.length} total={data.posts.length} />
    {:else if data.tags.length}
      <ul class="mt-6 flex flex-wrap gap-2" aria-label="Topics">
        {#each data.tags as { tag, slug, count }}
          <li>
            <a
              class="rounded-md border border-[#27272a] bg-[#111111] px-2.5 py-1 text-xs font-semibold text-[#d4d4d8] transition hover:border-[#52525b]"
              href={`/tags/${slug}`}>{tag} <span class="text-[#8a8a93]">{count}</span></a
            >
          </li>
        {/each}
      </ul>
    {/if}

    <div class="mt-10 grid gap-10">
      {#if featured}
        <FeaturedPost post={featured} />
      {/if}
      {#each groups as group}
        <section aria-labelledby={`year-${group.year}`}>
          <h2 id={`year-${group.year}`} class="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-[#8a8a93]">
            {group.year}
          </h2>
          <div class="grid gap-4 md:grid-cols-2">
            {#each group.posts as post}
              <PostCard {post} level={3} stacked />
            {/each}
          </div>
        </section>
      {:else}
        <div class="rounded-lg border border-[#27272a] bg-[#0a0a0a] p-6 text-[#a1a1aa]">
          {#if filtering}
            No posts match.
            <button type="button" class="font-medium text-[#7dd3fc] underline underline-offset-4" onclick={() => (filter = { ...emptyFilter })}>Clear the filters</button>
          {:else}
            No posts yet.
          {/if}
        </div>
      {/each}
    </div>
  </section>
</BlogShell>
