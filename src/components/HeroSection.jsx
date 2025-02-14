import React from 'react';

const HeroSection = () => {
  return (
    <div className="bg-blue-600 text-white py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">Find Your Dream Home</h1>
        <p className="text-xl mb-8">Discover the best properties in your area</p>
        <button className="bg-white text-blue-600 px-6 py-3 rounded-full hover:bg-gray-100 transition-colors">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
