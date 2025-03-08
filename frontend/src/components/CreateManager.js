
import React, { useState } from 'react';
import axios from 'axios';
import '../styles/CreateManager.css';

const CreateManager = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
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
        'http://localhost:8080/api/Managers',
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert('Manager created successfully!');
    } catch (error) {
      console.error('Error creating manager:', error);
    }
  };

  return (
    <div>
      <h2>Create Manager</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Create Manager</button>
      </form>
    </div>
  );
};

export default CreateManager;
