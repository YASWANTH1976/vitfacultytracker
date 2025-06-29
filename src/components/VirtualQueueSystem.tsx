import React, { useState, useEffect } from 'react';
import { Users, Clock, ArrowRight, Bell, CheckCircle } from 'lucide-react';
import { useFaculty } from '../context/FacultyContext';

interface QueueEntry {
  id: string;
  studentName: string;
  purpose: string;
  estimatedTime: number;
  joinedAt: Date;
  position: number;
}

export default function VirtualQueueSystem() {
  const [queue, setQueue] = useState<QueueEntry[]>([]);
  const [isInQueue, setIsInQueue] = useState(false);
  const [estimatedWait, setEstimatedWait] = useState(0);

  useEffect(() => {
    // Simulate queue updates
    const interval = setInterval(() => {
      if (queue.length > 0) {
        setQueue(prev => prev.map((entry, index) => ({
          ...entry,
          position: index + 1
        })));
        
        // Update estimated wait time
        const totalWaitTime = queue.reduce((acc, entry, index) => 
          index === 0 ? acc : acc + entry.estimatedTime, 0
        );
        setEstimatedWait(totalWaitTime);
      }
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [queue]);

  const joinQueue = (facultyId: string, purpose: string) => {
    const newEntry: QueueEntry = {
      id: Date.now().toString(),
      studentName: 'Current User',
      purpose,
      estimatedTime: 10, // 10 minutes estimated
      joinedAt: new Date(),
      position: queue.length + 1
    };
    
    setQueue(prev => [...prev, newEntry]);
    setIsInQueue(true);
  };

  const leaveQueue = () => {
    setQueue(prev => prev.filter(entry => entry.studentName !== 'Current User'));
    setIsInQueue(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Virtual Queue</h3>
          <p className="text-sm text-gray-600">Join the virtual queue and get notified when it's your turn</p>
        </div>
        <Users className="w-5 h-5 text-blue-600" />
      </div>

      {!isInQueue ? (
        <div className="text-center py-6">
          <div className="bg-blue-50 rounded-lg p-6 mb-4">
            <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <h4 className="font-medium text-gray-900 mb-2">Join Virtual Queue</h4>
            <p className="text-sm text-gray-600 mb-4">
              No more waiting outside cabins! Join the virtual queue and we'll notify you when it's your turn.
            </p>
            <button
              onClick={() => joinQueue('1', 'Academic discussion')}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Join Queue
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="font-medium text-green-900">You're in the queue!</span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Position:</span>
                <span className="font-medium text-gray-900 ml-2">#2</span>
              </div>
              <div>
                <span className="text-gray-600">Estimated wait:</span>
                <span className="font-medium text-gray-900 ml-2">15 minutes</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium text-gray-900">Queue Status</h4>
            {[
              { name: 'Rahul Sharma', purpose: 'Project guidance', time: '5 min' },
              { name: 'You', purpose: 'Academic discussion', time: '10 min' },
              { name: 'Priya Patel', purpose: 'Doubt clarification', time: '8 min' }
            ].map((entry, index) => (
              <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${
                entry.name === 'You' ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'
              }`}>
                <div className="flex items-center space-x-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                    entry.name === 'You' ? 'bg-blue-600 text-white' : 'bg-gray-400 text-white'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{entry.name}</p>
                    <p className="text-xs text-gray-600">{entry.purpose}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Clock className="w-3 h-3" />
                  <span>{entry.time}</span>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={leaveQueue}
            className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
          >
            Leave Queue
          </button>
        </div>
      )}
    </div>
  );
}