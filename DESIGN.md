---
name: Naufal Rizky Ananda · Portfolio v2 (Code Bridge)
description: A developer's résumé as a small, honest piece of software. One trail-blue field with pixel glyphs, then plain, mono-labelled data on a night ground.
colors:
  night: "#07090b"
  surface: "#121416"
  wash: "#161a1d"
  line: "#1e262c"
  ink: "#e9eef2"
  muted: "#9fb0bb"
  subtle: "#6c7a84"
  action: "#1fb5e9"
  trail: "#0a78b4"
  trail-bright: "#1fb5e9"
  live: "#3dcb7a"
  on-field: "#ffffff"
  field-mist: "#eaf6fc"
typography:
  display:
    fontFamily: "Silkscreen, IBM Plex Mono, monospace"
    fontSize: "2.125rem"
    fontWeight: 400
    lineHeight: 1.2
  headline:
    fontFamily: "Silkscreen, IBM Plex Mono, monospace"
    fontSize: "2.75rem"
    fontWeight: 400
    lineHeight: 1.15
  name:
    fontFamily: "Silkscreen, IBM Plex Mono, monospace"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.2
  title:
    fontFamily: "Instrument Sans Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.3125rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.015em"
  lead:
    fontFamily: "Instrument Sans Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.25rem, 1.1rem + 0.4vw, 1.375rem)"
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Instrument Sans Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  prose:
    fontFamily: "Instrument Sans Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "IBM Plex Mono, ui-monospace, monospace"
    fontSize: "0.8125rem"
    fontWeight: 600
    letterSpacing: "0.2em"
  chip:
    fontFamily: "IBM Plex Mono, ui-monospace, monospace"
    fontSize: "0.8125rem"
    fontWeight: 500
    lineHeight: 1.45
  nav:
    fontFamily: "IBM Plex Mono, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    letterSpacing: "0.08em"
  caption:
    fontFamily: "IBM Plex Mono, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    letterSpacing: "0.04em"
rounded:
  sm: "4px"
  md: "6px"
  lg: "8px"
  full: "9999px"
spacing:
  gutter-mobile: "16px"
  gutter-tablet: "32px"
  gutter-desktop: "64px"
  heading-gap: "28px"
  section-gap-mobile: "64px"
  section-gap-desktop: "96px"
  row: "28px"
components:
  color-field:
    backgroundColor: "{colors.trail}"
    textColor: "{colors.on-field}"
    height: "27.5rem"
  status-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.muted}"
    rounded: "{rounded.lg}"
    padding: "24px"
  tech-chip:
    backgroundColor: "{colors.wash}"
    textColor: "{colors.ink}"
    typography: "{typography.chip}"
    rounded: "{rounded.sm}"
    padding: "0.12em 0.55em"
  link:
    textColor: "{colors.action}"
  button-outline:
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "8px 16px"
  button-outline-on-field:
    textColor: "{colors.on-field}"
    rounded: "{rounded.sm}"
    size: "36px"
  section-heading:
    textColor: "{colors.ink}"
    typography: "{typography.label}"
  section-heading-index:
    textColor: "{colors.action}"
    typography: "{typography.label}"
  nav-item:
    textColor: "{colors.subtle}"
    typography: "{typography.nav}"
  nav-item-active:
    textColor: "{colors.ink}"
    typography: "{typography.nav}"
  draft-mark:
    textColor: "{colors.subtle}"
    padding: "0 6px"
---

# Design System: Naufal Rizky Ananda · Portfolio v2 (Code Bridge)

## Overview

**Creative North Star: "The Code Bridge"**

The site reads like a small, honest piece of software rather than a brochure. Every page has one committed field of trail blue carrying white pixel glyphs (heart, arrow, plus, star) and a Silkscreen headline; everything after it is plain data on a near-black night ground, labelled in mono and separated by hairlines. The pixel layer is the only ornament, and it stays faint: a 12% glyph scatter on the desktop field, three small edge glyphs on mobile.

