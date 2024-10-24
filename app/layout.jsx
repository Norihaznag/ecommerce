import Cart from './components/Cart'
import Footer from './components/Footer'
import Header from './components/Header'
import { ContextProvider } from './context/ContextProvider'
import './globals.css'

export const metadata = {
  title: 'E-commerce Store',
  description: 'A simple e-commerce store built with Next.js and Redux',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ContextProvider>
         <Header/>
          <main className="flex-grow bg-[#F4F4F4] text-[#333333] ">{children}</main>
          <Footer/>
        </ContextProvider>
      </body>
    </html>
  )
}