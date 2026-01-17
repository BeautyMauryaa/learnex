import React, { useState } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';
import Button from '../components/Button';
import Input from '../components/Input';
import Toast, { ToastType } from '../components/Toast';

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  userAnswer?: number;
}

const QuizPage: React.FC = () => {
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('medium');
  const [isGenerating, setIsGenerating] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[] | null>(null);
  const [currentStep, setCurrentStep] = useState<'form' | 'quiz' | 'results'>('form');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<ToastType>('success');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  
  const handleGenerateQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!subject || !topic) {
      setShowToast(true);
      setToastMessage('Please fill in all required fields');
      setToastType('error');
      return;
    }
    
    setIsGenerating(true);
    
    // Mock quiz generation (would use AI API in a real app)
    setTimeout(() => {
      setIsGenerating(false);
      
      // Mock questions
      const mockQuestions: QuizQuestion[] = [
        {
          question: 'What is the powerhouse of the cell?',
          options: ['Nucleus', 'Mitochondria', 'Endoplasmic Reticulum', 'Golgi Apparatus'],
          correctAnswer: 1
        },
        {
          question: 'Which of the following is NOT a type of cell division?',
          options: ['Mitosis', 'Meiosis', 'Photosynthesis', 'Binary Fission'],
          correctAnswer: 2
        },
        {
          question: 'The cell membrane is primarily composed of:',
          options: ['Carbohydrates', 'Proteins', 'Lipids', 'Phospholipid bilayer'],
          correctAnswer: 3
        },
        {
          question: 'Which organelle is responsible for protein synthesis?',
          options: ['Ribosomes', 'Lysosomes', 'Vacuoles', 'Peroxisomes'],
          correctAnswer: 0
        },
        {
          question: 'Plant cells differ from animal cells because they contain:',
          options: ['Nucleus', 'Cell wall and chloroplasts', 'Mitochondria', 'Endoplasmic reticulum'],
          correctAnswer: 1
        }
      ];
      
      setQuizQuestions(mockQuestions);
      setCurrentStep('quiz');
      setShowToast(true);
      setToastMessage('Quiz generated successfully!');
      setToastType('success');
    }, 2000);
  };
  
  const handleAnswerSelect = (answerIndex: number) => {
    if (!quizQuestions) return;
    
    const updatedQuestions = [...quizQuestions];
    updatedQuestions[currentQuestion] = {
      ...updatedQuestions[currentQuestion],
      userAnswer: answerIndex
    };
    
    setQuizQuestions(updatedQuestions);
    
    // Move to next question or show results
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setCurrentStep('results');
    }
  };
  
  const calculateScore = () => {
    if (!quizQuestions) return 0;
    
    const correctAnswers = quizQuestions.filter(
      q => q.userAnswer !== undefined && q.userAnswer === q.correctAnswer
    ).length;
    
    return Math.round((correctAnswers / quizQuestions.length) * 100);
  };
  
  const resetQuiz = () => {
    setQuizQuestions(null);
    setCurrentQuestion(0);
    setCurrentStep('form');
  };
  
  return (
    <Layout>
      <div className="flex h-[calc(100vh-4rem)]">
        <Sidebar />
        
        <div className="flex-1 overflow-auto p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Quiz Generator</h1>
            <p className="text-gray-600">Create custom quizzes based on your study materials</p>
          </div>
          
          {currentStep === 'form' && (
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6 border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Create a New Quiz</h2>
              
              <form onSubmit={handleGenerateQuiz}>
                <Input
                  id="subject"
                  label="Subject"
                  placeholder="e.g., Biology, Mathematics, History"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                />
                
                <Input
                  id="topic"
                  label="Topic"
                  placeholder="e.g., Cell Biology, Calculus, World War II"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  required
                />
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Difficulty Level
                  </label>
                  <div className="flex space-x-4">
                    {['easy', 'medium', 'hard'].map((level) => (
                      <label key={level} className="flex items-center">
                        <input
                          type="radio"
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                          value={level}
                          checked={difficulty === level}
                          onChange={() => setDifficulty(level)}
                        />
                        <span className="ml-2 text-gray-700 capitalize">
                          {level}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Questions
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                    <option value="5">5 Questions</option>
                    <option value="10">10 Questions</option>
                    <option value="15">15 Questions</option>
                    <option value="20">20 Questions</option>
                  </select>
                </div>
                
                <Button
                  type="submit"
                  disabled={isGenerating}
                  className="w-full"
                >
                  {isGenerating ? 'Generating Quiz...' : 'Generate Quiz'}
                </Button>
              </form>
            </div>
          )}
          
          {currentStep === 'quiz' && quizQuestions && (
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6 border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  {subject}: {topic}
                </h2>
                <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
                  Question {currentQuestion + 1} of {quizQuestions.length}
                </span>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-medium text-gray-900 mb-4">
                  {quizQuestions[currentQuestion].question}
                </h3>
                
                <div className="space-y-3">
                  {quizQuestions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      className="w-full text-left px-4 py-3 border border-gray-300 rounded-md hover:bg-indigo-50 hover:border-indigo-300 transition-colors"
                      onClick={() => handleAnswerSelect(index)}
                    >
                      <span className="inline-block w-6 h-6 rounded-full bg-indigo-100 text-indigo-800 text-center font-medium mr-3">
                        {String.fromCharCode(65 + index)}
                      </span>
                      {option}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                  disabled={currentQuestion === 0}
                >
                  Previous
                </Button>
                <div className="flex gap-1">
                  {quizQuestions.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full ${
                        index === currentQuestion
                          ? 'bg-indigo-600'
                          : index < currentQuestion
                          ? 'bg-indigo-300'
                          : 'bg-gray-200'
                      }`}
                    ></div>
                  ))}
                </div>
                <Button
                  variant="outline"
                  onClick={() => {
                    if (currentQuestion < quizQuestions.length - 1) {
                      setCurrentQuestion(currentQuestion + 1);
                    } else {
                      setCurrentStep('results');
                    }
                  }}
                  disabled={currentQuestion === quizQuestions.length - 1}
                >
                  Skip
                </Button>
              </div>
            </div>
          )}
          
          {currentStep === 'results' && quizQuestions && (
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-lg shadow p-6 border border-gray-100 mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Quiz Results</h2>
                
                <div className="flex items-center justify-center mb-6">
                  <div className="relative w-40 h-40">
                    <div className="w-40 h-40 rounded-full bg-gray-100"></div>
                    <div className="absolute top-0 left-0 w-40 h-40 flex items-center justify-center">
                      <span className="text-4xl font-bold text-indigo-900">{calculateScore()}%</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-center mb-6">
                  <p className="text-lg font-medium">
                    {calculateScore() >= 80
                      ? 'Excellent work!'
                      : calculateScore() >= 60
                      ? 'Good job!'
                      : 'Keep practicing!'}
                  </p>
                  <p className="text-gray-600">
                    You answered {quizQuestions.filter(q => q.userAnswer === q.correctAnswer).length} out of {quizQuestions.length} questions correctly.
                  </p>
                </div>
                
                <div className="flex gap-4 justify-center">
                  <Button onClick={resetQuiz}>Create New Quiz</Button>
                  <Button variant="outline">Review Answers</Button>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Question Summary</h3>
                
                <div className="space-y-6">
                  {quizQuestions.map((q, index) => (
                    <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
                      <div className="flex items-start">
                        <div className="mr-2">
                          {q.userAnswer === q.correctAnswer ? (
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-500" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {index + 1}. {q.question}
                          </p>
                          <div className="mt-2 space-y-1">
                            {q.options.map((option, optIndex) => (
                              <div
                                key={optIndex}
                                className={`py-1 px-2 rounded ${
                                  optIndex === q.correctAnswer
                                    ? 'bg-green-50 text-green-800'
                                    : q.userAnswer === optIndex
                                    ? 'bg-red-50 text-red-800'
                                    : ''
                                }`}
                              >
                                <span className="inline-block w-5 text-center font-medium mr-2">
                                  {String.fromCharCode(65 + optIndex)}
                                </span>
                                {option}
                                {optIndex === q.correctAnswer && (
                                  <CheckCircle2 className="h-4 w-4 inline ml-2 text-green-500" />
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Toast Notification */}
      {showToast && (
        <Toast 
          message={toastMessage} 
          type={toastType} 
          onClose={() => setShowToast(false)}
        />
      )}
    </Layout>
  );
};

export default QuizPage;
