import React, { useState } from 'react';
import { Users, Calendar, Clock, Plus, UserPlus, Share2 } from 'lucide-react';

interface GroupMeeting {
  id: string;
  title: string;
  participants: string[];
  facultyId: string;
  suggestedTimes: string[];
  status: 'planning' | 'scheduled' | 'completed';
}

export default function CollaborativeScheduling() {
  const [groupMeetings, setGroupMeetings] = useState<GroupMeeting[]>([
    {
      id: '1',
      title: 'Project Review Meeting',
      participants: ['You', 'Rahul Sharma', 'Priya Patel'],
      facultyId: '1',
      suggestedTimes: ['2024-01-15 14:00', '2024-01-15 15:00', '2024-01-16 10:00'],
      status: 'planning'
    }
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newMeeting, setNewMeeting] = useState({
    title: '',
    participants: [''],
    facultyId: '',
    purpose: ''
  });

  const addParticipant = () => {
    setNewMeeting(prev => ({
      ...prev,
      participants: [...prev.participants, '']
    }));
  };

  const updateParticipant = (index: number, value: string) => {
    setNewMeeting(prev => ({
      ...prev,
      participants: prev.participants.map((p, i) => i === index ? value : p)
    }));
  };

  const createGroupMeeting = () => {
    const meeting: GroupMeeting = {
      id: Date.now().toString(),
      title: newMeeting.title,
      participants: newMeeting.participants.filter(p => p.trim()),
      facultyId: newMeeting.facultyId,
      suggestedTimes: [],
      status: 'planning'
    };
    
    setGroupMeetings(prev => [...prev, meeting]);
    setShowCreateForm(false);
    setNewMeeting({ title: '', participants: [''], facultyId: '', purpose: '' });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Collaborative Scheduling</h3>
          <p className="text-sm text-gray-600">Coordinate group meetings with faculty</p>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>New Group Meeting</span>
        </button>
      </div>

      {/* Group Meetings List */}
      <div className="space-y-4">
        {groupMeetings.map((meeting) => (
          <div key={meeting.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-gray-900">{meeting.title}</h4>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                meeting.status === 'planning' ? 'bg-yellow-100 text-yellow-800' :
                meeting.status === 'scheduled' ? 'bg-green-100 text-green-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {meeting.status}
              </span>
            </div>
            
            <div className="flex items-center space-x-4 mb-3">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">
                  {meeting.participants.length} participants
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">
                  {meeting.suggestedTimes.length} time slots
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-2 mb-3">
              {meeting.participants.slice(0, 3).map((participant, index) => (
                <div key={index} className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-blue-600">
                    {participant.charAt(0).toUpperCase()}
                  </span>
                </div>
              ))}
              {meeting.participants.length > 3 && (
                <span className="text-xs text-gray-500">+{meeting.participants.length - 3} more</span>
              )}
            </div>

            <div className="flex space-x-2">
              <button className="flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-colors">
                <Clock className="w-3 h-3" />
                <span>Suggest Times</span>
              </button>
              <button className="flex items-center space-x-1 px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200 transition-colors">
                <Share2 className="w-3 h-3" />
                <span>Share</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Group Meeting Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Create Group Meeting</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Meeting Title
                </label>
                <input
                  type="text"
                  value={newMeeting.title}
                  onChange={(e) => setNewMeeting(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Project Review Meeting"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Participants
                </label>
                {newMeeting.participants.map((participant, index) => (
                  <div key={index} className="flex space-x-2 mb-2">
                    <input
                      type="text"
                      value={participant}
                      onChange={(e) => updateParticipant(index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Student name or email"
                    />
                  </div>
                ))}
                <button
                  onClick={addParticipant}
                  className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-sm"
                >
                  <UserPlus className="w-3 h-3" />
                  <span>Add Participant</span>
                </button>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setShowCreateForm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={createGroupMeeting}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create Meeting
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}