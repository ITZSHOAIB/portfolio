<script lang="ts">
  import BlogShell from "$lib/components/blog/BlogShell.svelte";
  import PostCard from "$lib/components/blog/PostCard.svelte";
  import Seo from "$lib/components/blog/Seo.svelte";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();

  const description = $derived(
    `${data.posts.length} ${data.posts.length === 1 ? "post" : "posts"} tagged ${data.tag} by ${data.site.name}.`,
  );
</script>

<Seo
  title={`${data.tag} posts`}
  {description}
  path={`/tags/${data.slug}`}
  noindex={data.posts.length < 2}
/>

<BlogShell>
  <section class="blog-reveal">
    <p class="text-sm font-semibold uppercase tracking-[0.14em] text-[#a1a1aa]">
      <a class="transition hover:text-[#fafafa]" href="/blog">Blog</a> / Tag
    </p>
    <h1 class="blog-title mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">
      {data.tag}
    </h1>
    <p class="mt-4 text-lg leading-8 text-[#a1a1aa]">{description}</p>

    <div class="mt-10 grid gap-4">
      {#each data.posts as post}
        <PostCard {post} />
      {/each}
    </div>
  </section>
</BlogShell>
