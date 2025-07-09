// src/components/GeoInfo.jsx
import React, { useEffect, useState } from 'react';
import { MapPin, Navigation, Loader2, AlertCircle } from 'lucide-react';

export default function GeoInfo() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setLoading(false);
      setError('Geolocation is not supported by your browser');
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLoading(false);
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            timestamp: position.timestamp,
          });
        },
        (err) => {
          setLoading(false);
          setError(err.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000,
        }
      );
    }
  }, []);

  const formatCoordinates = (coord) => {
    return coord.toFixed(6);
  };

  const getAccuracyStatus = (accuracy) => {
    if (accuracy <= 10) return { status: 'status-online', text: 'High' };
    if (accuracy <= 50) return { status: 'status-warning', text: 'Medium' };
    return { status: 'status-offline', text: 'Low' };
  };

  return (
    <div className="card animate-fade-in">
      <div className="card-header">
        <MapPin className="text-green-500" size={24} />
        Your Location
      </div>
      
      <div className="card-content">
        {loading && (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="animate-spin text-primary-600" size={32} />
            <span className="ml-2 text-gray-600 dark:text-gray-300">Getting your location...</span>
          </div>
        )}
        
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="text-red-600" size={20} />
              <span className="font-medium text-red-800 dark:text-red-200">Location Error</span>
            </div>
            <p className="text-red-700 dark:text-red-300 text-sm">
              {error}
            </p>
          </div>
        )}
        
        {location && (
          <div className="space-y-4">
            {/* Coordinates Display */}
            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center gap-2">
                  <Navigation className="text-blue-500" size={16} />
                  <span className="text-sm text-gray-600 dark:text-gray-300">Latitude</span>
                </div>
                <span className="font-mono font-semibold text-gray-800 dark:text-white">
                  {formatCoordinates(location.latitude)}°
                </span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center gap-2">
                  <Navigation className="text-blue-500" size={16} />
                  <span className="text-sm text-gray-600 dark:text-gray-300">Longitude</span>
                </div>
                <span className="font-mono font-semibold text-gray-800 dark:text-white">
                  {formatCoordinates(location.longitude)}°
                </span>
              </div>
            </div>

            {/* Accuracy Information */}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">Accuracy</span>
                <span className={`status-indicator ${getAccuracyStatus(location.accuracy).status}`}>
                  {getAccuracyStatus(location.accuracy).text}
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                ±{Math.round(location.accuracy)} meters
              </p>
            </div>

            {/* Copy Coordinates Button */}
            <button
              onClick={() => {
                navigator.clipboard.writeText(
                  `${location.latitude}, ${location.longitude}`
                );
              }}
              className="w-full btn-secondary text-sm"
            >
              Copy Coordinates
            </button>
          </div>
        )}
      </div>
    </div>
  );
}