# Handover Frontend — Pemilos Spenthree

Prototipe mobile pemilihan ketua OSIS SMP Negeri 3 Sokaraja. Identitas visual hijau zamrud, berbeda dari menfess yang berwarna biru.

## Menjalankan

Buka `index.html` di browser. File tersebut merupakan salinan byte-identik dari file yang diberikan pengguna; iframe sandbox dan Content Security Policy (CSP) dipertahankan. Beberapa ikon dan gaya pendukung memakai sumber eksternal sehingga membutuhkan internet.

Untuk mencoba alur: Mulai memilih → gunakan kode **DEMO-2026** → baca visi-misi → pilih calon → Lanjutkan → centang konfirmasi → Kirim suara. Tombol Ulangi demo menghapus status sesi simulasi.

## Struktur

- `index.html`: prototipe lengkap yang dapat dibuka langsung.
- `template.html`: salinan asli untuk dasar proses build. Jangan menghapus sandbox/CSP.
- `src/ui.html`: markup layar yang bisa diedit; berupa fragmen, bukan halaman mandiri.
- `src/styles.css`: desain, layout responsif, tema terang/gelap.
- `src/app.js`: data kandidat contoh dan interaksi prototipe.
- `assets/logo-sekolah-1.png`: logo sekolah yang diekstrak dari file asli.
- `build.py`: menyatukan perubahan source ke index.html dengan tetap mempertahankan pembungkus iframe dan CSP.

Setelah mengedit source, jalankan `python build.py`, lalu buka ulang index.html. Tidak perlu npm atau bundler. Jangan mengedit template.html untuk perubahan UI biasa. Simpan file sumber ini dalam version control sebelum pengembangan lebih lanjut.

## Layar dan perilaku

1. `home`: pengantar pemilihan dan tiga langkah penggunaan.
2. `access`: kode demo; kode salah menampilkan pesan kesalahan.
3. `ballot`: tiga calon contoh, satu pilihan menggunakan radio button.
4. `profile`: visi, misi, program calon; tombol memilih kandidat.
5. `confirm`: ringkasan pilihan dan persetujuan; pengguna bisa kembali mengganti pilihan.
6. `success`: bukti partisipasi demo tanpa nama kandidat yang dipilih.
7. `guide`: panduan dan penjelasan simulasi.

Tombol Lanjutkan baru aktif setelah memilih calon. Kirim suara baru aktif setelah persetujuan. Setelah pengiriman, navigasi ke surat suara membuka bukti partisipasi. Ulangi demo mereset alur. Data kandidat dan kode dapat ditemukan pada objek `people` dan fungsi `login()` dalam app.js.

## Warna dan font

| Elemen | Mode terang |
| --- | --- |
| Utama / tombol / panel utama | #176B52 |
| Latar halaman | #F3F7F4 |
| Kartu dan header | #FFFFFF |
| Teks utama | #243B32 |
| Teks sekunder | #667C70 |
| Garis pembatas | #DCE7DF |
| Permukaan lembut | #E6F0E9 |

Font: Arial, Helvetica, sans-serif. Lebar tampilan aplikasi maksimal 410px; stylesheet menyesuaikan layar kecil. Warna tema gelap menggunakan CSS light-dark(). Ikon memakai placeholder data-lucide dan runtime pembungkus yang sudah disertakan.

## Batas prototipe

Ini bukan sistem pemungutan suara produksi. Kandidat, kelas, visi-misi, kode akses, dan kode bukti merupakan contoh. Tidak ada database, autentikasi nyata, pengiriman suara, atau hasil perhitungan sekolah. Penguncian pilihan hanya simulasi pada sisi browser dan dapat direset; bukan mekanisme pencegahan suara ganda yang aman.

Status presentasi memakai window.openai.widgetState/setWidgetState dari runtime pembungkus. Data pilihan sementara bisa disimpan sebagai state UI. Jangan menggunakan mekanisme ini untuk menyimpan suara atau identitas pemilih nyata.

## Kebutuhan integrasi backend

- Validasi kode dan kelayakan pemilih di server; jangan gunakan kode hardcoded.
- Muat kandidat, periode, jadwal, dan status pemilihan dari server.
- Simpan suara secara atomik dengan pemeriksaan satu hak pilih per pemilihan, termasuk jika pengguna mengirim ulang permintaan.
- Pisahkan bukti partisipasi dari isi suara sesuai rancangan privasi yang disepakati sekolah.
- Tangani status kode salah, sudah memilih, pemilihan belum dibuka/ditutup, gangguan jaringan, dan pengiriman dengan hasil belum diketahui.
- Ambil bukti partisipasi dari hasil server; jangan menggunakan kode tetap PM-2026-DEMO.
- Jangan menampilkan sukses sebelum server memastikan suara diterima.
- Tentukan autentikasi admin dan proses pengumuman hasil bersama panitia.

Endpoint berikut hanya usulan kontrak, belum tersedia: POST /api/voter/session, GET /api/election, GET /api/election/candidates, POST /api/election/votes, GET /api/voter/participation. POST votes perlu idempotency key, validasi sesi, kandidat valid, jadwal, dan hak pilih di server.

CSP file asli membatasi koneksi jaringan (`connect-src blob: data:`), dan iframe menggunakan `sandbox="allow-scripts"`. Integrasi API nyata membutuhkan rancangan deployment serta penyesuaian izin origin yang eksplisit. Paket ini sengaja tidak melonggarkan pengamanan tersebut.

## Checklist penerimaan frontend

- Kode salah menampilkan error; kode demo membuka surat suara.
- Tidak dapat lanjut tanpa kandidat; hanya satu radio terpilih.
- Profil dan konfirmasi menampilkan kandidat yang benar.
- Mengubah pilihan sebelum kirim diperbolehkan.
- Tidak dapat kirim sebelum persetujuan.
- Setelah kirim, akses surat suara menampilkan bukti partisipasi.
- Bukti tidak menampilkan nama calon pilihan.
- Ulangi demo mengembalikan sesi ke awal.
- Periksa seluruh layar pada lebar 320px, 390px, tema terang dan gelap.

Sumber paket: pemilos-spenthree.html yang dilampirkan pengguna. Hash SHA-256 file asli: 1079a78b8f6f41999573d9ac8b472772161452ccc52910cd627ec90eebfcdb15.
