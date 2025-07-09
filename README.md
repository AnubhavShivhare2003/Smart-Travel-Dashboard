# Smart Travel Dashboard

Welcome! This project is a showcase of modern web APIs in a real-world React app. It demonstrates how to build a user-friendly dashboard that adapts to your environment and location, using:

- **Geolocation API**
- **Network Information API**
- **Canvas API**
- **OpenWeatherMap API**

## 🌍 What does it do?
- Detects your location and shows your coordinates and accuracy
- Plots your position on a map of India (Canvas API)
- Fetches and displays live weather for your location
- Detects your network speed/type and warns if slow or offline
- Automatically switches between light and dark mode based on time

## 🔎 APIs Used (and how they're used)

### 1. Geolocation API
- **Purpose:** Get the user's current latitude, longitude, and accuracy
- **How:** Prompts for permission, then displays your coordinates and accuracy, and powers weather/map features

### 2. Network Information API
- **Purpose:** Detects your connection type (4G/3G/2G), speed, and if Data Saver is on
- **How:** Shows a warning if your connection is slow or offline, and displays details in the dashboard
- **Note:** Supported in most Chromium browsers (Chrome, Edge, Opera, etc.)

### 3. Canvas API
- **Purpose:** Draws a map of India and plots your location as a pin
- **How:** Converts your coordinates to a position on the image, draws a red pin and label

### 4. OpenWeatherMap API
- **Purpose:** Fetches live weather data for your current location
- **How:** Uses your coordinates to get temperature, condition, humidity, wind speed, and city name
- **Setup:** Add your API key in a `.env` file as `VITE_WEATHER_API_KEY`

## 🛠️ Tech Stack
- React 19, Vite, Tailwind CSS 3
- Modern browser APIs (see above)

## 🚦 How to run
1. `npm install`
2. Add your OpenWeatherMap API key to `.env` (see above)
3. `npm run dev`
4. Open [http://localhost:5173](http://localhost:5173)

## 📋 Notes for the Interviewer
- The app is fully responsive and works on desktop/mobile
- All features degrade gracefully if an API is not supported
- Code is organized for clarity: components, hooks, and config are separated
- User experience is prioritized: loading states, error handling, and accessibility are built-in

---
**This project is a practical demonstration of how to use real browser APIs to create a smart, adaptive web app.**
