import type { SelectedWork } from "$lib/types/portfolio";

// The big stories: two or three pieces of work you want people to remember.
export const selectedWork: SelectedWork[] = [
  {
    name: "A deploy pipeline teams actually use",
    context: "Northwind Labs · internal platform",
    description:
      "Replaced three hand-rolled release scripts with one pipeline: build, test, canary, promote. Adoption went from a pilot team to every service in two quarters because the first deploy took ten minutes, not a day.",
    metrics: [
      { value: "40+", label: "services on the pipeline" },
      { value: "12 min", label: "median commit to production" },
    ],
    stack: ["TypeScript", "Kubernetes", "GitHub Actions"],
  },
  {
    name: "Idempotent payments API",
    context: "Brightpay · payments",
    description:
      "Designed the retry-safe write path for a payments API handling millions of requests a day, with request fingerprints, an outbox, and a replay tool for support.",
    metrics: [{ value: "0", label: "double charges in production" }],
    stack: ["Go", "PostgreSQL", "Kafka"],
  },
];
