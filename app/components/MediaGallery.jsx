'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { PlayCircle } from 'lucide-react';

const MediaGallery = ({ productMedia }) => {
  const [selectedMedia, setSelectedMedia] = useState(productMedia[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleThumbnailClick = (media) => {
    setSelectedMedia(media);
    if (media.type === 'video') {
      setIsPlaying(true);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-4">
      {/* Thumbnails */}
      <div className="md:w-24 p-2 flex md:flex-col gap-2 order-2 md:order-1">
        {productMedia.map((media, index) => (
          <button
            key={index}
            onClick={() => handleThumbnailClick(media)}
            className={`relative w-20 h-20 border-2 rounded overflow-hidden ${
              selectedMedia.url === media.url ? 'border-blue-500' : 'border-gray-200'
            }`}
          >
            <Image
              src={media.type === 'video' ? media.thumbnail : media.url}
              alt={`Product view ${index + 1}`}
              fill
              sizes="80px"
              className="object-cover rounded"
              priority={index === 0}
            />
            {media.type === 'video' && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20">
                <PlayCircle className="w-8 h-8 text-white" />
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Main Display */}
      <div className="md:flex-1 relative h-[500px] order-1 md:order-2">
        {selectedMedia.type === 'image' ? (
          <Image
            src={selectedMedia.url}
            alt="Product image"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain"
            priority
          />
        ) : (
          <div className="relative w-full h-full">
            {isPlaying ? (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                <p className="text-gray-500">Video Player Placeholder</p>
              </div>
            ) : (
              <div className="relative w-full h-full">
                <Image
                  src={selectedMedia.thumbnail}
                  alt="Video thumbnail"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain"
                />
                <button
                  onClick={() => setIsPlaying(true)}
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20"
                >
                  <PlayCircle className="w-16 h-16 text-white" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaGallery;