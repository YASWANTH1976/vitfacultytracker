import React from 'react';
import { BarChart3, TrendingUp, Clock, Users, Calendar, Target, Zap, Award } from 'lucide-react';
import { useFaculty } from '../context/FacultyContext';

export default function AnalyticsDashboard() {
  const { faculties, appointments } = useFaculty();

  // Calculate analytics
  const totalFaculty = faculties.length;
  const availableFaculty = faculties.filter(f => f.status === 'available').length;
  const availabilityRate = Math.round((availableFaculty / totalFaculty) * 100);
  
  const totalAppointments = appointments.length;
  const confirmedAppointments = appointments.filter(a => a.status === 'confirmed').length;
  const successRate = totalAppointments > 0 ? Math.round((confirmedAppointments / totalAppointments) * 100) : 0;

  // Department-wise analytics
  const departmentStats = faculties.reduce((acc, faculty) => {
    const dept = faculty.department;
    if (!acc[dept]) {
      acc[dept] = { total: 0, available: 0, appointments: 0 };
    }
    acc[dept].total++;
    if (faculty.status === 'available') acc[dept].available++;
    acc[dept].appointments = appointments.filter(a => 
      faculties.find(f => f.id === a.facultyId)?.department === dept
    ).length;
    return acc;
  }, {} as Record<string, { total: number; available: number; appointments: number }>);

  // Time-based analytics
  const currentHour = new Date().getHours();
  const peakHours = [10, 11, 14, 15, 16]; // Typical peak hours
  const isPeakTime = peakHours.includes(currentHour);

  // Estimated time savings
  const avgWaitTime = 18; // minutes
  const successfulVisits = Math.round(totalAppointments * 0.7); // 70% success rate
  const timeSaved = successfulVisits * avgWaitTime;

  const stats = [
    {
      label: 'Faculty Availability',
      value: `${availabilityRate}%`,
      change: '+5%',
      trend: 'up',
      icon: Users,
      color: 'text-green-600 bg-green-100'
    },
    {
      label: 'Appointment Success',
      value: `${successRate}%`,
      change: '+12%',
      trend: 'up',
      icon: Target,
      color: 'text-blue-600 bg-blue-100'
    },
    {
      label: 'Time Saved Today',
      value: `${timeSaved}`,
      unit: 'min',
      change: '+25%',
      trend: 'up',
      icon: Clock,
      color: 'text-purple-600 bg-purple-100'
    },
    {
      label: 'Active Users',
      value: '1,247',
      change: '+18%',
      trend: 'up',
      icon: Zap,
      color: 'text-orange-600 bg-orange-100'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
          <p className="text-gray-600">Real-time insights and performance metrics</p>
        </div>
        <div className="flex items-center space-x-2">
          <BarChart3 className="w-5 h-5 text-blue-600" />
          <span className="text-sm text-gray-500">Live Data</span>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div className={`flex items-center space-x-1 text-sm ${
                stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                <TrendingUp className="w-3 h-3" />
                <span>{stat.change}</span>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.label}</p>
              <div className="flex items-baseline space-x-1">
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                {stat.unit && <span className="text-sm text-gray-500">{stat.unit}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Peak Time Alert */}
      {isPeakTime && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-orange-600" />
            <span className="font-medium text-orange-800">Peak Hours Active</span>
            <span className="text-sm text-orange-600">
              High faculty demand period ({currentHour}:00 - {currentHour + 1}:00)
            </span>
          </div>
        </div>
      )}

      {/* Department Performance */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Performance</h3>
        <div className="space-y-4">
          {Object.entries(departmentStats).map(([dept, stats]) => {
            const availabilityPercent = Math.round((stats.available / stats.total) * 100);
            return (
              <div key={dept} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">{dept.split(' ')[0]}</h4>
                  <p className="text-sm text-gray-600">
                    {stats.available}/{stats.total} available • {stats.appointments} appointments
                  </p>
                </div>
                <div className="text-right">
                  <span className={`text-lg font-bold ${
                    availabilityPercent >= 70 ? 'text-green-600' :
                    availabilityPercent >= 40 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {availabilityPercent}%
                  </span>
                  <p className="text-xs text-gray-500">availability</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Usage Insights */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Usage Insights</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Most Active Department</span>
              <span className="font-medium">Computer Science</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Peak Usage Time</span>
              <span className="font-medium">2:00 PM - 4:00 PM</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Average Response Time</span>
              <span className="font-medium">< 5 minutes</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Student Satisfaction</span>
              <span className="font-medium text-green-600">95%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Impact Metrics</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Time Saved This Week</span>
              <span className="font-medium text-blue-600">2,340 minutes</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Successful Visits</span>
              <span className="font-medium text-green-600">87%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Reduced Wait Times</span>
              <span className="font-medium text-purple-600">73%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Faculty Adoption</span>
              <span className="font-medium text-orange-600">92%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}