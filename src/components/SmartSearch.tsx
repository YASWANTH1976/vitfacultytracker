import React, { useState, useEffect, useRef } from 'react';
import { Search, Clock, User, MapPin, Zap } from 'lucide-react';
import { Faculty, useFaculty } from '../context/FacultyContext';
import VoiceSearch from './VoiceSearch';

interface SmartSearchProps {
  onSearch: (query: string) => void;
  onFacultySelect?: (faculty: Faculty) => void;
}

export default function SmartSearch({ onSearch, onFacultySelect }: SmartSearchProps) {
  const { faculties } = useFaculty();
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Faculty[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.length > 0) {
      const filtered = faculties.filter(faculty =>
        faculty.name.toLowerCase().includes(query.toLowerCase()) ||
        faculty.department.toLowerCase().includes(query.toLowerCase()) ||
        faculty.designation.toLowerCase().includes(query.toLowerCase()) ||
        faculty.cabinNumber.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5);
      
      setSuggestions(filtered);
      setShowSuggestions(true);
      setSelectedIndex(-1);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query, faculties]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
          handleSuggestionClick(suggestions[selectedIndex]);
        } else {
          handleSearch();
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleSearch = () => {
    onSearch(query);
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (faculty: Faculty) => {
    setQuery(faculty.name);
    setShowSuggestions(false);
    onSearch(faculty.name);
    if (onFacultySelect) {
      onFacultySelect(faculty);
    }
  };

  const handleVoiceSearch = (transcript: string) => {
    setQuery(transcript);
    onSearch(transcript);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'text-green-600 bg-green-100';
      case 'busy': return 'text-red-600 bg-red-100';
      case 'away': return 'text-yellow-600 bg-yellow-100';
      case 'in-meeting': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const highlightMatch = (text: string, query: string) => {
    if (!query) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 text-yellow-900 px-1 rounded">
          {part}
        </mark>
      ) : part
    );
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl">
      <div className="relative flex items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search faculty by name, department, or cabin number..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => query && setShowSuggestions(true)}
          />
        </div>
        
        <VoiceSearch onSearch={handleVoiceSearch} />
        
        <button
          onClick={handleSearch}
          className="px-6 py-3 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Search
        </button>
      </div>

      {/* Search Suggestions */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-96 overflow-y-auto">
          {suggestions.map((faculty, index) => (
            <div
              key={faculty.id}
              className={`p-4 cursor-pointer border-b border-gray-100 last:border-b-0 hover:bg-gray-50 ${
                index === selectedIndex ? 'bg-blue-50' : ''
              }`}
              onClick={() => handleSuggestionClick(faculty)}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {highlightMatch(faculty.name, query)}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {highlightMatch(faculty.designation, query)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-3 h-3" />
                      <span>{highlightMatch(`Cabin ${faculty.cabinNumber}`, query)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{faculty.officeHours.start} - {faculty.officeHours.end}</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-blue-600 mt-1">
                    {highlightMatch(faculty.department, query)}
                  </p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(faculty.status)}`}>
                    <div className="w-1.5 h-1.5 rounded-full bg-current mr-1"></div>
                    {faculty.status === 'available' && <Zap className="w-3 h-3 mr-1" />}
                    {faculty.status.charAt(0).toUpperCase() + faculty.status.slice(1)}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          <div className="p-3 bg-gray-50 text-center">
            <p className="text-xs text-gray-500">
              Press ↑↓ to navigate, Enter to select, Esc to close
            </p>
          </div>
        </div>
      )}

      {/* No results */}
      {showSuggestions && query && suggestions.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-xl border border-gray-200 z-50 p-4 text-center">
          <p className="text-gray-500">No faculty found matching "{query}"</p>
          <p className="text-sm text-gray-400 mt-1">Try searching by name, department, or cabin number</p>
        </div>
      )}
    </div>
  );
}