import axios from 'axios';
import { WeatherData, ForecastData, WeatherResponse } from '../types/weather';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

class WeatherService {
  private formatWeatherData(data: any): WeatherData {
    return {
      city: data.name,
      country: data.sys.country,
      temperature: Math.round(data.main.temp - 273.15), // Convert from Kelvin to Celsius
      feelsLike: Math.round(data.main.feels_like - 273.15),
      condition: data.weather[0].description,
      humidity: data.main.humidity,
      windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
      visibility: Math.round(data.visibility / 1000), // Convert to km
      pressure: data.main.pressure,
      icon: data.weather[0].icon
    };
  }

  private formatForecastData(data: any): ForecastData[] {
    const dailyData: { [key: string]: any } = {};
    
    // Group forecast data by date
    data.list.forEach((item: any) => {
      const date = new Date(item.dt * 1000).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      });
      
      if (!dailyData[date]) {
        dailyData[date] = {
          date,
          temps: [],
          conditions: [],
          icons: []
        };
      }
      
      dailyData[date].temps.push(item.main.temp - 273.15);
      dailyData[date].conditions.push(item.weather[0].description);
      dailyData[date].icons.push(item.weather[0].icon);
    });

    // Convert to ForecastData array
    return Object.values(dailyData).slice(0, 5).map((day: any) => ({
      date: day.date,
      maxTemp: Math.round(Math.max(...day.temps)),
      minTemp: Math.round(Math.min(...day.temps)),
      condition: day.conditions[0], // Use first condition of the day
      icon: day.icons[0]
    }));
  }

  async getWeatherByCity(city: string): Promise<WeatherResponse> {
    try {
      // Check if API key exists
      if (!API_KEY) {
        throw new Error('OpenWeatherMap API key not found. Please add VITE_OPENWEATHER_API_KEY to your .env file.');
      }

      // Get current weather
      const weatherResponse = await axios.get(
        `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}`
      );

      // Get 5-day forecast
      const forecastResponse = await axios.get(
        `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}`
      );

      return {
        current: this.formatWeatherData(weatherResponse.data),
        forecast: this.formatForecastData(forecastResponse.data)
      };
    } catch (error: any) {
      if (error.response?.status === 404) {
        throw new Error('City not found');
      } else if (error.response?.status === 401) {
        throw new Error('Invalid API key');
      } else if (error.message.includes('API key')) {
        throw error;
      } else {
        throw new Error('Failed to fetch weather data');
      }
    }
  }

  async getWeatherByCoords(lat: number, lon: number): Promise<WeatherResponse> {
    try {
      if (!API_KEY) {
        throw new Error('OpenWeatherMap API key not found. Please add VITE_OPENWEATHER_API_KEY to your .env file.');
      }

      // Get current weather
      const weatherResponse = await axios.get(
        `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      );

      // Get 5-day forecast
      const forecastResponse = await axios.get(
        `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      );

      return {
        current: this.formatWeatherData(weatherResponse.data),
        forecast: this.formatForecastData(forecastResponse.data)
      };
    } catch (error: any) {
      if (error.response?.status === 401) {
        throw new Error('Invalid API key');
      } else if (error.message.includes('API key')) {
        throw error;
      } else {
        throw new Error('Failed to fetch weather data');
      }
    }
  }
}

export const weatherService = new WeatherService();