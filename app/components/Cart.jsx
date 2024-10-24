"use client";
import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, incrementQuantity, decrementQuantity } from '../context/slices/cartSlice';
import { ShoppingCart, X, Plus, Minus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const Cart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const cartRef = useRef(null);

  const toggleCart = () => setIsOpen(!isOpen);

 const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="" ref={cartRef}>
      <button
        onClick={toggleCart}
        className="flex items-center text-white hover:text-gray-300 focus:outline-none"
      >
        <ShoppingCart size={24} />
        {itemCount > 0 && (
          <span className="ml-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
            {itemCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 md:w-[350px] bg-white rounded-lg w-[96vw] shadow-xl z-50 overflow-hidden">
          <div className="p-4 bg-gray-100 border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800">Your Cart</h2>
              <button onClick={toggleCart} className="text-gray-600 hover:text-gray-800">
                <X size={20} />
              </button>
            </div>
          </div>
          <div className="p-4 max-h-96 overflow-y-auto">
            {cartItems.length === 0 ? (
              <p className="text-gray-600">Your cart is empty</p>
            ) : (
              <>
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 justify-between py-2 border-b">
                    <Image src={item.image} alt='' width={50} height={50}/>
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm line-clamp-2 text-gray-800">{item.title}</h3>
                      <p className="text-xs text-gray-600">${item.price.toFixed(2)} x {item.quantity}</p>
                    </div>
                    <div className="flex items-center">
                      <button
                        onClick={() => dispatch(decrementQuantity(item.id))}
                        className="text-gray-500 hover:text-gray-700 p-1"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="mx-1 text-sm text-black">{item.quantity}</span>
                      <button
                        onClick={() => dispatch(incrementQuantity(item.id))}
                        className="text-gray-500 hover:text-gray-700 p-1"
                      >
                        <Plus size={14} />
                      </button>
                      <button
                        onClick={() => dispatch(removeFromCart(item.id))}
                        className="ml-2 text-red-500 hover:text-red-700 p-1"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
          {cartItems.length > 0 && (
            <div className="p-4 bg-gray-100 border-t">
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold text-gray-800">Total:</span>
                <span className="font-bold text-gray-800">${totalPrice.toFixed(2)}</span>
              </div>
              <Link href={'/cart/checkout'} className="w-full bg-[rgb(31,41,55)] text-white py-2 px-4 rounded hover:bg-[bg-[rgb(43, 57, 75)]] transition duration-150 ease-in-out">
                Checkout
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;