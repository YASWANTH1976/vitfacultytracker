import React, { useState, useEffect } from 'react';
import { Wifi, Thermometer, Users, Lightbulb, Volume2, Battery } from 'lucide-react';

interface IoTSensor {
  id: string;
  type: 'occupancy' | 'temperature' | 'light' | 'sound' | 'door';
  location: string;
  value: number;
  unit: string;
  status: 'online' | 'offline';
  lastUpdate: string;
}

export default function IoTIntegration() {
  const [sensors, setSensors] = useState<IoTSensor[]>([
    {
      id: 'occ_tt101',
      type: 'occupancy',
      location: 'TT-101',
      value: 1,
      unit: 'person',
      status: 'online',
      lastUpdate: new Date().toISOString()
    },
    {
      id: 'temp_tt101',
      type: 'temperature',
      location: 'TT-101',
      value: 24,
      unit: '°C',
      status: 'online',
      lastUpdate: new Date().toISOString()
    },
    {
      id: 'light_tt101',
      type: 'light',
      location: 'TT-101',
      value: 85,
      unit: '%',
      status: 'online',
      lastUpdate: new Date().toISOString()
    },
    {
      id: 'sound_tt101',
      type: 'sound',
      location: 'TT-101',
      value: 45,
      unit: 'dB',
      status: 'online',
      lastUpdate: new Date().toISOString()
    }
  ]);

  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    // Simulate real-time IoT data updates
    const interval = setInterval(() => {
      setSensors(prev => prev.map(sensor => ({
        ...sensor,
        value: sensor.type === 'occupancy' ? Math.floor(Math.random() * 3) :
               sensor.type === 'temperature' ? 20 + Math.random() * 10 :
               sensor.type === 'light' ? Math.floor(Math.random() * 100) :
               30 + Math.random() * 40,
        lastUpdate: new Date().toISOString()
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getSensorIcon = (type: string) => {
    switch (type) {
      case 'occupancy': return <Users className="w-4 h-4" />;
      case 'temperature': return <Thermometer className="w-4 h-4" />;
      case 'light': return <Lightbulb className="w-4 h-4" />;
      case 'sound': return <Volume2 className="w-4 h-4" />;
      default: return <Battery className="w-4 h-4" />;
    }
  };

  const getSensorColor = (type: string, value: number) => {
    switch (type) {
      case 'occupancy':
        return value > 0 ? 'text-red-600 bg-red-100' : 'text-green-600 bg-green-100';
      case 'temperature':
        return value > 26 ? 'text-orange-600 bg-orange-100' : 'text-blue-600 bg-blue-100';
      case 'light':
        return value > 70 ? 'text-yellow-600 bg-yellow-100' : 'text-gray-600 bg-gray-100';
      case 'sound':
        return value > 60 ? 'text-red-600 bg-red-100' : 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getSmartInsight = () => {
    const occupancySensor = sensors.find(s => s.type === 'occupancy');
    const tempSensor = sensors.find(s => s.type === 'temperature');
    const lightSensor = sensors.find(s => s.type === 'light');
    
    if (occupancySensor?.value === 0 && lightSensor?.value < 30) {
      return {
        type: 'info',
        message: 'Faculty appears to be away - lights are off and no occupancy detected'
      };
    }
    
    if (tempSensor?.value > 26) {
      return {
        type: 'warning',
        message: 'Room temperature is high - faculty might be uncomfortable'
      };
    }
    
    if (occupancySensor?.value > 1) {
      return {
        type: 'busy',
        message: 'Multiple people detected - faculty might be in a meeting'
      };
    }
    
    return {
      type: 'available',
      message: 'Optimal conditions detected - faculty likely available'
    };
  };

  const insight = getSmartInsight();

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Wifi className={`w-5 h-5 ${isConnected ? 'text-green-600' : 'text-red-600'}`} />
          <h3 className="text-lg font-semibold text-gray-900">IoT Smart Sensors</h3>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          isConnected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {isConnected ? 'Connected' : 'Disconnected'}
        </span>
      </div>

      {/* Smart Insight */}
      <div className={`p-4 rounded-lg mb-6 ${
        insight.type === 'available' ? 'bg-green-50 border border-green-200' :
        insight.type === 'busy' ? 'bg-red-50 border border-red-200' :
        insight.type === 'warning' ? 'bg-orange-50 border border-orange-200' :
        'bg-blue-50 border border-blue-200'
      }`}>
        <h4 className={`font-medium mb-1 ${
          insight.type === 'available' ? 'text-green-900' :
          insight.type === 'busy' ? 'text-red-900' :
          insight.type === 'warning' ? 'text-orange-900' :
          'text-blue-900'
        }`}>
          AI Smart Insight
        </h4>
        <p className={`text-sm ${
          insight.type === 'available' ? 'text-green-700' :
          insight.type === 'busy' ? 'text-red-700' :
          insight.type === 'warning' ? 'text-orange-700' :
          'text-blue-700'
        }`}>
          {insight.message}
        </p>
      </div>

      {/* Sensor Grid */}
      <div className="grid grid-cols-2 gap-4">
        {sensors.map((sensor) => (
          <div key={sensor.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className={`p-2 rounded-lg ${getSensorColor(sensor.type, sensor.value)}`}>
                {getSensorIcon(sensor.type)}
              </div>
              <span className={`w-2 h-2 rounded-full ${
                sensor.status === 'online' ? 'bg-green-500' : 'bg-red-500'
              }`}></span>
            </div>
            
            <h4 className="font-medium text-gray-900 capitalize mb-1">
              {sensor.type}
            </h4>
            
            <div className="flex items-baseline space-x-1">
              <span className="text-2xl font-bold text-gray-900">{sensor.value}</span>
              <span className="text-sm text-gray-500">{sensor.unit}</span>
            </div>
            
            <p className="text-xs text-gray-500 mt-2">
              {sensor.location} • {new Date(sensor.lastUpdate).toLocaleTimeString()}
            </p>
          </div>
        ))}
      </div>

      {/* Historical Data */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium text-gray-900 mb-2">Today's Patterns</h4>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Peak Occupancy:</span>
            <span className="font-medium text-gray-900 ml-2">11:00 AM</span>
          </div>
          <div>
            <span className="text-gray-600">Avg Temperature:</span>
            <span className="font-medium text-gray-900 ml-2">23.5°C</span>
          </div>
          <div>
            <span className="text-gray-600">Availability:</span>
            <span className="font-medium text-gray-900 ml-2">78%</span>
          </div>
        </div>
      </div>
    </div>
  );
}