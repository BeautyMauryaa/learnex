import React, { useState } from 'react';
import { CheckCircle, XCircle, Clock, User, FileText, MessageSquare, Star } from 'lucide-react';

interface QuizSubmission {
  id: number;
  studentName: string;
  examTitle: string;
  submittedAt: string;
  score: number;
  totalMarks: number;
  timeTaken: number;
  status: 'pending' | 'reviewed' | 'graded';
  answers: Answer[];
}

interface Answer {
  questionId: number;
  question: string;
  studentAnswer: string;
  correctAnswer?: string;
  isCorrect?: boolean;
  points: number;
  maxPoints: number;
  feedback?: string;
}

const QuizReviewPage = () => {
  const [submissions, setSubmissions] = useState<QuizSubmission[]>([
    {
      id: 1,
      studentName: 'John Doe',
      examTitle: 'React Fundamentals Quiz',
      submittedAt: '2024-01-20T14:30:00',
      score: 42,
      totalMarks: 50,
      timeTaken: 45,
      status: 'pending',
      answers: [
        {
          questionId: 1,
          question: 'What is JSX?',
          studentAnswer: 'JSX is a syntax extension for JavaScript that allows you to write HTML-like code in React components.',
          points: 0,
          maxPoints: 5
        },
        {
          questionId: 2,
          question: 'Which hook is used for state management?',
          studentAnswer: 'useState',
          correctAnswer: 'useState',
          isCorrect: true,
          points: 3,
          maxPoints: 3
        }
      ]
    },
    {
      id: 2,
      studentName: 'Sarah Wilson',
      examTitle: 'JavaScript Advanced Concepts',
      submittedAt: '2024-01-19T16:15:00',
      score: 68,
      totalMarks: 75,
      timeTaken: 78,
      status: 'reviewed',
      answers: []
    },
    {
      id: 3,
      studentName: 'Mike Johnson',
      examTitle: 'CSS Grid Layout',
      submittedAt: '2024-01-18T10:45:00',
      score: 28,
      totalMarks: 30,
      timeTaken: 35,
      status: 'graded',
      answers: []
    }
  ]);

  const [selectedSubmission, setSelectedSubmission] = useState<QuizSubmission | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredSubmissions = submissions.filter(submission => 
    filterStatus === 'all' || submission.status === filterStatus
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'reviewed': return 'bg-blue-100 text-blue-800';
      case 'graded': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getScoreColor = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const handleReview = (submission: QuizSubmission) => {
    setSelectedSubmission(submission);
  };

  const updateAnswerFeedback = (questionId: number, feedback: string, points: number) => {
    if (selectedSubmission) {
      const updatedAnswers = selectedSubmission.answers.map(answer =>
        answer.questionId === questionId 
          ? { ...answer, feedback, points }
          : answer
      );
      
      const updatedSubmission = {
        ...selectedSubmission,
        answers: updatedAnswers,
        score: updatedAnswers.reduce((sum, answer) => sum + answer.points, 0)
      };
      
      setSelectedSubmission(updatedSubmission);
    }
  };

  const saveReview = () => {
    if (selectedSubmission) {
      setSubmissions(submissions.map(sub =>
        sub.id === selectedSubmission.id 
          ? { ...selectedSubmission, status: 'reviewed' }
          : sub
      ));
      setSelectedSubmission(null);
    }
  };

  const formatDateTime = (dateTime: string) => {
    return new Date(dateTime).toLocaleString();
  };

  if (selectedSubmission) {
    return (
      <div className="p-4 lg:p-8">
        <div className="max-w-4xl mx-auto">
          {/* Review Header */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-2xl font-bold text-[#14213D] mb-2">
                  Review Submission: {selectedSubmission.examTitle}
                </h1>
                <div className="flex items-center space-x-4 text-gray-600">
                  <div className="flex items-center">
                    <User size={16} className="mr-1" />
                    <span>{selectedSubmission.studentName}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock size={16} className="mr-1" />
                    <span>{selectedSubmission.timeTaken} minutes</span>
                  </div>
                  <div className="flex items-center">
                    <span>Submitted: {formatDateTime(selectedSubmission.submittedAt)}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-2xl font-bold ${getScoreColor(selectedSubmission.score, selectedSubmission.totalMarks)}`}>
                  {selectedSubmission.score}/{selectedSubmission.totalMarks}
                </div>
                <div className="text-sm text-gray-500">
                  {Math.round((selectedSubmission.score / selectedSubmission.totalMarks) * 100)}%
                </div>
              </div>
            </div>
          </div>

          {/* Answers Review */}
          <div className="space-y-6">
            {selectedSubmission.answers.map((answer, index) => (
              <div key={answer.questionId} className="bg-white rounded-lg shadow-sm p-6">
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-[#14213D]">
                      Question {index + 1}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">
                        {answer.points}/{answer.maxPoints} points
                      </span>
                      {answer.isCorrect !== undefined && (
                        answer.isCorrect ? 
                          <CheckCircle className="text-green-600" size={20} /> :
                          <XCircle className="text-red-600" size={20} />
                      )}
                    </div>
                  </div>
                  <p className="text-gray-800 mb-4">{answer.question}</p>
                </div>

                <div className="mb-4">
                  <h4 className="font-medium text-gray-700 mb-2">Student Answer:</h4>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-gray-800">{answer.studentAnswer}</p>
                  </div>
                </div>

                {answer.correctAnswer && (
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-700 mb-2">Correct Answer:</h4>
                    <div className="bg-green-50 p-3 rounded-lg">
                      <p className="text-green-800">{answer.correctAnswer}</p>
                    </div>
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Points Awarded
                    </label>
                    <input
                      type="number"
                      min="0"
                      max={answer.maxPoints}
                      value={answer.points}
                      onChange={(e) => updateAnswerFeedback(
                        answer.questionId, 
                        answer.feedback || '', 
                        parseInt(e.target.value) || 0
                      )}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#14213D] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Feedback
                    </label>
                    <textarea
                      value={answer.feedback || ''}
                      onChange={(e) => updateAnswerFeedback(
                        answer.questionId, 
                        e.target.value, 
                        answer.points
                      )}
                      rows={2}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#14213D] focus:border-transparent"
                      placeholder="Provide feedback for the student..."
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-4 mt-6">
            <button
              onClick={() => setSelectedSubmission(null)}
              className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={saveReview}
              className="bg-[#14213D] text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition-colors"
            >
              Save Review
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-[#14213D] mb-2">Quiz Review</h1>
          <p className="text-gray-600">Review and grade student quiz submissions</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#14213D] mb-1">{submissions.length}</div>
              <div className="text-gray-600 text-sm">Total Submissions</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600 mb-1">
                {submissions.filter(s => s.status === 'pending').length}
              </div>
              <div className="text-gray-600 text-sm">Pending Review</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">
                {submissions.filter(s => s.status === 'reviewed').length}
              </div>
              <div className="text-gray-600 text-sm">Reviewed</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-1">
                {submissions.filter(s => s.status === 'graded').length}
              </div>
              <div className="text-gray-600 text-sm">Graded</div>
            </div>
          </div>
        </div>

        {/* Filter */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700">Filter by status:</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#14213D] focus:border-transparent"
            >
              <option value="all">All Submissions</option>
              <option value="pending">Pending Review</option>
              <option value="reviewed">Reviewed</option>
              <option value="graded">Graded</option>
            </select>
          </div>
        </div>

        {/* Submissions List */}
        <div className="space-y-4">
          {filteredSubmissions.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <MessageSquare className="mx-auto mb-4 text-gray-400" size={48} />
              <p className="text-gray-500">No submissions found matching your criteria.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredSubmissions.map((submission) => (
                <div key={submission.id} className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-[#14213D]">
                          {submission.examTitle}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(submission.status)}`}>
                          {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center">
                          <User size={16} className="mr-1" />
                          <span>{submission.studentName}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock size={16} className="mr-1" />
                          <span>{submission.timeTaken} minutes</span>
                        </div>
                        <div className={`font-medium ${getScoreColor(submission.score, submission.totalMarks)}`}>
                          Score: {submission.score}/{submission.totalMarks}
                        </div>
                        <div>
                          Submitted: {formatDateTime(submission.submittedAt)}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            size={16}
                            className={`${
                              star <= Math.round((submission.score / submission.totalMarks) * 5)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <button
                        onClick={() => handleReview(submission)}
                        className="bg-[#14213D] text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors"
                      >
                        {submission.status === 'pending' ? 'Review' : 'View Review'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizReviewPage;