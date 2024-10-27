import { useState, useCallback, useMemo } from 'react';
import { X, Trash2, Plus } from 'lucide-react';

const ProductPropertySelector = ({ 
  onPropertiesChange,
  initialProperties = [],
  maxPropertiesPerType = 10,
  customValidation,
}) => {
  // Built-in property types with descriptions
  const propertyTypes = useMemo(() => ({
    Color: { 
      examples: "e.g., Red, Blue, Green",
      validation: (value) => /^[A-Za-z\s-]+$/.test(value),
      errorMessage: "Color should only contain letters, spaces, and hyphens"
    },
    Size: {
      examples: "e.g., Small, Medium, Large, XL",
      validation: (value) => /^[A-Za-z0-9\s-]+$/.test(value),
      errorMessage: "Size should only contain letters, numbers, spaces, and hyphens"
    },
    Material: {
      examples: "e.g., Cotton, Leather, Metal",
      validation: (value) => /^[A-Za-z\s-]+$/.test(value),
      errorMessage: "Material should only contain letters, spaces, and hyphens"
    },
    Style: {
      examples: "e.g., Casual, Formal, Sport",
      validation: (value) => /^[A-Za-z\s-]+$/.test(value),
      errorMessage: "Style should only contain letters, spaces, and hyphens"
    },
    Weight: {
      examples: "e.g., 100g, 2.5kg, 500lbs",
      validation: (value) => /^[\d.]+(g|kg|lbs)$/.test(value),
      errorMessage: "Weight should be a number followed by g, kg, or lbs"
    },
    Dimensions: {
      examples: "e.g., 10x20x30cm, 5x5x5in",
      validation: (value) => /^\d+x\d+x\d+(cm|in|mm)$/.test(value),
      errorMessage: "Dimensions should be in format: LxWxH followed by cm, in, or mm"
    }
  }), []);

  // Unified state for all properties
  const [selectedProperty, setSelectedProperty] = useState("");
  const [propertyValue, setPropertyValue] = useState("");
  const [newPropName, setNewPropName] = useState('');
  const [newPropValue, setNewPropValue] = useState('');
  const [properties, setProperties] = useState(initialProperties);
  const [error, setError] = useState("");
  const [customError, setCustomError] = useState("");
  const [isEditing, setIsEditing] = useState(null);

  // Memoized grouped properties
  const groupedProperties = useMemo(() => 
    properties.reduce((acc, prop) => {
      if (!acc[prop.type]) acc[prop.type] = [];
      acc[prop.type].push(prop.value);
      return acc;
    }, {}),
    [properties]
  );

  // Validation helper
  const validateProperty = useCallback((type, value) => {
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
  }, [propertyTypes, customValidation]);

  // Check for duplicates in properties
  const checkDuplicates = useCallback((type, value, isCustom = false) => {
    return properties.some(prop => {
      if (isCustom) {
        // For custom properties, check both name/type and value duplicates
        return (
          prop.type.toLowerCase() === type.toLowerCase() ||
          prop.value.toLowerCase() === value.toLowerCase()
        );
      } else {
        // For standard properties, only check duplicates within same type
        return (
          prop.type === type &&
          prop.value.toLowerCase() === value.toLowerCase()
        );
      }
    });
  }, [properties]);

  // Handle standard property addition
  const handleAddProperty = useCallback(() => {
    setError("");

    if (!selectedProperty || !propertyValue.trim()) {
      setError("Please select a property type and enter a value");
      return;
    }

    const validationError = validateProperty(selectedProperty, propertyValue);
    if (validationError) {
      setError(validationError);
      return;
    }

    if (checkDuplicates(selectedProperty, propertyValue)) {
      setError("This property value already exists!");
      return;
    }

    const currentTypeCount = properties.filter(
      prop => prop.type === selectedProperty
    ).length;

    if (currentTypeCount >= maxPropertiesPerType) {
      setError(`Maximum of ${maxPropertiesPerType} values allowed per property type`);
      return;
    }

    const newProperties = [
      ...properties,
      {
        type: selectedProperty,
        value: propertyValue.trim(),
        isCustom: false
      }
    ];

    setProperties(newProperties);
    onPropertiesChange?.(newProperties);
    setPropertyValue("");
    setSelectedProperty("");
  }, [selectedProperty, propertyValue, properties, maxPropertiesPerType, validateProperty, onPropertiesChange, checkDuplicates]);

  // Handle custom property addition
  const addCustomProp = useCallback((e) => {
    e.preventDefault();
    setCustomError("");

    const propName = newPropName.trim();
    const propValue = newPropValue.trim();

    if (!propName || !propValue) {
      setCustomError("Both name and value are required");
      return;
    }

    // Check if the property name already exists as a standard property type
    if (propertyTypes[propName]) {
      setCustomError(`"${propName}" is a reserved property name. Please use the standard property selector above.`);
      return;
    }

    // Check for duplicates in both custom and standard properties
    if (checkDuplicates(propName, propValue, true)) {
      setCustomError("A property with this name or value already exists!");
      return;
    }

    const newProperties = [
      ...properties,
      {
        type: propName,
        value: propValue,
        isCustom: true
      }
    ];

    setProperties(newProperties);
    onPropertiesChange?.(newProperties);
    setNewPropName('');
    setNewPropValue('');
    setCustomError("");
  }, [newPropName, newPropValue, properties, onPropertiesChange, propertyTypes, checkDuplicates]);

  // Handle property removal
  const removeProperty = useCallback((indexToRemove) => {
    const newProperties = properties.filter((_, index) => index !== indexToRemove);
    setProperties(newProperties);
    onPropertiesChange?.(newProperties);
  }, [properties, onPropertiesChange]);

  // Handle property edit
  const handleEdit = useCallback((index, newValue) => {
    const newProperties = [...properties];
    newProperties[index].value = newValue;
    setProperties(newProperties);
    onPropertiesChange?.(newProperties);
  }, [properties, onPropertiesChange]);

  // KeyPress handler
  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter') {
      handleAddProperty();
    }
  }, [handleAddProperty]);

  return (
    <div className="max-w-2xl mx-auto bg-white space-y-6">
      {error && (
        <div className="text-red-500 bg-red-50 p-3 rounded-md">
          {error}
        </div>
      )}

      {/* Standard Property Selection Controls */}
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Standard Properties</h3>
        <div className="flex-1">
          <select
            value={selectedProperty}
            onChange={(e) => {
              setSelectedProperty(e.target.value);
              setError("");
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="">Select property type</option>
            {Object.entries(propertyTypes).map(([type, config]) => (
              <option key={type} value={type}>
                {type} ({config.examples})
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            value={propertyValue}
            onChange={(e) => {
              setPropertyValue(e.target.value);
              setError("");
            }}
            onKeyUp={handleKeyPress}
            placeholder="Enter property value"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAddProperty}
            disabled={!selectedProperty || !propertyValue.trim()}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Add
          </button>
        </div>
      </div>

      {/* Custom Properties Section */}
      <div className="w-full">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Custom Properties</h3>
        {customError && (
          <div className="text-red-500 bg-red-50 p-3 rounded-md mb-4">
            {customError}
          </div>
        )}
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={newPropName}
            onChange={(e) => {
              setNewPropName(e.target.value);
              setCustomError("");
            }}
            className="flex-1 min-w-[120px] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
            placeholder="Property name"
          />
          <input
            type="text"
            value={newPropValue}
            onChange={(e) => {
              setNewPropValue(e.target.value);
              setCustomError("");
            }}
            className="flex-1 min-w-[120px] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
            placeholder="Property value"
          />
          <button
            type="button"
            onClick={addCustomProp}
            disabled={!newPropName.trim() || !newPropValue.trim()}
            className="inline-flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 min-w-[44px]"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>

      {/* All Properties Display */}
      {Object.keys(groupedProperties).length > 0 && (
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">All Properties</h3>
          
          {Object.entries(groupedProperties).map(([type, values]) => (
            <div key={type} className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-700 mb-2">{type}</h4>
              <div className="flex flex-wrap gap-2">
                {values.map((value, valueIndex) => {
                  const propertyIndex = properties.findIndex(
                    p => p.type === type && p.value === value
                  );
                  const isCustomProp = properties[propertyIndex]?.isCustom;
                  
                  return (
                    <div
                      key={`${type}-${value}-${valueIndex}`}
                      className={`group flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 text-gray-700 rounded-md shadow-sm hover:border-blue-500 transition-colors ${
                        isCustomProp ? 'border-blue-200' : ''
                      }`}
                    >
                      <span>{value}</span>
                      <button
                        onClick={() => removeProperty(propertyIndex)}
                        className="opacity-50 group-hover:opacity-100 transition-opacity"
                        aria-label={`Remove ${type}: ${value}`}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductPropertySelector;