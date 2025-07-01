import React, { useState, useEffect } from 'react';
import { Calendar, Clock, AlertTriangle, CheckCircle, Plus, Bell, BookOpen } from 'lucide-react';

interface Deadline {
  id: string;
  title: string;
  course: string;
  type: 'assignment' | 'exam' | 'project' | 'quiz' | 'presentation';
  dueDate: string;
  dueTime: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in-progress' | 'completed' | 'overdue';
  description: string;
  estimatedHours: number;
  completedHours: number;
  reminderSet: boolean;
}

export default function AcademicDeadlineTracker() {
  const [deadlines, setDeadlines] = useState<Deadline[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [filter, setFilter] = useState<'all' | 'pending' | 'urgent' | 'today'>('all');
  const [newDeadline, setNewDeadline] = useState<Partial<Deadline>>({
    title: '',
    course: '',
    type: 'assignment',
    dueDate: '',
    dueTime: '',
    priority: 'medium',
    description: '',
    estimatedHours: 1,
    completedHours: 0,
    reminderSet: true
  });

  useEffect(() => {
    // Load sample deadlines
    const sampleDeadlines: Deadline[] = [
      {
        id: '1',
        title: 'Data Structures Assignment 3',
        course: 'CSE2001',
        type: 'assignment',
        dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        dueTime: '23:59',
        priority: 'high',
        status: 'in-progress',
        description: 'Implement binary search tree with all operations',
        estimatedHours: 8,
        completedHours: 3,
        reminderSet: true
      },
      {
        id: '2',
        title: 'Physics Lab Report',
        course: 'PHY1001',
        type: 'assignment',
        dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        dueTime: '17:00',
        priority: 'urgent',
        status: 'pending',
        description: 'Submit lab report on wave interference experiment',
        estimatedHours: 4,
        completedHours: 0,
        reminderSet: true
      },
      {
        id: '3',
        title: 'Database Management Mid-term',
        course: 'CSE3001',
        type: 'exam',
        dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        dueTime: '10:00',
        priority: 'high',
        status: 'pending',
        description: 'Covers SQL, normalization, and transaction management',
        estimatedHours: 15,
        completedHours: 5,
        reminderSet: true
      }
    ];
    setDeadlines(sampleDeadlines);
  }, []);

  const addDeadline = () => {
    if (newDeadline.title && newDeadline.course && newDeadline.dueDate) {
      const deadline: Deadline = {
        id: Date.now().toString(),
        title: newDeadline.title!,
        course: newDeadline.course!,
        type: newDeadline.type!,
        dueDate: newDeadline.dueDate!,
        dueTime: newDeadline.dueTime || '23:59',
        priority: newDeadline.priority!,
        status: 'pending',
        description: newDeadline.description || '',
        estimatedHours: newDeadline.estimatedHours || 1,
        completedHours: 0,
        reminderSet: newDeadline.reminderSet || false
      };
      
      setDeadlines(prev => [...prev, deadline]);
      setNewDeadline({
        title: '',
        course: '',
        type: 'assignment',
        dueDate: '',
        dueTime: '',
        priority: 'medium',
        description: '',
        estimatedHours: 1,
        completedHours: 0,
        reminderSet: true
      });
      setShowAddForm(false);
    }
  };

  const updateDeadlineStatus = (id: string, status: Deadline['status']) => {
    setDeadlines(prev => prev.map(d => d.id === id ? { ...d, status } : d));
  };

  const updateProgress = (id: string, completedHours: number) => {
    setDeadlines(prev => prev.map(d => 
      d.id === id ? { ...d, completedHours: Math.min(completedHours, d.estimatedHours) } : d
    ));
  };

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-red-600 bg-red-100 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-100 border-orange-200';
      case 'medium': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-100 border-green-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'in-progress': return 'text-blue-600 bg-blue-100';
      case 'overdue': return 'text-red-600 bg-red-100';
      case 'pending': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredDeadlines = deadlines.filter(deadline => {
    switch (filter) {
      case 'pending': return deadline.status === 'pending' || deadline.status === 'in-progress';
      case 'urgent': return deadline.priority === 'urgent' || getDaysUntilDue(deadline.dueDate) <= 1;
      case 'today': return getDaysUntilDue(deadline.dueDate) === 0;
      default: return true;
    }
  });

  const upcomingDeadlines = deadlines.filter(d => getDaysUntilDue(d.dueDate) <= 3 && d.status !== 'completed');

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Academic Deadline Tracker</h3>
          <p className="text-sm text-gray-600">Stay on top of your assignments and exams</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Deadline</span>
        </button>
      </div>

      {/* Urgent Alerts */}
      {upcomingDeadlines.length > 0 && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <span className="font-medium text-red-900">Urgent Deadlines</span>
          </div>
          <div className="space-y-1">
            {upcomingDeadlines.slice(0, 3).map(deadline => (
              <div key={deadline.id} className="text-sm text-red-800">
                <span className="font-medium">{deadline.title}</span> - Due in {getDaysUntilDue(deadline.dueDate)} day(s)
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="mb-6">
        <div className="flex space-x-2">
          {[
            { key: 'all', label: 'All' },
            { key: 'pending', label: 'Pending' },
            { key: 'urgent', label: 'Urgent' },
            { key: 'today', label: 'Due Today' }
          ].map(filterOption => (
            <button
              key={filterOption.key}
              onClick={() => setFilter(filterOption.key as any)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                filter === filterOption.key
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {filterOption.label}
            </button>
          ))}
        </div>
      </div>

      {/* Deadlines List */}
      <div className="space-y-4">
        {filteredDeadlines.map(deadline => {
          const daysUntil = getDaysUntilDue(deadline.dueDate);
          const progress = (deadline.completedHours / deadline.estimatedHours) * 100;
          
          return (
            <div key={deadline.id} className={`border rounded-lg p-4 ${getPriorityColor(deadline.priority)}`}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-gray-900">{deadline.title}</h4>
                  <p className="text-sm text-gray-600">{deadline.course} • {deadline.type}</p>
                  <p className="text-sm text-gray-600 mt-1">{deadline.description}</p>
                </div>
                
                <div className="text-right">
                  <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(deadline.status)}`}>
                    {deadline.status}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    {daysUntil === 0 ? 'Due today' : 
                     daysUntil === 1 ? 'Due tomorrow' :
                     daysUntil > 0 ? `${daysUntil} days left` : 
                     `${Math.abs(daysUntil)} days overdue`}
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                  <span>Progress: {deadline.completedHours}/{deadline.estimatedHours} hours</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Calendar className="w-3 h-3" />
                  <span>{new Date(deadline.dueDate).toLocaleDateString()}</span>
                  <Clock className="w-3 h-3" />
                  <span>{deadline.dueTime}</span>
                  {deadline.reminderSet && <Bell className="w-3 h-3 text-blue-600" />}
                </div>
                
                <div className="flex space-x-2">
                  <input
                    type="number"
                    min="0"
                    max={deadline.estimatedHours}
                    value={deadline.completedHours}
                    onChange={(e) => updateProgress(deadline.id, parseInt(e.target.value) || 0)}
                    className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="Hours"
                  />
                  {deadline.status !== 'completed' && (
                    <button
                      onClick={() => updateDeadlineStatus(deadline.id, 'completed')}
                      className="flex items-center space-x-1 px-2 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors"
                    >
                      <CheckCircle className="w-3 h-3" />
                      <span>Complete</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Deadline Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Deadline</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={newDeadline.title || ''}
                  onChange={(e) => setNewDeadline(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Assignment title"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
                  <input
                    type="text"
                    value={newDeadline.course || ''}
                    onChange={(e) => setNewDeadline(prev => ({ ...prev, course: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="CSE2001"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select
                    value={newDeadline.type || 'assignment'}
                    onChange={(e) => setNewDeadline(prev => ({ ...prev, type: e.target.value as any }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="assignment">Assignment</option>
                    <option value="exam">Exam</option>
                    <option value="project">Project</option>
                    <option value="quiz">Quiz</option>
                    <option value="presentation">Presentation</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                  <input
                    type="date"
                    value={newDeadline.dueDate || ''}
                    onChange={(e) => setNewDeadline(prev => ({ ...prev, dueDate: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Due Time</label>
                  <input
                    type="time"
                    value={newDeadline.dueTime || ''}
                    onChange={(e) => setNewDeadline(prev => ({ ...prev, dueTime: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <select
                    value={newDeadline.priority || 'medium'}
                    onChange={(e) => setNewDeadline(prev => ({ ...prev, priority: e.target.value as any }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Est. Hours</label>
                  <input
                    type="number"
                    min="1"
                    value={newDeadline.estimatedHours || 1}
                    onChange={(e) => setNewDeadline(prev => ({ ...prev, estimatedHours: parseInt(e.target.value) || 1 }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newDeadline.description || ''}
                  onChange={(e) => setNewDeadline(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Brief description of the task"
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="reminder"
                  checked={newDeadline.reminderSet || false}
                  onChange={(e) => setNewDeadline(prev => ({ ...prev, reminderSet: e.target.checked }))}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="reminder" className="text-sm text-gray-700">Set reminder notifications</label>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowAddForm(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={addDeadline}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add Deadline
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}