<script lang="ts">
  // The grid follows Birgitta Böckeler's "Harness engineering for coding agent
  // users". The example mistakes and their mapping are my own illustration.
  type Cell = "guide-computational" | "sensor-computational" | "guide-inferential" | "sensor-inferential";

  const rows = [
    { id: "computational", label: "Computational", note: "Deterministic and fast" },
    { id: "inferential", label: "Inferential", note: "Semantic, slower, less predictable" },
  ] as const;
  const columns = [
    { id: "guide", label: "Guide", note: "Before the agent acts" },
    { id: "sensor", label: "Sensor", note: "After it acts" },
  ] as const;

  const examples: Record<Cell, string[]> = {
    "guide-computational": ["Code mods", "Bootstrap scripts"],
    "sensor-computational": ["Linters", "Structural tests", "Type checks"],
    "guide-inferential": ["AGENTS.md", "Skills"],
    "sensor-inferential": ["AI code review", "LLM as judge"],
  };

  const mistakes: { id: string; label: string; cells: Cell[]; fix: string }[] = [
    {
      id: "command",
      label: "Runs the wrong test command",
      cells: ["guide-inferential", "guide-computational"],
      fix: "Put the right command in AGENTS.md. If it is fiddly, wrap it in a script and name the script there.",
    },
    {
      id: "boundary",
      label: "Imports across a module boundary",
      cells: ["sensor-computational"],
      fix: "A structural test fails the build, and its message says which import to move. Cheap enough to run on every change.",
    },
    {
      id: "style",
      label: "Drifts from team conventions",
      cells: ["guide-inferential", "sensor-computational"],
      fix: "Write the convention down for the agent, then enforce what you can with a linter. The rule steers; the linter proves it held.",
    },
    {
      id: "intent",
      label: "Solves the wrong problem",
      cells: ["sensor-inferential"],
      fix: "Only partly catchable. An AI reviewer can compare the change with the spec, but no sensor reliably catches a misunderstood instruction. This is where human review still goes.",
    },
  ];

  let selected = $state(mistakes[0].id);
  const mistake = $derived(mistakes.find((m) => m.id === selected) ?? mistakes[0]);
  const lit = (cell: Cell) => mistake.cells.includes(cell);
</script>

