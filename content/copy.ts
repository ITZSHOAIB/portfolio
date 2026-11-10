// Headlines and short descriptions that frame each section. They say what your
// work is about, so write them in your own voice.
export const copy = {
  selectedWork: {
    title: "AI products shipped to production.",
    description:
      "The agentic systems behind my day job: what they do and the scale they run at.",
  },
  experience: {
    title: "Production systems, from AI workflows to web platforms.",
    description: "What shipped in each role, with the scale it reached.",
  },
  projects: {
    title: "Selected public builds and products.",
    description: "A focused set of shipped tools, libraries, and app projects.",
  },
  skills: {
    title: "Focused stack, compact toolbox.",
    description:
      "AI systems, product platforms, backend services, delivery, testing, and blockchain work in one tighter view.",
  },
  // Used on /blog and in its structured data. The site name is appended: "... by <name>."
  blogDescription:
    "Notes on AI agents, multi-agent workflows, and scalable software systems",
  // Extra terms the job-posting matcher recognises, on top of every skill and stack entry.
  matchTerms: ["Claude Code", "LLM evaluations", "Multi-agent"],
  // Prompts offered in the Ask AI dialog. {name} becomes your name.
  askAiQuestions: [
    {
      id: "summary",
      label: "Quick summary",
      ask: "summarize who {name} is, the most notable work shipped, and the strongest areas.",
    },
    {
      id: "ai",
      label: "AI work",
      ask: "list the AI products {name} has shipped to production, the role played in each, and the scale.",
    },
    {
      id: "fit",
      label: "Fit for a role",
      ask: "assess how {name}'s experience fits the job posting below. Cover strong matches and gaps.",
    },
    {
      id: "interview",
      label: "Interview prep",
      ask: "suggest five interview questions tailored to {name}'s experience, with what a strong answer would cover.",
    },
  ],
};
