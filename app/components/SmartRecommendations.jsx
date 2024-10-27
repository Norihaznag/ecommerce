import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const SmartRecommendations = ({ currentProduct, userHistory, trendingProducts }) => {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    // Simulate a recommendation algorithm
    const getRecommendations = () => {
      let recs = [];
      
      // Add personalized recommendations based on user history
      if (userHistory.length > 0) {
        recs.push({
          title: "Based on your history",
          items: userHistory.slice(0, 2)
        });
      }
      
      // Add trending products
      if (trendingProducts.length > 0) {
        recs.push({
          title: "Trending now",
          items: trendingProducts.slice(0, 2)
        });
      }

      const getComplementaryProducts = (product) => {
        // This would typically be determined by your backend
        // Here's a placeholder implementation
        return trendingProducts.filter(p => p.category !== product.category).slice(0, 2);
      };
      
      
      // Add complementary products
      const complementary = getComplementaryProducts(currentProduct);
      if (complementary.length > 0) {
        recs.push({
          title: "Frequently bought together",
          items: complementary.slice(0, 2)
        });
      }

      setRecommendations(recs);
    };

    getRecommendations();
  }, [currentProduct, userHistory, trendingProducts]);

  

  return (
    <div className="mt-12 bg-gray-100 p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Recommended for You</h2>
      {recommendations.map((section, index) => (
        <div key={index} className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-indigo-600">{section.title}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {section.items.map((product) => (
              <Link href={`/products/${product.id}`} key={product.id} className="group">
                <div className="bg-white p-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 flex items-center">
                  <div className="relative w-24 h-24 mr-4">
                    <Image
                      src={product.image}
                      alt={product.title}
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-indigo-600">
                      {product.title}
                    </h4>
                    <p className="text-md font-bold text-indigo-600">
                      ${product.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SmartRecommendations;