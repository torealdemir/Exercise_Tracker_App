
// components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('access_token');

  if (!token) {
    // If no token, redirect to login
    return <Navigate to="/" replace />;
  }

  // Otherwise, show the protected component
  return children;
};

export default ProtectedRoute;
