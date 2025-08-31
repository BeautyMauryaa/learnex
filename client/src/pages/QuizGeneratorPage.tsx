import React, { useState, useEffect } from "react";
import {
  Upload, FileText, Download, CheckCircle2, Brain, Book, Clock, X, Eye, Search,
  Play, Target, Zap, Star, Trophy, Edit, PenTool
} from "lucide-react";
import Button from "../components/Button";
import Toast, { ToastType } from "../components/Toast";

interface QuizHistory {
  id: string;
  title: string;
  subject: string;
  topic: string;
  score: number;
  totalQuestions: number;
  timeTaken: string;
  date: string;
  difficulty: string;
  type: "mcq" | "subjective";
}

interface SubjectiveQuestion {
  id: string;
  question: string;
  marks: number;
  topic: string;
  difficulty: string;
  sampleAnswer?: string;
  keywords: string[];
}

const motivationalQuotes = [
  "Champions train. Losers complain. 💪",
  "You miss 100% of the questions you don't practice. 🎯",
  "Each question you solve is a step closer to your goal. 🚀",
  "Even NASA started with practice quizzes. 🌟",
  "Don't wait for perfect. Start where you are. ✨",
  "Conquer one question at a time. Greatness is built through practice. 🏆"
];

const subjects = [
  "Physics", "Chemistry", "Mathematics", "Biology",
  "Computer Science", "English", "History", "Geography"
];

