import React, { useState } from 'react';
import { BookOpen, CheckCircle2, HelpCircle, XCircle, Calendar as CalendarIcon, Clock, GraduationCap, ArrowRight, Brain, Users, Zap, Target, FileText, Code, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import Button from '../../components/Button';
import Input from '../../components/Input';
import 'react-calendar/dist/Calendar.css';

interface Exam {
  id: string;
  title: string;
  duration: string;
  subjects: string[];
  level: string;
  hasMockTest: boolean;
}

interface UpcomingExam extends Exam {
  date: string;
  time?: string;
  location?: string;
}

interface PreviousYearPaper {
  id: string;
  examName: string;
  year: number;
  paper: string;
  duration: string;
  subjects: string[];
  stream?: string;
}

const mockExamData = [
  {
    date: "2025-06-02",
    tests: [
      {
        id: "jee-mains",
        title: "JEE Mains Mock Test",
        duration: "3 Hours",
        subjects: ["Physics", "Chemistry", "Mathematics"],
        level: "Undergraduate",
        time: "10:00 AM"
      }
    ]
  },
  {
    date: "2025-06-05",
    tests: [
      {
        id: "ssc-mock-1",
        title: "SSC CGL Mock Test",
        duration: "2 Hours",
        subjects: ["Quantitative", "English", "Reasoning"],
        level: "Graduate",
        time: "2:00 PM"
      }
    ]
  }
];

const availableExams: Exam[] = [
  {
    id: 'jee-mains',
    title: 'JEE Mains',
    duration: '3 Hours',
    subjects: ['Physics', 'Chemistry', 'Mathematics'],
    level: 'Undergraduate',
    hasMockTest: true
  },
  {
    id: 'jee-advanced',
    title: 'JEE Advanced',
    duration: '3 Hours',
    subjects: ['Physics', 'Chemistry', 'Mathematics'],
    level: 'Undergraduate',
    hasMockTest: true
  },
  {
    id: 'ssc-cgl',
    title: 'SSC CGL',
    duration: '2 Hours',
    subjects: ['Quantitative Aptitude', 'English', 'Reasoning'],
    level: 'Graduate',
    hasMockTest: true
  },
  {
    id: 'neet-ug',
    title: 'NEET UG',
    duration: '3 Hours 20 Minutes',
    subjects: ['Physics', 'Chemistry', 'Biology'],
    level: 'Undergraduate',
    hasMockTest: true
  },
  {
    id: 'upsc-prelims',
    title: 'UPSC Prelims',
    duration: '2 Hours',
    subjects: ['General Studies', 'CSAT'],
    level: 'Graduate',
    hasMockTest: true
  },
  {
    id: 'gate',
    title: 'GATE',
    duration: '3 Hours',
    subjects: ['Core Subject', 'Engineering Mathematics', 'General Aptitude'],
    level: 'Graduate',
    hasMockTest: true
  }
];

const upcomingExams: UpcomingExam[] = [
  {
    id: 'gate-2024',
    title: 'GATE 2024',
    date: '2024-02-03',
    time: '10:00 AM',
    location: 'Online',
    duration: '3 Hours',
    subjects: ['Core Subject', 'Engineering Mathematics', 'General Aptitude'],
    level: 'Graduate',
    hasMockTest: false
  },
  {
    id: 'jee-mains-2024',
    title: 'JEE Mains 2024',
    date: '2024-01-24',
    time: '9:00 AM',
    location: 'Test Center',
    duration: '3 Hours',
    subjects: ['Physics', 'Chemistry', 'Mathematics'],
    level: 'Undergraduate',
    hasMockTest: false
  },
  {
    id: 'neet-2024',
    title: 'NEET 2024',
    date: '2024-05-05',
    time: '2:00 PM',
    location: 'Test Center',
    duration: '3 Hours 20 Minutes',
    subjects: ['Physics', 'Chemistry', 'Biology'],
    level: 'Undergraduate',
    hasMockTest: false
  }
];

const previousYearPapers: PreviousYearPaper[] = [
  {
    id: 'jee-mains-2023-1',
    examName: 'JEE Mains',
    year: 2023,
    paper: 'Paper 1',
    duration: '3 Hours',
    subjects: ['Physics', 'Chemistry', 'Mathematics']
  },
  {
    id: 'jee-mains-2022-1',
    examName: 'JEE Mains',
    year: 2022,
    paper: 'Paper 1',
    duration: '3 Hours',
    subjects: ['Physics', 'Chemistry', 'Mathematics']
  },
  {
    id: 'jee-adv-2023',
    examName: 'JEE Advanced',
    year: 2023,
    paper: 'Paper 1',
    duration: '3 Hours',
    subjects: ['Physics', 'Chemistry', 'Mathematics']
  },
  {
    id: 'neet-2023',
    examName: 'NEET UG',
    year: 2023,
    paper: 'Main Paper',
    duration: '3 Hours 20 Minutes',
    subjects: ['Physics', 'Chemistry', 'Biology']
  },
  {
    id: 'neet-2022',
    examName: 'NEET UG',
    year: 2022,
    paper: 'Main Paper',
    duration: '3 Hours 20 Minutes',
    subjects: ['Physics', 'Chemistry', 'Biology']
  },
  {
    id: 'gate-cs-2023',
    examName: 'GATE',
    year: 2023,
    paper: 'Computer Science',
    duration: '3 Hours',
    subjects: ['Computer Science', 'Engineering Mathematics'],
    stream: 'CSE'
  },
  {
    id: 'gate-ee-2023',
    examName: 'GATE',
    year: 2023,
    paper: 'Electrical Engineering',
    duration: '3 Hours',
    subjects: ['Electrical Engineering', 'Engineering Mathematics'],
    stream: 'EE'
  },
  {
    id: 'cuet-2023',
    examName: 'CUET',
    year: 2023,
    paper: 'Domain Subject',
    duration: '2 Hours',
    subjects: ['Physics', 'Chemistry', 'Mathematics']
  },
  {
    id: 'cat-2022',
    examName: 'CAT',
    year: 2022,
    paper: 'Main Paper',
    duration: '3 Hours',
    subjects: ['Quantitative Aptitude', 'Verbal Ability', 'Data Interpretation']
  },
  {
    id: 'upsc-2023',
    examName: 'UPSC Prelims',
    year: 2023,
    paper: 'General Studies',
    duration: '2 Hours',
    subjects: ['General Studies', 'Current Affairs']
  }
];

const MockTestSelectionModal: React.FC<{ 
  isOpen: boolean; 
  onClose: () => void; 
  examTitle: string;
  onSelectMode: (mode: 'ai' | 'teacher', subject?: string, teacherCode?: string) => void;
}> = ({ isOpen, onClose, examTitle, onSelectMode }) => {
  const [selectedMode, setSelectedMode] = useState<'ai' | 'teacher' | null>(null);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [teacherCode, setTeacherCode] = useState('');
  const [showSubjectSelection, setShowSubjectSelection] = useState(false);

  const subjects = ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'English', 'Reasoning'];

  const handleModeSelect = (mode: 'ai' | 'teacher') => {
    setSelectedMode(mode);
    setShowSubjectSelection(true);
  };

  const handleStartTest = () => {
    if (!selectedSubject) return;
    
    if (selectedMode === 'teacher' && !teacherCode) {
      alert('Please enter teacher code');
      return;
    }
    
    onSelectMode(selectedMode!, selectedSubject, teacherCode);
  };

  const resetModal = () => {
    setSelectedMode(null);
    setSelectedSubject('');
    setTeacherCode('');
    setShowSubjectSelection(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-4xl w-full p-8">
        {!showSubjectSelection ? (
          <>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Practice Mode</h2>
              <p className="text-gray-600">How would you like to practice for {examTitle}?</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* AI Generated Option */}
              <div 
                className="border-2 border-gray-200 rounded-xl p-6 hover:border-indigo-300 hover:bg-indigo-50 cursor-pointer transition-all duration-200"
                onClick={() => handleModeSelect('ai')}
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Brain className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">🧠 AI-Generated Mock Test</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Smart questions generated from latest trends and your weaknesses. Practice smarter, not harder!
                  </p>
                  <div className="space-y-2 text-xs text-gray-500">
                    <div className="flex items-center justify-center">
                      <Zap className="h-3 w-3 mr-1" />
                      Adaptive difficulty
                    </div>
                    <div className="flex items-center justify-center">
                      <Target className="h-3 w-3 mr-1" />
                      Personalized questions
                    </div>
                  </div>
                </div>
              </div>

              {/* Teacher Designed Option */}
              <div 
                className="border-2 border-gray-200 rounded-xl p-6 hover:border-green-300 hover:bg-green-50 cursor-pointer transition-all duration-200"
                onClick={() => handleModeSelect('teacher')}
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">👨‍🏫 Teacher-Designed Mock Test</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Attempt teacher-curated mock tests. Enter the test code shared by your instructor.
                  </p>
                  <div className="space-y-2 text-xs text-gray-500">
                    <div className="flex items-center justify-center">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Expert curated
                    </div>
                    <div className="flex items-center justify-center">
                      <BookOpen className="h-3 w-3 mr-1" />
                      Official patterns
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {selectedMode === 'ai' ? '🧠 AI-Generated Test' : '👨‍🏫 Teacher-Designed Test'}
              </h2>
              <p className="text-gray-600">Select subject and configure your test</p>
            </div>

            <div className="space-y-6 mb-8">
              {/* Subject Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Select Subject *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {subjects.map((subject) => (
                    <button
                      key={subject}
                      onClick={() => setSelectedSubject(subject)}
                      className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                        selectedSubject === subject
                          ? 'border-indigo-500 bg-indigo-50 text-indigo-900'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {subject}
                    </button>
                  ))}
                </div>
              </div>

              {/* Teacher Code Input (only for teacher mode) */}
              {selectedMode === 'teacher' && (
                <div>
                  <Input
                    id="teacherCode"
                    label="Teacher Code"
                    placeholder="Enter the code provided by your teacher"
                    value={teacherCode}
                    onChange={(e) => setTeacherCode(e.target.value)}
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    <Code className="h-4 w-4 inline mr-1" />
                    This code is provided by your instructor for accessing the specific test
                  </p>
                </div>
              )}
            </div>

            <div className="flex gap-4">
              <Button variant="outline" onClick={resetModal} className="flex-1">
                Back
              </Button>
              <Button 
                onClick={handleStartTest}
                disabled={!selectedSubject || (selectedMode === 'teacher' && !teacherCode)}
                className="flex-1"
              >
                Start Test
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const ExamPracticePage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showMockTestModal, setShowMockTestModal] = useState(false);
  const [selectedExam, setSelectedExam] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleStartExam = (examId: string, examTitle: string) => {
    setSelectedExam(examTitle);
    setShowMockTestModal(true);
  };

  const handleMockTestModeSelect = (mode: 'ai' | 'teacher', subject?: string, teacherCode?: string) => {
    setShowMockTestModal(false);
    // Navigate to mock test page (NOT My Exams)
    const params = new URLSearchParams({
      mode,
      subject: subject || '',
      ...(teacherCode && { teacherCode })
    });
    navigate(`/student/mocktest/${selectedExam.toLowerCase().replace(/\s+/g, '-')}?${params.toString()}`);
  };

  const handlePreviousYearPaper = (paperId: string) => {
    // Navigate to mock test page for previous year paper
    navigate(`/student/mocktest/previous-year/${paperId}`);
  };

  const handleViewDetails = (examId: string) => {
    navigate(`/exam/${examId}/details`);
  };

  const getExamsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return mockExamData.find(data => data.date === dateStr)?.tests || [];
  };

  const tileClassName = ({ date }: { date: Date }) => {
    const dateStr = date.toISOString().split('T')[0];
    return mockExamData.some(data => data.date === dateStr) 
      ? 'bg-indigo-50 text-indigo-900 font-medium'
      : '';
  };

  const tileContent = ({ date }: { date: Date }) => {
    const dateStr = date.toISOString().split('T')[0];
    const hasExam = mockExamData.some(data => data.date === dateStr);
    return hasExam ? (
      <div className="h-1 w-1 bg-indigo-600 rounded-full mx-auto mt-1"></div>
    ) : null;
  };

  const filteredExams = selectedDate ? getExamsForDate(selectedDate) : [];

  // Filter previous year papers based on search query
  const filteredPreviousYearPapers = previousYearPapers.filter(paper => {
    if (!searchQuery.trim()) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      paper.examName.toLowerCase().includes(query) ||
      paper.year.toString().includes(query) ||
      paper.paper.toLowerCase().includes(query) ||
      paper.subjects.some(subject => subject.toLowerCase().includes(query)) ||
      (paper.stream && paper.stream.toLowerCase().includes(query))
    );
  });

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Exam Practice</h1>
        <p className="text-gray-600 flex items-center mt-2">
          <Brain className="h-4 w-4 mr-2 text-indigo-600" />
          Choose how you'd like to practice. You can take AI-generated tests or those designed by teachers — anytime, anywhere.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Available Mock Tests */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Available Mock Tests</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableExams.map((exam) => (
                <div 
                  key={exam.id}
                  className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all duration-200"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">{exam.title}</h3>
                    {exam.hasMockTest && (
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">
                        Mock Test
                      </span>
                    )}
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-4 w-4 mr-2 text-gray-400" />
                      <span className="text-sm">{exam.duration}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <BookOpen className="h-4 w-4 mr-2 text-gray-400" />
                      <span className="text-sm">{exam.subjects.join(', ')}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <GraduationCap className="h-4 w-4 mr-2 text-gray-400" />
                      <span className="text-sm">{exam.level}</span>
                    </div>
                  </div>

                  <Button 
                    onClick={() => handleStartExam(exam.id, exam.title)}
                    className="w-full flex items-center justify-center"
                  >
                    Start Practice
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Previous Year Papers Section with Smart Search */}
          <div className="mb-8">
            <div className="bg-white rounded-xl p-8 border border-gray-100 shadow-sm">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mr-4">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">🔍 Search & Solve Your Paper</h2>
                  <p className="text-gray-600">Find and practice with specific previous year papers</p>
                </div>
              </div>

              {/* Smart Search Bar */}
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search exam paper (e.g. JEE Adv 2021 Maths, GATE CSE 2023, NEET Bio)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-gray-100 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                  />
                </div>
                <p className="text-sm text-gray-500 mt-2 flex items-center">
                  <Target className="h-4 w-4 mr-1" />
                  Try searching: "JEE 2023", "NEET Physics", "GATE CSE", "CAT 2022"
                </p>
              </div>

              {/* Search Results */}
              {filteredPreviousYearPapers.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredPreviousYearPapers.map((paper) => (
                    <div 
                      key={paper.id}
                      className="border border-gray-200 rounded-lg p-4 hover:border-orange-300 hover:bg-orange-50 cursor-pointer transition-all duration-200 group"
                      onClick={() => handlePreviousYearPaper(paper.id)}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-medium text-gray-900 group-hover:text-orange-900">
                            {paper.examName} {paper.year}
                          </h3>
                          <p className="text-sm text-gray-600">{paper.paper}</p>
                          {paper.stream && (
                            <span className="inline-block mt-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                              {paper.stream}
                            </span>
                          )}
                        </div>
                        <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full font-medium">
                          {paper.year}
                        </span>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-gray-600">
                          <Clock className="h-3 w-3 mr-2" />
                          <span className="text-xs">{paper.duration}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <BookOpen className="h-3 w-3 mr-2" />
                          <span className="text-xs">{paper.subjects.join(', ')}</span>
                        </div>
                      </div>
                      
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full text-orange-600 border-orange-200 hover:bg-orange-50 group-hover:border-orange-300"
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        Solve Paper
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No papers found</h3>
                  <p className="text-gray-500 mb-4">
                    {searchQuery.trim() 
                      ? `No papers match "${searchQuery}". Try another keyword.`
                      : "Start typing to search for specific exam papers"
                    }
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {['JEE 2023', 'NEET 2022', 'GATE CSE', 'CAT 2022'].map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => setSearchQuery(suggestion)}
                        className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm hover:bg-orange-200 transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Search Stats */}
              {searchQuery.trim() && (
                <div className="mt-6 p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <p className="text-sm text-orange-800">
                    <Search className="h-4 w-4 inline mr-1" />
                    Found <strong>{filteredPreviousYearPapers.length}</strong> papers matching "{searchQuery}"
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Upcoming Real Exams */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Upcoming Real Exams</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingExams.map((exam) => (
                <div 
                  key={exam.id}
                  className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:border-orange-200 transition-all duration-200"
                >
                  <div className="mb-4">
                    <h3 className="font-semibold text-gray-900">{exam.title}</h3>
                    <p className="text-sm text-orange-600 mt-1 font-medium">{exam.date}</p>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-4 w-4 mr-2 text-gray-400" />
                      <span className="text-sm">{exam.duration}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <BookOpen className="h-4 w-4 mr-2 text-gray-400" />
                      <span className="text-sm">{exam.subjects.join(', ')}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <GraduationCap className="h-4 w-4 mr-2 text-gray-400" />
                      <span className="text-sm">{exam.level}</span>
                    </div>
                  </div>

                  <Button 
                    variant="outline"
                    onClick={() => handleViewDetails(exam.id)}
                    className="w-full flex items-center justify-center text-orange-600 border-orange-200 hover:bg-orange-50"
                  >
                    View Details
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Calendar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm sticky top-6">
            <div className="flex items-center mb-4">
              <CalendarIcon className="h-5 w-5 text-gray-500 mr-2" />
              <h3 className="font-semibold text-gray-900">Practice Calendar</h3>
            </div>
            
            <div className="mb-6">
              <Calendar
                onChange={setSelectedDate}
                value={selectedDate}
                className="w-full rounded-lg border-none"
                tileClassName={tileClassName}
                tileContent={tileContent}
              />
            </div>

            {selectedDate && (
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">
                  Practice Tests on {selectedDate.toLocaleDateString()}
                </h4>
                {filteredExams.length > 0 ? (
                  filteredExams.map((exam) => (
                    <div key={exam.id} className="bg-gray-50 rounded-lg p-4">
                      <h5 className="font-medium text-gray-900">{exam.title}</h5>
                      <p className="text-sm text-gray-600">{exam.time}</p>
                      <div className="mt-2 space-y-1">
                        <div className="flex items-center text-gray-600">
                          <Clock className="h-4 w-4 mr-2" />
                          <span className="text-sm">{exam.duration}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <BookOpen className="h-4 w-4 mr-2" />
                          <span className="text-sm">{exam.subjects.join(', ')}</span>
                        </div>
                      </div>
                      <Button
                        onClick={() => handleStartExam(exam.id, exam.title)}
                        className="mt-3 w-full"
                      >
                        Start Practice
                      </Button>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600 text-center py-4">
                    No practice tests scheduled for this date
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mock Test Selection Modal */}
      <MockTestSelectionModal
        isOpen={showMockTestModal}
        onClose={() => setShowMockTestModal(false)}
        examTitle={selectedExam}
        onSelectMode={handleMockTestModeSelect}
      />
    </div>
  );
};

export default ExamPracticePage;