// src/components/NetworkBanner.jsx
import React, { useEffect, useState } from 'react';
import { AlertTriangle, Wifi, WifiOff } from 'lucide-react';

export default function NetworkBanner() {
  const [networkType, setNetworkType] = useState(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (connection) {
      const update = () => setNetworkType(connection.effectiveType);
      update();
      connection.addEventListener('change', update);
      return () => connection.removeEventListener('change', update);
    }
  }, []);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Show offline banner
  if (!isOnline) {
    return (
      <div className="bg-red-100 dark:bg-red-900/20 border-b border-red-200 dark:border-red-800">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-center gap-2 text-red-800 dark:text-red-200">
            <WifiOff className="text-red-600" size={20} />
            <span className="font-medium">You are currently offline. Some features may not work.</span>
          </div>
        </div>
      </div>
    );
  }

  // Show slow connection banner
  if (networkType && (networkType === '2g' || networkType === 'slow-2g')) {
    return (
      <div className="bg-yellow-100 dark:bg-yellow-900/20 border-b border-yellow-200 dark:border-yellow-800">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-center gap-2 text-yellow-800 dark:text-yellow-200">
            <AlertTriangle className="text-yellow-600" size={20} />
            <span className="font-medium">
              Slow connection detected ({networkType}). Some features may be limited.
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Show good connection indicator (optional)
  if (networkType === '4g') {
    return (
      <div className="bg-green-100 dark:bg-green-900/20 border-b border-green-200 dark:border-green-800">
        <div className="container mx-auto px-6 py-2">
          <div className="flex items-center justify-center gap-2 text-green-800 dark:text-green-200">
            <Wifi className="text-green-600" size={16} />
            <span className="text-sm font-medium">Fast connection available</span>
          </div>
        </div>
      </div>
    );
  }

  return null;
}