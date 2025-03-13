import React from 'react'; // Add React import to resolve JSX scope issue
import LoginPage from './LoginPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import DashboardPage from './DashboardPage'; // Create this next


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} /> {/* Protected route */}
        <Route path="/" element={<LoginPage />} /> {/* Default route to login */}
      </Routes>
    </BrowserRouter>
  );
}




export default App;
