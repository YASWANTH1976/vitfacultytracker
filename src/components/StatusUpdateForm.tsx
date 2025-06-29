import React, { useState } from 'react';
import { Clock, MessageSquare, Save, CheckCircle } from 'lucide-react';
import { Faculty, useFaculty } from '../context/FacultyContext';

interface StatusUpdateFormProps {
  faculty: Faculty;
}

export default function StatusUpdateForm({ faculty }: StatusUpdateFormProps) {
  const { updateFacultyStatus } = useFaculty();
  const [status, setStatus] = useState(faculty.status);
  const [message, setMessage] = useState(faculty.statusMessage);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const statusOptions = [
    { value: 'available', label: 'Available', color: 'text-green-600 bg-green-100' },
    { value: 'busy', label: 'Busy', color: 'text-red-600 bg-red-100' },
    { value: 'away', label: 'Away', color: 'text-yellow-600 bg-yellow-100' },
    { value: 'in-meeting', label: 'In Meeting', color: 'text-purple-600 bg-purple-100' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      updateFacultyStatus(faculty.id, status as Faculty['status'], message);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error) {
      console.error('Failed to update status:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const quickMessages = [
    'Available for academic queries',
    'Available for project guidance',
    'In departmental meeting - Back by 3:00 PM',
    'Reviewing research papers',
    'At conference - Back tomorrow',
    'Away for the day'
  ];

  return (
    <div className="space-y-6">
      {isSuccess && (
        <div className="flex items-center space-x-2 text-green-600 bg-green-50 p-3 rounded-lg">
          <CheckCircle className="h-5 w-5" />
          <span className="font-medium">Status updated successfully!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Current Status Display */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">Current Status</h3>
          <div className="flex items-center space-x-3">
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              statusOptions.find(opt => opt.value === faculty.status)?.color || 'text-gray-600 bg-gray-100'
            }`}>
              <div className="w-2 h-2 rounded-full bg-current mr-2"></div>
              {statusOptions.find(opt => opt.value === faculty.status)?.label || 'Unknown'}
            </div>
            <span className="text-sm text-blue-700">{faculty.statusMessage}</span>
          </div>
          <p className="text-xs text-blue-600 mt-2">
            Last updated: {new Date(faculty.lastUpdated).toLocaleString()}
          </p>
        </div>

        {/* Status Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            <Clock className="w-4 h-4 inline mr-1" />
            Update Your Status
          </label>
          <div className="grid grid-cols-2 gap-3">
            {statusOptions.map((option) => (
              <label
                key={option.value}
                className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition-all ${
                  status === option.value
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="status"
                  value={option.value}
                  checked={status === option.value}
                  onChange={(e) => setStatus(e.target.value)}
                  className="sr-only"
                />
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${option.color}`}>
                  <div className="w-2 h-2 rounded-full bg-current mr-2"></div>
                  {option.label}
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Message Input */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            <MessageSquare className="w-4 h-4 inline mr-1" />
            Status Message
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            placeholder="Provide additional details about your availability..."
          />
        </div>

        {/* Quick Message Templates */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quick Message Templates
          </label>
          <div className="grid grid-cols-1 gap-2">
            {quickMessages.map((quickMsg, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setMessage(quickMsg)}
                className="text-left p-2 text-sm text-gray-600 bg-gray-50 hover:bg-gray-100 rounded border transition-colors"
              >
                {quickMsg}
              </button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isUpdating}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          <Save className="w-4 h-4" />
          <span>{isUpdating ? 'Updating...' : 'Update Status'}</span>
        </button>
      </form>
    </div>
  );
}