import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, AppContext } from './context/AppContext';
import MainLayout from './layouts/MainLayout';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';

// Homepage Sections
import Hero from './components/sections/Hero';
import IDEPreview from './components/sections/IDEPreview';
import Dashboard from './components/sections/Dashboard';
import FeatureGrid from './components/sections/FeatureGrid';
import SocialProof from './components/sections/SocialProof';
import FAQ from './components/sections/FAQ';
import Pricing from './components/sections/Pricing';

import LoadingSpinner from './components/ui/LoadingSpinner';

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
const VerificationPendingPage = React.lazy(() => import('./pages/VerificationPendingPage'));
const PracticePage = React.lazy(() => import('./pages/PracticePage'));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage'));

const Logout = () => {
  const { logout } = React.useContext(AppContext);
  React.useEffect(() => {
    logout();
  }, [logout]);
  return <Navigate to="/login" replace />;
};

import SEO from './components/SEO';
import ErrorBoundary from './components/ErrorBoundary';

function HomePage() {
  return (
    <>
      <SEO title="Home" description="Rebuild your coding muscle. The ultimate developer rehabilitation platform." />
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
    <ErrorBoundary>
      <AppProvider>
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <MainLayout>
            <React.Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<PublicRoute><SEO title="Login" /><LoginPage /></PublicRoute>} />
                <Route path="/register" element={<PublicRoute><SEO title="Register" /><RegisterPage /></PublicRoute>} />
                <Route path="/auth/success" element={<OAuthCallbackPage />} />
                <Route path="/forgot-password" element={<PublicRoute><ForgotPasswordPage /></PublicRoute>} />
                <Route path="/reset-password" element={<PublicRoute><ResetPasswordPage /></PublicRoute>} />
                <Route path="/verify-email" element={<EmailVerificationPage />} />
                <Route path="/verify-pending" element={<VerificationPendingPage />} />
                <Route
                  path="/practice"
                  element={
                    <ProtectedRoute allowUnverified={true}>
                      <PracticePage />
                    </ProtectedRoute>
                  }
                />
                <Route path="/logout" element={<Logout />} />
                <Route path="/lessons" element={<><SEO title="Curriculum" /><LessonsPage /></>} />
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
                      <SEO title="Dashboard" />
                      <UserDashboardPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/leaderboard"
                  element={
                    <ProtectedRoute>
                      <SEO title="Leaderboard" />
                      <LeaderboardPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <SEO title="Profile" />
                      <ProfilePage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute requireAdmin={true}>
                      <SEO title="Admin Console" />
                      <AdminDashboardPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/users"
                  element={
                    <ProtectedRoute requireAdmin={true}>
                      <SEO title="User Management" />
                      <AdminUsersPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/logs"
                  element={
                    <ProtectedRoute requireAdmin={true}>
                      <SEO title="System Logs" />
                      <AdminAuditLogsPage />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<><SEO title="404 Not Found" /><NotFoundPage /></>} />
              </Routes>
            </React.Suspense>
          </MainLayout>
        </Router>
      </AppProvider>
    </ErrorBoundary>
  );
}

export default App;
