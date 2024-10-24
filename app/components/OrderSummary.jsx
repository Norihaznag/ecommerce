"use client";

import { useSelector } from "react-redux";

export default function OrderSummary() {
  // This component would typically fetch order data from a global state or context
  const cartItems = useSelector((state) => state.cart);

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
        {/* Mock order items */}
        <div className="space-y-2">
          {/* <div className="flex justify-between">
            <span>Product 1</span>
            <span>500 MAD</span>
          </div>
          <div className="flex justify-between">
            <span>Product 2</span>
            <span>300 MAD</span>
          </div>
          <div className="flex justify-between">
            <span>Product 3</span>
            <span>200 MAD</span>
          </div> */}

          {cartItems.length > 0 &&
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center py-2 border-b"
              >
                <div className="flex flex-col">
                  <span className="font-medium">{item.title}</span>
                  <span className="text-sm text-gray-500">
                    Quantity: {item.quantity}
                  </span>
                </div>
                <span className="font-bold">{item.price.toFixed(2)} MAD</span>
              </div>
            ))}
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>1000 MAD</span>
          </div>
        </div>
      </div>
      <button
        onClick={() => {
          /* Handle order confirmation */
        }}
        className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
      >
        Confirm Order
      </button>
    </div>
  );
}
