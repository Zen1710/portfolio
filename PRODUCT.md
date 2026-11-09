# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

SvelteKit (Svelte 5) with `adapter-static`, Vite, Tailwind CSS v4, TypeScript, pnpm. Every page is prerendered, then hydrated with client-side navigation. Content is Markdown with frontmatter, rendered and schema-validated at build. Hosted free on Cloudflare Workers Static Assets with Cloudflare Web Analytics; deploys from a new public GitHub repo via Workers Builds. Starts on `*.workers.dev`, moves to a custom domain later. See `docs/adr/`.

## Users

Recruiters and hiring managers screening Naufal Rizky Ananda for full-time or remote roles. They arrive from a CV, LinkedIn, or a job application, skim for a minute or two, and decide whether to reach out, download the CV, or move on. Engineers reviewing a candidate may also open the public repo.

## Product Purpose

A personal portfolio that helps a junior full-stack developer get hired. Success is a Recruiter contacting Naufal (by email or LinkedIn) or downloading the CV. It is not a storefront: nothing on the site is for sale.

## Positioning

Naufal builds full-stack web apps end to end, from database to UI. Primary stack: TypeScript and Next.js, plus Vue and Svelte on the frontend and Node.js (Express), Go, and PostgreSQL on the backend. The site itself is the first proof: it is a rebuild of his Next.js portfolio (v1, `Zen1710/Porto`) in SvelteKit, its decisions are documented in public (ADRs, Build Logs), and it is measurably light.

## Operating Context

- Content is added over time by Naufal editing Markdown files and pushing to GitHub; the layout must never need changes to add a Project, Experience, or Build Log.
- Every item is either Draft (visible in local dev only) or Published (visible on the live site). Sections and nav items with nothing Published are hidden automatically, as are social links and the CV button when their value or file is missing.
- At launch nothing is Published: the live site shows the Hero, About, and Contact only.
- Shared links (especially to single Projects) are a real entry point: each page gets its own Open Graph image generated at build.

## Capabilities and Constraints

- Sections: Hero, About, Projects (each with a simple detail page), Experience (timeline), Build Logs (each with a detail page), Changelog, Contact.
- Changelog: commits pulled at build time from this site's GitHub repo and every visible Project's repo, refreshed by a daily scheduled rebuild (see `docs/adr/0004-changelog-scheduled-rebuild.md`).
- Contact: no form. Visible email and LinkedIn links (plus GitHub). There is no server, no secret, and no runtime endpoint.
- Performance budget: initial JS under 50 KB gzip, Lighthouse mobile 95 or higher in every category.
- English only. The site opens dark; a theme toggle switches to light and the choice is remembered in the browser.
- Social links: GitHub, LinkedIn, Email only.
- Terminology is defined in `GLOSSARY.md` (Recruiter, Project, Experience, Build Log, Changelog, Draft, Published).

## Brand Commitments

- Name shown: Naufal Rizky Ananda. Role: Fullstack Developer.
- Headline: "Hi, welcome to my corner of the internet." (changed 2026-11-09 to a simple greeting).
- Description (meta description and home OG image): "I build full-stack web apps, from database to UI."
- Stack line: "I work mostly with TypeScript and Next.js, plus Vue on the frontend and Node.js, Go, and PostgreSQL on the backend."
- Availability: open to full-time and remote roles.
- Palette is binding: Arknights-inspired black and blue, matching the GitHub profile (black `#121416`, deep blue `#0A78B4` for fills, bright blue `#1FB5E9` for accents on black). Used as colour and mood only: no official game art, logos, or other Hypergryph assets, and no heavy decoration (an ornate "operator file" treatment was rejected before).
- Layout, typography, and component style are open: v1's references (wahyusyahputra.com, brittanychiang.com, antfu.me) are no longer binding. Must not look like generic AI-generated UI.

## Evidence on Hand

- Content carried over from v1 (`~/Developer/projects/portofolio/content/`): `about.mdx`, `profile.ts`, `experience.ts`, Projects `katalogweb`, `whitefly-detection`, `phone-catalogue`, `portfolio-site`, and Build Log `01-designing-before-coding`. All are Draft and some still hold placeholder sentences Naufal must finish.
- Project covers in v1 `public/projects/`.
- Photo: a formal ID photo to be cropped to a circle and rendered grayscale; replaceable by swapping one file.
- GitHub (https://github.com/Zen1710) and LinkedIn (https://www.linkedin.com/in/naufalrizkyananda). Email and CV are not supplied yet. Never fabricate content; empty sections stay hidden.

## Product Principles

1. Real over impressive: show only what is true and finished; hide what is not.
2. Recruiter-first: name, role, and a way to make contact are always within reach.
3. Content grows without redesign: adding a file is the only step to add an item.
4. The site is itself evidence of craft: clean code, documented decisions, careful details, and a small, fast build.
