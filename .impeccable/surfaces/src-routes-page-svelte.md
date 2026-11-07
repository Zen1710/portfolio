---
version: 1
slug: "src-routes-page-svelte"
primary_target: "src/routes/+page.svelte"
related_targets: []
---

# Surface brief: home (`/`)

Scope: the home page (one long page with all sections) plus the shared shell that Project and Build Log detail pages inherit. Mode: Persuade (the Recruiter decides whether to contact Naufal or download the CV).

Audience and job: Recruiters skimming for one or two minutes from a CV or LinkedIn link. Action: email, LinkedIn, or download CV, reachable from the first viewport and again at the close. Proof: real Projects, Experience, Build Logs, and a Changelog of real commits. Constraints: locked palette and copy (PRODUCT.md), JS < 50 KB gzip, Lighthouse mobile ≥ 95, nothing Draft on the live site.

Chosen direction: Long Exposure (round 2, code-led). Composition reference: `.impeccable/decision/exposure.html`.

## Direction contract

THESIS: A career shown as one long exposure: a night road photographed with the shutter open, blue light trails crossing the frame, and everything Naufal has built set in that light. It refuses the developer-portfolio default of a sticky name column beside a stack of project cards.

OWN-WORLD: Night ground #07090b under #121416 surfaces; every image (hero photograph, Project covers, portrait) flattened to one blue duotone between #07090b and #1FB5E9, no other hue anywhere. Text #E9EEF2, secondary #9FB0BB. #1FB5E9 is reserved for things you can click. One family, Archivo variable: hierarchy by scale and width axis only (wide and tight for display, normal width for reading, tabular figures for dates). Hairline 1px rules #1E262C. Small uppercase credits at the foot of blocks like photo captions.

STORY: In one viewport the Recruiter knows who (name, role, availability), what (the headline and stack line), and how to reach him. Scrolling, they read About, see Projects each with a small origin ticket (date, stack, repo), follow Experience along one unbroken trail with a "now" mark, skim Build Logs and the commit log, and end at a large email link.

FIRST VIEWPORT: Full-bleed long-exposure photograph, trails crossing the upper third. Top edge: the quick line, name, role, availability, and Email · LinkedIn · CV at the right. Lower left: headline at about 84px, wide-width Archivo, two lines max on desktop; stack line below at 19px; then Email, LinkedIn, Download CV as underlined text links. Bottom right: caption credit "Exposure 2018–2026 · Bengkulu, Indonesia". Theme toggle sits in the quick line.

FORM: Long Exposure, candidate 4 of 7 on the grounded list (re-roll round 1). seed:c4a296c068d6a63e. Signature interaction: the shutter opens once on load (the photo exposes left to right via a mask sweep, about 900 ms, ease-out, content already visible), and the Experience trail draws as it enters the viewport with the "now" mark at its end. Reduced motion shows the final state. State is marked, not coloured: visited Projects get a small tick, the current section in the quick line gets an underline, Drafts in dev get a "Draft" stamp.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Unresolved

- Hero photograph: needs a real, license-clear long-exposure night road photo (Unsplash/Pexels), converted to blue duotone AVIF. Not sourced yet.
- Light theme rendition of the duotone (likely an inverted duotone on a pale ground) to be drawn in Pen.
