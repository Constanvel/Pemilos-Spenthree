# Hasil validasi handover

Validasi lokal: 28 Oktober 2026, Windows, Node.js 24, Chromium melalui Playwright.

## Hasil

| Pemeriksaan | Hasil |
| --- | --- |
| `npm ci --no-audit --no-fund` | Berhasil setelah menghentikan server Vite lama yang mengunci esbuild |
| `npm run lint` | Lulus |
| `npm test` | 20 tes, 3 berkas, lulus |
| `npm run build` | Lulus; aset logo lokal disertakan di `dist/assets/` |
| `npx playwright test --workers=2` | 36 tes lulus |

## Perbandingan terhadap sumber

`e2e/parity.spec.js` merender `reference/frontend/src/ui.html`, CSS, dan logika produk asli pada halaman pembanding. Pembungkus host tidak dijalankan. Ikon `data-lucide` diganti renderer Lucide lokal yang sama dengan aplikasi; karakter separator rusak dinormalisasi pada halaman pembanding saja. Sumber disk tetap utuh.

Untuk masing-masing layar `home`, `access`, `ballot`, `profile`, `confirm`, `success`, dan `guide`, perbandingan dilakukan pada:

| Lebar | Tema/input | Jumlah layar | Hasil |
| --- | --- | --- | --- |
| 320px | Terang, desktop | 7 | Lulus |
| 390px | Terang, desktop | 7 | Lulus |
| 320px | Gelap, mobile/touch | 7 | Lulus |
| 390px | Gelap, mobile/touch | 7 | Lulus |

Total 28 kombinasi. Assertion membandingkan posisi relatif, ukuran (dibulatkan 0,1px), teks tanpa whitespace tata letak, font-size, warna teks, dan warna latar elemen utama: header, logo, judul, deskripsi, hero, kartu kandidat, profil, bukti, tombol, input, FAQ, navigasi, dan footer. Semua cocok. Screenshot pasangan disimpan sebagai `react.png` dan `handover.png` di subfolder setiap tes pada `test-results/` (tidak di-commit). Screenshot beranda terang dan surat suara gelap juga diperiksa secara visual.

Ini bukan perbandingan piksel seluruh HTML pembungkus presentasi. Rendering font dapat berbeda antar-OS. Tes tidak mengklaim kesamaan dengan versi CDN Lucide yang tidak dipatok oleh sumber.

## Regresi perilaku

- Kode salah, trim/uppercase kode demo, Enter, dan pengisian otomatis.
- Hanya satu kandidat; tombol lanjut nonaktif tanpa pilihan.
- Profil dan pemilihan kandidat yang benar, perubahan pilihan sebelum pengiriman.
- Persetujuan wajib dan direset ketika kembali ke konfirmasi atau reload.
- Pengiriman menghapus kandidat dari state/persistensi; bukti tidak menampilkan pilihan.
- Sesi terkunci setelah pengiriman, dapat dipulihkan setelah reload, dan dapat direset.
- FAQ dapat dibuka dengan keyboard; fokus navigasi tetap tersedia.
- Tidak ada overflow horizontal pada ukuran yang diuji; batas konten sumber 410px, ditambah border total 2px.

## Integritas referensi

HTML lengkap dan template memiliki SHA-256 `1079a78b8f6f41999573d9ac8b472772161452ccc52910cd627ec90eebfcdb15`. Logo aplikasi dan handover identik dengan SHA-256 `b6fea6c2f424a71e8224e70a39533a19ce58a98551e7802c79def755a913ee56`.

`.gitattributes` menetapkan `reference/frontend/** -text`; sumber dipertahankan dengan line ending asli, bukan normalisasi Git Windows. Sandbox/CSP sumber tidak diubah. Daftar hash seluruh berkas ada pada rencana implementasi.

## Batas pekerjaan

Aplikasi tetap simulasi frontend. Penyimpanan `sessionStorage`, penghapusan pembungkus host/runtime OpenAI, normalisasi separator, dan peningkatan aksesibilitas adalah perbedaan sengaja yang didokumentasikan di README. Tidak ada backend atau suara sekolah nyata.
