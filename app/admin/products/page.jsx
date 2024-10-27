"use client";
import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { Search, Edit, Trash2, X, Plus, XCircle } from 'lucide-react';
import ProductPropertySelector from '../../components/ProductPropertySelector'

 

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
        {children}
      </div>
    </div>
  );
};

const EditProductModal = ({ product, isOpen, onClose, onSave }) => {
  const initialFormData = useMemo(() => ({
    title: '',
    description: '',
    price: '',
    category: '',
    mainImage: null,
    thumbnails: [],
    tags: [],
    customProps: []
  }), []);

  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState('');
  const [mainImagePreview, setMainImagePreview] = useState('');
  const [thumbnailPreviews, setThumbnailPreviews] = useState([]);
  const [newTag, setNewTag] = useState('');

  

  useEffect(() => {
    if (isOpen) {
      if (product) {
        setFormData({
          title: product.title || '',
          description: product.description || '',
          price: product.price || '',
          category: product.category || '',
          mainImage: product.mainImage || null,
          thumbnails: product.thumbnails || [],
          tags: product.tags || [],
          customProps: product.customProps || []
        });
        setMainImagePreview(product.mainImage || '');
        setThumbnailPreviews(product.thumbnails || []);
      } else {
        // Reset form when adding new product
        setFormData(initialFormData);
        setMainImagePreview('');
        setThumbnailPreviews([]);
        setNewTag('');
        setError('');
      }
    }
  }, [initialFormData, isOpen, product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleClose = () => {
    setFormData(initialFormData);
    setMainImagePreview('');
    setThumbnailPreviews([]);
    setNewTag('');
    setError('');
    onClose();
  };

  const handleMainImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, mainImage: file }));
      setMainImagePreview(imageUrl);
    }
  };

  const handleThumbnailsChange = (event) => {

    const files = Array.from(event.target.files);
        console.log(files)
        const maxSize = 2 * 1024 * 1024; // 2MB in bytes
        let totalSize = 0;

        for (let i = 0; i < files.length; i++) {
            totalSize += files[i].size;

            if (files[i].size > maxSize) {
                alert(`File "${files[i].name}" exceeds the 2MB limit.`);
                event.target.value = ''; // Clear the input
                return;
            }
        }

        if (totalSize > maxSize) {
            alert(`Total file size exceeds the 2MB limit.`);
            event.target.value = ''; // Clear the input
        }
    const maxFiles = 4; // Set the maximum number of files
    if (files.length > maxFiles) {
      alert(`You can only upload up to ${maxFiles} files.`);
      event.target.value = ''; // Clear the input
  }

    files.length > 4 ? files.splice(4) : files
    const newPreviews = files.map(file => URL.createObjectURL(file));
    
    setFormData(prev => ({
      ...prev,
      thumbnails: [...prev.thumbnails, ...files]
    }));
    setThumbnailPreviews(prev => [...prev, ...newPreviews]);
  };

  const removeThumbnail = (index) => {
    setFormData(prev => ({
      ...prev,
      thumbnails: prev.thumbnails.filter((_, i) => i !== index)
    }));
    setThumbnailPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const addTag = (e) => {
    e.preventDefault();
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.title || !formData.price || !formData.category) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      setError('Failed to save product. Please try again.');
    }
  };

  const handleModalClose = () => {
    setIsEditModalOpen(false);
    setSelectedProduct(null); // Clear selected product when modal closes
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="space-y-4">
        <h2 className="text-xl font-bold">
          {product ? 'Edit Product' : 'Add New Product'}
        </h2>
        
        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Basic Info Section */}
          <div className="space-y-4 rounded-lg">
            <h3 className="font-semibold">Basic Information</h3>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Product title"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full min-h-[100px] px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Product description"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Price *
                </label>
                <input
                  type="number"
                  name="price"
                  step="0.01"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0.00"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select category</option>
                  <option value="clothing">Clothing</option>
                  <option value="accessories">Accessories</option>
                  <option value="electronics">Electronics</option>
                </select>
              </div>
            </div>
          </div>

          {/* Images Section */}
          <div className="space-y-4 rounded-lg">
            <h3 className="font-semibold">Images</h3>
            
            {/* Main Image */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Main Image
              </label>
              <input
                type="file"
                onChange={handleMainImageChange}
                accept="image/*"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {mainImagePreview && (
                <div className="relative w-40 h-40 mt-2">
                  <Image
                    src={mainImagePreview}
                    alt="Main preview"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              )}
            </div>

            {/* Thumbnails */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Additional Images
              </label>
              <input
                type="file"
                multiple
                onChange={handleThumbnailsChange}
                accept="image/*"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="grid grid-cols-4 gap-2 mt-2">
                {thumbnailPreviews.map((preview, index) => (
                  <div key={index} className="relative w-24 h-24">
                    <Image
                      src={preview}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className="object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeThumbnail(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                    >
                      <XCircle size={20} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tags Section */}
          <div className="space-y-4 ">
            <h3 className="font-semibold">Tags</h3>
            <div className="flex gap-2 flex-wrap">
              {formData.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm flex items-center gap-1"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="text-blue-800 hover:text-blue-900"
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Add a tag"
              />
              <button
                type="button"
                onClick={addTag}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                <Plus size={20} />
              </button>
            </div>
          </div>


          {/* Properties */}

          <ProductPropertySelector/>

          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      setError('Failed to load products. Please try again.');
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const filtered = products.filter(product => 
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterCategory === '' || product.category === filterCategory)
    );
    setFilteredProducts(filtered);
  }, [searchTerm, filterCategory, products]);

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  const handleSave = async (formData) => {
    try {
      const response = await fetch(`/api/products/${selectedProduct?.id || ''}`, {
        method: selectedProduct ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to save product');

      const updatedProduct = await response.json();
      
      if (selectedProduct) {
        setProducts(products.map(p => 
          p.id === selectedProduct.id ? updatedProduct : p
        ));
      } else {
        setProducts([...products, updatedProduct]);
      }
      
      alert('Product saved successfully');
    } catch (error) {
      console.error('Error saving product:', error);
      throw error;
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await fetch(`/api/products/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete product');
        
        setProducts(products.filter(product => product.id !== id));
        alert('Product deleted successfully');
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Failed to delete product. Please try again.');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-500 p-4 rounded-md m-4">
        {error}
      </div>
    );
  }
  const handleModalClose = () => {
    setIsEditModalOpen(false);
    setSelectedProduct(null); // Clear selected product when modal closes
  };


  return (
    <div className="space-y-4 sm:p-4">
      <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0 md:space-x-2">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
        
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Categories</option>
          <option value="clothing">Clothing</option>
          <option value="accessories">Accessories</option>
          <option value="electronics">Electronics</option>
        </select>

        <button
          onClick={() => handleEdit(null)}
          className="px-4 py-2 bg-black text-white rounded-md hover:bg-blue-600"
        >
          Add New Product
        </button>
      </div>

      <div className="bg-white border border-gray-300  rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-12 w-12 relative">
                      <Image
                        src={product.image || '/api/placeholder/48/48'}
                        alt={product.title}
                        className="h-12 w-12 object-contain rounded"
                        height={48}
                        width={48}
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{product.title}</div>
                    <div className="text-sm text-gray-500 truncate max-w-xs">{product.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    ${product.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      onClick={() => handleEdit(product)}
                      className="text-indigo-600 hover:text-indigo-900 mr-2"
                    >
                      <Edit size={20} />
                    </button>
                    <button 
                      onClick={() => handleDelete(product.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <EditProductModal
        product={selectedProduct}
        isOpen={isEditModalOpen}
        onClose={handleModalClose}
        onSave={handleSave}
      />
    </div>
  );
};

export default ProductManagement;