import type { SkillGroup } from "$lib/types/portfolio";

export const skillGroups: SkillGroup[] = [
  {
    title: "AI Agent Frameworks",
    featured: ["LangGraph", "LangChain", "MCP", "RAG", "VectorDB", "Ingestion"],
    more: ["LlamaIndex", "A2A", "Multi-agent systems", "Agent workflow design"],
  },
  {
    title: "Frontend",
    featured: ["React", "Next.js", "SvelteKit", "Redux", "Tailwind CSS"],
    more: [
      "Remix",
      "Redux Toolkit",
      "Material UI",
      "shadcn/ui",
      "Radix UI",
      "Gamut",
      "Webpack",
      "Rspack",
      "SWC",
      "Vite",
      "Rollup",
    ],
  },
  {
    title: "Backend",
    featured: [
      "Node.js",
      "NestJS",
      "GraphQL",
      "Ruby on Rails",
      "PostgreSQL",
      "MongoDB",
      "GoLang",
    ],
    more: [
      "Express",
      "Ruby",
      "REST",
    ],
  },
  {
    title: "Platform & Architecture",
    featured: [
      "AWS",
      "Azure",
      "Docker",
      "Kubernetes",
      "RabbitMQ",
      "Module Federation",
      "Microservices",
    ],
    more: [
      "Cloudflare",
      "GitHub Actions",
      "Jenkins",
      "Kafka",
      "Apollo Federation",
      "Monorepo",
      "Domain Driven Development",
      "Test Driven Development",
      "Event Driven Architecture",
    ],
  },
  {
    title: "Blockchain",
    featured: ["Solidity", "Viem", "Ethereum", "Polygon", "ZKP", "Web3.js"],
    more: [
      "Ethers.js",
      "Wagmi",
      "Hardhat",
      "ConnectKit",
      "RainbowKit",
      "Starlight",
    ],
  },
  {
    title: "Languages & Testing",
    featured: ["JavaScript", "TypeScript", "Python", "GoLang", "Ruby", "Jest", "Vitest"],
    more: ["Java", "Playwright"],
  },
];
