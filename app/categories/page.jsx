import Image from "next/image"

export const metadata = {
    title: 'Product Categories | Your E-commerce Store',
    description: 'Browse our wide range of product categories including bags, shirts, jackets, and sweaters.',
    openGraph: {
      title: 'Product Categories | Your E-commerce Store',
      description: 'Browse our wide range of product categories including bags, shirts, jackets, and sweaters.',
      type: 'website',
      url: 'https://your-domain.com/categories',
    },
  }


  async function getCategories() {
    const res = await fetch('https://fakestoreapi.com/products/categories')
    return res.json()
  }

  
export default async function CategoriesPage() {

    const categories = await getCategories()

   
  
    return (
      <div className="container mx-auto px-4 py-8 min-h-screen">
        <h1 className="text-3xl font-bold mb-4">Product Categories</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((category) => (
            <div key={category.name} className="border rounded p-4">
              <Image width={200} height={192} src={category.image} alt={category.name} className="w-full h-48 object-cover mb-2" />
              <h2 className="text-xl font-semibold">{category}</h2>
            </div>
          ))}
        </div>
      </div>
    )
  }