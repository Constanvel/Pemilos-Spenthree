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
- `src/styles.css`: token warna terang/gelap dan tampilan responsif, lebar produk maksimal 410px.
- `src/App.jsx`: shell dan navigasi aplikasi.

Ikon menggunakan `lucide-react` yang dibundel secara lokal, tanpa CDN. Tema mengikuti pengaturan terang/gelap perangkat.

## Mencoba pemilihan

1. Tekan **Mulai memilih** atau **Surat suara**.
2. Masukkan `DEMO-2026` atau gunakan pengisian otomatis. Spasi di awal/akhir dan huruf kecil diterima.
3. Baca profil tiga kandidat, pilih satu, lalu tekan **Lanjutkan**.
4. Periksa pilihan, centang persetujuan, lalu tekan **Kirim suara demo**. Persetujuan direset setiap kali masuk ke konfirmasi dan setelah reload.
5. Bukti `PM-2026-DEMO` tidak memuat nama kandidat. Gunakan **Ulangi demo** untuk menghapus sesi dan mulai kembali.

Status disimpan di `sessionStorage` dengan key `pemilos-spenthree-demo-v1`, terbatas pada sesi tab. Reload mempertahankan akses dan status sudah memilih. Setelah pengiriman, pilihan kandidat dihapus dari state dan penyimpanan. Input kode, error, dan persetujuan tidak disimpan. Jika penyimpanan browser tidak tersedia, aplikasi tetap berjalan di memori.

**Batasan keamanan:** kode demo dan penguncian sesi hanya perilaku frontend, bukan autentikasi atau perlindungan suara ganda. `sessionStorage` dapat diubah pengguna. Aplikasi tidak memiliki backend, rekapitulasi, atau jaminan kerahasiaan pemilihan produksi.

## Pengujian browser

```sh
npx playwright install chromium
npm run test:e2e
```

Playwright menjalankan server sendiri di port 4173. Skenario diuji pada desktop terang dan mobile gelap, termasuk alur lengkap, reload, privasi bukti, reset, serta lebar layar 320–1440px. Tes komponen dan reducer menggunakan Vitest + Testing Library. GitHub Actions menjalankan lint, tes, build, dan tes browser pada push/PR.

## Build dan hosting

`npm run build` menghasilkan `dist/` yang dapat di-host sebagai situs statis. `base: './'` mendukung penempatan di subdirektori. Tidak membutuhkan variabel lingkungan atau server API. Navigasi layar menggunakan state React, bukan URL route.

## Pengembangan lanjutan

- `src/data/candidates.js`: data kandidat dan program contoh.
- `src/state/election.js`: reducer, guard navigasi, dan persistensi demo.
- `e2e/voting.spec.js`: pengujian browser.

Untuk pemilihan resmi, implementasikan verifikasi pemilih, otorisasi server, transaksi suara atomik, perlindungan suara ganda, dan kebijakan audit/privasi terlebih dahulu; jangan mengandalkan kode demo atau state browser.

## Aset referensi

Logo PNG base64 dari HTML belum tersedia sebagai berkas di workspace saat port ini dibuat. Header menggunakan ikon sekolah sementara, bukan logo resmi. Ganti ikon pada `src/App.jsx` dengan aset asli saat berkas logo tersedia.
