"use client";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";
import { XCircle } from "lucide-react";
import { Modal } from "./Modal";
import ProductPropertySelector from "./ProductPropertySelector";
import SearchableTagSelector from "./SearchableTagSelector";
import SearchableCategorySelector from "./SearchableCategorySelector";

   const EditProductModal = ({ product, isOpen, onClose, onSave }) => {
    const initialFormData = useMemo(
      () => ({
        title: "",
        description: "",
        price: "",
        category: "",
        mainImage: null,
        thumbnails: [],
        tags: [],
      }),
      []
    );
  
    const [formData, setFormData] = useState(initialFormData);
    const [error, setError] = useState("");
    const [mainImagePreview, setMainImagePreview] = useState("");
    const [thumbnailPreviews, setThumbnailPreviews] = useState([]);
    const [newTag, setNewTag] = useState("");
  
    console.log(formData);
  
    useEffect(() => {
      if (isOpen) {
        if (product) {
          setFormData({
            title: product.title || "",
            description: product.description || "",
            price: product.price || "",
            category: product.category || "",
            mainImage: product.mainImage || product.image || null,
            thumbnails: product.thumbnails || [],
            tags: product.tags || [],
            properties: product.properties || [],
          });
          setMainImagePreview(product.mainImage || product.image || "");
          setThumbnailPreviews(product.thumbnails || []);
        } else {
          // Reset form when adding new product
          setFormData(initialFormData);
          setMainImagePreview("");
          setThumbnailPreviews([]);
          setNewTag("");
          setError("");
        }
      }
    }, [initialFormData, isOpen, product]);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };
  
    const handleClose = () => {
      setFormData(initialFormData);
      setMainImagePreview("");
      setThumbnailPreviews([]);
      setNewTag("");
      setError("");
      onClose();
    };
  
    const handleMainImageChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setFormData((prev) => ({ ...prev, mainImage: file }));
        setMainImagePreview(imageUrl);
      }
    };
  
    const handleThumbnailsChange = (event) => {
      const files = Array.from(event.target.files);
      console.log(files);
      const maxSize = 2 * 1024 * 1024; // 2MB in bytes
      let totalSize = 0;
  
      for (let i = 0; i < files.length; i++) {
        totalSize += files[i].size;
  
        if (files[i].size > maxSize) {
          alert(`File "${files[i].name}" exceeds the 2MB limit.`);
          event.target.value = ""; // Clear the input
          return;
        }
      }
  
      if (totalSize > maxSize) {
        alert(`Total file size exceeds the 2MB limit.`);
        event.target.value = ""; // Clear the input
      }
      const maxFiles = 4; // Set the maximum number of files
      if (files.length > maxFiles) {
        alert(`You can only upload up to ${maxFiles} files.`);
        event.target.value = ""; // Clear the input
      }
  
      files.length > 4 ? files.splice(4) : files;
      const newPreviews = files.map((file) => URL.createObjectURL(file));
  
      setFormData((prev) => ({
        ...prev,
        thumbnails: [...prev.thumbnails, ...files],
      }));
      setThumbnailPreviews((prev) => [...prev, ...newPreviews]);
    };
  
    const removeThumbnail = (index) => {
      setFormData((prev) => ({
        ...prev,
        thumbnails: prev.thumbnails.filter((_, i) => i !== index),
      }));
      setThumbnailPreviews((prev) => prev.filter((_, i) => i !== index));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError("");
  
      if (!formData.title || !formData.price || !formData.category) {
        setError("Please fill in all required fields");
        return;
      }
  
      try {
        await onSave(formData);
        onClose();
      } catch (error) {
        setError("Failed to save product. Please try again.");
      }
    };
  
    const handlePropertiesChange = useCallback((newProperties) => {
      setFormData((prev) => ({
        ...prev,
        properties: newProperties,
      }));
    }, []);
  
    return (
      <Modal isOpen={isOpen} onClose={handleClose}>
        <div className="space-y-4">
          <h2 className="text-xl font-bold">
            {product ? "Edit Product" : "Add New Product"}
          </h2>
  
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-md">{error}</div>
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
  
                <SearchableCategorySelector
                  value={formData.category}
                  onChange={handleChange}
                  required={true}
                />
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
            <SearchableTagSelector
              selectedTags={formData.tags}
              onTagsChange={(newTags) =>
                setFormData((prev) => ({ ...prev, tags: newTags }))
              }
            />
  
            {/* Properties */}
  
            <ProductPropertySelector
              onPropertiesChange={handlePropertiesChange}
              initialProperties={[]}
              maxPropertiesPerType={10}
              customValidation={(type, value) => true}
            />
  
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
  
  export default EditProductModal