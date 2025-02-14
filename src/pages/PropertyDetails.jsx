import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ImageGallery } from '../components/ImageGallery';
import { ContactForm } from '../components/ContactForm';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import PropertyRecommendations from '../components/PropertyRecommendations';
import { ArrowLeft, Bed, Bath, Home, Car, } from 'lucide-react';
import { FaSwimmingPool, FaTree  } from 'react-icons/fa';
import { getProperty } from '../api/api';

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const propertyData = await getProperty(id);
        setProperty(propertyData);
      } catch (err) {
        setError('Failed to load property details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-red-600">{error}</div>
        </div>
      </div>
    );
  }

  if (isLoading || !property) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-96 bg-gray-200 rounded-lg" />
            <div className="h-8 w-1/3 bg-gray-200 rounded" />
            <div className="h-4 w-1/4 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    );
  }

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="container mx-auto px-4 py-8">
        {/* Back button */}
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Search
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <ImageGallery images={property.images} />

            {/* Property Info */}
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold">{property.title}</h1>
                  <p className="text-lg text-gray-600">
                    {property.location.address}, {property.location.city}, {property.location.state} {property.location.zip_code}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-blue-600">
                    {formatter.format(property.price)}
                  </div>
                  <Badge variant={property.status === 'available' ? 'default' : 'secondary'} className="mt-2">
                    {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                  </Badge>
                </div>
              </div>

              {/* Features */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Property Features</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <Bed className="h-5 w-5 text-gray-500" />
                    <span>{property.features.bedrooms} Bedrooms</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Bath className="h-5 w-5 text-gray-500" />
                    <span>{property.features.bathrooms} Bathrooms</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Home className="h-5 w-5 text-gray-500" />
                    <span>{property.features.square_feet.toLocaleString()} sqft</span>
                  </div>
                  {property.features.parking_spaces && (
                    <div className="flex items-center space-x-2">
                      <Car className="h-5 w-5 text-gray-500" />
                      <span>{property.features.parking_spaces} Parking Spaces</span>
                    </div>
                  )}
                  {property.features.has_garden && (
                    <div className="flex items-center space-x-2">
                      <Tree className="h-5 w-5 text-gray-500" />
                      <span>Garden</span>
                    </div>
                  )}
                  {property.features.has_pool && (
                    <div className="flex items-center space-x-2">
                      <Pool className="h-5 w-5 text-gray-500" />
                      <span>Pool</span>
                    </div>
                  )}
                </div>
              </Card>

              {/* Description */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Description</h2>
                <p className="text-gray-600 whitespace-pre-line">{property.description}</p>
              </Card>

              {/* Map */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Location</h2>
                <div className="aspect-[16/9] bg-gray-100 rounded-lg">
                  <iframe
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    style={{ border: 0 }}
                    src={`https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_KEY&q=${property.location.latitude},${property.location.longitude}`}
                    allowFullScreen
                  />
                </div>
              </Card>

              {/* Recommendations */}
              <PropertyRecommendations propertyId={property.id} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <ContactForm propertyId={property.id} propertyTitle={property.title} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
