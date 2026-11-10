import type { ExperienceItem } from "$lib/types/portfolio";

export const experience: ExperienceItem[] = [
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
];
