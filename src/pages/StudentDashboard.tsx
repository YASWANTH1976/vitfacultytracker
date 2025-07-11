import React, { useState } from 'react';
import { Filter, Zap, Star, BarChart3, MessageSquare, Download, Heart, Brain, Users as UsersIcon, Bell, Shield, Navigation, Link, Wifi, AlertTriangle, Activity, Calendar as CalendarIcon, MapPin } from 'lucide-react';
import { useFaculty } from '../context/FacultyContext';
import FacultyCard from '../components/FacultyCard';
import AppointmentModal from '../components/AppointmentModal';
import QuickStats from '../components/QuickStats';
import FacultyAvailabilityChart from '../components/FacultyAvailabilityChart';
import RecentActivity from '../components/RecentActivity';
import SmartSearch from '../components/SmartSearch';
import QRCodeGenerator from '../components/QRCodeGenerator';
import AnalyticsDashboard from '../components/AnalyticsDashboard';
import FeedbackSystem from '../components/FeedbackSystem';
import ChatSupport from '../components/ChatSupport';
import FavoritesFaculty from '../components/FavoritesFaculty';
import ExportData from '../components/ExportData';
import AISchedulingAssistant from '../components/AISchedulingAssistant';
import VirtualQueueSystem from '../components/VirtualQueueSystem';
import SmartNotifications from '../components/SmartNotifications';
import CollaborativeScheduling from '../components/CollaborativeScheduling';
import AdvancedAnalytics from '../components/AdvancedAnalytics';
import BiometricAuthentication from '../components/BiometricAuthentication';
import ARCampusNavigation from '../components/ARCampusNavigation';
import BlockchainVerification from '../components/BlockchainVerification';
import IoTIntegration from '../components/IoTIntegration';
import AdvancedSecuritySystem from '../components/AdvancedSecuritySystem';
import PredictiveAvailability from '../components/PredictiveAvailability';
import EmergencyContactSystem from '../components/EmergencyContactSystem';
import StudentWellnessTracker from '../components/StudentWellnessTracker';
import CampusResourceFinder from '../components/CampusResourceFinder';
import AcademicDeadlineTracker from '../components/AcademicDeadlineTracker';

