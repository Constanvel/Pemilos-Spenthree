import { Info, ArrowRight } from 'lucide-react'
import Steps from '../components/Steps.jsx'

export default function Guide({ onVote, voted }) {
  return (
    <>
      <div className="page-heading"><span className="eyebrow">PANDUAN PEMILIH</span><h1>Memilih itu mudah.</h1><p>Luangkan waktu untuk mengenali calon dan menentukan pilihanmu sendiri.</p></div>
      <section className="card"><h2>Cara menggunakan demo</h2><Steps /></section>
      <aside className="notice"><Info size={21} aria-hidden="true" /><div><strong>Yang perlu kamu tahu</strong><ul className="plain-list"><li>Kode akses demo: <strong>DEMO-2026</strong>.</li><li>Pilih satu kandidat. Pilihan dapat diubah sebelum dikirim.</li><li>Periksa kembali dan centang persetujuan sebelum mengirim.</li><li>Setelah dikirim, sesi demo terkunci. Bukti tidak menampilkan pilihanmu.</li><li>Gunakan “Ulangi demo” untuk memulai simulasi baru.</li></ul></div></aside>
      <button className="button primary full" onClick={onVote}>{voted ? 'Lihat bukti memilih' : 'Mulai memilih'}<ArrowRight size={18} aria-hidden="true" /></button>
    </>
  )
}
