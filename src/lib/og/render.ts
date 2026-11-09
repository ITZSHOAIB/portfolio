// Build-time only: renders a 1200x630 social card. Imported dynamically from
// prerendered endpoints so the native resvg binding never reaches the worker bundle.
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";

export type OgCard = { title: string; eyebrow: string; footer: string };

const require = createRequire(import.meta.url);
const fontDir = join(
  dirname(require.resolve("@fontsource/inter/package.json")),
  "files",
);

let fonts: Promise<
  { name: string; data: Buffer; weight: 400 | 600 | 700; style: "normal" }[]
> | null = null;

const loadFonts = () =>
  (fonts ??= Promise.all(
    ([400, 600, 700] as const).map(async (weight) => ({
      name: "Inter",
      data: await readFile(join(fontDir, `inter-latin-${weight}-normal.woff`)),
      weight,
      style: "normal" as const,
    })),
  ));

const box = (style: Record<string, string | number>, children: unknown) => ({
  type: "div",
  props: { style: { display: "flex", flexDirection: "column", ...style }, children },
});

export async function renderOgPng({ title, eyebrow, footer }: OgCard) {
  const { default: satori } = await import("satori");
  const { Resvg } = await import("@resvg/resvg-js");

  const fontSize = title.length > 70 ? 54 : title.length > 40 ? 64 : 76;

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
      background:
        "radial-gradient(circle at 15% 0%, #1f1f23 0%, #09090b 55%, #000000 100%)",
    },
    [
      box(
        {
          fontSize: 26,
          fontWeight: 600,
          letterSpacing: 4,
          textTransform: "uppercase",
          color: "#a1a1aa",
        },
        eyebrow,
      ),
      box(
        {
          fontSize,
          fontWeight: 700,
          lineHeight: 1.1,
          letterSpacing: -2,
        },
        title,
      ),
      box(
        {
          fontSize: 28,
          color: "#a1a1aa",
          borderTop: "2px solid #27272a",
          paddingTop: 28,
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
