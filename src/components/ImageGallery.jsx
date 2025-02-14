import React from 'react';

export const ImageGallery = ({ images }) => {
  if (!images || images.length === 0) {
    return <div>No images available.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {images.map((image, index) => (
        <div key={index} className="bg-gray-200 rounded-lg overflow-hidden">
          <img src={image.url} alt={image.caption} className="object-cover w-full h-48" />
        </div>
      ))}
    </div>
  );
};
