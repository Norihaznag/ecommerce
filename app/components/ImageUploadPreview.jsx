import React, { useState } from 'react';
import { X, Edit2, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';

const ImageUploadPreview = () => {
  const [image, setImage] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState('');

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  const handleFile = (file) => {
    setError('');
    
    // Validate file type
    if (!file?.type.startsWith('image/')) {
      setError('Please upload an image file (PNG, JPG, or GIF)');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB');
      return;
    }

    setImage({
      file,
      preview: URL.createObjectURL(file)
    });
  };

  const removeImage = () => {
    setImage(null);
    setError('');
  };

  const handleEdit = () => {
    document.getElementById('fileInput').click();
  };

  return (
    <div className="w-full max-w-xl mx-auto p-4">
      {!image ? (
        // Upload Zone
        <div
          className={`relative border-2 border-dashed rounded-lg p-8
            ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
            ${error ? 'border-red-500' : ''}
            hover:border-blue-500 transition-colors`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="hidden"
          />
          
          <div className="space-y-4">
            <ImageIcon className="w-12 h-12 mx-auto text-gray-400" />
            <div className="text-lg font-medium">
              Drag and drop your image here, or{' '}
              <button 
                onClick={() => document.getElementById('fileInput').click()}
                className="text-blue-500 hover:text-blue-700"
              >
                browse
              </button>
            </div>
            <p className="text-sm text-gray-500">
              Supports PNG, JPG or GIF (Maximum file size 5MB)
            </p>
            {error && (
              <p className="text-sm text-red-500 font-medium">{error}</p>
            )}
          </div>
        </div>
      ) : (
        // Image Preview
        <div className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 group">
          <Image
            src={image.preview}
            alt="Preview"
            className="w-full h-full object-cover"
          />
          
          {/* Overlay with actions */}
          <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
            <button
              onClick={handleEdit}
              className="p-3 rounded-full bg-white text-gray-700 hover:bg-gray-100 transition-colors"
              title="Replace image"
            >
              <Edit2 className="w-6 h-6" />
            </button>
            <button
              onClick={removeImage}
              className="p-3 rounded-full bg-white text-red-500 hover:bg-gray-100 transition-colors"
              title="Remove image"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}

      {/* File name display */}
      {image && (
        <div className="mt-4 text-sm text-gray-600">
          {image.file.name}
        </div>
      )}
    </div>
  );
};

export default ImageUploadPreview;