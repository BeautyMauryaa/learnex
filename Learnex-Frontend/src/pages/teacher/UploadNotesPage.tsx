

// ===== UploadNotesPage.tsx (Fixed) =====
import { useState } from 'react';
import { Upload, FileText, Trash2, Edit, Download, Eye, Plus } from 'lucide-react';

interface Note {
  id: number;
  title: string;
  description: string;
  subject: string;
  fileType: 'pdf' | 'doc' | 'ppt' | 'text';
  fileSize: string;
  uploadDate: string;
  downloads: number;
  isPublic: boolean;
}

const UploadNotesPage = () => {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: 1,
      title: 'React Hooks Complete Guide',
      description: 'Comprehensive guide covering useState, useEffect, useContext and custom hooks',
      subject: 'React Development',
      fileType: 'pdf',
      fileSize: '2.5 MB',
      uploadDate: '2024-01-20',
      downloads: 45,
      isPublic: true
    },
    {
      id: 2,
      title: 'JavaScript ES6+ Features',
      description: 'Modern JavaScript features including arrow functions, destructuring, and modules',
      subject: 'JavaScript',
      fileType: 'doc',
      fileSize: '1.8 MB',
      uploadDate: '2024-01-18',
      downloads: 32,
      isPublic: true
    },
    {
      id: 3,
      title: 'CSS Grid Layout Presentation',
      description: 'Visual presentation on CSS Grid with practical examples',
      subject: 'CSS',
      fileType: 'ppt',
      fileSize: '4.2 MB',
      uploadDate: '2024-01-15',
      downloads: 28,
      isPublic: false
    }
  ]);

  const [showUploadForm, setShowUploadForm] = useState(false);
  const [uploadData, setUploadData] = useState({
    title: '',
    description: '',
    subject: '',
    isPublic: true
  });

  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFiles = (files: FileList) => {
    console.log('Files to upload:', files);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newNote: Note = {
      id: Date.now(),
      ...uploadData,
      fileType: 'pdf',
      fileSize: '1.2 MB',
      uploadDate: new Date().toISOString().split('T')[0],
      downloads: 0
    };
    
    setNotes([newNote, ...notes]);
    setUploadData({ title: '', description: '', subject: '', isPublic: true });
    setShowUploadForm(false);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      setNotes(notes.filter(note => note.id !== id));
    }
  };

  const toggleVisibility = (id: number) => {
    setNotes(notes.map(note => 
      note.id === id ? { ...note, isPublic: !note.isPublic } : note
    ));
  };

  // Fixed: Removed unused parameter
  const getFileIcon = () => {
    return <FileText className="text-blue-600" size={20} />;
  };

  const subjects = ['React Development', 'JavaScript', 'CSS', 'HTML', 'Node.js', 'Database', 'Other'];

  return (
    <div className="p-4 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-[#14213D] mb-2">Upload Notes</h1>
              <p className="text-gray-600">Share study materials and resources with your students</p>
            </div>
            <button
              onClick={() => setShowUploadForm(true)}
              className="bg-[#14213D] text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition-colors flex items-center space-x-2"
            >
              <Plus size={20} />
              <span>Upload New Note</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#14213D] mb-1">{notes.length}</div>
              <div className="text-gray-600 text-sm">Total Notes</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-1">
                {notes.filter(n => n.isPublic).length}
              </div>
              <div className="text-gray-600 text-sm">Public Notes</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">
                {notes.reduce((sum, note) => sum + note.downloads, 0)}
              </div>
              <div className="text-gray-600 text-sm">Total Downloads</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-1">
                {[...new Set(notes.map(n => n.subject))].length}
              </div>
              <div className="text-gray-600 text-sm">Subjects</div>
            </div>
          </div>
        </div>

        {showUploadForm && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold text-[#14213D] mb-4">Upload New Note</h2>
            
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center mb-6 transition-colors ${
                dragActive ? 'border-[#14213D] bg-blue-50' : 'border-gray-300'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="mx-auto mb-4 text-gray-400" size={48} />
              <p className="text-lg font-medium text-gray-700 mb-2">
                Drag and drop your files here, or click to browse
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Supported formats: PDF, DOC, DOCX, PPT, PPTX (Max 10MB)
              </p>
              <input
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.ppt,.pptx"
                onChange={(e) => e.target.files && handleFiles(e.target.files)}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="bg-[#14213D] text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition-colors cursor-pointer inline-block"
              >
                Choose Files
              </label>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={uploadData.title}
                    onChange={(e) => setUploadData({ ...uploadData, title: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#14213D] focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <select
                    value={uploadData.subject}
                    onChange={(e) => setUploadData({ ...uploadData, subject: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#14213D] focus:border-transparent"
                    required
                  >
                    <option value="">Select Subject</option>
                    {subjects.map(subject => (
                      <option key={subject} value={subject}>{subject}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={uploadData.description}
                  onChange={(e) => setUploadData({ ...uploadData, description: e.target.value })}
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#14213D] focus:border-transparent"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={uploadData.isPublic}
                    onChange={(e) => setUploadData({ ...uploadData, isPublic: e.target.checked })}
                    className="rounded text-[#14213D] focus:ring-[#14213D]"
                  />
                  <span className="text-sm text-gray-700">Make this note publicly available to all students</span>
                </label>
              </div>

              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="bg-[#14213D] text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition-colors"
                >
                  Upload Note
                </button>
                <button
                  type="button"
                  onClick={() => setShowUploadForm(false)}
                  className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-[#14213D]">Uploaded Notes</h2>
          
          {notes.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <FileText className="mx-auto mb-4 text-gray-400" size={48} />
              <p className="text-gray-500">No notes uploaded yet. Upload your first note to get started!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {notes.map((note) => (
                <div key={note.id} className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="bg-gray-100 p-3 rounded-lg">
                        {getFileIcon()}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-[#14213D]">{note.title}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            note.isPublic ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {note.isPublic ? 'Public' : 'Private'}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-2">{note.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>Subject: {note.subject}</span>
                          <span>Size: {note.fileSize}</span>
                          <span>Uploaded: {note.uploadDate}</span>
                          <span>Downloads: {note.downloads}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => toggleVisibility(note.id)}
                        className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                          note.isPublic 
                            ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                            : 'bg-green-100 text-green-700 hover:bg-green-200'
                        }`}
                      >
                        {note.isPublic ? 'Make Private' : 'Make Public'}
                      </button>
                      <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                        <Eye size={16} />
                      </button>
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Download size={16} />
                      </button>
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(note.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadNotesPage
