# Pemilos Spenthree

Aplikasi React untuk simulasi pemilihan ketua OSIS SMP Negeri 3 Sokaraja. Port produk dari proof of concept HTML, tanpa iframe atau integrasi host.

> **Bukan sistem pemilihan produksi.** Semua kandidat dan data adalah contoh. Tidak ada suara yang dikirim ke sekolah.

## Menjalankan

Gunakan Node.js 22.12+ atau Node.js 24 dan npm.

```sh
npm install
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

## Aset referensi

Logo PNG base64 dari HTML belum tersedia sebagai berkas di workspace saat port ini dibuat. Header menggunakan ikon sekolah sementara, bukan logo resmi. Ganti ikon pada `src/App.jsx` dengan aset asli saat berkas logo tersedia.
