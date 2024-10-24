'use client'
import { useSelector } from 'react-redux'
import CartItem from './CartItem'

export default function CartList() {
  const cartItems = useSelector((state) => state.cart)

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)

  return (
    <>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
          <div className="mt-8">
            <h2 className="text-xl font-semibold">Total: ${total.toFixed(2)}</h2>
          </div>
        </>
      )}
    </>
  )
}