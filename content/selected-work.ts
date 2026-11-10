import type { SelectedWork } from "$lib/types/portfolio";

export const selectedWork = [
  {
    name: "Next-generation agentic authoring for LX Design Studio",
    context: "Skillsoft · customer beta",
    description:
      "Our team originated the idea and owned it end to end, across product direction, engineering, and architecture. I architected it from proof of concept to a production beta with 20+ enterprise customers: multi-agent content generation from uploaded documents, grounded by an in-house vectorless retrieval pipeline built on heuristic document trees and BM25 search.",
    metrics: [
      { value: "20+", label: "enterprise beta customers" },
      { value: "Idea → beta", label: "product, tech, and architecture" },
    ],
    stack: ["LangGraph", "MCP", "Vectorless RAG", "TypeScript"],
    href: "https://investor.skillsoft.com/news-events/press-releases/detail/463/skillsoft-lx-design-studio-reduces-custom-learning-content-development-from-weeks-to-days",
    hrefLabel: "About LX Design Studio",
  },
  {
    name: "Vibe Learning Platform",
    context: "Codecademy",
    description:
      "LangGraph-based agentic engine that generates full-stack, learn-by-building projects, shipped within two months.",
    metrics: [{ value: "10M+", label: "active learners" }],
    stack: ["LangGraph", "Next.js", "TypeScript"],
    href: "https://www.codecademy.com/resources/blog/why-the-future-of-learning-starts-with-building",
    hrefLabel: "Read the announcement",
  },
  {
    name: "Agentor",
    context: "Skillsoft internal framework",
    description:
      "Reusable framework for multi-agent workflows, MCP tools, guardrails, conversation state, and LLM evaluations. Earned CTO recognition.",
    metrics: [{ value: "8+", label: "teams using it" }],
    stack: ["TypeScript", "MCP", "LLM evals", "Guardrails"],
  },
  {
    name: "AI-native Builder pod",
    context: "Skillsoft",
    description:
      "Technical lead of Skillsoft's first AI-native pod: three engineers owning delivery end to end, shipping two products in under six months.",
    metrics: [{ value: "11", label: "pods adopted the model" }],
    stack: ["Claude Code", "Agentic engineering", "Technical leadership"],
  },
] satisfies SelectedWork[];
