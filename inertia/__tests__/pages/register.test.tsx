import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, afterEach } from 'vitest'
import { mockUsePage, mockUseFormOverrides } from '../setup'
import Register from '~/pages/auth/register'

describe('Register Page', () => {
  beforeEach(() => {
    mockUsePage.mockReturnValue({ props: { user: null, flash: {} } })
  })

  afterEach(() => {
    Object.keys(mockUseFormOverrides).forEach((k) => delete mockUseFormOverrides[k])
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

  it('displays pseudo error when present', () => {
    Object.assign(mockUseFormOverrides, { errors: { pseudo: 'Pseudo is required' } })
    render(<Register />)
    expect(screen.getByText('Pseudo is required')).toBeInTheDocument()
  })

  it('displays email error when present', () => {
    Object.assign(mockUseFormOverrides, { errors: { email: 'Email already taken' } })
    render(<Register />)
    expect(screen.getByText('Email already taken')).toBeInTheDocument()
  })

  it('displays password error when present', () => {
    Object.assign(mockUseFormOverrides, { errors: { password: 'Too short' } })
    render(<Register />)
    expect(screen.getByText('Too short')).toBeInTheDocument()
  })

  it('shows processing state on submit button', () => {
    Object.assign(mockUseFormOverrides, { processing: true })
    render(<Register />)
    expect(screen.getByRole('button', { name: 'Creating account...' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Creating account...' })).toBeDisabled()
  })

  it('calls post on form submit', () => {
    const postMock = vi.fn()
    Object.assign(mockUseFormOverrides, { post: postMock })
    render(<Register />)
    const form = screen.getByRole('button', { name: 'Create Account' }).closest('form')!
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }))
    expect(postMock).toHaveBeenCalledWith('/register')
  })

  it('triggers setData when typing in form fields', () => {
    const setDataMock = vi.fn()
    Object.assign(mockUseFormOverrides, { setData: setDataMock })
    render(<Register />)
    fireEvent.change(screen.getByLabelText('Pseudo'), { target: { value: 'MyPseudo' } })
    expect(setDataMock).toHaveBeenCalledWith('pseudo', 'MyPseudo')
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@test.com' } })
    expect(setDataMock).toHaveBeenCalledWith('email', 'test@test.com')
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } })
    expect(setDataMock).toHaveBeenCalledWith('password', 'password123')
  })
})
