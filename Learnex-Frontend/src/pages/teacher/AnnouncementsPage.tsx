import React, { useState } from 'react';
import { Plus, Edit, Trash2, Send, Eye, Calendar, Users, Bell } from 'lucide-react';

interface Announcement {
  id: number;
  title: string;
  content: string;
  priority: 'low' | 'medium' | 'high';
  targetAudience: 'all' | 'specific';
  targetGroups?: string[];
  publishDate: string;
  status: 'draft' | 'published' | 'scheduled';
  views: number;
  createdAt: string;
}

const AnnouncementsPage = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: 1,
      title: 'Week 5 Assignment Guidelines',
      content: 'Please review the updated guidelines for the React project assignment. The deadline has been extended to February 20th to accommodate the additional requirements.',
      priority: 'high',
      targetAudience: 'all',
      publishDate: '2024-01-20T09:00',
      status: 'published',
      views: 45,
      createdAt: '2024-01-20T08:30'
    },
    {
      id: 2,
      title: 'New Study Materials Available',
      content: 'I have uploaded new study materials for JavaScript advanced concepts. You can find them in the Upload Notes section.',
      priority: 'medium',
      targetAudience: 'specific',
      targetGroups: ['JavaScript Advanced', 'Full Stack Development'],
      publishDate: '2024-01-18T14:00',
      status: 'published',
      views: 32,
      createdAt: '2024-01-18T13:45'
    },
    {
      id: 3,
      title: 'Upcoming Group Study Session',
      content: 'Join us for a collaborative problem-solving session this Friday at 3 PM. We will be working on algorithm challenges.',
      priority: 'medium',
      targetAudience: 'all',
      publishDate: '2024-02-15T15:00',
      status: 'scheduled',
      views: 0,
      createdAt: '2024-01-22T10:00'
    }
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
    targetAudience: 'all' as 'all' | 'specific',
    targetGroups: [] as string[],
    publishDate: '',
    status: 'draft' as 'draft' | 'published' | 'scheduled'
  });

  const availableGroups = [
    'React Development',
    'JavaScript Advanced',
    'Full Stack Development',
    'CSS Mastery',
    'Node.js Backend'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingAnnouncement) {
      setAnnouncements(announcements.map(announcement => 
        announcement.id === editingAnnouncement.id 
          ? { 
              ...announcement, 
              ...formData,
              publishDate: formData.publishDate || new Date().toISOString()
            }
          : announcement
      ));
      setEditingAnnouncement(null);
    } else {
      const newAnnouncement: Announcement = {
        id: Date.now(),
        ...formData,
        publishDate: formData.publishDate || new Date().toISOString(),
        views: 0,
        createdAt: new Date().toISOString()
      };
      setAnnouncements([newAnnouncement, ...announcements]);
    }
    
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      priority: 'medium',
      targetAudience: 'all',
      targetGroups: [],
      publishDate: '',
      status: 'draft'
    });
    setShowCreateForm(false);
    setEditingAnnouncement(null);
  };

  const handleEdit = (announcement: Announcement) => {
    setEditingAnnouncement(announcement);
    setFormData({
      title: announcement.title,
      content: announcement.content,
      priority: announcement.priority,
      targetAudience: announcement.targetAudience,
      targetGroups: announcement.targetGroups || [],
      publishDate: announcement.publishDate,
      status: announcement.status
    });
    setShowCreateForm(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this announcement?')) {
      setAnnouncements(announcements.filter(announcement => announcement.id !== id));
    }
  };

  const handlePublish = (id: number) => {
    setAnnouncements(announcements.map(announcement => 
      announcement.id === id 
        ? { ...announcement, status: 'published', publishDate: new Date().toISOString() }
        : announcement
    ));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDateTime = (dateTime: string) => {
    return new Date(dateTime).toLocaleString();
  };

  const handleGroupToggle = (group: string) => {
    setFormData(prev => ({
      ...prev,
      targetGroups: prev.targetGroups.includes(group)
        ? prev.targetGroups.filter(g => g !== group)
        : [...prev.targetGroups, group]
    }));
  };

  return (
    <div className="p-4 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-[#14213D] mb-2">Announcements</h1>
              <p className="text-gray-600">Create and manage important updates for your students</p>
            </div>
            <button
              onClick={() => setShowCreateForm(true)}
              className="bg-[#14213D] text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition-colors flex items-center space-x-2"
            >
              <Plus size={20} />
              <span>New Announcement</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#14213D] mb-1">{announcements.length}</div>
              <div className="text-gray-600 text-sm">Total Announcements</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-1">
                {announcements.filter(a => a.status === 'published').length}
              </div>
              <div className="text-gray-600 text-sm">Published</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">
                {announcements.filter(a => a.status === 'scheduled').length}
              </div>
              <div className="text-gray-600 text-sm">Scheduled</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-1">
                {announcements.reduce((sum, a) => sum + a.views, 0)}
              </div>
              <div className="text-gray-600 text-sm">Total Views</div>
            </div>
          </div>
        </div>

        {/* Create/Edit Form */}
        {showCreateForm && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold text-[#14213D] mb-4">
              {editingAnnouncement ? 'Edit Announcement' : 'Create New Announcement'}
            </h2>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#14213D] focus:border-transparent"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={6}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#14213D] focus:border-transparent"
                  required
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value as 'low' | 'medium' | 'high' })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#14213D] focus:border-transparent"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience</label>
                  <select
                    value={formData.targetAudience}
                    onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value as 'all' | 'specific' })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#14213D] focus:border-transparent"
                  >
                    <option value="all">All Students</option>
                    <option value="specific">Specific Groups</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as 'draft' | 'published' | 'scheduled' })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#14213D] focus:border-transparent"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Publish Now</option>
                    <option value="scheduled">Schedule for Later</option>
                  </select>
                </div>
              </div>

              {formData.targetAudience === 'specific' && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Groups</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {availableGroups.map(group => (
                      <label key={group} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={formData.targetGroups.includes(group)}
                          onChange={() => handleGroupToggle(group)}
                          className="rounded text-[#14213D] focus:ring-[#14213D]"
                        />
                        <span className="text-sm text-gray-700">{group}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {formData.status === 'scheduled' && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Publish Date & Time</label>
                  <input
                    type="datetime-local"
                    value={formData.publishDate}
                    onChange={(e) => setFormData({ ...formData, publishDate: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#14213D] focus:border-transparent"
                    required
                  />
                </div>
              )}

              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="bg-[#14213D] text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition-colors"
                >
                  {editingAnnouncement ? 'Update' : 'Create'} Announcement
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Announcements List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-[#14213D]">All Announcements</h2>
          
          {announcements.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <Bell className="mx-auto mb-4 text-gray-400" size={48} />
              <p className="text-gray-500">No announcements created yet. Create your first announcement to get started!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {announcements.map((announcement) => (
                <div key={announcement.id} className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-[#14213D]">{announcement.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(announcement.priority)}`}>
                          {announcement.priority.charAt(0).toUpperCase() + announcement.priority.slice(1)} Priority
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(announcement.status)}`}>
                          {announcement.status.charAt(0).toUpperCase() + announcement.status.slice(1)}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 mb-3 line-clamp-2">{announcement.content}</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Users size={16} className="mr-1" />
                          <span>
                            {announcement.targetAudience === 'all' 
                              ? 'All Students' 
                              : `${announcement.targetGroups?.length || 0} Groups`
                            }
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Eye size={16} className="mr-1" />
                          <span>{announcement.views} views</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar size={16} className="mr-1" />
                          <span>{formatDateTime(announcement.publishDate)}</span>
                        </div>
                        <div>
                          Created: {formatDateTime(announcement.createdAt)}
                        </div>
                      </div>

                      {announcement.targetGroups && announcement.targetGroups.length > 0 && (
                        <div className="mt-2">
                          <div className="flex flex-wrap gap-1">
                            {announcement.targetGroups.map((group, index) => (
                              <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                                {group}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {announcement.status === 'draft' && (
                        <button
                          onClick={() => handlePublish(announcement.id)}
                          className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-1"
                        >
                          <Send size={14} />
                          <span>Publish</span>
                        </button>
                      )}
                      <button
                        onClick={() => handleEdit(announcement)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(announcement.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={16} />
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

export default AnnouncementsPage;