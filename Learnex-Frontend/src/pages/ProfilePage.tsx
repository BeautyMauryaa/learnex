import React, { useState } from 'react';
import { User, Mail, Calendar, Settings, Lock, LogOut } from 'lucide-react';
import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';
import Button from '../components/Button';
import Input from '../components/Input';
import Toast, { ToastType } from '../components/Toast';

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'security'>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<ToastType>('success');
  
  const [userData, setUserData] = useState({
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    school: 'University of Technology',
    major: 'Computer Science',
    gradYear: '2026',
    bio: 'Passionate student focused on mastering programming and data science concepts.'
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    setShowToast(true);
    setToastMessage('Profile updated successfully!');
    setToastType('success');
  };
  
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setShowToast(true);
    setToastMessage('Password changed successfully!');
    setToastType('success');
  };
  
  return (
    <Layout>
      <div className="flex h-[calc(100vh-4rem)]">
        <Sidebar />
        
        <div className="flex-1 overflow-auto p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
            <p className="text-gray-600">View and update your personal information</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
                    <span className="text-3xl font-semibold text-indigo-800">JD</span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">{userData.fullName}</h2>
                  <p className="text-gray-600 mb-4">{userData.school}</p>
                  
                  <div className="w-full border-t border-gray-200 pt-4 mt-2">
                    <nav className="flex flex-col space-y-1">
                      <button
                        onClick={() => setActiveTab('profile')}
                        className={`flex items-center px-3 py-2 rounded-md ${
                          activeTab === 'profile' 
                            ? 'bg-indigo-50 text-indigo-900' 
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <User className="h-5 w-5 mr-2" />
                        Profile Information
                      </button>
                      <button
                        onClick={() => setActiveTab('security')}
                        className={`flex items-center px-3 py-2 rounded-md ${
                          activeTab === 'security' 
                            ? 'bg-indigo-50 text-indigo-900' 
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <Lock className="h-5 w-5 mr-2" />
                        Security
                      </button>
                      <button
                        className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50"
                      >
                        <Settings className="h-5 w-5 mr-2" />
                        Preferences
                      </button>
                      <button
                        className="flex items-center px-3 py-2 rounded-md text-red-600 hover:bg-red-50"
                      >
                        <LogOut className="h-5 w-5 mr-2" />
                        Logout
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6 border border-gray-100 mt-6">
                <h3 className="font-semibold text-gray-900 mb-4">Account Level</h3>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                    <svg className="h-6 w-6 text-indigo-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697A9.001 9.001 0 0117.42 4.743c3.07 2.465 3.667 6.92 1.565 10.2-1.966 3.07-6.012 4.255-9.305 2.657C6.388 16.09 4.5 12.711 4.5 9.006a8.968 8.968 0 013.335-7"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Student Plan</p>
                    <p className="text-sm text-gray-600">Free tier</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  Upgrade Plan
                </Button>
              </div>
            </div>
            
            {/* Main content */}
            <div className="lg:col-span-3">
              {activeTab === 'profile' && (
                <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-semibold text-gray-900">Profile Information</h2>
                    {!isEditing && (
                      <Button variant="outline" onClick={() => setIsEditing(true)}>
                        Edit Profile
                      </Button>
                    )}
                  </div>
                  
                  {isEditing ? (
                    <form onSubmit={handleSaveProfile}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                          id="fullName"
                          name="fullName"
                          label="Full Name"
                          value={userData.fullName}
                          onChange={handleChange}
                          required
                        />
                        <Input
                          id="email"
                          name="email"
                          label="Email"
                          type="email"
                          value={userData.email}
                          onChange={handleChange}
                          required
                        />
                        <Input
                          id="school"
                          name="school"
                          label="School/University"
                          value={userData.school}
                          onChange={handleChange}
                        />
                        <Input
                          id="major"
                          name="major"
                          label="Field of Study/Major"
                          value={userData.major}
                          onChange={handleChange}
                        />
                        <Input
                          id="gradYear"
                          name="gradYear"
                          label="Graduation Year"
                          value={userData.gradYear}
                          onChange={handleChange}
                        />
                      </div>
                      
                      <div className="mt-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Bio
                        </label>
                        <textarea
                          name="bio"
                          rows={4}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                          value={userData.bio}
                          onChange={handleChange}
                        ></textarea>
                      </div>
                      
                      <div className="flex justify-end space-x-4 mt-6">
                        <Button variant="outline" type="button" onClick={() => setIsEditing(false)}>
                          Cancel
                        </Button>
                        <Button type="submit">
                          Save Changes
                        </Button>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Personal Information</h3>
                        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
                          <div>
                            <div className="flex items-center">
                              <User className="h-5 w-5 text-gray-400 mr-2" />
                              <span className="text-sm text-gray-500">Full Name</span>
                            </div>
                            <p className="mt-1 text-gray-900">{userData.fullName}</p>
                          </div>
                          <div>
                            <div className="flex items-center">
                              <Mail className="h-5 w-5 text-gray-400 mr-2" />
                              <span className="text-sm text-gray-500">Email Address</span>
                            </div>
                            <p className="mt-1 text-gray-900">{userData.email}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border-t border-gray-200 pt-6">
                        <h3 className="text-sm font-medium text-gray-500">Academic Information</h3>
                        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
                          <div>
                            <div className="flex items-center">
                              <svg className="h-5 w-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
                                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"></path>
                              </svg>
                              <span className="text-sm text-gray-500">School/University</span>
                            </div>
                            <p className="mt-1 text-gray-900">{userData.school}</p>
                          </div>
                          <div>
                            <div className="flex items-center">
                              <svg className="h-5 w-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                              </svg>
                              <span className="text-sm text-gray-500">Field of Study/Major</span>
                            </div>
                            <p className="mt-1 text-gray-900">{userData.major}</p>
                          </div>
                          <div>
                            <div className="flex items-center">
                              <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                              <span className="text-sm text-gray-500">Graduation Year</span>
                            </div>
                            <p className="mt-1 text-gray-900">{userData.gradYear}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border-t border-gray-200 pt-6">
                        <h3 className="text-sm font-medium text-gray-500">Bio</h3>
                        <p className="mt-3 text-gray-900">{userData.bio}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {activeTab === 'security' && (
                <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
                  <div className="mb-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-6">Security Settings</h2>
                    
                    <form onSubmit={handleChangePassword}>
                      <h3 className="text-md font-medium text-gray-900 mb-4">Change Password</h3>
                      <div className="space-y-4">
                        <Input
                          id="currentPassword"
                          label="Current Password"
                          type="password"
                          required
                        />
                        <Input
                          id="newPassword"
                          label="New Password"
                          type="password"
                          required
                        />
                        <Input
                          id="confirmPassword"
                          label="Confirm New Password"
                          type="password"
                          required
                        />
                      </div>
                      
                      <div className="mt-6">
                        <Button type="submit">Update Password</Button>
                      </div>
                    </form>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-md font-medium text-gray-900 mb-4">Two-Factor Authentication</h3>
                    <p className="text-gray-600 mb-4">
                      Add an extra layer of security to your account by enabling two-factor authentication.
                    </p>
                    <Button variant="outline">Enable 2FA</Button>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-6 mt-6">
                    <h3 className="text-md font-medium text-gray-900 mb-4">Connected Accounts</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <svg className="h-8 w-8 mr-3" viewBox="0 0 24 24">
                            <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                              <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                              <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
                              <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
                              <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
                            </g>
                          </svg>
                          <div>
                            <p className="font-medium text-gray-900">Google</p>
                            <p className="text-sm text-gray-600">john.doe@gmail.com</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">Disconnect</Button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <svg className="h-8 w-8 mr-3 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                          </svg>
                          <div>
                            <p className="font-medium text-gray-900">Facebook</p>
                            <p className="text-sm text-gray-600">Not connected</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">Connect</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-6 mt-6">
                    <h3 className="text-md font-medium text-red-600 mb-4">Danger Zone</h3>
                    <p className="text-gray-600 mb-4">
                      Once you delete your account, there is no going back. Please be certain.
                    </p>
                    <Button variant="outline" className="text-red-600 border-red-300 hover:bg-red-50">
                      Delete Account
                    </Button>
                  </div>
                </div>
              )}
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
    </Layout>
  );
};

export default ProfilePage;