const QuizGeneratorPage: React.FC = () => {
  const [quizHistory, setQuizHistory] = useState<QuizHistory[]>([]);
  const [activeTab, setActiveTab] = useState<"mcq" | "subjective">("mcq");

  // MCQ Form Data
  const [mcqFormData, setMcqFormData] = useState({
    subject: "",
    topic: "",
    difficulty: "",
    numQuestions: 10,
    enableTimer: false,
    timerMinutes: 15,
    timerSeconds: 0
  });

  // Subjective Form Data
  const [subjectiveFormData, setSubjectiveFormData] = useState({
    subject: "",
    topic: "",
    difficulty: "",
    questionMarks: [] as number[],
    totalQuestions: 5,
    enableTimer: false,
    timerMinutes: 60,
    timerSeconds: 0
  });

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
const [isGenerating, setIsGenerating] = useState(false);
const [showToast, setShowToast] = useState(false);
const [toastMessage, setToastMessage] = useState("");
const [toastType, setToastType] = useState<ToastType>("success");
const [searchQuery, setSearchQuery] = useState("");
const [selectedQuiz, setSelectedQuiz] = useState<QuizHistory | null>(null);
const [isDragOver, setIsDragOver] = useState(false);
const [currentQuote, setCurrentQuote] = useState(0);
const [generatedSubjectiveQuestions, setGeneratedSubjectiveQuestions] = useState<SubjectiveQuestion[]>([]);
const [generateFromFile, setGenerateFromFile] = useState(false); // ✅ added
const [filteredSubjects, setFilteredSubjects] = useState<string[]>([]);

  // Fetch quiz history from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/quizzes")
      .then((res) => res.json())
      .then((data) => setQuizHistory(data))
      .catch((err) => console.error(err));
  }, []);

  // Rotate motivational quotes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % motivationalQuotes.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleMcqInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setMcqFormData(prev => ({
      ...prev,
      [name]: type === "checkbox"
        ? (e.target as HTMLInputElement).checked
        : type === "number" ? parseInt(value) || 0 : value
    }));
  };

  const handleSubjectiveInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setSubjectiveFormData(prev => ({
      ...prev,
      [name]: type === "checkbox"
        ? (e.target as HTMLInputElement).checked
        : type === "number" ? parseInt(value) || 0 : value
    }));
  };

  const handleMarksSelection = (marks: number) => {
    setSubjectiveFormData(prev => ({
      ...prev,
      questionMarks: prev.questionMarks.includes(marks)
        ? prev.questionMarks.filter(m => m !== marks)
        : [...prev.questionMarks, marks].sort((a, b) => a - b)
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
      setShowToast(true);
      setToastMessage(`File "${e.target.files[0].name}" uploaded successfully!`);
      setToastType("success");
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      setUploadedFile(files[0]);
      setShowToast(true);
      setToastMessage(`File "${files[0].name}" uploaded successfully!`);
      setToastType("success");
    }
  };

  const handleGenerateMcqQuiz = async () => {
    if (!mcqFormData.subject || !mcqFormData.difficulty || (!mcqFormData.topic && !uploadedFile)) {
      setShowToast(true);
      setToastMessage("Please complete all fields");
      setToastType("error");
      return;
    }

    setIsGenerating(true);
    try {
      const res = await fetch("http://localhost:5000/api/quizzes/mcq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mcqFormData),
      });
      const quiz = await res.json();
      setQuizHistory(prev => [quiz, ...prev]);
      setShowToast(true);
      setToastMessage("MCQ Quiz generated successfully!");
      setToastType("success");
    } catch (err) {
      setShowToast(true);
      setToastMessage("Error generating quiz");
      setToastType("error");
    }
    setIsGenerating(false);
  };

  const handleGenerateSubjectiveQuestions = async () => {
    if (!subjectiveFormData.subject || !subjectiveFormData.difficulty || (!subjectiveFormData.topic && !uploadedFile)) {
      setShowToast(true);
      setToastMessage("Please complete all fields");
      setToastType("error");
      return;
    }

    setIsGenerating(true);
    try {
      const res = await fetch("http://localhost:5000/api/quizzes/subjective", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(subjectiveFormData),
      });
      const quiz = await res.json();
      setQuizHistory(prev => [quiz, ...prev]);
      setShowToast(true);
      setToastMessage("Subjective Quiz generated successfully!");
      setToastType("success");
    } catch (err) {
      setShowToast(true);
      setToastMessage("Error generating subjective quiz");
      setToastType("error");
    }
    setIsGenerating(false);
  };

  const isMcqFormValid = mcqFormData.subject && mcqFormData.difficulty && (mcqFormData.topic || uploadedFile);
  const isSubjectiveFormValid = subjectiveFormData.subject && subjectiveFormData.difficulty &&
    (subjectiveFormData.topic || uploadedFile) && subjectiveFormData.questionMarks.length > 0;

  const filteredQuizHistory = quizHistory.filter(quiz =>
    quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    quiz.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    quiz.topic.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy": return "bg-green-100 text-green-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "hard": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getMarksColor = (marks: number) => {
    switch (marks) {
      case 2: return "bg-blue-100 text-blue-800";
      case 5: return "bg-purple-100 text-purple-800";
      case 10: return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Motivational Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 rounded-2xl p-8 mb-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 to-purple-900/90"></div>
        <div className="relative z-10 text-center">
          <div className="flex items-center justify-center mb-4">
            <Star className="h-8 w-8 text-yellow-400 mr-2 animate-pulse" />
            <Trophy className="h-10 w-10 text-yellow-400 mx-2" />
            <Star className="h-8 w-8 text-yellow-400 ml-2 animate-pulse" />
          </div>
          <blockquote className="text-2xl md:text-3xl font-bold text-white mb-2">
            {motivationalQuotes[currentQuote]}
          </blockquote>
          <p className="text-indigo-200 text-lg">Ready to test your knowledge? Let's create your perfect quiz!</p>
        </div>
        
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="quiz-grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#quiz-grid)" />
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Quiz Configuration Form */}
        <div className="xl:col-span-2 space-y-8">
          <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
            {/* Tab Navigation */}
            <div className="flex items-center mb-8">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setActiveTab('mcq')}
                  className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'mcq'
                      ? 'bg-white text-indigo-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Brain className="h-4 w-4 mr-2" />
                  MCQ Generator
                </button>
                <button
                  onClick={() => setActiveTab('subjective')}
                  className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'subjective'
                      ? 'bg-white text-indigo-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <PenTool className="h-4 w-4 mr-2" />
                  Subjective Generator
                </button>
              </div>
            </div>

            {/* MCQ Generator Tab */}
            {activeTab === 'mcq' && (
              <>
                <div className="flex items-center mb-6">
                  <Brain className="h-6 w-6 text-indigo-600 mr-3" />
                  <h2 className="text-xl font-semibold text-gray-900">MCQ Quiz Configuration</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Subject Selection */}
                  <div className="relative">
  <label className="block text-sm font-semibold text-gray-700 mb-2">
    <Book className="h-4 w-4 inline mr-2" />
    Enter Subject *
  </label>

  <input
    type="text"
    name="subject"
    value={mcqFormData.subject}
    onChange={(e) => {
      handleMcqInputChange(e);
      const query = e.target.value.toLowerCase();
      if (query) {
        setFilteredSubjects(
          subjects.filter((s) => s.toLowerCase().includes(query))
        );
      } else {
        setFilteredSubjects([]);
      }
    }}
    placeholder="Type any subject (e.g., History, AI, Biology, etc.)"
    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
  />

  {/* Suggestions Dropdown */}
  {filteredSubjects.length > 0 && (
    <ul className="absolute z-10 bg-white border border-gray-300 rounded-xl mt-1 w-full shadow-lg max-h-40 overflow-auto">
      {filteredSubjects.map((subject, idx) => (
        <li
          key={idx}
          className="px-4 py-2 cursor-pointer hover:bg-indigo-100"
          onClick={() => {
            setMcqFormData((prev) => ({ ...prev, subject }));
            setFilteredSubjects([]);
          }}
        >
          {subject}
        </li>
      ))}
    </ul>
  )}
</div>


                  {/* Topic Input */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Target className="h-4 w-4 inline mr-2" />
                      Topic Name
                    </label>
                    <input
                      type="text"
                      name="topic"
                      value={mcqFormData.topic}
                      onChange={handleMcqInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                      placeholder="e.g., Thermodynamics, Calculus"
                    />
                  </div>

                  {/* Difficulty */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Zap className="h-4 w-4 inline mr-2" />
                      Difficulty Level *
                    </label>
                    <select
                      name="difficulty"
                      value={mcqFormData.difficulty}
                      onChange={handleMcqInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    >
                      <option value="">Select difficulty</option>
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                    </select>
                  </div>

                  {/* Number of Questions */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <CheckCircle2 className="h-4 w-4 inline mr-2" />
                      Number of Questions
                    </label>
                    <input
                      type="number"
                      name="numQuestions"
                      value={mcqFormData.numQuestions}
                      onChange={handleMcqInputChange}
                      min="5"
                      max="50"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Timer Configuration */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <label className="flex items-center text-sm font-semibold text-gray-700">
                      <Clock className="h-4 w-4 mr-2" />
                      Enable Timer
                    </label>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="enableTimer"
                        checked={mcqFormData.enableTimer}
                        onChange={(e) => setMcqFormData(prev => ({ ...prev, enableTimer: e.target.checked }))}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>

                  {mcqFormData.enableTimer && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Minutes</label>
                        <input
                          type="number"
                          name="timerMinutes"
                          value={mcqFormData.timerMinutes}
                          onChange={handleMcqInputChange}
                          min="1"
                          max="180"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Seconds</label>
                        <input
                          type="number"
                          name="timerSeconds"
                          value={mcqFormData.timerSeconds}
                          onChange={handleMcqInputChange}
                          min="0"
                          max="59"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Generate Button */}
                <div className="mt-8">
                  <Button
                    onClick={handleGenerateMcqQuiz}
                    disabled={!isMcqFormValid || isGenerating}
                    className="w-full py-4 text-lg font-semibold"
                  >
                    {isGenerating ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                        Generating MCQ Quiz...
                      </>
                    ) : (
                      <>
                        <Zap className="h-5 w-5 mr-2" />
                        Generate MCQ Quiz
                      </>
                    )}
                  </Button>
                </div>
              </>
            )}

            {/* Subjective Generator Tab */}
            {activeTab === 'subjective' && (
              <>
                <div className="flex items-center mb-6">
                  <PenTool className="h-6 w-6 text-indigo-600 mr-3" />
                  <h2 className="text-xl font-semibold text-gray-900">Subjective Question Generator</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Subject Selection */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Book className="h-4 w-4 inline mr-2" />
                      Choose Subject *
                    </label>
                    <select
                      name="subject"
                      value={subjectiveFormData.subject}
                      onChange={handleSubjectiveInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    >
                      <option value="">Select a subject</option>
                      {subjects.map(subject => (
                        <option key={subject} value={subject}>{subject}</option>
                      ))}
                    </select>
                  </div>

                  {/* Topic Input */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Target className="h-4 w-4 inline mr-2" />
                      Topic Name
                    </label>
                    <input
                      type="text"
                      name="topic"
                      value={subjectiveFormData.topic}
                      onChange={handleSubjectiveInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                      placeholder="e.g., Thermodynamics, Calculus"
                    />
                  </div>

                  {/* Difficulty */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Zap className="h-4 w-4 inline mr-2" />
                      Difficulty Level *
                    </label>
                    <select
                      name="difficulty"
                      value={subjectiveFormData.difficulty}
                      onChange={handleSubjectiveInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    >
                      <option value="">Select difficulty</option>
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                    </select>
                  </div>

                  {/* Total Questions */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <CheckCircle2 className="h-4 w-4 inline mr-2" />
                      Total Questions
                    </label>
                    <input
                      type="number"
                      name="totalQuestions"
                      value={subjectiveFormData.totalQuestions}
                      onChange={handleSubjectiveInputChange}
                      min="1"
                      max="20"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Marks Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    <Edit className="h-4 w-4 inline mr-2" />
                    Select Question Types by Marks *
                  </label>
                  <div className="grid grid-cols-3 gap-4">
                    {[2, 5, 10].map(marks => (
                      <button
                        key={marks}
                        type="button"
                        onClick={() => handleMarksSelection(marks)}
                        className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                          subjectiveFormData.questionMarks.includes(marks)
                            ? 'border-indigo-500 bg-indigo-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="text-center">
                          <div className={`text-2xl font-bold mb-2 ${
                            subjectiveFormData.questionMarks.includes(marks) ? 'text-indigo-900' : 'text-gray-700'
                          }`}>
                            {marks}
                          </div>
                          <div className={`text-sm ${
                            subjectiveFormData.questionMarks.includes(marks) ? 'text-indigo-700' : 'text-gray-500'
                          }`}>
                            Marks
                          </div>
                          <div className={`text-xs mt-1 ${
                            subjectiveFormData.questionMarks.includes(marks) ? 'text-indigo-600' : 'text-gray-400'
                          }`}>
                            {marks === 2 ? 'Short Answer' : marks === 5 ? 'Medium Answer' : 'Long Answer'}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                  {subjectiveFormData.questionMarks.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="text-sm text-gray-600">Selected:</span>
                      {subjectiveFormData.questionMarks.map(marks => (
                        <span key={marks} className={`px-2 py-1 rounded-full text-xs font-medium ${getMarksColor(marks)}`}>
                          {marks} marks
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Timer Configuration */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <label className="flex items-center text-sm font-semibold text-gray-700">
                      <Clock className="h-4 w-4 mr-2" />
                      Enable Timer
                    </label>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="enableTimer"
                        checked={subjectiveFormData.enableTimer}
                        onChange={(e) => setSubjectiveFormData(prev => ({ ...prev, enableTimer: e.target.checked }))}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>

                  {subjectiveFormData.enableTimer && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Minutes</label>
                        <input
                          type="number"
                          name="timerMinutes"
                          value={subjectiveFormData.timerMinutes}
                          onChange={handleSubjectiveInputChange}
                          min="1"
                          max="180"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Seconds</label>
                        <input
                          type="number"
                          name="timerSeconds"
                          value={subjectiveFormData.timerSeconds}
                          onChange={handleSubjectiveInputChange}
                          min="0"
                          max="59"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Generate Button */}
                <div className="mt-8">
                  <Button
                    onClick={handleGenerateSubjectiveQuestions}
                    disabled={!isSubjectiveFormValid || isGenerating}
                    className="w-full py-4 text-lg font-semibold"
                  >
                    {isGenerating ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                        Generating Subjective Questions...
                      </>
                    ) : (
                      <>
                        <PenTool className="h-5 w-5 mr-2" />
                        Generate Subjective Questions
                      </>
                    )}
                  </Button>
                </div>
              </>
            )}

            {/* File Upload Section (Common for both tabs) */}
            <div className="border-t border-gray-200 pt-6 mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                📂 Generate Questions from Your Materials (Optional)
              </h3>
              
              <div 
                className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 mb-4 ${
                  isDragOver 
                    ? 'border-indigo-500 bg-indigo-50' 
                    : 'border-gray-300 hover:border-indigo-400 hover:bg-gray-50'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  id="quiz-file-upload"
                  className="hidden"
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={handleFileUpload}
                />
                <label htmlFor="quiz-file-upload" className="cursor-pointer">
                  <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-gray-600 mb-2 text-lg">
                    Drop your file here, or{' '}
                    <span className="text-indigo-600 font-semibold hover:text-indigo-700">browse</span>
                  </p>
                  <p className="text-sm text-gray-500">PDF, DOCX, or TXT (max 10MB)</p>
                </label>
              </div>

              {uploadedFile && (
                <div className="p-4 bg-indigo-50 rounded-xl flex items-center justify-between border border-indigo-200 mb-4">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-indigo-600 mr-3" />
                    <div>
                      <span className="text-sm font-medium text-indigo-900 block">
                        {uploadedFile.name}
                      </span>
                      <span className="text-xs text-indigo-600">
                        {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setUploadedFile(null)}
                    className="text-indigo-600 hover:text-indigo-800 p-1"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              )}

              {uploadedFile && (
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="generateFromFile"
                    checked={generateFromFile}
                    onChange={(e) => setGenerateFromFile(e.target.checked)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="generateFromFile" className="ml-2 text-sm text-gray-700">
                    Generate questions directly from this file content
                  </label>
                </div>
              )}
            </div>
          </div>

          {/* Generated Subjective Questions Display */}
          {generatedSubjectiveQuestions.length > 0 && (
            <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Generated Subjective Questions</h2>
                <div className="flex gap-3">
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                  <Button>
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Save Questions
                  </Button>
                </div>
              </div>

              <div className="space-y-6">
                {generatedSubjectiveQuestions.map((question, index) => (
                  <div key={question.id} className="border border-gray-200 rounded-xl p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                          Q{index + 1}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getMarksColor(question.marks)}`}>
                          {question.marks} Marks
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(question.difficulty)}`}>
                          {question.difficulty}
                        </span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">{question.question}</h3>
                      <p className="text-sm text-gray-600">Topic: {question.topic}</p>
                    </div>

                    {/* Sample Answer */}
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <h4 className="font-medium text-gray-900 mb-2">Sample Answer Structure:</h4>
                      <p className="text-sm text-gray-700">{question.sampleAnswer}</p>
                    </div>

                    {/* Keywords */}
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 mb-2">Key Points to Include:</h4>
                      <div className="flex flex-wrap gap-2">
                        {question.keywords.map((keyword, idx) => (
                          <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-sm">
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Answer Space */}
                    <div className="border-t border-gray-200 pt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Your Answer:</label>
                      <textarea
                        rows={question.marks === 2 ? 3 : question.marks === 5 ? 6 : 10}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder={`Write your ${question.marks}-mark answer here...`}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex gap-4">
                <Button className="flex-1">
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Submit for AI Review
                </Button>
                <Button variant="outline" onClick={() => setGeneratedSubjectiveQuestions([])}>
                  Generate New Set
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Quiz History Sidebar */}
        <div className="xl:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 sticky top-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">My Quiz History</h2>
              <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
               {quizHistory.length} Quizzes
              </span>
            </div>

            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  placeholder="Search quizzes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-4 max-h-96 overflow-y-auto">
              {filteredQuizHistory.map((quiz) => (
                <div
                  key={quiz.id}
                  className="p-4 rounded-xl bg-gray-50 hover:bg-gray-100 cursor-pointer transition-all duration-200 hover:shadow-md border border-gray-100"
                  onClick={() => setSelectedQuiz(quiz)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-gray-900 text-sm leading-tight">
                      {quiz.subject} - {quiz.topic}
                    </h3>
                    <div className="flex items-center gap-1">
                      {quiz.type === 'mcq' ? (
                        <Brain className="h-4 w-4 text-indigo-600" />
                      ) : (
                        <PenTool className="h-4 w-4 text-purple-600" />
                      )}
                      <button className="text-gray-400 hover:text-indigo-600 transition-colors">
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                    <span className="flex items-center">
                      <Book className="h-3 w-3 mr-1" />
                      {quiz.totalQuestions} Questions
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(quiz.difficulty)}`}>
                      {quiz.difficulty}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {quiz.timeTaken}
                    </span>
                    <span className="font-medium text-indigo-600">
                      {quiz.score}%
                    </span>
                  </div>
                  
                  <div className="mt-2 text-xs text-gray-500">
                    {quiz.date}
                  </div>
                  
                  <div className="mt-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      quiz.type === 'mcq' ? 'bg-indigo-100 text-indigo-700' : 'bg-purple-100 text-purple-700'
                    }`}>
                      {quiz.type === 'mcq' ? 'MCQ' : 'Subjective'}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {filteredQuizHistory.length === 0 && (
              <div className="text-center py-8">
                <Brain className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No quizzes found</p>
              </div>
            )}
          </div>
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

      {/* Quiz Preview Modal */}
      {selectedQuiz && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedQuiz.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <Book className="h-4 w-4 mr-1" />
                      {selectedQuiz.totalQuestions} Questions
                    </span>
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {selectedQuiz.timeTaken}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(selectedQuiz.difficulty)}`}>
                      {selectedQuiz.difficulty}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      selectedQuiz.type === 'mcq' ? 'bg-indigo-100 text-indigo-700' : 'bg-purple-100 text-purple-700'
                    }`}>
                      {selectedQuiz.type === 'mcq' ? 'MCQ' : 'Subjective'}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedQuiz(null)}
                  className="text-gray-400 hover:text-gray-600 p-2"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-green-600">Final Score</p>
                      <p className="text-2xl font-bold text-green-900">{selectedQuiz.score}%</p>
                    </div>
                    <Trophy className="h-8 w-8 text-green-600" />
                  </div>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-blue-600">Time Taken</p>
                      <p className="text-2xl font-bold text-blue-900">{selectedQuiz.timeTaken}</p>
                    </div>
                    <Clock className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-gray-600 mb-4">
                  Completed on {selectedQuiz.date}
                </p>
                <div className="flex gap-4 justify-center">
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download Report
                  </Button>
                  <Button>
                    <Play className="h-4 w-4 mr-2" />
                    {selectedQuiz.type === 'mcq' ? 'Retake Quiz' : 'Practice Again'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizGeneratorPage;