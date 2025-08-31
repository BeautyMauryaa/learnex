import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { 
  Clock, 
  ArrowLeft, 
  ArrowRight, 
  Flag, 
  CheckCircle2, 
  AlertTriangle, 
  Brain, 
  Users, 
  BookOpen,
  Eye,
  EyeOff,
  Pause,
  Play,
  RotateCcw,
  Send
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../components/Button';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  userAnswer: number | null;
  isMarkedForReview: boolean;
  subject: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topic: string;
}

interface TestConfig {
  title: string;
  mode: 'ai' | 'teacher';
  subject: string;
  duration: number; // in minutes
  totalQuestions: number;
  teacherCode?: string;
}

// Mock questions data
const generateMockQuestions = (subject: string, count: number): Question[] => {
  const subjects = {
    Physics: [
      {
        question: "A ball is thrown vertically upward with an initial velocity of 20 m/s. What is the maximum height reached? (g = 10 m/s²)",
        options: ["10 m", "20 m", "30 m", "40 m"],
        correctAnswer: 1,
        topic: "Kinematics",
        difficulty: "Medium" as const
      },
      {
        question: "What is the SI unit of force?",
        options: ["Joule", "Newton", "Watt", "Pascal"],
        correctAnswer: 1,
        topic: "Mechanics",
        difficulty: "Easy" as const
      },
      {
        question: "The work done by a conservative force around a closed path is:",
        options: ["Positive", "Negative", "Zero", "Infinite"],
        correctAnswer: 2,
        topic: "Work and Energy",
        difficulty: "Medium" as const
      }
    ],
    Chemistry: [
      {
        question: "What is the atomic number of Carbon?",
        options: ["4", "6", "8", "12"],
        correctAnswer: 1,
        topic: "Atomic Structure",
        difficulty: "Easy" as const
      },
      {
        question: "Which of the following is an example of a covalent bond?",
        options: ["NaCl", "H₂O", "CaO", "MgF₂"],
        correctAnswer: 1,
        topic: "Chemical Bonding",
        difficulty: "Medium" as const
      }
    ],
    Mathematics: [
      {
        question: "What is the derivative of sin(x)?",
        options: ["cos(x)", "-cos(x)", "sin(x)", "-sin(x)"],
        correctAnswer: 0,
        topic: "Calculus",
        difficulty: "Medium" as const
      },
      {
        question: "Solve: 2x + 5 = 15",
        options: ["x = 5", "x = 10", "x = 7.5", "x = 2.5"],
        correctAnswer: 0,
        topic: "Algebra",
        difficulty: "Easy" as const
      }
    ]
  };

  const questionPool = subjects[subject as keyof typeof subjects] || subjects.Physics;
  const questions: Question[] = [];

  for (let i = 0; i < count; i++) {
    const baseQuestion = questionPool[i % questionPool.length];
    questions.push({
      id: i + 1,
      question: baseQuestion.question,
      options: baseQuestion.options,
      correctAnswer: baseQuestion.correctAnswer,
      userAnswer: null,
      isMarkedForReview: false,
      subject,
      difficulty: baseQuestion.difficulty,
      topic: baseQuestion.topic
    });
  }

  return questions;
};

