import React, { useState } from 'react';
import { Shield, Eye, AlertTriangle, Lock, Key, UserCheck } from 'lucide-react';

interface SecurityEvent {
  id: string;
  type: 'login' | 'access' | 'suspicious' | 'breach';
  description: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  resolved: boolean;
}

export default function AdvancedSecuritySystem() {
  const [securityEvents, setSecurityEvents] = useState<SecurityEvent[]>([
    {
      id: '1',
      type: 'login',
      description: 'Successful biometric login - Dr. Rajesh Kumar',
      timestamp: new Date().toISOString(),
      severity: 'low',
      resolved: true
    },
    {
      id: '2',
      type: 'suspicious',
      description: 'Multiple failed login attempts detected',
      timestamp: new Date(Date.now() - 300000).toISOString(),
      severity: 'medium',
      resolved: false
    },
    {
      id: '3',
      type: 'access',
      description: 'Unauthorized access attempt to faculty dashboard',
      timestamp: new Date(Date.now() - 600000).toISOString(),
      severity: 'high',
      resolved: false
    }
  ]);

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    biometricAuth: true,
    encryptionLevel: 'AES-256',
    sessionTimeout: 30,
    ipWhitelist: true,
    anomalyDetection: true
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'login': return <UserCheck className="w-4 h-4" />;
      case 'access': return <Lock className="w-4 h-4" />;
      case 'suspicious': return <Eye className="w-4 h-4" />;
      case 'breach': return <AlertTriangle className="w-4 h-4" />;
      default: return <Shield className="w-4 h-4" />;
    }
  };

  const resolveEvent = (eventId: string) => {
    setSecurityEvents(prev => prev.map(event => 
      event.id === eventId ? { ...event, resolved: true } : event
    ));
  };

  const toggleSetting = (setting: string) => {
    setSecuritySettings(prev => ({
      ...prev,
      [setting]: !prev[setting as keyof typeof prev]
    }));
  };

  const unresolvedEvents = securityEvents.filter(event => !event.resolved);
  const criticalEvents = securityEvents.filter(event => event.severity === 'critical' || event.severity === 'high');

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Shield className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Advanced Security System</h3>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            criticalEvents.length === 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {criticalEvents.length === 0 ? 'Secure' : `${criticalEvents.length} Alerts`}
          </span>
        </div>
      </div>

      {/* Security Overview */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Lock className="w-4 h-4 text-green-600" />
            <span className="font-medium text-green-900">Encryption</span>
          </div>
          <p className="text-sm text-green-700">{securitySettings.encryptionLevel}</p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Key className="w-4 h-4 text-blue-600" />
            <span className="font-medium text-blue-900">Authentication</span>
          </div>
          <p className="text-sm text-blue-700">Multi-Factor</p>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Eye className="w-4 h-4 text-purple-600" />
            <span className="font-medium text-purple-900">Monitoring</span>
          </div>
          <p className="text-sm text-purple-700">24/7 Active</p>
        </div>
      </div>

      {/* Security Events */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Recent Security Events</h4>
        <div className="space-y-2">
          {securityEvents.slice(0, 5).map((event) => (
            <div key={event.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${getSeverityColor(event.severity)}`}>
                  {getEventIcon(event.type)}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{event.description}</p>
                  <p className="text-sm text-gray-600">
                    {new Date(event.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(event.severity)}`}>
                  {event.severity}
                </span>
                {!event.resolved && (
                  <button
                    onClick={() => resolveEvent(event.id)}
                    className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors"
                  >
                    Resolve
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Security Settings */}
      <div>
        <h4 className="font-medium text-gray-900 mb-3">Security Configuration</h4>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(securitySettings).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="font-medium text-gray-900 capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </span>
              {typeof value === 'boolean' ? (
                <button
                  onClick={() => toggleSetting(key)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    value ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      value ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              ) : (
                <span className="text-sm text-gray-600">{value}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}