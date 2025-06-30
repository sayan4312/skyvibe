import React, { useState, useEffect } from 'react';
import { Cloud,  ToggleLeft, ToggleRight, Navigation } from 'lucide-react';
import WeatherCard from './components/WeatherCard';
import ForecastCard from './components/ForecastCard';
import SearchBar from './components/SearchBar';
import FavoriteLocations from './components/FavoriteLocations';
import { weatherService } from './services/weatherService';
import { WeatherData, ForecastData } from './types/weather';

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [isCelsius, setIsCelsius] = useState(true);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  useEffect(() => {
    
    getCurrentLocationWeather();
    loadFavorites();
    loadSearchHistory();
  }, []);

  const getCurrentLocationWeather = () => {
    if (navigator.geolocation) {
      setLoading(true);
      setError('');
      
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const data = await weatherService.getWeatherByCoords(
              position.coords.latitude,
              position.coords.longitude
            );
            setWeatherData(data.current);
            setForecastData(data.forecast);
            setError('');
          } catch (err: any) {
            console.error('Error getting weather by coordinates:', err);
            setError('Failed to get weather for your location. Showing weather for London instead.');
            // Fallback to London
            handleSearch('London');
            return;
          } finally {
            setLoading(false);
          }
        },
        (error) => {
          console.error('Geolocation error:', error);
          setLoading(false);
          
          let errorMessage = 'Location access denied. ';
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage += 'Please allow location access to get weather for your area.';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage += 'Location information is unavailable.';
              break;
            case error.TIMEOUT:
              errorMessage += 'Location request timed out.';
              break;
            default:
              errorMessage += 'An unknown error occurred.';
              break;
          }
          
          setError(errorMessage + ' Showing weather for London instead.');
          
          handleSearch('London');
        },
        {
          timeout: 10000, 
          enableHighAccuracy: false,
          maximumAge: 300000 
        }
      );
    } else {
      setError('Geolocation is not supported by this browser. Showing weather for London instead.');
      handleSearch('London');
    }
  };

  const handleSearch = async (city: string) => {
    if (!city.trim()) return;
    
    setLoading(true);
    setError('');
    
    try {
      const data = await weatherService.getWeatherByCity(city);
      setWeatherData(data.current);
      setForecastData(data.forecast);
      
      // Add to search history
      const newHistory = [city, ...searchHistory.filter(item => item !== city)].slice(0, 5);
      setSearchHistory(newHistory);
      localStorage.setItem('weatherSearchHistory', JSON.stringify(newHistory));
    } catch (err: any) {
      console.error('Error searching for city:', err);
      let errorMessage = 'City not found. Please check the spelling and try again.';
      
      if (err.message.includes('API key')) {
        errorMessage = 'Weather service is not properly configured. Please check the API key.';
      } else if (err.message.includes('Invalid API key')) {
        errorMessage = 'Invalid API key. Please check your OpenWeatherMap API key configuration.';
      }
      
      setError(errorMessage);
      setWeatherData(null);
      setForecastData([]);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = (city: string) => {
    const newFavorites = favorites.includes(city)
      ? favorites.filter(fav => fav !== city)
      : [...favorites, city];
    
    setFavorites(newFavorites);
    localStorage.setItem('weatherFavorites', JSON.stringify(newFavorites));
  };

  const loadFavorites = () => {
    const stored = localStorage.getItem('weatherFavorites');
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch (error) {
        console.error('Error loading favorites:', error);
        setFavorites([]);
      }
    }
  };

  const loadSearchHistory = () => {
    const stored = localStorage.getItem('weatherSearchHistory');
    if (stored) {
      try {
        setSearchHistory(JSON.parse(stored));
      } catch (error) {
        console.error('Error loading search history:', error);
        setSearchHistory([]);
      }
    }
  };

  const getWeatherBackground = () => {
    if (!weatherData) return 'from-indigo-900 via-purple-900 to-pink-900';
    
    const condition = weatherData.condition.toLowerCase();
    if (condition.includes('clear') || condition.includes('sunny')) {
      return 'from-orange-400 via-pink-500 to-red-500';
    } else if (condition.includes('cloud')) {
      return 'from-gray-700 via-gray-800 to-gray-900';
    } else if (condition.includes('rain') || condition.includes('drizzle')) {
      return 'from-blue-800 via-indigo-900 to-purple-900';
    } else if (condition.includes('snow')) {
      return 'from-blue-300 via-blue-500 to-indigo-600';
    } else if (condition.includes('thunder')) {
      return 'from-purple-900 via-indigo-900 to-black';
    }
    return 'from-indigo-900 via-purple-900 to-pink-900';
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getWeatherBackground()} relative overflow-hidden transition-all duration-1000`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/3 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/2 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-4 mb-6">
            <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
              <Cloud className="w-12 h-12 text-white" />
            </div>
            <div>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-2 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                SkyVibe
              </h1>
              <p className="text-white/70 text-xl font-light">Your Personal Weather Companion</p>
            </div>
          </div>
        </header>

        {/* Search Section */}
        <div className="max-w-2xl mx-auto mb-12">
          <SearchBar
            onSearch={handleSearch}
            loading={loading}
            searchHistory={searchHistory}
          />
        </div>

        {/* Controls */}
        <div className="flex justify-center items-center gap-6 mb-12">
          {/* Temperature Unit Toggle */}
          <button
            onClick={() => setIsCelsius(!isCelsius)}
            className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-2xl px-6 py-4 text-white hover:bg-white/20 transition-all duration-300 border border-white/20 hover:scale-105"
          >
            {isCelsius ? <ToggleRight className="w-6 h-6 text-blue-400" /> : <ToggleLeft className="w-6 h-6 text-orange-400" />}
            <span className="font-semibold text-lg">
              {isCelsius ? '°C' : '°F'}
            </span>
          </button>

          {/* Get Location Button */}
          <button
            onClick={getCurrentLocationWeather}
            disabled={loading}
            className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-2xl px-6 py-4 text-white hover:bg-white/20 transition-all duration-300 border border-white/20 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Navigation className="w-6 h-6" />
            <span className="font-semibold">My Location</span>
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="max-w-2xl mx-auto mb-8">
            <div className="bg-red-500/20 backdrop-blur-md border border-red-300/30 rounded-2xl p-6 animate-fade-in">
              <p className="text-white text-center font-medium">{error}</p>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center mb-12">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-12 border border-white/20">
              <div className="relative">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-white/20 border-t-white mx-auto mb-6"></div>
                <div className="absolute inset-0 rounded-full h-16 w-16 border-4 border-transparent border-t-blue-400 animate-spin mx-auto" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
              </div>
              <p className="text-white text-center text-xl font-medium">Fetching weather data...</p>
            </div>
          </div>
        )}

        {/* Current Weather */}
        {weatherData && !loading && (
          <div className="max-w-5xl mx-auto mb-12">
            <WeatherCard
              weather={weatherData}
              isCelsius={isCelsius}
              isFavorite={favorites.includes(weatherData.city)}
              onToggleFavorite={() => toggleFavorite(weatherData.city)}
            />
          </div>
        )}

        {/* 5-Day Forecast */}
        {forecastData.length > 0 && !loading && (
          <div className="max-w-7xl mx-auto mb-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">5-Day Forecast</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {forecastData.map((forecast, index) => (
                <ForecastCard
                  key={index}
                  forecast={forecast}
                  isCelsius={isCelsius}
                />
              ))}
            </div>
          </div>
        )}

        {/* Favorite Locations */}
        <div className="max-w-5xl mx-auto">
          <FavoriteLocations
            favorites={favorites}
            onSelectFavorite={handleSearch}
            onRemoveFavorite={toggleFavorite}
          />
        </div>
      </div>
    </div>
  );
}

export default App;