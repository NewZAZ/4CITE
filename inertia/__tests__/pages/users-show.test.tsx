import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { mockUsePage } from '../setup'
import UserShow from '~/pages/users/show'

const targetUser = {
  id: 1,
  pseudo: 'TestUser',
  email: 'test@test.com',
  role: 'user',
  createdAt: '2025-01-01',
}

const recentBookings = [
  {
    id: 1,
    checkIn: '2025-06-01',
    checkOut: '2025-06-05',
    status: 'confirmed',
    hotel: { id: 1, name: 'Grand Hotel', location: 'Paris' },
  },
]

describe('User Show Page', () => {
  it('renders user pseudo prominently', () => {
    mockUsePage.mockReturnValue({
      props: {
        user: { id: 1, pseudo: 'TestUser', email: 'test@test.com', role: 'user' },
        flash: {},
      },
    })
    render(
      <UserShow targetUser={targetUser} recentBookings={recentBookings} totalBookings={1} />
    )
    // Pseudo should be in a heading
    expect(screen.getByRole('heading', { name: /TestUser/ })).toBeInTheDocument()
  })

  it('renders user email', () => {
    mockUsePage.mockReturnValue({
      props: {
        user: { id: 1, pseudo: 'TestUser', email: 'test@test.com', role: 'user' },
        flash: {},
      },
    })
    render(
      <UserShow targetUser={targetUser} recentBookings={recentBookings} totalBookings={1} />
    )
    expect(screen.getByText('test@test.com')).toBeInTheDocument()
  })

  it('shows Edit Profile and Delete buttons on own profile', () => {
    mockUsePage.mockReturnValue({
      props: {
        user: { id: 1, pseudo: 'TestUser', email: 'test@test.com', role: 'user' },
        flash: {},
      },
    })
    render(
      <UserShow targetUser={targetUser} recentBookings={recentBookings} totalBookings={1} />
    )
    const editLinks = screen.getAllByText('Edit Profile')
    expect(editLinks.length).toBeGreaterThanOrEqual(1)
    expect(screen.getByText('Delete')).toBeInTheDocument()
  })

  it('hides Edit Profile and Delete for other users (non-admin)', () => {
    mockUsePage.mockReturnValue({
      props: {
        user: { id: 2, pseudo: 'Other', email: 'other@test.com', role: 'user' },
        flash: {},
      },
    })
    render(
      <UserShow targetUser={targetUser} recentBookings={recentBookings} totalBookings={1} />
    )
    expect(screen.queryByText('Edit Profile')).not.toBeInTheDocument()
    expect(screen.queryByText('Delete')).not.toBeInTheDocument()
  })

  it('admin can see Edit Profile on another users profile', () => {
    mockUsePage.mockReturnValue({
      props: {
        user: { id: 99, pseudo: 'Admin', email: 'admin@test.com', role: 'admin' },
        flash: {},
      },
    })
    render(
      <UserShow targetUser={targetUser} recentBookings={recentBookings} totalBookings={1} />
    )
    expect(screen.getByText('Edit Profile')).toBeInTheDocument()
  })

  it('displays total bookings count', () => {
    mockUsePage.mockReturnValue({
      props: {
        user: { id: 1, pseudo: 'TestUser', email: 'test@test.com', role: 'user' },
        flash: {},
      },
    })
    render(
      <UserShow targetUser={targetUser} recentBookings={recentBookings} totalBookings={5} />
    )
    expect(screen.getByText('5')).toBeInTheDocument()
    expect(screen.getByText('Total bookings')).toBeInTheDocument()
  })

  it('renders recent bookings table', () => {
    mockUsePage.mockReturnValue({
      props: {
        user: { id: 1, pseudo: 'TestUser', email: 'test@test.com', role: 'user' },
        flash: {},
      },
    })
    render(
      <UserShow targetUser={targetUser} recentBookings={recentBookings} totalBookings={1} />
    )
    expect(screen.getByText('Recent Bookings')).toBeInTheDocument()
    expect(screen.getByText('Grand Hotel')).toBeInTheDocument()
  })

  it('shows quick actions on own profile', () => {
    mockUsePage.mockReturnValue({
      props: {
        user: { id: 1, pseudo: 'TestUser', email: 'test@test.com', role: 'user' },
        flash: {},
      },
    })
    render(
      <UserShow targetUser={targetUser} recentBookings={recentBookings} totalBookings={1} />
    )
    expect(screen.getByText('New Booking')).toBeInTheDocument()
    expect(screen.getByText('View All Bookings')).toBeInTheDocument()
  })

  it('displays user initials in avatar', () => {
    mockUsePage.mockReturnValue({
      props: {
        user: { id: 1, pseudo: 'TestUser', email: 'test@test.com', role: 'user' },
        flash: {},
      },
    })
    render(
      <UserShow targetUser={targetUser} recentBookings={recentBookings} totalBookings={1} />
    )
    // "TE" from TestUser initials - may appear in both layout avatar and profile avatar
    const initials = screen.getAllByText('TE')
    expect(initials.length).toBeGreaterThanOrEqual(1)
  })
})
