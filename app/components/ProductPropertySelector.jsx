import React, { useState, useEffect, useRef, useMemo } from 'react';
import { X, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';

const ProductPropertySelector = ({ 
  onPropertiesChange,
  initialProperties = [],
  maxPropertiesPerType = 10,
  customValidation
}) => {
  // Built-in property types with descriptions
  const propertyTypes = useMemo(() => ({
    Color: { 
      validation: (value) => /^[A-Za-z\s-]+$/.test(value),
      errorMessage: "Color should only contain letters, spaces, and hyphens"
    },
    Size: {
      validation: (value) => /^[A-Za-z0-9\s-]+$/.test(value),
      errorMessage: "Size should only contain letters, numbers, spaces, and hyphens"
    },
    Material: {
      validation: (value) => /^[A-Za-z\s-]+$/.test(value),
      errorMessage: "Material should only contain letters, spaces, and hyphens"
    },
    Style: {
      validation: (value) => /^[A-Za-z\s-]+$/.test(value),
      errorMessage: "Style should only contain letters, spaces, and hyphens"
    },
    Weight: {
      validation: (value) => /^[\d.]+(g|kg|lbs)$/.test(value),
      errorMessage: "Weight should be a number followed by g, kg, or lbs"
    },
    Dimensions: {
      validation: (value) => /^\d+x\d+x\d+(cm|in|mm)$/.test(value),
      errorMessage: "Dimensions should be in format: LxWxH followed by cm, in, or mm"
    }
  }), []);

  const [properties, setProperties] = useState(initialProperties);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [error, setError] = useState('');
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (onPropertiesChange) {
      onPropertiesChange(properties);
    }
  }, [properties, onPropertiesChange]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const validateProperty = (type, value) => {
    if (!value.trim()) return "Value cannot be empty";
    
    const propertyConfig = propertyTypes[type];
    if (propertyConfig?.validation) {
      if (!propertyConfig.validation(value)) {
        return propertyConfig.errorMessage;
      }
    }

    if (customValidation?.(type, value) === false) {
      return "Invalid value format";
    }

    return null;
  };

  const handlePropertyAdd = async () => {
    setError('');
    
    if (!selectedType || !searchTerm.trim()) {
      setError("Please select a property type and enter a value");
      return;
    }

    const validationError = validateProperty(selectedType, searchTerm);
    if (validationError) {
      setError(validationError);
      return;
    }

    const isDuplicate = properties.some(prop => 
      prop.type === selectedType && 
      prop.value.toLowerCase() === searchTerm.toLowerCase()
    );

    if (isDuplicate) {
      setError("This property value already exists!");
      return;
    }

    const typeProperties = properties.filter(prop => prop.type === selectedType);
    if (typeProperties.length >= maxPropertiesPerType) {
      setError(`Maximum of ${maxPropertiesPerType} values allowed per property type`);
      return;
    }

    const newProperty = {
      type: selectedType,
      value: searchTerm.trim(),
      isCustom: !propertyTypes[selectedType]
    };

    setProperties(prev => [...prev, newProperty]);
    setSearchTerm('');
    setSelectedType('');
    setIsOpen(false);
  };

  const handlePropertyRemove = (typeToRemove, valueToRemove) => {
    setProperties(prev => prev.filter(prop => 
      !(prop.type === typeToRemove && prop.value === valueToRemove)
    ));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && selectedType && searchTerm) {
      e.preventDefault();
      handlePropertyAdd();
    }
  };

  // Group properties by type for display
  const groupedProperties = useMemo(() => 
    properties.reduce((acc, prop) => {
      if (!acc[prop.type]) acc[prop.type] = [];
      acc[prop.type].push(prop.value);
      return acc;
    }, {}),
    [properties]
  );

  return (
    <div className="w-full space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Product Properties
      </label>
      
      <div className="relative" ref={dropdownRef}>
        <div className="flex items-center w-full px-3 py-2 border rounded-md focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
          {selectedType ? (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">{selectedType}:</span>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 outline-none text-sm"
                placeholder="Enter value..."
              />
              <button
                onClick={() => setSelectedType('')}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setIsOpen(true);
              }}
              className="flex-1 outline-none text-sm"
              placeholder="Search property type..."
            />
          )}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="ml-2 text-gray-400 hover:text-gray-600"
          >
            {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>

        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}

        {isOpen && !selectedType && (
          <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
            {Object.keys(propertyTypes)
              .filter(type => type.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    setSelectedType(type);
                    setSearchTerm('');
                    setIsOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                >
                  {type}
                </button>
              ))
            }
            {searchTerm && (
              <button
                onClick={() => {
                  setSelectedType(searchTerm);
                  setSearchTerm('');
                  setIsOpen(false);
                }}
                className="w-full px-4 py-2 text-left text-sm text-blue-500 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
              >
                Add custom property: {searchTerm}
              </button>
            )}
          </div>
        )}
      </div>

      <div className="space-y-4">
        {Object.entries(groupedProperties).map(([type, values]) => (
          <div key={type} className="flex flex-wrap gap-2">
            {values.map((value) => (
              <span
                key={`${type}-${value}`}
                className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
              >
                <span className="font-medium">{type}:</span> {value}
                <button
                  type="button"
                  onClick={() => handlePropertyRemove(type, value)}
                  className="text-blue-600 hover:text-blue-800 focus:outline-none"
                >
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPropertySelector;