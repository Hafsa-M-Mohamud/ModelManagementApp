// src/components/CreateJob.js
import React, { useState } from 'react';
import axios from 'axios';

const CreateJob = () => {
  const [formData, setFormData] = useState({
    customer: '',
    startDate: '',
    days: 0,
    location: '',
    comments: '',
  });
  const token = localStorage.getItem('token');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:8080/api/Jobs',
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert('Job created successfully!');
    } catch (error) {
      console.error('Error creating job:', error);
    }
  };

  return (
    <div>
      <h2>Create Job</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="customer"
          placeholder="Customer"
          value={formData.customer}
          onChange={handleChange}
          required
        />
        <input
          type="datetime-local"
          name="startDate"
          placeholder="Start Date"
          value={formData.startDate}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="days"
          placeholder="Days"
          value={formData.days}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="comments"
          placeholder="Comments"
          value={formData.comments}
          onChange={handleChange}
        />
        <button type="submit">Create Job</button>
      </form>
    </div>
  );
};

export default CreateJob;
