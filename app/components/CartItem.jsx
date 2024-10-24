'use client'
import { useDispatch } from 'react-redux'
import { removeFromCart, incrementQuantity, decrementQuantity } from '../context/slices/cartSlice'
import Image from 'next/image'

export default function CartItem({ item }) {
  const dispatch = useDispatch()

  return (
    <div className="flex items-center justify-between border-b py-4">
      <div className="flex items-center">
        <Image width={32} height={32} src={item.image} alt={item.title} className="w-16 h-16 object-contain mr-4" />
        <div>
          <h3 className="font-semibold">{item.title}</h3>
          <p className="text-gray-600">${item.price.toFixed(2)}</p>
        </div>
      </div>
      <div className="flex items-center">
        <button
          onClick={() => dispatch(decrementQuantity(item.id))}
          className="bg-gray-200 px-2 py-1 rounded"
        >
          -
        </button>
        <span className="mx-2">{item.quantity}</span>
        <button
          onClick={() => dispatch(incrementQuantity(item.id))}
          className="bg-gray-200 px-2 py-1 rounded"
        >
          +
        </button>
        <button
          onClick={() => dispatch(removeFromCart(item.id))}
          className="ml-4 text-red-500"
        >
          Remove
        </button>
      </div>
    </div>
  )
}