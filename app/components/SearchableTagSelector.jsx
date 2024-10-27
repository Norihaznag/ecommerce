import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';

// Simulated API calls - replace these with real API calls in the future
const tagApi = {
  // Simulate fetching all available tags
  fetchTags: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    return [
      'Electronics', 'Clothing', 'Books', 'Sports', 'Home', 'Garden',
      'Toys', 'Beauty', 'Health', 'Automotive', 'Fashion', 'Accessories',
      'Kitchen', 'Office', 'Pet Supplies', 'Tools', 'Outdoor', 'Gaming'
    ];
  },

  // Simulate searching tags
  searchTags: async (searchTerm) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const allTags = [
      'Electronics', 'Clothing', 'Books', 'Sports', 'Home', 'Garden',
      'Toys', 'Beauty', 'Health', 'Automotive', 'Fashion', 'Accessories',
      'Kitchen', 'Office', 'Pet Supplies', 'Tools', 'Outdoor', 'Gaming'
    ];
    return allTags.filter(tag => 
      tag.toLowerCase().includes(searchTerm.toLowerCase())
    );
  },

  // Simulate creating a new tag
  createTag: async (tagName) => {
    await new Promise(resolve => setTimeout(resolve, 600));
    // Simulate API validation
    if (tagName.length < 2) {
      throw new Error('Tag must be at least 2 characters long');
    }
    return { id: Date.now(), name: tagName };
  }
};

const SearchableTagSelector = ({ selectedTags = [], onTagsChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTags, setFilteredTags] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [allTags, setAllTags] = useState([]);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const dropdownRef = useRef(null);
  const searchTimeout = useRef(null);

  // Fetch initial tags
  useEffect(() => {
    const fetchInitialTags = async () => {
      try {
        const tags = await tagApi.fetchTags();
        setAllTags(tags);
      } catch (err) {
        setError('Failed to load tags');
      } finally {
        setIsInitialLoading(false);
      }
    };

    fetchInitialTags();
  }, []);

  // Handle search with debouncing
  useEffect(() => {
    const searchTags = async () => {
      if (!searchTerm) {
        setFilteredTags(allTags.filter(tag => !selectedTags.includes(tag)));
        return;
      }

      setIsLoading(true);
      setError('');

      try {
        // Clear existing timeout
        if (searchTimeout.current) {
          clearTimeout(searchTimeout.current);
        }

        // Set new timeout for debouncing
        searchTimeout.current = setTimeout(async () => {
          const results = await tagApi.searchTags(searchTerm);
          setFilteredTags(results.filter(tag => !selectedTags.includes(tag)));
        }, 300);
      } catch (err) {
        setError('Failed to search tags');
      } finally {
        setIsLoading(false);
      }
    };

    searchTags();

    // Cleanup
    return () => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
    };
  }, [searchTerm, selectedTags, allTags]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleTagSelect = async (tag) => {
    if (!selectedTags.includes(tag)) {
      onTagsChange([...selectedTags, tag]);
      setSearchTerm('');
      setIsOpen(false);
    }
  };

  const handleTagRemove = (tagToRemove) => {
    onTagsChange(selectedTags.filter(tag => tag !== tagToRemove));
  };

  const handleCreateNewTag = async () => {
    if (!searchTerm) return;

    setIsLoading(true);
    setError('');

    try {
      const newTag = await tagApi.createTag(searchTerm);
      setAllTags(prev => [...prev, newTag.name]);
      handleTagSelect(newTag.name);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (searchTerm && !allTags.includes(searchTerm)) {
        handleCreateNewTag();
      }
    }
  };

  return (
    <div className="w-full space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Tags
      </label>
      
      <div className="relative" ref={dropdownRef}>
        <div className="flex items-center w-full px-3 py-2 border rounded-md focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setIsOpen(true);
            }}
            onKeyDown={handleKeyDown}
            className="flex-1 outline-none text-sm"
            placeholder="Search or add tags..."
            disabled={isInitialLoading}
          />
          {isLoading ? (
            <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
          ) : (
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="ml-2 text-gray-400 hover:text-gray-600"
              disabled={isInitialLoading}
            >
              {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
          )}
        </div>

        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
            {isInitialLoading ? (
              <div className="flex items-center justify-center py-4">
                <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
              </div>
            ) : filteredTags.length > 0 ? (
              filteredTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagSelect(tag)}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                >
                  {tag}
                </button>
              ))
            ) : (
              <div className="px-4 py-2 text-sm text-gray-500">
                {searchTerm ? (
                  <button
                    onClick={handleCreateNewTag}
                    className="text-blue-500 hover:text-blue-600"
                  >
                    Press Enter to create {searchTerm}
                  </button>
                ) : (
                  "No tags available"
                )}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {selectedTags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
          >
            {tag}
            <button
              type="button"
              onClick={() => handleTagRemove(tag)}
              className="text-blue-600 hover:text-blue-800 focus:outline-none"
            >
              <X size={14} />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default SearchableTagSelector;