import type {
  ExperienceItem,
  GithubProject,
  Profile,
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
    updated: "In development",
    stars: 1,
    topics: ["agent framework", "workflow kit", "developer tools"],
    image: {
      src: "/images/plico.png",
      alt: "Plico product interface preview",
      width: 1700,
      height: 1032,
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
  },
  {
    name: "Cmuxup",
    description:
      "Terminal-first agentic workspace for cmux with one-command setup for lazygit, helix, delta, yazi, and AI coding agents.",
    href: "https://github.com/ITZSHOAIB/cmuxup",
    language: "Shell",
    updated: "2026-07-01",
    stars: 3,
    topics: ["cmux", "agentic workspace", "lazygit", "helix"],
  },
  {
    name: "Rehype Code Group",
    description:
      "Rehype plugin for grouping code blocks with tabs across documentation and tutorial sites.",
    href: "https://github.com/ITZSHOAIB/rehype-code-group",
    language: "TypeScript",
    updated: "2026-04-29",
    stars: 14,
    topics: ["rehype", "code tabs"],
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
      "Architected and built agentic AI systems across Skillsoft and Codecademy, including Vibe Learning Platform for generated full-stack learning projects, Design Assistant V2 for multi-agent learning authoring workflows, reusable agent framework primitives, source-ingestion and evaluation workflows, and the frontend architecture of LX Design Studio. Also explored personalized course generation, MCP/Skills-based flows, model fine-tuning approaches, and internal IDE tooling while improving release automation for a shared monorepo.",
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
      "Built full-stack blockchain SaaS products for EY’s OpsChain ecosystem, spanning contract automation and ESG workflows on public Ethereum with privacy-focused zero-knowledge components. Work covered smart contracts, Starlight zApps, REST and GraphQL services, React interfaces, Dockerized services, Azure Kubernetes integration, security fixes, and test coverage across unit, smoke, and end-to-end layers.",
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
      "Built MERN-stack applications for Strategy and Transformation work, using React, Redux Toolkit, Node, Express, and MongoDB for product workflows, while also contributing to Java BDD automation frameworks with Selenium and Appium.",
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
      "Styled Components",
      "shadcn/ui",
      "Radix UI",
      "Gamut",
      "NextAuth",
      "HTML",
      "CSS",
      "Flutter",
      "Electron",
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
      "Mongoose",
      "Flask",
      "Socket.IO",
      "WebRTC",
      "Ruby",
      "REST",
      "WebSockets",
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
      "Vercel",
      "Netlify",
      "Firebase",
      "Heroku",
      "GitHub Actions",
      "Jenkins",
      "Kafka",
      "BFF",
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
    featured: ["JavaScript", "TypeScript", "GoLang", "Ruby", "Jest", "Vitest"],
    more: ["Java", "Python"],
  },
] satisfies SkillGroup[];
