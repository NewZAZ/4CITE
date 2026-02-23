import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { mockUsePage } from '../setup'
import NotFound from '~/pages/errors/not_found'

describe('Not Found Page', () => {
  beforeEach(() => {
    mockUsePage.mockReturnValue({ props: { user: null, flash: {} } })
  })

  it('renders 404 code', () => {
    render(<NotFound />)
    expect(screen.getByText('404')).toBeInTheDocument()
  })

  it('renders page not found message', () => {
    render(<NotFound />)
    expect(screen.getByText('Page not found')).toBeInTheDocument()
  })

  it('renders Go Home link', () => {
    render(<NotFound />)
    expect(screen.getByText('Go Home')).toBeInTheDocument()
  })
})
