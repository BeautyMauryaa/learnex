import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calculator, 
  Zap, 
  Beaker, 
  Microscope, 
  Monitor, 
  BookOpen, 
  Clock, 
  Users, 
  ArrowRight,
  TrendingUp,
  Award
} from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../../components/Button';

interface Subject {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  progress: number;
  topics: number;
  completedTopics: number;
  nextTopic: string;
  students: number;
  rank: number;
}

const subjects: Subject[] = [
  {
    id: 'mathematics',
    name: 'Mathematics',
    icon: Calculator,
    progress: 75,
    topics: 12,
    completedTopics: 9,
    nextTopic: 'Calculus',
    students: 245,
    rank: 78
  },
  {
    id: 'physics',
    name: 'Physics',
    icon: Zap,
    progress: 60,
    topics: 15,
    completedTopics: 9,
    nextTopic: 'Mechanics',
    students: 180,
    rank: 65
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    icon: Beaker,
    progress: 85,
    topics: 10,
    completedTopics: 8,
    nextTopic: 'Organic Chemistry',
    students: 210,
    rank: 92
  },
  {
    id: 'biology',
    name: 'Biology',
    icon: Microscope,
    progress: 45,
    topics: 14,
    completedTopics: 6,
    nextTopic: 'Cell Biology',
    students: 195,
    rank: 45
  },
  {
    id: 'computer-science',
    name: 'Computer Science',
    icon: Monitor,
    progress: 90,
    topics: 8,
    completedTopics: 7,
    nextTopic: 'Data Structures',
    students: 220,
    rank: 95
  },
  {
    id: 'english',
    name: 'English',
    icon: BookOpen,
    progress: 70,
    topics: 16,
    completedTopics: 11,
    nextTopic: 'Literature',
    students: 260,
    rank: 70
  }
];

const SubjectCard: React.FC<{ subject: Subject; index: number }> = ({ subject, index }) => {
  const navigate = useNavigate();
  const Icon = subject.icon;

  const handleViewSubject = () => {
    navigate(`/student/subject/${subject.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all duration-300">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-indigo-50 border border-indigo-100">
              <Icon className="h-6 w-6 text-indigo-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">{subject.name}</h3>
              <p className="text-sm text-gray-500">{subject.completedTopics}/{subject.topics} topics completed</p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-2xl font-bold text-indigo-900">{subject.progress}%</div>
            {subject.rank >= 80 && (
              <div className="text-xs text-indigo-600 font-medium">Top performer</div>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span>{subject.progress}% Complete</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${subject.progress}%` }}
              transition={{ duration: 1.5, delay: index * 0.2, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full"
            />
          </div>
        </div>

        {/* Subject Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center text-gray-600">
            <Clock className="h-4 w-4 mr-2 text-gray-400" />
            <div>
              <p className="text-xs text-gray-500">Next Topic</p>
              <p className="text-sm font-medium text-gray-900">{subject.nextTopic}</p>
            </div>
          </div>
          <div className="flex items-center text-gray-600">
            <Users className="h-4 w-4 mr-2 text-gray-400" />
            <div>
              <p className="text-xs text-gray-500">Students</p>
              <p className="text-sm font-medium text-gray-900">{subject.students.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Motivational Text */}
        <div className="mb-6">
          <div className="p-3 bg-gray-50 rounded-lg border-l-4 border-indigo-500">
            <p className="text-sm text-gray-700">
              {subject.rank >= 80 
                ? `You're ahead of ${subject.rank}% of students!`
                : "Keep practicing to improve your ranking"
              }
            </p>
          </div>
        </div>

        {/* Action Button */}
        <Button
          onClick={handleViewSubject}
          className="w-full"
        >
          View Subject
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </motion.div>
  );
};

const PerformanceBadge: React.FC = () => {
  const topSubjects = subjects.filter(s => s.rank >= 80).length;
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
    >
      <div className="flex items-center">
        <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-100 mr-4">
          <Award className="h-8 w-8 text-indigo-600" />
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Great Progress!</h3>
          <p className="text-gray-600">
            You're excelling in {topSubjects} subjects. Keep up the momentum!
          </p>
        </div>
        
        <div className="ml-auto">
          <TrendingUp className="h-6 w-6 text-indigo-600" />
        </div>
      </div>
    </motion.div>
  );
};

const SubjectsPage: React.FC = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-2xl font-bold text-gray-900 mb-2">My Subjects</h1>
        <p className="text-gray-600">Track your progress across different subjects</p>
      </motion.div>

      {/* Subjects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {subjects.map((subject, index) => (
          <SubjectCard key={subject.id} subject={subject} index={index} />
        ))}
      </div>

      {/* Performance Badge */}
      <PerformanceBadge />
    </div>
  );
};

export default SubjectsPage;