import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, afterEach } from 'vitest'
import { mockUsePage, mockUseFormOverrides } from '../setup'
import HotelCreate from '~/pages/hotels/create'

describe('Hotel Create Page', () => {
  beforeEach(() => {
    mockUsePage.mockReturnValue({
      props: {
        user: { id: 1, pseudo: 'Admin', email: 'admin@test.com', role: 'admin' },
        flash: {},
      },
    })
  })

  it('renders page heading', () => {
    render(<HotelCreate />)
    expect(screen.getByRole('heading', { name: 'Add New Hotel' })).toBeInTheDocument()
  })

  it('renders Hotel Name input', () => {
    render(<HotelCreate />)
    expect(screen.getByLabelText('Hotel Name')).toBeInTheDocument()
  })

  it('renders Location input', () => {
    render(<HotelCreate />)
    expect(screen.getByLabelText('Location')).toBeInTheDocument()
  })

  it('renders Description textarea', () => {
    render(<HotelCreate />)
    expect(screen.getByLabelText('Description')).toBeInTheDocument()
  })

  it('renders Photos section with URL input', () => {
    render(<HotelCreate />)
    expect(screen.getByPlaceholderText('Paste image URL and click Add')).toBeInTheDocument()
  })

  it('renders Add button for images', () => {
    render(<HotelCreate />)
    expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument()
  })

  it('renders Create Hotel submit button', () => {
    render(<HotelCreate />)
    expect(screen.getByRole('button', { name: 'Create Hotel' })).toBeInTheDocument()
  })

  it('renders Cancel link', () => {
    render(<HotelCreate />)
    expect(screen.getByText('Cancel')).toBeInTheDocument()
  })

  it('renders Back to hotels link', () => {
    render(<HotelCreate />)
    expect(screen.getByText('Back to hotels')).toBeInTheDocument()
  })

  it('renders tips sidebar', () => {
    render(<HotelCreate />)
    expect(screen.getByText('Tips')).toBeInTheDocument()
  })

  it('renders preview sidebar with default placeholders', () => {
    render(<HotelCreate />)
    expect(screen.getByText('Preview')).toBeInTheDocument()
    expect(screen.getByText('Description will appear here...')).toBeInTheDocument()
  })

  it('marks name, location, and description as required', () => {
    render(<HotelCreate />)
    expect(screen.getByLabelText('Hotel Name')).toBeRequired()
    expect(screen.getByLabelText('Location')).toBeRequired()
    expect(screen.getByLabelText('Description')).toBeRequired()
  })

  it('renders image URL input as type url', () => {
    render(<HotelCreate />)
    const urlInput = screen.getByPlaceholderText('Paste image URL and click Add')
    expect(urlInput).toHaveAttribute('type', 'url')
  })

  afterEach(() => {
    Object.keys(mockUseFormOverrides).forEach((k) => delete mockUseFormOverrides[k])
  })

  it('displays name error when present', () => {
    Object.assign(mockUseFormOverrides, { errors: { name: 'Name is required' } })
    render(<HotelCreate />)
    expect(screen.getByText('Name is required')).toBeInTheDocument()
  })

  it('displays location error when present', () => {
    Object.assign(mockUseFormOverrides, { errors: { location: 'Location is required' } })
    render(<HotelCreate />)
    expect(screen.getByText('Location is required')).toBeInTheDocument()
  })

  it('displays description error when present', () => {
    Object.assign(mockUseFormOverrides, { errors: { description: 'Description is required' } })
    render(<HotelCreate />)
    expect(screen.getByText('Description is required')).toBeInTheDocument()
  })

  it('shows processing state on submit button', () => {
    Object.assign(mockUseFormOverrides, { processing: true })
    render(<HotelCreate />)
    expect(screen.getByRole('button', { name: 'Creating...' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Creating...' })).toBeDisabled()
  })

  it('calls post on form submit', () => {
    const postMock = vi.fn()
    Object.assign(mockUseFormOverrides, { post: postMock })
    render(<HotelCreate />)
    const form = screen.getByRole('button', { name: 'Create Hotel' }).closest('form')!
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }))
    expect(postMock).toHaveBeenCalledWith('/hotels')
  })

  it('triggers setData when typing in form fields', () => {
    const setDataMock = vi.fn()
    Object.assign(mockUseFormOverrides, { setData: setDataMock })
    render(<HotelCreate />)
    fireEvent.change(screen.getByLabelText('Hotel Name'), { target: { value: 'New Hotel' } })
    expect(setDataMock).toHaveBeenCalledWith('name', 'New Hotel')
    fireEvent.change(screen.getByLabelText('Location'), { target: { value: 'Paris' } })
    expect(setDataMock).toHaveBeenCalledWith('location', 'Paris')
    fireEvent.change(screen.getByLabelText('Description'), { target: { value: 'Desc' } })
    expect(setDataMock).toHaveBeenCalledWith('description', 'Desc')
  })

  it('renders image grid when pictureList has items', () => {
    Object.assign(mockUseFormOverrides, {
      data: {
        name: 'Test Hotel',
        location: 'Paris',
        description: 'A hotel',
        pictureList: ['https://example.com/img1.jpg', 'https://example.com/img2.jpg'],
      },
    })
    render(<HotelCreate />)
    const images = screen.getAllByRole('img', { name: /Photo \d+/ })
    expect(images).toHaveLength(2)
  })

  it('renders preview with hotel data in sidebar', () => {
    Object.assign(mockUseFormOverrides, {
      data: {
        name: 'Grand Hotel',
        location: 'Paris, France',
        description: 'Luxury hotel',
        pictureList: ['https://example.com/img.jpg'],
      },
    })
    render(<HotelCreate />)
    // Preview shows the data
    expect(screen.getAllByText('Grand Hotel').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Paris, France').length).toBeGreaterThanOrEqual(1)
  })

  it('clicking Add with empty URL does not call setData', () => {
    const setDataMock = vi.fn()
    Object.assign(mockUseFormOverrides, { setData: setDataMock })
    render(<HotelCreate />)
    fireEvent.click(screen.getByRole('button', { name: 'Add' }))
    expect(setDataMock).not.toHaveBeenCalledWith('pictureList', expect.anything())
  })

  it('clicking Add with URL in input calls addImage', () => {
    const setDataMock = vi.fn()
    Object.assign(mockUseFormOverrides, {
      setData: setDataMock,
      data: { name: '', location: '', description: '', pictureList: [] },
    })
    render(<HotelCreate />)
    const urlInput = screen.getByPlaceholderText('Paste image URL and click Add')
    fireEvent.change(urlInput, { target: { value: 'https://example.com/photo.jpg' } })
    fireEvent.click(screen.getByRole('button', { name: 'Add' }))
    expect(setDataMock).toHaveBeenCalledWith('pictureList', ['https://example.com/photo.jpg'])
  })

  it('pressing Enter in URL input adds image', () => {
    const setDataMock = vi.fn()
    Object.assign(mockUseFormOverrides, {
      setData: setDataMock,
      data: { name: '', location: '', description: '', pictureList: [] },
    })
    render(<HotelCreate />)
    const urlInput = screen.getByPlaceholderText('Paste image URL and click Add')
    fireEvent.change(urlInput, { target: { value: 'https://example.com/photo.jpg' } })
    fireEvent.keyDown(urlInput, { key: 'Enter' })
    expect(setDataMock).toHaveBeenCalledWith('pictureList', ['https://example.com/photo.jpg'])
  })

  it('clicking remove button calls removeImage', () => {
    const setDataMock = vi.fn()
    Object.assign(mockUseFormOverrides, {
      setData: setDataMock,
      data: {
        name: '',
        location: '',
        description: '',
        pictureList: ['https://example.com/img1.jpg', 'https://example.com/img2.jpg'],
      },
    })
    render(<HotelCreate />)
    // Find remove buttons (they are inside the image grid)
    const removeButtons = screen.getAllByRole('button').filter(
      (btn) => btn.closest('.relative.group') !== null
    )
    expect(removeButtons.length).toBe(2)
    fireEvent.click(removeButtons[0])
    expect(setDataMock).toHaveBeenCalledWith('pictureList', ['https://example.com/img2.jpg'])
  })
})
