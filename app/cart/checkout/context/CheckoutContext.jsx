'use client'

import { createContext, useContext, useState } from 'react'

const CheckoutContext = createContext()

export function CheckoutProvider({ children }) {
  const [step, setStep] = useState(1) ;

  return (
    <CheckoutContext.Provider value={{ step, setStep }}>
      {children}
    </CheckoutContext.Provider>
  )
}

export function useCheckoutContext() {
  return useContext(CheckoutContext)
}