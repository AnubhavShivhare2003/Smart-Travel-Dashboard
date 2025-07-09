import React, { useEffect, useState } from 'react';
import { Wifi, WifiOff, Signal, Loader2 } from 'lucide-react';
import { useSpring, animated, config } from '@react-spring/web';

export default function NetworkStatus() {
  const [networkInfo, setNetworkInfo] = useState({});
  const [loading, setLoading] = useState(true);

  // React Spring hook at top level
  const wifiSpring = useSpring({
    loop: { reverse: true },
    from: { scale: 1 },
    to: { scale: 1.15 },
    config: config.slow,
  });

  useEffect(() => {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (connection) {
      const updateInfo = () => {
        setLoading(false);
        setNetworkInfo({
          downlink: connection.downlink,
          effectiveType: connection.effectiveType,
          rtt: connection.rtt,
          saveData: connection.saveData,
        });
      };
      updateInfo();
      connection.addEventListener('change', updateInfo);
      return () => connection.removeEventListener('change', updateInfo);
    } else {
      setLoading(false);
      setNetworkInfo({
        error: 'Network Information API not supported',
      });
    }
  }, []);

  const getConnectionIcon = (type) => {
    return (
      <>
        <div className="w-24 h-24 flex items-center justify-center bg-transparent">
          <animated.svg
            style={wifiSpring}
            width="70" height="70" viewBox="0 0 70 70" fill="none"
            className="drop-shadow-md"
          >
            <defs>
              <linearGradient id="wifiBlue" x1="0" y1="0" x2="70" y2="70" gradientUnits="userSpaceOnUse">
                <stop stopColor="#60a5fa" />
                <stop offset="1" stopColor="#2563eb" />
              </linearGradient>
            </defs>
            <circle cx="35" cy="54" r="6" fill="url(#wifiBlue)" />
            <path d="M18 44c10-10 24-10 34 0" stroke="url(#wifiBlue)" strokeWidth="5" strokeLinecap="round" fill="none" />
            <path d="M8 34c16-16 38-16 54 0" stroke="#c7d2fe" strokeWidth="5" strokeLinecap="round" fill="none" />
          </animated.svg>
        </div>
      </>
    );
  };

  const getConnectionStatus = (type) => {
    switch (type) {
      case '4g':
        return 'status-online';
      case '3g':
        return 'status-warning';
      case '2g':
      case 'slow-2g':
        return 'status-offline';
      default:
        return 'status-warning';
    }
  };

  return (
    <div className="card animate-fade-in">
      <div className="card-header">
        <Wifi className="text-blue-500" size={24} />
        Network Status
      </div>
      
      <div className="card-content">
        {loading && (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="animate-spin text-primary-600" size={32} />
            <span className="ml-2 text-gray-600 dark:text-gray-300">Checking network...</span>
          </div>
        )}
        
        {networkInfo.error ? (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <WifiOff className="text-yellow-600" size={20} />
              <span className="font-medium text-yellow-800 dark:text-yellow-200">API Not Supported</span>
            </div>
            <p className="text-yellow-700 dark:text-yellow-300 text-sm">
              {networkInfo.error}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Connection Type */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {getConnectionIcon(networkInfo.effectiveType)}
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Connection Type</p>
                  <p className="text-lg font-semibold text-gray-800 dark:text-white capitalize">
                    {networkInfo.effectiveType || 'Unknown'}
                  </p>
                </div>
              </div>
              <span className={`status-indicator ${getConnectionStatus(networkInfo.effectiveType)}`}>
                {networkInfo.effectiveType === '4g' ? 'Fast' : 
                 networkInfo.effectiveType === '3g' ? 'Moderate' : 'Slow'}
              </span>
            </div>

            {/* Network Details */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">Download Speed</p>
                <p className="text-lg font-semibold text-gray-800 dark:text-white">
                  {networkInfo.downlink ? `${networkInfo.downlink} Mbps` : 'Unknown'}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">Latency (RTT)</p>
                <p className="text-lg font-semibold text-gray-800 dark:text-white">
                  {networkInfo.rtt ? `${networkInfo.rtt}ms` : 'Unknown'}
                </p>
              </div>
            </div>

            {/* Data Saver Mode */}
            {networkInfo.saveData && (
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-blue-700 dark:text-blue-300 font-medium">
                    Data Saver Mode Active
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
