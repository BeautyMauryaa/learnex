import React, { useState } from 'react';
import { Plus, Users, Calendar, Clock, Video, MessageSquare, Settings } from 'lucide-react';

interface StudyGroup {
  id: number;
  title: string;
  description: string;
  subject: string;
  maxParticipants: number;
  currentParticipants: number;
  scheduledDate: string;
  duration: number;
  status: 'scheduled' | 'active' | 'completed';
  meetingLink?: string;
  participants: string[];
}

const GroupStudyPage = () => {
  const [studyGroups, setStudyGroups] = useState<StudyGroup[]>([
    {
      id: 1,
      title: 'React Hooks Deep Dive',
      description: 'Advanced discussion on React hooks including custom hooks and performance optimization',
      subject: 'React Development',
      maxParticipants: 15,
      currentParticipants: 12,
      scheduledDate: '2024-02-15T15:00',
      duration: 90,
      status: 'scheduled',
      meetingLink: 'https://meet.example.com/react-hooks',
      participants: ['John Doe', 'Sarah Wilson', 'Mike Johnson', 'Emily Davis']
    },
    {
      id: 2,
      title: 'JavaScript Problem Solving',
      description: 'Collaborative problem-solving session for algorithm challenges',
      subject: 'JavaScript',
      maxParticipants: 20,
      currentParticipants: 18,
      scheduledDate: '2024-02-12T14:00',
      duration: 120,
      status: 'active',
      meetingLink: 'https://meet.example.com/js-problems',
      participants: ['Alice Brown', 'Bob Smith', 'Carol White']
    },
    {
      id: 3,
      title: 'CSS Grid Layout Workshop',
      description: 'Hands-on workshop building responsive layouts with CSS Grid',
      subject: 'CSS',
      maxParticipants: 12,
      currentParticipants: 10,
      scheduledDate: '2024-02-08T16:30',
      duration: 60,
      status: 'completed',
      participants: ['David Lee', 'Grace Kim', 'Henry Chen']
    }
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subject: '',
    maxParticipants: 15,
    scheduledDate: '',
    duration: 60
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newGroup: StudyGroup = {
      id: Date.now(),
      ...formData,
      currentParticipants: 0,
      status: 'scheduled',
      participants: []
    };
    
    setStudyGroups([newGroup, ...studyGroups]);
    setFormData({
      title: '',
      description: '',
      subject: '',
      maxParticipants: 15,
      scheduledDate: '',
      duration: 60
    });
    setShowCreateForm(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDateTime = (dateTime: string) => {
    return new Date(dateTime).toLocaleString();
  };

  const subjects = ['React Development', 'JavaScript', 'CSS', 'HTML', 'Node.js', 'Database', 'Other'];

  return (
    <div className="p-4 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-[#14213D] mb-2">Group Study Sessions</h1>
              <p className="text-gray-600">Create and manage collaborative learning sessions</p>
            </div>
            <button
              onClick={() => setShowCreateForm(true)}
              className="bg-[#14213D] text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition-colors flex items-center space-x-2"
            >
              <Plus size={20} />
              <span>Create Session</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#14213D] mb-1">{studyGroups.length}</div>
              <div className="text-gray-600 text-sm">Total Sessions</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">
                {studyGroups.filter(g => g.status === 'scheduled').length}
              </div>
              <div className="text-gray-600 text-sm">Scheduled</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-1">
                {studyGroups.filter(g => g.status === 'active').length}
              </div>
              <div className="text-gray-600 text-sm">Active Now</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-1">
                {studyGroups.reduce((sum, group) => sum + group.currentParticipants, 0)}
              </div>
              <div className="text-gray-600 text-sm">Total Participants</div>
            </div>
          </div>
        </div>

        {/* Create Form */}
        {showCreateForm && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold text-[#14213D] mb-4">Create New Study Session</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Session Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#14213D] focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#14213D] focus:border-transparent"
                    required
                  >
                    <option value="">Select Subject</option>
                    {subjects.map(subject => (
                      <option key={subject} value={subject}>{subject}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#14213D] focus:border-transparent"
                  required
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Max Participants</label>
                  <input
                    type="number"
                    value={formData.maxParticipants}
                    onChange={(e) => setFormData({ ...formData, maxParticipants: parseInt(e.target.value) })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#14213D] focus:border-transparent"
                    min="5"
                    max="50"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Scheduled Date & Time</label>
                  <input
                    type="datetime-local"
                    value={formData.scheduledDate}
                    onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#14213D] focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duration (minutes)</label>
                  <input
                    type="number"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#14213D] focus:border-transparent"
                    min="30"
                    max="180"
                    step="15"
                    required
                  />
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="bg-[#14213D] text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition-colors"
                >
                  Create Session
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Study Groups List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-[#14213D]">Study Sessions</h2>
          
          {studyGroups.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <Users className="mx-auto mb-4 text-gray-400" size={48} />
              <p className="text-gray-500">No study sessions created yet. Create your first session to get started!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {studyGroups.map((group) => (
                <div key={group.id} className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-[#14213D]">{group.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(group.status)}`}>
                          {group.status.charAt(0).toUpperCase() + group.status.slice(1)}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-3">{group.description}</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center">
                          <Users size={16} className="mr-1" />
                          <span>{group.currentParticipants}/{group.maxParticipants} participants</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar size={16} className="mr-1" />
                          <span>{formatDateTime(group.scheduledDate)}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock size={16} className="mr-1" />
                          <span>{group.duration} minutes</span>
                        </div>
                        <div>
                          <span className="bg-gray-100 px-2 py-1 rounded text-xs">
                            {group.subject}
                          </span>
                        </div>
                      </div>

                      {group.participants.length > 0 && (
                        <div className="mb-3">
                          <p className="text-sm text-gray-600 mb-1">Recent Participants:</p>
                          <div className="flex flex-wrap gap-1">
                            {group.participants.slice(0, 3).map((participant, index) => (
                              <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                                {participant}
                              </span>
                            ))}
                            {group.participants.length > 3 && (
                              <span className="text-xs text-gray-500">
                                +{group.participants.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {group.status === 'active' && group.meetingLink && (
                        <a
                          href={group.meetingLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                        >
                          <Video size={16} />
                          <span>Join</span>
                        </a>
                      )}
                      {group.status === 'scheduled' && (
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                          Start Session
                        </button>
                      )}
                      <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                        <MessageSquare size={16} />
                      </button>
                      <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                        <Settings size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GroupStudyPage;