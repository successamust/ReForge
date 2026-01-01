import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import MainLayout from './layouts/MainLayout';
import ProtectedRoute from './components/ProtectedRoute';

// Homepage Sections
import Hero from './components/sections/Hero';
import IDEPreview from './components/sections/IDEPreview';
import Dashboard from './components/sections/Dashboard';
import FeatureGrid from './components/sections/FeatureGrid';

// Pages
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import OAuthCallbackPage from './pages/OAuthCallbackPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import EmailVerificationPage from './pages/EmailVerificationPage';
import LessonsPage from './pages/LessonsPage';
import LessonDetailPage from './pages/LessonDetailPage';
import UserDashboardPage from './pages/UserDashboardPage';
import LeaderboardPage from './pages/LeaderboardPage';
import ProfilePage from './pages/ProfilePage';

function HomePage() {
  return (
    <>
      <Hero />
      <FeatureGrid />
      <IDEPreview />
      <Dashboard />
    </>
  );
}

function App() {
  return (
    <AppProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <MainLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/auth/success" element={<OAuthCallbackPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/verify-email" element={<EmailVerificationPage />} />
            <Route path="/lessons" element={<LessonsPage />} />
            <Route path="/lessons/:language" element={<LessonsPage />} />
            <Route 
                path="/lessons/:language/:day" 
                element={
                    <ProtectedRoute>
                        <LessonDetailPage />
                    </ProtectedRoute>
                } 
            />
            <Route 
                path="/dashboard" 
                element={
                    <ProtectedRoute>
                        <UserDashboardPage />
                    </ProtectedRoute>
                } 
            />
            <Route 
                path="/leaderboard" 
                element={
                    <ProtectedRoute>
                        <LeaderboardPage />
                    </ProtectedRoute>
                } 
            />
            <Route 
                path="/profile" 
                element={
                    <ProtectedRoute>
                        <ProfilePage />
                    </ProtectedRoute>
                } 
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
      </MainLayout>
      </Router>
    </AppProvider>
  );
}

export default App;
