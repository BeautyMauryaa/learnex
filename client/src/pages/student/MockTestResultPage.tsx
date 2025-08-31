import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, RotateCcw, BookOpen, TrendingUp, CheckCircle2, XCircle, AlertCircle, Clock } from 'lucide-react';
import Button from '../../components/Button';

interface Answer {
  id: number;
  question: string;
  userAnswer: string | null;
  correctAnswer: string;
  status: 'Correct' | 'Incorrect' | 'Skipped';
}

interface ResultData {
  examType: string;
  duration: string;
  totalQuestions: number;
  attempted: number;
  correct: number;
  wrong: number;
  score: number;
  maxScore: number;
  timeTaken: string;
  answers: Answer[];
  subjectScores: {
    [key: string]: number;
  };
}

const mockResultData: ResultData = {
  examType: "JEE Mains Mock Test",
  duration: "3 Hours",
  totalQuestions: 50,
  attempted: 47,
  correct: 39,
  wrong: 8,
  score: 195,
  maxScore: 200,
  timeTaken: "2h 32m",
  subjectScores: {
    Physics: 85,
    Chemistry: 92,
    Mathematics: 78
  },
  answers: [
    {
      id: 1,
      question: "What is the powerhouse of the cell?",
      userAnswer: "Mitochondria",
      correctAnswer: "Mitochondria",
      status: "Correct"
    },
    {
      id: 2,
      question: "Which of the following is NOT a type of cell division?",
      userAnswer: "Binary Fission",
      correctAnswer: "Photosynthesis",
      status: "Incorrect"
    },
    {
      id: 3,
      question: "The cell membrane is primarily composed of:",
      userAnswer: null,
      correctAnswer: "Phospholipid bilayer",
      status: "Skipped"
    }
  ]
};

const MockTestResultPage: React.FC = () => {
  const { examId } = useParams<{ examId: string }>();
  const navigate = useNavigate();
  const result = mockResultData; // In real app, fetch based on examId

  const accuracy = Math.round((result.correct / result.attempted) * 100);
  const percentageScore = Math.round((result.score / result.maxScore) * 100);

  return (
    <div className="p-6">
      <div className="mb-8">
        <button 
          onClick={() => navigate('/student/exam-practice')}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Practice Tests
        </button>
      </div>

      {/* Result Summary Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{result.examType} Results</h1>
            <p className="text-gray-600">Completed in {result.timeTaken}</p>
          </div>
          <Button variant="outline" className="mt-4 md:mt-0">
            <Download className="h-4 w-4 mr-2" />
            Download Report
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600">Score</p>
                <p className="text-2xl font-bold text-green-900">{result.score}/{result.maxScore}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600">Accuracy</p>
                <p className="text-2xl font-bold text-blue-900">{accuracy}%</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600">Questions</p>
                <p className="text-2xl font-bold text-purple-900">
                  {result.attempted}/{result.totalQuestions}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-orange-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-600">Time Taken</p>
                <p className="text-2xl font-bold text-orange-900">{result.timeTaken}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subject-wise Performance */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Subject-wise Performance</h2>
        <div className="space-y-4">
          {Object.entries(result.subjectScores).map(([subject, score]) => (
            <div key={subject}>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">{subject}</span>
                <span className="text-sm font-medium text-gray-700">{score}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-indigo-600 h-2 rounded-full" 
                  style={{ width: `${score}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Question-wise Analysis */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Question-wise Analysis</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Q.No
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Question
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Your Answer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Correct Answer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {result.answers.map((answer) => (
                <tr key={answer.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {answer.id}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {answer.question}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {answer.userAnswer || '—'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {answer.correctAnswer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      answer.status === 'Correct'
                        ? 'bg-green-100 text-green-800'
                        : answer.status === 'Incorrect'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {answer.status === 'Correct' && <CheckCircle2 className="h-4 w-4 mr-1" />}
                      {answer.status === 'Incorrect' && <XCircle className="h-4 w-4 mr-1" />}
                      {answer.status === 'Skipped' && <AlertCircle className="h-4 w-4 mr-1" />}
                      {answer.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button 
          onClick={() => navigate(`/student/mocktest/${examId}`)}
          className="flex-1"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Retake Test
        </Button>
        <Button 
          variant="outline"
          onClick={() => navigate('/student/progress')}
          className="flex-1"
        >
          <TrendingUp className="h-4 w-4 mr-2" />
          View Progress Dashboard
        </Button>
      </div>
    </div>
  );
};

export default MockTestResultPage;