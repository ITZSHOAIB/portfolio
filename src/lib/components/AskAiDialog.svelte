<script lang="ts">
  import { onMount } from "svelte";
  import { ArrowUpRight, Check, ChevronDown, Copy, Sparkles, X } from "@lucide/svelte";
  import { siClaude, siGooglegemini } from "simple-icons";
  import { copy as siteCopy } from "$content/copy";
  import { openAiPath } from "$lib/ai/links";

  let {
    siteUrl,
    name,
    handle,
    mcp,
  }: { siteUrl: string; name: string; handle: string; mcp: boolean } = $props();

  // Prefilled chat links. Past this length some providers truncate or reject the URL.
  const MAX_LINK_PROMPT = 6000;


  const mcpUrl = $derived(`${siteUrl}/mcp`);
  const command = $derived(`claude mcp add --transport http ${handle} ${mcpUrl}`);

  const questions = $derived(
    siteCopy.askAiQuestions.map((q) => ({ ...q, ask: q.ask.replaceAll("{name}", name) })),
  );

  // Claude and ChatGPT accept a prefilled prompt in the URL. Gemini does not,
  // so its button copies the prompt first and the visitor pastes it.
  const providers = [
    {
      name: "Claude",
      path: siClaude.path,
      color: `#${siClaude.hex}`,
      href: (q: string) => `https://claude.ai/new?q=${encodeURIComponent(q)}`,
      prefills: true,
    },
    {
      name: "ChatGPT",
      path: openAiPath,
      color: "currentColor",
      href: (q: string) => `https://chatgpt.com/?q=${encodeURIComponent(q)}`,
      prefills: true,
    },
    {
      name: "Gemini",
      path: siGooglegemini.path,
      color: `#${siGooglegemini.hex}`,
      href: () => "https://gemini.google.com/app",
      prefills: false,
    },
  ];

  let dialog: HTMLDialogElement;
  let selected = $state("summary");
  let posting = $state("");
  let copied = $state<string | null>(null);

  const question = $derived(questions.find((q) => q.id === selected) ?? questions[0]);
  const prompt = $derived(
    `Read ${siteUrl}/llms-full.txt (${name}'s portfolio) and ${question.ask}` +
      (selected === "fit" && posting.trim() ? `\n\nJob posting:\n${posting.trim()}` : ""),
  );
  const needsPosting = $derived(selected === "fit" && !posting.trim());
  const tooLongForLink = $derived(prompt.length > MAX_LINK_PROMPT);
  const isDisabled = (prefills: boolean) => needsPosting || (prefills && tooLongForLink);

  async function copy(id: string, value: string, ms = 1600) {
    try {
      await navigator.clipboard.writeText(value);
      copied = id;
      setTimeout(() => {
        if (copied === id) copied = null;
      }, ms);
    } catch {
      copied = null;
    }
  }

  // <site>/?ask opens the dialog directly, for sharing.
  onMount(() => {
    if (new URLSearchParams(location.search).has("ask")) dialog.showModal();
  });

  export function open() {
    dialog.showModal();
  }

  function closeOnBackdrop(event: MouseEvent) {
    if (event.target === dialog) dialog.close();
  }
</script>

