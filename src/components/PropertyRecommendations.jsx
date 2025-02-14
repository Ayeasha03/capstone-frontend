import React, { useEffect, useState } from 'react';
import { getSimilarPropertyRecommendations } from '../api/api';

const PropertyRecommendations = ({ propertyId }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const recs = await getSimilarPropertyRecommendations(propertyId);
        setRecommendations(recs);
      } catch (err) {
        console.error('Failed to fetch recommendations', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendations();
  }, [propertyId]);

  if (isLoading) {
    return <div>Loading recommendations...</div>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Similar Properties</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations.map(({ property }) => (
          <div key={property.id} className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-bold">{property.title}</h3>
            <p>{property.description}</p>
            <div className="text-blue-600 font-bold">${property.price.toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyRecommendations;
