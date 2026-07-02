<script lang="ts">
  let {
    eyebrow,
    title,
    description,
    compact = false,
  }: {
    eyebrow: string;
    title: string;
    description?: string;
    compact?: boolean;
  } = $props();
</script>

<div class={`${compact ? "mb-8" : "mb-10"} grid gap-4 lg:grid-cols-[14rem_1fr]`}>
  <p class="text-sm font-bold uppercase tracking-[0.14em] text-[#a1a1aa]">
    {eyebrow}
  </p>
  <div>
    <h2
      class="text-2xl font-semibold leading-tight tracking-tight sm:text-3xl xl:text-4xl"
    >
      {title}
    </h2>
    {#if description}
      <p class="mt-4 max-w-2xl text-base leading-7 text-[#a1a1aa]">
        {description}
      </p>
    {/if}
  </div>
</div>
