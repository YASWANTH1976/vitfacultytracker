import React from 'react';
import { Users, Clock, Calendar, TrendingUp } from 'lucide-react';
import { useFaculty } from '../context/FacultyContext';

export default function QuickStats() {
  const { faculties, appointments } = useFaculty();

  const availableFaculty = faculties.filter(f => f.status === 'available').length;
  const totalFaculty = faculties.length;
  const pendingAppointments = appointments.filter(a => a.status === 'pending').length;
  const todayAppointments = appointments.filter(a => {
    const today = new Date().toISOString().split('T')[0];
    return a.date === today;
  }).length;

  const stats = [
    {
      label: 'Available Now',
      value: availableFaculty,
      total: totalFaculty,
      icon: Users,
      color: 'text-green-600 bg-green-100',
      percentage: Math.round((availableFaculty / totalFaculty) * 100)
    },
    {
      label: 'Avg Response Time',
      value: '< 5',
      unit: 'min',
      icon: Clock,
      color: 'text-blue-600 bg-blue-100'
    },
    {
      label: 'Today\'s Appointments',
      value: todayAppointments,
      icon: Calendar,
      color: 'text-purple-600 bg-purple-100'
    },
    {
      label: 'Pending Requests',
      value: pendingAppointments,
      icon: TrendingUp,
      color: 'text-orange-600 bg-orange-100'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.label}</p>
              <div className="flex items-baseline space-x-1">
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                {stat.unit && <span className="text-sm text-gray-500">{stat.unit}</span>}
                {stat.total && <span className="text-sm text-gray-500">/{stat.total}</span>}
              </div>
              {stat.percentage && (
                <p className="text-xs text-gray-500 mt-1">{stat.percentage}% available</p>
              )}
            </div>
            <div className={`p-2 rounded-lg ${stat.color}`}>
              <stat.icon className="w-5 h-5" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}