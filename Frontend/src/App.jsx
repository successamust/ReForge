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
import SocialProof from './components/sections/SocialProof';
import FAQ from './components/sections/FAQ';
import Pricing from './components/sections/Pricing';

import LoadingSpinner from './components/ui/LoadingSpinner';

// Pages - Lazy Loaded
const LoginPage = React.lazy(() => import('./pages/LoginPage'));
const RegisterPage = React.lazy(() => import('./pages/RegisterPage'));
const OAuthCallbackPage = React.lazy(() => import('./pages/OAuthCallbackPage'));
const ForgotPasswordPage = React.lazy(() => import('./pages/ForgotPasswordPage'));
const ResetPasswordPage = React.lazy(() => import('./pages/ResetPasswordPage'));
const EmailVerificationPage = React.lazy(() => import('./pages/EmailVerificationPage'));
const LessonsPage = React.lazy(() => import('./pages/LessonsPage'));
const LessonDetailPage = React.lazy(() => import('./pages/LessonDetailPage'));
const UserDashboardPage = React.lazy(() => import('./pages/UserDashboardPage'));
const LeaderboardPage = React.lazy(() => import('./pages/LeaderboardPage'));
const ProfilePage = React.lazy(() => import('./pages/ProfilePage'));
const AdminDashboardPage = React.lazy(() => import('./pages/AdminDashboardPage'));
const AdminUsersPage = React.lazy(() => import('./pages/AdminUsersPage'));
const AdminAuditLogsPage = React.lazy(() => import('./pages/AdminAuditLogsPage'));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage'));

function HomePage() {
  return (
    <>
      <Hero />
      <SocialProof />
      <FeatureGrid />
      <IDEPreview />
      <Dashboard />
      <Pricing />
      <FAQ />
    </>
  );
}

function App() {
  return (
    <AppProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <MainLayout>
          <React.Suspense fallback={<LoadingSpinner />}>
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
              {/* Admin Routes */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute requireAdmin={true}>
                    <AdminDashboardPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/users"
                element={
                  <ProtectedRoute requireAdmin={true}>
                    <AdminUsersPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/logs"
                element={
                  <ProtectedRoute requireAdmin={true}>
                    <AdminAuditLogsPage />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </React.Suspense>
        </MainLayout>
      </Router>
    </AppProvider>
  );
}

export default App;
