'use client'
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Menu, Search, X } from 'lucide-react'

export default function SearchAndFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [search, setSearch] = useState(searchParams.get('search') || '')
  const [category, setCategory] = useState(searchParams.get('category') || '')
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '')
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '')
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    if (search) params.set('search', search)
    else params.delete('search')
    if (category) params.set('category', category)
    else params.delete('category')
    if (minPrice) params.set('minPrice', minPrice)
    else params.delete('minPrice')
    if (maxPrice) params.set('maxPrice', maxPrice)
    else params.delete('maxPrice')
    router.push(`/products?${params.toString()}`)
  }, [search, category, minPrice, maxPrice, searchParams, router])

  return (
    <div className="mb-6 w-full bg-gray-100 p-4 rounded-lg shadow-md">
      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
        <div className="relative flex-grow mb-4 sm:mb-0">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="p-2 bg-blue-500 text-white rounded-lg flex items-center justify-center max-sm:hidden"
        >
          {showFilters ? <X size={20} className="mr-2" /> : <Menu size={20} className="mr-2" />}
          {showFilters ? 'Close' : 'Filters'}
        </button>
      </div>
      <div className={`mt-4 space-y-4 ${showFilters ? 'block' : 'hidden sm:block'}`}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="jewelery">Jewelery</option>
            <option value="men's clothing">Mens Clothing</option>
            <option value="women's clothing">Womens Clothing</option>
          </select>
       
        </div>
      </div>
    </div>
  )
}