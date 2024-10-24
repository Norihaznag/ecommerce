// app/products/[slug]/page.js
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import MediaGallery from '../../components/MediaGallery';
import AddToCartButton from '../../components/AddToCartButton';
import ProductSpecs from '../../components/ProductSpecs';
import SimilarProducts from '../../components/SimilarProducts';

// Metadata for SEO
export async function generateMetadata({ params }) {
  const productId = params.slug.split('-')[0];
  const product = await getProduct(productId);

  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The requested product could not be found.',
    };
  }

  return {
    title: `${product.title} | Your Store Name`,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [
        {
          url: product.image,
          width: 800,
          height: 600,
          alt: product.title,
        },
      ],
    },
    // Add structured data for rich results
    alternates: {
      canonical: `/products/${params.slug}`,
    },
  };
}

async function getProduct(id) {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });
    
    if (!res.ok) throw new Error('Failed to fetch product');
    
    return res.json();
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export async function generateStaticParams() {
  const products = await fetch('https://fakestoreapi.com/products').then((res) => res.json());
  
  return products.map((product) => ({
    slug: `${product.id}-${product.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
  }));
}

export default async function ProductPage({ params }) {
  const productId = params.slug.split('-')[0];
  const product = await getProduct(productId);

  if (!product) {
    notFound();
  }

  // Prepare media array for gallery
  const productMedia = [
    { type: 'image', url: product.image },
    // Add more images/videos from your API
  ];

  const specs = [
    { label: 'Category', value: product.category },
    { label: 'Colors', value: ['White', 'blue', 'red'] },
    { label: 'Rating', value: `${product.rating.rate} (${product.rating.count} reviews)` },
  ];

  // Add structured data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: product.image,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating.rate,
      reviewCount: product.rating.count,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="container mx-auto md:px-4 md:py-12 bg-white">
        <div className="flex flex-col md:flex-row rounded-lg overflow-hidden">
          {/* Media Gallery */}
          <div className="md:w-2/3">
            <Suspense fallback={<div className="h-[500px] bg-gray-100 animate-pulse" />}>
              <MediaGallery productMedia={productMedia} />
            </Suspense>
          </div>

          {/* Product Details */}
          <div className="md:w-1/3 p-8 flex flex-col justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-4 text-gray-800">{product.title}</h1>
              <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>
              <ProductSpecs specs={specs} />
              <div className="flex items-center mb-6 mt-6">
                <span className="text-3xl font-bold text-indigo-600">
                  ${product.price.toFixed(2)}
                </span>
                <span className="ml-2 text-sm text-gray-500">USD</span>
              </div>
            </div>
            <AddToCartButton product={product} />
          </div>
        </div>

        {/* Similar Products */}
        <Suspense fallback={<div className="h-48 bg-gray-100 animate-pulse" />}>
          <SimilarProducts category={product.category} currentProductId={product.id} />
        </Suspense>
      </div>
    </>
  );
}