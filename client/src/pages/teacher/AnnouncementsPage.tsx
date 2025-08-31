// Announcement.tsx
import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Send, Users, Calendar, Eye, Bell } from "lucide-react";
import axios from "axios";

interface Announcement {
  _id?: string;
  title: string;
  content: string;
  priority: 'low' | 'medium' | 'high';
  targetAudience: 'all' | 'specific';
  targetGroups: string[];
  publishDate: string;
  status: 'draft' | 'published' | 'scheduled';
  views?: number;
  createdAt?: string;
}

const AnnouncementsPage = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);
  const [formData, setFormData] = useState<Announcement>({
    title: '',
    content: '',
    priority: 'medium',
    targetAudience: 'all',
    targetGroups: [],
    publishDate: '',
    status: 'draft'
  });

  // Static groups for now
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
      setAnnouncements(announcements.map(a =>
        a._id === editingAnnouncement._id ? { ...a, ...formData } : a
      ));
      setEditingAnnouncement(null);
    } else {
      setAnnouncements([{ ...formData, _id: Date.now().toString(), views: 0, createdAt: new Date().toISOString() }, ...announcements]);
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
    setFormData({ ...announcement });
    setShowCreateForm(true);
  };

  const handleDelete = (id?: string) => {
    if (!id) return;
    if (window.confirm('Are you sure you want to delete this announcement?')) {
      setAnnouncements(announcements.filter(a => a._id !== id));
    }
  };

  const handlePublish = (id?: string) => {
    if (!id) return;
    setAnnouncements(announcements.map(a =>
      a._id === id ? { ...a, status: 'published', publishDate: new Date().toISOString() } : a
    ));
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
    <div className="p-4 lg:p-8 max-w-6xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#14213D] mb-2">Announcements</h1>
          <p className="text-gray-600">Create and manage updates for your students</p>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="bg-[#14213D] text-white px-6 py-3 rounded-lg flex items-center space-x-2"
        >
          <Plus size={20} /> <span>New Announcement</span>
        </button>
      </div>

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
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                className="w-full p-3 border rounded-lg"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
              <textarea
                value={formData.content}
                onChange={e => setFormData({ ...formData, content: e.target.value })}
                rows={6}
                className="w-full p-3 border rounded-lg"
                required
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                <select
                  value={formData.priority}
                  onChange={e => setFormData({ ...formData, priority: e.target.value as 'low' | 'medium' | 'high' })}
                  className="w-full p-3 border rounded-lg"
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
                  onChange={e => setFormData({ ...formData, targetAudience: e.target.value as 'all' | 'specific' })}
                  className="w-full p-3 border rounded-lg"
                >
                  <option value="all">All Students</option>
                  <option value="specific">Specific Groups</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={formData.status}
                  onChange={e => setFormData({ ...formData, status: e.target.value as 'draft' | 'published' | 'scheduled' })}
                  className="w-full p-3 border rounded-lg"
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
                        className="rounded"
                      />
                      <span className="text-sm">{group}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Publish Date & Time</label>
              <input
                type="datetime-local"
                value={formData.publishDate}
                onChange={e => setFormData({ ...formData, publishDate: e.target.value })}
                className="w-full p-3 border rounded-lg"
                required={formData.status === 'scheduled'}
              />
            </div>

            <div className="flex space-x-3">
              <button type="submit" className="bg-[#14213D] text-white px-6 py-2 rounded-lg">
                {editingAnnouncement ? 'Update' : 'Create'} Announcement
              </button>
              <button type="button" onClick={resetForm} className="bg-gray-500 text-white px-6 py-2 rounded-lg">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Announcements List */}
      <div className="space-y-4">
        {announcements.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <Bell className="mx-auto mb-4 text-gray-400" size={48} />
            <p className="text-gray-500">No announcements created yet.</p>
          </div>
        ) : (
          announcements.map(a => (
            <div key={a._id} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-[#14213D]">{a.title}</h3>
                  <p className="text-gray-600 mb-2">{a.content}</p>
                  {a.targetGroups.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {a.targetGroups.map(g => (
                        <span key={g} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">{g}</span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  {a.status === 'draft' && (
                    <button onClick={() => handlePublish(a._id)} className="bg-green-600 text-white px-3 py-2 rounded-lg">
                      <Send size={14} /> Publish
                    </button>
                  )}
                  <button onClick={() => handleEdit(a)} className="p-2 text-blue-600 rounded-lg">
                    <Edit size={16} />
                  </button>
                  <button onClick={() => handleDelete(a._id)} className="p-2 text-red-600 rounded-lg">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AnnouncementsPage;
