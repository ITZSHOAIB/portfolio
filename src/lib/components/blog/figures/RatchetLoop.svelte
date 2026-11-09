<script lang="ts">
  import { onMount } from "svelte";

  const steps = [
    {
      label: "Spot a repeat",
      detail: "The agent makes the same mistake twice. Note it down instead of correcting it in the chat.",
    },
    {
      label: "Guide or sensor?",
      detail: "Did the agent not know (add a guide), or did nothing tell it that it was wrong (add a sensor)? Often both.",
    },
    {
      label: "Fix it in a file",
      detail: "An AGENTS.md line, a script, a test or a lint rule. Something that lives in the repo, not in your head.",
    },
    {
      label: "It runs every time",
      detail: "The fix applies to every future change, for every agent and teammate. The ratchet clicks, and that mistake stays fixed.",
    },
  ];

  const STEP_MS = 2600;
  const C = 200;
  const R = 130;
  // Nodes sit at 12, 3, 6 and 9 o'clock, so the loop reads clockwise.
  const points = steps.map((_, i) => {
    const angle = (i * Math.PI) / 2 - Math.PI / 2;
    return { x: C + R * Math.cos(angle), y: C + R * Math.sin(angle) };
  });
  // Arrowheads halfway between nodes, pointing clockwise.
  const arrows = steps.map((_, i) => {
    const angle = (i * Math.PI) / 2 - Math.PI / 4;
    return {
      x: C + R * Math.cos(angle),
      y: C + R * Math.sin(angle),
      rotate: (angle * 180) / Math.PI + 180,
    };
  });

  // Steps taken so far. It only grows, so the dot always travels clockwise.
  let ticks = $state(0);
  const active = $derived(ticks % steps.length);
  let playing = $state(false);

  onMount(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    playing = true;
    const timer = setInterval(() => {
      if (playing) ticks += 1;
    }, STEP_MS);
    return () => clearInterval(timer);
  });

  function choose(index: number) {
    playing = false;
    ticks += (index - active + steps.length) % steps.length;
  }
</script>

<div class="ratchet">
  <svg viewBox="0 0 400 400" class="ratchet-svg" aria-hidden="true">
    <defs>
      <radialGradient id="ratchet-glow">
        <stop offset="0%" stop-color="#7dd3fc" stop-opacity="0.16" />
        <stop offset="100%" stop-color="#7dd3fc" stop-opacity="0" />
      </radialGradient>
    </defs>
    <circle cx={C} cy={C} r={R - 30} fill="url(#ratchet-glow)" />
    <circle cx={C} cy={C} r={R} fill="none" stroke="#3f3f46" stroke-width="1.5" stroke-dasharray="4 6" />
    {#each arrows as arrow}
      <path
        d="M -6 -5 L 4 0 L -6 5"
        fill="none"
        stroke="#71717a"
        stroke-width="1.5"
        transform={`translate(${arrow.x} ${arrow.y}) rotate(${arrow.rotate - 90})`}
      />
    {/each}
    {#each points as point, i}
      <circle cx={point.x} cy={point.y} r="13" fill={active === i ? "#7dd3fc" : "#18181b"} stroke={active === i ? "#7dd3fc" : "#3f3f46"} class="ratchet-node" />
      <text x={point.x} y={point.y + 4} text-anchor="middle" class="ratchet-node-num" fill={active === i ? "#000000" : "#d4d4d8"}>{i + 1}</text>
    {/each}
    <g class="ratchet-orbit" style={`transform: rotate(${ticks * 90 - 22}deg)`}>
      <circle class="ratchet-dot" r="4.5" cx={C} cy={C - R} fill="#fafafa" />
    </g>
    <text x={C} y={C - 6} text-anchor="middle" class="ratchet-center">
      Step {active + 1}
    </text>
    <text x={C} y={C + 16} text-anchor="middle" class="ratchet-center-sub">
      {steps[active].label}
    </text>
  </svg>

  <ol class="ratchet-steps">
    {#each steps as step, i}
      <li style={`--x: ${(points[i].x / 400) * 100}%; --y: ${(points[i].y / 400) * 100}%`}>
        <button
          type="button"
          class="ratchet-step"
          aria-pressed={active === i}
          onclick={() => choose(i)}
        >
          <span class="ratchet-num">{i + 1}</span>
          {step.label}
        </button>
      </li>
    {/each}
  </ol>

  <p class="ratchet-detail" aria-live="polite">{steps[active].detail}</p>
  {#if !playing}
    <button type="button" class="ratchet-play" onclick={() => (playing = true)}>
      Play the loop
    </button>
  {/if}
</div>

<style>
  .ratchet {
    position: relative;
  }
  .ratchet-svg {
    display: block;
    width: 100%;
    max-width: 26rem;
    margin: 0 auto;
  }
  .ratchet-orbit {
    transform-box: view-box;
    transform-origin: 50% 50%;
    transition: transform 1100ms cubic-bezier(0.65, 0, 0.35, 1);
  }
  .ratchet-dot { filter: drop-shadow(0 0 6px rgba(250, 250, 250, 0.8)); }
  .ratchet-center { fill: #71717a; font-size: 12px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; }
  .ratchet-center-sub { fill: #fafafa; font-size: 17px; font-weight: 600; }
  .ratchet-steps {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.4rem;
    margin: 0.5rem 0 0;
    padding: 0;
    list-style: none;
  }
  .ratchet-steps li { margin: 0; }
  /* Wide enough: labels sit on the loop, over the numbered nodes. */
  @media (min-width: 560px) {
    .ratchet-steps {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      display: block;
      width: 100%;
      max-width: 26rem;
      aspect-ratio: 1;
      margin: 0 auto;
    }
    .ratchet-steps li {
      position: absolute;
      left: var(--x);
      top: var(--y);
      transform: translate(-50%, -50%);
    }
  }
  .ratchet-step {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    cursor: pointer;
    white-space: nowrap;
    border: 1px solid #27272a;
    border-radius: 999px;
    background: #0a0a0a;
    padding: 0.35rem 0.7rem 0.35rem 0.4rem;
    font-size: 0.8rem;
    font-weight: 600;
    color: #d4d4d8;
    transition: border-color 200ms, background-color 200ms, color 200ms;
  }
  .ratchet-step[aria-pressed="true"] {
    border-color: #7dd3fc;
    background: #0b1a22;
    color: #fafafa;
  }
  .ratchet-num {
    display: grid;
    place-items: center;
    width: 1.25rem;
    height: 1.25rem;
    border-radius: 999px;
    background: #27272a;
    font-size: 0.7rem;
  }
  .ratchet-step[aria-pressed="true"] .ratchet-num { background: #7dd3fc; color: #000000; }
  .ratchet-detail {
    min-height: 3.5rem;
    margin-top: 0.75rem;
    border-top: 1px solid #27272a;
    padding-top: 0.9rem;
    font-size: 0.925rem;
    line-height: 1.65;
    color: #d4d4d8;
  }
  .ratchet-play {
    margin-top: 0.5rem;
    cursor: pointer;
    font-size: 0.8rem;
    font-weight: 600;
    color: #a1a1aa;
    text-decoration: underline;
    text-underline-offset: 4px;
  }
  .ratchet-node { transition: fill 200ms, stroke 200ms; }
  .ratchet-node-num { font-size: 12px; font-weight: 700; }
  @media (prefers-reduced-motion: reduce) {
    .ratchet-orbit, .ratchet-step, .ratchet-node { transition: none; }
  }
</style>
