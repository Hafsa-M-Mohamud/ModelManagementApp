import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/ViewJobs.css';

const ViewJobs = () => {
  const [jobs, setJobs] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/Jobs', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };
    fetchJobs();
  }, [token]);

  return (
    <div className="view-jobs-container">
      <h2>Available Jobs</h2>
      {jobs.length > 0 ? (
        jobs.map((job) => (
          <div className="job-item" key={job.jobId}>
            <h3>{job.customer}</h3>
            <p><strong>Start Date:</strong> {new Date(job.startDate).toLocaleString()}</p>
            <p><strong>Days:</strong> {job.days}</p>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Comments:</strong> {job.comments || 'No comments'}</p>
            {job.models && job.models.length > 0 && (
              <div className="assigned-models">
                <h4>Assigned Models:</h4>
                {job.models.map((model) => (
                  <div className="model-item" key={model.modelId}>
                    <span>{model.firstName} {model.lastName} ({model.email})</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No jobs available</p>
      )}
    </div>
  );
};

export default ViewJobs;