const MockTestPage: React.FC = () => {
  const { examId } = useParams<{ examId: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // Test configuration
  const [testConfig] = useState<TestConfig>({
    title: examId?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Mock Test',
    mode: (searchParams.get('mode') as 'ai' | 'teacher') || 'ai',
    subject: searchParams.get('subject') || 'Physics',
    duration: 60, // 60 minutes
    totalQuestions: 30,
    teacherCode: searchParams.get('teacherCode') || undefined
  });

  // Test state
  const [questions] = useState<Question[]>(() => 
    generateMockQuestions(testConfig.subject, testConfig.totalQuestions)
  );
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(testConfig.duration * 60); // in seconds
  const [isTestStarted, setIsTestStarted] = useState(false);
  const [isTestPaused, setIsTestPaused] = useState(false);
  const [isTestSubmitted, setIsTestSubmitted] = useState(false);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [showQuestionPalette, setShowQuestionPalette] = useState(false);
  const [autoSaveStatus, setAutoSaveStatus] = useState<'saved' | 'saving' | 'error'>('saved');

  // Refs
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const autoSaveRef = useRef<NodeJS.Timeout | null>(null);

  // Timer effect
  useEffect(() => {
    if (isTestStarted && !isTestPaused && !isTestSubmitted && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleAutoSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isTestStarted, isTestPaused, isTestSubmitted, timeLeft]);

  // Auto-save effect
  useEffect(() => {
    if (isTestStarted && !isTestSubmitted) {
      setAutoSaveStatus('saving');
      autoSaveRef.current = setTimeout(() => {
        // Mock auto-save
        localStorage.setItem(`mocktest_${examId}`, JSON.stringify({
          questions,
          currentQuestion,
          timeLeft,
          timestamp: Date.now()
        }));
        setAutoSaveStatus('saved');
      }, 1000);
    }

    return () => {
      if (autoSaveRef.current) {
        clearTimeout(autoSaveRef.current);
      }
    };
  }, [questions, currentQuestion, examId, isTestStarted, isTestSubmitted]);

  // Prevent page refresh/close
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isTestStarted && !isTestSubmitted) {
        e.preventDefault();
        e.returnValue = 'Are you sure you want to leave? Your test progress will be lost.';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isTestStarted, isTestSubmitted]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartTest = () => {
    setIsTestStarted(true);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestion].userAnswer = answerIndex;
    // Update questions state would go here in real implementation
  };

  const handleMarkForReview = () => {
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestion].isMarkedForReview = !updatedQuestions[currentQuestion].isMarkedForReview;
    // Update questions state would go here in real implementation
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleQuestionJump = (questionIndex: number) => {
    setCurrentQuestion(questionIndex);
    setShowQuestionPalette(false);
  };

  const handleSubmitTest = () => {
    setShowSubmitConfirm(true);
  };

  const confirmSubmitTest = () => {
    setIsTestSubmitted(true);
    setShowSubmitConfirm(false);
    
    // Calculate results
    const correctAnswers = questions.filter(q => q.userAnswer === q.correctAnswer).length;
    const attemptedQuestions = questions.filter(q => q.userAnswer !== null).length;
    const accuracy = attemptedQuestions > 0 ? Math.round((correctAnswers / attemptedQuestions) * 100) : 0;
    const timeTaken = testConfig.duration * 60 - timeLeft;

    // Navigate to results page
    navigate(`/student/mocktest/result/${examId}`, {
      state: {
        testConfig,
        questions,
        results: {
          correctAnswers,
          totalQuestions: questions.length,
          attemptedQuestions,
          accuracy,
          timeTaken,
          score: correctAnswers * 4 // Assuming +4 for correct, 0 for wrong
        }
      }
    });
  };

  const handleAutoSubmit = () => {
    setIsTestSubmitted(true);
    // Auto-submit logic similar to manual submit
    const correctAnswers = questions.filter(q => q.userAnswer === q.correctAnswer).length;
    const attemptedQuestions = questions.filter(q => q.userAnswer !== null).length;
    const accuracy = attemptedQuestions > 0 ? Math.round((correctAnswers / attemptedQuestions) * 100) : 0;

    navigate(`/student/mocktest/result/${examId}`, {
      state: {
        testConfig,
        questions,
        results: {
          correctAnswers,
          totalQuestions: questions.length,
          attemptedQuestions,
          accuracy,
          timeTaken: testConfig.duration * 60,
          score: correctAnswers * 4,
          autoSubmitted: true
        }
      }
    });
  };

  const getQuestionStatus = (question: Question) => {
    if (question.userAnswer !== null) {
      return question.isMarkedForReview ? 'answered-marked' : 'answered';
    }
    return question.isMarkedForReview ? 'marked' : 'not-visited';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'answered': return 'bg-green-500 text-white';
      case 'answered-marked': return 'bg-purple-500 text-white';
      case 'marked': return 'bg-orange-500 text-white';
      case 'current': return 'bg-indigo-600 text-white';
      default: return 'bg-gray-200 text-gray-700';
    }
  };

  const attemptedCount = questions.filter(q => q.userAnswer !== null).length;
  const markedCount = questions.filter(q => q.isMarkedForReview).length;
  const notVisitedCount = questions.length - attemptedCount;

  if (!isTestStarted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl p-8 max-w-2xl w-full shadow-xl border border-gray-200"
        >
          <div className="text-center mb-8">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
              testConfig.mode === 'ai' 
                ? 'bg-gradient-to-r from-purple-500 to-indigo-600' 
                : 'bg-gradient-to-r from-green-500 to-emerald-600'
            }`}>
              {testConfig.mode === 'ai' ? (
                <Brain className="h-8 w-8 text-white" />
              ) : (
                <Users className="h-8 w-8 text-white" />
              )}
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{testConfig.title}</h1>
            <p className="text-gray-600">
              {testConfig.mode === 'ai' ? 'AI-Generated' : 'Teacher-Designed'} Mock Test
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <BookOpen className="h-6 w-6 text-indigo-600 mx-auto mb-2" />
              <p className="text-sm text-gray-500">Subject</p>
              <p className="font-semibold text-gray-900">{testConfig.subject}</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <Clock className="h-6 w-6 text-indigo-600 mx-auto mb-2" />
              <p className="text-sm text-gray-500">Duration</p>
              <p className="font-semibold text-gray-900">{testConfig.duration} minutes</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <CheckCircle2 className="h-6 w-6 text-indigo-600 mx-auto mb-2" />
              <p className="text-sm text-gray-500">Questions</p>
              <p className="font-semibold text-gray-900">{testConfig.totalQuestions}</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-indigo-600 mx-auto mb-2" />
              <p className="text-sm text-gray-500">Marking</p>
              <p className="font-semibold text-gray-900">+4, 0, -1</p>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
            <h3 className="font-semibold text-amber-800 mb-2">Important Instructions:</h3>
            <ul className="text-sm text-amber-700 space-y-1">
              <li>• Once started, the timer cannot be paused</li>
              <li>• Your answers are auto-saved every 60 seconds</li>
              <li>• You can mark questions for review and return later</li>
              <li>• Test will auto-submit when time expires</li>
              <li>• Do not refresh or close the browser tab</li>
            </ul>
          </div>

          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={() => navigate('/student/exam-practice')}
              className="flex-1"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Practice
            </Button>
            <Button
              onClick={handleStartTest}
              className="flex-1"
            >
              <Play className="h-4 w-4 mr-2" />
              Start Test
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
              testConfig.mode === 'ai' 
                ? 'bg-purple-100 text-purple-600' 
                : 'bg-green-100 text-green-600'
            }`}>
              {testConfig.mode === 'ai' ? <Brain className="h-5 w-5" /> : <Users className="h-5 w-5" />}
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">{testConfig.title}</h1>
              <p className="text-sm text-gray-500">
                {testConfig.mode === 'ai' ? 'AI-Generated' : 'Teacher-Designed'} • {testConfig.subject}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            {/* Auto-save status */}
            <div className="flex items-center text-sm text-gray-500">
              <div className={`w-2 h-2 rounded-full mr-2 ${
                autoSaveStatus === 'saved' ? 'bg-green-500' : 
                autoSaveStatus === 'saving' ? 'bg-yellow-500' : 'bg-red-500'
              }`}></div>
              {autoSaveStatus === 'saved' ? 'Saved' : 
               autoSaveStatus === 'saving' ? 'Saving...' : 'Error'}
            </div>

            {/* Timer */}
            <div className={`flex items-center px-4 py-2 rounded-lg font-mono text-lg font-bold ${
              timeLeft < 300 ? 'bg-red-100 text-red-700' : 'bg-indigo-100 text-indigo-700'
            }`}>
              <Clock className="h-5 w-5 mr-2" />
              {formatTime(timeLeft)}
            </div>

            {/* Question Progress */}
            <div className="text-sm text-gray-600">
              Question {currentQuestion + 1} of {questions.length}
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Main Question Area */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="max-w-4xl mx-auto">
              {/* Question */}
              <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-center mb-4">
                      <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium mr-3">
                        Q{currentQuestion + 1}
                      </span>
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                        {questions[currentQuestion].topic}
                      </span>
                      <span className={`ml-2 px-3 py-1 rounded-full text-sm ${
                        questions[currentQuestion].difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                        questions[currentQuestion].difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {questions[currentQuestion].difficulty}
                      </span>
                    </div>
                    <h2 className="text-xl font-medium text-gray-900 leading-relaxed">
                      {questions[currentQuestion].question}
                    </h2>
                  </div>
                  <Button
                    variant="outline"
                    onClick={handleMarkForReview}
                    className={`ml-4 ${
                      questions[currentQuestion].isMarkedForReview 
                        ? 'bg-orange-100 text-orange-700 border-orange-300' 
                        : ''
                    }`}
                  >
                    <Flag className="h-4 w-4 mr-2" />
                    {questions[currentQuestion].isMarkedForReview ? 'Marked' : 'Mark for Review'}
                  </Button>
                </div>

                {/* Options */}
                <div className="space-y-3">
                  {questions[currentQuestion].options.map((option, index) => (
                    <label
                      key={index}
                      className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                        questions[currentQuestion].userAnswer === index
                          ? 'border-indigo-500 bg-indigo-50'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name={`question-${currentQuestion}`}
                        value={index}
                        checked={questions[currentQuestion].userAnswer === index}
                        onChange={() => handleAnswerSelect(index)}
                        className="sr-only"
                      />
                      <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center ${
                        questions[currentQuestion].userAnswer === index
                          ? 'border-indigo-500 bg-indigo-500'
                          : 'border-gray-300'
                      }`}>
                        {questions[currentQuestion].userAnswer === index && (
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </div>
                      <span className="text-gray-900">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center">
                <Button
                  variant="outline"
                  onClick={handlePreviousQuestion}
                  disabled={currentQuestion === 0}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowQuestionPalette(!showQuestionPalette)}
                  >
                    {showQuestionPalette ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
                    Question Palette
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={handleSubmitTest}
                    className="text-red-600 border-red-300 hover:bg-red-50"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Submit Test
                  </Button>
                </div>

                <Button
                  onClick={handleNextQuestion}
                  disabled={currentQuestion === questions.length - 1}
                >
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Question Palette Sidebar */}
        <AnimatePresence>
          {showQuestionPalette && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 320, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white border-l border-gray-200 overflow-hidden"
            >
              <div className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Question Palette</h3>
                
                {/* Legend */}
                <div className="grid grid-cols-2 gap-2 mb-6 text-xs">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
                    <span>Answered</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-purple-500 rounded mr-2"></div>
                    <span>Marked</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-gray-200 rounded mr-2"></div>
                    <span>Not Visited</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-indigo-600 rounded mr-2"></div>
                    <span>Current</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="font-semibold text-gray-900">{attemptedCount}</div>
                    <div className="text-gray-500">Answered</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="font-semibold text-gray-900">{markedCount}</div>
                    <div className="text-gray-500">Marked</div>
                  </div>
                </div>

                {/* Question Grid */}
                <div className="grid grid-cols-5 gap-2">
                  {questions.map((question, index) => {
                    const status = index === currentQuestion ? 'current' : getQuestionStatus(question);
                    return (
                      <button
                        key={question.id}
                        onClick={() => handleQuestionJump(index)}
                        className={`w-10 h-10 rounded text-sm font-medium transition-all duration-200 ${getStatusColor(status)}`}
                      >
                        {index + 1}
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Submit Confirmation Modal */}
      <AnimatePresence>
        {showSubmitConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full"
            >
              <div className="text-center mb-6">
                <AlertTriangle className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Submit Test?</h3>
                <p className="text-gray-600">
                  Are you sure you want to submit your test? You have answered {attemptedCount} out of {questions.length} questions.
                </p>
              </div>

              <div className="flex gap-4">
                <Button
                  variant="outline"
                  onClick={() => setShowSubmitConfirm(false)}
                  className="flex-1"
                >
                  Continue Test
                </Button>
                <Button
                  onClick={confirmSubmitTest}
                  className="flex-1 bg-red-600 hover:bg-red-700"
                >
                  Submit Test
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MockTestPage;