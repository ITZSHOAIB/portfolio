import { site } from "$lib/config/site";
import { githubProjects } from "$lib/data/portfolio";

export const prerender = true;

const escapeXml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");

const latestProjectDate =
  githubProjects
    .map((project) => project.updated)
    .filter((updated) => /^\d{4}-\d{2}-\d{2}$/.test(updated))
    .sort()
    .at(-1) ?? "2026-07-02";

const routes = [
  {
    path: "/",
    lastmod: latestProjectDate,
    changefreq: "monthly",
    priority: "1.0",
  },
];

export const GET = () => {
  const urls = routes
    .map(
      (route) => `  <url>
    <loc>${escapeXml(`${site.url}${route.path}`)}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`,
    )
    .join("\n");

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

  return new Response(body, {
    headers: {
      "content-type": "application/xml; charset=utf-8",
    },
  });
};
