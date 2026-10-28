import { useEffect, useRef, useState } from 'react'
import { BookOpen, GraduationCap, House, RotateCcw, Vote } from 'lucide-react'
import Home from './pages/Home.jsx'
import Guide from './pages/Guide.jsx'

export default function App() {
  const [screen, setScreen] = useState('home')
  const contentRef = useRef(null)

  useEffect(() => {
    contentRef.current?.focus()
  }, [screen])

  const onVote = () => setScreen('access')
  return (
    <div className="app-shell">
      <header className="head"><span className="school-mark" aria-hidden="true"><GraduationCap size={28} /></span><div><strong>Pemilos Spenthree</strong><span>SMP Negeri 3 Sokaraja</span></div><span className="demo-tag">DEMO</span></header>
      <nav className="nav" aria-label="Navigasi utama">
        {[['home', House, 'Beranda'], ['access', Vote, 'Surat suara'], ['guide', BookOpen, 'Panduan']].map(([id, Icon, label]) => (
          <button key={id} aria-current={screen === id ? 'page' : undefined} onClick={() => setScreen(id)}><Icon size={17} aria-hidden="true" />{label}</button>
        ))}
      </nav>
      <main ref={contentRef} tabIndex={-1}>
        {screen === 'home' && <Home onVote={onVote} voted={false} />}
        {screen === 'guide' && <Guide onVote={onVote} voted={false} />}
        {screen === 'access' && <div className="page-heading"><h1>Akses pemilih</h1><p>Fitur akses demo sedang disiapkan.</p></div>}
      </main>
      <footer><span>Prototipe · Kandidat &amp; data contoh</span><button onClick={() => setScreen('home')}><RotateCcw size={13} aria-hidden="true" />Ulangi demo</button></footer>
    </div>
  )
}
