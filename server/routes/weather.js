import express from 'express';
import axios from 'axios';
import SearchHistory from '../models/SearchHistory.js';

const router = express.Router();
const API_KEY = process.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';


router.get('/city/:city', async (req, res) => {
  try {
    const { city } = req.params;
    const { userId } = req.query;

    if (!API_KEY) {
      return res.status(500).json({ error: 'OpenWeatherMap API key not configured' });
    }

    
    const weatherResponse = await axios.get(
      `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}`
    );

    
    const forecastResponse = await axios.get(
      `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}`
    );

    
    if (userId && mongoose.connection.readyState === 1) {
      try {
        await SearchHistory.create({
          userId,
          city,
          searchedAt: new Date()
        });
      } catch (error) {
        console.error('Error saving search history:', error);
      }
    }

    
    const weatherData = {
      current: formatWeatherData(weatherResponse.data),
      forecast: formatForecastData(forecastResponse.data)
    };

    res.json(weatherData);
  } catch (error) {
    console.error('Weather API error:', error);
    
    if (error.response?.status === 404) {
      return res.status(404).json({ error: 'City not found' });
    } else if (error.response?.status === 401) {
      return res.status(401).json({ error: 'Invalid API key' });
    }
    
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});


router.get('/coords/:lat/:lon', async (req, res) => {
  try {
    const { lat, lon } = req.params;

    if (!API_KEY) {
      return res.status(500).json({ error: 'OpenWeatherMap API key not configured' });
    }

    
    const weatherResponse = await axios.get(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );

    
    const forecastResponse = await axios.get(
      `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );

   
    const weatherData = {
      current: formatWeatherData(weatherResponse.data),
      forecast: formatForecastData(forecastResponse.data)
    };

    res.json(weatherData);
  } catch (error) {
    console.error('Weather API error:', error);
    
    if (error.response?.status === 401) {
      return res.status(401).json({ error: 'Invalid API key' });
    }
    
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});


function formatWeatherData(data) {
  return {
    city: data.name,
    country: data.sys.country,
    temperature: Math.round(data.main.temp - 273.15), 
    feelsLike: Math.round(data.main.feels_like - 273.15),
    condition: data.weather[0].description,
    humidity: data.main.humidity,
    windSpeed: Math.round(data.wind.speed * 3.6), 
    visibility: Math.round(data.visibility / 1000),
    pressure: data.main.pressure,
    icon: data.weather[0].icon
  };
}

function formatForecastData(data) {
  const dailyData = {};
  
  
  data.list.forEach(item => {
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

  
  return Object.values(dailyData).slice(0, 5).map(day => ({
    date: day.date,
    maxTemp: Math.round(Math.max(...day.temps)),
    minTemp: Math.round(Math.min(...day.temps)),
    condition: day.conditions[0], 
    icon: day.icons[0]
  }));
}

export default router;