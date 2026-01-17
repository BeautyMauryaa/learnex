import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Play, 
  BookOpen, 
  Brain, 
  MessageSquare, 
  CheckCircle2, 
  Clock, 
  Target,
  Award,
  TrendingUp,
  FileText,
  Users,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../components/Button';

interface Topic {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'locked';
  progress: number;
  estimatedTime: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  resources: {
    notes: number;
    quizzes: number;
    videos: number;
  };
}

interface SubjectData {
  id: string;
  name: string;
  description: string;
  totalTopics: number;
  completedTopics: number;
  overallProgress: number;
  nextMilestone: string;
  topics: Topic[];
  stats: {
    studyTime: string;
    averageScore: number;
    rank: number;
    streak: number;
  };
}

// Mock data - in real app, this would come from API
const mockSubjectData: { [key: string]: SubjectData } = {
  mathematics: {
    id: 'mathematics',
    name: 'Mathematics',
    description: 'Master the language of numbers, patterns, and logical reasoning',
    totalTopics: 12,
    completedTopics: 9,
    overallProgress: 75,
    nextMilestone: 'Complete Calculus to unlock Advanced Topics',
    stats: {
      studyTime: '24.5h',
      averageScore: 85,
      rank: 78,
      streak: 7
    },
    topics: [
      {
        id: 'algebra',
        title: 'Algebra Fundamentals',
        description: 'Variables, equations, and algebraic expressions',
        status: 'completed',
        progress: 100,
        estimatedTime: '2h 30m',
        difficulty: 'Easy',
        resources: { notes: 5, quizzes: 3, videos: 8 }
      },
      {
        id: 'geometry',
        title: 'Geometry',
        description: 'Shapes, angles, and spatial relationships',
        status: 'completed',
        progress: 100,
        estimatedTime: '3h 15m',
        difficulty: 'Medium',
        resources: { notes: 7, quizzes: 4, videos: 12 }
      },
      {
        id: 'trigonometry',
        title: 'Trigonometry',
        description: 'Sine, cosine, tangent and their applications',
        status: 'in-progress',
        progress: 60,
        estimatedTime: '4h 00m',
        difficulty: 'Medium',
        resources: { notes: 6, quizzes: 5, videos: 10 }
      },
      {
        id: 'calculus',
        title: 'Calculus',
        description: 'Derivatives, integrals, and limits',
        status: 'locked',
        progress: 0,
        estimatedTime: '6h 30m',
        difficulty: 'Hard',
        resources: { notes: 8, quizzes: 6, videos: 15 }
      }
    ]
  },
  physics: {
    id: 'physics',
    name: 'Physics',
    description: 'Understand the fundamental laws governing our universe',
    totalTopics: 15,
    completedTopics: 9,
    overallProgress: 60,
    nextMilestone: 'Complete Mechanics to unlock Thermodynamics',
    stats: {
      studyTime: '18.2h',
      averageScore: 78,
      rank: 65,
      streak: 5
    },
    topics: [
      {
        id: 'kinematics',
        title: 'Kinematics',
        description: 'Motion in one and two dimensions',
        status: 'completed',
        progress: 100,
        estimatedTime: '3h 00m',
        difficulty: 'Easy',
        resources: { notes: 6, quizzes: 4, videos: 10 }
      },
      {
        id: 'dynamics',
        title: 'Dynamics',
        description: 'Forces and Newton\'s laws of motion',
        status: 'completed',
        progress: 100,
        estimatedTime: '4h 30m',
        difficulty: 'Medium',
        resources: { notes: 8, quizzes: 5, videos: 12 }
      },
      {
        id: 'mechanics',
        title: 'Mechanics',
        description: 'Work, energy, and momentum',
        status: 'in-progress',
        progress: 45,
        estimatedTime: '5h 15m',
        difficulty: 'Medium',
        resources: { notes: 7, quizzes: 6, videos: 14 }
      },
      {
        id: 'thermodynamics',
        title: 'Thermodynamics',
        description: 'Heat, temperature, and energy transfer',
        status: 'locked',
        progress: 0,
        estimatedTime: '6h 00m',
        difficulty: 'Hard',
        resources: { notes: 9, quizzes: 7, videos: 16 }
      }
    ]
  },
  chemistry: {
    id: 'chemistry',
    name: 'Chemistry',
    description: 'Explore the composition, structure, and properties of matter',
    totalTopics: 10,
    completedTopics: 8,
    overallProgress: 85,
    nextMilestone: 'Complete Organic Chemistry to unlock Biochemistry',
    stats: {
      studyTime: '22.8h',
      averageScore: 92,
      rank: 92,
      streak: 12
    },
    topics: [
      {
        id: 'atomic-structure',
        title: 'Atomic Structure',
        description: 'Atoms, electrons, and periodic table',
        status: 'completed',
        progress: 100,
        estimatedTime: '2h 45m',
        difficulty: 'Easy',
        resources: { notes: 5, quizzes: 3, videos: 8 }
      },
      {
        id: 'chemical-bonding',
        title: 'Chemical Bonding',
        description: 'Ionic, covalent, and metallic bonds',
        status: 'completed',
        progress: 100,
        estimatedTime: '3h 30m',
        difficulty: 'Medium',
        resources: { notes: 6, quizzes: 4, videos: 10 }
      },
      {
        id: 'organic-chemistry',
        title: 'Organic Chemistry',
        description: 'Carbon compounds and their reactions',
        status: 'in-progress',
        progress: 70,
        estimatedTime: '5h 00m',
        difficulty: 'Hard',
        resources: { notes: 8, quizzes: 6, videos: 15 }
      }
    ]
  },
  biology: {
    id: 'biology',
    name: 'Biology',
    description: 'Study of living organisms and their interactions',
    totalTopics: 14,
    completedTopics: 6,
    overallProgress: 45,
    nextMilestone: 'Complete Cell Biology to unlock Genetics',
    stats: {
      studyTime: '12.5h',
      averageScore: 72,
      rank: 45,
      streak: 3
    },
    topics: [
      {
        id: 'cell-structure',
        title: 'Cell Structure',
        description: 'Basic unit of life and its components',
        status: 'completed',
        progress: 100,
        estimatedTime: '2h 30m',
        difficulty: 'Easy',
        resources: { notes: 4, quizzes: 3, videos: 7 }
      },
      {
        id: 'cell-biology',
        title: 'Cell Biology',
        description: 'Cellular processes and functions',
        status: 'in-progress',
        progress: 35,
        estimatedTime: '4h 15m',
        difficulty: 'Medium',
        resources: { notes: 6, quizzes: 5, videos: 12 }
      },
      {
        id: 'genetics',
        title: 'Genetics',
        description: 'Heredity and genetic variation',
        status: 'locked',
        progress: 0,
        estimatedTime: '5h 30m',
        difficulty: 'Hard',
        resources: { notes: 8, quizzes: 6, videos: 14 }
      }
    ]
  },
  'computer-science': {
    id: 'computer-science',
    name: 'Computer Science',
    description: 'Programming, algorithms, and computational thinking',
    totalTopics: 8,
    completedTopics: 7,
    overallProgress: 90,
    nextMilestone: 'Complete Data Structures to unlock Advanced Algorithms',
    stats: {
      studyTime: '35.2h',
      averageScore: 95,
      rank: 95,
      streak: 15
    },
    topics: [
      {
        id: 'programming-basics',
        title: 'Programming Basics',
        description: 'Variables, loops, and functions',
        status: 'completed',
        progress: 100,
        estimatedTime: '4h 00m',
        difficulty: 'Easy',
        resources: { notes: 6, quizzes: 4, videos: 12 }
      },
      {
        id: 'data-structures',
        title: 'Data Structures',
        description: 'Arrays, linked lists, stacks, and queues',
        status: 'in-progress',
        progress: 80,
        estimatedTime: '6h 30m',
        difficulty: 'Medium',
        resources: { notes: 8, quizzes: 6, videos: 18 }
      },
      {
        id: 'algorithms',
        title: 'Advanced Algorithms',
        description: 'Sorting, searching, and optimization',
        status: 'locked',
        progress: 0,
        estimatedTime: '8h 00m',
        difficulty: 'Hard',
        resources: { notes: 10, quizzes: 8, videos: 20 }
      }
    ]
  },
  english: {
    id: 'english',
    name: 'English',
    description: 'Language skills, literature, and communication',
    totalTopics: 16,
    completedTopics: 11,
    overallProgress: 70,
    nextMilestone: 'Complete Literature to unlock Creative Writing',
    stats: {
      studyTime: '19.7h',
      averageScore: 82,
      rank: 70,
      streak: 8
    },
    topics: [
      {
        id: 'grammar',
        title: 'Grammar Fundamentals',
        description: 'Parts of speech, sentence structure',
        status: 'completed',
        progress: 100,
        estimatedTime: '3h 00m',
        difficulty: 'Easy',
        resources: { notes: 5, quizzes: 4, videos: 9 }
      },
      {
        id: 'literature',
        title: 'Literature',
        description: 'Poetry, prose, and literary analysis',
        status: 'in-progress',
        progress: 55,
        estimatedTime: '5h 45m',
        difficulty: 'Medium',
        resources: { notes: 7, quizzes: 5, videos: 13 }
      },
      {
        id: 'creative-writing',
        title: 'Creative Writing',
        description: 'Essays, stories, and composition',
        status: 'locked',
        progress: 0,
        estimatedTime: '4h 30m',
        difficulty: 'Medium',
        resources: { notes: 6, quizzes: 4, videos: 11 }
      }
    ]
  }
};

