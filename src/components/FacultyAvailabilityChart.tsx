import React from 'react';
import { BarChart3, TrendingUp, Clock } from 'lucide-react';
import { useFaculty } from '../context/FacultyContext';

export default function FacultyAvailabilityChart() {
  const { faculties } = useFaculty();

  const departmentStats = faculties.reduce((acc, faculty) => {
    const dept = faculty.department;
    if (!acc[dept]) {
      acc[dept] = { total: 0, available: 0 };
    }
    acc[dept].total++;
    if (faculty.status === 'available') {
      acc[dept].available++;
    }
    return acc;
  }, {} as Record<string, { total: number; available: number }>);

  const chartData = Object.entries(departmentStats).map(([dept, stats]) => ({
    department: dept.split(' ')[0], // Shortened name
    fullName: dept,
    total: stats.total,
    available: stats.available,
    percentage: Math.round((stats.available / stats.total) * 100)
  }));

  const maxTotal = Math.max(...chartData.map(d => d.total));

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Department Availability</h3>
          <p className="text-sm text-gray-600">Real-time faculty availability by department</p>
        </div>
        <div className="flex items-center space-x-2 text-blue-600">
          <BarChart3 className="w-5 h-5" />
          <TrendingUp className="w-4 h-4" />
        </div>
      </div>

      <div className="space-y-4">
        {chartData.map((data, index) => (
          <div key={index} className="group">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-sm font-medium text-gray-900" title={data.fullName}>
                  {data.department}
                </p>
                <p className="text-xs text-gray-500">
                  {data.available}/{data.total} available
                </p>
              </div>
              <div className="text-right">
                <span className={`text-sm font-semibold ${
                  data.percentage >= 70 ? 'text-green-600' :
                  data.percentage >= 40 ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {data.percentage}%
                </span>
              </div>
            </div>
            
            <div className="relative">
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gray-400 h-3 rounded-full relative"
                  style={{ width: `${(data.total / maxTotal) * 100}%` }}
                >
                  <div 
                    className={`h-3 rounded-full absolute top-0 left-0 ${
                      data.percentage >= 70 ? 'bg-green-500' :
                      data.percentage >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${(data.available / data.total) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Available</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <span>Total Faculty</span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-3 h-3" />
            <span>Updated {new Date().toLocaleTimeString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}