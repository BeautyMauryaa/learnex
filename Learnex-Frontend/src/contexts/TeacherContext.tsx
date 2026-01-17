import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Teacher {
  id: string;
  name: string;
  email: string;
  institution: string;
  subjects: string[];
}

interface DashboardStats {
  totalStudents: number;
  activeClasses: number;
  avgPerformance: number;
  testsCreated: number;
}

interface TeacherContextType {
  teacher: Teacher | null;
  dashboardStats: DashboardStats | null;
  setTeacher: (teacher: Teacher) => void;
  fetchDashboardStats: () => void;
}

const TeacherContext = createContext<TeacherContextType | undefined>(undefined);

export const useTeacher = () => {
  const context = useContext(TeacherContext);
  if (context === undefined) {
    throw new Error('useTeacher must be used within a TeacherProvider');
  }
  return context;
};

interface TeacherProviderProps {
  children: ReactNode;
}

export const TeacherProvider: React.FC<TeacherProviderProps> = ({ children }) => {
  const [teacher, setTeacher] = useState<Teacher | null>({
    id: '1',
    name: 'Prof. Johnson',
    email: 'prof.johnson@school.edu',
    institution: 'Delhi Public School',
    subjects: ['Mathematics', 'Physics']
  });

  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>({
    totalStudents: 156,
    activeClasses: 8,
    avgPerformance: 82,
    testsCreated: 24
  });

  const fetchDashboardStats = () => {
    // Mock API call - in real app, this would fetch from backend
    setDashboardStats({
      totalStudents: 156,
      activeClasses: 8,
      avgPerformance: 82,
      testsCreated: 24
    });
  };

  const value = {
    teacher,
    dashboardStats,
    setTeacher,
    fetchDashboardStats
  };

  return (
    <TeacherContext.Provider value={value}>
      {children}
    </TeacherContext.Provider>
  );
};

export default TeacherContext;