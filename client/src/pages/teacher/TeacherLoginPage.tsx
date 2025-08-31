import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Link } from '../../components/Link';

const quotes = [
  {
    text: "Teaching is the profession that teaches all other professions.",
    author: "Unknown"
  },
  {
    text: "The art of teaching is the art of assisting discovery.",
    author: "Mark Van Doren"
  },
  {
    text: "A teacher affects eternity; they can never tell where their influence stops.",
    author: "Henry Adams"
  }
];

interface FormData {
  email: string;
  password: string;
  fullName: string;
  confirmPassword: string;
  institution: string;
  subjects: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  fullName?: string;
  confirmPassword?: string;
  institution?: string;
  subjects?: string;
}

const TeacherLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState<'login' | 'signup'>('login');
  const [currentQuote, setCurrentQuote] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    fullName: '',
    confirmPassword: '',
    institution: '',
    subjects: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
    return passwordRegex.test(password);
  };

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'email':
        return !value ? 'Email is required' :
               !validateEmail(value) ? 'Please enter a valid email address' : '';
      case 'password':
        return !value ? 'Password is required' :
               !validatePassword(value) ? 'Password must be at least 6 characters long and contain at least one number and one special character' : '';
      case 'fullName':
        return !value && activeView === 'signup' ? 'Full name is required' : '';
      case 'confirmPassword':
        return !value && activeView === 'signup' ? 'Please confirm your password' :
               value !== formData.password ? 'Passwords do not match' : '';
      case 'institution':
        return !value && activeView === 'signup' ? 'Institution name is required' : '';
      case 'subjects':
        return !value && activeView === 'signup' ? 'Please specify subjects you teach' : '';
      default:
        return '';
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: FormErrors = {};
    Object.keys(formData).forEach(key => {
      if (activeView === 'login' && (key === 'fullName' || key === 'confirmPassword' || key === 'institution' || key === 'subjects')) {
        return;
      }
      const error = validateField(key, formData[key as keyof FormData]);
      if (error) {
        newErrors[key as keyof FormErrors] = error;
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Store teacher role and data (in real app, this would be handled by backend)
      localStorage.setItem('userRole', 'teacher');
      localStorage.setItem('userData', JSON.stringify({
        email: formData.email,
        fullName: formData.fullName || formData.email.split('@')[0],
        role: 'teacher',
        institution: formData.institution,
        subjects: formData.subjects
      }));

      // Navigate to teacher dashboard
      navigate('/teacher/dashboard');
    }
  };

  const handleViewChange = (view: 'login' | 'signup') => {
    setActiveView(view);
    setCurrentQuote((prev) => (prev + 1) % quotes.length);
    setFormData({ email: '', password: '', fullName: '', confirmPassword: '', institution: '', subjects: '' });
    setErrors({});
  };
  
  return (
    <div className="min-h-screen w-full flex p-8">
      <div className="w-full max-w-6xl mx-auto flex rounded-3xl overflow-hidden shadow-2xl bg-white">
        <AnimatePresence mode="wait">
          <motion.div
            key={`quote-${activeView}`}
            className={`hidden md:flex w-1/2 bg-[#06142E] p-12 items-center justify-center relative overflow-hidden ${
              activeView === 'login' ? 'order-first' : 'order-last'
            }`}
            initial={{ 
              x: activeView === 'login' ? -100 : 100,
              opacity: 0 
            }}
            animate={{ 
              x: 0,
              opacity: 1 
            }}
            exit={{ 
              x: activeView === 'login' ? 100 : -100,
              opacity: 0 
            }}
            transition={{ 
              type: "spring",
              stiffness: 100,
              damping: 20
            }}
          >
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-cover bg-center opacity-10"></div>
            </div>
            <div className="relative max-w-md">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuote}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-white"
                >
                  <h2 className="text-3xl font-bold mb-6">{quotes[currentQuote].text}</h2>
                  <p className="text-lg text-blue-200">— {quotes[currentQuote].author}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="w-full md:w-1/2 flex items-center justify-center p-12">
          <div className="w-full max-w-md">
            <div className="flex justify-between items-center mb-8">
              <Link href="/teacher" className="flex items-center">
                <span className="text-2xl font-bold text-[#06142E]">Learnex</span>
              </Link>
              <Link href="/teacher">
                <Button variant="outline" size="sm">Go Back</Button>
              </Link>
            </div>

            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {activeView === 'login' ? 'Welcome Back, Educator!' : 'Join Our Teaching Community'}
              </h1>
              <p className="text-gray-600">
                {activeView === 'login' ? 'Sign in to empower minds' : 'Start your teaching journey with AI'}
              </p>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeView}
                initial={{ opacity: 0, x: activeView === 'login' ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: activeView === 'login' ? 20 : -20 }}
                transition={{ duration: 0.3 }}
              >
                <form onSubmit={handleSubmit} className="space-y-4">
                  {activeView === 'signup' && (
                    <Input
                      id="fullName"
                      name="fullName"
                      label="Full Name"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      onBlur={handleInputBlur}
                      error={errors.fullName}
                      required
                    />
                  )}
                  <Input
                    id="email"
                    name="email"
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    error={errors.email}
                    required
                  />
                  <Input
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    error={errors.password}
                    required
                  />
                  {activeView === 'signup' && (
                    <>
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        error={errors.confirmPassword}
                        required
                      />
                      <Input
                        id="institution"
                        name="institution"
                        label="Institution Name"
                        value={formData.institution}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        error={errors.institution}
                        required
                      />
                      <Input
                        id="subjects"
                        name="subjects"
                        label="Subject(s) You Teach"
                        placeholder="e.g., Mathematics, Physics, Chemistry"
                        value={formData.subjects}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        error={errors.subjects}
                        required
                      />
                    </>
                  )}

                  <Button type="submit" className="w-full">
                    {activeView === 'login' ? 'Sign In' : 'Create Account'}
                  </Button>

                  <div className="text-center mt-4">
                    <button
                      type="button"
                      onClick={() => handleViewChange(activeView === 'login' ? 'signup' : 'login')}
                      className="text-sm text-[#06142E] hover:underline"
                    >
                      {activeView === 'login' ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
                    </button>
                  </div>

                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">Or continue with</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="w-full flex justify-center items-center py-2.5 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Continue with Google
                  </button>
                </form>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherLoginPage;