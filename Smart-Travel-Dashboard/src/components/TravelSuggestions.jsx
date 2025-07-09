import React, { useEffect, useState } from 'react';
import { MapPin, Loader2, AlertCircle } from 'lucide-react';

const GOOGLE_PLACES_API_KEY = 'AIzaSyAKmuKUZvsr4yBVCq47YlZRL6O8VHi2nJ4';

export default function TravelSuggestions() {
  const [coords, setCoords] = useState(null);
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (err) => setError(err.message),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  }, []);

  useEffect(() => {
    if (!coords) return;
    setLoading(true);
    setError(null);
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${coords.latitude},${coords.longitude}&radius=20000&type=tourist_attraction|park|museum|amusement_park|zoo|art_gallery&key=${GOOGLE_PLACES_API_KEY}`;
    fetch(`https://corsproxy.io/?${encodeURIComponent(url)}`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'OK') {
          setPlaces(data.results.slice(0, 8));
        } else {
          setError(data.error_message || data.status);
        }
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [coords]);

  return (
    <div className="card animate-fade-in mt-8">
      <div className="card-header">
        <MapPin className="text-pink-500" size={24} />
        Cool Places Near You
      </div>
      <div className="card-content">
        {loading && (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="animate-spin text-primary-600" size={32} />
            <span className="ml-2 text-gray-600 dark:text-gray-300">Finding places...</span>
          </div>
        )}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <AlertCircle className="text-red-600" size={20} />
            <span className="text-red-700 dark:text-red-300 ml-2">{error}</span>
          </div>
        )}
        {!loading && !error && places.length > 0 && (
          <ul className="space-y-4">
            {places.map((place, idx) => (
              <li key={place.place_id || idx} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg flex flex-col gap-1">
                <span className="font-semibold text-lg text-primary-700 dark:text-primary-300">{place.name}</span>
                {place.vicinity && <span className="text-sm text-gray-500 dark:text-gray-300">{place.vicinity}</span>}
                {place.rating && <span className="text-xs text-yellow-600 dark:text-yellow-300">Rating: {place.rating} ⭐</span>}
                {place.types && <span className="text-xs text-gray-400">{place.types.slice(0, 3).join(', ')}</span>}
              </li>
            ))}
          </ul>
        )}
        {!loading && !error && places.length === 0 && (
          <div className="text-center text-gray-500 dark:text-gray-300 py-8">
            No cool places found nearby.
          </div>
        )}
      </div>
    </div>
  );
} 