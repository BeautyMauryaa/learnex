import React, { useState } from 'react';
import { Upload, FileText, Download, CheckCircle2, Brain, Book, Clock, X, Eye, Search } from 'lucide-react';
import Button from '../components/Button';
import Toast, { ToastType } from '../components/Toast';

interface SavedNote {
  id: string;
  title: string;
  content: string;
  date: string;
  subject: string;
  readTime: string;
}

const mockSavedNotes: SavedNote[] = [
  {
    id: '1',
    title: 'Organic Chemistry - Alkenes',
    content: 'Detailed notes about alkene reactions and mechanisms...',
    date: '2024-03-15',
    subject: 'Chemistry',
    readTime: '5 min read'
  },
  {
    id: '2',
    title: 'Newton\'s Laws of Motion',
    content: 'Comprehensive study of motion laws and applications...',
    date: '2024-03-14',
    subject: 'Physics',
    readTime: '7 min read'
  },
  {
    id: '3',
    title: 'Calculus Fundamentals',
    content: 'Basic principles of differentiation and integration...',
    date: '2024-03-13',
    subject: 'Mathematics',
    readTime: '6 min read'
  }
];

const SmartNotesPage: React.FC = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [topicText, setTopicText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedNotes, setGeneratedNotes] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<ToastType>('success');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNote, setSelectedNote] = useState<SavedNote | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
      setShowToast(true);
      setToastMessage(`File "${e.target.files[0].name}" uploaded successfully!`);
      setToastType('success');
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      setUploadedFile(files[0]);
      setShowToast(true);
      setToastMessage(`File "${files[0].name}" uploaded successfully!`);
      setToastType('success');
    }
  };

  const handleGenerateNotes = () => {
    if (!uploadedFile && !topicText) {
      setShowToast(true);
      setToastMessage('Please upload a file or enter a topic to generate notes.');
      setToastType('error');
      return;
    }

    setIsGenerating(true);

    // Mock AI generation delay with typing animation
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedNotes(`
## ${topicText || uploadedFile?.name}

### 🎯 Key Concepts
1. **Introduction to the topic**
   - Basic principles and fundamentals
   - Historical context and development
   - Core terminology and definitions

2. **Main Components**
   - Primary elements and structures
   - Secondary features and characteristics
   - Practical applications and use cases

3. **Important Formulas & Equations**
   - Key mathematical relationships
   - Practical usage examples
   - Problem-solving techniques

### 📝 Summary Points
✅ **Point 1:** Comprehensive overview of fundamental concepts
✅ **Point 2:** Practical applications in real-world scenarios
✅ **Point 3:** Integration with related topics and subjects

### 🧠 Remember
• **Key takeaway 1:** Essential principle for understanding
• **Key takeaway 2:** Critical application method
• **Key takeaway 3:** Important connection to broader concepts

### 📚 Practice Questions
1. **Question example 1:** Test your understanding of basic concepts
2. **Question example 2:** Apply knowledge to practical scenarios
3. **Question example 3:** Analyze complex relationships and patterns
      `);

      setShowToast(true);
      setToastMessage('Smart notes generated successfully!');
      setToastType('success');
    }, 3000);
  };

  const handleSaveNotes = () => {
    setShowToast(true);
    setToastMessage('Notes saved to your library!');
    setToastType('success');
  };

  const handleDownloadNotes = () => {
    setShowToast(true);
    setToastMessage('Notes downloaded successfully!');
    setToastType('success');
  };

  const filteredNotes = mockSavedNotes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Smart Notes</h1>
        <p className="text-gray-600">Generate AI-powered study notes from your materials</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Input Section */}
        <div className="xl:col-span-2 space-y-8">
          <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
            <div className="flex items-center mb-6">
              <Brain className="h-6 w-6 text-indigo-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">Generate Notes</h2>
            </div>

            {/* File Upload */}
            <div className="mb-8">
              <div 
                className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${
                  isDragOver 
                    ? 'border-indigo-500 bg-indigo-50' 
                    : 'border-gray-300 hover:border-indigo-400 hover:bg-gray-50'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={handleFileUpload}
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-gray-600 mb-2 text-lg">
                    Drop your file here, or{' '}
                    <span className="text-indigo-600 font-semibold hover:text-indigo-700">browse</span>
                  </p>
                  <p className="text-sm text-gray-500">PDF, DOCX, or TXT (max 10MB)</p>
                </label>
              </div>

              {uploadedFile && (
                <div className="mt-4 p-4 bg-indigo-50 rounded-xl flex items-center justify-between border border-indigo-200">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-indigo-600 mr-3" />
                    <div>
                      <span className="text-sm font-medium text-indigo-900 block">
                        {uploadedFile.name}
                      </span>
                      <span className="text-xs text-indigo-600">
                        {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setUploadedFile(null)}
                    className="text-indigo-600 hover:text-indigo-800 p-1"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              )}
            </div>

            {/* Topic Input */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Or Enter Topic
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                placeholder="e.g., Quantum Physics, Organic Chemistry, Machine Learning"
                value={topicText}
                onChange={(e) => setTopicText(e.target.value)}
              />
            </div>

            <Button
              onClick={handleGenerateNotes}
              disabled={isGenerating}
              className="w-full py-3 text-lg"
            >
              <Brain className="h-5 w-5 mr-2" />
              {isGenerating ? 'Generating Smart Notes...' : 'Generate Smart Notes'}
            </Button>
          </div>

          {/* Generated Notes */}
          {(generatedNotes || isGenerating) && (
            <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  {isGenerating ? 'Generating Notes...' : 'Generated Notes'}
                </h2>
                {!isGenerating && (
                  <div className="flex gap-3">
                    <Button variant="outline" onClick={handleDownloadNotes}>
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                    <Button onClick={handleSaveNotes}>
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Save to Library
                    </Button>
                  </div>
                )}
              </div>

              {isGenerating ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">AI is analyzing your content...</p>
                  </div>
                </div>
              ) : (
                <div className="prose max-w-none">
                  <div className="whitespace-pre-line text-gray-800 leading-relaxed">
                    {generatedNotes}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Saved Notes Library */}
        <div className="xl:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 sticky top-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">My Notes Library</h2>
              <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
                {mockSavedNotes.length} Notes
              </span>
            </div>

            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  placeholder="Search notes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-4 max-h-96 overflow-y-auto">
              {filteredNotes.map((note) => (
                <div
                  key={note.id}
                  className="p-4 rounded-xl bg-gray-50 hover:bg-gray-100 cursor-pointer transition-all duration-200 hover:shadow-md border border-gray-100"
                  onClick={() => setSelectedNote(note)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-gray-900 text-sm leading-tight">
                      {note.title}
                    </h3>
                    <button className="text-gray-400 hover:text-indigo-600 transition-colors">
                      <Eye className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                    <span className="flex items-center">
                      <Book className="h-3 w-3 mr-1" />
                      {note.subject}
                    </span>
                    <span>{note.date}</span>
                  </div>
                  
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{note.readTime}</span>
                  </div>
                </div>
              ))}
            </div>

            {filteredNotes.length === 0 && (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No notes found</p>
              </div>
            )}
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

      {/* Note Preview Modal */}
      {selectedNote && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[80vh] overflow-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedNote.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <Book className="h-4 w-4 mr-1" />
                      {selectedNote.subject}
                    </span>
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {selectedNote.readTime}
                    </span>
                    <span>{selectedNote.date}</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedNote(null)}
                  className="text-gray-400 hover:text-gray-600 p-2"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed">{selectedNote.content}</p>
              </div>
            </div>
            
            <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 rounded-b-2xl">
              <div className="flex justify-end gap-4">
                <Button variant="outline" onClick={() => setSelectedNote(null)}>
                  Close
                </Button>
                <Button>
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SmartNotesPage;