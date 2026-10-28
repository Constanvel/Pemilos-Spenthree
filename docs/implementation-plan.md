# Rencana implementasi paritas frontend Pemilos Spenthree

## Tujuan dan batas pekerjaan

Implementasikan ulang prototipe sebagai aplikasi React mandiri dengan tampilan dan perilaku yang setara. Acuan asli disimpan tanpa perubahan di `reference/frontend/`, termasuk `index.html`, `template.html`, `src/`, logo, `build.py`, dan README bawaan. Jangan menjalankan proses build yang menulis ulang acuan tersebut.

Pembungkus host, iframe, CSP, dan runtime `window.openai` tetap utuh di berkas referensi. Aplikasi React target tidak menyertakan pembungkus host/iframe maupun runtime OpenAI; logika presentasi dijalankan langsung oleh React. Perbedaan yang disengaja: status simulasi pada aplikasi target memakai `sessionStorage`, bukan `window.openai.widgetState`/`setWidgetState`. Penyimpanan ini hanya untuk demo dalam sesi browser, dapat dihapus, dan bukan autentikasi atau perlindungan suara ganda.

Tidak ada pekerjaan backend: tidak membuat API, database, autentikasi produksi, pengiriman suara nyata, atau perhitungan hasil. Kode `DEMO-2026`, data kandidat, dan bukti `PM-2026-DEMO` tetap data simulasi. Jangan melonggarkan CSP atau sandbox pada sumber referensi untuk menjalankan aplikasi target.

## Integritas sumber

Hash dihitung langsung dari berkas hasil ekstraksi dengan SHA-256, kemudian dibandingkan dengan seluruh delapan berkas salinan. Semua salinan cocok byte demi byte berdasarkan hash.

| Berkas di `reference/frontend/` | SHA-256 |
| --- | --- |
| `index.html` (berkas asli) | `1079a78b8f6f41999573d9ac8b472772161452ccc52910cd627ec90eebfcdb15` |
| `template.html` | `1079a78b8f6f41999573d9ac8b472772161452ccc52910cd627ec90eebfcdb15` |
| `assets/logo-sekolah-1.png` | `b6fea6c2f424a71e8224e70a39533a19ce58a98551e7802c79def755a913ee56` |
| `build.py` | `326be05439f0da8ce22189156d8d51bb6e04bb15cdbcab30ae92da3a64bd7c81` |
| `README.md` | `40a33f48e3a5e2149eb06c461b34d818f8c3d6a22c1ef10ea95e7c1d2e8f29cf` |
| `src/app.js` | `eed2eb0458431728211589b2919adeb4377d1eee45254c6e686b3e61e7a19577` |
| `src/styles.css` | `0701639cb19b0ea470fd745453ed2271cee0f1124207d1533cefbafc81473360` |
| `src/ui.html` | `9e5cdc35e6adc15c62f9546068d78b37cecab274dd37189a597dff6b49e9c2d8` |

## Empat tahap implementasi

### 1. Preservasi sumber dan rencana

- Simpan seluruh frontend asli di `reference/frontend/` tanpa mengubah isi, logo, iframe, CSP, maupun runtime pembungkus.
- Verifikasi hash sumber dan salinan; catat hash asli dan aset pada dokumen ini.
- Tetapkan batas paritas, perbedaan `sessionStorage`, matriks validasi, dan urutan pengerjaan sebelum implementasi fitur.
- Kriteria selesai: delapan berkas referensi cocok dengan sumber dan rencana tersedia.
- Commit setelah tahap selesai: `docs: preserve original frontend and implementation plan`.

### 2. Paritas kerangka, logo, CSS, beranda, dan panduan

