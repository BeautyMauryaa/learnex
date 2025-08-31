import React, { useState } from 'react';
import { Edit, Trash2, Eye, Users, Clock, Calendar, Filter, Settings, CheckCircle, XCircle, AlertTriangle, Download, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Toast, { ToastType } from '../../components/Toast';

interface GradeCriteria {
  grade: string;
  minScore: number;
  maxScore: number;
  color: string;
}

interface StudentResult {
  id: number;
  studentName: string;
  email: string;
  score: number;
  grade: string;
  submittedAt: string;
  timeTaken: number;
  status: 'submitted' | 'graded';
}

interface Exam {
  id: number;
  title: string;
  description: string;
  duration: number;
  totalMarks: number;
  questions: number;
  deadline: string;
  status: 'draft' | 'published' | 'completed';
  participants: number;
  createdAt: string;
  gradeCriteria?: GradeCriteria[];
  results?: StudentResult[];
  resultsPublished: boolean;
}

const defaultGradeCriteria: GradeCriteria[] = [
  { grade: 'A+', minScore: 95, maxScore: 100, color: 'bg-green-600' },
  { grade: 'A', minScore: 90, maxScore: 94, color: 'bg-green-500' },
  { grade: 'B+', minScore: 85, maxScore: 89, color: 'bg-blue-500' },
  { grade: 'B', minScore: 80, maxScore: 84, color: 'bg-blue-400' },
  { grade: 'C+', minScore: 75, maxScore: 79, color: 'bg-yellow-500' },
  { grade: 'C', minScore: 70, maxScore: 74, color: 'bg-yellow-400' },
  { grade: 'D', minScore: 60, maxScore: 69, color: 'bg-orange-500' },
  { grade: 'F', minScore: 0, maxScore: 59, color: 'bg-red-500' }
];

const mockStudentResults: StudentResult[] = [
  {
    id: 1,
    studentName: 'John Doe',
    email: 'john.doe@student.edu',
    score: 92,
    grade: 'A',
    submittedAt: '2024-01-20T14:30:00',
    timeTaken: 45,
    status: 'graded'
  },
  {
    id: 2,
    studentName: 'Sarah Wilson',
    email: 'sarah.wilson@student.edu',
    score: 87,
    grade: 'B+',
    submittedAt: '2024-01-20T15:15:00',
    timeTaken: 52,
    status: 'graded'
  },
  {
    id: 3,
    studentName: 'Mike Johnson',
    email: 'mike.johnson@student.edu',
    score: 78,
    grade: 'C+',
    submittedAt: '2024-01-20T16:00:00',
    timeTaken: 38,
    status: 'graded'
  },
  {
    id: 4,
    studentName: 'Emily Davis',
    email: 'emily.davis@student.edu',
    score: 95,
    grade: 'A+',
    submittedAt: '2024-01-20T13:45:00',
    timeTaken: 42,
    status: 'graded'
  },
  {
    id: 5,
    studentName: 'Alex Brown',
    email: 'alex.brown@student.edu',
    score: 65,
    grade: 'D',
    submittedAt: '2024-01-20T17:20:00',
    timeTaken: 55,
    status: 'graded'
  }
];

const MyExamsPage = () => {
  const [exams, setExams] = useState<Exam[]>([
    {
      id: 1,
      title: 'React Fundamentals Quiz',
      description: 'Basic concepts of React including components, props, and state',
      duration: 60,
      totalMarks: 50,
      questions: 20,
      deadline: '2024-02-15T10:00',
      status: 'published',
      participants: 25,
      createdAt: '2024-01-20',
      gradeCriteria: defaultGradeCriteria,
      results: mockStudentResults,
      resultsPublished: false
    },
    {
      id: 2,
      title: 'JavaScript Advanced Concepts',
      description: 'Advanced JavaScript topics including closures, promises, and async/await',
      duration: 90,
      totalMarks: 75,
      questions: 15,
      deadline: '2024-02-20T14:00',
      status: 'draft',
      participants: 0,
      createdAt: '2024-01-22',
      gradeCriteria: defaultGradeCriteria,
      results: [],
      resultsPublished: false
    },
    {
      id: 3,
      title: 'CSS Grid and Flexbox',
      description: 'Modern CSS layout techniques',
      duration: 45,
      totalMarks: 30,
      questions: 12,
      deadline: '2024-01-25T16:00',
      status: 'completed',
      participants: 18,
      createdAt: '2024-01-10',
      gradeCriteria: defaultGradeCriteria,
      results: mockStudentResults.slice(0, 3),
      resultsPublished: true
    }
  ]);

  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('createdAt');
  const [expandedExam, setExpandedExam] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<{ [key: number]: 'details' | 'results' | 'grading' }>({});
  const [editingGrades, setEditingGrades] = useState<number | null>(null);
  const [showPublishConfirm, setShowPublishConfirm] = useState<number | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<ToastType>('success');

  const filteredExams = exams
    .filter(exam => filterStatus === 'all' || exam.status === filterStatus)
    .sort((a, b) => {
      if (sortBy === 'createdAt') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else if (sortBy === 'deadline') {
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      } else if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const calculateGrade = (score: number, totalMarks: number, gradeCriteria: GradeCriteria[]): string => {
    const percentage = (score / totalMarks) * 100;
    const grade = gradeCriteria.find(criteria => 
      percentage >= criteria.minScore && percentage <= criteria.maxScore
    );
    return grade?.grade || 'F';
  };

  const getGradeColor = (grade: string, gradeCriteria: GradeCriteria[]): string => {
    const gradeInfo = gradeCriteria.find(criteria => criteria.grade === grade);
    return gradeInfo?.color || 'bg-gray-500';
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this exam?')) {
      setExams(exams.filter(exam => exam.id !== id));
      setShowToast(true);
      setToastMessage('Exam deleted successfully!');
      setToastType('success');
    }
  };

  const handlePublish = (id: number) => {
    setExams(exams.map(exam => 
      exam.id === id ? { ...exam, status: 'published' as const } : exam
    ));
    setShowToast(true);
    setToastMessage('Exam published successfully!');
    setToastType('success');
  };

  const handlePublishResults = (examId: number) => {
    setExams(exams.map(exam => 
      exam.id === examId ? { ...exam, resultsPublished: true } : exam
    ));
    setShowPublishConfirm(null);
    setShowToast(true);
    setToastMessage('Results published successfully! Students can now view their grades.');
    setToastType('success');
  };

  const handleUnpublishResults = (examId: number) => {
    setExams(exams.map(exam => 
      exam.id === examId ? { ...exam, resultsPublished: false } : exam
    ));
    setShowToast(true);
    setToastMessage('Results unpublished. Students can no longer view their grades.');
    setToastType('info');
  };

  const updateGradeCriteria = (examId: number, newCriteria: GradeCriteria[]) => {
    setExams(exams.map(exam => {
      if (exam.id === examId) {
        const updatedResults = exam.results?.map(result => ({
          ...result,
          grade: calculateGrade(result.score, exam.totalMarks, newCriteria)
        }));
        return { ...exam, gradeCriteria: newCriteria, results: updatedResults };
      }
      return exam;
    }));
  };

  const handleTabChange = (examId: number, tab: 'details' | 'results' | 'grading') => {
    setActiveTab(prev => ({ ...prev, [examId]: tab }));
  };

  const toggleExamExpansion = (examId: number) => {
    if (expandedExam === examId) {
      setExpandedExam(null);
      setActiveTab(prev => ({ ...prev, [examId]: 'details' }));
    } else {
      setExpandedExam(examId);
      setActiveTab(prev => ({ ...prev, [examId]: 'details' }));
    }
  };

  const formatDateTime = (dateTime: string) => {
    return new Date(dateTime).toLocaleString();
  };

  const getResultsStats = (results: StudentResult[]) => {
    const gradeDistribution = results.reduce((acc, result) => {
      acc[result.grade] = (acc[result.grade] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    const averageScore = results.length > 0 
      ? Math.round(results.reduce((sum, result) => sum + result.score, 0) / results.length)
      : 0;

    return { gradeDistribution, averageScore };
  };

  return (
    <div className="p-4 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-[#14213D] mb-2">My Exams</h1>
          <p className="text-gray-600">Manage all your created examinations and student results</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#14213D] mb-1">{exams.length}</div>
              <div className="text-gray-600 text-sm">Total Exams</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-1">
                {exams.filter(e => e.status === 'published').length}
              </div>
              <div className="text-gray-600 text-sm">Published</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">
                {exams.filter(e => e.resultsPublished).length}
              </div>
              <div className="text-gray-600 text-sm">Results Published</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-1">
                {exams.reduce((sum, exam) => sum + exam.participants, 0)}
              </div>
              <div className="text-gray-600 text-sm">Total Participants</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter size={20} className="text-gray-600" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#14213D] focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#14213D] focus:border-transparent"
              >
                <option value="createdAt">Sort by Created Date</option>
                <option value="deadline">Sort by Deadline</option>
                <option value="title">Sort by Title</option>
              </select>
            </div>
          </div>
        </div>

        {/* Exams List */}
        <div className="space-y-6">
          {filteredExams.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <p className="text-gray-500">No exams found matching your criteria.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredExams.map((exam) => {
                const currentTab = activeTab[exam.id] || 'details';
                const resultsStats = exam.results ? getResultsStats(exam.results) : null;
                
                return (
                  <motion.div 
                    key={exam.id} 
                    layout
                    className="bg-white rounded-lg shadow-sm border border-gray-200"
                  >
                    {/* Exam Header */}
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-xl font-semibold text-[#14213D]">{exam.title}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(exam.status)}`}>
                              {exam.status.charAt(0).toUpperCase() + exam.status.slice(1)}
                            </span>
                            {exam.resultsPublished && (
                              <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Results Published
                              </span>
                            )}
                          </div>
                          <p className="text-gray-600 mb-3">{exam.description}</p>
                          
                          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm text-gray-600">
                            <div className="flex items-center">
                              <Clock size={16} className="mr-1" />
                              <span>{exam.duration} mins</span>
                            </div>
                            <div className="flex items-center">
                              <span>{exam.questions} questions</span>
                            </div>
                            <div className="flex items-center">
                              <span>{exam.totalMarks} marks</span>
                            </div>
                            <div className="flex items-center">
                              <Users size={16} className="mr-1" />
                              <span>{exam.participants} participants</span>
                            </div>
                            <div className="flex items-center">
                              <Calendar size={16} className="mr-1" />
                              <span>{formatDateTime(exam.deadline)}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          {exam.status === 'draft' && (
                            <button
                              onClick={() => handlePublish(exam.id)}
                              className="px-3 py-2 bg-green-100 text-green-700 rounded-lg text-sm hover:bg-green-200 transition-colors"
                            >
                              Publish
                            </button>
                          )}
                          {exam.status === 'completed' && exam.results && exam.results.length > 0 && (
                            <button
                              onClick={() => toggleExamExpansion(exam.id)}
                              className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200 transition-colors"
                            >
                              {expandedExam === exam.id ? 'Hide' : 'View'} Results
                            </button>
                          )}
                          <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                            <Eye size={16} />
                          </button>
                          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(exam.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Expanded Content */}
                    <AnimatePresence>
                      {expandedExam === exam.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="border-t border-gray-200 overflow-hidden"
                        >
                          {/* Tabs */}
                          <div className="px-6 pt-4">
                            <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
                              <button
                                onClick={() => handleTabChange(exam.id, 'details')}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                                  currentTab === 'details'
                                    ? 'bg-white text-[#14213D] shadow-sm'
                                    : 'text-gray-600 hover:text-gray-900'
                                }`}
                              >
                                Details
                              </button>
                              {exam.status === 'completed' && exam.results && exam.results.length > 0 && (
                                <>
                                  <button
                                    onClick={() => handleTabChange(exam.id, 'results')}
                                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                                      currentTab === 'results'
                                        ? 'bg-white text-[#14213D] shadow-sm'
                                        : 'text-gray-600 hover:text-gray-900'
                                    }`}
                                  >
                                    Results ({exam.results.length})
                                  </button>
                                  <button
                                    onClick={() => handleTabChange(exam.id, 'grading')}
                                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                                      currentTab === 'grading'
                                        ? 'bg-white text-[#14213D] shadow-sm'
                                        : 'text-gray-600 hover:text-gray-900'
                                    }`}
                                  >
                                    Grade Settings
                                  </button>
                                </>
                              )}
                            </div>
                          </div>

                          {/* Tab Content */}
                          <div className="p-6">
                            {currentTab === 'details' && (
                              <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <div>
                                    <h4 className="font-semibold text-gray-900 mb-2">Exam Information</h4>
                                    <div className="space-y-2 text-sm">
                                      <p><span className="font-medium">Duration:</span> {exam.duration} minutes</p>
                                      <p><span className="font-medium">Total Questions:</span> {exam.questions}</p>
                                      <p><span className="font-medium">Total Marks:</span> {exam.totalMarks}</p>
                                      <p><span className="font-medium">Deadline:</span> {formatDateTime(exam.deadline)}</p>
                                    </div>
                                  </div>
                                  <div>
                                    <h4 className="font-semibold text-gray-900 mb-2">Participation</h4>
                                    <div className="space-y-2 text-sm">
                                      <p><span className="font-medium">Registered:</span> {exam.participants} students</p>
                                      <p><span className="font-medium">Submitted:</span> {exam.results?.length || 0} responses</p>
                                      <p><span className="font-medium">Completion Rate:</span> {exam.participants > 0 ? Math.round(((exam.results?.length || 0) / exam.participants) * 100) : 0}%</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}

                            {currentTab === 'results' && exam.results && (
                              <div className="space-y-6">
                                {/* Results Header with Stats */}
                                <div className="flex justify-between items-center">
                                  <div>
                                    <h4 className="text-lg font-semibold text-gray-900">Student Results</h4>
                                    <p className="text-gray-600">
                                      {exam.results.length} submissions • Average: {resultsStats?.averageScore}%
                                    </p>
                                  </div>
                                  <div className="flex items-center space-x-3">
                                    <button className="flex items-center px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                                      <Download size={16} className="mr-2" />
                                      Export CSV
                                    </button>
                                    {exam.resultsPublished ? (
                                      <button
                                        onClick={() => handleUnpublishResults(exam.id)}
                                        className="flex items-center px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                                      >
                                        <XCircle size={16} className="mr-2" />
                                        Unpublish Results
                                      </button>
                                    ) : (
                                      <button
                                        onClick={() => setShowPublishConfirm(exam.id)}
                                        className="flex items-center px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                                      >
                                        <Send size={16} className="mr-2" />
                                        Publish Results
                                      </button>
                                    )}
                                  </div>
                                </div>

                                {/* Grade Distribution */}
                                {resultsStats && (
                                  <div className="bg-gray-50 rounded-lg p-4">
                                    <h5 className="font-medium text-gray-900 mb-3">Grade Distribution</h5>
                                    <div className="flex flex-wrap gap-2">
                                      {Object.entries(resultsStats.gradeDistribution).map(([grade, count]) => {
                                        const gradeColor = getGradeColor(grade, exam.gradeCriteria || defaultGradeCriteria);
                                        return (
                                          <div key={grade} className="flex items-center space-x-2">
                                            <div className={`w-4 h-4 rounded ${gradeColor}`}></div>
                                            <span className="text-sm font-medium">{grade}: {count}</span>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </div>
                                )}

                                {/* Results Table */}
                                <div className="overflow-x-auto">
                                  <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                      <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                          Student
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                          Score
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                          Grade
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                          Time Taken
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                          Submitted At
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                          Status
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                      {exam.results.map((result) => {
                                        const percentage = Math.round((result.score / exam.totalMarks) * 100);
                                        const gradeColor = getGradeColor(result.grade, exam.gradeCriteria || defaultGradeCriteria);
                                        
                                        return (
                                          <tr key={result.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                              <div>
                                                <div className="text-sm font-medium text-gray-900">{result.studentName}</div>
                                                <div className="text-sm text-gray-500">{result.email}</div>
                                              </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                              <div className="text-sm font-medium text-gray-900">
                                                {result.score}/{exam.totalMarks}
                                              </div>
                                              <div className="text-sm text-gray-500">{percentage}%</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white ${gradeColor}`}>
                                                {result.grade}
                                              </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                              {result.timeTaken} min
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                              {formatDateTime(result.submittedAt)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                result.status === 'graded' 
                                                  ? 'bg-green-100 text-green-800' 
                                                  : 'bg-yellow-100 text-yellow-800'
                                              }`}>
                                                {result.status === 'graded' ? (
                                                  <>
                                                    <CheckCircle size={12} className="mr-1" />
                                                    Graded
                                                  </>
                                                ) : (
                                                  <>
                                                    <AlertTriangle size={12} className="mr-1" />
                                                    Pending
                                                  </>
                                                )}
                                              </span>
                                            </td>
                                          </tr>
                                        );
                                      })}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            )}

                            {currentTab === 'grading' && (
                              <div className="space-y-6">
                                <div className="flex justify-between items-center">
                                  <div>
                                    <h4 className="text-lg font-semibold text-gray-900">Grade Evaluation Criteria</h4>
                                    <p className="text-gray-600">Configure how student scores are converted to grades</p>
                                  </div>
                                  <button
                                    onClick={() => setEditingGrades(editingGrades === exam.id ? null : exam.id)}
                                    className="flex items-center px-3 py-2 bg-[#14213D] text-white rounded-lg hover:bg-blue-800 transition-colors"
                                  >
                                    <Settings size={16} className="mr-2" />
                                    {editingGrades === exam.id ? 'Save Changes' : 'Edit Criteria'}
                                  </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  {(exam.gradeCriteria || defaultGradeCriteria).map((criteria, index) => (
                                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                                      <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center space-x-3">
                                          <div className={`w-8 h-8 rounded ${criteria.color} flex items-center justify-center`}>
                                            <span className="text-white font-bold text-sm">{criteria.grade}</span>
                                          </div>
                                          <span className="font-medium text-gray-900">Grade {criteria.grade}</span>
                                        </div>
                                        {editingGrades === exam.id && (
                                          <button className="text-red-600 hover:text-red-800">
                                            <Trash2 size={16} />
                                          </button>
                                        )}
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        {editingGrades === exam.id ? (
                                          <>
                                            <input
                                              type="number"
                                              value={criteria.minScore}
                                              onChange={(e) => {
                                                const newCriteria = [...(exam.gradeCriteria || defaultGradeCriteria)];
                                                newCriteria[index].minScore = parseInt(e.target.value) || 0;
                                                updateGradeCriteria(exam.id, newCriteria);
                                              }}
                                              className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                                              min="0"
                                              max="100"
                                            />
                                            <span className="text-gray-500">-</span>
                                            <input
                                              type="number"
                                              value={criteria.maxScore}
                                              onChange={(e) => {
                                                const newCriteria = [...(exam.gradeCriteria || defaultGradeCriteria)];
                                                newCriteria[index].maxScore = parseInt(e.target.value) || 100;
                                                updateGradeCriteria(exam.id, newCriteria);
                                              }}
                                              className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                                              min="0"
                                              max="100"
                                            />
                                            <span className="text-gray-500">%</span>
                                          </>
                                        ) : (
                                          <span className="text-gray-600 text-sm">
                                            {criteria.minScore}% - {criteria.maxScore}%
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  ))}
                                </div>

                                {editingGrades === exam.id && (
                                  <div className="flex justify-end space-x-3">
                                    <button
                                      onClick={() => setEditingGrades(null)}
                                      className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      onClick={() => {
                                        setEditingGrades(null);
                                        setShowToast(true);
                                        setToastMessage('Grade criteria updated successfully!');
                                        setToastType('success');
                                      }}
                                      className="px-4 py-2 bg-[#14213D] text-white rounded-lg hover:bg-blue-800 transition-colors"
                                    >
                                      Save Changes
                                    </button>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>

        {/* Publish Results Confirmation Modal */}
        <AnimatePresence>
          {showPublishConfirm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white rounded-2xl p-8 max-w-md w-full"
              >
                <div className="text-center mb-6">
                  <AlertTriangle className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Publish Results?</h3>
                  <p className="text-gray-600">
                    Once published, students will be able to view their grades and scores. This action can be reversed later.
                  </p>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setShowPublishConfirm(null)}
                    className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handlePublishResults(showPublishConfirm)}
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Publish Results
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Toast Notification */}
        {showToast && (
          <Toast
            message={toastMessage}
            type={toastType}
            onClose={() => setShowToast(false)}
          />
        )}
      </div>
    </div>
  );
};

export default MyExamsPage;