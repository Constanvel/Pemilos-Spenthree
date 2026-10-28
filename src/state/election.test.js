import { describe, expect, it, vi } from 'vitest'
import { CODE_ERROR, electionReducer as reduce, initialState, readSession, resolveScreen, saveSession, STORAGE_KEY, toSnapshot } from './election.js'

const ready = { ...initialState, authorized: true, screen: 'ballot' }
const confirmed = { ...ready, selected: '02', agreed: true, screen: 'confirm' }

describe('akses dan pemilihan', () => {
  it('menerima kode dengan spasi dan huruf kecil', () => {
    expect(reduce({ ...initialState, code: ' demo-2026 ' }, { type: 'authorize' })).toMatchObject({ authorized: true, screen: 'ballot', error: '', code: '' })
    expect(reduce({ ...initialState, code: 'wrong' }, { type: 'authorize' })).toMatchObject({ authorized: false, error: CODE_ERROR })
  })
  it('mencegah pemilihan tanpa akses atau kandidat tidak valid', () => {
    expect(reduce(initialState, { type: 'select', id: '01' })).toBe(initialState)
    expect(reduce(ready, { type: 'select', id: '99' })).toBe(ready)
    expect(reduce(ready, { type: 'select', id: '01' }).selected).toBe('01')
  })
  it('melindungi navigasi', () => {
    expect(resolveScreen('ballot', initialState)).toBe('access')
    expect(resolveScreen('confirm', ready)).toBe('ballot')
    expect(resolveScreen('success', ready)).toBe('home')
    expect(resolveScreen('profile', ready)).toBe('ballot')
    expect(resolveScreen('unknown', ready)).toBe('home')
  })
})

describe('konfirmasi dan penguncian', () => {
  it('mereset persetujuan setiap masuk konfirmasi', () => {
    expect(reduce(confirmed, { type: 'navigate', screen: 'confirm' }).agreed).toBe(false)
    expect(reduce(confirmed, { type: 'select', id: '03' })).toMatchObject({ selected: '03', agreed: false, screen: 'ballot' })
  })
  it.each([
    { authorized: false }, { selected: null }, { selected: '99' }, { agreed: false }, { voted: true }, { screen: 'ballot' },
  ])('menolak kirim ketika guard tidak terpenuhi: %j', (patch) => {
    const state = { ...confirmed, ...patch }
    expect(reduce(state, { type: 'submit' })).toBe(state)
  })
  it('menghapus pilihan setelah kirim dan mengunci pemilihan ulang', () => {
    const voted = reduce(confirmed, { type: 'submit' })
    expect(voted).toMatchObject({ voted: true, selected: null, profileId: null, agreed: false, screen: 'success' })
    expect(reduce(voted, { type: 'submit' })).toBe(voted)
    expect(reduce(voted, { type: 'select', id: '01' })).toBe(voted)
    for (const screen of ['access', 'ballot', 'profile', 'confirm']) expect(resolveScreen(screen, voted)).toBe('success')
    expect(reduce(voted, { type: 'reset' })).toEqual(initialState)
  })
})

describe('persistensi sesi demo', () => {
  it('tidak menyimpan persetujuan, kode, profil, atau pilihan setelah kirim', () => {
    expect(toSnapshot({ ...confirmed, screen: 'profile', code: 'secret' })).toEqual({ screen: 'ballot', authorized: true, selected: '02', voted: false })
    expect(toSnapshot({ ...confirmed, voted: true }).selected).toBeNull()
  })
  it('memulihkan sesi tanpa memulihkan persetujuan', () => {
    saveSession(confirmed)
    expect(readSession()).toMatchObject({ screen: 'confirm', selected: '02', agreed: false })
    saveSession(reduce(confirmed, { type: 'submit' }))
    expect(readSession()).toMatchObject({ screen: 'success', voted: true, selected: null })
  })
  it('menangani data rusak dan kandidat tidak valid', () => {
    sessionStorage.setItem(STORAGE_KEY, '{invalid')
    expect(readSession()).toEqual(initialState)
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ screen: 'confirm', authorized: true, selected: '99' }))
    expect(readSession()).toMatchObject({ screen: 'ballot', selected: null })
  })
  it('tetap berjalan jika storage ditolak', () => {
    const get = vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new Error('blocked') })
    expect(readSession()).toEqual(initialState)
    get.mockRestore()
    const set = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('full') })
    expect(() => saveSession(ready)).not.toThrow()
    set.mockRestore()
  })
})
