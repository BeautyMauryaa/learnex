import React from 'react';
import { BookOpen, Book, PenTool, Lightbulb, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import { Link } from '../components/Link';

const FloatingElement = ({ children, delay = 0, duration = 4, scale = 1 }) => (
  <motion.div
    initial={{ y: 0, rotate: 0, scale }}
    animate={{ 
      y: [-20, 20, -20],
      rotate: [-5, 5, -5],
    }}
    transition={{
      duration,
      repeat: Infinity,
      ease: "easeInOut",
      delay,
    }}
  >
    {children}
  </motion.div>
);

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#06142E] to-[#1B3B6F] relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingElement delay={0} duration={5}>
          <Book className="absolute top-20 left-20 w-16 h-16 text-white/10" />
        </FloatingElement>
        <FloatingElement delay={0.8} duration={4.5}>
          <PenTool className="absolute top-40 right-32 w-20 h-20 text-white/10" />
        </FloatingElement>
        <FloatingElement delay={1.2} duration={5.5}>
          <Lightbulb className="absolute bottom-32 left-1/4 w-24 h-24 text-white/10" />
        </FloatingElement>
        <FloatingElement delay={0.5} duration={4.8}>
          <GraduationCap className="absolute top-1/3 right-1/4 w-16 h-16 text-white/10" />
        </FloatingElement>
        <FloatingElement delay={1.5} duration={5.2}>
          <Book className="absolute bottom-1/4 right-1/3 w-20 h-20 text-white/10" />
        </FloatingElement>
        <FloatingElement delay={0.3} duration={4.6}>
          <PenTool className="absolute top-1/4 left-1/3 w-16 h-16 text-white/10" />
        </FloatingElement>
      </div>

      {/* Navbar */}
      <nav className="absolute top-0 left-0 right-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-white" />
              <span className="ml-2 text-xl font-bold text-white">Learnex</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-white hover:text-indigo-200 transition-colors">
                Home
              </Link>
              <Link href="/features" className="text-white hover:text-indigo-200 transition-colors">
                Features
              </Link>
              <Link href="/pricing" className="text-white hover:text-indigo-200 transition-colors">
                Pricing
              </Link>
              <Link href="/about" className="text-white hover:text-indigo-200 transition-colors">
                About Us
              </Link>
              <Link href="/contact" className="text-white hover:text-indigo-200 transition-colors">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-8"
          >
            <BookOpen className="h-20 w-20 text-white mx-auto mb-6" />
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              Welcome to Learnex
            </h1>
            <p className="text-xl text-indigo-200 max-w-2xl mx-auto">
              Your AI-Driven War Room for Exams
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/login">
              <Button size="lg" className="bg-white text-[#06142E] hover:bg-indigo-100 min-w-[160px] font-semibold">
                Let's Go
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;