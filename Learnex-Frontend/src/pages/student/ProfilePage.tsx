import React, { useState } from 'react';
import { 
  Download,
  Share2,
  TrendingUp,
  Award,
  Target,
  Clock,
  BookOpen,
  Star,
  Trophy,
  Zap,
  CheckCircle2,
  Edit3,
  Camera,
  Linkedin,
  ExternalLink
} from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../../components/Button';
import Toast, { ToastType } from '../../components/Toast';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  unlocked: boolean;
  unlockedDate?: string;
  progress?: number;
}

const ProfilePage: React.FC = () => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<ToastType>('success');

  // Mock user data
  const userData = {
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    registrationId: 'STU2024001',
    dateOfBirth: '2005-03-15',
    mobile: '+91 9876543210',
    school: 'Delhi Public School',
    class: '12th Grade',
    stream: 'Science (PCM)',
    joinedDate: '2024-01-15',
    avatar: 'JD'
  };

  // Performance data for growth graph
  const performanceData = [
    { date: '2024-01-15', score: 65, accuracy: 70 },
    { date: '2024-01-22', score: 72, accuracy: 75 },
    { date: '2024-01-29', score: 68, accuracy: 73 },
    { date: '2024-02-05', score: 78, accuracy: 80 },
    { date: '2024-02-12', score: 85, accuracy: 85 },
    { date: '2024-02-19', score: 82, accuracy: 83 },
    { date: '2024-02-26', score: 90, accuracy: 88 },
    { date: '2024-03-05', score: 88, accuracy: 90 },
    { date: '2024-03-12', score: 92, accuracy: 92 },
    { date: '2024-03-19', score: 95, accuracy: 94 }
  ];

  // Quick stats
  const quickStats = {
    totalTests: 24,
    averageScore: 85,
    accuracy: 88,
    studyTime: '42.5h',
    currentStreak: 12,
    longestStreak: 18,
    rank: 78,
    improvement: '+15%'
  };

  // Dynamic achievements
  const achievements: Achievement[] = [
    {
      id: 'first-test',
      name: 'First Steps',
      description: 'Complete your first test',
      icon: Target,
      unlocked: true,
      unlockedDate: '2024-01-15'
    },
    {
      id: 'test-master',
      name: 'Test Master',
      description: 'Achieve 90%+ average in 5 tests',
      icon: Trophy,
      unlocked: true,
      unlockedDate: '2024-03-10'
    },
    {
      id: 'consistency-king',
      name: 'Consistency King',
      description: 'Maintain a 7-day study streak',
      icon: Zap,
      unlocked: true,
      unlockedDate: '2024-02-20'
    },
    {
      id: 'speed-demon',
      name: 'Speed Demon',
      description: 'Complete test in under 30 minutes',
      icon: Clock,
      unlocked: true,
      unlockedDate: '2024-02-28'
    },
    {
      id: 'perfectionist',
      name: 'Perfectionist',
      description: 'Score 100% in any test',
      icon: Star,
      unlocked: false,
      progress: 95
    },
    {
      id: 'marathon-runner',
      name: 'Marathon Runner',
      description: 'Maintain 30-day study streak',
      icon: Award,
      unlocked: false,
      progress: 40
    }
  ];

  const handleDownloadReport = () => {
    setShowToast(true);
    setToastMessage('Profile report downloaded successfully!');
    setToastType('success');
  };

  const handleShareProgress = () => {
    setShowToast(true);
    setToastMessage('Progress shared to LinkedIn!');
    setToastType('success');
  };

  const unlockedAchievements = achievements.filter(a => a.unlocked).length;
  const totalAchievements = achievements.length;

  return (
    <div className="p-6 bg-white min-h-screen">
      {/* Profile Header */}
      <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          {/* Profile Picture & Basic Info */}
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-[#0B1D39] flex items-center justify-center text-white text-2xl font-bold">
                {userData.avatar}
              </div>
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-gray-100 hover:bg-gray-50 transition-colors">
                <Camera className="h-4 w-4 text-[#0B1D39]" />
              </button>
            </div>
            
            <div>
              <h1 className="text-2xl font-bold text-[#0B1D39] mb-1">{userData.fullName}</h1>
              <p className="text-[#0B1D39] opacity-70 mb-1">{userData.school}</p>
              <p className="text-sm text-[#0B1D39] opacity-50">ID: {userData.registrationId}</p>
            </div>
          </div>

          {/* Edit Button */}
          <div className="ml-auto">
            <Button 
              variant="outline" 
              className="border-[#0B1D39] text-[#0B1D39] hover:bg-[#e5eefe]"
            >
              <Edit3 className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#0B1D39] opacity-70 text-sm">Total Tests</p>
              <p className="text-3xl font-bold text-[#0B1D39]">{quickStats.totalTests}</p>
            </div>
            <BookOpen className="h-8 w-8 text-[#0B1D39] opacity-70" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#0B1D39] opacity-70 text-sm">Average Score</p>
              <p className="text-3xl font-bold text-[#0B1D39]">{quickStats.averageScore}%</p>
            </div>
            <Target className="h-8 w-8 text-[#0B1D39] opacity-70" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#0B1D39] opacity-70 text-sm">Accuracy</p>
              <p className="text-3xl font-bold text-[#0B1D39]">{quickStats.accuracy}%</p>
            </div>
            <CheckCircle2 className="h-8 w-8 text-[#0B1D39] opacity-70" />
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-[#0B1D39]">🏆 Achievements</h2>
          <div className="text-right">
            <div className="text-2xl font-bold text-[#0B1D39]">{unlockedAchievements}/{totalAchievements}</div>
            <div className="text-sm text-[#0B1D39] opacity-70">Unlocked</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((achievement) => {
            const Icon = achievement.icon;
            return (
              <motion.div
                key={achievement.id}
                whileHover={{ scale: 1.02 }}
                className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                  achievement.unlocked
                    ? 'border-[#0B1D39] bg-[#e5eefe]'
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-start">
                  <div className={`p-2 rounded-lg mr-3 ${
                    achievement.unlocked ? 'bg-[#0B1D39] text-white' : 'bg-gray-200 text-gray-400'
                  }`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-medium ${
                      achievement.unlocked ? 'text-[#0B1D39]' : 'text-gray-500'
                    }`}>
                      {achievement.name}
                    </h4>
                    <p className="text-xs text-[#0B1D39] opacity-70 mb-2">{achievement.description}</p>
                    
                    {achievement.unlocked ? (
                      <p className="text-xs text-[#0B1D39] font-medium">
                        Unlocked on {achievement.unlockedDate}
                      </p>
                    ) : achievement.progress ? (
                      <div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1">
                          <div 
                            className="bg-[#0B1D39] h-1.5 rounded-full"
                            style={{ width: `${achievement.progress}%` }}
                          />
                        </div>
                        <p className="text-xs text-gray-500">{achievement.progress}% complete</p>
                      </div>
                    ) : (
                      <p className="text-xs text-gray-500">Not started</p>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Streaks Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-[#0B1D39] mb-2">🔥 Current Streak</h3>
              <p className="text-3xl font-bold text-[#0B1D39]">{quickStats.currentStreak} days</p>
              <p className="text-sm text-[#0B1D39] opacity-70">Keep it going!</p>
            </div>
            <Zap className="h-12 w-12 text-[#0B1D39] opacity-70" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-[#0B1D39] mb-2">🏆 Longest Streak</h3>
              <p className="text-3xl font-bold text-[#0B1D39]">{quickStats.longestStreak} days</p>
              <p className="text-sm text-[#0B1D39] opacity-70">Personal best</p>
            </div>
            <Award className="h-12 w-12 text-[#0B1D39] opacity-70" />
          </div>
        </div>
      </div>

      {/* Performance Graph */}
      <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-[#0B1D39]">📈 Performance Graph</h3>
            <p className="text-[#0B1D39] opacity-70">Accuracy over time</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#0B1D39]">{quickStats.improvement}</div>
              <div className="text-sm text-[#0B1D39] opacity-70">Improvement</div>
            </div>
            <TrendingUp className="h-8 w-8 text-[#0B1D39]" />
          </div>
        </div>

        {/* Performance Graph */}
        <div className="h-64 relative">
          <div className="absolute inset-0 flex items-end justify-between px-4">
            {performanceData.slice(-10).map((data, index) => (
              <motion.div
                key={index}
                initial={{ height: 0 }}
                animate={{ height: `${data.score}%` }}
                transition={{ duration: 1, delay: index * 0.1 }}
                className="flex flex-col items-center"
              >
                <div 
                  className="w-8 bg-[#0B1D39] rounded-t"
                  style={{ height: `${data.score}%` }}
                ></div>
                <span className="text-xs text-[#0B1D39] opacity-70 mt-2">
                  {new Date(data.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
              </motion.div>
            ))}
          </div>
          
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between py-2">
            <span className="text-xs text-[#0B1D39] opacity-70">100%</span>
            <span className="text-xs text-[#0B1D39] opacity-70">75%</span>
            <span className="text-xs text-[#0B1D39] opacity-70">50%</span>
            <span className="text-xs text-[#0B1D39] opacity-70">25%</span>
            <span className="text-xs text-[#0B1D39] opacity-70">0%</span>
          </div>
        </div>
      </div>

      {/* Profile Info */}
      <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm mb-8">
        <h3 className="text-xl font-bold text-[#0B1D39] mb-6">📌 Profile Info</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#0B1D39] opacity-70 mb-1">Full Name</label>
              <p className="text-[#0B1D39] font-medium">{userData.fullName}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#0B1D39] opacity-70 mb-1">Email</label>
              <p className="text-[#0B1D39] font-medium">{userData.email}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#0B1D39] opacity-70 mb-1">Registration ID</label>
              <p className="text-[#0B1D39] font-medium">{userData.registrationId}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#0B1D39] opacity-70 mb-1">Date of Birth</label>
              <p className="text-[#0B1D39] font-medium">{userData.dateOfBirth}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#0B1D39] opacity-70 mb-1">Mobile</label>
              <p className="text-[#0B1D39] font-medium">{userData.mobile}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#0B1D39] opacity-70 mb-1">School</label>
              <p className="text-[#0B1D39] font-medium">{userData.school}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#0B1D39] opacity-70 mb-1">Class</label>
              <p className="text-[#0B1D39] font-medium">{userData.class}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#0B1D39] opacity-70 mb-1">Stream</label>
              <p className="text-[#0B1D39] font-medium">{userData.stream}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <Button 
          onClick={handleDownloadReport}
          className="flex-1 bg-[#0B1D39] text-white hover:bg-[#0B1D39]/90"
        >
          <Download className="h-4 w-4 mr-2" />
          Download My Report (PDF)
        </Button>
        <Button 
          onClick={handleShareProgress}
          variant="outline"
          className="flex-1 border-[#0B1D39] text-[#0B1D39] hover:bg-[#e5eefe]"
        >
          <Share2 className="h-4 w-4 mr-2" />
          Share My Progress
        </Button>
      </div>

      {/* LinkedIn Share CTA */}
      <div className="bg-[#0B1D39] rounded-xl p-8 text-white">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold mb-2">🚀 Share Your Success Story</h3>
            <p className="text-white opacity-80">
              Showcase your learning achievements on LinkedIn and inspire others!
            </p>
          </div>
          <Button 
            onClick={handleShareProgress}
            className="bg-white text-[#0B1D39] hover:bg-gray-100"
          >
            <Linkedin className="h-4 w-4 mr-2" />
            Share on LinkedIn
            <ExternalLink className="h-4 w-4 ml-2" />
          </Button>
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
    </div>
  );
};

export default ProfilePage;
