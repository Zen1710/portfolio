---
version: 1
slug: "src-routes-page-svelte"
primary_target: "src/routes/+page.svelte"
related_targets: []
---

# Surface brief: home (`/`)

Scope: the home page plus the shell that Project and Build Log detail pages, 404, and OG cards inherit. Mode: Persuade (the Recruiter decides whether to contact Naufal or download the CV).

Audience and job: Recruiters skimming for one or two minutes from a CV or LinkedIn link. Action: email, LinkedIn, or download CV, reachable from the first viewport (status card, CV button) and again at the Contact section. Proof: real Projects, Experience, Build Logs, and a Changelog of real commits. Constraints: locked palette and copy (PRODUCT.md), JS < 50 KB gzip, Lighthouse mobile ≥ 95, nothing Draft on the live site.

Chosen direction: Code Bridge (designed in Pen by Nova, picked by Naufal on 2026-11-08), replacing the earlier Long Exposure direction. Layout follows v1: sticky left column, scrolling right column. Source frames: "Desktop / Home — Code Bridge (dark)" and the Code Bridge mobile, detail, 404, and OG frames in `design/portofolio_v2.pen`.

## Direction contract

THESIS: A developer's résumé as a small, honest piece of software: a trail-blue field with pixel glyphs and a pixel-set headline, then plain, mono-labelled data. It refuses the glossy hero and the card grid.

OWN-WORLD: Night ground #07090B, surfaces #121416, hairlines #1E262C, one committed field of trail blue #0A78B4 carrying white pixel glyphs (heart, arrow, plus, star) and the Silkscreen headline. Three faces only: Silkscreen (headline, page titles, name), Instrument Sans (reading text), IBM Plex Mono (labels, dates, chips, numbered section headings). #1FB5E9 is reserved for things you can click.

STORY: The Recruiter sees name, headline, stack, availability, and contact in the left column without scrolling; the numbered sections on the right prove it; Contact closes the page.

FIRST VIEWPORT: Desktop: left column 40/82 of the width, sticky full height; blue field 27.5rem tall behind the identity row (photo, pixel name, square theme toggle) and the 34px pixel headline; the status card (tagline with mono tech chips, availability + Get in touch, GitHub/LinkedIn/Email) straddles the field's edge; scrollspy nav below; Download CV at the bottom. Right column starts with "01 ABOUT". Mobile: blue header with identity and headline, then the status card, then sections; no nav.

FORM: Code Bridge (user-pinned; the decision-page roll and its Long Exposure pick are superseded). seed: none (unavailable). Signature interaction: the scrollspy marks the current section with a long light trail; the Experience trails draw as they enter the viewport (scroll-driven CSS, no JS).

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Unresolved

- Light theme rendition of Code Bridge is not drawn yet; code falls back to the light tokens with the blue field unchanged.
