import React, { useState } from 'react';
import UserPreferencesForm from '../components/UserPreferencesForm';
import PropertyRecommendations from '../components/PropertyRecommendations';
import useAuth from '../hooks/useAuth';

const Dashboard = () => {
  const { user } = useAuth();
  const [preferences, setPreferences] = useState({
    minPrice: undefined,
    maxPrice: undefined,
    preferredLocations: [],
    preferredPropertyTypes: [],
    minBedrooms: undefined,
    minBathrooms: undefined,
    mustHaveGarden: false,
    mustHavePool: false,
  });

  if (!user) {
    return <div>Please log in to view your dashboard.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Your Dashboard</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <UserPreferencesForm preferences={preferences} onUpdate={setPreferences} />
          </div>
          <div className="lg:col-span-2">
            <PropertyRecommendations userPreferences={preferences} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
