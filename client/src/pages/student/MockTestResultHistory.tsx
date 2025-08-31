import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, CheckCircle2, ArrowRight, Brain, Users, Filter, Download, TrendingUp, Award } from 'lucide-react';
import Button from '../../components/Button';

interface MockTestResult {
  id: string;
  examType: string;
  testMode: 'ai' | 'teacher';
  date: string;
  score: string;
  accuracy: string;
  timeTaken: string;
  status: 'Completed';
  totalQuestions: number;
  correctAnswers: number;
  subject: string;
}

const mockResults: MockTestResult[] = [
  {
    id: '1',
    examType: 'JEE Mains',
    testMode: 'ai',
    date: '2024-03-15',
    score: '195/300',
    accuracy: '92%',
    timeTaken: '2h 45m',
    status: 'Completed',
    totalQuestions: 75,
    correctAnswers: 69,
    subject: 'Physics, Chemistry, Mathematics'
  },
  {
    id: '2',
    examType: 'NEET UG',
    testMode: 'teacher',
    date: '2024-03-10',
    score: '540/720',
    accuracy: '85%',
    timeTaken: '3h 10m',
    status: 'Completed',
    totalQuestions: 180,
    correctAnswers: 153,
    subject: 'Physics, Chemistry, Biology'
  },
  {
    id: '3',
    examType: 'SSC CGL',
    testMode: 'ai',
    date: '2024-03-05',
    score: '170/200',
    accuracy: '88%',
    timeTaken: '1h 45m',
    status: 'Completed',
    totalQuestions: 100,
    correctAnswers: 88,
    subject: 'Quantitative, English, Reasoning'
  },
  {
    id: '4',
    examType: 'GATE',
    testMode: 'teacher',
    date: '2024-02-28',
    score: '78/100',
    accuracy: '91%',
    timeTaken: '2h 55m',
    status: 'Completed',
    totalQuestions: 65,
    correctAnswers: 59,
    subject: 'Computer Science'
  },
  {
    id: '5',
    examType: 'JEE Advanced',
    testMode: 'ai',
    date: '2024-02-20',
    score: '245/372',
    accuracy: '79%',
    timeTaken: '2h 30m',
    status: 'Completed',
    totalQuestions: 54,
    correctAnswers: 43,
    subject: 'Physics, Chemistry, Mathematics'
  }
];

const MockTestResultsHistoryPage: React.FC = () => {
  const navigate = useNavigate();
  const [filterMode, setFilterMode] = useState<'all' | 'ai' | 'teacher'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'score' | 'accuracy'>('date');

  const filteredResults = mockResults
    .filter(result => filterMode === 'all' || result.testMode === filterMode)
    .sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'score':
          const scoreA = parseInt(a.score.split('/')[0]);
          const scoreB = parseInt(b.score.split('/')[0]);
          return scoreB - scoreA;
        case 'accuracy':
          const accA = parseInt(a.accuracy.replace('%', ''));
          const accB = parseInt(b.accuracy.replace('%', ''));
          return accB - accA;
        default:
          return 0;
      }
    });

  const averageAccuracy = Math.round(
    mockResults.reduce((sum, result) => sum + parseInt(result.accuracy.replace('%', '')), 0) / mockResults.length
  );

  const totalTestsTaken = mockResults.length;
  const aiTests = mockResults.filter(r => r.testMode === 'ai').length;
  const teacherTests = mockResults.filter(r => r.testMode === 'teacher').length;

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Mock Test Results History</h1>
        <p className="text-gray-600">View and analyze your practice test performances across different modes</p>
      </div>

      {/* Results Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 bg-indigo-100 rounded-lg">
              <CheckCircle2 className="h-6 w-6 text-indigo-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Average Accuracy</p>
              <p className="text-2xl font-semibold text-gray-900">{averageAccuracy}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Tests Completed</p>
              <p className="text-2xl font-semibold text-gray-900">{totalTestsTaken}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Brain className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">AI Tests</p>
              <p className="text-2xl font-semibold text-gray-900">{aiTests}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Teacher Tests</p>
              <p className="text-2xl font-semibold text-gray-900">{teacherTests}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Filter by Mode:</span>
              <select
                value={filterMode}
                onChange={(e) => setFilterMode(e.target.value as 'all' | 'ai' | 'teacher')}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="all">All Tests</option>
                <option value="ai">AI Generated</option>
                <option value="teacher">Teacher Designed</option>
              </select>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'date' | 'score' | 'accuracy')}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="date">Date</option>
                <option value="score">Score</option>
                <option value="accuracy">Accuracy</option>
              </select>
            </div>
          </div>
          
          <Button variant="outline" className="flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Export Results
          </Button>
        </div>
      </div>

      {/* Results Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Test Results ({filteredResults.length})</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Exam Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Test Mode
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Accuracy
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time Taken
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Questions
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredResults.map((result) => (
                <tr key={result.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{result.examType}</div>
                      <div className="text-sm text-gray-500">{result.subject}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      result.testMode === 'ai' 
                        ? 'bg-purple-100 text-purple-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {result.testMode === 'ai' ? (
                        <>
                          <Brain className="h-3 w-3 mr-1" />
                          AI Generated
                        </>
                      ) : (
                        <>
                          <Users className="h-3 w-3 mr-1" />
                          Teacher Designed
                        </>
                      )}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{result.date}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{result.score}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{result.accuracy}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{result.timeTaken}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {result.correctAnswers}/{result.totalQuestions}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/student/mocktest/result/${result.id}`)}
                      className="inline-flex items-center"
                    >
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

      {/* Performance Insights */}
      <div className="mt-8 bg-gradient-to-r from-indigo-900 to-purple-900 rounded-xl p-8 text-white">
        <div className="flex items-center mb-4">
          <Award className="h-8 w-8 mr-3" />
          <h3 className="text-xl font-semibold">Performance Insights</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-indigo-200 text-sm">Best Performance</p>
            <p className="text-2xl font-bold">92% Accuracy</p>
            <p className="text-indigo-200 text-sm">JEE Mains (AI Generated)</p>
          </div>
          <div>
            <p className="text-indigo-200 text-sm">Improvement Trend</p>
            <p className="text-2xl font-bold">+15%</p>
            <p className="text-indigo-200 text-sm">Over last 5 tests</p>
          </div>
          <div>
            <p className="text-indigo-200 text-sm">Preferred Mode</p>
            <p className="text-2xl font-bold">{aiTests > teacherTests ? 'AI Tests' : 'Teacher Tests'}</p>
            <p className="text-indigo-200 text-sm">{Math.max(aiTests, teacherTests)} out of {totalTestsTaken} tests</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MockTestResultsHistoryPage;