import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Loader } from '@/components/Loader';
import { RootLayout } from '@/layouts/RootLayout';
import { AuthLayout } from '@/layouts/AuthLayout';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { ROUTES } from '@/utils/constants';

// Lazy load pages for code splitting
const Home = React.lazy(() => import('@/pages/Home').then(m => ({ default: m.Home })));
const Login = React.lazy(() => import('@/features/auth/Login').then(m => ({ default: m.Login })));
const Signup = React.lazy(() => import('@/features/auth/Signup').then(m => ({ default: m.Signup })));
const Dashboard = React.lazy(() => import('@/pages/Dashboard').then(m => ({ default: m.Dashboard })));
const Todos = React.lazy(() => import('@/pages/Todos').then(m => ({ default: m.Todos })));
const Analytics = React.lazy(() => import('@/pages/Analytics').then(m => ({ default: m.Analytics })));
const Profile = React.lazy(() => import('@/pages/Profile').then(m => ({ default: m.Profile })));
const Settings = React.lazy(() => import('@/pages/Settings').then(m => ({ default: m.Settings })));
const Contact = React.lazy(() => import('@/pages/Contact').then(m => ({ default: m.Contact })));
const NotFound = React.lazy(() => import('@/pages/NotFound').then(m => ({ default: m.NotFound })));

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader fullScreen />}>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
            
            <Route path="/" element={<AuthLayout />}>
              <Route path={ROUTES.LOGIN} element={<Login />} />
              <Route path={ROUTES.SIGNUP} element={<Signup />} />
            </Route>

            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
              <Route path={ROUTES.TODOS} element={<Todos />} />
              <Route path={ROUTES.ANALYTICS} element={<Analytics />} />
              <Route path={ROUTES.PROFILE} element={<Profile />} />
              <Route path={ROUTES.SETTINGS} element={<Settings />} />
              <Route path={ROUTES.CONTACT} element={<Contact />} />
            </Route>

            <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
            <Route path="*" element={<Navigate to={ROUTES.NOT_FOUND} replace />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};