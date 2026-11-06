import { site } from "$lib/config/site";
import {
  experienceMarkdown,
  fullMarkdown,
  keywordOverlap,
  profileMarkdown,
  projectsMarkdown,
  search,
  sections,
  selectedWorkMarkdown,
  skillsMarkdown,
  contactMarkdown,
  type SectionName,
} from "$lib/agent/knowledge";
import { profile } from "$lib/data/portfolio";

// A minimal, stateless, read-only MCP server over Streamable HTTP.
// Every response is plain JSON (no SSE stream, no session id), which the
// spec allows and which keeps it a single Cloudflare function.

const SUPPORTED_VERSIONS = ["2025-11-25", "2025-06-18", "2025-03-26", "2024-11-05"];
const MAX_POSTING_CHARS = 20_000;
const MAX_QUERY_CHARS = 500;

type JsonRpcId = string | number | null;
type JsonRpcMessage = {
  jsonrpc?: string;
  id?: JsonRpcId;
  method?: string;
  params?: Record<string, unknown>;
};

type ToolResult = {
  content: { type: "text"; text: string }[];
  isError?: boolean;
};

type Tool = {
  name: string;
  title: string;
  description: string;
  inputSchema: Record<string, unknown>;
  run: (args: Record<string, unknown>) => ToolResult;
};

const text = (value: string): ToolResult => ({
  content: [{ type: "text", text: value }],
});
const toolError = (value: string): ToolResult => ({
  content: [{ type: "text", text: value }],
  isError: true,
});
const noArgs = { type: "object", properties: {}, additionalProperties: false };

const tools: Tool[] = [
  {
    name: "get_profile",
    title: "Profile",
    description: `Who ${profile.name} is: current role, years of experience, location, and focus.`,
    inputSchema: noArgs,
    run: () => text(profileMarkdown()),
  },
  {
    name: "get_experience",
    title: "Experience",
    description: "Full work history: roles, companies, dates, highlights, and stack for each role.",
    inputSchema: noArgs,
    run: () => text(experienceMarkdown()),
  },
  {
    name: "get_selected_work",
    title: "Selected work",
    description: "AI products shipped to production, with scale metrics and stack.",
    inputSchema: noArgs,
    run: () => text(selectedWorkMarkdown()),
  },
  {
    name: "get_projects",
    title: "Projects",
    description: "Open-source and side projects with links, usage metrics, and topics.",
    inputSchema: noArgs,
    run: () => text(projectsMarkdown()),
  },
  {
    name: "get_skills",
    title: "Skills",
    description: "Skills grouped by area (AI agents, frontend, backend, platform, blockchain, languages).",
    inputSchema: noArgs,
    run: () => text(skillsMarkdown()),
  },
  {
    name: "get_contact",
    title: "Contact",
    description: "Email and social links.",
    inputSchema: noArgs,
    run: () => text(contactMarkdown()),
  },
  {
    name: "search_portfolio",
    title: "Search portfolio",
    description:
      "Keyword search across experience, selected work, projects, and skills. Returns the best-matching passages with their section.",
    inputSchema: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description: "Keywords, for example 'LangGraph evaluations' or 'Kubernetes'.",
        },
        limit: {
          type: "integer",
          minimum: 1,
          maximum: 10,
          description: "Maximum passages to return. Defaults to 5.",
        },
      },
      required: ["query"],
      additionalProperties: false,
    },
    run: (args) => {
      const query = typeof args.query === "string" ? args.query.trim() : "";
      if (!query) return toolError("`query` must be a non-empty string.");
      if (query.length > MAX_QUERY_CHARS)
        return toolError(`\`query\` must be at most ${MAX_QUERY_CHARS} characters.`);
      const limit =
        typeof args.limit === "number" ? Math.min(Math.max(Math.floor(args.limit), 1), 10) : 5;

      const hits = search(query, limit);
      if (!hits.length) return text(`No passages matched "${query}".`);
      return text(
        hits
          .map((hit) => `## ${hit.title} [${hit.section}]\n\n${hit.text}`)
          .join("\n\n"),
      );
    },
  },
  {
    name: "compare_with_job_posting",
    title: "Compare with a job posting",
    description:
      "Returns the technologies named in a job posting that also appear in this portfolio, plus the profile, experience, and selected work, so you can make your own assessment. Keyword overlap only; it does not score fit.",
    inputSchema: {
      type: "object",
      properties: {
        posting: {
          type: "string",
          description: "The job posting text.",
        },
      },
      required: ["posting"],
      additionalProperties: false,
    },
    run: (args) => {
      const posting = typeof args.posting === "string" ? args.posting : "";
      if (!posting.trim()) return toolError("`posting` must be a non-empty string.");
      if (posting.length > MAX_POSTING_CHARS)
        return toolError(`\`posting\` must be at most ${MAX_POSTING_CHARS} characters.`);

      const overlap = keywordOverlap(posting);
      return text(`# Keyword overlap

${overlap.length ? overlap.map((term) => `- ${term}`).join("\n") : "None of the portfolio's listed technologies appear in the posting."}

This is exact keyword matching against technologies named on ${site.url}. A term missing here is not evidence either way.

---

${profileMarkdown()}

---

${experienceMarkdown()}

---

${selectedWorkMarkdown()}`);
    },
  },
];

