import React, { useState } from 'react';
import { User, Mail, Calendar, Lock, Settings, LogOut } from 'lucide-react';
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
    bio: 'Passionate student focused on mastering programming and data science concepts.',
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
    <div className="min-h-screen bg-gray-50 p-8 pt-16">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
        <p className="text-gray-600">View and update your personal information</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Tabs Menu */}
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
                      activeTab === 'profile' ? 'bg-indigo-50 text-indigo-900' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <User className="h-5 w-5 mr-2" />
                    Profile Information
                  </button>
                  <button
                    onClick={() => setActiveTab('security')}
                    className={`flex items-center px-3 py-2 rounded-md ${
                      activeTab === 'security' ? 'bg-indigo-50 text-indigo-900' : 'text-gray-700 hover:bg-gray-50'
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
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2">
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
                          <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-500">Graduation Year</span>
                        </div>
                        <p className="mt-1 text-gray-900">{userData.gradYear}</p>
                      </div>
                      <div>
                        <div className="flex items-center">
                          <span className="text-sm text-gray-500">Major</span>
                        </div>
                        <p className="mt-1 text-gray-900">{userData.major}</p>
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
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Security Settings</h2>
              <form onSubmit={handleChangePassword}>
                <div className="space-y-4">
                  <Input id="currentPassword" label="Current Password" type="password" required />
                  <Input id="newPassword" label="New Password" type="password" required />
                  <Input id="confirmPassword" label="Confirm New Password" type="password" required />
                </div>
                <div className="mt-6">
                  <Button type="submit">Update Password</Button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>

      {showToast && (
        <Toast message={toastMessage} type={toastType} onClose={() => setShowToast(false)} />
      )}
    </div>
  );
};

export default ProfilePage;
