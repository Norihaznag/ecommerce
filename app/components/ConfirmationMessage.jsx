import Link from 'next/link'

export default function ConfirmationMessage() {
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
  )
}