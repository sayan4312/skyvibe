import { Sun, Cloud, CloudRain, CloudSnow, Zap, CloudDrizzle, Wind } from 'lucide-react';

export const getWeatherIcon = (condition: string) => {
  const lowerCondition = condition.toLowerCase();
  
  if (lowerCondition.includes('clear') || lowerCondition.includes('sunny')) {
    return Sun;
  } else if (lowerCondition.includes('cloud')) {
    return Cloud;
  } else if (lowerCondition.includes('rain')) {
    return CloudRain;
  } else if (lowerCondition.includes('drizzle')) {
    return CloudDrizzle;
  } else if (lowerCondition.includes('snow')) {
    return CloudSnow;
  } else if (lowerCondition.includes('thunder') || lowerCondition.includes('storm')) {
    return Zap;
  } else if (lowerCondition.includes('wind')) {
    return Wind;
  }
  
  return Cloud; // Default icon
};