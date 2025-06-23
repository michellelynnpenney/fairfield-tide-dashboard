
import { useEffect, useState } from 'react';
import { Clock, Waves, Thermometer, Sun } from 'lucide-react';

interface BestSwimTimeProps {
  location: { lat: number; lng: number };
  temperature: number;
}

interface SwimTime {
  time: string;
  period: string;
  score: number;
  reason: string;
  tideHeight: number;
  conditions: string[];
}

const BestSwimTime = ({ location, temperature }: BestSwimTimeProps) => {
  const [bestTimes, setBestTimes] = useState<SwimTime[]>([]);

  useEffect(() => {
    const generateSwimTimes = (): SwimTime[] => {
      const times = [
        {
          time: '8:00 AM',
          period: 'Morning',
          score: 8.5,
          reason: 'Perfect morning conditions with rising tide',
          tideHeight: 4.2,
          conditions: ['Rising Tide', 'Calm Waters', 'Good Visibility']
        },
        {
          time: '11:30 AM',
          period: 'Late Morning', 
          score: 9.2,
          reason: 'Optimal tide height and warming temperatures',
          tideHeight: 5.8,
          conditions: ['High Tide', 'Warm Water', 'Peak Sun']
        },
        {
          time: '3:00 PM',
          period: 'Afternoon',
          score: 8.8,
          reason: 'Warmest water temperature of the day',
          tideHeight: 4.5,
          conditions: ['Moderate Tide', 'Warmest Water', 'Good Weather']
        },
        {
          time: '6:30 PM',
          period: 'Evening',
          score: 7.9,
          reason: 'Beautiful sunset swim with calm conditions',
          tideHeight: 3.1,
          conditions: ['Falling Tide', 'Calm Waters', 'Sunset Views']
        }
      ];

      return times.sort((a, b) => b.score - a.score);
    };

    setBestTimes(generateSwimTimes());
  }, [location, temperature]);

  const getScoreColor = (score: number) => {
    if (score >= 9) return 'text-green-600 bg-green-100';
    if (score >= 8) return 'text-blue-600 bg-blue-100';
    if (score >= 7) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 9) return 'Excellent';
    if (score >= 8) return 'Great';
    if (score >= 7) return 'Good';
    return 'Fair';
  };

  const topTime = bestTimes[0];

  return (
    <div className="bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-cyan-100 rounded-full">
          <Sun className="h-6 w-6 text-cyan-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800">Best Swimming Times Today</h2>
      </div>

      {/* Best Time Highlight */}
      {topTime && (
        <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-4 mb-6 border border-cyan-200">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-cyan-600" />
              <span className="font-semibold text-gray-900">Recommended Time</span>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(topTime.score)}`}>
              {getScoreLabel(topTime.score)} • {topTime.score}/10
            </div>
          </div>
          <div className="text-2xl font-bold text-cyan-700 mb-1">{topTime.time}</div>
          <div className="text-gray-600 text-sm mb-3">{topTime.reason}</div>
          <div className="flex flex-wrap gap-2">
            {topTime.conditions.map((condition, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-white/60 text-xs text-gray-700 rounded-full border border-cyan-200"
              >
                {condition}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* All Times */}
      <div className="space-y-3">
        <h3 className="font-semibold text-gray-800 mb-3">All Swimming Times</h3>
        {bestTimes.map((swimTime, index) => (
          <div key={index} className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-600" />
                <span className="font-medium text-gray-900">{swimTime.time}</span>
              </div>
              <span className="text-gray-600">•</span>
              <span className="text-sm text-gray-600">{swimTime.period}</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                <Waves className="h-4 w-4 text-blue-500" />
                <span className="text-sm text-gray-600">{swimTime.tideHeight} ft</span>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${getScoreColor(swimTime.score)}`}>
                {swimTime.score}/10
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-xs text-blue-700">
          <strong>Note:</strong> Swimming conditions are based on tide patterns, water temperature, and weather. 
          Always check current conditions and swim in designated areas with lifeguards when available.
        </p>
      </div>
    </div>
  );
};

export default BestSwimTime;
