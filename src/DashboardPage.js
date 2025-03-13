import React, { useState, useEffect } from 'react';
import useAuth from './useAuth'; // Adjust path as needed
import { getDashboardData } from './apiService'; // Adjust path as needed

const DashboardPage = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { logout } = useAuth(); // Get the logout function from useAuth hook

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await getDashboardData();
        setDashboardData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch dashboard data. Please try again.');
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleLogout = () => {
    logout(); // Call the logout function when button is clicked
  };

  if (loading) {
    return <div>Loading dashboard...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>
      
      <div className="dashboard-content">
        {dashboardData && (
          <div className="welcome-message">
            <p>{dashboardData.message}</p>
          </div>
        )}
        
        {/* Add more dashboard content here */}
      </div>
    </div>
  );
};

export default DashboardPage;