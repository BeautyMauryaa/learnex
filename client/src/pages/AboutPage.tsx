import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Target, Users, Star } from 'lucide-react';
import Layout from '../components/Layout';

const teamMembers = [
  {
    name: "Sarah Chen",
    role: "AI Architect",
    quote: "Making AI work for every student's unique journey",
    avatar: "https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    name: "Alex Rodriguez",
    role: "Frontend Wizard",
    quote: "Crafting experiences that make learning magical",
    avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    name: "Priya Patel",
    role: "Learning Specialist",
    quote: "Education is the key to unlocking potential",
    avatar: "https://images.pexels.com/photos/3776932/pexels-photo-3776932.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    name: "Marcus Johnson",
    role: "Product Innovator",
    quote: "Revolutionizing how we think about learning",
    avatar: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  }
];

const milestones = [
  {
    year: "2023",
    title: "The Beginning",
    description: "Learnex was born from a simple idea: make learning smarter"
  },
  {
    year: "2024",
    title: "AI Integration",
    description: "Launched our revolutionary AI-powered study tools"
  },
  {
    year: "2025",
    title: "Global Expansion",
    description: "Reaching students across continents"
  }
];

const AboutPage: React.FC = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-[#06142E] to-[#1B3B6F]">
        {/* Hero Section */}
        <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              The Learnex Journey
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-indigo-200 max-w-3xl mx-auto"
            >
              From a spark to a revolution in smart learning
            </motion.p>
          </div>
        </div>

        {/* Mission Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl p-8 md:p-12 shadow-xl mb-12"
          >
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  To make quality education accessible, intelligent, and personalized through AI-powered tools. We believe every student deserves a learning experience tailored to their unique needs and goals.
                </p>
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="p-4 bg-indigo-50 rounded-lg">
                    <Target className="h-8 w-8 text-indigo-600 mb-2" />
                    <h3 className="font-semibold text-gray-900">Personalized</h3>
                    <p className="text-sm text-gray-600">Tailored to each student</p>
                  </div>
                  <div className="p-4 bg-indigo-50 rounded-lg">
                    <Star className="h-8 w-8 text-indigo-600 mb-2" />
                    <h3 className="font-semibold text-gray-900">Quality</h3>
                    <p className="text-sm text-gray-600">Excellence in education</p>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2">
                <img 
                  src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Team collaboration"
                  className="rounded-xl shadow-lg"
                />
              </div>
            </div>
          </motion.div>

          {/* Timeline Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Our Journey</h2>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-indigo-200"></div>
              
              {/* Timeline items */}
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className={`relative flex items-center justify-${index % 2 === 0 ? 'end' : 'start'} mb-8`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                    <div className="bg-white p-6 rounded-xl shadow-lg">
                      <span className="text-indigo-600 font-bold text-xl">{milestone.year}</span>
                      <h3 className="text-lg font-semibold text-gray-900 mt-2">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-indigo-600 rounded-full border-4 border-white"></div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Team Section */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-12">Meet the Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="bg-white rounded-xl p-6 shadow-xl"
                >
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                  <p className="text-indigo-600 font-medium mb-2">{member.role}</p>
                  <p className="text-gray-600 italic">"{member.quote}"</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Vision Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-indigo-900 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden"
          >
            <div className="relative z-10">
              <Rocket className="h-16 w-16 text-white mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-white mb-4">Our Vision</h2>
              <p className="text-xl text-indigo-200 max-w-3xl mx-auto">
                We believe in a future where every student, anywhere, learns with ease, speed, and joy.
                Our AI-powered platform is just the beginning of this educational revolution.
              </p>
            </div>
            
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 to-transparent" />
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100" height="100" fill="url(#grid)" />
              </svg>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;