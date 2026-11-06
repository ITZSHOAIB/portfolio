<script lang="ts">
  import { ArrowUpRight, Check, Copy } from "@lucide/svelte";
  import SectionHeading from "$lib/components/SectionHeading.svelte";

  let { siteUrl }: { siteUrl: string } = $props();

  const mcpUrl = $derived(`${siteUrl}/mcp`);
  const command = $derived(`claude mcp add --transport http sohab ${mcpUrl}`);
  const config = $derived(
    JSON.stringify({ mcpServers: { sohab: { type: "http", url: mcpUrl } } }, null, 2),
  );

  const tools = [
    { name: "search_portfolio", note: "keyword search across everything" },
    { name: "compare_with_job_posting", note: "overlap between a posting and my stack" },
    { name: "get_experience", note: "roles, dates, highlights" },
    { name: "get_selected_work", note: "shipped AI products and scale" },
    { name: "get_projects", note: "open source and side projects" },
    { name: "get_skills · get_profile · get_contact", note: "the rest" },
  ];

  const prompts = [
    "What has Sohab shipped with LangGraph, and at what scale?",
    "Compare Sohab's experience with this job posting: …",
    "Summarize Sohab's open-source work in three bullets.",
  ];

  let copied = $state<string | null>(null);

  async function copy(id: string, value: string) {
    try {
      await navigator.clipboard.writeText(value);
      copied = id;
      setTimeout(() => {
        if (copied === id) copied = null;
      }, 1600);
    } catch {
      copied = null;
    }
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

<section
  id="agents"
  class="scroll-mt-24 border-b border-[#27272a] py-16 lg:py-18"
>
  <SectionHeading
    eyebrow="For your agent"
    title="Ask your AI agent about me."
    description="This portfolio is also an MCP server. Connect it to Claude Code or any MCP client, and your agent can read my experience, search my work, or compare it with a job posting. Same data as this page, read-only."
  />

  <div
    class="grid overflow-hidden rounded-lg border border-[#27272a] bg-[#0a0a0a] lg:grid-cols-[minmax(0,1fr)_17rem]"
  >
    <div class="flex min-w-0 flex-col gap-6 p-5 sm:p-7">
      <div>
        <p class="text-xs font-semibold uppercase tracking-[0.14em] text-[#a1a1aa]">
          Claude Code
        </p>
        <div
          class="mt-3 flex items-center gap-3 rounded-md border border-[#27272a] bg-[#050505] py-2 pl-4 pr-2"
        >
          <code class="min-w-0 flex-1 font-mono text-sm leading-6 text-[#e4e4e7] [overflow-wrap:anywhere]">
            <span class="mr-2 select-none text-[#52525b]">$</span>{command}
          </code>
          {@render copyButton("command", command, "Copy command")}
        </div>
      </div>

      <div>
        <p class="text-xs font-semibold uppercase tracking-[0.14em] text-[#a1a1aa]">
          Other MCP clients
        </p>
        <div
          class="mt-3 flex items-start gap-3 rounded-md border border-[#27272a] bg-[#050505] py-2 pl-4 pr-2"
        >
          <pre
            class="min-w-0 flex-1 overflow-x-auto py-1 [scrollbar-color:#27272a_transparent] [scrollbar-width:thin] font-mono text-xs leading-5 text-[#d4d4d8]">{config}</pre>
          {@render copyButton("config", config, "Copy config")}
        </div>
      </div>

      <div>
        <p class="text-xs font-semibold uppercase tracking-[0.14em] text-[#a1a1aa]">
          Then ask
        </p>
        <ul class="mt-3 space-y-2 text-sm leading-6 text-[#d4d4d8]">
          {#each prompts as prompt}
            <li class="flex gap-2">
              <span class="text-[#52525b]" aria-hidden="true">›</span>
              <span>{prompt}</span>
            </li>
          {/each}
        </ul>
      </div>

      <p class="mt-auto text-sm text-[#a1a1aa]">
        No MCP client? Point any LLM at
        <a
          class="inline-flex items-center gap-1 font-medium text-[#e4e4e7] underline decoration-[#3f3f46] underline-offset-4 transition hover:decoration-[#a1a1aa]"
          href="/llms.txt"
        >
          llms.txt<ArrowUpRight class="size-3.5 text-[#71717a]" />
        </a>
        or
        <a
          class="inline-flex items-center gap-1 font-medium text-[#e4e4e7] underline decoration-[#3f3f46] underline-offset-4 transition hover:decoration-[#a1a1aa]"
          href="/llms-full.txt"
        >
          llms-full.txt<ArrowUpRight class="size-3.5 text-[#71717a]" />
        </a>
      </p>
    </div>

    <div class="border-t border-[#27272a] bg-[#0d0d0d] p-5 sm:p-6 lg:border-t-0 lg:border-l">
      <p class="text-xs font-semibold uppercase tracking-[0.14em] text-[#a1a1aa]">
        Tools
      </p>
      <ul class="mt-4 space-y-4">
        {#each tools as tool}
          <li>
            <p class="break-words font-mono text-xs text-[#fafafa]">{tool.name}</p>
            <p class="mt-0.5 text-xs leading-5 text-[#71717a]">{tool.note}</p>
          </li>
        {/each}
      </ul>
    </div>
  </div>
</section>
