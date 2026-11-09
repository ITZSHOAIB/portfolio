<script lang="ts">
  import BlogShell from "$lib/components/blog/BlogShell.svelte";
  import PostCard from "$lib/components/blog/PostCard.svelte";
  import Seo from "$lib/components/blog/Seo.svelte";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();

  const description = $derived(`Notes on AI agents, multi-agent workflows, and scalable software systems by ${data.site.name}.`);
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
</script>

<Seo
  title={`Blog | ${data.site.name}`}
  {description}
  path="/blog"
  noindex={data.posts.length === 0}
  {jsonLd}
/>

<BlogShell>
  <section class="blog-reveal">
    <h1 class="blog-title text-3xl font-semibold tracking-tight sm:text-5xl">Blog</h1>
    <p class="mt-4 text-lg leading-8 text-[#a1a1aa]">{description}</p>

    {#if data.tags.length}
      <ul class="mt-6 flex flex-wrap gap-2" aria-label="Topics">
        {#each data.tags as { tag, slug, count }}
          <li>
            <a
              class="rounded-md border border-[#27272a] bg-[#111111] px-2.5 py-1 text-xs font-semibold text-[#d4d4d8] transition hover:border-[#52525b]"
              href={`/tags/${slug}`}>{tag} <span class="text-[#71717a]">{count}</span></a
            >
          </li>
        {/each}
      </ul>
    {/if}

    <div class="mt-10 grid gap-4">
      {#each data.posts as post}
        <PostCard {post} />
      {:else}
        <p class="text-[#a1a1aa]">No posts yet.</p>
      {/each}
    </div>
  </section>
</BlogShell>
