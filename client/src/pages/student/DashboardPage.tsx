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
  TrendingUp,
  ChevronDown,
  ChevronUp,
  Award,
  Calendar
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../components/Button';

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

// Mock data for testing
const mockGradesData: ExamResult[] = [
  {
    exam: { name: "Math Midterm", totalMarks: 100, date: "2025-05-12" },
    score: 72,
    grade: "B",
    visible: true,
    answers: [
      { questionId: 1, givenAnswer: "A", isCorrect: true, obtainedMarks: 4 },
      { questionId: 2, givenAnswer: "C", isCorrect: false, obtainedMarks: 0 },
      { questionId: 3, givenAnswer: "B", isCorrect: true, obtainedMarks: 5 },
      { questionId: 4, givenAnswer: "D", isCorrect: true, obtainedMarks: 3 },
      { questionId: 5, givenAnswer: "A", isCorrect: false, obtainedMarks: 0 }
    ],
    createdAt: "2025-05-13"
  },
  {
    exam: { name: "Physics Quiz", totalMarks: 50, date: "2025-05-15" },
    score: 22,
    grade: "D",
    visible: true,
    answers: [
      { questionId: 1, givenAnswer: "B", isCorrect: false, obtainedMarks: 0 },
      { questionId: 2, givenAnswer: "A", isCorrect: true, obtainedMarks: 3 },
      { questionId: 3, givenAnswer: "C", isCorrect: false, obtainedMarks: 0 }
    ],
    createdAt: "2025-05-16"
  },
  {
    exam: { name: "Chemistry Test", totalMarks: 75, date: "2025-05-18" },
    score: 40,
    grade: "C",
    visible: false,
    answers: [],
    createdAt: "2025-05-19"
  }
];

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
      {/* Collapsed Header */}
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
                <span>{result.exam.date}</span>
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
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
      
      {/* Expanded Content */}
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
                  {/* Progress Bar */}
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
                  
                  {/* Exam Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Exam Date:</span>
                      <span className="ml-2 font-medium text-gray-900">{result.exam.date}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Published Date:</span>
                      <span className="ml-2 font-medium text-gray-900">{result.createdAt}</span>
                    </div>
                  </div>
                  
                  {/* Question-wise Details */}
                  {result.answers.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4">Question-wise Performance</h4>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Question No.
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Your Answer
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Result
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Marks
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {result.answers.map((answer) => (
                              <tr key={answer.questionId} className="hover:bg-gray-50">
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                                  Q{answer.questionId}
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                                  {answer.givenAnswer}
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap">
                                  <span className={`inline-flex items-center text-sm font-medium ${
                                    answer.isCorrect ? 'text-green-600' : 'text-red-600'
                                  }`}>
                                    {answer.isCorrect ? '✔️' : '❌'}
                                    <span className="ml-1">
                                      {answer.isCorrect ? 'Correct' : 'Incorrect'}
                                    </span>
                                  </span>
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                                  {answer.obtainedMarks}
                                </td>
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
                  <p className="text-gray-600 italic">
                    This result is currently hidden by your teacher.
                  </p>
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
  const [gradesData] = React.useState<ExamResult[]>(mockGradesData);
  
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

        {/* My Grades & Results */}
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
                <p className="text-gray-500">No exam results available yet</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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