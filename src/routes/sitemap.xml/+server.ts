import { site } from "$lib/config/site";
import { writingPosts } from "$lib/content/writing";
import { projectPages } from "$lib/content/projects";
import { allTags } from "$lib/content/writing-queries";
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
  ...projectPages.map((page) => ({
    path: `/projects/${page.slug}`,
    lastmod: page.updated,
    changefreq: "monthly",
    priority: "0.7",
    images: [site.image],
  })),
  ...(site.features.writing && writingPosts.length
    ? [
        {
          path: "/writing",
          lastmod: writingPosts[0].updated ?? writingPosts[0].published,
          changefreq: "weekly",
          priority: "0.8",
          images: [site.image],
        },
        ...writingPosts.map((post) => ({
          path: `/writing/${post.slug}`,
          lastmod: post.updated ?? post.published,
          changefreq: "yearly",
          priority: "0.7",
          images: [
            {
              path: `/writing/${post.slug}/og.png`,
              alt: post.title,
            },
          ],
        })),
        ...allTags().map(({ slug }) => ({
          path: `/tags/${slug}`,
          lastmod: writingPosts[0].published,
          changefreq: "weekly",
          priority: "0.4",
          images: [site.image],
        })),
      ]
    : []),
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
