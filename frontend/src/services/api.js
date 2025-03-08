import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

// axios instance with a base URL and default headers
const api = axios.create({
  baseURL: 'http://localhost:8080/api/', 
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to login and store JWT token in localStorage
export const login = async (email, password) => {
  try {
    const response = await api.post('account/login', { email, password });
    const { jwt } = response.data; // Extract JWT 
    localStorage.setItem('token', jwt); // Store JWT token 
    return jwt; // Return the JWT token
  } catch (error) {
    console.error('Login failed', error);
    throw new Error('Login failed, please check your credentials');
  }
};

// Function to fetch jobs based on user role (models can only see their own jobs)
export const fetchJobs = async () => {
  const token = localStorage.getItem('token'); // Get the stored JWT token from localStorage
  const decodedToken = jwtDecode(token); // Decode the JWT to get user details

  try {
    const url = decodedToken.isManager
      ? 'jobs' // Managers can view all jobs
      : `models/${decodedToken.modelId}/jobs`; // Models can only view their own jobs

    const response = await api.get(url, {
      headers: {
        'Authorization': `Bearer ${token}`, // Attach the token in the Authorization header
      },
    });
    return response.data; // Return the jobs data
  } catch (error) {
    console.error('Failed to fetch jobs', error);
    throw new Error('Error fetching jobs');
  }
};

// Function to create a new job (for managers)
export const createJob = async (jobData) => {
  const token = localStorage.getItem('token');
  try {
    const response = await api.post('jobs', jobData, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data; // Return the newly created job
  } catch (error) {
    console.error('Failed to create job', error);
    throw new Error('Error creating job');
  }
};

// Function to create a new model (for managers)
export const createModel = async (modelData) => {
  const token = localStorage.getItem('token');
  try {
    const response = await api.post('models', modelData, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data; // Return the newly created model
  } catch (error) {
    console.error('Failed to create model', error);
    throw new Error('Error creating model');
  }
};

// Function to add a model to a job (for managers)
export const addModelToJob = async (jobId, modelId) => {
  const token = localStorage.getItem('token');
  try {
    const response = await api.post(`jobs/${jobId}/models`, { modelId }, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data; // Return the response of adding model to job
  } catch (error) {
    console.error('Failed to add model to job', error);
    throw new Error('Error adding model to job');
  }
};

// Function to remove a model from a job (for managers)
export const removeModelFromJob = async (jobId, modelId) => {
  const token = localStorage.getItem('token');
  try {
    const response = await api.delete(`jobs/${jobId}/models/${modelId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data; // Return the response of removing model from job
  } catch (error) {
    console.error('Failed to remove model from job', error);
    throw new Error('Error removing model from job');
  }
};

// Function to add an expense to a job (for models)
export const addExpense = async (jobId, expenseData) => {
  const token = localStorage.getItem('token');
  try {
    const response = await api.post(`jobs/${jobId}/expenses`, expenseData, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data; // Return the added expense
  } catch (error) {
    console.error('Failed to add expense', error);
    throw new Error('Error adding expense to job');
  }
};
