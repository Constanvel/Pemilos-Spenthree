import { ArrowRight, Check, ShieldCheck } from 'lucide-react'
import { candidates, findCandidate } from '../data/candidates.js'
import CandidateIdentity from '../components/CandidateIdentity.jsx'

export default function Ballot({ selected, dispatch }) {
  const choice = findCandidate(selected)
  return (
    <>
      <div className="page-heading"><span className="eyebrow">LANGKAH 2 DARI 3</span><h1>Kenali, lalu pilih.</h1><p>Baca profil dan program para calon. Pilih satu kandidat yang sesuai harapanmu.</p></div>
      <fieldset className="ballot"><legend className="sr-only">Pilih satu kandidat ketua OSIS</legend>
        {candidates.map((candidate) => (
          <article className={`card candidate${selected === candidate.id ? ' chosen' : ''}`} key={candidate.id}>
            <CandidateIdentity candidate={candidate} />
            <p className="candidate-vision">“{candidate.vision}”</p>
            <div className="candidate-actions"><button className="text-button" onClick={() => dispatch({ type: 'profile', id: candidate.id })} aria-label={`Lihat profil ${candidate.name}`}>Lihat profil<ArrowRight size={14} aria-hidden="true" /></button>
              <label className="radio-label"><input type="radio" name="candidate" value={candidate.id} checked={selected === candidate.id} onChange={() => dispatch({ type: 'select', id: candidate.id })} /><span>Pilih {candidate.name}</span></label>
            </div>
          </article>
        ))}
      </fieldset>
      <div className="selection-summary" role="status">{choice ? <><Check size={17} aria-hidden="true" /><span>Pilihan sementara: <strong>{choice.name}</strong></span></> : <span>Belum ada kandidat yang dipilih.</span>}</div>
      <button className="button primary full" disabled={!choice} onClick={() => dispatch({ type: 'navigate', screen: 'confirm' })}>Lanjutkan<ArrowRight size={17} aria-hidden="true" /></button>
      <aside className="notice"><ShieldCheck size={20} aria-hidden="true" /><p>Pilihanmu belum dikirim. Kamu masih dapat mengubahnya di langkah berikutnya.</p></aside>
    </>
  )
}
