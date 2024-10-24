'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import Head from 'next/head'
import ProductCard from './ProductCard'
import Pagination from './Pagination'
import { JsonLd } from 'react-schemaorg'

const ITEMS_PER_PAGE = 12

export default function ProductList() {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const searchParams = useSearchParams()

  useEffect(() => {
    fetchProducts()
  }, [])

  const applyFiltersAndSearch = useCallback(() => {
    let filtered = [...products]
    const search = searchParams.get('search')?.toLowerCase()
    const category = searchParams.get('category')

    if (search) {
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(search) ||
          product.description.toLowerCase().includes(search)
      )
    }

    if (category) {
      filtered = filtered.filter((product) => product.category === category)
    }

    setFilteredProducts(filtered)
    setCurrentPage(1)
  }, [products, searchParams])

  useEffect(() => {
    applyFiltersAndSearch()
  }, [applyFiltersAndSearch])

  async function fetchProducts() {
    const res = await fetch('https://fakestoreapi.com/products')
    const data = await res.json()
    setProducts(data)
  }

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem)

  const pageTitle = `Our Products${searchParams.get('category') ? ` - ${searchParams.get('category')}` : ''}`
  const pageDescription = `Browse our wide range of products${searchParams.get('category') ? ` in the ${searchParams.get('category')} category` : ''}. Find great deals and quality items.`

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`https://your-domain.com/products${searchParams.toString() ? `?${searchParams.toString()}` : ''}`} />
      </Head>

      <JsonLd
        item={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          "itemListElement": currentItems.map((product, index) => ({
            "@type": "ListItem",
            "position": indexOfFirstItem + index + 1,
            "item": {
              "@type": "Product",
              "name": product.title,
              "description": product.description,
              "image": product.image,
              "url": `https://your-domain.com/products/${product.id}`,
              "offers": {
                "@type": "Offer",
                "price": product.price,
                "priceCurrency": "MAD"
              }
            }
          }))
        }}
      />

      <h1 className="text-3xl font-bold mb-6">{pageTitle}</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentItems.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      <Pagination
        itemsPerPage={ITEMS_PER_PAGE}
        totalItems={filteredProducts.length}
        paginate={setCurrentPage}
        currentPage={currentPage}
      />
    </>
  )
}