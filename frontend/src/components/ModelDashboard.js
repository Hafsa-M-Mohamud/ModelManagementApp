
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';

const ModelDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <h1>Model Dashboard</h1>
      <div className="dashboard-boxes">
        <button onClick={() => navigate('/view-model-jobs')} className="dashboard-box">
          View Your Jobs
        </button>
        <button onClick={() => navigate('/add-expense-to-job')} className="dashboard-box">
          Add Expense to Job
        </button>
      </div>
    </div>
  );
};

export default ModelDashboard;