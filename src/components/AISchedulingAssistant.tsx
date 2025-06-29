import React, { useState } from 'react';
import { Brain, Calendar, Clock, Zap, TrendingUp, Users } from 'lucide-react';
import { useFaculty } from '../context/FacultyContext';

export default function AISchedulingAssistant() {
  const { faculties, appointments } = useFaculty();
  const [aiSuggestions, setAiSuggestions] = useState<any[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const generateAISuggestions = () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const suggestions = [
        {
          type: 'optimal_time',
          title: 'Best Meeting Time',
          description: 'Based on historical data, 2:00 PM - 3:00 PM has 95% success rate',
          confidence: 95,
          icon: Clock,
          color: 'text-green-600 bg-green-100'
        },
        {
          type: 'alternative_faculty',
          title: 'Alternative Faculty',
          description: 'Dr. Priya Sharma (ECE) has similar expertise and is available now',
          confidence: 87,
          icon: Users,
          color: 'text-blue-600 bg-blue-100'
        },
        {
          type: 'peak_hours',
          title: 'Avoid Peak Hours',
          description: '11:00 AM - 12:00 PM has high traffic. Consider 3:00 PM instead',
          confidence: 92,
          icon: TrendingUp,
          color: 'text-orange-600 bg-orange-100'
        }
      ];
      
      setAiSuggestions(suggestions);
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-6 border border-purple-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Brain className="w-6 h-6 text-purple-600" />
          <h3 className="text-lg font-semibold text-gray-900">AI Scheduling Assistant</h3>
        </div>
        <button
          onClick={generateAISuggestions}
          disabled={isAnalyzing}
          className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
        >
          <Zap className="w-4 h-4" />
          <span>{isAnalyzing ? 'Analyzing...' : 'Get AI Suggestions'}</span>
        </button>
      </div>

      {isAnalyzing && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-purple-700">AI is analyzing patterns and optimizing your schedule...</p>
        </div>
      )}

      {aiSuggestions.length > 0 && (
        <div className="space-y-3">
          {aiSuggestions.map((suggestion, index) => (
            <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg ${suggestion.color}`}>
                  <suggestion.icon className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-gray-900">{suggestion.title}</h4>
                    <span className="text-xs text-gray-500">{suggestion.confidence}% confidence</span>
                  </div>
                  <p className="text-sm text-gray-600">{suggestion.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}