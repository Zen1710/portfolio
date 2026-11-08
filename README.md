# Naufal Rizky Ananda — Portfolio

Personal portfolio, version 2. A fully static SvelteKit site served by Cloudflare Workers. Live at [portfolio.foxizen1710.workers.dev](https://portfolio.foxizen1710.workers.dev).

It replaces [v1](https://github.com/Zen1710/Porto), a Next.js build of the same site. The content and goals are the same; the stack, hosting, and design are new. The reasoning behind the bigger decisions is in [`docs/adr/`](docs/adr/), and the project's vocabulary (Project, Build Log, Draft, …) is in [`GLOSSARY.md`](GLOSSARY.md).

## Stack

- **SvelteKit + Svelte 5** with `adapter-static`: every page is prerendered, then hydrated for client-side navigation.
- **Tailwind CSS v4**, three self-hosted fonts (Silkscreen, Instrument Sans, IBM Plex Mono).
- **Markdown content** rendered at build time with `marked`, frontmatter validated with Zod. None of it ships to the browser.
- **Cloudflare Workers Static Assets** for hosting, Cloudflare Web Analytics for visits.
- **Open Graph images** generated per page at build with `satori` + `resvg`.
- Budget: initial JS under 50 KB gzip.

The design lives in [`design/portofolio_v2.pen`](design/) (made with [pen.dev](https://pen.dev)).

## Run it

Needs Node 24 and pnpm 12 (see `.node-version` and `packageManager`).

```bash
pnpm install
pnpm dev        # http://localhost:5173, drafts visible
pnpm test       # unit tests (frontmatter, Markdown, draft rules, changelog)
pnpm check      # svelte-check + TypeScript
pnpm build      # production build in build/, drafts hidden
pnpm preview    # serve the production build
```

## Add content

Everything a visitor reads lives in [`content/`](content/). Adding an item means adding a file; the layout never changes.

| What | Where |
| --- | --- |
| Name, headline, stack, links | `content/profile.ts` |
| About text | `content/about.md` |
| A Project | `content/projects/<slug>.md` |
| A Build Log | `content/build-logs/<slug>.md` |
| Experience | `content/experience.ts` |
| Project preview images | `static/projects/<slug>.png`, referenced as `cover` |
| CV | `static/cv.pdf` (the Download CV links appear once it exists) |
| Changelog | nothing to write: it lists commits from this repo and every visible Project's `repo` |

Project frontmatter:

```yaml
---
title: My app
summary: One sentence on what it does.
date: 2026-10          # or 2026-10-26
stack: [sveltekit, typescript, postgresql]
repo: https://github.com/you/my-app    # optional
demo: https://my-app.example.com       # optional
cover: /projects/my-app.png            # optional, file in static/
draft: true            # visible locally only; remove to publish
---
```

Build Logs take `title`, `summary`, `date`, and `draft`. Each `##` heading becomes an entry in the page's numbered section index. A frontmatter mistake fails the build with the file name and the field, so nothing half-filled reaches the live site.

**Draft and Published:** an entry with `draft: true` shows up in `pnpm dev` with a Draft mark and never on the live site. A section with nothing Published disappears along with its nav item and number, and so does any empty link in `content/profile.ts`.

## Changelog

Built from GitHub commits of this repo (`sourceRepo` in `content/profile.ts`) and of every visible Project that has a `repo`. Merge commits and commits mentioning Claude are skipped, and only the first line of each message is shown. Commits are fetched once per build, so the list refreshes on every deploy. Set `GITHUB_TOKEN` at build time to raise GitHub's API rate limit; without it the build still works and skips repos it cannot read.

## Deploy

Cloudflare Workers Builds deploys `main`: build command `pnpm build`, deploy command `npx wrangler deploy` (config in [`wrangler.jsonc`](wrangler.jsonc)). `pnpm run deploy` does the same from a local machine (plain `pnpm deploy` is a different, built-in pnpm command).

Optional build variables:

- `GITHUB_TOKEN`: raises the GitHub API rate limit for the Changelog.
- `PUBLIC_CF_BEACON_TOKEN`: Cloudflare Web Analytics site token. Without it, no analytics script is added.

Security headers are in [`static/_headers`](static/_headers); the Content Security Policy is generated per page by SvelteKit (`csp` in [`vite.config.ts`](vite.config.ts)).

Work happens on `develop` and is merged into `main` when it is ready to go live.
