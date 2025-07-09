import React, { useEffect, useState } from 'react';
import { MapPin, Loader2, AlertCircle, Sparkles } from 'lucide-react';

const GEMINI_API_KEY = 'AIzaSyCowUbrCLivE9CM_7kvrjymS59UIfStmY4';
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`;

export default function GeminiTravelSuggestions() {
  const [coords, setCoords] = useState(null);
  const [suggestions, setSuggestions] = useState('');
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

  const fetchSuggestions = async () => {
    if (!coords) return;
    setLoading(true);
    setError(null);
    setSuggestions('');
    const prompt = `You are a travel assistant. Suggest the 5 most beautiful places to visit within 50km of latitude ${coords.latitude} and longitude ${coords.longitude}. For each, return in this format:\n**Place Name:** <name>\n**Short Description:** <description>\n**Why it's beautiful:** <reason>\nFormat as a list, no extra commentary.`;
    try {
      const res = await fetch(GEMINI_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      });
      const data = await res.json();
      if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
        setSuggestions(data.candidates[0].content.parts[0].text);
      } else {
        setError('No suggestions found.');
      }
    } catch (err) {
      setError('Failed to fetch suggestions.');
    }
    setLoading(false);
  };

  function parseGeminiPlaces(text) {
    const blocks = text.split(/\*\*Place Name:\*\*/).map(b => b.trim()).filter(Boolean);
    return blocks.map(block => {
      const nameMatch = block.match(/^(.*?)\s*\*\*Short Description:\*\*/);
      const descMatch = block.match(/\*\*Short Description:\*\*\s*(.*?)\s*\*\*Why it's beautiful:\*\*/);
      const whyMatch = block.match(/\*\*Why it's beautiful:\*\*\s*([\s\S]*)/);
      return {
        name: nameMatch ? nameMatch[1].trim() : '',
        description: descMatch ? descMatch[1].trim() : '',
        why: whyMatch ? whyMatch[1].replace(/\*\*/g, '').trim() : '',
      };
    });
  }

  return (
    <div className="card animate-fade-in mt-8">
      <div className="card-header">
        <Sparkles className="text-yellow-500" size={24} />
        AI Travel Suggestions
      </div>
      <div className="card-content">
        {!coords && !error && (
          <div className="text-center text-gray-500 dark:text-gray-300 py-8">
            Getting your location...
          </div>
        )}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <AlertCircle className="text-red-600" size={20} />
            <span className="text-red-700 dark:text-red-300 ml-2">{error}</span>
          </div>
        )}
        {coords && !loading && !suggestions && !error && (
          <button className="btn-primary w-full" onClick={fetchSuggestions}>
            Get AI Suggestions for Places Near Me
          </button>
        )}
        {loading && (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="animate-spin text-primary-600" size={32} />
            <span className="ml-2 text-gray-600 dark:text-gray-300">Asking Gemini AI...</span>
          </div>
        )}
        {suggestions && (
          <ul className="space-y-4 mt-4">
            {parseGeminiPlaces(suggestions).map((place, idx) => (
              <li key={idx} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg flex flex-col gap-1">
                <span className="font-bold text-primary-700 dark:text-primary-300 text-lg">{place.name}</span>
                <span className="text-gray-600 dark:text-gray-200 text-sm">{place.description}</span>
                <span className="text-gray-800 dark:text-gray-100 text-xs italic">{place.why}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
} 