import { cosineSimilarity, tfidf } from './utils';

// Mock properties data
const propertiesDb = [
  {
    id: "1",
    title: "Modern Downtown Apartment",
    description: "Luxurious 2-bedroom apartment in the heart of downtown.",
    property_type: "Apartment",
    price: 500000,
    features: {
      bedrooms: 2,
      bathrooms: 2,
      has_garden: false,
      has_pool: true,
    },
    location: {
      city: "New York",
      state: "NY"
    },
    images: []
  },
  {
    id: "2",
    title: "Suburban Family Home",
    description: "Spacious 4-bedroom house with a large backyard.",
    property_type: "House",
    price: 750000,
    features: {
      bedrooms: 4,
      bathrooms: 3,
      has_garden: true,
      has_pool: false,
    },
    location: {
      city: "Los Angeles",
      state: "CA"
    },
    images: []
  }
];

// Convert property features to text
const getPropertyFeaturesText = (property) => {
  const { title, description, property_type, features, location, price } = property;
  let texts = [title, description, property_type, `bedrooms:${features.bedrooms}`, `bathrooms:${features.bathrooms}`, `location:${location.city},${location.state}`, `price_range:${Math.floor(price / 100000)}00k-${Math.floor(price / 100000) + 1}00k`];
  if (features.has_garden) texts.push("has_garden");
  if (features.has_pool) texts.push("has_pool");
  return texts.join(" ");
};

// Get property by ID
export const getProperty = async (propertyId) => {
  const property = propertiesDb.find(p => p.id === propertyId);
  if (property) {
    return property;
  } else {
    throw new Error("Property not found");
  }
};

// Get similar properties
export const getSimilarPropertyRecommendations = async (propertyId) => {
  const targetProperty = await getProperty(propertyId);
  const otherProperties = propertiesDb.filter(p => p.id !== targetProperty.id);
  const propertyTexts = [getPropertyFeaturesText(targetProperty), ...otherProperties.map(getPropertyFeaturesText)];
  const tfidfMatrix = tfidf(propertyTexts);
  const similarityScores = otherProperties.map((_, i) => cosineSimilarity(tfidfMatrix[0], tfidfMatrix[i + 1]));

  return otherProperties
    .map((property, i) => ({ property, score: similarityScores[i] }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3); // Get top 3 similar properties
};

// Get personalized recommendations
export const getPersonalizedRecommendations = async (preferences) => {
  const matchingProperties = propertiesDb.filter(property => {
    const { price, features, location, property_type } = property;
    const { min_price, max_price, min_bedrooms, min_bathrooms, must_have_garden, must_have_pool, preferred_property_types, preferred_locations } = preferences;

    return (!min_price || price >= min_price)
      && (!max_price || price <= max_price)
      && (!min_bedrooms || features.bedrooms >= min_bedrooms)
      && (!min_bathrooms || features.bathrooms >= min_bathrooms)
      && (!must_have_garden || features.has_garden)
      && (!must_have_pool || features.has_pool)
      && (!preferred_property_types || preferred_property_types.includes(property_type))
      && (!preferred_locations || preferred_locations.includes(`${location.city},${location.state}`));
  });

  return matchingProperties.slice(0, 5).map(property => ({
    property,
    score: 1.0, // Simple scoring for now
    reason: "Matches your preferences"
  }));
};

// Search properties
export const searchProperties = (filters) => {
  const { min_price, max_price, property_type, city, state, bedrooms, bathrooms } = filters;
  let filteredProperties = propertiesDb;

  if (min_price !== undefined) filteredProperties = filteredProperties.filter(p => p.price >= min_price);
  if (max_price !== undefined) filteredProperties = filteredProperties.filter(p => p.price <= max_price);
  if (property_type) filteredProperties = filteredProperties.filter(p => p.property_type.toLowerCase() === property_type.toLowerCase());
  if (city) filteredProperties = filteredProperties.filter(p => p.location.city.toLowerCase() === city.toLowerCase());
  if (state) filteredProperties = filteredProperties.filter(p => p.location.state.toLowerCase() === state.toLowerCase());
  if (bedrooms) filteredProperties = filteredProperties.filter(p => p.features.bedrooms >= bedrooms);
  if (bathrooms) filteredProperties = filteredProperties.filter(p => p.features.bathrooms >= bathrooms);

  return {
    results: filteredProperties,
    total: filteredProperties.length
  };
};
