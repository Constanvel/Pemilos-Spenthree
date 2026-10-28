import { ArrowLeft, ArrowRight, ArrowUpRight, ShieldCheck } from 'lucide-react'
import { DEMO_CODE } from '../state/election.js'

export default function Access({ code, error, dispatch }) {
  return (
    <section className="page" data-screen="access">
      <button type="button" className="back" data-page="home" onClick={() => dispatch({ type: 'navigate', screen: 'home' })}><ArrowLeft aria-hidden="true" />Kembali</button>
      <div className="kicker">Langkah 01</div>
      <h1>Kode pemilih</h1>
      <p className="desc">Masukkan kode untuk membuka surat suara.</p>
      <form onSubmit={(event) => { event.preventDefault(); dispatch({ type: 'authorize' }) }}>
        <label className="field" htmlFor="pv-token">Kode akses</label>
        <input id="pv-token" type="text" placeholder="Masukkan kode" autoComplete="off" autoCapitalize="characters" spellCheck={false} value={code} onChange={(event) => dispatch({ type: 'code', value: event.target.value })} aria-invalid={Boolean(error)} aria-describedby={`pv-code-help${error ? ' pv-access-error' : ''}`} />
        <p className="helper" id="pv-code-help">Untuk mencoba prototipe, gunakan <b>{DEMO_CODE}</b>.</p>
        <button type="button" className="quiet" id="pv-fill" onClick={() => dispatch({ type: 'code', value: DEMO_CODE })}>Gunakan kode demo <ArrowUpRight aria-hidden="true" /></button>
        <p className="error" role="alert" id="pv-access-error" hidden={!error}>{error}</p>
        <button type="submit" className="primary" id="pv-login" style={{ marginTop: 15 }}>Buka surat suara <ArrowRight aria-hidden="true" /></button>
      </form>
      <div className="box"><h3>Belum punya kode?</h3><p>Pada layanan sebenarnya, kode diberikan oleh panitia pemilihan. Jangan membagikan kode kepada siswa lain.</p></div>
      <div className="note"><ShieldCheck aria-hidden="true" /><span>Demo ini tidak memerlukan NIS, kata sandi, atau data pribadi.</span></div>
    </section>
  )
}
