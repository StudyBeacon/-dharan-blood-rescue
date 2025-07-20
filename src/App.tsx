import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';

import Index from './pages/Index';
import LoginPage from './pages/LoginPage';
import NotFound from './pages/NotFound';
import DonorDashboard from '@/components/DonorDashboard';
import PatientDashboard from '@/components/PatientDashboard';
import DriverDashboard from '@/components/DriverDashboard';
import ProtectedRoute from '@/components/ProtectedRoute';

import { AuthContext } from './context/AuthContext'; // ✅ use context directly

const queryClient = new QueryClient();

const App: React.FC = () => {
  const { user } = useContext(AuthContext);

  if (user === undefined) {
    // Context is still initializing (null would mean explicitly "logged out")
    return <div className="text-center p-8">Loading dashboard...</div>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public landing page */}
            <Route path="/" element={<Index />} />

            {/* Login */}
            <Route
              path="/login"
              element={
                user
                  ? <Navigate to={`/dashboard/${user.role}`} replace />
                  : <LoginPage />
              }
            />

            {/* Unified Dashboard Route */}
            <Route
              path="/dashboard/:role"
              element={
                <ProtectedRoute>
                  {user?.role === 'donor' && <DonorDashboard user={user} />}
                  {user?.role === 'patient' && <PatientDashboard user={user} />}
                  {user?.role === 'driver' && <DriverDashboard user={user} />}
                  {!['donor', 'patient', 'driver'].includes(user?.role) && (
                    <Navigate to="/login" replace />
                  )}
                </ProtectedRoute>
              }
            />

            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;