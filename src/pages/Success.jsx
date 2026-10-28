import { CircleCheck, ShieldCheck, House } from 'lucide-react'

export default function Success({ onHome }) {
  return (
    <>
      <div className="success-heading"><span className="success-icon"><CircleCheck size={38} aria-hidden="true" /></span><span className="eyebrow">SIMULASI SELESAI</span><h1>Terima kasih<br />sudah memilih!</h1><p>Suara demo berhasil dicatat di sesi ini. Partisipasimu adalah langkah untuk OSIS yang lebih baik.</p></div>
      <section className="card receipt" aria-labelledby="receipt-title"><span className="eyebrow">BUKTI MEMILIH</span><h2 id="receipt-title">Pemilos Spenthree 2026</h2><div className="receipt-code">PM-2026-DEMO</div><span className="receipt-status"><CircleCheck size={14} aria-hidden="true" />Sudah memilih · Simulasi</span><p>Bukti ini tidak menampilkan kandidat pilihanmu.</p></section>
      <aside className="notice"><ShieldCheck size={21} aria-hidden="true" /><p>Sesi demo ini sudah terkunci untuk pemilihan ulang. Gunakan <strong>Ulangi demo</strong> jika ingin mencoba dari awal. Suara tidak dikirim ke sekolah.</p></aside>
      <button className="button secondary full" onClick={onHome}><House size={17} aria-hidden="true" />Kembali ke beranda</button>
    </>
  )
}
