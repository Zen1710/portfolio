---
title: Personal portfolio
summary: This site. A static SvelteKit portfolio on Cloudflare Workers, with Markdown content, drafts, and a changelog built from GitHub commits.
date: 2026-11
stack: [sveltekit, typescript, tailwindcss]
repo: https://github.com/Zen1710/portfolio
demo: https://portfolio.foxizen1710.workers.dev
draft: true
---

## What it is

A portfolio for recruiters, with a detail page for each project and a series of build logs. It is the second version of my portfolio: the first was built with Next.js, and this one rebuilds it in SvelteKit with a new design. Adding a project or a log is a matter of adding one Markdown file.

## How it works

- Every page is rendered ahead of time and served as static files by Cloudflare Workers, with under 50 KB of JavaScript on first load.
- Content lives in Markdown files whose frontmatter is checked with Zod at build time. Drafts show up while I develop locally and never on the live site, and sections with nothing published hide themselves.
- The changelog lists commits from this repo and from each project's repo. They are fetched at build time, and a GitHub Actions workflow rebuilds the site every morning so the list stays current.
- Each page gets its own Open Graph image, generated at build time, and the site ships a hash-based Content Security Policy.

## What I would do next

Write a short sentence here about what you want to improve.
