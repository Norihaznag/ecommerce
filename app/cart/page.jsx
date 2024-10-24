import CartList from '../components/CartList'

export default function Cart() {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold my-8">Your Cart</h1>
      <CartList />
    </div>
  )
}