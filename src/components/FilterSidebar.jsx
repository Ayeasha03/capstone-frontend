import React from 'react';

const FilterSidebar = ({ filters, onFilterChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({ ...filters, [name]: value });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
      <h3 className="text-xl font-bold">Filters</h3>
      <input
        type="number"
        name="minPrice"
        value={filters.minPrice || ''}
        onChange={handleChange}
        placeholder="Min Price"
        className="w-full px-4 py-2 border rounded"
      />
      <input
        type="number"
        name="maxPrice"
        value={filters.maxPrice || ''}
        onChange={handleChange}
        placeholder="Max Price"
        className="w-full px-4 py-2 border rounded"
      />
      <input
        type="text"
        name="propertyType"
        value={filters.propertyType || ''}
        onChange={handleChange}
        placeholder="Property Type"
        className="w-full px-4 py-2 border rounded"
      />
      <input
        type="number"
        name="bedrooms"
        value={filters.bedrooms || ''}
        onChange={handleChange}
        placeholder="Bedrooms"
        className="w-full px-4 py-2 border rounded"
      />
      <input
        type="number"
        name="bathrooms"
        value={filters.bathrooms || ''}
        onChange={handleChange}
        placeholder="Bathrooms"
        className="w-full px-4 py-2 border rounded"
      />
      <input
        type="text"
        name="city"
        value={filters.city || ''}
        onChange={handleChange}
        placeholder="City"
        className="w-full px-4 py-2 border rounded"
      />
      <input
        type="text"
        name="state"
        value={filters.state || ''}
        onChange={handleChange}
        placeholder="State"
        className="w-full px-4 py-2 border rounded"
      />
    </div>
  );
};

export default FilterSidebar;
