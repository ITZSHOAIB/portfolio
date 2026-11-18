// A model on a harness plate: guides wired in, sensors wired out, and a ratchet beside it.
import { C, box, isoAt, lead, leftText, plus, poly, shadow, svg, tag, topText } from "../kit/draw.mjs";

const iso = isoAt(272, 238);
let s = shadow(272, 440, 240, 24);

// The plate is the harness.
s += box(iso, -140, -140, -14, 280, 280, 14);
s += leftText(iso, -118, 140, -10.5, "HARNESS", `fill="${C.ink}" font-size="10" letter-spacing="3"`);
s += poly([iso(-126, -126), iso(126, -126), iso(126, 126), iso(-126, 126)],
  `fill="none" stroke="${C.green}" stroke-width="1.2" stroke-dasharray="5 4"`);

// Wires along the plate: guides into the model, the model out to sensors.
const wire = (a, b) => `<path d="M${iso(...a).join(" ")}L${iso(a[0], b[1]).join(" ")}L${iso(...b).join(" ")}" fill="none" stroke="${C.ink}" stroke-width="1.4" stroke-dasharray="3 3"/>`;
s += wire([-82, 72], [-45, 20]) + wire([-10, 87], [10, 45]) + wire([72, -82], [20, -45]) + wire([87, -10], [45, 10]);

// A guide is a block with text lines on top; a sensor has a light, green when it passes.
const guide = (x, y) => box(iso, x, y, 0, 56, 56, 22) +
  [12, 22, 32].map((d) => `<path d="M${iso(x + 12, y + d, 22).join(" ")}L${iso(x + (d === 32 ? 30 : 44), y + d, 22).join(" ")}" stroke="${C.ink}" stroke-width="1.6"/>`).join("");
const sensor = (x, y, pass) => {
  const [cx, cy] = iso(x + 28, y + 28, 22);
  return box(iso, x, y, 0, 56, 56, 22) +
    `<ellipse cx="${cx}" cy="${cy}" rx="13" ry="7.5" fill="${pass ? C.green : C.red}" stroke="${C.ink}" stroke-width="1.5"/>`;
};

// Back to front.
s += guide(-138, 14) + sensor(14, -138, true);
s += box(iso, -45, -45, 0, 90, 90, 92, { top: C.dark, left: C.ink, right: C.ink, line: C.accent, sw: 1.5, halftone: "adots" });
s += topText(iso, -26, -4, 92, "MODEL", `fill="${C.accent}" font-size="17" letter-spacing="3"`);
s += guide(-38, 59) + sensor(59, -38, false);

s += `<text x="18" y="96" fill="${C.muted}" font-size="11" letter-spacing="1">GUIDES</text>`;
s += `<text x="550" y="96" fill="${C.muted}" font-size="11" letter-spacing="1" text-anchor="end">SENSORS</text>`;
s += lead([[78, 136], [78, 158], iso(-110, 42, 22)]) + tag(18, 112, "AGENTS.md");
s += lead([[54, 352], [130, 352], iso(-10, 87, 22)]) + tag(0, 340, "skills");
s += lead([[470, 134], [470, 158], iso(42, -110, 22)]) + tag(436, 110, "tests");
s += lead([[500, 262], iso(87, -10, 22)]) + tag(500, 250, "lint", { color: C.redOnDark });

// The ratchet: sawtooth teeth that only turn one way. Each mistake adds a rule.
const cx = 478, cy = 382, R = 44, r = 33, n = 12;
let teeth = "";
for (let i = 0; i < n; i++) {
  const a = (i / n) * 2 * Math.PI, b = ((i + 1) / n) * 2 * Math.PI;
  const p = (rad, t) => `${(cx + rad * Math.cos(t)).toFixed(1)} ${(cy + rad * Math.sin(t)).toFixed(1)}`;
  teeth += `${i ? "L" : "M"}${p(r, a)}L${p(R, a)}L${p(r, b)}`;
}
s += `<path d="${teeth}Z" transform="translate(4 5)" fill="${C.ink}"/>`;
s += `<path d="${teeth}Z" fill="${C.top}" stroke="${C.ink}" stroke-width="2" stroke-linejoin="round"/>`;
s += `<circle cx="${cx}" cy="${cy}" r="21" fill="url(#dots)" stroke="${C.ink}" stroke-width="1.5"/><circle cx="${cx}" cy="${cy}" r="7" fill="${C.ink}"/>`;
s += `<path d="M${cx + 54} ${cy - 18}A58 58 0 0 1 ${cx + 30} ${cy + 50}m0 0l2 -11m-2 11 -11 -3" fill="none" stroke="${C.accent}" stroke-width="2"/>`;
s += tag(cx - 150, cy + 22, "+1 rule", { stroke: C.accent });

s += plus(540, 30) + plus(24, 430);
export default svg(s);
