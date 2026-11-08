# Progress

Log pengembangan portfolio v2. Entri terbaru di atas. Bagian **Status** dan **Langkah berikutnya** selalu menggambarkan keadaan terkini.

## Status

- **Tahap:** live di https://portfolio.foxizen1710.workers.dev (deploy otomatis dari `main` lewat Cloudflare Workers Builds). Sebelumnya: desain, menunggu review Naufal di Pen. Arah visual: **Code Bridge** (desain Nova di Pen, layout dua kolom ala v1; direction contract di `.impeccable/surfaces/src-routes-page-svelte.md`). Long Exposure ditinggalkan. Beranda sudah jadi dari desain (Hero, About, Projects, Experience, Build Logs, Changelog, Contact). Halaman detail Project/Build Log, 404, OG image per halaman, dan sitemap juga sudah jadi. Git lokal di `develop`, belum ada repo GitHub.
- **Pendahulu:** v1 di `~/Developer/projects/portofolio` (Next.js, repo `Zen1710/Porto`). Konten, copy, dan palette diambil dari sana.

## Langkah berikutnya

1. Repo GitHub baru, Wrangler, deploy pertama ke Workers, workflow rebuild harian (ADR 0004).
2. Pilih varian desain beranda: Long Exposure (Archivo) atau Code Bridge (Silkscreen + Instrument Sans).
3. Review akhir `impeccable` (finish reviewer), lalu tulis `DESIGN.md`.

## Menunggu dari Naufal

- [x] Review desain di Pen (revisi: daftar Project dan tagline seperti v1, foto bulat + nama di header).
- [ ] Email dan CV (`static/cv.pdf`), sama seperti v1.
- [ ] Foto hero final: sekarang pakai foto stock Unsplash sementara (lihat catatan di bawah).

## Checklist sebelum deploy

- [x] JS awal < 50 KB gzip (45,3 KB), Lighthouse mobile ≥ 95 di semua kategori (situs live 8 Nov: 99/100/100/100).
- [x] Subdomain akun `workers.dev`: `foxizen1710`, jadi situsnya `https://portfolio.foxizen1710.workers.dev`; `siteUrl`, `robots.txt`, dan README sudah disesuaikan.
- [ ] Secret `GITHUB_TOKEN` di Cloudflare, workflow rebuild harian aktif.
- [ ] Buat site Web Analytics di dashboard Cloudflare, lalu isi env build `PUBLIC_CF_BEACON_TOKEN` di Workers Builds (snippet dan CSP sudah siap; tanpa token, script analytics tidak dimuat).
- [x] Setelah deploy, cek header di situs live (`curl -I`): semua header dari `_headers` terkirim di halaman, cache `immutable` di `/_app/immutable/*`. Catatan: respons 404 hanya membawa `nosniff`.
- [ ] Saat pindah ke domain sendiri: aktifkan HSTS di Cloudflare (domain `.dev` termasuk `workers.dev` sudah HSTS-preload, domain baru belum tentu).
- [ ] Cek preview OG di salah satu link Project (mis. lewat LinkedIn Post Inspector).

## Log

### 2026-11-08: Deploy pertama ke Cloudflare

- Repo GitHub `Zen1710/portfolio` (public) dibuat dan di-push oleh Naufal. Cloudflare Workers Builds tersambung ke `main` (build `pnpm run build`, deploy `npx wrangler deploy`). Build di Cloudflare lolos, termasuk paket native OG (`@resvg/resvg-js`).
- Persiapan: `.node-version` 24, `packageManager: pnpm@12.15.0`, Wrangler devDep, `pnpm-workspace.yaml` dengan `allowBuilds` untuk esbuild dan workerd (pnpm 12 menggagalkan install kalau build script belum disetujui).
- Situs live: `https://portfolio.foxizen1710.workers.dev`. Dicek: header keamanan, cache immutable, 404, OG, sitemap, tampilan desktop. Lighthouse mobile (lokal, Chrome headless): Performance 99, Accessibility 100, Best Practices 100, SEO 100; LCP 2,0 s, TBT 0 ms, CLS 0,018.
- URL lama `portfolio.naufalrizkyananda.workers.dev` diganti ke URL asli di `siteUrl`, `robots.txt`, README.
- Changelog di situs live kosong: build Cloudflare gagal membaca GitHub API tanpa token (repo dilewati). Perlu `GITHUB_TOKEN`.

### 2026-11-08: Versi light Code Bridge

- Digambar di Pen: "Desktop / Home — Code Bridge (light)", "Mobile / Home — Code Bridge (light)", "Desktop / Project detail — Code Bridge (light)". Bidang biru, teks putih di atasnya, dan dekor pixel tetap sama; latar, garis, dan teks memakai token light.
- Satu perubahan token: `surface` light jadi `#FFFFFF` supaya kartu status terangkat dari latar `#F2F5F7`.
- Dicek di browser: toggle ke light di beranda desktop sesuai desain.

### 2026-11-08: Ganti ke desain Code Bridge

