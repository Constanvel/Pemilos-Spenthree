const questions = [
  ['Bagaimana cara memberikan suara?', 'Masukkan kode, baca profil kandidat, pilih satu calon, lalu periksa dan konfirmasi pilihan.'],
  ['Apakah pilihan bisa diubah?', 'Bisa, selama belum menekan Kirim suara. Setelah suara dikirim, sesi demo dikunci.'],
  ['Apakah ini pemilihan sungguhan?', 'Belum. Ini prototipe untuk presentasi. Semua nama, kelas, program, dan kode merupakan contoh. Tidak ada suara yang dikirim ke sekolah.'],
  ['Bagaimana jika kode tidak bisa digunakan?', 'Gunakan DEMO-2026 untuk mencoba. Dalam pelaksanaan sebenarnya, hubungi panitia jika kode bermasalah.'],
]

export default function Guide() {
  return (
    <section className="page" data-screen="guide">
      <div className="kicker">Informasi pemilihan</div>
      <h1>Panduan pemilih</h1>
      <p className="desc">Kenali calon, pilih secara mandiri, dan hormati pilihan teman.</p>
      {questions.map(([question, answer], index) => (
        <details key={question} open={index === 0 ? true : undefined}><summary>{question}</summary><p>{answer}</p></details>
      ))}
      <div className="box"><h3>Jadwal &amp; kandidat resmi</h3><p>Ditentukan oleh panitia sekolah. Informasi tersebut dapat dimasukkan setelah disepakati.</p></div>
    </section>
  )
}
