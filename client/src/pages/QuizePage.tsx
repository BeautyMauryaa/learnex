import React, { useState } from 'react';
import { CheckCircle2, XCircle, Download } from 'lucide-react';
import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';
import Button from '../components/Button';
import Input from '../components/Input';
import Toast, { ToastType } from '../components/Toast';

interface QuizQuestion {
  question: string;
  options?: string[];
  correctAnswer?: number;
  userAnswer?: number;
  marks?: number;
  sampleAnswer?: string;
  keywords?: string[];
}

const QuizPage: React.FC = () => {
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('medium');
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[] | null>(null);
  const [currentStep, setCurrentStep] = useState<'form' | 'quiz' | 'results'>('form');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<ToastType>('success');
  const [isGenerating, setIsGenerating] = useState(false);

  const downloadBlob = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadQuizPdf = async (type: 'mcq' | 'subjective') => {
    if (!quizQuestions || quizQuestions.length === 0) return;

    const payload = {
      title: `${subject} - ${topic} (${type.toUpperCase()})`,
      subject,
      topic,
      difficulty,
      questions: quizQuestions.map((q) =>
        type === 'mcq'
          ? { q: q.question, options: q.options, correctIndex: q.correctAnswer }
          : { question: q.question, marks: q.marks, keywords: q.keywords, sampleAnswer: q.sampleAnswer }
      ),
    };

    const res = await fetch(`http://localhost:5000/api/quizzes/${type}/pdf`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const blob = await res.blob();
    downloadBlob(blob, `${payload.title.replace(/\s+/g, '_')}.pdf`);
  };

  const handleGenerateQuiz = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !topic) {
      setToastMessage('Please fill in all required fields');
      setToastType('error');
      setShowToast(true);
      return;
    }

    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      const mockQuestions: QuizQuestion[] = [
        { question: 'What is the powerhouse of the cell?', options: ['Nucleus', 'Mitochondria', 'ER', 'Golgi'], correctAnswer: 1 },
        { question: 'Explain osmosis.', marks: 5, keywords: ['water', 'diffusion'], sampleAnswer: 'Osmosis is...' },
      ];
      setQuizQuestions(mockQuestions);
      setCurrentStep('quiz');
      setToastMessage('Quiz generated successfully!');
      setToastType('success');
      setShowToast(true);
    }, 1000);
  };

  const handleAnswerSelect = (index: number) => {
    if (!quizQuestions) return;
    const updated = [...quizQuestions];
    updated[currentQuestion].userAnswer = index;
    setQuizQuestions(updated);

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setCurrentStep('results');
    }
  };

  const calculateScore = () => {
    if (!quizQuestions) return 0;
    const mcqCount = quizQuestions.filter(q => q.options).length;
    if (mcqCount === 0) return 0;
    const correct = quizQuestions.filter(q => q.userAnswer === q.correctAnswer).length;
    return Math.round((correct / mcqCount) * 100);
  };

  const resetQuiz = () => {
    setQuizQuestions(null);
    setCurrentQuestion(0);
    setCurrentStep('form');
  };

  return (
    <Layout>
      <div className="flex h-[calc(100vh-4rem)]">
        <Sidebar />
        <div className="flex-1 overflow-auto p-8">
          {currentStep === 'form' && (
            <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
              <form onSubmit={handleGenerateQuiz}>
                <Input label="Subject" placeholder="Any subject..." value={subject} onChange={e => setSubject(e.target.value)} required />
                <Input label="Topic" placeholder="Any topic..." value={topic} onChange={e => setTopic(e.target.value)} required />

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
                  <div className="flex gap-4">
                    {['easy', 'medium', 'hard'].map(level => (
                      <label key={level} className="flex items-center gap-2">
                        <input type="radio" value={level} checked={difficulty === level} onChange={() => setDifficulty(level)} />
                        <span className="capitalize">{level}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <Button type="submit" disabled={isGenerating}>{isGenerating ? 'Generating...' : 'Generate Quiz'}</Button>
              </form>
            </div>
          )}

          {currentStep === 'quiz' && quizQuestions && (
            <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4">{subject}: {topic}</h2>
              <p>Question {currentQuestion + 1} of {quizQuestions.length}</p>

              {quizQuestions[currentQuestion].options ? (
                <div className="space-y-3 mt-2">
                  <h3>{quizQuestions[currentQuestion].question}</h3>
                  {quizQuestions[currentQuestion].options!.map((opt, i) => (
                    <button key={i} onClick={() => handleAnswerSelect(i)} className="w-full px-4 py-2 border rounded-md hover:bg-indigo-50">{String.fromCharCode(65+i)}. {opt}</button>
                  ))}
                </div>
              ) : (
                <div className="mt-2">
                  <h3>{quizQuestions[currentQuestion].question}</h3>
                  <p className="italic text-gray-600">Subjective question. Check PDF for answer.</p>
                </div>
              )}

              <div className="flex justify-between mt-4">
                <Button variant="outline" onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))} disabled={currentQuestion===0}>Previous</Button>
                <Button variant="outline" onClick={() => {
                  if (currentQuestion < quizQuestions.length - 1) setCurrentQuestion(currentQuestion + 1);
                  else setCurrentStep('results');
                }}>Next</Button>
              </div>
            </div>
          )}

          {currentStep === 'results' && quizQuestions && (
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="bg-white p-6 rounded-lg shadow text-center">
                <h2 className="text-xl font-semibold mb-2">Quiz Results</h2>
                <p className="mb-2">Score: {calculateScore()}%</p>
                <div className="flex justify-center gap-4">
                  <Button onClick={resetQuiz}>New Quiz</Button>
                  <Button variant="outline" onClick={() => downloadQuizPdf('mcq')}><Download className="inline mr-1"/> MCQ PDF</Button>
                  <Button variant="outline" onClick={() => downloadQuizPdf('subjective')}><Download className="inline mr-1"/> Subjective PDF</Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {showToast && <Toast message={toastMessage} type={toastType} onClose={() => setShowToast(false)} />}
    </Layout>
  );
};

export default QuizPage;
