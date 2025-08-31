import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, ClipboardList, FileCheck, MessageSquare, Users, Bell } from 'lucide-react';

const TeacherDashboardPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: 'Create Exam',
      description: 'Build comprehensive tests and quizzes for assessment',
      icon: FileCheck,
      onClick: () => navigate('/teacher/create-exam'),
      color: 'bg-blue-500'
    },
    {
      title: 'My Exams',
      description: 'View and manage all your created examinations',
      icon: ClipboardList,
      onClick: () => navigate('/teacher/my-exams'),
      color: 'bg-green-500'
    },
    {
      title: 'Upload Notes',
      description: 'Share comprehensive study materials with students',
      icon: FileText,
      onClick: () => navigate('/teacher/upload-notes'),
      color: 'bg-purple-500'
    },
    {
      title: 'Quiz Review',
      description: 'Review student quiz submissions and provide feedback',
      icon: MessageSquare,
      onClick: () => navigate('/teacher/quiz-review'),
      color: 'bg-orange-500'
    },
    {
      title: 'Group Study',
      description: 'Manage group study sessions and collaborations',
      icon: Users,
      onClick: () => navigate('/teacher/group-study'),
      color: 'bg-indigo-500'
    },
    {
      title: 'Announcements',
      description: 'Send important updates and notifications to students',
      icon: Bell,
      onClick: () => navigate('/teacher/announcements'),
      color: 'bg-red-500'
    }
  ];

  const stats = [
    { label: 'Total Exams', value: '12', color: 'text-blue-600' },
    { label: 'Active Students', value: '145', color: 'text-green-600' },
    { label: 'Notes Uploaded', value: '28', color: 'text-purple-600' },
    { label: 'Pending Reviews', value: '7', color: 'text-orange-600' }
  ];

  return (
    <div className="p-4 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-[#14213D] mb-2">Teacher Dashboard</h1>
          <p className="text-gray-600">Welcome back! Manage your educational content and interact with students.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6">
              <div className="text-center">
                <div className={`text-3xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                onClick={feature.onClick}
                className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer border border-gray-100"
              >
                <div className="flex items-center mb-4">
                  <div className="bg-[#14213D] p-3 rounded-lg">
                    <IconComponent className="text-white" size={24} />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-[#14213D] mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* Recent Activity */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-semibold text-[#14213D] mb-4">Recent Activity</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <div>
                <p className="font-medium text-gray-800">New quiz submission from John Doe</p>
                <p className="text-sm text-gray-500">React Fundamentals Quiz - 2 hours ago</p>
              </div>
              <span className="text-sm text-blue-600">Review</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <div>
                <p className="font-medium text-gray-800">Sarah Wilson joined Group Study session</p>
                <p className="text-sm text-gray-500">JavaScript Advanced Topics - 4 hours ago</p>
              </div>
              <span className="text-sm text-green-600">Active</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium text-gray-800">New announcement published</p>
                <p className="text-sm text-gray-500">Week 5 Assignment Guidelines - 1 day ago</p>
              </div>
              <span className="text-sm text-gray-600">Published</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboardPage;