import { processPayload } from "$lib/agent/mcp";
import type { RequestHandler } from "./$types";

// Runs as a Cloudflare function; the rest of the site is static.
export const prerender = false;

const MAX_BODY_BYTES = 64 * 1024;

const cors = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "POST, GET, OPTIONS",
  "access-control-allow-headers":
    "content-type, accept, authorization, mcp-protocol-version, mcp-session-id, last-event-id",
  "access-control-max-age": "86400",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...cors, "content-type": "application/json" },
  });

const rpcError = (code: number, message: string, status: number) =>
  json({ jsonrpc: "2.0", id: null, error: { code, message } }, status);

export const POST: RequestHandler = async ({ request }) => {
  const raw = await request.text();
  if (new TextEncoder().encode(raw).byteLength > MAX_BODY_BYTES) {
    return rpcError(-32600, "Request body too large", 413);
  }

  let payload: unknown;
  try {
    payload = JSON.parse(raw);
  } catch {
    return rpcError(-32700, "Parse error", 400);
  }

  const body = processPayload(payload);
  if (body === null) return new Response(null, { status: 202, headers: cors });
  return json(body);
};

// No server-initiated stream and no sessions, so GET and DELETE are 405.
const notAllowed = () =>
  new Response("Method Not Allowed. This MCP server accepts JSON-RPC over POST.", {
    status: 405,
    headers: { ...cors, allow: "POST, OPTIONS", "content-type": "text/plain" },
  });

export const GET: RequestHandler = notAllowed;
export const DELETE: RequestHandler = notAllowed;
export const OPTIONS: RequestHandler = () => new Response(null, { status: 204, headers: cors });
