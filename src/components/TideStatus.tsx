
import { useEffect, useState } from 'react';
import { Waves, TrendingUp, TrendingDown } from 'lucide-react';

interface TideStatusProps {
  location: { lat: number; lng: number };
}

interface TideData {
  currentHeight: number;
  trend: 'rising' | 'falling';
  nextTide: {
    time: string;
    type: 'high' | 'low';
    height: number;
  };
  dayTides: Array<{
    time: string;
    type: 'high' | 'low';
    height: number;
  }>;
}

const TideStatus = ({ location }: TideStatusProps) => {
  const [tideData, setTideData] = useState<TideData | null>(null);

  useEffect(() => {
    // Mock tide data - in a real app, you'd fetch from a tide API
    const generateMockTideData = (): TideData => {
      const now = new Date();
      const currentHour = now.getHours();
      
      // Simulate tide patterns (simplified)
      const baseHeight = 3.5;
      const amplitude = 2.5;
      const tideHour = (currentHour + 6) % 12; // Offset for tide timing
      const currentHeight = baseHeight + amplitude * Math.sin((tideHour / 12) * 2 * Math.PI);
      
      const trend = tideHour < 6 ? 'rising' : 'falling';
      
      const dayTides = [
        { time: '02:15', type: 'low' as const, height: 1.2 },
        { time: '08:30', type: 'high' as const, height: 5.8 },
        { time: '14:45', type: 'low' as const, height: 0.9 },
        { time: '20:20', type: 'high' as const, height: 6.1 },
      ];
      
      // Find next tide
      const nextTide = dayTides.find(tide => {
        const tideTime = new Date();
        const [hours, minutes] = tide.time.split(':').map(Number);
        tideTime.setHours(hours, minutes, 0, 0);
        return tideTime > now;
      }) || dayTides[0];
      
      return {
        currentHeight: Math.round(currentHeight * 10) / 10,
        trend,
        nextTide,
        dayTides
      };
    };

    setTideData(generateMockTideData());
    
    // Update every minute
    const interval = setInterval(() => {
      setTideData(generateMockTideData());
    }, 60000);

    return () => clearInterval(interval);
  }, [location]);

  if (!tideData) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-4"></div>
          <div className="h-12 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-blue-100 rounded-full">
          <Waves className="h-6 w-6 text-blue-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800">Tide Status</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Current Tide */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${
              tideData.trend === 'rising' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {tideData.trend === 'rising' ? (
                <TrendingUp className="h-4 w-4" />
              ) : (
                <TrendingDown className="h-4 w-4" />
              )}
              <span className="capitalize">{tideData.trend}</span>
            </div>
          </div>
          
          <div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {tideData.currentHeight} ft
            </div>
            <div className="text-gray-600">Current tide height</div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-4">
            <div className="text-sm text-gray-600 mb-1">Next Tide</div>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-gray-900">
                {tideData.nextTide.type === 'high' ? 'High' : 'Low'} at {tideData.nextTide.time}
              </span>
              <span className="text-blue-600 font-medium">
                {tideData.nextTide.height} ft
              </span>
            </div>
          </div>
        </div>

        {/* Daily Tides */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-3">Today's Tides</h3>
          <div className="space-y-2">
            {tideData.dayTides.map((tide, index) => (
              <div key={index} className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    tide.type === 'high' ? 'bg-blue-500' : 'bg-teal-500'
                  }`}></div>
                  <span className="font-medium text-gray-700">
                    {tide.type === 'high' ? 'High' : 'Low'}
                  </span>
                  <span className="text-gray-600">{tide.time}</span>
                </div>
                <span className="font-semibold text-gray-900">{tide.height} ft</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TideStatus;
