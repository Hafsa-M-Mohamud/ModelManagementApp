import React, { useState } from 'react';
import axios from 'axios';
import '../styles/CreateModel.css';

function CreateModel() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNo: '',
    addressLine1: '',
    addressLine2: '',
    zip: '',
    city: '',
    country: '',
    birthDate: '',
    nationality: '',
    height: '',
    shoeSize: '',
    hairColor: '',
    eyeColor: '',
    comments: '',
    password: '',
  });

  const token = localStorage.getItem('token');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:8080/api/Models',
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log('Response:', response.data);
      alert('Model created successfully!');
    } catch (error) {
      console.error('Error creating model:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
        alert(`Error: ${error.response.status} - ${error.response.data}`);
      } else if (error.request) {
        console.error('Request made but no response:', error.request);
        alert('Error: No response received from server.');
      } else {
        console.error('Error setting up request:', error.message);
        alert(`Error: ${error.message}`);
      }
    }
  };

  return (
    <div>
      <h2>Create Model</h2>
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
          type="text"
          name="phoneNo"
          placeholder="Phone Number"
          value={formData.phoneNo}
          onChange={handleChange}
        />
        <input
          type="text"
          name="addressLine1"
          placeholder="Address Line 1"
          value={formData.addressLine1}
          onChange={handleChange}
        />
        <input
          type="text"
          name="addressLine2"
          placeholder="Address Line 2"
          value={formData.addressLine2}
          onChange={handleChange}
        />
        <input
          type="text"
          name="zip"
          placeholder="ZIP Code"
          value={formData.zip}
          onChange={handleChange}
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
        />
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={formData.country}
          onChange={handleChange}
        />
        <input
          type="datetime-local"
          name="birthDate"
          placeholder="Birth Date"
          value={formData.birthDate}
          onChange={handleChange}
        />
        <input
          type="text"
          name="nationality"
          placeholder="Nationality"
          value={formData.nationality}
          onChange={handleChange}
        />
        <input
          type="text"
          name="height"
          placeholder="Height"
          value={formData.height}
          onChange={handleChange}
        />
        <input
          type="text"
          name="shoeSize"
          placeholder="Shoe Size"
          value={formData.shoeSize}
          onChange={handleChange}
        />
        <input
          type="text"
          name="hairColor"
          placeholder="Hair Color"
          value={formData.hairColor}
          onChange={handleChange}
        />
        <input
          type="text"
          name="eyeColor"
          placeholder="Eye Color"
          value={formData.eyeColor}
          onChange={handleChange}
        />
        <textarea
          name="comments"
          placeholder="Comments"
          value={formData.comments}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Create Model</button>
      </form>
    </div>
  );
}

export default CreateModel;
