const steps = [
  { title: 'Masukkan kode pemilih', text: 'Gunakan kode yang diberikan panitia.' },
  { title: 'Kenali dan pilih kandidat', text: 'Baca visi-misi, lalu pilih satu calon.' },
  { title: 'Konfirmasi suara', text: 'Periksa kembali sebelum mengirim pilihan.' },
]

export default function Steps() {
  return (
    <ol className="process">
      {steps.map(({ title, text }, index) => (
        <li key={title}><span className="num">0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div></li>
      ))}
    </ol>
  )
}
