// Links that open a chat with a prompt already typed in. Both only prefill:
// the reader still presses send. claude.ai documents the `q` parameter and
// truncates it at about 14,000 characters; chatgpt.com's `q` is undocumented.
export const MAX_SELECTION_CHARS = 1500;

export type AiTarget = "claude" | "chatgpt";

export const aiTargets: { id: AiTarget; label: string }[] = [
  { id: "claude", label: "Claude" },
  { id: "chatgpt", label: "ChatGPT" },
];

export function chatUrl(target: AiTarget, prompt: string) {
  const q = encodeURIComponent(prompt);
  return target === "claude"
    ? `https://claude.ai/new?q=${q}`
    : `https://chatgpt.com/?q=${q}`;
}

const quote = (text: string) => `> ${text.trim().replace(/\n+/g, "\n> ")}`;

export function selectionPrompt(post: { title: string; url: string }, selection: string) {
  const text =
    selection.length > MAX_SELECTION_CHARS
      ? `${selection.slice(0, MAX_SELECTION_CHARS)}…`
      : selection;
  return `I'm reading "${post.title}" (${post.url}). Explain this passage in plain terms, and how it fits the rest of the article:

${quote(text)}`;
}

export function postPrompt(post: { title: string; markdownUrl: string }) {
  return `Read ${post.markdownUrl} ("${post.title}"). Summarise the key ideas in a few bullets, then help me apply them to my own project. Start by asking what I'm working on.`;
}