- Adaptasikan kerangka React mandiri tanpa membawa pembungkus host atau runtime OpenAI.
- Gunakan logo asli tanpa menggambar ulang; pertahankan proporsi dan detailnya.
- Samakan token warna, font Arial/Helvetica/sans-serif, batas lebar aplikasi 410px, jarak, kartu, header, navigasi, ikon, serta tema terang/gelap dengan sumber.
- Samakan isi, susunan, dan navigasi layar `home` dan `guide`, termasuk responsivitas pada 320px dan 390px.
- Kriteria selesai: kerangka, logo, beranda, dan panduan setara secara visual dan interaksinya bekerja.
- Commit setelah tahap selesai: `feat: match original shell home and guide`.

### 3. Paritas akses, surat suara, profil, konfirmasi, dan sukses

- Implementasikan layar `access`, `ballot`, `profile`, `confirm`, dan `success` dengan isi serta detail visual dari acuan.
- Pastikan kode salah menampilkan error dan `DEMO-2026` membuka surat suara.
- Batasi pilihan ke satu kandidat; tombol lanjut hanya aktif setelah ada pilihan. Profil dan ringkasan konfirmasi harus menunjukkan kandidat yang benar.
- Izinkan perubahan pilihan sebelum pengiriman; wajibkan persetujuan sebelum tombol kirim aktif.
- Setelah pengiriman simulasi, arahkan akses surat suara ke bukti partisipasi tanpa nama kandidat. Reset demo harus menghapus status sesi dan mengembalikan alur awal.
- Pertahankan status simulasi melalui `sessionStorage`; tangani state tersimpan tidak valid dengan aman tanpa menambahkan cakupan backend.
- Kriteria selesai: seluruh alur demo dan penguncian presentasi setara dengan sumber, dengan perbedaan penyimpanan yang telah didokumentasikan.
- Commit setelah tahap selesai: `feat: match original voting flow`.

### 4. Validasi visual menyeluruh dan regresi

- Bandingkan tujuh layar (`home`, `access`, `ballot`, `profile`, `confirm`, `success`, `guide`) pada lebar 320px dan 390px, masing-masing dalam tema terang dan gelap: total 28 kombinasi visual.
- Periksa logo, tipografi, warna, jarak, susunan kartu, tombol, navigasi, overflow, dan keterbacaan di setiap kombinasi; koreksi selisih sebelum menyatakan selesai.
- Uji regresi untuk kode salah/benar, satu pilihan, tombol nonaktif, profil yang sesuai, perubahan pilihan, persetujuan, pengiriman, bukti tanpa kandidat, akses ulang setelah mengirim, pemulihan sesi, dan reset demo.
- Jalankan lint, unit test, build produksi, dan E2E menggunakan skrip proyek. Catat hasil sebenarnya dan kendala; jangan menyatakan pemeriksaan yang belum dijalankan sebagai lulus.
- Periksa kembali hash referensi untuk memastikan iframe, CSP, dan semua aset asli tetap tidak berubah.
- Kriteria selesai: seluruh matriks visual diperiksa dan lint/unit/build/E2E lulus, atau hambatan dilaporkan secara eksplisit.
- Commit setelah tahap selesai: `test: validate visual parity and voting regressions`.

## Status implementasi

- Tahap 1 selesai: `44552d1` menyimpan handover dan rencana.
- Tahap 2 selesai: `038e4a3` menyamakan kerangka, logo, beranda, panduan, dan CSS.
- Tahap 3 selesai: `a598543` menyamakan lima layar pemilihan; 20 tes unit/komponen lulus.
- Tahap 4 selesai: 28 kombinasi perbandingan geometri/teks/warna terhadap sumber, total 36 tes browser, lint, 20 tes unit/komponen, dan build lulus. Rincian serta batas klaim ada di [`validation.md`](validation.md).

## Kebijakan commit dan pengiriman

Buat commit terpisah setiap tahap/fitur selesai dan tervalidasi; jangan menggabungkan seluruh pekerjaan menjadi satu commit akhir. Jangan memasukkan perubahan yang tidak terkait. Setelah semua tahap selesai, pemeriksaan terakhir lulus, dan riwayat commit ditinjau, push seluruh commit ke remote pada akhir pekerjaan. Dokumen ini merupakan rencana, bukan klaim bahwa tahap implementasi atau pengujian sudah selesai.
