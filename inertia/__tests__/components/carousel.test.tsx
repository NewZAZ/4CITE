import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Carousel from '~/components/carousel'

describe('Carousel Component', () => {
  describe('empty state', () => {
    it('renders placeholder when no images', () => {
      render(<Carousel images={[]} alt="Hotel" />)
      expect(screen.getByText('No images available')).toBeInTheDocument()
    })

    it('does not render navigation arrows when no images', () => {
      render(<Carousel images={[]} alt="Hotel" />)
      expect(screen.queryByLabelText('Previous image')).not.toBeInTheDocument()
      expect(screen.queryByLabelText('Next image')).not.toBeInTheDocument()
    })
  })

  describe('single image', () => {
    it('renders the image', () => {
      render(<Carousel images={['https://example.com/img.jpg']} alt="Hotel" />)
      const img = screen.getByAltText('Hotel 1')
      expect(img).toBeInTheDocument()
      expect(img).toHaveAttribute('src', 'https://example.com/img.jpg')
    })

    it('does not render navigation arrows for single image', () => {
      render(<Carousel images={['https://example.com/img.jpg']} alt="Hotel" />)
      expect(screen.queryByLabelText('Previous image')).not.toBeInTheDocument()
      expect(screen.queryByLabelText('Next image')).not.toBeInTheDocument()
    })

    it('does not render dot indicators for single image', () => {
      render(<Carousel images={['https://example.com/img.jpg']} alt="Hotel" />)
      expect(screen.queryByLabelText(/Go to image/)).not.toBeInTheDocument()
    })
  })

  describe('multiple images', () => {
    const images = [
      'https://example.com/img1.jpg',
      'https://example.com/img2.jpg',
      'https://example.com/img3.jpg',
    ]

    it('renders all images', () => {
      render(<Carousel images={images} alt="Hotel" />)
      expect(screen.getByAltText('Hotel 1')).toBeInTheDocument()
      expect(screen.getByAltText('Hotel 2')).toBeInTheDocument()
      expect(screen.getByAltText('Hotel 3')).toBeInTheDocument()
    })

    it('renders Previous and Next arrows', () => {
      render(<Carousel images={images} alt="Hotel" />)
      expect(screen.getByLabelText('Previous image')).toBeInTheDocument()
      expect(screen.getByLabelText('Next image')).toBeInTheDocument()
    })

    it('renders dot indicators for each image', () => {
      render(<Carousel images={images} alt="Hotel" />)
      expect(screen.getByLabelText('Go to image 1')).toBeInTheDocument()
      expect(screen.getByLabelText('Go to image 2')).toBeInTheDocument()
      expect(screen.getByLabelText('Go to image 3')).toBeInTheDocument()
    })

    it('navigates to next image on Next click', () => {
      render(<Carousel images={images} alt="Hotel" />)
      const container = screen.getByAltText('Hotel 1').parentElement!
      expect(container).toHaveStyle({ transform: 'translateX(-0%)' })

      fireEvent.click(screen.getByLabelText('Next image'))
      expect(container).toHaveStyle({ transform: 'translateX(-100%)' })
    })

    it('navigates to previous image on Previous click', () => {
      render(<Carousel images={images} alt="Hotel" />)
      // Click next first to go to image 2
      fireEvent.click(screen.getByLabelText('Next image'))
      // Then click previous to go back to image 1
      fireEvent.click(screen.getByLabelText('Previous image'))
      const container = screen.getByAltText('Hotel 1').parentElement!
      expect(container).toHaveStyle({ transform: 'translateX(-0%)' })
    })

    it('wraps to last image when clicking Previous on first image', () => {
      render(<Carousel images={images} alt="Hotel" />)
      fireEvent.click(screen.getByLabelText('Previous image'))
      const container = screen.getByAltText('Hotel 1').parentElement!
      expect(container).toHaveStyle({ transform: 'translateX(-200%)' })
    })

    it('wraps to first image when clicking Next on last image', () => {
      render(<Carousel images={images} alt="Hotel" />)
      // Navigate to last image
      fireEvent.click(screen.getByLabelText('Next image'))
      fireEvent.click(screen.getByLabelText('Next image'))
      // Now on image 3, click next should wrap to image 1
      fireEvent.click(screen.getByLabelText('Next image'))
      const container = screen.getByAltText('Hotel 1').parentElement!
      expect(container).toHaveStyle({ transform: 'translateX(-0%)' })
    })

    it('navigates to specific image on dot click', () => {
      render(<Carousel images={images} alt="Hotel" />)
      fireEvent.click(screen.getByLabelText('Go to image 3'))
      const container = screen.getByAltText('Hotel 1').parentElement!
      expect(container).toHaveStyle({ transform: 'translateX(-200%)' })
    })

    it('navigates with ArrowRight keyboard event', () => {
      render(<Carousel images={images} alt="Hotel" />)
      fireEvent.keyDown(window, { key: 'ArrowRight' })
      const container = screen.getByAltText('Hotel 1').parentElement!
      expect(container).toHaveStyle({ transform: 'translateX(-100%)' })
    })

    it('navigates with ArrowLeft keyboard event', () => {
      render(<Carousel images={images} alt="Hotel" />)
      // Go to image 2 first
      fireEvent.keyDown(window, { key: 'ArrowRight' })
      // Then go back to image 1
      fireEvent.keyDown(window, { key: 'ArrowLeft' })
      const container = screen.getByAltText('Hotel 1').parentElement!
      expect(container).toHaveStyle({ transform: 'translateX(-0%)' })
    })
  })
})
