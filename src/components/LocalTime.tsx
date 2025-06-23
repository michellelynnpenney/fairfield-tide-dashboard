
import { useEffect, useState } from 'react';
import { Clock, Sun, Moon } from 'lucide-react';

interface LocalTimeProps {
  location: { lat: number; lng: number };
}

const LocalTime = ({ location }: LocalTimeProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [timezone, setTimezone] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Get timezone info
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setTimezone(tz);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const isDaytime = () => {
    const hour = currentTime.getHours();
    return hour >= 6 && hour < 18;
  };

  return (
    <div className="bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
      <div className="flex items-center space-x-3 mb-4">
        <div className={`p-2 rounded-full ${isDaytime() ? 'bg-yellow-100' : 'bg-indigo-100'}`}>
          {isDaytime() ? (
            <Sun className="h-6 w-6 text-yellow-600" />
          ) : (
            <Moon className="h-6 w-6 text-indigo-600" />
          )}
        </div>
        <h2 className="text-xl font-semibold text-gray-800">Local Time</h2>
      </div>
      
      <div className="space-y-3">
        <div className="text-3xl font-mono font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
          {formatTime(currentTime)}
        </div>
        <div className="text-gray-600">
          {formatDate(currentTime)}
        </div>
        <div className="text-sm text-gray-500 flex items-center space-x-1">
          <Clock className="h-4 w-4" />
          <span>{timezone}</span>
        </div>
      </div>
    </div>
  );
};

export default LocalTime;
