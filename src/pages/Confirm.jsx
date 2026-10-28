import { ArrowLeft, LockKeyhole, Send } from 'lucide-react'
import CandidateIdentity from '../components/CandidateIdentity.jsx'

export default function Confirm({ candidate, agreed, dispatch }) {
  return (
    <>
      <div className="page-heading"><span className="eyebrow">LANGKAH 3 DARI 3</span><h1>Periksa pilihanmu.</h1><p>Pastikan kandidat di bawah ini adalah pilihanmu sebelum mengirim suara.</p></div>
      <section className="card"><p className="eyebrow choice-label">PILIHANMU</p><CandidateIdentity candidate={candidate} /><p className="candidate-vision">“{candidate.vision}”</p><button className="text-button" onClick={() => dispatch({ type: 'navigate', screen: 'ballot' })}><ArrowLeft size={15} aria-hidden="true" />Ubah pilihan</button></section>
      <aside className="notice"><LockKeyhole size={20} aria-hidden="true" /><p>Setelah dikirim, pilihan tidak dapat diubah pada sesi demo ini. Bukti memilih tidak menampilkan kandidat pilihanmu.</p></aside>
      <form className="confirm-form" onSubmit={(event) => { event.preventDefault(); dispatch({ type: 'submit' }) }}>
        <label className="consent"><input type="checkbox" checked={agreed} onChange={(event) => dispatch({ type: 'agree', value: event.target.checked })} /><span>Saya sudah memeriksa dan yakin dengan pilihan saya.</span></label>
        <button type="submit" className="button primary full" disabled={!agreed}>Kirim suara demo<Send size={16} aria-hidden="true" /></button>
      </form>
      <p className="muted small centered">Simulasi saja. Tidak ada suara yang dikirim ke sekolah.</p>
    </>
  )
}
