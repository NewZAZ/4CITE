import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, afterEach } from 'vitest'
import { mockUsePage, mockUseFormOverrides } from '../setup'
import HotelEdit from '~/pages/hotels/edit'

const sampleHotel = {
  id: 1,
  name: 'Grand Palace Hotel',
  location: 'Paris, France',
  description: 'A luxurious 5-star hotel in the heart of Paris.',
  pictureList: ['https://example.com/img1.jpg', 'https://example.com/img2.jpg'],
}

const hotelNoPictures = {
  id: 2,
  name: 'Beach Resort',
  location: 'Nice, France',
  description: 'Beachfront resort.',
  pictureList: null,
}

describe('Hotel Edit Page', () => {
  beforeEach(() => {
    mockUsePage.mockReturnValue({
      props: {
        user: { id: 1, pseudo: 'Admin', email: 'admin@test.com', role: 'admin' },
        flash: {},
      },
    })
  })

  it('renders Edit Hotel heading', () => {
    render(<HotelEdit hotel={sampleHotel} />)
    expect(screen.getByRole('heading', { name: 'Edit Hotel' })).toBeInTheDocument()
  })

  it('displays the hotel name in the subtitle', () => {
    render(<HotelEdit hotel={sampleHotel} />)
    expect(screen.getAllByText('Grand Palace Hotel').length).toBeGreaterThanOrEqual(1)
  })

  it('renders form fields with pre-filled hotel data', () => {
    render(<HotelEdit hotel={sampleHotel} />)
    expect(screen.getByLabelText('Hotel Name')).toHaveValue('Grand Palace Hotel')
    expect(screen.getByLabelText('Location')).toHaveValue('Paris, France')
    expect(screen.getByLabelText('Description')).toHaveValue(
      'A luxurious 5-star hotel in the heart of Paris.'
    )
  })

  it('renders Save Changes submit button', () => {
    render(<HotelEdit hotel={sampleHotel} />)
    expect(screen.getByRole('button', { name: 'Save Changes' })).toBeInTheDocument()
  })

  it('renders Cancel link pointing to hotel detail', () => {
    render(<HotelEdit hotel={sampleHotel} />)
    const cancelLink = screen.getByText('Cancel')
    expect(cancelLink).toHaveAttribute('href', '/hotels/1')
  })

  it('renders back link to hotel detail', () => {
    render(<HotelEdit hotel={sampleHotel} />)
    const backLink = screen.getByText(`Back to ${sampleHotel.name}`)
    expect(backLink).toHaveAttribute('href', '/hotels/1')
  })

  it('renders image URL input and Add button', () => {
    render(<HotelEdit hotel={sampleHotel} />)
    expect(screen.getByPlaceholderText('Paste image URL and click Add')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument()
  })

  it('renders existing images from pictureList', () => {
    render(<HotelEdit hotel={sampleHotel} />)
    const images = screen.getAllByRole('img', { name: /Photo \d+/ })
    expect(images).toHaveLength(2)
  })

  it('handles null pictureList gracefully', () => {
    render(<HotelEdit hotel={hotelNoPictures} />)
    expect(screen.queryAllByRole('img', { name: /Photo \d+/ })).toHaveLength(0)
  })

  it('renders Live Preview sidebar', () => {
    render(<HotelEdit hotel={sampleHotel} />)
    expect(screen.getByText('Live Preview')).toBeInTheDocument()
  })

  it('shows photo count in preview when images exist', () => {
    render(<HotelEdit hotel={sampleHotel} />)
    expect(screen.getByText('2 photos added')).toBeInTheDocument()
  })

  it('marks name, location, and description as required', () => {
    render(<HotelEdit hotel={sampleHotel} />)
    expect(screen.getByLabelText('Hotel Name')).toBeRequired()
    expect(screen.getByLabelText('Location')).toBeRequired()
    expect(screen.getByLabelText('Description')).toBeRequired()
  })

  afterEach(() => {
    Object.keys(mockUseFormOverrides).forEach((k) => delete mockUseFormOverrides[k])
  })

  it('displays name error when present', () => {
    Object.assign(mockUseFormOverrides, { errors: { name: 'Name is required' } })
    render(<HotelEdit hotel={sampleHotel} />)
    expect(screen.getByText('Name is required')).toBeInTheDocument()
  })

  it('displays location error when present', () => {
    Object.assign(mockUseFormOverrides, { errors: { location: 'Location is required' } })
    render(<HotelEdit hotel={sampleHotel} />)
    expect(screen.getByText('Location is required')).toBeInTheDocument()
  })

  it('displays description error when present', () => {
    Object.assign(mockUseFormOverrides, { errors: { description: 'Description is required' } })
    render(<HotelEdit hotel={sampleHotel} />)
    expect(screen.getByText('Description is required')).toBeInTheDocument()
  })

  it('shows processing state on submit button', () => {
    Object.assign(mockUseFormOverrides, { processing: true })
    render(<HotelEdit hotel={sampleHotel} />)
    expect(screen.getByRole('button', { name: 'Saving...' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Saving...' })).toBeDisabled()
  })

  it('calls put on form submit', () => {
    const putMock = vi.fn()
    Object.assign(mockUseFormOverrides, { put: putMock })
    render(<HotelEdit hotel={sampleHotel} />)
    const form = screen.getByRole('button', { name: 'Save Changes' }).closest('form')!
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }))
    expect(putMock).toHaveBeenCalledWith('/hotels/1')
  })

  it('shows singular photo text for one image', () => {
    const hotelOnePhoto = { ...sampleHotel, pictureList: ['https://example.com/img1.jpg'] }
    render(<HotelEdit hotel={hotelOnePhoto} />)
    expect(screen.getByText('1 photo added')).toBeInTheDocument()
  })

  it('triggers setData when typing in form fields', () => {
    const setDataMock = vi.fn()
    Object.assign(mockUseFormOverrides, { setData: setDataMock })
    render(<HotelEdit hotel={sampleHotel} />)
    fireEvent.change(screen.getByLabelText('Hotel Name'), { target: { value: 'Updated' } })
    expect(setDataMock).toHaveBeenCalledWith('name', 'Updated')
    fireEvent.change(screen.getByLabelText('Location'), { target: { value: 'London' } })
    expect(setDataMock).toHaveBeenCalledWith('location', 'London')
    fireEvent.change(screen.getByLabelText('Description'), { target: { value: 'New desc' } })
    expect(setDataMock).toHaveBeenCalledWith('description', 'New desc')
  })

  it('clicking Add with URL calls addImage', () => {
    const setDataMock = vi.fn()
    Object.assign(mockUseFormOverrides, { setData: setDataMock })
    render(<HotelEdit hotel={hotelNoPictures} />)
    const urlInput = screen.getByPlaceholderText('Paste image URL and click Add')
    fireEvent.change(urlInput, { target: { value: 'https://example.com/new.jpg' } })
    fireEvent.click(screen.getByRole('button', { name: 'Add' }))
    expect(setDataMock).toHaveBeenCalledWith('pictureList', ['https://example.com/new.jpg'])
  })

  it('pressing Enter in URL input adds image', () => {
    const setDataMock = vi.fn()
    Object.assign(mockUseFormOverrides, { setData: setDataMock })
    render(<HotelEdit hotel={hotelNoPictures} />)
    const urlInput = screen.getByPlaceholderText('Paste image URL and click Add')
    fireEvent.change(urlInput, { target: { value: 'https://example.com/new.jpg' } })
    fireEvent.keyDown(urlInput, { key: 'Enter' })
    expect(setDataMock).toHaveBeenCalledWith('pictureList', ['https://example.com/new.jpg'])
  })

  it('clicking remove button removes image', () => {
    const setDataMock = vi.fn()
    Object.assign(mockUseFormOverrides, { setData: setDataMock })
    render(<HotelEdit hotel={sampleHotel} />)
    const removeButtons = screen.getAllByRole('button').filter(
      (btn) => btn.closest('.relative.group') !== null
    )
    expect(removeButtons.length).toBe(2)
    fireEvent.click(removeButtons[0])
    expect(setDataMock).toHaveBeenCalledWith('pictureList', ['https://example.com/img2.jpg'])
  })
})
