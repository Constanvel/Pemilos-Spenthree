import { useEffect, useReducer, useRef } from 'react'
import { BookOpen, GraduationCap, House, RotateCcw, Vote } from 'lucide-react'
import Home from './pages/Home.jsx'
import Guide from './pages/Guide.jsx'
import Access from './pages/Access.jsx'
import Ballot from './pages/Ballot.jsx'
import Profile from './pages/Profile.jsx'
import Confirm from './pages/Confirm.jsx'
import Success from './pages/Success.jsx'
import { findCandidate } from './data/candidates.js'
import { electionReducer, readSession, saveSession } from './state/election.js'

export default function App() {
  const [state, dispatch] = useReducer(electionReducer, undefined, readSession)
  const { screen, voted } = state
  const contentRef = useRef(null)

  useEffect(() => {
    contentRef.current?.focus()
  }, [screen])
  useEffect(() => { saveSession(state) }, [state])

  const navigate = (screen) => dispatch({ type: 'navigate', screen })
  const onVote = () => navigate('access')
  const activeTab = ['ballot', 'profile', 'confirm', 'success'].includes(screen) ? 'access' : screen
  return (
    <div className="app-shell">
      <header className="head"><span className="school-mark" aria-hidden="true"><GraduationCap size={28} /></span><div><strong>Pemilos Spenthree</strong><span>SMP Negeri 3 Sokaraja</span></div><span className="demo-tag">DEMO</span></header>
      <nav className="nav" aria-label="Navigasi utama">
        {[['home', House, 'Beranda'], ['access', Vote, voted ? 'Bukti memilih' : 'Surat suara'], ['guide', BookOpen, 'Panduan']].map(([id, Icon, label]) => (
          <button key={id} aria-current={activeTab === id ? 'page' : undefined} onClick={() => navigate(id)}><Icon size={17} aria-hidden="true" />{label}</button>
        ))}
      </nav>
      <main ref={contentRef} tabIndex={-1}>
        {screen === 'home' && <Home onVote={onVote} voted={voted} />}
        {screen === 'guide' && <Guide onVote={onVote} voted={voted} />}
        {screen === 'access' && <Access code={state.code} error={state.error} dispatch={dispatch} />}
        {screen === 'ballot' && <Ballot selected={state.selected} dispatch={dispatch} />}
        {screen === 'profile' && <Profile candidate={findCandidate(state.profileId)} dispatch={dispatch} />}
        {screen === 'confirm' && <Confirm candidate={findCandidate(state.selected)} agreed={state.agreed} dispatch={dispatch} />}
        {screen === 'success' && <Success onHome={() => navigate('home')} />}
      </main>
      <footer><span>Prototipe · Kandidat &amp; data contoh</span><button onClick={() => dispatch({ type: 'reset' })}><RotateCcw size={13} aria-hidden="true" />Ulangi demo</button></footer>
    </div>
  )
}
