# Pemilos Spenthree

Aplikasi React untuk simulasi pemilihan ketua OSIS SMP Negeri 3 Sokaraja. Port produk dari proof of concept HTML, tanpa iframe atau integrasi host.

> **Bukan sistem pemilihan produksi.** Semua kandidat dan data adalah contoh. Tidak ada suara yang dikirim ke sekolah.

## Menjalankan

Gunakan Node.js 22.12+ atau Node.js 24 dan npm.

```sh
npm ci
npm run dev
```

```sh
npm run lint
npm test
npm run build
npm run preview
```

## Struktur

- `src/pages/`: layar produk.
- `src/components/`: komponen tampilan bersama.
- `src/styles.css`: CSS produk dari handover, diformat ulang tanpa mengubah deklarasi; lebar konten maksimal 410px (412px termasuk border, sesuai sumber).
- `src/App.jsx`: shell dan navigasi aplikasi.

Ikon menggunakan `lucide-react` yang dibundel secara lokal, tanpa CDN. Tema mengikuti pengaturan terang/gelap perangkat.

## Mencoba pemilihan

1. Tekan **Mulai memilih** atau **Surat suara**.
2. Masukkan `DEMO-2026` atau tekan **Gunakan kode demo**. Spasi di awal/akhir dan huruf kecil diterima.
3. Baca profil tiga kandidat, pilih satu, lalu tekan **Lanjutkan**.
4. Periksa pilihan, centang persetujuan, lalu tekan **Kirim suara**. Persetujuan direset setiap kali masuk ke konfirmasi dan setelah reload.
5. Bukti `PM-2026-DEMO` tidak memuat nama kandidat. Gunakan **Ulangi demo** untuk menghapus sesi dan mulai kembali.

Status disimpan di `sessionStorage` dengan key `pemilos-spenthree-demo-v1`, terbatas pada sesi tab. Reload mempertahankan akses dan status sudah memilih. Setelah pengiriman, pilihan kandidat dihapus dari state dan penyimpanan. Input kode, error, dan persetujuan tidak disimpan. Jika penyimpanan browser tidak tersedia, aplikasi tetap berjalan di memori.

**Batasan keamanan:** kode demo dan penguncian sesi hanya perilaku frontend, bukan autentikasi atau perlindungan suara ganda. `sessionStorage` dapat diubah pengguna. Aplikasi tidak memiliki backend, rekapitulasi, atau jaminan kerahasiaan pemilihan produksi.

## Pengujian browser

```sh
npx playwright install chromium
npm run test:e2e
```

Playwright menjalankan server sendiri di port 4173. Skenario diuji pada desktop terang dan mobile gelap, termasuk alur lengkap, reload, privasi bukti, reset, serta lebar layar 320–1440px. `e2e/parity.spec.js` membandingkan ketujuh layar React dengan fragmen handover yang dirender terpisah pada 320px/390px dalam kedua tema: 28 kombinasi. Pemeriksaan mencakup geometri elemen, teks, font, warna, logo, dan overflow; bukan klaim kesamaan piksel seluruh pembungkus host. Ikon referensi dirender dengan Lucide lokal yang sama agar tidak memerlukan CDN. Screenshot pasangan tersedia di `test-results/` setelah tes. Tes komponen dan reducer menggunakan Vitest + Testing Library. GitHub Actions menjalankan lint, tes, build, dan tes browser pada push/PR.

## Build dan hosting

`npm run build` menghasilkan `dist/` yang dapat di-host sebagai situs statis. `base: './'` mendukung penempatan di subdirektori. Tidak membutuhkan variabel lingkungan atau server API. Navigasi layar menggunakan state React, bukan URL route.

## Pengembangan lanjutan

- `src/data/candidates.js`: data kandidat dan program contoh.
- `src/state/election.js`: reducer, guard navigasi, dan persistensi demo.
- `e2e/voting.spec.js`: pengujian browser.

Untuk pemilihan resmi, implementasikan verifikasi pemilih, otorisasi server, transaksi suara atomik, perlindungan suara ganda, dan kebijakan audit/privasi terlebih dahulu; jangan mengandalkan kode demo atau state browser.

## Aset referensi

Handover asli tersimpan di `reference/frontend/`, termasuk HTML lengkap, source terpisah, dan logo. Berkas referensi dipertahankan byte demi byte; `.gitattributes` mencegah normalisasi line ending. Jangan menjalankan `build.py` di direktori referensi untuk mengubah acuan.

Header menggunakan logo asli `src/assets/logo-sekolah-1.png`, identik dengan aset handover (920×931px), ditampilkan 38×38px dengan `object-fit: cover` dan radius lingkaran sesuai CSS sumber.

Rencana implementasi: [`docs/implementation-plan.md`](docs/implementation-plan.md). Hasil validasi: [`docs/validation.md`](docs/validation.md).

Perbedaan yang disengaja dari sumber:
- React mandiri tidak membawa iframe, pembungkus presentasi, CDN, atau runtime `window.openai`; sandbox/CSP HTML referensi tetap tidak disentuh.
- Persistensi menggunakan `sessionStorage` seperti dijelaskan di atas.
- Karakter pemisah rusak `�` pada fragmen UI dinormalisasi menjadi `·` pada React; berkas asli tidak diedit.
- Form, label kandidat yang unik, fokus navigasi, dan indikator keyboard ditambahkan tanpa mengubah susunan visual produk.
