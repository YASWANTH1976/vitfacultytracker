import React, { useState } from 'react';
import { MapPin, Clock, Phone, Star, Navigation, Filter, Search } from 'lucide-react';

interface CampusResource {
  id: string;
  name: string;
  category: string;
  location: string;
  coordinates: { lat: number; lng: number };
  hours: string;
  phone?: string;
  rating: number;
  description: string;
  amenities: string[];
  crowdLevel: 'low' | 'medium' | 'high';
  waitTime?: string;
  image?: string;
}

export default function CampusResourceFinder() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('distance');

  const resources: CampusResource[] = [
    {
      id: '1',
      name: 'Central Library',
      category: 'study',
      location: 'Academic Block A',
      coordinates: { lat: 12.9698, lng: 79.1556 },
      hours: '8:00 AM - 10:00 PM',
      phone: '+91 416 220 2020',
      rating: 4.5,
      description: 'Main library with extensive collection and study spaces',
      amenities: ['WiFi', 'AC', 'Silent Zone', 'Group Study Rooms', 'Printing'],
      crowdLevel: 'medium',
      waitTime: '5-10 minutes'
    },
    {
      id: '2',
      name: 'Food Court',
      category: 'dining',
      location: 'Student Center',
      coordinates: { lat: 12.9695, lng: 79.1560 },
      hours: '7:00 AM - 11:00 PM',
      rating: 4.2,
      description: 'Multiple food outlets with diverse cuisine options',
      amenities: ['Multiple Cuisines', 'Seating Area', 'AC', 'Card Payment'],
      crowdLevel: 'high',
      waitTime: '15-20 minutes'
    },
    {
      id: '3',
      name: 'Gym & Fitness Center',
      category: 'recreation',
      location: 'Sports Complex',
      coordinates: { lat: 12.9692, lng: 79.1565 },
      hours: '6:00 AM - 10:00 PM',
      phone: '+91 416 220 2030',
      rating: 4.3,
      description: 'Modern gym with cardio and strength training equipment',
      amenities: ['Cardio Equipment', 'Weight Training', 'Locker Rooms', 'Trainer Available'],
      crowdLevel: 'low',
      waitTime: 'No wait'
    },
    {
      id: '4',
      name: 'Medical Center',
      category: 'health',
      location: 'Near Main Gate',
      coordinates: { lat: 12.9700, lng: 79.1550 },
      hours: '24/7 Emergency, 8:00 AM - 8:00 PM Regular',
      phone: '+91 416 220 2040',
      rating: 4.7,
      description: 'Full-service medical facility with emergency care',
      amenities: ['Emergency Care', 'Pharmacy', 'Lab Tests', 'Specialist Doctors'],
      crowdLevel: 'low',
      waitTime: '10-15 minutes'
    },
    {
      id: '5',
      name: 'ATM Center',
      category: 'services',
      location: 'Multiple Locations',
      coordinates: { lat: 12.9697, lng: 79.1558 },
      hours: '24/7',
      rating: 4.0,
      description: 'Multiple ATMs from different banks',
      amenities: ['Multiple Banks', '24/7 Access', 'Security Camera', 'Well Lit'],
      crowdLevel: 'low',
      waitTime: '2-5 minutes'
    },
    {
      id: '6',
      name: 'Study Pods - Block B',
      category: 'study',
      location: 'Academic Block B',
      coordinates: { lat: 12.9693, lng: 79.1562 },
      hours: '24/7',
      rating: 4.6,
      description: 'Individual and group study pods with modern amenities',
      amenities: ['24/7 Access', 'AC', 'Power Outlets', 'WiFi', 'Whiteboard'],
      crowdLevel: 'medium',
      waitTime: '5-15 minutes'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Resources', icon: '🏢' },
    { id: 'study', label: 'Study Spaces', icon: '📚' },
    { id: 'dining', label: 'Dining', icon: '🍽️' },
    { id: 'recreation', label: 'Recreation', icon: '🏃' },
    { id: 'health', label: 'Health', icon: '🏥' },
    { id: 'services', label: 'Services', icon: '🏪' }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesSearch = resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCrowdColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getDirections = (resource: CampusResource) => {
    // In a real app, this would open maps or provide navigation
    alert(`Getting directions to ${resource.name} at ${resource.location}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Campus Resource Finder</h3>
          <p className="text-sm text-gray-600">Find and navigate to campus facilities</p>
        </div>
        <MapPin className="w-5 h-5 text-blue-600" />
      </div>

      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search resources..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center space-x-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="distance">Sort by Distance</option>
            <option value="rating">Sort by Rating</option>
            <option value="crowdLevel">Sort by Crowd Level</option>
          </select>
        </div>
      </div>

      {/* Category Filters */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span>{category.icon}</span>
              <span>{category.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Resources List */}
      <div className="space-y-4">
        {filteredResources.map((resource) => (
          <div key={resource.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-semibold text-gray-900">{resource.name}</h4>
                <p className="text-sm text-gray-600">{resource.description}</p>
                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-3 h-3" />
                    <span>{resource.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{resource.hours}</span>
                  </div>
                  {resource.phone && (
                    <div className="flex items-center space-x-1">
                      <Phone className="w-3 h-3" />
                      <span>{resource.phone}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="text-right">
                <div className="flex items-center space-x-1 mb-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">{resource.rating}</span>
                </div>
                <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCrowdColor(resource.crowdLevel)}`}>
                  {resource.crowdLevel} crowd
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className="mb-3">
              <div className="flex flex-wrap gap-1">
                {resource.amenities.slice(0, 4).map((amenity, index) => (
                  <span key={index} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                    {amenity}
                  </span>
                ))}
                {resource.amenities.length > 4 && (
                  <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                    +{resource.amenities.length - 4} more
                  </span>
                )}
              </div>
            </div>

            {/* Wait Time and Actions */}
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                {resource.waitTime && (
                  <span>Expected wait: <span className="font-medium">{resource.waitTime}</span></span>
                )}
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => getDirections(resource)}
                  className="flex items-center space-x-1 px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors"
                >
                  <Navigation className="w-3 h-3" />
                  <span>Directions</span>
                </button>
                <button className="flex items-center space-x-1 px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200 transition-colors">
                  <Phone className="w-3 h-3" />
                  <span>Call</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <div className="text-center py-8">
          <div className="text-gray-400 text-4xl mb-2">🔍</div>
          <h4 className="font-medium text-gray-900 mb-1">No resources found</h4>
          <p className="text-gray-600">Try adjusting your search or category filter</p>
        </div>
      )}
    </div>
  );
}