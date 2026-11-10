export const site = {
  url: "https://sohab.dev",
  name: "Sohab Sk",
  // Short lowercase id: names the MCP server, its resource URIs and the `claude mcp add` command.
  handle: "sohab",
  title: "Sohab Sk - Senior Software Engineer",
  description:
    "Sohab Sk - A Senior Software Engineer building agentic AI systems, multi-agent learning-authoring workflows, reusable agent frameworks, and scalable web platforms.",
  shortDescription:
    "Senior Software Engineer building reliable AI agents, multi-agent workflows, and scalable software systems.",
  publishedDate: "2026-07-03",
  modifiedDate: "2026-11-06",
  language: "en",
  locale: "en_US",
  twitterHandle: "@0xSohab",
  themeColor: "#000000",
  image: {
    path: "/images/og-image.png",
    width: 1668,
    height: 1012,
    type: "image/png",
    alt: "Sohab Sk, Senior Software Engineer focused on AI agents and scalable software systems",
  },
  profileImage: {
    path: "/images/sohab-profile.jpg",
    width: 1082,
    height: 1082,
    type: "image/jpeg",
    alt: "Portrait of Sohab Sk",
  },
  keywords: [
    "Sohab Sk",
    "Senior Software Engineer",
    "AI agents",
    "Agentic AI",
    "Multi-agent systems",
    "LangGraph",
    "RAG",
    "TypeScript",
    "React",
    "SvelteKit",
    "Software architecture",
    "Web3",
    "Blockchain",
  ],
  features: {
    blog: true,
    // "Ask AI" button and dialog: prefilled chat links about the owner.
    askAi: true,
    // Read-only MCP server at /mcp. Needs a host that runs functions (Cloudflare Pages does).
    mcp: true,
    // Soft availability line in the hero. Turn off if the timing is wrong.
    openToWork: true,
  },
  openToWorkText: "Open to senior AI engineering roles. Remote.",
  // Paste the Cloudflare Web Analytics beacon token to enable cookie-free analytics.
  analyticsToken: "",
};
