import { ArrowRight, KeyRound, ShieldCheck } from 'lucide-react'
import { DEMO_CODE } from '../state/election.js'

export default function Access({ code, error, dispatch }) {
  return (
    <>
      <div className="page-heading"><span className="eyebrow">LANGKAH 1 DARI 3</span><h1>Akses pemilih</h1><p>Masukkan kode untuk membuka surat suara simulasi.</p></div>
      <form className="card access-form" onSubmit={(event) => { event.preventDefault(); dispatch({ type: 'authorize' }) }}>
        <span className="step-icon"><KeyRound size={23} aria-hidden="true" /></span>
        <label htmlFor="access-code">Kode akses</label>
        <input id="access-code" type="text" autoComplete="off" autoCapitalize="characters" spellCheck={false} placeholder="Masukkan kode akses" value={code} onChange={(event) => dispatch({ type: 'code', value: event.target.value })} aria-invalid={Boolean(error)} aria-describedby={`code-help${error ? ' code-error' : ''}`} />
        <p id="code-help" className="muted">Gunakan <strong>{DEMO_CODE}</strong> untuk mencoba.</p>
        {error && <p className="error" id="code-error" role="alert">{error}</p>}
        <button type="submit" className="button primary full">Buka surat suara<ArrowRight size={17} aria-hidden="true" /></button>
        <button type="button" className="text-button" onClick={() => dispatch({ type: 'code', value: DEMO_CODE })}>Isi kode demo otomatis</button>
      </form>
      <aside className="notice"><ShieldCheck size={21} aria-hidden="true" /><p>Tidak perlu nama, NIS, atau data pribadi. Kode ini hanya untuk simulasi, bukan akses pemilihan resmi.</p></aside>
    </>
  )
}