const TopicCard: React.FC<{ topic: Topic; index: number }> = ({ topic, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      case 'in-progress': return <Play className="h-5 w-5 text-indigo-600" />;
      case 'locked': return <Clock className="h-5 w-5 text-gray-400" />;
      default: return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-700 border-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Hard': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`bg-white rounded-xl p-6 border shadow-sm hover:shadow-md transition-all duration-300 ${
        topic.status === 'locked' ? 'opacity-60 border-gray-200' : 'border-gray-200 hover:border-indigo-200'
      }`}
    >
      {/* Topic Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center mb-2">
            {getStatusIcon(topic.status)}
            <h3 className="text-lg font-semibold text-gray-900 ml-2">{topic.title}</h3>
          </div>
          <p className="text-gray-600 text-sm mb-3">{topic.description}</p>
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(topic.difficulty)}`}>
            {topic.difficulty}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      {topic.status !== 'locked' && (
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span>{topic.progress}%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${topic.progress}%` }}
              transition={{ duration: 1, delay: index * 0.2 }}
              className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full"
            />
          </div>
        </div>
      )}

      {/* Topic Stats */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center text-gray-600">
          <Clock className="h-4 w-4 mr-2 text-gray-400" />
          <span className="text-sm">{topic.estimatedTime}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <FileText className="h-4 w-4 mr-2 text-gray-400" />
          <span className="text-sm">{topic.resources.notes} Notes</span>
        </div>
      </div>

      {/* Expandable Resources */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-gray-200 pt-4 mb-4"
          >
            <h4 className="font-medium text-gray-900 mb-3">Available Resources</h4>
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                <BookOpen className="h-5 w-5 text-indigo-600 mx-auto mb-1" />
                <p className="text-sm font-medium text-gray-900">{topic.resources.notes}</p>
                <p className="text-xs text-gray-600">Notes</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                <Brain className="h-5 w-5 text-indigo-600 mx-auto mb-1" />
                <p className="text-sm font-medium text-gray-900">{topic.resources.quizzes}</p>
                <p className="text-xs text-gray-600">Quizzes</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                <Play className="h-5 w-5 text-indigo-600 mx-auto mb-1" />
                <p className="text-sm font-medium text-gray-900">{topic.resources.videos}</p>
                <p className="text-xs text-gray-600">Videos</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Buttons */}
      <div className="flex gap-3">
        {topic.status !== 'locked' ? (
          <>
            <Button 
              className="flex-1"
              disabled={topic.status === 'completed'}
            >
              {topic.status === 'completed' ? 'Completed' : 'Start Topic'}
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setIsExpanded(!isExpanded)}
              className="px-4"
            >
              {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </>
        ) : (
          <Button variant="outline" className="flex-1" disabled>
            Locked
          </Button>
        )}
      </div>

      {/* Quick Actions for Active Topics */}
      {topic.status === 'in-progress' && (
        <div className="mt-4 flex gap-2">
          <Button variant="outline" size="sm" className="flex-1">
            <BookOpen className="h-4 w-4 mr-1" />
            Notes
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            <Brain className="h-4 w-4 mr-1" />
            Quiz
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            <MessageSquare className="h-4 w-4 mr-1" />
            Ask AI
          </Button>
        </div>
      )}
    </motion.div>
  );
};

const SubjectDetailPage: React.FC = () => {
  const { subjectId } = useParams<{ subjectId: string }>();
  const navigate = useNavigate();
  
  const subjectData = mockSubjectData[subjectId || ''];

  if (!subjectData) {
    return (
      <div className="p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Subject Not Found</h1>
          <Button onClick={() => navigate('/student/subjects')}>
            Back to Subjects
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <button 
          onClick={() => navigate('/student/subjects')}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Subjects
        </button>
        
        <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
            <div className="mb-6 lg:mb-0">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{subjectData.name}</h1>
              <p className="text-gray-600 text-lg mb-4">{subjectData.description}</p>
              <div className="flex items-center text-indigo-600">
                <Target className="h-5 w-5 mr-2" />
                <span className="font-medium">{subjectData.nextMilestone}</span>
              </div>
            </div>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                <TrendingUp className="h-6 w-6 text-indigo-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{subjectData.overallProgress}%</p>
                <p className="text-xs text-gray-600">Progress</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                <Award className="h-6 w-6 text-indigo-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{subjectData.stats.averageScore}%</p>
                <p className="text-xs text-gray-600">Avg Score</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                <Clock className="h-6 w-6 text-indigo-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{subjectData.stats.studyTime}</p>
                <p className="text-xs text-gray-600">Study Time</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                <Users className="h-6 w-6 text-indigo-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">#{subjectData.stats.rank}</p>
                <p className="text-xs text-gray-600">Rank</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Topics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjectData.topics.map((topic, index) => (
          <TopicCard key={topic.id} topic={topic} index={index} />
        ))}
      </div>
    </div>
  );
};

export default SubjectDetailPage;