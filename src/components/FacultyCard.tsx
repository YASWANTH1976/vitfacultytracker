import React from 'react';
import { Clock, Phone, Mail, MapPin, Calendar, User, Star, Zap, Heart } from 'lucide-react';
import { Faculty } from '../context/FacultyContext';
import { useFavorites } from './FavoritesFaculty';

interface FacultyCardProps {
  faculty: Faculty;
  onBookAppointment: () => void;
  viewMode?: 'grid' | 'list';
}

export default function FacultyCard({ faculty, onBookAppointment, viewMode = 'grid' }: FacultyCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'text-green-600 bg-green-100 border-green-200';
      case 'busy': return 'text-red-600 bg-red-100 border-red-200';
      case 'away': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'in-meeting': return 'text-purple-600 bg-purple-100 border-purple-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available': return 'Available';
      case 'busy': return 'Busy';
      case 'away': return 'Away';
      case 'in-meeting': return 'In Meeting';
      default: return 'Unknown';
    }
  };

  const formatTime = (timeString: string) => {
    return new Date(`1970-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const updated = new Date(dateString);
    const diffInMinutes = Math.floor((now.getTime() - updated.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <div className="flex items-center space-x-3 mb-1">
                <h3 className="text-lg font-semibold text-gray-900">{faculty.name}</h3>
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(faculty.status)}`}>
                  <div className="w-2 h-2 rounded-full bg-current mr-2 animate-pulse"></div>
                  {getStatusText(faculty.status)}
                </div>
                {faculty.status === 'available' && (
                  <Zap className="w-4 h-4 text-green-500" />
                )}
                <button
                  onClick={() => toggleFavorite(faculty.id)}
                  className={`transition-colors ${
                    isFavorite(faculty.id) ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isFavorite(faculty.id) ? 'fill-current' : ''}`} />
                </button>
              </div>
              <p className="text-sm text-gray-600">{faculty.designation}</p>
              <p className="text-sm text-blue-600 font-medium">{faculty.department}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="text-right">
              <p className="text-sm text-gray-600">Cabin {faculty.cabinNumber}</p>
              <p className="text-xs text-gray-500">{getTimeAgo(faculty.lastUpdated)}</p>
            </div>
            <button
              onClick={onBookAppointment}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                faculty.status === 'available' 
                  ? 'bg-green-600 text-white hover:bg-green-700' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {faculty.status === 'available' ? 'Visit Now' : 'Book Appointment'}
            </button>
          </div>
        </div>
        
        {faculty.statusMessage && (
          <div className="mt-3 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-700 font-medium">{faculty.statusMessage}</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      {/* Status Header */}
      <div className={`px-6 py-4 border-l-4 ${getStatusColor(faculty.status)}`}>
        <div className="flex items-center justify-between">
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(faculty.status)}`}>
            <div className="w-2 h-2 rounded-full bg-current mr-2 animate-pulse"></div>
            {getStatusText(faculty.status)}
            {faculty.status === 'available' && (
              <Zap className="w-3 h-3 ml-1" />
            )}
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-500">{getTimeAgo(faculty.lastUpdated)}</span>
            <button
              onClick={() => toggleFavorite(faculty.id)}
              className={`transition-colors ${
                isFavorite(faculty.id) ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFavorite(faculty.id) ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>
        {faculty.statusMessage && (
          <p className="text-sm text-gray-700 mt-2 font-medium">{faculty.statusMessage}</p>
        )}
      </div>

      {/* Faculty Info */}
      <div className="p-6">
        <div className="flex items-start space-x-4 mb-4">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
            <User className="w-6 h-6 text-blue-600" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="text-lg font-semibold text-gray-900 truncate">{faculty.name}</h3>
              {faculty.status === 'available' && (
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
              )}
            </div>
            <p className="text-sm text-gray-600">{faculty.designation}</p>
            <p className="text-sm text-blue-600 font-medium">{faculty.department}</p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center space-x-3 text-sm text-gray-600">
            <MapPin className="w-4 h-4 flex-shrink-0" />
            <span>Cabin {faculty.cabinNumber}</span>
          </div>
          <div className="flex items-center space-x-3 text-sm text-gray-600">
            <Mail className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">{faculty.email}</span>
          </div>
          <div className="flex items-center space-x-3 text-sm text-gray-600">
            <Phone className="w-4 h-4 flex-shrink-0" />
            <span>{faculty.phone}</span>
          </div>
        </div>

        {/* Office Hours */}
        <div className="bg-gray-50 rounded-lg p-3 mb-4">
          <div className="flex items-center space-x-2 mb-2">
            <Clock className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Office Hours</span>
          </div>
          <p className="text-sm text-gray-600">
            {formatTime(faculty.officeHours.start)} - {formatTime(faculty.officeHours.end)}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {faculty.officeHours.days.join(', ')}
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={onBookAppointment}
          className={`w-full py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 font-medium ${
            faculty.status === 'available' 
              ? 'bg-green-600 text-white hover:bg-green-700' 
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>{faculty.status === 'available' ? 'Visit Now' : 'Book Appointment'}</span>
        </button>
      </div>
    </div>
  );
}