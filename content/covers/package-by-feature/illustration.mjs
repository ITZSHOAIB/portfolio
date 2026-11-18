// The same change, two layouts: checkout's file in each of five layer folders (red),
// then the same five files in one feature folder (green).
import { C, box, isoAt, plus, shadow, svg, tag } from "../kit/draw.mjs";

const layers = ["controllers/", "services/", "repositories/", "schemas/", "tests/"];
const n = layers.length;
let s = shadow(300, 444, 250, 22);

// By layer: one slab per folder, one tile per feature. Checkout is the third tile in each.
const stack = isoAt(150, 92);
const T = 40, GAP = 34;
for (let i = n - 1; i >= 0; i--) {
  const z = (n - 1 - i) * GAP - 150;
  s += box(stack, 0, 0, z, T * 4 + 12, T + 12, 8);
  for (let c = 0; c < 4; c++) {
    s += box(stack, 10 + c * T, 10, z + 8, T - 8, T - 8, 8, c === 2
      ? { top: C.red, left: "#8f3524", right: "#8f3524", halftone: false, sw: 1.5 }
      : { top: C.top, left: C.grey, right: C.grey, halftone: false, sw: 1.5 });
  }
  const [lx, ly] = stack(0, T + 12, z + 4);
  s += `<text x="${lx - 12}" y="${ly + 4}" fill="${C.muted}" font-size="12" text-anchor="end">${layers[i]}</text>`;
}

// By feature: one folder, the same five files stacked.
const col = isoAt(440, 150);
s += box(col, 0, 0, -150, 52, 52, 8);
for (let i = n - 1; i >= 0; i--) {
  s += box(col, 10, 10, -142 + (n - 1 - i) * 26, 32, 32, 20, { top: C.accent, left: C.green, right: C.green, sw: 1.5 });
}
s += tag(400, 128, "checkout/");

s += `<path d="M330 214C364 196 388 196 410 210" fill="none" stroke="${C.accent}" stroke-width="2" stroke-dasharray="5 4"/>`;
s += `<path d="M400 200l11 10-14 4" fill="none" stroke="${C.accent}" stroke-width="2"/>`;
s += `<text x="190" y="384" fill="${C.redOnDark}" font-size="12" text-anchor="middle">5 files · 5 folders</text>`;
s += `<text x="440" y="384" fill="${C.accent}" font-size="12" text-anchor="middle">5 files · 1 folder</text>`;

s += plus(24, 24) + plus(548, 420);
export default svg(s);
