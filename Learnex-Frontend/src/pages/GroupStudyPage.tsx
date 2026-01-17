import React, { useState } from 'react';
import { Users, MessageSquare, FileUp, Send, Plus, Video } from 'lucide-react';
import Button from '../components/Button';
import Input from '../components/Input';
import Toast, { ToastType } from '../components/Toast';

type GroupView = 'join' | 'create' | 'dashboard';

interface GroupMember {
  id: number;
  name: string;
  status: 'online' | 'offline';
  avatar: string;
}

interface ChatMessage {
  id: number;
  sender: string;
  message: string;
  timestamp: Date;
  isSelf: boolean;
}

const GroupStudyPage: React.FC = () => {
  const [view, setView] = useState<GroupView>('join');
  const [groupName, setGroupName] = useState('');
  const [groupCode, setGroupCode] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<ToastType>('success');
  const [newMessage, setNewMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'chat' | 'files' | 'quiz'>('chat');
  
  // Mock data
  const [groupMembers] = useState<GroupMember[]>([
    {
      id: 1,
      name: 'John Doe (You)',
      status: 'online',
      avatar: 'JD'
    },
    {
      id: 2,
      name: 'Sarah Miller',
      status: 'online',
      avatar: 'SM'
    },
    {
      id: 3,
      name: 'Robert Johnson',
      status: 'offline',
      avatar: 'RJ'
    },
    {
      id: 4,
      name: 'Emily Williams',
      status: 'online',
      avatar: 'EW'
    }
  ]);
  
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      sender: 'Sarah Miller',
      message: 'Hey everyone! Are we meeting today to study for the chemistry exam?',
      timestamp: new Date(Date.now() - 60 * 60000),
      isSelf: false
    },
    {
      id: 2,
      sender: 'John Doe',
      message: 'Yes, I think we should. I\'m having trouble with the organic compounds section.',
      timestamp: new Date(Date.now() - 45 * 60000),
      isSelf: true
    },
    {
      id: 3,
      sender: 'Emily Williams',
      message: 'I can explain that part. I just uploaded some helpful notes to the files section.',
      timestamp: new Date(Date.now() - 30 * 60000),
      isSelf: false
    },
    {
      id: 4,
      sender: 'Sarah Miller',
      message: 'Great! Let\'s get started at 7 PM?',
      timestamp: new Date(Date.now() - 15 * 60000),
      isSelf: false
    }
  ]);
  
  const handleCreateGroup = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!groupName) {
      setShowToast(true);
      setToastMessage('Please enter a group name');
      setToastType('error');
      return;
    }
    
    // Generate a random 6-character code
    const randomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    setGroupCode(randomCode);
    setView('dashboard');
    
    setShowToast(true);
    setToastMessage(`Group "${groupName}" created successfully! Code: ${randomCode}`);
    setToastType('success');
  };
  
  const handleJoinGroup = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!groupCode) {
      setShowToast(true);
      setToastMessage('Please enter a group code');
      setToastType('error');
      return;
    }
    
    // Mock checking the code
    if (groupCode.length !== 6) {
      setShowToast(true);
      setToastMessage('Invalid group code. Please check and try again.');
      setToastType('error');
      return;
    }
    
    setGroupName('Chemistry Study Group');
    setView('dashboard');
    
    setShowToast(true);
    setToastMessage('Joined group successfully!');
    setToastType('success');
  };
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    const newChatMessage: ChatMessage = {
      id: chatMessages.length + 1,
      sender: 'John Doe',
      message: newMessage,
      timestamp: new Date(),
      isSelf: true
    };
    
    setChatMessages([...chatMessages, newChatMessage]);
    setNewMessage('');
  };
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Group Study</h1>
        <p className="text-gray-600">Collaborate with classmates in virtual study rooms</p>
      </div>
      
      {view === 'join' && (
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/2 bg-white rounded-lg shadow p-6 border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Join a Group</h2>
              <form onSubmit={handleJoinGroup}>
                <Input
                  id="group-code"
                  label="Enter Group Code"
                  placeholder="e.g., AB123C"
                  value={groupCode}
                  onChange={(e) => setGroupCode(e.target.value.toUpperCase())}
                  required
                />
                <Button type="submit" className="w-full">
                  Join Group
                </Button>
              </form>
            </div>
            
            <div className="w-full md:w-1/2 bg-white rounded-lg shadow p-6 border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Create a New Group</h2>
              <form onSubmit={handleCreateGroup}>
                <Input
                  id="group-name"
                  label="Group Name"
                  placeholder="e.g., Chemistry Study Group"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  required
                />
                <Button type="submit" className="w-full">
                  Create Group
                </Button>
              </form>
            </div>
          </div>
          
          <div className="mt-10 p-6 bg-indigo-50 rounded-lg">
            <h3 className="text-lg font-medium text-indigo-900 mb-2">How Group Study Works</h3>
            <ul className="list-disc pl-5 space-y-2 text-indigo-800">
              <li>Create a study group or join an existing one with a code</li>
              <li>Share notes, files, and resources with group members</li>
              <li>Chat in real-time to discuss topics and ask questions</li>
              <li>Create and take quizzes together to test your knowledge</li>
              <li>Schedule and join video study sessions (coming soon)</li>
            </ul>
          </div>
        </div>
      )}
      
      {view === 'dashboard' && (
        <div className="bg-white rounded-lg shadow border border-gray-100 overflow-hidden h-[calc(100vh-13rem)]">
          <div className="flex h-full">
            {/* Members Sidebar */}
            <div className="w-64 bg-gray-50 border-r border-gray-200 flex flex-col">
              <div className="p-4 border-b border-gray-200">
                <h2 className="font-semibold text-gray-900 truncate">{groupName}</h2>
                <div className="flex items-center mt-1">
                  <div className="w-4 h-4 rounded-full bg-green-400 mr-2"></div>
                  <span className="text-sm text-gray-600">{groupMembers.filter(m => m.status === 'online').length} online</span>
                </div>
              </div>
              
              <div className="overflow-y-auto flex-1">
                <div className="p-4">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Members ({groupMembers.length})
                  </h3>
                  <ul className="space-y-2">
                    {groupMembers.map(member => (
                      <li key={member.id} className="flex items-center">
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center text-white font-medium mr-2 ${
                          member.status === 'online' ? 'bg-indigo-600' : 'bg-gray-400'
                        }`}>
                          {member.avatar}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{member.name}</p>
                          <p className="text-xs text-gray-500">{member.status}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="p-4 border-t border-gray-200">
                <Button variant="outline" size="sm" className="w-full flex items-center justify-center">
                  <Plus className="h-4 w-4 mr-1" />
                  Invite Members
                </Button>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="flex-1 flex flex-col">
              {/* Tabs */}
              <div className="border-b border-gray-200">
                <div className="flex">
                  <button
                    className={`px-4 py-3 text-sm font-medium flex items-center ${
                      activeTab === 'chat'
                        ? 'text-indigo-900 border-b-2 border-indigo-900'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveTab('chat')}
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Chat
                  </button>
                  <button
                    className={`px-4 py-3 text-sm font-medium flex items-center ${
                      activeTab === 'files'
                        ? 'text-indigo-900 border-b-2 border-indigo-900'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveTab('files')}
                  >
                    <FileUp className="h-4 w-4 mr-2" />
                    Files
                  </button>
                  <button
                    className={`px-4 py-3 text-sm font-medium flex items-center ${
                      activeTab === 'quiz'
                        ? 'text-indigo-900 border-b-2 border-indigo-900'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveTab('quiz')}
                  >
                    <Users className="h-4 w-4 mr-2" />
                    Group Quiz
                  </button>
                </div>
              </div>
              
              {/* Tab Content */}
              <div className="flex-1 overflow-y-auto">
                {activeTab === 'chat' && (
                  <div className="flex flex-col h-full">
                    {/* Chat Messages */}
                    <div className="flex-1 p-4 overflow-y-auto">
                      <div className="space-y-4">
                        {chatMessages.map(message => (
                          <div
                            key={message.id}
                            className={`flex ${message.isSelf ? 'justify-end' : 'justify-start'}`}
                          >
                            {!message.isSelf && (
                              <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-800 font-medium mr-2">
                                {message.sender.split(' ').map(n => n[0]).join('')}
                              </div>
                            )}
                            <div className={`max-w-xs md:max-w-md ${
                              message.isSelf
                                ? 'bg-indigo-600 text-white rounded-l-lg rounded-tr-lg'
                                : 'bg-gray-100 text-gray-800 rounded-r-lg rounded-tl-lg'
                            } px-4 py-2 shadow-sm`}>
                              {!message.isSelf && (
                                <p className="text-xs font-semibold mb-1">{message.sender}</p>
                              )}
                              <p>{message.message}</p>
                              <p className={`text-xs mt-1 text-right ${
                                message.isSelf ? 'text-indigo-200' : 'text-gray-500'
                              }`}>
                                {formatTime(message.timestamp)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Chat Input */}
                    <div className="border-t border-gray-200 p-4">
                      <form onSubmit={handleSendMessage} className="flex gap-2">
                        <input
                          type="text"
                          className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          placeholder="Type your message..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                        />
                        <Button type="submit">
                          <Send className="h-4 w-4 mr-1" />
                          Send
                        </Button>
                      </form>
                    </div>
                  </div>
                )}
                
                {activeTab === 'files' && (
                  <div className="p-6">
                    <div className="mb-6">
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                        <FileUp className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                        <p className="text-gray-600 mb-2">Drag and drop files to share with your group</p>
                        <Button variant="outline" size="sm">
                          Browse Files
                        </Button>
                      </div>
                    </div>
                    
                    <h3 className="font-semibold text-gray-900 mb-4">Shared Files</h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-center p-3 border border-gray-200 rounded-md bg-gray-50">
                        <div className="p-2 bg-indigo-100 rounded-md mr-3">
                          <svg className="h-6 w-6 text-indigo-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                          </svg>
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">Organic Chemistry Notes.pdf</p>
                          <p className="text-xs text-gray-500">Uploaded by Emily Williams • 2 hours ago</p>
                        </div>
                        <Button variant="outline" size="sm">
                          Download
                        </Button>
                      </div>
                      
                      <div className="flex items-center p-3 border border-gray-200 rounded-md bg-gray-50">
                        <div className="p-2 bg-green-100 rounded-md mr-3">
                          <svg className="h-6 w-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                          </svg>
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">Chemistry Practice Problems.xlsx</p>
                          <p className="text-xs text-gray-500">Uploaded by Sarah Miller • 1 day ago</p>
                        </div>
                        <Button variant="outline" size="sm">
                          Download
                        </Button>
                      </div>
                      
                      <div className="flex items-center p-3 border border-gray-200 rounded-md bg-gray-50">
                        <div className="p-2 bg-blue-100 rounded-md mr-3">
                          <svg className="h-6 w-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"></path>
                          </svg>
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">Professor's Lecture Notes.docx</p>
                          <p className="text-xs text-gray-500">Uploaded by John Doe • 3 days ago</p>
                        </div>
                        <Button variant="outline" size="sm">
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === 'quiz' && (
                  <div className="p-6">
                    <div className="text-center mb-8">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Group Quiz Challenge</h3>
                      <p className="text-gray-600 mb-6">
                        Test your knowledge together! Create a quiz to challenge your group members and compare results.
                      </p>
                      
                      <div className="flex justify-center space-x-4">
                        <Button>
                          Create Group Quiz
                        </Button>
                        <Button variant="outline" className="flex items-center">
                          <Video className="h-4 w-4 mr-2" />
                          Start Study Session
                        </Button>
                      </div>
                    </div>
                    
                    <div className="bg-indigo-50 rounded-lg p-5 mb-6">
                      <h4 className="font-semibold text-indigo-900 mb-2">Recent Group Quiz Results</h4>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-indigo-200">
                          <thead>
                            <tr>
                              <th className="px-4 py-2 text-left text-xs font-medium text-indigo-800 uppercase tracking-wider">Name</th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-indigo-800 uppercase tracking-wider">Score</th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-indigo-800 uppercase tracking-wider">Time Taken</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-indigo-100">
                            <tr>
                              <td className="px-4 py-2 whitespace-nowrap text-sm text-indigo-900">Sarah Miller</td>
                              <td className="px-4 py-2 whitespace-nowrap text-sm text-indigo-900">95%</td>
                              <td className="px-4 py-2 whitespace-nowrap text-sm text-indigo-900">12m 30s</td>
                            </tr>
                            <tr>
                              <td className="px-4 py-2 whitespace-nowrap text-sm text-indigo-900">John Doe (You)</td>
                              <td className="px-4 py-2 whitespace-nowrap text-sm text-indigo-900">90%</td>
                              <td className="px-4 py-2 whitespace-nowrap text-sm text-indigo-900">15m 45s</td>
                            </tr>
                            <tr>
                              <td className="px-4 py-2 whitespace-nowrap text-sm text-indigo-900">Emily Williams</td>
                              <td className="px-4 py-2 whitespace-nowrap text-sm text-indigo-900">88%</td>
                              <td className="px-4 py-2 whitespace-nowrap text-sm text-indigo-900">14m 10s</td>
                            </tr>
                            <tr>
                              <td className="px-4 py-2 whitespace-nowrap text-sm text-indigo-900">Robert Johnson</td>
                              <td className="px-4 py-2 whitespace-nowrap text-sm text-indigo-900">82%</td>
                              <td className="px-4 py-2 whitespace-nowrap text-sm text-indigo-900">18m 22s</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Quiz History</h4>
                      <div className="space-y-3">
                        <div className="border border-gray-200 rounded-md p-4">
                          <div className="flex justify-between items-center">
                            <h5 className="font-medium text-gray-900">Chemistry - Organic Compounds</h5>
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                              Completed
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">Date: Jun 12, 2025</p>
                          <div className="flex justify-between items-center mt-3">
                            <p className="text-sm text-gray-600">Group Average: 89%</p>
                            <Button variant="outline" size="sm">
                              View Results
                            </Button>
                          </div>
                        </div>
                        
                        <div className="border border-gray-200 rounded-md p-4">
                          <div className="flex justify-between items-center">
                            <h5 className="font-medium text-gray-900">Chemistry - Periodic Table</h5>
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                              Completed
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">Date: Jun 5, 2025</p>
                          <div className="flex justify-between items-center mt-3">
                            <p className="text-sm text-gray-600">Group Average: 92%</p>
                            <Button variant="outline" size="sm">
                              View Results
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      
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

export default GroupStudyPage;
