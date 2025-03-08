
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Import with brackets
import Navbar from './components/Navbar';
import Login from './components/Login';
import ManagerDashboard from './components/ManagerDashboard';
import ModelDashboard from './components/ModelDashboard';
import CreateJob from './components/CreateJob';
import CreateModel from './components/CreateModel';
import CreateManager from './components/CreateManager';
import ViewJobs from './components/ViewJobs';
import AddModelToJob from './components/AddModelToJob';
import RemoveModelFromJob from './components/RemoveModelFromJob';
import ViewModelJobs from './components/ViewModelJobs';
import AddExpenseToJob from './components/AddExpenseToJob';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState('');

  const authenticateUser = () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const roleValue = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
        setRole(roleValue);
        setIsAuthenticated(true);
      } catch (err) {
        console.error('Error decoding token:', err);
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    authenticateUser(); // Call it once when the component mounts
  }, []);

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} role={role} />
      <Routes>
        {/* Login Route */}
        <Route path="/login" element={<Login onLoginSuccess={authenticateUser} />} />

        {/* Manager Dashboard */}
        <Route
          path="/manager-dashboard"
          element={
            isAuthenticated && role === 'Manager' ? (
              <ManagerDashboard />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Model Dashboard */}
        <Route
          path="/model-dashboard"
          element={
            isAuthenticated && role === 'Model' ? (
              <ModelDashboard />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Manager Routes */}
        {isAuthenticated && role === 'Manager' && (
          <>
            <Route path="/view-jobs" element={<ViewJobs />} />
            <Route path="/create-job" element={<CreateJob />} />
            <Route path="/create-model" element={<CreateModel />} />
            <Route path="/create-manager" element={<CreateManager />} />
            <Route path="/add-model-to-job" element={<AddModelToJob />} />
            <Route path="/remove-model-from-job" element={<RemoveModelFromJob />} />
          </>
        )}

        {/* Model Routes */}
        {isAuthenticated && role === 'Model' && (
          <>
            <Route path="/view-model-jobs" element={<ViewModelJobs />} />
            <Route path="/add-expense-to-job" element={<AddExpenseToJob />} />
          </>
        )}

        {/* Default Route */}
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
