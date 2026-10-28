import { ArrowRight, Info, Vote } from 'lucide-react'
import Steps from '../components/Steps.jsx'

export default function Home({ onVote, voted }) {
  return (
    <section className="page" data-screen="home">
      <div className="kicker">Pemilihan ketua OSIS</div>
      <h1>Kenali calonnya.<br />Tentukan pilihanmu.</h1>
      <p className="desc">Baca visi dan program setiap calon sebelum memberikan suara.</p>
      <div className="hero">
        <div className="stamp"><span className="kicker">Satu siswa · Satu suara</span><Vote aria-hidden="true" /></div>
        <h2>Pilihanmu untuk<br />OSIS berikutnya.</h2>
        <p>Gunakan hak pilih dengan mandiri dan saling menghargai.</p>
        <button className="primary" id="pv-start" onClick={onVote}>{voted ? 'Lihat bukti partisipasi' : 'Mulai memilih'}{!voted && <ArrowRight aria-hidden="true" />}</button>
      </div>
      <div className="note"><Info aria-hidden="true" /><span>Simulasi pemilihan. Nama calon dan program adalah contoh, bukan daftar kandidat resmi.</span></div>
      <div className="section-title"><h3>Cara memilih</h3><span>3 langkah</span></div>
      <Steps />
    </section>
  )
}
