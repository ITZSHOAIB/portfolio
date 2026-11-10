// Build-time only: renders a 1200x630 social card. Imported dynamically from
// prerendered endpoints so the native resvg binding never reaches the worker bundle.
// Node built-ins are imported lazily: this module is bundled into the worker, where a
// static `node:` import fails at deploy time even though the route never runs there.

// `cover` is a path under static/ (for example /images/blog/x.jpg). With one, the card
// becomes a photo on the left and the text on the right.
export type OgCard = { title: string; eyebrow: string; footer: string; cover?: string };

const fontDir = "node_modules/@fontsource/inter/files";

let fonts: Promise<
  { name: string; data: Buffer; weight: 400 | 600 | 700; style: "normal" }[]
> | null = null;

const loadFonts = () =>
  (fonts ??= (async () => {
    const { readFile } = await import("node:fs/promises");
    return Promise.all(
      ([400, 600, 700] as const).map(async (weight) => ({
        name: "Inter",
        data: await readFile(`${fontDir}/inter-latin-${weight}-normal.woff`),
        weight,
        style: "normal" as const,
      })),
    );
  })());

const box = (style: Record<string, string | number>, children: unknown) => ({
  type: "div",
  props: { style: { display: "flex", flexDirection: "column", ...style }, children },
});

const coverUri = async (cover: string) => {
  const { readFile } = await import("node:fs/promises");
  const data = await readFile(`static${cover}`);
  return `url(data:image/jpeg;base64,${data.toString("base64")})`;
};

export async function renderOgPng({ title, eyebrow, footer, cover }: OgCard) {
  const { default: satori } = await import("satori");
  const { Resvg } = await import("@resvg/resvg-js");

  const fontSize = cover ? 56 : title.length > 70 ? 54 : title.length > 40 ? 64 : 76;
  const background = cover
    ? `${await coverUri(cover)} 0 0 / cover`
    : "radial-gradient(circle at 15% 0%, #1f1f23 0%, #09090b 55%, #000000 100%)";
  const textColumn: Record<string, string | number> = cover ? { marginLeft: 448 } : {};

  const tree = box(
    {
      width: 1200,
      height: 630,
      boxSizing: "border-box",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: 72,
      color: "#fafafa",
      fontFamily: "Inter",
      background,
    },
    [
      box(
        {
          fontSize: cover ? 22 : 26,
          fontWeight: 600,
          letterSpacing: 4,
          textTransform: "uppercase",
          color: "#7dd3fc",
          ...textColumn,
        },
        eyebrow,
      ),
      box(
        {
          fontSize,
          fontWeight: 700,
          lineHeight: 1.1,
          letterSpacing: -2,
          ...textColumn,
        },
        title,
      ),
      box(
        {
          fontSize: 28,
          color: "#a1a1aa",
          borderTop: "2px solid #27272a",
          paddingTop: 28,
          ...textColumn,
        },
        footer,
      ),
    ],
  );

  const svg = await satori(tree as never, {
    width: 1200,
    height: 630,
    fonts: await loadFonts(),
  });
  return new Resvg(svg).render().asPng();
}
