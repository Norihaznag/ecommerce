"use client" ;
import Checkout from '../../components/Checkout'
import React from 'react'
import { useSelector } from 'react-redux';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
const CheckoutPage = () => {
  const cartItems = useSelector((state) => state.cart);

  if (cartItems.length === 0) {
  
      return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
          <div className="text-center">
            <ShoppingCart className="mx-auto h-24 w-24 text-[#1A3A5A]" />
            <h2 className="mt-6 text-3xl font-abold text-[#1A3A5A]">
              Your cart is empty
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Please choose items first before proceeding to checkout.
            </p>
          </div>
          <div className="mt-8 space-y-6">
            <Link href="/products" className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#1A3A5A] hover:bg-[#234b73] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out">
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <ArrowLeft className="h-5 w-5  " aria-hidden="true" />
              </span>
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    )}
    else
    {return (
      <Checkout/>
  )}
  }



export default CheckoutPage