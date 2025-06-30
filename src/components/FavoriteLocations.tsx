import React from 'react';
import { Star, Trash2, Heart } from 'lucide-react';

interface FavoriteLocationsProps {
  favorites: string[];
  onSelectFavorite: (city: string) => void;
  onRemoveFavorite: (city: string) => void;
}

const FavoriteLocations: React.FC<FavoriteLocationsProps> = ({
  favorites,
  onSelectFavorite,
  onRemoveFavorite
}) => {
  if (favorites.length === 0) return null;

  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-gradient-to-r from-pink-500/20 to-red-500/20 rounded-2xl border border-pink-300/20">
          <Heart className="w-6 h-6 text-pink-300 fill-current" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-white">Favorite Locations</h3>
          <p className="text-white/70">Quick access to your saved cities</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {favorites.map((city, index) => (
          <div
            key={index}
            className="relative group"
          >
            <div className="bg-white/10 rounded-2xl p-5 flex items-center justify-between hover:bg-white/20 transition-all duration-300 border border-white/10 hover:scale-105">
              <button
                onClick={() => onSelectFavorite(city)}
                className="text-white font-semibold hover:text-yellow-300 transition-colors duration-300 flex-1 text-left text-lg"
              >
                {city}
              </button>
              <button
                onClick={() => onRemoveFavorite(city)}
                className="p-2 text-white/60 hover:text-red-400 transition-all duration-300 rounded-xl hover:bg-red-500/20 hover:scale-110"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
            
            {/* Hover Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-red-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoriteLocations;