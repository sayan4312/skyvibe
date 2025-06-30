import React from 'react';
import { ForecastData } from '../types/weather';
import { getWeatherIcon } from '../utils/weatherIcons';

interface ForecastCardProps {
  forecast: ForecastData;
  isCelsius: boolean;
}

const ForecastCard: React.FC<ForecastCardProps> = ({ forecast, isCelsius }) => {
  const convertTemp = (temp: number) => {
    return isCelsius ? temp : (temp * 9/5) + 32;
  };

  const formatTemp = (temp: number) => {
    return `${Math.round(convertTemp(temp))}°`;
  };

  const WeatherIcon = getWeatherIcon(forecast.condition);

  return (
    <div className="relative group">
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 text-center hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:-translate-y-2">
        {/* Date */}
        <h3 className="text-white font-bold mb-4 text-lg">{forecast.date}</h3>
        
        {/* Weather Icon */}
        <div className="flex justify-center mb-4 relative">
          <div className="absolute inset-0 bg-white/5 rounded-full blur-xl scale-150"></div>
          <WeatherIcon className="relative w-14 h-14 text-white/90 drop-shadow-lg group-hover:scale-110 transition-transform duration-300" />
        </div>
        
        {/* Weather Condition */}
        <p className="text-white/80 text-sm mb-4 capitalize font-medium">{forecast.condition}</p>
        
        {/* Temperature */}
        <div className="space-y-2">
          <div className="bg-white/10 rounded-xl p-3 border border-white/10">
            <p className="text-3xl font-bold text-white mb-1">
              {formatTemp(forecast.maxTemp)}
            </p>
            <p className="text-white/60 text-sm">High</p>
          </div>
          <div className="bg-white/5 rounded-xl p-3 border border-white/10">
            <p className="text-xl font-semibold text-white/80 mb-1">
              {formatTemp(forecast.minTemp)}
            </p>
            <p className="text-white/50 text-sm">Low</p>
          </div>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
    </div>
  );
};

export default ForecastCard;