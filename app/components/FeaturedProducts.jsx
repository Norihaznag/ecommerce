// components/FeaturedProducts.tsx
import ProductCard from './ProductCard';

async function getProducts() {
  const res = await fetch('https://fakestoreapi.com/products')
  return res.json()
}

export default async function FeaturedProducts() {
  const products = await getProducts();

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-8">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}