Density is calm and editorial. Home is a two-column bridge on desktop: a sticky identity column on the left (field, status card, scrollspy nav, Download CV) and a scrolling column of numbered sections on the right. Detail pages swap the field for a hairline top bar and a pixel-set title, with a sticky section index on the left. Motion is one gesture repeated: a gradient light trail that marks where you are (scrollspy) or how long something lasted (Experience), drawn in CSS with no animation library.

The palette is binding and comes from Naufal's Arknights-inspired GitHub profile: black and blue, used as colour and mood only. No official game art, logos, or other Hypergryph assets, and no heavy decoration; an ornate "operator file" treatment was rejected before.

**Key Characteristics:**
- One trail-blue field per page, identical in dark and light themes, with white text and glyphs on it.
- Three faces with fixed jobs: Silkscreen for identity and titles, Instrument Sans for reading, IBM Plex Mono for data.
- Action blue marks what you can click.
- Hairline structure, flat surfaces, a single lifted card.
- The light trail is the signature interaction, done in CSS (scroll-driven where supported).
- Pixel SVGs for arrows and glyphs, rendered with crisp edges; never Unicode arrows.

## Colors

A near-black, faintly blue-cast neutral ramp with two blues: a deep trail blue for the one field, a bright action blue for interaction.

### Primary
- **Trail Blue** (`trail`): the field behind the home identity column and mobile header, the full-bleed 404/error page, every OG card, the selection highlight, and the body of Experience trails. Carries `on-field` white text and glyphs. Unchanged in light theme.
- **Signal Blue** (`trail-bright`): the hot end of every light trail (scrollspy marker, Experience trail head). Same hex as dark-theme `action` but a separate role: it does not shift in light theme.

### Secondary
- **Action Blue** (`action`): links, link underlines, the focus ring (2px outline, 3px offset), hover borders on outline buttons, project and build-log title underlines on hover. Light theme deepens it to `#0a6e9f` for contrast on pale grounds.

### Tertiary
- **Live Green** (`live`): availability only; the status dot in the status card and on the avatar. Never decorative.

### Neutral
- **Night** (`night`): page ground.
- **Graphite Surface** (`surface`): the status card.
- **Wash** (`wash`): tech-chip fill.
- **Hairline** (`line`): every border and divider, list rules, table rules, the Experience baseline.
- **Ink** (`ink`): titles, active nav, first About paragraph, table first column.
- **Muted Slate** (`muted`): reading text, summaries, org names.
- **Subtle Slate** (`subtle`): dates, captions, inactive nav, footer, idle trail lines.
- **On-field White** (`on-field`) and **Field Mist** (`field-mist`): text on the blue field; mist is the softer tint for the mono line on the error page and OG card.

**Light theme** (`:root[data-theme='light']`) overrides only the neutrals and action: night `#f2f5f7`, surface `#ffffff` (white status card lifting off the pale ground), wash `#e1e7eb`, line `#c9d3d9`, ink `#0e1214`, muted `#4a5862`, subtle `#66737c`, action `#0a6e9f`. Dark is the default; the choice is stored in `localStorage` and applied before paint.

### Named Rules
**The Clickable Blue Rule.** Action blue means "you can click this". The build's only non-interactive uses are the two-digit section numerals and the tech-chip logos, both carried from the approved frames as small marks; do not extend action blue to any other static text, fill, or decoration.

**The One Field Rule.** Trail blue appears as one committed field per surface (desktop field 27.5rem tall, mobile header, error page, OG card). It is never tinted, gradient-filled, or repeated as section backgrounds, and it does not change with the theme.

## Typography

**Display Font:** Silkscreen (with IBM Plex Mono, monospace)
**Body Font:** Instrument Sans Variable (with ui-sans-serif, system-ui, sans-serif)
**Label/Mono Font:** IBM Plex Mono 400/500/600 (with ui-monospace, monospace)

**Character:** A pixel face announces the person and the page title like a boot screen; a warm grotesque carries the reading; a mono face handles everything that is data. Numbers are tabular site-wide.

