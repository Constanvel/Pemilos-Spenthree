export default function CandidateIdentity({ candidate }) {
  return (
    <div className="candidate-identity">
      <span className={`avatar avatar-${candidate.id}`} aria-hidden="true">{candidate.initials}</span>
      <div><span className="eyebrow">KANDIDAT {candidate.id}</span><h2>{candidate.name}</h2><p className="muted">Kelas {candidate.classroom}</p></div>
    </div>
  )
}
