import React, { useState, useEffect } from 'react';
import { Heart, Brain, Activity, Moon, Coffee, BookOpen, TrendingUp, AlertCircle } from 'lucide-react';

interface WellnessData {
  date: string;
  stress: number;
  sleep: number;
  study: number;
  social: number;
  exercise: number;
  mood: number;
}

interface WellnessInsight {
  type: 'warning' | 'tip' | 'achievement';
  message: string;
  action?: string;
}

export default function StudentWellnessTracker() {
  const [currentData, setCurrentData] = useState<WellnessData>({
    date: new Date().toISOString().split('T')[0],
    stress: 5,
    sleep: 7,
    study: 6,
    social: 5,
    exercise: 3,
    mood: 6
  });

  const [weeklyData, setWeeklyData] = useState<WellnessData[]>([]);
  const [insights, setInsights] = useState<WellnessInsight[]>([]);

  useEffect(() => {
    // Generate sample weekly data
    const generateWeeklyData = () => {
      const data: WellnessData[] = [];
      for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        data.push({
          date: date.toISOString().split('T')[0],
          stress: Math.floor(Math.random() * 5) + 3,
          sleep: Math.floor(Math.random() * 4) + 5,
          study: Math.floor(Math.random() * 5) + 4,
          social: Math.floor(Math.random() * 4) + 3,
          exercise: Math.floor(Math.random() * 3) + 2,
          mood: Math.floor(Math.random() * 4) + 5
        });
      }
      setWeeklyData(data);
    };

    generateWeeklyData();
  }, []);

  useEffect(() => {
    // Generate insights based on current data
    const generateInsights = () => {
      const newInsights: WellnessInsight[] = [];

      if (currentData.stress >= 8) {
        newInsights.push({
          type: 'warning',
          message: 'High stress levels detected. Consider taking a break.',
          action: 'Try the 5-minute breathing exercise or contact counseling services.'
        });
      }

      if (currentData.sleep < 6) {
        newInsights.push({
          type: 'warning',
          message: 'Insufficient sleep may affect your academic performance.',
          action: 'Aim for 7-8 hours of sleep tonight.'
        });
      }

      if (currentData.exercise < 3) {
        newInsights.push({
          type: 'tip',
          message: 'Low physical activity. Even a 10-minute walk can boost your mood.',
          action: 'Take a walk around campus or use the gym facilities.'
        });
      }

      if (currentData.study >= 8 && currentData.stress <= 5) {
        newInsights.push({
          type: 'achievement',
          message: 'Great balance between productivity and stress management!',
        });
      }

      setInsights(newInsights);
    };

    generateInsights();
  }, [currentData]);

  const updateMetric = (metric: keyof WellnessData, value: number) => {
    setCurrentData(prev => ({ ...prev, [metric]: value }));
  };

  const getMetricColor = (value: number, type: string) => {
    if (type === 'stress') {
      return value <= 3 ? 'text-green-600' : value <= 6 ? 'text-yellow-600' : 'text-red-600';
    }
    return value >= 7 ? 'text-green-600' : value >= 4 ? 'text-yellow-600' : 'text-red-600';
  };

  const getOverallWellness = () => {
    const score = (
      (10 - currentData.stress) + 
      currentData.sleep + 
      currentData.study + 
      currentData.social + 
      currentData.exercise + 
      currentData.mood
    ) / 6;
    return Math.round(score * 10) / 10;
  };

  const wellnessMetrics = [
    { key: 'stress', label: 'Stress Level', icon: AlertCircle, color: 'red', reverse: true },
    { key: 'sleep', label: 'Sleep Quality', icon: Moon, color: 'blue' },
    { key: 'study', label: 'Study Focus', icon: BookOpen, color: 'green' },
    { key: 'social', label: 'Social Connection', icon: Heart, color: 'pink' },
    { key: 'exercise', label: 'Physical Activity', icon: Activity, color: 'orange' },
    { key: 'mood', label: 'Overall Mood', icon: Brain, color: 'purple' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Student Wellness Tracker</h3>
          <p className="text-sm text-gray-600">Monitor your mental and physical well-being</p>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{getOverallWellness()}/10</div>
          <div className="text-xs text-gray-500">Wellness Score</div>
        </div>
      </div>

      {/* Insights */}
      {insights.length > 0 && (
        <div className="mb-6 space-y-2">
          {insights.map((insight, index) => (
            <div key={index} className={`p-3 rounded-lg border ${
              insight.type === 'warning' ? 'bg-red-50 border-red-200' :
              insight.type === 'tip' ? 'bg-blue-50 border-blue-200' :
              'bg-green-50 border-green-200'
            }`}>
              <div className="flex items-start space-x-2">
                <div className={`w-4 h-4 mt-0.5 ${
                  insight.type === 'warning' ? 'text-red-600' :
                  insight.type === 'tip' ? 'text-blue-600' :
                  'text-green-600'
                }`}>
                  {insight.type === 'warning' ? '⚠️' : insight.type === 'tip' ? '💡' : '🎉'}
                </div>
                <div>
                  <p className={`text-sm font-medium ${
                    insight.type === 'warning' ? 'text-red-800' :
                    insight.type === 'tip' ? 'text-blue-800' :
                    'text-green-800'
                  }`}>
                    {insight.message}
                  </p>
                  {insight.action && (
                    <p className={`text-xs mt-1 ${
                      insight.type === 'warning' ? 'text-red-600' :
                      insight.type === 'tip' ? 'text-blue-600' :
                      'text-green-600'
                    }`}>
                      {insight.action}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Wellness Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {wellnessMetrics.map((metric) => {
          const value = currentData[metric.key as keyof WellnessData] as number;
          const IconComponent = metric.icon;
          
          return (
            <div key={metric.key} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <IconComponent className={`w-4 h-4 text-${metric.color}-600`} />
                <span className="text-sm font-medium text-gray-700">{metric.label}</span>
              </div>
              
              <div className="mb-2">
                <span className={`text-lg font-bold ${getMetricColor(value, metric.key)}`}>
                  {value}/10
                </span>
              </div>
              
              <input
                type="range"
                min="1"
                max="10"
                value={value}
                onChange={(e) => updateMetric(metric.key as keyof WellnessData, parseInt(e.target.value))}
                className={`w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-${metric.color}`}
              />
            </div>
          );
        })}
      </div>

      {/* Weekly Trend */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Weekly Wellness Trend</h4>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>7 days ago</span>
            <span>Today</span>
          </div>
          <div className="flex items-end space-x-1 h-20">
            {weeklyData.map((day, index) => {
              const dayScore = getOverallWellness();
              const height = (dayScore / 10) * 100;
              
              return (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-full bg-blue-500 rounded-t"
                    style={{ height: `${height}%` }}
                  ></div>
                  <span className="text-xs text-gray-500 mt-1">
                    {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h4 className="font-medium text-gray-900 mb-3">Wellness Resources</h4>
        <div className="grid grid-cols-2 gap-3">
          <button className="flex items-center space-x-2 p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
            <Brain className="w-4 h-4" />
            <span className="text-sm">Meditation Guide</span>
          </button>
          <button className="flex items-center space-x-2 p-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
            <Activity className="w-4 h-4" />
            <span className="text-sm">Exercise Tips</span>
          </button>
          <button className="flex items-center space-x-2 p-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors">
            <Heart className="w-4 h-4" />
            <span className="text-sm">Counseling Services</span>
          </button>
          <button className="flex items-center space-x-2 p-3 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors">
            <Coffee className="w-4 h-4" />
            <span className="text-sm">Study Tips</span>
          </button>
        </div>
      </div>
    </div>
  );
}