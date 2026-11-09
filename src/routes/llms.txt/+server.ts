import { site } from "$lib/config/site";
import { mcpUrl, profileSummary } from "$lib/agent/knowledge";
import { profile } from "$lib/data/portfolio";
import { blogPosts } from "$lib/content/blog";

export const prerender = true;

export const GET = () => {
  const links = profile.links
    .filter((link) => link.href.startsWith("http"))
    .map((link) => `- [${link.label}](${link.href}): ${link.username}`);

  const posts = site.features.blog ? blogPosts : [];
  const postLinks = posts.map(
    (post) =>
      `- [${post.title}](${site.url}/blog/${post.slug}): ${post.description}`,
  );
  const blogSection = posts.length
    ? [
        "## Blog",
        "",
        ...postLinks,
        `- [RSS](${site.url}/rss.xml) and [JSON Feed](${site.url}/feed.json)`,
      ].join("\n")
    : "";

  const body = `# ${profile.name}

> ${site.shortDescription}

${profileSummary()}

## Portfolio

- [Full portfolio as Markdown](${site.url}/llms-full.txt): experience, selected work, projects, skills, and contact in one file
- [Website](${site.url}): the human-readable version

${blogSection}

## MCP server

- [${mcpUrl}](${mcpUrl}): read-only MCP server (Streamable HTTP) with tools to search and read this portfolio. Claude Code: \`claude mcp add --transport http sohab ${mcpUrl}\`

## Contact

- [Email](mailto:${profile.email}): ${profile.email}
${links.join("\n")}
`;

  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
};
