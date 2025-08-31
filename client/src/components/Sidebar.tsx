import React from 'react';
import { LayoutDashboard, BookOpen, FileText, Users, BarChart2, User } from 'lucide-react';
import { Link } from './Link';

const Sidebar: React.FC = () => {
  return (
    <div className="h-full bg-indigo-900 text-white w-64 flex flex-col py-6 px-4">
      <div className="mb-8 px-4">
        <h2 className="text-xl font-bold">Learnex</h2>
        <p className="text-sm text-indigo-200">Your AI-Driven War Room</p>
      </div>
      
      <nav className="flex-1">
        <ul className="space-y-2">
          <li>
            <Link
              href="/dashboard"
              className="flex items-center px-4 py-2 text-indigo-100 hover:bg-indigo-800 rounded-md transition-colors"
            >
              <LayoutDashboard className="mr-3 h-5 w-5" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/notes"
              className="flex items-center px-4 py-2 text-indigo-100 hover:bg-indigo-800 rounded-md transition-colors"
            >
              <FileText className="mr-3 h-5 w-5" />
              Smart Notes
            </Link>
          </li>
          <li>
            <Link
              href="/quiz"
              className="flex items-center px-4 py-2 text-indigo-100 hover:bg-indigo-800 rounded-md transition-colors"
            >
              <BookOpen className="mr-3 h-5 w-5" />
              Quiz Generator
            </Link>
          </li>
          <li>
            <Link
              href="/group"
              className="flex items-center px-4 py-2 text-indigo-100 hover:bg-indigo-800 rounded-md transition-colors"
            >
              <Users className="mr-3 h-5 w-5" />
              Group Study
            </Link>
          </li>
          <li>
            <Link
              href="/performance"
              className="flex items-center px-4 py-2 text-indigo-100 hover:bg-indigo-800 rounded-md transition-colors"
            >
              <BarChart2 className="mr-3 h-5 w-5" />
              Performance
            </Link>
          </li>
          <li>
            <Link
              href="/profile"
              className="flex items-center px-4 py-2 text-indigo-100 hover:bg-indigo-800 rounded-md transition-colors"
            >
              <User className="mr-3 h-5 w-5" />
              Profile
            </Link>
          </li>
        </ul>
      </nav>
      
      <div className="mt-auto px-4 py-2">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-indigo-700 flex items-center justify-center text-white font-medium">
            JD
          </div>
          <div className="ml-2">
            <p className="text-sm font-medium">John Doe</p>
            <p className="text-xs text-indigo-200">Student</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;