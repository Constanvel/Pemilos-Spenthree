export default function CandidateIdentity({ candidate, confirmation = false }) {
  const prefix = confirmation ? 'pv-confirm' : 'pv-profile'
  return (
    <div className="profile-top" style={confirmation ? { margin: 0 } : undefined}>
      <div className="initials" id={`${prefix}-initials`}>{candidate.initials}</div>
      <div>
        <div className="kicker" id={`${prefix}-number`}>Nomor urut {candidate.id}</div>
        {confirmation ? <h3 id={`${prefix}-name`} style={{ fontSize: 19, margin: '5px 0' }}>{candidate.name}</h3> : <h2 id={`${prefix}-name`}>{candidate.name}</h2>}
        <div className="subtitle" id={confirmation ? undefined : 'pv-profile-class'}>{confirmation ? 'Calon ketua OSIS · Contoh' : `Kelas ${candidate.classroom} · Data contoh`}</div>
      </div>
    </div>
  )
}