{#snippet copyButton(id: string, value: string, label: string)}
  <button
    type="button"
    class="inline-flex size-8 shrink-0 items-center justify-center rounded-md border border-[#27272a] text-[#a1a1aa] transition hover:border-[#52525b] hover:text-[#fafafa]"
    onclick={() => copy(id, value)}
    aria-label={copied === id ? "Copied" : label}
    title={copied === id ? "Copied" : label}
  >
    {#if copied === id}
      <Check class="size-3.5 text-emerald-400" />
    {:else}
      <Copy class="size-3.5" />
    {/if}
  </button>
{/snippet}

<dialog
  bind:this={dialog}
  onclick={closeOnBackdrop}
  aria-labelledby="ask-ai-title"
  class="ask-ai-dialog m-auto max-h-[90dvh] w-[calc(100%-2rem)] max-w-xl overflow-y-auto rounded-lg border border-[#27272a] bg-[#0a0a0a] p-0 text-[#fafafa] [scrollbar-color:#27272a_transparent] [scrollbar-width:thin] backdrop:bg-black/75 backdrop:backdrop-blur-sm"
>
  <div class="p-5 sm:p-6">
    <div class="flex items-start justify-between gap-4">
      <div>
        <h2 id="ask-ai-title" class="flex items-center gap-2 text-xl font-semibold tracking-tight">
          <Sparkles class="size-4 text-[#c4b5fd]" />
          Ask AI about me
        </h2>
        <p class="mt-1 text-sm leading-6 text-[#a1a1aa]">
          Opens your assistant with my portfolio as context. Pick a question, then a tool.
        </p>
      </div>
      <button
        type="button"
        class="inline-flex size-8 shrink-0 items-center justify-center rounded-md text-[#a1a1aa] transition hover:bg-[#18181b] hover:text-[#fafafa]"
        onclick={() => dialog.close()}
        aria-label="Close"
      >
        <X class="size-4" />
      </button>
    </div>

    <fieldset class="mt-5">
      <legend class="sr-only">Question</legend>
      <div class="grid grid-cols-2 gap-1 rounded-lg border border-[#27272a] bg-[#050505] p-1 sm:grid-cols-4">
        {#each questions as q}
          <label
            class="cursor-pointer rounded-md px-2 py-2 text-center text-sm font-medium transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[#52525b] {selected ===
            q.id
              ? 'bg-[#fafafa] text-black'
              : 'text-[#a1a1aa] hover:bg-[#18181b] hover:text-[#fafafa]'}"
          >
            <input class="sr-only" type="radio" name="ask-ai-question" value={q.id} bind:group={selected} />
            {q.label}
          </label>
        {/each}
      </div>
    </fieldset>

    {#if selected === "fit"}
      <label class="mt-4 block">
        <span class="text-xs font-semibold uppercase tracking-[0.14em] text-[#a1a1aa]">
          Job posting
        </span>
        <textarea
          class="mt-2 block h-28 w-full resize-y rounded-md border border-[#27272a] bg-[#050505] p-3 text-sm leading-6 text-[#e4e4e7] placeholder:text-[#52525b] focus:border-[#52525b] focus:outline-none"
          placeholder="Paste the job description here"
          bind:value={posting}
        ></textarea>
      </label>
    {/if}

    <div class="mt-4 grid grid-cols-3 gap-2">
      {#each providers as provider}
        {@const disabled = isDisabled(provider.prefills)}
        <a
          class="inline-flex items-center justify-center gap-2 rounded-md bg-[#fafafa] px-3 py-2.5 text-sm font-bold text-black transition hover:bg-[#e4e4e7] {disabled
            ? 'pointer-events-none opacity-40'
            : ''}"
          href={provider.href(prompt)}
          target="_blank"
          rel="noopener noreferrer"
          onclick={() => {
            if (!provider.prefills) copy(provider.name, prompt, 8000);
          }}
          aria-disabled={disabled}
          tabindex={disabled ? -1 : undefined}
        >
          <svg class="size-4 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
            <path fill={provider.color} d={provider.path}></path>
          </svg>
          {provider.name}
          <ArrowUpRight class="hidden size-3.5 text-[#71717a] sm:block" />
        </a>
      {/each}
    </div>
    <p class="mt-2 min-h-4 text-xs text-[#71717a]" aria-live="polite">
      {#if needsPosting}
        Paste a job posting first.
      {:else if copied === "Gemini"}
        Prompt copied. Paste it into Gemini.
      {:else if tooLongForLink}
        Too long for a link. Copy the prompt below and paste it instead.
      {:else}
        Gemini can't be prefilled, so its button copies the prompt for you to paste.
      {/if}
    </p>

    <div class="mt-4 rounded-md border border-[#27272a] bg-[#050505] p-3">
      <p class="text-xs font-medium text-[#71717a]">Using another AI? Copy this prompt.</p>
      <div class="mt-2 flex items-start gap-3">
        <p class="min-w-0 flex-1 whitespace-pre-line text-sm leading-6 text-[#a1a1aa] [overflow-wrap:anywhere] line-clamp-4">
          {prompt}
        </p>
        {@render copyButton("prompt", prompt, "Copy prompt")}
      </div>
    </div>

    {#if mcp}
    <details class="group mt-6 border-t border-[#27272a] pt-4">
      <summary
        class="flex cursor-pointer list-none items-center justify-between text-sm font-medium text-[#d4d4d8] hover:text-[#fafafa] [&::-webkit-details-marker]:hidden"
      >
        For developers: MCP server and llms.txt
        <ChevronDown class="size-4 text-[#71717a] transition group-open:rotate-180" />
      </summary>

      <div class="mt-4 space-y-4 text-sm text-[#a1a1aa]">
        <p class="leading-6">
          This portfolio is also a read-only MCP server. Add it to Claude Code and your
          agent can search my work or compare it with a posting.
        </p>
        <div
          class="flex items-center gap-3 rounded-md border border-[#27272a] bg-[#050505] py-2 pl-3 pr-2"
        >
          <code class="min-w-0 flex-1 font-mono text-xs leading-5 text-[#e4e4e7] [overflow-wrap:anywhere]">
            <span class="mr-1.5 select-none text-[#52525b]">$</span>{command}
          </code>
          {@render copyButton("command", command, "Copy command")}
        </div>
        <p class="font-mono text-xs leading-5 text-[#71717a]">
          search_portfolio · compare_with_job_posting · get_experience · get_selected_work
          · get_projects · get_skills · get_profile · get_contact
        </p>
        <p>
          Other clients: <code class="font-mono text-xs text-[#d4d4d8]">{mcpUrl}</code> (Streamable
          HTTP). Plain text:
          <a
            class="font-medium text-[#e4e4e7] underline decoration-[#3f3f46] underline-offset-4 hover:decoration-[#a1a1aa]"
            href="/llms.txt">llms.txt</a
          >,
          <a
            class="font-medium text-[#e4e4e7] underline decoration-[#3f3f46] underline-offset-4 hover:decoration-[#a1a1aa]"
            href="/llms-full.txt">llms-full.txt</a
          >.
        </p>
      </div>
    </details>
    {/if}
  </div>
</dialog>
