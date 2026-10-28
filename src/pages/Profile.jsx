import { ArrowLeft } from 'lucide-react'
import CandidateIdentity from '../components/CandidateIdentity.jsx'

export default function Profile({ candidate, dispatch }) {
  return (
    <section className="page" data-screen="profile">
      <button type="button" className="back" data-page="ballot" onClick={() => dispatch({ type: 'navigate', screen: 'ballot' })}><ArrowLeft aria-hidden="true" />Semua kandidat</button>
      <div className="kicker">Profil kandidat · Contoh</div>
      <CandidateIdentity candidate={candidate} />
      <div className="box"><h3>Visi</h3><p id="pv-vision">{candidate.vision}</p></div>
      <h3>Misi &amp; program</h3>
      <ol className="programs" id="pv-programs">{candidate.programs.map((program) => <li key={program}>{program}</li>)}</ol>
      <button type="button" className="primary" id="pv-select-profile" style={{ marginTop: 22 }} onClick={() => dispatch({ type: 'select', id: candidate.id })}>Pilih kandidat ini</button>
      <p className="helper" style={{ textAlign: 'center' }}>Pilihan masih bisa diubah sebelum dikonfirmasi.</p>
    </section>
  )
}
