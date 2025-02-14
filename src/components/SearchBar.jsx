import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?q=${query}`);
  };

  return (
    <form onSubmit={handleSearch} className="flex space-x-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search properties..."
        className="flex-1 px-4 py-2 border rounded"
      />
      <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
