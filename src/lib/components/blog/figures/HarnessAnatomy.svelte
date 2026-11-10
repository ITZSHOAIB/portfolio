<script lang="ts">
  import { Activity, FileText, Server, Webhook, Workflow, Wrench } from "@lucide/svelte";

  // The parts list comes from LangChain's "Anatomy of an Agent Harness";
  // observability is Addy Osmani's addition. The "why" lines are my own framing.
  const parts = [
    {
      id: "instructions",
      icon: FileText,
      label: "Instructions",
      examples: "System prompts, AGENTS.md, CLAUDE.md, skill files",
      why: "Tell the agent what to do and how this codebase works.",
      source: "LangChain",
    },
    {
      id: "tools",
      icon: Wrench,
      label: "Tools",
      examples: "Tools, skills, MCP servers, and their descriptions",
      why: "What the agent can act with. Tool descriptions are text the model reads, so they steer it too.",
      source: "LangChain",
    },
    {
      id: "infrastructure",
      icon: Server,
      label: "Infrastructure",
      examples: "Filesystem, sandbox, browser",
      why: "Where work happens, and where it survives beyond one context window.",
      source: "LangChain",
    },
    {
      id: "orchestration",
      icon: Workflow,
      label: "Orchestration",
      examples: "Subagent spawning, handoffs, model routing",
      why: "How work is split across agents and models.",
      source: "LangChain",
    },
    {
      id: "hooks",
      icon: Webhook,
      label: "Hooks",
      examples: "Compaction, continuation, lint checks",
      why: "Deterministic steps that run whether or not the model remembers them.",
      source: "LangChain",
    },
    {
      id: "observability",
      icon: Activity,
      label: "Observability",
      examples: "Logs, traces, cost and latency metering",
      why: "How you find out which part of the harness failed.",
      source: "Addy Osmani",
    },
  ];

  let selected = $state("instructions");
  const part = $derived(parts.find((p) => p.id === selected) ?? parts[0]);
</script>

{#snippet partButton(p: (typeof parts)[number], row: "top" | "bottom")}
  <button
    type="button"
    class={`anatomy-part anatomy-part-${row}`}
    aria-pressed={selected === p.id}
    onclick={() => (selected = p.id)}
    onmouseenter={() => (selected = p.id)}
  >
    <p.icon class="size-4" aria-hidden="true" />
    <span>{p.label}</span>
  </button>
{/snippet}

<div class="anatomy">
  <div class="anatomy-frame">
    <span class="anatomy-frame-label">Harness</span>
    <div class="anatomy-row">
      {#each parts.slice(0, 3) as p}{@render partButton(p, "top")}{/each}
    </div>
    <div class="anatomy-core">
      <span class="anatomy-core-glow" aria-hidden="true"></span>
      <span class="relative">Model</span>
    </div>
    <div class="anatomy-row">
      {#each parts.slice(3) as p}{@render partButton(p, "bottom")}{/each}
    </div>
  </div>

  <div class="anatomy-detail" aria-live="polite">
    {#key part.id}
      <div class="anatomy-detail-body">
        <p class="flex items-center gap-2 text-base font-semibold text-[#fafafa]">
          <part.icon class="size-4 text-[#7dd3fc]" aria-hidden="true" />{part.label}
        </p>
        <p class="mt-1 text-sm leading-6 text-[#a1a1aa]">{part.why}</p>
        <p class="mt-1 text-sm leading-6 text-[#71717a]">{part.examples} · via {part.source}</p>
      </div>
    {/key}
  </div>
</div>

<style>
  .anatomy-frame {
    position: relative;
    display: grid;
    gap: 1.25rem;
    border: 1px dashed #3f3f46;
    border-radius: 0.875rem;
    padding: 1.75rem 0.75rem 1rem;
    background: radial-gradient(18rem 9rem at 50% 50%, rgba(125, 211, 252, 0.06), transparent 70%);
  }
  .anatomy-frame-label {
    position: absolute;
    top: 0.5rem;
    left: 0.75rem;
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #71717a;
  }
  .anatomy-row {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0.5rem;
  }
  .anatomy-part {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.35rem;
    cursor: pointer;
    border: 1px solid #27272a;
    border-radius: 0.5rem;
    background: #0a0a0a;
    padding: 0.65rem 0.25rem;
    font-size: 0.8rem;
    font-weight: 600;
    line-height: 1.2;
    color: #d4d4d8;
    transition: border-color 150ms, background-color 150ms, color 150ms, transform 150ms;
  }
  .anatomy-part:hover { border-color: #52525b; }
  .anatomy-part[aria-pressed="true"] {
    border-color: #7dd3fc;
    background: rgba(125, 211, 252, 0.08);
    color: #fafafa;
    transform: translateY(-1px);
  }
  /* Short connectors from each part toward the model. */
  .anatomy-part::after {
    content: "";
    position: absolute;
    left: 50%;
    width: 1px;
    height: 1.25rem;
    background: linear-gradient(#3f3f46, transparent);
    transition: background 150ms;
  }
  .anatomy-part-top::after { top: 100%; }
  .anatomy-part-bottom::after { bottom: 100%; transform: rotate(180deg); }
  .anatomy-part[aria-pressed="true"]::after { background: linear-gradient(#7dd3fc, transparent); }
  /* A pulse runs from the selected part into the model. */
  .anatomy-part::before {
    content: "";
    position: absolute;
    left: calc(50% - 2px);
    width: 5px;
    height: 5px;
    border-radius: 999px;
    background: #7dd3fc;
    box-shadow: 0 0 8px #7dd3fc;
    opacity: 0;
  }
  .anatomy-part-top::before { top: 100%; }
  .anatomy-part-bottom::before { bottom: 100%; }
  .anatomy-part-top[aria-pressed="true"]::before { animation: pulse-down 1.6s ease-in infinite; }
  .anatomy-part-bottom[aria-pressed="true"]::before { animation: pulse-up 1.6s ease-in infinite; }
  @keyframes pulse-down {
    0% { opacity: 0; transform: translateY(0); }
    20% { opacity: 1; }
    100% { opacity: 0; transform: translateY(1.2rem); }
  }
  @keyframes pulse-up {
    0% { opacity: 0; transform: translateY(0); }
    20% { opacity: 1; }
    100% { opacity: 0; transform: translateY(-1.2rem); }
  }
  .anatomy-detail-body { animation: detail-in 220ms ease-out; }
  @keyframes detail-in {
    from { opacity: 0; transform: translateY(4px); }
    to { opacity: 1; transform: none; }
  }
  .anatomy-core {
    position: relative;
    justify-self: center;
    display: grid;
    place-items: center;
    width: min(12rem, 60%);
    border: 1px solid #52525b;
    border-radius: 999px;
    background: #111111;
    padding: 0.7rem 1rem;
    font-weight: 700;
    color: #fafafa;
  }
  .anatomy-core-glow {
    position: absolute;
    inset: -1px;
    border-radius: inherit;
    box-shadow: 0 0 0 0 rgba(250, 250, 250, 0.18);
    animation: core-pulse 3s ease-in-out infinite;
  }
  @keyframes core-pulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(250, 250, 250, 0.14); }
    50% { box-shadow: 0 0 0 10px rgba(250, 250, 250, 0); }
  }
  .anatomy-detail {
    margin-top: 1rem;
    min-height: 6.5rem;
    border-top: 1px solid #27272a;
    padding-top: 1rem;
  }
  @media (prefers-reduced-motion: reduce) {
    .anatomy-core-glow,
    .anatomy-part::before,
    .anatomy-detail-body { animation: none !important; }
    .anatomy-part { transition: none; }
  }
</style>
