import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { MapPin, Loader2, AlertCircle, Clock, Trash2, Download, Edit3, Save } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Custom icon for the marker
const userIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  shadowSize: [41, 41],
});

function FlyToLocation({ coords }) {
  const map = useMap();
  useEffect(() => {
    if (coords) {
      map.flyTo([coords.latitude, coords.longitude], 13);
    }
  }, [coords, map]);
  return null;
}

function formatDateTime(ts) {
  const d = new Date(ts);
  return d.toLocaleString();
}

const LocationCanvas = forwardRef(function LocationCanvas(props, ref) {
  const [coords, setCoords] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState([]);
  const [editingIdx, setEditingIdx] = useState(null);
  const [nicknameInput, setNicknameInput] = useState('');

  // Load history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('travelHistory');
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  // Get current location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  }, []);

  // Save current location to history
  const saveLocation = () => {
    if (!coords) return;
    const newEntry = {
      latitude: coords.latitude,
      longitude: coords.longitude,
      timestamp: Date.now(),
      nickname: '',
    };
    const updated = [newEntry, ...history];
    setHistory(updated);
    localStorage.setItem('travelHistory', JSON.stringify(updated));
  };

  // Delete a location from history
  const deleteLocation = (idx) => {
    const updated = history.filter((_, i) => i !== idx);
    setHistory(updated);
    localStorage.setItem('travelHistory', JSON.stringify(updated));
  };

  // Start editing nickname
  const startEditNickname = (idx, current) => {
    setEditingIdx(idx);
    setNicknameInput(current || '');
  };

  // Save nickname
  const saveNickname = (idx) => {
    const updated = history.map((loc, i) =>
      i === idx ? { ...loc, nickname: nicknameInput } : loc
    );
    setHistory(updated);
    localStorage.setItem('travelHistory', JSON.stringify(updated));
    setEditingIdx(null);
    setNicknameInput('');
  };

  // Export history as JSON
  const exportHistory = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(history, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute('href', dataStr);
    dlAnchor.setAttribute('download', 'travel_history.json');
    document.body.appendChild(dlAnchor);
    dlAnchor.click();
    dlAnchor.remove();
  };

  useEffect(() => {
    // Listen for sidebar quick actions
    const handleSave = () => saveLocation();
    const handleExport = () => exportHistory();
    window.addEventListener('save-location', handleSave);
    window.addEventListener('export-history', handleExport);
    return () => {
      window.removeEventListener('save-location', handleSave);
      window.removeEventListener('export-history', handleExport);
    };
  }, [coords, history]);

  useImperativeHandle(ref, () => ({
    saveLocation,
    exportHistory,
  }));

  return (
    <div className="card animate-fade-in">
      <div className="card-header">
        <MapPin className="text-purple-500" size={24} />
        Your Location on Map
      </div>
      <div className="card-content">
        {loading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="animate-spin text-primary-600" size={32} />
            <span className="ml-2 text-gray-600 dark:text-gray-300">Getting your location...</span>
          </div>
        )}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center">
            <AlertCircle className="text-red-600 mx-auto mb-3" size={48} />
            <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">
              Location Error
            </h3>
            <p className="text-red-700 dark:text-red-300 text-sm mb-4">{error}</p>
          </div>
        )}
        {coords && !error && (
          <>
            <MapContainer
              center={[coords.latitude, coords.longitude]}
              zoom={13}
              scrollWheelZoom={true}
              style={{ height: 400, width: '100%', borderRadius: '12px' }}
              className="shadow-lg border border-gray-200 dark:border-gray-600"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {/* Current location marker */}
              <Marker position={[coords.latitude, coords.longitude]} icon={userIcon}>
                <Popup>
                  <div className="text-center">
                    <div className="font-semibold">You are here</div>
                    <div className="text-xs text-gray-600 dark:text-gray-300">
                      Lat: {coords.latitude.toFixed(5)}<br />
                      Lon: {coords.longitude.toFixed(5)}
                    </div>
                  </div>
                </Popup>
              </Marker>
              {/* History markers */}
              {history.map((loc, idx) => (
                <Marker key={idx} position={[loc.latitude, loc.longitude]} icon={userIcon}>
                  <Popup>
                    <div className="text-center">
                      <div className="font-semibold">{loc.nickname ? loc.nickname : 'Visited'}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-300">
                        Lat: {loc.latitude.toFixed(5)}<br />
                        Lon: {loc.longitude.toFixed(5)}<br />
                        <Clock className="inline-block mr-1" size={12} />
                        {formatDateTime(loc.timestamp)}
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
              <FlyToLocation coords={coords} />
            </MapContainer>
            <button
              className="btn-primary w-full mt-4"
              onClick={saveLocation}
            >
              Save this location
            </button>
            {/* Export button */}
            {history.length > 0 && (
              <button
                className="btn-secondary w-full mt-2 flex items-center justify-center gap-2"
                onClick={exportHistory}
              >
                <Download size={18} /> Export History
              </button>
            )}
            {/* Travel History */}
            {history.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Clock className="text-primary-600" size={20} />
                  Travel History
                </h3>
                <ul className="space-y-2">
                  {history.map((loc, idx) => (
                    <li key={idx} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                      <span className="flex-1">
                        <span className="font-mono font-semibold">{loc.latitude.toFixed(5)}, {loc.longitude.toFixed(5)}</span>
                        <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">{formatDateTime(loc.timestamp)}</span>
                        {editingIdx === idx ? (
                          <span className="ml-2 flex items-center gap-1">
                            <input
                              type="text"
                              value={nicknameInput}
                              onChange={e => setNicknameInput(e.target.value)}
                              className="rounded px-2 py-1 text-xs border border-gray-300 dark:bg-gray-800 dark:text-white ml-2"
                              placeholder="Add nickname"
                              autoFocus
                            />
                            <button className="ml-1 text-green-600" onClick={() => saveNickname(idx)} title="Save"><Save size={16} /></button>
                          </span>
                        ) : (
                          <>
                            {loc.nickname && <span className="ml-2 text-xs text-primary-600 font-semibold">({loc.nickname})</span>}
                            <button className="ml-2 text-blue-600" onClick={() => startEditNickname(idx, loc.nickname)} title="Edit nickname"><Edit3 size={16} /></button>
                          </>
                        )}
                      </span>
                      <button
                        className="text-red-600 flex items-center gap-1 hover:underline"
                        onClick={() => deleteLocation(idx)}
                        title="Delete"
                      >
                        <Trash2 size={16} /> Delete
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
});

export default LocationCanvas;
