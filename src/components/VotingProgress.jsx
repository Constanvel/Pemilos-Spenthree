export default function VotingProgress({ step }) {
  return (
    <div className="steps" aria-label={`Tahap pemilihan: ${step === 'confirm' ? 'Konfirmasi' : 'Pilih'}`}>
      Akses <span className="on" aria-hidden="true" />Pilih <span className={step === 'confirm' ? 'on' : undefined} aria-hidden="true" />Konfirmasi
    </div>
  )
}
