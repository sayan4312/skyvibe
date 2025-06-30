import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin, Clock, Sparkles } from 'lucide-react';

interface SearchBarProps {
  onSearch: (city: string) => void;
  loading: boolean;
  searchHistory: string[];
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, loading, searchHistory }) => {
  const [query, setQuery] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setQuery('');
      setShowHistory(false);
    }
  };

  const handleHistoryClick = (city: string) => {
    onSearch(city);
    setShowHistory(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowHistory(false);
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="relative group">
        <div className={`relative transition-all duration-300 ${isFocused ? 'scale-105' : ''}`}>
          {/* Glow Effect */}
          <div className={`absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-3xl blur-xl transition-opacity duration-300 ${isFocused ? 'opacity-100' : 'opacity-0'}`}></div>
          
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => {
                setIsFocused(true);
                searchHistory.length > 0 && setShowHistory(true);
              }}
              placeholder="Search for any city in the world..."
              className="w-full pl-16 pr-20 py-6 text-xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all duration-300 hover:bg-white/15"
              disabled={loading}
            />
            
            {/* Search Icon */}
            <div className="absolute left-6 top-1/2 transform -translate-y-1/2">
              <Search className={`w-7 h-7 text-white/70 transition-all duration-300 ${isFocused ? 'text-white scale-110' : ''}`} />
            </div>
            
            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-2xl px-6 py-3 transition-all duration-300 hover:scale-105 disabled:hover:scale-100 group"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-6 w-6 border-2 border-white/30 border-t-white"></div>
              ) : (
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-white group-hover:rotate-12 transition-transform duration-300" />
                  <span className="text-white font-semibold">Search</span>
                </div>
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Search History Dropdown */}
      {showHistory && searchHistory.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden z-20 animate-fade-in">
          <div className="p-4 border-b border-white/20 bg-white/5">
            <div className="flex items-center gap-3 text-white/80 text-sm">
              <Clock className="w-5 h-5" />
              <span className="font-medium">Recent Searches</span>
            </div>
          </div>
          <div className="max-h-64 overflow-y-auto">
            {searchHistory.map((city, index) => (
              <button
                key={index}
                onClick={() => handleHistoryClick(city)}
                className="w-full text-left px-6 py-4 text-white hover:bg-white/10 transition-all duration-200 flex items-center gap-4 group"
              >
                <div className="p-2 bg-white/10 rounded-xl group-hover:bg-white/20 transition-colors duration-200">
                  <MapPin className="w-4 h-4 text-white/70" />
                </div>
                <span className="font-medium group-hover:text-white/90">{city}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;