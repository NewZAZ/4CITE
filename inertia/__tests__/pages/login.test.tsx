import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { mockUsePage } from '../setup'
import Login from '~/pages/auth/login'

describe('Login Page', () => {
  beforeEach(() => {
    mockUsePage.mockReturnValue({ props: { user: null, flash: {} } })
  })

  it('renders login heading', () => {
    render(<Login />)
    expect(screen.getByRole('heading', { name: 'Welcome back' })).toBeInTheDocument()
  })

  it('renders email input', () => {
    render(<Login />)
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
  })

  it('renders password input', () => {
    render(<Login />)
    expect(screen.getByLabelText('Password')).toBeInTheDocument()
  })

  it('renders submit button', () => {
    render(<Login />)
    expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument()
  })

  it('renders link to register page', () => {
    render(<Login />)
    const registerLinks = screen.getAllByText('Register')
    expect(registerLinks.length).toBeGreaterThanOrEqual(1)
  })
})
