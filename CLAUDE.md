# my-portofolio

Personal portfolio site for Bayon Mbayo.

## Content

`content/*.md` (about.md, projects.md, contact.md) are the source of truth for site copy. Edit these files directly — the build (see below) picks up the changes automatically. Do not hand-edit generated HTML in `_site/`.

## Stack

Static site built with Eleventy (11ty). No client-side JavaScript.

- `src/index.njk` + `src/_includes/base.njk` — page template (layout/structure only, no copy).
- `src/_data/*.js` — read and parse `content/*.md` into the data the templates render.
- `style.css` (project root) — visual design, passthrough-copied into the build as-is.
- `npm run build` — one-off build to `_site/`.
- `npm run dev` — local dev server with live reload at `http://localhost:8080`.

The old hand-written root `index.html` is kept for now but is no longer the source of truth — `_site/index.html` (generated) is.
