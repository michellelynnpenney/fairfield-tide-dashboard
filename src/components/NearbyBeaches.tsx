
import { useEffect, useState } from 'react';
import { MapPin, Star, Navigation } from 'lucide-react';

interface NearbyBeachesProps {
  location: { lat: number; lng: number };
}

interface Beach {
  id: string;
  name: string;
  distance: number;
  rating: number;
  features: string[];
  description: string;
}

const NearbyBeaches = ({ location }: NearbyBeachesProps) => {
  const [beaches, setBeaches] = useState<Beach[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock beach data - in a real app, you'd fetch from a places API
    const generateMockBeaches = (): Beach[] => {
      const mockBeaches = [
        {
          id: '1',
          name: 'Sunset Beach',
          distance: 0.8,
          rating: 4.5,
          features: ['Swimming', 'Surfing', 'Parking'],
          description: 'Beautiful sandy beach perfect for sunset viewing and water sports.'
        },
        {
          id: '2',
          name: 'Crystal Cove',
          distance: 1.2,
          rating: 4.8,
          features: ['Snorkeling', 'Hiking', 'Restaurant'],
          description: 'Protected marine area with crystal clear waters and diverse marine life.'
        },
        {
          id: '3',
          name: 'Driftwood Bay',
          distance: 2.1,
          rating: 4.2,
          features: ['Fishing', 'Picnic Area', 'Dog Friendly'],
          description: 'Quiet beach with excellent fishing spots and family-friendly amenities.'
        },
        {
          id: '4',
          name: 'Lighthouse Point',
          distance: 3.5,
          rating: 4.6,
          features: ['Lighthouse', 'Photography', 'Tide Pools'],
          description: 'Historic lighthouse with stunning views and fascinating tide pools to explore.'
        },
        {
          id: '5',
          name: 'Seashell Shore',
          distance: 4.2,
          rating: 4.3,
          features: ['Shell Collecting', 'Volleyball', 'Boardwalk'],
          description: 'Popular beach known for its abundance of beautiful seashells and beach volleyball courts.'
        }
      ];

      return mockBeaches.sort((a, b) => a.distance - b.distance);
    };

    setTimeout(() => {
      setBeaches(generateMockBeaches());
      setLoading(false);
    }, 1000);
  }, [location]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  if (loading) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
        <div className="flex items-center space-x-3 mb-6">
          <MapPin className="h-6 w-6 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-800">Nearby Beaches</h2>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-20 bg-gray-200 rounded-lg"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-teal-100 rounded-full">
          <MapPin className="h-6 w-6 text-teal-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800">Nearby Beaches</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {beaches.map((beach) => (
          <div key={beach.id} className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-100 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-semibold text-gray-900 text-lg">{beach.name}</h3>
              <div className="flex items-center space-x-1">
                <Navigation className="h-4 w-4 text-blue-600" />
                <span className="text-sm text-blue-600 font-medium">{beach.distance} mi</span>
              </div>
            </div>

            <div className="flex items-center space-x-1 mb-2">
              {renderStars(beach.rating)}
              <span className="text-sm text-gray-600 ml-1">({beach.rating})</span>
            </div>

            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{beach.description}</p>

            <div className="flex flex-wrap gap-1">
              {beach.features.slice(0, 3).map((feature, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-white/60 text-xs text-gray-700 rounded-full border border-blue-200"
                >
                  {feature}
                </span>
              ))}
              {beach.features.length > 3 && (
                <span className="px-2 py-1 bg-blue-100 text-xs text-blue-700 rounded-full">
                  +{beach.features.length - 3} more
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NearbyBeaches;
