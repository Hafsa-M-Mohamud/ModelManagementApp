import React, { useState } from 'react';
import axios from 'axios';

const RemoveModelFromJob = () => {
  const [jobId, setJobId] = useState('');
  const [modelId, setModelId] = useState('');
  const token = localStorage.getItem('token');

  const handleRemoveModel = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(
        `http://localhost:8080/api/Jobs/${jobId}/model/${modelId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('Model removed successfully from the job');
    } catch (error) {
      console.error('Error removing model from job:', error);
      alert('Failed to remove model from job. Please try again.');
    }
  };

  return (
    <div>
      <h2>Remove Model from Job</h2>
      <form onSubmit={handleRemoveModel}>
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
        <button type="submit">Remove Model</button>
      </form>
    </div>
  );
};

export default RemoveModelFromJob;
