# Smart Travel Dashboard

Welcome! This project is a showcase of modern web APIs and modern React animation in a real-world dashboard. It demonstrates how to build a user-friendly, visually engaging dashboard that adapts to your environment and location, using:

- **Geolocation API**
- **Network Information API**
- **OpenWeatherMap API**
- **React Spring Animations**
- **Google Gemini AI (Travel Suggestions)**
- **React Leaflet (Interactive Map)**

## 🌍 What does it do?
- Detects your location and shows your coordinates and accuracy (with animated map pin)
- Plots your position on a live interactive map (React Leaflet)
- Fetches and displays live weather for your location (with animated sun/cloud card)
- Detects your network speed/type and warns if slow or offline (with animated WiFi card)
- Lets you save, nickname, and export your travel history
- Shows beautiful, AI-powered travel suggestions for your area (Gemini API)
- Automatically switches between light and dark mode based on time, with manual theme toggle
- Fully responsive, modern UI with smooth SVG animations (React Spring)

## ✨ Features Included
- **Animated Weather Card:** Modern sun/cloud animation (React Spring)
- **Animated Network Card:** WiFi icon with smooth pulse (React Spring)
- **Animated Location Card:** Bouncing map pin (React Spring)
- **Live Interactive Map:** See your real-time location and travel history
- **Travel History:** Save, nickname, delete, and export places you visit
- **Gemini AI Suggestions:** Get beautiful, AI-powered travel ideas for your current location
- **Auto Dark Mode & Theme Toggle:** Automatic and manual theme switching
- **Responsive & Modern UI:** Mobile-friendly, beautiful design

## 🔎 APIs & Tech Used
- **Geolocation API:** Get your current latitude, longitude, and accuracy
- **Network Information API:** Detects your connection type, speed, and Data Saver
- **OpenWeatherMap API:** Fetches live weather data for your location
- **React Spring:** Smooth, modern SVG animations for all main cards
- **Google Gemini AI:** AI-powered travel suggestions for your area
- **React Leaflet:** Interactive map for live location and history
- **Local Storage:** Save and manage travel history
- **Tailwind CSS 3:** Modern, utility-first styling

## 🚦 How to run
1. `npm install`
2. Add your OpenWeatherMap API key to `.env` as `VITE_WEATHER_API_KEY`
3. Add your Gemini API key to the Gemini component if you want AI suggestions
4. `npm run dev`
5. Open [http://localhost:5173](http://localhost:5173)

## 📋 Notes for the Interviewer
- The app is fully responsive and works on desktop/mobile
- All features degrade gracefully if an API is not supported
- Code is organized for clarity: components, hooks, and config are separated
- User experience is prioritized: loading states, error handling, and accessibility are built-in
- Animations are implemented with React Spring for performance and style

---
**This project is a practical demonstration of how to use real browser APIs, modern React, and animation to create a smart, adaptive, and beautiful web app.**
