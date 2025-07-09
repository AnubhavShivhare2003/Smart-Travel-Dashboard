# Smart Travel Dashboard

A modern React + Vite app demonstrating real-world use of browser APIs (Geolocation, Network Info, Canvas, Weather) with Tailwind CSS for a beautiful, responsive UI.

## 🚀 Features
- **Auto Dark Mode**: Switches theme based on time (6PM–6AM = dark)
- **Live Weather**: Fetches your local weather using OpenWeatherMap
- **Geolocation**: Shows your current coordinates and accuracy
- **India Map Canvas**: Plots your location on a map of India
- **Network Status**: Detects connection speed/type and warns on slow/offline
- **Feature List**: Shows all tech used and their status

## 🛠️ Tech Stack
- React 19, Vite, Tailwind CSS 3
- Modern browser APIs: Geolocation, Network Info, Canvas
- OpenWeatherMap API

## ⚡ Quick Start
1. `npm install`
2. Set up your OpenWeatherMap API key (see below)
3. `npm run dev`
4. Open [http://localhost:5173](http://localhost:5173)

## 🌐 Weather API Setup
To enable live weather data, create a `.env` file in the project root:
```
VITE_WEATHER_API_KEY=your_openweathermap_api_key
```
You can get a free API key from [OpenWeatherMap](https://openweathermap.org/api).

## 📁 Structure
- `src/components/` – UI components (Weather, Network, Map, etc.)
- `src/hooks/` – Custom hooks (auto theme)
- `public/india-map.jpg` – Map image for canvas

## 🔑 Notes
- Works best in Chrome/Edge/Firefox (Network Info API support)
- Location permission required for full features

---
**Impresses with: Modern UI, real browser APIs, and clean, maintainable code!**