const resourceUri = (name: string) => `sohab://portfolio/${name}`;

const resources = [
  ...Object.keys(sections).map((name) => ({
    uri: resourceUri(name),
    name,
    title: name.replace("-", " ").replace(/^\w/, (c) => c.toUpperCase()),
    mimeType: "text/markdown",
  })),
  {
    uri: resourceUri("full"),
    name: "full",
    title: "Full portfolio",
    mimeType: "text/markdown",
  },
];

function readResource(uri: string) {
  const name = uri.startsWith(resourceUri("")) ? uri.slice(resourceUri("").length) : "";
  if (name === "full") return fullMarkdown();
  if (name in sections) return sections[name as SectionName]();
  return null;
}

const instructions = `Read-only information about ${profile.name}, ${profile.role}, published from ${site.url}. Use the tools to look up experience, shipped work, projects, skills, and contact details. The data is the same as the public website.`;

class RpcError extends Error {
  constructor(
    readonly code: number,
    message: string,
  ) {
    super(message);
  }
}

function handle(message: JsonRpcMessage): unknown {
  const params = message.params ?? {};

  switch (message.method) {
    case "initialize": {
      const requested = params.protocolVersion;
      const protocolVersion =
        typeof requested === "string" && SUPPORTED_VERSIONS.includes(requested)
          ? requested
          : SUPPORTED_VERSIONS[0];
      return {
        protocolVersion,
        capabilities: { tools: {}, resources: {} },
        serverInfo: {
          name: "sohab-portfolio",
          title: `${profile.name} portfolio`,
          version: "1.0.0",
          websiteUrl: site.url,
        },
        instructions,
      };
    }
    case "ping":
      return {};
    case "tools/list":
      return {
        tools: tools.map(({ run: _run, ...tool }) => ({
          ...tool,
          annotations: { readOnlyHint: true, openWorldHint: false },
        })),
      };
    case "tools/call": {
      const tool = tools.find((candidate) => candidate.name === params.name);
      if (!tool) throw new RpcError(-32602, `Unknown tool: ${String(params.name)}`);
      const args =
        params.arguments && typeof params.arguments === "object"
          ? (params.arguments as Record<string, unknown>)
          : {};
      return tool.run(args);
    }
    case "resources/list":
      return { resources };
    case "resources/templates/list":
      return { resourceTemplates: [] };
    case "resources/read": {
      const uri = typeof params.uri === "string" ? params.uri : "";
      const body = readResource(uri);
      if (body === null) throw new RpcError(-32002, `Resource not found: ${uri}`);
      return { contents: [{ uri, mimeType: "text/markdown", text: body }] };
    }
    default:
      throw new RpcError(-32601, `Method not found: ${String(message.method)}`);
  }
}

const isRequest = (message: JsonRpcMessage) => "id" in message && message.id !== undefined;

function respond(message: JsonRpcMessage) {
  const id = message.id ?? null;
  if (message?.jsonrpc !== "2.0" || typeof message.method !== "string") {
    return { jsonrpc: "2.0", id, error: { code: -32600, message: "Invalid request" } };
  }
  try {
    return { jsonrpc: "2.0", id, result: handle(message) };
  } catch (error) {
    if (error instanceof RpcError) {
      return { jsonrpc: "2.0", id, error: { code: error.code, message: error.message } };
    }
    return { jsonrpc: "2.0", id, error: { code: -32603, message: "Internal error" } };
  }
}

// Returns the JSON body to send, or null when every message was a
// notification (the transport then answers 202 with no body).
export function processPayload(payload: unknown): unknown {
  const batch = Array.isArray(payload);
  const messages = (batch ? payload : [payload]) as JsonRpcMessage[];
  if (batch && !messages.length) {
    return { jsonrpc: "2.0", id: null, error: { code: -32600, message: "Invalid request" } };
  }

  const responses = messages
    .filter((message) => message && typeof message === "object" && isRequest(message))
    .map(respond);
  const invalid = messages.filter((message) => !message || typeof message !== "object");
  for (const _ of invalid) {
    responses.push({ jsonrpc: "2.0", id: null, error: { code: -32600, message: "Invalid request" } });
  }

  if (!responses.length) return null;
  return batch ? responses : responses[0];
}
