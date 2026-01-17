import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Send, MapPin, Phone, Linkedin, Twitter, Facebook } from 'lucide-react';
import Layout from '../components/Layout';
import Input from '../components/Input';
import Button from '../components/Button';
import Toast, { ToastType } from '../components/Toast';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    role: '',
    message: ''
  });
  
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<ToastType>('success');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.fullName || !formData.email || !formData.message) {
      setShowToast(true);
      setToastMessage('Please fill in all required fields');
      setToastType('error');
      return;
    }
    
    // Mock form submission
    setShowToast(true);
    setToastMessage('Message sent successfully! We\'ll get back to you soon.');
    setToastType('success');
    
    // Reset form
    setFormData({
      fullName: '',
      email: '',
      role: '',
      message: ''
    });
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-[#06142E] to-[#1B3B6F]">
        {/* Hero Section */}
        <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block mb-6 p-2 bg-indigo-800 rounded-full"
            >
              <div className="px-4 py-1 bg-indigo-700 rounded-full">
                <span className="text-indigo-200">We'd love to hear from you</span>
              </div>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              Get in Touch with Team Learnex
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-indigo-200 max-w-3xl mx-auto"
            >
              Have questions, feedback, or want to partner with us? We're here to help!
            </motion.p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl p-8 shadow-xl"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                  id="fullName"
                  name="fullName"
                  label="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
                
                <Input
                  id="email"
                  name="email"
                  label="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                
                <div className="mb-4">
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Role
                  </label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">Select your role</option>
                    <option value="student">Student</option>
                    <option value="parent">Parent</option>
                    <option value="teacher">Teacher</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  ></textarea>
                </div>
                
                <Button type="submit" className="w-full">
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </motion.div>
            
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              {/* Quick Contact Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <Mail className="h-8 w-8 text-indigo-600 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Us</h3>
                  <p className="text-gray-600">support@learnex.com</p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <Phone className="h-8 w-8 text-indigo-600 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Call Us</h3>
                  <p className="text-gray-600">+91 (123) 456-7890</p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <MessageSquare className="h-8 w-8 text-indigo-600 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Live Chat</h3>
                  <p className="text-gray-600">Available 24/7</p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <MapPin className="h-8 w-8 text-indigo-600 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Visit Us</h3>
                  <p className="text-gray-600">Bangalore, India</p>
                </div>
              </div>
              
              {/* Social Links */}
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Connect With Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="p-3 bg-indigo-50 rounded-lg text-indigo-600 hover:bg-indigo-100 transition-colors">
                    <Linkedin className="h-6 w-6" />
                  </a>
                  <a href="#" className="p-3 bg-indigo-50 rounded-lg text-indigo-600 hover:bg-indigo-100 transition-colors">
                    <Twitter className="h-6 w-6" />
                  </a>
                  <a href="#" className="p-3 bg-indigo-50 rounded-lg text-indigo-600 hover:bg-indigo-100 transition-colors">
                    <Facebook className="h-6 w-6" />
                  </a>
                </div>
              </div>
              
              {/* FAQ Preview */}
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  <div className="border-b border-gray-200 pb-4">
                    <h4 className="font-medium text-gray-900">How do I get started?</h4>
                    <p className="text-gray-600 mt-1">Sign up for a free account and explore our AI-powered learning tools.</p>
                  </div>
                  <div className="border-b border-gray-200 pb-4">
                    <h4 className="font-medium text-gray-900">Is there a free trial?</h4>
                    <p className="text-gray-600 mt-1">Yes! Start with our free plan and upgrade when you're ready.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
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
    </Layout>
  );
};

export default ContactPage;