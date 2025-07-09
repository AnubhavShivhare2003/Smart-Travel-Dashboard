// src/App.jsx
import React from 'react';
import GeoInfo from './components/GeoInfo';
import NetworkStatus from './components/NetworkStatus';
import LocationCanvas from './components/LocationCanvas';
import WeatherInfo from './components/WeatherInfo';
import NetworkBanner from './components/NetworkBanner';
import useAutoTheme from './hooks/useAutoTheme';
import FeaturesList from './FeaturesList';
import TravelSuggestions from './components/TravelSuggestions';
import GeminiTravelSuggestions from './components/GeminiTravelSuggestions';
import { useState, useRef } from 'react';

export default function App() {
  useAutoTheme();
  // Remove sidebar and related state/handlers

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-500">
      {/* Header */}
      <header className="relative overflow-hidden h-56 md:h-64 flex items-center justify-center">
        <img
          src="/mountainPhoto.avif"
          alt="Mountains background"
          className="absolute inset-0 w-full h-full object-cover object-center z-0"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent z-10" />
        <div className="relative z-20 container mx-auto px-6 py-8 flex flex-col items-center justify-center h-full">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-2 text-white drop-shadow-lg">
            Smart Travel Dashboard
          </h1>
          <p className="text-center text-gray-200 text-lg animate-slide-up drop-shadow">
            Your intelligent companion for location-based services
          </p>
        </div>
      </header>
      {/* Main Content */}
      <main className="container mx-auto px-6 pb-8 pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 items-stretch"> {/* items-stretch for equal height */}
          {/* Weather Info */}
          <div className="flex flex-col h-full flex-1"> {/* h-full and flex-1 for perfect sizing */}
            <WeatherInfo />
          </div>
          {/* Network Status */}
          <div className="flex flex-col h-full flex-1"> {/* h-full and flex-1 for perfect sizing */}
            <NetworkStatus />
          </div>
          {/* Geo Info */}
          <div className="flex flex-col h-full flex-1"> {/* h-full and flex-1 for perfect sizing */}
            <GeoInfo />
          </div>
        </div>
        {/* Gemini AI Travel Suggestions */}
        <GeminiTravelSuggestions />
        {/* Location Canvas - Full Width */}
        <div className="mb-8">
          <LocationCanvas />
        </div>
        {/* Features List */}
        <div className="flex justify-center">
          <FeaturesList />
        </div>
      </main>
      {/* Footer */}
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
