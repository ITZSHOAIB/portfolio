// The agent's search path for one change, "add discount codes to checkout".
// By layer it hops through five folders to find checkout's files (red);
// by feature it makes one hop into checkout/, where all five are (green).
import { C, box, isoAt, leftText, plus, shadow, svg } from "../kit/draw.mjs";

const CELL = 74, TILE = 48, EDGE = 16;
let s = shadow(300, 452, 256, 20);

// A row of folders on a board, with each folder's name printed on the board's front edge.
function row(iso, names, files, color, hops) {
  let out = box(iso, 0, 0, -EDGE, CELL * (names.length + 1), CELL, EDGE);
  names.forEach((name, i) => {
    out += leftText(iso, (i + 1) * CELL + 3, CELL, -EDGE + 4.5, name, `fill="${C.ink}" font-size="9"`);
  });
  // the agent, in the first cell
  const m = (CELL - 26) / 2;
  out += box(iso, m, m, 0, 26, 26, 26, { top: C.dark, left: C.ink, right: C.ink, line: C.accent, sw: 1.5, halftone: "adots" });
  // folders: a tab at the back, the body, and files standing in it
  names.forEach((_, i) => {
    const x = (i + 1) * CELL + (CELL - TILE) / 2, y = (CELL - TILE) / 2;
    out += box(iso, x, y, 0, 18, 8, 17, { halftone: false, sw: 1.5 }) + box(iso, x, y + 6, 0, TILE, TILE - 6, 13, { sw: 1.5 });
    for (let f = 0; f < files[i]; f++) {
      out += box(iso, x + 8 + f * 6, y + 16, 13, 4, 18, 11, { top: color, left: color, right: color, halftone: false, sw: 1.2 });
    }
  });
  // hops: arcs from cell to cell, numbered where they land
  const at = (i, z) => iso(i * CELL + CELL / 2, CELL / 2, z);
  for (let i = 0; i < hops; i++) {
    const a = at(i, i ? 30 : 30), b = at(i + 1, 30);
    out += `<path d="M${a.join(" ")}Q${(a[0] + b[0]) / 2} ${Math.min(a[1], b[1]) - 30} ${b.join(" ")}" fill="none" stroke="${color === C.red ? C.redOnDark : C.accent}" stroke-width="2.5" stroke-dasharray="5 4"/>`;
    if (hops > 1) out += `<circle cx="${b[0]}" cy="${b[1]}" r="8.5" fill="${C.red}" stroke="${C.ink}" stroke-width="1.5"/><text x="${b[0]}" y="${b[1] + 3.5}" fill="${C.top}" font-size="10" text-anchor="middle">${i + 1}</text>`;
  }
  return out;
}
const caption = (x, y, title, line, color, anchor) =>
  `<text x="${x}" y="${y}" fill="${C.muted}" font-size="11" letter-spacing="1" text-anchor="${anchor}">${title}</text>` +
  `<text x="${x}" y="${y + 19}" fill="${color}" font-size="12.5" text-anchor="${anchor}">${line}</text>`;

s += row(isoAt(72, 104), ["controllers/", "services/", "repositories/", "schemas/", "tests/"], [1, 1, 1, 1, 1], C.red, 5);
s += caption(4, 50, "BY LAYER", "5 hops · 5 folders", C.redOnDark, "start");

s += row(isoAt(140, 262), ["checkout/", "cart/", "billing/"], [5, 0, 0], C.green, 1);
s += caption(4, 352, "BY FEATURE", "1 hop · 1 folder", C.accent, "start");

s += plus(548, 40) + plus(22, 440);
export default svg(s);
