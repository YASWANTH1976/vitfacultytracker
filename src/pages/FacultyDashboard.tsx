import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Users, Calendar, Settings, Bell, CheckCircle, BarChart3, MessageSquare } from 'lucide-react';
import { useFaculty } from '../context/FacultyContext';
import StatusUpdateForm from '../components/StatusUpdateForm';
import AppointmentsList from '../components/AppointmentsList';
import FacultyScheduleCalendar from '../components/FacultyScheduleCalendar';
import FeedbackSystem from '../components/FeedbackSystem';
import ExportData from '../components/ExportData';

export default function FacultyDashboard() {
  const { currentFaculty, appointments } = useFaculty();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('status');
  const [showFeedback, setShowFeedback] = useState(false);

  if (!currentFaculty) {
    navigate('/faculty/login');
    return null;
  }

  const facultyAppointments = appointments.filter(apt => apt.facultyId === currentFaculty.id);
  const pendingAppointments = facultyAppointments.filter(apt => apt.status === 'pending');
  const todayAppointments = facultyAppointments.filter(apt => {
    const today = new Date().toISOString().split('T')[0];
    return apt.date === today;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'text-green-600 bg-green-100';
      case 'busy': return 'text-red-600 bg-red-100';
      case 'away': return 'text-yellow-600 bg-yellow-100';
      case 'in-meeting': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Welcome, {currentFaculty.name}</h1>
              <p className="text-gray-600">{currentFaculty.designation}, {currentFaculty.department}</p>
            </div>
            <button
              onClick={() => setShowFeedback(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Feedback</span>
            </button>
          </div>
        </div>

        {/* Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Current Status</p>
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mt-2 ${getStatusColor(currentFaculty.status)}`}>
                  <div className="w-2 h-2 rounded-full bg-current mr-2"></div>
                  {getStatusText(currentFaculty.status)}
                </div>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Appointments</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{pendingAppointments.length}</p>
              </div>
              <Calendar className="h-8 w-8 text-orange-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Today's Appointments</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{todayAppointments.length}</p>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Cabin Number</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{currentFaculty.cabinNumber}</p>
              </div>
              <Settings className="h-8 w-8 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Notifications */}
        {pendingAppointments.length > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
            <div className="flex items-center space-x-2">
              <Bell className="h-5 w-5 text-yellow-600" />
              <span className="font-medium text-yellow-800">
                You have {pendingAppointments.length} pending appointment{pendingAppointments.length > 1 ? 's' : ''} waiting for your response
              </span>
            </div>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-md mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'status'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('status')}
              >
                Update Status
              </button>
              <button
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'appointments'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('appointments')}
              >
                Appointments ({facultyAppointments.length})
              </button>
              <button
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'schedule'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('schedule')}
              >
                <Calendar className="w-4 h-4 inline mr-1" />
                Schedule
              </button>
              <button
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'export'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('export')}
              >
                <BarChart3 className="w-4 h-4 inline mr-1" />
                Export Data
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'status' && <StatusUpdateForm faculty={currentFaculty} />}
            {activeTab === 'appointments' && <AppointmentsList appointments={facultyAppointments} />}
            {activeTab === 'schedule' && <FacultyScheduleCalendar faculty={currentFaculty} />}
            {activeTab === 'export' && <ExportData />}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center space-x-3 p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span>Mark as Available</span>
            </button>
            <button className="flex items-center space-x-3 p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Clock className="h-5 w-5 text-red-600" />
              <span>In Meeting (30 min)</span>
            </button>
            <button className="flex items-center space-x-3 p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Bell className="h-5 w-5 text-blue-600" />
              <span>Away for Today</span>
            </button>
          </div>
        </div>

        {/* Feedback Modal */}
        {showFeedback && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="max-w-md w-full">
              <FeedbackSystem facultyId={currentFaculty.id} onClose={() => setShowFeedback(false)} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}