export default function StudentDashboard() {
  const { faculties } = useFaculty();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedFaculty, setSelectedFaculty] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeTab, setActiveTab] = useState('directory');
  const [showFeedback, setShowFeedback] = useState(false);

  const departments = Array.from(new Set(faculties.map(f => f.department)));
  
  const filteredFaculties = faculties.filter(faculty => {
    const matchesSearch = faculty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faculty.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || faculty.department === selectedDepartment;
    const matchesStatus = selectedStatus === 'all' || faculty.status === selectedStatus;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  // Quick access to available faculty
  const availableFaculty = faculties.filter(f => f.status === 'available');

  const handleSearch = (query: string) => {
    setSearchTerm(query);
  };

  const handleFacultySelect = (faculty: any) => {
    setSelectedFaculty(faculty.id);
  };

  const tabs = [
    { id: 'directory', label: 'Faculty Directory', icon: null },
    { id: 'ai-predictions', label: 'AI Predictions', icon: Brain },
    { id: 'emergency', label: 'Emergency Help', icon: AlertTriangle },
    { id: 'wellness', label: 'Wellness Tracker', icon: Activity },
    { id: 'deadlines', label: 'Deadlines', icon: CalendarIcon },
    { id: 'campus-resources', label: 'Campus Resources', icon: MapPin },
    { id: 'ai-assistant', label: 'AI Assistant', icon: Brain },
    { id: 'ar-navigation', label: 'AR Navigation', icon: Navigation },
    { id: 'iot-sensors', label: 'IoT Sensors', icon: Wifi },
    { id: 'blockchain', label: 'Blockchain', icon: Link },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'biometric', label: 'Biometric Auth', icon: Shield },
    { id: 'queue', label: 'Virtual Queue', icon: UsersIcon },
    { id: 'collaborative', label: 'Group Meetings', icon: UsersIcon },
    { id: 'notifications', label: 'Smart Alerts', icon: Bell },
    { id: 'favorites', label: 'Favorites', icon: Heart },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'export', label: 'Export', icon: Download }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">VIT Smart Campus System</h1>
              <p className="text-gray-600">AI-powered comprehensive student support platform</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowFeedback(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Feedback</span>
              </button>
              <QRCodeGenerator />
            </div>
          </div>
        </div>

        {/* Smart Search */}
        <div className="mb-8 flex justify-center">
          <SmartSearch onSearch={handleSearch} onFacultySelect={handleFacultySelect} />
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-4 overflow-x-auto pb-2">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    className={`py-2 px-3 border-b-2 font-medium text-sm whitespace-nowrap flex items-center space-x-1 ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {IconComponent && <IconComponent className="w-4 h-4" />}
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {activeTab === 'directory' && (
          <>
            {/* Quick Stats */}
            <QuickStats />

            {/* Quick Access - Available Faculty */}
            {availableFaculty.length > 0 && (
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 mb-8 border border-green-200">
                <div className="flex items-center space-x-2 mb-4">
                  <Zap className="w-5 h-5 text-green-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Available Right Now</h3>
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                    {availableFaculty.length} faculty
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {availableFaculty.slice(0, 3).map(faculty => (
                    <div key={faculty.id} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{faculty.name}</h4>
                        <div className="flex items-center space-x-1 text-green-600">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="text-xs font-medium">Available</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{faculty.department}</p>
                      <p className="text-sm text-gray-500 mb-3">Cabin {faculty.cabinNumber}</p>
                      <button
                        onClick={() => setSelectedFaculty(faculty.id)}
                        className="w-full bg-green-600 text-white py-2 px-3 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                      >
                        Book Now
                      </button>
                    </div>
                  ))}
                </div>
                {availableFaculty.length > 3 && (
                  <button
                    onClick={() => setSelectedStatus('available')}
                    className="mt-4 text-green-600 hover:text-green-800 font-medium text-sm"
                  >
                    View all {availableFaculty.length} available faculty →
                  </button>
                )}
              </div>
            )}

            <div className="grid lg:grid-cols-3 gap-8 mb-8">
              {/* Faculty Availability Chart */}
              <div className="lg:col-span-2">
                <FacultyAvailabilityChart />
              </div>
              
              {/* Recent Activity */}
              <div>
                <RecentActivity />
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <select
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                >
                  <option value="all">All Departments</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>

                <select
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="available">Available</option>
                  <option value="busy">Busy</option>
                  <option value="away">Away</option>
                  <option value="in-meeting">In Meeting</option>
                </select>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Filter className="h-4 w-4" />
                    <span>{filteredFaculties.length} results</span>
                  </div>
                </div>

                <div className="flex items-center space-x-1 justify-end">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
                  >
                    <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                      <div className="bg-current rounded-sm"></div>
                      <div className="bg-current rounded-sm"></div>
                      <div className="bg-current rounded-sm"></div>
                      <div className="bg-current rounded-sm"></div>
                    </div>
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
                  >
                    <div className="w-4 h-4 flex flex-col space-y-1">
                      <div className="h-0.5 bg-current rounded"></div>
                      <div className="h-0.5 bg-current rounded"></div>
                      <div className="h-0.5 bg-current rounded"></div>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Faculty Grid/List */}
            <div className={viewMode === 'grid' ? 
              "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : 
              "space-y-4"
            }>
              {filteredFaculties.map(faculty => (
                <FacultyCard
                  key={faculty.id}
                  faculty={faculty}
                  onBookAppointment={() => setSelectedFaculty(faculty.id)}
                  viewMode={viewMode}
                />
              ))}
            </div>

            {filteredFaculties.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No faculty found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your search criteria</p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedDepartment('all');
                    setSelectedStatus('all');
                  }}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </>
        )}

        {/* New Advanced Features */}
        {activeTab === 'ai-predictions' && <PredictiveAvailability />}
        {activeTab === 'emergency' && <EmergencyContactSystem />}
        {activeTab === 'wellness' && <StudentWellnessTracker />}
        {activeTab === 'deadlines' && <AcademicDeadlineTracker />}
        {activeTab === 'campus-resources' && <CampusResourceFinder />}
        
        {/* Existing Features */}
        {activeTab === 'ai-assistant' && <AISchedulingAssistant />}
        {activeTab === 'ar-navigation' && <ARCampusNavigation />}
        {activeTab === 'iot-sensors' && <IoTIntegration />}
        {activeTab === 'blockchain' && <BlockchainVerification />}
        {activeTab === 'security' && <AdvancedSecuritySystem />}
        {activeTab === 'biometric' && <BiometricAuthentication />}
        {activeTab === 'queue' && <VirtualQueueSystem />}
        {activeTab === 'collaborative' && <CollaborativeScheduling />}
        {activeTab === 'notifications' && <SmartNotifications />}
        {activeTab === 'favorites' && <FavoritesFaculty />}
        {activeTab === 'analytics' && <AdvancedAnalytics />}
        {activeTab === 'export' && <ExportData />}

        {/* Feedback Modal */}
        {showFeedback && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="max-w-md w-full">
              <FeedbackSystem onClose={() => setShowFeedback(false)} />
            </div>
          </div>
        )}

        {/* Appointment Modal */}
        {selectedFaculty && (
          <AppointmentModal
            facultyId={selectedFaculty}
            onClose={() => setSelectedFaculty(null)}
          />
        )}

        {/* Chat Support */}
        <ChatSupport />
      </div>
    </div>
  );
}