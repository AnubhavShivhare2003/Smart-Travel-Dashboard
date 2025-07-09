// src/components/FeaturesList.jsx
import React from 'react';
import { CheckCircle2, MapPin, Cloud, Wifi, Palette, Globe } from 'lucide-react';

const features = [
  {
    name: 'Geolocation-Based Mapping',
    description: 'Real-time location detection using browser geolocation API',
    icon: MapPin,
    color: 'text-green-500'
  },
  {
    name: 'Live Weather Info',
    description: 'Current weather data from OpenWeatherMap API',
    icon: Cloud,
    color: 'text-blue-500'
  },
  {
    name: 'India Map with Canvas Pin',
    description: 'Interactive map showing your location on India',
    icon: Globe,
    color: 'text-purple-500'
  },
  {
    name: 'Network Speed Detection',
    description: 'Real-time network connection monitoring',
    icon: Wifi,
    color: 'text-orange-500'
  },
  {
    name: 'Auto Dark Mode',
    description: 'Automatic theme switching (6 PM – 6 AM)',
    icon: Palette,
    color: 'text-indigo-500'
  },
];

export default function FeaturesList() {
  return (
    <div className="card animate-fade-in max-w-4xl w-full">
      <div className="card-header">
        <CheckCircle2 className="text-green-500" size={24} />
        Features Included
      </div>
      
      <div className="card-content">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div 
                key={index} 
                className="group p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-300 hover:shadow-md"
              >
                <div className="flex items-start gap-3">
                  <div className={`${feature.color} group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 dark:text-white mb-1">
                      {feature.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* API Status */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 text-center">
            Web APIs Used
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Geolocation API', status: 'Supported' },
              { name: 'Network Information API', status: 'Supported' },
              { name: 'Canvas API', status: 'Supported' },
              { name: 'Intersection Observer', status: 'Supported' }
            ].map((api, index) => (
              <div key={index} className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-sm font-medium text-gray-800 dark:text-white">{api.name}</p>
                <span className="status-indicator status-online text-xs mt-1">
                  {api.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
