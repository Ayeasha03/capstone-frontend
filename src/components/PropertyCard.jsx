import React from 'react';

const PropertyCard = ({ property, onClick }) => {
  const { title, description, price, images } = property;

  return (
    <div className="bg-white rounded-lg shadow-md cursor-pointer" onClick={onClick}>
      <img src={images[0]?.url} alt={title} className="object-cover w-full h-48 rounded-t-lg" />
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="text-blue-600 font-bold">${price.toLocaleString()}</div>
      </div>
    </div>
  );
};

export default PropertyCard;
