import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '@/context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const location = useLocation();
  const { user, token } = useContext(AuthContext); // ✅ context-driven

  // Wait for context to hydrate
  if (user === undefined) {
    return <div className="text-center p-6 text-muted-foreground">Loading dashboard...</div>;
  }

  // Block if unauthenticated
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // If role doesn't match current route, redirect to correct dashboard
  const pathRole = location.pathname.split('/')[2];
  if (pathRole && user.role !== pathRole) {
    return <Navigate to={`/dashboard/${user.role}`} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;