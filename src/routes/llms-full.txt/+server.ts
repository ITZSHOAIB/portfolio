import { fullMarkdown } from "$lib/agent/knowledge";

export const prerender = true;

export const GET = () =>
  new Response(`${fullMarkdown()}\n`, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
