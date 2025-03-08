

import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';

const ManagerDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <h1>Manager Dashboard</h1>
      <div className="dashboard-boxes">
        <button onClick={() => navigate('/create-job')} className="dashboard-box">
          Create Job
        </button>
        <button onClick={() => navigate('/create-model')} className="dashboard-box">
          Create Model
        </button>
        <button onClick={() => navigate('/view-jobs')} className="dashboard-box">
          View All Jobs
        </button>
        <button onClick={() => navigate('/add-model-to-job')} className="dashboard-box">
          Add Model to Job
        </button>
        <button onClick={() => navigate('/remove-model-from-job')} className="dashboard-box">
          Remove Model from Job
        </button>
      </div>
    </div>
  );
};

export default ManagerDashboard;