- Naufal memilih desain "Code Bridge" buatan Nova di Pen, dengan layout seperti v1 (kolom kiri sticky + kanan scroll). Font diringkas jadi 3: Silkscreen (headline, judul halaman, nama), Instrument Sans (teks), IBM Plex Mono (label, tanggal, chip, judul section bernomor). Archivo dan foto Long Exposure dihapus, `sharp` tidak dipakai lagi.
- Beranda: `SidePanel` (bidang biru + `PixelDecor`, identitas, headline pixel, `StatusCard`, `ScrollspyNav`, tombol CV) dan kolom kanan dengan section bernomor otomatis (nomor mengikuti section yang tampil). Mobile: header biru dengan dekor ringkas, lalu kartu status dan section.
- Detail Project/Build Log: `TopBar`, header simpel (judul pixel, ringkasan, meta mono, chip), `ArticleLayout` dengan indeks bagian bernomor dari heading `##` (heading kini punya `id`), preview gambar dari `cover` di halaman Project.
- 404: layar biru dengan dekor pixel, teks "Nothing was built at this address." OG image: kartu biru + glyph pixel + judul Silkscreen.
- `pnpm check` 0 error, 9 tes lolos, build lolos. JS awal ~45,3 KB gzip. Dicek di browser: desktop 1440 (sticky + scrollspy jalan), mobile 390 (tanpa scroll horizontal), detail Project, 404, OG.

### 2026-11-08: Varian desain "Code Bridge"

- Frame baru di Pen: "Desktop / Home — Code Bridge (dark)", salinan layout v1 dengan isi dan palette yang sama, tapi font dan style UI dari style Saturated Code Bridge: Silkscreen (headline, nama), Instrument Sans (body), IBM Plex Mono (label, chip), Fragment Mono (tanggal, data).
- Panel kiri jadi bidang biru `#0A78B4` + pixel decor 12% opacity, dengan Status Card gelap (tagline, availability, link) yang menimpa batas bidang. Komponen baru `Tech Chip / Mono`; komponen dan frame lama tidak diubah.
- Menunggu pilihan Naufal: tetap Archivo/Long Exposure atau pindah ke varian ini.

### 2026-11-08: Security headers dan Web Analytics

- Pakai `security-audit` mode guidance (bukan audit penuh). Situs statis tanpa input pengguna, jadi fokusnya CSP dan header.
- CSP lewat `csp` SvelteKit `mode: 'hash'` di `vite.config.ts`, terkirim sebagai `<meta>` per halaman: tanpa `unsafe-inline` untuk script; hash script tema dihitung dari `src/app.html` saat config dibaca (tidak bisa basi); Cloudflare Insights diizinkan di `script-src`/`connect-src`; `style-src-attr 'unsafe-inline'` hanya untuk atribut `style:` Svelte; `object-src 'none'`, `form-action 'none'`, `base-uri 'self'`.
- `static/_headers`: `frame-ancestors 'none'` + `X-Frame-Options: DENY` (tidak bisa lewat meta), `nosniff`, `Referrer-Policy`, `Permissions-Policy`, `COOP`, cache `immutable` untuk `/_app/immutable/*`.
- Web Analytics: snippet manual di `+layout.svelte`, hanya muncul kalau `PUBLIC_CF_BEACON_TOKEN` diisi saat build (`src/env.ts`, public + static). Dicek: dengan token dummy tag-nya muncul, tanpa token tidak ada.
- Dicek di build produksi (`pnpm preview`): script tema dan hydration jalan di bawah CSP, font dan style termuat.

### 2026-11-08: Halaman detail, 404, OG image, sitemap

- `/projects/[slug]`: judul besar, ringkasan, tanggal + Repository + Live demo, chip tech, cover duotone (`mix-blend-mode: luminosity` di atas biru, `brightness(0.55)` supaya screenshot terang tidak jadi bidang putih), isi Markdown, navigasi project lebih baru/lama.
- `/build-logs/[slug]`: tanggal + perkiraan menit baca, judul, ringkasan, isi (tabel ikut gaya `prose-dark`).
- 404: `+error.svelte` dengan foto malam redup. `adapter-static` menulis `404.html` (`fallback`), dipakai Workers lewat `not_found_handling`.
- OG image: `src/lib/server/og.ts` (satori + resvg + sharp `tint`), endpoint `/og/[...key]` di-prerender untuk beranda, tiap Project, dan tiap Build Log. Meta OG/Twitter/canonical lewat `Seo.svelte`, URL dari `profile.siteUrl`.
- `sitemap.xml` (prerender) dan `robots.txt` menunjuk ke sitemap.
- `prerender.handleUnseenRoutes`: rute detail boleh kosong selama belum ada yang Published, rute lain yang tidak terjangkau tetap menggagalkan build.
- `@types/node` + `"types": ["$app/types", "node"]` di `tsconfig.json` untuk kode build-time.
- `pnpm check` 0 error, 8 tes lolos, `pnpm build` lolos. JS awal beranda ~43,6 KB gzip.

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
