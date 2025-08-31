import React, { useState } from 'react';
import { Calendar, Clock, Target, Trophy, ChevronDown, Filter, ArrowRight, TrendingUp, Award, Star } from 'lucide-react';
import Button from '../../components/Button';

interface TestResult {
  id: string;
  date: string;
  testName: string;
  subject: string;
  score: number;
  accuracy: number;
  timeTaken: string;
}

const mockTestResults: TestResult[] = [
  {
    id: '1',
    date: '2024-03-15',
    testName: 'JEE Mains Practice Test 1',
    subject: 'Physics',
    score: 85,
    accuracy: 92,
    timeTaken: '2h 45m'
  },
  {
    id: '2',
    date: '2024-03-12',
    testName: 'Chemistry Mock Test',
    subject: 'Chemistry',
    score: 78,
    accuracy: 85,
    timeTaken: '2h 30m'
  },
  {
    id: '3',
    date: '2024-03-10',
    testName: 'Mathematics Practice',
    subject: 'Mathematics',
    score: 92,
    accuracy: 95,
    timeTaken: '2h 15m'
  }
];

const badges = [
  {
    id: 1,
    title: 'Perfect Score',
    description: 'Achieved 100% in a test',
    icon: Star,
    color: 'bg-yellow-100 text-yellow-800'
  },
  {
    id: 2,
    title: '7-Day Streak',
    description: 'Practiced for 7 days straight',
    icon: TrendingUp,
    color: 'bg-green-100 text-green-800'
  },
  {
    id: 3,
    title: 'Speed Master',
    description: 'Completed test in record time',
    icon: Clock,
    color: 'bg-blue-100 text-blue-800'
  }
];

const motivationalQuotes = [
  "Success is not final, failure is not fatal: it is the courage to continue that counts.",
  "The future depends on what you do today.",
  "Don't watch the clock; do what it does. Keep going."
];

const ProgressPage: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'7days' | '30days' | 'all'>('7days');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  
  // Mock data for the performance graph
  const weeklyData = [65, 72, 68, 85, 78, 90, 88];
  const monthlyData = Array.from({ length: 30 }, () => Math.floor(Math.random() * 30) + 70);
  
  const graphData = timeframe === '7days' ? weeklyData : monthlyData;

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Progress Tracking</h1>
        <p className="text-gray-600">Monitor your learning journey and achievements</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 transform hover:scale-105 transition-transform">
          <div className="flex items-center">
            <div className="p-3 bg-indigo-100 rounded-lg">
              <Target className="h-6 w-6 text-indigo-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Average Score</p>
              <p className="text-2xl font-semibold text-gray-900">85%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 transform hover:scale-105 transition-transform">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <Clock className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Study Time</p>
              <p className="text-2xl font-semibold text-gray-900">24.5h</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 transform hover:scale-105 transition-transform">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Calendar className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Study Streak</p>
              <p className="text-2xl font-semibold text-gray-900">12 days</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 transform hover:scale-105 transition-transform">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Trophy className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Achievements</p>
              <p className="text-2xl font-semibold text-gray-900">8</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Performance Graph */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Performance Overview</h2>
              <div className="flex gap-4">
                <select 
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  value={timeframe}
                  onChange={(e) => setTimeframe(e.target.value as '7days' | '30days' | 'all')}
                >
                  <option value="7days">Last 7 Days</option>
                  <option value="30days">Last 30 Days</option>
                  <option value="all">All Time</option>
                </select>
                <select
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                >
                  <option value="all">All Subjects</option>
                  <option value="physics">Physics</option>
                  <option value="chemistry">Chemistry</option>
                  <option value="mathematics">Mathematics</option>
                </select>
              </div>
            </div>

            <div className="h-64 relative">
              <div className="absolute inset-0 flex items-end justify-between px-4">
                {graphData.map((value, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div 
                      className="w-8 bg-indigo-600 rounded-t transition-all duration-500"
                      style={{ height: `${value}%` }}
                    ></div>
                    <span className="text-xs text-gray-500 mt-2">
                      {timeframe === '7days' 
                        ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]
                        : `W${index + 1}`
                      }
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Test History */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Test History</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Test Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockTestResults.map((result) => (
                    <tr key={result.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{result.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{result.testName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{result.subject}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {result.score}%
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{result.timeTaken}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <Button variant="outline" size="sm">
                          View Details
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Achievements Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Achievements</h2>
            <div className="space-y-4">
              {badges.map((badge) => (
                <div key={badge.id} className="flex items-start p-4 rounded-lg bg-gray-50">
                  <div className={`p-2 rounded-lg ${badge.color} mr-3`}>
                    <badge.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{badge.title}</h3>
                    <p className="text-sm text-gray-600">{badge.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Motivational Quote */}
          <div className="bg-gradient-to-r from-indigo-900 to-purple-900 rounded-xl p-6 text-white">
            <Award className="h-8 w-8 mb-4" />
            <blockquote className="text-lg font-medium mb-4">
              {motivationalQuotes[0]}
            </blockquote>
            <p className="text-indigo-200">Keep pushing forward!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressPage;