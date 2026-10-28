import { ArrowLeft, LockKeyhole, Vote } from 'lucide-react'
import CandidateIdentity from '../components/CandidateIdentity.jsx'
import VotingProgress from '../components/VotingProgress.jsx'

export default function Confirm({ candidate, agreed, dispatch }) {
  return (
    <section className="page" data-screen="confirm">
      <button type="button" className="back" data-page="ballot" onClick={() => dispatch({ type: 'navigate', screen: 'ballot' })}><ArrowLeft aria-hidden="true" />Ubah pilihan</button>
      <VotingProgress step="confirm" />
      <h2>Periksa pilihanmu</h2>
      <p className="desc">Kamu akan memberikan suara kepada:</p>
      <div className="box"><CandidateIdentity candidate={candidate} confirmation /></div>
      <div className="note"><LockKeyhole aria-hidden="true" /><span>Setelah dikirim, pilihan dikunci pada sesi demo ini. Pastikan kandidat sudah sesuai.</span></div>
      <form onSubmit={(event) => { event.preventDefault(); dispatch({ type: 'submit' }) }}>
        <label className="checklabel"><input type="checkbox" id="pv-agree" checked={agreed} onChange={(event) => dispatch({ type: 'agree', value: event.target.checked })} /><span>Saya sudah memeriksa dan yakin dengan pilihan saya.</span></label>
        <div className="stack">
          <button type="submit" className="primary" id="pv-vote" disabled={!agreed}><Vote aria-hidden="true" />Kirim suara</button>
          <button type="button" className="secondary" data-page="ballot" onClick={() => dispatch({ type: 'navigate', screen: 'ballot' })}>Kembali memilih</button>
        </div>
      </form>
      <p className="helper" style={{ textAlign: 'center' }}>Simulasi. Tidak masuk ke perhitungan suara sekolah.</p>
    </section>
  )
}
