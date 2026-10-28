import { ArrowRight, ChevronRight } from 'lucide-react'
import { candidates, findCandidate } from '../data/candidates.js'
import VotingProgress from '../components/VotingProgress.jsx'

export default function Ballot({ selected, dispatch }) {
  const choice = findCandidate(selected)
  return (
    <section className="page" data-screen="ballot">
      <VotingProgress step="ballot" />
      <h2>Surat suara</h2>
      <p className="desc">Pilih satu calon ketua OSIS. Kamu bisa membaca visi-misi terlebih dahulu.</p>
      <form onSubmit={(event) => { event.preventDefault(); if (choice) dispatch({ type: 'navigate', screen: 'confirm' }) }}>
        <fieldset id="pv-candidates">
          <legend>Seluruh kandidat berikut adalah contoh.</legend>
          {candidates.map((candidate) => (
            <article className={`candidate${selected === candidate.id ? ' chosen' : ''}`} data-card={candidate.id} key={candidate.id}>
              <label>
                <span className="initials">{candidate.initials}</span>
                <span className="meta"><span className="kicker">Nomor urut {candidate.id}</span><h3 id={`pv-candidate-name-${candidate.id}`}>{candidate.name}</h3><p>Kelas {candidate.classroom} · Contoh</p></span>
                <input type="radio" name="pv-choice" value={candidate.id} aria-label={`Pilih nomor ${candidate.id}, ${candidate.name}`} checked={selected === candidate.id} onChange={() => dispatch({ type: 'select', id: candidate.id })} />
              </label>
              <button type="button" className="quiet" data-profile={candidate.id} onClick={() => dispatch({ type: 'profile', id: candidate.id })} aria-labelledby={`pv-profile-link-${candidate.id} pv-candidate-name-${candidate.id}`}><span id={`pv-profile-link-${candidate.id}`}>Lihat visi &amp; misi</span> <ChevronRight aria-hidden="true" /></button>
            </article>
          ))}
        </fieldset>
        <p className="selection" id="pv-selection" aria-live="polite">{choice ? `Pilihan sementara: ${choice.name}` : 'Belum ada kandidat yang dipilih.'}</p>
        <button type="submit" className="primary" id="pv-next" disabled={!choice}>Lanjutkan <ArrowRight aria-hidden="true" /></button>
      </form>
    </section>
  )
}
