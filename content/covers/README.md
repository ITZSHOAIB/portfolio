# Blog covers

Every post cover uses one design: the Plico update-card language, adapted for a blog thumbnail. The frame, type, colours and layout stay fixed. Each post changes only its text and its illustration.

```
content/covers/
  kit/template.html            the fixed design; fills in a card's data
  kit/render.mjs               renders a card to content/public/images/blog/<slug>.jpg
  kit/draw.mjs                 helpers for drawing an illustration
  <slug>/card.json             the post's text
  <slug>/illustration.mjs      the post's picture, 568x482 (or a hand-made illustration.svg)
```

The folder name is the post's slug and the output file's name, so the post's frontmatter is `cover: /images/blog/<slug>.jpg`.

## Make one

1. Copy the closest existing folder to `content/covers/<slug>/`.
2. Edit `card.json` and draw a new illustration for this post (see below).
3. Render, then open the JPEG and look at it at full size and at thumbnail size:

   ```sh
   node content/covers/kit/render.mjs content/covers/<slug>
   ```

   It needs Microsoft Edge and ffmpeg. Set `EDGE` to use another Chromium binary. The page loads Geist from Google Fonts, so render online.

## card.json

```json
{
  "eyebrow": "SPEC → CASES → PROMPT",
  "title": "Eval-Driven\nDevelopment",
  "sub": "Tried on a small model.",
  "chip": ["15 cases", "*× 5* trials"],
  "topics": ["evals", "llm", "testing"],
  "tabs": ["Gemini", "llama3.2", "Plico"]
}
```

| Field | Where | Rule |
| --- | --- | --- |
| `eyebrow` | Above the title, accent mono, caps | The post's idea in three to five words, often an arrow chain. |
| `title` | 74px | The post's subject, not its full title. Two lines, split with `\n`, 12 characters or fewer per line. |
| `sub` | Below the title, accent | One line, about 32 characters. Keeps the full title's tail or angle. |
| `chip` | Top right box | Two or three short parts. Wrap the accented part in `*stars*`. |
| `topics` | Bottom left | The post's main tags. |
| `tabs` | Bottom right | Tools or projects the post uses. "Blog" is always added first and highlighted. |
| `seed` | Optional | Changes the star field. Defaults to 11. |

## The illustration

Every post gets its own drawing, made for that post's idea. Don't reuse another post's picture with new labels:

| Post | Drawing |
| --- | --- |
| eval-driven-development | Trial cards with pass dots, a baseline card, and a magnifier on the failing trial |
| harness-engineering | A dark MODEL cube on a cream harness plate, guide and sensor blocks wired to it, and a ratchet wheel |
| package-by-feature | The agent's search path: five red hops across five layer folders, then one green hop into `checkout/`, which holds all five files |

What changes is the picture. What stays is how it's drawn:

- **Objects, not diagrams.** Cream solids with a 2px ink outline: a light top face, plain front faces, and the `#dots` halftone on the right-hand face. Isometric boxes or tilted cards both work.
- **One dark hero object** when there's a central thing, such as the model: a dark face with an accent outline and the `#adots` halftone.
- **Mono labels** in Geist Mono: accent on dark, ink on cream, muted for captions. Leader lines end in a dot.
- **Colour means something.** Green is good, grouped or fixed. Red is failing, scattered or regressed. Grey is not involved. Accent marks what the post is about.
- **A dotted shadow** on the floor under the drawing, and two small plus marks.
- **Real content only.** Labels, numbers and names come from the post or its figures. The cover should still make sense after someone has read the post.
- **Readable as a thumbnail.** At a third of its size, the shape should still tell the story without the labels.

### Drawing it

The drawing is 568x482 and sits to the right of the title. Either:

- write `<slug>/illustration.mjs`, which builds the SVG with the helpers in `kit/draw.mjs` and default-exports it (see harness-engineering and package-by-feature), or
- hand-write `<slug>/illustration.svg` with `viewBox="0 0 568 482"` and `font-family="Geist Mono,monospace"` (see eval-driven-development).

`render.mjs` uses the `.mjs` when both exist. `draw.mjs` has the colours (`C`), the `svg` wrapper with the halftone patterns, an isometric projection (`isoAt`), `box`, text on a box's faces, `tag`, `lead`, `shadow` and `plus`. Draw boxes back to front.

| Colour | Hex | Use |
| --- | --- | --- |
| Background | `#0a0b0b` | Page, card header bars, card outlines and ink |
| Line | `#232928` | Rails, rules, chip and tab borders |
| Text | `#eef2f0` | Title |
| Muted | `#8b9693` | Site name, secondary text |
| Accent | `#62bfa8` | Eyebrow, subtitle, chip highlight, card labels, active tab |
| Card | `#e6ece9`, top `#f4f7f5`, highlight `#d3ded9` | Card faces |
| Card text | `#0a0b0b`, soft `#50685b`, rule `#b9c6c0`, grey `#75867e` | Text and lines on cards |
| Good | `#0f6e5c` | Passing, grouped, fixed |
| Bad | `#b5452f` on cards, `#e8836b` in the lens | Failing, scattered, regressed |

## Fixed by the template

Don't change these for a single post. If the design changes, change `kit/template.html` and re-render every cover:

- 1200x630, rendered at 2x and downscaled to a JPEG (quality 4, about 90 KB).
- The frame: side rails 32px in, rules under the header and above the footer, the ruler, plus marks at the corners, and a seeded star field kept clear of text and the illustration.
- Header `sohab.dev / blog`, Geist 74px title, the text column 76px in from the left rail and centred vertically, and the illustration box at 590, 92.
