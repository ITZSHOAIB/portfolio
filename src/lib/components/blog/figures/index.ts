import type { Component } from "svelte";
import HarnessAnatomy from "./HarnessAnatomy.svelte";
import RatchetLoop from "./RatchetLoop.svelte";

// Keys match the ids in $lib/content/figures, which holds each caption.
export const figureComponents: Record<string, Component> = {
  "harness-anatomy": HarnessAnatomy,
  "ratchet-loop": RatchetLoop,
};
