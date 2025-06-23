
import { MapPin, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LocationPermissionProps {
  onLocationRequest: () => void;
  error: string;
}

const LocationPermission = ({ onLocationRequest, error }: LocationPermissionProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 flex items-center justify-center p-4">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 max-w-md w-full text-center">
        <div className="p-4 bg-blue-100 rounded-full w-fit mx-auto mb-6">
          <Navigation className="h-12 w-12 text-blue-600" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Enable Location Access
        </h1>
        
        <p className="text-gray-600 mb-6">
          To show you accurate tide information and nearby beaches, we need access to your location.
        </p>

        {error && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
            <p className="text-yellow-800 text-sm">{error}</p>
          </div>
        )}
        
        <Button 
          onClick={onLocationRequest}
          className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-medium py-3 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2"
        >
          <MapPin className="h-5 w-5" />
          <span>Allow Location Access</span>
        </Button>
        
        <p className="text-xs text-gray-500 mt-4">
          Your location data is only used to provide tide and beach information and is not stored.
        </p>
      </div>
    </div>
  );
};

export default LocationPermission;
