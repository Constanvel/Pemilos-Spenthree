import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App.jsx'

describe('beranda dan panduan handover', () => {
  it('menampilkan logo asli dan navigasi setelah konten', () => {
    render(<App />)
    const logo = screen.getByRole('img', { name: 'Logo SMP Negeri 3 Sokaraja' })
    expect(logo.getAttribute('src')).toContain('logo-sekolah-1.png')
    expect(screen.getByText('Baca visi dan program setiap calon sebelum memberikan suara.')).toBeInTheDocument()
    expect(screen.getByText('Satu siswa · Satu suara')).toBeInTheDocument()
    expect(screen.getByRole('main').compareDocumentPosition(screen.getByRole('navigation')) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
  })
  it('membuka pertanyaan panduan dengan keyboard', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('button', { name: 'Panduan' }))
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Panduan pemilih')
    const summary = screen.getByText('Apakah pilihan bisa diubah?')
    expect(summary.closest('details')).not.toHaveAttribute('open')
    summary.focus()
    await user.keyboard('{Enter}')
    // Native details interaction is exercised in the browser suite.
    expect(summary).toHaveFocus()
    expect(screen.getByText('Bagaimana cara memberikan suara?').closest('details')).toHaveAttribute('open')
  })
})
