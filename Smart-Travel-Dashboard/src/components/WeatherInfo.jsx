// src/components/WeatherInfo.jsx
import React, { useEffect, useState } from 'react';
import { Cloud, Thermometer, MapPin, Loader2 } from 'lucide-react';

export default function WeatherInfo() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_KEY = 'd07bc4f29f14e466d7e4e48b17f08c2d'; // 🔑 Replace this with your actual key

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
        )
          .then((res) => res.json())
          .then((data) => {
            setLoading(false);
            if (data.cod === 200) {
              setWeather({
                temp: data.main.temp,
                condition: data.weather[0].main,
                description: data.weather[0].description,
                icon: data.weather[0].icon,
                city: data.name,
                country: data.sys.country,
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
              });
            } else {
              setError(data.message);
            }
          })
          .catch((err) => {
            setLoading(false);
            setError(err.message);
          });
      },
      (err) => {
        setLoading(false);
        setError(err.message);
      }
    );
  }, []);

  return (
    <div className="card animate-fade-in">
      <div className="card-header">
        <Cloud className="text-blue-500" size={24} />
        Current Weather
      </div>
      
      <div className="card-content">
        {loading && (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="animate-spin text-primary-600" size={32} />
            <span className="ml-2 text-gray-600 dark:text-gray-300">Fetching weather data...</span>
          </div>
        )}
        
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <p className="text-red-600 dark:text-red-400 text-sm">
              <strong>Error:</strong> {error}
            </p>
          </div>
        )}
        
        {weather && (
          <div className="space-y-4">
            {/* Main Weather Display */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img
                  src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                  alt={weather.condition}
                  className="w-16 h-16"
                />
                <div>
                  <div className="flex items-center gap-2 text-2xl font-bold text-gray-800 dark:text-white">
                    <Thermometer className="text-red-500" size={24} />
                    {Math.round(weather.temp)}°C
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 capitalize">
                    {weather.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <MapPin className="text-gray-400" size={16} />
              <span className="font-medium">{weather.city}, {weather.country}</span>
            </div>

            {/* Additional Weather Details */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">Humidity</p>
                <p className="text-lg font-semibold text-gray-800 dark:text-white">
                  {weather.humidity}%
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">Wind Speed</p>
                <p className="text-lg font-semibold text-gray-800 dark:text-white">
                  {weather.windSpeed} m/s
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
