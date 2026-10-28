import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App.jsx'

describe('navigasi dasar', () => {
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
