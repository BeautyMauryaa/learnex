import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Target, 
  Star, 
  TrendingUp, 
  ChevronDown, 
  ChevronUp, 
  Award, 
  Calendar
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../components/Button';

const API_BASE = import.meta.env.VITE_API_URL;

interface ExamResult {
  exam: {
    name: string;
    totalMarks: number;
    date: string;
  };
  score: number;
  grade: string;
  visible: boolean;
  answers: {
    questionId: number;
    givenAnswer: string;
    isCorrect: boolean;
    obtainedMarks: number;
  }[];
  createdAt: string;
}

const GradeCard: React.FC<{ result: ExamResult; index: number }> = ({ result, index }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  
  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A': return 'bg-green-100 text-green-800 border-green-200';
      case 'B': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'C': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'D':
      case 'F': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  
  const getStatusColor = (score: number, totalMarks: number) => {
    const percentage = (score / totalMarks) * 100;
    return percentage >= 60 ? 'text-green-600' : 'text-red-600';
  };
  
  const percentage = Math.round((result.score / result.exam.totalMarks) * 100);
  const isPassed = percentage >= 60;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-lg font-semibold text-gray-900">{result.exam.name}</h3>
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getGradeColor(result.grade)}`}>
                Grade {result.grade}
              </span>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center">
                <Award className="h-4 w-4 mr-1" />
                <span className="font-medium">{result.score}/{result.exam.totalMarks}</span>
              </div>
              <div className="flex items-center">
                <span className={`font-medium ${getStatusColor(result.score, result.exam.totalMarks)}`}>
                  {isPassed ? 'Passed' : 'Failed'}
                </span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{new Date(result.exam.date).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
          >
            <span className="text-sm font-medium">
              {isExpanded ? 'Close Details' : 'View Details'}
            </span>
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
        </div>
      </div>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-gray-200 overflow-hidden"
          >
            <div className="p-6">
              {result.visible ? (
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Score Percentage</span>
                      <span>{percentage}%</span>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className={`h-full rounded-full ${
                          percentage >= 80 ? 'bg-green-500' :
                          percentage >= 60 ? 'bg-blue-500' :
                          percentage >= 40 ? 'bg-orange-500' : 'bg-red-500'
                        }`}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Exam Date:</span>
                      <span className="ml-2 font-medium text-gray-900">{new Date(result.exam.date).toLocaleDateString()}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Published Date:</span>
                      <span className="ml-2 font-medium text-gray-900">{new Date(result.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  {result.answers.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4">Question-wise Performance</h4>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Question No.</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Your Answer</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Result</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Marks</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {result.answers.map((answer) => (
                              <tr key={answer.questionId} className="hover:bg-gray-50">
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">Q{answer.questionId}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{answer.givenAnswer}</td>
                                <td className="px-4 py-3 whitespace-nowrap">
                                  <span className={`inline-flex items-center text-sm font-medium ${answer.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                                    {answer.isCorrect ? '✔️' : '❌'}
                                    <span className="ml-1">{answer.isCorrect ? 'Correct' : 'Incorrect'}</span>
                                  </span>
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{answer.obtainedMarks}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertCircle className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="text-gray-600 italic">This result is currently hidden by your teacher.</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const DashboardPage: React.FC = () => {
  const [studentName] = useState(() => {
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    return userData?.name || "Student";
  });

  // Real data states
  const [gradesData, setGradesData] = useState<ExamResult[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  // Static UI configurations
  const upcomingExams = [
    { subject: 'Mathematics', date: '2026-06-15', type: 'Mid-term', color: 'bg-blue-100 text-blue-800' },
    { subject: 'Physics', date: '2026-06-18', type: 'Quiz', color: 'bg-purple-100 text-purple-800' },
    { subject: 'Chemistry', date: '2026-06-20', type: 'Final', color: 'bg-green-100 text-green-800' },
  ];

  const recentActivities = [
    { type: 'Quiz Completed', subject: 'Biology', val: '85%', date: '2 hours ago', icon: CheckCircle },
    { type: 'Notes Created', subject: 'Chemistry', val: 'Organic', date: '5 hours ago', icon: BookOpen },
    { type: 'Study Session', val: '2 hours', subject: 'Physics', date: 'Yesterday', icon: Clock },
  ];

  const quickActions = [
    { title: 'Start Quiz', icon: Target, color: 'bg-indigo-100 text-indigo-800' },
    { title: 'Create Notes', icon: BookOpen, color: 'bg-green-100 text-green-800' },
    { title: 'Join Group', icon: Star, color: 'bg-purple-100 text-purple-800' },
  ];

  // Fetch real exam data from Backend
 // Replace the useEffect block inside your DashboardPage component with this:
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError("No authentication token found. Please sign in again.");
          setLoading(false);
          return;
        }

        const response = await fetch(`${API_BASE}/api/student/grades`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        // 1. First check if the response is actually valid JSON text to avoid HTML parser crashes
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error(`Server did not return JSON. (Status: ${response.status} ${response.statusText})`);
        }

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load grade statistics.");
        }

        setGradesData(data.results || data);
      } catch (err: any) {
        console.error("Dashboard Fetch Error:", err);
        
        // Provide clear, actionable debugging info directly on screen
        if (err.message.includes("Server did not return JSON")) {
          setError(`${err.message}. Please verify that the endpoint GET ${API_BASE}/api/student/grades is configured correctly in your backend code.`);
        } else {
          setError(err.message || "Something went wrong while fetching data.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-indigo-600 font-medium">
        Loading your dashboard data...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 max-w-md mx-auto my-12 bg-red-50 border border-red-200 rounded-xl text-center">
        <AlertCircle className="h-10 w-10 text-red-500 mx-auto mb-3" />
        <p className="text-red-700 font-medium">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Welcome Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Hi, {studentName}! Ready to conquer exams? 🚀
        </h1>
        <p className="text-gray-600">Here's your study progress and upcoming tasks</p>
      </motion.div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {quickActions.map((action, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.03 }}
            className={`${action.color} p-4 rounded-xl cursor-pointer shadow-sm`}
          >
            <div className="flex items-center">
              <action.icon className="h-6 w-6 mr-3" />
              <span className="font-medium">{action.title}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
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
        </div>

        <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
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
        </div>

        <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
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
        </div>

        <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
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
        </div>
      </div>

      {/* Main Tables Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Exams */}
        <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Upcoming Exams</h2>
            <Button variant="outline" size="sm">View All</Button>
          </div>
          <div className="space-y-4">
            {upcomingExams.map((exam, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
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
                  <p className="text-sm font-medium text-gray-900">{new Date(exam.date).toLocaleDateString()}</p>
                  <p className="text-xs text-gray-500">Upcoming</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Real Dynamic Grades Section */}
        <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">My Grades & Results</h2>
            <Button variant="outline" size="sm">View All</Button>
          </div>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {gradesData.length > 0 ? (
              gradesData.map((result, index) => (
                <GradeCard key={index} result={result} index={index} />
              ))
            ) : (
              <div className="text-center py-8">
                <Award className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No exam results found on your profile.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Activity Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
            <Button variant="outline" size="sm">View All</Button>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <Icon className="h-5 w-5 text-indigo-600 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">{activity.type}</p>
                      <p className="text-sm text-gray-500">{activity.subject}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{activity.val}</p>
                    <p className="text-xs text-gray-500">{activity.date}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;