### Hierarchy
- **Display** (Silkscreen 400, 24px mobile / 34px desktop, 1.2): the home headline on the field, white, `text-wrap: wrap`.
- **Headline** (Silkscreen 400, 32px mobile / 44px desktop, 1.15, max 24ch): Project and Build Log titles. The error page runs it larger (36px / 56px, max 22ch) on the field.
- **Name** (Silkscreen 400, 16px): the name next to the grayscale avatar.
- **Title** (Instrument Sans 600, 18px mobile / 21px desktop, -0.015em): Project rows; Build Log rows go to 22px. Prose `h2` is 28px 600, -0.02em.
- **Lead** (Instrument Sans 400, clamp 20–22px, 1.45, ink): the first About paragraph; Contact's sentence (20px / 22px).
- **Body** (Instrument Sans 400, 16px mobile / 17px desktop, 1.55–1.6, muted): summaries and About. Status card copy uses line-height 2 so chips sit inline.
- **Prose** (Instrument Sans 400, 18px, 1.7, max 44rem): detail-page Markdown.
- **Label** (Plex Mono 600, 13px, 0.2em, uppercase): numbered section headings ("01 About").
- **Chip** (Plex Mono 500, 13px): tech chips.
- **Nav** (Plex Mono 400, 12px, 0.08em home / 0.12em detail index, uppercase; active 600): scrollspy items.
- **Caption** (Plex Mono 400, 12px, 0.04em, uppercase, subtle): dates, year ticks, figure captions. Table heads and the footer use 11px with 0.18em / 0.06em tracking.

### Named Rules
**The Three Faces Rule.** Silkscreen, Instrument Sans, IBM Plex Mono, and nothing else. Each keeps its job: pixel for name, headline, and page titles; sans for reading; mono for labels, dates, chips, numbered headings, nav, and the changelog.

**The Pixel Restraint Rule.** Silkscreen is set at 400 with `font-synthesis: none`, never faux-bolded or letter-spaced, and never used for reading text or labels.

## Layout

Home on desktop (lg, 1024px+) is a centred grid up to 90rem with columns 40fr / 42fr, a 64px gap, and 64px right padding. The left column is sticky and full viewport height (scrolls internally if needed), padded 72px vertically and 48px (64px at xl) horizontally; the blue field sits behind its top 27.5rem and the status card straddles the field's lower edge. The right column is a vertical stack of sections, 96px apart, starting 96px from the top. Section heading to content is 28px; sections use a 64px scroll margin.

Below lg everything stacks: the blue header (identity, theme toggle, headline) runs edge to edge with 16px / 32px gutters, the status card follows, then the sections 64px apart. There is no nav on mobile and the Download CV button moves to Contact.

Detail pages: a hairline top bar (identity, mono links, theme toggle), a header with back link, pixel title, summary, meta row, and chips, then a 18.75rem sticky section index beside a 44rem reading column (64px gap) on lg. Gutters are 16px / 32px / 64px throughout.

Lists are full-width rows separated by hairlines (Projects 28px vertical padding, Changelog 14px), never grids of cards. The Changelog is a mono table-like grid: date 3.75rem, source 4.75rem (lg only), message.

## Elevation & Depth

The system is flat. Depth comes from the colour field against the night ground and from 1px hairlines. Exactly one element lifts: the status card, where it crosses the field's edge.

### Shadow Vocabulary
- **Straddle lift** (`box-shadow: 0 2px 6px rgb(0 0 0 / 0.2), 0 12px 32px rgb(0 0 0 / 0.25)`): the status card only.

### Named Rules
**The Single Lift Rule.** Only the card that bridges the field and the ground casts a shadow. Everything else is separated by hairlines or the field itself.

## Shapes

Small, square-leaning corners: 4px for chips, the theme toggle, and the Download CV button; 6px for project cover images; 8px for the status card. Circles are reserved for the grayscale avatar and the live dot (with a 2.5px ring in the ground or field colour). Trails are thin bars: 1px idle, 3px with 2px radius when active, 5px fully rounded on Experience. Pixel glyphs and arrows are SVG paths on 7×7 or 8×8 grids with `shape-rendering: crispEdges`, so their stair steps stay sharp. The Draft mark is a 1px-bordered mono stamp rotated -3deg.

## Components

