import React, { useState, useEffect } from 'react';
import { Bell, X, Clock, User, AlertCircle, CheckCircle, Info } from 'lucide-react';
import { useFaculty } from '../context/FacultyContext';

interface Notification {
  id: string;
  type: 'status_change' | 'appointment_update' | 'reminder' | 'info';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  facultyName?: string;
}

export default function NotificationSystem() {
  const { faculties, appointments } = useFaculty();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Generate sample notifications based on faculty status changes
    const generateNotifications = () => {
      const newNotifications: Notification[] = [
        {
          id: '1',
          type: 'status_change',
          title: 'Faculty Available',
          message: 'Dr. Rajesh Kumar is now available in cabin TT-101',
          timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
          read: false,
          facultyName: 'Dr. Rajesh Kumar'
        },
        {
          id: '2',
          type: 'appointment_update',
          title: 'Appointment Confirmed',
          message: 'Your appointment with Dr. Priya Sharma has been confirmed for tomorrow at 2:00 PM',
          timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
          read: false,
          facultyName: 'Dr. Priya Sharma'
        },
        {
          id: '3',
          type: 'reminder',
          title: 'Upcoming Appointment',
          message: 'Reminder: You have an appointment with Dr. Arjun Patel in 30 minutes',
          timestamp: new Date(Date.now() - 30 * 60000).toISOString(),
          read: true,
          facultyName: 'Dr. Arjun Patel'
        },
        {
          id: '4',
          type: 'info',
          title: 'System Update',
          message: 'Faculty availability system has been updated with new features',
          timestamp: new Date(Date.now() - 60 * 60000).toISOString(),
          read: true
        }
      ];
      setNotifications(newNotifications);
      setUnreadCount(newNotifications.filter(n => !n.read).length);
    };

    generateNotifications();
  }, [faculties, appointments]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'status_change': return <User className="w-5 h-5 text-blue-600" />;
      case 'appointment_update': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'reminder': return <Clock className="w-5 h-5 text-orange-600" />;
      case 'info': return <Info className="w-5 h-5 text-purple-600" />;
      default: return <AlertCircle className="w-5 h-5 text-gray-600" />;
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

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
    <div className="relative">
      <button
        onClick={() => setShowNotifications(!showNotifications)}
        className="relative p-2 text-white hover:text-blue-200 transition-colors"
      >
        <Bell className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {showNotifications && (
        <div className="absolute right-0 top-12 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Notifications</h3>
              <button
                onClick={() => setShowNotifications(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                <Bell className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                <p>No notifications yet</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                    !notification.read ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {notification.title}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-400 mt-2">
                        {formatTime(notification.timestamp)}
                      </p>
                    </div>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-2"></div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {notifications.length > 0 && (
            <div className="p-3 border-t border-gray-200">
              <button
                onClick={() => {
                  setNotifications(prev => prev.map(n => ({ ...n, read: true })));
                  setUnreadCount(0);
                }}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                Mark all as read
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}