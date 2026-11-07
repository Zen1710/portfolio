# Progress

Log pengembangan portfolio v2. Entri terbaru di atas. Bagian **Status** dan **Langkah berikutnya** selalu menggambarkan keadaan terkini.

## Status

- **Tahap:** desain, menunggu review Naufal di Pen. Arah visual terpilih: **Long Exposure** (direction contract di `.impeccable/surfaces/src-routes-page-svelte.md`). Beranda sudah jadi dari desain (Hero, About, Projects, Experience, Build Logs, Changelog, Contact). Halaman detail Project/Build Log, 404, dan OG image belum. Git lokal di `develop`, belum ada repo GitHub.
- **Pendahulu:** v1 di `~/Developer/projects/portofolio` (Next.js, repo `Zen1710/Porto`). Konten, copy, dan palette diambil dari sana.

## Langkah berikutnya

1. Halaman detail Project (`/projects/[slug]`) dan Build Log (`/build-logs/[slug]`), lalu 404.
2. OG image per halaman (`satori` + `resvg`, ADR 0005), sitemap, robots.
3. Security headers (`_headers`), Wrangler, workflow rebuild harian.
3. Review akhir `impeccable` (finish reviewer), lalu tulis `DESIGN.md`.

## Menunggu dari Naufal

- [x] Review desain di Pen (revisi: daftar Project dan tagline seperti v1, foto bulat + nama di header).
- [ ] Email dan CV (`static/cv.pdf`), sama seperti v1.
- [ ] Foto hero final: sekarang pakai foto stock Unsplash sementara (lihat catatan di bawah).

## Checklist sebelum deploy

- [ ] JS awal < 50 KB gzip, Lighthouse mobile ≥ 95 di semua kategori.
- [ ] Subdomain akun `workers.dev` sudah dipilih, base URL di config sudah benar.
- [ ] Secret `GITHUB_TOKEN` di Cloudflare, workflow rebuild harian aktif.
- [ ] Snippet Cloudflare Web Analytics terpasang dan diizinkan CSP di `_headers`.
- [ ] Cek preview OG di salah satu link Project (mis. lewat LinkedIn Post Inspector).

## Log

### 2026-11-08: Loader konten dan beranda

- Konten v1 dipindah ke `content/` (`.mdx` → `.md`), `profile.ts` dan `experience.ts` ikut (subpath import `#content/*`). `siteUrl` diganti ke `workers.dev`, `sourceRepo` dikosongkan sampai repo GitHub ada. Cover Project dan `cv.pdf` disalin ke `static/`.
- Loader: `import.meta.glob` raw Markdown + parser frontmatter (`yaml`) + schema Zod (`src/lib/content/types.ts`) + `marked`. Semua di `src/lib/server/`, jadi tidak ikut ke browser. Chip tech dibuat di server (path SVG `simple-icons` dikirim sebagai data), jadi icon set tidak masuk bundle.
- Changelog dipindah dari v1, `fetch` disuntikkan supaya bisa dites. `GITHUB_TOKEN` didefinisikan di `src/env.ts` (`defineEnvVars`, SvelteKit 3) dan dibaca dari `$app/env/private`.
- SvelteKit 3: subpath import harus pakai ekstensi (`#lib/format.ts`), karena tsconfig bawaan memakai `allowImportingTsExtensions`.
- Beranda: Hero (foto duotone lewat `mix-blend-mode: color`, shutter terbuka sekali saat load, header dengan foto + nama, tagline berchip), Experience sebagai jejak cahaya (animasi `animation-timeline: view()`, tanpa JS), Projects ala v1, Build Logs, Changelog, penutup + footer. Hero tetap gelap di tema light.
- Vitest: 8 tes (frontmatter, visibility, changelog). `pnpm check` 0 error, `pnpm build` lolos. JS awal ~42 KB gzip (budget 50 KB).
- Dicek di browser Pen: desktop 1180px, mobile 390px (tanpa scroll horizontal), tema light.

### 2026-11-08: Scaffold SvelteKit

- `sv create` (template minimal, TypeScript) versi 1.3.0: SvelteKit 3, Svelte 5, Vite 8, TypeScript 6. Konfigurasi SvelteKit sekarang ada di `vite.config.ts` (tidak ada `svelte.config.js`).
- Tailwind CSS v4 lewat `sv add tailwindcss`, `adapter-static` (output `build/`), `prerender = true` di `src/routes/+layout.ts`.
- `wrangler.jsonc` untuk Workers Static Assets (`assets.directory = ./build`, `not_found_handling = 404-page`). Wrangler belum di-install.
- Token warna dari file `.pen` di `src/routes/layout.css`, font Archivo variable (sumbu `wdth`) self-host lewat `@fontsource-variable/archivo`, script tema inline di `src/app.html` (dark default, light dari `localStorage`).
- `pnpm check` 0 error, `pnpm build` lolos. Total JS gzip ~31 KB untuk halaman placeholder.

### 2026-11-07: Sesi desain (grilling)

- Keputusan: SvelteKit statis + Tailwind v4 (ADR 0001), Cloudflare Workers Static Assets (ADR 0002), konten Markdown saat build (ADR 0003), Changelog di-rebuild harian (ADR 0004), OG image per halaman (ADR 0005).
- Form kontak dihapus, kontak cukup lewat email + LinkedIn.
- Desain ulang lewat `impeccable` + pen.dev. Isi dan palette tetap sama dengan v1.
- Domain: `workers.dev` dulu, domain sendiri menyusul. Repo GitHub baru, `Porto` di-archive.
- `GLOSSARY.md` disalin dari v1.
- `PRODUCT.md` ditulis. Arah visual dipilih lewat decision page `impeccable` (ronde 1 re-roll, ronde 2 pilih Long Exposure).
- Desain di `design/portofolio_v2.pen`: beranda desktop dark/light, mobile dark, state launch, detail Project, detail Build Log, 404, template OG. Font Archivo. Foto hero sementara dari Unsplash (lewat Generate stock Pen), cover Project disalin dari v1 ke `design/images/`.
