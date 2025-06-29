import React, { useState, useEffect } from 'react';
import { Heart, Star, User, MapPin } from 'lucide-react';
import { Faculty, useFaculty } from '../context/FacultyContext';

export default function FavoritesFaculty() {
  const { faculties } = useFaculty();
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('favoriteFaculty');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('favoriteFaculty', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (facultyId: string) => {
    setFavorites(prev => 
      prev.includes(facultyId) 
        ? prev.filter(id => id !== facultyId)
        : [...prev, facultyId]
    );
  };

  const favoriteFaculties = faculties.filter(f => favorites.includes(f.id));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'text-green-600 bg-green-100';
      case 'busy': return 'text-red-600 bg-red-100';
      case 'away': return 'text-yellow-600 bg-yellow-100';
      case 'in-meeting': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Favorite Faculty</h3>
          <p className="text-sm text-gray-600">Quick access to your frequently contacted faculty</p>
        </div>
        <Star className="w-5 h-5 text-yellow-500" />
      </div>

      {favoriteFaculties.length === 0 ? (
        <div className="text-center py-8">
          <Heart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h4 className="text-lg font-medium text-gray-900 mb-2">No Favorites Yet</h4>
          <p className="text-gray-600">Click the heart icon on faculty cards to add them to favorites</p>
        </div>
      ) : (
        <div className="space-y-3">
          {favoriteFaculties.map(faculty => (
            <div key={faculty.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{faculty.name}</h4>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin className="w-3 h-3" />
                    <span>Cabin {faculty.cabinNumber}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(faculty.status)}`}>
                  <div className="w-1.5 h-1.5 rounded-full bg-current mr-1"></div>
                  {faculty.status}
                </div>
                <button
                  onClick={() => toggleFavorite(faculty.id)}
                  className="text-red-500 hover:text-red-600 transition-colors"
                >
                  <Heart className="w-4 h-4 fill-current" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Export the toggle function for use in other components
export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('favoriteFaculty');
    return saved ? JSON.parse(saved) : [];
  });

  const toggleFavorite = (facultyId: string) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(facultyId) 
        ? prev.filter(id => id !== facultyId)
        : [...prev, facultyId];
      localStorage.setItem('favoriteFaculty', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const isFavorite = (facultyId: string) => favorites.includes(facultyId);

  return { favorites, toggleFavorite, isFavorite };
};