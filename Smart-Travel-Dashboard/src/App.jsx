import React from 'react';
import GeoInfo from './components/GeoInfo';
import NetworkStatus from './components/NetworkStatus';
import LocationCanvas from './components/LocationCanvas';
import WeatherInfo from './components/WeatherInfo';
import NetworkBanner from './components/NetworkBanner';
import useAutoTheme from './hooks/useAutoTheme';
import FeaturesList from './FeaturesList';

export default function App() {
  useAutoTheme();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-500">
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/10 to-purple-600/10 dark:from-primary-400/20 dark:to-purple-400/20"></div>
        <div className="relative z-10 container mx-auto px-6 py-8">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-2 text-gradient animate-fade-in">
            Smart Travel Dashboard
          </h1>
          <p className="text-center text-gray-600 dark:text-gray-300 text-lg animate-slide-up">
            Your intelligent companion for location-based services
          </p>
        </div>
      </header>

      <NetworkBanner />

      <main className="container mx-auto px-6 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-1 xl:col-span-1">
            <WeatherInfo />
          </div>

          <div className="lg:col-span-1 xl:col-span-1">
            <NetworkStatus />
          </div>

          <div className="lg:col-span-1 xl:col-span-1">
            <GeoInfo />
          </div>
        </div>

        <div className="mb-8">
          <LocationCanvas />
        </div>

        <div className="flex justify-center">
          <FeaturesList />
        </div>
      </main>

      <footer className="mt-16 py-8 border-t border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Built with React, Tailwind CSS, and modern web APIs
          </p>
          <div className="flex justify-center items-center gap-4 mt-4">
            <span className="status-indicator status-online">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              Online
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              APIs: Geolocation, Weather, Network Information, Canvas
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
