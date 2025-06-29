import React from 'react';
import { Activity, Clock, User, Calendar, CheckCircle, XCircle } from 'lucide-react';
import { useFaculty } from '../context/FacultyContext';

interface ActivityItem {
  id: string;
  type: 'status_change' | 'appointment_booked' | 'appointment_confirmed' | 'appointment_cancelled';
  message: string;
  timestamp: string;
  facultyName: string;
  icon: React.ReactNode;
  color: string;
}

export default function RecentActivity() {
  const { faculties, appointments } = useFaculty();

  // Generate recent activity based on faculty status and appointments
  const generateRecentActivity = (): ActivityItem[] => {
    const activities: ActivityItem[] = [];

    // Add recent status changes
    faculties.slice(0, 3).forEach((faculty, index) => {
      activities.push({
        id: `status-${faculty.id}`,
        type: 'status_change',
        message: `Updated status to "${faculty.status}"`,
        timestamp: new Date(Date.now() - (index + 1) * 10 * 60000).toISOString(),
        facultyName: faculty.name,
        icon: <User className="w-4 h-4" />,
        color: faculty.status === 'available' ? 'text-green-600 bg-green-100' : 
               faculty.status === 'busy' ? 'text-red-600 bg-red-100' :
               faculty.status === 'away' ? 'text-yellow-600 bg-yellow-100' :
               'text-purple-600 bg-purple-100'
      });
    });

    // Add recent appointments
    appointments.slice(0, 2).forEach((appointment, index) => {
      const faculty = faculties.find(f => f.id === appointment.facultyId);
      if (faculty) {
        activities.push({
          id: `appointment-${appointment.id}`,
          type: appointment.status === 'confirmed' ? 'appointment_confirmed' : 
                appointment.status === 'cancelled' ? 'appointment_cancelled' : 'appointment_booked',
          message: appointment.status === 'confirmed' ? 'Appointment confirmed' :
                   appointment.status === 'cancelled' ? 'Appointment cancelled' :
                   'New appointment request',
          timestamp: new Date(Date.now() - (index + 4) * 15 * 60000).toISOString(),
          facultyName: faculty.name,
          icon: appointment.status === 'confirmed' ? <CheckCircle className="w-4 h-4" /> :
                appointment.status === 'cancelled' ? <XCircle className="w-4 h-4" /> :
                <Calendar className="w-4 h-4" />,
          color: appointment.status === 'confirmed' ? 'text-green-600 bg-green-100' :
                 appointment.status === 'cancelled' ? 'text-red-600 bg-red-100' :
                 'text-blue-600 bg-blue-100'
        });
      }
    });

    return activities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  };

  const activities = generateRecentActivity();

  const formatTime = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
          <p className="text-sm text-gray-600">Latest updates from faculty and appointments</p>
        </div>
        <Activity className="w-5 h-5 text-blue-600" />
      </div>

      <div className="space-y-4">
        {activities.length === 0 ? (
          <div className="text-center py-8">
            <Activity className="w-8 h-8 text-gray-300 mx-auto mb-2" />
            <p className="text-gray-500">No recent activity</p>
          </div>
        ) : (
          activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div className={`p-2 rounded-full ${activity.color}`}>
                {activity.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">
                    {activity.facultyName}
                  </p>
                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    <span>{formatTime(activity.timestamp)}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {activity.message}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {activities.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
            View all activity
          </button>
        </div>
      )}
    </div>
  );
}