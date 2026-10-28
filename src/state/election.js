import { findCandidate } from '../data/candidates.js'

export const STORAGE_KEY = 'pemilos-spenthree-demo-v1'
export const DEMO_CODE = 'DEMO-2026'
export const CODE_ERROR = 'Kode belum sesuai. Gunakan DEMO-2026 untuk mencoba.'

export const initialState = {
  screen: 'home', authorized: false, selected: null, voted: false,
  profileId: null, code: '', error: '', agreed: false,
}

const ballotScreens = ['access', 'ballot', 'profile', 'confirm']

export function resolveScreen(screen, state) {
  if (ballotScreens.includes(screen)) {
    if (state.voted) return 'success'
    if (!state.authorized) return 'access'
    if (screen === 'access') return 'ballot'
    if (screen === 'confirm' && !findCandidate(state.selected)) return 'ballot'
    if (screen === 'profile' && !findCandidate(state.profileId)) return 'ballot'
  }
  if (screen === 'success' && !state.voted) return 'home'
  return ['home', 'guide', 'success', ...ballotScreens].includes(screen) ? screen : 'home'
}

export function electionReducer(state, action) {
  switch (action.type) {
    case 'navigate':
      return { ...state, screen: resolveScreen(action.screen, state), agreed: false }
    case 'code':
      return { ...state, code: action.value, error: '' }
    case 'authorize':
      if (state.voted) return { ...state, screen: 'success' }
      if (state.code.trim().toUpperCase() !== DEMO_CODE) return { ...state, error: CODE_ERROR }
      return { ...state, authorized: true, screen: 'ballot', code: '', error: '' }
    case 'select':
      if (!state.authorized || state.voted || !findCandidate(action.id)) return state
      return { ...state, selected: action.id, agreed: false, screen: 'ballot' }
    case 'profile':
      if (!findCandidate(action.id)) return state
      return { ...state, profileId: action.id, screen: resolveScreen('profile', { ...state, profileId: action.id }) }
    case 'agree':
      return state.screen === 'confirm' ? { ...state, agreed: action.value === true } : state
    case 'submit':
      if (state.voted || !state.authorized || !findCandidate(state.selected) || !state.agreed || state.screen !== 'confirm') return state
      return { ...state, voted: true, selected: null, profileId: null, agreed: false, screen: 'success' }
    case 'reset':
      return { ...initialState }
    default:
      return state
  }
}

// Session-scoped demo state, not an authentication or vote-integrity mechanism.
// Never persist access input, consent, profile details, or a submitted candidate.
export function toSnapshot(state) {
  return {
    screen: state.screen === 'profile' ? 'ballot' : state.screen,
    authorized: state.authorized,
    selected: state.voted ? null : state.selected,
    voted: state.voted,
  }
}

export function readSession() {
  try {
    const stored = JSON.parse(sessionStorage.getItem(STORAGE_KEY))
    if (!stored || typeof stored !== 'object') return { ...initialState }
    const authorized = stored.authorized === true
    const voted = stored.voted === true && authorized
    const state = {
      ...initialState, authorized, voted,
      selected: authorized && !voted && findCandidate(stored.selected) ? stored.selected : null,
    }
    return { ...state, screen: resolveScreen(stored.screen === 'profile' ? 'ballot' : stored.screen, state) }
  } catch {
    return { ...initialState }
  }
}

export function saveSession(state) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(toSnapshot(state)))
  } catch {
    // Continue in memory when storage is unavailable or full.
  }
}