### Buttons
Quiet outlines; colour arrives on hover.
- **Shape:** 4px radius, 1px `line` border, no fill.
- **Outline (Download CV):** ink text, Instrument Sans 600 14px, 8px 16px padding, 16px pixel-weight stroke icon before the label; hover turns the border action blue (200ms).
- **Theme toggle:** 36px square, 16px stroke icon (moon in dark, sun in light). On the field it uses white text with a white/40% border that goes solid white on hover.
- **Focus:** the global 2px action-blue outline with 3px offset.

### Links
- **Style:** action blue, 1px underline at 0.3em offset; hover thickens it to 2px. Mono links (status card, top bar, meta row) use Plex Mono 500.
- **Row links:** Project and Build Log rows are whole-row links; the title gains an action-blue underline and the summary brightens from muted to ink on hover.
- **Arrows:** directional links carry the pixel arrow (right, left, or out at 0.62em), never a Unicode glyph.

### Chips
- **Style:** `wash` fill, 1px `line` border, 4px radius, Plex Mono 500 13px ink text, a small brand logo in action blue before the label.
- **Behaviour:** static, not interactive. Inline in sentences they follow English list rules ("A, B, and C"); under projects they wrap with 6px gaps.

### Cards / Containers
- **Status card:** the only card. `surface` fill, 1px `line` border, 8px radius, 24px padding, straddle-lift shadow. Holds the stack sentence with inline chips, a hairline divider, the live-dot availability line with "Get in touch", and GitHub/LinkedIn/Email.

### Navigation
- **Scrollspy (home, lg only):** mono 12px uppercase list, 14px apart. Idle items show a 28px 1px `subtle` line and subtle text; hover stretches the line to 48px in `muted` and brightens the text. The current section (top past 40% of the viewport; last one at page bottom) gets a 64px, 3px light trail from transparent trail blue to signal blue, with ink 600 text.
- **Section index (detail pages):** the same behaviour at 16px idle / 40px active, with action-blue two-digit numerals.

### Section Heading
Label type in ink, preceded by a two-digit action-blue numeral and a 14px gap. Numbering follows only the sections that are visible.

### Experience Trail (signature)
Each role is a hairline row with title, mono org, and a 24px track: a 1px baseline plus a 5px rounded trail positioned by start and end month, graded from transparent through trail blue (25%) to signal blue. Current roles end with a 2×13px ink cursor. A caption row below shows every second year and an ink "Now". Trails draw from left via `animation-timeline: view()` (entry 10% to cover 35%) when motion is allowed, and render fully drawn otherwise.

### Color Field and Pixel Glyphs (signature)
The trail-blue field carries white pixel glyphs placed as fractions of a 640×440 frame at 12% group opacity on desktop; the arrow glyph only shows from 1320px where it clears the headline. The mobile header uses three compact edge glyphs (18–20px, right edge) at 90% opacity. The error page and the 1200×630 OG cards reuse the same field and glyphs.

## Do's and Don'ts

### Do:
- **Do** keep one trail-blue field per surface with white text on it, the same in dark and light themes.
- **Do** reserve action blue for links, controls, focus, and hover states (plus the section numerals and chip logos already in the build).
- **Do** set titles and identity in Silkscreen 400 only, reading text in Instrument Sans, and every date, label, chip, and nav item in IBM Plex Mono.
- **Do** separate list items with 1px `line` hairlines and keep them as full-width rows.
- **Do** use the pixel arrow (PixelArrow or the prose bullet mask) for every arrow, with `shape-rendering: crispEdges`.
- **Do** mark position and duration with the gradient light trail, in CSS, honouring `prefers-reduced-motion`.
- **Do** keep glyphs off text: hide or move a glyph rather than let it sit on the headline.

### Don't:
- **Don't** use official Arknights art, logos, or other Hypergryph assets, or ornate "operator file" decoration.
- **Don't** add a fourth typeface, faux-bold Silkscreen, or use Silkscreen for body copy or labels.
- **Don't** put Projects, Experience, Build Logs, or Changelog entries in cards; the status card is the only card.
- **Don't** add shadows beyond the status card's straddle lift.
- **Don't** use Unicode arrows or icon-font glyphs for direction.
- **Don't** add a JavaScript animation library; motion stays in CSS within the 50 KB gzip JS budget.
- **Don't** use live green for anything other than availability.
