import React, { useState } from 'react';
import axios from 'axios';

const AddModelToJob = () => {
  const [jobId, setJobId] = useState('');
  const [modelId, setModelId] = useState('');
  const token = localStorage.getItem('token');

  const handleAddModel = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `http://localhost:8080/api/Jobs/${jobId}/model/${modelId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('Model added successfully to the job');
    } catch (error) {
      console.error('Error adding model to job:', error);
      alert('Failed to add model to job. Please try again.');
    }
  };

  return (
    <div>
      <h2>Add Model to Job</h2>
      <form onSubmit={handleAddModel}>
        <input
          type="text"
          placeholder="Job ID"
          value={jobId}
          onChange={(e) => setJobId(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Model ID"
          value={modelId}
          onChange={(e) => setModelId(e.target.value)}
          required
        />
        <button type="submit">Add Model</button>
      </form>
    </div>
  );
};

export default AddModelToJob;
