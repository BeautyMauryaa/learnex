import { useState } from 'react';
import { Plus, Trash2, Save, Eye } from 'lucide-react';

interface Question {
  id: number;
  type: 'mcq' | 'subjective';
  question: string;
  options?: string[];
  correctAnswer?: number;
  points: number;
}

const CreateExamPage = () => {
  const [examData, setExamData] = useState({
    title: '',
    description: '',
    duration: '',
    totalMarks: 0,
    instructions: '',
    deadline: ''
  });

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Partial<Question>>({
    type: 'mcq',
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    points: 1
  });

  const addQuestion = () => {
    if (currentQuestion.question) {
      const newQuestion: Question = {
        id: Date.now(),
        type: currentQuestion.type || 'mcq',
        question: currentQuestion.question,
        options: currentQuestion.type === 'mcq' ? currentQuestion.options : undefined,
        correctAnswer: currentQuestion.type === 'mcq' ? currentQuestion.correctAnswer : undefined,
        points: currentQuestion.points || 1
      };
      
      setQuestions([...questions, newQuestion]);
      setCurrentQuestion({
        type: 'mcq',
        question: '',
        options: ['', '', '', ''],
        correctAnswer: 0,
        points: 1
      });
      
      // Update total marks
      setExamData(prev => ({
        ...prev,
        totalMarks: prev.totalMarks + (currentQuestion.points || 1)
      }));
    }
  };

  const removeQuestion = (id: number) => {
    const questionToRemove = questions.find(q => q.id === id);
    if (questionToRemove) {
      setQuestions(questions.filter(q => q.id !== id));
      setExamData(prev => ({
        ...prev,
        totalMarks: prev.totalMarks - questionToRemove.points
      }));
    }
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...(currentQuestion.options || ['', '', '', ''])];
    newOptions[index] = value;
    setCurrentQuestion({ ...currentQuestion, options: newOptions });
  };

  const saveExam = () => {
    if (examData.title && questions.length > 0) {
      // Here you would save to backend
      console.log('Saving exam:', { examData, questions });
      alert('Exam saved successfully!');
    } else {
      alert('Please fill in exam title and add at least one question.');
    }
  };

  return (
    <div className="p-4 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-[#14213D] mb-2">Create New Exam</h1>
          <p className="text-gray-600">Design comprehensive assessments for your students</p>
        </div>

        {/* Exam Details */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold text-[#14213D] mb-4">Exam Details</h2>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Exam Title</label>
              <input
                type="text"
                value={examData.title}
                onChange={(e) => setExamData({ ...examData, title: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#14213D] focus:border-transparent"
                placeholder="e.g., React Fundamentals Quiz"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Duration (minutes)</label>
              <input
                type="number"
                value={examData.duration}
                onChange={(e) => setExamData({ ...examData, duration: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#14213D] focus:border-transparent"
                placeholder="60"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={examData.description}
              onChange={(e) => setExamData({ ...examData, description: e.target.value })}
              rows={3}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#14213D] focus:border-transparent"
              placeholder="Brief description of the exam..."
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Deadline</label>
              <input
                type="datetime-local"
                value={examData.deadline}
                onChange={(e) => setExamData({ ...examData, deadline: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#14213D] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Total Marks</label>
              <input
                type="number"
                value={examData.totalMarks}
                readOnly
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
              />
            </div>
          </div>
        </div>

        {/* Add Question */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold text-[#14213D] mb-4">Add Question</h2>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Question Type</label>
            <select
              value={currentQuestion.type}
              onChange={(e) => setCurrentQuestion({ 
                ...currentQuestion, 
                type: e.target.value as 'mcq' | 'subjective',
                options: e.target.value === 'mcq' ? ['', '', '', ''] : undefined
              })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#14213D] focus:border-transparent"
            >
              <option value="mcq">Multiple Choice Question</option>
              <option value="subjective">Subjective Question</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Question</label>
            <textarea
              value={currentQuestion.question}
              onChange={(e) => setCurrentQuestion({ ...currentQuestion, question: e.target.value })}
              rows={3}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#14213D] focus:border-transparent"
              placeholder="Enter your question here..."
            />
          </div>

          {currentQuestion.type === 'mcq' && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Options</label>
              {currentQuestion.options?.map((option, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="radio"
                    name="correctAnswer"
                    checked={currentQuestion.correctAnswer === index}
                    onChange={() => setCurrentQuestion({ ...currentQuestion, correctAnswer: index })}
                    className="mr-2"
                  />
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => updateOption(index, e.target.value)}
                    className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#14213D] focus:border-transparent"
                    placeholder={`Option ${index + 1}`}
                  />
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Points</label>
              <input
                type="number"
                value={currentQuestion.points}
                onChange={(e) => setCurrentQuestion({ ...currentQuestion, points: parseInt(e.target.value) || 1 })}
                className="w-20 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#14213D] focus:border-transparent"
                min="1"
              />
            </div>
            <button
              onClick={addQuestion}
              className="bg-[#14213D] text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition-colors flex items-center space-x-2"
            >
              <Plus size={16} />
              <span>Add Question</span>
            </button>
          </div>
        </div>

        {/* Questions List */}
        {questions.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold text-[#14213D] mb-4">Questions ({questions.length})</h2>
            <div className="space-y-4">
              {questions.map((question, index) => (
                <div key={question.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="bg-[#14213D] text-white px-2 py-1 rounded text-sm">Q{index + 1}</span>
                        <span className="bg-gray-100 px-2 py-1 rounded text-sm">{question.type.toUpperCase()}</span>
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">{question.points} pts</span>
                      </div>
                      <p className="text-gray-800 mb-2">{question.question}</p>
                      {question.options && (
                        <div className="ml-4">
                          {question.options.map((option, optIndex) => (
                            <div key={optIndex} className={`text-sm ${optIndex === question.correctAnswer ? 'text-green-600 font-medium' : 'text-gray-600'}`}>
                              {optIndex === question.correctAnswer ? '✓' : '○'} {option}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => removeQuestion(question.id)}
                      className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end space-x-4">
          <button className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors flex items-center space-x-2">
            <Eye size={16} />
            <span>Preview</span>
          </button>
          <button
            onClick={saveExam}
            className="bg-[#14213D] text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition-colors flex items-center space-x-2"
          >
            <Save size={16} />
            <span>Save Exam</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateExamPage;
