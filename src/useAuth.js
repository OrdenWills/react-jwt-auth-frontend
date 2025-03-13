import { useState, useEffect } from 'react';

const useAuth = () => {
const [isAuthenticated, setIsAuthenticated] = useState(false);
const [loading, setLoading] = useState(true); // Add loading state

useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    setLoading(false); // Set loading to false after initial check
  }, []);

  // The logout function should be inside the useAuth hook
  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setIsAuthenticated(false);
    window.location.href = '/login';
  };
  
  return { isAuthenticated, loading, logout }; // Return logout function
};  

export default useAuth;