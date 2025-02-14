import React from 'react';

const UserPreferencesForm = ({ preferences, onUpdate }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onUpdate({ ...preferences, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    onUpdate({ ...preferences, [name]: checked });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
      <h3 className="text-xl font-bold">User Preferences</h3>
      <input
        type="number"
        name="minPrice"
        value={preferences.minPrice || ''}
        onChange={handleChange}
        placeholder="Min Price"
        className="w-full px-4 py-2 border rounded"
      />
      <input
        type="number"
        name="maxPrice"
        value={preferences.maxPrice || ''}
        onChange={handleChange}
        placeholder="Max Price"
        className="w-full px-4 py-2 border rounded"
      />
      <input
        type="text"
        name="preferredPropertyTypes"
        value={preferences.preferredPropertyTypes || ''}
        onChange={handleChange}
        placeholder="Property Types"
        className="w-full px-4 py-2 border rounded"
      />
      <input
        type="text"
        name="preferredLocations"
        value={preferences.preferredLocations || ''}
        onChange={handleChange}
        placeholder="Preferred Locations"
        className="w-full px-4 py-2 border rounded"
      />
      <input
        type="number"
        name="minBedrooms"
        value={preferences.minBedrooms || ''}
        onChange={handleChange}
        placeholder="Min Bedrooms"
        className="w-full px-4 py-2 border rounded"
      />
      <input
        type="number"
        name="minBathrooms"
        value={preferences.minBathrooms || ''}
        onChange={handleChange}
        placeholder="Min Bathrooms"
        className="w-full px-4 py-2 border rounded"
      />
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          name="mustHaveGarden"
          checked={preferences.mustHaveGarden}
          onChange={handleCheckboxChange}
        />
        <label>Must Have Garden</label>
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          name="mustHavePool"
          checked={preferences.mustHavePool}
          onChange={handleCheckboxChange}
        />
        <label>Must Have Pool</label>
      </div>
    </div>
  );
};

export default UserPreferencesForm;
