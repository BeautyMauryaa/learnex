import React, { useState, useEffect } from "react";
import { Plus, Users, Calendar, Clock, Video, MessageSquare, Settings } from "lucide-react";
import axios from "axios";

interface StudyGroup {
  _id: string;
  title: string;
  description: string;
  subject: string;
  maxParticipants: number;
  participants: string[];
  scheduledDateTime: string;
  duration: number;
  status: "Scheduled" | "Active" | "Completed";
  meetingLink?: string;
  targetGroups?: string[]; // <-- new property for group assignment
}

const GroupStudyPage = () => {
  const [studyGroups, setStudyGroups] = useState<StudyGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    subject: "",
    maxParticipants: 15,
    scheduledDateTime: "",
    duration: 60,
    targetGroups: [] as string[], // <-- selected groups
  });

  // Static available groups for now
  const availableGroups = [
    "React Development",
    "JavaScript Advanced",
    "Full Stack Development",
    "CSS Mastery",
    "Node.js Backend",
  ];

  // Fetch study sessions from backend
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:5000/api/study-sessions");
        setStudyGroups(res.data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to load sessions");
      } finally {
        setLoading(false);
      }
    };
    fetchSessions();
  }, []);

  // Create new session
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/study-sessions", formData);
      setStudyGroups([res.data, ...studyGroups]);
      setFormData({ title: "", description: "", subject: "", maxParticipants: 15, scheduledDateTime: "", duration: 60, targetGroups: [] });
      setShowCreateForm(false);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to create session");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Scheduled": return "bg-blue-100 text-blue-800";
      case "Active": return "bg-green-100 text-green-800";
      case "Completed": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const formatDateTime = (dateTime: string) => new Date(dateTime).toLocaleString();
  const subjects = ["React Development", "JavaScript", "CSS", "HTML", "Node.js", "Database", "Other"];

  const handleGroupToggle = (group: string) => {
    setFormData(prev => ({
      ...prev,
      targetGroups: prev.targetGroups.includes(group)
        ? prev.targetGroups.filter(g => g !== group)
        : [...prev.targetGroups, group],
    }));
  };

  return (
    <div className="p-4 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-[#14213D] mb-2">Group Study Sessions</h1>
            <p className="text-gray-600">Create and manage collaborative learning sessions</p>
          </div>
          <button onClick={() => setShowCreateForm(true)}
            className="bg-[#14213D] text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition-colors flex items-center space-x-2">
            <Plus size={20} /><span>Create Session</span>
          </button>
        </div>

        {/* Error */}
        {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}

        {/* Create Form */}
        {showCreateForm && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold text-[#14213D] mb-4">Create New Study Session</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Session Title</label>
                  <input type="text" value={formData.title}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                    className="w-full p-3 border rounded-lg" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <select value={formData.subject}
                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full p-3 border rounded-lg" required>
                    <option value="">Select Subject</option>
                    {subjects.map(subject => <option key={subject} value={subject}>{subject}</option>)}
                  </select>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-3 border rounded-lg" required />
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Max Participants</label>
                  <input type="number" value={formData.maxParticipants}
                    onChange={e => setFormData({ ...formData, maxParticipants: Number(e.target.value) })}
                    className="w-full p-3 border rounded-lg" min={5} max={50} required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Scheduled Date & Time</label>
                  <input type="datetime-local" value={formData.scheduledDateTime}
                    onChange={e => setFormData({ ...formData, scheduledDateTime: e.target.value })}
                    className="w-full p-3 border rounded-lg" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duration (minutes)</label>
                  <input type="number" value={formData.duration}
                    onChange={e => setFormData({ ...formData, duration: Number(e.target.value) })}
                    className="w-full p-3 border rounded-lg" min={30} max={180} required />
                </div>
              </div>

              {/* Group Selector */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Assign Groups</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {availableGroups.map(group => (
                    <label key={group} className="flex items-center space-x-2">
                      <input type="checkbox"
                        checked={formData.targetGroups.includes(group)}
                        onChange={() => handleGroupToggle(group)}
                        className="rounded" />
                      <span className="text-sm">{group}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex space-x-3">
                <button type="submit" className="bg-[#14213D] text-white px-6 py-2 rounded-lg">Create Session</button>
                <button type="button" onClick={() => setShowCreateForm(false)} className="bg-gray-500 text-white px-6 py-2 rounded-lg">Cancel</button>
              </div>
            </form>
          </div>
        )}

        {/* Study Groups List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-[#14213D]">Study Sessions</h2>
          {loading ? <p>Loading...</p> :
            studyGroups.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <Users className="mx-auto mb-4 text-gray-400" size={48} />
                <p className="text-gray-500">No study sessions created yet.</p>
              </div>
            ) :
              studyGroups.map(group => (
                <div key={group._id} className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-[#14213D]">{group.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(group.status)}`}>
                          {group.status}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-3">{group.description}</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center"><Users size={16} className="mr-1" /><span>{group.participants.length}/{group.maxParticipants} participants</span></div>
                        <div className="flex items-center"><Calendar size={16} className="mr-1" /><span>{formatDateTime(group.scheduledDateTime)}</span></div>
                        <div className="flex items-center"><Clock size={16} className="mr-1" /><span>{group.duration} minutes</span></div>
                        <div>
                          <span className="bg-gray-100 px-2 py-1 rounded text-xs">{group.subject}</span>
                        </div>
                      </div>
                      {/* Display assigned groups */}
                      {group.targetGroups && group.targetGroups.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-2">
                          {group.targetGroups.map(g => (
                            <span key={g} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">{g}</span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      {group.status === "Active" && group.meetingLink && (
                        <a href={group.meetingLink} target="_blank" rel="noopener noreferrer" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"><Video size={16} /> Join</a>
                      )}
                      {group.status === "Scheduled" && (
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Start Session</button>
                      )}
                      <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg"><MessageSquare size={16} /></button>
                      <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg"><Settings size={16} /></button>
                    </div>
                  </div>
                </div>
              ))
          }
        </div>
      </div>
    </div>
  );
};

export default GroupStudyPage;
