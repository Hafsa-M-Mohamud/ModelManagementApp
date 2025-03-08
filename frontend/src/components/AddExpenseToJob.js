import React, { useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import '../styles/AddExpenseToJob.css';

function AddExpenseToJob() {
  const [jobId, setJobId] = useState('');
  const [date, setDate] = useState('');
  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');
  const token = localStorage.getItem('token');

  // Extract modelId from the JWT token
  let modelId;
  try {
    const decodedToken = jwtDecode(token);
    modelId = decodedToken?.ModelId; // Make sure this matches how `ModelId` is saved in your JWT
  } catch (error) {
    console.error('Error decoding token:', error);
  }

  const handleAddExpense = async (e) => {
    e.preventDefault();
    if (!modelId) {
      alert('Model ID could not be determined. Please try logging in again.');
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8080/api/Expenses`,
        {
          modelId: parseInt(modelId, 10),
          jobId: parseInt(jobId, 10),
          date: date,
          text: text,
          amount: parseFloat(amount),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 201) {
        alert('Expense added successfully');
      } else {
        alert('Unexpected response from server. Please try again.');
      }
    } catch (err) {
      console.error('Error adding expense:', err);
      if (err.response && err.response.status === 404) {
        alert('Job not found. Please check the Job ID.');
      } else if (err.response && err.response.status === 403) {
        alert('You do not have permission to add expenses. Please check your login status.');
      } else {
        alert('An error occurred while adding the expense. Please try again.');
      }
    }
  };

  return (
    <div>
      <h2>Add Expense to Job</h2>
      <form onSubmit={handleAddExpense}>
        <input
          type="text"
          placeholder="Job ID"
          value={jobId}
          onChange={(e) => setJobId(e.target.value)}
          required
        />
        <input
          type="datetime-local"
          placeholder="Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Expense Description"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Expense Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <button type="submit">Add Expense</button>
      </form>
    </div>
  );
}

export default AddExpenseToJob;
