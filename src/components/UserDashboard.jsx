import React from 'react';
import useAuth from '../hooks/useAuth';

const UserDashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return <div>Please log in to view your dashboard.</div>;
  }

  const savedProperties = [
    // Mock saved properties data
  ];

  const searchHistory = [
    // Mock search history data
  ];

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-semibold mb-4">Saved Properties</h3>
          <ul>
            {savedProperties.map((property, index) => (
              <li key={index} className="mb-4">
                <h4 className="font-bold">{property.title}</h4>
                <p>{property.description}</p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">Search History</h3>
          <ul>
            {searchHistory.map((search, index) => (
              <li key={index} className="mb-4">
                <p>{search.query}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
