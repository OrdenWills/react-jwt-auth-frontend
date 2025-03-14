import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from './useAuth'; // Adjust path

const PrivateRoute = ({ children }) => {
const { isAuthenticated, loading } = useAuth();

if (loading) {
      return <div>Loading...</div>; // Or a spinner
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;

