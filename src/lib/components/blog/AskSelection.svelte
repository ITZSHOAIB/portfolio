<script lang="ts">
  import { Check, Copy, Sparkles } from "@lucide/svelte";
  import { onMount } from "svelte";
  import { aiTargets, chatUrl, selectionPrompt } from "$lib/ai/links";
  import { copyText } from "$lib/utils/clipboard";

  // Select any passage in the post to ask an AI about it. The prompt carries
  // the passage, the post title and its URL.
  let {
    root,
    post,
  }: { root: HTMLElement | undefined; post: { title: string; url: string } } = $props();

  // Selecting inside these is interaction with the widget, not reading.
  const IGNORE = ".prompt-box, .blog-figure, .post-actions";

  let text = $state("");
  let position = $state<{ top: number; left: number } | null>(null);
  let placeBelow = $state(false);
  let copied = $state(false);
  const prompt = $derived(text ? selectionPrompt(post, text) : "");

  function update() {
    const selection = window.getSelection();
    if (!root || !selection || selection.isCollapsed || !selection.rangeCount) {
      position = null;
      return;
    }
    const range = selection.getRangeAt(0);
    const node = range.commonAncestorContainer;
    const element = node instanceof Element ? node : node.parentElement;
    const selected = selection.toString().trim();
    if (!element || !root.contains(element) || element.closest(IGNORE) || selected.length < 3) {
      position = null;
      return;
    }

    text = selected;
    const rect = range.getBoundingClientRect();
    // Touch browsers draw their own menu above the selection, so go below it.
    const below = window.matchMedia("(pointer: coarse)").matches || rect.top < 72;
    position = {
      top: below ? rect.bottom + 10 : rect.top - 10,
      left: Math.min(Math.max(rect.left + rect.width / 2, 120), window.innerWidth - 120),
    };
    placeBelow = below;
  }

  let frame = 0;
  const schedule = () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(update);
  };

  onMount(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") position = null;
    };
    document.addEventListener("selectionchange", schedule);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    document.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("selectionchange", schedule);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      document.removeEventListener("keydown", onKey);
    };
  });

  async function copyPrompt() {
    copied = await copyText(prompt);
    setTimeout(() => (copied = false), 1600);
  }
</script>

{#if position}
  <div
    class="ask-selection"
    class:ask-selection-below={placeBelow}
    style={`top: ${position.top}px; left: ${position.left}px`}
    role="group"
    aria-label="Ask an AI about the selected text"
    tabindex="-1"
    onpointerdown={(event) => event.preventDefault()}
  >
    <span class="ask-selection-label"><Sparkles class="size-3.5" aria-hidden="true" /> Ask</span>
    {#each aiTargets as target}
      <a href={chatUrl(target.id, prompt)} target="_blank" rel="noopener noreferrer">
        <svg viewBox="0 0 24 24" class="size-3.5" aria-hidden="true"><path fill="currentColor" d={target.path} /></svg>
        {target.label}
      </a>
    {/each}
    <button type="button" onclick={copyPrompt} aria-label="Copy as a prompt">
      {#if copied}<Check class="size-3.5" />{:else}<Copy class="size-3.5" />{/if}
    </button>
  </div>
{/if}
