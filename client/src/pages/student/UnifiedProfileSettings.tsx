import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  User, Mail, Calendar, Lock, Settings, LogOut, Upload,
  Bell, Clock, FileText, Trash2, Shield, Globe, Eye, EyeOff, AlertTriangle
} from 'lucide-react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Toast, { ToastType } from '../../components/Toast';

const UnifiedProfileSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'preferences' | 'notifications' | 'documents' | 'deletion'>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<ToastType>('success');
  const [loading, setLoading] = useState(false);
  const [showPasswords, setShowPasswords] = useState({ current: false, new: false, confirm: false });

  const [userData, setUserData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    school: '',
    major: '',
    gradYear: '',
    bio: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [preferences, setPreferences] = useState({
    language: 'english',
    theme: 'light',
    emailNotifications: true,
    pushNotifications: false,
    testReminders: true,
    defaultTestDuration: '60',
    difficultyLevel: 'adaptive',
    timeFormat: '12',
  });

  // Attach token for axios
  axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/stu-setting/');
        const data = res.data;
        if (!data) return;

        setUserData(prev => ({
          ...prev,
          fullName: data.fullName || '',
          email: data.email || '',
          mobile: data.mobile || '',
          school: data.school || '',
          major: data.major || '',
          gradYear: data.gradYear || '',
          bio: data.bio || '',
        }));

        setPreferences({
          language: data.preferences?.language || 'english',
          theme: data.preferences?.theme || 'light',
          emailNotifications: data.preferences?.notifications?.email ?? true,
          pushNotifications: data.preferences?.notifications?.push ?? false,
          testReminders: data.preferences?.notifications?.reminders ?? true,
          defaultTestDuration: data.preferences?.testDuration || '60',
          difficultyLevel: data.preferences?.difficulty || 'adaptive',
          timeFormat: data.preferences?.timeFormat || '12',
        });
      } catch (err) {
        console.error('Error fetching settings:', err);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handlePreferenceChange = (key: string, value: any) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  // 📌 Save profile
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put('/api/stu-setting/account', {
        fullName: userData.fullName,
        email: userData.email,
        mobile: userData.mobile,
        school: userData.school,
        major: userData.major,
        gradYear: userData.gradYear,
        bio: userData.bio,
      });
      setToastMessage('Profile updated!');
      setToastType('success');
      setIsEditing(false);
    } catch (err: any) {
      setToastMessage(err.response?.data?.message || 'Update failed');
      setToastType('error');
    } finally {
      setShowToast(true);
    }
  };

  // 📌 Change password
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (userData.newPassword !== userData.confirmPassword) {
      setToastMessage('Passwords do not match!');
      setToastType('error');
      setShowToast(true);
      return;
    }
    try {
      await axios.put('/api/stu-setting/password', {
        currentPassword: userData.currentPassword,
        newPassword: userData.newPassword,
      });
      setToastMessage('Password updated!');
      setToastType('success');
      setUserData(prev => ({ ...prev, currentPassword: '', newPassword: '', confirmPassword: '' }));
    } catch (err: any) {
      setToastMessage(err.response?.data?.message || 'Password change failed');
      setToastType('error');
    } finally {
      setShowToast(true);
    }
  };

  // 📌 Save preferences
  const handleSavePreferences = async () => {
    try {
      await axios.put('/api/stu-setting/preferences', {
        language: preferences.language,
        theme: preferences.theme,
        testDuration: preferences.defaultTestDuration,
        difficulty: preferences.difficultyLevel,
        timeFormat: preferences.timeFormat,
        notifications: {
          email: preferences.emailNotifications,
          push: preferences.pushNotifications,
          reminders: preferences.testReminders,
        },
      });
      setToastMessage('Preferences saved!');
      setToastType('success');
    } catch (err: any) {
      setToastMessage(err.response?.data?.message || 'Failed to save preferences');
      setToastType('error');
    } finally {
      setShowToast(true);
    }
  };

  // 📌 Upload document
  const handleDocumentUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const doc = new FormData();
    doc.append('document', e.target.files[0]);
    try {
      await axios.post('/api/stu-setting/documents', doc, { headers: { 'Content-Type': 'multipart/form-data' } });
      setToastMessage('Document uploaded!');
      setToastType('success');
    } catch (err: any) {
      setToastMessage(err.response?.data?.message || 'Upload failed');
      setToastType('error');
    } finally {
      setShowToast(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 pt-16">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">My Profile & Settings</h1>
        <p className="text-gray-600">Manage all your account, preferences, and security settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
                <span className="text-3xl font-semibold text-indigo-800">{userData.fullName?.split(' ').map(n => n[0]).join('')}</span>
              </div>
              <h2 className="text-xl font-bold text-gray-900">{userData.fullName}</h2>
              <p className="text-gray-600 mb-4">{userData.school}</p>

              <div className="w-full border-t border-gray-200 pt-4 mt-2">
                <nav className="flex flex-col space-y-1">
                  <button onClick={() => setActiveTab('profile')} className={`flex items-center px-3 py-2 rounded-md ${activeTab === 'profile' ? 'bg-indigo-50 text-indigo-900' : 'text-gray-700 hover:bg-gray-50'}`}><User className="h-5 w-5 mr-2" />Profile</button>
                  <button onClick={() => setActiveTab('security')} className={`flex items-center px-3 py-2 rounded-md ${activeTab === 'security' ? 'bg-indigo-50 text-indigo-900' : 'text-gray-700 hover:bg-gray-50'}`}><Lock className="h-5 w-5 mr-2" />Security</button>
                  <button onClick={() => setActiveTab('preferences')} className={`flex items-center px-3 py-2 rounded-md ${activeTab === 'preferences' ? 'bg-indigo-50 text-indigo-900' : 'text-gray-700 hover:bg-gray-50'}`}><Settings className="h-5 w-5 mr-2" />Preferences</button>
                  <button onClick={() => setActiveTab('notifications')} className={`flex items-center px-3 py-2 rounded-md ${activeTab === 'notifications' ? 'bg-indigo-50 text-indigo-900' : 'text-gray-700 hover:bg-gray-50'}`}><Bell className="h-5 w-5 mr-2" />Notifications</button>
                  <button onClick={() => setActiveTab('documents')} className={`flex items-center px-3 py-2 rounded-md ${activeTab === 'documents' ? 'bg-indigo-50 text-indigo-900' : 'text-gray-700 hover:bg-gray-50'}`}><FileText className="h-5 w-5 mr-2" />Documents</button>
                  <button onClick={() => setActiveTab('deletion')} className={`flex items-center px-3 py-2 rounded-md text-red-600 hover:bg-red-50`}><Trash2 className="h-5 w-5 mr-2" />Delete Account</button>
                </nav>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {activeTab === 'profile' && (
            <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
              {!isEditing ? (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-semibold text-gray-900">Profile Information</h2>
                    <Button variant="outline" onClick={() => setIsEditing(true)}>Edit Profile</Button>
                  </div>
                  <div className="space-y-4">
                    <p><strong>Full Name:</strong> {userData.fullName}</p>
                    <p><strong>Email:</strong> {userData.email}</p>
                    <p><strong>Mobile:</strong> {userData.mobile}</p>
                    <p><strong>School:</strong> {userData.school}</p>
                    <p><strong>Major:</strong> {userData.major}</p>
                    <p><strong>Graduation Year:</strong> {userData.gradYear}</p>
                    <p><strong>Bio:</strong> {userData.bio}</p>
                  </div>
                </>
              ) : (
                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <Input name="fullName" label="Full Name" value={userData.fullName} onChange={handleChange} required />
                  <Input name="email" label="Email" value={userData.email} onChange={handleChange} type="email" required />
                  <Input name="mobile" label="Mobile" value={userData.mobile} onChange={handleChange} required />
                  <Input name="school" label="School" value={userData.school} onChange={handleChange} />
                  <Input name="major" label="Major" value={userData.major} onChange={handleChange} />
                  <Input name="gradYear" label="Graduation Year" value={userData.gradYear} onChange={handleChange} />
                  <textarea name="bio" rows={4} className="w-full px-3 py-2 border rounded-md" value={userData.bio} onChange={handleChange}></textarea>
                  <div className="flex space-x-4">
                    <Button type="submit">Save</Button>
                    <Button variant="outline" type="button" onClick={() => setIsEditing(false)}>Cancel</Button>
                  </div>
                </form>
              )}
            </div>
          )}

          {activeTab === 'security' && (
            <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Change Password</h2>
              <form onSubmit={handleChangePassword} className="space-y-4">
                {['currentPassword', 'newPassword', 'confirmPassword'].map((field) => (
                  <div key={field} className="relative">
                    <Input
                      id={field}
                      name={field}
                      label={field === 'currentPassword' ? 'Current Password' : field === 'newPassword' ? 'New Password' : 'Confirm New Password'}
                      type={showPasswords[field.replace('Password', '') as 'current' | 'new' | 'confirm'] ? 'text' : 'password'}
                      value={userData[field as keyof typeof userData]}
                      onChange={handleChange}
                      required
                    />
                    <button type="button" onClick={() => togglePasswordVisibility(field.replace('Password', '') as 'current' | 'new' | 'confirm')} className="absolute right-3 top-8">
                      {showPasswords[field.replace('Password', '') as 'current' | 'new' | 'confirm'] ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                ))}
                <Button type="submit">Update Password</Button>
              </form>
            </div>
          )}

          {activeTab === 'preferences' && (
            <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Preferences</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label>Language</label>
                  <select value={preferences.language} onChange={(e) => handlePreferenceChange('language', e.target.value)}>
                    <option value="english">English</option>
                    <option value="hindi">Hindi</option>
                    <option value="spanish">Spanish</option>
                  </select>
                </div>
                <div>
                  <label>Theme</label>
                  <select value={preferences.theme} onChange={(e) => handlePreferenceChange('theme', e.target.value)}>
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="auto">Auto</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label>Default Test Duration</label>
                  <select value={preferences.defaultTestDuration} onChange={(e) => handlePreferenceChange('defaultTestDuration', e.target.value)}>
                    <option value="30">30</option>
                    <option value="60">60</option>
                    <option value="90">90</option>
                    <option value="120">120</option>
                  </select>
                </div>
                <div>
                  <label>Difficulty Level</label>
                  <select value={preferences.difficultyLevel} onChange={(e) => handlePreferenceChange('difficultyLevel', e.target.value)}>
                    <option value="adaptive">Adaptive</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
              </div>
              <div className="mb-4">
                <label>Time Format</label>
                <select value={preferences.timeFormat} onChange={(e) => handlePreferenceChange('timeFormat', e.target.value)}>
                  <option value="12">12 Hours</option>
                  <option value="24">24 Hours</option>
                </select>
              </div>
              <Button onClick={handleSavePreferences}>Save Preferences</Button>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Notifications</h2>
              <div className="space-y-2">
                <label>
                  <input type="checkbox" checked={preferences.emailNotifications} onChange={(e) => handlePreferenceChange('emailNotifications', e.target.checked)} /> Email Notifications
                </label>
                <label>
                  <input type="checkbox" checked={preferences.pushNotifications} onChange={(e) => handlePreferenceChange('pushNotifications', e.target.checked)} /> Push Notifications
                </label>
                <label>
                  <input type="checkbox" checked={preferences.testReminders} onChange={(e) => handlePreferenceChange('testReminders', e.target.checked)} /> Test Reminders
                </label>
              </div>
              <Button className="mt-4" onClick={handleSavePreferences}>Save Notification Settings</Button>
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Upload Documents</h2>
              <input type="file" onChange={handleDocumentUpload} />
            </div>
          )}

          {activeTab === 'deletion' && (
            <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
              <h2 className="text-lg font-semibold text-red-600 mb-6">Delete Account</h2>
              <p className="mb-4 text-gray-600">Warning: This action is irreversible. All your data will be permanently deleted.</p>
              <Button variant="destructive" onClick={async () => {
                if (confirm('Are you sure you want to delete your account?')) {
                  try {
                    await axios.delete('/api/stu-setting/account');
                    localStorage.clear();
                    window.location.href = '/';
                  } catch (err) {
                    alert('Failed to delete account');
                  }
                }
              }}>Delete My Account</Button>
            </div>
          )}
        </div>
      </div>

      {showToast && <Toast message={toastMessage} type={toastType} onClose={() => setShowToast(false)} />}
    </div>
  );
};

export default UnifiedProfileSettings;
