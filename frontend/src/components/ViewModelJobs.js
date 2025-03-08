import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/ViewModelJobs.css';

function ViewModelJobs() {
  const [jobs, setJobs] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchJobs = async () => {
      if (!token) {
        console.error('No token found');
        return;
      }
      
      try {
        // Fetch the jobs directly using the token for authorization
        const response = await axios.get('http://localhost:8080/api/Jobs', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        // Set the jobs returned in the response
        setJobs(response.data);
      } catch (err) {
        console.error('Error fetching jobs for model:', err);
        if (err.response && err.response.status === 403) {
          alert('You do not have permission to view these jobs. Please check your login status.');
        } else if (err.response && err.response.status === 404) {
          alert('No jobs found for this model.');
        } else {
          alert('An error occurred while fetching jobs.');
        }
      }
    };
    fetchJobs();
  }, [token]);

  return (
    <div className="view-model-jobs-container">
      <h2>Your Jobs</h2>
      {jobs.length === 0 ? (
        <p className="no-jobs-message">You are not assigned to any jobs.</p>
      ) : (
        jobs.map((job) => (
          <div className="job-item" key={job.jobId}>
            <h3>{job.customer}</h3>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Start Date:</strong> {new Date(job.startDate).toLocaleString()}</p>
            <p><strong>Days:</strong> {job.days}</p>
            <p><strong>Comments:</strong> {job.comments || 'No comments'}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default ViewModelJobs;
