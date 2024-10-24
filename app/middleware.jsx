import { NextResponse } from 'next/server'
import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '@/app/context/slices/cartSlice'  // You'll need to create this

export function middleware(request) {
  if (request.nextUrl.pathname === '/cart/checkout') {
    // Initialize the Redux store using configureStore
    const store = configureStore({
      reducer: {
        cart: cartReducer
      }
    })

    // Get the current state
    const state = store.getState()

    // Check if the cart is empty
    if (state.cart.items.length === 0) {
      // Redirect to the cart page with a message
      return NextResponse.redirect(new URL('/cart?message=Your cart is empty', request.url))
    }
  }

  // Allow the request to continue
  return NextResponse.next()
}

// Specify which routes this middleware should run on
export const config = {
  matcher: '/cart/checkout',
}

// In your page component (e.g., pages/cart/checkout.js)
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const CheckoutPage = () => {
  const router = useRouter()
  const cartItems = useSelector((state) => state.cart.items)

  useEffect(() => {
    if (cartItems.length === 0) {
      router.push('/cart?message=Your cart is empty')
    }
  }, [cartItems, router])

  return (
    <div>
      {/* Your checkout page content */}
    </div>
  )
}

export default CheckoutPage