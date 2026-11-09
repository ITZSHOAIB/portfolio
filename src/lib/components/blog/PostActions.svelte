<script lang="ts">
  import { Check, Copy, FileText } from "@lucide/svelte";
  import { aiTargets, chatUrl, postPrompt } from "$lib/ai/links";
  import { copyText } from "$lib/utils/clipboard";

  let { title, markdownPath, markdownUrl }: { title: string; markdownPath: string; markdownUrl: string } =
    $props();

  let copied = $state(false);
  const prompt = $derived(postPrompt({ title, markdownUrl }));

  async function copyMarkdown() {
    const response = await fetch(markdownPath);
    if (!response.ok) return;
    copied = await copyText(await response.text());
    setTimeout(() => (copied = false), 1600);
  }
</script>

<div class="post-actions" aria-label="Use this post with AI">
  <button type="button" class="post-action" onclick={copyMarkdown}>
    {#if copied}<Check class="size-3.5" /> Copied{:else}<Copy class="size-3.5" /> Copy as Markdown{/if}
  </button>
  {#each aiTargets as target}
    <a
      class="post-action"
      href={chatUrl(target.id, prompt)}
      target="_blank"
      rel="noopener noreferrer"
    >
      Open in {target.label}
    </a>
  {/each}
  <a class="post-action" href={markdownPath} title="This post as plain markdown, for agents">
    <FileText class="size-3.5" /> .md
  </a>
</div>
