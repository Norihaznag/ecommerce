'use client'

import { useDispatch } from 'react-redux'
import { addToCart } from '../context/slices/cartSlice'

export default function AddToCartButton({ product }) {
  const dispatch = useDispatch()

  return (
    <button
      onClick={() => dispatch(addToCart(product))}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors w-full sm:w-auto"
    >
      Add to Cart
    </button>
  )
}