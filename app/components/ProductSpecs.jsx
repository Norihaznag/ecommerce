"use client" ;
import React, { useState } from 'react';

const ProductSpecs = ({ specs }) => {
  const [selectedVariations, setSelectedVariations] = useState({});

  function onVariationChange(vars) {
    console.log(vars)
  }

  const handleVariationChange = (label, value) => {
    setSelectedVariations(prev => ({ ...prev, [label]: value }));
    onVariationChange({ ...selectedVariations, [label]: value });
  };

  return (
    <div className="mt-6 border-t border-gray-200">
      <dl className="divide-y divide-gray-200">
        {specs.map((spec, index) => (
          <div key={index} className="py-3 flex flex-col sm:flex-row sm:justify-between text-sm">
            <dt className="text-gray-500 mb-1 sm:mb-0">{spec.label}</dt>
            <dd className="text-gray-900 ml-0 sm:ml-3">
              {Array.isArray(spec.value) ? (
                <div className="flex flex-wrap gap-2">
                  {spec.value.map((option, optionIndex) => (
                    <button
                      key={optionIndex}
                      onClick={() => handleVariationChange(spec.label, option)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold
                        ${selectedVariations[spec.label] === option
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                        }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              ) : (
                spec.value
              )}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

export default ProductSpecs;