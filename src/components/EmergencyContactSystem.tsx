import React, { useState } from 'react';
import { Phone, AlertTriangle, Clock, MessageSquare, Shield, Zap } from 'lucide-react';

interface EmergencyContact {
  id: string;
  name: string;
  role: string;
  phone: string;
  email: string;
  availability: '24/7' | 'office-hours' | 'emergency-only';
  responseTime: string;
}

export default function EmergencyContactSystem() {
  const [selectedEmergency, setSelectedEmergency] = useState<string>('');
  const [isEmergencyMode, setIsEmergencyMode] = useState(false);

  const emergencyContacts: EmergencyContact[] = [
    {
      id: '1',
      name: 'Dr. Academic Dean',
      role: 'Academic Emergency',
      phone: '+91 9876543200',
      email: 'dean.academic@vit.ac.in',
      availability: '24/7',
      responseTime: '< 15 minutes'
    },
    {
      id: '2',
      name: 'Student Counselor',
      role: 'Mental Health Support',
      phone: '+91 9876543201',
      email: 'counselor@vit.ac.in',
      availability: '24/7',
      responseTime: '< 30 minutes'
    },
    {
      id: '3',
      name: 'Security Office',
      role: 'Campus Security',
      phone: '+91 9876543202',
      email: 'security@vit.ac.in',
      availability: '24/7',
      responseTime: '< 5 minutes'
    },
    {
      id: '4',
      name: 'Medical Center',
      role: 'Health Emergency',
      phone: '+91 9876543203',
      email: 'medical@vit.ac.in',
      availability: '24/7',
      responseTime: '< 10 minutes'
    },
    {
      id: '5',
      name: 'IT Helpdesk',
      role: 'Technical Issues',
      phone: '+91 9876543204',
      email: 'ithelp@vit.ac.in',
      availability: 'office-hours',
      responseTime: '< 2 hours'
    }
  ];

  const emergencyTypes = [
    { id: 'academic', label: 'Academic Emergency', icon: '📚', description: 'Exam issues, grade disputes, academic deadlines' },
    { id: 'health', label: 'Health Emergency', icon: '🏥', description: 'Medical emergencies, health concerns' },
    { id: 'mental', label: 'Mental Health', icon: '🧠', description: 'Stress, anxiety, counseling needed' },
    { id: 'security', label: 'Security Issue', icon: '🛡️', description: 'Safety concerns, harassment, theft' },
    { id: 'technical', label: 'Technical Crisis', icon: '💻', description: 'System failures affecting academics' },
    { id: 'personal', label: 'Personal Crisis', icon: '🆘', description: 'Family emergency, financial crisis' }
  ];

  const handleEmergencyCall = (contact: EmergencyContact) => {
    // In a real app, this would initiate a call or send an emergency message
    alert(`Emergency contact initiated with ${contact.name}\nPhone: ${contact.phone}\nExpected response: ${contact.responseTime}`);
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case '24/7': return 'text-green-600 bg-green-100';
      case 'office-hours': return 'text-blue-600 bg-blue-100';
      case 'emergency-only': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <AlertTriangle className="w-6 h-6 text-red-600" />
          <h3 className="text-lg font-semibold text-gray-900">Emergency Contact System</h3>
        </div>
        <button
          onClick={() => setIsEmergencyMode(!isEmergencyMode)}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            isEmergencyMode 
              ? 'bg-red-600 text-white hover:bg-red-700' 
              : 'bg-red-100 text-red-700 hover:bg-red-200'
          }`}
        >
          {isEmergencyMode ? 'Exit Emergency Mode' : 'Emergency Mode'}
        </button>
      </div>

      {isEmergencyMode && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-2 mb-3">
            <Zap className="w-5 h-5 text-red-600" />
            <span className="font-medium text-red-900">Emergency Mode Active</span>
          </div>
          <p className="text-red-800 text-sm mb-3">
            For life-threatening emergencies, call 108 (Ambulance) or 100 (Police) immediately.
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors">
              Call 108 (Medical)
            </button>
            <button className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors">
              Call 100 (Police)
            </button>
          </div>
        </div>
      )}

      {/* Emergency Type Selection */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">What type of help do you need?</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {emergencyTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedEmergency(type.id)}
              className={`p-3 rounded-lg border-2 transition-all text-left ${
                selectedEmergency === type.id
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-2xl mb-1">{type.icon}</div>
              <div className="font-medium text-gray-900 text-sm">{type.label}</div>
              <div className="text-xs text-gray-600 mt-1">{type.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Emergency Contacts */}
      <div>
        <h4 className="font-medium text-gray-900 mb-3">Emergency Contacts</h4>
        <div className="space-y-3">
          {emergencyContacts.map((contact) => (
            <div key={contact.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h5 className="font-medium text-gray-900">{contact.name}</h5>
                  <p className="text-sm text-gray-600">{contact.role}</p>
                </div>
                <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getAvailabilityColor(contact.availability)}`}>
                  {contact.availability}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-3 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Phone className="w-3 h-3" />
                  <span>{contact.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-3 h-3" />
                  <span>Response: {contact.responseTime}</span>
                </div>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => handleEmergencyCall(contact)}
                  className="flex-1 bg-red-600 text-white py-2 px-3 rounded hover:bg-red-700 transition-colors flex items-center justify-center space-x-1"
                >
                  <Phone className="w-3 h-3" />
                  <span>Call Now</span>
                </button>
                <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded hover:bg-blue-700 transition-colors flex items-center justify-center space-x-1">
                  <MessageSquare className="w-3 h-3" />
                  <span>Message</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Safety Tips */}
      <div className="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-200">
        <div className="flex items-center space-x-2 mb-2">
          <Shield className="w-4 h-4 text-blue-600" />
          <span className="font-medium text-blue-900">Safety Tips</span>
        </div>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Save emergency numbers in your phone contacts</li>
          <li>• Share your location with trusted contacts during emergencies</li>
          <li>• Keep your student ID and emergency contact info updated</li>
          <li>• Know the location of nearest medical center and security office</li>
          <li>• Use the buddy system when possible, especially at night</li>
        </ul>
      </div>
    </div>
  );
}