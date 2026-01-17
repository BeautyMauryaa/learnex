import { Routes, Route, Navigate } from 'react-router-dom';
import { TeacherProvider } from './contexts/TeacherContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import StudentLayout from './components/StudentLayout';
import TeacherLayout from './components/TeacherLayout';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardPage from './pages/student/DashboardPage';
import SubjectsPage from './pages/student/SubjectPage';
import SubjectDetailPage from './pages/student/SubjectDtailPage';
import ProgressPage from './pages/student/ProgressPage';
import ExamsPage from './pages/student/ExamsPage';
import ExamPracticePage from './pages/student/ExamPracticePage';
import MockTestPage from './pages/student/MockTestPage';
import MockTestResultPage from './pages/student/MockTestResultPage';
import MockTestResultHistoryPage from './pages/student/MockTestResultHistory';
import SettingsPage from './pages/student/SettingPage';
import AskAIPage from './pages/student/AskAIPage';
import ProfilePage from './pages/ProfilePage';
import SmartNotesPage from './pages/SmartNotesPage';
import QuizGeneratorPage from './pages/QuizGeneratorPage';
import GroupStudyPage from './pages/GroupStudyPage';
import FeaturesPage from './pages/FeaturesPage';
import PricingPage from './pages/PricingPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

// Teacher Pages
import TeacherHomePage from './pages/teacher/TeacherHomePage';
import TeacherLoginPage from './pages/teacher/TeacherLoginPage';
import TeacherDashboardPage from './pages/teacher/TeacherDashboardPage';
import CreateExamPage from './pages/teacher/CreateExamPage';
import MyExamsPage from './pages/teacher/MyExamsPage';
import UploadNotesPage from './pages/teacher/UploadNotesPage';
import QuizReviewPage from './pages/teacher/QuizReviewPage';
import TeacherGroupStudyPage from './pages/teacher/GroupStudyPage';
import AnnouncementsPage from './pages/teacher/AnnouncementsPage';
import TeacherSettingsPage from './pages/teacher/TeacherSettingsPage';
import TeacherProfilePage from './pages/teacher/TeacherProfilePage';


function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/features" element={<FeaturesPage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      
      {/* Teacher Public Routes */}
      <Route path="/teacher" element={<TeacherHomePage />} />
      <Route path="/teacher/login" element={<TeacherLoginPage />} />
      
      {/* Protected Teacher Dashboard Routes */}
      <Route path="/teacher" element={
        <ProtectedRoute requiredRole="teacher">
          <TeacherProvider>
            <TeacherLayout />
          </TeacherProvider>
        </ProtectedRoute>
      }>
        <Route path="dashboard" element={<TeacherDashboardPage />} />
        <Route path="create-exam" element={<CreateExamPage />} />
        <Route path="my-exams" element={<MyExamsPage />} />
        <Route path="upload-notes" element={<UploadNotesPage />} />
        <Route path="quiz-review" element={<QuizReviewPage />} />
        <Route path="announcements" element={<AnnouncementsPage />} />
        <Route path="settings" element={<TeacherSettingsPage />} />
        <Route path="profile" element={<TeacherProfilePage />} />
        <Route path="group-study" element={<TeacherGroupStudyPage />} />
      </Route>

      {/* Protected Student Dashboard Routes */}
      <Route path="/student" element={
        <ProtectedRoute requiredRole="student">
          <StudentLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Navigate to="/student/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="subjects" element={<SubjectsPage />} />
        <Route path="subject/:subjectId" element={<SubjectDetailPage />} />
        <Route path="progress" element={<ProgressPage />} />
        <Route path="exams" element={<ExamsPage />} />
        <Route path="exam-practice" element={<ExamPracticePage />} />
        <Route path="mocktest/:examId" element={<MockTestPage />} />
        <Route path="mocktest/result/:examId" element={<MockTestResultPage />} />
        <Route path="mocktest/results-history" element={<MockTestResultHistoryPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="ask-ai" element={<AskAIPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="notes" element={<SmartNotesPage />} />
        <Route path="quiz-generator" element={<QuizGeneratorPage />} />
        <Route path="group-study" element={<GroupStudyPage />} />
        <Route path="exam/:id/details" element={<div>Exam Details Page (Coming Soon)</div>} />
      </Route>
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
