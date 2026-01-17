// ===== MyExamsPage.tsx =====
import { useState } from 'react';
import { Edit, Trash2, Eye, Users, Clock, Calendar, Filter } from 'lucide-react';

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
}

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
      createdAt: '2024-01-20'
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
      createdAt: '2024-01-22'
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
      createdAt: '2024-01-10'
    }
  ]);

  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('createdAt');

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

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this exam?')) {
      setExams(exams.filter(exam => exam.id !== id));
    }
  };

  const handlePublish = (id: number) => {
    setExams(exams.map(exam => 
      exam.id === id ? { ...exam, status: 'published' as const } : exam
    ));
  };

  const formatDateTime = (dateTime: string) => {
    return new Date(dateTime).toLocaleString();
  };

  return (
    <div className="p-4 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-[#14213D] mb-2">My Exams</h1>
          <p className="text-gray-600">Manage all your created examinations</p>
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
              <div className="text-3xl font-bold text-yellow-600 mb-1">
                {exams.filter(e => e.status === 'draft').length}
              </div>
              <div className="text-gray-600 text-sm">Drafts</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">
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
            <div className="space-y-4">
              {filteredExams.map((exam) => (
                <div key={exam.id} className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-semibold text-[#14213D]">{exam.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(exam.status)}`}>
                          {exam.status.charAt(0).toUpperCase() + exam.status.slice(1)}
                        </span>
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
                      {exam.status === 'completed' && (
                        <button className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200 transition-colors">
                          View Results
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
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyExamsPage;
