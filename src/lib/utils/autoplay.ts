// Figures play themselves: a timer advances them while they are on screen,
// so readers watch instead of clicking. Returns null, and does nothing, when
// the reader prefers reduced motion; the figure then shows a static version.
// `isPaused` backs the pause button (WCAG 2.2.2).
export function autoplay(
  node: Element,
  everyMs: number,
  tick: () => void,
  isPaused: () => boolean = () => false,
) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return null;

  let timer: ReturnType<typeof setInterval> | undefined;
  const observer = new IntersectionObserver(
    ([entry]) => {
      clearInterval(timer);
      if (entry.isIntersecting) timer = setInterval(() => {
        if (!isPaused() && !document.hidden) tick();
      }, everyMs);
    },
    { threshold: 0.35 },
  );
  observer.observe(node);

  return () => {
    observer.disconnect();
    clearInterval(timer);
  };
}
