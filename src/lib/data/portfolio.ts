import type {
  ExperienceItem,
  GithubProject,
  Profile,
  SelectedWork,
  SkillGroup,
} from "$lib/types/portfolio";

export const profile = {
  name: "Sohab Sk",
  domain: "sohab.dev",
  role: "Senior Software Engineer",
  company: "Skillsoft / Codecademy",
  location: "India, remote",
  email: "sksohablocal@gmail.com",
  focus: "Reliable AI Agents & scalable software systems.",
  current:
    "Currently architecting and building agentic AI systems, multi-agent workflows for learning authoring, evaluation harnesses, source-ingestion R&D, reusable agent frameworks, and platform architecture at Skillsoft / Codecademy.",
  previous:
    "Previously built enterprise blockchain SaaS products at EY GDS with smart contracts, GraphQL/NestJS services, React, and Azure Kubernetes delivery.",
  links: [
    {
      label: "GitHub",
      username: "@ITZSHOAIB",
      href: "https://github.com/ITZSHOAIB",
    },
    {
      label: "LinkedIn",
      username: "/in/IITZSHOAIB",
      href: "https://www.linkedin.com/in/IITZSHOAIB",
    },
    {
      label: "Twitter/X",
      username: "@0xSohab",
      href: "https://twitter.com/0xSohab",
    },
    {
      label: "YouTube",
      username: "@4techloverz",
      href: "https://www.youtube.com/4techloverz",
    },
    {
      label: "Email",
      username: "sksohablocal@gmail.com",
      href: "mailto:sksohablocal@gmail.com",
    },
  ],
} satisfies Profile;

export const githubProjects = [
  {
    name: "Plico",
    description:
      "Landing page for a file-based agents framework kit for composing local workflows, prompts, and tools into reusable AI agent projects.",
    href: "https://plico.sohab.dev",
    language: "TypeScript",
    updated: "Active",
    stars: 2,
    topics: ["agent framework", "workflow kit", "developer tools"],
    image: {
      src: "/images/plico.webp",
      alt: "Plico product interface preview",
      width: 1100,
      height: 769,
    },
  },
  {
    name: "Rehype Code Group",
    description:
      "Accessible Rehype plugin that turns neighboring code blocks or HTML content into tabbed groups without coupling to a frontend framework or syntax highlighter.",
    href: "https://rehype-code-group.sohab.dev",
    language: "TypeScript",
    updated: "2026-04-29",
    stars: 15,
    topics: ["rehype", "code tabs", "accessibility"],
    metrics: [
      { value: "11k", label: "weekly downloads", icon: "downloads" },
      { value: "15", label: "GitHub stars", icon: "stars" },
    ],
    image: {
      src: "/images/rehype-code-group.webp",
      alt: "Rehype Code Group landing page showing accessible code tabs for documentation",
      width: 1100,
      height: 845,
    },
  },
  {
    name: "Chaingent.app",
    description:
      "Agentic smart contract development platform for building, auditing, and deploying Solidity applications faster.",
    href: "https://chaingent.app/",
    language: "TypeScript",
    updated: "Live app",
    stars: "-",
    topics: ["ai", "web3", "smart contracts", "solidity"],
    image: {
      src: "/images/chaingent.webp",
      alt: "Chaingent app interface preview",
      width: 1100,
      height: 769,
    },
  },
  {
    name: "Cmuxup",
    description:
      "Terminal-first agentic workspace for cmux with one-command setup for lazygit, helix, delta, yazi, and AI coding agents.",
    href: "https://github.com/ITZSHOAIB/cmuxup",
    language: "Shell",
    updated: "2026-07-01",
    stars: 4,
    topics: ["cmux", "agentic workspace", "lazygit", "helix"],
  },
  {
    name: "Hashtegrity",
    description:
      "Library for generating hashes, validating data integrity, and monitoring file, directory, and off-chain data integrity.",
    href: "https://github.com/ITZSHOAIB/hashtegrity",
    language: "TypeScript",
    updated: "2026-05-18",
    stars: 3,
    topics: ["hash", "data integrity", "crypto hash"],
  },
] satisfies GithubProject[];

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
      "Reusable framework for multi-agent workflows, MCP tools, guardrails, source ingestion, conversation state, and LLM evaluations. Cut agent scaffolding across teams and earned CTO recognition.",
    metrics: [{ value: "8+", label: "teams using it" }],
    stack: ["TypeScript", "MCP", "LLM evals", "Guardrails"],
  },
  {
    name: "AI-native Builder pod",
    context: "Skillsoft",
    description:
      "Technical lead of Skillsoft's first AI-native pod: three engineers owning product delivery end to end and shipping two products in under six months. The model was then adopted by other pods.",
    metrics: [{ value: "2", label: "products in under 6 months" }, { value: "11", label: "more pods adopted the model" }],
    stack: ["Claude Code", "Agentic engineering", "Technical leadership"],
  },
] satisfies SelectedWork[];

