
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import '../styles/Login.css';

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/account/login', {
        email,
        password,
      });

      // Store the JWT in local storage
      const token = response.data;
      localStorage.setItem('token', token);

      // Decode the token to determine the role
      const decodedToken = jwtDecode(token);
      const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

      // Trigger parent to update authentication state
      onLoginSuccess();

      // Navigate based on role
      if (role === 'Manager') {
        navigate('/manager-dashboard');
      } else if (role === 'Model') {
        navigate('/model-dashboard');
      }
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
