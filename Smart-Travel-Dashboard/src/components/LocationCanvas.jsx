
// src/components/LocationCanvas.jsx
import React, { useEffect, useRef, useState } from 'react';
import { Map, Loader2, AlertCircle } from 'lucide-react';

export default function LocationCanvas() {
  const canvasRef = useRef(null);
  const [coords, setCoords] = useState(null);
  const [imageError, setImageError] = useState(false);
  const [loading, setLoading] = useState(true);
  const mapImage = useRef(new Image());

  // Load India map image (JPG)
  useEffect(() => {
    mapImage.current.src = '/india-map.jpg';

    mapImage.current.onload = () => {
      setLoading(false);
      if (coords) drawCanvas();
    };

    mapImage.current.onerror = () => {
      console.error('🛑 Failed to load india-map.jpg. Check that the file exists in the public folder.');
      setImageError(true);
      setLoading(false);
    };
  }, []);

  // Get user coordinates
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.error('Geolocation error:', error);
        setLoading(false);
      }
    );
  }, []);

  // Draw map and pin on canvas
  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw the map image
    ctx.drawImage(mapImage.current, 0, 0, canvas.width, canvas.height);

    if (coords) {
      // Improved: Account for map image margins for better accuracy
      const minLat = 8, maxLat = 37, minLon = 68, maxLon = 97;
      const marginX = 0.05 * canvas.width;
      const marginY = 0.05 * canvas.height;
      const usableWidth = canvas.width - 2 * marginX;
      const usableHeight = canvas.height - 2 * marginY;

      // Apply offsets to move the pin left and up
      const offsetX = 15; // pixels to move left
      const offsetY = 25; // pixels to move up (increased from 10)
      const x = marginX + ((coords.longitude - minLon) / (maxLon - minLon)) * usableWidth - offsetX;
      const y = marginY + ((maxLat - coords.latitude) / (maxLat - minLat)) * usableHeight - offsetY;

      // Draw location pin
      ctx.beginPath();
      ctx.arc(x, y, 8, 0, 2 * Math.PI);
      ctx.fillStyle = '#ef4444';
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Add shadow effect
      ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
      ctx.shadowBlur = 4;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;

      // Draw label background
      const labelText = 'You are here';
      ctx.font = '14px Inter, sans-serif';
      ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
      const textMetrics = ctx.measureText(labelText);
      const labelWidth = textMetrics.width + 12;
      const labelHeight = 20;
      
      ctx.fillRect(x + 10, y - 25, labelWidth, labelHeight);
      
      // Reset shadow
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;

      // Draw label text
      ctx.fillStyle = '#ffffff';
      ctx.fillText(labelText, x + 16, y - 12);
    }
  };

  // Redraw when coords update
  useEffect(() => {
    if (mapImage.current.complete && coords && !loading) {
      drawCanvas();
    }
  }, [coords, loading]);

  return (
    <div className="card animate-fade-in">
      <div className="card-header">
        <Map className="text-purple-500" size={24} />
        Your Location on India Map
      </div>
      
      <div className="card-content">
        {loading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="animate-spin text-primary-600" size={32} />
            <span className="ml-2 text-gray-600 dark:text-gray-300">Loading map...</span>
          </div>
        )}
        
        {imageError ? (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center">
            <AlertCircle className="text-red-600 mx-auto mb-3" size={48} />
            <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">
              Map Image Not Found
            </h3>
            <p className="text-red-700 dark:text-red-300 text-sm mb-4">
              The India map image could not be loaded. Please ensure the file exists at:
            </p>
            <code className="bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-200 px-2 py-1 rounded text-xs">
              public/india-map.jpg
            </code>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <canvas 
                ref={canvasRef} 
                width={500} 
                height={600} 
                className="w-full h-auto border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg"
                style={{ maxWidth: '100%' }}
              />
            </div>
            
            {coords && (
              <div className="text-center text-sm text-gray-600 dark:text-gray-300">
                <p>📍 Your location is marked with a red pin</p>
                <p className="mt-1">
                  Coordinates: {coords.latitude.toFixed(4)}, {coords.longitude.toFixed(4)}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
