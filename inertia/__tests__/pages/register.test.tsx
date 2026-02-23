import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { mockUsePage } from '../setup'
import Register from '~/pages/auth/register'

describe('Register Page', () => {
  beforeEach(() => {
    mockUsePage.mockReturnValue({ props: { user: null, flash: {} } })
  })

  it('renders create account heading', () => {
    render(<Register />)
    expect(screen.getByRole('heading', { name: 'Create an account' })).toBeInTheDocument()
  })

  it('renders pseudo input', () => {
    render(<Register />)
    expect(screen.getByLabelText('Pseudo')).toBeInTheDocument()
  })

  it('renders email input', () => {
    render(<Register />)
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
  })

  it('renders password input with minLength', () => {
    render(<Register />)
    const passwordInput = screen.getByLabelText('Password')
    expect(passwordInput).toBeInTheDocument()
    expect(passwordInput).toHaveAttribute('minLength', '8')
  })

  it('renders submit button', () => {
    render(<Register />)
    expect(screen.getByRole('button', { name: 'Create Account' })).toBeInTheDocument()
  })

  it('renders link to login page', () => {
    render(<Register />)
    const signInLinks = screen.getAllByText('Sign In')
    expect(signInLinks.length).toBeGreaterThanOrEqual(1)
  })
})
