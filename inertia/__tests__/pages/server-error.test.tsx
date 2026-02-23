import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { mockUsePage } from '../setup'
import ServerError from '~/pages/errors/server_error'

describe('Server Error Page', () => {
  beforeEach(() => {
    mockUsePage.mockReturnValue({ props: { user: null, flash: {} } })
  })

  it('renders 500 code', () => {
    render(<ServerError error={null} />)
    expect(screen.getByText('500')).toBeInTheDocument()
  })

  it('renders Server Error heading', () => {
    render(<ServerError error={null} />)
    expect(screen.getByText('Server Error')).toBeInTheDocument()
  })

  it('renders default error message when no error provided', () => {
    render(<ServerError error={null} />)
    expect(screen.getByText('Something went wrong.')).toBeInTheDocument()
  })

  it('renders custom error message', () => {
    render(<ServerError error={{ message: 'Database connection failed' }} />)
    expect(screen.getByText('Database connection failed')).toBeInTheDocument()
  })

  it('renders Go Home link', () => {
    render(<ServerError error={null} />)
    expect(screen.getByText('Go Home')).toBeInTheDocument()
  })
})
