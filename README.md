# skyvibe - Beautiful MERN Weather Application

A modern, responsive weather application built with the MERN stack, featuring real-time weather data, 5-day forecasts, and a beautiful glass-morphism UI design.

## ✨ Features

### Core Functionality
- **Real-time Weather Data**: Get current weather conditions for any city worldwide
- **5-Day Forecast**: Extended weather predictions with detailed information
- **Geolocation Support**: Automatic weather detection for your current location
- **Temperature Units**: Toggle between Celsius and Fahrenheit
- **Search History**: Keep track of recently searched locations
- **Favorite Locations**: Save and quickly access your favorite cities

### User Experience
- **Beautiful UI**: Glass-morphism design with dynamic backgrounds based on weather conditions
- **Responsive Design**: Optimized for mobile, tablet, and desktop devices
- **Smooth Animations**: Hover effects, transitions, and micro-interactions
- **Error Handling**: User-friendly error messages and loading states
- **Accessibility**: Keyboard navigation and screen reader support

### Technical Features
- **MERN Stack**: MongoDB, Express.js, React.js, Node.js
- **TypeScript**: Full type safety for better development experience
- **Tailwind CSS**: Modern utility-first CSS framework
- **OpenWeatherMap API**: Reliable weather data source
- **Local Storage**: Persistent favorites and search history
- **RESTful API**: Clean backend architecture

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas)
- OpenWeatherMap API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd weather-app-mern
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your configuration:
   ```env
   # OpenWeatherMap API Configuration
   VITE_OPENWEATHER_API_KEY=your_api_key_here
   VITE_API_BASE_URL=http://localhost:5000/api
   
   # Backend Configuration
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/weather-app
   NODE_ENV=development
   ```

4. **Get your OpenWeatherMap API key**
   - Visit [OpenWeatherMap](https://openweathermap.org/api)
   - Sign up for a free account
   - Generate your API key
   - Add it to your `.env` file

5. **Start the application**
   ```bash
   npm run dev
   ```
   
   This will start both the frontend (port 5173) and backend (port 5000) servers.

### Manual Setup (Alternative)

If you prefer to run frontend and backend separately:

```bash
# Terminal 1 - Frontend
npm run client

# Terminal 2 - Backend
npm run server
```

## 🏗️ Project Structure

```
weather-app-mern/
├── src/                          # Frontend React application
│   ├── components/               # Reusable UI components
│   │   ├── WeatherCard.tsx      # Main weather display
│   │   ├── ForecastCard.tsx     # 5-day forecast cards
│   │   ├── SearchBar.tsx        # Search functionality
│   │   └── FavoriteLocations.tsx # Favorite cities management
│   ├── services/                # API service layer
│   │   └── weatherService.ts    # Weather API integration
│   ├── types/                   # TypeScript type definitions
│   │   └── weather.ts           # Weather data types
│   ├── utils/                   # Utility functions
│   │   └── weatherIcons.tsx     # Weather icon mapping
│   └── App.tsx                  # Main application component
├── server/                      # Backend Node.js application
│   ├── models/                  # MongoDB schemas
│   │   ├── User.js             # User model
│   │   ├── FavoriteLocation.js # Favorites model
│   │   └── SearchHistory.js    # Search history model
│   ├── routes/                 # API routes
│   │   ├── weather.js          # Weather endpoints
│   │   └── users.js            # User management endpoints
│   └── server.js               # Express server setup
└── README.md                   # This file
```

## 🌐 API Endpoints

### Weather Routes
- `GET /api/weather/city/:city` - Get weather by city name
- `GET /api/weather/coords/:lat/:lon` - Get weather by coordinates

### User Routes
- `GET /api/users/:userId/favorites` - Get user's favorite locations
- `POST /api/users/:userId/favorites` - Add favorite location
- `DELETE /api/users/:userId/favorites/:favoriteId` - Remove favorite location
- `GET /api/users/:userId/history` - Get search history

## 🎨 Design System

### Color Palette
- **Primary**: Blue gradient system for default weather
- **Sunny**: Amber to orange gradient for clear weather
- **Cloudy**: Gray gradient system for overcast conditions
- **Rainy**: Blue to indigo gradient for precipitation
- **Snowy**: Light blue gradient for snow conditions
- **Stormy**: Purple to indigo gradient for thunderstorms

### Typography
- **Headings**: Inter font family with bold weights
- **Body**: Inter font family with regular weights
- **Spacing**: 8px base grid system

### Components
- **Glass-morphism**: Backdrop blur with transparency
- **Rounded Corners**: 12-24px border radius for modern look
- **Shadows**: Subtle drop shadows for depth
- **Animations**: 300ms transition duration for smooth interactions

## 🚀 Deployment

### Frontend (Netlify/Vercel)
1. Build the project: `npm run build`
2. Deploy the `dist` folder to your preferred platform
3. Set environment variables in your deployment platform

### Backend (Railway/Render)
1. Create a new service on your preferred platform
2. Connect your repository
3. Set environment variables
4. Deploy the application

### Database (MongoDB Atlas)
1. Create a MongoDB Atlas cluster
2. Get your connection string
3. Update `MONGODB_URI` in your environment variables

## 🧪 Testing

### Manual Testing Checklist
- [ ] Search for valid city names
- [ ] Search for invalid city names (error handling)
- [ ] Toggle temperature units (°C/°F)
- [ ] Add/remove favorite locations
- [ ] Check responsive design on different screen sizes
- [ ] Test geolocation functionality
- [ ] Verify search history persistence



## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Commit your changes: `git commit -m 'Add feature'`
5. Push to the branch: `git push origin feature-name`
6. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [OpenWeatherMap](https://openweathermap.org/) for weather data
- [Lucide React](https://lucide.dev/) for beautiful icons
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [React](https://reactjs.org/) for the frontend framework
- [Express.js](https://expressjs.com/) for the backend framework


---

