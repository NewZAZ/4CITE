import { Head, Link, useForm } from '@inertiajs/react'
import Layout from '~/components/layout'
import { useState } from 'react'

export default function HotelCreate() {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    location: '',
    description: '',
    pictureList: [] as string[],
  })
  const [imageUrl, setImageUrl] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    post('/hotels')
  }

  function addImage() {
    const url = imageUrl.trim()
    if (url && !data.pictureList.includes(url)) {
      setData('pictureList', [...data.pictureList, url])
      setImageUrl('')
    }
  }

  function removeImage(index: number) {
    setData(
      'pictureList',
      data.pictureList.filter((_, i) => i !== index)
    )
  }

  return (
    <Layout>
      <Head title="Add Hotel" />

      <div className="mb-8 animate-fade-in">
        <Link
          href="/hotels"
          className="text-brass-dark hover:text-brass text-sm font-medium inline-flex items-center gap-1.5 transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z"
              clipRule="evenodd"
            />
          </svg>
          Back to hotels
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in animate-delay-1">
        {/* Form - takes 2 columns */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl card-shadow overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-brass to-brass-light" />
            <div className="p-8 lg:p-10">
              <h1 className="text-3xl font-bold text-charcoal mb-2">Add New Hotel</h1>
              <p className="text-warm-gray text-sm mb-10">
                Fill in the details below to add a new hotel to the platform.
              </p>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Name & Location side by side on desktop */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-charcoal-light mb-2"
                    >
                      Hotel Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={data.name}
                      onChange={(e) => setData('name', e.target.value)}
                      placeholder="e.g. Grand Palace Hotel"
                      className="block w-full rounded-lg border border-cream bg-ivory/50 px-4 py-3 text-charcoal placeholder:text-warm-gray-light focus:border-brass focus:ring-1 focus:ring-brass focus:outline-none transition-colors"
                      required
                    />
                    {errors.name && <p className="mt-1.5 text-sm text-rose">{errors.name}</p>}
                  </div>
                  <div>
                    <label
                      htmlFor="location"
                      className="block text-sm font-medium text-charcoal-light mb-2"
                    >
                      Location
                    </label>
                    <input
                      id="location"
                      type="text"
                      value={data.location}
                      onChange={(e) => setData('location', e.target.value)}
                      placeholder="e.g. Paris, France"
                      className="block w-full rounded-lg border border-cream bg-ivory/50 px-4 py-3 text-charcoal placeholder:text-warm-gray-light focus:border-brass focus:ring-1 focus:ring-brass focus:outline-none transition-colors"
                      required
                    />
                    {errors.location && (
                      <p className="mt-1.5 text-sm text-rose">{errors.location}</p>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-charcoal-light mb-2"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    rows={6}
                    placeholder="Describe the hotel, its amenities, atmosphere, and what makes it special..."
                    className="block w-full rounded-lg border border-cream bg-ivory/50 px-4 py-3 text-charcoal placeholder:text-warm-gray-light focus:border-brass focus:ring-1 focus:ring-brass focus:outline-none transition-colors resize-none"
                    required
                  />
                  {errors.description && (
                    <p className="mt-1.5 text-sm text-rose">{errors.description}</p>
                  )}
                </div>

                {/* Image URLs */}
                <div>
                  <label className="block text-sm font-medium text-charcoal-light mb-2">
                    Photos
                  </label>
                  <div className="flex gap-3">
                    <input
                      type="url"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="Paste image URL and click Add"
                      className="flex-1 rounded-lg border border-cream bg-ivory/50 px-4 py-3 text-charcoal placeholder:text-warm-gray-light focus:border-brass focus:ring-1 focus:ring-brass focus:outline-none transition-colors"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          addImage()
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={addImage}
                      className="bg-cream hover:bg-ivory-dark text-charcoal-light px-5 py-3 rounded-lg text-sm font-medium transition-colors shrink-0"
                    >
                      Add
                    </button>
                  </div>

                  {data.pictureList.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
                      {data.pictureList.map((url, i) => (
                        <div
                          key={i}
                          className="relative group rounded-lg overflow-hidden h-28 bg-cream"
                        >
                          <img
                            src={url}
                            alt={`Photo ${i + 1}`}
                            className="w-full h-full object-cover"
                            onError={(e) =>
                              ((e.target as HTMLImageElement).src =
                                'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%23f5f0e8" width="100" height="100"/><text x="50" y="55" text-anchor="middle" fill="%23a8a29e" font-size="12">Invalid URL</text></svg>')
                            }
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(i)}
                            className="absolute top-1.5 right-1.5 w-6 h-6 bg-charcoal/70 hover:bg-rose text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <svg
                              className="w-3 h-3"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Submit */}
                <div className="flex gap-3 pt-4 border-t border-cream">
                  <button
                    type="submit"
                    disabled={processing}
                    className="bg-brass hover:bg-brass-light text-charcoal font-semibold py-3 px-8 rounded-lg disabled:opacity-50 transition-all hover:shadow-lg hover:shadow-brass/20 tracking-wide"
                  >
                    {processing ? 'Creating...' : 'Create Hotel'}
                  </button>
                  <Link
                    href="/hotels"
                    className="bg-cream hover:bg-ivory-dark text-charcoal-light font-medium py-3 px-6 rounded-lg transition-colors"
                  >
                    Cancel
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Sidebar - tips */}
        <div className="lg:col-span-1 space-y-6">
          {/* Preview card */}
          <div className="bg-white rounded-2xl card-shadow p-6">
            <div className="flex items-center gap-2 mb-4">
              <svg
                className="w-4 h-4 text-brass"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4" />
                <path d="M12 8h.01" />
              </svg>
              <h3 className="text-xs font-semibold text-warm-gray uppercase tracking-wider">
                Tips
              </h3>
            </div>
            <ul className="space-y-3 text-sm text-warm-gray leading-relaxed">
              <li className="flex gap-2.5">
                <span className="text-brass mt-0.5 shrink-0">1.</span>
                Use a clear, recognizable hotel name that guests can easily find.
              </li>
              <li className="flex gap-2.5">
                <span className="text-brass mt-0.5 shrink-0">2.</span>
                Include the city and country in the location field for better discoverability.
              </li>
              <li className="flex gap-2.5">
                <span className="text-brass mt-0.5 shrink-0">3.</span>
                Write a compelling description highlighting key amenities and unique features.
              </li>
              <li className="flex gap-2.5">
                <span className="text-brass mt-0.5 shrink-0">4.</span>
                Add multiple high-quality photos to showcase the property.
              </li>
            </ul>
          </div>

          {/* Quick stats */}
          <div className="bg-white rounded-2xl card-shadow p-6">
            <div className="flex items-center gap-2 mb-4">
              <svg
                className="w-4 h-4 text-brass"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              <h3 className="text-xs font-semibold text-warm-gray uppercase tracking-wider">
                Preview
              </h3>
            </div>
            <div className="rounded-xl bg-ivory p-5">
              <div className="h-24 bg-cream rounded-lg flex items-center justify-center mb-4">
                {data.pictureList.length > 0 ? (
                  <img
                    src={data.pictureList[0]}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <svg
                    className="w-8 h-8 text-warm-gray-light"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                )}
              </div>
              <p className="font-semibold text-charcoal text-sm truncate">
                {data.name || 'Hotel Name'}
              </p>
              <p className="text-xs text-warm-gray mt-0.5 truncate">
                {data.location || 'Location'}
              </p>
              <p className="text-xs text-warm-gray-light mt-2 line-clamp-2">
                {data.description || 'Description will appear here...'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
