"use client" ;
import React from 'react';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Truck, CreditCard, Phone } from 'lucide-react';
import { useSelector } from 'react-redux';
import CheckoutConfirmationButton from './CheckoutConfirmation';

export const metadata = {
  title: 'Checkout - Pay After Delivery | Our E-commerce Store',
  description: 'Complete your order with our convenient Pay After Delivery option in Morocco.',
};

export default function Checkout() {
  const [step, setStep] = useState(1);
  const cartItems = useSelector((state) => state.cart);
  
 const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
 const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);


  const steps = [
    { number: 1, title: 'Delivery Information' },
    { number: 2, title: 'Order Summary' },
    { number: 3, title: 'Confirmation' },
  ];

  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    city: '',
    phone: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Continue to Order Summary
            </button>
          </form>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
              {/* Mock order items */}
              {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 justify-between py-2 border-b">
                    <Image src={item.image} alt='' width={50} height={50}/>
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm line-clamp-2 text-gray-800">{item.title}</h3>
                      <p className="text-xs text-gray-600">${item.price.toFixed(2)} x {item.quantity}</p>
                    </div>
                    <div className="flex items-center">
                     
                      <span className="mx-1 text-sm text-black">{item.quantity}</span>
                   
                    </div>
                  </div>
                ))}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>{totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-6">

            <button
              onClick={() => setStep( step - 1)}
              className="w-full bg-blue-100 text-blue-600 font-bold py-2 px-4 rounded-md hover:bg-blue-200 transition duration-300"
            >
              Return
            </button>

            {/* <button
              onClick={() => setStep(3)}
              className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Confirm Order
            </button> */}
            <CheckoutConfirmationButton setStep={(step)=> setStep(step) }/>

            </div>
            

          </div>
        );
      case 3:
        return (
          <div className="text-center space-y-4">
            <div className="text-5xl mb-4">🎉</div>
            <h3 className="text-2xl font-semibold">Thank You for Your Order!</h3>
            <p>Your order has been placed successfully.</p>
            <p>Order Number: #MOR12345</p>
            <p>Well contact you soon to arrange the delivery and payment.</p>
            <Link href="/" className="inline-block mt-4 bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300">
              Return to Home
            </Link>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center text-blue-600 hover:text-blue-800">
              <ArrowLeft className="mr-2" />
              Back to Shopping
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((s) => (
              <div  key={s.number} className={`flex items-center ${step >= s.number ? 'text-blue-600' : 'text-gray-400'}`}>
                <span className={`flex items-center justify-center w-8 h-8 border-2 rounded-full mr-2 ${step >= s.number ? 'border-blue-600' : 'border-gray-400'}`}>
                  {s.number}
                </span>
                <span className="text-sm font-medium">{s.title}</span>
              </div>
            ))}
          </div>
        </div>

        {renderStepContent()}

        <div className="mt-1 p-22">
          <h3 className="text-lg font-semibold mb-4">Why Choose Pay After Delivery?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-md text-center">
              <Truck className="mx-auto text-blue-600 w-8 h-8 mb-2" />
              <h4 className="font-semibold mb-1">Convenient Delivery</h4>
              <p className="text-sm text-gray-600">We deliver right to your doorstep across Morocco.</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md text-center">
              <CreditCard className="mx-auto text-blue-600 w-8 h-8 mb-2" />
              <h4 className="font-semibold mb-1">Secure Payment</h4>
              <p className="text-sm text-gray-600">Pay cash or card only when you receive your items.</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md text-center">
              <Phone className="mx-auto text-blue-600 w-8 h-8 mb-2" />
              <h4 className="font-semibold mb-1">Easy Communication</h4>
              <p className="text-sm text-gray-600">Our team will contact you to arrange delivery.</p>
            </div>
          </div>
        </div>
      </main>

    
    </div>
  );
}