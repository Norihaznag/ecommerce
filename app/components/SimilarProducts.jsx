"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { createProductUrl } from "../functions/seo";

const SimilarProducts = ({ category, currentProductId }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSimilarProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://fakestoreapi.com/products/category/${category}`
        );
        if (!response.ok) throw new Error("Failed to fetch products");
        let data = await response.json();
        // Filter out the current product and limit to 4 items
        data = data
          .filter((product) => product.id !== currentProductId)
          .slice(0, 4);
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      fetchSimilarProducts();
    }
  }, [category, currentProductId]);

  if (loading)
    return <div className="mt-12 text-center">Loading similar products...</div>;
  if (error)
    return <div className="mt-12 text-center text-red-500">Error: {error}</div>;
  if (products.length === 0) return null;

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Similar Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product) => {
          const url = createProductUrl(product.id, product.title);

          return (
            <Link href={url} key={product.id} className="group">
              <div className="bg-white p-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
                <div className="relative w-full h-48 mb-4">
                  <Image
                    src={product.image}
                    alt={product.title}
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
                <h3 className="text-sm font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-indigo-600">
                  {product.title}
                </h3>
                <p className="text-md font-bold text-indigo-600">
                  ${product.price.toFixed(2)}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SimilarProducts;
