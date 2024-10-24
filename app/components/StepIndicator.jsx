'use client'

import { useCheckoutContext } from '@/app/cart/checkout/context/CheckoutContext'

export default function StepIndicator() {
  const { step } = useCheckoutContext()

  const steps = [
    { number: 1, title: 'Delivery Information' },
    { number: 2, title: 'Order Summary' },
    { number: 3, title: 'Confirmation' },
  ]

  return (
    <div className="mb-8 ">
      <div className="flex items-center justify-between">
        {steps.map((s) => (
          <button key={s.number} className={`flex items-center ${step >= s.number ? 'text-green-600' : 'text-gray-400'}`}>
            <span className={`flex items-center justify-center w-8 h-8 border-2 rounded-full mr-2 ${step >= s.number ? 'border-green-600' : 'border-gray-400'}`}>
              {s.number}
            </span>
            <span className="text-sm font-medium">{s.title}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