<div class="gs">
  <div class="gs-timeline" aria-hidden="true">
    <span class="gs-stage gs-stage-guide">Guide</span>
    <span class="gs-track"><span class="gs-dot"></span></span>
    <span class="gs-stage">Agent acts</span>
    <span class="gs-track"><span class="gs-dot gs-dot-late"></span></span>
    <span class="gs-stage gs-stage-sensor">Sensor</span>
  </div>

  <fieldset class="mt-5">
    <legend class="text-xs font-bold uppercase tracking-[0.14em] text-[#71717a]">
      Pick a mistake
    </legend>
    <div class="mt-2 flex flex-wrap gap-2">
      {#each mistakes as m}
        <button
          type="button"
          class="gs-chip"
          aria-pressed={selected === m.id}
          onclick={() => (selected = m.id)}
        >
          {m.label}
        </button>
      {/each}
    </div>
  </fieldset>

  <div class="gs-grid mt-5" role="table" aria-label="Guides and sensors">
    <span role="presentation"></span>
    {#each columns as column}
      <div class="gs-colhead" role="columnheader">
        <span class={`gs-kind gs-kind-${column.id}`}>{column.label}</span>
        <span class="block text-xs text-[#71717a]">{column.note}</span>
      </div>
    {/each}
    {#each rows as row}
      <div class="gs-rowhead" role="rowheader">
        <span>{row.label}</span>
      </div>
      {#each columns as column}
        {@const cell = `${column.id}-${row.id}` as Cell}
        <div
          class={`gs-cell gs-cell-${column.id}`}
          class:gs-lit={lit(cell)}
          role="cell"
        >
          <span class="text-xs text-[#71717a]">{row.note}</span>
          <ul class="mt-1.5">
            {#each examples[cell] as item}<li>{item}</li>{/each}
          </ul>
        </div>
      {/each}
    {/each}
  </div>

  <p class="gs-fix" aria-live="polite">{mistake.fix}</p>
  <p class="mt-2 text-xs text-[#71717a]">
    Grid after Birgitta Böckeler. The mistakes are my own examples.
  </p>
</div>

<style>
  .gs-timeline {
    display: grid;
    grid-template-columns: auto 1fr auto 1fr auto;
    align-items: center;
    gap: 0.6rem;
    font-size: 0.75rem;
    font-weight: 600;
    color: #a1a1aa;
  }
  .gs-stage-guide { color: #7dd3fc; }
  .gs-stage-sensor { color: #fcd34d; }
  .gs-track {
    position: relative;
    height: 1px;
    background: #3f3f46;
  }
  .gs-dot {
    position: absolute;
    top: -3px;
    left: 0;
    width: 7px;
    height: 7px;
    border-radius: 999px;
    background: #fafafa;
    box-shadow: 0 0 10px rgba(250, 250, 250, 0.6);
    animation: gs-travel 3.2s cubic-bezier(0.65, 0, 0.35, 1) infinite;
  }
  .gs-dot-late { animation-delay: 1.6s; }
  @keyframes gs-travel {
    0% { left: 0; opacity: 0; }
    10% { opacity: 1; }
    45% { left: calc(100% - 7px); opacity: 1; }
    55%, 100% { left: calc(100% - 7px); opacity: 0; }
  }
  .gs-chip {
    cursor: pointer;
    border: 1px solid #27272a;
    border-radius: 999px;
    background: #0a0a0a;
    padding: 0.35rem 0.75rem;
    font-size: 0.8rem;
    font-weight: 600;
    color: #d4d4d8;
    transition: border-color 150ms, background-color 150ms;
  }
  .gs-chip:hover { border-color: #52525b; }
  .gs-chip[aria-pressed="true"] { border-color: #fafafa; background: #fafafa; color: #000000; }
  .gs-grid {
    display: grid;
    grid-template-columns: 1.5rem minmax(0, 1fr) minmax(0, 1fr);
    gap: 0.5rem;
  }
  .gs-colhead { padding: 0 0.25rem; }
  .gs-kind { font-size: 0.85rem; font-weight: 700; }
  .gs-kind-guide { color: #7dd3fc; }
  .gs-kind-sensor { color: #fcd34d; }
  .gs-rowhead {
    display: grid;
    place-items: center;
    writing-mode: vertical-rl;
    transform: rotate(180deg);
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #71717a;
  }
  .gs-cell {
    border: 1px solid #27272a;
    border-radius: 0.6rem;
    background: #0a0a0a;
    padding: 0.7rem 0.8rem;
    font-size: 0.875rem;
    line-height: 1.5;
    color: #a1a1aa;
    opacity: 0.55;
    transition: opacity 200ms, border-color 200ms, background-color 200ms, color 200ms;
  }
  .gs-cell li + li { margin-top: 0.2rem; }
  .gs-lit { opacity: 1; color: #fafafa; }
  .gs-lit.gs-cell-guide { border-color: #7dd3fc; background: rgba(125, 211, 252, 0.07); }
  .gs-lit.gs-cell-sensor { border-color: #fcd34d; background: rgba(252, 211, 77, 0.07); }
  .gs-fix {
    margin-top: 1rem;
    min-height: 4.5rem;
    border-top: 1px solid #27272a;
    padding-top: 0.9rem;
    font-size: 0.925rem;
    line-height: 1.65;
    color: #d4d4d8;
  }
  @media (prefers-reduced-motion: reduce) {
    .gs-dot { animation: none; opacity: 0; }
    .gs-cell, .gs-chip { transition: none; }
  }
</style>
