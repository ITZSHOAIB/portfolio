<script lang="ts">
  import { onMount } from "svelte";

  let progress = $state(0);

  onMount(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  });
</script>

<div
  class="fixed inset-x-0 top-0 z-40 h-0.5 origin-left bg-[#fafafa]/80"
  style={`transform: scaleX(${progress})`}
  role="progressbar"
  aria-label="Reading progress"
  aria-valuemin="0"
  aria-valuemax="100"
  aria-valuenow={Math.round(progress * 100)}
></div>
