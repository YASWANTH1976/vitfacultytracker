import React from 'react';
import { Calendar, Clock, User, MessageSquare, Check, X, Mail } from 'lucide-react';
import { Appointment, useFaculty } from '../context/FacultyContext';

interface AppointmentsListProps {
  appointments: Appointment[];
}

export default function AppointmentsList({ appointments }: AppointmentsListProps) {
  const { updateAppointmentStatus } = useFaculty();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Confirmed';
      case 'pending': return 'Pending';
      case 'cancelled': return 'Cancelled';
      default: return 'Unknown';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    return new Date(`1970-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const handleStatusUpdate = (appointmentId: string, newStatus: Appointment['status']) => {
    updateAppointmentStatus(appointmentId, newStatus);
  };

  if (appointments.length === 0) {
    return (
      <div className="text-center py-8">
        <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Appointments</h3>
        <p className="text-gray-600">You don't have any appointment requests yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Appointment Requests</h3>
        <span className="text-sm text-gray-500">{appointments.length} total</span>
      </div>

      {appointments.map((appointment) => (
        <div key={appointment.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">{appointment.studentName}</h4>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>{appointment.studentEmail}</span>
                </div>
              </div>
            </div>
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(appointment.status)}`}>
              {getStatusText(appointment.status)}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(appointment.date)}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>{formatTime(appointment.time)}</span>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex items-start space-x-2 text-sm">
              <MessageSquare className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-gray-700">Purpose:</p>
                <p className="text-gray-600">{appointment.purpose}</p>
              </div>
            </div>
          </div>

          {appointment.status === 'pending' && (
            <div className="flex space-x-3">
              <button
                onClick={() => handleStatusUpdate(appointment.id, 'confirmed')}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Check className="w-4 h-4" />
                <span>Confirm</span>
              </button>
              <button
                onClick={() => handleStatusUpdate(appointment.id, 'cancelled')}
                className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <X className="w-4 h-4" />
                <span>Cancel</span>
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}