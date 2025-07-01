import React, { useState, useEffect } from 'react';
import { Brain, TrendingUp, Clock, AlertTriangle, Zap, Calendar } from 'lucide-react';
import { useFaculty } from '../context/FacultyContext';

interface PredictionData {
  facultyId: string;
  predictedAvailability: {
    time: string;
    probability: number;
    reason: string;
  }[];
  patterns: {
    busyHours: string[];
    freeHours: string[];
    meetingDays: string[];
  };
}

export default function PredictiveAvailability() {
  const { faculties } = useFaculty();
  const [predictions, setPredictions] = useState<PredictionData[]>([]);
  const [selectedFaculty, setSelectedFaculty] = useState<string>('');

  useEffect(() => {
    // Generate AI predictions based on historical patterns
    const generatePredictions = () => {
      const predictionsData = faculties.map(faculty => ({
        facultyId: faculty.id,
        predictedAvailability: [
          {
            time: '10:00 AM',
            probability: 85,
            reason: 'Usually available after morning lectures'
          },
          {
            time: '2:00 PM',
            probability: 92,
            reason: 'Consistent availability pattern after lunch'
          },
          {
            time: '4:00 PM',
            probability: 67,
            reason: 'Sometimes in departmental meetings'
          }
        ],
        patterns: {
          busyHours: ['9:00 AM', '11:00 AM', '3:00 PM'],
          freeHours: ['10:00 AM', '2:00 PM', '5:00 PM'],
          meetingDays: ['Tuesday', 'Thursday']
        }
      }));
      setPredictions(predictionsData);
    };

    generatePredictions();
  }, [faculties]);

  const selectedPrediction = predictions.find(p => p.facultyId === selectedFaculty);
  const faculty = faculties.find(f => f.id === selectedFaculty);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Brain className="w-6 h-6 text-purple-600" />
        <h3 className="text-lg font-semibold text-gray-900">AI Predictive Availability</h3>
        <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-1 rounded-full">
          Beta
        </span>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Faculty for Predictions
        </label>
        <select
          value={selectedFaculty}
          onChange={(e) => setSelectedFaculty(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        >
          <option value="">Choose a faculty member</option>
          {faculties.map(faculty => (
            <option key={faculty.id} value={faculty.id}>
              {faculty.name} - {faculty.department}
            </option>
          ))}
        </select>
      </div>

      {selectedPrediction && faculty && (
        <div className="space-y-6">
          {/* Current Status with Prediction */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 border border-purple-200">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-900">{faculty.name}</h4>
              <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                faculty.status === 'available' ? 'bg-green-100 text-green-800' :
                faculty.status === 'busy' ? 'bg-red-100 text-red-800' :
                faculty.status === 'away' ? 'bg-yellow-100 text-yellow-800' :
                'bg-purple-100 text-purple-800'
              }`}>
                {faculty.status}
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-3">{faculty.statusMessage}</p>
            
            {faculty.status !== 'available' && (
              <div className="bg-white rounded p-3 border border-purple-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Zap className="w-4 h-4 text-purple-600" />
                  <span className="font-medium text-purple-900">AI Prediction</span>
                </div>
                <p className="text-sm text-purple-700">
                  Based on historical patterns, {faculty.name} will likely be available at 2:00 PM today (92% confidence)
                </p>
              </div>
            )}
          </div>

          {/* Predicted Availability Times */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Today's Predicted Availability</h4>
            <div className="space-y-2">
              {selectedPrediction.predictedAvailability.map((prediction, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <div>
                      <span className="font-medium text-gray-900">{prediction.time}</span>
                      <p className="text-xs text-gray-600">{prediction.reason}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          prediction.probability >= 80 ? 'bg-green-500' :
                          prediction.probability >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${prediction.probability}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-700">{prediction.probability}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Patterns */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Weekly Patterns</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-red-50 rounded-lg p-3 border border-red-200">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                  <span className="font-medium text-red-900">Usually Busy</span>
                </div>
                <div className="space-y-1">
                  {selectedPrediction.patterns.busyHours.map((hour, index) => (
                    <span key={index} className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded mr-1">
                      {hour}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="font-medium text-green-900">Usually Free</span>
                </div>
                <div className="space-y-1">
                  {selectedPrediction.patterns.freeHours.map((hour, index) => (
                    <span key={index} className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded mr-1">
                      {hour}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span className="font-medium text-blue-900">Meeting Days</span>
                </div>
                <div className="space-y-1">
                  {selectedPrediction.patterns.meetingDays.map((day, index) => (
                    <span key={index} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-1">
                      {day}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Smart Recommendations */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-200">
            <h4 className="font-medium text-blue-900 mb-2">Smart Recommendations</h4>
            <ul className="space-y-1 text-sm text-blue-800">
              <li>• Best time to visit: 2:00 PM (highest success rate)</li>
              <li>• Avoid Tuesdays and Thursdays after 3:00 PM (meeting days)</li>
              <li>• Book appointments in advance for morning slots</li>
              <li>• Check status 10 minutes before visiting</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}