export const experience = [
  {
    role: "Senior Software Engineer",
    company: "Skillsoft / Codecademy",
    period: "Jun 2024 - Present",
    stack: [
      "LangGraph",
      "RAG",
      "VectorDB",
      "Next.js",
      "React",
      "TypeScript",
      "GraphQL",
      "Ruby On Rails",
      "GoLang",
      "PostgreSQL",
      "MongoDB",
      "AWS",
      "Redis",
      "Kubernetes",
      "RabbitMQ",
    ],
    summary:
      "Technical lead for AI-native product work across Skillsoft and Codecademy: agentic authoring, learning-by-building engines, and the shared frameworks behind them.",
    highlights: [
      "Originated (with my team) and architected next-generation agentic authoring for LX Design Studio, owning product direction, engineering, and architecture from idea to a production beta with 20+ enterprise customers.",
      "Designed its in-house vectorless retrieval pipeline: a non-LLM ingestion step that converts arbitrary document formats into heuristic trees and exposes tree-aware agent tools with in-memory BM25 search, improving grounding and citation fidelity while cutting LLM input tokens on large documents.",
      "Shipped Codecademy's Vibe Learning Platform to 10M+ active learners within two months by building a LangGraph-based agentic engine that generates full-stack, learn-by-building projects.",
      "Created Agentor, a reusable framework for multi-agent workflows, MCP tools, guardrails, source ingestion, conversation state, and LLM evaluations; reduced agent scaffolding for 8+ teams and earned CTO recognition.",
      "Served as technical lead for Skillsoft's first AI-native Builder pod, a three-engineer team that owned product delivery end to end and shipped two products in under six months; the model expanded to 11 additional pods.",
      "Built the frontend foundation for LX Design Studio with Next.js, React, TypeScript, reusable routing and design-system patterns, and modular integration across a shared monorepo.",
      "Built internal AI developer tooling and release automation, including ACE workflows for sharing reusable skills, subagents, and plugins across 15+ engineering teams.",
    ],
    links: [
      {
        label: "AI Builder",
        href: "https://www.codecademy.com/resources/blog/why-the-future-of-learning-starts-with-building",
      },
      {
        label: "LX Design Studio",
        href: "https://www.skillsoft.com/meet-skillsoft-percipio",
      },
      {
        label: "Codecademy",
        href: "https://www.codecademy.com/",
      },
      {
        label: "Skillsoft",
        href: "https://www.skillsoft.com/",
      },
    ],
  },
  {
    role: "Software Engineer",
    company: "Ernst & Young GDS",
    period: "Aug 2022 - Jun 2024",
    stack: [
      "Solidity",
      "Viem",
      "NestJS",
      "React",
      "GraphQL",
      "Azure",
      "Docker",
      "Kubernetes",
      "Redis",
      "MongoDB",
    ],
    summary:
      "Full-stack blockchain SaaS for EY's OpsChain ecosystem, from smart contracts to Kubernetes delivery.",
    highlights: [
      "Built full-stack blockchain SaaS products, EY OpsChain Contract Manager and OpsChain ESG, automating contract and sustainability workflows on Ethereum with zero-knowledge privacy components.",
      "Developed REST and GraphQL microservices with NestJS and Node.js, containerized with Docker and deployed via Azure Kubernetes Service and API Management.",
      "Implemented Starlight zApps and ERC-1155 smart contracts in Solidity, fixed information-security findings, and expanded unit, smoke, and end-to-end coverage with Jest and Supertest.",
    ],
    links: [
      {
        label: "EY OpsChain Contract Manager",
        href: "https://blockchain.ey.com/products/ocm",
      },
      {
        label: "EY OpsChain ESG",
        href: "https://blockchain.ey.com/products/esg",
      },
      {
        label: "EY Blockchain",
        href: "https://blockchain.ey.com/",
      },
    ],
  },
  {
    role: "Assistant System Engineer",
    company: "Tata Consultancy Services",
    period: "Feb 2020 - Aug 2022",
    stack: [
      "React",
      "Redux",
      "Node.js",
      "Express",
      "Azure",
      "MongoDB",
      "Java",
      "Python",
    ],
    summary:
      "MERN-stack product work for Strategy and Transformation, plus Java test automation.",
    highlights: [
      "Built MERN-stack applications for Strategy and Transformation initiatives using React, Redux Toolkit, Node.js, Express, and MongoDB across core product workflows.",
      "Contributed to Java BDD automation frameworks using Selenium and Appium, improving repeatable web and mobile regression testing.",
    ],
    links: [
      {
        label: "TCS",
        href: "https://www.tcs.com/",
      },
    ],
  },
] satisfies ExperienceItem[];

export const skillGroups = [
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
] satisfies SkillGroup[];
