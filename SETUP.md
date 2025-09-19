# 🌦️ Weather App Setup Guide

## Quick Setup for Developers

### 1. Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### 2. Environment Setup

1. **Copy the environment template:**
   ```bash
   cp .env.example .env
   ```

2. **Get your OpenWeatherMap API key:**
   - Visit [OpenWeatherMap API](https://openweathermap.org/api)
   - Sign up for a free account (it's completely free!)
   - Go to the API keys section
   - Copy your default API key
   - Paste it in the `.env` file:
     ```env
     VITE_OPENWEATHER_API_KEY=your_actual_api_key_here
     ```

### 3. Install and Run

```bash
# Install dependencies
npm install

# Start the development server (runs both frontend and backend)
npm run dev
```

The app will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

### 4. Troubleshooting

#### "Weather service is not properly configured" Error
This means the OpenWeatherMap API key is missing or invalid:

1. **Check your `.env` file exists** in the project root
2. **Verify your API key** is correctly set in `.env`:
   ```env
   VITE_OPENWEATHER_API_KEY=your_actual_api_key_here
   ```
3. **Restart the development server** after changing `.env`:
   ```bash
   npm run dev
   ```

#### API Key Issues
- Make sure your API key is active (new keys can take up to 2 hours to activate)
- Ensure there are no extra spaces or quotes around the API key
- Verify you're using the correct API key from your OpenWeatherMap account

#### Database Features (Optional)
The app works perfectly without a database. Database features include:
- Favorite locations persistence
- Search history
- User accounts

To enable database features, add a MongoDB connection string to your `.env`:
```env
MONGODB_URI=mongodb://localhost:27017/weather-app
```

### 5. Development Commands

```bash
npm run dev          # Start both frontend and backend
npm run client       # Start only frontend (port 5173)
npm run server       # Start only backend (port 5000)
npm run build        # Build for production
```

### 6. Testing the Setup

1. Open http://localhost:5173
2. Try searching for a city (e.g., "London")
3. If you see weather data, you're all set! 🎉

If you encounter any issues, check the console for error messages and ensure your API key is correctly configured.