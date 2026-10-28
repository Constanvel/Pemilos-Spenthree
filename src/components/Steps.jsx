import { KeyRound, UsersRound, CircleCheck } from 'lucide-react'

const steps = [
  { icon: KeyRound, title: 'Masuk dengan kode', text: 'Gunakan kode demo untuk membuka surat suara.' },
  { icon: UsersRound, title: 'Kenali dan pilih calon', text: 'Baca visi serta program, lalu pilih satu kandidat.' },
  { icon: CircleCheck, title: 'Periksa dan kirim', text: 'Pastikan pilihanmu sebelum mengirim suara.' },
]

export default function Steps() {
  return (
    <ol className="steps">
      {steps.map(({ icon: Icon, title, text }, index) => (
        <li key={title}>
          <span className="step-icon"><Icon size={20} aria-hidden="true" /></span>
          <div><span className="eyebrow">LANGKAH {index + 1}</span><h3>{title}</h3><p>{text}</p></div>
        </li>
      ))}
    </ol>
  )
}
