<script lang="ts">
  import { Check, Copy } from "@lucide/svelte";
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

<div class="post-actions" aria-label="Read this post with AI">
  <span class="post-actions-label">Read with</span>
  {#each aiTargets as target}
    <a
      class="post-action"
      href={chatUrl(target.id, prompt)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open in ${target.label}`}
    >
      <svg viewBox="0 0 24 24" class="size-3.5" aria-hidden="true"><path fill="currentColor" d={target.path} /></svg>
      {target.label}
    </a>
  {/each}
  <button type="button" class="post-action" onclick={copyMarkdown} title="Copy this post as markdown">
    {#if copied}<Check class="size-3.5" /> Copied{:else}<Copy class="size-3.5" /> Markdown{/if}
  </button>
</div>
