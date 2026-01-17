import React from 'react';
import { 
  BookOpen, 
  Clock, 
  // Calendar,
  // BarChart2,
  CheckCircle,
  AlertCircle,
  Target,
  Star,
  TrendingUp
} from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../../components/Button';

const DashboardPage: React.FC = () => {
  const upcomingExams = [
    { subject: 'Mathematics', date: '2024-03-15', type: 'Mid-term', status: 'pending', color: 'bg-blue-100 text-blue-800' },
    { subject: 'Physics', date: '2024-03-18', type: 'Quiz', status: 'pending', color: 'bg-purple-100 text-purple-800' },
    { subject: 'Chemistry', date: '2024-03-20', type: 'Final', status: 'pending', color: 'bg-green-100 text-green-800' },
  ];

  const recentActivities = [
    { type: 'Quiz Completed', subject: 'Biology', score: '85%', date: '2 hours ago', icon: CheckCircle },
    { type: 'Notes Created', subject: 'Chemistry', topic: 'Organic Compounds', date: '5 hours ago', icon: BookOpen },
    { type: 'Study Session', duration: '2 hours', subject: 'Physics', date: 'Yesterday', icon: Clock },
  ];

  const quickActions = [
    { title: 'Start Quiz', icon: Target, color: 'bg-indigo-100 text-indigo-800' },
    { title: 'Create Notes', icon: BookOpen, color: 'bg-green-100 text-green-800' },
    { title: 'Join Group', icon: Star, color: 'bg-purple-100 text-purple-800' },
  ];

  const motivationalQuotes = [
    "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    "The future depends on what you do today.",
    "Don't watch the clock; do what it does. Keep going."
  ];

  return (
    <div className="space-y-6 p-6">
      {/* Welcome Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Hi, John! Ready to conquer exams? 🚀
        </h1>
        <p className="text-gray-600">Here's your study progress and upcoming tasks</p>
      </motion.div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {quickActions.map((action, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`${action.color} p-4 rounded-xl cursor-pointer hover:scale-105 transition-transform`}
          >
            <div className="flex items-center">
              <action.icon className="h-6 w-6 mr-3" />
              <span className="font-medium">{action.title}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl shadow p-6 border border-gray-100"
        >
          <div className="flex items-center">
            <div className="p-3 bg-indigo-100 rounded-lg">
              <BookOpen className="h-6 w-6 text-indigo-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Study Time</p>
              <p className="text-2xl font-semibold text-gray-900">7.5 hrs</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-600 rounded-full" style={{ width: '75%' }}></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">75% of weekly goal</p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-white rounded-xl shadow p-6 border border-gray-100"
        >
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <Target className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Quiz Average</p>
              <p className="text-2xl font-semibold text-gray-900">85%</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 rounded-full" style={{ width: '85%' }}></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">Last 7 quizzes</p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="bg-white rounded-xl shadow p-6 border border-gray-100"
        >
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Learning Streak</p>
              <p className="text-2xl font-semibold text-gray-900">12 days</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-xs text-gray-500">
              <span>Current</span>
              <span>Best: 15 days</span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="bg-white rounded-xl shadow p-6 border border-gray-100"
        >
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Star className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">XP Level</p>
              <p className="text-2xl font-semibold text-gray-900">Level 4</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-purple-500 rounded-full" style={{ width: '60%' }}></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">1,240 XP to Level 5</p>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Exams */}
        <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Upcoming Exams</h2>
            <Button variant="outline" size="sm">View All</Button>
          </div>
          <div className="space-y-4">
            {upcomingExams.map((exam, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center">
                  <div className={`p-2 rounded-lg ${exam.color} mr-3`}>
                    <AlertCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{exam.subject}</p>
                    <p className="text-sm text-gray-500">{exam.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{exam.date}</p>
                  <p className="text-xs text-gray-500">Upcoming</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
            <Button variant="outline" size="sm">View All</Button>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center">
                    <Icon className="h-5 w-5 text-indigo-600 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">{activity.type}</p>
                      <p className="text-sm text-gray-500">{activity.subject}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.score || activity.duration || activity.topic}
                    </p>
                    <p className="text-xs text-gray-500">{activity.date}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Motivational Quote */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-r from-indigo-900 to-purple-900 rounded-xl p-8 text-center"
      >
        <blockquote className="text-xl font-medium text-white mb-4">
          {motivationalQuotes[0]}
        </blockquote>
        <p className="text-indigo-200">Keep pushing forward, you're doing great!</p>
      </motion.div>
    </div>
  );
};

export default DashboardPage;