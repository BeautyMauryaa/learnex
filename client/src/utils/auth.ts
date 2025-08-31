// Authentication utility functions
export interface UserData {
  email: string;
  username?: string;
  fullName?: string;
  role: 'student' | 'teacher';
  institution?: string;
  subjects?: string;
}

export const getCurrentUser = (): UserData | null => {
  try {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  } catch {
    return null;
  }
};

export const getUserRole = (): 'student' | 'teacher' | null => {
  try {
    return localStorage.getItem('userRole') as 'student' | 'teacher' | null;
  } catch {
    return null;
  }
};

export const isAuthenticated = (): boolean => {
  return !!getCurrentUser();
};

export const logout = (): void => {
  localStorage.removeItem('userRole');
  localStorage.removeItem('userData');
};

export const redirectBasedOnRole = (role: 'student' | 'teacher'): string => {
  return role === 'student' ? '/student/dashboard' : '/teacher/dashboard';
};