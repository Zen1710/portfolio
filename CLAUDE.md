# Portfolio v2 Naufal Rizky Ananda

Pengganti portfolio v1 (`~/Developer/projects/portofolio`, Next.js) dengan konten dan tujuan yang sama. Stack: SvelteKit statis + Tailwind v4, di-host di Cloudflare Workers Static Assets.

- **Progress:** baca `docs/PROGRESS.md` sebelum mulai kerja. Di akhir setiap sesi kerja, tambahkan entri log bertanggal dan perbarui Status serta checklist-nya.
- **Istilah dan keputusan:** pakai istilah dari `GLOSSARY.md`. Keputusan besar yang baru dicatat sebagai ADR di `docs/adr/`.
- **Ringan itu syarat:** jangan tambah dependency yang ikut terkirim ke browser tanpa alasan. Budget-nya: JS awal < 50 KB gzip, Lighthouse mobile ≥ 95 (ADR 0001).
- **Desain:** sistem visual yang berlaku ada di `DESIGN.md` (Code Bridge), sumber gambarnya `design/portofolio_v2.pen` (buka lewat MCP `pencil`, jangan pakai Read). Ikuti alur `impeccable` → Pen → kode.
- **Branch dan deploy:** kerja di `develop`, lalu merge ke `main` kalau sudah siap tayang. Deploy hanya kalau Naufal yang minta. Tunjukkan dulu **Checklist sebelum deploy** di `docs/PROGRESS.md`.
- **Konten nyata saja:** fakta tentang Naufal (project, pengalaman, link, bio) hanya berasal dari Naufal sendiri atau dari konten v1. Data contoh hanya dipakai sementara.
