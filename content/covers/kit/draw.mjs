// Drawing helpers for cover illustrations. An <slug>/illustration.mjs imports these
// and default-exports the SVG string; render.mjs runs it.

export const C = {
  ink: "#0a0b0b", face: "#e6ece9", top: "#f4f7f5", dark: "#16201c", grey: "#b9c6c0",
  muted: "#8b9693", accent: "#62bfa8", green: "#0f6e5c", red: "#b5452f", redOnDark: "#e8836b",
};
const f = (n) => +n.toFixed(1);

// The 568x482 canvas, with the halftone patterns: #dots (ink), #adots (accent), #shadow.
export const svg = (body) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 568 482" font-family="Geist Mono,monospace"><defs>` +
  `<pattern id="dots" width="4" height="4" patternUnits="userSpaceOnUse"><circle cx="1.5" cy="1.5" r=".9" fill="${C.ink}"/></pattern>` +
  `<pattern id="adots" width="4" height="4" patternUnits="userSpaceOnUse"><circle cx="1.5" cy="1.5" r=".8" fill="${C.accent}"/></pattern>` +
  `<pattern id="shadow" width="6" height="6" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r=".8" fill="#34443d"/></pattern>` +
  `</defs>${body}</svg>\n`;

// The dotted floor shadow under the drawing, and the small plus marks.
export const shadow = (cx, cy, rx, ry) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="url(#shadow)"/>`;
export const plus = (x, y) => `<path d="M${x - 7} ${y}h14M${x} ${y - 7}v14" stroke="#34443d"/>`;

// Isometric projection: isoAt(originX, originY) returns (x, y, z) => [screenX, screenY].
// +x runs right and down, +y runs left and down, +z is up.
export const isoAt = (ox, oy) => (x, y, z = 0) => [f(ox + (x - y) * 0.866), f(oy + (x + y) * 0.5 - z)];
export const poly = (pts, attrs) => `<path d="M${pts.map((p) => p.join(" ")).join("L")}Z" ${attrs}/>`;

// A box with its three visible faces. The right face gets a halftone unless halftone is false.
// Draw boxes back to front (smaller x + y and lower z first).
export function box(iso, x, y, z, w, d, h, o = {}) {
  const a = `stroke="${o.line ?? C.ink}" stroke-width="${o.sw ?? 2}" stroke-linejoin="round"`;
  const top = [iso(x, y, z + h), iso(x + w, y, z + h), iso(x + w, y + d, z + h), iso(x, y + d, z + h)];
  const left = [iso(x, y + d, z + h), iso(x + w, y + d, z + h), iso(x + w, y + d, z), iso(x, y + d, z)];
  const right = [iso(x + w, y, z + h), iso(x + w, y + d, z + h), iso(x + w, y + d, z), iso(x + w, y, z)];
  return poly(left, `fill="${o.left ?? C.face}" ${a}`) + poly(right, `fill="${o.right ?? C.face}" ${a}`) +
    (o.halftone === false ? "" : poly(right, `fill="url(#${o.halftone ?? "dots"})"`)) + poly(top, `fill="${o.top ?? C.top}" ${a}`);
}

// Text lying on a box's top face (along +x) or printed on its front-left face.
export const topText = (iso, x, y, z, s, attrs = "") => {
  const [X, Y] = iso(x, y, z);
  return `<text transform="matrix(.866 .5 -.866 .5 ${X} ${Y})" ${attrs}>${s}</text>`;
};
export const leftText = (iso, x, y, z, s, attrs = "") => {
  const [X, Y] = iso(x, y, z);
  return `<text transform="matrix(.866 .5 0 1 ${X} ${Y})" ${attrs}>${s}</text>`;
};

// A flat mono label, and a leader line from a label to a point (ending in a dot).
export const tag = (x, y, s, o = {}) =>
  `<rect x="${x}" y="${y}" width="${f(s.length * 7.4 + 20)}" height="24" fill="${o.fill ?? C.ink}"${o.stroke ? ` stroke="${o.stroke}" stroke-width="1.5"` : ""}/>` +
  `<text x="${x + 10}" y="${y + 16.5}" fill="${o.color ?? C.accent}" font-size="12.5">${s}</text>`;
export const lead = (pts, color = C.muted) =>
  `<path d="M${pts.map((p) => p.join(" ")).join("L")}" fill="none" stroke="${color}" stroke-width="1.2"/>` +
  `<circle cx="${pts.at(-1)[0]}" cy="${pts.at(-1)[1]}" r="2.5" fill="${color}"/>`;
