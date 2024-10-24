'use client'
import { useDispatch } from 'react-redux'
import { addToCart } from '../context/slices/cartSlice'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { createProductUrl } from '../functions/seo'


export default function ProductCard({ product }) {
  const dispatch = useDispatch()
  const [isHovered, setIsHovered] = useState(false);
  const url = createProductUrl(product.id,product.title)

  return (
    <div
      className="border rounded-lg p-4 flex bg-white flex-col text-[#333333] transition-all duration-300 hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={url} className="block relative overflow-hidden group">
        <div className="relative w-full pb-[100%]">
          <Image
            src={product.image} 
            alt={product.title} 
            layout="fill"
            objectFit="contain"
            className={`transition-transform duration-300 ${isHovered ? 'scale-110' : 'scale-100'}`}
          />
        </div>
      </Link>
      <div className="mt-4 flex-grow">
        <Link href={url} className="block">
          <h2 className="text-lg font-semibold mb-2 hover:text-blue-600 transition-colors">{product.title}</h2>
        </Link>
        <p className="text-gray-600 mb-4 text-sm line-clamp-3">{product.description}</p>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center mt-auto">
        <span className="font-bold text-lg mb-2 sm:mb-0">${product.price.toFixed(2)}</span>
        <button
          onClick={() => dispatch(addToCart(product))}
          className="bg-[#D4AF37] text-[#333333] px-4 py-2 rounded hover:bg-[#f4ca41]transition-colors w-full sm:w-auto"
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}