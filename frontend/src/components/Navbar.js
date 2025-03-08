
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import '../styles/Navbar.css';

const Navbar = ({ isAuthenticated, role }) => {
  let decodedRole = '';
  const navigate = useNavigate(); // Get navigate function from react-router-dom

  try {
    const token = localStorage.getItem('token'); // Get token from localStorage
    if (token && token.split('.').length === 3) {
      const decodedToken = jwtDecode(token); // Decode the token and extract the role
      decodedRole = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    }
  } catch (error) {
    console.error('Error decoding token:', error);
  }

  const handleDashboardClick = () => {
    if (decodedRole === 'Manager') {
      navigate('/manager-dashboard');
    } else if (decodedRole === 'Model') {
      navigate('/model-dashboard');
    }
  };

  return (
    <nav className="navbar">
      {/* Logo and Branding */}
      <div className="navbar-brand">
        <img
          src="/elitemodelmanagementlogo1.svg"
          alt="Elite Model Management Logo"
          className="navbar-logo"
        />
        <span className="navbar-title">Elite Model Management</span>
      </div>

      {/* Navigation Links */}
      <div className="navbar-links">
        <button onClick={handleDashboardClick} className="navbar-link">
          Dashboard
        </button>
        {decodedRole === 'Manager' && (
          <>
            <Link to="/view-jobs" className="navbar-link">View Jobs</Link>
            <Link to="/create-job" className="navbar-link">Create Job</Link>
            <Link to="/create-model" className="navbar-link">Create Model</Link>
            <Link to="/create-manager" className="navbar-link">Create Manager</Link>
            <Link to="/add-model-to-job" className="navbar-link">Add Model to Job</Link>
            <Link to="/remove-model-from-job" className="navbar-link">Remove Model from Job</Link>
          </>
        )}
        {decodedRole === 'Model' && (
          <>
            <Link to="/view-model-jobs" className="navbar-link">Your Jobs</Link>
            <Link to="/add-expense-to-job" className="navbar-link">Add Expense</Link>
          </>
        )}
      </div>

      {/* Authentication Links */}
      <div className="navbar-auth">
        {!isAuthenticated ? (
          <Link to="/login" className="navbar-link">Login</Link>
        ) : (
          <button
            onClick={() => {
              localStorage.removeItem('token'); // Remove token and logout
              window.location.reload(); // Reload the page to reset the app state
            }}
            className="navbar-logout-button"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
