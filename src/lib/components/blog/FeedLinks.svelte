<script lang="ts">
  import { Check, Copy, Rss } from "@lucide/svelte";
  import { onMount } from "svelte";

  let { origin }: { origin: string } = $props();

  // The links work without JavaScript; the copy button needs the clipboard API, so it
  // only appears once hydrated and only where that API exists.
  let canCopy = $state(false);
  let copied = $state(false);
  let timer: ReturnType<typeof setTimeout> | undefined;

  onMount(() => {
    canCopy = Boolean(navigator.clipboard?.writeText);
    return () => clearTimeout(timer);
  });

  async function copy() {
    try {
      await navigator.clipboard.writeText(`${origin}/rss.xml`);
    } catch {
      return;
    }
    copied = true;
    clearTimeout(timer);
    timer = setTimeout(() => (copied = false), 2000);
  }

  const link = "font-medium text-[#d4d4d8] transition hover:text-[#fafafa]";
</script>

<p class="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[#a1a1aa]">
  <a class={`inline-flex items-center gap-1.5 ${link}`} href="/rss.xml">
    <Rss class="size-3.5" aria-hidden="true" /> RSS feed
  </a>
  {#if canCopy}
    <button type="button" class={`inline-flex items-center gap-1.5 ${link}`} onclick={copy}>
      {#if copied}
        <Check class="size-3.5 text-accent" aria-hidden="true" /> Copied
      {:else}
        <Copy class="size-3.5" aria-hidden="true" /> Copy feed URL
      {/if}
    </button>
    <span class="sr-only" aria-live="polite">{copied ? "Feed URL copied" : ""}</span>
  {/if}
  <a class={link} href="/feed.json">JSON Feed</a>
</p>
