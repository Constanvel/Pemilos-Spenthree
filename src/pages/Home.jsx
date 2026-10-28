import { ArrowRight, Vote, ShieldCheck } from 'lucide-react'
import Steps from '../components/Steps.jsx'

export default function Home({ onVote, voted }) {
  return (
    <>
      <div className="page-heading"><span className="eyebrow">PEMILIHAN KETUA OSIS · 2026</span><h1>Kenali calonnya.<br />Tentukan pilihanmu.</h1><p>Suara kecilmu, langkah besar untuk sekolah kita.</p></div>
      <section className="hero" aria-labelledby="hero-title">
        <span className="hero-icon"><Vote size={29} aria-hidden="true" /></span>
        <span className="badge">PEMILOS SPENTHREE</span>
        <h2 id="hero-title">Pilihanmu untuk<br />OSIS berikutnya.</h2>
        <p>Kenali visi dan program para calon. Pilih dengan yakin, sesuai harapanmu untuk sekolah.</p>
        <button className="button hero-button" onClick={onVote}>{voted ? 'Lihat bukti memilih' : 'Mulai memilih'}<ArrowRight size={18} aria-hidden="true" /></button>
      </section>
      <aside className="notice"><ShieldCheck size={21} aria-hidden="true" /><p><strong>Ini adalah simulasi.</strong> Tidak meminta data pribadi. Suara demo tidak dikirim ke sekolah.</p></aside>
      <section className="section"><div className="section-heading"><h2>Tiga langkah mudah</h2><span className="muted small">Kenali. Pilih. Pastikan.</span></div><Steps /></section>
    </>
  )
}
