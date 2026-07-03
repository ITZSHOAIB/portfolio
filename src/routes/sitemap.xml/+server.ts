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
    .at(-1) ?? site.modifiedDate;

const latestSiteDate =
  latestProjectDate > site.modifiedDate ? latestProjectDate : site.modifiedDate;

const routes = [
  {
    path: "/",
    lastmod: latestSiteDate,
    changefreq: "monthly",
    priority: "1.0",
    images: [site.image, site.profileImage],
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
${route.images
  .map(
    (image) => `    <image:image>
      <image:loc>${escapeXml(`${site.url}${image.path}`)}</image:loc>
      <image:caption>${escapeXml(image.alt)}</image:caption>
    </image:image>`,
  )
  .join("\n")}
  </url>`,
    )
    .join("\n");

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>
`;

  return new Response(body, {
    headers: {
      "content-type": "application/xml; charset=utf-8",
    },
  });
};
