import React, { useState, useEffect } from "react";
import { Plus, Trash2, Save, Eye, Shield } from "lucide-react";
import Button from "../../components/Button";
import axios from "axios";

interface Question {
  id: number;
  type: "MCQ" | "Subjective";
  question: string;
  options?: string[];
  correctAnswer?: number;
  answer?: string;
  points: number;
}

interface Student { id: string; name: string; }
interface Group { id: string; name: string; }
interface Class { id: string; name: string; }

interface ExamData {
  id?: string;
  title: string;
  description: string;
  duration: number | string;
  totalMarks: number;
  deadline: string;
  questions: Question[];
}

const CreateExamPage: React.FC<{ examId?: string }> = ({ examId }) => {
  const [examData, setExamData] = useState({
  title: "",
  description: "",
  duration: 60,
  totalMarks: 0,
  startTime: "",
  deadline: "",
  questions: [],
});

  const [currentQuestion, setCurrentQuestion] = useState<Partial<Question>>({
    type: "MCQ",
    question: "",
    options: ["", "", "", ""],
    correctAnswer: 0,
    answer: "",
    points: 1,
  });

  const [students, setStudents] = useState<Student[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);

  const [assignedStudents, setAssignedStudents] = useState<string[]>([]);
  const [assignedGroups, setAssignedGroups] = useState<string[]>([]);
  const [assignedClasses, setAssignedClasses] = useState<string[]>([]);

  // --------------------------
  // Fetch saved exam if examId exists
  // --------------------------
  useEffect(() => {
    const fetchExam = async () => {
      if (!examId) return;
      try {
        const res = await axios.get(`/api/exams/${examId}`);
        const data = res.data as ExamData;

        // Convert server questions into local Question format
        const formattedQuestions: Question[] = data.questions.map((q: any) => ({
          id: Date.now() + Math.random(), // unique local ID
          type: q.questionType === "MCQ" ? "MCQ" : "Subjective",
          question: q.questionText,
          options: q.options || [],
          correctAnswer: q.questionType === "MCQ" ? q.options.indexOf(q.answer) : undefined,
          answer: q.questionType === "Subjective" ? q.answer : undefined,
          points: q.marks,
        }));

        setExamData({ ...data, questions: formattedQuestions });
      } catch (err) {
        console.error("Failed to fetch exam", err);
      }
    };

    fetchExam();
  }, [examId]);

  // --------------------------
  // Fetch students/groups/classes
  // --------------------------
  useEffect(() => {
    fetch("/api/students/all").then(res => res.json()).then(setStudents);
    fetch("/api/groups/all").then(res => res.json()).then(setGroups);
    fetch("/api/classes/all").then(res => res.json()).then(setClasses);
  }, []);

  // --------------------------
  // Add Question
  // --------------------------
  const addQuestion = () => {
    if (!currentQuestion.question) return;

    const newQuestion: Question = currentQuestion.type === "MCQ"
      ? {
          id: Date.now(),
          type: "MCQ",
          question: currentQuestion.question,
          options: currentQuestion.options,
          correctAnswer: currentQuestion.correctAnswer,
          points: currentQuestion.points || 1,
        }
      : {
          id: Date.now(),
          type: "Subjective",
          question: currentQuestion.question,
          answer: currentQuestion.answer || "N/A",
          points: currentQuestion.points || 1,
        };

    setExamData(prev => ({
      ...prev,
      questions: [...prev.questions, newQuestion],
      totalMarks: prev.totalMarks + (currentQuestion.points || 1),
    }));

    setCurrentQuestion({
      type: "MCQ",
      question: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
      answer: "",
      points: 1,
    });
  };

  const removeQuestion = (id: number) => {
    const q = examData.questions.find(q => q.id === id);
    if (!q) return;

    setExamData(prev => ({
      ...prev,
      questions: prev.questions.filter(q => q.id !== id),
      totalMarks: prev.totalMarks - q.points,
    }));
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...(currentQuestion.options || ["", "", "", ""])];
    newOptions[index] = value;
    setCurrentQuestion({ ...currentQuestion, options: newOptions });
  };

  // --------------------------
  // Save Exam
  // --------------------------
  const saveExam = async () => {
    try {
      if (!examData.title || examData.questions.length === 0) {
        alert("Please add exam title and at least one question");
        return;
      }

      const mappedQuestions = examData.questions.map(q => ({
        questionText: q.question,
        questionType: q.type,
        options: q.type === "MCQ" ? q.options : [],
        answer: q.type === "MCQ" ? q.options![q.correctAnswer!] : q.answer,
        marks: q.points,
      }));

      const token = localStorage.getItem("token");
      const payload = {
        ...examData,
        questions: mappedQuestions,
      };

      const res = await axios.post("http://localhost:5000/api/teacher/exams", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Exam saved successfully!");
      if (res.data._id) setExamData(prev => ({ ...prev, id: res.data._id }));
    } catch (err: any) {
      console.error(err.response?.data || err.message);
      alert("Failed to save exam");
    }
  };

  // --------------------------
  // Start Live Exam
  // --------------------------
  const startLiveExam = async () => {
    if (!examData.id) return alert("Save the exam first");

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `http://localhost:5000/api/teacher/exams/start/${examData.id}`,
        { assignedStudents, assignedGroups, assignedClasses },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.status === 200) alert("Exam is now live!");
    } catch (err) {
      console.error(err);
      alert("Failed to start exam");
    }
  };

  // --------------------------
  // JSX Render
  // --------------------------
  return (
    <div className="p-4 lg:p-8">
      <div className="max-w-5xl mx-auto">
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={examData.title}
                onChange={e => setExamData({ ...examData, title: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#14213D] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Duration (minutes)</label>
              <input
                type="number"
                value={examData.duration}
                onChange={e => setExamData({ ...examData, duration: parseInt(e.target.value) || "" })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#14213D] focus:border-transparent"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={examData.description}
              onChange={e => setExamData({ ...examData, description: e.target.value })}
              rows={3}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#14213D] focus:border-transparent"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Deadline</label>
              <input
                type="datetime-local"
                value={examData.deadline}
                onChange={e => setExamData({ ...examData, deadline: e.target.value })}
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

        {/* Assign Exam */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold text-[#14213D] mb-4">Assign Exam</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Students</label>
              <select
                multiple
                value={assignedStudents}
                onChange={e =>
                  setAssignedStudents(Array.from(e.target.selectedOptions, option => option.value))
                }
                className="w-full p-2 border border-gray-300 rounded-lg"
              >
                {students.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Groups</label>
              <select
                multiple
                value={assignedGroups}
                onChange={e =>
                  setAssignedGroups(Array.from(e.target.selectedOptions, option => option.value))
                }
                className="w-full p-2 border border-gray-300 rounded-lg"
              >
                {groups.map(g => (
                  <option key={g.id} value={g.id}>{g.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Classes</label>
              <select
                multiple
                value={assignedClasses}
                onChange={e =>
                  setAssignedClasses(Array.from(e.target.selectedOptions, option => option.value))
                }
                className="w-full p-2 border border-gray-300 rounded-lg"
              >
                {classes.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
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
              onChange={e =>
                setCurrentQuestion({
                  ...currentQuestion,
                  type: e.target.value as "MCQ" | "Subjective",
                  options: e.target.value === "MCQ" ? ["", "", "", ""] : undefined,
                })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#14213D] focus:border-transparent"
            >
              <option value="MCQ">Multiple Choice Question</option>
              <option value="Subjective">Subjective Question</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Question</label>
            <textarea
              value={currentQuestion.question}
              onChange={e => setCurrentQuestion({ ...currentQuestion, question: e.target.value })}
              rows={3}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#14213D] focus:border-transparent"
            />
          </div>

          {currentQuestion.type === "MCQ" &&
            currentQuestion.options?.map((opt, i) => (
              <div key={i} className="flex items-center mb-2">
                <input
                  type="radio"
                  name="correctAnswer"
                  checked={currentQuestion.correctAnswer === i}
                  onChange={() => setCurrentQuestion({ ...currentQuestion, correctAnswer: i })}
                  className="mr-2"
                />
                <input
                  type="text"
                  value={opt}
                  onChange={e => updateOption(i, e.target.value)}
                  className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#14213D] focus:border-transparent"
                />
              </div>
            ))}

          <div className="flex items-center justify-between mt-4">
            <input
              type="number"
              value={currentQuestion.points}
              onChange={e =>
                setCurrentQuestion({ ...currentQuestion, points: parseInt(e.target.value) || 1 })
              }
              className="w-20 p-2 border border-gray-300 rounded-lg"
              min={1}
            />
            <Button
              className="flex items-center space-x-2 bg-[#14213D] text-white"
              onClick={addQuestion}
            >
              <Plus size={16} /> <span>Add Question</span>
            </Button>
          </div>
        </div>

        {/* Questions List */}
        {examData.questions.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold text-[#14213D] mb-4">
              Questions ({examData.questions.length})
            </h2>
            <div className="space-y-4">
              {examData.questions.map((q, i) => (
                <div key={q.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="bg-[#14213D] text-white px-2 py-1 rounded text-sm">Q{i + 1}</span>
                        <span className="bg-gray-100 px-2 py-1 rounded text-sm">{q.type}</span>
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">{q.points} pts</span>
                      </div>
                      <p className="text-gray-800 mb-2">{q.question}</p>
                      {q.options?.map((opt, idx) => (
                        <div
                          key={idx}
                          className={`text-sm ${idx === q.correctAnswer ? "text-green-600 font-medium" : "text-gray-600"}`}
                        >
                          {idx === q.correctAnswer ? "✓" : "○"} {opt}
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => removeQuestion(q.id)}
                      className="text-red-600 hover:bg-red-50 p-2 rounded-lg"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Save / Preview / Start */}
        <div className="flex justify-end space-x-4 mb-4">
          <Button className="bg-gray-500 text-white flex items-center space-x-2">
            <Eye size={16} /> <span>Preview</span>
          </Button>
          <Button className="bg-[#14213D] text-white flex items-center space-x-2" onClick={saveExam}>
            <Save size={16} /> <span>Save Exam</span>
          </Button>
        </div>

        <Button className="bg-green-600 text-white flex items-center space-x-2" onClick={startLiveExam}>
          <Shield size={16} /> <span>Start Live Exam</span>
        </Button>
      </div>
    </div>
  );
};

export default CreateExamPage;
