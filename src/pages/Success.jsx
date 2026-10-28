import { Check, CircleCheck, Clock3 } from 'lucide-react'

export default function Success({ onHome }) {
  return (
    <section className="page" data-screen="success">
      <div className="success-icon"><Check aria-hidden="true" /></div>
      <div className="kicker">Pemilihan selesai</div>
      <h1>Terima kasih<br />sudah memilih.</h1>
      <p className="desc">Suara simulasi berhasil dicatat. Kamu sudah menyelesaikan alur pemilihan.</p>
      <div className="receipt">
        <div className="kicker">Bukti partisipasi · Demo</div>
        <strong>PM-2026-DEMO</strong>
        <div className="status"><CircleCheck aria-hidden="true" />Sudah menggunakan hak pilih</div>
        <p>Bukti partisipasi tidak menampilkan kandidat pilihanmu.</p>
      </div>
      <div className="note"><Clock3 aria-hidden="true" /><span>Pada pemilihan sebenarnya, hasil diumumkan panitia setelah pemungutan suara selesai.</span></div>
      <button type="button" className="primary" data-page="home" style={{ marginTop: 25 }} onClick={onHome}>Kembali ke beranda</button>
    </section>
  )
}
