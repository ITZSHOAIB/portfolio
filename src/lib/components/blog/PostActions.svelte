<script lang="ts">
  import { Check, Copy } from "@lucide/svelte";
  import { aiTargets, chatUrl, postPrompt } from "$lib/ai/links";
  import { copyText } from "$lib/utils/clipboard";

  let { title, markdownPath, markdownUrl }: { title: string; markdownPath: string; markdownUrl: string } =
    $props();

  let copied = $state(false);
  let failed = $state(false);
  const prompt = $derived(postPrompt({ title, markdownUrl }));

  async function copyMarkdown() {
    failed = false;
    try {
      const response = await fetch(markdownPath);
      copied = response.ok && (await copyText(await response.text()));
      failed = !copied;
    } catch {
      failed = true;
    }
    setTimeout(() => (copied = failed = false), 2000);
  }
</script>

<div class="post-actions" role="group" aria-label="Read this post with AI">
  <span class="post-actions-label" aria-hidden="true">Read with</span>
  {#each aiTargets as target}
    <a
      class="post-action"
      href={chatUrl(target.id, prompt)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open post in ${target.label} (new tab)`}
    >
      <svg viewBox="0 0 24 24" class="size-3.5" aria-hidden="true"><path fill="currentColor" d={target.path} /></svg>
      {target.label}
    </a>
  {/each}
  <button type="button" class="post-action" onclick={copyMarkdown} aria-label="Copy this post as markdown">
    {#if copied}<Check class="size-3.5" aria-hidden="true" /> Copied{:else if failed}Copy failed{:else}<Copy class="size-3.5" aria-hidden="true" /> Markdown{/if}
  </button>
  <span class="sr-only" role="status">{copied ? "Post copied as markdown" : failed ? "Could not copy" : ""}</span>
</div>
