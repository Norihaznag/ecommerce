import React, { useState, useEffect, useRef } from 'react';
import { Check, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';

// Simulated API calls - replace these with real API calls in the future
const categoryApi = {
  // Simulate fetching all categories
  fetchCategories: async () => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return [
      { id: 1, name: 'Clothing', value: 'clothing' },
      { id: 2, name: 'Accessories', value: 'accessories' },
      { id: 3, name: 'Electronics', value: 'electronics' },
      { id: 4, name: 'Home & Garden', value: 'home-garden' },
      { id: 5, name: 'Sports', value: 'sports' },
      { id: 6, name: 'Beauty', value: 'beauty' },
      { id: 7, name: 'Books', value: 'books' },
      { id: 8, name: 'Toys', value: 'toys' }
    ];
  },

  // Simulate searching categories
  searchCategories: async (searchTerm) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const allCategories = [
      { id: 1, name: 'Clothing', value: 'clothing' },
      { id: 2, name: 'Accessories', value: 'accessories' },
      { id: 3, name: 'Electronics', value: 'electronics' },
      { id: 4, name: 'Home & Garden', value: 'home-garden' },
      { id: 5, name: 'Sports', value: 'sports' },
      { id: 6, name: 'Beauty', value: 'beauty' },
      { id: 7, name: 'Books', value: 'books' },
      { id: 8, name: 'Toys', value: 'toys' }
    ];
    return allCategories.filter(category => 
      category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
};

const SearchableCategorySelector = ({ value, onChange, required = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [error, setError] = useState('');
  const dropdownRef = useRef(null);
  const searchTimeout = useRef(null);
  const inputRef = useRef(null);

  // Fetch initial categories
  useEffect(() => {
    const fetchInitialCategories = async () => {
      try {
        const fetchedCategories = await categoryApi.fetchCategories();
        setCategories(fetchedCategories);
        setFilteredCategories(fetchedCategories);
      } catch (err) {
        setError('Failed to load categories');
      } finally {
        setIsInitialLoading(false);
      }
    };

    fetchInitialCategories();
  }, []);

  // Handle search with debouncing
  useEffect(() => {
    const searchCategories = async () => {
      if (!searchTerm) {
        setFilteredCategories(categories);
        return;
      }

      setIsLoading(true);
      setError('');

      try {
        if (searchTimeout.current) {
          clearTimeout(searchTimeout.current);
        }

        searchTimeout.current = setTimeout(async () => {
          const results = await categoryApi.searchCategories(searchTerm);
          setFilteredCategories(results);
          setIsLoading(false);
        }, 300);
      } catch (err) {
        setError('Failed to search categories');
        setIsLoading(false);
      }
    };

    searchCategories();

    return () => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
    };
  }, [searchTerm, categories]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedCategory = categories.find(cat => cat.value === value);

  const handleSelectCategory = (category) => {
    onChange({ target: { name: 'category', value: category.value } });
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Category {required && '*'}
      </label>
      
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => {
            setIsOpen(!isOpen);
            if (!isOpen) {
              setTimeout(() => inputRef.current?.focus(), 100);
            }
          }}
          className="flex items-center justify-between w-full px-3 py-2 border rounded-md bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isInitialLoading}
        >
          <span className="text-sm">
            {selectedCategory ? (
              selectedCategory.name
            ) : (
              <span className="text-gray-400">Select category</span>
            )}
          </span>
          {isInitialLoading ? (
            <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
          ) : (
            isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />
          )}
        </button>

        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
            <div className="p-2 border-b">
              <input
                ref={inputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-2 py-1 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search categories..."
              />
            </div>

            <div className="max-h-60 overflow-auto">
              {isLoading ? (
                <div className="flex items-center justify-center py-4">
                  <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
                </div>
              ) : filteredCategories.length > 0 ? (
                <div className="py-1">
                  {filteredCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleSelectCategory(category)}
                      className="flex items-center justify-between w-full px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      {category.name}
                      {category.value === value && (
                        <Check size={16} className="text-blue-500" />
                      )}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="px-4 py-2 text-sm text-gray-500">
                  No categories found
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchableCategorySelector;