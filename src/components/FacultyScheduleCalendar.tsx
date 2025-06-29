import React, { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Clock, User } from 'lucide-react';
import { Faculty, useFaculty } from '../context/FacultyContext';

interface FacultyScheduleCalendarProps {
  faculty: Faculty;
}

export default function FacultyScheduleCalendar({ faculty }: FacultyScheduleCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { appointments } = useFaculty();

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const facultyAppointments = appointments.filter(apt => apt.facultyId === faculty.id);

  const getAppointmentsForDate = (date: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
    return facultyAppointments.filter(apt => apt.date === dateStr);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const isToday = (date: number) => {
    const today = new Date();
    return today.getDate() === date && 
           today.getMonth() === currentDate.getMonth() && 
           today.getFullYear() === currentDate.getFullYear();
  };

  const isOfficeDay = (date: number) => {
    const dayOfWeek = new Date(currentDate.getFullYear(), currentDate.getMonth(), date).toLocaleDateString('en-US', { weekday: 'long' });
    return faculty.officeHours.days.includes(dayOfWeek);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          {faculty.name}'s Schedule
        </h3>
        <Calendar className="w-5 h-5 text-blue-600" />
      </div>

      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => navigateMonth('prev')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <h4 className="text-lg font-semibold text-gray-900">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h4>
        <button
          onClick={() => navigateMonth('next')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Days of Week */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Empty cells for days before month starts */}
        {Array.from({ length: firstDayOfMonth }, (_, i) => (
          <div key={`empty-${i}`} className="p-2 h-16"></div>
        ))}
        
        {/* Days of the month */}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const date = i + 1;
          const dayAppointments = getAppointmentsForDate(date);
          const isOffice = isOfficeDay(date);
          
          return (
            <div
              key={date}
              className={`p-2 h-16 border border-gray-100 rounded-lg relative ${
                isToday(date) ? 'bg-blue-50 border-blue-200' : 
                isOffice ? 'bg-green-50' : 'bg-gray-50'
              }`}
            >
              <div className={`text-sm font-medium ${
                isToday(date) ? 'text-blue-600' : 
                isOffice ? 'text-gray-900' : 'text-gray-400'
              }`}>
                {date}
              </div>
              
              {/* Office hours indicator */}
              {isOffice && (
                <div className="absolute top-1 right-1">
                  <Clock className="w-3 h-3 text-green-600" />
                </div>
              )}
              
              {/* Appointments */}
              {dayAppointments.slice(0, 2).map((apt, index) => (
                <div
                  key={apt.id}
                  className={`text-xs px-1 py-0.5 rounded mt-1 truncate ${
                    apt.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                    apt.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}
                  title={`${apt.time} - ${apt.studentName}`}
                >
                  {apt.time}
                </div>
              ))}
              
              {dayAppointments.length > 2 && (
                <div className="text-xs text-gray-500 mt-1">
                  +{dayAppointments.length - 2} more
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center justify-center space-x-4 text-xs">
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-blue-50 border border-blue-200 rounded"></div>
          <span>Today</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-green-50 rounded"></div>
          <span>Office Hours</span>
        </div>
        <div className="flex items-center space-x-1">
          <Clock className="w-3 h-3 text-green-600" />
          <span>Available</span>
        </div>
      </div>
    </div>
  );
}