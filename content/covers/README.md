# Blog covers

Every post cover uses one design: the Plico update-card language, adapted for a blog thumbnail. The frame, type, colours and layout stay fixed. Each post changes only its text and its illustration.

```
content/covers/
  kit/template.html            the fixed design; fills in a card's data
  kit/render.mjs               renders a card to content/public/images/blog/<slug>.jpg
  <slug>/card.json             the post's text
  <slug>/illustration.svg      the post's picture, 568x482
```

The folder name is the post's slug and the output file's name, so the post's frontmatter is `cover: /images/blog/<slug>.jpg`.

## Make one

1. Copy the closest existing folder to `content/covers/<slug>/`.
2. Edit `card.json` and redraw `illustration.svg` (see the rules below).
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
| `illustration` | Optional | Another SVG file name in the folder. |

## Illustration rules

The SVG uses `viewBox="0 0 568 482"` and `font-family="Geist Mono,monospace"`. It sits to the right of the title. Start from an existing one and keep its parts:

- **Two cards**, tilted in opposite directions: a large one at `translate(14 52) rotate(-5)`, about 300x262, and a small one at `translate(352 92) rotate(7)`, about 196x204. Each has a lighter top face, a side face with the `#dots` halftone, a 2px ink outline, and a dark header bar with an accent label `01 / NAME`.
- **A magnifier** at `translate(400 368) scale(.86)`, showing four short lines from the story. Keep each line to about 15 characters, or it touches the ring.
- **A dotted shadow** ellipse under everything, and two small plus marks.
- **A single symbol per post**, repeated: dots for trials, squares for files, pills for harness parts. Filled green means good or grouped, red means a failure or a problem, an empty grey outline means not involved.
- **Real content only.** Labels, numbers and names come from the post. The cover should still make sense after someone has read it.

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
