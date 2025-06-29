import React, { useState, useEffect } from 'react';
import { Bell, Smartphone, Mail, MessageSquare, Settings, Zap } from 'lucide-react';

interface NotificationPreference {
  type: 'push' | 'email' | 'sms' | 'whatsapp';
  enabled: boolean;
  label: string;
  icon: React.ReactNode;
}

export default function SmartNotifications() {
  const [preferences, setPreferences] = useState<NotificationPreference[]>([
    { type: 'push', enabled: true, label: 'Push Notifications', icon: <Bell className="w-4 h-4" /> },
    { type: 'email', enabled: true, label: 'Email Alerts', icon: <Mail className="w-4 h-4" /> },
    { type: 'sms', enabled: false, label: 'SMS Notifications', icon: <Smartphone className="w-4 h-4" /> },
    { type: 'whatsapp', enabled: false, label: 'WhatsApp Updates', icon: <MessageSquare className="w-4 h-4" /> }
  ]);

  const [smartFeatures, setSmartFeatures] = useState({
    predictiveNotifications: true,
    locationBasedAlerts: true,
    scheduleOptimization: true,
    urgencyDetection: true
  });

  const togglePreference = (type: string) => {
    setPreferences(prev => prev.map(pref => 
      pref.type === type ? { ...pref, enabled: !pref.enabled } : pref
    ));
  };

  const toggleSmartFeature = (feature: string) => {
    setSmartFeatures(prev => ({
      ...prev,
      [feature]: !prev[feature as keyof typeof prev]
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Smart Notifications</h3>
          <p className="text-sm text-gray-600">Intelligent alerts powered by AI</p>
        </div>
        <Settings className="w-5 h-5 text-blue-600" />
      </div>

      {/* Notification Channels */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Notification Channels</h4>
        <div className="space-y-3">
          {preferences.map((pref) => (
            <div key={pref.type} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="text-gray-600">{pref.icon}</div>
                <span className="font-medium text-gray-900">{pref.label}</span>
              </div>
              <button
                onClick={() => togglePreference(pref.type)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  pref.enabled ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    pref.enabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Smart Features */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">AI-Powered Features</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
            <div className="flex items-center space-x-3">
              <Zap className="w-4 h-4 text-purple-600" />
              <div>
                <span className="font-medium text-gray-900">Predictive Notifications</span>
                <p className="text-xs text-gray-600">Get notified before faculty becomes available</p>
              </div>
            </div>
            <button
              onClick={() => toggleSmartFeature('predictiveNotifications')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                smartFeatures.predictiveNotifications ? 'bg-purple-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  smartFeatures.predictiveNotifications ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
            <div className="flex items-center space-x-3">
              <Smartphone className="w-4 h-4 text-green-600" />
              <div>
                <span className="font-medium text-gray-900">Location-Based Alerts</span>
                <p className="text-xs text-gray-600">Smart notifications based on your campus location</p>
              </div>
            </div>
            <button
              onClick={() => toggleSmartFeature('locationBasedAlerts')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                smartFeatures.locationBasedAlerts ? 'bg-green-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  smartFeatures.locationBasedAlerts ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Recent Smart Notifications */}
      <div>
        <h4 className="font-medium text-gray-900 mb-3">Recent Smart Alerts</h4>
        <div className="space-y-2">
          <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <Zap className="w-4 h-4 text-blue-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-blue-900">Predictive Alert</p>
              <p className="text-xs text-blue-700">Dr. Rajesh Kumar will likely be available in 15 minutes based on his pattern</p>
            </div>
          </div>
          <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
            <Smartphone className="w-4 h-4 text-green-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-green-900">Location Alert</p>
              <p className="text-xs text-green-700">You're near TT Block - Dr. Priya Sharma is available now in TT-205</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}