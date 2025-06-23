
import { useEffect, useState } from 'react';
import { MapPin, Clock, Waves } from 'lucide-react';
import TideStatus from '@/components/TideStatus';
import LocalTime from '@/components/LocalTime';
import NearbyBeaches from '@/components/NearbyBeaches';
import LocationPermission from '@/components/LocationPermission';

const Index = () => {
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);
  const [locationError, setLocationError] = useState<string>('');

  const requestLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setLocationError('');
        },
        (error) => {
          setLocationError('Location access denied. Using default location.');
          // Default to Santa Monica, CA
          setLocation({ lat: 34.0195, lng: -118.4912 });
        }
      );
    } else {
      setLocationError('Geolocation not supported. Using default location.');
      setLocation({ lat: 34.0195, lng: -118.4912 });
    }
  };

  useEffect(() => {
    requestLocation();
  }, []);

  if (!location) {
    return <LocationPermission onLocationRequest={requestLocation} error={locationError} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center space-x-3">
            <Waves className="h-8 w-8 text-blue-100" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              Fairfield Beaches Tide Dashboard
            </h1>
          </div>
          <p className="text-blue-100 mt-2 flex items-center space-x-2">
            <MapPin className="h-4 w-4" />
            <span>Your Local Coastal Information</span>
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Time and Location Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LocalTime location={location} />
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center space-x-3 mb-4">
              <MapPin className="h-6 w-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-800">Current Location</h2>
            </div>
            <div className="text-gray-600">
              <p>Latitude: {location.lat.toFixed(4)}</p>
              <p>Longitude: {location.lng.toFixed(4)}</p>
            </div>
          </div>
        </div>

        {/* Tide Status */}
        <TideStatus location={location} />

        {/* Nearby Beaches */}
        <NearbyBeaches location={location} />
      </div>
    </div>
  );
};

export default Index;
