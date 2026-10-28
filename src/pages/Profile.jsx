import { ArrowLeft, Check, Target, ListChecks } from 'lucide-react'
import CandidateIdentity from '../components/CandidateIdentity.jsx'

export default function Profile({ candidate, dispatch }) {
  return (
    <>
      <button className="text-button back-button" onClick={() => dispatch({ type: 'navigate', screen: 'ballot' })}><ArrowLeft size={16} aria-hidden="true" />Kembali ke surat suara</button>
      <div className="page-heading"><span className="eyebrow">KENALI KANDIDAT</span><h1>Profil calon ketua OSIS</h1></div>
      <section className="card profile"><CandidateIdentity candidate={candidate} />
        <h3><Target size={17} aria-hidden="true" />Visi</h3><p>{candidate.vision}</p>
        <h3><ListChecks size={17} aria-hidden="true" />Program utama</h3><ol className="programs">{candidate.programs.map((program) => <li key={program}>{program}</li>)}</ol>
      </section>
      <button className="button primary full" onClick={() => dispatch({ type: 'select', id: candidate.id })}><Check size={17} aria-hidden="true" />Pilih {candidate.name}</button>
      <p className="muted small centered">Profil dan program merupakan data contoh untuk simulasi.</p>
    </>
  )
}
