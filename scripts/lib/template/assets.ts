import { Resvg } from "@resvg/resvg-js";

// Placeholder images for the starter. Shapes only, no text, so they render the same
// on every machine (no font needed) and are obviously not a real person.

const BG = "#0f172a";
const FG = "#64748b";
const ACCENT = "#94a3b8";

const render = (svg: string, width: number) =>
  Buffer.from(new Resvg(svg, { fitTo: { mode: "width", value: width } }).render().asPng());

const portrait = (size: number) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="${BG}"/>
  <circle cx="256" cy="200" r="88" fill="${FG}"/>
  <path d="M96 512c0-96 72-168 160-168s160 72 160 168z" fill="${FG}"/>
</svg>`;

const social = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${BG}"/>
  <circle cx="240" cy="315" r="96" fill="${FG}"/>
  <rect x="400" y="260" width="520" height="28" rx="14" fill="${ACCENT}"/>
  <rect x="400" y="320" width="360" height="20" rx="10" fill="${FG}"/>
  <rect x="400" y="360" width="440" height="20" rx="10" fill="${FG}"/>
</svg>`;

// `inset` shrinks the mark so a maskable icon keeps it inside the safe zone.
const icon = (inset: number) => `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="${BG}"/>
  <circle cx="256" cy="256" r="${160 - inset}" fill="${ACCENT}"/>
</svg>`;

/** A one-page PDF with a few lines of text, written by hand so no library is needed. */
export function minimalPdf(lines: string[]) {
  const escape = (text: string) => text.replace(/[\\()]/g, "\\$&");
  const stream = `BT /F1 14 Tf 72 720 Td 18 TL ${lines.map((line) => `(${escape(line)}) Tj T*`).join(" ")} ET`;
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>",
    `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`,
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
  ];
  let pdf = "%PDF-1.4\n";
  const offsets = objects.map((body, index) => {
    const offset = pdf.length;
    pdf += `${index + 1} 0 obj\n${body}\nendobj\n`;
    return offset;
  });
  const xref = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  pdf += offsets.map((offset) => `${String(offset).padStart(10, "0")} 00000 n \n`).join("");
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`;
  return Buffer.from(pdf, "latin1");
}

/** Files for content/public/, keyed by path relative to it. */
export function starterAssets(): Map<string, Buffer> {
  return new Map([
    ["images/profile.png", render(portrait(512), 512)],
    ["images/og-image.png", render(social, 1200)],
    ["icon-32.png", render(icon(0), 32)],
    ["icon-180.png", render(icon(0), 180)],
    ["icon-512.png", render(icon(0), 512)],
    ["icon-maskable-512.png", render(icon(40), 512)],
    ["resume.pdf", minimalPdf(["Your resume goes here.", "Replace content/public/resume.pdf with your own."])],
  ]);
}
