import { CheckoutProvider } from './context/CheckoutContext'

export default function CheckoutLayout({ children }) {
  return (
    <CheckoutProvider>
      {children}
    </CheckoutProvider>
  )
}