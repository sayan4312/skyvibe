import React from 'react';
import { MapPin, Eye, Wind, Droplets, Thermometer, Star, StarOff, Gauge } from 'lucide-react';
import { WeatherData } from '../types/weather';
import { getWeatherIcon } from '../utils/weatherIcons';

interface WeatherCardProps {
  weather: WeatherData;
  isCelsius: boolean;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  weather,
  isCelsius,
  isFavorite,
  onToggleFavorite
}) => {
  const convertTemp = (temp: number) => {
    return isCelsius ? temp : (temp * 9/5) + 32;
  };

  const formatTemp = (temp: number) => {
    return `${Math.round(convertTemp(temp))}°${isCelsius ? 'C' : 'F'}`;
  };

  const WeatherIcon = getWeatherIcon(weather.condition);

  return (
    <div className="relative group">
      {/* Main Card */}
      <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] hover:bg-white/15">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/10 rounded-2xl border border-white/20">
              <MapPin className="w-7 h-7 text-white/90" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white mb-1">{weather.city}</h2>
              <p className="text-white/70 text-lg">{weather.country}</p>
            </div>
          </div>
          
          <button
            onClick={onToggleFavorite}
            className="p-3 rounded-2xl bg-white/10 hover:bg-white/20 transition-all duration-300 border border-white/20 hover:scale-110 group"
          >
            {isFavorite ? (
              <Star className="w-7 h-7 text-yellow-400 fill-current group-hover:rotate-12 transition-transform duration-300" />
            ) : (
              <StarOff className="w-7 h-7 text-white/80 group-hover:text-yellow-400 transition-colors duration-300" />
            )}
          </button>
        </div>

        {/* Main Weather Display */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="absolute inset-0 bg-white/5 rounded-full blur-2xl scale-150"></div>
              <WeatherIcon className="relative w-24 h-24 text-white/90 drop-shadow-lg" />
            </div>
            <div>
              <div className="text-7xl md:text-8xl font-light text-white mb-2 tracking-tight">
                {formatTemp(weather.temperature)}
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl text-white/90 capitalize font-medium">
                  {weather.condition}
                </span>
              </div>
            </div>
          </div>
          
          <div className="text-right bg-white/5 rounded-2xl p-6 border border-white/10">
            <p className="text-white/70 mb-2 text-lg">Feels like</p>
            <p className="text-4xl font-semibold text-white">
              {formatTemp(weather.feelsLike)}
            </p>
          </div>
        </div>

        {/* Weather Details Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/5 rounded-2xl p-5 text-center border border-white/10 hover:bg-white/10 transition-colors duration-300 group">
            <div className="p-3 bg-blue-500/20 rounded-xl w-fit mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
              <Eye className="w-6 h-6 text-blue-300" />
            </div>
            <p className="text-white/70 text-sm mb-1">Visibility</p>
            <p className="text-white font-bold text-xl">{weather.visibility} km</p>
          </div>
          
          <div className="bg-white/5 rounded-2xl p-5 text-center border border-white/10 hover:bg-white/10 transition-colors duration-300 group">
            <div className="p-3 bg-green-500/20 rounded-xl w-fit mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
              <Wind className="w-6 h-6 text-green-300" />
            </div>
            <p className="text-white/70 text-sm mb-1">Wind Speed</p>
            <p className="text-white font-bold text-xl">{weather.windSpeed} km/h</p>
          </div>
          
          <div className="bg-white/5 rounded-2xl p-5 text-center border border-white/10 hover:bg-white/10 transition-colors duration-300 group">
            <div className="p-3 bg-cyan-500/20 rounded-xl w-fit mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
              <Droplets className="w-6 h-6 text-cyan-300" />
            </div>
            <p className="text-white/70 text-sm mb-1">Humidity</p>
            <p className="text-white font-bold text-xl">{weather.humidity}%</p>
          </div>
          
          <div className="bg-white/5 rounded-2xl p-5 text-center border border-white/10 hover:bg-white/10 transition-colors duration-300 group">
            <div className="p-3 bg-purple-500/20 rounded-xl w-fit mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
              <Gauge className="w-6 h-6 text-purple-300" />
            </div>
            <p className="text-white/70 text-sm mb-1">Pressure</p>
            <p className="text-white font-bold text-xl">{weather.pressure} hPa</p>
          </div>
        </div>
      </div>

      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
    </div>
  );
};

export default WeatherCard;