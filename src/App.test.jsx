import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App.jsx'

describe('navigasi dasar', () => {
  it('memvalidasi kode, membuka profil, dan memilih satu kandidat', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('button', { name: 'Mulai memilih' }))
    await user.type(screen.getByLabelText('Kode akses'), 'salah{Enter}')
    expect(screen.getByRole('alert')).toHaveTextContent('Kode belum sesuai. Gunakan DEMO-2026 untuk mencoba.')
    await user.click(screen.getByRole('button', { name: 'Isi kode demo otomatis' }))
    await user.click(screen.getByRole('button', { name: 'Buka surat suara' }))
    expect(screen.getByRole('button', { name: 'Lanjutkan' })).toBeDisabled()
    await user.click(screen.getByRole('button', { name: 'Lihat profil Nadia Azzahra' }))
    expect(screen.getByText('Pekan karya untuk menampilkan bakat siswa.')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Pilih Nadia Azzahra' }))
    expect(screen.getByRole('radio', { name: 'Pilih Nadia Azzahra' })).toBeChecked()
    await user.click(screen.getByRole('radio', { name: 'Pilih Raka Putra' }))
    expect(screen.getByRole('radio', { name: 'Pilih Nadia Azzahra' })).not.toBeChecked()
    expect(screen.getByRole('status')).toHaveTextContent('Raka Putra')
    expect(screen.getByRole('button', { name: 'Lanjutkan' })).toBeEnabled()
  })
  it('menampilkan beranda dan panduan', async () => {
    const user = userEvent.setup()
    render(<App />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Kenali calonnya.')
    await user.click(screen.getByRole('button', { name: 'Panduan' }))
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Memilih itu mudah.')
    expect(screen.getByRole('main')).toHaveFocus()
    await user.click(screen.getByRole('button', { name: 'Beranda' }))
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Kenali calonnya.')
  })
})
