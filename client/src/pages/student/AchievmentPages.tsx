import React from 'react';
import { Trophy, Star, Target, Zap, Brain, Clock, Award } from 'lucide-react';

const achievements = [
  {
    id: 1,
    name: 'Quiz Queen',
    description: 'Complete 10 quizzes with perfect scores',
    icon: Trophy,
    progress: 100,
    unlocked: true,
    date: '2024-02-15'
  },
  {
    id: 2,
    name: 'Rank Rocket',
    description: 'Reach top 10% in your class',
    icon: Star,
    progress: 100,
    unlocked: true,
    date: '2024-02-20'
  },
  {
    id: 3,
    name: 'Streak Star',
    description: 'Maintain a 30-day study streak',
    icon: Zap,
    progress: 80,
    unlocked: false
  },
  {
    id: 4,
    name: 'Knowledge Navigator',
    description: 'Complete all topics in a subject',
    icon: Brain,
    progress: 65,
    unlocked: false
  },
  {
    id: 5,
    name: 'Time Master',
    description: 'Study for 100 hours total',
    icon: Clock,
    progress: 90,
    unlocked: false
  },
  {
    id: 6,
    name: 'Perfect Attendance',
    description: 'Attend all scheduled classes for a month',
    icon: Award,
    progress: 100,
    unlocked: true,
    date: '2024-01-30'
  }
];

const AchievementsPage: React.FC = () => {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Achievements</h1>
        <p className="text-gray-600">Track your learning milestones and accomplishments</p>
      </div>

      {/* Achievement Stats */}
      <div className="bg-indigo-900 rounded-xl p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2">
              {achievements.filter(a => a.unlocked).length}
            </div>
            <p className="text-indigo-200">Achievements Unlocked</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2">
              {Math.round((achievements.filter(a => a.unlocked).length / achievements.length) * 100)}%
            </div>
            <p className="text-indigo-200">Completion Rate</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2">
              {achievements.length - achievements.filter(a => a.unlocked).length}
            </div>
            <p className="text-indigo-200">Remaining Goals</p>
          </div>
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((achievement) => {
          const Icon = achievement.icon;
          return (
            <div 
              key={achievement.id} 
              className={`bg-white rounded-xl p-6 border ${
                achievement.unlocked ? 'border-indigo-200' : 'border-gray-200'
              }`}
            >
              <div className="flex items-center mb-4">
                <div className={`p-3 rounded-lg ${
                  achievement.unlocked 
                    ? 'bg-indigo-100 text-indigo-600' 
                    : 'bg-gray-100 text-gray-400'
                }`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <h3 className={`font-semibold ${
                    achievement.unlocked ? 'text-gray-900' : 'text-gray-500'
                  }`}>
                    {achievement.name}
                  </h3>
                  <p className="text-sm text-gray-500">{achievement.description}</p>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Progress</span>
                  <span className={achievement.unlocked ? 'text-indigo-600' : 'text-gray-600'}>
                    {achievement.progress}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      achievement.unlocked ? 'bg-indigo-600' : 'bg-gray-400'
                    }`}
                    style={{ width: `${achievement.progress}%` }}
                  ></div>
                </div>
              </div>

              {achievement.unlocked && achievement.date && (
                <div className="mt-4 text-sm text-gray-500">
                  Unlocked on {achievement.date}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Next Achievement */}
      <div className="mt-8 bg-gradient-to-r from-indigo-900 to-purple-900 rounded-xl p-6 text-white">
        <div className="flex items-center">
          <Target className="h-12 w-12 mr-4" />
          <div>
            <h3 className="text-xl font-semibold mb-1">Next Achievement</h3>
            <p className="text-indigo-200">
              You're close to unlocking "Time Master"! Just 10 more study hours to go.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AchievementsPage;