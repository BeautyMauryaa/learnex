import React, { useState } from 'react';
import { 
  User, 
  Lock, 
  Upload, 
  AlertTriangle, 
  Globe, 
  Bell, 
  Clock, 
  FileText,
  Trash2,
  Shield,
  Eye,
  EyeOff
} from 'lucide-react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Toast, { ToastType } from '../../components/Toast';

const SettingsPage: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    mobile: '+91 9876543210',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<ToastType>('success');
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const [preferences, setPreferences] = useState({
    language: 'english',
    theme: 'light',
    emailNotifications: true,
    pushNotifications: false,
    testReminders: true,
    defaultTestDuration: '60',
    difficultyLevel: 'adaptive',
    timeFormat: '12'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePreferenceChange = (key: string, value: any) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  const handleAccountUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setShowToast(true);
    setToastMessage('Account information updated successfully!');
    setToastType('success');
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      setShowToast(true);
      setToastMessage('Passwords do not match!');
      setToastType('error');
      return;
    }
    setShowToast(true);
    setToastMessage('Password changed successfully!');
    setToastType('success');
    setFormData(prev => ({ ...prev, currentPassword: '', newPassword: '', confirmPassword: '' }));
  };

  const handleSavePreferences = () => {
    setShowToast(true);
    setToastMessage('Preferences saved successfully!');
    setToastType('success');
  };

  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#0B1D39]">Settings</h1>
        <p className="text-[#0B1D39] opacity-70">Manage your account preferences and security</p>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Account Info Section */}
        <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
          <div className="flex items-center mb-6">
            <User className="h-6 w-6 text-[#0B1D39] mr-3" />
            <h2 className="text-xl font-bold text-[#0B1D39]">Account Info</h2>
          </div>
          
          <form onSubmit={handleAccountUpdate}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Input
                id="fullName"
                name="fullName"
                label="Full Name"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />

              <Input
                id="email"
                name="email"
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />

              <Input
                id="mobile"
                name="mobile"
                label="Mobile Number"
                value={formData.mobile}
                onChange={handleInputChange}
                required
              />

              <div className="mb-4">
                <label className="block text-sm font-medium text-[#0B1D39] opacity-70 mb-1">
                  Role
                </label>
                <input
                  type="text"
                  value="Student"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-[#0B1D39] opacity-70"
                  disabled
                />
              </div>
            </div>

            <Button 
              type="submit"
              className="bg-[#0B1D39] text-white hover:bg-[#0B1D39]/90"
            >
              Save Changes
            </Button>
          </form>
        </div>

        {/* Change Password Section */}
        <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
          <div className="flex items-center mb-6">
            <Lock className="h-6 w-6 text-[#0B1D39] mr-3" />
            <h2 className="text-xl font-bold text-[#0B1D39]">Change Password</h2>
          </div>
          
          <form onSubmit={handlePasswordChange}>
            <div className="space-y-6 mb-6">
              <div className="relative">
                <Input
                  id="currentPassword"
                  name="currentPassword"
                  label="Current Password"
                  type={showPasswords.current ? "text" : "password"}
                  value={formData.currentPassword}
                  onChange={handleInputChange}
                  required
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('current')}
                  className="absolute right-3 top-8 text-[#0B1D39] opacity-70 hover:opacity-100"
                >
                  {showPasswords.current ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>

              <div className="relative">
                <Input
                  id="newPassword"
                  name="newPassword"
                  label="New Password"
                  type={showPasswords.new ? "text" : "password"}
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  required
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('new')}
                  className="absolute right-3 top-8 text-[#0B1D39] opacity-70 hover:opacity-100"
                >
                  {showPasswords.new ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>

              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  label="Confirm New Password"
                  type={showPasswords.confirm ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('confirm')}
                  className="absolute right-3 top-8 text-[#0B1D39] opacity-70 hover:opacity-100"
                >
                  {showPasswords.confirm ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <Button 
              type="submit"
              className="bg-[#0B1D39] text-white hover:bg-[#0B1D39]/90"
            >
              Update Password
            </Button>
          </form>
        </div>

        {/* Language & Theme Settings */}
        <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
          <div className="flex items-center mb-6">
            <Globe className="h-6 w-6 text-[#0B1D39] mr-3" />
            <h2 className="text-xl font-bold text-[#0B1D39]">Language & Theme Settings</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-[#0B1D39] opacity-70 mb-2">
                Language
              </label>
              <select
                value={preferences.language}
                onChange={(e) => handlePreferenceChange('language', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B1D39] focus:border-[#0B1D39]"
              >
                <option value="english">English</option>
                <option value="hindi">Hindi</option>
                <option value="spanish">Spanish</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#0B1D39] opacity-70 mb-2">
                Theme
              </label>
              <select
                value={preferences.theme}
                onChange={(e) => handlePreferenceChange('theme', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B1D39] focus:border-[#0B1D39]"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="auto">Auto</option>
              </select>
            </div>
          </div>
        </div>

        {/* Document Uploads */}
        <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
          <div className="flex items-center mb-6">
            <FileText className="h-6 w-6 text-[#0B1D39] mr-3" />
            <h2 className="text-xl font-bold text-[#0B1D39]">Document Uploads / Certificates</h2>
          </div>
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <Upload className="h-12 w-12 text-[#0B1D39] opacity-70 mx-auto mb-4" />
            <p className="text-[#0B1D39] opacity-70 mb-4">Upload your certificates and documents</p>
            <Button 
              variant="outline"
              className="border-[#0B1D39] text-[#0B1D39] hover:bg-[#e5eefe]"
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload Documents
            </Button>
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
          <div className="flex items-center mb-6">
            <Bell className="h-6 w-6 text-[#0B1D39] mr-3" />
            <h2 className="text-xl font-bold text-[#0B1D39]">Notification Preferences</h2>
          </div>
          
          <div className="space-y-4 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-[#0B1D39]">Email Notifications</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={preferences.emailNotifications}
                  onChange={(e) => handlePreferenceChange('emailNotifications', e.target.checked)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#0B1D39]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0B1D39]"></div>
              </label>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-[#0B1D39]">Push Notifications</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={preferences.pushNotifications}
                  onChange={(e) => handlePreferenceChange('pushNotifications', e.target.checked)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#0B1D39]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0B1D39]"></div>
              </label>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-[#0B1D39]">Test Reminders</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={preferences.testReminders}
                  onChange={(e) => handlePreferenceChange('testReminders', e.target.checked)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#0B1D39]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0B1D39]"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Test Preferences */}
        <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
          <div className="flex items-center mb-6">
            <Clock className="h-6 w-6 text-[#0B1D39] mr-3" />
            <h2 className="text-xl font-bold text-[#0B1D39]">Test Preferences</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-[#0B1D39] opacity-70 mb-2">
                Default Test Duration
              </label>
              <select
                value={preferences.defaultTestDuration}
                onChange={(e) => handlePreferenceChange('defaultTestDuration', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B1D39] focus:border-[#0B1D39]"
              >
                <option value="30">30 minutes</option>
                <option value="60">60 minutes</option>
                <option value="90">90 minutes</option>
                <option value="120">120 minutes</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#0B1D39] opacity-70 mb-2">
                Difficulty Level Choice
              </label>
              <select
                value={preferences.difficultyLevel}
                onChange={(e) => handlePreferenceChange('difficultyLevel', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B1D39] focus:border-[#0B1D39]"
              >
                <option value="adaptive">Adaptive</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#0B1D39] opacity-70 mb-2">
                Time Format
              </label>
              <select
                value={preferences.timeFormat}
                onChange={(e) => handlePreferenceChange('timeFormat', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B1D39] focus:border-[#0B1D39]"
              >
                <option value="12">12 Hour</option>
                <option value="24">24 Hour</option>
              </select>
            </div>
          </div>

          <Button 
            onClick={handleSavePreferences}
            className="bg-[#0B1D39] text-white hover:bg-[#0B1D39]/90"
          >
            Save Preferences
          </Button>
        </div>

        {/* Account Deletion */}
        <div className="bg-white rounded-xl p-8 border border-red-200 shadow-sm">
          <div className="flex items-center mb-6">
            <AlertTriangle className="h-6 w-6 text-red-600 mr-3" />
            <h2 className="text-xl font-bold text-red-600">Account Deletion Option</h2>
          </div>
          
          <div className="bg-red-50 rounded-lg p-6 border border-red-200">
            <div className="flex items-start">
              <Shield className="h-6 w-6 text-red-600 mr-3 mt-1" />
              <div className="flex-1">
                <h3 className="font-medium text-red-800 mb-2">Delete Account</h3>
                <p className="text-red-700 text-sm mb-4">
                  Once you delete your account, there is no going back. Please be certain. All your data, progress, and achievements will be permanently removed.
                </p>
                <Button 
                  variant="outline"
                  className="border-red-300 text-red-600 hover:bg-red-50"
                  disabled
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Account
                </Button>
                <p className="text-xs text-red-600 mt-2">
                  Contact support to enable account deletion
                </p>
              </div>
            </div>
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
    </div>
  );
};

export default SettingsPage;
