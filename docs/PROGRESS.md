# Progress

Log pengembangan portfolio v2. Entri terbaru di atas. Bagian **Status** dan **Langkah berikutnya** selalu menggambarkan keadaan terkini.

## Status

- **Tahap:** desain, menunggu review Naufal di Pen. Arah visual terpilih: **Long Exposure** (direction contract di `.impeccable/surfaces/src-routes-page-svelte.md`). Scaffold SvelteKit sudah jadi (belum ada halaman nyata). Belum ada git maupun repo GitHub.
- **Pendahulu:** v1 di `~/Developer/projects/portofolio` (Next.js, repo `Zen1710/Porto`). Konten, copy, dan palette diambil dari sana.

## Langkah berikutnya

1. `git init` + commit pertama (tunggu izin Naufal).
2. Implementasi dari `design/portofolio_v2.pen`: loader konten Markdown + schema Zod, beranda, detail Project/Build Log, 404, OG image, Changelog.
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
